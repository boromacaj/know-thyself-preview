import { TAROT_DECK } from '../data/tarotDeck.js?v=f9ab0a6';
import { TAROT_MAJOR_SEMANTICS } from './tarotMajorSemantics.js?v=f9ab0a6';
import { TAROT_MINOR_SEMANTICS } from './tarotMinorSemantics.js?v=f9ab0a6';
/**
 * THE SEMANTIC LAYER, ASSEMBLED.
 *
 * Seventy-eight models against seventy-eight cards. The content model version is
 * separate from the deck version on purpose: the cards a draw records never
 * change, and the reading of them will. A spread stored today stays readable
 * when the interpretation improves, because the draw and the interpretation are
 * different things with different lifetimes.
 */
/**
 * Bumped when the semantics change in a way that alters readings.
 *
 * A stored draw is NEVER rewritten when this moves. The same three card ids
 * render through whatever content version is current, which is the decision
 * documented in TAROT_CONTENT_MODEL.md - the draw is immutable, the reading of
 * it is not, and snapshotting prose would freeze a reader into whichever
 * version happened to exist the day they drew.
 */
export const TAROT_CONTENT_VERSION = 1;
const ALL = [...TAROT_MAJOR_SEMANTICS, ...TAROT_MINOR_SEMANTICS];
const BY_ID = new Map(ALL.map((entry) => [entry.id, entry]));
/**
 * The semantics for a card, or null for an id this content version does not
 * model. Never throws: a caller holding an older record must degrade rather
 * than crash.
 */
export function getTarotSemantics(cardId) {
    return BY_ID.get(cardId) ?? null;
}
export function allTarotSemantics() {
    return ALL;
}
/**
 * Every card in the deck has a model, and every model names a card in the deck.
 *
 * Checked at module load rather than only in tests, because a missing model is
 * not a cosmetic fault - it is a card that can be drawn and cannot be read, and
 * the draw has no way to avoid it. Failing here surfaces it at build time.
 */
const DECK_IDS = new Set(TAROT_DECK.map((card) => card.id));
const missing = TAROT_DECK.filter((card) => !BY_ID.has(card.id)).map((card) => card.id);
const stray = ALL.filter((entry) => !DECK_IDS.has(entry.id)).map((entry) => entry.id);
if (missing.length > 0 || stray.length > 0) {
    throw new Error(`Tarot semantics do not match the deck. Missing: ${missing.join(', ') || 'none'}. `
        + `Unknown: ${stray.join(', ') || 'none'}.`);
}
