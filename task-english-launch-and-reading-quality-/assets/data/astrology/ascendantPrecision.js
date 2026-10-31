export const ascendantCalculationRequirements = [
    'Birth date',
    'Exact birth time',
    'Resolved birth location',
    'Latitude and longitude',
    'Timezone or UTC offset for the birth moment',
    'UTC timestamp',
    'Sidereal time calculation',
    'Astronomical horizon and ecliptic calculation',
];
export const ascendantPreparedPendingMessage = 'Ascendant layer prepared - exact Rising Sign requires birth time, resolved birth location, timezone, and astronomical calculation. This layer is not calculated in the current prototype.';
export const ascendantGeneralPendingMessage = 'Ascendant pending - exact Rising Sign requires birth time, resolved birth location, timezone, and astronomical calculation.';
export const ascendantPrecisionStatusMessages = {
    unavailable_missing_birth_time: {
        status: 'unavailable_missing_birth_time',
        label: 'Missing birth time',
        userMessage: 'Ascendant pending - enter an exact birth time before a future resolver can calculate the Rising Sign.',
        technicalRequirement: 'A precise birth time is required because the Ascendant changes quickly through the day.',
        canDisplayAscendantSign: false,
    },
    unavailable_missing_resolved_location: {
        status: 'unavailable_missing_resolved_location',
        label: 'Missing resolved location',
        userMessage: 'Ascendant pending - exact Rising Sign also requires resolved birth coordinates and location confidence.',
        technicalRequirement: 'The app needs a resolved birthplace with latitude and longitude before astronomical calculation can begin.',
        canDisplayAscendantSign: false,
    },
    unavailable_missing_timezone: {
        status: 'unavailable_missing_timezone',
        label: 'Missing timezone',
        userMessage: 'Ascendant pending - timezone or UTC conversion for the birth moment is required before calculation.',
        technicalRequirement: 'Birth time must be converted into a reliable UTC timestamp using the correct local timezone rules.',
        canDisplayAscendantSign: false,
    },
    pending_geo_temporal_resolver: {
        status: 'pending_geo_temporal_resolver',
        label: 'Geo-temporal resolver pending',
        userMessage: 'Ascendant pending - the geo-temporal resolver is not active yet, so birthplace and timezone precision remain unresolved.',
        technicalRequirement: 'A resolver must convert human-entered birthplace and local birth time into coordinates and UTC.',
        canDisplayAscendantSign: false,
    },
    pending_ephemeris_engine: {
        status: 'pending_ephemeris_engine',
        label: 'Astronomical engine pending',
        userMessage: 'Ascendant pending - astronomical horizon and ecliptic calculation is not active yet.',
        technicalRequirement: 'An astronomy or ephemeris-backed engine is required to calculate the eastern horizon intersection with the ecliptic.',
        canDisplayAscendantSign: false,
    },
    calculated_approximate: {
        status: 'calculated_approximate',
        label: 'Calculated approximate',
        userMessage: 'Ascendant calculated approximately - review source precision before treating this layer as reliable.',
        technicalRequirement: 'Approximate calculation requires birth time, coordinates, timezone conversion, and an astronomical method with known limitations.',
        canDisplayAscendantSign: true,
    },
    calculated_ephemeris_exact: {
        status: 'calculated_ephemeris_exact',
        label: 'Calculated ephemeris exact',
        userMessage: 'Ascendant calculated with ephemeris precision from resolved birth time, location, timezone, and astronomical calculation.',
        technicalRequirement: 'Exact calculation requires validated geo-temporal inputs and ephemeris-backed horizon/ecliptic computation.',
        canDisplayAscendantSign: true,
    },
};
export function ascendantStatusMessage(status) {
    return ascendantPrecisionStatusMessages[status];
}
