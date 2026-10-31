/*
 * THE MAIN MENU'S EDGE LIGHT: dark translucent glass with light injected into its edges, in the colour the person chose as their INTERFACE COLOR (Settings -> Colors). This is the approved
 * baseline of that choice: the Main Menu is where the edge-lit glass language was drawn first, and its look is unchanged by Interface Color becoming the application's.
 *
 * WHAT IT LIGHTS: the top four pillars, the Synthesis card, the bottom three cards and the names of all eight (the four pillars' short names stand under their cards, as do the three bottom
 * names; the Synthesis name stands under its card). Nothing else here: the rest of the application's chrome takes the same
 * colour through the shared roles in app/colors/interfaceColorStyle.ts, and no rule in THIS file selects anything outside the main menu's own cards and names.
 *
 * ONE SOURCE OF TRUTH
 *   COLOR_FAMILIES (app/colors/colorFamilies.ts)  the one registry of colours. The three tokens this file reads - --kt-edge-core / -tint / -soft (R, G, B) - are set on the host by the
 *                                                  Interface Color stylesheet from the chosen family; this file never names a colour and there is no per-colour geometry.
 *   --kt-edge-core/-tint/-soft                     the pale highlight of the line, the colour of its light, and a very pale lift.
 * Only the COLOUR changes between choices; the line width, the fade, the glow, the synthesis treatment and the names' treatment are shared.
 *
 * TRANSPARENT IS "NO ADDED LIGHT", NOT "NO CARDS". Every rule below is scoped to the choices that light the menu (`LIT_SCOPE`), so with Transparent none of them applies at all: the cards
 * are exactly the native glass they were (their own hairline, fill, shadow, the names' dark halo), with no colour residue and nothing to switch off.
 *
 * STATIC CSS, NO MOTION. It adds no element, no animation and no layout. Each card's line is its own `::before` (a masked ring, `pointer-events: none`, under the art and the name); its
 * glow is `box-shadow` entries. Choosing a colour changes one attribute.
 *
 * THE LINE is a vertical gradient masked to a ring, so the colour of the line at a given height IS the light at that height: the foot edge is lit most, the sides are lit along their lower
 * half and gone by the middle, the head edge keeps only the card's own hairline. THE GLOW is a stack of three bottom-biased shadows (tight, medium, bloom) and a thin inner rim at the foot;
 * a negative spread keeps each one under the card and down its lower sides. The pillars and the bottom cards have no fill. THE SYNTHESIS CARD is the same light, more of it: lit all round
 * (strongest at the foot), a soft interior wash and a glow on every side.
 *
 * STRENGTH AND FADE ARE TOKENS TOO, set once for every lit choice:
 *   --kt-lit-width, --kt-lit-line, --kt-lit-glow   width and opacity of the line, opacity of the glow (pillars and bottom cards, the same treatment)
 *   --kt-lit-h1..h4, --kt-lit-f0..f4               where (height from the foot) and how much: 100% at the foot, then the stops
 *   --kt-synthesis-line, -glow, -wash              the synthesis card: line, glow, and the interior wash (the only card with one)
 *   --kt-name-glow                                 the glow of a name
 */
import { LIT_SCOPE } from '../colors/interfaceColorStyle.js?v=53c0693';
/** Every rule below sits under this: the host, with Interface Color set to a family. Transparent matches nothing here. Defined once, with the rest of Interface Color. */
export { LIT_SCOPE };
/** The fade: height from the foot, and the share of the full intensity at the foot, at each height and above the last. */
export const LIT_FADE = { heights: ['18%', '32%', '45%', '54%'], factors: [1, 0.7, 0.4, 0.15, 0.03] };
/** Strengths of the line and the glow of the pillars and bottom cards, of the synthesis card, and of a name's glow. */
export const LIT_STRENGTH = { width: '1px', line: 0.6, glow: 0.7, synthesisLine: 0.7, synthesisGlow: 0.8, synthesisWash: 0.5, nameGlow: 0.55 };
/** The vertical gradient of the lit line: the core at the foot, the tint above it, the stops from the tokens, nothing at the head. */
const LINE_GRADIENT = `linear-gradient(to top,
          rgba(var(--kt-edge-core), calc(var(--kt-lit-line) * var(--kt-lit-f0))) 0%,
          rgba(var(--kt-edge-core), calc(var(--kt-lit-line) * var(--kt-lit-f0) * 0.9)) 5%,
          rgba(var(--kt-edge-tint), calc(var(--kt-lit-line) * var(--kt-lit-f1))) var(--kt-lit-h1),
          rgba(var(--kt-edge-tint), calc(var(--kt-lit-line) * var(--kt-lit-f2))) var(--kt-lit-h2),
          rgba(var(--kt-edge-tint), calc(var(--kt-lit-line) * var(--kt-lit-f3))) var(--kt-lit-h3),
          rgba(var(--kt-edge-tint), calc(var(--kt-lit-line) * var(--kt-lit-f4))) var(--kt-lit-h4),
          rgba(var(--kt-edge-tint), 0) 100%)`;
