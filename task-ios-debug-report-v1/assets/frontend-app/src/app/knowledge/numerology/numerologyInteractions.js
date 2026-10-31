import { activeLocale } from '../../i18n/locale.js?v=b5ef5ed';
import { SK_FRAMES, skMasterRoot } from './numerologyInteractionsSk.js?v=b5ef5ed';
import { MASTER_ROOT, relationBetween, TEMPERAMENT, } from './numberTemperament.js?v=b5ef5ed';
/*
 * WHAT IT MEANS THAT THESE NUMBERS TURNED UP TOGETHER.
 *
 * A numerology reading printed four numbers one after another and never said
 * the one thing a reader most wants to know: what does it mean that I have
 * THESE four? A Life Path 7 with a 3 Expression is a different life from a 7
 * with a 7 Expression - the direction is identical and the equipment for
 * travelling it is not - and neither reading can be written without the other
 * number in view.
 *
 * HOW THE PAIRS ARE PRODUCED
 * Not as a table. Life Path against Expression alone is 144 cells, and all four
 * core positions against each other is over eight hundred; written by hand that
 * is a body of text nobody reads twice and which falls out of date the moment
 * one number's own reading is revised.
 *
 * Instead: sixteen authored FRAMES - four role pairings by four kinds of
 * meeting - each of which names both numbers' actual material rather than a
 * shared abstraction. The frame supplies the argument, numberTemperament.ts
 * supplies what each number brings and cannot supply for itself, and the
 * rendered paragraph is specific to the pair because both halves of it are.
 *
 * WHAT KEEPS THIS FROM BEING GENERATION
 * Everything in the sentence was authored: the frames here, the phrases next
 * door, and the rule that decides which frame applies. Only the joining is
 * mechanical. A test asserts that two different pairs on the same relation
 * produce materially different prose, which is the failure this design is
 * exposed to and the one worth guarding.
 *
 * WHAT IS DELIBERATELY NOT HERE
 * No pair is called good or bad, and no pair predicts anything. A crosswise
 * meeting is not a worse chart than a reinforcing one - it is a different
 * problem, and the reinforcing one has the harder blind spot.
 */
/** The four positions this composes across, in the language a reader meets. */
const ROLE_NAME = {
    'life-path': 'Life Path',
    expression: 'Expression',
    'soul-urge': 'Soul Urge',
    personality: 'Personality',
};
/** What each position IS, in one clause, for frames that need to say it. */
const ROLE_SENSE = {
    'life-path': 'the direction the life keeps taking',
    expression: 'the equipment you were handed',
    'soul-urge': 'what actually satisfies you',
    personality: 'the version of you that reaches a room first',
};
const label = (role, value) => (role === 'life-path' ? `Life Path ${value}` : `${value} ${ROLE_NAME[role]}`);
/* ------------------------------------------------------------------------- *
 * LIFE PATH x EXPRESSION - where you are going, against what you have to go
 * with. The pairing a reader asks about first, and the one where "these two
 * disagree" is most often mistaken for a fault.
 * ------------------------------------------------------------------------- */
