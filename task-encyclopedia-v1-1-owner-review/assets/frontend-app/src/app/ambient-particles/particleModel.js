/*
 * THE FOREGROUND PARTICLE MODEL
 * -----------------------------
 * Pure arithmetic: no DOM, no clock, no Math.random. A field of floating spores in front of the interface, in THREE planes of
 * depth, and a central impulse model that lets the interface disturb them.
 *
 * WHY THIS IS A SEPARATE FILE. The layer (particleLayer.ts) owns the canvas, the listeners and the loop; this owns every number
 * that decides how a mote looks and moves. Keeping them apart is what makes the behaviour testable without a browser, and what
 * keeps the loop's per-frame work to "step, then draw" with nothing to look up.
 *
 * DETERMINISM. Every particle carries its OWN generator state, seeded once from the field seed. Nothing here calls Math.random,
 * and respawning a particle advances only that particle's generator, so the same seed and the same sequence of calls always give
 * the same field - which is what makes a screenshot or a test reproducible.
 *
 * THREE PLANES, ONE TABLE. Every plane is in front of the interface; they are ordered among themselves, far to near, and drawn in
 * that order so the near plane is on top of the others:
 *
 *   far   fine dust: the smallest points, crisp, faint, slow, hardly disturbed
 *   mid   the main visible field: small, mostly crisp with some soft edges, clearly drifting, moderately disturbed
 *   near  the closest: still only a few pixels across, a little brighter and softer-edged, the fastest, disturbed the most
 *
 * SCALE. V3 expressed depth with size and read as bubbles; V3.1 shrank it to a few pixels and was still read as dots; V3.2 (first
 * pass) halved it and was still too large. The final V3.2 is MICRO SPORES: every plane is the size of V3.1's smallest far-plane
 * motes - a body of 0.3-0.6 px and a visible footprint of about 1-2 CSS px including the edge - so no mote is an object. Depth is NOT
 * carried by size at all; it is carried by a very slightly different brightness, drift speed and heading, and how much a plane
 * answers a tap or a scroll. All of it is far slower and gentler than V3.1 (near drift 3-8 px/s against 20-55). DEPTH_CLASSES and the
 * tables below it are the whole tuning surface; nothing is hard-coded in the step or the renderer.
 */
/** Far to near: this is also the order they are generated in and the order the renderer draws them. */
export const DEPTHS = Object.freeze(['far', 'mid', 'near']);
export const INTENSITIES = Object.freeze(['micro', 'nav', 'major']);
export const DEPTH_CLASSES = Object.freeze({
    far: {
        radius: [0.345, 0.575], softness: [0.3], softShare: [1], softAlpha: [1],
        alpha: [0.58, 0.78], speed: [1, 3], flow: 0.8, gust: 0.1,
        impulseGain: { micro: 0.35, nav: 0.35, major: 0.35 }, lift: { micro: 0.05, nav: 0.08, major: 0.1 }, scroll: 0.3,
    },
    mid: {
        radius: [0.4, 0.63], softness: [0.3, 0.45], softShare: [0.85, 1], softAlpha: [1, 0.94],
        alpha: [0.64, 0.84], speed: [2, 5], flow: 1.4, gust: 0.15,
        impulseGain: { micro: 0.65, nav: 0.65, major: 0.65 }, lift: { micro: 0.06, nav: 0.1, major: 0.12 }, scroll: 0.6,
    },
    near: {
        radius: [0.46, 0.69], softness: [0.3, 0.45], softShare: [0.8, 1], softAlpha: [1, 0.94],
        alpha: [0.7, 0.85], speed: [3, 8], flow: 2.2, gust: 0.2,
        impulseGain: { micro: 1, nav: 1, major: 1 }, lift: { micro: 0.08, nav: 0.12, major: 0.15 }, scroll: 1,
    },
});
/**
 * The palette: cool white, white, soft pale blue, muted cyan and, rarely, soft violet. Each mote keeps one for life; the scene
 * tint only leans on the edge. No warm tones, no saturation.
 */
