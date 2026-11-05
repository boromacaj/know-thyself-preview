import { hdChannels } from '../../human-design/data/hdChannels.js?v=99fda38';
import { AUTHORITY_SIGNAL, CHANNEL_MEANING, DEFINED_PRIORITY, DEFINED_SAYS, LINE_MOMENT, OPEN_COST, OPEN_PRACTICE, OPEN_PRIORITY, OPEN_SAYS, PROFILE_FRICTION, PROFILE_PAIR, lineMeetsAuthority, lineMeetsType, } from './humanDesignMeaningEn.js?v=99fda38';
import { CENTER_TERM, capitalise, listWords, numberWord } from './humanDesignVoice.js?v=99fda38';
/**
 * THE HUMAN DESIGN READING IN ENGLISH - the semantic reference.
 *
 * Every sentence here answers to three rules at once, and they are in tension,
 * which is why this file is long:
 *
 *   TRANSLATE.   Describe the mechanism, then name it if the name helps. A
 *                reader should be able to follow every main paragraph without
 *                knowing what a Sacral or a Not-Self theme is.
 *   SPECIFY.     Say what is true of THIS graph. Any sentence that would be
 *                equally true of everyone who shares the Type has failed, and
 *                the claim it came from carries the fields to do better.
 *   WITHHOLD.    Assert nothing the chart does not contain - no history, no
 *                body, no other people's opinions, no outcome, no rank.
 *
 * WHAT THE SYSTEM CALLS THINGS AND WHAT THIS SAYS INSTEAD. The keynotes are
 * deliberately not used as explanations. "Satisfaction" and "Frustration" are
 * the tradition's words for two states, and printing them at a reader tells
 * them nothing; describing the state and then attaching the word gives them
 * something to recognise and a term to look up. The same goes for Strategy,
 * Authority, Definition and every centre.
 *
 * READING INTELLIGENCE V4: THE PERSON, NOT THE SYSTEM. On the 37-person corpus
 * 58% of this reading's sentences were shared by a quarter of all readings or
 * more, and the most shared ones explained Human Design rather than the reader:
 * "The place a decision comes from is called your authority", "Your profile
 * shows how you meet people, through two lines numbered one to six", "Open does
 * not mean missing ...", "This is a symbolic lens, not a measurement". They are
 * gone. What orientation a reader needs is folded into a sentence about their
 * own chart ("Emotions and how you think are open, so they take their tone from
 * the people around you"), never stood up as a paragraph of its own. Where two
 * claims of the plan meet - a route into action that starts in the emotions and
 * a way of deciding that has to wait for them; a deciding centre cut off from
 * the part that speaks - the reading says so, from the whole plan each function
 * now receives. The paragraph structure is unchanged (the Slovak reading, which
 * is frozen, has the same paragraphs), so shorter means fewer sentences per
 * paragraph, not fewer points.
 */
/* -------------------------------------------------------------- vocabulary */
/*
 * EDITORIAL STANDARD V2 (docs/reading-voice/english-v2/EDITORIAL_STANDARD_V2.md).
 *
 * Every sentence earns its place: one idea, said once, in a sentence a reader
 * finishes on the first pass. Most sentences here are 10-20 words; a longer one
 * is long because a list of this chart's own centres is in it. "Human Design
 * reads ..." attributes an interpretation to the tradition where the reading
 * would otherwise state it as fact - not as a refrain on every sentence. No
 * sentence argues with a reading nobody made ("None of this means ...", "does
 * not say that part of you is weak", "Open does not mean missing").
 */
/**
 * WHAT EACH CENTRE IS CALLED IN THE READING - a function, never the centre's name.
 *
 * There used to be a long form as well ("putting things into words and
 * action"), and lists of three long forms - "putting things into words and
 * action wired to instinct, timing, and what feels safe" - are not sentences
 * anybody finishes; the envelope's list of five ran to fifty words. Every list
 * uses these, and the name itself lives in the evidence.
 */
export const CENTER_SHORT = {
    head: 'mental pressure',
    ajna: 'how you think',
    throat: 'expression',
    g: 'identity',
    ego: 'willpower',
    solarPlexus: 'emotions',
    sacral: 'work energy',
    spleen: 'instinct',
    root: 'drive',
};
/** The drive area is glossed where a reading first names it ("drive" alone reads as a word for the whole of you); operating() starts a reading, so the memory is reset there. */
let driveGlossed = false;
const shortName = (id) => {
    if (id === 'root' && !driveGlossed) {
        driveGlossed = true;
        return 'drive (the push to get things done)';
    }
    return CENTER_SHORT[id];
};
/** An open centre inside a partly steady function, as the part of the reader that varies ("only your feelings vary"). */
const VARIES_AS = {
    head: 'the questions on your mind', ajna: 'your thinking', spleen: 'your instinct', throat: 'your expression', g: 'your sense of direction',
    ego: 'your will', solarPlexus: 'your feelings', sacral: 'your work energy', root: 'your drive',
};
/** A function of the chart, written to be the subject of "is steady" / "depends on". */
const FUNCTION_DOES = {
    drive: 'your energy',
    awareness: 'the ways you take things in',
    expression: 'how you express things',
    direction: 'your sense of direction',
};
/** A profile line as what YOU do on that side - the subject is the reader, never "it". */
const LINE_IS = {
    1: 'want solid ground under a thing before you trust it, and go looking for it',
    2: 'have a knack for something you never studied, and do best left alone until someone asks for it',
    3: 'find out by trying, and what fails counts as part of the method',
    4: 'work through people you already know, so things tend to reach you through your own circle',
    5: 'tend to have things projected onto you: people may expect a solution, and your reputation can run ahead of you',
    6: 'live in phases: trial and error early on, then a stretch of standing back, then living from what that taught you',
};
const LINE_SHORT = {
    1: 'needing solid ground', 2: 'a natural knack', 3: 'learning by trying',
    4: 'working through people you know', 5: 'being expected to have the answer', 6: 'living in phases',
};
/**
 * HOW THE TYPE OPERATES, said in one short paragraph with the name attached.
 *
 * Each is written from what the chart actually has: a renewable source of
 * energy or not, and a route from it to speech and action or not. That is the
 * whole of what makes a Type - and everyone of the Type shares it, so it is
 * told in two sentences and the rest of the reading is spent on what is not
 * shared. The Manifestor's route is filled in from the chart (operating()).
 */
