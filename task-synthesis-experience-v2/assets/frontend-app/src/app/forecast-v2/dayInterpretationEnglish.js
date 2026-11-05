import { BODY_SUBJECT, CONTACT_CLAUSE, ELEMENT_SENTENCE, HOUSE_THEME, NATAL_OBJECT, OWN_PLACE_STATE, PHASE_FIT, TOUCH_STATE, houseSentence, } from './dayStoryVoice.js?v=53c0693';
import { cycleThemeEn, planComposition, scalesOf, TEMPORAL_VOICE_EN, } from '../numerology-forecast/temporalComposition.js?v=53c0693';
/*
 * THE READING, IN ENGLISH: THE NUMBERS, AND ONE SENTENCE PER PIECE OF THE SKY.
 *
 * THE NUMBERS ARE THE LEGACY COMPOSER'S OWN WORDS. The three cycles are read by temporalComposition.ts, which has always nested
 * them (year, then month, then the day acting inside the month's work). This file does not rewrite that prose; it only guards it,
 * and where an idiom trips a safety rule ("takes stock") says the same thing in other words.
 *
 * THE SKY IS WRITTEN IN dayStoryEnglish.ts, from the day's story (how the contacts stand to each other, and what the Moon's setting
 * has to do with the day). What remains here is `skySentence`: the ONE standalone sentence for one piece of the sky, which the
 * Day Life Dynamics explanation uses where it names a contact. It is said in the same voice as the paragraph - the contact's
 * clause is written for that body touching that point - and with the course of the contact left out, because that explanation
 * does not know it.
 *
 * Plain, observant, explanatory. Closed vocabularies only: nothing here is chosen by date, rotation or chance. A claim is a
 * tendency of the day, something that "can", "tends to" or "makes easier" - never what will happen.
 */
/** One standalone sentence for one piece of the sky. */
export function skySentence(key) {
    switch (key.type) {
        case 'contact': {
            const clause = CONTACT_CLAUSE[key.body][key.natal][key.quality];
            const natal = NATAL_OBJECT[key.natal];
            const object = key.body === key.natal ? OWN_PLACE_STATE[key.quality] : `${TOUCH_STATE[key.quality]} ${natal.name}`;
            return `${BODY_SUBJECT[key.body]} ${object}, so ${clause.text}.`;
        }
        case 'phase': return PHASE_FIT[key.kind];
        case 'house': return houseSentence(key.house);
        case 'element': return ELEMENT_SENTENCE[key.element];
    }
}
/* -------------------------------------------------------------- the numbers -- */
/** Idioms in the legacy prose that trip a Forecast safety rule on a false positive, said the same way in other words. */
const ADAPT = [
    [/\btakes stock of\b/g, 'weighs up'],
];
const DAY_VOICE = (sentence) => {
    if (sentence.kind === 'short-term-headline')
        return '';
    const legacy = TEMPORAL_VOICE_EN(sentence);
    return sentence.kind === 'watch' && sentence.doubled ? legacy.replace(/^With the \d theme doubled, the thing to watch/, 'The thing to watch') : legacy;
};
export function numbersParts(tuple, startsSomething = false) {
    /* The numbers can call a day "less a new start" while the sky-led plan is to start: the clause is the part that would contradict the headline. */
    const adapt = startsSomething ? [...ADAPT, [/ (?:than|rather than) (?:for )?another new start/g, '']] : ADAPT;
    const plan = planComposition(tuple);
    /* The composer says a doubled caution speaks for the month. When the month's number is the DAY'S number (month-day), the doubled theme is the day's own, and the caution is about today. */
    const scalesFor = (sentence) => (sentence.kind === 'watch' && sentence.doubled && plan.relation === 'month-day' ? ['month', 'day'] : scalesOf(sentence));
    return plan.sentences
        .map((sentence) => ({ kind: sentence.kind, scales: scalesFor(sentence), text: DAY_VOICE(sentence) }))
        .filter((part) => part.text !== '')
        .map((part) => ({ ...part, text: adapt.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), part.text) }));
}
export function numbersSentences(tuple, startsSomething = false) {
    return numbersParts(tuple, startsSomething).map((part) => part.text);
}
const withArticle = (n) => `${n === 8 ? 'an' : 'a'} ${n}`;
export function numbersDepths(tuple, startsSomething = false) {
    const parts = numbersParts(tuple, startsSomething);
    const visible = parts.filter((part) => part.scales.includes('day'));
    const context = parts.filter((part) => !part.scales.includes('day'));
    const { year, month } = tuple;
    /* The day's sentences speak of "the month" and "the year" without having named them: one sentence says which, in the composer's own theme words. */
    const orientation = context.length === 0 ? null
        : year === month
            ? `The day sits in ${withArticle(month)} month of ${withArticle(year)} year (${cycleThemeEn(year)}).`
            : `The day sits in ${withArticle(month)} month (${cycleThemeEn(month)}) of ${withArticle(year)} year (${cycleThemeEn(year)}).`;
    return { visible, context, orientation };
}
/** Every authored sentence of the sky that this file can say, for the test that scans the vocabulary against the safety rules. */
export const CONTACT_VOCABULARY = [
    ...['Moon', 'Sun', 'Mercury', 'Venus', 'Mars'].flatMap((body) => ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars'].flatMap((natal) => ['ease', 'hard', 'merge']
        .map((quality) => skySentence({ type: 'contact', body, natal, quality })))),
    ...Object.values(PHASE_FIT), ...Object.keys(HOUSE_THEME).map((house) => houseSentence(Number(house))), ...Object.values(ELEMENT_SENTENCE),
];
