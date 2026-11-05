import { MENU_LINE_GLOW_RGB, MENU_LINE_HOT_RGB } from './connectionsHeartStyle.js?v=53c0693';
import { ASTRO_FLARE_ALPHA, ASTRO_FLARE_WIDTH, ASTRO_GLOW_WIDTH, ASTRO_LIT_ALPHA, ASTRO_MOON_RING_ALPHA, ASTRO_MOON_RING_WIDTH, ASTRO_PHASES, ASTRO_RING_ALPHA, ASTRO_RING_GLOW_ALPHA, ASTRO_RING_GLOW_WIDTH, ASTRO_RING_WIDTH, ASTRO_TINT_FILL_ALPHA, } from './astrologyMenuGeometry.js?v=53c0693';
import { ASTRO_COUNT, ASTRO_PERIOD, ASTRO_SECONDS_PER_PHASE, flareAt, litIn, ringLineIn, } from './astrologyMenuTimeline.js?v=53c0693';
import { WINDOW_GAP, WINDOW_HOLD } from './windowCycle.js?v=53c0693';
/*
 * THE ASTROLOGY CARD ON THE MAIN MENU - ITS LIGHT AND ITS MOTION.
 *
 * The markup is astrologyMenuArt.ts, the shapes astrologyMenuGeometry.ts and the clock astrologyMenuTimeline.ts (eight phases in 54 s, and a still moment together with the other window cards: 57 s the loop). This is the stylesheet, in a module of its own for the reason
 * connectionsHeartStyle.ts gives: menuExperience.ts is pinned to have no motion system, and only includes this text in the stylesheet it already injects.
 *
 * WHAT MOVES BY WHAT. Nothing travels: a moon is at the middle of the window, DRAWN. Its circle is a path of pathLength 1 with the dash pattern "1 3", and its keyframes move the dash offset (and switch
 * its opacity off where there is nothing to show, so that a round cap never shows); the lit part is a group lit by its OPACITY. Every phase's show is the same, so there are THREE tracks, sampled twenty a
 * second from astrologyMenuTimeline.ts: the circle's line and the light (each 28 s long: the phase's 3.3 seconds, and then nothing until its turn comes round again), which each of the eight moons runs,
 * started at its own moment by its animation-delay; and the ring's flare, an opacity, which repeats every phase. No SMIL, no filter, no script. The menu's lifecycle (forecastMenuLifecycle.ts) pauses all
 * of it when the card cannot be seen.
 *
 * LIGHT: the Connections heart's colours - a moon's lit part white with a light under it, inside its drawn circle, in the window of the Human Design card (a half-bright ring with a light under it).
 * No filter, no blur, no mask, no clip.
 *
 * LESS MOTION: the finished picture, still: the full Moon, circle and light.
 */
