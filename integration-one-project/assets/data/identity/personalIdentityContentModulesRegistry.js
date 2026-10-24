import { personalNameMeaningContentAdapterId, personalNameMeaningContentAdapterVersion, } from './personalNameMeaningContentAdapter.js';
import { personalNameMeaningContentLayerId, personalNameMeaningContentLayerVersion, } from './personalNameMeaningContentLayer.js';
import { personalNumerologyMeaningContentAdapterId, personalNumerologyMeaningContentAdapterVersion, } from './personalNumerologyMeaningContentAdapter.js';
import { personalNumerologyMeaningContentLayerId, personalNumerologyMeaningContentLayerVersion, } from './personalNumerologyMeaningContentLayer.js';
export const personalIdentityContentModulesRegistryId = 'personal_identity_content_modules_registry';
export const personalIdentityContentModulesRegistryVersion = '0.1.0';
const personalIdentityContentResolutionSnapshotModuleId = 'personal_identity_content_resolution_snapshot';
const personalIdentityContentResolutionSnapshotModuleVersion = '0.1.0';
const personalIdentityContentReadinessSummaryModuleId = 'personal_identity_content_readiness_summary';
const personalIdentityContentReadinessSummaryModuleVersion = '0.1.0';
const personalIdentityContentDiagnosticsBundleModuleId = 'personal_identity_content_diagnostics_bundle';
const personalIdentityContentDiagnosticsBundleModuleVersion = '0.1.0';
const personalIdentityContentResolutionSnapshotVariantsFixtureId = 'personal_identity_content_resolution_snapshot_variants';
const personalIdentityContentReadinessSummaryVariantsFixtureId = 'personal_identity_content_readiness_summary_variants';
const personalIdentityContentDiagnosticsBundleVariantsFixtureId = 'personal_identity_content_diagnostics_bundle_variants';
export const personalIdentityContentModuleKinds = [
    'content_layer',
    'content_adapter',
    'report_fixture',
];
export const personalIdentityContentModuleStatuses = [
    'available',
    'preview_only',
    'planned',
];
function contentLayerWarnings(includePredictionBoundary) {
    const warnings = [
        'symbolic_reference_only',
        'not_identity_claim',
        'not_personality_label',
    ];
    return includePredictionBoundary ? [...warnings, 'not_prediction'] : warnings;
}
export const personalIdentityContentModules = [
    {
        moduleId: personalNameMeaningContentLayerId,
        moduleVersion: personalNameMeaningContentLayerVersion,
        kind: 'content_layer',
        status: 'available',
        displayName: 'Personal Name Meaning Content Layer',
        description: 'Deterministic curated symbolic reference content for supported personal names and a generic fallback.',
        deterministic: true,
        aiGenerated: false,
        llmGenerated: false,
        source: 'static_curated_registry',
        dependencies: [],
        warnings: contentLayerWarnings(false),
    },
    {
        moduleId: personalNameMeaningContentAdapterId,
        moduleVersion: personalNameMeaningContentAdapterVersion,
        kind: 'content_adapter',
        status: 'available',
        displayName: 'Personal Name Meaning Content Adapter',
        description: 'Deterministically adapts curated name meaning content into name-related human report units.',
        deterministic: true,
        aiGenerated: false,
        llmGenerated: false,
        source: 'deterministic_adapter',
        dependencies: [personalNameMeaningContentLayerId],
        warnings: contentLayerWarnings(false),
    },
    {
        moduleId: personalNumerologyMeaningContentLayerId,
        moduleVersion: personalNumerologyMeaningContentLayerVersion,
        kind: 'content_layer',
        status: 'available',
        displayName: 'Personal Numerology Meaning Content Layer',
        description: 'Deterministic curated symbolic reference content for single-digit numerology numbers 1-9 and a generic fallback.',
        deterministic: true,
        aiGenerated: false,
        llmGenerated: false,
        source: 'static_curated_registry',
        dependencies: [],
        warnings: contentLayerWarnings(true),
    },
    {
        moduleId: personalNumerologyMeaningContentAdapterId,
        moduleVersion: personalNumerologyMeaningContentAdapterVersion,
        kind: 'content_adapter',
        status: 'available',
        displayName: 'Personal Numerology Meaning Content Adapter',
        description: 'Deterministically adapts curated numerology meaning content into numerology-related human report units.',
        deterministic: true,
        aiGenerated: false,
        llmGenerated: false,
        source: 'deterministic_adapter',
        dependencies: [personalNumerologyMeaningContentLayerId],
        warnings: contentLayerWarnings(true),
    },
    {
        moduleId: personalIdentityContentResolutionSnapshotModuleId,
        moduleVersion: personalIdentityContentResolutionSnapshotModuleVersion,
        kind: 'content_adapter',
        status: 'available',
        displayName: 'Personal Identity Content Resolution Snapshot',
        description: 'Deterministic debug and readiness snapshot summarizing name and numerology content resolution states for a given input.',
        deterministic: true,
        aiGenerated: false,
        llmGenerated: false,
        source: 'deterministic_adapter',
        dependencies: [
            personalNameMeaningContentLayerId,
            personalNameMeaningContentAdapterId,
            personalNumerologyMeaningContentLayerId,
            personalNumerologyMeaningContentAdapterId,
        ],
        warnings: [
            'deterministic_content_resolution_snapshot',
            'not_final_interpretation',
            'not_runtime_ui',
            'symbolic_reference_only',
            'not_identity_claim',
            'not_personality_label',
            'not_prediction',
        ],
    },
    {
        moduleId: personalIdentityContentReadinessSummaryModuleId,
        moduleVersion: personalIdentityContentReadinessSummaryModuleVersion,
        kind: 'content_adapter',
        status: 'available',
        displayName: 'Personal Identity Content Readiness Summary',
        description: 'Deterministic debug and readiness summary mapping identity content resolution states into ready, partial, and unavailable status.',
        deterministic: true,
        aiGenerated: false,
        llmGenerated: false,
        source: 'deterministic_adapter',
        dependencies: [
            personalIdentityContentResolutionSnapshotModuleId,
            personalNameMeaningContentLayerId,
            personalNameMeaningContentAdapterId,
            personalNumerologyMeaningContentLayerId,
            personalNumerologyMeaningContentAdapterId,
        ],
        warnings: [
            'deterministic_content_readiness_summary',
            'not_final_interpretation',
            'not_runtime_ui',
            'symbolic_reference_only',
            'not_identity_claim',
            'not_personality_label',
            'not_prediction',
        ],
    },
    {
        moduleId: personalIdentityContentDiagnosticsBundleModuleId,
        moduleVersion: personalIdentityContentDiagnosticsBundleModuleVersion,
        kind: 'content_adapter',
        status: 'available',
        displayName: 'Personal Identity Content Diagnostics Bundle',
        description: 'Deterministic debug and support bundle combining identity content resolution snapshot, readiness summary, and registry module summary.',
        deterministic: true,
        aiGenerated: false,
        llmGenerated: false,
        source: 'deterministic_adapter',
        dependencies: [
            personalIdentityContentResolutionSnapshotModuleId,
            personalIdentityContentReadinessSummaryModuleId,
            personalIdentityContentModulesRegistryId,
            personalNameMeaningContentLayerId,
            personalNameMeaningContentAdapterId,
            personalNumerologyMeaningContentLayerId,
            personalNumerologyMeaningContentAdapterId,
        ],
        warnings: [
            'deterministic_identity_content_diagnostics',
            'not_final_interpretation',
            'not_runtime_ui',
            'symbolic_reference_only',
            'not_identity_claim',
            'not_personality_label',
            'not_prediction',
        ],
    },
    {
        moduleId: 'personal_name_meaning_report_preview_variants',
        moduleVersion: '0.1.0',
        kind: 'report_fixture',
        status: 'preview_only',
        displayName: 'Personal Name Meaning Report Preview Variants',
        description: 'Deterministic rendered report preview coverage for available, fallback, and unavailable name-content states.',
        deterministic: true,
        aiGenerated: false,
        llmGenerated: false,
        source: 'test_fixture',
        dependencies: [personalNameMeaningContentLayerId, personalNameMeaningContentAdapterId],
        warnings: ['preview_fixture_only', 'not_runtime_ui'],
    },
    {
        moduleId: 'personal_numerology_report_preview_variants',
        moduleVersion: '0.1.0',
        kind: 'report_fixture',
        status: 'preview_only',
        displayName: 'Personal Numerology Report Preview Variants',
        description: 'Deterministic rendered report preview coverage for available, fallback, and unavailable numerology-content states.',
        deterministic: true,
        aiGenerated: false,
        llmGenerated: false,
        source: 'test_fixture',
        dependencies: [
            personalNumerologyMeaningContentLayerId,
            personalNumerologyMeaningContentAdapterId,
        ],
        warnings: ['preview_fixture_only', 'not_runtime_ui'],
    },
    {
        moduleId: personalIdentityContentResolutionSnapshotVariantsFixtureId,
        moduleVersion: '0.1.0',
        kind: 'report_fixture',
        status: 'preview_only',
        displayName: 'Personal Identity Content Resolution Snapshot Variants',
        description: 'Deterministic preview fixture coverage for adapted, fallback, unavailable, mixed, and nested identity content resolution snapshot states.',
        deterministic: true,
        aiGenerated: false,
        llmGenerated: false,
        source: 'test_fixture',
        dependencies: [
            personalIdentityContentResolutionSnapshotModuleId,
            personalNameMeaningContentLayerId,
            personalNameMeaningContentAdapterId,
            personalNumerologyMeaningContentLayerId,
            personalNumerologyMeaningContentAdapterId,
        ],
        warnings: ['preview_fixture_only', 'not_runtime_ui'],
    },
    {
        moduleId: personalIdentityContentReadinessSummaryVariantsFixtureId,
        moduleVersion: '0.1.0',
        kind: 'report_fixture',
        status: 'preview_only',
        displayName: 'Personal Identity Content Readiness Summary Variants',
        description: 'Deterministic preview fixture coverage for ready, partial, unavailable, mixed, and nested identity content readiness summary states.',
        deterministic: true,
        aiGenerated: false,
        llmGenerated: false,
        source: 'test_fixture',
        dependencies: [
            personalIdentityContentReadinessSummaryModuleId,
            personalIdentityContentResolutionSnapshotModuleId,
            personalNameMeaningContentLayerId,
            personalNameMeaningContentAdapterId,
            personalNumerologyMeaningContentLayerId,
            personalNumerologyMeaningContentAdapterId,
        ],
        warnings: ['preview_fixture_only', 'not_runtime_ui'],
    },
    {
        moduleId: personalIdentityContentDiagnosticsBundleVariantsFixtureId,
        moduleVersion: '0.1.0',
        kind: 'report_fixture',
        status: 'preview_only',
        displayName: 'Personal Identity Content Diagnostics Bundle Variants',
        description: 'Deterministic preview fixture coverage for ready, partial, unavailable, mixed, and nested identity content diagnostics bundle states.',
        deterministic: true,
        aiGenerated: false,
        llmGenerated: false,
        source: 'test_fixture',
        dependencies: [
            personalIdentityContentDiagnosticsBundleModuleId,
            personalIdentityContentReadinessSummaryModuleId,
            personalIdentityContentResolutionSnapshotModuleId,
            personalIdentityContentModulesRegistryId,
            personalNameMeaningContentLayerId,
            personalNameMeaningContentAdapterId,
            personalNumerologyMeaningContentLayerId,
            personalNumerologyMeaningContentAdapterId,
        ],
        warnings: ['preview_fixture_only', 'not_runtime_ui'],
    },
];
export function listPersonalIdentityContentModules() {
    return [...personalIdentityContentModules];
}
export function listPersonalIdentityContentModulesByKind(kind) {
    if (!personalIdentityContentModuleKinds.includes(kind)) {
        return [];
    }
    return personalIdentityContentModules.filter((moduleRecord) => moduleRecord.kind === kind);
}
export function listAvailablePersonalIdentityContentModules() {
    return personalIdentityContentModules.filter((moduleRecord) => moduleRecord.status === 'available');
}
export function getPersonalIdentityContentModuleById(moduleId) {
    if (typeof moduleId !== 'string') {
        return null;
    }
    return personalIdentityContentModules.find((moduleRecord) => moduleRecord.moduleId === moduleId) ?? null;
}
export function isPersonalIdentityContentModuleId(value) {
    return typeof value === 'string'
        && personalIdentityContentModules.some((moduleRecord) => moduleRecord.moduleId === value);
}
