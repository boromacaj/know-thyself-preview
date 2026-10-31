import { personalBirthCalculationReadinessSummaryId, personalBirthCalculationReadinessSummaryVersion, } from './personalBirthCalculationReadinessSummary.js?v=2ea79e9';
import { personalBirthDataAvailabilitySummaryId, personalBirthDataAvailabilitySummaryVersion, } from './personalBirthDataAvailabilitySummary.js?v=2ea79e9';
export const personalBirthSupportModulesRegistryId = 'personal_birth_support_modules_registry';
export const personalBirthSupportModulesRegistryVersion = '0.1.0';
export const personalBirthSupportModuleKinds = [
    'availability_summary',
    'readiness_summary',
    'preview_fixture',
];
export const personalBirthSupportModuleStatuses = [
    'available',
    'preview_only',
];
const personalBirthDataAvailabilitySummaryVariantsId = 'personal_birth_data_availability_summary_variants';
const personalBirthCalculationReadinessSummaryVariantsId = 'personal_birth_calculation_readiness_summary_variants';
const personalBirthSupportModulesInternal = [
    {
        moduleId: personalBirthDataAvailabilitySummaryId,
        moduleVersion: personalBirthDataAvailabilitySummaryVersion,
        moduleKind: 'availability_summary',
        status: 'available',
        deterministic: true,
        description: 'Reports whether birth date, birth time, and birth place inputs are available.',
        warnings: [
            'deterministic_birth_support',
            'input_availability_only',
            'not_calculation',
            'not_runtime_ui',
        ],
    },
    {
        moduleId: personalBirthCalculationReadinessSummaryId,
        moduleVersion: personalBirthCalculationReadinessSummaryVersion,
        moduleKind: 'readiness_summary',
        status: 'available',
        deterministic: true,
        description: 'Reports whether available birth data is sufficient for future birth-based symbolic calculation layers.',
        warnings: [
            'deterministic_birth_support',
            'future_layer_readiness_only',
            'not_calculation',
            'not_runtime_ui',
        ],
    },
    {
        moduleId: personalBirthDataAvailabilitySummaryVariantsId,
        moduleVersion: '0.1.0',
        moduleKind: 'preview_fixture',
        status: 'preview_only',
        deterministic: true,
        description: 'Preview variants for birth data availability states.',
        warnings: [
            'deterministic_birth_support',
            'preview_fixture_only',
            'not_runtime_ui',
        ],
    },
    {
        moduleId: personalBirthCalculationReadinessSummaryVariantsId,
        moduleVersion: '0.1.0',
        moduleKind: 'preview_fixture',
        status: 'preview_only',
        deterministic: true,
        description: 'Preview variants for birth calculation readiness states.',
        warnings: [
            'deterministic_birth_support',
            'preview_fixture_only',
            'not_runtime_ui',
        ],
    },
];
function clonePersonalBirthSupportModule(module) {
    return {
        ...module,
        warnings: [...module.warnings],
    };
}
export const personalBirthSupportModules = personalBirthSupportModulesInternal.map(clonePersonalBirthSupportModule);
export function listPersonalBirthSupportModules() {
    return personalBirthSupportModulesInternal.map(clonePersonalBirthSupportModule);
}
export function listAvailablePersonalBirthSupportModules() {
    return listPersonalBirthSupportModulesByStatus('available');
}
export function listPersonalBirthSupportModulesByKind(kind) {
    return personalBirthSupportModulesInternal
        .filter((module) => module.moduleKind === kind)
        .map(clonePersonalBirthSupportModule);
}
export function listPersonalBirthSupportModulesByStatus(status) {
    return personalBirthSupportModulesInternal
        .filter((module) => module.status === status)
        .map(clonePersonalBirthSupportModule);
}
export function getPersonalBirthSupportModuleById(moduleId) {
    const module = personalBirthSupportModulesInternal.find((candidate) => candidate.moduleId === moduleId);
    return module === undefined ? null : clonePersonalBirthSupportModule(module);
}
export function isPersonalBirthSupportModuleId(moduleId) {
    return (typeof moduleId === 'string' &&
        personalBirthSupportModulesInternal.some((module) => module.moduleId === moduleId));
}
