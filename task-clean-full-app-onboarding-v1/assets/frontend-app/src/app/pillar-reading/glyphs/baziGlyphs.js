import { CIRCLE, characterGlyph, glyph } from './glyphCore.js?v=f9ab0a6';
/**
 * BAZI / CHINESE METAPHYSICS GLYPHS.
 *
 * Three kinds of symbol, and the distinction between them is deliberate:
 *
 *   CHARACTERS   The ten Heavenly Stems and twelve Earthly Branches ARE
 *                characters. 甲 is not a concept that needs an icon drawn for
 *                it; it is the symbol. Redrawing it would be worse and slightly
 *                absurd. They are rendered as text in the shared glyph box.
 *
 *   PICTOGRAMS   The twelve zodiac animals are drawn, because the brief asks
 *                for a Rabbit near the word Rabbit and a character (兔) is not
 *                what a reader means by that. Each is a single-stroke silhouette
 *                on the same 24x24 grid - a suggestion of the animal, not an
 *                illustration, so twelve of them can sit in a row without the
 *                page turning into a children's book.
 *
 *   DIAGRAMS     Yin/yang and the five phases are geometric by nature.
 *
 * No emoji anywhere. The Unicode zodiac emoji are exactly the inconsistent,
 * platform-decided artwork the brief rules out.
 */
/* ------------------------------------------------- stems and branches */
export const STEM_CHARACTERS = {
    jia: '甲', yi: '乙', bing: '丙', ding: '丁', wu: '戊',
    ji: '己', geng: '庚', xin: '辛', ren: '壬', gui: '癸',
};
export const BRANCH_CHARACTERS = {
    zi: '子', chou: '丑', yin: '寅', mao: '卯', chen: '辰', si: '巳',
    wu: '午', wei: '未', shen: '申', you: '酉', xu: '戌', hai: '亥',
};
export function stemGlyph(stem, options = {}) {
    const character = STEM_CHARACTERS[stem.toLowerCase()];
    if (!character)
        return '';
    return characterGlyph(character, { className: 'kt-glyph-stem', ...options });
}
export function branchGlyph(branch, options = {}) {
    const character = BRANCH_CHARACTERS[branch.toLowerCase()];
    if (!character)
        return '';
    return characterGlyph(character, { className: 'kt-glyph-branch', ...options });
}
/* ------------------------------------------------------ zodiac animals */
/**
 * Twelve silhouettes, each a closed path with a light fill and the shared
 * stroke, so they read as marks rather than as drawings. Every one is built to
 * the same rules: a body mass, one head gesture, and at most two identifying
 * details - the ears on the Rabbit, the horns on the Ox, the mane on the Horse.
 * Anything more and they stop matching the astrological glyphs beside them.
 */
