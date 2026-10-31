import { MAJOR_ASPECTS } from '../astrology/aspectEngine.js?v=f9ab0a6';
import { apparentLongitudeOf, apparentLongitudesAt, moonPhaseName, } from '../astrology/ephemerisEngine.js?v=f9ab0a6';
import { FAST_BODIES, FAST_BODY_ROWS, MOON_ELEMENT_ROWS, MOON_HOUSE_ROWS, MOON_PHASE_ROWS, MOON_TARGET_ROWS, PHASE_KIND, QUALITY_OF_HARMONIC, SLOW_BODIES, SLOW_BODY_ROWS, SLOW_QUALITY_EFFECTS, SUN_SEASON_ROWS, TARGET_ROWS, mergeEffects, slowBodyTheme, sunSeasonTheme, } from './dayKnowledge.js?v=f9ab0a6';
/*
 * THE SKY OVER ONE LOCAL DAY.
 *
 * The legacy forecast read one instant, 12:00 UTC. The Moon covers thirteen
 * degrees between midnights, so a single instant cannot say whether she makes a
 * contact today, only whether she happens to be making one at that moment. This
 * module follows each body through the whole local day instead.
 *
 * HOW
 * Every body's apparent longitude is sampled at 25 evenly spaced instants across
 * [start, next start) - hourly on an ordinary day, a little tighter on a
 * 23-hour one, a little looser on a 25-hour one - by the ephemeris engine's own
 * position functions. For each (transiting body, natal point, aspect) the signed
 * distance from exact is followed through the samples:
 *
 *   - a sign change is an exact crossing inside the day. It is then refined by
 *     bisection on the real position function, so the instant it reports is a
 *     computed one, not a sample;
 *   - otherwise the closest approach is the smallest sample, refined by a
 *     bounded golden-section search when it falls between two samples (a
 *     station, a slow turn). A minimum at either end of the day means the aspect
 *     is still closing (`applying`) or already opening (`separating`);
 *   - the part of the day it is within orb is read from the samples, so it is
 *     good to about an hour and is not described as better than that.
 *
 * Everything is deterministic: fixed sample count, fixed iteration counts, no
 * clock. The same positions and the same local day give the same facts anywhere.
 *
 * WHICH BODIES AND WHICH ROLE
 *   Moon, Sun, Mercury, Venus, Mars   TRIGGERS. They are what makes this day this
 *                                     day. Mercury, Venus, Mars and the Sun are
 *                                     kept to a tight orb; the Moon is kept only
 *                                     when she perfects inside the day (or comes
 *                                     within an exact orb of it).
 *   Jupiter .. Pluto                  BACKGROUND, at the orb the legacy forecast
 *                                     has always used (2 degrees), so a season of
 *                                     Saturn still informs the day and cannot
 *                                     make six consecutive days identical.
 *
 * WHAT A BAD BIRTH TIME DOES TO THIS, STATED ONCE
 * The natal Sun, Mercury, Venus and Mars move up to about a degree a day, so a
 * birth time that is only an estimate leaves them up to half a day's travel
 * uncertain. That is carried per fact as `natalUncertaintyDegrees`; where it is
 * large enough to matter a transit cannot be called `exact` and the fact is
 * marked `medium` reliability. The natal Moon moves thirteen degrees a day and
 * is not used at all unless the time is exact. The Ascendant, houses and the
 * Moon's house follow the same rule. None of it is estimated or guessed.
 */
