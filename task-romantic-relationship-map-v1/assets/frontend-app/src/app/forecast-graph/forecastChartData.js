import { daysInMonth } from '../numerology-forecast/personalCycles.js';
import { areaLevelFor, meanWeights, } from '../temporal-synthesis/forecastPeriods.js';
import { LIFE_DYNAMICS_ORDER } from '../temporal-synthesis/lifeDynamics.js';
const validWeight = (value) => typeof value === 'number' && Number.isFinite(value);
export function buildForecastChartSet(input) {
    if (input.samples.length !== input.rows.length) {
        throw new Error(`forecast chart: ${input.samples.length} samples but ${input.rows.length} rows`);
    }
    const series = Object.fromEntries(LIFE_DYNAMICS_ORDER.map((id) => [id, {
            id,
            points: input.samples.map((sample, index) => {
                const weight = input.rows[index]?.[id];
                const assessed = validWeight(weight);
                return {
                    index,
                    date: sample.date,
                    label: sample.label,
                    name: sample.name,
                    status: assessed ? 'assessed' : 'not-assessed',
                    weight: assessed ? weight : null,
                    level: assessed ? areaLevelFor(id, weight) : null,
                };
            }),
        }]));
    return {
        scale: input.scale,
        periodLabel: input.periodLabel,
        order: LIFE_DYNAMICS_ORDER,
        series,
        reference: input.reference ?? null,
        provenance: {
            model: 'life-dynamics-period',
            sampling: input.sampling,
            daysPerSample: input.daysPerSample,
            birthTimeEstimated: input.birthTimeEstimated ?? null,
        },
    };
}
/* ----------------------------------------------------------------- reading a set -- */
export const pointOf = (set, id, index) => set.series[id]?.points[index] ?? null;
export const sampleCount = (set) => set.series[set.order[0]]?.points.length ?? 0;
export const clampIndex = (set, index) => Math.min(Math.max(Math.round(index), 0), Math.max(sampleCount(set) - 1, 0));
/** The level of the period's own average for an area (what the existing panel's gauge shows), or null. */
export function referenceLevel(set, id) {
    const weight = set.reference?.weights[id];
    return validWeight(weight) ? areaLevelFor(id, weight) : null;
}
/**
 * The highest and lowest samples of ONE area. Comparing weights is meaningful within an area (they
 * share a scale); it is never done across areas.
 */
export function extremesOf(set, id) {
    const points = set.series[id]?.points ?? [];
    const assessed = points.filter((point) => point.weight !== null);
    let high = null;
    let low = null;
    for (const point of assessed) {
        if (high === null || point.weight > high.weight)
            high = point;
        if (low === null || point.weight < low.weight)
            low = point;
    }
    const same = (a) => assessed.filter((point) => a !== null && point.weight === a.weight).length - 1;
    return { high, low, highTies: same(high), lowTies: same(low), assessed: assessed.length, missing: points.length - assessed.length };
}
/**
 * The same set with some samples of ONE area marked not assessed. This exists for the renderer's own test fixture
 * (the period model has a weight for every day, so a real Year or Month has no gaps): it proves a missing sample
 * breaks the line, is named in text, and is never drawn as a low level. It does not touch the reference.
 */
export function withMissing(set, id, indices) {
    const blank = new Set(indices);
    const series = { ...set.series };
    series[id] = {
        id,
        points: set.series[id].points.map((point) => (blank.has(point.index)
            ? { ...point, status: 'not-assessed', weight: null, level: null }
            : point)),
    };
    return { ...set, series };
}
/** The mean of a set's own rows, via the existing meanWeights: a window's average, never a stored score. */
export function meanOfSet(set) {
    const rows = [];
    const count = sampleCount(set);
    for (let index = 0; index < count; index += 1) {
        const row = {};
        let complete = true;
        for (const id of set.order) {
            const weight = set.series[id].points[index].weight;
            if (weight === null) {
                complete = false;
                break;
            }
            row[id] = weight;
        }
        if (complete)
            rows.push(row);
    }
    return meanWeights(rows, set.order);
}
/* ------------------------------------------------------------------ windows -- */
/** Civil-date arithmetic by month rollover only: no time zone, no Date objects, DST cannot reach it. */
export function addCalendarDays(date, days) {
    let { year, month, day } = date;
    let remaining = days;
    while (remaining > 0) {
        const room = daysInMonth(year, month) - day;
        if (remaining <= room) {
            day += remaining;
            remaining = 0;
            break;
        }
        remaining -= room + 1;
        day = 1;
        month += 1;
        if (month > 12) {
            month = 1;
            year += 1;
        }
    }
    while (remaining < 0) {
        if (-remaining < day) {
            day += remaining;
            remaining = 0;
            break;
        }
        remaining += day;
        month -= 1;
        if (month < 1) {
            month = 12;
            year -= 1;
        }
        day = daysInMonth(year, month);
    }
    return { year, month, day };
}
/** `length` consecutive civil days starting at `start`. */
export const windowDates = (start, length) => Array.from({ length }, (_, offset) => addCalendarDays(start, offset));
export const sameDate = (a, b) => a.year === b.year && a.month === b.month && a.day === b.day;
export const isoOf = (date) => `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
