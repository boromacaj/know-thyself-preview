/**
 * WHAT A SPECIFIC INPUT MEANS, IN ENGLISH - the tables behind the Human Design voice.
 *
 * The plan (humanDesignNarrativePlan.ts) decides WHICH facts the reading argues
 * from; the voice turns them into sentences. These tables are the part of the
 * voice that is MEANING rather than phrasing: one entry per channel, per
 * profile pair, per fixed centre and per open centre, so that two charts that
 * differ in one of those inputs differ in what they are told, not in which
 * synonym was picked. They are pure data - no state, no hashing, no choice
 * between equivalent phrasings.
 *
 * Every entry is derived from the authored knowledge layer
 * (knowledge/human-design/hdChannels.ts, hdProfiles.ts, hdCenters.ts,
 * profileByAuthority.ts) and restated as one short, hedged clause. None of them
 * prints a channel or gate number, a centre's Human Design name or the profile
 * as a number: those belong to At a glance and the evidence.
 */
/**
 * THE THIRTY-SIX CHANNELS, as what each one brings (read after "brings").
 *
 * Derived from the headline of each channel's entry in knowledge/human-design/hdChannels.ts.
 * Two channels between the same pair of areas say different things here, which
 * is the point: the reading used to know only which two areas a link joins.
 */
export const CHANNEL_MEANING = {
    '1-8': 'a way of expressing who you are as a contribution that is recognisably yours',
    '2-14': 'a felt sense of where to go, with the energy to pursue it',
    '3-60': 'energy for new beginnings that arrives in pulses, with real limits and false starts',
    '4-63': 'a mind that keeps asking whether an idea holds up, and then tests it',
    '5-15': 'a natural rhythm to your days, and patience with other people\'s rhythms',
    '6-59': 'a say over what gets close to you, and on what terms',
    '7-31': 'influence that works once you have been asked to lead',
    '9-52': 'the ability to concentrate on one thing for as long as it takes',
    '10-20': 'self-expression that happens in the present moment, as you are',
    '10-34': 'acting on what you believe, with the energy to keep going',
    '10-57': 'a quick, in-the-moment read on what is right for you',
    '11-56': 'a mind full of images and ideas that want to be told',
    '12-22': 'expression that depends on the mood and the moment being right',
    '13-33': 'a gift for keeping other people\'s experience, and in time its lessons',
    '16-48': 'a talent that needs to go deep before it is worth showing',
    '17-62': 'an opinion, with the detail arranged behind it to back it up',
    '18-58': 'a drive to correct what is not right, powered by a real appetite for it',
    '19-49': 'sensitivity to what is needed, and to whether the arrangement still holds',
    '20-34': 'energy turned into activity straight away, in the present moment',
    '20-57': 'intuition that arrives already in words, in the moment',
    '21-45': 'a need to be in charge of resources, and the will to manage them',
    '23-43': 'an insight that has to be translated before others can take it in',
    '24-61': 'a mental pressure to settle a question that will not quite close',
    '25-51': 'a capacity to be knocked sideways and to come out changed',
    '26-44': 'an instinct for what worked before, and the will to sell it',
    '27-50': 'responsibility for other people, held as a value and not only a feeling',
    '28-38': 'a willingness to fight hard for something that matters',
    '29-46': 'a yes given to something before its outcome is visible',
    '30-41': 'a pull toward wanting more than is currently on offer',
    '32-54': 'a drive to rise, with an instinct for what will last',
    '34-57': 'force guided by an accurate read on when to use it',
    '35-36': 'a need to have done many things, and restlessness before doing them',
    '37-40': 'a sense of belonging, and of the terms on which it is given and held',
    '39-55': 'a capacity to stir feeling, in yourself and in other people',
    '42-53': 'pressure to begin things, and the energy to see a cycle through',
    '47-64': 'mental pressure to turn confusion into a picture that makes sense',
};
/* ------------------------------------------------------------------ centres */
/**
 * WHAT IT MEANS FOR A CENTRE TO BE FIXED, as a sentence about the reader.
 * Derived from the defined-state headlines in knowledge/human-design/hdCenters.ts.
 */
