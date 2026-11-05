import { DEGREES, FOV_DEGREES, IDLE_PITCH_DEGREES, skyRotation } from './ambientMath.js';
/*
 * THE SUN: A DISTANT, BLINDING LIGHT SOURCE, SEEN BY A CAMERA THAT ORBITS THE EARTH.
 *
 * Not a textured ball and not a simulation: a point of white-hot light with a restrained bloom, a short starburst and, when it matters, a
 * lens flare - the look of a bright source in a cinematic orbital shot. It belongs to the CELESTIAL scene: it is fixed on the same sky sphere
 * as the stars (skyRotation), so when the camera orbits the planet - the idle drift, a swipe, a flight to a place - the Sun moves across the
 * view as a distant fixed source does, comes up to the Earth's limb, goes behind the planet and comes out the other side.
 *
 * AN ART-DIRECTED SOURCE, STATED. It is not the real Sun of the date (no ephemeris is claimed). But it IS the light of the scene: the Earth is shaded
 * from this Sun's direction (earthLightFor, below), so the side of the planet that faces the Sun is the lit side, the far side falls into shade through a
 * soft terminator, and a Sun behind the planet backlights it. It starts upper left of the planet, on the side the Earth's approved light came from, and the
 * light is the approved light there; from then on it follows the Sun round. Near the limb it also brightens the atmosphere on its own side (spill).
 *
 * WHERE IT STARTS. The Sun is fixed on the sky, but WHICH point of the sky is decided when the scene first settles: it is put at its reference place on the
 * screen (upper left, a little more than one Earth radius off the limb) for the pose the globe has at that moment (`anchor`), whatever place the globe
 * is turned to. So the Sun is in view at the start for everyone, and from then on it is where a fixed distant source would be: the camera's orbit carries it.
 * (The camera is a narrow portrait window - the Sun is in it for a small part of the sky - so without that it would be out of view most of the time.)
 *
 * WHAT THIS FILE DECIDES, ON THE CPU AND ONCE PER FRAME (a few multiplies, no ephemeris, no DOM): where the Sun is on the canvas, how much of its
 * disc the planet covers, and so how strong each part of the effect is. The shader (SUN_FRAGMENT) only paints what it is told.
 *   source   the disc and its corona, drawn BEFORE the planet, so the solid Earth hides it exactly - a half-hidden Sun has the planet's edge;
 *   lens     the glare, streak, ghosts and ring, a LENS effect, drawn over everything, in proportion to how much of the Sun can be seen;
 *   spill    how much the atmosphere's limb is lifted on the Sun's side (a local accent);
 *   light    the direction the Earth is lit from, in the view frame: always defined, even when the Sun itself is off the canvas.
 * Pure, so a test can hold it: no canvas, no clock.
 */
export const SUN = Object.freeze({
    /** The white-hot disc's radius, as a share of the canvas height: small - about eight pixels on a phone; its light is far larger than it is. */
    coreRadius: 0.0085,
    /**
     * Where the Sun starts, at the anchor pose: the angle of its direction from the Earth's centre on the screen (degrees, counter-clockwise from
     * the right) and its distance from it in Earth radii on the screen. Upper left, clear of the planet, a little over a radius off its limb - and on a
     * path that, as the camera orbits, goes on to graze the limb.
     */
    referenceAngleDegrees: 125,
    referenceDistance: 1.5,
    /** How far outside the canvas, as a share of its height, the Sun still throws light (glare and ghosts) into it. */
    glareReach: 0.32,
    /** How much of the lens effect a Sun in the clear keeps: the rest is added as it nears the limb. */
    openSkyShare: 0.6,
    /** The reach, in Earth radii, of the limb's boost on either side of the limb. */
    limbReach: 0.55,
});
/** tan of the half field of view (the renderer's own). */
const HALF_TAN = Math.tan((FOV_DEGREES * DEGREES) / 2);
/** What the Earth looks like on the screen at the reference framing (the Earth's diameter is 0.331 of the height): tan of its angular radius. */
const REFERENCE_EARTH_TANGENT = 0.331 * HALF_TAN;
/**
 * THE SUN IS ALWAYS DRAWN IN FULL. The ambient policy has a reduced profile for a constrained device (fewer octaves, no antialiasing, a lower frame rate) and it used to hand the
 * Sun that level too, which dropped the anamorphic streak, the large ring, two of the four lens ghosts and the fine rays. The Sun's look is the one thing a phone is meant to see
 * as richly as a desktop does, so the globe hands the Sun THIS level whatever the policy says; the policy still reduces everything else. The shader's `u_detail` branches stay
 * as they were (a caller that passes 'reduced' still gets the reduced Sun); only what the globe asks for changed.
 */
