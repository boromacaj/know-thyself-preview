export const personalBirthDataAvailabilitySummaryId = 'personal_birth_data_availability_summary';
export const personalBirthDataAvailabilitySummaryVersion = '0.1.0';
export const personalBirthDataAvailabilityStatuses = [
    'complete',
    'partial',
    'missing',
];
export const personalBirthDataAvailabilityFieldStatuses = [
    'available',
    'missing',
];
export const personalBirthDataAvailabilityFieldIds = [
    'birth_date',
    'birth_time',
    'birth_place',
];
const birthDateCandidatePaths = [
    ['birthDate'],
    ['birth', 'date'],
    ['identity', 'birthDate'],
    ['identity', 'birth', 'date'],
    ['dateOfBirth'],
    ['derivedBirthDate'],
];
const birthTimeCandidatePaths = [
    ['birthTime'],
    ['birth', 'time'],
    ['identity', 'birthTime'],
    ['identity', 'birth', 'time'],
    ['timeOfBirth'],
];
const birthPlaceCandidatePaths = [
    ['birthPlace'],
    ['birth', 'place'],
    ['identity', 'birthPlace'],
    ['identity', 'birth', 'place'],
    ['placeOfBirth'],
    ['birthLocation'],
    ['locationOfBirth'],
];
function uniqueWarnings(warnings) {
    return [...new Set(warnings)];
}
function isRecord(value) {
    return typeof value === 'object' && value !== null;
}
function valueAtPath(input, path) {
    let current = input;
    for (const segment of path) {
        if (!isRecord(current) || !(segment in current)) {
            return {
                found: false,
                value: undefined,
            };
        }
        current = current[segment];
    }
    return {
        found: true,
        value: current,
    };
}
function stringifyObject(value) {
    try {
        return JSON.stringify(value) ?? '[object]';
    }
    catch {
        return '[object]';
    }
}
function normalizeCandidateValue(value) {
    if (value === null || value === undefined) {
        return {
            inputValue: value,
            normalizedValue: null,
        };
    }
    if (typeof value === 'string') {
        const trimmedValue = value.trim();
        return {
            inputValue: value,
            normalizedValue: trimmedValue.length > 0 ? trimmedValue : null,
        };
    }
    if (typeof value === 'number') {
        return {
            inputValue: value,
            normalizedValue: String(value),
        };
    }
    if (typeof value === 'object') {
        return {
            inputValue: value,
            normalizedValue: stringifyObject(value),
        };
    }
    return {
        inputValue: value,
        normalizedValue: null,
    };
}
function resolveField(fieldId, candidatePaths, missingWarning, input) {
    let firstFoundCandidate = null;
    for (const path of candidatePaths) {
        const candidate = valueAtPath(input, path);
        if (!candidate.found) {
            continue;
        }
        const normalizedCandidate = normalizeCandidateValue(candidate.value);
        if (firstFoundCandidate === null) {
            firstFoundCandidate = normalizedCandidate;
        }
        if (normalizedCandidate.normalizedValue !== null) {
            return {
                fieldId,
                status: 'available',
                inputValue: normalizedCandidate.inputValue,
                normalizedValue: normalizedCandidate.normalizedValue,
                warnings: [],
            };
        }
    }
    return {
        fieldId,
        status: 'missing',
        inputValue: firstFoundCandidate?.inputValue ?? null,
        normalizedValue: null,
        warnings: [missingWarning],
    };
}
function countsFor(fields) {
    const availableFields = fields.filter((field) => field.status === 'available').length;
    return {
        totalFields: fields.length,
        availableFields,
        missingFields: fields.length - availableFields,
    };
}
function availabilityStatusFor(counts) {
    if (counts.availableFields === counts.totalFields) {
        return 'complete';
    }
    if (counts.missingFields === counts.totalFields) {
        return 'missing';
    }
    return 'partial';
}
function metadataFor() {
    return {
        deterministic: true,
        generatedBy: 'personal_birth_data_availability_summary',
        aiGenerated: false,
        llmGenerated: false,
        source: 'deterministic_birth_data_availability',
    };
}
export function buildPersonalBirthDataAvailabilitySummary(input) {
    const fields = [
        resolveField('birth_date', birthDateCandidatePaths, 'missing_birth_date', input),
        resolveField('birth_time', birthTimeCandidatePaths, 'missing_birth_time', input),
        resolveField('birth_place', birthPlaceCandidatePaths, 'missing_birth_place', input),
    ];
    const counts = countsFor(fields);
    const warnings = uniqueWarnings([
        ...fields.flatMap((field) => field.warnings),
        'deterministic_birth_data_availability',
        'input_availability_only',
        'not_astrology_calculation',
        'not_human_design_calculation',
        'not_bazi_calculation',
        'not_tcm_calculation',
        'not_final_interpretation',
        'not_runtime_ui',
    ]);
    return {
        summaryId: personalBirthDataAvailabilitySummaryId,
        summaryVersion: personalBirthDataAvailabilitySummaryVersion,
        deterministic: true,
        availabilityStatus: availabilityStatusFor(counts),
        fields,
        counts,
        warnings,
        metadata: metadataFor(),
    };
}
