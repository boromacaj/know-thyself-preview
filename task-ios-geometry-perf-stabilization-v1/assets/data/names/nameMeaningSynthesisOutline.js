import { buildNameMeaningBundle } from './nameMeaningBundle.js?v=d9f39e7';
const source = {
    source: 'personal_name_meaning_bundle',
    builder: 'personal_name_meaning_synthesis_outline_builder',
    deterministic: true,
    version: '0.1.0',
};
function keyPart(value) {
    return value
        .toLocaleLowerCase('en-US')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
}
function outlineThemes(associations) {
    return associations.map((association, index) => ({
        id: `name_theme_${index + 1}_${keyPart(association.theme)}`,
        theme: association.theme,
        keywords: [...association.keywords],
        sourceAssociation: association,
    }));
}
function culturalContext(notes) {
    return notes.map((note, index) => ({
        id: `name_cultural_context_${index + 1}_${keyPart(note.sourceType)}`,
        sourceType: note.sourceType,
        note: note.note,
        sourceNote: note,
    }));
}
function outlineWarnings(bundleWarnings) {
    return bundleWarnings.map((warning) => ({
        code: 'unsupported_name_meaning_outline',
        message: warning,
        sourceWarning: warning,
    }));
}
export function buildNameMeaningSynthesisOutline(input) {
    const bundle = buildNameMeaningBundle(input);
    if (bundle.status === 'unsupported') {
        return {
            originalInput: bundle.originalInput,
            normalizedKey: bundle.normalizedKey,
            status: 'unsupported',
            displayName: null,
            primaryMeaningSummary: null,
            possibleMeaningKeywords: [],
            symbolicThemes: [],
            culturalContext: [],
            pronunciationContext: [],
            safetyDisclaimer: null,
            warnings: outlineWarnings(bundle.warnings),
            source,
        };
    }
    return {
        originalInput: bundle.originalInput,
        normalizedKey: bundle.normalizedKey,
        status: 'resolved',
        displayName: bundle.displayName,
        primaryMeaningSummary: bundle.meaningSummary,
        possibleMeaningKeywords: [...bundle.possibleMeanings],
        symbolicThemes: outlineThemes(bundle.symbolicAssociations),
        culturalContext: culturalContext(bundle.culturalNotes),
        pronunciationContext: [...bundle.pronunciationNotes],
        safetyDisclaimer: bundle.safetyDisclaimer,
        warnings: outlineWarnings(bundle.warnings),
        source,
    };
}
