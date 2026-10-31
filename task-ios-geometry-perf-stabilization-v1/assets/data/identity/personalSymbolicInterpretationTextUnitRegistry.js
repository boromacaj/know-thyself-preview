import { personalSymbolicInterpretationRegistry } from './personalSymbolicInterpretationRegistry.js?v=d9f39e7';
import { isPersonalSymbolicInterpretationTextAudienceLevel, isPersonalSymbolicInterpretationTextBlockState, isPersonalSymbolicInterpretationTextSafetyLevel, isPersonalSymbolicInterpretationTextToneMode, isPersonalSymbolicInterpretationTextUnitType, } from './personalSymbolicInterpretationTextContract.js?v=d9f39e7';
export const personalSymbolicInterpretationTextUnitRegistryId = 'personal_symbolic_interpretation_text_unit_registry';
export const personalSymbolicInterpretationTextUnitRegistryVersion = '0.1.0';
const defaultAudienceLevel = 'simple';
const defaultToneMode = 'neutral';
const placeholderBlockIds = ['astrology_placeholder_summary'];
const notConnectedLimitationBlockIds = ['astrology_not_connected_limitation'];
const variablePolicy = {
    allowedKeys: [
        'blockId',
        'sourceUnitId',
        'valueKind',
        'unitType',
    ],
    requiredKeys: [
        'blockId',
        'sourceUnitId',
        'valueKind',
    ],
};
function mapTextUnitType(unitType) {
    const mappedTypes = {
        summary: 'summary_sentence',
        symbolic_theme: 'symbolic_sentence',
        archetype: 'symbolic_sentence',
        context: 'context_sentence',
        integration: 'integration_sentence',
        boundary: 'boundary_sentence',
        technical: 'technical_sentence',
    };
    return mappedTypes[unitType];
}
function mapSafetyLevel(sourceUnit) {
    if (sourceUnit.unitType === 'boundary') {
        return 'boundary';
    }
    if (sourceUnit.unitType === 'technical') {
        return 'technical';
    }
    if (sourceUnit.unitType === 'context' && placeholderBlockIds.includes(sourceUnit.blockId)) {
        return 'placeholder';
    }
    return 'safe_symbolic';
}
function mapState(sourceUnit) {
    if (placeholderBlockIds.includes(sourceUnit.blockId)) {
        return 'placeholder';
    }
    if (sourceUnit.unitType === 'boundary' || notConnectedLimitationBlockIds.includes(sourceUnit.blockId)) {
        return 'limited';
    }
    return 'ready';
}
function mapWarnings(sourceUnit) {
    if (sourceUnit.unitType === 'boundary') {
        return ['symbolic_boundary'];
    }
    if (placeholderBlockIds.includes(sourceUnit.blockId)) {
        return ['future_layer_not_connected'];
    }
    if (sourceUnit.unitType === 'technical') {
        return ['technical_context_only'];
    }
    return [];
}
function textUnitDefinition(sourceUnit) {
    const unitType = mapTextUnitType(sourceUnit.unitType);
    const safetyLevel = mapSafetyLevel(sourceUnit);
    const state = mapState(sourceUnit);
    if (!isPersonalSymbolicInterpretationTextUnitType(unitType)
        || !isPersonalSymbolicInterpretationTextSafetyLevel(safetyLevel)
        || !isPersonalSymbolicInterpretationTextAudienceLevel(defaultAudienceLevel)
        || !isPersonalSymbolicInterpretationTextToneMode(defaultToneMode)
        || !isPersonalSymbolicInterpretationTextBlockState(state)) {
        throw new Error('Invalid personal symbolic interpretation text unit registry mapping.');
    }
    return {
        textUnitId: `text_${sourceUnit.unitId}`,
        sourceUnitId: sourceUnit.unitId,
        blockId: sourceUnit.blockId,
        unitType,
        safetyLevel,
        defaultAudienceLevel,
        defaultToneMode,
        templateKey: `interpretation.text.${sourceUnit.unitId}.simple.neutral`,
        allowedValueKind: sourceUnit.requiredValueKind,
        state,
        variablePolicy,
        warnings: mapWarnings(sourceUnit),
        sortOrder: sourceUnit.sortOrder,
    };
}
export const personalSymbolicInterpretationTextUnitRegistry = personalSymbolicInterpretationRegistry.map(textUnitDefinition);
const personalSymbolicInterpretationTextUnitIds = personalSymbolicInterpretationTextUnitRegistry.map((definition) => definition.textUnitId);
export function isPersonalSymbolicInterpretationTextUnitId(value) {
    return typeof value === 'string' && personalSymbolicInterpretationTextUnitIds.includes(value);
}
export function getPersonalSymbolicInterpretationTextUnitsForSourceUnit(sourceUnitId) {
    if (typeof sourceUnitId !== 'string') {
        return [];
    }
    return personalSymbolicInterpretationTextUnitRegistry
        .filter((definition) => definition.sourceUnitId === sourceUnitId)
        .sort((left, right) => left.sortOrder - right.sortOrder);
}
export function getPersonalSymbolicInterpretationTextUnitDefinition(textUnitId) {
    if (!isPersonalSymbolicInterpretationTextUnitId(textUnitId)) {
        return null;
    }
    return personalSymbolicInterpretationTextUnitRegistry
        .find((definition) => definition.textUnitId === textUnitId)
        ?? null;
}
