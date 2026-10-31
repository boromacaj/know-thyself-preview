import { LIFE_DYNAMICS_ORDER } from '../temporal-synthesis/lifeDynamics.js?v=f9ab0a6';
import { monthChartSetFromRows, yearChartSetFromRows } from './forecastChartBuilders.js?v=f9ab0a6';
import { chartBoxFor, renderForecastGraph } from './forecastGraphRender.js?v=f9ab0a6';
export const isLifeId = (value) => typeof value === 'string' && LIFE_DYNAMICS_ORDER.includes(value);
export function chartSetForPeriod(kind, period, selected) {
    const reference = Object.fromEntries(period.profile.domains.map((domain) => [domain.id, domain.weight]));
    const options = { birthTimeEstimated: period.birthTimeEstimated ?? null };
    return kind === 'year'
        ? yearChartSetFromRows(period.series, selected.year, reference, options)
        : monthChartSetFromRows(period.series, selected.year, selected.month, reference, options);
}
export const selectedIndexOf = (kind, selected) => (kind === 'year' ? selected.month - 1 : selected.day - 1);
export function selectionFor(kind, focus, selected, compare) {
    return { mode: compare ? 'combined' : 'single', focus, index: selectedIndexOf(kind, selected) };
}
/** The block for the screen. Absent when the period is not on the Life Dynamics model (the Slovak Forecast), so the caller keeps its own graph. */
export function renderGraphBlock(kind, period, focus, selected, options) {
    if (!isLifeId(focus))
        return null;
    const set = chartSetForPeriod(kind, period, selected);
    const selection = selectionFor(kind, focus, selected, options.compare);
    return renderForecastGraph({ set, selection, box: chartBoxFor(options.width, options.compare) });
}
