import { TEMPERAMENT } from '../../knowledge/numerology/numberTemperament.js';
import { capitalise, chainText, joinList, readableTrace } from './numerologyVoice.js';
/**
 * THE ENGLISH VOICE.
 *
 * The semantic reference for the numerology reading. Every sentence about a
 * number is authored for that number - there is no synonym rotation and no
 * generated variety - and every sentence about two numbers is composed from
 * what each of them actually wants, so the same frame reads differently for a
 * 7 against a 1 and a 3 against a 4.
 *
 * Tendencies, not events: "you tend to", "this can show up as". Nothing here
 * says what happened to the reader, compares them with other people, or
 * promises what will happen. Where a tradition reads a number dramatically
 * (a karmic debt), the tradition's reading is attributed to it and the personal
 * claim is stated separately, as a question worth asking.
 */
const NAME = {
    'life-path': 'Life Path',
    birthday: 'birth day',
    'soul-urge': 'Soul Urge',
    expression: 'Expression',
    personality: 'Personality',
    maturity: 'Maturity',
    attitude: 'Attitude',
    balance: 'Balance',
    'hidden-passion': 'Hidden Passion',
};
const TITLE = {
    ...NAME,
    birthday: 'Birth Day',
};
const list = (items) => joinList(items, ' and ');
const article = (value) => (value === 8 || value === 11 || value === 18 ? 'an' : 'a');
/** "your Soul Urge", or what Hidden Passion is, since the name alone says little. */
const where = (position) => (position === 'hidden-passion'
    ? 'the most frequent value in your name'
    : `your ${NAME[position]}`);
const whereList = (positions) => list(positions.map(where));
/* ================================================================== numbers */
const ROOT_BRIEF = {
    2: 'attunement to other people',
    4: 'patient building',
    6: 'care for the people around it',
};
/**
 * The Life Path, each number in its own words. An opener says what the number
 * orients you toward, notices or asks of you - never what your life hands you,
 * which the chart cannot know.
 */
const LIFE_PATH = {
    1: 'Your instinct is to decide for yourself, ahead of agreement, and to carry the result. A Life Path 1 asks you to trust your own judgement enough to act on it.',
    2: 'Your attention goes to what happens between people - the partnership, the negotiation, the team that needs holding together. A Life Path 2 asks you to read what is going on between people and make it work, without giving up your own position to do it.',
    3: 'What you see keeps wanting to be said. A Life Path 3 points you toward putting things into a form other people can take in - words, images, a story, a joke that lands - and toward the less natural half of that, which is finishing what you begin.',
    4: 'You are drawn to the part of the work that has to hold: the foundation, the method, the thing that still works when nobody is watching. A Life Path 4 asks you to build patiently, in the order the work actually requires.',
    5: 'Movement is where you learn best - new places, new people, problems you would rather step into than study first. A Life Path 5 asks for freedom and for the judgement to know which commitments are worth keeping inside it.',
    6: 'You are quick to take responsibility for the people and places around you. A Life Path 6 asks you to do that well - and to learn where your responsibility ends as well as where it begins.',
    7: 'The gap between what is claimed and what is true keeps drawing you back. A Life Path 7 asks you to stay with a question until you know how the thing actually works - and then to come back out and say what you found.',
    8: 'You are oriented toward consequence: resources to organise, decisions that carry weight, results that can be measured. A Life Path 8 asks you to handle what is large without letting it decide who you are.',
    9: 'You tend to see situations whole, and your attention keeps widening - toward people beyond your own circle, and toward knowing when something has run its course. A Life Path 9 asks you to give to something larger than yourself and to let go of your own claim on it.',
    11: 'You often sense where something is going before you can show why. A Life Path 11 asks you to trust that perception while you build the evidence for it.',
    22: 'What draws you is larger than a personal life: structures, institutions, work built for other people to go on using. A Life Path 22 asks you to build at that scale - which is only ever done one ordinary day at a time.',
    33: 'Your sense of responsibility tends to reach past your own circle. A Life Path 33 asks you to practise care steadily, well past the people it is owed to - and to know where it has to stop.',
};
/** What a birth day adds to the direction. A day of the month can be 1-9, 11 or 22. */
const GIFT = {
    1: 'a readiness to act on your own conclusions',
    2: 'a fine sense of what other people need',
    3: 'a gift for putting things into words',
    4: 'practical sense and a feel for how things should be arranged',
    5: 'the knack of becoming useful quickly in unfamiliar situations',
    6: 'an instinct for looking after people',
    7: 'a reflective, investigative streak',
    8: 'practical judgement about resources and people',
    9: 'a broad, humane outlook',
    11: 'quick intuition about people and situations',
    22: 'the ability to see how a large thing would actually be built',
};
/** The Soul Urge, told first. */
const SOUL_URGE = {
    1: 'A decision that is yours is what satisfies you: your Soul Urge is 1. The moment you can act on your own judgement, without waiting for permission, is the moment you feel most like yourself.',
    2: 'Connection that works is what satisfies you - your Soul Urge is 2. A partnership or a team in which each side is actually heard is where you tend to feel settled.',
    3: 'You are fed by expression that lands, which is what a Soul Urge 3 describes: saying or making something and seeing it reach someone. Conversation, delight and a good response are not extras for you; they are the point.',
    4: 'Order that holds is what satisfies you - your Soul Urge is 4. A job done properly, a plan that works and things you can rely on let you rest, and you tend not to rest before that.',
    5: 'Room to move is what satisfies you: your Soul Urge is 5. New experience, variety and the freedom to change course are where you tend to feel most alive.',
    6: 'Being able to help is what satisfies you - your Soul Urge is 6. When the people you care for are all right, partly because of you, you can rest.',
    7: 'Understanding is what satisfies you: your Soul Urge is 7. Time and quiet to get to the bottom of something, and a question answered properly rather than approximately, are their own reward.',
    8: 'What satisfies you is consequence - your Soul Urge is 8. Results that count and stakes real enough to matter are where you tend to feel most alive.',
    9: 'You are fed by meaning beyond yourself, which is what a Soul Urge 9 describes: work or care that serves more than your own interest. What you do feels worth it when it reaches past your own circle.',
    11: 'Insight is what satisfies you: your Soul Urge is 11. The moment something you sensed turns out to be true, and you find a way to put it so others can use it, is the one you are after.',
    22: 'Building something that will outlast you is what satisfies you - your Soul Urge is 22: a structure other people will keep using long after the work is done.',
    33: 'Care given as a practice, not only in an emergency, is what satisfies you: your Soul Urge is 33, and being steadily useful to the people within your reach is its reward.',
};
/** The Soul Urge, when an earlier section already told its number. */
const SOUL_URGE_SHORT = {
    1: 'a decision that is yours', 2: 'connection that works', 3: 'expression that lands',
    4: 'order that holds', 5: 'room to move', 6: 'being able to help',
    7: 'understanding, and the time and quiet to reach it', 8: 'consequence - results that count',
    9: 'meaning beyond yourself', 11: 'insight you can share', 22: 'building what outlasts you',
    33: 'care given as a practice',
};
const EXPRESSION = {
    1: 'Your Expression is 1: the equipment of someone who can decide with incomplete information, start before there is agreement and carry the result.',
    2: 'Your Expression is 2, which equips you for cooperation: tact, patience and an eye for the detail that keeps people working together.',
    3: 'Your Expression is 3. You are equipped to communicate - to find the version of a thing that other people can take in.',
    4: 'Your Expression is 4, the equipment of method: planning, organising and seeing work through to the end.',
    5: 'Your Expression is 5, which equips you to adapt: to learn fast, to handle change and to work with people of every kind.',
    6: 'Your Expression is 6, the equipment of care: noticing what a person or a group needs and making the situation work for them.',
    7: 'Your Expression is 7. You are equipped for analysis - for going underneath the first answer and staying with a problem until it gives way.',
    8: 'Your Expression is 8, the equipment of organisation and authority: handling resources, scale and consequence.',
    9: 'Your Expression is 9, which equips you with overview: seeing the whole of a situation and working for something wider than yourself.',
    11: 'Your Expression is 11. You are equipped to register what has not been said and to put it into a form other people can use.',
    22: 'Your Expression is 22, the equipment of building at scale: holding a large design together with the practical steps that would deliver it.',
    33: 'Your Expression is 33. You are equipped to support people steadily, as a practice rather than only in a crisis.',
};
const EXPRESSION_SHORT = {
    1: 'moving first and carrying the decision', 2: 'cooperation and tact', 3: 'communication',
    4: 'method and follow-through', 5: 'adaptation', 6: 'care that makes a situation work',
    7: 'analysis', 8: 'organisation and authority', 9: 'overview',
    11: 'registering what has not been said', 22: 'building at scale', 33: 'steady support',
};
/**
 * The Personality: what tends to show first. It describes the quality of the
 * surface, never how particular people react to it.
 */
