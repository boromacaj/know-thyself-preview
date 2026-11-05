// ── localStorage → IndexedDB ────────────────────────────────────────────────
/**
 * Converts a localStorage StoredProfileSnapshot into a StoredProfile suitable
 * for the IndexedDB profiles store. No field is dropped: anything StoredProfile
 * cannot represent is packed into `_sourceExtensions` as JSON.
 */
export function snapshotToStoredProfile(snapshot, id, ownerUserId) {
    const { day, month, year } = splitBirthDate(snapshot.birthDate);
    const candidate = snapshot.placeSelection?.candidate ?? null;
    const extensions = {
        vessel: snapshot.vessel,
        birthTimePrecision: snapshot.birthTimePrecision,
        placeQuery: snapshot.placeQuery,
        placeMeta: snapshot.placeMeta,
        placeSelection: snapshot.placeSelection,
    };
    const now = new Date().toISOString();
    return {
        id: id ?? crypto.randomUUID(),
        ownerUserId: ownerUserId ?? null,
        displayName: [snapshot.birthName, snapshot.birthSurname].filter(Boolean).join(' '),
        birthGivenNames: snapshot.birthName,
        birthSurname: snapshot.birthSurname,
        birthDay: day,
        birthMonth: month,
        birthYear: year,
        birthTime: snapshot.birthTime || null,
        birthCountry: candidate?.country ?? null,
        birthRegion: candidate?.region ?? null,
        birthCity: candidate?.label ?? null,
        birthPostalCode: null,
        birthplace: snapshot.placeLabel,
        birthLocationDetail: snapshot.placeMeta || null,
        createdAt: now,
        updatedAt: now,
        version: 1,
        calculationInputVersion: '',
        _sourceExtensions: JSON.stringify(extensions),
    };
}
// ── IndexedDB → ProfileInput ────────────────────────────────────────────────
/**
 * Converts an IndexedDB StoredProfile back to the calculation engine's
 * ProfileInput. When `_sourceExtensions` is present the original
 * PlaceSelectionSnapshot is used for full coordinate/timezone fidelity;
 * without it the adapter reconstructs as much as the flat columns allow
 * (the profile was created outside the real app's onboarding).
 */
export function storedProfileToProfileInput(profile) {
    const extensions = parseExtensions(profile._sourceExtensions);
    const selection = extensions?.placeSelection ?? null;
    const candidate = selection?.candidate ?? null;
    const birthDate = joinBirthDate(profile.birthDay, profile.birthMonth, profile.birthYear);
    if (!birthDate)
        return null;
    const birthTime = profile.birthTime ?? '';
    const givenNames = profile.birthGivenNames;
    const birthSurname = profile.birthSurname;
    const fullName = [givenNames, birthSurname].filter(Boolean).join(' ');
    return {
        fullName,
        givenNames,
        birthSurname,
        birthDate,
        birthTime,
        birthTimePrecision: extensions?.birthTimePrecision,
        birthPlaceText: extensions?.placeQuery || candidate?.label || profile.birthplace,
        birthLatitude: candidate?.latitude ?? null,
        birthLongitude: candidate?.longitude ?? null,
        birthLocationPrecision: (candidate?.precision ?? 'text-only'),
        birthLocationSource: (candidate?.source ?? 'user-input'),
        resolvedPlaceLabel: candidate?.label ?? profile.birthCity ?? (profile.birthplace || null),
        birthCountry: candidate?.country ?? profile.birthCountry,
        birthRegion: candidate?.region ?? profile.birthRegion,
        birthLocationProvider: candidate?.provider ?? null,
        birthTimeZoneHint: candidate?.timeZoneHint ?? null,
        birthTimeZoneHintSource: candidate?.timeZoneHintSource ?? null,
        birthTimeZone: selection?.timeZone ?? null,
        birthTimeZoneSource: selection?.timeZoneSource ?? null,
        birthTimeZoneConfidence: selection?.timeZoneConfidence ?? 'unavailable',
        birthTimeZoneLimitations: [...(selection?.timeZoneLimitations ?? [])],
    };
}
// ── IndexedDB → localStorage snapshot ───────────────────────────────────────
/**
 * Reconstructs a localStorage-compatible snapshot from an IndexedDB record.
 * When extensions are present the round-trip is lossless; without them the
 * adapter fills in defaults that match "created outside the real onboarding".
 */
export function storedProfileToSnapshot(profile) {
    const birthDate = joinBirthDate(profile.birthDay, profile.birthMonth, profile.birthYear);
    if (!birthDate)
        return null;
    const extensions = parseExtensions(profile._sourceExtensions);
    return {
        vessel: extensions?.vessel ?? 'undefined',
        birthName: profile.birthGivenNames,
        birthSurname: profile.birthSurname,
        birthDate,
        birthTime: profile.birthTime ?? '',
        birthTimePrecision: extensions?.birthTimePrecision ?? (profile.birthTime ? 'exact' : 'unknown'),
        placeLabel: profile.birthplace,
        placeMeta: extensions?.placeMeta ?? profile.birthLocationDetail ?? '',
        placeQuery: extensions?.placeQuery ?? '',
        placeSelection: extensions?.placeSelection ?? null,
    };
}
// ── Helpers ─────────────────────────────────────────────────────────────────
function splitBirthDate(dateStr) {
    const parts = dateStr.split('-');
    return {
        year: parts[0] ?? '',
        month: parts[1] ?? '',
        day: parts[2] ?? '',
    };
}
function joinBirthDate(day, month, year) {
    if (!year || !month || !day)
        return null;
    return `${year}-${month}-${day}`;
}
function parseExtensions(raw) {
    if (!raw)
        return null;
    try {
        return JSON.parse(raw);
    }
    catch {
        return null;
    }
}
