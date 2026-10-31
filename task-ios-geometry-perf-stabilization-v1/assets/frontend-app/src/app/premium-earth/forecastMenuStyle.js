import { HEART_GLOW_ALPHA, HEART_GLOW_WIDTH, HEART_LINE_ALPHA, HEART_LINE_WIDTH } from './connectionsHeartGeometry.js?v=d9f39e7';
import { MENU_LINE_GLOW_RGB, MENU_LINE_HOT_RGB } from './connectionsHeartStyle.js?v=d9f39e7';
/*
 * THE FORECAST CARD ON THE MAIN MENU - ITS LIGHT AND ITS MOTION (V2.1: the five Life Dynamics pictograms, drawn in the Connections heart's own light).
 *
 * The markup is forecastMenuArt.ts; the five pictograms are the Life Dynamics icons (temporal-synthesis/lifeDynamicsIcons.ts), the same shapes the Year, Month and Day
 * panels draw small: Mind & Focus (the brain), Career & Purpose (the briefcase), Love & Connection (the Connections heart), Health & Recovery (the heart with a pulse)
 * and Money & Resources (the wallet). This is the stylesheet, in a module of its own for the reason connectionsHeartStyle.ts gives: menuExperience.ts is pinned to have
 * no motion system, and only includes this text in the stylesheet it already injects.
 *
 * ONE CARD, FIVE STAGES, ONE CLOCK. The card shows ONE large glowing pictogram at a time, with a short horizontal five-segment gauge under it and nothing else (the area is
 * not named on the card; the Forecast screens name it). Everything runs on one ten-second timeline of five two-second stages, and in every one of them:
 *
 *   0.00 - 0.45   the pictogram fades in ...
 *   0.00 - 0.60   ... rising a little and settling (it comes up from just below and from a touch smaller: an emergence, no turn)
 *   0.50 - 1.22   the gauge fills left to right, a segment about every 0.17 s (decoration: see below)
 *   1.50 - 1.95   the pictogram withdraws: it fades out as it lifts away and grows a touch, and the gauge goes with it
 *
 * The next stage begins the instant this one ends, when nothing is visible, so no two pictograms are ever on the card together and the card never flashes. After the fifth
 * stage (Money & Resources) the first (Mind & Focus) follows without a seam: the last frame is the first.
 *
 * V2.1 CHANGED HOW IT MOVES, NOT WHAT IT SHOWS. V1.2's pictograms came in a quarter-turn round and had their outline drawn on by a moving dash (stroke-dashoffset, which the
 * browser repaints on its main thread every frame, beside the globe). Now each pictogram is one plain element moved by a transform and an opacity - all that the compositor
 * runs off the main thread, as the Connections heart and the Tarot card do - with the easing in the keyframes: calmer, with nothing turning. And the line is the Connections
 * HEART's own weight in pixels, not a finer one: the same line and glow, from the same constants (connectionsHeartGeometry.ts).
 *
 * THE GAUGE IS A METAPHOR AND SAYS NOTHING, and it stays: it is part of the Forecast tile's identity. It fills the same way for every area in every stage, the same five
 * segments in the same order, and it is not bound to any score or fixture. The real assessment of an area is the Life Dynamics panel on the Forecast screens.
 *
 * PAUSE: a card that cannot be seen is not animated. forecastMenuLifecycle.ts sets data-fc-run="off" on the menu surface when the document is hidden, the surface is not
 * the destination on screen, or the card is outside the visible part of its scroller; the clock stops where it is and goes on from there when the card is seen again.
 *
 * LESS MOTION: a device that asks for it gets one pictogram (Mind & Focus), still, with a settled gauge.
 */
