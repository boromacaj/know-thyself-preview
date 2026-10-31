/**
 * PERSONAL CYCLES — the Forecast's entry point to the one shared calculation.
 *
 * The arithmetic is not here any more. Personal Year, Month and Day are
 * calculated in core/numerologyMethodology.ts, the same functions the
 * Numerology tab uses, so the two surfaces cannot disagree about the same
 * civil date: they used to be two reducers that agreed only while no master
 * number came up. The contract is docs/numerology/NUMEROLOGY_METHODOLOGY_CONTRACT.md
 * (formulas and masters) together with docs/numerology/FORECAST_METHODOLOGY.md
 * (how the Forecast reads them). If code and contract disagree, one is a bug.
 *
 * Pure integer arithmetic on a calendar date. No clock is read, no timezone is
 * applied, nothing is random: same birth date + same target date = same numbers,
 * for ever. "Today" only ever supplies a default selection, never a result.
 *
 * Master numbers are NOT preserved: personal cycles reduce fully to 1-9, in the
 * parts and in the sums. Personal Year pivots on 1 January, not on the birthday;
 * Personal Month on the 1st; Personal Day at civil midnight.
 */
export { personalCyclesFor, personalDayOf, personalMonthOf, personalMonthsOfYear, personalYearOf, reduceToDigit, } from '../../core/numerologyMethodology.js?v=b5ef5ed';
/* ------------------------------------------------------------------ *
 * Calendar helpers. Plain civil dates; no Date arithmetic across
 * timezones, because these pivots are civil-midnight events.
 * ------------------------------------------------------------------ */
export function daysInMonth(year, month) {
    return new Date(Date.UTC(year, month, 0)).getUTCDate();
}
/** 0 = Monday ... 6 = Sunday. The calendar grid is Monday-first. */
export function weekdayIndex(date) {
    const day = new Date(Date.UTC(date.year, date.month - 1, date.day)).getUTCDay();
    return (day + 6) % 7;
}
export function isValidCalendarDate(date) {
    if (!Number.isInteger(date.year) || !Number.isInteger(date.month) || !Number.isInteger(date.day))
        return false;
    if (date.month < 1 || date.month > 12)
        return false;
    if (date.day < 1)
        return false;
    return date.day <= daysInMonth(date.year, date.month);
}
/** Parses the profile's stored birth date. Accepts YYYY-MM-DD and DD.MM.YYYY. */
export function parseCalendarDate(value) {
    const trimmed = value.trim();
    const iso = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(trimmed);
    if (iso) {
        const date = { year: Number(iso[1]), month: Number(iso[2]), day: Number(iso[3]) };
        return isValidCalendarDate(date) ? date : null;
    }
    const dotted = /^(\d{1,2})[.\/](\d{1,2})[.\/](\d{4})$/.exec(trimmed);
    if (dotted) {
        const date = { year: Number(dotted[3]), month: Number(dotted[2]), day: Number(dotted[1]) };
        return isValidCalendarDate(date) ? date : null;
    }
    return null;
}
export function formatCalendarDate(date) {
    const month = String(date.month).padStart(2, '0');
    const day = String(date.day).padStart(2, '0');
    return `${date.year}-${month}-${day}`;
}
export const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];
export const SHORT_MONTH_NAMES = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];
