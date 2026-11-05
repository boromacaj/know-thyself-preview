export const moonSignCalculationRequirements = [
    'Birth date',
    'Exact birth time',
    'Timezone or resolved birth location',
    'UTC timestamp',
    'Astronomical or ephemeris Moon position calculation',
    'Geocentric ecliptic longitude of the Moon',
    'Moon zodiac sign from longitude',
];
export const moonSignPreparedPendingMessage = 'Moon Sign layer prepared - exact Moon Sign requires birth time, timezone or resolved birth location, and astronomical Moon position calculation. This layer is not calculated in the current prototype.';
export const moonSignGeneralPendingMessage = 'Moon Sign pending - exact Moon Sign requires birth time, timezone or resolved birth location, and astronomical Moon position calculation.';
export const moonSignPrecisionStatusMessages = {
    unavailable_missing_birth_time: {
        status: 'unavailable_missing_birth_time',
        label: 'Missing birth time',
        userMessage: 'Moon Sign pending - exact Moon Sign may require birth time because the Moon can change signs during the day.',
        technicalRequirement: 'A precise birth time is required before the Moon position can be resolved safely for dates near sign changes.',
        canDisplayMoonSign: false,
    },
    unavailable_missing_timezone: {
        status: 'unavailable_missing_timezone',
        label: 'Missing timezone',
        userMessage: 'Moon Sign pending - timezone or UTC conversion is required before calculating the Moon position.',
        technicalRequirement: 'Birth date and time must be converted into a reliable UTC timestamp before astronomical Moon longitude can be calculated.',
        canDisplayMoonSign: false,
    },
    unavailable_missing_resolved_location: {
        status: 'unavailable_missing_resolved_location',
        label: 'Missing resolved location',
        userMessage: 'Moon Sign pending - resolved birth location or timezone context is required before calculation.',
        technicalRequirement: 'The app needs a resolved timezone path, often from birthplace resolution, before calculating the Moon position at birth.',
        canDisplayMoonSign: false,
    },
    pending_geo_temporal_resolver: {
        status: 'pending_geo_temporal_resolver',
        label: 'Geo-temporal resolver pending',
        userMessage: 'Moon Sign pending - the geo-temporal resolver is not active yet, so timezone and birth moment precision remain unresolved.',
        technicalRequirement: 'A resolver must convert human-entered birthplace and local birth time into reliable timezone or UTC context.',
        canDisplayMoonSign: false,
    },
    pending_ephemeris_engine: {
        status: 'pending_ephemeris_engine',
        label: 'Astronomical engine pending',
        userMessage: 'Moon Sign pending - astronomical Moon position resolver is not active yet.',
        technicalRequirement: 'An astronomy or ephemeris-backed engine is required to calculate geocentric ecliptic Moon longitude.',
        canDisplayMoonSign: false,
    },
    calculated_approximate: {
        status: 'calculated_approximate',
        label: 'Calculated approximate',
        userMessage: 'Moon Sign calculated approximately - review source precision before treating this layer as reliable.',
        technicalRequirement: 'Approximate calculation requires birth time, UTC conversion, and a documented astronomical method with known limitations.',
        canDisplayMoonSign: true,
    },
    calculated_ephemeris_exact: {
        status: 'calculated_ephemeris_exact',
        label: 'Calculated ephemeris exact',
        userMessage: 'Moon Sign calculated with ephemeris precision from birth time, timezone or resolved location, and astronomical Moon position.',
        technicalRequirement: 'Exact calculation requires validated geo-temporal inputs and ephemeris-backed Moon longitude computation.',
        canDisplayMoonSign: true,
    },
};
export function moonSignStatusMessage(status) {
    return moonSignPrecisionStatusMessages[status];
}