export const NEUTRAL_BASES = Object.freeze([
    [232, 242, 255],
    [255, 255, 255],
    [186, 214, 255],
    [150, 226, 238],
    [206, 190, 255],
]);
/** The share of the field each base takes, as cumulative thresholds over one draw in [0,1). */
const BASE_THRESHOLDS = Object.freeze([0.3, 0.5, 0.75, 0.92, 1]);
/*
 * Settling times: micro ln(20)/3.2 = 0.94 s, nav ln(20)/2.6 = 1.15 s, major ln(20)/2.2 = 1.36 s - inside the 0.8-1.5 s the
 * brief allows. How far a mote of gain 1 ends up is speed / damping: 47, 81 and 114 px for the near plane (a visible, meaningful
 * distance - tens of pixels for a tap), and in proportion to the plane's gain for the others. Velocity and damping, never a jump,
 * never a spring back to where it was.
 */
export const IMPULSES = Object.freeze({
    micro: { speed: 38, damping: 3.2, brightness: 0.5, reach: 0.3, floor: 0.03 },
    nav: { speed: 42, damping: 2.6, brightness: 0.75, reach: 0.5, floor: 0.5 },
    major: { speed: 55, damping: 2.2, brightness: 1, reach: 0.5, floor: 0.75 },
});
/** A scroll's nudge. Velocity added per px of scroll, per class gain; the ceiling it can reach; how fast it dies away. */
export const SCROLL_VELOCITY_PER_PX = 0.35;
export const SCROLL_SPEED_CAP = 30;
export const SCROLL_DAMPING = 2.2;
/** Hard ceiling on the velocity an impulse may leave a particle with, whatever arrives and however fast. Per depth gain 1. */
export const MAX_IMPULSE_SPEED = 100;
/** The disturbance travels, so the far side of the screen hears it a moment after the near side. px per second. */
export const WAVE_SPEED = 1900;
export const MAX_WAVE_DELAY = 0.45;
export const settleSeconds = (intensity) => Math.log(20) / IMPULSES[intensity].damping;
/** The size of the pool every profile draws from. A profile can only pick from it, never grow it. */
export const POOL = Object.freeze({ far: 28, mid: 28, near: 16 });
/**
 * How many motes of each plane, by device class and mode. V3.1 had 80 on a phone; the owner suspects a fullscreen animation layer
 * of costing a Samsung responsiveness, so the field is sparse now: a phone is 40 (16 / 16 / 8), a desktop 60. The motes are all
 * equally tiny, so the near plane no longer exists to be large - it is simply the plane that drifts and answers a tap the most,
 * and 8 of it is enough. Constrained is 26 (10 / 10 / 6): fewer motes, but still all three planes.
 */
