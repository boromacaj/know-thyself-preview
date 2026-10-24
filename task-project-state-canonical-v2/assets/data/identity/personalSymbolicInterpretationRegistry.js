export const personalSymbolicInterpretationUnitTypes = [
    'summary',
    'symbolic_theme',
    'archetype',
    'context',
    'integration',
    'boundary',
    'technical',
];
function interpretationUnitDefinition(unitId, blockId, unitType, requiredValueKind, sortOrder) {
    return {
        unitId,
        blockId,
        unitType,
        titleKey: `interpretation.${unitId}.title`,
        descriptionKey: `interpretation.${unitId}.description`,
        requiredValueKind,
        sortOrder,
    };
}
export const personalSymbolicInterpretationRegistry = [
    interpretationUnitDefinition('name_meaning_core_summary', 'name_meaning_summary', 'summary', 'name_meaning_summary', 1),
    interpretationUnitDefinition('name_symbolic_theme', 'name_meaning_summary', 'symbolic_theme', 'name_meaning_summary', 2),
    interpretationUnitDefinition('name_cultural_context', 'name_meaning_summary', 'context', 'name_meaning_summary', 3),
    interpretationUnitDefinition('name_archetype_seed', 'name_meaning_summary', 'archetype', 'name_meaning_summary', 4),
    interpretationUnitDefinition('name_origin_context', 'name_origin_reference', 'context', 'name_origin_reference', 5),
    interpretationUnitDefinition('name_meaning_boundary', 'name_meaning_limitations', 'boundary', 'limitations', 6),
    interpretationUnitDefinition('numerology_core_summary', 'numerology_core_numbers_summary', 'summary', 'numerology_core_numbers_summary', 7),
    interpretationUnitDefinition('numerology_number_themes', 'numerology_core_numbers_summary', 'symbolic_theme', 'numerology_core_numbers_summary', 8),
    interpretationUnitDefinition('numerology_calculation_context', 'numerology_core_numbers_summary', 'context', 'numerology_core_numbers_summary', 9),
    interpretationUnitDefinition('numerology_cycle_context', 'numerology_cycle_reference', 'context', 'numerology_cycle_reference', 10),
    interpretationUnitDefinition('numerology_boundary', 'numerology_limitations', 'boundary', 'limitations', 11),
    interpretationUnitDefinition('available_layers_summary', 'integrated_available_layers_summary', 'summary', 'available_layers_summary', 12),
    interpretationUnitDefinition('layer_status_context', 'integrated_available_layers_summary', 'context', 'available_layers_summary', 13),
    interpretationUnitDefinition('integration_readiness_summary', 'integrated_cross_layer_notes', 'summary', 'integration_notes', 14),
    interpretationUnitDefinition('cross_layer_integration_seed', 'integrated_cross_layer_notes', 'integration', 'integration_notes', 15),
    interpretationUnitDefinition('integration_boundary', 'integrated_limitations', 'boundary', 'limitations', 16),
    interpretationUnitDefinition('astrology_placeholder_context', 'astrology_placeholder_summary', 'context', 'placeholder', 17),
    interpretationUnitDefinition('astrology_boundary', 'astrology_not_connected_limitation', 'boundary', 'limitations', 18),
    interpretationUnitDefinition('missing_inputs_context', 'missing_inputs_summary', 'context', 'warnings_summary', 19),
    interpretationUnitDefinition('calculation_boundary', 'calculation_limitations_summary', 'boundary', 'warnings_summary', 20),
    interpretationUnitDefinition('interpretation_safety_boundary', 'interpretation_boundaries_summary', 'boundary', 'boundaries', 21),
    interpretationUnitDefinition('source_metadata_context', 'source_metadata_summary', 'technical', 'source_metadata', 22),
    interpretationUnitDefinition('debug_validation_context', 'debug_validation_summary', 'technical', 'debug_validation', 23),
    interpretationUnitDefinition('deterministic_pipeline_context', 'deterministic_pipeline_summary', 'technical', 'deterministic_pipeline', 24),
];
const personalSymbolicInterpretationUnitIds = personalSymbolicInterpretationRegistry.map((unit) => unit.unitId);
export function isPersonalSymbolicInterpretationUnitType(value) {
    return (typeof value === 'string'
        && personalSymbolicInterpretationUnitTypes.includes(value));
}
export function isPersonalSymbolicInterpretationUnitId(value) {
    return typeof value === 'string' && personalSymbolicInterpretationUnitIds.includes(value);
}
export function getPersonalSymbolicInterpretationUnitsForBlock(blockId) {
    if (typeof blockId !== 'string') {
        return [];
    }
    return personalSymbolicInterpretationRegistry
        .filter((unit) => unit.blockId === blockId)
        .sort((left, right) => left.sortOrder - right.sortOrder);
}
export function getPersonalSymbolicInterpretationUnitDefinition(unitId) {
    if (!isPersonalSymbolicInterpretationUnitId(unitId)) {
        return null;
    }
    return personalSymbolicInterpretationRegistry.find((unit) => unit.unitId === unitId) ?? null;
}
