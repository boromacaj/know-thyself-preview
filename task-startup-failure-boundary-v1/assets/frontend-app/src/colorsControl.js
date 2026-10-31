import { INTERFACE_COLOR_CSS } from './app/colors/interfaceColorStyle.js?v=2ea79e9';
import { EARTH_GLOW_CSS } from './app/colors/earthGlowStyle.js?v=2ea79e9';
import { COLOR_FAMILIES, EARTH_GLOW_IDS, INTERFACE_COLOR_IDS, INTERFACE_TRANSPARENT, EARTH_DEFAULT, hexToRgb, } from './app/colors/colorFamilies.js?v=2ea79e9';
import { EARTH_GLOW_CHANGED_EVENT, EARTH_GLOW_INTENSITY_CHANGED_EVENT, INTENSITY_MAX, INTENSITY_MIN, INTENSITY_STEP, INTERFACE_COLOR_CHANGED_EVENT, INTERFACE_INTENSITY_CHANGED_EVENT, GLASS_OPACITY_CHANGED_EVENT, GLASS_OPACITY_MAX, GLASS_OPACITY_MIN, GLASS_OPACITY_STEP, applyGlassOpacity, loadGlassOpacity, parseGlassOpacity, saveGlassOpacity, applyEarthGlow, applyEarthGlowIntensity, applyInterfaceColor, applyInterfaceIntensity, browserColorStorage, loadEarthGlow, loadEarthGlowIntensity, loadInterfaceColor, loadInterfaceIntensity, migrateColorPreferences, parseIntensity, saveEarthGlow, saveEarthGlowIntensity, saveInterfaceColor, saveInterfaceIntensity, DEFAULT_EARTH_GLOW, DEFAULT_INTERFACE_COLOR, INTENSITY_DEFAULT, GLASS_OPACITY_DEFAULT, } from './app/colors/colorPreferences.js?v=2ea79e9';
import { LOCALE_CHANGED_EVENT } from './app/i18n/locale.js?v=2ea79e9';
import { t } from './app/i18n/uiStrings.js?v=2ea79e9';
/*
 * SETTINGS -> COLORS
 * ------------------
 * The whole of appearance customisation, in the Settings sheet and nowhere else: two independent choices, no page, no editor, no preview of its own (the application is the preview).
 *
 *   INTERFACE COLOR   Transparent, or one of the colour families: the edge light of the glass chrome (app/colors/interfaceColorStyle.ts).
 *   EARTH GLOW        Default, or one of the same families: the light around the Earth and nothing else (app/colors/earthGlowStyle.ts).
 *
 * THE OPTIONS ARE THE REGISTRY. One button per choice of app/colors/colorFamilies.ts, in its order, each with a readable name (the swatch is never the only signal) and a swatch drawn in that
 * family's own colours. A new family is one registry entry and one set of name strings: no markup, no style and no listener is written for it.
 *
 * STATIC AND LIVE. Choosing writes the identifier to the device (colorPreferences.ts) and sets one attribute on the host; the stylesheets do the rest, so the application changes at once, the
 * Settings sheet stays open while it does, and no reload is needed. Nothing here runs again after the choice: no timer, no frame loop, no token written later.
 *
 * AT LOAD. The retired Menu Colors and Lighting preferences are migrated once, and the stored choices are applied at module load, before anything is first drawn, so there is no frame in the
 * wrong colour. A missing or invalid value is Transparent / Default.
 *
 * It wears the language switch's own look (the kt-locale-* classes) so the groups of Settings are one family; only the swatch is new.
 */