const TYPE_MECHANIC = {
    'Manifesting Generator': 
    /* (V4) the type needs a route from SOME source of energy into speaking, not from work energy: for many charts it starts in willpower or emotions,
       and the old "your energy for work ... has a direct route" contradicted the route the reading then names (found by a blind reviewer) */
    'Human Design reads you as a Manifesting Generator. Your energy for work renews itself, and a source of energy in your chart has a direct route into speaking and acting, '
        + 'so things can start from you.',
    Generator: 'Human Design reads you as a Generator. Your energy for work renews itself, but nothing routes it straight into speaking and acting, '
        + 'so your effort lands best when it answers something.',
    Manifestor: 'Human Design reads you as a Manifestor. You have a direct route from a source of energy into speaking and acting, but no renewable work energy underneath it, '
        + 'so your energy comes in bursts.',
    Projector: 'Human Design reads you as a Projector: you have no renewable supply of work energy of your own. '
        + 'What you have instead is a close read of people and situations.',
    Reflector: 'Human Design reads you as a Reflector: nothing in your chart is fixed, '
        + 'which makes you an accurate gauge of how a place and its people are doing.',
};
/**
 * What the strategy actually asks, once the slogan is set aside. A Manifesting
 * Generator's strategy has a second half a Generator's does not ("then
 * inform"), so the two Types no longer share this paragraph.
 */
const INITIATION_ASKS = (initiation, type) => {
    switch (initiation) {
        case 'after-response':
            return type === 'Manifesting Generator'
                ? 'In practice, let something real start you, then tell the people it affects, because you tend to move faster than they expect.'
                : 'In practice, start from something real, such as a request or work that already exists, rather than from an idea of what ought to happen.';
        case 'direct':
            return 'You can move first, and how it lands depends on whether the people it affects heard about it beforehand.';
        case 'on-recognition':
            return 'Your read lands where it is wanted: being recognised or asked first is what turns an insight into one that gets used.';
        default:
            return 'A steady answer comes from letting a decision sit over a longer stretch, because what you pick up keeps changing with your surroundings.';
    }
};
/**
 * WHERE THE ROUTE INTO ACTION STARTS, and what that does to how things come out.
 * The motor at the start of the route is the one fact that makes two charts of
 * the same Type speak differently: words pushed out by pressure and words that
 * carry a commitment are not the same thing. From the motor centres' entries in
 * knowledge/human-design/hdCenters.ts.
 */
const MOTOR_SAYS = {
    sacral: 'So what you say and do tends to come straight out of a response, with the energy already behind it.',
    solarPlexus: 'So what you say and do rides on your feelings, and the same words can land differently at the top and the bottom of a mood.',
    ego: 'So what you say tends to land as a commitment, close to a promise.',
    root: 'So what you say and do can be pushed out by pressure to get moving, sometimes before you have chosen it.',
};
/**
 * THE WAY OF DECIDING, translated - what it is, what it is NOT, and what
 * gets mistaken for it. The "is not" half is the part generic advice always
 * skips, and it is the half that makes the paragraph usable. One telling per
 * authority, each in one or two sentences: charts that share an authority share
 * it, because that sharing is true, and the rest of the section is this chart's.
 */
const AUTHORITY_MECHANISM = {
    Sacral: {
        is: 'Your decisions sit in the body rather than the mind. The signal is a pull toward something, or a flatness about it, that arrives before your reasons do.',
        isNot: 'It is not a preference you could defend in an argument, and the same question can get a different answer on another day.',
    },
    Splenic: {
        is: 'Your decisions sit in a quiet, in-the-moment sense of whether something is sound, closer to noticing than to concluding.',
        isNot: 'It speaks once and does not repeat itself, so anything that keeps insisting afterwards is coming from somewhere else.',
    },
    'Emotional / Solar Plexus': {
        is: 'Your answer is rarely clear in the moment: it comes once a feeling has run its full course, so you decide by letting time pass.',
        /* What a yes at the top of the feeling costs is the costs section's; this is the moment it happens. */
        isNot: 'The hardest moment is being asked for an answer on the spot, because that is when you do not have one yet.',
    },
    'Ego Manifested': {
        is: 'Your decisions rest on what you would genuinely commit to and could keep. It often becomes clear once you hear yourself say it.',
        isNot: 'It is not what you think you should want, and it says nothing about whether wanting it is reasonable.',
    },
    'Ego Projected': {
        is: 'Your decisions rest on what you genuinely have the will for, heard in your own voice rather than worked out in silence.',
        isNot: 'Thinking it through alone on paper tends to produce a good case rather than an answer.',
    },
    'Self-Projected': {
        is: 'Your decisions rest on direction rather than appeal: which way a thing points you. You hear it when you talk it through with someone who simply listens.',
        isNot: 'Their advice is not the point; they are there so that you can hear yourself.',
    },
    'Mental / Environmental': {
        is: 'You have no single inner place where decisions are made. You decide by talking things through with people you trust, while noticing where you are.',
        isNot: 'That is not asking others to decide: the talking is for hearing yourself, and the place you are in carries the answer.',
    },
    Lunar: {
        is: 'Anything large is best given a full lunar cycle, about a month, so the same question is seen from a changing set of angles.',
        isNot: 'What stays consistent across the month is the answer; a same-day answer is a reading of whoever was in the room.',
    },
};
/** The short form of what an open centre manufactures, for every reference after the first. */
const OPEN_NOISE_SHORT = {
    head: 'borrowed urgency about questions',
    ajna: 'certainty that is not really yours',
    throat: 'the pull to speak for the sake of it',
    g: 'borrowed pressure about direction',
    ego: 'the urge to prove something',
    solarPlexus: 'the emotional weather in the room',
    sacral: 'the feeling that you should keep going',
    spleen: 'holding on past the point of use',
    root: 'a hurry that is not yours',
};
/**
 * THE NOT-SELF THEME, TRANSLATED.
 *
 * The tradition names one recurring state per Type and treats it as a signal.
 * Printing the word explains nothing, so each Type has the state, described,
 * and the word is attached after it.
 */
const NOT_SELF_STATE = {
    'Manifesting Generator': 'a stuck kind of irritation: pushing at something that will not give',
    Generator: 'a stuck kind of irritation: effort going into something that is not moving',
    Manifestor: 'a hard flare of heat, usually at being blocked or questioned',
    Projector: 'a specific kind of sourness: effort given and not seen',
    Reflector: 'flatness, the sense that nothing stands out from anything else',
};
/**
 * WHERE TO LOOK WHEN IT KEEPS COMING BACK - by Type, and for the two Types that
 * can decide either way, by the way this chart decides. A Generator with an
 * emotional answer and one with a bodily answer go wrong at different moments:
 * one says yes at the top of a feeling, the other says yes from its reasons.
 */
