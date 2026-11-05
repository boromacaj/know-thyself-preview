export const mercurySignCalculationRequirements = [
    'Birth date',
    'Birth time or exact date context',
    'Timezone or UTC conversion',
    'Astronomical or ephemeris Mercury position calculation',
    'Geocentric ecliptic longitude of Mercury',
    'Mercury zodiac sign from longitude',
];
export const mercurySignPreparedPendingMessage = 'Mercury Sign layer prepared - exact Mercury Sign requires astronomical Mercury position calculation from birth date/time and timezone context. This layer is not calculated in the current prototype.';
export const mercurySignGeneralPendingMessage = 'Mercury Sign pending - exact Mercury Sign requires astronomical Mercury position calculation from birth date/time and timezone context.';
export const mercurySignPrecisionStatusMessages = {
    unavailable_missing_birth_context: {
        status: 'unavailable_missing_birth_context',
        label: 'Missing birth context',
        userMessage: 'Mercury Sign pending - exact Mercury Sign requires birth date/time context and astronomical calculation.',
        technicalRequirement: 'Mercury placement must be calculated from a real birth moment or documented date context, not inferred from another symbolic layer.',
        canDisplayMercurySign: false,
    },
    unavailable_missing_timezone: {
        status: 'unavailable_missing_timezone',
        label: 'Missing timezone',
        userMessage: 'Mercury Sign pending - timezone or UTC conversion is required before calculating Mercury position.',
        technicalRequirement: 'Birth date/time context must be converted into reliable UTC context before astronomical Mercury longitude can be calculated.',
        canDisplayMercurySign: false,
    },
    pending_geo_temporal_resolver: {
        status: 'pending_geo_temporal_resolver',
        label: 'Geo-temporal resolver pending',
        userMessage: 'Mercury Sign pending - the geo-temporal resolver is not active yet, so timezone and birth moment precision remain unresolved.',
        technicalRequirement: 'A resolver must provide reliable timezone or UTC context before the Mercury position engine can run.',
        canDisplayMercurySign: false,
    },
    pending_ephemeris_engine: {
        status: 'pending_ephemeris_engine',
        label: 'Astronomical engine pending',
        userMessage: 'Mercury Sign pending - astronomical Mercury position resolver is not active yet.',
        technicalRequirement: 'An astronomy or ephemeris-backed engine is required to calculate geocentric ecliptic Mercury longitude.',
        canDisplayMercurySign: false,
    },
    calculated_approximate: {
        status: 'calculated_approximate',
        label: 'Calculated approximate',
        userMessage: 'Mercury Sign calculated approximately - review source precision before treating this layer as reliable.',
        technicalRequirement: 'Approximate calculation requires documented birth context, UTC conversion, and an astronomical method with known limitations.',
        canDisplayMercurySign: true,
    },
    calculated_ephemeris_exact: {
        status: 'calculated_ephemeris_exact',
        label: 'Calculated ephemeris exact',
        userMessage: 'Mercury Sign calculated with ephemeris precision from birth context, timezone, and astronomical Mercury position.',
        technicalRequirement: 'Exact calculation requires validated geo-temporal inputs and ephemeris-backed Mercury longitude computation.',
        canDisplayMercurySign: true,
    },
};
export function mercurySignStatusMessage(status) {
    return mercurySignPrecisionStatusMessages[status];
}
