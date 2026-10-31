/**
 * THE APPLICATION'S HAPTICS: ONE SWITCH, ONE VOCABULARY, ANY SCREEN.
 *
 * Vibration is a courtesy of the phone, and it belongs to the application, not to a module: a screen asks for a CUE ("a card was
 * chosen", "the deck was shuffled") and this decides whether the phone is told. Two things are decided here and nowhere else:
 *
 *   - whether haptics are ON. The person's choice is kept on the device (localStorage, `kt-haptics`), is ON until they say
 *     otherwise, and is changed from the Options sheet (hapticsControl.ts). Off means no module vibrates, whatever it asks for.
 *   - what each cue FEELS like. A cue is one short pulse or a short pattern of them, never a buzz: restrained on purpose, so a
 *     screen that uses them well is felt and one that uses them badly is still not annoying.
 *
 * WHAT IT NEVER DOES. It does not read any sensor, store anything but the one on/off word, or throw: where there is no vibration
 * (iOS Safari has none; a desktop has none; Chrome on Android refuses it until the page has been tapped; a phone in a silent or
 * power-saving mode may ignore it) every call is a quiet no-op that says false. A person who asked their phone for less movement
 * is not refused a pulse - a pulse is not motion - but the switch above is always theirs.
 */
export const HAPTICS_STORAGE_KEY = 'kt-haptics';
export const HAPTICS_CHANGED_EVENT = 'kt-haptics-changed';
/** Milliseconds on, then off, then on...: a number is a single pulse. Short and few: this is a vocabulary, not a buzz. */
export const HAPTIC_PATTERNS = Object.freeze({
    tick: 6,
    select: 16,
    shake: 30,
    shuffle: Object.freeze([16, 44, 12, 44, 16]),
    reveal: 12,
    land: 8,
    settle: 5,
    complete: Object.freeze([12, 70, 22]),
    impulse: Object.freeze([20, 36, 14, 36, 8]),
});
/** The browser's own vibration, or null: feature-detected, and never allowed to throw. */
export function browserVibrate() {
    if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function')
        return null;
    return (pattern) => {
        try {
            return navigator.vibrate(pattern);
        }
        catch {
            return false;
        }
    };
}
function browserStorage() {
    try {
        return typeof window !== 'undefined' && window.localStorage ? window.localStorage : null;
    }
    catch {
        /* A browser with site data blocked throws on the property itself. */
        return null;
    }
}
export function createHaptics(options = {}) {
    const vibrate = options.vibrate === undefined ? browserVibrate() : options.vibrate;
    const storage = options.storage === undefined ? browserStorage() : options.storage;
    const onChange = options.onChange ?? null;
    const readStored = () => {
        try {
            return storage?.getItem(HAPTICS_STORAGE_KEY) !== 'off';
        }
        catch {
            return true;
        }
    };
    let on = readStored();
    const fire = (pattern) => {
        if (!on || !vibrate)
            return false;
        try {
            vibrate(pattern);
        }
        catch {
            return false;
        }
        return true;
    };
    return {
        supported: vibrate !== null,
        enabled: () => on,
        setEnabled(next) {
            if (next === on)
                return;
            on = next;
            try {
                storage?.setItem(HAPTICS_STORAGE_KEY, next ? 'on' : 'off');
            }
            catch { /* it still holds for this session */ }
            try {
                onChange?.(next);
            }
            catch { /* a listener's failure is not the switch's */ }
        },
        cue: (cue) => fire(HAPTIC_PATTERNS[cue]),
        pulse: (milliseconds) => fire(milliseconds),
    };
}
let shared = null;
/** The application's haptics: built on first use, and announcing a change on the document so a control can follow it. */
export function appHaptics() {
    if (shared === null) {
        shared = createHaptics({
            onChange: () => {
                if (typeof document !== 'undefined')
                    document.dispatchEvent(new CustomEvent(HAPTICS_CHANGED_EVENT));
            },
        });
    }
    return shared;
}
/** For tests: forget the shared instance, so the next call reads the storage again. */
export function resetAppHaptics() {
    shared = null;
}
