/*
 * THE AMBIENT GLOBE, AS ARITHMETIC.
 *
 * Everything here is a pure function: no canvas, no clock, no DOM. The
 * renderer asks it where the camera goes, where a place sits, how a flight
 * eases and what a device is allowed to spend - and a test can ask the same
 * questions without a GPU.
 *
 * ORIENTATION, SHARED WITH THE MESH. The sphere mesh puts longitude L and
 * latitude P at (cosP sinL, sinP, cosP cosL), and the model matrix is
 * rotateX(pitch) * rotateY(yaw). With yaw = -L and pitch = P that point lands
 * on the view axis - which is what `orientationFor` returns, and what the test
 * of this file projects through the real matrix to prove.
 */
export const DEGREES = Math.PI / 180;
/** Vertical field of view of the ambient camera. The same 35 degrees the Google globe uses. */
export const FOV_DEGREES = 35;
/** A calm, centred globe that leaves room for a card above and below it. */
export const RESTING_FRAMING = Object.freeze({ radius: 0.40, x: 0.5, y: 0.47 });
/*
 * THE SIZE AND PLACE THE PRODUCT ALREADY GIVES ITS EARTH.
 *
 * Everything drawn around the planet - the glow ring, the vessel symbol, the menu's frame - is laid out for the Google
 * globe, and that globe's size follows the HEIGHT of the scene (a 3D map has a fixed vertical field of view): the vessel
 * symbol that frames it measures 0.331 of the height (269 px on a 375x812 phone, 212 px on a 360x640 one), and its
 * centre is half way down. The hand-over frames the ambient globe to that same circle, so the ring still hugs the planet
 * instead of floating round a different-sized one, and the composition behind the cards is the one that was reviewed.
 * It is held inside the width, so a very narrow window cannot push the planet off the sides.
 */
const PRODUCT_EARTH_DIAMETER_OF_HEIGHT = 0.331;
const PRODUCT_EARTH_DIAMETER_MAX_OF_WIDTH = 0.82;
const PRODUCT_EARTH_CENTRE_Y = 0.5;
/** The framing that puts the globe where the Google one sits, for a scene of this size. */
export function framingForScene(width, height) {
    const shorter = Math.max(1, Math.min(width, height));
    const diameter = Math.min(height * PRODUCT_EARTH_DIAMETER_OF_HEIGHT, width * PRODUCT_EARTH_DIAMETER_MAX_OF_WIDTH);
    return { radius: diameter / 2 / shorter, x: 0.5, y: PRODUCT_EARTH_CENTRE_Y };
}
/** Where the opening zoom starts: a small, distant planet. */
export const DISTANT_FRAMING = Object.freeze({ radius: 0.075, x: 0.5, y: 0.47 });
/** The tilt the globe idles at, a little north of the equator so the northern continents read. */
export const IDLE_PITCH_DEGREES = 18;
/** A place is never brought further north or south than this, so the poles never fold toward the viewer. */
export const FOCUS_PITCH_LIMIT_DEGREES = 52;
export function ambientPolicy(input) {
    const reduced = input.detail === 'reduced' || (input.detail === 'auto' && input.constrained);
    const moving = input.ambient && !input.reducedMotion;
    return Object.freeze({
        idleRate: moving ? input.idleDegreesPerSecond * DEGREES : 0,
        drift: moving ? 1 : 0,
        twinkle: moving && !reduced ? 0.22 : 0,
        pulse: !input.reducedMotion,
        flightScale: input.reducedMotion ? 0 : 1,
        pixelRatioCap: reduced ? 1.25 : 2,
        octaves: reduced ? 3 : 5,
        cloudOctaves: reduced ? 3 : 5,
        starLayers: reduced ? 1 : 2,
        antialias: !reduced,
        maskWidth: reduced ? 1024 : 2048,
        frameIntervalMillis: reduced ? 33 : 0,
        detail: reduced ? 'reduced' : 'full',
    });
}
/* ------------------------------------------------------------------ *
 * CAMERA
 * ------------------------------------------------------------------ */
