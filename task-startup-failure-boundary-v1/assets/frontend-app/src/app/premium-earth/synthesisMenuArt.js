import { SYN_ARC_COUNT, SYN_BARS, SYN_BAR_HEIGHT, SYN_BAR_WIDTH, SYN_CENTRE, SYN_HALF_OUTLINE_LENGTH, SYN_LEAF_RADIUS, SYN_RING_RADIUS, SYN_VIEW_HEIGHT, SYN_VIEW_TOP, SYN_VIEW_WIDTH, synArcPath, synHalfOutlinePath, synSlotOffset, } from './synthesisMenuGeometry.js?v=2ea79e9';
/*
 * THE CROSS-PILLAR SYNTHESIS CARD'S ART - THE MARKUP. Geometry: synthesisMenuGeometry.ts. Light and motion: synthesisMenuStyle.ts.
 *
 * One SVG, drawn back to front:
 *
 *   disc     kt-syn-disc                the faint tint the ring encloses
 *   leaves   kt-syn-leaf-0..3           four matte circles (tint, glow, line each) that overlap in the middle
 *   ring     kt-syn-ring-glow           the ring's glow, one circle
 *            kt-syn-ring                72 arcs of the ring's line (two halves of 36), each lit as the turning pillar's end passes it
 *   pillars  kt-syn-bar-0..3            outer group: moved and lit;  kt-syn-spin: turned (the one pillar that is left); inside it kt-syn-base (the pillar, dim) and
 *                                       kt-syn-ignite (its outline again as two halves, from the middle of the top down each side, revealed by a growing dash: the kindling)
 *
 * Every shape is drawn three times - a tint, a glow stroke and a line - because that is how the Connections heart's light is made (no filter, no blur).
 * The picture names nothing: the card's own name stands under it, outside the card, as the lower three cards' names do.
 */
const fmt = (value) => String(+value.toFixed(2));
const [CX, CY] = SYN_CENTRE;
/** The three layers of one closed shape: its tint, its glow and its line. */
const layers = (shape) => shape('tint') + shape('glow') + shape('line');
function bar(index) {
    const x = fmt(CX + synSlotOffset(index) - SYN_BAR_WIDTH / 2);
    const y = fmt(CY - SYN_BAR_HEIGHT / 2);
    const rect = (layer) => `<rect class="kt-syn-${layer}" x="${x}" y="${y}" width="${SYN_BAR_WIDTH}" height="${SYN_BAR_HEIGHT}" rx="${SYN_BAR_WIDTH / 2}"/>`;
    const dash = `${SYN_HALF_OUTLINE_LENGTH} ${SYN_HALF_OUTLINE_LENGTH}`;
    const halves = ['right', 'left'].map((side) => `<path class="kt-syn-ig-glow kt-syn-ig-${side}" stroke-dasharray="${dash}" d="${synHalfOutlinePath(index, side)}"/><path class="kt-syn-ig-line kt-syn-ig-${side}" stroke-dasharray="${dash}" d="${synHalfOutlinePath(index, side)}"/>`).join('');
    return `<g class="kt-syn-bar kt-syn-bar-${index}"><g class="kt-syn-spin"><g class="kt-syn-base">${layers(rect)}</g><g class="kt-syn-ignite">${halves}</g></g></g>`;
}
function leaf(index) {
    const circle = (layer) => `<circle class="kt-syn-m-${layer}" cx="${CX}" cy="${CY}" r="${SYN_LEAF_RADIUS}"/>`;
    return `<g class="kt-syn-leaf kt-syn-leaf-${index}">${layers(circle)}</g>`;
}
function arcs() {
    const paths = [];
    for (const half of [0, 1]) {
        for (let index = 0; index < SYN_ARC_COUNT; index += 1) {
            paths.push(`<path class="kt-syn-arc kt-syn-arc-${index}" d="${synArcPath(half, index)}"/>`);
        }
    }
    return `<g class="kt-syn-ring">${paths.join('')}</g>`;
}
export function synthesisMenuArt() {
    return `<svg class="kt-syn-svg" viewBox="0 ${SYN_VIEW_TOP} ${SYN_VIEW_WIDTH} ${SYN_VIEW_HEIGHT}" fill="none" stroke-linecap="round" stroke-linejoin="round" `
        + 'aria-hidden="true" focusable="false">'
        + `<circle class="kt-syn-disc" cx="${CX}" cy="${CY}" r="${SYN_RING_RADIUS}"/>`
        + [0, 1, 2, 3].map(leaf).join('')
        + `<circle class="kt-syn-ring-glow" cx="${CX}" cy="${CY}" r="${SYN_RING_RADIUS}"/>`
        + arcs()
        + SYN_BARS.map(bar).join('')
        + '</svg>';
}
