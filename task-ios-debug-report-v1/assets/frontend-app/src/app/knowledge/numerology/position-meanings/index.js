import { unitId } from '../../knowledgeTypes.js?v=b5ef5ed';
import { EXPRESSION_MEANINGS } from './expression.js?v=b5ef5ed';
import { LIFE_PATH_MEANINGS } from './lifePath.js?v=b5ef5ed';
import { PERSONALITY_MEANINGS } from './personality.js?v=b5ef5ed';
import { SOUL_URGE_MEANINGS } from './soulUrge.js?v=b5ef5ed';
import { CORE_NUMBERS, CORE_POSITIONS, } from './types.js?v=b5ef5ed';
export { CORE_NUMBERS, CORE_POSITIONS } from './types.js?v=b5ef5ed';
/**
 * THE CORE-POSITION MEANING DATABASE, v1.
 *
 * Forty-eight records: twelve numbers in each of the four core positions. A record is looked up by (position, number) and nothing else,
 * the number comes from the calculation engine, and nothing here calculates or reduces. A master number has its own record in every
 * position and is never served as its root. See ./types.ts for what a record is and how it sits beside the registry's readings, and
 * docs/numerology/POSITION_MEANING_RESEARCH.md for what it was written from.
 */
export const POSITION_MEANINGS_VERSION = 'numerology-position-meanings-v1.0';
/** The calculation rule set the numbers are produced under. Pinned by a test against core/numerologyMethodology.ts, not imported from it:
    the knowledge layer holds no engine code. */
export const POSITION_MEANINGS_METHODOLOGY = 'numerology-methodology-v1';
const ROLE_FOR = {
    'life-path': 'life-path',
    expression: 'expression',
    'soul-urge': 'soul-urge',
    personality: 'personality',
};
/** `life_path:7`: the lookup key. Underscored so that it reads as a key, and so that it cannot be confused with a role id. */
export const positionMeaningId = (position, number) => `${position.replace('-', '_')}:${number}`;
const MASTER_NUMBERS = [11, 22, 33];
/**
 * Which sources each record was cross-read against - recorded per record, not claimed wholesale. Every record was read against the two
 * position-by-position references (Decoz's World Numerology and Andrews's Numerologist.com pages for exactly that position and number).
 * The Expression overview and the three master-number articles of Numerology.com add a third voice where they speak to the number, and
 * CafeAstrology's number descriptions add a fourth for the four numbers it covers in its own words (7, 11, 22 and 33).
 */
function sourcesFor(position, number) {
    const sources = ['decoz-worldnumerology-2026', 'numerologist-andrews-2026'];
    if (position === 'expression' || MASTER_NUMBERS.includes(number))
        sources.push('numerology-com-staff-2026');
    if (number === 7 || MASTER_NUMBERS.includes(number))
        sources.push('cafeastrology-numbers-2026');
    return sources;
}
const DRAFTS = {
    'life-path': LIFE_PATH_MEANINGS,
    expression: EXPRESSION_MEANINGS,
    'soul-urge': SOUL_URGE_MEANINGS,
    personality: PERSONALITY_MEANINGS,
};
function record(position, number, draft) {
    return {
        id: positionMeaningId(position, number),
        position,
        number,
        unitId: unitId('numerology', 'number', String(number), ROLE_FOR[position]),
        intro: draft.intro,
        meaning: draft.meaning,
        strengths: draft.strengths,
        challenges: draft.challenges,
        manifestations: draft.shows,
        reflection: draft.ask,
        ...(draft.master ? { masterNote: draft.master } : {}),
        sources: sourcesFor(position, number),
        methodologyVersion: POSITION_MEANINGS_METHODOLOGY,
        reviewStatus: 'self-reviewed-awaiting-owner-v1',
    };
}
/** Every record, in position order then number order. Built once; an entry that is missing from a draft table throws at load. */
export const POSITION_MEANINGS = (() => {
    const records = [];
    const seen = new Set();
    for (const position of CORE_POSITIONS) {
        for (const number of CORE_NUMBERS) {
            const draft = DRAFTS[position][number];
            if (!draft)
                throw new Error(`position meaning missing: ${positionMeaningId(position, number)}`);
            const built = record(position, number, draft);
            if (seen.has(built.id))
                throw new Error(`position meaning registered twice: ${built.id}`);
            seen.add(built.id);
            records.push(built);
        }
    }
    return records;
})();
const BY_ID = new Map(POSITION_MEANINGS.map((entry) => [entry.id, entry]));
/**
 * The record for exactly this position and exactly this number, or null.
 *
 * Null for anything that is not one of the twelve values (a Challenge-style 0, a 10, a NaN, a string) and for a position that is not one
 * of the four: there is no nearest match, no reduction and no fallback to another position, because an answer for the wrong number or
 * the wrong position is worse than none.
 */
export function positionMeaningFor(position, number) {
    if (!CORE_POSITIONS.includes(position) || typeof number !== 'number' || !Number.isInteger(number))
        return null;
    return BY_ID.get(positionMeaningId(position, number)) ?? null;
}
