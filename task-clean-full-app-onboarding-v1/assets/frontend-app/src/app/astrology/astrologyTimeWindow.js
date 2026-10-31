import { APPROXIMATE_WINDOW_MINUTES, birthTimeWindow, localClockLabel, } from '../uncertainty/birthTimeWindow.js?v=f9ab0a6';
import { cellIndex, cellMargin, certifiedScan, constantSegments, } from '../uncertainty/certifiedScan.js?v=f9ab0a6';
import { degreesPerMinute, speedChangePerMinute } from '../uncertainty/motionBounds.js?v=f9ab0a6';
import { MAJOR_ASPECTS } from './aspectEngine.js?v=f9ab0a6';
import { calculateAngles, calculateWholeSignHouses } from './angleHouseEngine.js?v=f9ab0a6';
import { calculateChartEmphasis } from './dignityEngine.js?v=f9ab0a6';
import { apparentLongitudesAt, MOTION_SAMPLE_HOURS, moonPhaseName, STATIONARY_DEGREES_PER_DAY, } from './ephemerisEngine.js?v=f9ab0a6';
/*
 * WHAT A BIRTH TIME THAT IS NOT KNOWN EXACTLY ACTUALLY LEAVES OPEN.
 *
 * The chart is calculated for one moment: the time the reader gave, or the
 * 12:00 local reference when they gave none. That moment is exact arithmetic
 * about a moment that may not be the birth. This file asks the only question
 * that decides what a reading may say about such a chart: across the instants
 * the birth could really have been, which results stay the same and which do
 * not?
 *
 * NOTHING NATAL IS RECALCULATED OR CHANGED HERE. The natal chart is the
 * engine's, from the one moment, exactly as before. The scan reads the same
 * unchanged position functions at other instants of the window and compares;
 * it produces no position, house or aspect that the chart then uses.
 *
 * THE WINDOW is the product's one definition (uncertainty/birthTimeWindow.ts):
 *   approximate  the reader's estimate, two hours either side, inside the
 *                birth date - the same window Human Design and BaZi use
 *   unknown      the whole local civil day of birth at the birth place,
 *                00:00 to the last instant before the next 00:00, with that
 *                date's historical offset (23 or 25 hours on a clock-change day)
 *
 * PROVEN, NOT SAMPLED (uncertainty/certifiedScan.ts). Each discrete value is a
 * track read with its margin to the nearest boundary that would change it and
 * a bound on how fast that margin can shrink; an interval is certified
 * constant only when the value cannot have left and come back inside it:
 *
 *   planet signs    margin to the nearest sign cusp, the body's speed bound
 *   aspects         per pair: which aspect's orb holds the separation (or
 *                   none), margin to the nearest orb edge, the two speed
 *                   bounds added
 *   moon phase      margin of the Sun-Moon elongation to the nearest phase edge
 *   motion states   direct / stationary / retrograde, as the engine reads them
 *                   from its +/- 12 h central difference; margin to the
 *                   stationary threshold, the acceleration bound
 *   element and modality counts follow from the signs: evaluated once on each
 *   stretch where no sign changes
 *
 * The ANGLES are scanned for an estimate only. The Ascendant and the Midheaven
 * move monotonically forward through the zodiac, so a per-minute sample finds
 * every sign change to the minute and cannot miss one. For an unknown time they
 * are withheld, not scanned: across a whole day every sign rises. Angularity
 * (a planet within five degrees of an angle) is sampled every five minutes; at
 * the Ascendant's speed an orb takes far longer than that to cross.
 */
export { APPROXIMATE_WINDOW_MINUTES };
const SIGN_NAMES = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];
const SIGN_QUALITY = {
    Aries: { element: 'Fire', modality: 'Cardinal' }, Taurus: { element: 'Earth', modality: 'Fixed' },
    Gemini: { element: 'Air', modality: 'Mutable' }, Cancer: { element: 'Water', modality: 'Cardinal' },
    Leo: { element: 'Fire', modality: 'Fixed' }, Virgo: { element: 'Earth', modality: 'Mutable' },
    Libra: { element: 'Air', modality: 'Cardinal' }, Scorpio: { element: 'Water', modality: 'Fixed' },
    Sagittarius: { element: 'Fire', modality: 'Mutable' }, Capricorn: { element: 'Earth', modality: 'Cardinal' },
    Aquarius: { element: 'Air', modality: 'Fixed' }, Pisces: { element: 'Water', modality: 'Mutable' },
};
/* The engine's orb allowance (aspectEngine.ts): 8 degrees with a luminary, 6 with a personal or social planet, 4 otherwise. */
const LUMINARIES = new Set(['Sun', 'Moon']);
const SOCIAL_AND_PERSONAL = new Set(['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn']);
const orbLimit = (a, b) => (LUMINARIES.has(a) || LUMINARIES.has(b) ? 8
    : SOCIAL_AND_PERSONAL.has(a) || SOCIAL_AND_PERSONAL.has(b) ? 6 : 4);
