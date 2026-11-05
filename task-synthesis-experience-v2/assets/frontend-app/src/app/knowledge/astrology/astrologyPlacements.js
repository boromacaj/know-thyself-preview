import { dignityOverlays } from './dignityOverlays.js?v=53c0693';
import { LUMINARY_PORTRAITS } from './luminaryPortraits.js?v=53c0693';
import { unitId, } from '../knowledgeTypes.js?v=53c0693';
import { sig } from '../semanticDimensions.js?v=53c0693';
/**
 * WESTERN ASTROLOGY - COMPOSED PLACEMENTS.
 *
 * This file is the answer to the hardest requirement in the brief: a Moon, in
 * Pisces, in the tenth house, squared by Saturn must not read as four unrelated
 * paragraphs bolted together.
 *
 * How it is done. The BASE unit is the planet-in-sign, which is already a
 * synthesis rather than a pair of definitions: 'moon-pisces' is written as one
 * thing, not as the Moon paragraph followed by the Pisces paragraph. HOUSE and
 * ASPECT then arrive as overlays whose prose was written knowing what precedes
 * it - the house overlay opens by naming the tension between this Moon and this
 * arena, and the aspect overlay opens by naming what the second function does to
 * the first. Nothing is joined; each seam was authored as a seam.
 *
 * The cost of this approach is honest and should be stated: it does not scale by
 * multiplication. There are 120 planet-in-sign combinations, and each one needs
 * its house and aspect overlays written by hand. What it buys is that every
 * composed reading is a written sentence rather than an assembled one, which is
 * the whole point. See RESEARCH_ASTROLOGY#composition for the sequencing rule.
 */
