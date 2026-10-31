import { astrologyEvidence } from './adapters/astrologyAdapter.js?v=d9f39e7';
import { baziEvidence } from './adapters/baziAdapter.js?v=d9f39e7';
import { humanDesignEvidence } from './adapters/humanDesignAdapter.js?v=d9f39e7';
import { numerologyEvidence } from './adapters/numerologyAdapter.js?v=d9f39e7';
import { synthesizeDomains } from './domainSynthesis.js?v=d9f39e7';
import { clusterThemes, SALIENCE_FLOOR } from './themeClustering.js?v=d9f39e7';
import { detectTensions } from './tensionDetection.js?v=d9f39e7';
import { weighEvidence } from './weighting.js?v=d9f39e7';
/**
 * THE CROSS-PILLAR SYNTHESIS PIPELINE
 * ===================================
 *
 *   raw calculated facts
 *     -> normalized interpretive signals   (adapters/)
 *     -> evidence items                    (SynthesisEvidence)
 *     -> weighting + independence discount (weighting.ts)
 *     -> theme clusters                    (themeClustering.ts)
 *     -> agreement / tension detection     (tensionDetection.ts)
 *     -> weighted synthesis model          (this file)
 *     -> [future] narrative composition
 *
 * The pipeline stops at the synthesis model on purpose. No prose is generated
 * here and none should be added here: a narrative composer belongs on top of
 * this output, reading it, never bypassing it.
 *
 * DETERMINISM IS A HARD REQUIREMENT
 * ---------------------------------
 * There is no AI, no network, no clock and no randomness anywhere in this layer.
 * The same four engine outputs produce byte-identical synthesis every time. That
 * is not a performance preference - it is what makes the result inspectable and
 * arguable. A reasoning layer nobody can audit is indistinguishable from one
 * that is making things up.
 *
 * Everything that could introduce ordering instability is pinned: evidence ids
 * are derived from content rather than counters, sorts always have a total
 * tie-break, and weights are rounded at the boundary.
 *
 * WHAT AGREEMENT MEANS HERE
 * -------------------------
 * When this engine reports that three pillars converge on a theme, the claim is:
 * "three symbolic systems, built by unrelated traditions from different inputs,
 * independently express a similar idea about this birth data." It is NOT a claim
 * that the trait exists, has been measured, or predicts anything. The whole
 * layer is a study of how a set of symbol systems describe a person - never of
 * the person.
 */
