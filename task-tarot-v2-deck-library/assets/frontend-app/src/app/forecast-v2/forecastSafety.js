/*
 * WHAT A DAILY READING MAY NEVER SAY AS IF IT WERE KNOWN.
 *
 * A Forecast turns planetary positions and cycle numbers into a tendency for a
 * day. It has no way to know whether a person will fall ill, conceive, win a case,
 * make money, be lied to, or hurt themselves, and a sentence that sounds as though
 * it did could be read at the worst possible moment by the worst possible person.
 * This module is the written-down list of what the Forecast must not claim, and
 * the check every sentence it produces goes through.
 *
 * WHY IT IS HERE AND NOT BORROWED FROM TAROT
 * The Tarot suites hold a similar list, but inside their TESTS: nothing the
 * product can call. Lifting it out would mean editing the Tarot tests and
 * contract, which this work does not touch, so the Forecast has its own list of
 * equivalent coverage. If a shared module is ever wanted, this file is the one to
 * extract from; nothing else imports it.
 *
 * TWO USES
 *   - the tests run every authored string and thousands of generated plans
 *     through `auditForecastText` and fail on any hit;
 *   - the English realisation runs the same check on each sentence as it is
 *     produced and DROPS a sentence that fails, recording why in the diagnostics.
 *     A guard the product does not run is a guard that holds only on the days the
 *     tests happened to sample.
 *
 * English only, because the Slovak Forecast is frozen. The list gains Slovak when
 * Slovak DayPlan prose does.
 */
export const FORECAST_SAFETY_RULES = [
    { category: 'death', pattern: /\b(die[sd]?|dying|death|dead|fatal\w*|funeral\w*|passing away|killed?)\b/i,
        why: 'A day cannot tell anyone about a death.' },
    { category: 'health-diagnosis', pattern: /\b(illness\w*|disease\w*|diagnos\w*|cancer|tumou?rs?|infection\w*|symptom\w*|medical|doctors?|surgery|chronic|therapy|medication)\b/i,
        why: 'The Forecast is symbolic and educational; it makes no health claims.' },
    { category: 'pregnancy', pattern: /\b(pregnan\w*|miscarr\w*|fertil\w*|conceiv\w*|childbirth|give birth|expecting a baby)\b/i,
        why: 'A day cannot know about a pregnancy.' },
    { category: 'accident', pattern: /\b(accidents?|accidental\w*|crash\w*|collision\w*|injur\w*|hospital\w*|emergenc\w*)\b/i,
        why: 'A day cannot know about accidents or injury.' },
    /* "sentence" alone is just a unit of writing ("say it in a sentence"); only the court's use of it is an outcome. */
    { category: 'legal-outcome', pattern: /\b(lawsuit\w*|sue[sd]?|court\w*|verdict\w*|sentenced|sentencing|prison\w*|arrest\w*|police|legal outcome|settlement\w*|litigation)\b/i,
        why: 'A day cannot know how a legal matter ends.' },
    { category: 'investment', pattern: /\b(stock market|stocks?|crypto\w*|bitcoin|invest\w*|portfolio\w*|profit\w*|gambl\w*|lotter\w*|windfall\w*)\b/i,
        why: 'A day cannot know how money or markets will move.' },
    { category: 'job-result', pattern: /\b(job offer\w*|promotion\w*|get hired|be hired|fired|laid off|dismissed|pay rise|raise in pay)\b/i,
        why: 'A day cannot know whether a job comes or goes.' },
    { category: 'cheating-or-lying', pattern: /\b(cheat\w*|affairs?|unfaithful\w*|infidelit\w*|betray\w*|lying to you|lies to you|deceiv\w*)\b/i,
        why: 'A day cannot know whether anyone is deceiving the reader.' },
    { category: 'other-persons-mind', pattern: /\b(secretly (?:thinks?|feels?|wants?|plans?|resents?)|(?:really|actually) (?:thinks?|feels?|wants?) (?:about )?you|what (?:he|she|they) (?:really|secretly) (?:think|feel|want)s?|knows your secret|is hiding something)\b/i,
        why: 'A day cannot read another person’s private thoughts.' },
    { category: 'paranoia', pattern: /\b(someone is (?:watching|plotting|against)|(?:they|people) (?:are|is) (?:plotting|against you|out to get you)|conspir\w*|out to get you|cannot trust anyone|can'?t trust anyone)\b/i,
        why: 'Nothing here may feed a suspicious reading of other people.' },
    { category: 'self-harm', pattern: /\b(suicid\w*|self[- ]?harm\w*|hurt yourself|harm yourself|kill yourself|end it all|no way out)\b/i,
        why: 'Nothing here may touch self-harm.' },
    { category: 'disaster', pattern: /\b(disaster\w*|catastroph\w*|calamit\w*|earthquake\w*|flood\w*|tragedy|tragic)\b/i,
        why: 'A day cannot know about disasters.' },
    { category: 'fate-or-certainty', pattern: /\b(will|won'?t|going to|destin\w*|fated|your fate|guarantee\w*|inevitabl\w*|definitely|certainly|for sure|bound to)\b/i,
        why: 'A forecast says what may be easier or harder, never what will happen.' },
    { category: 'asserted-feeling', pattern: /\byou (?:are|feel|felt|were) (?:\w+ )?(?:angry|furious|sad|depressed|anxious|jealous|hurt|afraid|ashamed|worthless)\b/i,
        why: 'Feelings are tendencies the day may bring forward, never statements about the reader.' },
];
export function auditForecastText(text) {
    const violations = [];
    for (const rule of FORECAST_SAFETY_RULES) {
        const hit = rule.pattern.exec(text);
        if (hit)
            violations.push({ category: rule.category, match: hit[0] });
    }
    return violations;
}
export const isSafeForecastText = (text) => auditForecastText(text).length === 0;
