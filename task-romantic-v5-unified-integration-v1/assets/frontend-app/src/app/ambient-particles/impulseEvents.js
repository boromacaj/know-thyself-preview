/*
 * THE IMPULSE EVENT CONTRACT
 * --------------------------
 * ONE event, on `document`, carries every disturbance the interface wants to send to the particle layer:
 *
 *   document.dispatchEvent(new CustomEvent('kt:ambient-particle-impulse', { detail: { intensity: 'nav', x, y } }))
 *
 * Callers use emitParticleImpulse() so they never spell the name or the payload themselves. Nothing here knows about the layer:
 * if it is not mounted (particles off, QA off, a test page) the event simply has no listener and costs one dispatch.
 *
 *   micro   a normal button press, a card chosen, a small action
 *   nav     entering another module, changing a major view
 *   major   returning to the Main Menu, a scene change
 *
 * ORIGIN. A tap knows where it happened; a screen change does not. So the pointer that last touched the screen is remembered
 * (one number pair, written by one passive listener), and an impulse that arrives without an origin within
 * ORIGIN_MEMORY_MILLIS of a pointerdown borrows it - which is why "tap the Tarot tile" startles the dust around the tile even
 * though the navigation code never heard of the tile's position.
 */
export const IMPULSE_EVENT = 'kt:ambient-particle-impulse';
/** How long a pointerdown's position stays usable as the origin of a navigation that follows it. */
export const ORIGIN_MEMORY_MILLIS = 1500;
let lastOrigin = null;
export function rememberOrigin(x, y, at) {
    lastOrigin = { x, y, at };
}
export function forgetOrigin() {
    lastOrigin = null;
}
/** The remembered pointer position, if it is recent enough to be the cause of what is happening now. */
export function recentOrigin(now) {
    if (!lastOrigin || now - lastOrigin.at > ORIGIN_MEMORY_MILLIS)
        return null;
    return { x: lastOrigin.x, y: lastOrigin.y };
}
/** Send one impulse. An explicit x/y is kept; otherwise a recent pointer position is used. Safe to call with no layer mounted. */
export function emitParticleImpulse(intensity, extra = {}, target = typeof document === 'undefined' ? null : document, now = typeof performance === 'undefined' ? 0 : performance.now()) {
    if (!target)
        return;
    const detail = { intensity, ...extra };
    if (detail.x === undefined || detail.y === undefined) {
        const origin = recentOrigin(now);
        if (origin) {
            detail.x = origin.x;
            detail.y = origin.y;
        }
    }
    target.dispatchEvent(new CustomEvent(IMPULSE_EVENT, { detail }));
}
/**
 * The one delegated listener behind "a tap". It remembers where the finger landed and sends a micro impulse from there: any
 * primary press of the screen disturbs the air around it, on a button or on nothing, and the effect is local (see IMPULSES).
 * A single capture-phase passive listener on the document; it reads only the event, never the layout, and is removed by the
 * function it returns.
 */
export function installInteractionEmitter(target, clock = () => performance.now()) {
    const onPointerDown = (event) => {
        const pointer = event;
        if (pointer.isPrimary === false)
            return;
        if (!Number.isFinite(pointer.clientX) || !Number.isFinite(pointer.clientY))
            return;
        const at = clock();
        rememberOrigin(pointer.clientX, pointer.clientY, at);
        emitParticleImpulse('micro', { x: pointer.clientX, y: pointer.clientY }, target, at);
    };
    const options = { capture: true, passive: true };
    target.addEventListener('pointerdown', onPointerDown, options);
    return () => {
        target.removeEventListener('pointerdown', onPointerDown, options);
        forgetOrigin();
    };
}