const hasAspect = (aspectKey, otherKey) => (context) => (context.aspects ?? []).some((entry) => entry.aspect === aspectKey && entry.other === otherKey);
const MOON_PISCES_OVERLAYS = [
    {
        id: 'astro.moon-pisces.house-10',
        condition: 'This Moon falls in the tenth house.',
        applies: (context) => context.house === 10,
        /* Priority 10: house before aspect. The house says where the function is
           exercised, and the aspect then describes how it behaves there. Reversing
           that order produces prose that qualifies a setting it has not yet named. */
        priority: 10,
        effect: 'weave-after-core',
        prose: [
            'Where this becomes complicated is that the Moon has landed in the most public part of your chart. The tenth house is career and standing - the place other people can see - and a Moon here means your emotional life is less private than it might be. What you feel leaks into your public presence, and your sense of security is bound up with your position in the world rather than kept safely at home.',
            'For a Pisces Moon in particular this is an awkward pairing, and worth understanding rather than fighting. The function that most needs a soft boundary has been placed in the arena that most rewards a firm one. It tends to show up in recognisable ways: you read the undercurrents of a group with real accuracy, you absorb the mood around you as though it were your own, and you are good at feeling your way into what people actually need. It also shows up as a specific vulnerability, which is that setbacks in your standing do not stay out in the world. They land somewhere much more personal than they should.',
            'The useful move is not to harden. A hardened Pisces Moon loses the thing that makes it valuable and gains very little in return. The move is to build the boundary structurally instead of emotionally: clear hours, work you can put down, and at least one place in your life where your standing is irrelevant.',
        ],
        semantics: [sig('assertive', 0.4), sig('structured', 0.3), sig('emotionally-sensitive', 0.1)],
        provenance: {
            kind: 'contextual-derivation',
            settledness: 'conventional',
            basis: 'Composed under the stated rule - the Moon supplies the function, Pisces the style, the tenth house the arena - rather than quoted from a source that discusses this exact combination.',
            sources: ['RESEARCH_ASTROLOGY#composition', 'RESEARCH_ASTROLOGY#houses'],
        },
    },
    {
        id: 'astro.moon-pisces.house-12',
        condition: 'This Moon falls in the twelfth house.',
        applies: (context) => context.house === 12,
        priority: 10,
        effect: 'weave-after-core',
        prose: [
            'The house this Moon occupies deepens rather than complicates it. The twelfth is the least visible part of the chart, and a Pisces Moon here is doubled: the most permeable sign in the most withdrawn arena. Very little of this emotional life is available to the people around you, and a good deal of it is not fully available to you either.',
            'What this produces is a genuinely rich interior that operates below the level of report. You will often find you have already processed something without being able to say when it happened. The corresponding difficulty is that solitude, which you need, shades into isolation, which you do not, and the line between them is not obvious from the inside.',
        ],
        semantics: [sig('introspective', 0.5), sig('intuitive', 0.2), sig('private', 0.3)],
        provenance: {
            kind: 'contextual-derivation',
            settledness: 'conventional',
            basis: 'Same composition rule as the tenth-house overlay.',
            sources: ['RESEARCH_ASTROLOGY#composition'],
        },
    },
    {
        id: 'astro.moon-pisces.square-saturn',
        condition: 'Saturn squares this Moon.',
        applies: hasAspect('square', 'saturn'),
        /* Priority 20: after the house, so the aspect can qualify a setting the
           reader has already been given. */
        priority: 20,
        effect: 'weave-after-core',
        prose: [
            'One more thing is acting on this Moon, and it pulls in the opposite direction to everything described so far. Saturn is at right angles to it, which in practice means the part of you that limits and doubts has direct access to the part of you that feels. Emotion does not get to arrive unexamined here. It arrives, and then something colder asks whether it is warranted.',
            'Much of this starts as a cost. A Pisces Moon under Saturn tends to treat feeling as inconvenient - too much, or badly timed, or embarrassing - and the standard response is to seal it off and present something more manageable. That works, at the price of a persistent low-level loneliness that has no obvious external cause.',
            'The reason this aspect is worth having anyway is what it becomes. A square is friction with a purpose: it forces a development that neither function would have undertaken on its own. Saturn gives this Moon something it badly needs and cannot generate for itself, which is an edge - the capacity to feel deeply and still hold a position. Pisces Moons without it tend to be moved by whatever is strongest in the room. This one is not, and the difference usually shows up somewhere in the second half of life, as a durability that surprises people who only knew the sensitivity.',
        ],
        semantics: [sig('structured', 0.4), sig('stability-seeking', 0.3), sig('emotionally-contained', 0.2), sig('cautious', 0.2)],
        provenance: {
            kind: 'contextual-derivation',
            settledness: 'conventional',
            basis: 'Square as developmental friction is established; its application to this specific pair is composed here.',
            sources: ['RESEARCH_ASTROLOGY#aspects', 'RESEARCH_ASTROLOGY#composition'],
        },
    },
    {
        id: 'astro.moon-pisces.angular',
        condition: 'This Moon sits close to an angle.',
        applies: (context) => context.angular === true,
        priority: 30,
        effect: 'amend-growth',
        prose: [
            'Because this Moon sits within orb of an angle, none of it is subtle. Angularity amplifies, and it amplifies indiscriminately: the empathy tends to be visible first, and so does the porousness. Assume you are more legible than you feel, and plan for the fact that a bad week is visible.',
        ],
        semantics: [sig('emotionally-sensitive', 0.2)],
        provenance: {
            kind: 'established',
            settledness: 'established-within-system',
            basis: 'Angular amplification is agreed from Hellenistic practice onward.',
            sources: ['RESEARCH_ASTROLOGY#angularity'],
        },
    },
];
/**
 * The base unit. Note that the core paragraphs describe ONE thing - a Moon that
 * works in the Piscean way - rather than a Moon paragraph and a Pisces
 * paragraph placed next to each other.
 */
