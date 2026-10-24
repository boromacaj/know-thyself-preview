import { mountAmbientGlobe } from './ambientGlobe.js';
import { AXIAL_TILT_DEGREES, framingForScene } from './ambientMath.js';
import { earthMotionTuningFor } from './earthMotionTuning.js';
import { ARRIVAL } from './openingArrival.js';
import { framingForTarotHero } from './tarotHeroFraming.js';
/*
 * THE EARTH OF THE ONBOARDING: THIS PRODUCT'S OWN GLOBE, FROM THE FIRST FRAME TO THE LAST.
 *
 * The onboarding does not know which Earth it has. It asks a session for six things - get ready, play the opening, show a
 * place, mark a place, show the world, go away - and publishes the answers to the modules that follow it. This is that session,
 * and the only one: the Earth behind the birthplace search, the vessel step and every reading is the ambient globe (Earth, Moon
 * and Sun, drawn by ambientRenderer.ts), mounted once and never swapped. It needs no map provider, no key and no network once
 * the page is loaded.
 *
 * WHAT IT DOES, IN ORDER
 *   mount     the globe is built at the first frame of the opening arrival - a dot, not turning - at the size and place the
 *             product gives its Earth (framingForScene), with the axial lean, the Moon and the Sun of the approved scene. It
 *             draws that one frame and rests: behind the tunnel it costs nothing.
 *   prepare   waits for the globe's first frame, and then for the tunnel's hand-off (window.__knowThyselfWarpReadyPromise,
 *             resolved by the warp's own script when its video reaches the hand-off), exactly as the map's intro did, so the
 *             arrival can never run unseen underneath the video.
 *   play      the arrival (openingArrival.ts): 5.2 s, the planet coming forward and rolling, easing to rest.
 *   idle      the planet turns slowly by itself; when a destination opens (data-pillar-stage="pillar") the spin eases up to the
 *             Main Menu's own rate and back, over about two seconds, never in a lurch.
 *
 * WHAT IT DOES NOT DO. It is a backdrop, not a map. It does not pan, zoom to streets, label anything or take a pick; it never
 * flies to a place and it carries no pin. `focusLocation`, `markLocation` and `showWorld` are answered and do nothing: the
 * birthplace is chosen in the search and shown in the interface, and the Earth behind it does not react to the choice.
 *
 * THE CONTAINER'S DATASET IS PART OF THE CONTRACT. Other modules read `data-earth-map-state` and `data-earth-view` off the
 * Earth's container, so this writes the same words for the same moments: 'preloading', 'intro-zoom' and 'world'. State is
 * 'ambient'.
 */
