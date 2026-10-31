import { MENU_LINE_GLOW_RGB, MENU_LINE_HOT_RGB } from './connectionsHeartStyle.js?v=2ea79e9';
import { HD_CHANNEL_ALPHA, HD_CHANNEL_GLOW_ALPHA, HD_FLARE_ALPHA, HD_FLARE_WIDTH, HD_GLOW_ALPHA, HD_ORDER, HD_RING_ALPHA, HD_RING_GLOW_ALPHA, HD_RING_GLOW_WIDTH, HD_RING_WIDTH, HD_SHAPE_ALPHA, HD_TINT_ALPHA, HD_TINT_FILL_ALPHA, } from './humanDesignMenuGeometry.js?v=2ea79e9';
import { HD_PERIOD, channelLineAt, flareAt, shapeLineAt, tintAt } from './humanDesignMenuTimeline.js?v=2ea79e9';
/*
 * THE HUMAN DESIGN CARD ON THE MAIN MENU - ITS LIGHT AND ITS MOTION.
 *
 * The markup is humanDesignMenuArt.ts, the shapes humanDesignMenuGeometry.ts (the Human Design page's own geometry) and the clock humanDesignMenuTimeline.ts (nine centres in 54 s, and a still moment together with the other window cards: 57 s the loop). This is the
 * stylesheet, in a module of its own for the reason connectionsHeartStyle.ts gives: menuExperience.ts is pinned to have no motion system, and only includes this text in the stylesheet it already injects.
 *
 * WHAT MOVES BY WHAT. Everything is DRAWN, which a transform cannot do: each outline and each channel is a path of pathLength 1 with the dash pattern "1 3", and its keyframes move its dash offset (and
 * switch its opacity off where there is nothing to show, so that a round cap never shows). The matte fill of a centre and the ring's flare are opacities. The keyframes are shared by everything in a
 * window - one track for a centre's outline, one for its channels, one for its fill - sampled ten a second from humanDesignMenuTimeline.ts, without the stops in the middle of a stretch that
 * does not change (a window is in motion only while a centre is drawn and fades). Only one centre is ever in the window. No SMIL, no script. The menu's lifecycle (forecastMenuLifecycle.ts) pauses all of it when the
 * card cannot be seen.
 *
 * LIGHT: the Connections heart's colours - the centre's outline thick and bright with a light under it and a faint matte fill, its channels thick but quieter (they are the line the centre sends out,
 * not the centre), the ring a half-bright outline with a light under it. No filter, no blur, no mask, no clip.
 *
 * LESS MOTION: the finished picture, still: the G centre and its channels.
 */
