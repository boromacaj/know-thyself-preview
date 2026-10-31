import { escapeHtml } from './format.js?v=53c0693';
import { FLOW_STAGES } from './types.js?v=53c0693';
import { devProfilePresetsEnabled } from './config/runtimeConfig.js?v=53c0693';
import { renderIntakeScreen } from './components/intakeScreen.js?v=53c0693';
import { renderNumerologyPillarScreen } from './components/numerologyPillarScreen.js?v=53c0693';
import { renderHumanDesignPillarScreen } from './components/humanDesignPillarScreen.js?v=53c0693';
import { renderHumanDesignPillarScreenV2 } from './components/humanDesignPillarScreenV2.js?v=53c0693';
import { renderWesternAstrologyPillarScreen } from './components/westernAstrologyPillarScreen.js?v=53c0693';
import { renderBaziTcmPillarScreen } from './components/baziTcmPillarScreen.js?v=53c0693';
import { renderPatternReveal } from './components/patternReveal.js?v=53c0693';
import { renderTechnicalAppendix } from './components/technicalAppendix.js?v=53c0693';
import { renderThemeDiscovery } from './components/themeDiscovery.js?v=53c0693';
import { renderUnifiedSelfMap } from './components/unifiedSelfMap.js?v=53c0693';
import { renderEnergyForecastScreen } from './components/energyForecastScreen.js?v=53c0693';
export function renderApp(state, mapProvider, locationProvider) {
    const isIntake = state.stage === 'intake';
    const isNumerology = state.stage === 'numerology';
    const isHumanDesign = state.stage === 'human-design';
    const isHumanDesignV2 = state.stage === 'human-design-v2';
    const isWesternAstrology = state.stage === 'western-astrology';
    const isBaziTcm = state.stage === 'bazi-tcm';
    const isEnergyForecast = state.stage === 'energy-forecast';
    return `<div class="product-shell${isIntake ? ' product-shell--intake' : ''}${isNumerology ? ' product-shell--numerology' : ''}${isHumanDesign ? ' product-shell--human-design' : ''}${isHumanDesignV2 ? ' product-shell--human-design-v2' : ''}${isWesternAstrology ? ' product-shell--western-astrology' : ''}${isBaziTcm ? ' product-shell--bazi-tcm' : ''}${isEnergyForecast ? ' product-shell--energy-forecast' : ''}">

    ${renderHeader(state)}
    <div class="workspace-shell">
      ${renderFlowNavigation(state)}
      <main class="stage-canvas" id="stage-canvas">${renderExperienceNotice(state)}${renderStage(state, mapProvider, locationProvider)}</main>
    </div>
  </div>`;
}
function renderBrandLink() {
    return `<a class="brand" href="#" data-action="go-stage" data-stage="intake" aria-label="KNOW THYSELF PRO intake">
    <span><strong>KNOW THYSELF</strong><small>PRO</small></span>
  </a>`;
}
function renderHeaderContext(state) {
    // The Energy Forecast pillar reads a precomputed prototype dataset, not the
    // intake profile. Showing "Live profile / No profile built" there was actively
    // misleading, so the stage states what it is actually displaying.
    if (state.stage === 'energy-forecast') {
        const subject = state.energyForecast.index?.dataset.meta.generatedFor ?? 'Prototype dataset';
        return `<div class="header-context">
      <span class="system-status is-forecast"><i></i>Forecast profile</span>
      <span class="forecast-subject"><span>${escapeHtml(subject)}</span><small>Precomputed dataset, not intake</small></span>
    </div>`;
    }
    const profileName = state.experience?.coreResult.profile.identity.displayName;
    const isBenchmark = state.experience?.mode === 'benchmark-demo';
    return `<div class="header-context">
    <span class="system-status${isBenchmark ? ' is-benchmark' : ''}"><i></i>${isBenchmark ? 'Demo profile' : 'Live profile'}</span>
    ${profileName ? `<button type="button" data-action="edit-profile"><span>${escapeHtml(profileName)}</span><small>${isBenchmark ? 'Change mode' : 'Edit source'}</small></button>` : '<span class="profile-empty">No profile built</span>'}
  </div>`;
}
function renderHeader(state) {
    return `<header class="product-header">
    ${renderBrandLink()}
    ${renderHeaderContext(state)}
  </header>`;
}
function renderExperienceNotice(state) {
    if (state.stage === 'intake' || state.experience?.mode !== 'benchmark-demo')
        return '';
    return `<aside class="benchmark-mode-notice" aria-label="Benchmark data notice">
    <span>BENCHMARK / DEMO PROFILE</span>
    <p><strong>Boris Macaj</strong> Numerology is calculated locally. Western Astrology, BaZi / TCM, and Human Design are documented benchmark source data, not calculated engine output.</p>
    <button type="button" data-action="edit-profile">Change mode</button>
  </aside>`;
}
function renderFlowNavigation(state) {
    // Energy Forecast deliberately keeps the standard top header (no sidebar brand):
    // the floating-shell stages hide the header, and rendering both duplicates the mark.
    const isFloatingShell = state.stage === 'intake' || state.stage === 'numerology' || state.stage === 'human-design' || state.stage === 'human-design-v2' || state.stage === 'western-astrology' || state.stage === 'bazi-tcm';
    const sidebarBrand = isFloatingShell ? `<div class="sidebar-brand">${renderBrandLink()}</div>` : '';
    const [introStage, ...restStages] = FLOW_STAGES;
    return `<nav class="flow-navigation" aria-label="Product flow">
    ${sidebarBrand}
    ${flowButton(introStage, state)}
    ${state.experience ? flowNumerologyButton(state) : ''}
    ${state.experience ? flowWesternAstrologyButton(state) : ''}
    ${state.experience ? flowBaziTcmButton(state) : ''}
    ${state.experience ? flowHumanDesignButton(state) : ''}
    ${state.experience ? flowHumanDesignV2Button(state) : ''}
    ${restStages.map((stage) => flowButton(stage, state)).join('')}
    ${flowEnergyForecastButton(state)}
    <p>Meaning first.<br />Evidence second.<br />Raw data third.</p>
  </nav>`;
}
/**
 * Additive experimental pillar. It renders a precomputed prototype dataset rather
 * than the intake profile, so unlike the four production pillars it does not wait
 * for `state.experience`.
 */
