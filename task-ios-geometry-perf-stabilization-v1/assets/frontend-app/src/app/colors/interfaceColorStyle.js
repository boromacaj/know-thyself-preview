import { COLOR_FAMILIES, COLOUR_FAMILY_IDS, hexToTriplet } from './colorFamilies.js?v=d9f39e7';
import { INTERFACE_COLOR_ATTRIBUTE } from './colorPreferences.js?v=d9f39e7';
/*
 * INTERFACE COLOR: ONE COLOUR, THE WHOLE OF THE GLASS CHROME.
 *
 * The Main Menu's edge light (approved) is the visual baseline; this is the same light made the application's own. One choice sets one family's colours ONCE, as static CSS custom
 * properties on the host (`#place-experience[data-kt-interface-color="<id>"]`), and the chrome of every screen reads them through the roles it already had:
 *
 *   EDGE TOKENS        --kt-edge-core / -tint / -soft        the three colours of the family (R, G, B). The Main Menu's own rules read these, unchanged.
 *   BORDER ROLE        --kt-surface-border-rgb, --kt-surface-line
 *                      The hairline of every panel, card, capsule and rule that already took "the surface border": the pillar cards and sections, the Forecast, Tarot and Numerology
 *                      panels, the Settings and profile glass, the language and colour options, the floating Back. Each keeps the strength it chose (a passive hairline at a few
 *                      percent, a panel edge at about forty, a primary edge at about sixty), so the HIERARCHY is theirs and already there: the colour changes, the weights do not.
 *   SELECTED + PRIMARY --kt-highlight-rgb / -soft, and --kt-accent-rgb / -soft on the selected states and primary controls listed below (and only on them)
 *                      The rim, ground and glow of "where the reader is" - the active pillar capsule, the chosen tab or chip, the primary button, the chosen option - are all drawn from
 *                      the accent. Re-pointing the accent ON THAT ELEMENT recolours its rim and glow and leaves its text, which is explicit ivory, as it was.
 *
 * WHAT THIS DOES NOT TOUCH. No rule here names a text colour, an illustration, a card's artwork, a chart, a planet or a zodiac sign, a Human Design centre, a BaZi element, a
 * Forecast datum or the Earth. The accent itself is NOT re-pointed on the page, so kickers, links, icons and every semantic colour are exactly what they were. TRANSPARENT sets nothing at
 * all: every rule below sits under `LIT_SCOPE`, the choices that add light, so with Transparent the native glass and its neutral hairlines are untouched and nothing needs switching off.
 *
 * STATIC. A choice is one attribute; the stylesheet is generated once from the registry at load. There is no element, no animation, no clock, no script per frame and no token written after
 * the choice is made.
 */
const HOST = '#place-experience';
/** Every rule below sits under this: the host, with the choice set to a family. Transparent matches nothing here. */
export const LIT_SCOPE = `${HOST}:is(${COLOUR_FAMILY_IDS.map((id) => `[${INTERFACE_COLOR_ATTRIBUTE}="${id}"]`).join(', ')})`;
/**
 * The selected states of the chrome, one list for the whole application: the active pillar capsule, the chosen Forecast tab and chips, the trend picker, the life-area card, the
 * calendar day, the Tarot toggle and primary button. A new chrome state that marks "where the reader is" with the accent is one entry here, not a rule per screen.
 */
export const INTERFACE_SELECTED_ROLE = [
    '.kt-nav-stop.is-active',
    '.kt-fc-tab.is-active',
    '.kt-fc-month-chip.is-active',
    '.kt-fc-year-chip.is-active',
    '.kt-fc-day-chip.is-active',
    '.kt-fc-trend-pick.is-active',
    '.kt-fc-life-card.is-active',
    '.kt-fc-cal-cell.is-selected',
    '.tx-shake-toggle.is-on',
    '.tx-button.tx-primary',
];
/**
 * The primary controls of the chrome: the way back, "today", the trend's opener, the profile pill and its actions, the current place of a Tarot spread. Their rim and glow are drawn from the
 * accent too, so they take the family the same way the selected states do - on the element itself, never on the page.
 */
export const INTERFACE_PRIMARY_ROLE = [
    '.kt-fc-back',
    '.kt-fc-today',
    '.kt-fc-trend-open',
    '.kt-profile-control',
    '.kt-profile-avatar',
    '.kt-profile-action',
    '.tx-place.is-current',
];
/** The strength of the hairline a family sets as the surface line: a passive border, a little above the neutral one it replaces. */
export const INTERFACE_LINE_ALPHA = 0.22;
/** The colour tokens of every family, generated from the registry. */
const familyBlocks = () => COLOUR_FAMILY_IDS.map((id) => {
    const { core, tint, soft } = COLOR_FAMILIES[id].interface;
    const selector = `${HOST}[${INTERFACE_COLOR_ATTRIBUTE}="${id}"][${INTERFACE_COLOR_ATTRIBUTE}="${id}"]`;
    return `
    ${selector} {
      --kt-edge-core: ${hexToTriplet(core)};
      --kt-edge-tint: ${hexToTriplet(tint)};
      --kt-edge-soft: ${hexToTriplet(soft)};
      --kt-surface-border-rgb: ${hexToTriplet(tint)};
      --kt-surface-line: rgba(${hexToTriplet(tint)}, ${INTERFACE_LINE_ALPHA});
      --kt-highlight-rgb: ${hexToTriplet(tint)};
      --kt-highlight-soft-rgb: ${hexToTriplet(core)};
    }`;
}).join('');
export function interfaceColorCss() {
    return `
    /* ---------------------------------- Interface Color: the family's tokens, from the registry */${familyBlocks()}

    /* ------------------------------------------------------------ the selected role
       The accent is re-pointed on the selected state itself - its rim, ground and glow are drawn from it - and nowhere else. */
    ${LIT_SCOPE} :is(${[...INTERFACE_SELECTED_ROLE, ...INTERFACE_PRIMARY_ROLE].join(', ')}) {
      --kt-accent-rgb: var(--kt-edge-tint);
      --kt-accent-soft-rgb: var(--kt-edge-core);
    }
`;
}
export const INTERFACE_COLOR_CSS = interfaceColorCss();
