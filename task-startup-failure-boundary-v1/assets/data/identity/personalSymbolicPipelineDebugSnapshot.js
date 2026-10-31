import { buildPersonalSymbolicPipeline } from './personalSymbolicPipeline.js?v=2ea79e9';
const sourceVersion = '0.1.0';
export function buildPersonalSymbolicPipelineDebugSnapshot(input) {
    const pipeline = buildPersonalSymbolicPipeline(input);
    return {
        originalInput: pipeline.originalInput,
        pipelineId: pipeline.pipelineId,
        contractVersion: pipeline.contractVersion,
        readinessStatus: pipeline.pipelineStatus.readinessStatus,
        isUsable: pipeline.pipelineStatus.isUsable,
        isComplete: pipeline.pipelineStatus.isComplete,
        pipelineReason: pipeline.pipelineStatus.reason,
        layerSnapshot: pipeline.layerSummary.map((layer) => ({
            layer: layer.layer,
            status: layer.status,
            available: layer.available,
            reason: layer.reason,
        })),
        validationSnapshot: {
            validContractReferences: pipeline.validationSummary.validContractReferences,
            knownLayerIdsOnly: pipeline.validationSummary.knownLayerIdsOnly,
            knownReadinessStatus: pipeline.validationSummary.knownReadinessStatus,
            knownWarningCategoriesOnly: pipeline.validationSummary.knownWarningCategoriesOnly,
            isValid: pipeline.validationSummary.isValid,
            notes: [...pipeline.validationSummary.notes],
        },
        warningSnapshot: {
            warningCount: pipeline.warnings.length,
            warningCodes: pipeline.warnings.map((warning) => warning.code),
            sourceLayers: pipeline.warnings.map((warning) => warning.sourceLayer),
        },
        source: {
            source: 'personal_symbolic_pipeline',
            builder: 'personal_symbolic_pipeline_debug_snapshot',
            deterministic: true,
            version: sourceVersion,
            inputBuilder: pipeline.source,
        },
    };
}
