/*
 * THE TAROT HERO'S COMPOSITION: ONE PLAN - THE EARTH AND THE ROW TOGETHER AT THE TOP, THE LINE AND THE DECK LAID OUT FROM THE MENU CAPSULE UPWARD
 *
 * THE PICTURE. The Earth is the atmosphere; the three cards of the reading stand in front of it in ONE ROW, side by side, still, ACROSS THE GLOBE'S MIDDLE: the row's centre is the
 * planet's centre. The row's cards are as wide, with their clear gaps, as the reading panel under them (their outer edges are the panel's). While the person chooses, the
 * screen is:
 *
 *      the Earth (its top a ninth of the height from the top of the screen)
 *      [ Energy ] [ Factor ] [ Guidance ]        the row: glass cards, across the Earth's middle (drawn only as the cards are taken)
 *                                                (calm space)
 *      Pick your Energy card                     the instruction, directly over the deck
 *      a dense deck, its cards the deck's size   only the card in focus stands out of it, up and to the left
 *      MENU
 *
 * The opening screen is the same without the row: the Earth, the line where the instruction will be, ONE deck where the dense deck will be, MENU. When the
 * third card is taken the deck is gone and the row stays exactly where it was (nothing the person is looking at moves); the reading begins under it.
 *
 * TWO ANCHORS. The Earth and the row hang from the top (the Earth's top is EARTH_TOP_OF_HEIGHT of the screen's height down, never less than TOP_CLEAR; the row's
 * middle is across the planet's centre, ROW_BELOW_CENTRE of a row card below it). The line and the deck stand on MENU (the deck's foot is MENU_GAP above its top, the card in focus stands FOCUS_LIFT of
 * its height out of it, the line is a gap above that). What is between them is calm space. When a short screen has too little of it, the Earth is lifted and then
 * the cards are made smaller, never the other way about.
 *
 * TWO SIZES, ONE SHAPE. The DECK's card is CARD_WIDTH_SHARE of a third of the screen's width less the side margins and the two gaps (never wider than
 * CARD_WIDTH_MAX), 5:8; the deck is dense: each card of it shows ADVANCE of its width beside the next. The ROW's card is ROW_SCALE of the deck's (a fifth smaller):
 * the three cards the person has chosen are a quiet part of the Earth's scene, and the deck they are chosen from is the control.
 *
 * A MODULE OF ITS OWN ON PURPOSE. The modules that decide where the Earth is, how big it is and how it moves are locked by hash
 * (tests/lightingOnly.test.mjs) so that nothing changes them by accident; this one only answers "if a destination asks for the hero's composition, what is the
 * plan", and the Earth's framing is asked for only by ambientEarthSession.ts. The product's own framing is not touched.
 */
export const TAROT_HERO_EARTH_DIAMETER_OF_HEIGHT = 0.34;
export const TAROT_HERO_EARTH_DIAMETER_MAX_OF_WIDTH = 0.86;
/** A card is 5:8. */
export const TAROT_HERO_CARD_ASPECT = 1.6;
/** Clear space between the row and the edge of the screen, and between two cards of the row, CSS px. */
export const TAROT_HERO_SIDE_MARGIN = 10;
export const TAROT_HERO_ROW_GAP = 10;
/** The DECK's card is this share of the third of the width the row may use (0.9: a tenth smaller than the card that fills it), at most CARD_WIDTH_MAX wide and at least CARD_WIDTH_MIN. */
export const TAROT_HERO_CARD_WIDTH_SHARE = 0.9;
/**
 * THE ROW IS AS WIDE AS THE READING PANEL under it. The three cards' OUTER edges are the panel's edges: the panel is the surface's content column (the screen less a gutter of
 * PANEL_GUTTER each side, never wider than PANEL_MAX - the application's content column), the gap between two cards is ROW_GAP_SHARE of it (at least ROW_GAP_MIN), and the three
 * cards share what is left: three cards, two clear gaps, one panel width. The placement script passes the panel's real width (the mount's); this is the same number worked out
 * from the screen's width, for where nothing can be measured (the Earth's framing, the tests).
 */
