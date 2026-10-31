import { CARD_APART_X, CARD_BODY_ALPHA, CARD_CENTRE_Y, CARD_GLOW_ALPHA, CARD_GLOW_WIDTH, CARD_JOINED_X, CARD_LINE_ALPHA, CARD_LINE_WIDTH, CARD_TILT, HEART_CENTRE, HEART_GLOW_ALPHA, HEART_GLOW_WIDTH, HEART_LINE_ALPHA, HEART_LINE_WIDTH, } from './connectionsHeartGeometry.js?v=2ea79e9';
/*
 * THE CONNECTIONS TILE'S ICON - ITS LIGHT AND ITS MOTION.
 *
 * The markup is premiumMenuScreen.ts's connectionsArt() and the geometry is connectionsHeartGeometry.ts. This is the
 * stylesheet, kept in its own module on purpose: menuExperience.ts is pinned to have no motion system, no animation and no
 * custom property of its own, and the menu's tests hold it to that. The icon is the one thing on the menu that moves, so the
 * motion lives here, scoped to the icon's own classes, and menuExperience.ts only includes this text in the stylesheet it
 * already injects.
 *
 * ONE STORY, ONE CLOCK. Everything runs on a single 7.8s timeline, so the loop cannot drift and the parts always agree:
 *
 *   0.00 - 0.50   TWO CARDS      two upright menu-card silhouettes, apart, quietly lit. A held breath.
 *   0.50 - 1.75   MAGNETIC PULL  the cards move toward each other, ease-in, so they accelerate as a magnet pulls harder
 *                                near contact, and lean in as they come: 12 degrees by the time they are close, 45 as they
 *                                meet - the left turning counter-clockwise and the right clockwise, bottoms together.
 *   1.75 - 1.95   SNAP           they arrive a hair past their seat and settle back into it with ease-out - the click - and
 *                                the whole thing gives one small swell.
 *   1.70 - 2.10   FORMS          the heart's single clean outline fades in as the cards' own lines drop to a faint trace.
 *                                The join stays quietly visible: two cards made this heart.
 *   2.10 - 2.50   AT REST        the formed heart holds perfectly still: the snap and the merge are finished, and nothing moves
 *                                for 0.4s, so the beat reads as the heart coming alive and not as the end of the join.
 *   2.50 - 6.40   THE HEART      it beats three times, 1.5s apart (2.7, 4.2, 5.7): charge, lub, settle, dub, rest. Its glow
 *                                rises and falls with each beat. This is all it does: nothing leaves it.
 *   6.60 - 7.80   COMES APART    the heart outline fades away and the cards ease back to where they began, the lines coming
 *                                back up as they go. No pop: the last frame is the first.
 *
 * (Earlier versions also sent heart-shaped sonar pulses out of the heart, through a clipping layer the size of the tile.
 * The owner asked for that to be taken away; it is in the history, last at 57c6013.)
 *
 * Opacity and transform only, on five small groups: nothing in script, no filter, no shadow, no layout. Ease-in-out is the
 * scroll chevrons' soft family; ease-in only where something is being pulled, ease-out only where something settles.
 *
 * SIZE. The icon box is 96% of its tile's width, capped at 104px; the tile is a size container, so the icon follows the
 * card on a narrower phone. In it the cards are 15.4 x 26.4 units and the heart 37 units wide - about 76px on the 112px tile.
 *
 * LESS MOTION. A device that asks for it gets the finished heart, still, with the faint trace of the two cards in it, and
 * no loop and no beat.
 */
/**
 * THE MENU'S LINE-ART LIGHT, shared with the Forecast card (forecastMenuStyle.ts) so that the two animated cards on the menu are one family: a
 * near-white blue for the line and a soft periwinkle for the glow, as r, g, b. The text of CONNECTIONS_HEART_CSS is exactly what it was before
 * these were named (a test holds its digest).
 */
