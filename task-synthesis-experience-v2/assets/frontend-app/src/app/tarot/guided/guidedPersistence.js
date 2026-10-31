import { tarotSessionRecord, validateStoredTarotSession } from '../tarotSessionPersistence.js?v=53c0693';
import { isGuidedChoice } from './guidedCatalog.js?v=53c0693';
/**
 * WHAT GUIDED TAROT KEEPS ON THE DEVICE, AND UNDER WHICH KEY.
 *
 * Its OWN key, never the day's: a guided reading cannot overwrite, extend or restore Daily Tarot's committed deck, and Daily Tarot
 * cannot find a guided one. Nothing the catalog already knows is stored (no label, no sentence, no reading): the two stable ids, the
 * committed deck with the cards taken from it (the same record Daily Tarot stores, so the deck a person chose from is the deck they
 * come back to) and the time it was saved. A reading is composed again from those, deterministically.
 *
 * It is a convenience for a person who left in the middle of a reading, so it does not outlive the day by much: a record older than
 * KEEP_MS is treated as absent and removed on the next read. A record that fails validation in any part is dropped as a whole.
 */
export const GUIDED_STORAGE_KEY = 'knowthyself.tarot.guided';
export const GUIDED_SCHEMA_VERSION = 1;
/** How long an unfinished or finished guided reading can be come back to. */
export const GUIDED_KEEP_MS = 24 * 60 * 60 * 1000;
function safeLocalStorage() {
    try {
        return typeof window !== 'undefined' ? window.localStorage : undefined;
    }
    catch {
        return undefined;
    }
}
const isRecord = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);
/** Turn an unknown payload into a stored guided reading, or null. Exported so that tests push broken records through the function production uses. */
export function validateStoredGuided(value, now) {
    if (!isRecord(value) || value.schemaVersion !== GUIDED_SCHEMA_VERSION)
        return null;
    const choice = { areaId: value.areaId, intentionId: value.intentionId };
    if (!isGuidedChoice(choice))
        return null;
    if (typeof value.savedAt !== 'number' || !Number.isFinite(value.savedAt) || now - value.savedAt > GUIDED_KEEP_MS || value.savedAt - now > GUIDED_KEEP_MS)
        return null;
    const restored = validateStoredTarotSession(value.session);
    if (restored.kind !== 'ok')
        return null;
    /* A guided reading never offers a jumper card: a record that holds one was not made by this feature. */
    if (restored.session.jumper.kind !== 'none')
        return null;
    return { choice, session: restored.session, savedAt: value.savedAt };
}
export function readGuided(now, storage = safeLocalStorage()) {
    if (!storage)
        return null;
    let raw;
    try {
        raw = storage.getItem(GUIDED_STORAGE_KEY);
    }
    catch {
        return null;
    }
    if (raw === null || raw === '')
        return null;
    let parsed;
    try {
        parsed = JSON.parse(raw);
    }
    catch {
        clearGuided(storage);
        return null;
    }
    const stored = validateStoredGuided(parsed, now);
    if (stored === null)
        clearGuided(storage);
    return stored;
}
/** True when the write landed. A false is a missing convenience, never an error. */
export function writeGuided(choice, session, now, storage = safeLocalStorage()) {
    if (!storage)
        return false;
    try {
        storage.setItem(GUIDED_STORAGE_KEY, JSON.stringify({
            schemaVersion: GUIDED_SCHEMA_VERSION, areaId: choice.areaId, intentionId: choice.intentionId, savedAt: now, session: tarotSessionRecord(session),
        }));
        return true;
    }
    catch {
        return false;
    }
}
export function clearGuided(storage = safeLocalStorage()) {
    if (!storage)
        return;
    try {
        storage.removeItem(GUIDED_STORAGE_KEY);
    }
    catch { /* nothing to clear */ }
}
