import { isKnownTarotCardId } from './data/tarotDeck.js?v=53c0693';
import { isCivilDate } from './tarotClock.js?v=53c0693';
import { TAROT_DECK_ID, TAROT_DECK_SCHEMA_VERSION, TAROT_ORIENTATIONS, TAROT_POSITIONS, TAROT_SPREAD_ID, } from './tarotTypes.js?v=53c0693';
/**
 * KEEPING THE DAY'S SPREAD, AND NOT TRUSTING IT WHEN IT COMES BACK.
 *
 * One namespaced key holding one record, in the shape the rest of the app
 * already uses for stored state (see profilePersistence.ts): a schema version,
 * injectable storage, a try/catch around every access, and whole-object
 * validation that rejects the entire record on any single bad field rather than
 * patching it.
 *
 * WHY WHOLE-OBJECT REJECTION. A spread is three interdependent facts - three
 * distinct cards, in three distinct positions, on one date. Repairing a record
 * field by field could reconstruct a combination the engine would never have
 * produced: two Guidance positions, the same card twice, a date from a deck
 * that no longer exists. A partially-mended spread is worse than a new one,
 * because it looks like something the reader was given. So a record is either
 * exactly right or it is discarded and redrawn atomically.
 *
 * WHAT IS STORED IS IDENTITY, NEVER CONTENT. Card ids, position ids, an
 * orientation word, a date, a timestamp and a zone. No titles, no meanings, no
 * localized strings - so translating the deck or writing the interpretations
 * can never invalidate a draw somebody already has.
 */
/** Namespaced the way the rest of this app namespaces stored state. */
export const TAROT_STORAGE_KEY = 'knowthyself.tarot.daily';
/**
 * Bumped only when a stored record can no longer be read by this code.
 *
 * Adding a field that older readers can ignore does not need a bump; changing
 * what an existing field means does. A record whose version this build does not
 * recognise is reported as unsupported rather than guessed at - see
 * `readStoredTarotSpread`.
 */
export const TAROT_SCHEMA_VERSION = 1;
function safeLocalStorage() {
    try {
        return typeof window !== 'undefined' ? window.localStorage : undefined;
    }
    catch {
        /* Locked-down iframes and some private-browsing modes throw on access
           rather than returning undefined. */
        return undefined;
    }
}
const invalid = (code, detail) => ({ kind: 'invalid', diagnostic: { code, detail, recovered: false } });
const isRecord = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);
/**
 * Turn an unknown parsed payload into a spread, or say precisely why not.
 *
 * Exported so the tests and the audit script can push deliberately broken
 * records through the exact function production uses, rather than a copy of it
 * that might drift.
 */