const PERSONALITY = {
    1: 'What tends to show first is someone direct and self-possessed, who looks as though the decision has already been made. That is a Personality 1.',
    2: 'What tends to show first is someone approachable and tactful, who listens before speaking. That is a Personality 2.',
    3: 'Your Personality is 3, and it tends to read as lively and easy to talk to.',
    4: 'Your Personality is 4, and it tends to read as steady and dependable - someone who will do what they said.',
    5: 'What tends to show first is someone quick and curious, who brings movement into a room. That is a Personality 5.',
    6: 'What tends to show first is warmth and a readiness to take responsibility. That is a Personality 6.',
    7: 'What tends to show first is someone reserved and observant, who watches before speaking. That is a Personality 7.',
    8: 'Your Personality is 8, and it tends to read as capable and composed - someone who looks able to handle it.',
    9: 'What tends to show first is someone open and broad-minded, who seems to take everyone in. That is a Personality 9.',
    11: 'What tends to show first is close attention: a sense of listening properly, and of noticing more than is being said. That is a Personality 11. The attention carries real intensity, and that intensity is the number at work rather than a flaw in the surface.',
    22: 'What tends to show first is someone grounded and purposeful, who looks as though they are building something. That is a Personality 22.',
    33: 'What tends to show first is a warmth with a long reach. That is a Personality 33.',
};
const PERSONALITY_SHORT = {
    1: 'someone direct and self-possessed', 2: 'someone approachable and tactful',
    3: 'someone lively and easy to talk to', 4: 'someone steady and dependable',
    5: 'someone quick and curious', 6: 'someone warm and responsible',
    7: 'someone reserved and observant', 8: 'someone capable and composed',
    9: 'someone open and broad-minded, who seems to take everyone in',
    11: 'close attention', 22: 'someone grounded and purposeful', 33: 'a far-reaching warmth',
};
/** What shows first in a Personality, as "the N's ...". */
const PERSONALITY_DRAW = {
    1: 'self-possession', 2: 'tact', 3: 'ease', 4: 'reliability', 5: 'curiosity', 6: 'warmth',
    7: 'reserve', 8: 'composure', 9: 'openness', 11: 'attention', 22: 'sense of purpose', 33: 'warmth',
};
/** What an Expression does once the work starts; the number is the subject. */
const EXPRESSION_DOES = {
    1: 'makes the call', 2: 'keeps people working together', 3: 'finds the words',
    4: 'builds the method', 5: 'adapts to what the room turns out to need',
    6: 'makes the situation work for the people in it', 7: 'works out how the thing actually works',
    8: 'takes charge of the result', 9: 'keeps the whole in view', 11: 'names what nobody has said',
    22: 'turns the idea into a structure', 33: 'keeps looking after the people in it',
};
/** When a Soul Urge under a different surface tends to come forward. */
const SOUL_URGE_WHEN = {
    1: 'when a decision is yours to make',
    2: 'when something between people needs holding together',
    3: 'when there is something worth saying',
    4: 'when the standard of the work is at stake',
    5: 'when things start to set too firmly',
    6: 'when someone near you needs looking after',
    7: 'when a question will not let you go',
    8: 'when something real is at stake',
    9: 'when the work reaches past your own circle',
    11: 'when something you sensed turns out to be true',
    22: 'when there is something lasting to build',
    33: 'when someone within reach needs steady care',
};
/**
 * A chapter number shared with a core position is read through the position
 * it meets first in this order: the direction, the motive, the equipment, the
 * surface, the birth-day gift, the later direction.
 */
