/*
 * THE GLOBAL FOREGROUND PARTICLE LAYER
 * ------------------------------------
 * ONE canvas, owned by this module, mounted on <body> above the whole application. A field of floating luminous spores drifts
 * across it in THREE planes of depth - far, mid, near - all of them in front of the interface, ordered among themselves. The
 * interface disturbs them through a single event (impulseEvents.ts), and a scroll carries them. It exists to give the flat glass
 * of the app a volume to sit in and a living top layer.
 *
 * DRAW ORDER. One canvas, three passes in one loop: the pool is generated far, mid, near, and drawn in that order, so the near
 * plane is painted over the mid plane and the mid over the far - the same relationship the planes have to the viewer. There is no
 * second canvas to keep in step and no stacking to get wrong between the planes.
 *
 * WHY A CANVAS AND NOT DOM. The motes are 45 to 100 points that all move together and must be disturbed together. As DOM that
 * is a node per mote, each with a blur or box-shadow the compositor must rasterise at its own size, and a style write per node per
 * frame. As a canvas it is one surface, one clear and a handful of drawImage calls of pre-rendered sprites - no filter anywhere,
 * no node churn, and the whole field shares one clock and one impulse queue. The blur is the shape of the sprite's gradient,
 * painted once (particleSprites.ts).
 *
 * WHERE IT SITS. position: fixed on <body>, z-index 2147480000. #place-experience is an isolated stacking context, so a positive
 * z-index on a body child is above ALL of it - every card, the glass, the Earth, the Tarot detail dialog (9100), the profile
 * controls (9000) and the modal avatar editor (12000). Only the two QA debug overlays (z 2147483000+) are above it, and nothing in
 * the page uses the browser's top layer (no showModal, no popover). Inside the page, it is below all browser chrome.
 * pointer-events: none, aria-hidden, inert: it cannot be hit, focused or read.
 *
 * ONE LOOP. A single requestAnimationFrame chain, started only while there is something to show: it stops while the page is
 * hidden, while the layer is faded out (the opening sequence) and when destroyed, and restarts with its clock reset so a return
 * from the background is never a giant dt. Nothing in the frame reads the DOM: sizes come from resize events, the scene and the
 * constrained flag from an attribute observer, the tint from a table.
 */
