import { calculateMajorAspects } from './aspectEngine.js';
import { calculateWholeSignHouses } from './angleHouseEngine.js';
import { chartRulerBodyForSign } from './chartRuler.js';
import { calculateChartEmphasis } from './dignityEngine.js';
import { calculateEphemeris, } from './ephemerisEngine.js';
import { normalizeBirthTime } from './timeNormalization.js';
const EASTERN_HOUSES = new Set([1, 2, 3, 10, 11, 12]);
const SOUTHERN_HOUSES = new Set([7, 8, 9, 10, 11, 12]);
export function calculateAstrologyMvp(input) {
    const moment = normalizeBirthTime(input);
    const empty = {
        aspects: [],
        houses: null,
        elementBalance: { Fire: 0, Earth: 0, Air: 0, Water: 0 },
        modalityBalance: { Cardinal: 0, Fixed: 0, Mutable: 0 },
        hemisphereBalance: null,
        chartRuler: null,
        emphasis: null,
        retrogradeBodies: [],
    };
    if (moment.status === 'blocked') {
        return { status: 'blocked', moment, ephemeris: null, ...empty };
    }
    const ephemeris = calculateEphemeris(moment);
    const northNode = ephemeris.points.find((point) => point.body === 'North Node') ?? null;
    const aspects = calculateMajorAspects(northNode ? [...ephemeris.positions, northNode] : ephemeris.positions);
    const houses = calculateWholeSignHouses(moment, [...ephemeris.positions, ...ephemeris.points], input.birthLatitude, input.birthLongitude);
    const elementBalance = { ...empty.elementBalance };
    const modalityBalance = { ...empty.modalityBalance };
    const retrogradeBodies = [];
    for (const planet of ephemeris.positions) {
        elementBalance[planet.element] += 1;
        modalityBalance[planet.modality] += 1;
        if (planet.motionState === 'retrograde')
            retrogradeBodies.push(planet.body);
    }
    const hemisphereBalance = houses ? computeHemisphereBalance(houses.planetHouses, ephemeris.positions) : null;
    const chartRuler = houses ? computeChartRuler(houses, ephemeris.positions) : null;
    const emphasis = calculateChartEmphasis(ephemeris.positions, houses);
    return {
        status: 'calculated',
        moment,
        ephemeris,
        aspects,
        houses,
        elementBalance,
        modalityBalance,
        hemisphereBalance,
        chartRuler,
        emphasis,
        retrogradeBodies,
    };
}
function computeHemisphereBalance(planetHouses, classicalPositions) {
    const classicalBodies = new Set(classicalPositions.map((planet) => planet.body));
    const balance = { eastern: 0, western: 0, northern: 0, southern: 0 };
    for (const placement of planetHouses) {
        if (!classicalBodies.has(placement.body))
            continue;
        if (EASTERN_HOUSES.has(placement.house))
            balance.eastern += 1;
        else
            balance.western += 1;
        if (SOUTHERN_HOUSES.has(placement.house))
            balance.southern += 1;
        else
            balance.northern += 1;
    }
    return balance;
}
function computeChartRuler(houses, classicalPositions) {
    const rulerBody = chartRulerBodyForSign(houses.angles.ascendant.sign);
    if (!rulerBody)
        return null;
    const placement = houses.planetHouses.find((item) => item.body === rulerBody);
    const position = classicalPositions.find((item) => item.body === rulerBody);
    if (!placement || !position)
        return null;
    return {
        body: rulerBody,
        sign: placement.sign,
        degreeInSign: placement.degreeInSign,
        house: placement.house,
        motionState: position.motionState,
    };
}