const MOON_IN_PISCES = {
    id: unitId('western-astrology', 'planet', 'moon-pisces', 'natal-placement'),
    entity: {
        system: 'western-astrology',
        kind: 'planet',
        key: 'moon-pisces',
        label: 'Moon in Pisces',
    },
    role: 'natal-placement',
    headline: 'A feeling function with almost no wall around it.',
    core: [
        'The Moon describes the part of you that runs without being asked: what you need in order to feel safe, what you reach for when something goes wrong, and how an experience gets digested after the fact. In Pisces, that part of you has a thin boundary. You do not so much observe the emotional state of a room as get into it, and the crossing happens well before you have decided anything about it.',
        'This has a real and specific consequence: it can be hard to tell whose feeling you are having. A room where an argument has just happened can change your mood; a difficult conversation can leave you carrying something that was never yours to carry. This is not imagination and it is not weakness - it is what a permeable emotional boundary does - but it means that knowing what you feel is, for you, an acquired discipline rather than a given.',
    ],
    portrait: {
        innerWorld: [
            'What you get in exchange is considerable. There is a fluency here with everything that does not reduce to argument: music, atmosphere, the thing a person means rather than the thing they said. Your compassion is not a moral position you have adopted, it is a perceptual fact, and it extends easily to people who have not earned it, which is both the best and the most exploitable thing about you.',
            'You also need more recovery than you are likely to admit. A day spent among people costs you something real, and the cost is not social anxiety - you may be perfectly comfortable - it is the accumulated load of everything you absorbed while you were there. Solitude is not indulgence for this Moon, it is how the absorbed material gets sorted back into what is yours and what is not.',
        ],
        relationships: [
            'In close relationships you give a close quality of attention: you tend to understand people before they have explained themselves, and that kind of understanding can create strong attachments quickly. The corresponding risk is that you merge. Your sense of your own state becomes entangled with the other person, and by the time the relationship is genuinely not working you may have lost the vantage point from which you could tell.',
            'The pattern most worth watching is the rescue. A Pisces Moon is drawn to people who are struggling, partly out of real compassion and partly because being needed is the one form of closeness that comes with a clear role. It is a workable instinct in small doses and a poor foundation for a life.',
        ],
        shadow: [
            'The characteristic difficulty is escape. When the input becomes too much - and it does - this Moon does not confront, it dissolves: into sleep, into a story, into a substance, into a fantasy of a different life. Each individual instance is minor and defensible. The pattern is what does the damage, because the situation being avoided goes on developing in your absence.',
            'The second, quieter cost is a kind of self-erasure. A boundary this thin makes it genuinely difficult to hold a preference in the presence of someone who has a strong one, and a life can be arranged almost entirely around other people without any single decision that could be pointed to as the moment it happened.',
        ],
        growth: [
            'The work here is unglamorous and it is not about becoming less sensitive, which is neither possible nor desirable. It is about installing, deliberately, a boundary that does not come by default here: knowing where you end. In practice that means asking, routinely and out loud if necessary, whether the feeling you are having started in you. It is a small question and it separates the signal from the noise more effectively than anything else available to this placement.',
            'The second piece is a container for what you absorb. It helps to have some channel - music, writing, images, water, something repetitive - through which the accumulated material leaves. Without one it does not disperse. It settles.',
        ],
        practicalGuidance: [
            'Three habits carry most of the weight, and none of them require you to become a different person. Keep a reliable amount of time alone that is not negotiable and not framed as recovery from anything, because framing it that way invites other people to argue with it. Decide the important things twice, once in company and once by yourself the following day, and notice when the two answers differ, because the difference is almost always the shape of somebody else preference in your head.',
            'The third is about people rather than time. Be deliberate about who you spend long stretches with, more deliberate than someone with a firmer boundary would need to be. You take on the emotional weather of whoever you are near, and a person who is chronically unhappy in your company will make you chronically unhappy without either of you intending it or noticing when it began.',
        ],
    },
    semantics: [
        sig('emotionally-expressive', 0.9),
        sig('intuitive', 0.9),
        sig('emotionally-sensitive', 0.9),
        sig('collaborative', 0.6),
        sig('adaptable', 0.5),
        sig('introspective', 0.5),
        sig('adaptable', 0.6),
        sig('collaborative', 0.4),
    ],
    provenance: {
        kind: 'established',
        settledness: 'established-within-system',
        basis: 'The Moon as the emotional and instinctual function, and Pisces as the most permeable of the water signs, are agreed across modern and traditional Western schools alike.',
        sources: ['RESEARCH_ASTROLOGY#grammar', 'RESEARCH_ASTROLOGY#signs'],
    },
    /*
     * The dignity conditional joins the authored house and aspect overlays.
     *
     * The worked example is hand-built rather than passed through placementUnit(),
     * so it does not inherit what that attaches - and without this it would be the
     * one placement in the library with no dignity reading, which is exactly the
     * gap a worked example exists to catch.
     */
    overlays: [...MOON_PISCES_OVERLAYS, ...dignityOverlays('moon')],
};
/*
 * And the same per-field portrait merge placementUnit() does.
 *
 * This unit declares five fields of its own and they win. What it gains is the
 * one it does not have - the Moon's emotional pattern - so the most carefully
 * written placement in the library is not also the only one missing it.
 */
const withMergedPortrait = (unit) => {
    const merged = LUMINARY_PORTRAITS[unit.entity.key];
    if (!merged)
        return unit;
    return { ...unit, portrait: { ...merged, ...unit.portrait } };
};
export const ASTROLOGY_PLACEMENTS = [MOON_IN_PISCES]
    .map(withMergedPortrait);
