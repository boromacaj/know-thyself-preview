import { MENU_LINE_GLOW_RGB, MENU_LINE_HOT_RGB } from './connectionsHeartStyle.js?v=53c0693';
import { SYNTHESIS_MENU_PERIOD, SYN_TIMES } from './synthesisMenuStyle.js?v=53c0693';
import { SYN_MATTE } from './synthesisMenuGeometry.js?v=53c0693';
import { SYN_TRACE_BRIDGE_HEIGHT } from './synthesisTraceGeometry.js?v=53c0693';
/*
 * THE CHIP TRACES AND THE LIGHT THAT RUNS ALONG THEM - THEIR LIGHT AND THEIR MOTION.
 *
 * The shapes are synthesisTraceGeometry.ts (measured on the page by synthesisTracePlacement.ts); the markup is synthesisTraceArt.ts. This is the stylesheet, in a module of its own for
 * the reason connectionsHeartStyle.ts gives: menuExperience.ts is pinned to have no motion system, and only includes this text in the stylesheet it already injects.
 *
 * THE TRACES ARE NOT THERE UNTIL THE LIGHT DRAWS THEM. Nothing of a trace or a pad is seen while the four little pillars are still coming in. Once the last one stands in its place (1.8 s),
 * a band of light runs DOWN from each of the four names, ALL FOUR TOGETHER, and the trace is DRAWN behind its head: it exists exactly where the band has been. The head arrives on the little
 * pillar the moment the pillars are kindled (the card's igniteStart, synthesisMenuStyle.ts), and the trace stays, matte, until the pillars merge. The same again when the four have parted:
 * the light always runs from the big pillars down into the little ones, never the other way.
 *
 *    1.85 -  2.70   FOUR BANDS RUN DOWN, all four at once, drawing their traces; the longer outer traces are run faster, so the long and the short take the same time; the pad under each name
 *                   appears as its band leaves it
 *    2.70 -  3.30   the pillars take the light in (0.2 s) and are KINDLED from their tops down (synthesisMenuStyle.ts, igniteAt)
 *    3.40 -  4.40   the traces go out as the four merge into one pillar
 *   14.45 - 15.30   FOUR BANDS RUN DOWN again, drawing the traces again, and arrive together; the four pillars are kindled again (15.3 - 15.9)
 *   16.30 - 17.20   the traces go out as the four pillars leave
 *
 * A BAND IS A BAND OF LIGHT, NOT A DOT: a continuous strip, as a loading bar is, that runs along the whole trace and so joins the name to the pillar while it runs. It is the trace's own
 * path drawn again in four layers that share one head: a wide soft glow, a long faint tail, a body and a short bright head, so the band is brightest at its head and fades behind it. While a
 * band runs its trace is brighter (0.55 up to 1) and when it arrives the pillar takes it in.
 *
 * MOTION. The band and the drawing of the trace are dashes (stroke-dasharray) moved along the path by stroke-dashoffset, keyframes sampled twenty a second from the measured layout and
 * written by the placement; the traces', the pads' and the bands' own light are lit by opacity. (The ring of the card is NOT drawn this way - it is arcs lit by opacity; a travelling band
 * and a drawn line cannot be, and a handful of small paths for a second or two in eighteen cost the main thread nothing the audit can see.) Nothing in script per frame, no timer, no
 * offset-path. It pauses with the menu's lifecycle (data-fc-run), and with less motion there are no traces at all (the finished picture of the card is the ring with its leaves).
 */
