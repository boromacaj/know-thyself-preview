import { getPillar } from '../model.js?v=d9f39e7';
import { buildExportProfileContext } from './exportProfileContext.js?v=d9f39e7';
import { buildNumerologyExport } from './numerologyExport.js?v=d9f39e7';
import { buildWesternAstrologyExport } from './westernAstrologyExport.js?v=d9f39e7';
import { buildBaziExport } from './baziExport.js?v=d9f39e7';
import { buildHumanDesignExport } from './humanDesignExport.js?v=d9f39e7';
import { buildCrossPillarSignals } from './crossPillarSignals.js?v=d9f39e7';
import { buildCrossPillarCandidates } from './crossPillarCandidates.js?v=d9f39e7';
import { SEMANTIC_GUARDRAILS } from './semanticGuardrails.js?v=d9f39e7';
import { buildIntegritySummary } from './exportValidation.js?v=d9f39e7';
import { EXPORT_SCHEMA_ID, EXPORT_SCHEMA_VERSION, PILLAR_EXPORT_SCHEMA_ID, PILLAR_EXPORT_SCHEMA_VERSION, } from './exportTypes.js?v=d9f39e7';
const PENDING_INTEGRITY = {
    valid: true,
    missingRequiredSections: [],
    warnings: [],
    unsupportedFields: [],
    suppressedFields: [],
    estimatedFields: [],
    schemaValidationStatus: 'pending',
    containsSecrets: false,
};
export function buildPillarSections(experience) {
    return {
        numerology: buildNumerologyExport(experience),
        westernAstrology: buildWesternAstrologyExport(getPillar(experience, 'western-astrology')),
        baziTcm: buildBaziExport(getPillar(experience, 'bazi-tcm')),
        humanDesign: buildHumanDesignExport(getPillar(experience, 'human-design'), experience),
    };
}
function sectionWarningMessages(pillarId, section) {
    if (pillarId === 'numerology')
        return section.warnings;
    if (pillarId === 'western-astrology')
        return section.warnings;
    if (pillarId === 'human-design')
        return section.warnings;
    const bazi = section;
    return [...bazi.warnings.map((warning) => warning.message), ...bazi.limitations];
}
function collectUnsupported(pillars) {
    return [
        ...pillars.numerology.unsupportedFields.map((field) => `numerology: ${field}`),
        ...pillars.westernAstrology.unsupportedFields.map((field) => `western-astrology: ${field}`),
        ...pillars.baziTcm.unsupportedFields.map((field) => `bazi-tcm: ${field}`),
        ...pillars.humanDesign.unsupportedFields.map((field) => `human-design: ${field}`),
    ];
}
function collectSuppressed(pillars) {
    const suppressed = [];
    if (pillars.westernAstrology.missingTimeBehavior.anglesSuppressed) {
        suppressed.push('western-astrology: Ascendant, Midheaven, Descendant, Imum Coeli, houses, house placements, hemisphere balance, chart ruler');
    }
    if (pillars.humanDesign.mechanicsSuppressed) {
        suppressed.push('human-design: Type, Strategy, Authority, Profile, Definition, defined centers/channels, activated-gate list');
    }
    if (pillars.baziTcm.status === 'calculated' && !pillars.baziTcm.pillars.hour) {
        suppressed.push('bazi-tcm: Hour Pillar');
    }
    return suppressed;
}
function collectEstimated(pillars) {
    const estimated = [];
    if (pillars.westernAstrology.missingTimeBehavior.moonApproximate) {
        estimated.push('western-astrology: Moon sign/degree and any balance/aspect involving the Moon');
    }
    if (pillars.humanDesign.mechanicsSuppressed) {
        estimated.push('human-design: raw Personality/Design gate and line activations (12:00 local-noon estimate)');
    }
    if (pillars.baziTcm.timePipeline.birthTimePrecision === 'estimated-local-noon') {
        estimated.push('bazi-tcm: Year/Month Pillar boundaries on a solar-term boundary day');
    }
    return estimated;
}
export function collectMethodologyWarnings() {
    return [
        { code: 'western-astrology-house-system', message: 'Western Astrology readings and exports use Whole Sign Houses; Equal House, Porphyry and Placidus exist only on the chart wheel (Advanced chart).', scope: 'western-astrology' },
        { code: 'bazi-true-solar-time', message: 'BaZi uses true solar time (civil time retained for comparison) for the Hour Pillar when birth time is supplied.', scope: 'bazi-tcm' },
        { code: 'human-design-local-engine', message: 'Human Design uses a local astronomy-engine calculation; no external Human Design API is used.', scope: 'human-design' },
        { code: 'numerology-letter-mapping', message: 'Numerology uses a fixed Pythagorean letter-to-digit mapping (see methodology.letterMapping).', scope: 'numerology' },
        { code: 'bazi-tcm-non-diagnostic', message: 'TCM content is traditional correspondence, not diagnosis, not medical advice.', scope: 'bazi-tcm' },
        { code: 'human-design-unsupported-mechanics', message: 'Human Design Incarnation Cross, Variables, PHS, Environment, Motivation, and Cognition are not implemented and are never fabricated.', scope: 'human-design' },
        { code: 'bazi-luck-pillar-direction', message: 'BaZi Luck Pillar (Da Yun) direction follows Year Stem polarity with the body selected at onboarding; both forward and reverse sequences are calculated and the natal chart does not choose between them, the Forecast applies the rule, and no direction is chosen when that body was left undefined.', scope: 'bazi-tcm' },
        { code: 'bazi-day-master-strength-heuristic', message: 'BaZi Day Master strength is a model-derived heuristic, not a definitive Useful God (Yong Shen) determination.', scope: 'bazi-tcm' },
        { code: 'missing-birth-time', message: 'Missing birth time suppresses angle-dependent Western Astrology fields and Human Design derived mechanics; it is never used to fabricate a value.', scope: 'global' },
    ];
}
export function buildCrossPillarExport(experience) {
    const pillars = buildPillarSections(experience);
    const normalizedSignals = buildCrossPillarSignals(pillars);
    const { candidates, tensions, matchedSignalIds } = buildCrossPillarCandidates(normalizedSignals);
    const unmatchedSignals = normalizedSignals.filter((signal) => !matchedSignalIds.has(signal.id));
    const methodologyWarnings = collectMethodologyWarnings();
    const document = {
        exportSchema: EXPORT_SCHEMA_ID,
        exportSchemaVersion: EXPORT_SCHEMA_VERSION,
        generatedAt: new Date().toISOString(),
        application: { name: 'KNOW THYSELF PRO' },
        profile: buildExportProfileContext(experience),
        pillars,
        normalizedSignals,
        comparisonCandidates: candidates,
        candidateTensions: tensions,
        unmatchedSignals,
        semanticGuardrails: SEMANTIC_GUARDRAILS,
        methodologyWarnings,
        globalWarnings: [],
        traceability: {
            signalCount: normalizedSignals.length,
            candidateCount: candidates.length,
            tensionCount: tensions.length,
            unmatchedCount: unmatchedSignals.length,
            generationNote: 'Normalized signals and candidates are a machine-assistance layer for manual/ChatGPT-assisted comparison, not the final Unified Pattern Engine or Unified Self Map.',
        },
        exportIntegrity: PENDING_INTEGRITY,
    };
    document.exportIntegrity = buildIntegritySummary(document, {
        requiredSections: ['pillars.numerology', 'pillars.westernAstrology', 'pillars.baziTcm', 'pillars.humanDesign', 'profile', 'normalizedSignals', 'comparisonCandidates'],
        collectedWarnings: methodologyWarnings.map((warning) => warning.message),
        collectedUnsupported: collectUnsupported(pillars),
        collectedSuppressed: collectSuppressed(pillars),
        collectedEstimated: collectEstimated(pillars),
    });
    return document;
}
export function buildPillarExport(experience, pillarId) {
    const pillars = buildPillarSections(experience);
    const sectionByPillar = {
        numerology: pillars.numerology,
        'western-astrology': pillars.westernAstrology,
        'bazi-tcm': pillars.baziTcm,
        'human-design': pillars.humanDesign,
    };
    const section = sectionByPillar[pillarId];
    const document = {
        exportSchema: PILLAR_EXPORT_SCHEMA_ID,
        exportSchemaVersion: PILLAR_EXPORT_SCHEMA_VERSION,
        generatedAt: new Date().toISOString(),
        application: { name: 'KNOW THYSELF PRO' },
        pillarId,
        profile: buildExportProfileContext(experience),
        pillar: section,
        exportIntegrity: PENDING_INTEGRITY,
    };
    document.exportIntegrity = buildIntegritySummary(document, {
        requiredSections: ['pillar', 'profile'],
        collectedWarnings: sectionWarningMessages(pillarId, section),
        collectedUnsupported: section.unsupportedFields,
        collectedSuppressed: collectSuppressed(pillars).filter((entry) => entry.startsWith(pillarId)),
        collectedEstimated: collectEstimated(pillars).filter((entry) => entry.startsWith(pillarId)),
    });
    return document;
}