const LIFE_PATH_EXPRESSION = {
    same: (p) => [
        `Your Life Path and your Expression are the same number, which is rarer than it sounds and `
            + `changes how the whole chart reads. The direction ${p.self} keeps taking and the equipment `
            + `you were handed for taking it are one thing: this life ${p.selfT.brings}, and so do you. `
            + `Nothing in the chart argues with it, which is why people who know you tend to describe you `
            + `in one sentence and be roughly right.`,
        `The cost is the other half of the same fact. What a ${p.self} needs and cannot supply for `
            + `itself - ${p.selfT.needs} - is missing twice over here, with nothing else in the core `
            + `positions to cover it. That gap will not close from the inside, and looking for it in the `
            + `people you work with is a better use of the knowledge than trying to become less like `
            + `yourself.`,
    ],
    reinforcing: (p) => [
        `Your ${label('life-path', p.self)} and your ${label('expression', p.other)} pull the same `
            + `way. The direction ${p.selfT.brings}; the equipment ${p.otherT.brings}. Two different `
            + `numbers, one push - so what you are aiming at and what you have to aim with agree, and `
            + `most of the friction other people report between purpose and capability is simply absent `
            + `for you.`,
        `Which makes the blind spot the thing worth naming, because a chart that agrees with itself `
            + `has nothing built in to catch it. Neither number supplies ${p.selfT.needs}, and neither `
            + `will raise the question. Where this shows up is in the pattern repeating: the same kind of `
            + `situation, entered the same way, at longer and longer intervals.`,
    ],
    complementary: (p) => [
        `Your ${label('life-path', p.self)} and your ${label('expression', p.other)} cover each `
            + `other. The path ${p.selfT.brings} and needs ${p.selfT.needs}; the equipment ${p.otherT.brings}, `
            + `which is close to the missing half. That is the workable configuration, and it is worth `
            + `knowing you have it, because it does not feel like an advantage from the inside - it feels `
            + `like being pulled in two directions.`,
        `The practical form of that is a working order rather than a compromise. The ${p.self} sets `
            + `what the thing is for; the ${p.other} decides how it is actually done. Reversing them - `
            + `letting the equipment choose the destination because it is the part you are fluent in - is `
            + `the specific way this pairing goes wrong, and it produces a life that runs well and arrives `
            + `somewhere you did not choose.`,
    ],
    crosswise: (p) => [
        `Your ${label('life-path', p.self)} and your ${label('expression', p.other)} genuinely `
            + `disagree, and it is worth understanding rather than resolving. The path ${p.selfT.brings}. `
            + `The equipment ${p.otherT.brings}. Those are not two versions of the same instruction, and `
            + `you will have noticed by now that doing what the path asks in the way that comes naturally `
            + `does not work.`,
        `What this costs is efficiency: you will take longer to do things that people with agreeing `
            + `numbers do quickly, and you will second-guess a method that is not actually wrong. What it `
            + `buys is that you do the ${p.self} work in a way most people on that path cannot, because `
            + `you are not equipped to do it the usual way. That is not a consolation - it is where the `
            + `distinctive part of the life comes from, and it tends to be visible to others long before `
            + `it is visible to you.`,
    ],
};
/* ------------------------------------------------------------------------- *
 * LIFE PATH x SOUL URGE - the direction against the motive. This is the pairing
 * that decides whether a life that looks successful from outside is bearable
 * from inside.
 * ------------------------------------------------------------------------- */
const LIFE_PATH_SOUL_URGE = {
    same: (p) => [
        `Your Life Path and your Soul Urge are the same number, so the direction and the motive are `
            + `not two things here. What the life keeps asking for is also what satisfies you: this ${p.self} `
            + `${p.selfT.brings}, and doing that is its own reason. Very little of your energy goes into `
            + `reconciling what you want with what you are doing, which is a real and uncommon freedom.`,
        `The risk is narrowness rather than conflict. With nothing else in the core asking for a `
            + `different kind of satisfaction, a stretch where the ${p.self} work is unavailable leaves `
            + `you with no second source - and ${p.selfT.needs} was never going to arrive from this `
            + `direction. Worth building somewhere else to stand before you need it.`,
    ],
    reinforcing: (p) => [
        `Your ${label('life-path', p.self)} and your ${label('soul-urge', p.other)} want the same `
            + `kind of thing. The life ${p.selfT.brings}; what satisfies you ${p.otherT.brings}. They are `
            + `not identical, and they point the same way, so the ordinary split between duty and desire `
            + `mostly does not apply to you.`,
        `What follows is that you are unusually hard to redirect - and correspondingly slow to notice `
            + `when a direction has stopped being worth taking. Neither number supplies ${p.selfT.needs}, `
            + `so the correction has to come from outside, and it will only land if you have someone whose `
            + `read you actually accept.`,
    ],
    complementary: (p) => [
        `Your ${label('life-path', p.self)} and your ${label('soul-urge', p.other)} are asking for `
            + `different things, and the difference is productive rather than contradictory. The path `
            + `${p.selfT.brings}. What satisfies you ${p.otherT.brings}. One is where the life goes; the `
            + `other is what makes the going worth it, and the second is the quieter of the two.`,
        `In practice this means the ${p.self} work needs a ${p.other} element in it or it will feel `
            + `hollow while looking, from outside, like it is going well. That is a specific and common `
            + `way to be unhappy in a life nobody would call unsuccessful. It is also fixable without `
            + `changing direction: the requirement is usually smaller than it feels.`,
    ],
    crosswise: (p) => [
        `Your ${label('life-path', p.self)} and your ${label('soul-urge', p.other)} pull against each `
            + `other, and this is the pairing where that matters most. The life ${p.selfT.brings}. What `
            + `privately satisfies you ${p.otherT.brings}. Those do not sit comfortably together, and you `
            + `have probably been treating the second one as a distraction from the first.`,
        `It is not a distraction; it is the other half of the chart, and suppressing it is what turns `
            + `a demanding path into an unrewarding one. The workable arrangement is not balance but `
            + `sequence: the ${p.self} direction is not negotiable, so the ${p.other} satisfaction has to `
            + `be deliberately built into the shape of the week rather than postponed until the path `
            + `relents. It does not relent.`,
    ],
};
/* ------------------------------------------------------------------------- *
 * EXPRESSION x PERSONALITY - what you can do against what people assume you can
 * do. This pairing explains most of the friction between an accurate self-image
 * and other people's expectations.
 * ------------------------------------------------------------------------- */
