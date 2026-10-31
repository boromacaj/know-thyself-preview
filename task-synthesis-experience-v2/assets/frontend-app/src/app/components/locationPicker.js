import { escapeAttribute, escapeHtml } from '../format.js?v=53c0693';
import { formatCoordinate, precisionLabel, sourceLabel, } from '../locationPickerModel.js?v=53c0693';
import { canSelectExactMapPoint } from '../map/mapProvider.js?v=53c0693';
export function renderLocationPicker(input, searchQuery, searchFeedback, searchResults, mapProvider, locationProvider, sourceDataOverlay, topStatusHtml) {
    const latitude = input.birthLatitude;
    const longitude = input.birthLongitude;
    const hasCoordinates = latitude !== null && longitude !== null;
    const locationResolved = hasCoordinates
        && input.birthLocationPrecision !== 'text-only'
        && Boolean(input.birthTimeZone)
        && input.birthTimeZoneConfidence === 'resolved';
    const mapInteractive = canSelectExactMapPoint(mapProvider);
    const mapAdapterPending = mapProvider.status === 'configured' && mapProvider.adapterStatus === 'pending';
    const searchHelper = locationProvider.mode === 'adapter-pending'
        ? locationProvider.limitation
        : '';
    return `<aside class="location-picker" aria-labelledby="location-picker-title">
    <h2 id="location-picker-title" class="visually-hidden">Birth location${locationResolved ? '' : '<span class="field-required-marker" aria-hidden="true"></span>'}</h2>

    <div class="map-provider-frame${mapInteractive ? ' is-configured' : ' is-placeholder'}" role="region" aria-label="${escapeAttribute(mapProvider.label)}" aria-disabled="${mapInteractive ? 'false' : 'true'}">
      <div class="map-provider-host" data-map-provider-host>
        ${mapInteractive ? '' : `<div class="map-provider-placeholder">
          <strong>${mapAdapterPending ? 'Map provider configured. Live adapter pending.' : 'Map selection is not connected yet.'}</strong>
          <p>${mapAdapterPending
        ? 'No tiles, markers, coordinates, or map clicks are produced by the current stub.'
        : 'Select a listed place now, or connect a map provider to choose an exact point.'}</p>
        </div>`}
      </div>
      <div class="intake-top-frame">
        <div class="location-search-group">
          <label class="location-search-label" for="location-search">Search birth place${locationResolved ? '' : '<span class="field-required-marker" aria-hidden="true"></span>'}</label>
          <div class="location-search-bar">
            <div class="location-search-combobox">
              <div class="location-search-row">
                <span class="location-search-icon" aria-hidden="true"></span>
                <input id="location-search" value="${escapeAttribute(searchQuery)}" placeholder="Search birth location" autocomplete="off" aria-autocomplete="list" aria-controls="location-suggestions" aria-expanded="${searchResults.length > 0 ? 'true' : 'false'}" aria-invalid="${locationResolved ? 'false' : 'true'}" />
                <button type="button" data-action="search-location" aria-label="Search birth place">Search</button>
              </div>
              ${renderSearchResults(searchResults)}
            </div>
            <details class="location-details-toggle">
              <summary><span>Location details</span><span class="location-details-caret" aria-hidden="true">+</span></summary>
              <div class="location-details-panel">
                ${hasCoordinates ? renderLocationMetadata(input) : '<p class="location-details-empty">No location selected yet.</p>'}
                <button type="button" data-action="clear-location"${hasCoordinates ? '' : ' disabled'}>Clear coordinates</button>
              </div>
            </details>
            <details class="field-info">
              <summary aria-label="About birth location"><span aria-hidden="true">i</span></summary>
              <p class="field-info-panel">Used to resolve coordinates and timezone, and to anchor place-sensitive calculations.</p>
            </details>
          </div>
        </div>
        <div class="intake-top-status">${topStatusHtml}</div>
      </div>
      ${sourceDataOverlay}
    </div>
    <small class="location-search-feedback" role="status" aria-live="polite">${escapeHtml(searchFeedback)}</small>
    ${searchHelper ? `<small class="location-search-helper">${escapeHtml(searchHelper)}</small>` : ''}
  </aside>`;
}
function renderLocationMetadata(input) {
    return `<dl class="location-metadata">
    <div><dt>Latitude</dt><dd>${escapeHtml(formatCoordinate(input.birthLatitude))}</dd></div>
    <div><dt>Longitude</dt><dd>${escapeHtml(formatCoordinate(input.birthLongitude))}</dd></div>
    <div><dt>Precision</dt><dd>${escapeHtml(precisionLabel(input.birthLocationPrecision))}</dd></div>
    <div><dt>Source</dt><dd>${escapeHtml(sourceLabel(input.birthLocationSource))}</dd></div>
    <div class="location-label"><dt>Resolved label</dt><dd>${escapeHtml(input.resolvedPlaceLabel ?? '')}</dd></div>
    <div><dt>Country</dt><dd>${escapeHtml(input.birthCountry ?? '')}</dd></div>
    <div><dt>Region</dt><dd>${escapeHtml(input.birthRegion ?? '')}</dd></div>
    <div><dt>Provider</dt><dd>${escapeHtml(input.birthLocationProvider ?? '')}</dd></div>
    <div><dt>Timezone</dt><dd>${escapeHtml(input.birthTimeZone ?? '')}</dd></div>
    <div><dt>Timezone source</dt><dd>${escapeHtml(input.birthTimeZoneSource ?? '')}</dd></div>
    <div><dt>Timezone confidence</dt><dd>${escapeHtml(input.birthTimeZoneConfidence)}</dd></div>
  </dl>`;
}
function renderSearchResults(results) {
    if (results.length === 0)
        return '';
    return `<div id="location-suggestions" class="location-suggestions" role="listbox" aria-label="Birth place suggestions">
    ${results.map((result) => `<button type="button" role="option" data-action="select-location-suggestion" data-suggestion-id="${escapeAttribute(result.id)}">
      <span><strong>${escapeHtml(result.label)}</strong><small>${escapeHtml([result.region, result.country].filter(Boolean).join(', '))}</small></span>
      <em>${escapeHtml(searchResultSourceLabel(result))}</em>
    </button>`).join('')}
  </div>`;
}
function searchResultSourceLabel(result) {
    if (result.source === 'google-places')
        return 'Google Places result';
    if (result.source === 'bundled-local-gazetteer')
        return 'Bundled demo location';
    return result.source;
}
