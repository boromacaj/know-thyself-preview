import { createCanvasMoon, createWebglMoon, loadMoonTextures } from './app/premium-earth/moon/moonRenderer.js';
import { easeInOut, interpolatePhaseAngle } from './app/premium-earth/moon/moonShading.js';
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
function scan() {
    for (const figure of document.querySelectorAll(`${STAGE}:not([data-moon-mounted])`))
        void mount(figure);
}
if (typeof document !== 'undefined' && typeof MutationObserver === 'function') {
    const watched = document.getElementById('place-experience') ?? document.body;
    new MutationObserver(scan).observe(watched, { childList: true, subtree: true });
    window.addEventListener('resize', () => {
        const figure = document.querySelector(`${STAGE}[data-moon-mounted="live"]`);
        if (figure && shownAngle !== null && !figure.dataset.moonAnimating)
            draw(figure, shownAngle, figure.dataset.moonObserver === 'south' ? 'south' : 'north');
    }, { passive: true });
    scan();
}
