import { DEGREES } from './ambientMath.js?v=f9ab0a6';
/*
 * THE OPENING ARRIVAL, AS ARITHMETIC.
 *
 * The Earth that comes out of the warp used to be the map provider's 3D globe, flown by a small piece of camera code that the
 * build put in front of it (scripts/premiumEarthMap.live-intro-wrapper.js, shipped as the map module itself). That code is the
 * choreography the owner approved: a tiny planet at the far end of the tunnel, rolling and growing at once, easing to rest. It
 * wrote five numbers to the map camera every frame; this file keeps those numbers, and turns them into what the native globe is
 * told, so that the SAME MOTION IS SEEN ON THE SCREEN - not the same numbers written into a different camera.
 *
 * WHAT THE SOURCE DID (premiumEarthMap.live-intro-wrapper.js, playLiveZoom / INTRO_START_POSE; every figure is that file's own):
 *
 *   duration        5200 ms, one requestAnimationFrame loop on performance.now()
 *   range           exp(ln 900,000,000 + (ln 56,000,000 - ln 900,000,000) * e), e = 1 - (1 - p)^2.2   (metres to the globe's centre)
 *   field of view   50 degrees + (35 - 50) * e                                                   (the same eased value)
 *   longitude       (8 - 120) + 120 * s, s = p * p * (3 - 2p)                                    (the point under the camera,
 *                   sweeping 120 degrees EAST, so the surface runs right to left on the screen; latitude fixed at 18)
 *   heading, tilt, roll   0, 0, 0 throughout
 *
 * WHAT THE SCREEN SAW. The planet is a sphere seen from `range` metres above its surface, so the share of the window's HEIGHT that
 * its disc fills is tan(asin(a / (a + range))) / tan(fov / 2), a being the radius of the Earth. That is 0.0151 at the first frame (a
 * dot, about 12 px on a 812 px phone), and 0.3260 at the last - the 32.6% the vessel symbol and the glow ring are laid out round.
 * The disc grows by a factor of 21.6 over the arrival, quickest at the start (the ease is an ease-OUT, a power of 2.2) and arriving
 * with no speed; the roll is an ease-in-out, quickest in the middle (about 35 degrees a second at its peak) and also arriving with
 * none. Those two profiles - and not 900,000 km, not 50 degrees - are what a viewer remembers, and they are what is reproduced.
 *
 * WHAT IS NOT CARRIED. The map's own imagery loading in, and its camera's lens: the native camera has one fixed field of view
 * (ambientMath FOV_DEGREES), so the field-of-view change is folded into the apparent size here instead of being replayed.
 *
 * Pure: no canvas, no clock, no DOM. The globe asks `arrivalAt(progress)` and is told how large and how far round to be.
 */
export const ARRIVAL = Object.freeze({
    /** The length of the arrival, milliseconds. */
    durationMillis: 5200,
    /** Distance from the globe's centre to the camera is `radius + range`; both ends of the camera's range, metres. */
    rangeStartMetres: 900_000_000,
    rangeEndMetres: 56_000_000,
    /** The map camera's field of view at either end, degrees. */
    fovStartDegrees: 50,
    fovEndDegrees: 35,
    /** How far the point under the camera sweeps, degrees of longitude (the source swept it east; the native arrival turns the other way, with the idle spin: see arrivalYaw). */
    sweepDegrees: 120,
    /** The exponent of the ease-out the range and the field of view share. */
    rangeEaseExponent: 2.2,
    /** The equatorial radius of the Earth the map used, metres. */
    earthRadiusMetres: 6_378_137,
});
const clamp01 = (value) => Math.min(1, Math.max(0, value));
/** The ease-out that range and field of view share: quick at the start, no speed at the end. */
export const arrivalRangeEase = (progress) => 1 - Math.pow(1 - clamp01(progress), ARRIVAL.rangeEaseExponent);
/** The smoothstep the roll follows: no speed at either end, quickest in the middle. */
export const arrivalSweepEase = (progress) => {
    const p = clamp01(progress);
    return p * p * (3 - 2 * p);
};
/** The share of the window's height that the planet's disc fills, for a camera `rangeMetres` above its surface at a field of view. */
export function apparentDiameterOfHeight(rangeMetres, fovDegrees) {
    const a = ARRIVAL.earthRadiusMetres;
    const distance = a + Math.max(0, rangeMetres);
    return Math.tan(Math.asin(a / distance)) / Math.tan((fovDegrees * DEGREES) / 2);
}
const END_DIAMETER = apparentDiameterOfHeight(ARRIVAL.rangeEndMetres, ARRIVAL.fovEndDegrees);
export function arrivalAt(progress) {
    const p = clamp01(progress);
    const eased = arrivalRangeEase(p);
    const startLog = Math.log(ARRIVAL.rangeStartMetres);
    const endLog = Math.log(ARRIVAL.rangeEndMetres);
    const rangeMetres = Math.exp(startLog + (endLog - startLog) * eased);
    const fovDegrees = ARRIVAL.fovStartDegrees + (ARRIVAL.fovEndDegrees - ARRIVAL.fovStartDegrees) * eased;
    const diameterOfHeight = apparentDiameterOfHeight(rangeMetres, fovDegrees);
    return {
        progress: p,
        rangeMetres,
        fovDegrees,
        diameterOfHeight,
        scale: diameterOfHeight / END_DIAMETER,
        sweepRemainingDegrees: ARRIVAL.sweepDegrees * (1 - arrivalSweepEase(p)),
    };
}
/** The framing at a moment of the arrival: the resting framing's centre, at the size the source's camera drew the planet at, relative to its resting size. */
export function arrivalFraming(resting, progress) {
    return { radius: resting.radius * arrivalAt(progress).scale, x: resting.x, y: resting.y };
}
/**
 * The yaw at a moment of the arrival, radians, given the yaw it comes to rest at and the idle spin it hands over to.
 *
 * THE ROLL RUNS THE WAY THE IDLE SPIN RUNS. The source swept the point under the camera east, so the surface ran right to left on the
 * screen - and the idle spin that took over runs the OTHER way (the globe's yaw rises), so the planet came to a stop and set off again
 * backwards: a visible jerk at the moment the opening ended. The arrival is therefore mirrored: the yaw starts 120 degrees BELOW its
 * resting value and rises to it, in the idle spin's own direction, on the same smoothstep (the same shape, the same 35 degrees a second at
 * its quickest, the same size curve; only the sense of the turn is reversed).
 *
 * AND IT ARRIVES AT THE IDLE SPEED, NOT AT NONE. The idle spin is a steady drift of `idleRadiansPerSecond`; the arrival carries the same
 * drift all the way through (a straight line of that slope ending at the resting yaw), so that at the last frame the planet is turning
 * at exactly the speed and in exactly the direction the idle spin continues at. The smoothstep still arrives with no speed of its own,
 * so the two add up to the idle spin and nothing else - the position and the velocity are both continuous across the hand-over.
 */
export function arrivalYaw(restingYaw, progress, idleRadiansPerSecond = 0) {
    const p = clamp01(progress);
    const secondsLeft = (1 - p) * (ARRIVAL.durationMillis / 1000);
    return restingYaw - arrivalAt(p).sweepRemainingDegrees * DEGREES - idleRadiansPerSecond * secondsLeft;
}
/** The first frame's scale, for a caller that needs the start size without sampling. */
export const ARRIVAL_START_SCALE = arrivalAt(0).scale;
