import { LIFE_PATH_PORTRAITS } from './lifePathPortraits.js?v=b5ef5ed';
const SECTION_HEADINGS = {
    coreCharacter: 'Core character',
    innerWorld: 'Inner world',
    relationships: 'Relationships',
    workAndDirection: 'Work and direction',
    shadow: 'Shadow',
    growth: 'Growth',
};
/**
 * Each role opens its own portrait. These are the joins that stop the reader
 * feeling the seam: the opening states what kind of thing they are about to read
 * and in what register, so the authored material lands as a continuation rather
 * than as a block that has been dropped in.
 *
 * They are written per role and per number position in the sentence, but they
 * carry no interpretation of their own - every claim about the person still comes
 * from the authored portrait.
 */
const ROLE_FRAMING = {
    lifePath: {
        label: 'Life Path',
        sections: ['coreCharacter', 'innerWorld', 'relationships', 'workAndDirection', 'shadow', 'growth'],
        opening: (standfirst) => `Your Life Path is the long shape of things - the pattern that keeps reappearing across decades, in different jobs, different cities and different relationships, usually after you have concluded that this time will be different. ${standfirst} What follows describes that pattern, not a prediction of what you will do with it.`,
        provenance: 'Calculated from your full birth date. The Life Path is read as the arc of a life rather than as a mood or a phase.',
    },
    expression: {
        label: 'Expression',
        sections: ['coreCharacter', 'workAndDirection', 'relationships', 'shadow'],
        opening: (standfirst) => `Your Expression number describes capability rather than direction: what you are natively equipped to do, and the manner in which you tend to do it. It is the difference between where a life is going and what it has to work with. ${standfirst} Read the following as a description of your instrument, not of your destination.`,
        provenance: 'Calculated from the letters of your full birth name. Expression is read as native capability - what you work with, rather than where you are headed.',
    },
    soulUrge: {
        label: 'Soul Urge',
        sections: ['innerWorld', 'coreCharacter', 'relationships', 'shadow', 'growth'],
        opening: (standfirst) => `Your Soul Urge is the private one. It describes what actually satisfies you, which is not always what you pursue and is quite often something you would not say out loud. Where the Life Path describes a direction and the Expression a capability, this describes a motive. ${standfirst} Much of it may be more recognisable to you than to anyone who knows you.`,
        provenance: 'Calculated from the vowels of your full birth name. The Soul Urge is read as private motivation - what satisfies you, rather than what is visible.',
    },
    personality: {
        label: 'Personality',
        sections: ['coreCharacter', 'relationships', 'shadow'],
        opening: (standfirst) => `Your Personality number is the outer layer - what people meet before they know you, and what they go on assuming until something corrects it. It is not a mask exactly; it is the part of you that reaches a room first. ${standfirst} Expect some of this to describe an impression you have made rather than an experience you have had.`,
        provenance: 'Calculated from the consonants of your full birth name. Personality is read as first impression - how you are met, rather than how you are.',
    },
};
/**
 * Reduces to the 1-9 the portraits are written for.
 *
 * Master numbers are not yet written as their own portraits. Rather than silently
 * presenting an 11 as a 2 with no explanation, the caller is told the reduction
 * happened so the UI can say so - see reductionNoteFor below.
 */
export function portraitNumberFor(value) {
    let reduced = Math.abs(Math.trunc(value));
    while (reduced > 9) {
        reduced = String(reduced).split('').reduce((sum, digit) => sum + Number(digit), 0);
    }
    return (reduced || 9);
}
/** Honest about a reduction rather than quietly performing one. */
export function reductionNoteFor(value, reduced) {
    if (value === reduced)
        return null;
    return `Your calculated value is ${value}. A dedicated reading for ${value} is not yet written, so what follows is the reading for ${reduced}, which ${value} reduces to. The shape will be recognisable; the intensity described in ${value} literature is not covered here.`;
}
export function composePortrait(role, value) {
    const number = portraitNumberFor(value);
    const source = LIFE_PATH_PORTRAITS[number];
    const framing = ROLE_FRAMING[role];
    const sections = framing.sections.map((key, index) => ({
        heading: SECTION_HEADINGS[key],
        /* The role's opening is folded into the FIRST section rather than floated
           above it, so the portrait begins as prose instead of as a preamble
           followed by content. */
        paragraphs: index === 0
            ? [framing.opening(source.standfirst), ...source[key]]
            : [...source[key]],
    }));
    return {
        role,
        roleLabel: framing.label,
        number,
        standfirst: source.standfirst,
        sections,
        provenance: framing.provenance,
    };
}
/** Rough reading time, so the UI can promise the reader something honest. */
export function readingMinutesFor(portrait) {
    const words = portrait.sections
        .flatMap((section) => section.paragraphs)
        .reduce((total, paragraph) => total + paragraph.split(/\s+/).length, 0);
    return Math.max(1, Math.round(words / 200));
}
