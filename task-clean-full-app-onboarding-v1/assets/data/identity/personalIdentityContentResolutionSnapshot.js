import { personalNameMeaningAdaptedHumanUnitIds, personalNameMeaningContentAdapterId, personalNameMeaningContentAdapterVersion, resolvePersonalNameMeaningAdaptedText, } from './personalNameMeaningContentAdapter.js?v=f9ab0a6';
import { personalNameMeaningContentLayerId, personalNameMeaningContentLayerVersion, } from './personalNameMeaningContentLayer.js?v=f9ab0a6';
import { listAvailablePersonalIdentityContentModules, listPersonalIdentityContentModulesByKind, } from './personalIdentityContentModulesRegistry.js?v=f9ab0a6';
import { personalNumerologyMeaningAdaptedHumanUnitIds, personalNumerologyMeaningContentAdapterId, personalNumerologyMeaningContentAdapterVersion, resolvePersonalNumerologyMeaningAdaptedText, } from './personalNumerologyMeaningContentAdapter.js?v=f9ab0a6';
import { personalNumerologyMeaningContentLayerId, personalNumerologyMeaningContentLayerVersion, } from './personalNumerologyMeaningContentLayer.js?v=f9ab0a6';
export const personalIdentityContentResolutionSnapshotId = 'personal_identity_content_resolution_snapshot';
export const personalIdentityContentResolutionSnapshotVersion = '0.1.0';
export const personalIdentityContentResolutionSnapshotDomainIds = [
    'name_meaning',
    'numerology_meaning',
];
export const personalIdentityContentResolutionSnapshotModuleStatuses = [
    'adapted',
    'fallback_adapted',
    'unavailable',
];
function isRecord(value) {
    return typeof value === 'object' && value !== null;
}
function nestedValue(input, path) {
    let current = input;
    for (const key of path) {
        if (!isRecord(current)) {
            return undefined;
        }
        current = current[key];
    }
    return current;
}
function firstGivenNameFromValue(value) {
    if (Array.isArray(value)) {
        for (const item of value) {
            const name = firstGivenNameFromValue(item);
            if (name !== null) {
                return name;
            }
        }
        return null;
    }
    if (typeof value !== 'string') {
        return null;
    }
    const trimmed = value.trim();
    if (trimmed.length === 0) {
        return null;
    }
    return trimmed.split(/\s+/)[0] ?? trimmed;
}
function extractNameForResolution(input) {
    const candidatePaths = [
        ['birthName', 'givenNames'],
        ['identity', 'birthName', 'givenNames'],
        ['givenNames'],
        ['preferredName'],
        ['name'],
        ['fullName'],
    ];
    for (const path of candidatePaths) {
        const candidate = firstGivenNameFromValue(nestedValue(input, path));
        if (candidate !== null) {
            return candidate;
        }
    }
    return '';
}
function snapshotStatusFor(status) {
    if (status === 'adapted') {
        return 'adapted';
    }
    if (status === 'fallback_adapted') {
        return 'fallback_adapted';
    }
    return 'unavailable';
}
function displayNameFor(status, availableReference, fallbackReference) {
    if (status === 'adapted') {
        return availableReference;
    }
    if (status === 'fallback_adapted') {
        return fallbackReference;
    }
    return null;
}
function uniqueWarnings(warnings) {
    return [...new Set(warnings)];
}
function buildNameDomain(input) {
    const inputValue = extractNameForResolution(input);
    const resolution = resolvePersonalNameMeaningAdaptedText('human_name_meaning_core_summary', inputValue);
    const status = snapshotStatusFor(resolution.status);
    return {
        domain: 'name_meaning',
        sourceModuleId: personalNameMeaningContentLayerId,
        adapterModuleId: personalNameMeaningContentAdapterId,
        sourceModuleVersion: personalNameMeaningContentLayerVersion,
        adapterModuleVersion: personalNameMeaningContentAdapterVersion,
        status,
        inputValue,
        normalizedKey: resolution.normalizedKey,
        displayName: displayNameFor(status, 'available_name_reference', 'generic_name_reference'),
        adaptedUnitIds: [...personalNameMeaningAdaptedHumanUnitIds],
        warnings: [...resolution.warnings],
    };
}
function buildNumerologyDomain(input) {
    const resolution = resolvePersonalNumerologyMeaningAdaptedText('human_numerology_core_summary', input);
    const status = snapshotStatusFor(resolution.status);
    return {
        domain: 'numerology_meaning',
        sourceModuleId: personalNumerologyMeaningContentLayerId,
        adapterModuleId: personalNumerologyMeaningContentAdapterId,
        sourceModuleVersion: personalNumerologyMeaningContentLayerVersion,
        adapterModuleVersion: personalNumerologyMeaningContentAdapterVersion,
        status,
        inputValue: resolution.inputValue,
        normalizedKey: resolution.normalizedKey,
        displayName: displayNameFor(status, 'available_numerology_reference', 'generic_numerology_reference'),
        adaptedUnitIds: [...personalNumerologyMeaningAdaptedHumanUnitIds],
        warnings: [...resolution.warnings],
    };
}
function summaryFor(domains) {
    return {
        totalDomains: domains.length,
        adaptedDomains: domains.filter((domain) => domain.status === 'adapted').length,
        fallbackDomains: domains.filter((domain) => domain.status === 'fallback_adapted').length,
        unavailableDomains: domains.filter((domain) => domain.status === 'unavailable').length,
        availableModuleCount: listAvailablePersonalIdentityContentModules().length,
        previewModuleCount: listPersonalIdentityContentModulesByKind('report_fixture').length,
    };
}
function metadataFor() {
    return {
        deterministic: true,
        generatedBy: 'personal_identity_content_resolution_snapshot',
        aiGenerated: false,
        llmGenerated: false,
        source: 'deterministic_content_resolution_snapshot',
    };
}
export function buildPersonalIdentityContentResolutionSnapshot(input) {
    const domains = [
        buildNameDomain(input),
        buildNumerologyDomain(input),
    ];
    const warnings = uniqueWarnings([
        ...domains.flatMap((domain) => domain.warnings),
        'deterministic_content_resolution_snapshot',
        'not_final_interpretation',
        'not_runtime_ui',
    ]);
    return {
        snapshotId: personalIdentityContentResolutionSnapshotId,
        snapshotVersion: personalIdentityContentResolutionSnapshotVersion,
        deterministic: true,
        domains,
        summary: summaryFor(domains),
        warnings,
        metadata: metadataFor(),
    };
}
