import { COLOR_FAMILIES, COLOUR_FAMILY_IDS, DEFAULT_EARTH_GLOW, DEFAULT_INTERFACE_COLOR, isInterfaceColorId, parseEarthGlow, parseInterfaceColor, } from './colorFamilies.js?v=d9f39e7';
/*
 * THE TWO COLOUR PREFERENCES (Settings -> Colors).
 *
 * A visual preference, not product data: two short identifiers kept on the device, the way the language (`kt-locale`) and the vibration switch (`kt-haptics`) are, each in a key of its own.
 *
 *   kt-interface-color   an Interface Color identifier: `transparent` or a family
 *   kt-earth-glow        an Earth Glow identifier: `default` or a family
 *
 * Only the identifier is stored, never a colour: the colours live in the registry (colorFamilies.ts), so a palette can be retuned, or removed, without touching what a device holds. Nothing
 * else about appearance is persisted: no channel, no effect, no speed, no palette.
 *
 * THE ANSWER TO ANYTHING UNEXPECTED IS THE SPECIAL MODE: a missing key, an unreadable store, a value that is not an identifier, an identifier a later version removed. Interface Color
 * reads as Transparent and Earth Glow as Default. A colour is a choice, never a fallback.
 *
 * MIGRATION, ONCE, AND ONLY FROM WHAT THE TWO CHOICES CAN HOLD.
 *   kt-menu-color (the Menu Colors choice)            -> kt-interface-color, when that key does not exist yet and the old value is a valid identifier; the old key is then removed, so there
 *                                                       is one authoritative key and the two are never kept in step.
 *   knowthyself.lighting-engine (the Lighting Engine) -> at most the Earth glow's ONE colour, and only when it is exactly one of a family's own colours (the ones the Colors registry holds).
 *                                                       Everything else the old engine stored - presets, effects, channels, animations, speeds - is dropped, not carried: it has nothing to
 *                                                       become. The old key is then removed. If nothing maps, Earth Glow is Default.
 *   knowthyself.accent-theme is the vessel accent's own preference and is not touched.
 *
 * The storage is passed in, so every path (empty, invalid, throwing) can be driven without a browser. Nothing here touches the network, a backend or any account.
 */
export const INTERFACE_COLOR_STORAGE_KEY = 'kt-interface-color';
export const EARTH_GLOW_STORAGE_KEY = 'kt-earth-glow';
/** The retired Menu Colors key. Read once by the migration, then removed. */
export const LEGACY_MENU_COLOR_STORAGE_KEY = 'kt-menu-color';
/** The retired Lighting Engine's one key. Read once by the migration, then removed. */
export const LEGACY_LIGHTING_STORAGE_KEY = 'knowthyself.lighting-engine';
/** The two light-intensity sliders (Settings -> Colors): a whole percentage, 100 being the light as it was before the sliders existed. */
export const INTERFACE_INTENSITY_STORAGE_KEY = 'kt-interface-intensity';
export const EARTH_GLOW_INTENSITY_STORAGE_KEY = 'kt-earth-glow-intensity';
export const INTENSITY_MIN = 0;
export const INTENSITY_MAX = 200;
export const INTENSITY_STEP = 5;
export const INTENSITY_DEFAULT = 100;
export const INTERFACE_INTENSITY_CHANGED_EVENT = 'kt-interface-intensity-changed';
export const EARTH_GLOW_INTENSITY_CHANGED_EVENT = 'kt-earth-glow-intensity-changed';
/** The custom properties on `#place-experience` that carry them, as a multiplier (1 = unchanged, 0 = off). The stylesheets multiply their own strengths by it. */
export const INTERFACE_GAIN_PROPERTY = '--kt-interface-gain';
export const EARTH_GLOW_GAIN_PROPERTY = '--kt-earth-glow-gain';
/**
 * PANEL OPACITY (Settings -> Colors): how solid the glass behind text and controls is. The one shared material (glassSurfaceUnification.ts) is a dark tint at 15 % opacity over a 7 px blur;
 * this lets the reader make it clearer (0 %: the blur alone) or fully solid (100 %). A whole percentage, stored on the device; 15 is the default and then nothing is written to the page.
 * Only the tint's opacity moves: the blur stays what it is, so the glass is always frosted, never just see-through.
 */
