import { LOCALE_CHANGED_EVENT } from './app/i18n/locale.js?v=f9ab0a6';
import { t } from './app/i18n/uiStrings.js?v=f9ab0a6';
const experience = document.getElementById('place-experience');
if (experience instanceof HTMLElement) {
    const storageKey = 'knowthyself.accent-theme';
    /* "Default" is a MODE, not a preset colour: it follows the current Vessel.
       Storing the resolved colour would freeze it, so only the mode is persisted
       and the accent is resolved from the live Vessel state every time.
         (no vessel yet) -> Neutral cosmic blue/violet
         male            -> Blue
         female          -> Rose
         undefined       -> Neutral
       Any explicit choice overrides this, so a vessel never locks a colour in. */
    const defaultThemeId = 'default';
    const vesselThemeMap = {
        male: 'blue',
        female: 'rose',
        undefined: 'neutral',
    };
    const resolveAutoThemeId = () => {
        const vessel = experience.dataset.vesselSelection;
        return (vessel && vesselThemeMap[vessel]) || 'neutral';
    };
    /* Palettes are intentionally art-directed and restrained: no neon, no
       saturated RGB. Each entry is an rgb triplet so it can drive the existing
       rgba(var(--token), alpha) consumers unchanged. */
    const themes = [
        {
            id: 'default',
            labelKey: 'options.theme.default',
            swatch: 'conic-gradient(from 210deg, rgb(146,158,255), rgb(86,152,240), rgb(226,122,172), rgb(146,158,255))',
            // Never used directly: a Default selection always resolves through the
            // current Vessel. Present only so the entry has a shape like the others.
            accent: { rgb: '146, 158, 255', soft: '198, 205, 255' },
        },
        {
            id: 'neutral',
            labelKey: 'options.theme.neutral',
            swatch: 'linear-gradient(135deg, rgb(146,158,255), rgb(178,150,242))',
            accent: { rgb: '146, 158, 255', soft: '198, 205, 255' },
        },
        {
            id: 'blue',
            labelKey: 'options.theme.blue',
            swatch: 'linear-gradient(135deg, rgb(72,140,235), rgb(140,196,255))',
            accent: { rgb: '86, 152, 240', soft: '170, 208, 255' },
        },
        {
            id: 'rose',
            labelKey: 'options.theme.rose',
            swatch: 'linear-gradient(135deg, rgb(226,116,168), rgb(206,138,214))',
            accent: { rgb: '226, 122, 172', soft: '245, 180, 210' },
        },
        {
            id: 'gold',
            labelKey: 'options.theme.gold',
            swatch: 'linear-gradient(135deg, rgb(214,170,104), rgb(240,220,180))',
            accent: { rgb: '218, 172, 106', soft: '244, 224, 184' },
        },
        {
            id: 'emerald',
            labelKey: 'options.theme.emerald',
            swatch: 'linear-gradient(135deg, rgb(56,166,146), rgb(126,214,198))',
            accent: { rgb: '72, 176, 154', soft: '158, 226, 210' },
        },
        {
            id: 'silver',
            labelKey: 'options.theme.silver',
            swatch: 'linear-gradient(135deg, rgb(222,228,238), rgb(180,190,204))',
            accent: { rgb: '224, 231, 240', soft: '246, 249, 252' },
        },
    ];
    const themeById = (id) => (themes.find((theme) => theme.id === id) ?? themes[0]);
    const applyAccent = (accent) => {
        experience.style.setProperty('--kt-accent-rgb', accent.rgb);
        experience.style.setProperty('--kt-accent-soft-rgb', accent.soft);
    };
    /* ------------------------------------------------------------ token layer */
    const style = document.createElement('style');
    style.dataset.onboardingThemePlayground = 'true';
    style.textContent = `
    /* Derived tokens. New pillars should consume THESE, not raw colours. */
    #place-experience[data-kt-theme] {
      --kt-accent-primary: rgb(var(--kt-accent-rgb));
      --kt-accent-secondary: rgb(var(--kt-accent-soft-rgb));
      --kt-accent-soft: rgba(var(--kt-accent-soft-rgb), .38);
      --kt-accent-glow: rgba(var(--kt-accent-rgb), .34);
      --kt-accent-border: rgba(var(--kt-accent-soft-rgb), .48);
      --kt-accent-highlight: rgba(var(--kt-accent-soft-rgb), .82);
      --kt-accent-text: rgba(var(--kt-accent-soft-rgb), .92);
    }

    /*
     * Existing components keep consuming the tokens they already know about;
     * the theme simply becomes their upstream source. !important is required
     * because several of these are written as inline styles by other modules.
     * --vessel-energy-* is deliberately absent: that is gender identity.
     *
     * --kt-neighbor-* is absent for exactly the same reason, and used not to
     * be. The two side marks are the vessels the reader has NOT chosen, and
     * renderPreview() writes each one's own palette inline - blue for male,
     * pink for female, white for undefined. Mapping those tokens to the accent
     * here overrode that inline value, and because the accent resolves through
     * the ACTIVE vessel, both side marks took the colour of the vessel the
     * reader was already on: male active turned the female mark blue. A vessel
     * mark's colour is its identity, so it is never themed - only its size,
     * opacity and glow strength say which one is active.
     */
    #place-experience[data-kt-theme] .profile-flow,
    #place-experience[data-kt-theme] .kt-earth-effects-layer,
    #place-experience[data-kt-theme] .kt-vessel-glow-ring,
    #place-experience[data-kt-theme] .confirm-vessel {
      --profile-energy-rgb: var(--kt-accent-rgb) !important;
      --profile-energy-soft-rgb: var(--kt-accent-soft-rgb) !important;
      --kt-layer-energy-rgb: var(--kt-accent-rgb) !important;
      --kt-layer-energy-soft-rgb: var(--kt-accent-soft-rgb) !important;
      --kt-vessel-glow-rgb: var(--kt-accent-rgb) !important;
      --kt-vessel-glow-soft-rgb: var(--kt-accent-soft-rgb) !important;
      --kt-confirm-vessel-rgb: var(--kt-accent-rgb) !important;
      --kt-confirm-vessel-soft-rgb: var(--kt-accent-soft-rgb) !important;
    }

    /* ------------------------------------------------------- options control */

    .kt-theme-button {
      position: absolute;
      top: var(--kt-top-space, max(calc(var(--safe-top, 0px) + 10px), 14px));
      right: 14px;
      z-index: 9000;
      display: grid;
      place-items: center;
      width: 38px;
      height: 38px;
      padding: 0;
      border: 1px solid rgba(248, 252, 255, .42);
      border-radius: 999px;
      color: rgba(250, 250, 247, .86);
      background: transparent;
      box-shadow: 0 0 10px rgba(var(--kt-accent-rgb), .22);
      backdrop-filter: blur(14px) saturate(1.06);
      -webkit-backdrop-filter: blur(14px) saturate(1.06);
      pointer-events: auto;
      -webkit-tap-highlight-color: transparent;
      cursor: pointer;
    }

    .kt-theme-button-dot {
      width: 14px;
      height: 14px;
      border-radius: 999px;
      background: var(--kt-theme-swatch, rgb(var(--kt-accent-rgb)));
      box-shadow: 0 0 8px rgba(var(--kt-accent-rgb), .55);
    }

    .kt-theme-sheet {
      position: absolute;
      right: 12px;
      bottom: max(calc(var(--safe-bottom, 0px) + 14px), 18px);
      left: 12px;
      z-index: 9001;
      box-sizing: border-box;
      padding: 14px 14px 16px;
      border: 1px solid var(--kt-surface-line, rgba(248, 252, 255, .30));
      border-radius: 22px;
      opacity: 0;
      pointer-events: none;
      background: rgba(6, 9, 12, .52);
      box-shadow: 0 18px 48px rgba(0,0,0,.42);
      backdrop-filter: blur(20px) saturate(1.08);
      -webkit-backdrop-filter: blur(20px) saturate(1.08);
      transform: translateY(10px);
      transition: opacity 220ms ease, transform 220ms cubic-bezier(.22,.61,.36,1);
    }

    .kt-theme-sheet.is-open {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }

    @media (prefers-reduced-motion: reduce) {
      .kt-theme-sheet { transition-duration: 1ms; }
    }
  `;
    document.head.append(style);
    /* ----------------------------------------------------------------- state */
    let activeThemeId = defaultThemeId;
    const readStoredTheme = () => {
        try {
            return window.localStorage.getItem(storageKey) ?? defaultThemeId;
        }
        catch {
            return defaultThemeId;
        }
    };
    const storeTheme = (id) => {
        try {
            window.localStorage.setItem(storageKey, id);
        }
        catch {
            // A private window simply does not remember the choice.
        }
    };
    const applyTheme = (id, persist = true) => {
        const selected = themeById(id);
        activeThemeId = selected.id;
        // Default resolves through the Vessel; every other choice is literal.
        const effective = selected.id === defaultThemeId
            ? themeById(resolveAutoThemeId())
            : selected;
        // The SELECTED mode drives the picker, the EFFECTIVE theme drives the paint.
        experience.dataset.ktTheme = selected.id;
        experience.dataset.ktThemeEffective = effective.id;
        experience.style.setProperty('--kt-theme-swatch', selected.swatch);
        applyAccent(effective.accent);
        if (persist)
            storeTheme(selected.id);
    };
    /* While Default is active the accent must follow a later Vessel edit live -
       male -> female must move Blue -> Rose without reopening the picker. */
    const vesselObserver = new MutationObserver(() => {
        if (activeThemeId !== defaultThemeId)
            return;
        applyTheme(defaultThemeId, false);
    });
    vesselObserver.observe(experience, { attributes: true, attributeFilter: ['data-vessel-selection'] });
    /* -------------------------------------------------------------------- UI */
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'kt-theme-button';
    button.setAttribute('aria-label', t('options.theme'));
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = '<span class="kt-theme-button-dot" aria-hidden="true"></span>';
    /*
     * HIDDEN FROM BIRTH. The panel this opens became the reader's profile menu -
     * profile, photo, settings, theme, language - and a profile menu cannot
     * precede a profile. Before one exists there is nothing in the panel that
     * belongs to anybody, so there is nothing to open and no dot to open it with.
     *
     * The element stays, because it is still this module's own toggle: the
     * profile control presses it to work the sheet, which is why it is `hidden`
     * rather than removed. profileShell reveals nothing - it only ever shows its
     * own control - so this stays hidden for the life of the session.
     */
    button.hidden = true;
    /*
     * THE SHEET NO LONGER HOLDS A SWATCH GRID.
     *
     * It held eight accent swatches and a reset. They were retired with the picker: appearance
     * is now the two choices of Settings -> Colors (colorsControl.ts), which set static colours
     * and never touch this accent.
     *
     * What this module keeps is everything the rest of the app stands on: the
     * token layer above, the vessel-following Default, the stored static choices of
     * anyone who picked a swatch before - still honoured, so nobody's colours change - and
     * the sheet itself, which profileShell, localeControl and the Colors group all move
     * their blocks into. The one animated choice the old picker had (Aurora, a drifting
     * accent) is gone: a device that stored it now reads Default, and nothing here runs a
     * clock.
     */
    const sheet = document.createElement('section');
    sheet.className = 'kt-theme-sheet';
    sheet.setAttribute('aria-label', t('profile.settings'));
    /*
     * RE-LABEL ON A LANGUAGE CHANGE.
     *
     * The sheet is built once and then only shown and hidden, so its label is
     * resolved again whenever the language changes rather than once at build.
     */
    const syncLanguage = () => {
        sheet.setAttribute('aria-label', t('profile.settings'));
    };
    syncLanguage();
    document.addEventListener(LOCALE_CHANGED_EVENT, syncLanguage);
    const setOpen = (open) => {
        sheet.classList.toggle('is-open', open);
        /*
         * CLOSED IS INERT, AND CLOSED IS THE DEFAULT.
         *
         * The sheet is built once and then only shown and hidden, and hiding it is
         * a transform and an opacity - which removes it from the PAINT and from
         * nothing else. Measured on the portrait at 375x812: sixteen controls the
         * reader cannot see were still offered to a keyboard and to a screen
         * reader - the eight theme swatches, Reset to default, both languages, the
         * three QA presets, Change photo and Edit birth details - and Enter on any
         * of them ran it.
         *
         * `inert` is what takes an element out of both. It is written HERE, on the
         * sheet root, because this is the single place the sheet opens and closes;
         * and on the root rather than on the controls because localeControl,
         * profileShell and the QA menu all move their own blocks INTO this sheet
         * and none of them knows about the others. One flag on the container covers
         * every one of them, now and when the next module appends into it.
         */
        sheet.inert = !open;
        button.setAttribute('aria-expanded', String(open));
    };
    /* The sheet is created closed, so it starts inert too - otherwise every
       reader meets those sixteen controls until the first time it is opened. */
    setOpen(false);
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        setOpen(!sheet.classList.contains('is-open'));
    });
    // Dismissing must never reach the globe or any onboarding control underneath.
    document.addEventListener('pointerdown', (event) => {
        if (!sheet.classList.contains('is-open'))
            return;
        const target = event.target;
        if (target instanceof Node && (sheet.contains(target) || button.contains(target)))
            return;
        /* The one Settings Back control floats over the sheet from outside it: pressing it is not an outside tap, it is the navigation's own step (settingsBackControl.ts). */
        if (target instanceof Element && target.closest('.kt-settings-back'))
            return;
        setOpen(false);
    }, true);
    experience.append(button, sheet);
    applyTheme(readStoredTheme(), false);
    window.addEventListener('pagehide', () => {
        vesselObserver.disconnect();
        style.remove();
    }, { once: true });
}