const SHARE_ORDER = ['life-path', 'soul-urge', 'expression', 'personality', 'birthday', 'maturity'];
const leadShare = (positions) => [...positions].sort((a, b) => SHARE_ORDER.indexOf(a) - SHARE_ORDER.indexOf(b))[0];
const PINNACLE_SHARE = {
    'life-path': 'so these years run in the direction your Life Path already sets',
    'soul-urge': 'so these years feed what already satisfies you',
    expression: 'so these years call on what you are already equipped to do',
    personality: 'so these years amplify what already shows first',
    birthday: 'so these years draw on the gift of your birth day',
    maturity: 'so these years give an early taste of where your numbers point later',
};
const CHALLENGE_SHARE = {
    'life-path': 'so the pressure lands on your own direction',
    'soul-urge': 'so the pressure lands on what you want most',
    expression: 'so the pressure lands on what you are best equipped to do',
    personality: 'so the pressure lands on the side of you that shows first',
    birthday: 'so the pressure lands on the gift of your birth day',
    maturity: 'so the pressure lands on the direction your later years take',
};
/** What a Maturity deepens when it repeats a number told earlier. */
const MATURITY_TOLD = {
    'life-path': 'later life deepens the direction you already have rather than adding a new one',
    'soul-urge': 'later life deepens a motive you already have rather than adding a new one',
    expression: 'later life deepens a capacity you already use rather than adding a new one',
    personality: 'later life deepens the side of you that shows first rather than adding a new one',
    birthday: 'later life deepens the gift of your birth day rather than adding a new one',
};
/** How a number told earlier continues when the Expression carries it too. */
const EXPRESSION_TAIL = {
    'life-path': ', so your direction and your equipment share one theme',
    'soul-urge': ', and doing it is also what satisfies you',
    birthday: ', the gift your birth day adds, now as your main equipment',
};
/** How a number told earlier continues when the Personality carries it too. */
const PERSONALITY_TAIL = {
    'life-path': ', so the direction is visible before anything else',
    'soul-urge': ', so what you show is what you want',
    expression: ', so the surface matches what you can do',
};
/** What a number does without being decided on, for the chart's heaviest number. */
const BY_DEFAULT = {
    1: 'moving first, whether or not anyone follows', 2: 'tuning in to the people around you',
    3: 'putting what you notice into words', 4: 'organising whatever is in front of you',
    5: 'looking for the next opening', 6: 'taking care of whoever is nearby',
    7: 'checking what everyone else has accepted', 8: 'taking charge of what matters',
    9: 'stepping back to see the whole picture',
};
/** What each number wants, for the tension. */
const STANCE = {
    1: 'wants to act first', 2: 'wants agreement before it moves', 3: 'wants to say it and see it land',
    4: 'wants a method and a finished job', 5: 'wants room to change course', 6: 'wants everyone looked after',
    7: 'wants to understand before it acts', 8: 'wants results that count', 9: 'wants the whole picture',
    11: 'senses before it can explain', 22: 'wants to build beyond the personal', 33: 'wants to care for everyone within reach',
};
/** What each number brings to the numbers it pulls against. */
const CONTRIBUTION = {
    1: 'momentum', 2: 'tact', 3: 'reach', 4: 'durability', 5: 'flexibility', 6: 'care',
    7: 'accuracy', 8: 'weight', 9: 'perspective', 11: 'foresight', 22: 'scale', 33: 'generosity',
};
/** Overuse, completing "Overused, the N ...". */
const OVERUSE = {
    1: 'carries everything alone and hears advice as interference',
    2: 'keeps the peace at the expense of your own position',
    3: 'scatters into many things begun and few finished, and says less than it means',
    4: 'holds on to the method after it has stopped helping',
    5: 'leaves before anything has had time to take root',
    6: 'takes on more than is yours to carry, and resents it later',
    7: 'turns its scrutiny on you and withdraws where contact was needed',
    8: 'measures you by results alone',
    9: 'spreads so wide that the people closest to you get the least of you',
    11: 'runs on nerves, taking in more than it can process',
    22: 'takes on a scale that leaves no room for an ordinary day',
    33: 'gives past the point of tiredness and calls it normal',
};
/** What an absent number leaves to be built. */
const ABSENT = {
    1: 'asserting yourself', 2: 'patience with other people\'s pace', 3: 'saying what you feel',
    4: 'order and routine', 5: 'adapting to change', 6: 'taking on responsibility for others',
    7: 'time alone to reflect', 8: 'handling money and authority', 9: 'tolerance and the wider view',
};
/** The Balance number: what you fall back on under strain. Balance reduces masters, so 1-9. */
const BALANCE = {
    1: 'going it alone, which helps when a situation needs one clear decision and not when it needs support',
    2: 'talking it through with someone you trust',
    3: 'lightening the mood, which eases the tension without always resolving it',
    4: 'a plan and a list',
    5: 'a change of scene',
    6: 'looking after someone else',
    7: 'withdrawing to think it through',
    8: 'taking charge',
    9: 'stepping back to see the whole',
};
const MATURITY = {
    1: 'standing on your own judgement', 2: 'cooperation and a finer sense of other people',
    3: 'expression - saying more of what you see', 4: 'building something that lasts',
    5: 'freedom and range, a wider life with more movement in it', 6: 'responsibility and care, given by choice',
    7: 'depth - study, reflection and an inner life', 8: 'authority and results at a larger scale',
    9: 'breadth - work and care directed at something larger than yourself',
    11: 'insight - perception you trust and share', 22: 'building at a large scale', 33: 'care as a practice',
};
const PINNACLE = {
    1: 'independence and beginnings', 2: 'partnership, patience and cooperation',
    3: 'expression, creativity and friendship', 4: 'work, structure and foundations',
    5: 'change, movement and freedom', 6: 'responsibility, home and care',
    7: 'study, reflection and inner development', 8: 'achievement, authority and material results',
    9: 'completion, wider service and letting go',
    11: 'insight and inspiration, and the nervous load that comes with them',
    22: 'building at a large scale', 33: 'care and service beyond your own circle',
};
/** Challenges are 0-8 under the contract; 0 is read separately. */
const CHALLENGE = {
    1: 'standing behind your own position without either shrinking or overcorrecting',
    2: 'working with other people\'s pace and difference without losing your own read',
    3: 'saying what you mean, and being seen while you say it',
    4: 'doing the work in the order it has to be done',
    5: 'choosing what you are willing to be tied to',
    6: 'deciding what you will and will not carry for other people',
    7: 'acting on incomplete information, and trusting beyond what can be proved',
    8: 'handling money, authority and results without being defined by them',
};
const DEBT_TRADITION = {
    13: 'The tradition associates 13 with effort once avoided, repaid through patient, sustained work.',
    14: 'The tradition associates 14 with freedom once misused, repaid through moderation and commitment.',
    16: 'The tradition associates 16 with a structure built on pride or on a flattering picture, which has to be rebuilt on what is actually true.',
    19: 'The tradition associates 19 with independence that hardened into self-sufficiency, repaid by learning to accept help as well as give it.',
};
const DEBT_TENDENCY = {
    13: 'points to finishing what you start, including the unexciting middle of it',
    14: 'points to choosing an anchor for yourself, so that change stays a choice rather than a compulsion',
    16: 'points to one question worth asking now and then: does what you are building rest on what is true, or on a story about yourself you have not tested?',
    19: 'points to letting help in without treating it as a loss of independence',
};
const RELATION_WORD = {
    same: 'the same number',
    reinforcing: 'different numbers pushing the same way',
    complementary: 'different numbers that supply what the other lacks',
    crosswise: 'numbers that differ in pace or in where they work',
};
/* ================================================================ sentences */
function masterLine(value, root, position) {
    return `The ${value} is a master number and stays whole in ${where(position)}: the ${root}'s ${ROOT_BRIEF[root]}, asked to work at a larger scale. That brings more range and more load, and on ordinary days it tends to run as a plain ${root} - which is the number resting, not falling short.`;
}
/** The other positions that carry a root, naming a master form where it sits. */
function echoPlaces(echo) {
    return list(echo.positions.map((position, index) => {
        const value = echo.values[index];
        return value !== echo.root ? `${where(position)} (as ${value}, its master form)` : where(position);
    }));
}
function echoLine(echo, owner) {
    if (!echo.dominant)
        return `The ${echo.root} is also ${echoPlaces(echo)}.`;
    return `The ${echo.root} is not only ${where(owner)}: it is also ${echoPlaces(echo)}, which gives it more weight in your chart than any other number. It describes what you do without deciding to - ${BY_DEFAULT[echo.root]} - and that comes easily and is hard to switch off.`;
}
function debtLine(debt) {
    const tendency = DEBT_TENDENCY[debt.value];
    return `The route into ${where(debt.position)} passes through ${debt.value}, one of the four totals the modern Western tradition reads as karmic debt. ${DEBT_TRADITION[debt.value]} Read as a tendency rather than a verdict, it ${tendency}${/[?.]$/.test(tendency) ? '' : '.'}`;
}
function birthdayLine(ref, relation) {
    const gift = GIFT[ref.value] ?? GIFT[ref.root];
    switch (relation) {
        case 'same': return `Your birth day carries the same ${ref.value}, so the direction comes with its own gift built in: ${gift}.`;
        case 'reinforcing': return `Your birth day adds ${article(ref.value)} ${ref.value} - ${gift} - and it pushes the same way as the path.`;
        case 'complementary': return `Your birth day adds ${article(ref.value)} ${ref.value}: ${gift}, which gives the path something it does not supply on its own.`;
        default: return `Your birth day adds ${article(ref.value)} ${ref.value}: ${gift}. It pulls a different way from the path, and both need room.`;
    }
}
function groupText(group) {
    const names = list(group.positions.map((position) => NAME[position]));
    return `the ${group.value} ${group.positions.length === 1 ? 'of' : 'in'} your ${names}`;
}
/**
 * What separates the anchor from the groups against it, one clause per axis:
 * groups that differ in the same way share a clause, and a second axis gets a
 * short clause of its own rather than naming the anchor twice.
 */
