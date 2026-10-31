import { TITLE_PHRASE } from './dayAdviceEnglish.js';
import { skySentence } from './dayInterpretationEnglish.js';
import { BODY_SUBJECT, HOUSE_THEME, NATAL_OBJECT, OWN_PLACE_STATE, TOUCH_STATE } from './dayStoryVoice.js';
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
    note: 'Each theme is placed on a scale from Subtle up to Central theme by where today’s own evidence puts the emphasis, not by how things turn out. “Not assessed” means today gives nothing specific to read there, which is not a low emphasis. Tap a theme to see why.',
    hint: 'Why this?',
    /** The row's small tag when the influences behind it do not all come the same way. */
    tagMixed: 'with mixed signals',
    tagFriction: 'with friction',
    tagTension: 'with two pulls',
    gaugeAria: (domain, state, level) => `${domain}: ${state.toLowerCase()} emphasis today, ${level} of 5`,
    gaugeAriaNot: (domain) => `${domain}: not assessed today`,
};
/** What each pole means to an area, as the thing the day leans toward. Closed: nothing else is ever said. */
const POLE_CLAUSE = {
    'mind-focus': {
        narrow: 'close, steady attention', wide: 'letting your thinking range widely',
        'keep-open': 'holding a decision open a little longer', commit: 'settling on a decision',
    },
    'career-purpose': {
        begin: 'starting something', finish: 'closing off what is open',
        commit: 'following a direction through', 'urgent:momentum': 'putting energy behind effort',
    },
    'love-connection': {
        outward: 'reaching out to other people', speak: 'saying things aloud', listen: 'listening before answering',
        open: 'feelings close to the surface', contained: 'feelings kept close',
    },
    'health-recovery': {
        unhurried: 'a slower, steadier pace', inward: 'quieter, more inward time',
        'urgent:momentum': 'energy running higher than usual', 'urgent:pressure': 'a pace under some pressure',
    },
    'money-resources': {},
};
/** Energy that is high AND pressured is one thought, said once, so the row cannot say "energy to use" beside "pressure". */
const HIGH_AND_PRESSURED = 'energy that runs high, with some pressure on the pace';
/* An area the plan names no activity for has NO practical line: the day's own advice stands, nothing is invented for the area, and an empty row is not printed
   ("Nothing specific to add here" 21 times in the corpus was filler). */
/**
 * WHICH PART OF THE LONGER STRETCH A ROW LEANS ON, by its source. Each area is set against the background influence that bears on
 * its own lead, so two areas of one day can name two different parts of the stretch; saying which keeps that from reading as one
 * period described in two ways. Closed: a source not listed here is called "The longer stretch".
 */