const EXPRESSION_PERSONALITY = {
    same: (p) => [
        `Your Expression and your Personality are the same number, so what you can do and what you `
            + `look like you can do are the same thing. People meet a ${p.self} and get a ${p.self}. `
            + `There is no gap to manage, no persistent misreading to correct, and the ordinary `
            + `exhaustion of being taken for something you are not is simply not part of your experience.`,
        `The trade is that you get typecast quickly and permanently. The first impression is accurate, `
            + `so nobody revises it, and capability outside the ${p.self} range goes unnoticed for years - `
            + `including, often, by you.`,
    ],
    reinforcing: (p) => [
        `Your ${label('expression', p.self)} and your ${label('personality', p.other)} agree closely. `
            + `The equipment ${p.selfT.brings}; the impression you make ${p.otherT.brings}. People read `
            + `you approximately correctly on first meeting, which is a genuine practical advantage: you `
            + `get handed the work you are actually equipped for.`,
        `The narrowness is the price. Because the outward signal matches the toolkit, nothing prompts `
            + `anyone to look for the rest - and ${p.selfT.needs} is not something either number is going `
            + `to advertise on your behalf. If you want to be used differently you will have to say so `
            + `explicitly; it will not be inferred.`,
    ],
    complementary: (p) => [
        `Your ${label('expression', p.self)} and your ${label('personality', p.other)} do different `
            + `jobs and do them well together. What you are equipped for ${p.selfT.brings}; the way you `
            + `arrive ${p.otherT.brings}. The impression opens a door the capability then justifies, which `
            + `is a more useful arrangement than either would be twice.`,
        `The one caution is not to let the ${p.other} impression write cheques on a scale the ${p.self} `
            + `has to cash alone. This pairing is very good at getting into rooms, and the work still has `
            + `to be done afterwards at the pace the equipment actually runs at.`,
    ],
    crosswise: (p) => [
        `Your ${label('expression', p.self)} and your ${label('personality', p.other)} send different `
            + `signals, and the gap between them is probably the single most tiring thing in this chart. `
            + `What you are equipped for ${p.selfT.brings}. What people meet ${p.otherT.brings}. So you `
            + `are routinely offered the wrong work and routinely overlooked for the right work, and `
            + `neither is anybody's fault.`,
        `The correction is not to change the impression - it is not a performance and it will not `
            + `shift. It is to shorten the distance between meeting you and seeing what you can actually `
            + `do: demonstrate early rather than describe, and accept that the people who know you well `
            + `will always be a small and disproportionately important group.`,
    ],
};
/* ------------------------------------------------------------------------- *
 * SOUL URGE x PERSONALITY - the private motive against the public surface. The
 * pairing that decides how well-known a person is willing to be.
 * ------------------------------------------------------------------------- */