const toRadians = (degrees) => degrees * DEGREES;
/** Half the field of view as a tangent, across the screen and up it: the scale from a pixel to a view ray. */
export const fieldTangents = (aspect) => {
    const half = Math.tan(toRadians(FOV_DEGREES) / 2);
    return [half * aspect, half];
};
/**
 * Camera distance, in globe radii, at which the globe's silhouette is
 * `ndcRadius` tall in normalised device coordinates (1 = half the viewport
 * height). A sphere of radius 1 at distance D subtends asin(1/D), which a
 * perspective camera of field of view F projects to tan(asin(1/D)) / tan(F/2).
 */
export function cameraDistanceForRadius(ndcRadius, fovDegrees = FOV_DEGREES) {
    const halfTan = Math.tan(toRadians(fovDegrees) / 2);
    return 1 / Math.sin(Math.atan(Math.max(1e-4, ndcRadius) * halfTan));
}
/** The projected radius of the silhouette, as a fraction of half the viewport height: the inverse of the above. */
export function projectedRadius(distance, fovDegrees = FOV_DEGREES) {
    return Math.tan(Math.asin(1 / distance)) / Math.tan(toRadians(fovDegrees) / 2);
}
export function cameraFor(framing, width, height) {
    const w = Math.max(1, width);
    const h = Math.max(1, height);
    const radiusPx = framing.radius * Math.min(w, h);
    const ndcRadius = (2 * radiusPx) / h;
    const distance = cameraDistanceForRadius(ndcRadius);
    return {
        distance,
        ndcX: 2 * framing.x - 1,
        ndcY: 1 - 2 * framing.y,
        aspect: w / h,
        radiusPx,
    };
}
/**
 * A perspective projection, optionally lens-shifted: `ndcX` and `ndcY` are where a point on the optical axis lands on the
 * screen (0, 0 is the middle). The shift is a translation of the image plane, so nothing is stretched by it.
 */
export function perspective(fovDegrees, aspect, near, far, ndcX = 0, ndcY = 0) {
    const f = 1 / Math.tan(toRadians(fovDegrees) / 2);
    const out = new Float32Array(16);
    out[0] = f / aspect;
    out[5] = f;
    out[8] = -ndcX;
    out[9] = -ndcY;
    out[10] = (far + near) / (near - far);
    out[11] = -1;
    out[14] = (2 * far * near) / (near - far);
    return out;
}
/** The view matrix: the globe's centre straight ahead, `distance` along -Z. Where it lands on screen is the projection's lens shift. */
export function viewFor(pose) {
    const out = new Float32Array(16);
    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    out[14] = -pose.distance;
    return out;
}
/**
 * THE SKY AS A CELESTIAL SPHERE, TURNED BY THE CAMERA'S ORBIT.
 *
 * Stars, the Milky Way and the nebulae are fixed on a sphere at infinity around the Earth. What turns them, on screen, is
 * the camera going round the planet - the same motion that makes the planet's disc appear to rotate. The apparent turn of
 * the globe (yaw and pitch: the idle drift, a scroll, a drag, a flight to a place) is shared between the two things that
 * make it up: the CAMERA ORBIT, which carries the whole sky with it, and the planet's own spin, which carries only the
 * planet. `SKY_ORBIT_SHARE` is the camera's part. 0.4 means that when the globe appears to turn 2 degrees the camera has
 * orbited 0.8 of them: the sky sweeps (at infinity a turn of the view moves it by the whole angle, so at 0.4 it still
 * crosses the screen faster than the planet's face does), the planet turns fastest in angle, and nothing is a flat
 * wallpaper that the planet merely spins in front of.
 */
export const SKY_ORBIT_SHARE = 0.4;
/**
 * The matrix that takes a view-space ray to the sky sphere's own coordinates: the transpose of the camera's orbit rotation
 * (rotateX(share * pitch) * rotateY(share * yaw), the planet's own rotation order without its tilt). Column-major 3x3, the
 * order `uniformMatrix3fv` takes.
 */
