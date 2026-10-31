import { escapeAttribute, escapeHtml } from '../format.js';
import { tf } from '../i18n/uiStrings.js';
/*
 * THE NUMEROLOGY HERO: LIFE PATH AT THE CENTRE, THREE SATELLITES ROUND IT
 * -----------------------------------------------------------------------
 * Pure markup and pure geometry; no DOM, no clock. numerologyOrbitHero.ts is the part that reads the Earth and lays this out.
 *
 * It replaces the three small capsules that used to open a live Numerology reading. There is a hierarchy now, and it is the picture:
 *
 *   CENTRE      Life Path, one large frosted glass circle at the Earth's centre, lit GOLD (rim, label and number). It is the core identity
 *               number and it does not move
 *   SATELLITES  Expression, Soul Urge and Personality: three smaller circles (57 % of its diameter), in the Earth's blue-white, whose centres are the
 *               vertices of an equilateral triangle concentric with the Earth. They turn slowly clockwise around the centre, like mill
 *               wheels, while what is written in every circle stays level - a gyro-stabilised horizon
 *
 * HOW THE LEVEL CONTENT IS DONE. Pure CSS transforms, nothing per frame in script:
 *
 *   ul.kt-orbit-core     sits at the Earth's centre and holds the Life Path circle. No animation: it is simply level
 *   ul.kt-orbit          sits at the Earth's centre and spins 0 -> 360deg (clockwise) over --ko-period
 *   li.kt-orbit-slot     a satellite's slot on the ring: rotate(a) translateY(-rho) rotate(-a), a = 0, 120, 240deg. The two rotations
 *                        cancel each other's effect on the orientation, so a slot carries the spin and nothing else
 *   span.kt-orbit-bubble the circle. A satellite's counter-spins 0 -> -360deg over the SAME period from the same instant, so its net
 *                        orientation is always 0: the glass, its rim and its text never turn, only its place does
 *
 * Both animations are transform-only, so they run on the compositor and cost the main thread nothing while they run.
 */
/** The core number, fixed at the centre, and the engine label it is read under. */
export const ORBIT_CORE_LABEL = 'Life Path';
/** The three supporting numbers, in the order they sit on the ring (clockwise from the top), and the engine label each is read under. */
export const ORBIT_SATELLITE_LABELS = ['Expression', 'Soul Urge', 'Personality'];
/** All four, the core first. */
export const ORBIT_LABELS = [ORBIT_CORE_LABEL, ...ORBIT_SATELLITE_LABELS];
/** The meaning database's position key for each engine label. */
export const ORBIT_POSITION_KEY = {
    'Life Path': 'life-path',
    Expression: 'expression',
    'Soul Urge': 'soul-urge',
    Personality: 'personality',
};
/** Where each satellite sits on the ring, clockwise from the top. 120 degrees apart: the vertices of an equilateral triangle. */
export const ORBIT_SLOT_ANGLES = Object.freeze([0, 120, 240]);
/**
 * A satellite's diameter as a share of the central circle's: 0.57. It was 0.76 (three quarters); the owner asked for a further 25 % off
 * the satellites' size (0.76 x 0.75 = 0.57) with the central circle untouched, so Life Path is plainly the core and Expression, Soul Urge
 * and Personality plainly supporting at a glance. The ring they ride is unchanged, so they float a little further from the centre.
 */
