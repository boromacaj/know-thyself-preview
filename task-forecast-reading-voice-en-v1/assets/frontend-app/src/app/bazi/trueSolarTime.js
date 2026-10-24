/**
 * True solar time for BaZi hour-branch charting.
 *
 * Methodology (documented, not hidden):
 * - The true solar instant is computed directly as `UTC + longitude/15h + Equation of Time`,
 *   which is algebraically independent of the civil timezone's standard/DST offset (the two
 *   cancel exactly): civil local time already equals UTC + civilUtcOffsetMinutes, so comparing
 *   the two clock readings automatically nets out any DST contribution without needing to know
 *   whether DST was in effect. No DST-detection heuristic is required or used.
 * - Equation of Time uses the standard trigonometric approximation (day-of-year based), the
 *   same public-domain formula form published by NOAA's solar calculator and countless
 *   independent astronomical references. It is accurate to roughly +/-1-2 minutes across the
 *   year, which is far tighter than the 120-minute-wide BaZi hour-branch window this is used
 *   for. This is a deliberate accuracy/complexity tradeoff, documented here rather than hidden.
 * - This module only computes the TIME correction. Whether the correction actually changes an
 *   Hour Pillar (or crosses local midnight) is decided by the caller (baziEngine.ts), which
 *   also owns the single documented Day Pillar rollover rule.
 */
const MILLISECONDS_PER_MINUTE = 60_000;
const MILLISECONDS_PER_DAY = 86_400_000;
export function calculateTrueSolarTime(input) {
    const utcInstant = new Date(input.utcDateTime);
    const civilLocalDateTime = `${input.localDate}T${input.localTime}`;
    const [year, month, day] = input.localDate.split('-').map(Number);
    const [hour, minute] = input.localTime.split(':').map(Number);
    const civilAsUtcMs = Date.UTC(year, month - 1, day, hour, minute);
    const civilUtcOffsetMinutes = round((civilAsUtcMs - utcInstant.getTime()) / MILLISECONDS_PER_MINUTE);
    const dayOfYear = dayOfYearUtc(utcInstant);
    const equationOfTimeMinutes = round(equationOfTimeMinutesFor(dayOfYear));
    const longitudeMeridianCorrectionMinutes = round((input.longitude * 4) - civilUtcOffsetMinutes);
    const totalCorrectionMinutes = round(longitudeMeridianCorrectionMinutes + equationOfTimeMinutes);
    const trueSolarMs = civilAsUtcMs + totalCorrectionMinutes * MILLISECONDS_PER_MINUTE;
    const trueSolarLocalDateTime = formatNaiveDateTime(new Date(trueSolarMs));
    return {
        utcDateTime: input.utcDateTime,
        longitude: input.longitude,
        civilUtcOffsetMinutes,
        equationOfTimeMinutes,
        longitudeMeridianCorrectionMinutes,
        totalCorrectionMinutes,
        civilLocalDateTime,
        trueSolarLocalDateTime,
        dayOfYear,
    };
}
/**
 * Standard trigonometric Equation-of-Time approximation (NOAA-style day-of-year form).
 * Returns minutes; positive means apparent (true) solar time is ahead of mean solar time.
 */
function equationOfTimeMinutesFor(dayOfYear) {
    const bDegrees = (360 / 365) * (dayOfYear - 81);
    const bRadians = (bDegrees * Math.PI) / 180;
    return (9.87 * Math.sin(2 * bRadians)) - (7.53 * Math.cos(bRadians)) - (1.5 * Math.sin(bRadians));
}
function dayOfYearUtc(date) {
    const startOfYear = Date.UTC(date.getUTCFullYear(), 0, 1);
    const startOfDay = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    return Math.floor((startOfDay - startOfYear) / MILLISECONDS_PER_DAY) + 1;
}
function formatNaiveDateTime(date) {
    const y = String(date.getUTCFullYear()).padStart(4, '0');
    const m = String(date.getUTCMonth() + 1).padStart(2, '0');
    const d = String(date.getUTCDate()).padStart(2, '0');
    const hh = String(date.getUTCHours()).padStart(2, '0');
    const mm = String(date.getUTCMinutes()).padStart(2, '0');
    return `${y}-${m}-${d}T${hh}:${mm}`;
}
function round(value, digits = 6) {
    const scale = 10 ** digits;
    return Math.round(value * scale) / scale;
}
