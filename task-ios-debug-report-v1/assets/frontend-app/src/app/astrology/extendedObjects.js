import { calculateMajorAspects, calculateMinorAspects } from './aspectEngine.js?v=b5ef5ed';
import { planetPositionFromLongitudeFunction } from './ephemerisEngine.js?v=b5ef5ed';
import { EXTENDED_OBJECT_IDS, EXTENDED_PROVIDER_ID, EXTENDED_SUPPORTED_FROM_ISO, EXTENDED_SUPPORTED_TO_ISO, extendedObjectApparentPositionAt, extendedObjectProvenance, extendedObjectSupportedAt, } from './extended/extendedObjectProvider.js?v=b5ef5ed';
const NONE = (reason) => ({ available: false, reason, providerId: 'none', positions: [], aspects: [], provenance: [] });
/**
 * Chiron and the asteroids at a birth moment, with their aspects to the chart's own bodies (`corePositions`: the ten planets and the North Node, the same set the major
 * aspects use). Deterministic and local; nothing is fetched.
 */
export function extendedObjectsFor(moment, timeKnown, corePositions = []) {
    if (moment.status !== 'ready' || !moment.utcDateTime)
        return NONE('Chiron and the asteroids need a normalized birth moment.');
    const date = new Date(moment.utcDateTime);
    const ids = EXTENDED_OBJECT_IDS.filter((id) => extendedObjectSupportedAt(id, date));
    if (ids.length === 0) {
        return NONE(`Chiron and the asteroids are calculated for births between ${EXTENDED_SUPPORTED_FROM_ISO.slice(0, 4)} and ${EXTENDED_SUPPORTED_TO_ISO.slice(0, 4)}.`);
    }
    if (!timeKnown)
        return { ...NONE('Chiron and the asteroids are placed for an exact birth moment, so they need a birth time.'), providerId: EXTENDED_PROVIDER_ID };
    const longitudeOf = (id) => (at) => extendedObjectApparentPositionAt(id, at)?.longitude ?? Number.NaN;
    const positions = ids.map((id) => {
        const provenance = extendedObjectProvenance(id);
        return planetPositionFromLongitudeFunction(id, longitudeOf(id), date, `${provenance.designation}; ${provenance.method}`);
    });
    if (positions.some((position) => !Number.isFinite(position.longitude)))
        return NONE('Chiron and the asteroids could not be calculated for this moment.');
    /* Aspects of the extended objects: to the chart's own bodies and to each other, major and minor, by the aspect engine and its one orb configuration (a narrowed limit for these objects). */
    const all = [...corePositions, ...positions];
    const names = new Set(positions.map((position) => position.body));
    const involves = (aspect) => names.has(aspect.bodyA) || names.has(aspect.bodyB);
    const aspects = [
        ...calculateMajorAspects(all).filter(involves).map((aspect) => ({
            id: aspect.id, bodyA: aspect.bodyA, bodyB: aspect.bodyB, type: aspect.aspect, category: 'major', exactAngle: aspect.exactAngle, actualAngle: aspect.actualAngle, orb: aspect.orb, maxOrb: aspect.maxOrb,
        })),
        ...calculateMinorAspects(all).filter(involves).map((aspect) => ({
            id: aspect.id, bodyA: aspect.bodyA, bodyB: aspect.bodyB, type: aspect.aspect, category: 'minor', exactAngle: aspect.exactAngle, actualAngle: aspect.actualAngle, orb: aspect.orb, maxOrb: aspect.maxOrb,
        })),
    ];
    return {
        available: true,
        reason: '',
        providerId: EXTENDED_PROVIDER_ID,
        positions,
        aspects,
        provenance: ids.map((id) => {
            const provenance = extendedObjectProvenance(id);
            return {
                id,
                label: provenance.label,
                source: `${provenance.sourceName} (${provenance.designation})`,
                method: provenance.method,
                accuracy: `at most ${provenance.accuracyArcsec.measuredMax}" of apparent longitude against JPL Horizons, ${provenance.supportedRange.fromIso.slice(0, 4)}-${provenance.supportedRange.toIso.slice(0, 4)}`,
            };
        }),
    };
}
