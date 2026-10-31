import { CARD_BODY_ALPHA, HEART_GLOW_ALPHA, HEART_LINE_ALPHA } from './connectionsHeartGeometry.js?v=2ea79e9';
/*
 * THE CROSS-PILLAR SYNTHESIS CARD ON THE MAIN MENU - ITS GEOMETRY.
 *
 * One source of truth for the markup (synthesisMenuArt.ts) and the motion (synthesisMenuStyle.ts).
 *
 * THE PICTURE. Four slender pillars - the proportion of the four cards above the synthesis - come in from the two sides, stand side by side, are crossed by a wave of
 * light, merge into ONE pillar, which turns about its middle until the turning has drawn a ring; four soft leaves light inside the ring; and the whole thing is
 * undone in the same order: the leaves go, the pillar turns back and takes the ring in, stands upright and gives out four pillars again, a wave crosses them the other
 * way, and they leave to the sides. The ring is never stretched or scaled into being: it is the path of the pillar's two ends.
 *
 * ONE DRAWING, IN ONE BOX. 360 x 72 units, centred on (180, 50): the card's geometric middle. The pillars, the ring and the leaves all stand on that centre.
 *
 * THE LIGHT is the Connections heart's (alphas from connectionsHeartGeometry.ts, colours from connectionsHeartStyle.ts): a fine near-white line over a softer glow
 * stroke and a faint tint. What lies inside - the four leaves, and the disc the ring encloses - is the same light turned down: matte, thinner, further back.
 */
/** The picture's own box: its viewBox is 0 14 360 72, so the vertical middle (50) is the middle of the box. */
export const SYN_VIEW_WIDTH = 360;
export const SYN_VIEW_HEIGHT = 72;
export const SYN_VIEW_TOP = 14;
export const SYN_CENTRE = [180, 50];
/**
 * A pillar: a pill, 9 units wide and 68 tall, and the four stand 22 units apart (centre to centre). The height is what makes the ring: the ring is the path of the turning pillar's two ends, so its
 * diameter is the pillar's height. 68 units is chosen so that the ring is as large as the window of each of the four pillar cards above (the Human Design, BaZi, Numerology and Astrology circles):
 * at the 412 px phone the card's picture is 387 px for 360 units (1.075 px a unit), so 68 units are 73 px - the window's 66 units at 1.107 px. (The pillars were 44 units, a 47 px ring.)
 */
export const SYN_BAR_WIDTH = 9;
export const SYN_BAR_HEIGHT = 68;
export const SYN_BAR_PITCH = 22;
export const SYN_BARS = [0, 1, 2, 3];
/** The pillar that is left when the four are one: the second from the left, which then turns. */
export const SYN_SURVIVOR = 1;
/** Where a pillar stands, from the centre, side by side (-33, -11, 11, 33). */
export const synSlotOffset = (bar) => (bar - 1.5) * SYN_BAR_PITCH;
/** How far from its place a pillar is when it is off the card's edge, coming or going: the two left ones to the left, the two right ones to the right. */
export const SYN_SIDE = Object.freeze([-170, -150, 150, 170]);
/** The ring is the path of the turning pillar's two ends: its radius is half the pillar's height. */
export const SYN_RING_RADIUS = SYN_BAR_HEIGHT / 2;
/** The ring is drawn as 2 halves of SYN_ARC_COUNT arcs each (every arc 5 degrees), lit one after the other as the pillar's end passes. */
export const SYN_ARC_COUNT = 36;
export const SYN_ARC_DEGREES = 180 / SYN_ARC_COUNT;
/** A little over the arc's own end, so that two arcs never leave a seam between them. */
const ARC_OVERLAP_DEGREES = 0.3;
/** The four leaves: circles that overlap in the middle, each pushed out from the centre by LEAF_OFFSET at full size. They keep their proportion to the ring (12 and 7 in a ring of 22). */
export const SYN_LEAF_RADIUS = +((SYN_RING_RADIUS * 12) / 22).toFixed(2);
export const SYN_LEAF_START_SCALE = 5 / 12;
export const SYN_LEAF_OFFSET = +((SYN_RING_RADIUS * 7) / 22).toFixed(2);
export const SYN_LEAF_DIRECTIONS = Object.freeze([[1, 0], [-1, 0], [0, 1], [0, -1]]);
/** THE LINE AND THE GLOW, in this box's units (about 2.1 px and 6.4 px on a 350 px card; the heart's own is 2.5 px, the Forecast pictograms' 1.9 px). */
export const SYN_LINE_WIDTH = 2.2;
export const SYN_GLOW_WIDTH = 6.6;
export const SYN_LINE_ALPHA = HEART_LINE_ALPHA;
export const SYN_GLOW_ALPHA = HEART_GLOW_ALPHA;
export const SYN_TINT_ALPHA = CARD_BODY_ALPHA;
/** What stands inside the ring: the same light, turned down. */
export const SYN_MATTE = Object.freeze({ lineWidth: 1.5, glowWidth: 4, lineAlpha: 0.4, glowAlpha: 0.12, tintAlpha: 0.07 });
const fmt = (value) => String(+value.toFixed(2));
/**
 * THE KINDLING OF A PILLAR is its outline lit from the middle of its top DOWN, smoothly: each pillar's outline is drawn again as two paths, from the middle of the top to the middle of the
 * foot - the right half clockwise, the left half counter-clockwise - and each is revealed by a dash that grows from its start (stroke-dashoffset), the two sides together, so the light runs
 * down both sides of the pillar at once. One continuous reveal, not steps: the keyframes are the same for the four pillars and for both sides (the halves are the same length).
 */
export const SYN_HALF_OUTLINE_LENGTH = +((Math.PI * SYN_BAR_WIDTH) / 2 + (SYN_BAR_HEIGHT - SYN_BAR_WIDTH)).toFixed(3);
export function synHalfOutlinePath(bar, side) {
    const cx = SYN_CENTRE[0] + synSlotOffset(bar);
    const r = SYN_BAR_WIDTH / 2;
    const top = SYN_CENTRE[1] - SYN_BAR_HEIGHT / 2;
    const bottom = SYN_CENTRE[1] + SYN_BAR_HEIGHT / 2;
    const x = fmt(cx + (side === 'right' ? r : -r));
    const sweep = side === 'right' ? 1 : 0;
    return `M${fmt(cx)} ${fmt(top)}A${r} ${r} 0 0 ${sweep} ${x} ${fmt(top + r)}L${x} ${fmt(bottom - r)}A${r} ${r} 0 0 ${sweep} ${fmt(cx)} ${fmt(bottom)}`;
}
/**
 * One arc of the ring, as an SVG path. Half 0 starts at the top and runs clockwise to the bottom (the pillar's upper end draws it); half 1 starts at the bottom and
 * runs clockwise back to the top (its lower end draws it). `index` counts from the half's start.
 */
export function synArcPath(half, index) {
    const [cx, cy] = SYN_CENTRE;
    const from = (index * SYN_ARC_DEGREES * Math.PI) / 180;
    const to = (Math.min(180, (index + 1) * SYN_ARC_DEGREES + ARC_OVERLAP_DEGREES) * Math.PI) / 180;
    const sign = half === 0 ? 1 : -1;
    const at = (angle) => `${fmt(cx + sign * SYN_RING_RADIUS * Math.sin(angle))} ${fmt(cy - sign * SYN_RING_RADIUS * Math.cos(angle))}`;
    return `M${at(from)}A${SYN_RING_RADIUS} ${SYN_RING_RADIUS} 0 0 1 ${at(to)}`;
}
