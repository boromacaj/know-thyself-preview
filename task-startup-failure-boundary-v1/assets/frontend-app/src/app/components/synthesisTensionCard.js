import { escapeHtml } from '../format.js?v=2ea79e9';
import { renderEvidenceDrawer } from './synthesisEvidenceDrawer.js?v=2ea79e9';
export function renderSynthesisTensionCard(tension, profile) {
    return `<article class="synthesis-tension">
    <h3>${escapeHtml(tension.title)}</h3>
    <div class="synthesis-tension__sides">
      <div class="synthesis-tension__side"><p class="eyebrow">${escapeHtml(tension.sideA.label)}</p><p>${escapeHtml(tension.sideA.description)}</p></div>
      <div class="synthesis-tension__divider" aria-hidden="true">&harr;</div>
      <div class="synthesis-tension__side"><p class="eyebrow">${escapeHtml(tension.sideB.label)}</p><p>${escapeHtml(tension.sideB.description)}</p></div>
    </div>
    <p class="synthesis-tension__interpretation">${escapeHtml(tension.interpretation)}</p>
    <div class="synthesis-tension__notes">
      <p><strong>Healthy expression:</strong> ${escapeHtml(tension.healthyExpression)}</p>
      <p><strong>Unbalanced expression:</strong> ${escapeHtml(tension.unbalancedExpression)}</p>
      <p><strong>Practical integration:</strong> ${escapeHtml(tension.practicalIntegration)}</p>
    </div>
    ${renderEvidenceDrawer(profile, tension.evidenceRefs)}
  </article>`;
}
