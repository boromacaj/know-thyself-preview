import { birthTimeBasisFromMoment } from './birthTimeBasis.js?v=d9f39e7';
import { PILLAR_EVIDENCE_CONTRACT_VERSION, } from './pillarEvidenceTypes.js?v=d9f39e7';
const SOURCE_OBJECT_NAME = 'astrology';
const SOURCE_REFERENCE = 'frontend-app/src/app/astrology/ephemerisEngine.ts + aspectEngine.ts + angleHouseEngine.ts';
// source.engineId reuses the result's own existing 'engine' descriptor string verbatim;
// source.engineVersion is the shared astronomy-engine dependency version from package.json.
// Neither value is invented — this pillar has no separate semver of its own to report.
const ASTRONOMY_ENGINE_VERSION = '2.1.19';
/**
 * Bodies whose zodiac sign/degree can meaningfully shift within a single day.
 * Under the 12:00 local-noon fallback, signals derived from these bodies (and
 * anything computed from exact local time, such as houses/angles) are marked
 * 'medium' confidence rather than 'high'. Sun and the slower planets are
 * stable at day resolution and stay 'high' regardless of birth-time basis.
 * This mirrors the app's own existing limitation text ("Ascendant, Midheaven,
 * and houses are highly time-sensitive") rather than inventing a new rule.
 */
