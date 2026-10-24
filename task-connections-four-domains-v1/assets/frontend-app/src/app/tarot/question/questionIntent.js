import { DOMAIN_CUES, LANGUAGE_CUES, OTHER_PERSON_CUES, PEOPLE, RELATIONSHIP_WORDS, SENSITIVITY_CUES, SLOVAK_LETTERS, STRUCTURE_CUES, anyCue, compileCues, cuesIn, } from './questionLexicon.js';
import { excerptOf, foldText, padded, sanitizeQuestion } from './questionText.js';
import { SENSITIVITY_FLAGS } from './questionTypes.js';
/**
 * WHAT THE QUESTION IS ASKING - read before any spread is chosen.
 *
 * The raw question never goes into anything that generates text. It is turned
 * into a `QuestionIntent` first, and only that, plus a bounded excerpt for
 * quoting, travels on. The analysis is a transparent rule system: cues are
 * found, weighted, and the highest structural reading wins. Every decision is
 * listed in `signals`, so a wrong spread can be traced to the cue that chose it
 * instead of to a model's mood.
 *
 * THE ORDER OF PRECEDENCE IS THE DESIGN. A question has a SUBJECT (a partner, a
 * job) and a FORM (a choice between two things, a request for a next step, a
 * "why does this keep happening"). The form says what kind of answer is wanted,
 * so it outranks the subject:
 *
 *   an explicit choice between two things                      10
 *   one course named, asked whether to take it                  7
 *   a recurring problem ("why does this keep ...")              up to 6
 *   a request for a next step ("what should I do")              5.5
 *   a relationship as the subject, or what a person feels       up to 7
 *   a question about where something is going                   up to 4
 *
 * "What should I do about my partner" is therefore a question about action, read
 * through the relationship it concerns; "does he love me" is a question about the
 * relationship itself. A domain (career, creativity, emotion) never wins over a
 * form - it colours the wording of the spread instead.
 *
 * NO CONFIDENCE IS EVER SHOWN. It only decides whether a classic spread fits
 * cleanly or the open one is the honest answer.
 */
const STRUCTURAL = [
    'binary-decision', 'problem-blockage', 'action-guidance', 'relationship', 'temporal-outlook',
];
const DOMAIN = [
    'spiritual', 'emotional', 'career', 'creativity', 'self-development', 'general-reflection',
];
const YES_NO_OPENERS = compileCues([
    ...['will', 'is', 'are', 'am', 'does', 'do', 'did', 'can', 'could', 'would', 'should', 'shall', 'has', 'have', 'was', 'were'],
    ...['je', 'sú', 'bude', 'budú', 'budem', 'budeme', 'mám', 'máme', 'môžem', 'môžeme', 'dostanem', 'vráti', 'ozve', 'stane', 'podarí', 'zvládnem', 'oplatí', 'má'],
]);
/* Tested on the question with its diacritics removed: a Slovak infinitive in -ť is then simply a word ending in t. "pocit" and "dojem" are nouns that follow "mám" and end the same way. */
const SK_QUESTION_START = /^(?:mam|mame|mali by sme|mal by som|mala by som)\s+(?:sa\s+|si\s+)?(?!pocit\b|dojem\b|chut\b)[a-z]+t\b/i;
const EN_GO_NO_GO = /(?:^|[,;]\s+|\b(?:and|so)\s+)(?:should|shall)\s+(?:i|we)\s+(.{2,})$/i;
/** Where the question says something is going: "where is my career going". */
const WHERE_GOING = /\bwhere\s+(?:is|are|am)\b.{0,40}\b(?:going|heading)\b/i;
const DECISION_FRAME = /\b(?:should|shall|whether|which|better|choose|decide|pick|torn|rather|prefer|want to)\b|^(?:do|did|can|could|would)\s+(?:i|we)\b|\b(?:mam|mal by som|mala by som|mali by sme|lepsie|vybrat|rozhodnut|radsej|chcem)\b/i;
/** The question without its diacritics, for the frames above; the options themselves are cut from the original. */
const flatten = (value) => value.normalize('NFD').replace(/\p{M}+/gu, '');
/** Words to strip from the front of the first option so it reads as a course of action. */
const LEAD_FRAMES = [
    /^(?:so|well|hi|hello|hey|please)[,\s]+/i,
    /^(?:is it|would it be|am i|are we)\s+(?:better|best|wiser|smarter|right)\s+(?:off\s+)?(?:to\s+)?/i,
    /^(?:should|shall|can|could|would|do|did|will|am|is|are)\s+(?:i|we|it|this)\s+(?:be\s+)?(?:better\s+off\s+)?(?:to\s+)?/i,
    /^(?:je\s+lep[šs]ie|mal by som|mala by som|mali by sme|m[áa]m|m[áa]me)\s+(?:sa\s+)?/i,
];
const cleanOption = (text) => {
    let out = text.trim().replace(/^[,;:\s]+|[?.!\s]+$/g, '');
    for (const frame of LEAD_FRAMES)
        out = out.replace(frame, '');
    out = out.replace(/^(?:to|just)\s+/i, '').replace(/^[,;:\s]+|[?.!,;\s]+$/g, '').trim();
    return excerptOf(out, 60);
};
/**
 * The two things a decision question sets against each other, or null.
 *
 * Works on the original text (the options are shown back to the person in their
 * own words) and keeps to forms that are unambiguous: "between X and Y",
 * "X or Y" (and Slovak "alebo", or "X, či Y" with the comma that makes `či` a
 * choice rather than "whether"), and the single-course form "should I X".
 */
