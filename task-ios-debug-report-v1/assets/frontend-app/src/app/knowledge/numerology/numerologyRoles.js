import { unitId, } from '../knowledgeTypes.js?v=b5ef5ed';
import { sig } from '../semanticDimensions.js?v=b5ef5ed';
import { interactionOverlays } from './numerologyInteractions.js?v=b5ef5ed';
import { NAME_PORTRAITS } from './numerologyNamePortraits.js?v=b5ef5ed';
/**
 * NUMEROLOGY, READ IN ROLE.
 *
 * The rule this file exists to enforce: the archetype supplies the subject
 * matter, the ROLE supplies the reading. A 7 in the Life Path is a description
 * of how a whole life is shaped. A 7 in the Personal Year is a description of
 * twelve months. They share a theme and nothing else, and there is no code path
 * by which one can be served in place of the other - resolveUnit() falls back to
 * the base archetype, never to a sibling role.
 *
 * The number 7 is written out here across six roles as the worked example the
 * architecture is proved against. The remaining numbers carry their base
 * archetype and inherit role framing as the content is written; where a role is
 * unwritten the resolver returns the archetype and says so, rather than
 * borrowing text from a role that does not apply.
 */
const CORE_POSITION = {
    kind: 'established',
    settledness: 'established-within-system',
    basis: 'The core positions - Life Path, Expression, Soul Urge, Personality, Birthday - and the questions each is understood to answer are agreed across the modern Western schools.',
    sources: ['RESEARCH_NUMEROLOGY#core-positions'],
};
const TRANSIENT_CYCLE = {
    kind: 'contested',
    settledness: 'contested',
    basis: 'The Personal Year is calculated from the birth month and day plus the calendar year, but the schools disagree on when it turns over.',
    dissent: 'One tradition rolls the Personal Year on 1 January; another rolls it on the birthday, with a transitional overlap of some months either side. A reading must state which convention it used, because in the months between January and the birthday the two conventions give different numbers.',
    traditions: ['Calendar-year convention', 'Birthday-pivot convention'],
    sources: ['RESEARCH_NUMEROLOGY#personal-cycles'],
};
/** Kept in step with numerologyAuthoring.ts, where the same set is declared. */
const PAIRED_ROLES = new Set(['life-path', 'expression', 'soul-urge', 'personality']);
function seven(role, headline, core, extra = {}, semantics = [sig('analytical', 0.9), sig('introspective', 0.9), sig('independent', 0.5), sig('independent', 0.4)], provenance = CORE_POSITION) {
    /* The 7 is written out by hand here rather than through roleUnit(), so the
       cross-position readings roleUnit() attaches have to be attached here too.
       Without this the one number the architecture is proved against would be the
       only number with no pair reading - which is exactly the kind of gap a
       worked example is supposed to catch. */
    const paired = PAIRED_ROLES.has(role) ? interactionOverlays(role, '7') : [];
    const overlays = [...(extra.overlays ?? []), ...paired];
    /* Same merge roleUnit() does, for the same reason: the 7 is written by hand
       here, and without this it would be the one number whose name positions have
       no depth underneath them. The Life Path 7 declares its own and keeps it. */
    const portrait = extra.portrait ?? NAME_PORTRAITS[`${role}-7`];
    return {
        id: unitId('numerology', 'number', '7', role),
        entity: { system: 'numerology', kind: 'number', key: '7', label: 'Seven' },
        role,
        headline,
        core,
        semantics,
        provenance,
        ...extra,
        ...(portrait ? { portrait } : {}),
        ...(overlays.length > 0 ? { overlays } : {}),
    };
}
/* ------------------------------------------------------------------ *
 * LIFE PATH 7 - the worked example
 * ------------------------------------------------------------------ */
