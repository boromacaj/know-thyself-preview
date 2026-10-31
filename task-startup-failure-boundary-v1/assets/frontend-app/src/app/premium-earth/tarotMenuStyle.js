import { MENU_LINE_GLOW_RGB, MENU_LINE_HOT_RGB } from './connectionsHeartStyle.js?v=2ea79e9';
import { TAROT_CARD_BOX } from './tarotMenuArt.js?v=2ea79e9';
import { CONNECTIONS_BOX_MAX_PX, CONNECTIONS_BOX_SHARE, TAROT_BODY_ALPHA, TAROT_BODY_RGB, TAROT_CARDS, TAROT_CENTRE, TAROT_GLOW_ALPHA, TAROT_GLOW_WIDTH, TAROT_LINE_ALPHA, TAROT_LINE_WIDTH, TAROT_PROMINENCE, TAROT_TINT_ALPHA, TAROT_UNIT_FACTOR, TAROT_VIEW_HEIGHT, TAROT_VIEW_WIDTH, fanPlace, fanPose, singlePose, spreadPose, } from './tarotMenuGeometry.js?v=2ea79e9';
/*
 * THE TAROT CARD ON THE MAIN MENU - ITS LIGHT AND ITS MOTION (V1.9).
 *
 * ONE CARD, AN ARC FAN, THREE CHOSEN, ONE CARD. Six seconds, one timeline, one gesture - not a card-handling demo:
 *
 *   0.0 - 0.4    ONE CARD       a single luminous card, upright
 *   0.4 - 1.5    THE FAN        the card opens into an arc of five: each card is turned about a point below the middle one, so they travel along a circle, the
 *                               nearer ones first; the middle card is the anchor, the beside ones are quieter, the outer ones the quietest
 *   1.5 - 2.2    THE FAN, HELD  so that it can be read
 *   2.2 - 3.3    THE CHOICE     the three in front (left, middle, right) brighten and the two outer cards dim and go; the three come a little forward
 *                               (a touch nearer, the middle one raised) and settle apart into a clean spread, the middle one the brightest
 *   3.3 - 4.5    THE SPREAD     three cards, held
 *   4.5 - 5.3    ONE AGAIN      the side cards slide in under the middle one and fade as they arrive; the middle card settles back
 *   5.3 - 6.0    the one card again: the last frame is the first, so the loop has no seam
 *
 * HIERARCHY: a card's PROMINENCE (tarotMenuGeometry.ts) is the opacity of the whole card. The chosen cards and the card in front are the brightest; the cards
 * that are not chosen are dimmer, and go. At no moment are all the cards equally lit, and at no moment are more than five drawn (three, from 3.3 s).
 *
 * LIGHT AND SIZE: the Connections heart's own (MENU_LINE_HOT_RGB, MENU_LINE_GLOW_RGB; the line, glow and tint of tarotMenuGeometry.ts) at the Connections card's own
 * size: no filter and no blur anywhere.
 *
 * MOTION: the transform of whole card BOXES and their opacity - all that a browser can run on its compositor, off the main thread - sampled every fortieth of a
 * second along a path (every twentieth for opacity). Nothing in script, no timer, no frame loop, no clip, no mask, no z-index (the paint order is fixed).
 *
 * PAUSE: it stops with the Forecast card's (forecastMenuLifecycle.ts sets data-fc-run="off" on the menu surface when the document is hidden, the surface is not
 * the destination on screen, or the cards are outside the visible part of their scroller): one signal serves both.
 *
 * LESS MOTION: a device that asks for it gets the finished picture, still: the three-card spread, the middle card the brightest.
 */