const T = SYN_TIMES;
const END = SYNTHESIS_MENU_PERIOD;
/** How long the head of a band takes to cross its trace, and how long the pillar takes to take the band in once the head has arrived (seconds). */
export const SYN_PULSE_DURATION = 0.85;
export const SYN_PULSE_DRAIN = 0.2;
/** The band's layers, back to front: all end at the head. Length in px, the stroke's opacity and width (the glow is wide and soft, the head is the card's own line). */
export const SYN_STRIP_LAYERS = Object.freeze([
    Object.freeze({ id: 'glow', length: 34, alpha: 0.28, width: 6.6 }),
    Object.freeze({ id: 'tail', length: 42, alpha: 0.2, width: 2.2 }),
    Object.freeze({ id: 'body', length: 26, alpha: 0.5, width: 2.2 }),
    Object.freeze({ id: 'head', length: 12, alpha: 1, width: 2.2 }),
]);
/** The longest layer: the distance the band is taken in over. */
export const SYN_STRIP_REACH = Math.max(...SYN_STRIP_LAYERS.map((layer) => layer.length));
/** The time between the keyframes of a band, and of a trace's light. */
export const SYN_PULSE_SAMPLE = 1 / 20;
export const SYN_TRACE_SAMPLE = 1 / 10;
const clamp01 = (u) => Math.min(1, Math.max(0, u));
const ease = (u) => { const t = clamp01(u); return t * t * t * (t * (6 * t - 15) + 10); };
const easeIn = (u) => clamp01(u) ** 2;
const seg = (seconds, from, to) => ease((seconds - from) / (to - from));
const lin = (seconds, from, to) => clamp01((seconds - from) / (to - from));
const bump = (seconds, centre, half) => ease(1 - Math.abs(seconds - centre) / half);
/**
 * The moment the four bands start, the first time and the second: the same for all four traces, and the time to cross the same - the head's way is a share of the trace's own length, so a
 * longer trace is run faster and the four ARRIVE TOGETHER, in the pillars, the moment they are kindled (the card's igniteStart and igniteSecond). The first start is after the last pillar has
 * stood in its place.
 */
export const pulseDownStart = (_trace) => T.igniteStart - SYN_PULSE_DURATION;
export const pulseSecondStart = (_trace) => T.igniteSecond - SYN_PULSE_DURATION;
/** When the traces go out: with the merge, and with the departure. */
const FADE_FIRST = [T.mergeStart, T.mergeStart + 1];
const FADE_SECOND = [T.departStart + 0.4, T.departStart + 1.3];
/**
 * Whether the traces may be seen at all: not before a band starts (nothing of a trace is there until the light draws it), not after the merge until the second bands start, and not after the
 * departure. The drawing itself (how much of a trace exists) is the band's head.
 */
export const traceVisibilityAt = (seconds) => Math.max(seg(seconds, pulseDownStart(0) - 0.05, pulseDownStart(0) + 0.05) * (1 - seg(seconds, FADE_FIRST[0], FADE_FIRST[1])), seg(seconds, pulseSecondStart(0) - 0.05, pulseSecondStart(0) + 0.05) * (1 - seg(seconds, FADE_SECOND[0], FADE_SECOND[1])));
/**
 * A band's HEAD at a moment while it crosses: whether it runs (it always runs DOWN, from the name to the pillar), where it is on its trace (0 at the little pillar, 1 at the pad) and how bright
 * its trace is made. It is `none` before the head starts and once it has arrived (the taking-in is stripHead's).
 */
export function pulseAt(trace, seconds) {
    for (const start of [pulseDownStart(trace), pulseSecondStart(trace)]) {
        const progress = lin(seconds, start, start + SYN_PULSE_DURATION);
        if (progress > 0 && progress < 1)
            return { direction: 'down', fraction: 1 - ease(progress), fade: seg(progress, 0, 0.12) * (1 - seg(progress, 0.9, 1)) };
    }
    return { direction: 'none', fraction: 0, fade: 0 };
}
/**
 * Where the HEAD of the band is along its trace's path, in px from the little pillar (the path's start), at a moment of a run that starts at `start`. The head crosses the whole path from the
 * pad end, L, to the pillar, 0, in SYN_PULSE_DURATION and arrives exactly when the run's main time is over; then the pillar takes the band in (SYN_STRIP_REACH further, ending off the path) in
 * SYN_PULSE_DRAIN. Before the start the head is where it starts, with the band off the path.
 */
export function stripHead(length, seconds, start) {
    const progress = lin(seconds, start, start + SYN_PULSE_DURATION);
    const drained = easeIn(lin(seconds, start + SYN_PULSE_DURATION, start + SYN_PULSE_DURATION + SYN_PULSE_DRAIN));
    return length * (1 - ease(progress)) - SYN_STRIP_REACH * drained;
}
/** The dash offset that puts a layer's band with its head at `head`: the head is the band's start (its lower end on the path), the band runs from there toward the pad. */
export const stripOffset = (head) => -head;
/** The gap of a layer's dash pattern: so long that the pattern never shows twice on the path (the head can be as far back as -REACH, and the next dash comes a dash and a gap after it). */
export const stripGap = (pathLength) => Math.round(pathLength) + SYN_STRIP_REACH + 10;
/**
 * THE DRAWING OF A TRACE: its line is a dash longer than the path, that starts where the head is and runs to the pad, so the trace exists from the pad end to wherever the head has got
 * to. The dash is `traceDash` long (more than the path) and the gap is longer than the dash and the path together.
 */
