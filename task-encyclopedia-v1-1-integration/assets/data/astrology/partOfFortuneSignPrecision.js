export const partOfFortuneSignAstronomyNote = 'Part of Fortune is not a physical planet. It is treated here as a calculated astrological point and astrological interpretive point used in Western astrology.';
export const partOfFortuneSignCalculationRequirements = [
    'Birth date',
    'Exact birth time',
    'Birth location',
    'Timezone or UTC conversion',
    'Sun position',
    'Moon position',
    'Ascendant position',
    'Day or night chart condition',
    'Validated Part of Fortune calculation engine',
    'Part of Fortune zodiac sign from a validated future calculation',
];
export const partOfFortuneSignPreparedPendingMessage = 'Part of Fortune Sign requires astrological calculation based on exact birth date, birth time, birth location, timezone or UTC conversion, Sun position, Moon position, Ascendant position, and day/night chart condition. This foundation currently contains only the interpretation database and precision contract. No Part of Fortune Sign is calculated yet.';
export const partOfFortuneSignPrecisionNote = 'Part of Fortune is not a physical planet. It is treated here as a calculated astrological point used in Western astrology. This foundation explains symbolic sign meanings only and does not calculate Part of Fortune longitude, day/night chart condition, Sun position, Moon position, Ascendant position, or any exact placement.';
export const partOfFortuneSignPrecisionStatusMessages = {
    unavailable_missing_birth_context: {
        status: 'unavailable_missing_birth_context',
        label: 'Missing birth context',
        userMessage: 'Part of Fortune Sign pending - exact birth date, birth time, birth location, timezone context, Sun position, Moon position, Ascendant position, and day/night chart condition are required before this point can be calculated.',
        technicalRequirement: 'Part of Fortune Sign cannot be inferred from signs, planets, Chiron, Lunar Nodes, Black Moon Lilith, Ascendant, Descendant, houses, aspects, zodiac archetypes, elements, modalities, numerology, gender, sexuality, polarity, relationship status, beliefs, health status, financial status, career status, life events, behavior, personality, talents, happiness, success, luck, birth date alone, date ranges, questionnaire answers, location alone, user preference, or previous user data.',
        canDisplayPartOfFortuneSign: false,
    },
    unavailable_missing_birth_time: {
        status: 'unavailable_missing_birth_time',
        label: 'Missing birth time',
        userMessage: 'Part of Fortune Sign pending - exact birth time is required before Sun, Moon, Ascendant, and day/night chart context can be resolved safely.',
        technicalRequirement: 'A precise birth time is required before a future engine can resolve the Ascendant, day/night condition, and Part of Fortune longitude.',
        canDisplayPartOfFortuneSign: false,
    },
    unavailable_missing_birth_location: {
        status: 'unavailable_missing_birth_location',
        label: 'Missing birth location',
        userMessage: 'Part of Fortune Sign pending - birth location is required before timezone context, Ascendant position, and chart condition can be resolved.',
        technicalRequirement: 'Birth location is needed for geo-temporal context and future Ascendant calculation before any Part of Fortune calculation can run.',
        canDisplayPartOfFortuneSign: false,
    },
    unavailable_missing_timezone: {
        status: 'unavailable_missing_timezone',
        label: 'Missing timezone',
        userMessage: 'Part of Fortune Sign pending - timezone or UTC conversion is required before calculating the chart positions used by this point.',
        technicalRequirement: 'Birth date, time, and location must be converted into reliable UTC context before Sun, Moon, Ascendant, day/night condition, or Part of Fortune can be calculated.',
        canDisplayPartOfFortuneSign: false,
    },
    unavailable_missing_sun_position: {
        status: 'unavailable_missing_sun_position',
        label: 'Missing Sun position',
        userMessage: 'Part of Fortune Sign pending - Sun position is required before a future Part of Fortune engine can resolve this point.',
        technicalRequirement: 'This foundation does not calculate Sun longitude or derive it from a date range, sign, or profile value.',
        canDisplayPartOfFortuneSign: false,
    },
    unavailable_missing_moon_position: {
        status: 'unavailable_missing_moon_position',
        label: 'Missing Moon position',
        userMessage: 'Part of Fortune Sign pending - Moon position is required before a future Part of Fortune engine can resolve this point.',
        technicalRequirement: 'This foundation does not calculate Moon longitude or derive it from Moon Sign, date, time, location, or any profile value.',
        canDisplayPartOfFortuneSign: false,
    },
    unavailable_missing_ascendant_position: {
        status: 'unavailable_missing_ascendant_position',
        label: 'Missing Ascendant position',
        userMessage: 'Part of Fortune Sign pending - Ascendant position is required before a future Part of Fortune engine can resolve this point.',
        technicalRequirement: 'This foundation does not calculate Ascendant longitude or infer it from birth context, houses, signs, or user data.',
        canDisplayPartOfFortuneSign: false,
    },
    unavailable_missing_day_night_condition: {
        status: 'unavailable_missing_day_night_condition',
        label: 'Missing day/night chart condition',
        userMessage: 'Part of Fortune Sign pending - day or night chart condition is required before a future calculation can choose the correct calculation path.',
        technicalRequirement: 'This foundation does not calculate sect, day chart, night chart, or any day/night chart condition.',
        canDisplayPartOfFortuneSign: false,
    },
    pending_geo_temporal_resolver: {
        status: 'pending_geo_temporal_resolver',
        label: 'Geo-temporal resolver pending',
        userMessage: 'Part of Fortune Sign pending - the geo-temporal resolver is not active yet, so birth moment and timezone precision remain unresolved.',
        technicalRequirement: 'A resolver must provide reliable timezone or UTC context from birth date, exact birth time, and birth location before chart positions can be calculated.',
        canDisplayPartOfFortuneSign: false,
    },
    pending_ephemeris_engine: {
        status: 'pending_ephemeris_engine',
        label: 'Ephemeris engine pending',
        userMessage: 'Part of Fortune Sign pending - the astronomical or ephemeris engine is not active yet. This foundation contains interpretation data only.',
        technicalRequirement: 'A future ephemeris-backed engine is required before Sun position and Moon position can be calculated.',
        canDisplayPartOfFortuneSign: false,
    },
    pending_ascendant_engine: {
        status: 'pending_ascendant_engine',
        label: 'Ascendant engine pending',
        userMessage: 'Part of Fortune Sign pending - the Ascendant engine is not active yet, so the required Ascendant position is unavailable.',
        technicalRequirement: 'A future Ascendant engine must calculate Ascendant longitude from exact birth context before Part of Fortune can be resolved.',
        canDisplayPartOfFortuneSign: false,
    },
    pending_part_of_fortune_engine: {
        status: 'pending_part_of_fortune_engine',
        label: 'Part of Fortune engine pending',
        userMessage: 'Part of Fortune Sign pending - no Part of Fortune engine is active yet, so no Part of Fortune placement is calculated.',
        technicalRequirement: 'A dedicated engine must use validated Sun position, Moon position, Ascendant position, and day/night chart condition before a sign can be resolved.',
        canDisplayPartOfFortuneSign: false,
    },
    calculated_available: {
        status: 'calculated_available',
        label: 'Calculated available',
        userMessage: 'Part of Fortune Sign calculated by a future Part of Fortune engine. Review source precision, day/night condition, and calculation provenance before interpretation.',
        technicalRequirement: 'Display requires validated geo-temporal inputs, Sun position, Moon position, Ascendant position, day/night chart condition, Part of Fortune longitude, and clear calculation provenance.',
        canDisplayPartOfFortuneSign: true,
    },
};
export function partOfFortuneSignStatusMessage(status) {
    return partOfFortuneSignPrecisionStatusMessages[status];
}