export const COUNTS = Object.freeze({
    full: { phone: { far: 16, mid: 16, near: 8 }, desktop: { far: 24, mid: 24, near: 12 } },
    constrained: { phone: { far: 10, mid: 10, near: 6 }, desktop: { far: 16, mid: 16, near: 8 } },
});
/** Rates, resolution and softness by mode. */
export const QUALITY = Object.freeze({
    full: { fps: 60, dprCap: 2, blurScale: 1 },
    /* Constrained stays at the full frame rate: the near plane moves up to ~80 px/s and 30 Hz would step it by ~3 px a frame. What
       it gives up is motes, resolution (1.5) and a little softness. */
    constrained: { fps: 60, dprCap: 1.5, blurScale: 0.75 },
    /* Reduced motion: slow, still, never pulsing. */
    reduced: { fps: 30, motionScale: 0.25 },
});
/** A phone-sized screen gets the phone field; anything wider than a tablet in portrait gets the richer one. */
export const isPhoneSized = (width, minSide) => minSide < 640 || width < 820;
export function profileFor(inputs) {
    const phone = isPhoneSized(inputs.width, inputs.minSide);
    const mode = inputs.constrained ? 'constrained' : 'full';
    const counts = COUNTS[mode][phone ? 'phone' : 'desktop'];
    const quality = QUALITY[mode];
    const reduced = inputs.reducedMotion;
    return {
        ...counts,
        blurScale: quality.blurScale,
        motion: reduced ? QUALITY.reduced.motionScale : 1,
        impulseMotion: !reduced,
        breathing: !reduced,
        scroll: !reduced,
        fps: reduced ? QUALITY.reduced.fps : quality.fps,
        dprCap: quality.dprCap,
    };
}
export const profileTotal = (profile) => profile.far + profile.mid + profile.near;
/* ---------------------------------------------------------------- generator */
/** mulberry32: one 32-bit state in, one number in [0,1) out. Small, fast, and good enough for dust. */
export function nextRandom(state) {
    let s = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return [((t ^ (t >>> 14)) >>> 0) / 4294967296, s];
}
const between = (r, range) => range[0] + (range[1] - range[0]) * r;
const TAU = Math.PI * 2;
/** The palette entry a draw in [0,1) selects. */
const baseFor = (r) => {
    const index = BASE_THRESHOLDS.findIndex((limit) => r < limit);
    return index < 0 ? BASE_THRESHOLDS.length - 1 : index;
};
/** The softness level of a mote of a plane that drew `r`. */
const softFor = (cls, r) => {
    const index = cls.softShare.findIndex((limit) => r < limit);
    return index < 0 ? cls.softShare.length - 1 : index;
};
function createParticle(depth, slot, seed) {
    const cls = DEPTH_CLASSES[depth];
    /* Every particle's generator is seeded from the field seed, its plane and its slot, never from the order of the others. */
    let state = (Math.imul(seed | 0, 0x9e3779b1) ^ Math.imul(depth === 'far' ? 11 : depth === 'mid' ? 23 : 37, 0x85ebca6b) ^ Math.imul(slot + 1, 0xc2b2ae35)) | 0;
    const draw = () => {
        const [value, next] = nextRandom(state);
        state = next;
        return value;
    };
    const particle = {
        depth,
        slot,
        nx: draw(),
        ny: draw(),
        ix: 0,
        iy: 0,
        radius: between(draw(), cls.radius),
        alpha: between(draw(), cls.alpha),
        speed: between(draw(), cls.speed),
        soft: softFor(cls, draw()),
        heading: draw() * TAU,
        headingAmp1: 0.6 + draw() * 0.8,
        headingFreq1: 0.05 + draw() * 0.07,
        headingPhase1: draw() * TAU,
        headingAmp2: 0.2 + draw() * 0.4,
        headingFreq2: 0.13 + draw() * 0.1,
        headingPhase2: draw() * TAU,
        headingAmp3: 0.8 + draw() * 0.9,
        headingFreq3: 0.015 + draw() * 0.02,
        headingPhase3: draw() * TAU,
        speedFreq: 0.04 + draw() * 0.06,
        speedPhase: draw() * TAU,
        gustFreq: 0.02 + draw() * 0.03,
        gustPhase: draw() * TAU,
        breathFreq: 0.18 + draw() * 0.3,
        breathPhase: draw() * TAU,
        base: baseFor(draw()),
        scatter: draw() * TAU,
        skittish: 0.7 + draw() * 0.6,
        damp: IMPULSES.nav.damping,
        glow: 0,
        presence: 0,
        appearDelay: draw() * 2.4,
        rng: 0,
    };
    particle.rng = state;
    return particle;
}
/** Builds the whole pool once, far plane first. Nothing else in the model allocates a particle. */
export function createField(seed) {
    const particles = [];
    for (const depth of DEPTHS) {
        for (let slot = 0; slot < POOL[depth]; slot += 1)
            particles.push(createParticle(depth, slot, seed));
    }
    return { seed, time: 0, particles, pending: [], scrollPending: 0 };
}
/* ---------------------------------------------------------------- motion */
const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
/**
 * The shared ambient flow at a place and time, a vector with components in [-1.5, 1.5]. Two slow, large-scale waves crossing
 * the screen, so motes that are close to each other are carried the same way and the whole field breathes as one body of air,
 * instead of every mote wandering on its own. Positions are shares of the screen, so it does not depend on the viewport.
 *
 * Every wave number is a whole number of periods across the screen (one and two), so the flow averages to ZERO over the screen
 * at every instant: it swirls the field, it never blows it anywhere. The visible travel of a mote comes from its own wander;
 * the flow is what makes neighbours agree.
 */
