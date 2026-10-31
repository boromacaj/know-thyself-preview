import { getNameMeaningEntry, normalizeNameMeaningKey } from './nameMeaningResolver.js?v=f9ab0a6';
const source = {
    source: 'personal_name_meaning_resolver',
    assembler: 'personal_name_meaning_bundle_assembler',
    deterministic: true,
    version: '0.1.0',
};
const unsupportedWarning = 'No deterministic name meaning entry is currently available for this input.';
export function buildNameMeaningBundle(input) {
    const normalizedKey = normalizeNameMeaningKey(input);
    const entry = getNameMeaningEntry(input);
    if (!entry) {
        return {
            originalInput: input,
            normalizedKey,
            status: 'unsupported',
            entry: null,
            displayName: null,
            meaningSummary: null,
            possibleMeanings: [],
            symbolicAssociations: [],
            culturalNotes: [],
            pronunciationNotes: [],
            safetyDisclaimer: null,
            warnings: [unsupportedWarning],
            source,
        };
    }
    return {
        originalInput: input,
        normalizedKey,
        status: 'resolved',
        entry,
        displayName: entry.displayName,
        meaningSummary: entry.meaningSummary,
        possibleMeanings: [...entry.possibleMeanings],
        symbolicAssociations: [...entry.symbolicAssociations],
        culturalNotes: [...entry.culturalNotes],
        pronunciationNotes: [...entry.pronunciationNotes],
        safetyDisclaimer: entry.safetyDisclaimer,
        warnings: [],
        source,
    };
}
