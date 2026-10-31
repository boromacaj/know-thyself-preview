import { BZ_ELEMENTS } from './baziMenuGeometry.js';
import { WINDOW_LOOP, fadeAt, slotAt, slotSeconds } from './windowCycle.js';
/*
 * THE BAZI CARD'S CLOCK - THE FIVE ELEMENTS, TWICE, FIVE AND A HALF SECONDS EACH. Pure functions of time (used by the stylesheet, for the keyframes, and by the tests). The cycle (all the pictures once,
 * then a still moment together with the other three window cards, then round again) is windowCycle.ts's.
 *
 * The five elements go round twice in a cycle (木 火 土 金 水 木 火 土 金 水: each gives rise to the next, and water feeds wood again), so that a character's slot is about as long as the other window
 * cards' pictures' and the cycle is as long as theirs. A character's slot (5.4 s; the times below are for the old 4.2 s slot, and are stretched to the slot):
 *
 *    0.25 - 2.45   THE CHARACTER IS WRITTEN, as with a pen: stroke after stroke in the order a Chinese character is written, each stroke taking a share of the time in proportion to its length (and
 *                  a little for the pen's start), a short pause between strokes (木 has four strokes, 金 eight); its light is written with it; the window's ring flares softly (0.6 - 2.4)
 *    to the fade   it stands
 *    the fade      IT FADES OUT SOFTLY, all its strokes together (nothing is wiped away backwards), a breath before the next slot begins. The last character stays through the still moment.
 *
 * Only one character is ever in the window. It is slow and quiet on purpose: this is the first card a reader looks at.
 */
/** The five elements are shown this many times in a cycle. */
export const BZ_ROUNDS = 2;
export const BZ_COUNT = BZ_ELEMENTS.length * BZ_ROUNDS;
export const BZ_SLOT = slotSeconds(BZ_COUNT);
export const BZ_PERIOD = WINDOW_LOOP;
/** The times of the first design, for a 4.2 s slot. */
const REFERENCE_SLOT = 4.2;
const STRETCH = BZ_SLOT / REFERENCE_SLOT;
export const BZ_TIMES = Object.freeze({
    writeStart: 0.25 * STRETCH,
    writeEnd: 2.45 * STRETCH,
    pause: 0.08 * STRETCH,
    flareAt: 1.5 * STRETCH,
    flareHalf: 0.9 * STRETCH,
});
const T = BZ_TIMES;
const clamp01 = (u) => Math.min(1, Math.max(0, u));
const ease = (u) => { const t = clamp01(u); return t * t * (3 - 2 * t); };
/** A pen's pace along one stroke: it starts and ends a little slower, and is never still. */
const pen = (u) => { const t = clamp01(u); return 0.35 * t + 0.65 * ease(t); };
const bump = (seconds, centre, half) => { const u = 1 - Math.abs(seconds - centre) / half; return u <= 0 ? 0 : ease(u); };
/** Which slot the clock is on (0 to 9) and how far into it (the last slot lasts through the still moment); the element is `slot % 5`. */
export function elementAt(seconds) {
    const clock = slotAt(seconds, BZ_COUNT);
    return { index: clock.index % BZ_ELEMENTS.length, slot: clock.index, t: clock.t };
}
/** When each stroke of element `index` is written, in the slot's own time: one after another, each for a share of the writing time in proportion to its length (plus a little for the pen's start). */
export function strokeWindows(index) {
    const pens = BZ_ELEMENTS[index].pens;
    const weights = pens.map((p) => p.length + 8);
    const sum = weights.reduce((a, b) => a + b, 0);
    const room = T.writeEnd - T.writeStart - T.pause * (pens.length - 1);
    let at = T.writeStart;
    return pens.map((_, k) => {
        const from = at;
        const to = from + (room * weights[k]) / sum;
        at = to + T.pause;
        return { from, to };
    });
}
/**
 * Stroke `k` of element `index`'s pen, `t` seconds into its slot, as the dash offset of a path of pathLength 1 drawn with the dash pattern "1 3": 1 is nothing yet, 0 the whole stroke. `opacity` is 0
 * where there is nothing (a round cap would otherwise show), 1 while the character stands and the fade after (the stroke is the mask through which the character is shown, so its opacity is the
 * character's). `last` is for the last slot of the cycle, whose fade comes after the still moment.
 */
export function penAt(index, k, t, last = false) {
    const window = strokeWindows(index)[k];
    const offset = 1 - pen((t - window.from) / (window.to - window.from));
    const opacity = fadeAt(t, BZ_SLOT, last);
    return offset >= 0.999 || opacity <= 0.001 ? { offset: 1, opacity: 0 } : { offset, opacity: +opacity.toFixed(3) };
}
/** Stroke `k` of element `index` at a moment of the loop. Nothing when it is not the element's turn (it has two turns in a cycle). */
export function strokeAt(index, k, seconds) {
    const clock = elementAt(seconds);
    return clock.index === index ? penAt(index, k, clock.t, clock.slot === BZ_COUNT - 1) : { offset: 1, opacity: 0 };
}
/** The ring's soft flare, 0 to 0.7: while a character is written. */
export const flareAt = (seconds) => bump(elementAt(seconds).t, T.flareAt, T.flareHalf) * 0.7;
