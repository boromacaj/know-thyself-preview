/*
 * THE TAROT HERO: THREE GLASS CARDS IN A ROW IN FRONT OF THE EARTH, A DENSE DECK TO CHOOSE FROM
 * ---------------------------------------------------------------------------------------------
 * Pure geometry and pure stylesheet; no DOM, no clock, nothing random. The markup is the screen's (tarotExperienceScreen.ts, which owns the card faces), and
 * tarotHeroPlacement.ts is the part that reads where the Earth and the MENU capsule are and writes what this computes. WHERE everything stands is the plan
 * (planTarotHero in ambient/tarotHeroFraming.ts, which also frames the Earth); this file turns it into custom properties and draws.
 *
 * THE PICTURE.
 *   opening     the Earth, ONE deck of card backs (the size of the cards that follow), one line: shake the phone to shuffle the cards. Nothing else, and nothing
 *               remembered from an earlier draw: the screen always opens like this (the controller sees to it).
 *   shuffling   the deck is riffled - cut in two, the halves ridden into one another a card at a time, squared up, and again - for a little over a second
 *   picking     the row: three glass cards - Energy, Factor, Guidance - side by side in front of the Earth's lower limb, empty until a card is taken (the next one
 *               has a gold rim); under it the instruction; under that the DECK, a dense strip of backs the row's own size of which only the card in focus stands
 *               out; then MENU. A card the person takes leaves the deck, flies up to the next place of the row and turns face up there.
 *   complete    the row only: the deck is gone, the row has not moved, the scroll cue is under it. The reading is on a sheet that rises over the hero.
 *
 * THE GLASS is the interface's own: a milky pane in the Earth's light with a bright thin rim on the upper left, a soft sheen and a blur of what is behind it.
 * The blur is dropped for the moment a card is turning (a layer that is turning in 3D is flattened by it) and is back when the card has landed.
 */
import { TAROT_HERO_CARD_ASPECT, TAROT_HERO_CUE_HEIGHT, TAROT_HERO_DECK_ADVANCE, TAROT_HERO_MENU_GAP, TAROT_HERO_SIDE_MARGIN, planTarotHero, } from '../../premium-earth/ambient/tarotHeroFraming.js?v=b5ef5ed';
import { tarotSigilCss, tarotSigilDiameter, tarotSigilReducedCss } from './tarotSigil.js?v=b5ef5ed';
/** A card is 5:8. The sizes themselves (a card, the row, the deck) are the plan's. */
export const HERO_CARD_ASPECT = TAROT_HERO_CARD_ASPECT;
/** Clear space kept between the row and the edge of the screen, CSS px. */
export const HERO_SCREEN_MARGIN = TAROT_HERO_SIDE_MARGIN;
/**
 * THE FIRST SCREEN IS THE HERO'S, AND ONLY THE HERO'S. The hero ends this far above the foot of the screen (so it is WHOLE on screen: the
 * end-of-reading fade is told by whether the whole hero is in view), and the reading's sheet begins this far BELOW the fold (its glow and its
 * rim must not show as a line along the foot of the first screen). The sheet's top margin is the sum of the two.
 */
export const HERO_FOLD_INSET = 28;
export const HERO_FOLD_CLEARANCE = 30;
/** The scroll cue's box (three chevrons), the same as the readings', CSS px. */
export const HERO_CUE_WIDTH = 31;
export const HERO_CUE_HEIGHT = TAROT_HERO_CUE_HEIGHT;
/** The room kept between the MENU capsule and the lowest thing the hero draws. */
export const HERO_MENU_GAP = TAROT_HERO_MENU_GAP;
/** How much of its width each card of the deck shows beside the next: the deck is a tight stack. */
export const HERO_STRIP_ADVANCE_PER_WIDTH = TAROT_HERO_DECK_ADVANCE;
/**
 * THE REVEAL of a card that has been taken: it comes forward to the middle of the screen (its middle REVEAL_CENTRE_OF_HEIGHT of the way down), as wide as
 * REVEAL_OF_WIDTH of the screen (at most REVEAL_MAX_WIDTH, and never taller than REVEAL_MAX_OF_HEIGHT of the screen), is turned over, held, and goes to its place.
 * The whole of it takes REVEAL_MS: forward (to 26 %), turned over and held (to 74 %), away (to 100 %).
 */
export const HERO_REVEAL_MS = 1350;
export const HERO_REVEAL_OF_WIDTH = 0.56;
export const HERO_REVEAL_MAX_WIDTH = 236;
export const HERO_REVEAL_MAX_OF_HEIGHT = 0.4;
export const HERO_REVEAL_CENTRE_OF_HEIGHT = 0.46;
/**
 * THE DEALER'S SPREAD (tarotDealerSpread.ts): after the shuffle the squared-up pile opens into the strip. Each card travels HERO_SPREAD_CARD_MS; the card
 * nearest the pile begins first and the farthest HERO_SPREAD_STAGGER_MS later, so the whole of it takes HERO_SPREAD_MS (inside the 0.6 - 1.0 s the ritual asks for).
 * The way out (the deck going once the third card has landed) is the same motion drawn backwards, a little quicker: HERO_GATHER_MS. The reading then rises under
 * the row (HERO_SHEET_RISE_MS after HERO_SHEET_RISE_DELAY_MS), and the ritual is over, `reading`, HERO_COMPLETE_MS after the third card has landed.
 */
