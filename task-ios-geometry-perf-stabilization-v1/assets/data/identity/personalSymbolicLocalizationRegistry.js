import { getPersonalSymbolicReportSectionDefinition } from './personalSymbolicReportSectionRegistry.js?v=d9f39e7';
export const personalSymbolicSupportedLocales = ['en', 'sk'];
export const personalSymbolicDefaultLocale = 'en';
export const personalSymbolicLocalizationRegistry = {
    en: {
        'report.section.identityNameMeaning.title': 'Name meaning',
        'report.section.identityNameMeaning.description': 'Structured name meaning data available for this report section.',
        'report.section.identityNumerology.title': 'Identity numerology',
        'report.section.identityNumerology.description': 'Structured numerology data available for this report section.',
        'report.section.integratedSymbolicOverview.title': 'Integrated symbolic overview',
        'report.section.integratedSymbolicOverview.description': 'Structured overview metadata based on currently available symbolic layers.',
        'report.section.futureAstrologyPlaceholder.title': 'Future astrology layer',
        'report.section.futureAstrologyPlaceholder.description': 'Placeholder for a future astrology layer that is not connected yet.',
        'report.section.warningsAndLimitations.title': 'Warnings and limitations',
        'report.section.warningsAndLimitations.description': 'Structured warnings, missing inputs, and limitation metadata for this report.',
        'report.section.sourceAndDebug.title': 'Source and debug',
        'report.section.sourceAndDebug.description': 'Technical source and debug metadata for development and validation.',
    },
    sk: {
        'report.section.identityNameMeaning.title': 'Význam mena',
        'report.section.identityNameMeaning.description': 'Štruktúrované údaje o význame mena dostupné pre túto sekciu reportu.',
        'report.section.identityNumerology.title': 'Numerológia identity',
        'report.section.identityNumerology.description': 'Štruktúrované numerologické údaje dostupné pre túto sekciu reportu.',
        'report.section.integratedSymbolicOverview.title': 'Integrovaný symbolický prehľad',
        'report.section.integratedSymbolicOverview.description': 'Štruktúrované metadáta prehľadu založené na aktuálne dostupných symbolických vrstvách.',
        'report.section.futureAstrologyPlaceholder.title': 'Budúca astrologická vrstva',
        'report.section.futureAstrologyPlaceholder.description': 'Zástupná sekcia pre budúcu astrologickú vrstvu, ktorá ešte nie je pripojená.',
        'report.section.warningsAndLimitations.title': 'Upozornenia a obmedzenia',
        'report.section.warningsAndLimitations.description': 'Štruktúrované upozornenia, chýbajúce vstupy a metadáta obmedzení pre tento report.',
        'report.section.sourceAndDebug.title': 'Zdroj a debug',
        'report.section.sourceAndDebug.description': 'Technické zdrojové a debug metadáta pre vývoj a validáciu.',
    },
};
export function isPersonalSymbolicSupportedLocale(value) {
    return typeof value === 'string' && personalSymbolicSupportedLocales.includes(value);
}
function resolveLocale(locale) {
    return isPersonalSymbolicSupportedLocale(locale) ? locale : personalSymbolicDefaultLocale;
}
export function getPersonalSymbolicLocalizedText(key, locale) {
    const resolvedLocale = resolveLocale(locale);
    return (personalSymbolicLocalizationRegistry[resolvedLocale][key]
        ?? personalSymbolicLocalizationRegistry[personalSymbolicDefaultLocale][key]
        ?? key);
}
export function getPersonalSymbolicSectionLocalizedText(sectionId, locale) {
    const resolvedLocale = resolveLocale(locale);
    const definition = getPersonalSymbolicReportSectionDefinition(sectionId);
    return {
        sectionId,
        locale: resolvedLocale,
        title: getPersonalSymbolicLocalizedText(definition.titleKey, resolvedLocale),
        description: getPersonalSymbolicLocalizedText(definition.descriptionKey, resolvedLocale),
        titleKey: definition.titleKey,
        descriptionKey: definition.descriptionKey,
    };
}
