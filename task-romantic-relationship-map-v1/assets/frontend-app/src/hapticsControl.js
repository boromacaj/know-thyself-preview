import { HAPTICS_CHANGED_EVENT, appHaptics } from './app/haptics/hapticsService.js';
import { LOCALE_CHANGED_EVENT } from './app/i18n/locale.js';
import { t } from './app/i18n/uiStrings.js';
/*
 * THE HAPTICS SWITCH
 * ------------------
 * One On / Off choice for the vibration of the whole application, added into the Options sheet that already exists (the same one the
 * language switch lives in, and for the same reasons: it is reachable from every screen and its dismissal, focus and pointer handling are
 * solved). It wears the language switch's own look (the kt-locale-* classes localeControl.ts styles) so the two groups are one family.
 *
 * It is shown only on a device that has a vibration to switch: iOS Safari and a desktop have none, and a switch for nothing is noise.
 * The choice lives in the haptics service (app/haptics/hapticsService.ts), which every module asks before it vibrates; this file only
 * draws it and writes to it. Choosing On gives one short pulse, so the person feels what they have chosen.
 */
function buildGroup(sheet) {
    if (sheet.querySelector('.kt-haptics-group'))
        return;
    const haptics = appHaptics();
    if (!haptics.supported)
        return;
    const group = document.createElement('div');
    group.className = 'kt-locale-group kt-haptics-group';
    const title = document.createElement('p');
    title.className = 'kt-locale-title';
    const options = document.createElement('div');
    options.className = 'kt-locale-options';
    options.setAttribute('role', 'group');
    const make = (value) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'kt-locale-option';
        button.dataset.ktHaptics = value;
        button.addEventListener('click', () => {
            haptics.setEnabled(value === 'on');
            if (value === 'on')
                haptics.cue('select');
        });
        return button;
    };
    const on = make('on');
    const off = make('off');
    options.append(on, off);
    const sync = () => {
        const enabled = haptics.enabled();
        on.setAttribute('aria-pressed', String(enabled));
        off.setAttribute('aria-pressed', String(!enabled));
        title.textContent = t('options.haptics');
        on.textContent = t('options.haptics.on');
        off.textContent = t('options.haptics.off');
        options.setAttribute('aria-label', t('options.haptics'));
    };
    sync();
    document.addEventListener(HAPTICS_CHANGED_EVENT, sync);
    document.addEventListener(LOCALE_CHANGED_EVENT, sync);
    group.append(title, options);
    sheet.append(group);
}
/* The sheet is built by another module on its own schedule, so this watches for it rather than assuming an order between the two. */
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
