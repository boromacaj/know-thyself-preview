import { auditForecastText } from './forecastSafety.js?v=2ea79e9';
/*
 * THE ENGLISH, WRITTEN FROM THE PLAN AND NOTHING ELSE.
 *
 * Every sentence here is chosen by a member of a closed vocabulary the plan
 * already decided; none is chosen by date, by rotation, or to fill a slot. That is
 * the whole of the discipline: the plan says what the day is, this file says it
 * once, well, and the same plan always reads the same.
 *
 * HOW IT SOUNDS
 * Practical, observant, plain. A day "may suit" or "can" - never "will". The
 * engine's own words (background, trigger, supportive, convergent, activation,
 * inward, outward) do not appear; they name the machinery, not the day. Feelings
 * are things that "may come forward" or "may take more deliberate effort",
 * tendencies the day might bring and never a statement about the reader.
 *
 * HEDGING FOLLOWS CONFIDENCE
 *   high    "Deep work suits today better than juggling several things."
 *   medium  "Today may suit deep work better than juggling several things."
 *   low     the item is not in the plan, so it is not here.
 *
 * THE GUARD IS RUN HERE, ON EVERY SENTENCE, NOT ONLY IN THE TESTS. A sentence
 * that trips the Forecast safety rules is dropped and recorded in `dropped`; the
 * slot is shorter, never padded. The authored tables below are also scanned whole
 * by the test suite, so a bad edit fails there before it can fail here.
 */
