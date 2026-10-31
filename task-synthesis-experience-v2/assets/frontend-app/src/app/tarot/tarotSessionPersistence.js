import { isKnownTarotCardId, getTarotDeck } from './data/tarotDeck.js?v=53c0693';
import { isCivilDate } from './tarotClock.js?v=53c0693';
import { assertCommittedDeck, } from './tarotShuffle.js?v=53c0693';
import { TAROT_DECK_ID, TAROT_DECK_SCHEMA_VERSION, TAROT_ORIENTATIONS, TAROT_POSITIONS, } from './tarotTypes.js?v=53c0693';
/**
 * KEEPING THE DAY'S INTERACTION, AND NOT TRUSTING IT WHEN IT COMES BACK.
 *
 * The old engine stored a finished spread: three cards and a date. An interactive
 * draw has to store enough to put the human back exactly where they were - which
 * is the committed deck itself, because the whole point is that the deck existed
 * before they chose and must be the same deck when they come back.
 *
 * WHAT IS STORED, AND WHY EACH THING HAS TO BE.
 *
 *   the full permutation   78 card ids in position order. Without it, a reload
 *                          would have to re-shuffle, and the human would be
 *                          choosing from a different deck - which is the redraw
 *                          the product forbids, arriving through the back door.
 *   the orientations       committed with the permutation (Mathers's two
 *                          objects). Storing cards without orientations would
 *                          mean re-deciding them on reload.
 *   the jumper state       which card jumped, and whether the human accepted it.
 *                          A decision the human made is not re-askable.
 *   the selections         in order, because the order IS the roles.
 *   the two fates          what the policy said accept and reject do. A stored
 *                          session must not change behaviour because a policy
 *                          constant was edited between visits.
 *   policy ids             so a session made under a development policy can be
 *                          identified after the real policy is chosen.
 *
 * WHAT IS NOT STORED. No phase - it is derived from the selections, and a stored
 * copy would be a second truth to disagree with. No animation state, no scroll
 * position, no reveal flags: those are presentation, and a session restored on a
 * different screen size must not carry the old screen's geometry.
 *
 * WHOLE-OBJECT REJECTION, as in the spread store. A session is a web of
 * interdependent facts - 78 distinct cards, a jumper that must be one of them, at
 * most three selections which must be distinct positions in role order. Mending
 * one field could produce a session the machine would never have made, and it
 * would look to the reader like something they had actually done.
 *
 * A SEPARATE KEY FROM THE V1 SPREAD STORE, on purpose. The old record is left
 * exactly where it is rather than migrated or deleted: a v1 record holds a
 * finished spread with no committed deck behind it, and inventing a permutation
 * to migrate it into would fabricate a shuffle that never happened.
 */
export const TAROT_SESSION_STORAGE_KEY = 'knowthyself.tarot.session';
/**
 * Session schema version 1 - the first shape this store ever had.
 *
 * Independent of the spread store's version. They describe different records and
 * a change to one is not a change to the other.
 */
export const TAROT_SESSION_SCHEMA_VERSION = 1;
function safeLocalStorage() {
    try {
        return typeof window !== 'undefined' ? window.localStorage : undefined;
    }
    catch {
        return undefined;
    }
}
const invalid = (code, detail) => ({ kind: 'invalid', diagnostic: { code, detail, recovered: false } });
const isRecord = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);
const isOrientation = (value) => typeof value === 'string' && TAROT_ORIENTATIONS.includes(value);
/**
 * Turn an unknown payload into a session, or say precisely why not.
 *
 * Exported so tests and the audit push deliberately broken records through the
 * exact function production uses.
 */
