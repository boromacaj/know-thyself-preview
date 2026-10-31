import { isPersonalSymbolicLayerId, personalSymbolicLayers } from './personalSymbolicProfileContract.js';
import { isPersonalSymbolicReportSectionId, personalSymbolicReportSectionIds } from './personalSymbolicReportSectionRegistry.js';
export const personalSymbolicContentBlockTypes = [
    'data_summary',
    'symbolic_reference',
    'integration_note',
    'limitation',
    'technical_metadata',
    'placeholder',
];
function contentBlockDefinition(blockId, sectionId, blockType, requiredLayer, availableWhen, sortOrder) {
    return {
        blockId,
        sectionId,
        blockType,
        titleKey: `report.content.${blockId}.title`,
        descriptionKey: `report.content.${blockId}.description`,
        requiredLayer,
        availableWhen,
        sortOrder,
    };
}
export const personalSymbolicContentRegistry = [
    contentBlockDefinition('name_meaning_summary', personalSymbolicReportSectionIds[0], 'data_summary', personalSymbolicLayers.nameMeaning, 'layer_available', 1),
    contentBlockDefinition('name_origin_reference', personalSymbolicReportSectionIds[0], 'symbolic_reference', personalSymbolicLayers.nameMeaning, 'layer_available', 2),
    contentBlockDefinition('name_meaning_limitations', personalSymbolicReportSectionIds[0], 'limitation', personalSymbolicLayers.nameMeaning, 'always', 3),
    contentBlockDefinition('numerology_core_numbers_summary', personalSymbolicReportSectionIds[1], 'data_summary', personalSymbolicLayers.identityNumerology, 'layer_available', 4),
    contentBlockDefinition('numerology_cycle_reference', personalSymbolicReportSectionIds[1], 'symbolic_reference', personalSymbolicLayers.identityNumerology, 'layer_available', 5),
    contentBlockDefinition('numerology_limitations', personalSymbolicReportSectionIds[1], 'limitation', personalSymbolicLayers.identityNumerology, 'always', 6),
    contentBlockDefinition('integrated_available_layers_summary', personalSymbolicReportSectionIds[2], 'data_summary', 'system', 'report_usable', 7),
    contentBlockDefinition('integrated_cross_layer_notes', personalSymbolicReportSectionIds[2], 'integration_note', 'system', 'report_usable', 8),
    contentBlockDefinition('integrated_limitations', personalSymbolicReportSectionIds[2], 'limitation', 'system', 'always', 9),
    contentBlockDefinition('astrology_placeholder_summary', personalSymbolicReportSectionIds[3], 'placeholder', personalSymbolicLayers.futureAstrology, 'layer_not_connected', 10),
    contentBlockDefinition('astrology_not_connected_limitation', personalSymbolicReportSectionIds[3], 'limitation', personalSymbolicLayers.futureAstrology, 'layer_not_connected', 11),
    contentBlockDefinition('missing_inputs_summary', personalSymbolicReportSectionIds[4], 'limitation', 'system', 'always', 12),
    contentBlockDefinition('calculation_limitations_summary', personalSymbolicReportSectionIds[4], 'limitation', 'system', 'always', 13),
    contentBlockDefinition('interpretation_boundaries_summary', personalSymbolicReportSectionIds[4], 'limitation', 'system', 'always', 14),
    contentBlockDefinition('source_metadata_summary', personalSymbolicReportSectionIds[5], 'technical_metadata', 'system', 'always', 15),
    contentBlockDefinition('debug_validation_summary', personalSymbolicReportSectionIds[5], 'technical_metadata', 'system', 'always', 16),
    contentBlockDefinition('deterministic_pipeline_summary', personalSymbolicReportSectionIds[5], 'technical_metadata', 'system', 'always', 17),
];
const personalSymbolicContentBlockIds = personalSymbolicContentRegistry.map((block) => block.blockId);
export function isPersonalSymbolicContentBlockType(value) {
    return typeof value === 'string' && personalSymbolicContentBlockTypes.includes(value);
}
export function isPersonalSymbolicContentBlockId(value) {
    return typeof value === 'string' && personalSymbolicContentBlockIds.includes(value);
}
export function getPersonalSymbolicContentBlocksForSection(sectionId) {
    if (!isPersonalSymbolicReportSectionId(sectionId)) {
        return [];
    }
    return personalSymbolicContentRegistry
        .filter((block) => block.sectionId === sectionId)
        .sort((left, right) => left.sortOrder - right.sortOrder);
}
export function getPersonalSymbolicContentBlockDefinition(blockId) {
    if (!isPersonalSymbolicContentBlockId(blockId)) {
        return null;
    }
    return personalSymbolicContentRegistry.find((block) => block.blockId === blockId) ?? null;
}
export function isPersonalSymbolicContentRequiredLayer(value) {
    return value === 'system' || isPersonalSymbolicLayerId(value);
}
