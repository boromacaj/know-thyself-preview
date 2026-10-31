import { personalSymbolicLayers } from './personalSymbolicProfileContract.js?v=d9f39e7';
export const personalSymbolicReportSectionIds = [
    'identity_name_meaning',
    'identity_numerology',
    'integrated_symbolic_overview',
    'future_astrology_placeholder',
    'warnings_and_limitations',
    'source_and_debug',
];
export const personalSymbolicReportSectionRegistry = [
    {
        sectionId: personalSymbolicReportSectionIds[0],
        titleKey: 'report.section.identityNameMeaning.title',
        layer: personalSymbolicLayers.nameMeaning,
        alwaysAvailable: false,
        descriptionKey: 'report.section.identityNameMeaning.description',
    },
    {
        sectionId: personalSymbolicReportSectionIds[1],
        titleKey: 'report.section.identityNumerology.title',
        layer: personalSymbolicLayers.identityNumerology,
        alwaysAvailable: false,
        descriptionKey: 'report.section.identityNumerology.description',
    },
    {
        sectionId: personalSymbolicReportSectionIds[2],
        titleKey: 'report.section.integratedSymbolicOverview.title',
        layer: 'system',
        alwaysAvailable: false,
        descriptionKey: 'report.section.integratedSymbolicOverview.description',
    },
    {
        sectionId: personalSymbolicReportSectionIds[3],
        titleKey: 'report.section.futureAstrologyPlaceholder.title',
        layer: personalSymbolicLayers.futureAstrology,
        alwaysAvailable: false,
        descriptionKey: 'report.section.futureAstrologyPlaceholder.description',
    },
    {
        sectionId: personalSymbolicReportSectionIds[4],
        titleKey: 'report.section.warningsAndLimitations.title',
        layer: 'system',
        alwaysAvailable: true,
        descriptionKey: 'report.section.warningsAndLimitations.description',
    },
    {
        sectionId: personalSymbolicReportSectionIds[5],
        titleKey: 'report.section.sourceAndDebug.title',
        layer: 'system',
        alwaysAvailable: true,
        descriptionKey: 'report.section.sourceAndDebug.description',
    },
];
export function isPersonalSymbolicReportSectionId(value) {
    return typeof value === 'string' && personalSymbolicReportSectionIds.includes(value);
}
export function getPersonalSymbolicReportSectionDefinition(sectionId) {
    const definition = personalSymbolicReportSectionRegistry.find((candidate) => candidate.sectionId === sectionId);
    if (!definition) {
        throw new Error(`Unknown personal symbolic report section id: ${sectionId}`);
    }
    return definition;
}
