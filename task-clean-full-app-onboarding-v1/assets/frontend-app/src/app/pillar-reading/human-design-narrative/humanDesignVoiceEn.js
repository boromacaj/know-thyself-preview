import { CENTER_TERM, capitalise, listWords, numberWord } from './humanDesignVoice.js?v=f9ab0a6';
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
    3: 'finds out by trying, and discovers what does not work - which Human Design treats as the method, not as failure',
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
    'Manifesting Generator': 'Your energy works in a particular way, and in Human Design it comes down to two things in your chart: you have '
        + 'a steady supply of working energy of your own, and a direct route from that energy out into speaking and acting. '
        + 'So there is fuel for sustained work and a way for it to come out, and things can start from you rather than only through you.',
    Generator: 'Your energy works in a particular way: you have a steady supply of working energy of your own, but no direct route '
        + 'from it out into speaking and acting. The fuel for sustained work is there; what is missing is a way of pushing '
        + 'that work outward from a standing start, which is why it tends to land when it answers something rather than announces it.',
    Manifestor: 'Your energy works in a particular way: you have a direct route from drive out into speaking and acting, without a '
        + 'steady supply of working energy underneath it. That is why starting comes naturally and long grinding is expensive: '
        + 'the energy arrives in usable bursts rather than as a constant supply.',
    Projector: 'Your energy works in a particular way: you have no steady supply of working energy of your own. What you have instead '
        + 'is a build for reading situations and people closely - a real capacity, and a different one from being built to out-work a room.',
    Reflector: 'Your energy works in a particular way: nothing in your chart is fixed. Every part of it takes its character from '
        + 'whatever is around it, which makes you an unusually accurate gauge of how a place is doing - and means almost nothing '
        + 'about you reads the same from one week to the next.',
};
/** What the strategy actually asks, once the slogan is set aside. */
const INITIATION_ASKS = {
    'after-response': 'None of this means you must never begin anything. It means beginning works best when there is something real to '
        + 'begin from - a request, an obstacle, a piece of work that already exists - and tends to stall when it comes only '
        + 'from an idea of what ought to happen.',
    direct: 'You can move first, and it lands very differently depending on whether the people it affects were told beforehand. '
        + 'In Human Design, telling them is not a courtesy: it is what keeps your movement from meeting resistance it did not '
        + 'need to meet.',
    'on-recognition': 'Your work goes well where it was actually wanted. Waiting to be recognised first is not about waiting politely - '
        + 'it is the difference between an insight that gets used and the same insight offered where nobody asked for it.',
    'over-a-cycle': 'Nothing in this design gives a same-day answer, because what it reads keeps changing with the surroundings. '
        + 'Letting a decision sit across a longer stretch is how a steady reading comes out of something built to shift.',
};
/**
 * THE DECISION MECHANISM, translated - what it is, what it is NOT, and what
 * gets mistaken for it. The "is not" half is the part generic advice always
 * skips, and it is the half that makes the paragraph usable.
 */
