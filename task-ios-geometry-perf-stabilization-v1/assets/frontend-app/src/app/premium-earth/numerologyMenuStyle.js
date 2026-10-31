import { MENU_LINE_GLOW_RGB, MENU_LINE_HOT_RGB } from './connectionsHeartStyle.js?v=d9f39e7';
import { NUM_CHAR_ALPHA, NUM_FLARE_ALPHA, NUM_FLARE_WIDTH, NUM_GLOW_ALPHA, NUM_RING_ALPHA, NUM_RING_GLOW_ALPHA, NUM_RING_GLOW_WIDTH, NUM_RING_WIDTH, NUM_SEQUENCE, NUM_TINT_FILL_ALPHA, } from './numerologyMenuGeometry.js?v=d9f39e7';
import { NUM_MAX_STROKES, NUM_PERIOD, NUM_SECONDS_PER_NUMBER, flareAt, isLastOfRound, slotStart, strokeAt, } from './numerologyMenuTimeline.js?v=d9f39e7';
import { WINDOW_GAP, WINDOW_HOLD } from './windowCycle.js?v=d9f39e7';
/*
 * THE NUMEROLOGY CARD ON THE MAIN MENU - ITS LIGHT AND ITS MOTION.
 *
 * The markup is numerologyMenuArt.ts, the shapes numerologyMenuGeometry.ts and the clock numerologyMenuTimeline.ts (nine numbers a loop, the scripts changing places on the next loop: 32.4 s and a 2 s still moment together with the other window cards, 34.4 s a loop, 68.8 s the card's period). This is the stylesheet, in a module of its own for the reason
 * connectionsHeartStyle.ts gives: menuExperience.ts is pinned to have no motion system, and only includes this text in the stylesheet it already injects.
 *
 * WHAT MOVES BY WHAT. A number is WRITTEN, which a transform cannot do: each stroke of the pen is a path of pathLength 1 with the dash pattern "1 3", and its keyframes move its dash offset (and switch its
 * opacity off where there is nothing to show, so that a round cap never shows). A number's strokes are written one after another, so there is a track for each stroke of each count of strokes (1 to 4),
 * sampled twenty a second from numerologyMenuTimeline.ts, without the stops in the middle of a stretch that does not change: 68.8 s long (two loops: the number's slot, and then nothing until its turn comes
 * round again; the last number's slot lasts through the still moment, and it has tracks of its own), run by each of the eighteen numbers that has that many strokes, started at its own moment by its animation-delay; and the ring's flare, an opacity, one track for the whole loop. No
 * filter, no SMIL, no script. The menu's lifecycle (forecastMenuLifecycle.ts) pauses all of it when the card cannot be seen.
 *
 * LIGHT: the Connections heart's colours - the number a bright line with round ends and a light under it (the same line, wider and softer), in the window of the Human Design card, a half-bright ring
 * with a light under it. No filter, no blur, no mask, no clip.
 *
 * LESS MOTION: the finished picture, still: IX, written.
 */
const END = NUM_PERIOD;
const EACH = NUM_SECONDS_PER_NUMBER;
export const NUM_SAMPLE = 1 / 20;
const STILL = 8;
const INDICES = NUM_SEQUENCE.map((_, i) => i);
const pct = (seconds, length) => `${+((seconds / length) * 100).toFixed(4)}%`;
function track(name, length, frames) {
    return `
      @keyframes ${name} {
${frames.map(([at, css]) => `        ${at >= length ? '100%' : pct(at, length)} { ${css} }`).join('\n')}
      }`;
}
function keep(times, values) {
    return times.map((seconds, index) => [seconds, values[index]])
        .filter(([, value], index) => index === 0 || index === times.length - 1 || value !== values[index - 1] || value !== values[index + 1]);
}
/** The numbers that end a round: each stays through the still moment, and its fade comes after it. */
const LASTS = INDICES.filter(isLastOfRound);
const strokeFrame = (count, k, last) => (t) => {
    const state = strokeAt(count, k, t, last);
    return `stroke-dashoffset: ${+state.offset.toFixed(3)}; opacity: ${state.opacity};`;
};
/** The track of stroke `k` of a number with `count` strokes (`last`: of the last number, whose fade comes after the still moment). */
function strokeTrack(name, count, k, last) {
    const frame = strokeFrame(count, k, last);
    const end = EACH - WINDOW_GAP + (last ? WINDOW_HOLD : 0);
    const times = [];
    for (let seconds = 0; seconds <= end + 1e-9; seconds += NUM_SAMPLE)
        times.push(+seconds.toFixed(4));
    times.push(+end.toFixed(4));
    const frames = keep(times, times.map(frame));
    /* after its fade nothing is seen, until the loop comes round: the last frame is the first */
    return track(name, END, [...frames, [END, frame(0)]]);
}
/** The ring's flare, one track for the whole loop (the last number stands through the still moment, and the ring must not flare then). */
function flareTrack() {
    const times = [];
    for (let seconds = 0; seconds < END - 1e-9; seconds += NUM_SAMPLE)
        times.push(+seconds.toFixed(4));
    times.push(END);
    return track('kt-num-flare', END, keep(times, times.map((seconds) => `opacity: ${+flareAt(seconds === END ? 0 : seconds).toFixed(3)};`)));
}
const TRACKS = [];
for (let count = 1; count <= NUM_MAX_STROKES; count += 1)
    for (let k = 0; k < count; k += 1)
        TRACKS.push(strokeTrack(`kt-num-pen-${count}-${k}`, count, k, false));
