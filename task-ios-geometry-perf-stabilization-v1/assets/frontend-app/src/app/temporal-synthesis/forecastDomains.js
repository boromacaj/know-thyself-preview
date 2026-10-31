import { THEME_DEFINITIONS } from '../synthesis/foundation/themeClustering.js?v=d9f39e7';
export const FORECAST_DOMAIN_ORDER = [
    'atmosphere', 'communication', 'relationships', 'private-life', 'work',
];
/*
 * THE ONE NEW MAPPING.
 *
 * Atmosphere is the period's weather rather than a place in a life: its tempo
 * (energy-pace), what is changing (growth), what it is straining (stress-shadow)
 * and how inventive it runs (creativity).
 *
 * Two natal areas are left out on purpose. `core-identity` is who a person is,
 * which a date does not change, and `decision-making` is how they decide, which
 * is a manner rather than an area. Every dimension still reaches at least one of
 * the five through its other areas - asserted in the test - so dropping them
 * loses no signal, only a place to put it that no reader navigates by.
 */
export const LIFE_AREA_GROUP = {
    'energy-pace': 'atmosphere',
    growth: 'atmosphere',
    'stress-shadow': 'atmosphere',
    creativity: 'atmosphere',
    communication: 'communication',
    relationships: 'relationships',
    'social-style': 'relationships',
    'inner-world': 'private-life',
    'work-career': 'work',
    'money-material': 'work',
};
/** Every dimension, with the forecast areas it bears on. Built once, from the theme table. */
export const DOMAINS_BY_DIMENSION = (() => {
    const reach = new Map();
    for (const theme of THEME_DEFINITIONS) {
        for (const dimension of theme.dimensions) {
            const areas = reach.get(dimension) ?? new Set();
            for (const lifeArea of theme.domains) {
                const grouped = LIFE_AREA_GROUP[lifeArea];
                if (grouped)
                    areas.add(grouped);
            }
            reach.set(dimension, areas);
        }
    }
    return new Map([...reach].map(([dimension, areas]) => [
        dimension,
        FORECAST_DOMAIN_ORDER.filter((domain) => areas.has(domain)),
    ]));
})();
/*
 * THE SCALE, AND WHY IT IS PER AREA.
 *
 * Summed straight, the weights say "Work" for almost everyone on almost every
 * day. That is not a finding about anyone. It is the theme table: work-career is
 * a life area of nine of its fourteen themes, so thirteen of the twenty-four
 * dimensions can reach Work and only four can reach Communication. Measured on
 * the reference set below, Work came out strongest on 91% of profile-days and
 * Communication on none - a card row that would have said the same thing to
 * every reader, dressed up as a reading.
 *
 * So each area is read against ITSELF. These are the quintiles of each area's
 * weight across a fixed reference set: fifteen charts (the three QA profiles and
 * the twelve generated ones the forecast tests already use) on four days of every
 * month of 2026 - 720 profile-days. Level 3 is therefore an ordinary day for
 * that area and 5 is one of its most active, and on the reference set every
 * level of every area occurs about a fifth of the time.
 *
 * These are a presentation scale, not a weighting: they change how a weight is
 * SHOWN, never which area leads or what the reading says. If the model changes
 * enough to move them, tests/forecastDomains.test.mjs fails and prints the new
 * values to paste here.
 *
 * Recomputed for the clarity pass, which corrected two mappings in
 * temporalSemantics (a 9 no longer presses `conceptual`, a conjunction no longer
 * presses `emotionally-sensitive`). Weight moved from Atmosphere and
 * Communication toward Private life; left on the old cuts, Communication read
 * "Quiet" on 30% of reference days instead of a fifth. Work is unchanged.
 */
export const LEVEL_CUTS = {
    atmosphere: [0.474, 0.637, 0.783, 1.005],
    communication: [0.169, 0.285, 0.406, 0.502],
    relationships: [0.711, 0.915, 1.097, 1.264],
    'private-life': [0.185, 0.355, 0.645, 1.017],
    work: [1.34, 1.564, 1.795, 2.092],
};
/** Every area's raw weight, with the equal split described in step 4. */
export function domainWeights(synthesis) {
    const weights = Object.fromEntries(FORECAST_DOMAIN_ORDER.map((id) => [id, 0]));
    for (const signal of synthesis.signals) {
        const areas = DOMAINS_BY_DIMENSION.get(signal.dimension) ?? [];
        for (const area of areas)
            weights[area] += signal.weight / areas.length;
    }
    return weights;
}
export const levelFor = (id, weight) => (1 + LEVEL_CUTS[id].filter((cut) => weight > cut).length);
export function forecastDomainProfile(synthesis) {
    const weights = domainWeights(synthesis);
    return {
        domains: FORECAST_DOMAIN_ORDER.map((id) => ({
            id,
            level: levelFor(id, weights[id]),
            weight: weights[id],
            factIds: [...new Set(synthesis.signals
                    .filter((signal) => (DOMAINS_BY_DIMENSION.get(signal.dimension) ?? []).includes(id))
                    .map((signal) => signal.fact.id))],
        })),
    };
}
