import { Body, Ecliptic, EclipticGeoMoon, GeoVector, MoonPhase, SunPosition, } from 'astronomy-engine';
import { trueNorthNodeLongitude } from './lunarNode.js?v=f9ab0a6';
/**
 * Retrograde/direct/stationary is determined from real apparent-longitude motion
 * (central-difference sample ±12h around the birth moment), never from a static table.
 * |speed| at or below this threshold is reported as 'stationary'. Sun and Moon are
 * sampled with the same method as every other body; no hardcoded exception is applied
 * to them; their geocentric ecliptic longitude is always increasing at this timescale,
 * so they resolve to 'direct' as a consequence of the physics, not a special case.
 */
const RETROGRADE_SAMPLE_HOURS = 12;
const STATIONARY_THRESHOLD_DEGREES_PER_DAY = 0.005;
const ZODIAC = [
    ['Aries', 'Fire', 'Cardinal'],
    ['Taurus', 'Earth', 'Fixed'],
    ['Gemini', 'Air', 'Mutable'],
    ['Cancer', 'Water', 'Cardinal'],
    ['Leo', 'Fire', 'Fixed'],
    ['Virgo', 'Earth', 'Mutable'],
    ['Libra', 'Air', 'Cardinal'],
    ['Scorpio', 'Water', 'Fixed'],
    ['Sagittarius', 'Fire', 'Mutable'],
    ['Capricorn', 'Earth', 'Cardinal'],
    ['Aquarius', 'Air', 'Fixed'],
    ['Pisces', 'Water', 'Mutable'],
];
const PLANETS = [
    { body: Body.Mercury, label: 'Mercury' },
    { body: Body.Venus, label: 'Venus' },
    { body: Body.Mars, label: 'Mars' },
    { body: Body.Jupiter, label: 'Jupiter' },
    { body: Body.Saturn, label: 'Saturn' },
    { body: Body.Uranus, label: 'Uranus' },
    { body: Body.Neptune, label: 'Neptune' },
    { body: Body.Pluto, label: 'Pluto' },
];
export function calculateEphemeris(moment) {
    if (moment.status !== 'ready' || !moment.utcDateTime) {
        throw new Error('A normalized UTC birth moment is required for ephemeris calculation.');
    }
    const date = new Date(moment.utcDateTime);
    const positions = [
        position('Sun', SunPosition(date).elon, 'SunPosition / apparent geocentric true ecliptic of date', motionAt(sunLongitudeAt, date)),
        position('Moon', EclipticGeoMoon(date).lon, 'EclipticGeoMoon / geocentric true ecliptic of date', motionAt(moonLongitudeAt, date)),
        ...PLANETS.map(({ body, label }) => position(label, Ecliptic(GeoVector(body, date, true)).elon, 'GeoVector with aberration and light-time correction, converted to true ecliptic of date', motionAt((sampleDate) => planetLongitudeAt(body, sampleDate), date))),
    ];
    const northNodeMotion = motionAt(trueNorthNodeLongitude, date);
    const northNodeLongitude = trueNorthNodeLongitude(date);
    const northNode = position('North Node', northNodeLongitude, 'Osculating true ascending node from the local lunar state vector (Swiss Ephemeris SE_TRUE_NODE convention)', northNodeMotion);
    // South Node's longitude is a constant +180° offset from North Node, so its instantaneous
    // angular speed is identical to North Node's; it is not independently re-sampled.
    const southNode = position('South Node', northNodeLongitude + 180, 'Exact opposition (+180°) of the calculated North Node; not independently sampled', northNodeMotion);
    const points = [northNode, southNode];
    const phaseAngle = normalizeLongitude(MoonPhase(date));
    const moonPhase = {
        angle: round(phaseAngle),
        name: moonPhaseName(phaseAngle),
        illuminationPercent: round(((1 - Math.cos(phaseAngle * Math.PI / 180)) / 2) * 100, 2),
    };
    const sampleOffsetMs = RETROGRADE_SAMPLE_HOURS * 3_600_000;
    const moonSignEarliest = signForLongitude(moonLongitudeAt(new Date(date.getTime() - sampleOffsetMs)));
    const moonSignLatest = signForLongitude(moonLongitudeAt(new Date(date.getTime() + sampleOffsetMs)));
    const moonEntry = positions.find((item) => item.body === 'Moon');
    const moonSignBoundaryRisk = moonSignEarliest !== moonEntry.sign || moonSignLatest !== moonEntry.sign;
    return {
        engine: 'astronomy-engine 2.1.19',
        frame: 'Tropical, geocentric true ecliptic of date',
        positions,
        points,
        moonPhase,
        moonSignBoundaryRisk,
        trace: [
            { label: 'Engine', value: 'astronomy-engine 2.1.19' },
            { label: 'UTC input', value: moment.utcDateTime },
            { label: 'Julian date', value: moment.julianDate?.toFixed(8) ?? 'Unavailable' },
            { label: 'Coordinate frame', value: 'Tropical, geocentric true ecliptic of date' },
            { label: 'Retrograde sampling method', value: `Central difference of apparent tropical ecliptic longitude at birth moment ${RETROGRADE_SAMPLE_HOURS}h before and ${RETROGRADE_SAMPLE_HOURS}h after, using each body's own position method; stationary threshold ${STATIONARY_THRESHOLD_DEGREES_PER_DAY} degrees/day` },
            ...positions.flatMap((item) => [
                { label: `${item.body} longitude`, value: `${item.longitude.toFixed(6)} degrees` },
                { label: `${item.body} method`, value: item.method },
                { label: `${item.body} motion`, value: `${item.motionState} (${item.speedDegreesPerDay.toFixed(6)} degrees/day)` },
            ]),
            { label: 'Lunar node model', value: 'Osculating true ascending node from the local lunar state vector (Swiss Ephemeris SE_TRUE_NODE convention); South Node is the exact +180 degree opposition' },
            ...points.flatMap((item) => [
                { label: `${item.body} longitude`, value: `${item.longitude.toFixed(6)} degrees` },
                { label: `${item.body} motion`, value: `${item.motionState} (${item.speedDegreesPerDay.toFixed(6)} degrees/day)` },
            ]),
            { label: 'Moon phase angle', value: `${moonPhase.angle.toFixed(6)} degrees` },
            { label: 'Moon phase illumination', value: `${moonPhase.illuminationPercent.toFixed(2)}%` },
            { label: 'Moon sign boundary check', value: `Sign at -${RETROGRADE_SAMPLE_HOURS}h: ${moonSignEarliest} / at birth moment: ${moonEntry.sign} / at +${RETROGRADE_SAMPLE_HOURS}h: ${moonSignLatest}${moonSignBoundaryRisk ? ' (crosses a sign boundary within this window)' : ''}` },
        ],
    };
}
/** The motion-state sample offset and threshold, for code that must classify motion exactly as this engine does. */
export const MOTION_SAMPLE_HOURS = RETROGRADE_SAMPLE_HOURS;
export const STATIONARY_DEGREES_PER_DAY = STATIONARY_THRESHOLD_DEGREES_PER_DAY;
/**
 * The raw apparent longitude of every body this engine reports, at one
 * instant, by the SAME position functions `calculateEphemeris` uses - and the
 * Moon's phase angle as it computes it. For scanning a birth-time window
 * (uncertainty/certifiedScan.ts), where the full ephemeris with its motion
 * samples and trace would be wasted work; a scan built on this can only ever
 * describe the chart this engine would draw at that instant.
 */
