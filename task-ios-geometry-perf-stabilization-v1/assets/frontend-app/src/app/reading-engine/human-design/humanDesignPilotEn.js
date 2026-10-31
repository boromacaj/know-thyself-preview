import { wordingOf } from './humanDesignPilotFacts.js?v=d9f39e7';
import { capitalised, joinWords, para } from './humanDesignPilotVoice.js?v=d9f39e7';
/**
 * THE HUMAN DESIGN PILOT, IN ENGLISH - the semantic reference.
 *
 * What this voice does differently from the shipped one, and why (the evidence is in docs/reading-engine-v2/hd-pilot):
 *
 *   It opens on this chart. The lead says what the energy is and how the decision is made, in one line that exists for
 *   the Type and Authority pair (fourteen pairs occur), and then the one relation the reading is built around.
 *   It tells each thing once. What passes for the answer is told with the decision; the two profile lines pulling
 *   apart are told with the profile; a later section refers back instead of repeating.
 *   It names the chart's own connections. The strongest channels are quoted by the headline the knowledge layer already
 *   authored for them, so two charts of one Type no longer share their middle.
 *   It says how sure it is. The wording of every claim follows the modality the intent licenses: what the tradition
 *   holds is stated, a tendency is a tendency, a reading of the person may be wrong.
 *   It is concrete where the system is concrete. The practice is a small number of things to do in an ordinary week,
 *   keyed to how THIS chart decides - not a restatement of the mechanism.
 *
 * What it still will not say: a share of people, a biography, a body, a prediction, another person who completes the
 * chart. There is no claim shape that could carry them, and the pilot's tests scan the output for each.
 */
/* ---------------------------------------------------------------- vocabulary */
/** What a centre is, in a list. The system's name for it belongs to At a glance and to the evidence. */
const CENTER = {
    head: 'mental pressure', ajna: 'how you think', throat: 'expression', g: 'identity', ego: 'willpower',
    solarPlexus: 'emotions', sacral: 'work energy', spleen: 'instinct', root: 'drive',
};
const FUNCTION = {
    drive: 'what powers you', awareness: 'how you take things in', expression: 'how you put things into words and action', direction: 'your sense of direction',
};
const COUNT = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const count = (value) => COUNT[value] ?? String(value);
const names = (ids) => joinWords(ids.map((id) => CENTER[id]), 'and');
/**
 * A MECHANIC THE BIRTH-TIME WINDOW MOVED IS SAID TO BE PROVISIONAL, WHERE IT IS READ.
 * The intent carries what the scan of the estimate found (time.windowChanges); a section whose mechanic is on that list
 * ends with one sentence saying so, instead of the reader having to remember the caveat from the top.
 */
const PROVISIONAL = 'This part changed inside the window, so treat it as the chart of the time you gave rather than as settled.';
const moved = (ctx, ...keys) => (ctx.facts.time?.changes ?? []).some((change) => keys.includes(change));
/** A short quotation from the knowledge layer's own headline, trailing full stop removed. */
const quoted = (headline) => `“${headline.replace(/\.$/, '')}”`;
/* ------------------------------------------------------------------- the lead */
/**
 * ONE LINE PER TYPE AND AUTHORITY, because the two together are the thing a reader recognises first and the thing two
 * charts of one Type most often differ in. Fourteen pairs occur in a chart; none of them says "authority".
 */