export const SATELLITE_DIAMETER_PER_CORE = 0.57;
/** One revolution, in seconds. Slow on purpose: about 3 degrees a second, a near mote's pace and a little slower than the globe turns. */
export const ORBIT_PERIOD_SECONDS = 120;
/** The circle's diameter as a share of the Earth's radius (the owner's brief: a bubble about as wide as the Earth is deep). */
export const BUBBLE_DIAMETER_PER_EARTH_RADIUS = 1;
/** The ring's radius as a share of the Earth's radius: the centres sit on the limb. */
export const RING_RADIUS_PER_EARTH_RADIUS = 1;
/** Clear space kept between the widest the formation ever reaches and the edge of the screen, CSS px. */
export const SCREEN_MARGIN = 10;
/** Clear space below the lowest the formation ever reaches, before the reading begins, CSS px. */
export const FLOW_GAP = 14;
/**
 * THE FIRST SCREEN IS THE HERO'S, AND ONLY THE HERO'S.
 *
 * The hero is stretched to the bottom of the screen the reading opens on, plus this much, so the first written section starts BELOW the fold
 * and the opening screen is the Earth, the four circles, the MENU capsule and the scroll cue and nothing of the text. The extra pixels keep
 * the section's glass pane out of the first screen: it is drawn 14 px ABOVE the section's own top edge (--kt-reading-pane-bleed-y), so its rim
 * would otherwise show as a thin line along the bottom of the first screen. 14 for the pane and a margin for its glow.
 */
export const FOLD_CLEARANCE = 30;
/** The scroll cue's box: three stacked chevrons, CSS px. It sits in the free band between the formation and the MENU capsule. */
export const CUE_WIDTH = 31;
export const CUE_HEIGHT = 31;
/** Least clear space kept between the formation's lowest reach and the cue, CSS px. */
export const CUE_MIN_GAP = 6;
/**
 * THE THREE LUMINOUS ARCS between the satellites.
 *
 * One element: a square, centred on the Earth, drawn as a single ring of the Earth's rim palette with a soft falloff either side
 * (one radial gradient, no filter, no blur, no SVG), shown through a mask that repeats every 120 degrees. Inside a sector (0 = a
 * satellite's centre on the ring, 120 = the next one's) the mask is clear under the satellite, rises to full half way between the two and
 * falls clear again under the next, so three faint arcs remain, each ending in the glass of the satellite at either end: the three read as
 * one orbital layer and the ring is implied rather than drawn. The element turns with the formation (the same spin), so the arcs stay tied
 * to the satellites they join. The Life Path circle sits inside the ring, clear of it, and is not part of it.
 *
 * ARC_MASK is [angle in degrees from a satellite's centre along the ring, opacity of the arc there]. A satellite of diameter
 * SATELLITE_DIAMETER_PER_CORE x the ring's radius covers +-2 asin(0.57 / 4) = +-16.4 degrees of the ring, so the arc leaves its glass at
 * half strength and is clear a little inside it.
 */
export const ARC_MASK = Object.freeze([
    [0, 0], [4, 0], [16, 0.5], [34, 0.85], [60, 1], [86, 0.85], [104, 0.5], [116, 0], [120, 0],
]);
/** The arc's peak opacity as the core line and as the soft glow beside it: both below a circle's rim (0.68) and the Earth's limb. */
export const ARC_CORE_OPACITY = 0.4;
export const ARC_GLOW_OPACITY = 0.12;
/** The element extends this far past the ring so the falloff is not clipped, CSS px. */
export const ARC_PAD = 16;
/** The mask's opacity at an angle along the ring (degrees from a circle's centre, any value): the same table the stylesheet draws. */
export function arcOpacityAt(angle) {
    const a = ((angle % 120) + 120) % 120;
    for (let i = 1; i < ARC_MASK.length; i += 1) {
        const [a0, o0] = ARC_MASK[i - 1];
        const [a1, o1] = ARC_MASK[i];
        if (a <= a1)
            return a1 === a0 ? o1 : o0 + ((o1 - o0) * (a - a0)) / (a1 - a0);
    }
    return 0;
}
/**
 * THE SCROLL CUE: three thin chevrons pointing down, stacked so that they overlap, drawn as strokes (a faint wide one for the light and a
 * fine bright one for the line). Decorative, so hidden from assistive technology; it takes no input.
 */
