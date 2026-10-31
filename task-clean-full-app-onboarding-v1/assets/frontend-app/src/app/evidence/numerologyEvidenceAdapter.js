import { PILLAR_EVIDENCE_CONTRACT_VERSION, } from './pillarEvidenceTypes.js?v=f9ab0a6';
const SOURCE_OBJECT_NAME = 'coreResult.numerologyOutput';
const SOURCE_REFERENCE = 'frontend-app/src/core/numerology.ts';
/**
 * Numerology has no birth-time dependency (dates only), so it is never
 * blocked or suppressed in this adapter and birthTimeBasis is always
 * 'not-applicable'.
 */
export function adaptNumerologyEvidence(engineOutput) {
    const confidence = toConfidenceBand(engineOutput.confidenceMetadata.overallConfidence);
    const raw = engineOutput.rawOutput;
    const signals = [
        numberSignal('numerology-life-path', 'rawOutput.lifePathNumber', raw.lifePathNumber, confidence),
        numberSignal('numerology-birth-day', 'rawOutput.birthDayNumber', raw.birthDayNumber, confidence),
        numberSignal('numerology-expression', 'rawOutput.expressionNumber', raw.expressionNumber, confidence),
        numberSignal('numerology-soul-urge', 'rawOutput.soulUrgeNumber', raw.soulUrgeNumber, confidence),
        numberSignal('numerology-personality', 'rawOutput.personalityNumber', raw.personalityNumber, confidence),
        numberSignal('numerology-personal-year', 'rawOutput.personalYearNumber', raw.personalYearNumber, confidence),
        numberSignal('numerology-personal-month', 'rawOutput.personalMonthNumber', raw.personalMonthNumber, confidence),
        numberSignal('numerology-personal-day', 'rawOutput.personalDayNumber', raw.personalDayNumber, confidence),
        numberSignal('numerology-balance', 'rawOutput.balanceNumber', raw.balanceNumber, confidence),
        numberSignal('numerology-pinnacle-1', 'rawOutput.pinnacleNumbers.first', raw.pinnacleNumbers.first, confidence),
        numberSignal('numerology-pinnacle-2', 'rawOutput.pinnacleNumbers.second', raw.pinnacleNumbers.second, confidence),
        numberSignal('numerology-pinnacle-3', 'rawOutput.pinnacleNumbers.third', raw.pinnacleNumbers.third, confidence),
        numberSignal('numerology-pinnacle-4', 'rawOutput.pinnacleNumbers.fourth', raw.pinnacleNumbers.fourth, confidence),
        numberSignal('numerology-challenge-1', 'rawOutput.challengeNumbers.first', raw.challengeNumbers.first, confidence),
        numberSignal('numerology-challenge-2', 'rawOutput.challengeNumbers.second', raw.challengeNumbers.second, confidence),
        numberSignal('numerology-challenge-3', 'rawOutput.challengeNumbers.third', raw.challengeNumbers.third, confidence),
        numberSignal('numerology-challenge-4', 'rawOutput.challengeNumbers.fourth', raw.challengeNumbers.fourth, confidence),
        patternSignal('numerology-karmic-lessons', 'rawOutput.karmicLessons', raw.karmicLessons, confidence),
        patternSignal('numerology-hidden-passion', 'rawOutput.hiddenPassionNumbers', raw.hiddenPassionNumbers, confidence),
    ];
    return {
        contractVersion: PILLAR_EVIDENCE_CONTRACT_VERSION,
        pillarId: 'numerology',
        status: 'calculated',
        birthTimeBasis: 'not-applicable',
        source: {
            engineId: engineOutput.engineId,
            engineVersion: engineOutput.engineVersion,
            frame: 'Pythagorean digit-sum reduction (deterministic, local)',
            sourceReference: SOURCE_REFERENCE,
        },
        signals,
        limitations: [...engineOutput.safetyMetadata.interpretationRestrictions],
    };
}
function numberSignal(signalId, outputPath, calculation, confidence) {
    return {
        signalId,
        themeId: signalId,
        pillarId: 'numerology',
        label: calculation.label,
        value: calculation.finalNumber,
        confidence,
        evidenceStrengthBasis: 'supporting',
        provenance: {
            pillarId: 'numerology',
            sourceObjectName: SOURCE_OBJECT_NAME,
            outputPath: `${outputPath}.finalNumber`,
            signalId,
        },
        interpretationNote: null,
        limitations: calculation.preservedMasterNumber
            ? ['Master number preserved; not reduced to a single digit.']
            : [],
    };
}
function patternSignal(signalId, outputPath, calculation, confidence) {
    return {
        signalId,
        themeId: signalId,
        pillarId: 'numerology',
        label: calculation.label,
        value: calculation.finalValues.join(', ') || 'None',
        confidence,
        evidenceStrengthBasis: 'supporting',
        provenance: {
            pillarId: 'numerology',
            sourceObjectName: SOURCE_OBJECT_NAME,
            outputPath: `${outputPath}.finalValues`,
            signalId,
        },
        interpretationNote: null,
        limitations: calculation.note ? [calculation.note] : [],
    };
}
function toConfidenceBand(confidence) {
    return confidence;
}
