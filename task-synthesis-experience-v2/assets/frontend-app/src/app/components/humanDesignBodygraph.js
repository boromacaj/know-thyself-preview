import { escapeAttribute, escapeHtml } from '../format.js?v=53c0693';
import { t, tf } from '../i18n/uiStrings.js?v=53c0693';
import { hdCenters } from '../human-design/data/hdCenters.js?v=53c0693';
import { hdChannels } from '../human-design/data/hdChannels.js?v=53c0693';
import { planetGlyph } from '../pillar-reading/glyphs/astrologyGlyphs.js?v=53c0693';
import { bodyWord } from '../i18n/engineProse.js?v=53c0693';
import { REFERENCE_CENTER_GATE_ORDER, REFERENCE_CENTER_PATHS, REFERENCE_CHANNEL_STEMS, REFERENCE_GATE_DOCKS, refPathToCanvas, refRectToCanvas, refToCanvas, } from './humanDesignBodygraphReference.js?v=53c0693';
import { HD_HIT_PADDING, HD_WAVE_TRAVEL_UNITS, centerStateFromRenderer, hdCenterConceptKey, outlineWave } from './humanDesignHeroConfig.js?v=53c0693';
const CHANNEL_UNDERLAY_OPACITY = 0.72;
function round(value) {
    return Math.round(value * 100) / 100;
}
/**
 * Bounding box of one of the flattened reference paths. Every such path is
 * absolute M / L / C / Z, so each numeric pair is a point on the outline or a
 * cubic control point. For these silhouettes the control points sit on the
 * un-rounded corner they round off, which makes this the shape's true outer
 * box rather than an underestimate.
 */