/** The glow stack of a lit card: tight, medium and bloom (pushed down and held in by a negative spread), and a thin inner rim at the foot. */
const GLOW_SHADOWS = `
        0 4px 9px -5px rgba(var(--kt-edge-tint), calc(var(--kt-lit-glow) * 0.55)),
        0 9px 20px -10px rgba(var(--kt-edge-tint), calc(var(--kt-lit-glow) * 0.38)),
        0 15px 36px -14px rgba(var(--kt-edge-tint), calc(var(--kt-lit-glow) * 0.26)),
        inset 0 -9px 13px -11px rgba(var(--kt-edge-tint), calc(var(--kt-lit-glow) * 0.34))`;
/** The synthesis card's line: lit all round, the foot brightest and the head still a clear line. */
const SYNTHESIS_LINE_GRADIENT = `linear-gradient(to top,
          rgba(var(--kt-edge-soft), calc(var(--kt-synthesis-line) * 0.98)) 0%,
          rgba(var(--kt-edge-core), calc(var(--kt-synthesis-line) * 0.9)) 12%,
          rgba(var(--kt-edge-tint), calc(var(--kt-synthesis-line) * 0.8)) 55%,
          rgba(var(--kt-edge-tint), calc(var(--kt-synthesis-line) * 0.6)) 100%)`;
/** The light of a name: its colour (the pale of the family) and its glow, the same on every name of the menu. */
const NAME_LIGHT = `
      color: rgba(var(--kt-edge-soft), 0.96);
      text-shadow:
        0 0 6px rgba(6, 8, 12, 0.9),
        0 0 2px rgba(6, 8, 12, 0.9),
        0 0 1px rgba(var(--kt-edge-core), calc(var(--kt-name-glow) * 0.55)),
        0 0 9px rgba(var(--kt-edge-tint), calc(var(--kt-name-glow) * 0.6));`;
