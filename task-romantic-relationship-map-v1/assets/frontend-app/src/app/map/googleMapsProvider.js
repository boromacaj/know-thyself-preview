import { t } from '../i18n/uiStrings.js';
import { loadGoogleMaps } from './googleMapsLoader.js';
const worldCenter = { lat: 20, lng: 0 };
const worldZoom = 2;
const preciseZoom = 18;
const worldRestriction = {
    north: 85,
    south: -85,
    west: -180,
    east: 180,
};
const selectedPointMarkerSize = 42;
const selectedPointMarkerAnchor = { x: 21, y: 33 };
const selectedPointMarkerPinPath = 'M17 7C13.13 7 10 10.13 10 14c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z';
const selectedPointMarkerSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 34 34'>
  <defs>
    <linearGradient id='kt-gold' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#f4e2ae'/>
      <stop offset='48%' stop-color='#d5b66d'/>
      <stop offset='100%' stop-color='#8f7231'/>
    </linearGradient>
    <filter id='kt-glow' x='-120%' y='-120%' width='340%' height='340%'>
      <feGaussianBlur stdDeviation='2.2'/>
    </filter>
    <filter id='kt-shadow' x='-60%' y='-60%' width='220%' height='220%'>
      <feDropShadow dx='0' dy='1.2' stdDeviation='1.1' flood-color='#000000' flood-opacity='0.55'/>
    </filter>
  </defs>
  <path d='${selectedPointMarkerPinPath}' fill='#b8283a' opacity='0.85' filter='url(#kt-glow)'/>
  <path d='${selectedPointMarkerPinPath}' fill='#6e1420' stroke='#6e1420' stroke-width='2.4' stroke-linejoin='round'/>
  <path d='${selectedPointMarkerPinPath}' fill='url(#kt-gold)' stroke='#3c2f13' stroke-width='0.6' filter='url(#kt-shadow)'/>
  <circle cx='17' cy='14' r='2.6' fill='#15120a' stroke='#8a6f34' stroke-width='0.5'/>
