import { dateKey } from './nameDayTypes.js?v=f9ab0a6';
import { canonicalKeyFor } from '../given-names/givenNameNormalize.js?v=f9ab0a6';
/*
 * THE CALENDAR REGISTRY.
 * ======================
 *
 * Holds every regional calendar and answers both directions:
 *
 *   name -> dates      "when is Boris's name day in Slovakia?"
 *   date -> names      "who has a name day on 14 October?"
 *
 * The second direction is not needed by any screen today. It is built anyway
 * because it costs one extra map over the same data, and because every feature
 * anyone would want next - today's name days, the upcoming one, a reminder, a
 * month view - is that query and nothing else. Building it later would mean
 * reshaping the dataset rather than adding a function.
 *
 * LOOKUP IS BY CANONICAL KEY, NOT BY PRINTED NAME.
 * A calendar prints 'Ľubomír'; a user may type 'Lubomir'. Indexing on the
 * folded canonical key makes both reach the same date using the same folding
 * rule as the name resolver - imported from it, so the two cannot diverge.
 */
const CALENDARS = new Map();
const BY_NAME = new Map();
const BY_DATE = new Map();
function nested(map, outer, inner, record) {
    let level = map.get(outer);
    if (!level) {
        level = new Map();
        map.set(outer, level);
    }
    const existing = level.get(inner);
    if (existing)
        existing.push(record);
    else
        level.set(inner, [record]);
}
/**
 * Add a calendar to the registry.
 *
 * Called once per region at module load by nameDayCalendars.ts. Kept as a
 * function rather than a static object so a future region pack is one import
 * and one call, with no central list to forget to update.
 */
export function registerNameDayCalendar(calendar) {
    CALENDARS.set(calendar.region, calendar);
    for (const record of calendar.records) {
        /* An entry with no personal name - a public holiday - is a real part of a
           complete calendar and must stay in it for the coverage check, but it is
           not something a name can resolve to. */
        if (!record.displayName)
            continue;
        const key = record.canonicalKey ?? canonicalKeyFor(record.displayName);
        nested(BY_NAME, calendar.region, key, record);
        nested(BY_DATE, calendar.region, dateKey(record.month, record.day), record);
    }
}
export function nameDayCalendar(region) {
    return CALENDARS.get(region) ?? null;
}
export function registeredRegions() {
    return [...CALENDARS.keys()].sort();
}
function toResolved(record) {
    return {
        region: record.region,
        month: record.month,
        day: record.day,
        displayName: record.displayName,
        rank: record.rank,
        tradition: record.tradition,
        ...(record.note ? { note: record.note } : {}),
    };
}
/**
 * Every recognised date for a name in one country.
 *
 * Returns an array because several is a real answer, and primary before
 * secondary because that is the order a reader wants them. Nothing is collapsed
 * to a single date.
 */
export function nameDaysFor(region, canonicalKey) {
    const found = BY_NAME.get(region)?.get(canonicalKey) ?? [];
    const sorted = [...found]
        .sort((a, b) => (a.rank === b.rank ? (a.month - b.month) || (a.day - b.day) : a.rank === 'primary' ? -1 : 1));
    /* ONE ENTRY PER DATE, EVEN WHEN THE CALENDAR PRINTS TWO SPELLINGS.
       The official calendar lists both "Matiáš" and "Matias" on 24 February, and
       both fold to the same key. Returning both would make the reading say the
       same date twice under two spellings of one name, which reads as a bug even
       though the data is right. Several DATES for one name is a real answer and
       is kept; several SPELLINGS of one name on one date is not. */
    const seen = new Set();
    const unique = [];
    for (const record of sorted) {
        const slot = `${record.month}-${record.day}-${record.rank}`;
        if (seen.has(slot))
            continue;
        seen.add(slot);
        unique.push(record);
    }
    return unique.map(toResolved);
}
/** Every name celebrated on one date in one country. */
export function namesOnDate(region, month, day) {
    const found = BY_DATE.get(region)?.get(dateKey(month, day)) ?? [];
    return [...found]
        .sort((a, b) => (a.rank === b.rank ? a.displayName.localeCompare(b.displayName) : a.rank === 'primary' ? -1 : 1))
        .map(toResolved);
}
/**
 * The same name across every registered country.
 *
 * The direct expression of "a name day is not one universal property": ask this
 * for a name in the corpus and the differing dates come back side by side.
 */
export function nameDaysAcrossRegions(canonicalKey) {
    return registeredRegions().flatMap((region) => nameDaysFor(region, canonicalKey));
}
