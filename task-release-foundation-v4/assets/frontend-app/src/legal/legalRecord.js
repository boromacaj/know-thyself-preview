/*
 * THE DURABLE LEGAL RECORD OF THIS DEVICE.
 *
 * localStorage is the authoritative store of the app (the profile lives there), so the one fact the first-launch gate
 * and Settings need - "the Terms of this version were explicitly accepted on this device" - lives there too, next to
 * the profile, and is read synchronously. IndexedDB keeps the event log (legalStore) as a secondary, append-only copy.
 *
 * Every write is verified by reading it back: a blocked or full storage returns false, and the caller says so instead
 * of showing "Accepted". Viewing a document never writes anything here.
 */
import { getDocument } from './documents.js?v=4cd804d';
export const LEGAL_RECORD_KEY = 'knowthyself.legal.v1';
const EMPTY = { termsAccepted: null, privacyAcknowledged: null };
function defaultStorage() {
    try {
        return typeof localStorage === 'undefined' ? null : localStorage;
    }
    catch {
        return null;
    }
}
export const currentTermsVersion = () => getDocument('terms_of_service').version;
export const currentPrivacyVersion = () => getDocument('privacy_policy').version;
/** Announced on `window` when the person has been let through the gate (accepted and saved, or accepted and chose to go on): a waiting restore re-runs on it. */
export const TERMS_SETTLED_EVENT = 'kt:terms-settled';
/*
 * THE ONE QUESTION EVERY ENTRY ASKS: "may this launch use the application?"
 *
 * Yes when the CURRENT Terms version was accepted and the record reads back from the device - or when the person pressed Accept, the device refused
 * to keep it, they were told so, and they chose to go on regardless (`continueWithoutSaving`). That second case is for this launch only: nothing is
 * written, `isTermsAccepted` stays false, Settings keep saying the Terms are not accepted, and the next launch asks again.
 */
let continuedWithoutSaving = false;
export function continueWithoutSaving() {
    continuedWithoutSaving = true;
}
export function isTermsSatisfied(version = currentTermsVersion(), storage = defaultStorage()) {
    return continuedWithoutSaving || isTermsAccepted(version, storage);
}
/** True when the device holds an acceptance of an OLDER Terms version: the person is returning, the Terms changed. */
export function hasAcceptedOlderTerms(version = currentTermsVersion(), storage = defaultStorage()) {
    const accepted = readLegalRecord(storage).termsAccepted;
    return accepted !== null && accepted.version !== version;
}
export function resetTermsContinuation() {
    continuedWithoutSaving = false;
}
function entryFrom(value) {
    if (!value || typeof value !== 'object')
        return null;
    const { version, at } = value;
    return typeof version === 'string' && version !== '' && typeof at === 'string' ? { version, at } : null;
}
export function readLegalRecord(storage = defaultStorage()) {
    if (!storage)
        return EMPTY;
    try {
        const raw = storage.getItem(LEGAL_RECORD_KEY);
        if (!raw)
            return EMPTY;
        const parsed = JSON.parse(raw);
        return {
            termsAccepted: entryFrom(parsed.termsAccepted),
            privacyAcknowledged: entryFrom(parsed.privacyAcknowledged),
        };
    }
    catch {
        return EMPTY;
    }
}
export function isTermsAccepted(version = currentTermsVersion(), storage = defaultStorage()) {
    return readLegalRecord(storage).termsAccepted?.version === version;
}
export function isPrivacyAcknowledged(version = currentPrivacyVersion(), storage = defaultStorage()) {
    return readLegalRecord(storage).privacyAcknowledged?.version === version;
}
function writeEntry(field, version, storage) {
    if (!storage)
        return false;
    const entry = { version, at: new Date().toISOString() };
    const next = { ...readLegalRecord(storage), [field]: entry };
    try {
        storage.setItem(LEGAL_RECORD_KEY, JSON.stringify(next));
    }
    catch {
        return false;
    }
    const back = readLegalRecord(storage)[field];
    return back !== null && back.version === entry.version && back.at === entry.at;
}
/** Records an explicit acceptance of the Terms. True only when the record is on the device and reads back. */
export function recordTermsAccepted(version = currentTermsVersion(), storage = defaultStorage()) {
    return writeEntry('termsAccepted', version, storage);
}
/** Records that the person explicitly acknowledged the Privacy Policy (an information notice, not a consent). */
export function recordPrivacyAcknowledged(version = currentPrivacyVersion(), storage = defaultStorage()) {
    return writeEntry('privacyAcknowledged', version, storage);
}
export function clearLegalRecord(storage = defaultStorage()) {
    continuedWithoutSaving = false;
    try {
        storage?.removeItem(LEGAL_RECORD_KEY);
    }
    catch {
        /* nothing to clear when the storage is blocked */
    }
}
