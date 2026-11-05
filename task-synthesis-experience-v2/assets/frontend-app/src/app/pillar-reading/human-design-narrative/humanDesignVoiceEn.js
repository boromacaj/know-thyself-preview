import { CENTER_TERM, capitalise, listWords, numberWord } from './humanDesignVoice.js?v=53c0693';
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
/** What the centre DOES, never what it is called. The name lives in the evidence. */
const CENTER_DOES = {
    head: 'the pressure to make sense of things',
    ajna: 'the way thinking settles into conclusions',
    throat: 'putting things into words and action',
    g: 'the sense of who you are and which way you are pointed',
    ego: 'willpower and what you are willing to promise',
    solarPlexus: 'emotional weather',
    sacral: 'the energy available for work',
    spleen: 'instinct, timing, and what feels safe',
    root: 'the drive to get things moving',
};
/**
 * THE SHORT NAME, for lists.
 *
 * The long descriptions above read well when one centre is the subject of a
 * sentence and turn to mush the moment three of them appear in a list: "putting
 * things into words and action wired to instinct, timing, and what feels safe"
 * is not a sentence anybody finishes. So a list uses these, and the long form
 * is kept for the one place a centre is being introduced.
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
/** Plural, for the sentences that talk about a group of centres at once. */
const FUNCTION_DOES = {
    drive: 'what powers you',
    awareness: 'how you take things in',
    expression: 'how things get said',
    direction: 'your sense of direction',
};
const LINE_IS = {
    1: 'wants the ground under a thing before it will trust it, and goes looking for that ground',
    2: 'is naturally good at something without having studied it, and works best left alone until someone calls it out',
    3: 'finds out by trying, and discovers what does not work - which the system treats as the method rather than as failure',
    4: 'works through people it already knows, so things tend to arrive through the existing circle rather than from strangers',
    5: 'gets things projected onto it: people arrive expecting a solution, and the reputation tends to run ahead of the reality',
    6: 'lives in phases: a trial-and-error stretch early on, then a period of standing back and watching, then living from what that produced',
};
const LINE_SHORT = {
    1: 'needing solid ground', 2: 'a natural knack', 3: 'learning by trying',
    4: 'working through people you know', 5: 'being expected to have the answer', 6: 'living in phases',
};
/**
 * HOW THE TYPE OPERATES - the mechanic, told without the label.
 *
 * Each is written from what the graph actually has: a renewable motor or not,
 * and a route from a motor to expression or not. That is the whole of what
 * makes a Type, so it is the whole of what these say.
 */
const TYPE_MECHANIC = {
    'Manifesting Generator': 'This design has its own renewable working energy and a route from that energy through to expression. '
        + 'In practice that means two things at once: there is fuel for sustained work, and there is a direct way out '
        + 'for it, so movement can start from you rather than only through you.',
    Generator: 'This design has its own renewable working energy, but no direct route from it through to expression. '
        + 'The fuel is there for sustained work; what it lacks is a mechanism for pushing that work outward cold, '
        + 'which is why the work tends to land when it is answering something rather than announcing it.',
    Manifestor: 'This design has a route from drive through to expression without the renewable working energy underneath it. '
        + 'That combination is what makes initiating natural and sustained grinding expensive: the energy arrives in '
        + 'usable bursts rather than as a steady supply.',
    Projector: 'This design has no renewable working energy of its own. What it has instead is a structure built for reading '
        + 'situations and people closely - which is a real capacity, and a different one from being built to out-work a room.',
    Reflector: 'This design has nothing fixed in it at all. Every part of it samples whatever is around it, which makes it an '
        + 'unusually accurate instrument for the state of a place - and means almost nothing about it reads the same from one week to the next.',
};
/** What the strategy actually asks, once the slogan is set aside. */
const INITIATION_ASKS = {
    'after-response': 'The mechanic is not that you must never begin anything. It is that beginning works when there is something '
        + 'real to begin from - a request, an obstacle, a piece of work that already exists - and tends to stall when '
        + 'it comes purely from an idea about what ought to happen.',
    direct: 'The mechanic is that you can move first, and that moving first lands very differently depending on whether '
        + 'the people it affects were told beforehand. Telling them is not a courtesy in this system; it is the part '
        + 'that keeps the movement from meeting resistance it did not need to meet.',
    'on-recognition': 'The mechanic is that the work goes well where it was actually wanted. Being recognised first is not a rule '
        + 'about waiting politely - it is the difference between insight that gets used and the same insight offered '
        + 'where nobody asked for it.',
    'over-a-cycle': 'The mechanic is that nothing in this design gives a same-day answer, because what it is reading changes with '
        + 'the surroundings. Letting a decision sit across a longer stretch is how a stable reading emerges from an '
        + 'instrument built to move.',
};
/**
 * THE DECISION MECHANISM, translated - what it is, what it is NOT, and what
 * gets mistaken for it. The "is not" half is the part generic advice always
 * skips, and it is the half that makes the paragraph usable.
 */
