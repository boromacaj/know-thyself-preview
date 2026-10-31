import { buildNameMeaningSynthesisOutline } from '../names/nameMeaningSynthesisOutline.js?v=f9ab0a6';
const source = {
    source: 'personal_identity_input',
    builder: 'personal_identity_foundation_bundle',
    deterministic: true,
    version: '0.1.0',
};
function firstNameFromFullName(fullName) {
    return fullName.trim().split(/\s+/).filter(Boolean)[0] ?? '';
}
function selectNameForMeaning(input) {
    const preferredName = input.preferredName?.trim();
    if (preferredName) {
        return preferredName;
    }
    return firstNameFromFullName(input.fullName);
}
function collectWarnings(selectedNameForMeaning, nameMeaningOutline) {
    const warnings = [];
    if (!selectedNameForMeaning) {
        warnings.push({
            code: 'missing_identity_name',
            message: 'No preferred name or first name is available for deterministic name meaning lookup.',
        });
    }
    if (nameMeaningOutline.status === 'unsupported') {
        warnings.push({
            code: 'unsupported_name_meaning_outline',
            message: 'No deterministic name meaning outline is currently available for the selected name.',
        });
    }
    return warnings;
}
export function buildPersonalIdentityFoundationBundle(input) {
    const originalInput = { ...input };
    const selectedNameForMeaning = selectNameForMeaning(input);
    const nameMeaningOutline = buildNameMeaningSynthesisOutline(selectedNameForMeaning);
    return {
        originalInput,
        selectedNameForMeaning,
        nameMeaningOutline,
        warnings: collectWarnings(selectedNameForMeaning, nameMeaningOutline),
        source,
    };
}
