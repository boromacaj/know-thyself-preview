import { HEART_GLOW_ALPHA } from './connectionsHeartGeometry.js?v=2ea79e9';
import { HD_CENTRE, HD_FLARE_ALPHA, HD_FLARE_WIDTH, HD_RADIUS, HD_RING_ALPHA, HD_RING_GLOW_ALPHA, HD_RING_GLOW_WIDTH, HD_RING_WIDTH, HD_TINT_FILL_ALPHA, HD_VIEW_HEIGHT, HD_VIEW_WIDTH, WINDOW_LIGHT_WIDTH, WINDOW_LINE_WIDTH, } from './humanDesignMenuGeometry.js?v=2ea79e9';
/*
 * THE NUMEROLOGY CARD ON THE MAIN MENU - ITS GEOMETRY. THE NUMBERS 1 TO 9, ONE AT A TIME, IN A WINDOW, IN TWO ROUNDS.
 *
 * One source of truth for the markup (numerologyMenuArt.ts) and the motion (numerologyMenuTimeline.ts, numerologyMenuStyle.ts).
 *
 * THE PICTURE. The card is a tall slender pillar; its picture is the same circular window as the Human Design and BaZi cards' (humanDesignMenuGeometry.ts: the same circle, on the same middle, in the
 * same light), and in it, one after another, the numbers 1 to 9 - at the geometric middle of the window, as a thin line of light with round ends, nothing more: no serifs, no feet, no weight. Roman numerals are
 * only straight strokes (each is a stroke of the pen: the numbers are WRITTEN, one stroke after another): I is a rounded capsule, III is three of them, V is a plain V with rounded corners, X a plain cross (IX is a capsule and a cross, VII a V and two capsules). The Arabic numerals are
 * the same kind of line, gently curved.
 *
 * TWO ROUNDS. In the first round the odd numbers are Roman and the even ones Arabic (I, 2, III, 4, V, 6, VII, 8, IX); in the second the scripts change places (1, II, 3, IV, 5, VI, 7, VIII, 9), so every number
 * is seen both ways. Eighteen numbers, 63 seconds the loop.
 *
 * THE VIEWBOX is the Human Design card's: 100 x 390, the pillar's proportion; at the 412 px phone a unit is 0.85 px and the window about 56 px across.
 */
export const NUM_VIEW_WIDTH = HD_VIEW_WIDTH;
export const NUM_VIEW_HEIGHT = HD_VIEW_HEIGHT;
export const NUM_CENTRE = HD_CENTRE;
export const NUM_RADIUS = HD_RADIUS;
/** A number is drawn in a box 76 tall (y 14 to 90); this is how large that box is drawn: a number is about 33 units tall (the window is 66 across). A wide Roman number (VII, VIII) is drawn smaller, to fit. */
export const NUM_SCALE = 0.43;
/** How far from the middle of the window a line may reach (its width included): 0.72 of the window's radius, so that no corner of a number comes near the ring. */
export const NUM_REACH = +(NUM_RADIUS * 0.72).toFixed(2);
/** The line's width in the window's units, and the width of the light under it. */
export const NUM_STROKE = WINDOW_LINE_WIDTH;
export const NUM_GLOW_STROKE = WINDOW_LIGHT_WIDTH;
/** THE LIGHT: the Human Design card's ring, and the Connections heart's colours for the number (a bright line with a light under it). */
export const NUM_CHAR_ALPHA = 0.96;
export const NUM_GLOW_ALPHA = HEART_GLOW_ALPHA;
export const NUM_RING_WIDTH = HD_RING_WIDTH;
export const NUM_RING_ALPHA = HD_RING_ALPHA;
export const NUM_RING_GLOW_WIDTH = HD_RING_GLOW_WIDTH;
export const NUM_RING_GLOW_ALPHA = HD_RING_GLOW_ALPHA;
export const NUM_FLARE_WIDTH = HD_FLARE_WIDTH;
export const NUM_FLARE_ALPHA = HD_FLARE_ALPHA;
export const NUM_TINT_FILL_ALPHA = HD_TINT_FILL_ALPHA;
/** The numbers 1 to 9 in Arabic numerals as one line each, in a box whose letters run y 14 to 90 (the line is drawn with round ends and round corners). */
export const ARABIC_PATHS = Object.freeze({
    1: 'M18 30 L33 16 L33 90',
    2: 'M12 34 C12 8 52 6 50 34 C49 54 24 66 10 90 L52 90',
    3: 'M10 22 C18 4 52 6 50 28 C48 46 30 50 24 50 C46 50 56 62 52 76 C48 98 16 98 8 80',
    4: 'M42 92 L42 12 L8 66 L56 66',
    5: 'M50 12 L18 12 L13 50 C40 38 58 56 51 76 C44 98 18 96 8 82',
    6: 'M48 14 C26 18 10 42 10 68 C10 98 52 98 52 68 C52 44 14 44 12 68',
    7: 'M8 14 L52 14 L24 94',
    8: 'M30 52 C6 46 10 12 30 12 C50 12 54 46 30 52 C4 58 8 94 30 94 C52 94 56 58 30 52',
    9: 'M50 38 C50 6 8 8 10 32 C12 56 50 56 50 38 C52 66 42 90 16 94',
});
export const ROMAN_LETTERS = Object.freeze(['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']);
/** A number in Roman numerals as one line (strokes joined by moves), in a box 14 to 90 tall, starting at x = 0: I a bar, V a plain V, X a plain cross. */
export function romanPath(text) {
    let cursor = 0;
    let d = '';
    for (const letter of text) {
        if (letter === 'I') {
            d += `M${cursor} 14L${cursor} 90`;
            cursor += 19;
        }
        else if (letter === 'V') {
            d += `M${cursor} 14L${cursor + 22} 90L${cursor + 44} 14`;
            cursor += 56;
        }
        else {
            d += `M${cursor} 14L${cursor + 46} 90M${cursor + 46} 14L${cursor} 90`;
            cursor += 58;
        }
    }
    return d;
}
/**
 * The centre of a line's weight (the middle of the path weighted by length; M, L and C, curves flattened) and the middle of its box. A number is put where the eye puts it in the middle of the
 * circle, which is between the two: by the box alone a 7, whose bar is at the top, would stand with its weight high; by the weight alone it would stand low.
 */