const AUTHORITY_MECHANISM = {
    Sacral: {
        is: 'The system puts the deciding in the body rather than the mind: a pull toward something, or a flatness '
            + 'about it, that is present before you have finished assembling reasons. It reads as energy showing up for '
            + 'a thing, or quietly not showing up.',
        isNot: 'It is not a preference, and it is not the answer you would defend if challenged. Preferences are stable '
            + 'and this is not - the same question can get a different answer on a different day, and in this system that '
            + 'is the mechanism working rather than inconsistency.',
    },
    Splenic: {
        is: 'The system puts the deciding in a quiet in-the-moment signal about whether something is sound - closer to '
            + 'noticing than to concluding. It is immediate and it is subtle.',
        isNot: 'It is not a feeling that builds, and it does not repeat itself. That is the hard part: it says a thing '
            + 'once, and anything that keeps insisting afterwards is coming from somewhere else.',
    },
    'Emotional / Solar Plexus': {
        is: 'The system says there is no truth available in the moment here. Clarity is what is left after a feeling '
            + 'has finished moving - so the decision is made by letting time pass and noticing what the thing still looks '
            + 'like once the wave has gone through.',
        isNot: 'It is not a mood to be managed or overridden, and the high point of enthusiasm is no more the answer '
            + 'than the low point is. Both are parts of the same movement, and neither one is the decision.',
    },
    'Ego Manifested': {
        is: 'The system puts the deciding in what you actually have the will for - what you would genuinely commit to '
            + 'and could keep. It tends to become audible when you hear yourself say it out loud.',
        isNot: 'It is not what you think you should want, and it is not what you can argue yourself into. This mechanism '
            + 'answers the question "do I actually want this?" and has nothing to say about whether wanting it is reasonable.',
    },
    'Ego Projected': {
        is: 'The system puts the deciding in what you genuinely have the will for, heard through your own voice rather '
            + 'than worked out silently.',
        isNot: 'It is not a conclusion you reach alone on paper. Thinking it through in your head tends to produce a '
            + 'good case rather than an answer.',
    },
    'Self-Projected': {
        is: 'The system puts the deciding in direction rather than in appeal: which way a thing points you. It becomes '
            + 'audible when you talk it through out loud with someone who is simply listening.',
        isNot: 'It is not their advice, and it is not a decision made internally in silence. The other person is there '
            + 'so that you can hear yourself; what they think about it is not the mechanism.',
    },
    'Mental / Environmental': {
        is: 'The system gives this design no internal decision-maker at all. What it offers instead is talking things '
            + 'through with people you trust, and paying attention to where you physically are while you do it.',
        isNot: 'It is not asking other people to decide, and the mind - which will have plenty to say - is not the '
            + 'authority here either. The mind is for processing and for other people; the setting is what the decision '
            + 'actually rests on.',
    },
    Lunar: {
        is: 'The system asks for a full lunar cycle - about a month - before anything large. Across that stretch the '
            + 'same question gets looked at from a changing set of angles, and what is consistent across all of them is the answer.',
        isNot: 'It is not indecision and it is not a delaying tactic. A same-day answer from this design is a reading '
            + 'of whoever was in the room at the time.',
    },
};
/** The short form of the above, for the second and third time it is referred to. */
const OPEN_NOISE_SHORT = {
    head: 'borrowed urgency about questions',
    ajna: 'manufactured certainty',
    throat: 'the pull to speak for the sake of it',
    g: 'borrowed pressure about direction',
    ego: 'something to prove',
    solarPlexus: 'the emotional weather in the room',
    sacral: 'the feeling that you should keep going',
    spleen: 'holding on past the point of use',
    root: 'manufactured hurry',
};
/** What an open centre tends to manufacture - used where the chart sets up a confusion. */
const OPEN_NOISE = {
    head: 'questions that feel urgent and are frequently not yours',
    ajna: 'certainty - firm-sounding conclusions that arrive without the ground underneath them',
    throat: 'pressure to speak, and speaking to get noticed rather than because there is something to say',
    g: 'the sense that you ought to have a fixed direction by now',
    ego: 'promises made to prove something, and the need to keep proving your worth',
    solarPlexus: 'other people\'s emotional weather, picked up and amplified until it reads as your own',
    sacral: 'the feeling that you should be able to keep going as long as everyone else',
    spleen: 'a reluctance to let go of things that are no longer good for you',
    root: 'a manufactured hurry - pressure to be finished that has no actual deadline behind it',
};
/**
 * THE NOT-SELF THEME, TRANSLATED.
 *
 * The tradition names one recurring state per Type and treats it as a signal.
 * Printing the word explains nothing, so each of these describes the state and
 * says what the system reads it as - a dashboard light, not a diagnosis and not
 * a prophecy.
 */