function stretchSourceOf(fact) {
    if (!fact)
        return 'The longer stretch';
    const pv = fact.provenance;
    switch (fact.mechanism) {
        case 'personal-year': return `Your Personal Year ${Number(pv.number)}`;
        case 'personal-month': return `Your Personal Month ${Number(pv.number)}`;
        case 'annual-pillar': return 'This year’s BaZi pillar';
        case 'luck-pillar': return 'Your ten-year BaZi cycle';
        case 'slow-transit-aspect': return `${String(pv.transitingBody)}’s long contact with your ${String(pv.natalBody)}`;
        case 'sun-season': return `The Sun’s season in ${String(pv.sign)}`;
        default: return 'The longer stretch';
    }
}
/* One short line each. What "not assessed" means (not low, not a bad sign) is said once, in the note under the card. */
const NOT_ASSESSED_TEXT = {
    'no-daily-signal': (area) => [`Read ${area} in the Month and Year views; one day says too little.`],
    /* Named by what reaches the area, or left unsaid: "faint hints, such as the Moon’s general tone" was the same sentence under any area for any day (20 of 50 cases). */
    'faint-evidence-only': (area, names, count = 1) => (names ? [`Only ${names} ${count > 1 ? 'bear' : 'bears'} on ${area} today, and too faintly to count as a theme.`] : [`Nothing strong enough bears on ${area} today to count as a theme.`]),
    'no-evidence': (area) => [`Nothing in today’s evidence bears on ${area}.`],
};
/** A day's influence said as a short noun phrase, for naming what faintly reaches an area. Null for a mechanism nothing is written for. */
function hintName(fact) {
    const pv = fact.provenance;
    switch (fact.mechanism) {
        case 'moon-phase': return PHASE_KIND[String(pv.phase)] ? `the ${String(pv.phase).toLowerCase()} Moon` : null;
        case 'moon-sign': return { Fire: 'a fire-sign Moon', Earth: 'an earth-sign Moon', Air: 'an air-sign Moon', Water: 'a water-sign Moon' }[String(pv.element)] ?? null;
        case 'moon-house': return 'the Moon’s place in your chart';
        case 'personal-day': return Number.isInteger(Number(pv.number)) ? `Personal Day ${Number(pv.number)}` : null;
        case 'fast-transit-aspect':
        case 'moon-transit-aspect': {
            const body = String(pv.transitingBody);
            const natal = String(pv.natalBody);
            return BODY_SUBJECT[body] && NATAL_OBJECT[natal] ? `${BODY_SUBJECT[body].replace(/^The /, 'the ')}’s contact with ${NATAL_OBJECT[natal].name}` : null;
        }
        default: return null;
    }
}
/** The area as a sentence names it: money has its own words, the others are their card titles. */
const areaWords = (id) => (id === 'money-resources' ? 'money and resources' : LIFE_LABEL[id]);
/* Said the first time a tone comes up on a screen, and by the contacts that give it: "Most of today’s influences here are tense ones, so go carefully rather than fast" was the same
   sentence under any area for any day (24 of 50 cases) and named nothing. The row's tag carries the tone after that. The unnamed forms are the fallback for a row whose contacts cannot be named. */
const TONE_SENTENCE = {
    easing: ['The contacts behind this area are mostly easy ones.'],
    pressing: ['The contacts behind this area are mostly tense ones.'],
    mixed: ['The contacts behind this area are a mix of easy and tense ones.'],
};
const toneLine = (tone, easy, tense) => {
    const are = (list) => (list.length > 1 ? 'contacts here are' : 'contact here is');
    if (tone === 'easing' && easy.length > 0)
        return `The easy ${are(easy)} ${joinAnd(easy)}.`;
    if (tone === 'pressing' && tense.length > 0)
        return `The tense ${are(tense)} ${joinAnd(tense)}.`;
    if (tone === 'mixed' && easy.length > 0 && tense.length > 0)
        return `The easy ${easy.length > 1 ? 'ones' : 'one'} ${easy.length > 1 ? 'are' : 'is'} ${joinAnd(easy)}; the tense ${tense.length > 1 ? 'ones' : 'one'} ${tense.length > 1 ? 'are' : 'is'} ${joinAnd(tense)}.`;
    return TONE_SENTENCE[tone][0];
};
/* What a pull between two of the day's own influences is, as the area's card says it the first time on a screen. The Day plan says the same pull in its own words
   (TENSION_PULL), and a card that repeated those sentences verbatim made the screen say each of them two or three times. */
