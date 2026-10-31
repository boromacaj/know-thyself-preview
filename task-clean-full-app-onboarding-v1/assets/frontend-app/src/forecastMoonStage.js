import { createCanvasMoon, createWebglMoon, loadMoonTextures } from './app/premium-earth/moon/moonRenderer.js?v=f9ab0a6';
import { easeInOut, interpolatePhaseAngle } from './app/premium-earth/moon/moonShading.js?v=f9ab0a6';
import { AMBIENT_DISC_EVENT, discOnScreen } from './app/premium-earth/ambient/ambientDisc.js?v=f9ab0a6';
/*
 * THE FORECAST'S MOON: THE CONTROLLER OF THE LARGE FIGURE numerologyForecastScreen.renderMoonStage PUTS ON THE DAY LEVEL.
 *
 * The screen is drawn in place every time a date is picked, so a figure appears (new, empty) for the new date. This module finds it, puts the ONE canvas this module owns into its frame - the
 * canvas, its WebGL context and the two textures are made once and kept, so picking a day costs a few draw calls and not a texture upload - and draws the Moon at the phase the figure
 * names. When the last picture was at another phase the figure first shows THAT and moves to the new one over about 0.7 s along the shortest way round the cycle, so a day's step is seen as the
 * lit part growing or shrinking and not as a cut. With prefers-reduced-motion the new phase is drawn at once.
 *
 * It reads the phase from the figure (data-moon-angle) and calculates nothing: the angle was put there by the Forecast from the one phase definition it already has.
 *
 * ONLY WHEN THERE IS A FIGURE. A MutationObserver with a cheap selector; no timer, no frame loop while nothing moves, nothing at all on a screen without the Moon. Where the maps or any canvas
 * are unavailable the figure keeps its vector disc and says so (data-moon-state="fallback").
 */
const STAGE = '[data-forecast-moon]';
/*
 * THE SIZE IS THE EARTH'S. The Moon is drawn at the diameter of the planet behind the Forecast, read live from the ambient globe's own published disc (ambientDisc.discOnScreen, the circle its
 * shader draws), times MOON_TO_EARTH. It is a local layout fact: nothing of the globe or its framing is touched. Without a published disc (no WebGL globe) it falls back to a share of the width.
 */
const MOON_TO_EARTH = 1.0;
const DETAIL_TO_EARTH = 0.72;
const DETAIL_MIN = 160;
const DETAIL_MAX = 240;
const DETAIL_FALLBACK_SHARE = 0.5;
const SONAR_REACH_PX = 6;
const MIN_SIZE = 168;
const MAX_SHARE_OF_WIDTH = 0.8;
const FALLBACK_SHARE_OF_WIDTH = 0.62;
const FALLBACK_MAX = 320;
let disc = null;
const DURATION_MS = 700;
let renderer = null;
let rendererFailed = false;
let shownAngle = null;
let animation = 0;
const reduced = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
async function ensureRenderer() {
    if (renderer)
        return renderer;
    if (rendererFailed)
        return null;
    const textures = await loadMoonTextures();
    if (!textures) {
        rendererFailed = true;
        return null;
    }
    const lose = () => {
        /* a lost WebGL context: carry on in 2D, which needs nothing from the GPU */
        const fallback = createCanvasMoon(textures);
        renderer = fallback;
        document.querySelectorAll(STAGE).forEach((figure) => { delete figure.dataset.moonMounted; });
        queueMicrotask(scan);
    };
    renderer = createWebglMoon(textures, lose) ?? createCanvasMoon(textures);
    if (!renderer)
        rendererFailed = true;
    return renderer;
}
/** The Moon's CSS diameter in px for the room it has. The detail's Moon is the same picture, smaller: it is not the entry to anything there. */
export function moonSizeFor(earthDiameter, availableWidth, variant = 'day') {
    const ceiling = availableWidth * MAX_SHARE_OF_WIDTH;
    if (variant === 'detail') {
        const wanted = earthDiameter !== null && earthDiameter > 0 ? earthDiameter * DETAIL_TO_EARTH : availableWidth * DETAIL_FALLBACK_SHARE;
        return Math.round(Math.min(Math.max(wanted, DETAIL_MIN), DETAIL_MAX, ceiling));
    }
    if (earthDiameter === null || !(earthDiameter > 0))
        return Math.round(Math.min(availableWidth * FALLBACK_SHARE_OF_WIDTH, FALLBACK_MAX));
    return Math.round(Math.min(Math.max(earthDiameter * MOON_TO_EARTH, MIN_SIZE), ceiling));
}
/**
 * THE VISUAL AXIS IS THE EARTH'S. The figure sits in the middle of its container, but the container is not always the middle of the screen: a scroll bar that takes room (every desktop browser, some
 * Android browsers), a safe-area inset, a panel with unequal padding all move the container's middle away from the planet the Moon is drawn at the size of. The distance between the two
 * is MEASURED (the figure's own centre against the centre of the ambient disc, published by the globe) and the figure is moved by that distance with one transform; where the two already agree
 * (a phone with overlay scroll bars: 0) nothing moves. A distance that is not plausible for a scroll bar or an inset (more than a few dozen px) is ignored, not applied.
 */