export const SUN_DETAIL = 'full';
const smoothstep = (from, to, x) => {
    const t = Math.min(1, Math.max(0, (x - from) / (to - from)));
    return t * t * (3 - 2 * t);
};
/**
 * The share of a disc of radius `r` whose centre is `d` from the centre of a circle of radius `R` that is NOT covered by that circle, 0..1:
 * the exact area of the intersection of two circles. 1 when they do not touch, 0 when the disc is wholly inside.
 */
export function discOutsideFraction(d, r, R) {
    if (d >= R + r)
        return 1;
    if (d <= R - r)
        return 0;
    if (d <= r - R)
        return 0;
    const a = r * r * Math.acos(Math.min(1, Math.max(-1, (d * d + r * r - R * R) / (2 * d * r))));
    const b = R * R * Math.acos(Math.min(1, Math.max(-1, (d * d + R * R - r * r) / (2 * d * R))));
    const c = 0.5 * Math.sqrt(Math.max(0, (-d + r + R) * (d + r - R) * (d - r + R) * (d + r + R)));
    return Math.min(1, Math.max(0, 1 - (a + b - c) / (Math.PI * r * r)));
}
export const SUN_REFERENCE_DEFAULT = Object.freeze({ angleDegrees: SUN.referenceAngleDegrees, distance: SUN.referenceDistance });
/** The Sun's fixed direction on the sky sphere, the one the stars are fixed on: the reference screen position carried through the sky's rotation at the anchor pose. */
function referenceSkyDirection(anchorYaw, anchorPitch, reference) {
    const angle = reference.angleDegrees * DEGREES;
    const offset = reference.distance * REFERENCE_EARTH_TANGENT;
    /* the view ray (x right, y up, the camera looking down -z), then the sky's frame: dir = u_sky * ray (the sky shader's own line) */
    const ray = [offset * Math.cos(angle), offset * Math.sin(angle), -1];
    const m = skyRotation(anchorYaw, anchorPitch);
    const dir = [0, 1, 2].map((row) => m[row] * ray[0] + m[3 + row] * ray[1] + m[6 + row] * ray[2]);
    const length = Math.hypot(dir[0], dir[1], dir[2]);
    return [dir[0] / length, dir[1] / length, dir[2] / length];
}
const DEFAULT_ANCHOR_PITCH = IDLE_PITCH_DEGREES * DEGREES;
/* Worked out once per anchor, not once per frame: the anchor is set once, when the scene settles. */
let cachedAnchor = { yaw: Number.NaN, pitch: Number.NaN, angle: Number.NaN, distance: Number.NaN, direction: [0, 0, -1] };
function skyDirectionFor(anchorYaw, anchorPitch, reference) {
    if (cachedAnchor.yaw !== anchorYaw || cachedAnchor.pitch !== anchorPitch || cachedAnchor.angle !== reference.angleDegrees || cachedAnchor.distance !== reference.distance) {
        cachedAnchor = { yaw: anchorYaw, pitch: anchorPitch, angle: reference.angleDegrees, distance: reference.distance, direction: referenceSkyDirection(anchorYaw, anchorPitch, reference) };
    }
    return cachedAnchor.direction;
}
/** The Sun's direction in the VIEW at this yaw and pitch: the sky's rotation undone (it is a rotation, so its transpose). x right, y up, z toward the viewer. */
export function sunViewDirection(yaw, pitch, anchorYaw = 0, anchorPitch = DEFAULT_ANCHOR_PITCH, reference = SUN_REFERENCE_DEFAULT) {
    const m = skyRotation(yaw, pitch);
    const d = skyDirectionFor(anchorYaw, anchorPitch, reference);
    return [m[0] * d[0] + m[1] * d[1] + m[2] * d[2], m[3] * d[0] + m[4] * d[1] + m[5] * d[2], m[6] * d[0] + m[7] * d[1] + m[8] * d[2]];
}
/* ------------------------------------------------------------------ *
 * THE EARTH'S LIGHT
 * ------------------------------------------------------------------ */