const notSelfLook = (type, decision) => {
    if (type === 'Manifesting Generator' || type === 'Generator') {
        if (decision.needsTime)
            return 'When it keeps coming back, look first at a yes given at the high point of a feeling, before it had settled.';
        return type === 'Manifesting Generator'
            ? 'When it keeps coming back, look first at something started from an idea of what should happen, before your body had answered.'
            : 'When it keeps coming back, look first at work taken on because it was there, not because anything in you answered it.';
    }
    if (type === 'Manifestor')
        return 'When it keeps coming back, look first at a move made without telling the people it affects.';
    if (type === 'Projector')
        return 'When it keeps coming back, look first at effort offered where nobody asked for it.';
    return 'When it keeps coming back, look first at where you have been spending your time.';
};
/** The signature state, same treatment: described, then named. */
const SIGNATURE_MEANS = {
    'Manifesting Generator': 'a tired, settled contentment',
    Generator: 'a tired, settled contentment',
    Manifestor: 'the ease of things moving without having to be fought for',
    Projector: 'the particular ease of being asked for exactly what you are good at',
    Reflector: 'the pleasure of being genuinely, happily caught off guard by something',
};
const AUTHORITY_TERM = {
    Sacral: 'Sacral authority',
    Splenic: 'Splenic authority',
    'Emotional / Solar Plexus': 'Emotional authority',
    'Ego Manifested': 'Ego authority',
    'Ego Projected': 'Ego-projected authority',
    'Self-Projected': 'Self-projected authority',
    'Mental / Environmental': 'Mental or environmental authority',
    Lunar: 'Lunar authority',
};
/** What a nearby birth time moved, in words - the scan's own keys stay in the evidence. */
const WINDOW_CHANGE_WORDS = {
    type: 'how your energy works',
    authority: 'how you decide',
    profile: 'how you meet people',
    definition: 'how the fixed parts connect',
    channels: 'some of the links between areas',
};
const and = (words) => listWords(words, 'and');
/** Short form: for every list of more than one. */
const centreNames = (ids) => and(ids.map(shortName));
const COUNT = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const count = (value) => numberWord(value, COUNT);
/* ------------------------------------------------------------- the voice -- */
const time = (claim) => {
    const scanned = claim.window;
    if (scanned && scanned.changes.length === 0) {
        return `Your birth time is recorded here as an estimate rather than an exact time. That matters for Human Design, `
            + `which builds the whole chart from one moment. Your chart was recalculated across ${scanned.hours} hours either `
            + `side of the time given, and everything below came out the same. The estimate is still an estimate, but the `
            + `reading does not depend on it.`;
    }
    if (scanned) {
        return `Your birth time is recorded here as an estimate rather than an exact time. For Human Design that matters more `
            + `than elsewhere, because the whole chart comes from a single moment. Recalculated across ${scanned.hours} hours `
            + `either side of the time given, your chart changed in ${and(scanned.changes.map((key) => WINDOW_CHANGE_WORDS[key] ?? key))}. `
            + `Treat those parts as provisional.${scanned.changes.includes('channels') ? ' That covers any link named below, whether under how you decide or under the fixed areas.' : ''} `
            + `Everything else held steady.`;
    }
    return `Your birth time is recorded here as an estimate rather than an exact time. Human Design builds the whole `
        + `chart from a single moment, and its parts change at different speeds. Which areas are fixed, and how they link, `
        + `can shift within a few hours; the two lines of your profile change roughly once a day. Read what follows as the `
        + `chart for the time you gave: the best available reading, not a settled one.`;
};
/** "from emotions to expression", "from drive through instinct to expression". */
const route = (path) => {
    const names = path.map(shortName);
    const middle = names.slice(1, -1);
    return `from ${names[0]}${middle.length > 0 ? ` through ${and(middle)}` : ''} to ${names[names.length - 1]}`;
};
const operating = (claim) => {
    driveGlossed = false;
    const hasRoute = claim.motorToThroat && claim.motorPath.length > 1;
    let first = TYPE_MECHANIC[claim.type];
    /* A Manifestor's route IS the Type, so it is said once, here, with the chart's own starting point and what that start does. */
    if (claim.type === 'Manifestor' && hasRoute) {
        const names = claim.motorPath.map(shortName);
        const middle = names.slice(1, -1);
        first = first.replace('a direct route from a source of energy into speaking and acting', `a direct route from your ${names[0]}${middle.length > 0 ? `, through ${and(middle)},` : ''} into speaking and acting`);
        /* The Type sentence already ends on "so"; the motor's consequence starts a sentence of its own. */
        const says = MOTOR_SAYS[claim.motorPath[0]];
        if (says)
            first = `${first} ${capitalise(says.replace(/^So /, ''))}`;
    }
    const paragraphs = [first, INITIATION_ASKS(claim.initiation, claim.type)];
    /* "Not every chart of your type has it in the same way" was true of every chart and said nothing; where the route starts says something. */
    if (claim.type !== 'Manifestor' && hasRoute && claim.pathChannels.length > 0) {
        paragraphs.push(`In your chart that route runs ${route(claim.motorPath)}.${MOTOR_SAYS[claim.motorPath[0]] ? ` ${MOTOR_SAYS[claim.motorPath[0]]}` : ''}`);
    }
    return paragraphs;
};
/**
 * What an open centre manufactures, as the paragraph that sets up the confusion.
 * This is the ONE place the noise is described in full: the tension, the costs and
 * the practice sections refer to it and say something else (the test, the cost,
 * the step). Only an open Ajna and an open Solar Plexus can be mistaken for the
 * authority, so those are the two centres that can be told here; both are told
 * together when both are open. The test itself is the tension section's (it
 * differs by authority), so it is not said here as well.
 */
const noiseParagraph = (centers) => {
    const ajna = centers.includes('ajna');
    const feelings = centers.includes('solarPlexus');
    if (ajna && feelings) {
        return 'Two things in your chart are easily mistaken for this signal: certainty, meaning firm-sounding conclusions with nothing solid underneath them, '
            + 'and other people\'s emotional weather. '
            + 'Your way of thinking and your emotions are both open, so they amplify what is around you until it feels like your own.';
    }
    if (ajna) {
        return 'One thing in your chart is easily mistaken for this signal: certainty, meaning firm-sounding conclusions with nothing solid underneath them. '
            + 'Your way of thinking is open, so it amplifies the certainty around you until it feels like your own.';
    }
    return 'One thing in your chart is easily mistaken for this signal: other people\'s emotional weather. '
        + 'Your emotions are open, so they amplify the mood around you until it feels like your own.';
};
/** The Type's tempo meeting the authority's (authorityByType.ts); the slow pairing is the pace tension, and a signal that needs another person is in the mechanism itself. */
const fitSentence = (claim) => {
    if (claim.fit === 'quickens') {
        return 'Your answer comes faster than the recognition you wait for, so note it when it comes instead of rebuilding it afterwards.';
    }
    if (claim.fit !== 'aligned')
        return '';
    if (claim.initiation === 'direct') {
        return 'Your answer is as quick as your urge to move, so the pause your chart asks for is spent telling people, not deciding.';
    }
    if (claim.initiation === 'after-response') {
        return claim.type === 'Manifesting Generator'
            ? 'Your answer arrives as fast as your energy moves, so the only pause your chart asks for is long enough to notice it.'
            : 'Your answer arrives at the speed of the request, so you can usually give it on the spot.';
    }
    return claim.initiation === 'on-recognition'
        ? 'Waiting to be asked and waiting for clarity run at the same unhurried pace, so an invitation gives the feeling time to settle.'
        : '';
};
const decision = (claim) => {
    const mechanism = AUTHORITY_MECHANISM[claim.authority];
    /* The link that completes the authority's own centre is the first one that has a meaning of its own. */
    const holding = claim.evidence.find((id) => CHANNEL_MEANING[id]);
    const paragraphs = [
        `${mechanism.is}${holding ? ` In your chart the link that keeps this signal steady also brings ${CHANNEL_MEANING[holding]}.` : ''}`,
        [mechanism.isNot, fitSentence(claim)].filter(Boolean).join(' '),
    ];
    const confusables = claim.confusables.filter((id) => id === 'ajna' || id === 'solarPlexus');
    if (confusables.length > 0)
        paragraphs.push(noiseParagraph(confusables));
    return paragraphs;
};
const social = (claim) => [
    /* The two lines are said as what the reader does on each side; how Human Design numbers them is At a glance's and the evidence's. */
    `On the side you know, you ${LINE_IS[claim.conscious]}. `
        + `Underneath, where others see it first, you ${LINE_IS[claim.unconscious]}.`,
    [
        PROFILE_PAIR[`${claim.conscious}/${claim.unconscious}`] ?? '',
        lineMeetsAuthority(claim.conscious, claim.authorityTempo, claim.authority),
        lineMeetsType(claim.conscious, claim.initiation) ?? '',
    ].filter(Boolean).join(' '),
];
/** A link between two areas, the Throat last: "emotions to expression", whichever way the table lists it. */
const linkEnds = (centers) => (centers[0] === 'throat' ? [centers[1], centers[0]] : [centers[0], centers[1]]);
/**
 * What "fixed" means for the reader, once, for the unknown-time reading (the
 * main reading says it per area instead, from DEFINED_SAYS). A fixed emotional
 * area is the exception: feelings rise and fall, and saying they "work the same
 * whoever you are with" would contradict the way of deciding the reading has
 * just described.
 */