const ROW_PULL = {
    'begin-vs-hold': 'Momentum to begin runs ahead of clarity to commit.',
    'decide-vs-friction': 'Settling things may be harder when exchanges run hot.',
    'speak-vs-friction': 'What you say may land harder than intended.',
    'axis:pace': 'Part of the day pushes forward while another part asks for a slower pace.',
    'axis:focus': 'Attention pulls toward range at one moment and depth at the next.',
    'axis:contact': 'The wish for company and the wish for quiet pull against each other.',
    'axis:feeling': 'Feeling may be close to the surface at some hours and out of reach at others.',
    'axis:motion': 'Starting new things and closing old ones compete for the day.',
    'axis:commitment': 'Part of you wants to decide, and part wants to wait.',
    'axis:friction': 'Some exchanges may run smoothly while others catch.',
    'axis:expression': 'You may have something to say, and just as much reason to listen first.',
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
/**
 * ONE INFLUENCE, SAID AS WHAT IT DOES FOR THIS AREA.
 *
 * The first version printed the contact's whole sentence under every area its effects reached, so the Moon's contact with Mercury was explained under Mind & Focus
 * in words about mood, and the same sentence stood under Love & Connection too: a reason that said nothing about the card it sat in, and the same sentence twice. Now a
 * contact or a cycle number is named and tied to the pole it presses on in THIS area (keysInArea, the model's own mapping), so the sentence can only say what is
 * relevant here; a pole the card has already said is not said again ("supports this" instead). Nothing is added: the poles are the ones the area was built from.
 */
/** How a sentence that adds no new pole ends. Used by the card to say it once, after the sentences that do add something. */
const SUPPORT_TAIL = 'supports this.';
/** A tense contact that adds to a lean the area has already said: it adds push, it does not "support". Both tails are the "agrees with the lean" kind. */
const supportSentence = (sentence) => /, which (supports this|adds push toward .+|adds to the strain)\.$/.test(sentence);
const PUSH_TAIL = (clause) => `adds push toward ${clause}.`;
function leanTail(quality, id, keys, urgentOnly) {
    if (quality !== 'hard')
        return SUPPORT_TAIL;
    if (urgentOnly)
        return 'adds to the strain.';
    const key = keys.find((entry) => Boolean(POLE_CLAUSE[id][entry]));
    return key ? PUSH_TAIL(POLE_CLAUSE[id][key]) : 'adds to this.';
}
function influenceSentence(fact, id, reconciled, alreadyExplained) {
    const pv = fact.provenance;
    let key = null;
    switch (fact.mechanism) {
        case 'fast-transit-aspect':
        case 'moon-transit-aspect': {
            const body = String(pv.transitingBody);
            const natal = String(pv.natalBody);
            const quality = String(pv.quality);
            if (!BODY_SUBJECT[body] || !NATAL_OBJECT[natal] || !TOUCH_STATE[quality])
                return null;
            const source = `${BODY_SUBJECT[body]} ${body === natal ? OWN_PLACE_STATE(quality, body) : `${TOUCH_STATE[quality]} ${NATAL_OBJECT[natal].name}`}`;
            const keys = keysInArea(fact, id);
            if (reconciled && keys.some((entry) => entry === 'urgent:momentum' || entry === 'urgent:pressure')) {
                return keys.every((entry) => alreadyExplained.has(entry)) ? `${source}, which ${leanTail(quality, id, keys, true)}` : null;
            }
            const fresh = keys.find((entry) => !alreadyExplained.has(entry) && Boolean(POLE_CLAUSE[id][entry]));
            if (fresh) {
                alreadyExplained.add(fresh);
                return `${source}, which points toward ${POLE_CLAUSE[id][fresh]}.`;
            }
            return keys.some((entry) => Boolean(POLE_CLAUSE[id][entry])) ? `${source}, which ${leanTail(quality, id, keys, false)}` : null;
        }
        case 'moon-phase': {
            const kind = PHASE_KIND[String(pv.phase)];
            key = kind ? { type: 'phase', kind } : null;
            break;
        }
        case 'moon-sign':
            key = { type: 'element', element: String(pv.element) };
            break;
        case 'moon-house': {
            /* The full sentence belongs to "In the sky", on the same screen; the card says the short version of the same fact. */
            const theme = HOUSE_THEME[Number(pv.house)];
            return theme ? `The Moon’s place in your chart brings ${theme} closer to mind.` : null;
        }
        case 'personal-day': {
            /* Said as what the number points toward HERE. Its whole theme (an 8 is "results, money matters and taking charge") is the
               reading's to say once, and repeated under four areas it would bleed into ones it has nothing to say about. */
            const number = Number(pv.number);
            const keys = keysInArea(fact, id);
            /* Where energy and pressure are already said as one thought, the number does not say half of it again. */
            if (reconciled && keys.some((key) => key === 'urgent:momentum' || key === 'urgent:pressure'))
                return null;
            const fresh = keys.find((entry) => !alreadyExplained.has(entry) && Boolean(POLE_CLAUSE[id][entry]));
            if (!Number.isInteger(number))
                return null;
            if (fresh) {
                alreadyExplained.add(fresh);
                return `Personal Day ${number} favours ${POLE_CLAUSE[id][fresh]}.`;
            }
            /* A number that only agrees with what the row has just said is not said again: the Personal Day has one owner on the screen (the opening and "In the numbers"). */
            return null;
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
    /* What the screen has already said, so no sentence stands under two cards: the sentences themselves, the pulls, the tones. */
    const said = new Set();
    const pullsSaid = new Set();
    const tonesSaid = new Map();
    const sourcesSaid = new Set();
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
                .filter((part) => part !== null && (kind === 'not-assessed' || kind === 'together' || !said.has(part))).map((part) => { said.add(part); return part; }).join(' ');
            if (text)
                lines.push({ label: kindLabel, text, kind, basis });
        };
        if (!row.assessed) {
            /* what faintly reaches the area: the day's own facts whose effects land here, heaviest first, at most two */
            const reaching = row.reason === 'faint-evidence-only'
                ? forecast.facts.facts.filter((fact) => keysInArea(fact, row.id).length > 0)
                    .map((fact) => hintName(fact)).filter((name, index, all) => name !== null && all.indexOf(name) === index).slice(0, 2)
                : [];
            add('Why not assessed', 'not-assessed', NOT_ASSESSED_TEXT[row.reason ?? 'no-evidence'](areaWords(row.id), joinAnd(reaching), reaching.length), row.basis);
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
        /* "The day leans toward", not "Today leans toward": the row's label already says "today", and the two read as a stutter. */
        const why = phrases.length > 0
            ? (pair.length === 2 && opposed(pair[0], pair[1]) ? `The day leans toward ${phrases[0]}, but also toward ${phrases[1]}.` : `The day leans toward ${phrases.join(', and toward ')}.`)
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
            .filter((sentence, index, all) => all.indexOf(sentence) === index)
            /* what adds a pole first; what only agrees with the lean last, and only once */
            .sort((left, right) => Number(supportSentence(left) || left.endsWith(SUPPORT_TAIL)) - Number(supportSentence(right) || right.endsWith(SUPPORT_TAIL)))
            .filter((sentence, index, all) => !(supportSentence(sentence) || sentence.endsWith(SUPPORT_TAIL))
            || all.findIndex((other) => supportSentence(other) || other.endsWith(SUPPORT_TAIL)) === index)
            .slice(0, 2);
        add(isToday ? 'Why today' : 'Why this day', 'why', [why, ...influences], triggerOnly);
        /* The longer stretch: context only. It never made the level. */
        /* A Personal Year or Month is the "In the numbers" and "wider picture" lines of the same screen, and the full context under them; a card line that restated how it stands to
           this area was the same fact a second time, so the card names only the longer stretches the screen does not. */
        const backgroundFact = row.background ? byId.get(row.background.factId) : undefined;
        const numberCycle = backgroundFact?.mechanism === 'personal-year' || backgroundFact?.mechanism === 'personal-month';
        if (row.background && !numberCycle) {
            const theme = row.background.theme;
            /* Named by its source, so two areas of one day that lean on different parts of the longer stretch do not read as one period described two ways. */
            const source = stretchSourceOf(byId.get(row.background.factId));
            /* Said as what it supports or runs against, in the area's own words: "points the same way" never said which way. */
            const leadPole = row.poles.find((entry) => entry.key !== 'urgent:momentum' && entry.key !== 'urgent:pressure');
            const leaning = leadPole ? clauses[leadPole.key] : undefined;
            /* The theme is said the first time a source comes up on the screen, and in a different frame on each date; a source a second row leans on is named without
               repeating its theme. */
            const reinforces = row.background.relation === 'reinforces';
            const repeated = sourcesSaid.has(source);
            sourcesSaid.add(source);
            const iso = forecast.facts.localDay.iso;
            const frame = (Number(iso.slice(5, 7)) + Number(iso.slice(8, 10))) % 3;
            const against = leaning ? `which runs against today’s pull toward ${leaning}` : 'which runs against today’s lean here';
            let line;
            if (repeated) {
                line = reinforces
                    ? (leaning ? `${source} supports ${leaning}.` : `${source} leans the same way as today.`)
                    : (leaning ? `${source} runs against today’s pull toward ${leaning}.` : `${source} runs against today’s lean here.`);
            }
            else if (reinforces) {
                const lean = leaning ? `, ${['which supports', 'and that backs', 'which fits'][frame]} ${leaning}` : ', and it leans the same way as today';
                line = `${source} ${['is about', 'brings', 'leans toward'][frame]} ${theme}${lean}.`;
            }
            else {
                const way = leaning
                    ? [against, `which cuts across today’s pull toward ${leaning}`, `which sits against today’s pull toward ${leaning}`][frame]
                    : against;
                line = `${source} ${['is about', 'brings', 'leans toward'][frame]} ${theme}, ${way}.`;
            }
            add('Wider picture', 'context', [line], row.basis);
        }
        /* Aligned or in tension: said, never averaged into a level. */
        const together = [];
        /* The pull itself is said once on the screen, under "What needs more care", and the row's tag marks that it runs through the area; a card line that said the
           pull a second time (or "the same pull applies to ...") was an echo. The tone is said in full the first time it comes up and not again: the tag carries it. */
        if (row.tension)
            pullsSaid.add(row.tension);
        if (row.tone === 'easing' || row.tone === 'pressing' || row.tone === 'mixed') {
            /* The tone is the row's tag and the contacts it names above ("... which adds to the strain"). A sentence that only says "most influences here are easy/tense" is a restatement; it is
               said, once per screen, only when the row names no contact at all, and then it says which contacts. */
            const times = tonesSaid.get(row.tone) ?? 0;
            tonesSaid.set(row.tone, times + 1);
            if (times === 0) {
                const contacts = row.basis.triggers.map((ref) => byId.get(ref.id))
                    .filter((fact) => fact !== undefined && (fact.mechanism === 'fast-transit-aspect' || fact.mechanism === 'moon-transit-aspect'));
                const named = (tense) => contacts.filter((fact) => (fact.provenance.quality === 'hard') === tense).map((fact) => hintName(fact))
                    .filter((name, index, all) => name !== null && all.indexOf(name) === index).slice(0, 2);
                together.push(toneLine(row.tone, named(false), named(true)));
            }
        }
        add('Together', 'together', together, triggerOnly);
        /* In practice: only what the plan itself names. No advice is made up for an area. */
        if (row.activities.length > 0)
            add('In practice', 'practical', [`Today suits ${joinAnd(row.activities.map((activity) => TITLE_PHRASE[activity]))}.`], row.basis);
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
    ...Object.values(NOT_ASSESSED_TEXT).flatMap((say) => DAY_LIFE_ORDER.map((id) => say(areaWords(id))).flat()), ...Object.values(TONE_SENTENCE).flat(), ...Object.values(ROW_PULL), HIGH_AND_PRESSURED,
    ...Object.values(POLE_CLAUSE).flatMap((clauses) => Object.values(clauses)),
    ...DAY_LIFE_ORDER.map((id) => LIFE_LABEL[id]),
];