function extractOptions(text) {
    if (text.length < 6)
        return null;
    const flat = flatten(text);
    const decisionFrame = DECISION_FRAME.test(flat);
    const between = /\b(?:between)\s+(.+?)\s+and\s+(.+?)[?.!]*$/i.exec(text)
        ?? /\bmedzi\s+(.+?)\s+a\s+(.+?)[?.!]*$/i.exec(text);
    if (between && (decisionFrame || /\b(?:choose|decide|pick|torn|vybrat|rozhodnut)\b/i.test(flat))) {
        const a = cleanOption(between[1]);
        const b = cleanOption(between[2]);
        if (a.length >= 2 && b.length >= 2 && a.toLowerCase() !== b.toLowerCase())
            return { a, b, form: 'explicit-two' };
    }
    if (decisionFrame) {
        /* The sentence that holds the choice, so an unrelated sentence before it is never swallowed into option A. */
        const sentence = text.split(/(?<=[.?!])\s+/).reverse().find((part) => /\s(?:or|alebo)\s|,\s*(?:či|ci)\s/i.test(flatten(part))) ?? text;
        const split = /^(.+?)\s+(?:or|alebo)\s+(.+)$/i.exec(sentence) ?? /^(.+?),\s*(?:či|ci)\s+(.+)$/i.exec(sentence);
        if (split) {
            const a = cleanOption(split[1]);
            const b = cleanOption(split[2]);
            if (a.length >= 2 && b.length >= 2 && a.toLowerCase() !== b.toLowerCase())
                return { a, b, form: 'explicit-two' };
        }
    }
    /* One course named. The other side is not a thing the person said, so it is left empty and the voice names it. */
    const english = EN_GO_NO_GO.exec(text);
    const clause = english ? english[1] : SK_QUESTION_START.test(flat) ? text : null;
    if (clause !== null) {
        const a = cleanOption(clause);
        if (a.length >= 3)
            return { a, b: '', form: 'go-no-go' };
    }
    return null;
}
function detectLanguage(text, pad) {
    const sk = (SLOVAK_LETTERS.test(text) ? 3 : 0) + cuesIn(pad, LANGUAGE_CUES.sk).length;
    const en = cuesIn(pad, LANGUAGE_CUES.en).length;
    if (sk === 0 && en === 0)
        return 'unknown';
    if (sk > en)
        return 'sk';
    if (en > sk)
        return 'en';
    return 'unknown';
}
const TYPE_PRIORITY = ['romantic', 'family', 'work', 'friend', 'other'];
const PRIORITY = [
    'binary-decision', 'problem-blockage', 'action-guidance', 'relationship', 'temporal-outlook',
    'spiritual', 'emotional', 'career', 'creativity', 'self-development', 'general-reflection',
];
const hitCount = (pad, cues) => cuesIn(pad, cues).length;
/* Slovak `on` and `ona` are left out on purpose: `on` is an English preposition, and the Slovak forms
   that matter are in the phrase cues of OTHER_PERSON_CUES ("on ma", "ona ma"). */
