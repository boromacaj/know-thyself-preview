export const personalNameMeaningContentLayerId = 'personal_name_meaning_content_layer';
export const personalNameMeaningContentLayerVersion = '0.2.0';
export const personalNameMeaningContentResolutionStatuses = [
    'available',
    'fallback_available',
    'unavailable',
];
/** Confidence bands for individual sourced meaning threads. `debated` explicitly
 *  flags an etymology that is contested or uncertain in name-reference sources and
 *  must never be presented as settled fact. */
export const personalNameMeaningConfidenceLevels = [
    'high',
    'medium',
    'low',
    'debated',
];
export const personalNameMeaningEntrySourceTypes = [
    'name_reference_tradition',
    'usage_context',
    'historical_reference',
    'etymological_reconstruction',
    'curated_note',
];
function theme(themeId, label, description) {
    return {
        themeId,
        label,
        description,
        confidence: 'curated_reference',
    };
}
function source(sourceId, label, sourceType, note) {
    return {
        sourceId,
        label,
        sourceType,
        note,
    };
}
function meaningEntry(entry) {
    return entry;
}
export const personalNameMeaningContentRecords = [
    {
        key: 'boris',
        displayName: 'Boris',
        canonicalName: 'Boris',
        nameType: 'given_name',
        languageGroup: 'Slavic',
        culturalRegions: [
            'Central Europe',
            'Eastern Europe',
            'Southeastern Europe',
            'Balkans',
        ],
        variants: ['Borislav', 'Borys', 'Borja', 'Boriss'],
        culturalContext: 'Boris is commonly treated as a Slavic given name with historical use across several Central, Eastern, and Southeastern European naming traditions.',
        meaningSummary: 'The name Boris is often associated in name-reference traditions with struggle, battle, strength, or perseverance. In this project, those meanings are treated only as symbolic reference material.',
        meaningEntries: [
            meaningEntry({
                entryId: 'boris_slavic_borislav',
                proposedMeaning: 'Battle, to fight (short form of Borislav)',
                explanation: 'A frequent name-reference reading links Boris to the Slavic element bor- (to fight) and treats it as a short form of Borislav, roughly "battle glory".',
                originCulture: 'Slavic',
                sourceLabel: 'Slavic name reference tradition',
                sourceType: 'name_reference_tradition',
                confidence: 'medium',
                debated: false,
                symbolicThemeIds: ['perseverance', 'strength_under_pressure'],
            }),
            meaningEntry({
                entryId: 'boris_struggle_perseverance',
                proposedMeaning: 'Struggle, perseverance, strength',
                explanation: 'A widely repeated popular reading associates Boris with struggle and the capacity to persevere. It is common in name-reference material but is a symbolic gloss rather than a precise etymology.',
                originCulture: 'Slavic (popular usage)',
                sourceLabel: 'Popular given-name reference reading',
                sourceType: 'usage_context',
                confidence: 'medium',
                debated: false,
                symbolicThemeIds: ['perseverance', 'grounded_will'],
            }),
            meaningEntry({
                entryId: 'boris_bulgar_turkic_bars',
                proposedMeaning: 'Possibly from Bulgar/Turkic "bars" (snow leopard) or "short"',
                explanation: 'Some sources propose an older Bulgar or Turkic origin, connecting Boris to a root such as bars ("snow leopard") or a word meaning "short". This origin is uncertain and contested, so it is recorded only as a debated possibility, not a settled fact.',
                originCulture: 'Bulgar / Turkic (proposed)',
                sourceLabel: 'Historical / etymological reconstruction (contested)',
                sourceType: 'etymological_reconstruction',
                confidence: 'debated',
                debated: true,
                symbolicThemeIds: ['strength_under_pressure'],
            }),
            meaningEntry({
                entryId: 'boris_symbolic_protector',
                proposedMeaning: 'Symbolic protector / resilience motif',
                explanation: 'As a curated symbolic layer only, Boris can be read as a seed image of a steady protector and of resilience under pressure. This is an interpretive reflection, not an etymology.',
                originCulture: 'Curated symbolic layer',
                sourceLabel: 'Curated KNOW THYSELF content note',
                sourceType: 'curated_note',
                confidence: 'low',
                debated: false,
                symbolicThemeIds: ['responsibility', 'grounded_will'],
            }),
        ],
        symbolicThemes: [
            theme('perseverance', 'Perseverance', 'A reference theme connected with continuing through resistance.'),
            theme('strength_under_pressure', 'Strength under pressure', 'A reference theme connected with steadiness during strain.'),
            theme('responsibility', 'Responsibility', 'A reference theme connected with duty and accountable action.'),
            theme('grounded_will', 'Grounded will', 'A reference theme connected with focused effort and practical resolve.'),
        ],
        archetypalNotes: 'Boris can be treated as a symbolic seed for endurance, grounded effort, and the capacity to continue through resistance.',
        archetypalSynthesis: 'Across its recorded threads — battle/Borislav, struggle and perseverance, a debated Bulgar/Turkic origin, and a symbolic protector motif — Boris reads as a seed image of steady, grounded resilience. The threads differ in confidence and are held together only as symbolic reference, not as a single proven meaning.',
        safeReflectionPrompt: 'Where can steady effort support clarity without becoming unnecessary struggle?',
        cautionText: 'These meaning threads for Boris are symbolic reference material with mixed confidence, including at least one debated origin. They are not a certainty claim, a personality label, or a fixed conclusion about anyone who carries the name.',
        sources: [
            source('slavic_name_reference_tradition', 'Slavic name reference tradition', 'name_reference_tradition', 'Generic curated reference label for Slavic name-meaning traditions.'),
            source('historical_given_name_usage', 'Historical given-name usage', 'usage_context', 'Generic curated reference label for historical use as a given name.'),
            source('curated_know_thyself_content_note', 'Curated KNOW THYSELF content note', 'curated_note', 'Internal deterministic content note for this symbolic registry.'),
        ],
        warnings: [
            'symbolic_reference_only',
            'not_identity_claim',
            'not_personality_label',
        ],
    },
    {
        key: 'pavlina',
        displayName: 'Pavl\u00edna',
        canonicalName: 'Pavl\u00edna',
        nameType: 'given_name',
        languageGroup: 'Latin / Central European',
        culturalRegions: ['Central Europe', 'Czech lands', 'Slovakia'],
        variants: ['Paulina', 'Paolina', 'Pavla', 'Paula'],
        culturalContext: 'Pavl\u00edna is a Central European feminine form related to Paulina, traditionally connected to the Latin root Paulus.',
        meaningSummary: 'The name Pavl\u00edna is often associated in name-reference traditions with smallness, humility, modesty, or gentleness. In this project, those meanings are treated only as symbolic reference material.',
        meaningEntries: [
            meaningEntry({
                entryId: 'pavlina_latin_paulus',
                proposedMeaning: 'Small, humble (feminine of Paulus)',
                explanation: 'Pavl\u00edna is widely read as a Central European feminine form of Paulina, from the Latin Paulus meaning "small" or "humble". This Latin root is well attested.',
                originCulture: 'Latin',
                sourceLabel: 'Latin name reference tradition',
                sourceType: 'name_reference_tradition',
                confidence: 'high',
                debated: false,
                symbolicThemeIds: ['humility', 'gentle_presence'],
            }),
            meaningEntry({
                entryId: 'pavlina_symbolic_grace',
                proposedMeaning: 'Symbolic gentleness and inner grace',
                explanation: 'As a curated symbolic layer only, the name can be read as a seed image of gentle presence and quiet composure. This is an interpretive reflection, not an etymology.',
                originCulture: 'Curated symbolic layer',
                sourceLabel: 'Curated KNOW THYSELF content note',
                sourceType: 'curated_note',
                confidence: 'low',
                debated: false,
                symbolicThemeIds: ['inner_grace', 'refinement'],
            }),
        ],
        symbolicThemes: [
            theme('humility', 'Humility', 'A reference theme connected with modest scale and grounded self-placement.'),
            theme('gentle_presence', 'Gentle presence', 'A reference theme connected with softness and attentive presence.'),
            theme('refinement', 'Refinement', 'A reference theme connected with subtlety and careful expression.'),
            theme('inner_grace', 'Inner grace', 'A reference theme connected with quiet composure and gentle strength.'),
        ],
        archetypalNotes: 'Pavl\u00edna can be treated as a symbolic seed for quiet strength, refined sensitivity, and gentle presence.',
        archetypalSynthesis: 'Its threads \u2014 the well-attested Latin "small/humble" root and a curated symbolic reading of gentle grace \u2014 converge on a seed image of quiet strength expressed through refinement rather than force. Held as symbolic reference only.',
        safeReflectionPrompt: 'Where can gentleness become a form of strength rather than self-reduction?',
        cautionText: 'These meaning threads for Pavl\u00edna are symbolic reference material. They are not a certainty claim, a personality label, or a fixed conclusion about anyone who carries the name.',
        sources: [
            source('latin_name_reference_tradition', 'Latin name reference tradition', 'name_reference_tradition', 'Generic curated reference label for Latin name-meaning traditions.'),
            source('central_european_given_name_usage', 'Central European given-name usage', 'usage_context', 'Generic curated reference label for Central European use as a given name.'),
            source('curated_know_thyself_content_note', 'Curated KNOW THYSELF content note', 'curated_note', 'Internal deterministic content note for this symbolic registry.'),
        ],
        warnings: [
            'symbolic_reference_only',
            'not_identity_claim',
            'not_personality_label',
        ],
    },
    {
        key: 'lucia',
        displayName: 'Lucia',
        canonicalName: 'Lucia',
        nameType: 'given_name',
        languageGroup: 'Latin / European',
        culturalRegions: ['Europe', 'Central Europe', 'Southern Europe'],
        variants: ['Lucie', 'Lucija', 'Luca', 'Lucy'],
        culturalContext: 'Lucia is a European given name traditionally connected to the Latin word lux, meaning light.',
        meaningSummary: 'The name Lucia is often associated in name-reference traditions with light, clarity, illumination, or visibility. In this project, those meanings are treated only as symbolic reference material.',
        meaningEntries: [
            meaningEntry({
                entryId: 'lucia_latin_lux',
                proposedMeaning: 'Light (from Latin lux)',
                explanation: 'Lucia is widely read as deriving from the Latin lux ("light"), a well-attested root often connected to birth at dawn or daylight.',
                originCulture: 'Latin',
                sourceLabel: 'Latin name reference tradition',
                sourceType: 'name_reference_tradition',
                confidence: 'high',
                debated: false,
                symbolicThemeIds: ['light', 'clarity'],
            }),
            meaningEntry({
                entryId: 'lucia_symbolic_perception',
                proposedMeaning: 'Symbolic clarity and perception',
                explanation: 'As a curated symbolic layer only, the name can be read as a seed image of bringing something into view and attentive seeing. This is an interpretive reflection, not an etymology.',
                originCulture: 'Curated symbolic layer',
                sourceLabel: 'Curated KNOW THYSELF content note',
                sourceType: 'curated_note',
                confidence: 'low',
                debated: false,
                symbolicThemeIds: ['perception', 'visibility'],
            }),
        ],
        symbolicThemes: [
            theme('light', 'Light', 'A reference theme connected with brightness and symbolic illumination.'),
            theme('clarity', 'Clarity', 'A reference theme connected with becoming easier to perceive or understand.'),
            theme('perception', 'Perception', 'A reference theme connected with noticing and attentive seeing.'),
            theme('visibility', 'Visibility', 'A reference theme connected with bringing something into view.'),
        ],
        archetypalNotes: 'Lucia can be treated as a symbolic seed for illumination, perception, and the act of bringing something into awareness.',
        archetypalSynthesis: 'Its threads — the well-attested Latin "light" root and a curated symbolic reading of clarity and perception — converge on a seed image of gentle illumination and attentive seeing. Held as symbolic reference only.',
        safeReflectionPrompt: 'What becomes clearer when attention is brought gently into the situation?',
        cautionText: 'These meaning threads for Lucia are symbolic reference material. They are not a certainty claim, a personality label, or a fixed conclusion about anyone who carries the name.',
        sources: [
            source('latin_name_reference_tradition', 'Latin name reference tradition', 'name_reference_tradition', 'Generic curated reference label for Latin name-meaning traditions.'),
            source('european_given_name_usage', 'European given-name usage', 'usage_context', 'Generic curated reference label for European use as a given name.'),
            source('curated_know_thyself_content_note', 'Curated KNOW THYSELF content note', 'curated_note', 'Internal deterministic content note for this symbolic registry.'),
        ],
        warnings: [
            'symbolic_reference_only',
            'not_identity_claim',
            'not_personality_label',
        ],
    },
    {
        key: 'generic',
        displayName: 'Generic Name Reference',
        canonicalName: 'Generic Name Reference',
        nameType: 'given_name',
        languageGroup: 'Unknown / fallback',
        culturalRegions: [],
        variants: [],
        culturalContext: 'The provided name is not currently present in the curated name meaning registry.',
        meaningSummary: 'No specific curated name meaning is available yet. The name can still be preserved as source identity data for future interpretation layers.',
        meaningEntries: [
            meaningEntry({
                entryId: 'generic_no_curated_meaning',
                proposedMeaning: 'No curated meaning available yet',
                explanation: 'This name is not yet in the curated registry, so no sourced meaning threads are available. The input name is preserved as source identity data for later enrichment.',
                originCulture: 'Unknown',
                sourceLabel: 'Curated KNOW THYSELF fallback note',
                sourceType: 'curated_note',
                confidence: 'low',
                debated: false,
                symbolicThemeIds: ['source_identity', 'future_enrichment'],
            }),
        ],
        symbolicThemes: [
            theme('source_identity', 'Source identity', 'A reference theme connected with preserving the input name as source data.'),
            theme('personal_reference', 'Personal reference', 'A reference theme connected with the name as a personal marker.'),
            theme('future_enrichment', 'Future enrichment', 'A reference theme connected with later curated content expansion.'),
        ],
        archetypalNotes: 'The name is preserved as a source marker until curated symbolic content becomes available.',
        archetypalSynthesis: 'No curated synthesis is available yet. The name is held as source identity data until curated meaning threads are added.',
        safeReflectionPrompt: 'What personal meaning has this name gathered through lived experience?',
        cautionText: 'No curated meaning is available for this name yet. Nothing here is a certainty claim, a personality label, or a fixed conclusion.',
        sources: [
            source('curated_know_thyself_fallback_note', 'Curated KNOW THYSELF fallback note', 'curated_note', 'Internal deterministic fallback note for unknown name content.'),
        ],
        warnings: [
            'fallback_content',
            'name_not_in_registry',
            'symbolic_reference_only',
            'not_identity_claim',
        ],
    },
];
const personalNameMeaningContentKeys = personalNameMeaningContentRecords.map((record) => record.key);
function metadataFor() {
    return {
        deterministic: true,
        generatedBy: personalNameMeaningContentLayerId,
        aiGenerated: false,
        llmGenerated: false,
        source: 'static_curated_registry',
    };
}
export function normalizePersonalNameMeaningKey(inputName) {
    if (typeof inputName !== 'string') {
        return '';
    }
    return inputName
        .trim()
        .toLowerCase()
        .replace(/[\u0102\u0103]\u00ad/g, 'i')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z]/g, '');
}
export function isPersonalNameMeaningContentKey(value) {
    return typeof value === 'string' && personalNameMeaningContentKeys.includes(value);
}
export function resolvePersonalNameMeaningContent(inputName) {
    const normalizedKey = normalizePersonalNameMeaningKey(inputName);
    if (normalizedKey === '') {
        return {
            layerId: personalNameMeaningContentLayerId,
            layerVersion: personalNameMeaningContentLayerVersion,
            inputName,
            normalizedKey,
            status: 'unavailable',
            record: null,
            warnings: ['missing_name_input'],
            metadata: metadataFor(),
        };
    }
    const matchingRecord = personalNameMeaningContentRecords.find((record) => record.key === normalizedKey && record.key !== 'generic');
    if (matchingRecord !== undefined) {
        return {
            layerId: personalNameMeaningContentLayerId,
            layerVersion: personalNameMeaningContentLayerVersion,
            inputName,
            normalizedKey,
            status: 'available',
            record: matchingRecord,
            warnings: [...matchingRecord.warnings],
            metadata: metadataFor(),
        };
    }
    const fallbackRecord = personalNameMeaningContentRecords.find((record) => record.key === 'generic') ?? null;
    return {
        layerId: personalNameMeaningContentLayerId,
        layerVersion: personalNameMeaningContentLayerVersion,
        inputName,
        normalizedKey,
        status: 'fallback_available',
        record: fallbackRecord,
        warnings: fallbackRecord === null ? ['name_not_in_registry'] : [...fallbackRecord.warnings],
        metadata: metadataFor(),
    };
}
