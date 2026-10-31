import { isPersonalSymbolicLayerId, isPersonalSymbolicLayerStatus, isPersonalSymbolicReadinessStatus, isPersonalSymbolicSectionId, isPersonalSymbolicWarningCategory, personalSymbolicContractVersion, personalSymbolicLayerIds, personalSymbolicLayerStatuses, personalSymbolicLayers, personalSymbolicPipelineId, personalSymbolicReadinessStatuses, personalSymbolicSections, } from './personalSymbolicProfileContract.js?v=b5ef5ed';
import { buildPersonalSymbolicSynthesisOutline } from './personalSymbolicSynthesisOutline.js?v=b5ef5ed';
const sourceVersion = '0.1.0';
const readinessReadyPartial = personalSymbolicReadinessStatuses[0];
const readinessReadyNameOnly = personalSymbolicReadinessStatuses[1];
const readinessReadyNumerologyOnly = personalSymbolicReadinessStatuses[2];
const layerStatusNotConnected = personalSymbolicLayerStatuses[2];
function isUsableReadiness(status) {
    return (status === readinessReadyPartial
        || status === readinessReadyNameOnly
        || status === readinessReadyNumerologyOnly);
}
function statusReasonFor(status) {
    if (status === readinessReadyPartial) {
        return 'Name meaning and identity numerology layers are available; future_astrology is not connected yet, so the pipeline is not complete.';
    }
    if (status === readinessReadyNameOnly) {
        return 'Name meaning is available and identity numerology is unavailable; future_astrology is not connected yet, so the pipeline is not complete.';
    }
    if (status === readinessReadyNumerologyOnly) {
        return 'Identity numerology is available and name meaning is unavailable; future_astrology is not connected yet, so the pipeline is not complete.';
    }
    return 'Name meaning and identity numerology are unavailable; future_astrology is not connected yet, so the pipeline is not complete.';
}
function buildLayerSummary(synthesisOutline) {
    const nameMeaningAvailable = synthesisOutline.outlineSections.identityNameMeaning.status === personalSymbolicLayerStatuses[0];
    const numerologyAvailable = synthesisOutline.outlineSections.identityNumerology.status === personalSymbolicLayerStatuses[0];
    return [
        {
            layer: personalSymbolicLayers.nameMeaning,
            status: synthesisOutline.outlineSections.identityNameMeaning.status,
            available: nameMeaningAvailable,
            reason: nameMeaningAvailable
                ? 'A deterministic name meaning outline resolved for the selected name.'
                : 'No deterministic name meaning outline resolved for the selected name.',
            isConnected: true,
            isAvailable: nameMeaningAvailable,
            sectionId: personalSymbolicSections.identityNameMeaning,
        },
        {
            layer: personalSymbolicLayers.identityNumerology,
            status: synthesisOutline.outlineSections.identityNumerology.status,
            available: numerologyAvailable,
            reason: numerologyAvailable
                ? 'At least one deterministic identity numerology signal was calculated.'
                : 'No deterministic identity numerology signals are currently available for this input.',
            isConnected: true,
            isAvailable: numerologyAvailable,
            sectionId: personalSymbolicSections.identityNumerology,
        },
        {
            layer: personalSymbolicLayers.futureAstrology,
            status: layerStatusNotConnected,
            available: false,
            reason: 'future_astrology is not connected yet.',
            isConnected: false,
            isAvailable: false,
            sectionId: personalSymbolicSections.futureAstrologyPlaceholder,
        },
    ];
}
function buildValidationSummary(readinessStatus, layerSummary, warnings) {
    const layers = layerSummary.map((layer) => ({
        layer: layer.layer,
        status: layer.status,
        layerIdIsValid: isPersonalSymbolicLayerId(layer.layer),
        statusIsValid: isPersonalSymbolicLayerStatus(layer.status),
    }));
    const sections = layerSummary.map((layer) => ({
        sectionId: layer.sectionId,
        sectionIdIsValid: isPersonalSymbolicSectionId(layer.sectionId),
    }));
    const warningSummary = warnings.map((warning) => ({
        code: warning.code,
        sourceLayer: warning.sourceLayer,
        warningCategoryIsValid: isPersonalSymbolicWarningCategory(warning.code),
        sourceLayerIsValid: isPersonalSymbolicLayerId(warning.sourceLayer),
    }));
    const pipelineIdIsValid = personalSymbolicPipelineId === 'personal_symbolic_profile_pipeline';
    const contractVersionIsValid = personalSymbolicContractVersion === '0.1.0';
    const readinessStatusIsValid = isPersonalSymbolicReadinessStatus(readinessStatus);
    const layerSummaryIsValid = layerSummary.length === personalSymbolicLayerIds.length
        && layerSummary.every((layer, index) => layer.layer === personalSymbolicLayerIds[index])
        && layers.every((layer) => layer.layerIdIsValid && layer.statusIsValid);
    const sectionSummaryIsValid = sections.every((section) => section.sectionIdIsValid);
    const warningSummaryIsValid = warningSummary.every((warning) => warning.warningCategoryIsValid && warning.sourceLayerIsValid);
    const validContractReferences = pipelineIdIsValid && contractVersionIsValid;
    const knownLayerIdsOnly = layers.every((layer) => layer.layerIdIsValid);
    const knownReadinessStatus = readinessStatusIsValid;
    const knownWarningCategoriesOnly = warningSummary.every((warning) => warning.warningCategoryIsValid);
    return {
        validContractReferences,
        knownLayerIdsOnly,
        knownReadinessStatus,
        knownWarningCategoriesOnly,
        notes: [
            validContractReferences
                ? 'Pipeline metadata matches the personal symbolic contract.'
                : 'Pipeline metadata does not match the personal symbolic contract.',
            knownLayerIdsOnly
                ? 'Layer summary contains only known personal symbolic layer ids.'
                : 'Layer summary contains an unknown personal symbolic layer id.',
            knownReadinessStatus
                ? 'Readiness status is a known personal symbolic readiness status.'
                : 'Readiness status is not a known personal symbolic readiness status.',
            knownWarningCategoriesOnly
                ? 'Warnings contain only known personal symbolic warning categories.'
                : 'Warnings contain an unknown personal symbolic warning category.',
        ],
        pipelineIdIsValid,
        contractVersionIsValid,
        readinessStatusIsValid,
        layerSummaryIsValid,
        sectionSummaryIsValid,
        warningSummaryIsValid,
        isValid: pipelineIdIsValid
            && contractVersionIsValid
            && readinessStatusIsValid
            && layerSummaryIsValid
            && sectionSummaryIsValid
            && warningSummaryIsValid,
        layers,
        sections,
        warnings: warningSummary,
    };
}
export function buildPersonalSymbolicPipeline(input) {
    const synthesisOutline = buildPersonalSymbolicSynthesisOutline(input);
    const layerSummary = buildLayerSummary(synthesisOutline);
    const readinessStatus = synthesisOutline.synthesisReadiness.status;
    return {
        originalInput: { ...input },
        pipelineId: personalSymbolicPipelineId,
        contractVersion: personalSymbolicContractVersion,
        synthesisOutline,
        pipelineStatus: {
            readinessStatus,
            isUsable: isUsableReadiness(readinessStatus),
            isComplete: false,
            reason: statusReasonFor(readinessStatus),
        },
        layerSummary,
        validationSummary: buildValidationSummary(readinessStatus, layerSummary, synthesisOutline.warnings),
        warnings: synthesisOutline.warnings,
        source: {
            source: 'personal_symbolic_synthesis_outline',
            builder: 'personal_symbolic_pipeline',
            deterministic: true,
            version: sourceVersion,
            contract: {
                pipelineId: personalSymbolicPipelineId,
                version: personalSymbolicContractVersion,
            },
            inputBuilder: synthesisOutline.source,
        },
    };
}
