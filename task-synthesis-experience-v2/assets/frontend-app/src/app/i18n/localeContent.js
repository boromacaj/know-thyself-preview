import { conceptTranslationsReady, preloadConceptTranslations } from '../encyclopedia/conceptTranslations.js?v=53c0693';
import { preloadProseTranslations, proseTranslationsReady } from '../knowledge/translations/proseTranslations.js?v=53c0693';
/*
 * ONE DOOR FOR A LANGUAGE'S OWN CONTENT.
 *
 * Two bodies of text belong to a language rather than to the app: the authored
 * reading prose and the encyclopedia's entries. Both used to be imported
 * statically, so an English session downloaded about a megabyte of Slovak it
 * could never display. Both now load on demand, and this is the one place that
 * asks for them - the language switch calls it, and nothing else has to know
 * how many corpora there are or where they live.
 *
 * English needs nothing: it is the canonical text, compiled in with the app, so
 * preloading it resolves immediately and fetches nothing.
 *
 * The two owners are imported normally rather than dynamically. Each is a few
 * dozen lines - a table, a lookup and a loader - and the weight they guard sits
 * behind their own dynamic imports, so naming them here costs a session
 * nothing it was not already paying.
 */
/** True when this locale's content is loaded, or when it has none to load. */
export function localeContentReady(locale) {
    return proseTranslationsReady(locale) && conceptTranslationsReady(locale);
}
/**
 * Load everything written in this language. Safe to call repeatedly: each
 * corpus joins its own in-flight load and resolves either way.
 */
export function preloadLocaleContent(locale) {
    return Promise.all([
        preloadProseTranslations(locale),
        preloadConceptTranslations(locale),
    ]).then(() => undefined);
}
