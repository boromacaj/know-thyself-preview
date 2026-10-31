/**
 * LOCALE STATE.
 *
 * Two locales, English canonical. Everything else in the app reads the active
 * locale from here rather than holding its own copy, so there is exactly one
 * answer to "what language are we in" at any moment.
 *
 * WHY MODULE STATE AND NOT A CONTEXT OBJECT THREADED THROUGH EVERY CALL
 *
 * The reading pipeline is a chain of pure composers - four pillar composers, a
 * synthesis composer, a renderer - none of which currently take a presentation
 * argument, and all of which are called from several places. Threading a locale
 * parameter through every signature would touch every composer, every call site
 * and every test, for a value that is global by nature and changes only when a
 * person picks a different language.
 *
 * The cost of module state is that it is implicit, and the way that hurts is
 * non-determinism. So the invariant is written down and tested: composing the
 * same profile twice under the same locale produces identical output, and
 * composing under a different locale changes ONLY language - never a calculated
 * value, never which sections exist, never an evidence weight.
 *
 * ENGLISH IS THE FALLBACK, AND THE FALLBACK IS EXPLICIT
 *
 * Slovak coverage is partial by design - the authored reading prose is a large
 * body of writing and it is being translated in stages. Every lookup therefore
 * has one shape: try the active locale, and if that locale has no entry, return
 * the English one. Nothing anywhere is allowed to return an empty string, a key
 * name, or a placeholder. A missing translation shows correct English, which is
 * the only failure mode that leaves the product usable.
 */
export const SUPPORTED_LOCALES = ['en', 'sk'];
/** English is canonical: every string exists in it, by construction. */
export const FALLBACK_LOCALE = 'en';
export const LOCALE_LABELS = {
    /* Each language names itself in itself - a person looking for Slovak is
       looking for the word "Slovenčina", not for "Slovak". */
    en: 'English',
    sk: 'Slovenčina',
};
export function isLocale(value) {
    return typeof value === 'string' && SUPPORTED_LOCALES.includes(value);
}
/**
 * Fired on `document` after the language changes.
 *
 * It lives HERE, in the side-effect-free module, rather than beside the switch
 * that dispatches it. A panel that needs to re-label itself has to listen for
 * this, and if the name came from the switch's own module then importing it
 * would drag in that module's DOM setup - a stylesheet, a MutationObserver -
 * purely to learn a string. Several panels were built without a listener for
 * exactly that reason, and each one stayed in the old language until it was
 * next rebuilt from scratch.
 */
export const LOCALE_CHANGED_EVENT = 'knowthyself:locale-changed';
let active = FALLBACK_LOCALE;
export function activeLocale() {
    return active;
}
/**
 * Set the language. Returns true when the value actually changed, so a caller
 * can decide whether a re-render is needed without comparing it themselves.
 */
export function setActiveLocale(locale) {
    if (!isLocale(locale) || locale === active)
        return false;
    active = locale;
    return true;
}
/**
 * Pick from a per-locale table, falling back to English.
 *
 * The single lookup shape used everywhere: UI strings, encyclopedia entries and
 * translated prose all go through this, so the fallback rule cannot drift
 * between them. `en` is required by the type, which is what guarantees there is
 * always something to fall back TO.
 */
export function pickLocalized(table, locale = active) {
    /* `table.en` rather than `table[FALLBACK_LOCALE]`: the type guarantees `en` is
       present, but indexing by a variable widens it back to `T | undefined` and
       the guarantee is lost. Reading the required property directly keeps it. */
    return table[locale] ?? table.en;
}
/**
 * Whether the active locale has its own version of something.
 *
 * Used to report coverage honestly rather than to change behaviour - a reading
 * that fell back should be able to say so.
 */
export function hasLocalized(table, locale = active) {
    return table[locale] !== undefined;
}
