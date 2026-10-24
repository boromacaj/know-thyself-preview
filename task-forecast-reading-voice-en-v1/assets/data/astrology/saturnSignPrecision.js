export const saturnSignCalculationRequirements = [
    'Birth date',
    'Exact birth time',
    'Birth location',
    'Timezone or UTC conversion',
    'Astronomical or ephemeris Saturn position calculation',
    'Geocentric ecliptic longitude of Saturn',
    'Saturn zodiac sign from longitude',
];
export const saturnSignPreparedPendingMessage = 'Saturn Sign requires an astronomical calculation based on exact birth date, birth time, and birth location. This foundation currently contains only the interpretation database and precision contract. No Saturn Sign is calculated yet.';
export const saturnSignGeneralPendingMessage = 'Saturn Sign pending - exact Saturn Sign requires an astronomical calculation based on exact birth date, birth time, birth location, timezone context, and Saturn longitude.';
export const saturnSignPrecisionStatusMessages = {
    unavailable_missing_birth_context: {
        status: 'unavailable_missing_birth_context',
        label: 'Missing birth context',
        userMessage: 'Saturn Sign pending - exact Saturn Sign requires real birth date, birth time, birth location, and astronomical calculation.',
        technicalRequirement: 'Saturn placement must be calculated from a real birth moment and location context, not inferred from another symbolic layer, numerology, fear patterns, behavior, responsibility level, success, failure, or user preference.',
        canDisplaySaturnSign: false,
    },
    unavailable_missing_birth_time: {
        status: 'unavailable_missing_birth_time',
        label: 'Missing birth time',
        userMessage: 'Saturn Sign pending - exact birth time is required before a future ephemeris engine can calculate Saturn position safely.',
        technicalRequirement: 'A precise birth time is required to create a reliable birth moment before Saturn longitude can be calculated.',
        canDisplaySaturnSign: false,
    },
    unavailable_missing_birth_location: {
        status: 'unavailable_missing_birth_location',
        label: 'Missing birth location',
        userMessage: 'Saturn Sign pending - birth location is required before timezone context and astronomical calculation can be resolved.',
        technicalRequirement: 'The app needs birth location context to support timezone or UTC conversion before Saturn position calculation.',
        canDisplaySaturnSign: false,
    },
    unavailable_missing_timezone: {
        status: 'unavailable_missing_timezone',
        label: 'Missing timezone',
        userMessage: 'Saturn Sign pending - timezone or UTC conversion is required before calculating Saturn position.',
        technicalRequirement: 'Birth date, time, and location must be converted into reliable UTC context before astronomical Saturn longitude can be calculated.',
        canDisplaySaturnSign: false,
    },
    pending_geo_temporal_resolver: {
        status: 'pending_geo_temporal_resolver',
        label: 'Geo-temporal resolver pending',
        userMessage: 'Saturn Sign pending - the geo-temporal resolver is not active yet, so birth moment and timezone precision remain unresolved.',
        technicalRequirement: 'A resolver must provide reliable timezone or UTC context from human-entered birth date, time, and location before the Saturn position engine can run.',
        canDisplaySaturnSign: false,
    },
    pending_ephemeris_engine: {
        status: 'pending_ephemeris_engine',
        label: 'Astronomical engine pending',
        userMessage: 'Saturn Sign pending - astronomical Saturn position resolver is not active yet. This foundation contains interpretation data only.',
        technicalRequirement: 'An astronomy or ephemeris-backed engine is required to calculate geocentric ecliptic Saturn longitude.',
        canDisplaySaturnSign: false,
    },
    calculated_available: {
        status: 'calculated_available',
        label: 'Calculated available',
        userMessage: 'Saturn Sign calculated by a future ephemeris engine. Review source precision before interpreting this layer.',
        technicalRequirement: 'Display requires validated geo-temporal inputs and ephemeris-backed Saturn longitude computation.',
        canDisplaySaturnSign: true,
    },
};
export function saturnSignStatusMessage(status) {
    return saturnSignPrecisionStatusMessages[status];
}
