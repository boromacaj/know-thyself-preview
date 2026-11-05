import { personalSymbolicLayerStatuses } from './personalSymbolicProfileContract.js';
import { buildPersonalSymbolicPipeline } from './personalSymbolicPipeline.js';
import { buildPersonalSymbolicPipelineDebugSnapshot } from './personalSymbolicPipelineDebugSnapshot.js';
import { validatePersonalSymbolicPipelineDebugSnapshot } from './personalSymbolicPipelineDebugSnapshotValidator.js';
import { personalSymbolicReportSectionIds, personalSymbolicReportSectionRegistry, } from './personalSymbolicReportSectionRegistry.js';
export const personalSymbolicReportId = 'personal_symbolic_report';
export const personalSymbolicReportVersion = '0.1.0';
const resolvedStatus = personalSymbolicLayerStatuses[0];
const unavailableStatus = personalSymbolicLayerStatuses[1];
const notConnectedStatus = personalSymbolicLayerStatuses[2];
const identityNameMeaningSection = personalSymbolicReportSectionIds[0];
const identityNumerologySection = personalSymbolicReportSectionIds[1];
const integratedOverviewSection = personalSymbolicReportSectionIds[2];
const futureAstrologySection = personalSymbolicReportSectionIds[3];
function compactLayerSummary(layerSummary, debugSnapshot) {
    const compactDebugLayers = new Map(debugSnapshot.layerSnapshot.map((layer) => [layer.layer, layer]));
    return layerSummary.map((layer) => {
        const debugLayer = compactDebugLayers.get(layer.layer);
        return {
            layer: layer.layer,
            status: debugLayer?.status ?? layer.status,
            available: debugLayer?.available ?? layer.available,
            reason: debugLayer?.reason ?? layer.reason,
        };
    });
}
function layerById(layerSummary, layerId) {
    const layer = layerSummary.find((candidate) => candidate.layer === layerId);
    if (layer) {
        return layer;
    }
    return {
        layer: layerId,
        status: unavailableStatus,
        available: false,
        reason: 'Layer summary entry is unavailable in the report model.',
    };
}
function buildSections(pipeline, layerSummary) {
    return personalSymbolicReportSectionRegistry.map((definition) => (buildSectionFromDefinition(definition, pipeline, layerSummary)));
}
function baseSection(definition, status, available, reason) {
    return {
        sectionId: definition.sectionId,
        titleKey: definition.titleKey,
        descriptionKey: definition.descriptionKey,
        layer: definition.layer,
        status,
        available,
        reason,
    };
}
function buildSectionFromDefinition(definition, pipeline, layerSummary) {
    if (definition.sectionId === identityNameMeaningSection || definition.sectionId === identityNumerologySection) {
        const layer = layerById(layerSummary, definition.layer);
        return baseSection(definition, layer.status, layer.available, layer.reason);
    }
    if (definition.sectionId === integratedOverviewSection) {
        const overviewAvailable = pipeline.pipelineStatus.isUsable;
        return baseSection(definition, overviewAvailable ? resolvedStatus : unavailableStatus, overviewAvailable, overviewAvailable
            ? 'At least one symbolic layer is available for structured overview assembly.'
            : 'No symbolic layers are available for structured overview assembly.');
    }
    if (definition.sectionId === futureAstrologySection) {
        const layer = layerById(layerSummary, definition.layer);
        return baseSection(definition, notConnectedStatus, false, layer.reason);
    }
    return baseSection(definition, resolvedStatus, definition.alwaysAvailable, definition.alwaysAvailable
        ? 'Section metadata is available as structured data.'
        : 'Section metadata is unavailable for this report model.');
}
export function buildPersonalSymbolicReportModel(input) {
    const pipeline = buildPersonalSymbolicPipeline(input);
    const debugSnapshot = buildPersonalSymbolicPipelineDebugSnapshot(input);
    const debugValidation = validatePersonalSymbolicPipelineDebugSnapshot(debugSnapshot);
    const layerSummary = compactLayerSummary(pipeline.layerSummary, debugSnapshot);
    return {
        reportId: personalSymbolicReportId,
        reportVersion: personalSymbolicReportVersion,
        originalInput: pipeline.originalInput,
        pipelineId: pipeline.pipelineId,
        contractVersion: pipeline.contractVersion,
        status: {
            readinessStatus: pipeline.pipelineStatus.readinessStatus,
            isUsable: pipeline.pipelineStatus.isUsable,
            isComplete: pipeline.pipelineStatus.isComplete,
            reason: pipeline.pipelineStatus.reason,
            debugSnapshotValid: debugValidation.isValid,
        },
        sections: buildSections(pipeline, layerSummary),
        layerSummary,
        warnings: pipeline.warnings,
        source: {
            source: 'personal_symbolic_pipeline',
            builder: 'personal_symbolic_report_model',
            deterministic: true,
            version: personalSymbolicReportVersion,
            pipeline: pipeline.source,
            debugSnapshot: debugSnapshot.source,
        },
        debug: {
            snapshot: debugSnapshot,
            validation: debugValidation,
        },
    };
}
