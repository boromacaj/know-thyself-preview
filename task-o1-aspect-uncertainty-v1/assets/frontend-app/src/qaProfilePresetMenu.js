/*
 * QA PROFILE PRESETS: ONE SMALL CONTROL OF ITS OWN.
 *
 * A compact "QA" pill in the corner opens a short list of names, one tap each,
 * straight to a finished self-map.
 *
 * WHY IT NO LONGER LIVES IN THE OPTIONS SHEET.
 *
 * It used to be a third section under Theme and Language. That sheet is the
 * reader's profile menu now, and the profile menu does not exist until a
 * profile does - which is correct, and which left the presets unreachable at
 * exactly the moment a tester wants them: on a fresh root, with the onboarding
 * in front of them and nothing entered yet. Putting them in their own control
 * fixes both halves at once. They are reachable before onboarding, and they can
 * never turn up inside a reader's Settings, because they are no longer in the
 * panel Settings is built from.
 *
 * WHAT A TAP ACTUALLY DOES, and why it is only three calls:
 *
 *   1. finishIntro()        - end the opening sequence, which is a chain of
 *                             timers that would otherwise paint over the result
 *   2. loadQaProfile(preset) - the profile owner fills its own fields, its own
 *                             place bridge and its own committed snapshot, then
 *                             settles into the state onboarding itself ends in
 *   3. knowThyselfOpenHubFromCommitted() - the same compute-and-open the final
 *                             onboarding action performs
 *
 * Not one of those is a copy of anything. There is one committed profile, one
 * ProfileExperience pipeline, and this reaches them through the front door; the
 * onboarding is not touched, weakened or bypassed for anyone actually using it.
 * What a preset skips is the TYPING, not the machinery.
 */
import { QA_PROFILE_PRESETS } from './app/dev/qaProfilePresets.js';
import { clearDeviceOwnerProfiles } from './app/dev/ownerProfileImport.js';
import { resolveOwnerProfiles, resolveOwnerProfilesLocally } from './app/dev/ownerProfileResolver.js';
import { clearOwnerReviewCache, clearOwnerReviewToken, pairFromLocation } from './app/dev/ownerReviewDelivery.js';
import { devProfilePresetsEnabled } from './app/config/runtimeConfig.js';
import { qaProfileSet } from './app/config/runtimeConfig.js';
import { qaForecastEntry } from './app/dev/qaForecastEntry.js';
import { runQaForecastRoute } from './app/dev/qaForecastRoute.js';
import { qaTarotEntry } from './app/dev/qaTarotEntry.js';
import { LOCALE_CHANGED_EVENT, activeLocale, isLocale } from './app/i18n/locale.js';
import { applyLocale } from './localeControl.js';
import { readPremiumProfileBridge } from './app/premium-earth/premiumProfileBridge.js';
import { MENU_ONLY_CHROME_ATTRIBUTES, openedModuleOwnsScreen } from './menuOnlyChrome.js';
import { t } from './app/i18n/uiStrings.js';
/*
 * NOT IN PRODUCTION. The same flag the legacy intake presets have always used,
 * read through the same runtimeConfig helper - so there is one answer to "are
 * the dev shortcuts on" rather than two that can disagree.
 *
 * Checked before anything at all is built, so a production build carries no
 * stylesheet, no listener and no preset data in memory - not merely a hidden
 * control that a devtools inspector could unhide. The preset MODULE is still in
 * the bundle; what is gated is the surface that can act on it.
 */
if (devProfilePresetsEnabled) {
    const host = document.getElementById('place-experience');
    if (host instanceof HTMLElement)
        installQaProfilePresetMenu(host);
}
const openHub = () => (window
    .knowThyselfOpenHubFromCommitted?.() ?? false);
/* The opening sequence is a chain of timers. Left running it reaches the
   search reveal a second or two later and puts the birthplace step back on
   screen, over the reading the preset just opened - which is exactly the "lands
   on the birthplace step" bug. Ending it first is what makes a preset
   independent of how long ago the page loaded. */
