import { OPPOSITE_POLE } from './dayTypes.js?v=d9f39e7';
const c = (text, ...says) => ({ text, says });
/* ------------------------------------------------- lines the older card already said -- */
export const QUIET_TITLE = 'A fairly even day';
export const QUIET_LINE = 'Nothing in particular pulls hard in either direction, so it may suit whatever is already on your list.';
/** Nothing leads, but the pace axis leads on pressure: the day is not even, and nothing is recommended from the pressure. */
export const PRESSURE_TITLE = 'A day with some pressure in it';
export const PRESSURE_LINE = 'Nothing in particular leads, but the pull to hurry may be stronger than the day needs.';
/** A lean line said with the qualification a pair on the card needs. */
export const EASIER_RECONCILED = {
    'in-bursts': 'Short bursts of effort, with quieter stretches between.',
    'on-what-is-open': 'Using the momentum on what is already open.',
    'what-is-ready': 'Making the call on what is ready, and leaving the rest open.',
    'brief-contact': 'Brief, easy contact with people.',
};
/** Whole sentences, so they can stand under one heading beside the others. */
export const AVOID_CARE = {
    rushing: 'Pushing the pace may cost more than it gains.',
    'closing-options-early': 'Wait to narrow things down until you have looked around.',
    'splitting-attention': 'Keep to one thing at a time rather than splitting your attention.',
    'forced-sociability': 'A packed day with people may wear thin, so leave some room.',
    'pushing-feelings-aside': 'Carrying on regardless of how you feel may not hold for long.',
    'pressing-for-openness': 'Pressing for an emotional conversation may not land.',
    'opening-new-fronts': 'Wait to open new fronts until the old ones are closed.',
    'forcing-a-conclusion': 'A conclusion forced before it is ready may need reopening.',
    'pressing-a-point': 'Pressing a point in a tense exchange may make it harder to settle.',
    'pressing-your-case': 'Hear the other side before you argue your case.',
};
/**
 * A reliance beside something it would contradict as two plain labels: one sentence that says what each is for.
 * The pair is recorded in the model, and a test checks that the plain pair never reaches the screen.
 */
export const RECONCILED_RELIANCE = {
    urgency: 'Momentum can carry the day, but the feeling that something cannot wait is a poor guide to what to take on.',
    certainty: 'A decision that has waited can be made, but a sudden burst of certainty is a poor guide to it.',
    'a-passing-mood': 'What you feel matters, and a passing mood is still a poor guide to what is true.',
};
/* ----------------------------------------------------------------- contacts -- */
/**
 * How a contact touches, as the verb of the sentence about it, by where the contact stands in its course. A contact at its
 * closest today is made; one still building is moving into contact; one already fading is moving out of it. The wording is the
 * evidence: a separating contact is past its peak, and saying it is "in tense contact" overstated it.
 */
export const TOUCH = {
    ease: { peak: 'is in easy contact with', building: 'is moving into easy contact with', fading: 'is moving out of easy contact with' },
    hard: { peak: 'is in tense contact with', building: 'is moving into tense contact with', fading: 'is easing out of tense contact with' },
    merge: { peak: 'lines up with', building: 'is lining up with', fading: 'is moving away from' },
};
/** The same verbs for a contact whose course is not known (the Life Dynamics explanation names a contact without its timing). */
export const TOUCH_STATE = { ease: 'is in easy contact with', hard: 'is in tense contact with', merge: 'lines up with' };
export const OWN_PLACE_STATE = {
    ease: 'is in easy contact with its own place in your chart',
    hard: 'is in tense contact with its own place in your chart',
    merge: 'returns to its own place in your chart',
};
/** The natal point, as the object of the sentence, and what it is about, said once at the first mention. */
export const NATAL_OBJECT = {
    Sun: { name: 'your Sun', gloss: 'your sense of direction' },
    Moon: { name: 'your Moon', gloss: 'your feelings and moods' },
    Mercury: { name: 'your Mercury', gloss: 'how you think and talk' },
    Venus: { name: 'your Venus', gloss: 'what you enjoy and who you feel close to' },
    Mars: { name: 'your Mars', gloss: 'your drive' },
};
export const BODY_SUBJECT = {
    Moon: 'The Moon', Sun: 'The Sun', Mercury: 'Mercury', Venus: 'Venus', Mars: 'Mars',
};
/** A body touching its own place in the chart is said as that, so the sentence never reads "Venus touches your Venus". */
export const OWN_PLACE = {
    ease: { peak: 'is in easy contact with where it stood when you were born', building: 'is moving into easy contact with where it stood when you were born', fading: 'is moving out of easy contact with where it stood when you were born' },
    hard: { peak: 'is in tense contact with where it stood when you were born', building: 'is moving into tense contact with where it stood when you were born', fading: 'is easing out of tense contact with where it stood when you were born' },
    merge: { peak: 'returns to where it stood when you were born', building: 'is coming back to where it stood when you were born', fading: 'is moving away from where it stood when you were born' },
};
/**
 * What a contact does to the day, for each body touching each point and each way of touching.
 * Written from the knowledge rows (dayKnowledge.ts): a body's own character, by how it touches, applied to the part
 * of the person it touches. The planets are not the Moon: the Moon is read by what she touches (MOON_TARGET_ROWS),
 * every other body by what it is about with the point adding a little (FAST_BODY_ROWS + TARGET_ROWS).
 */
export const CONTACT_CLAUSE = {
    Moon: {
        Sun: {
            ease: c('it is easier to know what you want and to act on it', 'commit', 'smooth', 'self-assurance'),
            hard: c('what you feel and what you are aiming at can pull apart for a while', 'open', 'charged'),
            merge: c('what you feel and what you want sit close together', 'open', 'commit', 'self-assurance'),
        },
        Moon: {
            ease: c('moods feel familiar and manageable', 'open', 'smooth'),
            hard: c('moods sit closer to the surface and are harder to step back from', 'open', 'charged'),
            merge: c('it tends to be a day of feeling most like yourself, for better and for worse', 'open', 'inward'),
        },
        Mercury: {
            ease: c('ideas and words come with some feeling in them', 'speak', 'smooth'),
            hard: c('mood can colour what you hear and what you say', 'open', 'charged'),
            merge: c('thinking and mood run together, which keeps attention on one thing at a time', 'narrow'),
        },
        Venus: {
            ease: c('warmth and ease with people come readily', 'open', 'smooth', 'outward', 'warmth'),
            hard: c('small slights can weigh more than they should', 'open', 'charged', 'sensitivity'),
            merge: c('affection and pleasure sit close to the surface', 'open', 'outward', 'warmth'),
        },
        Mars: {
            ease: c('there is energy to put behind what you feel strongly about', 'urgent', 'smooth'),
            hard: c('patience can wear thin', 'urgent', 'charged', 'patience'),
            merge: c('feeling and effort arrive together', 'urgent', 'open'),
        },
    },
    Sun: {
        Sun: {
            ease: c('your sense of direction gets a clear run', 'commit', 'smooth', 'self-assurance'),
            hard: c('there can be a push to prove something', 'urgent', 'charged'),
            merge: c('your sense of direction is more noticeable than usual, to you and to others', 'commit', 'outward'),
        },
        Moon: {
            ease: c('what you feel gets room alongside what you want', 'open', 'smooth'),
            hard: c('what you feel and what you want to show can pull apart', 'open', 'charged'),
            merge: c('your feelings are more noticeable than usual', 'open', 'outward'),
        },
        Mercury: {
            ease: c('your thinking gets a clear run and is easy to put across', 'speak', 'smooth', 'commit'),
            hard: c('there can be a push to make your point before your thinking has settled', 'urgent', 'charged', 'wide'),
            merge: c('your thinking is more noticeable than usual, and so is what you say', 'narrow', 'outward'),
        },
        Venus: {
            ease: c('what you enjoy and who you like to be with get a clear run', 'outward', 'smooth'),
            hard: c('there can be a push to have things your way where preferences differ', 'urgent', 'charged'),
            merge: c('enjoyment and company are more noticeable than usual', 'outward'),
        },
        Mars: {
            ease: c('your drive gets a clear run', 'urgent', 'smooth', 'commit'),
            hard: c('drive can turn into a push to prove something', 'urgent', 'charged'),
            merge: c('your drive is more noticeable than usual', 'urgent', 'commit'),
        },
    },
    Mercury: {
        Sun: {
            ease: c('ideas back up what you are aiming at and are easy to put across', 'speak', 'commit', 'smooth'),
            hard: c('what you say and what you mean can come apart', 'charged', 'keep-open'),
            merge: c('thinking and direction work together', 'narrow', 'commit'),
        },
        Moon: {
            ease: c('putting words to what you feel is easier', 'speak', 'open', 'smooth'),
            hard: c('feelings can colour how you read what people say', 'charged', 'open'),
            merge: c('thinking and feeling are hard to tell apart', 'narrow', 'open'),
        },
        Mercury: {
            ease: c('thinking and talk run clearly', 'narrow', 'speak', 'smooth'),
            hard: c('words and meanings can land crooked', 'charged', 'keep-open'),
            merge: c('thinking and talk work together', 'narrow', 'speak'),
        },
        Venus: {
            ease: c('talk about what you want goes smoothly', 'speak', 'smooth', 'outward'),
            hard: c('what you say about what you want may not land the way you mean it', 'charged', 'keep-open'),
            merge: c('talk and liking mix easily', 'speak', 'outward'),
        },
        Mars: {
            ease: c('clear thinking gets effort behind it', 'narrow', 'urgent', 'smooth'),
            hard: c('words can come out sharper than meant', 'charged', 'urgent'),
            merge: c('thinking and action move quickly together', 'narrow', 'urgent'),
        },
    },
    Venus: {
        Sun: {
            ease: c('what you like and what you are aiming at line up easily', 'outward', 'smooth', 'commit'),
            hard: c('what you want and what you are aiming at can pull in different directions', 'charged', 'keep-open', 'urgent'),
            merge: c('enjoyment and direction sit close together', 'outward', 'commit'),
        },
        Moon: {
            ease: c('warmth and ease come readily', 'open', 'smooth', 'outward', 'warmth'),
            hard: c('mood and preferences can pull apart', 'charged', 'open', 'keep-open'),
            merge: c('affection and mood sit close to the surface', 'open', 'outward', 'warmth'),
        },
        Mercury: {
            ease: c('talk about what you like goes smoothly', 'speak', 'smooth', 'outward'),
            hard: c('it can be hard to put what you like into words that land', 'charged', 'wide', 'keep-open'),
            merge: c('liking and thinking run together', 'narrow', 'outward'),
        },
        Venus: {
            ease: c('things go with less friction around what you like and who you like to be with', 'outward', 'smooth', 'open', 'warmth'),
            hard: c('what you want and what other people want may not line up', 'charged', 'keep-open'),
            merge: c('liking and pleasure sit close to the surface', 'outward', 'open', 'warmth'),
        },
        Mars: {
            ease: c('warmth and drive pull the same way', 'outward', 'smooth', 'urgent'),
            hard: c('what you want and how hard you push for it can clash', 'charged', 'urgent', 'keep-open'),
            merge: c('appetite and drive are easy to reach', 'outward', 'urgent'),
        },
    },
    Mars: {
        Sun: {
            ease: c('effort goes where you aim it', 'urgent', 'commit', 'begin'),
            hard: c('there is more push than patience, and a pull to prove something', 'urgent', 'charged'),
            merge: c('energy is easy to reach and easy to spend too fast', 'urgent', 'begin', 'commit'),
        },
        Moon: {
            ease: c('energy can go behind what you feel', 'urgent', 'open', 'smooth'),
            hard: c('irritation can come up quickly', 'urgent', 'charged', 'open', 'irritability'),
            merge: c('feeling and energy arrive together', 'urgent', 'open'),
        },
        Mercury: {
            ease: c('thinking and talk have energy behind them', 'urgent', 'speak', 'smooth'),
            hard: c('there is more edge in what you say', 'urgent', 'charged', 'speak'),
            merge: c('thinking and acting move quickly together', 'urgent', 'begin'),
        },
        Venus: {
            ease: c('energy goes toward what you enjoy and who you are with', 'urgent', 'outward', 'smooth'),
            hard: c('there is more edge and less patience around what you want and who you are with', 'urgent', 'charged'),
            merge: c('energy and appetite are easy to reach', 'urgent', 'begin'),
        },
        Mars: {
            ease: c('effort goes where it is pointed', 'urgent', 'begin', 'smooth'),
            hard: c('there is more edge and less patience', 'urgent', 'charged'),
            merge: c('energy is easy to reach and easy to spend too fast', 'urgent', 'begin'),
        },
    },
};
/**
 * WHAT A CONTACT TENDS TO DO, AS THE END OF A SENTENCE THAT NAMES ITS SOURCE FIRST.
 * "{Body} is in easy contact with {your point}, which tends to {meaning}" for a contact that eases or merges, and
 * "..., which can {meaning}" for one that comes with friction: a tendency, never a certainty. These are the SAME claims as
 * CONTACT_CLAUSE (whose `says` the tests check against the knowledge rows, and which the Life Dynamics explanation still
 * uses unchanged), rewritten so that the part a reader acts on is a plain verb phrase about their day, not a restatement
 * of the geometry.
 */
