import { personalSymbolicInterpretationTextUnitRegistry, } from './personalSymbolicInterpretationTextUnitRegistry.js?v=d9f39e7';
export const personalSymbolicInterpretationTemplateRegistryId = 'personal_symbolic_interpretation_template_registry';
export const personalSymbolicInterpretationTemplateRegistryVersion = '0.1.0';
function templateDefinition(textUnitDefinition) {
    return {
        templateKey: textUnitDefinition.templateKey,
        sourceUnitId: textUnitDefinition.sourceUnitId,
        textUnitId: textUnitDefinition.textUnitId,
        audienceLevel: textUnitDefinition.defaultAudienceLevel,
        toneMode: textUnitDefinition.defaultToneMode,
        allowedVariables: [...textUnitDefinition.variablePolicy.allowedKeys],
        requiredVariables: [...textUnitDefinition.variablePolicy.requiredKeys],
        safetyLevel: textUnitDefinition.safetyLevel,
        templateState: 'defined',
        templateText: null,
        warnings: [...textUnitDefinition.warnings],
        sortOrder: textUnitDefinition.sortOrder,
    };
}
export const personalSymbolicInterpretationTemplateRegistry = personalSymbolicInterpretationTextUnitRegistry.map(templateDefinition);
const personalSymbolicInterpretationTemplateKeys = personalSymbolicInterpretationTemplateRegistry.map((definition) => definition.templateKey);
export function isPersonalSymbolicInterpretationTemplateKey(value) {
    return typeof value === 'string' && personalSymbolicInterpretationTemplateKeys.includes(value);
}
export function getPersonalSymbolicInterpretationTemplateDefinition(templateKey) {
    if (!isPersonalSymbolicInterpretationTemplateKey(templateKey)) {
        return null;
    }
    return personalSymbolicInterpretationTemplateRegistry.find((definition) => definition.templateKey === templateKey) ?? null;
}
export function getPersonalSymbolicInterpretationTemplatesForTextUnit(textUnitId) {
    if (typeof textUnitId !== 'string') {
        return [];
    }
    return personalSymbolicInterpretationTemplateRegistry
        .filter((definition) => definition.textUnitId === textUnitId)
        .sort((left, right) => left.sortOrder - right.sortOrder);
}