const READY_TIMEOUT_MILLIS = 2500;
/** The longest the opening waits for the tunnel's hand-off. The warp's own readiness net resolves it after about 6 s of video; this is only a bound. */
const WARP_WAIT_MILLIS = 14_000;
/** The Earth's own spin while a person is on the birthplace screens: what the map's idle drift was, 0.85 degrees a second (one turn in seven minutes). Effective, i.e. after the motion tuning. */
export const ONBOARDING_IDLE_DEGREES_PER_SECOND = 0.85;
/** The spin behind an open destination (Main Menu, readings, Forecast, Tarot): the figure the reviewed menu Earth turns at, before the motion tuning's scale. */
export const DESTINATION_IDLE_DEGREES_PER_SECOND = 2;
const IDLE_RAMP_MILLIS = 1800;
/** How long the planet takes to move to (or back from) the Tarot hero's composition. */
const COMPOSITION_MILLIS = 700;
let active = null;
const waiting = [];
/** The ambient globe now on screen, if any. */
export function activeAmbientEarth() {
    return active;
}
/** Resolves with the ambient globe when it is mounted: at once if it already is. */
export function whenAmbientEarth() {
    return active ? Promise.resolve(active) : new Promise((resolve) => { waiting.push(resolve); });
}
export function mountAmbientEarth(container, onReady = () => { }) {
    container.dataset.earthMapState = 'ambient';
    container.dataset.earthView = 'preloading';
    container.dataset.initialSteady = 'false';
    const experience = typeof document.getElementById === 'function' ? document.getElementById('place-experience') : null;
    const reducedMotion = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tuning = earthMotionTuningFor(typeof window === 'undefined' ? '' : (window.location?.search ?? ''));
    /* The framing the scene calls for: the circle the vessel symbol, the glow ring and the menu are laid out round, or the Tarot hero's. */
    const sceneFraming = () => {
        const box = container.getBoundingClientRect?.();
        const width = box?.width || container.clientWidth || (typeof window === 'undefined' ? 0 : window.innerWidth) || 1;
        const height = box?.height || container.clientHeight || (typeof window === 'undefined' ? 0 : window.innerHeight) || 1;
        return experience?.dataset.earthComposition === 'tarot-hero' ? framingForTarotHero(width, height) : framingForScene(width, height);
    };
    const globe = mountAmbientGlobe(container, {
        ambient: true,
        highlight: false,
        interactive: false,
        startDistant: true,
        axialTiltDegrees: AXIAL_TILT_DEGREES,
        idleDegreesPerSecond: ONBOARDING_IDLE_DEGREES_PER_SECOND / tuning.idleScale,
        framing: sceneFraming(),
    });
    active = globe;
    for (const resolve of waiting.splice(0))
        resolve(globe);
    /* A QA capability, published the way the other Earth capabilities are: the session is private to its owner. */
    window.knowThyselfAmbientEarth = globe;
    const view = (name) => { container.dataset.earthView = name; };
    /* FOLLOW THE SCENE FROM THE MOMENT THE GLOBE EXISTS. The browser's toolbar collapsing, a phone turned over or the keyboard going away
       resizes the scene; the planet keeps the circle it is laid out round. Observed on the container, which fires after the scene has taken
       its new size, and once straight away, so the first framing is checked too. During the arrival this only moves where it ends. */
    const resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(() => { globe.setFraming(sceneFraming(), 0); }) : null;
    resizeObserver?.observe(container);
    /* The composition changed (the Tarot hero opened, or another destination took over): the planet moves there, the glow and the Moon with it. */
    const syncComposition = () => { globe.setFraming(sceneFraming(), reducedMotion() ? 0 : COMPOSITION_MILLIS); };
    /* A destination is open: the planet turns at the menu's pace, and eases back to the slow one when the destination closes. */
    const syncIdle = () => {
        const open = experience?.dataset.pillarStage === 'pillar';
        globe.setIdleRate(open ? DESTINATION_IDLE_DEGREES_PER_SECOND : ONBOARDING_IDLE_DEGREES_PER_SECOND / tuning.idleScale, IDLE_RAMP_MILLIS);
    };
    const compositionObserver = experience && typeof MutationObserver === 'function'
        ? new MutationObserver(syncComposition)
        : null;
    compositionObserver?.observe(experience, { attributes: true, attributeFilter: ['data-earth-composition'] });
    const idleObserver = experience && typeof MutationObserver === 'function'
        ? new MutationObserver(syncIdle)
        : null;
    idleObserver?.observe(experience, { attributes: true, attributeFilter: ['data-pillar-stage'] });
    if (experience?.dataset.pillarStage === 'pillar')
        syncIdle();
    /* The tunnel's hand-off: resolved by the warp's own script, bounded here so a page without it can never strand the opening. */
    const warpHandoff = () => {
        const warp = window.__knowThyselfWarpReadyPromise;
        if (!warp || typeof warp.then !== 'function')
            return Promise.resolve();
        return Promise.race([warp, new Promise((resolve) => { window.setTimeout(resolve, WARP_WAIT_MILLIS); })]);
    };
    const session = {
        mode: 'ambient',
        async prepareOpeningIntro() {
            const startedAt = performance.now();
            let timedOut = false;
            await Promise.race([
                globe.whenReady(),
                new Promise((resolve) => window.setTimeout(() => { timedOut = true; resolve(); }, READY_TIMEOUT_MILLIS)),
            ]);
            view('preloading');
            onReady();
            await warpHandoff();
            return {
                timedOut,
                durationMillis: performance.now() - startedAt,
                steadyEvents: 1,
                startRange: ARRIVAL.rangeStartMetres,
                startFov: ARRIVAL.fovStartDegrees,
            };
        },
        async playOpeningZoom() {
            view('intro-zoom');
            await globe.playOpening();
            view('world');
        },
        /* A backdrop is not a map: it is never flown to a place and carries no pin. */
        focusLocation() { },
        markLocation() { },
        showWorld() { view('world'); },
        destroy() {
            resizeObserver?.disconnect();
            compositionObserver?.disconnect();
            idleObserver?.disconnect();
            globe.destroy();
            if (active === globe)
                active = null;
            const published = window;
            if (published.knowThyselfAmbientEarth === globe)
                delete published.knowThyselfAmbientEarth;
        },
    };
    return Promise.resolve(session);
}
