import { escapeHtml } from '../format.js?v=53c0693';
/**
 * Generic glass reference/interpretation panel, shared across future symbolic
 * systems (Numerology today; Human Design and Astrology can reuse this same
 * renderer later). Purely presentational — the caller supplies the content.
 */
export function renderReferencePanel(entry) {
    return `<div class="reference-panel" role="dialog" aria-modal="false" aria-labelledby="reference-panel-title">
    <button type="button" class="reference-panel-close" data-action="close-reference" aria-label="Close reference panel">&times;</button>
    <div class="reference-panel-badges">
      <span class="reference-panel-badge">${escapeHtml(entry.system)}</span>
      <span class="reference-panel-badge reference-panel-badge--symbolic">Symbolic reference</span>
    </div>
    <h3 id="reference-panel-title" class="reference-panel-title">${escapeHtml(entry.title)}</h3>
    <div class="reference-panel-section">
      <p>${escapeHtml(entry.overview)}</p>
    </div>
    <div class="reference-panel-section">
      <h4>Strengths</h4>
      <p>${escapeHtml(entry.strengths)}</p>
    </div>
    <div class="reference-panel-section">
      <h4>Shadow / Growth Area</h4>
      <p>${escapeHtml(entry.shadow)}</p>
    </div>
    <div class="reference-panel-section">
      <h4>Practical Integration</h4>
      <p>${escapeHtml(entry.integration)}</p>
    </div>
    <p class="reference-panel-caution">${escapeHtml(entry.caution)}</p>
  </div>`;
}
