import { BAZI_ELEMENTS } from '../bazi/data/baziConstants.js';
import { PILLAR_EVIDENCE_CONTRACT_VERSION, } from './pillarEvidenceTypes.js';
const SOURCE_OBJECT_NAME = 'bazi';
const SOURCE_REFERENCE = 'frontend-app/src/app/bazi/baziEngine.ts + data/baziConstants.ts';
// source.engineId reuses the result's own existing 'engine' descriptor string verbatim;
// source.engineVersion is the shared astronomy-engine dependency version from package.json.
// Neither value is invented — this pillar has no separate semver of its own to report.
const ASTRONOMY_ENGINE_VERSION = '2.1.19';
export function adaptBaziEvidence(result) {
    const birthTimeBasis = result.birthTimePrecision;
    const source = {
        engineId: result.engine,
        engineVersion: ASTRONOMY_ENGINE_VERSION,
        frame: result.frame,
        sourceReference: SOURCE_REFERENCE,
    };
    if (result.status === 'blocked' || !result.yearPillar || !result.monthPillar || !result.dayPillar || !result.dayMaster) {
        return {
            contractVersion: PILLAR_EVIDENCE_CONTRACT_VERSION,
            pillarId: 'bazi-tcm',
            status: 'blocked',
            birthTimeBasis,
            source,
            signals: [],
            limitations: [...result.limitations],
        };
    }
    // Year/Month boundaries can be approximate on a solar-term boundary day when
    // the local-noon fallback was used; Day Pillar and Day Master depend only
    // on the calendar date, never on time of day, so they stay 'high'.
    const boundaryConfidence = birthTimeBasis === 'estimated-local-noon' ? 'medium' : 'high';
    const limitations = [...result.limitations];
    const signals = [
        pillarSignal('bazi-year-pillar', 'yearPillar', 'Year Pillar', result.yearPillar.symbolicLabel, boundaryConfidence),
        pillarSignal('bazi-month-pillar', 'monthPillar', 'Month Pillar', result.monthPillar.symbolicLabel, boundaryConfidence),
        pillarSignal('bazi-day-pillar', 'dayPillar', 'Day Pillar', result.dayPillar.symbolicLabel, 'high'),
        {
            signalId: 'bazi-day-master',
            themeId: 'bazi-day-master',
            pillarId: 'bazi-tcm',
            label: 'Day Master',
            value: `${result.dayMaster.name} ${result.dayMaster.element}`,
            confidence: 'high',
            evidenceStrengthBasis: 'supporting',
            provenance: {
                pillarId: 'bazi-tcm',
                sourceObjectName: SOURCE_OBJECT_NAME,
                outputPath: 'dayMaster',
                signalId: 'bazi-day-master',
            },
            interpretationNote: null,
            limitations: [],
        },
        ...BAZI_ELEMENTS.map((element) => elementSignal(element, result.elementCounts[element], boundaryConfidence)),
        {
            signalId: 'bazi-polarity-balance',
            themeId: 'bazi-polarity-balance',
            pillarId: 'bazi-tcm',
            label: 'Yin / Yang balance',
            value: `Yin ${result.polarityCounts.Yin} / Yang ${result.polarityCounts.Yang}`,
            confidence: boundaryConfidence,
            evidenceStrengthBasis: 'supporting',
            provenance: {
                pillarId: 'bazi-tcm',
                sourceObjectName: SOURCE_OBJECT_NAME,
                outputPath: 'polarityCounts',
                signalId: 'bazi-polarity-balance',
            },
            interpretationNote: null,
            limitations: [],
        },
    ];
    if (result.activeSolarTerm) {
        signals.push({
            signalId: 'bazi-active-solar-term',
            themeId: 'bazi-active-solar-term',
            pillarId: 'bazi-tcm',
            label: 'Active solar term',
            value: `${result.activeSolarTerm.name} (${result.activeSolarTerm.character})`,
            confidence: boundaryConfidence,
            evidenceStrengthBasis: 'supporting',
            provenance: {
                pillarId: 'bazi-tcm',
                sourceObjectName: SOURCE_OBJECT_NAME,
                outputPath: 'activeSolarTerm',
                signalId: 'bazi-active-solar-term',
            },
            interpretationNote: null,
            limitations: [],
        });
    }
    // Hour Pillar is only present when the engine itself resolved it from a
    // user-supplied time (see baziEngine.ts: hourPillar is null whenever
    // birthTimeWasSupplied is false). Never fabricated here.
    if (result.hourPillar) {
        signals.push(pillarSignal('bazi-hour-pillar', 'hourPillar', 'Hour Pillar', result.hourPillar.symbolicLabel, 'high'));
    }
    else {
        limitations.push('Hour Pillar is unavailable because birth time was not supplied; it is never fabricated from the local-noon fallback.');
    }
    return {
        contractVersion: PILLAR_EVIDENCE_CONTRACT_VERSION,
        pillarId: 'bazi-tcm',
        status: 'calculated',
        birthTimeBasis,
        source,
        signals,
        limitations,
    };
}
function pillarSignal(signalId, outputPath, label, value, confidence) {
    return {
        signalId,
        themeId: signalId,
        pillarId: 'bazi-tcm',
        label,
        value,
        confidence,
        evidenceStrengthBasis: 'supporting',
        provenance: {
            pillarId: 'bazi-tcm',
            sourceObjectName: SOURCE_OBJECT_NAME,
            outputPath,
            signalId,
        },
        interpretationNote: null,
        limitations: [],
    };
}
function elementSignal(element, count, confidence) {
    const signalId = `bazi-element-${element.toLowerCase()}`;
    return {
        signalId,
        themeId: signalId,
        pillarId: 'bazi-tcm',
        label: `${element} count`,
        value: count,
        confidence,
        evidenceStrengthBasis: 'supporting',
        provenance: {
            pillarId: 'bazi-tcm',
            sourceObjectName: SOURCE_OBJECT_NAME,
            outputPath: `elementCounts.${element}`,
            signalId,
        },
        interpretationNote: null,
        limitations: [],
    };
}
