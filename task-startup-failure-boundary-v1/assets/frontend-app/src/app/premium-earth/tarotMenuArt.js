import { TAROT_CARDS, TAROT_CARD_HEIGHT, TAROT_CARD_MARGIN, TAROT_CARD_RADIUS, TAROT_CARD_WIDTH, fmt, } from './tarotMenuGeometry.js?v=2ea79e9';
/*
 * THE TAROT CARD'S ART - THE MARKUP (the light and the motion are tarotMenuStyle.ts, the shapes and poses are tarotMenuGeometry.ts).
 *
 * FIVE CARDS, EACH A BOX WITH ONE SMALL STATIC DRAWING. A card is a plain HTML box (a span) holding one SVG, and the SVG holds the card four times over, one on top
 * of the other, the same rounded 7 : 12 rectangle:
 *
 *   body   a very dark blue the colour of the tile's glass, nearly opaque: it covers the cards that lie behind this one, so that where cards overlap the card in
 *          front is whole (against the tile it cannot be seen at all)
 *   tint   the Connections card's own faint tint, inside the card
 *   glow   the Connections heart's glow, a wide soft stroke
 *   line   the Connections heart's line, a fine near-white stroke
 *
 * The loop moves the BOXES - a transform, and the opacity of the box - never anything inside a drawing, so the browser's compositor can run the motion off the main
 * thread (which is busy with the globe and the rest of the menu). The boxes are painted in the order the cards lie in, the last in front (tarotMenuGeometry.ts):
 * the covering is simply the paint order, so nothing is cut or masked while anything moves.
 *
 * No text, no number, no gauge, no eye. The picture is aria-hidden decoration inside the Tarot button, whose name is the tile's own label (TAROT).
 */
const BOX_WIDTH = TAROT_CARD_WIDTH + 2 * TAROT_CARD_MARGIN;
const BOX_HEIGHT = TAROT_CARD_HEIGHT + 2 * TAROT_CARD_MARGIN;
const VIEW_BOX = `${fmt(-BOX_WIDTH / 2)} ${fmt(-BOX_HEIGHT / 2)} ${fmt(BOX_WIDTH)} ${fmt(BOX_HEIGHT)}`;
/** The card's size as the style module needs it: the box of a card, in picture units. */
export const TAROT_CARD_BOX = [BOX_WIDTH, BOX_HEIGHT];
const rect = (className) => `<rect class="${className}" x="${fmt(-TAROT_CARD_WIDTH / 2)}" y="${fmt(-TAROT_CARD_HEIGHT / 2)}" `
    + `width="${fmt(TAROT_CARD_WIDTH)}" height="${fmt(TAROT_CARD_HEIGHT)}" rx="${fmt(TAROT_CARD_RADIUS)}"/>`;
/** One card: its box, and its one drawing. */
const card = (id) => `<span class="kt-menu-tarot-card kt-menu-tarot-card-${id}">`
    + `<svg class="kt-menu-tarot-ink" viewBox="${VIEW_BOX}" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">`
    + `${rect('kt-menu-tarot-body')}${rect('kt-menu-tarot-tint')}${rect('kt-menu-tarot-glow')}${rect('kt-menu-tarot-line')}</svg></span>`;
/** The card's art: the five cards, painted in the order they lie in. */
export function tarotMenuArt() {
    return `<span class="kt-menu-tarot">${TAROT_CARDS.map(card).join('')}</span>`;
}