const END = HD_PERIOD;
export const HD_SAMPLE = 1 / 10;
const SHOWN_STILL = HD_ORDER.indexOf('g');
const INDICES = HD_ORDER.map((_, index) => index);
const pct = (seconds) => `${+((seconds / END) * 100).toFixed(4)}%`;
function track(name, frames) {
    return `
      @keyframes ${name} {
${frames.map(([at, css]) => `        ${at >= END ? '100%' : pct(at)} { ${css} }`).join('\n')}
      }`;
}
function moments() {
    const times = [];
    for (let seconds = 0; seconds < END - 1e-9; seconds += HD_SAMPLE)
        times.push(+seconds.toFixed(4));
    times.push(END);
    return times;
}
/** Keyframes from a list of CSS texts, one per sampled moment, without the stops in the middle of a stretch that does not change. */
function keep(times, values) {
    return times.map((seconds, index) => [seconds, values[index]])
        .filter(([, value], index) => index === 0 || index === times.length - 1 || value !== values[index - 1] || value !== values[index + 1]);
}
function lineTrack(name, at) {
    const times = moments();
    return track(name, keep(times, times.map((seconds) => {
        const state = at(seconds === END ? 0 : seconds);
        return `stroke-dashoffset: ${+state.offset.toFixed(3)}; opacity: ${state.opacity};`;
    })));
}
const KEYFRAMES = [
    ...INDICES.map((i) => lineTrack(`kt-hd-sh-${i}`, (seconds) => shapeLineAt(i, seconds))),
    ...INDICES.map((i) => lineTrack(`kt-hd-ch-${i}`, (seconds) => channelLineAt(i, seconds))),
    ...INDICES.map((i) => { const times = moments(); return track(`kt-hd-tint-${i}`, keep(times, times.map((seconds) => `opacity: ${+tintAt(i, seconds === END ? 0 : seconds).toFixed(3)};`))); }),
    (() => { const times = moments(); return track('kt-hd-flare', keep(times, times.map((seconds) => `opacity: ${+flareAt(seconds === END ? 0 : seconds).toFixed(3)};`))); })(),
].join('');
export const HUMAN_DESIGN_MENU_CSS = `
    /* THE HUMAN DESIGN CARD'S ART: the picture is the card's whole art area, drawn in a 100 x 390 box (the pillar's own proportion) on the middle of the card. */
    #place-experience .kt-menu-art-human-design { justify-content: center; }
    #place-experience .kt-hd-svg { display: block; flex: 1 1 0; width: 100%; min-height: 0; overflow: visible; }
    /* the window: half-bright, with a light under it */
    #place-experience .kt-hd-tint-disc { fill: rgba(${MENU_LINE_GLOW_RGB}, ${HD_TINT_FILL_ALPHA}); stroke: none; }
    #place-experience .kt-hd-ring-glow { fill: none; stroke: rgba(${MENU_LINE_GLOW_RGB}, ${HD_RING_GLOW_ALPHA}); stroke-width: ${HD_RING_GLOW_WIDTH}; }
    #place-experience .kt-hd-ring-line { fill: none; stroke: rgba(${MENU_LINE_HOT_RGB}, ${HD_RING_ALPHA}); stroke-width: ${HD_RING_WIDTH}; }
    #place-experience .kt-hd-flare { fill: none; stroke: rgba(${MENU_LINE_GLOW_RGB}, ${HD_FLARE_ALPHA}); stroke-width: ${HD_FLARE_WIDTH}; opacity: 0; }
    /* the centre: a faint matte fill, an outline with its light; its channels: thick and quieter */
    #place-experience .kt-hd-tint { fill: rgba(${MENU_LINE_GLOW_RGB}, ${HD_TINT_ALPHA}); stroke: none; opacity: 0; }
    #place-experience .kt-hd-shape-glow { stroke: rgba(${MENU_LINE_GLOW_RGB}, ${HD_GLOW_ALPHA}); }
    #place-experience .kt-hd-shape-line { stroke: rgba(${MENU_LINE_HOT_RGB}, ${HD_SHAPE_ALPHA}); }
    #place-experience .kt-hd-glow { stroke: rgba(${MENU_LINE_GLOW_RGB}, ${HD_CHANNEL_GLOW_ALPHA}); }
    #place-experience .kt-hd-line { stroke: rgba(${MENU_LINE_HOT_RGB}, ${HD_CHANNEL_ALPHA}); }
    #place-experience .kt-hd-shape-glow, #place-experience .kt-hd-shape-line, #place-experience .kt-hd-glow, #place-experience .kt-hd-line { stroke-dasharray: 1 3; stroke-dashoffset: 1; opacity: 0; }
    /* The still picture, the finished one: the G centre and its channels. */
    #place-experience .kt-hd-sh-${SHOWN_STILL}, #place-experience .kt-hd-ch-${SHOWN_STILL} { stroke-dashoffset: 0; opacity: 1; }
    #place-experience .kt-hd-tint-${SHOWN_STILL} { opacity: 1; }

    @media (prefers-reduced-motion: no-preference) {
${KEYFRAMES}
${INDICES.map((i) => `      #place-experience .kt-hd-sh-${i} { animation: kt-hd-sh-${i} ${END}s linear infinite; }\n      #place-experience .kt-hd-ch-${i} { animation: kt-hd-ch-${i} ${END}s linear infinite; }\n      #place-experience .kt-hd-tint-${i} { animation: kt-hd-tint-${i} ${END}s linear infinite; }`).join('\n')}
      #place-experience .kt-hd-flare { animation: kt-hd-flare ${END}s linear infinite; }
      /* A card that cannot be seen is not animated: the clock stops where it is (forecastMenuLifecycle.ts). */
      #place-experience .kt-menu-surface[data-fc-run="off"] .kt-hd-svg * { animation-play-state: paused; }
    }
`;
