import { sharedHaloClock, haloMotion } from './haloCanvas.js?v=d9a1a90';
import { cubicBezier } from './haloMath.js?v=d9a1a90';
/*
 * THE MENU'S LINE ART, DRAWN ON ONE CANVAS EACH INSTEAD OF AS HUNDREDS OF REPAINTED SVG ELEMENTS.
 *
 * The four pillar glyphs and the Synthesis traces are SVG: paths and circles whose dash is drawn on and whose opacity fades, by CSS animations. The browser can not move those on its
 * compositor (a dash offset is paint), so every frame in which one of them changed it re-rastered the tile under it into a NEW GPU buffer - about 4 ms of the GPU thread each, a dozen tiles
 * a frame at the busiest: on the Galaxy A55 this, after the halo had been dealt with, was what held the main menu at 38 frames a second (hiding the artwork alone: 70).
 *
 * WHAT THIS DOES. The SVG stays where it is, with its CSS animations and its timing untouched - it is the SOURCE: hidden (`visibility: hidden`: never painted, never rastered, no layer), it is
 * still styled and animated by the browser, and a canvas drawn over it in the same box MIRRORS it: the same paths, the same stroke, dash and caps, the values the animations have at
 * that moment, read from the computed style of the shapes that are moving. A canvas is one texture, repainted in one pass, whatever it draws.
 *
 * WHAT IT WILL NOT DO. It mirrors only what it can reproduce exactly: shapes (path, circle, ellipse, line, rect, polyline, polygon) painted with flat colours, whose animations touch only
 * opacity, stroke-opacity, fill-opacity and stroke-dashoffset, in an svg that has no mask, clip-path, filter, gradient, text, use or image and that is laid out with the default aspect
 * ratio. Anything else - the Bazi glyph's masks, the Synthesis card's turning leaves, the Connections heart - is left exactly as it was, painted by the browser. (A group that fades with
 * more than one shape in it is drawn as a group, on a canvas of its own, and composited with the group's opacity: the overlap of its shapes is the same as the browser's.)
 *
 * OFF BY DEFAULT: measured on the A55 with the halo already on a canvas, the mirror gave no gain (halo canvas + DOM art 39.8 fps, halo canvas + mirror 35.3, same noise band), so the DOM art stays the shipped
 * path. localStorage kt-art = canvas turns the mirror on (reload); it is kept, tested and audited for the day the art is the bottleneck.
 */
