export const zodiacSignArchetypeCalculationRequirements = [
    'Standalone zodiac sign archetype reference map',
    'Element and modality reference associations',
    'Sun Sign resolver before user-specific Sun Sign output',
    'Chart weighting system before sign dominance output',
    'Element and modality balance engine before balance output',
    'Approved scoring policy before any score display',
];
export const zodiacSignArchetypeMeaningModel = 'Element = basic symbolic temperament or mode of experience. Modality = symbolic movement style. Zodiac Sign = a specific archetypal expression created through element, modality, and sign symbolism.';
export const zodiacSignArchetypePreparedPendingMessage = 'Zodiac Sign Archetypes are available here as standalone reference interpretation maps only. This foundation does not assign a zodiac archetype to a user, calculate sign dominance, calculate element or modality balance, score placements, or create user-specific synthesis.';
export const zodiacSignArchetypePrecisionNote = 'This foundation explains the symbolic meaning of the 12 zodiac sign archetypes, including their element and modality associations. It does not calculate a user sign, infer personality, assign identity, or connect these archetypes to a user profile.';
export const zodiacSignArchetypePrecisionStatusMessages = {
    reference_available: {
        status: 'reference_available',
        label: 'Reference available',
        userMessage: 'Zodiac Sign Archetypes are available as standalone reference maps only. No user-specific sign assignment, dominance, balance, score, or synthesis is calculated.',
        technicalRequirement: 'Reference maps may be displayed as general astrology education without assigning a sign archetype, personality, identity, or temperament to a user.',
        canDisplayReferenceMap: true,
        canDisplayUserSpecificAssignment: false,
    },
    unavailable_user_specific_assignment: {
        status: 'unavailable_user_specific_assignment',
        label: 'User-specific assignment unavailable',
        userMessage: 'User-specific Zodiac Sign Archetype assignment is unavailable because this foundation does not calculate or infer a user sign.',
        technicalRequirement: 'Do not infer zodiac sign archetype from birth date, date ranges, Sun Sign, Moon Sign, Ascendant, Descendant, planets, houses, aspects, Chiron, Lunar Nodes, numerology, questionnaire answers, behavior, personality, gender, polarity, location, user preference, or previous user data.',
        canDisplayReferenceMap: true,
        canDisplayUserSpecificAssignment: false,
    },
    pending_sun_sign_resolver: {
        status: 'pending_sun_sign_resolver',
        label: 'Sun Sign resolver pending',
        userMessage: 'Zodiac Sign Archetype assignment pending - no Sun Sign resolver is active here, so no sign is assigned to a user.',
        technicalRequirement: 'A future resolver would be required before any user-specific Sun Sign output could be connected to sign archetype interpretation.',
        canDisplayReferenceMap: true,
        canDisplayUserSpecificAssignment: false,
    },
    pending_chart_weighting_system: {
        status: 'pending_chart_weighting_system',
        label: 'Chart weighting system pending',
        userMessage: 'Zodiac sign dominance pending - no chart weighting system exists here, so sign emphasis or dominance is not calculated.',
        technicalRequirement: 'A future approved chart weighting policy would be required before any sign dominance or sign weighting output could be computed.',
        canDisplayReferenceMap: true,
        canDisplayUserSpecificAssignment: false,
    },
    pending_element_modality_balance_engine: {
        status: 'pending_element_modality_balance_engine',
        label: 'Element and modality balance engine pending',
        userMessage: 'Element and modality balance pending - no balance engine exists here, so element or modality emphasis is not calculated from sign archetypes.',
        technicalRequirement: 'A future element and modality balance engine would be required before any balance, dominance, or weighting output could be displayed.',
        canDisplayReferenceMap: true,
        canDisplayUserSpecificAssignment: false,
    },
    calculated_available: {
        status: 'calculated_available',
        label: 'Calculated available',
        userMessage: 'Zodiac sign archetype output calculated by a future approved engine. Review source inputs, weighting policy, and limitations before interpreting output.',
        technicalRequirement: 'Display requires validated source inputs, approved resolver, chart weighting policy, element and modality balance policy, scoring rules, and clear provenance.',
        canDisplayReferenceMap: true,
        canDisplayUserSpecificAssignment: true,
    },
};
export function zodiacSignArchetypeStatusMessage(status) {
    return zodiacSignArchetypePrecisionStatusMessages[status];
}
