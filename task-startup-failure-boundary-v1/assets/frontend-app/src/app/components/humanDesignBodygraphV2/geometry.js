/**
 * Nine center shapes and bounds only - see this module's own responsibility
 * boundary in the directory's module comment (types.ts). Coordinates are
 * calibrated against the actual authoritative reference image
 * (scratch-v2-verification/reference-bodygraph-crop.png, a real supplied
 * file - not visual memory), not copied or derived from V1's locked
 * KNOW THYSELF geometry (CENTER_GEOMETRY / GRAPH_VISUAL_BOUNDS /
 * BODYGRAPH_SCENE_SCALE in humanDesignBodygraph.ts).
 *
 * Calibration history (snapshots preserved under scratch-v2-verification/):
 * - Pass 1 applied a single uniform horizontal scale-toward-centerline (0.80)
 *   to correct a measured overall width:height ratio error. Snapshot:
 *   pass-01-geometry.ts.
 * - Pass 2 mapped nine measured reference boxes through one shared linear fit
 *   but kept pass-1's shape *families* and scaled their proportions, which
 *   left every center individually undersized. Snapshot: pass-02-geometry.ts.
 * - Pass 3 (this file) measures each center INDIVIDUALLY and rebuilds its
 *   silhouette from that measurement. See reference-measurements-pass-03.json
 *   for the per-center raw pixel boxes and pass-02-derive-*.mjs style scripts
 *   for the transform.
 *
 * Pass-3 method and the two real shape corrections it found:
 * every center's bounding box was read off gridded pixel-zoom crops of its own
 * region (nearest-neighbour upscale 8-9x with a 5px/25px coordinate grid drawn
 * from the PNG's own decoded pixels). Those nine boxes were mapped onto this
 * 700x1000 viewBox through one shared linear fit (scale 2.2, derived from the
 * reference's own full extent: Spleen's left edge to Solar Plexus's right edge
 * horizontally, Head's apex to Root's bottom edge vertically). The shared fit
 * governs *placement* only - each center's width, height and silhouette come
 * from its own measurement, which is why this pass fixes the "everything is
 * proportionally too small" result that a global transform could not.
 *
 * Two corrections here are shape changes, not just size changes:
 * 1. Ajna is a rounded triangle with its apex pointing DOWN toward Throat -
 *    the same shape family as Head, inverted. Passes 1-2 modelled it as a
 *    5-vertex flat-top kite, which was simply wrong; the reference shows a
 *    clean 3-vertex triangle.
 * 2. Every center in this reference has visibly rounded corners, including
 *    the triangles and the G diamond. They are rendered here as real rounded
 *    paths (roundedPolygonPath below) rather than sharp polygons - per the
 *    pass-3 brief, silhouettes must not be reduced to generic sharp polygons
 *    merely to satisfy topology tests.
 *
 * Channel curvature is deliberately NOT calibrated in this pass (channels.ts
 * control points are untouched); only channel endpoints move, automatically,
 * because they are looked up from gates.ts at render time.
 */
export const V2_VIEWBOX = { width: 700, height: 1000 };
export const V2_CENTERLINE_X = 350;
/**
 * Rounded-corner polygon: walks each vertex, stops `radius` short of it along
 * both adjoining edges, and joins those two points with a quadratic curve
 * whose control point is the original sharp vertex. The radius is clamped per
 * corner to just under half the shorter adjoining edge, so narrow wedge tips
 * (Spleen/Solar Plexus, Ego) degrade gracefully to a tighter round instead of
 * producing a self-crossing path.
 */
