export const marsSignCalculationRequirements = [
    'Birth date',
    'Exact birth time',
    'Birth location',
    'Timezone or UTC conversion',
    'Astronomical or ephemeris Mars position calculation',
    'Geocentric ecliptic longitude of Mars',
    'Mars zodiac sign from longitude',
];
export const marsSignPreparedPendingMessage = 'Mars Sign requires an astronomical calculation based on exact birth date, birth time, and birth location. This foundation currently contains only the interpretation database and precision contract. No Mars Sign is calculated yet.';
export const marsSignGeneralPendingMessage = 'Mars Sign pending - exact Mars Sign requires an astronomical calculation based on exact birth date, birth time, birth location, timezone context, and Mars longitude.';
export const marsSignPrecisionStatusMessages = {
    unavailable_missing_birth_context: {
        status: 'unavailable_missing_birth_context',
        label: 'Missing birth context',
        userMessage: 'Mars Sign pending - exact Mars Sign requires real birth date, birth time, birth location, and astronomical calculation.',
        technicalRequirement: 'Mars placement must be calculated from a real birth moment and location context, not inferred from another symbolic layer, behavior, desire, anger style, or user preference.',
        canDisplayMarsSign: false,
    },
    unavailable_missing_birth_time: {
        status: 'unavailable_missing_birth_time',
        label: 'Missing birth time',
        userMessage: 'Mars Sign pending - exact birth time is required before a future ephemeris engine can calculate Mars position safely.',
        technicalRequirement: 'A precise birth time is required to create a reliable birth moment before Mars longitude can be calculated.',
        canDisplayMarsSign: false,
    },
    unavailable_missing_birth_location: {
        status: 'unavailable_missing_birth_location',
        label: 'Missing birth location',
        userMessage: 'Mars Sign pending - birth location is required before timezone context and astronomical calculation can be resolved.',
        technicalRequirement: 'The app needs birth location context to support timezone or UTC conversion before Mars position calculation.',
        canDisplayMarsSign: false,
    },
    unavailable_missing_timezone: {
        status: 'unavailable_missing_timezone',
        label: 'Missing timezone',
        userMessage: 'Mars Sign pending - timezone or UTC conversion is required before calculating Mars position.',
        technicalRequirement: 'Birth date, time, and location must be converted into reliable UTC context before astronomical Mars longitude can be calculated.',
        canDisplayMarsSign: false,
    },
    pending_geo_temporal_resolver: {
        status: 'pending_geo_temporal_resolver',
        label: 'Geo-temporal resolver pending',
        userMessage: 'Mars Sign pending - the geo-temporal resolver is not active yet, so birth moment and timezone precision remain unresolved.',
        technicalRequirement: 'A resolver must provide reliable timezone or UTC context from human-entered birth date, time, and location before the Mars position engine can run.',
        canDisplayMarsSign: false,
    },
    pending_ephemeris_engine: {
        status: 'pending_ephemeris_engine',
        label: 'Astronomical engine pending',
        userMessage: 'Mars Sign pending - astronomical Mars position resolver is not active yet. This foundation contains interpretation data only.',
        technicalRequirement: 'An astronomy or ephemeris-backed engine is required to calculate geocentric ecliptic Mars longitude.',
        canDisplayMarsSign: false,
    },
    calculated_available: {
        status: 'calculated_available',
        label: 'Calculated available',
        userMessage: 'Mars Sign calculated by a future ephemeris engine. Review source precision before interpreting this layer.',
        technicalRequirement: 'Display requires validated geo-temporal inputs and ephemeris-backed Mars longitude computation.',
        canDisplayMarsSign: true,
    },
};
export function marsSignStatusMessage(status) {
    return marsSignPrecisionStatusMessages[status];
}
