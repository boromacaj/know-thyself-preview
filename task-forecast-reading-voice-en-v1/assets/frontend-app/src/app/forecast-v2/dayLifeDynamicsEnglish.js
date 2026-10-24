import { TENSION_PULL, TITLE_PHRASE } from './dayAdviceEnglish.js';
import { skySentence } from './dayInterpretationEnglish.js';
import { PHASE_KIND } from './dayKnowledge.js';
import { buildDayLifeDynamics, DAY_LIFE_MOMENTUM_SHARES, DAY_LIFE_ORDER, DAY_LIFE_POLE_SHARES, DAY_LIFE_PRESSURE_SHARES, } from './dayLifeDynamics.js';
import { auditForecastText } from './forecastSafety.js';
import { LIFE_HELPER, LIFE_LABEL } from '../temporal-synthesis/lifeDynamicsEnglish.js';
/*
 * TODAY'S LIFE DYNAMICS, IN ENGLISH.
 *
 * Written from the language-free rows (dayLifeDynamics.ts) and from nothing else: no
 * sentence is chosen to fill a gauge, and an area with no assessment says why it has
 * none instead of producing advice for a domain the day has no evidence for.
 *
 * WHAT THE WORDS MAY CLAIM. A level is where the day's own evidence puts emphasis. Never
 * how well an area goes: no word of luck, success, diagnosis, income or romance, and the
 * words for the levels describe an amount of emphasis (Subtle ... Central theme), not a
 * quality. Tone is said about the influences, not the area: "with friction" is a fact about
 * how the contacts behind an area come, not a verdict on it.
 *
 * EVERY SENTENCE GOES THROUGH THE FORECAST SAFETY GUARD (forecastSafety.ts), as the Day card's
 * does, and a sentence that fails is dropped and recorded, never shown.
 *
 * ENGLISH ONLY. The Slovak Forecast is frozen and shows none of this.
 */
