export const jupiterSignCalculationRequirements = [
    'Birth date',
    'Exact birth time',
    'Birth location',
    'Timezone or UTC conversion',
    'Astronomical or ephemeris Jupiter position calculation',
    'Geocentric ecliptic longitude of Jupiter',
    'Jupiter zodiac sign from longitude',
];
export const jupiterSignPreparedPendingMessage = 'Jupiter Sign requires an astronomical calculation based on exact birth date, birth time, and birth location. This foundation currently contains only the interpretation database and precision contract. No Jupiter Sign is calculated yet.';
export const jupiterSignGeneralPendingMessage = 'Jupiter Sign pending - exact Jupiter Sign requires an astronomical calculation based on exact birth date, birth time, birth location, timezone context, and Jupiter longitude.';
export const jupiterSignPrecisionStatusMessages = {
    unavailable_missing_birth_context: {
        status: 'unavailable_missing_birth_context',
        label: 'Missing birth context',
        userMessage: 'Jupiter Sign pending - exact Jupiter Sign requires real birth date, birth time, birth location, and astronomical calculation.',
        technicalRequirement: 'Jupiter placement must be calculated from a real birth moment and location context, not inferred from another symbolic layer, belief system, success, wealth, education, or user preference.',
        canDisplayJupiterSign: false,
    },
    unavailable_missing_birth_time: {
        status: 'unavailable_missing_birth_time',
        label: 'Missing birth time',
        userMessage: 'Jupiter Sign pending - exact birth time is required before a future ephemeris engine can calculate Jupiter position safely.',
        technicalRequirement: 'A precise birth time is required to create a reliable birth moment before Jupiter longitude can be calculated.',
        canDisplayJupiterSign: false,
    },
    unavailable_missing_birth_location: {
        status: 'unavailable_missing_birth_location',
        label: 'Missing birth location',
        userMessage: 'Jupiter Sign pending - birth location is required before timezone context and astronomical calculation can be resolved.',
        technicalRequirement: 'The app needs birth location context to support timezone or UTC conversion before Jupiter position calculation.',
        canDisplayJupiterSign: false,
    },
    unavailable_missing_timezone: {
        status: 'unavailable_missing_timezone',
        label: 'Missing timezone',
        userMessage: 'Jupiter Sign pending - timezone or UTC conversion is required before calculating Jupiter position.',
        technicalRequirement: 'Birth date, time, and location must be converted into reliable UTC context before astronomical Jupiter longitude can be calculated.',
        canDisplayJupiterSign: false,
    },
    pending_geo_temporal_resolver: {
        status: 'pending_geo_temporal_resolver',
        label: 'Geo-temporal resolver pending',
        userMessage: 'Jupiter Sign pending - the geo-temporal resolver is not active yet, so birth moment and timezone precision remain unresolved.',
        technicalRequirement: 'A resolver must provide reliable timezone or UTC context from human-entered birth date, time, and location before the Jupiter position engine can run.',
        canDisplayJupiterSign: false,
    },
    pending_ephemeris_engine: {
        status: 'pending_ephemeris_engine',
        label: 'Astronomical engine pending',
        userMessage: 'Jupiter Sign pending - astronomical Jupiter position resolver is not active yet. This foundation contains interpretation data only.',
        technicalRequirement: 'An astronomy or ephemeris-backed engine is required to calculate geocentric ecliptic Jupiter longitude.',
        canDisplayJupiterSign: false,
    },
    calculated_available: {
        status: 'calculated_available',
        label: 'Calculated available',
        userMessage: 'Jupiter Sign calculated by a future ephemeris engine. Review source precision before interpreting this layer.',
        technicalRequirement: 'Display requires validated geo-temporal inputs and ephemeris-backed Jupiter longitude computation.',
        canDisplayJupiterSign: true,
    },
};
export function jupiterSignStatusMessage(status) {
    return jupiterSignPrecisionStatusMessages[status];
}
