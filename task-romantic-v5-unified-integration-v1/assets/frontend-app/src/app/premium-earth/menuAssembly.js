/*
 * THE MENU'S CARDS ASSEMBLE, AS IF PULLED TOGETHER BY A MAGNET.
 *
 * When the person comes back to the Main Menu from a pillar, the eight cards (the four pillars, the Synthesis card and the three tiles) do not fade in where they stand: they come in from
 * outside their arrangement and are drawn into it. Three phases, on ONE clock for all eight, so the whole set arrives and locks together:
 *
 *   A  APPROACH    fast. Each card travels from outside the composition to a point a short way short of its place (APPROACH_GAP_PX): the top four come in from above and to their own side, the outer ones
 *                  further sideways; the Synthesis card comes in along its own horizontal axis; the three tiles come in from below and to their side. An ease-out: quick at first, then braking.
 *   B  MAGNET      slow. The card creeps the rest of the way to a smaller gap (SNAP_GAP_PX) - the pull is felt before it lands. An ease-in-out, a few pixels a frame.
 *   C  SNAP        short and crisp. The last few pixels into the exact place, ACCELERATING - an ease-in, so the card is moving fastest at the instant it stops: a click, not a glide.
 *
 * Phase B and C are what make it a magnet and not a slide: one continuous curve would round the end off and the lock could not be seen. The keyframes carry their own easing per phase.
 *
 * WHAT IT IS MADE OF. Only transform, on the cards the menu already has (one button each, label included), by the Web Animations API: the compositor moves them, the main thread is not asked
 * for a frame of it. `fill: backwards` and no persistence: when it is over, nothing is left on any card, so the final layout IS the stylesheet's, pixel for pixel (the individual `translate`
 * that makes the V of the lower cards is a different property and composes). The chip traces between the names and the Synthesis card are drawn for the cards' places, so they wait (opacity
 * 0) and come in with the snap.
 *
 * WHEN IT STARTS. Not in the same frame the menu is shown: menuFit.ts and synthesisTracePlacement.ts measure the menu's layout in the first frame after it appears (the fit reads the scroll
 * height, the traces read the boxes), and a card already displaced would be measured displaced - the fit would squeeze the menu, the traces would point at empty air. So for those one or two frames
 * the cards are held invisible (visibility, not opacity: the fade the transition runs on them is untouched) and the animation starts in the frame after, with the cards already at their start.
 * That is about 17-33 ms before the motion begins, and the menu is not otherwise held up at all: nothing waits for the animation, the cards take taps while they move (hit-testing follows the
 * transform), and the transition's own unlock is not touched.
 *
 * INTERRUPTION. A new start cancels the one running; the menu leaving the screen (hidden, inert) cancels it and releases everything it held; reduced motion starts nothing; a browser without the
 * Web Animations API starts nothing. Whatever happens, `visibility` and the traces' opacity are released.
 */
/** The three phases, in milliseconds (the owner's targets: about 250-350, 120-180, 80-130; total about 450-650). */
export const ASSEMBLY = Object.freeze({
    approachMs: 300,
    magnetMs: 150,
    snapMs: 100,
    /** How far short of its place a card is when the approach ends, and when the magnet phase ends (CSS px, along the way it came). */
    approachGapPx: 18,
    snapGapPx: 7,
    /** The card grows a little as it comes in: from this scale to 1 by the end of the approach. */
    startScale: 0.97,
    /** The easing of each phase. */
    approachEase: 'cubic-bezier(0.12, 0.7, 0.25, 1)',
    magnetEase: 'cubic-bezier(0.35, 0, 0.65, 1)',
    snapEase: 'cubic-bezier(0.6, 0, 1, 0.7)',
    /** Where each card starts, as shares of the menu's width and height (see startOffset). */
    pillarSideShare: 0.5,
    pillarRiseShare: 0.16,
    synthesisSideShare: 0.62,
    tileSideShare: 0.5,
    tileDropShare: 0.2,
    middleTileDropShare: 0.24,
});
export const ASSEMBLY_TOTAL_MS = ASSEMBLY.approachMs + ASSEMBLY.magnetMs + ASSEMBLY.snapMs;
/**
 * Where a card starts, relative to its place (CSS px). `side` is the card's centre's distance from the menu's centre line in half-widths (-1 left edge .. 1 right edge), `width` and `height`
 * the menu's. Pillars start up and out to their side, the Synthesis card to the left along its own axis, the tiles below and out to their side (the middle tile straight below).
 */