export function renderScrollCue() {
    const step = `<span class="kt-orbit-cue-step"><svg viewBox="0 0 31 15" width="31" height="15" focusable="false"><path class="kt-orbit-cue-glow" d="M3.3 2.6 L11 8.1 Q15.5 11.3 20 8.1 L27.7 2.6"/><path class="kt-orbit-cue-line" d="M3.3 2.6 L11 8.1 Q15.5 11.3 20 8.1 L27.7 2.6"/></svg></span>`;
    return `<div class="kt-orbit-cue" aria-hidden="true">${step}${step}${step}</div>`;
}
/**
 * The markup: entries[0] is the core (Life Path), the rest are the satellites. Two lists, so assistive technology reads the core first and
 * then three items ("Life Path 7", then "Expression 1 ..."); the circles are presentation and take no input. Nothing here is interactive.
 */
export function renderNumerologyOrbit(entries, interactive = false) {
    /* A circle is a button when it can open its meaning (in English and in Slovak), and the plain presentation element it always was
       otherwise. Same class, same children, same look: the button is reset to the circle (see the CSS), so nothing about it changes but
       what a tap does. The number it carries is the engine's, written here from the same entry the circle shows. */
    const bubble = (entry) => {
        const inner = `
          <span class="kt-orbit-label">${escapeHtml(entry.text)}</span>
          <span class="kt-orbit-value">${escapeHtml(entry.value)}</span>
        `;
        if (!interactive)
            return `<span class="kt-orbit-bubble">${inner}</span>`;
        const position = ORBIT_POSITION_KEY[entry.label];
        return `<button type="button" class="kt-orbit-bubble" data-orbit-open="${position}" data-orbit-number="${escapeAttribute(entry.value)}" aria-haspopup="dialog" aria-label="${escapeAttribute(tf('numerology.orbit.open', { subject: entry.text, value: entry.value }))}">${inner}</button>`;
    };
    const [core, ...satellites] = entries;
    const coreMarkup = core
        ? `<ul class="kt-orbit-core" role="list"><li class="kt-orbit-core-slot" data-orbit="${escapeAttribute(core.label)}">${bubble(core)}</li></ul>`
        : '';
    const slots = satellites.map((entry, index) => {
        const angle = ORBIT_SLOT_ANGLES[index] ?? 0;
        return `<li class="kt-orbit-slot" style="--ko-a:${angle}deg" data-orbit="${escapeAttribute(entry.label)}">${bubble(entry)}</li>`;
    }).join('');
    return `<header class="kt-pillar-head kt-orbit-hero" data-orbit-hero="numerology">
    <div class="kt-orbit-arcs" aria-hidden="true"></div>
    ${coreMarkup}
    <ul class="kt-orbit" role="list">${slots}</ul>
    ${renderScrollCue()}
  </header>`;
}
/**
 * The formation's size and place.
 *
 * The central circle is the size the approved circles were: its diameter = the Earth's radius R, and the ring the satellites ride has
 * radius R. Scaled to fit: at some moment a circle of that size on that ring would reach 1.5 R to the side of the Earth's centre, wider than
 * a phone if the Earth is wide (R = 139 -> 208 px against a 195 px half-width), so the whole formation is scaled down as one piece by the
 * least amount that keeps that reach inside the screen (less a margin) and below the top of the hero. The scale is fixed by THAT reach on
 * purpose: the central circle and the ring are the very sizes that were approved, to the pixel, and only the satellites (smaller now) are new.
 * The hero's height follows the formation's real reach, the satellites on the ring, which is shorter.
 */
