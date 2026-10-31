import { escapeHtml } from '../format.js?v=2ea79e9';
import { renderEvidenceDrawer } from './synthesisEvidenceDrawer.js?v=2ea79e9';
const STRENGTH_LABEL = {
    primary: 'Primary',
    strong: 'Strong',
    moderate: 'Moderate',
    emerging: 'Emerging / single-pillar',
};
export function renderSynthesisThemeCard(theme, profile) {
    return `<article class="synthesis-theme-card synthesis-theme-card--${theme.strength}">
    <div class="synthesis-theme-card__topline">
      <span class="synthesis-theme-card__strength">${escapeHtml(STRENGTH_LABEL[theme.strength])}</span>
      <span class="synthesis-theme-card__coverage">${theme.supportingPillars.length} of 4 pillars</span>
    </div>
    <h3>${escapeHtml(theme.label)}</h3>
    <p class="synthesis-theme-card__summary">${escapeHtml(theme.summary)}</p>
    ${theme.lifeAreaImplications.length > 0
        ? `<ul class="synthesis-theme-card__life-areas">${theme.lifeAreaImplications.map((implication) => `<li>${escapeHtml(implication.text)}</li>`).join('')}</ul>`
        : ''}
    <div class="synthesis-theme-card__notes">
      ${theme.risks[0] ? `<p><strong>Risk:</strong> ${escapeHtml(theme.risks[0])}</p>` : ''}
      ${theme.growthQuestions[0] ? `<p><strong>Growth direction:</strong> ${escapeHtml(theme.growthQuestions[0])}</p>` : ''}
    </div>
    ${theme.notEquivalent ? '<p class="synthesis-theme-card__guardrail">These signals come from unrelated calculation methods and are not claimed to be equivalent to each other.</p>' : ''}
    ${renderEvidenceDrawer(profile, theme.evidenceRefs, { rationale: theme.candidateRationale, warnings: theme.candidateWarnings })}
  </article>`;
}
