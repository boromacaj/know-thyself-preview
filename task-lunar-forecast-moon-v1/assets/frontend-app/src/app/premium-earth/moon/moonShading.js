/*
 * THE MOON AS SEEN FROM THE EARTH ON A GIVEN DAY, AS ARITHMETIC.
 *
 * One definition of what a pixel of the Moon looks like, from the phase alone. The WebGL shader (moonStage.ts) is written from these formulas line for line, the 2D fallback calls this
 * file, and tests/lunarForecastMoon.test.mjs measures the lit share of the picture it draws against the illuminated fraction the Forecast already states for the same date.
 *
 * WHAT COMES IN. The phase ANGLE the Forecast already has (numerology-forecast/lunarGuidance.moonPhaseFor, astronomy-engine's MoonPhase): the ecliptic longitude of the Moon minus the
 * Sun's, 0 at new, 90 first quarter, 180 full, 270 last quarter. NOTHING about the phase is worked out here: this file only turns that angle into light.
 *
 * THE LIGHT. Looking at the Moon, z points at the viewer, x to the right, y up (north). The Sun's direction from the Moon, seen from the Earth, is
 *     L = (sin E, 0, -cos E)        E = the phase angle above
 * which is (0, 0, -1) at new (the Sun is behind the Moon: its face is dark), (1, 0, 0) at first quarter (the Sun is to the right: the right half is lit), (0, 0, 1) at full (the
 * Sun is behind the viewer: the whole face is lit) and (-1, 0, 0) at last quarter. The lit part of the disc is the set of points whose surface normal faces the Sun, n . L > 0; its edge, the
 * terminator, is the ellipse x = cos(E') * sqrt(1 - y^2) and NOT a line at the illuminated fraction - the two are different things (the fraction is the AREA of the lit part).
 *
 * THE SURFACE. The visible face is the sphere seen from the Earth, north up, centre on longitude 0, latitude 0 (the Moon's libration, which tilts it by a few degrees either way during a month,
 * is NOT modelled: the picture is the Moon as seen at mean libration, and the interface does not claim more). A point (x, y) of the disc is at latitude asin(y) and longitude atan2(x, z) on
 * the map (east, the side of Mare Crisium, to the right). Southern hemisphere: the Moon is upside down there, so the map is turned half a turn and the Sun's side with it (see \`observer\`).
 *
 * THE PHOTOMETRY. The Moon is not a Lambertian ball: it is dark and rough, and a Full Moon is flat and bright, not shaded like a billiard ball. The brightness is Lommel-Seeliger,
 *     I = albedo * 2 * m0 / (m0 + m)          m0 = n . L (towards the Sun), m = n . V = z (towards the viewer)
 * with the surface normal bent by the elevation map (relief, strongest near the terminator where the Sun is low, which is what makes the craters read), a few degrees of softness at the
 * terminator so it does not alias, and a faint earthshine on the dark side that is strongest near New Moon, so a New Moon is MOSTLY dark and not an empty hole.
 */
export const RADIANS = Math.PI / 180;
/**
 * The Sun's direction from the Moon in the viewer's frame, for the Forecast's phase angle (degrees, 0 new, 90 first quarter, 180 full, 270 last quarter). The Southern Hemisphere sees the whole
 * picture turned half a turn, so the Sun's side turns with it: the waxing Moon is lit on the left there.
 */
export function sunDirection(phaseAngleDegrees, observer = 'north') {
    const e = phaseAngleDegrees * RADIANS;
    return [observer === 'south' ? -Math.sin(e) : Math.sin(e), 0, -Math.cos(e)];
}
export const RELIEF_STRENGTH = 3.2;
export const EARTHSHINE = 0.004;
export const TERMINATOR_SOFTNESS = 0.05;
export const EXPOSURE = 1.22;
export const SATURATION = 0.62;
const clamp01 = (value) => Math.min(1, Math.max(0, value));
const smoothstep = (edge0, edge1, x) => {
    const t = clamp01((x - edge0) / (edge1 - edge0));
    return t * t * (3 - 2 * t);
};
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const normalise = (v) => {
    const length = Math.hypot(v[0], v[1], v[2]) || 1;
    return [v[0] / length, v[1] / length, v[2] / length];
};
/** The map's coordinates of a point on the visible face: u from the left edge (longitude -180) to the right, v from the top (north pole) down. Input is a unit normal in the MAP frame. */
export function mapCoordinates(n) {
    return { u: 0.5 + Math.atan2(n[0], n[2]) / (2 * Math.PI), v: 0.5 - Math.asin(Math.min(1, Math.max(-1, n[1]))) / Math.PI };
}
const toLinear = (c) => Math.pow(clamp01(c), 2.2);
const toSrgb = (c) => Math.pow(clamp01(c), 1 / 2.2);
/**
 * One pixel of the disc. (x, y) are in units of the Moon's radius from its centre, y up; `radiusPixels` sets the width of the antialiased limb. Returns sRGB 0..1 and coverage.
 */