export function apparentLongitudesAt(date) {
    const longitudes = {
        Sun: normalizeLongitude(sunLongitudeAt(date)),
        Moon: normalizeLongitude(moonLongitudeAt(date)),
    };
    for (const { body, label } of PLANETS)
        longitudes[label] = normalizeLongitude(planetLongitudeAt(body, date));
    const node = normalizeLongitude(trueNorthNodeLongitude(date));
    longitudes['North Node'] = node;
    longitudes['South Node'] = normalizeLongitude(node + 180);
    return { longitudes, phaseAngle: normalizeLongitude(MoonPhase(date)) };
}
/**
 * ONE BODY'S APPARENT LONGITUDE AT ONE INSTANT, by the SAME position function
 * `calculateEphemeris` uses for that body.
 *
 * For code that has to follow a body through an interval (the Forecast's local
 * day) rather than describe one moment: running the full ephemeris with its
 * motion samples, nodes and trace dozens of times a day to read ten numbers
 * would be wasted work, and a second set of position formulas would be a second
 * engine. Returns null for a name this engine does not place, so a caller can
 * never be handed a longitude for a body the natal chart does not carry.
 */
export function apparentLongitudeOf(body, date) {
    if (body === 'Sun')
        return normalizeLongitude(sunLongitudeAt(date));
    if (body === 'Moon')
        return normalizeLongitude(moonLongitudeAt(date));
    const planet = PLANETS.find((entry) => entry.label === body);
    return planet ? normalizeLongitude(planetLongitudeAt(planet.body, date)) : null;
}
function sunLongitudeAt(date) {
    return SunPosition(date).elon;
}
function moonLongitudeAt(date) {
    return EclipticGeoMoon(date).lon;
}
function signForLongitude(rawLongitude) {
    const longitude = normalizeLongitude(rawLongitude);
    const signIndex = Math.floor(longitude / 30) % 12;
    return ZODIAC[signIndex][0];
}
function planetLongitudeAt(body, date) {
    return Ecliptic(GeoVector(body, date, true)).elon;
}
/**
 * Central-difference apparent-longitude speed in degrees/day, sampled ±RETROGRADE_SAMPLE_HOURS
 * around `date` using the same longitude method the body's position was computed with. The
 * signed difference is taken the short way around the 360° circle so a sample pair straddling
 * the 0°/360° boundary never reports a false near-360°/day speed.
 */
