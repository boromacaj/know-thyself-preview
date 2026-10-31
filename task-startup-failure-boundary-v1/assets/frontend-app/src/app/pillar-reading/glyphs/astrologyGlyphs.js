import { CIRCLE, CRESCENT, CROSS, LINE, glyph } from './glyphCore.js?v=2ea79e9';
/**
 * WESTERN ASTROLOGY GLYPHS.
 *
 * The twelve signs, the ten bodies, the four angles, the five major aspects, the
 * four elements, the three modalities, and eight moon phases.
 *
 * The sign and planet shapes are the conventional ones - these symbols have been
 * stable since the Renaissance and inventing new ones would help nobody - drawn
 * on the shared 24x24, 1.6-stroke grid rather than taken from a font.
 *
 * Moon phases are the exception to the no-fill rule, because a phase IS the
 * filled area. A waxing crescent drawn as an outline is a drawing of the moon,
 * not a drawing of the phase.
 */
/* ------------------------------------------------------------------ signs */
const SIGN_PATHS = {
    /* Aries: the ram's horns. */
    aries: '<path d="M12 20V9M12 9C12 6 10.4 4.4 8.6 4.4S5.4 5.8 5.4 8M12 9c0-3 1.6-4.6 3.4-4.6S18.6 5.8 18.6 8"/>',
    /* Taurus: the bull's head and horns. */
    taurus: `${CIRCLE(12, 15.5, 4.6)}<path d="M6.6 4.6C6.6 8 9 10.4 12 10.4S17.4 8 17.4 4.6"/>`,
    /* Gemini: the twins, two uprights between two bars. */
    gemini: '<path d="M8 6.4h8M8 17.6h8M9.6 6.4v11.2M14.4 6.4v11.2"/>',
    /* Cancer: the two claws, or the two spirals. */
    cancer: `<path d="M4.6 9.4c2.4-2.4 6.6-3 10-1.6M19.4 14.6c-2.4 2.4-6.6 3-10 1.6"/>`
        + `${CIRCLE(7.4, 13.4, 2.4)}${CIRCLE(16.6, 10.6, 2.4)}`,
    /* Leo: the lion's mane and tail. */
    leo: `${CIRCLE(8.6, 15.4, 3.4)}<path d="M11.6 14C10.2 11 10.6 7.4 13 5.8c2-1.4 4.4-.2 4.4 2 0 1.6-1 2.6-2.2 3.2 1.4.4 3.2 1.8 3.2 4.2 0 1.8-1.2 3.4-3 3.4"/>`,
    /* Virgo: the M with the closed loop. */
    virgo: '<path d="M4.6 7v10M4.6 8.8c0-1.2.9-1.8 1.8-1.8s1.8.6 1.8 1.8v8.2M8.2 8.8c0-1.2.9-1.8 1.8-1.8s1.8.6 1.8 1.8v8.2M11.8 8.8c0-1.2.9-1.8 1.8-1.8s1.8.6 1.8 1.8v6.4c0 2.6 1.8 3.6 3.4 3.6M14 15.4c0-2 1.6-3.6 3.4-3.6 2 0 3 1.6 3 3.4 0 2.6-2.4 4.6-6.4 5.2"/>',
    /* Libra: the scales, or the setting sun on the horizon. */
    libra: '<path d="M4 18.6h16M4 14.6h6.2M13.8 14.6H20M10.2 14.6a3.6 3.6 0 1 1 3.6 0"/>',
    /* Scorpio: the M with the barbed tail. */
    scorpio: '<path d="M4 7.6v9M4 9.4c0-1.2.9-1.8 1.8-1.8s1.8.6 1.8 1.8v7.2M7.6 9.4c0-1.2.9-1.8 1.8-1.8s1.8.6 1.8 1.8v7.2M11.2 9.4c0-1.2.9-1.8 1.8-1.8s1.8.6 1.8 1.8v7.6c0 1.6 1.2 2.8 2.8 2.8h2.8M18 16.4l2.4 3.4-3.6 1"/>',
    /* Sagittarius: the arrow and its crossbar. */
    sagittarius: '<path d="M6 18L18.6 5.4M13.4 5.4h5.2v5.2M9 14.4l4 4"/>',
    /* Capricorn: the goat's horn into the fish's tail. */
    capricorn: '<path d="M4.6 6.6c1.8 0 2.8 1.4 3.4 3.2l2.4 7.4M8.6 8.6c1.4-1.6 3.4-2.4 5-1.6 1.8.9 2.2 3.2 1.4 5.2-.7 1.7-2.2 2.8-3.8 2.8"/>'
        + `${CIRCLE(15.6, 16.4, 2.8)}`,
    /* Aquarius: the two waves of the water-bearer. */
    aquarius: '<path d="M3.6 10.4l2.8-2.4 2.8 2.4 2.8-2.4 2.8 2.4 2.8-2.4 2.8 2.4M3.6 16l2.8-2.4L9.2 16l2.8-2.4L14.8 16l2.8-2.4L20.4 16"/>',
    /* Pisces: two fish bound by a cord. */
    pisces: '<path d="M7 4.6c-2.4 2.2-2.4 12.6 0 14.8M17 4.6c2.4 2.2 2.4 12.6 0 14.8M4.4 12h15.2"/>',
};
export const SIGN_LABELS = {
    aries: 'Aries', taurus: 'Taurus', gemini: 'Gemini', cancer: 'Cancer',
    leo: 'Leo', virgo: 'Virgo', libra: 'Libra', scorpio: 'Scorpio',
    sagittarius: 'Sagittarius', capricorn: 'Capricorn', aquarius: 'Aquarius', pisces: 'Pisces',
};
export function signGlyph(sign, options = {}) {
    const key = sign.toLowerCase();
    const path = SIGN_PATHS[key];
    if (!path)
        return '';
    return glyph(path, { className: 'kt-glyph-sign', ...options });
}
/* ---------------------------------------------------------------- planets */
const PLANET_PATHS = {
    sun: `${CIRCLE(12, 12, 7.6)}${CIRCLE(12, 12, 1.4)}`,
    moon: '<path d="M15.8 3.8a9 9 0 1 0 0 16.4 10.4 10.4 0 0 1 0-16.4Z"/>',
    /* Mercury: crescent above circle above cross. */
    mercury: `${CRESCENT(12, 5.2, 3)}${CIRCLE(12, 11.6, 3.6)}${CROSS(12, 15.2, 21, 2.8, 18.6)}`,
    /* Venus: circle above cross. */
    venus: `${CIRCLE(12, 8.4, 4.6)}${CROSS(12, 13, 21, 3, 17.6)}`,
    /* Mars: circle with the arrow of outward force. */
    mars: `${CIRCLE(10.4, 13.6, 5.2)}<path d="M14.4 9.6L20 4M15.2 4h4.8v4.8"/>`,
    /* Jupiter: the numeral four, or the crescent on the cross. */
    jupiter: '<path d="M5.2 8.2c0-2 1.6-3.6 3.6-3.6 2.2 0 3.6 1.8 3.6 4.2V19M4.6 19h13.8"/>',
    /* Saturn: the cross above the sickle. */
    saturn: '<path d="M6.6 5.6h6M9.6 4v9.4M9.6 13.4c.6-2.4 2.2-3.8 4-3.8 2 0 3.4 1.6 3.4 4 0 3.4-2.4 6-5.4 6.4"/>',
    /* Uranus: the modern H-with-circle form. */
    uranus: `<path d="M6.4 4.6v8M17.6 4.6v8M6.4 8.6h11.2M12 8.6v7.4"/>${CIRCLE(12, 18.4, 3)}`,
    /* Neptune: the trident on the cross. */
    neptune: '<path d="M4.8 5.6v4.6c0 4 3.2 7.2 7.2 7.2s7.2-3.2 7.2-7.2V5.6M12 4.6V21M8.4 18.6h7.2"/>',
    /* Pluto: the crescent holding the circle, over the cross. */
    pluto: `${CRESCENT(12, 7.4, 4.4)}${CIRCLE(12, 7, 2.2)}${CROSS(12, 11.8, 21, 3, 17.6)}`,
    /*
     * The three bodies Human Design reads that Western astrology's ten do not
     * cover. Same conventional shapes, same 24x24 grid, same 1.6 stroke - they
     * belong in this table rather than in a second one, because a chart that
     * needs the Earth needs it drawn like everything beside it.
     */
    /* THE OPTIONAL EXTENDED OBJECTS (Chiron and the four main asteroids), the conventional shapes on the same grid. */
    /* Chiron: the key - a stem with the two strokes of a K, and the ring it opens. */
    chiron: `<path d="M9.6 3.6V13M9.6 8.2L15.4 3.8M9.6 8.2l5.8 4.6"/>${CIRCLE(9.6, 16.8, 3.4)}`,
    /* Ceres: the sickle, on a small cross. */
    ceres: '<path d="M7.6 5.4C13.6 4.4 18 7.8 17.6 12.4c-.3 3.2-3 5.4-6.2 5.2M11.4 17.6v3.8M9.2 19.6h4.4"/>',
    /* Pallas: the lozenge of the spear's head, on a cross. */
    pallas: `<path d="M12 3.4l5 6-5 6-5-6Z"/>${CROSS(12, 15.4, 21, 3, 18.4)}`,
    /* Juno: the sceptre - a cross crowned with a star. */
    juno: `<path d="M12 2.4v6M9.4 3.9l5.2 3M9.4 6.9l5.2-3"/>${CROSS(12, 9.6, 21, 3, 17.6)}`,
    /* Vesta: the hearth, with the flame above it. */
    vesta: '<path d="M12 3.4c-3.4 3.2-3.4 5.6 0 8.6 3.4-3 3.4-5.4 0-8.6Z"/><path d="M6.6 13h10.8l-1.6 7H8.2Z"/>',
    /* Earth: the circle quartered by the cross - the classical globus cruciger. */
    earth: `${CIRCLE(12, 12, 7.6)}<path d="M12 4.4v15.2M4.4 12h15.2"/>`,
    /* North Node: the ascending node, the horns of the loop opening upward. */
    'north node': '<path d="M8.6 18.2c-2.6-1-4.2-3.4-4.2-6.2 0-4.2 3.4-7.6 7.6-7.6s7.6 3.4 7.6 7.6c0 2.8-1.6 5.2-4.2 6.2"'
        + `/>${CIRCLE(6.6, 19.4, 2.2)}${CIRCLE(17.4, 19.4, 2.2)}`,
    /* South Node: the same figure inverted, which is what it is. */
    'south node': '<path d="M8.6 5.8c-2.6 1-4.2 3.4-4.2 6.2 0 4.2 3.4 7.6 7.6 7.6s7.6-3.4 7.6-7.6c0-2.8-1.6-5.2-4.2-6.2"'
        + `/>${CIRCLE(6.6, 4.6, 2.2)}${CIRCLE(17.4, 4.6, 2.2)}`,
};
export const PLANET_LABELS = {
    sun: 'Sun', moon: 'Moon', mercury: 'Mercury', venus: 'Venus', mars: 'Mars',
    jupiter: 'Jupiter', saturn: 'Saturn', uranus: 'Uranus', neptune: 'Neptune', pluto: 'Pluto',
    earth: 'Earth', 'north node': 'North Node', 'south node': 'South Node',
    chiron: 'Chiron', ceres: 'Ceres', pallas: 'Pallas', juno: 'Juno', vesta: 'Vesta',
};
export function planetGlyph(body, options = {}) {
    const path = PLANET_PATHS[body.toLowerCase()];
    if (!path)
        return '';
    return glyph(path, { className: 'kt-glyph-planet', ...options });
}
/* ----------------------------------------------------------------- angles */
const ANGLE_PATHS = {
    /* Ascendant: the horizon with the point rising off its eastern end. */
    ascendant: `<path d="M3.4 16.4h17.2M7 16.4a5 5 0 0 1 10 0"/>${CIRCLE(12, 8.4, 1.6)}`,
    /* Midheaven: the zenith marker above the meridian. */
    midheaven: `<path d="M12 20.6V7.4M6.6 12.4L12 7l5.4 5.4"/>${CIRCLE(12, 3.6, 1.4)}`,
    /* Imum Coeli: the same, inverted. */
    'imum-coeli': `<path d="M12 3.4v13.2M17.4 11.6L12 17l-5.4-5.4"/>${CIRCLE(12, 20.4, 1.4)}`,
    /* Descendant: the horizon with the point setting at its western end. */
    descendant: `<path d="M3.4 16.4h17.2M7 16.4a5 5 0 0 1 10 0"/>${CIRCLE(12, 20.4, 1.4)}`,
};
export function angleGlyph(angle, options = {}) {
    const path = ANGLE_PATHS[angle.toLowerCase()];
    if (!path)
        return '';
    return glyph(path, { className: 'kt-glyph-angle', ...options });
}
/* ---------------------------------------------------------------- aspects */
const ASPECT_PATHS = {
    conjunction: `${CIRCLE(9.6, 14.4, 4.4)}${LINE(12.8, 11.2, 19.4, 4.6)}`,
    opposition: `${CIRCLE(6, 6, 3)}${CIRCLE(18, 18, 3)}${LINE(8.4, 8.4, 15.6, 15.6)}`,
    trine: '<path d="M12 4.4L20.2 18.6H3.8Z"/>',
    square: '<path d="M5.4 5.4h13.2v13.2H5.4Z"/>',
    sextile: '<path d="M12 3.6v16.8M4.7 7.8l14.6 8.4M19.3 7.8L4.7 16.2"/>',
};
export const ASPECT_LABELS = {
    conjunction: 'Conjunction', opposition: 'Opposition', trine: 'Trine',
    square: 'Square', sextile: 'Sextile',
};
export function aspectGlyph(aspect, options = {}) {
    const path = ASPECT_PATHS[aspect.toLowerCase()];
    if (!path)
        return '';
    return glyph(path, { className: 'kt-glyph-aspect', ...options });
}
/* --------------------------------------------------- elements, modalities */
const ELEMENT_PATHS = {
    /* The classical alchemical triangles. */
    fire: '<path d="M12 3.8L21 19.6H3Z"/>',
    water: '<path d="M12 20.2L3 4.4h18Z"/>',
    air: '<path d="M12 3.8L21 19.6H3ZM6.6 14.2h10.8"/>',
    earth: '<path d="M12 20.2L3 4.4h18ZM6.6 9.8h10.8"/>',
};
const MODALITY_PATHS = {
    /* Cardinal initiates: an arrow leaving a point. */
    cardinal: `${CIRCLE(6, 18, 2.2)}<path d="M8 16L18.4 5.6M13.4 5.6h5v5"/>`,
    /* Fixed holds: a square anchored on its own centre. */
    fixed: `<path d="M6 6h12v12H6Z"/>${CIRCLE(12, 12, 1.8)}`,
    /* Mutable adapts: a wave passing through. */
    mutable: '<path d="M3.4 14.4c2.6-4.4 5.2-4.4 7.8 0s5.2 4.4 7.8 0M3.4 9.6c2.6-4.4 5.2-4.4 7.8 0"/>',
};
export function elementGlyph(element, options = {}) {
    const path = ELEMENT_PATHS[element.toLowerCase()];
    if (!path)
        return '';
    return glyph(path, { className: 'kt-glyph-element', ...options });
}
export function modalityGlyph(modality, options = {}) {
    const path = MODALITY_PATHS[modality.toLowerCase()];
    if (!path)
        return '';
    return glyph(path, { className: 'kt-glyph-modality', ...options });
}
/* ------------------------------------------------------------ moon phases */
/**
 * The eight phases, drawn as the phase rather than as the moon.
 *
 * Each is a full disc outline with the LIT area filled, so a waxing crescent
 * looks like a waxing crescent and not like a generic moon icon beside the words
 * "waxing crescent". The terminator is an ellipse arc whose horizontal radius
 * shrinks to zero at the quarters, which is exactly what the real terminator
 * does when you view a sphere from a fixed point.
 *
 * Northern-hemisphere convention: waxing is lit on the right.
 */
