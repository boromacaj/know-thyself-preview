import { ACTIVITY_LABEL, CONTRAST_PHRASE, } from './dayPlanEnglish.js?v=d9f39e7';
import { buildAdviceModel, mergeBasis, } from './dayAdvice.js?v=d9f39e7';
import { evidenceAudit, needsOfActivity, promotionsOf, topicSupportOf } from './dayComposition.js?v=d9f39e7';
import { buildInterpretation } from './dayInterpretation.js?v=d9f39e7';
import { CONTACT_VOCABULARY, numbersDepths, numbersParts, } from './dayInterpretationEnglish.js?v=d9f39e7';
import { auditForecastText } from './forecastSafety.js?v=d9f39e7';
import { STANCE_PHRASE } from './dayPlanEnglish.js?v=d9f39e7';
import { buildDayStory } from './dayStory.js?v=d9f39e7';
import { Ledger, careOf, climateOf, easierOf, moveOf, openingOf, skyOf, titleOf, } from './dayStoryEnglish.js?v=d9f39e7';
import { AVOID_CARE, EASIER_RECONCILED, PRESSURE_LINE, PRESSURE_TITLE, QUIETER_CLAUSE, QUIET_LINE, QUIET_TITLE, RECONCILED_RELIANCE, RISING_PHRASE, TENSION_HEADLINE, WATCH_CARE, becauseLines, opposedLean, storyVocabulary, } from './dayStoryVoice.js?v=d9f39e7';
export { AVOID_CARE, EASIER_RECONCILED, PRESSURE_LINE, PRESSURE_TITLE, QUIET_LINE, QUIET_TITLE, RECONCILED_RELIANCE };
/*
 * THE ADVICE CARD, IN ENGLISH.
 *
 * Same discipline as dayPlanEnglish: every string is chosen by a member of a closed
 * vocabulary that the model (dayAdvice) already decided. Nothing is chosen by date,
 * by rotation, or to fill a section; the same forecast always reads the same, on any
 * machine, with no clock and no random choice.
 *
 * HOW THE CARD IS WRITTEN (P1.6)
 * The card used to be assembled section by section, each section looking up its own
 * sentence from its own table and none knowing what another had said. It is now
 * written from one DayStory (dayStory.ts): the theme of the day, how the sky's
 * contacts stand to each other, and the propositions each section makes, with the
 * words in dayStoryEnglish.ts and dayStoryVoice.ts. A ledger of claims lets each
 * section see what the others have put in words, so the sky explains a friction once,
 * the climate does not announce what the sky has described, and a setting that has
 * nothing to do with the day is left out. Nothing here adds evidence: the plan, the
 * advice model and the interpretation are exactly as they were.
 *
 * WHAT THIS FILE IS FOR, THAT dayPlanEnglish IS NOT
 *   - a title that is the day's character, not a section label: "A day for focused
 *     work", "A day to decide only your own part";
 *   - a sentence that says what pulls, once, and a way through that is said once;
 *   - one thought for the emotional climate, not a list of feelings;
 *   - care lines that are whole sentences, so that "avoid forcing", "watch for" and
 *     "don't rely on" can sit under one heading without three grammars;
 *   - a reconciled sentence where two plan items would have said opposite things.
 *
 * A day "may suit" or "can" - never "will". The engine's words do not appear. The
 * safety guard runs on every sentence here; a refused sentence is dropped and
 * recorded, and the section is shorter, never padded.
 */
