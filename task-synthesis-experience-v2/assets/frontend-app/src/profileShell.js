import { LOCALE_CHANGED_EVENT } from './localeControl.js?v=53c0693';
import { birthTimeText } from './birthTimeInput.js?v=53c0693';
import { engineProse, signWord } from './app/i18n/engineProse.js?v=53c0693';
import { t } from './app/i18n/uiStrings.js?v=53c0693';
import { settingsNavigation } from './app/settings/settingsNavigation.js?v=53c0693';
import { dateLocale } from './app/i18n/dateLocale.js?v=53c0693';
import { escapeHtml } from './app/format.js?v=53c0693';
import { clearStoredAvatar, localityOf, readStoredAvatar, writeStoredAvatar, } from './app/premium-earth/avatarStore.js?v=53c0693';
import { openAvatarEditor } from './app/premium-earth/avatarEditor.js?v=53c0693';
import { readPremiumProfileBridge } from './app/premium-earth/premiumProfileBridge.js?v=53c0693';
import { MENU_ONLY_CHROME_ATTRIBUTES, openedModuleOwnsScreen } from './menuOnlyChrome.js?v=53c0693';
import { readPremiumResult, subscribeToPremiumResult } from './app/premium-earth/premiumResultStore.js?v=53c0693';
/*
 * THE PROFILE LAYER, WHICH IS NOT A SEVENTH READING.
 *
 * Every ordinary application has a small identity in its chrome that opens a
 * personal area: who you are, your photo, your settings. This product had no
 * such thing. It had a floating dot that opened a panel called "Options",
 * holding a theme picker, a language switch and - in a dev build - a list of QA
 * profiles, and nowhere at all that answered "whose account is this?".
 *
 * WHAT THIS IS
 *   [photo] <given name>   in the chrome, once a profile exists - the reader's
 *                          own first name, taken from the committed profile and
 *                          never from a sample, a preset or a default
 *   -> a sheet holding the person's own facts, their photo, the way back into
 *      the existing editor, and Settings.
 *
 * WHAT IT IS NOT
 * It carries no interpretation. Not a sentence of it. The six destinations are
 * where a conclusion belongs, and a profile screen that starts explaining what
 * a Life Path 7 means is a seventh pillar wearing a settings icon. What it
 * shows is the index: the data the reader typed, and the handful of names the
 * four systems assign them - the things a person uses to recognise their own
 * account, all of them already computed and none of them re-derived here.
 *
 * IT ADOPTS THE EXISTING SHEET RATHER THAN BUILDING A SECOND ONE.
 * `onboardingThemePlayground` owns a panel that already solves opening,
 * dismissal, pointer handling, focus and re-labelling on a language change, and
 * `localeControl` already appends into it from outside without the theme module
 * knowing. This does the same, one level up: it takes that panel over, puts the
 * profile above the controls and files the controls under a Settings heading.
 * Two panels would mean two of everything and, worse, two places to change a
 * theme - which is the duplication this task exists to end.
 *
 * THE TRIGGER SWAPS, IT DOES NOT MULTIPLY. During onboarding there is no
 * profile, so the dot stays exactly as it was. The moment a profile is computed
 * the dot steps aside and the identity takes its place. One control, one sheet,
 * whichever half of the product you are in.
 */
const experience = document.getElementById('place-experience');
if (experience instanceof HTMLElement)
    installProfileShell(experience);
