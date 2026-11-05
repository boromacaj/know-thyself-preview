import { BACKDROP_GLOWS, BANDS, MOON_HOLE, SUN_HOLE, WAVE_TILE_WIDTH, bandPlacement, premultipliedStops, ripplePose, } from './haloMath.js?v=d9a1a90';
/*
 * THE HALO ON TWO CANVASES.
 *
 * The halo is the soft light round the Earth: the ambient backdrop (two glows, two bands of rising wave lines, and the cut-outs where the Moon and the Sun pass) and the ripple
 * field that turns and travels round the planet. Drawn as DOM it was a dozen full-screen layers and render passes - a mask on each wave band, a mask on the Moon's hole, one on the
 * Sun's, one on the ripple frame, an opacity group on the ring - every one of them re-composited by the GPU on every frame, because every one of them moves. On the Galaxy A55 a
 * frame's draw cost 29 ms, of which twelve render passes were the larger part, and hiding the halo alone took the menu from 34 to 60 frames a second.
 *
 * Here the same picture is drawn in ONE pass each: the backdrop on one canvas (glows, wave bands with their fade, the holes), the ripple field on another (the field, the hole). A
 * canvas is one texture, composited as one quad. The two canvases are redrawn together, on one shared clock (haloClock), at a rate at which no line moves by more than a device pixel
 * between draws (the fastest thing in the halo is the ripple field's turn, 26 device px a second).
 *
 * THE DOM HALO IS STILL THERE: localStorage kt-halo = dom puts it back (reload), for comparison on a device and as the reference of the equivalence audit.
 */