export function skyRotation(yawRadians, pitchRadians, share = SKY_ORBIT_SHARE) {
    const orbit = modelRotation(yawRadians * share, pitchRadians * share, 0);
    const out = new Float32Array(9);
    for (let column = 0; column < 3; column += 1) {
        for (let row = 0; row < 3; row += 1)
            out[column * 3 + row] = orbit[row * 4 + column];
    }
    return out;
}
/** The Earth's axial tilt (obliquity), the reference NASA gives: about 23.44 degrees. */
export const AXIAL_TILT_DEGREES = 23.44;
/**
 * rotateZ(-tilt) * rotateX(pitch) * rotateY(yaw), written out.
 *
 * Read right to left, which is the order the vertices meet it: the globe SPINS about its own axis (yaw), that axis is then
 * tipped toward or away from the viewer (pitch: the view's latitude), and last the whole tipped planet is LEANED in the
 * screen plane by the axial tilt, so the north pole points up and to the right. The tilt is applied to the model, not to the
 * canvas: the sky, the light and the atmosphere's lighting stay put, and the spin stays a spin about the planet's own axis
 * (it never becomes a spin about the screen's vertical). `tiltRadians` of 0 is the untilted rotation the globe always had,
 * which a place-facing flight (orientationFor) assumes.
 */
export function modelRotation(yawRadians, pitchRadians, tiltRadians = 0) {
    const cy = Math.cos(yawRadians);
    const sy = Math.sin(yawRadians);
    const cp = Math.cos(pitchRadians);
    const sp = Math.sin(pitchRadians);
    /* rotateX(pitch) * rotateY(yaw), by column. */
    const columns = [
        [cy, sp * sy, -cp * sy],
        [0, cp, sp],
        [sy, -sp * cy, cp * cy],
    ];
    const ct = Math.cos(tiltRadians);
    const st = Math.sin(tiltRadians);
    const out = new Float32Array(16);
    columns.forEach(([x, y, z], column) => {
        /* rotateZ(-tilt): clockwise on screen. */
        out[column * 4] = ct * x + st * y;
        out[column * 4 + 1] = -st * x + ct * y;
        out[column * 4 + 2] = z;
        out[column * 4 + 3] = 0;
    });
    out[15] = 1;
    return out;
}
/** The point on the unit sphere for a latitude and longitude, in degrees: the mesh's own parametrisation. */
export function surfacePoint(latitude, longitude) {
    const phi = latitude * DEGREES;
    const lambda = longitude * DEGREES;
    return [Math.cos(phi) * Math.sin(lambda), Math.sin(phi), Math.cos(phi) * Math.cos(lambda)];
}
/** Whether a latitude and a longitude are on Earth. */
export function isOnEarth(latitude, longitude) {
    return typeof latitude === 'number' && typeof longitude === 'number'
        && Number.isFinite(latitude) && Number.isFinite(longitude)
        && Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180;
}
/** Yaw and pitch, in radians, that bring a place to the centre of the disc. */
export function orientationFor(latitude, longitude) {
    return { yaw: -longitude * DEGREES, pitch: latitude * DEGREES };
}
/**
 * Where a flight to a place ends. The longitude is brought exactly to the
 * middle; the latitude is eased toward it but never past the limit, so the
 * poles stay where they belong and a place near one is simply as far as the
 * tilt goes.
 */
