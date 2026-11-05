import { LOCALE_CHANGED_EVENT } from './app/i18n/locale.js?v=53c0693';
import { t } from './app/i18n/uiStrings.js?v=53c0693';
import { settingsNavigation } from './app/settings/settingsNavigation.js?v=53c0693';
/*
 * THE ONE BACK CONTROL OF SETTINGS.
 *
 * A single floating glass disc for every level of Settings: today the sheet, and any detail screen a later feature adds. It owns no destination. It asks the navigation
 * (app/settings/settingsNavigation.ts) to take ONE step back, and the navigation decides what that means: from a detail screen to the one under it, from the sheet to
 * wherever Settings was opened from. It is visible exactly while Settings has a level open, and it stands inside the top-left corner of the surface that is on top (the level says which
 * surface and how far in), so it belongs to what it leaves and does not sit in a toolbar: there is no bar, no strip and no fill behind it. It is positioned on the host, outside every
 * scroller, so it stays where it is while the content scrolls and is reachable however deep the reader has gone.
 *
 * It is a 44px hit area holding a 36px glass disc: the sheet's own fill and border tokens, a 1px highlight, a very low glow, a chevron and no text. Its name is spoken ("Back",
 * "Spat", localised) and never drawn. It uses no browser history and no address, writes no setting and stops the click so nothing underneath reacts.
 */
const host = document.getElementById('place-experience');
if (host instanceof HTMLElement) {
    const style = document.createElement('style');
    style.dataset.settingsBackControl = 'true';
    style.textContent = `
    #place-experience .kt-settings-back {
      position: absolute;
      z-index: 9002;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      margin: 0;
      padding: 0;
      border: 0;
      border-radius: 50%;
      background: none;
      color: rgba(244, 241, 255, .92);
      cursor: pointer;
      outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    #place-experience .kt-settings-back[hidden] { display: none; }
    #place-experience .kt-settings-back-glass {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 36px;
      height: 36px;
      border: 1px solid rgba(var(--kt-surface-border-rgb, 248, 252, 255), .34);
      border-radius: 50%;
      background: rgba(var(--kt-surface-fill-rgb, 6, 9, 12), .5);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, .14), 0 0 10px rgba(var(--kt-highlight-soft-rgb, 198, 205, 255), .1);
      -webkit-backdrop-filter: blur(8px) saturate(1.08);
      backdrop-filter: blur(8px) saturate(1.08);
    }
    #place-experience .kt-settings-back-icon { display: block; width: 20px; height: 20px; }
    #place-experience .kt-settings-back:active .kt-settings-back-glass { background: rgba(var(--kt-surface-fill-rgb, 6, 9, 12), .72); }
    #place-experience .kt-settings-back:focus-visible .kt-settings-back-glass { box-shadow: 0 0 0 2px rgba(255, 255, 255, .85); }
  `;
    document.head.append(style);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'kt-settings-back';
    button.hidden = true;
    button.innerHTML = '<span class="kt-settings-back-glass" aria-hidden="true"><svg class="kt-settings-back-icon" viewBox="0 0 24 24" focusable="false"><path d="M14.5 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
    host.append(button);
    const syncName = () => { button.setAttribute('aria-label', t('ui.back')); };
    syncName();
    document.addEventListener(LOCALE_CHANGED_EVENT, syncName);
    /* Stand inside the top-left corner of the surface on top. */
    const place = () => {
        const anchor = settingsNavigation.top()?.anchor() ?? null;
        if (!anchor || !anchor.element.isConnected)
            return;
        const frame = host.getBoundingClientRect();
        const box = anchor.element.getBoundingClientRect();
        if (box.width <= 0 || box.height <= 0)
            return;
        button.style.left = `${Math.round(box.left - frame.left + anchor.x)}px`;
        button.style.top = `${Math.round(box.top - frame.top + anchor.y)}px`;
    };
    /* A sheet slides in over a fifth of a second and a page fades in: stand in the corner it arrives at, then follow it until it is still. */
    let settleTimers = [];
    const settle = () => {
        for (const timer of settleTimers)
            window.clearTimeout(timer);
        place();
        settleTimers = [60, 180, 320, 520].map((delay) => window.setTimeout(place, delay));
    };
    const watcher = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(place);
    let watched = null;
    settingsNavigation.subscribe(() => {
        const top = settingsNavigation.top();
        button.hidden = top === null;
        const element = top?.anchor()?.element ?? null;
        if (watcher && element !== watched) {
            watcher.disconnect();
            watched = element;
            if (element)
                watcher.observe(element);
        }
        if (top)
            settle();
    });
    window.addEventListener('resize', place, { passive: true });
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const before = settingsNavigation.depth();
        if (before === 0)
            return;
        settingsNavigation.back();
        /* Settings closed (the root level was left): focus goes back to the control that opened it. Otherwise stay on the control, which now belongs to the level that came back. */
        if (settingsNavigation.depth() === 0) {
            /* The page is still settling as the sheet closes (the opener may not take focus in this very task), so ask again once it has. */
            const returnFocus = () => {
                const opener = host.querySelector('.kt-profile-control');
                if (opener && !opener.hidden && document.activeElement !== opener)
                    opener.focus({ preventScroll: true });
            };
            returnFocus();
            window.requestAnimationFrame(returnFocus);
            window.setTimeout(returnFocus, 120);
        }
        else {
            button.focus({ preventScroll: true });
        }
    });
}