const PRONOUN_CUES = compileCues(['he', 'she', 'him', 'her', 'his', 'hers', 'jeho', 'jej', 'jemu']);
/** Future cues too weak to make a question about where something is going. */
const WEAK_FUTURE = new Set([
    'will', 'going to', 'bude', 'budem', 'budeme', 'budú', 'dostanem', 'získam', 'podarí', 'vyjde', 'stane', 'zvládnem',
]);
export function analyzeQuestion(raw) {
    const text = sanitizeQuestion(raw);
    const folded = foldText(text);
    const pad = padded(folded);
    const signals = [];
    const scores = new Map();
    const add = (category, weight, signal) => {
        scores.set(category, (scores.get(category) ?? 0) + weight);
        signals.push(`${signal}:${category}`);
    };
    const language = detectLanguage(text, pad);
    /* Sensitivity first: it never depends on any other finding. */
    const flagSet = new Set();
    for (const flag of SENSITIVITY_FLAGS)
        if (anyCue(pad, SENSITIVITY_CUES[flag]))
            flagSet.add(flag);
    if (flagSet.has('medical-treatment'))
        flagSet.add('medical');
    const sensitivityFlags = SENSITIVITY_FLAGS.filter((flag) => flagSet.has(flag));
    for (const flag of sensitivityFlags)
        signals.push(`flag:${flag}`);
    /* People, by role. */
    const roles = [];
    const types = [];
    for (const entry of PEOPLE) {
        if (anyCue(pad, entry.cues)) {
            roles.push(entry.role);
            types.push(entry.type);
        }
    }
    const otherPhrases = anyCue(pad, OTHER_PERSON_CUES);
    const relationshipWords = anyCue(pad, RELATIONSHIP_WORDS);
    const pronouns = anyCue(pad, PRONOUN_CUES);
    const options = extractOptions(text);
    /* Structure. */
    if (options?.form === 'explicit-two')
        add('binary-decision', 10, 'form:options');
    else if (options?.form === 'go-no-go')
        add('binary-decision', 7, 'form:go-no-go');
    else if (anyCue(pad, STRUCTURE_CUES.goNoGo) && !anyCue(pad, STRUCTURE_CUES.action))
        add('binary-decision', 6, 'cue:go-no-go');
    else if (anyCue(pad, STRUCTURE_CUES.choice))
        add('binary-decision', 6, 'cue:choice');
    const recurrence = hitCount(pad, STRUCTURE_CUES.problemRecurrence);
    const blocked = hitCount(pad, STRUCTURE_CUES.problemBlock);
    const why = anyCue(pad, STRUCTURE_CUES.why);
    if (recurrence > 0)
        add('problem-blockage', Math.min(6, 3 * recurrence), 'cue:recurrence');
    if (blocked > 0)
        add('problem-blockage', Math.min(6, 3 * blocked), 'cue:blocked');
    /* A bare "why" asks for an explanation but names no problem, so it can support a reading and never decide one. */
    if (why)
        add('problem-blockage', recurrence > 0 || blocked > 0 ? 2 : 1, 'cue:why');
    const actionHits = hitCount(pad, STRUCTURE_CUES.action);
    if (actionHits > 0)
        add('action-guidance', Math.min(6.5, 5.5 + 0.5 * (actionHits - 1)), 'cue:action');
    if (roles.length > 0)
        add('relationship', 5, `people:${roles.join('+')}`);
    else if (relationshipWords)
        add('relationship', 4, 'cue:relationship-word');
    else if (pronouns)
        add('relationship', 2, 'cue:pronoun');
    if (otherPhrases)
        add('relationship', 3, 'cue:other-person');
    const futureHits = cuesIn(pad, STRUCTURE_CUES.future);
    if (WHERE_GOING.test(text))
        futureHits.push('where-going');
    const strongFuture = futureHits.filter((cue) => !WEAK_FUTURE.has(cue)).length;
    if (strongFuture > 0)
        add('temporal-outlook', Math.min(4.5, 4 + 0.25 * (strongFuture - 1)), 'cue:future');
    else if (futureHits.length > 0)
        add('temporal-outlook', 2.5, 'cue:will');
    const pastHits = hitCount(pad, STRUCTURE_CUES.past);
    if (pastHits > 0)
        add('temporal-outlook', 3, 'cue:past');
    /* Domains colour the spread; they win only when nothing structural does. */
    if (anyCue(pad, STRUCTURE_CUES.reflection))
        add('general-reflection', 2.5, 'cue:reflection');
    if (anyCue(pad, DOMAIN_CUES.emotional))
        add('emotional', 2, 'cue:emotional');
    if (anyCue(pad, DOMAIN_CUES.spiritual))
        add('spiritual', 2.5, 'cue:spiritual');
    if (anyCue(pad, DOMAIN_CUES.career))
        add('career', 2, 'cue:career');
    if (anyCue(pad, DOMAIN_CUES.creativity))
        add('creativity', 2, 'cue:creativity');
    if (anyCue(pad, DOMAIN_CUES.selfDevelopment))
        add('self-development', 2, 'cue:self-development');
    const score = (category) => scores.get(category) ?? 0;
    const ranked = (list) => [...list].sort((left, right) => score(right) - score(left) || PRIORITY.indexOf(left) - PRIORITY.indexOf(right));
    const topStructural = ranked(STRUCTURAL)[0];
    const topDomain = ranked(DOMAIN)[0];
    let category;
    if (score(topStructural) >= 1.5)
        category = topStructural;
    else if (score(topDomain) >= 2)
        category = topDomain;
    else
        category = 'open';
    const secondaryCategories = ranked([...STRUCTURAL, ...DOMAIN])
        .filter((entry) => entry !== category && score(entry) >= 1.5);
    const top = score(category);
    const second = Math.max(0, ...[...scores.entries()].filter(([entry]) => entry !== category).map(([, value]) => value));
    const confidence = category === 'open'
        ? 0.2
        : Math.min(1, Math.max(0.15, ((top - second) / Math.max(top, 1)) * 0.6 + (Math.min(top, 6) / 6) * 0.4));
    /* Wording that says what kind of answer is wanted, independent of the category. */
    const singleFocus = anyCue(pad, STRUCTURE_CUES.singleFocus);
    const blindSpot = anyCue(pad, STRUCTURE_CUES.blindSpot);
    const resources = anyCue(pad, STRUCTURE_CUES.resources);
    const formStrong = category === 'binary-decision'
        || (category === 'problem-blockage' && score(category) >= 6)
        || (category === 'action-guidance' && score(category) >= 5.5);
    const hasWh = anyCue(pad, STRUCTURE_CUES.whWords);
    const first = folded.split(' ')[0] ?? '';
    const questionForm = folded.length > 0 && !hasWh && options?.form !== 'explicit-two' && (YES_NO_OPENERS.some((cue) => cue.needle === ` ${first} `) || /\?\s*$/.test(text))
        ? 'yes-no' : 'open';
    let desiredGuidance;
    if (singleFocus && options?.form !== 'explicit-two')
        desiredGuidance = 'single-focus';
    else if (blindSpot && !formStrong)
        desiredGuidance = 'blind-spot';
    else if (resources && !formStrong)
        desiredGuidance = 'resources';
    else if (category === 'binary-decision')
        desiredGuidance = 'decide';
    else if (category === 'problem-blockage')
        desiredGuidance = 'unblock';
    else if (category === 'action-guidance')
        desiredGuidance = 'act';
    else if (category === 'temporal-outlook')
        desiredGuidance = 'foresee';
    else if (category === 'relationship')
        desiredGuidance = 'understand';
    else
        desiredGuidance = 'reflect';
    signals.push(`guidance:${desiredGuidance}`);
    const hasFuture = futureHits.length > 0;
    const temporalOrientation = hasFuture ? 'future'
        : pastHits > 0 ? 'past'
            : category === 'spiritual' || category === 'self-development' || category === 'open' ? 'timeless' : 'present';
    const relationshipType = roles.length > 0
        ? TYPE_PRIORITY.find((type) => types.includes(type)) ?? 'other'
        : (relationshipWords || otherPhrases || (category === 'relationship' && pronouns)) ? 'other' : null;
    /* The classic spread this wording points at. Selection applies the safety policy and the adaptation. */
    const yesNoOutlook = category === 'temporal-outlook' && questionForm === 'yes-no';
    let recommendation;
    if (desiredGuidance === 'single-focus')
        recommendation = { spreadId: 'one-card-reflection', because: 'guidance:single-focus' };
    else if (desiredGuidance === 'blind-spot')
        recommendation = { spreadId: 'blind-spot-view', because: 'guidance:blind-spot' };
    else if (desiredGuidance === 'resources')
        recommendation = { spreadId: 'resources-view', because: 'guidance:resources' };
    else if (category === 'binary-decision')
        recommendation = { spreadId: 'option-a-b-guidance', because: 'category:binary-decision' };
    else if (category === 'relationship')
        recommendation = { spreadId: 'self-other-relationship', because: 'category:relationship' };
    else if (category === 'problem-blockage')
        recommendation = { spreadId: 'problem-cause-solution', because: 'category:problem-blockage' };
    else if (category === 'action-guidance')
        recommendation = { spreadId: 'situation-action-outcome', because: 'category:action-guidance' };
    else if (yesNoOutlook)
        recommendation = { spreadId: 'support-resistance-key', because: 'category:temporal-outlook+yes-no' };
    else if (category === 'temporal-outlook')
        recommendation = { spreadId: 'past-present-future', because: 'category:temporal-outlook' };
    else if (category === 'career' || category === 'creativity' || category === 'self-development') {
        recommendation = { spreadId: 'situation-action-outcome', because: `category:${category}` };
    }
    else
        recommendation = { spreadId: 'body-mind-spirit', because: `category:${category}` };
    return {
        normalizedQuestion: text,
        language,
        category,
        secondaryCategories,
        temporalOrientation,
        entities: [...new Set(roles)],
        options,
        relationshipType,
        desiredGuidance,
        questionForm,
        sensitivityFlags,
        spreadRecommendation: recommendation,
        confidence: Number(confidence.toFixed(3)),
        signals,
    };
}