export const DAY_LIFE_LEVEL_WORD = {
    1: 'Subtle', 2: 'Moderate', 3: 'Active', 4: 'Prominent', 5: 'Central theme',
};
export const NOT_ASSESSED = 'Not assessed';
export const DAY_LIFE_COPY = {
    titleToday: 'Today’s Life Dynamics',
    titleOther: 'This day’s Life Dynamics',
    subtitle: 'Which themes stand out today',
    note: 'Each theme shows where the day’s own evidence puts emphasis, not a forecast of how things turn out. “Not assessed” means there is no day-specific evidence to read, which is not the same as a low emphasis. Tap a theme to see why.',
    hint: 'Why this?',
    /** The row's small tag when the influences behind it do not all come the same way. */
    tagMixed: 'mixed signals',
    tagFriction: 'with friction',
    tagTension: 'pulls two ways',
    gaugeAria: (domain, state, level) => `${domain}: ${state.toLowerCase()} emphasis today, ${level} of 5`,
    gaugeAriaNot: (domain) => `${domain}: not assessed today`,
};
/** What each pole means to an area, as the thing the day leans toward. Closed: nothing else is ever said. */
const POLE_CLAUSE = {
    'mind-focus': {
        narrow: 'close, steady attention', wide: 'keeping thinking open and wide-ranging',
        'keep-open': 'holding a decision open a little longer', commit: 'settling on a decision',
    },
    'career-purpose': {
        begin: 'starting something', finish: 'finishing and closing off what is open',
        commit: 'following a direction through', 'urgent:momentum': 'putting energy behind effort',
    },
    'love-connection': {
        outward: 'reaching toward other people', speak: 'saying things aloud', listen: 'listening before answering',
        open: 'feelings close to the surface', contained: 'feelings kept close',
    },
    'health-recovery': {
        unhurried: 'a slower, steadier pace', inward: 'quieter, more inward time',
        'urgent:momentum': 'energy running higher than usual', 'urgent:pressure': 'some pressure on the pace',
    },
    'money-resources': {},
};
/** Energy that is high AND pressured is one thought, said once, so the row cannot say "energy to use" beside "pressure". */
const HIGH_AND_PRESSURED = 'energy that runs high, with some pressure on the pace';
const NOT_ASSESSED_TEXT = {
    'no-daily-signal': [
        'There is no reliable way to read this area from a single day: the Forecast reads material priorities and practical resources over a month or a year, so nothing is shown here rather than a guess.',
        'The Month and Year views carry the longer reading.',
    ],
    'faint-evidence-only': [
        'Nothing specific to this area stands out today: only faint hints, such as the Moon’s background colour, and none of them makes it a theme of the day.',
        'That does not mean the area matters little; it means today gives nothing specific to read.',
    ],
    'no-evidence': [
        'Nothing in today’s evidence bears on this area, so it is not assessed.',
        'Not assessed does not mean low, and it does not mean the area goes badly.',
    ],
};
const TONE_SENTENCE = {
    easing: 'What shapes it mostly comes with ease.',
    pressing: 'Most of what shapes it comes with some friction, so it asks for care more than momentum.',
    mixed: 'What shapes it does not all come one way, so the day holds both ease and friction here.',
};
const joinAnd = (parts) => parts.join(' and ');
/** Two things an area can lean on that pull against each other: said "alongside", so the sentence does not claim one thought. */
const OPPOSED = [
    ['narrow', 'wide'], ['commit', 'keep-open'], ['begin', 'finish'], ['open', 'contained'], ['speak', 'listen'],
    ['unhurried', 'urgent:momentum'], ['unhurried', 'urgent:pressure'], ['inward', 'urgent:momentum'], ['inward', 'urgent:pressure'],
];
const opposed = (a, b) => OPPOSED.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
/** The pole keys a fact presses on in an area, primary first: the same reading the model made, so the sentence says what the number did. */
function keysInArea(fact, id) {
    const ordered = [...fact.effects].sort((left, right) => (left.weight === right.weight ? 0 : left.weight === 'primary' ? -1 : 1));
    const keys = [];
    for (const effect of ordered) {
        if (effect.pole === 'urgent') {
            if ((fact.provenance.quality === 'hard' ? DAY_LIFE_PRESSURE_SHARES : DAY_LIFE_MOMENTUM_SHARES)[id])
                keys.push(fact.provenance.quality === 'hard' ? 'urgent:pressure' : 'urgent:momentum');
        }
        else if ((DAY_LIFE_POLE_SHARES[effect.pole]?.[id] ?? 0) > 0)
            keys.push(effect.pole);
    }
    return keys;
}
function influenceSentence(fact, id, reconciled, alreadyExplained) {
    const pv = fact.provenance;
    let key = null;
    switch (fact.mechanism) {
        case 'fast-transit-aspect':
        case 'moon-transit-aspect':
            key = {
                type: 'contact', body: String(pv.transitingBody), natal: String(pv.natalBody),
                quality: String(pv.quality),
            };
            break;
        case 'moon-phase': {
            const kind = PHASE_KIND[String(pv.phase)];
            key = kind ? { type: 'phase', kind } : null;
            break;
        }
        case 'moon-sign':
            key = { type: 'element', element: String(pv.element) };
            break;
        case 'moon-house':
            key = { type: 'house', house: Number(pv.house) };
            break;
        case 'personal-day': {
            /* Said as what the number points toward HERE. Its whole theme (an 8 is "results, money matters and taking charge") is the
               reading's to say once, and repeated under four areas it would bleed into ones it has nothing to say about. */
            const number = Number(pv.number);
            const keys = keysInArea(fact, id);
            /* Where energy and pressure are already said as one thought, the number does not say half of it again. */
            if (reconciled && keys.some((key) => key === 'urgent:momentum' || key === 'urgent:pressure'))
                return null;
            const clause = keys.filter((key) => !alreadyExplained.has(key)).map((key) => POLE_CLAUSE[id][key]).find((phrase) => Boolean(phrase));
            return Number.isInteger(number) && clause ? `The day’s number, ${number}, points toward ${clause}.` : null;
        }
        default: key = null;
    }
    try {
        return key ? skySentence(key) : null;
    }
    catch {
        return null;
    }
}
export function dayLifeCardOf(forecast, options = {}) {
    const isToday = options.isToday ?? true;
    const life = buildDayLifeDynamics(forecast);
    const byId = new Map(forecast.facts.facts.map((fact) => [fact.id, fact]));
    const dropped = [];
    const sayDay = (text) => (isToday
        ? text
        : text.replace(/\bToday’s\b/g, 'This day’s').replace(/\bToday\b/g, 'This day').replace(/\btoday\b/g, 'this day'));
    const rows = life.rows.map((row) => {
        const label = LIFE_LABEL[row.id];
        const safe = (kind, raw) => {
            const text = sayDay(raw);
            const violations = auditForecastText(text);
            if (violations.length === 0)
                return text;
            dropped.push({ id: row.id, kind, violations });
            return null;
        };
        const lines = [];
        const add = (kindLabel, kind, parts, basis) => {
            const text = parts.filter((part) => part !== null && part !== '').map((part) => safe(kind, part))
                .filter((part) => part !== null).join(' ');
            if (text)
                lines.push({ label: kindLabel, text, kind, basis });
        };
        if (!row.assessed) {
            add('Why not assessed', 'not-assessed', NOT_ASSESSED_TEXT[row.reason ?? 'no-evidence'], row.basis);
            return {
                id: row.id, label, helper: LIFE_HELPER[row.id], assessed: false, level: null, state: NOT_ASSESSED, tag: null,
                gaugeAria: DAY_LIFE_COPY.gaugeAriaNot(label), explanation: lines, basis: row.basis, row,
            };
        }
        const triggerOnly = { ...row.basis, background: [] };
        /* The why: what the day leans toward here, then the real influences behind it. */
        const clauses = POLE_CLAUSE[row.id];
        const keys = row.poles.map((entry) => entry.key);
        let phrases;
        let pair = [];
        const reconciledHealth = row.id === 'health-recovery' && keys.includes('urgent:momentum') && keys.includes('urgent:pressure');
        if (reconciledHealth) {
            phrases = [HIGH_AND_PRESSURED, ...keys.filter((key) => key !== 'urgent:momentum' && key !== 'urgent:pressure').slice(0, 1).map((key) => clauses[key]).filter((phrase) => Boolean(phrase))];
        }
        else {
            const named = keys.filter((key) => Boolean(clauses[key])).slice(0, 2);
            phrases = named.map((key) => clauses[key]);
            pair = named;
        }
        const why = phrases.length > 0
            ? (pair.length === 2 && opposed(pair[0], pair[1]) ? `It rests on ${phrases[0]}, alongside ${phrases[1]}.` : `It rests on ${joinAnd(phrases)}.`)
            : `The day’s main reading suggests ${joinAnd(row.activities.map((activity) => TITLE_PHRASE[activity]))}, which belongs here.`;
        /* The lead already names these semantic poles. If the personal-day number contributes only an
           already-named pole, omit that duplicate. Preserve any different pole that it actually adds.
           Comparing finished English sentences here would make meaning depend on wording. */
        const alreadyExplained = new Set(reconciledHealth
            ? ['urgent:momentum', 'urgent:pressure', ...keys.filter((key) => key !== 'urgent:momentum' && key !== 'urgent:pressure' && Boolean(clauses[key])).slice(0, 1)]
            : pair);
        const influences = row.basis.triggers
            .map((ref) => byId.get(ref.id)).filter((fact) => fact !== undefined)
            .map((fact) => influenceSentence(fact, row.id, reconciledHealth, alreadyExplained)).filter((sentence) => sentence !== null)
            .filter((sentence, index, all) => all.indexOf(sentence) === index).slice(0, 2);
        add('Why today', 'why', [why, ...influences], triggerOnly);
        /* The longer stretch: context only. It never made the level. */
        if (row.background) {
            const theme = row.background.theme;
            add('Longer stretch', 'context', [row.background.relation === 'reinforces'
                    ? `The longer stretch you are in, which is about ${theme}, leans the same way.`
                    : `The longer stretch you are in, which is about ${theme}, leans the other way, so today runs a little against it.`], row.basis);
        }
        /* Aligned or in tension: said, never averaged into a level. */
        const together = [];
        if (row.tension)
            together.push(TENSION_PULL[row.tension]);
        if (row.tone === 'easing' || row.tone === 'pressing' || row.tone === 'mixed')
            together.push(TONE_SENTENCE[row.tone]);
        add('Together', 'together', together, triggerOnly);
        /* In practice: only what the plan itself names. No advice is made up for an area. */
        add('In practice', 'practical', [row.activities.length > 0
                ? `Today suits ${joinAnd(row.activities.map((activity) => TITLE_PHRASE[activity]))}.`
                : 'The main reading above carries today’s practical advice; nothing more specific is suggested for this area.'], row.basis);
        const level = row.level ?? 1;
        const state = DAY_LIFE_LEVEL_WORD[level];
        const tag = row.tension ? DAY_LIFE_COPY.tagTension
            : row.tone === 'mixed' ? DAY_LIFE_COPY.tagMixed
                : row.tone === 'pressing' ? DAY_LIFE_COPY.tagFriction : null;
        return {
            id: row.id, label, helper: LIFE_HELPER[row.id], assessed: true, level, state, tag,
            gaugeAria: DAY_LIFE_COPY.gaugeAria(label, state, level), explanation: lines, basis: row.basis, row,
        };
    });
    return {
        title: isToday ? DAY_LIFE_COPY.titleToday : DAY_LIFE_COPY.titleOther,
        subtitle: DAY_LIFE_COPY.subtitle,
        note: sayDay(DAY_LIFE_COPY.note),
        rows, dropped,
    };
}
/** Every authored string, for the tests that audit the vocabulary. */
export const DAY_LIFE_VOCABULARY = [
    ...Object.values(DAY_LIFE_LEVEL_WORD), NOT_ASSESSED, DAY_LIFE_COPY.titleToday, DAY_LIFE_COPY.titleOther, DAY_LIFE_COPY.subtitle,
    DAY_LIFE_COPY.note, DAY_LIFE_COPY.hint, DAY_LIFE_COPY.tagMixed, DAY_LIFE_COPY.tagFriction, DAY_LIFE_COPY.tagTension,
    ...Object.values(NOT_ASSESSED_TEXT).flat(), ...Object.values(TONE_SENTENCE), HIGH_AND_PRESSURED,
    ...Object.values(POLE_CLAUSE).flatMap((clauses) => Object.values(clauses)),
    ...DAY_LIFE_ORDER.map((id) => LIFE_LABEL[id]),
];
