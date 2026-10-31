import { getTarotDeck } from './data/tarotDeck.js?v=b5ef5ed';
import { drawDistinct, webCryptoRandomSource } from './tarotRandom.js?v=b5ef5ed';
import { TAROT_DECK_ID, TAROT_DECK_SCHEMA_VERSION, TAROT_POSITIONS, TAROT_SPREAD_ID, } from './tarotTypes.js?v=b5ef5ed';
/**
 * V1 IS UPRIGHT ONLY, AND THERE IS NO FLAG.
 *
 * Reversals are a product decision that has not been taken, and the cheapest
 * way to be sure they cannot arrive by accident is to leave no switch to flip:
 * the orientation is a constant here, not an option, and no code path
 * randomises it. The stored record still carries the word, so the day
 * reversals do arrive, every spread written before then reads as what it was
 * rather than as unspecified.
 */
const V1_ORIENTATION = 'upright';
export function drawTarotSpread(options) {
    const random = options.random ?? webCryptoRandomSource();
    const cards = drawDistinct(getTarotDeck(), TAROT_POSITIONS.length, random);
    const drawn = TAROT_POSITIONS.map((position, index) => ({
        position,
        cardId: cards[index].id,
        orientation: V1_ORIENTATION,
    }));
    return {
        spreadId: TAROT_SPREAD_ID,
        deckId: TAROT_DECK_ID,
        deckSchemaVersion: TAROT_DECK_SCHEMA_VERSION,
        localDate: options.localDate,
        drawnAt: options.drawnAt,
        timeZone: options.timeZone,
        cards: drawn,
    };
}
