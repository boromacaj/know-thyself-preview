import { getTarotDeck } from './data/tarotDeck.js';
import { DEFAULT_TAROT_JUMPER_POLICY, } from './tarotJumperPolicy.js';
import { DEFAULT_TAROT_ORIENTATION_POLICY, } from './tarotOrientationPolicy.js';
import { secureRandomInt, webCryptoRandomSource } from './tarotRandom.js';
import { TAROT_DECK_ID, TAROT_DECK_SCHEMA_VERSION, } from './tarotTypes.js';
/**
 * A uniform permutation of the whole deck.
 *
 * Fisher-Yates over a copy, using the SAME unbiased integer primitive the
 * three-card draw uses - `secureRandomInt`, with its rejection sampling. A
 * second shuffling routine with its own modulo would be a second place for
 * modulo bias to come back, so there is not one.
 *
 * Walking downwards and swapping with an index at or below the cursor is the
 * correct form. The variant that picks from the whole array at every step is the
 * classic mistake: it produces n^n equally likely sequences rather than n!
 * equally likely permutations, which is not uniform.
 */
function permute(items, random) {
    const pool = [...items];
    for (let index = pool.length - 1; index > 0; index -= 1) {
        const swap = secureRandomInt(index + 1, random);
        const held = pool[index];
        pool[index] = pool[swap];
        pool[swap] = held;
    }
    return pool;
}
/**
 * Commit a full deck: every card placed, every orientation fixed, the Jumper
 * already decided.
 *
 * Throws only when there is no cryptographic source, which the random module
 * refuses to work around. Every other outcome is a valid deck.
 */
export function commitTarotDeck(options = {}) {
    const random = options.random ?? webCryptoRandomSource();
    const orientationPolicy = options.orientationPolicy ?? DEFAULT_TAROT_ORIENTATION_POLICY;
    const jumperPolicy = options.jumperPolicy ?? DEFAULT_TAROT_JUMPER_POLICY;
    const deck = getTarotDeck();
    const shuffled = permute(deck, random);
    const positions = shuffled.map((card, index) => ({
        position: index + 1,
        cardId: card.id,
        orientation: orientationPolicy.orientationFor({ subject: 'deck-position', position: index + 1 }, random),
    }));
    /*
     * THE JUMPER IS DRAWN FROM THE DECK THAT WAS JUST COMMITTED.
     *
     * Not generated separately, because a jumper that was not already in the deck
     * would be a 79th card - and because "which card jumped" has to be a fact
     * about this shuffle for returning it to mean anything.
     *
     * The count is clamped to the policy's own ceiling rather than trusted: a
     * policy is data, and data can be wrong. V1 interprets at most one, so
     * anything above the clamp is dropped rather than silently interpreted.
     */
    const requested = jumperPolicy.jumperCountFor(random);
    const wanted = Math.max(0, Math.min(jumperPolicy.maxJumpers, Math.trunc(requested)));
    let jumper = null;
    if (wanted > 0) {
        const from = positions[secureRandomInt(positions.length, random)];
        jumper = {
            position: from.position,
            cardId: from.cardId,
            /* The Jumper's orientation is asked for separately, because whether it
               follows the deck's rule is an open decision. A policy that does not care
               returns the same answer either way. */
            orientation: orientationPolicy.orientationFor({ subject: 'jumper' }, random),
        };
    }
    const deckOut = {
        deckId: TAROT_DECK_ID,
        deckSchemaVersion: TAROT_DECK_SCHEMA_VERSION,
        positions,
        jumper,
        orientationPolicyId: orientationPolicy.id,
        jumperPolicyId: jumperPolicy.id,
        provisionalPolicies: orientationPolicy.provisional || jumperPolicy.provisional,
    };
    assertCommittedDeck(deckOut);
    return deckOut;
}
/**
 * Every promise this module makes, checked before the deck leaves it.
 *
 * Not a test - a production assertion. A deck that lost a card or repeated one
 * would produce a reading nobody could explain, and the failure would surface
 * hours later as a strange spread rather than here as an error. It costs one
 * pass over 78 items, once a day.
 */
export function assertCommittedDeck(deck) {
    const expected = getTarotDeck().length;
    if (deck.positions.length !== expected) {
        throw new Error(`A committed deck holds ${deck.positions.length} positions; expected ${expected}.`);
    }
    const seenCards = new Set();
    for (let index = 0; index < deck.positions.length; index += 1) {
        const entry = deck.positions[index];
        if (entry.position !== index + 1) {
            throw new Error(`Position ${entry.position} is at index ${index}; positions must be 1..n in order.`);
        }
        if (seenCards.has(entry.cardId)) {
            throw new Error(`The card ${entry.cardId} appears twice in one committed deck.`);
        }
        seenCards.add(entry.cardId);
        if (entry.orientation !== 'upright' && entry.orientation !== 'reversed') {
            throw new Error(`Position ${entry.position} has no committed orientation.`);
        }
    }
    if (seenCards.size !== expected) {
        throw new Error(`A committed deck holds ${seenCards.size} distinct cards; expected ${expected}.`);
    }
    if (deck.jumper) {
        const source = deck.positions[deck.jumper.position - 1];
        if (!source || source.cardId !== deck.jumper.cardId) {
            throw new Error(`The jumper claims position ${deck.jumper.position}, which holds a different card.`);
        }
    }
}
/** The position record for a 1-based position, or null when out of range. */
export function hiddenPositionAt(deck, position) {
    if (!Number.isInteger(position) || position < 1 || position > deck.positions.length)
        return null;
    return deck.positions[position - 1];
}