const SOUL_URGE_PERSONALITY = {
    same: (p) => [
        `Your Soul Urge and your Personality are the same number, which means what satisfies you is `
            + `also what you show. A ${p.self} inside, a ${p.self} on the surface: what people meet is `
            + `not a version, and you are spared the specific loneliness of being liked for something you `
            + `are not.`,
        `The exposure is the other side of it. There is no outer layer holding anything back, so `
            + `whatever costs you shows, and it shows early. That is easy company for people who wish you `
            + `well and a straightforward map for people who do not.`,
    ],
    reinforcing: (p) => [
        `Your ${label('soul-urge', p.self)} and your ${label('personality', p.other)} run together. `
            + `What satisfies you ${p.selfT.brings}; what you show ${p.otherT.brings}. The inner and outer `
            + `readings agree well enough that people who like the surface usually turn out to like what `
            + `is underneath it, which is not true for most people.`,
        `Because there is no gap, there is also no filter: ${p.selfT.needs} does not get asked for, `
            + `because nothing in the pairing creates the pause in which it might be. Wanting is the part `
            + `this configuration is worst at declaring.`,
    ],
    complementary: (p) => [
        `Your ${label('soul-urge', p.self)} and your ${label('personality', p.other)} are doing `
            + `different work, and it suits you. Privately ${p.selfT.brings}; outwardly ${p.otherT.brings}. `
            + `The surface is not a disguise - it is a usable front room, and it means you get to choose `
            + `who sees the rest rather than having it read off you.`,
        `Used deliberately this is close to a superpower and it has one failure mode: the front room `
            + `is comfortable enough to live in. If the ${p.self} satisfaction goes unmentioned long `
            + `enough it stops being fed, and the surface keeps working perfectly while something behind `
            + `it goes quiet.`,
    ],
    crosswise: (p) => [
        `Your ${label('soul-urge', p.self)} and your ${label('personality', p.other)} are close to `
            + `opposites, and people who only know you socially do not know you at all. What satisfies `
            + `you ${p.selfT.brings}. What you present ${p.otherT.brings}. The distance between those is `
            + `not something you constructed and it is not dishonesty; it is simply what this chart does.`,
        `What it produces is a reliable and specific misunderstanding: you get invited to the wrong `
            + `things by people who are being kind. The useful response is not more disclosure across the `
            + `board but better selection - a small number of people who get the ${p.self} version, told `
            + `deliberately rather than discovered by accident.`,
    ],
};
const FRAMES = {
    'life-path|expression': LIFE_PATH_EXPRESSION,
    'life-path|soul-urge': LIFE_PATH_SOUL_URGE,
    'expression|personality': EXPRESSION_PERSONALITY,
    'soul-urge|personality': SOUL_URGE_PERSONALITY,
};
/* --------------------------------------------------------------- the overlay */
const INTERACTION_PROVENANCE = {
    kind: 'contextual-derivation',
    settledness: 'conventional',
    basis: 'That the core positions must be read against one another rather than in sequence is the '
        + 'settled practice of the four-position system. WHICH reading a particular pair produces is '
        + 'composed here from each number\'s own authored character and a stated rule about the kind '
        + 'of meeting it is, not quoted from a source that discusses that pair.',
    sources: ['balliett-philosophy-of-numbers-1908#number-characters', 'RESEARCH_NUMEROLOGY#core-positions'],
};
/** The other number, if the chart carries one in that position and it differs. */
const otherNumber = (context, role) => {
    const value = context.coreNumbers?.[role];
    if (typeof value !== 'number' || !Number.isFinite(value))
        return null;
    return String(value);
};
/**
 * The interaction overlays for one number in one position.
 *
 * Returns at most two: a chart has four core positions and this position pairs
 * with at most two of them under the frames above, which is deliberate. Every
 * position against every other would be six paragraphs of pair commentary on
 * one screen, and the pairs left out - Life Path against Personality, and
 * Expression against Soul Urge - are the two a reader asks about least.
 */