export const CONTACT_MEANING = {
    Moon: {
        Sun: { ease: 'make it easier to know what you want and to act on it', hard: 'pull what you feel and what you are aiming at in different directions', merge: 'bring what you feel and what you want close together' },
        Moon: { ease: 'make moods feel familiar and manageable', hard: 'keep moods close to the surface and harder to step back from', merge: 'make this a day of feeling most like yourself, easy moods and hard ones alike' },
        Mercury: { ease: 'make it easier to put what you think and what you feel into words', hard: 'let mood colour what you hear and what you say', merge: 'run thinking and mood together and help keep attention on one thing at a time' },
        Venus: { ease: 'bring warmth and ease with people', hard: 'make small slights weigh more than they should', merge: 'bring affection and pleasure close to the surface' },
        Mars: { ease: 'put energy behind what you feel strongly about', hard: 'wear patience thin', merge: 'bring feeling and effort together' },
    },
    Sun: {
        Sun: { ease: 'give your sense of direction a clear run', hard: 'stir a push to prove something', merge: 'make your sense of direction more noticeable, to you and to others' },
        Moon: { ease: 'give what you feel room alongside what you want', hard: 'pull what you feel away from what you want to show', merge: 'make your feelings more noticeable than usual' },
        Mercury: { ease: 'give your thinking a clear run and make it easy to put across', hard: 'push you to make your point before your thinking has settled', merge: 'make your thinking, and what you say, more noticeable than usual' },
        Venus: { ease: 'give what you enjoy and who you like to be with a clear run', hard: 'stir a push to have things your way where preferences differ', merge: 'make enjoyment and company more noticeable than usual' },
        Mars: { ease: 'give your drive a clear run', hard: 'turn drive into a push to prove something', merge: 'make your drive more noticeable than usual' },
    },
    Mercury: {
        Sun: { ease: 'help your ideas support what you are aiming at and come across clearly', hard: 'let what you say and what you mean come apart', merge: 'bring thinking and direction together' },
        Moon: { ease: 'make it easier to put words to what you feel', hard: 'let feelings colour how you read what people say', merge: 'make thinking and feeling hard to tell apart' },
        Mercury: { ease: 'keep thinking and talk running clearly', hard: 'let words be taken differently from how they were meant', merge: 'keep thinking and talk working together' },
        Venus: { ease: 'make talk about what you want go smoothly', hard: 'make what you say about what you want land differently from how you mean it', merge: 'let talk and liking mix easily' },
        Mars: { ease: 'put effort behind clear thinking', hard: 'let words come out sharper than meant', merge: 'move thinking and action quickly together' },
    },
    Venus: {
        Sun: { ease: 'line up what you like with what you are aiming at', hard: 'pull what you want and what you are aiming at in different directions', merge: 'bring enjoyment and direction close together' },
        Moon: { ease: 'bring warmth and ease readily', hard: 'pull mood and preferences apart', merge: 'bring affection and mood close to the surface' },
        Mercury: { ease: 'make talk about what you like go smoothly', hard: 'make it harder to put what you like into words that land', merge: 'run liking and thinking together' },
        Venus: { ease: 'ease things around what you enjoy and who you like to be with', hard: 'leave what you want and what other people want out of step', merge: 'bring liking and pleasure close to the surface' },
        Mars: { ease: 'make warmth and drive pull the same way', hard: 'set what you want against how hard you push for it', merge: 'bring desire and drive close to the surface' },
    },
    Mars: {
        Sun: { ease: 'send effort where you aim it', hard: 'add more push than patience, and a pull to prove something', merge: 'make energy easy to reach and easy to spend too fast' },
        Moon: { ease: 'put energy behind what you feel', hard: 'bring irritation up quickly', merge: 'bring feeling and energy together' },
        Mercury: { ease: 'put energy behind thinking and talk', hard: 'put more edge into what you say', merge: 'move thinking and action quickly together' },
        Venus: { ease: 'send energy toward what you enjoy and who you are with', hard: 'add edge and take patience away around what you want and who you are with', merge: 'bring energy and desire close to the surface' },
        Mars: { ease: 'send effort where you aim it', hard: 'add edge and take patience away', merge: 'make energy easy to reach and easy to spend too fast' },
    },
};
/**
 * WHAT THE CONTACT THE HEADLINE STANDS ON DOES FOR THAT LEAN (P1.6.3). The contact is narrated because it is what earns the headline, but its own sentence says what it
 * does in general ("send effort where you aim it"), and a reader who has just been told "small beginnings come more naturally today" cannot see that this is the reason.
 * Where the contact presses the pole at its primary weight and its sentence does not already say it, a clause is added: "..., and make a start easier". Never for a
 * tense contact (a friction is not the reason a day is recommended), and never where the meaning already carries the words.
 */
export const DRIVE_TAIL = {
    urgent: 'put energy behind what you do',
    unhurried: 'let the day take its time',
    wide: 'keep the mind open to more than one idea',
    narrow: 'keep attention on one thing',
    outward: 'draw you toward other people',
    inward: 'draw you toward time to yourself',
    begin: 'make a start easier',
    finish: 'help close things out',
    commit: 'help you settle on a choice',
    'keep-open': 'take the pressure off deciding',
    smooth: 'keep exchanges going smoothly',
    speak: 'help you say things plainly',
    listen: 'make listening come more naturally',
};
const POLE_STEM = {
    urgent: /energy|drive|push/i, narrow: /attention|one thing|focus|clear thinking/i, outward: /warmth|company|people|reaching out/i, wide: /ideas|curious|open/i,
    begin: /start|begin|first step/i, finish: /finish|clos|complet/i, commit: /decide|decision|know what you want|act on it|aiming/i, speak: /words|talk|say|put across|come across|speak/i,
    smooth: /ease|smooth/i, listen: /listen/i, inward: /alone|inward|yourself/i, unhurried: /pace|slow|time/i, 'keep-open': /options|open/i,
};
export const driveTail = (pole, meaning) => (DRIVE_TAIL[pole] && !POLE_STEM[pole]?.test(meaning) ? DRIVE_TAIL[pole] : null);
/** A contact that eases or merges tends to; one that comes with friction can. */
export const CONTACT_MODAL = { ease: 'tends to', merge: 'tends to', hard: 'can' };
/** Where a contact stands in its course, as the end of its sentence: a contact still building grows into the day, one that is fading is leaving it. */
export const CONTACT_COURSE = { peak: '', building: '', fading: ', though less as it passes' };
/** The tail of a contact sentence: only a benefit that is leaving needs "though less as it passes"; "easing out of tense contact" already says the friction is leaving. */
export const courseTail = (quality, timing) => (quality === 'hard' ? '' : CONTACT_COURSE[timing]);
/**
 * P1.6.2: WHEN A CONTACT HAS FRICTION, THE HUMAN MEANING COMES FIRST AND THE SOURCE FOLLOWS. A reader who has just been told the day may
 * run short on patience needs the patience first and the geometry second ("Patience can wear thin, with the Moon in tense contact with
 * your Mars"). Each line makes exactly the claims of CONTACT_CLAUSE[body][natal].hard (the tests compare the `says` of both), in the
 * plain "can" the evidence supports. Easy and merging contacts keep the source first: there, where the ease comes from is the news.
 */