/** The whole story in seconds; each of the five stages is STAGE seconds. */
export const FORECAST_MENU_STAGE = 2;
export const FORECAST_MENU_STAGES = 5;
export const FORECAST_MENU_PERIOD = FORECAST_MENU_STAGE * FORECAST_MENU_STAGES;
/** Where in a stage things happen, in seconds from its beginning. */
export const STAGE_TIMES = Object.freeze({
    fadeIn: 0.45,
    settle: 0.6,
    firstSegment: 0.5,
    segmentEvery: 0.17,
    segmentRise: 0.15,
    outStart: 1.5,
    end: 1.95,
});
/** How far a pictogram comes up from, goes up to, and how much smaller it comes in / larger it goes out (per cent of its box; scale). */
export const EMERGE = Object.freeze({ fromY: 9, fromScale: 0.94, toY: -4, toScale: 1.03 });
/** How many segments the gauge has. */
export const FORECAST_MENU_SEGMENTS = 5;
/*
 * EVERYTHING IS A SHARE OF THE CONNECTIONS HEART'S BOX. The heart is drawn in a box that is min(96cqw, 104px) wide (connectionsHeartStyle.ts); the card is sized from the same
 * box (--b), so the card and the heart stay in step at every width, and the line - which is the heart's own, 1.2 units of its 48 - is the same number of pixels.
 *
 * THE GAUGE SETS THE PICTOGRAMS' WIDTH (the owner's rule, unchanged): the five-segment gauge is the card's one fixed horizontal measure and the pictograms fit inside it, centred,
 * none wider, glow included. Its figures are V1.2's, at the 412-wide tile (where the box is its full 104 px), as shares of the box; the pictograms' stage is the largest one for
 * which the WIDEST pictogram (the briefcase, 18 of the stage's 24 units across before its line) and the glow the heart's line throws round it still stand inside the gauge.
 */
export const FORECAST_MENU_GAUGE_SHARE = { segment: 0.1025, gap: 0.031, height: 0.0334 };
export const FORECAST_MENU_GAUGE_TOTAL = +(FORECAST_MENU_GAUGE_SHARE.segment * FORECAST_MENU_SEGMENTS + FORECAST_MENU_GAUGE_SHARE.gap * (FORECAST_MENU_SEGMENTS - 1)).toFixed(4);
/** The stage (the pictograms' 24-unit box) as a share of the heart's box. */
export const FORECAST_MENU_STAGE_SHARE = 0.745;
/** The widest pictogram's painted width in the stage's own 24 units, measured in a real browser (forecastMenuCardAudit.mjs): the briefcase, 18 across. */
export const FORECAST_MENU_WIDEST_ICON_UNITS = 18;
/**
 * THE LINE AND THE GLOW, in the stage's 24 units: the heart's (1.2 over 3.6 in its 48-unit box), converted to this stage, so that they are the heart's in pixels whatever
 * the width: a unit of the stage is STAGE_SHARE / 24 of the box, a unit of the heart is 1 / 48 of it.
 */
export const FORECAST_MENU_LINE_UNITS = +((HEART_LINE_WIDTH * 24) / (48 * FORECAST_MENU_STAGE_SHARE)).toFixed(3);
export const FORECAST_MENU_GLOW_UNITS = +((HEART_GLOW_WIDTH * 24) / (48 * FORECAST_MENU_STAGE_SHARE)).toFixed(3);
/**
 * OPTICAL CENTRING. Every pictogram is drawn about the middle of its 24-unit box except one: Health & Recovery's pulse line starts left of its heart, so the
 * whole drawing is 0.6 units left of the box's middle (measured in a real browser, and recomputed from the path data by a test). A drawing's own geometry is
 * not changed for the menu; the group that carries it is moved 0.6 units right so the five stand on one centre line over the gauge. Keyed by stage (the
 * order of LIFE_ICON_ORDER): 3 is Health & Recovery.
 */
