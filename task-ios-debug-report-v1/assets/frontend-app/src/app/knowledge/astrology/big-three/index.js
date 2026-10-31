import { unitId } from '../../knowledgeTypes.js?v=b5ef5ed';
import { ASCENDANT_MEANINGS } from './ascendant.js?v=b5ef5ed';
import { MOON_MEANINGS } from './moon.js?v=b5ef5ed';
import { SIGN_FACTS } from './signFacts.js?v=b5ef5ed';
import { SUN_MEANINGS } from './sun.js?v=b5ef5ed';
import { BIG_THREE_PLACEMENTS, ZODIAC_SIGNS, } from './types.js?v=b5ef5ed';
export { BIG_THREE_PLACEMENTS, ZODIAC_SIGNS } from './types.js?v=b5ef5ed';
export { SIGN_FACTS } from './signFacts.js?v=b5ef5ed';
/**
 * THE BIG THREE MEANING DATABASE, v1.
 *
 * Thirty-six records: the twelve signs as a Sun, as a Moon and as an Ascendant. A record is looked up by (placement, sign) and nothing else, the sign
 * comes from the astrology engine, and nothing here calculates. An Ascendant that the engine withholds (no birth time) has no sign and so no record: it is
 * never filled in. See ./types.ts for what a record is and how it sits beside the registry's readings, and docs/astrology/BIG_THREE_RESEARCH.md for what
 * it was written from.
 */
export const BIG_THREE_VERSION = 'astrology-big-three-v1.0';
/** The rule set the signs come from: the engine's tropical zodiac and Whole Sign houses (astronomy-engine); named, not imported - the knowledge layer holds no engine code. */
export const BIG_THREE_METHODOLOGY = 'western-astrology-tropical-whole-sign-v1';
const DRAFTS = {
    sun: SUN_MEANINGS,
    moon: MOON_MEANINGS,
    ascendant: ASCENDANT_MEANINGS,
};
/**
 * Which sources each record was cross-read against. Every record was read against both position-specific references (CafeAstrology's natal chart
 * interpretations and Astrology.com's page for that placement and sign); the structural facts (element, modality, ruler) also against the
 * Wikipedia table of the signs.
 */
const SOURCES_FOR = (_placement) => [
    'cafeastrology-natal-chart-interpretations-2026',
    'astrology-com-placements-2026',
    'wikipedia-astrological-sign-2026',
];
export const bigThreeId = (placement, sign) => `${placement}:${sign}`;
/** The registry unit a record accompanies: the Sun's or Moon's reading in that sign, and for an Ascendant the sign's own archetype (the unit the reading draws from). */
export function bigThreeUnitId(placement, sign) {
    return placement === 'ascendant'
        ? unitId('western-astrology', 'sign', sign, 'base-archetype')
        : unitId('western-astrology', 'planet', `${placement}-${sign}`, 'natal-placement');
}
function record(placement, sign, draft) {
    const facts = SIGN_FACTS[sign];
    return {
        id: bigThreeId(placement, sign),
        placement,
        sign,
        unitId: bigThreeUnitId(placement, sign),
        title: draft.title,
        intro: facts.intro,
        meaning: draft.meaning,
        strengths: draft.strengths,
        challenges: draft.challenges,
        manifestations: draft.shows,
        reflection: draft.ask,
        element: facts.element,
        modality: facts.modality,
        ruler: facts.ruler,
        ...(facts.traditionalRuler ? { traditionalRuler: facts.traditionalRuler } : {}),
        sources: SOURCES_FOR(placement),
        methodologyVersion: BIG_THREE_METHODOLOGY,
        reviewStatus: 'self-reviewed-awaiting-owner-v1',
    };
}
/** Every record, placement by placement, signs in zodiac order. Built once; an entry missing from a draft table throws at load. */
export const BIG_THREE_MEANINGS = (() => {
    const records = [];
    const seen = new Set();
    for (const placement of BIG_THREE_PLACEMENTS) {
        for (const sign of ZODIAC_SIGNS) {
            const draft = DRAFTS[placement][sign];
            if (!draft)
                throw new Error(`big three meaning missing: ${bigThreeId(placement, sign)}`);
            const built = record(placement, sign, draft);
            if (seen.has(built.id))
                throw new Error(`big three meaning registered twice: ${built.id}`);
            seen.add(built.id);
            records.push(built);
        }
    }
    return records;
})();
const BY_ID = new Map(BIG_THREE_MEANINGS.map((entry) => [entry.id, entry]));
/**
 * The record for exactly this placement and exactly this sign, or null. Null for anything that is not one of the twelve signs or one of the three
 * placements (a planet, an angle other than the Ascendant, a misspelling, a number): there is no nearest match and no fallback to another placement,
 * because a Moon sheet shown for a Sun is worse than none.
 */
export function bigThreeMeaningFor(placement, sign) {
    if (!BIG_THREE_PLACEMENTS.includes(placement) || typeof sign !== 'string')
        return null;
    const key = sign.trim().toLowerCase();
    if (!ZODIAC_SIGNS.includes(key))
        return null;
    return BY_ID.get(bigThreeId(placement, key)) ?? null;
}
