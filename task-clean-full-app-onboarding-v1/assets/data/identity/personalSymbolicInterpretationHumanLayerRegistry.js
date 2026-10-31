import { getPersonalSymbolicContentBlockDefinition } from './personalSymbolicContentRegistry.js?v=f9ab0a6';
import { isPersonalSymbolicInterpretationHumanAudienceLevel, isPersonalSymbolicInterpretationHumanSafetyLevel, isPersonalSymbolicInterpretationHumanToneMode, isPersonalSymbolicInterpretationHumanUnitState, isPersonalSymbolicInterpretationHumanUnitType, } from './personalSymbolicInterpretationHumanLayerContract.js?v=f9ab0a6';
import { personalSymbolicInterpretationTextUnitRegistry } from './personalSymbolicInterpretationTextUnitRegistry.js?v=f9ab0a6';
export const personalSymbolicInterpretationHumanLayerRegistryId = 'personal_symbolic_interpretation_human_layer_registry';
export const personalSymbolicInterpretationHumanLayerRegistryVersion = '0.1.0';
function mapHumanUnitType(textUnitType) {
    const mappedTypes = {
        heading: 'heading',
        summary_sentence: 'summary',
        symbolic_sentence: 'symbolic_reflection',
        context_sentence: 'context',
        integration_sentence: 'integration',
        boundary_sentence: 'boundary',
        technical_sentence: 'technical_note',
        placeholder_sentence: 'placeholder',
    };
    return mappedTypes[textUnitType];
}
function mapRenderingMode(textUnitType) {
    return textUnitType === 'heading' ? 'heading' : 'sentence';
}
function mapContentState(state) {
    if (state === 'placeholder' || state === 'unavailable' || state === 'limited') {
        return state;
    }
    return 'ready';
}
function copyVariablePolicy(variablePolicy) {
    return {
        allowedKeys: [...variablePolicy.allowedKeys],
        requiredKeys: [...variablePolicy.requiredKeys],
    };
}
function dedupeWarnings(warnings) {
    return [...new Set(warnings)];
}
function mapWarnings(textDefinition, contentState) {
    const warnings = [
        ...textDefinition.warnings,
        'human_layer_text_not_generated',
    ];
    if (contentState === 'placeholder') {
        warnings.push('future_layer_not_connected');
    }
    return dedupeWarnings(warnings);
}
function humanLayerDefinition(textDefinition) {
    const contentBlockDefinition = getPersonalSymbolicContentBlockDefinition(textDefinition.blockId);
    if (contentBlockDefinition === null) {
        throw new Error('Invalid personal symbolic interpretation human layer block mapping.');
    }
    const humanUnitType = mapHumanUnitType(textDefinition.unitType);
    const contentState = mapContentState(textDefinition.state);
    const renderingMode = mapRenderingMode(textDefinition.unitType);
    if (!isPersonalSymbolicInterpretationHumanUnitType(humanUnitType)
        || !isPersonalSymbolicInterpretationHumanAudienceLevel(textDefinition.defaultAudienceLevel)
        || !isPersonalSymbolicInterpretationHumanToneMode(textDefinition.defaultToneMode)
        || !isPersonalSymbolicInterpretationHumanSafetyLevel(textDefinition.safetyLevel)
        || !isPersonalSymbolicInterpretationHumanUnitState(contentState)) {
        throw new Error('Invalid personal symbolic interpretation human layer registry mapping.');
    }
    return {
        humanUnitId: `human_${textDefinition.sourceUnitId}`,
        sourceTextUnitId: textDefinition.textUnitId,
        sourceUnitId: textDefinition.sourceUnitId,
        blockId: textDefinition.blockId,
        sectionId: contentBlockDefinition.sectionId,
        humanUnitType,
        audienceLevel: textDefinition.defaultAudienceLevel,
        toneMode: textDefinition.defaultToneMode,
        safetyLevel: textDefinition.safetyLevel,
        renderingMode,
        templateKey: textDefinition.templateKey,
        contentState,
        variablePolicy: copyVariablePolicy(textDefinition.variablePolicy),
        warnings: mapWarnings(textDefinition, contentState),
        sortOrder: textDefinition.sortOrder,
    };
}
export const personalSymbolicInterpretationHumanLayerRegistry = personalSymbolicInterpretationTextUnitRegistry.map(humanLayerDefinition);
const personalSymbolicInterpretationHumanLayerUnitIds = personalSymbolicInterpretationHumanLayerRegistry.map((definition) => definition.humanUnitId);
export function isPersonalSymbolicInterpretationHumanLayerUnitId(value) {
    return typeof value === 'string' && personalSymbolicInterpretationHumanLayerUnitIds.includes(value);
}
export function getPersonalSymbolicInterpretationHumanLayerUnitDefinition(humanUnitId) {
    if (!isPersonalSymbolicInterpretationHumanLayerUnitId(humanUnitId)) {
        return null;
    }
    return personalSymbolicInterpretationHumanLayerRegistry
        .find((definition) => definition.humanUnitId === humanUnitId)
        ?? null;
}
export function getPersonalSymbolicInterpretationHumanLayerUnitsForBlock(blockId) {
    if (typeof blockId !== 'string') {
        return [];
    }
    return personalSymbolicInterpretationHumanLayerRegistry
        .filter((definition) => definition.blockId === blockId)
        .sort((left, right) => left.sortOrder - right.sortOrder);
}
export function getPersonalSymbolicInterpretationHumanLayerUnitsForSection(sectionId) {
    if (typeof sectionId !== 'string') {
        return [];
    }
    return personalSymbolicInterpretationHumanLayerRegistry
        .filter((definition) => definition.sectionId === sectionId)
        .sort((left, right) => left.sortOrder - right.sortOrder);
}
