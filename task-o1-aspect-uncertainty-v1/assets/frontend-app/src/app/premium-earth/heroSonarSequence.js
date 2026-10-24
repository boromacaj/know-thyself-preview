/*
 * THE SEQUENCED SONAR, AS ONE SHARED PRIMITIVE.
 *
 * The BaZi hero (baziSonarTargets.ts) is where the calm, one-ring-at-a-time sonar was approved on the owner's phone: a group of controls shares one long cycle, each
 * has a turn of it, and inside its turn a ring grows with the standard's ease-out while it fades linearly (kt-sonar-grow / kt-sonar-fade, sonarAffordance.ts, stretched
 * over the group's cycle). Numerology's four circles and Human Design's nine centres take THEIR turns with these very functions and these very curves, so the three
 * heroes cannot drift apart: a change to the rhythm is a change here.
 *
 *   sequenceKeyframes(name, count)   the two keyframes of a group of `count` turns: a ring is visible for 80% of its 1/count turn (1.12 s of a 1.4 s slot, the standard's own
 *                                     window of 40% of 2.8 s) and peaks a fifth of the way in
 *   sequencedAnimation(name)         the animation shorthand: ease-out grow, linear fade, the group's period and the control's own delay as tokens
 *
 * The tokens (--<prefix>-period, -delay, -peak, -sx, -sy) are set per control; the prefix keeps BaZi's own names (`bz-seq`) untouched.
 */
/** Seconds one ring of a sequenced group has the stage (BaZi's approved value). */
export const SEQUENCE_SLOT_SECONDS = 1.4;
/** The standard's ease-out for the growth of a ring. */
export const SEQUENCE_GROW_EASING = 'cubic-bezier(0.2, 0.62, 0.3, 1)';
/** The share of a turn in which a ring is visible, and the share of that window in which it reaches its peak. */
export const SEQUENCE_VISIBLE_SHARE = 0.8;
export const SEQUENCE_PEAK_SHARE = 0.2;
export const seconds = (value) => `${Number(value.toFixed(2))}s`;
/** One ring's turn: the group's cycle is `count` turns, a turn is 1/count of it; the ring grows through its turn with the ease-out and fades linearly from just after it starts. */
export function sequenceKeyframes(name, count, prefix = 'bz-seq') {
    /* the standard's ring is visible for 40% of a 2.8 s cycle (1.12 s) and peaks a fifth of the way into that: the same window, inside a 1.4 s turn */
    const turn = Number(((100 / count) * SEQUENCE_VISIBLE_SHARE).toFixed(2));
    const fadeIn = Number((turn * SEQUENCE_PEAK_SHARE).toFixed(2));
    return `
    @keyframes ${name}-grow {
      0% { transform: scale(1); }
      ${turn}%, 100% { transform: scale(var(--${prefix}-sx), var(--${prefix}-sy)); }
    }
    @keyframes ${name}-fade {
      0% { opacity: 0; }
      ${fadeIn}% { opacity: var(--${prefix}-peak); }
      ${turn}%, 100% { opacity: 0; }
    }`;
}
export function sequencedAnimation(name, prefix = 'bz-seq') {
    return `animation:
        ${name}-grow var(--${prefix}-period) ${SEQUENCE_GROW_EASING} var(--${prefix}-delay) infinite,
        ${name}-fade var(--${prefix}-period) linear var(--${prefix}-delay) infinite;`;
}
/** The one source of truth for the fast rhythm's numbers. */
export const FAST_PING = Object.freeze({ startInterval: 0.225, visible: 1.12, rest: 0.8, peakShare: 0.2 });
export const fastPingRhythm = (count) => Object.freeze({ count, ...FAST_PING });
/** The cycle of a profile, in seconds. */
export const pingCycleSeconds = (rhythm) => Number(((rhythm.count - 1) * rhythm.startInterval + rhythm.visible + rhythm.rest).toFixed(4));
/** The delay of target `index` (0-based, in the hero's own order), in seconds. */
export const pingDelaySeconds = (rhythm, index) => Number((index * rhythm.startInterval).toFixed(4));
const share = (seconds_, rhythm) => Number(((seconds_ / pingCycleSeconds(rhythm)) * 100).toFixed(3));
/** The wave's two keyframes over the profile's cycle: the ring grows through its whole visible window with the standard's ease-out, rises linearly to its peak over the first part of it and fades linearly to nothing - the Western Astrology wave's active envelope (kt-sonar-grow / kt-sonar-fade without their idle first 60%). */
export function pingKeyframes(name, rhythm, prefix) {
    const turn = share(rhythm.visible, rhythm);
    const rise = share(rhythm.visible * rhythm.peakShare, rhythm);
    return `
    @keyframes ${name}-grow {
      0% { transform: scale(1); }
      ${turn}%, 100% { transform: scale(var(--${prefix}-sx), var(--${prefix}-sy)); }
    }
    @keyframes ${name}-fade {
      0% { opacity: 0; }
      ${rise}% { opacity: var(--${prefix}-peak); }
      ${turn}%, 100% { opacity: 0; }
    }`;
}
/** A time as CSS, to the millisecond (`seconds` above rounds to a hundredth, which would turn the 0.225 s interval into 0.23 s). */
export const pingSeconds = (value) => `${Number(value.toFixed(4))}s`;
