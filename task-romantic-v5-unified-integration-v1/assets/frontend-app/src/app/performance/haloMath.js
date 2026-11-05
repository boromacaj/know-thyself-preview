/*
 * THE HALO'S NUMBERS, WITHOUT A BROWSER.
 *
 * The halo (the ambient backdrop's glow and wave bands, the ripple field round the Earth) is drawn on two canvases (haloCanvas.ts). What they draw is what the CSS used to say, and the
 * CSS said it with a clock of its own: easing curves, directions, delays, percentages of boxes. This file is that arithmetic written once and tested on its own, so that the canvas
 * is held to the CSS by numbers (tests/haloCanvas.test.mjs) and, for the picture, by the equivalence audit (scripts/qa/menuArtEquivalenceAudit.mjs).
 */
/** CSS cubic-bezier(x1, y1, x2, y2) as a function of progress (the timing function of a keyframe interval). */
export function cubicBezier(x1, y1, x2, y2) {
    const cx = 3 * x1;
    const bx = 3 * (x2 - x1) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * y1;
    const by = 3 * (y2 - y1) - cy;
    const ay = 1 - cy - by;
    const sampleX = (t) => ((ax * t + bx) * t + cx) * t;
    const sampleY = (t) => ((ay * t + by) * t + cy) * t;
    const slopeX = (t) => (3 * ax * t + 2 * bx) * t + cx;
    return (x) => {
        if (x <= 0)
            return 0;
        if (x >= 1)
            return 1;
        let t = x;
        for (let i = 0; i < 8; i += 1) {
            const error = sampleX(t) - x;
            if (Math.abs(error) < 1e-7)
                return sampleY(t);
            const slope = slopeX(t);
            if (Math.abs(slope) < 1e-6)
                break;
            t -= error / slope;
        }
        let lo = 0;
        let hi = 1;
        t = x;
        while (lo < hi - 1e-7) {
            const value = sampleX(t);
            if (Math.abs(value - x) < 1e-7)
                break;
            if (x > value)
                lo = t;
            else
                hi = t;
            t = (hi + lo) / 2;
        }
        return sampleY(t);
    };
}
/** `ease-in-out`, the CSS keyword. */
export const EASE_IN_OUT = cubicBezier(0.42, 0, 0.58, 1);
/**
 * The directed progress (0..1, before the timing function) of an infinite CSS animation `seconds` after the document's clock started, for its duration, direction and
 * delay. A negative delay starts the animation that far into its cycle: -83s on a 190s cycle at time 0 is already 83 s in.
 */
export function directedProgress(seconds, duration, direction, delay = 0) {
    const local = seconds - delay;
    if (local <= 0)
        return direction === 'reverse' || direction === 'alternate-reverse' ? 1 : 0;
    const cycles = local / duration;
    const iteration = Math.floor(cycles);
    const fraction = cycles - iteration;
    const backward = direction === 'reverse'
        || (direction === 'alternate' && iteration % 2 === 1)
        || (direction === 'alternate-reverse' && iteration % 2 === 0);
    return backward ? 1 - fraction : fraction;
}
/**
 * CSS interpolates a gradient's colours in PREMULTIPLIED alpha; a canvas gradient does not, so a stop that fades to a transparent colour of another hue would drift towards
 * that hue. This samples the CSS gradient densely (`per` steps in each segment) and returns straight-alpha stops that a canvas interpolates linearly to the same picture.
 */
