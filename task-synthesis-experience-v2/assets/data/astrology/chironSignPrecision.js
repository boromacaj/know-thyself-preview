export const chironSignAstronomyNote = 'Chiron is not a classical astronomical planet. It is treated here as an astrological interpretive body used in modern Western astrology.';
export const chironSignMinorBodyNote = 'Chiron is commonly classified as a minor body or centaur in astronomy and is used here only as an astrological interpretive body.';
export const chironSignCalculationRequirements = [
    'Birth date',
    'Exact birth time',
    'Birth location',
    'Timezone or UTC conversion',
    'Astronomical or ephemeris Chiron position calculation',
    'Geocentric ecliptic longitude of Chiron as a minor body',
    'Chiron zodiac sign from longitude',
];
export const chironSignPreparedPendingMessage = 'Chiron Sign requires an astronomical calculation based on exact birth date, birth time, and birth location. This foundation currently contains only the interpretation database and precision contract. No Chiron Sign is calculated yet.';
export const chironSignGeneralPendingMessage = 'Chiron Sign pending - exact Chiron Sign requires an astronomical calculation based on exact birth date, birth time, birth location, timezone context, and Chiron longitude. Chiron is treated here as an astrological interpretive body, not as a classical astronomical planet.';
export const chironSignPrecisionStatusMessages = {
    unavailable_missing_birth_context: {
        status: 'unavailable_missing_birth_context',
        label: 'Missing birth context',
        userMessage: 'Chiron Sign pending - exact Chiron Sign requires real birth date, birth time, birth location, and astronomical calculation.',
        technicalRequirement: 'Chiron placement must be calculated from a real birth moment and location context, not inferred from another symbolic layer, numerology, trauma history, abuse history, pain, wounds, sensitivity, mental health, medical history, questionnaire answers, or user preference.',
        canDisplayChironSign: false,
    },
    unavailable_missing_birth_time: {
        status: 'unavailable_missing_birth_time',
        label: 'Missing birth time',
        userMessage: 'Chiron Sign pending - exact birth time is required before a future ephemeris engine can calculate Chiron position safely.',
        technicalRequirement: 'A precise birth time is required to create a reliable birth moment before Chiron longitude can be calculated.',
        canDisplayChironSign: false,
    },
    unavailable_missing_birth_location: {
        status: 'unavailable_missing_birth_location',
        label: 'Missing birth location',
        userMessage: 'Chiron Sign pending - birth location is required before timezone context and astronomical calculation can be resolved.',
        technicalRequirement: 'The app needs birth location context to support timezone or UTC conversion before Chiron position calculation.',
        canDisplayChironSign: false,
    },
    unavailable_missing_timezone: {
        status: 'unavailable_missing_timezone',
        label: 'Missing timezone',
        userMessage: 'Chiron Sign pending - timezone or UTC conversion is required before calculating Chiron position.',
        technicalRequirement: 'Birth date, time, and location must be converted into reliable UTC context before astronomical Chiron longitude can be calculated.',
        canDisplayChironSign: false,
    },
    pending_geo_temporal_resolver: {
        status: 'pending_geo_temporal_resolver',
        label: 'Geo-temporal resolver pending',
        userMessage: 'Chiron Sign pending - the geo-temporal resolver is not active yet, so birth moment and timezone precision remain unresolved.',
        technicalRequirement: 'A resolver must provide reliable timezone or UTC context from human-entered birth date, time, and location before the Chiron position engine can run.',
        canDisplayChironSign: false,
    },
    pending_ephemeris_engine: {
        status: 'pending_ephemeris_engine',
        label: 'Astronomical engine pending',
        userMessage: 'Chiron Sign pending - astronomical Chiron position resolver is not active yet. This foundation contains interpretation data only.',
        technicalRequirement: 'An astronomy or ephemeris-backed engine is required to calculate geocentric ecliptic Chiron longitude. Chiron is included as an astrological interpretive body, while astronomically classified as a minor body or centaur.',
        canDisplayChironSign: false,
    },
    calculated_available: {
        status: 'calculated_available',
        label: 'Calculated available',
        userMessage: 'Chiron Sign calculated by a future ephemeris engine. Review source precision before interpreting this layer.',
        technicalRequirement: 'Display requires validated geo-temporal inputs and ephemeris-backed Chiron longitude computation.',
        canDisplayChironSign: true,
    },
};
export function chironSignStatusMessage(status) {
    return chironSignPrecisionStatusMessages[status];
}
