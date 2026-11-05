import { MENU_LINE_GLOW_RGB, MENU_LINE_HOT_RGB } from './connectionsHeartStyle.js?v=d9a1a90';
import { SYN_ARC_COUNT, SYN_ARC_DEGREES, SYN_BARS, SYN_BAR_HEIGHT, SYN_BAR_WIDTH, SYN_CENTRE, SYN_GLOW_ALPHA, SYN_GLOW_WIDTH, SYN_HALF_OUTLINE_LENGTH, SYN_LEAF_DIRECTIONS, SYN_LEAF_OFFSET, SYN_LEAF_RADIUS, SYN_LEAF_START_SCALE, SYN_LINE_ALPHA, SYN_LINE_WIDTH, SYN_MATTE, SYN_RING_RADIUS, SYN_SIDE, SYN_SURVIVOR, SYN_TINT_ALPHA, SYN_VIEW_HEIGHT, SYN_VIEW_TOP, SYN_VIEW_WIDTH, synSlotOffset, } from './synthesisMenuGeometry.js?v=d9a1a90';
import { EASE_BOTH, EASE_IN, EASE_OUT, SYNTHESIS_MENU_PERIOD, SYN_IGNITE_SAMPLE, SYN_OPACITY_SAMPLE, SYN_TIMES, SYN_TURN_SAMPLE, barOpacityAt, igniteAt, sweepAt, turnAt, turnReaches, } from './synthesisMenuStyle.js?v=d9a1a90';
/*
 * THE SYNTHESIS CARD'S PICTURE, DRAWN ON A CANVAS INSTEAD OF MOVED AS SVG.
 *
 * WHY. On the Galaxy A55 the card's SVG animations (and the other pillar cards' like them) are repainted by the WebView every frame: an animated child of an SVG is
 * not run by the compositor, so each step invalidates the SVG's paint, and the GPU thread that also draws the globe pays for the raster. A canvas is one layer whose
 * pixels are replaced in place, with no style recalculation of 135 SVG nodes, no display-list rebuild and no tile raster.
 *
 * WHAT IS NOT CHANGED. Nothing about the picture: the same geometry (synthesisMenuGeometry.ts), the same light (the Connections heart's colours and alphas), the same
 * story and the same clock. The values are the same functions of time the stylesheet is generated from (synthesisMenuStyle.ts: barOpacityAt, igniteAt, turnAt, sweepAt,
 * turnReaches, SYN_TIMES and the same three easing curves), sampled the same way (the same steps, the same rounding) and interpolated the same way, and each SVG group's
 * opacity is a real group opacity here too (a pillar and a leaf are drawn on a scratch canvas and put on the card at the group's opacity), so overlapping tint, glow and
 * line combine exactly as they do in the SVG.
 *
 * THE CLOCK is not a timer of this module's own: a zero-size element (kt-syn-clock) carries one 18.5 s CSS animation and this module reads its currentTime. It starts with
 * the card's other loops (the chip traces) and is paused by the same data-fc-run rule, so the canvas and the traces stay in step and the card stops when it cannot be seen.
 *
 * STATUS: A MEASURED NEGATIVE RESULT - NOT WIRED INTO THE APP. The picture is pixel-equivalent to the SVG's (scripts/qa/synthesisCanvasEquivalence.mjs: every animated number agrees
 * with the CSS to 0.003, the total light to 0.3 %, at card widths 313 and 353 and densities 2 and 3.19), but on the Galaxy A55 (Android 16, WebView 156) it was NOT faster. Interleaved
 * A/B on one process, 4 rounds of 8 s, gfxinfo frames per second on the menu: canvas 13.8, the original SVG 14.4, the card hidden altogether 15.9. With every other animation paused
 * (the cheap regime): all paused 26.3, only the canvas animating 21.9, only the SVG animating 25.1. The Synthesis card is a small part of a page whose per-frame cost is fixed by
 * everything else that repaints and by the globe, and a canvas is not cheaper to update than the SVG's few repainted nodes. To use it: call connectSynthesisCanvas(surface) next to
 * connectSynthesisTraces in menuExperience.ts and add SYNTHESIS_MENU_CANVAS_CSS to the menu stylesheet.
 *
 * FALLBACK (when wired). The SVG stays in the markup (it keeps the box the traces are placed from, and it is the still picture for prefers-reduced-motion). Where there is no canvas,
 * or less motion is asked for, this module does nothing and the SVG is what is seen, moved by CSS as before.
 */
