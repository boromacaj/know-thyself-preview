/*
 * ANIMATIONS THAT ARE NOT MOVING COST NOTHING.
 *
 * The artwork of the main menu (the four pillars, the Synthesis card and its traces, the three lower cards) is made of several hundred looping SVG animations. They are long
 * loops - a 34 s cycle in which a line is drawn, glows, and then rests - so at any moment only a small part of them changes a pixel: measured on the Galaxy A55's menu, 482 CSS
 * animations ran and on average 12 % of each one's cycle had values that differ from its neighbouring keyframes; 60 were mid-change at the instant of the census. But the browser
 * does not know that a keyframe interval with identical values on both ends is a rest: it re-evaluates the style of every running animation on every frame, which was 6.6 ms of the
 * main thread per frame, and it keeps every one that animates opacity on a layer of its own (445 composited layers).
 *
 * WHAT THIS DOES. For every infinite, linear-clocked CSS animation it reads the animation's own keyframes, finds the stretches of the cycle in which nothing changes, and PAUSES the
 * animation for the length of each such rest, resuming it a moment BEFORE the next stretch of change. Its clock never stops: at every resume the animation is put exactly where the
 * document's clock says it would have been, so the picture is the same one at every instant - nothing is re-timed, re-drawn or approximated; only the idle bookkeeping is skipped.
 * A paused animation holds its value, which during a rest is the value it would have had anyway.
 *
 * It decides only by the keyframes, never by what the animation draws, so it holds for every artwork, present and future. It stays out of anything it cannot reason about exactly
 * (finite animations, a changed playback rate or iteration start, a keyframe that adds to the underlying value, an animation the page itself paused) and gives control back the
 * moment the page touches one.
 */
import { flattenOpacityAnimation, forgetAnimatedGroups } from './paintOpacity.js?v=d9a1a90';
const NON_VALUE_KEYS = new Set(['offset', 'easing', 'composite', 'computedOffset']);
/** Rests are only used when they are longer than this plus the margins, so a short rest is never chased with pauses. */
export const MIN_REST_MS = 400;
/** An animation is resumed this long before the change it is about to show, and paused this long after the change it has just shown. */
export const LEAD_MS = 120;
export const TAIL_MS = 60;
/**
 * The parts of the 0..1 progress in which the animation's values change (adjacent keyframes that differ), merged. A gap before the first or after the last keyframe is the
 * element's underlying value being animated towards a keyframe: it counts as change. Null when the keyframes cannot be reasoned about (one that composites onto the underlying value).
 */