const INTERFACE_NAME_KEYS = {
    transparent: 'options.colors.transparent',
    purple: 'options.colors.family.purple',
    gold: 'options.colors.family.gold',
    magenta: 'options.colors.family.magenta',
    cyclamen: 'options.colors.family.cyclamen',
    turquoise: 'options.colors.family.turquoise',
    indigo: 'options.colors.family.indigo',
    rose: 'options.colors.family.rose',
};
const EARTH_NAME_KEYS = {
    default: 'options.colors.default',
    purple: 'options.colors.family.purple',
    gold: 'options.colors.family.gold',
    magenta: 'options.colors.family.magenta',
    cyclamen: 'options.colors.family.cyclamen',
    turquoise: 'options.colors.family.turquoise',
    indigo: 'options.colors.family.indigo',
    rose: 'options.colors.family.rose',
};
const storage = browserColorStorage();
migrateColorPreferences(storage);
const hostOf = () => document.getElementById('place-experience');
let interfaceColor = loadInterfaceColor(storage);
let earthGlow = loadEarthGlow(storage);
let interfaceLight = loadInterfaceIntensity(storage);
let earthGlowLight = loadEarthGlowIntensity(storage);
let glassOpacity = loadGlassOpacity(storage);
/*
 * THE ONBOARDING IS ALWAYS IN THE DEFAULT COLOURS.
 *
 * The colours a person chose in Settings belong to the product once there is a profile; the onboarding that makes the profile is the product's own introduction and is always
 * seen as designed: the Earth's glow and the capsules take the colour of the vessel being chosen (pink for female, blue for male), not the preset the device remembers from another
 * visit. "Onboarding" is the time before a profile has been opened: it ends - for good, for the life of the page - the first time a destination, the review or an editor is on screen,
 * or at once when the address already names a destination (a restored reading). The stored choices are never touched; they apply from that moment.
 */
let profileOpened = /#\/./.test(document.URL);
const PROFILE_SIGNALS = ['data-pillar-stage', 'data-overview-edit', 'data-profile-state'];
const profileIsOpen = () => {
    if (profileOpened)
        return true;
    const host = hostOf();
    if (host && PROFILE_SIGNALS.some((attribute) => host.hasAttribute(attribute)))
        profileOpened = true;
    return profileOpened;
};
const applyCurrent = () => {
    const own = profileIsOpen();
    applyInterfaceColor(hostOf(), own ? interfaceColor : DEFAULT_INTERFACE_COLOR);
    applyEarthGlow(hostOf(), own ? earthGlow : DEFAULT_EARTH_GLOW);
    applyInterfaceIntensity(hostOf(), own ? interfaceLight : INTENSITY_DEFAULT);
    applyEarthGlowIntensity(hostOf(), own ? earthGlowLight : INTENSITY_DEFAULT);
    applyGlassOpacity(hostOf(), own ? glassOpacity : GLASS_OPACITY_DEFAULT);
};
applyCurrent();
const watchProfile = () => {
    const host = hostOf();
    if (!host || typeof MutationObserver !== 'function')
        return;
    const observer = new MutationObserver(() => {
        if (!profileIsOpen())
            return;
        observer.disconnect();
        applyCurrent();
    });
    observer.observe(host, { attributes: true, attributeFilter: [...PROFILE_SIGNALS] });
};
if (hostOf())
    watchProfile();
else
    document.addEventListener('DOMContentLoaded', () => { applyCurrent(); watchProfile(); }, { once: true });