const ANIMAL_PATHS = {
    /* Rat: low body, long tail, pointed snout, round ear. */
    rat: '<path d="M4 15.6c0-2.6 2.6-4.6 6-4.6 2.4 0 4 .9 5 2.2l3.4-1.2-1.4 2.6c.4.7.6 1.4.6 2.2H4Z"/>'
        + `${CIRCLE(15.2, 9.6, 2.2)}<path d="M4 16.8c-1.4 0-2.4-1.2-2.4-2.6"/>`,
    /* Ox: heavy body, low head, curved horns. */
    ox: '<path d="M5 17.4v-4.2c0-2 1.8-3.6 4-3.6h5c2.2 0 4 1.6 4 3.6v4.2"/>'
        + '<path d="M8.4 9.6c-1.6-.7-2.4-2.2-2.2-3.8 1.8-.2 3.2.8 3.8 2.4M15.6 9.6c1.6-.7 2.4-2.2 2.2-3.8-1.8-.2-3.2.8-3.8 2.4"/>'
        + `${CIRCLE(11.5, 13.4, 1)}`,
    /* Tiger: crouching body, broad head, stripes. */
    tiger: '<path d="M3.6 17.4c0-3 2.4-5.4 5.4-5.4h6c3 0 5.4 2.4 5.4 5.4"/>'
        + `${CIRCLE(12, 8, 3.6)}<path d="M9 5.4L8 3.2l2.4 1.2M15 5.4L16 3.2l-2.4 1.2M6.6 14.6v2.8M12 14.2v3.2M17.4 14.6v2.8"/>`,
    /* Rabbit: the two long ears are the whole identity. */
    rabbit: `${CIRCLE(12, 15.4, 4.6)}`
        + '<path d="M9.6 11.2C8.6 8.6 8.4 5.4 9.8 3.4c1.2.8 2 3.4 2 6.6M14.4 11.2c1-2.6 1.2-5.8-.2-7.8-1.2.8-2 3.4-2 6.6"/>'
        + `${CIRCLE(10.6, 15, .8)}${CIRCLE(13.4, 15, .8)}`,
    /* Dragon: serpentine body with a crest. */
    dragon: '<path d="M3.4 18.6c2.6 0 3.6-2 3.6-4s1-4 3.4-4 3.4 2 3.4 3.4"/>'
        + '<path d="M13.8 14c0-2.6 1.8-4.6 4.2-4.6 1.6 0 2.6 1 2.6 2.4 0 1.6-1.4 2.4-2.8 2.4"/>'
        + '<path d="M17.4 9.4l1.6-3 1 2.6M14.2 8.8l-1.4-2.4 2.6.4"/>'
        + `${CIRCLE(18.6, 12.2, .8)}`,
    /* Snake: a coiled S with a small head. */
    snake: '<path d="M5 19c0-2.6 2-3.6 4.4-3.6s4.4-1 4.4-3.2-1.6-3-3.4-3c-1.6 0-2.8 1-2.8 2.4"/>'
        + '<path d="M13.8 12.2c0-3 2-5 4.6-5"/>'
        + `${CIRCLE(19.4, 6.6, 1.6)}<path d="M20.8 5.4l1.6-1.2"/>`,
    /* Horse: arched neck, flowing mane. */
    horse: '<path d="M4.6 19.4v-4.6c0-3 2.4-5.4 5.4-5.4 2.4 0 3.6-1.6 3.6-3.6"/>'
        + '<path d="M13.6 5.8c1.6 0 3 1.2 3.4 2.8l1.4 5.4M18.4 14a4 4 0 0 1-4 5.4"/>'
        + '<path d="M13.4 7.4c1.4-1 2.6-1 3.6 0M15.2 10c1.4-1 2.6-1 3.6 0"/>',
    /* Goat: curled horn and beard. */
    goat: `${CIRCLE(12, 13.4, 4.6)}<path d="M12 18v3"/>`
        + '<path d="M9 9.4C7.4 8 6.6 5.8 7.6 4.2c1.6.4 2.8 2 3.2 3.8M15 9.4c1.6-1.4 2.4-3.6 1.4-5.2-1.6.4-2.8 2-3.2 3.8"/>'
        + `${CIRCLE(10.6, 13, .8)}${CIRCLE(13.4, 13, .8)}`,
    /* Monkey: round head, big ears, long arms. */
    monkey: `${CIRCLE(12, 10.4, 4.4)}${CIRCLE(6.6, 10.4, 2)}${CIRCLE(17.4, 10.4, 2)}`
        + `${CIRCLE(10.4, 9.6, .8)}${CIRCLE(13.6, 9.6, .8)}`
        + '<path d="M10 12.6c1.2 1 2.8 1 4 0M8.6 15.6c-1 2-.4 4.2 1.4 5.2M15.4 15.6c1 2 .4 4.2-1.4 5.2"/>',
    /* Rooster: comb, beak, tail plume. */
    rooster: '<path d="M13.6 20.4c-3 0-5.4-2.4-5.4-5.4 0-3.4 2.4-5.6 5.4-5.6"/>'
        + `${CIRCLE(13.6, 7.4, 3)}<path d="M16.4 6.4l3-1.4-1.6 2.8"/>`
        + '<path d="M11.4 4.8c0-1.2.8-2 1.6-1.4.6-1 1.8-.8 2 .4.8-.6 1.8 0 1.6 1.2"/>'
        + '<path d="M8.4 12.4C6 11 3.6 11.6 2.6 13.6c2 .6 3.4 1.6 4.4 3"/>',
    /* Dog: upright ears, muzzle, tail. */
    dog: `${CIRCLE(12, 12.6, 4.6)}`
        + '<path d="M8.6 9.2L7 4.8l3.4 2.4M15.4 9.2L17 4.8l-3.4 2.4"/>'
        + `${CIRCLE(10.6, 12, .8)}${CIRCLE(13.4, 12, .8)}<path d="M12 14.4v1.4"/>`
        + '<path d="M16.4 16.4c2 .4 3.2 2 3 4"/>',
    /* Pig: round snout is the identity. */
    pig: `${CIRCLE(12, 13, 5.2)}${CIRCLE(12, 14.4, 2.4)}`
        + `${CIRCLE(11.1, 14.4, .55)}${CIRCLE(12.9, 14.4, .55)}`
        + '<path d="M8 8.6L6.6 5.4l3.4 1.6M16 8.6L17.4 5.4 14 7"/>',
};
/** The animal each branch carries, so a chart's branch can show its pictogram. */
export const BRANCH_ANIMALS = {
    zi: 'rat', chou: 'ox', yin: 'tiger', mao: 'rabbit', chen: 'dragon', si: 'snake',
    wu: 'horse', wei: 'goat', shen: 'monkey', you: 'rooster', xu: 'dog', hai: 'pig',
};
export const ANIMAL_LABELS = {
    rat: 'Rat', ox: 'Ox', tiger: 'Tiger', rabbit: 'Rabbit', dragon: 'Dragon', snake: 'Snake',
    horse: 'Horse', goat: 'Goat', monkey: 'Monkey', rooster: 'Rooster', dog: 'Dog', pig: 'Pig',
};
export function animalGlyph(animal, options = {}) {
    const path = ANIMAL_PATHS[animal.toLowerCase()];
    if (!path)
        return '';
    return glyph(path, { className: 'kt-glyph-animal', ...options });
}
/** Convenience: the animal pictogram for an Earthly Branch. */
export function branchAnimalGlyph(branch, options = {}) {
    const animal = BRANCH_ANIMALS[branch.toLowerCase()];
    return animal ? animalGlyph(animal, { title: ANIMAL_LABELS[animal], ...options }) : '';
}
/* ------------------------------------------------------- five phases */
/**
 * The five phases as marks rather than as characters, because they appear in
 * tallies and balance readouts where a row of characters would be unreadable at
 * a glance. Each one draws what the phase does: wood grows, fire rises, earth
 * settles, metal condenses, water descends.
 */
