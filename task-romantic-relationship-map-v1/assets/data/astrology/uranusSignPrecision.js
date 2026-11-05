export const uranusSignCalculationRequirements = [
    'Birth date',
    'Exact birth time',
    'Birth location',
    'Timezone or UTC conversion',
    'Astronomical or ephemeris Uranus position calculation',
    'Geocentric ecliptic longitude of Uranus',
    'Uranus zodiac sign from longitude',
];
export const uranusSignPreparedPendingMessage = 'Uranus Sign requires an astronomical calculation based on exact birth date, birth time, and birth location. This foundation currently contains only the interpretation database and precision contract. No Uranus Sign is calculated yet.';
export const uranusSignGeneralPendingMessage = 'Uranus Sign pending - exact Uranus Sign requires an astronomical calculation based on exact birth date, birth time, birth location, timezone context, and Uranus longitude.';
export const uranusSignPrecisionStatusMessages = {
    unavailable_missing_birth_context: {
        status: 'unavailable_missing_birth_context',
        label: 'Missing birth context',
        userMessage: 'Uranus Sign pending - exact Uranus Sign requires real birth date, birth time, birth location, and astronomical calculation.',
        technicalRequirement: 'Uranus placement must be calculated from a real birth moment and location context, not inferred from another symbolic layer, numerology, personality, creativity, intelligence, technology interest, political views, rebellion, or user preference.',
        canDisplayUranusSign: false,
    },
    unavailable_missing_birth_time: {
        status: 'unavailable_missing_birth_time',
        label: 'Missing birth time',
        userMessage: 'Uranus Sign pending - exact birth time is required before a future ephemeris engine can calculate Uranus position safely.',
        technicalRequirement: 'A precise birth time is required to create a reliable birth moment before Uranus longitude can be calculated.',
        canDisplayUranusSign: false,
    },
    unavailable_missing_birth_location: {
        status: 'unavailable_missing_birth_location',
        label: 'Missing birth location',
        userMessage: 'Uranus Sign pending - birth location is required before timezone context and astronomical calculation can be resolved.',
        technicalRequirement: 'The app needs birth location context to support timezone or UTC conversion before Uranus position calculation.',
        canDisplayUranusSign: false,
    },
    unavailable_missing_timezone: {
        status: 'unavailable_missing_timezone',
        label: 'Missing timezone',
        userMessage: 'Uranus Sign pending - timezone or UTC conversion is required before calculating Uranus position.',
        technicalRequirement: 'Birth date, time, and location must be converted into reliable UTC context before astronomical Uranus longitude can be calculated.',
        canDisplayUranusSign: false,
    },
    pending_geo_temporal_resolver: {
        status: 'pending_geo_temporal_resolver',
        label: 'Geo-temporal resolver pending',
        userMessage: 'Uranus Sign pending - the geo-temporal resolver is not active yet, so birth moment and timezone precision remain unresolved.',
        technicalRequirement: 'A resolver must provide reliable timezone or UTC context from human-entered birth date, time, and location before the Uranus position engine can run.',
        canDisplayUranusSign: false,
    },
    pending_ephemeris_engine: {
        status: 'pending_ephemeris_engine',
        label: 'Astronomical engine pending',
        userMessage: 'Uranus Sign pending - astronomical Uranus position resolver is not active yet. This foundation contains interpretation data only.',
        technicalRequirement: 'An astronomy or ephemeris-backed engine is required to calculate geocentric ecliptic Uranus longitude.',
        canDisplayUranusSign: false,
    },
    calculated_available: {
        status: 'calculated_available',
        label: 'Calculated available',
        userMessage: 'Uranus Sign calculated by a future ephemeris engine. Review source precision before interpreting this layer.',
        technicalRequirement: 'Display requires validated geo-temporal inputs and ephemeris-backed Uranus longitude computation.',
        canDisplayUranusSign: true,
    },
};
export function uranusSignStatusMessage(status) {
    return uranusSignPrecisionStatusMessages[status];
}