/** A masked ring: the border box minus the padding box, filled with `gradient`. */
const ring = (width, radius, inset, gradient) => `
      content: "";
      position: absolute;
      inset: ${inset};
      z-index: 0;
      box-sizing: border-box;
      padding: ${width};
      border-radius: ${radius};
      pointer-events: none;
      background: ${gradient};
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      mask-composite: exclude;`;
/** The whole stylesheet: the strengths, then the one shared set of rules, all inside `LIT_SCOPE`. */
export function menuEdgeLightCss() {
    return `
    /* ------------------------------------------------------ strength tokens, shared */
    ${LIT_SCOPE} .kt-menu {
      --kt-lit-width: ${LIT_STRENGTH.width};
      --kt-lit-line: calc(${LIT_STRENGTH.line} * var(--kt-interface-gain, 1));
      --kt-lit-glow: calc(${LIT_STRENGTH.glow} * var(--kt-interface-gain, 1));
      --kt-lit-h1: ${LIT_FADE.heights[0]};
      --kt-lit-h2: ${LIT_FADE.heights[1]};
      --kt-lit-h3: ${LIT_FADE.heights[2]};
      --kt-lit-h4: ${LIT_FADE.heights[3]};
      --kt-lit-f0: ${LIT_FADE.factors[0]};
      --kt-lit-f1: ${LIT_FADE.factors[1]};
      --kt-lit-f2: ${LIT_FADE.factors[2]};
      --kt-lit-f3: ${LIT_FADE.factors[3]};
      --kt-lit-f4: ${LIT_FADE.factors[4]};
      --kt-synthesis-line: calc(${LIT_STRENGTH.synthesisLine} * var(--kt-interface-gain, 1));
      --kt-synthesis-glow: calc(${LIT_STRENGTH.synthesisGlow} * var(--kt-interface-gain, 1));
      --kt-synthesis-wash: calc(${LIT_STRENGTH.synthesisWash} * var(--kt-interface-gain, 1));
      --kt-name-glow: calc(${LIT_STRENGTH.nameGlow} * var(--kt-interface-gain, 1));
    }

    /* ----------------------------------------- the four pillars, the bottom three
       The same light on all seven: only the edge is coloured, nothing inside a card changes and no card is filled. A pillar clips its contents (overflow: hidden), so its ring sits
       just inside its hairline; a bottom card's ring covers its border. */
    ${LIT_SCOPE} .kt-menu .kt-menu-pillar {
      box-shadow:
        0 14px 30px -10px rgba(0, 0, 0, 0.62),
        0 0 0 1px rgba(255, 255, 255, 0.035) inset,${GLOW_SHADOWS};
    }
    ${LIT_SCOPE} .kt-menu .kt-menu-pillar::before {${ring('var(--kt-lit-width)', '13px', '0', LINE_GRADIENT)}
    }
    ${LIT_SCOPE} .kt-menu .kt-menu-tiles .kt-menu-tile {
      box-shadow:
        0 14px 30px -10px rgba(0, 0, 0, 0.55),${GLOW_SHADOWS};
    }
    ${LIT_SCOPE} .kt-menu .kt-menu-tiles .kt-menu-tile::before {${ring('var(--kt-lit-width)', 'inherit', '-1px', LINE_GRADIENT)}
    }

    /* ------------------------------------------------ the synthesis card
       The same light, more of it: lit all round (the foot most, the head still a clear line), a soft interior wash, and a glow on every side with a fuller bloom below. */
    ${LIT_SCOPE} .kt-menu .kt-menu-synthesis {
      isolation: isolate;
      border-color: rgba(var(--kt-edge-soft), 0.28);
      background-image:
        linear-gradient(rgba(var(--kt-edge-tint), calc(var(--kt-synthesis-wash) * 0.12)), rgba(var(--kt-edge-tint), calc(var(--kt-synthesis-wash) * 0.12))),
        radial-gradient(85% 90% at 50% 100%, rgba(var(--kt-edge-tint), calc(var(--kt-synthesis-wash) * 0.26)), rgba(var(--kt-edge-tint), 0) 100%);
      box-shadow:
        0 20px 38px -12px rgba(0, 0, 0, 0.7),
        0 0 0 1px rgba(255, 255, 255, 0.05) inset,
        0 0 18px -4px rgba(var(--kt-edge-tint), calc(var(--kt-synthesis-glow) * 0.4)),
        0 8px 22px -8px rgba(var(--kt-edge-tint), calc(var(--kt-synthesis-glow) * 0.55)),
        0 16px 38px -12px rgba(var(--kt-edge-tint), calc(var(--kt-synthesis-glow) * 0.4)),
        inset 0 0 22px -12px rgba(var(--kt-edge-tint), calc(var(--kt-synthesis-glow) * 0.5)),
        inset 0 -16px 24px -16px rgba(var(--kt-edge-soft), calc(var(--kt-synthesis-glow) * 0.4));
    }
    ${LIT_SCOPE} .kt-menu .kt-menu-synthesis::before {${ring('var(--kt-lit-width)', 'inherit', '-1px', SYNTHESIS_LINE_GRADIENT)}
    }

    /* ------------------------------------------------------------ the names
       Tarot, Connections, Forecast, and now the four pillars' short names and the Synthesis name: where they stand, their type and their size are untouched. Only their colour (the
       pale of the family) and a glow change: a tight halo and a soft one, over the dark halo they already carry for legibility. The same text on every name. */
    ${LIT_SCOPE} .kt-menu .kt-menu-tiles .kt-menu-tile .kt-menu-tile-label {${NAME_LIGHT}
    }
    ${LIT_SCOPE} .kt-menu .kt-menu-pillar .kt-menu-label {${NAME_LIGHT}
    }
    ${LIT_SCOPE} .kt-menu .kt-menu-synthesis .kt-menu-synthesis-label {${NAME_LIGHT}
    }
`;
}
export const MENU_EDGE_LIGHT_CSS = menuEdgeLightCss();
