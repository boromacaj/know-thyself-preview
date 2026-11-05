import { activeLocale, FALLBACK_LOCALE } from '../../i18n/locale.js?v=4cd804d';
/**
 * The language of the card encyclopedia and the deck library.
 *
 * English is the only public launch language. The library does not wait for the launch policy to reach this branch: it
 * answers English unless the developer/audit override that the headless launchers already set
 * (`__KT_ALLOW_NON_LAUNCH_LOCALES__`) is on. The Slovak tables stay in the source, unedited and unreviewed, for the day a
 * language passes the gate; nothing here reads the URL, storage or the browser language.
 */
export function libraryLocale() {
    const override = globalThis.__KT_ALLOW_NON_LAUNCH_LOCALES__;
    return override === true ? activeLocale() : FALLBACK_LOCALE;
}
