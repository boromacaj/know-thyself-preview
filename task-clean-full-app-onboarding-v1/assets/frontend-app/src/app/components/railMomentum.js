/*
 * THE FEEL OF THE FORECAST RAILS: A FINGER DRAG THAT FOLLOWS A LITTLE FARTHER THAN THE FINGER, AND A COAST THAT RUNS ON AFTER IT LETS GO.
 *
 * The rails used to scroll natively. The browser owns how far a fling runs and how a drag maps to distance, neither can be tuned from a page, and the proximity snap on the
 * rail stops a fling on the nearest chip - so a swipe felt heavy and stopped short. These are the numbers and the arithmetic of the replacement, kept apart from the DOM so
 * they can be tested: positions are scrollLeft values in pixels, times are milliseconds, velocity is pixels per millisecond of scrollLeft (positive = the strip moves to the
 * later chips, i.e. the finger moves left).
 *
 * The coast is an exponential decay, v(t) = v0 * e^(-t / tau): it starts at the speed the finger had and eases out smoothly, and the distance it covers is v0 * tau.
 */
/** How many pixels the strip moves per pixel the finger moves while it is down. 1 = the strip stays under the finger; above 1 a short drag goes farther (it was 1.3, which the owner found too much). */
export const RAIL_DRAG_GAIN = 1;
/** The speed the coast starts at, as a multiple of the speed at release. 1 = it carries on at the speed the finger had (it was 1.25, which the owner found too much). */
export const RAIL_COAST_GAIN = 1;
/** The decay time of the coast, in ms. Native Android flings are about 250 to 350; this runs about one and a half to twice as long. */
export const RAIL_COAST_TAU_MS = 500;
/** The fastest the coast may start, in px/ms, so a hard flick does not cross a whole life. */
export const RAIL_MAX_VELOCITY = 3.5;
/** Below this speed the coast has ended. */
export const RAIL_MIN_VELOCITY = 0.02;
/** A touch that moves less than this is a tap, not a drag, in px. */
export const RAIL_TAP_SLOP = 6;
/** Only the last stretch of the drag decides the release speed, in ms. */
export const RAIL_SAMPLE_WINDOW_MS = 90;
const clamp = (value, limit) => Math.max(-limit, Math.min(limit, value));
/** The scrollLeft a drag asks for: where the strip was when the finger came down, minus the finger's travel times the gain. */
export function dragPosition(startScroll, startX, x, gain = RAIL_DRAG_GAIN) {
    return startScroll - (x - startX) * gain;
}
/** The speed of the strip over the last RAIL_SAMPLE_WINDOW_MS before release, in px/ms. Zero when there is not enough to tell, or the finger paused before it let go. */
export function releaseVelocity(samples, releasedAt, windowMs = RAIL_SAMPLE_WINDOW_MS) {
    const recent = samples.filter((sample) => releasedAt - sample.t <= windowMs);
    if (recent.length < 2)
        return 0;
    const first = recent[0];
    const last = recent[recent.length - 1];
    const dt = last.t - first.t;
    if (dt <= 0)
        return 0;
    /* A finger that rested before lifting must not fling: the last sample has to be recent as well. */
    if (releasedAt - last.t > windowMs / 2)
        return 0;
    return (last.position - first.position) / dt;
}
/** The speed the coast starts at: the release speed times the gain, held to the maximum either way. */
export function coastStartVelocity(velocity, gain = RAIL_COAST_GAIN, max = RAIL_MAX_VELOCITY) {
    return clamp(velocity * gain, max);
}
/** How far the coast has travelled after `elapsed` ms, in px. */
export function coastDistance(velocity, elapsed, tau = RAIL_COAST_TAU_MS) {
    return velocity * tau * (1 - Math.exp(-Math.max(0, elapsed) / tau));
}
/** The speed the coast still has after `elapsed` ms, in px/ms. */
export function coastSpeed(velocity, elapsed, tau = RAIL_COAST_TAU_MS) {
    return velocity * Math.exp(-Math.max(0, elapsed) / tau);
}
/** The whole distance a coast will cover, in px. */
export function coastTotal(velocity, tau = RAIL_COAST_TAU_MS) {
    return velocity * tau;
}
/** Whether the coast has run out. */
export function coastFinished(velocity, elapsed, tau = RAIL_COAST_TAU_MS) {
    return Math.abs(coastSpeed(velocity, elapsed, tau)) < RAIL_MIN_VELOCITY;
}