function axisSentence(anchor, sides) {
    const a = anchor.value;
    const slow = TEMPERAMENT[String(a)]?.tempo === 'slow';
    const inward = TEMPERAMENT[String(a)]?.facing === 'inward';
    const axes = [...new Set(sides.map((side) => side.axis))];
    const on = (axis) => sides.filter((side) => side.axis === axis);
    const them = (axis) => list(on(axis).map((side) => `the ${side.group.value}`));
    const plural = (axis) => on(axis).length > 1;
    const primary = (axis) => {
        if (axis === 'tempo') {
            return slow
                ? `the ${a} would rather be right than early, and ${them(axis)} would rather be early than perfect`
                : `the ${a} would rather be early than perfect, and ${them(axis)} would rather be right than early`;
        }
        if (axis === 'facing') {
            return inward
                ? `the ${a} does its work out of sight, and ${them(axis)} ${plural(axis) ? 'want' : 'wants'} the work to be seen`
                : `the ${a} works where it can be seen, and ${them(axis)} ${plural(axis) ? 'keep' : 'keeps'} the work private`;
        }
        return slow
            ? `the ${a} works slowly and out of sight, and ${them(axis)} quickly and in the open`
            : `the ${a} works quickly and in the open, and ${them(axis)} slowly and out of sight`;
    };
    const secondary = (axis) => {
        const verb = (one, many) => (plural(axis) ? many : one);
        if (axis === 'tempo')
            return slow ? `${them(axis)} ${verb('moves', 'move')} faster still` : `${them(axis)} ${verb('moves', 'move')} more slowly`;
        if (axis === 'facing') {
            return inward
                ? `${them(axis)} ${verb('wants', 'want')} the result where people can see it`
                : `${them(axis)} ${verb('keeps', 'keep')} the result out of sight`;
        }
        return slow
            ? `${them(axis)} ${verb('moves', 'move')} faster and in the open`
            : `${them(axis)} ${verb('moves', 'move')} more slowly and out of sight`;
    };
    const [first, second] = axes;
    return `${capitalise(primary(first))}${second ? `, while ${secondary(second)}` : ''}.`;
}
/** What the pull costs, in the terms of the two numbers and what separates them. */
function pairCost(anchor, other, axis) {
    const slowFirst = TEMPERAMENT[String(anchor)]?.tempo === 'slow';
    const inwardFirst = TEMPERAMENT[String(anchor)]?.facing === 'inward';
    const [slow, fast] = slowFirst ? [anchor, other] : [other, anchor];
    const [inward, outward] = inwardFirst ? [anchor, other] : [other, anchor];
    if (axis === 'tempo') {
        return `Between them, waiting for the ${slow} to be sure costs time, and following the ${fast} too early costs accuracy.`;
    }
    if (axis === 'facing') {
        return `Between them, the ${inward} can hold back what the ${outward} needs to show, and the ${outward} can show what the ${inward} has not finished.`;
    }
    return `Between them, the ${slow} can hold back what the ${fast} is ready to act on, and the ${fast} can act before the ${slow} has finished.`;
}
const ORDINAL = ['first', 'second', 'third', 'fourth'];
/* ============================================================ the sections */
export const EN_VOICE = {
    direction: (plan) => {
        const lp = plan.lifePath;
        const first = [LIFE_PATH[lp.value]];
        if (lp.master)
            first.push(masterLine(lp.value, lp.root, 'life-path'));
        const paragraphs = [first.join(' ')];
        const second = [];
        if (plan.birthday) {
            second.push(birthdayLine(plan.birthday.ref, plan.birthday.relation));
            if (plan.birthday.ref.master && !lp.master)
                second.push(masterLine(plan.birthday.ref.value, plan.birthday.ref.root, 'birthday'));
        }
        if (plan.echo) {
            const owner = plan.echo.root === lp.root ? 'life-path' : 'birthday';
            second.push(echoLine(plan.echo, owner));
        }
        if (second.length > 0)
            paragraphs.push(second.join(' '));
        for (const debt of plan.debts)
            paragraphs.push(debtLine(debt));
        return paragraphs;
    },
    drive: (plan) => {
        const su = plan.soulUrge;
        const first = [];
        if (plan.toldBy) {
            first.push(`Your Soul Urge is the same ${su.value} as ${where(plan.toldBy)}, so what satisfies you is ${SOUL_URGE_SHORT[su.value]}.`);
        }
        else {
            first.push(SOUL_URGE[su.value]);
            if (su.master)
                first.push(masterLine(su.value, su.root, 'soul-urge'));
        }
        const lp = plan.lifePath.value;
        switch (plan.withDirection) {
            case 'same':
                if (!plan.toldBy)
                    first.push('It is the same number as your Life Path, so what satisfies you and the direction your Life Path sets are one thing, and doing the work is its own reward.');
                break;
            case 'reinforcing':
                first.push(`It pushes the same way as your Life Path ${lp}: what you want and the direction it sets agree.`);
                break;
            case 'complementary':
                first.push(`It is a different satisfaction from the one your Life Path ${lp} supplies, and that is useful: the ${su.value} is what makes the ${lp} direction feel worth it.`);
                break;
            case 'crosswise':
                first.push(`It does not come from the same place as your Life Path ${lp}, and the two need deliberate room in the same week.`);
                break;
            default:
                break;
        }
        /* A one-line echo stays with the motive it echoes; only the dominant
           number's longer telling takes a paragraph of its own. */
        if (plan.echo && !plan.echo.dominant)
            first.push(echoLine(plan.echo, 'soul-urge'));
        if (plan.passionAgrees && !(plan.echo?.positions.includes('hidden-passion'))) {
            first.push(`The most frequent value in your name is also ${su.root}, which reinforces this motive.`);
        }
        const paragraphs = [first.join(' ')];
        if (plan.echo?.dominant)
            paragraphs.push(echoLine(plan.echo, 'soul-urge'));
        for (const debt of plan.debts)
            paragraphs.push(debtLine(debt));
        return paragraphs;
    },
    presence: (plan) => {
        const exp = plan.expression;
        const pers = plan.personality;
        const first = [];
        if (plan.expressionToldBy) {
            first.push(`Your Expression is the same ${exp.value} as ${where(plan.expressionToldBy)}: you are equipped for ${EXPRESSION_SHORT[exp.value]}${EXPRESSION_TAIL[plan.expressionToldBy] ?? ''}.`);
        }
        else {
            first.push(EXPRESSION[exp.value]);
            if (exp.master)
                first.push(masterLine(exp.value, exp.root, 'expression'));
        }
        if (plan.expressionEcho)
            first.push(echoLine(plan.expressionEcho, 'expression'));
        const second = [];
        if (plan.personalityToldBy) {
            second.push(`What tends to show first is the same ${pers.value} as ${where(plan.personalityToldBy)}: ${PERSONALITY_SHORT[pers.value]}${PERSONALITY_TAIL[plan.personalityToldBy] ?? ''}.`);
        }
        else {
            second.push(PERSONALITY[pers.value]);
            if (pers.master)
                second.push(masterLine(pers.value, pers.root, 'personality'));
        }
        if (plan.personalityEcho)
            second.push(echoLine(plan.personalityEcho, 'personality'));
        if (plan.attitudeAgrees)
            second.push(`Your Attitude, the first reaction you show, carries the same ${pers.root}, so the first impression is consistent.`);
        /* The surface against the equipment and against the motive: what tends to
           show first, and what comes forward once there is work or something at
           stake - never what other people offer, assign or conclude. */
        const third = [];
        switch (plan.withEachOther) {
            case 'same':
                third.push('The surface and the equipment are the same number, so what shows first is what you can actually do - and a capability outside that range can stay in the background, sometimes even for you.');
                break;
            case 'reinforcing':
                third.push(`The ${pers.value} and the ${exp.value} you work with agree, so the first impression is a fair guide to how you actually work.`);
                break;
            case 'complementary':
                third.push(`The ${pers.value}'s ${PERSONALITY_DRAW[pers.value]} is the first layer; the ${exp.value} ${EXPRESSION_DOES[exp.value]} once the work starts.`);
                break;
            case 'crosswise':
                third.push(`The ${pers.value} and the ${exp.value} you work with point different ways, so a first impression can say little about how you actually work; the ${exp.value} tends to show only once the work is under way.`);
                break;
            default:
                break;
        }
        const su = plan.soulUrge;
        if (su && su.value !== pers.value) {
            switch (plan.innerOuter) {
                case 'reinforcing':
                    third.push(`What you show and what you want point the same way: the ${pers.value} on the surface is a fair preview of the ${su.value} underneath.`);
                    break;
                case 'complementary':
                    third.push(`Underneath the ${pers.value} sits the ${su.value}, which tends to come forward ${SOUL_URGE_WHEN[su.value]}.`);
                    break;
                case 'crosswise':
                    third.push(`The surface and the motive are far apart: the ${pers.value} on the surface gives little away about the ${su.value} underneath, which tends to stay out of view until you choose to show it.`);
                    break;
                default:
                    break;
            }
        }
        else if (su && plan.innerOuter === 'same') {
            third.push('What shows first is also what satisfies you, so there is little distance between the surface and the motive.');
        }
        const paragraphs = [first.join(' '), second.join(' '), third.join(' ')];
        for (const debt of plan.debts)
            paragraphs.push(debtLine(debt));
        return paragraphs.filter(Boolean);
    },
    pullStandfirst: 'Where parts of your chart want different things - read as tendencies, not verdicts.',
    pull: (plan) => {
        if (plan.kind === 'split') {
            const anchor = plan.anchor;
            const sides = plan.against;
            const first = [];
            const others = sides.map((side) => groupText(side.group));
            first.push(sides.length === 1
                ? `The clearest pull in your chart runs between ${groupText(anchor)} and ${others[0]}.`
                : `The clearest pull in your chart runs between ${groupText(anchor)} on one side and, on the other, ${others.join(', and ')}.`);
            const wants = sides.map((side) => `the ${side.group.value} ${STANCE[side.group.value]}`);
            first.push(`${capitalise(`the ${anchor.value} ${STANCE[anchor.value]}`)}; ${list(wants)}.`);
            if (plan.more.length > 0) {
                const extra = plan.more.map((group) => `your ${list(group.positions.map((position) => NAME[position]))} ${group.value}`);
                first.push(`${capitalise(list(extra))} ${plan.more.length === 1 && plan.more[0].positions.length === 1 ? 'leans' : 'lean'} the same way as ${sides.length === 1 ? `the ${sides[0].group.value}` : 'they do'}.`);
            }
            const second = [
                axisSentence(anchor, sides),
                `Used well, the ${anchor.value} brings ${CONTRIBUTION[anchor.value]} to ${list(sides.map((side) => `the ${CONTRIBUTION[side.group.value]} of the ${side.group.value}`))}.`,
            ];
            return [first.join(' '), second.join(' ')];
        }
        if (plan.kind === 'gap') {
            const { left, right } = plan;
            return [
                `Nothing in your chart pulls hard against the rest. The clearest difference runs between ${groupText(left)} and ${groupText(right)}: the ${left.value} ${STANCE[left.value]}, while the ${right.value} ${STANCE[right.value]}.`,
                `It is a difference of emphasis rather than a conflict, and each supplies what the other lacks - the ${left.value} brings ${CONTRIBUTION[left.value]}, the ${right.value} brings ${CONTRIBUTION[right.value]}.`,
            ];
        }
        const roots = plan.roots.map((root) => `the ${root}`);
        return [
            `Very little in your chart pulls against the rest. ${capitalise(list(roots))} set${roots.length === 1 ? 's' : ''} the tone and the other numbers lean the same way, so the direction is clear and the effort goes a long way.`,
            'What that agreement cannot do is question itself: a direction that is wrong can run a long way before anything inside you objects, which is why an outside view you trust is worth more to you than more of your own.',
        ];
    },
    cost: (plan) => {
        const paragraphs = [];
        const [a, b] = plan.overuse;
        if (a !== undefined) {
            const first = [`Overused, the ${a} ${OVERUSE[a]}${b !== undefined ? `, and the ${b} ${OVERUSE[b]}` : ''}.`];
            if (plan.pair)
                first.push(pairCost(plan.pair.anchor, plan.pair.other, plan.pair.axis));
            paragraphs.push(first.join(' '));
        }
        const second = [];
        if (plan.absent.length === 1) {
            const [n] = plan.absent;
            second.push(`Nothing in your chart carries ${article(n)} ${n} - not your name and not any position - so ${ABSENT[n]} is something you build on purpose rather than something that arrives by itself.`);
        }
        else if (plan.absent.length === 2) {
            const [n, m] = plan.absent;
            second.push(`Nothing in your chart carries ${article(n)} ${n} or ${article(m)} ${m} - not your name and not any position - so ${ABSENT[n]} and ${ABSENT[m]} are things you build on purpose rather than things that arrive by themselves.`);
        }
        if (plan.balance !== null && BALANCE[plan.balance]) {
            second.push(`Under strain you tend to fall back on ${BALANCE[plan.balance]}; that is what your Balance number, ${plan.balance}, describes.`);
        }
        if (second.length > 0)
            paragraphs.push(second.join(' '));
        return paragraphs;
    },
    growth: (plan, pull) => {
        const m = plan.maturity;
        const lp = plan.lifePath.value;
        const sentences = [`With time, your numbers point toward ${MATURITY[m.value]}: your Maturity is ${m.value}.`];
        if (m.master && plan.toldBy) {
            sentences.push(`The ${m.value} is a master number and stays whole here: the ${m.root} that is already ${where(plan.toldBy)}, asked to work at a larger scale - more range, and more load.`);
        }
        else if (m.master) {
            sentences.push(masterLine(m.value, m.root, 'maturity'));
        }
        if (plan.toldBy && m.master) {
            /* Said in the master sentence above. */
        }
        else if (plan.toldBy) {
            sentences.push(`It is the same ${m.value} as ${where(plan.toldBy)}, so ${MATURITY_TOLD[plan.toldBy] ?? 'later life deepens a number you already have rather than adding a new one'}.`);
        }
        else if (plan.sharedWith.length === 0) {
            sentences.push(`None of your other core numbers is ${article(m.value)} ${m.value}, so later life adds a direction rather than deepening one you already carry.`);
        }
        if (plan.inPull && pull.kind === 'split') {
            const opposite = pull.anchor.positions.includes('maturity')
                ? list(pull.against.map((side) => `the ${side.group.value}`))
                : groupText(pull.anchor);
            sentences.push(`In the pull described above the ${m.value} stands against ${opposite}, and with time it gains ground.`);
        }
        else {
            switch (plan.withDirection) {
                case 'reinforcing':
                    sentences.push(`It pushes the same way as your Life Path ${lp}.`);
                    break;
                case 'complementary':
                    sentences.push(`It adds something to your Life Path ${lp} rather than repeating it.`);
                    break;
                case 'crosswise':
                    sentences.push(`It turns away from your Life Path ${lp}, so later life asks for something your direction did not.`);
                    break;
                default: break;
            }
        }
        return [sentences.join(' ')];
    },
    chapterStandfirst: 'A stretch of years read as structure, not as a forecast.',
    chapter: (plan) => {
        const c = plan.chapter;
        const first = [];
        if (c.index === 0)
            first.push(`You are in the first of your four life chapters, which runs from birth to ${c.endAge}.`);
        else if (c.index === 3)
            first.push(`You are in the fourth and last of your life chapters, which began at ${c.startAge} and runs for the rest of your life.`);
        else
            first.push(`You are in the ${ORDINAL[c.index]} of your four life chapters, from ${c.startAge} to ${c.endAge}.`);
        first.push(`Its Pinnacle is ${c.pinnacle}: these years are organised around ${PINNACLE[c.pinnacle]}.`);
        if (c.pinnacleMaster) {
            first.push(`The ${c.pinnacle} is a master number here: the ${c.pinnacleRoot}'s ${ROOT_BRIEF[c.pinnacleRoot]} at a larger scale, with more range and more load.`);
        }
        if (plan.pinnacleShares.length > 0) {
            first.push(`The ${c.pinnacleRoot === c.pinnacle ? c.pinnacle : c.pinnacleRoot} is also ${whereList(plan.pinnacleShares)}, ${PINNACLE_SHARE[leadShare(plan.pinnacleShares)]}.`);
        }
        else {
            switch (plan.pinnacleWithDirection) {
                case 'reinforcing':
                    first.push(`It pushes the same way as your Life Path ${plan.lifePath.value}.`);
                    break;
                case 'complementary':
                    first.push('It gives your direction something it does not supply by itself.');
                    break;
                case 'crosswise':
                    first.push(`It asks for a way of working that your Life Path ${plan.lifePath.value} does not supply by default.`);
                    break;
                default: break;
            }
        }
        const second = [];
        if (c.challenge === 0) {
            second.push('Its Challenge is 0. That is not an absence of difficulty: no single pressure dominates these years, so the chapter does not point you at one thing to work on, and choosing a focus deliberately becomes the work.');
        }
        else {
            second.push(`Its Challenge is ${c.challenge}: the pressure inside these years is ${CHALLENGE[c.challenge]}.`);
            if (plan.challengeShares.length > 0) {
                second.push(`The ${c.challenge} is also ${whereList(plan.challengeShares)}, ${CHALLENGE_SHARE[leadShare(plan.challengeShares)]}.`);
            }
            else {
                switch (plan.challengeWithDirection) {
                    case 'reinforcing':
                        second.push(`It pushes the same way as your Life Path ${plan.lifePath.value}, so the pressure of these years works along your direction rather than across it.`);
                        break;
                    case 'complementary':
                        second.push(`It asks for something your Life Path ${plan.lifePath.value} does not supply by itself, which is why these years can feel like learning a second language.`);
                        break;
                    case 'crosswise':
                        second.push(`It presses where your Life Path ${plan.lifePath.value} is least at home, which is what makes it the work of this chapter.`);
                        break;
                    default: break;
                }
            }
        }
        return [first.join(' '), second.join(' ')];
    },
    evidence: {
        standfirst: 'The numbers behind each part of the reading, and how each was reached.',
        section: (section, model, plan) => EVIDENCE[section](model, plan),
    },
    reference: {
        chapterTiming: (model) => {
            const [c1, c2, c3, c4] = model.chapters;
            if (!c1 || !c4)
                return '';
            const digit = model.positions['life-path']?.root ?? 0;
            const lp = model.positions['life-path']?.value ?? digit;
            return `Your four chapters run from birth to ${c1.endAge}, from ${c2.startAge} to ${c2.endAge}, from ${c3.startAge} to ${c3.endAge}, and from ${c4.startAge} for the rest of your life. The first ends at 36 minus ${lp === digit ? `your Life Path, ${digit}` : `the single digit of your Life Path - ${lp} counts as ${digit} here`}, which is why it is the longest; the middle two last nine years each.`;
        },
        positionTitle: (position, value, compound) => (position === 'life-path' && compound !== null
            ? `${TITLE[position]} ${compound}/${value}`
            : `${TITLE[position]} ${value}`),
        debtTitle: (value, positions) => `Karmic Debt ${value} · ${list(positions.map((position) => TITLE[position]))}`,
        positionsStandfirst: 'Each number on its own, in the position that produced it - the fuller reading the main text draws on.',
        chaptersStandfirst: 'The four stretches of life the Pinnacles and Challenges describe, each read as structure rather than as a forecast.',
        cyclesStandfirst: 'The Personal Year, Month and Day of today\'s date. The Forecast reads them day by day; they are here for reference.',
    },
};
/* ================================================================= evidence */
const TRACE_LABELS = {
    birthMonth: 'month', birthDay: 'day', birthYear: 'year',
    lifePath: 'Life Path', expression: 'Expression',
};
const TEMPO_WORD = { slow: 'slow', steady: 'steady', fast: 'fast' };
const FACING_WORD = { inward: 'inward', outward: 'outward', both: 'facing both ways' };
const named = (signal) => `${TITLE[signal.position]} ${signal.value}`;
const relationLine = (left, right, relation) => (left && right && relation ? `${named(left)} against ${named(right)}: ${RELATION_WORD[relation]}.` : null);
/** The letters each name contributed, from a trace like `OI=15/6 + AA=2`. */
const lettersOf = (signal) => signal.trace
    .split('+').map((part) => part.trim().split('=')[0] ?? '').join('');
