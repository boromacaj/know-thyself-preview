import { escapeHtml } from '../format.js?v=b5ef5ed';
import { getPillar } from '../model.js?v=b5ef5ed';
import { renderHumanDesignBodygraphV2 } from './humanDesignBodygraphV2/index.js?v=b5ef5ed';
/**
 * Human Design 2.0 (Experimental) pillar screen - deliberately minimal.
 * Reuses the exact same already-computed pillar.humanDesignBodygraph object
 * the V1 screen (humanDesignPillarScreen.ts) reads - getPillar() runs the
 * calculation once per profile, in model.ts, regardless of which screen(s)
 * later read the result; this file triggers no second calculation and never
 * imports the V1 screen or the V1 bodygraph renderer. Rich reference panels,
 * hero art, and per-gate activation columns are V1-only for now - V2 is a
 * geometry/routing testbed first (see the task's own "STATIC MATCH
 * REQUIREMENTS" / "LIVE FUNCTIONAL INTEGRATION" ordering); a "Compare with
 * V1" link is the only bridge between the two screens.
 */
export function renderHumanDesignPillarScreenV2(experience) {
    const pillar = getPillar(experience, 'human-design');
    const bodygraphData = pillar.humanDesignBodygraph;
    if (!bodygraphData) {
        return `<section class="stage-view hdv2-pillar-view" aria-labelledby="hdv2-pillar-title">
      <h1 id="hdv2-pillar-title">Human Design 2.0 &mdash; Experimental</h1>
      <p>No Human Design result available for this profile yet.</p>
    </section>`;
    }
    if (bodygraphData.humanDesign.status === 'blocked') {
        return `<section class="stage-view hdv2-pillar-view" aria-labelledby="hdv2-pillar-title">
      <h1 id="hdv2-pillar-title">Human Design 2.0 &mdash; Experimental</h1>
      <p>Human Design is blocked for this profile (birth moment not normalized).</p>
    </section>`;
    }
    const { humanDesign, mechanicsSuppressed } = bodygraphData;
    return `<section class="stage-view hdv2-pillar-view" aria-labelledby="hdv2-pillar-title">
    <header class="hdv2-pillar-header">
      <p class="eyebrow">Pillar &middot; Human Design 2.0</p>
      <h1 id="hdv2-pillar-title">Human Design 2.0 &mdash; Experimental</h1>
      <p class="hdv2-pillar-subtitle">Independent reference-based geometry and routing testbed. Reuses the same calculated Human Design result as the original pillar below &mdash; only the BodyGraph drawing differs. Neutral debug styling only; not final visual design.</p>
      <button type="button" class="hdv2-compare-link" data-action="go-stage" data-stage="human-design">Compare with original Human Design pillar &rarr;</button>
    </header>
    ${mechanicsSuppressed ? '<p class="hdv2-suppressed-note"><strong>Mechanics suppressed</strong> &mdash; birth time is estimated, so Type/Authority/Profile/Centers/Channels/Gates are not shown as calculated.</p>' : ''}
    <div class="hdv2-bodygraph-frame">
      ${renderHumanDesignBodygraphV2(bodygraphData)}
    </div>
    ${mechanicsSuppressed ? '' : renderSummary(humanDesign)}
  </section>`;
}
function renderSummary(humanDesign) {
    return `<dl class="hdv2-summary">
    <div><dt>Type</dt><dd>${escapeHtml(humanDesign.type)}</dd></div>
    <div><dt>Strategy</dt><dd>${escapeHtml(humanDesign.strategy)}</dd></div>
    <div><dt>Authority</dt><dd>${escapeHtml(humanDesign.authority)}</dd></div>
    <div><dt>Profile</dt><dd>${escapeHtml(humanDesign.profile ?? 'Unavailable')}</dd></div>
    <div><dt>Definition</dt><dd>${escapeHtml(humanDesign.definition)}</dd></div>
    <div><dt>Defined Centers</dt><dd>${humanDesign.definedCenters.length}</dd></div>
  </dl>`;
}
