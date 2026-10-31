import { assemblePersonalSymbolicReportContent } from './personalSymbolicReportContentAssembler.js';
const missingInputWarnings = ['missing_identity_name', 'missing_full_name', 'missing_birth_date'];
const nameMeaningWarnings = ['missing_identity_name', 'unsupported_name_meaning'];
const numerologyWarnings = [
    'missing_full_name',
    'missing_birth_date',
    'invalid_birth_date',
    'identity_numerology_unavailable',
    'calculation_unavailable',
    'interpretation_unavailable',
];
const calculationWarnings = ['invalid_birth_date', 'calculation_unavailable'];
const futureLayerWarnings = ['future_astrology_not_connected'];
const boundaryLabels = [
    'No medical diagnosis.',
    'No fate or destiny claims.',
    'No personality certainty claims.',
    'No soulmate or compatibility claims.',
];
function unavailableValue(reason) {
    return {
        kind: 'unavailable',
        reason,
    };
}
function warningCodesFor(warnings, allowedCodes) {
    return uniqueCodes(warnings
        .map((warning) => warning.code)
        .filter((code) => allowedCodes.includes(code)));
}
function allWarningCodes(warnings) {
    return uniqueCodes(warnings.map((warning) => warning.code));
}
function uniqueCodes(codes) {
    return [...new Set(codes)];
}
function compactNumerologyNumbers(calculatedSignals) {
    return Object.fromEntries(Object.entries(calculatedSignals).map(([signalType, signal]) => {
        if (!signal || typeof signal !== 'object' || !('calculation' in signal)) {
            return [signalType, null];
        }
        const calculation = signal.calculation;
        return [
            signalType,
            {
                signalType,
                finalNumber: calculation.finalNumber ?? null,
                calculation,
            },
        ];
    }));
}
function layerCounts(assembledReport) {
    const layers = assembledReport.debug.reportModel.layerSummary;
    return {
        availableLayerCount: layers.filter((layer) => layer.available).length,
        unavailableLayerCount: layers.filter((layer) => !layer.available && layer.status !== 'not_connected').length,
        notConnectedLayerCount: layers.filter((layer) => layer.status === 'not_connected').length,
    };
}
function snapshotWithSynthesisOutline(assembledReport) {
    return assembledReport.debug.reportModel.debug.snapshot;
}
function unavailableSnapshotOutlineValue() {
    return unavailableValue('Synthesis outline is unavailable in assembled report debug snapshot.');
}
export function resolvePersonalSymbolicContentBlockValue(block, assembledReport) {
    const reportModel = assembledReport.debug.reportModel;
    switch (block.blockId) {
        case 'name_meaning_summary':
            if (!block.available) {
                return unavailableValue(block.reason);
            }
            return nameMeaningSummaryValue(block, assembledReport);
        case 'name_origin_reference':
            if (!block.available) {
                return unavailableValue(block.reason);
            }
            return nameOriginReferenceValue(block, assembledReport);
        case 'numerology_core_numbers_summary':
            if (!block.available) {
                return unavailableValue(block.reason);
            }
            return numerologyCoreNumbersSummaryValue(assembledReport);
        case 'numerology_cycle_reference':
            if (!block.available) {
                return unavailableValue(block.reason);
            }
            return numerologyCycleReferenceValue(assembledReport);
        case 'name_meaning_limitations':
            return {
                kind: 'limitations',
                warnings: warningCodesFor(reportModel.warnings, nameMeaningWarnings),
                note: 'Name meaning data is limited to supported deterministic entries.',
            };
        case 'numerology_limitations':
            return {
                kind: 'limitations',
                warnings: warningCodesFor(reportModel.warnings, numerologyWarnings),
                note: 'Numerology data is calculated only from valid deterministic inputs.',
            };
        case 'integrated_available_layers_summary':
            if (!block.available) {
                return unavailableValue(block.reason);
            }
            return {
                kind: 'available_layers_summary',
                layers: reportModel.layerSummary,
            };
        case 'integrated_cross_layer_notes':
            if (!block.available) {
                return unavailableValue(block.reason);
            }
            return {
                kind: 'integration_notes',
                readinessStatus: reportModel.status.readinessStatus,
                ...layerCounts(assembledReport),
            };
        case 'integrated_limitations':
            return {
                kind: 'limitations',
                warnings: allWarningCodes(reportModel.warnings),
                note: 'Integrated overview is limited to currently available symbolic layers.',
            };
        case 'astrology_placeholder_summary':
            return {
                kind: 'placeholder',
                layer: 'future_astrology',
                status: 'not_connected',
                note: 'Future astrology layer is not connected yet.',
            };
        case 'astrology_not_connected_limitation':
            return {
                kind: 'limitations',
                warnings: warningCodesFor(reportModel.warnings, futureLayerWarnings),
                note: 'Astrology data is intentionally unavailable until the astrology layer is connected.',
            };
        case 'missing_inputs_summary':
            return {
                kind: 'warnings_summary',
                warnings: warningCodesFor(reportModel.warnings, missingInputWarnings),
            };
        case 'calculation_limitations_summary':
            return {
                kind: 'warnings_summary',
                warnings: warningCodesFor(reportModel.warnings, calculationWarnings),
            };
        case 'interpretation_boundaries_summary':
            return {
                kind: 'boundaries',
                boundaries: [...boundaryLabels],
            };
        case 'source_metadata_summary':
            return {
                kind: 'source_metadata',
                source: reportModel.source,
            };
        case 'debug_validation_summary':
            return {
                kind: 'debug_validation',
                validation: reportModel.debug.validation,
            };
        case 'deterministic_pipeline_summary':
            return {
                kind: 'deterministic_pipeline',
                pipelineId: reportModel.pipelineId,
                contractVersion: reportModel.contractVersion,
                reportVersion: reportModel.reportVersion,
            };
        default:
            return {
                kind: 'unknown_block',
                blockId: block.blockId,
                reason: 'No deterministic value resolver is registered for this block.',
            };
    }
}
function nameMeaningSummaryValue(block, assembledReport) {
    const nameMeaningSection = snapshotWithSynthesisOutline(assembledReport).synthesisOutline?.outlineSections?.identityNameMeaning;
    if (!nameMeaningSection) {
        return unavailableSnapshotOutlineValue();
    }
    const nameMeaningOutline = nameMeaningSection.nameMeaningOutline;
    if (!block.available) {
        return unavailableValue(block.reason);
    }
    return {
        kind: 'name_meaning_summary',
        selectedNameForMeaning: nameMeaningSection.selectedNameForMeaning,
        displayName: nameMeaningOutline.displayName,
        meaning: nameMeaningOutline.primaryMeaningSummary,
        origin: nameMeaningOutline.culturalContext,
        notes: {
            possibleMeaningKeywords: nameMeaningOutline.possibleMeaningKeywords,
            symbolicThemes: nameMeaningOutline.symbolicThemes,
            pronunciationContext: nameMeaningOutline.pronunciationContext,
            safetyDisclaimer: nameMeaningOutline.safetyDisclaimer,
        },
    };
}
function nameOriginReferenceValue(block, assembledReport) {
    const nameMeaningSection = snapshotWithSynthesisOutline(assembledReport).synthesisOutline?.outlineSections?.identityNameMeaning;
    if (!nameMeaningSection) {
        return unavailableSnapshotOutlineValue();
    }
    const nameMeaningOutline = nameMeaningSection.nameMeaningOutline;
    if (!block.available) {
        return unavailableValue(block.reason);
    }
    return {
        kind: 'name_origin_reference',
        selectedNameForMeaning: nameMeaningSection.selectedNameForMeaning,
        origin: nameMeaningOutline.culturalContext,
        source: 'name_meaning_bundle',
    };
}
function numerologyCoreNumbersSummaryValue(assembledReport) {
    const reportModel = assembledReport.debug.reportModel;
    const numerologySection = snapshotWithSynthesisOutline(assembledReport).synthesisOutline?.outlineSections?.identityNumerology;
    if (!numerologySection) {
        return unavailableSnapshotOutlineValue();
    }
    return {
        kind: 'numerology_core_numbers_summary',
        numbers: compactNumerologyNumbers(numerologySection.calculatedSignals),
        warnings: warningCodesFor(reportModel.warnings, numerologyWarnings),
    };
}
function numerologyCycleReferenceValue(assembledReport) {
    const reportModel = assembledReport.debug.reportModel;
    return {
        kind: 'numerology_cycle_reference',
        cycles: null,
        warnings: warningCodesFor(reportModel.warnings, numerologyWarnings),
    };
}
export function resolvePersonalSymbolicContentValues(input, locale) {
    const assembledReport = assemblePersonalSymbolicReportContent(input, locale);
    return {
        ...assembledReport,
        sections: assembledReport.sections.map((section) => ({
            ...section,
            blocks: section.blocks.map((block) => ({
                ...block,
                value: resolvePersonalSymbolicContentBlockValue(block, assembledReport),
            })),
        })),
    };
}
