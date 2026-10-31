import { bodygraphCenterPath, bodygraphChannelRoutes } from '../components/humanDesignBodygraph.js?v=d9f39e7';
import { HEART_GLOW_ALPHA } from './connectionsHeartGeometry.js?v=d9f39e7';
/*
 * THE HUMAN DESIGN CARD ON THE MAIN MENU - ITS GEOMETRY. A WINDOW ON THE BODYGRAPH, ONE CENTRE AT A TIME.
 *
 * One source of truth for the markup (humanDesignMenuArt.ts) and the motion (humanDesignMenuTimeline.ts, humanDesignMenuStyle.ts).
 *
 * THE PICTURE. The card is a tall slender pillar; its picture is a circle on the card's geometric middle, and in the circle, one after another, the nine energy centres - Head, Ajna, Throat, G, Heart
 * (Ego), Spleen, Solar Plexus, Sacral, Root - each at the geometric middle of the circle (its silhouette's centroid, not the middle of its box), small enough that no corner comes near the ring (HD_FIT), and with the channels that leave it.
 *
 * NOTHING HERE IS DRAWN BY THE CARD: the silhouettes and the channels are the Human Design page's own - humanDesignBodygraph.ts's centre paths and channel routes (bodygraphCenterPath,
 * bodygraphChannelRoutes), read as they are, moved and scaled (one scale for a centre, its channels and the window) so that the centre's farthest corner is HD_FIT of the circle's radius from its middle. What is shown of a
 * centre's channels is exactly the part of each of its own channels (and nothing of any other) that lies in the circle: each starts where it leaves the centre's silhouette, follows its real route,
 * and runs to the circle's edge; a channel that ends inside the window (at the neighbouring centre, which the window does not show) goes straight on, in its last direction, to the edge.
 *
 * THE VIEWBOX is 100 x 390 - the proportion of the pillar card (1 : 3.9) - SEEN THROUGH A ZOOM (HD_VIEW_ZOOM, below): the card shows the middle 75 x 292.5 of it, so that everything in the picture is drawn a third
 * larger and the window, 66 units across, fills the card to HALF the gap it used to leave: at the 412 px phone the window is about 73 px across in a card 91 px wide (it was 55 px). The four window cards
 * (Human Design, BaZi, Numerology, Astrology) all take their viewBox from here, so they stay the same size as one another.
 */
export const HD_VIEW_WIDTH = 100;
export const HD_VIEW_HEIGHT = 390;
export const HD_CENTRE = [50, 195];
/**
 * THE ZOOM: the window used to stand a gap away from the card's edge on each side (17 units + the card's padding, about 18 px at the phone); it is enlarged by HALF that gap each side, which at this
 * card's proportions is a factor of 4/3 (the window's 66 units become 88 in the old measure). The viewBox is the old one's middle 1 / zoom, on the same centre, so the picture stays centred in the card.
 */
export const HD_VIEW_ZOOM = 4 / 3;
const trim = (value) => String(+value.toFixed(3));
export const HD_VIEW_BOX = `${trim(HD_CENTRE[0] - HD_VIEW_WIDTH / HD_VIEW_ZOOM / 2)} ${trim(HD_CENTRE[1] - HD_VIEW_HEIGHT / HD_VIEW_ZOOM / 2)} ${trim(HD_VIEW_WIDTH / HD_VIEW_ZOOM)} ${trim(HD_VIEW_HEIGHT / HD_VIEW_ZOOM)}`;
/** How many units of the picture run across the card's art width (one unit is the art's width over this). */
export const HD_VIEW_UNITS_ACROSS = HD_VIEW_WIDTH / HD_VIEW_ZOOM;
/** The window's radius (the lines reach it; the ring is drawn on it). */
export const HD_RADIUS = 33;
/**
 * HOW LARGE A CENTRE IS DRAWN: the FARTHEST point of its silhouette from the window's middle (the centroid), its line's half width included, is this share of the window's radius. It is measured from the
 * middle and not from the box, because a square (Throat, Sacral, Root, the G diamond) has its corners much farther from the middle than a triangle has: sized by its longer side a corner came to the ring.
 * What is left between the farthest corner and the ring is a quarter of the radius.
 */
