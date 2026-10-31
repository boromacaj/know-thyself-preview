import { buildPersonalSymbolicProfileFoundationBundle } from './personalSymbolicProfileFoundationBundle.js?v=f9ab0a6';
import { personalSymbolicLayerStatuses, personalSymbolicLayers, personalSymbolicReadinessStatuses, personalSymbolicSections, personalSymbolicWarningCategories, } from './personalSymbolicProfileContract.js?v=f9ab0a6';
const source = {
    source: 'personal_symbolic_profile_foundation_bundle',
    builder: 'personal_symbolic_synthesis_outline',
    deterministic: true,
    version: '0.1.0',
};
const layerStatusResolved = personalSymbolicLayerStatuses[0];
const layerStatusUnavailable = personalSymbolicLayerStatuses[1];
const layerStatusNotConnected = personalSymbolicLayerStatuses[2];
const readinessReadyPartial = personalSymbolicReadinessStatuses[0];
const readinessReadyNameOnly = personalSymbolicReadinessStatuses[1];
const readinessReadyNumerologyOnly = personalSymbolicReadinessStatuses[2];
const readinessNotReady = personalSymbolicReadinessStatuses[3];
const warningMissingIdentityName = personalSymbolicWarningCategories[0];
const warningMissingFullName = personalSymbolicWarningCategories[1];
const warningMissingBirthDate = personalSymbolicWarningCategories[2];
const warningInvalidBirthDate = personalSymbolicWarningCategories[3];
const warningUnsupportedNameMeaning = personalSymbolicWarningCategories[4];
const warningIdentityNumerologyUnavailable = personalSymbolicWarningCategories[5];
const warningFutureAstrologyNotConnected = personalSymbolicWarningCategories[6];
const futureAstrologyPlaceholder = {
    sectionId: personalSymbolicSections.futureAstrologyPlaceholder,
    status: layerStatusNotConnected,
    reason: 'Astrology synthesis is not connected in this outline yet.',
    calculation: null,
    interpretation: null,
};
function hasAvailableLayer(profileFoundation, layer) {
    return profileFoundation.availableLayers.some((availableLayer) => availableLayer.layer === layer);
}
function readinessFor(profileFoundation) {
    const hasNameMeaning = hasAvailableLayer(profileFoundation, personalSymbolicLayers.nameMeaning);
    const hasNumerology = hasAvailableLayer(profileFoundation, personalSymbolicLayers.identityNumerology);
    if (hasNameMeaning && hasNumerology) {
        return { status: readinessReadyPartial, availableLayers: profileFoundation.availableLayers };
    }
    if (hasNameMeaning) {
        return { status: readinessReadyNameOnly, availableLayers: profileFoundation.availableLayers };
    }
    if (hasNumerology) {
        return { status: readinessReadyNumerologyOnly, availableLayers: profileFoundation.availableLayers };
    }
    return { status: readinessNotReady, availableLayers: profileFoundation.availableLayers };
}
function integrationNotesFor(profileFoundation) {
    const hasNameMeaning = hasAvailableLayer(profileFoundation, personalSymbolicLayers.nameMeaning);
    const hasNumerology = hasAvailableLayer(profileFoundation, personalSymbolicLayers.identityNumerology);
    return [
        {
            id: 'name_meaning_layer_status',
            layer: personalSymbolicLayers.nameMeaning,
            status: hasNameMeaning ? 'available' : layerStatusUnavailable,
            note: hasNameMeaning ? 'Name meaning layer resolved.' : 'Name meaning layer unavailable.',
        },
        {
            id: 'identity_numerology_layer_status',
            layer: personalSymbolicLayers.identityNumerology,
            status: hasNumerology ? 'available' : layerStatusUnavailable,
            note: hasNumerology ? 'Identity numerology layer resolved.' : 'Identity numerology layer unavailable.',
        },
        {
            id: 'future_astrology_layer_status',
            layer: personalSymbolicLayers.futureAstrology,
            status: layerStatusNotConnected,
            note: 'Astrology synthesis is not connected in this outline yet.',
        },
    ];
}
function missingRequirementsFor(profileFoundation) {
    const requirements = [];
    if (profileFoundation.profileSections.nameMeaning.nameMeaningOutline.status === 'unsupported') {
        const hasMissingName = profileFoundation.profileSections.nameMeaning.selectedNameForMeaning === '';
        requirements.push({
            layer: personalSymbolicLayers.nameMeaning,
            code: hasMissingName ? warningMissingIdentityName : warningUnsupportedNameMeaning,
            reason: hasMissingName
                ? 'A selected name is required for deterministic name meaning lookup.'
                : 'The selected name does not have a deterministic name meaning outline.',
        });
    }
    for (const warning of profileFoundation.identityNumerologyFoundation.warnings) {
        if (warning.code === warningMissingFullName
            || warning.code === warningMissingBirthDate
            || warning.code === warningInvalidBirthDate) {
            requirements.push({
                layer: personalSymbolicLayers.identityNumerology,
                code: warning.code,
                reason: warning.message,
            });
        }
    }
    if (!hasAvailableLayer(profileFoundation, personalSymbolicLayers.identityNumerology)) {
        requirements.push({
            layer: personalSymbolicLayers.identityNumerology,
            code: warningIdentityNumerologyUnavailable,
            reason: 'At least one deterministic identity numerology signal is required for the numerology outline section.',
        });
    }
    requirements.push({
        layer: personalSymbolicLayers.futureAstrology,
        code: warningFutureAstrologyNotConnected,
        reason: futureAstrologyPlaceholder.reason,
    });
    return requirements;
}
export function buildPersonalSymbolicSynthesisOutline(input) {
    const profileFoundation = buildPersonalSymbolicProfileFoundationBundle(input);
    const nameMeaning = profileFoundation.profileSections.nameMeaning;
    const numerology = profileFoundation.profileSections.numerology;
    const nameMeaningResolved = nameMeaning.nameMeaningOutline.status === layerStatusResolved;
    const numerologyResolved = hasAvailableLayer(profileFoundation, personalSymbolicLayers.identityNumerology);
    return {
        originalInput: { ...input },
        profileFoundation,
        outlineSections: {
            identityNameMeaning: {
                sectionId: personalSymbolicSections.identityNameMeaning,
                status: nameMeaningResolved ? layerStatusResolved : layerStatusUnavailable,
                selectedNameForMeaning: nameMeaning.selectedNameForMeaning,
                nameMeaningOutlineStatus: nameMeaning.nameMeaningOutline.status,
                symbolicThemes: nameMeaningResolved ? nameMeaning.nameMeaningOutline.symbolicThemes : [],
                nameMeaningOutline: nameMeaning.nameMeaningOutline,
                warnings: nameMeaning.warnings,
            },
            identityNumerology: {
                sectionId: personalSymbolicSections.identityNumerology,
                status: numerologyResolved ? layerStatusResolved : layerStatusUnavailable,
                normalizedNameForNumerology: numerology.normalizedNameForNumerology,
                birthDate: numerology.birthDate,
                calculatedSignals: numerology.calculatedSignals,
                interpretationReferences: numerology.interpretationReferences,
                unavailableSignals: numerology.unavailableSignals,
                warnings: numerology.warnings,
            },
            integrationNotes: integrationNotesFor(profileFoundation),
            futureAstrologyPlaceholder,
        },
        synthesisReadiness: readinessFor(profileFoundation),
        missingRequirements: missingRequirementsFor(profileFoundation),
        warnings: profileFoundation.warnings,
        source,
    };
}