export function flowAt(nx, ny, time) {
    return [
        Math.sin(ny * TAU + time * 0.11 + 1.3) + 0.5 * Math.sin(nx * 2 * TAU - time * 0.07 + 0.4),
        Math.cos(nx * TAU + time * 0.09 + 0.8) + 0.5 * Math.cos(ny * 2 * TAU + time * 0.13 + 2.1),
    ];
}
/**
 * The ambient velocity of a particle at a field time, in CSS px per second: its own wander (a heading with three sinusoids on it,
 * the slowest a large rare change of course, at a pace that breathes and now and then gusts) plus the plane's share of the shared
 * flow. Deterministic in (particle, position, time) and smooth in all three: no jumps, so a mote never turns abruptly or jitters.
 */
export function driftVelocity(p, time, motion) {
    const cls = DEPTH_CLASSES[p.depth];
    const angle = p.heading
        + p.headingAmp1 * Math.sin(time * p.headingFreq1 * TAU + p.headingPhase1)
        + p.headingAmp2 * Math.sin(time * p.headingFreq2 * TAU + p.headingPhase2)
        + p.headingAmp3 * Math.sin(time * p.headingFreq3 * TAU + p.headingPhase3);
    /* The pace breathes between 60% and 100%, and a gust (a slow sine's positive crest, squared) adds up to the plane's share on top. */
    const breathing = 0.8 + 0.2 * Math.sin(time * p.speedFreq * TAU + p.speedPhase);
    const crest = Math.max(0, Math.sin(time * p.gustFreq * TAU + p.gustPhase));
    const speed = p.speed * breathing * (1 + cls.gust * crest * crest) * motion;
    const [fx, fy] = flowAt(p.nx, p.ny, time);
    const carry = cls.flow * motion;
    return [Math.cos(angle) * speed + fx * carry, Math.sin(angle) * speed + fy * carry];
}
/** The extent of a mote's soft edge beyond its body, in CSS px, at a profile's softness scale. */
export const edgeExtent = (p, blurScale = 1) => p.radius * DEPTH_CLASSES[p.depth].softness[p.soft] * blurScale;
/** How far outside the viewport (px) a mote must be before it is recycled: fully clear of its own soft edge, plus slack. */
export function offscreenMargin(p, blurScale = 1) {
    return p.radius + edgeExtent(p, blurScale) + 12;
}
/** A particle whose slot is past the profile's count for its plane is being retired: it eases out and is skipped by the drawing. */
export function wanted(p, profile) {
    return p.slot < profile[p.depth];
}
/* ---------------------------------------------------------------- impulses */
const MAX_PENDING = 6;
const unit = (x, y) => {
    const length = Math.hypot(x, y);
    return length < 1e-6 ? [0, 0] : [x / length, y / length];
};
/** The ceiling for one particle: the top of the largest impulse its plane can be handed. */
export const maxImpulseSpeedFor = (depth) => MAX_IMPULSE_SPEED * DEPTH_CLASSES[depth].impulseGain.major;
/**
 * Queue one disturbance.
 *
 * The queue is bounded, so a flood of taps cannot grow it; each particle keeps a delay (the disturbance travels), a direction
 * (away from where it began, bent by the mote's own startled heading and by the requested direction) and a falloff (motes near
 * the origin hear more of it). All three are fixed here, once, so the per-frame work is a comparison.
 *
 * With the profile's impulseMotion off (reduced motion) nothing moves at all: the motes only brighten a little.
 */
