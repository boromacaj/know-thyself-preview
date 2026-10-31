import { MENU_LINE_GLOW_RGB, MENU_LINE_HOT_RGB } from './connectionsHeartStyle.js?v=2ea79e9';
import { SYN_ARC_COUNT, SYN_ARC_DEGREES, SYN_BARS, SYN_GLOW_ALPHA, SYN_HALF_OUTLINE_LENGTH, SYN_GLOW_WIDTH, SYN_LEAF_DIRECTIONS, SYN_LEAF_OFFSET, SYN_LEAF_START_SCALE, SYN_LINE_ALPHA, SYN_LINE_WIDTH, SYN_MATTE, SYN_SIDE, SYN_SURVIVOR, SYN_TINT_ALPHA, synSlotOffset, } from './synthesisMenuGeometry.js?v=2ea79e9';
/*
 * THE CROSS-PILLAR SYNTHESIS CARD ON THE MAIN MENU - ITS LIGHT AND ITS MOTION.
 *
 * The markup is synthesisMenuArt.ts and the shapes are synthesisMenuGeometry.ts. This is the stylesheet, in a module of its own for the reason connectionsHeartStyle.ts
 * gives: menuExperience.ts is pinned to have no motion system, and only includes this text in the stylesheet it already injects.
 *
 * ONE STORY, ONE CLOCK, EIGHTEEN AND A HALF SECONDS. The four pillars of the four systems come together, become a ring, and come apart again - the same way in and out:
 *
 *    0.00 -  1.80   THE FOUR COME IN    from the two sides of the card, out of nothing: the inner two first, the outer two a hair after, each slowing as it arrives; the last stands in
 *                                       its place at 1.8
 *    1.85 -  3.40   THE FOUR, SIDE BY SIDE   and only now, ALL FOUR TOGETHER, a band of light runs DOWN from each of the four names (1.85) and DRAWS its trace behind it - the traces are not
 *                                       there before; the four bands arrive in the four pillars at once (2.7) and KINDLE them, smoothly, from their tops down both sides to their feet (2.7 - 3.3)
 *    3.40 -  5.00   THEY MERGE          into the one pillar (the second from the left); the other three go into it
 *    5.00 -  7.60   THE TURN            the pillar turns clockwise about its middle, slowly, then fast, then slowly; its two ends draw the ring (it is complete at a half
 *                                       turn, and the pillar goes on, dissolving into it, to the full turn)
 *    7.40 - 10.00   THE LEAVES          four soft circles open inside the ring, matte, and are held a moment (8.4 - 9.2), and close; the pillar's light is put out while it is not seen (8.2 - 8.6)
 *   10.20 - 12.80   THE TURN BACK       the pillar comes out of the ring, dim, and turns back, counter-clockwise, taking the ring in as it goes, and stands upright
 *   12.80 - 14.40   THEY PART           four dim pillars again, side by side
 *   14.45 - 15.90   THE FOUR, SIDE BY SIDE   once more the four bands run DOWN from the names (14.45), draw the traces, arrive together (15.3) and kindle the four pillars from the top (15.3 - 15.9)
 *   15.90 - 17.95   THEY GO            out to the two sides, lit, the outer two first, each leaving slowly and then quickly, into nothing; the light is put out when no pillar is left
 *   17.95 - 18.50   the card is empty; the last frame is the first
 *
 * THE RING IS NOT SCALED OR STRETCHED INTO BEING. It is the path of the turning pillar's two ends: 72 arcs of 5 degrees, each lit by its opacity at the moment an end of
 * the pillar passes it (the moment is read from the pillar's own turn, so the line and the end agree), and put out in the reverse order as the pillar turns back. The ring's
 * glow follows the same sweep as one circle.
 *
 * MOTION is a box moved by a transform and its opacity, all that a browser's compositor runs off the main thread - no filter, no blur, no mask, no clip, nothing in script, no
 * timer, no frame loop - with ONE exception: the kindling of the pillars (and, in synthesisTraceStyle.ts, the traces and the bands of light) is a dash grown along a path by
 * stroke-dashoffset, because a smooth reveal along a path cannot be made of opacity (it was, in four slices, and the owner saw the steps); sixteen tiny paths, a second or two in the
 * loop, and the audit's frame probe shows no cost. Position (the pillars' coming and going, merging and parting) has its easing in the keyframes; opacity and the turn are
 * sampled from their functions, and each is the same curve the owner approved in the preview.
 *
 * LIGHT is the Connections heart's (MENU_LINE_HOT_RGB over MENU_LINE_GLOW_RGB, the heart's alphas), and what lies inside the ring is the same light turned down.
 *
 * PAUSE: a card that cannot be seen is not animated. forecastMenuLifecycle.ts sets data-fc-run="off" on the menu surface when the document is hidden, the surface is not the
 * destination on screen, or the cards are outside the visible part of their scroller; the clock stops where it is and goes on from there when the card is seen again.
 *
 * LESS MOTION: a device that asks for it gets the finished picture, still: the ring, closed, with the four leaves in it, and no pillars.
 */
