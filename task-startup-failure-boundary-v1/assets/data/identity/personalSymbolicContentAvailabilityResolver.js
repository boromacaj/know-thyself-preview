import { personalSymbolicContentRegistry } from './personalSymbolicContentRegistry.js?v=2ea79e9';
export const personalSymbolicContentAvailabilityStatuses = [
    'available',
    'unavailable',
    'placeholder',
    'not_connected',
];
function resolvedBlock(blockDefinition, status, available, reason) {
    return {
        blockId: blockDefinition.blockId,
        sectionId: blockDefinition.sectionId,
        blockType: blockDefinition.blockType,
        requiredLayer: blockDefinition.requiredLayer,
        availableWhen: blockDefinition.availableWhen,
        status,
        available,
        reason,
        sortOrder: blockDefinition.sortOrder,
    };
}
function layerSummaryFor(reportModel, blockDefinition) {
    if (blockDefinition.requiredLayer === 'system') {
        return undefined;
    }
    return reportModel.layerSummary.find((layer) => layer.layer === blockDefinition.requiredLayer);
}
export function resolvePersonalSymbolicContentBlockAvailability(blockDefinition, reportModel) {
    if (blockDefinition.availableWhen === 'always') {
        return resolvedBlock(blockDefinition, 'available', true, 'Content block is always available as structured metadata.');
    }
    if (blockDefinition.availableWhen === 'report_usable') {
        return reportModel.status.isUsable
            ? resolvedBlock(blockDefinition, 'available', true, 'Report is usable for this structured content block.')
            : resolvedBlock(blockDefinition, 'unavailable', false, 'Report is not usable for this structured content block.');
    }
    if (blockDefinition.requiredLayer === 'system') {
        return resolvedBlock(blockDefinition, 'available', true, 'Content block is always available as structured metadata.');
    }
    const layerSummary = layerSummaryFor(reportModel, blockDefinition);
    if (!layerSummary) {
        return resolvedBlock(blockDefinition, 'unavailable', false, 'Required symbolic layer summary is missing.');
    }
    if (blockDefinition.availableWhen === 'layer_available') {
        return layerSummary.available
            ? resolvedBlock(blockDefinition, 'available', true, 'Required symbolic layer is available.')
            : resolvedBlock(blockDefinition, 'unavailable', false, 'Required symbolic layer is unavailable.');
    }
    if (layerSummary.status === 'not_connected') {
        return resolvedBlock(blockDefinition, 'not_connected', false, 'Required symbolic layer is not connected yet.');
    }
    if (layerSummary.available) {
        return resolvedBlock(blockDefinition, 'available', true, 'Required symbolic layer is available.');
    }
    return resolvedBlock(blockDefinition, 'placeholder', false, 'Content block is a placeholder for a currently unavailable symbolic layer.');
}
export function resolvePersonalSymbolicContentAvailability(reportModel) {
    return {
        reportId: reportModel.reportId,
        reportVersion: reportModel.reportVersion,
        readinessStatus: reportModel.status.readinessStatus,
        isUsable: reportModel.status.isUsable,
        blocks: [...personalSymbolicContentRegistry]
            .sort((left, right) => left.sortOrder - right.sortOrder)
            .map((blockDefinition) => resolvePersonalSymbolicContentBlockAvailability(blockDefinition, reportModel)),
    };
}
