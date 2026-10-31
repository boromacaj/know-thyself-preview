import { THEME_DEFINITIONS } from '../synthesis/foundation/themeClustering.js?v=2ea79e9';
export const LIFE_DYNAMICS_ORDER = [
    'mind-focus', 'career-purpose', 'love-connection', 'health-recovery', 'money-resources',
];
/** The one table this module adds: which natal life areas each Life Dynamics area collects. */
export const LIFE_DYNAMICS_GROUP = {
    'decision-making': 'mind-focus',
    'inner-world': 'mind-focus',
    'work-career': 'career-purpose',
    growth: 'career-purpose',
    relationships: 'love-connection',
    'social-style': 'love-connection',
    communication: 'love-connection',
    'energy-pace': 'health-recovery',
    'stress-shadow': 'health-recovery',
    'money-material': 'money-resources',
};
/** Every dimension, with the Life Dynamics areas it bears on. Built once, from the theme table. */
export const LIFE_AREAS_BY_DIMENSION = (() => {
    const reach = new Map();
    for (const theme of THEME_DEFINITIONS) {
        for (const dimension of theme.dimensions) {
            const areas = reach.get(dimension) ?? new Set();
            for (const lifeArea of theme.domains) {
                const grouped = LIFE_DYNAMICS_GROUP[lifeArea];
                if (grouped)
                    areas.add(grouped);
            }
            reach.set(dimension, areas);
        }
    }
    return new Map([...reach].map(([dimension, areas]) => [
        dimension,
        LIFE_DYNAMICS_ORDER.filter((id) => areas.has(id)),
    ]));
})();
/*
 * THE SCALE, PER AREA.
 *
 * The same device as the Day profile's, for the same reason: the areas collect
 * different numbers of dimensions, so raw weights cannot be compared across them.
 * Each area is read against itself - the quintiles of its weight across the fixed
 * reference set (fifteen charts, four days of every month of 2026, 720
 * profile-days). Level 3 is an ordinary period for that area, 5 one of its most
 * emphasised. A presentation scale, not a weighting: it changes how a weight is
 * SHOWN, never which area leads. tests/forecastLifeDynamics.test.mjs fails and
 * prints the new values if the model moves them.
 */
export const LIFE_LEVEL_CUTS = {
    'mind-focus': [0.516, 0.746, 1.033, 1.327],
    'career-purpose': [0.842, 1.025, 1.172, 1.373],
    'love-connection': [0.893, 1.213, 1.568, 1.816],
    'health-recovery': [0.363, 0.491, 0.633, 0.831],
    'money-resources': [0.174, 0.264, 0.354, 0.498],
};
/** Every area's raw weight, with the equal split of the Day profile. */
export function lifeWeights(synthesis) {
    const weights = Object.fromEntries(LIFE_DYNAMICS_ORDER.map((id) => [id, 0]));
    for (const signal of synthesis.signals) {
        const areas = LIFE_AREAS_BY_DIMENSION.get(signal.dimension) ?? [];
        for (const area of areas)
            weights[area] += signal.weight / areas.length;
    }
    return weights;
}
export const lifeLevelFor = (id, weight) => (1 + LIFE_LEVEL_CUTS[id].filter((cut) => weight > cut).length);
export function lifeProfile(synthesis) {
    const weights = lifeWeights(synthesis);
    return {
        domains: LIFE_DYNAMICS_ORDER.map((id) => ({
            id,
            level: lifeLevelFor(id, weights[id]),
            weight: weights[id],
            factIds: [...new Set(synthesis.signals
                    .filter((signal) => (LIFE_AREAS_BY_DIMENSION.get(signal.dimension) ?? []).includes(id))
                    .map((signal) => signal.fact.id))],
        })),
    };
}
