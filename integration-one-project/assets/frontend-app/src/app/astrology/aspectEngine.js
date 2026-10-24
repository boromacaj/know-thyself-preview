export const MAJOR_ASPECTS = [
    { name: 'Conjunction', angle: 0, harmonic: 'fusion' },
    { name: 'Sextile', angle: 60, harmonic: 'flow' },
    { name: 'Square', angle: 90, harmonic: 'tension' },
    { name: 'Trine', angle: 120, harmonic: 'flow' },
    { name: 'Opposition', angle: 180, harmonic: 'polarity' },
];
export const MINOR_ASPECTS = [
    { name: 'Semisextile', angle: 30, harmonic: 'adjustment' },
    { name: 'Semisquare', angle: 45, harmonic: 'friction' },
    { name: 'Sesquiquadrate', angle: 135, harmonic: 'friction' },
    { name: 'Quincunx', angle: 150, harmonic: 'adjustment' },
];
/**
 * THE ORB CONFIGURATION: every orb limit this engine applies, in one place.
 *
 * MAJOR aspects keep the limits the project has always used (they are by the BODIES involved: 8 degrees when a luminary is one of them, 6 when a personal or social
 * planet is, 4 for the outer planets and the nodes). They are listed here so that nothing else has to know them; they are not changed.
 *
 * MINOR aspects have their OWN, deliberately tighter, limits - they are never the major ones reused. A minor aspect is a faint relationship, so it earns a place in
 * the chart only when it is close to exact: 2 degrees for the semisextile (30), the semisquare (45) and the sesquiquadrate (135), and 3 for the quincunx (150), whose
 * wider orb is the traditional exception because it is the one minor aspect astrologers read as a full aspect. Every one is under the narrowest major limit (4), and
 * none of the four windows can touch another aspect's: the gaps between neighbouring aspect angles are at least 15 degrees.
 */
export const ASPECT_ORB_CONFIG = {
    major: { luminary: 8, personalOrSocial: 6, outer: 4 },
    minor: { Semisextile: 2, Semisquare: 2, Sesquiquadrate: 2, Quincunx: 3 },
};
/**
 * Chiron and the asteroids (the optional extended objects) are held to the NARROWEST major orb whoever the other body is: a minor body is a faint contact, and a Chiron
 * sextile Sun at 8 degrees would read as a luminary aspect it is not. This only ever applies to those names; the core bodies' orbs are untouched.
 */
export const EXTENDED_OBJECT_NAMES = new Set(['Chiron', 'Ceres', 'Pallas', 'Juno', 'Vesta']);
export const EXTENDED_OBJECT_MAJOR_ORB = 4;
const LUMINARIES = new Set(['Sun', 'Moon']);
const SOCIAL_AND_PERSONAL = new Set(['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn']);
export function calculateMajorAspects(positions) {
    const aspects = [];
    for (let leftIndex = 0; leftIndex < positions.length; leftIndex += 1) {
        for (let rightIndex = leftIndex + 1; rightIndex < positions.length; rightIndex += 1) {
            const left = positions[leftIndex];
            const right = positions[rightIndex];
            const actualAngle = angularDistance(left.longitude, right.longitude);
            const maxOrb = aspectOrbLimit(left.body, right.body);
            const match = closestAspect(actualAngle);
            const orb = round(Math.abs(actualAngle - match.angle));
            if (orb <= maxOrb) {
                aspects.push({
                    id: `${left.body}-${right.body}-${match.name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    bodyA: left.body,
                    bodyB: right.body,
                    aspect: match.name,
                    exactAngle: match.angle,
                    actualAngle: round(actualAngle),
                    orb,
                    maxOrb,
                    harmonic: match.harmonic,
                });
            }
        }
    }
    return aspects.sort((left, right) => left.orb - right.orb || left.actualAngle - right.actualAngle);
}
/**
 * Minor aspects (semisextile 30, semisquare 45, sesquiquadrate 135, quincunx 150) between every pair of the bodies given, by the orbs in ASPECT_ORB_CONFIG.minor.
 *
 * The same pair loop, the same shortest-arc angular distance and the same rounding as the major aspects, so a pair is judged exactly the way the major pairs are and a
 * body at 359 degrees and one at 1 degree are 2 degrees apart. The order is deterministic: tightest orb first, then the smaller actual angle, then the id - the id
 * is the tie-break the major aspects do not need, because two minors can be equally tight.
 */
export function calculateMinorAspects(positions) {
    const aspects = [];
    for (let leftIndex = 0; leftIndex < positions.length; leftIndex += 1) {
        for (let rightIndex = leftIndex + 1; rightIndex < positions.length; rightIndex += 1) {
            const left = positions[leftIndex];
            const right = positions[rightIndex];
            const actualAngle = angularDistance(left.longitude, right.longitude);
            for (const definition of MINOR_ASPECTS) {
                const maxOrb = ASPECT_ORB_CONFIG.minor[definition.name];
                const orb = round(Math.abs(actualAngle - definition.angle));
                if (orb > maxOrb)
                    continue;
                aspects.push({
                    id: `${left.body}-${right.body}-${definition.name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    bodyA: left.body,
                    bodyB: right.body,
                    aspect: definition.name,
                    category: 'minor',
                    exactAngle: definition.angle,
                    actualAngle: round(actualAngle),
                    orb,
                    maxOrb,
                    harmonic: definition.harmonic,
                });
            }
        }
    }
    return aspects.sort((left, right) => left.orb - right.orb || left.actualAngle - right.actualAngle || (left.id < right.id ? -1 : left.id > right.id ? 1 : 0));
}
export function angularDistance(leftLongitude, rightLongitude) {
    const difference = Math.abs(normalizeDegrees(leftLongitude) - normalizeDegrees(rightLongitude));
    return round(Math.min(difference, 360 - difference));
}
function closestAspect(angle) {
    return MAJOR_ASPECTS.reduce((closest, current) => (Math.abs(angle - current.angle) < Math.abs(angle - closest.angle) ? current : closest));
}
function aspectOrbLimit(bodyA, bodyB) {
    const limit = LUMINARIES.has(bodyA) || LUMINARIES.has(bodyB) ? ASPECT_ORB_CONFIG.major.luminary
        : SOCIAL_AND_PERSONAL.has(bodyA) || SOCIAL_AND_PERSONAL.has(bodyB) ? ASPECT_ORB_CONFIG.major.personalOrSocial
            : ASPECT_ORB_CONFIG.major.outer;
    return EXTENDED_OBJECT_NAMES.has(bodyA) || EXTENDED_OBJECT_NAMES.has(bodyB) ? Math.min(limit, EXTENDED_OBJECT_MAJOR_ORB) : limit;
}
function normalizeDegrees(value) {
    return ((value % 360) + 360) % 360;
}
function round(value, digits = 6) {
    const scale = 10 ** digits;
    return Math.round(value * scale) / scale;
}