export const HARD_FIRST = {
    Moon: {
        Sun: 'What you feel and what you are aiming at can pull in different directions',
        Moon: 'Moods can sit closer to the surface and be harder to step back from',
        Mercury: 'Mood can colour what you hear and what you say',
        Venus: 'Small slights can weigh more than they should',
        Mars: 'Patience can wear thin',
    },
    Sun: {
        Sun: 'There can be a push to prove something',
        Moon: 'What you feel can pull away from what you want to show',
        Mercury: 'There can be a push to make your point before your thinking has settled',
        Venus: 'There can be a push to have things your way where preferences differ',
        Mars: 'Drive can turn into a push to prove something',
    },
    Mercury: {
        Sun: 'What you say and what you mean can come apart',
        Moon: 'Feelings can colour how you read what people say',
        Mercury: 'Words can be taken differently from how they were meant',
        Venus: 'What you say about what you want can land differently from how you mean it',
        Mars: 'Words can come out sharper than meant',
    },
    Venus: {
        Sun: 'What you want and what you are aiming at can pull in different directions',
        Moon: 'Mood and preferences can pull apart',
        Mercury: 'It can be harder to put what you like into words that land',
        Venus: 'What you want and what other people want can be out of step',
        Mars: 'What you want can be set against how hard you push for it',
    },
    Mars: {
        Sun: 'There can be more push than patience, and a pull to prove something',
        Moon: 'Irritation can come up quickly',
        Mercury: 'There can be more edge in what you say',
        Venus: 'There can be more edge and less patience around what you want and who you are with',
        Mars: 'There can be more edge and less patience',
    },
};
/** The source of a contact as the end of a sentence that began with what it does: "..., with the Moon in tense contact with your Mars". */
export const TOUCH_WITH = {
    peak: 'in tense contact with', building: 'moving into tense contact with', fading: 'easing out of tense contact with',
};
export const OWN_PLACE_WITH = {
    peak: 'in tense contact with where it stood when you were born',
    building: 'moving into tense contact with where it stood when you were born',
    fading: 'easing out of tense contact with where it stood when you were born',
};
/** A plain sentence for a source the sky paragraph left out, said at the end of a caution that stands on it. */
export const CAUTION_SOURCE = (body, natal) => (body === natal
    ? `with ${BODY_SUBJECT[body].replace(/^The /, 'the ')} in tense contact with where it stood when you were born`
    : `with ${BODY_SUBJECT[body].replace(/^The /, 'the ')} in tense contact with ${NATAL_OBJECT[natal].name}`);
/** How a second contact joins the first, by how the two stand to each other. The connective is chosen by structure. */
export const CONNECTIVE = {
    reinforce: 'Adding to this, ',
    contrast: 'At the same time, ',
    compound: 'On top of that, ',
    mixed: 'Meanwhile, ',
    independent: 'Separately, ',
};
/** P1.6.3: the second of two contacts that are each other's reverse (the Moon to your Mars, Mars to your Moon) with the same quality on a different course. */
export const MIRROR_CONNECTIVE = 'Seen the other way round, ';
/**
 * P1.6.3: TWO CONTACTS THAT ARE EACH OTHER'S REVERSE, with the same quality and the same course, are one sentence ("The Moon is in easy contact with your Mars,
 * and Mars with your Moon, which tends to ..."). They are two facts and both stay in the sentence's basis, but said as two they were one meaning twice, and
 * "adding to this" told the reader the second was a further reason. Said once, with both sources named, nothing is counted twice.
 */
export function mirroredSentence(first, second, gloss) {
    const lower = (body) => BODY_SUBJECT[body].replace(/^The /, 'the ');
    const natal = NATAL_OBJECT[first.natal];
    const secondNatal = NATAL_OBJECT[second.natal].name;
    if (first.quality === 'hard') {
        return `${HARD_FIRST[first.body][first.natal]}, with ${lower(first.body)} ${TOUCH_WITH[first.timing]} ${natal.name}${gloss}, and ${lower(second.body)} with ${secondNatal}.`;
    }
    return `${BODY_SUBJECT[first.body]} ${TOUCH[first.quality][first.timing]} ${natal.name}${gloss}, and ${lower(second.body)} with ${secondNatal}, which ${CONTACT_MODAL[first.quality]} ${CONTACT_MEANING[first.body][first.natal][first.quality]}${courseTail(first.quality, first.timing)}.`;
}
/** The risk a friction in each area tends to show up as: the same pitfalls the plan already names, by what they are about. */
export const PITFALL_OF_AREA = {
    affection: 'wobbly-preferences', feeling: 'taking-things-personally', thinking: 'crossed-wires', drive: 'sharp-edges', direction: 'proving-a-point',
};
/**
 * One sentence on what two contacts that stand against each other MEAN for the day, said once, from the character of the
 * friction (the area its own body is about), and written so it is true beside any ease. It is said only where the two
 * contacts touch one area: two threads that touch nothing in common are said as two threads, with nothing made up to join them.
 */
export const CONTRAST_IN = {
    affection: 'Things can go smoothly and preferences can still differ, and keeping things relaxed makes the differences easier to handle.',
    feeling: 'The ease is real and so is the sensitivity, so it helps to go gently and not read too much into a passing remark.',
    thinking: 'Talk can flow and still be misread, so a moment to check what was meant is worth it.',
    drive: 'There is ease here and a shorter fuse, so it helps to keep the sharper moments away from the exchanges that matter.',
    direction: 'The ease goes further if the push to be right is left out of it.',
};
/** What an area of life is, as the thing two frictions may both press on. */
export const AREA_NOUN = {
    affection: 'what you want from other people',
    feeling: 'feeling',
    thinking: 'how things are said and heard',
    drive: 'drive and temper',
    direction: 'what you are aiming at',
};
export const compoundSentence = (area) => `Both press on ${AREA_NOUN[area]}, so small frictions can add up.`;
/* ------------------------------------------------------------------ the setting -- */
/** The Moon's phase, said only where it belongs to the day: `{why}` is what the day already leans toward. */
export const PHASE_FIT = {
    new: 'The Moon is new, a time that favours quiet starts over loud ones.',
    building: 'The Moon is building, which suits things that are still growing.',
    full: 'The Moon is full, which brings feeling and other people to the foreground.',
    clearing: 'The Moon is clearing, which suits finishing and letting go.',
};
export const HOUSE_THEME = {
    1: 'yourself and how you come across',
    2: 'what you have and what you value',
    3: 'talk, short trips and everyday contact',
    4: 'home and family',
    5: 'play, creativity and pleasure',
    6: 'daily work and routine',
    7: 'close partnerships',
    8: 'shared things and deep feeling',
    9: 'learning and the wider view',
    10: 'your work in the world and what you answer for',
    11: 'friends and groups',
    12: 'rest, retreat and what you keep private',
};
export const houseSentence = (house) => `The Moon is passing through the part of your chart that deals with ${HOUSE_THEME[house]}, which tends to bring that theme closer to mind.`;
export const ELEMENT_SENTENCE = {
    Fire: 'A fire-sign Moon adds a touch of spark, and of haste.',
    Earth: 'An earth-sign Moon steadies things and slows them a little.',
    Air: 'An air-sign Moon keeps talk and ideas moving.',
    Water: 'A water-sign Moon keeps feeling close to the surface.',
};
/** The same settings as the story says them: a tendency, not a state. (PHASE_FIT and ELEMENT_SENTENCE above are the Life Dynamics wording.) */
export const SETTING_PHASE = {
    new: 'The Moon is new, a time that tends to favour quiet starts over loud ones.',
    building: 'The Moon is building, which tends to suit things that are still growing.',
    full: 'The Moon is full, which tends to bring feeling and other people to the foreground.',
    clearing: 'The Moon is clearing, which tends to suit finishing and letting go.',
};
export const SETTING_ELEMENT = {
    Fire: 'The Moon is in a fire sign today, which tends to add a little spark, and some haste.',
    Earth: 'The Moon is in an earth sign today, which tends to steady things and slow them a little.',
    Air: 'The Moon is in an air sign today, which tends to keep talk and ideas moving.',
    Water: 'The Moon is in a water sign today, which tends to keep feeling close to the surface.',
};
/* -------------------------------------------- how the number and the sky stand -- */
/**
 * WHAT A POLE FAVOURS, as the object of "favours": the things a day's number or the sky can be said to ask for.
 * Written once so that "the number favours ..." and "the sky favours ..." are the same words for the same pole.
 */
