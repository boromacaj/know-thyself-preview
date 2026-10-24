export const houseCalculationRequirements = [
    'Birth date',
    'Exact birth time',
    'Birth location',
    'Timezone or UTC conversion',
    'Selected house system',
    'Ascendant calculation',
    'MC and IC calculation',
    'House cusp calculation',
];
export const houseMeaningModel = 'Planet or body = what kind of symbolic function is active. Sign = how that function expresses itself. House = where, or in which life area, that function may be reflected.';
export const housePreparedPendingMessage = 'House placement requires an astronomical and geo-temporal calculation based on exact birth date, exact birth time, birth location, timezone or UTC conversion, and a selected house system. This foundation currently contains only the house interpretation database and precision contract. No houses are calculated yet.';
export const housePrecisionNote = 'Astrological houses are symbolic life areas. This foundation explains the meaning of each house, but does not calculate house cusps, planetary house placements, Ascendant, MC, IC, or any house system.';
export const housePrecisionStatusMessages = {
    unavailable_missing_birth_context: {
        status: 'unavailable_missing_birth_context',
        label: 'Missing birth context',
        userMessage: 'House placement pending - exact birth date, exact birth time, birth location, timezone context, and a selected house system are required before houses can be calculated.',
        technicalRequirement: 'Houses cannot be inferred from signs, planets, numerology, gender, polarity, questionnaire answers, user preference, birth date alone, date ranges, location alone, or Ascendant alone.',
        canDisplayHousePlacements: false,
    },
    unavailable_missing_birth_time: {
        status: 'unavailable_missing_birth_time',
        label: 'Missing birth time',
        userMessage: 'House placement pending - exact birth time is required before Ascendant, MC, IC, and house cusps can be calculated.',
        technicalRequirement: 'A precise birth time is required to establish angles and house cusps for any future house system.',
        canDisplayHousePlacements: false,
    },
    unavailable_missing_birth_location: {
        status: 'unavailable_missing_birth_location',
        label: 'Missing birth location',
        userMessage: 'House placement pending - birth location is required before timezone context and house calculation can be resolved.',
        technicalRequirement: 'Birth location is needed for geo-temporal context before any future Ascendant, MC, IC, or house cusp calculation.',
        canDisplayHousePlacements: false,
    },
    unavailable_missing_timezone: {
        status: 'unavailable_missing_timezone',
        label: 'Missing timezone',
        userMessage: 'House placement pending - timezone or UTC conversion is required before calculating house angles or cusps.',
        technicalRequirement: 'Birth date, time, and location must be converted into reliable UTC context before any house system can be calculated.',
        canDisplayHousePlacements: false,
    },
    unavailable_missing_house_system: {
        status: 'unavailable_missing_house_system',
        label: 'Missing house system',
        userMessage: 'House placement pending - a house system must be selected before any future house cusp calculation can be interpreted.',
        technicalRequirement: 'No Placidus, Whole Sign, Equal House, Koch, Regiomontanus, Campanus, Porphyry, or other house system is selected or calculated in this foundation.',
        canDisplayHousePlacements: false,
    },
    pending_geo_temporal_resolver: {
        status: 'pending_geo_temporal_resolver',
        label: 'Geo-temporal resolver pending',
        userMessage: 'House placement pending - the geo-temporal resolver is not active yet, so birth moment and timezone precision remain unresolved.',
        technicalRequirement: 'A resolver must provide reliable timezone or UTC context from birth date, exact birth time, and birth location before house calculation can run.',
        canDisplayHousePlacements: false,
    },
    pending_ascendant_mc_engine: {
        status: 'pending_ascendant_mc_engine',
        label: 'Ascendant and MC engine pending',
        userMessage: 'House placement pending - Ascendant, MC, IC, and angle calculation are not active yet. This foundation contains interpretation data only.',
        technicalRequirement: 'A future astronomical angle engine is required before house cusps or chart angles can be calculated.',
        canDisplayHousePlacements: false,
    },
    pending_house_system_engine: {
        status: 'pending_house_system_engine',
        label: 'House system engine pending',
        userMessage: 'House placement pending - no house system engine is active yet, so house cusps and planetary house placements are not calculated.',
        technicalRequirement: 'A selected house system and validated angle calculations are required before any house cusp or placement output can be displayed.',
        canDisplayHousePlacements: false,
    },
    calculated_available: {
        status: 'calculated_available',
        label: 'Calculated available',
        userMessage: 'House placements calculated by a future house engine. Review source precision and selected house system before interpreting placements.',
        technicalRequirement: 'Display requires validated geo-temporal inputs, calculated Ascendant, MC, IC, selected house system, house cusps, and placement computation.',
        canDisplayHousePlacements: true,
    },
};
export function houseStatusMessage(status) {
    return housePrecisionStatusMessages[status];
}
