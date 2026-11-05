import { escapeHtml } from '../format.js?v=f2c3a78';
import { renderEvidenceDrawer } from './synthesisEvidenceDrawer.js?v=f2c3a78';
export function renderSynthesisLifeAreaSection(area, profile) {
    return `<section class="synthesis-life-area">
    <p class="eyebrow">${escapeHtml(area.label)}</p>
    ${area.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
    ${renderEvidenceDrawer(profile, area.evidenceRefs)}
  </section>`;
}
