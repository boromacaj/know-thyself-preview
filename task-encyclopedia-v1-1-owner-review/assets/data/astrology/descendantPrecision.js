export const descendantCalculationRequirements = [
    'Birth date',
    'Exact birth time',
    'Resolved birth location',
    'Latitude and longitude',
    'Timezone or UTC offset for the birth moment',
    'UTC timestamp',
    'Sidereal time calculation',
    'Astronomical horizon and ecliptic calculation',
    'Calculated Ascendant degree',
    'Opposite Descendant degree derived only after Ascendant degree exists',
];
export const descendantPreparedPendingMessage = 'Descendant layer prepared - exact Descendant requires calculated Ascendant degree from birth time, resolved birth location, timezone, and astronomical calculation. This layer is not calculated in the current prototype.';
export const descendantGeneralPendingMessage = 'Descendant pending - exact Descendant requires calculated Ascendant degree from birth time, resolved birth location, timezone, and astronomical calculation.';
export const descendantPrecisionStatusMessages = {
    unavailable_missing_birth_time: {
        status: 'unavailable_missing_birth_time',
        label: 'Missing birth time',
        userMessage: 'Descendant pending - exact Descendant requires exact birth time because it depends on the calculated Ascendant degree.',
        technicalRequirement: 'A precise birth time is required before Ascendant degree, and therefore Descendant degree, can be calculated.',
        canDisplayDescendantSign: false,
    },
    unavailable_missing_resolved_location: {
        status: 'unavailable_missing_resolved_location',
        label: 'Missing resolved location',
        userMessage: 'Descendant pending - exact Descendant requires resolved birth coordinates and location confidence.',
        technicalRequirement: 'The app needs resolved birthplace latitude and longitude before any Ascendant or Descendant calculation can begin.',
        canDisplayDescendantSign: false,
    },
    unavailable_missing_timezone: {
        status: 'unavailable_missing_timezone',
        label: 'Missing timezone',
        userMessage: 'Descendant pending - timezone or UTC conversion for the birth moment is required before calculation.',
        technicalRequirement: 'Birth time must be converted into a reliable UTC timestamp before astronomical horizon calculation can occur.',
        canDisplayDescendantSign: false,
    },
    pending_geo_temporal_resolver: {
        status: 'pending_geo_temporal_resolver',
        label: 'Geo-temporal resolver pending',
        userMessage: 'Descendant pending - the geo-temporal resolver is not active yet, so birthplace and timezone precision remain unresolved.',
        technicalRequirement: 'A resolver must convert human-entered birthplace and local birth time into coordinates and UTC before Ascendant and Descendant are available.',
        canDisplayDescendantSign: false,
    },
    pending_ascendant_engine: {
        status: 'pending_ascendant_engine',
        label: 'Ascendant engine pending',
        userMessage: 'Descendant pending - Descendant requires a calculated Ascendant degree first.',
        technicalRequirement: 'Descendant must not be inferred until a real Ascendant degree exists from astronomical inputs.',
        canDisplayDescendantSign: false,
    },
    pending_ephemeris_engine: {
        status: 'pending_ephemeris_engine',
        label: 'Astronomical engine pending',
        userMessage: 'Descendant pending - astronomical resolver is not active yet.',
        technicalRequirement: 'An astronomy or ephemeris-backed engine is required to calculate Ascendant degree before deriving Descendant degree.',
        canDisplayDescendantSign: false,
    },
    calculated_from_ascendant_degree: {
        status: 'calculated_from_ascendant_degree',
        label: 'Calculated from Ascendant degree',
        userMessage: 'Descendant calculated from a real Ascendant degree. Review Ascendant source precision before interpreting this layer.',
        technicalRequirement: 'A valid Ascendant degree must exist before Descendant can be derived as the opposite ecliptic degree.',
        canDisplayDescendantSign: true,
    },
    calculated_ephemeris_exact: {
        status: 'calculated_ephemeris_exact',
        label: 'Calculated ephemeris exact',
        userMessage: 'Descendant calculated with ephemeris precision from resolved birth time, location, timezone, and Ascendant degree.',
        technicalRequirement: 'Exact calculation requires validated geo-temporal inputs, ephemeris-backed Ascendant degree, and the opposite Descendant degree.',
        canDisplayDescendantSign: true,
    },
};
export function descendantStatusMessage(status) {
    return descendantPrecisionStatusMessages[status];
}
