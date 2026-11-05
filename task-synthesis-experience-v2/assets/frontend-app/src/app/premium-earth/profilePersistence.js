import { birthTimeAnswer, isBirthTimePrecision, } from '../birthTimePrecision.js?v=53c0693';
import { devProfilePresetsEnabled, qaProfileSet } from '../config/runtimeConfig.js?v=53c0693';
import { isValidIanaTimeZone } from '../timezone/ianaTimeZone.js?v=53c0693';
/*
 * THE PROFILE, ACROSS A RELOAD.
 *
 * WHAT WAS WRONG. Everything the reader entered lived in module memory. A
 * refresh, a phone dropping the tab, a link shared to a destination - all of it
 * landed back at the incarnation veil with nothing kept, and `#/portrait` was a
 * URL that could not be opened. The router already said so in its own comment:
 * "a hash naming nothing - or naming something before a profile exists - is
 * ignored and onboarding runs exactly as it always did."
 *
 * WHAT IS STORED, AND WHAT IS NOT.
 * Only INPUT. The four engines are synchronous and deterministic - the same
 * birth data produces the same chart every time - so storing a computed result
 * would buy nothing and risk serving a stale reading from an older engine after
 * a deploy. What is written is the committed onboarding snapshot: the vessel,
 * the name, the date, the time and how certain it is, and the whole canonical
 * place selection including coordinates, timezone and the resolver's own
 * provenance. That is exactly what premiumProfileAdapter needs to rebuild the
 * identical ProfileInput.
 *
 * IT IS NOT A SECOND OWNER. profileOverviewFlow owns the committed profile and
 * still does. This module is a mirror of that one value, written when the
 * profile is committed and read once at startup. Nothing else consults it, and
 * nothing reads it back into the app except the restore path.
 *
 * NOTHING LEAVES THE DEVICE. localStorage, one namespaced key, no network, no
 * server persistence. Birth data is about as personal as a datum gets and the
 * product's whole claim is that the computation is local; shipping it somewhere
 * to solve a refresh would contradict that for no gain.
 */
/** Bumped only when a stored record can no longer be read by this code. */
export const PROFILE_SCHEMA_VERSION = 1;
/** One namespaced key. Everything the restore needs is inside it. */
export const PROFILE_STORAGE_KEY = 'knowthyself.profile';
/**
 * THE KEY THIS BUILD READS AND WRITES.
 *
 * Every preview of every branch is served from ONE browser origin (the preview host), and localStorage belongs to the origin, not to the path. So a profile committed in one preview was
 * restored in all of them: the owner who had opened a sanitized preview (made-up people) and then opened the preview that carries the real QA profiles was handed the made-up person back at
 * startup, with the made-up name, birth data and chart, and the reverse as well. A REVIEW build (the one that offers the QA profiles) therefore keeps its profile under a key that names the QA
 * set it carries, so a profile can only be restored by a build that serves the same set. A production build (no QA profiles) keeps the original key: nobody's saved profile moves.
 */
export function profileStorageKey(reviewBuild = devProfilePresetsEnabled, set = qaProfileSet) {
    return reviewBuild ? `${PROFILE_STORAGE_KEY}.${set === 'owner' ? 'owner' : 'sanitized'}` : PROFILE_STORAGE_KEY;
}
/** The nine hash destinations, as the router spells them. */
export const PROFILE_DESTINATION_SLUGS = [
    'menu', 'portrait', 'astrology', 'numerology', 'bazi', 'human-design', 'forecast', 'tarot', 'connections',
];
const onDevice = (profile) => ({
    ...profile,
    birthTimeUnknown: profile.birthTimePrecision === 'unknown',
});
const defaultStorage = () => {
    try {
        const storage = globalThis.localStorage;
        if (!storage)
            return null;
        /* Presence is not permission. Safari in private mode hands over a
           localStorage that throws on write, so the only honest test is a write. */
        const probe = `${PROFILE_STORAGE_KEY}.probe`;
        storage.setItem(probe, '1');
        storage.removeItem(probe);
        return storage;
    }
    catch {
        return null;
    }
};
const isString = (value) => typeof value === 'string';
const isFiniteNumber = (value) => (typeof value === 'number' && Number.isFinite(value));
const isDestination = (value) => (isString(value) && PROFILE_DESTINATION_SLUGS.includes(value));
/*
 * VALIDATION IS PARANOID ON PURPOSE.
 *
 * This value comes back from a device, not from the program. It can have been
 * written by a previous version, edited by hand, truncated by a full disk, or
 * corrupted by a browser extension. Every one of those has to end at onboarding
 * rather than at a half-built reading, so the shape is checked field by field
 * and anything that fails is discarded whole.
 */
