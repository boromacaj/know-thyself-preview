import { getTarotDeck } from '../data/tarotDeck.js';
import { TAROT_ORIENTATION_ALL_UPRIGHT, DEFAULT_TAROT_ORIENTATION_POLICY, } from '../tarotOrientationPolicy.js';
import { drawDistinct, webCryptoRandomSource } from '../tarotRandom.js';
export function drawForSpread(spread, options = {}) {
    const random = options.random ?? webCryptoRandomSource();
    const policy = options.reversals
        ? options.orientationPolicy ?? DEFAULT_TAROT_ORIENTATION_POLICY
        : TAROT_ORIENTATION_ALL_UPRIGHT;
    const cards = drawDistinct(getTarotDeck(), spread.positions.length, random);
    return spread.positions.map((position, index) => ({
        positionId: position.id,
        cardId: cards[index].id,
        orientation: policy.orientationFor({ subject: 'deck-position', position: index + 1 }, random),
    }));
}
/**
 * The same result from a deck that was committed and shuffled beforehand, for a
 * flow in which a person chooses face-down places: picks are 1-based positions in
 * the committed deck, in the order the spread's places are filled. Refuses a
 * place chosen twice or outside the deck - a duplicate would put one card in two
 * positions.
 */
export function drawnFromCommittedDeck(spread, deck, picks) {
    if (picks.length !== spread.positions.length) {
        throw new RangeError(`This spread needs ${spread.positions.length} picks, received ${picks.length}.`);
    }
    if (new Set(picks).size !== picks.length)
        throw new RangeError('A place in the deck cannot be chosen twice.');
    return picks.map((pick, index) => {
        const hidden = deck.positions[pick - 1];
        if (!Number.isInteger(pick) || !hidden)
            throw new RangeError(`There is no place ${pick} in the deck.`);
        return { positionId: spread.positions[index].id, cardId: hidden.cardId, orientation: hidden.orientation };
    });
}