/** The canvas covers the picture's box plus what the SVG shows outside it (overflow: visible): the pillars arrive from beyond the box, and the glow reaches past its top. */
export const SYN_CANVAS_MARGIN_X = 60;
export const SYN_CANVAS_MARGIN_Y = 8;
export const SYN_CANVAS_UNITS_WIDTH = SYN_VIEW_WIDTH + 2 * SYN_CANVAS_MARGIN_X;
export const SYN_CANVAS_UNITS_HEIGHT = SYN_VIEW_HEIGHT + 2 * SYN_CANVAS_MARGIN_Y;
const parseEase = (css) => {
    const match = /cubic-bezier\(([^)]+)\)/.exec(css);
    const n = (match?.[1] ?? '0,0,1,1').split(',').map(Number);
    return [n[0], n[1], n[2], n[3]];
};
const BOTH = parseEase(EASE_BOTH);
const OUT = parseEase(EASE_OUT);
const IN = parseEase(EASE_IN);
/** A CSS cubic-bezier timing function: the y for an x, by bisection on x(t). */
function cubic(curve, x) {
    if (x <= 0)
        return 0;
    if (x >= 1)
        return 1;
    let low = 0;
    let high = 1;
    let t = x;
    for (let step = 0; step < 40; step += 1) {
        const at = 3 * (1 - t) * (1 - t) * t * curve[0] + 3 * (1 - t) * t * t * curve[2] + t * t * t;
        if (at < x)
            low = t;
        else
            high = t;
        t = (low + high) / 2;
    }
    return 3 * (1 - t) * (1 - t) * t * curve[1] + 3 * (1 - t) * t * t * curve[3] + t * t * t;
}
const key = (at, v, ease = null) => ({ at, v, ease });
/** A keyframes track as the browser plays it: between two keys the FIRST key's easing (linear without one) shapes the progress, and every component moves by it. */
function evaluate(keys, seconds) {
    let index = keys.length - 1;
    while (index > 0 && keys[index].at > seconds)
        index -= 1;
    const from = keys[index];
    const to = keys[index + 1];
    if (to === undefined || to.at <= from.at)
        return from.v;
    const progress = (seconds - from.at) / (to.at - from.at);
    const eased = from.ease === null ? progress : cubic(from.ease, progress);
    return from.v.map((value, component) => value + (to.v[component] - value) * eased);
}
/** A function of time sampled into a track the way synthesisMenuStyle.ts samples it (same step, same rounding), then interpolated linearly. */
function sampled(at, step, digits) {
    const times = [];
    for (let seconds = 0; seconds < SYNTHESIS_MENU_PERIOD - 1e-9; seconds += step)
        times.push(+seconds.toFixed(4));
    times.push(SYNTHESIS_MENU_PERIOD);
    const values = times.map((seconds) => +at(seconds === SYNTHESIS_MENU_PERIOD ? 0 : seconds).toFixed(digits));
    return (seconds) => {
        let low = 0;
        let high = times.length - 1;
        while (high - low > 1) {
            const middle = (low + high) >> 1;
            if (times[middle] <= seconds)
                low = middle;
            else
                high = middle;
        }
        const span = times[high] - times[low];
        return span <= 0 ? values[low] : values[low] + (values[high] - values[low]) * ((seconds - times[low]) / span);
    };
}
const T = SYN_TIMES;
const END = SYNTHESIS_MENU_PERIOD;
const fmt2 = (value) => +value.toFixed(2);
const moveTrack = (bar) => {
    const side = SYN_SIDE[bar];
    const centre = -synSlotOffset(bar);
    const start = T.arriveStart[bar];
    const leave = T.departStart + T.departDelay[bar];
    return [
        key(0, [fmt2(side)], OUT),
        key(start, [fmt2(side)], OUT),
        key(start + T.arriveDuration, [0], BOTH),
        key(T.mergeStart, [0], BOTH),
        key(T.mergeEnd, [fmt2(centre)], BOTH),
        key(T.partStart, [fmt2(centre)], BOTH),
        key(T.partEnd, [0], IN),
        key(leave, [0], IN),
        key(leave + T.departDuration, [fmt2(side)]),
        key(END, [fmt2(side)]),
    ];
};
const lerp = (from, to, v) => from + (to - from) * v;
/** A leaf at a given opening, as [dx, dy, scale, opacity]. */
const leafPose = (direction, opening) => [
    fmt2(direction[0] * SYN_LEAF_OFFSET * opening), fmt2(direction[1] * SYN_LEAF_OFFSET * opening), +lerp(SYN_LEAF_START_SCALE, 1, opening).toFixed(4), opening,
];
const leafTrack = (index) => {
    const direction = SYN_LEAF_DIRECTIONS[index];
    return [
        key(0, leafPose(direction, 0), BOTH), key(T.leavesStart, leafPose(direction, 0), BOTH), key(T.leavesEnd, leafPose(direction, 1), BOTH),
        key(T.leavesOutStart, leafPose(direction, 1), BOTH), key(T.leavesOutEnd, leafPose(direction, 0)), key(END, leafPose(direction, 0)),
    ];
};
const discTrack = [
    key(0, [0], BOTH), key(T.discStart, [0], BOTH), key(T.discEnd, [1], BOTH), key(T.discOutStart, [1], BOTH), key(T.discOutEnd, [0]), key(END, [0]),
];
const arcTrack = (index) => {
    const from = index * SYN_ARC_DEGREES;
    const to = (index + 1) * SYN_ARC_DEGREES;
    return [key(0, [0]), key(turnReaches(from, true), [0]), key(turnReaches(to, true), [1]), key(turnReaches(to, false), [1]), key(turnReaches(from, false), [0]), key(END, [0])];
};
const MOVES = SYN_BARS.map(moveTrack);
const FADES = SYN_BARS.map((bar) => sampled((seconds) => barOpacityAt(bar, seconds), SYN_OPACITY_SAMPLE, 3));
const IGNITE = sampled((seconds) => SYN_HALF_OUTLINE_LENGTH * (1 - igniteAt(seconds)), SYN_IGNITE_SAMPLE, 2);
const TURN = sampled(turnAt, SYN_TURN_SAMPLE, 2);
const RING_GLOW = sampled((seconds) => sweepAt(seconds) / 180, SYN_TURN_SAMPLE, 3);
const LEAVES = [0, 1, 2, 3].map(leafTrack);
const ARCS = Array.from({ length: SYN_ARC_COUNT }, (_, index) => arcTrack(index));
/** Where a frame's numbers stand in its flat array. */
const BAR_STRIDE = 4; // x, opacity, turn (degrees), ignite dash offset
const AT_RING = 4 * BAR_STRIDE;
const AT_DISC = AT_RING + 1;
const AT_ARCS = AT_DISC + 1;
const AT_LEAVES = AT_ARCS + SYN_ARC_COUNT;
const LEAF_STRIDE = 4; // dx, dy, scale, opacity
export const SYN_FRAME_LENGTH = AT_LEAVES + 4 * LEAF_STRIDE;
/** Every number the picture is made of, at a moment of the loop (seconds, 0 to the period). */
export function synFrame(seconds, into = new Array(SYN_FRAME_LENGTH).fill(0)) {
    const at = Math.min(END, Math.max(0, seconds));
    for (const bar of SYN_BARS) {
        const base = bar * BAR_STRIDE;
        into[base] = evaluate(MOVES[bar], at)[0];
        into[base + 1] = FADES[bar](at);
        into[base + 2] = bar === SYN_SURVIVOR ? TURN(at) : 0;
        into[base + 3] = IGNITE(at);
    }
    into[AT_RING] = RING_GLOW(at);
    into[AT_DISC] = evaluate(discTrack, at)[0];
    for (let index = 0; index < SYN_ARC_COUNT; index += 1)
        into[AT_ARCS + index] = evaluate(ARCS[index], at)[0];
    for (let leaf = 0; leaf < 4; leaf += 1) {
        const pose = evaluate(LEAVES[leaf], at);
        for (let part = 0; part < LEAF_STRIDE; part += 1)
            into[AT_LEAVES + leaf * LEAF_STRIDE + part] = pose[part];
    }
    return into;
}
/** The finished picture the stylesheet shows without motion: the ring and its four leaves, no pillars. (Used for the still frame and by the tests.) */
export function synStillFrame() {
    const frame = new Array(SYN_FRAME_LENGTH).fill(0);
    for (const bar of SYN_BARS)
        frame[bar * BAR_STRIDE + 3] = SYN_HALF_OUTLINE_LENGTH;
    frame[AT_RING] = 1;
    frame[AT_DISC] = 1;
    for (let index = 0; index < SYN_ARC_COUNT; index += 1)
        frame[AT_ARCS + index] = 1;
    for (let leaf = 0; leaf < 4; leaf += 1) {
        const pose = leafPose(SYN_LEAF_DIRECTIONS[leaf], 1);
        for (let part = 0; part < LEAF_STRIDE; part += 1)
            frame[AT_LEAVES + leaf * LEAF_STRIDE + part] = pose[part];
    }
    return frame;
}
/* ------------------------------------------------------------------ drawing */
const [CX, CY] = SYN_CENTRE;
const HOT = `rgba(${MENU_LINE_HOT_RGB}, ${SYN_LINE_ALPHA})`;
const GLOW = `rgba(${MENU_LINE_GLOW_RGB}, ${SYN_GLOW_ALPHA})`;
const TINT = `rgba(${MENU_LINE_GLOW_RGB}, ${SYN_TINT_ALPHA})`;
const M_TINT = `rgba(${MENU_LINE_GLOW_RGB}, ${SYN_MATTE.tintAlpha})`;
const M_GLOW = `rgba(${MENU_LINE_GLOW_RGB}, ${SYN_MATTE.glowAlpha})`;
const M_LINE = `rgba(${MENU_LINE_HOT_RGB}, ${SYN_MATTE.lineAlpha})`;
const RAD = Math.PI / 180;
/** Map the picture's units (the SVG's viewBox 0 14 360 72) onto the canvas, whose box has the margins added. */
function baseTransform(ctx, scale) {
    ctx.setTransform(scale, 0, 0, scale, SYN_CANVAS_MARGIN_X * scale, (SYN_CANVAS_MARGIN_Y - SYN_VIEW_TOP) * scale);
}
function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arc(x + width - radius, y + radius, radius, -Math.PI / 2, 0);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2);
    ctx.lineTo(x + radius, y + height);
    ctx.arc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI);
    ctx.lineTo(x, y + radius);
    ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5);
    ctx.closePath();
}
function strokeWith(ctx, color, width) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
}
/** One pillar's three layers (tint, glow, line), the picture's own light. */
function pillarLayers(ctx, centreX) {
    const radius = SYN_BAR_WIDTH / 2;
    roundedRect(ctx, centreX - SYN_BAR_WIDTH / 2, CY - SYN_BAR_HEIGHT / 2, SYN_BAR_WIDTH, SYN_BAR_HEIGHT, radius);
    ctx.fillStyle = TINT;
    ctx.fill();
    strokeWith(ctx, GLOW, SYN_GLOW_WIDTH);
    strokeWith(ctx, HOT, SYN_LINE_WIDTH);
}
/** The half of a pillar's outline from the middle of its top to the middle of its foot (right clockwise, left counter-clockwise). */
function halfOutline(ctx, centreX, side) {
    const r = SYN_BAR_WIDTH / 2;
    const top = CY - SYN_BAR_HEIGHT / 2;
    const bottom = CY + SYN_BAR_HEIGHT / 2;
    ctx.beginPath();
    if (side === 'right') {
        ctx.moveTo(centreX, top);
        ctx.arc(centreX, top + r, r, -Math.PI / 2, 0, false);
        ctx.lineTo(centreX + r, bottom - r);
        ctx.arc(centreX, bottom - r, r, 0, Math.PI / 2, false);
    }
    else {
        ctx.moveTo(centreX, top);
        ctx.arc(centreX, top + r, r, -Math.PI / 2, -Math.PI, true);
        ctx.lineTo(centreX - r, bottom - r);
        ctx.arc(centreX, bottom - r, r, Math.PI, Math.PI / 2, true);
    }
}
/** One arc of the ring: the SVG path `M from A R R 0 0 1 to` for a half (0 from the top clockwise, 1 from the bottom clockwise). */
function ringArc(ctx, half, index) {
    const from = index * SYN_ARC_DEGREES * RAD;
    const to = Math.min(180, (index + 1) * SYN_ARC_DEGREES + 0.3) * RAD;
    const shift = half === 0 ? -Math.PI / 2 : Math.PI / 2;
    ctx.beginPath();
    ctx.arc(CX, CY, SYN_RING_RADIUS, from + shift, to + shift, false);
}
/** Clear a scratch layer's part of the picture (in units), leaving its transform alone. */
function pixelRect(scale, x, y, width, height) {
    const left = Math.floor((x + SYN_CANVAS_MARGIN_X) * scale) - 2;
    const top = Math.floor((y - SYN_VIEW_TOP + SYN_CANVAS_MARGIN_Y) * scale) - 2;
    return [Math.max(0, left), Math.max(0, top), Math.ceil(width * scale) + 4, Math.ceil(height * scale) + 4];
}
/** Draw `body` on a scratch layer, then put the layer on `onto` at `opacity`: an SVG group's opacity, exactly. */
function inGroup(onto, layer, scale, area, opacity, body) {
    if (opacity <= 0)
        return;
    const [x, y, width, height] = pixelRect(scale, area[0], area[1], area[2], area[3]);
    const { ctx } = layer;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(x, y, width, height);
    baseTransform(ctx, scale);
    body(ctx);
    onto.save();
    onto.setTransform(1, 0, 0, 1, 0, 0);
    onto.globalAlpha = Math.min(1, opacity);
    onto.drawImage(layer.canvas, x, y, width, height, x, y, width, height);
    onto.restore();
}
function drawBar(target, frame, bar, into) {
    const base = bar * BAR_STRIDE;
    const centreX = CX + synSlotOffset(bar);
    const turn = frame[base + 2];
    const ignite = frame[base + 3];
    const dash = [SYN_HALF_OUTLINE_LENGTH, SYN_HALF_OUTLINE_LENGTH];
    into.save();
    into.translate(frame[base], 0);
    if (turn !== 0) {
        into.translate(centreX, CY);
        into.rotate(turn * RAD);
        into.translate(-centreX, -CY);
    }
    /* the pillar itself, dim: a group at 0.5 */
    const around = SYN_BAR_HEIGHT / 2 + SYN_GLOW_WIDTH;
    inGroup(into, target.layerB, target.scale, [centreX + frame[base] - around, CY - around, around * 2, around * 2], 0.5, (ctx) => {
        ctx.save();
        ctx.translate(frame[base], 0);
        if (turn !== 0) {
            ctx.translate(centreX, CY);
            ctx.rotate(turn * RAD);
            ctx.translate(-centreX, -CY);
        }
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        pillarLayers(ctx, centreX);
        ctx.restore();
    });
    /* its outline kindled from the top down both sides: a dash grown along each half */
    into.lineCap = 'round';
    into.lineJoin = 'round';
    into.setLineDash(dash);
    into.lineDashOffset = ignite;
    for (const side of ['right', 'left']) {
        halfOutline(into, centreX, side);
        strokeWith(into, GLOW, SYN_GLOW_WIDTH);
        halfOutline(into, centreX, side);
        strokeWith(into, HOT, SYN_LINE_WIDTH);
    }
    into.setLineDash([]);
    into.restore();
}
/** Draw one frame of the picture on the target (its canvas is cleared first). */
export function drawSynthesis(target, frame) {
    const { ctx, scale } = target;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    baseTransform(ctx, scale);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const disc = frame[AT_DISC];
    if (disc > 0) {
        ctx.globalAlpha = disc;
        ctx.beginPath();
        ctx.arc(CX, CY, SYN_RING_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = M_TINT;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
    for (let leaf = 0; leaf < 4; leaf += 1) {
        const at = AT_LEAVES + leaf * LEAF_STRIDE;
        const opacity = frame[at + 3];
        const reach = SYN_LEAF_RADIUS * 1.2 + SYN_MATTE.glowWidth;
        inGroup(ctx, target.layerA, scale, [CX + frame[at] - reach, CY + frame[at + 1] - reach, reach * 2, reach * 2], opacity, (layer) => {
            layer.save();
            layer.lineCap = 'round';
            layer.lineJoin = 'round';
            layer.translate(frame[at], frame[at + 1]);
            layer.translate(CX, CY);
            layer.scale(frame[at + 2], frame[at + 2]);
            layer.translate(-CX, -CY);
            layer.beginPath();
            layer.arc(CX, CY, SYN_LEAF_RADIUS, 0, Math.PI * 2);
            layer.fillStyle = M_TINT;
            layer.fill();
            strokeWith(layer, M_GLOW, SYN_MATTE.glowWidth);
            strokeWith(layer, M_LINE, SYN_MATTE.lineWidth);
            layer.restore();
        });
    }
    const ring = frame[AT_RING];
    if (ring > 0) {
        ctx.globalAlpha = ring;
        ctx.beginPath();
        ctx.arc(CX, CY, SYN_RING_RADIUS, 0, Math.PI * 2);
        strokeWith(ctx, GLOW, SYN_GLOW_WIDTH);
        ctx.globalAlpha = 1;
    }
    for (const half of [0, 1]) {
        for (let index = 0; index < SYN_ARC_COUNT; index += 1) {
            const opacity = frame[AT_ARCS + index];
            if (opacity <= 0)
                continue;
            ctx.globalAlpha = Math.min(1, opacity);
            ringArc(ctx, half, index);
            strokeWith(ctx, HOT, SYN_LINE_WIDTH);
        }
    }
    ctx.globalAlpha = 1;
    for (const bar of SYN_BARS) {
        const base = bar * BAR_STRIDE;
        const opacity = frame[base + 1];
        if (opacity <= 0)
            continue;
        const around = SYN_BAR_HEIGHT / 2 + SYN_GLOW_WIDTH + 2;
        const centreX = CX + synSlotOffset(bar) + frame[base];
        inGroup(ctx, target.layerA, scale, [centreX - around, CY - around, around * 2, around * 2], opacity, (layer) => {
            /* the bar group draws into layer A; its dim pillar goes through layer B */
            drawBar({ ...target, ctx: layer }, frame, bar, layer);
        });
    }
}
/* ------------------------------------------------------------------ the live card's style */
/**
 * The canvas stands on the picture's own centre (the SVG's box is kept, empty of drawing, because the chip traces are placed from it) and is as much larger than it
 * as the margins say. The clock is a zero-size box with one 18.5 s transform animation: it paints nothing and a compositor runs it; only its currentTime is read.
 */
export const SYNTHESIS_MENU_CANVAS_CSS = `
    #place-experience .kt-menu-syn .${'kt-syn-canvas'} {
      position: absolute;
      top: 50%;
      left: 50%;
      width: calc(min(100%, 420px) * ${SYN_CANVAS_UNITS_WIDTH / SYN_VIEW_WIDTH});
      height: auto;
      aspect-ratio: ${SYN_CANVAS_UNITS_WIDTH} / ${SYN_CANVAS_UNITS_HEIGHT};
      translate: -50% -50%;
      pointer-events: none;
    }
    #place-experience .kt-menu-syn[data-kt-syn-canvas="on"] .kt-syn-svg > * { display: none; }
    #place-experience .kt-menu-syn .kt-syn-clock { position: absolute; top: 0; left: 0; width: 0; height: 0; opacity: 0; pointer-events: none; }
    @media (prefers-reduced-motion: no-preference) {
      #place-experience .kt-menu-syn .kt-syn-clock { will-change: transform; animation: kt-syn-clock ${SYNTHESIS_MENU_PERIOD}s linear infinite; }
      @keyframes kt-syn-clock { from { transform: translateX(0); } to { transform: translateX(1px); } }
    }
`;
/* ------------------------------------------------------------------ the live card */
const CLOCK_CLASS = 'kt-syn-clock';
const CANVAS_CLASS = 'kt-syn-canvas';
const ON_ATTRIBUTE = 'data-kt-syn-canvas';
const RUN_ATTRIBUTE = 'data-fc-run';
function makeScratch(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    return ctx === null ? null : { canvas, ctx };
}
/**
 * Put the canvas exactly over the picture's box and give it exactly as many pixels as the screen shows there: one canvas pixel is one device pixel (no resampling, which would
 * blur), and a unit of the picture is the same number of pixels as in the SVG. Returns the pixel size and scale, or null while the picture has no box (hidden).
 */
export function layoutSynthesisCanvas(canvas, syn) {
    const svg = syn.querySelector('.kt-syn-svg');
    if (svg === null)
        return null;
    const box = svg.getBoundingClientRect();
    const around = syn.getBoundingClientRect();
    if (!(box.width > 0) || !(syn.offsetWidth > 0))
        return null;
    /* an ancestor's transform (a card transition) scales both rectangles: measure in the card's own pixels */
    const k = around.width / syn.offsetWidth || 1;
    const ratio = Math.max(1, window.devicePixelRatio || 1);
    const unit = box.width / k / SYN_VIEW_WIDTH;
    const width = Math.max(1, Math.round(SYN_CANVAS_UNITS_WIDTH * unit * ratio));
    const height = Math.max(1, Math.round(SYN_CANVAS_UNITS_HEIGHT * unit * ratio));
    const style = canvas.style;
    style.translate = 'none';
    style.left = `${(box.left - around.left) / k - SYN_CANVAS_MARGIN_X * unit}px`;
    style.top = `${(box.top - around.top) / k - SYN_CANVAS_MARGIN_Y * unit}px`;
    style.width = `${width / ratio}px`;
    style.height = `${height / ratio}px`;
    return { width, height, scale: width / SYN_CANVAS_UNITS_WIDTH };
}
/** Make the canvas's pixels as many as its box shows (devicePixelRatio) and its scratch layers the same. */
function fit(mounted) {
    const { canvas, target } = mounted;
    const laid = layoutSynthesisCanvas(canvas, mounted.syn);
    if (laid === null) {
        mounted.sized = false;
        return false;
    }
    mounted.sized = true;
    if (canvas.width === laid.width && canvas.height === laid.height && target.scale === laid.scale)
        return true;
    for (const surface of [canvas, target.layerA.canvas, target.layerB.canvas]) {
        surface.width = laid.width;
        surface.height = laid.height;
    }
    target.scale = laid.scale;
    mounted.last = null;
    return true;
}
export function connectSynthesisCanvas(surface) {
    const reduced = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    let mounted = null;
    let raf = 0;
    const unmount = () => {
        if (raf !== 0) {
            cancelAnimationFrame(raf);
            raf = 0;
        }
        if (mounted === null)
            return;
        mounted.resize?.disconnect();
        mounted.canvas.remove();
        mounted.clock.remove();
        mounted.syn.removeAttribute(ON_ATTRIBUTE);
        mounted = null;
    };
    const running = () => !surface.hidden && !surface.inert && surface.getAttribute(RUN_ATTRIBUTE) !== 'off' && document.visibilityState !== 'hidden';
    const clockSeconds = (current) => {
        const animation = current.clock.getAnimations()[0];
        const time = animation?.currentTime;
        if (time === null || time === undefined)
            return 0;
        const seconds = (Number(time) / 1000) % SYNTHESIS_MENU_PERIOD;
        return seconds < 0 ? seconds + SYNTHESIS_MENU_PERIOD : seconds;
    };
    const paint = (current, values) => {
        if (current.last !== null && current.last.length === values.length) {
            let same = true;
            for (let index = 0; index < values.length; index += 1)
                if (Math.abs(values[index] - current.last[index]) > 1e-4) {
                    same = false;
                    break;
                }
            if (same)
                return;
        }
        drawSynthesis(current.target, values);
        current.last = values.slice();
    };
    const tick = (now) => {
        raf = 0;
        const current = mounted;
        if (current === null || !running())
            return;
        /* About 60 redraws a second whatever the screen's rate (a 120 Hz screen asks for a frame every 8 ms; the picture moves slowly enough that every other one is the same to the eye). */
        if (current.sized && now - current.drawnAt >= 14) {
            current.drawnAt = now;
            synFrame(clockSeconds(current), current.frame);
            paint(current, current.frame);
        }
        raf = requestAnimationFrame(tick);
    };
    const sync = () => {
        if (mounted !== null && !running() && raf !== 0) {
            cancelAnimationFrame(raf);
            raf = 0;
        }
        if (mounted !== null && running() && raf === 0)
            raf = requestAnimationFrame(tick);
    };
    const mount = () => {
        const syn = surface.querySelector('.kt-menu-syn');
        if (!(syn instanceof HTMLElement)) {
            unmount();
            return;
        }
        if (mounted !== null && mounted.syn === syn && syn.isConnected) {
            sync();
            return;
        }
        unmount();
        if (reduced?.matches === true || typeof document.createElement('canvas').getContext !== 'function')
            return;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const layerA = makeScratch(1, 1);
        const layerB = makeScratch(1, 1);
        if (ctx === null || layerA === null || layerB === null)
            return;
        canvas.className = CANVAS_CLASS;
        canvas.setAttribute('aria-hidden', 'true');
        const clock = document.createElement('span');
        clock.className = CLOCK_CLASS;
        clock.setAttribute('aria-hidden', 'true');
        syn.append(canvas, clock);
        syn.setAttribute(ON_ATTRIBUTE, 'on');
        const target = { ctx, layerA, layerB, scale: 1 };
        const next = {
            syn, canvas, clock, target, last: null, frame: new Array(SYN_FRAME_LENGTH).fill(0), sized: false, drawnAt: -1000,
            resize: typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => { if (mounted !== null && fit(mounted)) {
                mounted.last = null;
                synFrame(clockSeconds(mounted), mounted.frame);
                paint(mounted, mounted.frame);
            } }) : null,
        };
        mounted = next;
        next.resize?.observe(canvas);
        sync();
    };
    const mutations = typeof MutationObserver !== 'undefined'
        ? new MutationObserver((records) => {
            if (records.some((record) => record.type === 'childList'))
                mount();
            else
                sync();
        })
        : null;
    mutations?.observe(surface, { childList: true, attributes: true, attributeFilter: ['hidden', 'inert', RUN_ATTRIBUTE] });
    const onVisibility = () => { sync(); };
    document.addEventListener('visibilitychange', onVisibility);
    const onReduced = () => { if (reduced?.matches === true)
        unmount();
    else
        mount(); };
    reduced?.addEventListener?.('change', onReduced);
    mount();
    return () => {
        mutations?.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
        reduced?.removeEventListener?.('change', onReduced);
        unmount();
    };
}