const PHASE_PATHS = {
    wood: '<path d="M12 20.4V6.6M12 11.4L7.4 6.8M12 11.4l4.6-4.6M12 16.2L8.4 12.6M12 16.2l3.6-3.6"/>',
    fire: '<path d="M12 3.6c3.4 3.6 5.4 6.4 5.4 9.4a5.4 5.4 0 0 1-10.8 0c0-1.6.7-3 1.8-4.4.4 1.4 1.2 2.4 2.2 2.8-.6-2.4-.2-5 1.4-7.8Z"/>',
    earth: `<path d="M3.6 17.4h16.8"/>${CIRCLE(12, 13.2, 3.6)}<path d="M6.4 20.4h11.2"/>`,
    metal: '<path d="M12 4.2l6.4 5.4-2.4 8.6H8l-2.4-8.6Z"/><path d="M8 9.6h8"/>',
    water: '<path d="M12 3.8c3.6 4.2 5.6 7.2 5.6 9.8a5.6 5.6 0 1 1-11.2 0c0-2.6 2-5.6 5.6-9.8Z"/>',
};
export const PHASE_LABELS = {
    wood: 'Wood', fire: 'Fire', earth: 'Earth', metal: 'Metal', water: 'Water',
};
export function phaseGlyph(phase, options = {}) {
    const path = PHASE_PATHS[phase.toLowerCase()];
    if (!path)
        return '';
    return glyph(path, { className: 'kt-glyph-phase', ...options });
}
/* ---------------------------------------------------------- yin / yang */
/**
 * The taijitu, and its two halves used separately as polarity markers.
 *
 * A full taijitu beside every yang stem would be wrong - the symbol means the
 * whole, not one side of it - so a stem's polarity gets a half-disc marker and
 * the complete symbol is reserved for the chart's overall balance.
 */
const TAIJITU = '<circle cx="12" cy="12" r="9"/>'
    + '<path fill="currentColor" stroke="none" d="M12 3a9 9 0 0 1 0 18 4.5 4.5 0 0 1 0-9 4.5 4.5 0 0 0 0-9Z"/>'
    + '<circle cx="12" cy="7.5" r="1.2" fill="none" stroke="currentColor" stroke-width="1.2"/>'
    + '<circle cx="12" cy="16.5" r="1.2" fill="currentColor" stroke="none"/>';
const POLARITY_PATHS = {
    /* Yang: the light half, drawn as the unfilled side. */
    yang: `${CIRCLE(12, 12, 9)}<path d="M12 3v18"/>`
        + '<path fill="currentColor" stroke="none" d="M12 3.6a8.4 8.4 0 0 0 0 16.8Z" opacity="0.18"/>',
    /* Yin: the dark half, filled. */
    yin: `${CIRCLE(12, 12, 9)}<path d="M12 3v18"/>`
        + '<path fill="currentColor" stroke="none" d="M12 3.6a8.4 8.4 0 0 1 0 16.8Z"/>',
};
export function polarityGlyph(polarity, options = {}) {
    const path = POLARITY_PATHS[polarity.toLowerCase()];
    if (!path)
        return '';
    return glyph(path, { className: 'kt-glyph-polarity', ...options });
}
export function taijituGlyph(options = {}) {
    return glyph(TAIJITU, { className: 'kt-glyph-taijitu', title: 'Yin and Yang', ...options });
}