const AUTHORITY_MECHANISM = {
    Sacral: {
        is: 'Human Design places your deciding in the body rather than the mind: a pull toward something, or a flatness '
            + 'about it, that is there before you have finished putting reasons together. It shows up as energy turning up '
            + 'for a thing, or quietly not turning up.',
        isNot: 'It is not a preference, and it is not the answer you would defend if challenged. Preferences stay put; this '
            + 'does not - the same question can get a different answer on a different day, and in Human Design that is the '
            + 'signal doing its job, not you being inconsistent.',
    },
    Splenic: {
        is: 'Human Design places your deciding in a quiet, in-the-moment sense of whether something is sound - closer to '
            + 'noticing than to concluding. It is immediate and it is subtle.',
        isNot: 'It does not build up, and it does not repeat itself. That is the hard part: it says a thing once, and '
            + 'anything that keeps insisting afterwards is coming from somewhere else.',
    },
    'Emotional / Solar Plexus': {
        is: 'Human Design says the answer may not be clear in the moment - and that is how this kind of deciding works, not '
            + 'a flaw in it. Clarity comes once a feeling has finished moving, so you decide by letting time pass and noticing '
            + 'how the thing looks after the wave has gone through.',
        isNot: 'It is not a mood to manage or override, and the high point of enthusiasm is no more the answer than the low '
            + 'point is. Both belong to the same movement, and neither one is the decision.',
    },
    'Ego Manifested': {
        is: 'Human Design places your deciding in what you actually have the will for - what you would genuinely commit to '
            + 'and could keep. It tends to become audible when you hear yourself say it out loud.',
        isNot: 'It is not what you think you should want, or what you can argue yourself into. It answers the question '
            + '"do I actually want this?" and says nothing about whether wanting it is reasonable.',
    },
    'Ego Projected': {
        is: 'Human Design places your deciding in what you genuinely have the will for, heard in your own voice rather '
            + 'than worked out silently.',
        isNot: 'It is not a conclusion you reach alone on paper. Thinking it through in your head tends to produce a '
            + 'good case rather than an answer.',
    },
    'Self-Projected': {
        is: 'Human Design places your deciding in direction rather than in appeal: which way a thing points you. It becomes '
            + 'audible when you talk it through out loud with someone who is simply listening.',
        isNot: 'It is not their advice, and it is not a decision made silently in your head. The other person is there so '
            + 'that you can hear yourself; what they think about it is not the point.',
    },
    'Mental / Environmental': {
        is: 'Human Design gives you no inner decision-maker of the usual kind. What it offers instead is talking things '
            + 'through with people you trust, and paying attention to where you physically are while you do it.',
        isNot: 'It is not asking other people to decide, and your mind - which will have plenty to say - is not the '
            + 'authority either. The mind is for working things through and for talking with others; the place you are in is '
            + 'what the decision actually rests on.',
    },
    Lunar: {
        is: 'Human Design asks for a full lunar cycle - about a month - before anything large. Across that stretch the '
            + 'same question gets looked at from a changing set of angles, and what stays consistent across all of them is the answer.',
        isNot: 'It is not indecision and it is not a delaying tactic. A same-day answer from you is a reading '
            + 'of whoever was in the room at the time.',
    },
};
/** The short form of the above, for the second and third time it is referred to. */
const OPEN_NOISE_SHORT = {
    head: 'borrowed urgency about questions',
    ajna: 'certainty that is not really yours',
    throat: 'the pull to speak for the sake of it',
    g: 'borrowed pressure about direction',
    ego: 'something to prove',
    solarPlexus: 'the emotional weather in the room',
    sacral: 'the feeling that you should keep going',
    spleen: 'holding on past the point of use',
    root: 'a hurry that is not yours',
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
    root: 'a hurry that is not yours - pressure to be finished that has no actual deadline behind it',
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
    'Manifesting Generator': 'a stuck kind of irritation - pushing at something that will not give. Human Design reads a recurring version of '
        + 'it as information rather than as a flaw of character: usually that the thing was started from an idea of what '
        + 'should happen rather than from something real to push against.',
    Generator: 'a stuck kind of irritation - effort going into something that is not moving. Human Design reads a recurring '
        + 'version of it as a sign that the work was taken on because it was there, not because anything in you answered it.',
    Manifestor: 'a hard flare of anger, usually at being blocked or questioned. Human Design reads a recurring version of it as '
        + 'a sign that people are being surprised by your movements - resistance that could have been absent if they '
        + 'had been told first.',
    Projector: 'a specific kind of sourness - effort given and not seen. Human Design reads a recurring version of it as a sign '
        + 'that you are offering into places where nobody asked, which costs far more for you than it would for someone '
        + 'built to push.',
    Reflector: 'flatness - the sense that nothing is distinguishable from anything else. Human Design reads a recurring version '
        + 'of it as a sign of being somewhere that is not good for you, since you take on the character of the place you are in more than anything else.',
};
/** The signature state, same treatment: described, then named. */
const SIGNATURE_MEANS = {
    'Manifesting Generator': 'the tired, settled contentment of having really done something by the end of a day',
    Generator: 'the tired, settled contentment of having really done something by the end of a day',
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
            + `${scanned.hours} hours either side of the time given, and everything below came out the same throughout - `
            + `so while the estimate is still an estimate, the reading does not hang on it.`;
    }
    if (scanned) {
        return `Your birth time is recorded here as an estimate rather than an exact time, and for Human Design that `
            + `matters more than it does elsewhere: the whole chart comes from a single moment. Recalculating it across `
            + `${scanned.hours} hours either side of the time given changed ${and([...scanned.changes])}, so treat those `
            + `parts as provisional. Everything else held steady across the window.`;
    }
    return `Your birth time is recorded here as an estimate rather than an exact time. Human Design builds the whole `
        + `chart from a single moment, and its parts change at different speeds - the map of centres and channels can `
        + `shift within a few hours, while the two lines of the profile turn over roughly once a day. Read what follows `
        + `as the chart of the time you gave, which is the best available reading of it, rather than as settled.`;
};
const operating = (claim) => {
    const paragraphs = [TYPE_MECHANIC[claim.type], INITIATION_ASKS[claim.initiation]];
    if (claim.motorToThroat && claim.motorPath.length > 1 && claim.pathChannels.length > 0) {
        paragraphs.push(`That route is not something every chart of your type has in the same way. In yours it runs `
            + `${claim.motorPath.map((id) => CENTER_SHORT[id]).join(' to ')}, held open by `
            + `${claim.pathChannels.length === 1 ? 'a link that happens' : `${count(claim.pathChannels.length)} links that happen`} `
            + `to be complete in your chart. That is a large part of why your design behaves as it does, and not like a similar design without those links.`);
    }
    return paragraphs;
};
const decision = (claim) => {
    const mechanism = AUTHORITY_MECHANISM[claim.authority];
    const paragraphs = [mechanism.is, mechanism.isNot];
    if (claim.confusableWith) {
        paragraphs.push(`In your chart there is one thing that is easily mistaken for it: ${OPEN_NOISE[claim.confusableWith]}. That part of you `
            + `picks up and amplifies whatever is around it, which is what makes the result so convincing. So the test is not how `
            + `certain it feels, but whether it is the signal described above.`);
    }
    return paragraphs;
};
const social = (claim) => {
    const paragraphs = [
        `How you meet other people is described by two lines of your profile, read together. The side you are aware of `
            + `${LINE_IS[claim.conscious]}. Underneath it, and much less visible to you than to anyone watching, the other side `
            + `${LINE_IS[claim.unconscious]}.`,
    ];
    if (claim.shape === 'opposed') {
        paragraphs.push(`These two pull in different directions, and Human Design treats that as the shape of the profile, not as a `
            + `problem in it: ${LINE_SHORT[claim.conscious]} on the surface, ${LINE_SHORT[claim.unconscious]} `
            + `underneath. Much of what feels like a contradiction in how you meet people is simply this.`);
    }
    else if (claim.shape === 'staged') {
        paragraphs.push(`A profile with a sixth line is read in phases rather than as one steady setting, so the way this `
            + `part of you shows itself is not meant to stay the same across a life. What is described here is `
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
        `${capitalise(count(claim.definedCount))} of the nine areas of your chart are fixed: ${centreNames(allDefined)}. `
            + `Those work the same way whoever you are with and whatever kind of day it is - the part of you that does not `
            + `need managing, and the part other people can predict.`,
    ];
    if (whole.length > 0 || part.length > 0) {
        paragraphs.push(whole.length > 0
            ? `That makes ${and(whole.map((fn) => FUNCTION_DOES[fn.fn]))} steady${part.length > 0 ? `. ${capitalise(and(part.map((fn) => FUNCTION_DOES[fn.fn])))} ${part.length > 1 ? 'rest' : 'rests'} on several areas of your chart and only some of those are fixed, so ${part.length > 1 ? 'they are' : 'it is'} steady only in part` : ''}.`
            : `Nothing here is steady all the way through: ${and(part.map((fn) => FUNCTION_DOES[fn.fn]))} ${part.length > 1 ? 'rest' : 'rests'} on several areas of your chart and only some of those are fixed.`);
    }
    if (claim.channels.length > 0) {
        const named = claim.channels.map((channel) => {
            const [left, right] = channel.centers;
            return `${CENTER_SHORT[left]} to ${CENTER_SHORT[right]}`;
        });
        paragraphs.push(`What holds them in place is the way they are linked, not the areas on their own - in your chart, `
            + `${and(named)}. These links help explain why your design behaves the way it does, and they are the part `
            + `of your chart that sets it apart from other charts of the same type.`);
    }
    return paragraphs;
};
const context = (claim) => {
    if (claim.whollyOpen) {
        return [
            'Nothing in your chart is fixed. Every part of it takes its character from the surroundings, which means the '
                + 'question "what am I like?" has a different answer depending on where you ask it - and that the answer says '
                + 'as much about the place as about you.',
            'Human Design does not read that as emptiness. It reads it as sampling: a gauge that shows the state of a '
                + 'room accurately precisely because it holds nothing of its own. In practice, where you spend your time is '
                + 'not a lifestyle question for you; it is the main variable.',
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
            + `changeable. ${one ? 'It takes its character from the people and places around you, and it magnifies what it picks up' : 'These take their character from the people and places around you, and they magnify what they pick up'}`
            + `${whole.length > 0 ? `, which leaves ${and(whole.map((fn) => FUNCTION_DOES[fn.fn]))} entirely dependent on context` : ''}`
            + `${part.length > 0 ? `${whole.length > 0 ? ', and ' : ', which leaves '}${and(part.map((fn) => FUNCTION_DOES[fn.fn]))} partly so` : ''}.`,
        `${one ? 'That is also where' : 'These are also where'} you learn the most, because an open part takes things in with a range a `
            + `fixed one does not have. The cost is that what arrives through `
            + `${openest && openest.open.length > 0 ? centreNames(openest.open) : 'them'} can be hard to tell apart from something of your own.`,
    ];
};
const TENSION_OPENERS = ['', 'There is a second place where your chart pulls two ways. ', 'And there is a third. ', 'There is one more. ', 'And one more. '];
const tension = (claim, previous, index = previous ? 1 : 0) => {
    const opener = TENSION_OPENERS[Math.min(index, TENSION_OPENERS.length - 1)];
    switch (claim.kind) {
        case 'pace':
            return `${opener}Your drive and your way of deciding run at different speeds. What powers you is built to move `
                + `${claim.initiation === 'direct' ? 'first and fast' : 'as soon as something real appears'}, but the way you decide `
                + `cannot give an answer at that speed - it needs time before there is anything to read. `
                + `Neither side is the problem, and neither is meant to win. The trap is letting the pace of the `
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
            return `${opener}Your chart splits into ${count(claim.groups.length)} groups with no direct link between them - `
                + `${parts}. Each works consistently within itself, so ${two ? 'the two can run on different logic at once without either' : 'they can run on different logic at once without any of them'} `
                + `being wrong.`
                + (claim.bridgeGates.length > 0
                    ? ` The gap is a specific one: it could close only at ${claim.bridgeGates.length === 1 ? 'one gate' : 'certain gates'} in Human Design's map `
                        + `(${claim.bridgeGates.length > 4 ? 'such as ' : ''}${and(claim.bridgeGates.slice(0, 4).map(String))}), which your chart does not carry. `
                        + `That describes how the chart is built, not a statement that you need someone who has them.`
                    : '');
        }
        case 'signal-noise':
            return `${opener}${capitalise(OPEN_NOISE_SHORT[claim.noise])}, described above, sits right next to a way of deciding that `
                + `works very differently, and both can feel like an answer. What feels most convincing is not necessarily the most `
                + `reliable guide. Telling the two apart may be the most useful thing this chart asks of you.`;
        case 'profile':
            return `${opener}The two sides of how you meet people want different things - ${LINE_SHORT[claim.conscious]} in front, `
                + `${LINE_SHORT[claim.unconscious]} underneath. Human Design reads this as part of how you are built, not as a fault, `
                + `and the friction shows most in situations that ask you to be only one of the two.`;
        case 'reach':
            return `${opener}Your chart has settled ${and(claim.awareness.map((id) => CENTER_DOES[id]))} but no settled energy `
                + `underneath it: ${and(claim.openDrive.map((id) => CENTER_DOES[id]))} ${claim.openDrive.length > 1 ? 'all vary' : 'varies'}. So you are likely to `
                + `see more than you can reliably act on - which is workable once you expect it, and `
                + `exhausting when you treat it as a personal failure to follow through.`;
        default:
            return '';
    }
};
const cost = (claim) => {
    const paragraphs = [
        `When you work against the grain of this design, what tends to show up is ${NOT_SELF_MEANS[claim.type]}`
            + `${claim.notSelf ? ` Human Design's one-word name for it is ${claim.notSelf.toLowerCase()}, and it treats it as a signal to read rather than a state to fix.` : ''}`,
    ];
    if (claim.pressure) {
        paragraphs.push(`In your chart the likeliest source of it is ${OPEN_NOISE_SHORT[claim.pressure]}. Human Design does not say that `
            + `part of you is weak; it says it is sensitive to its surroundings and inclined to amplify them. `
            + `So the pressure is real, and quite often it is not yours.`);
    }
    return paragraphs;
};
const practice = (claim) => {
    const steps = [];
    steps.push(claim.needsTime
        ? 'Give decisions time before committing to them - not to deliberate harder, but because for you '
            + 'the answer is what is left once the feeling has finished moving.'
        : claim.authorityKind === 'somatic'
            ? 'Check for the response in the body before the reasons arrive, and treat a flat one as an answer rather than as something to argue with.'
            : claim.authorityKind === 'relational'
                ? 'Say it out loud to someone who will just listen, and pay attention to your own voice rather than to their reply.'
                : claim.authorityKind === 'environmental'
                    ? 'Talk it through with people you trust, and take seriously where you physically are while deciding.'
                    : 'Let a full cycle pass before anything large, and watch what stays true across all of it.');
    if (claim.watch) {
        steps.push(`Learn the difference between your own signal and ${OPEN_NOISE_SHORT[claim.watch]} - the kind of noise your chart is most prone to.`);
    }
    steps.push(claim.signature
        ? `Take ${SIGNATURE_MEANS[claim.type]} as the sign that this is working - Human Design calls it `
            + `${claim.signature.toLowerCase()} - rather than measuring it by how much got done.`
        : 'Judge whether this is working by how the days feel rather than by how much got done.');
    return [
        'This particular configuration suggests a few ways to work with decisions and energy. The sequence starts with what usually matters most.',
        /* One step per paragraph. Joined into one they rendered as "1. ... 2. ...
           3. ..." in a single block, which is a list pretending to be prose. */
        ...steps.map((step, index) => `${index + 1}. ${step}`),
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
    tensionStandfirst: 'Two parts of your chart that do not agree with each other. Human Design reads that as information about how you are built, not as a fault.',
    cost,
    practice,
    evidence,
    envelope,
    withheld: [
        'Human Design is not shown for this profile, because no birth time was supplied.',
        'This is not a limitation of the calculation - the chart would compute perfectly well from the twelve-noon '
            + 'estimate the engines fall back to. It is that the result would be wrong in a way nothing in it would show. '
            + 'Every part of a Human Design chart is read from one exact moment: the map of centres and channels can change '
            + 'within a few hours, and with it the Type, the way you decide and the profile. A chart built on a '
            + 'guessed time looks exactly as confident as a real one.',
        'So it is withheld rather than estimated. Supplying a recorded birth time resolves it; the other three readings '
            + 'in your self-map do not depend on it and are unaffected.',
    ],
};
