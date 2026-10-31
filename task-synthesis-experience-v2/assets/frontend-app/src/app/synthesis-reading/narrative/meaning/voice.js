import { contributionFor } from '../../contributions.js?v=53c0693';
/* ---------------------------------------------------------------- predicates */
/** Keyed by the lexicon's own English phrase, so a change to the lexicon cannot silently orphan one. */
export const PREDICATES = {
    /* signs */
    'pushes toward starting before the ground is ready': 'push toward starting before the ground is ready',
    'slows things down and wants something tangible to hold': 'slow things down and want something tangible to hold',
    'moves quickly between contexts and works in comparison': 'move quickly between contexts and work in comparison',
    'steers toward safety and what has been felt before': 'steer toward safety and what has been felt before',
    'needs the doing to be seen to count as done': 'need the doing to be seen to count as done',
    'pushes toward refining the work and noticing what does not fit': 'push toward refining the work and noticing what does not fit',
    'calibrates every position against the other person': 'calibrate every position against the other person',
    'commits completely or withholds completely, and keeps a private reserve': 'commit completely or withhold completely, and keep a private reserve',
    'reaches for the larger frame and says the uncomfortable part': 'reach for the larger frame and say the uncomfortable part',
    'organises around competence and a long time horizon': 'organise around competence and a long time horizon',
    'holds a position on grounds it can state, and sees the system rather than the case': 'hold a position on grounds you can state, and see the system rather than the case',
    'absorbs the state of the room and works by resonance': 'absorb the state of the room and work by resonance',
    /* numbers */
    'pushes toward beginning, and beginning alone': 'push toward beginning, and beginning alone',
    'will not have the thing decided alone': 'refuse to have a thing decided alone',
    'does not count the thing as real until it has been said': 'count a thing as real only once it has been said',
    'does not count anything finished until it can be relied on': 'count nothing as finished until it can be relied on',
    'insists every door stays unlocked': 'insist that every door stays unlocked',
    'takes on holding the thing together': 'take on holding things together',
    'keeps pulling attention beneath the first answer': 'keep pulling attention beneath the first answer',
    'measures by the result and wants agency over it': 'measure by the result and want agency over it',
    'widens the view until the personal is only part of it': 'widen the view until the personal is only part of it',
    'turns sensitivity into a signal rather than a setting': 'turn sensitivity into a signal rather than a setting',
    'wants to build to a plan larger than one stretch of work': 'want to build to a plan larger than one stretch of work',
    'extends care past the people it is owed to': 'extend care past the people it is owed to',
    /* the five phases */
    'reaches outward and wants room to grow into': 'reach outward and want room to grow into',
    'brings warmth and wants the thing visible': 'bring warmth and want the thing visible',
    'settles things and makes them reliable': 'settle things and make them reliable',
    'cuts away what does not hold and insists on the standard': 'cut away what does not hold and insist on the standard',
    'goes around rather than through, and listens first': 'go around rather than through, and listen first',
    /* the Day Master's strength and season */
    'means the chart\'s own centre is outweighed by its season, so timing and support matter more than force': 'find that timing and support matter more than force',
    'means the chart\'s centre is slightly outweighed by its season and works better with support than alone': 'work better with support than alone',
    'means the chart\'s centre is neither outmatched nor dominant, so neither forcing nor waiting is the default': 'default to neither forcing nor waiting',
    'means the chart\'s centre holds its own season, so it can carry a load without borrowing': 'carry a load without borrowing',
    'means the chart\'s centre dominates its season, so the difficulty is spending the force rather than finding it': 'find it harder to spend the force than to find it',
    'runs the stem at full strength with nothing moderating it, so what is needed is an outlet rather than more support': 'run at full strength with nothing moderating it, so what is needed is an outlet rather than more support',
    'feeds the stem from outside, so there is capacity here to spend rather than capacity to protect': 'have capacity to spend rather than capacity to protect',
    'draws on the stem continuously, so what it produces leaves and the cost is not felt while it is being paid': 'give out what you produce continuously, and do not feel the cost while it is being paid',
    'sets the stem against its season, so the work gets done and it gets done against resistance': 'get the work done, and get it done against resistance',
    'presses on the stem, so results come from selection and timing rather than from force': 'get results from selection and timing rather than from force',
    /* polarity and the Ten Gods */
    'pulls the whole reading toward acting outward before waiting': 'lean toward acting outward before waiting',
    'pulls the whole reading toward absorbing before acting': 'lean toward absorbing before acting',
    'puts the pressure on producing something visible': 'feel the pressure to produce something visible',
    'puts the emphasis on what feeds and supports the centre': 'lean on what feeds and supports you',
    'puts the emphasis on what can be held and used': 'put the emphasis on what can be held and used',
    'puts the emphasis on the structure the chart has to work inside': 'put the emphasis on the structure you have to work inside',
    'puts the emphasis on standing level with others rather than above them': 'stand level with others rather than above them',
    /* Human Design */
    'moves fast once something has actually been responded to, and skips the steps it can': 'move fast once something has actually drawn a response, and skip the steps you can',
    'answers rather than originates, and renews only on work it said yes to': 'answer rather than originate, and renew only on work you said yes to',
    'initiates first and meets resistance for it': 'initiate first and meet resistance for it',
    'sees the system rather than running it, and works through being asked': 'see the system rather than run it, and work through being asked',
    'reads the room rather than carrying a fixed setting of its own': 'read the room rather than carry a fixed setting of your own',
    'answers in the body before the mind has finished the question': 'answer in the body before the mind has finished the question',
    'holds that there is no truth in the moment, so nothing is decided on the first reading': 'hold that there is no truth in the moment, so nothing is decided on the first reading',
    'gives one quiet signal, once, in the present tense': 'get one quiet signal, once, in the present tense',
    'decides by what it actually wants out of the thing': 'decide by what you actually want out of the thing',
    'finds the direction in the voice rather than in the reasoning': 'find the direction in your own voice rather than in the reasoning',
    'lets the environment settle what the argument cannot': 'let the environment settle what the argument cannot',
    'needs a full month before the answer is trustworthy': 'need a full month before the answer is trustworthy',
    'runs as one continuous circuit that needs nothing external to close it': 'run as one continuous circuit that needs nothing external to close it',
    'leaves a gap between two defined areas that other people tend to bridge': 'leave a gap between two areas that other people tend to bridge',
    'leaves three separate areas, which is a design that takes its time': 'integrate three separate areas, a design that takes its time',
    'leaves four fixed separate areas, which is rare and slow to integrate': 'integrate four fixed separate areas, which is rare and slow',
    'carries nothing fixed, so it is shaped by whatever is present': 'carry nothing fixed, so you are shaped by whatever is present',
    /* the chart's element and modality emphasis */
    'pulls the rest toward moving before the picture is complete': 'lean toward moving before the picture is complete',
    'pulls the rest toward what can be demonstrated': 'lean toward what can be demonstrated',
    'pulls the rest toward naming the thing before holding it': 'lean toward naming the thing before holding it',
    'pulls the rest toward treating feeling as the first information': 'treat feeling as the first information',
    'pulls the rest toward opening things rather than continuing them': 'lean toward opening things rather than continuing them',
    'pulls the rest toward holding a position once taken': 'lean toward holding a position once taken',
    'pulls the rest toward adapting to what is actually happening': 'lean toward adapting to what is actually happening',
};
/* ------------------------------------------------------------------- handles */
/**
 * A HANDLE is how a quality is referred to AFTER it has been introduced (V2.3).
 *
 * A result is fully introduced once, by its predicate (`you keep pulling attention beneath
 * the first answer`). When it takes part in a second finding the reading does not say it
 * again; it points back (`that habit of looking beneath the first answer`). A handle is the
 * noun phrase that does the pointing: one authored restatement per lexicon phrase, in the
 * same order as PREDICATES (a test pairs them by key and holds each to the words of its source).
 */
