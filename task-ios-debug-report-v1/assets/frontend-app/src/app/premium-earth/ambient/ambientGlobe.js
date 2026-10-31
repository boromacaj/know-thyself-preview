import { AMBIENT_DISC_EVENT, discOnScreen } from './ambientDisc.js?v=b5ef5ed';
import { AMBIENT_MOON_EVENT, moonSilhouette } from './ambientMoonMask.js?v=b5ef5ed';
import { SUN_DETAIL, SUN_REFERENCE_DEFAULT, lightForBodyAt, sunOverrideFor, sunSceneFor } from './ambientSun.js?v=b5ef5ed';
import { AMBIENT_SUN_EVENT, sunMaskFor, sunNeedsRoom } from './ambientSunMask.js?v=b5ef5ed';
import { AmbientRenderer } from './ambientRenderer.js?v=b5ef5ed';
import { ARRIVAL, arrivalFraming, arrivalYaw } from './openingArrival.js?v=b5ef5ed';
import { FOV_DEGREES, IDLE_PITCH_DEGREES, RESTING_FRAMING, DEGREES, SKY_ORBIT_SHARE, ambientPolicy, cameraFor, easeOutCubic, flightAt, MOON, focusTarget, isOnEarth, moonFor, orientationFor, pickLocation, planFlight, roundedCoordinate, surfacePoint, } from './ambientMath.js?v=b5ef5ed';
import { AMBIENT_HERO_EVENT, blendReference, blendRotation, heroCompositionFor, heroMoonFor } from './ambientHero.js?v=b5ef5ed';
import { startCompositionFor } from './ambientStart.js?v=b5ef5ed';
import { ensureAmbientGlobeStyles } from './ambientStyles.js?v=b5ef5ed';
import { drawSurfaceMask } from './earthSurface.js?v=b5ef5ed';
import { drawEarthMap, loadEarthMap, loadedEarthMap } from './earthMap.js?v=b5ef5ed';
import { advanceRotation, addSpinVelocity, applyDrag, DEFAULT_MOTION, spendNudge } from './earthMotion.js?v=b5ef5ed';
import { decayPerSecondFor, earthMotionTuningFor } from './earthMotionTuning.js?v=b5ef5ed';
const IDLE_START = orientationFor(IDLE_PITCH_DEGREES, 12);
const CLOUD_RATE = 0.0045;
const FRAMING_MILLIS = 900;
/** How long past its own length a framing move is given before it is ended by force: frames are a courtesy, arrival is not. */
const SETTLE_GRACE_MILLIS = 250;
/** How long a lost WebGL context may stay lost before the still globe takes its place. A context the browser gives back does so
 *  within a moment or two; one that is not back after this is not coming, and a black canvas is not a backdrop. */