export const MENU_LINE_HOT_RGB = '226, 238, 255';
export const MENU_LINE_GLOW_RGB = '150, 168, 255';
/** The whole story in seconds, and the same figures as percentages of it. */
const PERIOD = 7.8;
const pct = (seconds) => `${+((seconds / PERIOD) * 100).toFixed(2)}%`;
const HOLD = 0.5;
const PULL_MID = 1.15;
const SNAP = 1.75;
const SETTLED = 1.95;
const FORMED = 2.1;
/**
 * The beats: the first 0.6s after the heart has finished forming (FORMED), then every 1.5s. A beat's charge (the slight
 * contraction before the lub) begins 0.2s before the beat's own time, so the heart is perfectly still until 2.5s.
 */
const BEATS = [2.7, 4.2, 5.7];
const APART_AGAIN = 6.6;
/** The card's seat, in user units of the 48-unit box. The right card is the left mirrored about x = 24. */
const CY = +CARD_CENTRE_Y.toFixed(3);
const mirror = (x) => +(48 - x).toFixed(3);
const placed = (x, degrees) => `translate(${+x.toFixed(3)}px, ${CY}px) rotate(${degrees}deg)`;
function cardKeyframes(name, side) {
    const at = (x) => (side === 1 ? x : mirror(x));
    const apart = placed(at(CARD_APART_X), 0);
    const middle = placed(at(CARD_APART_X + (CARD_JOINED_X - CARD_APART_X) * 0.62), -12 * side);
    const past = placed(at(CARD_JOINED_X + 0.75), -CARD_TILT * side);
    const joined = placed(at(CARD_JOINED_X), -CARD_TILT * side);
    return `
    @keyframes ${name} {
      0%, ${pct(HOLD)} { transform: ${apart}; animation-timing-function: ease-in; }
      ${pct(PULL_MID)} { transform: ${middle}; animation-timing-function: ease-in; }
      ${pct(SNAP)} { transform: ${past}; animation-timing-function: ease-out; }
      ${pct(SETTLED)}, ${pct(APART_AGAIN)} { transform: ${joined}; animation-timing-function: ease-in-out; }
      100% { transform: ${apart}; }
    }`;
}
/** The beat: charge, lub, settle, dub, rest. */
function beatSteps(start) {
    return `
      ${pct(start)} { transform: scale(0.975); }
      ${pct(start + 0.135)} { transform: scale(1.08); }
      ${pct(start + 0.3)} { transform: scale(0.995); }
      ${pct(start + 0.45)} { transform: scale(1.045); }
      ${pct(start + 0.68)} { transform: scale(1); }`;
}
/** The glow's own beat: it rises with the lub, dips, rises a little with the dub and settles. */
function glowSteps(start) {
    return `
      ${pct(start)} { opacity: 0.55; }
      ${pct(start + 0.135)} { opacity: 1; }
      ${pct(start + 0.3)} { opacity: 0.68; }
      ${pct(start + 0.45)} { opacity: 0.88; }
      ${pct(start + 0.68)} { opacity: 0.55; }`;
}
export const CONNECTIONS_HEART_CSS = `
    #place-experience .kt-menu-heart {
      display: block;
      width: min(104px, 96cqw);
      height: min(104px, 96cqw);
      overflow: visible;
      pointer-events: none;
      --kt-hr-hot: ${MENU_LINE_HOT_RGB};
      --kt-hr-glow: ${MENU_LINE_GLOW_RGB};
    }
    #place-experience .kt-menu-card {
      transform-box: view-box;
      transform-origin: 0 0;
      will-change: transform;
    }
    #place-experience .kt-menu-card-a { transform: ${placed(CARD_APART_X, 0)}; animation: kt-menu-card-a ${PERIOD}s ease-in-out infinite; }
    #place-experience .kt-menu-card-b { transform: ${placed(mirror(CARD_APART_X), 0)}; animation: kt-menu-card-b ${PERIOD}s ease-in-out infinite; }
    #place-experience .kt-menu-card-body { fill: rgba(var(--kt-hr-glow), ${CARD_BODY_ALPHA}); stroke: none; }
    #place-experience .kt-menu-card-glow { stroke: rgba(var(--kt-hr-glow), ${CARD_GLOW_ALPHA}); stroke-width: ${CARD_GLOW_WIDTH}; }
    #place-experience .kt-menu-card-line { stroke: rgba(var(--kt-hr-hot), ${CARD_LINE_ALPHA}); stroke-width: ${CARD_LINE_WIDTH}; }
    #place-experience .kt-menu-card-ink {
      will-change: opacity;
      animation: kt-menu-card-ink ${PERIOD}s ease-in-out infinite;
    }
    #place-experience .kt-menu-heart-form {
      opacity: 0;
      will-change: opacity;
      animation: kt-menu-heart-form ${PERIOD}s ease-in-out infinite;
    }
    #place-experience .kt-menu-heart-glow {
      stroke: rgba(var(--kt-hr-glow), ${HEART_GLOW_ALPHA});
      stroke-width: ${HEART_GLOW_WIDTH};
      animation: kt-menu-heart-glow ${PERIOD}s ease-in-out infinite;
    }
    #place-experience .kt-menu-heart-line { stroke: rgba(var(--kt-hr-hot), ${HEART_LINE_ALPHA}); stroke-width: ${HEART_LINE_WIDTH}; }
    #place-experience .kt-menu-heart-core {
      transform-box: view-box;
      transform-origin: ${HEART_CENTRE[0]}px ${HEART_CENTRE[1]}px;
      will-change: transform;
      animation: kt-menu-heart-beat ${PERIOD}s ease-in-out infinite;
    }
${cardKeyframes('kt-menu-card-a', 1)}
${cardKeyframes('kt-menu-card-b', -1)}
    @keyframes kt-menu-card-ink {
      0%, ${pct(SNAP)} { opacity: 1; }
      ${pct(FORMED)}, ${pct(APART_AGAIN)} { opacity: 0.2; }
      ${pct(APART_AGAIN + 0.6)}, 100% { opacity: 1; }
    }
    @keyframes kt-menu-heart-form {
      0%, ${pct(SNAP)} { opacity: 0; }
      ${pct(FORMED)}, ${pct(APART_AGAIN)} { opacity: 1; }
      ${pct(APART_AGAIN + 0.5)}, 100% { opacity: 0; }
    }
    @keyframes kt-menu-heart-beat {
      0%, ${pct(SNAP)} { transform: scale(1); }
      ${pct(1.9)} { transform: scale(1.03); }
      ${pct(SETTLED + 0.05)} { transform: scale(1); }${BEATS.map((start) => `
      ${pct(start - 0.2)} { transform: scale(1); }${beatSteps(start)}`).join('')}
      100% { transform: scale(1); }
    }
    @keyframes kt-menu-heart-glow {
      0% { opacity: 0.55; }${BEATS.map((start) => glowSteps(start)).join('')}
      100% { opacity: 0.55; }
    }
    @media (prefers-reduced-motion: reduce) {
      #place-experience .kt-menu-card,
      #place-experience .kt-menu-card-ink,
      #place-experience .kt-menu-heart-form,
      #place-experience .kt-menu-heart-glow,
      #place-experience .kt-menu-heart-core { animation: none; will-change: auto; }
      #place-experience .kt-menu-card-a { transform: ${placed(CARD_JOINED_X, -CARD_TILT)}; }
      #place-experience .kt-menu-card-b { transform: ${placed(mirror(CARD_JOINED_X), CARD_TILT)}; }
      #place-experience .kt-menu-card-ink { opacity: 0.2; }
      #place-experience .kt-menu-heart-form { opacity: 1; }
      #place-experience .kt-menu-heart-glow { opacity: 0.7; }
    }
`;