import { INTENSITIES, edgeExtent, SCENE_TINTS, createField, enqueueImpulse, addScroll, mixRgb, parseTint, particleAlpha, particleScale, profileFor, profileTotal, sceneFor, stepField, wanted, } from './particleModel.js?v=d9f39e7';
import { IMPULSE_EVENT } from './impulseEvents.js?v=d9f39e7';
import { paintSprite, spriteKey } from './particleSprites.js?v=d9f39e7';
export const LAYER_ID = 'kt-ambient-particles';
export const LAYER_Z_INDEX = 2147480000;
/** A pressed key on the keyboard or a field resize this small is not a screen change. */
const KEYBOARD_HEIGHT_DROP = 120;
/** Impulses of one intensity arriving closer together than this are one press, not two. */
const IMPULSE_DEBOUNCE_MILLIS = 80;
/** The sprites are rebuilt at most this often while the tint eases. */
const TINT_REBUILD_MILLIS = 120;
/** A scroller that jumps further than this in one event was moved by the application (a screen opening at the top), not by a hand. */
const SCROLL_JUMP_IGNORE = 400;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
/** The diagnostic 'static' variant draws normally for this many seconds of the field's own clock, then freezes. */
const STATIC_AFTER_SECONDS = 8;
export function mountParticleLayer(env, options = {}) {
    const { window: win, document: doc } = env;
    const mode = options.mode ?? 'auto';
    if (mode === 'off')
        return null;
    /* Exactly one owner: a second mount returns nothing rather than a second surface. */
    if (doc.getElementById(LAYER_ID))
        return null;
    const body = doc.body;
    if (!body)
        return null;
    const host = doc.getElementById('place-experience');
    const field = createField(options.seed ?? 20261009);
    const canvas = doc.createElement('canvas');
    canvas.id = LAYER_ID;
    canvas.setAttribute('aria-hidden', 'true');
    canvas.setAttribute('role', 'presentation');
    canvas.setAttribute('data-qa', 'ambient-particles');
    canvas.inert = true;
    canvas.tabIndex = -1;
    const maybeContext = canvas.getContext('2d', { alpha: true });
    if (!maybeContext)
        return null;
    const ctx = maybeContext;
    const listeners = [];
    const listen = (target, type, handler, opts) => {
        target.addEventListener(type, handler, opts);
        listeners.push(() => target.removeEventListener(type, handler, opts));
    };
    /* ---- state ---- */
    let destroyed = false;
    let diagnosticFrozen = false;
    let hiddenPage = doc.visibilityState === 'hidden';
    let rafId = 0;
    let rafRequests = 0;
    let lastFrame = 0;
    let accumulated = 0;
    let framesDrawn = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let lastWidth = 0;
    let lastHeight = 0;
    let reducedMotion = false;
    let scene = 'earth';
    let tintTarget = SCENE_TINTS.earth;
    let tintNow = [...SCENE_TINTS.earth];
    let tintBuilt = SCENE_TINTS.earth;
    let tintBuiltAt = 0;
    let blurBuilt = 1;
    let visibility = 0;
    let visibilityTarget = 0;
    const lastImpulseAt = {};
    let stepMillis = 0;
    let drawMillis = 0;
    let measuredFrames = 0;
    const sprites = new Map();
    const isConstrained = () => {
        if (mode === 'constrained')
            return true;
        if (mode === 'full')
            return false;
        return host?.dataset.ktPerf === 'constrained' || doc.documentElement?.dataset.ktPerf === 'constrained';
    };
    const viewport = { width: 0, height: 0 };
    let profile = profileFor({ minSide: 400, width: 400, constrained: false, reducedMotion: false });
    const recomputeProfile = () => {
        profile = profileFor({
            minSide: Math.min(width, height) || 400,
            width: width || 400,
            constrained: isConstrained(),
            reducedMotion,
        });
        if (profile.blurScale !== blurBuilt) {
            sprites.clear();
            blurBuilt = profile.blurScale;
        }
        resizeBuffer();
        publishStatus();
    };
    /* ---- sizing: from events only ---- */
    const applySize = (nextWidth, nextHeight) => {
        width = nextWidth;
        height = nextHeight;
        viewport.width = width;
        viewport.height = height;
        lastWidth = width;
        lastHeight = height;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        resizeBuffer();
    };
    const resizeBuffer = () => {
        if (width <= 0 || height <= 0)
            return;
        /* A soft glow needs no more than 1.5 device pixels per CSS pixel, and the buffer is also capped in total pixels. */
        let ratio = Math.min(win.devicePixelRatio || 1, profile.dprCap);
        const maxPixels = 2_200_000;
        if (width * height * ratio * ratio > maxPixels)
            ratio = Math.sqrt(maxPixels / (width * height));
        const w = Math.max(1, Math.round(width * ratio));
        const h = Math.max(1, Math.round(height * ratio));
        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
        }
        dpr = ratio;
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const onResize = () => {
        const nextWidth = win.innerWidth;
        const nextHeight = win.innerHeight;
        if (!(nextWidth > 0 && nextHeight > 0))
            return;
        /* With interactive-widget=resizes-content the keyboard shrinks the layout viewport. The field does not follow it: same width,
           a height that dropped by a keyboard's worth is not a screen change, and rebuilding the buffer then would be a hitch on
           exactly the frame the keyboard needs to be smooth. */
        if (nextWidth === lastWidth && nextHeight < lastHeight && lastHeight - nextHeight > KEYBOARD_HEIGHT_DROP)
            return;
        if (nextWidth === lastWidth && nextHeight === lastHeight)
            return;
        applySize(nextWidth, nextHeight);
        recomputeProfile();
    };
    /* ---- scene, tint, constrained, intro: from attributes, when they change ---- */
    const readScene = () => {
        if (!host)
            return;
        scene = sceneFor(host.dataset);
        let target = SCENE_TINTS[scene];
        if (typeof win.getComputedStyle === 'function') {
            const published = parseTint(win.getComputedStyle(host).getPropertyValue('--kt-particle-tint'));
            if (published)
                target = published;
        }
        tintTarget = target;
        const intro = host.dataset.introState;
        visibilityTarget = intro === undefined || intro === 'complete' ? 1 : 0;
        recomputeProfile();
        ensureLoop();
    };
    const ObserverClass = win.MutationObserver;
    const observer = ObserverClass ? new ObserverClass(readScene) : null;
    if (observer && host) {
        observer.observe(host, { attributes: true, attributeFilter: ['data-pillar-stage', 'data-pillar-active', 'data-intro-state', 'data-kt-perf'] });
    }
    if (observer && doc.documentElement) {
        observer.observe(doc.documentElement, { attributes: true, attributeFilter: ['data-kt-perf'] });
    }
    const motion = typeof win.matchMedia === 'function' ? win.matchMedia(REDUCED_MOTION_QUERY) : null;
    const readReduced = () => options.ignoreReducedMotion !== true && motion?.matches === true;
    reducedMotion = readReduced();
    if (motion) {
        const onMotionChange = () => { reducedMotion = readReduced(); recomputeProfile(); };
        motion.addEventListener('change', onMotionChange);
        listeners.push(() => motion.removeEventListener('change', onMotionChange));
    }
    /* ---- sprites ---- */
    const tintKey = (rgb) => [Math.round(rgb[0] / 4) * 4, Math.round(rgb[1] / 4) * 4, Math.round(rgb[2] / 4) * 4];
    const spriteFor = (request) => {
        const key = spriteKey(request);
        let sprite = sprites.get(key);
        if (!sprite) {
            sprite = doc.createElement('canvas');
            paintSprite(sprite, request);
            sprites.set(key, sprite);
        }
        return sprite;
    };
    /* ---- impulses ---- */
    const applyImpulse = (request) => {
        if (destroyed || !INTENSITIES.includes(request.intensity))
            return;
        const stamp = performance.now();
        const previous = lastImpulseAt[request.intensity];
        if (previous !== undefined && stamp - previous < IMPULSE_DEBOUNCE_MILLIS)
            return;
        lastImpulseAt[request.intensity] = stamp;
        enqueueImpulse(field, request, viewport, profile);
        ensureLoop();
    };
    listen(doc, IMPULSE_EVENT, ((event) => {
        const detail = event.detail;
        if (detail && typeof detail === 'object')
            applyImpulse(detail);
    }));
    /*
     * SCROLL. One capture-phase passive listener sees every scroller in the application (scroll events do not bubble, but they do
     * capture), including the momentum after a finger lifts, which touchmove cannot see. It remembers each scroller's last scrollTop
     * and sends only the change; the handler does arithmetic and adds one number to the field, so a storm of events costs a
     * handful of additions and the frame consumes them once. It reads scrollTop of the element that has just scrolled, in the
     * event, never in the frame.
     */
    const scrollSeen = new WeakMap();
    listen(doc, 'scroll', ((event) => {
        const target = event.target;
        if (!target)
            return;
        const top = typeof target.scrollTop === 'number' ? target.scrollTop : target.scrollingElement?.scrollTop;
        if (typeof top !== 'number')
            return;
        const before = scrollSeen.get(target);
        scrollSeen.set(target, top);
        if (before === undefined)
            return;
        const delta = top - before;
        if (delta === 0 || Math.abs(delta) > SCROLL_JUMP_IGNORE)
            return;
        addScroll(field, delta);
    }), { capture: true, passive: true });
    listen(win, 'resize', onResize);
    listen(win, 'orientationchange', onResize);
    listen(doc, 'visibilitychange', (() => {
        hiddenPage = doc.visibilityState === 'hidden';
        if (hiddenPage)
            stopLoop();
        else {
            lastFrame = 0;
            accumulated = 0;
            ensureLoop();
        }
    }));
    /* ---- status for QA (written when something changes, never per frame) ---- */
    function publishStatus() {
        canvas.setAttribute('data-kt-particles', `${isConstrained() ? 'constrained' : 'full'} ${profileTotal(profile)} ${scene}${reducedMotion ? ' reduced' : ''}`);
    }
    /* ---- the loop ---- */
    const wantsLoop = () => !destroyed && !diagnosticFrozen && !hiddenPage && (visibility > 0.002 || visibilityTarget > 0);
    function stopLoop() {
        if (rafId)
            win.cancelAnimationFrame(rafId);
        rafId = 0;
    }
    function ensureLoop() {
        if (rafId || !wantsLoop())
            return;
        lastFrame = 0;
        accumulated = 0;
        rafRequests += 1;
        rafId = win.requestAnimationFrame(frame);
    }
    function frame(timestamp) {
        rafId = 0;
        if (!wantsLoop())
            return;
        rafRequests += 1;
        rafId = win.requestAnimationFrame(frame);
        const elapsed = lastFrame === 0 ? 0 : Math.min(0.1, (timestamp - lastFrame) / 1000);
        lastFrame = timestamp;
        accumulated += elapsed;
        /* The update ceiling is the profile's: 60 Hz (the display's own rate, every frame) normally, 30 Hz under reduced motion. The
           nearest plane drifts at up to ~80 px/s, so a lower rate would step it visibly; there is no idle drop. */
        if (accumulated < 1 / profile.fps - 0.002)
            return;
        const dt = accumulated;
        accumulated = 0;
        const t0 = options.measure ? performance.now() : 0;
        visibility += (visibilityTarget - visibility) * (1 - Math.exp(-dt / 0.9));
        if (visibilityTarget === 0 && visibility < 0.002)
            visibility = 0;
        easeTint(dt, timestamp);
        if (options.diagnostic !== 'loop')
            stepField(field, dt, viewport, profile);
        const t1 = options.measure ? performance.now() : 0;
        if (options.diagnostic === undefined || options.diagnostic === 'static')
            draw();
        if (options.diagnostic === 'static' && field.time > STATIC_AFTER_SECONDS)
            diagnosticFrozen = true;
        if (options.measure) {
            const t2 = performance.now();
            measuredFrames += 1;
            stepMillis += t1 - t0;
            drawMillis += t2 - t1;
        }
        framesDrawn += 1;
    }
    function easeTint(dt, timestamp) {
        const k = 1 - Math.exp(-dt / 0.8);
        tintNow = mixRgb(tintNow, tintTarget, k);
        const quantised = tintKey(tintNow);
        if ((quantised[0] !== tintBuilt[0] || quantised[1] !== tintBuilt[1] || quantised[2] !== tintBuilt[2])
            && timestamp - tintBuiltAt >= TINT_REBUILD_MILLIS) {
            tintBuilt = quantised;
            tintBuiltAt = timestamp;
            sprites.clear();
        }
    }
    /* Far, mid, near: the pool's own order (createField), so a nearer mote paints over a farther one. */
    function draw() {
        ctx.clearRect(0, 0, width, height);
        if (visibility <= 0.002)
            return;
        const time = field.time;
        for (const p of field.particles) {
            if (p.presence === 0)
                continue;
            const alpha = particleAlpha(p, time, profile) * visibility;
            if (alpha < 0.004)
                continue;
            const extent = (p.radius + edgeExtent(p, profile.blurScale)) * particleScale(p);
            const x = p.nx * width;
            const y = p.ny * height;
            if (x < -extent || x > width + extent || y < -extent || y > height + extent)
                continue;
            const sprite = spriteFor({
                depth: p.depth, base: p.base, soft: p.soft, tint: tintBuilt, blurScale: profile.blurScale,
            });
            ctx.globalAlpha = alpha;
            ctx.drawImage(sprite, x - extent, y - extent, extent * 2, extent * 2);
        }
        ctx.globalAlpha = 1;
    }
    /* ---- mount ---- */
    canvas.style.cssText = [
        'position:fixed', 'left:0', 'top:0', 'pointer-events:none', 'user-select:none', '-webkit-user-select:none',
        '-webkit-tap-highlight-color:transparent', `z-index:${LAYER_Z_INDEX}`, 'contain:strict', 'display:block',
    ].join(';');
    applySize(Math.max(1, win.innerWidth || 400), Math.max(1, win.innerHeight || 800));
    readScene();
    if (!host)
        visibilityTarget = 1;
    tintNow = [...tintTarget];
    tintBuilt = tintKey(tintNow);
    body.append(canvas);
    publishStatus();
    ensureLoop();
    let forcedInterval = null;
    let forcedFirst = null;
    if (options.forcedImpulse) {
        const forced = options.forcedImpulse;
        const fire = () => applyImpulse({ intensity: forced });
        forcedInterval = win.setInterval(fire, 4000);
        forcedFirst = win.setTimeout(fire, 1500);
    }
    return {
        element: canvas,
        impulse: applyImpulse,
        snapshot() {
            const byDepth = { far: 0, mid: 0, near: 0 };
            let active = 0;
            for (const p of field.particles) {
                if (p.presence > 0.5 && wanted(p, profile)) {
                    byDepth[p.depth] += 1;
                    active += 1;
                }
            }
            return {
                mode, constrained: isConstrained(), reducedMotion, scene, tint: [...tintNow], profile, active, byDepth,
                visible: visibility > 0.5, framesDrawn, fieldTime: field.time, loopsRunning: rafId ? 1 : 0, rafRequests, listeners: listeners.length,
                size: { width, height, dpr },
                stepMillisAverage: measuredFrames ? stepMillis / measuredFrames : 0,
                drawMillisAverage: measuredFrames ? drawMillis / measuredFrames : 0,
                motes: field.particles.filter((p) => p.presence > 0.05 && wanted(p, profile)).map((p) => ({
                    id: `${p.depth}:${p.slot}`, depth: p.depth, x: p.nx * width, y: p.ny * height, alpha: particleAlpha(p, field.time, profile) * visibility,
                    radius: p.radius, speed: Math.hypot(p.ix, p.iy), vx: p.ix, vy: p.iy,
                })),
            };
        },
        destroy() {
            if (destroyed)
                return;
            destroyed = true;
            stopLoop();
            if (forcedInterval !== null)
                win.clearInterval(forcedInterval);
            if (forcedFirst !== null)
                win.clearTimeout(forcedFirst);
            for (const remove of listeners.splice(0))
                remove();
            observer?.disconnect();
            sprites.clear();
            canvas.remove();
        },
    };
}