const steadyLine = (ids) => {
    const rest = ids.filter((id) => id !== 'solarPlexus');
    if (ids.includes('solarPlexus')) {
        const tail = rest.length === 0 ? ''
            : ` ${capitalise(centreNames(rest))} ${rest.length === 1 ? 'works' : 'work'} the same way whoever you are with and whatever kind of day it is.`;
        return `Your feelings still rise and fall, but the way they move is reliably your own.${tail}`;
    }
    return ids.length === 1
        ? 'It works the same way whoever you are with and whatever kind of day it is, and it needs little managing.'
        : 'They work the same way whoever you are with and whatever kind of day it is, and they need little managing.';
};
const consistency = (claim, plan) => {
    const whole = claim.functions.filter((fn) => fn.state === 'all-defined');
    const part = claim.functions.filter((fn) => fn.state === 'mixed');
    /*
     * The centres, with what "fixed" means folded into the same sentence, then
     * what the most telling of them mean. A fixed centre whose meaning another
     * section has already told is skipped for the next one: the renewable work
     * energy is the Type paragraph of every chart that has it, and the authority's
     * own centre is the decision section, so saying them again here was the same
     * sentence in half the readings ("Your energy for work renews itself and
     * answers what is actually in front of it", 281 of 404 charts).
     */
    const allDefined = claim.functions.flatMap((fn) => fn.defined);
    const one = claim.definedCount === 1;
    const toldAlready = new Set([
        ...(plan.operating.sacralPowered ? ['sacral'] : []),
        ...(plan.decision.center ? [plan.decision.center] : []),
    ]);
    const told = DEFINED_PRIORITY.filter((id) => allDefined.includes(id) && !toldAlready.has(id)).slice(0, 2);
    const paragraphs = [
        [
            `${capitalise(count(claim.definedCount))} of the nine areas of your chart ${one ? 'is' : 'are'} fixed: ${centreNames(allDefined)}.`,
            ...told.map((id) => DEFINED_SAYS[id]),
        ].join(' '),
    ];
    if (whole.length > 0 || part.length > 0) {
        /*
         * What the pattern adds to the list: which parts of you are only partly
         * steady, and through which fixed area they still hold. "This keeps how you
         * express things and your sense of direction steady" restated the list it
         * followed, so it is said only when nothing is partly steady.
         */
        paragraphs.push(part.length > 0
            ? part.map((fn) => `${fn.fn === 'drive' ? 'Your energy has a steady source in' : 'You take things in steadily through'} ${centreNames(fn.defined)}, while ${and(fn.open.map((id) => VARIES_AS[id]))} ${fn.open.length > 1 || fn.open[0] === 'solarPlexus' || fn.open[0] === 'head' ? 'vary' : 'varies'}.`).join(' ')
            : `This keeps ${and(whole.map((fn) => FUNCTION_DOES[fn.fn]))} steady.`);
    }
    if (claim.channels.length > 0) {
        const pairName = (channel) => {
            const [left, right] = linkEnds(channel.centers);
            return `${shortName(left)} to ${shortName(right)}`;
        };
        /* The direct route is one of the links, so it is said about that link, inside its own sentence. */
        const routeLink = claim.channels.find((channel) => channel.carriesMotorPath);
        const meaning = (channel) => CHANNEL_MEANING[channel.id] ?? '';
        if (claim.channels.length === 1) {
            const [channel] = claim.channels;
            const [left, right] = linkEnds(channel.centers);
            const joins = claim.definedCount === 2 ? `One link, from ${shortName(left)} to ${shortName(right)}, keeps both fixed` : `One link joins ${pairName(channel)}`;
            paragraphs.push(`${joins}${channel === routeLink ? ' and carries the route into action' : ''}${meaning(channel) ? `, and it brings ${meaning(channel)}` : ''}.`);
        }
        else {
            const seen = new Set();
            const sentences = claim.channels.map((channel) => {
                const key = pairName(channel);
                const repeated = seen.has(key);
                seen.add(key);
                const subject = repeated ? 'A second link between the same two areas' : capitalise(key);
                return `${subject}${channel === routeLink ? ', part of your route into action,' : ''} brings ${meaning(channel) || 'a connection of its own'}.`;
            });
            paragraphs.push(sentences.join(' '));
        }
    }
    return paragraphs;
};
const context = (claim) => {
    if (claim.whollyOpen) {
        return [
            'Because no part of your chart is fixed, "what am I like?" has a different answer depending on where you ask it, '
                + 'and each answer says as much about the place as about you.',
            'That makes where you spend your time the main variable for you, not a lifestyle question.',
        ];
    }
    const whole = claim.functions.filter((fn) => fn.state === 'all-open');
    const openest = [...claim.functions].sort((a, b) => b.open.length - a.open.length)[0];
    const allOpen = claim.functions.flatMap((fn) => fn.open);
    /* One open centre is singular all the way through. */
    const one = claim.openCount === 1;
    /* Areas that are only partly open were already said to be partly steady (see `consistency`); only the wholly open ones are added here. */
    const depends = whole.length > 0
        ? `That leaves ${and(whole.map((fn) => FUNCTION_DOES[fn.fn]))} depending heavily on your surroundings.`
        : '';
    /* What an open area does is told for the open areas the plan has not already told in another section (the decision and the costs sections own theirs). */
    const specific = OPEN_PRIORITY
        .filter((id) => allOpen.includes(id) && !claim.toldElsewhere.includes(id))
        .slice(0, 2)
        .map((id) => OPEN_SAYS[id]);
    return [
        /* What "open" means rides on this chart's own list; it is not a paragraph of doctrine. */
        `${capitalise(centreNames(allOpen))} ${one ? 'is' : 'are'} open, so ${one ? 'it takes its' : 'they take their'} tone from the people and places around you and ${one ? 'magnifies' : 'magnify'} it.`
            + `${depends ? ` ${depends}` : ''}`,
        specific.length > 0
            ? specific.join(' ')
            : `What comes in through ${openest && openest.open.length > 0 ? centreNames(openest.open) : 'them'} can be hard to tell apart from what is your own.`,
    ];
};
/**
 * What tells the chart's own answer apart from the noise, by the way of
 * deciding. The noise itself was described in full under "how you decide"; this
 * is the practical test, and it differs by authority - down to the single
 * authority where two share a kind - so the paragraph says something the
 * earlier one did not.
 */