export const SYNTHESIS_MENU_PERIOD = 18.5;
/** When things happen, in seconds from the loop's start. */
export const SYN_TIMES = Object.freeze({
    /** A pillar starts coming in at this moment (the inner two first), and takes arriveDuration to arrive: the last one stands in its place at 1.8 s. */
    arriveStart: Object.freeze([0.1, 0, 0, 0.1]),
    arriveDuration: 1.7,
    /**
     * THE LIGHT OF THE FOUR TRACES ARRIVES IN THE FOUR LITTLE PILLARS AT ONCE, at igniteStart (the first time) and igniteSecond (the second time, when the four have parted), and kindles
     * them: each pillar's outline is lit from the top down both sides in igniteDuration, smoothly. The four are the same, so one keyframes rule serves all four. The bands that bring the
     * light start igniteStart minus the time they take, which is after the last pillar has stood in its place.
     */
    igniteStart: 2.7,
    igniteSecond: 15.3,
    igniteDuration: 0.6,
    /** The pillar's light is put out while no pillar is seen: after the first kindling (the pillar is the ring then), and when all four have left. */
    dropStart: 8.2,
    dropEnd: 8.6,
    dropFinalStart: 18.0,
    dropFinalEnd: 18.3,
    mergeStart: 3.4,
    mergeEnd: 5.0,
    spinStart: 5.0,
    spinEnd: 7.6,
    goneStart: 6.0,
    goneEnd: 7.6,
    discStart: 6.3,
    discEnd: 7.2,
    leavesStart: 7.4,
    leavesEnd: 8.4,
    leavesOutStart: 9.2,
    leavesOutEnd: 10.0,
    backStart: 10.2,
    backEnd: 12.8,
    goneBackStart: 10.2,
    goneBackEnd: 11.8,
    discOutStart: 10.6,
    discOutEnd: 11.5,
    partStart: 12.8,
    partEnd: 14.4,
    /** A pillar starts leaving at departStart plus its own delay (the outer two first), and takes departDuration to go. */
    departStart: 15.9,
    departDuration: 1.8,
    departDelay: Object.freeze([0, 0.25, 0.25, 0]),
});
const T = SYN_TIMES;
const END = SYNTHESIS_MENU_PERIOD;
/** The time between the keyframes of a sampled track, in seconds. */
export const SYN_TURN_SAMPLE = 1 / 20;
export const SYN_OPACITY_SAMPLE = 1 / 10;
/** The kindling of a pillar is quick (0.6 s) and must be smooth: its keyframes are close. */
export const SYN_IGNITE_SAMPLE = 1 / 40;
const clamp01 = (u) => Math.min(1, Math.max(0, u));
const lerp = (from, to, v) => from + (to - from) * v;
/** A gentle ease in and out (smootherstep: no jerk at either end). */
const ease = (u) => { const t = clamp01(u); return t * t * t * (t * (6 * t - 15) + 10); };
/** The eased progress, 0 to 1, of something that starts at `from` and ends at `to`. */
const seg = (seconds, from, to) => ease((seconds - from) / (to - from));
const lin = (seconds, from, to) => clamp01((seconds - from) / (to - from));
/** Arriving slows down (ease out, cubic); leaving speeds up (ease in, cubic). */
const easeOut = (u) => 1 - (1 - clamp01(u)) ** 3;
const easeIn = (u) => clamp01(u) ** 3;
/** A smooth bump, 1 at `centre` and 0 a half-width away. */
/** How far the four have merged into one: 0 side by side, 1 one pillar. */
export const merged = (seconds) => seg(seconds, T.mergeStart, T.mergeEnd) * (1 - seg(seconds, T.partStart, T.partEnd));
/** The turn of the one pillar, in degrees clockwise: a full turn forward, and back to nothing. */
export const turnAt = (seconds) => 360 * seg(seconds, T.spinStart, T.spinEnd) - 360 * seg(seconds, T.backStart, T.backEnd);
/** How far the ring is drawn, in degrees of the half circle each end of the pillar draws (0 to 180). */
export const sweepAt = (seconds) => Math.min(180, turnAt(seconds));
/** The moment the pillar's turn passes `degrees`, on the way round (forward) or on the way back. Bisection on a monotonic curve. */
function turnReaches(degrees, forward) {
    let low = forward ? T.spinStart : T.backStart;
    let high = forward ? T.spinEnd : T.backEnd;
    for (let step = 0; step < 48; step += 1) {
        const middle = (low + high) / 2;
        const reached = forward ? turnAt(middle) >= degrees : turnAt(middle) <= degrees;
        if (reached)
            high = middle;
        else
            low = middle;
    }
    return (low + high) / 2;
}
/** HOW MUCH OF A PILLAR'S SHIFT it has made: 1 off the card's edge, 0 in its place. (Where it is: see moveKeyframes, which has the same figures with their easing.) */
const arrival = (bar, seconds) => easeOut(lin(seconds, T.arriveStart[bar], T.arriveStart[bar] + T.arriveDuration));
const departure = (bar, seconds) => easeIn(lin(seconds, T.departStart + T.departDelay[bar], T.departStart + T.departDelay[bar] + T.departDuration));
/** How lit a pillar is at a moment, 0 to 1. */
export function barOpacityAt(bar, seconds) {
    const come = arrival(bar, seconds);
    const go = departure(bar, seconds);
    const together = merged(seconds);
    let opacity = seg(come, 0, 0.5) * (1 - seg(go, 0.5, 1));
    if (bar === SYN_SURVIVOR) {
        opacity *= 1 - seg(seconds, T.goneStart, T.goneEnd) * (1 - seg(seconds, T.goneBackStart, T.goneBackEnd));
    }
    else {
        opacity *= 1 - seg(together, 0.45, 0.95);
    }
    return opacity;
}
/**
 * How much of a pillar's outline is lit, 0 to 1: it is revealed from the top down both sides as the light of the traces arrives (twice: when the four first stand side by side, and when
 * they have parted), and put out while no pillar is seen. The same for all four pillars. A pillar's dim self is its base; this is what is added to it.
 */
