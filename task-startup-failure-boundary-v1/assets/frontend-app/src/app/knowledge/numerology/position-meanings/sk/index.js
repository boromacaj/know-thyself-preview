import { EXPRESSION_MEANINGS_SK } from './expression.js?v=2ea79e9';
import { LIFE_PATH_MEANINGS_SK } from './lifePath.js?v=2ea79e9';
import { PERSONALITY_MEANINGS_SK } from './personality.js?v=2ea79e9';
import { SOUL_URGE_MEANINGS_SK } from './soulUrge.js?v=2ea79e9';
/**
 * THE SLOVAK COMPANIONS OF THE FORTY-EIGHT CORE-POSITION MEANINGS.
 *
 * The same twelve numbers in the same four positions, written again in Slovak (not translated word for word) under the project's house
 * rules (app/knowledge/translations/SLOVAK_STYLE.md: tykanie, short plain sentences, nothing added to the source's confidence). A record is
 * still identified, and looked up, by the English database (position, number): nothing here has an identity of its own, and nothing here
 * calculates. The meaning sheet imports this module only when the reader's language is Slovak, so an English reader never loads it.
 */
const SK = {
    'life-path': LIFE_PATH_MEANINGS_SK,
    expression: EXPRESSION_MEANINGS_SK,
    'soul-urge': SOUL_URGE_MEANINGS_SK,
    personality: PERSONALITY_MEANINGS_SK,
};
/** The Slovak draft for exactly this position and number, or null. No nearest match and no reduction, as in the English database. */
export function positionMeaningDraftSk(position, number) {
    return SK[position]?.[number] ?? null;
}
export const POSITION_MEANINGS_SK = SK;