const signalVersusNoise = (claim) => {
    const noises = claim.noises.length > 0 ? claim.noises : [claim.noise];
    const plural = noises.length > 1;
    /* The two noises the decision section described are pointed back to with one clause; any other is named here for the first time. */
    const told = noises.every((id) => id === 'ajna' || id === 'solarPlexus');
    const noise = told
        ? `${and(noises.map((id) => (id === 'ajna' ? 'the borrowed certainty' : 'the emotional weather')))} described earlier`
        : and(noises.map((id) => OPEN_NOISE_SHORT[id]));
    const lead = capitalise(noise);
    switch (claim.authority) {
        case 'Emotional / Solar Plexus':
            return `Your own answer takes time to form, while ${noise} ${plural ? 'arrive' : 'arrives'} at once. That speed is what makes ${plural ? 'them' : 'it'} tempting.`;
        case 'Sacral':
            return noises.includes('solarPlexus') && !noises.includes('ajna')
                ? `Your own answer is quiet and bodily. ${lead} can be loud, and loudness says nothing about whether it is yours.`
                : noises.includes('solarPlexus')
                    ? `Your own answer is quiet and bodily, and may not have words yet. ${lead} can arrive fully worded or loud; neither says anything about whether it is yours.`
                    : `Your own answer comes from the body and may not have words yet. ${lead} tends to arrive fully worded, which is why it is easy to follow.`;
        case 'Splenic':
            return noises.includes('solarPlexus') && !noises.includes('ajna')
                ? `Your own answer is one quiet impression that does not repeat itself. ${lead} keeps coming back and can be loud, and that insistence is a sign that it is not the answer.`
                : `Your own answer is one quiet impression that does not repeat itself. ${lead} ${plural ? 'keep' : 'keeps'} coming back with arguments attached, and that insistence is a sign that ${plural ? 'they are' : 'it is'} not the answer.`;
        case 'Ego Manifested':
            return `Your own answer is whether you would actually keep the promise. ${lead} can make a promise sound reasonable, so check it against what you would truly commit to.`;
        case 'Ego Projected':
            return `Your own answer is the one you hear in your own voice when you talk it through, with real will behind it. ${lead} can sound just as firm in silence, so say it aloud and listen for whether the will is there.`;
        case 'Self-Projected':
            return `Your own answer is the direction you hear when you talk it through with someone who simply listens. ${lead} can feel like direction when it is only pressure, so listen for which way your own words point.`;
        case 'Lunar':
            return `Your own answer settles over about a month. ${lead} tends to arrive the same day, which is a reason to hold it lightly.`;
        default:
            return `${lead} can feel like an answer, though it works very differently from your real way of deciding.`;
    }
};
/**
 * What one part of a split chart is about, by the centre in it that most
 * changes a day: the two parts are said as the two things that can pull apart
 * ("what you say and do and your work energy"), not only as two lists.
 */
const GROUP_SAYS = [
    ['throat', 'what you say and do'], ['sacral', 'your work energy'], ['solarPlexus', 'your feelings'], ['g', 'your sense of direction'],
    ['ego', 'your will'], ['spleen', 'your instinct'], ['ajna', 'your thinking'], ['head', 'your thinking'], ['root', 'your drive'],
];
const groupSays = (centers) => GROUP_SAYS.find(([id]) => centers.includes(id))?.[1] ?? 'one part';
/** Each tension as the few words the standfirst lists it by, strongest first. */
const TENSION_NAME = {
    pace: 'fast energy against a slow answer',
    split: 'parts that do not meet',
    'signal-noise': 'your answer against borrowed signals',
    profile: 'your two sides with people',
    reach: 'seeing more than you can power',
};
const tensionStandfirst = (tensions) => (`Where your chart pulls two ways: ${and(tensions.map((claim) => TENSION_NAME[claim.kind]))}.`);
/*
 * No "There is a second place ..." / "And there is a third." openers: each
 * tension is its own paragraph under a standfirst that already says what the
 * section is, so a counting sentence carried no idea. `previous` and `index`
 * stay in the signature for the voices that use them.
 */
