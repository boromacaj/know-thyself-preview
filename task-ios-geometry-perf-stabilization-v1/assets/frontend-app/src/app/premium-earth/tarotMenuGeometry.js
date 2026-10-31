/*
 * THE TAROT CARD ON THE MAIN MENU - ITS GEOMETRY (V1.9).
 *
 * One source of truth for the markup (tarotMenuArt.ts) and the motion (tarotMenuStyle.ts).
 *
 * V1.9 REPLACES THE SHUFFLE WITH ONE GESTURE: one card opens into an ARC FAN of five, three of them are chosen, the other two go, the three come forward
 * and settle into a spread, and the three close back into the one card. Five cards at most are ever drawn, and only three at the end:
 *
 *   single   one card, upright, in the middle (the other four are stacked beneath it, unseen)
 *   fan      five cards on an arc, as a hand holds them: each one is the one card turned about a point BELOW it, so the cards open along a circle and the
 *            outer ones stand lower than the middle one. The middle card is the anchor and stays in front; the nearer a card is to it, the nearer to the front
 *   spread   the three chosen cards (left, middle, right) side by side, a little apart, the middle one raised and in front
 *
 * THE CARD IS THE CONNECTIONS CARD (V1.7) and its light is the Connections HEART's (V1.8): size, corner, line, glow and tint are not chosen here, they are
 * the Connections icon's own, in this picture's units (below). Nothing about the material changes in V1.9.
 *
 * COVERING, NOT SEEING THROUGH. Each card has a body that covers what is behind it (below), so that where cards overlap the card in front is whole and the card
 * behind shows only what is not covered: a fan of five reads as five edges, not as a tangle of crossing outlines. No clip, no mask: a card's body is its own
 * drawing, and the order the cards are painted in (tarotMenuArt.ts) is the order they lie in.
 */
import { CARD_BODY_ALPHA, CARD_RADIUS as CONNECTIONS_CARD_RADIUS, CARD_WIDTH as CONNECTIONS_CARD_WIDTH, HEART_GLOW_ALPHA, HEART_GLOW_WIDTH, HEART_LINE_ALPHA, HEART_LINE_WIDTH, } from './connectionsHeartGeometry.js?v=d9f39e7';
/** The picture's own box, in user units, and its centre: every pose is a distance from the centre. */
export const TAROT_VIEW_WIDTH = 68;
export const TAROT_VIEW_HEIGHT = 72;
export const TAROT_CENTRE = [34, 36];
/**
 * The Connections card and the Connections heart's line, scaled from the 48-unit box the heart is drawn in (that box is min(104px, 96cqw) wide,
 * connectionsHeartStyle.ts) to this picture's unit: ONE unit of it is TAROT_UNIT_FACTOR of that box's width, so a Tarot card is, on every screen, exactly as
 * large as a Connections card and its line exactly as thick as the heart's (33.4 x 57.2 px with a 2.6 px line and a 7.8 px glow at 412 wide).
 */
export const CONNECTIONS_BOX_UNITS = 48;
export const CONNECTIONS_BOX_SHARE = 0.96;
export const CONNECTIONS_BOX_MAX_PX = 104;
export const CONNECTIONS_LINE_WIDTH = HEART_LINE_WIDTH;
export const CONNECTIONS_GLOW_WIDTH = HEART_GLOW_WIDTH;
/** The Connections light, as alphas: a line, a glow under it, and the faint tint inside a card. */
export const TAROT_LINE_ALPHA = HEART_LINE_ALPHA;
export const TAROT_GLOW_ALPHA = HEART_GLOW_ALPHA;
export const TAROT_TINT_ALPHA = CARD_BODY_ALPHA;
export const TAROT_CARD_WIDTH = 24;
export const TAROT_CARD_HEIGHT = +((TAROT_CARD_WIDTH * 12) / 7).toFixed(2);
/** How many Tarot units there are to a Connections unit. */
export const TAROT_PER_CONNECTIONS = TAROT_CARD_WIDTH / CONNECTIONS_CARD_WIDTH;
export const TAROT_CARD_RADIUS = +(CONNECTIONS_CARD_RADIUS * TAROT_PER_CONNECTIONS).toFixed(2);
export const TAROT_LINE_WIDTH = +(CONNECTIONS_LINE_WIDTH * TAROT_PER_CONNECTIONS).toFixed(3);
export const TAROT_GLOW_WIDTH = +(CONNECTIONS_GLOW_WIDTH * TAROT_PER_CONNECTIONS).toFixed(3);
/** One Tarot unit, as the share of the width of the Connections heart's box: TAROT_CARD_WIDTH units are CONNECTIONS_CARD_WIDTH of its 48. */
export const TAROT_UNIT_FACTOR = +(CONNECTIONS_CARD_WIDTH / (CONNECTIONS_BOX_UNITS * TAROT_CARD_WIDTH)).toFixed(6);
/** Room round a card for its glow: a card's own box is this much larger than the card on every side. */
export const TAROT_CARD_MARGIN = 3;
/**
 * The five cards, in the order they are PAINTED (the last is in front): the two outer cards, then the two inner ones, then the middle one. So the nearer a card
 * is to the middle, the nearer it lies to the front; and the three that are chosen (left, right, centre) are the three in front.
 */
