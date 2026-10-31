import { localCivilDayUtcBounds } from '../astrology/timeNormalization.js?v=d9f39e7';
import { isValidIanaTimeZone } from '../timezone/ianaTimeZone.js?v=d9f39e7';
export function resolveForecastTimeZone(candidates) {
    const device = candidates.device?.trim();
    if (device && isValidIanaTimeZone(device))
        return { timeZone: device, source: 'device' };
    const birthPlace = candidates.birthPlace?.trim();
    if (birthPlace && isValidIanaTimeZone(birthPlace))
        return { timeZone: birthPlace, source: 'birth-place' };
    return { timeZone: 'UTC', source: 'utc-fallback' };
}
export const isoOfDate = (date) => `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
export function localDayOf(date, zone) {
    const iso = isoOfDate(date);
    const bounds = zone.source === 'utc-fallback' ? null : localCivilDayUtcBounds(iso, zone.timeZone);
    const startMs = bounds?.startMs ?? Date.UTC(date.year, date.month - 1, date.day);
    const endMs = bounds ? bounds.endMs + 1 : startMs + 86_400_000;
    return {
        iso,
        timeZone: bounds ? zone.timeZone : 'UTC',
        timeZoneSource: bounds ? zone.source : 'utc-fallback',
        startUtc: new Date(startMs).toISOString(),
        endUtc: new Date(endMs).toISOString(),
        hours: Math.round(((endMs - startMs) / 3_600_000) * 100) / 100,
    };
}
/** The local clock reading of a UTC instant, for reports ("14:05"). Diagnostics only. */
export function localClock(utcIso, timeZone) {
    return new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
        .format(new Date(utcIso));
}
