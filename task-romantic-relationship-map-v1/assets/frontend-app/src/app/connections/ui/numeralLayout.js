/**
 * WHERE THE MANDALA'S NUMBER STANDS: CENTRED BY WHAT THE GLYPHS DRAW, NOT BY THEIR BOXES.
 *
 * V4 sets the value as a stack on the exact centre of the mandala: the number, large, and the percent sign, smaller, directly under it. CSS and SVG `text-anchor="middle"` centre the ADVANCE box of the text,
 * which includes each glyph's side bearings, so "82" or "100" sits visibly off the axis. This module places the text by the ink instead: it holds the measured ink box of every digit and of the percent sign in
 * the bundled Marcellus (ui/marcellusFont.ts), and works out, for any value, where the number and the sign start so that
 *
 *  - the number's ink is centred horizontally on the mandala's axis, and so is the sign's;
 *  - the pair, taken as one block (number ink, a gap, sign ink), is centred vertically on the mandala's centre;
 *  - every number from 0 to 100 has the same baseline for the same size (a fixed digit height is used, not the height of the digits that happen to be shown), so the number does not hop as it counts.
 *
 * The table is measured, not guessed: `frontend-app/scripts/qa/numeralMetrics.mjs` loads the bundled font in a browser and prints it (`--check` fails when this file's table differs). Kerning and letter-spacing are
 * off for the numeral (connectionsStyle.ts), so a pair of digits is exactly the sum of its glyphs. Units: thousandths of an em; the drawing's units after multiplying by the font size.
 */
export const GLYPHS = {
    '0': { adv: 806, left: 31, right: 766, ascent: 719, descent: 16 },
    '1': { adv: 295, left: 47, right: 203, ascent: 703, descent: 0 },
    '2': { adv: 532, left: 16, right: 516, ascent: 719, descent: 0 },
    '3': { adv: 504, left: 0, right: 453, ascent: 719, descent: 156 },
    '4': { adv: 573, left: 16, right: 563, ascent: 719, descent: 0 },
    '5': { adv: 466, left: 16, right: 438, ascent: 703, descent: 125 },
    '6': { adv: 558, left: 31, right: 547, ascent: 813, descent: 16 },
    '7': { adv: 489, left: 47, right: 516, ascent: 703, descent: 0 },
    '8': { adv: 538, left: 31, right: 500, ascent: 719, descent: 16 },
    '9': { adv: 554, left: -62, right: 516, ascent: 719, descent: 109 },
    '%': { adv: 869, left: 47, right: 828, ascent: 719, descent: 31 },
};
/** The number's size in drawing units for one and two digits, and for three (so that "100" fits the circle). */
export const NUMBER_SIZE = 60;
export const NUMBER_SIZE_THREE_DIGITS = 46;
/** The percent sign's size as a share of the number's, and the gap between the number's ink and the sign's, as a share of the number's size. */
export const PERCENT_OF_NUMBER = 0.4;
export const STACK_GAP_OF_NUMBER = 0.12;
const round = (value) => Math.round(value * 100) / 100;
const DIGITS = '0123456789';
/**
 * The fixed vertical extent of the figures, so the baseline is the same for every value. Marcellus's figures are not all one height: the 3, the 5 and the 9 hang below the baseline and the 6 stands taller
 * than the rest, so the extent of the digits shown would move the number as it counts. The number's TOP is the body of the figures (the 0's ascent: what 82, 50, 20 and 100 draw, and what the eye centres);
 * its FOOT is the deepest descender of 0-9, so the percent sign always clears the 3, 5 and 9. The 6 rises a little above the top for the values that contain it, which is part of the face.
 */
const DIGIT_ASCENT = GLYPHS['0'].ascent;
const DIGIT_DESCENT = Math.max(...[...DIGITS].map((d) => GLYPHS[d].descent));
/** The ink of a run of digits, in thousandths of an em from the start of the run: from the first glyph's ink to the last glyph's ink. */
export function inkOf(digits) {
    const glyphs = [...digits].map((d) => GLYPHS[d] ?? GLYPHS['0']);
    const advance = glyphs.slice(0, -1).reduce((sum, glyph) => sum + glyph.adv, 0);
    return { left: glyphs[0].left, right: advance + glyphs[glyphs.length - 1].right };
}
/** Where to draw the number `digits` ("82") and its percent sign so that the pair is centred on (0, 0). The text elements use the default start anchor and these x, y (the baseline). */
export function numeralLayout(digits) {
    const size = digits.length >= 3 ? NUMBER_SIZE_THREE_DIGITS : NUMBER_SIZE;
    const pctSize = size * PERCENT_OF_NUMBER;
    const ink = inkOf(digits);
    const percent = GLYPHS['%'];
    const gap = size * STACK_GAP_OF_NUMBER;
    const numberHeight = ((DIGIT_ASCENT + DIGIT_DESCENT) / 1000) * size;
    const percentHeight = ((percent.ascent + percent.descent) / 1000) * pctSize;
    const top = -(numberHeight + gap + percentHeight) / 2;
    return {
        size,
        x: round((-(ink.left + ink.right) / 2 / 1000) * size),
        y: round(top + (DIGIT_ASCENT / 1000) * size),
        pctSize: round(pctSize),
        pctX: round((-(percent.left + percent.right) / 2 / 1000) * pctSize),
        pctY: round(top + numberHeight + gap + (percent.ascent / 1000) * pctSize),
    };
}