export function focusTarget(latitude) {
    const limit = FOCUS_PITCH_LIMIT_DEGREES;
    return Math.max(-limit, Math.min(limit, latitude)) * DEGREES;
}
/** The signed shortest turn from one angle to another, in (-PI, PI]. */
export function shortestTurn(from, to) {
    const full = Math.PI * 2;
    let turn = (to - from) % full;
    if (turn > Math.PI)
        turn -= full;
    if (turn <= -Math.PI)
        turn += full;
    return turn;
}
export const easeInOutCubic = (t) => {
    const x = Math.min(1, Math.max(0, t));
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
export const easeOutCubic = (t) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
/** A flight from the current orientation to a place. A zero scale makes it a jump. */
export function planFlight(from, latitude, longitude, now, flightScale) {
    const target = orientationFor(latitude, longitude);
    const turnYaw = shortestTurn(from.yaw, target.yaw);
    const turnPitch = focusTarget(latitude) - from.pitch;
    const angle = Math.hypot(turnYaw, turnPitch);
    /* Longer turns take longer, between a second and a half and three and a half, so a short hop is not a lurch. */
    const duration = flightScale === 0 ? 0 : (1500 + Math.min(1, angle / Math.PI) * 2000) * flightScale;
    return { startYaw: from.yaw, startPitch: from.pitch, turnYaw, turnPitch, startedAt: now, durationMillis: duration };
}
/** The orientation part-way through a flight. */
export function flightAt(flight, now) {
    const t = flight.durationMillis === 0 ? 1 : (now - flight.startedAt) / flight.durationMillis;
    const eased = easeInOutCubic(t);
    return {
        yaw: flight.startYaw + flight.turnYaw * eased,
        pitch: flight.startPitch + flight.turnPitch * eased,
        done: t >= 1,
    };
}
/* ------------------------------------------------------------------ *
 * PICKING
 * ------------------------------------------------------------------ */
/**
 * The latitude and longitude under a point of the canvas, or null when the
 * point is on the sky. A ray from the camera through the point is intersected
 * with the globe, and the hit is carried back through the model rotation.
 *
 * `pixelX` and `pixelY` are measured from the top-left of a canvas of the
 * given size; the pose is the one the frame was drawn with.
 */
export function pickLocation(pixelX, pixelY, width, height, pose, yaw, pitch, tilt = 0) {
    const halfTan = Math.tan(toRadians(FOV_DEGREES) / 2);
    const ndcX = (2 * pixelX) / width - 1;
    const ndcY = 1 - (2 * pixelY) / height;
    /* The ray, in view space, from a camera at the origin looking down -Z; the lens shift moves where the axis lands on screen. */
    const dx = (ndcX - pose.ndcX) * halfTan * pose.aspect;
    const dy = (ndcY - pose.ndcY) * halfTan;
    const dz = -1;
    const length = Math.hypot(dx, dy, dz);
    const d = [dx / length, dy / length, dz / length];
    /* The globe's centre in view space: straight ahead. */
    const c = [0, 0, -pose.distance];
    const along = d[0] * c[0] + d[1] * c[1] + d[2] * c[2];
    const discriminant = along * along - (c[0] * c[0] + c[1] * c[1] + c[2] * c[2] - 1);
    if (discriminant < 0)
        return null;
    const s = along - Math.sqrt(discriminant);
    if (s <= 0)
        return null;
    const hit = [s * d[0] - c[0], s * d[1] - c[1], s * d[2] - c[2]];
    /* The model rotation is orthonormal, so its inverse is its transpose. */
    const m = modelRotation(yaw, pitch, tilt);
    const x = m[0] * hit[0] + m[1] * hit[1] + m[2] * hit[2];
    const y = m[4] * hit[0] + m[5] * hit[1] + m[6] * hit[2];
    const z = m[8] * hit[0] + m[9] * hit[1] + m[10] * hit[2];
    return {
        latitude: Math.asin(Math.max(-1, Math.min(1, y))) / DEGREES,
        longitude: Math.atan2(x, z) / DEGREES,
    };
}
/** Rounds a coordinate to the 4 decimals a place is stored with. */
export const roundedCoordinate = (value) => Math.round(value * 10_000) / 10_000;
/* ------------------------------------------------------------------ *
 * THE MOON
 * ------------------------------------------------------------------ */
/*
 * THE MOON OF THE 3c1fd4a REVIEW BUILD - THE ONE THE OWNER CHOSE - AS A COMPANION IN THE SAME SCENE, SIMPLIFIED.
 *
 * The real Moon is sixty Earth radii away and would be a speck, off the screen, in this framing. So the ambient scene gives it a
 * stylised orbit that reads as one: a circle, seen almost edge-on, in a plane leaning across the screen, drawn in the view's own
 * frame (x right, y up, z toward the viewer, the Earth at the origin, units of Earth radii). Its numbers are exactly those of the
 * build integration/one-project had at 3c1fd4a (earlier Moons - 0.075, 0.145 R, an Earth-centred orbit with a depth flatten, a real-date
 * phase - were tried after it and set aside by the owner: this is the look he wants). Three properties are deliberate.
 *
 *   BEHIND. The circle is centred BEHIND the planet (`centre`), so the moon is never between the viewer and the Earth: it goes
 *           round the planet's back, passing behind the disc twice a lap and coming out on the other side. The planet is drawn
 *           over it, so no depth buffer is needed and the Earth's own depth range is untouched. (`front` is therefore always false.)
 *   DEPTH.  A moon on the far side of its orbit is farther away: perspective makes it smaller, and `brightness` makes it dimmer.
 *           That is what lets a flat path read as going round, not sliding across. The position is projected as it is - no flatten.
 *   ALIVE.  The phase advances with time (a lap in `periodSeconds`) and with the planet's turn (`yawCoupling`), so a swipe that
 *           spins the Earth also carries the moon along its orbit. When motion is off it rests at a visible place, not behind.
 *
 * ITS LIGHT AND ITS FACE ARE THE SHADER'S (MOON_FRAGMENT): it is lit by the scene's fixed light, as it was, and its near side faces the Earth.
 * Neither is the Sun of the scene (ambientSun.ts) - the Earth's light follows the Sun, the Moon's does not - and nothing here reads the real date.
 *
 * Pure, so a test can hold it: no canvas, no clock.
 */
/** The scene's sun: the direction toward the light, in the view frame. ambientShaders.ts's LIGHTING.direction is the same vector (a test holds them equal). */
export const SCENE_SUN_DIRECTION = Object.freeze([-0.52, 0.46, 0.42]);
export const MOON = Object.freeze({
    /** The moon's radius, in Earth radii: a little under the real 0.27, so it stays a companion and not a rival. (3c1fd4a: 0.18.) */
    radius: 0.18,
    /** The orbit's radius, in Earth radii. */
    orbitRadius: 2.2,
    /** The orbit's centre in the view's frame: behind the planet, a touch above its middle. */
    centre: Object.freeze([0, 0.1, -1.8]),
    /** The angle of the orbit's long axis on the screen, degrees from horizontal: steep, because the screen is a portrait. */
    axisDegrees: 62,
    /** How far the orbit's plane is tipped out of the screen, degrees: near edge-on, so the path is a narrow loop. */
    tiltDegrees: 70,
    /** Seconds for a lap. Slow enough to be calm, quick enough to be seen moving. */
    periodSeconds: 96,
    /** Radians of orbit per radian of the planet's yaw: a swipe moves the moon along its path. */
    yawCoupling: 0.3,
    /** Where on the orbit it rests when motion is off: upper right of the planet, clear of the disc. */
    restPhase: 0.3,
});
/**
 * `startPhase` is where on the orbit it is at time 0 (and where it rests with motion off): the default is the reference's own `MOON.restPhase`; the scene's start
 * composition (ambientStart.ts) may hand in another, worked out once, so that it is in view, clear of the Earth and of the interface when the scene first settles.
 * It moves where the Moon STARTS and nothing about how it goes: the lap, the path and the planet's pull on it are the reference's.
 */
export function moonFor(timeSeconds, yawRadians, moving, startPhase = MOON.restPhase) {
    const phase = startPhase
        + (moving ? (Math.PI * 2 * timeSeconds) / MOON.periodSeconds : 0)
        + MOON.yawCoupling * yawRadians;
    const axis = MOON.axisDegrees * DEGREES;
    const tilt = MOON.tiltDegrees * DEGREES;
    /* Two orthonormal axes of the orbit's plane: the long axis lies in the screen; the other leans out of it by the tilt. */
    const ex = [Math.cos(axis), Math.sin(axis), 0];
    const ey = [-Math.sin(axis) * Math.cos(tilt), Math.cos(axis) * Math.cos(tilt), Math.sin(tilt)];
    const c = Math.cos(phase) * MOON.orbitRadius;
    const s = Math.sin(phase) * MOON.orbitRadius;
    const position = [
        MOON.centre[0] + c * ex[0] + s * ey[0],
        MOON.centre[1] + c * ex[1] + s * ey[1],
        MOON.centre[2] + c * ex[2] + s * ey[2],
    ];
    /* Nearest point of the orbit -> 1, farthest -> about 0.55. */
    const depth = Math.min(1, Math.max(0, (position[2] - (MOON.centre[2] - MOON.orbitRadius)) / (2 * MOON.orbitRadius)));
    return { position, radius: MOON.radius, brightness: 0.55 + 0.45 * depth, front: false };
}
