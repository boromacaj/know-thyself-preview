import { buildPersonalIdentityFoundationBundle } from './personalIdentityFoundationBundle.js?v=2ea79e9';
import { buildIdentityNumerologyFoundationBundle } from './identityNumerologyFoundationBundle.js?v=2ea79e9';
import { personalSymbolicLayerStatuses, personalSymbolicLayers, personalSymbolicSections, personalSymbolicWarningCategories, } from './personalSymbolicProfileContract.js?v=2ea79e9';
const source = {
    source: 'personal_symbolic_profile_input',
    builder: 'personal_symbolic_profile_foundation_bundle',
    deterministic: true,
    version: '0.1.0',
    integratedLayers: ['personal_identity_foundation_bundle', 'identity_numerology_foundation_bundle'],
};
const layerStatusNotConnected = personalSymbolicLayerStatuses[2];
const warningMissingIdentityName = personalSymbolicWarningCategories[0];
const warningUnsupportedNameMeaning = personalSymbolicWarningCategories[4];
const warningFutureAstrologyNotConnected = personalSymbolicWarningCategories[6];
const futureAstrologyPlaceholder = {
    sectionId: personalSymbolicSections.futureAstrologyPlaceholder,
    status: layerStatusNotConnected,
    reason: 'Astrology profile integration is not part of this foundation bundle yet.',
    calculation: null,
    interpretation: null,
};
function hasAnyCalculatedNumerologySignal(bundle) {
    return Object.values(bundle.calculatedSignals).some((signal) => signal !== null);
}
function availableLayersFor(identityFoundation, identityNumerologyFoundation) {
    const availableLayers = [];
    if (identityFoundation.nameMeaningOutline.status === 'resolved') {
        availableLayers.push({
            layer: personalSymbolicLayers.nameMeaning,
            reason: 'A deterministic name meaning outline resolved for the selected name.',
        });
    }
    if (hasAnyCalculatedNumerologySignal(identityNumerologyFoundation)) {
        availableLayers.push({
            layer: personalSymbolicLayers.identityNumerology,
            reason: 'At least one deterministic identity numerology signal was calculated.',
        });
    }
    return availableLayers;
}
function unavailableLayersFor(identityFoundation, identityNumerologyFoundation) {
    const unavailableLayers = [];
    if (identityFoundation.nameMeaningOutline.status === 'unsupported') {
        unavailableLayers.push({
            layer: personalSymbolicLayers.nameMeaning,
            reason: 'No deterministic name meaning outline resolved for the selected name.',
        });
    }
    if (!hasAnyCalculatedNumerologySignal(identityNumerologyFoundation)) {
        unavailableLayers.push({
            layer: personalSymbolicLayers.identityNumerology,
            reason: 'No deterministic identity numerology signals are currently available for this input.',
        });
    }
    unavailableLayers.push({
        layer: personalSymbolicLayers.futureAstrology,
        reason: futureAstrologyPlaceholder.reason,
    });
    return unavailableLayers;
}
function warningsFor(identityFoundation, identityNumerologyFoundation) {
    const identityWarnings = identityFoundation.warnings.map((warning) => ({
        code: warning.code === warningMissingIdentityName ? warningMissingIdentityName : warningUnsupportedNameMeaning,
        message: warning.message,
        sourceLayer: personalSymbolicLayers.nameMeaning,
    }));
    const numerologyWarnings = identityNumerologyFoundation.warnings.map((warning) => ({
        code: warning.code,
        message: warning.message,
        sourceLayer: personalSymbolicLayers.identityNumerology,
    }));
    return [
        ...identityWarnings,
        ...numerologyWarnings,
        {
            code: warningFutureAstrologyNotConnected,
            message: futureAstrologyPlaceholder.reason,
            sourceLayer: personalSymbolicLayers.futureAstrology,
        },
    ];
}
export function buildPersonalSymbolicProfileFoundationBundle(input) {
    const originalInput = { ...input };
    const identityInput = { ...input };
    const numerologyInput = {
        fullName: input.fullName,
        birthDate: input.birthDate,
        locale: input.locale,
    };
    const identityFoundation = buildPersonalIdentityFoundationBundle(identityInput);
    const identityNumerologyFoundation = buildIdentityNumerologyFoundationBundle(numerologyInput);
    return {
        originalInput,
        identityFoundation,
        identityNumerologyFoundation,
        profileSections: {
            nameMeaning: {
                sectionId: 'nameMeaning',
                selectedNameForMeaning: identityFoundation.selectedNameForMeaning,
                nameMeaningOutline: identityFoundation.nameMeaningOutline,
                warnings: identityFoundation.warnings,
            },
            numerology: {
                sectionId: 'numerology',
                normalizedNameForNumerology: identityNumerologyFoundation.normalizedNameForNumerology,
                birthDate: identityNumerologyFoundation.birthDate,
                calculatedSignals: identityNumerologyFoundation.calculatedSignals,
                interpretationReferences: identityNumerologyFoundation.interpretationReferences,
                unavailableSignals: identityNumerologyFoundation.unavailableSignals,
                warnings: identityNumerologyFoundation.warnings,
            },
            futureAstrologyPlaceholder,
        },
        availableLayers: availableLayersFor(identityFoundation, identityNumerologyFoundation),
        unavailableLayers: unavailableLayersFor(identityFoundation, identityNumerologyFoundation),
        warnings: warningsFor(identityFoundation, identityNumerologyFoundation),
        source,
    };
}