const vowelNote = (signal) => (signal && lettersOf(signal).includes('Y')
    ? 'Y is read as a vowel when neither of its neighbours in the name is a vowel, and as a consonant otherwise.'
    : null);
const EVIDENCE = {
    'numerology-direction': (model, plan) => {
        const lp = model.positions['life-path'];
        const lines = [`Life Path ${lp.value}: ${readableTrace(lp.trace, TRACE_LABELS)}, added: ${chainText(lp.chain)}. Month, day and year are each reduced first, and 11, 22 and 33 are kept whole.`];
        const bd = model.positions.birthday;
        if (bd) {
            lines.push(`Birth Day ${chainText(bd.chain)}: the day of the month.`);
            const relation = plan.direction.birthday?.relation ?? null;
            const line = relationLine(lp, bd, relation);
            if (line)
                lines.push(line);
        }
        for (const debt of plan.direction.debts) {
            const signal = model.positions[debt.position];
            lines.push(`Karmic debt ${debt.value}: found in the ${TITLE[debt.position]}'s own reduction (${chainText(signal.chain)}), not in one of its parts.`);
        }
        if (plan.direction.echo)
            lines.push(echoEvidence(plan.direction.echo));
        return lines;
    },
    'numerology-drive': (model, plan) => {
        const su = model.positions['soul-urge'];
        if (!su || !plan.drive)
            return [];
        const lines = [`Soul Urge ${su.value}: the vowels of each name, reduced name by name (${readableTrace(su.trace, TRACE_LABELS)}), added: ${chainText(su.chain)}.`];
        const note = vowelNote(su);
        if (note)
            lines.push(note);
        const line = relationLine(model.positions['life-path'], su, plan.drive.withDirection);
        if (line)
            lines.push(line);
        if (model.hiddenPassion.length > 0)
            lines.push(`Hidden Passion ${list(model.hiddenPassion.map(String))}: the value the letters of your name repeat most.`);
        for (const debt of plan.drive.debts)
            lines.push(`Karmic debt ${debt.value}: found in the Soul Urge's own reduction (${chainText(su.chain)}), not in one of the names.`);
        if (plan.drive.echo)
            lines.push(echoEvidence(plan.drive.echo));
        return lines;
    },
    'numerology-presence': (model, plan) => {
        const exp = model.positions.expression;
        const pers = model.positions.personality;
        if (!exp || !pers || !plan.presence)
            return [];
        const lines = [
            `Expression ${exp.value}: every letter, reduced name by name (${readableTrace(exp.trace, TRACE_LABELS)}), added: ${chainText(exp.chain)}.`,
            `Personality ${pers.value}: the consonants, reduced name by name (${readableTrace(pers.trace, TRACE_LABELS)}), added: ${chainText(pers.chain)}${pers.master ? `; ${pers.value} is kept as a master number` : ''}.`,
        ];
        const note = vowelNote(pers);
        if (note)
            lines.push(note);
        const att = model.positions.attitude;
        if (att)
            lines.push(`Attitude ${att.value}: birth month + birth day (${readableTrace(att.trace, TRACE_LABELS)}), added: ${chainText(att.chain)}; master numbers are reduced here.`);
        for (const line of [
            relationLine(exp, pers, plan.presence.withEachOther),
            relationLine(model.positions['soul-urge'], pers, plan.presence.innerOuter),
        ])
            if (line)
                lines.push(line);
        for (const debt of plan.presence.debts) {
            const signal = model.positions[debt.position];
            lines.push(`Karmic debt ${debt.value}: found in the ${TITLE[debt.position]}'s own reduction (${chainText(signal.chain)}).`);
        }
        if (plan.presence.expressionEcho)
            lines.push(echoEvidence(plan.presence.expressionEcho));
        if (plan.presence.personalityEcho)
            lines.push(echoEvidence(plan.presence.personalityEcho));
        return lines;
    },
    'numerology-pull': (model, plan) => {
        const pull = plan.pull;
        const describe = (group) => {
            const signal = model.signals.find((entry) => entry.value === group.value);
            const positions = group.positions.map((position) => TITLE[position]).join(', ');
            return signal
                ? `${group.value} (${positions}): ${TEMPO_WORD[signal.tempo]}, ${FACING_WORD[signal.facing]}`
                : `${group.value} (${positions})`;
        };
        const rule = 'Two numbers are read as pulling apart when one is slow and the other fast, or when one works inward and the other outward; numbers that share a direction are read as reinforcing each other.';
        if (pull.kind === 'split') {
            return [
                `${capitalise(describe(pull.anchor))}. Against it: ${[...pull.against.map((side) => side.group), ...pull.more].map(describe).join('; ')}.`,
                rule,
            ];
        }
        if (pull.kind === 'gap') {
            return [`${capitalise(describe(pull.left))}; ${describe(pull.right)}. No pair in the chart is slow against fast or inward against outward.`, rule];
        }
        return [`Repeated or reinforcing numbers throughout: ${pull.roots.join(', ')}. No pair in the chart pulls against another.`, rule];
    },
    'numerology-cost': (model, plan) => {
        const lines = [`Overuse is read from ${list(plan.cost.overuse.map(String))}${plan.cost.pull === 'split' ? ', the two sides of the pull' : ''}.`];
        lines.push(model.karmicLessons.length > 0
            ? `Karmic Lessons ${list(model.karmicLessons.map(String))}: values no letter of your name carries.${model.absentEverywhere.length > 0 ? ` Of these, ${list(model.absentEverywhere.map(String))} ${model.absentEverywhere.length === 1 ? 'is' : 'are'} absent from every position as well.` : ' Each of them appears in at least one position.'}`
            : 'Karmic Lessons: none - every value from 1 to 9 appears among the letters of your name.');
        const balance = model.positions.balance;
        if (balance)
            lines.push(`Balance ${balance.value}: the first letter of each name (${readableTrace(balance.trace, TRACE_LABELS)}) → ${balance.parts.join(' + ')} = ${chainText(balance.chain)}; master numbers are reduced here.`);
        return lines;
    },
    'numerology-growth': (model) => {
        const m = model.positions.maturity;
        if (!m)
            return [];
        return [`Maturity ${m.value}: ${readableTrace(m.trace, TRACE_LABELS)}, added: ${chainText(m.chain)}${m.master ? `; ${m.value} is kept as a master number` : ''}.`];
    },
    'numerology-chapter': (model, plan) => {
        const current = plan.chapter?.chapter;
        const [c1, c2, c3, c4] = model.chapters;
        const digit = model.positions['life-path']?.root ?? 0;
        const lines = [];
        if (c1 && c4)
            lines.push(`Windows: from birth to ${c1.endAge} (36 − ${digit}), then nine years each (${c2.startAge}-${c2.endAge}, ${c3.startAge}-${c3.endAge}), and from ${c4.startAge} on.`);
        if (!current)
            return lines;
        const lp = model.positions['life-path'];
        const [month, day, year] = lp.parts;
        const P = [`month ${month} + day ${day}`, `day ${day} + year ${year}`, 'the first + the second Pinnacle', `month ${month} + year ${year}`];
        const C = ['day − month', 'day − year', 'the first − the second Challenge', 'month − year'];
        lines.push(`Now: the ${ORDINAL[current.index]} chapter${model.age !== null ? `, at ${model.age}` : ''}.`);
        lines.push(`Pinnacle ${current.pinnacle} = ${P[current.index]} (${current.pinnacleParts.join(' + ')})${current.pinnacle !== current.pinnacleParts.reduce((sum, part) => sum + part, 0) ? ` → ${current.pinnacle}` : ''}.`);
        lines.push(`Challenge ${current.challenge} = ${C[current.index]}, as single digits (|${current.challengeParts.join(' − ')}|). Challenges use the month, day and year reduced to one digit each, so they run from 0 to 8.`);
        return lines;
    },
};
function echoEvidence(echo) {
    return `${echo.root} also appears as ${list(echo.positions.map((position, index) => `${TITLE[position]} ${echo.values[index]}`))}.`;
}
