/**
 * THE BIG THREE MEANING RECORDS - the shape of one entry.
 *
 * Thirty-six of these exist: the twelve signs, each read as a Sun, as a Moon and as an Ascendant. They are what a tap on one of the three
 * callouts of the Western Astrology hero opens, and they are written to the PLACEMENT, not to the sign: a Sun in Cancer is who you are becoming,
 * a Moon in Cancer is what makes you feel safe, a Cancer Ascendant is how you arrive. The same sign reads three different ways here.
 *
 * WHERE THIS SITS IN THE KNOWLEDGE LAYER. The registry already holds the Sun and the Moon in each sign as a full reading (placements/luminaries.ts:
 * `western-astrology:planet:sun-virgo:natal-placement`) and the sign itself as an archetype (`western-astrology:sign:virgo:base-archetype`, the unit the
 * Ascendant's reading is drawn from). A record here does not replace or restate either: it is the short, structured companion of the same unit - what
 * the sign stands for, what it means in this placement, strengths, tensions, how it tends to show, a question - and it names the unit it accompanies
 * (`unitId`) so a test can prove they describe the same thing. For the Sun and the Moon the title IS the unit's headline.
 *
 * Nothing here calculates. The sign comes from the astrology engine; a record is looked up by (placement, sign) and never computed or substituted.
 */
export const BIG_THREE_PLACEMENTS = ['sun', 'moon', 'ascendant'];
export const ZODIAC_SIGNS = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
];