/* ---------------------------------------------------------------- headings -- */
export const ADVICE_HEADINGS = {
    kickerToday: 'Today',
    kickerOther: 'This day',
    easier: 'What may come easier',
    care: 'What needs more care',
    emotionalClimate: 'Emotional climate',
    goodUse: 'Other good uses of the day',
    move: 'One useful move',
    basis: 'Why this?',
    basisToday: 'Today’s own influences',
    basisBackground: 'The longer stretch behind it',
    basisPerPart: 'Behind each part',
    basisWithheld: 'Not used, and why',
    longerStretch: 'The longer stretch behind today',
    longerStretchNote: 'The period around the day: its themes and what it is made of. It describes the period, not a rating of today.',
    readingNumbers: 'In the numbers',
    readingSky: 'In the sky',
    readingStretch: 'In the longer stretch',
    basisReading: 'The reading',
    /* P1.6.5: the daily view keeps the year and the month one disclosure away. */
    contextNumbers: 'Year and month',
    contextStretchOnly: 'The longer stretch',
    birthTimeUnknown: 'Birth time: not on record',
    birthTimeApproximate: 'Birth time: approximate',
    birthTimeMore: 'what this leaves out',
    birthTimeLeftOut: 'Left out',
};
export const SECTION_HEADING = {
    easier: ADVICE_HEADINGS.easier,
    care: ADVICE_HEADINGS.care,
    emotionalClimate: ADVICE_HEADINGS.emotionalClimate,
    goodUse: ADVICE_HEADINGS.goodUse,
    move: ADVICE_HEADINGS.move,
};
/* ------------------------------------------------------------------ title -- */
/** What an activity is, as part of "A day for ...". Short on purpose: two of them must fit a phone's headline. Kept for the Life Dynamics explanations. */
export const TITLE_PHRASE = {
    'deep-work': 'focused work',
    'editing-and-review': 'refining what exists',
    brainstorming: 'open-ended thinking',
    planning: 'planning ahead',
    administration: 'clearing loose ends',
    'difficult-conversation': 'straight talk',
    'social-connection': 'time with people',
    'creative-exploration': 'creative exploration',
    'finishing-work': 'finishing things off',
    'starting-work': 'a fresh start',
    'physical-activity': 'physical activity',
    rest: 'rest',
    research: 'looking into things',
    negotiation: 'reaching agreement',
    'cleanup-organisation': 'putting things in order',
};
/** When two influences pull against each other and nothing else leads, the title says what to do about it. */
export const TENSION_TITLE = TENSION_HEADLINE;
const FALLBACK_TITLE = 'A day to take as it comes';
/** What pulls, said once. The way through is a different sentence (TENSION_LEAN or the move), so it is never said twice. Kept for the Life Dynamics explanations. */
export const TENSION_PULL = {
    'begin-vs-hold': 'There is more momentum to begin than clarity to commit.',
    'decide-vs-friction': 'The push to settle things may meet exchanges that run hot.',
    'speak-vs-friction': 'There may be plenty to say, and it may land harder than intended.',
    'axis:pace': 'One part of the day pushes forward and another asks to slow down.',
    'axis:focus': 'Attention pulls toward range and toward depth.',
    'axis:contact': 'Company and quiet pull against each other.',
    'axis:feeling': 'Feeling may sit close to the surface in some hours and out of reach in others.',
    'axis:motion': 'Starting and closing pull against each other.',
    'axis:commitment': 'Deciding and waiting pull against each other.',
    'axis:friction': 'Some exchanges may go easily while others catch.',
    'axis:expression': 'There may be something to say, and just as much reason to listen first.',
};
/* ----------------------------------------------------------------- the care -- */
export const PITFALL_PHRASE = {
    'crossed-wires': 'messages landing differently from how they were meant',
    'sharp-edges': 'sharp words, or a short fuse',
    'taking-things-personally': 'taking passing remarks personally',
    'wobbly-preferences': 'changing your mind about what you want',
    'proving-a-point': 'a pull to prove a point that does not need proving',
};
/* ------------------------------------------------------------- the feelings -- */
export const RISING_NOUN = {
    sensitivity: 'sensitivity to tone',
    impatience: 'impatience',
    irritability: 'a shorter fuse',
    restlessness: 'restlessness',
    warmth: 'warmth toward the people around you',
    reflectiveness: 'a quiet, reflective mood',
    wistfulness: 'a wistful, looking-back mood',
    'self-assurance': 'self-assurance',
};
export const QUIETER_NOUN = {
    patience: 'patience',
    'emotional-distance': 'stepping back from a mood',
    'access-to-feelings': 'putting words to what you feel',
    'appetite-for-company': 'reaching out for company',
    spontaneity: 'being spontaneous',
    'staying-power': 'staying with a long task',
};
/* ---------------------------------------------------------------- the notes -- */
export const BIRTH_TIME_NOTE = {
    approximate: 'The birth time is approximate, so the finer detail that depends on it is left out.',
    unknown: 'There is no birth time on record, so the finer detail that depends on it is left out.',
};
/**
 * The longer stretch, claimed only as far as the model found a quality it really shares with (or sets against) the day.
 * "That sits with" points back at something the reader has just been told: it is said only when the opening has named that very lean.
 */