const aspectId = (a, b, name) => `${a}-${b}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const ANGULARITY_STEP_MINUTES = 5;
const MOTION_OFFSET_MS = MOTION_SAMPLE_HOURS * 3_600_000;
const separation = (a, b) => {
    const difference = Math.abs(a - b) % 360;
    return Math.min(difference, 360 - difference);
};
/**
 * The window, or null when there is nothing to scan - an exact time, a blocked
 * chart, or a moment without a time zone to read local clock times in.
 */
export function scanAstrologyTimeWindow(astrology, precision, latitude, longitude) {
    if (precision === 'exact')
        return null;
    const { moment, ephemeris } = astrology;
    if (astrology.status !== 'calculated' || !ephemeris || moment.status !== 'ready')
        return null;
    const window = birthTimeWindow(moment, precision);
    if (!window)
        return null;
    const reference = window.referenceMs;
    const label = localClockLabel(window);
    /* The minute an instant falls in, counted from the calculated moment: the day's last instant is minute 719, not 720. */
    const minutesOf = (ms) => Math.floor((ms - reference) / 60_000);
    const skyAt = (ms) => {
        const now = apparentLongitudesAt(new Date(ms));
        const before = apparentLongitudesAt(new Date(ms - MOTION_OFFSET_MS)).longitudes;
        const after = apparentLongitudesAt(new Date(ms + MOTION_OFFSET_MS)).longitudes;
        const days = (2 * MOTION_SAMPLE_HOURS) / 24;
        const speeds = {};
        for (const body of Object.keys(now.longitudes)) {
            speeds[body] = ((((after[body] - before[body]) + 540) % 360) - 180) / days;
        }
        return { longitudes: now.longitudes, phaseAngle: now.phaseAngle, speeds };
    };
    const bodyNames = [...ephemeris.positions, ...ephemeris.points].map((entry) => entry.body);
    const aspectBodies = [
        ...ephemeris.positions.map((entry) => entry.body),
        ...(ephemeris.points.some((point) => point.body === 'North Node') ? ['North Node'] : []),
    ];
    const tracks = [];
    for (const body of bodyNames) {
        tracks.push({
            id: `sign:${body}`,
            rate: degreesPerMinute(body),
            read: (sky) => ({ value: SIGN_NAMES[cellIndex(sky.longitudes[body], 30)], margin: cellMargin(sky.longitudes[body], 30) }),
        });
        tracks.push({
            id: `motion:${body}`,
            rate: speedChangePerMinute(body),
            read: (sky) => {
                const speed = sky.speeds[body];
                const value = Math.abs(speed) <= STATIONARY_DEGREES_PER_DAY ? 'stationary' : speed < 0 ? 'retrograde' : 'direct';
                return { value, margin: Math.min(Math.abs(speed - STATIONARY_DEGREES_PER_DAY), Math.abs(speed + STATIONARY_DEGREES_PER_DAY)) };
            },
        });
    }
    for (let left = 0; left < aspectBodies.length; left += 1) {
        for (let right = left + 1; right < aspectBodies.length; right += 1) {
            const a = aspectBodies[left];
            const b = aspectBodies[right];
            const orb = orbLimit(a, b);
            /* The orb windows never overlap (the aspects are 60 degrees apart at the
               closest, the orbs 8 at the widest), so a separation sits in at most one.
               Its edges at 0 and 180 are not boundaries: a separation folds there. */
            const edges = MAJOR_ASPECTS.flatMap((aspect) => [aspect.angle - orb, aspect.angle + orb])
                .filter((edge) => edge > 0 && edge < 180);
            tracks.push({
                id: `aspect:${a}|${b}`,
                rate: degreesPerMinute(a) + degreesPerMinute(b),
                read: (sky) => {
                    const distance = separation(sky.longitudes[a], sky.longitudes[b]);
                    const inOrb = MAJOR_ASPECTS.find((aspect) => Math.abs(distance - aspect.angle) <= orb);
                    return {
                        value: inOrb ? aspectId(a, b, inOrb.name) : 'none',
                        margin: Math.min(...edges.map((edge) => Math.abs(distance - edge))),
                    };
                },
            });
        }
    }
    tracks.push({
        id: 'phase',
        rate: degreesPerMinute('Moon') + degreesPerMinute('Sun'),
        read: (sky) => ({ value: moonPhaseName(sky.phaseAngle), margin: cellMargin(sky.phaseAngle, 45, 22.5) }),
    });
    const scan = certifiedScan(skyAt, tracks, window.startMs, window.endMs);
    const result = (id) => scan.results.get(id);
    const spansOf = (list) => list.map((span, index) => ({
        value: span.value,
        fromMinutes: minutesOf(span.fromMs),
        toMinutes: minutesOf(span.toMs),
        /* A change is labelled once, at the instant it happens, so "until about
           21:35" and "from about 21:35" always name the same time. */
        fromLocal: label(span.fromMs),
        toLocal: index === list.length - 1 ? label(span.toMs) : label(list[index + 1].fromMs),
    }));
    const first = scan.sampleAt(window.startMs);
    const last = scan.sampleAt(window.endMs);
    const bodies = bodyNames.map((body) => ({
        body,
        spans: spansOf(result(`sign:${body}`).spans),
        startLongitude: first.longitudes[body],
        endLongitude: last.longitudes[body],
        motionStates: result(`motion:${body}`).values,
    }));
    /* aspects */
    const atMoment = new Set(astrology.aspects.map((aspect) => aspect.id));
    const aspectResults = aspectBodies.flatMap((a, left) => aspectBodies.slice(left + 1).map((b) => result(`aspect:${a}|${b}`)));
    const throughout = aspectResults.filter((entry) => entry.values.length === 1 && entry.values[0] !== 'none').map((entry) => entry.values[0]);
    const everywhere = new Set(aspectResults.flatMap((entry) => entry.values.filter((value) => value !== 'none')));
    const aspectsThroughout = [...new Set(throughout)].sort();
    const aspectsNotThroughout = [...atMoment].filter((id) => !aspectsThroughout.includes(id)).sort();
    const aspectsPossible = [...everywhere].filter((id) => !atMoment.has(id)).sort();
    /* counts: one evaluation per stretch on which no planet changes sign */
    const planetResults = ephemeris.positions.map((entry) => ({ body: entry.body, result: result(`sign:${entry.body}`) }));
    const signAt = (spans, ms) => (spans.find((span) => span.fromMs <= ms && ms <= span.toMs) ?? spans[0]).value;
    const balances = constantSegments(planetResults.map((entry) => entry.result), window.startMs, window.endMs).map((segment) => {
        const elements = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
        const modalities = { Cardinal: 0, Fixed: 0, Mutable: 0 };
        for (const { result: track } of planetResults) {
            const quality = SIGN_QUALITY[signAt(track.spans, segment.midMs)];
            elements[quality.element] += 1;
            modalities[quality.modality] += 1;
        }
        return { elements, modalities };
    });
    const momentBalance = { elements: { ...astrology.elementBalance }, modalities: { ...astrology.modalityBalance } };
    const elementBalances = distinct([momentBalance.elements, ...balances.map((entry) => entry.elements)]);
    const modalityBalances = distinct([momentBalance.modalities, ...balances.map((entry) => entry.modalities)]);
    const moonPhases = [...new Set([ephemeris.moonPhase.name, ...result('phase').values])];
    /* angles: an estimate only */
    let ascendant = null;
    let midheaven = null;
    let angularChanges = false;
    if (precision === 'approximate' && latitude !== null && longitude !== null) {
        const at = (ms) => ({
            ...moment,
            utcDateTime: new Date(ms).toISOString(),
            julianDate: ms / 86_400_000 + 2_440_587.5,
        });
        const minutes = [];
        for (let ms = window.startMs; ms <= window.endMs; ms += 60_000)
            minutes.push(ms);
        const ascendantSigns = [];
        const midheavenSigns = [];
        for (const ms of minutes) {
            const angles = calculateAngles(at(ms).julianDate, latitude, longitude);
            ascendantSigns.push(angles.ascendant.sign);
            midheavenSigns.push(angles.midheaven.sign);
        }
        ascendant = sampledSpans(ascendantSigns, minutes, minutesOf, label);
        midheaven = sampledSpans(midheavenSigns, minutes, minutesOf, label);
        const angularKey = (ms) => {
            const houses = calculateWholeSignHouses(at(ms), ephemeris.positions, latitude, longitude);
            return calculateChartEmphasis(ephemeris.positions, houses).angularPlanets
                .map((entry) => `${entry.body}@${entry.angle}`).sort().join(',');
        };
        const atMomentKey = angularKey(reference);
        for (let ms = window.startMs; ms <= window.endMs && !angularChanges; ms += ANGULARITY_STEP_MINUTES * 60_000) {
            if (angularKey(ms) !== atMomentKey)
                angularChanges = true;
        }
        if (!angularChanges && angularKey(window.endMs) !== atMomentKey)
            angularChanges = true;
    }
    return {
        precision,
        window,
        fromMinutes: minutesOf(window.startMs),
        toMinutes: minutesOf(window.endMs),
        bodies,
        ascendant,
        midheaven,
        aspectsNotThroughout,
        aspectsThroughout,
        aspectsPossible,
        elementBalances,
        modalityBalances,
        angularChanges,
        moonPhases,
        samples: scan.sampleCount,
    };
}
/**
 * Spans from a per-minute sample of a monotonic quantity's value. The angles
 * only move forward, so a value seen at two consecutive minutes held between
 * them.
 */
function sampledSpans(values, instants, minutesOf, label) {
    const spans = [];
    let startIndex = 0;
    for (let index = 1; index <= values.length; index += 1) {
        if (index === values.length || values[index] !== values[startIndex]) {
            spans.push({
                value: values[startIndex],
                fromMinutes: minutesOf(instants[startIndex]),
                toMinutes: minutesOf(instants[index - 1]),
                fromLocal: label(instants[startIndex]),
                toLocal: index === values.length ? label(instants[index - 1]) : label(instants[index]),
            });
            startIndex = index;
        }
    }
    return spans;
}
function distinct(values) {
    const seen = new Set();
    return values.filter((value) => {
        const key = JSON.stringify(value);
        if (seen.has(key))
            return false;
        seen.add(key);
        return true;
    });
}