export const TAROT_HERO_PANEL_GUTTER = 18;
export const TAROT_HERO_PANEL_MAX = 560;
export const TAROT_HERO_ROW_GAP_SHARE = 0.048;
export const TAROT_HERO_ROW_GAP_MIN = 10;
/** The reading panel's width on a screen of this width. */
export function tarotHeroPanelWidth(width) {
    return Math.min(TAROT_HERO_PANEL_MAX, Math.max(0, width - 2 * TAROT_HERO_PANEL_GUTTER));
}
export const TAROT_HERO_CARD_WIDTH_MAX = 148;
export const TAROT_HERO_CARD_WIDTH_MIN = 64;
/** Clear space above the Earth at the least, CSS px; and the share of the screen's height the Earth's top is down when there is room. */
export const TAROT_HERO_TOP_CLEAR = 16;
export const TAROT_HERO_EARTH_TOP_OF_HEIGHT = 0.09;
/**
 * THE ROW ACROSS THE EARTH. The row's middle is on the planet's CENTRE, plus this share of a ROW card's height (0: exactly across the middle; positive: below it).
 * The three cards sit across the globe, with the Earth showing above them and around them; nothing else - not the eye at the Earth's centre - places them.
 */
export const TAROT_HERO_ROW_BELOW_CENTRE = 0;
/** The least of the Earth worth framing (its diameter), CSS px: a screen that cannot give it this is drawn with smaller cards. */
export const TAROT_HERO_EARTH_MIN_DIAMETER = 150;
/** THE DECK. Each card shows this share of its width beside the next one (a tight stack), and the card in focus stands this share of its height out of it (a tab, at least FOCUS_LIFT_MIN px). */
export const TAROT_HERO_DECK_ADVANCE = 0.13;
export const TAROT_HERO_FOCUS_LIFT = 0.2;
export const TAROT_HERO_FOCUS_LIFT_MIN = 24;
/** The deck's foot is this far above the MENU capsule's top (MENU keeps its own clear space), CSS px. */
export const TAROT_HERO_MENU_GAP = 14;
/** Where the MENU capsule's top is above the foot of the screen when it cannot be measured, CSS px. */
export const TAROT_HERO_MENU_FOOT = 80;
/** THE LINE. Its box is this tall; it stands this far above the lifted card of the deck; and the row ends at least ROW_LINE_GAP above it, CSS px. */
export const TAROT_HERO_LINE_BOX = 24;
export const TAROT_HERO_ROW_LINE_GAP = 8;
export const TAROT_HERO_LINE_DECK_GAP = 8;
/** THE COMPLETED SCREEN: the scroll cue's box, and how far above the MENU capsule it stands (the Numerology hero's place for it), CSS px. */
export const TAROT_HERO_CUE_HEIGHT = 31;
export const TAROT_HERO_CUE_FOOT_GAP = 22;
/** The plan for a screen of this size. `menuTop` is where the MENU capsule's top is, from the top of the screen, when it has been measured. */
export function planTarotHero(width, height, menuTop, panelWidth) {
    const safeWidth = Math.max(1, width);
    const safeHeight = Math.max(1, height);
    const foot = menuTop !== undefined && menuTop !== null && Number.isFinite(menuTop) ? menuTop : safeHeight - TAROT_HERO_MENU_FOOT;
    const preferredDiameter = Math.min(safeHeight * TAROT_HERO_EARTH_DIAMETER_OF_HEIGHT, safeWidth * TAROT_HERO_EARTH_DIAMETER_MAX_OF_WIDTH);
    const wantedEarthTop = Math.max(TAROT_HERO_TOP_CLEAR, safeHeight * TAROT_HERO_EARTH_TOP_OF_HEIGHT);
    /* What stands on MENU: the deck, the card in focus, the line. The line's top is the most the row and the Earth may come down to (less the gap). */
    const lower = (deckWidth) => {
        const deckHeight = deckWidth * TAROT_HERO_CARD_ASPECT;
        const focusLift = Math.max(TAROT_HERO_FOCUS_LIFT_MIN, deckHeight * TAROT_HERO_FOCUS_LIFT);
        const spreadBottom = foot - TAROT_HERO_MENU_GAP;
        const spreadTop = spreadBottom - deckHeight;
        const focusTop = spreadTop - focusLift;
        const lineBottom = focusTop - TAROT_HERO_LINE_DECK_GAP;
        const lineTop = lineBottom - TAROT_HERO_LINE_BOX;
        return { deckHeight, focusLift, spreadBottom, spreadTop, focusTop, lineBottom, lineTop, rowLimit: lineTop - TAROT_HERO_ROW_LINE_GAP };
    };
    /* What hangs from the top, for a Earth of this diameter: the Earth's top is where it is wanted, or higher if the row would not end above the line. */
    const upper = (rowHeight, diameter, rowLimit) => {
        const reach = diameter / 2 + TAROT_HERO_ROW_BELOW_CENTRE * rowHeight + rowHeight / 2;
        const earthTop = Math.min(wantedEarthTop, rowLimit - reach);
        return { earthTop, fits: earthTop >= TAROT_HERO_TOP_CLEAR - 1e-6 };
    };
    const freeWidth = (safeWidth - 2 * TAROT_HERO_SIDE_MARGIN - 2 * TAROT_HERO_ROW_GAP) / 3;
    const baseDeckWidth = Math.min(TAROT_HERO_CARD_WIDTH_MAX, freeWidth * TAROT_HERO_CARD_WIDTH_SHARE);
    const panel = panelWidth !== undefined && panelWidth !== null && Number.isFinite(panelWidth) && panelWidth > 0 ? Math.min(panelWidth, safeWidth) : tarotHeroPanelWidth(safeWidth);
    /* the row: three cards and two clear gaps across (a share, `k`, of) the panel; the deck: its own card, shrunk by the same share when the screen is too short for both */
    const rowFor = (k) => {
        const across = panel * k;
        const gap = Math.max(TAROT_HERO_ROW_GAP_MIN * Math.min(1, k), across * TAROT_HERO_ROW_GAP_SHARE);
        const width3 = (across - 2 * gap) / 3;
        return { gap, width: width3, height: width3 * TAROT_HERO_CARD_ASPECT };
    };
    let shrink = 1;
    let deckWidth = baseDeckWidth;
    let row = rowFor(shrink);
    let low = lower(deckWidth);
    let high = upper(row.height, preferredDiameter, low.rowLimit);
    for (let guard = 0; guard < 80 && !high.fits && deckWidth > TAROT_HERO_CARD_WIDTH_MIN; guard += 1) {
        shrink *= 0.97;
        deckWidth = Math.max(TAROT_HERO_CARD_WIDTH_MIN, baseDeckWidth * shrink);
        row = rowFor(shrink);
        low = lower(deckWidth);
        high = upper(row.height, preferredDiameter, low.rowLimit);
    }
    const cardWidth = row.width;
    const cardHeight = row.height;
    let fits = high.fits;
    let earthDiameter = preferredDiameter;
    let earthTop = Math.max(TAROT_HERO_TOP_CLEAR, high.earthTop);
    if (!fits) {
        /* A screen so short that even the smallest cards leave the Earth no room: the Earth gives way, to the least that is worth framing. */
        earthTop = TAROT_HERO_TOP_CLEAR;
        earthDiameter = Math.max(TAROT_HERO_EARTH_MIN_DIAMETER * 0.6, 2 * (low.rowLimit - earthTop - cardHeight / 2 - TAROT_HERO_ROW_BELOW_CENTRE * cardHeight));
        fits = earthDiameter >= TAROT_HERO_EARTH_MIN_DIAMETER;
    }
    const earthCentreY = earthTop + earthDiameter / 2;
    const rowCentre = earthCentreY + TAROT_HERO_ROW_BELOW_CENTRE * cardHeight;
    const rowTop = rowCentre - cardHeight / 2;
    const rowBottom = rowCentre + cardHeight / 2;
    return {
        earthDiameter,
        earthRadius: earthDiameter / 2,
        earthCentreY,
        cardWidth,
        cardHeight,
        deckCardWidth: deckWidth,
        deckCardHeight: low.deckHeight,
        rowGap: row.gap,
        pitch: cardWidth + row.gap,
        rowWidth: 3 * cardWidth + 2 * row.gap,
        rowTop,
        rowBottom,
        lineTop: low.lineTop,
        lineBottom: low.lineBottom,
        spreadTop: low.spreadTop,
        spreadBottom: low.spreadBottom,
        /* A WHOLE number of pixels: the picker measures the distance between two places from the browser's whole-pixel layout, and a fraction would add up over seventy-eight places. */
        advance: Math.max(8, Math.round(deckWidth * TAROT_HERO_DECK_ADVANCE)),
        focusLift: low.focusLift,
        focusTop: low.focusTop,
        cueTop: Math.max(rowBottom + 12, foot - TAROT_HERO_CUE_FOOT_GAP - TAROT_HERO_CUE_HEIGHT),
        fits,
    };
}
/** The framing of the Tarot hero's Earth, for a scene of this size: the planet's size and place in the plan. */
export function framingForTarotHero(width, height) {
    const shorter = Math.max(1, Math.min(width, height));
    const plan = planTarotHero(width, height);
    return { radius: plan.earthDiameter / 2 / shorter, x: 0.5, y: plan.earthCentreY / Math.max(1, height) };
}