export const CONTEXT_LOSS_GRACE_MILLIS = 4000;
const MARKER_FADE_PER_SECOND = 1.7;
/** How fast the shown hero weight closes on the asked one: 1 - e^-k per second, so most of a jump is gone in about 0.4 s. */
const HERO_EASE_PER_SECOND = 7;
/** How quickly extra rotation from `nudge` is spent: 63% of it in this many seconds, nearly all of it in three times that (before earthMotionTuning's settleScale). */
const NUDGE_SETTLE_SECONDS = 0.55;
const PICK_TRAVEL_PX = 6;
const PICK_MILLIS = 450;
const clampFraming = (base, patch) => ({
    radius: Math.min(1.2, Math.max(0.02, patch.radius ?? base.radius)),
    x: Math.min(1, Math.max(0, patch.x ?? base.x)),
    y: Math.min(1, Math.max(0, patch.y ?? base.y)),
});
const lerpFraming = (from, to, t) => ({
    radius: from.radius + (to.radius - from.radius) * t,
    x: from.x + (to.x - from.x) * t,
    y: from.y + (to.y - from.y) * t,
});
/** Handed out once per mounted globe, so a diagnostic can tell WHICH globe a gesture talked to (see snapshot().debug.id). */
let nextSessionId = 1;
export function mountAmbientGlobe(container, options = {}) {
    ensureAmbientGlobeStyles();
    const sessionId = nextSessionId;
    nextSessionId += 1;
    const host = document.createElement('div');
    host.className = 'ambient-globe';
    host.dataset.ambientSession = String(sessionId);
    host.setAttribute('aria-hidden', 'true');
    container.append(host);
    let ambient = options.ambient ?? true;
    let highlight = options.highlight ?? true;
    let detail = options.detail ?? 'auto';
    const interactive = options.interactive ?? false;
    /* HOW HARD THE EARTH ANSWERS A FINGER, HOW LONG IT CARRIES AND HOW FAST IT TURNS ALONE (earthMotionTuning.ts): read once, here. One motion engine - the
       velocity that earthMotion.ts decays - scaled at its stages; `?earthMotion=baseline` is the previous motion, for a review side by side. */
    const motionTuning = earthMotionTuningFor(typeof window === 'undefined' ? '' : (window.location?.search ?? ''));
    const idleDegrees = (options.idleDegreesPerSecond ?? 0.7) * motionTuning.idleScale;
    /* The rate now, and where a change of rate (setIdleRate) is heading and how long it takes; all three equal idleDegrees until one is asked for. */
    let idleNowDegrees = idleDegrees;
    let idleTargetDegrees = idleDegrees;
    let idleRampSeconds = 0;
    const motionFor = (idleRate) => ({ ...DEFAULT_MOTION, idleRate, decayPerSecond: decayPerSecondFor(DEFAULT_MOTION.decayPerSecond, motionTuning) });
    let location = options.location && isOnEarth(options.location.latitude, options.location.longitude) ? options.location : null;
    /* Where the globe rests, and so where the arrival ends. A change of scene size or composition moves this, never the arrival's curve. */
    let restingFraming = clampFraming(RESTING_FRAMING, options.framing ?? {});
    /* Held at the arrival's first frame - a dot, not turning - until playOpening() begins it. */
    let awaitingArrival = options.startDistant === true;
    let framing = awaitingArrival ? arrivalFraming(restingFraming, 0) : restingFraming;
    let framingMove = null;
    /* The timer that ends a framing move whatever the frame loop is doing (see startFramingMove). */
    let settleTimer = 0;
    /* Diagnostics only: the last impulse and what became of it, and what the last frame did to the yaw. */
    let lastImpulse = null;
    let lastFrameAt = 0;
    let lastYawDelta = 0;
    const reducedQuery = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : null;
    const perfHost = document.getElementById('place-experience');
    const constrained = () => perfHost?.dataset.ktPerf === 'constrained';
    let policy = ambientPolicy({
        detail, reducedMotion: reducedQuery?.matches ?? false, constrained: constrained(), ambient, idleDegreesPerSecond: idleDegrees,
    });
    let rotation = { yaw: IDLE_START.yaw, pitch: IDLE_START.pitch, yawVelocity: 0, pitchVelocity: 0 };
    /* A place given at the start is already facing the viewer: there is nothing to fly from. */
    if (location)
        rotation = { yaw: orientationFor(location.latitude, location.longitude).yaw, pitch: focusTarget(location.latitude), yawVelocity: 0, pitchVelocity: 0 };
    /* THE ORIENTATION THE ARRIVAL ENDS ON, which is the one the idle spin carries on from. Held from here on: the arrival is drawn
       round it (arrivalYaw), so it begins a third of a turn away and comes to rest exactly here, at the idle spin's own speed and in its direction. */
    const arrivalRest = { yaw: rotation.yaw, pitch: rotation.pitch };
    /* The idle spin the arrival hands over to (radians a second): the arrival turns the same way and arrives at this very speed (openingArrival.arrivalYaw). */
    const arrivalIdleRate = () => (policy.idleRate > 0 ? idleNowDegrees * DEGREES : 0);
    /* A still globe (reduced motion) has no arrival to wait for: it is at rest from the first frame. */
    if (policy.flightScale === 0) {
        awaitingArrival = false;
        framing = restingFraming;
    }
    if (awaitingArrival)
        rotation = { yaw: arrivalYaw(arrivalRest.yaw, 0, arrivalIdleRate()), pitch: arrivalRest.pitch, yawVelocity: 0, pitchVelocity: 0 };
    let motion = motionFor(policy.idleRate);
    let flight = null;
    let markerOpacity = 0;
    let elapsed = 0;
    /* The review address, read once: it pins the Sun (?sun=, ?sunangle=). The Moon reads nothing from it and nothing from the date: it is the 3c1fd4a Moon. */
    const reviewSearch = typeof window === 'undefined' ? '' : (window.location?.search ?? '');
    /* THE SUN is a celestial source (ambientSun.ts), placed once per frame from the camera's yaw and pitch: a few multiplies, no clock. A review
       address may pin it (?sun=, ?sunangle=); read once, here. */
    const sunOverride = sunOverrideFor(reviewSearch);
    /* WHERE THE SUN STARTS: the pose the globe has when the scene first settles (no opening, no flight under way). Until then the Sun stays at its
       reference spot for the pose of the moment, so it does not slide about during the opening; after it, it is a fixed point of the sky. */
    let sunAnchor = null;
    /* THE START COMPOSITION (ambientStart.ts): where the Sun is put and where on its path the Moon starts, worked out ONCE, at the same moment as the anchor, from the scene's size and
       framing - so that both are in view, clear of the Earth and of the interface, when the scene first settles, and still a few seconds on. The Moon's clock starts at that moment too
       (`settledAt`), so what it shows then does not depend on how long the globe took to get there. Nothing is searched in a frame. */
    let composition = null;
    let settledAt = 0;
    /* THE HERO (ambientHero.ts). `heroOn` while one is held or still letting go; `heroTarget` is what the screen asks for, `heroProgress` what is shown. */
    let heroOn = false;
    let heroTarget = 0;
    let heroProgress = 0;
    let heroPose = null;
    let heroKey = '';
    let cloudAngle = 0;
    let extraSpin = 0;
    /* Extra rotation still to be spent, in radians (see `nudge`). */
    let nudgePending = 0;
    const tilt = (options.axialTiltDegrees ?? 0) * DEGREES;
    let framesDrawn = 0;
    let dirty = true;
    let destroyed = false;
    let visible = true;
    let onScreen = true;
    let lost = false;
    let frameId = 0;
    let lastTick = 0;
    let lastDraw = 0;
    let dragging = false;
    let pointer = null;
    const frameTimes = [];
    let canvas = null;
    let renderer = null;
    let mask = null;
    let maskWidth = 0;
    let maskIsReal = false;
    /* True from mounting until the first build: the real map is awaited, and nothing else may build a planet before it. */
    let starting = false;
    let state = 'webgl';
    let readyResolve = () => { };
    const ready = new Promise((resolve) => { readyResolve = resolve; });
    /* ---------------------------------------------------------- fallback */
    const enterFallback = () => {
        if (state === 'fallback' && canvas === null)
            return;
        state = 'fallback';
        cancelAnimationFrame(frameId);
        renderer?.dispose();
        renderer = null;
        clearMoon();
        clearSun();
        canvas?.remove();
        canvas = null;
        host.replaceChildren();
        const still = document.createElement('div');
        still.className = 'ambient-globe__fallback';
        host.append(still);
        host.dataset.ambientGlobeState = 'fallback';
        container.dataset.ambientGlobeState = 'fallback';
        readyResolve();
    };
    /* ------------------------------------------------------------- build */
    /**
     * The canvas the ground is baked from. The real map when it has arrived (drawn at the device's mask width), otherwise the
     * hand-drawn mask - so a planet is always there to draw, and a better one as soon as the map is.
     */
    const surfaceCanvas = () => {
        const image = options.realEarth === false ? null : loadedEarthMap();
        const wantReal = image !== null;
        if (mask !== null && maskWidth === policy.maskWidth && maskIsReal === wantReal)
            return;
        mask = image
            ? drawEarthMap(document.createElement('canvas'), image, policy.maskWidth)
            : drawSurfaceMask(document.createElement('canvas'), policy.maskWidth);
        maskWidth = policy.maskWidth;
        maskIsReal = wantReal;
    };
    const build = () => {
        try {
            surfaceCanvas();
            if (mask === null)
                return false;
            const surface = document.createElement('canvas');
            surface.className = 'ambient-globe__canvas';
            const gl = surface.getContext('webgl', { alpha: false, antialias: policy.antialias, depth: true, powerPreference: 'default' });
            if (!gl)
                return false;
            renderer = new AmbientRenderer(gl, mask, policy.octaves, maskIsReal);
            canvas?.remove();
            canvas = surface;
            host.replaceChildren(surface);
            surface.addEventListener('webglcontextlost', onContextLost);
            surface.addEventListener('webglcontextrestored', onContextRestored);
            if (interactive)
                attachPointer(surface);
            host.dataset.ambientGlobeState = 'webgl';
            container.dataset.ambientGlobeState = 'webgl';
            state = 'webgl';
            resize();
            return true;
        }
        catch (error) {
            // eslint-disable-next-line no-console
            console.warn('[ambient-globe] WebGL could not start; showing the still globe', error);
            return false;
        }
    };
    /** A new canvas, a new context, a new renderer: for a change of detail. */
    const rebuildCanvas = () => {
        cancelAnimationFrame(frameId);
        frameId = 0;
        renderer?.dispose();
        renderer = null;
        if (!build()) {
            enterFallback();
            return;
        }
        dirty = true;
        lastTick = 0;
        schedule();
    };
    /** The same canvas, a fresh renderer: for a context that was lost and has come back. */
    const rebuildRenderer = () => {
        if (state !== 'webgl' || canvas === null)
            return;
        try {
            renderer?.dispose();
            renderer = null;
            surfaceCanvas();
            if (mask === null)
                throw new Error('no surface');
            const gl = canvas.getContext('webgl');
            if (!gl)
                throw new Error('no context');
            renderer = new AmbientRenderer(gl, mask, policy.octaves, maskIsReal);
            resize();
            dirty = true;
        }
        catch {
            enterFallback();
        }
    };
    let contextLossTimer = 0;
    const onContextLost = (event) => {
        event.preventDefault();
        lost = true;
        /* A cancelled frame is a frame that is no longer pending: frameId is what schedule() reads to know whether to ask for the
           next one, so leaving it set meant that a restored context could never start drawing again - a black disc, for good. */
        cancelAnimationFrame(frameId);
        frameId = 0;
        lastTick = 0;
        host.dataset.ambientGlobeState = 'context-lost';
        /* A context that does not come back must not leave the backdrop black: after the grace the still globe is shown instead. */
        window.clearTimeout(contextLossTimer);
        contextLossTimer = window.setTimeout(() => {
            contextLossTimer = 0;
            if (destroyed || !lost)
                return;
            lost = false;
            enterFallback();
        }, CONTEXT_LOSS_GRACE_MILLIS);
    };
    const onContextRestored = () => {
        window.clearTimeout(contextLossTimer);
        contextLossTimer = 0;
        if (state !== 'webgl')
            return;
        lost = false;
        host.dataset.ambientGlobeState = 'webgl';
        rebuildRenderer();
        schedule();
    };
    /* ------------------------------------------------------------ sizing */
    const cssSize = () => ({
        width: Math.max(1, host.clientWidth || container.clientWidth),
        height: Math.max(1, host.clientHeight || container.clientHeight),
    });
    const pixelRatio = () => Math.min(window.devicePixelRatio || 1, policy.pixelRatioCap);
    function resize() {
        if (!renderer || !canvas)
            return;
        const { width, height } = cssSize();
        const ratio = pixelRatio();
        if (renderer.resize(Math.max(1, Math.round(width * ratio)), Math.max(1, Math.round(height * ratio))))
            dirty = true;
        publishDisc();
    }
    const resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(() => { resize(); schedule(); }) : null;
    resizeObserver?.observe(host);
    /* ------------------------------------------------------------ policy */
    const applyPolicy = () => {
        const next = ambientPolicy({
            detail, reducedMotion: reducedQuery?.matches ?? false, constrained: constrained(), ambient, idleDegreesPerSecond: idleNowDegrees,
        });
        /* A change of detail rebuilds the whole canvas: multisampling is chosen when a context is made and cannot be changed after. */
        const rebuild = next.maskWidth !== policy.maskWidth || next.octaves !== policy.octaves || next.antialias !== policy.antialias;
        policy = next;
        motion = motionFor(policy.idleRate);
        if (rebuild && state === 'webgl' && !starting)
            rebuildCanvas();
        else
            resize();
        /* Motion switched off while the globe waits at the arrival's first frame: it is at rest, now, not a dot for ever. */
        if (policy.flightScale === 0 && awaitingArrival) {
            awaitingArrival = false;
            framing = restingFraming;
            rotation = { yaw: arrivalRest.yaw, pitch: arrivalRest.pitch, yawVelocity: 0, pitchVelocity: 0 };
        }
        if (policy.flightScale === 0) {
            flight = null;
            extraSpin = 0;
            finishFramingMove();
        }
        dirty = true;
        schedule();
    };
    /** The spin's rate has moved on (setIdleRate ramps it a frame at a time): the motion options are made again, outside the frame's own work. */
    const retuneIdle = () => { motion = motionFor(policy.idleRate > 0 ? idleNowDegrees * DEGREES : 0); };
    const onReducedChange = () => applyPolicy();
    reducedQuery?.addEventListener?.('change', onReducedChange);
    const perfObserver = perfHost && typeof MutationObserver === 'function'
        ? new MutationObserver(() => { if (detail === 'auto')
            applyPolicy(); })
        : null;
    perfObserver?.observe(perfHost, { attributes: true, attributeFilter: ['data-kt-perf'] });
    /* ------------------------------------------------------- interaction */
    function attachPointer(surface) {
        surface.style.touchAction = 'none';
        surface.addEventListener('pointerdown', onPointerDown);
        surface.addEventListener('pointermove', onPointerMove);
        surface.addEventListener('pointerup', onPointerUp);
        surface.addEventListener('pointercancel', onPointerCancel);
    }
    function onPointerDown(event) {
        if (pointer)
            return;
        pointer = {
            id: event.pointerId, x: event.clientX, y: event.clientY, at: event.timeStamp,
            startX: event.clientX, startY: event.clientY, startAt: event.timeStamp, moved: false,
        };
        dragging = true;
        flight = null;
        rotation = { ...rotation, yawVelocity: 0, pitchVelocity: 0 };
        try {
            canvas?.setPointerCapture(event.pointerId);
        }
        catch { /* a synthetic pointer has nothing to capture */ }
    }
    function onPointerMove(event) {
        if (!pointer || pointer.id !== event.pointerId || !dragging)
            return;
        const dx = event.clientX - pointer.x;
        const dy = event.clientY - pointer.y;
        const seconds = Math.max(0, event.timeStamp - pointer.at) / 1000;
        if (Math.hypot(event.clientX - pointer.startX, event.clientY - pointer.startY) > PICK_TRAVEL_PX)
            pointer.moved = true;
        pointer = { ...pointer, x: event.clientX, y: event.clientY, at: event.timeStamp };
        const { width, height } = cssSize();
        const radius = cameraFor(framing, width, height).radiusPx;
        rotation = applyDrag(rotation, dx, dy, seconds, radius, false, motion);
        dirty = true;
    }
    function onPointerUp(event) {
        if (!pointer || pointer.id !== event.pointerId)
            return;
        const tap = !pointer.moved && event.timeStamp - pointer.startAt < PICK_MILLIS;
        pointer = null;
        dragging = false;
        if (canvas?.hasPointerCapture(event.pointerId))
            canvas.releasePointerCapture(event.pointerId);
        if (tap && options.onPick && canvas) {
            const rect = canvas.getBoundingClientRect();
            const { width, height } = cssSize();
            const hit = pickLocation(event.clientX - rect.left, event.clientY - rect.top, width, height, cameraFor(framing, width, height), rotation.yaw, rotation.pitch, tilt);
            if (hit)
                options.onPick({ latitude: roundedCoordinate(hit.latitude), longitude: roundedCoordinate(hit.longitude) });
        }
        dirty = true;
        schedule();
    }
    function onPointerCancel(event) {
        if (pointer?.id === event.pointerId) {
            pointer = null;
            dragging = false;
        }
    }
    /* ----------------------------------------------------- the disc, said */
    /*
     * THE DISC IS PUBLISHED, so whatever is drawn around the planet outside the canvas (the vessel glow ring) sits on the circle
     * this canvas draws - see ambientDisc.ts. Sent when something about it changed, never on a frame that moved nothing; a
     * framing move sends every frame, so the ring is on the limb at every step of the zoom and not only at its end.
     */
    let published = '';
    const publishDisc = () => {
        if (destroyed || state !== 'webgl' || framesDrawn === 0)
            return;
        const settled = framingMove === null && !starting && !awaitingArrival;
        const key = `${framing.radius.toFixed(5)}|${framing.x.toFixed(5)}|${framing.y.toFixed(5)}|${settled}|${host.clientWidth}x${host.clientHeight}`;
        if (key === published)
            return;
        published = key;
        host.dataset.ambientDisc = settled ? 'settled' : 'moving';
        container.dataset.ambientDisc = host.dataset.ambientDisc;
        const detail = { element: host, framing: { radius: framing.radius, x: framing.x, y: framing.y }, settled };
        window.dispatchEvent(new CustomEvent(AMBIENT_DISC_EVENT, { detail }));
    };
    /*
     * THE MOON'S SILHOUETTE IS PUBLISHED, so the DOM backdrop drawn over this canvas (its glow and wave lines) can cut the Moon's circle out of
     * itself and not paint across a solid body - see ambientMoonMask.ts. Sent only when it changed (never on a frame that moved nothing: reduced
     * motion sends once), and `null` whenever there is no Moon on the canvas any more.
     */
    let publishedMoon = '';
    const publishMoon = (frame) => {
        const moon = frame.moon;
        const silhouette = moon
            ? moonSilhouette(moon.position, moon.radius, frame.pose.distance, Math.tan((FOV_DEGREES * DEGREES) / 2), framing, canvas ? canvas.width : 1, canvas ? canvas.height : 1)
            : null;
        const key = silhouette ? `${silhouette.x.toFixed(4)}|${silhouette.y.toFixed(4)}|${silhouette.rx.toFixed(4)}|${silhouette.ry.toFixed(4)}` : '';
        if (key === publishedMoon)
            return;
        publishedMoon = key;
        window.dispatchEvent(new CustomEvent(AMBIENT_MOON_EVENT, { detail: silhouette }));
    };
    /* THE HERO'S WEIGHT IS PUBLISHED, only when it changed, so that what the screen draws for the pose fades in step with the pose and not on a clock of its own. */
    let publishedHero = '';
    const publishHero = () => {
        const key = heroOn ? `${heroProgress.toFixed(3)}|${heroTarget}` : '';
        if (key === publishedHero)
            return;
        publishedHero = key;
        window.dispatchEvent(new CustomEvent(AMBIENT_HERO_EVENT, { detail: { active: heroOn, progress: heroOn ? heroProgress : 0, target: heroTarget } }));
    };
    /** There is no Moon on the canvas any more (fallback, lost context, destroyed): the backdrop gives its place back. */
    const clearMoon = () => {
        if (publishedMoon === '')
            return;
        publishedMoon = '';
        window.dispatchEvent(new CustomEvent(AMBIENT_MOON_EVENT, { detail: null }));
    };
    /*
     * THE SUN'S CLEAN REGION IS PUBLISHED the same way, for the same reason: the DOM backdrop drawn over this canvas must not paint its wave lines across the Sun's
     * core and corona (ambientSunMask.ts). Only while some of the Sun's disc is not behind the planet and its source is drawn; `null` the moment it is hidden or gone
     * (and on fallback and destroy). Sent only when it moved by more than about half a pixel - the region is feathered over tens of pixels - never on a frame that did not.
     */
    let publishedSun = '';
    const publishSun = (frame) => {
        const sun = frame.sun;
        const silhouette = sun && sunNeedsRoom(sun.visible, sun.source)
            ? sunMaskFor(sun.x, sun.y, sun.coreRadius, canvas ? canvas.width : 1, canvas ? canvas.height : 1)
            : null;
        const key = silhouette ? `${silhouette.x.toFixed(3)}|${silhouette.y.toFixed(3)}|${silhouette.rx.toFixed(3)}|${silhouette.ry.toFixed(3)}` : '';
        if (key === publishedSun)
            return;
        publishedSun = key;
        window.dispatchEvent(new CustomEvent(AMBIENT_SUN_EVENT, { detail: silhouette }));
    };
    const clearSun = () => {
        if (publishedSun === '')
            return;
        publishedSun = '';
        window.dispatchEvent(new CustomEvent(AMBIENT_SUN_EVENT, { detail: null }));
    };
    /** Ends the framing move where it was going, now: its promise resolves, the framing is the final one, and a frame is owed. */
    const finishFramingMove = () => {
        window.clearTimeout(settleTimer);
        settleTimer = 0;
        const move = framingMove;
        if (!move)
            return;
        if (move.arrival) {
            /* The arrival ends on the last frame of the arrival, whatever the frame loop was doing: the resting size, the resting
               orientation, no speed, and the Moon's clock starts from this moment. */
            framing = restingFraming;
            rotation = { yaw: arrivalRest.yaw, pitch: arrivalRest.pitch, yawVelocity: 0, pitchVelocity: 0 };
            settledAt = elapsed;
        }
        else {
            framing = move.to;
        }
        extraSpin = 0;
        framingMove = null;
        dirty = true;
        move.done();
    };
    /**
     * Begins a framing move. THE MOVE ALWAYS ARRIVES. It is driven by frames, but frames can stop - a page in the background, a
     * canvas off screen, a lost context - and then nothing would end it: the planet would stay at whatever size it had reached and
     * the opening's promise would never resolve. So a timer, on the wall clock, ends it a little after its time is up whether or
     * not a frame has; and a move that replaces another carries the other's promise, so the opening is awaited to the real end.
     */
    const startFramingMove = (move) => {
        const carried = framingMove?.done;
        window.clearTimeout(settleTimer);
        framingMove = carried ? { ...move, done: () => { carried(); move.done(); } } : move;
        const mine = framingMove;
        settleTimer = window.setTimeout(() => {
            settleTimer = 0;
            if (framingMove !== mine)
                return;
            finishFramingMove();
            /* Said now, not at the next frame: with no frames coming the interface still learns where the disc has come to rest. */
            publishDisc();
            wake();
        }, move.durationMillis + SETTLE_GRACE_MILLIS);
    };
    /* -------------------------------------------------------------- loop */
    /* Held at the arrival's first frame - behind the warp, a dot that does not turn - it asks for no frames: the one that shows it is enough. */
    const arrivalPending = () => awaitingArrival;
    const arrivalActive = () => awaitingArrival || framingMove?.arrival === true;
    const animating = () => framingMove !== null || (!arrivalPending() && (policy.idleRate > 0 || policy.drift > 0 || flight !== null || dragging
        || idleNowDegrees !== idleTargetDegrees
        || (heroOn && heroProgress !== heroTarget)
        || nudgePending !== 0
        || rotation.yawVelocity !== 0 || rotation.pitchVelocity !== 0 || (location !== null && highlight && policy.pulse)
        || markerOpacity !== markerTarget()));
    const markerTarget = () => (location !== null && highlight ? 1 : 0);
    function schedule() {
        if (destroyed || lost || state !== 'webgl' || frameId !== 0 || !visible || !onScreen)
            return;
        frameId = requestAnimationFrame(tick);
    }
    function advance(now, delta) {
        elapsed += delta;
        if (policy.drift > 0)
            cloudAngle += CLOUD_RATE * delta;
        /* The Moon's clock does not run while the planet arrives: it starts from the start phase the moment the arrival has ended. */
        if (arrivalActive())
            settledAt = elapsed;
        /* A change of idle rate (setIdleRate) is reached the way a swipe's glide dies away: exponentially, against the real frame delta. */
        if (idleNowDegrees !== idleTargetDegrees) {
            const settle = idleRampSeconds <= 0 ? 1 : 1 - Math.exp(-delta / (idleRampSeconds / 3));
            idleNowDegrees += (idleTargetDegrees - idleNowDegrees) * settle;
            if (Math.abs(idleTargetDegrees - idleNowDegrees) < 1e-4)
                idleNowDegrees = idleTargetDegrees;
            retuneIdle();
        }
        if (framingMove) {
            /* The frame's clock and performance.now() are not the same reading: a frame can stamp a hair before the move began. */
            const t = framingMove.durationMillis === 0 ? 1 : Math.max(0, (now - framingMove.startedAt) / framingMove.durationMillis);
            if (t >= 1) {
                finishFramingMove();
            }
            else if (framingMove.arrival) {
                /* The arrival is a function of how much of its 5.2 s has passed, linearly, as the source's was: size and roll are its own curves. */
                framing = arrivalFraming(restingFraming, t);
                rotation = { yaw: arrivalYaw(arrivalRest.yaw, t, arrivalIdleRate()), pitch: arrivalRest.pitch, yawVelocity: 0, pitchVelocity: 0 };
            }
            else {
                const eased = easeOutCubic(t);
                framing = lerpFraming(framingMove.from, framingMove.to, eased);
                if (framingMove.spin)
                    extraSpin = 0.40 * (1 - eased) * (1 - eased) * policy.drift;
            }
        }
        if (flight) {
            const at = flightAt(flight, now);
            rotation = { yaw: at.yaw, pitch: at.pitch, yawVelocity: 0, pitchVelocity: 0 };
            if (at.done)
                flight = null;
        }
        else if (arrivalActive()) {
            /* The arrival owns the orientation: no idle spin, no glide, no nudge until it has come to rest. */
        }
        else {
            rotation = advanceRotation(rotation, delta, dragging, motion);
            if (nudgePending !== 0 && !dragging) {
                const step = spendNudge(nudgePending, delta, NUDGE_SETTLE_SECONDS * motionTuning.settleScale);
                rotation = { ...rotation, yaw: rotation.yaw + step.spent };
                nudgePending = step.remaining;
            }
            if (extraSpin > 0 && !dragging)
                rotation = { ...rotation, yaw: rotation.yaw + extraSpin * delta };
        }
        if (heroOn) {
            const ease = 1 - Math.exp(-delta * HERO_EASE_PER_SECOND);
            heroProgress += (heroTarget - heroProgress) * ease;
            if (Math.abs(heroTarget - heroProgress) < 0.0008)
                heroProgress = heroTarget;
            if (heroProgress === 0 && heroTarget === 0)
                heroOn = false;
            /* Held in full, the free scene is not allowed to run away behind the pose (a long stay would otherwise have to be unwound on the way out): it rests at the anchor. */
            if (heroOn && heroProgress >= 1 && sunAnchor !== null && flight === null) {
                rotation = { yaw: sunAnchor.yaw, pitch: sunAnchor.pitch, yawVelocity: 0, pitchVelocity: 0 };
                nudgePending = 0;
                extraSpin = 0;
            }
        }
        const target = markerTarget();
        if (markerOpacity !== target) {
            const step = MARKER_FADE_PER_SECOND * delta;
            markerOpacity = target > markerOpacity ? Math.min(target, markerOpacity + step) : Math.max(target, markerOpacity - step);
        }
    }
    function frameOf() {
        if (sunAnchor === null && !starting && (arrivalActive() || (framingMove === null && flight === null))) {
            /* A globe that arrives is composed for where it ARRIVES: the Sun and the Moon are placed for the resting size and orientation before
               the first frame is drawn, so nothing is placed twice and nothing jumps when the arrival ends. The Sun is on the sky the camera
               orbits, so it sweeps in with the stars and lands on its place; the Moon's clock starts when the arrival has ended (finishFramingMove). */
            const at = arrivalActive() ? arrivalRest : rotation;
            sunAnchor = { yaw: at.yaw, pitch: at.pitch };
            const size = cssSize();
            composition = startCompositionFor({
                width: size.width, height: size.height, framing: arrivalActive() ? restingFraming : framing, yaw: at.yaw, pitch: at.pitch,
                idleRate: policy.idleRate, moving: policy.drift > 0, sunPinned: sunOverride !== null,
            });
            settledAt = elapsed;
        }
        const { width, height } = canvas ? { width: canvas.width, height: canvas.height } : cssSize();
        const pose = cameraFor(framing, width, height);
        const pulsing = policy.pulse;
        /* THE HERO: the pose it asks for is worked out once per screen size and framing, and held for as long as it is wanted. */
        let hero = null;
        if (heroOn && sunAnchor !== null) {
            const size = cssSize();
            const key = `${size.width}x${size.height}:${framing.radius},${framing.x},${framing.y}:${sunAnchor.yaw},${sunAnchor.pitch}`;
            if (key !== heroKey || heroPose === null) {
                heroKey = key;
                heroPose = heroCompositionFor({ width: size.width, height: size.height, framing, yaw: sunAnchor.yaw, pitch: sunAnchor.pitch });
            }
            hero = heroPose;
        }
        const weight = hero ? heroProgress : 0;
        const shown = hero && sunAnchor ? blendRotation(sunAnchor, rotation, weight) : rotation;
        /* The Sun belongs to the sky the stars are on, so it moves with the camera's orbit and is still when the camera is: reduced motion holds it. It is also
           the light the Earth is shaded from (ambientSun.ts), placed once, here, with the Sun it lights. */
        const { sun, light, screen, glint } = sunSceneFor({
            yaw: shown.yaw, pitch: shown.pitch, pose, width, height, override: sunOverride, detail: SUN_DETAIL,
            anchorYaw: (sunAnchor ?? rotation).yaw, anchorPitch: (sunAnchor ?? rotation).pitch,
            reference: hero ? blendReference(composition?.sun ?? SUN_REFERENCE_DEFAULT, hero.pose.sun, weight) : composition?.sun,
        });
        /* The Moon's phase is the free one (its start, its clock, a share of the planet's turn) and, with a hero, the shortest way from the authored one at the held weight. */
        const freePhase = (composition?.moonStart ?? MOON.restPhase)
            + (sunAnchor !== null && policy.drift > 0 ? (Math.PI * 2 * (elapsed - settledAt)) / MOON.periodSeconds : 0)
            + MOON.yawCoupling * (rotation.yaw - (sunAnchor ?? rotation).yaw);
        const moonOf = () => {
            const moon = moonFor(sunAnchor === null ? 0 : elapsed - settledAt, rotation.yaw - (sunAnchor ?? rotation).yaw, policy.drift > 0, composition?.moonStart);
            return hero ? heroMoonFor(hero.pose, freePhase, weight) : moon;
        };
        const moon = moonOf();
        /* The Moon is lit from the Sun that is drawn, as seen from where the Moon is: its place on the canvas is the one its silhouette publishes (ambientMoonMask.ts); nothing is moved. */
        const moonAt = moonSilhouette(moon.position, moon.radius, pose.distance, Math.tan((FOV_DEGREES * DEGREES) / 2), framing, width, height);
        const moonLight = screen ? lightForBodyAt(screen.x, screen.y, moonAt.x * width, moonAt.y * height, moonAt.rx * width) : light;
        return {
            yaw: shown.yaw,
            pitch: shown.pitch,
            pose,
            time: elapsed,
            cloudAngle,
            cloudOctaves: policy.cloudOctaves,
            starLayers: policy.starLayers,
            twinkle: policy.twinkle,
            tilt,
            /* The moon goes round behind the planet with the clock and, a little, with the planet's turn; with motion off it rests where it can be seen
               (the 3c1fd4a Moon: ambientMath.ts MOON). Its clock and its share of the planet's turn count from the moment the scene settled, from the start phase the
               composition chose: until then it holds that place, as the Sun holds its own. */
            moon,
            sun,
            light,
            moonLight,
            glint,
            marker: location && markerOpacity > 0
                ? { point: surfacePoint(location.latitude, location.longitude), opacity: markerOpacity, phase: pulsing ? (elapsed * 0.42) % 1 : 0.35 }
                : null,
        };
    }
    function tick(now) {
        frameId = 0;
        if (destroyed || lost || !renderer || !visible || !onScreen)
            return;
        if (policy.frameIntervalMillis > 0 && now - lastDraw < policy.frameIntervalMillis - 1) {
            schedule();
            return;
        }
        const delta = lastTick === 0 ? 0 : Math.min(0.05, (now - lastTick) / 1000);
        lastTick = now;
        const wasAnimating = animating();
        const yawBefore = rotation.yaw;
        advance(now, delta);
        lastYawDelta = rotation.yaw - yawBefore;
        lastFrameAt = now;
        if (wasAnimating || dirty || animating()) {
            try {
                const frame = frameOf();
                renderer.draw(frame);
                publishMoon(frame);
                publishSun(frame);
                publishHero();
            }
            catch {
                enterFallback();
                return;
            }
            dirty = false;
            framesDrawn += 1;
            publishDisc();
            if (lastDraw !== 0) {
                frameTimes.push(now - lastDraw);
                if (frameTimes.length > 90)
                    frameTimes.shift();
            }
            lastDraw = now;
            if (framesDrawn === 1)
                readyResolve();
            schedule();
        }
        else {
            /* Nothing moves: stop asking for frames until something does. */
            lastTick = 0;
            lastDraw = 0;
            frameTimes.length = 0;
        }
    }
    const wake = () => { dirty = true; lastTick = 0; schedule(); };
    const onVisibility = () => {
        visible = !document.hidden;
        if (visible)
            wake();
        else {
            cancelAnimationFrame(frameId);
            frameId = 0;
            lastTick = 0;
            lastDraw = 0;
        }
    };
    document.addEventListener('visibilitychange', onVisibility);
    const intersection = typeof IntersectionObserver === 'function'
        ? new IntersectionObserver((entries) => {
            onScreen = entries.some((entry) => entry.isIntersecting);
            if (onScreen)
                wake();
            else {
                cancelAnimationFrame(frameId);
                frameId = 0;
                lastTick = 0;
                lastDraw = 0;
            }
        })
        : null;
    intersection?.observe(host);
    /* ----------------------------------------------------------- session */
    const startFlight = (target) => {
        flight = planFlight(rotation, target.latitude, target.longitude, performance.now(), state === 'webgl' ? policy.flightScale : 0);
    };
    const session = {
        get state() { return state; },
        get element() { return host; },
        setLocation(next, change = {}) {
            if (next === null) {
                location = null;
                wake();
                return;
            }
            if (!isOnEarth(next.latitude, next.longitude))
                return;
            location = next;
            if (change.focus ?? options.focus ?? true)
                startFlight(next);
            wake();
        },
        setAmbient(next) { ambient = next; applyPolicy(); },
        nudge(degrees) {
            if (policy.flightScale === 0 || state !== 'webgl' || !Number.isFinite(degrees))
                return;
            const limit = motionTuning.nudgeCarryLimitDegrees * DEGREES;
            nudgePending = Math.max(-limit, Math.min(limit, nudgePending + degrees * DEGREES));
            schedule();
        },
        impulse(degreesPerSecond) {
            const before = rotation.yawVelocity / DEGREES;
            const refusal = policy.flightScale === 0 ? 'reduced-motion'
                : state !== 'webgl' ? `no-webgl (${state})`
                    : !Number.isFinite(degreesPerSecond) || degreesPerSecond === 0 ? 'bad-value' : '';
            if (refusal) {
                lastImpulse = { requested: degreesPerSecond, accepted: false, reason: refusal, before, after: before, at: performance.now() };
                return;
            }
            rotation = {
                ...rotation,
                yawVelocity: addSpinVelocity(rotation.yawVelocity, degreesPerSecond * DEGREES, motionTuning.maxDegreesPerSecond * DEGREES),
            };
            lastImpulse = { requested: degreesPerSecond, accepted: true, reason: '', before, after: rotation.yawVelocity / DEGREES, at: performance.now() };
            schedule();
        },
        setHero(on) {
            if (state !== 'webgl')
                return;
            if (on) {
                heroOn = true;
                heroKey = '';
            }
            else {
                heroTarget = 0;
            }
            wake();
        },
        setHeroProgress(progress) {
            if (!Number.isFinite(progress) || state !== 'webgl')
                return;
            heroTarget = Math.min(1, Math.max(0, progress));
            if (heroTarget > 0)
                heroOn = true;
            /* A still globe (reduced motion) cannot ease: it takes the weight at once. */
            if (policy.flightScale === 0)
                heroProgress = heroTarget;
            wake();
        },
        hero() { return { active: heroOn, progress: heroProgress, target: heroTarget, fallback: heroPose?.fallback ?? false }; },
        setHighlight(next) { highlight = next; wake(); },
        setDetail(next) { detail = next; applyPolicy(); },
        setIdleRate(degreesPerSecond, rampMillis = 0) {
            if (!Number.isFinite(degreesPerSecond) || degreesPerSecond < 0)
                return;
            idleTargetDegrees = degreesPerSecond * motionTuning.idleScale;
            idleRampSeconds = Math.max(0, rampMillis) / 1000;
            /* A still globe has no spin to change, and a change with no ramp is made now. */
            if (idleRampSeconds === 0 || policy.flightScale === 0) {
                idleNowDegrees = idleTargetDegrees;
                applyPolicy();
                return;
            }
            wake();
        },
        setFraming(patch, animateMillis = FRAMING_MILLIS) {
            /* During the arrival the framing is not a thing to animate to but the place the arrival ends: the curve is the arrival's, and a
               scene that changed size (the keyboard, a rotation of the phone) only moves where it ends. */
            if (arrivalActive()) {
                restingFraming = clampFraming(restingFraming, patch);
                if (awaitingArrival)
                    framing = arrivalFraming(restingFraming, 0);
                wake();
                publishDisc();
                return;
            }
            const to = clampFraming(framing, patch);
            restingFraming = to;
            /* Nothing animates without a drawn frame: a still globe, or one that cannot draw, takes its framing at once. */
            if (animateMillis <= 0 || policy.flightScale === 0 || state !== 'webgl') {
                /* An instant framing ends any move under way, so what that move was awaited for is released. */
                framing = to;
                const pending = framingMove;
                framingMove = null;
                window.clearTimeout(settleTimer);
                settleTimer = 0;
                pending?.done();
                wake();
                publishDisc();
                return;
            }
            startFramingMove({ from: framing, to, startedAt: performance.now(), durationMillis: animateMillis, spin: false, done: () => { } });
            wake();
        },
        playOpening() {
            /* An opening is the arrival drawn frame by frame. Without frames - reduced motion, or no WebGL - it is a cut, and it ends now: the intro waits on it. */
            if (policy.flightScale === 0 || state !== 'webgl') {
                awaitingArrival = false;
                framing = restingFraming;
                rotation = { yaw: arrivalRest.yaw, pitch: arrivalRest.pitch, yawVelocity: 0, pitchVelocity: 0 };
                framingMove = null;
                window.clearTimeout(settleTimer);
                settleTimer = 0;
                wake();
                return Promise.resolve();
            }
            awaitingArrival = false;
            framing = arrivalFraming(restingFraming, 0);
            rotation = { yaw: arrivalYaw(arrivalRest.yaw, 0, arrivalIdleRate()), pitch: arrivalRest.pitch, yawVelocity: 0, pitchVelocity: 0 };
            return new Promise((resolve) => {
                startFramingMove({ from: framing, to: restingFraming, startedAt: performance.now(), durationMillis: ARRIVAL.durationMillis, spin: false, arrival: true, done: resolve });
                wake();
            });
        },
        showWorld() {
            location = null;
            flight = null;
            const target = IDLE_START.pitch;
            if (policy.flightScale === 0 || state !== 'webgl')
                rotation = { ...rotation, pitch: target };
            else
                flight = { startYaw: rotation.yaw, startPitch: rotation.pitch, turnYaw: 0, turnPitch: target - rotation.pitch, startedAt: performance.now(), durationMillis: 1400 };
            wake();
        },
        whenReady() { return ready; },
        snapshot() {
            return {
                state,
                yawDegrees: rotation.yaw / DEGREES,
                pitchDegrees: rotation.pitch / DEGREES,
                spinDegreesPerSecond: rotation.yawVelocity / DEGREES,
                framing,
                location,
                ambient,
                highlight,
                markerOpacity,
                flying: flight !== null,
                detail: policy.detail,
                reducedMotion: reducedQuery?.matches ?? false,
                framesDrawn,
                policy,
                tiltDegrees: tilt / DEGREES,
                skyOrbitDegrees: [(rotation.yaw * SKY_ORBIT_SHARE) / DEGREES, (rotation.pitch * SKY_ORBIT_SHARE) / DEGREES],
                debug: {
                    id: sessionId,
                    rafPending: frameId !== 0,
                    lastFrameAt,
                    lastYawDeltaDegrees: lastYawDelta / DEGREES,
                    visible,
                    onScreen,
                    lost,
                    lastImpulse,
                },
                disc: (() => {
                    const { width, height } = cssSize();
                    const disc = discOnScreen({ left: 0, top: 0, width, height }, framing);
                    return { centerX: disc.x, centerY: disc.y, diameter: disc.diameter, settled: framingMove === null && !starting && !awaitingArrival };
                })(),
            };
        },
        stats() {
            const count = frameTimes.length;
            const mean = count === 0 ? 0 : frameTimes.reduce((sum, value) => sum + value, 0) / count;
            const worst = count === 0 ? 0 : [...frameTimes].sort((a, b) => a - b)[Math.max(0, Math.floor(count * 0.95) - 1)];
            return {
                framesPerSecond: mean === 0 ? 0 : 1000 / mean,
                frameMillisMean: mean,
                frameMillisWorst: worst,
                pixelRatio: pixelRatio(),
                canvasPixels: canvas ? canvas.width * canvas.height : 0,
            };
        },
        destroy() {
            if (destroyed)
                return;
            /* Whatever was awaiting a framing move is released before the globe goes: an opening must never be left pending. */
            finishFramingMove();
            destroyed = true;
            window.clearTimeout(contextLossTimer);
            cancelAnimationFrame(frameId);
            if (published !== '')
                window.dispatchEvent(new CustomEvent(AMBIENT_DISC_EVENT, { detail: null }));
            clearSun();
            clearMoon();
            delete container.dataset.ambientDisc;
            resizeObserver?.disconnect();
            intersection?.disconnect();
            perfObserver?.disconnect();
            reducedQuery?.removeEventListener?.('change', onReducedChange);
            document.removeEventListener('visibilitychange', onVisibility);
            renderer?.dispose();
            renderer = null;
            host.remove();
            delete container.dataset.ambientGlobeState;
            readyResolve();
        },
    };
    const begin = () => {
        starting = false;
        if (destroyed)
            return;
        if (options.forceFallback || !build())
            enterFallback();
        else {
            if (location)
                markerOpacity = 0;
            schedule();
        }
    };
    /* THE REAL EARTH FIRST. The one map file is awaited (a few hundred milliseconds cold, none when it was prefetched) so a
       planet is never drawn with the wrong land and then corrected; if it cannot be had within the wait, the hand-drawn one is. */
    if (options.forceFallback || options.realEarth === false || typeof Image !== 'function' || loadedEarthMap() !== null)
        begin();
    else {
        starting = true;
        void loadEarthMap().then(begin);
    }
    return session;
}
