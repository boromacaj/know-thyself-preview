import { HD_ORDER } from './humanDesignMenuGeometry.js?v=b5ef5ed';
import { WINDOW_LOOP, fadeAt, slotAt, slotSeconds } from './windowCycle.js?v=b5ef5ed';
/*
 * THE HUMAN DESIGN CARD'S CLOCK - NINE CENTRES, SIX SECONDS EACH. Pure functions of time (used by the stylesheet, for the keyframes, and by the tests). The cycle (all nine centres once, then a still
 * moment together with the other three window cards, then round again) is windowCycle.ts's.
 *
 * A centre's slot (6 s; the times below are for the old 3.6 s slot, and are stretched to the slot):
 *
 *    0.25 - 1.05   THE CENTRE is drawn, as a line of light, round its silhouette, with a matte fill that comes in as it is drawn
 *    0.90 - 2.10   ITS CHANNELS grow out of it, slowly, each from the silhouette's edge along its own route to the window's edge; the ring flares softly (1.0 - 2.2)
 *    to the fade   all of it stands
 *    the fade      ALL OF IT FADES OUT SOFTLY (nothing is wiped away backwards), a breath before the next centre's slot begins. The last centre (the Root) stays through the still moment.
 *
 * Only one centre is ever in the window, and only its own channels. It is slow and quiet on purpose: this is the first card a reader looks at.
 */
export const HD_COUNT = HD_ORDER.length;
export const HD_SLOT = slotSeconds(HD_COUNT);
export const HD_PERIOD = WINDOW_LOOP;
/** The times of the first design, for a 3.6 s slot. */
const REFERENCE_SLOT = 3.6;
const STRETCH = HD_SLOT / REFERENCE_SLOT;
export const HD_TIMES = Object.freeze({
    shapeStart: 0.25 * STRETCH,
    shapeEnd: 1.05 * STRETCH,
    channelStart: 0.9 * STRETCH,
    channelEnd: 2.1 * STRETCH,
    flareAt: 1.6 * STRETCH,
    flareHalf: 0.6 * STRETCH,
});
const T = HD_TIMES;
const clamp01 = (u) => Math.min(1, Math.max(0, u));
const ease = (u) => { const t = clamp01(u); return t * t * (3 - 2 * t); };
const bump = (seconds, centre, half) => { const u = 1 - Math.abs(seconds - centre) / half; return u <= 0 ? 0 : ease(u); };
const isLast = (index) => index === HD_COUNT - 1;
/** Which centre the clock is on (0 to 8) and how far into its slot (the last centre's slot lasts through the still moment). */
export const centreAt = (seconds) => slotAt(seconds, HD_COUNT);
const NOTHING = { offset: 1, opacity: 0 };
/**
 * Centre `index`'s silhouette `t` seconds into its slot, as the dash offset of a path of pathLength 1 drawn with the dash pattern "1 3": 1 is nothing yet, 0 the whole line. `opacity` is 0 where there is
 * nothing (a round cap would otherwise show), 1 while it stands and the fade after.
 */
export function shapeLineIn(index, t) {
    const offset = 1 - ease((t - T.shapeStart) / (T.shapeEnd - T.shapeStart));
    const opacity = fadeAt(t, HD_SLOT, isLast(index));
    return offset >= 0.999 || opacity <= 0.001 ? NOTHING : { offset, opacity: +opacity.toFixed(3) };
}
/** Centre `index`'s channels `t` seconds into its slot: they grow out of the centre (1 to 0) and fade with it. Each is a path that starts at the silhouette's edge. */
export function channelLineIn(index, t) {
    const offset = 1 - ease((t - T.channelStart) / (T.channelEnd - T.channelStart));
    const opacity = fadeAt(t, HD_SLOT, isLast(index));
    return offset >= 0.999 || opacity <= 0.001 ? NOTHING : { offset, opacity: +opacity.toFixed(3) };
}
/** The matte fill of the centre `t` seconds into its slot: it comes in as the silhouette is drawn and fades with it. */
export const tintIn = (index, t) => ease((t - T.shapeStart) / (T.shapeEnd - T.shapeStart)) * fadeAt(t, HD_SLOT, isLast(index));
export function shapeLineAt(index, seconds) {
    const clock = centreAt(seconds);
    return clock.index === index ? shapeLineIn(index, clock.t) : NOTHING;
}
export function channelLineAt(index, seconds) {
    const clock = centreAt(seconds);
    return clock.index === index ? channelLineIn(index, clock.t) : NOTHING;
}
export function tintAt(index, seconds) {
    const clock = centreAt(seconds);
    return clock.index === index ? tintIn(index, clock.t) : 0;
}
/** The ring's soft flare, 0 to 0.7: while the channels grow. */
export const flareAt = (seconds) => bump(centreAt(seconds).t, T.flareAt, T.flareHalf) * 0.7;
