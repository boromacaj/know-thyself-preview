/*
 * HOW HARD THE EARTH ANSWERS A FINGER, HOW LONG IT CARRIES, AND HOW FAST IT TURNS ALONE - ONE PLACE, AS MULTIPLIERS ON THE MOTION THAT ALREADY EXISTS.
 *
 * There is ONE motion engine (earthMotion.ts: an angular velocity that decays, with the idle spin underneath, integrated by the globe's one frame loop) and
 * this file adds no second one. It only says how the existing stages are scaled:
 *
 *   finger / wheel -> impulse (earthGesture.ts: degrees per second per pixel) -> velocity (clamped) -> glide (decays) -> rotation
 *   page scroll    -> nudge (rotation that is spent over a settle time)
 *   idle           -> a constant spin underneath all of it
 *
 * THE FIRST-REVIEW TUNING, AND WHY IT IS NOT "x5 ON EVERYTHING". How far a swipe turns the planet is  gain / k  - the impulse gain over the glide's decay rate
 * (a release velocity v decays as v * decay^t, so it covers v / k degrees in all). Multiplying the gain by 5 AND slowing the decay would compound into 10-12x. So the
 * 5x the owner asked for is the TRAVEL a gesture produces, split across two stages where each is felt:
 *   the Earth answers the finger 2.5x harder   (gestureScale 2.5: more speed while it is being swiped, so it feels light and quick)
 *   and carries it 2x longer                   (glideScale 2: the time constant doubles, decay 0.02 -> 0.1414 per second: a smooth exponential, no cut-off)
 *   = 5.0x the rotation from the same swipe, and about 2.2x the coast (the time for the glide to fall to the idle spin).
 * The page-scroll follow gets the same split (nudge 5x the rotation, spent over 2x the time: 2.5x the pace, a longer tail).
 * The ceiling is explicit: the velocity can never exceed maxDegreesPerSecond (300, against 220 before) however many swipes are stacked. Idle is 1.75x.
 *
 * `?earthMotion=baseline` restores exactly the previous behaviour for a side-by-side review (all multipliers 1, the old ceiling and carry limit); anything else,
 * or no parameter, is the new tuning. QA only, like ?sun= and ?moondate=: nothing but earthMotionTuningFor reads it, and it goes with them before release.
 *
 * No imports: the interface layer (pillarScrollEarthRotation.ts) and the globe both read this file.
 */
/** Exactly what it was: every stage at its previous value. */
export const EARTH_MOTION_BASELINE = Object.freeze({
    name: 'baseline',
    gestureScale: 1,
    glideScale: 1,
    maxDegreesPerSecond: 220,
    scrollScale: 1,
    settleScale: 1,
    nudgeCarryLimitDegrees: 40,
    idleScale: 1,
});
/** The first review build: a swipe turns the Earth 5x as far, it carries about 2.2x as long, and untouched it turns 1.75x as fast. */
export const EARTH_MOTION_STRONG = Object.freeze({
    name: 'strong',
    gestureScale: 2.5,
    glideScale: 2,
    maxDegreesPerSecond: 300,
    scrollScale: 5,
    settleScale: 2,
    nudgeCarryLimitDegrees: 100,
    idleScale: 1.75,
});
export const EARTH_MOTION_QUERY = 'earthMotion';
/** The tuning for an address: `?earthMotion=baseline` is the old motion; anything else is the new one. Read once, by the one that mounts. */
export function earthMotionTuningFor(search) {
    try {
        return new URLSearchParams(search).get(EARTH_MOTION_QUERY) === 'baseline' ? EARTH_MOTION_BASELINE : EARTH_MOTION_STRONG;
    }
    catch {
        return EARTH_MOTION_STRONG;
    }
}
/** The decay a glide has under a tuning: the previous per-second survival share, stretched over the tuning's longer time constant. */
export function decayPerSecondFor(baseDecayPerSecond, tuning) {
    return Math.pow(baseDecayPerSecond, 1 / tuning.glideScale);
}