/* --------------------------------------------------------------- the words -- */
/** What an activity is, as something a day can be better suited to. */
export const ACTIVITY_PHRASE = {
    'deep-work': 'deep, uninterrupted work',
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
    rest: 'time to rest',
    research: 'looking into things properly',
    negotiation: 'reaching agreement',
    'cleanup-organisation': 'putting things in order',
};
/** The same activities as short list entries under "Good use of the day". */
export const ACTIVITY_LABEL = {
    'deep-work': 'Deep work',
    'editing-and-review': 'Editing and reviewing',
    brainstorming: 'Brainstorming',
    planning: 'Planning',
    administration: 'Administration',
    'difficult-conversation': 'A difficult conversation',
    'social-connection': 'Time with other people',
    'creative-exploration': 'Creative exploration',
    'finishing-work': 'Finishing open work',
    'starting-work': 'Starting something new',
    'physical-activity': 'Physical activity',
    rest: 'Rest',
    research: 'Research',
    negotiation: 'Negotiation',
    'cleanup-organisation': 'Tidying and organising',
};
/** What forcing against the day looks like, as the thing a better-suited use is set against. */
export const CONTRAST_PHRASE = {
    rushing: 'pushing the pace',
    'closing-options-early': 'settling things too early',
    'splitting-attention': 'juggling several things at once',
    'forced-sociability': 'a crowded schedule',
    'pushing-feelings-aside': 'carrying on regardless of how you feel',
    'pressing-for-openness': 'pressing for an emotional conversation',
    'opening-new-fronts': 'opening several new fronts',
    'forcing-a-conclusion': 'forcing a conclusion',
    'pressing-a-point': 'pressing a point',
    'pressing-your-case': 'pressing your own case',
};
export const AVOID_LINE = {
    rushing: 'Pushing the pace.',
    'closing-options-early': 'Narrowing down before you have looked around.',
    'splitting-attention': 'Splitting your attention across several things.',
    'forced-sociability': 'Packing the day with people.',
    'pushing-feelings-aside': 'Carrying on regardless of how you feel.',
    'pressing-for-openness': 'Pressing for an emotional conversation.',
    'opening-new-fronts': 'Opening new fronts while old ones are still open.',
    'forcing-a-conclusion': 'Forcing a conclusion before it is ready.',
    'pressing-a-point': 'Pressing a point in a tense exchange.',
    'pressing-your-case': 'Arguing your case before you have heard the other side.',
};
/** What a day leans toward, as something it may suit - for the glance when no activity leads. */
export const STANCE_PHRASE = {
    urgent: 'making use of the momentum',
    unhurried: 'letting things take their time',
    wide: 'keeping an open, curious mind',
    narrow: 'steady attention to detail',
    outward: 'reaching out to other people',
    inward: 'time to yourself',
    open: 'staying close to what you feel',
    contained: 'staying matter-of-fact',
    begin: 'small beginnings',
    finish: 'finishing what is already open',
    commit: 'making a decision that has waited',
    'keep-open': 'keeping your options open',
    charged: '',
    smooth: 'taking the easy exchanges while they are easy',
    speak: 'saying things plainly',
    listen: 'listening before you answer',
};
export const LEAN_LINE = {
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
export const TENSION_GLANCE = {
    'begin-vs-hold': {
        lead: 'There is enough momentum to begin, but not enough clarity to lock the whole plan in. A small first move may fit the day better than a full commitment.',
        within: 'There is more momentum to begin than clarity to commit, so a small first move may fit better than a full commitment.',
    },
    'decide-vs-friction': {
        lead: 'There is a push to settle things, but the exchanges around them may run hot. Deciding the part that is yours may work better than pressing for agreement.',
        within: 'The push to settle things may meet exchanges that run hot, so deciding only the part that is yours may work better.',
    },
    'speak-vs-friction': {
        lead: 'There is plenty to say, but it may land harder than you intend. Keeping it brief and plain may serve better than arguing it out.',
        within: 'There may be plenty to say and it may land harder than intended, so keeping it brief may serve better.',
    },
    'axis:pace': {
        lead: 'Part of the day pushes forward while another part asks you to slow down. Choosing one pace for the task that matters may work better than switching between the two.',
        within: 'One part of the day pushes forward and another asks to slow down, so one pace for the task that matters may work better.',
    },
    'axis:focus': {
        lead: 'Attention pulls two ways today, toward range and toward depth. Going deep on one thing and keeping the rest as notes may work better than trying to do both.',
        within: 'Attention pulls toward range and toward depth, so going deep on one thing may work better than trying both.',
    },
    'axis:contact': {
        lead: 'The day pulls toward company and toward quiet at once. One of each, kept short, may work better than giving the whole day to either.',
        within: 'Company and quiet pull against each other, so one of each, kept short, may work better than giving the day to either.',
    },
    'axis:feeling': {
        lead: 'Feeling may sit close to the surface in some hours and out of reach in others. Saying how you are in a sentence and carrying on may be enough.',
        within: 'Feeling may sit close to the surface in some hours and out of reach in others.',
    },
    'axis:motion': {
        lead: 'The day pulls toward starting something new and toward closing something old. Closing one open task before beginning another may suit it.',
        within: 'Starting and closing pull against each other, so closing one open task before beginning another may suit it.',
    },
    'axis:commitment': {
        lead: 'The day pulls toward deciding and toward waiting. Settling the part you can and noting what is still open may suit it.',
        within: 'Deciding and waiting pull against each other, so settling what you can and noting the rest may suit it.',
    },
    'axis:friction': {
        lead: 'Some exchanges may go easily while others catch. Taking the easy ones first may suit the day.',
        within: 'Some exchanges may go easily while others catch, so taking the easy ones first may help.',
    },
    'axis:expression': {
        lead: 'There is something to say, and just as much reason to listen first. Asking one question before giving an opinion may suit the day.',
        within: 'There may be something to say and just as much reason to listen first.',
    },
};
export const TENSION_LEAN = {
    'begin-vs-hold': 'A small first move rather than a full commitment.',
    'decide-vs-friction': 'Deciding the part that is yours.',
    'speak-vs-friction': 'Keeping what you say brief and plain.',
    'axis:pace': 'Choosing one pace for the task that matters.',
    'axis:focus': 'Going deep on one thing and keeping the rest as notes.',
    'axis:contact': 'One social thing and one quiet thing, each kept short.',
    'axis:feeling': 'Saying how you are, briefly, then carrying on.',
    'axis:motion': 'Closing one task before beginning another.',
    'axis:commitment': 'Settling what you can and noting what is still open.',
    'axis:friction': 'Taking the easy exchanges first.',
    'axis:expression': 'Asking before telling.',
};
export const TENSION_AVOID = {
    'begin-vs-hold': 'Locking the whole plan in at once.',
    'decide-vs-friction': 'Pressing for agreement while things are tense.',
    'speak-vs-friction': 'Arguing a point out at length.',
    'axis:pace': 'Switching between rushing and slowing on the same task.',
    'axis:focus': 'Trying to go wide and deep at once.',
    'axis:contact': 'Giving the whole day to company, or the whole day to solitude.',
    'axis:feeling': 'Expecting to feel the same way all day.',
    'axis:motion': 'Starting several things while others stay open.',
    'axis:commitment': 'Deciding everything now, or leaving everything open.',
    'axis:friction': 'Taking on the tense exchange first.',
    'axis:expression': 'Giving an opinion before you have listened.',
};
export const RISING_LINE = {
    sensitivity: 'Sensitivity to tone and atmosphere may come forward more easily.',
    impatience: 'Impatience may surface faster than usual.',
    irritability: 'Small irritations may land harder than usual.',
    restlessness: 'Restlessness may come forward more easily.',
    warmth: 'Warmth toward the people around you may come forward more easily.',
    reflectiveness: 'A quiet, reflective mood may come forward more easily.',
    wistfulness: 'A wistful, looking-back mood may come forward more easily.',
    'self-assurance': 'Self-assurance may come more readily than usual.',
};
export const QUIETER_LINE = {
    patience: 'Patience may take more deliberate effort.',
    'emotional-distance': 'Stepping back from a mood may take more deliberate effort.',
    'access-to-feelings': 'Putting words to what you feel may take more deliberate effort.',
    'appetite-for-company': 'The appetite for company may be quieter than usual.',
    spontaneity: 'Spontaneity may be harder to come by.',
    'staying-power': 'Staying with a long task may take more deliberate effort.',
};
export const RELIANCE_LINE = {
    'first-readings': 'Don’t rely on your first reading of what someone says or writes.',
    'a-passing-mood': 'Don’t rely on a passing mood as a guide to what is true.',
    urgency: 'Don’t rely on the feeling that something cannot wait.',
    'quick-appeal': 'Don’t rely on first impressions of what, or who, appeals to you.',
    certainty: 'Don’t rely on a sudden burst of certainty.',
};
export const PITFALL_LINE = {
    'crossed-wires': 'Messages landing differently from how they were meant.',
    'sharp-edges': 'Sharp words, or a short fuse.',
    'taking-things-personally': 'Taking passing remarks personally.',
    'wobbly-preferences': 'Changing your mind about what you want.',
    'proving-a-point': 'A pull to prove a point that does not need proving.',
};
/** One modest thing to do, for each reason the day might offer one. */
export const MOVE_LINE = {
    'activity:deep-work': 'Protect one uninterrupted hour for the task that needs your full attention.',
    'activity:editing-and-review': 'Pick one draft and improve it rather than starting a new one.',
    'activity:brainstorming': 'Write down ten rough ideas without judging them, and leave the sorting for tomorrow.',
    'activity:planning': 'Sketch the next three steps of one plan, and stop there.',
    'activity:administration': 'Clear the small tasks that have been waiting, in one batch.',
    'activity:difficult-conversation': 'Say the one thing that matters in a sentence or two, then listen.',
    'activity:social-connection': 'Message one person you have been meaning to contact.',
    'activity:creative-exploration': 'Give twenty minutes to something made for its own sake.',
    'activity:finishing-work': 'Finish one open task before starting another.',
    'activity:starting-work': 'Take the first step of something you have been putting off, however small.',
    'activity:physical-activity': 'Move your body for twenty minutes before the hardest task of the day.',
    'activity:rest': 'Leave one stretch of the day with nothing planned in it.',
    'activity:research': 'Look something up properly and write down what you found.',
    'activity:negotiation': 'Decide in advance the one point you hold firm on and the one you can give.',
    'activity:cleanup-organisation': 'Tidy one place completely: a desk, an inbox, a drawer.',
    'reliance:first-readings': 'Reread anything important once before you reply to it.',
    'reliance:a-passing-mood': 'Name what you are feeling before you decide what to do about it.',
    'reliance:urgency': 'Give anything that feels urgent an hour before you act on it.',
    'reliance:quick-appeal': 'Sleep on any choice that was made on first impression.',
    'reliance:certainty': 'Write down what you are assuming before you act on it.',
    'pitfall:crossed-wires': 'Say back what you understood before you answer.',
    'pitfall:sharp-edges': 'Wait before replying to anything that irritates you.',
    'pitfall:taking-things-personally': 'Check what was meant before you react to it.',
    'pitfall:wobbly-preferences': 'Make the smaller of the choices on your list and leave the rest.',
    'pitfall:proving-a-point': 'Let one small point go unargued.',
    'tension:begin-vs-hold': 'Make a small first move, such as a draft, a call or a sketch, and leave the full commitment for later.',
    'tension:decide-vs-friction': 'Write the decision down before you send it.',
    'tension:speak-vs-friction': 'Keep what you say short, and say it once.',
    'tension:axis:pace': 'Choose one pace for the task that matters and keep to it.',
    'tension:axis:focus': 'Pick one thing to go deep on and let the rest stay as notes.',
    'tension:axis:contact': 'Plan one social thing and one quiet thing, and let each be short.',
    'tension:axis:feeling': 'Say how you are in a sentence, then carry on.',
    'tension:axis:motion': 'Close one open task, then begin the new one.',
    'tension:axis:commitment': 'Decide the part you can and write down what is still open.',
    'tension:axis:friction': 'Take the easy exchanges first and leave the tense one until you are ready.',
    'tension:axis:expression': 'Ask one question before you give an opinion.',
};
export const DAY_PLAN_HEADINGS = {
    glance: 'Today at a glance',
    leanInto: 'Lean into',
    avoidForcing: 'Avoid forcing',
    emotionalWeather: 'Emotional weather',
    emotionsRising: 'May come forward more easily',
    emotionsQuieter: 'May take more deliberate effort',
    dontRelyOn: 'Don’t rely on',
    goodUse: 'Good use of the day',
    watchFor: 'Watch for',
    practicalMove: 'One practical move',
    basis: 'What this is based on',
    largerPeriod: 'The larger period and the day’s numbers',
    basisToday: 'Today’s own influences',
    basisBackground: 'The longer stretch behind it',
    basisWithheld: 'Not used, and why',
};
const capitalise = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const join = (parts) => parts.join(' and ');
function leadSentence(glance) {
    const lead = glance.lead.length > 0
        ? join(glance.lead.map((activity) => ACTIVITY_PHRASE[activity]))
        : join(glance.stances.map((pole) => STANCE_PHRASE[pole]));
    const plural = glance.lead.length + (glance.lead.length > 0 ? 0 : glance.stances.length) > 1;
    const contrast = glance.contrast && !glance.contrast.startsWith('tension:')
        ? CONTRAST_PHRASE[glance.contrast]
        : null;
    const high = 'high';
    if (glance.confidence === high) {
        const verb = plural ? 'suit' : 'suits';
        return contrast ? `${capitalise(lead)} ${verb} today better than ${contrast}.` : `${capitalise(lead)} ${verb} today well.`;
    }
    return contrast ? `Today may suit ${lead} better than ${contrast}.` : `Today may suit ${lead}.`;
}
function backgroundSentence(glance) {
    const background = glance.background;
    if (!background)
        return null;
    if (background.relation === 'reinforces')
        return `That fits the longer stretch you are in, which is about ${background.theme}.`;
    if (background.relation === 'opposes') {
        return `That runs against the longer stretch you are in, which is about ${background.theme}, so smaller steps may suit better than large ones.`;
    }
    return `The longer stretch you are in is about ${background.theme}, and that remains the main thing underneath the day.`;
}
export function glanceText(glance) {
    const sentences = [];
    if (glance.headline === 'tension' && glance.tension) {
        sentences.push(TENSION_GLANCE[glance.tension].lead);
    }
    else if (glance.headline === 'lead') {
        sentences.push(leadSentence(glance));
    }
    else {
        sentences.push(glance.pressure
            ? 'A day with some pressure in it: nothing in particular leads, but the pull to hurry may be stronger than the day needs.'
            : 'A fairly even day: nothing in particular pulls hard in either direction, so it may suit whatever is already on your list.');
    }
    /*
     * AT MOST TWO SENTENCES AFTER THE OPENING, AND NORMALLY ONE.
     * A tension is the more useful thing to know, so it takes the second place when
     * there is one; the longer stretch is named only when it is the only thing left
     * to add. It comes straight after what it qualifies, so "that" has one thing to
     * point at.
     */
    const background = backgroundSentence(glance);
    if (glance.headline === 'lead' && glance.tension)
        sentences.push(TENSION_GLANCE[glance.tension].within);
    else if (background)
        sentences.push(background);
    return sentences.join(' ');
}
const sayDay = (text, isToday) => (isToday
    ? text
    : text.replace(/\bToday\b/g, 'This day').replace(/\btoday\b/g, 'this day'));
export function renderDayPlanEnglish(plan, options = {}) {
    const dropped = [];
    const isToday = options.isToday ?? true;
    const safe = (slot, kind, raw) => {
        const text = sayDay(raw, isToday);
        const violations = auditForecastText(text);
        if (violations.length === 0)
            return text;
        dropped.push({ slot, kind, violations });
        return null;
    };
    const lines = (slot, items, say) => items.flatMap((item) => { const text = safe(slot, item.kind, say(item.kind)); return text ? [text] : []; });
    const glance = safe('glance', 'glance', glanceText(plan.glance))
        ?? 'Today’s reading could not be written safely, so nothing is said about it.';
    const lean = (kind) => (kind.startsWith('tension:')
        ? TENSION_LEAN[kind.slice('tension:'.length)]
        : LEAN_LINE[kind.slice('pole:'.length)]);
    const avoid = (kind) => (kind.startsWith('tension:')
        ? TENSION_AVOID[kind.slice('tension:'.length)]
        : AVOID_LINE[kind]);
    return {
        glance,
        leanInto: lines('leanInto', plan.leanInto, lean),
        avoidForcing: lines('avoidForcing', plan.avoidForcing, avoid),
        emotionsRising: lines('emotionsRising', plan.emotionsRising, (kind) => RISING_LINE[kind]),
        emotionsQuieter: lines('emotionsQuieter', plan.emotionsQuieter, (kind) => QUIETER_LINE[kind]),
        dontRelyOn: plan.dontRelyOn ? safe('dontRelyOn', plan.dontRelyOn.kind, RELIANCE_LINE[plan.dontRelyOn.kind]) : null,
        goodUse: lines('goodUse', plan.goodUse, (kind) => ACTIVITY_LABEL[kind]),
        watchFor: lines('watchFor', plan.watchFor, (kind) => PITFALL_LINE[kind]),
        practicalMove: plan.practicalMove ? safe('practicalMove', plan.practicalMove.kind, MOVE_LINE[plan.practicalMove.kind]) : null,
        dropped,
    };
}
/** Every authored string above, for the test that scans the whole vocabulary against the safety rules. */
export const ENGLISH_VOCABULARY = [
    ...Object.values(ACTIVITY_PHRASE), ...Object.values(STANCE_PHRASE).filter(Boolean), ...Object.values(ACTIVITY_LABEL), ...Object.values(CONTRAST_PHRASE),
    ...Object.values(AVOID_LINE), ...Object.values(LEAN_LINE).filter(Boolean),
    ...Object.values(TENSION_GLANCE).flatMap((voice) => [voice.lead, voice.within]),
    ...Object.values(TENSION_LEAN), ...Object.values(TENSION_AVOID), ...Object.values(RISING_LINE),
    ...Object.values(QUIETER_LINE), ...Object.values(RELIANCE_LINE), ...Object.values(PITFALL_LINE),
    ...Object.values(MOVE_LINE), ...Object.values(DAY_PLAN_HEADINGS),
];