export const POLE_FAVOUR = {
    urgent: 'putting your energy to use',
    unhurried: 'an unhurried pace',
    wide: 'an open, curious mind',
    narrow: 'steady attention to one thing',
    outward: 'reaching out to people',
    inward: 'time to yourself',
    open: 'staying in touch with how you feel',
    contained: 'staying matter-of-fact',
    begin: 'starting small',
    finish: 'finishing what is already open',
    commit: 'making a decision',
    'keep-open': 'keeping your options open',
    charged: '',
    smooth: 'easy exchanges',
    speak: 'saying things plainly',
    listen: 'listening before you answer',
};
/**
 * THE DAY'S NUMBER AND THE SKY GIVE THE SAME REASON. Each entry says what the sky adds, and what that makes of the day: the
 * sentence is "The day's N favours {POLE_FAVOUR}, and {sky}, so {so}." It is said only where an easy contact really presses the
 * pole the number presses (dayStory.ts, pillarsOf), so each clause is a claim the evidence makes.
 */
export const BRIDGE_AGREE = {
    /* A consequence that only says the same thing again is not written (P1.6.2): "the sky helps it hold, so staying with one task may take less effort" was one claim twice. */
    begin: { sky: 'the sky puts little in the way', so: null },
    unhurried: { sky: 'the sky leaves room for it', so: null },
    listen: { sky: 'the sky makes exchanges easier', so: null },
    speak: { sky: 'the sky smooths the way', so: null },
    outward: { sky: 'the sky eases contact', so: null },
    wide: { sky: 'the sky gives it room', so: null },
    'keep-open': { sky: 'the sky gives it room', so: null },
    narrow: { sky: 'the sky helps it hold', so: null },
    open: { sky: 'the sky draws attention the same way', so: 'what you feel may be worth taking seriously today' },
    inward: { sky: 'the sky leaves room for it', so: null },
    commit: { sky: 'the sky makes it easier to know your own mind', so: 'it is a fair moment to settle something that has been waiting' },
    finish: { sky: 'the sky makes closing things easier', so: null },
};
/**
 * THE DAY'S NUMBER AND THE SKY LEAN OPPOSITE WAYS. "The day's N favours {POLE_FAVOUR[pole]}, while the sky favours
 * {POLE_FAVOUR[opposite]}, so {resolve}." The resolution is the one the plan itself reaches for each pair (a tension's way
 * through), not a new recommendation.
 */
export const BRIDGE_DIFFER = {
    begin: 'closing one thing before beginning the next may suit both',
    finish: 'closing one thing before beginning the next may suit both',
    unhurried: 'keeping the effort in short bursts, with an easy pace between, may suit both',
    listen: 'saying one clear thing and then listening may suit both',
    speak: 'saying what matters once and then listening may suit both',
    outward: 'a little company and a little time alone, each kept short, may suit both',
    inward: 'a little time alone and a little company, each kept short, may suit both',
    wide: 'looking around first and then settling on one thing may suit both',
    narrow: 'staying with one thing while keeping a note of the others may suit both',
    'keep-open': 'deciding only what is ready and leaving the rest open may suit both',
    commit: 'deciding only what is ready and leaving the rest open may suit both',
    open: 'taking what you feel seriously without letting it run the day may suit both',
};
/**
 * THE NUMBER'S LEAN WITH THE SKY'S FRICTION BESIDE IT, when no contact of the day eases anything: what the friction is about
 * (AREA_NOUN) and what to mind (the same advice the sky paragraph gives a friction beside an ease, CONTRAST_IN's second half).
 */
export const TEMPER_MIND = {
    affection: 'keeping things relaxed makes differences easier to handle',
    feeling: 'it helps to go gently and not read too much into a passing remark',
    thinking: 'a moment to check what was meant is worth it',
    drive: 'keeping the sharper moments away from the exchanges that matter helps',
    direction: 'leaving out the push to be right helps',
};
/**
 * WHAT THE RESOLUTION OF A DIFFERING PAIR SAYS, in the plan's own keys: the way through the plan's tension for that pair (a "way:" line
 * under "what may come easier"), or the lean it reconciles. Said once, in the opening, and the matching easier line is not repeated.
 */
export const DIFFER_SAYS = {
    begin: ['way:axis:motion'], finish: ['way:axis:motion'],
    unhurried: ['way:axis:pace'],
    listen: ['way:axis:expression'], speak: ['way:axis:expression', 'way:speak-vs-friction'],
    outward: ['way:axis:contact'], inward: ['way:axis:contact'],
    wide: ['way:axis:focus'], narrow: ['way:axis:focus'],
    'keep-open': ['way:axis:commitment', 'approach:commit'], commit: ['way:axis:commitment'],
};
/**
 * WHAT THE SKY IS ABOUT, in the words of the person it touches (P1.6.2): used where the opening says which part of life a contact speaks to,
 * so "the sky adds a little in the same direction" names where, and "the sky toward straight talk" says through what.
 */
export const AREA_THROUGH = {
    direction: 'your sense of direction',
    feeling: 'how you feel',
    thinking: 'how you think and talk',
    affection: 'what you enjoy and who you like to be with',
    drive: 'your drive',
};
/**
 * THE POLE EACH "BETTER THAN" LINE ADVISES. The plan sets a lead against one thing (its contrast) and the line for it states the lean that
 * serves the day better than that thing. When the opening has just said the same lean ("The day's 7 favours steady attention to one
 * thing"), the limit line would say it a second time in other words: it is folded into the first sentence instead (dayStoryEnglish.ts, openingOf).
 */
export const LIMIT_POLE = {
    rushing: 'unhurried', 'closing-options-early': 'keep-open', 'splitting-attention': 'narrow', 'opening-new-fronts': 'finish',
    'forcing-a-conclusion': 'keep-open', 'pressing-a-point': 'listen', 'pressing-your-case': 'listen', 'pushing-feelings-aside': 'open',
};
/** Two poles that ask for the same thing in a reader's terms ("an open, curious mind" and "keeping your options open"): the same lean for the purpose of saying it once. */
export const sameLean = (a, b) => a === b || (a === 'wide' && b === 'keep-open') || (a === 'keep-open' && b === 'wide');
/**
 * Two leans that ask for opposite things: the opposite pole on the same axis, or an open mind and open options against a settled one ("keep the ideas
 * open" after "something that has been waiting may be easier to settle"). Said one after the other with no word between them, they read as a contradiction.
 */
export const opposedLean = (a, b) => {
    const open = (pole) => pole === 'wide' || pole === 'keep-open';
    const settled = (pole) => pole === 'narrow' || pole === 'commit';
    return OPPOSITE_POLE[a] === b || (open(a) && settled(b)) || (settled(a) && open(b));
};
/** The word between two sentences of one opening that lean opposite ways: the second says what holds even so. */
export const OPPOSED_LEAD = 'Even so, ';
/** What the lean is better than, as the end of "... serves the day better than ...". */
export const LIMIT_THAN = {
    rushing: 'pushing the pace',
    'closing-options-early': 'settling things too early',
    'splitting-attention': 'spreading yourself across several things',
    'opening-new-fronts': 'opening several new fronts',
    'forcing-a-conclusion': 'forcing a conclusion',
    'pressing-a-point': 'pressing a point',
    'pressing-your-case': 'pressing your own case',
    'pushing-feelings-aside': 'carrying on regardless of how you feel',
};
export function pillarSentence(context, friction = false) {
    const { relation, dayNumber, pole, skyArea } = context;
    const topics = { number: context.numberTopic, sky: context.skyTopic };
    const favour = POLE_FAVOUR[pole];
    if (!favour)
        return null;
    /* The numbers paragraph under it says "The day's number, 4, ..." with the plain apostrophe: the same words, the same mark. The number follows "number" so it is never itself the noun ("the day's 4"). */
    const day = `The day's number, ${dayNumber},`;
    switch (relation) {
        case 'agree': {
            const row = BRIDGE_AGREE[pole];
            /* An easy contact that gives the same reason does not make the whole sky easy: where a tense contact is also narrated, the sentence says so. */
            return row ? { text: row.so === null
                    ? `${day} favours ${favour}, and ${row.sky}${friction ? ', though not without some friction' : ''}.`
                    : `${day} favours ${favour}, and ${row.sky}, so ${row.so}${friction ? ', even with some friction in the sky' : ''}.`, claims: [`bridge:agree:${pole}`] } : null;
        }
        case 'differ': {
            const resolve = BRIDGE_DIFFER[pole];
            const other = POLE_FAVOUR[OPPOSITE_POLE[pole]];
            return resolve && other ? { text: `${day} favours ${favour}, while the sky ${context.skyQuality === 'hard' ? 'pushes toward' : 'favours'} ${other}, so ${resolve}.`, claims: [`bridge:differ:${pole}`, ...(DIFFER_SAYS[pole] ?? [])] } : null;
        }
        case 'complement':
            /* The sentence says through WHAT the sky points there: without it, it only repeats the headline. */
            return topics.number && topics.sky
                ? { text: `${day} points toward ${TITLE_NOUN[topics.number]}, and the sky toward ${TITLE_NOUN[topics.sky]}.`, claims: [`bridge:complement:${topics.number}+${topics.sky}`] }
                : null;
        case 'overlap':
            /* A real, smaller agreement: the sky presses the same pole as a secondary effect. It is said as exactly that, never as "the sky helps". */
            return skyArea ? { text: `${day} favours ${favour}, and part of the sky adds to that, through ${AREA_THROUGH[skyArea]}.`, claims: [`bridge:overlap:${pole}`] } : null;
        /* No contact touches the number's lean at any weight: the number is simply stated. Nothing here talks about the evidence itself. */
        case 'number-led':
            return { text: `${day} favours ${favour}.`, claims: [`bridge:number-led:${pole}`] };
        case 'friction':
            return skyArea ? { text: `The sky adds some friction around ${AREA_NOUN[skyArea]}, so ${TEMPER_MIND[skyArea]}.`, claims: [`friction:${skyArea}`, `caution:${PITFALL_OF_AREA[skyArea]}`] } : null;
        case 'tempered':
            return skyArea ? { text: `${day} favours ${favour}, though the sky adds some friction around ${AREA_NOUN[skyArea]}, so ${TEMPER_MIND[skyArea]}.`, claims: [`bridge:tempered:${pole}`, `caution:${PITFALL_OF_AREA[skyArea]}`] } : null;
        /* Two pillars with nothing in common are kept apart: no sentence is written to join them. */
        case 'separate':
            return null;
        case 'numbers-only':
            return { text: `${day} favours ${favour}.`, claims: [`bridge:numbers-only:${pole}`] };
    }
}
/* ---------------------------------------------------------------------- title -- */
/** What an activity is called in a headline. Short on purpose: two must fit a phone's title. */
export const TITLE_NOUN = {
    'deep-work': 'focused work',
    'editing-and-review': 'refining existing work',
    brainstorming: 'exploring ideas',
    planning: 'planning ahead',
    administration: 'clearing loose ends',
    'difficult-conversation': 'straight talk',
    'social-connection': 'connection',
    'creative-exploration': 'creative exploration',
    'finishing-work': 'finishing things off',
    'starting-work': 'a fresh start',
    'physical-activity': 'physical activity',
    rest: 'rest',
    research: 'looking into things',
    negotiation: 'reaching agreement',
    'cleanup-organisation': 'putting things in order',
};
/**
 * What an activity is called when a headline names TWO of them: both in the same grammatical form, so "A day for spending time
 * with people and exploring ideas" reads as one thought and not as a noun glued to a gerund ("connection and exploring ideas").
 */
