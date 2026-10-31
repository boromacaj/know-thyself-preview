export const ENERGY_FORECAST_DATA_URL = '/know-thyself-preview/task-startup-failure-boundary-v1/data/energy-forecast.json';
export function indexForecast(dataset) {
    const byDate = new Map(dataset.daily.map((day) => [day.date, day]));
    const detailedDates = dataset.daily.map((day) => day.date);
    // A month key maps to the window that actually carries that month's detail.
    // August is split by the generator into an elapsed (1-9) and a forward (10-31)
    // window; the forward one is the one with daily records behind it.
    const monthByKey = new Map();
    for (const window of dataset.months) {
        const key = window.start.slice(0, 7);
        const existing = monthByKey.get(key);
        if (!existing || window.dayCount > existing.dayCount || window.start > existing.start) {
            monthByKey.set(key, window);
        }
    }
    return {
        dataset,
        byDate,
        monthByKey,
        detailedDates,
        firstDetailedDate: detailedDates[0],
        lastDetailedDate: detailedDates[detailedDates.length - 1],
    };
}
export async function loadEnergyForecast(url = ENERGY_FORECAST_DATA_URL) {
    const response = await fetch(url, { headers: { accept: 'application/json' } });
    if (!response.ok) {
        throw new Error(`Energy Forecast dataset could not be loaded (HTTP ${response.status}). Expected it at ${url}.`);
    }
    const dataset = (await response.json());
    if (!Array.isArray(dataset.daily) || dataset.daily.length === 0) {
        throw new Error('Energy Forecast dataset loaded but contains no daily records.');
    }
    return indexForecast(dataset);
}
// ---------------------------------------------------------------------------
// Date helpers (UTC-anchored so no local-timezone drift can shift a calendar cell)
// ---------------------------------------------------------------------------
export function parseIsoDate(iso) {
    return new Date(`${iso}T00:00:00Z`);
}
export function toIsoDate(date) {
    return date.toISOString().slice(0, 10);
}
export function addDays(iso, days) {
    return toIsoDate(new Date(parseIsoDate(iso).getTime() + days * 86_400_000));
}
export function monthKeyOf(iso) {
    return iso.slice(0, 7);
}
/** Monday-based week start, matching the calendar grid. */
export function weekStartOf(iso) {
    const date = parseIsoDate(iso);
    const weekday = (date.getUTCDay() + 6) % 7;
    return addDays(iso, -weekday);
}
export function weekDatesOf(iso) {
    const start = weekStartOf(iso);
    return Array.from({ length: 7 }, (_, offset) => addDays(start, offset));
}
export function monthDatesOf(monthKey) {
    const [year, month] = monthKey.split('-').map(Number);
    const dayCount = new Date(Date.UTC(year, month, 0)).getUTCDate();
    return Array.from({ length: dayCount }, (_, index) => `${monthKey}-${String(index + 1).padStart(2, '0')}`);
}
/** Calendar grid cells for a month, padded to whole Monday-start weeks. */
export function calendarCellsOf(monthKey) {
    const days = monthDatesOf(monthKey);
    const leading = (parseIsoDate(days[0]).getUTCDay() + 6) % 7;
    const trailing = (7 - ((leading + days.length) % 7)) % 7;
    return [
        ...Array.from({ length: leading }, (_, index) => ({ date: addDays(days[0], index - leading), inMonth: false })),
        ...days.map((date) => ({ date, inMonth: true })),
        ...Array.from({ length: trailing }, (_, index) => ({ date: addDays(days[days.length - 1], index + 1), inMonth: false })),
    ];
}
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export function monthLabel(monthKey) {
    const [year, month] = monthKey.split('-').map(Number);
    return `${MONTH_NAMES[month - 1]} ${year}`;
}
export function shortMonthLabel(monthKey) {
    return monthLabel(monthKey).slice(0, 3);
}
export function longDateLabel(iso) {
    const date = parseIsoDate(iso);
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getUTCDay()];
    return `${weekday} ${date.getUTCDate()} ${MONTH_NAMES[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}
export function shortDateLabel(iso) {
    const date = parseIsoDate(iso);
    return `${date.getUTCDate()} ${MONTH_NAMES[date.getUTCMonth()].slice(0, 3)}`;
}
/** Day-of-year fraction, used to place a date on the year ribbon. */
export function yearFraction(iso, year = 2026) {
    const start = Date.UTC(year, 0, 1);
    const end = Date.UTC(year + 1, 0, 1);
    const value = parseIsoDate(iso).getTime();
    return Math.min(1, Math.max(0, (value - start) / (end - start)));
}
/** Clamps a requested date into the range that actually has detailed records. */
export function clampToDetailedRange(iso, index) {
    if (iso < index.firstDetailedDate)
        return index.firstDetailedDate;
    if (iso > index.lastDetailedDate)
        return index.lastDetailedDate;
    return iso;
}
export function hasDetail(iso, index) {
    return index.byDate.has(iso);
}
