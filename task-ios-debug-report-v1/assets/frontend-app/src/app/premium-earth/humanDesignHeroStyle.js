import { HD_CENTER_IDS, HD_SONAR_CYCLE_SECONDS, HD_SONAR_PEAK, HD_SONAR_RHYTHM, HD_TAP_PEAK, HD_TAP_SECONDS, hdSonarSlot, } from '../components/humanDesignHeroConfig.js?v=b5ef5ed';
import { pingDelaySeconds, pingKeyframes, pingSeconds, sequenceKeyframes, sequencedAnimation, SEQUENCE_GROW_EASING } from './heroSonarSequence.js?v=b5ef5ed';
import { KT_SONAR_DEFAULTS } from './sonarAffordance.js?v=b5ef5ed';
/*
 * THE HUMAN DESIGN HERO - ITS STYLESHEET: SIZE, SONAR, CONTROL AND CUE (V1.6).
 *
 * The BodyGraph card is the page's hero. It is drawn by humanDesignBodygraph.ts (markup) from humanDesignHeroConfig.ts (the table of numbers); this is the text that makes it big, makes it
 * answer a tap and lets the light travel through it. It is included in the premium pillar stylesheet (premiumPillarExperience.ts) and nowhere else.
 *
 * SIZE. The card is 95% of a phone's width WHATEVER the screen's height (a tall card scrolls), by a negative margin that gives the surface's gutters back, while the page still never scrolls
 * sideways. Its proportion and everything inside it are unchanged: the card is one drawing that scales as a whole.
 *
 * THE BODYGRAPH IS STATIC. THE ENERGY MOVES THROUGH LIGHT. Nothing in the graph moves: the centres, their numbers, the glass, the mask and the frost stand still. The only animation is the SONAR WAVE, a decorative
 * <svg> per centre laid over the graph at the HTML level, whose opacity and CSS scale are animated with the BaZi hero's own keyframes and timing (heroSonarSequence.ts). See humanDesignHeroConfig.ts.
 */
const P = '#place-experience';
const round = (value, digits = 3) => Number(value.toFixed(digits));
const seconds = (value) => `${round(value, 3)}s`;
const percent = (value) => round(value * 100, 3);
/** Each centre's turn, written out as a time (as the BaZi view writes its delay tokens): its place in the owner's order times the BaZi slot. The delay is a TOKEN read by the animation shorthand (`--hd-seq-delay`), as in
    BaZi; the selector carries the animation rule's whole chain so that the token set here is the one the element ends up with. */