export function validateStoredTarotSpread(value) {
    if (!isRecord(value))
        return invalid('storage-corrupt', 'The stored record is not an object.');
    /* Version first: an unsupported record is a different thing from a broken
       one, and a future shape must not be reported as corruption. */
    const { schemaVersion } = value;
    if (typeof schemaVersion !== 'number' || !Number.isInteger(schemaVersion)) {
        return invalid('storage-corrupt', 'The stored record has no usable schemaVersion.');
    }
    if (schemaVersion !== TAROT_SCHEMA_VERSION) {
        return invalid('schema-unsupported', `Stored schema ${schemaVersion} cannot be read by this build (expected ${TAROT_SCHEMA_VERSION}).`);
    }
    /* Deck identity: a spread is only meaningful against the deck it came from. */
    if (value.deckId !== TAROT_DECK_ID) {
        return invalid('deck-mismatch', `The record names deck "${String(value.deckId)}".`);
    }
    if (value.deckSchemaVersion !== TAROT_DECK_SCHEMA_VERSION) {
        return invalid('deck-mismatch', `The record names deck schema ${String(value.deckSchemaVersion)}.`);
    }
    if (value.spreadId !== TAROT_SPREAD_ID) {
        return invalid('storage-corrupt', `The record names spread "${String(value.spreadId)}".`);
    }
    if (!isCivilDate(value.localDate)) {
        return invalid('storage-corrupt', `"${String(value.localDate)}" is not a civil date.`);
    }
    if (typeof value.drawnAt !== 'number' || !Number.isFinite(value.drawnAt)) {
        return invalid('storage-corrupt', 'The record has no usable drawnAt timestamp.');
    }
    if (typeof value.timeZone !== 'string') {
        return invalid('storage-corrupt', 'The record has no usable timeZone.');
    }
    const { cards } = value;
    if (!Array.isArray(cards) || cards.length !== TAROT_POSITIONS.length) {
        return invalid('storage-corrupt', `The record holds ${Array.isArray(cards) ? cards.length : 'no'} cards; a spread is ${TAROT_POSITIONS.length}.`);
    }
    const drawn = [];
    const seenPositions = new Set();
    const seenCards = new Set();
    for (const entry of cards) {
        if (!isRecord(entry))
            return invalid('storage-corrupt', 'A stored card is not an object.');
        const position = entry.position;
        if (typeof position !== 'string' || !TAROT_POSITIONS.includes(position)) {
            return invalid('storage-corrupt', `"${String(position)}" is not a spread position.`);
        }
        if (seenPositions.has(position)) {
            return invalid('storage-corrupt', `The position "${position}" appears twice.`);
        }
        seenPositions.add(position);
        const cardId = entry.cardId;
        if (typeof cardId !== 'string' || !isKnownTarotCardId(cardId)) {
            return invalid('storage-corrupt', `"${String(cardId)}" is not a card in this deck.`);
        }
        if (seenCards.has(cardId)) {
            return invalid('storage-corrupt', `The card "${cardId}" appears twice in one spread.`);
        }
        seenCards.add(cardId);
        const orientation = entry.orientation;
        if (typeof orientation !== 'string'
            || !TAROT_ORIENTATIONS.includes(orientation)) {
            return invalid('storage-corrupt', `"${String(orientation)}" is not an orientation.`);
        }
        drawn.push({
            position: position,
            cardId,
            orientation: orientation,
        });
    }
    /* Every position must be present, not merely non-repeating. */
    for (const position of TAROT_POSITIONS) {
        if (!seenPositions.has(position)) {
            return invalid('storage-corrupt', `The spread has no "${position}" position.`);
        }
    }
    /* Stored in reading order, whatever order the record happened to list. */
    const byPosition = new Map(drawn.map((card) => [card.position, card]));
    const ordered = TAROT_POSITIONS.map((position) => byPosition.get(position));
    return {
        kind: 'ok',
        spread: {
            spreadId: TAROT_SPREAD_ID,
            deckId: TAROT_DECK_ID,
            deckSchemaVersion: TAROT_DECK_SCHEMA_VERSION,
            localDate: value.localDate,
            drawnAt: value.drawnAt,
            timeZone: value.timeZone,
            cards: ordered,
        },
    };
}
export function readStoredTarotSpread(storage = safeLocalStorage()) {
    if (!storage) {
        return { kind: 'invalid', diagnostic: {
                code: 'storage-unavailable',
                detail: 'No local storage is available in this environment.',
                recovered: false,
            } };
    }
    let raw;
    try {
        raw = storage.getItem(TAROT_STORAGE_KEY);
    }
    catch {
        return invalid('storage-unavailable', 'Reading from local storage threw.');
    }
    if (raw === null || raw === '')
        return { kind: 'empty' };
    let parsed;
    try {
        parsed = JSON.parse(raw);
    }
    catch {
        return invalid('storage-corrupt', 'The stored record is not valid JSON.');
    }
    return validateStoredTarotSpread(parsed);
}
/** True when the write landed. A false is a diagnostic, never a thrown error. */
export function writeStoredTarotSpread(spread, storage = safeLocalStorage()) {
    if (!storage)
        return false;
    const record = {
        schemaVersion: TAROT_SCHEMA_VERSION,
        deckId: spread.deckId,
        deckSchemaVersion: spread.deckSchemaVersion,
        spreadId: spread.spreadId,
        localDate: spread.localDate,
        drawnAt: spread.drawnAt,
        timeZone: spread.timeZone,
        cards: spread.cards.map((card) => ({
            position: card.position,
            cardId: card.cardId,
            orientation: card.orientation,
        })),
    };
    try {
        storage.setItem(TAROT_STORAGE_KEY, JSON.stringify(record));
        return true;
    }
    catch {
        /* Quota, disabled storage, private browsing. The draw itself is still
           valid and is returned; it simply will not survive a reload. */
        return false;
    }
}
/**
 * Remove the stored record.
 *
 * NOT a production operation and deliberately not part of the engine's API:
 * clearing the day's spread is exactly the redraw the product forbids. It
 * exists so tests and the audit script can start from an empty slate, and the
 * engine itself never calls it.
 */
export function clearStoredTarotSpread(storage = safeLocalStorage()) {
    if (!storage)
        return;
    try {
        storage.removeItem(TAROT_STORAGE_KEY);
    }
    catch {
        /* Nothing to do if storage is unavailable - there is nothing to clear. */
    }
}