/** The whole gesture in seconds. */
export const TAROT_MENU_PERIOD = 6;
/** When things happen, in seconds from the loop's start. */
export const TAROT_TIMES = Object.freeze({
    /** The fan opens: the cards next to the middle one first, the outer ones a little after; each takes this long. */
    fanStart: 0.4,
    fanOuterDelay: 0.1,
    fanDuration: 1.0,
    /** The side cards are seen as they leave the middle one (they fade in over the first part of the opening). */
    fadeInStart: 0.45,
    fadeInDuration: 0.5,
    /** THE CHOICE: the chosen brighten, the two outer cards dim and go. */
    chooseStart: 2.2,
    chooseDuration: 0.45,
    dimDuration: 0.2,
    goDuration: 0.5,
    /** The chosen cards settle into the spread. */
    settleStart: 2.4,
    settleDuration: 0.9,
    /** ONE AGAIN: the side cards slide in and fade, the middle one settles. */
    collapseStart: 4.5,
    collapseDuration: 0.8,
    collapseFadeStart: 4.85,
    collapseFadeDuration: 0.45,
});
const T = TAROT_TIMES;
const END = TAROT_MENU_PERIOD;
/** The time between keyframes along a moving card's path, and between the keyframes of an opacity. */
export const TAROT_SAMPLE = 1 / 40;
export const TAROT_OPACITY_SAMPLE = 1 / 20;
/** How much a chosen card comes nearer (scale) as it moves forward into the spread: a touch, and only on the way. */
export const TAROT_FORWARD_SWELL = 0.04;
const pct = (seconds) => `${+((seconds / END) * 100).toFixed(3)}%`;
const lerp = (from, to, v) => from + (to - from) * v;
const clamp01 = (u) => Math.min(1, Math.max(0, u));
/** A gentle ease in and out (smootherstep: no jerk at either end). */
const ease = (u) => { const t = clamp01(u); return t * t * t * (t * (6 * t - 15) + 10); };
/** The progress, from 0 to 1, of something that starts at `start` and takes `duration` seconds. */
const along = (seconds, start, duration) => clamp01((seconds - start) / duration);
/** A pose as a transform of a card's own box: its centre is where the card is drawn about; a translation is in per cent of the box. */
export function poseTransform(pose) {
    const [boxWidth, boxHeight] = TAROT_CARD_BOX;
    return `translate(${+((pose.x / boxWidth) * 100).toFixed(3)}%, ${+((pose.y / boxHeight) * 100).toFixed(3)}%) rotate(${+pose.r.toFixed(2)}deg) scale(${+pose.s.toFixed(4)})`;
}
const mixPose = (from, to, v) => ({ x: lerp(from.x, to.x, v), y: lerp(from.y, to.y, v), r: lerp(from.r, to.r, v), s: lerp(from.s, to.s, v) });
/** When a card's fan opening starts: the cards next to the middle one first, the outer ones a little after. */
export const fanStartOf = (card) => T.fanStart + (Math.abs(fanPlace(card)) === 2 ? T.fanOuterDelay : 0);
/** The moments the fan is open from and until (the last card's opening ends here). */
export const FAN_OPEN_AT = T.fanStart + T.fanOuterDelay + T.fanDuration;
export const SPREAD_AT = T.settleStart + T.settleDuration;
export const SINGLE_AT = T.collapseStart + T.collapseDuration;
/** The moment the two cards that were not chosen are gone. */
export const LEFT_AT = T.chooseStart + T.dimDuration + T.goDuration;
/** WHERE A CARD IS at a moment of the loop. */
export function poseAt(card, seconds) {
    const open = ease(along(seconds, fanStartOf(card), T.fanDuration));
    const fan = fanPose(card, open);
    const chosen = card === 'left' || card === 'right' || card === 'centre';
    if (seconds < T.settleStart)
        return fan;
    /* the two that went are not seen: they go back to the single card unhurried, between the choice and the collapse, so that nothing unseen ever moves fast */
    if (!chosen)
        return mixPose(fanPose(card, 1), singlePose(card), ease(along(seconds, LEFT_AT, T.collapseStart - LEFT_AT)));
    if (seconds < T.collapseStart) {
        const u = along(seconds, T.settleStart, T.settleDuration);
        const pose = mixPose(fanPose(card, 1), spreadPose(card), ease(u));
        return { ...pose, s: pose.s + (card === 'centre' ? 0 : TAROT_FORWARD_SWELL * Math.sin(Math.PI * ease(u))) };
    }
    return mixPose(spreadPose(card), singlePose(card), ease(along(seconds, T.collapseStart, T.collapseDuration)));
}
/** HOW LIT a card is at a moment, from 0 to 1 (the opacity of the whole card). */
export function prominenceAt(card, seconds) {
    const fan = TAROT_PROMINENCE.fan[card];
    const spread = TAROT_PROMINENCE.spread[card];
    if (card === 'centre')
        return 1;
    if (card === 'left' || card === 'right') {
        if (seconds < T.chooseStart)
            return lerp(0, fan, ease(along(seconds, T.fadeInStart, T.fadeInDuration)));
        const chosen = lerp(fan, spread, ease(along(seconds, T.chooseStart, T.chooseDuration)));
        if (seconds < T.collapseFadeStart)
            return chosen;
        return lerp(spread, 0, ease(along(seconds, T.collapseFadeStart, T.collapseFadeDuration)));
    }
    /* the outer cards: seen as the fan opens, dimmed as the choice is made, then gone */
    if (seconds < T.chooseStart)
        return lerp(0, fan, ease(along(seconds, T.fadeInStart + T.fanOuterDelay, T.fadeInDuration)));
    const dimmed = lerp(fan, TAROT_PROMINENCE.dimmed, ease(along(seconds, T.chooseStart, T.dimDuration)));
    return lerp(dimmed, 0, ease(along(seconds, T.chooseStart + T.dimDuration, T.goDuration)));
}
/** The finished picture, for a device that asks for less motion: the spread, still. */
export const stillProminence = (card) => TAROT_PROMINENCE.spread[card];
/** A keyframes block from [seconds, declarations] pairs. */
function track(name, frames) {
    return `
      @keyframes ${name} {
${frames.map(([at, css]) => `        ${pct(at)} { ${css} }`).join('\n')}
      }`;
}
/** A function of time sampled into keyframes, without the stops in the middle of a stretch that does not change. */
function sampled(name, at, step, same, css) {
    const times = [];
    for (let seconds = 0; seconds < END - 1e-9; seconds += step)
        times.push(+seconds.toFixed(4));
    times.push(END);
    const frames = times.map((seconds) => [seconds, at(seconds === END ? 0 : seconds)]);
    const kept = frames.filter((frame, index) => index === 0 || index === frames.length - 1 || !same(frame[1], frames[index - 1][1]) || !same(frame[1], frames[index + 1][1]));
    return track(name, kept.map(([seconds, value]) => [seconds, css(value)]));
}
const samePose = (a, b) => Math.abs(a.x - b.x) < 1e-3 && Math.abs(a.y - b.y) < 1e-3 && Math.abs(a.r - b.r) < 1e-3 && Math.abs(a.s - b.s) < 1e-4;
const KEYFRAMES = [
    ...TAROT_CARDS.map((card) => sampled(`kt-menu-tarot-pose-${card}`, (seconds) => poseAt(card, seconds), TAROT_SAMPLE, samePose, (pose) => `transform: ${poseTransform(pose)};`)),
    ...TAROT_CARDS.map((card) => sampled(`kt-menu-tarot-fade-${card}`, (seconds) => +prominenceAt(card, seconds).toFixed(3), TAROT_OPACITY_SAMPLE, (a, b) => a === b, (value) => `opacity: ${value};`)),
].join('');
const [CX, CY] = TAROT_CENTRE;
const [BOX_W, BOX_H] = TAROT_CARD_BOX;
/** The picture's colours and its still state - and, inside prefers-reduced-motion: no-preference, the loop. The still state is the finished picture (the spread). */
export const TAROT_MENU_CSS = `
    /* THE TAROT CARD'S ART: one picture, centred in the tile. --u is one picture unit, and it is the Connections heart's own: a Tarot card is exactly as large as a
       Connections card, on every screen (the heart's box is min(${CONNECTIONS_BOX_MAX_PX}px, ${+(CONNECTIONS_BOX_SHARE * 100).toFixed(0)}cqw) wide, and the tile is the size container, as it is for the heart). The tile's name
       stands under it, outside the card, as it does for the Forecast. */
    #place-experience .kt-menu-tile[data-menu-item="tarot"] .kt-menu-tile-art { align-self: stretch; }
    #place-experience .kt-menu-tarot {
      --u: calc(min(${+(CONNECTIONS_BOX_SHARE * 100).toFixed(0)}cqw, ${CONNECTIONS_BOX_MAX_PX}px) * ${TAROT_UNIT_FACTOR});
      --kt-hr-hot: ${MENU_LINE_HOT_RGB};
      --kt-hr-glow: ${MENU_LINE_GLOW_RGB};
      position: relative;
      display: block;
      flex: none;
      width: calc(${TAROT_VIEW_WIDTH} * var(--u));
      height: calc(${TAROT_VIEW_HEIGHT} * var(--u));
      pointer-events: none;
    }
    /* A card is a box about the picture's centre, moved by a transform: translate, turn, scale; and lit by its opacity. Its drawing is static inside it. */
    #place-experience .kt-menu-tarot-card {
      position: absolute;
      display: block;
      left: calc(${+(CX - BOX_W / 2).toFixed(2)} * var(--u));
      top: calc(${+(CY - BOX_H / 2).toFixed(2)} * var(--u));
      width: calc(${BOX_W} * var(--u));
      height: calc(${+BOX_H.toFixed(2)} * var(--u));
      transform-origin: 50% 50%;
    }
    #place-experience .kt-menu-tarot-ink { position: absolute; left: 0; top: 0; display: block; width: 100%; height: 100%; overflow: visible; }
    /* THE BODY covers the cards behind it (the colour of the tile's glass: it is not seen, only what it covers is not); the Connections card's own tint is inside it;
       the line and the glow are the Connections HEART's own: its colours, its alphas and its weight (1.2 over a glow of 3.6 in its 48-unit box), in this picture's units */
    #place-experience .kt-menu-tarot-body { fill: rgba(${TAROT_BODY_RGB}, ${TAROT_BODY_ALPHA}); stroke: none; }
    #place-experience .kt-menu-tarot-tint { fill: rgba(var(--kt-hr-glow), ${TAROT_TINT_ALPHA}); stroke: none; }
    #place-experience .kt-menu-tarot-glow { stroke: rgba(var(--kt-hr-glow), ${TAROT_GLOW_ALPHA}); stroke-width: ${TAROT_GLOW_WIDTH}; }
    #place-experience .kt-menu-tarot-line { stroke: rgba(var(--kt-hr-hot), ${TAROT_LINE_ALPHA}); stroke-width: ${TAROT_LINE_WIDTH}; }
    /* The still picture, the spread: the three chosen cards, the middle one the brightest; the two outer cards are not seen. */
${TAROT_CARDS.map((card) => `    #place-experience .kt-menu-tarot-card-${card} { transform: ${poseTransform(spreadPose(card))}; opacity: ${stillProminence(card)}; }`).join('\n')}

    @media (prefers-reduced-motion: no-preference) {
${KEYFRAMES}
${TAROT_CARDS.map((card) => `      #place-experience .kt-menu-tarot-card-${card} { will-change: transform, opacity; animation: kt-menu-tarot-pose-${card} ${END}s linear infinite, kt-menu-tarot-fade-${card} ${END}s linear infinite; }`).join('\n')}
      /* A card that cannot be seen is not animated: the clock stops where it is (forecastMenuLifecycle.ts). */
      #place-experience .kt-menu-surface[data-fc-run="off"] .kt-menu-tarot *,
      #place-experience .kt-menu-surface[data-fc-run="off"] .kt-menu-tarot { animation-play-state: paused; }
    }
`;