const tension = (claim, _previous, _index, plan) => {
    switch (claim.kind) {
        case 'pace': {
            /* A route into action that starts in the emotions is the same feeling the decision has to wait out: the two claims meet here. */
            const viaFeelings = plan.operating.motorToThroat && plan.operating.motorPath[0] === 'solarPlexus';
            return `Your energy is ready to move ${claim.initiation === 'direct' ? 'first' : 'as soon as something real appears'}, but your clarity needs time to form. `
                + (viaFeelings
                    ? 'And because your route into action starts in your emotions, the feeling that wants to act is the one that has not settled yet.'
                    : 'The trap is letting the pace of the doing set the pace of the deciding.');
        }
        case 'split': {
            /* Two parts are "one" and "the other"; a third or fourth part is counted. */
            const two = claim.groups.length === 2;
            const ORDINAL = ['one holds', 'another holds', 'a third holds', 'a fourth holds', 'a fifth holds'];
            const parts = claim.groups
                .map((group, index) => `${index === 0 ? 'One holds' : two ? 'the other holds' : (ORDINAL[index] ?? 'another holds')} ${centreNames(group.centers)}`)
                .join('; ');
            /*
             * The authority's centre apart from the part that holds expression is the
             * split that matters most to a reader: the answer can be clear in them
             * before they can say it.
             */
            const center = plan.decision.center;
            const own = center ? claim.groups.find((group) => group.centers.includes(center)) : undefined;
            const mute = claim.authorityPlacement === 'apart' && own !== undefined && !own.centers.includes('throat')
                && claim.groups.some((group) => group !== own && group.centers.includes('throat'));
            /*
             * Which gates would close the gap stays in the evidence, by number. In the
             * main reading it was "A gate is a single point that completes a link
             * between two areas. The gap would close at gates such as 14, 15, 18 and
             * 29" - a gloss and a list of numbers whose only consequence for the
             * reader is the completing person the plan withholds.
             */
            return `Your chart falls into ${count(claim.groups.length)} parts with no direct link between them. `
                + `${parts}. Each part is consistent in itself, so ${two
                    ? `${groupSays(claim.groups[0].centers)} can pull one way while ${groupSays(claim.groups[1].centers)} pulls another`
                    : `${and(claim.groups.map((group) => groupSays(group.centers)))} can pull in different directions at once`}.`
                + (claim.authorityPlacement === 'apart'
                    ? ` The place your decisions come from sits in a smaller group, apart from the largest.${mute ? ' It is not joined to the part that speaks, so an answer can be clear in you before it finds words.' : ''}`
                    : '');
        }
        case 'signal-noise':
            return signalVersusNoise(claim);
        case 'profile': {
            const friction = PROFILE_FRICTION[`${claim.conscious}/${claim.unconscious}`];
            return friction ?? `The two sides of how you meet people want different things: ${LINE_SHORT[claim.conscious]} in front, `
                + `${LINE_SHORT[claim.unconscious]} underneath, and they come apart in situations that ask you to be only one of the two.`;
        }
        case 'reach':
            return `Your chart has a fixed way of taking things in (${centreNames(claim.awareness)}) but no fixed energy underneath `
                + `it: ${centreNames(claim.openDrive)} ${claim.openDrive.length > 1 ? 'all vary' : 'varies'}. So you are likely to `
                + `see more than you can reliably act on, which is easier to work with once you expect it.`;
        default:
            return '';
    }
};
const cost = (claim, plan) => {
    const paragraphs = [
        `Going against your grain tends to show up as ${NOT_SELF_STATE[claim.type]}.`
            + `${claim.notSelf ? ` Human Design calls it ${claim.notSelf.toLowerCase()}.` : ''} `
            + notSelfLook(claim.type, plan.decision),
    ];
    if (claim.pressure) {
        /* Ajna and Solar Plexus were described in full under "how you decide", so here they get only what following them costs; the other two have not been met yet. */
        const described = claim.pressure === 'ajna' || claim.pressure === 'solarPlexus';
        paragraphs.push(described
            ? `Here the likeliest source is ${claim.pressure === 'ajna' ? 'your open way of thinking' : 'your open emotions'}, and the cost can be ${OPEN_COST[claim.pressure]}.`
            : `Here the likeliest source is ${OPEN_NOISE_SHORT[claim.pressure]}, picked up from around you and amplified. The cost can be ${OPEN_COST[claim.pressure]}.`);
    }
    return paragraphs;
};
/** The first step: how to use the authority, by the single authority (two that share a kind do not share a step). */
const authorityStep = (claim) => {
    /* Lunar is checked first: it also needs time, and the "feeling has run its course" step is the emotional one. */
    if (claim.authorityKind === 'lunar') {
        return 'Let about a month pass before anything large, and watch what stays true across all of it.';
    }
    if (claim.needsTime) {
        /* The mechanism was told under how you decide; the step is what to do with it, said once. */
        return claim.initiation === 'direct'
            ? 'Before a move that matters, sleep on it at least once, and tell people when the feeling has settled rather than at its peak.'
            : 'Before committing to anything that matters, sleep on it and look at it again from a different point in your mood.';
    }
    switch (claim.authority) {
        case 'Sacral':
            /* The pull of a firm conclusion or of the room's mood is the next step's job (OPEN_PRACTICE), so it is not said twice. */
            return 'Put choices to yourself as plain yes-or-no questions, and treat a flat response as an answer rather than something to argue with.';
        case 'Splenic':
            return 'Take the first quiet impression seriously, even when a better argument turns up later.';
        case 'Ego Manifested':
            return 'Say what you are willing to commit to out loud, and ask whether you could actually keep it.';
        case 'Ego Projected':
            return 'Talk it through out loud and listen for whether your voice carries real will or only a good case.';
        case 'Self-Projected':
            return 'Say it out loud to someone who will just listen, and pay attention to your own voice rather than to their reply.';
        default:
            return 'Talk it through with people you trust, and take seriously where you physically are while you decide.';
    }
};
/**
 * The opening of the practice: what the steps are FOR in this chart, in one
 * sentence. It replaces "Three practical steps follow from your chart. This is a
 * symbolic lens, not a measurement. If a part does not fit you, let it go." -
 * three sentences that every reading carried and that told no reader anything
 * about themselves.
 */
