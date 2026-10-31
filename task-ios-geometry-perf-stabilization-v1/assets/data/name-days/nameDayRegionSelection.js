/*
 * WHICH CALENDAR TO SHOW.
 * =======================
 *
 * This file exists so that "what language do you read in" and "whose calendar
 * are you on" stay two questions with two answers. They correlate today and the
 * app currently derives one from the other, but the derivation lives HERE, in
 * one small function, instead of being spread through the reading code as an
 * assumption that language equals country.
 *
 * That matters for a real person rather than a hypothetical one: a Slovak
 * living abroad who reads the app in English still wants the Slovak calendar,
 * and a Hungarian speaker in Slovakia may want the opposite. Both are one
 * argument to this function, not a refactor.
 *
 * ENGLISH GETS NO CALENDAR, ON PURPOSE.
 * There is no English-speaking name-day tradition to default to. Falling back
 * to Slovakia merely because Slovakia is the region best supported would tell
 * an English-speaking reader that their name day is in October, which is not a
 * fact about them - it is a fact about a dataset. So `en` maps to null and the
 * reading omits the section entirely until a region is known. Absent is honest;
 * borrowed is not.
 */
/**
 * The calendar a locale implies, when the reader has not chosen one.
 *
 * `null` means "no default": show no name day rather than someone else's.
 */
export const DEFAULT_REGION_BY_LOCALE = {
    en: null,
    sk: 'SK',
};
/**
 * Resolve the calendar to use.
 *
 * `preference` is the future user setting. It is already threaded through so
 * that adding the settings control is a UI change with no data-layer work: pass
 * a region and it wins; pass undefined and the locale decides.
 *
 * An explicit `null` preference is respected as "I do not want a name day",
 * which is why the check is for `undefined` rather than falsiness.
 */
export function selectNameDayRegion(locale, preference) {
    if (preference !== undefined)
        return preference;
    return DEFAULT_REGION_BY_LOCALE[locale] ?? null;
}
