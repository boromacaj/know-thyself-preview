/*
 * ONE VERTICAL WHEEL - THE ENGINE BOTH PICKERS ARE MADE OF.
 *
 * A wheel is a native scroll container with CSS scroll snapping, so the platform supplies what a hand-written physics loop would only imitate: the fling, its natural
 * deceleration, rubber-banding, the mouse wheel and the keyboard's own scrolling, and a fast fling across decades of years. What this module adds on top is the CYLINDER:
 * while the list moves, every row near the centre is tilted, scaled, faded and pulled in as if it stood on the side of a gently curved drum (fisheyeFor), and the centred row
 * is marked as the value. It does this ONLY while the wheel is moving - there is no animation loop: a scroll event schedules one frame of updates, so a wheel at rest costs
 * nothing - and only for the nine rows around the centre, so the work per frame is constant whatever the length of the list.
 *
 * VALUE. The centred row is the value. It is reported live while the wheel turns (onTick, when the centred row changes) and once it has come to rest (onSettle), after the
 * rest position has been corrected to an exact row. Setting a value from code (setIndex) moves the wheel without reporting it back.
 *
 * INPUT. Touch and the trackpad scroll natively (touch-action: pan-y, overscroll-behavior: contain: the page does not scroll with the wheel). The mouse wheel moves one row
 * per notch, a mouse drag turns the wheel, a tap or a click on a row brings it to the centre, and the keyboard has arrows, Page keys, Home and End. The wheel is one
 * spinbutton for assistive technology (its rows are decoration; the value is announced as text).
 */
import { appHaptics } from '../haptics/hapticsService.js?v=d9a1a90';
/** Rows a wheel shows. The compositor-driven drum (wheelStyle.ts) is drawn for this number. */
export const WHEEL_ROWS = 5;
/** Rows either side of the centre that carry the drum's animation: wider than the visible half, so a fast fling never outruns it. */
const NEAR_ROWS = 8;
/** Two detents closer than this are one feeling. */
const TICK_GAP_MS = 22;
/** Scroll-driven animations (a view() timeline) run on the compositor: the drum then follows the finger with no JavaScript in the frame at all. */
export const drivenDrum = () => typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('animation-timeline: view()');
/** The drum's gentle curve: the radius, in rows. A bigger radius is a flatter wheel. */
export const FISHEYE_RADIUS_ROWS = 5.4;
/**
 * THE CYLINDER FOR ONE ROW. `offsetRows` is the row's distance from the centre in rows (negative above, positive below, fractional while the wheel turns); the result is the
 * transform and opacity that make the row look as if it were on a drum of radius FISHEYE_RADIUS_ROWS seen from the front. Subtle by design: one row away is 0.91 of the
 * size and 0.64 as bright, two rows away 0.81 and 0.2, and the tilt is 10 and 21 degrees.
 */