export function startOffset(role, side, width, height) {
    if (role === 'pillar')
        return { x: side * ASSEMBLY.pillarSideShare * width, y: -ASSEMBLY.pillarRiseShare * height };
    if (role === 'synthesis')
        return { x: -ASSEMBLY.synthesisSideShare * width, y: 0 };
    return { x: side * ASSEMBLY.tileSideShare * width, y: (Math.abs(side) < 0.12 ? ASSEMBLY.middleTileDropShare : ASSEMBLY.tileDropShare) * height };
}
const px = (value) => `${+value.toFixed(2)}px`;
const at = (v, scale) => `translate(${px(v.x)}, ${px(v.y)}) scale(${scale})`;
/** The keyframes of one card whose start is `from`: approach, magnet, snap - each with its own easing, ending exactly at rest. */
export function assemblyKeyframes(from) {
    const length = Math.hypot(from.x, from.y) || 1;
    const along = (distance) => ({ x: (from.x / length) * distance, y: (from.y / length) * distance });
    const a = ASSEMBLY.approachMs / ASSEMBLY_TOTAL_MS;
    const b = (ASSEMBLY.approachMs + ASSEMBLY.magnetMs) / ASSEMBLY_TOTAL_MS;
    return [
        { offset: 0, transform: at(from, ASSEMBLY.startScale), easing: ASSEMBLY.approachEase },
        { offset: +a.toFixed(4), transform: at(along(ASSEMBLY.approachGapPx), 0.997), easing: ASSEMBLY.magnetEase },
        { offset: +b.toFixed(4), transform: at(along(ASSEMBLY.snapGapPx), 1), easing: ASSEMBLY.snapEase },
        { offset: 1, transform: at({ x: 0, y: 0 }, 1) },
    ];
}
/** The distance from rest a card's keyframes give at `ms` (a model of the choreography, for a test: the browser does the real thing). */
export function distanceAt(from, ms) {
    const length = Math.hypot(from.x, from.y);
    const bez = (x1, y1, x2, y2) => (t) => {
        let lo = 0, hi = 1;
        for (let i = 0; i < 40; i += 1) {
            const m = (lo + hi) / 2;
            const x = 3 * (1 - m) * (1 - m) * m * x1 + 3 * (1 - m) * m * m * x2 + m ** 3;
            if (x < t)
                lo = m;
            else
                hi = m;
        }
        const m = (lo + hi) / 2;
        return 3 * (1 - m) * (1 - m) * m * y1 + 3 * (1 - m) * m * m * y2 + m ** 3;
    };
    const A = bez(0.12, 0.7, 0.25, 1), B = bez(0.35, 0, 0.65, 1), C = bez(0.6, 0, 1, 0.7);
    const t = Math.min(Math.max(ms, 0), ASSEMBLY_TOTAL_MS);
    const aEnd = ASSEMBLY.approachMs, bEnd = aEnd + ASSEMBLY.magnetMs;
    if (t <= aEnd)
        return length + (ASSEMBLY.approachGapPx - length) * A(t / aEnd);
    if (t <= bEnd)
        return ASSEMBLY.approachGapPx + (ASSEMBLY.snapGapPx - ASSEMBLY.approachGapPx) * B((t - aEnd) / ASSEMBLY.magnetMs);
    return ASSEMBLY.snapGapPx * (1 - C((t - bEnd) / ASSEMBLY.snapMs));
}
const CARDS = '.kt-menu-pillar, .kt-menu-synthesis, .kt-menu-tile';
const TRACES = '.kt-menu-traces';
export const ASSEMBLY_ATTRIBUTE = 'data-menu-assemble';
const runs = new WeakMap();
let counter = 0;
function release(surface, run) {
    if (run === undefined)
        return;
    for (const frame of run.frames)
        cancelAnimationFrame(frame);
    run.frames = [];
    for (const animation of run.animations) {
        try {
            animation.cancel();
        }
        catch { /* already gone */ }
    }
    run.animations = [];
    for (const card of surface.querySelectorAll(CARDS))
        card.style.removeProperty('visibility');
    surface.querySelector(TRACES)?.style.removeProperty('opacity');
    delete surface.dataset.menuAssemble;
}
/** Stop an assembly that is running or about to, and let go of everything it held. */
export function cancelMenuAssembly(surface) {
    const run = runs.get(surface);
    runs.delete(surface);
    release(surface, run);
}
const roleOf = (card) => (card.classList.contains('kt-menu-pillar') ? 'pillar' : card.classList.contains('kt-menu-synthesis') ? 'synthesis' : 'tile');
/**
 * Start the assembly of the menu's cards. Call it when the menu has just been shown on the way back from a pillar. Returns false when nothing was started (reduced motion, no Web
 * Animations, no cards).
 */