const END = ASTRO_PERIOD;
const EACH = ASTRO_SECONDS_PER_PHASE;
const LAST = ASTRO_COUNT - 1;
export const ASTRO_SAMPLE = 1 / 20;
const STILL = ASTRO_PHASES.findIndex((phase) => phase.id === 'full');
const INDICES = ASTRO_PHASES.map((_, i) => i);
const pct = (seconds, length) => `${+((seconds / length) * 100).toFixed(4)}%`;
const fmt = (value) => String(+value.toFixed(2));
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
const lineFrame = (last) => (t) => {
    const state = ringLineIn(t, last);
    return `stroke-dashoffset: ${+state.offset.toFixed(3)}; opacity: ${state.opacity};`;
};
const fillFrame = (last) => (t) => `opacity: ${+litIn(t, last).toFixed(3)};`;
/** A phase's show as one track the length of the loop: the phase's slot (the last phase's lasts through the still moment, and its fade comes after it), then nothing until its turn comes round again. */
function showTrack(name, last, frame) {
    const end = EACH - WINDOW_GAP + (last ? WINDOW_HOLD : 0);
    const times = [];
    for (let seconds = 0; seconds <= end + 1e-9; seconds += ASTRO_SAMPLE)
        times.push(+seconds.toFixed(4));
    times.push(+end.toFixed(4));
    const frames = keep(times, times.map(frame));
    /* after its fade nothing is seen, until the loop comes round: the last frame is the first */
    return track(name, END, [...frames, [END, frame(0)]]);
}
/** The ring's flare, one track for the whole loop (the last moon stands through the still moment, and the ring must not flare then). */
function flareTrack() {
    const times = [];
    for (let seconds = 0; seconds < END - 1e-9; seconds += ASTRO_SAMPLE)
        times.push(+seconds.toFixed(4));
    times.push(END);
    return track('kt-astro-flare', END, keep(times, times.map((seconds) => `opacity: ${+flareAt(seconds === END ? 0 : seconds).toFixed(3)};`)));
}
const KEYFRAMES = `${showTrack('kt-astro-draw', false, lineFrame(false))}${showTrack('kt-astro-fill', false, fillFrame(false))}${showTrack('kt-astro-draw-last', true, lineFrame(true))}${showTrack('kt-astro-fill-last', true, fillFrame(true))}${flareTrack()}`;
/** A moon's delay: the moment of its turn in the month (before it, the first frame - nothing - is held). */
const delay = (index) => +(index * EACH).toFixed(3);
export const ASTROLOGY_MENU_CSS = `
    /* THE ASTROLOGY CARD'S ART: the picture is the card's whole art area, drawn in a 100 x 390 box (the pillar's own proportion) on the middle of the card. */
    #place-experience .kt-menu-art-western-astrology { justify-content: center; }
    #place-experience .kt-astro-svg { display: block; flex: 1 1 0; width: 100%; min-height: 0; overflow: visible; }
    /* the window: the Human Design card's - half-bright, with a light under it */
    #place-experience .kt-astro-tint-disc { fill: rgba(${MENU_LINE_GLOW_RGB}, ${ASTRO_TINT_FILL_ALPHA}); stroke: none; }
    #place-experience .kt-astro-ring-glow { fill: none; stroke: rgba(${MENU_LINE_GLOW_RGB}, ${ASTRO_RING_GLOW_ALPHA}); stroke-width: ${ASTRO_RING_GLOW_WIDTH}; }
    #place-experience .kt-astro-ring-line { fill: none; stroke: rgba(${MENU_LINE_HOT_RGB}, ${ASTRO_RING_ALPHA}); stroke-width: ${ASTRO_RING_WIDTH}; }
    #place-experience .kt-astro-flare { fill: none; stroke: rgba(${MENU_LINE_GLOW_RGB}, ${ASTRO_FLARE_ALPHA}); stroke-width: ${ASTRO_FLARE_WIDTH}; opacity: 0; }
    /* a moon: its circle, drawn (a half-bright line, round ends), and its lit part - which alone is white - with its light under it */
    #place-experience .kt-astro-moon-ring { fill: none; stroke: rgba(${MENU_LINE_HOT_RGB}, ${ASTRO_MOON_RING_ALPHA}); stroke-width: ${ASTRO_MOON_RING_WIDTH}; stroke-linecap: round; stroke-dasharray: 1 3; stroke-dashoffset: 1; opacity: 0; }
    #place-experience .kt-astro-fill { opacity: 0; }
    #place-experience .kt-astro-glow { fill: none; stroke: rgb(${MENU_LINE_GLOW_RGB}); stroke-width: ${ASTRO_GLOW_WIDTH}; stroke-linejoin: round; }
    #place-experience .kt-astro-lit { fill: rgba(${MENU_LINE_HOT_RGB}, ${ASTRO_LIT_ALPHA}); stroke: none; }
    /* The still picture, the finished one: the full Moon, circle and light. */
    #place-experience .kt-astro-el-${STILL} .kt-astro-moon-ring { stroke-dashoffset: 0; opacity: 1; }
    #place-experience .kt-astro-el-${STILL} .kt-astro-fill { opacity: 1; }

    @media (prefers-reduced-motion: no-preference) {
${KEYFRAMES}
${INDICES.map((i) => { const suffix = i === LAST ? '-last' : ''; return `      #place-experience .kt-astro-el-${i} .kt-astro-moon-ring { animation: kt-astro-draw${suffix} ${END}s linear ${delay(i)}s infinite both; }\n      #place-experience .kt-astro-el-${i} .kt-astro-fill { animation: kt-astro-fill${suffix} ${END}s linear ${delay(i)}s infinite both; }`; }).join('\n')}
      #place-experience .kt-astro-flare { animation: kt-astro-flare ${END}s linear infinite; }
      /* A card that cannot be seen is not animated: the clock stops where it is (forecastMenuLifecycle.ts). */
      #place-experience .kt-menu-surface[data-fc-run="off"] .kt-astro-svg * { animation-play-state: paused; }
    }
`;