/* The swatch of each choice, from the registry: a family is a small disc in its own colours; the special modes are an empty ring. */
const disc = (core, mid) => {
    const [cr, cg, cb] = hexToRgb(core);
    const [mr, mg, mb] = hexToRgb(mid);
    return `border-color: rgba(${cr}, ${cg}, ${cb}, 0.9); background: radial-gradient(circle at 35% 30%, rgb(${cr}, ${cg}, ${cb}), rgb(${mr}, ${mg}, ${mb}) 78%);`;
};
const swatchCss = ['interface', 'earth'].flatMap((kind) => [
    `.kt-colors-swatch[data-kt-swatch="${kind}-${kind === 'interface' ? INTERFACE_TRANSPARENT : EARTH_DEFAULT}"] { border-style: dashed; background: none; }`,
    ...Object.keys(COLOR_FAMILIES).map((id) => {
        const family = COLOR_FAMILIES[id];
        return `.kt-colors-swatch[data-kt-swatch="${kind}-${id}"] { ${kind === 'interface' ? disc(family.interface.core, family.interface.tint) : disc(family.earth.soft, family.earth.core)} }`;
    }),
]).join('\n  ');
const style = document.createElement('style');
style.dataset.colors = 'true';
style.textContent = `
  ${INTERFACE_COLOR_CSS}
  ${EARTH_GLOW_CSS}

  .kt-colors-block + .kt-colors-block { margin-top: 12px; }
  .kt-colors-sub {
    margin: 0 0 6px;
    font-size: 11px;
    letter-spacing: 0.08em;
    color: rgba(238, 236, 246, 0.72);
  }
  .kt-colors-options {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 7px;
  }
  @media (min-width: 480px) {
    .kt-colors-options { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  }
  .kt-colors-option {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    min-width: 0;
    padding: 0 10px;
    text-align: left;
  }
  .kt-colors-option > span:last-child { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .kt-colors-swatch {
    flex: none;
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
  }
  .kt-colors-option:focus-visible { outline: 2px solid rgba(255, 255, 255, 0.85); outline-offset: 2px; }
  .kt-colors-intensity { display: grid; grid-template-columns: minmax(0, auto) minmax(0, 1fr) 3.4em; align-items: center; gap: 10px; margin-top: 10px; }
  .kt-colors-intensity-label { font-size: 11px; letter-spacing: 0.08em; color: rgba(238, 236, 246, 0.72); white-space: nowrap; }
  .kt-colors-intensity-value { font-size: 12px; text-align: right; font-variant-numeric: tabular-nums; color: rgba(244, 241, 233, 0.9); }
  .kt-colors-intensity-input { width: 100%; min-height: 32px; margin: 0; accent-color: rgba(236, 228, 255, 0.92); touch-action: pan-y; cursor: pointer; }
  .kt-colors-intensity-input:focus-visible { outline: 2px solid rgba(255, 255, 255, 0.85); outline-offset: 2px; }
  .kt-colors-intensity-input:disabled { opacity: 0.35; cursor: default; }

  /* A native range input has browser-specific intrinsic metrics on iOS.
     Give the horizontal track a known height and make the label a separate
     row on narrow WebKit screens, so the thumb never shifts the grid. */
  @supports (-webkit-touch-callout: none) {
    .kt-colors-intensity {
      grid-template-columns: minmax(0, 1fr) 3.4em;
      gap: 8px;
    }
    .kt-colors-intensity-label {
      grid-column: 1 / -1;
      white-space: normal;
    }
    .kt-colors-intensity-input {
      min-width: 0;
      height: 32px;
      -webkit-appearance: none;
      appearance: none;
      background: transparent;
      touch-action: none;
    }
    .kt-colors-intensity-input::-webkit-slider-runnable-track {
      height: 6px;
      border: 1px solid rgba(255, 255, 255, 0.28);
      border-radius: 999px;
      background: rgba(233, 227, 249, 0.38);
    }
    .kt-colors-intensity-input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 22px;
      height: 22px;
      margin-top: -8px;
      border: 2px solid rgba(245, 242, 255, 0.9);
      border-radius: 50%;
      background: #a79bd5;
      box-shadow: 0 0 0 2px rgba(5, 7, 9, 0.75);
    }
  }
  .kt-colors-glass-row { display: grid; grid-template-columns: minmax(0, 1fr) 3.4em; align-items: center; gap: 10px; }
  .kt-colors-glass-ends { display: flex; justify-content: space-between; gap: 8px; margin-top: 2px; font-size: 11px; color: rgba(238, 236, 246, 0.6); }
  .kt-colors-intensity-hint { grid-column: 1 / -1; margin: -4px 0 0; font-size: 11px; color: rgba(238, 236, 246, 0.56); }
  ${swatchCss}
`;
document.head.append(style);
function buildOptions(spec) {
    const block = document.createElement('div');
    block.className = 'kt-colors-block';
    const label = document.createElement('p');
    label.className = 'kt-colors-sub';
    const options = document.createElement('div');
    options.className = 'kt-locale-options kt-colors-options';
    options.setAttribute('role', 'group');
    options.dataset.ktColorsKind = spec.kind;
    const buttons = new Map();
    for (const id of spec.ids) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'kt-locale-option kt-colors-option';
        button.dataset.ktColorOption = `${spec.kind}-${id}`;
        const swatch = document.createElement('span');
        swatch.className = 'kt-colors-swatch';
        swatch.dataset.ktSwatch = `${spec.kind}-${id}`;
        swatch.setAttribute('aria-hidden', 'true');
        const name = document.createElement('span');
        button.append(swatch, name);
        button.addEventListener('click', () => {
            if (spec.current() === id)
                return;
            spec.choose(id);
        });
        buttons.set(id, { button, name });
        options.append(button);
    }
    const sync = () => {
        label.textContent = t(spec.labelKey);
        options.setAttribute('aria-label', t(spec.labelKey));
        for (const [id, { button, name }] of buttons) {
            name.textContent = t(spec.nameKeys[id]);
            button.setAttribute('aria-pressed', String(id === spec.current()));
        }
    };
    sync();
    document.addEventListener(spec.changedEvent, sync);
    document.addEventListener(LOCALE_CHANGED_EVENT, sync);
    const intensity = document.createElement('div');
    intensity.className = 'kt-colors-intensity';
    intensity.dataset.ktColorsIntensity = spec.kind;
    const intensityLabel = document.createElement('label');
    intensityLabel.className = 'kt-colors-intensity-label';
    const input = document.createElement('input');
    input.type = 'range';
    input.className = 'kt-colors-intensity-input';
    input.min = String(INTENSITY_MIN);
    input.max = String(INTENSITY_MAX);
    input.step = String(INTENSITY_STEP);
    input.id = `kt-colors-intensity-${spec.kind}`;
    intensityLabel.htmlFor = input.id;
    const value = document.createElement('output');
    value.className = 'kt-colors-intensity-value';
    value.htmlFor.add(input.id);
    const hint = document.createElement('p');
    hint.className = 'kt-colors-intensity-hint';
    intensity.append(intensityLabel, input, value, hint);
    input.addEventListener('input', () => {
        const percent = parseIntensity(input.value);
        value.textContent = `${percent} %`;
        spec.intensity.set(percent);
    });
    const syncIntensity = () => {
        const percent = spec.intensity.current();
        intensityLabel.textContent = t('options.colors.intensity');
        input.value = String(percent);
        input.setAttribute('aria-valuetext', `${percent} %`);
        value.textContent = `${percent} %`;
        const needsChoice = spec.intensity.needsChoice();
        input.disabled = needsChoice;
        hint.hidden = !needsChoice;
        hint.textContent = needsChoice ? t('options.colors.intensityNeedsColor') : '';
    };
    syncIntensity();
    document.addEventListener(spec.changedEvent, syncIntensity);
    document.addEventListener(spec.intensity.changedEvent, syncIntensity);
    document.addEventListener(LOCALE_CHANGED_EVENT, syncIntensity);
    block.append(label, options, intensity);
    return block;
}
/* PANEL OPACITY: one slider for the glass behind text and controls. 0 is clear (the blur alone), 100 is solid, 15 is how the glass is without touching it. */
function buildGlassBlock() {
    const block = document.createElement('div');
    block.className = 'kt-colors-block kt-colors-glass';
    const label = document.createElement('p');
    label.className = 'kt-colors-sub';
    const row = document.createElement('div');
    row.className = 'kt-colors-glass-row';
    const input = document.createElement('input');
    input.type = 'range';
    input.className = 'kt-colors-intensity-input';
    input.id = 'kt-colors-glass-opacity';
    input.min = String(GLASS_OPACITY_MIN);
    input.max = String(GLASS_OPACITY_MAX);
    input.step = String(GLASS_OPACITY_STEP);
    const value = document.createElement('output');
    value.className = 'kt-colors-intensity-value';
    value.htmlFor.add(input.id);
    row.append(input, value);
    const ends = document.createElement('div');
    ends.className = 'kt-colors-glass-ends';
    const clear = document.createElement('span');
    const standard = document.createElement('span');
    const solid = document.createElement('span');
    ends.append(clear, standard, solid);
    const sync = () => {
        label.textContent = t('options.colors.glass');
        clear.textContent = t('options.colors.glassClear');
        standard.textContent = t('options.colors.glassDefault');
        solid.textContent = t('options.colors.glassSolid');
        input.value = String(glassOpacity);
        input.setAttribute('aria-label', t('options.colors.glass'));
        input.setAttribute('aria-valuetext', `${glassOpacity} %`);
        value.textContent = `${glassOpacity} %`;
    };
    input.addEventListener('input', () => {
        glassOpacity = parseGlassOpacity(input.value);
        saveGlassOpacity(storage, glassOpacity);
        applyCurrent();
        value.textContent = `${glassOpacity} %`;
        input.setAttribute('aria-valuetext', `${glassOpacity} %`);
        document.dispatchEvent(new CustomEvent(GLASS_OPACITY_CHANGED_EVENT, { detail: glassOpacity }));
    });
    sync();
    document.addEventListener(LOCALE_CHANGED_EVENT, sync);
    block.append(label, row, ends);
    return block;
}
function buildGroup(sheet) {
    if (sheet.querySelector('.kt-colors-group'))
        return null;
    const group = document.createElement('div');
    group.className = 'kt-locale-group kt-colors-group';
    const title = document.createElement('p');
    title.className = 'kt-locale-title';
    const syncTitle = () => { title.textContent = t('options.colors'); };
    syncTitle();
    document.addEventListener(LOCALE_CHANGED_EVENT, syncTitle);
    group.append(title, buildOptions({
        kind: 'interface', ids: INTERFACE_COLOR_IDS, nameKeys: INTERFACE_NAME_KEYS, labelKey: 'options.colors.interface', changedEvent: INTERFACE_COLOR_CHANGED_EVENT,
        current: () => interfaceColor,
        choose: (id) => {
            interfaceColor = id;
            saveInterfaceColor(storage, id);
            applyCurrent();
            document.dispatchEvent(new CustomEvent(INTERFACE_COLOR_CHANGED_EVENT, { detail: id }));
        },
        intensity: {
            current: () => interfaceLight,
            set: (percent) => {
                interfaceLight = percent;
                saveInterfaceIntensity(storage, percent);
                applyCurrent();
                document.dispatchEvent(new CustomEvent(INTERFACE_INTENSITY_CHANGED_EVENT, { detail: percent }));
            },
            changedEvent: INTERFACE_INTENSITY_CHANGED_EVENT,
            /* Transparent adds no light, so there is nothing to turn up or down. */
            needsChoice: () => interfaceColor === INTERFACE_TRANSPARENT,
        },
    }), buildOptions({
        kind: 'earth', ids: EARTH_GLOW_IDS, nameKeys: EARTH_NAME_KEYS, labelKey: 'options.colors.earth', changedEvent: EARTH_GLOW_CHANGED_EVENT,
        current: () => earthGlow,
        choose: (id) => {
            earthGlow = id;
            saveEarthGlow(storage, id);
            applyCurrent();
            document.dispatchEvent(new CustomEvent(EARTH_GLOW_CHANGED_EVENT, { detail: id }));
        },
        intensity: {
            current: () => earthGlowLight,
            set: (percent) => {
                earthGlowLight = percent;
                saveEarthGlowIntensity(storage, percent);
                applyCurrent();
                document.dispatchEvent(new CustomEvent(EARTH_GLOW_INTENSITY_CHANGED_EVENT, { detail: percent }));
            },
            changedEvent: EARTH_GLOW_INTENSITY_CHANGED_EVENT,
            /* The Earth's own glow (Default) is lit too: the slider works with every choice. */
            needsChoice: () => false,
        },
    }), buildGlassBlock());
    return group;
}
/*
 * INTO SETTINGS, FIRST. The sheet is the playground's, restructured by profileShell, which files any group appended to it under Settings - at the end. Colors is the first thing Settings
 * offers, so it goes directly under the Settings heading.
 */
const placeGroup = (sheet) => {
    const settingsBlock = sheet.querySelector('.kt-profile-settings');
    if (!settingsBlock)
        return false;
    const group = buildGroup(sheet);
    if (!group)
        return true;
    const heading = settingsBlock.querySelector('.kt-profile-settings-title');
    if (heading)
        heading.after(group);
    else
        settingsBlock.prepend(group);
    return true;
};
/* The sheet is built by other modules on their own schedule, so this watches for it rather than assuming an order between them. */
const attach = () => {
    const sheet = document.querySelector('.kt-theme-sheet');
    if (!sheet)
        return false;
    if (!placeGroup(sheet)) {
        const observer = new MutationObserver(() => {
            if (placeGroup(sheet))
                observer.disconnect();
        });
        observer.observe(sheet, { childList: true, subtree: true });
    }
    return true;
};
if (!attach()) {
    const observer = new MutationObserver(() => {
        if (attach())
            observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
}