export function pathCentres(d) {
    let x = 0;
    let y = 0;
    let sx = 0;
    let sy = 0;
    let total = 0;
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    const piece = (x0, y0, x1, y1) => {
        const length = Math.hypot(x1 - x0, y1 - y0);
        sx += ((x0 + x1) / 2) * length;
        sy += ((y0 + y1) / 2) * length;
        total += length;
        minX = Math.min(minX, x0, x1);
        maxX = Math.max(maxX, x0, x1);
        minY = Math.min(minY, y0, y1);
        maxY = Math.max(maxY, y0, y1);
    };
    for (const part of d.matchAll(/([MLC])([^MLC]*)/g)) {
        const n = (part[2].match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
        if (part[1] === 'M') {
            x = n[0];
            y = n[1];
        }
        else if (part[1] === 'L') {
            for (let i = 0; i < n.length; i += 2) {
                piece(x, y, n[i], n[i + 1]);
                x = n[i];
                y = n[i + 1];
            }
        }
        else {
            for (let i = 0; i < n.length; i += 6) {
                const x0 = x;
                const y0 = y;
                let px = x0;
                let py = y0;
                for (let k = 1; k <= 24; k += 1) {
                    const t = k / 24;
                    const u = 1 - t;
                    const qx = u ** 3 * x0 + 3 * u * u * t * n[i] + 3 * u * t * t * n[i + 2] + t ** 3 * n[i + 4];
                    const qy = u ** 3 * y0 + 3 * u * u * t * n[i + 1] + 3 * u * t * t * n[i + 3] + t ** 3 * n[i + 5];
                    piece(px, py, qx, qy);
                    px = qx;
                    py = qy;
                }
                x = n[i + 4];
                y = n[i + 5];
            }
        }
    }
    return { weight: [sx / total, sy / total], box: [(minX + maxX) / 2, (minY + maxY) / 2] };
}
/** Where a number is centred: halfway between the centre of its weight and the middle of its box. */
export function pathCentre(d) {
    const { weight, box } = pathCentres(d);
    return [(weight[0] + box[0]) / 2, (weight[1] + box[1]) / 2];
}
/** A line's strokes - one for each of its subpaths (each begins at an M) - in the order the pen writes them. */
export const strokesOf = (d) => d.split(/(?=M)/).filter((part) => part.length > 0);
const fmt = (value) => String(+value.toFixed(3));
function shape(index, n, script) {
    const text = script === 'roman' ? ROMAN_LETTERS[n - 1] : String(n);
    const d = script === 'roman' ? romanPath(text) : ARABIC_PATHS[n];
    const [cx, cy] = pathCentre(d);
    const points = [...d.matchAll(/-?\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));
    const far = Math.max(...points.filter((_, k) => k % 2 === 0).map((x, k) => Math.hypot(x - cx, points[2 * k + 1] - cy)));
    const scale = +Math.min(NUM_SCALE, (NUM_REACH - NUM_STROKE / 2) / far).toFixed(4);
    return Object.freeze({ index, n, script, text, d, strokes: strokesOf(d), scale, transform: `translate(${fmt(-cx * scale)} ${fmt(-cy * scale)}) scale(${scale})` });
}
/** The eighteen numbers in order: first round odd Roman and even Arabic, second round the other way about. */
export const NUM_SEQUENCE = Object.freeze([0, 1].flatMap((round) => Array.from({ length: 9 }, (_, k) => {
    const n = k + 1;
    const odd = n % 2 === 1;
    return shape(round * 9 + k, n, (round === 0) === odd ? 'roman' : 'arabic');
})));
