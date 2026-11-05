import { appHaptics } from './hapticsService.js?v=d9a1a90';
/*
 * A SONAR RING IS FELT, FOR THE MOMENT IT LEAVES.
 *
 * KT SONAR EFFECT rings idle for the first 60 % of their period and then grow and fade (sonarAffordance.ts). When a ring begins its cycle this waits for that 60 % and gives the
 * softest tick the phone has, so the eye and the hand get the same instant. It is a courtesy and it stays one: only a ring that is on screen in a visible page, never two within a
 * second of each other however many rings a view carries, and nothing at all when haptics are switched off (hapticsService.ts) or the person asked for less motion.
 */
/** The ring's idle share of the period: its keyframes (kt-sonar-fade) hold still until 60 % and the ring is seen from 68 %. */
export const SONAR_IDLE_SHARE = 0.62;
/** Two rings closer than this are one feeling. Rings that take turns (the "i" controls, the hero capsules) start 0.22 s apart and each is felt; rings that start together are one tick. */
export const SONAR_MIN_GAP_MS = 120;
/** The fades of the heroes' own sequenced waves, whose wave starts when the animation (after its delay) starts: Human Design's nine centres (humanDesignHeroStyle.ts), Numerology's four circles (numerologySonarTargets.ts), BaZi's hero and pentagon (baziSonarTargets.ts). The Human Design tap wave (hd-tap-fade) is the answer to a touch and is not part of it. */
export const SCAN_FADE_ANIMATION = 'hd-ping9-fade';
const SCAN_FADE_NAMES = new Set([SCAN_FADE_ANIMATION, 'nm-ping4-fade', 'bz-seq4-fade', 'bz-seq5-fade']);
const FADE_ANIMATION = /(^|-)sonar-fade$|^kt-sonar-fade$/;
const parseSeconds = (value) => {
    const first = value.split(',')[0]?.trim() ?? '';
    const seconds = first.endsWith('ms') ? parseFloat(first) / 1000 : parseFloat(first);
    return Number.isFinite(seconds) ? seconds : 0;
};
export function installSonarHaptics(target = document, options = {}) {
    const clock = options.now ?? (() => performance.now());
    let last = Number.NEGATIVE_INFINITY;
    const timers = new Set();
    /* The heroes' sequenced scans (Human Design centres, Numerology circles, BaZi petals): each target's wave starts on its own turn (0.225 s after the one before, CSS only), and the phone gets the softest tick as THAT wave starts. */
    const onScanWave = (ring) => {
        const element = ring.target;
        if (!element || typeof element.getBoundingClientRect !== 'function')
            return;
        if (document.visibilityState !== 'visible')
            return;
        if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches)
            return;
        try {
            if (getComputedStyle(element, ring.pseudoElement || null).animationPlayState.split(',')[0]?.trim() === 'paused')
                return;
        }
        catch { /* no style, no veto */ }
        const box = element.getBoundingClientRect();
        if (!(box.width > 0 && box.height > 0 && box.bottom > 0 && box.top < window.innerHeight && box.right > 0 && box.left < window.innerWidth))
            return;
        (options.haptics ?? appHaptics()).cue('scan');
    };
    const onRing = (event) => {
        const ring = event;
        if (SCAN_FADE_NAMES.has(ring.animationName)) {
            onScanWave(ring);
            return;
        }
        if (!FADE_ANIMATION.test(ring.animationName))
            return;
        const element = ring.target;
        if (!element || typeof element.getBoundingClientRect !== 'function')
            return;
        if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches)
            return;
        let period = 0;
        try {
            period = parseSeconds(getComputedStyle(element, ring.pseudoElement || null).animationDuration);
        }
        catch {
            period = 0;
        }
        if (period <= 0)
            return;
        const timer = window.setTimeout(() => {
            timers.delete(timer);
            if (document.visibilityState !== 'visible')
                return;
            const box = element.getBoundingClientRect();
            const inView = box.width > 0 && box.height > 0 && box.bottom > 0 && box.top < window.innerHeight && box.right > 0 && box.left < window.innerWidth;
            if (!inView)
                return;
            const at = clock();
            if (at - last < SONAR_MIN_GAP_MS)
                return;
            last = at;
            (options.haptics ?? appHaptics()).cue('sonar');
        }, period * 1000 * SONAR_IDLE_SHARE);
        timers.add(timer);
    };
    target.addEventListener('animationstart', onRing, { capture: true, passive: true });
    target.addEventListener('animationiteration', onRing, { capture: true, passive: true });
    return () => {
        target.removeEventListener('animationstart', onRing, { capture: true });
        target.removeEventListener('animationiteration', onRing, { capture: true });
        for (const timer of timers)
            window.clearTimeout(timer);
        timers.clear();
    };
}