function validSelection(value) {
    if (value === null)
        return null;
    if (typeof value !== 'object')
        return null;
    const record = value;
    const candidate = record.candidate;
    if (candidate !== null) {
        if (typeof candidate !== 'object')
            return null;
        const place = candidate;
        /* The coordinates are the reason this record exists. A selection without
           usable numbers cannot rebuild a birth moment, so it is not a selection. */
        if (!isString(place.label))
            return null;
        if (!isFiniteNumber(place.latitude) || !isFiniteNumber(place.longitude))
            return null;
        if (Math.abs(place.latitude) > 90 || Math.abs(place.longitude) > 180)
            return null;
        if (!isString(place.provider) || !isString(place.precision) || !isString(place.source))
            return null;
    }
    if (!Array.isArray(record.timeZoneLimitations))
        return null;
    if (record.timeZoneLimitations.some((entry) => !isString(entry)))
        return null;
    if (record.timeZone !== null && !isString(record.timeZone))
        return null;
    /* A stored zone the runtime does not know is discarded with the selection: onboarding asks for the place again. */
    if (isString(record.timeZone) && record.timeZone.trim().length > 0 && !isValidIanaTimeZone(record.timeZone))
        return null;
    return value;
}
/*
 * THE BIRTH TIME'S CERTAINTY, FROM EITHER GENERATION OF RECORD.
 *
 * A record from this build carries `birthTimePrecision`; one from before it
 * carries only the boolean `birthTimeUnknown`. Both go through the one rule
 * (birthTimeAnswer): an unknown time stays unknown and empty, a supplied time
 * with no precision is exact, and 12:00 means nothing by itself. A precision
 * that is not one of the three, or a record with neither field, is corrupt.
 */
function storedBirthTime(record) {
    const time = record.birthTime;
    if ('birthTimePrecision' in record) {
        if (!isBirthTimePrecision(record.birthTimePrecision))
            return null;
        return birthTimeAnswer(time, record.birthTimePrecision);
    }
    if (typeof record.birthTimeUnknown !== 'boolean')
        return null;
    return birthTimeAnswer(time, record.birthTimeUnknown ? 'unknown' : undefined);
}
function validProfile(value) {
    if (!value || typeof value !== 'object')
        return null;
    const record = value;
    if (record.vessel !== 'male' && record.vessel !== 'female' && record.vessel !== 'undefined') {
        return null;
    }
    for (const key of ['birthName', 'birthSurname', 'birthDate', 'birthTime', 'placeLabel', 'placeMeta', 'placeQuery']) {
        if (!isString(record[key]))
            return null;
    }
    const birthTime = storedBirthTime(record);
    if (!birthTime)
        return null;
    /* `placeSelection` present but malformed is a corrupt record, not a record
       without a place: dropping it silently would produce a profile that cannot
       be computed and a reader staring at a blocked screen. */
    if (!('placeSelection' in record))
        return null;
    const selection = record.placeSelection === null ? null : validSelection(record.placeSelection);
    if (record.placeSelection !== null && selection === null)
        return null;
    return {
        vessel: record.vessel,
        birthName: record.birthName,
        birthSurname: record.birthSurname,
        birthDate: record.birthDate,
        birthTime: birthTime.birthTime,
        birthTimePrecision: birthTime.birthTimePrecision,
        placeLabel: record.placeLabel,
        placeMeta: record.placeMeta,
        placeQuery: record.placeQuery,
        placeSelection: selection,
    };
}
/**
 * The stored profile, or null for every reason there is not to have one.
 *
 * Absent, unreadable, written by an incompatible schema, or structurally wrong -
 * all four answer null, and all four are the same answer to the caller: run the
 * onboarding. A stored record that fails to load is also REMOVED, so a device
 * that once held a broken value does not re-parse it on every start.
 */
