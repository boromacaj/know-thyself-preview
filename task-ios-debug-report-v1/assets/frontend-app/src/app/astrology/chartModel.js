import { calculateMinorAspects } from './aspectEngine.js?v=b5ef5ed';
import { calculateHouseCusps, DEFAULT_HOUSE_SYSTEM, houseForLongitude, HOUSE_SYSTEM_IDS, HOUSE_SYSTEMS } from './houseSystems.js?v=b5ef5ed';
import { extendedObjectsFor } from './extendedObjects.js?v=b5ef5ed';
export const DEFAULT_CHART_OPTIONS = Object.freeze({
    lunarNodes: true,
    majorAspects: true,
    houseNumbers: true,
    retrogradeMarkers: true,
    minorAspects: false,
    degreeLabels: false,
    extendedObjects: [],
    houseSystem: DEFAULT_HOUSE_SYSTEM,
});
const MODEL_CACHE = new WeakMap();
/**
 * Build the model once per calculated chart; every later call with the same chart returns the same object. A request without the extended objects is answered by the whole model
 * when it already exists (it contains everything), and a request for the whole model is built once, on first need.
 */
export function buildChartModel(data, options = {}) {
    const withExtended = options.extended !== false;
    const slot = MODEL_CACHE.get(data.astrology) ?? {};
    if (!data.anglesSuppressed) {
        if (slot.full)
            return slot.full;
        if (!withExtended && slot.core)
            return slot.core;
    }
    const model = assemble(data, withExtended);
    if (!data.anglesSuppressed) {
        slot[withExtended ? 'full' : 'core'] = model;
        MODEL_CACHE.set(data.astrology, slot);
    }
    return model;
}
const EXTENDED_NOT_CALCULATED = { available: false, reason: 'Chiron and the asteroids are not calculated in this view of the chart.', providerId: 'none', positions: [], aspects: [], provenance: [] };
function assemble(data, withExtended) {
    const { astrology, anglesSuppressed } = data;
    const ephemeris = astrology.ephemeris;
    const emptyCapabilities = {
        angles: { available: false, reason: 'The chart could not be calculated.' },
        lunarNodes: { available: false },
        minorAspects: { available: false, reason: 'The chart could not be calculated.' },
        houseSystems: { available: [], unavailable: [] },
        extendedObjects: { available: false, reason: 'The chart could not be calculated.', objects: [] },
    };
    if (astrology.status === 'blocked' || !ephemeris) {
        return { version: 1, anglesAvailable: false, bodies: [], angles: null, houseSystems: [], defaultHouseSystem: DEFAULT_HOUSE_SYSTEM, aspects: [], capabilities: emptyCapabilities, extendedProvenance: [] };
    }
    const houses = !anglesSuppressed ? astrology.houses : null;
    const anglesAvailable = Boolean(houses);
    /* HOUSE SYSTEMS: the Whole Sign result is the engine's own; every other system is calculated from the SAME angles by houseSystems.ts. */
    const houseSystems = [];
    const unavailable = [];
    if (houses) {
        for (const id of HOUSE_SYSTEM_IDS) {
            const result = calculateHouseCusps(id, houses.angles);
            if (result.available)
                houseSystems.push({ id, label: HOUSE_SYSTEMS[id].label, method: HOUSE_SYSTEMS[id].method, cusps: result.result.cusps });
            else
                unavailable.push({ id, reason: result.reason });
        }
    }
    const bodyOf = (position, kind, source) => {
        const bodyHouses = {};
        for (const system of houseSystems) {
            /* The reading's own Whole Sign placement is used as it stands (it is what the reading says); the others are located on their cusps. */
            const whole = system.id === 'whole-sign' ? houses?.planetHouses.find((item) => item.body === position.body)?.house : undefined;
            bodyHouses[system.id] = whole ?? houseForLongitude(system.cusps, position.longitude);
        }
        return {
            id: position.body,
            kind,
            longitude: position.longitude,
            sign: position.sign,
            degreeInSign: position.degreeInSign,
            motionState: position.motionState,
            speedDegreesPerDay: position.speedDegreesPerDay,
            source,
            houses: bodyHouses,
        };
    };
    const bodies = [
        ...ephemeris.positions.map((position) => bodyOf(position, 'planet', position.method)),
        ...ephemeris.points.map((position) => bodyOf(position, 'node', position.method)),
    ];
    /* EXTENDED OBJECTS (Chiron, asteroids) come from an optional provider through the same PlanetPosition shape; when there is no provider, or the birth is outside what it
       can calculate, there are none and the capability says why. */
    const northNodeForExtended = ephemeris.points.find((point) => point.body === 'North Node');
    const extended = withExtended
        ? extendedObjectsFor(astrology.moment, !anglesSuppressed, northNodeForExtended ? [...ephemeris.positions, northNodeForExtended] : ephemeris.positions)
        : EXTENDED_NOT_CALCULATED;
    for (const position of extended.positions)
        bodies.push(bodyOf(position, 'extended', extended.providerId));
    /* ASPECTS: the major ones exactly as the engine already reports them (the reading reads these same objects), then the minor ones from the aspect engine, then
       those of the extended objects. A chart with no birth time withholds the minor and extended aspects: they are calculated for an exact moment, not a day. */
    const aspects = astrology.aspects.map((aspect) => ({
        id: aspect.id, bodyA: aspect.bodyA, bodyB: aspect.bodyB, type: aspect.aspect, category: 'major', exactAngle: aspect.exactAngle, actualAngle: aspect.actualAngle,
        orb: aspect.orb, maxOrb: aspect.maxOrb, involvesExtended: false,
    }));
    const minorsAvailable = !anglesSuppressed;
    if (minorsAvailable) {
        const northNode = ephemeris.points.find((point) => point.body === 'North Node');
        const aspected = northNode ? [...ephemeris.positions, northNode] : [...ephemeris.positions];
        for (const aspect of calculateMinorAspects(aspected)) {
            aspects.push({ id: aspect.id, bodyA: aspect.bodyA, bodyB: aspect.bodyB, type: aspect.aspect, category: 'minor', exactAngle: aspect.exactAngle, actualAngle: aspect.actualAngle, orb: aspect.orb, maxOrb: aspect.maxOrb, involvesExtended: false });
        }
        for (const aspect of extended.aspects)
            aspects.push({ ...aspect, involvesExtended: true });
    }
    const capabilities = {
        angles: anglesAvailable ? { available: true } : { available: false, reason: 'The Ascendant, Midheaven and houses need a birth time.' },
        lunarNodes: { available: true },
        minorAspects: minorsAvailable ? { available: true } : { available: false, reason: 'Minor aspects are calculated for an exact birth moment, so they need a birth time.' },
        houseSystems: { available: houseSystems.map((system) => system.id), unavailable },
        extendedObjects: extended.available && minorsAvailable
            ? { available: true, objects: extended.positions.map((position) => position.body) }
            : { available: false, reason: extended.available ? 'Chiron and the asteroids are placed for an exact birth moment, so they need a birth time.' : extended.reason, objects: [] },
    };
    return {
        version: 1,
        anglesAvailable,
        bodies: minorsAvailable ? bodies : bodies.filter((body) => body.kind !== 'extended'),
        angles: houses ? {
            ASC: houses.angles.ascendant.longitude,
            DSC: normalize(houses.angles.ascendant.longitude + 180),
            MC: houses.angles.midheaven.longitude,
            IC: normalize(houses.angles.midheaven.longitude + 180),
        } : null,
        houseSystems,
        defaultHouseSystem: DEFAULT_HOUSE_SYSTEM,
        aspects,
        capabilities,
        extendedProvenance: extended.provenance,
    };
}
/**
 * The options as a chart can honour them: a choice for something this chart cannot do is dropped, not drawn. The result is what the renderer reads, so no layer ever
 * appears for a capability the model does not report.
 */