export const traceDash = (pathLength) => Math.round(pathLength) + 20;
export const traceGap = (pathLength) => 3 * traceDash(pathLength);
/** The offset of the drawn line when the head is at `head` (clamped to the path: once the head has arrived the whole trace is there). */
export const drawOffset = (pathLength, head) => -Math.min(pathLength, Math.max(0, head));
/** How lit a trace is at a moment: there (traceVisibilityAt), brighter while its band runs. */
export const traceOpacityAt = (trace, seconds) => traceVisibilityAt(seconds) * (0.55 + 0.45 * pulseAt(trace, seconds).fade);
/** How lit the pad under a name is: it is there from the moment its band leaves it, lit then, and dims after. */
export const padOpacityAt = (trace, seconds) => traceVisibilityAt(seconds)
    * (0.5 + 0.5 * Math.max(bump(seconds, pulseDownStart(trace), 0.4), bump(seconds, pulseSecondStart(trace), 0.4)));
const pct = (seconds) => `${+((seconds / END) * 100).toFixed(4)}%`;
const fmt = (value) => String(+value.toFixed(2));
function track(name, frames) {
    return `
      @keyframes ${name} {
${frames.map(([at, css]) => `        ${at >= END ? '100%' : pct(at)} { ${css} }`).join('\n')}
      }`;
}
function sampled(name, at) {
    const times = [];
    for (let seconds = 0; seconds < END - 1e-9; seconds += SYN_TRACE_SAMPLE)
        times.push(+seconds.toFixed(4));
    times.push(END);
    const values = times.map((seconds) => +at(seconds === END ? 0 : seconds).toFixed(3));
    const kept = times.map((seconds, index) => [seconds, values[index]])
        .filter(([, value], index) => index === 0 || index === times.length - 1 || value !== values[index - 1] || value !== values[index + 1]);
    return track(name, kept.map(([seconds, value]) => [seconds, `opacity: ${value};`]));
}
/**
 * The keyframes of the four bands and of the drawing of the four traces for MEASURED traces: a band's layers and a trace's line are the trace's path with a dash that is moved by
 * stroke-dashoffset, sampled twenty times a second through the two runs, each followed by the pillar taking the band in. Between the runs a band waits off the path and a trace is
 * undrawn (the gate, traceVisibilityAt, has it unseen by then). The last frame is the first.
 */
