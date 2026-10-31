import { houseNumberForSign } from '../astrology/angleHouseEngine.js';
import { birthTimePrecisionOf } from '../birthTimePrecision.js';
import { SIGN_NAMES, placementOf } from './lunarEvents.js';
export function lunarNatalFrom(experience) {
    if (!experience)
        return null;
    const chart = experience.pillars.find((pillar) => pillar.id === 'western-astrology')?.westernAstrologyChart;
    const positions = chart?.astrology?.ephemeris?.positions;
    if (!chart || !positions || positions.length === 0)
        return null;
    const declared = chart.timePrecision ?? birthTimePrecisionOf(experience.input);
    const exact = declared === 'exact' && !chart.anglesSuppressed;
    const angles = chart.astrology.houses?.angles;
    return {
        positions,
        certainty: exact ? 'exact' : declared === 'approximate' ? 'approximate' : 'unknown',
        ascendantLongitude: exact && angles ? angles.ascendant.longitude : null,
        midheavenLongitude: exact && angles ? angles.midheaven.longitude : null,
    };
}
const ASPECT_ANGLE = { conjunction: 0, sextile: 60, square: 90, trine: 120, opposition: 180 };
const ASPECT_WEIGHT = { conjunction: 1, opposition: 1, square: 0.9, trine: 0.6, sextile: 0.55 };
const IMPORTANCE = {
    Sun: 1, Moon: 1, Ascendant: 1, Midheaven: 0.9, Venus: 0.8, Mars: 0.8, Mercury: 0.7, Saturn: 0.7, Jupiter: 0.6, Pluto: 0.6, Uranus: 0.55, Neptune: 0.55,
};
/** Orb limit for a hard aspect (conjunction, opposition, square): wide for the personal points, narrow for the slow planets. */
const HARD_ORB = {
    Sun: 4, Moon: 4, Ascendant: 4, Midheaven: 4, Mercury: 4, Venus: 4, Mars: 4, Jupiter: 3, Saturn: 3, Uranus: 2, Neptune: 2, Pluto: 2,
};
const EASY_ORB = 2.5;
const EASY_BODIES = new Set(['Sun', 'Moon', 'Ascendant', 'Midheaven', 'Mercury', 'Venus', 'Mars']);
/** Natal points whose position a non-exact birth time leaves about a degree uncertain (the Moon, angles and houses are withheld outright). */
const TIME_SENSITIVE = new Set(['Sun', 'Mercury', 'Venus', 'Mars']);
const TIME_UNCERTAINTY_DEGREES = 1;
const MAX_ACTIVATIONS = 3;
const wrap = (value) => ((value % 360) + 360) % 360;
const separation = (a, b) => {
    const d = Math.abs(wrap(a) - wrap(b));
    return Math.min(d, 360 - d);
};
const SIGN_LINK_BY_DISTANCE = {
    0: 'same', 2: 'sextile', 3: 'square', 4: 'trine', 6: 'opposite',
};
function pointsOf(natal) {
    const points = [];
    for (const position of natal.positions) {
        const name = position.body;
        if (!(name in IMPORTANCE) || name === 'Ascendant' || name === 'Midheaven')
            continue;
        if (name === 'Moon' && natal.certainty !== 'exact')
            continue;
        points.push({ point: name, longitude: position.longitude });
    }
    if (natal.certainty === 'exact') {
        if (natal.ascendantLongitude !== null)
            points.push({ point: 'Ascendant', longitude: natal.ascendantLongitude });
        if (natal.midheavenLongitude !== null)
            points.push({ point: 'Midheaven', longitude: natal.midheavenLongitude });
    }
    return points;
}
export function lunarEventNatalReading(event, natal) {
    const exact = natal.certainty === 'exact';
    const ascendantSign = natal.ascendantLongitude === null ? null : placementOf(natal.ascendantLongitude).signIndex;
    const moonHouse = exact && ascendantSign !== null ? houseNumberForSign(placementOf(event.moonLongitude).signIndex, ascendantSign) : null;
    const sunHouse = exact && ascendantSign !== null ? houseNumberForSign(placementOf(event.sunLongitude).signIndex, ascendantSign) : null;
    /* the tightest contact of each natal point with either end of the event (conjunct, opposite, square it, or in an easy aspect) */
    const best = new Map();
    for (const { point, longitude } of pointsOf(natal)) {
        const slack = !exact && TIME_SENSITIVE.has(point) ? TIME_UNCERTAINTY_DEGREES : 0;
        for (const eventBody of ['Moon', 'Sun']) {
            const eventLongitude = eventBody === 'Moon' ? event.moonLongitude : event.sunLongitude;
            for (const aspect of Object.keys(ASPECT_ANGLE)) {
                const hard = aspect === 'conjunction' || aspect === 'opposition' || aspect === 'square';
                if (!hard && !EASY_BODIES.has(point))
                    continue;
                /* at a New Moon both ends are one point: the Sun's contacts are the Moon's, so only the Moon is listed */
                if (event.kind === 'new' && eventBody === 'Sun')
                    continue;
                /* at a Full Moon an opposition to one end is a conjunction to the other: keep the conjunction, named for the end it sits on */
                if (event.kind === 'full' && aspect === 'opposition')
                    continue;
                const limit = (hard ? HARD_ORB[point] : EASY_ORB) - slack;
                if (limit <= 0)
                    continue;
                let distance = separation(eventLongitude, longitude);
                distance = Math.abs(distance - ASPECT_ANGLE[aspect]);
                if (distance > limit)
                    continue;
                const score = IMPORTANCE[point] * ASPECT_WEIGHT[aspect] * (1 - distance / (limit + 0.001));
                const known = best.get(point);
                if (!known || score > known.score) {
                    const natalHouse = exact && ascendantSign !== null ? houseNumberForSign(placementOf(longitude).signIndex, ascendantSign) : null;
                    best.set(point, { eventBody, natal: point, aspect, orb: Math.round(distance * 10) / 10, showOrb: exact, score, natalHouse });
                }
            }
        }
    }
    const activations = [...best.values()].sort((a, b) => b.score - a.score || a.natal.localeCompare(b.natal)).slice(0, MAX_ACTIVATIONS);
    const natalSun = natal.positions.find((position) => position.body === 'Sun');
    let natalSunSign = null;
    let signLink = null;
    let elementLink = null;
    if (natalSun) {
        natalSunSign = SIGN_NAMES[placementOf(natalSun.longitude).signIndex];
        const distance = Math.abs(placementOf(event.moonLongitude).signIndex - placementOf(natalSun.longitude).signIndex);
        const wrapped = Math.min(distance, 12 - distance);
        signLink = SIGN_LINK_BY_DISTANCE[wrapped] ?? 'none';
        const moonElement = placementOf(event.moonLongitude).signIndex % 4;
        const sunElement = placementOf(natalSun.longitude).signIndex % 4;
        const relation = moonElement === sunElement ? 'same' : (moonElement + sunElement) % 2 === 0 ? 'compatible' : 'different';
        elementLink = { element: moonElement, relation };
    }
    return { certainty: natal.certainty, moonHouse, sunHouse, activations, natalSunSign, signLink, elementLink };
}
