import { birthTimeBasisFromMoment } from './birthTimeBasis.js?v=2ea79e9';
import { PILLAR_EVIDENCE_CONTRACT_VERSION, } from './pillarEvidenceTypes.js?v=2ea79e9';
const SOURCE_OBJECT_NAME = 'humanDesign';
const SOURCE_REFERENCE = 'frontend-app/src/app/human-design/humanDesignEngine.ts + humanDesignMechanics.ts';
// source.engineId reuses the result's own existing 'engine' descriptor string verbatim;
// source.engineVersion is the shared astronomy-engine dependency version from package.json.
// Neither value is invented — this pillar has no separate semver of its own to report.
const ASTRONOMY_ENGINE_VERSION = '2.1.19';
/**
 * Human Design mechanics (Type, Strategy, Authority, Profile, Definition,
 * Channels, Centers, Gates) may only be used as evidence when the birth
 * moment is confirmed 'ready' AND the birth time basis is 'user-supplied'.
 * Any other case — blocked calculation, estimated-local-noon, or an
 * unrecognized/uncertain basis — is treated conservatively as suppressed.
 * 'low-confidence' is part of the Phase 1 vocabulary but is not currently
 * produced: no available pillar output exposes a partial-confidence signal
 * (e.g. an ambiguous-but-not-fully-estimated time) distinct from the
 * blocked/estimated-noon cases already handled here.
 */
export function resolveHumanDesignFallbackStatus(result, birthTimeBasis) {
    if (result.status === 'blocked')
        return 'unavailable';
    if (birthTimeBasis === 'user-supplied')
        return 'available';
    return 'suppressed-mechanics';
}
export function adaptHumanDesignEvidence(result, birthMoment) {
    const birthTimeBasis = birthTimeBasisFromMoment(birthMoment);
    const fallbackStatus = resolveHumanDesignFallbackStatus(result, birthTimeBasis);
    const source = {
        engineId: result.engine,
        engineVersion: ASTRONOMY_ENGINE_VERSION,
        frame: result.frame,
        sourceReference: SOURCE_REFERENCE,
    };
    if (fallbackStatus === 'unavailable') {
        return {
            contractVersion: PILLAR_EVIDENCE_CONTRACT_VERSION,
            pillarId: 'human-design',
            status: 'blocked',
            birthTimeBasis,
            source,
            signals: [],
            limitations: [...result.limitations],
        };
    }
    if (fallbackStatus === 'suppressed-mechanics' || fallbackStatus === 'low-confidence') {
        return {
            contractVersion: PILLAR_EVIDENCE_CONTRACT_VERSION,
            pillarId: 'human-design',
            status: 'suppressed-mechanics',
            birthTimeBasis,
            source,
            signals: [],
            limitations: [
                'Human Design mechanics (Type, Strategy, Authority, Profile, Definition, Channels, Centers, Gates) are suppressed because birth time was not confirmed as user-supplied. They are never cited as evidence under the local-noon estimate.',
                ...result.limitations,
            ],
        };
    }
    // fallbackStatus === 'available'
    const signals = [
        stringSignal('human-design-type', 'type', 'Type', result.type),
        stringSignal('human-design-strategy', 'strategy', 'Strategy', result.strategy),
        stringSignal('human-design-authority', 'authority', 'Authority', result.authority),
        stringSignal('human-design-definition', 'definition', 'Definition', result.definition),
        stringSignal('human-design-profile', 'profile', 'Profile', result.profile ?? 'Unavailable'),
        stringSignal('human-design-defined-centers', 'definedCenters', 'Defined Centers', result.definedCenters.join(', ') || 'None'),
        stringSignal('human-design-defined-channels', 'definedChannels', 'Defined Channels', result.definedChannels.map((channel) => channel.id).join(', ') || 'None'),
        stringSignal('human-design-activated-gates', 'activatedGates', 'Activated Gates', result.activatedGates.join(', ') || 'None'),
        stringSignal('human-design-motor-to-throat', 'motorToThroat', 'Motor to Throat', result.motorToThroat ? 'Connected' : 'Not connected'),
    ];
    return {
        contractVersion: PILLAR_EVIDENCE_CONTRACT_VERSION,
        pillarId: 'human-design',
        status: 'calculated',
        birthTimeBasis,
        source,
        signals,
        limitations: [...result.limitations],
    };
}
function stringSignal(signalId, outputPath, label, value) {
    return {
        signalId,
        themeId: signalId,
        pillarId: 'human-design',
        label,
        value,
        confidence: 'high',
        evidenceStrengthBasis: 'supporting',
        provenance: {
            pillarId: 'human-design',
            sourceObjectName: SOURCE_OBJECT_NAME,
            outputPath,
            signalId,
        },
        interpretationNote: null,
        limitations: [],
    };
}
