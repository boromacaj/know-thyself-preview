/*
 * HOW CERTAIN A BIRTH TIME IS - KEPT BESIDE THE TIME, NEVER READ OUT OF IT.
 *
 * A birth time and its certainty are two facts. "12:05 from the birth
 * certificate", "around 3 in the morning" and "no idea at all" are three
 * different answers, and the clock value alone cannot tell them apart: 12:00 is
 * somebody's real, exact birth time, and 03:00 can be a guess.
 *
 *   exact        the recorded time. Used as given.
 *   approximate  the reader's closest estimate. Used as given for every
 *                calculation - the difference is only that downstream knows
 *                time-sensitive results built on it are estimates.
 *   unknown      no time information at all. The time is EMPTY, which is what
 *                every engine already reads as the neutral local-noon fallback;
 *                12:00 is never written in as though somebody had entered it.
 *
 * THE ONE RULE (birthTimeAnswer). An explicit precision wins. Without one -
 * every profile written before precision existed - a supplied time is exact and
 * an absent time is unknown. Unknown always carries an empty time, and an
 * exact or approximate precision with no time to go with it is unknown too,
 * because there is nothing to be exact or approximate about.
 */
export const BIRTH_TIME_PRECISIONS = ['exact', 'approximate', 'unknown'];
export const isBirthTimePrecision = (value) => (value === 'exact' || value === 'approximate' || value === 'unknown');
/**
 * The local time the engines calculate with when the birth time is unknown -
 * a deterministic midpoint, not an estimate that anybody was born at noon. It
 * lives in the engines and in this explanation; it is never a profile value.
 */
export const UNKNOWN_BIRTH_TIME_FALLBACK = '12:00';
export function birthTimeAnswer(birthTime, precision) {
    const time = (birthTime ?? '').trim();
    if (precision === 'unknown' || time === '')
        return { birthTime: '', birthTimePrecision: 'unknown' };
    return { birthTime: time, birthTimePrecision: precision === 'approximate' ? 'approximate' : 'exact' };
}
/** The certainty of a profile's birth time, by the one rule above. */
export const birthTimePrecisionOf = (profile) => birthTimeAnswer(profile.birthTime, profile.birthTimePrecision).birthTimePrecision;
