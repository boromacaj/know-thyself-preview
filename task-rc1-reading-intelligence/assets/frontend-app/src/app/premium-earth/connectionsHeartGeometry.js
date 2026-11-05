/*
 * THE CONNECTIONS ICON'S GEOMETRY - TWO CARDS THAT BECOME A HEART.
 *
 * One source of truth for the markup (premiumMenuScreen.ts) and the motion (connectionsHeartStyle.ts), so the card
 * silhouettes, the heart they form and the pulses that leave it can never drift apart.
 *
 * THE CARDS. Two identical upright rounded rectangles in the Main Menu cards' proportion, 7 : 12 (the tiles are
 * `aspect-ratio: 7 / 12`; the real tarot-card shape), with the menu's soft corner (about a fifth of the width).
 *
 * THE HEART. Turn the left card 45 degrees counter-clockwise (its top leans out to the left) and the right card 45 degrees
 * clockwise, and bring them together at the bottom: the two bars make a V, and their union is a geometric heart. Because
 * every long edge is then at 45 degrees the heart is built from only four kinds of point, all of which fall straight out of
 * the card geometry:
 *
 *      peak   notch   peak       the tops of the two cards' far ends (each a rounded card corner)
 *     /     \  /     \           the notch where the two inner long edges cross on the centre line
 *   side              side      the cards' outer far corners
 *     \                /
 *      \              /
 *            tip                where the two outer long edges cross on the centre line
 *
 * Each card's lowest corner sits exactly on the centre line, so the two long outer edges meet there in one clean 90 degree
 * point - the tip - and each card's bottom end lies along the other's side, inside the union. (Brought any further in, the
 * bottoms cross and make two feet; kept any further out, they leave a notch.) The cards' own rounded bottom corners leave a
 * hairline dimple at the tip, which the heart's outline - rounded there on purpose - covers.
 *
 * The heart's outline is that union as one path, with the cards' own corner rounding at the peaks and sides, a softer
 * rounding at the tip and a small one at the notch. (The figures were scaled up from the first version - UNIT 1.473, then 1.9, now 2.2 - so the heart is 37 units wide in the
 * 48-unit icon box, and every rounding went up with it.)
 */
/** 1 / (2 * sqrt 2): the 45 degree projection of half a length. */
const A = Math.SQRT1_2 / 2;
/** The card's size in units of the 48 x 48 icon box. 7 : 12, like the menu tiles. */
const UNIT = 2.2;
export const CARD_WIDTH = 7 * UNIT;
export const CARD_HEIGHT = 12 * UNIT;
/** The card's corner radius: about a fifth of its width, the menu cards' own softness. */
export const CARD_RADIUS = 3.1;
/**
 * THE CONNECTIONS ICON'S LIGHT, in its own 48-unit box: the line and glow of the two cards, and the heavier pair the heart they form is drawn with. The stylesheet
 * (connectionsHeartStyle.ts) reads them from here, and so does the Tarot picture, which is meant to be made of the same light.
 */
export const CARD_LINE_WIDTH = 1.1;
export const CARD_GLOW_WIDTH = 3;
export const CARD_LINE_ALPHA = 0.9;
export const CARD_GLOW_ALPHA = 0.28;
export const CARD_BODY_ALPHA = 0.1;
export const HEART_LINE_WIDTH = 1.2;
export const HEART_GLOW_WIDTH = 3.6;
export const HEART_LINE_ALPHA = 0.96;
export const HEART_GLOW_ALPHA = 0.34;
/** The heart's centre, and the point the beat scales about. */
export const HEART_CENTRE = [24, 24];
/** The cards' vertical centre: the heart is as tall above it as below, so it is the heart's centre too. */
export const CARD_CENTRE_Y = HEART_CENTRE[1];
/** Where the left card's centre ends up, joined: the right card is its mirror about x = 24. */
export const CARD_JOINED_X = 24 - A * (CARD_HEIGHT - CARD_WIDTH);
/** Where it starts: upright, apart, with a clear gap between the cards. */
export const CARD_APART_X = 12.45;
/** The tilt of the left card when joined; the right card's is the same turned the other way. */
export const CARD_TILT = 45;
/** The joined heart's six vertices, clockwise from the notch, with each one's rounding. Units of the icon box. */
function heartVertices() {
    const sum = A * (CARD_WIDTH + CARD_HEIGHT);
    const diff = A * (CARD_WIDTH - CARD_HEIGHT);
    const cx = CARD_JOINED_X;
    const peak = [cx + diff, CARD_CENTRE_Y - sum];
    const side = [cx - sum, CARD_CENTRE_Y + diff];
    const tipY = CARD_CENTRE_Y + sum;
    const notchY = peak[1] + (24 - peak[0]);
    const mirror = (x) => 48 - x;
    return [
        [24, notchY, 2.3],
        [mirror(peak[0]), peak[1], CARD_RADIUS],
        [mirror(side[0]), side[1], CARD_RADIUS],
        [24, tipY, 5.1],
        [side[0], side[1], CARD_RADIUS],
        [peak[0], peak[1], CARD_RADIUS],
    ];
}
const fmt = (value) => String(+value.toFixed(2));
/**
 * The heart's rounded outline, every vertex and every rounding scaled about the heart's centre by `scale` (1 is the heart
 * itself). Each corner is a quadratic curve whose control point is the original vertex, so edges stay straight and joins
 * are smooth.
 *
 * `origin` is where the heart's centre lands (the heart itself by default); the static mark below uses it to draw the same
 * outline in a smaller box.
 */