export const TAROT_CARDS = ['far-left', 'far-right', 'left', 'right', 'centre'];
/** The three that are chosen, and the two that go. */
export const TAROT_CHOSEN = ['left', 'right', 'centre'];
export const TAROT_LEAVING = ['far-left', 'far-right'];
export const isChosen = (card) => TAROT_CHOSEN.includes(card);
/** The place of a card in the fan, from the middle: -2 far left, -1 left, 0 middle, 1 right, 2 far right. */
export const fanPlace = (card) => ({ 'far-left': -2, left: -1, centre: 0, right: 1, 'far-right': 2 })[card];
/** THE ARC: the angle between two neighbouring cards, in degrees, and the distance of the point they turn about, below the middle card's centre, in picture units. */
export const TAROT_FAN_STEP = 14;
export const TAROT_FAN_RADIUS = 28;
/** The fan as a whole is held a little above the single card's place, so that its arch (the outer cards stand lower) is centred in the picture. */
export const TAROT_FAN_LIFT = 3;
/**
 * A card on the arc, with the fan open by `openness` (0 is the single card, 1 is the full fan): the card is turned about the point below it by its own angle
 * times the openness, so that it travels along a circle as the fan opens, not along a straight line.
 */
export function fanPose(card, openness) {
    const angle = fanPlace(card) * TAROT_FAN_STEP * openness;
    const turn = (angle * Math.PI) / 180;
    return {
        x: +(TAROT_FAN_RADIUS * Math.sin(turn)).toFixed(3),
        y: +(TAROT_FAN_RADIUS * (1 - Math.cos(turn)) - TAROT_FAN_LIFT * openness).toFixed(3),
        r: +angle.toFixed(3),
        s: 1,
    };
}
/** THE SPREAD of the three chosen cards: how far the side cards stand from the middle one, how far they lean outward, how far the middle one is raised. */
export const TAROT_SPREAD_OFFSET = 13;
export const TAROT_SPREAD_LEAN = 8;
export const TAROT_SPREAD_SIDE_DROP = 1.5;
export const TAROT_SPREAD_RAISE = 2.5;
export function spreadPose(card) {
    switch (card) {
        case 'left': return { x: -TAROT_SPREAD_OFFSET, y: TAROT_SPREAD_SIDE_DROP, r: -TAROT_SPREAD_LEAN, s: 1 };
        case 'right': return { x: TAROT_SPREAD_OFFSET, y: TAROT_SPREAD_SIDE_DROP, r: TAROT_SPREAD_LEAN, s: 1 };
        case 'centre': return { x: 0, y: -TAROT_SPREAD_RAISE, r: 0, s: 1 };
        default: return fanPose(card, 1);
    }
}
/** The single card: every card is here, one over the other, upright in the middle. */
export const singlePose = (card) => fanPose(card, 0);
/**
 * HOW LIT A CARD IS, from 0 (not seen) to 1: the opacity of the whole card - its body, its tint, its line and its glow together. The card that is in front, and the
 * cards that have been chosen, are the brightest; the cards that are not chosen are dimmer, and go.
 */
export const TAROT_PROMINENCE = {
    /** the fan, open: the middle card is the anchor, the cards beside it quieter, the outer cards the quietest */
    fan: { centre: 1, left: 0.82, right: 0.82, 'far-left': 0.55, 'far-right': 0.55 },
    /** the unchosen cards, just before they go */
    dimmed: 0.28,
    /** the three, spread: the middle one the brightest, the others a little quieter */
    spread: { centre: 1, left: 0.9, right: 0.9, 'far-left': 0, 'far-right': 0 },
};
/**
 * THE BODY: what covers the cards behind a card. A very dark blue that is the colour of the tile's own glass (so that a card's body is not seen against it, only
 * where it covers another card's lines), at a high but not a full opacity, so that what is behind a card is covered and not erased - a trace of its lines shows.
 */
export const TAROT_BODY_RGB = '13, 16, 28';
export const TAROT_BODY_ALPHA = 0.97;
/** A coordinate as the markup writes it: two decimals at most. */
export const fmt = (value) => String(+value.toFixed(2));
