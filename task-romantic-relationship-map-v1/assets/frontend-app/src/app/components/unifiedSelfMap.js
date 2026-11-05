import { escapeHtml } from '../format.js';
import { commandButton, stageIntro, textList } from './common.js';
import { buildCrossPillarSynthesisProfile } from '../synthesis/synthesisProfileBuilder.js';
import { renderSynthesisLifeAreaSection } from './synthesisLifeAreaSection.js';
import { renderGlobalExportActions } from './pillarExportActions.js';
export function renderUnifiedSelfMap(experience, exportFeedback = null) {
    const profile = buildCrossPillarSynthesisProfile(experience);
    const centralTension = profile.overview.centralTensionId
        ? profile.tensions.find((tension) => tension.id === profile.overview.centralTensionId) ?? null
        : null;
    const strongestThemeLabels = profile.overview.strongestThemeIds
        .map((id) => profile.themes.find((theme) => theme.id === id)?.label)
        .filter((label) => Boolean(label));
    return `<section class="stage-view map-view cross-pillar-synthesis" aria-labelledby="map-title">
    ${stageIntro('04 / Unified Self Map', profile.overview.headline, 'Meaning first, evidence second, raw data third: this is the main interpretive destination. Every claim below traces back to specific calculated signals — expand "Why this appears" wherever you want to check the source.', profile.overview.sourceCoverageSummary).replace('<h1>', '<h1 id="map-title">')}

    <section class="synthesis-overview">
      <p class="synthesis-overview__pattern">${escapeHtml(profile.overview.centralPatternSentence)}</p>
      <div class="synthesis-overview__grid">
        <div><p class="eyebrow">Strongest themes</p>${strongestThemeLabels.length > 0 ? textList(strongestThemeLabels) : '<p class="empty-state">None yet.</p>'}</div>
        <div><p class="eyebrow">Central tension</p><p>${escapeHtml(centralTension?.title ?? 'None identified yet')}</p></div>
        <div><p class="eyebrow">Growth direction</p><p>${escapeHtml(profile.overview.growthDirectionSentence)}</p></div>
      </div>
    </section>

    <div class="synthesis-narrative">
      ${profile.mainNarrative.map(narrativeSection).join('')}
    </div>

    ${profile.lifeAreas.length > 0 ? `<section class="synthesis-life-areas">
      <div class="section-title-row"><p class="eyebrow">How this appears in life</p><h2>Life areas</h2></div>
      <div class="synthesis-life-areas__grid">${profile.lifeAreas.map((area) => renderSynthesisLifeAreaSection(area, profile)).join('')}</div>
    </section>` : ''}

    <div class="map-section-grid">
      ${mapSection('Strengths', profile.strengths)}
      ${mapSection('Growth themes', profile.growthThemes)}
    </div>

    ${renderCurrentPeriod(profile)}

    <section class="synthesis-methodology-warnings">
      <p class="eyebrow">Methodology and boundaries</p>
      ${textList(profile.methodologyWarnings)}
      ${profile.unavailableAreas.length > 0 ? `<p class="synthesis-methodology-warnings__unavailable">Unavailable in this profile: ${profile.unavailableAreas.map((area) => escapeHtml(area)).join(', ')}.</p>` : ''}
    </section>

    <p class="boundary-note">This is a symbolic self-reflection map, not a diagnosis, prediction, or fixed identity statement.</p>

    <footer class="stage-actions">
      <div><strong>Map assembled</strong><span>Audit every input and formula in the Technical Appendix.</span></div>
      ${commandButton('Open Technical Appendix', 'next-stage')}
    </footer>
    ${renderGlobalExportActions(exportFeedback)}
  </section>`;
}
function narrativeSection(section) {
    return `<section class="synthesis-profile-section">
    <h2>${escapeHtml(section.title)}</h2>
    ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
  </section>`;
}
function mapSection(title, items) {
    return `<section class="map-section"><p class="eyebrow">${escapeHtml(title)}</p>${items.length > 0 ? textList(items) : '<p class="empty-state">Not enough evidence yet.</p>'}</section>`;
}
function renderCurrentPeriod(profile) {
    if (!profile.currentPeriod.available)
        return '';
    return `<section class="synthesis-current-period">
    <p class="eyebrow">Current period / time-sensitive layer</p>
    <div class="synthesis-current-period__entries">
      ${profile.currentPeriod.entries.map((entry) => `<div class="synthesis-current-period__entry"><strong>${escapeHtml(entry.label)}</strong><span>${escapeHtml(entry.value)}</span><small>${escapeHtml(entry.note)}</small></div>`).join('')}
    </div>
    <p class="synthesis-current-period__note">${escapeHtml(profile.currentPeriod.separationNote)}</p>
  </section>`;
}