const NOT_SELF_MEANS = {
    'Manifesting Generator': 'a stuck kind of irritation - pushing at something that will not give. The system reads a recurring version of '
        + 'it as information rather than as a character flaw: usually that the thing was started from an idea about what '
        + 'should happen rather than from something real to push against.',
    Generator: 'a stuck kind of irritation - effort going into something that is not moving. The system reads a recurring '
        + 'version of it as a sign that the work was taken on because it was there, not because anything in you answered it.',
    Manifestor: 'a hard flare of anger, usually at being blocked or questioned. The system reads a recurring version of it as '
        + 'a sign that people are being surprised by your movements - resistance that could have been absent if they '
        + 'had been told first.',
    Projector: 'a specific kind of sourness - effort given and not seen. The system reads a recurring version of it as a sign '
        + 'that you are offering into places where nobody asked, which costs far more here than it would in a design '
        + 'built to push.',
    Reflector: 'flatness - the sense that nothing is distinguishable from anything else. The system reads a recurring version '
        + 'of it as a sign of being somewhere that is not good for you, since this design reads the place it is in more than anything else.',
};
/** The signature state, same treatment: described, then named. */
const SIGNATURE_MEANS = {
    'Manifesting Generator': 'a worn-out, done-something kind of contentment at the end of a day',
    Generator: 'a worn-out, done-something kind of contentment at the end of a day',
    Manifestor: 'the absence of friction that comes when things move without being fought for',
    Projector: 'the particular ease of having been asked for exactly what you are good at',
    Reflector: 'genuine surprise at being caught off guard by something, in a good way',
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
const and = (words) => listWords(words, 'and');
/** Long form: for a centre that is the subject of its own clause. */
const centreWords = (ids) => and(ids.map((id) => CENTER_DOES[id]));
/** Short form: for every list of more than one. */
const centreNames = (ids) => and(ids.map((id) => CENTER_SHORT[id]));
const COUNT = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const count = (value) => numberWord(value, COUNT);
/* ------------------------------------------------------------- the voice -- */
const time = (claim) => {
    const scanned = claim.window;
    if (scanned && scanned.changes.length === 0) {
        return `Your birth time is recorded here as an estimate rather than an exact time. That matters for Human Design, `
            + `because the whole chart is built from one moment. This one was recalculated across a window of `
            + `${scanned.hours} hours either side of the time given, and the mechanics below came out the same throughout - `
            + `so while the estimate is still an estimate, the reading does not hang on it.`;
    }
    if (scanned) {
        return `Your birth time is recorded here as an estimate rather than an exact time, and for Human Design that `
            + `matters more than it does elsewhere: the whole chart comes from a single moment. Recalculating it across `
            + `${scanned.hours} hours either side of the time given changed ${and([...scanned.changes])}, so treat those `
            + `parts as provisional. Everything else held steady across the window.`;
    }
    return `Your birth time is recorded here as an estimate rather than an exact time. Human Design builds the whole `
        + `chart from a single moment, and its parts move at different speeds - the graph of centres and channels can `
        + `shift within a few hours, while the two lines of the profile turn over roughly once a day. Read what follows `
        + `as the chart of the time you gave, which is the best available reading of it, rather than as settled.`;
};
const operating = (claim) => {
    const paragraphs = [TYPE_MECHANIC[claim.type], INITIATION_ASKS[claim.initiation]];
    if (claim.motorToThroat && claim.motorPath.length > 1 && claim.pathChannels.length > 0) {
        paragraphs.push(`That route is not a general property of the type. It is a specific run through your own graph - `
            + `${claim.motorPath.map((id) => CENTER_SHORT[id]).join(' to ')} - held open by `
            + `${claim.pathChannels.length === 1 ? 'a connection that happens' : `${count(claim.pathChannels.length)} connections that happen`} `
            + `to be complete in your chart. It is why this design reads as it does rather than as the neighbouring one.`);
    }
    return paragraphs;
};
const decision = (claim) => {
    const mechanism = AUTHORITY_MECHANISM[claim.authority];
    const paragraphs = [mechanism.is, mechanism.isNot];
    if (claim.confusableWith) {
        paragraphs.push(`The thing most easily mistaken for it here is ${OPEN_NOISE[claim.confusableWith]}. That part of your graph `
            + `amplifies whatever is around it, which is what makes its output so convincing. The test is not how certain `
            + `it feels; it is whether it is the signal described above.`);
    }
    return paragraphs;
};
const social = (claim) => {
    const paragraphs = [
        `Two lines describe this, and they are read together rather than separately. The side you are conscious of `
            + `${LINE_IS[claim.conscious]}. Underneath it, and much less visible to you than to anyone watching, the other `
            + `${LINE_IS[claim.unconscious]}.`,
    ];
    if (claim.shape === 'opposed') {
        paragraphs.push(`Those two pull in different directions, and the system treats that as the shape of the profile rather than `
            + `as a problem in it: ${LINE_SHORT[claim.conscious]} on the surface, ${LINE_SHORT[claim.unconscious]} `
            + `underneath. Most of what feels like self-contradiction in how you meet people is this, working as described.`);
    }
    else if (claim.shape === 'staged') {
        paragraphs.push(`A profile with a sixth line is read in phases rather than as one steady setting, which means the way this `
            + `part of the design expresses itself is not meant to be the same across a life. What is described here is `
            + `the shape, not a fixed setting you should already recognise.`);
    }
    else {
        paragraphs.push(`Both lines pull the same way, which tends to make this the least conflicted part of the chart - `
            + `${LINE_SHORT[claim.conscious]} and ${LINE_SHORT[claim.unconscious]} reinforce rather than interrupt each other.`);
    }
    return paragraphs;
};
const functionSentence = (claim, defined) => {
    const ids = defined ? claim.defined : claim.open;
    return `${FUNCTION_DOES[claim.fn]} (${centreWords(ids)})`;
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
    const paragraphs = [
        `${capitalise(count(claim.definedCount))} of the nine parts of this graph are fixed: ${centreNames(allDefined)}. `
            + `Those work the same way whoever you are with and whatever kind of day it is - the part of you that does not `
            + `need managing, and the part other people can predict.`,
    ];
    if (whole.length > 0 || part.length > 0) {
        paragraphs.push(`Taken together that settles ${whole.length > 0 ? and(whole.map((fn) => FUNCTION_DOES[fn.fn])) : 'none of the four functions'} outright`
            + `${part.length > 0 ? `; ${and(part.map((fn) => FUNCTION_DOES[fn.fn]))} only in part` : ''}.`);
    }
    if (claim.channels.length > 0) {
        const named = claim.channels.map((channel) => {
            const [left, right] = channel.centers;
            return `${CENTER_SHORT[left]} to ${CENTER_SHORT[right]}`;
        });
        paragraphs.push(`What fixes them is specific wiring rather than the centres themselves - in your chart, `
            + `${and(named)}. Those connections are why the mechanics above came out as they did, and they are the part `
            + `of this chart least like anyone else's with the same type.`);
    }
    return paragraphs;
};
const context = (claim) => {
    if (claim.whollyOpen) {
        return [
            'Nothing in this graph is fixed. Every part of it takes its character from the surroundings, which means the '
                + 'question "what am I like?" has a different answer depending on where you ask it - and that the answer says '
                + 'as much about the place as about you.',
            'The system does not read that as emptiness. It reads it as sampling: an instrument that shows the state of a '
                + 'room accurately precisely because it holds nothing of its own. What follows from it practically is that '
                + 'where you spend time is not a lifestyle question here, it is the main variable.',
        ];
    }
    const whole = claim.functions.filter((fn) => fn.state === 'all-open');
    const part = claim.functions.filter((fn) => fn.state === 'mixed');
    const openest = [...claim.functions].sort((a, b) => b.open.length - a.open.length)[0];
    const allOpen = claim.functions.flatMap((fn) => fn.open);
    /* One open centre is singular all the way through: "the other one is open", "it takes its character". */
    const one = claim.openCount === 1;
    return [
        `${one ? 'The other one is open' : `The other ${count(claim.openCount)} are open`}: ${centreNames(allOpen)}. Open does not mean missing - it means `
            + `variable. ${one ? 'It takes its character from whoever and whatever is around, and it amplifies what it picks up' : 'These take their character from whoever and whatever is around, and they amplify what they pick up'}`
            + `${whole.length > 0 ? `, which leaves ${and(whole.map((fn) => FUNCTION_DOES[fn.fn]))} entirely dependent on context` : ''}`
            + `${part.length > 0 ? `${whole.length > 0 ? ', and ' : ', which leaves '}${and(part.map((fn) => FUNCTION_DOES[fn.fn]))} partly so` : ''}.`,
        `${one ? 'That is also where' : 'These are also where'} this design does its best learning, because an open part takes things in with a range a `
            + `fixed one does not have. The cost is that what arrives through `
            + `${openest && openest.open.length > 0 ? centreNames(openest.open) : 'them'} can be hard to tell apart from something of your own.`,
    ];
};
const tension = (claim, previous) => {
    const opener = previous ? 'There is a second place the design pulls two ways. ' : '';
    switch (claim.kind) {
        case 'pace':
            return `${opener}The engine and the brakes in this chart run at different speeds. What drives it is built to move `
                + `${claim.initiation === 'direct' ? 'first and fast' : 'as soon as something real appears'}, and the deciding `
                + `mechanism cannot produce an answer at that speed - it needs elapsed time before there is anything to read. `
                + `Neither side is the problem, and neither is meant to win: the mistake this sets up is letting the pace of the `
                + `doing set the pace of the deciding.`;
        case 'split': {
            /* Numbered and semicolon-separated. Joined with "and" the two groups ran
               into one another and the sentence stopped parsing at about the fourth
               centre - it read as one list of seven rather than as two parts. */
            /* Two parts are "one" and "the other"; a third or fourth part is counted, and "the two" becomes "they". */
            const two = claim.groups.length === 2;
            const ORDINAL = ['one part holds', 'another holds', 'a third holds', 'a fourth holds', 'a fifth holds'];
            const parts = claim.groups
                .map((group, index) => `${index === 0 ? 'one part holds' : two ? 'the other holds' : (ORDINAL[index] ?? 'another holds')} ${centreNames(group.centers)}`)
                .join('; ');
            return `${opener}This graph comes in ${count(claim.groups.length)} parts with no wiring between them - `
                + `${parts}. Each is consistent inside itself, so ${two ? 'the two can run on different logic at once without either' : 'they can run on different logic at once without any of them'} `
                + `being wrong.`
                + (claim.bridgeGates.length > 0
                    ? ` The gap is a specific one: it would close at ${claim.bridgeGates.length > 4 ? 'gates such as ' : claim.bridgeGates.length === 1 ? 'gate ' : 'gates '}`
                        + `${and(claim.bridgeGates.slice(0, 4).map(String))}, which this chart does not carry. `
                        + `That is a description of the wiring, not a statement that you need someone who has it.`
                    : '');
        }
        case 'signal-noise':
            return `${opener}${capitalise(OPEN_NOISE_SHORT[claim.noise])}, described above, sits right next to a decision mechanism that `
                + `works quite differently, and both produce something that presents itself as an answer. The loud one is not the `
                + `real one. Telling those two apart is the single most useful thing this chart asks of you.`;
        case 'profile':
            return `${opener}The two sides of how you meet people want different things - ${LINE_SHORT[claim.conscious]} in front, `
                + `${LINE_SHORT[claim.unconscious]} underneath. The system reads this as the design rather than as a fault in it, `
                + `and the friction is most noticeable in situations that ask you to be only one of the two.`;
        case 'reach':
            return `${opener}This chart has fixed ${and(claim.awareness.map((id) => CENTER_DOES[id]))} without fixed energy `
                + `underneath it: ${and(claim.openDrive.map((id) => CENTER_DOES[id]))} ${claim.openDrive.length > 1 ? 'are all' : 'is'} variable. The consequence is a `
                + `design that reliably sees more than it can reliably act on - which is workable once it is expected, and `
                + `exhausting when it is treated as a personal failure of follow-through.`;
        default:
            return '';
    }
};
const cost = (claim) => {
    const paragraphs = [
        `When this design is run against itself, what tends to show up is ${NOT_SELF_MEANS[claim.type]}`
            + `${claim.notSelf ? ` The system has a one-word name for it - ${claim.notSelf.toLowerCase()} - and treats it as a signal to read rather than a state to fix.` : ''}`,
    ];
    if (claim.pressure) {
        paragraphs.push(`In your chart the likeliest source of it is ${OPEN_NOISE_SHORT[claim.pressure]}. It is worth knowing which way `
            + `round the causation runs: the system does not say that part of you is weak, it says it is sensitive to context `
            + `and inclined to amplify - so the pressure is real, and it is frequently not yours.`);
    }
    return paragraphs;
};
const practice = (claim) => {
    const steps = [];
    steps.push(claim.needsTime
        ? 'Give decisions elapsed time before committing to them - not to deliberate harder, but because in this design '
            + 'the answer is what is left after the feeling has finished moving.'
        : claim.authorityKind === 'somatic'
            ? 'Check for the response in the body before the reasons arrive, and treat a flat one as an answer rather than as something to argue with.'
            : claim.authorityKind === 'relational'
                ? 'Say it out loud to someone who will just listen, and pay attention to your own voice rather than to their reply.'
                : claim.authorityKind === 'environmental'
                    ? 'Talk it through with people you trust, and take seriously where you physically are while deciding.'
                    : 'Let a full cycle pass before anything large, and watch what stays true across all of it.');
    if (claim.watch) {
        steps.push(`Learn the difference between your own signal and ${OPEN_NOISE_SHORT[claim.watch]} - the noise this chart is most prone to.`);
    }
    steps.push(claim.signature
        ? `Use ${SIGNATURE_MEANS[claim.type]} as the check that this is working - the system calls it `
            + `${claim.signature.toLowerCase()} - rather than measuring it by how much got done.`
        : 'Judge whether this is working by how the days feel rather than by how much got done.');
    return [
        'None of the following is a rule, and none of it is owed to anyone. It is what this specific arrangement suggests, in the order it tends to matter.',
        /* One step per paragraph. Joined into one they rendered as "1. ... 2. ...
           3. ..." in a single block, which is a list pretending to be prose. */
        ...steps.map((step, index) => `${index + 1}. ${step}`),
        'This is a symbolic framework for looking at yourself, not a measurement of you: the parts that are not recognisable are allowed to be wrong.',
    ];
};
/* ---------------------------------------------------------- why it appears */
const evidence = {
    standfirst: 'Every claim above, traced back to the calculated mechanic it came from - in the system\'s own terms.',
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
/** Each mechanic in plain words. The system's own names are in the evidence, where they can be checked. */
const MECHANIC_WORDS = {
    type: 'how your energy works',
    strategy: 'the strategy that follows from it',
    authority: 'how a decision gets made',
    profile: 'how you meet people',
    definition: 'how the fixed parts connect',
    cross: 'the life theme the design is built around',
    variables: 'the finer details',
    motorToThroat: 'whether a source of energy reaches speaking and acting directly',
};
const MECHANIC_TERM = {
    type: 'Type', strategy: 'Strategy', authority: 'Authority', profile: 'Profile', definition: 'Definition',
    cross: 'Incarnation Cross', variables: 'Variables', motorToThroat: 'Motor to Throat',
};
const envelope = {
    intro: (claim) => {
        const holds = [];
        if (claim.definedAllDay.length > 0)
            holds.push(`${centreNames(claim.definedAllDay)} as fixed parts of the design`);
        if (claim.openAllDay.length > 0)
            holds.push(`${centreNames(claim.openAllDay)} as open ones`);
        for (const entry of claim.stable) {
            if (entry.key === 'motorToThroat')
                holds.push(entry.value === 'yes' ? 'a direct line from a source of energy to speaking and acting' : 'no direct line from a source of energy to speaking and acting');
            else if (entry.key !== 'strategy' && entry.key !== 'variables')
                holds.push(MECHANIC_WORDS[entry.key]);
        }
        const needs = claim.moving
            .filter((entry) => entry.key !== 'strategy' || !claim.moving.some((other) => other.key === 'type'))
            .map((entry) => MECHANIC_WORDS[entry.key]);
        if (claim.movingCentres.length > 0)
            needs.push(`whether ${centreNames(claim.movingCentres)} are fixed or open`);
        return [
            'No birth time was given, and Human Design reads everything from one exact moment - so the whole of your birth '
                + 'date was checked instead of one guessed hour. What stays the same across all of it can still be read, and is read '
                + 'below; what changes with the hour is left out rather than guessed.',
            ...(holds.length > 0 ? [`The same whatever the hour: ${and(holds)}.`] : []),
            ...(needs.length > 0 ? [`Needs a birth time: ${and(needs)}.`] : []),
        ];
    },
    consistent: (claim) => {
        if (claim.definedAllDay.length === 0)
            return [];
        const n = claim.definedAllDay.length;
        return [
            `${capitalise(count(n))} ${n === 1 ? 'part' : 'parts'} of this design ${n === 1 ? 'is' : 'are'} fixed whatever the hour you were born: `
                + `${centreWords(claim.definedAllDay)}. ${n === 1 ? 'It works' : 'They work'} the same regardless of who you are with or what the day is like - `
                + `the part of you that does not need managing, and the part people around you can predict.`,
            ...(claim.channelsAllDay.length > 0
                ? [`${n === 1 ? 'It is' : 'They are'} held fixed by ${claim.channelsAllDay.length === 1 ? 'one link that is complete' : `${count(claim.channelsAllDay.length)} links that are complete`} all day, `
                        + 'so this is a constant in the design rather than something that comes and goes.']
                : []),
            /* The opening already named them; here they are only referred back to. */
            ...(claim.movingCentres.length > 0
                ? [claim.movingCentres.length === 1
                        ? 'Whether the remaining part is fixed as well depends on the hour of birth, so nothing is said about it here.'
                        : `Whether the other ${count(claim.movingCentres.length)} are fixed as well depends on the hour of birth, so nothing is said about them here.`]
                : []),
        ];
    },
    context: (claim) => {
        if (claim.openAllDay.length === 0)
            return [];
        const n = claim.openAllDay.length;
        return [
            `${capitalise(count(n))} ${n === 1 ? 'part is' : 'parts are'} open whatever the hour: ${centreNames(claim.openAllDay)}. `
                + 'Open does not mean missing - it means variable. These take on the character of who and what is around, '
                + 'and amplify what they pick up.',
            'That is also where this design learns most, because an open part takes in more than a fixed one would. The cost '
                + 'is that what comes in there can be hard to tell apart from something of your own.',
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
    tensionStandfirst: 'Two parts of this chart that do not agree with each other. In this system that is information about the wiring, not a fault in it.',
    cost,
    practice,
    evidence,
    envelope,
    withheld: [
        'Human Design is not shown for this profile, because no birth time was supplied.',
        'This is not a limitation of the calculation - the chart would compute perfectly well from the twelve-noon '
            + 'estimate the engines fall back to. It is that the result would be wrong in a way nothing in it would show. '
            + 'Every part of a Human Design chart is read from one exact moment: the graph of centres and channels can change '
            + 'within a few hours, and with it the Type, the decision-making mechanism and the profile. A chart built on a '
            + 'guessed time looks exactly as confident as a real one.',
        'So it is withheld rather than estimated. Supplying a recorded birth time resolves it; the other three readings '
            + 'in your self-map do not depend on it and are unaffected.',
    ],
};
