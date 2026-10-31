/*
 * THE CHIP TRACES BETWEEN THE FOUR PILLARS AND THE FOUR PILLARS OF THE SYNTHESIS CARD - THEIR GEOMETRY.
 *
 * One pure module (numbers in, numbers out; nothing here reads the page), used by the placement (synthesisTracePlacement.ts) that measures the menu and by the stylesheet module
 * (synthesisTraceStyle.ts) that turns the paths into the pulses' keyframes, and read by the tests.
 *
 * THE SHAPE. Each of the four little pillars in the Synthesis card sends one trace up to the short name of the big pillar above it, as the traces on a printed circuit go:
 *
 *      pad  o   <- the end under the name (a small round pad)
 *           |   <- straight up
 *            \  <- an angled run to the column of the name (a corner on each end, ROUNDED)
 *             | <- straight up from the little pillar, through the top edge of the card
 *           [ ]  <- the top of the little pillar
 *
 * The four little pillars stand close together in the middle of the card and the four names stand over the four columns, so the angled runs are long and shallow (the outer two longer
 * than the inner two). They do not cross: the outer trace turns LOWER than the inner one on its side, and runs under it.
 *
 * COORDINATES. x is from the left edge of the menu's core (the box of the four pillars, the bridge and the Synthesis card); y is from the TOP OF THE BRIDGE (the foot of the pillars).
 */
/** The bridge: a pillar's name stands in its top 26 px, and the traces' room is the rest; the Synthesis card starts under it. The bridge's height is this. */
export const SYN_TRACE_BRIDGE_HEIGHT = 73;
/** The centre of a pad, under a name: below the 10.5 px name that stands 7 px under the pillar's foot. */
export const SYN_TRACE_PAD_Y = 28;
/** Where the angled run turns, in px ABOVE the Synthesis card's top edge: the outer two traces turn lower and run longer, the inner two higher. */
export const SYN_TRACE_TURN_ABOVE_CARD = Object.freeze([9, 13, 13, 9]);
/** How far the angled run climbs while it crosses, in px: a long shallow run for the outer two, a shorter one for the inner two. */
export const SYN_TRACE_RISE = Object.freeze([20, 16, 16, 20]);
/** The radius of the rounded corners, in px. */
export const SYN_TRACE_CORNER = 9;
/** The pad's radius, in px. */
export const SYN_TRACE_PAD_RADIUS = 2.6;
const fmt = (value) => String(+value.toFixed(2));
/** A path through `corners` with each inner corner replaced by a quadratic arc of at most `radius` (never more than half of either side). Returns the SVG path and a dense polyline. */
export function roundedPath(corners, radius, samples = 10) {
    const polyline = [corners[0]];
    let d = `M${fmt(corners[0][0])} ${fmt(corners[0][1])}`;
    for (let index = 1; index < corners.length - 1; index += 1) {
        const [x0, y0] = corners[index - 1];
        const [x1, y1] = corners[index];
        const [x2, y2] = corners[index + 1];
        const a = Math.hypot(x1 - x0, y1 - y0);
        const b = Math.hypot(x2 - x1, y2 - y1);
        const ra = Math.min(radius, a / 2);
        const rb = Math.min(radius, b / 2);
        const start = [x1 - ((x1 - x0) / a) * ra, y1 - ((y1 - y0) / a) * ra];
        const end = [x1 + ((x2 - x1) / b) * rb, y1 + ((y2 - y1) / b) * rb];
        d += ` L${fmt(start[0])} ${fmt(start[1])} Q${fmt(x1)} ${fmt(y1)} ${fmt(end[0])} ${fmt(end[1])}`;
        polyline.push(start);
        for (let step = 1; step <= samples; step += 1) {
            const t = step / samples;
            const u = 1 - t;
            polyline.push([u * u * start[0] + 2 * u * t * x1 + t * t * end[0], u * u * start[1] + 2 * u * t * y1 + t * t * end[1]]);
        }
    }
    const last = corners[corners.length - 1];
    d += ` L${fmt(last[0])} ${fmt(last[1])}`;
    polyline.push(last);
    return { d, polyline };
}
const lengthOf = (polyline) => polyline.slice(1).reduce((sum, point, index) => sum + Math.hypot(point[0] - polyline[index][0], point[1] - polyline[index][1]), 0);
/** The four traces for a measured menu. Throws nothing: a layout that cannot hold the traces (the pillar's top above the turn) is the caller's to refuse (see `traceLayoutFits`). */
export function buildTraces(input) {
    return [0, 1, 2, 3].map((index) => {
        const turn = input.cardTop - SYN_TRACE_TURN_ABOVE_CARD[index];
        const corners = [
            [input.slots[index], input.pillarTop],
            [input.slots[index], turn],
            [input.columns[index], turn - SYN_TRACE_RISE[index]],
            [input.columns[index], SYN_TRACE_PAD_Y],
        ];
        const { d, polyline } = roundedPath(corners, SYN_TRACE_CORNER);
        return { corners, d, polyline, length: lengthOf(polyline), pad: [input.columns[index], SYN_TRACE_PAD_Y] };
    });
}
/** Whether a measured layout can hold the traces: the pillar's top is under the turn, the climb ends under the pad, and the four columns and four slots are in order. */
export function traceLayoutFits(input) {
    if (input.columns.length !== 4 || input.slots.length !== 4)
        return false;
    const numbers = [...input.columns, ...input.slots, input.pillarTop, input.cardTop];
    if (numbers.some((value) => !Number.isFinite(value)))
        return false;
    for (let index = 1; index < 4; index += 1)
        if (!(input.columns[index] > input.columns[index - 1]) || !(input.slots[index] > input.slots[index - 1]))
            return false;
    const lowestTurn = input.cardTop - Math.min(...SYN_TRACE_TURN_ABOVE_CARD);
    const highestEnd = input.cardTop - Math.max(...SYN_TRACE_TURN_ABOVE_CARD.map((above, index) => above + SYN_TRACE_RISE[index]));
    return input.pillarTop > lowestTurn && highestEnd > SYN_TRACE_PAD_Y + 4;
}
/** The point at `fraction` (0 at the little pillar, 1 at the pad) of a trace, by length along its polyline. */
export function pointAlong(trace, fraction) {
    const target = Math.min(1, Math.max(0, fraction)) * trace.length;
    let walked = 0;
    for (let index = 1; index < trace.polyline.length; index += 1) {
        const [x0, y0] = trace.polyline[index - 1];
        const [x1, y1] = trace.polyline[index];
        const segment = Math.hypot(x1 - x0, y1 - y0);
        if (walked + segment >= target || index === trace.polyline.length - 1) {
            const t = segment === 0 ? 0 : Math.min(1, Math.max(0, (target - walked) / segment));
            return [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t];
        }
        walked += segment;
    }
    return trace.polyline[trace.polyline.length - 1];
}
/** Whether two polylines cross (a proper intersection of any two of their segments). */
export function polylinesCross(a, b) {
    const orient = (p, q, r) => Math.sign((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]));
    for (let i = 1; i < a.length; i += 1) {
        for (let j = 1; j < b.length; j += 1) {
            const p1 = a[i - 1];
            const p2 = a[i];
            const p3 = b[j - 1];
            const p4 = b[j];
            const o1 = orient(p1, p2, p3);
            const o2 = orient(p1, p2, p4);
            const o3 = orient(p3, p4, p1);
            const o4 = orient(p3, p4, p2);
            if (o1 !== o2 && o3 !== o4 && o1 !== 0 && o2 !== 0 && o3 !== 0 && o4 !== 0)
                return true;
        }
    }
    return false;
}
