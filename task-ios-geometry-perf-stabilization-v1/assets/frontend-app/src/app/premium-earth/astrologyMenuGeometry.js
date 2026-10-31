import { HEART_GLOW_ALPHA } from './connectionsHeartGeometry.js?v=d9f39e7';
import { HD_CENTRE, HD_FLARE_ALPHA, HD_FLARE_WIDTH, HD_RADIUS, HD_RING_ALPHA, HD_RING_GLOW_ALPHA, HD_RING_GLOW_WIDTH, HD_RING_WIDTH, HD_TINT_FILL_ALPHA, HD_VIEW_HEIGHT, HD_VIEW_WIDTH, WINDOW_LINE_WIDTH, } from './humanDesignMenuGeometry.js?v=d9f39e7';
/*
 * THE ASTROLOGY CARD ON THE MAIN MENU - ITS GEOMETRY. THE PHASES OF THE MOON, GLIDING THROUGH A WINDOW.
 *
 * One source of truth for the markup (astrologyMenuArt.ts) and the motion (astrologyMenuTimeline.ts, astrologyMenuStyle.ts).
 *
 * THE PICTURE. The card is a tall slender pillar; its picture is the same circular window as the Human Design, BaZi and Numerology cards' (humanDesignMenuGeometry.ts: the same circle, on the same middle, in
 * the same light), and in it, one after another, at the middle, the eight phases of the Moon: new - waxing crescent - first quarter - waxing gibbous - FULL - waning gibbous - last quarter - waning
 * crescent, and round again, a month. A moon is DRAWN: first its circle, as if with a pen, and then the LIT PART of the phase is filled in - white with a soft light under it - inside the circle (so that the new
 * moon, which has no lit part, is a circle and nothing more). Then it is taken back and the next phase is drawn. Nothing comes in from the side: it appears where it stays, as in the other windows.
 *
 * THE VIEWBOX is the Human Design card's: 100 x 390, the pillar's proportion; at the 412 px phone a unit is 0.85 px and the window about 56 px across.
 */
export const ASTRO_VIEW_WIDTH = HD_VIEW_WIDTH;
export const ASTRO_VIEW_HEIGHT = HD_VIEW_HEIGHT;
export const ASTRO_CENTRE = HD_CENTRE;
export const ASTRO_RADIUS = HD_RADIUS;
/** Every moon's radius (the window's is 33): a little over half of it, so that the circle and its light stand well clear of the ring. */
export const ASTRO_MOON_R = 17.5;
/** The eight phases in the order of a month: the lit share of the moon (k, 0 new to 1 full) and the side it is lit on (the right while it waxes, the left while it wanes). */
export const ASTRO_PHASES = Object.freeze([
    Object.freeze({ id: 'new', k: 0, side: 'right' }),
    Object.freeze({ id: 'waxing-crescent', k: 0.25, side: 'right' }),
    Object.freeze({ id: 'first-quarter', k: 0.5, side: 'right' }),
    Object.freeze({ id: 'waxing-gibbous', k: 0.75, side: 'right' }),
    Object.freeze({ id: 'full', k: 1, side: 'right' }),
    Object.freeze({ id: 'waning-gibbous', k: 0.75, side: 'left' }),
    Object.freeze({ id: 'last-quarter', k: 0.5, side: 'left' }),
    Object.freeze({ id: 'waning-crescent', k: 0.25, side: 'left' }),
]);
/** THE LIGHT: the Human Design card's ring, and the Connections heart's colours for a moon (white lit part, a light under it, a faint outline). Widths in this box's units. */
export const ASTRO_RING_WIDTH = HD_RING_WIDTH;
export const ASTRO_RING_ALPHA = HD_RING_ALPHA;
export const ASTRO_RING_GLOW_WIDTH = HD_RING_GLOW_WIDTH;
export const ASTRO_RING_GLOW_ALPHA = HD_RING_GLOW_ALPHA;
export const ASTRO_FLARE_WIDTH = HD_FLARE_WIDTH;
export const ASTRO_FLARE_ALPHA = HD_FLARE_ALPHA;
export const ASTRO_TINT_FILL_ALPHA = HD_TINT_FILL_ALPHA;
export const ASTRO_MOON_RING_WIDTH = WINDOW_LINE_WIDTH;
export const ASTRO_MOON_RING_ALPHA = 0.7;
export const ASTRO_GLOW_WIDTH = 5.4;
export const ASTRO_GLOW_ALPHA = HEART_GLOW_ALPHA - 0.02;
export const ASTRO_LIT_ALPHA = 0.96;
const fmt = (value) => String(+value.toFixed(2));
/** The lit part of a moon at the origin, exact (a true half ellipse for the terminator), at the lit share `k` (0 new, 0.5 a quarter, 1 full) on `side`. Empty for a new moon. */
export function moonLitPathExact(r, k, side) {
    if (k <= 0.003)
        return '';
    if (k >= 0.997)
        return `M${-r} 0A${r} ${r} 0 1 1 ${r} 0A${r} ${r} 0 1 1 ${-r} 0Z`;
    const t = r * (1 - 2 * k);
    const rx = Math.max(0.01, Math.abs(t));
    const waxing = side === 'right';
    const sweepTerminator = t > 0 ? (waxing ? 0 : 1) : (waxing ? 1 : 0);
    return `M0 ${-r}A${r} ${r} 0 0 ${waxing ? 1 : 0} 0 ${r}A${fmt(rx)} ${r} 0 0 ${sweepTerminator} 0 ${-r}Z`;
}