export const HD_FIT = 0.72;
/**
 * THE LINE WEIGHT OF THE WINDOW CARDS, the same as the cards below them (Synthesis, Tarot, Connections, Forecast): at the 412 px phone their lines are 2.6 px thick (2.36 to 2.6) and the light under them 7.8 px.
 * The window cards' unit is 83 / 75 = 1.107 px there, so a line is 2.35 units and its light 7.05. One pair of numbers for every line of the four window cards (the rings, the Human Design outlines and channels,
 * the Numerology numbers, the Astrology circle), so that the eight cards speak one visual language; the BaZi characters are glyphs, not lines, and keep the typeface's own thick and thin.
 */
export const WINDOW_LINE_WIDTH = 2.35;
export const WINDOW_LIGHT_WIDTH = 7.05;
/** THE LIGHT: the Connections heart's colours (connectionsHeartStyle.ts); the centre's outline bright, its channels quieter. Widths in this box's units. */
export const HD_SHAPE_WIDTH = WINDOW_LINE_WIDTH;
export const HD_SHAPE_GLOW_WIDTH = WINDOW_LIGHT_WIDTH;
export const HD_SHAPE_ALPHA = 0.96;
export const HD_GLOW_ALPHA = HEART_GLOW_ALPHA;
export const HD_TINT_ALPHA = 0.1;
export const HD_CHANNEL_WIDTH = WINDOW_LINE_WIDTH;
export const HD_CHANNEL_GLOW_WIDTH = WINDOW_LIGHT_WIDTH;
export const HD_CHANNEL_ALPHA = 0.58;
export const HD_CHANNEL_GLOW_ALPHA = 0.16;
export const HD_RING_WIDTH = WINDOW_LINE_WIDTH;
export const HD_RING_ALPHA = 0.9;
export const HD_RING_GLOW_WIDTH = WINDOW_LIGHT_WIDTH;
export const HD_RING_GLOW_ALPHA = 0.26;
export const HD_FLARE_WIDTH = 8.6;
export const HD_FLARE_ALPHA = 0.5;
export const HD_TINT_FILL_ALPHA = 0.04;
/** The nine centres in the order the card shows them. */
export const HD_ORDER = Object.freeze(['head', 'ajna', 'throat', 'g', 'ego', 'spleen', 'solarPlexus', 'sacral', 'root']);
const lerp = (a, b, t) => a + (b - a) * t;
const lerpPoint = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
const fmt = (value) => String(+value.toFixed(2));
/** A path of M, L, C and Z commands as its pieces, one list for each subpath. */
function parsePath(d) {
    const subpaths = [];
    let current = [];
    let at = [0, 0];
    let start = [0, 0];
    for (const match of d.matchAll(/([MLCZ])([^MLCZ]*)/g)) {
        const command = match[1];
        const n = (match[2].match(/-?\d+(?:\.\d+)?(?:e-?\d+)?/g) ?? []).map(Number);
        if (command === 'M') {
            if (current.length > 0)
                subpaths.push(current);
            current = [];
            at = [n[0], n[1]];
            start = at;
        }
        else if (command === 'L') {
            for (let i = 0; i < n.length; i += 2) {
                const to = [n[i], n[i + 1]];
                current.push({ c1: null, c2: null, from: at, to });
                at = to;
            }
        }
        else if (command === 'C') {
            for (let i = 0; i < n.length; i += 6) {
                const to = [n[i + 4], n[i + 5]];
                current.push({ c1: [n[i], n[i + 1]], c2: [n[i + 2], n[i + 3]], from: at, to });
                at = to;
            }
        }
        else if (command === 'Z' && (at[0] !== start[0] || at[1] !== start[1])) {
            current.push({ c1: null, c2: null, from: at, to: start });
            at = start;
        }
    }
    if (current.length > 0)
        subpaths.push(current);
    return subpaths;
}
function pointAt(segment, t) {
    if (segment.c1 === null || segment.c2 === null)
        return lerpPoint(segment.from, segment.to, t);
    const m = 1 - t;
    return [
        m ** 3 * segment.from[0] + 3 * m * m * t * segment.c1[0] + 3 * m * t * t * segment.c2[0] + t ** 3 * segment.to[0],
        m ** 3 * segment.from[1] + 3 * m * m * t * segment.c1[1] + 3 * m * t * t * segment.c2[1] + t ** 3 * segment.to[1],
    ];
}
/** A piece cut at t: the part before it and the part after (de Casteljau for a cubic). */
function split(segment, t) {
    if (segment.c1 === null || segment.c2 === null) {
        const mid = lerpPoint(segment.from, segment.to, t);
        return [{ c1: null, c2: null, from: segment.from, to: mid }, { c1: null, c2: null, from: mid, to: segment.to }];
    }
    const a = lerpPoint(segment.from, segment.c1, t);
    const b = lerpPoint(segment.c1, segment.c2, t);
    const c = lerpPoint(segment.c2, segment.to, t);
    const ab = lerpPoint(a, b, t);
    const bc = lerpPoint(b, c, t);
    const mid = lerpPoint(ab, bc, t);
    return [{ c1: a, c2: ab, from: segment.from, to: mid }, { c1: bc, c2: c, from: mid, to: segment.to }];
}
const reversed = (segments) => segments.slice().reverse().map((s) => ({ c1: s.c2, c2: s.c1, from: s.to, to: s.from }));
const mapPoint = (point, map) => map(point);
const mapSegments = (segments, map) => segments.map((s) => ({
    c1: s.c1 === null ? null : mapPoint(s.c1, map), c2: s.c2 === null ? null : mapPoint(s.c2, map), from: mapPoint(s.from, map), to: mapPoint(s.to, map),
}));
function toPathData(segments, closed = false) {
    if (segments.length === 0)
        return '';
    const p = (point) => `${fmt(point[0])} ${fmt(point[1])}`;
    return `M${p(segments[0].from)}${segments.map((s) => (s.c1 === null || s.c2 === null ? `L${p(s.to)}` : `C${p(s.c1)} ${p(s.c2)} ${p(s.to)}`)).join('')}${closed ? 'Z' : ''}`;
}
/** The points round a silhouette, many to each piece. */
function outline(segments, perSegment = 24) {
    const points = [];
    for (const segment of segments)
        for (let i = 0; i < perSegment; i += 1)
            points.push(pointAt(segment, i / perSegment));
    return points;
}
/** The centroid of a polygon, and its box. */
function measure(points) {
    let area = 0;
    let gx = 0;
    let gy = 0;
    for (let i = 0; i < points.length; i += 1) {
        const p = points[i];
        const q = points[(i + 1) % points.length];
        const cross = p[0] * q[1] - q[0] * p[1];
        area += cross;
        gx += (p[0] + q[0]) * cross;
        gy += (p[1] + q[1]) * cross;
    }
    const xs = points.map((p) => p[0]);
    const ys = points.map((p) => p[1]);
    return { centroid: [gx / (3 * area), gy / (3 * area)], width: Math.max(...xs) - Math.min(...xs), height: Math.max(...ys) - Math.min(...ys) };
}
function inside(polygon, point) {
    let c = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        if ((yi > point[1]) !== (yj > point[1]) && point[0] < ((xj - xi) * (point[1] - yi)) / (yj - yi) + xi)
            c = !c;
    }
    return c;
}
/**
 * A channel's own line in the window: from where it leaves the silhouette, along its real route, to the circle's edge (cut there), or - if it ends inside the circle - straight on from its end, in
 * its last direction, to the edge. `route` is its subpath that belongs to this centre, oriented to start at the centre. All in window units.
 */
