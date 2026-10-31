import { escapeHtml } from '../format.js?v=f9ab0a6';
import { renderEvidenceDrawer } from './synthesisEvidenceDrawer.js?v=f9ab0a6';
export function renderSynthesisLifeAreaSection(area, profile) {
    return `<section class="synthesis-life-area">
    <p class="eyebrow">${escapeHtml(area.label)}</p>
    ${area.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
    ${renderEvidenceDrawer(profile, area.evidenceRefs)}
  </section>`;
}
