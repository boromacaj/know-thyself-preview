import { FALLBACK_LOCALE, SUPPORTED_LOCALES, isLocale } from './locale.js';
/*
 * THE LAUNCH-LANGUAGE POLICY.
 *
 * English is the only language a person can reach in the public product. Slovak (and any later language) is postponed, not deleted: its files, packs, tests and
 * renderers stay in the repository and `SUPPORTED_LOCALES` keeps naming what the ENGINE can speak. This module decides which of those a PERSON may be put in, and it
 * is the only place that decides it. Every way a locale can be chosen goes through `isSelectableLocale` / `resolveInitialLocale`:
 *
 *   - the language switch in Options (not drawn while there is nothing to choose between);
 *   - the stored preference `kt-locale` (a stale "sk" is ignored and purged: storage is a hint, never the authority);
 *   - the very first paint (the inline script of the HTML shell asks the same question);
 *   - the QA preset menu (a developer build only).
 *
 * The browser's own language (`navigator.language`) is deliberately not an input: nothing here reads it. It is used elsewhere only to rank birthplace search results.
 *
 * HOW A LANGUAGE COMES BACK
 * Add its code to PUBLIC_LAUNCH_LOCALES once it passes the same editorial and technical gate English passed (docs/reading-voice/english-v2/ENGLISH_ONLY_LAUNCH.md). The switch,
 * the stored preference and the first paint pick it up with no further change.
 *
 * DEVELOPER AND AUDIT OVERRIDE
 * Headless audits and the engine tests still exercise Slovak. They set `globalThis.__KT_ALLOW_NON_LAUNCH_LOCALES__ = true` before the page script runs. It is not read from the
 * URL, storage or the network, so no link and no stored value can switch a visitor into an incomplete language; only code that runs before the app can.
 */
export const LAUNCH_LOCALE = FALLBACK_LOCALE;
/** The languages the public product offers. */
export const PUBLIC_LAUNCH_LOCALES = ['en'];
export const NON_LAUNCH_OVERRIDE_FLAG = '__KT_ALLOW_NON_LAUNCH_LOCALES__';
export function nonLaunchLocalesAllowed() {
    try {
        return globalThis[NON_LAUNCH_OVERRIDE_FLAG] === true;
    }
    catch {
        return false;
    }
}
export function isPublicLaunchLocale(value) {
    return isLocale(value) && PUBLIC_LAUNCH_LOCALES.includes(value);
}
/** Whether a person (or a stored preference) may put the app in this locale. */
export function isSelectableLocale(value) {
    return isLocale(value) && (isPublicLaunchLocale(value) || nonLaunchLocalesAllowed());
}
/** The locales a language switch may offer, in the engine's order. */
export function selectableLocales() {
    return SUPPORTED_LOCALES.filter((locale) => isSelectableLocale(locale));
}
/** A switch with one option is not a choice: it is not drawn. */
export function languageChoiceVisible() {
    return selectableLocales().length > 1;
}
/** The locale the app opens in: the stored preference only if it is selectable, otherwise the launch language. */
export function resolveInitialLocale(stored) {
    return isSelectableLocale(stored) ? stored : LAUNCH_LOCALE;
}
/** A stored value that policy refuses is removed rather than left for the next version of the app to trust again. */
export function storedLocaleIsStale(stored) {
    return stored !== null && stored !== undefined && !isSelectableLocale(stored);
}
