export const personalSymbolicInterpretationTextContractId = 'personal_symbolic_interpretation_text_contract';
export const personalSymbolicInterpretationTextContractVersion = '0.1.0';
export const personalSymbolicInterpretationTextUnitTypes = [
    'heading',
    'summary_sentence',
    'symbolic_sentence',
    'context_sentence',
    'integration_sentence',
    'boundary_sentence',
    'technical_sentence',
    'placeholder_sentence',
];
export const personalSymbolicInterpretationTextSafetyLevels = [
    'safe_symbolic',
    'boundary',
    'technical',
    'placeholder',
];
export const personalSymbolicInterpretationTextAudienceLevels = [
    'simple',
    'advanced',
];
export const personalSymbolicInterpretationTextToneModes = [
    'neutral',
    'reflective',
    'practical',
    'technical',
];
export const personalSymbolicInterpretationTextBlockStates = [
    'ready',
    'limited',
    'placeholder',
    'unavailable',
];
export const personalSymbolicInterpretationTextGeneratedByValues = [
    'personal_symbolic_interpretation_text_contract',
    'personal_symbolic_interpretation_text_model_builder',
];
function includesReadonlyValue(values, value) {
    return typeof value === 'string' && values.includes(value);
}
export function isPersonalSymbolicInterpretationTextUnitType(value) {
    return includesReadonlyValue(personalSymbolicInterpretationTextUnitTypes, value);
}
export function isPersonalSymbolicInterpretationTextSafetyLevel(value) {
    return includesReadonlyValue(personalSymbolicInterpretationTextSafetyLevels, value);
}
export function isPersonalSymbolicInterpretationTextAudienceLevel(value) {
    return includesReadonlyValue(personalSymbolicInterpretationTextAudienceLevels, value);
}
export function isPersonalSymbolicInterpretationTextToneMode(value) {
    return includesReadonlyValue(personalSymbolicInterpretationTextToneModes, value);
}
export function isPersonalSymbolicInterpretationTextBlockState(value) {
    return includesReadonlyValue(personalSymbolicInterpretationTextBlockStates, value);
}
export function isPersonalSymbolicInterpretationTextGeneratedBy(value) {
    return includesReadonlyValue(personalSymbolicInterpretationTextGeneratedByValues, value);
}
