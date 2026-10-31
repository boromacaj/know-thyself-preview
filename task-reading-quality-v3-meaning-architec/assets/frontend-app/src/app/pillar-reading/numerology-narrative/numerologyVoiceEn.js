import { TEMPERAMENT, relationBetween } from '../../knowledge/numerology/numberTemperament.js';
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
/** What a number does and what it cannot supply for itself: the authored temperament table, read aloud. */
const brings = (value) => TEMPERAMENT[String(value)]?.brings ?? '';
/** The authored table's wording where it reads obscurely aloud. */
const NEEDS_PLAIN = { 8: 'a purpose beyond the results' };
const needs = (value) => NEEDS_PLAIN[value] ?? TEMPERAMENT[String(value)]?.needs ?? '';
/** "your Soul Urge", or what Hidden Passion is, since the name alone says little. */
const where = (position) => (position === 'hidden-passion'
    ? 'the most frequent value in your name'
    : `your ${NAME[position]}`);
const whereList = (positions) => list(positions.map(where));
/** A stable choice among phrasings: the same chart always reads the same, and two charts rarely read alike. */
const pick = (variants, seed) => variants[Math.abs(Math.trunc(seed)) % variants.length];
/** The section each position is told in, in reading order (direction 0, drive 1, presence 2, cost 4, growth 5). */
const TOLD_IN = {
    'life-path': 0, birthday: 0, 'soul-urge': 1, 'hidden-passion': 1,
    expression: 2, personality: 2, attitude: 2, balance: 4, maturity: 5,
};
/** What a position is, in a few words, for the one place it is named before its own section has said so. */
const GLOSS = {
    'soul-urge': 'what satisfies you',
    expression: 'what you are equipped to do',
    personality: 'how you come across',
    attitude: 'your first reaction',
    maturity: 'the number for later life',
    balance: 'what you fall back on under strain',
};
/** Maturity is glossed once per reading; direction() starts a reading, so the memory is reset there. */
let maturityGlossed = false;
const needsGloss = (position, section) => {
    if (GLOSS[position] === undefined)
        return false;
    if (position === 'maturity') {
        if (maturityGlossed || section >= TOLD_IN[position])
            return false;
        maturityGlossed = true;
        return true;
    }
    return section < TOLD_IN[position] || position === 'attitude';
};
/* ================================================================== numbers */
const ROOT_BRIEF = {
    2: 'attunement to other people',
    4: 'patient building',
    6: 'care for the people around it',
};
/**
 * The Life Path, each number in its own words. An opener says what the number
 * orients you toward, notices or asks of you - never what your life hands you,
 * which the chart cannot know. The second sentence names the number and where
 * it comes from (the full date of birth), so the reader sees why it is said.
 */