export function orbitGeometry(input) {
    const earthRadius = Math.max(0, input.earthDiameter / 2);
    const idealBubble = earthRadius * BUBBLE_DIAMETER_PER_EARTH_RADIUS / 2;
    const idealRing = earthRadius * RING_RADIUS_PER_EARTH_RADIUS;
    const idealReach = idealRing + idealBubble;
    const room = Math.min(input.earthX - SCREEN_MARGIN, input.stageWidth - input.earthX - SCREEN_MARGIN, input.earthY - input.heroTop);
    const scale = idealReach > 0 ? Math.min(1, Math.max(0, room) / idealReach) : 1;
    const bubbleRadius = idealBubble * scale;
    const ringRadius = idealRing * scale;
    const satelliteRadius = bubbleRadius * SATELLITE_DIAMETER_PER_CORE;
    const reach = Math.max(ringRadius + satelliteRadius, bubbleRadius);
    const centreY = input.earthY - input.heroTop;
    return {
        earthRadius,
        bubbleRadius,
        ringRadius,
        satelliteRadius,
        scale,
        centreX: input.earthX - input.heroLeft,
        centreY,
        height: centreY + reach + FLOW_GAP,
        reach,
    };
}
/** The positions of the three satellite centres relative to the Earth's centre at a given angle of the whole formation (degrees, clockwise). */
export function orbitCentres(ringRadius, formationAngle) {
    return ORBIT_SLOT_ANGLES.map((slot) => {
        const a = ((slot + formationAngle) * Math.PI) / 180;
        return { x: ringRadius * Math.sin(a), y: -ringRadius * Math.cos(a) };
    });
}
/** The CSS custom properties numerologyOrbitHero.ts writes on the hero for a geometry. */
export function orbitVariables(g) {
    const px = (value) => `${value.toFixed(2)}px`;
    return {
        '--ko-cx': px(g.centreX),
        '--ko-cy': px(g.centreY),
        '--ko-ring': px(g.ringRadius),
        '--ko-bubble': px(g.bubbleRadius * 2),
        '--ko-sat': px(g.satelliteRadius * 2),
        '--ko-height': px(g.height),
    };
}
/**
 * The hero's height is the taller of two things: what the formation needs (OrbitGeometry.height, the approved value) and what makes the
 * first section start just below the first screen (the hero ends where that section's own top margin begins, so the margin is part of the
 * distance). On a tall phone that is the second, and the formation itself does not move: only the space
 * under it grows. The cue is centred in the band between the formation's lowest reach and the MENU capsule's top, never closer to the
 * formation than CUE_MIN_GAP.
 */
export function firstScreenLayout(input) {
    const height = Math.max(input.formationBottom, input.viewportHeight - input.heroTop + FOLD_CLEARANCE - input.followingMargin);
    const lowestReach = input.formationBottom - FLOW_GAP;
    const menuTop = (input.menuTop ?? input.viewportHeight - 80) - input.heroTop;
    const centred = (lowestReach + menuTop) / 2 - CUE_HEIGHT / 2;
    return { height, cueTop: Math.max(lowestReach + CUE_MIN_GAP, centred) };
}
/**
 * The stylesheet. Selectors are doubled on the id like the rest of the interface's glass, so they win against the shared
 * reading rules without !important wars. The circle takes its fill, blur and border from the one glass material
 * (glassSurfaceUnification lists .kt-orbit-bubble) and only adds what is its own: the shape and the type.
 */
const arcMaskStops = () => ARC_MASK
    .map(([angle, opacity]) => `rgba(0, 0, 0, ${opacity}) ${angle}deg`).join(', ');
