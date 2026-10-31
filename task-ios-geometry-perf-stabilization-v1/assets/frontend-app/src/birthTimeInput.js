import { birthTimeAnswer, } from './app/birthTimePrecision.js?v=d9f39e7';
import { t, tf } from './app/i18n/uiStrings.js?v=d9f39e7';
/*
 * THE BIRTH TIME ON THE FORM: A VALUE, AND HOW CERTAIN IT IS.
 * ----------------------------------------------------------
 * The value is the input's own - 'HH:MM', or EMPTY. Empty is what the pipeline
 * already reads as the neutral local-noon fallback: normalizeBirthTime()
 * substitutes 12:00 for the CALCULATION only, keeps the resolved birthplace
 * timezone untouched, and records "Local birth time: Not supplied" beside
 * "Effective birth time: 12:00" in the trace. 12:00 is never written into the
 * profile, where it would be indistinguishable from a time somebody typed.
 *
 * The certainty is the one thing the value cannot say, so it lives beside it
 * on the same element - data-birth-time-precision - and travels with it
 * through the arrival step, the overview edit and the edit's rollback:
 *
 *   exact        a real time, as recorded.
 *   approximate  a real time, the reader's closest estimate. Calculated as
 *                given; only marked differently.
 *   unknown      the reader told us they do not know. The value is empty.
 *
 * An empty value with no precision is the fourth state, and it is not an
 * answer at all: "not filled in yet" keeps the form closed, while "unknown"
 * opens it. A value with no precision is exact - the rule every profile written
 * before precision existed is read by (app/birthTimePrecision.ts).
 *
 * `required` moves with the answer. The input is declared `required`, and a
 * required empty field makes the browser block submission before any submit
 * listener runs - so "unknown" releases it, and any time-carrying answer takes
 * it back.
 */
/** The certainty of the answer on the input, or null while it is unanswered. */
export const birthTimePrecisionOfInput = (input) => {
    if (input.dataset.birthTimePrecision === 'unknown')
        return 'unknown';
    /* Nothing to be exact or approximate about yet. */
    if (input.value.length === 0)
        return null;
    return input.dataset.birthTimePrecision === 'approximate' ? 'approximate' : 'exact';
};
/** True when the reader explicitly said the birth time is unknown. */
export const isBirthTimeUnknown = (input) => (birthTimePrecisionOfInput(input) === 'unknown');
/**
 * The question has an answer: a time (exact or approximate), or a deliberate
 * "unknown". An empty field nobody has answered yet is none of them.
 */
export const birthTimeIsAnswered = (input) => (birthTimePrecisionOfInput(input) !== null);
/** The answer as a profile carries it - the time and its certainty together. */
export const readBirthTimeAnswer = (input) => {
    const precision = birthTimePrecisionOfInput(input);
    return precision === null ? null : birthTimeAnswer(input.value, precision);
};
/**
 * Sets how certain the time on the input is. Unknown empties the value -
 * empty is what the engines read as the noon fallback - and releases
 * `required`; exact and approximate keep the value the reader gave; null
 * withdraws the answer, which leaves the question open again.
 */
export const setBirthTimePrecision = (input, precision) => {
    if (precision === 'unknown') {
        input.value = '';
        input.required = false;
        input.dataset.birthTimePrecision = 'unknown';
        return;
    }
    input.required = true;
    if (precision === null) {
        delete input.dataset.birthTimePrecision;
        return;
    }
    input.dataset.birthTimePrecision = precision;
};
/**
 * Puts a whole answer back on the input exactly as it was read: the value and
 * its certainty in one step, so the two can never disagree. A precision of
 * null is an unanswered question; a time with no precision is exact.
 */
export const writeBirthTime = (input, birthTime, precision) => {
    if (precision === 'unknown') {
        setBirthTimePrecision(input, 'unknown');
        return;
    }
    input.value = birthTime;
    setBirthTimePrecision(input, birthTime.length > 0 ? precision ?? 'exact' : null);
};
/**
 * A birth time as the reader sees it: "12:05", "Approx. 03:00", or "Not
 * known". Never 12:00 for an unknown time - that is the calculation's fallback,
 * not anybody's answer.
 */
export const birthTimeText = (answer, unknownKey = 'onb.time.unknown') => {
    const { birthTime, birthTimePrecision } = birthTimeAnswer(answer.birthTime, answer.birthTimePrecision);
    if (birthTimePrecision === 'unknown')
        return t(unknownKey);
    return birthTimePrecision === 'approximate' ? tf('onb.time.approximateValue', { time: birthTime }) : birthTime;
};