export function resolveChartOptions(model, options = {}) {
    const merged = { ...DEFAULT_CHART_OPTIONS, ...options };
    const caps = model.capabilities;
    const systemAvailable = caps.houseSystems.available.includes(merged.houseSystem);
    return {
        lunarNodes: Boolean(merged.lunarNodes),
        majorAspects: Boolean(merged.majorAspects),
        houseNumbers: Boolean(merged.houseNumbers),
        retrogradeMarkers: Boolean(merged.retrogradeMarkers),
        minorAspects: Boolean(merged.minorAspects) && caps.minorAspects.available,
        degreeLabels: Boolean(merged.degreeLabels),
        extendedObjects: caps.extendedObjects.available ? merged.extendedObjects.filter((id) => caps.extendedObjects.objects.includes(id)) : [],
        houseSystem: systemAvailable ? merged.houseSystem : model.defaultHouseSystem,
    };
}
/** True when the options are exactly the standard chart (nothing the Advanced Chart adds is on, and the house system is the canonical one). */
export function isStandardChart(options) {
    return options.minorAspects === false && options.degreeLabels === false && options.extendedObjects.length === 0 && options.houseSystem === DEFAULT_HOUSE_SYSTEM
        && options.lunarNodes && options.majorAspects && options.houseNumbers && options.retrogradeMarkers;
}
function normalize(value) {
    return ((value % 360) + 360) % 360;
}