export function heartPath(scale, origin = HEART_CENTRE) {
    const vertices = heartVertices();
    const at = (x, y) => [
        origin[0] + (x - HEART_CENTRE[0]) * scale,
        origin[1] + (y - HEART_CENTRE[1]) * scale,
    ];
    const point = ([x, y]) => `${fmt(x)} ${fmt(y)}`;
    const corners = vertices.map((vertex, index) => {
        const here = at(vertex[0], vertex[1]);
        const neighbour = (offset) => {
            const other = vertices[(index + offset + vertices.length) % vertices.length];
            return at(other[0], other[1]);
        };
        const rounding = vertex[2] * scale;
        const toward = (other) => {
            const dx = other[0] - here[0];
            const dy = other[1] - here[1];
            const length = Math.hypot(dx, dy);
            return [here[0] + (dx / length) * rounding, here[1] + (dy / length) * rounding];
        };
        return { start: toward(neighbour(-1)), control: here, end: toward(neighbour(1)) };
    });
    return `M${point(corners[0].start)}${corners.map((corner, index) => (`${index === 0 ? '' : `L${point(corner.start)}`}Q${point(corner.control)} ${point(corner.end)}`)).join('')}L${point(corners[0].start)}Z`;
}
/*
 * THE STATIC MARK - THE FINISHED HEART, DRAWN SMALL.
 *
 * Where a still picture of the Connections symbol is wanted (the Forecast's Love & Connection pictogram, in its menu card and in the Life
 * Dynamics rows), it is drawn from this geometry and from no figures of its own: the heart's outline (heartPath) and the two cards that make it,
 * each at the seat and the 45 degree tilt they have when the Connections animation has joined them. Nothing here moves; the animation lives in
 * connectionsHeartStyle.ts and is not run inside another animation.
 *
 * `box` is the side of the square the mark is drawn in (24 for the Life Dynamics pictograms) and `scale` is how much of the heart's own 48-unit
 * drawing one unit of the box shows (0.5 would be the heart at half its size). The mark is centred in the box by the OUTLINE's extent - the heart is
 * a little taller below its middle than above - so it is optically centred and not merely centred on its vertex.
 */
/** The joined heart's outline extent, in the icon box's units (measured from the outline's own curves; a test samples them again). */
export const HEART_BOUNDS = { left: 6.425, right: 41.575, top: 10.315, bottom: 36.975 };
export function heartMark(box, scale) {
    const ox = box / 2 + (HEART_CENTRE[0] - (HEART_BOUNDS.left + HEART_BOUNDS.right) / 2) * scale;
    const oy = box / 2 + (HEART_CENTRE[1] - (HEART_BOUNDS.top + HEART_BOUNDS.bottom) / 2) * scale;
    const card = (joinedX, angle) => ({
        cx: +(ox + (joinedX - HEART_CENTRE[0]) * scale).toFixed(2),
        cy: +(oy + (CARD_CENTRE_Y - HEART_CENTRE[1]) * scale).toFixed(2),
        width: +(CARD_WIDTH * scale).toFixed(2),
        height: +(CARD_HEIGHT * scale).toFixed(2),
        radius: +(CARD_RADIUS * scale).toFixed(2),
        angle,
    });
    return {
        outline: heartPath(scale, [ox, oy]),
        cards: [card(CARD_JOINED_X, -CARD_TILT), card(48 - CARD_JOINED_X, CARD_TILT)],
    };
}
