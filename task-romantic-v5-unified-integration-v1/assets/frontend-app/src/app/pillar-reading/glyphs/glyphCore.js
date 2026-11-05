/**
 * THE SYMBOLIC GLYPH SYSTEM.
 *
 * One coherent visual language across all four pillars: zodiac signs, planets,
 * moon phases, the five Western elements, the Chinese stems, branches and
 * animals, Human Design markers, and numerology number badges.
 *
 * FOUR RULES, AND THEY ARE THE WHOLE DESIGN
 *
 * 1. NO EMOJI. Emoji render as whatever the device decides - a different
 *    typeface, a different palette, and on Android a cartoon. There is no way to
 *    make a page look designed while the operating system is choosing half the
 *    artwork.
 *
 * 2. NO BUNDLED FONT. An astrological symbol font is 40-120KB for about thirty
 *    characters that are used once each, on a product whose brief says
 *    performance is a feature. Every glyph here is inline SVG built from the
 *    same primitives, so the whole system costs a few kilobytes of markup that
 *    gzip loves, and nothing blocks first paint.
 *
 * 3. ONE STROKE LANGUAGE. Every glyph is drawn in a 24x24 box, on a 1.6 stroke,
 *    with round caps and round joins, and no fill unless the shape genuinely
 *    needs one. That is what makes a Venus symbol and a Chinese branch marker
 *    look like they belong to the same product rather than to two clip-art
 *    libraries.
 *
 * 4. CURRENTCOLOR, ALWAYS. Nothing here names a colour. Glyphs inherit from the
 *    surrounding text, so they work on the glass, over the Earth, in light and
 *    in dark, and they cannot fall out of step with the palette.
 *
 * Where a real Chinese character is the correct symbol - a Heavenly Stem, an
 * Earthly Branch - the character itself is used rather than a drawing of one.
 * Redrawing 甲 as an icon would be both worse and faintly absurd. Those are
 * rendered as text inside the same badge shape, so they still sit in the system.
 */
const VIEW_BOX = '0 0 24 24';
/**
 * Wrap path data in the shared SVG shell.
 *
 * `aria-hidden` when there is no title: a glyph sitting beside its own text
 * label is decoration, and announcing "Pisces, Pisces" to a screen reader is
 * worse than announcing nothing.
 */
export function glyph(paths, options = {}) {
    const { title, className } = options;
    const classes = ['kt-glyph', ...(className ? [className] : [])].join(' ');
    return `<svg class="${classes}" viewBox="${VIEW_BOX}" fill="none" stroke="currentColor" `
        + `stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" `
        + `${title ? `role="img" aria-label="${escapeAttribute(title)}"` : 'aria-hidden="true" focusable="false"'}>`
        + `${title ? `<title>${escapeAttribute(title)}</title>` : ''}${paths}</svg>`;
}
/**
 * A glyph that is genuinely a character - a Chinese stem, a branch, a numeral.
 *
 * Rendered as SVG text rather than as an HTML span so it shares the 24x24 box,
 * the alignment and the sizing of every other glyph. A character that sits two
 * pixels off the baseline of the icon beside it is the difference between a
 * designed page and an assembled one.
 */
export function characterGlyph(character, options = {}) {
    const { title, className } = options;
    const classes = ['kt-glyph', 'kt-glyph-char', ...(className ? [className] : [])].join(' ');
    return `<svg class="${classes}" viewBox="${VIEW_BOX}" `
        + `${title ? `role="img" aria-label="${escapeAttribute(title)}"` : 'aria-hidden="true" focusable="false"'}>`
        + `${title ? `<title>${escapeAttribute(title)}</title>` : ''}`
        + `<text x="12" y="12" text-anchor="middle" dominant-baseline="central" `
        + `fill="currentColor" stroke="none" font-size="17">${escapeAttribute(character)}</text></svg>`;
}
function escapeAttribute(value) {
    return value
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
/* ------------------------------------------------------------------ *
 * SHARED PRIMITIVES
 *
 * The classical planetary symbols are all built from three parts - a circle
 * (spirit), a crescent (soul) and a cross (matter) - arranged differently. That
 * is not a stylistic choice, it is what the symbols are, and building them from
 * shared primitives means they stay in proportion with each other for free.
 * ------------------------------------------------------------------ */
export const CIRCLE = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}"/>`;
export const LINE = (x1, y1, x2, y2) => `<path d="M${x1} ${y1}L${x2} ${y2}"/>`;
/** The cross of matter: a vertical stem with a horizontal bar. */
export const CROSS = (cx, top, bottom, halfWidth, barY) => `${LINE(cx, top, cx, bottom)}${LINE(cx - halfWidth, barY, cx + halfWidth, barY)}`;
/** The crescent of soul, opening upward by default. */
export const CRESCENT = (cx, cy, r) => `<path d="M${cx - r} ${cy + r * 0.35}A${r} ${r} 0 1 1 ${cx + r} ${cy + r * 0.35}"/>`;