export function enqueueImpulse(field, request, viewport, profile) {
    const spec = IMPULSES[request.intensity];
    if (!spec)
        return;
    if (!profile.impulseMotion) {
        for (const p of field.particles) {
            if (p.presence === 0)
                continue;
            p.glow = Math.max(p.glow, DEPTH_CLASSES[p.depth].lift[request.intensity] * spec.brightness * 0.6);
        }
        return;
    }
    const { width, height } = viewport;
    const hasOrigin = Number.isFinite(request.x) && Number.isFinite(request.y);
    const ox = hasOrigin ? request.x : width / 2;
    const oy = hasOrigin ? request.y : height / 2;
    const requested = unit(request.dx ?? 0, request.dy ?? 0);
    const reach = spec.reach * Math.min(width, height);
    const delays = [];
    const directions = [];
    const falloffs = [];
    for (const p of field.particles) {
        const px = p.nx * width;
        const py = p.ny * height;
        const distance = Math.hypot(px - ox, py - oy);
        delays.push(Math.min(MAX_WAVE_DELAY, distance / WAVE_SPEED));
        falloffs.push(hasOrigin ? spec.floor + (1 - spec.floor) / (1 + (distance / reach) ** 2) : 1);
        const radial = distance < 1 ? [Math.cos(p.scatter), Math.sin(p.scatter)] : [(px - ox) / distance, (py - oy) / distance];
        const scatter = [Math.cos(p.scatter), Math.sin(p.scatter)];
        /* A tap pushes things away from the finger; a screen change has no finger, so each mote is mostly startled its own way. */
        const radialWeight = hasOrigin ? 0.65 : 0.25;
        directions.push(unit(radial[0] * radialWeight + scatter[0] * (1 - radialWeight) + requested[0] * 0.5, radial[1] * radialWeight + scatter[1] * (1 - radialWeight) + requested[1] * 0.5));
    }
    field.pending.push({ request, age: 0, reached: field.particles.map(() => false), delays, directions, falloffs });
    if (field.pending.length > MAX_PENDING)
        field.pending.shift();
}
function releasePending(field, dt) {
    const pending = field.pending;
    for (let k = pending.length - 1; k >= 0; k -= 1) {
        const impulse = pending[k];
        impulse.age += dt;
        const spec = IMPULSES[impulse.request.intensity];
        let remaining = 0;
        for (let i = 0; i < field.particles.length; i += 1) {
            if (impulse.reached[i])
                continue;
            if (impulse.age < impulse.delays[i]) {
                remaining += 1;
                continue;
            }
            impulse.reached[i] = true;
            const p = field.particles[i];
            if (p.presence === 0)
                continue;
            const cls = DEPTH_CLASSES[p.depth];
            const speed = spec.speed * cls.impulseGain[impulse.request.intensity] * impulse.falloffs[i] * p.skittish;
            const [dx, dy] = impulse.directions[i];
            p.ix += dx * speed;
            p.iy += dy * speed;
            /* Several taps in a row add up, but never past what the largest single impulse could leave. */
            const ceiling = maxImpulseSpeedFor(p.depth);
            const magnitude = Math.hypot(p.ix, p.iy);
            if (magnitude > ceiling) {
                p.ix *= ceiling / magnitude;
                p.iy *= ceiling / magnitude;
            }
            p.damp = spec.damping;
            p.glow = Math.max(p.glow, cls.lift[impulse.request.intensity] * spec.brightness * impulse.falloffs[i]);
        }
        if (remaining === 0)
            pending.splice(k, 1);
    }
}
/**
 * A scroll, as the change in a scroller's scrollTop (positive = scrolled down, so the content moved UP the screen). The field
 * is nudged the way the content went - up for a scroll down - the nearer planes further, and the nudge dies away by itself, so a
 * fast flick is a stronger gust than a slow drag. Gathered here by however many scroll events a frame brings and consumed once by
 * the next step, so an event storm costs one addition each. Bounded in what it gathers and, in the step, in how fast it can ever
 * make a mote go.
 */
