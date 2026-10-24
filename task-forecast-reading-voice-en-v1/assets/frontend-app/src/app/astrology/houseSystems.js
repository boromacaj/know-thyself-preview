export const HOUSE_SYSTEM_IDS = ['whole-sign', 'equal', 'porphyry', 'placidus'];
export const DEFAULT_HOUSE_SYSTEM = 'whole-sign';
export const HOUSE_SYSTEMS = {
    'whole-sign': { id: 'whole-sign', label: 'Whole Sign', method: 'Each house is one whole zodiac sign, the first being the Ascendant\'s sign; the cusp of every house is 0 degrees of its sign.' },
    equal: { id: 'equal', label: 'Equal House', method: 'Twelve 30-degree houses counted from the exact Ascendant degree; the Midheaven is not the 10th cusp.' },
    porphyry: { id: 'porphyry', label: 'Porphyry', method: 'Each quadrant between two angles (Ascendant, Imum Coeli, Descendant, Midheaven) is divided into three equal arcs of the ecliptic; cusps 1, 4, 7 and 10 are the angles.' },
    placidus: { id: 'placidus', label: 'Placidus', method: 'Time-based: each intermediate cusp (11, 12, 2, 3) divides its own ecliptic point\'s diurnal semi-arc into thirds, solved by fixed-point iteration from the local sidereal time, the obliquity and the latitude; cusps 5, 6, 8 and 9 are the opposites.' },
};
/** The latitude beyond which Placidus has no solution: where an ecliptic point can stay above or below the horizon all day. */
export function placidusLatitudeLimit(obliquityDegrees) {
    return 90 - obliquityDegrees;
}
export function calculateHouseCusps(system, angles) {
    const ascendant = angles.ascendant.longitude;
    const midheaven = angles.midheaven.longitude;
    switch (system) {
        case 'whole-sign': {
            const start = angles.ascendant.signIndex * 30;
            return ok(system, Array.from({ length: 12 }, (_, index) => normalize(start + index * 30)));
        }
        case 'equal':
            return ok(system, Array.from({ length: 12 }, (_, index) => normalize(ascendant + index * 30)));
        case 'porphyry':
            return ok(system, porphyryCusps(ascendant, midheaven));
        case 'placidus':
            return placidusCusps(angles);
        default:
            return { available: false, system, reason: 'Unknown house system.' };
    }
}
/** Which house (1-12) a longitude falls in, for any system's cusps: the house whose cusp it has passed and whose next cusp it has not. */
export function houseForLongitude(cusps, longitude) {
    const point = normalize(longitude);
    for (let index = 0; index < 12; index += 1) {
        const start = cusps[index];
        const end = cusps[(index + 1) % 12];
        const span = normalize(end - start);
        const offset = normalize(point - start);
        if (offset < span)
            return index + 1;
    }
    return 12;
}
function ok(system, cusps) {
    return { available: true, result: { system, cusps: cusps.map((value) => round(normalize(value))) } };
}
function porphyryCusps(ascendant, midheaven) {
    const descendant = normalize(ascendant + 180);
    const imumCoeli = normalize(midheaven + 180);
    /* The arcs run in the direction the houses count (increasing longitude): Ascendant -> IC (houses 1-3), IC -> Descendant (4-6), Descendant -> MC (7-9), MC -> Ascendant (10-12). */
    const first = normalize(imumCoeli - ascendant);
    const second = normalize(descendant - imumCoeli);
    const third = normalize(midheaven - descendant);
    const fourth = normalize(ascendant - midheaven);
    return [
        ascendant, ascendant + first / 3, ascendant + (2 * first) / 3,
        imumCoeli, imumCoeli + second / 3, imumCoeli + (2 * second) / 3,
        descendant, descendant + third / 3, descendant + (2 * third) / 3,
        midheaven, midheaven + fourth / 3, midheaven + (2 * fourth) / 3,
    ];
}
const PLACIDUS_MAX_ITERATIONS = 200;
const PLACIDUS_TOLERANCE_DEGREES = 1e-10;
function placidusCusps(angles) {
    const obliquity = angles.obliquityDegrees;
    const latitude = angles.latitude;
    const limit = placidusLatitudeLimit(obliquity);
    if (Math.abs(latitude) >= limit) {
        return {
            available: false,
            system: 'placidus',
            reason: `Placidus has no solution at latitude ${latitude.toFixed(2)}: it needs every ecliptic point to rise and set, which holds only between ${(-limit).toFixed(2)} and ${limit.toFixed(2)} degrees (the polar circles).`,
        };
    }
    const ramc = angles.localSiderealTimeDegrees;
    /* Houses 11 and 12 are EAST of the meridian (right ascension above the RAMC) in the upper half; the points that become cusps 9 and 8 are WEST of it. */
    const cusp11 = placidusIntermediate(ramc, obliquity, latitude, 1, 1 / 3);
    const cusp12 = placidusIntermediate(ramc, obliquity, latitude, 1, 2 / 3);
    const cusp9 = placidusIntermediate(ramc, obliquity, latitude, -1, 1 / 3);
    const cusp8 = placidusIntermediate(ramc, obliquity, latitude, -1, 2 / 3);
    if (cusp11 === null || cusp12 === null || cusp9 === null || cusp8 === null) {
        return { available: false, system: 'placidus', reason: 'Placidus did not converge at this latitude and time.' };
    }
    const ascendant = angles.ascendant.longitude;
    const midheaven = angles.midheaven.longitude;
    const cusps = [
        ascendant, cusp8 + 180, cusp9 + 180, midheaven + 180, cusp11 + 180, cusp12 + 180,
        ascendant + 180, cusp8, cusp9, midheaven, cusp11, cusp12,
    ];
    return ok('placidus', cusps);
}
/**
 * One Placidus intermediate cusp: the ecliptic longitude whose right ascension is the RAMC plus (east) or minus (west) a fixed fraction of that very point's diurnal
 * semi-arc. The semi-arc depends on the declination, which depends on the longitude, so it is a fixed-point iteration; it is a contraction between the polar circles.
 * Returns null if it fails to settle.
 */
function placidusIntermediate(ramc, obliquity, latitude, direction, fraction) {
    const epsilon = radians(obliquity);
    const phi = radians(latitude);
    let rightAscension = ramc + direction * fraction * 90;
    for (let iteration = 0; iteration < PLACIDUS_MAX_ITERATIONS; iteration += 1) {
        const longitude = Math.atan2(Math.sin(radians(rightAscension)), Math.cos(radians(rightAscension)) * Math.cos(epsilon));
        const declination = Math.asin(Math.sin(epsilon) * Math.sin(longitude));
        const cosSemiArc = -Math.tan(phi) * Math.tan(declination);
        if (cosSemiArc <= -1 || cosSemiArc >= 1)
            return null;
        const semiArc = degrees(Math.acos(cosSemiArc));
        const next = ramc + direction * fraction * semiArc;
        if (Math.abs(next - rightAscension) < PLACIDUS_TOLERANCE_DEGREES) {
            const settled = radians(next);
            return normalize(degrees(Math.atan2(Math.sin(settled), Math.cos(settled) * Math.cos(epsilon))));
        }
        rightAscension = next;
    }
    return null;
}
function normalize(value) {
    return ((value % 360) + 360) % 360;
}
function radians(value) {
    return (value * Math.PI) / 180;
}
function degrees(value) {
    return (value * 180) / Math.PI;
}
function round(value, digits = 6) {
    const scale = 10 ** digits;
    return Math.round(value * scale) / scale;
}