const LIFE_PATH_7 = seven('life-path', 'A life built around the question rather than the answer.', [
    'The Life Path is the long shape of a life: not what you are good at and not what you want, but the terrain you keep finding yourself on. On a 7, that terrain is the gap between what is claimed and what is true. You may find that you cannot leave a stated answer alone. Somebody explains how a thing works, the room accepts it, and you are already turning it over looking for the seam. This is not contrariness, though it is easily read that way. It is that a partial explanation does not feel like a small problem to you. It feels like an open circuit.',
    'A life organised this way moves in a particular rhythm. There are long stretches where very little is visible from outside, because the work of a 7 mostly happens before there is anything to show, and then there are short stretches where something arrives more or less finished. People who only see the second half tend to think you work in bursts. From inside, the burst is only the last and most visible part of the work.',
], {
    portrait: {
        coreCharacter: [
            'What sets a 7 apart is not intelligence, which is distributed fairly evenly across all nine numbers, but a refusal to round off. Most people are comfortable holding an approximate version of an idea, using it, and moving on. You are not, and the discomfort is physical rather than intellectual. An argument with a soft joint in it will keep you awake in a way that a genuinely hard problem will not.',
            'This gives you a real and slightly unfair advantage in any field where the standard answer is standard because nobody checked. It also means you are slow to speak, and the slowness gets misread constantly. In a meeting the confident approximation gets the credit and the accurate hesitation gets overlooked, and you will spend some part of your working life deciding how much of that you are willing to pay.',
        ],
        innerWorld: [
            'Solitude is not a preference for you, it is infrastructure. The thinking does not happen in company. What happens in company is a performance of thinking, competent enough that most people cannot tell, and exhausting in a way that is hard to explain to someone who recharges by talking. A day with nothing in it is not an empty day for a 7. It is the day the work gets done.',
            'The inner life is unusually well furnished and unusually private, and those two facts are connected. You have a long-running internal conversation that is more interesting to you than most external ones, and you have learned - probably early, probably from someone who did not understand it - that describing it out loud tends to flatten it. So it stays in. The risk is not that people find the inner world strange. The risk is that nobody is ever told it exists.',
        ],
        relationships: [
            'You are more loyal than you appear and considerably less available than you intend to be. What a 7 offers in a close relationship is rare: sustained, undivided, genuinely curious attention, given to someone who is used to being half-listened to. What a 7 struggles to offer is frequency. You can go quiet for a fortnight without noticing that anything has happened, and the other person, who has noticed, is left doing the arithmetic on what it means.',
            'The relationships that hold are the ones where this got said out loud early. Not apologised for and not negotiated away, just described, so that the quiet stops being read as withdrawal. That conversation is uncomfortable for a temperament that would rather demonstrate than explain, and it is the single highest-return thing a 7 can do for the people close to them.',
        ],
        workAndDirection: [
            'The work that suits you has a hard subject and a long clock. Research, diagnosis, law, engineering, forensic and archival work, anything analytic, anything where being right eventually is worth more than being quick now. What suits you badly is work that is mostly meetings, mostly persuasion, or mostly volume, and you will feel the mismatch as a specific kind of fog rather than as ordinary dissatisfaction.',
            'Two failure modes are worth naming, because both look like virtues from inside. The first is the endless preparation phase: the standard for release is set so high that nothing is ever released, and the years of accumulated depth stay unpublished. The second is the drift into the merely obscure, where difficulty becomes its own reward and the question stops connecting to anything. The correction for both is the same and it is unglamorous. Ship the imperfect version, on a date fixed in advance, to a real reader.',
        ],
        shadow: [
            'The characteristic difficulty of a 7 is that the instrument does not have an off switch. The scrutiny you point at a claim gets pointed at yourself with the same rigour and none of the detachment, and the result is a private standard that no actual performance can clear. From outside this reads as modesty. From inside it is closer to a permanent low-grade verdict.',
            'The second cost is the drift into isolation, which happens gradually and always for good reasons. Each individual decision to stay in is defensible. The accumulated pattern is not, and by the time it is visible the social muscles have atrophied enough that re-entry has a real cost. A 7 who has been alone too long starts to prefer the version of people that exists in their head, which is a quieter relationship and a much smaller life.',
            'Third, and hardest to see: certainty can become a substitute for contact. Being the person who has thought about it most carefully is a genuine position, and it is also a place to stand where nobody can reach you. When a 7 uses accuracy to win rather than to understand, the analysis is working exactly as designed and the person is nowhere in the room.',
        ],
        growth: [
            'The move that changes things is not becoming more sociable, which never sticks, and not lowering your standards, which you would only resent. It is separating the two uses of the instrument. Analysis is superb for problems and actively harmful when turned on your own worth, and those are different operations even though they feel identical from inside.',
            'The practical version: pick a fixed release date before starting, treat the deadline as data rather than as a judgement, and let one person see the unfinished thing. Every one of those is uncomfortable for this temperament, which is how you know they are the right ones. A 7 who learns to publish becomes formidable. A 7 who never does simply knows a great deal, privately, for a long time.',
        ],
    },
    overlays: [
        {
            id: 'numerology.life-path-7.from-16',
            condition: 'The Life Path 7 was reached through a 16, carrying the karmic debt.',
            applies: (context) => context.reducedFrom === 16,
            effect: 'weave-after-core',
            prose: [
                'There is an additional detail in how this 7 was arrived at. The reduction ran through 16, which the modern Western tradition reads as a karmic debt, and it sharpens the picture rather than changing it. Where a plain 7 investigates by temperament, a 7 reached this way tends to check its own foundations as well as other people\'s: the question is not only whether an explanation holds, but whether what you have built rests on something you have actually checked.',
                'Taken as symbolism rather than as a sentence, it points at one thing worth watching. The pattern recurs where something is being built on a story about yourself rather than on what is actually the case, so the useful question is not whether the structure is strong but whether it is honest.',
            ],
            semantics: [sig('introspective', 0.1), sig('novelty-seeking', 0.3)],
            provenance: {
                kind: 'tradition-specific',
                settledness: 'conventional',
                basis: 'Karmic debt is a modern Western reading with no counterpart in Chaldean numerology; it is offered here as one tradition among several.',
                traditions: ['Modern Western (Juno Jordan / Hans Decoz lineage)'],
                sources: ['RESEARCH_NUMEROLOGY#karmic-debt'],
            },
            priority: 10,
        },
    ],
});
/* ------------------------------------------------------------------ *
 * THE SAME NUMBER, THE OTHER ROLES
 * ------------------------------------------------------------------ */
