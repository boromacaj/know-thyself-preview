/**
 * Local, deterministic ephemeris provider for Chiron, Ceres, Pallas, Juno and Vesta.
 *
 * astronomy-engine has no minor-body ephemeris, so each object's heliocentric motion is
 * integrated numerically from JPL Horizons state-vector seeds (see extendedObjectSeeds.ts),
 * using planet positions from astronomy-engine's own HelioVector. The apparent geocentric
 * place is then produced with the SAME light-time + aberration + true-ecliptic-of-date
 * pipeline that astronomy-engine uses for GeoVector(body, date, true) -> Ecliptic(), so the
 * longitudes sit in exactly the frame of the core planets. No network, no secrets, no tables
 * of final positions: only seeds + physics. See docs/astrology/EXTENDED_OBJECTS_PROVIDER.md.
 */
import { AstroTime, Body, C_AUDAY, Ecliptic, GeoVector, HelioVector, MakeTime, Vector, } from 'astronomy-engine';
import { EXTENDED_OBJECT_SEEDS } from './extendedObjectSeeds.js?v=53c0693';
export const EXTENDED_OBJECT_IDS = ['Chiron', 'Ceres', 'Pallas', 'Juno', 'Vesta'];
export const EXTENDED_PROVIDER_ID = 'jpl-horizons-seeded-nbody/1';
/** Accuracy gate required of every object over its whole supported range (arcseconds). */
export const EXTENDED_ACCURACY_GATE_ARCSEC = 60;
/** Supported range, inclusive. Seeds exist for 1880..2120; the longest integration is 10 years. */
export const EXTENDED_SUPPORTED_FROM_ISO = '1890-01-01T00:00:00.000Z';
export const EXTENDED_SUPPORTED_TO_ISO = '2110-01-01T00:00:00.000Z';
const SUPPORTED_FROM_MS = Date.parse(EXTENDED_SUPPORTED_FROM_ISO);
const SUPPORTED_TO_MS = Date.parse(EXTENDED_SUPPORTED_TO_ISO);
/**
 * Largest absolute error (arcseconds of apparent longitude) measured against JPL Horizons
 * quantity 31 over the pinned reference tables in tests/westernAstrologyExtendedObjects.test.mjs and tests/westernAstrologyExtendedObjectsIndependent.test.mjs
 * (the test asserts the measurements stay within these numbers).
 */
