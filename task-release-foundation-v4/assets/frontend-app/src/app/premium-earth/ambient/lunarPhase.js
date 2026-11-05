/*
 * THE REAL LUNAR PHASE, FROM THE DATE.
 *
 * The ambient Moon goes round the Earth on a compressed visual orbit (120 seconds a lap, see MOON in ambientMath.ts). That motion is
 * ambience. Its PHASE is not: it is the phase the real Moon has at the real instant, so the Moon in the scene coexists with the
 * lunar cycle a person can see in the sky tonight - a thin waxing crescent this week, full in two, a waning half after that. The two
 * clocks are separate: a lap of the orbit does not change the phase, and a week of real days does.
 *
 * WHAT THIS IS. The Moon-Sun elongation (the angle between them as seen from the Earth along the ecliptic) from the principal terms
 * of Jean Meeus, "Astronomical Algorithms" (2nd ed.), chapter 46 (the phase angle of the Moon), eq. 46.4, with the mean arguments of
 * chapter 47 (D, M, M'). Six periodic terms, about 0.3 degrees against a full ephemeris - which is under an hour of Moon time, far
 * below anything a disc a few dozen pixels across can show. tests/lunarPhase.test.mjs holds it against astronomy-engine (the
 * repository's own ephemeris, used by the Astrology pillar) over twenty years and against published new, quarter and full Moons.
 * It is a small deterministic helper and not astronomy-engine itself, so the globe does not pull the vendor ephemeris in at start.
 *
 * WHAT IT TAKES. A UTC instant in milliseconds. It never reads a clock and never touches the network: the caller says when.
 *
 * WHEN IT RUNS. Once when the globe mounts and again, at most, every PHASE_REFRESH_SECONDS of the globe's own clock - never in a frame
 * of its own. (The Moon moves through the phase by about half a degree an hour: nothing on a screen can tell a minute from the next.)
 *
 * SEMANTICS (the Earth observer's phase):
 *   elongation 0 = new, 90 = first quarter (waxing), 180 = full, 270 = last quarter (waning).
 *   fraction = (1 - cos(elongation)) / 2: about 0 at new, 0.5 at either quarter, about 1 at full.
 *   phaseAngle = the angle at the Moon between the Earth and the Sun, 0 at full, pi at new.
 *   waxing = the elongation is between 0 and 180: the lit part is growing.
 */
/** The mean length of a lunation, days (Meeus ch. 49). Not used by the calculation: it says how fast the phase turns, for tests and readers. */
export const SYNODIC_MONTH_DAYS = 29.530588861;
/** J2000.0, the epoch the series is counted from: 2000 January 1, 12:00 TT, as a Julian Day. */
export const J2000_JULIAN_DAY = 2451545.0;
/** The Julian Day of the Unix epoch (1970-01-01T00:00:00Z). */
const UNIX_EPOCH_JULIAN_DAY = 2440587.5;
const MILLIS_PER_DAY = 86_400_000;
/** The most often the globe re-works the phase, in seconds of its own clock. */
export const PHASE_REFRESH_SECONDS = 900;
const RADIANS = Math.PI / 180;
const normalDegrees = (degrees) => ((degrees % 360) + 360) % 360;
export function lunarPhaseAt(unixMillis) {
    if (!Number.isFinite(unixMillis))
        throw new RangeError('A lunar phase needs a finite UTC instant in milliseconds.');
    /* Julian centuries from J2000. The 69 s between UTC and dynamical time moves D by 0.01 degrees: left out. */
    const julianDay = unixMillis / MILLIS_PER_DAY + UNIX_EPOCH_JULIAN_DAY;
    const T = (julianDay - J2000_JULIAN_DAY) / 36525;
    /* The mean elongation of the Moon (D), the Sun's mean anomaly (M) and the Moon's mean anomaly (M'), degrees (Meeus 47.2 - 47.4). */
    const D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T + (T * T * T) / 545868 - (T * T * T * T) / 113065000;
    const M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T + (T * T * T) / 24490000;
    const Mp = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T + (T * T * T) / 69699 - (T * T * T * T) / 14712000;
    /* Meeus 46.4: i = 180 - D - 6.289 sin M' + 2.100 sin M - 1.274 sin(2D - M') - 0.658 sin 2D - 0.214 sin 2M' - 0.110 sin D, the phase
       angle. The elongation is its complement, so the corrections go over with the opposite sign. */
    const elongation = normalDegrees(D + 6.289 * Math.sin(Mp * RADIANS) - 2.100 * Math.sin(M * RADIANS) + 1.274 * Math.sin((2 * D - Mp) * RADIANS)
        + 0.658 * Math.sin(2 * D * RADIANS) + 0.214 * Math.sin(2 * Mp * RADIANS) + 0.110 * Math.sin(D * RADIANS));
    const cosElongation = Math.cos(elongation * RADIANS);
    return {
        elongationDegrees: elongation,
        phaseAngle: Math.acos(Math.min(1, Math.max(-1, -cosElongation))),
        fraction: (1 - cosElongation) / 2,
        waxing: elongation < 180,
        at: unixMillis,
    };
}
/** The query that moves the Moon's date, for a review: ?moondate=2026-10-21 or a full ISO instant with a Z. Nothing else reads it. */
export const LUNAR_DATE_QUERY = 'moondate';
const ISO_DATE = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?Z)?$/;
/**
 * The instant the Moon's phase is worked out for: now - or, when the address carries a valid `?moondate=`, that date, so a reviewer
 * can see any phase on any day without waiting a month. Anything that is not a plain UTC ISO date is ignored (the real date is used).
 * Takes the search string and the clock, so it can be tested without a window.
 */
export function lunarInstantFor(search, now) {
    try {
        const asked = new URLSearchParams(search).get(LUNAR_DATE_QUERY);
        if (asked && ISO_DATE.test(asked)) {
            const parsed = Date.parse(asked);
            if (Number.isFinite(parsed))
                return parsed;
        }
    }
    catch {
        /* an unreadable address is the real date */
    }
    return now();
}