export const TITLE_GERUND = {
    'deep-work': 'focusing',
    'editing-and-review': 'refining existing work',
    brainstorming: 'exploring ideas',
    planning: 'planning ahead',
    administration: 'clearing loose ends',
    'difficult-conversation': 'speaking plainly',
    'social-connection': 'spending time with people',
    'creative-exploration': 'exploring something creative',
    'finishing-work': 'finishing things off',
    'starting-work': 'making a fresh start',
    'physical-activity': 'being active',
    rest: 'resting',
    research: 'looking into things',
    negotiation: 'reaching agreement',
    'cleanup-organisation': 'putting things in order',
};
/** What an activity is called as the second thing a day "has room for": a noun phrase that follows "room for". */
export const ROOM_NOUN = {
    'deep-work': 'focused work',
    'editing-and-review': 'refining existing work',
    brainstorming: 'new ideas',
    planning: 'planning',
    administration: 'clearing loose ends',
    'difficult-conversation': 'a direct conversation',
    'social-connection': 'time with people',
    'creative-exploration': 'something creative',
    'finishing-work': 'finishing things off',
    'starting-work': 'a first step',
    'physical-activity': 'physical activity',
    rest: 'rest',
    research: 'looking into things',
    negotiation: 'reaching agreement',
    'cleanup-organisation': 'putting things in order',
};
/** The pace of the day, as the adjective before "day": said only when a pole the day leads on carries it. */
export const TONE_ADJECTIVE = { gentle: 'gentler', steady: 'steady', active: 'active' };
/** A pole as a headline phrase, when no activity leads and the day is named by what it leans on. Short on purpose. */
export const STANCE_TITLE = {
    urgent: 'using your momentum',
    unhurried: 'taking things slowly',
    wide: 'keeping an open mind',
    narrow: 'paying steady attention',
    outward: 'reaching out',
    inward: 'having time to yourself',
    open: 'staying close to feeling',
    contained: 'keeping things matter-of-fact',
    begin: 'beginning small',
    finish: 'finishing what is open',
    commit: 'making a decision',
    'keep-open': 'keeping options open',
    charged: '',
    smooth: 'taking the easy exchanges first',
    speak: 'speaking plainly',
    listen: 'listening first',
};
/** A tension as a headline: what to do about it. */
export const TENSION_HEADLINE = {
    'begin-vs-hold': 'A day to begin small',
    'decide-vs-friction': 'A day to decide only your own part',
    'speak-vs-friction': 'A day to say less',
    'axis:pace': 'A day to choose one pace',
    'axis:focus': 'A day to choose depth over range',
    'axis:contact': 'A day for company and quiet in turn',
    'axis:feeling': 'A day of changeable feeling',
    'axis:motion': 'A day to close before you open',
    'axis:commitment': 'A day to settle only what is ready',
    'axis:friction': 'A day to start with the easy exchanges',
    'axis:expression': 'A day to listen before you speak',
};
/* -------------------------------------------------------------------- opening -- */
/** What it is like to be on a day that leads on this pole, said as a clause. */
export const STATE_CLAUSE = {
    urgent: 'there is energy to use',
    unhurried: 'the pace is gentler',
    wide: 'your mind is open and curious',
    narrow: 'attention holds well on detail',
    outward: 'conversation and company come easily',
    inward: 'you may want time to yourself',
    open: 'feeling runs close to the surface',
    contained: 'it is easier to stay matter-of-fact',
    begin: 'small beginnings come naturally',
    finish: 'it is easier to close things out',
    commit: 'decisions come more easily',
    'keep-open': 'there is less pressure to decide',
    charged: '',
    smooth: 'exchanges tend to go easily',
    speak: 'it is easy to say things plainly',
    listen: 'listening comes more naturally than arguing',
};
/**
 * WHAT THE DAY'S LEAD IS BETTER THAN, as advice that does not repeat the headline's own words. The plan sets a lead against one
 * thing worth naming (its "contrast"), and the card used to restate the lead's activities to say so ("Open-ended thinking and
 * time with other people suit the day better than settling things too early"). The headline has said what the day suits; this says
 * what to leave alone, and stands in the place of the identical "avoid" line (which the card does not repeat under "needs care").
 */
export const LIMIT_ADVICE = {
    rushing: 'It may be better to go at the day’s own pace than to push it.',
    'closing-options-early': 'It may be better to look around than to settle things too early.',
    'splitting-attention': 'It may be better to do one thing at a time than several at once.',
    'forced-sociability': 'Company may work best in small doses, since a crowded schedule can wear thin.',
    'pushing-feelings-aside': 'It may be better to make room for how you feel than to carry on regardless.',
    'pressing-for-openness': 'An emotional conversation is better invited than pressed.',
    'opening-new-fronts': 'It may be better to close what is open than to open several new fronts.',
    'forcing-a-conclusion': 'A conclusion is better left to arrive than forced.',
    'pressing-a-point': 'It may be better to let a point rest than to press it.',
    'pressing-your-case': 'It may be better to hear the other side first than to press your own case.',
};
/**
 * THE SAME LIMIT, SAID FOR THE KIND OF DAY IT SITS IN. "One thing at a time" is true of every day set against splitting attention;
 * what that means differs for a day of company and a day of work. The three limits that account for nine in ten of all openings
 * have a sentence per kind of day, and the general one above is the fallback.
 */
