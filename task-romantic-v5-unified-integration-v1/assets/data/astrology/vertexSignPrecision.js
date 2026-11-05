export const vertexSignAstronomyNote = 'Vertex is not a physical planet. It is treated here as a calculated astrological point and symbolic encounter point used in some forms of modern Western astrology.';
export const vertexSignCalculationRequirements = [
    'Birth date',
    'Exact birth time',
    'Birth location',
    'Timezone or UTC conversion',
    'Supported Vertex calculation engine',
    'Validated chart geometry',
    'Supported house system context if required by the future engine',
    'Vertex zodiac sign from a validated future calculation',
];
export const vertexSignPreparedPendingMessage = 'Vertex Sign requires astrological chart geometry based on exact birth date, birth time, birth location, timezone or UTC conversion, and a supported Vertex calculation engine. This foundation currently contains only the interpretation database and precision contract. No Vertex Sign is calculated yet.';
export const vertexSignPrecisionNote = 'Vertex is not a physical planet. It is treated here as a calculated astrological point and symbolic encounter point used in some forms of modern Western astrology. This foundation explains symbolic sign meanings only and does not calculate Vertex longitude, Anti-Vertex, chart geometry, house cusps, prime vertical intersections, or any exact placement.';
export const vertexSignPrecisionStatusMessages = {
    unavailable_missing_birth_context: {
        status: 'unavailable_missing_birth_context',
        label: 'Missing birth context',
        userMessage: 'Vertex Sign pending - exact birth date, birth time, birth location, timezone context, chart geometry, and a supported Vertex calculation engine are required before this point can be calculated.',
        technicalRequirement: 'Vertex Sign cannot be inferred from signs, planets, Chiron, Lunar Nodes, Black Moon Lilith, Part of Fortune, Ascendant, Descendant, houses, aspects, zodiac archetypes, elements, modalities, numerology, gender, sexuality, polarity, relationship status, beliefs, health status, financial status, career status, relationship history, life events, behavior, personality, talents, happiness, success, luck, birth date alone, date ranges, questionnaire answers, location alone, user preference, or previous user data.',
        canDisplayVertexSign: false,
    },
    unavailable_missing_birth_time: {
        status: 'unavailable_missing_birth_time',
        label: 'Missing birth time',
        userMessage: 'Vertex Sign pending - exact birth time is required before future chart geometry can resolve this calculated point.',
        technicalRequirement: 'A precise birth time is required before any future Vertex engine can calculate the relevant chart geometry.',
        canDisplayVertexSign: false,
    },
    unavailable_missing_birth_location: {
        status: 'unavailable_missing_birth_location',
        label: 'Missing birth location',
        userMessage: 'Vertex Sign pending - birth location is required before geo-temporal context and future chart geometry can be resolved.',
        technicalRequirement: 'Birth location is needed for geo-temporal context before a future Vertex calculation engine can run.',
        canDisplayVertexSign: false,
    },
    unavailable_missing_timezone: {
        status: 'unavailable_missing_timezone',
        label: 'Missing timezone',
        userMessage: 'Vertex Sign pending - timezone or UTC conversion is required before a future engine can resolve chart geometry.',
        technicalRequirement: 'Birth date, time, and location must be converted into reliable UTC context before any future Vertex calculation.',
        canDisplayVertexSign: false,
    },
    unavailable_missing_chart_geometry: {
        status: 'unavailable_missing_chart_geometry',
        label: 'Missing chart geometry',
        userMessage: 'Vertex Sign pending - validated chart geometry is required before this symbolic encounter point can be interpreted.',
        technicalRequirement: 'This foundation does not calculate prime vertical intersections, ecliptic intersections, latitude, longitude, chart geometry, Vertex, or Anti-Vertex.',
        canDisplayVertexSign: false,
    },
    unavailable_missing_house_system: {
        status: 'unavailable_missing_house_system',
        label: 'Missing house system',
        userMessage: 'Vertex Sign pending - a supported house or chart context may be required by a future Vertex calculation engine.',
        technicalRequirement: 'This foundation does not select or calculate any house system, house cusps, Ascendant, Descendant, or chart angle geometry.',
        canDisplayVertexSign: false,
    },
    pending_geo_temporal_resolver: {
        status: 'pending_geo_temporal_resolver',
        label: 'Geo-temporal resolver pending',
        userMessage: 'Vertex Sign pending - the geo-temporal resolver is not active yet, so birth moment and timezone precision remain unresolved.',
        technicalRequirement: 'A resolver must provide reliable timezone or UTC context from birth date, exact birth time, and birth location before a future Vertex engine can run.',
        canDisplayVertexSign: false,
    },
    pending_ephemeris_engine: {
        status: 'pending_ephemeris_engine',
        label: 'Ephemeris engine pending',
        userMessage: 'Vertex Sign pending - the astronomical or ephemeris engine is not active yet. This foundation contains interpretation data only.',
        technicalRequirement: 'Future chart calculation may require ephemeris-backed context, but this foundation does not calculate planetary positions or Vertex geometry.',
        canDisplayVertexSign: false,
    },
    pending_ascendant_engine: {
        status: 'pending_ascendant_engine',
        label: 'Ascendant engine pending',
        userMessage: 'Vertex Sign pending - the Ascendant engine is not active yet, so related chart angle context is unavailable.',
        technicalRequirement: 'This foundation does not calculate Ascendant, Descendant, house cusps, Vertex, or Anti-Vertex.',
        canDisplayVertexSign: false,
    },
    pending_house_engine: {
        status: 'pending_house_engine',
        label: 'House engine pending',
        userMessage: 'Vertex Sign pending - the house or chart geometry engine is not active yet, so no Vertex placement is calculated.',
        technicalRequirement: 'A future supported engine must provide chart geometry context before a Vertex sign can be resolved.',
        canDisplayVertexSign: false,
    },
    pending_vertex_engine: {
        status: 'pending_vertex_engine',
        label: 'Vertex engine pending',
        userMessage: 'Vertex Sign pending - no Vertex engine is active yet, so no Vertex placement is calculated.',
        technicalRequirement: 'A dedicated future Vertex engine must calculate the relevant chart geometry before a sign can be resolved.',
        canDisplayVertexSign: false,
    },
    calculated_available: {
        status: 'calculated_available',
        label: 'Calculated available',
        userMessage: 'Vertex Sign calculated by a future Vertex engine. Review source precision and calculation provenance before interpretation.',
        technicalRequirement: 'Display requires validated geo-temporal inputs, supported chart geometry, Vertex placement, and clear calculation provenance.',
        canDisplayVertexSign: true,
    },
};
export function vertexSignStatusMessage(status) {
    return vertexSignPrecisionStatusMessages[status];
}
