/*
 * THE "i" CONTROLS TAKE THEIR TURNS.
 *
 * The "i" next to a fact (Chart ruler, Stellium, Tightest aspect...) wears the KT sonar ring. Each one was given the same delay, so on a screen with a column of them every ring left in the same
 * instant: one flash, and (with the phone's softest tick) one vibration. The owner asked for the Human Design hero's scan instead: a wave that goes through them from the top of the screen to the
 * bottom, each starting 0.225 s after the one before (heroSonarSequence.ts FAST_PING.startInterval), quickly one after another.
 *
 * This only decides WHEN each ring starts. The ring is the standard's own (sonarAffordance.ts, 2.8 s loop of which the last 40 % is the wave): a control's `--kt-sonar-delay` is index x 0.225 s, in document
 * order within its screen, so the waves are 0.225 s apart however many there are (a loop of 2.8 s holds twelve). More than twelve in one screen start a second scan (the index wraps), they never
 * queue past one loop. Nothing is drawn or removed here, and the hero capsules (their own 0 / 0.22 / 0.45 s) are not touched.
 */
import { FAST_PING } from './heroSonarSequence.js?v=d9a1a90';
/** How many rings take turns before the scan starts over: the standard loop (2.8 s) holds twelve starts 0.225 s apart. */
export const SEQUENCE_SLOTS = 12;
const CONTROL = '.kt-info-control';
const SCREEN = '.kt-pillar-view, .kt-pillar-surface';
export const sequenceDelay = (index) => `${Number(((index % SEQUENCE_SLOTS) * FAST_PING.startInterval).toFixed(4))}s`;
/** Give every "i" of the document its turn, per screen, in document order. Returns how many were set. */
export function sequenceInfoControls(root = document) {
    const screens = new Map();
    for (const control of root.querySelectorAll(`#place-experience ${CONTROL}`)) {
        const screen = control.closest(SCREEN) ?? control.ownerDocument.body;
        const list = screens.get(screen);
        if (list)
            list.push(control);
        else
            screens.set(screen, [control]);
    }
    let set = 0;
    for (const controls of screens.values()) {
        controls.forEach((control, index) => {
            const delay = sequenceDelay(index);
            if (control.style.getPropertyValue('--kt-sonar-delay') !== delay)
                control.style.setProperty('--kt-sonar-delay', delay);
            set += 1;
        });
    }
    return set;
}
/** Keep the turns right as screens are built: one observer, one short debounce, child list only (setting a style is not a child-list change, so it cannot loop). */
export function installSonarSequence(doc = document) {
    let timer = 0;
    const schedule = () => {
        if (timer)
            return;
        timer = window.setTimeout(() => { timer = 0; try {
            sequenceInfoControls(doc);
        }
        catch { /* a screen without the control needs nothing */ } }, 120);
    };
    const observer = new MutationObserver(schedule);
    observer.observe(doc.body ?? doc.documentElement, { childList: true, subtree: true });
    schedule();
    return () => { observer.disconnect(); if (timer)
        window.clearTimeout(timer); timer = 0; };
}