const ESSENCE = {
    'manifesting-generator': {
        sacral: 'You are a Manifesting Generator: steady energy with a direct way out, and a body that gives its answer in the moment.',
        'emotional-solar-plexus': 'You are a Manifesting Generator: steady energy with a direct way out, and a decision-maker that needs time to settle.',
    },
    generator: {
        sacral: 'You are a Generator: steady energy that is at its best answering something real, and a body that gives its answer in the moment.',
        'emotional-solar-plexus': 'You are a Generator: steady energy that is at its best answering something real, and a decision-maker that needs time to settle.',
    },
    manifestor: {
        'emotional-solar-plexus': 'You are a Manifestor: a push that starts things on its own, and a clarity that arrives later than the urge.',
        splenic: 'You are a Manifestor: a push that starts things on its own, and an instinct that speaks once, quickly.',
        'ego-manifested': 'You are a Manifestor: a push that starts things on its own, checked by whether you truly want to commit to them.',
    },
    projector: {
        splenic: 'You are a Projector: no steady energy of your own, a close read of people and situations, and an instinct that speaks once, quickly.',
        'emotional-solar-plexus': 'You are a Projector: no steady energy of your own, a close read of people and situations, and a clarity that comes only after a feeling has moved on.',
        'self-projected': 'You are a Projector: no steady energy of your own, a close read of people and situations, and a direction you find by hearing yourself talk.',
        'ego-projected': 'You are a Projector: no steady energy of your own, a close read of people and situations, and a will you hear most clearly when you say it aloud.',
        'mental-environmental': 'You are a Projector: no steady energy of your own, a close read of people and situations, and no inner decider, so the answer comes from talking things over in the right place.',
    },
    reflector: {
        lunar: 'You are a Reflector: nothing in your chart is fixed, so you take on the character of the people and places around you, and a real decision needs about a month.',
    },
};
const TYPE_NAME = {
    'manifesting-generator': 'Manifesting Generator', generator: 'Generator', manifestor: 'Manifestor', projector: 'Projector', reflector: 'Reflector',
};
/** The relation the reading is built around, in one sentence. The full account is in the section that carries it. */
const centralLine = (tension, wording) => {
    const can = wording === 'assert' || wording === 'tendency' ? 'can' : 'may';
    switch (tension.kind) {
        case 'pace':
            return tension.initiation === 'direct'
                ? 'Those two run at different speeds, and that is the first thing to understand about your chart: the urge to move comes well before the clarity to know.'
                : 'Those two run at different speeds, and that is the first thing to understand about your chart: the energy is ready before the answer is.';
        case 'split':
            return `Your chart also comes in separate parts that are not wired to each other, so different parts of you ${can} run on different logic.`;
        case 'reach':
            return 'Your chart also notices more than it can power: part of what takes things in is fixed, what drives action is not.';
        case 'signal-noise':
            return 'The main skill your chart asks for is telling the real answer from the loudest voice that merely sounds like one.';
        case 'profile':
            return 'How you come across and how you actually work come at things from different directions, which is the shape of your profile.';
    }
};
/**
 * THE TWELVE PROFILES IN A LINE.
 * Each is the pilot's own paraphrase of the headline the knowledge layer authored for the pair
 * (knowledge/human-design/hdProfiles.ts), so the lead can say this chart's pair without quoting a headline whose Slovak
 * form would name the reader's gender. A test holds the twelve keys to the knowledge layer's twelve.
 */