const practiceLead = (claim, plan) => {
    const signal = AUTHORITY_SIGNAL[claim.authority] ?? 'way of deciding';
    const watched = claim.watchList.slice(0, 2);
    if (watched.length > 0)
        return `Most of what follows is about keeping your ${signal} apart from ${and(watched.map((id) => OPEN_NOISE_SHORT[id]))}.`;
    if (plan.tension.some((t) => t.kind === 'pace'))
        return `Most of what follows is about letting your ${signal} set the pace, not your energy.`;
    return `Most of what follows is about trusting your ${signal} and noticing when something else has started deciding.`;
};
const practice = (claim, plan) => {
    /* The step meets the profile: the situation the conscious line brings is where this way of deciding is most easily skipped. */
    const moment = plan.social ? ` This matters most ${LINE_MOMENT[plan.social.conscious]}.` : '';
    const steps = [`${authorityStep(claim)}${moment}`];
    /* The step for the open centre the chart is most prone to: what to do, not what it is (that was told earlier). */
    const watched = claim.watchList.slice(0, 2);
    if (watched.length > 0)
        steps.push(watched.map((id) => OPEN_PRACTICE[id]).join(' '));
    /* For the two Types with renewable work energy, the contentment follows from spending it where this chart's own answer pointed. */
    const worked = claim.type === 'Generator' || claim.type === 'Manifesting Generator'
        ? `${SIGNATURE_MEANS[claim.type]}, after a day spent on what your ${AUTHORITY_SIGNAL[claim.authority] ?? 'way of deciding'} chose`
        : SIGNATURE_MEANS[claim.type];
    steps.push(claim.signature
        ? `The sign it is working is ${worked}. Human Design calls it ${claim.signature.toLowerCase()}.`
        : 'The sign it is working is how the days feel, not how much got done.');
    return [
        practiceLead(claim, plan),
        /* One step per paragraph. Joined into one they rendered as "1. ... 2. ...
           3. ..." in a single block, which is a list pretending to be prose. */
        ...steps.map((step, index) => `${index + 1}. ${step}`),
    ];
};
/* ---------------------------------------------------------- why it appears */
const evidence = {
    standfirst: 'Each point above, traced back to the calculation it came from, in Human Design\'s own terms.',
    operating: (model) => [
        `Type ${model.operating.type}, from the centre graph: the Sacral is ${model.operating.sacralPowered ? 'defined' : 'undefined'} `
            + `and a motor-to-Throat path ${model.operating.motorToThroat ? `exists (${model.operating.motorPath.map((id) => CENTER_TERM[id]).join(' → ')})` : 'does not exist'}. `
            + `Strategy "${model.operating.strategy}" follows deterministically from the Type.`,
    ],
    decision: (model) => [
        `Authority ${AUTHORITY_TERM[model.decision.authority]}, resolved by the fixed precedence Solar Plexus → Sacral → Spleen → Ego → G → mental, `
            + `against this chart's defined centres`
            + `${model.decision.center ? ` (${CENTER_TERM[model.decision.center]} defined)` : ' (no inner authority centre defined)'}.`
            + `${model.decision.confusableWith ? ` ${CENTER_TERM[model.decision.confusableWith]} is undefined, which is the basis for the signal-and-noise paragraph.` : ''}`,
    ],
    social: (model) => (model.social
        ? [`Profile ${model.social.label}: conscious line ${model.social.conscious} from the Personality Sun, unconscious line `
                + `${model.social.unconscious} from the Design Sun at 88° of solar arc before birth.`]
        : []),
    structure: (model) => {
        const defined = model.energy.centers.filter((center) => center.defined);
        const lines = [
            `${model.energy.definition}: ${model.energy.groups.length} connected group(s) — `
                + model.energy.groups.map((group, index) => `group ${index + 1} ${group.centers.map((id) => CENTER_TERM[id]).join(', ')} [${group.channels.join(', ')}]`).join('; ') + '.',
            `Defined centres (${defined.length}): ${defined.map((center) => CENTER_TERM[center.id]).join(', ') || 'none'}. `
                + `Undefined (${model.energy.openCount}): ${model.energy.centers.filter((c) => !c.defined).map((c) => CENTER_TERM[c.id]).join(', ') || 'none'}.`,
        ];
        if (model.energy.bridgeGates.length > 0) {
            lines.push(`Gates that would bridge the split: ${model.energy.bridgeGates.join(', ')} — computed from the channel table against this chart's groups.`);
        }
        return lines;
    },
    rest: (model, plan) => {
        const lines = [];
        if (plan.consistency && plan.consistency.channels.length > 0) {
            lines.push('Channels named in the reading, in the order they were selected: '
                + plan.consistency.channels.map((channel) => {
                    const why = [
                        channel.carriesAuthority ? 'completes the authority centre' : null,
                        channel.carriesMotorPath ? 'carries the motor-to-Throat path' : null,
                        channel.reachesThroat ? 'reaches the Throat' : null,
                    ].filter(Boolean);
                    return `${channel.id} (${why.join('; ') || 'defined channel'})`;
                }).join(', ') + '.');
        }
        if (model.feedback.signature || model.feedback.notSelf) {
            lines.push(`Signature ${model.feedback.signature ?? 'unavailable'} and Not-Self theme ${model.feedback.notSelf ?? 'unavailable'} are `
                + 'lookups on the Type, not separate calculations.');
        }
        if (model.cross) {
            lines.push(`Incarnation Cross: ${model.cross.angle}, gates ${model.cross.gateNotation}. The angle follows from the profile. `
                + 'The named cross title is not asserted here, because that needs a curated table this engine does not hold.');
        }
        if (model.time.precision === 'approximate') {
            lines.push(model.time.window
                ? `Birth time is an estimate. The chart was recalculated across ±${model.time.window.hours}h; `
                    + `${model.time.window.changes.length > 0 ? `${model.time.window.changes.join(', ')} changed somewhere in that window` : 'no mechanic above changed anywhere in that window'}.`
                : 'Birth time is an estimate; no sensitivity window was scanned for this chart.');
        }
        return lines;
    },
};
/* ------------------------------------------------ the unknown-time envelope -- */
/** Each mechanic in plain words. Human Design's own names are in the evidence, where they can be checked. */
const MECHANIC_WORDS = {
    type: 'how your energy works',
    strategy: 'the strategy that follows from it',
    authority: 'how you decide',
    profile: 'how you meet people',
    definition: 'how the fixed parts connect',
    cross: 'the life theme the chart is built around',
    variables: 'the finer details',
    motorToThroat: 'whether your energy reaches speaking and acting directly',
};
const MECHANIC_TERM = {
    type: 'Type', strategy: 'Strategy', authority: 'Authority', profile: 'Profile', definition: 'Definition',
    cross: 'Incarnation Cross', variables: 'Variables', motorToThroat: 'Motor to Throat',
};
/** The mechanics At a glance shows by name when they hold all day. */
const SHOWN_ABOVE = new Set(['type', 'authority', 'profile', 'definition']);
/**
 * The nine areas in plain words, for the unknown-time reading. With no birth
 * time there is little else to say, so the areas that hold all day are said by
 * what they are about, not only by their short names. Human Design's own names
 * stay in the evidence.
 */
const ENVELOPE_AREA = {
    head: 'the pressure to make sense of things',
    ajna: 'the way your thinking settles into conclusions',
    throat: 'putting things into words and action',
    g: 'your sense of who you are and where you are heading',
    ego: 'what you commit to and can keep',
    solarPlexus: 'the way your feelings rise and fall',
    sacral: 'your energy for work',
    spleen: 'instinct, timing and the sense of what feels safe',
    root: 'the pressure to get things moving',
};
/** The area by name with its plain meaning, for the open areas, where the name is what the reader looks for. */
const ENVELOPE_NAMED = {
    head: 'mental pressure (the pull to make sense of things)',
    ajna: 'how you think (how your thinking settles into conclusions)',
    throat: 'expression (putting things into words and action)',
    g: 'identity (your sense of who you are and where you are heading)',
    ego: 'willpower (what you commit to and can keep)',
    solarPlexus: 'emotions (the way your feelings rise and fall)',
    sacral: 'work energy (your energy for work)',
    spleen: 'instinct (timing and the sense of what feels safe)',
    root: 'drive (the pressure to get things moving)',
};
/*
 * The closing "This is a symbolic lens, not a measurement. If a part does not fit
 * you, let it go." that ended every unknown-time reading is gone, with the same
 * line in the timed reading: it said nothing about the reader, and the reading
 * already attributes each point to Human Design and hedges what is a tendency.
 */