function backgroundSentence(glance, named = new Set(), titled = new Set()) {
    const background = glance.background;
    if (!background)
        return null;
    const quality = background.pole ? STANCE_PHRASE[background.pole] : '';
    /* The headline's "why" has just said this lean: the longer stretch is said to sit with it, not to repeat it. */
    if (background.relation === 'reinforces' && quality && background.pole && named.has(background.pole)) {
        return `That fits the longer stretch you are in, which is about ${background.theme}.`;
    }
    if (background.relation === 'reinforces' && quality) {
        /* No "also": it points back at something said, and what was said (the headline, the opening) is rarely this lean in these words; the longer stretch simply favours it. */
        void titled;
        return `The longer stretch you are in is about ${background.theme}, and it favours ${quality}.`;
    }
    if (background.relation === 'opposes') {
        return quality
            ? `The longer stretch you are in is about ${background.theme}, but it leans the other way, toward ${quality}.`
            : `The longer stretch you are in is about ${background.theme}, and it pulls the other way.`;
    }
    return `The longer stretch you are in is about ${background.theme}.`;
}
export function adviceCardOf(forecast, options = {}) {
    const isToday = options.isToday ?? true;
    const model = buildAdviceModel(forecast);
    const dropped = [];
    const sayDay = (text) => (isToday
        ? text
        : text.replace(/\bToday\b/g, 'This day').replace(/\btoday\b/g, 'this day'));
    const safe = (slot, kind, raw) => {
        const text = sayDay(raw);
        const violations = auditForecastText(text);
        if (violations.length === 0)
            return text;
        dropped.push({ slot, kind, violations });
        return null;
    };
    const lines = (slot, items, kindOf, say, basisOf) => items.flatMap((item) => {
        const text = safe(slot, kindOf(item), say(item));
        return text ? [{ text, kind: kindOf(item), basis: basisOf(item) }] : [];
    });
    const glance = model.glance;
    /* P1.6.3: the contact the headline stands on is narrated whatever its rank (dayComposition.ts). Nothing the plan holds changes: only which of the day's facts the sky paragraph tells. */
    const first = buildInterpretation(forecast);
    const promoted = glance.headline === 'lead' ? promotionsOf(forecast, first, glance.lead) : [];
    const interpretation = promoted.length > 0 ? buildInterpretation(forecast, { promote: promoted.map((entry) => entry.id) }) : first;
    const story = buildDayStory(forecast, model, interpretation, promoted);
    const ledger = new Ledger();
    const title = safe('glance', 'title', titleOf(story.theme, story)) ?? FALLBACK_TITLE;
    const opening = openingOf(story, glance.basis, ledger, safe);
    /* The reading: the numbers (the legacy composer's own sentences), the sky as one paragraph, and where the day sits in the longer stretch. */
    const reading = [];
    const contextLines = [];
    let numbersDaily = null;
    let heldTuple = null;
    if (interpretation.numbers) {
        const startsSomething = glance.lead.includes('starting-work');
        const checked = numbersParts(interpretation.numbers.tuple, startsSomething)
            .flatMap((part) => { const text = safe('glance', 'reading:numbers', part.text); return text === null ? [] : [{ part, text }]; });
        if (checked.length > 0) {
            const canonical = { label: ADVICE_HEADINGS.readingNumbers, text: checked.map((entry) => entry.text).join(' '), kind: 'reading:numbers', basis: interpretation.numbers.basis };
            reading.push(canonical);
            /* THE DAILY DEPTH of the same sentences: the ones that speak for the day, under one orientation sentence; the year-and-month half goes to the disclosure. */
            const shown = checked.filter((entry) => entry.part.scales.includes('day'));
            const held = checked.filter((entry) => !entry.part.scales.includes('day'));
            if (held.length === 0 || shown.length === 0) {
                numbersDaily = canonical;
            }
            else {
                const orientation = safe('glance', 'reading:numbers-orientation', numbersDepths(interpretation.numbers.tuple, startsSomething).orientation ?? '');
                numbersDaily = {
                    label: ADVICE_HEADINGS.readingNumbers, kind: 'reading:numbers', basis: interpretation.numbers.basis,
                    text: [...(orientation ? [orientation] : []), ...shown.map((entry) => entry.text)].join(' '),
                };
                contextLines.push({ label: ADVICE_HEADINGS.contextNumbers, kind: 'reading:numbers-context', basis: interpretation.numbers.basis, text: held.map((entry) => entry.text).join(' ') });
                heldTuple = interpretation.numbers.tuple;
            }
        }
    }
    const sky = skyOf(story, interpretation, ledger, safe);
    if (sky)
        reading.push({ label: ADVICE_HEADINGS.readingSky, text: sky.text, kind: 'reading:sky', basis: sky.basis });
    /* The leans the opening has named: by the number-and-sky sentence ("bridge:") or by the sentence that says why the headline is the headline ("lead:"). */
    const named = new Set(ledger.sentences.filter((sentence) => sentence.section === 'opening').flatMap((sentence) => sentence.claims)
        .filter((claim) => claim.startsWith('bridge:') || claim.startsWith('lead:')).map((claim) => (claim.startsWith('lead:') ? claim.slice('lead:'.length) : claim.split(':')[2])));
    const titled = new Set([...story.theme.topics.flatMap((activity) => needsOfActivity(activity)), ...story.theme.stances]);
    const stretch = backgroundSentence(glance, named, titled);
    if (stretch && glance.background) {
        const text = safe('glance', 'reading:stretch', stretch);
        const fact = forecast.facts.facts.find((candidate) => candidate.id === glance.background.factId);
        if (text && fact) {
            const ref = { id: fact.id, pillar: fact.pillar, mechanism: fact.mechanism, role: fact.role, independenceGroup: fact.independenceGroup, label: fact.label, confidence: fact.reliability };
            reading.push({
                label: ADVICE_HEADINGS.readingStretch, text, kind: 'reading:stretch',
                basis: { triggers: [], background: [ref], tension: null, groups: [fact.independenceGroup], convergence: 'single-source' },
            });
        }
    }
    /* P1.6.5: the longer stretch stays on the day when it SAYS SOMETHING ABOUT THE DAY (the day's lean sits with it, or runs against it); a line that only names the period
       ("frames") is the period's own description, and rides with the year and the month. */
    const stretchLine = reading.find((line) => line.kind === 'reading:stretch') ?? null;
    const stretchRestates = stretchLine !== null && glance.background?.relation === 'frames';
    const dailyReading = reading.flatMap((line) => {
        if (line.kind === 'reading:numbers')
            return numbersDaily ? [numbersDaily] : [];
        if (line.kind === 'reading:stretch' && stretchRestates)
            return [];
        return [line];
    });
    if (stretchLine && stretchRestates)
        contextLines.push(stretchLine);
    const contextTitle = contextLines.length === 0 ? null
        : heldTuple ? `Year ${heldTuple.year} · Month ${heldTuple.month}: the full context`
            : ADVICE_HEADINGS.contextStretchOnly;
    const easier = easierOf(model.easier, story, ledger, safe);
    const care = careOf(model.care, story, ledger, safe);
    /* The influences the reading has explained so far: the numbers, the sky, the longer stretch. */
    const narrated = new Set([
        ...(interpretation.numbers?.basis.groups ?? []), ...(sky?.basis.groups ?? []), ...(glance.background ? [forecast.facts.facts.find((candidate) => candidate.id === glance.background.factId)?.independenceGroup ?? ''] : []),
    ]);
    const climate = climateOf(model, forecast.plan, narrated, ledger, safe, interpretation.numbers?.tuple.day ?? null);
    const move = moveOf(model, story, ledger, safe);
    /* P1.6.3: GOOD USE IS ONE SUITABLE APPLICATION, AND SAYS WHY WHERE THE READING DOES NOT. A label whose pole nothing the reader will read states (not the opening,
       not the longer stretch) but which a narrated contact presses at its primary weight gets one sentence, written for that activity, under the chips. */
    let goodUseNote = null;
    {
        const labels = model.goodUse.map((item) => item.activity);
        if (labels.length > 0) {
            const openingPoles = new Set(ledger.sentences.filter((sentence) => sentence.section === 'opening').flatMap((sentence) => sentence.claims.flatMap((claim) => {
                const match = /^(?:bridge:(?:agree|overlap|differ|number-led|numbers-only|tempered)|lead):(.+)$/.exec(claim);
                return match ? [match[1]] : [];
            })));
            const backgroundPole = glance.background?.relation === 'reinforces' && stretch ? glance.background.pole : null;
            const stated = new Set(labels.filter((activity) => needsOfActivity(activity).some((pole) => openingPoles.has(pole) || pole === backgroundPole)));
            /* A good use that asks for the opposite of what the headline leans on ("attention holds on detail" under a day for starting something new) is not explained: it is left as a label. */
            const headlineLeans = [...story.theme.anchors, ...story.support.flatMap((entry) => (entry.from ? [entry.from] : []))];
            const needed = topicSupportOf(forecast, interpretation, labels, stated, true)
                .filter((entry) => {
                const pole = entry.from;
                return pole !== null && entry.status === 'unsaid' && !headlineLeans.some((lean) => opposedLean(lean, pole));
            });
            const first = needed[0];
            const line = first ? becauseLines([{ topic: first.topic, from: first.from }])[0] : undefined;
            const text = line ? safe('goodUse', 'note', line.text) : null;
            if (line && text) {
                const drivers = needed.filter((entry) => line.topics.includes(entry.topic)).flatMap((entry) => entry.drivers.slice(0, 2));
                const seen = new Set();
                const triggers = drivers.filter((ref) => !seen.has(ref.id) && seen.add(ref.id));
                const groups = [...new Set(triggers.map((ref) => ref.independenceGroup))].sort();
                const basis = { triggers, background: [], tension: null, groups, convergence: new Set(triggers.map((ref) => ref.pillar)).size >= 2 ? 'cross-pillar' : groups.length >= 2 ? 'same-pillar' : 'single-source' };
                goodUseNote = { text, kind: 'goodUse:note', basis };
                ledger.add({ section: 'goodUse', text, claims: [...line.claims, 'goodUse:note'], basis, proposition: `goodUse:${line.topics[0]}` });
            }
        }
    }
    /* P1.6.3: THE EVIDENCE AUDIT. Which aspect triggers the sky paragraph did not narrate, and why: a recorded decision, never an accident of ordering. */
    const narratedIds = new Set(story.sky.contacts.map((contact) => contact.factId));
    const namedIds = new Set();
    for (const sentence of ledger.sentences) {
        for (const claim of sentence.claims) {
            const named = /^source:(\w+)>(\w+)$/.exec(claim);
            if (named)
                for (const contact of story.contactIndex.values())
                    if (contact.body === named[1] && contact.natal === named[2])
                        namedIds.add(contact.factId);
        }
    }
    const headlinePoles = new Set(story.theme.topics.flatMap((activity) => needsOfActivity(activity)));
    const narratedPoles = new Set(story.sky.contacts.flatMap((contact) => [...contact.poles]));
    const narratedGroups = new Map(story.sky.contacts.map((contact) => [contact.group, contact.poles]));
    const coverage = evidenceAudit(forecast, narratedIds, namedIds, headlinePoles, narratedPoles, [
        { where: 'headline', basis: glance.basis }, ...model.goodUse.map((item) => ({ where: 'goodUse', basis: item.basis })),
        ...model.care.map((item) => ({ where: 'care', basis: item.basis })), { where: 'move', basis: model.move?.basis },
    ], narratedGroups);
    const birthTime = forecast.facts.birthTime;
    const birthNote = birthTime === 'exact' ? null : BIRTH_TIME_NOTE[birthTime];
    const birthLabel = birthTime === 'unknown' ? ADVICE_HEADINGS.birthTimeUnknown : ADVICE_HEADINGS.birthTimeApproximate;
    const dailyBirthTime = birthTime === 'exact' || !birthNote ? null : {
        status: birthTime,
        label: birthLabel,
        summary: `${birthLabel} · ${ADVICE_HEADINGS.birthTimeMore}`,
        note: birthNote,
        leftOut: forecast.facts.withheld.filter((entry) => entry.code.endsWith('.birth-time-not-exact')).map((entry) => entry.what),
    };
    return {
        kicker: isToday ? ADVICE_HEADINGS.kickerToday : ADVICE_HEADINGS.kickerOther,
        title,
        line: opening ? opening.text : null,
        lineBasis: opening ? mergeBasis(opening.sentences.map((sentence) => sentence.basis)) : null,
        reading,
        interpretation,
        easier,
        care,
        emotionalClimate: climate ? { text: climate.text, kind: 'climate', basis: climate.basis } : null,
        goodUseNote,
        goodUse: lines('goodUse', model.goodUse, (item) => item.activity, (item) => ACTIVITY_LABEL[item.activity], (item) => item.basis),
        move: move ? { text: move.text, kind: move.kind, basis: move.basis } : null,
        note: birthNote,
        daily: { reading: dailyReading, context: contextLines, contextTitle, birthTime: dailyBirthTime },
        dropped,
        model,
        glanceBasis: glance.basis,
        story,
        sentences: ledger.sentences,
        held: ledger.held,
        coverage,
    };
}
/** Every authored string above, for the test that scans the whole vocabulary against the safety rules. */
export const ADVICE_VOCABULARY = [
    ...Object.values(ADVICE_HEADINGS), ...Object.values(TITLE_PHRASE).map((phrase) => `A day for ${phrase}`),
    ...CONTACT_VOCABULARY,
    'That fits the longer stretch you are in, which is about reflection, study and inner work.',
    ...Object.values(TENSION_TITLE), QUIET_TITLE, QUIET_LINE, PRESSURE_TITLE, PRESSURE_LINE, FALLBACK_TITLE,
    ...Object.values(TENSION_PULL), ...Object.values(AVOID_CARE),
    ...Object.values(PITFALL_PHRASE).map((phrase) => `Watch for ${phrase}.`), ...Object.values(WATCH_CARE),
    ...Object.values(RECONCILED_RELIANCE).filter((line) => Boolean(line)),
    ...Object.values(RISING_NOUN).map((noun) => `${noun.charAt(0).toUpperCase()}${noun.slice(1)} may come forward more easily, while patience may take more deliberate effort.`),
    ...Object.values(QUIETER_NOUN).map((noun) => `Impatience may come forward more easily, while ${noun} may take more deliberate effort.`),
    ...Object.values(CONTRAST_PHRASE).flatMap((phrase) => [`That suits the day better than ${phrase}.`, `That may suit the day better than ${phrase}.`]),
    ...Object.values(EASIER_RECONCILED),
    ...Object.values(BIRTH_TIME_NOTE),
    ...storyVocabulary(),
    ...Object.values(RISING_PHRASE).map((phrase) => (phrase.form === 'you' ? `You may ${phrase.text}.` : `${phrase.text.charAt(0).toUpperCase()}${phrase.text.slice(1)}.`)), ...Object.values(QUIETER_CLAUSE),
];
