import { SearchMoonPhase, Seasons } from 'astronomy-engine';
import { apparentLongitudeOf } from '../astrology/ephemerisEngine.js?v=b5ef5ed';
import { localDateKey } from '../numerology-forecast/lunarGuidance.js?v=b5ef5ed';
export const SIGN_NAMES = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const TARGET_LONGITUDE = { new: 0, full: 180 };
const normalise = (degrees) => ((degrees % 360) + 360) % 360;
/** A longitude as a sign and the position in it. Truncated, never rounded up across a sign boundary. */
export function placementOf(longitude) {
    const value = normalise(longitude);
    const signIndex = Math.min(11, Math.floor(value / 30));
    const inSign = value - signIndex * 30;
    const degree = Math.min(29, Math.floor(inSign));
    const minute = Math.min(59, Math.floor((inSign - degree) * 60));
    return { sign: SIGN_NAMES[signIndex], signIndex, degree, minute };
}
const MONTH_NAMES = [
    'Wolf', 'Snow', 'Worm', 'Pink', 'Flower', 'Strawberry', 'Buck', 'Sturgeon', 'Corn', 'Hunters', 'Beaver', 'Cold',
];
const DAY_MS = 86_400_000;
/* (the Harvest Moon search below needs only the day, so it uses the unrefined instants) */
function fullMoonsAround(year) {
    const from = new Date(Date.UTC(year, 7, 1));
    const found = [];
    let cursor = from;
    for (let i = 0; i < 5; i += 1) {
        const hit = SearchMoonPhase(180, cursor, 40);
        if (!hit)
            break;
        found.push(hit.date);
        cursor = new Date(hit.date.getTime() + DAY_MS);
    }
    return found;
}
/** The Harvest Moon of a year: the Full Moon nearest the September equinox. */
export function harvestMoonOf(year) {
    const equinox = Seasons(year).sep_equinox.date.getTime();
    const candidates = fullMoonsAround(year);
    return candidates.reduce((best, current) => (Math.abs(current.getTime() - equinox) < Math.abs(best.getTime() - equinox) ? current : best));
}
export function traditionalNameOf(instant, timeZone) {
    const key = localDateKey(toNearestMinute(instant), timeZone);
    const year = Number(key.slice(0, 4));
    const month = Number(key.slice(5, 7));
    /* the same Full Moon found by two searches agrees to the millisecond or so, never exactly: compare within an hour */
    if (Math.abs(instant.getTime() - harvestMoonOf(year).getTime()) < 3_600_000)
        return 'Harvest';
    /* the other months by the table (September's is then the Corn Moon and October's the Hunter's Moon; in a year the Harvest Moon is October's there is no Hunter's Moon, and November's is the Beaver Moon) */
    return MONTH_NAMES[month - 1];
}
/* ----------------------------------------------------------------- events -- */
/**
 * THE INSTANT, ON THE NATAL CHART'S OWN LONGITUDES. astronomy-engine's SearchMoonPhase finds the root of its own longitude difference, which leaves out the aberration of the Sun's light (20.5 arc-seconds,
 * about 37 seconds of the Moon's motion), so its instant is a half minute later than the one the apparent positions give - the ones NASA, the Naval Observatory and JPL Horizons use, and the ones the natal
 * chart is made of. The search result is therefore only the starting point: the instant is refined by bisection on (apparent Moon - apparent Sun - target) within ten minutes of it, a fixed number of
 * steps, so the same longitudes the chart uses are exactly 180 (or 0) degrees apart at the instant shown.
 */
function refinedInstant(kind, rough) {
    const target = TARGET_LONGITUDE[kind];
    const f = (ms) => {
        const at = new Date(ms);
        const moon = apparentLongitudeOf('Moon', at) ?? 0;
        const sun = apparentLongitudeOf('Sun', at) ?? 0;
        return ((((moon - sun - target) % 360) + 540) % 360) - 180;
    };
    let low = rough.getTime() - 600_000;
    let high = rough.getTime() + 600_000;
    if (!(f(low) < 0 && f(high) > 0))
        return rough;
    for (let i = 0; i < 40; i += 1) {
        const mid = (low + high) / 2;
        if (f(mid) < 0)
            low = mid;
        else
            high = mid;
    }
    return new Date(Math.round((low + high) / 2));
}
function eventFrom(kind, instant, timeZone) {
    const moon = apparentLongitudeOf('Moon', instant) ?? 0;
    const sun = apparentLongitudeOf('Sun', instant) ?? 0;
    const m = placementOf(moon);
    const s = placementOf(sun);
    return {
        kind, instant, moonLongitude: moon, sunLongitude: sun,
        moonSign: m.sign, moonDegree: m.degree, moonMinute: m.minute,
        sunSign: s.sign, sunDegree: s.degree, sunMinute: s.minute,
        traditionalName: kind === 'full' ? traditionalNameOf(instant, timeZone) : null,
    };
}
/**
 * The event as a clock shows it: to the nearest minute, as every published table gives it (NASA, the Naval Observatory, timeanddate). The instant itself is kept exact; the minute is what the
 * reader's date and time are read from, so the date can never disagree with the time printed beside it.
 */
