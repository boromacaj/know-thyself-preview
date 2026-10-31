import { escapeAttribute, escapeHtml } from '../format.js?v=d9f39e7';
import { renderLocationPicker } from './locationPicker.js?v=d9f39e7';
import { INTAKE_PROFILE_PRESETS } from '../dev/intakeProfilePresets.js?v=d9f39e7';
export function renderIntakeScreen(input, searchQuery, searchFeedback, searchResults, mapProvider, locationProvider, topStatusHtml, devPresetsEnabled) {
    const locationResolved = input.birthLatitude !== null
        && input.birthLongitude !== null
        && input.birthLocationPrecision !== 'text-only'
        && Boolean(input.birthTimeZone)
        && input.birthTimeZoneConfidence === 'resolved';
    const sourceDataOverlay = `<div class="intake-source-overlay">
    <div class="intake-source-heading" id="intake-title"><span class="intake-source-icon" aria-hidden="true"></span>Personal source data</div>
    <div class="intake-source-rows">
      <div class="intake-source-row">
        <div class="field-group source-pill">
          <details class="field-info">
            <summary aria-label="About given name(s)"><span aria-hidden="true">i</span></summary>
            <p class="field-info-panel">Used for name-origin references and local numerology calculations.</p>
          </details>
          <div class="source-pill-body">
            <label for="given-names" class="source-pill-label">Given name(s)<span class="field-required-marker" aria-hidden="true"></span></label>
            <input id="given-names" name="givenNames" form="intake-form" autocomplete="given-name" class="source-pill-input" value="${escapeAttribute(input.givenNames)}" placeholder="Given name(s)" required />
          </div>
        </div>

        <div class="field-group source-pill">
          <details class="field-info">
            <summary aria-label="About birth surname"><span aria-hidden="true">i</span></summary>
            <p class="field-info-panel">Used as part of the birth name source data and full-name numerology calculation.</p>
          </details>
          <div class="source-pill-body">
            <label for="birth-surname" class="source-pill-label">Birth surname<span class="field-required-marker" aria-hidden="true"></span></label>
            <input id="birth-surname" name="birthSurname" form="intake-form" autocomplete="family-name" class="source-pill-input" value="${escapeAttribute(input.birthSurname)}" placeholder="Birth surname" required />
          </div>
        </div>
      </div>

      <div class="intake-source-row">
        <div class="field-group source-pill">
          <details class="field-info">
            <summary aria-label="About birth date"><span aria-hidden="true">i</span></summary>
            <p class="field-info-panel">Used for date-based calculations across the pillars.</p>
          </details>
          <div class="source-pill-body">
            <label for="birth-date" class="source-pill-label">Birth date<span class="field-required-marker" aria-hidden="true"></span></label>
            <input id="birth-date" name="birthDate" type="date" lang="en-GB" placeholder="dd. mm. yyyy" form="intake-form" class="source-pill-input" value="${escapeAttribute(input.birthDate)}" required />
          </div>
        </div>

        <div class="field-group source-pill">
          <details class="field-info">
            <summary aria-label="About birth time"><span aria-hidden="true">i</span></summary>
            <p class="field-info-panel">Improves time-sensitive systems and can remain unknown if needed - a clearly labeled local-noon estimate is used instead.</p>
          </details>
          <div class="source-pill-body">
            <label for="birth-time" class="source-pill-label">Birth time</label>
            <input id="birth-time" name="birthTime" type="time" form="intake-form" class="source-pill-input" value="${escapeAttribute(input.birthTime)}" />
          </div>
        </div>

        <button class="command-button-minimal intake-source-build" type="submit" form="intake-form"${locationResolved ? '' : ' disabled aria-disabled="true" title="Select and resolve the birth place before building the profile."'}>Build profile</button>
      </div>
    </div>
  </div>`;
    return `<section class="stage-view intake-view" aria-labelledby="intake-title">
    <form id="intake-form" class="intake-form-shell">
      <input type="hidden" name="birthPlaceText" value="${escapeAttribute(input.birthPlaceText)}" />
    </form>

    <div class="intake-layout">
      ${renderLocationPicker(input, searchQuery, searchFeedback, searchResults, mapProvider, locationProvider, sourceDataOverlay, topStatusHtml)}
    </div>
    ${devPresetsEnabled ? renderDevProfilePresets(searchFeedback) : ''}
  </section>`;
}
/**
 * Development-only utility (see config/runtimeConfig.ts's isDevProfilePresetsEnabled).
 * Never rendered when devPresetsEnabled is false — the production-facing HTML string
 * contains none of this markup, not merely a CSS-hidden copy of it.
 */
function renderDevProfilePresets(searchFeedback) {
    return `<details class="dev-profile-presets">
    <summary class="dev-profile-presets__toggle">Test profiles</summary>
    <div class="dev-profile-presets__panel">
      <p class="dev-profile-presets__hint">Development only. Loads a predefined profile into Intake for local testing; you still resolve the location and submit manually.</p>
      <div class="dev-profile-presets__options" role="group" aria-label="Load a test profile">
        ${INTAKE_PROFILE_PRESETS.map((preset) => `<button type="button" class="dev-profile-presets__option" data-action="load-dev-preset" data-preset-id="${escapeAttribute(preset.id)}">${escapeHtml(preset.label)}</button>`).join('')}
        <button type="button" class="dev-profile-presets__option dev-profile-presets__option--reset" data-action="reset-dev-preset">Reset fields</button>
      </div>
      <small class="dev-profile-presets__status" role="status" aria-live="polite">${escapeHtml(searchFeedback)}</small>
    </div>
  </details>`;
}
