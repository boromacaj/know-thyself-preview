import { DEGREES, FOV_DEGREES, MOON, cameraFor, moonFor } from './ambientMath.js?v=2ea79e9';
import { moonSilhouette } from './ambientMoonMask.js?v=2ea79e9';
import { sunSceneFor } from './ambientSun.js?v=2ea79e9';
/*
 * THE HERO POSE: A SCENE WITH TWO AUTHORED STATES, AND A NUMBER THAT SAYS HOW MUCH OF THE FIRST IS HELD.
 *
 * The ambient scene is a free-running one: the planet turns, the Sun is fixed on the stars' sky and is carried past the lens by that turn, the Moon goes round on
 * its path. That is right for a backdrop and wrong for a screen that has to put a LABEL on the Sun and on the Moon: a label tied to a body that can leave the
 * screen, or go behind the Earth, would be unreadable at the moment it mattered. So a screen can ask for a curated pose and hold it:
 *
 *   HERO      p = 1   the planet at the pose the scene settled in; the Sun at an authored place on the sky (hence on the screen); the Moon at an authored
 *                     phase of its own path. Nothing about the planet's turn, the Sun's drift or the Moon's clock reaches the screen.
 *   AMBIENT   p = 0   the scene exactly as it runs without a hero: nothing here changes any of it.
 *   BETWEEN           every shown quantity is its hero value plus the ambient one's SHORTEST angular distance from it, times (1 - p). So a long time spent at p = 1 costs
 *                     nothing (the ambient state is not allowed to run away while it is held), the way back from p = 0 is never longer than half a turn, and p = 1 is the
 *                     hero pose EXACTLY, whatever the ambient state has done since: there is no drift or accumulated error to restore.
 *
 * Pure: no canvas, no clock, no DOM. The globe (ambientGlobe.ts) feeds it its rotation and its clock and draws what it returns; the screen that owns the hero
 * (the Western Astrology pillar) decides p from its own scroll position and hands it over (`setHeroProgress`).
 */
/** Said on the window whenever the held weight changes (and once when it is let go), so the screen that owns the hero can fade what belongs to the pose as the pose goes. */
export const AMBIENT_HERO_EVENT = 'knowthyself:ambient-hero';
const TAU = Math.PI * 2;
/** The signed shortest angular distance from `to` to `from`, radians, in (-PI, PI]. */
export function angularDifference(from, to) {
    const d = (((from - to) % TAU) + TAU + Math.PI) % TAU - Math.PI;
    return d === -Math.PI ? Math.PI : d;
}
/** `hero` plus the shortest way from it to `ambient`, scaled by (1 - p): hero at p = 1, `ambient` (modulo a full turn) at p = 0. */
export function blendAngle(hero, ambient, p) {
    return hero + angularDifference(ambient, hero) * (1 - clamp01(p));
}
export const clamp01 = (value) => Math.min(1, Math.max(0, value));
/** The Moon at hero weight `p`: at the hero's phase at 1, at `freePhase` (the scene's own phase, any number of turns) at 0, the shortest way between. */
export function heroMoonFor(hero, freePhase, p) {
    return moonFor(0, 0, false, blendAngle(hero.moonPhase, freePhase, p));
}
/** The Sun's reference at weight `p` of the hero's: the hero's at 1, the scene's own at 0, the angle by its shortest way round. */
export function blendReference(scene, hero, p) {
    const w = clamp01(p);
    return {
        angleDegrees: blendAngle(scene.angleDegrees * DEGREES, hero.angleDegrees * DEGREES, 1 - w) / DEGREES,
        distance: scene.distance + (hero.distance - scene.distance) * w,
    };
}
/** The pose shown at hero weight `p`: the anchor's at 1, the scene's own at 0. */
export function blendRotation(anchor, rotation, p) {
    return {
        yaw: blendAngle(anchor.yaw, rotation.yaw, p),
        pitch: anchor.pitch + (rotation.pitch - anchor.pitch) * (1 - clamp01(p)),
    };
}
/* ------------------------------------------------------------------ *
 * WHERE THE AUTHORED POSE IS - FOR THE WESTERN ASTROLOGY HERO
 * ------------------------------------------------------------------ */
/*
 * A curated triangle: the Earth is the anchor, the Sun is the far point and the Moon the near one, both on the upper right, and the Ascendant's marker (drawn by the
 * screen, not the scene) is the third, on the Earth's own horizon at the left. The poses are not found by hand-tuned numbers per phone: a fixed set of candidates is tried
 * against the scene as it is really drawn (the real camera, the real Sun, the real Moon silhouette) and the cheapest that passes every rule is taken, so the same screen gives the
 * same pose every time and a different screen gets the nearest honest equivalent.
 */
