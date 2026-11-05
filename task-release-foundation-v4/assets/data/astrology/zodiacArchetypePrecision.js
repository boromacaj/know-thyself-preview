export const zodiacArchetypeCalculationRequirements = [
    'Standalone reference interpretation maps',
    'Chart weighting system before user-specific dominance or balance',
    'Element balance engine before dominant element output',
    'Modality balance engine before dominant modality output',
    'Clear scoring policy before any user-specific score display',
];
export const zodiacArchetypeMeaningModel = 'Element = the basic symbolic temperament or mode of experience. Modality = the symbolic movement style of a sign. Element plus Modality can help describe sign archetypes, but this foundation does not combine them into sign profiles or user-specific interpretation.';
export const zodiacArchetypePreparedPendingMessage = 'Zodiac Elements and Modalities are available here as standalone reference interpretation maps only. This foundation does not calculate dominant elements, dominant modalities, balance, weighting, scores, or user-specific synthesis.';
export const zodiacArchetypePrecisionNote = 'This foundation explains the symbolic meaning of elements and modalities, but does not assign them to a user, calculate chart balance, or infer personality from them.';
export const zodiacArchetypePrecisionStatusMessages = {
    reference_available: {
        status: 'reference_available',
        label: 'Reference available',
        userMessage: 'Zodiac Elements and Modalities are available as standalone reference maps only. No user-specific dominance, balance, score, or synthesis is calculated.',
        technicalRequirement: 'Reference maps may be displayed as general astrology education without assigning element or modality traits to a user.',
        canDisplayReferenceMaps: true,
        canDisplayUserSpecificBalance: false,
    },
    unavailable_user_specific_context: {
        status: 'unavailable_user_specific_context',
        label: 'User-specific context unavailable',
        userMessage: 'User-specific element or modality interpretation is unavailable because this foundation does not assign elements or modalities to a person.',
        technicalRequirement: 'Do not infer dominance, balance, temperament, personality, or identity from Sun Sign, Moon Sign, Ascendant, planets, houses, aspects, Chiron, Lunar Nodes, numerology, questionnaire answers, behavior, gender, polarity, birth date alone, date ranges, or user preference.',
        canDisplayReferenceMaps: true,
        canDisplayUserSpecificBalance: false,
    },
    pending_chart_weighting_system: {
        status: 'pending_chart_weighting_system',
        label: 'Chart weighting system pending',
        userMessage: 'Element and modality balance pending - no chart weighting system exists yet, so user-specific element or modality emphasis is not calculated.',
        technicalRequirement: 'A future weighting policy would be required before any chart-based element or modality balance could be computed.',
        canDisplayReferenceMaps: true,
        canDisplayUserSpecificBalance: false,
    },
    pending_element_balance_engine: {
        status: 'pending_element_balance_engine',
        label: 'Element balance engine pending',
        userMessage: 'Dominant element pending - no element balance engine exists yet, so Fire, Earth, Air, or Water emphasis is not calculated.',
        technicalRequirement: 'A future element balance engine and approved weighting policy would be required before displaying any dominant element or element balance.',
        canDisplayReferenceMaps: true,
        canDisplayUserSpecificBalance: false,
    },
    pending_modality_balance_engine: {
        status: 'pending_modality_balance_engine',
        label: 'Modality balance engine pending',
        userMessage: 'Dominant modality pending - no modality balance engine exists yet, so Cardinal, Fixed, or Mutable emphasis is not calculated.',
        technicalRequirement: 'A future modality balance engine and approved weighting policy would be required before displaying any dominant modality or modality balance.',
        canDisplayReferenceMaps: true,
        canDisplayUserSpecificBalance: false,
    },
    calculated_available: {
        status: 'calculated_available',
        label: 'Calculated available',
        userMessage: 'Element or modality balance calculated by a future approved engine. Review weighting policy, source inputs, and limitations before interpreting output.',
        technicalRequirement: 'Display requires an approved chart weighting system, element balance engine, modality balance engine, scoring policy, and clear provenance.',
        canDisplayReferenceMaps: true,
        canDisplayUserSpecificBalance: true,
    },
};
export function zodiacArchetypeStatusMessage(status) {
    return zodiacArchetypePrecisionStatusMessages[status];
}
