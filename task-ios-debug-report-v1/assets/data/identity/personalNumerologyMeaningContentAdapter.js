import { normalizePersonalNumerologyMeaningKey, resolvePersonalNumerologyMeaningContent, } from './personalNumerologyMeaningContentLayer.js?v=b5ef5ed';
export const personalNumerologyMeaningContentAdapterId = 'personal_numerology_meaning_content_adapter';
export const personalNumerologyMeaningContentAdapterVersion = '0.1.0';
export const personalNumerologyMeaningAdaptedHumanUnitIds = [
    'human_numerology_core_summary',
    'human_numerology_number_themes',
    'human_numerology_calculation_context',
    'human_numerology_cycle_context',
    'human_numerology_boundary',
];
export const personalNumerologyMeaningAdaptedTextResolutionStatuses = [
    'adapted',
    'fallback_adapted',
    'unavailable',
    'not_numerology_unit',
];
export const personalNumerologyMeaningKinds = [
    'core',
    'themes',
    'calculation',
    'cycle',
    'boundary',
];
function metadataFor() {
    return {
        deterministic: true,
        generatedBy: personalNumerologyMeaningContentAdapterId,
        aiGenerated: false,
        llmGenerated: false,
        sourceLayer: 'personal_numerology_meaning_content_layer',
    };
}
function isRecord(value) {
    return typeof value === 'object' && value !== null;
}
function nestedValue(input, path) {
    let current = input;
    for (const key of path) {
        if (!isRecord(current)) {
            return undefined;
        }
        current = current[key];
    }
    return current;
}
function numericValueFrom(value) {
    if (typeof value === 'number' || typeof value === 'string') {
        const normalized = normalizePersonalNumerologyMeaningKey(value);
        return normalized === '' ? null : Number(normalized);
    }
    if (!isRecord(value)) {
        return null;
    }
    for (const key of ['value', 'number', 'calculatedValue']) {
        const normalized = normalizePersonalNumerologyMeaningKey(value[key]);
        if (normalized !== '') {
            return Number(normalized);
        }
    }
    return null;
}
function reduceDigits(value) {
    let current = Math.abs(Math.trunc(value));
    while (current > 9) {
        current = String(current)
            .split('')
            .reduce((sum, digit) => sum + Number(digit), 0);
    }
    return current;
}
function lifePathFromDateText(value) {
    if (typeof value !== 'string') {
        return null;
    }
    const trimmed = value.trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
        return null;
    }
    const digitSum = trimmed
        .replace(/[^0-9]/g, '')
        .split('')
        .reduce((sum, digit) => sum + Number(digit), 0);
    return reduceDigits(digitSum);
}
function lifePathFromSeparateDateFields(input) {
    if (!isRecord(input)) {
        return null;
    }
    const dateFieldGroups = [
        ['birthYear', 'birthMonth', 'birthDay'],
        ['year', 'month', 'day'],
    ];
    for (const [yearKey, monthKey, dayKey] of dateFieldGroups) {
        const year = numericValueFrom(input[yearKey]);
        const month = numericValueFrom(input[monthKey]);
        const day = numericValueFrom(input[dayKey]);
        if (year === null || month === null || day === null) {
            continue;
        }
        const digitSum = `${year}${month}${day}`
            .split('')
            .reduce((sum, digit) => sum + Number(digit), 0);
        return reduceDigits(digitSum);
    }
    return null;
}
function themeLabels(record) {
    return record.symbolicThemes.map((theme) => theme.label).join(', ');
}
function adaptedTextFor(unitId, record) {
    if (unitId === 'human_numerology_core_summary') {
        return `Numerology reference: ${record.displayName}. ${record.meaningSummary}`;
    }
    if (unitId === 'human_numerology_number_themes') {
        return `Symbolic number themes recorded for ${record.displayName}: ${themeLabels(record)}. These themes are reference material, not identity labels.`;
    }
    if (unitId === 'human_numerology_calculation_context') {
        return `Calculation context for ${record.displayName}: ${record.numerologyContext}`;
    }
    if (unitId === 'human_numerology_cycle_context') {
        return `Cycle context note for ${record.displayName}: this report records numerology timing as symbolic reference material, not as a prediction of events.`;
    }
    return `Numerology symbolism for ${record.displayName} remains symbolic reference material only. It should not be used as certainty, proof, prediction, or fixed identity.`;
}
function adapterStatusFor(resolution) {
    if (resolution.status === 'available') {
        return 'adapted';
    }
    if (resolution.status === 'fallback_available') {
        return 'fallback_adapted';
    }
    return 'unavailable';
}
export function isPersonalNumerologyMeaningAdaptedHumanUnitId(value) {
    return typeof value === 'string'
        && personalNumerologyMeaningAdaptedHumanUnitIds.includes(value);
}
export function extractCoreNumerologyValue(input, _kind) {
    const candidatePaths = [
        ['numerology', 'lifePath'],
        ['identityNumerology', 'lifePath'],
        ['identity', 'numerology', 'lifePath'],
        ['calculations', 'numerology', 'lifePath'],
        ['coreNumbers', 'lifePath'],
        ['lifePath'],
        ['numerology', 'coreNumbers', 'lifePath'],
        ['report', 'numerology', 'lifePath'],
    ];
    for (const path of candidatePaths) {
        const value = numericValueFrom(nestedValue(input, path));
        if (value !== null) {
            return value;
        }
    }
    const datePaths = [
        ['birthDate'],
        ['birth', 'date'],
        ['identity', 'birthDate'],
        ['derivedBirthDate'],
        ['dateOfBirth'],
    ];
    for (const path of datePaths) {
        const value = lifePathFromDateText(nestedValue(input, path));
        if (value !== null) {
            return value;
        }
    }
    return lifePathFromSeparateDateFields(input);
}
export function resolvePersonalNumerologyMeaningAdaptedText(unitId, input) {
    const inputValue = extractCoreNumerologyValue(input, 'core');
    const contentResolution = resolvePersonalNumerologyMeaningContent(inputValue);
    if (!isPersonalNumerologyMeaningAdaptedHumanUnitId(unitId)) {
        return {
            adapterId: personalNumerologyMeaningContentAdapterId,
            adapterVersion: personalNumerologyMeaningContentAdapterVersion,
            unitId,
            inputValue,
            normalizedKey: contentResolution.normalizedKey,
            status: 'not_numerology_unit',
            text: null,
            warnings: [],
            metadata: metadataFor(),
        };
    }
    const status = adapterStatusFor(contentResolution);
    return {
        adapterId: personalNumerologyMeaningContentAdapterId,
        adapterVersion: personalNumerologyMeaningContentAdapterVersion,
        unitId,
        inputValue,
        normalizedKey: contentResolution.normalizedKey,
        status,
        text: contentResolution.record === null ? null : adaptedTextFor(unitId, contentResolution.record),
        warnings: [...contentResolution.warnings],
        metadata: metadataFor(),
    };
}
export function buildPersonalNumerologyMeaningAdaptedTextMap(input) {
    return Object.fromEntries(personalNumerologyMeaningAdaptedHumanUnitIds.map((unitId) => [
        unitId,
        resolvePersonalNumerologyMeaningAdaptedText(unitId, input),
    ]));
}
