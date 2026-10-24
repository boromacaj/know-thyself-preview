export const personalSymbolicInterpretationHumanLayerContractId = 'personal_symbolic_interpretation_human_layer_contract';
export const personalSymbolicInterpretationHumanLayerContractVersion = '0.1.0';
export const personalSymbolicInterpretationHumanUnitTypes = [
    'heading',
    'summary',
    'symbolic_reflection',
    'context',
    'integration',
    'boundary',
    'technical_note',
    'placeholder',
];
export const personalSymbolicInterpretationHumanSafetyLevels = [
    'safe_symbolic',
    'boundary',
    'technical',
    'placeholder',
];
export const personalSymbolicInterpretationHumanAudienceLevels = [
    'simple',
    'advanced',
];
export const personalSymbolicInterpretationHumanToneModes = [
    'neutral',
    'reflective',
    'practical',
    'technical',
];
export const personalSymbolicInterpretationHumanUnitStates = [
    'ready',
    'limited',
    'placeholder',
    'unavailable',
];
export const personalSymbolicInterpretationHumanSourceKinds = [
    'template_snapshot_unit',
    'template_snapshot_template',
    'template_snapshot_debug',
];
export const personalSymbolicInterpretationHumanClaimBoundaries = [
    'no_clinical_claim',
    'no_identity_certainty_claim',
    'no_future_certainty_claim',
    'no_relationship_match_claim',
];
function includesReadonlyValue(values, value) {
    return typeof value === 'string' && values.includes(value);
}
export function isPersonalSymbolicInterpretationHumanUnitType(value) {
    return includesReadonlyValue(personalSymbolicInterpretationHumanUnitTypes, value);
}
export function isPersonalSymbolicInterpretationHumanSafetyLevel(value) {
    return includesReadonlyValue(personalSymbolicInterpretationHumanSafetyLevels, value);
}
export function isPersonalSymbolicInterpretationHumanAudienceLevel(value) {
    return includesReadonlyValue(personalSymbolicInterpretationHumanAudienceLevels, value);
}
export function isPersonalSymbolicInterpretationHumanToneMode(value) {
    return includesReadonlyValue(personalSymbolicInterpretationHumanToneModes, value);
}
export function isPersonalSymbolicInterpretationHumanUnitState(value) {
    return includesReadonlyValue(personalSymbolicInterpretationHumanUnitStates, value);
}
export function isPersonalSymbolicInterpretationHumanSourceKind(value) {
    return includesReadonlyValue(personalSymbolicInterpretationHumanSourceKinds, value);
}
export function isPersonalSymbolicInterpretationHumanClaimBoundary(value) {
    return includesReadonlyValue(personalSymbolicInterpretationHumanClaimBoundaries, value);
}