export function interactionOverlays(selfRole, self) {
    const selfT = TEMPERAMENT[self];
    if (!selfT)
        return [];
    const partners = Object.keys(FRAMES)
        .map((key) => key.split('|'))
        .filter(([a, b]) => a === selfRole || b === selfRole)
        .map(([a, b]) => (a === selfRole ? { other: b, key: `${a}|${b}` } : { other: a, key: `${a}|${b}` }));
    return partners.map(({ other: otherRole, key }) => ({
        id: `numerology.${selfRole}-${self}.with-${otherRole}`,
        condition: `The chart also carries a ${ROLE_NAME[otherRole]} number.`,
        applies: (context) => {
            const value = otherNumber(context, otherRole);
            return value !== null && TEMPERAMENT[value] !== undefined;
        },
        /* After any karmic-debt overlay, which qualifies how the number was arrived
           at, and before nothing: the pair reading is the last thing said about a
           position because it is the only part that needs both numbers in view. */
        priority: 60,
        effect: 'weave-after-core',
        prose: (context) => {
            const other = otherNumber(context, otherRole);
            if (!other)
                return [];
            const otherT = TEMPERAMENT[other];
            if (!otherT)
                return [];
            const relation = relationBetween(self, other);
            if (!relation)
                return [];
            /*
             * COMPOSED IN THE READER'S LANGUAGE, not translated after the fact.
             *
             * A composed overlay has no fixed string for the overlay translation
             * table to key on, so the alternative to this is that every conditional
             * pair reading falls back to English. The frames therefore exist in both
             * languages and the locale picks one - the same argument, written twice
             * as prose rather than once and rendered.
             */
            const frames = activeLocale() === 'sk' ? SK_FRAMES[key] : FRAMES[key];
            const frame = (frames ?? FRAMES[key])[relation];
            /* The frames are written from the perspective of the FIRST role in the
               key, so a unit on the second role reads its own pair the other way
               round rather than describing itself in the third person. */
            const forward = key.startsWith(`${selfRole}|`);
            return frame(forward
                ? { selfRole, otherRole, self, other, selfT, otherT }
                : { selfRole: otherRole, otherRole: selfRole, self: other, other: self, selfT: otherT, otherT: selfT });
        },
        /* NO SEMANTICS. A pair reading describes what two results do to each other;
           both are already weighted on their own, and adding signal here would count
           the same evidence a third time under a heading nobody voted for. */
        provenance: INTERACTION_PROVENANCE,
    }));
}
/* --------------------------------------------------- master over its root */
/**
 * A master number is not its root with a note on it.
 *
 * The engine reports 11, 22 and 33 unreduced, and the reading for the master
 * number is its own unit. What this adds is the relationship a reader actually
 * asks about: the root is still in there, it is what the number falls back to
 * under load, and the difference between the two is the whole of the
 * difficulty.
 */
/** "an 11", "a 22": the article a number takes when it is spoken. */
const article = (value) => (/^(8|11|18)$/.test(value) ? 'an' : 'a');
/**
 * The master-over-root reading, in English. Paired with skMasterRoot().
 *
 * It describes the master number and the root it carries, and the trap in
 * reading them: no claim about how other people fare with the number, which
 * nothing in numerology measures.
 */
const EN_MASTER_ROOT = (master, root, masterT, rootT) => [
    `The ${root} is still underneath this, and it matters. ${article(master) === 'an' ? 'An' : 'A'} ${master} `
        + `${masterT.brings}; ${article(root)} ${root} ${rootT.brings}. They are the same `
        + `direction at two different scales, and the ${master} is not a better ${root} - it is the `
        + `${root} being asked to work at a size that does not always fit the day it is in.`,
    `Which is why an honest reading of a master number includes the fall-back. Under fatigue, `
        + `pressure or plain ordinary weeks, this operates as ${article(root)} ${root}, and that is not a `
        + `failure of the number - it is the number resting. The trap is treating the ${root} `
        + `stretches as evidence that you were wrong about yourself.`,
];
export function masterRootOverlay(role, master) {
    const root = MASTER_ROOT[master];
    if (!root)
        return null;
    const masterT = TEMPERAMENT[master];
    const rootT = TEMPERAMENT[root];
    if (!masterT || !rootT)
        return null;
    return {
        id: `numerology.${role}-${master}.over-root-${root}`,
        condition: `A master number is read over its root.`,
        applies: () => true,
        priority: 30,
        effect: 'weave-after-core',
        prose: () => (activeLocale() === 'sk'
            ? skMasterRoot(master, root, masterT, rootT)
            : EN_MASTER_ROOT(master, root, masterT, rootT)),
        /* Same reasoning as the pair overlays: the master number's own unit already
           carries the weight, and the root is not separately present in the chart. */
        provenance: {
            kind: 'contextual-derivation',
            settledness: 'conventional',
            basis: 'That a master number carries its root and reduces to it under pressure is conventional '
                + 'across the modern literature; the specific reading is composed from the two numbers\' '
                + 'own authored characters.',
            sources: ['RESEARCH_NUMEROLOGY#master-numbers'],
        },
    };
}
