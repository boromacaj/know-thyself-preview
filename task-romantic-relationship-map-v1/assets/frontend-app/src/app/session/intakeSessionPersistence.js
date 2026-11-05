/**
 * Temporary, tab-scoped intake persistence: reload keeps whatever was typed,
 * closing the tab does not. sessionStorage (not localStorage) gives us that
 * for free - it is intentionally never used as a saved-profile mechanism.
 */
export const INTAKE_SESSION_STORAGE_KEY = 'know-thyself:session:birth-input';
const BIRTH_LOCATION_PRECISION_VALUES = ['text-only', 'searched', 'map-selected'];
const BIRTH_LOCATION_SOURCE_VALUES = ['user-input', 'map-search', 'provider-search', 'map-click'];
const TIME_ZONE_CONFIDENCE_VALUES = ['resolved', 'ambiguous', 'unavailable'];
export function saveIntakeDraftToSession(draft, storage = safeSessionStorage()) {
    if (!storage)
        return;
    try {
        storage.setItem(INTAKE_SESSION_STORAGE_KEY, JSON.stringify(draft));
    }
    catch {
        // Storage disabled, full, or unavailable (private browsing, etc.) - fail
        // silently. Losing refresh-persistence is acceptable; breaking the form is not.
    }
}
export function loadIntakeDraftFromSession(storage = safeSessionStorage()) {
    if (!storage)
        return null;
    let raw;
    try {
        raw = storage.getItem(INTAKE_SESSION_STORAGE_KEY);
    }
    catch {
        return null;
    }
    if (!raw)
        return null;
    let parsed;
    try {
        parsed = JSON.parse(raw);
    }
    catch {
        return null;
    }
    return sanitizeStoredIntakeDraft(parsed);
}
export function clearIntakeDraftSession(storage = safeSessionStorage()) {
    if (!storage)
        return;
    try {
        storage.removeItem(INTAKE_SESSION_STORAGE_KEY);
    }
    catch {
        // Nothing to do if storage is unavailable - there is nothing to clear.
    }
}
/**
 * Whole-object, fail-safe validation: ProfileInput's fields are
 * interdependent (e.g. a "resolved" timezone confidence implies a non-null
 * birthTimeZone), so a field-by-field partial merge risks reconstructing an
 * inconsistent combination that the real UI could never produce. Rejecting
 * the entire stored draft on any single malformed/incompatible field is
 * simpler and cannot corrupt normal form behavior - the safe fallback is
 * always the ordinary blank intake state already used on first load.
 */
export function sanitizeStoredIntakeDraft(value) {
    if (!value || typeof value !== 'object')
        return null;
    const candidate = value;
    const requiredStrings = [
        'fullName', 'givenNames', 'birthSurname', 'birthDate', 'birthTime', 'birthPlaceText',
    ];
    for (const key of requiredStrings) {
        if (typeof candidate[key] !== 'string')
            return null;
    }
    const nullableStrings = [
        'resolvedPlaceLabel', 'birthCountry', 'birthRegion', 'birthLocationProvider',
        'birthTimeZoneHint', 'birthTimeZoneHintSource', 'birthTimeZone', 'birthTimeZoneSource',
    ];
    for (const key of nullableStrings) {
        const fieldValue = candidate[key];
        if (fieldValue !== null && typeof fieldValue !== 'string')
            return null;
    }
    if (!isNullableNumber(candidate.birthLatitude) || !isNullableNumber(candidate.birthLongitude))
        return null;
    if (!isOneOf(candidate.birthLocationPrecision, BIRTH_LOCATION_PRECISION_VALUES))
        return null;
    if (!isOneOf(candidate.birthLocationSource, BIRTH_LOCATION_SOURCE_VALUES))
        return null;
    if (!isOneOf(candidate.birthTimeZoneConfidence, TIME_ZONE_CONFIDENCE_VALUES))
        return null;
    if (!Array.isArray(candidate.birthTimeZoneLimitations) || !candidate.birthTimeZoneLimitations.every((item) => typeof item === 'string')) {
        return null;
    }
    return {
        fullName: candidate.fullName,
        givenNames: candidate.givenNames,
        birthSurname: candidate.birthSurname,
        birthDate: candidate.birthDate,
        birthTime: candidate.birthTime,
        birthPlaceText: candidate.birthPlaceText,
        birthLatitude: candidate.birthLatitude,
        birthLongitude: candidate.birthLongitude,
        birthLocationPrecision: candidate.birthLocationPrecision,
        birthLocationSource: candidate.birthLocationSource,
        resolvedPlaceLabel: candidate.resolvedPlaceLabel,
        birthCountry: candidate.birthCountry,
        birthRegion: candidate.birthRegion,
        birthLocationProvider: candidate.birthLocationProvider,
        birthTimeZoneHint: candidate.birthTimeZoneHint,
        birthTimeZoneHintSource: candidate.birthTimeZoneHintSource,
        birthTimeZone: candidate.birthTimeZone,
        birthTimeZoneSource: candidate.birthTimeZoneSource,
        birthTimeZoneConfidence: candidate.birthTimeZoneConfidence,
        birthTimeZoneLimitations: candidate.birthTimeZoneLimitations,
    };
}
function isNullableNumber(value) {
    return value === null || (typeof value === 'number' && Number.isFinite(value));
}
function isOneOf(value, allowed) {
    return typeof value === 'string' && allowed.includes(value);
}
function safeSessionStorage() {
    try {
        return typeof window !== 'undefined' ? window.sessionStorage : undefined;
    }
    catch {
        // Some environments (locked-down iframes, certain private-browsing modes)
        // throw on access rather than returning undefined.
        return undefined;
    }
}