/*
 * THE LIGHT IS A CONSUMER OF THE SUN THAT IS DRAWN. Nothing here places, moves or sizes anything: the Sun's screen position and its path are decided above and are the
 * input. A body - the Earth, the Moon - is lit from the side of the screen the drawn Sun is on AS SEEN FROM THAT BODY, and from the depth the Sun's visual state gives:
 *   far in the clear  beside the body: the light is side-on (`sideAngleDegrees` from the viewer's axis, 90 = edge-on), so the lit side is the Sun's side and the
 *                     terminator runs straight through the body: a roughly half-lit sphere;
 *   up to the limb    the light swings round to behind: the lit side narrows to a slice;
 *   behind the body   backlight: the face is in shade, with a lit rim on the Sun's side (and the atmosphere's accent there);
 *   behind the camera the light comes round to the front, as a Sun at the viewer's back lights a face-on planet.
 * The Earth uses the Sun's distance from the planet's centre; the Moon uses the same rule with the direction and the distance taken from the Moon (lightForBodyAt), so a Sun
 * drawn to the Moon's left lights the Moon from the left, whatever side of the planet it is on.
 * Every step is a smoothstep of the Sun's distance, and the sideways part fades out as the Sun crosses the planet's centre (where "its side" is
 * undefined), so the shading never jumps. Pure: the same Sun gives the same light, and it is defined whether or not the Sun is on the canvas.
 */
export const EARTH_LIGHT = Object.freeze({
    /** The Sun's distance from the body's centre on the screen (Earth radii) at and beyond which the light is side-on. */
    farDistance: 1.5,
    /** The angle from the viewer's axis of the light with the Sun beside the body: 90 is edge-on, so the Sun's side is the lit side and the terminator runs through the middle. */
    sideAngleDegrees: 90,
    /** The angle from the viewer's axis with the Sun's centre ON the limb: edge-on, a touch behind. */
    limbAngleDegrees: 132,
    /** And with the Sun well behind the planet: nearly straight backlight, the lit part of the face a thin rim. */
    behindAngleDegrees: 172,
    /** How near the centre the Sun is when the backlight is complete (Earth radii). */
    behindDistance: 0.1,
    /** Below `centreTo` the sideways part of the light fades out, to nothing at `centreFrom`: a Sun crossing the centre cannot swing the shading. */
    centreFrom: 0.03,
    centreTo: 0.3,
});
const unitLight = (x, y, z) => {
    const length = Math.hypot(x, y, z) || 1;
    return [x / length, y / length, z / length];
};
/** The light for a Sun `distance` Earth radii from the planet's centre on the screen, on the side `(ux, uy)` (a unit direction, y up). */
export function earthLightFrom(distance, ux, uy) {
    const { farDistance, sideAngleDegrees, limbAngleDegrees, behindAngleDegrees, behindDistance, centreFrom, centreTo } = EARTH_LIGHT;
    const limbAngle = limbAngleDegrees * DEGREES;
    const sideAngle = sideAngleDegrees * DEGREES;
    const theta = distance >= 1
        ? sideAngle + (limbAngle - sideAngle) * smoothstep(farDistance, 1, distance)
        : limbAngle + (behindAngleDegrees * DEGREES - limbAngle) * smoothstep(1, behindDistance, distance);
    const side = Math.sin(theta) * smoothstep(centreFrom, centreTo, distance);
    return unitLight(ux * side, uy * side, Math.cos(theta));
}
/**
 * The light for a body whose centre is at (bodyX, bodyY) on the canvas (pixels, y DOWN), from the Sun drawn at (sunX, sunY): the direction on the screen is FROM THE BODY toward
 * the Sun, and the depth is the Sun's distance from the body in the BODY'S OWN radii (`bodyRadiusPx` of them: the Earth's, or the Moon's silhouette's). For the Earth (body at its
 * own centre) this is the Earth's light exactly; for the Moon it is the same rule seen from where the Moon is, and a Sun the Moon's own size away from it is what lights it edge-on.
 * Pure: it reads positions and sizes the scene already decided and moves nothing.
 */