export const HERO_SPREAD_CARD_MS = 560;
export const HERO_SPREAD_STAGGER_MS = 280;
export const HERO_SPREAD_MS = HERO_SPREAD_CARD_MS + HERO_SPREAD_STAGGER_MS;
export const HERO_GATHER_CARD_MS = 440;
export const HERO_GATHER_STAGGER_MS = 160;
export const HERO_GATHER_MS = HERO_GATHER_CARD_MS + HERO_GATHER_STAGGER_MS;
export const HERO_SHEET_RISE_MS = 760;
export const HERO_SHEET_RISE_DELAY_MS = 300;
export const HERO_COMPLETE_MS = HERO_SHEET_RISE_DELAY_MS + HERO_SHEET_RISE_MS + 40;
/** The reading begins this far under the row, CSS px. */
export const HERO_SHEET_GAP = 14;
/** How many backs the opening deck is drawn with, and how long one card of the riffle takes (the cards follow one another by SLOT_MS). */
export const HERO_DECK_CARDS = 16;
export const HERO_RIFFLE_CARD_MS = 1050;
export const HERO_RIFFLE_SLOT_MS = 14;
/**
 * The formation's size and place. The sizes and the places are the plan's (planTarotHero), asked WITH the measured MENU capsule so that nothing the hero draws
 * can reach it; only the Earth's disc is measured from the globe, and the row, the line and the deck do not depend on it.
 */
export function heroGeometry(input) {
    const earthRadius = Math.max(0, input.earthDiameter / 2);
    const menuTop = input.menuTop ?? input.viewportHeight - 80;
    const plan = planTarotHero(input.stageWidth, input.viewportHeight, menuTop, input.panelWidth);
    const hero = (y) => y - input.heroTop;
    const stripPad = plan.focusLift + 6;
    const centreY = input.earthY - input.heroTop;
    const revealWidth = Math.min(input.stageWidth * HERO_REVEAL_OF_WIDTH, HERO_REVEAL_MAX_WIDTH, (input.viewportHeight * HERO_REVEAL_MAX_OF_HEIGHT) / HERO_CARD_ASPECT);
    return {
        earthRadius,
        centreX: input.earthX - input.heroLeft,
        centreY,
        cardWidth: plan.cardWidth,
        cardHeight: plan.cardHeight,
        pitch: plan.pitch,
        deckCardWidth: plan.deckCardWidth,
        deckCardHeight: plan.deckCardHeight,
        rowTop: hero(plan.rowTop),
        lineTop: hero(plan.lineTop),
        deckTop: hero(plan.spreadTop),
        stripCardWidth: plan.deckCardWidth,
        stripCardHeight: plan.deckCardHeight,
        stripAdvance: plan.advance,
        stripLift: plan.focusLift,
        stripTop: hero(plan.spreadTop) - stripPad,
        stripPad,
        stripBox: stripPad + plan.deckCardHeight + 6,
        /* the card in focus is pulled the lift UP (and as far left): its middle is the lift above the middle of a card of the deck's spread */
        flyDy: plan.spreadTop - plan.focusLift + plan.deckCardHeight / 2 - (plan.rowTop + plan.cardHeight / 2),
        bleed: input.heroLeft,
        stageWidth: input.stageWidth,
        focusX: input.earthX,
        height: Math.max(0, input.viewportHeight - input.heroTop - HERO_FOLD_INSET),
        cueTop: hero(plan.cueTop),
        sheetMargin: hero(plan.rowBottom) + HERO_SHEET_GAP - Math.max(0, input.viewportHeight - input.heroTop - HERO_FOLD_INSET),
        pendingHeight: centreY + earthRadius + 8,
        sigilDiameter: tarotSigilDiameter(2 * earthRadius),
        revealWidth,
        revealScale: revealWidth / plan.cardWidth,
        startScale: plan.deckCardWidth / plan.cardWidth,
        revealDy: input.viewportHeight * HERO_REVEAL_CENTRE_OF_HEIGHT - (plan.rowTop + plan.cardHeight / 2),
    };
}
/** The CSS custom properties tarotHeroPlacement.ts writes on the hero for a geometry. */
export function heroVariables(g) {
    const px = (value) => `${value.toFixed(2)}px`;
    return {
        '--ko-cx': px(g.centreX),
        '--ko-cy': px(g.centreY),
        '--ko-height': px(g.height),
        '--ko-cue-top': px(g.cueTop),
        '--th-sheet-margin': px(g.sheetMargin),
        '--th-w': px(g.cardWidth),
        '--th-h': px(g.cardHeight),
        '--th-pitch': px(g.pitch),
        '--th-row-top': px(g.rowTop),
        '--th-line-top': px(g.lineTop),
        '--th-deck-top': px(g.deckTop),
        '--th-pending': px(g.pendingHeight),
        '--th-sigil-d': px(g.sigilDiameter),
        '--th-dw': px(g.deckCardWidth),
        '--th-dh': px(g.deckCardHeight),
        '--th-reveal-w': px(g.revealWidth),
        '--th-reveal-h': px(g.revealWidth * HERO_CARD_ASPECT),
        '--th-reveal-s': g.revealScale.toFixed(4),
        '--th-start-s': g.startScale.toFixed(4),
        '--th-reveal-dy': px(g.revealDy),
        '--th-strip-w': px(g.stripCardWidth),
        '--th-strip-h': px(g.stripCardHeight),
        '--th-strip-advance': px(g.stripAdvance),
        '--th-strip-lift': px(g.stripLift),
        '--th-strip-top': px(g.stripTop),
        '--th-strip-pad': px(g.stripPad),
        '--th-strip-box': px(g.stripBox),
        '--th-fly-dy': px(g.flyDy),
        '--th-bleed': px(g.bleed),
        '--th-stage-w': px(g.stageWidth),
        '--th-focus-x': px(g.focusX),
    };
}
/** The names of the variables above that move the whole page when they change (they are held still while the planet is moving). */
export const HERO_FLOW_VARIABLES = Object.freeze(['--ko-height', '--ko-cue-top', '--th-pending']);
/** One keyframe of the riffle: where a card is (about its own place in the pile), as a share of the card's width (across, up) and of its height (down). */
function riffleStep(percent, across, up, down, degrees) {
    /* across: of the card's width, away from the middle on the card's own side (--side is -1 or +1); up: of the card's width; degrees: the tilt of the half it belongs to. */
    return `      ${percent}% { transform: translate(calc(var(--side) * var(--th-dw) * ${across} + var(--j) * 0.6px), calc(var(--n) * -0.9px - var(--th-dw) * ${up} + var(--th-dh) * ${down})) rotate(calc(var(--side) * ${degrees}deg + var(--j) * 0.5deg)); }`;
}
/**
 * The stylesheet. Selectors are doubled on the id like the rest of the interface's glass, so they win against the shared reading rules
 * without !important wars. The hero is also a `.kt-orbit-hero` (numerologyOrbit.ts): that is where the PIN (position: sticky, the
 * reading's sheet is painted over it), the first-screen height (--ko-height), the scroll cue and the fade at the end of the reading
 * come from, so the two heroes behave the same way on the same phone; this sheet only adds what is the Tarot's own.
 */