const IDLE_DELAYS = HD_CENTER_IDS.map((id) => `      ${P} .hd-hero .hd-bodygraph-stage .hd-wave--idle[data-center-id="${id}"] { --hd-seq-delay: ${pingSeconds(pingDelaySeconds(HD_SONAR_RHYTHM, hdSonarSlot(id)))}; }`).join('\n');
/** The tones: the same variable the centre's bloom and glow read; the rule's selectors are listed in premiumPillarExperience.ts so a ring and its centre can never be different colours. */
export const HD_SONAR_NEUTRAL_RGB = '190, 196, 204';
export const HD_HERO_CARD_SHARE = 0.95;
/** The card's width cap on a wide screen (the deck's own, unchanged: a desktop is not given a stretched phone). */
export const HD_HERO_MAX_PX = 560;
/** The bottom band the hero keeps clear for the MENU capsule, CSS px (the capsule is 46 px high, 14 px from the foot of the screen in the menu-only chrome). */
export const HD_HERO_MENU_CLEARANCE = 84;
/** The deck's height over its width (premiumPillarExperience.ts: the plate is 164.1% of the column). */
export const HD_DECK_ASPECT = 1.641;
/** What a wide screen keeps free besides the top space: the hint line, the cue and the MENU capsule's band, the gap under the title, CSS px. */
export const HD_HERO_WIDE_CHROME = 190;
/** The narrowest card a wide-but-short window (a phone on its side) is given; it then scrolls. */
export const HD_HERO_MIN_WIDE_PX = 280;
export const HUMAN_DESIGN_HERO_CSS = `
    /* ==========================================================================================================================
       THE HUMAN DESIGN HERO (humanDesignHeroStyle.ts)
       ========================================================================================================================== */

    /* ------------------------------------------------------------------------------------------------------------- SIZE ---
       ${HD_HERO_CARD_SHARE * 100}% of the phone's width. The deck is the column (the surface's 18 px gutters on a 390 px phone leave 354 px: 90.8%); the negative margin gives the gutters
       back down to ${Math.round((1 - HD_HERO_CARD_SHARE) * 50 * 100) / 100}% of the screen at each side. The width is stated against the screen (vw), so the deck's own aspect ratio and the stage inside it (126% wide, placed by the plate) are
       untouched: the card is the same drawing, larger. The clip margin that lets the rim's bloom past the deck's edge is held to 8 px, which is inside the margin that is left. */
    ${P} .kt-pillar-surface .hd-deck {
      --hd-card-w: min(${HD_HERO_CARD_SHARE * 100}vw, ${HD_HERO_MAX_PX}px);
      width: var(--hd-card-w);
      max-width: none;
      margin-inline: calc(50% - var(--hd-card-w) / 2);
      overflow-clip-margin: 8px;
    }
    /* A PHONE'S CARD IS ${HD_HERO_CARD_SHARE * 100}vw WHATEVER THE HEIGHT OF THE SCREEN (V1.4). V1.3 held it to the screen's height and shrank it to 78-85% of the width on short phones, against the
       agreed 94-96%: a card taller than the screen scrolls, and the MENU capsule and the cue are kept apart by layout and spacing (the controller's placeLowerHero), never by shrinking the graph.
       Nothing in this rule, or anywhere in the stylesheet outside the tablet and desktop block below, may read the height of the screen into the card's width (a test holds that).

       On a wide screen (tablet, desktop) the card is also held to the height of the window (its aspect is ${HD_DECK_ASPECT}: width x ${HD_DECK_ASPECT} is its height), so that the whole card, the hint and the cue stand in one screen above the MENU capsule
       instead of the capsule lying over the lower centres. A phone is not held to this: a short phone gets a tall, scrollable card at ${HD_HERO_CARD_SHARE * 100}% of its width. */
    @media (min-width: 720px) {
      ${P} .kt-pillar-surface .hd-deck {
        --hd-card-w: max(${HD_HERO_MIN_WIDE_PX}px, min(${HD_HERO_CARD_SHARE * 100}vw, ${HD_HERO_MAX_PX}px, calc((100vh - var(--kt-top-space, 46px) - ${HD_HERO_WIDE_CHROME}px) / ${HD_DECK_ASPECT})));
        --hd-card-w: max(${HD_HERO_MIN_WIDE_PX}px, min(${HD_HERO_CARD_SHARE * 100}vw, ${HD_HERO_MAX_PX}px, calc((100dvh - var(--kt-top-space, 46px) - ${HD_HERO_WIDE_CHROME}px) / ${HD_DECK_ASPECT})));
      }
    }

    /* ----------------------------------------------------------------------------------------------------------- THE HERO ---
       The card, its hint and the scroll cue are ONE block that is a screen high, so the reading below starts below the fold and the MENU capsule never lies on a line of text at rest. The cue sits at the foot
       of the block, above the clearance the capsule needs; on a screen too short for the card the block is as tall as the card and the cue is simply after it. */
    ${P} .hd-hero {
      position: relative;
      display: flex;
      flex-direction: column;
      min-height: calc(100vh - var(--kt-top-space, 46px) - clamp(22px, 4.6vh, 30px));
      min-height: calc(100dvh - var(--kt-top-space, 46px) - clamp(22px, 4.6vh, 30px));
      padding-bottom: ${HD_HERO_MENU_CLEARANCE}px;
    }
    ${P} .hd-hero > .hd-deck-hint { margin-top: calc(8px + var(--hd-hint-push, 0px)); margin-bottom: 0; }
    ${P} .hd-scroll-cue {
      position: relative;
      align-self: center;
      flex: none;
      margin-top: calc(4px + var(--hd-cue-push, 0px));
      padding: 4px 14px;
      border: 0;
      background: none;
      color: inherit;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: opacity 360ms ease, visibility 0s linear 0s;
    }
    ${P} .hd-scroll-cue:focus-visible { outline: 2px solid rgba(var(--kt-accent-soft-rgb, 247, 224, 173), 0.7); outline-offset: 2px; border-radius: 12px; }
    /* The cue has done its work once the reader has left the card: it fades out and takes no taps. */
    ${P} .hd-hero[data-hd-cue="off"] .hd-scroll-cue { opacity: 0; visibility: hidden; pointer-events: none; transition: opacity 360ms ease, visibility 0s linear 360ms; }
    /* The same cue as the other heroes' (numerologyOrbit.ts): three thin chevrons that overlap, a faint wide stroke for the light and a fine pale one for the line, each fading up, drifting a few px down and
       away in a slow cascade. Opacity and transform only. The palette is the page's accent. */
    ${P} .hd-scroll-cue .hd-scroll-cue-art { position: relative; width: 31px; height: 31px; }
    ${P} .hd-scroll-cue .hd-scroll-cue-art-step {
      display: block;
      height: 15px;
      margin-bottom: -6px;
      opacity: 0.5;
      will-change: opacity, transform;
      animation: hd-scroll-cue-fall 2.8s ease-in-out infinite;
      animation-delay: calc(var(--ko-cue-i, 0) * 0.32s);
    }
    ${P} .hd-scroll-cue .hd-scroll-cue-art-step:nth-child(1) { --ko-cue-i: 0; }
    ${P} .hd-scroll-cue .hd-scroll-cue-art-step:nth-child(2) { --ko-cue-i: 1; }
    ${P} .hd-scroll-cue .hd-scroll-cue-art-step:nth-child(3) { --ko-cue-i: 2; }
    ${P} .hd-scroll-cue svg { display: block; overflow: visible; }
    ${P} .hd-scroll-cue path { fill: none; stroke-linecap: round; stroke-linejoin: round; }
    ${P} .hd-scroll-cue .hd-scroll-cue-art-glow { stroke: rgba(var(--kt-accent-rgb, 218, 171, 84), 0.34); stroke-width: 5.4; }
    ${P} .hd-scroll-cue .hd-scroll-cue-art-line { stroke: rgba(var(--kt-accent-soft-rgb, 247, 224, 173), 0.92); stroke-width: 1.38; }
    @keyframes hd-scroll-cue-fall {
      0%, 100% { opacity: 0.14; transform: translateY(-2px); }
      34% { opacity: 0.95; transform: translateY(0); }
      68% { opacity: 0.14; transform: translateY(3px); }
    }
    /* The key-output capsules that used to open the screen now follow the card; the cue brings them to the top with a margin. */
    ${P} [data-hd-reading-start] { scroll-margin-top: 14px; }
    /* a chart with no key outputs (no birth time) has no capsules to bring up: the cue's target is then an empty line before the first section */
    ${P} .kt-reading-start { display: block; height: 0; }

    /* ------------------------------------------------------------------------------------------------------- THE CONTROLS ---
       A centre is a control. The graph is a drawing over a card whose whole face is the "switch cards" button, so while the graph is the card in front the stage rises above that button,
       passes every touch through (the surface makes every descendant tappable again; this is stronger than that rule), and gives a touch back only to the nine hit regions. */
    ${P} .hd-deck[data-hd-deck="graph"] .hd-bodygraph-stage { z-index: 5; }
    ${P} .hd-hero .hd-bodygraph-stage,
    ${P} .hd-hero .hd-bodygraph-stage * { pointer-events: none; }
    ${P} .hd-hero .hd-bodygraph-stage .hd-center-hit {
      pointer-events: all;
      fill: transparent;
      stroke: transparent;
      cursor: pointer;
      outline: none;
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
    }
    /* Looked at, or focused with the keyboard: the centre's own rim lights up a little (and a focus ring is drawn on the hit region's outline, in the centre's tone). */
${HD_CENTER_IDS.map((id) => `    ${P} .human-design-bodygraph:has(.hd-top[data-center-id="${id}"]:is(:hover, :has(:focus-visible))) .human-design-bodygraph__center-group[data-center-id="${id}"] .human-design-bodygraph__center { stroke: rgba(var(--hd-centre-rgb, var(--hd-accent-soft-rgb)), 0.86); }`).join('\n')}
    ${P} .hd-hero .hd-bodygraph-stage .hd-center-hit:focus-visible { stroke: rgba(var(--hd-centre-rgb, var(--hd-accent-soft-rgb)), 0.7); stroke-width: 2.4; }

    /* ------------------------------------------------------------------------------------------------------------- SONAR ---
       ONE smooth luminous wave leaves a STATIONARY centre: the centre's own silhouette, in the centre's own colour, a fine bright line (the standard's 1.5 px at 0.72) with a softer line of glow beside it,
       that GROWS with the standard's ease-out while it FADES linearly - the BaZi circles' ring, not a copy of it: the same primitive (heroSonarSequence.ts), the same ease-out and travel, peak ${HD_SONAR_PEAK} - at the fast ping rhythm (a wave every ${pingSeconds(HD_SONAR_RHYTHM.startInterval)}, each alive for
       ${pingSeconds(HD_SONAR_RHYTHM.visible)} like the Western Astrology wave, so several are alive at once). The centre is never scaled, moved or dimmed by it.

       THE RING IS NOT IN THE GRAPH. It is its own small <svg> (.hd-wave, in .hd-wave-layer after the graph), sized to the centre and placed over it by percentages; the animated properties are that element's
       OPACITY and a CSS SCALE about its own middle - the technique of the BaZi seasonal wheel's petal rings (svg.bazi-petal-ring), which is proven on a physical Samsung. The graph's own svg gets no transform,
       no animation, no mask or clip change.

       TWO RINGS PER CENTRE:
         THE IDLE SCAN, with no touch and no script: a cycle of ${pingSeconds(HD_SONAR_CYCLE_SECONDS)} (a wave every ${pingSeconds(HD_SONAR_RHYTHM.startInterval)}, each alive for ${pingSeconds(HD_SONAR_RHYTHM.visible)}, then ${pingSeconds(HD_SONAR_RHYTHM.rest)} of rest after the last), the nine centres' turns down the body (Head, Ajna, Throat, G, Heart, Sacral, Spleen, Solar Plexus, Root) and a turn of
           rest; the waves overlap (about five alive in the middle of a scan), none is cut short.
         THE ANSWER TO A TAP (is-pinged on that centre's tap ring, put there by the controller): the same wave, once, a little brighter (the standard's pressed peak ${HD_TAP_PEAK}). */
    ${P} .hd-wave-layer { position: absolute; inset: 0; pointer-events: none; z-index: 3; }
    ${P} .hd-wave {
      --hd-wave-rgb: var(--hd-centre-rgb, var(--hd-accent-rgb, ${KT_SONAR_DEFAULTS.rgb}));
      --hd-seq-period: ${pingSeconds(HD_SONAR_CYCLE_SECONDS)}; --hd-seq-peak: ${HD_SONAR_PEAK}; --hd-seq-sx: var(--hd-wave-scale, 1.2); --hd-seq-sy: var(--hd-wave-scale, 1.2); --hd-seq-delay: 0s;
      position: absolute; display: block; overflow: visible; box-sizing: border-box;
      opacity: 0; transform: scale(1); transform-origin: 50% 50%; pointer-events: none;
    }
    ${P} .hd-wave[data-center-state="suppressed"] { --hd-wave-rgb: ${HD_SONAR_NEUTRAL_RGB}; }
    ${P} .hd-wave path { fill: none; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
    ${P} .hd-wave-line { stroke: rgba(var(--hd-wave-rgb), 0.72); stroke-width: 1.5px; }
    ${P} .hd-wave-glow { stroke: rgba(var(--hd-wave-rgb), 0.3); stroke-width: 4.5px; }
    ${P} .hd-wave--tap { --hd-seq-peak: ${HD_TAP_PEAK}; }

    /* the BaZi hero's keyframes, for the idle scan's cycle of turns and for the tap's single turn */
${pingKeyframes('hd-ping9', HD_SONAR_RHYTHM, 'hd-seq')}
${sequenceKeyframes('hd-tap', 1, 'hd-seq')}

    @media (prefers-reduced-motion: no-preference) {
      ${P} .hd-hero .hd-bodygraph-stage .hd-wave--idle { ${sequencedAnimation('hd-ping9', 'hd-seq')} }
${IDLE_DELAYS}
      ${P} .hd-hero .hd-bodygraph-stage .hd-wave--tap.is-pinged {
        animation:
          hd-tap-grow ${seconds(HD_TAP_SECONDS)} ${SEQUENCE_GROW_EASING} 0s 1,
          hd-tap-fade ${seconds(HD_TAP_SECONDS)} linear 0s 1;
      }
      /* The card is not on screen, or the document is hidden, or the cards are switched to the panels: the clocks stop where they are and go on from there (humanDesignHeroController.ts sets
         data-hd-run from the IntersectionObserver and the page's visibility). Nothing else stills the sonar: no frame probe, no device class. */
      ${P} .bodygraph-diagram[data-hd-run="off"] .human-design-bodygraph *, ${P} .bodygraph-diagram[data-hd-run="off"] .hd-wave { animation-play-state: paused !important; }
      ${P} .hd-deck[data-hd-deck="panels"] .human-design-bodygraph *, ${P} .hd-deck[data-hd-deck="panels"] .hd-wave { animation-play-state: paused !important; }
      /* (the rest rules repeat the class, or the animation rules - which name the hero and the stage - would outweigh them) */
      ${P} .hd-deck[data-hd-deck="panels"] .hd-bodygraph-stage .hd-wave.hd-wave.hd-wave { animation: none; opacity: 0; }
      /* A panel open over the page: the page behind is not asking to be looked at - the IDLE scan rests - and goes on when it closes. (The tap's own wave is the answer to the touch that opened the panel: it plays out.) */
      html:has(.kt-concept-backdrop) ${P} .hd-hero .hd-bodygraph-stage .hd-wave--idle.hd-wave--idle { animation: none; opacity: 0; }
    }

    /* Less motion: no idle ring is drawn, and a tap answers with one still, faint outline for the moment the explanation takes to open. */
    @media (prefers-reduced-motion: reduce) {
      ${P} .hd-hero .hd-bodygraph-stage .hd-wave--tap.is-pinged { opacity: 0.35; transform: scale(calc(1 + (var(--hd-wave-scale, 1.2) - 1) * 0.5)); }
      ${P} .hd-scroll-cue .hd-scroll-cue-art-step { animation: none; will-change: auto; }
      ${P} .hd-scroll-cue .hd-scroll-cue-art-step:nth-child(1) { opacity: 0.3; }
      ${P} .hd-scroll-cue .hd-scroll-cue-art-step:nth-child(2) { opacity: 0.6; }
      ${P} .hd-scroll-cue .hd-scroll-cue-art-step:nth-child(3) { opacity: 0.95; }
    }
`;