export function fisheyeFor(offsetRows, rowHeight, flat = false) {
    const distance = Math.abs(offsetRows);
    const scale = Math.max(0.66, 1 - 0.095 * distance);
    const opacity = Math.max(0, Math.min(1, 1 - 0.36 * Math.pow(distance, 1.12)));
    if (flat)
        return { translateY: 0, rotateX: 0, scale, opacity };
    const angle = offsetRows / FISHEYE_RADIUS_ROWS;
    const onDrum = FISHEYE_RADIUS_ROWS * Math.sin(angle);
    return { translateY: (onDrum - offsetRows) * rowHeight, rotateX: -(angle * 180) / Math.PI, scale, opacity };
}
const reducedMotion = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clampIndex = (index, count) => Math.max(0, Math.min(count - 1, Math.round(index)));
export function createWheel(options) {
    const rows = options.rows ?? WHEEL_ROWS;
    const rowHeight = options.rowHeight ?? 40;
    const half = (rows - 1) / 2;
    const reach = half + 2;
    const abort = new AbortController();
    const { signal } = abort;
    const root = document.createElement('div');
    root.className = `kt-wheel${options.className ? ` ${options.className}` : ''}`;
    root.tabIndex = 0;
    root.setAttribute('role', 'spinbutton');
    root.setAttribute('aria-label', options.label);
    root.setAttribute('aria-orientation', 'vertical');
    root.style.setProperty('--kt-wheel-row', `${rowHeight}px`);
    root.style.setProperty('--kt-wheel-rows', String(rows));
    const scroller = document.createElement('div');
    scroller.className = 'kt-wheel-scroll';
    const before = document.createElement('div');
    before.className = 'kt-wheel-pad';
    before.style.height = `${half * rowHeight}px`;
    const after = before.cloneNode();
    scroller.append(before, after);
    root.append(scroller);
    let count = 0;
    const items = [];
    let committed = 0;
    let shown = -1;
    let windowLow = 0;
    let windowHigh = -1;
    let frame = 0;
    let settleTimer = 0;
    let pointerHeld = false;
    /** A scroll has been seen and the wheel has not come to rest yet. */
    let settlePending = false;
    let programmatic = 0;
    let dragStartY = 0;
    let dragStartTop = 0;
    let dragged = false;
    let wheelCarry = 0;
    let wheelAt = 0;
    let flat = reducedMotion();
    /* THE DRUM ON THE COMPOSITOR: each row near the centre carries a CSS scroll-driven animation (wheelStyle.ts), so its tilt, size and fade are computed with the scroll itself - never one frame late, never on the main thread. Without that support, paint() draws the same drum from scroll events. */
    const driven = rows === WHEEL_ROWS && drivenDrum();
    if (driven)
        root.classList.add('kt-wheel--drum');
    let lastTick = 0;
    const position = (index) => index * rowHeight;
    const setAria = () => {
        root.setAttribute('aria-valuemin', String(count > 0 ? options.valueNow(0) : 0));
        root.setAttribute('aria-valuemax', String(count > 0 ? options.valueNow(count - 1) : 0));
        if (count > 0) {
            root.setAttribute('aria-valuenow', String(options.valueNow(committed)));
            root.setAttribute('aria-valuetext', options.valueText(committed));
        }
    };
    const clearRow = (item) => {
        item.style.opacity = '';
        item.style.transform = '';
    };
    /** One frame: place the nine rows around the centre on the drum and mark the centred one. */
    const paint = () => {
        frame = 0;
        if (count === 0)
            return;
        const centre = scroller.scrollTop / rowHeight;
        const low = Math.max(0, Math.floor(centre) - reach);
        const high = Math.min(count - 1, Math.ceil(centre) + reach);
        if (driven) {
            /* only the rows that may come into view carry the animation: the window moves with the centre */
            const nearLow = Math.max(0, Math.floor(centre) - NEAR_ROWS);
            const nearHigh = Math.min(count - 1, Math.ceil(centre) + NEAR_ROWS);
            for (let index = windowLow; index <= windowHigh; index += 1) {
                if (index < nearLow || index > nearHigh)
                    items[index]?.classList.remove('is-near');
            }
            for (let index = nearLow; index <= nearHigh; index += 1)
                items[index]?.classList.add('is-near');
            windowLow = nearLow;
            windowHigh = nearHigh;
        }
        else {
            for (let index = windowLow; index <= windowHigh; index += 1) {
                if (index < low || index > high) {
                    const item = items[index];
                    if (item !== undefined)
                        clearRow(item);
                }
            }
            for (let index = low; index <= high; index += 1) {
                const item = items[index];
                if (item === undefined)
                    continue;
                const row = fisheyeFor(index - centre, rowHeight, flat);
                item.style.opacity = row.opacity.toFixed(3);
                item.style.transform = flat ? `scale(${row.scale.toFixed(3)})` : `translate3d(0, ${row.translateY.toFixed(2)}px, 0) rotateX(${row.rotateX.toFixed(2)}deg) scale(${row.scale.toFixed(3)})`;
            }
            windowLow = low;
            windowHigh = high;
        }
        const nearest = clampIndex(centre, count);
        if (nearest !== shown) {
            items[shown]?.classList.remove('is-selected');
            items[nearest]?.classList.add('is-selected');
            shown = nearest;
            if (programmatic === 0) {
                /* a detent under the thumb: felt, at most one per frame or so */
                const at = performance.now();
                if (at - lastTick >= TICK_GAP_MS) {
                    lastTick = at;
                    appHaptics().cue('tick');
                }
                options.onTick?.(nearest);
            }
        }
    };
    const schedule = () => {
        /* the driven drum needs no frame of its own: the bookkeeping is a handful of class changes, done in the scroll event itself */
        if (driven) {
            paint();
            return;
        }
        if (frame === 0)
            frame = window.requestAnimationFrame(paint);
    };
    const scrollToIndex = (index, animate) => {
        const top = position(clampIndex(index, count));
        if (animate && !reducedMotion())
            scroller.scrollTo({ top, behavior: 'smooth' });
        else {
            scroller.scrollTop = top;
        }
    };
    /** The wheel is at rest (or has been told to be): correct to an exact row, then report. */
    const settle = () => {
        window.clearTimeout(settleTimer);
        if (count === 0 || pointerHeld)
            return;
        pending = null;
        settlePending = false;
        const index = clampIndex(scroller.scrollTop / rowHeight, count);
        if (Math.abs(scroller.scrollTop - position(index)) > 0.5) {
            scroller.scrollTop = position(index);
        }
        paint();
        if (index !== committed) {
            committed = index;
            setAria();
            options.onSettle(index);
        }
    };
    const onScroll = () => {
        schedule();
        if (programmatic === 0)
            settlePending = true;
        window.clearTimeout(settleTimer);
        /* where scrollend exists it is the signal; the timer is the fallback and a backstop */
        settleTimer = window.setTimeout(settle, 140);
    };
    const makeItem = (index) => {
        const item = document.createElement('div');
        item.className = 'kt-wheel-item';
        item.dataset.index = String(index);
        item.setAttribute('aria-hidden', 'true');
        options.render(index, item);
        return item;
    };
    const build = () => {
        for (const item of items)
            item.remove();
        items.length = 0;
        for (let index = 0; index < count; index += 1) {
            const item = makeItem(index);
            items.push(item);
            after.before(item);
        }
        shown = -1;
        windowLow = 0;
        windowHigh = -1;
    };
    const jump = (index) => {
        programmatic += 1;
        committed = clampIndex(index, count);
        scroller.scrollTop = position(committed);
        paint();
        setAria();
        programmatic -= 1;
    };
    /* ------------------------------------------------------------ input */
    /* rapid key presses and wheel notches add up: each one moves from where the previous one is going, not from where the wheel happens to be mid-turn */
    let pending = null;
    const step = (delta) => {
        if (count === 0)
            return;
        const from = pending ?? clampIndex(scroller.scrollTop / rowHeight, count);
        pending = clampIndex(from + delta, count);
        scrollToIndex(pending, true);
    };
    root.addEventListener('keydown', (event) => {
        const page = options.pageStep ?? 5;
        const delta = event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : event.key === 'PageDown' ? page : event.key === 'PageUp' ? -page : 0;
        if (delta !== 0) {
            event.preventDefault();
            step(delta);
            return;
        }
        if (event.key === 'Home') {
            event.preventDefault();
            scrollToIndex(0, true);
        }
        else if (event.key === 'End') {
            event.preventDefault();
            scrollToIndex(count - 1, true);
        }
    }, { signal });
    /* the mouse wheel: one row per notch (a trackpad's stream of small deltas is gathered into rows) */
    root.addEventListener('wheel', (event) => {
        if (event.ctrlKey)
            return;
        event.preventDefault();
        const now = performance.now();
        if (now - wheelAt > 220)
            wheelCarry = 0;
        wheelAt = now;
        wheelCarry += event.deltaMode === 1 ? event.deltaY * 40 : event.deltaY;
        /* a notch of a mouse wheel is one row (its delta is 100 px at 100%, less when the page is zoomed or scaled); a trackpad's stream of small deltas adds up to rows */
        const rowsToMove = Math.max(-3, Math.min(3, Math.trunc(wheelCarry / 28)));
        if (rowsToMove !== 0) {
            wheelCarry -= rowsToMove * 28;
            step(rowsToMove > 1 ? 1 : rowsToMove < -1 ? -1 : rowsToMove);
        }
    }, { passive: false, signal });
    /* a mouse drag turns the wheel (touch scrolls natively) */
    scroller.addEventListener('pointerdown', (event) => {
        pointerHeld = true;
        window.clearTimeout(settleTimer);
        dragged = false;
        if (event.pointerType !== 'mouse' || event.button !== 0)
            return;
        dragStartY = event.clientY;
        dragStartTop = scroller.scrollTop;
        scroller.setPointerCapture(event.pointerId);
        root.classList.add('is-dragging');
    }, { signal });
    scroller.addEventListener('pointermove', (event) => {
        if (!root.classList.contains('is-dragging'))
            return;
        const moved = event.clientY - dragStartY;
        if (Math.abs(moved) > 4)
            dragged = true;
        scroller.scrollTop = dragStartTop - moved;
    }, { signal });
    const release = () => {
        pointerHeld = false;
        root.classList.remove('is-dragging');
        window.clearTimeout(settleTimer);
        settleTimer = window.setTimeout(() => {
            if (count > 0) {
                const target = clampIndex(scroller.scrollTop / rowHeight, count);
                if (Math.abs(scroller.scrollTop - position(target)) > 0.5)
                    scrollToIndex(target, true);
            }
            settle();
        }, 40);
    };
    scroller.addEventListener('pointerup', release, { signal });
    scroller.addEventListener('pointercancel', release, { signal });
    scroller.addEventListener('lostpointercapture', () => { if (root.classList.contains('is-dragging'))
        release(); }, { signal });
    /* a tap or click: a row beside the centre comes to the centre; the value itself reports a value tap */
    scroller.addEventListener('click', (event) => {
        if (dragged) {
            dragged = false;
            return;
        }
        const item = event.target.closest('.kt-wheel-item');
        if (item === null)
            return;
        const index = Number(item.dataset.index);
        if (index === clampIndex(scroller.scrollTop / rowHeight, count))
            options.onValueTap?.(item);
        else
            scrollToIndex(index, true);
    }, { signal });
    scroller.addEventListener('scroll', onScroll, { passive: true, signal });
    scroller.addEventListener('scrollend', settle, { signal });
    scroller.addEventListener('touchstart', () => { pointerHeld = true; window.clearTimeout(settleTimer); }, { passive: true, signal });
    const touchDone = () => { pointerHeld = false; window.clearTimeout(settleTimer); settleTimer = window.setTimeout(settle, 140); };
    scroller.addEventListener('touchend', touchDone, { passive: true, signal });
    scroller.addEventListener('touchcancel', touchDone, { passive: true, signal });
    /* a wheel made before it is on screen (or inside a panel that is closed) has no box to scroll in: it takes its place the moment it has one */
    const boxWatcher = typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            if (scroller.clientHeight === 0 || pointerHeld || settlePending)
                return;
            /* a wheel that is already on its row (the first one: no scroll to make) still has to be drawn once it has a box */
            if (Math.abs(scroller.scrollTop - position(committed)) > 1)
                jump(committed);
            else
                schedule();
        })
        : null;
    boxWatcher?.observe(scroller);
    signal.addEventListener('abort', () => boxWatcher?.disconnect());
    const motion = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    const onMotion = () => { flat = reducedMotion(); schedule(); };
    motion?.addEventListener?.('change', onMotion, { signal });
    /* ------------------------------------------------------------ handle */
    count = Math.max(0, options.count);
    build();
    committed = clampIndex(options.index, count);
    /* the first drawing: the starting row is marked and the drum is put round it even before the wheel has a box to scroll in (a wheel on its first row never gets a scroll event) */
    programmatic += 1;
    paint();
    programmatic -= 1;
    setAria();
    return {
        element: root,
        index: () => committed,
        count: () => count,
        setIndex(index, animate = false) {
            const target = clampIndex(index, count);
            if (animate) {
                scrollToIndex(target, true);
                return;
            }
            jump(target);
        },
        setCount(next, keep) {
            count = Math.max(0, next);
            const wanted = keep ?? committed;
            /* the rows already there are kept (a month that is a day shorter only loses its last row): rebuilding the list while a neighbouring wheel is still turning is what made the picker flicker */
            while (items.length > count) {
                const item = items.pop();
                item?.remove();
            }
            while (items.length < count) {
                const item = makeItem(items.length);
                items.push(item);
                after.before(item);
            }
            items.forEach((item, index) => { options.render(index, item); });
            shown = -1;
            windowLow = 0;
            windowHigh = -1;
            for (const item of items)
                item.classList.remove('is-near', 'is-selected');
            jump(wanted);
        },
        refresh() {
            /* render() is idempotent: it updates a row in place (the day rows keep their two spans and only change the weekday's text) */
            items.forEach((item, index) => { options.render(index, item); });
            shown = -1;
            paint();
            setAria();
        },
        itemAt: (index) => items[index] ?? null,
        focus: () => root.focus({ preventScroll: true }),
        destroy() {
            abort.abort();
            window.clearTimeout(settleTimer);
            if (frame !== 0)
                window.cancelAnimationFrame(frame);
            root.remove();
        },
    };
}
/** Called once the wheel is in the document: puts it on its starting row (the scroll position needs a laid-out box). */
export function mountWheel(handle) {
    handle.setIndex(handle.index(), false);
}