const finishIntro = () => {
    window
        .knowThyselfFinishIntroNow?.();
};
function installQaProfilePresetMenu(host) {
    /* Before anything reads the stored token: a review link's fragment pairs this device and leaves the address bar. */
    pairFromLocation();
    /* The file import is retired: a file kept in this browser must never decide who is in the list. Its old key is cleared, once, so it cannot linger. */
    clearDeviceOwnerProfiles();
    const style = document.createElement('style');
    style.dataset.qaProfilePresets = 'true';
    /* NO BACKTICKS ANYWHERE IN THIS CSS, including inside comments: it is a
       template literal and one would end the string. */
    style.textContent = `
    /*
     * TOP LEFT, DELIBERATELY.
     *
     * The profile control owns the top right and the reading navigation owns
     * the bottom, so this is the one corner where a dev control collides with
     * nothing a reader uses. It is also the corner a reader's eye reaches last,
     * which is the right place for something that is not for them.
     */
    #place-experience .kt-qa-button[hidden] { display: none; }
    /* On the Main Menu it stands in the app bar (premium-earth-phase-a.css), top left, centred on the profile control
       (38px tall; this is 26px, so 6px lower), and its panel opens under it. */
    #place-experience[data-pillar-active="menu"] .kt-qa-button {
      top: calc(var(--kt-app-bar-top, 20px) + 6px);
      left: var(--kt-app-gutter, 12px);
    }
    #place-experience[data-pillar-active="menu"] .kt-qa-panel {
      top: calc(var(--kt-app-bar-top, 20px) + 6px + 34px);
      left: var(--kt-app-gutter, 12px);
    }
    #place-experience .kt-qa-button {
      position: absolute;
      top: var(--kt-top-space, max(calc(var(--safe-top, 0px) + 10px), 14px));
      left: 14px;
      z-index: 9000;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      height: 26px;
      margin: 0;
      padding: 0 9px;
      border: 1px dashed rgba(248, 252, 255, .40);
      border-radius: 8px;
      background: rgba(6, 9, 12, .34);
      backdrop-filter: blur(14px) saturate(1.06);
      -webkit-backdrop-filter: blur(14px) saturate(1.06);
      color: rgba(250, 250, 247, .72);
      font: inherit;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: .14em;
      text-transform: uppercase;
      pointer-events: auto;
      -webkit-tap-highlight-color: transparent;
      cursor: pointer;
    }

    #place-experience .kt-qa-panel {
      position: absolute;
      top: calc(var(--kt-top-space, max(calc(var(--safe-top, 0px) + 10px), 14px)) + 34px);
      left: 14px;
      z-index: 9000;
      width: min(74vw, 260px);
      max-height: min(62vh, 420px);
      overflow-y: auto;
      padding: 12px;
      border: 1px dashed rgba(248, 252, 255, .26);
      border-radius: 14px;
      background: rgba(6, 9, 12, .86);
      backdrop-filter: blur(18px) saturate(1.08);
      -webkit-backdrop-filter: blur(18px) saturate(1.08);
      box-shadow: 0 14px 36px rgba(0, 0, 0, .46);
      opacity: 0;
      transform: translateY(-6px);
      transition: opacity .18s ease, transform .18s ease;
      pointer-events: none;
    }

    #place-experience .kt-qa-panel.is-open {
      opacity: 1;
      transform: none;
      pointer-events: auto;
    }

    #place-experience .kt-qa-title {
      margin: 0 0 8px;
      font-size: 10px;
      letter-spacing: .16em;
      text-transform: uppercase;
      color: rgba(var(--kt-accent-soft-rgb, 247, 224, 173), .7);
    }

    #place-experience .kt-qa-options {
      display: grid;
      gap: 6px;
    }

    #place-experience .kt-qa-option {
      display: block;
      width: 100%;
      padding: 9px 11px;
      border: 1px solid rgba(var(--kt-accent-soft-rgb, 247, 224, 173), .2);
      border-radius: 12px;
      background: rgba(255, 255, 255, .04);
      color: rgba(235, 231, 221, .86);
      font: inherit;
      font-size: 12px;
      text-align: left;
      cursor: pointer;
    }

    /* Said once, quietly, under the list: these are not saved people. */
    #place-experience .kt-qa-note {
      margin: 8px 0 0;
      font-size: 9.5px;
      line-height: 1.4;
      color: rgba(235, 231, 221, .4);
    }

    /*
     * THE ONE LINE THAT SITS AT THIS HEIGHT KEEPS OUT OF THE WAY.
     *
     * Measured at 375px: the pill occupies 14-50px at the kicker's own line,
     * and the title below it starts lower than the pill ends. So the kicker
     * reserves the corner and nothing else moves - indenting the title as well
     * would push the reading's largest words in for no collision.
     *
     * Scoped to the flag, so a production build - which has no QA control at
     * all - has exactly the layout it had.
     */
    #place-experience[data-qa-control="on"] .kt-pillar-kicker,
    #place-experience[data-qa-control="on"] .kt-fc-kicker {
      padding-left: 40px;
    }

    /* The owner's own four profiles, kept on this device (see ownerProfileImport.ts): a quiet row under the note. */
    #place-experience .kt-qa-owner { display: grid; gap: 6px; margin: 10px 0 0; }
    #place-experience .kt-qa-owner-status { margin: 0; font-size: 9.5px; line-height: 1.4; color: rgba(235, 231, 221, .55); }
    #place-experience .kt-qa-owner-action {
      display: block; width: 100%; padding: 7px 10px; border: 1px dashed rgba(var(--kt-accent-soft-rgb, 247, 224, 173), .3); border-radius: 10px;
      background: transparent; color: rgba(235, 231, 221, .78); font: inherit; font-size: 11px; text-align: left; cursor: pointer;
    }
    #place-experience .kt-qa-owner-file { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }
  `;
    document.head.append(style);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'kt-qa-button';
    button.setAttribute('aria-expanded', 'false');
    /* The word is not translated. It marks a surface that is not for readers, and
       a reader who meets it should read it as machinery rather than as a feature
       their language has a word for. */
    button.textContent = 'QA';
    const panel = document.createElement('div');
    panel.className = 'kt-qa-panel';
    panel.setAttribute('role', 'group');
    const title = document.createElement('p');
    title.className = 'kt-qa-title';
    const options = document.createElement('div');
    options.className = 'kt-qa-options';
    options.setAttribute('role', 'group');
    const note = document.createElement('p');
    note.className = 'kt-qa-note';
    const setOpen = (open) => {
        panel.classList.toggle('is-open', open);
        /* Closed is inert, for the same reason the theme sheet's is: the panel is
           hidden by a transform and an opacity, which leaves its three presets in
           the tab order and in the accessibility tree behind every screen in the
           app. Same one-line fix, in the one place this panel opens and closes. */
        panel.inert = !open;
        button.setAttribute('aria-expanded', String(open));
    };
    /* Built closed, so it starts inert rather than waiting for the first toggle. */
    setOpen(false);
    /* MENU-ONLY. Once a module is open the control is gone - hidden, so it is not focusable or announced - and its panel
       is closed with it. The Main Menu (and the onboarding, before any reading) keeps it exactly as it was. */
    const syncMenuOnly = () => {
        const gone = openedModuleOwnsScreen(host);
        button.hidden = gone;
        if (gone)
            setOpen(false);
    };
    new MutationObserver(syncMenuOnly).observe(host, { attributes: true, attributeFilter: MENU_ONLY_CHROME_ATTRIBUTES });
    syncMenuOnly();
    /**
     * Load, calculate, open - in that order, and stop at the first thing that
     * refuses. A preset that cannot be loaded must not go on to open an empty
     * reading: the tester would be looking at the previous profile's results.
     */
    const applyPreset = (preset) => {
        /* First, so nothing the onboarding still had queued can run over the top of
           what follows. */
        finishIntro();
        const load = readPremiumProfileBridge()?.loadQaProfile;
        if (!load || !load(preset))
            return;
        if (!openHub())
            return;
        /* The panel has done its job; leaving it open would sit on top of the
           reading it just opened. */
        setOpen(false);
    };
    /* WHERE THE LIST COMES FROM is decided in one place, ownerProfileResolver.ts, with no notion of what device this is: the owner's API session, its cached
       delivery, an explicit file import, or the build's own sanitized people. `resolution` is what it last said; it is local at first and settled once the
       service has answered. */
    const resolverInput = { build: QA_PROFILE_PRESETS, qaProfileSet, hostname: window.location.hostname };
    let resolution = resolveOwnerProfilesLocally(resolverInput);
    const currentPresets = () => resolution.presets;
    let buttons = [];
    const renderOptions = () => {
        options.replaceChildren();
        buttons = currentPresets().map((preset) => {
            const option = document.createElement('button');
            option.type = 'button';
            option.className = 'kt-qa-option';
            option.dataset.qaPreset = preset.id;
            option.textContent = preset.menuLabel;
            /* One tap, no confirmation - it is a testing shortcut, and a preset
               overwrites nothing that was saved anywhere. */
            option.addEventListener('click', () => applyPreset(preset));
            options.append(option);
            return option;
        });
    };
    renderOptions();
    const ownerRow = document.createElement('div');
    ownerRow.className = 'kt-qa-owner';
    const ownerStatus = document.createElement('p');
    ownerStatus.className = 'kt-qa-owner-status';
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'kt-qa-owner-action';
    removeButton.dataset.qaOwnerRemove = 'true';
    removeButton.textContent = t('options.qaOwnerRemove');
    const statusKey = () => {
        switch (resolution.source) {
            case 'build-owner': return 'options.qaOwnerFromOwnerBuild';
            case 'api': return 'options.qaOwnerFromReview';
            case 'cached-api': return 'options.qaOwnerFromCache';
            case 'unavailable': return resolution.pending ? 'options.qaOwnerReviewLoading' : 'options.qaOwnerReviewFailed';
            default: return resolution.refused ? 'options.qaOwnerReviewRefused' : 'options.qaOwnerFromBuild';
        }
    };
    const hostWarning = document.createElement('p');
    hostWarning.className = 'kt-qa-owner-status kt-qa-owner-warning';
    hostWarning.dataset.qaOwnerHostMismatch = 'true';
    const syncOwnerRow = () => {
        ownerStatus.textContent = t(statusKey());
        removeButton.textContent = t('options.qaOwnerRemove');
        /* Only the protected remote-owner mode (a sanitized build, a paired device) has anything to forget; the owner build's list is the build's own. */
        removeButton.hidden = !resolution.paired;
        hostWarning.hidden = resolution.hostMismatch === null;
        hostWarning.textContent = resolution.hostMismatch === null ? '' : t('options.qaOwnerHostMismatch') + ' ' + resolution.hostMismatch;
        /* What this panel is showing and why, readable without a debugger - the same attributes on every device. */
        panel.dataset.ownerProfileSource = resolution.source;
        panel.dataset.ownerProfileSet = qaProfileSet;
        panel.dataset.ownerProfileApi = resolution.apiStatus === null ? 'none' : String(resolution.apiStatus);
        panel.dataset.ownerProfilePaired = String(resolution.paired);
        panel.dataset.ownerProfileCount = String(resolution.presets.length);
    };
    removeButton.addEventListener('click', () => {
        clearOwnerReviewToken();
        clearOwnerReviewCache();
        resolution = resolveOwnerProfilesLocally(resolverInput);
        renderOptions();
        syncLanguage();
    });
    ownerRow.append(ownerStatus, hostWarning, removeButton);
    syncOwnerRow();
    /* A paired device asks the service for its four records once per load and relists; `settled` lets ?qa=menu wait for the answer rather than open someone
       else's profile. An unpaired device resolves at once and asks nothing of the network. */
    const settled = resolveOwnerProfiles(resolverInput).then((settledResolution) => {
        resolution = settledResolution;
        renderOptions();
        syncLanguage();
    }, () => undefined);
    /* A pairing link opened in a tab that already shows this site changes only the fragment: the page is not reloaded, so the load-time read never sees it. The same
       door, again - pair, relist at once from what is local, settle with the service. (Nothing else in the page is told about it: the fragment is not a route.) */
    window.addEventListener('hashchange', () => {
        if (!pairFromLocation())
            return;
        resolution = resolveOwnerProfilesLocally(resolverInput);
        renderOptions();
        syncLanguage();
        void resolveOwnerProfiles(resolverInput).then((settledResolution) => {
            resolution = settledResolution;
            renderOptions();
            syncLanguage();
        }, () => undefined);
    });
    const syncLanguage = () => {
        title.textContent = t('options.qaProfiles');
        note.textContent = t('options.qaProfilesNote');
        panel.setAttribute('aria-label', t('options.qaProfiles'));
        options.setAttribute('aria-label', t('options.qaProfiles'));
        button.setAttribute('aria-label', t('options.qaProfiles'));
        /* The names themselves are not translated - they are the data. */
        for (const option of buttons)
            option.disabled = false;
        syncOwnerRow();
    };
    /*
     * ?qa=tarot: do what a tester does by hand, once, through the same two doors - the preset, then the Tarot control in the
     * strip. Nothing here draws or opens Tarot itself: the strip's own control does, so the real navigation, the real screen
     * and the real card dialog are what get exercised. Waiting is by timer, not by frame, so it also runs in a tab that is
     * not being painted. If something never appears the route simply stops; the page is the ordinary one.
     */
    const qaTarot = qaTarotEntry(window.location.search, devProfilePresetsEnabled);
    if (qaTarot) {
        const until = async (read, limitMillis) => {
            const startedAt = Date.now();
            for (;;) {
                const found = read();
                if (found !== null)
                    return found;
                if (Date.now() - startedAt > limitMillis)
                    return null;
                await new Promise((resolve) => { window.setTimeout(resolve, 60); });
            }
        };
        void (async () => {
            const ready = await until(() => (readPremiumProfileBridge()?.loadQaProfile && typeof window.knowThyselfOpenHubFromCommitted === 'function' ? true : null), 20000);
            if (!ready)
                return;
            applyPreset(qaTarot);
            const control = await until(() => {
                const tarot = host.querySelector('button[data-tarot-open]');
                return tarot && !tarot.closest('[inert]') ? tarot : null;
            }, 20000);
            control?.click();
        })();
    }
    /*
     * ?qa=forecast: the same doors for the Forecast - the preset, the Forecast card on the main menu, the level control (Month unless ?qaLevel=year|day) - but as a
     * sequence that reads each result back (app/dev/qaForecastRoute.ts). In English, on Month or Year, it is done only when the graph block is on screen. Its progress is written to
     * <html data-qa-forecast="..."> and window.knowThyselfQaRoute, and a stop is shown on the page, so a route that did not arrive can never pass for one that did.
     */
    const qaForecast = qaForecastEntry(window.location.search, devProfilePresetsEnabled);
    if (qaForecast) {
        const present = (status) => {
            document.documentElement.dataset.qaForecast = status.phase === 'running' ? `running:${status.step}` : status.phase === 'ready' ? 'ready' : `failed:${status.step}`;
            window.knowThyselfQaRoute = status;
            if (status.phase === 'failed')
                console.warn(`[qa=forecast] stopped at "${status.step}": ${status.detail}`);
            else
                console.info(`[qa=forecast] ${status.phase} (${status.step}): ${status.detail}`);
            const existing = document.querySelector('.kt-qa-route');
            if (status.phase !== 'failed') {
                existing?.remove();
                return;
            }
            const banner = existing instanceof HTMLElement ? existing : document.createElement('div');
            banner.className = 'kt-qa-route';
            banner.setAttribute('role', 'alert');
            banner.textContent = `Review route stopped at "${status.step}": ${status.detail}. Tap to dismiss.`;
            banner.style.cssText = 'position:fixed;left:8px;right:8px;bottom:8px;z-index:12500;padding:12px 14px;border-radius:12px;'
                + 'font:13px/1.4 system-ui,sans-serif;color:#fff;background:rgba(120,30,40,0.94);border:1px solid rgba(255,255,255,0.4);';
            banner.onclick = () => banner.remove();
            if (!banner.isConnected)
                document.body.append(banner);
        };
        const usable = (element) => (element instanceof HTMLElement && !element.closest('[inert]') && !element.closest('[hidden]') ? element : null);
        present({ phase: 'running', step: 'app', detail: 'queued' });
        void runQaForecastRoute(qaForecast, {
            now: () => Date.now(),
            sleep: (milliseconds) => new Promise((resolve) => { window.setTimeout(resolve, milliseconds); }),
            appReady: () => Boolean(readPremiumProfileBridge()?.loadQaProfile)
                && typeof window.knowThyselfOpenHubFromCommitted === 'function',
            applyPreset: (entry) => { if (entry.preset)
                applyPreset(entry.preset); },
            forecastCard: () => {
                const card = host.querySelector('button[data-forecast-open]');
                return card && !card.closest('[inert]') ? card : null;
            },
            levelControl: (level) => usable(document.querySelector(`#forecast-view [data-forecast-level="${level}"]`)),
            activeLevel: () => document.querySelector('#forecast-view .kt-fc-level.is-active')?.dataset.forecastLevel ?? null,
            graphKind: () => document.querySelector('#forecast-view [data-forecast-graph]')?.dataset.fgKind ?? null,
            reviewOn: () => Boolean(document.querySelector('#forecast-view .kt-forecast.kt-fg-on')),
            locale: () => activeLocale(),
            setLocale: (language) => { if (isLocale(language))
                applyLocale(language, false); },
            report: present,
        });
    }
    syncLanguage();
    /*
     * ON `document`, WHICH IS WHERE THE EVENT IS ACTUALLY FIRED.
     *
     * It was on `window`, and the event is dispatched on `document` without
     * `bubbles`, so it never arrived: this group kept the language it was built
     * in for the life of the session while everything around it changed. Every
     * other consumer listens on `document`; this was the one that did not.
     */
    document.addEventListener(LOCALE_CHANGED_EVENT, syncLanguage);
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        setOpen(!panel.classList.contains('is-open'));
    });
    /* Dismissing must never reach the globe or any onboarding control underneath. */
    document.addEventListener('pointerdown', (event) => {
        if (!panel.classList.contains('is-open'))
            return;
        const target = event.target;
        if (target instanceof Node && (panel.contains(target) || button.contains(target)))
            return;
        setOpen(false);
    }, true);
    /*
     * ONE URL FOR A REVIEWER: `?qa=menu`.
     *
     * A visitor with no profile cannot see the menu - it is a destination of a
     * finished profile, and the hash alone opens nothing without one. On a
     * review build the way in was QA pill, a name, "Materialize", then the Menu
     * stop: four taps on a phone, and the first one is easy to lose to the
     * opening sequence. This does those same steps from the address, so a link is
     * enough. It is the QA control's own gesture - the first preset, then the
     * strip's own Menu button - not a second way into the menu, and it lives in
     * this block, so a build without the dev flag does not carry it.
     */
    if (new URLSearchParams(window.location.search).get('qa') === 'menu') {
        let lastApplied = 0;
        let startedAt = Date.now();
        let ready = false;
        void settled.then(() => { ready = true; startedAt = Date.now(); });
        const timer = window.setInterval(() => {
            if (!ready)
                return;
            const first = currentPresets()[0];
            if (Date.now() - startedAt > 30000) {
                window.clearInterval(timer);
                return;
            }
            if (host.dataset.pillarActive === 'menu') {
                window.clearInterval(timer);
                return;
            }
            /* The strip's Menu button, once the portrait it floats over has finished arriving: visible, and no longer inert
               (the transition locks the strip while it runs and unlocks it at the end). */
            const menu = host.querySelector('button[data-menu-open]');
            if (menu && menu.offsetParent !== null && !menu.closest('[inert]')) {
                window.clearInterval(timer);
                menu.click();
                return;
            }
            /* Otherwise apply the preset - once its owner has registered its loader, and again every few seconds: a tap that
               lands while the opening sequence is still running is refused, exactly as it is by hand. */
            if (!first || !readPremiumProfileBridge()?.loadQaProfile || Date.now() - lastApplied < 6000)
                return;
            lastApplied = Date.now();
            applyPreset(first);
        }, 200);
    }
    panel.append(title, options, note, ownerRow);
    host.append(button, panel);
    /* Only a build that actually carries the control reserves room for it. */
    host.dataset.qaControl = 'on';
}