function pathBounds(d) {
    const numbers = (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
    const xs = [];
    const ys = [];
    for (let index = 0; index + 1 < numbers.length; index += 2) {
        xs.push(numbers[index]);
        ys.push(numbers[index + 1]);
    }
    const x = Math.min(...xs);
    const y = Math.min(...ys);
    return { x, y, width: Math.max(...xs) - x, height: Math.max(...ys) - y };
}
function unionBounds(all) {
    const x = Math.min(...all.map((b) => b.x));
    const y = Math.min(...all.map((b) => b.y));
    const right = Math.max(...all.map((b) => b.x + b.width));
    const bottom = Math.max(...all.map((b) => b.y + b.height));
    return { x, y, width: right - x, height: bottom - y };
}
/* ------------------------------------------------------------------ *
 * PLANE 2 - CENTRE GEOMETRY
 * ------------------------------------------------------------------ */
const CENTER_GEOMETRY = (() => {
    const entries = hdCenters.map((center) => {
        const path = refPathToCanvas(REFERENCE_CENTER_PATHS[center.id]);
        const bounds = pathBounds(path);
        return [center.id, {
                path,
                bounds,
                anchor: { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 },
            }];
    });
    return Object.fromEntries(entries);
})();
/* ------------------------------------------------------------------ *
 * PLANE 3 - GATE DOCK / NUMBER SYSTEM
 * ------------------------------------------------------------------ */
/** Each gate's dock rectangle in canvas space - the seat its number sits in. */
const GATE_DOCKS = Object.fromEntries(Object.entries(REFERENCE_GATE_DOCKS).map(([gate, rect]) => [Number(gate), refRectToCanvas(rect)]));
function dockCenter(gate) {
    const dock = GATE_DOCKS[gate];
    return { x: dock.x + dock.width / 2, y: dock.y + dock.height / 2 };
}
/**
 * Canonical gate order and label anchor per centre. Both the ordering and the
 * coordinates come straight from the reference's dock layout, so the numbers
 * cannot drift out of step with the routes that dock into them.
 */
const CENTER_GATE_LAYOUT = Object.fromEntries(hdCenters.map((center) => [
    center.id,
    REFERENCE_CENTER_GATE_ORDER[center.id].map((gate) => {
        const point = dockCenter(gate);
        return [gate, round(point.x), round(point.y)];
    }),
]));
const GATE_POSITIONS = (() => {
    const map = new Map();
    for (const center of hdCenters) {
        for (const gate of REFERENCE_CENTER_GATE_ORDER[center.id]) {
            map.set(gate, { ...dockCenter(gate), center: center.id });
        }
    }
    return map;
})();
function gatePosition(gate) {
    const position = GATE_POSITIONS.get(gate);
    if (!position)
        throw new Error(`gate ${gate} has no dock`);
    return position;
}
/* ------------------------------------------------------------------ *
 * PLANE 1 - FUNCTIONAL ROUTING SKELETON
 * ------------------------------------------------------------------ */
/**
 * ROUTING COMES STRAIGHT FROM THE REFERENCE. NOTHING RESHAPES IT.
 *
 * This file previously ran a "beautification" pass over the measured routes -
 * arc-length relaxation, a curvature leash, and a hairpin fillet that cut
 * corners off reversals. All of it is gone. It existed to solve a problem
 * that this module had created for itself.
 *
 * The reference draws a channel as TWO filled ribbons, one per gate, that
 * abut somewhere in the middle. Nothing in it is continuous across that
 * meeting point. The old code concatenated the two halves into a single
 * stroked line, which invented a join the reference never had - and that
 * invented join is what produced the 20-95 degree mid-route corners, and the
 * 175 degree reversal on 10-20 where gates 10, 20, 34 and 57 share a node.
 * Smoothing those away then bent the routes off the reference into S-curves
 * and invented detours, while the reversal only sharpened.
 *
 * So the halves are never joined. Each channel is stroked as ONE path with
 * TWO SUBPATHS - gate A's stem, then gate B's stem - taken verbatim from
 * REFERENCE_CHANNEL_STEMS. There is no join to kink, no hairpin to fillet,
 * and the four-way node on the left flank reproduces itself for free: it is
 * simply four stems that end at the same point.
 *
 * The only maths applied to a stem is interpolation: a centripetal
 * Catmull-Rom spline passing exactly THROUGH every measured point, so it can
 * be expressed as SVG cubics. It moves nothing. Centripetal (alpha = 0.5)
 * rather than uniform because uniform Catmull-Rom is only correct for evenly
 * spaced points and bulges or cusps on uneven ones - which is a property of
 * the fit, not a reshaping of the route.
 */
/**
 * Centripetal Catmull-Rom (alpha = 0.5) as cubic Beziers. Interpolating, not
 * approximating: every input point lies exactly on the output curve. A
 * two-point stem (the twelve straight spine channels) comes out as a single
 * dead-straight cubic.
 */
function centripetalCatmullRomPath(points) {
    if (points.length < 2)
        throw new Error('a stem needs at least two points');
    const segments = [`M ${round(points[0].x)} ${round(points[0].y)}`];
    const knot = (a, b) => Math.hypot(b.x - a.x, b.y - a.y) ** 0.5 || 1e-6;
    for (let index = 0; index < points.length - 1; index += 1) {
        const p0 = points[index - 1] ?? points[index];
        const p1 = points[index];
        const p2 = points[index + 1];
        const p3 = points[index + 2] ?? points[index + 1];
        const d1 = knot(p0, p1);
        const d2 = knot(p1, p2);
        const d3 = knot(p2, p3);
        // Barry-Goldman tangents, scaled into Bezier handle positions.
        const outX = (d1 * d1 * p2.x - d2 * d2 * p0.x + (2 * d1 * d1 + 3 * d1 * d2 + d2 * d2) * p1.x)
            / (3 * d1 * (d1 + d2));
        const outY = (d1 * d1 * p2.y - d2 * d2 * p0.y + (2 * d1 * d1 + 3 * d1 * d2 + d2 * d2) * p1.y)
            / (3 * d1 * (d1 + d2));
        const inX = (d3 * d3 * p1.x - d2 * d2 * p3.x + (2 * d3 * d3 + 3 * d3 * d2 + d2 * d2) * p2.x)
            / (3 * d3 * (d3 + d2));
        const inY = (d3 * d3 * p1.y - d2 * d2 * p3.y + (2 * d3 * d3 + 3 * d3 * d2 + d2 * d2) * p2.y)
            / (3 * d3 * (d3 + d2));
        segments.push(`C ${round(outX)} ${round(outY)} ${round(inX)} ${round(inY)} ${round(p2.x)} ${round(p2.y)}`);
    }
    return segments.join(' ');
}
function toCanvas(stem) {
    return stem.map(([x, y]) => {
        const point = refToCanvas(x, y);
        return { x: point.x, y: point.y };
    });
}
/**
 * SPINE vs LATERAL, derived from the reference rather than listed by hand.
 *
 * A spine channel is one whose two stems are both dead-vertical two-point
 * segments sharing an x - the three stacked lanes at reference x = 193, 213
 * and 233. Fifteen channels qualify (three lanes across the five stacked
 * gaps). Everything else is lateral.
 *
 * The distinction exists for one reason: draw order. A lateral route that
 * crosses the spine must pass BEHIND all three vertical lanes, so the whole
 * lateral family is painted before the whole spine family.
 */
function isSpineChannel(id) {
    const stems = REFERENCE_CHANNEL_STEMS[id];
    return [stems.a, stems.b].every((stem) => stem.length === 2 && stem[0][0] === stem[1][0]);
}
/**
 * DOCK OVERRUN - so a vein emerges from a centre instead of starting beside it.
 *
 * A stem is measured from where its ribbon begins, which is inside the centre
 * for most gates but a unit or two OUTSIDE it for a few (gate 16's ribbon
 * starts at reference x=171.1 while Throat's edge is at x=172). Stroked 18
 * wide with a round cap, that one unit becomes a rounded bump sticking out of
 * the centre's edge - one of the artefacts on the graph.
 *
 * Every stem is therefore run on past its dock end, along its own terminal
 * direction, far enough to be safely inside the centre. That stretch is hidden
 * by the centre-occlusion mask, so it changes nothing except that the tube is
 * now always cut by the mask at the centre's edge rather than ending near it.
 * It moves no route: the added point is collinear with the stem's own last
 * segment.
 */
const DOCK_OVERRUN = 10;
function withDockOverrun(points) {
    const [first, second] = points;
    const dx = first.x - second.x;
    const dy = first.y - second.y;
    const length = Math.hypot(dx, dy) || 1;
    return [
        { x: first.x + (dx / length) * DOCK_OVERRUN, y: first.y + (dy / length) * DOCK_OVERRUN },
        ...points.map((point) => ({ ...point })),
    ];
}
/**
 * ONE CONTINUOUS VEIN PER CHANNEL - and why it can be one now.
 *
 * The two stems used to be stroked as two separate subpaths, because joining
 * them put a 20-95 degree corner mid-route. That corner was never real: it was
 * an artefact of a centreline sampler that paired points across each ribbon's
 * end caps, which bent the first and last sample of every stem. With the
 * sampler fixed the stems meet cleanly - all fifteen spine channels join at
 * EXACTLY 0 degrees, and eighteen of the rest at under 7 - so a channel can be
 * drawn as one unbroken line from centre to centre.
 *
 * That matters visually. A spine vein is only 10-21 units of visible tube
 * between two centres while the tube itself is 18 wide, so splitting it into
 * two round-capped subpaths meeting in the middle of that gap read as two
 * lumps rather than one vein. Joined, it is a single clean line.
 *
 * The exception is the integration bundle. Gates 10, 20, 34 and 57 share one
 * four-way node, so those six channels are made of four shared stems, and
 * joining a pair of them would double back on itself (10-20 turns 175.8
 * degrees, 34-57 154.8). Those four stems stay separate and are drawn once
 * each - four stems meeting at a node, exactly as the reference has it.
 */
const CHANNEL_STEMS = Object.fromEntries(Object.entries(REFERENCE_CHANNEL_STEMS).map(([id, stems]) => [
    id,
    { a: withDockOverrun(toCanvas(stems.a)), b: withDockOverrun(toCanvas(stems.b)) },
]));
function stemKey(points) {
    return points.map((point) => `${round(point.x)},${round(point.y)}`).join(' ');
}
/** Channels whose stems are shared with another channel - the bundle, and only it. */
const SHARED_STEM_CHANNELS = (() => {
    const uses = new Map();
    for (const [id, stems] of Object.entries(CHANNEL_STEMS)) {
        for (const points of [stems.a, stems.b]) {
            const key = stemKey(points);
            if (!uses.has(key))
                uses.set(key, []);
            uses.get(key).push(id);
        }
    }
    const shared = new Set();
    for (const ids of uses.values()) {
        if (ids.length > 1)
            for (const id of ids)
                shared.add(id);
    }
    return shared;
})();
/** A channel's whole vein: gate A's dock, through the junction, to gate B's. */
function veinPoints(id) {
    const stems = CHANNEL_STEMS[id];
    return [...stems.a, ...stems.b.slice().reverse().slice(1)];
}
const ROUTE_DRAWS = (() => {
    const draws = new Map();
    for (const channel of hdChannels) {
        const spine = isSpineChannel(channel.id);
        if (!SHARED_STEM_CHANNELS.has(channel.id)) {
            const points = veinPoints(channel.id);
            draws.set(channel.id, {
                key: channel.id,
                d: centripetalCatmullRomPath(points),
                points,
                spine,
                label: channel.id,
            });
            continue;
        }
        const stems = CHANNEL_STEMS[channel.id];
        [['a', channel.gates[0]], ['b', channel.gates[1]]].forEach(([side, gate]) => {
            const points = side === 'a' ? stems.a : stems.b;
            const key = stemKey(points);
            if (draws.has(key))
                return;
            draws.set(key, { key, d: centripetalCatmullRomPath(points), points, spine, label: `gate-${gate}` });
        });
    }
    return [...draws.values()];
})();
/** FOR THE TESTS AND THE AUDIT: each centre's outline path, in the graph's own canvas units (before the scene transform). */
export function bodygraphCenterPath(center) {
    return CENTER_GEOMETRY[center].path;
}
/**
 * FOR THE MAIN MENU'S HUMAN DESIGN CARD (premium-earth/humanDesignMenuGeometry.ts): each channel's canonical route path, in the graph's own canvas units (before the scene transform), with the
 * two centres it joins - the same paths the graph draws, read here so the card shows the graph's own geometry and nothing of its own.
 */
export function bodygraphChannelRoutes() {
    return hdChannels.map((channel) => ({ id: channel.id, centers: [channel.centers[0], channel.centers[1]], path: channelPath(channel) }));
}
function gateTone(gate, tones) {
    const conscious = tones.conscious.has(gate);
    const unconscious = tones.unconscious.has(gate);
    if (conscious && unconscious)
        return 'both';
    if (conscious)
        return 'conscious';
    if (unconscious)
        return 'unconscious';
    return null;
}
/** Straight-line length of a polyline, used only to place the colour split. */
function polylineLength(points) {
    let total = 0;
    for (let index = 1; index < points.length; index += 1) {
        total += Math.hypot(points[index].x - points[index - 1].x, points[index].y - points[index - 1].y);
    }
    return total;
}
/**
 * WHERE THE TWO COLOURS MEET, as a percentage along the drawn vein.
 *
 * veinPoints concatenates stem a with stem b reversed, so the drawn path always
 * runs gate[0] -> junction -> gate[1] and the junction sits at stem a's share of
 * the total. Measured on the polyline rather than on the spline: centripetal
 * Catmull-Rom stays close enough to its control polygon that the difference is
 * far under a stroke width, and the alternative - splitting the curve - would
 * change the geometry, which is precisely what must not happen here.
 */
function channelSplitPercent(id) {
    const stems = CHANNEL_STEMS[id];
    const a = polylineLength(stems.a);
    const b = polylineLength(stems.b);
    if (a + b === 0)
        return 50;
    return (a / (a + b)) * 100;
}
/** The geometry a channel lights up in a given state. */
function litSegmentsFor(channel, state, tones) {
    const stems = CHANNEL_STEMS[channel.id];
    const toneA = gateTone(channel.gates[0], tones) ?? 'conscious';
    const toneB = gateTone(channel.gates[1], tones) ?? 'conscious';
    /* The integration bundle already keeps its two stems as separate geometry,
       because joining them would double back through the shared node. Each stem
       therefore just takes its own gate's colour - no split needed. */
    if (SHARED_STEM_CHANNELS.has(channel.id)) {
        const segments = [];
        if (state.status === 'fully-active' || state.activeEnd === 'start') {
            segments.push({ d: centripetalCatmullRomPath(stems.a), tone: toneA });
        }
        if (state.status === 'fully-active' || state.activeEnd === 'end') {
            segments.push({ d: centripetalCatmullRomPath(stems.b), tone: toneB });
        }
        return segments;
    }
    /* A hanging gate lights its own stem, and only that stem. */
    if (state.status !== 'fully-active') {
        const start = state.activeEnd === 'start';
        return [{
                d: centripetalCatmullRomPath(start ? stems.a : stems.b),
                tone: start ? toneA : toneB,
            }];
    }
    const d = centripetalCatmullRomPath(veinPoints(channel.id));
    /* Both ends carry the same side, so the channel is one colour and one
       stroke - identical to what it has always drawn. */
    if (toneA === toneB)
        return [{ d, tone: toneA }];
    /* Mixed. The SAME path twice, each copy revealing only its own gate's share.
       This is what makes both activations visible without a second geometry. */
    const split = channelSplitPercent(channel.id);
    return [
        { d, tone: toneA, from: 0, to: split },
        { d, tone: toneB, from: split, to: 100 },
    ];
}
/**
 * The geometry recorded for each channel. An ordinary channel is one
 * continuous vein; an integration-bundle channel keeps its two stems as
 * separate subpaths, because joining them would double back through the shared
 * node (10-20 turns 175.8 degrees). The record therefore always reflects what
 * the channel actually is.
 */
const CHANNEL_PATHS = Object.fromEntries(Object.keys(CHANNEL_STEMS).map((id) => {
    if (!SHARED_STEM_CHANNELS.has(id))
        return [id, centripetalCatmullRomPath(veinPoints(id))];
    const stems = CHANNEL_STEMS[id];
    return [
        id,
        `${centripetalCatmullRomPath(stems.a)} ${centripetalCatmullRomPath(stems.b.slice().reverse())}`,
    ];
}));
function channelPath(channel) {
    const path = CHANNEL_PATHS[channel.id];
    if (!path)
        throw new Error(`channel ${channel.id} has no reference route`);
    return path;
}
/* ------------------------------------------------------------------ *
 * SCENE FRAMING
 * ------------------------------------------------------------------ */
const GRAPH_VISUAL_BOUNDS = unionBounds(hdCenters.map((center) => CENTER_GEOMETRY[center.id].bounds));
const CHANNEL_VISUAL_BOUNDS = unionBounds(Object.values(CHANNEL_STEMS).flatMap((stems) => [stems.a, stems.b].map((stem) => unionBounds(stem.map((p) => ({ x: p.x, y: p.y, width: 0, height: 0 }))))));
/**
 * Camera-zoom framing only, unchanged in intent from the previous geometry:
 * every layer renders inside one outer <g transform> that scales the whole
 * composition about GRAPH_VISUAL_BOUNDS' own centre and re-centres that point
 * on the canvas centre (400,500). No coordinate anywhere else in this file
 * changes; this only decides how much of the fixed viewBox the graph fills.
 *
 * The reference fit already lands the graph inside 140.6..659.4 horizontally
 * and 47.7..950.5 vertically, so at 1.06 the outermost painted edge (Head's
 * blurred glow, historically the tightest edge in the composition) sits near
 * y=21 with the canvas top at y=0 - more headroom than the previous geometry
 * had at this same scale, which is why 1.06 is kept rather than re-tuned.
 */
export const BODYGRAPH_SCENE_SCALE = 1.06;
const BODYGRAPH_CANVAS_CENTER = { x: 400, y: 500 };
const BODYGRAPH_SCENE_PIVOT = {
    x: GRAPH_VISUAL_BOUNDS.x + GRAPH_VISUAL_BOUNDS.width / 2,
    y: GRAPH_VISUAL_BOUNDS.y + GRAPH_VISUAL_BOUNDS.height / 2,
};
/* The SVG's own coordinate system. Named because the frost clip has to divide by
   it to express the centre shapes as fractions of the rendered box. */
export const BODYGRAPH_VIEWBOX_WIDTH = 800;
export const BODYGRAPH_VIEWBOX_HEIGHT = 1000;
const BODYGRAPH_SCENE_TRANSFORM = `translate(${BODYGRAPH_CANVAS_CENTER.x - BODYGRAPH_SCENE_PIVOT.x * BODYGRAPH_SCENE_SCALE} ${BODYGRAPH_CANVAS_CENTER.y - BODYGRAPH_SCENE_PIVOT.y * BODYGRAPH_SCENE_SCALE}) scale(${BODYGRAPH_SCENE_SCALE})`;
/* ------------------------------------------------------------------ *
 * SKELETON INTEGRITY
 * ------------------------------------------------------------------ */
function distanceToSegment(point, a, b) {
    const vx = b.x - a.x;
    const vy = b.y - a.y;
    const lengthSquared = vx * vx + vy * vy;
    if (lengthSquared === 0)
        return Math.hypot(point.x - a.x, point.y - a.y);
    const t = Math.max(0, Math.min(1, ((point.x - a.x) * vx + (point.y - a.y) * vy) / lengthSquared));
    return Math.hypot(point.x - (a.x + t * vx), point.y - (a.y + t * vy));
}
function distanceToPolyline(point, polyline) {
    let best = Infinity;
    for (let index = 1; index < polyline.length; index += 1) {
        best = Math.min(best, distanceToSegment(point, polyline[index - 1], polyline[index]));
    }
    return best;
}
/**
 * The one invariant that makes the graph readable: every route must physically
 * pass through both of the docks it claims to join, in the order hdChannels
 * declares. If a dock or a route is ever edited out of step with the other,
 * this throws at module load rather than shipping a graph whose lines say one
 * thing and whose numbers say another.
 *
 * The tolerance is a canvas-space radius. A dock is 23.4 x 19.5 canvas units,
 * so 20 keeps a route inside its own dock's footprint. The measured worst case
 * across all 36 channels is well inside that.
 */
const DOCK_CONTACT_TOLERANCE = 20;
function assertReferenceSkeleton() {
    const gatesInCentres = hdCenters.flatMap((center) => REFERENCE_CENTER_GATE_ORDER[center.id]);
    if (gatesInCentres.length !== 64 || new Set(gatesInCentres).size !== 64) {
        throw new Error('the reference gate layout must own all 64 gates exactly once');
    }
    for (const channel of hdChannels) {
        const stems = CHANNEL_STEMS[channel.id];
        if (!stems)
            throw new Error(`channel ${channel.id} has no reference stems`);
        // The two stems must actually meet, or the channel reads as two broken
        // pieces rather than one line.
        const endA = stems.a[stems.a.length - 1];
        const endB = stems.b[stems.b.length - 1];
        const seam = Math.hypot(endA.x - endB.x, endA.y - endB.y);
        if (seam > 0.5) {
            throw new Error(`channel ${channel.id} leaves a ${seam.toFixed(1)} unit gap at its junction`);
        }
        channel.gates.forEach((gate, index) => {
            // Each gate's OWN stem must pass through that gate's own dock. Checking
            // per stem, not per channel, is what keeps a stem attached to the gate
            // it belongs to.
            const stem = index === 0 ? stems.a : stems.b;
            const contact = distanceToPolyline(dockCenter(gate), stem);
            if (contact > DOCK_CONTACT_TOLERANCE) {
                throw new Error(`channel ${channel.id}'s gate ${gate} stem misses that dock by ${contact.toFixed(1)}`);
            }
            // No "which end is nearer the dock" check here, deliberately. On the
            // twelve spine channels the tube runs deep into both centres and the
            // dock sits roughly HALFWAY along its own stem (gate 52's dock is 24.5
            // from one end of its stem and 23.5 from the other), so that comparison
            // is meaningless and was firing on correct geometry. What actually needs
            // to hold - that stem `a` belongs to gates[0] and stem `b` to gates[1] -
            // is exactly what the contact check above proves.
            const owner = GATE_POSITIONS.get(gate)?.center;
            if (owner !== channel.centers[index]) {
                throw new Error(`gate ${gate} sits in ${String(owner)} but channel ${channel.id} claims ${channel.centers[index]}`);
            }
        });
    }
}
assertReferenceSkeleton();
function pairKey(channel) {
    return channel.centers.slice().sort().join('-');
}
function channelState(channel, definedChannelIds, activatedGates) {
    if (definedChannelIds.has(channel.id))
        return { status: 'fully-active' };
    const startActive = activatedGates.has(channel.gates[0]);
    const endActive = activatedGates.has(channel.gates[1]);
    if (startActive === endActive)
        return { status: 'inactive' };
    return startActive
        ? { status: 'half-active', activeEnd: 'start', activeCenter: channel.centers[0] }
        : { status: 'half-active', activeEnd: 'end', activeCenter: channel.centers[1] };
}
/**
 * A hanging gate lights its OWN stem, and only that stem.
 *
 * This used to be faked with `stroke-dasharray="50 50"` over a pathLength of
 * 100 - half the tube on, half off - because the channel was a single
 * concatenated line and half of it was the best available approximation of
 * "one gate's share". Now that the two stems are separate geometry, the lit
 * path is simply the active gate's stem, which is both simpler and what the
 * reference actually shows: the ribbon belonging to the defined gate is
 * filled, its partner is not.
 */
/** The dark tube for one drawn route. */
function renderRouteTube(route, lit) {
    const state = lit ? 'active' : 'inactive';
    return `<g class="human-design-bodygraph__channel-group human-design-bodygraph__channel-group--${state}" data-route="${route.label}">
    <path class="human-design-bodygraph__channel human-design-bodygraph__channel--${state}" data-route="${route.label}" d="${route.d}" />
    <path class="human-design-bodygraph__channel-glass" d="${route.d}" />
  </g>`;
}
/**
 * The lit overlay for one piece of geometry. It carries no colour of its own -
 * every stroke comes from the accent theme through styles.css, so switching
 * theme in the vessel menu repaints the graph live without re-rendering it.
 */
function renderRouteLight(segment) {
    /* pathLength normalises the vein to 100 whatever its real length, so one dash
       of `to - from` starting at `from` reveals exactly that share of it. The
       geometry is untouched: same d, same stroke width, just less of it drawn. */
    const windowed = segment.from !== undefined && segment.to !== undefined;
    const dash = windowed
        ? ` pathLength="100" stroke-dasharray="${round(segment.to - segment.from)} 100"`
            + ` stroke-dashoffset="${round(-segment.from)}"`
        : '';
    return `<g class="human-design-bodygraph__channel-group human-design-bodygraph__channel-group--active human-design-bodygraph__channel-group--${segment.tone}" data-activation="${segment.tone}">
    <path class="human-design-bodygraph__channel-glow" d="${segment.d}"${dash} />
    <path class="human-design-bodygraph__channel-light" d="${segment.d}"${dash} />
    <path class="human-design-bodygraph__channel-core" d="${segment.d}"${dash} />
  </g>`;
}
/**
 * The per-channel record. It carries the channel's full vein geometry and its
 * live state for binding and inspection, but paints nothing - the tube itself
 * is painted once per drawn route above, which is the only way the four shared
 * integration stems can avoid being drawn three times each. `display:none` is
 * set inline because a presentation attribute would lose to the class rule in
 * styles.css, and this rebuild changes no stylesheet.
 */
function renderChannelRecord(channel, state) {
    const d = channelPath(channel);
    const key = pairKey(channel);
    return `<path class="human-design-bodygraph__channel human-design-bodygraph__channel--${state.status}" data-channel-id="${channel.id}" data-channel-pair="${key}" data-channel-status="${state.status}" data-channel-path="canonical" d="${d}" pathLength="100" style="display:none" />`;
}
/**
 * One family of routes, painted as: every tube, then every lit overlay.
 * Returning the two together per family lets the caller order the families so
 * the spine lands above the lateral routes it crosses.
 */
function renderFamily(spine, states, tones) {
    /* Keyed on geometry AND colour AND window, so the four shared integration
       stems are still drawn once each, while a stem that genuinely carries two
       different activations keeps both of its pieces. */
    const litSegments = new Map();
    const litRoutes = new Set();
    for (const channel of hdChannels) {
        if (isSpineChannel(channel.id) !== spine)
            continue;
        const state = states.get(channel.id) ?? { status: 'inactive' };
        if (state.status === 'inactive')
            continue;
        for (const segment of litSegmentsFor(channel, state, tones)) {
            litSegments.set(`${segment.d}|${segment.tone}|${segment.from ?? ''}|${segment.to ?? ''}`, segment);
        }
        if (SHARED_STEM_CHANNELS.has(channel.id)) {
            const stems = CHANNEL_STEMS[channel.id];
            if (state.status === 'fully-active' || state.activeEnd === 'start')
                litRoutes.add(stemKey(stems.a));
            if (state.status === 'fully-active' || state.activeEnd === 'end')
                litRoutes.add(stemKey(stems.b));
        }
        else {
            litRoutes.add(channel.id);
        }
    }
    const family = ROUTE_DRAWS.filter((route) => route.spine === spine);
    const tubes = family.map((route) => renderRouteTube(route, litRoutes.has(route.key))).join('');
    const lights = [...litSegments.values()].map(renderRouteLight).join('');
    return `${tubes}${lights}`;
}
/*
 * The flow-arrow markers that used to sit here are gone.
 *
 * They were placed by interpolating linearly between the two gate DOCKS -
 * a straight chord - while the channel itself is a long curve. On every
 * lateral route the arrow therefore landed nowhere near the line it was
 * supposed to annotate, scattering loose triangles across empty space. They
 * were decoration that actively fought the routing they sat on top of, so
 * they are removed rather than re-anchored: the lit tube already carries the
 * activation state on its own.
 */
function renderCenter(center, isDefined, isSuppressed) {
    const geometry = CENTER_GEOMETRY[center];
    const state = isSuppressed ? 'suppressed' : isDefined ? 'defined' : 'undefined';
    const classState = isDefined && !isSuppressed ? 'defined' : 'undefined';
    const bounds = `${geometry.bounds.x},${geometry.bounds.y},${geometry.bounds.width},${geometry.bounds.height}`;
    const fillId = `hd-fill-${state}`;
    /* data-center-id on the GROUP, not only on the body path, is what lets the
       stylesheet give this centre its own creamy tone: the glow and the base are
       siblings of the body, so a selector anchored on the body could never reach
       them. The tone is set once on the group and inherited by every layer. */
    return `<g class="human-design-bodygraph__center-group human-design-bodygraph__center-group--${state}" data-center-id="${center}" data-center-state="${state}">
    <path class="human-design-bodygraph__center-glow" d="${geometry.path}" />
    <path class="human-design-bodygraph__center-base" d="${geometry.path}" />
    <path class="human-design-bodygraph__center human-design-bodygraph__center--${classState}" data-center-id="${center}" data-center-bounds="${bounds}" data-center-state="${state}" d="${geometry.path}" fill="url(#${fillId})" />
    <path class="human-design-bodygraph__center-bloom" d="${geometry.path}" fill="url(#hd-bloom-${center})" />
    <path class="human-design-bodygraph__center-rim" d="${geometry.path}" />
  </g>`;
}
/**
 * The top plane: the gate numbers, and nothing else.
 *
 * The reference seats each number in a small dock rectangle, and this used to
 * draw that rectangle too. It reads as a row of grey chips sitting on top of
 * the centres, so it is dropped: only the numbers render.
 *
 * The dock GEOMETRY stays and is still load-bearing - GATE_DOCKS is what
 * positions every number, and assertReferenceSkeleton() proves each gate's
 * stem passes through its own dock. The rectangle is simply no longer painted.
 */
function renderGateLabels(center, isDefined, activatedGates) {
    return CENTER_GATE_LAYOUT[center].map(([gate, x, y]) => {
        const isActive = activatedGates.has(gate);
        return `<text class="human-design-bodygraph__gate${isActive ? ' human-design-bodygraph__gate--active' : ''}${isDefined ? ' human-design-bodygraph__gate--defined-center' : ''}" data-gate="${gate}" data-gate-center-id="${center}" x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle">${gate}</text>`;
    }).join('');
}
const WAVE_GEOMETRY = new Map();
const waveGeometryOf = (center) => {
    let wave = WAVE_GEOMETRY.get(center);
    if (!wave) {
        const outline = outlineWave(CENTER_GEOMETRY[center].path);
        const scale = 1 + HD_WAVE_TRAVEL_UNITS / ((outline.inradius + outline.reach) / 2);
        /* half the box, in graph units: the outline's reach after the growth, and a margin for the line */
        const half = outline.reach * scale + 4;
        const S = BODYGRAPH_SCENE_SCALE;
        const sceneX = BODYGRAPH_CANVAS_CENTER.x - BODYGRAPH_SCENE_PIVOT.x * S + outline.incenter[0] * S;
        const sceneY = BODYGRAPH_CANVAS_CENTER.y - BODYGRAPH_SCENE_PIVOT.y * S + outline.incenter[1] * S;
        const pct = (value, of) => `${round((value / of) * 100)}%`;
        wave = {
            style: `left:${pct(sceneX - half * S, BODYGRAPH_VIEWBOX_WIDTH)};top:${pct(sceneY - half * S, BODYGRAPH_VIEWBOX_HEIGHT)};width:${pct(2 * half * S, BODYGRAPH_VIEWBOX_WIDTH)};height:${pct(2 * half * S, BODYGRAPH_VIEWBOX_HEIGHT)};--hd-wave-scale:${scale.toFixed(3)}`,
            viewBox: `0 0 ${(2 * half).toFixed(2)} ${(2 * half).toFixed(2)}`,
            line: `${outline.polygon.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${(x - outline.incenter[0] + half).toFixed(2)} ${(y - outline.incenter[1] + half).toFixed(2)}`).join(' ')} Z`,
            scale,
        };
        WAVE_GEOMETRY.set(center, wave);
    }
    return wave;
};
const waveMarkup = (center, kind, rendererState) => {
    const wave = waveGeometryOf(center);
    return `<svg class="hd-wave hd-wave--${kind}" data-center-id="${center}" data-center-state="${rendererState}" viewBox="${wave.viewBox}" style="${wave.style}" aria-hidden="true" focusable="false"><path class="hd-wave-glow" fill="none" d="${wave.line}" /><path class="hd-wave-line" fill="none" d="${wave.line}" /></svg>`;
};
/** THE SONAR LAYER: for each centre an idle ring (the scan) and a tap ring (the answer to a touch), after the graph, over it, in a layer that takes no touch and is hidden from assistive technology. */
function renderWaveLayer(states) {
    return `<div class="hd-wave-layer" aria-hidden="true">${hdCenters.map((center) => waveMarkup(center.id, 'idle', states.get(center.id) ?? 'undefined')).join('')}${hdCenters.map((center) => waveMarkup(center.id, 'tap', states.get(center.id) ?? 'undefined')).join('')}</div>`;
}
/**
 * THE TOP PLANE OF ONE CENTRE: its gate numbers and its hit region, in one group. The group has no transform and no animation of its own; inside it:
 *   - the gate numbers, as before;
 *   - the hit region: the centre's outline with a transparent stroke on it that reaches a few units past the edge. It IS the control (a button, in the page's tab order, named for the centre and
 *     its state) and it carries the concept key the shared explanation sheet opens.
 */
function renderCenterTop(center, isDefined, activatedGates, rendererState) {
    const geometry = CENTER_GEOMETRY[center];
    const state = centerStateFromRenderer(rendererState);
    const label = hdCenters.find((entry) => entry.id === center)?.label ?? center;
    const stateWord = t(`chart.hd.centerState.${state}`);
    const aria = tf('chart.hd.centerAria', { center: label, state: stateWord });
    return `<g class="hd-top" data-center-id="${center}" data-center-state="${rendererState}">
    ${renderGateLabels(center, isDefined, activatedGates)}
    <path class="hd-center-hit" data-hd-center="${center}" data-concept="${hdCenterConceptKey(center, state)}" role="button" tabindex="0" aria-label="${escapeAttribute(aria)}" aria-haspopup="dialog" d="${geometry.path}" fill="transparent" stroke="transparent" stroke-width="${HD_HIT_PADDING * 2}" />
  </g>`;
}
/**
 * THE WHOLE PALETTE COMES FROM THE ACCENT THEME.
 *
 * There used to be twenty-seven gradients here - nine centres times three
 * states - each built in TypeScript from a hard-coded per-centre RGB triple.
 * That made the graph the one surface in the app that could not follow the
 * theme chosen in the vessel menu: the colours were baked into the markup at
 * render time, so a live theme switch could not reach them.
 *
 * Now there are three, one per state, and they carry no colour of their own.
 * Every stop is painted from --kt-accent-rgb / --kt-accent-soft-rgb through
 * styles.css (see the "theme bridge" block there), which is what
 * onboardingThemePlayground writes when a theme is picked. Switching theme
 * repaints the graph instantly, with no re-render.
 *
 * A centre is glass, built from the SAME recipe as the pillar capsules, layer
 * for layer: a frosted substrate (rgba(18,21,24,.36) under backdrop blur), the
 * capsule's 100deg accent sheen over it, its inset bloom from the top-left, its
 * rim at accent-soft .42, and its two outer glows. Before this the centres had
 * the sheen and rim but no substrate, which is why they read as wireframe next
 * to a capsule that reads as glass - there was nothing behind the outline.
 *
 * What still distinguishes a centre is its STATE, and with the body nearly
 * transparent that job now belongs almost entirely to the rim and the outline
 * glow: defined centres carry a bright rim and a real halo, undefined ones a
 * dim rim and almost none, suppressed ones graphite and none at all. That is
 * the data-bearing difference, and it survives every theme.
 */
function themeGradientDefs() {
    /* The capsule's own sheen: a 100deg linear pass, not a radial one. CSS 100deg
       points right and slightly down, which is (sin100, -cos100) = (0.985, 0.174)
       as an objectBoundingBox vector. */
    const sheen = (state) => `
    <linearGradient id="hd-fill-${state}" class="hd-fill hd-fill--${state}" x1="0" y1="0" x2="0.99" y2="0.17">
      <stop class="hd-stop hd-stop--near" offset="0%" />
      <stop class="hd-stop hd-stop--mid" offset="42%" />
      <stop class="hd-stop hd-stop--far" offset="100%" />
    </linearGradient>`;
    /* The capsule's inner light - "0 0 34px -6px rgba(accent-soft,.16) inset",
       a wide low-alpha bloom pushed in from the top-left so the light reads as
       sitting INSIDE the glass rather than as a second rim outside it. A
       box-shadow cannot be inset on an SVG path, so it is a radial instead. */
    /* ONE BLOOM PER CENTRE, not one shared bloom.
       A gradient sitting in <defs> resolves its custom properties against ITSELF,
       not against whichever element references it - so a single shared bloom can
       never pick up a per-centre tone through var(). Each centre gets its own
       gradient element instead, and the stylesheet sets --hd-centre-rgb on both
       the centre group and the matching hd-bloom--<id> class, so the two always
       agree. The geometry is identical to the shared one it replaces. */
    const bloom = (centre) => `
    <radialGradient id="hd-bloom-${centre}" class="hd-fill hd-fill--bloom hd-bloom--${centre}" cx="26%" cy="18%" r="86%">
      <stop class="hd-stop hd-stop--near" offset="0%" />
      <stop class="hd-stop hd-stop--far" offset="100%" />
    </radialGradient>`;
    return ['defined', 'undefined', 'suppressed'].map(sheen).join('')
        + hdCenters.map((centre) => bloom(centre.id)).join('');
}
/*
 * CENTRE OCCLUSION MASK - why document order alone is not enough.
 *
 * The centres are glass: every stop of hd-fill-<centre>-<state> is translucent
 * (0.68-0.94), plus a sheen over it. So although the centres are painted AFTER
 * the channels and therefore sit on top of them, the 18-unit channel tubes
 * underneath showed straight THROUGH the centre bodies - the veins visibly cut
 * across the geometry and the linework fought the centres for attention.
 *
 * Stacking cannot fix a transparency problem, so the back layer is masked
 * instead: white everywhere, black inside every centre outline, which means the
 * channel network is simply not painted where a centre stands. Each vein now
 * ends exactly at the centre it docks into. The centre's own 3.2-wide stroke is
 * drawn centred on that same outline, so it laps ~1.6 outward over the cut and
 * no seam can open up between the two.
 *
 * The mask deliberately uses the crisp geometry path, not the blurred
 * centre-glow, so the glow still reads as light spilling over the network.
 */
function renderCentreOcclusionMask() {
    const holes = hdCenters
        .map((center) => `<path d="${CENTER_GEOMETRY[center.id].path}" fill="#000" />`)
        .join('');
    return `<mask id="hd-centre-occlusion" maskUnits="userSpaceOnUse" x="-600" y="-600" width="2200" height="2600">
      <rect x="-600" y="-600" width="2200" height="2600" fill="#fff" />
      ${holes}
    </mask>`;
}
/*
 * The clip that gives the centres a REAL frosted pane.
 *
 * backdrop-filter is declared on the centre bodies, but it has never blurred
 * anything: an SVG shape does not establish a backdrop root, so the property
 * parses and is then ignored. Proven in the browser - a plain div with the same
 * declaration blurs the Earth behind it, the identical declaration on an SVG path
 * does nothing, and neither does it inside a foreignObject.
 *
 * So the blur is done by an HTML element, which does work, clipped to exactly
 * these shapes: the nine centre silhouettes AND the veins between them, so the
 * whole graph reads as one piece of frosted glass rather than frosted centres
 * floating on sharp wires. The veins take the blur only - they keep the accent
 * colour they already had, and none of the per-centre tones.
 *
 * objectBoundingBox units means the clip is expressed as fractions of the frosted
 * div's own box, which is the same box as the SVG. Each path is therefore mapped
 * scene-transform first, then divided by the viewBox - and both of those are
 * known here, so the whole thing is baked at render time with no runtime matrix
 * to keep in sync on resize.
 */
/* Half the width the veins are cased at (.human-design-bodygraph__channel is
   stroked 18 wide). The frost outline has to match the visible vein, not the
   narrower glass highlight running inside it. */
const VEIN_FROST_HALF_WIDTH = 9;
/**
 * One vein, as a closed outline instead of a stroked centreline.
 *
 * A clipPath ignores stroke entirely - only fill counts - so a stroked vein can
 * clip nothing. To let the frosted pane blur the Earth behind the veins as well
 * as behind the centres, each centreline is offset by half the casing width to
 * either side and closed into a ring.
 *
 * No miter correction is applied at the joins. Every turn across all 34 drawn
 * routes is at most 15 degrees, where the miter factor is 1/cos(7.5deg) =
 * 1.0086 - under a tenth of a unit on a 9-unit offset, and it sits beneath a
 * 22px blur. The ends are squared off half a width past the last vertex to
 * stand in for the round cap; both ends are inside a centre, which frosts
 * anyway, so the cap shape cannot show.
 */
function veinFrostOutline(points) {
    const pts = [];
    for (const point of points) {
        const last = pts[pts.length - 1];
        if (!last || Math.hypot(point.x - last.x, point.y - last.y) > 1e-6)
            pts.push(point);
    }
    if (pts.length < 2)
        return '';
    const dirs = pts.slice(1).map((point, index) => {
        const dx = point.x - pts[index].x;
        const dy = point.y - pts[index].y;
        const length = Math.hypot(dx, dy);
        return { x: dx / length, y: dy / length };
    });
    /* Segment normal at the two ends, the average of the two adjacent normals at
       every vertex in between. */
    const normals = pts.map((_, index) => {
        const before = dirs[index - 1];
        const after = dirs[index];
        const x = (before ? -before.y : 0) + (after ? -after.y : 0);
        const y = (before ? before.x : 0) + (after ? after.x : 0);
        const length = Math.hypot(x, y) || 1;
        return { x: x / length, y: y / length };
    });
    const half = VEIN_FROST_HALF_WIDTH;
    const head = dirs[0];
    const tail = dirs[dirs.length - 1];
    const start = { x: pts[0].x - head.x * half, y: pts[0].y - head.y * half };
    const end = {
        x: pts[pts.length - 1].x + tail.x * half,
        y: pts[pts.length - 1].y + tail.y * half,
    };
    const ring = [];
    const push = (base, normal, side) => {
        ring.push({ x: base.x + normal.x * half * side, y: base.y + normal.y * half * side });
    };
    push(start, normals[0], 1);
    pts.forEach((point, index) => push(point, normals[index], 1));
    push(end, normals[pts.length - 1], 1);
    push(end, normals[pts.length - 1], -1);
    for (let index = pts.length - 1; index >= 0; index -= 1)
        push(pts[index], normals[index], -1);
    push(start, normals[0], -1);
    return `M${ring.map((point) => `${round(point.x)},${round(point.y)}`).join('L')}Z`;
}
/* ------------------------------------------------------------------ *
 * THE GLASS BACKPLATE
 * ------------------------------------------------------------------ */
/* Clear space kept between the graph and the edge of the glass, in raw
   geometry units, on every side. Enough that no centre and no gate label ever
   touches the edge. */
const BACKPLATE_MARGIN = 40;
/* Corner rounding. Large enough to read as a soft-cornered panel, far short of
   the half-width that would turn the shape into a capsule. */
const BACKPLATE_CORNER = 54;
/* The plate is wider and taller than the SVG's own box, because after the
   scene transform the graph already reaches within ~21 units of the canvas
   top and a margin on top of that would fall outside the viewBox. The HTML
   layer is grown by these fractions and the clip is normalised against the
   grown box, so the plate can breathe past the graph without the framing of
   the graph itself moving at all. */
const BACKPLATE_PAD_X = 0.05;
const BACKPLATE_PAD_Y = 0.045;
/* The RIM's layer is grown further still. The rim was previously drawn inside
   the graph's own <svg>, and that is why its top and bottom edges were missing:
   after the scene transform the plate sits at y -20.9 and y 1020.9, outside a
   `0 0 800 1000` viewBox, and an svg clips to its viewport. So the rim now gets
   a viewport of its own that contains the whole plate AND the bloom that spills
   past it - a border cannot be partly drawn if nothing can cut it. */
const BACKPLATE_RIM_PAD_X = 0.09;
const BACKPLATE_RIM_PAD_Y = 0.08;
/**
 * A PLAIN ROUNDED RECTANGLE around the whole graph.
 *
 * This was a convex hull of the centres for one revision, on the idea that a
 * plate cut to the body's own silhouette would read as more considered. It did
 * not: the hull of a Head triangle above a wide Root produced a tapered,
 * teardrop contour that read as a shape in its own right and competed with the
 * graph it was supposed to sit behind. A rectangle recedes, which is the whole
 * job of a backplate.
 *
 * Sized from the union of every centre's bounds, so it is centred on the graph
 * by construction rather than by a tuned offset. The channels need no separate
 * treatment: they run between centres, so they are inside that union already,
 * and the margin covers the gate labels sitting on the centre edges.
 */
function backplateOutline() {
    const graph = unionBounds(hdCenters.map((center) => CENTER_GEOMETRY[center.id].bounds));
    const x0 = graph.x - BACKPLATE_MARGIN;
    const y0 = graph.y - BACKPLATE_MARGIN;
    const x1 = graph.x + graph.width + BACKPLATE_MARGIN;
    const y1 = graph.y + graph.height + BACKPLATE_MARGIN;
    /* Capped at half the shorter side so the corners can never meet and turn the
       rectangle into a capsule or an ellipse. */
    const radius = Math.min(BACKPLATE_CORNER, (x1 - x0) / 2, (y1 - y0) / 2);
    const r = round(radius);
    return `M${round(x0 + radius)},${round(y0)}`
        + `H${round(x1 - radius)}`
        + `A${r},${r} 0 0 1 ${round(x1)},${round(y0 + radius)}`
        + `V${round(y1 - radius)}`
        + `A${r},${r} 0 0 1 ${round(x1 - radius)},${round(y1)}`
        + `H${round(x0 + radius)}`
        + `A${r},${r} 0 0 1 ${round(x0)},${round(y1 - radius)}`
        + `V${round(y0 + radius)}`
        + `A${r},${r} 0 0 1 ${round(x0 + radius)},${round(y0)}`
        + 'Z';
}
const BACKPLATE_PATH = backplateOutline();
/*
 * The plate has to fit inside the layer that carries it, or its own clip cuts
 * the margin off - silently, and only on the side that overflowed. The
 * rectangle's edges are the extremes of the shape (the corner arcs only ever
 * pull inward), so checking them after the scene transform is sufficient.
 */
(function assertBackplateFits() {
    const scale = BODYGRAPH_SCENE_SCALE;
    const offsetX = BODYGRAPH_CANVAS_CENTER.x - BODYGRAPH_SCENE_PIVOT.x * scale;
    const offsetY = BODYGRAPH_CANVAS_CENTER.y - BODYGRAPH_SCENE_PIVOT.y * scale;
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (const center of hdCenters) {
        const bounds = CENTER_GEOMETRY[center.id].bounds;
        for (const x of [bounds.x - BACKPLATE_MARGIN, bounds.x + bounds.width + BACKPLATE_MARGIN]) {
            const placed = x * scale + offsetX;
            minX = Math.min(minX, placed);
            maxX = Math.max(maxX, placed);
        }
        for (const y of [bounds.y - BACKPLATE_MARGIN, bounds.y + bounds.height + BACKPLATE_MARGIN]) {
            const placed = y * scale + offsetY;
            minY = Math.min(minY, placed);
            maxY = Math.max(maxY, placed);
        }
    }
    const padX = BODYGRAPH_VIEWBOX_WIDTH * BACKPLATE_PAD_X;
    const padY = BODYGRAPH_VIEWBOX_HEIGHT * BACKPLATE_PAD_Y;
    const fits = minX >= -padX && minY >= -padY
        && maxX <= BODYGRAPH_VIEWBOX_WIDTH + padX
        && maxY <= BODYGRAPH_VIEWBOX_HEIGHT + padY;
    if (!fits) {
        throw new Error(`backplate ${round(minX)},${round(minY)} to ${round(maxX)},${round(maxY)} `
            + `does not fit the padded box -${round(padX)},-${round(padY)} to `
            + `${round(BODYGRAPH_VIEWBOX_WIDTH + padX)},${round(BODYGRAPH_VIEWBOX_HEIGHT + padY)} `
            + '- raise BACKPLATE_PAD_X / BACKPLATE_PAD_Y or lower BACKPLATE_MARGIN');
    }
})();
/**
 * THE RIM, IN A VIEWPORT THAT CANNOT CUT IT.
 *
 * Its own <svg>, sized and positioned to the rim padding, with the plate placed
 * inside it by the SAME transform chain the graph uses - so it still cannot
 * drift from the shape it frames, which was the reason it lived in the scene
 * group in the first place. The inline style is computed from the constants
 * above rather than written out in the stylesheet, so the layer's box and the
 * path's placement have exactly one source and cannot fall out of step.
 */
function renderBackplateRim() {
    const boxWidth = BODYGRAPH_VIEWBOX_WIDTH * (1 + 2 * BACKPLATE_RIM_PAD_X);
    const boxHeight = BODYGRAPH_VIEWBOX_HEIGHT * (1 + 2 * BACKPLATE_RIM_PAD_Y);
    const pad = `translate(${round(BODYGRAPH_VIEWBOX_WIDTH * BACKPLATE_RIM_PAD_X)} ${round(BODYGRAPH_VIEWBOX_HEIGHT * BACKPLATE_RIM_PAD_Y)})`;
    /* Rounded, or binary floating point writes height:115.99999999999999%. */
    const percent = (value) => `${round(value * 100)}%`;
    const style = `top:${percent(-BACKPLATE_RIM_PAD_Y)};left:${percent(-BACKPLATE_RIM_PAD_X)};`
        + `width:${percent(1 + 2 * BACKPLATE_RIM_PAD_X)};height:${percent(1 + 2 * BACKPLATE_RIM_PAD_Y)}`;
    return `<svg class="hd-backplate-rim-layer" style="${style}" viewBox="0 0 ${round(boxWidth)} ${round(boxHeight)}" `
        + `aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">`
        + `<path class="hd-backplate-rim" transform="${pad} ${BODYGRAPH_SCENE_TRANSFORM}" d="${BACKPLATE_PATH}" />`
        + `</svg>`;
}
/*
 * And the rim viewport must actually contain the plate, with room left for the
 * bloom. Without this the fix would be silent the moment a constant moved: the
 * border would simply go missing again on whichever side ran out of room.
 */
(function assertRimViewportClearsThePlate() {
    const scale = BODYGRAPH_SCENE_SCALE;
    const graph = unionBounds(hdCenters.map((center) => CENTER_GEOMETRY[center.id].bounds));
    const padX = BODYGRAPH_VIEWBOX_WIDTH * BACKPLATE_RIM_PAD_X;
    const padY = BODYGRAPH_VIEWBOX_HEIGHT * BACKPLATE_RIM_PAD_Y;
    /* The plate's edges, in the rim layer's own coordinates. */
    const left = padX + (graph.x - BACKPLATE_MARGIN) * scale
        + (BODYGRAPH_CANVAS_CENTER.x - BODYGRAPH_SCENE_PIVOT.x * scale);
    const right = padX + (graph.x + graph.width + BACKPLATE_MARGIN) * scale
        + (BODYGRAPH_CANVAS_CENTER.x - BODYGRAPH_SCENE_PIVOT.x * scale);
    const top = padY + (graph.y - BACKPLATE_MARGIN) * scale
        + (BODYGRAPH_CANVAS_CENTER.y - BODYGRAPH_SCENE_PIVOT.y * scale);
    const bottom = padY + (graph.y + graph.height + BACKPLATE_MARGIN) * scale
        + (BODYGRAPH_CANVAS_CENTER.y - BODYGRAPH_SCENE_PIVOT.y * scale);
    /* The widest drop-shadow is 22 CSS pixels. The graph renders at roughly half
       its geometry units, so the bloom needs about twice that in clearance. */
    const bloom = 46;
    const clearance = Math.min(left, top, BODYGRAPH_VIEWBOX_WIDTH * (1 + 2 * BACKPLATE_RIM_PAD_X) - right, BODYGRAPH_VIEWBOX_HEIGHT * (1 + 2 * BACKPLATE_RIM_PAD_Y) - bottom);
    if (clearance < bloom) {
        throw new Error(`the rim viewport leaves only ${round(clearance)} units around the plate, `
            + `less than the ${bloom} the bloom needs - raise BACKPLATE_RIM_PAD_X / `
            + 'BACKPLATE_RIM_PAD_Y');
    }
})();
/**
 * The same shape, expressed as fractions of the GROWN html layer's box, so the
 * clip lines up with no runtime measurement. Reads right to left: place the
 * graph with the scene transform, shift it by the padding, then divide by the
 * grown box.
 */
function renderBackplateClip() {
    const boxWidth = BODYGRAPH_VIEWBOX_WIDTH * (1 + 2 * BACKPLATE_PAD_X);
    const boxHeight = BODYGRAPH_VIEWBOX_HEIGHT * (1 + 2 * BACKPLATE_PAD_Y);
    const toBox = `scale(${(1 / boxWidth).toFixed(8)} ${(1 / boxHeight).toFixed(8)})`;
    const pad = `translate(${(BODYGRAPH_VIEWBOX_WIDTH * BACKPLATE_PAD_X).toFixed(4)} ${(BODYGRAPH_VIEWBOX_HEIGHT * BACKPLATE_PAD_Y).toFixed(4)})`;
    return `<clipPath id="hd-backplate-clip" clipPathUnits="objectBoundingBox">`
        + `<path transform="${toBox} ${pad} ${BODYGRAPH_SCENE_TRANSFORM}" d="${BACKPLATE_PATH}" />`
        + `</clipPath>`;
}
function renderCentreFrostClip() {
    const toBox = `scale(${(1 / BODYGRAPH_VIEWBOX_WIDTH).toFixed(8)} ${(1 / BODYGRAPH_VIEWBOX_HEIGHT).toFixed(8)})`;
    const shape = (d) => `<path transform="${toBox} ${BODYGRAPH_SCENE_TRANSFORM}" d="${d}" />`;
    const centres = hdCenters.map((center) => shape(CENTER_GEOMETRY[center.id].path)).join('');
    /* The veins frost as well. A clipPath unions its children, so the vein
       outlines simply join the centre silhouettes; where a vein docks into a
       centre the two overlap, which a union does not care about. */
    const veins = ROUTE_DRAWS
        .map((route) => veinFrostOutline(route.points))
        .filter((d) => d !== '')
        .map((d) => shape(d))
        .join('');
    return `<clipPath id="hd-centre-frost-clip" clipPathUnits="objectBoundingBox">${centres}${veins}</clipPath>`;
}
function renderDefs() {
    return `<defs>
    ${renderCentreOcclusionMask()}
    ${renderCentreFrostClip()}
    ${renderBackplateClip()}
    <linearGradient id="hd-circuit-gold" class="hd-fill hd-fill--circuit" x1="0" y1="0" x2="1" y2="1">
      <stop class="hd-stop hd-stop--near" offset="0%" />
      <stop class="hd-stop hd-stop--mid" offset="48%" />
      <stop class="hd-stop hd-stop--far" offset="100%" />
    </linearGradient>
    <filter id="hd-center-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="7" />
    </filter>
    <filter id="hd-tube-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="4" />
    </filter>
    <filter id="hd-spark-glow" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur" />
      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
    ${themeGradientDefs()}
  </defs>`;
}
/*
 * The atmosphere layer is gone: nothing is painted outside the graph geometry
 * any more.
 *
 * It used to lay down three things behind the graph - a full-canvas radial
 * wash, three concentric rings with twelve rays through them, and sixteen
 * drifting particles. Once the graph started taking its palette from the
 * accent theme, that wash became a large tinted halo filling the whole panel,
 * and the rings and particles became themed decoration sitting in empty space
 * around the body.
 *
 * Glow now only ever comes OFF the geometry: the centre bodies, the lit veins
 * and the activated gate numbers. Nothing behind them is painted at all, so
 * the graph sits directly on whatever surface hosts it.
 */
/*
 * THE TWO ACTIVATION PANELS.
 *
 * Design on the left, Personality on the right - the canonical order, and the
 * canonical meaning: Design is the unconscious side, calculated at the moment
 * roughly 88 degrees of solar arc before birth; Personality is the conscious
 * one, calculated at birth. Both come straight off the engine's own activation
 * arrays, in the order the engine produced them, so a row can only ever say
 * what was actually computed.
 *
 * Rendered even when a body is missing from the set rather than silently
 * shortening the column: a gap in the ephemeris should be visible, not tidied
 * away.
 */
function renderActivationPanel(side, activations) {
    /* The glyph carries the body's name in the narrow column, where the word
       itself does not fit - so it is the glyph that gets the accessible label,
       and the written name beside it is what is allowed to disappear. Every body
       the engine reports has a symbol; a missing one would leave the row headed
       by nothing, which is why the name is kept as a hidden span rather than
       dropped from the markup. */
    const rows = activations.map((entry) => `
      <li class="hd-activation-row">
        <span class="hd-activation-body">
          ${planetGlyph(entry.body, { title: bodyWord(entry.body), className: 'hd-activation-glyph' })}
          <span class="hd-activation-name">${escapeHtml(bodyWord(entry.body))}</span>
        </span>
        <span class="hd-activation-value">${entry.activation.gate}<span class="hd-activation-line">.${entry.activation.line}</span></span>
      </li>`).join('');
    const title = side === 'design' ? t('chart.hd.design') : t('chart.hd.personality');
    const sub = side === 'design' ? t('chart.hd.designSub') : t('chart.hd.personalitySub');
    return `<aside class="hd-activation-panel hd-activation-panel--${side}" aria-label="${escapeAttribute(`${title} — ${sub}`)}">
    <p class="hd-activation-title">${escapeHtml(title)}</p>
    <p class="hd-activation-sub">${escapeHtml(sub)}</p>
    <ul class="hd-activation-list">${rows}</ul>
  </aside>`;
}
export function renderHumanDesignBodygraph(data, options = {}) {
    const { humanDesign, mechanicsSuppressed } = data;
    /*
     * WITHOUT A BIRTH TIME THE GRAPH DRAWS THE WHOLE DAY (human-design/humanDesignEnvelope.ts).
     * A centre defined at every hour of the birth date is drawn defined, one open
     * at every hour open, and one that depends on the hour in the grey state the
     * graph uses for what is not settled. Channels and gates are lit only where
     * they hold all day. Nothing is drawn from the 12:00 reference chart alone.
     */
    const envelope = mechanicsSuppressed ? data.envelope ?? null : null;
    const settledCentre = (id) => Boolean(envelope?.centres[id]?.stable);
    const definedCenters = new Set(envelope
        ? hdCenters.map((center) => center.id).filter((id) => settledCentre(id) && envelope.centres[id].values[0] === 'defined')
        : mechanicsSuppressed ? [] : humanDesign.definedCenters);
    const definedChannelIds = new Set(envelope ? envelope.channels.always
        : mechanicsSuppressed ? [] : humanDesign.definedChannels.map((channel) => channel.id));
    const activatedGates = new Set(envelope ? envelope.gates.always : mechanicsSuppressed ? [] : humanDesign.activatedGates);
    const states = new Map();
    for (const channel of hdChannels)
        states.set(channel.id, channelState(channel, definedChannelIds, activatedGates));
    /* Straight from the engine's two activation sets - the conscious birth moment
       and the unconscious one 88 degrees of solar arc earlier. Nothing here is
       inferred: a gate is in a set or it is not. Without a birth time, only the
       gates an activation holds all day. */
    const allDay = (side) => (envelope?.activations ?? [])
        .filter((activation) => activation.side === side && activation.gates.length === 1)
        .map((activation) => activation.gates[0]);
    const tones = {
        conscious: new Set(envelope ? allDay('Personality') : mechanicsSuppressed ? [] : humanDesign.personalityActivations.map((a) => a.activation.gate)),
        unconscious: new Set(envelope ? allDay('Design') : mechanicsSuppressed ? [] : humanDesign.designActivations.map((a) => a.activation.gate)),
    };
    const lateralRoutes = renderFamily(false, states, tones);
    const spineRoutes = renderFamily(true, states, tones);
    const channelRecords = hdChannels
        .map((channel) => renderChannelRecord(channel, states.get(channel.id) ?? { status: 'inactive' }))
        .join('');
    const centers = hdCenters
        .map((center) => renderCenter(center.id, definedCenters.has(center.id), envelope ? !settledCentre(center.id) : mechanicsSuppressed))
        .join('');
    const rendererStates = new Map(hdCenters.map((center) => [
        center.id,
        (envelope ? !settledCentre(center.id) : mechanicsSuppressed) ? 'suppressed' : definedCenters.has(center.id) ? 'defined' : 'undefined',
    ]));
    const gates = hdCenters
        .map((center) => renderCenterTop(center.id, definedCenters.has(center.id), activatedGates, rendererStates.get(center.id) ?? 'undefined'))
        .join('');
    const svg = `<svg class="human-design-bodygraph" viewBox="0 0 ${BODYGRAPH_VIEWBOX_WIDTH} ${BODYGRAPH_VIEWBOX_HEIGHT}" data-graph-bounds="${GRAPH_VISUAL_BOUNDS.x},${GRAPH_VISUAL_BOUNDS.y},${GRAPH_VISUAL_BOUNDS.width},${GRAPH_VISUAL_BOUNDS.height}" data-channel-bounds="${CHANNEL_VISUAL_BOUNDS.x},${CHANNEL_VISUAL_BOUNDS.y},${CHANNEL_VISUAL_BOUNDS.width},${CHANNEL_VISUAL_BOUNDS.height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${t(envelope ? 'chart.hd.ariaEnvelope' : mechanicsSuppressed ? 'chart.hd.ariaSuppressed' : 'chart.hd.aria')}">
    ${renderDefs()}
    <g class="human-design-bodygraph__scene" transform="${BODYGRAPH_SCENE_TRANSFORM}">
      <g class="human-design-bodygraph__back-layer hd-channels-back" data-bodygraph-plane="back" mask="url(#hd-centre-occlusion)" opacity="${CHANNEL_UNDERLAY_OPACITY}">
        <g class="human-design-bodygraph__channel-layer human-design-bodygraph__channel-layer--lateral" data-channel-family="lateral">${lateralRoutes}</g>
        <g class="human-design-bodygraph__channel-layer human-design-bodygraph__channel-layer--spine" data-channel-family="spine">${spineRoutes}</g>
        <g class="human-design-bodygraph__channel-records">${channelRecords}</g>
      </g>
      <g class="human-design-bodygraph__front-layer hd-centres-front" data-bodygraph-plane="centres">
        <g class="human-design-bodygraph__center-layer">${centers}</g>
      </g>
      <g class="human-design-bodygraph__gate-plane hd-gates-top" data-bodygraph-plane="gates">
        <g class="human-design-bodygraph__gate-layer">${gates}</g>
      </g>
    </g>
  </svg>`;
    const footer = envelope
        ? `<div class="hd-bodygraph-notice">
        <span class="hd-bodygraph-notice-icon" aria-hidden="true">i</span>
        <div>
          <p class="hd-bodygraph-notice-label">${t('chart.hd.envelopeLabel')}</p>
          <p class="kt-time-fallback-note">${t('chart.hd.envelopeNote')}</p>
          <p class="hd-bodygraph-notice-cta">${t('chart.hd.envelopeCta')}</p>
        </div>
      </div>`
        : mechanicsSuppressed
            ? `<div class="hd-bodygraph-notice">
        <span class="hd-bodygraph-notice-icon" aria-hidden="true">i</span>
        <div>
          <p class="hd-bodygraph-notice-label">${t('chart.hd.suppressedLabel')}</p>
          <p class="kt-time-fallback-note">${t('time.unknownFallbackNotice')}</p>
          <p class="hd-bodygraph-notice-cta">${t('chart.hd.suppressedCta')}</p>
        </div>
      </div>`
            : `<p>${escapeHtml(tf('chart.hd.footer', {
                type: humanDesign.type,
                profile: humanDesign.profile ?? t('chart.unavailableValue'),
                count: humanDesign.definedCenters.length,
            }))}</p>`;
    /* The frosted pane sits UNDER the graph and is clipped to the centre shapes, so
       it blurs the Earth inside the centres and nowhere else. It has to be a real
       HTML element: backdrop-filter is inert on SVG content. The stage exists only
       to give the two a shared box, which is what makes the objectBoundingBox clip
       line up without any runtime measurement. */
    const stage = `<div class="hd-bodygraph-stage">
      <div class="hd-backplate" aria-hidden="true"></div>
      ${renderBackplateRim()}
      <div class="hd-centre-frost" aria-hidden="true"></div>
      ${svg}
      ${options.hero ? renderWaveLayer(rendererStates) : ''}
    </div>`;
    /*
     * THREE CARDS IN ONE DECK.
     *
     * The graph is the card in front and gets the room; the two activation
     * panels wait behind it, showing only an edge at each side. Tapping the deck
     * brings them forward - they close inward like a pair of doors and meet in
     * the middle - and tapping again sends them back out.
     *
     * The panels sat permanently either side before this, which cost the graph
     * most of its width on a phone for a reference table that is only wanted
     * some of the time.
     *
     * One button covers the whole deck rather than a control per card: the
     * gesture is "tap the card", the target should be the card, and this way the
     * interaction is a real button - focusable, and it says which state it is in
     * instead of leaving that to the animation.
     *
     * THE DOORS GET THEIR OWN WRAPPER, and it is the wrapper that clips rather
     * than the deck. The deck used to do both jobs, which meant the graph's rim
     * and its glow were clipped by the same box that hid the parked doors, and
     * the deck had to be padded out to keep the border whole. Separating them
     * lets the card fill its column exactly while the doors are still hidden
     * when they are parked.
     */
    /* The hero keeps the card's geometry whether or not there are activation cards behind it: a chart with no source data (an approximate or unknown birth time) has no doors to flip, so the deck is only the frame that places the stage - the same card, the same size, nothing to toggle. */
    const columns = mechanicsSuppressed
        ? (options.hero ? `<div class="hd-deck hd-deck--graph-only" data-hd-deck="graph">${stage}</div>` : stage)
        : `<div class="hd-deck" data-hd-deck="graph" aria-label="${escapeAttribute(t('chart.hd.activationsAria'))}">
      ${stage}
      <div class="hd-deck-doors" aria-hidden="false">
        ${renderActivationPanel('design', humanDesign.designActivations)}
        ${renderActivationPanel('personality', humanDesign.personalityActivations)}
      </div>
      <button type="button" class="hd-deck-toggle" data-hd-deck-toggle aria-expanded="false">
        <span class="hd-deck-toggle-label hd-deck-toggle-label--open">${escapeHtml(t('chart.hd.showActivations'))}</span>
        <span class="hd-deck-toggle-label hd-deck-toggle-label--close">${escapeHtml(t('chart.hd.showBodygraph'))}</span>
      </button>
    </div>
    <p class="hd-deck-hint">${escapeHtml(t('chart.hd.deckHint'))}</p>`;
    return `<section class="pillar-visual bodygraph-diagram${mechanicsSuppressed ? ' is-suppressed' : ' has-source-data'}" aria-label="${t(envelope ? 'chart.hd.ariaEnvelope' : mechanicsSuppressed ? 'chart.hd.ariaSuppressed' : 'chart.hd.aria')}">
    ${options.hero ? `<div class="hd-hero" data-hd-cue="on">${columns}${options.hero.cue}</div>` : columns}
    ${footer}
  </section>`;
}