function channelLine(route, polygon, centre, radius) {
    const out = (p) => Math.hypot(p[0] - centre[0], p[1] - centre[1]) >= radius;
    const kept = [];
    let left = false;
    for (const segment of route) {
        let piece = segment;
        if (!left) {
            /* still in the silhouette: find where this piece comes out of it, if it does */
            const steps = 40;
            let exit = -1;
            for (let i = 0; i <= steps; i += 1)
                if (!inside(polygon, pointAt(piece, i / steps))) {
                    exit = i;
                    break;
                }
            if (exit < 0)
                continue;
            let lo = exit === 0 ? 0 : (exit - 1) / steps;
            let hi = exit / steps;
            for (let i = 0; i < 24; i += 1) {
                const mid = (lo + hi) / 2;
                if (inside(polygon, pointAt(piece, mid)))
                    lo = mid;
                else
                    hi = mid;
            }
            /* start a little inside, so the line meets the outline's own stroke */
            piece = split(piece, Math.max(0, lo - 0.012))[1];
            left = true;
        }
        const steps = 40;
        let exit = -1;
        for (let i = 1; i <= steps; i += 1)
            if (out(pointAt(piece, i / steps))) {
                exit = i;
                break;
            }
        if (exit < 0) {
            kept.push(piece);
            continue;
        }
        let lo = (exit - 1) / steps;
        let hi = exit / steps;
        for (let i = 0; i < 24; i += 1) {
            const mid = (lo + hi) / 2;
            if (out(pointAt(piece, mid)))
                hi = mid;
            else
                lo = mid;
        }
        kept.push(split(piece, hi)[0]);
        return kept;
    }
    if (kept.length === 0)
        return kept;
    /* it ends inside the circle: carry it on, straight, in the direction it ends */
    const last = kept[kept.length - 1];
    const end = last.to;
    const before = last.c2 !== null && (last.c2[0] !== end[0] || last.c2[1] !== end[1]) ? last.c2 : pointAt(last, 0.9);
    let dx = end[0] - before[0];
    let dy = end[1] - before[1];
    const length = Math.hypot(dx, dy) || 1;
    dx /= length;
    dy /= length;
    const ox = end[0] - centre[0];
    const oy = end[1] - centre[1];
    const b = ox * dx + oy * dy;
    const c = ox * ox + oy * oy - radius * radius;
    const reach = -b + Math.sqrt(Math.max(0, b * b - c));
    kept.push({ c1: null, c2: null, from: end, to: [end[0] + dx * reach, end[1] + dy * reach] });
    return kept;
}
/** One centre in the window: the graph's own silhouette and its channels, moved so that the silhouette's centroid is the window's middle, at the scale at which it fills the window. */
export function centreWindow(id) {
    const shapeSegments = parsePath(bodygraphCenterPath(id))[0];
    const points = outline(shapeSegments);
    const box = measure(points);
    const farthest = Math.max(...points.map((p) => Math.hypot(p[0] - box.centroid[0], p[1] - box.centroid[1])));
    const scale = (HD_FIT * HD_RADIUS - HD_SHAPE_WIDTH / 2) / farthest;
    const sourceRadius = HD_RADIUS / scale;
    const map = (p) => [HD_CENTRE[0] + (p[0] - box.centroid[0]) * scale, HD_CENTRE[1] + (p[1] - box.centroid[1]) * scale];
    const mappedShape = mapSegments(shapeSegments, map);
    const polygon = outline(mappedShape, 32);
    const channels = [];
    for (const route of bodygraphChannelRoutes()) {
        if (!route.centers.includes(id))
            continue;
        /* the subpath that belongs to this centre: the one with an end nearest the centre's middle, oriented to start there */
        let best = null;
        let bestDistance = Infinity;
        for (const subpath of parsePath(route.path)) {
            const mapped = mapSegments(subpath, map);
            for (const oriented of [mapped, reversed(mapped)]) {
                const d = Math.hypot(oriented[0].from[0] - HD_CENTRE[0], oriented[0].from[1] - HD_CENTRE[1]);
                if (d < bestDistance) {
                    bestDistance = d;
                    best = oriented;
                }
            }
        }
        if (best === null)
            continue;
        const line = channelLine(best, polygon, HD_CENTRE, HD_RADIUS);
        if (line.length > 0)
            channels.push({ id: route.id, path: toPathData(line) });
    }
    const mappedBox = outline(mappedShape);
    const xs = mappedBox.map((p) => p[0]);
    const ys = mappedBox.map((p) => p[1]);
    const boxMiddle = [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2];
    return { id, shape: toPathData(mappedShape, true), channels, centroid: measure(mappedBox).centroid, boxMiddle, scale, sourceRadius };
}
export const HD_WINDOWS = Object.freeze(HD_ORDER.map(centreWindow));