export const FORECAST_MENU_OPTICAL_DX = Object.freeze({ 3: 0.6 });
const pct = (seconds) => `${+((seconds / FORECAST_MENU_PERIOD) * 100).toFixed(3)}%`;
/** Keyframe offsets, merged so that a stage that begins at 0 or ends at the period never writes an offset twice. */
function offsets(...seconds) {
    return [...new Set(seconds.map(pct))].join(', ');
}
const EASE_OUT = 'cubic-bezier(0.22, 0.61, 0.36, 1)';
const EASE_IN = 'cubic-bezier(0.5, 0, 0.75, 0.4)';
const WAITING = `translate(0%, ${EMERGE.fromY}%) scale(${EMERGE.fromScale})`;
const LEAVING = `translate(0%, ${EMERGE.toY}%) scale(${EMERGE.toScale})`;
/** A pictogram's fade: in over fadeIn, held, out from outStart to end. */
function fadeKeyframes(stage) {
    const start = stage * FORECAST_MENU_STAGE;
    return `
    @keyframes kt-menu-fc-fade-${stage} {
      ${offsets(0, start)} { opacity: 0; animation-timing-function: ${EASE_OUT}; }
      ${pct(start + STAGE_TIMES.fadeIn)} { opacity: 1; animation-timing-function: linear; }
      ${pct(start + STAGE_TIMES.outStart)} { opacity: 1; animation-timing-function: ${EASE_IN}; }
      ${offsets(start + STAGE_TIMES.end, FORECAST_MENU_PERIOD)} { opacity: 0; }
    }`;
}
/** The emergence: up from just below and a touch smaller (ease-out), held upright and whole, then away and up, a touch larger (ease-in). While it is not on stage it waits below. */
function moveKeyframes(stage) {
    const start = stage * FORECAST_MENU_STAGE;
    return `
    @keyframes kt-menu-fc-move-${stage} {
      ${offsets(0, start)} { transform: ${WAITING}; animation-timing-function: ${EASE_OUT}; }
      ${pct(start + STAGE_TIMES.settle)} { transform: translate(0%, 0%) scale(1); animation-timing-function: linear; }
      ${pct(start + STAGE_TIMES.outStart)} { transform: translate(0%, 0%) scale(1); animation-timing-function: ${EASE_IN}; }
      ${offsets(start + STAGE_TIMES.end, FORECAST_MENU_PERIOD)} { transform: ${LEAVING}; }
    }`;
}
/** The moment a gauge segment lights in a stage, in seconds from the stage's start. */
export const segmentLitAt = (segment) => STAGE_TIMES.firstSegment + STAGE_TIMES.segmentEvery * segment;
/** One gauge segment's light across all five stages: dark, lit left to right at its moment, held, and out with the stage. */
function segmentKeyframes(segment) {
    const steps = [`      0% { opacity: 0; }`];
    for (let stage = 0; stage < FORECAST_MENU_STAGES; stage += 1) {
        const start = stage * FORECAST_MENU_STAGE;
        const lit = start + segmentLitAt(segment);
        steps.push(`      ${pct(lit)} { opacity: 0; }`);
        steps.push(`      ${pct(lit + STAGE_TIMES.segmentRise)} { opacity: 1; }`);
        steps.push(`      ${pct(start + STAGE_TIMES.outStart)} { opacity: 1; }`);
        steps.push(stage === FORECAST_MENU_STAGES - 1 ? '      100% { opacity: 0; }' : `      ${pct(start + STAGE_TIMES.end)} { opacity: 0; }`);
    }
    return `
    @keyframes kt-menu-fc-seg-${segment} {
${steps.join('\n')}
    }`;
}
const range = (count) => Array.from({ length: count }, (_, index) => index);
const iconRules = range(FORECAST_MENU_STAGES).map((stage) => `
    #place-experience .kt-menu-fc-icon-${stage} {
      animation: kt-menu-fc-fade-${stage} ${FORECAST_MENU_PERIOD}s linear infinite, kt-menu-fc-move-${stage} ${FORECAST_MENU_PERIOD}s linear infinite;
    }`).join('');
const segmentRules = range(FORECAST_MENU_SEGMENTS).map((segment) => `
    #place-experience .kt-menu-fc-seg-${segment} > i,
    #place-experience .kt-menu-fc-seg-${segment} > b { animation: kt-menu-fc-seg-${segment} ${FORECAST_MENU_PERIOD}s linear infinite; }`).join('');
