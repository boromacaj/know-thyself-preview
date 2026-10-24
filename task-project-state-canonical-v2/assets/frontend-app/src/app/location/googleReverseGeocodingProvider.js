import { activeLocale } from '../i18n/locale.js';
import { ReverseGeocodingProviderError, } from './reverseGeocodingProvider.js';
const endpoint = '/api/google-reverse-geocode';
const unavailableMessage = 'Exact map point was stored, but reverse geocoding could not resolve a place label. Coordinates remain available.';
export function createGoogleReverseGeocodingProvider(config, fetcher = defaultFetch) {
    if (!config.googleConfigured) {
        throw new Error('Google reverse geocoding requires Google runtime configuration.');
    }
    return {
        id: 'google-reverse-geocoding',
        label: 'Google Reverse Geocoding',
        mode: 'live',
        limitation: 'Exact map clicks can resolve place metadata through the local reverse-geocoding proxy when a server-side Google key is configured.',
        async reverseGeocode(coordinates) {
            if (!isValidCoordinate(coordinates.latitude, coordinates.longitude)) {
                throw new ReverseGeocodingProviderError('Exact map point was stored, but coordinates were outside valid bounds for reverse geocoding.');
            }
            let response;
            try {
                response = await fetcher(proxyUrl(coordinates));
            }
            catch {
                throw new ReverseGeocodingProviderError(unavailableMessage);
            }
            let payload;
            try {
                payload = await response.json();
            }
            catch {
                throw new ReverseGeocodingProviderError(unavailableMessage);
            }
            const status = stringValue(payload.status);
            const label = stringValue(payload.formattedAddress);
            if (!response.ok || status !== 'OK' || !label) {
                throw new ReverseGeocodingProviderError(messageForStatus(status));
            }
            return {
                label,
                country: stringValue(payload.country),
                region: stringValue(payload.region),
                district: stringValue(payload.district),
                locality: stringValue(payload.locality),
                provider: stringValue(payload.provider) ?? 'google-reverse-geocoding',
            };
        },
    };
}
function defaultFetch(url) {
    if (typeof fetch !== 'function') {
        return Promise.reject(new Error('fetch unavailable'));
    }
    return fetch(url);
}
function proxyUrl(coordinates) {
    const url = new URL('http://know-thyself.local/api/google-reverse-geocode');
    url.search = new URLSearchParams({
        lat: String(coordinates.latitude),
        lng: String(coordinates.longitude),
        /* The place label is the one line of the profile header that is about the
           reader, and it was arriving as "Levice, Nitra Region, Slovakia" for a
           Slovak reader. The proxy allow-lists this and forwards it to Google;
           the coordinates and the timezone are unaffected by it. */
        language: activeLocale(),
    }).toString();
    return `${url.pathname}${url.search}`;
}
function messageForStatus(status) {
    if (status === 'CONFIGURATION_MISSING' || status === 'SERVER_KEY_MISSING') {
        return 'Exact map point was stored, but reverse geocoding could not run because the server-side Google Geocoding key is not configured.';
    }
    if (status === 'REQUEST_DENIED') {
        return 'Exact map point was stored, but reverse geocoding was denied. Enable Geocoding API for the server-side Google key/project.';
    }
    if (status) {
        return `${unavailableMessage} Google Geocoding API status: ${status}.`;
    }
    return unavailableMessage;
}
function isValidCoordinate(latitude, longitude) {
    return Number.isFinite(latitude)
        && latitude >= -90
        && latitude <= 90
        && Number.isFinite(longitude)
        && longitude >= -180
        && longitude <= 180;
}
function stringValue(value) {
    return typeof value === 'string' && value.trim() ? value.trim() : null;
}
