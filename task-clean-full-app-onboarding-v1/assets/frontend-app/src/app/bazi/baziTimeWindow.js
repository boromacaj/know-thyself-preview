import { birthTimeWindow, localClockLabel } from '../uncertainty/birthTimeWindow.js?v=f9ab0a6';
import { calculateBaziLive } from './baziEngine.js?v=f9ab0a6';
const HOUR_STEP_MINUTES = 5;
export function scanBaziTimeWindow(moment, precision, longitude) {
    if (precision === 'exact' || moment.status !== 'ready' || longitude === null)
        return null;
    const window = birthTimeWindow(moment, precision);
    if (!window)
        return null;
    const label = localClockLabel(window);
    const clock = new Intl.DateTimeFormat('en-GB', {
        timeZone: window.timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    });
    const supplied = precision === 'approximate';
    const cache = new Map();
    const chartAt = (ms) => {
        const cached = cache.get(ms);
        if (cached)
            return cached;
        const chart = calculateBaziLive({
            ...moment,
            utcDateTime: new Date(ms).toISOString(),
            julianDate: ms / 86_400_000 + 2_440_587.5,
            localTime: clock.format(new Date(ms)),
        }, supplied, longitude);
        cache.set(ms, chart);
        return chart;
    };
    /* A monotonic pillar: the same at both ends holds throughout; else bisect each change. */
    const monotonic = (read) => {
        const values = [read(chartAt(window.startMs))];
        const changesAt = [];
        const settle = (from, to) => {
            const a = read(chartAt(from));
            const b = read(chartAt(to));
            if (a === b)
                return;
            if (to - from <= 60_000) {
                values.push(b);
                changesAt.push(label(to));
                return;
            }
            const middle = from + Math.floor((to - from) / 2);
            settle(from, middle);
            settle(middle, to);
        };
        settle(window.startMs, window.endMs);
        return { values, changesAt };
    };
    const year = monotonic((chart) => chart.yearPillar?.label ?? '');
    const month = monotonic((chart) => chart.monthPillar?.label ?? '');
    let hour = null;
    if (supplied) {
        const hourAt = (ms) => chartAt(ms).hourPillar?.label ?? '';
        /* The first minute in (from, to] at which the hour pillar is no longer `value`. */
        const changeAfter = (from, to, value) => {
            let low = from;
            let high = to;
            while (high - low > 60_000) {
                const middle = low + Math.floor((high - low) / 2);
                if (hourAt(middle) === value)
                    low = middle;
                else
                    high = middle;
            }
            return high;
        };
        const values = [hourAt(window.startMs)];
        const changesAt = [];
        let previous = window.startMs;
        const step = HOUR_STEP_MINUTES * 60_000;
        for (let ms = window.startMs + step;; ms += step) {
            const at = Math.min(ms, window.endMs);
            const value = hourAt(at);
            if (value !== values[values.length - 1]) {
                changesAt.push(label(changeAfter(previous, at, values[values.length - 1])));
                values.push(value);
            }
            previous = at;
            if (at === window.endMs)
                break;
        }
        hour = { values, changesAt };
    }
    const ageRange = (direction) => {
        const ages = [chartAt(window.startMs), chartAt(window.referenceMs), chartAt(window.endMs)]
            .map((chart) => chart.luckPillars?.[direction]?.startAgeYears)
            .filter((age) => typeof age === 'number' && Number.isFinite(age));
        return ages.length === 0 ? null : [Math.min(...ages), Math.max(...ages)];
    };
    return { window, year, month, hour, luckStartAges: { forward: ageRange('forward'), reverse: ageRange('reverse') } };
}
/** A start age read to the precision the window allows: `9.4–9.8`, or `~6.9` when both ends round alike. */
export function luckAgeText(range, offsetYears = 0) {
    const [from, to] = [range[0] + offsetYears, range[1] + offsetYears];
    const low = from.toFixed(1);
    const high = to.toFixed(1);
    return low === high ? `~${low}` : `${low}–${high}`;
}
