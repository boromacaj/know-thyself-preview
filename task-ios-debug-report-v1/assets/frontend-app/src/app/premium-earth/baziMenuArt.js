import { BZ_CENTRE, BZ_ELEMENTS, BZ_GLOW_PEN_WIDTH, BZ_GLYPH_SCALE, BZ_PEN_WIDTH, BZ_RADIUS, } from './baziMenuGeometry.js?v=b5ef5ed';
import { HD_VIEW_BOX } from './humanDesignMenuGeometry.js?v=b5ef5ed';
/*
 * THE BAZI CARD'S ART - THE MARKUP. Geometry: baziMenuGeometry.ts. The clock: baziMenuTimeline.ts. Light and motion: baziMenuStyle.ts.
 *
 * One SVG, drawn back to front:
 *
 *   the ring       kt-bz-ring       the Human Design card's window: a faint disc, a light under its outline, a flare and the outline
 *   five elements  kt-bz-el-<i>     for each element (0 Wood ... 4 Water), in the order of the generating cycle: a group at the window's middle, and in it the character's outline twice - the light under it
 *                                   (kt-bz-glow) and the character (kt-bz-char) - each in a group that is MASKED by the strokes of the pen (kt-bz-mask-<i>, and a wider one for the light, kt-bz-glowmask-<i>: one
 *                                   path for each stroke, kt-bz-pen-<i>-<k>, in the order a character is written). The stylesheet draws each pen line by its dash offset, so the character appears as if
 *                                   written, stroke after stroke, with its light. The mask is the one use of a mask on the menu: it is what a pen is.
 *
 * With no animation at all (less motion) the base values are the finished picture: Earth, 土, written, in the window.
 *
 * Decoration: hidden from assistive technology; the pillar's own name is the control's.
 */
const [CX, CY] = BZ_CENTRE;
const ring = () => `<g class="kt-bz-ring"><circle class="kt-bz-tint-disc" cx="${CX}" cy="${CY}" r="${BZ_RADIUS}"/>`
    + `<circle class="kt-bz-ring-glow" cx="${CX}" cy="${CY}" r="${BZ_RADIUS}"/><circle class="kt-bz-flare" cx="${CX}" cy="${CY}" r="${BZ_RADIUS}"/>`
    + `<circle class="kt-bz-ring-line" cx="${CX}" cy="${CY}" r="${BZ_RADIUS}"/></g>`;
const element = (index) => {
    const { outline, pens } = BZ_ELEMENTS[index];
    const mask = (id, width) => `<mask id="${id}-${index}" maskUnits="userSpaceOnUse" x="-34" y="-34" width="68" height="68">`
        + pens.map((pen, k) => `<path class="kt-bz-pen kt-bz-pen-${index}-${k}" pathLength="1" stroke-width="${width}" d="${pen.d}"/>`).join('') + '</mask>';
    return `<g class="kt-bz-el kt-bz-el-${index}" transform="translate(${CX} ${CY}) scale(${BZ_GLYPH_SCALE})">${mask('kt-bz-mask', BZ_PEN_WIDTH)}${mask('kt-bz-glowmask', BZ_GLOW_PEN_WIDTH)}`
        + `<g mask="url(#kt-bz-glowmask-${index})"><path class="kt-bz-glow" d="${outline}"/></g><g mask="url(#kt-bz-mask-${index})"><path class="kt-bz-char" d="${outline}"/></g></g>`;
};
export function baziMenuArt() {
    return `<svg class="kt-bz-svg" viewBox="${HD_VIEW_BOX}" fill="none" aria-hidden="true" focusable="false">${ring()}${BZ_ELEMENTS.map((_, i) => element(i)).join('')}</svg>`;
}
