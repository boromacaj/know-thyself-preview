import { COLOUR_FAMILY_IDS } from '../colors/colorFamilies.js?v=d9a1a90';
import { INTERFACE_COLOR_ATTRIBUTE } from '../colors/colorPreferences.js?v=d9a1a90';
/*
 * THE SYNTHESIS CARD IS A TRANSLUCENT SKIN UNDER TRANSPARENT (owner, 2026-11-01: "when I change the Earth's glow to pink, the Synthesis stays blue - and it is meant to be a translucent skin").
 *
 * Interface Color has one default, TRANSPARENT: "the native glass, its neutral hairlines and nothing else". The pillars and the bottom cards are exactly that. The Synthesis card was the one
 * object that was not: its native rule draws a rim, a wash and a glow from the THEME's accent (`--kt-accent-rgb`, the strip's active capsule's), which on the default theme is BLUE - so under
 * Transparent it was a blue object among neutral glass, and stayed blue whatever the Earth's glow, which is deliberately only the light around the planet. A chosen colour family already
 * overrides all of it (menuEdgeLightStyle.ts); this is the missing half, for Transparent: a neutral white hairline (the theme's own pale blue would still tint it), a little stronger than a neighbour's because it is the centre of the
 * composition, no coloured wash, no coloured glow - the lift off the Earth and the inner hairline it always had. The Earth, and whatever glow it wears, is seen through it.
 *
 * The base rule (menuExperience.ts) is untouched and is what a theme-accented card falls back to; this sits over it only where no colour family is chosen. Colour only: no geometry, no motion.
 */
const HOST = '#place-experience';
/** The host with no colour family chosen: Transparent, or no attribute at all. */
export const TRANSPARENT_SCOPE = `${HOST}:not(:is(${COLOUR_FAMILY_IDS.map((id) => `[${INTERFACE_COLOR_ATTRIBUTE}="${id}"]`).join(', ')}))`;
export const MENU_SYNTHESIS_SKIN_CSS = `
    /* ------------------------------------------------ the synthesis card under Transparent: a translucent skin, no colour of its own */
    ${TRANSPARENT_SCOPE} .kt-menu .kt-menu-synthesis {
      border-color: rgba(255, 255, 255, 0.28);
      background-image: none;
      box-shadow:
        0 20px 38px -12px rgba(0, 0, 0, 0.7),
        0 0 0 1px rgba(255, 255, 255, 0.05) inset;
    }
`;
