export const neptuneSignCalculationRequirements = [
    'Birth date',
    'Exact birth time',
    'Birth location',
    'Timezone or UTC conversion',
    'Astronomical or ephemeris Neptune position calculation',
    'Geocentric ecliptic longitude of Neptune',
    'Neptune zodiac sign from longitude',
];
export const neptuneSignPreparedPendingMessage = 'Neptune Sign requires an astronomical calculation based on exact birth date, birth time, and birth location. This foundation currently contains only the interpretation database and precision contract. No Neptune Sign is calculated yet.';
export const neptuneSignGeneralPendingMessage = 'Neptune Sign pending - exact Neptune Sign requires an astronomical calculation based on exact birth date, birth time, birth location, timezone context, and Neptune longitude.';
export const neptuneSignPrecisionStatusMessages = {
    unavailable_missing_birth_context: {
        status: 'unavailable_missing_birth_context',
        label: 'Missing birth context',
        userMessage: 'Neptune Sign pending - exact Neptune Sign requires real birth date, birth time, birth location, and astronomical calculation.',
        technicalRequirement: 'Neptune placement must be calculated from a real birth moment and location context, not inferred from another symbolic layer, numerology, spirituality, dreams, sensitivity, mental health, addiction history, questionnaire answers, or user preference.',
        canDisplayNeptuneSign: false,
    },
    unavailable_missing_birth_time: {
        status: 'unavailable_missing_birth_time',
        label: 'Missing birth time',
        userMessage: 'Neptune Sign pending - exact birth time is required before a future ephemeris engine can calculate Neptune position safely.',
        technicalRequirement: 'A precise birth time is required to create a reliable birth moment before Neptune longitude can be calculated.',
        canDisplayNeptuneSign: false,
    },
    unavailable_missing_birth_location: {
        status: 'unavailable_missing_birth_location',
        label: 'Missing birth location',
        userMessage: 'Neptune Sign pending - birth location is required before timezone context and astronomical calculation can be resolved.',
        technicalRequirement: 'The app needs birth location context to support timezone or UTC conversion before Neptune position calculation.',
        canDisplayNeptuneSign: false,
    },
    unavailable_missing_timezone: {
        status: 'unavailable_missing_timezone',
        label: 'Missing timezone',
        userMessage: 'Neptune Sign pending - timezone or UTC conversion is required before calculating Neptune position.',
        technicalRequirement: 'Birth date, time, and location must be converted into reliable UTC context before astronomical Neptune longitude can be calculated.',
        canDisplayNeptuneSign: false,
    },
    pending_geo_temporal_resolver: {
        status: 'pending_geo_temporal_resolver',
        label: 'Geo-temporal resolver pending',
        userMessage: 'Neptune Sign pending - the geo-temporal resolver is not active yet, so birth moment and timezone precision remain unresolved.',
        technicalRequirement: 'A resolver must provide reliable timezone or UTC context from human-entered birth date, time, and location before the Neptune position engine can run.',
        canDisplayNeptuneSign: false,
    },
    pending_ephemeris_engine: {
        status: 'pending_ephemeris_engine',
        label: 'Astronomical engine pending',
        userMessage: 'Neptune Sign pending - astronomical Neptune position resolver is not active yet. This foundation contains interpretation data only.',
        technicalRequirement: 'An astronomy or ephemeris-backed engine is required to calculate geocentric ecliptic Neptune longitude.',
        canDisplayNeptuneSign: false,
    },
    calculated_available: {
        status: 'calculated_available',
        label: 'Calculated available',
        userMessage: 'Neptune Sign calculated by a future ephemeris engine. Review source precision before interpreting this layer.',
        technicalRequirement: 'Display requires validated geo-temporal inputs and ephemeris-backed Neptune longitude computation.',
        canDisplayNeptuneSign: true,
    },
};
export function neptuneSignStatusMessage(status) {
    return neptuneSignPrecisionStatusMessages[status];
}