export function addScroll(field, scrollDelta) {
    if (!Number.isFinite(scrollDelta))
        return;
    field.scrollPending = clamp(field.scrollPending + scrollDelta, -300, 300);
}
/* ---------------------------------------------------------------- recycling */
/**
 * A mote that has drifted fully clear of the screen is brought back on the opposite side, still clear of it, heading inward - so
 * it is never seen to appear or vanish. Only that particle's own generator advances, and every particle has its own phase, so
 * they do not all wrap together.
 */
function recycle(p, width, height, profile) {
    const margin = offscreenMargin(p, profile.blurScale);
    const x = p.nx * width;
    const y = p.ny * height;
    const left = x < -margin;
    const right = x > width + margin;
    const top = y < -margin;
    const bottom = y > height + margin;
    if (!(left || right || top || bottom))
        return;
    const [a, s1] = nextRandom(p.rng);
    const [b, s2] = nextRandom(s1);
    const [c, s3] = nextRandom(s2);
    p.rng = s3;
    /* Just clear of the screen and strictly INSIDE the recycle ring: the margin carries 12 px of slack past the soft edge, and the
       mote is put back within the first 10 px of it, so it is invisible when it returns and is not recycled again at once. */
    const outside = margin - 10 + a * 8;
    if (left || right) {
        p.nx = (left ? width + outside : -outside) / width;
        p.ny = 0.08 + b * 0.84;
    }
    else {
        p.ny = (top ? height + outside : -outside) / height;
        p.nx = 0.08 + b * 0.84;
    }
    /* Heading: toward the middle of the screen, give or take. */
    const toCentre = Math.atan2(height / 2 - p.ny * height, width / 2 - p.nx * width);
    p.heading = toCentre + (c - 0.5) * 1.4;
    p.ix = 0;
    p.iy = 0;
}
/* ---------------------------------------------------------------- stepping */
/** Highest alpha any mote may reach, lift and breathing included: the guard that keeps text readable under the brightest moment. */
export const ALPHA_CAP = 0.85;
/** Turn a frame's scroll into a vertical nudge of one mote: with the content, scaled by its plane, and never past the cap. */
function nudgeForScroll(p, scrolled) {
    const gain = DEPTH_CLASSES[p.depth].scroll;
    const add = -scrolled * SCROLL_VELOCITY_PER_PX * gain;
    const cap = SCROLL_SPEED_CAP * gain;
    /* It adds toward the cap but never pulls a faster mote back to it, and it never pushes past it. */
    p.iy = add < 0 ? Math.min(p.iy, Math.max(p.iy + add, -cap)) : Math.max(p.iy, Math.min(p.iy + add, cap));
    p.damp = SCROLL_DAMPING;
}
/**
 * Advance the field by dt seconds.
 *
 * Nothing here reads the DOM, allocates, or calls Math.random. dt is clamped, so coming back from a hidden tab (when the layer
 * has also reset its clock) can never throw the motes across the screen.
 */
