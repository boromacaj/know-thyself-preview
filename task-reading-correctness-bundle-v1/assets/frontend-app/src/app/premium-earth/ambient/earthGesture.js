/*
 * A FINGER (OR A WHEEL) AS ANGULAR MOMENTUM, AS PURE FUNCTIONS.
 *
 * The page's scroll position is a poor input for the planet: at the end of the content, or at the top, it stops changing while
 * the finger carries on, and a menu that fits the screen has no scroll position at all. So the gesture itself is read - how far
 * and which way the finger moved - and turned into an IMPULSE on the globe's own angular velocity (the one earthMotion.ts already
 * decays back to the idle spin). Nothing here touches the DOM, a clock or the globe: the interface layer
 * (pillarScrollEarthRotation.ts) feeds it points and hands what comes out to AmbientGlobeSession.impulse().
 *
 * THE MODEL.
 *   - A gesture starts PENDING. It becomes a vertical SWIPE once the finger has gone slopPixels up or down and not much further
 *     across than that (verticalShare - a thumb sweeps an arc, so it may begin as much across as up). It stays pending while it is
 *     ambiguous and is given up only when it is hopelessly sideways (rejectAcrossPixels and rejectRatio). A tap, a long press and
 *     a horizontal pan never become a swipe, so touching a card does not spin the Earth. A second finger kills the gesture (a pinch
 *     is not a swipe).
 *   - From then on every move adds an impulse proportional to the distance it covered: DEGREES_PER_SECOND_PER_PIXEL of angular
 *     velocity per pixel. Impulses ADD to the velocity the globe already has, so repeated swipes build momentum, and because the
 *     globe decays that velocity while the finger moves, a fast swipe (the same distance in less time) leaves more of it than a
 *     slow one. After the finger lifts the velocity decays on its own, and the idle spin resumes underneath.
 *   - Direction is the scroll's: a finger moving UP (the content scrolling DOWN) turns the planet the way a positive scroll delta
 *     does, a finger moving down the opposite way. Only the vertical component counts; the planet turns about its axis.
 *
 * The numbers: a 300 px swipe adds about 66 degrees per second, which decays (2% of it survives a second) to about 17 degrees
 * of travel - the same distance the same 300 px of scroll has always turned the planet (0.05 degrees a pixel).
 */
export const GESTURE = Object.freeze({
    /** Vertical finger travel before a touch is anything but a tap, CSS px. */
    slopPixels: 12,
    /**
     * How vertical a swipe has to be: it is accepted once its vertical travel is at least this share of its sideways travel.
     * Below 1 on purpose: a thumb sweeps an arc, and a one-handed swipe up the screen often begins as much across as up.
     */
    verticalShare: 0.75,
    /** A touch is given up as a sideways pan only once it has gone this far across AND more than rejectRatio times as far across as along. */
    rejectAcrossPixels: 60,
    rejectRatio: 2.5,
    /** Angular velocity added per pixel of vertical finger travel, degrees per second. */
    degreesPerSecondPerPixel: 0.22,
    /** The most velocity any number of swipes can build, degrees per second: a hard flurry cannot wind up a runaway spin. */
    maxDegreesPerSecond: 220,
    /** A single wheel event is capped at this many pixels, as a fast trackpad fling can deliver thousands. */
    wheelPixelCap: 120,
    /** Wheel events in lines are this many pixels each. */
    pixelsPerWheelLine: 16,
});
/** The empty string means the swipe is the planet's; anything else says why it is not. */
export function gateReason(input) {
    if (input.reducedMotion)
        return 'reduced-motion';
    if (!input.onDestination)
        return 'not-on-a-destination';
    if (input.editorOpen)
        return 'editor-open';
    if (!input.hasGlobe)
        return 'no-ambient-session';
    if (input.optedOut)
        return 'target-opt-out';
    return '';
}
export function beginGesture(x, y) {
    return { phase: 'pending', startX: x, startY: y, lastY: y };
}
/** A second finger, or anything else that makes this not a one-finger swipe. */
export function killGesture(state) {
    return state.phase === 'dead' ? state : { ...state, phase: 'dead' };
}
/**
 * Fold one move of the tracked finger into the gesture.
 *
 * While pending nothing is produced. The move that settles it as a swipe produces nothing either - the travel up to that point
 * was the finger finding its way - and every move after that produces `-dy * degreesPerSecondPerPixel`.
 */
export function moveGesture(state, x, y) {
    if (state.phase === 'dead')
        return { state, impulse: 0 };
    if (state.phase === 'pending') {
        const across = Math.abs(x - state.startX);
        const along = Math.abs(y - state.startY);
        /* ACCEPTED as soon as the finger has gone far enough UP OR DOWN and not much more across than that. */
        if (along >= GESTURE.slopPixels && along >= GESTURE.verticalShare * across)
            return { state: { ...state, phase: 'swipe', lastY: y }, impulse: 0 };
        /* GIVEN UP only when it is hopelessly sideways: a pan or a carousel, not the planet's. It is NOT judged on the first move past a
           slop: a thumb's arc begins sideways, and a verdict made there was final - the whole swipe was lost (reproduced in Chrome). */
        if (across >= GESTURE.rejectAcrossPixels && across > GESTURE.rejectRatio * along)
            return { state: { ...state, phase: 'dead', lastY: y }, impulse: 0 };
        return { state: { ...state, lastY: y }, impulse: 0 };
    }
    const dy = y - state.lastY;
    return { state: { ...state, lastY: y }, impulse: -dy * GESTURE.degreesPerSecondPerPixel };
}
/** What a wheel event adds, degrees per second: the same scale as a finger, the same direction as scrolling down. */
export function wheelImpulse(deltaY, deltaMode) {
    if (!Number.isFinite(deltaY))
        return 0;
    const pixels = deltaMode === 1 ? deltaY * GESTURE.pixelsPerWheelLine : deltaMode === 2 ? deltaY * 400 : deltaY;
    const capped = Math.max(-GESTURE.wheelPixelCap, Math.min(GESTURE.wheelPixelCap, pixels));
    return capped * GESTURE.degreesPerSecondPerPixel;
}
