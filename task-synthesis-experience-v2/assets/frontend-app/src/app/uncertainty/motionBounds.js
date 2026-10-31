/*
 * HOW FAST THE SKY CAN MOVE - the rate bounds the certified scan rests on.
 *
 * uncertainty/certifiedScan.ts proves a value constant across a window from
 * its distance to the nearest boundary and an UPPER BOUND on how fast the
 * quantity behind it can move. These are those bounds: each body's greatest
 * apparent geocentric speed in ecliptic longitude, measured with the engine's
 * own position functions (astrology/ephemerisEngine.ts, astrology/lunarNode.ts)
 * over 1900-2100 - six-hour steps for the planets, one-hour steps for the Moon
 * and the osculating node, whose short-period wobble a coarser step would miss
 * - and then rounded up with a margin of 8-35 %.
 *
 *   body        measured max    bound
 *   Sun          1.0198          1.1     degrees/day
 *   Moon        15.394          16.5
 *   Mercury      2.2026          2.5
 *   Venus        1.2589          1.4
 *   Mars         0.7914          0.9
 *   Jupiter      0.2424          0.3
 *   Saturn       0.1303          0.16
 *   Uranus       0.0632          0.08
 *   Neptune      0.0381          0.05
 *   Pluto        0.0405          0.05
 *   true node    0.2604          0.35
 *
 * The accelerations bound the engine's motion STATE (direct / stationary /
 * retrograde), which it reads from a central difference over +/- 12 hours:
 * that difference quotient changes no faster than the body's acceleration.
 *
 *   body        measured max    bound
 *   Sun          0.00066         0.001   degrees/day^2
 *   Moon         0.515           0.8
 *   Mercury      0.199           0.3
 *   Venus        0.0425          0.065
 *   Mars         0.0152          0.025
 *   Jupiter      0.0035          0.006
 *   Saturn       0.0019          0.003
 *   Uranus       0.00096         0.0015
 *   Neptune      0.00060         0.001
 *   Pluto        0.00062         0.001
 *   true node    0.0532          0.08
 *
 * tests/uncertaintyEnvelope.test.mjs samples the engine at random instants
 * across the range and fails if any body ever exceeds its bound, so a change
 * to the ephemeris that made a bound unsafe cannot pass silently. Outside
 * 1900-2100 the bounds are an extrapolation; the planets' speeds do not
 * change materially over centuries.
 */
export const MAX_DEGREES_PER_DAY = {
    Sun: 1.1,
    Earth: 1.1,
    Moon: 16.5,
    Mercury: 2.5,
    Venus: 1.4,
    Mars: 0.9,
    Jupiter: 0.3,
    Saturn: 0.16,
    Uranus: 0.08,
    Neptune: 0.05,
    Pluto: 0.05,
    'North Node': 0.35,
    'South Node': 0.35,
};
export const MAX_DEGREES_PER_DAY_SQUARED = {
    Sun: 0.001,
    Moon: 0.8,
    Mercury: 0.3,
    Venus: 0.065,
    Mars: 0.025,
    Jupiter: 0.006,
    Saturn: 0.003,
    Uranus: 0.0015,
    Neptune: 0.001,
    Pluto: 0.001,
    'North Node': 0.08,
    'South Node': 0.08,
};
/**
 * Human Design reads a second chart 88 degrees of solar arc before birth. As
 * the birth instant moves, that design instant moves with it at the ratio of
 * the Sun's speed at birth to its speed at the design moment - at most
 * 1.0198 / 0.9528 = 1.07. Design-side rates are multiplied by this bound.
 */
export const DESIGN_TIME_RATIO_BOUND = 1.1;
const MINUTES_PER_DAY = 24 * 60;
/** Degrees per minute of window time. Throws for a body without a bound, so an unbounded track cannot be certified. */
export function degreesPerMinute(body, factor = 1) {
    const perDay = MAX_DEGREES_PER_DAY[body];
    if (perDay === undefined)
        throw new Error(`No motion bound for ${body}`);
    return (perDay * factor) / MINUTES_PER_DAY;
}
/** Degrees/day per minute of window time: how fast a speed can change. */
export function speedChangePerMinute(body) {
    const perDaySquared = MAX_DEGREES_PER_DAY_SQUARED[body];
    if (perDaySquared === undefined)
        throw new Error(`No acceleration bound for ${body}`);
    return perDaySquared / MINUTES_PER_DAY;
}