const MEASURED_MAX_ARCSEC = {
    Chiron: 0.5,
    Ceres: 1.8,
    Pallas: 2.5,
    Juno: 3.1,
    Vesta: 2.4,
};
const OBJECT_INFO = {
    Chiron: { label: 'Chiron', designation: '2060 Chiron (1977 UB); JPL Horizons DES=2002060' },
    Ceres: { label: 'Ceres', designation: '1 Ceres (A801 AA); JPL Horizons DES=2000001' },
    Pallas: { label: 'Pallas', designation: '2 Pallas (A802 FA); JPL Horizons DES=2000002' },
    Juno: { label: 'Juno', designation: '3 Juno (A804 RA); JPL Horizons DES=2000003' },
    Vesta: { label: 'Vesta', designation: '4 Vesta (A807 FA); JPL Horizons DES=2000004' },
};
// ---------------------------------------------------------------------------------------
// Dynamics: heliocentric EQJ (ICRF equatorial, J2000), AU and days (TT days since J2000).
// ---------------------------------------------------------------------------------------
/** Gaussian-system GM of the Sun in AU^3/day^2, from GM = 1.32712440041279419e20 m^3/s^2. */
const GM_SUN = (1.32712440041279419e20 * 86400 * 86400) / 149597870700 ** 3;
const C_LIGHT = C_AUDAY; // AU per day
/** Perturbing planets (Mercury..Neptune); mass ratios are planet-system / Sun (JPL DE values). */
const PLANET_BODIES = [
    Body.Mercury,
    Body.Venus,
    Body.Earth, // Earth + Moon mass, placed at the Earth position (offset to EMB < 3e-5 AU)
    Body.Mars,
    Body.Jupiter,
    Body.Saturn,
    Body.Uranus,
    Body.Neptune,
];
const PLANET_GM = [
    GM_SUN / 6023600,
    GM_SUN / 408523.71,
    GM_SUN / 328900.56,
    GM_SUN / 3098703.59,
    GM_SUN / 1047.3486,
    GM_SUN / 3497.898,
    GM_SUN / 22902.98,
    GM_SUN / 19412.24,
];
const NPLANETS = PLANET_BODIES.length;
/** Planet positions are sampled every NODE_STEP_DAYS and Lagrange-interpolated (6 points). */
const NODE_STEP_DAYS = 4;
const NODE_CACHE_LIMIT = 12000;
const nodeCache = new Map();
/** AstroTime whose Terrestrial Time equals `tau` (days since J2000). */
function astroTimeFromTt(tau) {
    // AstroTime(number) takes UT days; correct for Delta-T twice (AstroTime.FromTerrestrialTime can
    // fail to converge for |tau| beyond a few thousand days because of its 1e-12 tolerance).
    const t1 = new AstroTime(tau);
    const t2 = new AstroTime(tau + (tau - t1.tt));
    return new AstroTime(t2.ut + (tau - t2.tt));
}
function planetNode(k) {
    let node = nodeCache.get(k);
    if (node === undefined) {
        if (nodeCache.size >= NODE_CACHE_LIMIT)
            nodeCache.clear();
        const t = astroTimeFromTt(k * NODE_STEP_DAYS);
        node = new Float64Array(NPLANETS * 3);
        for (let i = 0; i < NPLANETS; i++) {
            const v = HelioVector(PLANET_BODIES[i], t);
            node[3 * i] = v.x;
            node[3 * i + 1] = v.y;
            node[3 * i + 2] = v.z;
        }
        nodeCache.set(k, node);
    }
    return node;
}
const interpPositions = new Float64Array(NPLANETS * 3);
const interpWeights = new Float64Array(6);
let windowK0 = Number.NaN;
const windowNodes = [];
/** Interpolated heliocentric planet positions at TT day `tau` (shared scratch array). */
function planetPositionsAt(tau) {
    const u = tau / NODE_STEP_DAYS;
    const fl = Math.floor(u);
    const k0 = fl - 2;
    if (k0 !== windowK0) {
        windowNodes.length = 0;
        for (let j = 0; j < 6; j++)
            windowNodes.push(planetNode(k0 + j));
        windowK0 = k0;
    }
    const f = u - fl; // nodes sit at relative abscissae -2..3
    for (let j = 0; j < 6; j++) {
        let w = 1;
        for (let m = 0; m < 6; m++) {
            if (m !== j)
                w *= (f - (m - 2)) / (j - m);
        }
        interpWeights[j] = w;
    }
    interpPositions.fill(0);
    for (let j = 0; j < 6; j++) {
        const w = interpWeights[j];
        const n = windowNodes[j];
        for (let c = 0; c < NPLANETS * 3; c++)
            interpPositions[c] += w * n[c];
    }
    return interpPositions;
}
const accOut = new Float64Array(3);
/**
 * Heliocentric acceleration: Sun point mass + direct and indirect terms of Mercury..Neptune
 * + first-order post-Newtonian (Schwarzschild) correction.
 */
