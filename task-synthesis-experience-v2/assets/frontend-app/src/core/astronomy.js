import { VERSIONS } from './versions.js?v=53c0693';
export function createGeoTemporalContext(birthDate, birthTime, birthplaceSource) {
    const timeResolution = createTimeResolutionStatus(birthDate, birthTime);
    const locationResolution = createLocationResolutionStatus(birthplaceSource);
    return {
        status: 'unresolved_v0_2_foundation',
        birthDate,
        birthTime,
        birthCountry: birthplaceSource.birthCountry,
        birthRegion: birthplaceSource.birthRegion,
        birthCity: birthplaceSource.birthCity,
        birthPostalCode: birthplaceSource.birthPostalCode,
        birthplaceText: birthplaceSource.birthplaceText,
        birthplacePostalCode: birthplaceSource.birthplacePostalCode,
        birthLocationDetail: birthplaceSource.birthLocationDetail,
        birthplaceSource,
        timeResolution,
        locationResolution,
        timezoneResolutionStatus: 'unresolved',
        coordinateResolutionStatus: 'unresolved',
        precision: {
            time: timeResolution.confidence,
            location: locationResolution.confidence,
        },
        missingLayers: [
            'timezone resolver',
            'coordinates resolver',
            'UTC conversion',
            'ephemeris-backed Sun longitude',
            'ephemeris-backed Moon longitude',
        ],
        evidenceIds: [],
        note: 'v0.2 preserves geo-temporal source inputs and uncertainty metadata only. It does not infer timezone, coordinates, maps, GPS, or sky positions.',
        metadata: {
            schemaVersion: VERSIONS.schemaVersion,
            resolverVersion: 'not_configured_v0_2',
        },
    };
}
export function createAstronomicalSnapshot(profileId, geoTemporalContext, generatedAt) {
    const natalMoonPhase = createPendingNatalMoonPhase(geoTemporalContext);
    return {
        status: 'requires_ephemeris',
        profileId,
        geoTemporalContext,
        sunLongitudeDegrees: null,
        moonLongitudeDegrees: null,
        natalMoonPhase,
        evidenceIds: [],
        missingLayers: [
            ...geoTemporalContext.missingLayers,
            'Swiss Ephemeris or approved ephemeris service',
            'Moon phase calculation from real Sun/Moon longitudes',
        ],
        note: 'Astronomical snapshot is a structured foundation only. No planetary or lunar positions are calculated in v0.2.',
        metadata: {
            snapshotVersion: 'astronomical-snapshot-v0.2.0',
            ephemerisVersion: 'not_available_v0_2',
            generatedAt,
        },
    };
}
export function calculateMoonPhaseFromLongitudes(input) {
    const angularDistanceDegrees = normalizeDegrees(input.moonLongitudeDegrees - input.sunLongitudeDegrees);
    const phaseName = phaseNameForAngle(angularDistanceDegrees);
    return {
        status: 'calculated',
        phaseName,
        angularDistanceDegrees,
        waxingWaning: angularDistanceDegrees <= 180 ? 'waxing' : 'waning',
        illuminationPercent: null,
        input,
        evidenceId: `ev-${input.profileId}-natal-moon-phase`,
        metadata: {
            calculationVersion: VERSIONS.rulesetVersions.moonPhase,
            ephemerisVersion: input.ephemerisVersion,
        },
    };
}
export function natalMoonPhaseFromCalculation(output) {
    return {
        status: 'calculated',
        phaseName: output.phaseName,
        angularDistanceDegrees: output.angularDistanceDegrees,
        waxingWaning: output.waxingWaning,
        illuminationPercent: output.illuminationPercent,
        calculationInput: output.input,
        evidenceIds: [output.evidenceId],
        missingRequirements: output.illuminationPercent === null ? ['illumination percentage from ephemeris or approved astronomical formula'] : [],
        message: 'Natal Moon phase calculated from ephemeris-backed Sun and Moon longitude inputs.',
        metadata: {
            calculationVersion: output.metadata.calculationVersion,
            ephemerisVersion: output.metadata.ephemerisVersion,
        },
    };
}
export function buildMoonPhaseEvidence(profileId, output) {
    return {
        evidenceId: output.evidenceId,
        sourceEngine: 'natal-moon-phase',
        sourceSymbol: output.phaseName,
        symbolicMeaning: 'Calculated natal Moon phase state',
        traitContributions: [],
        weight: 0,
        reinforcements: [],
        contradictions: [],
        timingContext: {
            utcDateTime: output.input.utcDateTime,
            calculationSource: output.input.calculationSource,
        },
        confidence: 'high',
        calculationMetadata: {
            engineVersion: VERSIONS.engineVersions.moonPhase,
            rulesetVersion: VERSIONS.rulesetVersions.moonPhase,
            inputReference: profileId,
            calculationSteps: [
                `Sun longitude: ${output.input.sunLongitudeDegrees}`,
                `Moon longitude: ${output.input.moonLongitudeDegrees}`,
                `Angular distance: ${output.angularDistanceDegrees}`,
            ],
        },
        translationReferences: ['presentation-copy-v0.2.0:moon-phase-status-only'],
    };
}
function createTimeResolutionStatus(birthDate, birthTime) {
    const hasTime = Boolean(birthTime);
    return {
        status: hasTime ? 'local_time_preserved_timezone_unresolved' : 'date_only_timezone_unresolved',
        birthDate,
        localBirthTime: birthTime,
        timezone: null,
        utcDateTime: null,
        daylightSavingStatus: 'unresolved',
        confidence: hasTime ? 'medium' : 'low',
        missingLayers: ['timezone resolver', 'historical daylight saving rules', 'UTC conversion'],
        note: hasTime
            ? 'Local birth time is preserved, but timezone and DST are unresolved.'
            : 'Birth date is preserved without birth time; exact observer-time calculations are unavailable.',
    };
}
function createLocationResolutionStatus(birthplaceSource) {
    return {
        status: 'birthplace_text_preserved_coordinates_unresolved',
        birthCountry: birthplaceSource.birthCountry,
        birthRegion: birthplaceSource.birthRegion,
        birthCity: birthplaceSource.birthCity,
        birthPostalCode: birthplaceSource.birthPostalCode,
        birthplaceText: birthplaceSource.birthplaceText,
        birthplacePostalCode: birthplaceSource.birthplacePostalCode,
        birthLocationDetail: birthplaceSource.birthLocationDetail,
        source: birthplaceSource,
        normalizedPlaceName: null,
        latitude: null,
        longitude: null,
        altitudeMeters: null,
        resolver: 'not_configured_v0_2',
        confidence: birthplaceSource.birthplaceText ? 'low' : 'low',
        missingLayers: ['atlas/geocoder resolver', 'coordinate confirmation', 'timezone lookup from resolved place'],
        note: 'Birthplace source fields are preserved but not converted to coordinates, maps, GPS, timezone, or UTC without a resolver.',
    };
}
function createPendingNatalMoonPhase(geoTemporalContext) {
    const hasRequiredTextInputs = Boolean(geoTemporalContext.birthDate && geoTemporalContext.birthplaceText);
    return {
        status: hasRequiredTextInputs ? 'requires_ephemeris' : 'not_available',
        phaseName: null,
        angularDistanceDegrees: null,
        waxingWaning: null,
        illuminationPercent: null,
        calculationInput: null,
        evidenceIds: [],
        missingRequirements: [
            'resolved timezone',
            'UTC birth datetime',
            'resolved coordinates',
            'ephemeris-backed Sun longitude',
            'ephemeris-backed Moon longitude',
        ],
        message: 'Natal Moon phase requires ephemeris-backed Sun and Moon longitude calculation.',
        metadata: {
            calculationVersion: VERSIONS.rulesetVersions.moonPhase,
            ephemerisVersion: 'not_available_v0_2',
        },
    };
}
function normalizeDegrees(value) {
    return Number((((value % 360) + 360) % 360).toFixed(6));
}
function phaseNameForAngle(angle) {
    if (angle < 22.5 || angle >= 337.5)
        return 'New Moon';
    if (angle < 67.5)
        return 'Waxing Crescent';
    if (angle < 112.5)
        return 'First Quarter';
    if (angle < 157.5)
        return 'Waxing Gibbous';
    if (angle < 202.5)
        return 'Full Moon';
    if (angle < 247.5)
        return 'Waning Gibbous';
    if (angle < 292.5)
        return 'Last Quarter';
    return 'Waning Crescent';
}
