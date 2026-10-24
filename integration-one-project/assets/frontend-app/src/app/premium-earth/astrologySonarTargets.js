/*
 * WHICH CONTROLS OF THE OPENED WESTERN ASTROLOGY VIEW RING (see premiumAffordances.ts for why these and not the planets on the wheel).
 * Pure data; one entry per group, the same shape any other pillar's opened view would add.
 */
const WESTERN = '.kt-pillar-view[data-pillar="western-astrology"]';
export const WESTERN_ASTROLOGY_SONAR_TARGETS = [
    {
        selector: '.kt-astro-hero[data-ah-live] button.kt-astro-callout',
        /* the ring wears the capsule's own accent: --ah-rim is gold on the Sun, blue-white on the Moon, mint on the Ascendant (astrologyBigThree.ts PALETTE) */
        declarations: '--kt-sonar-rgb: var(--ah-rim); --kt-sonar-sx: 1.1; --kt-sonar-sy: 1.28;',
    },
    { selector: '.kt-astro-hero[data-ah-live] button.kt-astro-callout[data-callout="moon"]', declarations: '--kt-sonar-delay: 0.22s;' },
    { selector: '.kt-astro-hero[data-ah-live] button.kt-astro-callout[data-callout="ascendant"]', declarations: '--kt-sonar-delay: 0.45s;' },
    {
        selector: `${WESTERN} .kt-info-control`,
        needsPosition: true,
        /* the "i" ring wears the ring the control itself is drawn with (conceptSheet.ts .kt-info-control border: the icon colour, else the profile's soft energy colour) */
        declarations: '--kt-sonar-rgb: var(--kt-icon-rgb, var(--profile-energy-soft-rgb, 218, 171, 84)); --kt-sonar-sx: 1.3; --kt-sonar-sy: 1.3; --kt-sonar-delay: 1.4s;',
    },
    { selector: `${WESTERN} .kt-mark .kt-info-control`, declarations: '--kt-sonar-delay: 0s;' },
];
/** The capsules of the opened view that float (see capsuleFloat.ts): the three Big Three capsules, each at its own point of the cycle. */
export const WESTERN_ASTROLOGY_FLOAT_TARGETS = [
    { selector: '.kt-astro-hero[data-ah-live] button.kt-astro-callout[data-callout="sun"]', declarations: '--kt-float-delay: 0s;' },
    { selector: '.kt-astro-hero[data-ah-live] button.kt-astro-callout[data-callout="moon"]', declarations: '--kt-float-delay: -1.7s;' },
    { selector: '.kt-astro-hero[data-ah-live] button.kt-astro-callout[data-callout="ascendant"]', declarations: '--kt-float-delay: -3.4s;' },
];
