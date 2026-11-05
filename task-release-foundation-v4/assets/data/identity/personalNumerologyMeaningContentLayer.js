export const personalNumerologyMeaningContentLayerId = 'personal_numerology_meaning_content_layer';
export const personalNumerologyMeaningContentLayerVersion = '0.1.0';
export const personalNumerologyMeaningContentResolutionStatuses = [
    'available',
    'fallback_available',
    'unavailable',
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
export const personalNumerologyMeaningContentRecords = [
    {
        key: '1',
        displayName: 'Number 1',
        number: 1,
        numerologyContext: 'Number 1 is commonly used in numerology traditions as a symbolic reference for beginnings, initiative, independence, and individual direction.',
        meaningSummary: 'Number 1 is often associated with initiative, originality, fresh starts, and visible personal direction. In this project, those meanings are treated only as symbolic reference material.',
        symbolicThemes: [
            theme('initiative', 'Initiative', 'A reference theme connected with beginning movement.'),
            theme('originality', 'Originality', 'A reference theme connected with fresh expression.'),
            theme('independence', 'Independence', 'A reference theme connected with individual direction.'),
            theme('new_beginning', 'New beginning', 'A reference theme connected with starting a pattern.'),
        ],
        archetypalNotes: 'Number 1 can be treated as a symbolic seed for starting movement, choosing direction, and initiating a pattern.',
        safeReflectionPrompt: 'Where can a clear first step create movement without becoming unnecessary pressure?',
        sources: [
            source('general_numerology_reference_tradition', 'General numerology reference tradition', 'numerology_reference_tradition', 'Generic curated reference label for numerology meaning traditions.'),
            source('curated_know_thyself_content_note', 'Curated KNOW THYSELF content note', 'curated_note', 'Internal deterministic content note for this symbolic registry.'),
        ],
        warnings: [
            'symbolic_reference_only',
            'not_identity_claim',
            'not_personality_label',
            'not_prediction',
        ],
    },
    {
        key: '2',
        displayName: 'Number 2',
        number: 2,
        numerologyContext: 'Number 2 is commonly used in numerology traditions as a symbolic reference for cooperation, sensitivity, balance, and relational awareness.',
        meaningSummary: 'Number 2 is often associated with cooperation, receptivity, diplomacy, emotional sensitivity, and balance. In this project, those meanings are treated only as symbolic reference material.',
        symbolicThemes: [
            theme('cooperation', 'Cooperation', 'A reference theme connected with shared movement.'),
            theme('balance', 'Balance', 'A reference theme connected with steadiness between forces.'),
            theme('receptivity', 'Receptivity', 'A reference theme connected with listening and response.'),
            theme('diplomacy', 'Diplomacy', 'A reference theme connected with careful relational navigation.'),
        ],
        archetypalNotes: 'Number 2 can be treated as a symbolic seed for relational awareness, listening, and finding balance between forces.',
        safeReflectionPrompt: 'Where can cooperation support clarity without becoming self-erasure?',
        sources: [
            source('general_numerology_reference_tradition', 'General numerology reference tradition', 'numerology_reference_tradition', 'Generic curated reference label for numerology meaning traditions.'),
            source('curated_know_thyself_content_note', 'Curated KNOW THYSELF content note', 'curated_note', 'Internal deterministic content note for this symbolic registry.'),
        ],
        warnings: [
            'symbolic_reference_only',
            'not_identity_claim',
            'not_personality_label',
            'not_prediction',
        ],
    },
    {
        key: '3',
        displayName: 'Number 3',
        number: 3,
        numerologyContext: 'Number 3 is commonly used in numerology traditions as a symbolic reference for expression, creativity, communication, and playful emergence.',
        meaningSummary: 'Number 3 is often associated with creative expression, communication, social presence, imagination, and joy. In this project, those meanings are treated only as symbolic reference material.',
        symbolicThemes: [
            theme('expression', 'Expression', 'A reference theme connected with visible communication.'),
            theme('creativity', 'Creativity', 'A reference theme connected with forming new material.'),
            theme('communication', 'Communication', 'A reference theme connected with sharing signals.'),
            theme('imagination', 'Imagination', 'A reference theme connected with inner image-making.'),
        ],
        archetypalNotes: 'Number 3 can be treated as a symbolic seed for shaping inner material into visible expression.',
        safeReflectionPrompt: 'Where can expression become honest and alive without turning into performance pressure?',
        sources: [
            source('general_numerology_reference_tradition', 'General numerology reference tradition', 'numerology_reference_tradition', 'Generic curated reference label for numerology meaning traditions.'),
            source('curated_know_thyself_content_note', 'Curated KNOW THYSELF content note', 'curated_note', 'Internal deterministic content note for this symbolic registry.'),
        ],
        warnings: [
            'symbolic_reference_only',
            'not_identity_claim',
            'not_personality_label',
            'not_prediction',
        ],
    },
    {
        key: '4',
        displayName: 'Number 4',
        number: 4,
        numerologyContext: 'Number 4 is commonly used in numerology traditions as a symbolic reference for structure, discipline, stability, and practical construction.',
        meaningSummary: 'Number 4 is often associated with structure, consistency, method, responsibility, and building something durable. In this project, those meanings are treated only as symbolic reference material.',
        symbolicThemes: [
            theme('structure', 'Structure', 'A reference theme connected with organization and form.'),
            theme('consistency', 'Consistency', 'A reference theme connected with steady repetition.'),
            theme('discipline', 'Discipline', 'A reference theme connected with practical method.'),
            theme('durable_foundation', 'Durable foundation', 'A reference theme connected with stable construction.'),
        ],
        archetypalNotes: 'Number 4 can be treated as a symbolic seed for grounded effort, reliable systems, and practical development.',
        safeReflectionPrompt: 'Where can structure support growth without becoming rigidity?',
        sources: [
            source('general_numerology_reference_tradition', 'General numerology reference tradition', 'numerology_reference_tradition', 'Generic curated reference label for numerology meaning traditions.'),
            source('curated_know_thyself_content_note', 'Curated KNOW THYSELF content note', 'curated_note', 'Internal deterministic content note for this symbolic registry.'),
        ],
        warnings: [
            'symbolic_reference_only',
            'not_identity_claim',
            'not_personality_label',
            'not_prediction',
        ],
    },
    {
        key: '5',
        displayName: 'Number 5',
        number: 5,
        numerologyContext: 'Number 5 is commonly used in numerology traditions as a symbolic reference for change, movement, freedom, adaptation, and experience.',
        meaningSummary: 'Number 5 is often associated with adaptability, freedom, curiosity, movement, and learning through experience. In this project, those meanings are treated only as symbolic reference material.',
        symbolicThemes: [
            theme('change', 'Change', 'A reference theme connected with movement between states.'),
            theme('freedom', 'Freedom', 'A reference theme connected with openness and mobility.'),
            theme('adaptation', 'Adaptation', 'A reference theme connected with responsive adjustment.'),
            theme('experience', 'Experience', 'A reference theme connected with learning through contact.'),
        ],
        archetypalNotes: 'Number 5 can be treated as a symbolic seed for movement, exploration, and learning through contact with life.',
        safeReflectionPrompt: 'Where can freedom create growth without becoming scattered movement?',
        sources: [
            source('general_numerology_reference_tradition', 'General numerology reference tradition', 'numerology_reference_tradition', 'Generic curated reference label for numerology meaning traditions.'),
            source('curated_know_thyself_content_note', 'Curated KNOW THYSELF content note', 'curated_note', 'Internal deterministic content note for this symbolic registry.'),
        ],
        warnings: [
            'symbolic_reference_only',
            'not_identity_claim',
            'not_personality_label',
            'not_prediction',
        ],
    },
    {
        key: '6',
        displayName: 'Number 6',
        number: 6,
        numerologyContext: 'Number 6 is commonly used in numerology traditions as a symbolic reference for care, responsibility, harmony, service, and the shaping of home or community.',
        meaningSummary: 'Number 6 is often associated with care, responsibility, harmony, protection, service, and devotion to what needs support. In this project, those meanings are treated only as symbolic reference material.',
        symbolicThemes: [
            theme('care', 'Care', 'A reference theme connected with tending and support.'),
            theme('responsibility', 'Responsibility', 'A reference theme connected with accountable support.'),
            theme('harmony', 'Harmony', 'A reference theme connected with balance in shared space.'),
            theme('service', 'Service', 'A reference theme connected with practical help.'),
        ],
        archetypalNotes: 'Number 6 can be treated as a symbolic seed for tending, repairing, protecting, and creating harmony in practical life.',
        safeReflectionPrompt: 'Where can care remain generous without becoming over-responsibility?',
        sources: [
            source('general_numerology_reference_tradition', 'General numerology reference tradition', 'numerology_reference_tradition', 'Generic curated reference label for numerology meaning traditions.'),
            source('curated_know_thyself_content_note', 'Curated KNOW THYSELF content note', 'curated_note', 'Internal deterministic content note for this symbolic registry.'),
        ],
        warnings: [
            'symbolic_reference_only',
            'not_identity_claim',
            'not_personality_label',
            'not_prediction',
        ],
    },
    {
        key: '7',
        displayName: 'Number 7',
        number: 7,
        numerologyContext: 'Number 7 is commonly used in numerology traditions as a symbolic reference for inquiry, introspection, analysis, and meaning-seeking.',
        meaningSummary: 'Number 7 is often associated with reflection, analysis, inner study, depth, and the search for meaning. In this project, those meanings are treated only as symbolic reference material.',
        symbolicThemes: [
            theme('reflection', 'Reflection', 'A reference theme connected with inward review.'),
            theme('analysis', 'Analysis', 'A reference theme connected with careful examination.'),
            theme('depth', 'Depth', 'A reference theme connected with looking below the surface.'),
            theme('meaning_seeking', 'Meaning seeking', 'A reference theme connected with searching for patterns.'),
        ],
        archetypalNotes: 'Number 7 can be treated as a symbolic seed for inquiry, contemplation, and the careful search for deeper patterns.',
        safeReflectionPrompt: 'Where can reflection deepen understanding without becoming isolation or over-analysis?',
        sources: [
            source('general_numerology_reference_tradition', 'General numerology reference tradition', 'numerology_reference_tradition', 'Generic curated reference label for numerology meaning traditions.'),
            source('curated_know_thyself_content_note', 'Curated KNOW THYSELF content note', 'curated_note', 'Internal deterministic content note for this symbolic registry.'),
        ],
        warnings: [
            'symbolic_reference_only',
            'not_identity_claim',
            'not_personality_label',
            'not_prediction',
        ],
    },
    {
        key: '8',
        displayName: 'Number 8',
        number: 8,
        numerologyContext: 'Number 8 is commonly used in numerology traditions as a symbolic reference for material responsibility, power, organization, ambition, and consequence.',
        meaningSummary: 'Number 8 is often associated with authority, material responsibility, ambition, management, power, and the practical consequences of action. In this project, those meanings are treated only as symbolic reference material.',
        symbolicThemes: [
            theme('responsibility', 'Responsibility', 'A reference theme connected with accountable structure.'),
            theme('authority', 'Authority', 'A reference theme connected with organized power.'),
            theme('material_structure', 'Material structure', 'A reference theme connected with practical resources.'),
            theme('consequence', 'Consequence', 'A reference theme connected with the effects of action.'),
        ],
        archetypalNotes: 'Number 8 can be treated as a symbolic seed for organizing power, managing resources, and meeting consequences with maturity.',
        safeReflectionPrompt: 'Where can power become responsible structure instead of pressure or control?',
        sources: [
            source('general_numerology_reference_tradition', 'General numerology reference tradition', 'numerology_reference_tradition', 'Generic curated reference label for numerology meaning traditions.'),
            source('curated_know_thyself_content_note', 'Curated KNOW THYSELF content note', 'curated_note', 'Internal deterministic content note for this symbolic registry.'),
        ],
        warnings: [
            'symbolic_reference_only',
            'not_identity_claim',
            'not_personality_label',
            'not_prediction',
        ],
    },
    {
        key: '9',
        displayName: 'Number 9',
        number: 9,
        numerologyContext: 'Number 9 is commonly used in numerology traditions as a symbolic reference for completion, compassion, integration, release, and wider perspective.',
        meaningSummary: 'Number 9 is often associated with completion, compassion, wisdom, release, integration, and a broader view of human experience. In this project, those meanings are treated only as symbolic reference material.',
        symbolicThemes: [
            theme('completion', 'Completion', 'A reference theme connected with closing a cycle.'),
            theme('compassion', 'Compassion', 'A reference theme connected with wider care.'),
            theme('integration', 'Integration', 'A reference theme connected with gathering experience.'),
            theme('release', 'Release', 'A reference theme connected with letting go of carried material.'),
        ],
        archetypalNotes: 'Number 9 can be treated as a symbolic seed for completing cycles, integrating experience, and releasing what no longer needs to be carried.',
        safeReflectionPrompt: 'Where can completion create wisdom without becoming resignation?',
        sources: [
            source('general_numerology_reference_tradition', 'General numerology reference tradition', 'numerology_reference_tradition', 'Generic curated reference label for numerology meaning traditions.'),
            source('curated_know_thyself_content_note', 'Curated KNOW THYSELF content note', 'curated_note', 'Internal deterministic content note for this symbolic registry.'),
        ],
        warnings: [
            'symbolic_reference_only',
            'not_identity_claim',
            'not_personality_label',
            'not_prediction',
        ],
    },
    {
        key: 'generic',
        displayName: 'Generic Numerology Reference',
        number: null,
        numerologyContext: 'The provided numerology value is not currently present in the curated numerology meaning registry.',
        meaningSummary: 'No specific curated numerology meaning is available yet. The value can still be preserved as source calculation data for future interpretation layers.',
        symbolicThemes: [
            theme('source_calculation', 'Source calculation', 'A reference theme connected with preserving calculated input.'),
            theme('symbolic_reference', 'Symbolic reference', 'A reference theme connected with symbolic source material.'),
            theme('future_enrichment', 'Future enrichment', 'A reference theme connected with later curated content expansion.'),
        ],
        archetypalNotes: 'The numerology value is preserved as a source marker until curated symbolic content becomes available.',
        safeReflectionPrompt: 'What personal or reflective meaning may become clearer as this value is contextualized later?',
        sources: [
            source('curated_know_thyself_fallback_note', 'Curated KNOW THYSELF fallback note', 'curated_note', 'Internal deterministic fallback note for unknown numerology content.'),
        ],
        warnings: [
            'fallback_content',
            'number_not_in_registry',
            'symbolic_reference_only',
            'not_identity_claim',
            'not_prediction',
        ],
    },
];
const personalNumerologyMeaningContentKeys = personalNumerologyMeaningContentRecords.map((record) => record.key);
function metadataFor() {
    return {
        deterministic: true,
        generatedBy: personalNumerologyMeaningContentLayerId,
        aiGenerated: false,
        llmGenerated: false,
        source: 'static_curated_registry',
    };
}
export function normalizePersonalNumerologyMeaningKey(inputNumber) {
    if (typeof inputNumber !== 'string' && typeof inputNumber !== 'number') {
        return '';
    }
    const trimmedValue = String(inputNumber).trim();
    if (trimmedValue.length === 0) {
        return '';
    }
    if (!/^\d+$/.test(trimmedValue)) {
        return '';
    }
    return String(Number.parseInt(trimmedValue, 10));
}
export function isPersonalNumerologyMeaningContentKey(value) {
    return typeof value === 'string' && personalNumerologyMeaningContentKeys.includes(value);
}
export function resolvePersonalNumerologyMeaningContent(inputNumber) {
    const normalizedKey = normalizePersonalNumerologyMeaningKey(inputNumber);
    if (normalizedKey === '') {
        return {
            layerId: personalNumerologyMeaningContentLayerId,
            layerVersion: personalNumerologyMeaningContentLayerVersion,
            inputNumber,
            normalizedKey,
            status: 'unavailable',
            record: null,
            warnings: ['missing_numerology_value'],
            metadata: metadataFor(),
        };
    }
    const matchingRecord = personalNumerologyMeaningContentRecords.find((record) => record.key === normalizedKey && record.key !== 'generic');
    if (matchingRecord !== undefined) {
        return {
            layerId: personalNumerologyMeaningContentLayerId,
            layerVersion: personalNumerologyMeaningContentLayerVersion,
            inputNumber,
            normalizedKey,
            status: 'available',
            record: matchingRecord,
            warnings: [...matchingRecord.warnings],
            metadata: metadataFor(),
        };
    }
    const fallbackRecord = personalNumerologyMeaningContentRecords.find((record) => (record.key === 'generic')) ?? null;
    return {
        layerId: personalNumerologyMeaningContentLayerId,
        layerVersion: personalNumerologyMeaningContentLayerVersion,
        inputNumber,
        normalizedKey,
        status: 'fallback_available',
        record: fallbackRecord,
        warnings: fallbackRecord === null ? ['number_not_in_registry'] : [...fallbackRecord.warnings],
        metadata: metadataFor(),
    };
}
