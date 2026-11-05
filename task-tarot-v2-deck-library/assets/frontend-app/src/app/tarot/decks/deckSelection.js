import { DEFAULT_TAROT_DECK_ID, getTarotDeckDefinition, isReadingCompatibleDeck, listShownTarotDecks, } from './deckRegistry.js?v=f2c3a78';
/**
 * WHICH DECK IS ON THE TABLE.
 *
 * Two answers, because the library holds two kinds of deck:
 *
 *   shownDeck    the deck the encyclopedia and the library picture the cards in. Any deck that is not withheld.
 *   readingDeck  the deck a reading's cards are pictured in. Only a full compatible (class A) deck, because a reading must
 *                never show a historical card whose figure or symbolism is not the one the words describe.
 *
 * Choosing a class A deck sets both. Choosing a historical or partial deck sets only the first and leaves the reading deck
 * where it was, and the library says so. Neither answer touches the Tarot engine: a draw is canonical card ids, stored and
 * read exactly as before (tarotPersistence.ts), and the same draw reads the same in every deck.
 *
 * STORED THE WAY THE APP STORES THINGS: one namespaced key, a schema version, a try/catch around every access, and a record
 * that is either exactly right or ignored. A deck id that is unknown, withheld or no longer in the registry falls back to the
 * default instead of leaving a card without a picture.
 */
export const TAROT_DECK_STORAGE_KEY = 'knowthyself.tarot.deck';
export const TAROT_DECK_SCHEMA_VERSION = 1;
export const TAROT_DECK_CHANGED_EVENT = 'kt:tarot-deck-changed';
const DEFAULT_SELECTION = { shownDeckId: DEFAULT_TAROT_DECK_ID, readingDeckId: DEFAULT_TAROT_DECK_ID };
function safeStorage() {
    try {
        return typeof window !== 'undefined' ? window.localStorage : undefined;
    }
    catch {
        return undefined;
    }
}
/** A deck id is usable when the registry knows it and it is not withheld. */
const usable = (deckId) => {
    if (typeof deckId !== 'string')
        return false;
    const deck = getTarotDeckDefinition(deckId);
    return deck !== null && deck.availabilityStatus !== 'withheld' && deck.cardCount > 0;
};
/** Pure: what a stored value means, with every doubt resolved to the default. */
export function parseTarotDeckSelection(raw) {
    if (!raw)
        return DEFAULT_SELECTION;
    let value;
    try {
        value = JSON.parse(raw);
    }
    catch {
        return DEFAULT_SELECTION;
    }
    if (typeof value !== 'object' || value === null)
        return DEFAULT_SELECTION;
    const record = value;
    if (record.v !== TAROT_DECK_SCHEMA_VERSION)
        return DEFAULT_SELECTION;
    const shown = usable(record.shownDeckId) ? record.shownDeckId : DEFAULT_TAROT_DECK_ID;
    const readingCandidate = usable(record.readingDeckId) ? getTarotDeckDefinition(record.readingDeckId) : null;
    const reading = readingCandidate !== null && isReadingCompatibleDeck(readingCandidate) ? readingCandidate.deckId : DEFAULT_TAROT_DECK_ID;
    return { shownDeckId: shown, readingDeckId: reading };
}
let current = null;
/**
 * The choice, from memory once it has been read: a card face asks for it on every redraw, and a redraw should not parse JSON.
 * An explicit `storage` (the tests, and a caller that wants the stored truth) reads it afresh.
 */
export function readTarotDeckSelection(storage) {
    if (storage === undefined && current !== null)
        return current;
    let raw = null;
    try {
        raw = (storage ?? safeStorage())?.getItem(TAROT_DECK_STORAGE_KEY) ?? null;
    }
    catch {
        raw = null;
    }
    const parsed = raw === null && current !== null ? current : parseTarotDeckSelection(raw);
    current = parsed;
    return parsed;
}
/* Another tab changed the choice: forget the copy so the next read goes to storage. */
if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener('storage', (event) => { if (event.key === TAROT_DECK_STORAGE_KEY || event.key === null)
        current = null; });
}
/** The deck the encyclopedia and the library show. */
export const shownTarotDeck = () => getTarotDeckDefinition(readTarotDeckSelection().shownDeckId) ?? getTarotDeckDefinition(DEFAULT_TAROT_DECK_ID);
/** The deck a reading's cards are drawn in. Always a full compatible deck. */
export const readingTarotDeck = () => getTarotDeckDefinition(readTarotDeckSelection().readingDeckId) ?? getTarotDeckDefinition(DEFAULT_TAROT_DECK_ID);
/** Applies a deck. An unknown or withheld id changes nothing. Persists, then tells the screens. */
export function applyTarotDeck(deckId, explicitStorage) {
    const storage = explicitStorage ?? safeStorage();
    const before = readTarotDeckSelection(explicitStorage);
    const deck = usable(deckId) ? getTarotDeckDefinition(deckId) : null;
    if (deck === null)
        return { applied: false, selection: before, readingsUnchanged: true };
    const compatible = isReadingCompatibleDeck(deck);
    const next = { shownDeckId: deck.deckId, readingDeckId: compatible ? deck.deckId : before.readingDeckId };
    current = next;
    try {
        storage?.setItem(TAROT_DECK_STORAGE_KEY, JSON.stringify({ v: TAROT_DECK_SCHEMA_VERSION, ...next }));
    }
    catch {
        /* Storage can be full or blocked; the choice then lasts until the page closes, which is the honest degradation. */
    }
    if (typeof document !== 'undefined') {
        document.dispatchEvent(new CustomEvent(TAROT_DECK_CHANGED_EVENT, { detail: { ...next, previous: before } }));
    }
    return { applied: true, selection: next, readingsUnchanged: !compatible };
}
/** Test seam: forget the in-memory copy so the next read goes to storage. */
export function resetTarotDeckSelectionCache() {
    current = null;
}
export const selectableTarotDecks = () => listShownTarotDecks();