export function premultipliedStops(stops, per = 6) {
    const out = [];
    for (let index = 0; index < stops.length - 1; index += 1) {
        const from = stops[index];
        const to = stops[index + 1];
        for (let step = 0; step < per; step += 1) {
            const f = step / per;
            const a = from.a + (to.a - from.a) * f;
            const pr = from.r * from.a + (to.r * to.a - from.r * from.a) * f;
            const pg = from.g * from.a + (to.g * to.a - from.g * from.a) * f;
            const pb = from.b * from.a + (to.b * to.a - from.b * from.a) * f;
            out.push({ at: from.at + (to.at - from.at) * f, r: a > 0 ? pr / a : from.r, g: a > 0 ? pg / a : from.g, b: a > 0 ? pb / a : from.b, a });
        }
    }
    out.push(stops[stops.length - 1]);
    return out;
}
const s = (at, r, g, b, a) => ({ at, r, g, b, a });
export const BACKDROP_GLOWS = Object.freeze([
    /* the top light, secondary then main */
    { rx: 1.5, ry: 0.26, cx: 0.5, cy: 0, stops: [s(0, 236, 121, 101, 0.085), s(0.45, 182, 79, 112, 0.035), s(1, 94, 40, 74, 0)] },
    { rx: 1.2, ry: 0.42, cx: 0.5, cy: -0.08, stops: [s(0, 255, 149, 91, 0.22), s(0.3, 246, 132, 102, 0.15), s(0.52, 222, 106, 123, 0.085), s(0.72, 160, 75, 108, 0.038), s(0.88, 100, 43, 76, 0.012), s(1, 60, 24, 46, 0)] },
    /* the bottom light, secondary then main */
    { rx: 1.5, ry: 0.26, cx: 0.5, cy: 1, stops: [s(0, 88, 80, 190, 0.085), s(0.45, 70, 66, 156, 0.035), s(1, 40, 38, 96, 0)] },
    { rx: 1.2, ry: 0.42, cx: 0.5, cy: 1.08, stops: [s(0, 124, 108, 255, 0.22), s(0.3, 112, 98, 232, 0.15), s(0.52, 92, 84, 196, 0.085), s(0.72, 66, 62, 150, 0.038), s(0.88, 44, 42, 104, 0.012), s(1, 30, 28, 74, 0)] },
]);
export const BANDS = Object.freeze([
    { which: 'bottom', height: 0.30, fade: [[0, 1], [0.22, 0.72], [0.52, 0.3], [0.88, 0]], rise: { direction: 'normal', delay: 0 }, drift: { direction: 'normal', delay: 0 }, sway: { direction: 'alternate', delay: 0 } },
    { which: 'top', height: 0.26, fade: [[0, 1], [0.24, 0.66], [0.54, 0.28], [0.9, 0]], rise: { direction: 'reverse', delay: -1.3 }, drift: { direction: 'reverse', delay: -83 }, sway: { direction: 'alternate-reverse', delay: -19 } },
]);
export const WAVE_TILE_WIDTH = 480;
export const WAVE_LINES = 40;
export const WAVE_RISE_SECONDS = 3.2;
export const WAVE_DRIFT_SECONDS = 190;
export const WAVE_SWAY_SECONDS = 41;
export const WAVE_SWAY_PIXELS = 5;
/** The sway box hangs this far past the band at both ends, so the sway can never drag an edge into view. */
export const WAVE_OVERHANG = 14;
/**
 * Where the wave layer of a band is `seconds` into the document's clock, in the band's own px - exactly what the CSS stacked: the sway box (the band's height and 14 px at each end,
 * moved a few px up and down), the rise box inside it (twice as tall and hung half its height above it, moved up by one line gap per cycle) and the drift layer in that (a tile wider
 * than the band, moved left by a tile per cycle). With `motion` off the CSS parks all three: the rise box is the sway box itself and the tile is as tall as it.
 */
export function bandPlacement(spec, bandHeightPx, seconds, motion) {
    const sway = bandHeightPx + 2 * WAVE_OVERHANG;
    if (!motion)
        return { layerX: 0, layerY: -WAVE_OVERHANG, tileHeight: sway, layerHeight: sway };
    const swayProgress = EASE_IN_OUT(directedProgress(seconds, WAVE_SWAY_SECONDS, spec.sway.direction, spec.sway.delay));
    const swayY = WAVE_SWAY_PIXELS + (-WAVE_SWAY_PIXELS - WAVE_SWAY_PIXELS) * swayProgress;
    const riseProgress = directedProgress(seconds, WAVE_RISE_SECONDS, spec.rise.direction, spec.rise.delay);
    const riseHeight = 2 * sway;
    const riseY = -((50 / WAVE_LINES) / 100) * riseHeight * riseProgress;
    const driftProgress = directedProgress(seconds, WAVE_DRIFT_SECONDS, spec.drift.direction, spec.drift.delay);
    return { layerX: -WAVE_TILE_WIDTH * driftProgress, layerY: -WAVE_OVERHANG + swayY - sway / 2 + riseY, tileHeight: sway, layerHeight: riseHeight };
}
/** The ripple field's turn and travel at `seconds`: spin in turns (0..1), and scale (1 .. 1.0364). Both loop linearly. With `motion` off the field is parked as the CSS parks it. */
export const RIPPLE_SPIN_SECONDS = 263;
export const RIPPLE_TRAVEL_SECONDS = 2.4;
export const RIPPLE_TRAVEL_SCALE = 1.0364;
export function ripplePose(seconds, motion) {
    if (!motion)
        return { turns: 0, scale: 1 };
    const turns = (seconds / RIPPLE_SPIN_SECONDS) % 1;
    const travel = (seconds / RIPPLE_TRAVEL_SECONDS) % 1;
    return { turns, scale: 1 + (RIPPLE_TRAVEL_SCALE - 1) * travel };
}
/** The Moon's hole (alpha taken OUT of what is drawn): clear to 89 % of the Moon's radius, closed by 93 % - the feather the mask always had. */
export const MOON_HOLE = Object.freeze([[0, 1], [0.89, 1], [0.93, 0], [1, 0]]);
/** The Sun's hole: fully clear to a third of its radius (the hot core and the inner corona), feathered back to the backdrop by the full radius. alpha out = 1 - the mask's alpha. */
export const SUN_HOLE = Object.freeze([[0, 1], [0.34, 1], [0.58, 0.6], [0.82, 0.18], [1, 0]]);