export const HALO_STORAGE_KEY = 'kt-halo';
/** Whether the halo is drawn on canvases: on unless the person (or a test) asked for the DOM halo, and only where a 2D canvas exists. */
export function haloOnCanvas() {
    try {
        if (typeof window !== 'undefined' && window.localStorage?.getItem(HALO_STORAGE_KEY) === 'dom')
            return false;
    }
    catch { /* storage blocked: the default */ }
    if (typeof document === 'undefined')
        return false;
    try {
        return document.createElement('canvas').getContext('2d') !== null;
    }
    catch {
        return false;
    }
}
/* ------------------------------------------------------------------------------------------------- the shared clock */
/** Draw rate of the halo, per second. Every line in it moves by less than a device pixel between draws at 30 (the ripple field's turn, the fastest, is 26 device px a second). */
export function haloRate() {
    try {
        const wanted = Number(window.localStorage?.getItem('kt-halo-hz'));
        if (Number.isFinite(wanted) && wanted >= 10 && wanted <= 60)
            return wanted;
    }
    catch { /* the default */ }
    return 30;
}
export function createHaloClock(options = {}) {
    const draws = new Map();
    const cost = new Map();
    const origin = performance.now();
    const interval = 1000 / (options.rate ?? haloRate());
    const motion = options.motion ?? (() => true);
    let frame = 0;
    let last = Number.NEGATIVE_INFINITY;
    let dirty = true;
    let held = false;
    const tick = (now) => {
        frame = 0;
        if (draws.size === 0 || held)
            return;
        if (document.visibilityState === 'hidden') {
            schedule();
            return;
        }
        if (dirty || (motion() && now - last >= interval - 3)) {
            last = now;
            dirty = false;
            const seconds = (now - origin) / 1000;
            for (const [draw, label] of draws) {
                const began = performance.now();
                draw(seconds);
                const spent = performance.now() - began;
                cost.set(label, (cost.get(label) ?? spent) * 0.9 + spent * 0.1);
            }
        }
        /* with the motion switched off nothing is drawn but on invalidation, and no frame is asked for in between */
        if (motion())
            schedule();
    };
    const schedule = () => { if (frame === 0)
        frame = requestAnimationFrame(tick); };
    return {
        add(draw, label = 'draw') {
            draws.set(draw, label);
            dirty = true;
            schedule();
            return () => { draws.delete(draw); };
        },
        invalidate() { dirty = true; schedule(); },
        hold(on) { held = on; if (!on) {
            dirty = true;
            schedule();
        } },
        drawAt(seconds) { for (const draw of draws.keys())
            draw(seconds); },
        timings() { return Object.fromEntries([...cost].map(([label, ms]) => [label, +ms.toFixed(2)])); },
    };
}
let shared = null;
/** The one clock both canvases are drawn on, so that their updates fall on the same frames (and the frames between them cost the compositor nothing of the halo). */
export function sharedHaloClock() {
    if (shared === null) {
        const reduced = typeof window !== 'undefined' && typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
        shared = createHaloClock({ motion: () => !(reduced?.matches ?? false) });
        /* a handle for the QA audits (scripts/qa/haloEquivalenceAudit.mjs); nothing in the application reads it */
        globalThis.__ktHaloClock = shared;
    }
    return shared;
}
/** True while the person has asked for less motion: the halo is then drawn still, as the CSS parked it. */
export function haloMotion() {
    return !(typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}
/* ------------------------------------------------------------------------------------------------- helpers */
const rgba = (stop) => `rgba(${Math.round(stop.r)},${Math.round(stop.g)},${Math.round(stop.b)},${stop.a.toFixed(5)})`;
const cache = new WeakMap();
const dense = (stops) => {
    let out = cache.get(stops);
    if (!out) {
        out = premultipliedStops(stops);
        cache.set(stops, out);
    }
    return out;
};
/** Fills the whole `width` x `height` with an elliptical gradient centred at (cx, cy) with radii (rx, ry): `colour` turns a stop's alpha into a colour. */
function fillEllipse(ctx, width, height, cx, cy, rx, ry, stops) {
    if (!(rx > 0) || !(ry > 0))
        return;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(1, ry / rx);
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
    for (const stop of stops)
        gradient.addColorStop(Math.min(1, Math.max(0, stop.at)), stop.colour);
    ctx.fillStyle = gradient;
    ctx.fillRect(-cx, (-cy * rx) / ry, width, (height * rx) / ry);
    ctx.restore();
}
/** Takes alpha OUT of what is already drawn, in an ellipse: `hole` is the alpha removed at a share of the radius (1 = gone). */
function cutEllipse(ctx, width, height, cx, cy, rx, ry, hole) {
    ctx.globalCompositeOperation = 'destination-out';
    fillEllipse(ctx, width, height, cx, cy, rx, ry, hole.map(([at, alpha]) => ({ at, colour: `rgba(0,0,0,${alpha})` })));
    ctx.globalCompositeOperation = 'source-over';
}
const loadImage = (url) => new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = url;
});
/** The `src` of a CSS `url("...")` value the module builds. */
export const urlOf = (cssUrl) => cssUrl.replace(/^url\("/, '').replace(/"\)$/, '');
const makeCanvas = (width, height) => {
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(width));
    canvas.height = Math.max(1, Math.round(height));
    return canvas;
};
export function createBackdropRenderer(canvas, tileUrls) {
    const ctx = canvas.getContext('2d');
    const bands = BANDS.map((spec) => ({ spec, image: null, tile: null, pattern: null, tileHeight: 0, layer: makeCanvas(1, 1) }));
    const ready = Promise.all(bands.map(async (band) => { band.image = await loadImage(urlOf(spec(band).which === 'bottom' ? tileUrls.bottom : tileUrls.top)); })).then(() => undefined);
    function spec(band) { return band.spec; }
    let sized = '';
    const fit = (state) => {
        const key = `${state.width}x${state.height}@${state.dpr}:${state.motion}`;
        if (key === sized)
            return;
        sized = key;
        canvas.width = Math.max(1, Math.round(state.width * state.dpr));
        canvas.height = Math.max(1, Math.round(state.height * state.dpr));
        for (const band of bands) {
            const bandHeight = band.spec.height * state.height;
            band.layer.width = Math.max(1, Math.round(state.width * state.dpr));
            band.layer.height = Math.max(1, Math.round(bandHeight * state.dpr));
            const placement = bandPlacement(band.spec, bandHeight, 0, state.motion);
            band.tileHeight = placement.tileHeight;
            band.tile = null;
            band.pattern = null;
        }
    };
    const tileFor = (band, dpr) => {
        if (band.pattern)
            return band.pattern;
        if (!band.image)
            return null;
        const tile = makeCanvas(WAVE_TILE_WIDTH * dpr, band.tileHeight * dpr);
        const tctx = tile.getContext('2d');
        tctx.drawImage(band.image, 0, 0, tile.width, tile.height);
        const pattern = band.layer.getContext('2d').createPattern(tile, 'repeat');
        pattern?.setTransform(new DOMMatrix([1 / dpr, 0, 0, 1 / dpr, 0, 0]));
        band.tile = tile;
        band.pattern = pattern;
        return pattern;
    };
    const glowStops = (glow) => dense(glow.stops).map((stop) => ({ at: stop.at, colour: rgba(stop) }));
    const glows = BACKDROP_GLOWS.map(glowStops);
    return {
        ready,
        draw(state) {
            fit(state);
            const { width, height, dpr } = state;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 1;
            ctx.clearRect(0, 0, width, height);
            /* QA only (scripts/qa/haloEquivalenceAudit.mjs part=glow|bands): which half is drawn */
            const debug = globalThis.__ktHaloDebug;
            if (!debug?.noGlow)
                BACKDROP_GLOWS.forEach((glow, index) => fillEllipse(ctx, width, height, glow.cx * width, glow.cy * height, glow.rx * width, glow.ry * height, glows[index]));
            if (!debug?.noBands)
                for (const band of bands) {
                    const pattern = tileFor(band, dpr);
                    if (!pattern)
                        continue;
                    const bandHeight = band.spec.height * height;
                    const place = bandPlacement(band.spec, bandHeight, state.seconds, state.motion);
                    const bctx = band.layer.getContext('2d');
                    bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                    bctx.globalCompositeOperation = 'source-over';
                    bctx.clearRect(0, 0, width, bandHeight);
                    bctx.save();
                    bctx.translate(place.layerX, place.layerY);
                    bctx.fillStyle = pattern;
                    bctx.fillRect(0, 0, width + WAVE_TILE_WIDTH, place.layerHeight);
                    bctx.restore();
                    /* the fade, stationary: alpha along the band from the edge it hangs from */
                    bctx.globalCompositeOperation = 'destination-in';
                    const gradient = band.spec.which === 'bottom' ? bctx.createLinearGradient(0, bandHeight, 0, 0) : bctx.createLinearGradient(0, 0, 0, bandHeight);
                    for (const [at, alpha] of band.spec.fade)
                        gradient.addColorStop(at, `rgba(0,0,0,${alpha})`);
                    bctx.fillStyle = gradient;
                    bctx.fillRect(0, 0, width, bandHeight);
                    bctx.globalCompositeOperation = 'source-over';
                    ctx.drawImage(band.layer, 0, band.spec.which === 'bottom' ? height - bandHeight : 0, width, bandHeight);
                }
            if (state.moon)
                cutEllipse(ctx, width, height, state.moon.x * width, state.moon.y * height, state.moon.rx * width, state.moon.ry * height, MOON_HOLE);
            if (state.sun)
                cutEllipse(ctx, width, height, state.sun.x * width, state.sun.y * height, state.sun.rx * width, state.sun.ry * height, SUN_HOLE);
        },
    };
}
/** The frame the field lives in is 2.2 Earth diameters across (the field's own box is 2 and it travels out by under 4 %). */
export const RIPPLE_FRAME_DIAMETERS = 2.2;
export function createRippleRenderer(canvas, fieldUrl) {
    const ctx = canvas.getContext('2d');
    let image = null;
    const ready = loadImage(urlOf(fieldUrl)).then((loaded) => { image = loaded; });
    let texture = null;
    let sized = '';
    return {
        ready,
        draw(state) {
            if (!image)
                return;
            const { diameter, dpr } = state;
            if (!(diameter > 0))
                return;
            const frame = Math.round(diameter * RIPPLE_FRAME_DIAMETERS * dpr);
            const field = Math.round(diameter * 2 * dpr);
            const key = `${frame}:${field}`;
            if (key !== sized) {
                sized = key;
                canvas.width = frame;
                canvas.height = frame;
                texture = makeCanvas(field, field);
                texture.getContext('2d').drawImage(image, 0, 0, field, field);
            }
            if (!texture)
                return;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.globalCompositeOperation = 'source-over';
            ctx.clearRect(0, 0, frame, frame);
            const pose = ripplePose(state.seconds, state.motion);
            ctx.save();
            ctx.translate(frame / 2, frame / 2);
            ctx.scale(pose.scale, pose.scale);
            ctx.rotate(pose.turns * Math.PI * 2);
            ctx.drawImage(texture, -field / 2, -field / 2);
            ctx.restore();
            if (state.cut) {
                const r = state.cut.r * dpr;
                cutEllipse(ctx, frame, frame, frame / 2 + state.cut.cx * dpr, frame / 2 + state.cut.cy * dpr, r, r, MOON_HOLE);
            }
        },
    };
}
