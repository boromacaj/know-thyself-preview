/** How many days each month has, in a leap year - 29 February is a real date. */
export const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
/** 'MM-DD', the key both lookup directions share. */
export function dateKey(month, day) {
    return `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}
export function isValidCalendarDate(month, day) {
    if (!Number.isInteger(month) || !Number.isInteger(day))
        return false;
    if (month < 1 || month > 12)
        return false;
    return day >= 1 && day <= DAYS_IN_MONTH[month - 1];
}