export const DEFINED_SAYS = {
    head: 'Your mental pressure is reliably your own rather than borrowed from the room.',
    ajna: 'Your way of thinking is fixed, dependable and hard to step outside.',
    throat: 'Your expression is consistently available, and it comes out in a recognisable register.',
    g: 'Your sense of who you are, and roughly where you are heading, stays stable.',
    ego: 'Your willpower is consistent, along with a settled sense of your own worth.',
    solarPlexus: 'Your emotional wave is your own, and it takes time to show what it means.',
    sacral: 'Your energy for work renews itself and answers what is actually in front of it.',
    spleen: 'Your instinct gives you a continuous, quiet sense of what is safe.',
    root: 'Your own pressure to move runs in a rhythm you can learn.',
};
/** Which fixed centres a sentence is spent on first: the ones that change what a day feels like. */
export const DEFINED_PRIORITY = ['sacral', 'solarPlexus', 'spleen', 'ego', 'g', 'root', 'ajna', 'head', 'throat'];
/**
 * WHAT AN OPEN CENTRE DOES, as a sentence about the reader (derived from the
 * open-state headlines in hdCenters.ts). Said only for the open centres the
 * plan has not already told elsewhere.
 */
export const OPEN_SAYS = {
    head: 'Open mental pressure takes in other people\'s questions and can feel obliged to answer them.',
    ajna: 'Open thinking stays flexible, and can feel pressure to appear certain.',
    throat: 'Open expression does best when invited, and can fill silence when you are anxious.',
    g: 'An open sense of identity and direction shifts with where you are and who you are with.',
    ego: 'Open willpower is not a fixed supply, and there can be a habit of trying to prove otherwise.',
    solarPlexus: 'Open emotions amplify whatever is in the room and can read it as your own.',
    sacral: 'Open work energy has no natural sense of enough, and borrows the energy around it.',
    spleen: 'Open instinct has no continuous read of its own, so holding on can feel safer than letting go.',
    root: 'Open drive amplifies the pressure around it and hurries to make it stop.',
};
/** Which open centres are spoken for first when several remain. */
export const OPEN_PRIORITY = ['spleen', 'root', 'ego', 'g', 'head', 'sacral', 'throat', 'solarPlexus', 'ajna'];
/** What an open centre costs, when it is the one the chart is most prone to (the cost section; the noise itself is told once, in the decision section). */
export const OPEN_COST = {
    head: 'taking on questions that were never yours and treating them as your own work',
    ajna: 'following a conclusion because it sounded certain, and committing to something nothing solid supported',
    throat: 'speaking to be noticed and then regretting how it came out',
    g: 'treating a borrowed sense of direction as a decision of your own',
    ego: 'promising more than you can keep, to prove something',
    solarPlexus: 'taking on someone else\'s mood and acting on it as if it were your own decision',
    sacral: 'not knowing when to stop, because the signal that says enough belongs to a centre you do not have fixed',
    spleen: 'keeping hold of something long after it stopped being good for you',
    root: 'rushing to finish things just to end the pressure, which rarely ends it because something else arrives at once',
};
/** What to do about the open centre the chart is most prone to (practice), in one imperative. */
export const OPEN_PRACTICE = {
    head: 'When a question feels urgent, ask whose question it is before you start answering it.',
    ajna: 'Before acting on a firm conclusion, ask what it rests on and whether you could still defend it tomorrow.',
    throat: 'When the urge to speak comes from the silence rather than from something to say, let it pass.',
    g: 'Ask where you are and who you are with before you take a sense of direction as your own.',
    ego: 'Before promising something, ask whether you would still want to keep it with no one to impress.',
    solarPlexus: 'When the mood around you changes yours, give it time alone before deciding anything.',
    sacral: 'Stop where your own energy runs out, not where everyone else\'s does.',
    spleen: 'Ask of what you are holding on to whether it is still good for you, not only whether it is familiar.',
    root: 'When a hurry arrives, ask whose deadline it is before you speed up.',
};
/* ------------------------------------------------------------------ profile */
export const LINE_ORDINAL = { 1: 'first', 2: 'second', 3: 'third', 4: 'fourth', 5: 'fifth', 6: 'sixth' };
/**
 * THE TWELVE PROFILES AS PAIRS: how the two lines work together, which the six
 * single-line phrases cannot say. Derived from the headline of each profile
 * in knowledge/human-design/hdProfiles.ts. A swapped pair (one of these and
 * the other way round) reads differently here, as it does in the tradition.
 */