function flowEnergyForecastButton(state) {
    const active = state.stage === 'energy-forecast';
    return `<button type="button" class="flow-step flow-step-experimental${active ? ' is-active' : ''}" data-action="go-stage" data-stage="energy-forecast" aria-current="${active ? 'step' : 'false'}">
    <strong>Energy Forecast</strong>
    <span class="flow-step-status" aria-hidden="true"><span class="flow-step-experimental-mark">Experimental</span></span>
  </button>`;
}
function flowButton(stage, state) {
    const unlocked = state.unlockedStages.includes(stage.id);
    const active = stage.id === state.stage;
    const complete = isStageComplete(stage.id, state);
    return `<button type="button" class="flow-step${active ? ' is-active' : ''}${complete ? ' is-complete' : ''}" data-action="go-stage" data-stage="${stage.id}"${unlocked ? '' : ' disabled'} aria-current="${active ? 'step' : 'false'}">
    <strong>${escapeHtml(stage.label)}</strong>
    <span class="flow-step-status" aria-hidden="true">${complete ? '<span class="flow-step-check">&#10003;</span>' : ''}</span>
  </button>`;
}
function flowNumerologyButton(state) {
    const unlocked = state.unlockedStages.includes('numerology');
    const active = state.stage === 'numerology';
    return `<button type="button" class="flow-step flow-step-featured${active ? ' is-active' : ''}" data-action="go-stage" data-stage="numerology"${unlocked ? '' : ' disabled'} aria-current="${active ? 'step' : 'false'}">
    <strong>Numerology Pillar</strong>
    <span class="flow-step-status" aria-hidden="true"><span class="flow-step-featured-mark">&#10022;</span></span>
  </button>`;
}
function flowWesternAstrologyButton(state) {
    const unlocked = state.unlockedStages.includes('western-astrology');
    const active = state.stage === 'western-astrology';
    return `<button type="button" class="flow-step flow-step-featured${active ? ' is-active' : ''}" data-action="go-stage" data-stage="western-astrology"${unlocked ? '' : ' disabled'} aria-current="${active ? 'step' : 'false'}">
    <strong>Western Astrology Pillar</strong>
    <span class="flow-step-status" aria-hidden="true"><span class="flow-step-featured-mark">&#10022;</span></span>
  </button>`;
}
function flowBaziTcmButton(state) {
    const unlocked = state.unlockedStages.includes('bazi-tcm');
    const active = state.stage === 'bazi-tcm';
    return `<button type="button" class="flow-step flow-step-featured${active ? ' is-active' : ''}" data-action="go-stage" data-stage="bazi-tcm"${unlocked ? '' : ' disabled'} aria-current="${active ? 'step' : 'false'}">
    <strong>BaZi &amp; TCM Pillar</strong>
    <span class="flow-step-status" aria-hidden="true"><span class="flow-step-featured-mark">&#10022;</span></span>
  </button>`;
}
function flowHumanDesignButton(state) {
    const unlocked = state.unlockedStages.includes('human-design');
    const active = state.stage === 'human-design';
    return `<button type="button" class="flow-step flow-step-featured${active ? ' is-active' : ''}" data-action="go-stage" data-stage="human-design"${unlocked ? '' : ' disabled'} aria-current="${active ? 'step' : 'false'}">
    <strong>Human Design Pillar</strong>
    <span class="flow-step-status" aria-hidden="true"><span class="flow-step-featured-mark">&#10022;</span></span>
  </button>`;
}
function flowHumanDesignV2Button(state) {
    const unlocked = state.unlockedStages.includes('human-design-v2');
    const active = state.stage === 'human-design-v2';
    return `<button type="button" class="flow-step flow-step-featured${active ? ' is-active' : ''}" data-action="go-stage" data-stage="human-design-v2"${unlocked ? '' : ' disabled'} aria-current="${active ? 'step' : 'false'}">
    <strong>Human Design 2.0 (Experimental)</strong>
    <span class="flow-step-status" aria-hidden="true"><span class="flow-step-featured-mark">&#10022;</span></span>
  </button>`;
}
function isStageComplete(stageId, state) {
    if (stageId === 'intake')
        return isIntakeComplete(state.intakeDraft);
    return false;
}
function isIntakeComplete(input) {
    return input.givenNames.trim().length > 0
        && input.birthSurname.trim().length > 0
        && input.birthDate.trim().length > 0
        && input.birthLatitude !== null
        && input.birthLongitude !== null
        && input.birthLocationPrecision !== 'text-only'
        && Boolean(input.birthTimeZone)
        && input.birthTimeZoneConfidence === 'resolved';
}
function renderStage(state, mapProvider, locationProvider) {
    // Experimental pillar: driven by its own precomputed dataset, so it is checked
    // before the intake gate that the profile-dependent stages fall through.
    if (state.stage === 'energy-forecast')
        return renderEnergyForecastScreen(state.energyForecast);
    if (state.stage === 'intake' || !state.experience) {
        return renderIntakeScreen(state.intakeDraft, state.locationSearchQuery, state.locationSearchFeedback, state.locationSearchResults, mapProvider, locationProvider, renderHeaderContext(state), devProfilePresetsEnabled);
    }
    if (state.stage === 'numerology')
        return renderNumerologyPillarScreen(state.experience, state.exportFeedback);
    if (state.stage === 'western-astrology')
        return renderWesternAstrologyPillarScreen(state.experience, state.exportFeedback);
    if (state.stage === 'bazi-tcm')
        return renderBaziTcmPillarScreen(state.experience, state.exportFeedback);
    if (state.stage === 'human-design')
        return renderHumanDesignPillarScreen(state.experience, state.exportFeedback);
    if (state.stage === 'human-design-v2')
        return renderHumanDesignPillarScreenV2(state.experience);
    if (state.stage === 'themes')
        return renderThemeDiscovery(state.experience);
    if (state.stage === 'pattern')
        return renderPatternReveal(state.experience);
    if (state.stage === 'map')
        return renderUnifiedSelfMap(state.experience, state.exportFeedback);
    return renderTechnicalAppendix(state.experience, state.exportFeedback);
}
