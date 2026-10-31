/**
 * THE CHINESE ZODIAC READING.
 *
 * The accessible way into BaZi. Almost everyone arriving at this app already
 * knows they are "a Rabbit" or "a Dragon", and until now the pillar opened on a
 * Day Master they had never heard of. This gives them the door they were looking
 * for - and then says plainly that the year animal is one of eight characters,
 * so the door does not get mistaken for the building.
 *
 * WHY THE COMBINATION IS NOT A TEMPLATE
 *
 * The brief asks for an authored reading of the PAIR - what Fire changes about a
 * Rabbit - rather than an animal paragraph with an element paragraph stapled
 * underneath. Writing sixty bespoke essays would be one way; it would also be
 * sixty places for the quality to drift.
 *
 * Instead the combination is driven by the thing that actually determines it in
 * the tradition: the five-phase relationship between the year STEM's element and
 * the year BRANCH's own element. A Rabbit is Wood. Fire sits on Wood, and Wood
 * generates Fire - so the animal's own nature feeds the element it carries, and
 * that is a specific, true and readable thing to say. Metal on a Rabbit is the
 * opposite case: Metal controls Wood, and the pairing reads as pressure rather
 * than supply.
 *
 * Five relationships, twelve animals, five elements. Every one of the sixty
 * combinations gets a reading that is about that combination, because the
 * relationship really is different in each of the five cases and the animal and
 * element are named inside it.
 *
 * WHAT THIS FILE IS NOT
 * It is not a calculation. Every fact it uses - the animal, the element, the
 * polarity - comes from the engine's own symbolic label for the year pillar. The
 * branch-element table below is static reference data from the tradition, the
 * same twelve pairings every BaZi text prints.
 */
import { t, tf } from '../i18n/uiStrings.js?v=2ea79e9';
import { phaseWord, zodiacAnimalGenitive } from '../i18n/engineProse.js?v=2ea79e9';
/** The twelve branches and their own elements. Standard, and fixed. */
const BRANCH_ELEMENT = {
    Rat: 'Water', Ox: 'Earth', Tiger: 'Wood', Rabbit: 'Wood',
    Dragon: 'Earth', Snake: 'Fire', Horse: 'Fire', Goat: 'Earth',
    Monkey: 'Metal', Rooster: 'Metal', Dog: 'Earth', Pig: 'Water',
};
const ELEMENTS = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
/** Wood -> Fire -> Earth -> Metal -> Water -> Wood. */
const generates = (from, to) => ELEMENTS[(ELEMENTS.indexOf(from) + 1) % 5] === to;
/** Wood -> Earth -> Water -> Fire -> Metal -> Wood. */
const controls = (from, to) => ELEMENTS[(ELEMENTS.indexOf(from) + 2) % 5] === to;
/**
 * Parse the engine's symbolic label: "Yin Fire Rabbit".
 *
 * Returns null rather than guessing if the shape is not what BaZi produces, so a
 * change in the engine's formatting removes the section instead of printing
 * something wrong.
 */
export function parseZodiac(symbolicLabel) {
    if (!symbolicLabel)
        return null;
    const parts = symbolicLabel.trim().split(/\s+/);
    if (parts.length !== 3)
        return null;
    const [polarity, element, animal] = parts;
    if (!ELEMENTS.includes(element))
        return null;
    const branchElement = BRANCH_ELEMENT[animal];
    if (!branchElement)
        return null;
    return {
        animal, polarity, element: element, branchElement,
    };
}
/**
 * What each element brings, before it meets a particular animal.
 *
 * The phase NAMES are the engine's own - they appear in the Five Elements count
 * and in the technical appendix - so they stay as they are in every language,
 * and only the description around them is translated.
 */
const ELEMENT_MODIFIER = {
    Wood: 'reading.zodiac.element.wood',
    Fire: 'reading.zodiac.element.fire',
    Earth: 'reading.zodiac.element.earth',
    Metal: 'reading.zodiac.element.metal',
    Water: 'reading.zodiac.element.water',
};
/**
 * The authored combination: what this element does to THIS animal, driven by the
 * real relationship between the two phases.
 */
function combinationParagraph(identity) {
    const { animal, element, branchElement } = identity;
    /* One of five relationships between two phases. The animal and the two phase
       names are engine values, but they are also ORDINARY WORDS sitting inside an
       authored sentence, so they are handed over in the language - and in the
       CASE - the frame around them needs: Slovak says "na znamení zajaca" and
       "drevo plodí oheň", which is a genitive animal and a phase in two different
       forms. English asks for none of that and gets `Rabbit` and `Fire` back
       unchanged, so the English paragraph is exactly the sentence it always was.
       The engine's own capitalised `Fire Rabbit` still appears untranslated as the
       mark value and in the technical appendix, which is where a reader checking
       the calculation looks for it. */
    const key = element === branchElement ? 'reading.zodiac.combination.same'
        : generates(branchElement, element) ? 'reading.zodiac.combination.fed'
            : generates(element, branchElement) ? 'reading.zodiac.combination.spent'
                : controls(element, branchElement) ? 'reading.zodiac.combination.disciplined'
                    : controls(branchElement, element) ? 'reading.zodiac.combination.pressured'
                        /* Unreachable given five phases, but a reading is never invented
                           from a gap. */
                        : 'reading.zodiac.combination.other';
    return tf(key, {
        animal: zodiacAnimalGenitive(animal),
        element: phaseWord(element),
        elementObject: phaseWord(element, 'accusative'),
        branchElement: phaseWord(branchElement),
        branchElementObject: phaseWord(branchElement, 'accusative'),
    });
}
export function composeZodiacReading(identity, animalArchetype) {
    const title = `${identity.element} ${identity.animal}`;
    const paragraphs = [];
    /* The animal's own reading first - it is what the reader came for - then the
       element, then what the element does to it. */
    paragraphs.push(...animalArchetype);
    paragraphs.push(t(ELEMENT_MODIFIER[identity.element]));
    paragraphs.push(combinationParagraph(identity));
    paragraphs.push(tf('reading.zodiac.polarityLine', {
        polarity: identity.polarity,
        face: tf(identity.polarity === 'Yang'
            ? 'reading.zodiac.polarity.yang'
            /* "the face OF Fire" - a genitive in Slovak, and English's own `of` frame
               already carries the same relation, so the phase is looked up in the one
               case this clause can use it in. */
            : 'reading.zodiac.polarity.yin', { element: phaseWord(identity.element, 'genitive') }),
    }));
    /* The honesty line. It is not optional: the whole risk of leading with the
       zodiac is that a reader stops here and thinks they have read their chart. */
    paragraphs.push(t('reading.zodiac.oneOfFour'));
    return { title, paragraphs };
}
