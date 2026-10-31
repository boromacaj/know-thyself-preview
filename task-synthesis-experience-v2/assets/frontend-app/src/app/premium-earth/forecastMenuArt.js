import { LIFE_ICONS, LIFE_ICON_ORDER } from '../temporal-synthesis/lifeDynamicsIcons.js?v=53c0693';
import { FORECAST_MENU_SEGMENTS } from './forecastMenuStyle.js?v=53c0693';
/*
 * THE FORECAST CARD'S ART - THE MARKUP (the light and the motion are forecastMenuStyle.ts).
 *
 * One column inside the tile, in the order the eye reads it:
 *
 *   stage    five pictograms stacked on one another, only one in view at any moment: the Life Dynamics icons, drawn twice (a wider, dim glow
 *            stroke under a fine, bright line, the Connections heart's own two-layer light)
 *   gauge    five short segments, horizontal: a decoration (see forecastMenuStyle.ts) - it is not read from any assessment
 *
 * The card's own name (FORECAST) is the tile's label, standing under the card as it does for the other tiles.
 *
 * GEOMETRY IS NOT REDRAWN. Each pictogram's paths are the strings of the Life Dynamics panel (LIFE_ICONS), exactly. (V1.2 gave each shape a pathLength of 1 so that its outline
 * could be drawn on with a moving dash; V2.1 moves the whole pictogram by a transform and an opacity instead, which the browser's compositor can run off the main thread.)
 *
 * NO CAPTION. The card used to name the area in view under its gauge (five names stacked and cross-faded). The owner asked for them gone from the menu:
 * the card is a pictogram and a gauge, and the area's name is in the Forecast screens, where each Life Dynamics row says it in text. Nothing of them is
 * left - no element, no rule, no animation - and the card reads the same in every language, so it has no language parameter. The card is
 * aria-hidden decoration inside the Forecast button, whose name is the tile's own label (FORECAST).
 */
/** The inside of a Life Dynamics icon (its paths and rects), exactly as the panel draws it. */
export function lifeIconInner(id) {
    return LIFE_ICONS[id]
        .replace(/^<svg[^>]*>/, '')
        .replace(/<\/svg>$/, '');
}
/** The card's art. */
export function forecastMenuArt() {
    const icons = LIFE_ICON_ORDER.map((id, stage) => {
        const inner = lifeIconInner(id);
        return `<svg class="kt-menu-fc-icon kt-menu-fc-icon-${stage}" data-fc-area="${id}" viewBox="0 0 24 24" fill="none" stroke-linecap="round" `
            + `stroke-linejoin="round" aria-hidden="true" focusable="false"><g class="kt-menu-fc-draw-${stage}">`
            + `<g class="kt-menu-fc-glow">${inner}</g><g class="kt-menu-fc-line">${inner}</g></g></svg>`;
    }).join('');
    const segments = Array.from({ length: FORECAST_MENU_SEGMENTS }, (_, index) => `<span class="kt-menu-fc-seg kt-menu-fc-seg-${index}"><b></b><i></i></span>`).join('');
    return `<span class="kt-menu-fc" data-fc="forecast"><span class="kt-menu-fc-stage">${icons}</span>`
        + `<span class="kt-menu-fc-gauge">${segments}</span></span>`;
}