const LIFE_PATH = {
    1: 'You tend to decide for yourself, ahead of agreement, and to carry the result. Your birth date adds up to a Life Path 1, which asks you to trust your own judgement enough to act on it.',
    2: 'Your attention tends to go to what happens between people: the partnership, the negotiation, the team that needs holding together. Your birth date adds up to a Life Path 2, which asks you to read what is going on and make it work, without giving up your own position to do it.',
    3: 'What you see tends to want saying. Your birth date adds up to a Life Path 3, which points you toward a form other people can take in: words, images, a story, a joke that lands. The less natural half of it is finishing what you begin.',
    4: 'You are drawn to the part of the work that has to hold: the foundation, the method, the thing that still works when nobody is watching. Your birth date adds up to a Life Path 4, which asks you to build patiently, in the order the work actually requires.',
    5: 'You tend to learn best through movement: new places, new people, problems you would rather step into than study first. Your birth date adds up to a Life Path 5, which asks for freedom and for the judgement to know which commitments are worth keeping inside it.',
    6: 'You tend to take responsibility quickly for the people and places around you. Your birth date adds up to a Life Path 6, which asks you to do that well, and to learn where your responsibility ends as well as where it begins.',
    7: 'The gap between what is claimed and what is true tends to draw you back. Your birth date adds up to a Life Path 7, which asks you to stay with a question until you know how the thing actually works, then come back out and say what you found.',
    8: 'You tend to be oriented toward consequence: resources to organise, decisions that carry weight, results that can be measured. Your birth date adds up to a Life Path 8, which asks you to handle what is large without letting it decide who you are.',
    9: 'You tend to see situations whole, and your attention keeps widening: toward people beyond your own circle, and toward knowing when something has run its course. Your birth date adds up to a Life Path 9, which asks you to give to something larger than yourself and to let go of your own claim on it.',
    11: 'You often sense where something is going before you can show why. Your birth date adds up to a Life Path 11, which asks you to trust that perception while you build the evidence for it.',
    22: 'What draws you tends to be larger than a personal life: structures, institutions, work built for other people to go on using. Your birth date adds up to a Life Path 22, which asks you to build at that scale, and that is only ever done one ordinary day at a time.',
    33: 'Your sense of responsibility tends to reach past your own circle. Your birth date adds up to a Life Path 33, which asks you to practise care steadily, well past the people it is owed to, and to know where it has to stop.',
};
/** Where each position's number is read from, said once where the number is first named. */
const FROM = {
    vowels: 'drawn from the vowels of your birth name',
    letters: 'read from every letter of your birth name',
    consonants: 'from the consonants of your birth name',
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
/** The Soul Urge, told first: the satisfaction, then the number and its source; then how it feels. */
const SOUL_URGE_LEAD = {
    1: `A decision that is yours is what satisfies you: your Soul Urge, ${FROM.vowels}, is 1.`,
    2: `Connection that works is what satisfies you: your Soul Urge, ${FROM.vowels}, is 2.`,
    3: `You are fed by expression that lands: your Soul Urge, ${FROM.vowels}, is 3.`,
    4: `Order that holds is what satisfies you: your Soul Urge, ${FROM.vowels}, is 4.`,
    5: `Room to move is what satisfies you: your Soul Urge, ${FROM.vowels}, is 5.`,
    6: `Being able to help is what satisfies you: your Soul Urge, ${FROM.vowels}, is 6.`,
    7: `Understanding is what satisfies you: your Soul Urge, ${FROM.vowels}, is 7.`,
    8: `What satisfies you is consequence: your Soul Urge, ${FROM.vowels}, is 8.`,
    9: `You are fed by meaning beyond yourself: your Soul Urge, ${FROM.vowels}, is 9.`,
    11: `Insight is what satisfies you: your Soul Urge, ${FROM.vowels}, is 11.`,
    22: `Building something that will outlast you is what satisfies you: your Soul Urge, ${FROM.vowels}, is 22.`,
    33: `Care given as a practice, not only in an emergency, is what satisfies you: your Soul Urge, ${FROM.vowels}, is 33.`,
};
const SOUL_URGE_MORE = {
    1: 'You feel most like yourself the moment you can act on your own judgement, without waiting for permission.',
    2: 'You tend to feel settled in a partnership or a team in which each side is actually heard.',
    3: 'Saying or making something and seeing it reach someone is the point for you; conversation, delight and a good response are not extras.',
    4: 'A job done properly, a plan that works and things you can rely on let you rest, and you tend not to rest before that.',
    5: 'New experience, variety and the freedom to change course are where you tend to feel most alive.',
    6: 'When the people you care for are all right, partly because of you, you can rest.',
    7: 'Time and quiet to get to the bottom of something, and a question answered properly rather than approximately, are their own reward.',
    8: 'You tend to feel most engaged when the results count and the stakes are real enough to matter.',
    9: 'Work or care feels worth it when it serves more than your own interest and reaches past your own circle.',
    11: 'The moment you are after is the one where something you sensed turns out to be true, and you find a way to put it so others can use it.',
    22: 'You are after a structure other people will keep using long after the work is done.',
    33: 'Being steadily useful to the people within your reach is its own reward.',
};
const SOUL_URGE = (value) => `${SOUL_URGE_LEAD[value]} ${SOUL_URGE_MORE[value]}`;
/** The Soul Urge, when an earlier section already told its number. */
const SOUL_URGE_SHORT = {
    1: 'a decision that is yours', 2: 'connection that works', 3: 'expression that lands',
    4: 'order that holds', 5: 'room to move', 6: 'being able to help',
    7: 'understanding, and the time and quiet to reach it', 8: 'consequence, meaning results that count',
    9: 'meaning beyond yourself', 11: 'insight you can share', 22: 'building what outlasts you',
    33: 'care given as a practice',
};
const EXPRESSION = {
    1: `Your Expression, ${FROM.letters}, is 1. It equips you to decide with incomplete information, start before there is agreement and carry the result.`,
    2: `Your Expression, ${FROM.letters}, is 2, which equips you for cooperation: tact, patience and an eye for the detail that keeps people working together.`,
    3: `Your Expression, ${FROM.letters}, is 3. You are equipped to communicate: to find the version of a thing that other people can take in.`,
    4: `Your Expression, ${FROM.letters}, is 4, which equips you for method: planning, organising and seeing work through to the end.`,
    5: `Your Expression, ${FROM.letters}, is 5, which equips you to adapt: to learn fast, to handle change and to work with people of every kind.`,
    6: `Your Expression, ${FROM.letters}, is 6, which equips you for care: noticing what a person or a group needs and making the situation work for them.`,
    7: `Your Expression, ${FROM.letters}, is 7. You are equipped for analysis: going underneath the first answer and staying with a problem until it gives way.`,
    8: `Your Expression, ${FROM.letters}, is 8, which equips you for organisation and authority: handling resources, scale and consequence.`,
    9: `Your Expression, ${FROM.letters}, is 9, which equips you with overview: seeing the whole of a situation and working for something wider than yourself.`,
    11: `Your Expression, ${FROM.letters}, is 11. You are equipped to register what has not been said and to put it into a form other people can use.`,
    22: `Your Expression, ${FROM.letters}, is 22, which equips you to build at scale: holding a large design together with the practical steps that would deliver it.`,
    33: `Your Expression, ${FROM.letters}, is 33. You are equipped to support people steadily, as a practice rather than only in a crisis.`,
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
    1: `What tends to show first is someone direct and self-possessed, who looks as though the decision has already been made. That is a Personality 1, ${FROM.consonants}.`,
    2: `What tends to show first is someone approachable and tactful, who listens before speaking. That is a Personality 2, ${FROM.consonants}.`,
    3: `Your Personality, ${FROM.consonants}, is 3, and it tends to read as lively and easy to talk to.`,
    4: `Your Personality, ${FROM.consonants}, is 4. It tends to read as steady and dependable: someone who will do what they said.`,
    5: `What tends to show first is someone quick and curious, who brings movement into a room. That is a Personality 5, ${FROM.consonants}.`,
    6: `What tends to show first is warmth and a readiness to take responsibility. That is a Personality 6, ${FROM.consonants}.`,
    7: `What tends to show first is someone reserved and observant, who watches before speaking. That is a Personality 7, ${FROM.consonants}.`,
    8: `Your Personality, ${FROM.consonants}, is 8. It tends to read as capable and composed: someone who looks able to handle it.`,
    9: `What tends to show first is someone open and broad-minded, who seems to take everyone in. That is a Personality 9, ${FROM.consonants}.`,
    11: `What tends to show first is close attention: a sense of listening properly, and of noticing more than is being said. That is a Personality 11, ${FROM.consonants}. The attention can feel intense; that intensity is part of the 11.`,
    22: `What tends to show first is someone grounded and purposeful, who looks as though they are building something. That is a Personality 22, ${FROM.consonants}.`,
    33: `What tends to show first is a warmth with a long reach. That is a Personality 33, ${FROM.consonants}.`,
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
    6: 'takes care of what the people in it need', 7: 'works out how the thing actually works',
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
/** A birth-day gift as a noun phrase a sentence can carry. A root of 2 or 4 could be a master value here, so it stays general. */
const OWN_GIFT = (root) => {
    const gift = root === 2 || root === 4 ? undefined : GIFT[root];
    return gift ? `your ${gift.replace(/^(an?|the) /, '')}` : 'what your birth day adds';
};
const shareText = (table, position, root) => {
    const entry = table[position];
    return typeof entry === 'function' ? entry(root) : (entry ?? '');
};
const PINNACLE_SHARE = {
    'life-path': 'so these years run in the direction your Life Path already sets',
    'soul-urge': 'so these years feed what already satisfies you',
    expression: 'so these years call on what you are already equipped to do',
    personality: 'so these years amplify what already shows first',
    birthday: (root) => `so these years draw on ${OWN_GIFT(root)}`,
    maturity: 'so these years give an early taste of where your numbers point later',
};
const CHALLENGE_SHARE = {
    'life-path': 'so the pressure lands on your own direction',
    'soul-urge': 'so the pressure lands on what you want most',
    expression: 'so the pressure lands on what you are best equipped to do',
    personality: 'so the pressure lands on the side of you that shows first',
    birthday: (root) => `so the pressure falls on ${OWN_GIFT(root)}`,
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
    'life-path': ', so your direction and your abilities share one theme',
    'soul-urge': ', and doing it is also what satisfies you',
    birthday: ': the gift your birth day adds, now as your main strength',
};
/** What follows when the Personality carries a number an earlier section told: said as a consequence of the number being shared. */
const PERSONALITY_TAIL = {
    'life-path': 'the direction is visible before anything else',
    'soul-urge': 'what you show tends to match what you want',
    expression: 'the surface matches what you can do',
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
/** What each number does when it is used well, as a behaviour (third person, so a sentence can carry it). */
const ANCHOR_DOES = {
    1: 'sets a first direction', 2: 'checks who else is affected', 3: 'tries the idea out loud',
    4: 'checks that it can be built', 5: 'tries another way round', 6: 'asks who it will affect',
    7: 'tests the idea', 8: 'asks what it would achieve', 9: 'checks how it fits the whole',
    11: 'notices what has not been said', 22: 'asks whether it would last', 33: 'asks who would be left out',
};
/** Overuse, completing "Overused, the N ...". */
const OVERUSE = {
    1: 'carries everything alone and hears advice as interference',
    2: 'keeps the peace at the expense of your own position',
    3: 'scatters into many things begun and few finished, and says less than it means',
    4: 'holds on to the method after it has stopped helping',
    5: 'leaves before anything has had time to take root',
    6: 'takes on more than is yours to carry, and resentment can follow',
    7: 'turns its scrutiny on you and withdraws where contact was needed',
    8: 'measures you by results alone',
    9: 'spreads so wide that the people closest to you get the least of you',
    11: 'runs on nerves, taking in more than it can process',
    22: 'takes on a scale that leaves no room for an ordinary day',
    33: 'gives past the point of tiredness and calls it normal',
};
/** What an absent number stands for, in a few words, so the reader is told what is missing. */
const NUMBER_OF = {
    1: 'initiative and independence', 2: 'cooperation and tact', 3: 'expression and ease with people',
    4: 'method and discipline', 5: 'freedom and variety', 6: 'care and home',
    7: 'analysis and an inner life', 8: 'ambition and material results', 9: 'compassion and endings',
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
const BALANCE_LINE = (value, what) => pick([
    `Your Balance number, ${value}, taken from the initials of your name, describes what you tend to fall back on under strain: ${what}.`,
    `The initials of your name give a Balance number of ${value}, which describes what you tend to fall back on under strain: ${what}.`,
    `Your Balance number, ${value}, comes from the initials of your name. Under strain it points to ${what}.`,
], value * 3 + what.length);
const MATURITY = {
    1: 'standing on your own judgement', 2: 'cooperation and a finer sense of other people',
    3: 'expression: saying more of what you see', 4: 'building something that lasts',
    5: 'freedom and range, a wider life with more movement in it', 6: 'responsibility and care, given by choice',
    7: 'depth: study, reflection and an inner life', 8: 'authority and results at a larger scale',
    9: 'breadth: work and care directed at something larger than yourself',
    11: 'insight: perception you trust and share', 22: 'building at a large scale', 33: 'care as a practice',
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
/** The single digit each karmic total reduces to. */
const DEBT_ROOT = { 13: 4, 14: 5, 16: 7, 19: 1 };
const DEBT_TENDENCY = {
    13: 'points to finishing what you start, including the unexciting middle of it',
    14: 'points to choosing an anchor for yourself, so that change stays a choice rather than a compulsion',
    16: 'points to one question worth asking now and then. Does what you are building rest on what is true, or on a story about yourself you have not tested?',
    19: 'points to letting help in without treating it as a loss of independence',
};
const RELATION_WORD = {
    same: 'the same number',
    reinforcing: 'different numbers pushing the same way',
    complementary: 'different numbers that supply what the other lacks',
    crosswise: 'numbers that differ in pace or in where they work',
};
/* ================================================================ sentences */
/**
 * How the Attitude shows as a first reaction. Its own words, not the number's
 * "brings" line, which the Pinnacle, the Soul Urge and the Maturity also use:
 * the same clause twice in one reading is one point made twice.
 */
const ATTITUDE_REACTS = {
    1: 'to act on your own judgement before asking anyone',
    2: 'to read the room before committing to anything',
    3: 'to put the situation into words',
    4: 'to look for the method before anything else',
    5: 'to try something and see what happens',
    6: 'to ask who needs looking after',
    7: 'to hold back and look underneath',
    8: 'to take charge of what matters',
    9: 'to step back and ask what the situation is asking of you',
};
/** What a master number is, said from the position it sits in, so two readers with a master do not read the same paragraph. */
const MASTER_AS = {
    'life-path': 'As your direction',
    birthday: 'As the gift of your birth day',
    'soul-urge': 'As what you want most',
    expression: 'As what you are equipped to do',
    personality: 'As what shows first',
    maturity: 'As where later life points',
};
function masterLine(value, root, position) {
    return `The ${value} is a master number, so numerology keeps it whole in ${where(position)} instead of reducing it to ${root}. ${MASTER_AS[position] ?? 'Here'}, it is the ${root}'s ${ROOT_BRIEF[root]}, asked to work at a larger scale. That brings more range and more strain, and on ordinary days it tends to run as a plain ${root}.`;
}
/**
 * A master number already read in an earlier section, met again here through
 * the echo: named as the same master, never explained a second time (one
 * point, once). Returns null when no earlier position carries the same master value.
 */
function masterAgain(ref, echo, earlier) {
    if (!ref.master || !echo)
        return null;
    const at = echo.positions.find((position, index) => earlier.includes(position) && echo.values[index] === ref.value);
    if (!at)
        return null;
    return { at, line: `It is the same master ${ref.value} as ${where(at)}.` };
}
/** The other positions that carry a root, naming a master form where it sits and saying what a position is when its own section comes later. */
function echoPlaces(echo, section) {
    return list(echo.positions.map((position, index) => {
        const value = echo.values[index];
        const notes = [
            needsGloss(position, section) ? GLOSS[position] : undefined,
            value !== echo.root ? `as ${value}, its master form` : undefined,
        ].filter(Boolean);
        return notes.length > 0 ? `${where(position)} (${notes.join('; ')})` : where(position);
    }));
}
/**
 * What follows from a number that works by default: the thing that number
 * cannot supply for itself, which differs for every number (the claim differs,
 * not only the wording).
 */
const echoTail = (root) => `What the ${root} cannot supply for itself is ${needs(root)}.`;
function echoLine(echo, owner) {
    const places = echoPlaces(echo, TOLD_IN[owner]);
    if (!echo.dominant)
        return `The ${echo.root} is also ${places}.`;
    const by = BY_DEFAULT[echo.root];
    const tail = echoTail(echo.root);
    return pick([
        `The ${echo.root} is not only ${where(owner)}: it is also ${places}. That gives it more weight in your chart than any other number. It tends to be what you do without deciding to: ${by}. ${tail}`,
        `No number weighs more in your chart than the ${echo.root}, which is ${where(owner)} and also ${places}. It tends to be what you do without deciding to: ${by}. ${tail}`,
        `The ${echo.root} turns up in more places than any other number: ${where(owner)}, and also ${places}. It tends to be what you do without deciding to: ${by}. ${tail}`,
    ], echo.root + echo.positions.length);
}
/** A total such as 14 as the sum of its own digits: "1 + 4", or "1 + 9 = 10, then 1 + 0" when it takes two steps. */
function digitSum(value) {
    const digits = String(value).split('');
    const sum = digits.reduce((total, digit) => total + Number(digit), 0);
    return sum > 9 ? `${digits.join(' + ')} = ${sum}, then ${String(sum).split('').join(' + ')}` : digits.join(' + ');
}
function debtLine(debt) {
    const tendency = DEBT_TENDENCY[debt.value];
    const root = DEBT_ROOT[debt.value];
    const seed = debt.value + TOLD_IN[debt.position];
    const meaning = pick([
        `Modern Western numerology treats a total of ${debt.value} as a karmic debt: a lesson carried forward.`,
        `In modern Western numerology, ${debt.value} is read as a karmic debt, a lesson carried forward.`,
        `In modern Western numerology, a total of ${debt.value} counts as a karmic debt, a lesson carried forward.`,
    ], seed);
    /* A birth-day debt is already introduced by birthdayLine, which names the total and what it reduces to. */
    const origin = debt.position === 'birthday' ? '' : `${capitalise(where(debt.position))} adds up to ${debt.value}, which reduces to ${root} (${digitSum(debt.value)}). `;
    return `${origin}${meaning} ${DEBT_TRADITION[debt.value]} Read as a tendency, not a verdict, the ${debt.value} in ${where(debt.position)} ${tendency}${/[?.]$/.test(tendency) ? '' : '.'}`;
}
/**
 * The older compound-number tradition's reading of the totals 15, 20 and 24, as
 * the tradition's and never as a verdict. Paraphrased; see the source record
 * (cheiro-book-of-numbers-1926) for its status.
 */
const COMPOUND_NOTE = {
    15: 'charm and persuasion, with a lesson in using that pull honestly',
    20: 'awakening and judgement, a call to weigh what has been done before moving on',
    24: 'warmth and support from others, with a lesson in not leaning on that ease',
};
/**
 * A repeated name number is said only as it meets the motive: it leans the
 * same way as the Soul Urge, pulls against it, or covers different ground from
 * it. Each says what both numbers want, so no repeated number is an orphan fact.
 */
function passionLines(passion, soulUrge) {
    return passion.flatMap((value) => {
        const relation = relationBetween(String(soulUrge), String(value));
        if (relation === null || relation === 'same')
            return [];
        if (relation === 'reinforcing')
            return [`The ${value} ${brings(value)}, which leans the same way as the ${soulUrge}.`];
        if (relation === 'crosswise')
            return [`The ${value} ${brings(value)}, where the ${soulUrge} ${STANCE[soulUrge]}.`];
        return [`The ${value} ${brings(value)}, which covers different ground from the ${soulUrge}: the ${soulUrge} ${STANCE[soulUrge]}.`];
    });
}
/** What the compound tradition's note means for the number it always lands on (15 and 24 reduce to 6, 20 to 2). */
const COMPOUND_LINK = {
    15: 'For a 6, care can also be a way of persuading, so the two are worth telling apart.',
    20: 'For a 2, who reads other people closely, that adds a call to judge what has been done.',
    24: 'For a 6, who finds it hard to be looked after in return, that support may be easier to accept than to ask for.',
};
function compoundLine(claim) {
    if (claim.toldBy) {
        /* The same total as a position already told is a restatement, not a second fact. */
        return '';
    }
    const arrival = claim.position === 'birthday'
        ? `Your birth day is ${claim.total}, which reduces to ${claim.root}.`
        : `${capitalise(where(claim.position))} comes to ${claim.total} before it reduces to ${claim.root}.`;
    return `${arrival} The older compound-number tradition reads ${claim.total} as a number of ${COMPOUND_NOTE[claim.total]}. ${COMPOUND_LINK[claim.total]}`;
}
const compoundFor = (claims, position) => {
    const found = claims.find((claim) => claim.position === position);
    return (found ? compoundLine(found) : '') || null;
};
/** The birth day against the Life Path, named by number rather than as "the path". */
function birthdayLine(ref, relation, lifePath, debt, supplies) {
    const gift = GIFT[ref.value] ?? GIFT[ref.root];
    /* With a karmic total the day itself is named first, so the reduced number is met after where it comes from. */
    const adds = debt
        ? `Your birth day, the day of the month, is ${debt.value}, which reduces to ${ref.value} (${digitSum(debt.value)}) and adds ${gift}.`
        : `Your birth day, the day of the month, adds ${article(ref.value)} ${ref.value}: ${gift}.`;
    switch (relation) {
        case 'same': return debt
            ? `Your birth day, the day of the month, is ${debt.value}, which reduces to the same ${ref.value} (${digitSum(debt.value)}), so your Life Path comes with its own gift built in: ${gift}.`
            : `Your birth day, the day of the month, carries the same ${ref.value}, so your Life Path comes with its own gift built in: ${gift}.`;
        case 'reinforcing': return `${adds} It pushes the same way as your Life Path ${lifePath}.`;
        case 'complementary': return supplies
            ? `${adds} It adds something your Life Path ${lifePath} does not stress: the ${supplies.value} ${brings(supplies.value)}.`
            : `${adds} It adds a different strength to your Life Path ${lifePath}.`;
        default: return `${adds} It pulls a different way from your Life Path ${lifePath}, and both need room.`;
    }
}
/** "the 7 in your Expression and Maturity (later life)": Maturity is told two sections later, so where nothing else says what it is, its first mention does. */
function groupText(group, gloss = true) {
    const ordered = [...group.positions].sort((a, b) => Number(a === 'maturity') - Number(b === 'maturity'));
    const names = list(ordered.map((position) => {
        if (position === 'maturity' && gloss && !maturityGlossed) {
            maturityGlossed = true;
            return `${NAME[position]} (later life)`;
        }
        return NAME[position];
    }));
    return `the ${group.value} ${group.positions.length === 1 ? 'of' : 'in'} your ${names}`;
}
/** "the 7 (your Expression and Maturity)": the anchor of a two-sided pull, set apart so the sentence does not run on. */
function anchorText(group) {
    const ordered = [...group.positions].sort((a, b) => Number(a === 'maturity') - Number(b === 'maturity'));
    return `the ${group.value} (your ${list(ordered.map((position) => NAME[position]))})`;
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
    const [slow, fast] = slowFirst ? [anchor, other] : [other, anchor];
    if (axis === 'tempo') {
        return `Between them, waiting for the ${slow} to be sure costs time, and following the ${fast} too early costs accuracy.`;
    }
    if (axis === 'facing') {
        return 'Between them, you may hold back a result you could show because you are not yet sure of it, or show something before you have checked it.';
    }
    return `Between them, you may wait for the ${slow} to be sure when the ${fast} is ready to go, or move on the ${fast} before the ${slow} has caught up.`;
}
const ORDINAL = ['first', 'second', 'third', 'fourth'];
/* ============================================================ the sections */
export const EN_VOICE = {
    direction: (plan) => {
        maturityGlossed = false;
        const lp = plan.lifePath;
        const first = [LIFE_PATH[lp.value]];
        if (lp.master)
            first.push(masterLine(lp.value, lp.root, 'life-path'));
        const lpCompound = compoundFor(plan.compounds, 'life-path');
        if (lpCompound)
            first.push(lpCompound);
        const paragraphs = [first.join(' ')];
        const second = [];
        const bdCompound = compoundFor(plan.compounds, 'birthday');
        if (plan.birthday) {
            second.push(birthdayLine(plan.birthday.ref, plan.birthday.relation, lp.value, plan.debts.find((debt) => debt.position === 'birthday'), plan.birthday.supplies));
            if (plan.birthday.ref.master && !lp.master)
                second.push(masterLine(plan.birthday.ref.value, plan.birthday.ref.root, 'birthday'));
            if (bdCompound)
                second.push(bdCompound);
        }
        const owner = plan.echo?.root === lp.root ? 'life-path' : 'birthday';
        /* A one-line echo joins the birth-day paragraph; the dominant number's
           longer telling takes a paragraph of its own, as in the drive section. */
        if (plan.echo && !plan.echo.dominant)
            second.push(echoLine(plan.echo, owner));
        if (second.length > 0)
            paragraphs.push(second.join(' '));
        if (plan.echo?.dominant)
            paragraphs.push(echoLine(plan.echo, owner));
        for (const debt of plan.debts)
            paragraphs.push(debtLine(debt));
        return paragraphs;
    },
    drive: (plan) => {
        const su = plan.soulUrge;
        const first = [];
        const again = plan.toldBy ? null : masterAgain(su, plan.echo, ['life-path', 'birthday']);
        if (plan.toldBy) {
            first.push(`Your Soul Urge, ${FROM.vowels}, is the same ${su.value} as ${where(plan.toldBy)}, so what satisfies you is ${SOUL_URGE_SHORT[su.value]}.`);
            first.push(SOUL_URGE_MORE[su.value]);
        }
        else {
            first.push(SOUL_URGE(su.value));
            if (again)
                first.push(again.line);
            else if (su.master)
                first.push(masterLine(su.value, su.root, 'soul-urge'));
        }
        const lp = plan.lifePath.value;
        switch (plan.withDirection) {
            case 'same':
                if (!plan.toldBy)
                    first.push('It is also your Life Path number, so what satisfies you and the direction you take are one thing: doing the work is its own reward.');
                break;
            case 'reinforcing':
                first.push(`It pushes the same way as your Life Path ${lp}, so what you want and where you are headed agree.`);
                break;
            case 'complementary':
                if (plan.supplies)
                    first.push(`When you decide, the ${lp} of your Life Path ${ANCHOR_DOES[lp]}, while the ${su.value} ${ANCHOR_DOES[su.value]}, so it can be unclear which one is deciding.`);
                break;
            case 'crosswise':
                first.push(`It works from a different place than your Life Path ${lp}, so the two need deliberate room in the same week.`);
                break;
            default:
                break;
        }
        /* A one-line echo stays with the motive it echoes; only the dominant
           number's longer telling takes a paragraph of its own. An echo whose only
           other place was just named as the same master is not named again. */
        const echoSaid = again !== null && plan.echo?.positions.length === 1;
        if (plan.echo && !plan.echo.dominant && !echoSaid)
            first.push(echoLine(plan.echo, 'soul-urge'));
        if (plan.passionAgrees && !(plan.echo?.positions.includes('hidden-passion'))) {
            first.push(`The most frequent value in your name is also ${su.root}, which reinforces this motive.`);
        }
        /* A value the name repeats that no other number in the chart carries: a quieter undercurrent. */
        if (plan.passion) {
            const said = passionLines(plan.passion, su.value);
            if (said.length > 0) {
                const [one, two] = plan.passion;
                first.push(two === undefined
                    ? `The number your name repeats most is ${one}, a quieter undercurrent beside this motive. ${said.join(' ')}`
                    : `Your name repeats ${one} and ${two} equally, a quieter undercurrent beside this motive. ${said.join(' ')}`);
            }
        }
        const suCompound = compoundFor(plan.compounds, 'soul-urge');
        if (suCompound)
            first.push(suCompound);
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
        const expAgain = plan.expressionToldBy ? null : masterAgain(exp, plan.expressionEcho, ['life-path', 'birthday', 'soul-urge']);
        if (plan.expressionToldBy) {
            first.push(`Your Expression, ${FROM.letters}, is the same ${exp.value} as ${where(plan.expressionToldBy)}.`);
            first.push(`You are equipped for ${EXPRESSION_SHORT[exp.value]}${EXPRESSION_TAIL[plan.expressionToldBy] ?? ''}.`);
        }
        else {
            first.push(EXPRESSION[exp.value]);
            if (expAgain)
                first.push(expAgain.line);
            else if (exp.master)
                first.push(masterLine(exp.value, exp.root, 'expression'));
        }
        if (plan.expressionEcho && !(expAgain && plan.expressionEcho.positions.length === 1))
            first.push(echoLine(plan.expressionEcho, 'expression'));
        const expCompound = compoundFor(plan.compounds, 'expression');
        if (expCompound)
            first.push(expCompound);
        const second = [];
        const persAgain = plan.personalityToldBy ? null : masterAgain(pers, plan.personalityEcho, ['life-path', 'birthday', 'soul-urge', 'expression']);
        /* When the Personality repeats the Soul Urge, the tail already says that
           what you show is what you want; the same-relation sentence is not added. */
        const tailSaysInnerOuter = plan.personalityToldBy === 'soul-urge';
        if (plan.personalityToldBy) {
            second.push(`Your Personality, ${FROM.consonants}, is the same ${pers.value} as ${where(plan.personalityToldBy)}.`);
            const tail = PERSONALITY_TAIL[plan.personalityToldBy];
            second.push(`What tends to show first is ${PERSONALITY_SHORT[pers.value]}.${tail ? ` Because it is the same number in both places, ${tail}.` : ''}`);
        }
        else {
            second.push(PERSONALITY[pers.value]);
            if (persAgain)
                second.push(persAgain.line);
            else if (pers.master)
                second.push(masterLine(pers.value, pers.root, 'personality'));
        }
        if (plan.personalityEcho && !(persAgain && plan.personalityEcho.positions.length === 1))
            second.push(echoLine(plan.personalityEcho, 'personality'));
        if (plan.attitudeAgrees)
            second.push(`Your Attitude, the sum of your birth month and day, carries the same ${pers.root}, so your first reaction is consistent with that impression.`);
        else if (plan.attitude !== null)
            second.push(`Your Attitude, the sum of your birth month and day, is ${plan.attitude}, so your first reaction tends to be ${ATTITUDE_REACTS[plan.attitude] ?? `one that ${brings(plan.attitude)}`}.`);
        const persCompound = compoundFor(plan.compounds, 'personality');
        if (persCompound)
            second.push(persCompound);
        /* The surface against the equipment and against the motive: what tends to
           show first, and what comes forward once there is work or something at
           stake - never what other people offer, assign or conclude. */
        const third = [];
        const su = plan.soulUrge;
        /* When the equipment and the motive are the same number, the surface is held
           against it once, not once for each. */
        const oneNumber = su !== null && su.value === exp.value && su.value !== pers.value
            && plan.withEachOther !== null && plan.withEachOther === plan.innerOuter;
        if (oneNumber && plan.withEachOther === 'reinforcing') {
            third.push(`The ${pers.value} on the surface agrees with the ${exp.value} underneath, which is both how you work and what you want, so the first impression is a fair guide to both.`);
        }
        else if (oneNumber && plan.withEachOther === 'crosswise') {
            third.push(`The ${pers.value} on the surface and the ${exp.value} underneath, which is both how you work and what you want, point different ways. A first impression can say little about either, because the ${exp.value} tends to show only once the work is under way.`);
        }
        else {
            switch (plan.withEachOther) {
                case 'same':
                    third.push('Your Personality and your Expression are the same number, so the first impression is an accurate picture of what you can do. A capability outside that range can stay in the background, sometimes even for you.');
                    break;
                case 'reinforcing':
                    third.push(`The ${pers.value} on the surface and the ${exp.value} you work with agree, so the first impression is a fair guide to how you actually work.`);
                    break;
                case 'complementary':
                    third.push(`The ${pers.value}'s ${PERSONALITY_DRAW[pers.value]} comes first; once the work starts, the ${exp.value} ${EXPRESSION_DOES[exp.value]}.`);
                    break;
                case 'crosswise':
                    third.push(`The ${pers.value} on the surface and the ${exp.value} you work with point different ways. A first impression can say little about how you actually work, because the ${exp.value} tends to show only once the work is under way.`);
                    break;
                default:
                    break;
            }
            if (su && su.value !== pers.value) {
                switch (plan.innerOuter) {
                    case 'reinforcing':
                        third.push(`The ${pers.value} on the surface ${STANCE[pers.value]}; underneath, the ${su.value} wants ${SOUL_URGE_SHORT[su.value]}. They are not the same, but they lean the same way, so the first impression is unlikely to hide what you want.`);
                        break;
                    case 'complementary':
                        third.push(`Underneath the ${pers.value} sits the ${su.value}, which tends to come forward ${SOUL_URGE_WHEN[su.value]}.`);
                        break;
                    case 'crosswise':
                        third.push(`What you show and what you want are far apart. The ${pers.value} on the surface gives little away about the ${su.value} underneath, which tends to stay out of view until you choose to show it.`);
                        break;
                    default:
                        break;
                }
            }
            else if (su && plan.innerOuter === 'same' && !tailSaysInnerOuter) {
                third.push('What shows first is also what satisfies you, so there is little distance between how you come across and what you want.');
            }
        }
        const paragraphs = [first.join(' '), second.join(' '), third.join(' ')];
        for (const debt of plan.debts)
            paragraphs.push(debtLine(debt));
        return paragraphs.filter(Boolean);
    },
    pullStandfirst: 'Where the numbers in your chart want different things: tendencies, not verdicts.',
    pull: (plan) => {
        if (plan.kind === 'split') {
            const anchor = plan.anchor;
            const sides = plan.against;
            const first = [];
            const others = sides.map((side) => groupText(side.group, sides.length === 1));
            first.push(sides.length === 1
                ? `The clearest pull in your chart runs between ${groupText(anchor)} and ${others[0]}.`
                : `The clearest pull in your chart sets ${anchorText(anchor)} against two other numbers: ${others.join(sides.some((side) => side.group.positions.length > 1) ? ', and ' : ' and ')}.`);
            if (sides.length > 1 && [anchor, ...sides.map((side) => side.group)].some((group) => group.positions.includes('maturity'))) {
                if (!maturityGlossed) {
                    first.push('Maturity is the number for later life.');
                    maturityGlossed = true;
                }
            }
            const wants = sides.map((side) => `the ${side.group.value} ${STANCE[side.group.value]}`);
            first.push(`${capitalise(`the ${anchor.value} ${STANCE[anchor.value]}`)}; ${list(wants)}.`);
            /* Further groups crosswise to the anchor (plan.more) are evidence, not text: the paragraph names the anchor and at most two others. */
            const commit = list(sides.map((side) => `the ${side.group.value}`));
            const verb = sides.length > 1 ? 'commit' : 'commits';
            const used = pick([
                `Used well, the ${anchor.value} ${ANCHOR_DOES[anchor.value]} before ${commit} ${verb} to it.`,
                `At its best, the ${anchor.value} ${ANCHOR_DOES[anchor.value]} first, and ${commit} can then commit to it.`,
            ], anchor.value + sides.reduce((total, side) => total + side.group.value, 0));
            const second = [axisSentence(anchor, sides), used];
            return [first.join(' '), second.join(' ')];
        }
        if (plan.kind === 'gap') {
            const { left, right } = plan;
            return [
                `Nothing in your chart pulls hard against the rest. The clearest difference runs between ${groupText(left)} and ${groupText(right)}. The ${left.value} ${STANCE[left.value]}; the ${right.value} ${STANCE[right.value]}.`,
                `Neither works against the other. In practice the ${left.value} ${ANCHOR_DOES[left.value]}, and the ${right.value} ${ANCHOR_DOES[right.value]}.`,
            ];
        }
        const roots = plan.roots.map((root) => `the ${root}`);
        return [
            `Very little in your chart pulls against the rest. ${capitalise(list(roots))} set${roots.length === 1 ? 's' : ''} the tone and the other numbers lean the same way, so the direction is clear and the effort goes a long way.`,
            'What that agreement cannot do is question itself. A wrong direction can run a long way before anything inside you objects, so an outside view you trust is worth more to you than more of your own.',
        ];
    },
    cost: (plan) => {
        const paragraphs = [];
        const [a, b] = plan.overuse;
        if (a !== undefined) {
            const frame = (a * 5 + (b ?? 0) * 2 + (plan.balance ?? 0)) % 3;
            const first = [[
                    `Overused, the ${a} ${OVERUSE[a]}.`,
                    `Taken too far, the ${a} ${OVERUSE[a]}.`,
                    `Left unchecked, the ${a} ${OVERUSE[a]}.`,
                ][frame]];
            if (b !== undefined) {
                first.push([
                    `The ${b}, pushed too far, ${OVERUSE[b]}.`,
                    `The ${b}, if it runs ahead, ${OVERUSE[b]}.`,
                    `The ${b}, when it dominates, ${OVERUSE[b]}.`,
                ][frame]);
            }
            if (plan.pair)
                first.push(pairCost(plan.pair.anchor, plan.pair.other, plan.pair.axis));
            paragraphs.push(first.join(' '));
        }
        const second = [];
        if (plan.absent.length === 1) {
            const [n] = plan.absent;
            second.push(`No letter of your name and no position in your chart carries ${article(n)} ${n}, the number of ${NUMBER_OF[n]}. ${pick([
                `${capitalise(ABSENT[n])} may be something you build on purpose rather than something that arrives by itself.`,
                `${capitalise(ABSENT[n])} is less likely to arrive by itself, so it may be worth building on purpose.`,
            ], n)}`);
        }
        else if (plan.absent.length === 2) {
            const [n, m] = plan.absent;
            second.push(`No letter of your name and no position in your chart carries ${article(n)} ${n} (${NUMBER_OF[n]}) or ${article(m)} ${m} (${NUMBER_OF[m]}). ${pick([
                `${capitalise(ABSENT[n])}, and ${ABSENT[m]}, may be things you build on purpose rather than things that arrive by themselves.`,
                `${capitalise(ABSENT[n])}, and ${ABSENT[m]}, are less likely to arrive by themselves, so they may be worth building on purpose.`,
            ], n + m)}`);
        }
        if (plan.balance !== null && BALANCE[plan.balance]) {
            second.push(BALANCE_LINE(plan.balance, BALANCE[plan.balance]));
        }
        if (second.length > 0)
            paragraphs.push(second.join(' '));
        return paragraphs;
    },
    growth: (plan, pull) => {
        const m = plan.maturity;
        const lp = plan.lifePath.value;
        const opening = maturityGlossed
            ? `Your Maturity, the sum of your Life Path and Expression, is ${m.value}.`
            : pick([
                `Your Maturity, the sum of your Life Path and Expression, is ${m.value}.`,
                `Your Maturity, the number for later life, is ${m.value}: the sum of your Life Path and Expression.`,
                `Later life is read from your Maturity, which is ${m.value}, the sum of your Life Path and Expression.`,
            ], m.value + lp * 2 + (plan.inPull ? 1 : 0));
        const sentences = [`${opening} With time it tends to point you toward ${MATURITY[m.value]}.`];
        if (m.master && plan.toldBy) {
            sentences.push(`The ${m.value} is a master number, kept whole here rather than reduced: it is the ${m.root} that is already ${where(plan.toldBy)}, asked to work at a larger scale.`);
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
            sentences.push(`In the pull described above, the ${m.value} stands against ${opposite}, and with time it tends to gain ground.`);
        }
        else {
            switch (plan.withDirection) {
                case 'reinforcing':
                    sentences.push(`It pushes the same way as your Life Path ${lp}.`);
                    break;
                case 'complementary':
                    if (plan.supplies)
                        sentences.push(`Next to your Life Path ${lp}, the ${m.value} adds something of its own: it ${brings(m.value)}.`);
                    break;
                case 'crosswise':
                    sentences.push(`It turns away from your Life Path ${lp}: where the ${lp} ${STANCE[lp]}, the ${m.value} ${STANCE[m.value]}, so later life asks for something your direction did not.`);
                    break;
                default: break;
            }
        }
        return [sentences.join(' ')];
    },
    chapterStandfirst: 'Numerology divides a life into four chapters, each with a main theme (its Pinnacle) and a pressure (its Challenge). They describe the shape of a stretch of years, not a forecast.',
    chapter: (plan) => {
        const c = plan.chapter;
        const lp = plan.lifePath.value;
        const first = [];
        if (c.index === 0)
            first.push(`You are in the first of your four life chapters, which runs from birth to ${c.endAge}.`);
        else if (c.index === 3)
            first.push(`You are in the fourth and last of your life chapters, which began at ${c.startAge} and runs for the rest of your life.`);
        else
            first.push(`You are in the ${ORDINAL[c.index]} of your four life chapters, from ${c.startAge} to ${c.endAge}.`);
        const theme = PINNACLE[c.pinnacle];
        first.push(pick([
            `Its Pinnacle is ${c.pinnacle}: these years tend to be organised around ${theme}.`,
            `Its Pinnacle is ${c.pinnacle}: it points these years toward ${theme}.`,
            `Its Pinnacle is ${c.pinnacle}: the theme of these years tends to be ${theme}.`,
        ], c.pinnacle + c.index));
        if (c.pinnacleMaster) {
            first.push(`The ${c.pinnacle} is a master number here: the ${c.pinnacleRoot}'s ${ROOT_BRIEF[c.pinnacleRoot]} at a larger scale, with more range and more strain.`);
        }
        if (plan.pinnacleShares.length > 0) {
            /* Three or more places would restate the count the direction section already gave; name the lead one. */
            const lead = leadShare(plan.pinnacleShares);
            const places = plan.pinnacleShares.length > 2 ? `${where(lead)}, and it recurs elsewhere in your chart` : whereList(plan.pinnacleShares);
            first.push(`The ${c.pinnacleRoot === c.pinnacle ? c.pinnacle : c.pinnacleRoot} is also ${places}, ${shareText(PINNACLE_SHARE, lead, c.pinnacleRoot)}.`);
        }
        else {
            switch (plan.pinnacleWithDirection) {
                case 'reinforcing':
                    first.push(`It pushes the same way as your Life Path ${lp}.`);
                    break;
                case 'complementary':
                    first.push(plan.pinnacleSupplies
                        ? `The ${c.pinnacle} adds what your Life Path ${lp} does not stress: it ${brings(c.pinnacle)}.`
                        : `The ${c.pinnacle} adds something your Life Path ${lp} does not stress: it ${STANCE[c.pinnacle]}.`);
                    break;
                case 'crosswise':
                    first.push(`It asks for a different way of working from your Life Path ${lp}: where the ${lp} ${STANCE[lp]}, the ${c.pinnacle} ${STANCE[c.pinnacle]}.`);
                    break;
                default: break;
            }
        }
        const second = [];
        if (c.challenge === 0) {
            second.push(`Its Challenge is 0. That does not mean an easy stretch: no single pressure dominates these years, so nothing points you at one thing to work on. Choosing a focus deliberately becomes the work, and the Pinnacle's theme of ${theme} gives you something to choose within.`);
        }
        else {
            const test = CHALLENGE[c.challenge];
            second.push(pick([
                `Its Challenge is ${c.challenge}: what these years test in you is ${test}.`,
                `Its Challenge is ${c.challenge}: the test it sets is ${test}.`,
                `Its Challenge is ${c.challenge}: the pressure of these years tends to fall on ${test}.`,
            ], c.challenge + c.index));
            if (plan.challengeShares.length > 0) {
                second.push(`The ${c.challenge} is also ${whereList(plan.challengeShares)}, ${shareText(CHALLENGE_SHARE, leadShare(plan.challengeShares), c.challenge)}.`);
            }
            else {
                switch (plan.challengeWithDirection) {
                    case 'reinforcing':
                        second.push(`It pushes the same way as your Life Path ${lp}, so what these years test is likely to feel like more of what your direction already asks, not a new demand.`);
                        break;
                    case 'complementary':
                        second.push(`Where your Life Path ${lp} ${STANCE[lp]}, the ${c.challenge} ${STANCE[c.challenge]}, so these years can feel like learning a second language.`);
                        break;
                    case 'crosswise':
                        second.push(`Where your Life Path ${lp} ${STANCE[lp]}, the ${c.challenge} ${STANCE[c.challenge]}: that difference is the work of this chapter.`);
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
            return `Your four chapters run from birth to ${c1.endAge}, from ${c2.startAge} to ${c2.endAge}, from ${c3.startAge} to ${c3.endAge}, and from ${c4.startAge} for the rest of your life. The first ends at 36 minus ${lp === digit ? `your Life Path, ${digit}` : `the single digit of your Life Path (${lp} counts as ${digit} here)`}, which is why it is the longest; the middle two last nine years each.`;
        },
        positionTitle: (position, value, compound) => (position === 'life-path' && compound !== null
            ? `${TITLE[position]} ${compound}/${value}`
            : `${TITLE[position]} ${value}`),
        debtTitle: (value, positions) => `Karmic Debt ${value} · ${list(positions.map((position) => TITLE[position]))}`,
        positionsStandfirst: 'Each number on its own, read in the position that produced it. The main reading draws on these.',
        chaptersStandfirst: 'Your four life chapters, each with its Pinnacle and Challenge. They describe the shape of a stretch of years, not a forecast.',
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
        for (const compound of plan.direction.compounds)
            lines.push(compoundEvidence(compound));
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
        for (const compound of plan.drive.compounds)
            lines.push(compoundEvidence(compound));
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
        for (const compound of plan.presence.compounds)
            lines.push(compoundEvidence(compound));
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
function compoundEvidence(compound) {
    return `Compound total ${compound.total} in the ${TITLE[compound.position]}, before it reduces to ${compound.root}: noted by the older compound-number tradition, not by the engine's result.`;
}
function echoEvidence(echo) {
    return `${echo.root} also appears as ${list(echo.positions.map((position, index) => `${TITLE[position]} ${echo.values[index]}`))}.`;
}
