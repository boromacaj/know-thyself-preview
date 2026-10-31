import { appHaptics } from './hapticsService.js?v=d9f39e7';
/**
 * EVERYTHING THAT CAN BE TAPPED ANSWERS WITH A SHORT PULSE.
 *
 * One listener on the document, not one per control: a control added tomorrow vibrates without anybody remembering to ask. It answers only to a REAL tap or click (`isTrusted` - a script's
 * own click is not a person's finger, and a browser would refuse it a vibration anyway), only on something that is actually offered as a control (a button, a link, a role, a pointer cursor -
 * which is how this application marks a tappable thing that is not a button), and never on one that is disabled. It listens in the CAPTURE phase, so a control that stops the click from
 * travelling (the Settings Back does) is still felt.
 *
 * IT IS FELT WHEN THE FINGER LIFTS, NOT WHEN THE PAGE GETS ROUND TO THE CLICK. Several screens answer a tap by their own timing and then call `element.click()` themselves - the Confirm of the
 * birthplace does so about two seconds after the touch, with a click that is `isTrusted: false` - so a pulse tied to that click came late or never. The lift of a real finger (a trusted pointer-up
 * that has not travelled further than TAP_SLOP_PX since it went down, on something that is a control) is the tap, and is felt at once; the click that follows it from the same finger within
 * TAP_FOLLOW_MS is the same tap and is not felt twice. A click with no finger before it (a script's) is still refused, and a click of the browser's own with no pointer-up (a keyboard's Enter on a
 * button) is felt as before.
 *
 * It goes through the application's haptics (hapticsService.ts), so the person's On / Off choice in Settings governs it exactly as it governs everything else, and where there is no
 * vibration (iOS Safari, a desktop) it is a quiet no-op. A control that has a cue of its own - the deck that shuffles, a card that is chosen - asks for it AFTER this, in its own handler, and
 * a vibration asked for later replaces this one, so the screen's own pattern is what is felt, never two stacked.
 */
/** The pulse of an ordinary tap: the application's 'select' cue (16 ms). */
export const TAP_CUE = 'select';
/** Anything this selector matches is a control by what it is. */
const CONTROL_SELECTOR = [
    'button',
    'a[href]',
    'summary',
    'select',
    'input[type="button"]',
    'input[type="submit"]',
    'input[type="reset"]',
    'input[type="checkbox"]',
    'input[type="radio"]',
    'input[type="range"]',
    '[role="button"]',
    '[role="tab"]',
    '[role="switch"]',
    '[role="menuitem"]',
    '[role="menuitemradio"]',
    '[role="option"]',
    '[role="checkbox"]',
    '[role="radio"]',
    '[data-menu-item]',
    '[data-pillar-open]',
    '[data-tarot-open]',
    '[data-connections-open]',
    '[data-forecast-open]',
    '[data-menu-open]',
    /* a field a finger is put into: the text cursor is not a pointer cursor, so it is named here */
    'input:not([type])',
    'input[type="text"]',
    'input[type="search"]',
    'input[type="email"]',
    'input[type="tel"]',
    'input[type="url"]',
    'input[type="number"]',
    'input[type="password"]',
    'textarea',
].join(',');
/** A control that is switched off does not answer. */
const DISABLED_SELECTOR = ':disabled, [aria-disabled="true"], [disabled]';
/**
 * Should this click be felt? `cursorOf` reports the pointer cursor the element is shown with: the application marks a tappable thing that is not a button (a card, a strip stop, a tile) with
 * `cursor: pointer`, so a thing a person is invited to tap is found by that even where it is a plain element.
 */
export function shouldAnswerTap(event, cursorOf) {
    if (!event.isTrusted)
        return false;
    if (typeof event.button === 'number' && event.button > 0)
        return false;
    const target = event.target;
    if (!target || typeof target.closest !== 'function')
        return false;
    const element = target;
    if (element.closest(DISABLED_SELECTOR))
        return false;
    if (element.closest(CONTROL_SELECTOR))
        return true;
    return cursorOf(element) === 'pointer';
}
/** Two clicks closer than this are one tap felt once (a label and the control it forwards to). */
export const TAP_MIN_GAP_MS = 40;
/** A click the page makes itself is a tap if a real pointer-up on that control came this recently, and the finger had not travelled further than this since it went down. */
export const TAP_FOLLOW_MS = 600;
export const TAP_SLOP_PX = 14;
const browserCursor = (element) => {
    try {
        return getComputedStyle(element).cursor;
    }
    catch {
        return '';
    }
};
/** The listener, separate from its installation so it can be given a haptics and a clock. */
export function createTapFeedback(options = {}) {
    const cursorOf = options.cursorOf ?? browserCursor;
    const now = options.now ?? (() => (typeof performance !== 'undefined' ? performance.now() : Date.now()));
    let last = Number.NEGATIVE_INFINITY;
    return (event) => {
        if (!shouldAnswerTap(event, cursorOf))
            return false;
        const at = now();
        if (at - last < TAP_MIN_GAP_MS)
            return false;
        last = at;
        return (options.haptics ?? appHaptics()).cue(TAP_CUE);
    };
}
/** Is a click on `target` the follow-through of the finger that came up on `up`? Pure, so it can be tested. */
export function followsFinger(up, target, at) {
    if (!up || up.travelled > TAP_SLOP_PX || at - up.at > TAP_FOLLOW_MS || at < up.at)
        return false;
    const a = up.target;
    const b = target;
    if (!a || !b || typeof a.contains !== 'function' || typeof b.contains !== 'function')
        return a === b;
    return a === b || a.contains(b) || b.contains(a);
}
/** Listen on the document, once. Returns the function that stops it. */
export function installTapFeedback(target = document, options = {}) {
    const answer = createTapFeedback(options);
    const clock = options.now ?? (() => (typeof performance !== 'undefined' ? performance.now() : Date.now()));
    let down = null;
    /** The last finger's lift that was FELT: the click that follows it is the same tap. */
    let felt = null;
    const onDown = (event) => {
        const pointer = event;
        if (pointer.isTrusted)
            down = { x: pointer.clientX, y: pointer.clientY };
    };
    const onUp = (event) => {
        const pointer = event;
        if (!pointer.isTrusted)
            return;
        const travelled = down ? Math.hypot(pointer.clientX - down.x, pointer.clientY - down.y) : 0;
        down = null;
        if (travelled > TAP_SLOP_PX)
            return;
        if (answer({ isTrusted: true, target: pointer.target, button: pointer.button }))
            felt = { target: pointer.target, at: clock(), travelled };
    };
    const onClick = (event) => {
        const click = event;
        if (followsFinger(felt, click.target, clock()))
            return;
        answer(click);
    };
    target.addEventListener('pointerdown', onDown, { capture: true, passive: true });
    target.addEventListener('pointerup', onUp, { capture: true, passive: true });
    target.addEventListener('click', onClick, { capture: true, passive: true });
    return () => {
        target.removeEventListener('pointerdown', onDown, { capture: true });
        target.removeEventListener('pointerup', onUp, { capture: true });
        target.removeEventListener('click', onClick, { capture: true });
    };
}