export function activeIntervals(keyframes, direction = 'normal') {
    if (keyframes.length < 2)
        return null;
    const offsetOf = (frame) => (typeof frame.computedOffset === 'number' ? frame.computedOffset : typeof frame.offset === 'number' ? frame.offset : Number.NaN);
    const intervals = [];
    const push = (lo, hi, point = false) => {
        if (!(hi > lo) && !point)
            return;
        const last = intervals[intervals.length - 1];
        if (last !== undefined && last.hi >= lo - 1e-9)
            intervals[intervals.length - 1] = { lo: last.lo, hi: Math.max(last.hi, hi) };
        else
            intervals.push({ lo, hi });
    };
    const first = keyframes[0];
    const last = keyframes[keyframes.length - 1];
    if (!Number.isFinite(offsetOf(first)) || !Number.isFinite(offsetOf(last)))
        return null;
    for (const frame of keyframes)
        if (frame.composite !== undefined && frame.composite !== 'replace' && frame.composite !== 'auto')
            return null;
    push(0, offsetOf(first));
    for (let index = 0; index < keyframes.length - 1; index += 1) {
        const from = keyframes[index];
        const to = keyframes[index + 1];
        const keys = new Set([...Object.keys(from), ...Object.keys(to)].filter((key) => !NON_VALUE_KEYS.has(key)));
        let differs = false;
        for (const key of keys)
            if (String(from[key]) !== String(to[key])) {
                differs = true;
                break;
            }
        /* two keyframes at one offset are a step: a change at a single instant, kept as a zero-length span (its margins make it a short stretch of running) */
        if (differs)
            push(offsetOf(from), offsetOf(to), true);
    }
    push(offsetOf(last), 1);
    /* where one iteration ends and the next begins the value jumps back, unless the direction turns round there (alternate): that instant is a change too */
    if (direction === 'normal' || direction === 'reverse') {
        const keys = new Set([...Object.keys(first), ...Object.keys(last)].filter((key) => !NON_VALUE_KEYS.has(key)));
        for (const key of keys)
            if (String(first[key]) !== String(last[key])) {
                push(1, 1, true);
                break;
            }
    }
    return intervals;
}
/** The spans of one full period of local time (the period: one iteration, or two for an alternating direction) in which the values change. */
export function activeSpans(intervals, timing) {
    const { duration, direction } = timing;
    const forward = intervals.map((interval) => ({ lo: interval.lo * duration, hi: interval.hi * duration }));
    const backward = intervals.map((interval) => ({ lo: (1 - interval.hi) * duration, hi: (1 - interval.lo) * duration })).reverse();
    if (direction === 'normal')
        return { period: duration, spans: forward };
    if (direction === 'reverse')
        return { period: duration, spans: backward };
    const firstHalf = direction === 'alternate' ? forward : backward;
    const secondHalf = (direction === 'alternate' ? backward : forward).map((span) => ({ lo: span.lo + duration, hi: span.hi + duration }));
    const spans = [];
    for (const span of [...firstHalf, ...secondHalf]) {
        const last = spans[spans.length - 1];
        if (last !== undefined && last.hi >= span.lo - 1e-6)
            spans[spans.length - 1] = { lo: last.lo, hi: Math.max(last.hi, span.hi) };
        else
            spans.push({ lo: span.lo, hi: span.hi });
    }
    return { period: duration * 2, spans };
}
/** Rests shorter than the margins are not rests: the spans on either side of one are joined. A span that wraps round the period is kept as two. */
export function mergeShortRests(spans, period, minRest = MIN_REST_MS) {
    if (spans.length === 0)
        return [];
    const joined = [];
    for (const span of spans) {
        const last = joined[joined.length - 1];
        if (last !== undefined && span.lo - last.hi < minRest)
            joined[joined.length - 1] = { lo: last.lo, hi: span.hi };
        else
            joined.push({ lo: span.lo, hi: span.hi });
    }
    /* the rest across the period's end */
    const head = joined[0];
    const tail = joined[joined.length - 1];
    if (joined.length > 1 && head.lo + (period - tail.hi) < minRest) {
        return [{ lo: tail.lo - period, hi: head.hi }, ...joined.slice(1, -1)].sort((a, b) => a.lo - b.lo);
    }
    return joined;
}
/** Where `local` (milliseconds into the cycle, any value) falls: inside a change (plus its margins) or in a rest, and how long until that changes. */
export function phaseAt(spans, period, local) {
    if (spans.length === 0)
        return { active: false, wakeIn: Number.POSITIVE_INFINITY };
    const t = ((local % period) + period) % period;
    let best = Number.POSITIVE_INFINITY;
    for (const cycle of [-1, 0, 1]) {
        const shift = cycle * period;
        for (const span of spans) {
            const start = span.lo + shift - LEAD_MS;
            const end = span.hi + shift + TAIL_MS;
            if (t >= start && t < end)
                return { active: true, wakeIn: end - t };
            if (start > t && start - t < best)
                best = start - t;
        }
    }
    return { active: false, wakeIn: best };
}
const MIN_WAKE_MS = 24;
/**
 * NO TASK OF THIS MODULE IS LONG. Showing a screen starts hundreds of animations in one frame (the main menu: about 480), and every one of them fires `animationstart`. Handling each event where it fell
 * (an element's getAnimations(), then the registration of what it found, which moves opacity onto paint properties) was measured on the Galaxy A55 as ONE task of 1.2-1.6 s on every return to the
 * menu - 1275 ms of a 1463 ms task in the CPU profile - which is what made the return the slowest thing in the app. A burst of starts is now ONE scan, a moment after the burst began (BURST_MS), the
 * animations it finds are registered in slices of at most SLICE_MS, and the first pause of the resting ones is sliced the same way. The same animations end up managed and paused; they are paused
 * a few frames later, which is when nothing depends on them yet.
 */
