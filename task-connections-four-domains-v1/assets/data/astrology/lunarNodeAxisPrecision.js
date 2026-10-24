export const lunarNodeAxisAstronomyNote = 'The Lunar Nodes are calculated astronomical points, not physical planets. They mark where the Moon orbit intersects the ecliptic and are used here as astrological interpretive points.';
export const lunarNodeAxisCalculationRequirements = [
    'Birth date',
    'Exact birth time',
    'Birth location',
    'Timezone or UTC conversion',
    'Selected node method such as mean node or true node',
    'Astronomical or ephemeris lunar node calculation',
    'Lunar Node longitude',
    'North Node and South Node zodiac signs from nodal axis longitude',
];
export const lunarNodeAxisMeaningModel = 'North Node = symbolic growth direction or developmental invitation. South Node = familiar pattern, comfort pattern, or overused default. Node Axis = the relationship between what feels familiar and what asks for development.';
export const lunarNodeAxisPreparedPendingMessage = 'Lunar Nodes require astronomical calculation based on exact birth date, birth time, birth location, timezone or UTC conversion, and a selected node method such as mean node or true node. This foundation currently contains only the interpretation database and precision contract. No Lunar Nodes are calculated yet.';
export const lunarNodeAxisPrecisionNote = 'The Lunar Nodes are calculated astronomical points, not physical planets. This foundation explains the symbolic meaning of nodal sign axes, but does not calculate nodal longitude, mean node, true node, or any exact node placement.';
export const lunarNodeAxisPrecisionStatusMessages = {
    unavailable_missing_birth_context: {
        status: 'unavailable_missing_birth_context',
        label: 'Missing birth context',
        userMessage: 'Lunar Nodes pending - exact birth date, birth time, birth location, timezone context, and a selected node method are required before Lunar Nodes can be calculated.',
        technicalRequirement: 'Lunar Nodes cannot be inferred from signs, planets, Chiron, Ascendant, Descendant, houses, aspects, numerology, gender, polarity, relationship status, beliefs, behavior, personality, life events, trauma history, questionnaire answers, user preference, birth date alone, date ranges, or location alone.',
        canDisplayLunarNodeAxis: false,
    },
    unavailable_missing_birth_time: {
        status: 'unavailable_missing_birth_time',
        label: 'Missing birth time',
        userMessage: 'Lunar Nodes pending - exact birth time is required before a future node engine can resolve the nodal axis safely.',
        technicalRequirement: 'A precise birth time is required to create a reliable birth moment before nodal longitude can be calculated.',
        canDisplayLunarNodeAxis: false,
    },
    unavailable_missing_birth_location: {
        status: 'unavailable_missing_birth_location',
        label: 'Missing birth location',
        userMessage: 'Lunar Nodes pending - birth location is required before timezone context and astronomical calculation can be resolved.',
        technicalRequirement: 'Birth location is needed for geo-temporal context before any future lunar node calculation can run.',
        canDisplayLunarNodeAxis: false,
    },
    unavailable_missing_timezone: {
        status: 'unavailable_missing_timezone',
        label: 'Missing timezone',
        userMessage: 'Lunar Nodes pending - timezone or UTC conversion is required before calculating nodal longitude.',
        technicalRequirement: 'Birth date, time, and location must be converted into reliable UTC context before any future lunar node calculation.',
        canDisplayLunarNodeAxis: false,
    },
    pending_geo_temporal_resolver: {
        status: 'pending_geo_temporal_resolver',
        label: 'Geo-temporal resolver pending',
        userMessage: 'Lunar Nodes pending - the geo-temporal resolver is not active yet, so birth moment and timezone precision remain unresolved.',
        technicalRequirement: 'A resolver must provide reliable timezone or UTC context from birth date, exact birth time, and birth location before a future node engine can run.',
        canDisplayLunarNodeAxis: false,
    },
    pending_ephemeris_engine: {
        status: 'pending_ephemeris_engine',
        label: 'Ephemeris engine pending',
        userMessage: 'Lunar Nodes pending - the astronomical or ephemeris engine is not active yet. This foundation contains interpretation data only.',
        technicalRequirement: 'A future ephemeris-backed engine is required before mean node, true node, or nodal longitude can be calculated.',
        canDisplayLunarNodeAxis: false,
    },
    pending_lunar_node_engine: {
        status: 'pending_lunar_node_engine',
        label: 'Lunar Node engine pending',
        userMessage: 'Lunar Nodes pending - the Lunar Node resolver is not active yet, so no North Node or South Node sign axis is calculated.',
        technicalRequirement: 'A dedicated node engine must calculate nodal longitude and resolve the North Node and South Node signs from a selected node method.',
        canDisplayLunarNodeAxis: false,
    },
    unavailable_missing_node_method: {
        status: 'unavailable_missing_node_method',
        label: 'Missing node method',
        userMessage: 'Lunar Nodes pending - a node method such as mean node or true node must be selected before any future nodal calculation can be interpreted.',
        technicalRequirement: 'This foundation does not calculate mean node or true node and does not select a node method automatically.',
        canDisplayLunarNodeAxis: false,
    },
    calculated_available: {
        status: 'calculated_available',
        label: 'Calculated available',
        userMessage: 'Lunar Nodes calculated by a future node engine. Review source precision and selected node method before interpreting this axis.',
        technicalRequirement: 'Display requires validated geo-temporal inputs, selected node method, ephemeris-backed nodal longitude, and resolved North Node and South Node signs.',
        canDisplayLunarNodeAxis: true,
    },
};
export function lunarNodeAxisStatusMessage(status) {
    return lunarNodeAxisPrecisionStatusMessages[status];
}