const envelope = {
    intro: (claim) => {
        driveGlossed = false;
        /*
         * The fixed and open areas are NAMED in the two sections below, so they are
         * not counted here. What an unknown time still settles about how the energy
         * works is said once, in the mechanism's own words, with the Type named
         * after it - the Type is already shown above.
         */
        const typed = claim.stable.find((entry) => entry.key === 'type');
        const typeKey = typed && typed.value in TYPE_MECHANIC ? typed.value : null;
        const mechanism = typeKey ? TYPE_MECHANIC[typeKey] : '';
        const mechanics = [];
        for (const entry of claim.stable) {
            /* A Type already carries whether a direct route exists. */
            if (typeKey && (entry.key === 'type' || entry.key === 'motorToThroat'))
                continue;
            if (entry.key === 'motorToThroat')
                mechanics.push(entry.value === 'yes' ? 'a direct line from your energy to speaking and acting' : 'the absence of a direct line from your energy to speaking and acting');
            /* At a glance shows a mechanic that holds all day; the reading points to it rather than leaving "how your energy works" unsaid. */
            else if (entry.key !== 'strategy' && entry.key !== 'variables')
                mechanics.push(`${MECHANIC_WORDS[entry.key]}${SHOWN_ABOVE.has(entry.key) ? ` (your ${MECHANIC_TERM[entry.key]})` : ''}`);
        }
        const settled = mechanics.length > 0
            ? `${capitalise(and(mechanics))} ${mechanics.length > 1 ? 'also hold' : 'also holds'} all day.`
            : '';
        const needs = claim.moving
            .filter((entry) => entry.key !== 'strategy' || !claim.moving.some((other) => other.key === 'type'))
            .map((entry) => MECHANIC_WORDS[entry.key]);
        const centres = claim.movingCentres.length > 0
            ? `whether ${centreNames(claim.movingCentres)} ${claim.movingCentres.length === 1 ? 'is' : 'are'} fixed or open`
            : '';
        const needsText = needs.length > 0
            ? `The rest needs a birth time: ${and(needs)}.${centres ? ` The hour also decides ${centres}.` : ''}`
            : centres ? `The hour decides ${centres}.` : '';
        return [
            'No birth time was given, and Human Design reads everything from one exact moment. So instead of guessing an '
                + 'hour, your whole birth date was checked. What stays the same across the entire day is read below; what changes '
                + 'with the hour is left out rather than guessed.',
            ...(mechanism || settled ? [[mechanism, settled].filter(Boolean).join(' ')] : []),
            ...(needsText ? [needsText] : []),
        ];
    },
    consistent: (claim) => {
        if (claim.definedAllDay.length === 0)
            return [];
        const n = claim.definedAllDay.length;
        /* The two links the Throat would complete are the direct route, but only if the Type says that route exists. */
        const direct = claim.stable.some((entry) => entry.key === 'motorToThroat' && entry.value === 'yes');
        const links = claim.channelsAllDay
            .map((id) => hdChannels.find((channel) => channel.id === id))
            .filter((channel) => Boolean(channel));
        const phrases = links.map((channel) => {
            const [left, right] = linkEnds(channel.centers);
            return `${shortName(left)} to ${shortName(right)}`;
        });
        const routeLink = direct
            ? links.find((channel) => channel.centers.includes('throat') && channel.centers.some((id) => ['sacral', 'solarPlexus', 'ego', 'root'].includes(id)))
            : undefined;
        const routeEnds = routeLink ? linkEnds(routeLink.centers) : null;
        return [
            `${capitalise(count(n))} ${n === 1 ? 'area is' : 'areas are'} fixed whatever the hour you were born: `
                + `${claim.definedAllDay.length > 2 ? `${claim.definedAllDay.slice(0, -1).map((id) => ENVELOPE_AREA[id]).join(', ')}, and ${ENVELOPE_AREA[claim.definedAllDay[claim.definedAllDay.length - 1]]}` : and(claim.definedAllDay.map((id) => ENVELOPE_AREA[id]))}. `
                + steadyLine(claim.definedAllDay),
            ...(claim.channelsAllDay.length > 0
                ? [`${claim.channelsAllDay.length === 1 ? 'One link between them is' : `${capitalise(count(claim.channelsAllDay.length))} links between them are`} `
                        + `complete all day${phrases.length === claim.channelsAllDay.length ? `: ${and(phrases)}` : ''}.`
                        + `${routeEnds ? ` The link from ${shortName(routeEnds[0])} to ${shortName(routeEnds[1])} is the direct route into speaking and acting described above.` : ''}`]
                : []),
        ];
    },
    context: (claim) => {
        if (claim.openAllDay.length === 0)
            return [];
        const n = claim.openAllDay.length;
        const one = n === 1;
        return [
            `${capitalise(count(n))} ${one ? 'area is' : 'areas are'} open whatever the hour: ${and(claim.openAllDay.map((id) => ENVELOPE_NAMED[id]))}. `
                + `${one ? 'It takes on the character of the people and places around you and amplifies it.' : 'They take on the character of the people and places around you and amplify it.'} `
                + 'What comes in there can be hard to tell apart from what is your own.',
        ];
    },
    evidence: (claim) => [
        `Birth time: not given. The whole local birth date was scanned: ${claim.segments} stretches on which every activation's `
            + 'gate and line hold, each read once. Only what is the same in all of them is read above.',
        ...(claim.definedAllDay.length > 0
            ? [`Defined all day: ${claim.definedAllDay.map((id) => CENTER_TERM[id]).join(', ')}${claim.channelsAllDay.length > 0 ? `; channel ${claim.channelsAllDay.join(', ')}` : ''}.`]
            : []),
        ...(claim.openAllDay.length > 0 ? [`Open all day: ${claim.openAllDay.map((id) => CENTER_TERM[id]).join(', ')}.`] : []),
        ...(claim.movingCentres.length > 0
            ? [`Depends on the hour: ${claim.movingCentres.map((id) => CENTER_TERM[id]).join(', ')}${claim.channelsSometimes.length > 0 ? `; channel ${claim.channelsSometimes.join(', ')} only at some hours` : ''}.`]
            : []),
        ...claim.stable.filter((entry) => entry.key === 'cross').map((entry) => `Holds all day: ${MECHANIC_TERM.cross} ${entry.value}.`),
        /* Each value a mechanic takes is listed, so none is singled out - except the
           Variables, whose tones change dozens of times a day and say nothing listed. */
        ...(claim.moving.length > 0
            ? [`Changes during the day, so none is chosen: ${claim.moving.map((entry) => (entry.key === 'variables'
                    ? MECHANIC_TERM.variables
                    : `${MECHANIC_TERM[entry.key]}: ${entry.values.join(' or ')}`)).join('; ')}.`]
            : []),
        `Gates activated all day: ${claim.gatesAllDay}.`,
    ],
};
export const EN_VOICE = {
    time,
    operating,
    decision,
    social,
    consistency,
    context,
    tension,
    tensionStandfirst,
    cost,
    practice,
    evidence,
    envelope,
    withheld: [
        'Human Design is not shown for this profile, because no birth time was supplied.',
        'A chart could still be calculated, using noon as a stand-in time. The trouble is that it could be wrong in ways '
            + 'nothing on the page would show. Every part of a Human Design chart comes from one exact moment. Which areas are '
            + 'fixed, and how they link, can change within a few hours, and your Type, your way of deciding and your profile '
            + 'change with them. A chart built on a guessed time looks exactly as confident as a real one.',
        'So it is withheld rather than estimated. Adding a recorded birth time resolves this. The other three readings '
            + 'in your self-map do not depend on the time and are unaffected.',
    ],
};
