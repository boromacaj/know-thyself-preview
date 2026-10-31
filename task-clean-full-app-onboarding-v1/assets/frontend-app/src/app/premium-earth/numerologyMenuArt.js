import { NUM_CENTRE, NUM_GLOW_STROKE, NUM_RADIUS, NUM_SEQUENCE, NUM_STROKE, } from './numerologyMenuGeometry.js?v=f9ab0a6';
import { HD_VIEW_BOX } from './humanDesignMenuGeometry.js?v=f9ab0a6';
/*
 * THE NUMEROLOGY CARD'S ART - THE MARKUP. Geometry: numerologyMenuGeometry.ts. The clock: numerologyMenuTimeline.ts. Light and motion: numerologyMenuStyle.ts.
 *
 * One SVG, drawn back to front:
 *
 *   the ring       kt-num-ring       the Human Design card's window: a faint disc, a light under its outline, a flare and the outline
 *   18 numbers     kt-num-el-<i>     for each place in the loop (0 to 8 the first round, 9 to 17 the second): a group at the window's middle, and in it, in an inner group that puts the centre of its
 *                                    weight on the window's middle, the number WRITTEN: for each stroke of the pen (kt-num-pen-<strokes>-<k>) the light under it (kt-num-glow) and the line (kt-num-char), each
 *                                    a path of pathLength 1 with round ends and round corners, which the stylesheet draws by its dash offset, stroke after stroke
 *
 * With no animation at all (less motion) the base values are the finished picture: IX, written, in the window.
 *
 * Decoration: hidden from assistive technology; the pillar's own name is the control's.
 */
const [CX, CY] = NUM_CENTRE;
const fmt = (value) => String(+value.toFixed(3));
const ring = () => `<g class="kt-num-ring"><circle class="kt-num-tint-disc" cx="${CX}" cy="${CY}" r="${NUM_RADIUS}"/>`
    + `<circle class="kt-num-ring-glow" cx="${CX}" cy="${CY}" r="${NUM_RADIUS}"/><circle class="kt-num-flare" cx="${CX}" cy="${CY}" r="${NUM_RADIUS}"/>`
    + `<circle class="kt-num-ring-line" cx="${CX}" cy="${CY}" r="${NUM_RADIUS}"/></g>`;
/** The widths are given in the units of the inner group (scaled by the number's own scale), so that the line is NUM_STROKE wide in the window's units. Each stroke of the pen is a path of its own. */
const numeral = (index) => {
    const { strokes, scale, transform } = NUM_SEQUENCE[index];
    const paths = strokes.map((d, k) => {
        const pen = `kt-num-pen kt-num-pen-${strokes.length}-${k}`;
        return `<path class="kt-num-glow ${pen}" pathLength="1" stroke-width="${fmt(NUM_GLOW_STROKE / scale)}" d="${d}"/>`
            + `<path class="kt-num-char ${pen}" pathLength="1" stroke-width="${fmt(NUM_STROKE / scale)}" d="${d}"/>`;
    }).join('');
    return `<g class="kt-num-el kt-num-el-${index}" transform="translate(${CX} ${CY})"><g transform="${transform}">${paths}</g></g>`;
};
export function numerologyMenuArt() {
    return `<svg class="kt-num-svg" viewBox="${HD_VIEW_BOX}" fill="none" aria-hidden="true" focusable="false">${ring()}${NUM_SEQUENCE.map((_, i) => numeral(i)).join('')}</svg>`;
}
