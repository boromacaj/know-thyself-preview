import { createShakeDetector } from './shakeDetector.js?v=b5ef5ed';
/** How long to wait for a first usable sample before concluding there is no sensor. */
export const MOTION_SIGNAL_TIMEOUT_MS = 3000;
/** The single, short acknowledgement when a shake is accepted. */
export const SHAKE_VIBRATION_MS = 30;
const usable = (v) => (!!v && typeof v.x === 'number' && typeof v.y === 'number' && typeof v.z === 'number');
/** One sample from one event: linear acceleration where the device has it, otherwise the one with gravity in it. */
export function sampleOf(event, fallbackTime) {
    const t = typeof event.timeStamp === 'number' && Number.isFinite(event.timeStamp) ? event.timeStamp : fallbackTime;
    if (usable(event.acceleration)) {
        return { t, x: event.acceleration.x, y: event.acceleration.y, z: event.acceleration.z, includesGravity: false };
    }
    if (usable(event.accelerationIncludingGravity)) {
        const g = event.accelerationIncludingGravity;
        return { t, x: g.x, y: g.y, z: g.z, includesGravity: true };
    }
    return null;
}
export function motionSupport(win) {
    const api = win.DeviceMotionEvent;
    if (!api)
        return 'unsupported';
    /* A device you shake is a device you hold. Desktops expose the API without a sensor; asking them is noise. */
    const touch = (win.navigator?.maxTouchPoints ?? 0) > 0;
    const coarse = typeof win.matchMedia === 'function' && win.matchMedia('(pointer: coarse)').matches;
    if (!touch && !coarse)
        return 'unsupported';
    return typeof api.requestPermission === 'function' ? 'needs-permission' : 'available';
}
export async function requestMotionPermission(win) {
    const api = win.DeviceMotionEvent;
    if (!api)
        return 'unsupported';
    if (typeof api.requestPermission !== 'function')
        return 'granted';
    try {
        const answer = await api.requestPermission();
        /*
         * ONLY AN EXPLICIT "denied" IS A REFUSAL. iOS answers "granted" or "denied". Chromium-based browsers (Chrome and Samsung Internet on Android) have the same method now, and it can answer "prompt" -
         * "not decided yet", which is not a refusal, and where motion is allowed by default the events flow regardless. Treating anything but "granted" as a refusal switched shake-to-shuffle off for
         * good on those phones. So "prompt" goes on to listen, and the port's own signal check (MOTION_SIGNAL_TIMEOUT_MS) says honestly if no sensor answers.
         */
        return answer === 'denied' ? 'denied' : 'granted';
    }
    catch {
        return 'denied';
    }
}
export function createBrowserMotionPort(win = window, config = {}, portOptions = {}) {
    const reducedMotion = () => typeof win.matchMedia === 'function' && win.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return {
        support: () => motionSupport(win),
        request: () => requestMotionPermission(win),
        listen(listener) {
            const detector = createShakeDetector(config);
            let attached = true;
            let sawSignal = false;
            let probe = null;
            const stop = () => {
                if (!attached)
                    return;
                attached = false;
                win.removeEventListener('devicemotion', handler);
                if (probe !== null)
                    win.clearTimeout(probe);
                probe = null;
                detector.reset();
            };
            const handler = (event) => {
                if (!attached)
                    return;
                const sample = sampleOf(event, Date.now());
                if (sample === null)
                    return;
                sawSignal = true;
                if (!detector.push(sample))
                    return;
                /* Accepted: detach first, so that no further event can trigger a second shuffle, then acknowledge. */
                stop();
                try {
                    if (portOptions.acknowledge !== undefined) {
                        /* The application's haptics decide: the person's switch, the pulse and the pattern are theirs, not the port's. */
                        portOptions.acknowledge?.();
                    }
                    else if (!reducedMotion()) {
                        /* Haptics are a courtesy: brief, optional, and not for people who asked for less movement. */
                        win.navigator?.vibrate?.(SHAKE_VIBRATION_MS);
                    }
                }
                catch { /* a refusal to vibrate is not an error */ }
                listener.onShake();
            };
            win.addEventListener('devicemotion', handler);
            probe = win.setTimeout(() => {
                probe = null;
                if (attached && !sawSignal) {
                    stop();
                    listener.onUnavailable();
                }
            }, MOTION_SIGNAL_TIMEOUT_MS);
            return stop;
        },
    };
}
