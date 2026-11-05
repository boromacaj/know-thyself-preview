export const VERSIONS = {
    schemaVersion: 'core-prototype-schema-v0.2.0',
    engineVersions: {
        numerology: 'numerology-mvp-engine-v0.2.0',
        geoTemporal: 'geo-temporal-foundation-v0.2.0',
        moonPhase: 'natal-moon-phase-contract-v0.2.0',
    },
    rulesetVersions: {
        numerology: 'numerology-ruleset-v0.1.0',
        traitMapping: 'numerology-trait-mapping-v0.1.0',
        moonPhase: 'moon-phase-calculation-contract-v0.2.0',
    },
    traitTaxonomyVersion: 'trait-taxonomy-v0.1.0',
    synthesisVersion: 'synthesis-v0.1.0',
    forecastScoringVersion: 'forecast-scoring-v0.1.0',
    interpretationVersion: 'presentation-copy-v0.2.0',
};
export const PROTOTYPE_LIMITATIONS = [
    'No astrology, Human Design, BaZi, house, transit, or planetary position calculations are performed in v0.2.',
    'Numerology output is deterministic and ruleset-based; presentation copy is not source-of-truth.',
    'Geo-temporal context preserves birth date, optional birth time, and birthplace text, but coordinates and timezone remain unresolved until resolver integration.',
    'Natal Moon phase remains pending until ephemeris-backed Sun and Moon longitudes exist.',
];
