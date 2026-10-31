/*
 * THE ENCYCLOPEDIA'S SLOVAK, LOADED WITH THE LANGUAGE.
 *
 * concepts.ts is the English source of which concepts exist, and it used to
 * import the Slovak replacements at the top - thirty-odd kilobytes that an
 * English session downloaded and never read from.
 *
 * The table lives here instead, behind the same load-on-demand shape the
 * reading prose uses, and this module stays small on purpose: the coordinator
 * can import it without dragging in the English entries beside it.
 *
 * An empty table is not an error. conceptEntry() already answers a missing
 * translation with the complete English entry and says so through
 * `fellBackToEnglish`, so a lookup made before the file lands is the case that
 * was always handled.
 */
const TABLES = {};
let pending = null;
/** The replacement text for one concept in a locale, or null when there is none. */
export function conceptTranslation(key, locale) {
    return TABLES[locale]?.[key] ?? null;
}
/** Every concept key a locale has text for. Used by the coverage report. */
export function conceptTranslationKeys(locale) {
    return Object.keys(TABLES[locale] ?? {});
}
/** True when a locale needs no file, or its file is already in memory. */
export function conceptTranslationsReady(locale) {
    return locale !== 'sk' || TABLES.sk !== undefined;
}
/** Start (or join) the load. Safe to call repeatedly; resolves either way. */
export function preloadConceptTranslations(locale) {
    if (conceptTranslationsReady(locale))
        return Promise.resolve();
    if (!pending) {
        pending = import('./concepts.sk.js?v=2ea79e9').then((module) => {
            TABLES.sk = module.CONCEPTS_SK;
        }).catch(() => {
            /* The English entry is a complete entry, so a failed load costs the
               reader their language here, not the concept. The next call retries. */
            pending = null;
        });
    }
    return pending;
}