export const PROFILE_PAIR = {
    '1/3': 'Preparation and experiment run side by side: you research a thing thoroughly, and still tend to find out by trying that it does not behave as the research said.',
    '1/4': 'You go deep on a thing first, and what you learn then tends to travel through people who already trust you.',
    '2/4': 'You are left alone with your knack until someone calls on it, and the call tends to come from someone who already knows you.',
    '2/5': 'Your knack would rather be left alone, yet people keep expecting you to put it to use for them.',
    '3/5': 'You find out by trying, and what you learn tends to make others trust you to have the answer.',
    '3/6': 'Each failed attempt becomes material for the later phases, so the early mess is part of the route and not a detour from it.',
    '4/6': 'The people around you matter in every phase, and what they can vouch for changes as you move from one phase to the next.',
    '4/1': 'Your network and your foundation lean on each other: people you know, and ground you have checked for yourself.',
    '5/1': 'People expect you to have the answer, and underneath you are quietly determined to have really checked it.',
    '5/2': 'People call on you with a picture of what you are already in mind, while a private knack sits underneath.',
    '6/2': 'A natural knack runs underneath the phases, and others tend to notice it before you do.',
    '6/3': 'Trial and error keeps running through all the phases, not only the first, so each one tends to start with some of it.',
};
/** Where the two lines strain against each other (only the pairs whose lines pull opposite ways: one inward, one outward). */
export const PROFILE_FRICTION = {
    '1/3': 'Wanting solid ground first pulls against a way of learning that breaks things on the way. The strain can show when you are asked to be fully prepared and fully experimental at once.',
    '1/4': 'Going deep in private pulls against a life that runs through the people you know. The strain can show when depth needs time alone and your circle wants you now.',
    '2/4': 'Being left alone until called sits against a life that runs through people you know. The strain can show when waiting to be called meets a circle that expects you to turn up.',
    '2/5': 'A knack that wants privacy meets people who expect results. The strain can show when you are called on before you feel ready.',
    '4/1': 'A life that runs through people pulls against a private need to check the foundation first. The strain can show when your circle wants a commitment before you have checked.',
    '5/1': 'Being expected to have the answer pulls against needing to have checked it. The strain can show when people want a solution before you have done the checking.',
    '5/2': 'Being called on often pulls against wanting to be left alone with your knack. The strain can show when the calls come faster than you can recover from them.',
};
/** How the conscious line becomes sure (after "becomes sure by"), from profileByAuthority.ts. */
export const LINE_SURE = {
    1: 'checking the foundation yourself, in private',
    2: 'being drawn out by someone else',
    3: 'trying it and finding where it breaks',
    4: 'what the people you know can vouch for',
    5: 'being asked a real question',
    6: 'living through it and then watching from a distance',
};
/** How that same sureness can pass for a yes (after "the risk is"), from profileByAuthority.ts. */
export const LINE_MISLEADS = {
    1: 'finished research can read as permission to act when it has only built solid ground',
    2: 'being called on can feel like a decision you made',
    3: 'wanting to test something can pass for agreeing to it',
    4: 'loyalty to the people involved can settle a question that was never about them',
    5: 'a flattering request can get a yes before anything in you has answered',
    6: 'a wide view can be real and still arrive more slowly than a decision can wait',
};
/** The authority, as the signal the reader has (completes "your ..."); never the authority's name. */
export const AUTHORITY_SIGNAL = {
    Sacral: 'bodily response',
    Splenic: 'first quiet impression',
    'Emotional / Solar Plexus': 'emotional clarity',
    'Ego Manifested': 'sense of what you will actually commit to',
    'Ego Projected': 'sense of what you want',
    'Self-Projected': 'sense of direction',
    'Mental / Environmental': 'way of talking things through in the right place',
    Lunar: 'month-long answer',
};
/**
 * The conscious line meeting the authority (profileByAuthority.ts), in the
 * authority's own tempo: an immediate signal answers before the line is sure, a
 * delayed one takes as long as the line does but for other reasons, a dialogic
 * one is not finished until it has been said to someone.
 */
