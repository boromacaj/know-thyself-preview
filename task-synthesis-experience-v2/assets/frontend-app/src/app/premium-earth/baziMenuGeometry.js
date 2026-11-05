import { BAZI_GLYPHS, BAZI_GLYPH_RADIUS, BAZI_PENS } from './baziMenuGlyphs.js?v=53c0693';
import { HEART_GLOW_ALPHA } from './connectionsHeartGeometry.js?v=53c0693';
import { HD_CENTRE, HD_FLARE_ALPHA, HD_FLARE_WIDTH, HD_RADIUS, HD_RING_ALPHA, HD_RING_GLOW_ALPHA, HD_RING_GLOW_WIDTH, HD_RING_WIDTH, HD_TINT_FILL_ALPHA, HD_VIEW_HEIGHT, HD_VIEW_WIDTH, WINDOW_LIGHT_WIDTH, } from './humanDesignMenuGeometry.js?v=53c0693';
/*
 * THE BAZI CARD ON THE MAIN MENU - ITS GEOMETRY. THE FIVE ELEMENTS AS THEIR CHINESE CHARACTERS, ONE AT A TIME, IN A WINDOW.
 *
 * One source of truth for the markup (baziMenuArt.ts) and the motion (baziMenuTimeline.ts, baziMenuStyle.ts).
 *
 * THE PICTURE. The card is a tall slender pillar; its picture is the same circular window as the Human Design card's (humanDesignMenuGeometry.ts: the same circle, on the same middle, in the same
 * light), and in it, one after another, the five elements of BaZi and Chinese medicine, each as its Chinese character - Wood 木, Fire 火, Earth 土, Metal 金, Water 水, in the order in which each
 * gives rise to the next - at the geometric middle of the window, in a line of light, WRITTEN as with a pen: stroke after stroke, in the order a character is written. No pictograms: the characters are the elements' own signs. (Air, which the Western four have and BaZi
 * does not, is not among them.) The characters are OUTLINES (baziMenuGlyphs.ts: a regular Song hand, the strokes tapering as a written character's do, each centred on the centre of its weight, as the Human Design centres are),
 * so they look the same on every device.
 *
 * THE VIEWBOX is the Human Design card's: 100 x 390, the pillar's proportion; at the 412 px phone a unit is 0.85 px and the window about 56 px across.
 */
export const BZ_VIEW_WIDTH = HD_VIEW_WIDTH;
export const BZ_VIEW_HEIGHT = HD_VIEW_HEIGHT;
export const BZ_CENTRE = HD_CENTRE;
export const BZ_RADIUS = HD_RADIUS;
/**
 * HOW LARGE A CHARACTER IS DRAWN: the farthest point of the largest of the five is this share of the window's radius from its middle (the characters' own units put it at 29.5 of 33, a corner of 水 or 火
 * almost at the ring). One factor for all five, so that they keep their proportions to each other.
 */
export const BZ_FIT = 0.72;
export const BZ_GLYPH_SCALE = +((BZ_FIT * HD_RADIUS) / BAZI_GLYPH_RADIUS).toFixed(4);
/** The width of the pen that reveals a character, in the characters' own units (the thickest stroke, the stem of 木, is 4.4 wide), and of the wider pen that reveals its light (the light reaches 4.4 beyond the outline). */
export const BZ_PEN_WIDTH = 9;
export const BZ_GLOW_PEN_WIDTH = 15;
/** The five elements in the order of the generating cycle: wood feeds fire, fire makes earth, earth bears metal, metal gathers water, water nourishes wood. */
/** The length of a pen line (straight pieces and quadratic curves, flattened) in the characters' units. */
export function penLength(d) {
    let x = 0;
    let y = 0;
    let total = 0;
    for (const part of d.matchAll(/([MLQ])([^MLQ]*)/g)) {
        const n = (part[2].match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
        if (part[1] === 'M') {
            x = n[0];
            y = n[1];
        }
        else if (part[1] === 'L') {
            for (let i = 0; i < n.length; i += 2) {
                total += Math.hypot(n[i] - x, n[i + 1] - y);
                x = n[i];
                y = n[i + 1];
            }
        }
        else {
            for (let i = 0; i < n.length; i += 4) {
                let px = x;
                let py = y;
                for (let k = 1; k <= 16; k += 1) {
                    const t = k / 16;
                    const u = 1 - t;
                    const qx = u * u * x + 2 * u * t * n[i] + t * t * n[i + 2];
                    const qy = u * u * y + 2 * u * t * n[i + 1] + t * t * n[i + 3];
                    total += Math.hypot(qx - px, qy - py);
                    px = qx;
                    py = qy;
                }
                x = n[i + 2];
                y = n[i + 3];
            }
        }
    }
    return total;
}
const pensOf = (id) => Object.freeze(BAZI_PENS[id].map((d) => Object.freeze({ d, length: penLength(d) })));
/** Each element with its character's outline and the strokes of its pen, in the order they are written. */
export const BZ_ELEMENTS = Object.freeze([
    Object.freeze({ id: 'wood', character: '木', outline: BAZI_GLYPHS.wood, pens: pensOf('wood') }),
    Object.freeze({ id: 'fire', character: '火', outline: BAZI_GLYPHS.fire, pens: pensOf('fire') }),
    Object.freeze({ id: 'earth', character: '土', outline: BAZI_GLYPHS.earth, pens: pensOf('earth') }),
    Object.freeze({ id: 'metal', character: '金', outline: BAZI_GLYPHS.metal, pens: pensOf('metal') }),
    Object.freeze({ id: 'water', character: '水', outline: BAZI_GLYPHS.water, pens: pensOf('water') }),
]);
/** How far the farthest point of the largest of the five characters is from its centre (the window's radius is 33). */
export const BZ_GLYPH_RADIUS = BAZI_GLYPH_RADIUS;
/** THE LIGHT: the Human Design card's ring, and the Connections heart's colours for the character (a bright line with a light under it). */
export const BZ_CHAR_ALPHA = 0.96;
/** The character is its outline filled, with no stroke added: its strokes keep the thick and thin of the hand. */
export const BZ_GLOW_ALPHA = HEART_GLOW_ALPHA;
export const BZ_GLOW_STROKE = WINDOW_LIGHT_WIDTH;
export const BZ_RING_WIDTH = HD_RING_WIDTH;
export const BZ_RING_ALPHA = HD_RING_ALPHA;
export const BZ_RING_GLOW_WIDTH = HD_RING_GLOW_WIDTH;
export const BZ_RING_GLOW_ALPHA = HD_RING_GLOW_ALPHA;
export const BZ_FLARE_WIDTH = HD_FLARE_WIDTH;
export const BZ_FLARE_ALPHA = HD_FLARE_ALPHA;
export const BZ_TINT_FILL_ALPHA = HD_TINT_FILL_ALPHA;
