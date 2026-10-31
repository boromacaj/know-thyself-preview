import { closestSelectable } from './tarotDeckFocus.js';
/**
 * THE CARD PICKER: ONE DECK, SPREAD OUT FROM ONE SIDE UNDER A THUMB.
 *
 * This is presentation only. It never knows which card is behind a place: a slot is a number, and the number is a place in
 * the deck that was shuffled before anybody touched it. It reads the scroll position of the strip, says which place is at
 * the focus point, marks that one slot (`is-focus`) and reports it. What the stylesheet does with the mark - a card
 * lifted a little out of the spread - and what gets chosen (the controller's business) are not decided here.
 *
 * THE METAPHOR IS A REAL DECK SPREAD IN ONE DIRECTION. The places are one ordered run: each begins a few pixels after the
 * one before it and lies over it, every one the same size, so what shows of a card is a narrow strip and the run reads
 * as a stack of edges. There is no centre and no mirror: nothing is computed "around" the card in focus, and the card in
 * focus is not brought to the middle of anything. The focus point is a fixed place in the strip (the stylesheet pads the
 * strip so that place `scrollLeft / spacing` is under it), set well to one side so the spread looks drawn out from the other.
 *
 * ONE SOURCE OF TRUTH FOR THE FOCUS (tarotDeckFocus.ts). The card in focus is the SELECTABLE card whose place is closest to the geometric focus point, and the focus
 * point is read from the strip's scroll position at the moment the scroll is seen - in the scroll event itself, in the same frame, with no timer and no animation
 * frame in between and no remembered index to catch up with. A fast flick therefore updates the focus on every frame it crosses, in either direction, exactly as a
 * slow drag does; the stylesheet draws the protruding card from the SAME cells on the compositor (scroll-linked), so the picture and the model cannot drift.
 *
 * THE STRIP IS FREE, NOT PAGED. It scrolls with the browser's own touch momentum and has no snap points, so one flick
 * crosses many places and a slow drag can land on any one. Only when the movement has stopped does it settle: a nudge of
 * at most half a place, so that the nearest place sits exactly at the focus point.
 *
 * HAPTICS. A place crossed under a finger or a flick is reported (`onTick`), once per place; the controller turns that
 * into a short pulse. Nothing is reported for the start, a redraw, a settle, a tap that brings a card into focus or the
 * keyboard: only the strip being moved by a person.
 */