export function tarotHeroCss() {
    const H = '#place-experience#place-experience .tx-hero';
    const D = '#place-experience#place-experience';
    const rest = 'translate(calc(var(--n) * -0.25px + var(--j) * 0.4px), calc(var(--n) * -0.9px)) rotate(calc(var(--j) * 0.5deg))';
    /* A card's BACK: the interface's night glass - a deep indigo pane with a sheen in the Earth's light and the concentric rings (the same after a half turn, so it
       never shows which cards are reversed). It is the card back of the rest of the interface, brought into the glass family: never a black block. */
    const backFace = `
      background-color: rgb(22, 30, 62);
      background-image:
        linear-gradient(158deg, rgba(150, 178, 245, 0.26) 0%, rgba(120, 150, 230, 0.06) 46%, rgba(120, 150, 230, 0) 100%),
        radial-gradient(circle at 50% 50%, rgba(var(--th-gold), 0.2) 0 13%, transparent 14%),
        repeating-radial-gradient(circle at 50% 50%, rgba(160, 185, 255, 0.035) 0 7px, rgba(160, 185, 255, 0.10) 7px 14px);`;
    const glassFill = `
        linear-gradient(158deg, rgba(255, 255, 255, 0.30) 0%, rgba(208, 224, 255, 0.10) 38%, rgba(120, 150, 230, 0.16) 100%),
        rgba(26, 38, 72, 0.52)`;
    return `
    /* ---------------------------------------------------------------- the flow */
    ${D} .tx[data-tx-flow="hero"] { padding: 0; gap: 0; max-width: none; }
    /* Nothing of the screen scrolls while there is nothing under the hero: the opening screen and the shuffle are the planet's alone. */
    ${D} #tarot-view:has([data-tx-hero="idle"])::after, ${D} #tarot-view:has([data-tx-hero="shuffling"])::after,
    ${D} #tarot-view:has([data-tx-hero="picking"])::after { display: none; }
    /* ...and the room the page keeps under a reading, for the strip to clear, is not needed either: these screens fit the screen exactly. */
    ${D} #tarot-view:has([data-tx-hero="idle"]), ${D} #tarot-view:has([data-tx-hero="shuffling"]),
    ${D} #tarot-view:has([data-tx-hero="picking"]) { padding-bottom: 0; }

    ${H} {
      --ko-stick: 0px;
      --th-rim: 214, 230, 255;
      --th-glow: 132, 168, 255;
      --th-gold: 238, 214, 150;
      --th-sigil-d: 112px; --th-dw: 100px; --th-dh: 160px; --th-reveal-s: 2.5; --th-start-s: 1.25; --th-reveal-dy: 40px; --th-reveal-w: 224px; --th-reveal-h: 358px;
      --th-w: 110px; --th-h: 176px; --th-pitch: 118px;
      --th-row-top: 300px; --th-line-top: 520px; --th-deck-top: 580px; --th-fly-dy: 260px;
      --th-strip-w: 110px; --th-strip-h: 176px; --th-strip-advance: 14px; --th-strip-lift: 32px;
      --th-strip-top: 540px; --th-strip-pad: 38px; --th-strip-box: 220px;
      --th-bleed: 18px; --th-stage-w: 412px; --th-focus-x: 206px;
      overflow: visible;
    }
    ${H}[data-tx-hero="pending"] { height: var(--th-pending, 320px); }
    /* A card jumped out and there is a question to answer: the planet alone, and the question on its own pane directly under it, whole on the first screen. */
    ${H}[data-tx-hero="pending"] .th-deck { display: none; }
    ${D} .tx-hero[data-tx-hero="pending"] + .tx-sheet { margin-top: 0; padding: 0 0 12px; background: none; border: 0; box-shadow: none; backdrop-filter: none; -webkit-backdrop-filter: none; }
    ${D} .tx-hero[data-tx-hero="pending"] + .tx-sheet .tx-jumper { padding: 13px 16px 14px; }
    ${D} .tx-hero[data-tx-hero="pending"] + .tx-sheet .tx-jumper .tx-button { min-height: 40px; }
    ${D} .tx-hero[data-tx-hero="pending"] + .tx-sheet .tx-jumper-card { display: none; }
    ${D} .tx-hero[data-tx-hero="pending"] + .tx-sheet .tx-jumper h2 { margin-bottom: 6px; }
    ${D} .tx-hero[data-tx-hero="pending"] + .tx-sheet .tx-jumper p { margin-bottom: 10px; font-size: 13px; line-height: 1.42; }
    ${H} > * { pointer-events: auto; }
    ${H}[data-orbit-done] > * { pointer-events: none; }

    ${tarotSigilCss(H)}

    /* ------------------------------------------------------------------ the pile (opening and shuffle)
       One pack of card backs, squared up, the size of the cards that follow. It is a button on the opening screen (a tap shuffles - the way in for
       a phone that cannot be shaken). It breathes a little and carries a soft light beneath it. The backs are the interface's night glass: an indigo
       pane with a bright thin rim and a gold ring, never a black block. */
    ${H} .th-deck {
      position: absolute;
      left: calc(var(--ko-cx, 50%) - var(--th-dw) / 2);
      top: var(--th-deck-top);
      width: var(--th-dw);
      height: var(--th-dh);
      margin: 0; padding: 0; border: 0; background: none; color: inherit; font: inherit;
      -webkit-tap-highlight-color: transparent;
    }
    ${H} button.th-deck { cursor: pointer; }
    ${H} button.th-deck:focus-visible { outline: 2px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.9); outline-offset: 10px; border-radius: 14px; }
    ${H} .th-deck-stack { position: absolute; inset: 0; }
    ${H}[data-tx-hero="idle"] .th-deck { animation: th-breathe 6.5s ease-in-out infinite; }
    ${H} .th-deck::before {
      content: ''; position: absolute; left: 50%; top: 56%; width: calc(var(--th-dw) * 2.5); height: calc(var(--th-dw) * 1.5);
      transform: translate(-50%, -50%); border-radius: 50%; pointer-events: none;
      background: radial-gradient(closest-side, rgba(var(--th-gold), 0.16), rgba(var(--th-glow), 0.10) 52%, transparent 100%);
      opacity: 0.9;
    }
    ${H}[data-tx-hero="shuffling"] .th-deck::before { animation: th-deck-glow 1.3s ease-in-out both; }
    ${H}[data-tx-hero="shuffling"] .th-deck { animation: th-grip 1.3s ease-in-out both; }
    ${H} .th-deck-card {
      position: absolute; inset: 0; width: 100%; height: auto; aspect-ratio: auto;
      transform: ${rest};
      border-radius: calc(var(--th-dw) * 0.075);
      ${backFace}
      border: 1px solid rgba(var(--th-rim), 0.52);
      box-shadow: inset 0 0 0 4px rgba(14, 20, 44, 0.85), inset 0 0 0 5px rgba(var(--th-rim), 0.16), 0 1px 3px rgba(0, 0, 0, 0.5);
    }
    ${H} .th-deck-card .tx-back-ring { border-color: rgba(var(--th-gold), 0.6); }
    ${H} .th-deck-card-${16} { box-shadow: inset 0 0 0 4px rgba(18, 24, 50, 0.85), inset 0 0 0 5px rgba(var(--th-rim), 0.22), 0 8px 18px rgba(0, 0, 0, 0.5), 0 0 18px rgba(var(--th-glow), 0.26); }
    ${H}[data-tx-hero="shuffling"] .th-deck-card {
      animation: th-riffle ${HERO_RIFFLE_CARD_MS}ms cubic-bezier(0.45, 0, 0.3, 1) both;
      animation-delay: calc(var(--slot, 0) * ${HERO_RIFFLE_SLOT_MS}ms);
      will-change: transform;
    }

    /* THE RIFFLE. The pack is cut in two (--side is -1 for one half, +1 for the other), each half is drawn away and tilted in, like a hand
       holding it; then the cards ride across one at a time, alternately from the two halves (--slot is a card's turn: the cards are started
       ${HERO_RIFFLE_SLOT_MS} ms apart, in that order), and drop into one another so that the edges are woven; the pack is squared up. Then the same
       again, smaller and quicker. Every card is a whole card the size of the ones that follow: it is seen, and plainly a deck being mixed. */
    @keyframes th-riffle {
      0% { transform: ${rest}; }
${riffleStep(9, 0.34, 0, 0, -3)}
${riffleStep(19, 0.7, 0.03, -0.02, -9)}
${riffleStep(31, 0.38, 0.32, -0.04, 5)}
${riffleStep(43, 0.05, 0.02, 0, 1)}
      49% { transform: ${rest}; }
${riffleStep(58, 0.52, 0.03, -0.015, -7)}
${riffleStep(69, 0.22, 0.24, -0.03, 3.5)}
${riffleStep(80, 0.03, 0.02, 0, 0.8)}
      90%, 100% { transform: ${rest}; }
    }
    @keyframes th-breathe { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
    @keyframes th-grip { 0% { transform: translateY(0); } 8% { transform: translateY(-7px); } 20%, 82% { transform: translateY(-3px); } 100% { transform: translateY(0); } }
    @keyframes th-deck-glow { 0% { opacity: 0.4; } 30% { opacity: 1; } 100% { opacity: 0.9; } }

    /* ------------------------------------------------------------------ line
       The one thing the opening screen says; while choosing, the instruction that stands under the row and over the deck. */
    ${H} .th-line {
      position: absolute; left: 0; right: 0; top: var(--th-line-top, 0px); height: 24px; margin: 0; padding: 0 12px;
      display: flex; align-items: center; justify-content: center;
      text-align: center; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(12.5px, 4.1vw, 15.5px); line-height: 1.2; letter-spacing: 0.035em;
      color: rgba(246, 244, 238, 0.95);
      text-shadow: 0 0 14px rgba(var(--th-glow), 0.32), 0 1px 6px rgba(4, 7, 13, 0.9);
      text-wrap: balance; pointer-events: none;
      animation: th-line-in 0.9s ease-out both;
    }
    ${H}[data-tx-hero="shuffling"] .th-line { opacity: 0; animation: none; }
    /* The line that comes with the spread waits for the deck to open (it is the same element that goes on asking for the first card). While a card is being shown it is not drawn;
       when the card has landed (the stage changes) it comes back. */
    ${H} .th-line.is-late { animation-delay: ${Math.round(HERO_SPREAD_MS * 0.6)}ms; }
    ${H}[data-th-stage^="revealing"] .th-line { opacity: 0; animation: none; }
    @keyframes th-line-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

    /* ------------------------------------------------------------------- the row
       Three places side by side, centred on the Earth, the same size as the cards of the deck. Each place is a point (the card's centre); the card is hung
       from it. The row does not move: not while choosing, not when the third card has landed. */
    ${H} .th-row { position: absolute; left: 0; top: 0; width: 0; height: 0; margin: 0; padding: 0; list-style: none; pointer-events: none; }
    ${H} .th-slot {
      position: absolute; width: 0; height: 0;
      left: calc(var(--ko-cx, 50%) + (var(--i) - 1) * var(--th-pitch));
      top: calc(var(--th-row-top) + var(--th-h) / 2);
      pointer-events: none;
      /* The flight of a card the person has just taken: from the card in focus in the deck, which stands centred on the screen, up to its place. */
      --th-fx: calc(-1 * (var(--i) - 1) * var(--th-pitch));
      --th-fy: var(--th-fly-dy);
      --th-ry: var(--th-reveal-dy);
    }
    /* The card that has just been taken is in front of everything of the picture (and the scrim, which dims the rest, is just behind it). */
    ${H} .th-slot[data-th-fresh] { z-index: 6; }
    ${H} .th-fly {
      position: absolute; left: calc(var(--th-w) / -2); top: calc(var(--th-h) / -2); width: var(--th-w); height: var(--th-h);
      pointer-events: none;
    }
    /* THE REVEAL: forward from the deck to the middle of the screen, large; turned over there and held; then to its place in the row. The card is LAID OUT at the large
       size (its type, its symbol and its rim are drawn at the size they are seen at) and scaled DOWN to the deck's card and then to the row's: a card scaled UP from a small one
       would be drawn blocky. When the reveal is over the slot goes back to the row's size and the card is drawn at that size again. */
    ${H} .th-slot[data-th-fresh] .th-fly { --th-w: var(--th-reveal-w); --th-h: var(--th-reveal-h); animation: th-reveal ${HERO_REVEAL_MS}ms both; perspective: calc(var(--th-w) * 4.5); will-change: transform; }
    ${H} .th-flip { position: absolute; inset: 0; pointer-events: auto; }
    /* Only a card that is turning is a 3D layer (and so cannot be blurred behind); a card that has landed is flat and has its glass. */
    ${H} .th-slot[data-th-fresh] .th-flip { transform-style: preserve-3d; animation: th-flip 0.43s cubic-bezier(0.3, 0.1, 0.2, 1) ${Math.round(HERO_REVEAL_MS * 0.26)}ms both; }
    ${H} .th-back, ${H} .th-flip .tx-face { position: absolute; inset: 0; width: 100%; height: 100%; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
    ${H} .th-back {
      transform: rotateY(180deg); aspect-ratio: auto; border-radius: calc(var(--th-w) * 0.075);
      ${backFace}
      border: 1px solid rgba(var(--th-rim), 0.52);
    }
    ${H} .th-slot:not([data-th-fresh]) .th-back { display: none; }
    @keyframes th-reveal {
      0% { transform: translate(var(--th-fx), var(--th-fy)) scale(calc(var(--th-start-s) / var(--th-reveal-s))); animation-timing-function: cubic-bezier(0.2, 0.8, 0.25, 1); }
      26% { transform: translate(var(--th-fx), var(--th-ry)) scale(1); animation-timing-function: linear; }
      74% { transform: translate(var(--th-fx), var(--th-ry)) scale(1); animation-timing-function: cubic-bezier(0.5, 0, 0.2, 1); }
      100% { transform: translate(0, 0) scale(calc(1 / var(--th-reveal-s))); }
    }
    ${H} .th-scrim {
      position: absolute; left: calc(var(--th-bleed) * -1); width: var(--th-stage-w); top: 0; height: 100%; z-index: 5; pointer-events: none;
      background: radial-gradient(ellipse at 50% 46%, rgba(4, 7, 16, 0.34) 0%, rgba(4, 7, 16, 0.68) 100%);
      animation: th-scrim ${HERO_REVEAL_MS}ms ease-in-out both;
    }
    @keyframes th-scrim { 0% { opacity: 0; } 20% { opacity: 1; } 74% { opacity: 1; } 100% { opacity: 0; } }
    /* While it is shown the card is much more solid (a pane you can read, not glass you see the Earth through), and the instruction under it is not drawn. */
    ${H} .th-slot[data-th-fresh] .tx-face { animation: th-solid ${HERO_REVEAL_MS}ms both; }
    @keyframes th-solid { 0% { background-color: rgba(26, 38, 72, 0.52); } 24% { background-color: rgba(24, 34, 68, 0.94); } 76% { background-color: rgba(24, 34, 68, 0.94); } 100% { background-color: rgba(26, 38, 72, 0.52); } }
    /* While the deck is opening or a card is being shown (or the deck is going) nothing is taken: the hero's stage says so, in one place. */
    ${H}[data-th-stage="spreading"] .th-strip, ${H}[data-th-stage^="revealing"] .th-strip, ${H}[data-th-stage="complete"] .th-strip,
    ${H}[data-th-stage^="revealing"] .th-flip, ${H}[data-th-stage="complete"] .th-flip { pointer-events: none; }
    @keyframes th-flip { from { transform: rotateY(180deg); } to { transform: rotateY(0deg); } }

    /* There is NO place held for a card that has not been taken: the row is empty - the Earth alone - until the first card is, and is drawn one card at a time. */

    /* ------------------------------------------------------------- the picker
       The numbered strip's own mechanics (tarotCardPicker.ts and the numbered flow's rules), drawn as a DENSE deck: its cards are the deck's size, each shows a
       narrow strip of itself beside the next (the later card over the earlier, as in a real spread), and only the card in focus stands out: it keeps its place in
       the deck and is PULLED OUT of it diagonally, by the same distance UP and to the LEFT (--th-strip-lift, a fifth of its height). It is not turned, not
       scaled and not brought in front of its neighbours - the cards after it still lie over its body - so what shows of it is its top, with its NUMBER IN THE
       TOP-LEFT CORNER, and a band down its left edge: the deck keeps one angle and one perspective. The other places' numbers are not shown: they mean nothing
       about the cards.

       WHICH CARD STANDS OUT is the card the picker has in focus - the selectable card nearest the geometric focus point (tarotDeckFocus.ts), read from the scroll position in the
       scroll event itself - and what is drawn eases for a moment (see the pull-out below); the focus itself never waits for it. */
    ${H} .th-strip {
      position: absolute; left: calc(var(--th-bleed) * -1); width: var(--th-stage-w); z-index: 2;
      top: var(--th-strip-top); height: var(--th-strip-box);
    }
    ${H} .th-strip .tx-picker {
      --tx-card-w: var(--th-strip-w); --tx-card-h: var(--th-strip-h); --tx-advance: var(--th-strip-advance);
      display: block; height: 100%; gap: 0;
    }
    ${H} .th-strip .tx-deck {
      height: 100%; margin: 0;
      /* The place in focus is the one whose card, once pulled out (left by the lift), is CENTRED on the Earth's axis: the first item begins half a card left of the axis
         plus the lift. The room after the last item lets the LAST place be scrolled to that same axis (the cards that overflow the last item do not count as room). */
      padding: var(--th-strip-pad) max(calc(100% - var(--th-focus-x) + var(--tx-card-w) / 2 - var(--th-strip-lift) - var(--tx-advance)), 0px) 6px calc(var(--th-focus-x) - var(--tx-card-w) / 2 + var(--th-strip-lift));
    }
    ${H} .th-strip .tx-slot {
      border-radius: calc(var(--tx-card-w) * 0.075);
      ${backFace}
      border: 1px solid rgba(var(--th-rim), 0.5);
      box-shadow: inset 0 0 0 3px rgba(14, 20, 44, 0.85), inset 0 0 0 4px rgba(var(--th-rim), 0.14), -4px 0 7px rgba(0, 0, 0, 0.45);
    }
    ${H} .th-strip .tx-slot-ring { border-color: rgba(var(--th-gold), 0.6); }
    /* The numbered flow's own focus look (a lift, a scale, a gold outline) is not the hero's: the card in focus is drawn only by the pull-out and the rim below. */
    ${H} .th-strip .tx-deck li.is-focus .tx-slot:not(:disabled) {
      transform: none; outline: none; border-color: rgba(var(--th-rim), 0.5);
      box-shadow: inset 0 0 0 3px rgba(14, 20, 44, 0.85), inset 0 0 0 4px rgba(var(--th-rim), 0.14), -4px 0 7px rgba(0, 0, 0, 0.45);
    }
    /* A place whose card has been taken is EMPTY: the card is gone from the deck, and the card under it shows where it was, as in a real spread. (A card that is only
       not to be taken for now - the deck while the last card is shown, or going - is still a card of the deck: disabled, and drawn.) */
    ${H} .th-strip .tx-slot.is-chosen, ${H} .th-strip .tx-slot.is-unavailable { visibility: hidden; pointer-events: none; }
    ${H} .th-strip .tx-slot:disabled { pointer-events: none; }
    /* THE NUMBER: in the TOP-LEFT CORNER of the card, always - a fixed inset from the card's own top and left edges, never centred. Seen only on the card in focus. */
    ${H} .th-strip .tx-slot-number {
      display: block; position: absolute; left: max(7px, calc(var(--tx-card-w) * 0.075)); top: max(7px, calc(var(--tx-card-h) * 0.042)); width: auto;
      text-align: left; font-size: clamp(12px, calc(var(--tx-card-w) * 0.125), 17px); font-weight: 700; line-height: 1; letter-spacing: 0; font-variant-numeric: tabular-nums;
      color: rgba(255, 253, 248, 1); text-shadow: 0 0 8px rgba(var(--th-gold), 0.9), 0 1px 2px rgba(0, 0, 0, 0.8);
      opacity: 0; pointer-events: none;
    }
    /* THE RIM of the card in focus: a thin gold line and a soft glow, an overlay that is only seen on the card in focus. */
    ${H} .th-strip .tx-slot:not(:disabled)::after {
      content: ''; position: absolute; inset: -1px; border-radius: inherit; pointer-events: none; opacity: 0;
      border: 1.5px solid rgba(var(--th-gold), 0.95); box-shadow: 0 0 14px rgba(var(--th-gold), 0.38), -3px -3px 14px rgba(var(--th-gold), 0.24);
    }
    /* THE PULL-OUT, with a short physical ease. The card the picker has in focus (the class is set in the scroll event itself, from the one focus model - the focus is exact and
       immediate; only what is DRAWN eases) slides up and to the left by the same distance in 150 ms; the card that loses the focus goes back into the deck in 80 ms. Transform only
       (translate), the rim and the number fade with it. A transition is not a queue: a card that gains the focus and loses it again while it is still moving simply turns round, so
       in a fast flick nothing is waited for, nothing piles up, and the card that ends the flick is the one that slides out. While the deck is still a pile that is opening nothing is pulled. */
    ${H} .th-strip .tx-slot { transition: translate 80ms cubic-bezier(0.4, 0, 0.7, 1); }
    ${H} .th-strip .tx-slot:not(:disabled)::after, ${H} .th-strip .tx-slot-number { transition: opacity 90ms ease-out; }
    ${H}:is([data-th-stage^="pick"], [data-th-stage="revealingEnergy"], [data-th-stage="revealingFactor"]) .th-strip .tx-deck li.is-focus .tx-slot:not(:disabled) {
      translate: calc(var(--th-strip-lift) * -1) calc(var(--th-strip-lift) * -1); transition: translate 150ms cubic-bezier(0.2, 0.8, 0.25, 1);
    }
    ${H}:is([data-th-stage^="pick"], [data-th-stage="revealingEnergy"], [data-th-stage="revealingFactor"]) .th-strip .tx-deck li.is-focus .tx-slot:not(:disabled)::after, ${H}:is([data-th-stage^="pick"], [data-th-stage="revealingEnergy"], [data-th-stage="revealingFactor"]) .th-strip .tx-deck li.is-focus .tx-slot-number { opacity: 1; }
    /* Taking it: the card is pulled a little further out (the same way) before it leaves for the middle of the screen. */
    ${H} .th-strip .tx-deck li.is-picking .tx-slot:not(:disabled) { transform: translate(calc(var(--th-strip-lift) * -0.5), calc(var(--th-strip-lift) * -0.5)); transition: transform 0.16s ease-out; }
    /* While the deck is still a pile that is opening, and once the third card is taken (it is on its way to its place; then the deck goes): nothing stands out of the deck. */
    ${H}[data-th-stage="spreading"] .th-strip .tx-deck li .tx-slot, ${H}[data-th-stage="spreading"] .th-strip .tx-deck li .tx-slot::after, ${H}[data-th-stage="spreading"] .th-strip .tx-deck li .tx-slot-number,
    ${H}[data-th-stage="revealingGuidance"] .th-strip .tx-deck li .tx-slot, ${H}[data-th-stage="revealingGuidance"] .th-strip .tx-deck li .tx-slot::after, ${H}[data-th-stage="revealingGuidance"] .th-strip .tx-deck li .tx-slot-number,
    ${H}[data-th-stage="complete"] .th-strip .tx-deck li .tx-slot, ${H}[data-th-stage="complete"] .th-strip .tx-deck li .tx-slot::after, ${H}[data-th-stage="complete"] .th-strip .tx-deck li .tx-slot-number { animation: none; translate: none; }
    ${H}[data-th-stage="spreading"] .th-strip .tx-deck li .tx-slot::after, ${H}[data-th-stage="spreading"] .th-strip .tx-deck li .tx-slot-number,
    ${H}[data-th-stage="revealingGuidance"] .th-strip .tx-deck li .tx-slot::after, ${H}[data-th-stage="revealingGuidance"] .th-strip .tx-deck li .tx-slot-number,
    ${H}[data-th-stage="complete"] .th-strip .tx-deck li .tx-slot::after, ${H}[data-th-stage="complete"] .th-strip .tx-deck li .tx-slot-number { opacity: 0; }

    /* THE DEALER'S SPREAD. The pile has been squared up; the strip opens out of it. Each card that is on the screen has been told (tarotDealerSpread.ts) where it lies in the
       pile relative to its place in the strip (--sx, --sy) and when it begins (--sd: the card nearest the pile first, the farthest ${HERO_SPREAD_STAGGER_MS} ms later), and
       slides to its place along one smooth curve - a quick start and a long, soft arrival. Only \`translate\` moves: compositor work, nothing laid out. */
    @keyframes th-spread { from { translate: var(--sx) var(--sy); } to { translate: 0px 0px; } }
    ${H}[data-th-stage="spreading"] .th-strip .tx-deck li[data-th-spread] {
      animation: th-spread ${HERO_SPREAD_CARD_MS}ms cubic-bezier(0.22, 0.84, 0.28, 1) var(--sd, 0ms) both; will-change: translate;
    }
    /* THE DECK GOES: the same motion drawn backwards, the farthest card first, back into a pile - and out, so that what is left of it is a card that fades. */
    @keyframes th-gather { from { translate: 0px 0px; opacity: 1; } 45% { opacity: 1; } to { translate: var(--sx) var(--sy); opacity: 0; } }
    ${H}[data-th-stage="complete"] .th-strip .tx-deck li[data-th-gather] {
      animation: th-gather ${HERO_GATHER_CARD_MS}ms cubic-bezier(0.55, 0, 0.3, 1) var(--sd, 0ms) both; will-change: translate, opacity;
    }
    ${H}[data-th-stage="complete"] .th-strip .tx-deck li:not([data-th-gather]) { opacity: 0; }
    /* The button that takes the card in focus stays in the page for a keyboard and a screen reader; the card itself is what is tapped. */
    ${H} .th-strip .tx-pick {
      position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0;
    }

    /* ------------------------------------------------------------ the cards
       Glass, in the Earth's own light: a milky indigo pane that lets the planet show through and blurs it, a bright thin rim on the upper left where the Sun is,
       a soft sheen, and the card's name and emblem in near white - the same family as the MENU capsule and the interface's panels. */
    ${H} .th-slot .tx-face {
      margin: 0; padding: 9% 7% 7%; border-radius: calc(var(--th-w) * 0.075); overflow: hidden; position: relative;
      background:${glassFill};
      backdrop-filter: blur(12px) saturate(1.25); -webkit-backdrop-filter: blur(12px) saturate(1.25);
      border: 1px solid rgba(var(--th-rim), 0.66);
      box-shadow:
        inset 0 0 0 1px rgba(255, 255, 255, 0.10),
        inset 3px 4px 12px -4px rgba(255, 255, 255, 0.42),
        inset 0 -10px 18px -8px rgba(110, 150, 240, 0.28),
        0 10px 24px rgba(6, 10, 24, 0.5),
        0 0 20px rgba(var(--th-glow), 0.30);
      color: rgba(250, 252, 255, 0.98);
      cursor: pointer;
    }
    ${H} .th-slot[data-th-fresh] .tx-face { backdrop-filter: none; -webkit-backdrop-filter: none; }
    ${H} .th-slot .tx-face::before {
      content: ''; position: absolute; inset: 0; pointer-events: none; border-radius: inherit;
      background: linear-gradient(118deg, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0.10) 24%, rgba(255, 255, 255, 0) 46%);
    }
    ${H} .th-slot .tx-face-role, ${H} .th-slot .tx-face-mark { display: none; }
    ${H} .th-slot .tx-emblem {
      width: 52%; max-width: none; margin: 12% 0 0;
      stroke: rgba(var(--th-gold), 0.98); stroke-width: 2.1; filter: drop-shadow(0 0 6px rgba(var(--th-gold), 0.45));
    }
    ${H} .th-slot .tx-face-title {
      font-size: clamp(9px, calc(var(--th-w) * 0.125), 32px); line-height: 1.18; padding: 2px 0 4px;
      /* A name is never broken inside a word ("Penta / cles"): it wraps between words, as evenly as the width allows. */
      text-wrap: balance; overflow-wrap: normal; word-break: keep-all; hyphens: none;
      text-shadow: 0 0 8px rgba(var(--th-glow), 0.45), 0 1px 3px rgba(4, 7, 13, 0.7);
    }
    ${H} .th-slot .tx-face-state { font-size: clamp(7px, calc(var(--th-w) * 0.085), 20px); color: rgba(236, 244, 255, 0.82); }
    ${H} .th-slot .tx-face-state.is-reversed { color: rgba(var(--th-gold), 1); }
    ${H} .th-slot .tx-face:active { transform: scale(0.97); }
    ${H} .th-slot .tx-face:focus-visible { outline: 2px solid rgba(var(--th-gold), 0.95); outline-offset: 3px; }

    /* ------------------------------------------------------------- the sheet
       What was dealt is READ on a panel of glass that rises over the pinned hero when the person scrolls: the cards and the planet stay where they are and the
       reading goes over them. */
    ${D} .tx-sheet {
      position: relative; z-index: 2; display: flex; flex-direction: column; gap: 16px;
      margin: ${HERO_FOLD_INSET + HERO_FOLD_CLEARANCE}px 0 0; padding: 22px 16px 26px;
      border-radius: 24px 24px 0 0;
      border: 1px solid var(--kt-surface-line, rgba(255, 255, 255, 0.12)); border-bottom: 0;
      background: rgba(var(--kt-surface-fill-rgb, 10, 12, 16), 0.78);
      backdrop-filter: blur(18px) saturate(1.08); -webkit-backdrop-filter: blur(18px) saturate(1.08);
      box-shadow: 0 -12px 40px rgba(2, 4, 10, 0.5);
    }
    /* THE READING BEGINS UNDER THE ROW. On the completed screen the sheet is pulled up over the hero's empty foot (the deck has gone) so that its first section is in the first
       screen, directly under the three cards, and says by being there that there is more: no cue is needed. It rises into place as the deck gathers (a calm fade and rise,
       no scrolling), and the page is exactly where it was. The placement script writes the margin on the sheet as well as on the hero (the sheet is not inside the hero). */
    ${D} .tx-hero[data-tx-hero="complete"] + .tx-sheet { margin-top: var(--th-sheet-margin, ${HERO_FOLD_INSET + HERO_FOLD_CLEARANCE}px); padding-top: 16px; }
    @keyframes th-sheet-rise { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
    ${D} .tx-hero[data-th-stage="complete"] + .tx-sheet { animation: th-sheet-rise ${HERO_SHEET_RISE_MS}ms cubic-bezier(0.22, 0.7, 0.2, 1) ${HERO_SHEET_RISE_DELAY_MS}ms both; }
    /* MENU COVERS NO LINE OF THE READING. While a reading is on screen the reading's scroll region ENDS above the MENU capsule (its bottom edge is lifted to the capsule's top less a
       small clear space - the placement script measures the capsule and writes the room, --th-menu-room, on the surface; the hero's own plan still uses the whole screen, so nothing
       of the Earth or the row moves): text scrolls away at that edge and is never under the capsule. The edge dissolves (a soft dark fade in the capsule's own container, which holds
       still while the page scrolls) instead of cutting a line. The last of the page needs no room for the capsule any more. */
    ${D} #tarot-view:has([data-tx-hero="complete"]) { bottom: var(--th-menu-room, 0px); padding-bottom: 20px; }
    ${D} #tarot-nav::before {
      content: ''; position: absolute; left: 0; right: 0; bottom: 0; pointer-events: none; opacity: 0; transition: opacity 0.5s ease-out;
      height: calc(var(--th-menu-room, 0px) + 26px);
      background: linear-gradient(to bottom, rgba(6, 8, 14, 0) 0, rgba(6, 8, 14, 0.88) 26px, rgba(6, 8, 14, 0.5) calc(26px + var(--th-menu-room, 0px) * 0.55), rgba(6, 8, 14, 0.12) 100%);
    }
    ${D}:has(.tx-hero[data-tx-hero="complete"]) #tarot-nav::before { opacity: 1; }
    /* A card jumped out of the deck: there is a question to answer, so the sheet is right under the deck, in the first screen. */
    ${D} .tx-sheet .tx-short, ${D} .tx-sheet .tx-full, ${D} .tx-sheet .tx-synthesis, ${D} .tx-sheet .tx-takeaway { background: rgba(255, 255, 255, 0.04); backdrop-filter: none; -webkit-backdrop-filter: none; }
    ${D} .tx-sheet .tx-jumper { text-align: center; }

    @media (prefers-reduced-motion: reduce) {
      ${H} .th-fly, ${H} .th-flip, ${H} .th-deck, ${H} .th-deck-card, ${H} .th-deck::before, ${H} .th-line, ${H} .th-strip,
      ${H}[data-th-stage] .th-strip .tx-deck li { animation: none; }
      ${H} .th-scrim { display: none; }
      ${tarotSigilReducedCss(H)}
      ${D} #tarot-nav::before { transition: none; }
      ${H}[data-th-stage="complete"] .th-strip { display: none; }
      ${D} .tx-hero[data-th-stage="complete"] + .tx-sheet { animation: none; }
      /* The cards simply are where they go. The reduced-motion shuffle is a still moment, so the change of screen is still explained. */
      ${H} .th-back { display: none; }
      ${H} .th-slot[data-th-fresh] { animation: th-appear 0.4s ease-out both; }
      ${H} .th-slot[data-th-fresh] .tx-face { animation: none; }
      ${H} .th-slot[data-th-fresh] .th-flip { transform-style: flat; }
      ${H} .th-strip .tx-slot, ${H} .th-strip .tx-slot:not(:disabled)::after, ${H} .th-strip .tx-slot-number { transition: none; }
    }
    @keyframes th-appear { from { opacity: 0; } to { opacity: 1; } }
  `;
}
