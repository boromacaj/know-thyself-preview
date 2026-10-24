/*
 * THE OWNER'S FIVE PROFILES, KEPT ON THE OWNER'S OWN DEVICE.
 *
 * The repository holds five real birth records as QA shortcuts (qaProfilePresets.ts). Every deployed preview is a PUBLIC address, so the deploy step
 * (scripts/sanitize-preview-build.mjs) replaces those records with fictional ones in everything it serves - and that is why a preview's QA list shows made-up
 * people. The records themselves cannot go back into a preview.
 *
 * This is the other way in: the five real records are exported ONCE, on the owner's own computer, from a local build (scripts/export-owner-profiles.mjs), carried
 * to the phone as a file, and imported through the QA panel. They are kept in that browser's localStorage and nowhere else - they are in no bundle, no request, no
 * URL. While they are there the QA list shows them (and `?qa=menu` opens the first); remove them and the list is the build's own again.
 *
 * Nothing is invented and nothing is computed here. A record is accepted only if it has every field a preset has, and is rebuilt field by field, so a file with
 * extra or odd content cannot smuggle anything into the profile model. The file must hold exactly five (the size of the QA set: a test holds the two equal).
 */
export const OWNER_PROFILES_STORAGE_KEY = 'knowthyself.ownerProfiles';
export const OWNER_PROFILE_COUNT = 5;
const isText = (value, max = 200) => typeof value === 'string' && value.length <= max;
const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);
const validDate = (value) => {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value))
        return false;
    const [y, m, d] = value.split('-').map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));
    return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
};
function placeSelectionOf(value) {
    if (!isObject(value))
        return null;
    const candidate = value.candidate;
    if (!isObject(candidate))
        return null;
    const { label, latitude, longitude, country, region, provider, precision, source, timeZoneHint, timeZoneHintSource } = candidate;
    if (!isText(label) || typeof latitude !== 'number' || typeof longitude !== 'number' || !Number.isFinite(latitude) || !Number.isFinite(longitude))
        return null;
    if (Math.abs(latitude) > 90 || Math.abs(longitude) > 180)
        return null;
    if (!isText(provider) || (precision !== 'searched' && precision !== 'map-selected') || (source !== 'provider-search' && source !== 'map-click'))
        return null;
    for (const optional of [country, region, timeZoneHint, timeZoneHintSource])
        if (optional !== null && !isText(optional))
            return null;
    const { timeZone, timeZoneSource, timeZoneConfidence, timeZoneLimitations, moveCameraOnPresent } = value;
    if ((timeZone !== null && !isText(timeZone)) || (timeZoneSource !== null && !isText(timeZoneSource)) || (timeZoneConfidence !== null && !isText(timeZoneConfidence, 40)))
        return null;
    if (!Array.isArray(timeZoneLimitations) || !timeZoneLimitations.every((item) => isText(item, 400)) || typeof moveCameraOnPresent !== 'boolean')
        return null;
    return {
        candidate: { label, latitude, longitude, country: country, region: region, provider, precision, source, timeZoneHint: timeZoneHint, timeZoneHintSource: timeZoneHintSource },
        timeZone: timeZone,
        timeZoneSource: timeZoneSource,
        timeZoneConfidence: timeZoneConfidence,
        timeZoneLimitations: [...timeZoneLimitations],
        moveCameraOnPresent,
    };
}
function presetOf(value) {
    if (!isObject(value))
        return null;
    const { id, menuLabel, vessel, birthName, birthSurname, birthDate, birthTime, birthTimePrecision, placeQuery, placeLabel, placeMeta } = value;
    if (typeof id !== 'string' || !/^[a-z0-9-]{3,40}$/.test(id) || !isText(menuLabel, 80) || menuLabel.trim() === '')
        return null;
    if (vessel !== 'male' && vessel !== 'female' && vessel !== 'undefined')
        return null;
    if (!isText(birthName, 80) || birthName.trim() === '' || !isText(birthSurname, 80) || birthSurname.trim() === '')
        return null;
    if (!validDate(birthDate))
        return null;
    if (typeof birthTime !== 'string' || !(birthTime === '' || /^([01]\d|2[0-3]):[0-5]\d$/.test(birthTime)))
        return null;
    if (birthTimePrecision !== 'exact' && birthTimePrecision !== 'approximate' && birthTimePrecision !== 'unknown')
        return null;
    /* An unknown time is the empty answer and a given time is never unknown: the two travel together or the record is refused. */
    if ((birthTimePrecision === 'unknown') !== (birthTime === ''))
        return null;
    if (!isText(placeQuery) || !isText(placeLabel) || !isText(placeMeta))
        return null;
    const placeSelection = placeSelectionOf(value.placeSelection);
    if (!placeSelection)
        return null;
    return {
        id, menuLabel, vessel, birthName, birthSurname, birthDate, birthTime, birthTimePrecision, placeQuery, placeLabel, placeMeta, placeSelection,
    };
}
/** The five profiles in a file's text, rebuilt field by field - or null for anything that is not exactly five complete records. */
export function parseOwnerProfiles(text) {
    let data;
    try {
        data = JSON.parse(text);
    }
    catch {
        return null;
    }
    const list = Array.isArray(data) ? data : (isObject(data) && Array.isArray(data.profiles) ? data.profiles : null);
    if (!list || list.length !== OWNER_PROFILE_COUNT)
        return null;
    const presets = [];
    for (const entry of list) {
        const preset = presetOf(entry);
        if (!preset || presets.some((other) => other.id === preset.id))
            return null;
        presets.push(preset);
    }
    return presets;
}
const defaultStorage = () => {
    try {
        return globalThis.localStorage ?? null;
    }
    catch {
        return null;
    }
};
export function readDeviceOwnerProfiles(storage = defaultStorage()) {
    if (!storage)
        return null;
    try {
        const raw = storage.getItem(OWNER_PROFILES_STORAGE_KEY);
        return raw ? parseOwnerProfiles(raw) : null;
    }
    catch {
        return null;
    }
}
/** Stores a file's text if, and only if, it is exactly five complete records. Returns what was stored, or null. */
export function writeDeviceOwnerProfiles(text, storage = defaultStorage()) {
    const presets = parseOwnerProfiles(text);
    if (!presets || !storage)
        return null;
    try {
        storage.setItem(OWNER_PROFILES_STORAGE_KEY, JSON.stringify(presets));
    }
    catch {
        return null;
    }
    return presets;
}
export function clearDeviceOwnerProfiles(storage = defaultStorage()) {
    try {
        storage?.removeItem(OWNER_PROFILES_STORAGE_KEY);
    }
    catch { /* nothing to clear */ }
}
/** The list the QA panel shows: the device's five if it has them, otherwise the build's own. */
export function activeQaProfilePresets(build, storage = defaultStorage()) {
    const device = readDeviceOwnerProfiles(storage);
    return device ? { presets: device, source: 'device' } : { presets: build, source: 'build' };
}
