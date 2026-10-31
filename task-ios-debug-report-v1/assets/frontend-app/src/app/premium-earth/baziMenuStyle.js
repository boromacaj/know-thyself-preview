import { MENU_LINE_GLOW_RGB, MENU_LINE_HOT_RGB } from './connectionsHeartStyle.js?v=b5ef5ed';
import { BZ_CHAR_ALPHA, BZ_ELEMENTS, BZ_FLARE_ALPHA, BZ_FLARE_WIDTH, BZ_GLOW_ALPHA, BZ_GLOW_STROKE, BZ_GLYPH_SCALE, BZ_RING_ALPHA, BZ_RING_GLOW_ALPHA, BZ_RING_GLOW_WIDTH, BZ_RING_WIDTH, BZ_TINT_FILL_ALPHA, } from './baziMenuGeometry.js?v=b5ef5ed';
import { BZ_PERIOD, flareAt, strokeAt } from './baziMenuTimeline.js?v=b5ef5ed';
/*
 * THE BAZI CARD ON THE MAIN MENU - ITS LIGHT AND ITS MOTION.
 *
 * The markup is baziMenuArt.ts, the shapes baziMenuGeometry.ts and the clock baziMenuTimeline.ts (the five elements twice in 54 s, and a still moment together with the other window cards: 57 s the loop). This is the stylesheet, in a module of its own for the reason
 * connectionsHeartStyle.ts gives: menuExperience.ts is pinned to have no motion system, and only includes this text in the stylesheet it already injects.
 *
 * WHAT MOVES BY WHAT. A character is WRITTEN, which a transform cannot do: the character is shown through a mask of the strokes of a pen (baziMenuArt.ts), each stroke a path of pathLength 1 with the dash
 * pattern "1 3", and its keyframes move its dash offset (and switch its opacity off where there is nothing to show, so that a round cap never shows in the mask). The character's light is shown through
 * a wider mask of the same strokes (the same classes, so the same animation). Each stroke has a track of its own - one after another, in the order a Chinese character is written - and so has the ring's
 * flare, all sampled twenty a second from baziMenuTimeline.ts, without the stops in the middle of a stretch that does not change. No filter, no SMIL, no script. The menu's lifecycle (forecastMenuLifecycle.ts) pauses all of it when the card
 * cannot be seen.
 *
 * LIGHT: the Connections heart's colours - the character bright with a light under it (the same outline, wider and softer), in the window of the Human Design card, a half-bright ring with a light
 * under it. No filter, no blur, no mask, no clip.
 *
 * LESS MOTION: the finished picture, still: Earth, 土, written.
 */
const END = BZ_PERIOD;
export const BZ_SAMPLE = 1 / 20;
const STILL = BZ_ELEMENTS.findIndex((e) => e.id === 'earth');
const INDICES = BZ_ELEMENTS.map((_, i) => i);
const pct = (seconds) => `${+((seconds / END) * 100).toFixed(4)}%`;
function track(name, frames) {
    return `
      @keyframes ${name} {
${frames.map(([at, css]) => `        ${at >= END ? '100%' : pct(at)} { ${css} }`).join('\n')}
      }`;
}
function moments() {
    const times = [];
    for (let seconds = 0; seconds < END - 1e-9; seconds += BZ_SAMPLE)
        times.push(+seconds.toFixed(4));
    times.push(END);
    return times;
}
function keep(times, values) {
    return times.map((seconds, index) => [seconds, values[index]])
        .filter(([, value], index) => index === 0 || index === times.length - 1 || value !== values[index - 1] || value !== values[index + 1]);
}
const strokeTrack = (index, k) => {
    const times = moments();
    return track(`kt-bz-pen-${index}-${k}`, keep(times, times.map((seconds) => {
        const state = strokeAt(index, k, seconds === END ? 0 : seconds);
        return `stroke-dashoffset: ${+state.offset.toFixed(3)}; opacity: ${state.opacity};`;
    })));
};
/** The ring's flare, one track for the whole loop (a character stands through the still moment, and the ring must not flare then). */
function flareTrack() {
    const times = moments();
    return track('kt-bz-flare', keep(times, times.map((seconds) => `opacity: ${+flareAt(seconds === END ? 0 : seconds).toFixed(3)};`)));
}
const KEYFRAMES = [
    ...BZ_ELEMENTS.flatMap((element, i) => element.pens.map((_, k) => strokeTrack(i, k))),
    flareTrack(),
].join('');
export const BAZI_MENU_CSS = `
    /* THE BAZI CARD'S ART: the picture is the card's whole art area, drawn in a 100 x 390 box (the pillar's own proportion) on the middle of the card. */
    #place-experience .kt-menu-art-bazi-tcm { justify-content: center; }
    #place-experience .kt-bz-svg { display: block; flex: 1 1 0; width: 100%; min-height: 0; overflow: visible; }
    /* the window: the Human Design card's - half-bright, with a light under it */
    #place-experience .kt-bz-tint-disc { fill: rgba(${MENU_LINE_GLOW_RGB}, ${BZ_TINT_FILL_ALPHA}); stroke: none; }
    #place-experience .kt-bz-ring-glow { fill: none; stroke: rgba(${MENU_LINE_GLOW_RGB}, ${BZ_RING_GLOW_ALPHA}); stroke-width: ${BZ_RING_GLOW_WIDTH}; }
    #place-experience .kt-bz-ring-line { fill: none; stroke: rgba(${MENU_LINE_HOT_RGB}, ${BZ_RING_ALPHA}); stroke-width: ${BZ_RING_WIDTH}; }
    #place-experience .kt-bz-flare { fill: none; stroke: rgba(${MENU_LINE_GLOW_RGB}, ${BZ_FLARE_ALPHA}); stroke-width: ${BZ_FLARE_WIDTH}; opacity: 0; }
    /* a character's outline, filled: bright, with its light under it (the same outline, wider and softer; its width is in the characters' own units, which are drawn at ${BZ_GLYPH_SCALE} of a window unit) */
    #place-experience .kt-bz-glow { fill: rgba(${MENU_LINE_GLOW_RGB}, ${BZ_GLOW_ALPHA}); stroke: rgba(${MENU_LINE_GLOW_RGB}, ${BZ_GLOW_ALPHA}); stroke-width: ${+(BZ_GLOW_STROKE / BZ_GLYPH_SCALE).toFixed(2)}; stroke-linejoin: round; }
    #place-experience .kt-bz-char { fill: rgba(${MENU_LINE_HOT_RGB}, ${BZ_CHAR_ALPHA}); stroke: none; }
    /* the pen: the strokes of the mask through which a character is shown, drawn by their dash offset */
    #place-experience .kt-bz-pen { fill: none; stroke: #fff; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1 3; stroke-dashoffset: 1; opacity: 0; }
    /* The still picture, the finished one: Earth, written. */
    #place-experience .kt-bz-el-${STILL} .kt-bz-pen { stroke-dashoffset: 0; opacity: 1; }

    @media (prefers-reduced-motion: no-preference) {
${KEYFRAMES}
${BZ_ELEMENTS.flatMap((element, i) => element.pens.map((_, k) => `      #place-experience .kt-bz-pen-${i}-${k} { animation: kt-bz-pen-${i}-${k} ${END}s linear infinite; }`)).join('\n')}
      #place-experience .kt-bz-flare { animation: kt-bz-flare ${END}s linear infinite; }
      /* A card that cannot be seen is not animated: the clock stops where it is (forecastMenuLifecycle.ts). */
      #place-experience .kt-menu-surface[data-fc-run="off"] .kt-bz-svg * { animation-play-state: paused; }
    }
`;