export const SLICE_MS = 6;
export const BURST_MS = 60;
/** Artwork whose animations are never paused between strokes: its parts must stay on one clock (see describe()). */
export const KEEP_RUNNING = '.kt-menu-fc';
/** Not yet running (a style change has only just started it): look again soon, do not write it off. */
const LATER = 'later';
function describe(animation) {
    const effect = animation.effect;
    if (effect === null || typeof effect.getKeyframes !== 'function' || typeof effect.getTiming !== 'function')
        return null;
    const cssAnimation = globalThis.CSSAnimation;
    if (cssAnimation === undefined || !(animation instanceof cssAnimation))
        return null;
    /* The Forecast card's pictograms take turns on one shared 10 s clock and two of them must never be on the card together. They are a handful of compositor-only animations (transform, opacity) and
       cost nothing to keep running; pausing and resuming each one on its own (a resume lands a frame late, by as much as a busy frame takes) is what could put two of them on stage at once. */
    const owner = effect.target;
    if (owner && typeof owner.closest === 'function' && owner.closest(KEEP_RUNNING))
        return null;
    const timing = effect.getTiming();
    if (timing.iterations !== Number.POSITIVE_INFINITY || animation.playbackRate !== 1)
        return null;
    if (typeof timing.duration !== 'number' || !(timing.duration > 0))
        return null;
    if ((timing.iterationStart ?? 0) !== 0 || (timing.endDelay ?? 0) !== 0 || (timing.easing ?? 'linear') !== 'linear')
        return null;
    if (animation.playState === 'idle')
        return null;
    if (animation.playState !== 'running' || animation.startTime === null || typeof animation.startTime !== 'number')
        return LATER;
    const direction = (timing.direction ?? 'normal');
    const intervals = activeIntervals(effect.getKeyframes(), direction);
    if (intervals === null)
        return null;
    const { period, spans } = activeSpans(intervals, { duration: timing.duration, direction });
    const merged = mergeShortRests(spans, period);
    /* an animation that never rests is left alone: there is nothing to save */
    const rest = merged.length === 0 ? period : merged.reduce((sum, span) => sum + (span.hi - span.lo), 0);
    if (merged.length > 0 && rest >= period - MIN_REST_MS)
        return null;
    return { animation, spans: merged, period, delay: timing.delay ?? 0, origin: animation.startTime, held: false, wakeAt: 0 };
}
export function startAnimationDutyCycle(target = document, options = {}) {
    const flatten = options.flatten !== false;
    const entries = new Map();
    const refused = new WeakSet();
    const flattened = new WeakSet();
    let timer = 0;
    let stopped = false;
    let retry = false;
    let retryTimer = 0;
    let scanTimer = 0;
    let drainTimer = 0;
    let queue = [];
    const clock = () => target.timeline?.currentTime ?? performance.now();
    const register = (animation) => {
        if (entries.has(animation) || refused.has(animation))
            return;
        if (flatten && !flattened.has(animation)) {
            flattened.add(animation);
            try {
                flattenOpacityAnimation(animation);
            }
            catch { /* an animation that cannot be moved is left as it is */ }
        }
        const entry = describe(animation);
        if (entry === LATER) {
            retry = true;
            return;
        }
        if (entry === null) {
            refused.add(animation);
            return;
        }
        entries.set(animation, entry);
    };
    /** One slice of registrations: as many as fit in SLICE_MS, the rest in the next slice. */
    const drain = () => {
        drainTimer = 0;
        if (stopped)
            return;
        const began = performance.now();
        while (queue.length > 0 && performance.now() - began < SLICE_MS)
            register(queue.pop());
        schedule(0);
        if (queue.length > 0) {
            drainTimer = window.setTimeout(drain, 0);
            return;
        }
        if (retry && retryTimer === 0)
            retryTimer = window.setTimeout(() => { retryTimer = 0; scan(); }, 400);
    };
    /** Look at the whole document once (one getAnimations()), queue what is not known yet, and register it in slices. */
    const scan = () => {
        scanTimer = 0;
        if (stopped)
            return;
        retry = false;
        forgetAnimatedGroups();
        queue = target.getAnimations().filter((animation) => !entries.has(animation) && !refused.has(animation));
        if (drainTimer === 0)
            drain();
    };
    /** A burst of animationstart events is one scan, BURST_MS after the first of them. */
    const scanSoon = () => {
        if (scanTimer === 0 && !stopped)
            scanTimer = window.setTimeout(scan, BURST_MS);
    };
    const rescan = () => {
        if (scanTimer !== 0) {
            window.clearTimeout(scanTimer);
            scanTimer = 0;
        }
        scan();
    };
    /** Bring one animation to the state its cycle calls for at `now`; returns when to look at it again (timeline ms). */
    const settle = (entry, now) => {
        const animation = entry.animation;
        if (animation.playState === 'idle' || animation.effect === null) {
            entries.delete(animation);
            return Number.POSITIVE_INFINITY;
        }
        const local = now - entry.origin - entry.delay;
        const phase = phaseAt(entry.spans, entry.period, local);
        if (phase.active) {
            if (entry.held || animation.playState === 'paused') {
                /* back to where the document's clock says it is, then running */
                animation.currentTime = now - entry.origin;
                animation.play();
                entry.held = false;
            }
        }
        else if (!entry.held && animation.playState === 'running') {
            animation.pause();
            entry.held = true;
        }
        else if (entry.held && animation.playState === 'running') {
            /* the page resumed it: it is the page's again, until the next change of state */
            entry.held = false;
        }
        return now + Math.max(MIN_WAKE_MS, phase.wakeIn);
    };
    const tick = () => {
        timer = 0;
        if (stopped)
            return;
        const began = performance.now();
        const now = clock();
        let next = Number.POSITIVE_INFINITY;
        let more = false;
        for (const entry of entries.values()) {
            if (entry.wakeAt <= now + 2) {
                /* the first pause of several hundred resting animations is not one task: what is left waits for the next slice */
                if (performance.now() - began >= SLICE_MS) {
                    more = true;
                    continue;
                }
                entry.wakeAt = settle(entry, now);
            }
            if (entry.wakeAt < next)
                next = entry.wakeAt;
        }
        if (more) {
            schedule(0);
            return;
        }
        if (Number.isFinite(next))
            schedule(Math.max(MIN_WAKE_MS, next - clock()));
    };
    const schedule = (delay) => {
        if (stopped)
            return;
        if (timer !== 0)
            window.clearTimeout(timer);
        timer = window.setTimeout(tick, delay);
    };
    const onStart = () => { scanSoon(); };
    target.addEventListener('animationstart', onStart, { capture: true, passive: true });
    const watchdog = window.setInterval(scanSoon, 5000);
    rescan();
    return {
        stats: () => ({ managed: entries.size, resting: [...entries.values()].filter((entry) => entry.held).length }),
        rescan,
        stop() {
            stopped = true;
            window.clearTimeout(timer);
            window.clearTimeout(scanTimer);
            window.clearTimeout(drainTimer);
            window.clearInterval(watchdog);
            window.clearTimeout(retryTimer);
            queue = [];
            target.removeEventListener('animationstart', onStart, { capture: true });
            const now = clock();
            for (const entry of entries.values()) {
                if (entry.held) {
                    entry.animation.currentTime = now - entry.origin;
                    entry.animation.play();
                    entry.held = false;
                }
            }
            entries.clear();
        },
    };
}
