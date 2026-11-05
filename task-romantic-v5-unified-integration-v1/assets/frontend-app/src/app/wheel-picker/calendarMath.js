/*
 * CALENDAR MATHS FOR THE WHEEL PICKERS - DETERMINISTIC, NO Date OBJECT, NO TIME ZONE.
 *
 * A birth date is a calendar fact ("31 October 2026"), not an instant. Building it from a JavaScript Date silently adds the machine's time zone (a UTC midnight is the
 * previous evening west of Greenwich), which is how a weekday ends up one day off. Everything here is integer arithmetic on the proleptic Gregorian calendar, so the same
 * year, month and day give the same weekday on every device in every zone.
 *
 * Months are 1..12 and days 1..31 in this module (the picker's own numbers); weekdays are 0 = Sunday .. 6 = Saturday.
 */
export const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
const MONTH_LENGTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
/** Days in a month (month 1..12): 28 or 29 for February by the leap-year rule, else 30 or 31. */
export const daysInMonth = (year, month) => (month === 2 && isLeapYear(year) ? 29 : (MONTH_LENGTHS[month - 1] ?? 31));
/** The weekday of a calendar date, 0 = Sunday .. 6 = Saturday (Sakamoto's method: integer arithmetic only). */
export function weekdayOf(year, month, day) {
    const offsets = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
    const y = month < 3 ? year - 1 : year;
    return (y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + (offsets[month - 1] ?? 0) + day) % 7;
}
/** True for a real calendar date: month 1..12 and a day that exists in that month of that year. */
export const isValidDate = (year, month, day) => (Number.isInteger(year) && Number.isInteger(month) && Number.isInteger(day)
    && year >= 1 && month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth(year, month));
const pad2 = (value) => String(value).padStart(2, '0');
/** `YYYY-MM-DD`, the form the profile stores and the date input carries. */
export const formatIsoDate = (year, month, day) => `${String(year).padStart(4, '0')}-${pad2(month)}-${pad2(day)}`;
/** Reads `YYYY-MM-DD` strictly; anything that is not a real calendar date is null (no rolling over: 2026-02-31 is not a date). */
export function parseIsoDate(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (match === null)
        return null;
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    return isValidDate(year, month, day) ? { year, month, day } : null;
}
/** -1, 0, 1: which of two dates is earlier. */
export const compareDates = (a, b) => (a.year !== b.year ? Math.sign(a.year - b.year) : a.month !== b.month ? Math.sign(a.month - b.month) : Math.sign(a.day - b.day));
/** A day number clamped into the month it has to live in: the 31st becomes the 30th, or the 28th/29th, when the month is shorter. */
export const clampDay = (year, month, day) => Math.max(1, Math.min(day, daysInMonth(year, month)));
/** The months that can be chosen in a year, inside the bounds: [first, last]. */
export function monthRange(year, bounds) {
    return [year === bounds.min.year ? bounds.min.month : 1, year === bounds.max.year ? bounds.max.month : 12];
}
/** The days that can be chosen in a month of a year, inside the bounds: [first, last]. */
export function dayRange(year, month, bounds) {
    const first = year === bounds.min.year && month === bounds.min.month ? bounds.min.day : 1;
    const last = year === bounds.max.year && month === bounds.max.month ? Math.min(bounds.max.day, daysInMonth(year, month)) : daysInMonth(year, month);
    return [first, last];
}
/** Any date forced into the bounds and into a real calendar date (month clamped to the available months, day to the available days). */
export function clampDate(date, bounds) {
    const year = Math.max(bounds.min.year, Math.min(bounds.max.year, date.year));
    const [firstMonth, lastMonth] = monthRange(year, bounds);
    const month = Math.max(firstMonth, Math.min(lastMonth, date.month));
    const [firstDay, lastDay] = dayRange(year, month, bounds);
    return { year, month, day: Math.max(firstDay, Math.min(lastDay, date.day)) };
}
/** Reads `HH:MM` strictly (24-hour clock). */
export function parseClockTime(value) {
    const match = /^(\d{2}):(\d{2})$/.exec(value);
    if (match === null)
        return null;
    const hour = Number(match[1]);
    const minute = Number(match[2]);
    return hour <= 23 && minute <= 59 ? { hour, minute } : null;
}
export const formatClockTime = (hour, minute) => `${pad2(hour)}:${pad2(minute)}`;
