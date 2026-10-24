import { EclipticGeoMoon } from 'astronomy-engine';
/**
 * Shared true (osculating) lunar ascending node calculation, derived locally from the
 * lunar state vector (matches the Swiss Ephemeris SE_TRUE_NODE convention). Originally
 * built for Human Design (frontend-app/src/app/human-design/humanDesignEngine.ts) and
 * reused here for Western Astrology's North/South Node so the two pillars never diverge
 * on node methodology or duplicate the ephemeris math.
 */
const TRUE_NODE_SAMPLE_DAYS = 0.01;
const MILLISECONDS_PER_DAY = 86_400_000;
const RADIANS_PER_DEGREE = Math.PI / 180;
const DEGREES_PER_RADIAN = 180 / Math.PI;
export function trueNorthNodeLongitude(date) {
    const sampleOffsetMilliseconds = TRUE_NODE_SAMPLE_DAYS * MILLISECONDS_PER_DAY;
    const position = moonEclipticVector(date);
    const before = moonEclipticVector(new Date(date.getTime() - sampleOffsetMilliseconds));
    const after = moonEclipticVector(new Date(date.getTime() + sampleOffsetMilliseconds));
    const velocity = {
        x: (after.x - before.x) / (2 * TRUE_NODE_SAMPLE_DAYS),
        y: (after.y - before.y) / (2 * TRUE_NODE_SAMPLE_DAYS),
        z: (after.z - before.z) / (2 * TRUE_NODE_SAMPLE_DAYS),
    };
    const angularMomentum = {
        x: position.y * velocity.z - position.z * velocity.y,
        y: position.z * velocity.x - position.x * velocity.z,
    };
    const ascendingNode = {
        x: -angularMomentum.y,
        y: angularMomentum.x,
    };
    if (!Number.isFinite(ascendingNode.x) || !Number.isFinite(ascendingNode.y)
        || Math.hypot(ascendingNode.x, ascendingNode.y) === 0) {
        throw new Error('True lunar node could not be resolved from the lunar state vector.');
    }
    return normalizeDegrees(Math.atan2(ascendingNode.y, ascendingNode.x) * DEGREES_PER_RADIAN);
}
function moonEclipticVector(date) {
    const moon = EclipticGeoMoon(date);
    const longitude = moon.lon * RADIANS_PER_DEGREE;
    const latitude = moon.lat * RADIANS_PER_DEGREE;
    const projectedDistance = moon.dist * Math.cos(latitude);
    return {
        x: projectedDistance * Math.cos(longitude),
        y: projectedDistance * Math.sin(longitude),
        z: moon.dist * Math.sin(latitude),
    };
}
function normalizeDegrees(value) {
    return ((value % 360) + 360) % 360;
}