</svg>`;
const selectedPointMarkerIconUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(selectedPointMarkerSvg)}`;
export function createGoogleMapsProvider(config, loader = loadGoogleMaps) {
    const browserKey = config.googleMapsBrowserKey;
    if (!config.googleConfigured || !browserKey) {
        throw new Error('Google Maps provider requires approved browser runtime configuration.');
    }
    return {
        descriptor: {
            id: 'google-maps',
            label: 'Google Maps Platform',
            status: 'configured',
            adapterStatus: 'ready',
            mapStyle: 'hybrid',
            supportsTileMap: true,
            supportsExactPointSelection: true,
            configurationRequirement: config.configurationRequirement,
            runtimeDiagnostic: {
                requestedProvider: config.requestedLocationProvider,
                selectedProvider: config.selectedLocationProvider,
                googleKeyPresent: config.googleBrowserKeyPresent,
                googleConfigured: config.googleConfigured,
                configState: config.state,
            },
        },
        async mount(container, options) {
            container.dataset.mapProviderState = 'google-loading';
            container.innerHTML = `<div class="map-provider-placeholder">
        <span>${t('map.previewEyebrow')}</span>
        <strong>${t('map.previewTitle')}</strong>
        <p>${t('map.previewNote')}</p>
      </div>`;
            let maps;
            try {
                maps = await loader(browserKey);
            }
            catch {
                container.dataset.mapProviderState = 'google-load-failed';
                container.innerHTML = `<div class="map-provider-placeholder">
          <span>${t('map.unavailableEyebrow')}</span>
          <strong>${t('map.unavailableTitle')}</strong>
          <p>${t('map.unavailableNote')}</p>
        </div>`;
                return emptySession;
            }
            const selectedPosition = coordinatesToPosition(options.selectedCoordinates);
            const initialCameraPosition = coordinatesToPosition(options.initialCamera?.center ?? null);
            container.innerHTML = '';
            container.dataset.mapProviderState = 'google-ready';
            let map = new maps.Map(container, {
                center: initialCameraPosition ?? selectedPosition ?? worldCenter,
                zoom: options.initialCamera?.zoom ?? (selectedPosition ? options.initialZoom : worldZoom),
                mapTypeId: maps.MapTypeId.HYBRID,
                cameraControl: false,
                clickableIcons: false,
                draggableCursor: 'crosshair',
                draggingCursor: 'grabbing',
                draggable: true,
                fullscreenControl: false,
                gestureHandling: 'greedy',
                keyboardShortcuts: true,
                mapTypeControl: false,
                minZoom: worldZoom,
                restriction: {
                    latLngBounds: worldRestriction,
                    strictBounds: true,
                },
                rotateControl: false,
                scaleControl: false,
                scrollwheel: true,
                streetViewControl: false,
                zoomControl: false,
            });
            let marker = null;
            let infoWindow = null;
            if (selectedPosition && options.selectedCoordinates) {
                setSelectedPoint(selectedPosition, selectedPointLabel(options.selectedCoordinates, options.resolvedPlaceLabel));
            }
            const clickListener = map.addListener('click', (event) => {
                const latitude = event.latLng?.lat();
                const longitude = event.latLng?.lng();
                if (typeof latitude !== 'number'
                    || typeof longitude !== 'number'
                    || !isValidCoordinate(latitude, longitude))
                    return;
                const coordinates = { latitude, longitude };
                setSelectedPoint({ lat: latitude, lng: longitude }, selectedPointLabel(coordinates, null));
                options.onMapClick(coordinates, readCamera(map));
            });
            return {
                focusLocation(coordinates, zoom) {
                    const position = coordinatesToPosition(coordinates);
                    if (!map || !position)
                        return;
                    map.panTo(position);
                    map.setZoom(normalizedZoom(zoom));
                    setSelectedPoint(position, selectedPointLabel(coordinates, null));
                },
                getCamera() {
                    return readCamera(map);
                },
                destroy() {
                    clickListener?.remove();
                    infoWindow?.close();
                    marker?.setMap(null);
                    if (map)
                        maps.event.clearInstanceListeners(map);
                    infoWindow = null;
                    marker = null;
                    map = null;
                },
            };
            function setSelectedPoint(position, content) {
                if (!map)
                    return;
                if (!marker) {
                    marker = new maps.Marker({
                        map,
                        position,
                        title: 'Selected birth point',
                        icon: {
                            url: selectedPointMarkerIconUrl,
                            scaledSize: { width: selectedPointMarkerSize, height: selectedPointMarkerSize },
                            anchor: { x: selectedPointMarkerAnchor.x, y: selectedPointMarkerAnchor.y },
                        },
                    });
                }
                else {
                    marker.setMap(map);
                    marker.setPosition(position);
                }
                if (!infoWindow) {
                    infoWindow = new maps.InfoWindow({ content, disableAutoPan: true });
                }
                else {
                    infoWindow.setContent(content);
                }
                infoWindow.open({ map, anchor: marker, shouldFocus: false });
            }
        },
    };
}
const emptySession = {
    focusLocation() { },
    getCamera() { return null; },
    destroy() { },
};
function coordinatesToPosition(coordinates) {
    if (!coordinates || !isValidCoordinate(coordinates.latitude, coordinates.longitude))
        return null;
    return { lat: coordinates.latitude, lng: coordinates.longitude };
}
function isValidCoordinate(latitude, longitude) {
    return Number.isFinite(latitude)
        && latitude >= -90
        && latitude <= 90
        && Number.isFinite(longitude)
        && longitude >= -180
        && longitude <= 180;
}
function normalizedZoom(zoom) {
    return Number.isFinite(zoom) ? Math.min(21, Math.max(worldZoom, Math.round(zoom))) : preciseZoom;
}
function readCamera(map) {
    if (!map)
        return null;
    const center = map.getCenter();
    const zoom = map.getZoom();
    const latitude = center?.lat();
    const longitude = center?.lng();
    if (typeof latitude !== 'number'
        || typeof longitude !== 'number'
        || typeof zoom !== 'number'
        || !isValidCoordinate(latitude, longitude))
        return null;
    return {
        center: { latitude, longitude },
        zoom: normalizedZoom(zoom),
    };
}
function selectedPointLabel(coordinates, label) {
    const title = label?.trim() || 'Selected birth point';
    const coordinateText = `${formatCoordinate(coordinates.latitude)}, ${formatCoordinate(coordinates.longitude)}`;
    return `<div class="map-selected-point-info"><strong>${escapeHtml(title)}</strong><span>${coordinateText}</span></div>`;
}
function formatCoordinate(value) {
    return value.toFixed(5);
}
function escapeHtml(value) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}
