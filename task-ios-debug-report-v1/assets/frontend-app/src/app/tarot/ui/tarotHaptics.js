import { appHaptics } from '../../haptics/hapticsService.js?v=b5ef5ed';
/**
 * HAPTIC TICKS FOR THE CARD PICKER.
 *
 * A tiny mechanical detent for each card a thumb passes in the spread, and a slightly firmer one when a card is chosen.
 * Nothing here depends on it: where there is no vibration (iOS Safari has none; a desktop has none; Chrome on Android
 * refuses it until the page has been tapped, and a phone in a silent or power-saving mode may ignore it) every call is a
 * quiet no-op and the picker works exactly the same.
 *
 * The rules, in one place:
 *   - ONE pulse per place crossed: a tick for an index is never repeated while the strip stays on it, and an index the strip
 *     has only just been armed on (the start, a redraw) is not ticked at all.
 *   - A fast fling crosses many places in a few frames. Pulses are coalesced to at most one per MIN_GAP_MS, so the thumb
 *     feels a short run of ticks and the vibrator is not asked for hundreds of restarts. A coalesced index still counts as
 *     crossed (the next place ticks as usual).
 *   - Only short pulses, never a pattern, never a continuous buzz.
 */
/** A browsing tick, in ms. */
export const TICK_MS = 6;
/** The confirmation of a chosen card, in ms. */
export const SELECT_MS = 16;
/** The least time between two browsing ticks. A vibration call restarts the motor, so faster than this is a blur, not a detent. */
export const MIN_GAP_MS = 24;
/** The browser's own vibration, or null: feature-detected, and never allowed to throw. */
export function browserVibrate() {
    if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function')
        return null;
    return (milliseconds) => {
        try {
            return navigator.vibrate(milliseconds);
        }
        catch {
            return false;
        }
    };
}
/**
 * The application's vibration, where the browser has one: the same pulses, but through the application's haptics switch, so a person
 * who has switched haptics off in Options is not vibrated by the picker either. Null where there is no vibration at all.
 */
export function applicationVibrate() {
    if (browserVibrate() === null)
        return null;
    return (milliseconds) => appHaptics().pulse(milliseconds);
}
export function createTarotHaptics(options = {}) {
    const vibrate = options.vibrate === undefined ? applicationVibrate() : options.vibrate;
    const now = options.now ?? (() => (typeof performance !== 'undefined' ? performance.now() : Date.now()));
    let last = -1;
    let lastPulseAt = Number.NEGATIVE_INFINITY;
    const pulse = (milliseconds) => {
        if (!vibrate)
            return false;
        try {
            vibrate(milliseconds);
        }
        catch {
            return false;
        }
        lastPulseAt = now();
        return true;
    };
    return {
        supported: vibrate !== null,
        arm(index) { last = index; },
        tick(index) {
            if (index === last)
                return false;
            last = index;
            if (now() - lastPulseAt < MIN_GAP_MS)
                return false;
            return pulse(TICK_MS);
        },
        select() { return pulse(SELECT_MS); },
    };
}
