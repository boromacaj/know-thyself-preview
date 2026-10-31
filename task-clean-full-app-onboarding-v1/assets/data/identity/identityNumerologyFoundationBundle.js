import { normalizeName, runNumerologyEngine } from '../../frontend-app/src/core/numerology.js?v=f9ab0a6';
import { VERSIONS } from '../../frontend-app/src/core/versions.js?v=f9ab0a6';
import { nameNumerologyInterpretationMap } from '../numerology/nameNumerologyInterpretationMap.js?v=f9ab0a6';
const source = {
    source: 'identity_numerology_input',
    builder: 'identity_numerology_foundation_bundle',
    deterministic: true,
    version: '0.1.0',
    calculationSource: 'frontend_app_core_numerology',
    interpretationSource: 'nameNumerologyInterpretationMap',
};
const nameSignalTypes = ['expression', 'soulUrge', 'personality'];
function isValidBirthDate(input) {
    if (!input || !/^\d{4}-\d{2}-\d{2}$/.test(input)) {
        return false;
    }
    const [yearText, monthText, dayText] = input.split('-');
    const year = Number(yearText);
    const month = Number(monthText);
    const day = Number(dayText);
    const date = new Date(Date.UTC(year, month - 1, day));
    return (date.getUTCFullYear() === year
        && date.getUTCMonth() === month - 1
        && date.getUTCDate() === day);
}
function splitName(fullName) {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    const surname = parts.length > 1 ? parts[parts.length - 1] : '';
    const givenNames = parts.length > 1 ? parts.slice(0, -1).join(' ') : (parts[0] ?? '');
    return { givenNames, surname };
}
function placeholderProfile(fullName, birthDate, locale) {
    const [birthYear, birthMonth, birthDay] = birthDate.split('-');
    const { givenNames, surname } = splitName(fullName);
    const birthplaceSource = {
        birthCountry: null,
        birthRegion: null,
        birthCity: null,
        birthPostalCode: null,
        birthplaceText: '',
        birthplacePostalCode: null,
        birthLocationDetail: null,
    };
    const timeResolution = {
        status: 'date_only_timezone_unresolved',
        birthDate,
        localBirthTime: null,
        timezone: null,
        utcDateTime: null,
        daylightSavingStatus: 'unresolved',
        confidence: 'medium',
        missingLayers: ['birth_time', 'timezone'],
        note: 'Birth date is preserved for deterministic numerology; time is not used here.',
    };
    const locationResolution = {
        status: 'birthplace_text_preserved_coordinates_unresolved',
        birthCountry: null,
        birthRegion: null,
        birthCity: null,
        birthPostalCode: null,
        birthplaceText: '',
        birthplacePostalCode: null,
        birthLocationDetail: null,
        source: birthplaceSource,
        normalizedPlaceName: null,
        latitude: null,
        longitude: null,
        altitudeMeters: null,
        resolver: 'not_configured_v0_2',
        confidence: 'low',
        missingLayers: ['birthplace'],
        note: 'Location is not resolved for this identity numerology foundation bundle.',
    };
    const geoTemporalContext = {
        status: 'unresolved_v0_2_foundation',
        birthDate,
        birthTime: null,
        birthCountry: null,
        birthRegion: null,
        birthCity: null,
        birthPostalCode: null,
        birthplaceText: '',
        birthplacePostalCode: null,
        birthLocationDetail: null,
        birthplaceSource,
        timeResolution,
        locationResolution,
        timezoneResolutionStatus: 'unresolved',
        coordinateResolutionStatus: 'unresolved',
        precision: {
            time: 'medium',
            location: 'low',
        },
        missingLayers: ['birth_time', 'birthplace', 'timezone', 'coordinates'],
        evidenceIds: [],
        note: `Locale ${locale ?? 'unspecified'} is preserved but not used for numerology calculation.`,
        metadata: {
            schemaVersion: VERSIONS.schemaVersion,
            resolverVersion: 'not_configured_v0_2',
        },
    };
    const astronomicalSnapshot = {
        status: 'requires_geo_temporal_resolution',
        profileId: 'identity-numerology-foundation-input',
        geoTemporalContext,
        sunLongitudeDegrees: null,
        moonLongitudeDegrees: null,
        natalMoonPhase: {
            status: 'not_available',
            phaseName: null,
            angularDistanceDegrees: null,
            waxingWaning: null,
            illuminationPercent: null,
            calculationInput: null,
            evidenceIds: [],
            missingRequirements: ['ephemeris'],
            message: 'Moon phase is outside this identity numerology foundation bundle.',
            metadata: {
                calculationVersion: 'not_available_v0_2',
                ephemerisVersion: 'not_available_v0_2',
            },
        },
        evidenceIds: [],
        missingLayers: ['geo_temporal_resolution', 'ephemeris'],
        note: 'Astronomical layers are not calculated by this identity numerology foundation bundle.',
        metadata: {
            snapshotVersion: 'not_available_v0_2',
            ephemerisVersion: 'not_available_v0_2',
            generatedAt: '1970-01-01T00:00:00.000Z',
        },
    };
    return {
        profileId: 'identity-numerology-foundation-input',
        identity: {
            displayName: fullName.trim(),
            birthGivenNames: givenNames,
            birthSurname: surname,
            birthFullName: fullName.trim(),
            normalizedBirthFullName: normalizeName(fullName),
        },
        input: {
            birthDay,
            birthMonth,
            birthYear,
            birthDate,
            birthTime: null,
            birthCountry: null,
            birthRegion: null,
            birthCity: null,
            birthPostalCode: null,
            birthplace: '',
            birthplacePostalCode: null,
            birthLocationDetail: null,
            birthplaceSource,
            geoTemporalContext,
            uncertainty: {
                birthTimeKnown: false,
                inputConfidence: 'medium',
                notes: ['Identity numerology foundation bundle uses fullName and birthDate only.'],
            },
        },
        astronomicalSnapshot,
        engineOutputs: [],
        normalizedTraits: [],
        synthesis: null,
        forecastState: null,
        evidence: [],
        metadata: {
            generatedAt: '1970-01-01T00:00:00.000Z',
            profileVersion: 'identity-numerology-foundation-v0.1.0',
            calculationStatus: 'profile_created',
            versions: VERSIONS,
        },
    };
}
function unavailable(signalType, reason) {
    return { signalType, reason };
}
function isSupportedNameNumerologyNumber(number) {
    return nameNumerologyInterpretationMap.supportedNumbers.includes(number);
}
function interpretationReferencesFor(signals, unavailableSignals, warnings) {
    return nameSignalTypes.flatMap((signalType) => {
        const sourceSignal = signals[signalType];
        if (!sourceSignal) {
            return [];
        }
        const number = sourceSignal.calculation.finalNumber;
        if (!isSupportedNameNumerologyNumber(number)) {
            const reason = `No name numerology interpretation entry is available for ${signalType}.${number}.`;
            unavailableSignals.push(unavailable(signalType, reason));
            warnings.push({ code: 'interpretation_unavailable', message: reason });
            return [];
        }
        return [{
                signalType,
                number,
                interpretationMapId: 'nameNumerologyInterpretationMap',
                interpretationKey: `${signalType}.${number}`,
                interpretation: nameNumerologyInterpretationMap.signalOverlays[signalType][number],
                sourceSignal,
            }];
    });
}
export function buildIdentityNumerologyFoundationBundle(input) {
    const originalInput = { ...input };
    const normalizedNameForNumerology = normalizeName(input.fullName);
    const birthDate = input.birthDate ?? null;
    const unavailableSignals = [];
    const warnings = [];
    const calculatedSignals = {
        lifePath: null,
        expression: null,
        soulUrge: null,
        personality: null,
    };
    if (!normalizedNameForNumerology) {
        warnings.push({
            code: 'missing_full_name',
            message: 'A non-empty fullName is required before deterministic name numerology signals can be calculated.',
        });
    }
    if (!input.birthDate) {
        warnings.push({
            code: 'missing_birth_date',
            message: 'Birth date is required by the existing numerology engine before identity numerology signals can be calculated.',
        });
    }
    else if (!isValidBirthDate(input.birthDate)) {
        warnings.push({
            code: 'invalid_birth_date',
            message: 'Birth date must be a valid YYYY-MM-DD date before deterministic numerology signals can be calculated.',
        });
    }
    if (!normalizedNameForNumerology || !isValidBirthDate(input.birthDate)) {
        const reason = 'The existing numerology engine requires a non-empty fullName and valid birthDate.';
        unavailableSignals.push(unavailable('lifePath', reason), unavailable('expression', reason), unavailable('soulUrge', reason), unavailable('personality', reason));
        warnings.push({ code: 'calculation_unavailable', message: reason });
        return {
            originalInput,
            normalizedNameForNumerology,
            birthDate,
            calculatedSignals,
            interpretationReferences: [],
            unavailableSignals,
            warnings,
            source,
        };
    }
    const engineOutput = runNumerologyEngine(placeholderProfile(input.fullName, input.birthDate, input.locale), '1970-01-01T00:00:00.000Z', 2000);
    calculatedSignals.lifePath = {
        signalType: 'lifePath',
        calculation: engineOutput.rawOutput.lifePathNumber,
    };
    calculatedSignals.expression = {
        signalType: 'expression',
        calculation: engineOutput.rawOutput.expressionNumber,
    };
    calculatedSignals.soulUrge = {
        signalType: 'soulUrge',
        calculation: engineOutput.rawOutput.soulUrgeNumber,
    };
    calculatedSignals.personality = {
        signalType: 'personality',
        calculation: engineOutput.rawOutput.personalityNumber,
    };
    const interpretationReferences = interpretationReferencesFor(calculatedSignals, unavailableSignals, warnings);
    return {
        originalInput,
        normalizedNameForNumerology,
        birthDate,
        calculatedSignals,
        interpretationReferences,
        unavailableSignals,
        warnings,
        source,
    };
}