function acceleration(tau, x, y, z, vx, vy, vz) {
    const p = planetPositionsAt(tau);
    const r2 = x * x + y * y + z * z;
    const r = Math.sqrt(r2);
    const r3 = r2 * r;
    let ax = (-GM_SUN * x) / r3;
    let ay = (-GM_SUN * y) / r3;
    let az = (-GM_SUN * z) / r3;
    for (let i = 0; i < NPLANETS; i++) {
        const px = p[3 * i];
        const py = p[3 * i + 1];
        const pz = p[3 * i + 2];
        const dx = px - x;
        const dy = py - y;
        const dz = pz - z;
        const d2 = dx * dx + dy * dy + dz * dz;
        const d3 = d2 * Math.sqrt(d2);
        const q2 = px * px + py * py + pz * pz;
        const q3 = q2 * Math.sqrt(q2);
        const gm = PLANET_GM[i];
        ax += gm * (dx / d3 - px / q3);
        ay += gm * (dy / d3 - py / q3);
        az += gm * (dz / d3 - pz / q3);
    }
    const v2 = vx * vx + vy * vy + vz * vz;
    const rv = x * vx + y * vy + z * vz;
    const g = GM_SUN / (C_LIGHT * C_LIGHT * r3);
    const a = (4 * GM_SUN) / r - v2;
    ax += g * (a * x + 4 * rv * vx);
    ay += g * (a * y + 4 * rv * vy);
    az += g * (a * z + 4 * rv * vz);
    accOut[0] = ax;
    accOut[1] = ay;
    accOut[2] = az;
    return accOut;
}
/** Gragg-Bulirsch-Stoer sub-step counts: 6-stage extrapolation (order 12) per macro step. */
const GBS_SEQUENCE = [2, 4, 6, 8, 10, 12];
/** Short sequence for the tiny light-time back-steps (<= 0.12 day). */
const GBS_SHORT_SEQUENCE = [2, 4, 6, 8];
const MACRO_STEP_DAYS = 16;
/** One Gragg-Bulirsch-Stoer macro step of size H for the second-order system r'' = a(t, r, r'). */
function gbsStep(t0, s, bigH, seq) {
    const K = seq.length;
    const table = [];
    for (let j = 0; j < K; j++) {
        const n = seq[j];
        const h = bigH / n;
        let x = s[0];
        let y = s[1];
        let z = s[2];
        let a = acceleration(t0, x, y, z, s[3], s[4], s[5]);
        // half-step velocity
        let wx = s[3] + 0.5 * h * a[0];
        let wy = s[4] + 0.5 * h * a[1];
        let wz = s[5] + 0.5 * h * a[2];
        x += h * wx;
        y += h * wy;
        z += h * wz;
        for (let i = 1; i < n; i++) {
            a = acceleration(t0 + i * h, x, y, z, wx, wy, wz);
            wx += h * a[0];
            wy += h * a[1];
            wz += h * a[2];
            x += h * wx;
            y += h * wy;
            z += h * wz;
        }
        a = acceleration(t0 + bigH, x, y, z, wx, wy, wz);
        table.push([x, y, z, wx + 0.5 * h * a[0], wy + 0.5 * h * a[1], wz + 0.5 * h * a[2]]);
    }
    // Aitken-Neville extrapolation in h^2.
    for (let k = 1; k < K; k++) {
        for (let j = K - 1; j >= k; j--) {
            const ratio = (seq[j] / seq[j - k]) ** 2 - 1;
            for (let c = 0; c < 6; c++) {
                table[j][c] += (table[j][c] - table[j - 1][c]) / ratio;
            }
        }
    }
    return table[K - 1];
}
/** Integrate from TT day t0 to t1 in equal macro steps no longer than hMax. */
function propagate(s0, t0, t1, hMax, seq) {
    const span = t1 - t0;
    let s = [s0[0], s0[1], s0[2], s0[3], s0[4], s0[5]];
    if (span === 0)
        return s;
    const steps = Math.max(1, Math.ceil(Math.abs(span) / hMax));
    const h = span / steps;
    for (let i = 0; i < steps; i++) {
        s = gbsStep(t0 + i * h, s, h, seq);
    }
    return s;
}
const J2000_JD = 2451545.0;
function nearestSeed(id, tau) {
    const rows = EXTENDED_OBJECT_SEEDS[id];
    let best = rows[0];
    let bestDist = Math.abs(rows[0][0] - J2000_JD - tau);
    for (let i = 1; i < rows.length; i++) {
        const d = Math.abs(rows[i][0] - J2000_JD - tau);
        if (d < bestDist) {
            best = rows[i];
            bestDist = d;
        }
    }
    return best;
}
const MEMO_LIMIT = 256;
const stateMemo = new Map();
/** Heliocentric EQJ state (AU, AU/day) of the object at TT day `tau`. */
function heliocentricStateAt(id, tau) {
    const key = `${id}|${tau}`;
    const hit = stateMemo.get(key);
    if (hit !== undefined)
        return hit;
    const seed = nearestSeed(id, tau);
    const s = propagate(seed.slice(1), seed[0] - J2000_JD, tau, MACRO_STEP_DAYS, GBS_SEQUENCE);
    if (stateMemo.size >= MEMO_LIMIT)
        stateMemo.clear();
    stateMemo.set(key, s);
    return s;
}
// ---------------------------------------------------------------------------------------
// Apparent place: identical light-time / aberration logic to astronomy-engine GeoVector.
// ---------------------------------------------------------------------------------------
/**
 * Re-implementation of astronomy-engine's BackdatePosition(time, Earth, target, true): the
 * target and the Earth are both taken at the light-departure time, which yields the geocentric
 * vector with aberration included. `targetHelioAt(ltime)` must return the heliocentric EQJ
 * position (AU) of the target at the time `ltime`.
 */