const G = FORECAST_MENU_GAUGE_SHARE;
const b = (share) => `calc(var(--b) * ${share})`;
export const FORECAST_MENU_CSS = `
    /* THE FORECAST CARD'S ART: one column in the tile, centred - the pictogram and the gauge - sized from the Connections heart's own box (--b: min(96cqw, 104px); the tile is the
       size container, as it is for the heart), so everything below follows the heart at every width. */
    #place-experience .kt-menu-tile[data-menu-item="forecast"] .kt-menu-tile-art { align-self: stretch; }
    #place-experience .kt-menu-fc {
      --b: min(96cqw, 104px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: ${b(0.0656)};
      margin-bottom: ${b(0.1908)};
      pointer-events: none;
      --kt-hr-hot: ${MENU_LINE_HOT_RGB};
      --kt-hr-glow: ${MENU_LINE_GLOW_RGB};
    }
    #place-experience .kt-menu-fc-stage {
      position: relative;
      flex: none;
      width: ${b(FORECAST_MENU_STAGE_SHARE)};
      aspect-ratio: 1 / 1;
    }
    /* A pictogram is one plain element, waiting below and unseen, moved by a transform and lit by its opacity - nothing inside it moves. */
    #place-experience .kt-menu-fc-icon {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
      opacity: 0;
      transform: ${WAITING};
      transform-origin: 50% 50%;
      will-change: transform, opacity;
    }
    ${Object.entries(FORECAST_MENU_OPTICAL_DX).map(([stage, dx]) => `#place-experience .kt-menu-fc-draw-${stage} { transform: translate(${dx}px, 0px); }`).join('\n    ')}
    /* the line and the glow are the Connections HEART's own, converted to this stage's units (see FORECAST_MENU_LINE_UNITS): the heart's colours, alphas and pixels */
    #place-experience .kt-menu-fc-glow { stroke: rgba(var(--kt-hr-glow), ${HEART_GLOW_ALPHA}); stroke-width: ${FORECAST_MENU_GLOW_UNITS}; }
    #place-experience .kt-menu-fc-line { stroke: rgba(var(--kt-hr-hot), ${HEART_LINE_ALPHA}); stroke-width: ${FORECAST_MENU_LINE_UNITS}; }
    /* The pictogram's box (24 units) has air round its drawing; the gauge is pulled up into it so that the gauge stands a short, even step under the line. */
    #place-experience .kt-menu-fc-gauge {
      display: flex;
      align-items: center;
      gap: ${b(G.gap)};
      margin-top: ${b(-0.0835)};
    }
    #place-experience .kt-menu-fc-seg {
      position: relative;
      display: block;
      width: ${b(G.segment)};
      height: max(2.6px, ${b(G.height)});
      border-radius: 999px;
      background: rgba(var(--kt-hr-glow), 0.16);
      box-shadow: inset 0 0 0 1px rgba(var(--kt-hr-glow), 0.14);
    }
    #place-experience .kt-menu-fc-seg > i,
    #place-experience .kt-menu-fc-seg > b {
      position: absolute;
      display: block;
      border-radius: inherit;
      opacity: 0;
    }
    #place-experience .kt-menu-fc-seg > i { inset: 0; background: rgba(var(--kt-hr-hot), 0.94); }
    #place-experience .kt-menu-fc-seg > b { inset: -1.4px; background: rgba(var(--kt-hr-glow), 0.34); }
${range(FORECAST_MENU_STAGES).map((stage) => fadeKeyframes(stage)).join('')}
${range(FORECAST_MENU_STAGES).map((stage) => moveKeyframes(stage)).join('')}
${range(FORECAST_MENU_SEGMENTS).map((segment) => segmentKeyframes(segment)).join('')}
${iconRules}
${segmentRules}
    /* A card that cannot be seen is not animated: the clock stops where it is (forecastMenuLifecycle.ts). */
    #place-experience .kt-menu-surface[data-fc-run="off"] .kt-menu-fc * { animation-play-state: paused; }
    /* LESS MOTION: one pictogram, still, upright, with a settled gauge. */
    @media (prefers-reduced-motion: reduce) {
      #place-experience .kt-menu-fc-icon,
      #place-experience .kt-menu-fc-seg > i,
      #place-experience .kt-menu-fc-seg > b { animation: none; will-change: auto; }
      #place-experience .kt-menu-fc-icon { transform: none; }
      #place-experience .kt-menu-fc-icon-0 { opacity: 1; }
      #place-experience .kt-menu-fc-seg > i { opacity: 0.86; }
      #place-experience .kt-menu-fc-seg > b { opacity: 0.6; }
    }
`;