const EXPRESSION_7 = seven('expression', 'Equipped to find out, whether or not you enjoy the finding.', [
    'The Expression number is drawn from the full birth name and describes capability rather than direction: the tools you were handed, independent of what you want to do with them. A 7 here says the equipment is analytic. You take things apart accurately, you hold complexity without needing to simplify it prematurely, and you notice the flaw in a structure faster than you can explain why it is a flaw.',
    'Read as capability, this is neutral about satisfaction. A 7 Expression can sit alongside wanting something quite different from life, and the mismatch is worth naming: being extremely good at rigorous work is not the same as being fed by it. What the 7 guarantees is that when you do turn the instrument on something, it works.',
], {}, [sig('analytical', 0.9), sig('structured', 0.4), sig('introspective', 0.5), sig('private', 0.2)]);
const SOUL_URGE_7 = seven('soul-urge', 'What actually satisfies: understanding something all the way down.', [
    'The Soul Urge comes from the vowels of the birth name and describes private motive - not what you do, but what makes the doing feel worth it. A 7 here is fed by comprehension. The moment that satisfies is the one where a thing that was opaque becomes clear, and it satisfies whether or not anybody else ever learns that it happened.',
    'This is worth knowing because it explains a mismatch a 7 Soul Urge can live with quietly for a long time. Recognition, promotion and money are all pleasant and none of them is the thing. A life that supplies plenty of those and no room to go deep will read as success from outside and as slow starvation from inside, and the correction is usually smaller than it looks: protected hours, on a real question, with no obligation to report.',
], {}, [sig('analytical', 0.7), sig('introspective', 0.9), sig('intuitive', 0.4), sig('independent', 0.3)]);
const PERSONALITY_7 = seven('personality', 'What people meet first: reserve, and the sense of something held back.', [
    'The Personality number comes from the consonants of the birth name and describes the outer impression, the version of you that arrives in a room before you have said anything. A 7 here reads as contained. People register composure, a certain distance, and an impression that you are assessing rather than participating, which is usually accurate and less cold than it appears.',
    'The practical consequence is that first impressions run against you and second impressions run strongly in your favour. Strangers read the reserve as judgement or disinterest; anyone who gets past it finds the attention underneath, which is whole and undivided. Knowing this is the whole use of the position - a small deliberate warmth early costs you nothing and removes an obstacle you did not put there on purpose.',
], {}, [sig('introspective', 0.6), sig('analytical', 0.5), sig('private', 0.5), sig('independent', 0.3)]);
const PERSONAL_YEAR_7 = seven('personal-year', 'A year for going quiet and finding out what you actually think.', [
    'A Personal Year is a twelve-month climate, not a description of you. It says what this stretch of time is shaped for, and a 7 year is shaped for withdrawal, study and reassessment. The characteristic experience is that outward momentum slows without your permission: things that should have moved do not, and effort applied at the usual angle produces less than it used to.',
    'Fighting that is the standard mistake. A 7 year rewards depth and resists volume, which makes it an excellent year to research, retrain, write, plan, repair your health, or seriously examine an arrangement you have stopped questioning, and a poor year to launch, expand or push hard for visibility. What gets worked out in a 7 year usually pays out in the 8 year that follows it, so the quietness is not a lost year unless it is spent resisting itself.',
], {}, [sig('introspective', 0.8), sig('analytical', 0.6), sig('stability-seeking', 0.4), sig('cautious', 0.4)], TRANSIENT_CYCLE);
const PERSONAL_MONTH_7 = seven('personal-month', 'A month with an inward tilt: fewer moves, better questions.', [
    'The Personal Month narrows the year to a four-week weather report and carries far less weight than the year does; treat it as a nudge rather than a frame. A 7 month tilts inward. Attention goes naturally to detail, to review, and to the thing you have been putting off examining properly.',
    'Used well it is the month to audit rather than to announce, to finish reading rather than to start pitching. Used badly it is a month spent forcing outward activity that will not catch, and then reading the lack of traction as failure rather than as timing.',
], {}, [sig('introspective', 0.5), sig('analytical', 0.4), sig('stability-seeking', 0.2)], TRANSIENT_CYCLE);
const BIRTHDAY_7 = seven('birthday', 'A specific talent for the unglamorous part: checking.', [
    'The Birthday number is the day of the month you were born, unreduced, and it is the smallest of the core positions: one clear gift rather than a whole direction. A 7 here gives you a reliable instinct for verification. You notice when a figure does not add up, when a story has been told slightly too smoothly, when the version everyone is working from was never actually checked.',
    'It is a modest-sounding talent that is worth a great deal in practice, because most errors are not clever, they are simply unexamined. The only thing to watch is proportion: the same instinct, applied to a low-stakes situation at full strength, is just pedantry, and it costs you goodwill you will want later.',
], {}, [sig('analytical', 0.6), sig('structured', 0.3), sig('emotionally-sensitive', 0.3)]);
export const NUMEROLOGY_ROLE_UNITS = [
    LIFE_PATH_7,
    EXPRESSION_7,
    SOUL_URGE_7,
    PERSONALITY_7,
    PERSONAL_YEAR_7,
    PERSONAL_MONTH_7,
    BIRTHDAY_7,
];