export function apparentGeocentricVector(targetHelioAt, time) {
    let ltime = time;
    let dt = 0;
    for (let iter = 0; iter < 10; iter++) {
        const earth = HelioVector(Body.Earth, ltime);
        const target = targetHelioAt(ltime);
        const x = target[0] - earth.x;
        const y = target[1] - earth.y;
        const z = target[2] - earth.z;
        const lightTime = Math.sqrt(x * x + y * y + z * z) / C_LIGHT;
        if (lightTime > 1.0)
            throw new Error('Extended provider: object too distant for light-travel solver.');
        const ltime2 = time.AddDays(-lightTime);
        dt = Math.abs(ltime2.tt - ltime.tt);
        if (dt < 1.0e-9)
            return new Vector(x, y, z, time);
        ltime = ltime2;
    }
    throw new Error(`Extended provider: light-travel solver did not converge: dt = ${dt}`);
}
function normalizeLongitude(lon) {
    const n = lon % 360;
    const v = n < 0 ? n + 360 : n;
    return v >= 360 ? 0 : v;
}
function eclipticOf(vec) {
    const ecl = Ecliptic(vec);
    return {
        longitude: normalizeLongitude(ecl.elon),
        latitude: ecl.elat,
        distanceAu: vec.Length(),
    };
}
/**
 * Pipeline self-check on a body astronomy-engine supports: the apparent ecliptic longitude
 * produced by this module's light-time/aberration/ecliptic code (using HelioVector of `body`
 * as the target) versus Ecliptic(GeoVector(body, date, true)).elon. Differences should be at
 * floating-point level.
 */
export function extendedPipelineSelfCheck(body, date) {
    const time = MakeTime(date);
    const vec = apparentGeocentricVector((ltime) => {
        const v = HelioVector(body, ltime);
        return [v.x, v.y, v.z];
    }, time);
    const pipeline = eclipticOf(vec).longitude;
    const engine = Ecliptic(GeoVector(body, time, true)).elon;
    const d = ((pipeline - engine + 540) % 360) - 180;
    return { pipelineLongitude: pipeline, engineLongitude: engine, differenceArcsec: d * 3600 };
}
// ---------------------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------------------
export function extendedObjectProvenance(id) {
    const info = OBJECT_INFO[id];
    return {
        id,
        label: info.label,
        designation: info.designation,
        sourceName: 'NASA/JPL Horizons System (state-vector seeds); planets from astronomy-engine',
        sourceUrl: 'https://ssd.jpl.nasa.gov/api/horizons.api',
        seedEpochsJdTdb: EXTENDED_OBJECT_SEEDS[id].map((row) => row[0]),
        method: 'Numerical N-body integration (Gragg-Bulirsch-Stoer, order 12) of the heliocentric orbit from the nearest of ' +
            'the pinned Horizons seeds; Sun point mass + Mercury..Neptune (direct and indirect terms, VSOP87 positions via ' +
            'astronomy-engine) + first-order relativistic term; apparent place via light-time and aberration as in ' +
            'astronomy-engine GeoVector(body, date, true).',
        frame: 'Heliocentric ICRF/J2000 equatorial (astronomy-engine EQJ), converted with Ecliptic() to the apparent geocentric true ecliptic and equinox of date',
        licence: 'Seed vectors: NASA/JPL Horizons output, public-domain U.S. Government data. Integrator, glue code: project code. Planet positions: astronomy-engine (MIT).',
        accuracyArcsec: { measuredMax: MEASURED_MAX_ARCSEC[id], gate: EXTENDED_ACCURACY_GATE_ARCSEC },
        supportedRange: { fromIso: EXTENDED_SUPPORTED_FROM_ISO, toIso: EXTENDED_SUPPORTED_TO_ISO },
    };
}
export function extendedObjectSupportedAt(id, date) {
    if (!(id in OBJECT_INFO))
        return false;
    if (!(date instanceof Date))
        return false;
    const ms = date.getTime();
    return Number.isFinite(ms) && ms >= SUPPORTED_FROM_MS && ms <= SUPPORTED_TO_MS;
}
const positionMemo = new Map();
/**
 * Apparent geocentric true-ecliptic-of-date position of the object, or null when the date is
 * outside the supported range (never extrapolates).
 */
export function extendedObjectApparentPositionAt(id, date) {
    if (!extendedObjectSupportedAt(id, date))
        return null;
    const key = `${id}|${date.getTime()}`;
    const hit = positionMemo.get(key);
    if (hit !== undefined)
        return { ...hit };
    const time = MakeTime(date);
    const state = heliocentricStateAt(id, time.tt);
    const vec = apparentGeocentricVector((ltime) => {
        if (ltime.tt === time.tt)
            return [state[0], state[1], state[2]];
        const s = propagate(state, time.tt, ltime.tt, MACRO_STEP_DAYS, GBS_SHORT_SEQUENCE);
        return [s[0], s[1], s[2]];
    }, time);
    const result = eclipticOf(vec);
    if (positionMemo.size >= MEMO_LIMIT)
        positionMemo.clear();
    positionMemo.set(key, result);
    return { ...result };
}