export function lightForBodyAt(sunX, sunY, bodyX, bodyY, bodyRadiusPx) {
    const dx = sunX - bodyX;
    const dy = sunY - bodyY;
    const d = Math.hypot(dx, dy);
    const length = d || 1;
    return earthLightFrom(d / Math.max(1e-6, bodyRadiusPx), dx / length, -dy / length);
}
/** The light with the Sun behind the camera (or on its side plane), from the Sun's direction in the view (x right, y up, z toward the viewer): the front of the planet is lit. */
export function earthLightBehindCamera(view) {
    const sideways = Math.hypot(view[0], view[1]);
    const theta = Math.acos(Math.min(1, Math.max(-1, view[2])));
    const side = Math.sin(theta);
    if (sideways < 1e-9)
        return unitLight(0, 0, Math.cos(theta));
    return unitLight((view[0] / sideways) * side, (view[1] / sideways) * side, Math.cos(theta));
}
/*
 * THE SEA'S GLINT IS THE SUN'S, NOT THE LIGHT'S. The Earth's light (above) is art-directed: it is swung to the side the Sun is on, but to an angle of its own, so the
 * lit face reads. A mirror-like highlight cannot be taken from it - it would show a Sun in front of the planet's face while the Sun that is drawn is in the sky behind
 * it, which is the glossy-varnished-ball look. So the glint is worked out from where the real Sun is: the direction from the planet to the Sun, in the view frame
 * (the same for every point of the planet, the Sun being far), and the shader takes the half vector of that and the way to the eye, per pixel, as a mirror does.
 *
 * A Sun that is on the screen, or just off it, is behind the planet as the camera sees it: its half vector lies at the limb, there is nothing to glint on across the
 * face, and the weight is nothing. The weight rises only as the Sun comes round toward the camera's side (z of its direction in the view, toward the viewer):
 * nothing before `from`, whole by `to`. So the highlight can only appear where a Sun on that side would put one, and fades smoothly on the way.
 */
export const EARTH_GLINT = Object.freeze({
    /** z of the Sun's direction in the view (toward the viewer) at and below which there is no glint. A Sun that can be seen is at about -0.95. */
    from: -0.45,
    /** And at and above which the glint is whole: the Sun at the camera's side plane or behind it. */
    to: 0.10,
});
/** The Earth's glint input for a Sun in this direction in the view frame (x right, y up, z toward the viewer): its unit direction, and the weight (0 .. 1). */
export function earthGlintFor(view) {
    const length = Math.hypot(view[0], view[1], view[2]) || 1;
    const z = view[2] / length;
    return Object.freeze([view[0] / length, view[1] / length, z, smoothstep(EARTH_GLINT.from, EARTH_GLINT.to, z)]);
}
/**
 * The Sun for one frame - what to draw and what it lights. Deterministic in its inputs: the same yaw, pitch, canvas and override give the same Sun, with
 * no clock in it - so reduced motion, which holds the camera still, holds it still. The Earth's light is worked out from the same placement, in the same
 * pass: there is one Sun, and it is placed once.
 */