export function moonPixel(x, y, light, observer, samplers, radiusPixels) {
    const r = Math.hypot(x, y);
    const coverage = clamp01((1 - r) * radiusPixels + 0.5);
    if (coverage <= 0)
        return { r: 0, g: 0, b: 0, a: 0 };
    const rc = Math.min(r, 0.9999);
    const z = Math.sqrt(1 - rc * rc);
    const scale = r > 0.9999 ? 0.9999 / r : 1;
    /* the normal in the viewer's frame, and in the map's frame (turned half a turn for the Southern Hemisphere) */
    const nView = [x * scale, y * scale, z];
    const south = observer === 'south';
    const nMap = south ? [-nView[0], -nView[1], nView[2]] : nView;
    const sun = light;
    const { u, v } = mapCoordinates(nMap);
    const albedoSrgb = samplers.colour(u, v);
    const grey = 0.2126 * toLinear(albedoSrgb[0]) + 0.7152 * toLinear(albedoSrgb[1]) + 0.0722 * toLinear(albedoSrgb[2]);
    const albedo = [0, 1, 2].map((i) => grey + (toLinear(albedoSrgb[i]) - grey) * SATURATION);
    /* relief: the elevation gradient bends the map-frame normal, east and north */
    const [du, dv] = samplers.texel;
    const gradU = (samplers.height(u + du, v) - samplers.height(u - du, v)) * 0.5;
    const gradV = (samplers.height(u, v - dv) - samplers.height(u, v + dv)) * 0.5;
    const cosLat = Math.max(Math.sqrt(1 - nMap[1] * nMap[1]), 0.18);
    const east = normalise([nMap[2], 0, -nMap[0]]);
    const north = normalise([-nMap[0] * nMap[1], 1 - nMap[1] * nMap[1], -nMap[2] * nMap[1]]);
    const bendE = (gradU / cosLat) * RELIEF_STRENGTH * 6;
    const bendN = gradV * RELIEF_STRENGTH * 6;
    const bentMap = normalise([nMap[0] - bendE * east[0] - bendN * north[0], nMap[1] - bendE * east[1] - bendN * north[1], nMap[2] - bendE * east[2] - bendN * north[2]]);
    const bent = south ? [-bentMap[0], -bentMap[1], bentMap[2]] : bentMap;
    /* the geometric terminator uses the smooth sphere, so the relief cannot cut the shape of the phase */
    const geometric = dot(nView, sun);
    const lit = smoothstep(0, TERMINATOR_SOFTNESS, geometric);
    const m0 = Math.max(dot(bent, sun), 0);
    const m = Math.max(z, 0.04);
    const direct = lit * (2 * m0) / (m0 + m + 1e-4);
    /* earthshine: strongest at New Moon, gone at Full, only on the part the Sun does not light */
    const fullness = (1 + sun[2]) / 2;
    const shine = EARTHSHINE * (1 - fullness) * (1 - lit);
    const out = albedo.map((a) => toSrgb(a * EXPOSURE * (direct + shine)));
    return { r: out[0], g: out[1], b: out[2], a: coverage };
}
/** The fraction of the disc that is lit, from the geometry alone: the area where the sphere faces the Sun. Computed on a grid so it can be compared with the illuminated fraction a date is stated to have. */
export function litShareOfDisc(light, resolution = 240) {
    let lit = 0;
    let total = 0;
    for (let iy = 0; iy < resolution; iy += 1) {
        for (let ix = 0; ix < resolution; ix += 1) {
            const x = ((ix + 0.5) / resolution) * 2 - 1;
            const y = ((iy + 0.5) / resolution) * 2 - 1;
            const r2 = x * x + y * y;
            if (r2 > 1)
                continue;
            total += 1;
            if (x * light[0] + y * light[1] + Math.sqrt(1 - r2) * light[2] > 0)
                lit += 1;
        }
    }
    return total === 0 ? 0 : lit / total;
}
/** The signed shortest way round from one phase angle to another, degrees in (-180, 180]. */
export function shortestPhaseDelta(fromDegrees, toDegrees) {
    return ((((toDegrees - fromDegrees) % 360) + 540) % 360) - 180;
}
/** A phase angle part of the way from one to another along the shortest path, t in [0, 1] already eased by the caller. */
export function interpolatePhaseAngle(fromDegrees, toDegrees, t) {
    return (((fromDegrees + shortestPhaseDelta(fromDegrees, toDegrees) * clamp01(t)) % 360) + 360) % 360;
}
/** Ease in and out: a quiet start and a quiet stop. */
export const easeInOut = (t) => {
    const x = clamp01(t);
    return x * x * (3 - 2 * x);
};