export const HERO_RULES = Object.freeze({
    /** The Sun's ideal place: the angle from the Earth's centre (degrees, counter-clockwise from the right) and the distance in Earth radii. */
    sunAngle: 60,
    sunDistance: 1.8,
    /** The Sun is at least this far to the right of the planet's centre, in Earth radii: upper RIGHT, not above. */
    sunMinRight: 0.6,
    /** The Moon's ideal place: lower and nearer than the Sun, on the same side. */
    moonAngle: 42,
    /** How far outside the planet's limb the Moon's centre is, in Earth radii, at its best. */
    moonGap: 0.3,
    /** The room a body keeps from the screen's edge, CSS px (added to the Moon's radius). */
    edgeMargin: 14,
    sunEdgeMargin: 22,
    /** The least the Sun and the Moon are apart, centre to centre, over and above the Moon's radius, CSS px. */
    separation: 84,
    /** The Moon's clear gap from the planet, CSS px. */
    moonEarthGap: 10,
    /** The Sun's least distance from the planet's centre, Earth radii: room for its flare to read. */
    sunMinDistance: 1.35,
});
const SUN_ANGLES = Array.from({ length: 41 }, (_, i) => 30 + i * 1.5);
const SUN_DISTANCES = Array.from({ length: 16 }, (_, i) => 1.4 + i * 0.1);
const MOON_PHASES = Array.from({ length: 360 }, (_, i) => i * DEGREES);
const angleOf = (dx, dy) => (Math.atan2(-dy, dx) / DEGREES + 360) % 360;
const gap = (a, b) => Math.abs((((a - b) % 360) + 540) % 360 - 180);
export function heroCompositionFor(input) {
    const { width, height, framing, yaw, pitch } = input;
    const rules = HERO_RULES;
    const pose = cameraFor(framing, width, height);
    const earthX = width * (pose.ndcX + 1) / 2;
    const earthY = height * (1 - pose.ndcY) / 2;
    const earthRadius = pose.radiusPx;
    const halfTan = Math.tan((FOV_DEGREES * DEGREES) / 2);
    const suns = [];
    for (const distance of SUN_DISTANCES) {
        for (const angleDegrees of SUN_ANGLES) {
            const reference = { angleDegrees, distance };
            const scene = sunSceneFor({ yaw, pitch, pose, width, height, anchorYaw: yaw, anchorPitch: pitch, reference });
            const sun = scene.sun;
            if (!sun || sun.visible < 0.999 || sun.distance < rules.sunMinDistance)
                continue;
            const body = { x: sun.x, y: sun.y, r: sun.coreRadius };
            const m = rules.sunEdgeMargin;
            if (body.x < m || body.x > width - m || body.y < m || body.y > height - m)
                continue;
            /* The Sun is upper right of the planet. */
            if (body.x < earthX + rules.sunMinRight * earthRadius || body.y > earthY - 0.55 * earthRadius)
                continue;
            const cost = gap(angleDegrees, rules.sunAngle) / 90 + Math.abs(distance - rules.sunDistance) / 1.2;
            suns.push({ reference, body, cost });
        }
    }
    suns.sort((a, b) => a.cost - b.cost);
    const moons = [];
    for (const phase of MOON_PHASES) {
        const moon = moonFor(0, 0, false, phase);
        const s = moonSilhouette(moon.position, moon.radius, pose.distance, halfTan, framing, width, height);
        const body = { x: s.x * width, y: s.y * height, r: s.rx * width };
        if (body.x - body.r < rules.edgeMargin || body.x + body.r > width - rules.edgeMargin || body.y - body.r < rules.edgeMargin || body.y > height - rules.edgeMargin)
            continue;
        const distance = Math.hypot(body.x - earthX, body.y - earthY);
        if (distance < earthRadius + body.r + rules.moonEarthGap)
            continue;
        /* On the Earth's upper right, between the horizontal and the Sun's side. */
        const angle = angleOf(body.x - earthX, body.y - earthY);
        if (angle < 5 || angle > 80)
            continue;
        const near = Math.max(0, distance - (earthRadius + body.r + rules.moonEarthGap)) / earthRadius;
        const cost = gap(angle, rules.moonAngle) / 90 + Math.abs(near - rules.moonGap) * 1.2;
        moons.push({ phase, body, cost });
    }
    moons.sort((a, b) => a.cost - b.cost);
    /* the pair: cheapest first, the Sun and the Moon apart */
    let best = null;
    for (const sun of suns) {
        if (best && sun.cost >= best.cost)
            break;
        for (const moon of moons) {
            if (best && sun.cost + moon.cost >= best.cost)
                break;
            if (Math.hypot(sun.body.x - moon.body.x, sun.body.y - moon.body.y) >= rules.separation + moon.body.r) {
                best = { sun, moon, cost: sun.cost + moon.cost };
                break;
            }
        }
    }
    if (best)
        return { pose: { sun: best.sun.reference, moonPhase: best.moon.phase }, fallback: false };
    return { pose: { sun: { angleDegrees: rules.sunAngle, distance: rules.sunDistance }, moonPhase: MOON.restPhase }, fallback: true };
}
