import { hdChannels } from '../../human-design/data/hdChannels.js';
import { CENTER_TERM, capitalise, listWords, numberWord } from './humanDesignVoice.js';
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
 * not say that part of you is weak").
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
const CENTER_SHORT = {
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
/** A function of the chart, written to be the subject of "is steady" / "depends on". */
const FUNCTION_DOES = {
    drive: 'your energy',
    awareness: 'how you take in and make sense of things',
    expression: 'how you express things',
    direction: 'your sense of direction',
};
/** A profile line as what YOU do on that side - the subject is the reader, never "it". */
const LINE_IS = {
    1: 'want solid ground under a thing before you trust it, and you go looking for that ground',
    2: 'are naturally good at something you never studied, and do best when left alone until someone notices it and asks for it',
    3: 'find out by trying and learn what does not work, which counts as the method here, not as failure',
    4: 'work through people you already know, so things tend to reach you through your existing circle rather than from strangers',
    5: 'tend to have things projected onto you: people may arrive expecting a solution, and your reputation can run ahead of the reality',
    6: 'live in phases: a trial-and-error stretch early on, then a period of standing back and watching, then living from what that produced',
};
const LINE_SHORT = {
    1: 'needing solid ground', 2: 'a natural knack', 3: 'learning by trying',
    4: 'working through people you know', 5: 'being expected to have the answer', 6: 'living in phases',
};
/**
 * One of several equivalent phrasings, chosen by a fact of THIS chart.
 *
 * A paragraph that several charts share word for word reads as a template to
 * anyone who compares readings. The seed is always something the claim carries
 * (the authority, the channels that complete it, the noise a chart is prone
 * to), never a counter or a random number, so the same chart reads the same on
 * every device and every run.
 */
function variant(seed, options) {
    let hash = 11;
    for (let index = 0; index < seed.length; index += 1)
        hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
    return options[hash % options.length];
}
/** The tradition's name for the Type, said once, after the mechanism has been described. */
const TYPE_NAME = {
    'Manifesting Generator': 'a Manifesting Generator',
    Generator: 'a Generator',
    Manifestor: 'a Manifestor',
    Projector: 'a Projector',
    Reflector: 'a Reflector',
};
/**
 * HOW THE TYPE OPERATES - told without the label.
 *
 * Each is written from what the chart actually has: a renewable source of
 * energy or not, and a route from it to speech and action or not. That is the
 * whole of what makes a Type, so it is the whole of what these say.
 */
const TYPE_MECHANIC = {
    'Manifesting Generator': 'In Human Design terms, you have a steady supply of energy for work, and a direct route from that energy into speaking and acting. '
        + 'So there is fuel for sustained effort and a way for it to come out. Things can start from you, not only through you.',
    Generator: 'In Human Design terms, you have a steady supply of energy for work, but no direct route from it into speaking and acting. '
        + 'The fuel for sustained effort is there. What is missing is a way to push it outward from a standing start, '
        + 'so your work tends to land when it answers something rather than announces it.',
    Manifestor: 'In Human Design terms, you have a direct route from a source of energy into speaking and acting, but no steady supply of energy for work underneath it. '
        + 'Starting comes naturally; long grinding is expensive. Your energy arrives in usable bursts rather than as a constant supply.',
    Projector: 'In Human Design terms, you have no steady supply of energy for work of your own. What you have instead is a build for reading situations '
        + 'and people closely. That is a real capacity, and a different one from being built to out-work a room.',
    Reflector: 'In Human Design terms, nothing in your chart is fixed. Every part of it takes its character from what is around you, which makes you an '
        + 'accurate gauge of how a place is doing. It also means almost nothing about you reads the same from one week to the next.',
};
/** The same instruction told another way, for the Types that share it. */
const INITIATION_ASKS_ALT = 'Starting works best for you when you have something real to respond to: a request, an obstacle, work that is already there. '
    + 'Beginning from an idea of what ought to happen is where it tends to stall.';
/** What the strategy actually asks, once the slogan is set aside. */
const INITIATION_ASKS = {
    'after-response': 'Starting things works best for you when there is something real to start from: a request, an obstacle, '
        + 'a piece of work that already exists. It tends to stall when it comes only from an idea of what ought to happen.',
    direct: 'You can move first, and how it lands depends on whether the people it affects were told beforehand. '
        + 'Telling them is part of how the move works.',
    'on-recognition': 'Your work goes well where it is actually wanted. Waiting to be recognised is not about being polite. It is the '
        + 'difference between an insight that gets used and the same insight offered where nobody asked for it.',
    'over-a-cycle': 'No part of your chart gives a same-day answer, because what it picks up keeps changing with your surroundings. '
        + 'Letting a decision sit over a longer stretch is how a steady answer comes out of something built to shift.',
};
/**
 * THE WAY OF DECIDING, translated - what it is, what it is NOT, and what
 * gets mistaken for it. The "is not" half is the part generic advice always
 * skips, and it is the half that makes the paragraph usable.
 *
 * Each half is a list of equivalent phrasings: the two authorities that most
 * charts share (Sacral, Emotional) have two, so two charts of the same kind do
 * not read word for word the same. `decision` picks by the chart's own facts.
 */
const AUTHORITY_MECHANISM = {
    Sacral: {
        is: [
            'Your decisions sit in the body rather than the mind. The signal is a pull toward something, '
                + 'or a flatness about it, that arrives before your reasons do. It shows up as energy turning up for a thing, '
                + 'or quietly not turning up.',
            'Your decisions are located in the body rather than the mind, ahead of any reasoning. The signal is a pull toward something, '
                + 'or a flatness about it. In practice it is energy that either turns up for a thing or quietly does not.',
            'Your decisions live in the body rather than the mind. You get a pull toward something, or a flatness about it, '
                + 'before the reasons catch up. In practice, energy either turns up for a thing or quietly does not.',
        ],
        isNot: [
            'It is not a preference, and not the answer you would defend if challenged. Preferences stay put; this signal '
                + 'does not. The same question can get a different answer on a different day, and that is the '
                + 'signal working, not you being inconsistent.',
            'It is a response rather than a preference, and you may not be able to defend it if challenged. Preferences stay '
                + 'put; this signal moves. The same question can get a different answer on a different day, which counts '
                + 'as the signal at work.',
            'This is a response, not a preference, and it may not survive an argument. Preferences stay put; the response moves. '
                + 'Asked on a different day, the same question can get a different answer, which counts as the signal doing its job.',
        ],
    },
    Splenic: {
        is: ['Your decisions sit in a quiet, in-the-moment sense of whether something is sound. '
                + 'It is closer to noticing than to concluding, and it is immediate and subtle.'],
        isNot: ['It does not build up, and it does not repeat itself. That is the hard part: it speaks once, and anything '
                + 'that keeps insisting afterwards is coming from somewhere else.'],
    },
    'Emotional / Solar Plexus': {
        is: [
            'Your answer may not be clear in the moment, and that is how your deciding works, not a '
                + 'flaw in it. Clarity comes once a feeling has run its full course. So you decide by letting time pass and seeing '
                + 'how the thing looks afterwards.',
            'Your answer may not be clear in the moment. Clarity comes once a feeling has run its full '
                + 'course, so you decide by letting time pass and seeing how the thing looks afterwards.',
            'You may not know your answer in the moment. That is how your deciding works: a feeling has to run '
                + 'its full course before the answer is clear, so time is part of the method.',
        ],
        isNot: [
            'It is not a mood to manage or override. The high point of enthusiasm is no more the answer than the low '
                + 'point: both belong to the same movement, and neither one is the decision.',
            'Enthusiasm at its high point is no more the answer than the low point. Both belong to the same movement, and '
                + 'the decision is whatever remains once it has passed.',
            'Neither the high nor the low of a feeling is the answer. Both belong to the same movement, and the decision shows '
                + 'once it has settled.',
        ],
    },
    'Ego Manifested': {
        is: ['Your decisions rest on what you actually have the will for: what you would genuinely commit to '
                + 'and could keep. It tends to become clear when you hear yourself say it out loud.'],
        isNot: ['It is not what you think you should want, or what you can argue yourself into. It answers one question, '
                + '"do I actually want this?", and says nothing about whether wanting it is reasonable.'],
    },
    'Ego Projected': {
        is: ['Your decisions rest on what you genuinely have the will for, heard in your own voice rather '
                + 'than worked out in silence.'],
        isNot: ['It is not a conclusion you reach alone on paper. Thinking it through in your head tends to produce a '
                + 'good case rather than an answer.'],
    },
    'Self-Projected': {
        is: ['Your decisions rest on direction rather than appeal: which way a thing points you. It becomes '
                + 'clear when you talk it through out loud with someone who is simply listening.'],
        isNot: ['It is not their advice, and it is not a decision made silently in your head. The other person is there so '
                + 'that you can hear yourself; what they think of it is not the point.'],
    },
    'Mental / Environmental': {
        is: ['You have no single inner place where decisions are made. Instead you decide by talking things '
                + 'through with people you trust, while paying attention to where you physically are.'],
        isNot: ['That does not mean asking others to decide. Your mind will have plenty to say, but it is not where the '
                + 'decision comes from either: it is for working things through and for talking with others. What the decision '
                + 'actually rests on is the place you are in.'],
    },
    Lunar: {
        is: ['Anything large is best given a full lunar cycle, about a month. Across that stretch the same '
                + 'question is seen from a changing set of angles, and what stays consistent through all of them is the answer.'],
        isNot: ['It is not indecision, and it is not a delaying tactic. A same-day answer from you is a reading of whoever '
                + 'was in the room at the time.'],
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
/** What an open centre tends to manufacture - the long form, used once, where the chart sets up a confusion. */
const OPEN_NOISE = {
    head: 'questions that feel urgent and are often not yours',
    ajna: 'certainty: firm-sounding conclusions with nothing solid underneath them',
    throat: 'pressure to speak, and speaking to be noticed rather than because there is something to say',
    g: 'the sense that you ought to have a fixed direction by now',
    ego: 'promises made to prove something, and the need to keep proving your worth',
    solarPlexus: 'other people\'s emotional weather, picked up and amplified until it feels like your own',
    sacral: 'the feeling that you should be able to keep going as long as everyone else',
    spleen: 'a reluctance to let go of things that are no longer good for you',
    root: 'a hurry that is not yours: pressure to be finished with no actual deadline behind it',
};
/**
 * THE NOT-SELF THEME, TRANSLATED.
 *
 * The tradition names one recurring state per Type and treats it as a signal.
 * Printing the word explains nothing, so each Type has the state, described,
 * and what Human Design reads a recurring version of it as - a dashboard
 * light, not a diagnosis and not a prophecy. The word itself is attached in
 * the sentence between them.
 */
const NOT_SELF_STATE = {
    'Manifesting Generator': 'a stuck kind of irritation: pushing at something that will not give',
    Generator: 'a stuck kind of irritation: effort going into something that is not moving',
    Manifestor: 'a hard flare of heat, usually at being blocked or questioned',
    Projector: 'a specific kind of sourness: effort given and not seen',
    Reflector: 'flatness, the sense that nothing stands out from anything else',
};
const NOT_SELF_READS = {
    'Manifesting Generator': 'When it keeps coming back, it usually means the thing was started from an idea of what should happen, '
        + 'rather than from something real to push against.',
    Generator: 'When it keeps coming back, it is read as a sign that the work was taken on because it was there, '
        + 'not because anything in you answered it.',
    Manifestor: 'When it keeps coming back, it is read as a sign that people may be caught off guard by your moves. '
        + 'Telling people first tends to ease that resistance.',
    Projector: 'When it keeps coming back, it is read as a sign that you are offering into places where nobody asked. '
        + 'That costs you far more than it would cost someone built to push.',
    Reflector: 'When it keeps coming back, it is read as a sign that you are in a place that is not good for you. '
        + 'You take on the character of where you are more than anything else.',
};
/** The signature state, same treatment: described, then named. */
const SIGNATURE_MEANS = {
    'Manifesting Generator': 'the tired, settled contentment of having really done something by the end of the day',
    Generator: 'the tired, settled contentment of having really done something by the end of the day',
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
            + `Treat those parts as provisional${scanned.changes.includes('channels') ? ', including any link named under the fixed areas below' : ''}. `
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
    const asks = claim.initiation === 'after-response'
        ? variant(`ask|${claim.type}|${claim.motorPath.join(',')}|${claim.pathChannels.length}`, [INITIATION_ASKS['after-response'], INITIATION_ASKS_ALT])
        : INITIATION_ASKS[claim.initiation];
    /* A Manifestor's route IS the Type, so it is said once, here, with the chart's own starting point. */
    if (claim.type === 'Manifestor' && hasRoute) {
        const names = claim.motorPath.map(shortName);
        const middle = names.slice(1, -1);
        first = first.replace('a direct route from a source of energy into speaking and acting', `a direct route from a source of energy, your ${names[0]}${middle.length > 0 ? `, through ${and(middle)},` : ','} into speaking and acting`);
    }
    const paragraphs = [`${first} That is what Human Design calls ${TYPE_NAME[claim.type]}.`, asks];
    if (claim.type !== 'Manifestor' && hasRoute && claim.pathChannels.length > 0) {
        const links = claim.pathChannels.length;
        paragraphs.push(`In your chart that route runs ${route(claim.motorPath)}, held open by `
            + `${links === 1 ? 'one complete link' : `${count(links)} complete links`}. `
            + 'Not every chart of your type has it in the same way.');
    }
    return paragraphs;
};
/** What an open centre manufactures, as the paragraph that sets up the confusion - said in full once, here. */
const noiseParagraph = (center) => {
    if (center === 'ajna') {
        return 'One thing in your chart is easily mistaken for this signal: certainty, meaning firm-sounding conclusions with nothing solid underneath them. '
            + 'Your way of thinking is open to what is around you and amplifies what it picks up, which is why such conclusions can feel so convincing. '
            + 'So the test is not how certain something feels, but whether it is the kind of signal just described.';
    }
    if (center === 'solarPlexus') {
        return 'One thing in your chart is easily mistaken for this signal: other people\'s emotional weather. '
            + 'Your emotions are open, so they pick up the mood around you and amplify it until it feels like your own. '
            + 'So the test is not how strongly something feels, but whether it arrives the way the signal just described does.';
    }
    return `One thing in your chart is easily mistaken for this signal. It is ${OPEN_NOISE[center]}. `
        + 'An open part of your chart picks it up and amplifies it, which is why it can feel so convincing.';
};
const decision = (claim) => {
    const mechanism = AUTHORITY_MECHANISM[claim.authority];
    const seed = `${claim.authority}|${claim.type}|${claim.evidence.join(',')}|${claim.confusableWith ?? ''}`;
    const paragraphs = [
        `${variant(`${seed}|is`, mechanism.is)} The place a decision comes from is called your authority.`,
        variant(`${seed}|not`, mechanism.isNot),
    ];
    if (claim.confusableWith)
        paragraphs.push(noiseParagraph(claim.confusableWith));
    return paragraphs;
};
/** The two lines introduced two ways, chosen by the profile, so five profiles do not share one telling. */
const profileLines = (claim) => variant(`profile|${claim.conscious}${claim.unconscious}`, [
    ['The first is the side you are aware of.', 'The second runs underneath, where others see it more easily than you do.'],
    ['The first line is the side of you that you can see.', 'The second line works underneath, where other people notice it more readily than you do.'],
]);
const social = (claim) => {
    const paragraphs = [
        `Your profile shows how you meet people, through two lines numbered one to six. ${profileLines(claim)[0]} There, you ${LINE_IS[claim.conscious]}. ${profileLines(claim)[1]} There, you ${LINE_IS[claim.unconscious]}.`,
    ];
    if (claim.shape === 'opposed') {
        paragraphs.push('The pull between the two lines is the shape of the profile, not a problem in it. '
            + 'If parts of how you meet people feel contradictory, this may be why.');
    }
    else if (claim.shape === 'staged') {
        const sixes = claim.conscious === 6 && claim.unconscious === 6
            ? 'Both of your lines are sixes'
            : `Your ${claim.conscious === 6 ? 'first' : 'second'} line is a six`;
        paragraphs.push(`${sixes}, and a six unfolds in phases, so this part of you is not meant to stay the same across a life. `
            + 'Read this as an overall shape, not as something you should already recognise.');
    }
    else {
        paragraphs.push(`Both lines pull the same way: ${LINE_SHORT[claim.conscious]} and ${LINE_SHORT[claim.unconscious]} reinforce `
            + `each other rather than interrupt. That tends to make this the least conflicted part of your chart.`);
    }
    return paragraphs;
};
/** A link between two areas, the Throat last: "emotions to expression", whichever way the table lists it. */
const linkEnds = (centers) => (centers[0] === 'throat' ? [centers[1], centers[0]] : [centers[0], centers[1]]);
/**
 * The links that hold the fixed areas, with two channels between the same
 * pair of areas said once - "identity to work energy (two separate links)" -
 * rather than as "identity to work energy and work energy to identity", which
 * read as a typo. Order is the plan's: a pair is placed where it first appears.
 */
const linkPhrases = (channels) => {
    const pairs = [];
    for (const channel of channels) {
        const [left, right] = linkEnds(channel.centers);
        const key = [left, right].sort().join('|');
        const seen = pairs.find((pair) => pair.key === key);
        if (seen)
            seen.n += 1;
        else
            pairs.push({ key, left, right, n: 1 });
    }
    return pairs.map((pair) => `${shortName(pair.left)} to ${shortName(pair.right)}`
        + `${pair.n > 1 ? ` (${count(pair.n)} separate links)` : ''}`);
};
/**
 * What "fixed" means for the reader, once, for whichever areas are fixed. A
 * fixed emotional area is the exception: feelings rise and fall, and saying
 * they "work the same whoever you are with" would contradict the way of
 * deciding the reading has just described.
 */
const steadyLine = (ids, seed) => {
    const rest = ids.filter((id) => id !== 'solarPlexus');
    if (ids.includes('solarPlexus')) {
        const tail = rest.length === 0 ? ''
            : ` ${capitalise(centreNames(rest))} ${rest.length === 1 ? 'works' : 'work'} the same way whoever you are with and whatever kind of day it is.`;
        return `Your feelings still rise and fall, but the way they move is reliably your own.${tail}`;
    }
    return variant(seed, ids.length === 1
        ? [
            'It works the same way whoever you are with and whatever kind of day it is. It needs little managing, and other people can usually predict it.',
            'Whoever you are with and however the day goes, it works the same way. Other people can usually predict it, and it needs little managing.',
            'This is the steadiest part of you: it holds across settings and moods, and it needs little managing.',
        ]
        : [
            'They work the same way whoever you are with and whatever kind of day it is. They need little managing, and other people can usually predict them.',
            'Whoever you are with and however the day goes, they work the same way. Other people can usually predict them, and they need little managing.',
            'These are the steadiest parts of you: they hold across settings and moods, and they need little managing.',
        ]);
};
const consistency = (claim) => {
    const whole = claim.functions.filter((fn) => fn.state === 'all-defined');
    const part = claim.functions.filter((fn) => fn.state === 'mixed');
    /*
     * The centres first, then the pattern they make.
     *
     * Naming a function and its only centre in the same breath - "how things get
     * said and done, expression" - says one thing twice, and threading both
     * through a single list made the sentence unreadable at three items. So the
     * list is centres, and the pattern is its own sentence.
     */
    const allDefined = claim.functions.flatMap((fn) => fn.defined);
    const one = claim.definedCount === 1;
    const paragraphs = [
        `${capitalise(count(claim.definedCount))} of the nine areas of your chart ${one ? 'is' : 'are'} fixed: ${centreNames(allDefined)}. `
            + steadyLine(allDefined, `${claim.definedCount}|${allDefined.join(',')}`),
    ];
    if (whole.length > 0 || part.length > 0) {
        const steady = whole.length > 0 ? `This keeps ${and(whole.map((fn) => FUNCTION_DOES[fn.fn]))} steady.` : '';
        /* Said here and only here: the open areas below do not say it again. */
        let others = 0;
        const partly = part
            .map((fn) => {
            if (fn.fn === 'drive') {
                /* A fixed work-energy area is the reliable supply; what is open is what steers it. Without it the energy comes and goes. */
                return fn.defined.includes('sacral')
                    ? `Your work energy is reliable. What is less settled is how that energy is steered, because ${fn.open.length > 1 ? 'several of the areas that direct it are' : 'one of the areas that directs it is'} open: ${centreNames(fn.open)}.`
                    : `Your energy is not steady throughout: it is fixed in ${centreNames(fn.defined)} and open in ${centreNames(fn.open)}.`;
            }
            others += 1;
            return others === 1
                ? `${capitalise(FUNCTION_DOES[fn.fn])} is only partly steady: it comes from several areas, and only some of them are fixed.`
                : `${capitalise(FUNCTION_DOES[fn.fn])} is partly steady for the same reason.`;
        })
            .join(' ');
        paragraphs.push(whole.length > 0
            ? [steady, partly].filter(Boolean).join(' ')
            : `Nothing here is steady all the way through. ${partly}`);
    }
    if (claim.channels.length > 0) {
        const names = (channel) => {
            const [left, right] = linkEnds(channel.centers);
            return `${shortName(left)} to ${shortName(right)}`;
        };
        if (claim.channels.length === 1) {
            const [channel] = claim.channels;
            const [left, right] = linkEnds(channel.centers);
            paragraphs.push(`${claim.definedCount === 2 ? `One link, from ${shortName(left)} to ${shortName(right)}, keeps both fixed.` : `One link joins ${names(channel)}.`}`
                + `${channel.carriesMotorPath ? ' It is the direct route into speaking and acting described at the start.' : ''}`);
        }
        else {
            /* The plan names at most three links; at three there may be more, so they are "the main" ones. */
            const all = claim.channels.length < 3;
            const routeLink = claim.channels.find((channel) => channel.carriesMotorPath);
            paragraphs.push(`${all ? 'The links' : 'The main links'} between them join ${and(linkPhrases(claim.channels))}.`
                + `${routeLink ? ` The link from ${names(routeLink)} is the direct route into speaking and acting described at the start.` : ''}`);
        }
    }
    return paragraphs;
};
const context = (claim) => {
    if (claim.whollyOpen) {
        return [
            'Because no part of your chart is fixed, the question "what am I like?" has a different answer depending on '
                + 'where you ask it. Each answer says as much about the place as about you.',
            'This is sampling, not emptiness: you show the state of a room accurately because you hold '
                + 'nothing of your own. In practice, where you spend your time is not a lifestyle question for you. It is the main variable.',
        ];
    }
    const whole = claim.functions.filter((fn) => fn.state === 'all-open');
    const openest = [...claim.functions].sort((a, b) => b.open.length - a.open.length)[0];
    const allOpen = claim.functions.flatMap((fn) => fn.open);
    /* One open centre is singular all the way through: "the other one is open", "it takes its character". */
    const one = claim.openCount === 1;
    /* Areas that are only partly open were already said to be partly steady (see `consistency`); only the wholly open ones are added here. */
    const depends = whole.length > 0
        ? `That leaves ${and(whole.map((fn) => FUNCTION_DOES[fn.fn]))} depending heavily on your surroundings.`
        : '';
    return [
        `${one ? 'The other one is open' : `The other ${count(claim.openCount)} are open`}: ${centreNames(allOpen)}. `
            + 'Open does not mean missing; it means changeable. '
            + `${one ? 'It takes its character from the people and places around you, and magnifies what it picks up.' : 'These areas take their character from the people and places around you, and magnify what they pick up.'}`
            + `${depends ? ` ${depends}` : ''}`,
        `${one ? 'This is also where' : 'These are also where'} you learn the most, because an open area takes in a wider `
            + 'range than a fixed one. The cost is that what comes in through '
            + `${openest && openest.open.length > 0 ? centreNames(openest.open) : 'them'} can be hard to tell apart from what is your own.`,
    ];
};
/**
 * What tells the chart's own answer apart from the noise, by the way of
 * deciding. The noise itself was described in full under "how you decide"; this
 * is the practical difference, and it differs by authority, so the paragraph
 * says something the earlier one did not.
 */
const signalVersusNoise = (claim) => {
    const noise = OPEN_NOISE_SHORT[claim.noise];
    const lead = capitalise(noise);
    switch (claim.authorityKind) {
        case 'emotional':
            return `Your own answer takes time to form, while ${noise} arrives at once. That speed is what makes it tempting.`;
        case 'somatic':
            return claim.noise === 'solarPlexus'
                ? `Your own answer is quiet and bodily. ${lead} can be loud, and loudness says nothing about whether it is yours.`
                : `Your own answer comes from the body and may not have words yet. ${lead} tends to arrive fully worded, which is why it is easy to follow.`;
        case 'relational':
            return `Your own answer is the one you hear when you say it aloud. ${lead} can feel just as convincing in silence, so say it out loud before you trust it.`;
        case 'lunar':
            return `Your own answer settles over about a month. ${lead} tends to arrive the same day, which is a reason to hold it lightly.`;
        default:
            return `${lead} can feel like an answer, though it works very differently from your real way of deciding.`;
    }
};
/*
 * No "There is a second place ..." / "And there is a third." openers: each
 * tension is its own paragraph under a standfirst that already says what the
 * section is, so a counting sentence carried no idea. `previous` and `index`
 * stay in the signature for the voices that use them.
 */
const tension = (claim, _previous, _index = 0) => {
    switch (claim.kind) {
        case 'pace':
            return `How your energy moves and how you decide run at different speeds. Your energy is built to move `
                + `${claim.initiation === 'direct' ? 'first and fast' : 'as soon as something real appears'}, but your decisions `
                + `need time before there is anything to read. The trap is letting the pace of the doing set the pace of the deciding.`;
        case 'split': {
            /* Two parts are "one" and "the other"; a third or fourth part is counted, and "the two" becomes "they". */
            const two = claim.groups.length === 2;
            const ORDINAL = ['One holds', 'another holds', 'a third holds', 'a fourth holds', 'a fifth holds'];
            const parts = claim.groups
                .map((group, index) => `${index === 0 ? 'One holds' : two ? 'the other holds' : (ORDINAL[index] ?? 'another holds')} ${centreNames(group.centers)}`)
                .join('; ');
            const gates = claim.bridgeGates;
            return `Your chart splits into ${count(claim.groups.length)} groups with no direct link between them. `
                + `${parts}. Each is consistent within itself, so ${two ? 'the two can run on different logic at once' : 'they can run on different logic at once'}.`
                + (gates.length > 0
                    ? ` A gate is a single point that completes a link between two areas. The gap would close at ${gates.length === 1
                        ? `gate ${gates[0]}, which your chart does not carry`
                        : gates.length > 4
                            ? `gates such as ${and(gates.slice(0, 4).map(String))}, and your chart has none of them`
                            : `gates ${and(gates.map(String))}, and your chart has none of them`}.`
                    : '');
        }
        case 'signal-noise':
            return signalVersusNoise(claim);
        case 'profile':
            return `The two lines of your profile want different things: ${LINE_SHORT[claim.conscious]} in front, `
                + `${LINE_SHORT[claim.unconscious]} underneath. The friction shows most in situations that ask you to be only one of the two.`;
        case 'reach':
            return `Your chart has a fixed way of taking things in (${centreNames(claim.awareness)}) but no fixed energy underneath `
                + `it: ${centreNames(claim.openDrive)} ${claim.openDrive.length > 1 ? 'all vary' : 'varies'}. So you are likely to `
                + `see more than you can reliably act on. That is workable once you expect it, and exhausting if you treat it as `
                + `a personal failure to follow through.`;
        default:
            return '';
    }
};
const cost = (claim) => {
    const paragraphs = [
        `When you work against the grain of your chart, what tends to show up is ${NOT_SELF_STATE[claim.type]}. `
            + `${claim.notSelf ? `Human Design calls it ${claim.notSelf.toLowerCase()} and treats it` : 'It is treated'} `
            + `as a signal to read, not a state to fix. ${NOT_SELF_READS[claim.type]}`,
    ];
    if (claim.pressure) {
        /* Ajna and Solar Plexus were described in full under "how you decide"; the other two have not been met yet. */
        const described = claim.pressure === 'ajna' || claim.pressure === 'solarPlexus';
        paragraphs.push(described
            ? `In your chart, its likeliest source is ${claim.pressure === 'ajna'
                ? 'your open way of thinking, described earlier, which produces certainty that is not really yours'
                : 'your open emotions, described earlier, which pick up the emotional weather in the room'}. `
                + 'The pressure is real, but some of it may not be yours.'
            : `In your chart, its likeliest source is ${OPEN_NOISE_SHORT[claim.pressure]}. That part of you is sensitive: `
                + 'it picks up its surroundings and amplifies them, so some of the pressure may not be yours.');
    }
    return paragraphs;
};
const practice = (claim) => {
    const steps = [];
    const seed = `${claim.authority}|${claim.watch ?? ''}|${claim.type}`;
    /* Lunar is checked first: it also needs time, and the "feeling has run its course" step is the emotional one. */
    steps.push(claim.authorityKind === 'lunar'
        ? 'Let a full cycle of about a month pass before anything large, and watch what stays true across all of it.'
        : claim.needsTime
            ? (claim.initiation === 'direct'
                ? 'Wait for the feeling to run its course before you commit. Your answer is whatever is left once the peak has passed.'
                : 'Give decisions time before committing to them. Your answer is what is left once the feeling has run its course; thinking harder will not hurry it.')
            : claim.authorityKind === 'somatic'
                ? `Check for the response in your body before the reasons arrive; for everyday choices, treat a flat one as an answer${claim.watch === 'ajna' ? ', even when a good argument says otherwise'
                    : claim.watch === 'solarPlexus' ? ', even when the mood around you pulls the other way'
                        : ' rather than something to argue with'}.`
                : claim.authorityKind === 'relational'
                    ? 'Say it out loud to someone who will just listen, and pay attention to your own voice rather than to their reply.'
                    : 'Talk it through with people you trust, and take seriously where you physically are while you decide.');
    if (claim.watch) {
        steps.push(`Learn to tell your own signal from ${OPEN_NOISE_SHORT[claim.watch]}, the kind of noise your chart is most prone to.`);
    }
    steps.push(claim.signature
        ? variant(`${seed}|sign`, [
            `Judge whether this is working by how it feels, not by how much got done. The sign is ${SIGNATURE_MEANS[claim.type]}; Human Design calls it ${claim.signature.toLowerCase()}.`,
            `Let the days tell you whether this is working. What you are looking for is ${SIGNATURE_MEANS[claim.type]}; Human Design calls it ${claim.signature.toLowerCase()}.`,
            `Pay attention to how the days feel rather than to how much got done. The sign is ${SIGNATURE_MEANS[claim.type]}; Human Design calls it ${claim.signature.toLowerCase()}.`,
        ])
        : 'Judge whether this is working by how the days feel rather than by how much got done.');
    return [
        `${capitalise(count(steps.length))} practical steps follow from your chart. This is a symbolic lens, not a measurement. If a part does not fit you, let it go.`,
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
const SYMBOLIC_LENS = 'This is a symbolic lens, not a measurement. If a part does not fit you, let it go.';
/** The last paragraph that exists carries the closing sentence, so it ends the reading wherever the day leaves gaps. */
const closingSection = (claim) => (claim.openAllDay.length > 0 ? 'context' : claim.definedAllDay.length > 0 ? 'consistent' : 'intro');
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
        const typeKey = typed && typed.value in TYPE_NAME ? typed.value : null;
        const mechanism = typeKey ? `${TYPE_MECHANIC[typeKey]} That is what Human Design calls ${TYPE_NAME[typeKey]}.` : '';
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
        const lens = closingSection(claim) === 'intro' ? ` ${SYMBOLIC_LENS}` : '';
        return [
            'No birth time was given, and Human Design reads everything from one exact moment. So instead of guessing an '
                + 'hour, your whole birth date was checked. What stays the same across the entire day is read below; what changes '
                + 'with the hour is left out rather than guessed.',
            ...(mechanism || settled ? [[mechanism, settled].filter(Boolean).join(' ')] : []),
            ...(needsText ? [`${needsText}${lens}`] : (lens ? [lens.trim()] : [])),
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
        const lens = closingSection(claim) === 'consistent' ? ` ${SYMBOLIC_LENS}` : '';
        return [
            `${capitalise(count(n))} ${n === 1 ? 'area is' : 'areas are'} fixed whatever the hour you were born: `
                + `${claim.definedAllDay.length > 2 ? `${claim.definedAllDay.slice(0, -1).map((id) => ENVELOPE_AREA[id]).join(', ')}, and ${ENVELOPE_AREA[claim.definedAllDay[claim.definedAllDay.length - 1]]}` : and(claim.definedAllDay.map((id) => ENVELOPE_AREA[id]))}. `
                + steadyLine(claim.definedAllDay, `env|${claim.definedAllDay.join(',')}`),
            ...(claim.channelsAllDay.length > 0
                ? [`${claim.channelsAllDay.length === 1 ? 'One link between them is' : `${capitalise(count(claim.channelsAllDay.length))} links between them are`} `
                        + `complete all day${phrases.length === claim.channelsAllDay.length ? `: ${and(phrases)}` : ''}.`
                        + `${routeEnds ? ` The link from ${shortName(routeEnds[0])} to ${shortName(routeEnds[1])} is the direct route into speaking and acting described above.` : ''}${lens}`]
                : (lens ? [lens.trim()] : [])),
        ];
    },
    context: (claim) => {
        if (claim.openAllDay.length === 0)
            return [];
        const n = claim.openAllDay.length;
        const one = n === 1;
        return [
            `${capitalise(count(n))} ${one ? 'area is' : 'areas are'} open whatever the hour: ${and(claim.openAllDay.map((id) => ENVELOPE_NAMED[id]))}. `
                + 'Open does not mean missing; it means variable. '
                + `${one ? 'It takes on the character of the people and places around you, and amplifies what it picks up.' : 'They take on the character of the people and places around you, and amplify what they pick up.'}`,
            `${one ? 'This is' : 'These are'} also where you learn the most, because an open area takes in more than a fixed one. `
                + `The cost is that what comes in there can be hard to tell apart from what is your own. ${SYMBOLIC_LENS}`,
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
    tensionStandfirst: 'Places where your chart pulls two ways at once, which are part of how you are built and not faults.',
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
