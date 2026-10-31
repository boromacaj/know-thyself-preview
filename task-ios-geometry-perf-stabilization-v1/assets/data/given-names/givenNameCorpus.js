import { SLAVIC_CORE_NAMES } from './corpus/slavicCore.js?v=d9f39e7';
import { SLOVAK_CALENDAR_MODERN } from './corpus/slovakCalendarModern.js?v=d9f39e7';
import { SLOVAK_CALENDAR_GAP_B } from './corpus/slovakCalendarGapB.js?v=d9f39e7';
import { SLOVAK_CALENDAR_GAP_A } from './corpus/slovakCalendarGapA.js?v=d9f39e7';
import { BIBLICAL_CLASSICAL_NAMES } from './corpus/biblicalClassical.js?v=d9f39e7';
import { GERMANIC_INTERNATIONAL_NAMES } from './corpus/germanicInternational.js?v=d9f39e7';
import { SLOVAK_NAMES } from './corpus/slovakNames.js?v=d9f39e7';
/*
 * THE CORPUS, ASSEMBLED.
 * ======================
 *
 * One flat array, concatenated from files split by linguistic family. The split
 * is for editing, not for loading: a record's family is not something a reader
 * ever queries by, and a per-family lazy load would buy a few kilobytes at the
 * cost of making every lookup asynchronous.
 *
 * ON SIZE AND STARTUP
 * The corpus is static ES module data, so it is parsed once when first imported
 * and the indexes are built once from it. The screen that needs it is the
 * numerology pillar, which is opened on demand rather than at first paint, so
 * this never lands on the onboarding critical path. If the corpus ever grows
 * past the point where that holds - low tens of thousands of records - the
 * split below is already the seam along which culture packs would be lazily
 * loaded. It is not needed at this size and pretending otherwise would be
 * architecture for its own sake.
 *
 * DUPLICATE KEYS ARE A BUILD-BREAKING ERROR, NOT A MERGE.
 * Two files claiming the same canonical key means two people authored the same
 * name and one of them is about to be silently discarded. The integrity test
 * fails on it rather than letting array order decide which etymology a reader
 * gets.
 */
export const GIVEN_NAME_CORPUS = [
    ...SLAVIC_CORE_NAMES,
    ...SLOVAK_CALENDAR_MODERN,
    ...SLOVAK_CALENDAR_GAP_B,
    ...SLOVAK_CALENDAR_GAP_A,
    ...BIBLICAL_CLASSICAL_NAMES,
    ...GERMANIC_INTERNATIONAL_NAMES,
    ...SLOVAK_NAMES,
];
/** Canonical keys, sorted. Stable output, for tests and coverage reporting. */
export function givenNameKeys() {
    return GIVEN_NAME_CORPUS.map((record) => record.canonicalKey).sort();
}
/** Keys appearing more than once. Must be empty. */
export function duplicateGivenNameKeys() {
    const seen = new Set();
    const duplicates = new Set();
    for (const record of GIVEN_NAME_CORPUS) {
        if (seen.has(record.canonicalKey))
            duplicates.add(record.canonicalKey);
        seen.add(record.canonicalKey);
    }
    return [...duplicates].sort();
}