const DISC = CIRCLE(12, 12, 8.6);
/** A lit region bounded on one side by the limb and on the other by the terminator. */
function litArea(terminatorRadius, litOnRight, gibbous) {
    const r = 8.6;
    const sweepLimb = litOnRight ? 1 : 0;
    /* A gibbous terminator bulges the same way as the limb; a crescent one bulges
       against it. That single flag is the whole difference between the two shapes. */
    const sweepTerm = gibbous ? (litOnRight ? 1 : 0) : (litOnRight ? 0 : 1);
    return `<path fill="currentColor" stroke="none" d="M12 ${12 - r}`
        + `A${r} ${r} 0 0 ${sweepLimb} 12 ${12 + r}`
        + `A${Math.max(terminatorRadius, 0.01)} ${r} 0 0 ${sweepTerm} 12 ${12 - r}Z"/>`;
}
const PHASE_ART = {
    'new-moon': DISC,
    'waxing-crescent': `${litArea(4.3, true, false)}${DISC}`,
    'first-quarter': `${litArea(0, true, false)}${DISC}`,
    'waxing-gibbous': `${litArea(4.3, true, true)}${DISC}`,
    'full-moon': `<circle cx="12" cy="12" r="8.6" fill="currentColor" stroke="currentColor"/>`,
    'waning-gibbous': `${litArea(4.3, false, true)}${DISC}`,
    'last-quarter': `${litArea(0, false, false)}${DISC}`,
    'waning-crescent': `${litArea(4.3, false, false)}${DISC}`,
};
/** Engine phase names vary in punctuation and case; normalise before lookup. */
export function moonPhaseKey(phase) {
    return phase.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');
}
export function moonPhaseGlyph(phase, options = {}) {
    const art = PHASE_ART[moonPhaseKey(phase)];
    if (!art)
        return '';
    return glyph(art, { className: 'kt-glyph-moon-phase', title: phase, ...options });
}
export const MOON_PHASE_KEYS = Object.keys(PHASE_ART);
