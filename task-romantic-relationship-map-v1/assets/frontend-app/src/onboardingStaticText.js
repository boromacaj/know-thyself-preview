import { t } from './app/i18n/uiStrings.js';
import { STATEFUL_SELECTORS, STATIC_ONBOARDING_TARGETS, } from './app/i18n/onboardingStaticTargets.js';
import { LOCALE_CHANGED_EVENT } from './localeControl.js';
/*
 * APPLIES THE STATIC ONBOARDING TEXT.
 *
 * The mapping itself lives in app/i18n/onboardingStaticTargets.ts, where a test
 * can read it; this file is only the part that needs a document. See that file
 * for why the first two screens are authored as markup at all.
 */
function apply(firstPass) {
    for (const target of STATIC_ONBOARDING_TARGETS) {
        if (!firstPass && STATEFUL_SELECTORS.has(target.selector))
            continue;
        const element = document.querySelector(target.selector);
        if (!element)
            continue;
        if (target.kind === 'text') {
            element.textContent = t(target.key);
        }
        else {
            element.setAttribute(target.attribute, t(target.key));
        }
    }
}
/**
 * OVERVIEW is created after this module has already run. Keep its five edit
 * buttons deliberately boring: the only visible copy is the localized Change
 * label. This also protects the screen from malformed template fragments ever
 * leaking into the button text again.
 */
function applyOverviewChangeLabels(root = document) {
    const buttons = [];
    if (root instanceof HTMLElement && root.matches('.profile-overview-change[data-overview-edit]')) {
        buttons.push(root);
    }
    buttons.push(...root.querySelectorAll('.profile-overview-change[data-overview-edit]'));
    const label = t('onb.birthplace.change');
    for (const button of buttons) {
        if (button.textContent !== label)
            button.textContent = label;
    }
}
/**
 * Re-applies every element that carries the key it was built from.
 *
 * See the `data-i18n` note in onboardingStaticTargets.ts. Only runs on a
 * language change: on the first pass the markup already holds the right words,
 * and re-writing them would be work for nothing.
 */
function applyStamped() {
    for (const element of document.querySelectorAll('[data-i18n]')) {
        const key = element.dataset.i18n;
        if (key)
            element.textContent = t(key);
    }
    for (const element of document.querySelectorAll('[data-i18n-placeholder]')) {
        const key = element.dataset.i18nPlaceholder;
        if (key)
            element.setAttribute('placeholder', t(key));
    }
    for (const element of document.querySelectorAll('[data-i18n-aria]')) {
        const key = element.dataset.i18nAria;
        if (key)
            element.setAttribute('aria-label', t(key));
    }
    /* A placeholder that is text rather than an attribute: the arrival picker
       shows „Vyber dátum" in a span until a date is chosen, and the class it
       drops at that point is what says whether the reader has answered yet. */
    for (const element of document.querySelectorAll('[data-i18n-placeholder-text]')) {
        const key = element.dataset.i18nPlaceholderText;
        if (key && element.classList.contains('is-placeholder')) {
            element.textContent = t(key);
        }
    }
    applyOverviewChangeLabels();
}
/* Module scripts are deferred, so the markup is already parsed and there is
   nothing to wait for on the first pass. */
apply(true);
applyOverviewChangeLabels();
/* profileOverviewFlow builds the review panel dynamically after this module has
   loaded. Correct only newly-added overview controls; no broad text rewriting. */
const overviewObserver = new MutationObserver((records) => {
    for (const record of records) {
        for (const node of record.addedNodes) {
            if (node instanceof HTMLElement)
                applyOverviewChangeLabels(node);
        }
    }
});
/* The panel is built inside #vessel-stage, which is in the markup from the
   first paint. Watching the whole document meant every node the map, the place
   results and the reading screens ever add was handed to this callback for the
   life of the session, to be asked whether it was a Change button. */
const overviewRoot = document.getElementById('vessel-stage') ?? document.documentElement;
overviewObserver.observe(overviewRoot, { childList: true, subtree: true });
document.addEventListener(LOCALE_CHANGED_EVENT, () => {
    apply(false);
    applyStamped();
});
window.addEventListener('pagehide', () => overviewObserver.disconnect(), { once: true });