function roundedPolygonPath(points, radius) {
    const count = points.length;
    const segments = [];
    for (let index = 0; index < count; index += 1) {
        const previous = points[(index - 1 + count) % count];
        const current = points[index];
        const next = points[(index + 1) % count];
        const inLength = distance(previous, current);
        const outLength = distance(current, next);
        const cornerRadius = Math.min(radius, inLength / 2 - 0.01, outLength / 2 - 0.01);
        const entry = pointAlong(current, previous, cornerRadius);
        const exit = pointAlong(current, next, cornerRadius);
        segments.push(index === 0 ? `M ${round(entry.x)} ${round(entry.y)}` : `L ${round(entry.x)} ${round(entry.y)}`);
        segments.push(`Q ${round(current.x)} ${round(current.y)} ${round(exit.x)} ${round(exit.y)}`);
    }
    segments.push('Z');
    return segments.join(' ');
}
function distance(a, b) {
    return Math.hypot(b.x - a.x, b.y - a.y);
}
function pointAlong(from, toward, length) {
    const span = distance(from, toward);
    if (span === 0)
        return { ...from };
    const ratio = length / span;
    return { x: from.x + (toward.x - from.x) * ratio, y: from.y + (toward.y - from.y) * ratio };
}
function round(value) {
    return Math.round(value * 100) / 100;
}
function roundedRectPath(bounds, radius) {
    const { x, y, width, height } = bounds;
    const r = Math.min(radius, width / 2, height / 2);
    return [
        `M ${x + r} ${y}`,
        `H ${x + width - r}`,
        `Q ${x + width} ${y} ${x + width} ${y + r}`,
        `V ${y + height - r}`,
        `Q ${x + width} ${y + height} ${x + width - r} ${y + height}`,
        `H ${x + r}`,
        `Q ${x} ${y + height} ${x} ${y + height - r}`,
        `V ${y + r}`,
        `Q ${x} ${y} ${x + r} ${y}`,
        'Z',
    ].join(' ');
}
function boundsOf(points) {
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const x = Math.min(...xs);
    const y = Math.min(...ys);
    return { x, y, width: Math.max(...xs) - x, height: Math.max(...ys) - y };
}
// Corner rounding, measured off the reference: the large square-ish centers
// carry a noticeably softer corner than the pointed shapes.
const SQUARE_RADIUS = 18;
const TRIANGLE_RADIUS = 14;
const DIAMOND_RADIUS = 16;
const WEDGE_RADIUS = 10;
// Head: rounded triangle, apex up. Measured 115.9 wide x 129.1 tall.
const HEAD_POINTS = [
    { x: 350, y: 40 },
    { x: 407.9, y: 169.1 },
    { x: 292.1, y: 169.1 },
];
// Ajna: rounded triangle, apex DOWN toward Throat (see module comment - this
// replaces passes 1-2's incorrect 5-vertex kite). Measured 109.4 x 109.4.
const AJNA_POINTS = [
    { x: 295.3, y: 184.4 },
    { x: 404.7, y: 184.4 },
    { x: 350, y: 293.8 },
];
const THROAT_BOUNDS = { x: 295.3, y: 346.3, width: 109.4, height: 111.6 };
const SACRAL_BOUNDS = { x: 292.1, y: 698.4, width: 115.9, height: 102.8 };
const ROOT_BOUNDS = { x: 295.3, y: 840.6, width: 109.4, height: 109.4 };
// G: rounded diamond. Measured 144.4 wide x 150.9 tall.
const G_POINTS = [
    { x: 350, y: 479.7 },
    { x: 422.2, y: 555.2 },
    { x: 350, y: 630.6 },
    { x: 277.8, y: 555.2 },
];
// Ego: rounded triangle to the right of G, apex pointing left toward G's right
// vertex. Measured 91.9 wide x 78.8 tall - substantially wider and shorter
// than pass-2's estimate.
const EGO_POINTS = [
    { x: 423.3, y: 621.9 },
    { x: 486.7, y: 578.1 },
    { x: 515.2, y: 656.9 },
];
// Spleen: long horizontal wedge, apex pointing right toward Sacral. Measured
// 113.3 wide x 119.9 tall, left edge far out at x=86 (passes 1-2 had this both
// too small and too close to the centerline). The vertical position here comes
// from a second, higher-magnification re-measurement: the pass-3 overlay
// showed both lateral wedges sitting ~18 units high, traced back to reading
// their top edge ~9 reference-px early on the first pass. Solar Plexus was
// measured independently and agreed with Spleen's mirror to within 1-2px, so
// it is defined as the exact mirror (x -> 700 - x) rather than carrying that
// measurement noise into a visibly asymmetric pair.
const SPLEEN_POINTS = [
    { x: 86, y: 685.7 },
    { x: 199.3, y: 745.1 },
    { x: 86, y: 805.6 },
];
const SOLAR_PLEXUS_POINTS = SPLEEN_POINTS.map((p) => ({ x: 700 - p.x, y: p.y }));
export const V2_CENTER_GEOMETRY = {
    head: { shape: 'triangle', points: HEAD_POINTS, bounds: boundsOf(HEAD_POINTS), path: roundedPolygonPath(HEAD_POINTS, TRIANGLE_RADIUS) },
    ajna: { shape: 'triangle', points: AJNA_POINTS, bounds: boundsOf(AJNA_POINTS), path: roundedPolygonPath(AJNA_POINTS, TRIANGLE_RADIUS) },
    throat: { shape: 'rounded-rect', points: [], bounds: THROAT_BOUNDS, path: roundedRectPath(THROAT_BOUNDS, SQUARE_RADIUS) },
    g: { shape: 'diamond', points: G_POINTS, bounds: boundsOf(G_POINTS), path: roundedPolygonPath(G_POINTS, DIAMOND_RADIUS) },
    ego: { shape: 'triangle', points: EGO_POINTS, bounds: boundsOf(EGO_POINTS), path: roundedPolygonPath(EGO_POINTS, WEDGE_RADIUS) },
    spleen: { shape: 'triangle', points: SPLEEN_POINTS, bounds: boundsOf(SPLEEN_POINTS), path: roundedPolygonPath(SPLEEN_POINTS, WEDGE_RADIUS) },
    solarPlexus: { shape: 'triangle', points: SOLAR_PLEXUS_POINTS, bounds: boundsOf(SOLAR_PLEXUS_POINTS), path: roundedPolygonPath(SOLAR_PLEXUS_POINTS, WEDGE_RADIUS) },
    sacral: { shape: 'rounded-rect', points: [], bounds: SACRAL_BOUNDS, path: roundedRectPath(SACRAL_BOUNDS, SQUARE_RADIUS) },
    root: { shape: 'rounded-rect', points: [], bounds: ROOT_BOUNDS, path: roundedRectPath(ROOT_BOUNDS, SQUARE_RADIUS) },
};
export function v2CenterAnchor(center) {
    const { bounds } = V2_CENTER_GEOMETRY[center];
    return { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 };
}
