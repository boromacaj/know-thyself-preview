import { NUM_SEQUENCE } from './numerologyMenuGeometry.js?v=f9ab0a6';
import { WINDOW_LOOP, fadeAt, slotAt, slotSeconds } from './windowCycle.js?v=f9ab0a6';
/*
 * THE NUMEROLOGY CARD'S CLOCK - NINE NUMBERS A LOOP, 3.6 SECONDS EACH, THE SCRIPTS CHANGING PLACES ON THE NEXT LOOP. Pure functions of time (used by the stylesheet, for the keyframes, and by the tests).
 * The loop (all nine numbers once, then a still moment together with the other three window cards, then round again) is windowCycle.ts's, and the pace - 3.6 s a picture - is Human Design's.
 *
 * ONE ROUND A LOOP. A loop shows the numbers 1 to 9 once: in the first round the odd ones in Roman numerals and the even ones in Arabic (I 2 III 4 V 6 VII 8 IX); when it is over and all four cards begin
 * again, the scripts change places (1 II 3 IV 5 VI 7 VIII 9), and the loop after that is the first round again. So the card's own period is two loops, and every number is seen both ways.
 *
 * A number's slot (3.6 s; the times below are for the old 3.5 s slot, and are stretched to the slot):
 *
 *    0.25 - 1.65   THE NUMBER IS WRITTEN, as with a pen: stroke after stroke, each from its start to its end (a Roman III is three strokes, an Arabic 2 one); the window's ring flares softly (0.5 - 1.7)
 *    to the fade   it stands
 *    the fade      IT FADES OUT SOFTLY, all its strokes together (nothing is wiped away backwards), a breath before the next slot begins. The last number of a round (IX, or 9) stays through the still moment.
 *
 * Only one number is ever in the window. A number's show is the same for every number with the same count of strokes, so the stylesheet has ONE track for each stroke of each count (1 to 4) - and
 * more for each stroke of the last numbers of the rounds, whose fade comes after the still moment - two loops long, and starts each number's copy of it at its own moment (animation-delay); the ring's
 * flare is one track for the card's whole period.
 */
/** Numbers in a round (one loop). */
export const NUM_ROUND = 9;
export const NUM_COUNT = NUM_SEQUENCE.length;
export const NUM_ROUNDS = NUM_COUNT / NUM_ROUND;
export const NUM_SECONDS_PER_NUMBER = slotSeconds(NUM_ROUND);
/** The card's period: a round a loop, so two loops - every number in both scripts. */
export const NUM_PERIOD = NUM_ROUNDS * WINDOW_LOOP;
/** The most strokes a number has (VIII: V and three bars). */
export const NUM_MAX_STROKES = Math.max(...NUM_SEQUENCE.map((shape) => shape.strokes.length));
/** The times of the first design, for a 3.5 s slot. */
const REFERENCE_SLOT = 3.5;
const STRETCH = NUM_SECONDS_PER_NUMBER / REFERENCE_SLOT;
export const NUM_TIMES = Object.freeze({
    writeStart: 0.25 * STRETCH,
    writeEnd: 1.65 * STRETCH,
    flareAt: 1.1 * STRETCH,
    flareHalf: 0.6 * STRETCH,
});
const T = NUM_TIMES;
const clamp01 = (u) => Math.min(1, Math.max(0, u));
const ease = (u) => { const t = clamp01(u); return t * t * (3 - 2 * t); };
/** A pen's pace along one stroke: it starts and ends a little slower, and is never still. */
const pen = (u) => { const t = clamp01(u); return 0.35 * t + 0.65 * ease(t); };
const bump = (seconds, centre, half) => { const u = 1 - Math.abs(seconds - centre) / half; return u <= 0 ? 0 : ease(u); };
/** Whether number `index` is the last of its round (it stays through the still moment). */
export const isLastOfRound = (index) => index % NUM_ROUND === NUM_ROUND - 1;
/** The moment, in the card's period, at which number `index`'s slot begins: its round's loop, and its place in the round. */
export const slotStart = (index) => Math.floor(index / NUM_ROUND) * WINDOW_LOOP + (index % NUM_ROUND) * NUM_SECONDS_PER_NUMBER;
/** Which number the clock is on (0 to 17: the round of this loop and the place in it) and how far into its slot (the last number of a round has its slot through the still moment). */
export function numberAt(seconds) {
    const wrapped = ((seconds % NUM_PERIOD) + NUM_PERIOD) % NUM_PERIOD;
    const round = Math.min(NUM_ROUNDS - 1, Math.floor(wrapped / WINDOW_LOOP));
    const clock = slotAt(wrapped - round * WINDOW_LOOP, NUM_ROUND);
    return { index: round * NUM_ROUND + clock.index, t: clock.t };
}
/**
 * Stroke `k` of a number of `count` strokes, `t` seconds into the number's slot, as the dash offset of a path of pathLength 1 drawn with the dash pattern "1 3": 1 is nothing yet, 0 the whole stroke.
 * `opacity` is 0 where there is nothing (a round cap would otherwise show), 1 while it stands and the fade after. `last` is for the last number of a round, whose fade comes after the still moment.
 */
export function strokeAt(count, k, t, last = false) {
    const span = (T.writeEnd - T.writeStart) / count;
    const from = T.writeStart + k * span;
    const offset = 1 - pen((t - from) / span);
    const opacity = fadeAt(t, NUM_SECONDS_PER_NUMBER, last);
    return offset >= 0.999 || opacity <= 0.001 ? { offset: 1, opacity: 0 } : { offset, opacity: +opacity.toFixed(3) };
}
/** Number `index`'s stroke `k` at a moment of the card's period. Nothing when it is not the number's turn. */
export function numeralAt(index, k, seconds) {
    const clock = numberAt(seconds);
    return clock.index === index ? strokeAt(NUM_SEQUENCE[index].strokes.length, k, clock.t, isLastOfRound(index)) : { offset: 1, opacity: 0 };
}
/** The ring's soft flare, 0 to 0.7, `t` seconds into a number's slot: while a number is written. */
export const flareLocal = (t) => bump(t, T.flareAt, T.flareHalf) * 0.7;
export const flareAt = (seconds) => flareLocal(numberAt(seconds).t);
