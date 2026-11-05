import { daysOfMonth, meanWeights, monthSeries, yearSeries, yearWeights } from '../temporal-synthesis/forecastPeriods.js';
import { LIFE_DYNAMICS_ORDER } from '../temporal-synthesis/lifeDynamics.js';
import { buildForecastChartSet, windowDates, } from './forecastChartData.js';
/*
 * THE THREE SHAPES OF A CHART SET, BUILT FROM THE EXISTING PERIOD FUNCTIONS.
 *
 *   Year   forecastPeriods.yearSeries            twelve monthly means; reference = yearWeights (the Year panel's gauge)
 *   Month  forecastPeriods.monthSeries           one reading per day;  reference = the mean of those days (the Month panel's gauge)
 *   Window `weightsOn` over N consecutive days   the SAME daily readings the Month graph draws, for a span that may cross a month
 *
 * `weightsOn` is whatever the Forecast already uses to read a day on the period scale: the controller's per-day cache
 * (numerologyForecastExperience.ts) in the product, a memo over buildTemporalSynthesis in the lab. Nothing here calls the
 * model, so asking for a chart set costs the reads that are not already cached, and no more.
 */
const SHORT_MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const LONG_MONTH = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAY = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
/** 0 = Monday, from the civil date alone (the same arithmetic as personalCycles.weekdayIndex). */
const weekdayOf = (date) => WEEKDAY[(new Date(Date.UTC(date.year, date.month - 1, date.day)).getUTCDay() + 6) % 7];
export const dayName = (date) => `${weekdayOf(date)} ${date.day} ${SHORT_MONTH[date.month - 1]} ${date.year}`;
export const monthName = (year, month) => `${LONG_MONTH[month - 1]} ${year}`;
/**
 * From rows the Forecast has ALREADY computed (ForecastPeriodView.series and the weights behind its panel): this is the form the
 * Forecast screen uses, so drawing the graph costs no model run at all. `referenceWeights` are the panel's own (profileFromWeights
 * reads them), so the gauge the graph quotes is the gauge on the screen.
 */
export function yearChartSetFromRows(rows, year, referenceWeights, options = {}) {
    const samples = Array.from({ length: 12 }, (_, index) => ({
        date: { year, month: index + 1, day: 1 },
        label: SHORT_MONTH[index],
        name: monthName(year, index + 1),
    }));
    return buildForecastChartSet({
        scale: 'year',
        periodLabel: String(year),
        samples,
        rows,
        sampling: 'month-mean',
        daysPerSample: null,
        reference: { label: 'Year average', isPanelGauge: true, weights: referenceWeights },
        birthTimeEstimated: options.birthTimeEstimated,
    });
}
export function monthChartSetFromRows(rows, year, month, referenceWeights, options = {}) {
    const days = daysOfMonth(year, month);
    return buildForecastChartSet({
        scale: 'month',
        periodLabel: monthName(year, month),
        samples: days.map((date) => ({ date, label: String(date.day), name: dayName(date) })),
        rows,
        sampling: 'day',
        daysPerSample: 1,
        reference: { label: 'Month average', isPanelGauge: true, weights: referenceWeights },
        birthTimeEstimated: options.birthTimeEstimated,
    });
}
export function yearChartSet(weightsOn, year, options = {}) {
    return yearChartSetFromRows(yearSeries(weightsOn, year), year, yearWeights(weightsOn, year), options);
}
export function monthChartSet(weightsOn, year, month, options = {}) {
    const series = monthSeries(weightsOn, year, month);
    /* The Month panel's five cards ARE the mean of this very curve (forecastPeriods.ts). */
    return monthChartSetFromRows(series, year, month, meanWeights(series, LIFE_DYNAMICS_ORDER), options);
}
export function windowChartSet(weightsOn, start, length, options = {}) {
    const days = windowDates(start, length);
    const rows = days.map(weightsOn);
    const first = days[0];
    const last = days[days.length - 1];
    const span = first.month === last.month && first.year === last.year
        ? `${first.day}–${last.day} ${SHORT_MONTH[last.month - 1]} ${last.year}`
        : `${first.day} ${SHORT_MONTH[first.month - 1]}${first.year === last.year ? '' : ` ${first.year}`} – ${last.day} ${SHORT_MONTH[last.month - 1]} ${last.year}`;
    return buildForecastChartSet({
        scale: 'window',
        periodLabel: span,
        samples: days.map((date) => ({ date, label: String(date.day), name: dayName(date) })),
        rows,
        sampling: 'day',
        daysPerSample: 1,
        /* No existing panel is this span's gauge: it is only the average of what is drawn, and says so. */
        reference: { label: 'Window average', isPanelGauge: false, weights: meanWeights(rows, LIFE_DYNAMICS_ORDER) },
        birthTimeEstimated: options.birthTimeEstimated,
    });
}