export const GLASS_OPACITY_STORAGE_KEY = 'kt-glass-opacity';
export const GLASS_OPACITY_MIN = 0;
export const GLASS_OPACITY_MAX = 100;
export const GLASS_OPACITY_STEP = 5;
export const GLASS_OPACITY_DEFAULT = 15;
export const GLASS_OPACITY_CHANGED_EVENT = 'kt-glass-opacity-changed';
/** The custom property the shared material reads for its fill, and the tint it sets. */
export const GLASS_FILL_PROPERTY = '--kt-glass-fill';
export const GLASS_FILL_RGB = '10, 13, 16';
/** Fired on `document` after a choice changes, with the new identifier as `detail`. */
export const INTERFACE_COLOR_CHANGED_EVENT = 'kt-interface-color-changed';
export const EARTH_GLOW_CHANGED_EVENT = 'kt-earth-glow-changed';
/** The attributes on `#place-experience` that carry the choices. The stylesheets read them; applying a choice is setting one. */
export const INTERFACE_COLOR_ATTRIBUTE = 'data-kt-interface-color';
export const EARTH_GLOW_ATTRIBUTE = 'data-kt-earth-glow';
/** localStorage, or null where there is none (private mode, blocked site data): the choices then last for the session. */
export function browserColorStorage() {
    try {
        return typeof window !== 'undefined' && window.localStorage ? window.localStorage : null;
    }
    catch {
        return null;
    }
}
const read = (storage, key) => {
    try {
        return storage ? storage.getItem(key) : null;
    }
    catch {
        return null;
    }
};
const write = (storage, key, value) => {
    if (!storage)
        return false;
    try {
        storage.setItem(key, value);
        return true;
    }
    catch {
        return false;
    }
};
const remove = (storage, key) => {
    try {
        storage?.removeItem?.(key);
    }
    catch { /* a store that refuses leaves the old key; the next load tries again */ }
};
/** The family one of whose own colours this hex is, or null. Exact, case-insensitive: nothing is guessed. */
export function familyOfHex(hex) {
    if (typeof hex !== 'string')
        return null;
    const wanted = hex.trim().toLowerCase();
    if (!/^#[0-9a-f]{6}$/.test(wanted))
        return null;
    for (const id of COLOUR_FAMILY_IDS) {
        const family = COLOR_FAMILIES[id];
        const own = [family.earth.core, family.earth.soft, family.interface.tint, family.interface.core, family.interface.soft];
        if (own.some((candidate) => candidate.toLowerCase() === wanted))
            return id;
    }
    return null;
}
/** The Earth glow colour an old Lighting Engine value holds, if it is a hex string at the one place it lived. Anything else is null. */
export function legacyEarthGlowHex(raw) {
    if (!raw)
        return null;
    try {
        const data = JSON.parse(raw);
        const channels = data?.channels;
        const colour = channels?.earthGlow?.color;
        return typeof colour === 'string' ? colour : null;
    }
    catch {
        return null;
    }
}
/** The one-time migration. Safe to run on every load: once the old keys are gone it does nothing. */
export function migrateColorPreferences(storage) {
    const removed = [];
    let interfaceFromMenuColor = null;
    let earthFromLighting = null;
    if (!storage)
        return { interfaceFromMenuColor, earthFromLighting, removed };
    const oldMenu = read(storage, LEGACY_MENU_COLOR_STORAGE_KEY);
    if (oldMenu !== null) {
        let settled = read(storage, INTERFACE_COLOR_STORAGE_KEY) !== null;
        if (!settled && isInterfaceColorId(oldMenu)) {
            settled = write(storage, INTERFACE_COLOR_STORAGE_KEY, oldMenu);
            if (settled)
                interfaceFromMenuColor = oldMenu;
        }
        else if (!settled) {
            settled = true; /* an unreadable old value has nothing to carry over: the default stands */
        }
        if (settled) {
            remove(storage, LEGACY_MENU_COLOR_STORAGE_KEY);
            removed.push(LEGACY_MENU_COLOR_STORAGE_KEY);
        }
    }
    const oldLighting = read(storage, LEGACY_LIGHTING_STORAGE_KEY);
    if (oldLighting !== null) {
        let settled = true;
        if (read(storage, EARTH_GLOW_STORAGE_KEY) === null) {
            const family = familyOfHex(legacyEarthGlowHex(oldLighting));
            if (family) {
                settled = write(storage, EARTH_GLOW_STORAGE_KEY, family);
                if (settled)
                    earthFromLighting = family;
            }
        }
        if (settled) {
            remove(storage, LEGACY_LIGHTING_STORAGE_KEY);
            removed.push(LEGACY_LIGHTING_STORAGE_KEY);
        }
    }
    return { interfaceFromMenuColor, earthFromLighting, removed };
}
/** A stored or typed intensity as a whole percentage: anything that is not a finite number is the default; a number is rounded to the step and held inside the range. */
export function parseIntensity(raw) {
    const value = typeof raw === 'number' ? raw : typeof raw === 'string' && raw.trim() !== '' ? Number(raw) : Number.NaN;
    if (!Number.isFinite(value))
        return INTENSITY_DEFAULT;
    const stepped = Math.round(value / INTENSITY_STEP) * INTENSITY_STEP;
    return Math.min(INTENSITY_MAX, Math.max(INTENSITY_MIN, stepped));
}
export const loadInterfaceIntensity = (storage) => parseIntensity(read(storage, INTERFACE_INTENSITY_STORAGE_KEY));
export const loadEarthGlowIntensity = (storage) => parseIntensity(read(storage, EARTH_GLOW_INTENSITY_STORAGE_KEY));
export const saveInterfaceIntensity = (storage, percent) => write(storage, INTERFACE_INTENSITY_STORAGE_KEY, String(parseIntensity(percent)));
export const saveEarthGlowIntensity = (storage, percent) => write(storage, EARTH_GLOW_INTENSITY_STORAGE_KEY, String(parseIntensity(percent)));
/** Sets the multiplier on the host: 100 % is 1. */
export function applyInterfaceIntensity(host, percent) {
    host?.style.setProperty(INTERFACE_GAIN_PROPERTY, String(parseIntensity(percent) / 100));
}
export function applyEarthGlowIntensity(host, percent) {
    host?.style.setProperty(EARTH_GLOW_GAIN_PROPERTY, String(parseIntensity(percent) / 100));
}
/** A stored or typed opacity as a whole percentage, stepped and held inside 0 to 100; anything that is not a finite number is the default. */
export function parseGlassOpacity(raw) {
    const value = typeof raw === 'number' ? raw : typeof raw === 'string' && raw.trim() !== '' ? Number(raw) : Number.NaN;
    if (!Number.isFinite(value))
        return GLASS_OPACITY_DEFAULT;
    const stepped = Math.round(value / GLASS_OPACITY_STEP) * GLASS_OPACITY_STEP;
    return Math.min(GLASS_OPACITY_MAX, Math.max(GLASS_OPACITY_MIN, stepped));
}
export const loadGlassOpacity = (storage) => parseGlassOpacity(read(storage, GLASS_OPACITY_STORAGE_KEY));
export const saveGlassOpacity = (storage, percent) => write(storage, GLASS_OPACITY_STORAGE_KEY, String(parseGlassOpacity(percent)));
/** Sets the shared fill on the host. At the default nothing is set, so the page is exactly what it was. */
export function applyGlassOpacity(host, percent) {
    if (!host)
        return;
    const value = parseGlassOpacity(percent);
    if (value === GLASS_OPACITY_DEFAULT)
        host.style.removeProperty(GLASS_FILL_PROPERTY);
    else
        host.style.setProperty(GLASS_FILL_PROPERTY, `rgba(${GLASS_FILL_RGB}, ${value / 100})`);
}
export function loadInterfaceColor(storage) {
    return parseInterfaceColor(read(storage, INTERFACE_COLOR_STORAGE_KEY));
}
export function loadEarthGlow(storage) {
    return parseEarthGlow(read(storage, EARTH_GLOW_STORAGE_KEY));
}
/** True when the choice reached the store; it still holds for this session when it did not. */
export const saveInterfaceColor = (storage, id) => write(storage, INTERFACE_COLOR_STORAGE_KEY, id);
export const saveEarthGlow = (storage, id) => write(storage, EARTH_GLOW_STORAGE_KEY, id);
/** Sets the choices on the host (`#place-experience`). This is the whole of "applying" them: the stylesheets read the attributes. */
export function applyInterfaceColor(host, id) {
    host?.setAttribute(INTERFACE_COLOR_ATTRIBUTE, id);
}
export function applyEarthGlow(host, id) {
    host?.setAttribute(EARTH_GLOW_ATTRIBUTE, id);
}
export { DEFAULT_EARTH_GLOW, DEFAULT_INTERFACE_COLOR };
