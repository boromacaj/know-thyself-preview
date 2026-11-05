/*
 * THE BAZI CARD'S FIVE CHARACTERS AS OUTLINES - Wood 木, Fire 火, Earth 土, Metal 金, Water 水 - in a regular Song (Ming) hand, with the strokes tapering as a written character's do.
 *
 * Generated, not hand-drawn: each is the outline of the character's glyph in Noto Serif SC (SemiBold, 600), the typeface of the poster the owner chose as the reference, taken from Google Fonts' own subset
 * of exactly these five characters. Noto Serif SC (c) Adobe and Google, SIL Open Font License 1.1, which allows the outlines to be embedded. Every outline is turned the right way up and scaled by ONE factor
 * (the farthest point of the largest of the five is 29.5 units from its centre; the window's radius is 33), and set so that the CENTRE OF ITS WEIGHT - the centroid of the filled outline, as the Human Design
 * centres are centred - is the origin (0, 0): drawn at the window's middle, each character sits where the eye puts it in the middle of the circle, not where the middle of its box is (a box's middle
 * hangs a character with a heavy foot, like 土, low in the ring, and a circle round the outline hangs it high). Being outlines, they look the same on every device, with no typeface to depend on.
 */
/** How far the farthest point of the largest character is from its centre (the window's radius is 33). */
export const BAZI_GLYPH_RADIUS = 29.5;
/** The outlines by element, in units about the origin. */
export const BAZI_GLYPHS = Object.freeze({
    wood: 'M1.36 -10.25Q2.72 -6.58 4.78 -3.25Q6.84 0.08 9.35 2.89Q11.87 5.7 14.65 7.87Q17.44 10.05 20.34 11.45L20.16 11.95Q18.8 12.13 17.71 13.13Q16.62 14.13 16.08 15.76Q12.5 13.13 9.56 9.37Q6.61 5.61 4.39 0.76Q2.17 -4.09 0.72 -9.98ZM-0.32 -9.52Q-2.09 -4.18 -5.08 0.62Q-8.07 5.43 -12.21 9.48Q-16.36 13.54 -21.61 16.62L-22.16 16.12Q-18.17 12.81 -14.88 8.46Q-11.6 4.11 -9.2 -0.71Q-6.8 -5.54 -5.44 -10.25H-0.32ZM2.76 -20.31Q2.72 -19.85 2.38 -19.51Q2.04 -19.17 1.09 -19.04V19.52Q1.09 19.79 0.56 20.17Q0.04 20.56 -0.79 20.85Q-1.63 21.15 -2.49 21.15H-3.35V-20.94ZM14.68 -13.83Q14.68 -13.83 15.2 -13.42Q15.72 -13.01 16.53 -12.38Q17.35 -11.74 18.23 -11.02Q19.12 -10.29 19.84 -9.66Q19.71 -8.93 18.57 -8.93H-21.11L-21.48 -10.25H11.78Z',
    fire: 'M-12.4 -13.51Q-10.95 -9.61 -10.99 -6.67Q-11.04 -3.72 -11.9 -1.71Q-12.76 0.31 -13.94 1.44Q-14.66 2.21 -15.57 2.53Q-16.47 2.85 -17.27 2.66Q-18.06 2.48 -18.56 1.85Q-19.15 0.94 -18.83 -0.01Q-18.51 -0.96 -17.7 -1.64Q-16.43 -2.5 -15.32 -4.27Q-14.21 -6.03 -13.55 -8.39Q-12.89 -10.75 -13.07 -13.46ZM18.37 -10.25Q18.14 -9.93 17.78 -9.79Q17.42 -9.66 16.55 -9.75Q15.01 -8.07 12.86 -6.03Q10.71 -3.99 8.22 -2Q5.73 -0.01 3.1 1.67L2.65 1.17Q4.05 -0.42 5.5 -2.34Q6.95 -4.27 8.31 -6.28Q9.67 -8.3 10.78 -10.2Q11.89 -12.1 12.66 -13.6ZM0.47 -19.76Q0.38 -15.19 0.27 -10.99Q0.15 -6.8 -0.39 -3.04Q-0.93 0.72 -2.22 4.07Q-3.52 7.42 -5.89 10.32Q-8.27 13.22 -12.08 15.69Q-15.88 18.16 -21.5 20.2L-21.95 19.47Q-16.34 16.62 -12.92 13.33Q-9.5 10.05 -7.68 6.27Q-5.87 2.48 -5.17 -1.87Q-4.47 -6.21 -4.38 -11.13Q-4.29 -16.05 -4.29 -21.66L2.1 -21.03Q2.01 -20.53 1.65 -20.19Q1.29 -19.85 0.47 -19.76ZM0.43 -19.62Q0.74 -12.42 1.76 -6.76Q2.78 -1.1 5 3.16Q7.22 7.42 10.98 10.48Q14.74 13.54 20.54 15.67L20.45 16.17Q18.82 16.44 17.76 17.43Q16.69 18.43 16.28 20.2Q11.12 17.75 7.9 14.08Q4.68 10.41 2.94 5.5Q1.2 0.58 0.47 -5.65Q-0.25 -11.88 -0.43 -19.53Z',
    earth: 'M-3.7 -23.07 2.55 -22.48Q2.46 -21.98 2.12 -21.64Q1.78 -21.3 0.88 -21.17V15.89H-3.7ZM-22.32 15.3H11.71L14.61 11.68Q14.61 11.68 15.13 12.09Q15.65 12.49 16.49 13.13Q17.32 13.76 18.23 14.51Q19.14 15.26 19.86 15.89Q19.68 16.62 18.59 16.62H-21.96ZM-19.55 -6.99H9.3L12.16 -10.57Q12.16 -10.57 12.66 -10.16Q13.16 -9.75 13.97 -9.14Q14.79 -8.53 15.67 -7.8Q16.55 -7.08 17.28 -6.4Q17.19 -6.04 16.85 -5.85Q16.51 -5.67 16.01 -5.67H-19.19Z',
    metal: 'M-12.79 -7.08H2.39L4.79 -10.07Q4.79 -10.07 5.56 -9.48Q6.33 -8.89 7.37 -8.08Q8.42 -7.26 9.28 -6.49Q9.09 -5.76 8.05 -5.76H-12.42ZM-19.63 1.17H9.59L12.22 -2.14Q12.22 -2.14 12.7 -1.76Q13.17 -1.37 13.9 -0.78Q14.62 -0.19 15.46 0.46Q16.3 1.12 16.98 1.71Q16.8 2.44 15.75 2.44H-19.22ZM-21.8 16.53H11.09L13.85 12.9Q13.85 12.9 14.37 13.31Q14.89 13.72 15.69 14.35Q16.48 14.98 17.39 15.71Q18.29 16.43 19.02 17.07Q18.84 17.79 17.7 17.79H-21.44ZM-4.13 -6.67H0.31V17.11H-4.13ZM-14.37 4.25Q-11.7 5.52 -10.2 6.97Q-8.71 8.42 -8.17 9.8Q-7.62 11.18 -7.8 12.29Q-7.99 13.4 -8.64 14.03Q-9.3 14.67 -10.23 14.64Q-11.16 14.62 -12.11 13.67Q-12.11 12.13 -12.54 10.48Q-12.97 8.82 -13.58 7.28Q-14.19 5.74 -14.92 4.47ZM7.01 3.98 12.99 6.24Q12.85 6.6 12.4 6.85Q11.95 7.1 11.22 7.01Q9.55 9.23 7.55 11.36Q5.56 13.49 3.7 15.03L3.07 14.62Q3.7 13.35 4.38 11.56Q5.06 9.77 5.74 7.8Q6.42 5.83 7.01 3.98ZM-0.15 -19.72Q-1.82 -17.23 -4.32 -14.67Q-6.81 -12.11 -9.82 -9.73Q-12.83 -7.35 -16.14 -5.38Q-19.45 -3.41 -22.75 -2L-23.03 -2.59Q-20.17 -4.32 -17.23 -6.81Q-14.28 -9.3 -11.65 -12.13Q-9.03 -14.96 -7.1 -17.79Q-5.18 -20.62 -4.36 -23.03L2.71 -21.26Q2.62 -20.81 2.14 -20.6Q1.66 -20.4 0.62 -20.31Q2.21 -18.22 4.38 -16.43Q6.56 -14.64 9.19 -13.17Q11.81 -11.7 14.6 -10.52Q17.39 -9.34 20.15 -8.44L20.06 -7.71Q19.11 -7.49 18.31 -6.85Q17.52 -6.22 17.02 -5.36Q16.52 -4.5 16.34 -3.64Q12.85 -5.45 9.64 -7.87Q6.42 -10.3 3.88 -13.29Q1.35 -16.28 -0.15 -19.72Z',
    water: 'M1.31 -20.15V14.33Q1.31 15.96 0.88 17.13Q0.45 18.31 -0.89 19.04Q-2.22 19.76 -5.08 20.03Q-5.17 18.95 -5.44 18.15Q-5.71 17.36 -6.35 16.82Q-6.94 16.27 -7.93 15.89Q-8.93 15.5 -10.83 15.23V14.55Q-10.83 14.55 -9.97 14.62Q-9.11 14.69 -7.93 14.76Q-6.75 14.82 -5.71 14.89Q-4.67 14.96 -4.22 14.96Q-3.58 14.96 -3.36 14.73Q-3.13 14.51 -3.13 14.01V-22.01L2.9 -21.37Q2.85 -20.92 2.51 -20.6Q2.17 -20.29 1.31 -20.15ZM-21.43 -8.96H-8.07V-7.65H-21.02ZM-10.02 -8.96H-10.51L-8.11 -11.36L-3.95 -7.69Q-4.22 -7.38 -4.6 -7.24Q-4.99 -7.1 -5.76 -7.06Q-6.8 -2.66 -8.77 1.57Q-10.74 5.81 -13.93 9.48Q-17.13 13.15 -21.98 15.77L-22.38 15.23Q-18.8 12.29 -16.31 8.34Q-13.82 4.4 -12.26 -0.04Q-10.7 -4.48 -10.02 -8.96ZM1.31 -16.03Q2.35 -10.23 4.32 -5.84Q6.29 -1.44 8.9 1.8Q11.5 5.04 14.52 7.35Q17.53 9.66 20.61 11.24L20.43 11.74Q19.07 11.97 18.05 12.99Q17.03 14.01 16.53 15.55Q13.54 13.24 11.05 10.38Q8.56 7.53 6.57 3.86Q4.57 0.19 3.12 -4.66Q1.67 -9.5 0.81 -15.8ZM13.86 -14.08 19.21 -10.73Q19.02 -10.41 18.64 -10.28Q18.25 -10.14 17.48 -10.28Q16.03 -8.96 14.04 -7.35Q12.05 -5.74 9.76 -4.2Q7.47 -2.66 5.21 -1.35L4.75 -1.85Q6.43 -3.66 8.17 -5.86Q9.92 -8.06 11.44 -10.25Q12.95 -12.45 13.86 -14.08Z',
});
/**
 * THE PEN: the centre line of every stroke of each character, in the order a Chinese character is written (the order of its strokes), in the same units as the outlines above. The card writes a character by
 * revealing its outline along these lines, one stroke after another (baziMenuArt.ts: a mask whose lines are drawn by their dash offset). A line only has to run along the middle of its stroke and a little past
 * both ends: the outline is what is shown, and the line is wide enough (BZ_PEN_WIDTH in baziMenuGeometry.ts) to reveal all of it - a test samples the whole of every character and requires that it is.
 * Wood 木: the bar, the stem, the left stroke, the right stroke. Fire 火: the left dot, the short stroke on the right, the long left stroke, the right stroke. Earth 土: the short bar, the stem, the foot.
 * Metal 金: the roof (left, right), the three bars and the stem, the two dots, the foot. Water 水: the stem with its hook, the left bar and stroke, the short stroke, the right stroke.
 */
