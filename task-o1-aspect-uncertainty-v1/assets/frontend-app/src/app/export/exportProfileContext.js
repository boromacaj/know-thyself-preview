/**
 * Normalized profile context shared by every export document (global and pillar-scoped).
 * Deliberately limited to calculation-relevant fields — no API keys, tokens, or
 * unrelated browser storage. See CLAUDE.md / export spec section 9.
 */
/**
 * Optional ExportProfileContext fields are OMITTED when unknown, never set to a
 * literal `undefined` value — the export integrity scan (exportValidation.ts) treats
 * any literal `undefined` anywhere in the document as a validation failure.
 * utcOffsetMinutes/daylightSavingOffsetMinutes are not computed anywhere in this
 * codebase today and are always omitted rather than guessed.
 */
export function buildExportProfileContext(experience) {
    const input = experience.input;
    const astrology = experience.pillars.find((pillar) => pillar.id === 'western-astrology')?.westernAstrologyChart?.astrology;
    const birthTimeAvailable = Boolean(input.birthTime.trim());
    const birthLocationLabel = input.resolvedPlaceLabel ?? (input.birthPlaceText || null);
    const resolvedUtcTimestamp = astrology?.moment.utcDateTime ?? null;
    return {
        ...(input.givenNames ? { givenNames: input.givenNames } : {}),
        ...(input.birthSurname ? { birthSurname: input.birthSurname } : {}),
        ...(experience.coreResult.profile.identity.displayName ? { displayName: experience.coreResult.profile.identity.displayName } : {}),
        birthDate: input.birthDate,
        ...(birthTimeAvailable ? { birthTime: input.birthTime } : {}),
        birthTimeAvailable,
        ...(birthLocationLabel ? { birthLocationLabel } : {}),
        ...(input.birthLatitude !== null ? { latitude: input.birthLatitude } : {}),
        ...(input.birthLongitude !== null ? { longitude: input.birthLongitude } : {}),
        ...(input.birthTimeZone ? { timezoneId: input.birthTimeZone } : {}),
        ...(resolvedUtcTimestamp ? { resolvedUtcTimestamp } : {}),
        ...(input.birthLocationPrecision ? { locationResolutionStatus: input.birthLocationPrecision } : {}),
        ...(input.birthTimeZoneConfidence ? { timezoneResolutionStatus: input.birthTimeZoneConfidence } : {}),
    };
}