const SHAPE_SELECTOR = 'path,circle,ellipse,line,rect,polyline,polygon';
const UNSUPPORTED_SELECTOR = 'mask,clipPath,filter,use,linearGradient,radialGradient,pattern,text,tspan,image,foreignObject,marker,symbol,switch,a';
const MIRRORED_PROPERTIES = new Set(['opacity', 'strokeOpacity', 'fillOpacity', 'strokeDashoffset']);
export function artOnCanvas() {
    try {
        if (typeof window !== 'undefined' && window.localStorage?.getItem('kt-art') === 'canvas')
            return typeof document !== 'undefined';
    }
    catch { /* default */ }
    return false;
}
/* ------------------------------------------------------------------------------------------------- pure helpers */
/** The viewBox -> box mapping of an svg with the default aspect ratio (xMidYMid meet), as [scale, translateX, translateY]. */
export function viewBoxMapping(viewBox, width, height) {
    if (viewBox === null)
        return [1, 0, 0];
    const [x, y, w, h] = viewBox;
    if (!(w > 0) || !(h > 0))
        return [1, 0, 0];
    const scale = Math.min(width / w, height / h);
    return [scale, (width - w * scale) / 2 - x * scale, (height - h * scale) / 2 - y * scale];
}
/** A computed stroke-dasharray ("1px, 3px", "none") as numbers, scaled by `k` (the pathLength factor), or null for none. */
export function dashArray(computed, k) {
    const text = computed.trim();
    if (text === '' || text === 'none')
        return null;
    const values = text.split(/[\s,]+/).map((part) => Number.parseFloat(part) * k);
    if (values.length === 0 || values.some((value) => !Number.isFinite(value) || value < 0))
        return null;
    if (values.every((value) => value === 0))
        return null;
    return values;
}
/** Points as the polyline/polygon attribute gives them. */
export function pointsOf(text) {
    return text.trim().split(/[\s,]+/).map(Number).filter((value) => Number.isFinite(value));
}
/** A CSS timing function as a function of the progress of one keyframe interval, or null for one this does not know. */
export function easingOf(text) {
    const value = text.trim();
    if (value === 'linear' || value === '')
        return (x) => x;
    const named = { ease: [0.25, 0.1, 0.25, 1], 'ease-in': [0.42, 0, 1, 1], 'ease-out': [0, 0, 0.58, 1], 'ease-in-out': [0.42, 0, 0.58, 1] };
    const curve = named[value];
    if (curve)
        return cubicBezier(curve[0], curve[1], curve[2], curve[3]);
    const match = /^cubic-bezier\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)$/.exec(value);
    if (match)
        return cubicBezier(Number(match[1]), Number(match[2]), Number(match[3]), Number(match[4]));
    return null;
}
/** The value of a numeric keyframe track at a progress (0..1): the interval it falls in, eased by that interval's own timing function. */
export function trackValue(track, progress) {
    const { offsets, values, easings } = track;
    const last = offsets.length - 1;
    if (progress <= offsets[0])
        return values[0];
    if (progress >= offsets[last])
        return values[last];
    let index = 0;
    while (index < last - 1 && progress >= offsets[index + 1])
        index += 1;
    const from = offsets[index];
    const to = offsets[index + 1];
    const span = to - from;
    const eased = span > 0 ? easings[index]((progress - from) / span) : 1;
    return values[index] + (values[index + 1] - values[index]) * eased;
}
/** The directed progress of an infinite CSS animation at `currentTime` ms (the animation's own clock, delay included), before any keyframe's timing function. */
export function cycleProgress(currentTime, duration, delay, direction) {
    const local = currentTime - delay;
    if (local <= 0)
        return direction === 'reverse' || direction === 'alternate-reverse' ? 1 : 0;
    const cycles = local / duration;
    const iteration = Math.floor(cycles);
    const fraction = cycles - iteration;
    const backward = direction === 'reverse' || (direction === 'alternate' && iteration % 2 === 1) || (direction === 'alternate-reverse' && iteration % 2 === 0);
    return backward ? 1 - fraction : fraction;
}
/** Numbers out of a keyframe's value ("0.4", "12.5px", 0.4), or NaN. */
const numberOf = (value) => (typeof value === 'number' ? value : Number.parseFloat(String(value)));
/** An animation read once into tracks the mirror can evaluate itself, or null (finite, an easing it does not know, a keyframe it cannot read, an implicit start or end): then the browser is asked. */
export function trackAnimation(animation) {
    const effect = animation.effect;
    if (!effect || typeof effect.getKeyframes !== 'function')
        return null;
    const timing = effect.getTiming();
    if (timing.iterations !== Number.POSITIVE_INFINITY || typeof timing.duration !== 'number' || !(timing.duration > 0) || animation.playbackRate !== 1)
        return null;
    if ((timing.iterationStart ?? 0) !== 0 || (timing.easing ?? 'linear') !== 'linear' || (timing.endDelay ?? 0) !== 0)
        return null;
    const frames = effect.getKeyframes();
    if (frames.length < 2)
        return null;
    const first = frames[0];
    const last = frames[frames.length - 1];
    if (Number(first.computedOffset) !== 0 || Number(last.computedOffset) !== 1)
        return null;
    const properties = new Set();
    for (const frame of frames)
        for (const key of Object.keys(frame))
            if (MIRRORED_PROPERTIES.has(key))
                properties.add(key);
    const tracks = {};
    for (const property of properties) {
        const offsets = [];
        const values = [];
        const easings = [];
        for (const frame of frames) {
            if (!(property in frame))
                return null;
            const value = numberOf(frame[property]);
            const easing = easingOf(String(frame.easing ?? 'linear'));
            if (!Number.isFinite(value) || easing === null)
                return null;
            offsets.push(Number(frame.computedOffset));
            values.push(value);
            easings.push(easing);
        }
        tracks[property] = { offsets, values, easings };
    }
    return { animation, duration: timing.duration, delay: timing.delay ?? 0, direction: timing.direction ?? 'normal', tracks, wasRunning: true };
}
const colour = (value) => (value === 'none' || value === '' ? null : value);
function pathFor(el) {
    const num = (name) => Number.parseFloat(el.getAttribute(name) ?? '0') || 0;
    switch (el.tagName.toLowerCase()) {
        case 'path': return new Path2D(el.getAttribute('d') ?? '');
        case 'circle': {
            const path = new Path2D();
            path.arc(num('cx'), num('cy'), num('r'), 0, Math.PI * 2);
            return path;
        }
        case 'ellipse': {
            const path = new Path2D();
            path.ellipse(num('cx'), num('cy'), num('rx'), num('ry'), 0, 0, Math.PI * 2);
            return path;
        }
        case 'line': {
            const path = new Path2D();
            path.moveTo(num('x1'), num('y1'));
            path.lineTo(num('x2'), num('y2'));
            return path;
        }
        case 'rect': {
            const path = new Path2D();
            const rx = num('rx');
            const ry = num('ry') || rx;
            if (rx > 0)
                path.roundRect(num('x'), num('y'), num('width'), num('height'), [Math.min(rx, ry)]);
            else
                path.rect(num('x'), num('y'), num('width'), num('height'));
            return path;
        }
        case 'polyline':
        case 'polygon': {
            const points = pointsOf(el.getAttribute('points') ?? '');
            if (points.length < 4)
                return new Path2D();
            const path = new Path2D();
            path.moveTo(points[0], points[1]);
            for (let index = 2; index + 1 < points.length; index += 2)
                path.lineTo(points[index], points[index + 1]);
            if (el.tagName.toLowerCase() === 'polygon')
                path.closePath();
            return path;
        }
        default: return null;
    }
}
/** Whether an svg is one the mirror can reproduce exactly (see the header). */
export function mirrorable(svg) {
    if (svg.querySelector(UNSUPPORTED_SELECTOR) !== null)
        return false;
    const aspect = svg.getAttribute('preserveAspectRatio');
    if (aspect !== null && aspect !== 'xMidYMid meet' && aspect !== 'xMidYMid')
        return false;
    for (const animation of svg.getAnimations({ subtree: true })) {
        const effect = animation.effect;
        if (!effect || typeof effect.getKeyframes !== 'function')
            return false;
        for (const frame of effect.getKeyframes()) {
            for (const key of Object.keys(frame)) {
                if (key === 'offset' || key === 'easing' || key === 'composite' || key === 'computedOffset')
                    continue;
                if (!MIRRORED_PROPERTIES.has(key))
                    return false;
            }
        }
    }
    for (const el of svg.querySelectorAll('*')) {
        const tag = el.tagName.toLowerCase();
        if (tag === 'style' || tag === 'g' || tag === 'title' || tag === 'desc' || tag === 'defs')
            continue;
        if (!el.matches(SHAPE_SELECTOR))
            return false;
        const style = getComputedStyle(el);
        if (style.mask !== 'none' || style.clipPath !== 'none' || style.filter !== 'none' || style.mixBlendMode !== 'normal' || style.vectorEffect !== 'none')
            return false;
        if (/url\(/.test(style.fill) || /url\(/.test(style.stroke))
            return false;
        if (style.transform !== 'none' && el.getAttribute('transform') === null)
            return false;
    }
    for (const group of svg.querySelectorAll('g')) {
        const style = getComputedStyle(group);
        if (style.mask !== 'none' || style.clipPath !== 'none' || style.filter !== 'none' || style.mixBlendMode !== 'normal')
            return false;
    }
    return true;
}
export function mirrorSvg(svg) {
    const parent = svg.parentElement;
    if (parent === null || !mirrorable(svg))
        return null;
    const parentStyle = getComputedStyle(parent);
    const svgStyle = getComputedStyle(svg);
    if (parentStyle.position === 'static' && svgStyle.position === 'static')
        return null;
    const canvas = document.createElement('canvas');
    canvas.className = 'kt-art-mirror';
    canvas.setAttribute('aria-hidden', 'true');
    let stale = true;
    let root = null;
    let widthCss = 0;
    let heightCss = 0;
    let dpr = 1;
    const animationsOf = (el) => el.getAnimations();
    /** tracks for what can be evaluated by arithmetic, and whether any of the animations has to be asked of the browser instead */
    const trackAll = (list) => {
        const tracked = [];
        let asked = false;
        for (const animation of list) {
            const t = trackAnimation(animation);
            if (t === null)
                asked = true;
            else
                tracked.push(t);
        }
        return [tracked, asked];
    };
    const collect = () => {
        stale = false;
        widthCss = svg.clientWidth;
        heightCss = svg.clientHeight;
        dpr = window.devicePixelRatio || 1;
        canvas.width = Math.max(1, Math.round(widthCss * dpr));
        canvas.height = Math.max(1, Math.round(heightCss * dpr));
        if (svgStyle.position === 'static') {
            canvas.style.cssText = `position:absolute;left:${svg.getBoundingClientRect().left - parent.getBoundingClientRect().left - parent.clientLeft}px;top:${svg.getBoundingClientRect().top - parent.getBoundingClientRect().top - parent.clientTop}px;width:${widthCss}px;height:${heightCss}px;pointer-events:none;display:block`;
        }
        else {
            canvas.style.cssText = `position:absolute;left:${svgStyle.left};top:${svgStyle.top};right:${svgStyle.right};bottom:${svgStyle.bottom};width:${widthCss}px;height:${heightCss}px;pointer-events:none;display:block`;
        }
        const vb = svg.viewBox.baseVal;
        const mapping = viewBoxMapping(svg.hasAttribute('viewBox') ? [vb.x, vb.y, vb.width, vb.height] : null, widthCss, heightCss);
        const toBox = new DOMMatrix([mapping[0], 0, 0, mapping[0], mapping[1], mapping[2]]);
        const svgScreen = svg.getScreenCTM();
        const inverse = svgScreen ? svgScreen.inverse() : new DOMMatrix();
        const build = (el) => {
            const nodes = [];
            for (const child of Array.from(el.children)) {
                if (!(child instanceof SVGElement))
                    continue;
                const tag = child.tagName.toLowerCase();
                if (tag === 'g') {
                    const style = getComputedStyle(child);
                    const own = animationsOf(child);
                    const [tracked, asked] = trackAll(own);
                    const group = { kind: 'group', el: child, children: build(child), opacity: Number.parseFloat(style.opacity), animated: own.length > 0, animations: own, tracked, asked };
                    nodes.push(group);
                }
                else if (child.matches(SHAPE_SELECTOR)) {
                    const path = pathFor(child);
                    if (path === null)
                        continue;
                    const own = animationsOf(child);
                    const [tracked, asked] = trackAll(own);
                    const style = getComputedStyle(child);
                    const screen = child.getScreenCTM();
                    const matrix = toBox.multiply(inverse.multiply(screen ?? new DOMMatrix()));
                    const pathLength = Number.parseFloat(child.getAttribute('pathLength') ?? '');
                    const length = typeof child.getTotalLength === 'function' ? child.getTotalLength() : 0;
                    const k = Number.isFinite(pathLength) && pathLength > 0 && length > 0 ? length / pathLength : 1;
                    const stroke = colour(style.stroke);
                    const strokeWidth = Number.parseFloat(style.strokeWidth) || 0;
                    nodes.push({
                        kind: 'shape', el: child, path, matrix, k,
                        paint: {
                            stroke: stroke !== null && strokeWidth > 0 ? stroke : null, fill: colour(style.fill), width: strokeWidth,
                            cap: style.strokeLinecap, join: style.strokeLinejoin, miter: Number.parseFloat(style.strokeMiterlimit) || 4,
                            dash: dashArray(style.strokeDasharray, k), fillRule: style.fillRule === 'evenodd' ? 'evenodd' : 'nonzero',
                        },
                        opacity: Number.parseFloat(style.opacity), strokeOpacity: Number.parseFloat(style.strokeOpacity), fillOpacity: Number.parseFloat(style.fillOpacity),
                        dashOffset: (Number.parseFloat(style.strokeDashoffset) || 0) * k, animated: own.length > 0, animations: own, tracked, asked,
                    });
                }
            }
            return nodes;
        };
        root = { kind: 'group', el: svg, children: build(svg), opacity: 1, animated: false, animations: [], tracked: [], asked: false };
        everyAnimation = svg.getAnimations({ subtree: true });
    };
    let everyAnimation = [];
    const running = (node) => node.animations.some((animation) => animation.playState === 'running');
    /** Evaluates the tracked animations of a node into its fields: by arithmetic on the animation's own clock, with no question put to the style system. */
    const evaluate = (node, force) => {
        let any = false;
        for (const t of node.tracked) {
            const running = t.animation.playState === 'running';
            if (!force && !running && !t.wasRunning)
                continue;
            t.wasRunning = running;
            any = true;
            const time = Number(t.animation.currentTime ?? 0);
            const progress = cycleProgress(time, t.duration, t.delay, t.direction);
            for (const [property, track] of Object.entries(t.tracks)) {
                const value = trackValue(track, progress);
                if (node.kind === 'group') {
                    if (property === 'opacity')
                        node.opacity = value;
                    continue;
                }
                if (property === 'opacity')
                    node.opacity = value;
                else if (property === 'strokeOpacity')
                    node.strokeOpacity = value;
                else if (property === 'fillOpacity')
                    node.fillOpacity = value;
                else if (property === 'strokeDashoffset')
                    node.dashOffset = value * node.k;
            }
        }
        return any;
    };
    /** Reads what the animations show now, for the nodes that are moving (a node at rest keeps what it had). */
    const read = (node, force) => {
        evaluate(node, force);
        if (node.asked && node.animated && (force || running(node))) {
            const style = getComputedStyle(node.el);
            if (node.kind === 'group')
                node.opacity = Number.parseFloat(style.opacity);
            else {
                node.opacity = Number.parseFloat(style.opacity);
                node.strokeOpacity = Number.parseFloat(style.strokeOpacity);
                node.fillOpacity = Number.parseFloat(style.fillOpacity);
                node.dashOffset = (Number.parseFloat(style.strokeDashoffset) || 0) * node.k;
            }
        }
        if (node.kind === 'group')
            for (const child of node.children)
                read(child, force);
    };
    const anyMoving = () => everyAnimation.some((animation) => animation.playState === 'running');
    const paintShape = (ctx, node, alpha) => {
        const m = node.matrix;
        ctx.setTransform(dpr * m.a, dpr * m.b, dpr * m.c, dpr * m.d, dpr * m.e, dpr * m.f);
        const own = alpha * node.opacity;
        if (node.paint.fill !== null) {
            const a = own * node.fillOpacity;
            if (a > 0.002) {
                ctx.globalAlpha = a;
                ctx.fillStyle = node.paint.fill;
                ctx.fill(node.path, node.paint.fillRule);
            }
        }
        if (node.paint.stroke !== null) {
            const a = own * node.strokeOpacity;
            if (a > 0.002) {
                ctx.globalAlpha = a;
                ctx.strokeStyle = node.paint.stroke;
                ctx.lineWidth = node.paint.width;
                ctx.lineCap = node.paint.cap;
                ctx.lineJoin = node.paint.join;
                ctx.miterLimit = node.paint.miter;
                ctx.setLineDash(node.paint.dash ? [...node.paint.dash] : []);
                ctx.lineDashOffset = node.dashOffset;
                ctx.stroke(node.path);
            }
        }
    };
    let layer = null;
    const countShapes = (node) => (node.kind === 'shape' ? 1 : node.children.reduce((sum, child) => sum + countShapes(child), 0));
    const paintGroup = (ctx, group, alpha) => {
        if (group.opacity < 0.002)
            return;
        if (group.opacity < 0.998 && countShapes(group) > 1) {
            /* a faded group of several shapes is composited as a group, as the browser does: its shapes are drawn at full strength on a layer and the layer is blended once */
            if (layer === null)
                layer = document.createElement('canvas');
            if (layer.width !== canvas.width || layer.height !== canvas.height) {
                layer.width = canvas.width;
                layer.height = canvas.height;
            }
            const lctx = layer.getContext('2d');
            lctx.setTransform(1, 0, 0, 1, 0, 0);
            lctx.globalAlpha = 1;
            lctx.clearRect(0, 0, layer.width, layer.height);
            for (const child of group.children)
                paintNode(lctx, child, 1);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.globalAlpha = alpha * group.opacity;
            ctx.drawImage(layer, 0, 0);
            return;
        }
        for (const child of group.children)
            paintNode(ctx, child, alpha * group.opacity);
    };
    const paintNode = (ctx, node, alpha) => {
        if (node.kind === 'shape')
            paintShape(ctx, node, alpha);
        else
            paintGroup(ctx, node, alpha);
    };
    const ctx = canvas.getContext('2d');
    let live = true;
    const doDraw = (force) => {
        if (!live || !svg.isConnected)
            return;
        if (svg.clientWidth === 0 || svg.clientHeight === 0)
            return;
        if (stale || svg.clientWidth !== widthCss || svg.clientHeight !== heightCss || (window.devicePixelRatio || 1) !== dpr)
            collect();
        if (root === null)
            return;
        if (!force && !anyMoving() && !dirty)
            return;
        dirty = false;
        read(root, force);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalAlpha = 1;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const child of root.children)
            paintNode(ctx, child, 1);
    };
    let dirty = true;
    /* what makes the picture change that is not time: the shapes' geometry or colours (the traces are placed after they are drawn, the theme recolours the lines), the box */
    const observer = new MutationObserver(() => { stale = true; dirty = true; sharedHaloClock().invalidate(); });
    observer.observe(svg, { attributes: true, subtree: true, attributeFilter: ['d', 'cx', 'cy', 'r', 'class', 'data-placed', 'points', 'x1', 'x2', 'y1', 'y2', 'width', 'height'] });
    const page = new MutationObserver(() => { stale = true; dirty = true; sharedHaloClock().invalidate(); });
    page.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class', 'lang', 'data-theme'] });
    /* an animation that starts later (the style changed, the menu was drawn again) is not in the lists: collect again */
    svg.addEventListener('animationstart', () => { stale = true; dirty = true; sharedHaloClock().invalidate(); });
    const sizes = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => { stale = true; dirty = true; sharedHaloClock().invalidate(); }) : null;
    sizes?.observe(svg);
    svg.after(canvas);
    svg.style.visibility = 'hidden';
    const stop = sharedHaloClock().add(() => doDraw(false), `art:${svg.getAttribute('class') ?? 'svg'}`);
    /* the first picture, in the same task: the svg is hidden, so the canvas must already be showing it */
    doDraw(true);
    void haloMotion;
    return {
        svg, canvas,
        drawNow() { doDraw(true); },
        dispose() {
            live = false;
            stop();
            observer.disconnect();
            page.disconnect();
            sizes?.disconnect();
            canvas.remove();
            svg.style.visibility = '';
        },
    };
}
/** Mirrors every art svg of the menu under `surface` that can be mirrored; again whenever the menu is drawn again. Returns the way to stop. */
export function connectArtMirror(surface, selector = '.kt-menu-art svg, .kt-menu-traces') {
    if (!artOnCanvas())
        return () => undefined;
    let mirrors = [];
    let scheduled = 0;
    const run = () => {
        scheduled = 0;
        if (surface.hidden)
            return;
        mirrors = mirrors.filter((mirror) => { if (mirror.svg.isConnected)
            return true; mirror.dispose(); return false; });
        const have = new Set(mirrors.map((mirror) => mirror.svg));
        for (const svg of surface.querySelectorAll(selector)) {
            if (have.has(svg))
                continue;
            try {
                const mirror = mirrorSvg(svg);
                if (mirror !== null)
                    mirrors.push(mirror);
            }
            catch { /* an art that cannot be mirrored stays as it is */ }
        }
    };
    const schedule = () => { if (scheduled === 0)
        scheduled = window.setTimeout(run, 120); };
    const watch = new MutationObserver(schedule);
    watch.observe(surface, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden', 'data-placed'] });
    schedule();
    /* a handle for the QA audit (scripts/qa/artMirrorEquivalenceAudit.mjs); nothing in the application reads it */
    globalThis.__ktArtMirror = { count: () => mirrors.length, drawAll: () => { for (const mirror of mirrors)
            mirror.drawNow(); } };
    return () => { watch.disconnect(); window.clearTimeout(scheduled); for (const mirror of mirrors)
        mirror.dispose(); mirrors = []; };
}