export function numerologyOrbitCss() {
    const H = '#place-experience#place-experience .kt-orbit-hero';
    return `
    ${H} {
      /* PINNED. The hero is STICKY at the place it opens in (--ko-stick, the page's own top offset, written by the script): the page scrolls
         natively, the hero stays where it is, and the reading's sections - later in the document, each its own stacking context - are
         painted over it. Nothing moves per scroll frame in script. The hero keeps its in-flow height, so the first section still starts
         below the first screen. */
      position: sticky;
      top: var(--ko-stick, 0px);
      /* flow-root, NOT block. Until the script has set --ko-height the hero is an empty box of height 0, and the first reading section's
         top margin (clamp(24px, 3.5vh, 32px) + 28px, about 54-60 px) COLLAPSES THROUGH it and through the article's top edge, so the
         hero is laid out that much lower than where it settles once it has a height. The script measured it in that state and then
         its own height write moved the hero back up, leaving the circles that much above the Earth for good. A box that
         establishes a block formatting context does not let margins collapse through it: the hero is in the same place whether it
         is empty or full, so what is measured is what stays. */
      display: flow-root;
      height: var(--ko-height, 0px);
      margin: 0;
      padding: 0;
      border: 0;
      background: none;
      pointer-events: none;
      --ko-period: ${ORBIT_PERIOD_SECONDS}s;
      /* The Earth's own rim light, sampled from its limb on the rendered Numerology screen: a pale sky blue (about 170, 205, 247)
         with white where the Sun glints. The rim, the numbers and the labels are lit from this, so the circles belong to the planet
         behind them. Core = the bright edge; glow = the atmosphere around it. */
      --ko-rim: 196, 222, 255;
      --ko-glow: 118, 170, 255;
      /* The arcs' own line colour: between the rim and the atmosphere, so a thin faint line stays blue and does not go grey. */
      --ko-arc: 164, 204, 255;
      /* The type's and the highlight's colours, as variables, so the central circle can be lit gold without a second set of rules. These
         are the approved blue-white ones, and they are what the three satellites keep. */
      --ko-label: 238, 246, 255;
      --ko-number: 212, 232, 255;
      --ko-hot: 236, 246, 255;
      --ko-sheen: 226, 240, 255;
    }
    /* Two groups, both at the Earth's centre. The core holds the Life Path circle and does not move; the orbit carries the three
       satellites round it. --ko-size is the diameter of the circles in a group: everything about a circle (its box, its type, its
       spacing) is a share of it, so a satellite is the central circle at three quarters of the scale. */
    ${H} .kt-orbit-core, ${H} .kt-orbit {
      position: absolute;
      left: var(--ko-cx, 50%);
      top: var(--ko-cy, 50%);
      width: 0;
      height: 0;
      margin: 0;
      padding: 0;
      list-style: none;
      pointer-events: none;
    }
    ${H} .kt-orbit-core {
      --ko-size: var(--ko-bubble, 120px);
      /* LIFE PATH IS LIT GOLD: its rim, its label and its number, all three, and nothing else. A pale, warm gold (the app's own accent,
         216, 195, 142, lifted for light and with a deeper gold for the atmosphere), not orange and not a saturated yellow: hue about 40-45
         degrees, light and low in saturation so it reads as lit metal and not as paint. The satellites keep the Earth's blue-white. */
      --ko-rim: 238, 214, 150;
      --ko-glow: 210, 172, 92;
      --ko-label: 244, 226, 176;
      --ko-number: 248, 228, 168;
      --ko-hot: 255, 242, 204;
      --ko-sheen: 250, 232, 184;
    }
    ${H} .kt-orbit {
      --ko-size: var(--ko-sat, 90px);
      will-change: transform;
      animation: kt-orbit-spin var(--ko-period) linear infinite;
    }
    /* THE ARCS (see ARC_MASK): a ring through the satellites' centres, centred on the Earth (so around the Life Path circle), in the
       Earth's rim palette and far fainter than the circles' rims; the mask leaves three arcs between the satellites. Behind the circles
       (earlier in the hero), turning with the satellites. */
    ${H} .kt-orbit-arcs {
      position: absolute;
      left: calc(var(--ko-cx, 50%) - (var(--ko-ring, 100px) + ${ARC_PAD}px));
      top: calc(var(--ko-cy, 50%) - (var(--ko-ring, 100px) + ${ARC_PAD}px));
      width: calc(2 * (var(--ko-ring, 100px) + ${ARC_PAD}px));
      height: calc(2 * (var(--ko-ring, 100px) + ${ARC_PAD}px));
      pointer-events: none;
      background: radial-gradient(circle closest-side,
        rgba(var(--ko-glow), 0) calc(var(--ko-ring, 100px) - 11px),
        rgba(var(--ko-glow), ${(ARC_GLOW_OPACITY * 0.45).toFixed(3)}) calc(var(--ko-ring, 100px) - 6px),
        rgba(var(--ko-glow), ${ARC_GLOW_OPACITY}) calc(var(--ko-ring, 100px) - 2px),
        rgba(var(--ko-arc), ${ARC_CORE_OPACITY}) calc(var(--ko-ring, 100px) - 0.4px),
        rgba(var(--ko-arc), ${ARC_CORE_OPACITY}) calc(var(--ko-ring, 100px) + 0.4px),
        rgba(var(--ko-glow), ${ARC_GLOW_OPACITY}) calc(var(--ko-ring, 100px) + 2px),
        rgba(var(--ko-glow), ${(ARC_GLOW_OPACITY * 0.45).toFixed(3)}) calc(var(--ko-ring, 100px) + 6px),
        rgba(var(--ko-glow), 0) calc(var(--ko-ring, 100px) + 11px));
      -webkit-mask-image: repeating-conic-gradient(from 0deg at 50% 50%, ${arcMaskStops()});
      mask-image: repeating-conic-gradient(from 0deg at 50% 50%, ${arcMaskStops()});
      will-change: transform;
      animation: kt-orbit-spin var(--ko-period) linear infinite;
    }
    ${H} .kt-orbit-slot {
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      height: 0;
      transform: rotate(var(--ko-a)) translateY(calc(-1 * var(--ko-ring, 100px))) rotate(calc(-1 * var(--ko-a)));
    }
    ${H} .kt-orbit-bubble {
      position: absolute;
      left: calc(var(--ko-size, 120px) / -2);
      top: calc(var(--ko-size, 120px) / -2);
      box-sizing: border-box;
      width: var(--ko-size, 120px);
      height: var(--ko-size, 120px);
      border-radius: 50%;
      display: grid;
      align-content: center;
      justify-items: center;
      gap: calc(var(--ko-size, 120px) * 0.052);
      /* The pair sits a touch below the circle's centre and the number has air under its label: the number is the focal point. */
      padding: calc(var(--ko-size, 120px) * 0.035) 11% 0;
      text-align: center;
      /* THE RIM. Lit like the Earth's limb: a clear thin edge of the Earth's blue-white, a soft inner atmosphere, brighter on the upper
         left where the Sun is, and a tight halo with a faint wide fringe. Box shadows only (no filter, no extra layer): they are painted
         once into the circle's own layer, which never turns, so they cost nothing per frame. */
      border: 1px solid rgba(var(--ko-rim), 0.68);
      box-shadow:
        inset 0 0 0 1px rgba(var(--ko-rim), 0.14),
        inset 0 0 16px rgba(var(--ko-glow), 0.28),
        inset 3px 4px 13px -4px rgba(var(--ko-sheen), 0.42),
        0 0 10px rgba(var(--ko-glow), 0.52),
        0 0 30px rgba(var(--ko-glow), 0.24);
      /* A faint frosted-orb highlight, upper left. It is a background IMAGE (the shared glass sets only the colour) and the circle never
         turns, so the light stays where it is while the circle travels. */
      background-image: radial-gradient(120% 120% at 30% 16%, rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0) 52%);
    }
    /* A satellite counter-spins (the central circle does not turn at all) and, being smaller, spends its width a little more carefully:
       a touch less letter-spacing and side padding so "PERSONALITY" sits inside the glass at the same type size. */
    ${H} .kt-orbit .kt-orbit-bubble {
      padding-inline: 8%;
      will-change: transform;
      animation: kt-orbit-level var(--ko-period) linear infinite;
    }
    /* The satellites' type, 25 % smaller with them: the number scales with the circle (a floor of 18 px; the centre's is 26), the label to
       about 78 % of what it was (7 px at 390 against 9) with a little less letter-spacing, so "PERSONALITY" sits inside the smaller glass
       with room to spare. The centre's own type is not touched: these rules are the satellites' only.
       A MICRO-ADJUSTMENT on top of that, for clearance from the glass: the label's width is about 7.5 % less (7.03 -> 6.82 px at 390, tracking
       0.06em -> 0.03em), measured on "PERSONALITY", the longest, so the text keeps a little more air before the rim. */
    ${H} .kt-orbit .kt-orbit-label {
      font-size: clamp(6.8px, calc(var(--ko-size, 120px) * 0.097), 8.7px);
      letter-spacing: 0.03em;
    }
    ${H} .kt-orbit .kt-orbit-value {
      font-size: clamp(18px, calc(var(--ko-size, 120px) * 0.3), 44px);
    }
    /* Presentation only: nothing here takes a tap or a scroll. Said on every part, because a surface rule elsewhere sets
       pointer-events back to auto on its own descendants and an inherited none would lose to it. */
    ${H}, ${H} .kt-orbit-core, ${H} .kt-orbit-core-slot, ${H} .kt-orbit, ${H} .kt-orbit-arcs, ${H} .kt-orbit-slot, ${H} span.kt-orbit-bubble, ${H} .kt-orbit-bubble *, ${H} .kt-orbit-cue, ${H} .kt-orbit-cue * { pointer-events: none !important; }
    /* THE FOUR CIRCLES ARE THE ONLY PART OF THE HERO THAT TAKES A TOUCH, and only where they can be seen. The hero is painted BEFORE the
       reading's sections, so wherever a section's glass is over a circle the section is what is hit and the circle is not; it is a hit
       only in the open between sections. touch-action keeps a vertical drag that starts on a circle a drag of the page, so the page
       still scrolls from anywhere. Once the reading has risen past the formation (data-orbit-covered) or ended (data-orbit-done) the
       circles take nothing, and the script makes them inert. */
    ${H} button.kt-orbit-bubble { pointer-events: auto !important; touch-action: pan-y; cursor: pointer; }
    ${H}[data-orbit-covered] button.kt-orbit-bubble, ${H}[data-orbit-done] button.kt-orbit-bubble { pointer-events: none !important; }
    /* The button is reset to the circle it replaced. */
    ${H} button.kt-orbit-bubble {
      appearance: none;
      -webkit-appearance: none;
      margin: 0;
      font: inherit;
      color: inherit;
      text-transform: none;
      letter-spacing: normal;
      -webkit-tap-highlight-color: transparent;
    }
    ${H} button.kt-orbit-bubble:focus { outline: none; }
    ${H} button.kt-orbit-bubble:focus-visible { outline: 2px solid rgba(var(--ko-rim), 0.9); outline-offset: 3px; }
    /* An open meaning stops the orbit - all of it at the same instant, so the ring, the satellites and the counter-spin that keeps their type
       level stay in step, and a resume continues from where they stopped. The Earth is not part of this. */
    ${H}[data-orbit-paused] .kt-orbit, ${H}[data-orbit-paused] .kt-orbit-arcs, ${H}[data-orbit-paused] .kt-orbit-bubble { animation-play-state: paused; }
    ${H} .kt-orbit-label {
      font-size: clamp(9px, calc(var(--ko-size, 120px) * 0.085), 12px);
      font-weight: 500;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      line-height: 1.25;
      /* Stronger than before (it was a 0.7 grey): near white with the rim's blue in it, held down by a dark halo so it never washes
         out over bright cloud, and a faint blue edge so it belongs to the light. Still smaller and quieter than the number. */
      color: rgba(var(--ko-label), 0.93);
      text-shadow: 0 0 8px rgba(var(--ko-glow), 0.32), 0 1px 6px rgba(4, 7, 13, 0.85);
      text-wrap: balance;
    }
    ${H} .kt-orbit-value {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: clamp(26px, calc(var(--ko-size, 120px) * 0.3), 44px);
      line-height: 1;
      /* THE NUMBER GLOWS in the Earth's blue-white: a crisp pale core and three stacked, falling-off blues (tight, medium, wide), then a
         dark under-shadow so the glyph keeps its edge over a bright planet. Text shadows are rasterised once with the circle's layer. */
      color: rgb(var(--ko-number));
      text-shadow:
        0 0 5px rgba(var(--ko-hot), 0.85),
        0 0 13px rgba(var(--ko-glow), 0.95),
        0 0 28px rgba(var(--ko-glow), 0.6),
        0 0 46px rgba(var(--ko-glow), 0.26),
        0 1px 3px rgba(4, 7, 13, 0.5);
    }
    /* THE SCROLL CUE. Hidden until the script has placed it (data-orbit-cue), then centred on the Earth in the band between the formation and
       the MENU capsule. Three chevrons that overlap; a soft wide stroke for the light, a fine pale one for the line, in the Earth's rim
       palette. Calm: a slow cascade from the top one to the bottom one, each fading up, drifting a few pixels down and fading away.
       Opacity and transform only, on three tiny layers: nothing per frame in script and nothing that repaints. */
    /* The reading has been read to its end: the pinned scene fades out instead of being carried off the foot of the page by the sticky release
       (the screen ends on the Earth alone, as every opened screen does). It fades back when the reader scrolls up into the reading again. */
    ${H} { transition: opacity 420ms ease, visibility 0s linear 0s; }
    ${H}[data-orbit-done] { opacity: 0; visibility: hidden; transition: opacity 420ms ease, visibility 0s linear 420ms; }
    ${H} .kt-orbit-cue { display: none; }
    ${H}[data-orbit-cue] .kt-orbit-cue {
      display: block;
      position: absolute;
      left: calc(var(--ko-cx, 50%) - ${CUE_WIDTH / 2}px);
      top: var(--ko-cue-top, 0px);
      width: ${CUE_WIDTH}px;
      height: ${CUE_HEIGHT}px;
    }
    ${H} .kt-orbit-cue-step {
      display: block;
      height: 15px;
      margin-bottom: -6px;
      opacity: 0.5;
      will-change: opacity, transform;
      animation: kt-orbit-cue 2.8s ease-in-out infinite;
      animation-delay: calc(var(--ko-cue-i, 0) * 0.32s);
    }
    ${H} .kt-orbit-cue-step:nth-child(1) { --ko-cue-i: 0; }
    ${H} .kt-orbit-cue-step:nth-child(2) { --ko-cue-i: 1; }
    ${H} .kt-orbit-cue-step:nth-child(3) { --ko-cue-i: 2; }
    ${H} .kt-orbit-cue svg { display: block; overflow: visible; }
    ${H} .kt-orbit-cue path { fill: none; stroke-linecap: round; stroke-linejoin: round; }
    ${H} .kt-orbit-cue-glow { stroke: rgba(var(--ko-glow), 0.34); stroke-width: 5.4; }
    ${H} .kt-orbit-cue-line { stroke: rgba(var(--ko-label), 0.92); stroke-width: 1.38; }
    @keyframes kt-orbit-cue {
      0%, 100% { opacity: 0.14; transform: translateY(-2px); }
      34% { opacity: 0.95; transform: translateY(0); }
      68% { opacity: 0.14; transform: translateY(3px); }
    }
    @keyframes kt-orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes kt-orbit-level { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
    @media (prefers-reduced-motion: reduce) {
      ${H}:not([data-orbit-motion="on"]) .kt-orbit,
      ${H}:not([data-orbit-motion="on"]) .kt-orbit-arcs,
      ${H}:not([data-orbit-motion="on"]) .kt-orbit-bubble { animation: none; will-change: auto; }
      /* A device that asks for less motion still sees the cue, as three chevrons that fade down: it points, it does not move. */
      ${H}:not([data-orbit-motion="on"]) .kt-orbit-cue-step { animation: none; will-change: auto; }
      ${H}:not([data-orbit-motion="on"]) .kt-orbit-cue-step:nth-child(1) { opacity: 0.3; }
      ${H}:not([data-orbit-motion="on"]) .kt-orbit-cue-step:nth-child(2) { opacity: 0.6; }
      ${H}:not([data-orbit-motion="on"]) .kt-orbit-cue-step:nth-child(3) { opacity: 0.95; }
    }
  `;
}