export const LIMIT_IN = {
    'splitting-attention': {
        focus: 'It may be better to stay with one piece of work than to spread yourself across several.',
        people: 'It may be better to give one conversation your full attention than to have several at once.',
        ideas: 'It may be better to follow one idea a little further than to chase several at once.',
        closing: 'It may be better to finish one thing properly than to half-finish several.',
        start: 'It may be better to start one thing than to start several.',
        move: 'It may be better to keep to one kind of effort than to mix several.',
    },
    'closing-options-early': {
        ideas: 'It may be better to keep your ideas open than to settle on any one too early.',
        people: 'It may be better to hear people out than to settle things too early.',
        focus: 'It may be better to leave the final form open for now than to settle it too early.',
        closing: 'It may be better to look over what is open before you close any of it than to close too early.',
        start: 'It may be better to leave the plan loose than to lock it in too early.',
        move: 'It may be better to try a few things than to settle on one thing too early.',
    },
    'opening-new-fronts': {
        people: 'It may be better to finish the conversations already open than to start several new ones.',
        focus: 'It may be better to finish what is already on the desk than to open several new fronts.',
        ideas: 'It may be better to follow up the ideas you already have than to open several new ones.',
    },
};
/** An activity as the thing a day suits, inside a sentence. */
export const FIT_NOUN = {
    'deep-work': 'focused work',
    'editing-and-review': 'revising what already exists',
    brainstorming: 'open-ended thinking',
    planning: 'planning the next steps',
    administration: 'clearing practical loose ends',
    'difficult-conversation': 'a direct conversation',
    'social-connection': 'time with other people',
    'creative-exploration': 'creative exploration',
    'finishing-work': 'finishing what is already open',
    'starting-work': 'starting something new',
    'physical-activity': 'physical activity',
    rest: 'rest',
    research: 'looking into things properly',
    negotiation: 'reaching agreement',
    'cleanup-organisation': 'putting things in order',
};
/* --------------------------------------------------------------------- easier -- */
export const EASIER_BASE = {
    urgent: 'Using the momentum while it lasts.',
    unhurried: 'Letting things take the time they take.',
    wide: 'Curiosity and loose, open-ended thinking.',
    narrow: 'Steady attention to detail.',
    outward: 'Reaching out to other people.',
    inward: 'Time to yourself.',
    open: 'Paying attention to what you feel.',
    contained: 'Staying matter-of-fact.',
    begin: 'Small beginnings.',
    finish: 'Finishing and clearing what is already open.',
    commit: 'Making the call on something that has waited.',
    'keep-open': 'Keeping your options open a little longer.',
    charged: '',
    smooth: 'Using the easy exchanges while they are easy.',
    speak: 'Saying things plainly.',
    listen: 'Listening before you answer.',
};
/** The same approach, said for the kind of day it sits inside: where the base line would be generic, this one is about the day. */
export const EASIER_IN = {
    open: {
        people: 'Letting how you feel set the tone with the people around you.',
        focus: 'Noticing how you feel and working with it rather than past it.',
        start: 'Starting from what you actually feel like doing.',
        ideas: 'Following what interests you rather than what is expected.',
        quiet: 'Noticing how you feel without acting on it straight away.',
        closing: 'Noticing what you feel about what you are closing out.',
        move: 'Letting how you feel set the pace of the activity.',
    },
    outward: {
        focus: 'Short, useful exchanges with other people.',
        quiet: 'Brief, easy contact with people.',
        start: 'Telling someone what you are about to begin.',
        ideas: 'Talking ideas through with another person.',
        closing: 'Asking someone to help you close something out.',
        people: 'Making the first contact yourself.',
        move: 'Moving with other people rather than alone.',
    },
    commit: {
        people: 'Settling something you have already talked through.',
        focus: 'Choosing a direction for the work in front of you.',
        ideas: 'Picking one idea to take further.',
        start: 'Committing to a first step.',
        closing: 'Deciding what is finished and what is not.',
        move: 'Choosing what to do before you start, and keeping to it.',
    },
    speak: {
        people: 'Saying what you mean without dressing it up.',
        focus: 'Explaining your thinking in plain words.',
        ideas: 'Putting a rough idea into words.',
        start: 'Saying out loud what you are about to do.',
        move: 'Saying aloud what you plan to do.',
        closing: 'Saying plainly what is finished and what is not.',
    },
    smooth: {
        people: 'Starting with the conversations that come easily.',
        focus: 'Handling the easy requests first.',
        start: 'Beginning where there is the least resistance.',
        ideas: 'Sharing ideas where they are likely to be welcome.',
        closing: 'Closing the easy items first.',
        quiet: 'Keeping the day’s exchanges easy.',
        move: 'Choosing the easy way into it.',
    },
    inward: {
        people: 'A little time alone between conversations.',
        focus: 'Time alone with the work.',
        ideas: 'Letting ideas settle before you share them.',
        start: 'Thinking it through alone before you begin.',
        closing: 'Time alone to finish what is nearly done.',
        move: 'Moving alone, at your own pace.',
    },
    urgent: {
        focus: 'Using the energy on the task that matters most.',
        people: 'Using the energy to make contact.',
        ideas: 'Putting energy behind the idea that interests you most.',
        quiet: 'Short bursts of effort between quieter stretches.',
        start: 'Using the energy to get the first step done.',
    },
    'keep-open': {
        people: 'Leaving room for other people’s preferences.',
        focus: 'Leaving the final form of the work open for now.',
        start: 'Not locking in the whole plan yet.',
        ideas: 'Keeping several ideas alive a little longer.',
        quiet: 'Leaving the day loosely planned.',
        closing: 'Not deciding yet what to let go of.',
    },
    listen: {
        people: 'Listening, and looking for common ground before settling anything.',
        focus: 'Reading and listening before changing anything.',
        ideas: 'Hearing other views before refining your own.',
        start: 'Listening to what is needed before you begin.',
    },
    unhurried: {
        people: 'Letting conversations take the time they need.',
        focus: 'Letting the work take the time it takes.',
        start: 'Taking the first step at an easy pace.',
    },
    finish: {
        people: 'Wrapping up conversations that are still open.',
        ideas: 'Closing one thread of thinking before opening another.',
        move: 'Ending the activity while it still feels good.',
        quiet: 'Letting something small come to a close.',
    },
    wide: {
        focus: 'Looking wider before you narrow down.',
        closing: 'Looking over what is open before you close any of it.',
        move: 'Trying a different route or routine.',
    },
    narrow: {
        people: 'Giving one conversation your full attention.',
        start: 'Keeping the first step small and specific.',
    },
    contained: {
        people: 'Keeping exchanges matter-of-fact.',
        focus: 'Keeping the work matter-of-fact.',
    },
    begin: {
        focus: 'Starting with the smallest piece of the work.',
        people: 'Opening a conversation while it is easy to open.',
        ideas: 'Starting with the roughest version of an idea.',
        move: 'Starting with a short, easy session.',
    },
};
/* ----------------------------------------------------------------------- care -- */
/** A caution says what the risk is; the move, below it, says what to do. Whole sentences, so they can share a heading. */
export const WATCH_CARE = {
    'crossed-wires': 'Messages can land differently from how they were meant.',
    'sharp-edges': 'Words can come out sharper than intended, and tempers can run short.',
    'taking-things-personally': 'Passing remarks can feel more pointed than they are.',
    'wobbly-preferences': 'What you want can shift while you are deciding.',
    'proving-a-point': 'There can be a pull to prove a point that does not need proving.',
};
/** What a day's friction comes from, in plain words, for a contest between a push and an edge. */
export const FRICTION_NOUN = {
    Mercury: 'crossed wires',
    Mars: 'short tempers',
    Moon: 'touchy moods',
    Venus: 'differing preferences',
    Sun: 'a need to be right',
};
/** The same pull, said when the friction has already been named once in the reading: it does not name it again. */
export function pullAgain(tension) {
    switch (tension) {
        case 'decide-vs-friction': return 'The push to settle things may run into the same friction.';
        case 'speak-vs-friction': return 'There may be plenty to say, and it can land harder than intended.';
        case 'axis:friction': return 'Easy exchanges may sit beside harder ones.';
        default: return pullSentence(tension, null);
    }
}
/** What pulls, said from where the friction comes when the evidence names it, and once otherwise. */
export function pullSentence(tension, edge) {
    const noun = edge ? FRICTION_NOUN[edge] : null;
    switch (tension) {
        case 'decide-vs-friction':
            return noun ? `The push to settle things may run into ${noun}.` : 'The push to settle things may meet some friction.';
        case 'speak-vs-friction':
            return noun ? `There may be plenty to say, and with ${noun} it can land harder than intended.` : 'There may be plenty to say, and it may land harder than intended.';
        case 'axis:friction':
            return noun ? `Exchanges that go easily may sit beside ${noun}.` : 'Easy exchanges may sit beside harder ones.';
        case 'begin-vs-hold': return 'There is more momentum to begin than clarity to commit.';
        case 'axis:pace': return 'One part of the day pushes forward and another asks to slow down.';
        case 'axis:focus': return 'Attention pulls toward range and toward depth.';
        case 'axis:contact': return 'Company and quiet pull against each other.';
        case 'axis:feeling': return 'Feeling may sit close to the surface in some hours and out of reach in others.';
        case 'axis:motion': return 'Starting and closing pull against each other.';
        case 'axis:commitment': return 'Deciding and waiting pull against each other.';
        case 'axis:expression': return 'There may be something to say, and just as much reason to listen first.';
    }
}
const you = (text) => ({ form: 'you', text });
const event = (text) => ({ form: 'event', text });
export const RISING_PHRASE = {
    sensitivity: you('be more alert to tone and atmosphere'),
    impatience: you('be quicker to feel impatient'),
    irritability: event('small irritations may land harder than usual'),
    restlessness: event('it may be harder to settle to one thing'),
    warmth: event('warmth toward the people around you may come easily'),
    reflectiveness: you('feel quiet and reflective'),
    wistfulness: you('feel drawn to look back, a little wistfully'),
    'self-assurance': you('feel more sure of yourself'),
};
/** A feeling that is hard to settle and the capacity to step back from a mood, said as one thought with one "harder" (P1.6.4): never "...harder to settle to one thing, and stepping back from a mood may be harder". */
export const SETTLE_AND_STEP_BACK = 'It may be harder to settle to one thing and to step back from a mood.';
export const QUIETER_CLAUSE = {
    patience: 'patience may take more effort',
    'emotional-distance': 'stepping back from a mood may be harder',
    'access-to-feelings': 'putting words to what you feel may take more effort',
    'appetite-for-company': 'the pull toward company may be quieter than usual',
    spontaneity: 'spontaneity may be harder to come by',
    'staying-power': 'staying with a long task may take more effort',
};
/** A feeling and the capacity that is its counterpart: said once, as one thought, never twice. */
export const COUNTERPART = {
    patience: 'impatience', 'emotional-distance': 'sensitivity', 'staying-power': 'restlessness', 'appetite-for-company': 'reflectiveness',
    'access-to-feelings': 'self-assurance', spontaneity: 'reflectiveness',
};
/** Two feelings that belong together, said as one thought. */
export const RISING_PAIR = {
    'sensitivity+warmth': 'You may be more attentive to how people speak to you: warmth can feel especially welcome, and a curt tone can stand out.',
    'sensitivity+impatience': 'Tone may matter more than usual, and patience may run short.',
    'impatience+sensitivity': 'Tone may matter more than usual, and patience may run short.',
    'self-assurance+sensitivity': 'You may feel sure of yourself while staying alert to how things are said.',
    'sensitivity+self-assurance': 'You may feel sure of yourself while staying alert to how things are said.',
    /* P1.6.4: two feelings that each name a different verb are one sentence with one subject, not "you may be quicker to feel impatient and feel more sure of yourself". */
    'impatience+self-assurance': 'You may feel more sure of yourself and be quicker to feel impatient.',
    'self-assurance+impatience': 'You may feel more sure of yourself and be quicker to feel impatient.',
};
/** A feeling the plan is only moderately sure of, said softly and alone: a whole sentence, never a suffix on another. */
export const SOFT_RISING = {
    sensitivity: 'You may be a little more alert to tone and atmosphere than usual.',
    impatience: 'You may be a little quicker to feel impatient.',
    irritability: 'Small irritations may land a little harder than usual.',
    restlessness: 'It may be a little harder to settle to one thing.',
    warmth: 'Warmth toward the people around you may come a little more easily.',
    reflectiveness: 'You may feel a little more reflective than usual.',
    wistfulness: 'You may feel a faint pull to look back.',
    'self-assurance': 'You may feel a little more sure of yourself.',
};
export const SOFT_QUIETER = {
    patience: 'Patience may take a little more effort.',
    'emotional-distance': 'Stepping back from a mood may be a little harder.',
    'access-to-feelings': 'Putting words to what you feel may take a little more effort.',
    'appetite-for-company': 'The pull toward company may be a little quieter than usual.',
    spontaneity: 'Spontaneity may be a little harder to come by.',
    'staying-power': 'Staying with a long task may take a little more effort.',
};
export const MOVE_CLASS_OF = {
    'social-connection': 'people', 'difficult-conversation': 'people', negotiation: 'people',
    'starting-work': 'start',
    'deep-work': 'solo', 'editing-and-review': 'solo', brainstorming: 'solo', planning: 'solo', administration: 'solo', 'creative-exploration': 'solo',
    'finishing-work': 'solo', 'physical-activity': 'solo', rest: 'solo', research: 'solo', 'cleanup-organisation': 'solo',
};
/** The reason a pitfall move is wanted today, when a tense contact of the day is the usual source of that pitfall. */
export const MOVE_SOURCE = {
    'taking-things-personally': 'Today’s tense contact makes small remarks easier to take the wrong way.',
    'crossed-wires': 'Wording is likelier to be misread today, so a short check costs little.',
    'sharp-edges': 'Temper may come up faster than usual, so a pause is worth more than usual.',
    'proving-a-point': 'The pull to be right is stronger than usual, so letting one small point go costs little.',
    'wobbly-preferences': 'What you want may shift while you decide, so the smaller choice is the safer one.',
};
export const MOVE_DIFFER = 'The sky leans the other way, so keep it small and let it end there.';
/**
 * "The sky favours {what} today.": the easy contact is named by what it favours, never as "an easier contact". It stops there: "... so it may come more easily" said
 * the same thing a second time (the move is easier because the sky favours it), and the reader can see for themselves what a favoured lean does for the action above it.
 */