export function validateStoredTarotSession(value) {
    if (!isRecord(value))
        return invalid('storage-corrupt', 'The stored session is not an object.');
    const { schemaVersion } = value;
    if (typeof schemaVersion !== 'number' || !Number.isInteger(schemaVersion)) {
        return invalid('storage-corrupt', 'The stored session has no usable schemaVersion.');
    }
    if (schemaVersion !== TAROT_SESSION_SCHEMA_VERSION) {
        return invalid('schema-unsupported', `Stored session schema ${schemaVersion} cannot be read by this build `
            + `(expected ${TAROT_SESSION_SCHEMA_VERSION}).`);
    }
    if (value.deckId !== TAROT_DECK_ID) {
        return invalid('deck-mismatch', `The session names deck "${String(value.deckId)}".`);
    }
    if (value.deckSchemaVersion !== TAROT_DECK_SCHEMA_VERSION) {
        return invalid('deck-mismatch', `The session names deck schema ${String(value.deckSchemaVersion)}.`);
    }
    if (!isCivilDate(value.localDate)) {
        return invalid('storage-corrupt', `"${String(value.localDate)}" is not a civil date.`);
    }
    if (typeof value.startedAt !== 'number' || !Number.isFinite(value.startedAt)) {
        return invalid('storage-corrupt', 'The session has no usable startedAt timestamp.');
    }
    if (typeof value.timeZone !== 'string') {
        return invalid('storage-corrupt', 'The session has no usable timeZone.');
    }
    if (typeof value.orientationPolicyId !== 'string' || typeof value.jumperPolicyId !== 'string') {
        return invalid('storage-corrupt', 'The session does not name the policies that made it.');
    }
    if (typeof value.provisionalPolicies !== 'boolean') {
        return invalid('storage-corrupt', 'The session does not say whether its policies were provisional.');
    }
    if (value.rejectedFate !== 'selectable' && value.rejectedFate !== 'withdrawn') {
        return invalid('storage-corrupt', `"${String(value.rejectedFate)}" is not a rejected-jumper fate.`);
    }
    if (value.acceptedFate !== 'reserved' && value.acceptedFate !== 'selectable') {
        return invalid('storage-corrupt', `"${String(value.acceptedFate)}" is not an accepted-jumper fate.`);
    }
    /* ------------------------------------------------------ the committed deck */
    const expectedSize = getTarotDeck().length;
    const { positions } = value;
    if (!Array.isArray(positions) || positions.length !== expectedSize) {
        return invalid('storage-corrupt', `The session holds ${Array.isArray(positions) ? positions.length : 'no'} positions; `
            + `a committed deck is ${expectedSize}.`);
    }
    const committed = [];
    const seenCards = new Set();
    for (let index = 0; index < positions.length; index += 1) {
        const entry = positions[index];
        if (!isRecord(entry))
            return invalid('storage-corrupt', `Position ${index + 1} is not an object.`);
        if (entry.position !== index + 1) {
            return invalid('storage-corrupt', `Position ${String(entry.position)} is stored at index ${index}; positions must be in order.`);
        }
        if (typeof entry.cardId !== 'string' || !isKnownTarotCardId(entry.cardId)) {
            return invalid('storage-corrupt', `"${String(entry.cardId)}" is not a card in this deck.`);
        }
        if (seenCards.has(entry.cardId)) {
            return invalid('storage-corrupt', `The card "${entry.cardId}" appears twice in the committed deck.`);
        }
        seenCards.add(entry.cardId);
        if (!isOrientation(entry.orientation)) {
            return invalid('storage-corrupt', `Position ${index + 1} has orientation "${String(entry.orientation)}".`);
        }
        committed.push({ position: index + 1, cardId: entry.cardId, orientation: entry.orientation });
    }
    if (seenCards.size !== expectedSize) {
        return invalid('storage-corrupt', `The committed deck holds ${seenCards.size} distinct cards; expected ${expectedSize}.`);
    }
    /* ------------------------------------------------------------- the jumper */
    const rawJumper = value.jumper;
    let offer = null;
    let jumperKind = 'none';
    if (rawJumper !== null && rawJumper !== undefined) {
        if (!isRecord(rawJumper))
            return invalid('storage-corrupt', 'The stored jumper is not an object.');
        const kind = rawJumper.kind;
        if (kind !== 'offered' && kind !== 'accepted' && kind !== 'rejected') {
            return invalid('storage-corrupt', `"${String(kind)}" is not a jumper state.`);
        }
        const position = rawJumper.position;
        if (typeof position !== 'number' || !Number.isInteger(position)
            || position < 1 || position > expectedSize) {
            return invalid('storage-corrupt', `The jumper names position ${String(position)}.`);
        }
        if (typeof rawJumper.cardId !== 'string' || !isKnownTarotCardId(rawJumper.cardId)) {
            return invalid('storage-corrupt', `The jumper names card "${String(rawJumper.cardId)}".`);
        }
        /* The jumper has to be the card that is actually at that position. A jumper
           naming a card the deck put elsewhere is a record that cannot be true. */
        if (committed[position - 1].cardId !== rawJumper.cardId) {
            return invalid('storage-corrupt', `The jumper claims position ${position}, which holds ${committed[position - 1].cardId}.`);
        }
        if (!isOrientation(rawJumper.orientation)) {
            return invalid('storage-corrupt', `The jumper has orientation "${String(rawJumper.orientation)}".`);
        }
        offer = { position, cardId: rawJumper.cardId, orientation: rawJumper.orientation };
        jumperKind = kind;
    }
    /* --------------------------------------------------------- the selections */
    const { selections } = value;
    if (!Array.isArray(selections) || selections.length > TAROT_POSITIONS.length) {
        return invalid('storage-corrupt', `The session holds ${Array.isArray(selections) ? selections.length : 'no'} selections; `
            + `at most ${TAROT_POSITIONS.length} are possible.`);
    }
    /* A session cannot hold selections while its jumper is still on the table:
       the phase machine makes that unreachable, so a record showing it is broken. */
    if (jumperKind === 'offered' && selections.length > 0) {
        return invalid('storage-corrupt', 'The session holds selections while its jumper is still undecided.');
    }
    const restored = [];
    const seenPositions = new Set();
    for (let index = 0; index < selections.length; index += 1) {
        const entry = selections[index];
        if (!isRecord(entry))
            return invalid('storage-corrupt', `Selection ${index} is not an object.`);
        /* Roles are filled in order, so the role at index i is fixed. A record that
           disagrees has been edited or written by a different build. */
        const expectedRole = TAROT_POSITIONS[index];
        if (entry.role !== expectedRole) {
            return invalid('storage-corrupt', `Selection ${index} names role "${String(entry.role)}"; expected "${expectedRole}".`);
        }
        const position = entry.position;
        if (typeof position !== 'number' || !Number.isInteger(position)
            || position < 1 || position > expectedSize) {
            return invalid('storage-corrupt', `Selection ${index} names position ${String(position)}.`);
        }
        if (seenPositions.has(position)) {
            return invalid('storage-corrupt', `Position ${position} was selected twice.`);
        }
        seenPositions.add(position);
        /* The selection must match what the committed deck holds there. This is the
           check that makes a tampered record useless: moving a card into a role
           without moving it in the deck is caught. */
        const atPosition = committed[position - 1];
        if (entry.cardId !== atPosition.cardId || entry.orientation !== atPosition.orientation) {
            return invalid('storage-corrupt', `Selection ${index} claims ${String(entry.cardId)} (${String(entry.orientation)}) at `
                + `position ${position}, which holds ${atPosition.cardId} (${atPosition.orientation}).`);
        }
        restored.push({
            role: expectedRole,
            position,
            cardId: atPosition.cardId,
            orientation: atPosition.orientation,
        });
    }
    const deck = {
        deckId: TAROT_DECK_ID,
        deckSchemaVersion: TAROT_DECK_SCHEMA_VERSION,
        positions: committed,
        jumper: offer,
        orientationPolicyId: value.orientationPolicyId,
        jumperPolicyId: value.jumperPolicyId,
        provisionalPolicies: value.provisionalPolicies,
    };
    /* The same production assertion the shuffle runs, applied to a deck that came
       from outside this process. */
    try {
        assertCommittedDeck(deck);
    }
    catch (error) {
        return invalid('storage-corrupt', error instanceof Error ? error.message : 'The committed deck failed its own invariants.');
    }
    const jumper = offer && jumperKind !== 'none'
        ? { kind: jumperKind, offer }
        : { kind: 'none' };
    return {
        kind: 'ok',
        session: {
            deck,
            jumper,
            selections: restored,
            localDate: value.localDate,
            startedAt: value.startedAt,
            timeZone: value.timeZone,
            rejectedFate: value.rejectedFate,
            acceptedFate: value.acceptedFate,
        },
    };
}
export function readStoredTarotSession(storage = safeLocalStorage()) {
    if (!storage) {
        return { kind: 'invalid', diagnostic: {
                code: 'storage-unavailable',
                detail: 'No local storage is available in this environment.',
                recovered: false,
            } };
    }
    let raw;
    try {
        raw = storage.getItem(TAROT_SESSION_STORAGE_KEY);
    }
    catch {
        return invalid('storage-unavailable', 'Reading the session from local storage threw.');
    }
    if (raw === null || raw === '')
        return { kind: 'empty' };
    let parsed;
    try {
        parsed = JSON.parse(raw);
    }
    catch {
        return invalid('storage-corrupt', 'The stored session is not valid JSON.');
    }
    return validateStoredTarotSession(parsed);
}
/**
 * The record a session is stored as: the SAME shape, whichever key it is kept under. Exported so that another keeper of a session (Guided Tarot keeps its own,
 * apart from the day's) writes exactly what `validateStoredTarotSession` reads, instead of a second format.
 */