export function igniteAt(seconds) {
    const first = seg(seconds, T.igniteStart, T.igniteStart + T.igniteDuration) * (1 - seg(seconds, T.dropStart, T.dropEnd));
    const second = seg(seconds, T.igniteSecond, T.igniteSecond + T.igniteDuration);
    return Math.max(first, second) * (1 - seg(seconds, T.dropFinalStart, T.dropFinalEnd));
}
/** The leaves' opening, 0 (a small circle at the centre, unseen) to 1 (open, at full size, pushed out). */
export const leavesAt = (seconds) => seg(seconds, T.leavesStart, T.leavesEnd) * (1 - seg(seconds, T.leavesOutStart, T.leavesOutEnd));
const pct = (seconds) => `${+((seconds / END) * 100).toFixed(4)}%`;
const fmt = (value) => String(+value.toFixed(2));
const EASE_OUT = 'cubic-bezier(0.33, 1, 0.68, 1)';
const EASE_IN = 'cubic-bezier(0.32, 0, 0.67, 0)';
const EASE_BOTH = 'cubic-bezier(0.55, 0, 0.45, 1)';
/** A keyframes block from [seconds, declarations] pairs (a seconds of the period's end writes 100%). */
function track(name, frames) {
    return `
      @keyframes ${name} {
${frames.map(([at, css]) => `        ${at >= END ? '100%' : pct(at)} { ${css} }`).join('\n')}
      }`;
}
/** A function of time sampled into keyframes, without the stops in the middle of a stretch that does not change. */
function sampled(name, at, step, digits, css) {
    const times = [];
    for (let seconds = 0; seconds < END - 1e-9; seconds += step)
        times.push(+seconds.toFixed(4));
    times.push(END);
    const values = times.map((seconds) => +at(seconds === END ? 0 : seconds).toFixed(digits));
    const kept = times.map((seconds, index) => [seconds, values[index]])
        .filter(([, value], index) => index === 0 || index === times.length - 1 || value !== values[index - 1] || value !== values[index + 1]);
    return track(name, kept.map(([seconds, value]) => [seconds, css(value)]));
}
/** A pillar's place, as a shift from where it stands side by side: off the edge, in, (side by side), into the middle, out again, (side by side), off the edge. */
function moveKeyframes(bar) {
    const side = SYN_SIDE[bar];
    const centre = -synSlotOffset(bar);
    const start = T.arriveStart[bar];
    const leave = T.departStart + T.departDelay[bar];
    const at = (x) => `transform: translate(${fmt(x)}px, 0px);`;
    return track(`kt-syn-move-${bar}`, [
        [0, `${at(side)} animation-timing-function: ${EASE_OUT};`],
        [start, `${at(side)} animation-timing-function: ${EASE_OUT};`],
        [start + T.arriveDuration, `${at(0)} animation-timing-function: ${EASE_BOTH};`],
        [T.mergeStart, `${at(0)} animation-timing-function: ${EASE_BOTH};`],
        [T.mergeEnd, `${at(centre)} animation-timing-function: ${EASE_BOTH};`],
        [T.partStart, `${at(centre)} animation-timing-function: ${EASE_BOTH};`],
        [T.partEnd, `${at(0)} animation-timing-function: ${EASE_IN};`],
        [leave, `${at(0)} animation-timing-function: ${EASE_IN};`],
        [leave + T.departDuration, at(side)],
        [END, at(side)],
    ]);
}
/** One arc of the ring: dark until the pillar's end is about to reach it, lit as the end passes, and put out again as the pillar turns back past it. */
function arcKeyframes(index) {
    const from = index * SYN_ARC_DEGREES;
    const to = (index + 1) * SYN_ARC_DEGREES;
    return track(`kt-syn-arc-${index}`, [
        [0, 'opacity: 0;'],
        [turnReaches(from, true), 'opacity: 0;'],
        [turnReaches(to, true), 'opacity: 1;'],
        [turnReaches(to, false), 'opacity: 1;'],
        [turnReaches(from, false), 'opacity: 0;'],
        [END, 'opacity: 0;'],
    ]);
}
const range = (count) => Array.from({ length: count }, (_, index) => index);
/** A leaf at a given opening: pushed out from the centre and grown. */
const leafPose = (direction, opening) => (`transform: translate(${fmt(direction[0] * SYN_LEAF_OFFSET * opening)}px, ${fmt(direction[1] * SYN_LEAF_OFFSET * opening)}px) scale(${+lerp(SYN_LEAF_START_SCALE, 1, opening).toFixed(4)}); opacity: ${opening};`);
function leafKeyframes(index) {
    const direction = SYN_LEAF_DIRECTIONS[index];
    return track(`kt-syn-leaf-${index}`, [
        [0, `${leafPose(direction, 0)} animation-timing-function: ${EASE_BOTH};`],
        [T.leavesStart, `${leafPose(direction, 0)} animation-timing-function: ${EASE_BOTH};`],
        [T.leavesEnd, `${leafPose(direction, 1)} animation-timing-function: ${EASE_BOTH};`],
        [T.leavesOutStart, `${leafPose(direction, 1)} animation-timing-function: ${EASE_BOTH};`],
        [T.leavesOutEnd, leafPose(direction, 0)],
        [END, leafPose(direction, 0)],
    ]);
}
const KEYFRAMES = [
    ...SYN_BARS.map(moveKeyframes),
    sampled('kt-syn-ignite', (seconds) => SYN_HALF_OUTLINE_LENGTH * (1 - igniteAt(seconds)), SYN_IGNITE_SAMPLE, 2, (value) => `stroke-dashoffset: ${value};`),
    ...SYN_BARS.map((bar) => sampled(`kt-syn-fade-${bar}`, (seconds) => barOpacityAt(bar, seconds), SYN_OPACITY_SAMPLE, 3, (value) => `opacity: ${value};`)),
    sampled('kt-syn-turn', turnAt, SYN_TURN_SAMPLE, 2, (value) => `transform: rotate(${value}deg);`),
    sampled('kt-syn-ring-glow', (seconds) => sweepAt(seconds) / 180, SYN_TURN_SAMPLE, 3, (value) => `opacity: ${value};`),
    track('kt-syn-disc', [
        [0, `opacity: 0; animation-timing-function: ${EASE_BOTH};`],
        [T.discStart, `opacity: 0; animation-timing-function: ${EASE_BOTH};`],
        [T.discEnd, `opacity: 1; animation-timing-function: ${EASE_BOTH};`],
        [T.discOutStart, `opacity: 1; animation-timing-function: ${EASE_BOTH};`],
        [T.discOutEnd, 'opacity: 0;'],
        [END, 'opacity: 0;'],
    ]),
    ...range(SYN_ARC_COUNT).map(arcKeyframes),
    ...range(4).map(leafKeyframes),
].join('');
const HOT = `rgba(${MENU_LINE_HOT_RGB}, ${SYN_LINE_ALPHA})`;
const GLOW = `rgba(${MENU_LINE_GLOW_RGB}, ${SYN_GLOW_ALPHA})`;
/** The picture's colours and its still state - and, inside prefers-reduced-motion: no-preference, the loop. The still state is the finished picture (the ring and the leaves). */
export const SYNTHESIS_MENU_CSS = `
    /* THE SYNTHESIS CARD'S ART: one picture on the card's geometric middle, over the whole card (it comes in from the card's two sides), and the card's name under the card,
       outside it, as the lower three cards' names are. The art layer takes no taps: the whole object is the button. */
    #place-experience .kt-menu-synthesis { margin-bottom: 24px; }
    #place-experience .kt-menu-syn {
      --kt-hr-hot: ${MENU_LINE_HOT_RGB};
      --kt-hr-glow: ${MENU_LINE_GLOW_RGB};
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }
    #place-experience .kt-syn-svg { display: block; flex: none; width: min(100%, 420px); height: auto; overflow: visible; }
    #place-experience .kt-menu-synthesis .kt-menu-synthesis-label {
      position: absolute;
      top: calc(100% + 7px);
      right: 0;
      left: 0;
      font-size: 10.5px;
      white-space: nowrap;
      text-shadow: 0 0 6px rgba(6, 8, 12, 0.9), 0 0 2px rgba(6, 8, 12, 0.9);
    }
    /* the light: the Connections heart's line, glow and tint; what lies inside the ring is the same light turned down */
    #place-experience .kt-syn-tint { fill: rgba(var(--kt-hr-glow), ${SYN_TINT_ALPHA}); stroke: none; }
    #place-experience .kt-syn-glow { stroke: ${GLOW}; stroke-width: ${SYN_GLOW_WIDTH}; }
    #place-experience .kt-syn-line { stroke: ${HOT}; stroke-width: ${SYN_LINE_WIDTH}; }
    /* A pillar is dim by itself (its base); its outline is kindled from the top down both sides by a growing dash (smooth, not in steps), added to it. The light of the traces arrives in all four at once. */
    #place-experience .kt-syn-base { opacity: 0.5; }
    #place-experience .kt-syn-ig-glow, #place-experience .kt-syn-ig-line { fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-dashoffset: ${SYN_HALF_OUTLINE_LENGTH}; }
    #place-experience .kt-syn-ig-glow { stroke: ${GLOW}; stroke-width: ${SYN_GLOW_WIDTH}; }
    #place-experience .kt-syn-ig-line { stroke: ${HOT}; stroke-width: ${SYN_LINE_WIDTH}; }
    #place-experience .kt-syn-m-tint { fill: rgba(var(--kt-hr-glow), ${SYN_MATTE.tintAlpha}); stroke: none; }
    #place-experience .kt-syn-m-glow { stroke: rgba(var(--kt-hr-glow), ${SYN_MATTE.glowAlpha}); stroke-width: ${SYN_MATTE.glowWidth}; }
    #place-experience .kt-syn-m-line { stroke: rgba(var(--kt-hr-hot), ${SYN_MATTE.lineAlpha}); stroke-width: ${SYN_MATTE.lineWidth}; }
    #place-experience .kt-syn-disc { fill: rgba(var(--kt-hr-glow), ${SYN_MATTE.tintAlpha}); stroke: none; }
    #place-experience .kt-syn-ring-glow { stroke: ${GLOW}; stroke-width: ${SYN_GLOW_WIDTH}; }
    #place-experience .kt-syn-arc { stroke: ${HOT}; stroke-width: ${SYN_LINE_WIDTH}; }
    #place-experience .kt-syn-leaf, #place-experience .kt-syn-spin { transform-box: fill-box; transform-origin: 50% 50%; }
    /* The still picture, the finished one: the ring and its four leaves, no pillars. */
    #place-experience .kt-syn-bar { opacity: 0; }
${SYN_LEAF_DIRECTIONS.map((direction, index) => `    #place-experience .kt-syn-leaf-${index} { ${leafPose(direction, 1)} }`).join('\n')}

    @media (prefers-reduced-motion: no-preference) {
${KEYFRAMES}
${SYN_BARS.map((bar) => `      #place-experience .kt-syn-bar-${bar} { will-change: transform, opacity; animation: kt-syn-move-${bar} ${END}s linear infinite, kt-syn-fade-${bar} ${END}s linear infinite; }`).join('\n')}
      #place-experience .kt-syn-bar-${SYN_SURVIVOR} .kt-syn-spin { will-change: transform; animation: kt-syn-turn ${END}s linear infinite; }
      #place-experience .kt-syn-ig-glow, #place-experience .kt-syn-ig-line { animation: kt-syn-ignite ${END}s linear infinite; }
      #place-experience .kt-syn-ring-glow { animation: kt-syn-ring-glow ${END}s linear infinite; }
      #place-experience .kt-syn-disc { animation: kt-syn-disc ${END}s linear infinite; }
${range(SYN_ARC_COUNT).map((index) => `      #place-experience .kt-syn-arc-${index} { opacity: 0; animation: kt-syn-arc-${index} ${END}s linear infinite; }`).join('\n')}
${range(4).map((index) => `      #place-experience .kt-syn-leaf-${index} { will-change: transform, opacity; animation: kt-syn-leaf-${index} ${END}s linear infinite; }`).join('\n')}
      /* A card that cannot be seen is not animated: the clock stops where it is (forecastMenuLifecycle.ts). */
      #place-experience .kt-menu-surface[data-fc-run="off"] .kt-menu-syn *,
      #place-experience .kt-menu-surface[data-fc-run="off"] .kt-menu-syn { animation-play-state: paused; }
    }
`;