function installProfileShell(host) {
    /* ------------------------------------------------------------- the facts */
    const firstNameOf = (given) => given.trim().split(/\s+/)[0] ?? '';
    const identityOf = (committed) => {
        const given = committed?.birthName?.trim() ?? '';
        const first = firstNameOf(given);
        if (!first)
            return null;
        const family = committed?.birthSurname?.trim() ?? '';
        return { name: `${given} ${family}`.trim(), first };
    };
    const identity = () => identityOf(readPremiumProfileBridge()?.readCommittedProfile());
    /*
     * IS THERE A PROFILE ON SCREEN AT ALL.
     *
     * Three conditions, and all three are needed. A reading has to own the screen
     * (so the identity cannot follow the reader back into the onboarding, where
     * no profile exists yet); the engine has to have accepted the profile; and
     * there has to be somebody to name. The control and the sheet both ask this
     * one question - which is the point, because hiding the control while leaving
     * the menu behind it populated is exactly the bug this replaced.
     */
    const profileOnScreen = () => (host.dataset.pillarStage === 'pillar'
        && readPremiumResult().status === 'ready'
        && identity() !== null
        /* The identity lives on the Main Menu only: an opened module has no profile control and no profile sheet. */
        && !openedModuleOwnsScreen(host));
    /**
     * The birth date as the reader's locale writes it.
     *
     * `dateLocale()` is the same resolver the forecast and the review screen use,
     * so a date is spelled one way across the product rather than three.
     */
    const formatDate = (iso) => {
        const [year, month, day] = iso.split('-').map(Number);
        if (!year || !month || !day)
            return iso;
        try {
            return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString(dateLocale(), {
                day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
            });
        }
        catch {
            return iso;
        }
    };
    /**
     * Everything the sheet shows, gathered once per render.
     *
     * All of it is READ. The committed profile comes from the bridge the whole
     * app already reads, and the four identifiers come off the computed result
     * that the six readings are built from - the same `keyOutputs` the pillar
     * screens print. Nothing here calculates, so nothing here can disagree with a
     * reading.
     */
    const gather = () => {
        const committed = readPremiumProfileBridge()?.readCommittedProfile();
        const who = identityOf(committed);
        if (!committed || !who)
            return null;
        const { name, first } = who;
        const facts = [];
        const add = (label, value) => {
            if (value && value.trim().length > 0)
                facts.push({ label, value: value.trim() });
        };
        add(t('profile.field.birthDate'), formatDate(committed.birthDate));
        /* "12:05", "Approx. 03:00" or "Not known" - the reader's answer, never
           the 12:00 the engines calculate an unknown time from. */
        add(t('profile.field.birthTime'), birthTimeText(committed, 'profile.field.birthTimeUnknown'));
        /*
         * THE ADDRESS IS REDUCED, THE COORDINATES ARE NOT.
         *
         * A map tap can store a doorstep - "SNP 2103/19, 934 01 Levice, Slovensko".
         * The latitude and longitude behind it are what every birth-moment pillar
         * derives from and they are untouched; what changes is only what a profile
         * screen prints, which has no use for a house number and every reason not
         * to show one.
         */
        const candidate = committed.placeSelection?.candidate ?? null;
        if (candidate)
            add(t('profile.field.birthPlace'), localityOf(candidate.label, candidate.country));
        const result = readPremiumResult();
        const experienceResult = result.status === 'ready' ? result.experience : null;
        if (experienceResult) {
            const pillar = (id) => experienceResult.pillars.find((entry) => entry.id === id);
            const output = (id, label) => (pillar(id)?.keyOutputs?.find((entry) => entry.label === label)?.value ?? null);
            const sun = pillar('western-astrology')?.westernAstrologyChart?.astrology
                ?.ephemeris?.positions?.find((position) => position.body === 'Sun');
            if (sun?.sign)
                add(t('profile.field.western'), signWord(sun.sign));
            const bazi = pillar('bazi-tcm')?.baziChart?.bazi;
            const year = bazi?.yearPillar;
            if (year?.stem?.element && year?.branch?.animal) {
                add(t('profile.field.chinese'), engineProse(`${year.stem.element} ${year.branch.animal}`));
            }
            const lifePath = experienceResult.coreResult?.numerologyOutput?.rawOutput
                ?.lifePathNumber?.finalNumber;
            if (lifePath)
                add(t('profile.field.lifePath'), String(lifePath));
            if (bazi?.dayMaster?.name && bazi.dayMaster.element) {
                add(t('profile.field.dayMaster'), engineProse(`${bazi.dayMaster.name} ${bazi.dayMaster.element}`));
            }
            const hdType = output('human-design', 'Type');
            if (hdType)
                add(t('profile.field.humanDesign'), engineProse(hdType));
        }
        return { name, first, facts };
    };
    /* ----------------------------------------------------------- the control */
    /*
     * A default that is a shape rather than a picture.
     *
     * No stock silhouette: this is a product about a specific person and a
     * generic head standing in for them reads worse than a monogram does. The
     * initial is the reader's own, and it takes the accent the rest of the
     * interface is already wearing.
     */
    const control = document.createElement('button');
    control.type = 'button';
    control.className = 'kt-profile-control';
    control.hidden = true;
    control.setAttribute('aria-expanded', 'false');
    control.innerHTML = `
    <span class="kt-profile-avatar" aria-hidden="true"><span class="kt-profile-initial"></span></span>
    <span class="kt-profile-first"></span>`;
    const avatarOf = (element) => (element?.querySelector('.kt-profile-avatar') ?? null);
    /** Paints one avatar element: the photo if there is one, the initial if not. */
    const paintAvatar = (element, initial) => {
        if (!element)
            return;
        const photo = readStoredAvatar();
        element.classList.toggle('has-photo', Boolean(photo));
        element.style.backgroundImage = photo ? `url("${photo}")` : '';
        const mark = element.querySelector('.kt-profile-initial');
        /* One character, taken with Array.from so a name beginning with a surrogate
           pair or a combining mark does not come out as half a glyph. */
        if (mark)
            mark.textContent = photo ? '' : (Array.from(initial)[0] ?? '').toUpperCase();
    };
    /* --------------------------------------------------------------- the sheet */
    let sheetBlock = null;
    const renderSheet = () => {
        if (!sheetBlock)
            return;
        const data = profileOnScreen() ? gather() : null;
        /*
         * NO PROFILE ON SCREEN MEANS NO PROFILE MENU EITHER.
         *
         * Hiding the control used to be the whole of it, and the sheet it opens
         * kept whatever it had last been given. So the theme dot on the birthplace
         * step - a surface that exists precisely because no profile does yet -
         * opened a panel holding somebody's name, photo, birth date and birthplace.
         * Emptying the block leaves the plain Options panel the onboarding has
         * always had: theme, language, and nothing that claims an account.
         */
        if (!data) {
            sheetBlock.replaceChildren();
            return;
        }
        sheetBlock.innerHTML = `
      <div class="kt-profile-identity">
        <span class="kt-profile-avatar is-large" aria-hidden="true">
          <span class="kt-profile-initial"></span>
        </span>
        <div class="kt-profile-identity-text">
          <p class="kt-profile-name">${escapeHtml(data.name)}</p>
          <div class="kt-profile-photo-actions">
            <button type="button" class="kt-profile-link" data-profile-photo>
              ${escapeHtml(t('profile.changePhoto'))}
            </button>
            <button type="button" class="kt-profile-link" data-profile-photo-remove hidden>
              ${escapeHtml(t('profile.removePhoto'))}
            </button>
          </div>
        </div>
      </div>
      <p class="kt-profile-error" role="status" hidden></p>
      <dl class="kt-profile-facts">
        ${data.facts.map((fact) => `
          <div class="kt-profile-fact">
            <dt>${escapeHtml(fact.label)}</dt>
            <dd>${escapeHtml(fact.value)}</dd>
          </div>`).join('')}
      </dl>
      <button type="button" class="kt-profile-action" data-pillar-review>
        ${escapeHtml(t('profile.editBirth'))}
      </button>`;
        paintAvatar(avatarOf(sheetBlock), data.first);
        const remove = sheetBlock.querySelector('[data-profile-photo-remove]');
        if (remove)
            remove.hidden = !readStoredAvatar();
    };
    /*
     * SETTINGS TAKES OWNERSHIP OF THE CONTROLS THAT WERE ALREADY THERE.
     *
     * The theme picker and the language switch are MOVED, not rebuilt. They keep
     * their own elements, their own listeners and their own re-labelling, so this
     * module cannot break either of them and either can be lifted out again
     * without unpicking anything. What changes is where they sit and what the
     * heading above them says.
     *
     * The empty `kt-profile-future` list is the place a font size or a contrast
     * control goes when there is one. It renders nothing today.
     */
    const restructure = (sheet) => {
        if (sheet.querySelector('.kt-profile-block'))
            return;
        sheetBlock = document.createElement('div');
        sheetBlock.className = 'kt-profile-block';
        const settings = document.createElement('div');
        settings.className = 'kt-profile-settings';
        settings.innerHTML = `<h3 class="kt-profile-settings-title"></h3>`;
        /* The sheet is a frame; what scrolls is this inner scroller, which starts BELOW the corner the Settings Back floats in, so content never passes under the control. */
        const scroller = document.createElement('div');
        scroller.className = 'kt-theme-sheet-scroll';
        /* Everything the sheet already held, in the order it held it. */
        const existing = [...sheet.children];
        scroller.append(sheetBlock, settings);
        sheet.append(scroller);
        for (const child of existing) {
            /* The QA presets are a dev surface and are not part of Settings. They
               stay behind their own flag - which is what puts them here at all - and
               move to the end under a heading that says what they are. */
            if (child.classList.contains('kt-qa-group')) {
                scroller.append(child);
                continue;
            }
            settings.append(child);
        }
        const futures = document.createElement('div');
        futures.className = 'kt-profile-future';
        settings.append(futures);
        /*
         * AND WHATEVER ARRIVES LATER.
         *
         * `localeControl` and the QA menu both attach by watching for the sheet, so
         * whichever of the three of us runs last appends into a sheet the others
         * have already rearranged. Ordering the imports would only move the problem
         * to the next module that does this. Instead the settings block adopts any
         * group that turns up afterwards - which is also what makes a future
         * control need no knowledge of this file at all.
         */
        const adopt = () => {
            for (const group of [...sheet.children]) {
                if (!(group instanceof HTMLElement))
                    continue;
                if (group === scroller)
                    continue;
                if (group.classList.contains('kt-qa-group')) {
                    /* Dev surface: out of Settings, at the end, under its own heading. */
                    scroller.append(group);
                    continue;
                }
                settings.insertBefore(group, futures);
            }
        };
        adopt();
        new MutationObserver(adopt).observe(sheet, { childList: true });
    };
    /* ------------------------------------------------------------ the photo */
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.hidden = true;
    host.append(input);
    const showError = (message) => {
        const target = sheetBlock?.querySelector('.kt-profile-error');
        if (!target)
            return;
        target.textContent = message;
        target.hidden = message.length === 0;
    };
    /*
     * THE READER FRAMES IT, THEN IT IS STORED.
     *
     * This used to crop on the spot - shortest side, centred - which is a decent
     * guess and no choice at all. The editor owns the framing now and hands back
     * the same thing the old crop did: one square data URL, already at storage
     * size. Everything after this line is exactly what it was, which is the
     * point: the key, the size limit, the local-only storage and the refusal to
     * upload are the store's, and the store did not change.
     *
     * A cancel resolves with null - the existing avatar is not touched, not
     * cleared and not rewritten.
     */
    input.addEventListener('change', () => {
        const file = input.files?.[0];
        input.value = '';
        if (!file)
            return;
        showError('');
        void openAvatarEditor(file)
            .then((dataUrl) => {
            if (dataUrl === null)
                return;
            if (!writeStoredAvatar(dataUrl)) {
                showError(t('profile.photoTooBig'));
                return;
            }
            repaint();
        })
            .catch(() => showError(t('profile.photoFailed')));
    });
    /* --------------------------------------------------------------- wiring */
    const repaint = () => {
        const data = gather();
        if (!data)
            return;
        const first = control.querySelector('.kt-profile-first');
        if (first)
            first.textContent = data.first;
        control.setAttribute('aria-label', `${t('profile.open')} · ${data.name}`);
        paintAvatar(avatarOf(control), data.first);
        paintAvatar(avatarOf(sheetBlock), data.first);
        const remove = sheetBlock?.querySelector('[data-profile-photo-remove]');
        if (remove)
            remove.hidden = !readStoredAvatar();
    };
    /**
     * The other half of repaint: there is nobody, so nothing names anybody.
     *
     * The control is hidden by the caller, but hidden is not empty - a stale name
     * left in it still reaches a screen reader through the label, and the sheet
     * behind it is a real menu the theme dot can still open. Both are cleared,
     * which returns the panel to the plain Options the onboarding has always had.
     */
    const forget = () => {
        const first = control.querySelector('.kt-profile-first');
        if (first)
            first.textContent = '';
        /* The monogram too: an initial is still somebody's initial, and leaving one
           behind is how the next person's control flashes the last person's letter
           for a frame before it repaints. */
        const mark = control.querySelector('.kt-profile-initial');
        if (mark)
            mark.textContent = '';
        control.removeAttribute('aria-label');
        sheetBlock?.replaceChildren();
    };
    host.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Element))
            return;
        if (target.closest('[data-profile-photo-remove]')) {
            clearStoredAvatar();
            showError('');
            repaint();
            return;
        }
        if (target.closest('[data-profile-photo]')) {
            showError('');
            input.click();
        }
    });
    /*
     * THE IDENTITY APPEARS WHEN THERE IS AN IDENTITY, AND ONLY ON A READING.
     *
     * Before a profile is computed there is nobody to name, so the dot the theme
     * module put there stays and nothing about onboarding changes. Once the
     * engine has a result the dot hides and the identity takes the same corner -
     * one control in one place, never two.
     *
     * A COMPUTED RESULT IS NOT ENOUGH, AND THAT WAS THE BUG.
     * The first version asked only whether a result existed. A result outlives
     * the screen that produced it: "Edit birth details" walks back to Review, and
     * "Change place" from there walks back to the birthplace map - both of them
     * pre-profile surfaces, both of them still holding a ready result in module
     * memory, and the identity sat on top of the onboarding the whole way. The
     * same memory would have carried it over a front door reached again without a
     * reload.
     *
     * So presence asks the screen, not the store. `data-pillar-stage` is set by
     * the pillar controller and by the forecast when a reading takes the screen,
     * and deleted when the reader is handed back to the onboarding cards - it is
     * already how the intro sequence, the overlay routes and the scroll rotation
     * ask the same question. Being a DOM flag rather than a stored value, it is
     * also what makes this SESSION-scoped for free: no saved profile can set it,
     * so a front door is a front door however many times the device has been
     * through onboarding.
     */
    const themeButton = () => host.querySelector('.kt-theme-button');
    /**
     * Shuts the panel, tells both triggers it is shut, and takes it out of the
     * document entirely when there is no profile.
     *
     * Closed, for this panel, means opacity zero and pointer-events none - which
     * is invisible and inert but still present, still in the accessibility tree
     * and still holding somebody's settings. Before a profile exists none of that
     * should be reachable by any route, so it is `hidden` as well as closed.
     */
    const closeSheet = (present) => {
        const sheet = host.querySelector('.kt-theme-sheet');
        if (sheet) {
            if (!present)
                sheet.classList.remove('is-open');
            sheet.hidden = !present;
        }
        if (!present) {
            themeButton()?.setAttribute('aria-expanded', 'false');
            control.setAttribute('aria-expanded', 'false');
        }
    };
    const syncPresence = () => {
        const ready = profileOnScreen();
        control.hidden = !ready;
        /* The headings reserve room for the control only while it is there, so
           onboarding keeps exactly the layout it had. */
        if (ready)
            host.dataset.profileControl = 'on';
        else
            delete host.dataset.profileControl;
        /*
         * THE PANEL IS CLOSED AND UNREACHABLE UNTIL THERE IS A PROFILE.
         *
         * The dot used to take the corner whenever the identity was not in it, so
         * onboarding carried a control opening a panel of theme, language and - in
         * a dev build - QA profiles, before the reader had entered a name. The dot
         * is hidden from birth now; the identity is the only thing that opens this
         * panel, and closing it here is what stops an open panel outliving the
         * reading it was opened from, on the way back into the editor.
         */
        closeSheet(ready);
        if (ready) {
            renderSheet();
            repaint();
        }
        else
            forget();
    };
    const attach = (sheet) => {
        restructure(sheet);
        const title = sheet.querySelector('.kt-theme-sheet-title');
        /* The sheet's own title becomes the profile's; the theme keeps its heading
           inside Settings, where `options.theme` now reads simply "Theme". */
        const settingsTitle = sheet.querySelector('.kt-profile-settings-title');
        const syncLanguage = () => {
            if (settingsTitle)
                settingsTitle.textContent = t('profile.settings');
            const devGroup = sheet.querySelector('.kt-qa-group');
            if (devGroup)
                devGroup.dataset.devLabel = t('profile.devSection');
            syncPresence();
        };
        /* The control opens the sheet the same way the dot does, by pressing it. */
        control.addEventListener('click', (event) => {
            event.stopPropagation();
            const dot = themeButton();
            if (!dot)
                return;
            const open = sheet.classList.contains('is-open');
            control.setAttribute('aria-expanded', String(!open));
            if (!open)
                renderSheet();
            dot.click();
        });
        /*
         * THE SHEET IS THE ROOT LEVEL OF THE SETTINGS NAVIGATION (app/settings/settingsNavigation.ts).
         *
         * What the navigation asks of it is to be shown and hidden, and it does both the way the sheet already opens and closes: by pressing the theme module's own button, which is also
         * what the identity control above does. Nothing else about opening or closing the sheet changes. The sheet's class is its one truth: whenever it opens by itself (the identity
         * control, a tap) it is entered into the navigation, and whenever it closes by itself (a tap outside it, the reading underneath leaving) it is taken out, so the navigation never
         * claims a level that is not on screen. A close the navigation asked for while a child covers it is not "by itself", and is told apart by the flag.
         */
        let hiddenByNavigation = false;
        const settingsLevel = {
            id: 'settings',
            show() {
                if (sheet.classList.contains('is-open'))
                    return;
                control.setAttribute('aria-expanded', 'true');
                renderSheet();
                themeButton()?.click();
            },
            hide() {
                if (!sheet.classList.contains('is-open'))
                    return;
                hiddenByNavigation = true;
                control.setAttribute('aria-expanded', 'false');
                themeButton()?.click();
            },
            anchor: () => (sheet.classList.contains('is-open') ? { element: sheet, x: 11, y: 11 } : null),
        };
        new MutationObserver(() => {
            if (sheet.classList.contains('is-open')) {
                hiddenByNavigation = false;
                settingsNavigation.adopt(settingsLevel);
            }
            else if (hiddenByNavigation) {
                hiddenByNavigation = false;
            }
            else {
                settingsNavigation.drop('settings');
            }
        }).observe(sheet, { attributes: true, attributeFilter: ['class'] });
        /* Dismissal is the theme module's; this only has to not be treated as
           "outside" by it, which `stopPropagation` above already handles. */
        document.addEventListener('pointerdown', (event) => {
            if (!sheet.classList.contains('is-open'))
                return;
            const target = event.target;
            if (target instanceof Node && control.contains(target))
                return;
            control.setAttribute('aria-expanded', 'false');
        }, true);
        document.addEventListener(LOCALE_CHANGED_EVENT, syncLanguage);
        subscribeToPremiumResult(syncPresence);
        new MutationObserver(syncPresence).observe(host, {
            attributes: true, attributeFilter: ['data-pillar-result', ...MENU_ONLY_CHROME_ATTRIBUTES],
        });
        void title;
        syncLanguage();
        syncPresence();
    };
    /* The theme module builds its sheet on its own schedule, so this waits for it
       exactly the way localeControl does rather than depending on import order. */
    const existing = host.querySelector('.kt-theme-sheet');
    if (existing) {
        host.append(control);
        attach(existing);
    }
    else {
        const observer = new MutationObserver(() => {
            const sheet = host.querySelector('.kt-theme-sheet');
            if (!sheet)
                return;
            observer.disconnect();
            host.append(control);
            attach(sheet);
        });
        observer.observe(host, { childList: true, subtree: true });
    }
    installStyles();
}
function installStyles() {
    const style = document.createElement('style');
    style.dataset.profileShell = 'true';
    /* NO BACKTICKS ANYWHERE IN THIS CSS, including inside comments: it is a
       template literal and one would end the string. */
    style.textContent = `
    /* The identity in the chrome. Sits where the options dot sat, so it cannot
       collide with the nav strip at the bottom or the reading between them. */
    #place-experience .kt-profile-control[hidden] { display: none; }
    /* On the Main Menu it stands in the app bar (premium-earth-phase-a.css), at the top right under the safe area. */
    #place-experience[data-pillar-active="menu"] .kt-profile-control {
      top: var(--kt-app-bar-top, 20px);
      right: var(--kt-app-gutter, 12px);
    }
    #place-experience .kt-profile-control {
      position: absolute;
      top: var(--kt-top-space, max(calc(var(--safe-top, 0px) + 10px), 14px));
      right: 14px;
      z-index: 9000;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      max-width: min(52vw, 210px);
      height: 38px;
      margin: 0;
      padding: 0 12px 0 4px;
      border: 1px solid rgba(248, 252, 255, .42);
      border-radius: 999px;
      color: rgba(250, 250, 247, .90);
      background: rgba(6, 9, 12, .34);
      box-shadow: 0 0 10px rgba(var(--kt-accent-rgb), .22);
      backdrop-filter: blur(14px) saturate(1.06);
      -webkit-backdrop-filter: blur(14px) saturate(1.06);
      font: inherit;
      font-size: 13px;
      letter-spacing: .01em;
      pointer-events: auto;
      -webkit-tap-highlight-color: transparent;
      cursor: pointer;
    }

    #place-experience .kt-profile-first {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    #place-experience .kt-profile-avatar {
      display: grid;
      place-items: center;
      flex: 0 0 auto;
      width: 30px;
      height: 30px;
      border-radius: 999px;
      background-color: rgba(var(--kt-accent-rgb), .30);
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      box-shadow: inset 0 0 0 1px rgba(248, 252, 255, .34);
      color: rgba(250, 250, 247, .92);
      font-size: 13px;
      font-weight: 600;
      line-height: 1;
    }

    #place-experience .kt-profile-avatar.is-large {
      width: 64px;
      height: 64px;
      font-size: 25px;
    }

    /* ------------------------------------------------------- the sheet */

    #place-experience .kt-profile-block {
      margin: 0 0 14px;
    }

    #place-experience .kt-profile-identity {
      display: flex;
      align-items: center;
      gap: 13px;
      margin-bottom: 12px;
    }

    #place-experience .kt-profile-identity-text { min-width: 0; }

    #place-experience .kt-profile-name {
      margin: 0 0 4px;
      color: rgba(250, 250, 247, .94);
      font-family: Georgia, "Times New Roman", serif;
      font-size: 17px;
      line-height: 1.2;
    }

    #place-experience .kt-profile-photo-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    #place-experience .kt-profile-link {
      padding: 0;
      border: 0;
      border-bottom: 1px solid rgba(var(--kt-accent-rgb), .45);
      border-radius: 0;
      background: none;
      color: rgba(var(--kt-accent-rgb), .92);
      font: inherit;
      font-size: 12px;
      cursor: pointer;
    }

    #place-experience .kt-profile-error {
      margin: 0 0 10px;
      color: rgba(250, 226, 226, .88);
      font-size: 12px;
      line-height: 1.4;
    }

    /* The menu follows Interface Color: its hairlines take the Surface Border
       role and its fact rows the Surface Fill role, each over the colour it
       always had. (Owner decision D3, 2026-09-28.) */
    #place-experience .kt-profile-facts {
      display: grid;
      gap: 1px;
      margin: 0 0 12px;
      overflow: hidden;
      border-radius: 12px;
      background: rgba(var(--kt-surface-border-rgb, 248, 252, 255), .09);
    }

    #place-experience .kt-profile-fact {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 14px;
      padding: 8px 11px;
      background: rgba(var(--kt-surface-fill-rgb, 6, 9, 12), .42);
    }

    #place-experience .kt-profile-fact dt {
      color: rgba(235, 231, 221, .56);
      font-size: 11px;
      letter-spacing: .04em;
      text-transform: uppercase;
    }

    #place-experience .kt-profile-fact dd {
      margin: 0;
      color: rgba(250, 250, 247, .90);
      font-size: 13px;
      text-align: right;
    }

    #place-experience .kt-profile-action {
      display: block;
      width: 100%;
      padding: 10px 12px;
      border: 1px solid rgba(var(--kt-accent-rgb), .40);
      border-radius: 999px;
      color: rgba(250, 250, 247, .92);
      background: rgba(var(--kt-accent-rgb), .12);
      font: inherit;
      font-size: 13px;
      cursor: pointer;
    }

    #place-experience .kt-profile-settings {
      padding-top: 12px;
      border-top: 1px solid rgba(var(--kt-surface-border-rgb, 248, 252, 255), .16);
    }

    #place-experience .kt-profile-settings-title {
      margin: 0 0 10px;
      color: rgba(235, 231, 221, .56);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: .08em;
      text-transform: uppercase;
    }

    /* The dev block is separated from Settings and labelled, so that a build
       which has it cannot be mistaken for one that offers it to readers. */
    #place-experience .kt-qa-group {
      margin-top: 14px;
      padding-top: 12px;
      border-top: 1px dashed rgba(248, 252, 255, .22);
    }

    #place-experience .kt-qa-group::before {
      content: attr(data-dev-label);
      display: block;
      margin-bottom: 8px;
      color: rgba(235, 231, 221, .40);
      font-size: 10px;
      letter-spacing: .08em;
      text-transform: uppercase;
    }

    /* The sheet can now be taller than the panel it grew out of. Its top-left corner holds the one Settings Back control (settingsBackControl.ts), which floats outside the scroller:
       the content starts below it (14px of padding, the 44px hit area and a breath). */
    #place-experience .kt-theme-sheet {
      max-height: min(78vh, 620px);
      overflow: hidden;
      padding-top: 0;
    }
    /* THE SCROLLER STARTS BELOW THE BACK. The frame does not scroll; this does, and it begins 58px down (14px of padding, the 44px hit area and a breath), so content scrolls to a clean edge under the
       control's row and never behind the disc. 74px = the 58px above plus the sheet's 16px bottom padding. */
    #place-experience .kt-theme-sheet-scroll {
      margin-top: 58px;
      max-height: calc(min(78vh, 620px) - 74px);
      overflow-y: auto;
      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;
    }

    /*
     * THE HEADINGS KEEP OUT OF ITS WAY.
     *
     * Measured at 375px the widest of the six titles ends 24px clear of the
     * control, so nothing collides today - in two languages. That is a fact
     * about the current six strings rather than a property of the layout, and a
     * longer word in a third language would run straight underneath. Reserving
     * the corner costs nothing and removes the class of bug.
     */
    #place-experience[data-profile-control="on"] .kt-pillar-head h1,
    #place-experience[data-profile-control="on"] .kt-pillar-head .kt-pillar-kicker,
    #place-experience[data-profile-control="on"] .kt-fc-head h1,
    #place-experience[data-profile-control="on"] .kt-fc-head .kt-fc-kicker {
      padding-right: 104px;
    }

    @media (max-width: 359px) {
      #place-experience .kt-profile-control { max-width: 46vw; padding-right: 10px; }
      #place-experience[data-profile-control="on"] .kt-pillar-head h1,
      #place-experience[data-profile-control="on"] .kt-fc-head h1 { padding-right: 92px; }
    }
  `;
    document.head.append(style);
}
