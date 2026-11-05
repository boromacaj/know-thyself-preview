import { LOCALE_CHANGED_EVENT, LOCALE_LABELS, SUPPORTED_LOCALES, activeLocale, isLocale, setActiveLocale, } from './app/i18n/locale.js?v=53c0693';
import { localeContentReady, preloadLocaleContent } from './app/i18n/localeContent.js?v=53c0693';
import { t } from './app/i18n/uiStrings.js?v=53c0693';
/*
 * THE LANGUAGE SWITCH
 * -------------------
 * A minimal control, added into the Options sheet that already exists for the
 * theme. Deliberately not a settings architecture: the brief asks for the least
 * thing that makes both languages testable, and a gear-icon information
 * architecture is a separate piece of work with its own decisions to make.
 *
 * WHY IT LIVES IN THE THEME SHEET RATHER THAN OWNING ONE
 * That sheet is already "Options", already reachable from every screen, already
 * has dismissal, focus and pointer handling solved. Adding a second floating
 * panel would duplicate all of it for two radio buttons.
 *
 * WHY IT ATTACHES FROM OUTSIDE
 * The theme module is untouched. This waits for its sheet to exist and appends
 * a group into it, so a change to the language control cannot break theming and
 * the two can be separated later without unpicking anything.
 *
 * THE ORDER MATTERS
 * The stored locale is applied at MODULE LOAD, before any reading is composed,
 * because a reading composed in English and then re-rendered would flash the
 * wrong language on first paint. Everything after that goes through the change
 * event.
 */
export const LOCALE_STORAGE_KEY = 'kt-locale';
/* Re-exported so existing importers keep working; the name is defined in the
   locale module so a listener does not have to import this one. */
export { LOCALE_CHANGED_EVENT };
function readStoredLocale() {
    try {
        const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
        return isLocale(stored) ? stored : null;
    }
    catch {
        /* Private mode, blocked storage, a browser with site data off. A language
           preference is not worth an exception; the app simply opens in English. */
        return null;
    }
}
function storeLocale(locale) {
    try {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    }
    catch {
        /* Same: the switch still works for this session, it just will not persist. */
    }
}
/* Applied before anything renders. */
const stored = readStoredLocale();
if (stored)
    setActiveLocale(stored);
/* And the language's own content is asked for in the same breath, so a reader
   who left the app in Slovak is not waiting for it after the first screen. */
void preloadLocaleContent(activeLocale());
/**
 * Change the language and tell the app.
 *
 * The event carries no payload: every consumer reads activeLocale(), so there
 * is one source of truth and no chance of a listener acting on a locale that
 * has already changed again.
 */
export function applyLocale(locale, persist = true) {
    if (!setActiveLocale(locale))
        return;
    if (persist)
        storeLocale(locale);
    document.documentElement.lang = locale;
    /*
     * THE EVENT IS SENT TWICE WHEN THE LANGUAGE ARRIVES BEFORE ITS TEXT.
     *
     * Every screen answers this event by re-reading activeLocale() and rebuilding
     * itself, which is why the first dispatch still goes out immediately: the
     * chrome, the labels and everything else already in memory change language on
     * the spot. The authored reading is loaded on demand, so if it is not in yet
     * the reader briefly keeps the English prose - the app's standing fallback -
     * and the second dispatch, sent when the corpus lands, is what turns it
     * Slovak. Nothing new is invented for that: it is the same event the same
     * listeners already handle.
     */
    document.dispatchEvent(new CustomEvent(LOCALE_CHANGED_EVENT));
    if (localeContentReady(locale))
        return;
    void preloadLocaleContent(locale).then(() => {
        if (activeLocale() !== locale)
            return;
        document.dispatchEvent(new CustomEvent(LOCALE_CHANGED_EVENT));
    });
}
document.documentElement.lang = activeLocale();
/* ------------------------------------------------------------------- UI -- */
const style = document.createElement('style');
style.dataset.ktLocaleControl = 'true';
style.textContent = `
  /* The group lives in the profile menu, and the menu follows Interface Color:
     the rules take the Surface Border role, the idle pill the fill's wash, the
     title Secondary Accent and the chosen language Highlight, each over the
     colour it always had. The gold is a plain default now; it used to be the
     fallback of --profile-energy, which the menu never defined, so it was the
     same gold for every profile anyway. (Owner decision D3, 2026-09-28.) */
  .kt-locale-group {
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px solid rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.08);
  }

  .kt-locale-title {
    margin: 0 0 8px;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(var(--kt-secondary-accent-rgb, 218, 171, 84), 0.82);
  }

  .kt-locale-options {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 7px;
  }

  .kt-locale-option {
    min-height: 34px;
    padding: 0 10px;
    border: 1px solid rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.14);
    border-radius: 999px;
    background: rgba(var(--kt-surface-wash-rgb, 255, 255, 255), 0.03);
    color: rgba(238, 236, 246, 0.82);
    font-size: 12px;
    cursor: pointer;
  }

  .kt-locale-option[aria-pressed="true"] {
    border-color: rgba(var(--kt-highlight-soft-rgb, 218, 171, 84), 0.85);
    background: rgba(var(--kt-highlight-rgb, 218, 171, 84), 0.16);
    color: rgba(255, 255, 255, 0.97);
  }
`;
document.head.append(style);
function buildGroup(sheet) {
    if (sheet.querySelector('.kt-locale-group'))
        return;
    const group = document.createElement('div');
    group.className = 'kt-locale-group';
    const title = document.createElement('p');
    title.className = 'kt-locale-title';
    title.textContent = t('options.language');
    const options = document.createElement('div');
    options.className = 'kt-locale-options';
    options.setAttribute('role', 'group');
    options.setAttribute('aria-label', t('options.language'));
    const buttons = [];
    for (const locale of SUPPORTED_LOCALES) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'kt-locale-option';
        button.dataset.ktLocale = locale;
        /* Each language names itself in itself, so it is findable by someone who
           does not read the current one. */
        button.textContent = LOCALE_LABELS[locale];
        button.addEventListener('click', () => applyLocale(locale));
        buttons.push(button);
        options.append(button);
    }
    const sync = () => {
        const current = activeLocale();
        for (const button of buttons) {
            button.setAttribute('aria-pressed', String(button.dataset.ktLocale === current));
        }
        /* The group's own labels are localised too, so the panel is never half in
           one language and half in the other. */
        title.textContent = t('options.language');
        options.setAttribute('aria-label', t('options.language'));
    };
    sync();
    document.addEventListener(LOCALE_CHANGED_EVENT, sync);
    group.append(title, options);
    sheet.append(group);
}
/* The theme sheet is built by another module on its own schedule, so this
   watches for it rather than assuming an order between the two. */
const existing = document.querySelector('.kt-theme-sheet');
if (existing) {
    buildGroup(existing);
}
else {
    const observer = new MutationObserver(() => {
        const sheet = document.querySelector('.kt-theme-sheet');
        if (!sheet)
            return;
        buildGroup(sheet);
        observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
}