/** How long a programmatic glide owns the focus before the scroll position is trusted again. */
const GLIDE_MS = 400;
/** How long the strip must be still (no scroll, no finger) before the nearest place is settled onto the focus point. */
export const SETTLE_MS = 120;
/** How long after a finger lifts the strip's momentum still counts as the person's movement. */
const KINETIC_MS = 3500;
/** How long a wheel or trackpad movement counts as the person's. */
const WHEEL_MS = 600;
/** A strip this close to a place (in px) is already settled. */
const SETTLED_PX = 0.75;
/** Which place is at the focus point, as a fractional index, from how far the strip has been scrolled. Clamped to the deck. */
export function focusIndex(scrollLeft, spacing, count) {
    if (!(spacing > 0) || count <= 0)
        return 0;
    return Math.min(count - 1, Math.max(0, scrollLeft / spacing));
}
/** Where the strip comes to rest: the scroll position that puts the nearest place exactly at the focus point. */
export function settleTarget(scrollLeft, spacing, count) {
    if (!(spacing > 0) || count <= 0)
        return 0;
    return Math.round(focusIndex(scrollLeft, spacing, count)) * spacing;
}
/** The index to start on: the requested one, or the nearest that can be chosen (forward first on a tie), or the request itself. */
export function nearestSelectable(selectable, from) {
    const count = selectable.length;
    if (count === 0)
        return 0;
    const start = Math.min(count - 1, Math.max(0, Math.round(from)));
    if (selectable[start])
        return start;
    for (let step = 1; step < count; step += 1) {
        if (start + step < count && selectable[start + step])
            return start + step;
        if (start - step >= 0 && selectable[start - step])
            return start - step;
    }
    return start;
}
/** Wire a strip (`ul.tx-deck`, one `li` per place, each holding a `button[data-tx-position]`). Returns null for a strip with no places. */
export function attachCardPicker(deck, options) {
    /* Only a real strip in a real page: a stand-in element (the tests' mount has no layout) gets no picker, and its places are chosen by a tap as ever. */
    if (typeof deck.querySelectorAll !== 'function' || typeof performance === 'undefined')
        return null;
    const items = [...deck.querySelectorAll(':scope > li')];
    const buttons = items.map((item) => item.querySelector('[data-tx-position]'));
    if (items.length === 0 || buttons.some((button) => button === null))
        return null;
    const positions = buttons.map((button) => Number(button?.dataset.txPosition));
    const selectable = buttons.map((button) => button !== null && !button.disabled);
    let spacing = 0;
    let focused = -1;
    let glideUntil = 0;
    let personUntil = 0;
    let touching = false;
    let destroyed = false;
    let settling = null;
    let trailing = null;
    const measure = () => {
        if (items.length > 1)
            spacing = items[1].offsetLeft - items[0].offsetLeft;
        else
            spacing = items[0].offsetWidth;
    };
    /** Is the strip being moved by a person (a finger, or the momentum of a flick, or a wheel)? */
    const moved = () => touching || performance.now() < personUntil;
    const setFocus = (index, tick) => {
        if (index === focused)
            return;
        if (focused >= 0) {
            items[focused].classList.remove('is-focus');
            items[focused].removeAttribute('data-tx-focus');
        }
        focused = index;
        items[index].classList.add('is-focus');
        items[index].setAttribute('data-tx-focus', 'true');
        options.onFocus(positions[index], selectable[index]);
        if (tick)
            options.onTick?.(positions[index]);
    };
    /** The strip is scrolled to the fractional index `at`: the nearest SELECTABLE place is in focus, unless a glide of ours owns the focus. */
    const update = (at) => {
        if (performance.now() < glideUntil)
            return;
        setFocus(closestSelectable(selectable, at), moved());
    };
    const cancelTimers = () => {
        if (settling !== null) {
            clearTimeout(settling);
            settling = null;
        }
        if (trailing !== null) {
            clearTimeout(trailing);
            trailing = null;
        }
    };
    const glideTo = (left, smooth) => {
        if (trailing !== null) {
            clearTimeout(trailing);
            trailing = null;
        }
        glideUntil = smooth ? performance.now() + GLIDE_MS : 0;
        if (smooth && typeof deck.scrollTo === 'function') {
            deck.scrollTo({ left, behavior: 'smooth' });
            /* When the glide is over the scroll position is trusted again, even if nothing else scrolls. */
            trailing = setTimeout(() => { trailing = null; glideUntil = 0; onScroll(); }, GLIDE_MS + 20);
        }
        else
            deck.scrollLeft = left;
    };
    const scrollToIndex = (index, smooth) => glideTo(index * spacing, smooth);
    /** The movement has stopped: nudge the nearest place exactly onto the focus point (a jump when motion is reduced). */
    const settle = () => {
        settling = null;
        if (destroyed || touching || !(spacing > 0))
            return;
        personUntil = 0;
        /* The card that is in focus is the card that is brought to the focus point: a place that cannot be chosen is never settled onto. */
        const target = closestSelectable(selectable, focusIndex(deck.scrollLeft, spacing, items.length)) * spacing;
        if (Math.abs(deck.scrollLeft - target) <= SETTLED_PX)
            return;
        glideTo(target, !options.reducedMotion());
    };
    const scheduleSettle = () => {
        if (settling !== null)
            clearTimeout(settling);
        settling = setTimeout(settle, SETTLE_MS);
    };
    function onScroll() {
        if (destroyed)
            return;
        /* A glide of ours is not movement to settle after; a finger or a flick is. */
        if (!touching && performance.now() >= glideUntil)
            scheduleSettle();
        /* The focus is read from the scroll position NOW, in the frame the scroll was seen: no frame is waited for, so it cannot lag behind a flick. */
        if (spacing > 0)
            update(focusIndex(deck.scrollLeft, spacing, items.length));
    }
    /* A finger down takes the strip back from any glide; lifted, its momentum is still the person's until it stops. */
    const onTouchStart = () => { touching = true; glideUntil = 0; cancelTimers(); };
    const onTouchEnd = () => { touching = false; personUntil = performance.now() + KINETIC_MS; scheduleSettle(); };
    const onWheel = () => { personUntil = performance.now() + WHEEL_MS; };
    /* Keyboard focus on a place (the arrows move it) brings that place to the focus point. */
    const onFocusIn = (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement))
            return;
        const index = buttons.indexOf(target);
        if (index < 0 || index === focused)
            return;
        setFocus(index, false);
        scrollToIndex(index, !options.reducedMotion());
    };
    const start = () => {
        measure();
        if (!(spacing > 0))
            return;
        const from = options.initialPosition == null ? -1 : positions.indexOf(options.initialPosition);
        const wanted = nearestSelectable(selectable, from >= 0 ? from : (items.length - 1) / 2);
        scrollToIndex(wanted, false);
        /* The scroll position may not have taken (a strip with no width yet): the focus is the one asked for, until the strip is measured again. */
        glideUntil = performance.now() + GLIDE_MS;
        setFocus(wanted, false);
    };
    /* A strip that is not on screen (another destination is showing) has no width; when it gets one, the place in focus is
       put back at the focus point. */
    let observer = null;
    let lastWidth = deck.clientWidth;
    if (typeof ResizeObserver === 'function') {
        observer = new ResizeObserver(() => {
            if (destroyed)
                return;
            const width = deck.clientWidth;
            if (width === lastWidth)
                return;
            lastWidth = width;
            measure();
            if (spacing > 0 && focused >= 0)
                scrollToIndex(focused, false);
        });
        observer.observe(deck);
    }
    deck.addEventListener('scroll', onScroll, { passive: true });
    deck.addEventListener('touchstart', onTouchStart, { passive: true });
    deck.addEventListener('touchend', onTouchEnd, { passive: true });
    deck.addEventListener('touchcancel', onTouchEnd, { passive: true });
    deck.addEventListener('wheel', onWheel, { passive: true });
    deck.addEventListener('focusin', onFocusIn);
    start();
    return {
        focusedPosition: () => positions[Math.max(0, focused)],
        focusPosition(position, smooth) {
            const index = positions.indexOf(position);
            if (index < 0)
                return;
            setFocus(index, false);
            scrollToIndex(index, smooth && !options.reducedMotion());
        },
        lift(position) {
            const index = positions.indexOf(position);
            if (index >= 0)
                items[index].classList.add('is-picking');
        },
        destroy() {
            destroyed = true;
            cancelTimers();
            deck.removeEventListener('scroll', onScroll);
            deck.removeEventListener('touchstart', onTouchStart);
            deck.removeEventListener('touchend', onTouchEnd);
            deck.removeEventListener('touchcancel', onTouchEnd);
            deck.removeEventListener('wheel', onWheel);
            deck.removeEventListener('focusin', onFocusIn);
            observer?.disconnect();
        },
    };
}