const MAX_AXIS_SHIFT = 24;
export function axisShiftFor(figureCentre, earthCentre) {
    if (earthCentre === null || !Number.isFinite(earthCentre) || !Number.isFinite(figureCentre))
        return 0;
    const shift = earthCentre - figureCentre;
    if (Math.abs(shift) < 0.5 || Math.abs(shift) > MAX_AXIS_SHIFT)
        return 0;
    return Math.round(shift * 2) / 2;
}
function sizeStage(figure) {
    const variant = figure.dataset.moonVariant === 'detail' ? 'detail' : 'day';
    let earth = null;
    let earthCentre = null;
    if (disc?.element.isConnected) {
        const box = disc.element.getBoundingClientRect();
        if (box.width > 0 && box.height > 0) {
            earth = discOnScreen(box, disc.framing).diameter;
            earthCentre = box.left + disc.framing.x * box.width;
        }
    }
    const room = figure.parentElement?.clientWidth || window.innerWidth;
    const size = moonSizeFor(earth, room, variant);
    const sizeText = `${size}px`;
    let changed = false;
    if (figure.style.getPropertyValue('--kt-moon-size') !== sizeText) {
        figure.style.setProperty('--kt-moon-size', sizeText);
        changed = true;
    }
    /* the sonar ring reaches about SONAR_REACH_PX beyond the edge, whatever the size (the Astrology capsules' approved reach), so its growth is worked out from the diameter */
    const button = figure.querySelector('.kt-fc-moon-open');
    if (button) {
        const growth = (1 + (2 * SONAR_REACH_PX) / size).toFixed(4);
        if (button.style.getPropertyValue('--kt-sonar-sx') !== growth) {
            button.style.setProperty('--kt-sonar-sx', growth);
            button.style.setProperty('--kt-sonar-sy', growth);
        }
    }
    /* centre on the Earth's axis: measure where the figure would be without the shift it has now */
    const current = Number.parseFloat(figure.style.getPropertyValue('--kt-moon-shift')) || 0;
    const rect = figure.getBoundingClientRect();
    const shift = axisShiftFor(rect.left + rect.width / 2 - current, earthCentre);
    if (shift !== current) {
        figure.style.setProperty('--kt-moon-shift', `${shift}px`);
        changed = true;
    }
    return changed;
}
function draw(figure, angle, observer) {
    if (!renderer)
        return;
    const frame = figure.querySelector('.kt-fc-moon-frame');
    if (frame)
        renderer.resize(frame.clientWidth || 240, window.devicePixelRatio || 1);
    renderer.draw(angle, observer);
    shownAngle = angle;
    figure.dataset.moonRenderedAngle = angle.toFixed(3);
}
function animate(figure, from, to, observer) {
    cancelAnimationFrame(animation);
    if (reduced() || Math.abs(((to - from + 540) % 360) - 180) < 0.05) {
        draw(figure, to, observer);
        return;
    }
    const started = performance.now();
    figure.dataset.moonAnimating = 'true';
    const step = (now) => {
        if (!figure.isConnected)
            return;
        const t = Math.min(1, (now - started) / DURATION_MS);
        draw(figure, t >= 1 ? to : interpolatePhaseAngle(from, to, easeInOut(t)), observer);
        if (t < 1)
            animation = requestAnimationFrame(step);
        else
            delete figure.dataset.moonAnimating;
    };
    animation = requestAnimationFrame(step);
}
async function mount(figure) {
    const target = Number(figure.dataset.moonAngle);
    if (!Number.isFinite(target))
        return;
    const observer = figure.dataset.moonObserver === 'south' ? 'south' : 'north';
    figure.dataset.moonMounted = 'pending';
    sizeStage(figure);
    const live = await ensureRenderer();
    if (!figure.isConnected)
        return;
    const frame = figure.querySelector('.kt-fc-moon-frame');
    if (!live || !frame) {
        figure.dataset.moonMounted = 'fallback';
        figure.dataset.moonState = 'fallback';
        return;
    }
    frame.append(live.canvas);
    figure.dataset.moonMounted = 'live';
    figure.dataset.moonState = live.mode;
    /* from the phase the last picture showed (or, the first time, from the phase itself), to the one this date has */
    const from = shownAngle ?? target;
    const seenBefore = shownAngle !== null;
    draw(figure, from, observer);
    /* the first picture fades in over the vector disc; a later one (another date) replaces the figure and must not flash the disc again */
    frame.classList.add('is-live');
    if (seenBefore)
        frame.classList.add('is-instant');
    animate(figure, from, target, observer);
}
let resizeFrame = 0;
/** Re-read the Earth's disc and the room, and draw again at the new size; at most once a frame, however many events say the disc moved. */
function resizeSoon() {
    if (resizeFrame)
        return;
    resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0;
        const figure = document.querySelector(STAGE);
        if (!figure)
            return;
        const changed = sizeStage(figure);
        if (changed && figure.dataset.moonMounted === 'live' && shownAngle !== null && !figure.dataset.moonAnimating) {
            draw(figure, shownAngle, figure.dataset.moonObserver === 'south' ? 'south' : 'north');
        }
    });
}
function scan() {
    for (const figure of document.querySelectorAll(`${STAGE}:not([data-moon-mounted])`))
        void mount(figure);
}
if (typeof document !== 'undefined' && typeof MutationObserver === 'function') {
    const watched = document.getElementById('place-experience') ?? document.body;
    new MutationObserver(scan).observe(watched, { childList: true, subtree: true });
    window.addEventListener(AMBIENT_DISC_EVENT, (event) => {
        disc = event.detail;
        resizeSoon();
    });
    window.addEventListener('resize', resizeSoon, { passive: true });
    scan();
}