const HANDLE_LIST = [
    'the push to start before the ground is ready',
    'the wish for something tangible to hold',
    'the quick movement between contexts',
    'the steer toward safety and what has been felt before',
    'the need for the doing to be seen',
    'the pull toward refining the work',
    'the habit of checking every position against the other person',
    'the all-or-nothing commitment with a private reserve',
    'the reach for the larger frame',
    'the organising around competence and a long time horizon',
    'the habit of holding a position on grounds you can state',
    'the absorbing of the mood of the room',
    'the push to begin alone',
    'the refusal to have a thing decided alone',
    'the need for a thing to be said before it counts',
    'the insistence that nothing is finished until it can be relied on',
    'the insistence that every door stays unlocked',
    'the readiness to hold things together',
    'the habit of looking beneath the first answer',
    'the habit of measuring by the result',
    'the widening of the view until the personal is only part of it',
    'the way sensitivity becomes a signal rather than a setting',
    'the building to a plan larger than one stretch of work',
    'the extending of care past the people it is owed to',
    'the reach outward for room to grow into',
    'the warmth and the wish to have things visible',
    'the settling of things into something reliable',
    'the cutting away of what does not hold',
    'the going around rather than through',
    'the sense that timing and support matter more than force',
    'the way it works better with support than alone',
    'the default of neither forcing nor waiting',
    'the ability to carry a load without borrowing',
    'the difficulty of spending force rather than finding it',
    'the full strength with nothing moderating it',
    'the capacity to spend rather than to protect',
    'the giving out of what you produce without feeling the cost',
    'the getting of the work done against resistance',
    'the getting of results from selection and timing',
    'the lean toward acting outward before waiting',
    'the lean toward absorbing before acting',
    'the pressure to produce something visible',
    'the reliance on what feeds and supports you',
    'the emphasis on what can be held and used',
    'the emphasis on the structure you have to work inside',
    'the standing level with others rather than above them',
    'the fast move once something draws a response',
    'the habit of answering rather than originating',
    'the habit of initiating first',
    'the seeing of the system rather than the running of it',
    'the reading of the room rather than carrying a fixed setting',
    'the answering in the body before the mind has finished',
    'the holding off because nothing is decided on the first reading',
    'the one quiet signal given once',
    'the deciding by what you actually want',
    'the finding of direction in your own voice',
    'the letting of the environment settle what argument cannot',
    'the need for a full month before an answer is trustworthy',
    'the single continuous circuit that needs nothing outside to close it',
    'the gap that other people tend to bridge',
    'the three separate areas that take their time to integrate',
    'the four fixed areas that are slow to integrate',
    'the shaping by whatever is present',
    'the lean toward moving before the picture is complete',
    'the lean toward what can be demonstrated',
    'the lean toward naming a thing before holding it',
    'the treating of feeling as the first information',
    'the lean toward opening things rather than continuing them',
    'the lean toward holding a position once taken',
    'the lean toward adapting to what is actually happening',
];
/** Keyed by the lexicon's own phrase, like PREDICATES. */
export const HANDLES = Object.fromEntries(Object.keys(PREDICATES).map((phrase, index) => [phrase, HANDLE_LIST[index] ?? '']));
const PLANET_LENS = {
    Sun: { lens: 'At the centre of who you are,', noun: 'how you see yourself' },
    Moon: { lens: 'Emotionally,', noun: 'how you feel' },
    Mercury: { lens: 'In how you think and talk,', noun: 'how you think' },
    Venus: { lens: 'In what you value and how you attach,', noun: 'how you relate' },
    Mars: { lens: 'In how you go into action,', noun: 'how you act' },
    Jupiter: { lens: 'In how you grow and reach,', noun: 'how you grow' },
    Saturn: { lens: 'In how you hold yourself to account,', noun: 'how you hold yourself to account' },
    ascendant: { lens: 'In how you meet a new situation,', noun: 'how you arrive' },
};
const NUMEROLOGY_LENS = {
    lifePath: { lens: 'Across a lifetime,', noun: 'the direction of your life' },
    soulUrge: { lens: 'Underneath,', noun: 'what you want underneath' },
    expression: { lens: 'In how you go about things,', noun: 'how you go about things' },
    personality: { lens: 'On first meeting, you come across as someone who', noun: 'how you come across', third: true },
    maturity: { lens: 'Later in life,', noun: 'where you are heading later' },
    birthDay: { lens: 'In your everyday manner,', noun: 'your everyday manner' },
    hiddenPassion: { lens: 'As a quiet passion,', noun: 'what you quietly want' },
    attitude: { lens: 'When something new arrives,', noun: 'how you meet what is new' },
    balance: { lens: 'Under pressure,', noun: 'how you hold up under pressure' },
};
const HD_LENS = {
    type: { lens: 'In how your energy works,', noun: 'how your energy works' },
    authority: { lens: 'When you decide,', noun: 'how you decide' },
    definition: { lens: 'In how your energy is organised,', noun: 'how your energy is organised' },
};
const BAZI_LENS = {
    dayMaster: { lens: 'At your core,', noun: null },
    dayMasterSeason: { lens: 'In the conditions you grew into,', noun: null },
};
const WHOLE_CHART = { lens: 'In the overall balance of your make-up,', noun: null };
/* ------------------------------------------------------------------------ fit */
const everything = null;
/**
 * The dimensions a planet may be the witness for. A placement's authored weights
 * are the sign's, so without this a Venus in Virgo would be offered as evidence
 * for analytical reasoning. Absent = unrestricted (the Sun is the person).
 */
