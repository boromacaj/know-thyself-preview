export const blackMoonLilithSignAstronomyNote = 'Black Moon Lilith is not a physical planet. It is treated here as a calculated lunar apogee point and astrological interpretive point used in modern Western astrology.';
export const blackMoonLilithSignCalculationRequirements = [
    'Birth date',
    'Exact birth time',
    'Birth location',
    'Timezone or UTC conversion',
    'Selected Lilith calculation method such as mean Black Moon Lilith or true Black Moon Lilith',
    'Astronomical or ephemeris lunar apogee calculation',
    'Black Moon Lilith longitude',
    'Black Moon Lilith zodiac sign from longitude',
];
export const blackMoonLilithSignPreparedPendingMessage = 'Black Moon Lilith Sign requires astronomical calculation based on exact birth date, birth time, birth location, timezone or UTC conversion, and a selected Lilith calculation method such as mean Black Moon Lilith or true Black Moon Lilith. This foundation currently contains only the interpretation database and precision contract. No Black Moon Lilith Sign is calculated yet.';
export const blackMoonLilithSignPrecisionNote = 'Black Moon Lilith is not a physical planet. It is treated here as a calculated lunar apogee point and astrological interpretive point used in modern Western astrology. This foundation explains symbolic sign meanings only and does not calculate Black Moon Lilith longitude, mean Lilith, true Lilith, asteroid Lilith, or any exact placement.';
export const blackMoonLilithSignPrecisionStatusMessages = {
    unavailable_missing_birth_context: {
        status: 'unavailable_missing_birth_context',
        label: 'Missing birth context',
        userMessage: 'Black Moon Lilith Sign pending - exact birth date, birth time, birth location, timezone context, and a selected Lilith method are required before this point can be calculated.',
        technicalRequirement: 'Black Moon Lilith cannot be inferred from signs, planets, Chiron, Lunar Nodes, Ascendant, Descendant, houses, aspects, zodiac archetypes, elements, modalities, numerology, gender, sexuality, polarity, relationship status, beliefs, behavior, personality, history, questionnaire answers, birth date alone, date ranges, location alone, user preference, or previous user data.',
        canDisplayBlackMoonLilithSign: false,
    },
    unavailable_missing_birth_time: {
        status: 'unavailable_missing_birth_time',
        label: 'Missing birth time',
        userMessage: 'Black Moon Lilith Sign pending - exact birth time is required before a future lunar apogee engine can resolve this point safely.',
        technicalRequirement: 'A precise birth time is required to create a reliable birth moment before Black Moon Lilith longitude can be calculated.',
        canDisplayBlackMoonLilithSign: false,
    },
    unavailable_missing_birth_location: {
        status: 'unavailable_missing_birth_location',
        label: 'Missing birth location',
        userMessage: 'Black Moon Lilith Sign pending - birth location is required before timezone context and astronomical calculation can be resolved.',
        technicalRequirement: 'Birth location is needed for geo-temporal context before any future Black Moon Lilith calculation can run.',
        canDisplayBlackMoonLilithSign: false,
    },
    unavailable_missing_timezone: {
        status: 'unavailable_missing_timezone',
        label: 'Missing timezone',
        userMessage: 'Black Moon Lilith Sign pending - timezone or UTC conversion is required before calculating Black Moon Lilith longitude.',
        technicalRequirement: 'Birth date, time, and location must be converted into reliable UTC context before any future lunar apogee calculation.',
        canDisplayBlackMoonLilithSign: false,
    },
    unavailable_missing_lilith_method: {
        status: 'unavailable_missing_lilith_method',
        label: 'Missing Lilith method',
        userMessage: 'Black Moon Lilith Sign pending - a calculation method such as mean Black Moon Lilith or true Black Moon Lilith must be selected before interpretation.',
        technicalRequirement: 'This foundation does not calculate mean Black Moon Lilith, true Black Moon Lilith, asteroid Lilith, or select a Lilith method automatically.',
        canDisplayBlackMoonLilithSign: false,
    },
    pending_geo_temporal_resolver: {
        status: 'pending_geo_temporal_resolver',
        label: 'Geo-temporal resolver pending',
        userMessage: 'Black Moon Lilith Sign pending - the geo-temporal resolver is not active yet, so birth moment and timezone precision remain unresolved.',
        technicalRequirement: 'A resolver must provide reliable timezone or UTC context from birth date, exact birth time, and birth location before a future lunar apogee engine can run.',
        canDisplayBlackMoonLilithSign: false,
    },
    pending_ephemeris_engine: {
        status: 'pending_ephemeris_engine',
        label: 'Ephemeris engine pending',
        userMessage: 'Black Moon Lilith Sign pending - the astronomical or ephemeris engine is not active yet. This foundation contains interpretation data only.',
        technicalRequirement: 'A future ephemeris-backed engine is required before any Black Moon Lilith longitude, mean Lilith, or true Lilith value can be calculated.',
        canDisplayBlackMoonLilithSign: false,
    },
    pending_lunar_apogee_engine: {
        status: 'pending_lunar_apogee_engine',
        label: 'Lunar apogee engine pending',
        userMessage: 'Black Moon Lilith Sign pending - no lunar apogee engine is active yet, so no Black Moon Lilith placement is calculated.',
        technicalRequirement: 'A dedicated lunar apogee engine must calculate Black Moon Lilith longitude from a selected method before a sign can be resolved.',
        canDisplayBlackMoonLilithSign: false,
    },
    calculated_available: {
        status: 'calculated_available',
        label: 'Calculated available',
        userMessage: 'Black Moon Lilith Sign calculated by a future lunar apogee engine. Review source precision and selected Lilith method before interpreting this point.',
        technicalRequirement: 'Display requires validated geo-temporal inputs, selected Lilith method, ephemeris-backed lunar apogee longitude, and clear calculation provenance.',
        canDisplayBlackMoonLilithSign: true,
    },
};
export function blackMoonLilithSignStatusMessage(status) {
    return blackMoonLilithSignPrecisionStatusMessages[status];
}