export const PROFILE_LINE = {
    '1/3': 'reads everything, then finds out the hard way anyway',
    '1/4': 'goes deep, then travels through people who already trust you',
    '2/4': 'left alone until called, and then called by someone who knows you',
    '2/5': 'wants to be left alone, and keeps being expected to fix things',
    '3/5': 'finds out by trying, and is trusted to have the answer',
    '3/6': 'a messy first act, a long observation, and the weight of experience afterwards',
    '4/6': 'a life built through people, across three distinct phases',
    '4/1': 'a known network on a settled foundation',
    '5/1': 'expected to have the answer, and quietly determined to actually have it',
    '5/2': 'called on by people who have already decided what you are',
    '6/2': 'three phases, lived mostly out of view',
    '6/3': 'three phases, with a trial-and-error engine running under all of them',
};
const time = (ctx) => {
    const t = ctx.facts.time;
    if (!t)
        return [];
    const claim = ['time'];
    if (t.windowHours !== null && t.changes.length === 0) {
        return [para(`Your birth time is an estimate, and Human Design reads everything from one exact moment. This chart was recalculated ${t.windowHours} hours either side of the time you gave and nothing in it changed, so the reading does not hang on the estimate.`, ...claim)];
    }
    if (t.windowHours !== null) {
        return [para(`Your birth time is an estimate, and Human Design reads everything from one exact moment. Recalculating ${t.windowHours} hours either side of the time you gave changed ${joinWords([...t.changes], 'and')}, so treat those parts as provisional; everything else held steady.`, ...claim)];
    }
    return [para('Your birth time is an estimate, and Human Design reads everything from one exact moment: the pattern of centres and channels can shift within a few hours, while the two lines of the profile turn over about once a day. Read what follows as the chart of the time you gave, not as settled.', ...claim)];
};
const lead = (ctx) => {
    const { facts } = ctx;
    const { type } = facts.operating;
    const line = ESSENCE[type][facts.decision.authority]
        ?? `You are a ${TYPE_NAME[type]}, and your decisions follow the pattern described below.`;
    const parts = [line];
    const central = ctx.central;
    if (central)
        parts.push(centralLine(central, wordingOf(facts.modality[central.id])));
    /* The profile pair is the one thing about a chart the knowledge layer sums up in a line of its own; it is said here and
       only here, so the lead is this chart's even when two charts share a Type and an Authority. */
    const headline = facts.social ? PROFILE_LINE[facts.social.label] ?? null : null;
    if (facts.social && headline)
        parts.push(`Your profile, ${facts.social.label}, in a line: ${headline}.`);
    const claims = ['operating', 'decision', ...(central ? [central.id, ...ctx.relations] : []), ...(facts.social && headline ? ['social'] : [])];
    return [...time(ctx), para(parts.join(' '), ...claims)];
};
/* --------------------------------------------------------------- how it works */
const TYPE_ENERGY = {
    'manifesting-generator': 'Your chart has its own renewable working energy and a direct line from it into speech and action. That is why you can look like someone who starts things, and why the advice in this system is to begin from a response. A request, an obstacle or a piece of work already in front of you gives the energy something to push against, while an idea about what ought to happen tends to stall. Once you are moving, you can move fast.',
    generator: 'Your chart has its own renewable working energy, but no direct line from it into speech and action. It is fuel, not a trigger: the work lands when it answers something real, whether a question, a problem or a piece of work that already exists, and stalls when it has to be started cold. That is not a shortage of drive. It is how the energy is built to be spent.',
    manifestor: 'Your chart has a direct line from a source of energy into speech and action, without a renewable supply of working energy behind it. The energy comes in strong bursts, so starting is natural and holding a steady pace for long is what costs. Because you move before anyone has asked, how others take it tends to depend on whether they were told first; telling them is the part of the strategy that removes most of the resistance.',
    projector: 'Your chart has no renewable working energy of its own and no direct line from a source of energy into speech and action. What it has instead is a structure for reading people and situations closely. That is a real capacity, and a different one from out-working a room: it does best where it was asked for. Insight that is wanted tends to be used, and the same insight offered unasked tends not to be.',
    reflector: 'Nothing in your chart is fixed: every part of you samples the people and places around you. That makes you a sensitive gauge of a place, and it means that very little about you reads the same from one week to the next.',
};
const STRATEGY = {
    'manifesting-generator': 'respond, then inform',
    generator: 'respond',
    manifestor: 'inform before acting',
    projector: 'wait for recognition and invitation',
    reflector: 'wait through a lunar cycle',
};
const energy = (ctx) => {
    const { operating } = ctx.facts;
    const provisional = moved(ctx, 'type');
    const out = [para(`${TYPE_ENERGY[operating.type]} The system’s shorthand for this is “${STRATEGY[operating.type]}”.${provisional ? ` ${PROVISIONAL}` : ''}`, 'operating', ...(provisional ? ['time'] : []))];
    if (operating.motorToThroat && operating.motorPath.length > 1 && operating.pathChannels.length > 0) {
        const path = operating.motorPath.map((id) => CENTER[id]).join(' to ');
        const first = operating.pathChannels[0];
        const headline = ctx.meanings.channelHeadline(first);
        ctx.said.add(`quoted:${first}`);
        const single = operating.pathChannels.length === 1;
        out.push(para(`In your chart that line runs from ${path}${single ? ', through one connection' : `, through ${count(operating.pathChannels.length)} connections`}${headline ? `${single ? ' that' : '; the tradition reads the main one'} as ${quoted(headline)}`.replace(' that as', ' that the tradition reads as') : ''}.`, 'operating'));
    }
    return out;
};
/* ------------------------------------------------------------ how it decides */
const AUTHORITY = {
    sacral: 'In your chart the answer shows up in the body, in the moment a real question is put to you: a pull toward something, or a flatness about it, before you have assembled any reasons. Human Design calls how a decision gets made your authority, and this one is sacral. It is not a preference and it is not the case you would argue for. It can differ on a different day, and in this system that is the mechanism working, not inconsistency.',
    'emotional-solar-plexus': 'In your chart there is no reliable answer in the moment, because how you feel about something rises and falls like a wave. Clarity is what is left once the wave has moved through, so the decision is made by letting time pass and seeing how the thing looks afterwards. Human Design calls how a decision gets made your authority, and this one is emotional. The high point of enthusiasm is no more the answer than the low point is; both belong to the same movement.',
    splenic: 'In your chart the answer is a quiet, immediate sense of whether something is sound, closer to noticing than to concluding. Human Design calls how a decision gets made your authority, and this one is splenic. It speaks once and does not repeat itself, so whatever keeps insisting afterwards is coming from somewhere else.',
    'ego-manifested': 'In your chart the answer is whether you actually have the will for something: whether you want it enough to commit and to keep the commitment. Human Design calls how a decision gets made your authority, and this one is ego authority. It is not what you think you should want, and you cannot argue yourself into it. It tends to become audible when you say it aloud.',
    'ego-projected': 'In your chart the answer is whether you actually have the will for something, and you find out by listening to what you say about it, not by working it out in silence. Human Design calls how a decision gets made your authority, and this one is ego authority, heard in your own voice. Thinking it through alone tends to give you a good case rather than an answer.',
    'self-projected': 'In your chart the answer is direction, which way something points you, and you find it by hearing yourself talk it through with someone who simply listens. Human Design calls how a decision gets made your authority, and this one is self-projected. Their opinion is not the point; being heard is. A direction worked out in silence is the one way this cannot be consulted.',
    'mental-environmental': 'In your chart there is no inner decider to consult. What it offers instead is talking things through with people you trust and paying attention to where you are while you do. Human Design calls how a decision gets made your authority, and this arrangement is called mental or environmental. Your mind will have plenty to say, but it is for processing, not for deciding; the setting is what the decision rests on.',
    lunar: 'In your chart nothing can decide in the moment, so the system asks for about a month, a full lunar cycle, in which the same question is met in a changing run of settings. Human Design calls how a decision gets made your authority, and this one is lunar. What stays the same across all of those settings is your answer; a same-day answer is a reading of whoever was in the room.',
};
/** How the type and the authority fit, in terms of time. */
const fitFor = (ctx) => {
    const { operating, decision } = ctx.facts;
    const fast = operating.initiation === 'after-response' || operating.initiation === 'direct';
    if (decision.kind === 'relational' && decision.authority === 'self-projected')
        return null;
    if (decision.kind === 'environmental' || decision.kind === 'lunar')
        return null;
    /* A fast design with a slow authority is the pace tension; the section that tells it in full is "where it pulls two ways". */
    if (decision.needsTime && fast)
        return null;
    if (decision.needsTime) {
        return 'Waiting is built into your design and into how you decide, so the two agree about time. What they ask for is patience in two places: wait to be recognised or invited, and then wait for the clarity.';
    }
    if (fast) {
        return operating.initiation === 'direct'
            ? 'Your urge to move and your answer run at the same speed, so nothing in the pairing forces a pause. That is an advantage with one catch: a decision can be made correctly and still serve the wrong purpose, so check what the move is for before you make it.'
            : 'Your energy and your answer run at the same speed, so nothing in the pairing forces a pause. That is an advantage with one catch: a decision can be made correctly and still answer the wrong question, so go back to what you were actually asked.';
    }
    return 'Your design waits to be asked while your signal is immediate, which makes it easy to talk yourself out of. By the time the invitation you were waiting for arrives, the answer has often been given and forgotten, so note it when it happens.';
};
const NOISE_DECIDE = {
    ajna: 'One thing in your chart can pass for the answer: certainty. How you think is open, so it takes in and amplifies the confidence of whoever is around you and produces firm-sounding conclusions that arrive without ground underneath them. The test is not how certain it feels, but whether it arrives the way described above.',
    solarPlexus: 'One thing in your chart can pass for the answer: other people’s emotional weather. Your emotions are open, so you pick up the mood in the room and amplify it until it feels like your own urgency or conviction. The test is not how strongly it is felt, but whether it arrives the way described above.',
};
const decide = (ctx) => {
    const { decision } = ctx.facts;
    const out = [para(`${AUTHORITY[decision.authority]}${moved(ctx, 'authority') ? ` ${PROVISIONAL}` : ''}`, 'decision', ...(moved(ctx, 'authority') ? ['time'] : []))];
    const fit = fitFor(ctx);
    if (fit)
        out.push(para(fit, 'decision'));
    const noise = ctx.facts.tensions.find((tension) => tension.kind === 'signal-noise' && ctx.placed.has(tension.id));
    if (noise && noise.kind === 'signal-noise') {
        ctx.said.add(`noise:${noise.noise}`);
        out.push(para(NOISE_DECIDE[noise.noise] ?? 'One thing in your chart can pass for the answer: a part of you that amplifies whatever is around it. The test is whether the signal arrives the way described above.', noise.id, ...ctx.relations));
    }
    return out;
};
/* -------------------------------------------------------- how it meets people */
const CONSCIOUS = {
    1: 'you feel you need solid ground under a thing, an understanding you have checked yourself, before you trust it',
    2: 'you feel you have a knack you did not have to work for, and you want to be left alone to use it until someone asks',
    3: 'you learn by trying, and a plan that does not work feels like information more than like failure',
    4: 'you work through people you already know, and things reach you through that circle rather than from strangers',
    5: 'people arrive expecting you to have the answer, and you often feel less sure than they assume',
    6: 'you live in phases: a stretch of trial and error, then a stretch of standing back, then living from what both produced',
};
const UNCONSCIOUS = {
    1: 'you keep looking for a foundation, even when you do not notice that you are looking',
    2: 'there is a natural ability that other people tend to see before you do, and it comes out best when you are not watched',
    3: 'you are experimenting all the time, and much of what looks like a false start is the method working',
    4: 'your life runs through relationships you already have, and the people around you open more doors than you are aware of',
    5: 'other people project onto you, and the reputation tends to run ahead of the reality',
    6: 'you are living in phases you may not be aware of; the shape shows more over time than from inside any one of them',
};
const people = (ctx) => {
    const { social } = ctx.facts;
    if (!social)
        return [];
    const w = wordingOf(ctx.facts.modality.social);
    /* an estimate that was scanned and whose profile did not move needs no hedge on the profile: the scan already answered it */
    const scannedClean = ctx.facts.time !== null && ctx.facts.time.windowHours !== null;
    const hedge = moved(ctx, 'profile') ? ` ${PROVISIONAL}` : w === 'assert' || scannedClean ? '' : ' The system reads it this way if the time you gave is close.';
    const out = [para(`Your profile is ${social.label}, two lines read together. On the surface ${CONSCIOUS[social.conscious]}. Underneath, ${UNCONSCIOUS[social.unconscious]}.${hedge}`, 'social')];
    if (social.shape === 'opposed') {
        const tension = ctx.facts.tensions.find((item) => item.kind === 'profile' && ctx.placed.has(item.id));
        out.push(para('These two come at things from different directions, which Human Design reads as the shape of a profile rather than a fault in it. It tends to show most in situations that ask you to be only one of them.', 'social', ...(tension ? [tension.id, ...ctx.relations] : [])));
    }
    else if (social.shape === 'staged') {
        out.push(para('A sixth line is read in phases rather than as a steady setting, so this part of the chart is not meant to look the same across a life. What is described here is a shape to grow into, not something you are supposed to recognise already.', 'social'));
    }
    else {
        out.push(para('The two lines lean the same way, so they reinforce each other rather than pulling apart.', 'social'));
    }
    return out;
};
/* ----------------------------------------------------- what is fixed in you */
/** Which functions are wholly fixed and which only in part, from the two lists the intent carries (fixed centres' functions, open centres' functions). */
const functionStates = (ctx) => {
    const defined = new Set(ctx.facts.consistency?.functionsDefined ?? []);
    const open = new Set(ctx.facts.context?.functionsOpen ?? []);
    const all = ['awareness', 'expression', 'direction', 'drive'];
    return {
        steady: all.filter((fn) => defined.has(fn) && !open.has(fn)),
        partly: all.filter((fn) => defined.has(fn) && open.has(fn)),
        dependent: all.filter((fn) => !defined.has(fn) && open.has(fn)),
    };
};
const CENTER_ORDER = ['head', 'ajna', 'throat', 'g', 'ego', 'solarPlexus', 'sacral', 'spleen', 'root'];
const steady = (ctx) => {
    const c = ctx.facts.consistency;
    if (!c)
        return [];
    const one = c.definedCount === 1;
    const states = functionStates(ctx);
    const pattern = states.steady.length > 0
        ? ` That makes ${joinWords(states.steady.map((fn) => FUNCTION[fn]), 'and')} the dependable part of you${states.partly.length > 0 ? `, and ${joinWords(states.partly.map((fn) => FUNCTION[fn]), 'and')} dependable only in part, because some of the areas that make ${states.partly.length > 1 ? 'them' : 'it'} up are open` : ''}.`
        : states.partly.length > 0 ? ` That makes ${joinWords(states.partly.map((fn) => FUNCTION[fn]), 'and')} dependable only in part, because some of the areas that make it up are open.` : '';
    const out = [para(`Of the nine areas Human Design maps, ${count(c.definedCount)} ${one ? 'is' : 'are'} fixed in you: ${names(c.definedCenters)}. Fixed means consistent: ${one ? 'it works' : 'they work'} the same way whoever you are with and whatever kind of day it is.${pattern}`, 'consistency')];
    /* Two channels can join the same two areas; they are one thread with two readings, said once. */
    const byEnds = new Map();
    for (const id of c.channels) {
        const ends = ctx.meanings.channelCenters(id);
        if (!ends)
            continue;
        const [a, b] = [...ends].sort((x, y) => CENTER_ORDER.indexOf(x) - CENTER_ORDER.indexOf(y));
        const key = `${CENTER[a]} to ${CENTER[b]}`;
        byEnds.set(key, [...(byEnds.get(key) ?? []), id]);
    }
    const decidingChannels = c.channels.filter((id) => ctx.facts.decision.evidenceChannels.includes(id)).length;
    const threads = [...byEnds.entries()].map(([between, ids]) => {
        const route = ids.some((id) => ctx.facts.operating.pathChannels.includes(id));
        const told = ids.every((id) => ctx.said.has(`quoted:${id}`));
        const role = route ? (told ? 'the route described above' : 'the route that carries your energy to action') : null;
        const headlines = ids.filter((id) => !ctx.said.has(`quoted:${id}`)).map((id) => ctx.meanings.channelHeadline(id)).filter((h) => h !== null);
        ids.forEach((id) => ctx.said.add(`quoted:${id}`));
        if (told)
            return `${between} (${role ?? 'described above'})`;
        const reading = headlines.length === 0 ? '' : ids.length > 1
            ? `, in ${count(ids.length)} ways, which the tradition reads as ${joinWords(headlines.map(quoted), 'and')}`
            : `, which the tradition reads as ${quoted(headlines[0])}`;
        return `${between}${reading}${role ? ` (${role})` : ''}`;
    });
    if (threads.length > 0) {
        out.push(para(`${c.channels.length === 1 ? 'The connection that stands out is what sets your chart apart from another of the same type' : `Of the connections that hold ${one ? 'it' : 'them'} in place, ${c.channels.length === 2 ? 'two' : c.channels.length === 3 ? 'three' : 'several'} stand out, and they are what set your chart apart from another of the same type`}: ${threads.join('; ')}.${decidingChannels === 0 ? '' : decidingChannels === c.channels.length ? (c.channels.length === 1 ? ' It also runs through the part of you that decides.' : ' All of them also run through the part of you that decides.') : decidingChannels === 1 ? ' One of them also runs through the part of you that decides.' : ` ${decidingChannels === 2 ? 'Two' : 'Several'} of them also run through the part of you that decides.`}${moved(ctx, 'channels', 'definition') ? ` ${PROVISIONAL}` : ''}`, 'consistency', ...(moved(ctx, 'channels', 'definition') ? ['time'] : [])));
    }
    return out;
};
/* ---------------------------------------------------------- what is open */
const OPEN_NOISE = {
    head: 'mental pressure is open, so questions can feel urgent and often are not yours',
    ajna: 'how you think is open, so conclusions that sound certain are easy to pick up from others',
    throat: 'expression is open, so there can be a pull to speak in order to be noticed rather than because there is something to say',
    g: 'identity is open, so you can feel you ought to have a fixed direction by now',
    ego: 'willpower is open, so promises can be made to prove something, and your worth can come to be measured by what you last delivered',
    solarPlexus: 'your emotions are open, so you pick up the emotional weather around you and can amplify it until it feels like your own',
    sacral: 'work energy is open, so you can feel you should be able to keep going as long as everyone around you',
    spleen: 'instinct is open, so it is easy to hold on to a person or a situation past the point it is good for you',
    root: 'drive is open, so other people’s hurry can become your own deadline',
};
/** Which open centres are worth a sentence, in the order a reader is most likely to meet their cost. */
const OPEN_PRIORITY = ['root', 'sacral', 'solarPlexus', 'ego', 'spleen', 'head', 'g', 'throat', 'ajna'];
const open = (ctx) => {
    const c = ctx.facts.context;
    if (!c)
        return [];
    if (c.whollyOpen) {
        return [
            para('With every part open, the question “what am I like?” has a different answer depending on where you ask it, and the answer says as much about the place as about you.', 'context'),
            para('The system does not read that as emptiness but as sampling: an instrument that shows the state of a room accurately because it holds nothing of its own. In practice, where you spend your time and who you spend it with is the main variable.', 'context'),
        ];
    }
    const one = c.openCount === 1;
    const out = [para(`${one ? 'The other one is open' : `The other ${count(c.openCount)} are open`}: ${names(c.openCenters)}. Open does not mean missing, it means variable: ${one ? 'it takes its' : 'these take their'} character from whoever and whatever is around and ${one ? 'amplifies' : 'amplify'} it, which is also where you learn most.`, 'context')];
    const picks = OPEN_PRIORITY
        .filter((id) => c.openCenters.includes(id) && !ctx.said.has(`noise:${id}`))
        .slice(0, 2);
    if (picks.length > 0) {
        out.push(para(`${picks.length === 1 ? 'One stands out' : 'Two stand out'}: ${picks.map((id) => OPEN_NOISE[id]).join('; and ')}.`, 'context'));
        picks.forEach((id) => ctx.said.add(`open:${id}`));
    }
    return out;
};
/* --------------------------------------------------- where it pulls two ways */
const pullText = (tension, ctx, index) => {
    const w = wordingOf(ctx.facts.modality[tension.id]);
    const hedged = w === 'assert' || w === 'tendency';
    const opener = index === 0 ? '' : index === 1 ? 'Separately, ' : 'There is a further pull: ';
    const sentence = (text) => (opener ? `${opener}${text.charAt(0).toLowerCase()}${text.slice(1)}` : text);
    switch (tension.kind) {
        case 'pace':
            return sentence(tension.initiation === 'direct'
                ? 'The push that starts things moves first and fast; the clarity that decides arrives later. Neither side is the problem and neither is meant to win. What this sets up is letting the pace of the doing set the pace of the deciding, so that the first rush of certainty is acted on because it is there. Moving first is natural for you; committing before the clarity has arrived is the part that costs, and telling the people affected that you will confirm later is cheaper than reversing.'
                : `The energy is ready as soon as something real appears; the answer needs elapsed time before there is anything to read. Neither side is the problem and neither is meant to win. What this sets up is letting the pace of the doing set the pace of the deciding: a yes at the crest of enthusiasm, a no in the trough. ${ctx.facts.operating.type === 'generator' ? 'Acting on a response is fine; committing before the clarity has arrived is the part that costs.' : 'Moving fast is fine; committing fast is the part that costs.'}`);
        case 'split': {
            const two = tension.groupCenters.length === 2;
            const ORDINAL = ['one part holds', 'another holds', 'a third holds', 'a fourth holds', 'a fifth holds'];
            const parts = tension.groupCenters
                .map((group, at) => `${at === 0 ? 'one part holds' : two ? 'the other holds' : ORDINAL[at] ?? 'another holds'} ${names(group)}`)
                .join('; ');
            const bridge = tension.bridgeGates.length > 0
                ? ` The gap is a specific one: it would close at ${tension.bridgeGates.length > 4 ? 'gates such as ' : tension.bridgeGates.length === 1 ? 'gate ' : 'gates '}${joinWords(tension.bridgeGates.slice(0, 4).map(String), 'and')}, which this chart does not carry. That is a description of the wiring, not a statement that you need someone who has ${tension.bridgeGates.length === 1 ? 'it' : 'them'}.`
                : ' This describes how the chart is wired, not a statement that you need someone to join the parts.';
            return sentence(`Your chart comes in ${count(tension.groupCenters.length)} parts with no wiring between them: ${parts}. Each is consistent inside itself, so ${two ? 'the two' : 'they'} ${hedged ? 'can' : 'may'} run on different logic at once without ${two ? 'either' : 'any'} being wrong.${bridge}${moved(ctx, 'definition') ? ` ${PROVISIONAL}` : ''}`);
        }
        case 'reach':
            return sentence(`Your chart has fixed ${names(tension.awareness)} without steady energy underneath: ${names(tension.openDrive)} ${tension.openDrive.length > 1 ? 'are' : 'is'} variable. The result is a design that reliably notices more than it can reliably act on, which is workable once it is expected and exhausting when it is taken for a personal failure to follow through.`);
        default:
            return '';
    }
};
const pull = (ctx) => {
    const out = [];
    for (const tension of ctx.facts.tensions) {
        if (!ctx.placed.has(tension.id))
            continue;
        const text = pullText(tension, ctx, out.length);
        if (!text)
            continue;
        out.push(para(text, tension.id, ...ctx.relations));
    }
    return out;
};
/* -------------------------------------------------------- when it goes wrong */
const NOT_SELF = {
    'manifesting-generator': 'a stuck kind of irritation, the feeling of pushing at something that will not give. The system reads a recurring version of it as information rather than character: usually that the thing was started from an idea about what should happen instead of from something real to push against.',
    generator: 'a stuck kind of irritation, effort going into something that is not moving. The system reads a recurring version of it as a sign that the work was taken on because it was there, not because anything in you answered it.',
    manifestor: 'a hard flare of anger, usually at being blocked or questioned. The system reads a recurring version of it as a sign that people are being surprised by your movements, resistance that might have been absent if they had been told first.',
    projector: 'a particular sourness, effort given and not seen. The system reads a recurring version of it as a sign that you are offering into places where nobody asked, which costs more here than it would in a design built to push.',
    reflector: 'a quiet letdown, hoping a place or a group of people would give something good back and finding they do not. The system reads a recurring version of it as a sign of being somewhere that is not good for you, since this design reads the place it is in more than anything else.',
};
const SYSTEM_WORD = {
    frustration: 'frustration', anger: 'anger', bitterness: 'bitterness', disappointment: 'disappointment',
};
/** What the Not-Self state tends to follow, given how THIS chart decides. */
const FOLLOWS = {
    sacral: 'a yes the body never gave',
    'emotional-solar-plexus': 'a decision taken at the top or the bottom of a feeling',
    splenic: 'a first quiet read that an argument later talked you out of',
    'ego-manifested': 'a commitment made because it was reasonable, not because you wanted it',
    'ego-projected': 'a commitment made because it was reasonable, not because you wanted it',
    'self-projected': 'a direction settled in silence',
    'mental-environmental': 'a conclusion reached alone, in a place that did not suit it',
    lunar: 'a decision made on one day\u2019s reading of a place',
};
const off = (ctx) => {
    const { cost } = ctx.facts;
    const w = wordingOf(ctx.facts.modality.cost);
    const tends = w === 'assert' || w === 'tendency' ? 'tends to' : 'may';
    const word = cost.notSelf ? SYSTEM_WORD[cost.notSelf] ?? cost.notSelf : null;
    return [
        para(`When this design is run against itself, what ${tends} show up is ${NOT_SELF[cost.type]}${word ? ` The system has a one-word name for it, ${word}, and treats it as a signal to read rather than a state to fix.` : ''}`, 'cost'),
        para(`For you it ${tends} follow ${FOLLOWS[ctx.facts.decision.authority]}.`, 'cost', 'decision'),
    ];
};
/* ------------------------------------------------------------- what helps */
const FIRST_STEP = {
    sacral: 'Turn decisions into plain questions you can answer yes or no, ask them aloud, and notice what your body does before the reasons arrive. A flat response is an answer, not something to argue with.',
    'emotional-solar-plexus': 'When something is offered, say you will answer tomorrow or later in the week, and see whether the answer is the same once the feeling has moved on. “Let me come back to you” is a complete sentence.',
    splenic: 'Notice the first quiet read, because it will not repeat. If you tend to argue yourself out of it, write it down when it comes.',
    'ego-manifested': 'Ask yourself, aloud, whether you actually want this enough to keep the promise. A reasonable yes you do not want is the one that turns into resentment.',
    'ego-projected': 'Say what you want out loud, to someone or to yourself, and listen to your own voice rather than to the reply.',
    'self-projected': 'Talk the decision through with someone who will listen without advising, and pay attention to what you hear yourself say, not to what they say back.',
    'mental-environmental': 'Talk it through with two or three people you trust, and try the decision out in more than one place before you commit; notice where it feels clear.',
    lunar: 'Give anything large a lunar cycle, about four weeks, and look at it in different places and company. Keep a short note of how it looks each time; what repeats is the answer.',
};
const SECOND_STEP = {
    'manifesting-generator': 'Start from a real response and let the speed follow, and tell the people affected before you change direction.',
    generator: 'Put yourself where real things can reach you, and answer them, rather than deciding in advance what you want.',
    manifestor: 'Tell the people a move will affect before you make it. It takes a minute and removes most of the resistance.',
    projector: 'Wait to be asked or recognised before you offer, give a small piece first, and rest when you need to; you are not built to run flat out.',
    reflector: 'Choose the places and people you spend time in with care, and notice over weeks how you feel in each.',
};
const WATCH_STEP = {
    ajna: 'When a conclusion arrives sounding certain, give it time before treating it as yours.',
    solarPlexus: 'When a mood or an urgency arrives, ask whose it is before you act on it.',
    root: 'When a rush arrives with no deadline behind it, treat it as the room’s hurry, not yours.',
    sacral: 'Stop at the first honest sign of tiredness; you do not have the fuel supply of the people around you.',
};
const SIGNATURE = {
    'manifesting-generator': { sign: 'a tired, done-something contentment at the end of the day' },
    generator: { sign: 'a tired, done-something contentment at the end of the day' },
    manifestor: { sign: 'things moving without having to be fought for' },
    projector: { sign: 'the ease of having been asked for exactly what you are good at' },
    reflector: { sign: 'being surprised by something, in a good way' },
};
const help = (ctx) => {
    const { practice } = ctx.facts;
    const steps = [FIRST_STEP[practice.authority], SECOND_STEP[practice.type]];
    const alreadyRest = practice.watch === 'sacral' && (practice.type === 'projector' || practice.type === 'reflector' || practice.type === 'manifestor');
    if (practice.watch && WATCH_STEP[practice.watch] && !alreadyRest) {
        if (!(practice.watch === 'ajna' && practice.authority === 'lunar'))
            steps.push(practice.watch === 'ajna' && practice.needsTime
                ? 'When a conclusion arrives sounding certain, let it wait until the feeling has moved on before treating it as yours.'
                : WATCH_STEP[practice.watch]);
    }
    const sign = SIGNATURE[practice.type].sign;
    steps.push(practice.signature
        ? `Judge whether this is working by ${sign} (the system calls it ${practice.signature}) rather than by how much got done.`
        : 'Judge whether this is working by how the days feel rather than by how much got done.');
    return [
        para('None of this is a rule, and none of it is owed to anyone. It is what this particular arrangement suggests, in the order it tends to matter.', 'practice'),
        ...steps.map((step, index) => para(`${index + 1}. ${step}`, 'practice')),
        para('This is a symbolic framework for looking at yourself, not a measurement of you: the parts that are not recognisable are allowed to be wrong.', 'practice'),
    ];
};
export const PILOT_VOICE_EN = {
    time, lead, energy, decide, people, steady, open, pull, off, help,
    pullStandfirst: 'Where two parts of this chart want different things. In this system that is information, not a fault.',
};
/** Exposed for the tests that scan every sentence. */
export const PILOT_EN_INTERNALS = { capitalised };
