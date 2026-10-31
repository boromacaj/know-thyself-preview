import { CIRCLE, glyph } from './glyphCore.js?v=f9ab0a6';
export * from './glyphCore.js?v=f9ab0a6';
export * from './astrologyGlyphs.js?v=f9ab0a6';
export * from './baziGlyphs.js?v=f9ab0a6';
/**
 * A numeral presented as a symbol.
 *
 * HTML rather than SVG, deliberately. The numeral has to inherit the reader's
 * text-size preference and stay selectable and searchable; an SVG <text> would
 * be neither. The badge shape is CSS, so it scales with the type instead of
 * against it.
 *
 * `tone` is the only visual difference between a Life Path 7 and a Karmic Debt
 * 16 - master and karmic numbers earn a distinct treatment because they mean
 * something different, and a reader should be able to see that before reading a
 * word.
 */
export function numberBadge(value, options = {}) {
    const { tone = 'core', label } = options;
    const text = String(value);
    return `<span class="kt-number-badge is-${tone}"${label ? ` aria-label="${escapeAttribute(`${label} ${text}`)}"` : ''}>`
        + `<span class="kt-number-badge-value">${escapeAttribute(text)}</span></span>`;
}
/** Master numbers and karmic debts are shown differently because they ARE different. */
export function toneForNumber(value, isCycle = false) {
    if (isCycle)
        return 'cycle';
    if (value === 11 || value === 22 || value === 33)
        return 'master';
    if (value === 13 || value === 14 || value === 16 || value === 19)
        return 'karmic';
    return 'core';
}
function escapeAttribute(value) {
    return value
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
/* ------------------------------------------------------- human design */
/**
 * Type markers drawn as ENERGY DIAGRAMS rather than as arbitrary badges.
 *
 * Each says something true about the mechanic: a Generator is a closed loop that
 * renews, a Manifestor is a line leaving a source, a Projector is a focus
 * converging on a point, a Reflector is a ring sampling everything around it.
 * A reader who never learns the code still absorbs the difference.
 */
const HD_TYPE_PATHS = {
    generator: `${CIRCLE(12, 12, 6.6)}<path d="M12 5.4v13.2M8.4 15.6l3.6-3.6 3.6 3.6"/>`,
    'manifesting-generator': `${CIRCLE(12, 12, 6.6)}<path d="M12 5.4v13.2M8.4 15.6l3.6-3.6 3.6 3.6"/>`
        + '<path d="M18.6 5.4L21.4 2.6M19.4 2.6h2v2"/>',
    manifestor: `${CIRCLE(7, 17, 3.4)}<path d="M9.4 14.6L20 4M14.4 4H20v5.6"/>`,
    projector: '<path d="M3.6 6.6L12 12 3.6 17.4M20.4 6.6L12 12l8.4 5.4"/>' + CIRCLE(12, 12, 1.8),
    reflector: `${CIRCLE(12, 12, 7.4)}`
        + '<path d="M12 4.6v2.4M12 17v2.4M4.6 12H7M17 12h2.4M6.8 6.8l1.7 1.7M15.5 15.5l1.7 1.7M17.2 6.8l-1.7 1.7M8.5 15.5l-1.7 1.7"/>',
};
export function hdTypeGlyph(type, options = {}) {
    const key = type.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const path = HD_TYPE_PATHS[key];
    if (!path)
        return '';
    return glyph(path, { className: 'kt-glyph-hd-type', ...options });
}
/**
 * Authority markers: WHERE the decision is made in the body.
 *
 * Each places a mark on a simple figure at the centre the authority runs
 * through, which is more informative than a lettered badge and needs no legend.
 */
const HD_AUTHORITY_PATHS = {
    /* Solar plexus: the wave, because emotional clarity is a wave. */
    'emotional-solar-plexus': '<path d="M2.6 14c2.4-5.4 4.8-5.4 7.2 0s4.8 5.4 7.2 0 4.4-4.6 4.4-4.6"/>'
        + `${CIRCLE(12, 19.4, 1.4)}`,
    /* Sacral: the response rising from the centre. */
    sacral: `${CIRCLE(12, 15.6, 5.4)}<path d="M12 10.2V3.6M9 6.6l3-3 3 3"/>`,
    /* Splenic: the single instant - one point, one ring, no repeat. */
    splenic: `${CIRCLE(12, 12, 2.2)}${CIRCLE(12, 12, 7.4)}<path d="M12 4.6v-2"/>`,
    /* Ego: the will, a heart-line held steady. */
    'ego-manifested': '<path d="M4 14c2.2 0 2.6-4.4 4.4-4.4S10.6 18 12.6 18s2-8.4 3.6-8.4S18.4 14 20 14"/>',
    'ego-projected': '<path d="M4 14c2.2 0 2.6-4.4 4.4-4.4S10.6 18 12.6 18s2-8.4 3.6-8.4S18.4 14 20 14"/>',
    /* Self-projected: direction leaving the identity centre. */
    'self-projected': `${CIRCLE(12, 15.4, 4)}<path d="M12 11.4V4M8.6 7.4L12 4l3.4 3.4"/>`,
    /* Mental: the environment around the mind. */
    'mental-environmental': `${CIRCLE(12, 10, 3.4)}<path d="M4.6 18.6a7.4 7.4 0 0 1 14.8 0"/>`
        + '<path d="M2.6 6.6h2.8M18.6 6.6h2.8"/>',
    /* Lunar: the cycle itself. */
    lunar: '<path d="M14.6 4.6a8.4 8.4 0 1 0 0 14.8 9.6 9.6 0 0 1 0-14.8Z"/>'
        + '<path d="M20 8.4a7.4 7.4 0 0 1 0 7.2"/>',
};
export function hdAuthorityGlyph(authority, options = {}) {
    const key = authority.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const path = HD_AUTHORITY_PATHS[key];
    if (!path)
        return '';
    return glyph(path, { className: 'kt-glyph-hd-authority', ...options });
}
/**
 * A defined or undefined centre, as a filled or open shape.
 *
 * The BodyGraph already shows this in full. These are for the prose, where a
 * paragraph about the Throat benefits from a small marker showing its state at a
 * glance rather than making the reader hold nine states in their head.
 */
export function hdCenterGlyph(defined, options = {}) {
    const art = defined
        ? '<path fill="currentColor" stroke="none" d="M12 3.6l8.4 4.8v9.6L12 22.8 3.6 18V8.4Z"/>'
            + '<path d="M12 3.6l8.4 4.8v9.6L12 22.8 3.6 18V8.4Z"/>'
        : '<path d="M12 3.6l8.4 4.8v9.6L12 22.8 3.6 18V8.4Z"/>';
    return glyph(art, {
        className: `kt-glyph-hd-center ${defined ? 'is-defined' : 'is-open'}`,
        title: defined ? 'Defined centre' : 'Open centre',
        ...options,
    });
}
/**
 * The four Variable arrows.
 *
 * In the canon these are literally arrows pointing left or right beside the head
 * and body of the chart, so an arrow is the correct symbol and anything else
 * would be an invention.
 */
export function hdVariableArrow(direction, options = {}) {
    const art = direction === 'left'
        ? '<path d="M19 12H5M10.6 6.6L5 12l5.6 5.4"/>'
        : '<path d="M5 12h14M13.4 6.6L19 12l-5.6 5.4"/>';
    return glyph(art, { className: 'kt-glyph-hd-variable', ...options });
}
/** A gate or channel reference, for inline use in prose. */
export function hdGateGlyph(options = {}) {
    return glyph(`${CIRCLE(12, 12, 3)}<path d="M12 3v6M12 15v6M3 12h6M15 12h6"/>`, { className: 'kt-glyph-hd-gate', ...options });
}