export function startMenuAssembly(surface) {
    cancelMenuAssembly(surface);
    if (typeof surface.animate !== 'function')
        return false;
    if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches)
        return false;
    const cards = [...surface.querySelectorAll(CARDS)];
    if (cards.length === 0)
        return false;
    const run = { token: ++counter, animations: [], frames: [] };
    runs.set(surface, run);
    /* held invisible while the menu's layout is measured (see WHEN IT STARTS) */
    for (const card of cards)
        card.style.visibility = 'hidden';
    surface.dataset.menuAssemble = 'pending';
    const traces = surface.querySelector(TRACES);
    if (traces)
        traces.style.opacity = '0';
    const alive = () => runs.get(surface) === run && !surface.hidden && !surface.inert;
    const begin = () => {
        if (!alive()) {
            cancelMenuAssembly(surface);
            return;
        }
        const width = surface.clientWidth || window.innerWidth;
        const height = surface.clientHeight || window.innerHeight;
        const rests = cards.map((card) => card.getBoundingClientRect());
        for (let i = 0; i < cards.length; i += 1) {
            const card = cards[i];
            const rect = rests[i];
            const side = ((rect.left + rect.width / 2) - width / 2) / (width / 2);
            const from = startOffset(roleOf(card), side, width, height);
            run.animations.push(card.animate(assemblyKeyframes(from), { duration: ASSEMBLY_TOTAL_MS, fill: 'backwards', easing: 'linear' }));
            card.style.removeProperty('visibility');
        }
        surface.dataset.menuAssemble = 'running';
        if (traces) {
            const snapAt = +((ASSEMBLY.approachMs + ASSEMBLY.magnetMs) / ASSEMBLY_TOTAL_MS).toFixed(4);
            run.animations.push(traces.animate([{ offset: 0, opacity: 0 }, { offset: snapAt, opacity: 0 }, { offset: 1 }], { duration: ASSEMBLY_TOTAL_MS, fill: 'backwards', easing: 'linear' }));
            traces.style.removeProperty('opacity');
        }
        const last = run.animations[0];
        last?.finished.then(() => { if (runs.get(surface) === run) {
            runs.delete(surface);
            release(surface, run);
            surface.dataset.menuAssemble = 'settled';
        } }, () => { });
    };
    /* two frames: the first is where menuFit and the trace placement measure the menu at rest */
    run.frames.push(requestAnimationFrame(() => { run.frames.push(requestAnimationFrame(begin)); }));
    return true;
}
/** Watch the menu surface: whenever it is hidden or inert, whatever was running is cancelled and released. Returns the way out. */
export function connectMenuAssembly(surface) {
    if (typeof MutationObserver === 'undefined')
        return () => { };
    const observer = new MutationObserver(() => { if (surface.hidden || surface.inert)
        cancelMenuAssembly(surface); });
    observer.observe(surface, { attributes: true, attributeFilter: ['hidden', 'inert'] });
    return () => { observer.disconnect(); cancelMenuAssembly(surface); };
}
