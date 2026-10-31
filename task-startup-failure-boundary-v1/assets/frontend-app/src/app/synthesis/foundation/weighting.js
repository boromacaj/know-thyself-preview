import { independenceDiscounts } from './evidenceIndependence.js?v=2ea79e9';
import { KIND_FACTOR, METHODOLOGY_FACTOR, SETTLEDNESS_FACTOR, } from '../../semantics/provenance.js?v=2ea79e9';
/**
 * THE WEIGHTING MODEL
 * ===================
 *
 * Four independent factors multiply into one raw weight, then the independence
 * discount is applied. Every number is a named constant in this file and every
 * one is reported back on the WeightedEvidence, so any weight in the output can
 * be reproduced by hand from the evidence item alone.
 *
 * Multiplication rather than addition is deliberate. These factors are not
 * separate contributions to be summed; they are successive reasons to trust the
 * item less. A contested reading of a slight source should end up near zero, and
 * multiplying gets there while averaging would keep it respectable.
 *
 * WHY THE NUMBERS ARE NOT EQUAL
 * -----------------------------
 * Treating every source as equal would be the easy defensible-looking choice and
 * it would be wrong. Traditions have their own hierarchies and ignoring them
 * flattens real information: in numerology the Life Path is not the peer of the
 * Personal Day number, and pretending otherwise lets transient noise outvote the
 * central symbol. The strength scale encodes each system's own ordering, and
 * nothing more - it is not a claim that one tradition outranks another.
 *
 * SUPPRESSED MEANS ZERO
 * ---------------------
 * When an engine refuses to compute something - Human Design mechanics or the
 * astrological angles under an estimated birth time - the factor is 0, not a
 * small number. The evidence is retained in the output for inspection but it
 * cannot influence any theme. Downgrading rather than excluding would let a
 * profile with no birth time quietly accumulate conclusions it has not earned.
 */
const STRENGTH_FACTOR = {
    /* The symbol the system is organised around. */
    defining: 1,
    strong: 0.75,
    moderate: 0.5,
    /* Real, but a practitioner would mention it last. */
    slight: 0.25,
};
/* KIND_FACTOR, SETTLEDNESS_FACTOR and METHODOLOGY_FACTOR are imported from
   app/semantics/provenance.js. They are not restated here, because the knowledge
   layer authors the fields they key off and a second table would be a second
   opinion about the same enum. */
/**
 * The five factors for one evidence item, before independence discounting.
 *
 * `semanticWeight` is the fifth and it is new to the integrated model. The
 * knowledge layer states how strongly a unit reads on a dimension - a Life Path
 * 7 is 0.9 introspective and only 0.5 private - and throwing that away at the
 * adapter boundary would have flattened every reading a unit makes into the same
 * vote. It is a magnitude in (0, 1], so it can only ever reduce weight, and a
 * structural fact with no knowledge unit behind it uses 1.
 */
export function evidenceFactors(evidence) {
    return {
        strength: STRENGTH_FACTOR[evidence.strength],
        semanticWeight: evidence.semanticWeight,
        interpretationKind: KIND_FACTOR[evidence.interpretationKind],
        settledness: SETTLEDNESS_FACTOR[evidence.settledness],
        methodology: METHODOLOGY_FACTOR[evidence.methodology],
    };
}
export function rawWeightOf(evidence) {
    const f = evidenceFactors(evidence);
    return f.strength * f.semanticWeight * f.interpretationKind * f.settledness * f.methodology;
}
/**
 * Weigh a full evidence set, applying the independence discount across it.
 *
 * The discount is computed over the WHOLE set exactly once, not per theme. If it
 * were recomputed per theme, an item could be the full-weight representative of
 * its group in one theme and discounted in another, and the same profile would
 * report inconsistent arithmetic depending on which theme you looked at.
 */
export function weighEvidence(evidence) {
    const raw = evidence.map((item) => ({ evidence: item, rawWeight: rawWeightOf(item) }));
    const discounts = independenceDiscounts(raw);
    return raw.map(({ evidence: item, rawWeight }) => {
        const discount = discounts.get(item.id) ?? 1;
        const factors = evidenceFactors(item);
        return {
            evidence: item,
            /* Rounded here, not only at the theme boundary. Multiplying four factors
               leaves values like 0.04000000000000001, and an unrounded per-item weight
               would leak that into every consumer that does its own arithmetic over
               the evidence - which is exactly what an inspectable layer must not do. */
            rawWeight: roundWeight(rawWeight),
            countedWeight: roundWeight(rawWeight * discount),
            isGroupRepresentative: discount === 1,
            factors: { ...factors, independenceDiscount: discount },
        };
    });
}
/** Total counted weight of a set. */
export function totalWeight(items) {
    return items.reduce((sum, item) => sum + item.countedWeight, 0);
}
/**
 * Rounding used on every weight that reaches the output.
 *
 * Floating-point sums depend on addition order, and evidence order can shift
 * when an adapter is edited. Rounding to four places at the boundary keeps the
 * determinism guarantee ("same input, same synthesis") true in practice and not
 * just in principle.
 */
export function roundWeight(value) {
    return Math.round(value * 10000) / 10000;
}
