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
    sonar: 3,
    scan: 3,
});
/**
 * A SONAR TICK IS A COURTESY, AND A COURTESY WAITS - BUT ONLY FOR THE TAP ITSELF.
 * Rings of the KT sonar tick the phone when they leave a control (sonarHaptics.ts). The click of a tap (menu card, control) is felt alone: a sonar tick is refused for this long after any other cue.
 * It was 4 s, to keep the destination's rings from ticking over the tap; but a screen's first scan (Human Design's nine centres, 0.6-2.4 s after the lift) then fell entirely inside the silence and was felt
 * only from its second round (owner, 2026-11-01). The first waves of a screen start 0.5 s or more after the lift, so 0.8 s keeps the click clean and lets every first wave through.
 */
export const SONAR_QUIET_AFTER_CUE_MS = 800;
function nativeHaptics() {
    try {
        const bridge = (typeof window !== 'undefined' ? window.KtHaptics : undefined);
        return bridge && typeof bridge.pulse === 'function' && bridge.available() ? bridge : null;
    }
    catch {
        return null;
    }
}
/** How firm a pulse of this length is: the longer cues are the fuller ones. */
const strengthFor = (milliseconds) => Math.max(70, Math.min(210, Math.round(70 + milliseconds * 5)));
/** The motor, driven directly: a pulse of 4 ms or less is the soft predefined tick; everything else is a pulse or a waveform with a strength. */
export function nativeVibrate(pattern) {
    const native = nativeHaptics();
    if (native === null)
        return false;
    try {
        if (typeof pattern === 'number') {
            if (pattern <= 8)
                native.tick();
            else
                native.pulse(pattern, strengthFor(pattern));
        }
        else {
            const longest = pattern.reduce((a, b) => Math.max(a, b), 0);
            native.pattern(pattern.join(','), strengthFor(longest));
        }
        return true;
    }
    catch {
        return false;
    }
}
/** The vibration: the Android shell's motor where there is one (it also stands in for navigator.vibrate, which a WebView does not honour), else the browser's own; never throws. */
export function browserVibrate() {
    if (nativeHaptics() !== null)
        return nativeVibrate;
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
    const onRequest = options.onRequest ?? null;
    const clock = options.now ?? (() => (typeof performance !== 'undefined' ? performance.now() : Date.now()));
    /** When the last cue that is not a sonar tick was asked for. */
    let lastOtherAt = Number.NEGATIVE_INFINITY;
    const readStored = () => {
        try {
            return storage?.getItem(HAPTICS_STORAGE_KEY) !== 'off';
        }
        catch {
            return true;
        }
    };
    let on = readStored();
    const fire = (pattern, what) => {
        if (!on || !vibrate)
            return false;
        /* a scan tick is a sonar-class courtesy too: it waits after a tap, and it does not reset that wait (it is not "another cue" that was asked for) */
        if (what === 'sonar' || what === 'scan') {
            if (clock() - lastOtherAt < SONAR_QUIET_AFTER_CUE_MS)
                return false;
        }
        else {
            lastOtherAt = clock();
        }
        try {
            onRequest?.(what, pattern);
        }
        catch { /* a listener's failure is not the motor's */ }
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
        cue: (cue) => fire(HAPTIC_PATTERNS[cue], cue),
        pulse: (milliseconds) => fire(milliseconds, `pulse:${milliseconds}`),
    };
}
let shared = null;
/** The application's haptics: built on first use, and announcing a change on the document so a control can follow it. */
export function appHaptics() {
    if (shared === null) {
        shared = createHaptics({
            /* Every request the application makes of the motor, newest last, for a QA tool: `globalThis.__ktHapticLog` ([milliseconds since the page began, cue, pattern]). 200 entries, nothing else kept. */
            onRequest: (what, pattern) => {
                const log = (globalThis.__ktHapticLog ??= []);
                log.push([Math.round(typeof performance !== 'undefined' ? performance.now() : Date.now()), what, pattern]);
                if (log.length > 200)
                    log.shift();
            },
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
/** Inside the Android shell, navigator.vibrate (used directly by older code such as the Tarot shake) is routed to the motor too. */
export function routeNavigatorVibrate() {
    if (nativeHaptics() === null || typeof navigator === 'undefined')
        return;
    try {
        Object.defineProperty(navigator, 'vibrate', { configurable: true, writable: true, value: (pattern) => nativeVibrate(pattern) });
    }
    catch { /* a navigator that refuses is left as it is */ }
}
routeNavigatorVibrate();