const SEGMENTS = 24;
const GOLDEN = 0.6180339887498949;
/** Orbs, in degrees of closest approach inside the local day. */
export const DAY_ORBS = {
    fast: { exact: 0.3, close: 0.75, wide: 1.5 },
    moon: { exact: 0.3, close: 1.0 },
    slow: { exact: 0.3, close: 1, wide: 2 },
    /** A positional uncertainty above this stops a fast transit being called exact. */
    uncertaintyForExact: 0.1,
};
const SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const ELEMENT_OF_SIGN_INDEX = ['Fire', 'Earth', 'Air', 'Water'];
const FAST_TARGETS = ['Sun', 'Mercury', 'Venus', 'Mars'];
const PERSONAL_TARGETS_WITH_MOON = [...FAST_TARGETS, 'Moon'];
const wrap180 = (value) => ((((value + 180) % 360) + 360) % 360) - 180;
const round = (value, digits = 2) => {
    const scale = 10 ** digits;
    return Math.round(value * scale) / scale;
};
const iso = (ms) => new Date(ms).toISOString();
const ordinal = (n) => (n >= 11 && n <= 13 ? `${n}th` : `${n}${['th', 'st', 'nd', 'rd'][n % 10 > 3 ? 0 : n % 10]}`);
const signIndexOf = (longitude) => Math.floor((((longitude % 360) + 360) % 360) / 30) % 12;
/* --------------------------------------------------------------- sampling -- */
class Sky {
    startMs;
    endMs;
    times;
    positionCalls = 0;
    series = new Map();
    constructor(startMs, endMs) {
        this.startMs = startMs;
        this.endMs = endMs;
        this.times = Array.from({ length: SEGMENTS + 1 }, (_, k) => startMs + ((endMs - startMs) * k) / SEGMENTS);
    }
    at(body, ms) {
        this.positionCalls += 1;
        const longitude = apparentLongitudeOf(body, new Date(ms));
        if (longitude === null)
            throw new Error(`no position function for ${body}`);
        return longitude;
    }
    samples(body) {
        let known = this.series.get(body);
        if (!known) {
            known = this.times.map((ms) => this.at(body, ms));
            this.series.set(body, known);
        }
        return known;
    }
}
/** Refine a sign change of f between two instants by bisection (fixed iterations: deterministic). */
function bisect(f, lowMs, highMs) {
    let low = lowMs;
    let high = highMs;
    const lowSign = Math.sign(f(low));
    for (let i = 0; i < 40; i += 1) {
        const mid = (low + high) / 2;
        if (Math.sign(f(mid)) === lowSign)
            low = mid;
        else
            high = mid;
    }
    return (low + high) / 2;
}
/** Smallest |f| between two instants by a bounded golden-section search. */
function minimumAbs(f, lowMs, highMs) {
    let low = lowMs;
    let high = highMs;
    let a = high - GOLDEN * (high - low);
    let b = low + GOLDEN * (high - low);
    let fa = Math.abs(f(a));
    let fb = Math.abs(f(b));
    for (let i = 0; i < 30; i += 1) {
        if (fa < fb) {
            high = b;
            b = a;
            fb = fa;
            a = high - GOLDEN * (high - low);
            fa = Math.abs(f(a));
        }
        else {
            low = a;
            a = b;
            fa = fb;
            b = low + GOLDEN * (high - low);
            fb = Math.abs(f(b));
        }
    }
    const ms = (low + high) / 2;
    return { ms, value: Math.abs(f(ms)) };
}
const ASPECT_OFFSETS = MAJOR_ASPECTS.flatMap((aspect) => (aspect.angle === 0 || aspect.angle === 180
    ? [{ aspect, offset: aspect.angle }]
    : [{ aspect, offset: aspect.angle }, { aspect, offset: -aspect.angle }]));
