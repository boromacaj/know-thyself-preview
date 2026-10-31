import { daysInMonth } from '../numerology-forecast/personalCycles.js?v=f9ab0a6';
import { FORECAST_DOMAIN_ORDER, LEVEL_CUTS, levelFor, } from './forecastDomains.js?v=f9ab0a6';
import { LIFE_DYNAMICS_ORDER, LIFE_LEVEL_CUTS, lifeLevelFor, } from './lifeDynamics.js?v=f9ab0a6';
export const AREA_ORDER = {
    legacy: FORECAST_DOMAIN_ORDER,
    'life-dynamics': LIFE_DYNAMICS_ORDER,
};
/** The level of a weight on either model's scale. */
export const areaLevelFor = (id, weight) => (id in LEVEL_CUTS ? levelFor(id, weight) : lifeLevelFor(id, weight));
const areaCuts = (id) => (id in LEVEL_CUTS ? LEVEL_CUTS[id] : LIFE_LEVEL_CUTS[id]);
/** The mean of rows. Keyed by the rows' own ids; an empty list is the legacy five at zero unless told otherwise. */
export function meanWeights(rows, order) {
    const ids = order ?? (rows.length > 0 ? Object.keys(rows[0]) : FORECAST_DOMAIN_ORDER);
    const total = Object.fromEntries(ids.map((id) => [id, 0]));
    if (rows.length === 0)
        return total;
    for (const row of rows)
        for (const id of ids)
            total[id] += row[id] ?? 0;
    for (const id of ids)
        total[id] /= rows.length;
    return total;
}
/** Every day of a month, in order. */
export const daysOfMonth = (year, month) => Array.from({ length: daysInMonth(year, month) }, (_, index) => ({ year, month, day: index + 1 }));
/** Every day of a year, in order. */
export const daysOfYear = (year) => Array.from({ length: 12 }, (_, index) => daysOfMonth(year, index + 1)).flat();
/** One point per day of the month, each exactly what that day's profile shows. */
export function monthSeries(weightsOn, year, month) {
    return daysOfMonth(year, month).map(weightsOn);
}
/** A month as one set of weights: the mean of every one of its days. */
export function monthWeights(weightsOn, year, month) {
    return meanWeights(monthSeries(weightsOn, year, month));
}
/** Twelve points, January to December - each that month's own profile weights. */
export function yearSeries(weightsOn, year) {
    return Array.from({ length: 12 }, (_, index) => monthWeights(weightsOn, year, index + 1));
}
/**
 * The year as one set of weights: every day of it, each counted once.
 *
 * Not the mean of the twelve monthly points, which would count a February day
 * for more than a March one. The two differ in the third decimal; the day is
 * the unit everything else here is built from, so the day is what is counted.
 */
export function yearWeights(weightsOn, year) {
    return meanWeights(daysOfYear(year).map(weightsOn));
}
/**
 * Averaged weights on the same 1-5 scale the day uses. There are no fact ids:
 * an average spans dozens of days, and the trail belongs to each day's own view.
 */
export function profileFromWeights(weights, model = 'legacy') {
    return {
        domains: AREA_ORDER[model].map((id) => ({
            id, level: areaLevelFor(id, weights[id] ?? 0), weight: weights[id] ?? 0, factIds: [],
        })),
    };
}
/*
 * WHERE A POINT SITS ON THE TREND, BETWEEN ITS LEVEL LINES.
 *
 * Plotting the bare level (1-5) would draw a staircase and hide the difference
 * between a weak 4 and a strong one. Plotting the raw weight would put the five
 * areas on five different scales. So a point is placed WITHIN its level's band,
 * by how far through that band its weight lies, and always kept strictly inside
 * it - the curve can never show a point in a different level from the one the
 * card beside it names. The top band has no upper cut, so it is closed at one
 * more band-width above the last.
 */
export function trendPosition(id, weight) {
    const cuts = areaCuts(id);
    const edges = [0, ...cuts, cuts[3] + (cuts[3] - cuts[2])];
    const level = areaLevelFor(id, weight);
    const low = edges[level - 1];
    const high = edges[level];
    const fraction = high > low ? (weight - low) / (high - low) : 0.5;
    const position = level - 0.5 + fraction;
    return Math.min(level + 0.49, Math.max(level - 0.49, position));
}
