export const venusSignCalculationRequirements = [
    'Birth date',
    'Exact birth time',
    'Birth location',
    'Timezone or UTC conversion',
    'Astronomical or ephemeris Venus position calculation',
    'Geocentric ecliptic longitude of Venus',
    'Venus zodiac sign from longitude',
];
export const venusSignPreparedPendingMessage = 'Venus Sign requires an astronomical calculation based on exact birth date, birth time, and birth location. This foundation currently contains only the interpretation database and precision contract. No Venus Sign is calculated yet.';
export const venusSignGeneralPendingMessage = 'Venus Sign pending - exact Venus Sign requires an astronomical calculation based on exact birth date, birth time, birth location, timezone context, and Venus longitude.';
export const venusSignPrecisionStatusMessages = {
    unavailable_missing_birth_context: {
        status: 'unavailable_missing_birth_context',
        label: 'Missing birth context',
        userMessage: 'Venus Sign pending - exact Venus Sign requires real birth date, birth time, birth location, and astronomical calculation.',
        technicalRequirement: 'Venus placement must be calculated from a real birth moment and location context, not inferred from another symbolic layer or user preference.',
        canDisplayVenusSign: false,
    },
    unavailable_missing_birth_time: {
        status: 'unavailable_missing_birth_time',
        label: 'Missing birth time',
        userMessage: 'Venus Sign pending - exact birth time is required before a future ephemeris engine can calculate Venus position safely.',
        technicalRequirement: 'A precise birth time is required to create a reliable birth moment before Venus longitude can be calculated.',
        canDisplayVenusSign: false,
    },
    unavailable_missing_birth_location: {
        status: 'unavailable_missing_birth_location',
        label: 'Missing birth location',
        userMessage: 'Venus Sign pending - birth location is required before timezone context and astronomical calculation can be resolved.',
        technicalRequirement: 'The app needs birth location context to support timezone or UTC conversion before Venus position calculation.',
        canDisplayVenusSign: false,
    },
    unavailable_missing_timezone: {
        status: 'unavailable_missing_timezone',
        label: 'Missing timezone',
        userMessage: 'Venus Sign pending - timezone or UTC conversion is required before calculating Venus position.',
        technicalRequirement: 'Birth date, time, and location must be converted into reliable UTC context before astronomical Venus longitude can be calculated.',
        canDisplayVenusSign: false,
    },
    pending_geo_temporal_resolver: {
        status: 'pending_geo_temporal_resolver',
        label: 'Geo-temporal resolver pending',
        userMessage: 'Venus Sign pending - the geo-temporal resolver is not active yet, so birth moment and timezone precision remain unresolved.',
        technicalRequirement: 'A resolver must provide reliable timezone or UTC context from human-entered birth date, time, and location before the Venus position engine can run.',
        canDisplayVenusSign: false,
    },
    pending_ephemeris_engine: {
        status: 'pending_ephemeris_engine',
        label: 'Astronomical engine pending',
        userMessage: 'Venus Sign pending - astronomical Venus position resolver is not active yet. This foundation contains interpretation data only.',
        technicalRequirement: 'An astronomy or ephemeris-backed engine is required to calculate geocentric ecliptic Venus longitude.',
        canDisplayVenusSign: false,
    },
    calculated_available: {
        status: 'calculated_available',
        label: 'Calculated available',
        userMessage: 'Venus Sign calculated by a future ephemeris engine. Review source precision before interpreting this layer.',
        technicalRequirement: 'Display requires validated geo-temporal inputs and ephemeris-backed Venus longitude computation.',
        canDisplayVenusSign: true,
    },
};
export function venusSignStatusMessage(status) {
    return venusSignPrecisionStatusMessages[status];
}