export const SYNTHESIS_MODEL_VERSION = 'cross-pillar-synthesis-1.0.0';
export function synthesizeCrossPillar(input) {
    /* ---------------------------------------------------- 1. adapt to evidence */
    const evidence = [];
    const pillarsPresent = [];
    if (input.numerology) {
        const items = numerologyEvidence(input.numerology);
        if (items.length > 0) {
            evidence.push(...items);
            pillarsPresent.push('numerology');
        }
    }
    if (input.astrology) {
        /* Uncertain means approximate or unknown. `birthTimeEstimated` alone is not
           the question: it is true only when NO time was supplied, so an approximate
           time would otherwise be treated exactly like an exact one. */
        const birthTimeUncertain = input.birthTimeEstimated
            || input.birthTimePrecision === 'approximate'
            || input.birthTimePrecision === 'unknown';
        const items = astrologyEvidence(input.astrology, input.anglesSuppressed, birthTimeUncertain, input.astrologyWindow ?? null);
        if (items.length > 0) {
            evidence.push(...items);
            pillarsPresent.push('astrology');
        }
    }
    if (input.bazi) {
        const items = baziEvidence(input.bazi, input.baziWindow ?? null);
        if (items.length > 0) {
            evidence.push(...items);
            pillarsPresent.push('bazi');
        }
    }
    if (input.humanDesign) {
        const items = humanDesignEvidence(input.humanDesign, input.mechanicsSuppressed, input.humanDesignEnvelope ?? null);
        if (items.length > 0) {
            evidence.push(...items);
            pillarsPresent.push('human-design');
        }
    }
    /* ------------------------------------- 2. weigh, discounting dependent sets */
    /* Done once over the whole set so an item's weight is the same everywhere it
       appears. See weighEvidence for why this cannot be per-theme. */
    const weighted = weighEvidence(evidence);
    /* -------------------------------------------------- 3. cluster into themes */
    /*
     * THE FLOOR IS SALIENCE, NOT AGREEMENT.
     *
     * It used to be the support ladder, which made "did at least two traditions
     * mention it?" the entry condition for being in the reading at all. A theme
     * one system treats as central and the others have no symbol for could not get
     * in, however heavy it was, and the portrait narrowed to whatever all four
     * happened to share. Salience asks how much is actually behind the theme; the
     * ladder is still computed, and Technical details still reports it.
     */
    const allThemes = clusterThemes(weighted);
    const themes = allThemes
        .filter((theme) => theme.salience >= SALIENCE_FLOOR)
        .sort(byThemeInterest);
    const subThresholdThemes = allThemes
        .filter((theme) => theme.salience < SALIENCE_FLOOR)
        .sort(byThemeInterest);
    /* ------------------------------------------------------ 4. detect tensions */
    const tensions = detectTensions(weighted);
    /* ---------------------------------------------------- 5. file into domains */
    const domains = synthesizeDomains(themes, tensions);
    /* ------------------------------------------------------------- 6. coverage */
    const allPillars = ['numerology', 'astrology', 'bazi', 'human-design'];
    const coverage = {
        pillarsPresent: [...pillarsPresent].sort(),
        pillarsMissing: allPillars.filter((pillar) => !pillarsPresent.includes(pillar)),
        evidenceCount: weighted.length,
        suppressedEvidenceCount: weighted.filter((item) => item.evidence.methodology === 'suppressed').length,
        timeSensitiveEvidenceCount: weighted.filter((item) => item.evidence.methodology === 'time-sensitive').length,
        birthTimeEstimated: input.birthTimeEstimated,
        birthTimePrecision: input.birthTimePrecision ?? (input.birthTimeEstimated ? 'unknown' : 'exact'),
    };
    /* A profile with nothing above `weak` is a legitimate outcome, and saying so
       plainly is better than promoting a weak theme to fill the silence. */
    const noStrongCrossPillarPattern = !themes.some((theme) => theme.support === 'strong' || theme.support === 'moderate');
    return {
        modelVersion: SYNTHESIS_MODEL_VERSION,
        coverage,
        evidence: weighted,
        themes,
        subThresholdThemes,
        tensions,
        domains,
        noStrongCrossPillarPattern,
    };
}
/**
 * Salience first, then agreement, then weight, then id.
 *
 * The previous order put the support ladder first, which meant the answer to
 * "how many systems mention this?" decided the reading before anything else was
 * considered - and a four-system triviality outranked the theme a chart is
 * actually built around. Agreement is still the second term, so between two
 * equally salient themes the corroborated one leads.
 */
function byThemeInterest(a, b) {
    return b.salience - a.salience
        || b.distinctPillars - a.distinctPillars
        || b.supportWeight - a.supportWeight
        || a.id.localeCompare(b.id);
}
/**
 * Explain one theme: the full evidence chain behind it, ready for a "why am I
 * seeing this?" affordance in a future UI.
 *
 * Returned as structured rows rather than sentences - the UI decides wording,
 * this layer only guarantees the chain is complete and honest.
 */
export function explainTheme(theme) {
    return {
        themeId: theme.id,
        label: theme.label,
        support: theme.support,
        facet: theme.facet,
        kind: theme.kind,
        salience: theme.salience,
        distinctPillars: theme.distinctPillars,
        supportWeight: theme.supportWeight,
        counterWeight: theme.counterWeight,
        stances: theme.stances.map((stance) => ({ ...stance })),
        supporting: theme.supportingEvidence.map((item) => ({
            pillar: item.evidence.pillar,
            fact: item.evidence.fact,
            dimension: item.evidence.dimension,
            countedWeight: item.countedWeight,
            /* Surfaced so a reader of the explanation can see WHY a piece of evidence
               counted for less than it looks like it should have. */
            discounted: !item.isGroupRepresentative,
            methodology: item.evidence.methodology,
            interpretationKind: item.evidence.interpretationKind,
            settledness: item.evidence.settledness,
            knowledgeUnitId: item.evidence.knowledgeUnitId ?? null,
        })),
        countering: theme.counterEvidence.map((item) => ({
            pillar: item.evidence.pillar,
            fact: item.evidence.fact,
            dimension: item.evidence.dimension,
            countedWeight: item.countedWeight,
        })),
    };
}