function contactsOf(sky, transit, natalLongitude, activeOrb, keepWithin) {
    const samples = sky.samples(transit);
    const last = samples.length - 1;
    let best = null;
    for (const { aspect, offset } of ASPECT_OFFSETS) {
        const f = (ms) => wrap180(sky.at(transit, ms) - natalLongitude - offset);
        const d = samples.map((longitude) => wrap180(longitude - natalLongitude - offset));
        const abs = d.map(Math.abs);
        const nearest = Math.min(...abs);
        let crossingMs = null;
        for (let k = 0; k < last; k += 1) {
            if (d[k] === 0) {
                crossingMs = sky.times[k];
                break;
            }
            if (d[k] * d[k + 1] < 0 && abs[k] < 45 && abs[k + 1] < 45) {
                crossingMs = bisect(f, sky.times[k], sky.times[k + 1]);
                break;
            }
        }
        let peakOrb;
        let phase;
        if (crossingMs !== null) {
            peakOrb = 0;
            phase = 'exact-today';
        }
        else {
            const k = abs.indexOf(nearest);
            if (k > 0 && k < last) {
                const refined = minimumAbs(f, sky.times[k - 1], sky.times[k + 1]);
                peakOrb = Math.min(nearest, refined.value);
                phase = 'turning-today';
            }
            else {
                peakOrb = nearest;
                phase = abs[last] < abs[0] ? 'applying' : 'separating';
            }
        }
        /* A crossing inside the day has a peak orb of 0, so it is always kept; otherwise the closest approach must be within orb. */
        if (peakOrb > keepWithin)
            continue;
        /* The stretch of the day inside the active orb, to the sample's resolution. */
        const inside = abs.map((value, k) => (value <= activeOrb ? k : -1)).filter((k) => k >= 0);
        let fromMs;
        let toMs;
        if (inside.length > 0) {
            fromMs = sky.times[inside[0]];
            toMs = sky.times[inside[inside.length - 1]];
        }
        else if (crossingMs !== null) {
            const k = Math.min(last - 1, Math.max(0, sky.times.findIndex((ms) => ms > crossingMs) - 1));
            fromMs = sky.times[k];
            toMs = sky.times[k + 1];
        }
        else {
            fromMs = sky.startMs;
            toMs = sky.endMs;
        }
        const candidate = {
            aspectName: aspect.name,
            harmonic: aspect.harmonic,
            peakOrb: round(peakOrb, 3),
            exactMs: crossingMs,
            phase,
            orbStart: round(abs[0]),
            orbEnd: round(abs[last]),
            fromMs,
            toMs,
        };
        if (!best || candidate.peakOrb < best.peakOrb)
            best = candidate;
    }
    return best;
}
/* ---------------------------------------------------------------- classify -- */
function exactnessOf(transit, contact, uncertainty) {
    if (transit === 'Moon') {
        return contact.exactMs !== null || contact.peakOrb <= DAY_ORBS.moon.exact ? 'exact' : 'close';
    }
    if (SLOW_BODIES.includes(transit)) {
        if (contact.peakOrb <= DAY_ORBS.slow.exact)
            return 'exact';
        return contact.peakOrb <= DAY_ORBS.slow.close ? 'close' : 'wide';
    }
    const tight = contact.exactMs !== null || contact.peakOrb <= DAY_ORBS.fast.exact;
    if (tight && uncertainty <= DAY_ORBS.uncertaintyForExact)
        return 'exact';
    if (tight || contact.peakOrb <= DAY_ORBS.fast.close)
        return 'close';
    return 'wide';
}
const STRENGTH_STEPS = ['slight', 'moderate', 'strong'];
/**
 * How much a contact weighs.
 *
 * The Moon touches a natal planet several times a month and each touch lasts
 * hours, so an exact Moon contact is ordinary, not dramatic: `moderate`, and
 * `strong` only when she wakes a LUMINARY (the natal Sun or Moon), which is the
 * one Moon contact that changes the day's whole tone. Left `strong` for all of
 * them, the Moon's contacts alone put the same two activities on most days of
 * the year. A background influence is never `strong`: it informs the day, it does
 * not lead it. A sextile is the lightest of the five aspects.
 */