export const toNearestMinute = (instant) => new Date(Math.round(instant.getTime() / 60_000) * 60_000);
const keyOf = (date) => `${String(date.year).padStart(4, '0')}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
/** The first event of a kind that falls on a local date later than `afterKey` (YYYY-MM-DD) in the zone. */
function firstEventAfter(kind, startUtc, afterKey, timeZone) {
    let cursor = startUtc;
    for (let i = 0; i < 4; i += 1) {
        const hit = SearchMoonPhase(TARGET_LONGITUDE[kind], cursor, 45);
        if (!hit)
            break;
        const instant = refinedInstant(kind, hit.date);
        if (localDateKey(toNearestMinute(instant), timeZone) > afterKey)
            return instant;
        cursor = new Date(hit.date.getTime() + DAY_MS);
    }
    throw new Error(`no ${kind} Moon found after ${afterKey}`);
}
/** The Full Moon or New Moon that falls on this date in the zone, or null. */
export function lunarEventOn(date, timeZone) {
    const key = keyOf(date);
    const from = new Date(Date.UTC(date.year, date.month - 1, date.day - 1, 0, 0, 0));
    for (const kind of ['new', 'full']) {
        const hit = SearchMoonPhase(TARGET_LONGITUDE[kind], from, 3);
        const instant = hit ? refinedInstant(kind, hit.date) : null;
        if (instant && localDateKey(toNearestMinute(instant), timeZone) === key)
            return eventFrom(kind, instant, timeZone);
    }
    return null;
}
/** The next event of a kind on a local date STRICTLY after this one. */
export function nextLunarEvent(date, timeZone, kind) {
    const from = new Date(Date.UTC(date.year, date.month - 1, date.day - 1, 0, 0, 0));
    return eventFrom(kind, firstEventAfter(kind, from, keyOf(date), timeZone), timeZone);
}
export function lunarEventsForDay(date, timeZone) {
    const onDay = lunarEventOn(date, timeZone);
    let relevant;
    if (onDay)
        relevant = onDay;
    else {
        const nextFull = nextLunarEvent(date, timeZone, 'full');
        const nextNew = nextLunarEvent(date, timeZone, 'new');
        relevant = nextFull.instant.getTime() <= nextNew.instant.getTime() ? nextFull : nextNew;
    }
    const otherKind = relevant.kind === 'full' ? 'new' : 'full';
    const relevantKey = localDateKey(relevant.instant, timeZone);
    const [y, m, d] = relevantKey.split('-').map(Number);
    const following = nextLunarEvent({ year: y, month: m, day: d }, timeZone, otherKind);
    return { onDay, relevant, following };
}
export function clockOf(exactInstant, timeZone, locale) {
    const instant = toNearestMinute(exactInstant);
    const tag = locale === 'sk' ? 'sk-SK' : 'en-GB';
    const attempt = (zone) => {
        try {
            const date = new Intl.DateTimeFormat(tag, { day: 'numeric', month: 'long', year: 'numeric', timeZone: zone }).format(instant);
            const time = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: zone }).format(instant);
            const zoneName = new Intl.DateTimeFormat(tag, { timeZoneName: 'short', timeZone: zone }).formatToParts(instant).find((part) => part.type === 'timeZoneName')?.value ?? zone;
            return { date, time, zoneName, zone, zoneIsFallback: false };
        }
        catch {
            return null;
        }
    };
    const local = timeZone ? attempt(timeZone) : null;
    if (local)
        return local;
    const utc = attempt('UTC');
    return { ...utc, zoneName: 'UTC', zone: 'UTC', zoneIsFallback: true };
}
export function degreeText(degree, minute) {
    return `${degree}°${String(minute).padStart(2, '0')}′`;
}