export function stepField(field, dt, viewport, profile) {
    const step = clamp(dt, 0, 0.05);
    if (step === 0)
        return;
    field.time += step;
    const { width, height } = viewport;
    if (width <= 0 || height <= 0)
        return;
    releasePending(field, step);
    /* The scroll of this frame, taken once. Reduced motion takes it and ignores it. */
    const scrolled = profile.scroll ? field.scrollPending : 0;
    field.scrollPending = 0;
    for (const p of field.particles) {
        /* Presence eases toward 1 for a wanted mote once its own delay has passed, toward 0 for one that is retired. */
        const target = wanted(p, profile) && field.time >= p.appearDelay ? 1 : 0;
        p.presence += (target - p.presence) * (1 - Math.exp(-(target > p.presence ? 0.9 : 1.6) * step));
        if (target === 0 && p.presence < 0.002)
            p.presence = 0;
        if (p.presence === 0) {
            p.ix = 0;
            p.iy = 0;
            p.glow = 0;
            continue;
        }
        if (scrolled !== 0)
            nudgeForScroll(p, scrolled);
        const [vx, vy] = driftVelocity(p, field.time, profile.motion);
        const damping = Math.exp(-p.damp * step);
        p.ix *= damping;
        p.iy *= damping;
        if (Math.abs(p.ix) < 0.01 && Math.abs(p.iy) < 0.01) {
            p.ix = 0;
            p.iy = 0;
        }
        p.nx += ((vx + p.ix) * step) / width;
        p.ny += ((vy + p.iy) * step) / height;
        p.glow *= Math.exp(-2.2 * step);
        if (p.glow < 0.002)
            p.glow = 0;
        recycle(p, width, height, profile);
    }
}
/* ---------------------------------------------------------------- appearance */
/**
 * The alpha a mote is drawn with right now: its own (less for a defocused one), breathing, lifted by an impulse, faded by
 * presence, and never past the cap.
 */
export function particleAlpha(p, time, profile) {
    const breath = profile.breathing ? 0.84 + 0.16 * Math.sin(time * p.breathFreq * TAU + p.breathPhase) : 0.92;
    const soft = DEPTH_CLASSES[p.depth].softAlpha[p.soft];
    return Math.min(ALPHA_CAP, p.alpha * soft * breath * (1 + p.glow) * p.presence);
}
/** Nothing changes size: a mote is a point of light and an impulse only brightens it (V3.2 had a near-plane swell of 8%; it is gone). */
export function particleScale(_p) {
    return 1;
}
/** Peak velocity (px/s) that a single impulse of an intensity would give a plane's mote, before falloff and skittishness. */
export const impulsePeakSpeed = (depth, intensity) => (IMPULSES[intensity].speed * DEPTH_CLASSES[depth].impulseGain[intensity]);
/** How far a mote of a plane ends up from where an impulse found it, in px, with no falloff and no skittishness. */
export const impulseTravel = (depth, intensity) => (impulsePeakSpeed(depth, intensity) / IMPULSES[intensity].damping);
/**
 * The tint a scene leans on, as an rgb triple. A table and not a pixel read: the layer takes the scene from the host element's
 * data attributes when they change and eases toward the colour. A module that wants its own can publish --kt-particle-tint
 * ("r, g, b") on #place-experience and the layer will use that instead of the table.
 */
export const SCENE_TINTS = Object.freeze({
    default: [214, 222, 240],
    earth: [128, 196, 255],
    tarot: [182, 148, 255],
    numerology: [255, 214, 150],
});
/** How much of the tint reaches the edge of a mote. The core stays on its palette colour. */
export const TINT_STRENGTH = 0.28;
export function sceneFor(dataset) {
    const active = dataset.pillarStage === 'pillar' ? dataset.pillarActive : undefined;
    if (active === undefined || active === 'menu')
        return 'earth';
    if (active === 'tarot')
        return 'tarot';
    if (active === 'numerology')
        return 'numerology';
    return 'default';
}
/** Parse "r, g, b" (0-255 each); anything else is not a tint. */
export function parseTint(value) {
    if (!value)
        return null;
    const parts = value.split(',').map((part) => Number(part.trim()));
    if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n) || n < 0 || n > 255))
        return null;
    return [parts[0], parts[1], parts[2]];
}
export const mixRgb = (a, b, t) => [
    a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t,
];