export function lineMeetsAuthority(line, tempo, authority) {
    const signal = AUTHORITY_SIGNAL[authority] ?? 'way of deciding';
    /* The side is named by its role, not its number: the profile paragraph above already uses "the first" and "the second" for the two sides. */
    const lead = `The side of you that you are aware of becomes sure by ${LINE_SURE[line]}`;
    switch (tempo) {
        case 'immediate':
            return `${lead}. Your ${signal} does not wait for that: it answers first. Let that side improve the work and leave the deciding to the answer. The risk is the reverse: ${LINE_MISLEADS[line]}.`;
        case 'delayed':
            return `${lead}, and your ${signal} also takes time. The two run for different reasons and finish at different points, so let the slower one finish. A false start can look like this: ${LINE_MISLEADS[line]}.`;
        default:
            return `${lead}, and your ${signal} needs the question said aloud to someone. A conclusion reached alone is not finished, and this is how it goes wrong: ${LINE_MISLEADS[line]}.`;
    }
}
/**
 * The conscious line meeting what the Type does (social.initiation): a line that waits to be called (second,
 * fifth) fits a Type that waits for something real, and sits awkwardly against one that moves first; a line
 * that tries things out (third) or works through people (fourth) has its own fit; a first line checks before it moves. No note for the sixth
 * line (its phases are in the pair text) or for a chart that changes with every cycle.
 */
export function lineMeetsType(line, initiation) {
    const stance = line === 2 || line === 5 ? 'called' : line === 3 ? 'trying' : line === 4 ? 'network' : line === 1 ? 'grounded' : null;
    if (!stance || initiation === 'over-a-cycle')
        return null;
    const notes = {
        called: {
            'after-response': 'Waiting to be called fits the way you start things, which also begins with something real to respond to.',
            'on-recognition': 'Waiting to be called fits the way you work, which goes best where you are actually wanted.',
            direct: 'Waiting to be called sits against your habit of moving first, so tell people what you are doing rather than waiting for them to ask.',
        },
        trying: {
            'after-response': 'Trying things out works best when something real is already there to respond to.',
            'on-recognition': 'Trying things out sits against waiting to be recognised, so try them where you are wanted.',
            direct: 'Trying things out matches your habit of moving first, so tell people what you are testing.',
        },
        network: {
            'after-response': 'Working through people you know fits starting from something real, which one of them often brings.',
            'on-recognition': 'Working through people you know fits waiting to be recognised, since recognition tends to come from them.',
            direct: 'Working through people you know suits a habit of moving first, because they are the ones to tell.',
        },
        grounded: {
            'after-response': 'Checking the ground first fits starting from something real.',
            'on-recognition': 'Doing the homework in private fits waiting until your insight is wanted.',
            direct: 'Checking first slows a move you could otherwise make quickly, which gives the people it affects time to hear about it.',
        },
    };
    return notes[stance][initiation];
}