const TIME_SENSITIVE_BODIES = new Set(['Moon']);
export function adaptAstrologyEvidence(result) {
    const birthTimeBasis = birthTimeBasisFromMoment(result.moment);
    if (result.status === 'blocked' || !result.ephemeris) {
        return {
            contractVersion: PILLAR_EVIDENCE_CONTRACT_VERSION,
            pillarId: 'western-astrology',
            status: 'blocked',
            birthTimeBasis,
            source: {
                engineId: 'astronomy-engine 2.1.19',
                engineVersion: ASTRONOMY_ENGINE_VERSION,
                frame: 'Tropical, geocentric true ecliptic of date',
                sourceReference: SOURCE_REFERENCE,
            },
            signals: [],
            limitations: [...result.moment.limitations],
        };
    }
    const { ephemeris } = result;
    const signals = [
        ...ephemeris.positions.map((planet) => positionSignal(planet, birthTimeBasis)),
        moonPhaseSignal(result, birthTimeBasis),
        ...result.aspects.map((aspect) => aspectSignal(result, aspect, birthTimeBasis)),
        balanceSignal('astrology-element-balance', 'elementBalance', 'Element balance', result.elementBalance, birthTimeBasis),
        balanceSignal('astrology-modality-balance', 'modalityBalance', 'Modality balance', result.modalityBalance, birthTimeBasis),
    ];
    if (result.houses) {
        const { houses } = result;
        signals.push(angleSignal('astrology-ascendant', 'houses.angles.ascendant', 'Ascendant', houses.angles.ascendant, birthTimeBasis), angleSignal('astrology-midheaven', 'houses.angles.midheaven', 'Midheaven', houses.angles.midheaven, birthTimeBasis), {
            signalId: 'astrology-house-system',
            themeId: 'astrology-house-system',
            pillarId: 'western-astrology',
            label: 'House system',
            value: houses.system,
            confidence: houseConfidence(birthTimeBasis),
            evidenceStrengthBasis: 'supporting',
            provenance: {
                pillarId: 'western-astrology',
                sourceObjectName: SOURCE_OBJECT_NAME,
                outputPath: 'houses.system',
                signalId: 'astrology-house-system',
            },
            interpretationNote: null,
            limitations: [],
        }, ...houses.planetHouses.map((placement) => ({
            signalId: `astrology-house-placement-${placement.body.toLowerCase()}`,
            themeId: `astrology-house-placement-${placement.body.toLowerCase()}`,
            pillarId: 'western-astrology',
            label: `${placement.body} house placement`,
            value: `House ${placement.house}`,
            confidence: houseConfidence(birthTimeBasis),
            evidenceStrengthBasis: 'supporting',
            provenance: {
                pillarId: 'western-astrology',
                sourceObjectName: SOURCE_OBJECT_NAME,
                outputPath: `houses.planetHouses[body="${placement.body}"].house`,
                signalId: `astrology-house-placement-${placement.body.toLowerCase()}`,
            },
            interpretationNote: null,
            limitations: [],
        })));
    }
    return {
        contractVersion: PILLAR_EVIDENCE_CONTRACT_VERSION,
        pillarId: 'western-astrology',
        status: 'calculated',
        birthTimeBasis,
        source: {
            engineId: ephemeris.engine,
            engineVersion: ASTRONOMY_ENGINE_VERSION,
            frame: ephemeris.frame,
            sourceReference: SOURCE_REFERENCE,
        },
        signals,
        limitations: [...result.moment.limitations],
    };
}
function positionSignal(planet, birthTimeBasis) {
    const signalId = `astrology-planet-${planet.body.toLowerCase()}`;
    return {
        signalId,
        themeId: signalId,
        pillarId: 'western-astrology',
        label: `${planet.body} position`,
        value: `${planet.sign} ${planet.degreeInSign.toFixed(2)}°`,
        confidence: bodyConfidence(planet.body, birthTimeBasis),
        evidenceStrengthBasis: 'supporting',
        provenance: {
            pillarId: 'western-astrology',
            sourceObjectName: SOURCE_OBJECT_NAME,
            outputPath: `ephemeris.positions[body="${planet.body}"]`,
            signalId,
        },
        interpretationNote: null,
        limitations: [],
    };
}
function moonPhaseSignal(result, birthTimeBasis) {
    const moonPhase = result.ephemeris.moonPhase;
    return {
        signalId: 'astrology-moon-phase',
        themeId: 'astrology-moon-phase',
        pillarId: 'western-astrology',
        label: 'Moon phase',
        value: `${moonPhase.name} (${moonPhase.illuminationPercent.toFixed(2)}% illuminated)`,
        confidence: houseConfidence(birthTimeBasis),
        evidenceStrengthBasis: 'supporting',
        provenance: {
            pillarId: 'western-astrology',
            sourceObjectName: SOURCE_OBJECT_NAME,
            outputPath: 'ephemeris.moonPhase',
            signalId: 'astrology-moon-phase',
        },
        interpretationNote: null,
        limitations: [],
    };
}
function aspectSignal(result, aspect, birthTimeBasis) {
    const signalId = `astrology-aspect-${aspect.id}`;
    const involvesTimeSensitiveBody = TIME_SENSITIVE_BODIES.has(aspect.bodyA) || TIME_SENSITIVE_BODIES.has(aspect.bodyB);
    return {
        signalId,
        themeId: signalId,
        pillarId: 'western-astrology',
        label: `${aspect.bodyA} ${aspect.aspect} ${aspect.bodyB}`,
        value: `Orb ${aspect.orb.toFixed(2)}°`,
        confidence: involvesTimeSensitiveBody ? houseConfidence(birthTimeBasis) : 'high',
        evidenceStrengthBasis: 'supporting',
        provenance: {
            pillarId: 'western-astrology',
            sourceObjectName: SOURCE_OBJECT_NAME,
            outputPath: `aspects[id="${aspect.id}"]`,
            signalId,
            ruleId: `major-aspect-${aspect.aspect.toLowerCase()}`,
        },
        interpretationNote: null,
        limitations: [],
    };
}
function balanceSignal(signalId, outputPath, label, balance, birthTimeBasis) {
    return {
        signalId,
        themeId: signalId,
        pillarId: 'western-astrology',
        label,
        value: Object.entries(balance).map(([key, count]) => `${key} ${count}`).join(' / '),
        // Moon is 1 of the 10 counted bodies and can cross a sign boundary within a
        // day; under the noon fallback that single count is genuinely uncertain,
        // so the aggregate balance is downgraded rather than left 'high'.
        confidence: houseConfidence(birthTimeBasis),
        evidenceStrengthBasis: 'supporting',
        provenance: {
            pillarId: 'western-astrology',
            sourceObjectName: SOURCE_OBJECT_NAME,
            outputPath,
            signalId,
        },
        interpretationNote: null,
        limitations: [],
    };
}
function angleSignal(signalId, outputPath, label, placement, birthTimeBasis) {
    return {
        signalId,
        themeId: signalId,
        pillarId: 'western-astrology',
        label,
        value: `${placement.sign} ${placement.degreeInSign.toFixed(2)}°`,
        confidence: houseConfidence(birthTimeBasis),
        evidenceStrengthBasis: 'supporting',
        provenance: {
            pillarId: 'western-astrology',
            sourceObjectName: SOURCE_OBJECT_NAME,
            outputPath,
            signalId,
        },
        interpretationNote: null,
        limitations: [],
    };
}
function bodyConfidence(body, birthTimeBasis) {
    return TIME_SENSITIVE_BODIES.has(body) ? houseConfidence(birthTimeBasis) : 'high';
}
function houseConfidence(birthTimeBasis) {
    return birthTimeBasis === 'estimated-local-noon' ? 'medium' : 'high';
}