export function pulseKeyframesCss(traces) {
    const steps = Math.round((SYN_PULSE_DURATION + SYN_PULSE_DRAIN) / SYN_PULSE_SAMPLE);
    return traces.map((trace, index) => {
        const first = pulseDownStart(index);
        const second = pulseSecondStart(index);
        const bands = SYN_STRIP_LAYERS.map((layer) => {
            const frame = (seconds, start) => ([+seconds.toFixed(4), `stroke-dashoffset: ${fmt(stripOffset(stripHead(trace.length, seconds, start)))};`]);
            const frames = [frame(0, first)];
            for (const start of [first, second])
                for (let step = 0; step <= steps; step += 1)
                    frames.push(frame(start + step * SYN_PULSE_SAMPLE, start));
            frames.push([END, frames[0][1]]);
            return track(`kt-trace-run-${index}-${layer.id}`, frames);
        }).join('');
        const drawn = (seconds, start) => ([+seconds.toFixed(4), `stroke-dashoffset: ${fmt(drawOffset(trace.length, stripHead(trace.length, seconds, start)))};`]);
        const frames = [drawn(0, first)];
        for (let step = 0; step <= steps; step += 1)
            frames.push(drawn(first + step * SYN_PULSE_SAMPLE, first));
        /* drawn until the traces have gone out (the merge), then undrawn while they are not seen, then drawn again by the second bands */
        frames.push([+(FADE_FIRST[1] + 0.1).toFixed(4), frames[frames.length - 1][1]]);
        frames.push([+(second - 0.1).toFixed(4), frames[0][1]]);
        for (let step = 0; step <= steps; step += 1)
            frames.push(drawn(second + step * SYN_PULSE_SAMPLE, second));
        frames.push([+(FADE_SECOND[1] + 0.1).toFixed(4), frames[frames.length - 1][1]]);
        frames.push([END, frames[0][1]]);
        return bands + track(`kt-trace-draw-${index}`, frames);
    }).join('');
}
const range = (count) => Array.from({ length: count }, (_, index) => index);
export const SYNTHESIS_TRACE_CSS = `
    /* THE CHIP TRACES: an overlay on the menu's core, over the Synthesis card, that takes no taps; it is shown once the page has measured the layout and placed it (data-placed). */
    #place-experience .kt-menu-core { position: relative; }
    #place-experience .kt-menu-bridge { height: ${SYN_TRACE_BRIDGE_HEIGHT}px; }
    #place-experience .kt-menu-traces {
      --kt-hr-hot: ${MENU_LINE_HOT_RGB};
      --kt-hr-glow: ${MENU_LINE_GLOW_RGB};
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      overflow: visible;
      pointer-events: none;
      visibility: hidden;
    }
    #place-experience .kt-menu-traces[data-placed] { visibility: visible; }
    #place-experience .kt-trace-glow, #place-experience .kt-trace-line, #place-experience .kt-trace-pad-glow, #place-experience .kt-trace-pad-line,
    #place-experience .kt-trace-run path { fill: none; stroke-linecap: round; stroke-linejoin: round; }
    #place-experience .kt-trace-glow, #place-experience .kt-trace-pad-glow { stroke: rgba(var(--kt-hr-glow), ${SYN_MATTE.glowAlpha}); stroke-width: ${SYN_MATTE.glowWidth}; }
    #place-experience .kt-trace-line, #place-experience .kt-trace-pad-line { stroke: rgba(var(--kt-hr-hot), ${SYN_MATTE.lineAlpha}); stroke-width: ${SYN_MATTE.lineWidth}; }
    #place-experience .kt-trace-pad-tint { fill: rgba(var(--kt-hr-glow), ${SYN_MATTE.tintAlpha}); stroke: none; }
    /* the band: the heart's near-white line, with its glow under it; the layers share one head, so it is brightest there and fades behind */
${SYN_STRIP_LAYERS.map((layer) => `    #place-experience .kt-trace-run-${layer.id} { stroke: rgba(var(--kt-hr-${layer.id === 'glow' ? 'glow' : 'hot'}), ${layer.alpha}); stroke-width: ${layer.width}; }`).join('\n')}
    /* The still picture, the finished one, has no traces and no pulses. */
    #place-experience .kt-trace, #place-experience .kt-trace-padgroup, #place-experience .kt-trace-run { opacity: 0; }

    @media (prefers-reduced-motion: no-preference) {
${range(4).map((index) => sampled(`kt-trace-vis-${index}`, (seconds) => traceOpacityAt(index, seconds))).join('')}
${range(4).map((index) => sampled(`kt-trace-pad-${index}`, (seconds) => padOpacityAt(index, seconds))).join('')}
${range(4).map((index) => sampled(`kt-trace-run-fade-${index}`, (seconds) => traceVisibilityAt(seconds))).join('')}
${range(4).map((index) => `      #place-experience .kt-trace-${index} { animation: kt-trace-vis-${index} ${END}s linear infinite; }
      #place-experience .kt-trace-${index} .kt-trace-glow, #place-experience .kt-trace-${index} .kt-trace-line { animation: kt-trace-draw-${index} ${END}s linear infinite; }
      #place-experience .kt-trace-padgroup-${index} { animation: kt-trace-pad-${index} ${END}s linear infinite; }
      #place-experience .kt-trace-run-${index} { animation: kt-trace-run-fade-${index} ${END}s linear infinite; }
${SYN_STRIP_LAYERS.map((layer) => `      #place-experience .kt-trace-run-${index} .kt-trace-run-${layer.id} { animation: kt-trace-run-${index}-${layer.id} ${END}s linear infinite; }`).join('\n')}`).join('\n')}
      /* A card that cannot be seen is not animated: the clock stops where it is (forecastMenuLifecycle.ts). */
      #place-experience .kt-menu-surface[data-fc-run="off"] .kt-menu-traces * { animation-play-state: paused; }
    }
`;
