/**
 * THE ORBITAL GAUGE: A GOLD CIRCLE FILLED FROM ITS SIX O'CLOCK POINT BY TWO ARCS THAT GROW TOGETHER.
 *
 * The circle is the progress indicator, so its geometry is exact rather than suggested. From a single origin at the bottom of the circle, two arcs rise at the same pace, one up the right side and one
 * up the left. The percentage is the fraction of the WHOLE circle the two arcs fill together, so each arc covers `value / 100` of a half circle (180 degrees):
 *
 *    0%   neither arc leaves the origin
 *   25%   each arc has covered 45 degrees: both end in the lower quadrants
 *   50%   each arc has covered 90 degrees: they stand at three o'clock and nine o'clock
 *   75%   each arc has covered 135 degrees: both are in the upper quadrants
 *  100%   each arc has covered 180 degrees: they meet at twelve o'clock and the circle is closed
 *
 * (Looking at the screen, the right-hand arc travels from the bottom to the right to the top, which is counterclockwise; the owner's note called it "clockwise around the right side". The geometry
 * above is what was asked for and what is drawn: two mirror-image arcs from one point.)
 *
 * The arcs are SVG elliptical-arc path commands computed from the circle, never a rotated element or a spinner, so the endpoints are exact at every value. Nothing here knows about a
 * relationship: it draws a number between 0 and 100 and says nothing about where the number came from.
 */
/** The circle in the dashboard's 400 x 400 drawing: centred, with room for the glow and the orbit decoration. */
export const GAUGE_CIRCLE = { cx: 200, cy: 200, r: 165 };
/** A value from 0 to 100, or null when there is none (missing, not a number, out of range is clamped). */
export function normaliseValue(value) {
    if (typeof value !== 'number' || !Number.isFinite(value))
        return null;
    return Math.max(0, Math.min(100, value));
}
/** How far, in degrees, each of the two arcs has travelled from the origin at this value: 0 at 0%, 180 at 100%. */
export const arcDegrees = (value) => (Math.max(0, Math.min(100, value)) / 100) * 180;
/** The point `degrees` from the six o'clock origin, going up the right side or the left side of the circle. */
export function gaugePoint(degrees, side, circle = GAUGE_CIRCLE) {
    const angle = (degrees * Math.PI) / 180;
    const sign = side === 'right' ? 1 : -1;
    return { x: circle.cx + sign * circle.r * Math.sin(angle), y: circle.cy + circle.r * Math.cos(angle) };
}
const fixed = (value) => value.toFixed(3);
/** The path of one arc from the origin to `degrees`: a single SVG arc command (a bare move to the origin at zero). */
export function arcPathData(degrees, side, circle = GAUGE_CIRCLE) {
    const start = gaugePoint(0, side, circle);
    const origin = `M${fixed(start.x)} ${fixed(start.y)}`;
    const covered = Math.max(0, Math.min(180, degrees));
    if (covered < 0.0005)
        return origin;
    const end = gaugePoint(covered, side, circle);
    /* from the bottom to the right is counterclockwise on the screen (sweep 0); from the bottom to the left is clockwise (sweep 1). An arc of at most 180 degrees is never the "large" one. */
    return `${origin}A${circle.r} ${circle.r} 0 0 ${side === 'right' ? 0 : 1} ${fixed(end.x)} ${fixed(end.y)}`;
}
/** The whole state of the gauge at a value: the two paths and their leading tips. Pure, so the same value always gives the same geometry. */
export function gaugeGeometry(value, circle = GAUGE_CIRCLE) {
    const degrees = arcDegrees(value);
    return {
        degrees,
        right: arcPathData(degrees, 'right', circle), left: arcPathData(degrees, 'left', circle),
        tipRight: gaugePoint(degrees, 'right', circle), tipLeft: gaugePoint(degrees, 'left', circle),
    };
}