export function sunSceneFor(input) {
    const { pose, width, height } = input;
    const earthX = width * (pose.ndcX + 1) / 2;
    const earthY = height * (1 - pose.ndcY) / 2;
    const earthRadius = pose.radiusPx;
    let x;
    let y;
    const focal = (height / 2) / HALF_TAN;
    const override = input.override ?? null;
    let view;
    if (override) {
        if (override.kind === 'screen') {
            x = override.x * width;
            y = override.y * height;
        }
        else {
            x = earthX + override.distance * earthRadius * Math.cos(override.angleDegrees * DEGREES);
            y = earthY - override.distance * earthRadius * Math.sin(override.angleDegrees * DEGREES);
        }
        view = [(x - earthX) / focal, (earthY - y) / focal, -1];
    }
    else {
        view = sunViewDirection(input.yaw, input.pitch, input.anchorYaw, input.anchorPitch, input.reference);
        if (view[2] >= -1e-3)
            return { sun: null, light: earthLightBehindCamera(view), screen: null, glint: earthGlintFor(view) }; // at or behind the camera's side plane: it is not in front of the lens
        x = earthX + (focal * view[0]) / -view[2];
        y = earthY - (focal * view[1]) / -view[2];
    }
    const glint = earthGlintFor(view);
    const core = SUN.coreRadius * height;
    const dx = x - earthX;
    const dy = y - earthY;
    const d = Math.hypot(dx, dy);
    const length = d || 1;
    const light = earthLightFrom(d / earthRadius, dx / length, -dy / length);
    const outside = Math.hypot(Math.max(Math.abs(x - width / 2) - width / 2, 0), Math.max(Math.abs(y - height / 2) - height / 2, 0));
    const inFrame = 1 - smoothstep(0, SUN.glareReach * height, outside);
    if (inFrame <= 0)
        return { sun: null, light, screen: { x, y }, glint };
    const visible = discOutsideFraction(d, core, earthRadius);
    const visibleSmooth = smoothstep(0, 1, visible);
    /* 1 whenever the Sun touches or is behind the limb, falling away over `limbReach` Earth radii beyond it: the nearer the limb, the stronger the moment */
    const limb = Math.exp(-((Math.max(d - earthRadius - core, 0) / (SUN.limbReach * earthRadius)) ** 2));
    const lens = inFrame * visibleSmooth * (SUN.openSkyShare + (1 - SUN.openSkyShare) * limb);
    /* the atmosphere's accent: strongest with the Sun just behind the limb, a little less as it comes out, gone as it goes deep behind the planet or far away */
    const hidden = (1 - visibleSmooth) * Math.exp(-(Math.max(earthRadius - d, 0) / earthRadius) * 2.4);
    const spill = Math.min(1, inFrame * Math.max(hidden * 0.9, visibleSmooth * 0.55 * limb));
    return {
        sun: Object.freeze({
            x, y, coreRadius: core, source: inFrame, lens, limb, spill,
            directionX: dx / length, directionY: -dy / length, distance: d / earthRadius, visible, earthX, earthY, earthRadius, detail: input.detail ?? 'full',
        }),
        light,
        screen: { x, y },
        glint,
    };
}
/** The Sun's drawing for one frame, or null (see sunSceneFor). */
export function sunFor(input) {
    return sunSceneFor(input).sun;
}
/* ------------------------------------------------------------------ *
 * REVIEW OVERRIDE
 * ------------------------------------------------------------------ */
/*
 * QA ONLY. A reviewer cannot wait for the camera to carry the Sun round the planet, so the address can pin it:
 *   ?sun=visible | approach | limb | partial | hidden | emerge | edge      a named state
 *   ?sunangle=DEG[&sundist=K]       DEG counter-clockwise from the right on the screen, K Earth radii from the Earth's centre (default 1.12)
 * A pinned Sun does not move with the camera. Anything else in the address is ignored and the Sun is the celestial one. It is a review aid,
 * like ?moondate=: nothing reads it but sunOverrideFor, and it is to be removed with the other review controls before release.
 */
export const SUN_QUERY = 'sun';
export const SUN_ANGLE_QUERY = 'sunangle';
export const SUN_DISTANCE_QUERY = 'sundist';
export const SUN_PRESETS = Object.freeze({
    visible: { kind: 'polar', angleDegrees: 105, distance: 2.2 },
    approach: { kind: 'polar', angleDegrees: 112, distance: 1.55 },
    limb: { kind: 'polar', angleDegrees: 120, distance: 1.1 },
    partial: { kind: 'polar', angleDegrees: 125, distance: 1.0 },
    hidden: { kind: 'polar', angleDegrees: 125, distance: 0.45 },
    emerge: { kind: 'polar', angleDegrees: 35, distance: 1.06 },
    edge: { kind: 'screen', x: 0.06, y: 0.14 },
});
export function sunOverrideFor(search) {
    try {
        const params = new URLSearchParams(search);
        const named = params.get(SUN_QUERY);
        if (named && Object.prototype.hasOwnProperty.call(SUN_PRESETS, named))
            return SUN_PRESETS[named];
        const angle = params.get(SUN_ANGLE_QUERY);
        if (angle !== null && /^-?\d+(\.\d+)?$/.test(angle)) {
            const degrees = Number(angle);
            const asked = params.get(SUN_DISTANCE_QUERY);
            const distance = asked !== null && /^\d+(\.\d+)?$/.test(asked) ? Number(asked) : 1.12;
            if (Math.abs(degrees) <= 720 && distance <= 8)
                return { kind: 'polar', angleDegrees: degrees, distance };
        }
    }
    catch {
        /* an unreadable address is the celestial Sun */
    }
    return null;
}