export function readStoredProfile(storage = defaultStorage()) {
    if (!storage)
        return null;
    let raw = null;
    try {
        raw = storage.getItem(profileStorageKey());
    }
    catch {
        return null;
    }
    if (!raw)
        return null;
    let parsed = null;
    try {
        parsed = JSON.parse(raw);
    }
    catch {
        clearStoredProfile(storage);
        return null;
    }
    if (!parsed || typeof parsed !== 'object') {
        clearStoredProfile(storage);
        return null;
    }
    const record = parsed;
    /*
     * A VERSION THIS CODE DOES NOT KNOW IS DISCARDED, NOT GUESSED AT.
     *
     * Migration is the right answer when there is something to migrate to. There
     * is exactly one schema so far, so the honest handling of anything else -
     * including a NEWER record left by a build the reader has since rolled back
     * from - is to drop it and let them re-enter. When a version 2 exists this is
     * where its migration goes, and the test that pins this behaviour will be the
     * thing that tells us to write it.
     */
    if (record.schemaVersion !== PROFILE_SCHEMA_VERSION) {
        clearStoredProfile(storage);
        return null;
    }
    const profile = validProfile(record.profile);
    if (!profile) {
        clearStoredProfile(storage);
        return null;
    }
    return {
        schemaVersion: PROFILE_SCHEMA_VERSION,
        savedAt: isString(record.savedAt) ? record.savedAt : '',
        profile,
        destination: isDestination(record.destination) ? record.destination : null,
    };
}
/**
 * Writes the committed profile, keeping whatever destination is already stored.
 *
 * Called when a profile is created and again after any edit is saved, because
 * an edited profile that is not re-written would come back as the old one on
 * the next load - which is worse than not persisting at all.
 */
export function writeStoredProfile(profile, destination = null, storage = defaultStorage()) {
    if (!storage)
        return false;
    const existing = destination ?? readStoredProfile(storage)?.destination ?? null;
    const record = {
        schemaVersion: PROFILE_SCHEMA_VERSION,
        savedAt: new Date().toISOString(),
        profile: onDevice(profile),
        destination: existing,
    };
    try {
        storage.setItem(profileStorageKey(), JSON.stringify(record));
        return true;
    }
    catch {
        /* A full quota or a blocked store is not an error the reader can act on,
           and the session in front of them still works. It simply will not survive
           a reload, which is the state the product was in before this existed. */
        return false;
    }
}
/**
 * Records where the reader is, without touching the profile.
 *
 * A no-op when nothing is stored: a destination without a profile is not a
 * thing that can be restored, and writing one would leave a record that
 * readStoredProfile would immediately throw away.
 */
export function writeStoredDestination(destination, storage = defaultStorage()) {
    if (!storage)
        return false;
    const existing = readStoredProfile(storage);
    if (!existing)
        return false;
    if (existing.destination === destination)
        return true;
    try {
        storage.setItem(profileStorageKey(), JSON.stringify({
            ...existing,
            profile: onDevice(existing.profile),
            destination,
        }));
        return true;
    }
    catch {
        return false;
    }
}
export function clearStoredProfile(storage = defaultStorage()) {
    if (!storage)
        return;
    try {
        storage.removeItem(profileStorageKey());
    }
    catch {
        /* Nothing further to try, and nothing the reader needs told. */
    }
}
/**
 * The destination this URL is explicitly asking for, or null.
 *
 * THE ONLY THING THAT MAY TRIGGER A RESTORE.
 *
 * This replaced a function that also fell back to the stored destination and
 * then to the portrait, which made "a profile exists on this device" enough to
 * skip the front door. It was: opening the root with a saved profile ended the
 * intro and opened the Portrait, so the tunnel, the Earth and the whole
 * onboarding were unreachable for anyone who had ever finished it once.
 *
 * A stored destination is a MEMORY of where someone was. A hash is a REQUEST.
 * Only the request restores anything. The memory is still written and still
 * kept - it is what a deliberate "Continue profile" control would read - but it
 * no longer speaks for the reader at startup.
 */
export function destinationFromHash(hash) {
    const slug = hash.replace(/^#\/?/, '').trim();
    return isDestination(slug) ? slug : null;
}
