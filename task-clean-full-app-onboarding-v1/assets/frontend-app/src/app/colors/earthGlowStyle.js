import { COLOR_FAMILIES, COLOUR_FAMILY_IDS, hexToTriplet } from './colorFamilies.js?v=f9ab0a6';
import { EARTH_GLOW_ATTRIBUTE } from './colorPreferences.js?v=f9ab0a6';
/*
 * EARTH GLOW: THE LIGHT AROUND THE EARTH, AND NOTHING ELSE.
 *
 * One choice sets one family's two colours on the Earth's own glow elements: the rim stroke and the atmosphere falling off outside it (`.kt-vessel-glow-ring`) and the effects layer's rim
 * (`.kt-earth-effects-layer`). Those are CSS drawings AROUND the live renderer. The planet itself - oceans, continents, clouds, the Moon, the imagery - is never filtered, tinted or touched: no
 * rule here selects it, sets a filter, a blend or an overlay on it, or reaches the renderer.
 *
 * DEFAULT sets nothing: every rule below is scoped to a family, so with Default the Earth's own natural glow is exactly what it was, drawn by the modules that draw it.
 *
 * STATIC. A choice is one attribute and the stylesheet is generated once from the registry. The glow keeps whatever motion the Earth's own ring already had (the vessel swap animates the ring's
 * opacity); nothing here animates, interpolates or writes a value after the choice is made. The doubled attribute keeps these above the vessel preview's own token writes, whatever the load order.
 */
const HOST = '#place-experience';
export const EARTH_GLOW_ELEMENTS = ['.kt-vessel-glow-ring', '.kt-earth-effects-layer'];
/** The four tokens those elements draw the glow from: the vessel's glow pair and the effects layer's energy pair. */
export const EARTH_GLOW_TOKENS = ['--kt-vessel-glow-rgb', '--kt-vessel-glow-soft-rgb', '--kt-layer-energy-rgb', '--kt-layer-energy-soft-rgb'];
export function earthGlowCss() {
    return COLOUR_FAMILY_IDS.map((id) => {
        const { core, soft } = COLOR_FAMILIES[id].earth;
        const scope = `${HOST}[${EARTH_GLOW_ATTRIBUTE}="${id}"][${EARTH_GLOW_ATTRIBUTE}="${id}"]`;
        return `
    ${EARTH_GLOW_ELEMENTS.map((element) => `${scope} ${element}`).join(',\n    ')} {
      --kt-vessel-glow-rgb: ${hexToTriplet(core)} !important;
      --kt-vessel-glow-soft-rgb: ${hexToTriplet(soft)} !important;
      --kt-layer-energy-rgb: ${hexToTriplet(core)} !important;
      --kt-layer-energy-soft-rgb: ${hexToTriplet(soft)} !important;
    }`;
    }).join('');
}
export const EARTH_GLOW_CSS = earthGlowCss();