function motionAt(longitudeAt, date) {
    const sampleOffsetMs = RETROGRADE_SAMPLE_HOURS * 3_600_000;
    const before = normalizeLongitude(longitudeAt(new Date(date.getTime() - sampleOffsetMs)));
    const after = normalizeLongitude(longitudeAt(new Date(date.getTime() + sampleOffsetMs)));
    const signedDelta = ((after - before + 540) % 360) - 180;
    const daySpan = (2 * RETROGRADE_SAMPLE_HOURS) / 24;
    const speedDegreesPerDay = round(signedDelta / daySpan);
    const motionState = Math.abs(speedDegreesPerDay) <= STATIONARY_THRESHOLD_DEGREES_PER_DAY
        ? 'stationary'
        : speedDegreesPerDay < 0 ? 'retrograde' : 'direct';
    return { motionState, speedDegreesPerDay };
}
function position(body, rawLongitude, method, motion) {
    const longitude = round(normalizeLongitude(rawLongitude));
    const signIndex = Math.floor(longitude / 30) % 12;
    const [sign, element, modality] = ZODIAC[signIndex];
    return {
        body,
        longitude,
        sign,
        degreeInSign: round(longitude - signIndex * 30),
        element,
        modality,
        method,
        motionState: motion.motionState,
        speedDegreesPerDay: motion.speedDegreesPerDay,
    };
}
/**
 * A `PlanetPosition` for a body whose longitude comes from ANOTHER provider (the optional extended-object provider: Chiron and the asteroids), put through exactly the
 * rules the core bodies go through: the same rounding, the same sign / element / modality table, and the same central-difference motion sample (+-12 h, the same
 * stationary threshold). Nothing is calculated here that the core engine does not already calculate for its own bodies; the only thing that differs is where the
 * longitude function comes from. It is never used for a core planet: those stay with this engine.
 */
export function planetPositionFromLongitudeFunction(body, longitudeAt, date, method) {
    return position(body, longitudeAt(date), method, motionAt(longitudeAt, date));
}
export function moonPhaseName(angle) {
    const names = [
        'New Moon',
        'Waxing Crescent',
        'First Quarter',
        'Waxing Gibbous',
        'Full Moon',
        'Waning Gibbous',
        'Third Quarter',
        'Waning Crescent',
    ];
    return names[Math.floor((angle + 22.5) / 45) % names.length];
}
function normalizeLongitude(value) {
    return ((value % 360) + 360) % 360;
}
function round(value, digits = 6) {
    const scale = 10 ** digits;
    return Math.round(value * scale) / scale;
}