for (const count of new Set(LASTS.map((i) => NUM_SEQUENCE[i].strokes.length)))
    for (let k = 0; k < count; k += 1)
        TRACKS.push(strokeTrack(`kt-num-pen-last-${count}-${k}`, count, k, true));
const KEYFRAMES = `${TRACKS.join('')}${flareTrack()}`;
export const NUMEROLOGY_MENU_CSS = `
    /* THE NUMEROLOGY CARD'S ART: the picture is the card's whole art area, drawn in a 100 x 390 box (the pillar's own proportion) on the middle of the card. */
    #place-experience .kt-menu-art-numerology { justify-content: center; }
    #place-experience .kt-num-svg { display: block; flex: 1 1 0; width: 100%; min-height: 0; overflow: visible; }
    /* the window: the Human Design card's - half-bright, with a light under it */
    #place-experience .kt-num-tint-disc { fill: rgba(${MENU_LINE_GLOW_RGB}, ${NUM_TINT_FILL_ALPHA}); stroke: none; }
    #place-experience .kt-num-ring-glow { fill: none; stroke: rgba(${MENU_LINE_GLOW_RGB}, ${NUM_RING_GLOW_ALPHA}); stroke-width: ${NUM_RING_GLOW_WIDTH}; }
    #place-experience .kt-num-ring-line { fill: none; stroke: rgba(${MENU_LINE_HOT_RGB}, ${NUM_RING_ALPHA}); stroke-width: ${NUM_RING_WIDTH}; }
    #place-experience .kt-num-flare { fill: none; stroke: rgba(${MENU_LINE_GLOW_RGB}, ${NUM_FLARE_ALPHA}); stroke-width: ${NUM_FLARE_WIDTH}; opacity: 0; }
    /* a number: a thin bright line with round ends and round corners, with its light under it (the same line, wider and softer), written by the dash offset of its strokes */
    #place-experience .kt-num-glow { fill: none; stroke: rgba(${MENU_LINE_GLOW_RGB}, ${NUM_GLOW_ALPHA}); stroke-linecap: round; stroke-linejoin: round; }
    #place-experience .kt-num-char { fill: none; stroke: rgba(${MENU_LINE_HOT_RGB}, ${NUM_CHAR_ALPHA}); stroke-linecap: round; stroke-linejoin: round; }
    #place-experience .kt-num-pen { stroke-dasharray: 1 3; stroke-dashoffset: 1; opacity: 0; }
    /* The still picture, the finished one: IX, written. */
    #place-experience .kt-num-el-${STILL} .kt-num-pen { stroke-dashoffset: 0; opacity: 1; }

    @media (prefers-reduced-motion: no-preference) {
${KEYFRAMES}
${INDICES.flatMap((i) => NUM_SEQUENCE[i].strokes.map((_, k) => `      #place-experience .kt-num-el-${i} .kt-num-pen-${NUM_SEQUENCE[i].strokes.length}-${k} { animation: kt-num-pen-${isLastOfRound(i) ? `last-${NUM_SEQUENCE[i].strokes.length}` : NUM_SEQUENCE[i].strokes.length}-${k} ${END}s linear ${+slotStart(i).toFixed(3)}s infinite both; }`)).join('\n')}
      #place-experience .kt-num-flare { animation: kt-num-flare ${END}s linear infinite; }
      /* A card that cannot be seen is not animated: the clock stops where it is (forecastMenuLifecycle.ts). */
      #place-experience .kt-menu-surface[data-fc-run="off"] .kt-num-svg * { animation-play-state: paused; }
    }
`;
