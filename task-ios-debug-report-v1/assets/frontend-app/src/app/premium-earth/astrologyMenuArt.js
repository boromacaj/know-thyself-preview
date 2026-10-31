import { ASTRO_CENTRE, ASTRO_GLOW_ALPHA, ASTRO_MOON_R, ASTRO_PHASES, ASTRO_RADIUS, moonLitPathExact, } from './astrologyMenuGeometry.js?v=b5ef5ed';
import { HD_VIEW_BOX } from './humanDesignMenuGeometry.js?v=b5ef5ed';
/*
 * THE ASTROLOGY CARD'S ART - THE MARKUP. Geometry: astrologyMenuGeometry.ts. The clock: astrologyMenuTimeline.ts. Light and motion: astrologyMenuStyle.ts.
 *
 * One SVG, drawn back to front:
 *
 *   the ring       kt-astro-ring       the Human Design card's window: a faint disc, a light under its outline, a flare and the outline
 *   eight moons    kt-astro-el-<i>     for each phase of the month (0 new ... 4 full ... 7 waning crescent): a group at the middle of the window, and in it the moon at the origin: its circle
 *                                      (kt-astro-moon-ring, a path of pathLength 1 which the stylesheet DRAWS by its dash offset, from the top, as with a pen) and, after it, its LIT PART in a group
 *                                      the stylesheet fades in (kt-astro-fill): the light under it (kt-astro-glow) and the white part (kt-astro-lit). The new moon has no lit part: only the circle.
 *
 * Every phase is a still shape (an exact half ellipse for the terminator), so the picture moves by the circle's dash offset and by opacity alone: no SMIL.
 * With no animation at all (less motion) the base values are the finished picture: the full Moon, circle and light, in the middle of the window.
 *
 * Decoration: hidden from assistive technology; the pillar's own name is the control's.
 */
const [CX, CY] = ASTRO_CENTRE;
const ring = () => `<g class="kt-astro-ring"><circle class="kt-astro-tint-disc" cx="${CX}" cy="${CY}" r="${ASTRO_RADIUS}"/>`
    + `<circle class="kt-astro-ring-glow" cx="${CX}" cy="${CY}" r="${ASTRO_RADIUS}"/><circle class="kt-astro-flare" cx="${CX}" cy="${CY}" r="${ASTRO_RADIUS}"/>`
    + `<circle class="kt-astro-ring-line" cx="${CX}" cy="${CY}" r="${ASTRO_RADIUS}"/></g>`;
function moon(index) {
    const { k, side } = ASTRO_PHASES[index];
    const d = moonLitPathExact(ASTRO_MOON_R, k, side);
    const lit = d === '' ? '' : `<path class="kt-astro-glow" stroke-opacity="${ASTRO_GLOW_ALPHA}" d="${d}"/><path class="kt-astro-lit" d="${d}"/>`;
    const fill = lit === '' ? '' : `<g class="kt-astro-fill">${lit}</g>`;
    return `<g class="kt-astro-el kt-astro-el-${index}" transform="translate(${CX} ${CY})"><circle class="kt-astro-moon-ring" r="${ASTRO_MOON_R}" pathLength="1" transform="rotate(-90)"/>${fill}</g>`;
}
export function astrologyMenuArt() {
    return `<svg class="kt-astro-svg" viewBox="${HD_VIEW_BOX}" fill="none" aria-hidden="true" focusable="false">${ring()}${ASTRO_PHASES.map((_, i) => moon(i)).join('')}</svg>`;
}
