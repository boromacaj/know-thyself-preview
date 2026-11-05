/*
 * THE COLOUR FAMILIES: the one registry of every colour the product offers.
 *
 * COLORS has exactly two independent choices - INTERFACE COLOR (the edge light of the glass chrome) and EARTH GLOW (the light around the Earth) - and both are made from the same named
 * families. A family says what "Gold" is once: how it looks as a 1px glass edge, and how it looks as an atmosphere. Adding "emerald" is one entry here, one pair of name strings, and
 * nothing else: the stylesheets, the Settings options and their swatches are all generated from this table.
 *
 * INTERFACE (core / tint / soft)  the pale highlight of an edge, the saturated colour of its light, and a very pale lift. The values of the approved Main Menu palette, unchanged.
 * EARTH (core / soft)             the rim of the halo and its soft falloff. An atmosphere is a different optical object from a hairline, so these are the family's colours a little more
 *                                 luminous - but they are the same family, named once.
 *
 * TWO SPECIAL MODES are not families and carry no colour, so they are not faked as RGB:
 *   INTERFACE_TRANSPARENT   no added edge light: the native glass, its neutral hairlines and nothing else. The default.
 *   EARTH_DEFAULT           the Earth's own natural glow, exactly as drawn without a choice. The default.
 * Anything unexpected - a missing, unreadable or removed identifier - reads as the special mode, never as a colour.
 */
/** The registry. Its order is the order the Settings options show. */
export const COLOR_FAMILIES = {
    /* pale violet edge, richer violet glow, a very pale lift (the approved baseline) */
    purple: { interface: { core: '#E1D9FF', tint: '#9279FF', soft: '#ECE4FF' }, earth: { core: '#8E76FF', soft: '#CFC4FF' } },
    /* champagne, illuminated gold leaf */
    gold: { interface: { core: '#FFE7AE', tint: '#D7A84F', soft: '#FFF2CE' }, earth: { core: '#E2B35A', soft: '#FFE9B5' } },
    /* violet-magenta */
    magenta: { interface: { core: '#F2CEFF', tint: '#C55CFF', soft: '#F9E6FF' }, earth: { core: '#C65DFF', soft: '#F0CCFF' } },
    /* raspberry pink */
    cyclamen: { interface: { core: '#FFD0E8', tint: '#E34D98', soft: '#FFE7F3' }, earth: { core: '#EB5AA3', soft: '#FFC9E4' } },
    /* aqua / jade-turquoise */
    turquoise: { interface: { core: '#C8FFF5', tint: '#4FD4C1', soft: '#E5FFF9' }, earth: { core: '#4ED8C4', soft: '#C2FFF3' } },
    /* deep celestial blue-indigo */
    indigo: { interface: { core: '#D5DCFF', tint: '#6678F5', soft: '#EBEEFF' }, earth: { core: '#5F73F2', soft: '#CCD4FF' } },
    /* soft pearl rose */
    rose: { interface: { core: '#FFE1EA', tint: '#E68AA9', soft: '#FFF1F5' }, earth: { core: '#EE8FAF', soft: '#FFDDE8' } },
};
export const COLOUR_FAMILY_IDS = Object.keys(COLOR_FAMILIES);
export const INTERFACE_TRANSPARENT = 'transparent';
export const EARTH_DEFAULT = 'default';
/** Each choice list: the special mode first, then the families, in the registry's order. */
export const INTERFACE_COLOR_IDS = [INTERFACE_TRANSPARENT, ...COLOUR_FAMILY_IDS];
export const EARTH_GLOW_IDS = [EARTH_DEFAULT, ...COLOUR_FAMILY_IDS];
export const DEFAULT_INTERFACE_COLOR = INTERFACE_TRANSPARENT;
export const DEFAULT_EARTH_GLOW = EARTH_DEFAULT;
export const isColourFamilyId = (value) => typeof value === 'string' && Object.prototype.hasOwnProperty.call(COLOR_FAMILIES, value);
export const isInterfaceColorId = (value) => value === INTERFACE_TRANSPARENT || isColourFamilyId(value);
export const isEarthGlowId = (value) => value === EARTH_DEFAULT || isColourFamilyId(value);
/** Any stored or supplied value, as a valid choice: anything that is not one is the default. */
export const parseInterfaceColor = (value) => (isInterfaceColorId(value) ? value : DEFAULT_INTERFACE_COLOR);
export const parseEarthGlow = (value) => (isEarthGlowId(value) ? value : DEFAULT_EARTH_GLOW);
/** `#RRGGBB` as [R, G, B]. */
export const hexToRgb = (hex) => {
    const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
    if (!m)
        throw new Error(`not a hex colour: ${hex}`);
    return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
};
/** `#RRGGBB` as "R, G, B", the form every colour token holds. */
export const hexToTriplet = (hex) => hexToRgb(hex).join(', ');
