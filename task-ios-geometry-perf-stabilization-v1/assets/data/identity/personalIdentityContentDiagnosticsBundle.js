import { buildPersonalIdentityContentReadinessSummaryFromSnapshot, personalIdentityContentReadinessSummaryId, personalIdentityContentReadinessSummaryVersion, } from './personalIdentityContentReadinessSummary.js?v=d9f39e7';
import { buildPersonalIdentityContentResolutionSnapshot, personalIdentityContentResolutionSnapshotId, personalIdentityContentResolutionSnapshotVersion, } from './personalIdentityContentResolutionSnapshot.js?v=d9f39e7';
import { listAvailablePersonalIdentityContentModules, listPersonalIdentityContentModules, listPersonalIdentityContentModulesByKind, personalIdentityContentModulesRegistryId, personalIdentityContentModulesRegistryVersion, } from './personalIdentityContentModulesRegistry.js?v=d9f39e7';
export const personalIdentityContentDiagnosticsBundleId = 'personal_identity_content_diagnostics_bundle';
export const personalIdentityContentDiagnosticsBundleVersion = '0.1.0';
function uniqueWarnings(warnings) {
    return [...new Set(warnings)];
}
function buildRegistrySummary() {
    const modules = listPersonalIdentityContentModules();
    return {
        totalModules: modules.length,
        availableModules: listAvailablePersonalIdentityContentModules().length,
        previewModules: listPersonalIdentityContentModulesByKind('report_fixture').length,
        contentLayers: listPersonalIdentityContentModulesByKind('content_layer').length,
        contentAdapters: listPersonalIdentityContentModulesByKind('content_adapter').length,
        reportFixtures: listPersonalIdentityContentModulesByKind('report_fixture').length,
        moduleIds: modules.map((moduleRecord) => moduleRecord.moduleId),
    };
}
function buildMetadata() {
    return {
        deterministic: true,
        generatedBy: 'personal_identity_content_diagnostics_bundle',
        aiGenerated: false,
        llmGenerated: false,
        source: 'deterministic_identity_content_diagnostics',
        snapshotId: personalIdentityContentResolutionSnapshotId,
        snapshotVersion: personalIdentityContentResolutionSnapshotVersion,
        readinessSummaryId: personalIdentityContentReadinessSummaryId,
        readinessSummaryVersion: personalIdentityContentReadinessSummaryVersion,
        modulesRegistryId: personalIdentityContentModulesRegistryId,
        modulesRegistryVersion: personalIdentityContentModulesRegistryVersion,
    };
}
export function buildPersonalIdentityContentDiagnosticsBundle(input) {
    const snapshot = buildPersonalIdentityContentResolutionSnapshot(input);
    const readinessSummary = buildPersonalIdentityContentReadinessSummaryFromSnapshot(snapshot);
    const warnings = uniqueWarnings([
        ...snapshot.warnings,
        ...readinessSummary.warnings,
        'deterministic_identity_content_diagnostics',
        'not_final_interpretation',
        'not_runtime_ui',
    ]);
    return {
        bundleId: personalIdentityContentDiagnosticsBundleId,
        bundleVersion: personalIdentityContentDiagnosticsBundleVersion,
        deterministic: true,
        snapshot,
        readinessSummary,
        registrySummary: buildRegistrySummary(),
        warnings,
        metadata: buildMetadata(),
    };
}
