import { escapeHtml, pillarLabel } from '../format.js?v=b5ef5ed';
import { findEvidence } from '../synthesis/synthesisTypes.js?v=b5ef5ed';
/** Shared "Why this appears" expandable evidence panel (spec section 26), reused by
 *  theme cards, tension cards, and life-area sections so evidence traceability stays
 *  in one implementation. Renders nothing when there is genuinely no evidence to show. */
export function renderEvidenceDrawer(profile, evidenceRefs, extras = {}) {
    const entries = findEvidence(profile, evidenceRefs);
    if (entries.length === 0 && !extras.rationale)
        return '';
    return `<details class="synthesis-evidence">
    <summary class="synthesis-evidence__trigger"><span>Why this appears</span><span aria-hidden="true">+</span></summary>
    <div class="synthesis-evidence__drawer">
      ${extras.rationale ? `<p class="synthesis-evidence__rationale">${escapeHtml(extras.rationale)}</p>` : ''}
      ${entries.map(evidenceRow).join('')}
      ${(extras.warnings ?? []).map((warning) => `<p class="synthesis-evidence__warning">${escapeHtml(warning)}</p>`).join('')}
    </div>
  </details>`;
}
function evidenceRow(entry) {
    return `<div class="synthesis-evidence__row">
    <strong>${escapeHtml(pillarLabel(entry.pillar))}</strong>
    <span>${escapeHtml(entry.sourceLabel)}: ${escapeHtml(entry.rawValue)}</span>
    <small>${escapeHtml(entry.evidenceType)} / confidence ${entry.confidence.toFixed(2)}</small>
    ${entry.notEquivalentToOtherSystems ? '<small class="synthesis-evidence__guardrail">Not directly equivalent to other systems\' similarly named concepts.</small>' : ''}
  </div>`;
}
