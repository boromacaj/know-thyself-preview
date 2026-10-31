import { localCivilDayUtcBounds } from '../astrology/timeNormalization.js?v=2ea79e9';
/*
 * THE BIRTH-TIME UNCERTAINTY CONTRACT, IN CODE.
 * docs/product/BIRTH_TIME_INTEGRITY_CONTRACT.md is the prose; this is the one
 * place every system - Western Astrology, BaZi, Human Design, the Cross-Pillar
 * synthesis - gets the same meaning of "which instants could the birth have
 * been".
 *
 * THREE STATES, ONE WINDOW EACH.
 *
 *   exact        the supplied clock time, taken as reliable. The window is that
 *                instant; everything time-dependent is read normally.
 *   approximate  the reader's own estimate. The window is two hours either side
 *                of it, never leaving the birth date the reader gave: the date
 *                is certain, only the clock is estimated. An estimate never
 *                becomes exact and is never treated as missing.
 *   unknown      no time at all. The window is the whole LOCAL CIVIL DAY at the
 *                birth place - 00:00:00 through the last instant before the next
 *                00:00, with the historical offset of that date, so a
 *                daylight-saving day is 23 or 25 hours long and never a UTC day
 *                or "noon plus or minus twelve hours".
 *
 * THE REFERENCE IS NOT EVIDENCE. The engines need one instant to calculate at:
 * the supplied time, or 12:00 local when none was given. For an unknown time
 * that instant is a convenience, not an estimate, and a value read from it may
 * be shown only when a scan of the whole window proves the same value holds
 * everywhere in it (uncertainty/certifiedScan.ts). `referenceMs` is carried so
 * scans can describe the rest of the window relative to what the engine drew;
 * it is never a user-facing time.
 */
/** Minutes either side of an estimated time. One product, one meaning of "an estimate". */
export const APPROXIMATE_WINDOW_MINUTES = 120;
/**
 * The window a birth moment leaves open, or null when the moment is blocked
 * (no date, zone or UTC instant to read a window from).
 */
export function birthTimeWindow(moment, precision = moment.birthTimePrecision ?? 'exact') {
    if (moment.status !== 'ready' || !moment.utcDateTime || !moment.timeZone)
        return null;
    const referenceMs = Date.parse(moment.utcDateTime);
    if (!Number.isFinite(referenceMs))
        return null;
    const base = { precision, timeZone: moment.timeZone, localDate: moment.localDate, referenceMs };
    if (precision === 'exact')
        return { ...base, startMs: referenceMs, endMs: referenceMs, source: 'supplied-time' };
    const day = localCivilDayUtcBounds(moment.localDate, moment.timeZone);
    if (!day)
        return null;
    if (precision === 'approximate') {
        const half = APPROXIMATE_WINDOW_MINUTES * 60_000;
        return {
            ...base,
            startMs: Math.max(day.startMs, referenceMs - half),
            endMs: Math.min(day.endMs, referenceMs + half),
            source: 'estimate-window',
        };
    }
    return { ...base, startMs: day.startMs, endMs: day.endMs, source: 'local-civil-day' };
}
/**
 * The state of one signal from the values it takes across the window and how
 * the surface can present a changing value.
 *
 *   'alternatives'            it can show every value (a sign read both ways)
 *   'value-with-alternatives' it can show the reader's own value with the others
 *                             (approximate only; an unknown time falls back to
 *                             'alternatives')
 *   'none'                    it cannot show a changing value at all
 */
export function signalState(precision, distinctValues, presentation) {
    if (precision === 'exact')
        return 'known';
    if (distinctValues <= 1)
        return 'stable-across-window';
    if (presentation === 'none')
        return 'withheld';
    if (presentation === 'value-with-alternatives' && precision === 'approximate')
        return 'provisional';
    return 'boundary-sensitive';
}
/** A state a reading may state as a fact about the reader (with the one concise time note for a stable one). */
export const readableAsFact = (state) => state === 'known' || state === 'stable-across-window';
/**
 * Local clock time at the birth place, `HH:MM`, for describing where in the
 * window something changes. Rounded to five minutes - the scans are finer, but
 * a reader is only ever told "about 21:35" - and kept inside the window's own
 * day: an instant in the last minutes of the day never reads as the next
 * day's 00:00.
 */
export function localClockLabel(window) {
    const format = new Intl.DateTimeFormat('en-GB', {
        timeZone: window.timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    });
    return (ms) => {
        const rounded = Math.round(ms / 300_000) * 300_000;
        const inside = Math.min(Math.max(rounded, window.startMs), window.endMs);
        return format.format(new Date(inside));
    };
}
