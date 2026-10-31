export const personalSymbolicContractVersion = '0.1.0';
export const personalSymbolicPipelineId = 'personal_symbolic_profile_pipeline';
export const personalSymbolicLayers = {
    nameMeaning: 'name_meaning',
    identityNumerology: 'identity_numerology',
    futureAstrology: 'future_astrology',
};
export const personalSymbolicLayerIds = [
    personalSymbolicLayers.nameMeaning,
    personalSymbolicLayers.identityNumerology,
    personalSymbolicLayers.futureAstrology,
];
export const personalSymbolicSections = {
    identityNameMeaning: 'identityNameMeaning',
    identityNumerology: 'identityNumerology',
    integrationNotes: 'integrationNotes',
    futureAstrologyPlaceholder: 'futureAstrologyPlaceholder',
};
export const personalSymbolicSectionIds = [
    personalSymbolicSections.identityNameMeaning,
    personalSymbolicSections.identityNumerology,
    personalSymbolicSections.integrationNotes,
    personalSymbolicSections.futureAstrologyPlaceholder,
];
export const personalSymbolicReadinessStatuses = [
    'ready_partial',
    'ready_name_only',
    'ready_numerology_only',
    'not_ready',
];
export const personalSymbolicLayerStatuses = [
    'resolved',
    'unavailable',
    'not_connected',
];
export const personalSymbolicWarningCategories = [
    'missing_identity_name',
    'missing_full_name',
    'missing_birth_date',
    'invalid_birth_date',
    'unsupported_name_meaning',
    'identity_numerology_unavailable',
    'future_astrology_not_connected',
    'calculation_unavailable',
    'interpretation_unavailable',
];
function includesReadonlyValue(values, value) {
    return typeof value === 'string' && values.includes(value);
}
export function isPersonalSymbolicLayerId(value) {
    return includesReadonlyValue(personalSymbolicLayerIds, value);
}
export function isPersonalSymbolicSectionId(value) {
    return includesReadonlyValue(personalSymbolicSectionIds, value);
}
export function isPersonalSymbolicReadinessStatus(value) {
    return includesReadonlyValue(personalSymbolicReadinessStatuses, value);
}
export function isPersonalSymbolicLayerStatus(value) {
    return includesReadonlyValue(personalSymbolicLayerStatuses, value);
}
export function isPersonalSymbolicWarningCategory(value) {
    return includesReadonlyValue(personalSymbolicWarningCategories, value);
}
