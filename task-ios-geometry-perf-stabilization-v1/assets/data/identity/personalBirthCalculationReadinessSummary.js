import { buildPersonalBirthDataAvailabilitySummary, personalBirthDataAvailabilityFieldIds, personalBirthDataAvailabilitySummaryId, personalBirthDataAvailabilitySummaryVersion, } from './personalBirthDataAvailabilitySummary.js?v=d9f39e7';
export const personalBirthCalculationReadinessSummaryId = 'personal_birth_calculation_readiness_summary';
export const personalBirthCalculationReadinessSummaryVersion = '0.1.0';
export const personalBirthCalculationReadinessStatuses = [
    'ready',
    'partial',
    'missing',
];
const futureBirthCalculationLayerIds = [
    'western_astrology',
    'human_design',
    'bazi',
];
function uniqueWarnings(warnings) {
    return [...new Set(warnings)];
}
function fieldIdsByAvailability(birthDataAvailability, status) {
    const availableFieldIds = new Set(birthDataAvailability.fields
        .filter((field) => field.status === status)
        .map((field) => field.fieldId));
    return personalBirthDataAvailabilityFieldIds.filter((fieldId) => availableFieldIds.has(fieldId));
}
function readinessStatusForLayer(availableFieldIds, missingFieldIds) {
    if (availableFieldIds.length === personalBirthDataAvailabilityFieldIds.length) {
        return 'ready';
    }
    if (missingFieldIds.length === personalBirthDataAvailabilityFieldIds.length) {
        return 'missing';
    }
    return 'partial';
}
function layerSpecificWarning(layerId) {
    if (layerId === 'western_astrology') {
        return 'not_astrology_calculation';
    }
    if (layerId === 'human_design') {
        return 'not_human_design_calculation';
    }
    return 'not_bazi_calculation';
}
function warningsForLayer(layerId, missingFieldIds) {
    return uniqueWarnings([
        'future_layer_readiness_only',
        'not_calculation',
        layerSpecificWarning(layerId),
        ...(missingFieldIds.length > 0 ? ['missing_required_birth_data'] : []),
    ]);
}
function buildLayer(layerId, birthDataAvailability) {
    const availableFieldIds = fieldIdsByAvailability(birthDataAvailability, 'available');
    const missingFieldIds = fieldIdsByAvailability(birthDataAvailability, 'missing');
    return {
        layerId,
        readinessStatus: readinessStatusForLayer(availableFieldIds, missingFieldIds),
        requiredFieldIds: [...personalBirthDataAvailabilityFieldIds],
        availableFieldIds,
        missingFieldIds,
        warnings: warningsForLayer(layerId, missingFieldIds),
    };
}
function countsFor(layers) {
    return {
        totalLayers: layers.length,
        readyLayers: layers.filter((layer) => layer.readinessStatus === 'ready').length,
        partialLayers: layers.filter((layer) => layer.readinessStatus === 'partial').length,
        missingLayers: layers.filter((layer) => layer.readinessStatus === 'missing').length,
    };
}
function readinessStatusForSummary(counts) {
    if (counts.readyLayers === counts.totalLayers) {
        return 'ready';
    }
    if (counts.missingLayers === counts.totalLayers) {
        return 'missing';
    }
    return 'partial';
}
function metadataFor() {
    return {
        deterministic: true,
        generatedBy: 'personal_birth_calculation_readiness_summary',
        aiGenerated: false,
        llmGenerated: false,
        source: 'deterministic_birth_calculation_readiness',
        birthDataAvailabilitySummaryId: personalBirthDataAvailabilitySummaryId,
        birthDataAvailabilitySummaryVersion: personalBirthDataAvailabilitySummaryVersion,
    };
}
export function buildPersonalBirthCalculationReadinessSummary(input) {
    const birthDataAvailability = buildPersonalBirthDataAvailabilitySummary(input);
    const layers = futureBirthCalculationLayerIds.map((layerId) => buildLayer(layerId, birthDataAvailability));
    const counts = countsFor(layers);
    const warnings = uniqueWarnings([
        ...birthDataAvailability.warnings,
        ...layers.flatMap((layer) => layer.warnings),
        'deterministic_birth_calculation_readiness',
        'future_layer_readiness_only',
        'input_availability_only',
        'not_astrology_calculation',
        'not_human_design_calculation',
        'not_bazi_calculation',
        'not_tcm_calculation',
        'not_final_interpretation',
        'not_runtime_ui',
    ]);
    return {
        summaryId: personalBirthCalculationReadinessSummaryId,
        summaryVersion: personalBirthCalculationReadinessSummaryVersion,
        deterministic: true,
        readinessStatus: readinessStatusForSummary(counts),
        birthDataAvailability,
        layers,
        counts,
        warnings,
        metadata: metadataFor(),
    };
}
