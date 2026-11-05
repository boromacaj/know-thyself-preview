import { PILLAR_ORDER } from './narrativeEvidence.js?v=53c0693';
import { planMeaning } from './meaning/plan.js?v=53c0693';
import { realise } from './meaning/realize.js?v=53c0693';
/*
 * THE SYNTHESIS READING, AS ONE PIECE OF WRITING (V2.2: MEANING FIRST).
 *
 * Three responsibilities, kept in three places:
 *
 *   A. EVIDENCE SELECTION   `narrativeEvidence.ts` - which calculated results are sufficiently
 *                           supported and genuinely relevant (the V2.1 gate, unchanged), and
 *                           `meaning/voice.ts` - which of them can speak, and for what.
 *   B. NARRATIVE MEANING    `meaning/plan.ts` - relations between those results (an emphasis,
 *                           a convergence, a tension), each backed by an authored statement of
 *                           what the relation produces, ranked by how distinctive the pattern
 *                           is against a typical chart.
 *   C. REALISATION          `meaning/realize.ts` - English for each relation, built from the
 *                           results' own voices.
 *
 * This file only orchestrates them and states the outcome: a reading, or an honest
 * statement that the evidence does not support one. It chooses nothing, ranks nothing and
 * writes nothing of its own.
 *
 * WHAT V2.1 DID DIFFERENTLY
 * It took the portrait's sentences - one authored sentence per THEME - and regrouped
 * them, which is why profiles sharing a theme shared its sentence. V2.2 does not use the
 * portrait's prose at all; the legacy reading still does, unchanged.
 *
 * ENGLISH ONLY. The screen falls back to the legacy reading for any other locale.
 */
function insufficient(pillarsPresent, notice, reason) {
    return {
        version: 'synthesis-narrative/1',
        status: 'insufficient',
        paragraphs: [],
        claims: [],
        notice,
        pillarsPresent,
        dropped: [{ role: 'all', reason }],
    };
}
function noticeFor(source) {
    const { coverage } = source;
    if (coverage.birthTimeEstimated) {
        return 'No birth time was given, so what depends on the hour (the Ascendant, the houses and most of the Human Design mechanics) is left out rather than guessed. This reading rests on fewer facts, not on guessed ones.';
    }
    if (coverage.birthTimePrecision === 'approximate') {
        return 'This reading starts from the birth time you estimated. Anything that could change within two hours of it counts for less.';
    }
    return null;
}
export function composeSynthesisNarrative(source) {
    const pillarsPresent = PILLAR_ORDER.filter((pillar) => source.coverage.pillarsPresent.includes(pillar));
    const notice = noticeFor(source);
    if (pillarsPresent.length < 2) {
        return insufficient(pillarsPresent, notice, `only ${pillarsPresent.length} tradition(s) could be calculated`);
    }
    const plan = planMeaning(source);
    const dropped = plan.notes.map((reason) => ({ role: 'plan', reason }));
    if (plan.findings.length === 0) {
        return insufficient(pillarsPresent, notice, 'no relation between speakable results is written for this profile');
    }
    const realised = realise(plan);
    const status = pillarsPresent.length >= 3 && realised.length >= 3 ? 'full' : 'limited';
    return {
        version: 'synthesis-narrative/1',
        status,
        paragraphs: realised.map((entry) => entry.paragraph),
        claims: realised.flatMap((entry) => entry.claims),
        notice,
        pillarsPresent,
        dropped,
    };
}
