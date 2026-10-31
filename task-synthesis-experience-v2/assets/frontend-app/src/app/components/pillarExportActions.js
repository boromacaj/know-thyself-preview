import { escapeHtml } from '../format.js?v=53c0693';
/**
 * Shared export action markup used by every pillar screen (Level B: "Copy this
 * pillar data" / "Download JSON") and by the shared navigation / Technical Appendix
 * (Level A: complete cross-pillar export). Click handling lives centrally in
 * controller.ts via the data-action attributes below, matching the app's existing
 * data-action dispatch convention.
 */
export function renderPillarExportActions(pillarId, feedback) {
    const feedbackForThis = feedback && feedback.scope === pillarId ? feedback : null;
    return `<div class="pillar-export" role="group" aria-label="Export this pillar's data">
    <div class="pillar-export__actions">
      <button type="button" class="pillar-export__button pillar-export__button--primary" data-action="export-pillar-clipboard" data-pillar-id="${escapeHtml(pillarId)}">Copy this pillar data</button>
      <button type="button" class="pillar-export__button pillar-export__button--secondary" data-action="export-pillar-download" data-pillar-id="${escapeHtml(pillarId)}">Download JSON</button>
    </div>
    ${feedbackForThis ? `<p class="pillar-export__status pillar-export__status--${feedbackForThis.tone}" role="status">${escapeHtml(feedbackForThis.message)}</p>` : ''}
  </div>`;
}
export function renderGlobalExportActions(feedback) {
    const feedbackForThis = feedback && feedback.scope === 'all' ? feedback : null;
    return `<div class="cross-pillar-export" role="group" aria-label="Export complete cross-pillar data">
    <p class="cross-pillar-export__summary">Complete cross-pillar export</p>
    <div class="pillar-export__actions">
      <button type="button" class="pillar-export__button pillar-export__button--primary" data-action="export-all-clipboard">Copy complete cross-pillar export</button>
      <button type="button" class="pillar-export__button pillar-export__button--secondary" data-action="export-all-download">Download complete JSON</button>
    </div>
    ${feedbackForThis ? `<p class="pillar-export__status pillar-export__status--${feedbackForThis.tone}" role="status">${escapeHtml(feedbackForThis.message)}</p>` : ''}
  </div>`;
}
