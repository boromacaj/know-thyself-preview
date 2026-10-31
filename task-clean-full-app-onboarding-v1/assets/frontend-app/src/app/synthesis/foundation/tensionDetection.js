import { SEMANTIC_AXES } from '../../semantics/semanticTaxonomy.js?v=f9ab0a6';
import { distinctPillarsOf } from './evidenceIndependence.js?v=f9ab0a6';
import { roundWeight } from './weighting.js?v=f9ab0a6';
/**
 * TENSION DETECTION
 * =================
 *
 * The systems are not required to agree, and forcing them to would destroy the
 * most interesting thing this engine can find. A person described as both
 * strongly independent and strongly relational is not a bug in the data - that
 * combination is a real and recognisable way to be, and saying so is worth more
 * than averaging it into mush.
 *
 * But the opposite failure is just as bad. If every axis with evidence on both
 * ends were reported as a contradiction, the output would be a wall of drama,
 * and a narrative composer downstream would produce exactly the horoscope
 * cliches this project exists to avoid: "you are outgoing, yet you also need
 * time alone" for absolutely everybody.
 *
 * THREE OUTCOMES, NOT ONE
 * -----------------------
 *   TRUE TENSION       - both poles carry real weight, they are close to
 *                        balanced, the minority pole is backed by more than one
 *                        system, AND the axis is one where coexistence is
 *                        genuinely awkward. Rare, and meaningful when it happens.
 *
 *   CONTEXTUAL DUALITY - both poles are real but one clearly leads, or the axis
 *                        is one where both ends coexist unremarkably. Being
 *                        analytical in some settings and intuitive in others is
 *                        not an inner conflict, it is just being a person.
 *
 *   WEAK CONFLICT      - the opposition exists but the minority side is too
 *                        slight to matter. Recorded so it is visible; never
 *                        worth a sentence.
 *
 * The `coexistenceIsOrdinary` flag on each axis is what separates the first two.
 * It is the difference between "you are private about some things and social
 * about others" (ordinary, true of nearly everyone) and "you are simultaneously
 * strongly cautious and strongly risk-seeking" (genuinely in tension).
 */
/** A pole must reach at least this weight for its side to count at all. */
export const TENSION_FLOOR = 0.5;
/**
 * How close to balanced the two poles must be before it is a TRUE tension.
 * min/max >= 0.6 means the weaker side carries at least 60% of the stronger.
 */
export const TRUE_TENSION_BALANCE = 0.6;
/** The minority pole must be argued by this many distinct pillars. */
export const TRUE_TENSION_PILLAR_REQUIREMENT = 2;
export function detectTensions(evidence) {
    const byDimension = new Map();
    for (const item of evidence) {
        const bucket = byDimension.get(item.evidence.dimension);
        if (bucket)
            bucket.push(item);
        else
            byDimension.set(item.evidence.dimension, [item]);
    }
    const tensions = [];
    for (const axis of SEMANTIC_AXES) {
        const sideA = buildSide(axis.poles[0], byDimension.get(axis.poles[0]) ?? []);
        const sideB = buildSide(axis.poles[1], byDimension.get(axis.poles[1]) ?? []);
        /* No opposition at all - one end is silent. Nothing to report. */
        if (sideA.weight <= 0 || sideB.weight <= 0)
            continue;
        const max = Math.max(sideA.weight, sideB.weight);
        const min = Math.min(sideA.weight, sideB.weight);
        const balance = roundWeight(min / max);
        const minoritySide = sideA.weight <= sideB.weight ? sideA : sideB;
        const kind = classify(min, balance, minoritySide.distinctPillars, axis.coexistenceIsOrdinary);
        tensions.push({
            axis: axis.id,
            label: axis.label,
            kind,
            poleA: sideA,
            poleB: sideB,
            balance,
            /* A dead heat has no dominant pole, and saying it does would be a lie the
               narrative layer would happily build a sentence on. */
            dominantPole: sideA.weight === sideB.weight
                ? null
                : (sideA.weight > sideB.weight ? sideA.dimension : sideB.dimension),
        });
    }
    /* Most interesting first: true tensions, then dualities, then noise. */
    const rank = {
        'true-tension': 0,
        'contextual-duality': 1,
        'weak-conflict': 2,
    };
    return tensions.sort((a, b) => (rank[a.kind] - rank[b.kind]
        || b.balance - a.balance
        || a.axis.localeCompare(b.axis)));
}
function classify(minorityWeight, balance, minorityPillars, coexistenceIsOrdinary) {
    /* Too slight on the minority side to be worth anything. */
    if (minorityWeight < TENSION_FLOOR)
        return 'weak-conflict';
    const balanced = balance >= TRUE_TENSION_BALANCE;
    const corroborated = minorityPillars >= TRUE_TENSION_PILLAR_REQUIREMENT;
    /* A single system arguing the minority side is not a cross-pillar tension -
       it is one tradition disagreeing with the others, which is a much weaker
       claim and belongs in the duality bucket. */
    if (balanced && corroborated && !coexistenceIsOrdinary)
        return 'true-tension';
    return 'contextual-duality';
}
function buildSide(dimension, items) {
    /* Suppressed evidence cannot argue a side, so it cannot nominate a pillar. */
    const effective = items.filter((item) => item.countedWeight > 0);
    return {
        dimension,
        weight: roundWeight(effective.reduce((total, item) => total + item.countedWeight, 0)),
        distinctPillars: distinctPillarsOf(effective).length,
        evidence: [...items].sort((a, b) => (b.countedWeight - a.countedWeight || a.evidence.id.localeCompare(b.evidence.id))),
    };
}