export const BAZI_PENS = Object.freeze({
    wood: Object.freeze([
        'M-21.2 -9.6L19.6 -9.6',
        'M-1.1 -21L-1.1 21',
        'M-2.9 -9.9Q-6.5 -1 -11.5 6.5Q-16 12.5 -21.9 16.4',
        'M1 -10Q4.3 -2.5 9.4 6Q13.5 11 18.8 12.7',
    ]),
    fire: Object.freeze([
        'M-12.7 -13.4Q-11.5 -8 -13 -2.5Q-14.5 0.5 -17.4 1',
        'M15.5 -11.9Q10.5 -6.5 7.5 -3.8Q5.2 -1.8 2.9 1.4',
        'M-1.9 -20.5L-2 -11Q-2.6 -1 -5.5 6.5Q-9 13 -21.7 19.9',
        'M0 -19.5Q0.5 -6 2.2 -1Q4 4 8 10.3Q12 15 19 17.2',
    ]),
    earth: Object.freeze([
        'M-19.3 -6.3L16.9 -6.3',
        'M-1.4 -22.6L-1.4 16',
        'M-22 16L19.7 16.2',
    ]),
    metal: Object.freeze([
        'M1 -20.5Q3 -16 5 -14Q10 -9.8 19 -6.2',
        'M0 -21Q-6 -14.5 -12 -8.5Q-18 -4.3 -22.8 -2.3',
        'M-12.6 -6.4L4.5 -6.4',
        'M-19.4 1.8L12 1.8',
        'M-13.8 4.4Q-10 8 -10.3 12.8',
        'M9.8 5Q7.5 10 3.6 14.7',
        'M-1.9 -6.7L-1.9 17.1',
        'M-21.6 17.2L18.5 17.2',
    ]),
    water: Object.freeze([
        'M-0.9 -21.4L-0.9 14Q-0.9 18 -4.5 18.2Q-8 17.8 -10.5 15.1',
        'M-21.2 -8.3L-8.1 -8.3',
        'M-7.4 -9Q-8 -2 -12.3 5.5Q-16.2 11.8 -21.9 15.5',
        'M16.5 -12.4Q10.5 -6.8 4.9 -1.7',
        'M1.1 -15.9Q2.8 -8 6.5 -0.6Q10 5.5 18.5 13.2',
    ]),
});