export function tarotSessionRecord(session) {
    return {
        schemaVersion: TAROT_SESSION_SCHEMA_VERSION,
        deckId: session.deck.deckId,
        deckSchemaVersion: session.deck.deckSchemaVersion,
        localDate: session.localDate,
        startedAt: session.startedAt,
        timeZone: session.timeZone,
        orientationPolicyId: session.deck.orientationPolicyId,
        jumperPolicyId: session.deck.jumperPolicyId,
        provisionalPolicies: session.deck.provisionalPolicies,
        rejectedFate: session.rejectedFate,
        acceptedFate: session.acceptedFate,
        positions: session.deck.positions.map((entry) => ({
            position: entry.position, cardId: entry.cardId, orientation: entry.orientation,
        })),
        jumper: session.jumper.kind === 'none' ? null : {
            kind: session.jumper.kind,
            position: session.jumper.offer.position,
            cardId: session.jumper.offer.cardId,
            orientation: session.jumper.offer.orientation,
        },
        selections: session.selections.map((selection) => ({
            role: selection.role,
            position: selection.position,
            cardId: selection.cardId,
            orientation: selection.orientation,
        })),
    };
}
/** True when the write landed. A false is a diagnostic, never a thrown error. */
export function writeStoredTarotSession(session, storage = safeLocalStorage()) {
    if (!storage)
        return false;
    const record = tarotSessionRecord(session);
    try {
        storage.setItem(TAROT_SESSION_STORAGE_KEY, JSON.stringify(record));
        return true;
    }
    catch {
        return false;
    }
}
/**
 * Remove the stored session.
 *
 * NOT a production operation, for the same reason the spread store's clear is
 * not: erasing the day's session is exactly the redraw the product forbids. It
 * exists for tests and the audit, and nothing in the engine calls it.
 */
export function clearStoredTarotSession(storage = safeLocalStorage()) {
    if (!storage)
        return;
    try {
        storage.removeItem(TAROT_SESSION_STORAGE_KEY);
    }
    catch {
        /* Nothing to clear if storage is unavailable. */
    }
}