const PLANET_FIT = {
    Sun: everything,
    Moon: new Set([
        'emotionally-expressive', 'emotionally-contained', 'emotionally-sensitive', 'collaborative', 'receptive',
        'private', 'belonging', 'care', 'stability-seeking', 'cautious', 'intuitive', 'beauty', 'social',
    ]),
    Mercury: new Set([
        'analytical', 'intuitive', 'conceptual', 'communicative', 'outwardly-engaged', 'introspective', 'structured',
        'adaptable', 'understanding', 'self-expression', 'practical',
    ]),
    Venus: new Set([
        'collaborative', 'social', 'creative', 'beauty', 'belonging', 'care', 'emotionally-expressive',
        'emotionally-sensitive', 'self-expression', 'recognition', 'stability-seeking',
    ]),
    Mars: new Set([
        'assertive', 'independent', 'risk-oriented', 'persistent', 'practical', 'structured', 'mastery', 'achievement',
        'freedom', 'novelty-seeking', 'cautious',
    ]),
    Jupiter: new Set([
        'risk-oriented', 'novelty-seeking', 'conceptual', 'meaning', 'freedom', 'independent', 'assertive',
        'self-expression', 'understanding', 'achievement', 'outwardly-engaged',
    ]),
    Saturn: new Set([
        'structured', 'cautious', 'persistent', 'stability-seeking', 'practical', 'mastery', 'achievement',
        'introspective', 'independent', 'private',
    ]),
    ascendant: new Set([
        'outwardly-engaged', 'social', 'private', 'assertive', 'receptive', 'adaptable', 'independent',
        'emotionally-contained', 'emotionally-expressive', 'introspective', 'collaborative', 'risk-oriented',
    ]),
};
const planetOf = (sourceEntity) => {
    if (sourceEntity === 'ascendant')
        return 'ascendant';
    const match = /^placement-(\w+)$/.exec(sourceEntity);
    return match && match[1] in PLANET_LENS ? match[1] : null;
};
/** Whether this result may speak to the dimension its row sits on. Only planets are restricted. */
export function fitsDimension(evidence) {
    if (evidence.pillar !== 'astrology')
        return true;
    const planet = planetOf(evidence.sourceEntity);
    if (!planet)
        return true;
    const allowed = PLANET_FIT[planet];
    return allowed === null || allowed === undefined || allowed.has(evidence.dimension);
}
/* ---------------------------------------------------------------------- voice */
function lensOf(evidence) {
    const { pillar, sourceEntity } = evidence;
    if (pillar === 'astrology') {
        if (sourceEntity.startsWith('placement-') || sourceEntity === 'ascendant') {
            const planet = planetOf(sourceEntity);
            return planet ? PLANET_LENS[planet] : null;
        }
        return sourceEntity === 'elementBalance' || sourceEntity === 'modalityBalance' ? WHOLE_CHART : null;
    }
    if (pillar === 'numerology')
        return NUMEROLOGY_LENS[sourceEntity.replace(/-\d+$/, '')] ?? null;
    if (pillar === 'bazi') {
        return BAZI_LENS[sourceEntity]
            ?? (sourceEntity === 'elementBalance' || sourceEntity === 'polarityBalance' || sourceEntity.startsWith('tenGod-')
                ? WHOLE_CHART : null);
    }
    return HD_LENS[sourceEntity] ?? null;
}
/** What this result says, in the reader's voice. Null when the lexicon has nothing it can say as a person. */
export function voiceOf(evidence) {
    const contribution = contributionFor(evidence);
    if (!contribution)
        return null;
    const lens = lensOf(evidence);
    /* A third-person role (what people meet first) takes the lexicon's own phrase, which already completes `someone who ...`. */
    const predicate = lens?.third ? contribution.en : PREDICATES[contribution.en];
    if (!predicate || !lens)
        return null;
    /* A profile composite carries two voices in one phrase and is not spoken. */
    if (lens.third && !(contribution.en in PREDICATES))
        return null;
    return { lens: lens.lens, noun: lens.noun, predicate, third: lens.third === true, handle: HANDLES[contribution.en] ?? '' };
}
export const lensNounOf = (evidence) => lensOf(evidence)?.noun ?? null;