export const moveEase = (pole) => (POLE_FAVOUR[pole] ? `The sky favours ${POLE_FAVOUR[pole]} today.` : null);
/** What a tense contact asks of a move, by the kind of move and by what the friction is about. */
export const MOVE_EDGE = {
    people: {
        'edge-tone': 'Keep it light: a friendly exchange does not need an outcome.',
        'edge-wording': 'Keep the wording simple, since how it is read may differ from how it was meant.',
        'edge-push': 'Keep it short, since tempers may run short if it drags on.',
    },
    start: {
        'edge-push': 'Keep the first step small: the push to do too much too fast is stronger than usual.',
    },
};
/** For the kinds of move a gentler day suits. */
export const MOVE_GENTLE = {
    'activity:social-connection': 'Keep it light: a friendly exchange does not need an outcome.',
    'activity:rest': 'It does not need a purpose.',
    'activity:difficult-conversation': 'Listening counts as much as saying.',
    'activity:planning': 'Stopping there is part of the plan.',
};
/* -------------------------------------------------- why the headline (P1.6.3) -- */
/**
 * WHY THIS IS THE HEADLINE, in the words of the day and with no planet named (the sky paragraph, a paragraph below, names the source).
 * One sentence for each activity and for each pole that can make it a lead, written for that activity: "There is energy to put to use today, and being
 * active is a natural way to use it" is not "X, which suits Y" with the nouns swapped. Each makes exactly the claim the pole makes (the day's own facts
 * press that pole at their primary weight, dayComposition.ts) and the claim the plan already made when it chose the activity; no outcome, no event.
 */
export const BECAUSE = {
    'deep-work': { narrow: 'Attention holds on one thing more readily today, which suits work that needs concentration.' },
    'editing-and-review': {
        narrow: 'Attention holds on detail today, so going back over what already exists is a good use of it.',
        'keep-open': 'There is less pressure to decide today, so there is room to revisit what already exists.',
    },
    administration: { narrow: 'Attention holds on detail today, so practical loose ends are a good use of it.' },
    research: {
        narrow: 'Attention holds on detail today, which suits looking into things properly.',
        inward: 'A quieter, more reflective mood today leaves room to look into things properly.',
    },
    planning: {
        commit: 'Decisions come more readily today, which makes this a good moment to work out the next steps.',
        narrow: 'Attention holds on detail today, which suits working out the next steps.',
    },
    'finishing-work': { finish: 'Closing things out tends to come more easily today.' },
    'cleanup-organisation': {
        finish: 'Closing things out tends to come more easily today, so putting things in order is a good use of it.',
        narrow: 'Attention holds on detail today, which suits putting things in order.',
    },
    'social-connection': { outward: 'Conversation and company come more easily today.' },
    'difficult-conversation': {
        speak: 'Saying things plainly comes more easily today and exchanges tend to go smoothly, which suits a direct conversation.',
        smooth: 'Saying things plainly comes more easily today and exchanges tend to go smoothly, which suits a direct conversation.',
    },
    negotiation: {
        commit: 'Decisions come more readily today and exchanges tend to go smoothly, which suits reaching agreement.',
        smooth: 'Decisions come more readily today and exchanges tend to go smoothly, which suits reaching agreement.',
    },
    brainstorming: { wide: 'The mind is open and curious today, which suits exploring ideas.' },
    'creative-exploration': { wide: 'There is room to follow your curiosity today, so trying something creative is a good use of it.' },
    'starting-work': { begin: 'Small beginnings come more naturally today.' },
    'physical-activity': { urgent: 'There is energy to put to use today, and being active is a natural outlet for it.' },
    rest: {
        inward: 'You may want time to yourself today, and the day leaves room for it.',
        unhurried: 'The pace is gentler today, which makes rest the natural choice.',
        listen: 'Listening comes more naturally than arguing today, which suits a quieter day.',
    },
};
/** The day's quality as the head of one sentence, for two activities that stand on the same pole: "Attention holds on detail today, which suits focused work and putting things in order." */
export const BECAUSE_HEAD = {
    narrow: 'Attention holds on detail today',
    finish: 'Closing things out tends to come more easily today',
    commit: 'Decisions come more readily today',
    wide: 'The mind is open and curious today',
    inward: 'A quieter mood today leaves room for time alone',
    outward: 'Conversation and company come more easily today',
    urgent: 'There is energy to put to use today',
    unhurried: 'The pace is gentler today',
    begin: 'Small beginnings come more naturally today',
    'keep-open': 'There is less pressure to decide today',
    speak: 'Saying things plainly comes more easily today',
    listen: 'Listening comes more naturally than arguing today',
    smooth: 'Exchanges tend to go smoothly today',
};
/**
 * WHEN NO ONE INFLUENCE PRESSES THE POLE AT ITS PRIMARY WEIGHT BUT SEVERAL INDEPENDENT ONES PRESS IT A LITTLE, the headline is said as what it is, and the sources are named by kind so
 * that "several" has something to refer to: "The sky and the day's number both point toward an open, curious mind" (two pillars) or "More than one part of the
 * sky points toward an open, curious mind" (one). It claims exactly what the plan found (two or more independent facts press the pole) and names none as the cause.
 * It does not add "which suits ...": where the pole IS the activity ("reaching out to people" and "time with other people") the clause says one thing twice.
 */
export const convergentLine = (topic, pole, pillars) => (POLE_FAVOUR[pole]
    ? {
        text: pillars.has('numerology') && pillars.has('astrology')
            ? `The sky and the day's number both point toward ${POLE_FAVOUR[pole]}.`
            : `More than one part of the sky points toward ${POLE_FAVOUR[pole]}.`,
        claims: [`because:${topic}`, `lead:${pole}`, `approach:${pole}`, 'convergent'], topics: [topic],
    }
    : null);
/**
 * THE SENTENCES THAT SAY WHY THE HEADLINE IS THE HEADLINE, for the topics the reading has not otherwise explained. Two topics on one pole are one sentence
 * ("..., which suits focused work and putting things in order"); two on different poles are two. A topic with no sentence for its pole says nothing.
 */
