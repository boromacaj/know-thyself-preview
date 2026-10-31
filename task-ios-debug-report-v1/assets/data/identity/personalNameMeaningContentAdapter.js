import { resolvePersonalNameMeaningContent, } from './personalNameMeaningContentLayer.js?v=b5ef5ed';
export const personalNameMeaningContentAdapterId = 'personal_name_meaning_content_adapter';
export const personalNameMeaningContentAdapterVersion = '0.2.0';
export const personalNameMeaningAdaptedHumanUnitIds = [
    'human_name_meaning_core_summary',
    'human_name_symbolic_theme',
    'human_name_cultural_context',
    'human_name_archetype_seed',
    'human_name_origin_context',
    'human_name_meaning_boundary',
];
export const personalNameMeaningAdaptedTextResolutionStatuses = [
    'adapted',
    'fallback_adapted',
    'unavailable',
    'not_name_unit',
];
function metadataFor() {
    return {
        deterministic: true,
        generatedBy: personalNameMeaningContentAdapterId,
        aiGenerated: false,
        llmGenerated: false,
        sourceLayer: 'personal_name_meaning_content_layer',
    };
}
function sourceLabels(record) {
    return record.sources.map((source) => source.label).join(', ');
}
function themeLabels(record) {
    return record.symbolicThemes.map((theme) => theme.label).join(', ');
}
function meaningEntryLine(entry) {
    const debatedNote = entry.debated ? ', debated/uncertain' : '';
    return `${entry.sourceLabel} (${entry.originCulture}; confidence: ${entry.confidence}${debatedNote}): ${entry.proposedMeaning} — ${entry.explanation}`;
}
function sourceBySourceMeaning(record) {
    if (record.meaningEntries.length === 0) {
        return `Source context for ${record.displayName}: ${sourceLabels(record)}.`;
    }
    const lines = record.meaningEntries.map((entry) => `- ${meaningEntryLine(entry)}`).join('\n');
    const debatedCount = record.meaningEntries.filter((entry) => entry.debated).length;
    const debatedNote = debatedCount > 0
        ? ` ${debatedCount} of these thread(s) are marked debated/uncertain and are not presented as settled fact.`
        : '';
    return `Source-by-source meaning context for ${record.displayName}:\n${lines}\nEach thread is symbolic reference material with its own confidence level.${debatedNote}`;
}
function culturalContextText(record) {
    const regions = record.culturalRegions.length > 0
        ? ` Common cultural/language regions: ${record.culturalRegions.join(', ')}.`
        : '';
    const variants = record.variants.length > 0
        ? ` Variants and related forms: ${record.variants.join(', ')}.`
        : '';
    return `Cultural context for ${record.displayName}: ${record.culturalContext}${regions}${variants}`;
}
function adaptedTextFor(unitId, record) {
    if (unitId === 'human_name_meaning_core_summary') {
        return `Name reference: ${record.displayName}. ${record.meaningSummary}`;
    }
    if (unitId === 'human_name_symbolic_theme') {
        return `Symbolic themes recorded for ${record.displayName}: ${themeLabels(record)}. These themes are reference material, not identity labels.`;
    }
    if (unitId === 'human_name_cultural_context') {
        return culturalContextText(record);
    }
    if (unitId === 'human_name_archetype_seed') {
        return `Archetypal synthesis for ${record.displayName}: ${record.archetypalSynthesis}`;
    }
    if (unitId === 'human_name_origin_context') {
        return sourceBySourceMeaning(record);
    }
    return `Name symbolism for ${record.displayName} remains symbolic reference material only. ${record.cautionText}`;
}
function adapterStatusFor(resolution) {
    if (resolution.status === 'available') {
        return 'adapted';
    }
    if (resolution.status === 'fallback_available') {
        return 'fallback_adapted';
    }
    return 'unavailable';
}
export function isPersonalNameMeaningAdaptedHumanUnitId(value) {
    return typeof value === 'string'
        && personalNameMeaningAdaptedHumanUnitIds.includes(value);
}
export function resolvePersonalNameMeaningAdaptedText(unitId, inputName) {
    const contentResolution = resolvePersonalNameMeaningContent(inputName);
    if (!isPersonalNameMeaningAdaptedHumanUnitId(unitId)) {
        return {
            adapterId: personalNameMeaningContentAdapterId,
            adapterVersion: personalNameMeaningContentAdapterVersion,
            unitId,
            inputName,
            normalizedKey: contentResolution.normalizedKey,
            status: 'not_name_unit',
            text: null,
            warnings: [],
            metadata: metadataFor(),
        };
    }
    const status = adapterStatusFor(contentResolution);
    return {
        adapterId: personalNameMeaningContentAdapterId,
        adapterVersion: personalNameMeaningContentAdapterVersion,
        unitId,
        inputName,
        normalizedKey: contentResolution.normalizedKey,
        status,
        text: contentResolution.record === null ? null : adaptedTextFor(unitId, contentResolution.record),
        warnings: [...contentResolution.warnings],
        metadata: metadataFor(),
    };
}
export function buildPersonalNameMeaningAdaptedTextMap(inputName) {
    return Object.fromEntries(personalNameMeaningAdaptedHumanUnitIds.map((unitId) => [
        unitId,
        resolvePersonalNameMeaningAdaptedText(unitId, inputName),
    ]));
}
