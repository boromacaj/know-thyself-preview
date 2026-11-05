export const plutoSignAstronomyNote = 'Pluto is astronomically classified as a dwarf planet, but is included here as an astrological interpretive body used in modern Western astrology.';
export const plutoSignCalculationRequirements = [
    'Birth date',
    'Exact birth time',
    'Birth location',
    'Timezone or UTC conversion',
    'Astronomical or ephemeris Pluto position calculation',
    'Geocentric ecliptic longitude of Pluto',
    'Pluto zodiac sign from longitude',
];
export const plutoSignPreparedPendingMessage = 'Pluto Sign requires an astronomical calculation based on exact birth date, birth time, and birth location. This foundation currently contains only the interpretation database and precision contract. No Pluto Sign is calculated yet.';
export const plutoSignGeneralPendingMessage = 'Pluto Sign pending - exact Pluto Sign requires an astronomical calculation based on exact birth date, birth time, birth location, timezone context, and Pluto longitude. Pluto is treated here as an astrological interpretive body, not as a classical astronomical planet.';
export const plutoSignPrecisionStatusMessages = {
    unavailable_missing_birth_context: {
        status: 'unavailable_missing_birth_context',
        label: 'Missing birth context',
        userMessage: 'Pluto Sign pending - exact Pluto Sign requires real birth date, birth time, birth location, and astronomical calculation.',
        technicalRequirement: 'Pluto placement must be calculated from a real birth moment and location context, not inferred from another symbolic layer, numerology, trauma history, abuse history, behavior, intensity, control patterns, crisis history, questionnaire answers, or user preference.',
        canDisplayPlutoSign: false,
    },
    unavailable_missing_birth_time: {
        status: 'unavailable_missing_birth_time',
        label: 'Missing birth time',
        userMessage: 'Pluto Sign pending - exact birth time is required before a future ephemeris engine can calculate Pluto position safely.',
        technicalRequirement: 'A precise birth time is required to create a reliable birth moment before Pluto longitude can be calculated.',
        canDisplayPlutoSign: false,
    },
    unavailable_missing_birth_location: {
        status: 'unavailable_missing_birth_location',
        label: 'Missing birth location',
        userMessage: 'Pluto Sign pending - birth location is required before timezone context and astronomical calculation can be resolved.',
        technicalRequirement: 'The app needs birth location context to support timezone or UTC conversion before Pluto position calculation.',
        canDisplayPlutoSign: false,
    },
    unavailable_missing_timezone: {
        status: 'unavailable_missing_timezone',
        label: 'Missing timezone',
        userMessage: 'Pluto Sign pending - timezone or UTC conversion is required before calculating Pluto position.',
        technicalRequirement: 'Birth date, time, and location must be converted into reliable UTC context before astronomical Pluto longitude can be calculated.',
        canDisplayPlutoSign: false,
    },
    pending_geo_temporal_resolver: {
        status: 'pending_geo_temporal_resolver',
        label: 'Geo-temporal resolver pending',
        userMessage: 'Pluto Sign pending - the geo-temporal resolver is not active yet, so birth moment and timezone precision remain unresolved.',
        technicalRequirement: 'A resolver must provide reliable timezone or UTC context from human-entered birth date, time, and location before the Pluto position engine can run.',
        canDisplayPlutoSign: false,
    },
    pending_ephemeris_engine: {
        status: 'pending_ephemeris_engine',
        label: 'Astronomical engine pending',
        userMessage: 'Pluto Sign pending - astronomical Pluto position resolver is not active yet. This foundation contains interpretation data only.',
        technicalRequirement: 'An astronomy or ephemeris-backed engine is required to calculate geocentric ecliptic Pluto longitude. Pluto is included as an astrological interpretive body, while astronomically classified as a dwarf planet.',
        canDisplayPlutoSign: false,
    },
    calculated_available: {
        status: 'calculated_available',
        label: 'Calculated available',
        userMessage: 'Pluto Sign calculated by a future ephemeris engine. Review source precision before interpreting this layer.',
        technicalRequirement: 'Display requires validated geo-temporal inputs and ephemeris-backed Pluto longitude computation.',
        canDisplayPlutoSign: true,
    },
};
export function plutoSignStatusMessage(status) {
    return plutoSignPrecisionStatusMessages[status];
}
