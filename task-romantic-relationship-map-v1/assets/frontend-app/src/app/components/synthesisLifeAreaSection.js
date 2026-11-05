import { escapeHtml } from '../format.js';
import { renderEvidenceDrawer } from './synthesisEvidenceDrawer.js';
export function renderSynthesisLifeAreaSection(area, profile) {
    return `<section class="synthesis-life-area">
    <p class="eyebrow">${escapeHtml(area.label)}</p>
    ${area.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
    ${renderEvidenceDrawer(profile, area.evidenceRefs)}
  </section>`;
}