export function becauseLines(needed) {
    const out = [];
    const claimsOf = (topics, pole) => [...topics.map((topic) => `because:${topic}`), `lead:${pole}`, `approach:${pole}`];
    if (needed.length === 2 && needed[0].from === needed[1].from && BECAUSE_HEAD[needed[0].from] && needed.every((entry) => BECAUSE[entry.topic]?.[entry.from])) {
        const topics = needed.map((entry) => entry.topic);
        return [{ text: `${BECAUSE_HEAD[needed[0].from]}, which suits ${topics.map((topic) => FIT_NOUN[topic]).join(' and ')}.`, claims: claimsOf(topics, needed[0].from), topics }];
    }
    for (const entry of needed) {
        const text = BECAUSE[entry.topic]?.[entry.from];
        if (text)
            out.push({ text, claims: claimsOf([entry.topic], entry.from), topics: [entry.topic] });
    }
    return out;
}
/** Every sentence `becauseLines` can write, for the vocabulary scan. */
export function becauseVocabulary() {
    const out = [];
    for (const activity of Object.keys(FIT_NOUN))
        for (const pole of Object.keys(POLE_FAVOUR)) {
            for (const pillars of [new Set(['astrology']), new Set(['numerology', 'astrology'])]) {
                const line = convergentLine(activity, pole, pillars);
                if (line)
                    out.push(line.text);
            }
        }
    for (const row of Object.values(BECAUSE))
        for (const line of Object.values(row ?? {}))
            if (line)
                out.push(line);
    for (const pole of Object.keys(BECAUSE_HEAD)) {
        for (const a of Object.keys(BECAUSE))
            for (const b of Object.keys(BECAUSE)) {
                if (a !== b && BECAUSE[a]?.[pole] && BECAUSE[b]?.[pole])
                    out.push(`${BECAUSE_HEAD[pole]}, which suits ${FIT_NOUN[a]} and ${FIT_NOUN[b]}.`);
            }
    }
    return out;
}
/** The sentences of the sky paragraph, which alone may name the Moon and the planets: they are the evidence being read. */
export function skyVocabulary() {
    const out = [];
    for (const body of Object.keys(CONTACT_MEANING)) {
        for (const natal of Object.keys(CONTACT_MEANING[body])) {
            for (const quality of ['ease', 'hard', 'merge']) {
                const meaning = CONTACT_MEANING[body][natal][quality];
                for (const timing of ['peak', 'building', 'fading']) {
                    const objects = body === natal
                        ? [OWN_PLACE[quality][timing]]
                        : [`${TOUCH[quality][timing]} ${NATAL_OBJECT[natal].name} (${NATAL_OBJECT[natal].gloss})`, `${TOUCH[quality][timing]} ${NATAL_OBJECT[natal].name}`];
                    for (const object of objects) {
                        const sentence = `${BODY_SUBJECT[body]} ${object}, which ${CONTACT_MODAL[quality]} ${meaning}${courseTail(quality, timing)}.`;
                        out.push(sentence);
                        for (const connective of [...Object.values(CONNECTIVE), MIRROR_CONNECTIVE]) {
                            out.push(`${connective}${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}`);
                            /* The second contact of the body just named: "Meanwhile, it is in tense contact with ...". */
                            out.push(`${connective}it${sentence.slice(BODY_SUBJECT[body].length)}`);
                        }
                    }
                    if (quality !== 'hard' && timing !== 'fading') {
                        for (const pole of Object.keys(DRIVE_TAIL)) {
                            const tail = driveTail(pole, meaning);
                            if (!tail)
                                continue;
                            for (const object of objects) {
                                const withTail = `${BODY_SUBJECT[body]} ${object}, which ${CONTACT_MODAL[quality]} ${meaning}, and ${tail}${courseTail(quality, timing)}.`;
                                out.push(withTail);
                                for (const connective of Object.values(CONNECTIVE))
                                    out.push(`${connective}${withTail.charAt(0).toLowerCase()}${withTail.slice(1)}`, `${connective}it${withTail.slice(BODY_SUBJECT[body].length)}`);
                            }
                        }
                    }
                    if (quality === 'hard') {
                        const lower = BODY_SUBJECT[body].replace(/^The /, 'the ');
                        const sources = body === natal
                            ? [OWN_PLACE_WITH[timing]]
                            : [`${TOUCH_WITH[timing]} ${NATAL_OBJECT[natal].name} (${NATAL_OBJECT[natal].gloss})`, `${TOUCH_WITH[timing]} ${NATAL_OBJECT[natal].name}`];
                        for (const source of sources)
                            out.push(`${HARD_FIRST[body][natal]}, with ${lower} ${source}.`);
                    }
                }
            }
        }
    }
    /* The fused sentence for each pair of contacts that are each other's reverse, with and without the gloss of the planet it names first. */
    const bodies = Object.keys(BODY_SUBJECT);
    for (const a of bodies)
        for (const b of bodies) {
            if (a === b)
                continue;
            for (const quality of ['ease', 'hard', 'merge'])
                for (const timing of ['peak', 'building', 'fading']) {
                    const gloss = (point) => ['', ` (${NATAL_OBJECT[point].gloss})`];
                    for (const glossed of gloss(b))
                        out.push(mirroredSentence({ body: a, natal: b, quality, timing }, { body: b, natal: a }, glossed));
                }
        }
    out.push(...Object.values(SETTING_PHASE), ...Object.keys(HOUSE_THEME).map((house) => houseSentence(Number(house))), ...Object.values(SETTING_ELEMENT));
    return out;
}
/** Every authored sentence above, for the test that scans the whole vocabulary against the safety rules. */
export function storyVocabulary() {
    const out = [...skyVocabulary()];
    const capitalise = (text) => text.charAt(0).toUpperCase() + text.slice(1);
    const activities = Object.keys(TITLE_NOUN);
    out.push(...Object.values(CONTRAST_IN), ...Object.keys(AREA_NOUN).map(compoundSentence));
    out.push(...Object.values(STANCE_TITLE).filter(Boolean).map((phrase) => `A day for ${phrase}`), ...Object.values(TENSION_HEADLINE));
    for (const first of activities) {
        out.push(`A day that leans toward ${TITLE_NOUN[first]}`);
        for (const second of activities) {
            if (first === second)
                continue;
            out.push(`A day that leans toward ${TITLE_GERUND[first]} and ${TITLE_GERUND[second]}`, `A day that leans toward ${TITLE_NOUN[first]}, with room for ${ROOM_NOUN[second]}`);
        }
        out.push(`A day for ${TITLE_NOUN[first]}`, `A day suited to ${TITLE_NOUN[first]}`, `A gentler day for ${TITLE_NOUN[first]}`, `A gentler day suited to ${TITLE_NOUN[first]}`);
        for (const second of activities) {
            if (first === second)
                continue;
            out.push(`A day for ${TITLE_GERUND[first]} and ${TITLE_GERUND[second]}`, `A day suited to ${TITLE_GERUND[first]} and ${TITLE_GERUND[second]}`, `A day for ${TITLE_NOUN[first]}, with room for ${ROOM_NOUN[second]}`, `A day suited to ${TITLE_NOUN[first]}, with room for ${ROOM_NOUN[second]}`, `A gentler day for ${TITLE_GERUND[first]} and ${TITLE_GERUND[second]}`, `A gentler day suited to ${TITLE_NOUN[first]}, with room for ${ROOM_NOUN[second]}`);
        }
    }
    out.push(...Object.values(LIMIT_ADVICE), ...Object.values(LIMIT_IN).flatMap((row) => Object.values(row ?? {})));
    out.push(...[...Object.values(LIMIT_ADVICE), ...Object.values(LIMIT_IN).flatMap((row) => Object.values(row ?? {}))].map((line) => `${OPPOSED_LEAD}${line.charAt(0).toLowerCase()}${line.slice(1)}`));
    for (const pole of Object.keys(POLE_FAVOUR)) {
        for (const area of Object.keys(AREA_THROUGH)) {
            const said = pillarSentence({ relation: 'overlap', dayNumber: 4, pole, numberTopic: null, skyTopic: null, skyArea: area });
            if (said)
                out.push(said.text);
        }
        for (const limit of Object.keys(LIMIT_THAN)) {
            for (const relation of ['numbers-only', 'number-led']) {
                const said = pillarSentence({ relation, dayNumber: 4, pole, numberTopic: null, skyTopic: null, skyArea: null });
                if (said)
                    out.push(`${said.text.replace(/\.$/, '')} rather than ${LIMIT_THAN[limit]}.`);
            }
        }
        for (const relation of ['agree', 'differ', 'numbers-only', 'number-led']) {
            for (const friction of [false, true]) {
                const said = pillarSentence({ relation, dayNumber: 4, pole, numberTopic: null, skyTopic: null, skyArea: null }, friction);
                if (said)
                    out.push(said.text);
            }
        }
        for (const skyQuality of ['hard']) {
            const said = pillarSentence({ relation: 'differ', dayNumber: 4, pole, numberTopic: null, skyTopic: null, skyArea: null, skyQuality });
            if (said)
                out.push(said.text);
        }
        const sole = pillarSentence({ relation: 'numbers-only', dayNumber: 4, pole, numberTopic: null, skyTopic: null, skyArea: null, settingShares: true });
        if (sole)
            out.push(sole.text);
        for (const area of Object.keys(TEMPER_MIND)) {
            for (const relation of ['tempered', 'friction']) {
                const said = pillarSentence({ relation, dayNumber: 4, pole, numberTopic: null, skyTopic: null, skyArea: area });
                if (said)
                    out.push(said.text);
            }
        }
    }
    for (const number of activities)
        for (const sky of activities) {
            if (number === sky)
                continue;
            const said = pillarSentence({ relation: 'complement', dayNumber: 4, pole: 'begin', numberTopic: number, skyTopic: sky, skyArea: null });
            if (said)
                out.push(said.text);
        }
    out.push(...Object.values(EASIER_BASE).filter(Boolean), ...Object.values(EASIER_IN).flatMap((row) => Object.values(row ?? {})));
    out.push(...Object.values(WATCH_CARE));
    for (const tension of Object.keys(TENSION_HEADLINE)) {
        out.push(pullSentence(tension, null), pullAgain(tension), ...Object.keys(FRICTION_NOUN).map((body) => pullSentence(tension, body)));
    }
    out.push(...Object.values(RISING_PHRASE).map((phrase) => (phrase.form === 'you' ? `You may ${phrase.text}.` : `${capitalise(phrase.text)}.`)), ...Object.values(QUIETER_CLAUSE).map((clause) => `${capitalise(clause)}.`), ...Object.values(RISING_PAIR));
    out.push(...Object.values(SOFT_RISING), ...Object.values(SOFT_QUIETER), SETTLE_AND_STEP_BACK);
    out.push(...becauseVocabulary());
    out.push(...Object.values(MOVE_SOURCE), MOVE_DIFFER, ...Object.values(MOVE_GENTLE).filter((line) => Boolean(line)));
    for (const pole of Object.keys(POLE_FAVOUR)) {
        const line = moveEase(pole);
        if (line)
            out.push(line);
    }
    out.push(...Object.values(MOVE_EDGE).flatMap((row) => Object.values(row ?? {})));
    return out;
}