function strengthOf(transit, exactness, aspectName, natal) {
    const background = SLOW_BODIES.includes(transit);
    let level = exactness === 'exact' ? 2 : exactness === 'close' ? 1 : 0;
    if (background)
        level = Math.min(level, 1);
    if (transit === 'Moon' && natal !== 'Sun' && natal !== 'Moon')
        level = Math.min(level, 1);
    /* A sextile is the lightest of the five. */
    if (aspectName === 'Sextile')
        level = Math.max(0, level - 1);
    return STRENGTH_STEPS[level];
}
/* ------------------------------------------------------------------ engine -- */
export function computeDayAstrology(input) {
    const { localDay, natalPositions, birthTime } = input;
    const startMs = Date.parse(localDay.startUtc);
    const endMs = Date.parse(localDay.endUtc);
    const sky = new Sky(startMs, endMs);
    const facts = [];
    const withheld = [];
    const inForceWholeDay = { fromUtc: localDay.startUtc, toUtc: localDay.endUtc };
    const natal = new Map(natalPositions.map((position) => [position.body, position]));
    const exactTime = birthTime === 'exact';
    if (!exactTime) {
        withheld.push({
            code: 'natal-moon.birth-time-not-exact',
            what: 'Contacts to the natal Moon',
            reason: 'The natal Moon moves about thirteen degrees a day, so without an exact birth time its place is not known well enough to be touched by a transit.',
        }, {
            code: 'houses.birth-time-not-exact',
            what: 'The Moon’s house for the day',
            reason: 'Houses are set by the Ascendant, which needs an exact birth time.',
        }, {
            code: 'angles.birth-time-not-exact',
            what: 'Contacts to the Ascendant and Midheaven',
            reason: 'The angles need an exact birth time; none is used or estimated.',
        });
    }
    const natalUncertainty = (body) => {
        if (exactTime)
            return 0;
        const speed = Math.abs(natal.get(body)?.speedDegreesPerDay ?? 0);
        /* Half a day's travel either way: the true time could be anywhere in the day. */
        return round(speed * 0.5, 2);
    };
    /* ---- transits to the natal chart ---- */
    const targets = exactTime ? PERSONAL_TARGETS_WITH_MOON : FAST_TARGETS;
    for (const transit of FAST_BODIES) {
        for (const target of targets) {
            const point = natal.get(target);
            if (!point)
                continue;
            const moon = transit === 'Moon';
            /* The Moon is kept only when she perfects inside the day or closes to an exact-ish orb: she covers thirteen
               degrees, so a wider net would put a dozen contacts on every day. A return (the Sun on the natal Sun, the Moon
               on the natal Moon) is an ordinary conjunction and is read like any other. */
            const orb = moon ? DAY_ORBS.moon.close : DAY_ORBS.fast.wide;
            const contact = contactsOf(sky, transit, point.longitude, orb, orb);
            if (!contact)
                continue;
            const uncertainty = natalUncertainty(target);
            const exactness = exactnessOf(transit, contact, moon ? 0 : uncertainty);
            const quality = QUALITY_OF_HARMONIC[contact.harmonic];
            /* The Moon is read by the point she touches; every other body by what it is about, with the point adding a little. */
            const row = moon ? MOON_TARGET_ROWS[target][quality] : FAST_BODY_ROWS[transit][quality];
            const aspect = {
                transiting: transit, natal: target, aspect: contact.aspectName, harmonic: contact.harmonic,
                peakOrbDegrees: contact.peakOrb,
                exactAtUtc: contact.exactMs === null ? null : iso(contact.exactMs),
                phase: contact.phase,
                orbAtDayStartDegrees: contact.orbStart, orbAtDayEndDegrees: contact.orbEnd,
                natalUncertaintyDegrees: uncertainty,
            };
            facts.push({
                id: `astrology:day:${transit}-${contact.aspectName}-natal-${target}`.toLowerCase(),
                pillar: 'astrology',
                mechanism: moon ? 'moon-transit-aspect' : 'fast-transit-aspect',
                role: 'trigger',
                scale: moon ? 'intraday' : exactness === 'exact' ? 'daily' : 'multi-day',
                label: `Transiting ${transit} ${contact.aspectName.toLowerCase()} natal ${target}`,
                theme: '',
                effects: moon ? row.effects : mergeEffects(row.effects, TARGET_ROWS[target][quality]),
                emotions: { rising: row.rising ?? [], quieter: row.quieter ?? [] },
                strength: strengthOf(transit, exactness, contact.aspectName, target),
                exactness,
                independenceGroup: `astrology:transit:${transit.toLowerCase()}`,
                requiresBirthTime: target === 'Moon',
                reliability: !moon && uncertainty > DAY_ORBS.uncertaintyForExact ? 'medium' : 'high',
                inForce: { fromUtc: iso(Math.max(startMs, contact.fromMs)), toUtc: iso(Math.min(endMs, contact.toMs)) },
                aspect,
                provenance: {
                    transitingBody: transit, natalBody: target, aspect: contact.aspectName, harmonic: contact.harmonic,
                    quality, peakOrbDegrees: contact.peakOrb, phase: contact.phase,
                    exactAtUtc: aspect.exactAtUtc ?? 'none-in-day',
                    natalUncertaintyDegrees: uncertainty,
                    resolution: 'sampled-hourly-refined-by-bisection',
                },
            });
        }
    }
    /* ---- slow transits: background ---- */
    const slowTargets = exactTime ? PERSONAL_TARGETS_WITH_MOON : FAST_TARGETS;
    for (const transit of SLOW_BODIES) {
        for (const target of slowTargets) {
            const point = natal.get(target);
            if (!point)
                continue;
            const contact = contactsOf(sky, transit, point.longitude, DAY_ORBS.slow.wide, DAY_ORBS.slow.wide);
            if (!contact)
                continue;
            const uncertainty = natalUncertainty(target);
            const exactness = exactnessOf(transit, contact, uncertainty);
            const quality = QUALITY_OF_HARMONIC[contact.harmonic];
            const row = SLOW_BODY_ROWS[transit];
            const aspect = {
                transiting: transit, natal: target, aspect: contact.aspectName, harmonic: contact.harmonic,
                peakOrbDegrees: contact.peakOrb,
                exactAtUtc: contact.exactMs === null ? null : iso(contact.exactMs),
                phase: contact.phase,
                orbAtDayStartDegrees: contact.orbStart, orbAtDayEndDegrees: contact.orbEnd,
                natalUncertaintyDegrees: uncertainty,
            };
            facts.push({
                id: `astrology:day:${transit}-${contact.aspectName}-natal-${target}`.toLowerCase(),
                pillar: 'astrology',
                mechanism: 'slow-transit-aspect',
                role: 'background',
                scale: transit === 'Jupiter' ? 'monthly' : 'annual',
                label: `Transiting ${transit} ${contact.aspectName.toLowerCase()} natal ${target}`,
                theme: slowBodyTheme(transit),
                effects: mergeEffects(row.effects, SLOW_QUALITY_EFFECTS[quality]),
                emotions: { rising: [], quieter: [] },
                strength: strengthOf(transit, exactness, contact.aspectName, target),
                exactness,
                independenceGroup: `astrology:transit:${transit.toLowerCase()}`,
                requiresBirthTime: target === 'Moon',
                reliability: uncertainty > DAY_ORBS.uncertaintyForExact ? 'medium' : 'high',
                inForce: inForceWholeDay,
                aspect,
                provenance: {
                    transitingBody: transit, natalBody: target, aspect: contact.aspectName, harmonic: contact.harmonic,
                    quality, peakOrbDegrees: contact.peakOrb, phase: contact.phase,
                    natalUncertaintyDegrees: uncertainty, resolution: 'sampled-hourly-refined-by-bisection',
                },
            });
        }
    }
    /* ---- the Moon's own state for the day ---- */
    const moonSamples = sky.samples('Moon');
    const signCounts = new Map();
    for (let k = 0; k < SEGMENTS; k += 1) {
        const index = signIndexOf(moonSamples[k]);
        signCounts.set(index, (signCounts.get(index) ?? 0) + 1);
    }
    const middayMs = startMs + (endMs - startMs) / 2;
    const signAtMidday = signIndexOf(sky.at('Moon', middayMs));
    const dominant = [...signCounts.entries()]
        .sort((left, right) => right[1] - left[1] || (left[0] === signAtMidday ? -1 : right[0] === signAtMidday ? 1 : left[0] - right[0]))[0][0];
    const firstSign = signIndexOf(moonSamples[0]);
    const lastSign = signIndexOf(moonSamples[SEGMENTS]);
    let ingressUtc = null;
    if (firstSign !== lastSign) {
        const boundary = (ms) => (signIndexOf(sky.at('Moon', ms)) === firstSign ? -1 : 1);
        ingressUtc = iso(bisect(boundary, startMs, endMs));
    }
    const moonSign = SIGNS[dominant];
    const moonElement = ELEMENT_OF_SIGN_INDEX[dominant % 4];
    const moonSignRow = MOON_ELEMENT_ROWS[moonElement];
    facts.push({
        id: `astrology:day:moon-sign:${moonSign.toLowerCase()}`,
        pillar: 'astrology', mechanism: 'moon-sign', role: 'trigger', scale: 'multi-day',
        label: `Moon in ${moonSign}`, theme: '',
        effects: moonSignRow.effects,
        emotions: { rising: moonSignRow.rising ?? [], quieter: moonSignRow.quieter ?? [] },
        strength: 'slight', exactness: 'not-applicable',
        independenceGroup: 'astrology:transit:moon',
        requiresBirthTime: false, reliability: 'high', inForce: inForceWholeDay,
        provenance: {
            sign: moonSign, element: moonElement,
            ingress: ingressUtc ? `${SIGNS[firstSign]}->${SIGNS[lastSign]} at ${ingressUtc}` : 'none-in-day',
        },
    });
    const { phaseAngle } = apparentLongitudesAt(new Date(middayMs));
    const phaseName = moonPhaseName(phaseAngle);
    const phaseRow = MOON_PHASE_ROWS[PHASE_KIND[phaseName] ?? 'building'];
    facts.push({
        id: `astrology:day:moon-phase:${phaseName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        pillar: 'astrology', mechanism: 'moon-phase', role: 'trigger', scale: 'multi-day',
        label: `Moon phase: ${phaseName}`, theme: '',
        effects: phaseRow.effects,
        emotions: { rising: phaseRow.rising ?? [], quieter: phaseRow.quieter ?? [] },
        strength: 'slight', exactness: 'not-applicable',
        independenceGroup: 'astrology:transit:moon',
        requiresBirthTime: false, reliability: 'high', inForce: inForceWholeDay,
        provenance: { phase: phaseName, phaseAngleDegrees: round(phaseAngle, 1), atUtc: iso(middayMs) },
    });
    if (exactTime && input.ascendantSignIndex !== null) {
        const house = ((dominant - input.ascendantSignIndex + 12) % 12) + 1;
        const houseRow = MOON_HOUSE_ROWS[house];
        facts.push({
            id: `astrology:day:moon-house:${house}`,
            pillar: 'astrology', mechanism: 'moon-house', role: 'trigger', scale: 'multi-day',
            label: `Moon in the ${ordinal(house)} house`,
            theme: '',
            effects: houseRow.effects, emotions: { rising: [], quieter: [] },
            strength: 'slight', exactness: 'not-applicable',
            independenceGroup: 'astrology:transit:moon',
            requiresBirthTime: true, reliability: 'high', inForce: inForceWholeDay,
            provenance: { house, houseSystem: 'whole-sign', moonSign },
        });
    }
    /* ---- the season: the Sun's element, as the month's own colour ---- */
    const sunIndex = signIndexOf(sky.at('Sun', middayMs));
    const sunElement = ELEMENT_OF_SIGN_INDEX[sunIndex % 4];
    const sunRow = SUN_SEASON_ROWS[sunElement];
    facts.push({
        id: `astrology:day:sun-season:${SIGNS[sunIndex].toLowerCase()}`,
        pillar: 'astrology', mechanism: 'sun-season', role: 'background', scale: 'monthly',
        label: `Transiting Sun in ${SIGNS[sunIndex]}`, theme: sunSeasonTheme(sunElement),
        effects: sunRow.effects, emotions: { rising: [], quieter: [] },
        strength: 'slight', exactness: 'not-applicable',
        independenceGroup: 'astrology:transit:sun',
        requiresBirthTime: false, reliability: 'high', inForce: inForceWholeDay,
        provenance: { sign: SIGNS[sunIndex], element: sunElement },
    });
    return {
        facts: facts.sort((left, right) => left.id.localeCompare(right.id)),
        withheld,
        stats: { samples: SEGMENTS + 1, positionCalls: sky.positionCalls },
    };
}
