import { activeLocale } from './locale.js?v=53c0693';
/**
 * The BCP-47 tag to format dates with.
 *
 * English is pinned to en-GB rather than plain 'en'. The onboarding flow has
 * always shown day-first dates ("28 August 1987"); plain 'en' resolves to US
 * conventions and would silently restyle every date in the app the moment date
 * formatting started following the locale. Pinning keeps the existing English
 * output byte-for-byte identical, so adding Slovak changes Slovak only.
 *
 * Every other locale is passed through unchanged - its own conventions are the
 * whole reason for asking Intl instead of writing the format by hand.
 */
export function dateLocale() {
    const locale = activeLocale();
    return locale === 'en' ? 'en-GB' : locale;
}
/**
 * MONTH AND WEEKDAY NAMES, FROM THE PLATFORM RATHER THAN FROM A TABLE.
 *
 * These used to be `['January', 'February', ...]` literals sitting in three
 * different components, which is why a Slovak forecast screen still had English
 * months down its axis. A hand-written table would have to be duplicated per
 * locale and kept in step with every other date the app formats; Intl already
 * knows, already follows `dateLocale()`, and already agrees with the dates the
 * onboarding flow prints.
 *
 * Built on demand rather than cached, because the active locale can change at
 * any moment and a cached table is exactly how a panel ends up in the previous
 * language. Twelve formatted dates is not a cost worth caching against that.
 *
 * A fixed non-leap year is used so the day-of-month is always valid, and UTC so
 * a timezone west of the meridian cannot roll a date back into the month before.
 */
export function monthNames(style = 'long') {
    const format = new Intl.DateTimeFormat(dateLocale(), { month: style, timeZone: 'UTC' });
    return Array.from({ length: 12 }, (_, index) => (format.format(Date.UTC(2001, index, 15))));
}
/**
 * Weekday initials, Monday first.
 *
 * Monday because the calendar this feeds lays its columns out that way, which
 * is the convention in both supported locales. `narrow` gives a single letter
 * where the locale has one - Slovak returns "p u s š p s n" - rather than the
 * hardcoded English M T W T F S S the calendar used to print in every language.
 */
export function weekdayInitials() {
    const format = new Intl.DateTimeFormat(dateLocale(), { weekday: 'narrow', timeZone: 'UTC' });
    /* 2001-01-01 was a Monday. */
    return Array.from({ length: 7 }, (_, index) => format.format(Date.UTC(2001, 0, 1 + index)));
}
