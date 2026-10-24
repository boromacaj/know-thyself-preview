import { ASTRO_PHASES } from './astrologyMenuGeometry.js';
import { WINDOW_LOOP, fadeAt, slotAt, slotSeconds } from './windowCycle.js';
/*
 * THE ASTROLOGY CARD'S CLOCK - EIGHT PHASES, SIX AND THREE QUARTER SECONDS EACH. Pure functions of time (used by the stylesheet, for the keyframes, and by the tests). The cycle (all eight phases once,
 * then a still moment together with the other three window cards, then round again) is windowCycle.ts's.
 *
 * A phase's slot (6.75 s; the times below are for the old 3.5 s slot, and are stretched to the slot), at the middle of the window, one at a time:
 *
 *    0.25 - 1.15   THE CIRCLE IS DRAWN, from the top, as with a pen
 *    1.00 - 1.90   THE LIT PART comes in inside it - the share of the Moon that is lit at this phase, with its light under it (the new moon has none: only its circle); the window's ring flares softly (1.0 - 2.2)
 *    to the fade   it stands
 *    the fade      IT FADES OUT SOFTLY, circle and light together (nothing is wiped away backwards), a breath before the next slot begins. The last phase (the waning crescent) stays through the still moment.
 *
 * Nothing moves across the window and nothing comes in from its side. Every phase's show is the same, so the stylesheet has a track each for the circle's line and the light (and one more of each for
 * the last phase, whose fade comes after the still moment), and starts each phase's copy at its own moment (animation-delay); the ring's flare is one track for the whole loop.
 */
export const ASTRO_COUNT = ASTRO_PHASES.length;
export const ASTRO_SECONDS_PER_PHASE = slotSeconds(ASTRO_COUNT);
export const ASTRO_PERIOD = WINDOW_LOOP;
/** The times of the first design, for a 3.5 s slot. */
const REFERENCE_SLOT = 3.5;
const STRETCH = ASTRO_SECONDS_PER_PHASE / REFERENCE_SLOT;
export const ASTRO_TIMES = Object.freeze({
    ringStart: 0.25 * STRETCH,
    ringEnd: 1.15 * STRETCH,
    litStart: 1.0 * STRETCH,
    litEnd: 1.9 * STRETCH,
    flareAt: 1.6 * STRETCH,
    flareHalf: 0.6 * STRETCH,
});
const T = ASTRO_TIMES;
const clamp01 = (u) => Math.min(1, Math.max(0, u));
const ease = (u) => { const t = clamp01(u); return t * t * (3 - 2 * t); };
const bump = (seconds, centre, half) => { const u = 1 - Math.abs(seconds - centre) / half; return u <= 0 ? 0 : ease(u); };
/**
 * A phase's circle, `t` seconds into its slot, as the dash offset of a path of pathLength 1 drawn with the dash pattern "1 3": 1 is nothing yet, 0 the whole circle. `opacity` is 0 where there is nothing
 * (a round cap would otherwise show), 1 while it stands and the fade after. `last` is for the last phase of the cycle, whose fade comes after the still moment.
 */
export function ringLineIn(t, last = false) {
    const offset = 1 - ease((t - T.ringStart) / (T.ringEnd - T.ringStart));
    const opacity = fadeAt(t, ASTRO_SECONDS_PER_PHASE, last);
    return offset >= 0.999 || opacity <= 0.001 ? { offset: 1, opacity: 0 } : { offset, opacity: +opacity.toFixed(3) };
}
/** The lit part of a phase, 0 to 1, `t` seconds into its slot: it comes in after the circle is drawn and fades with the circle. */
export const litIn = (t, last = false) => ease((t - T.litStart) / (T.litEnd - T.litStart)) * fadeAt(t, ASTRO_SECONDS_PER_PHASE, last);
/** Which phase's slot it is (0 to 7: the phase that has most recently started; the last phase's slot lasts through the still moment) and how far into it. */
export const phaseAt = (seconds) => slotAt(seconds, ASTRO_COUNT);
/** Phase `index` at a moment of the loop: its circle and its light. Nothing when it is not its turn. */
export function moonAt(index, seconds) {
    const clock = phaseAt(seconds);
    if (clock.index !== index)
        return { offset: 1, opacity: 0, lit: 0 };
    const last = index === ASTRO_COUNT - 1;
    return { ...ringLineIn(clock.t, last), lit: litIn(clock.t, last) };
}
/** The ring's soft flare, 0 to 0.7, `t` seconds into a phase's slot: while the light comes in. */
export const flareLocal = (t) => bump(t, T.flareAt, T.flareHalf) * 0.7;
export const flareAt = (seconds) => flareLocal(phaseAt(seconds).t);
