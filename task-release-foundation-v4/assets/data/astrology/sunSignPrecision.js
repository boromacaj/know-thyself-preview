export const sunSignCalculationRequirements = [
    'Birth date',
    'Birth time',
    'Birth location or timezone context',
    'Timezone or UTC conversion',
    'Astronomical or ephemeris Sun position calculation',
    'Geocentric ecliptic longitude of the Sun',
    'Sun zodiac sign from longitude',
];
export const sunSignPreparedPendingMessage = 'Sun Sign requires an astronomical calculation based on birth date, birth time, and timezone context. This foundation currently contains only the interpretation database and precision contract. No Sun Sign is calculated here.';
export const sunSignGeneralPendingMessage = 'Sun Sign pending - exact Sun Sign requires astronomical calculation from birth date, birth time, timezone context, and solar longitude.';
export const sunSignPrecisionStatusMessages = {
    unavailable_missing_birth_context: {
        status: 'unavailable_missing_birth_context',
        label: 'Missing birth context',
        userMessage: 'Sun Sign pending - exact Sun Sign requires real birth date, birth time or timezone context, and astronomical calculation.',
        technicalRequirement: 'Sun placement must be calculated from a real birth moment, not inferred from personality, behavior, preference, numerology, or date ranges alone.',
        canDisplaySunSign: false,
    },
    unavailable_missing_birth_time: {
        status: 'unavailable_missing_birth_time',
        label: 'Missing birth time',
        userMessage: 'Sun Sign pending - birth time helps resolve the birth moment safely before a future solar longitude calculation.',
        technicalRequirement: 'A birth moment is required before solar longitude can be validated, especially near sign boundaries.',
        canDisplaySunSign: false,
    },
    unavailable_missing_birth_location: {
        status: 'unavailable_missing_birth_location',
        label: 'Missing birth location',
        userMessage: 'Sun Sign pending - birth location may be needed to resolve timezone context before astronomical calculation.',
        technicalRequirement: 'Location or an equivalent timezone context is required before converting the birth moment for solar longitude calculation.',
        canDisplaySunSign: false,
    },
    unavailable_missing_timezone: {
        status: 'unavailable_missing_timezone',
        label: 'Missing timezone',
        userMessage: 'Sun Sign pending - timezone or UTC conversion is required before calculating Sun position.',
        technicalRequirement: 'Birth date and time must be converted into reliable UTC context before astronomical Sun longitude calculation.',
        canDisplaySunSign: false,
    },
    pending_geo_temporal_resolver: {
        status: 'pending_geo_temporal_resolver',
        label: 'Geo-temporal resolver pending',
        userMessage: 'Sun Sign pending - the geo-temporal resolver is not active here, so timezone precision remains unresolved.',
        technicalRequirement: 'A resolver must provide reliable timezone or UTC context from birth date, time, and location before Sun position can be calculated.',
        canDisplaySunSign: false,
    },
    pending_ephemeris_engine: {
        status: 'pending_ephemeris_engine',
        label: 'Astronomical engine pending',
        userMessage: 'Sun Sign pending - astronomical Sun position resolver is not active here. This foundation contains interpretation data only.',
        technicalRequirement: 'An astronomy or ephemeris-backed engine is required to calculate geocentric ecliptic Sun longitude.',
        canDisplaySunSign: false,
    },
    calculated_available: {
        status: 'calculated_available',
        label: 'Calculated available',
        userMessage: 'Sun Sign calculated by a future ephemeris engine. Review source precision before interpreting this layer.',
        technicalRequirement: 'Display requires validated geo-temporal inputs and ephemeris-backed Sun longitude computation.',
        canDisplaySunSign: true,
    },
};
export function sunSignStatusMessage(status) {
    return sunSignPrecisionStatusMessages[status];
}
