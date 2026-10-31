import { buildPillarSections, collectMethodologyWarnings } from '../export/exportBuilder.js?v=2ea79e9';
import { buildCrossPillarSignals } from '../export/crossPillarSignals.js?v=2ea79e9';
import { buildCrossPillarCandidates } from '../export/crossPillarCandidates.js?v=2ea79e9';
import { SEMANTIC_GUARDRAILS } from '../export/semanticGuardrails.js?v=2ea79e9';
import { pillarLabel } from '../format.js?v=2ea79e9';
import { buildAllDomainThemes, buildSynthesisThemes } from './synthesisThemeAggregator.js?v=2ea79e9';
import { buildSynthesisTensions } from './synthesisTensions.js?v=2ea79e9';
import { buildSynthesisLifeAreas } from './synthesisLifeAreas.js?v=2ea79e9';
import { buildSourceStatus } from './synthesisSourceStatus.js?v=2ea79e9';
import { buildCurrentPeriod } from './synthesisCurrentPeriod.js?v=2ea79e9';
import { buildMainNarrative, buildOverview } from './synthesisNarrativeBuilder.js?v=2ea79e9';
import { SYNTHESIS_SCHEMA_VERSION, } from './synthesisTypes.js?v=2ea79e9';
/** Memoized by ProfileExperience object identity: model.ts creates a fresh
 *  ProfileExperience only when the source profile actually changes (new
 *  submission, edited source, benchmark toggle), so this never serves a stale
 *  synthesis for a changed profile, and never recomputes pillar-derived data on
 *  every render/stage switch (spec section 37 / 46). */
const memo = new WeakMap();
const STRENGTH_TIER_PROMOTED = new Set(['primary', 'strong', 'moderate']);
const MAX_STRENGTHS = 8;
const MAX_GROWTH_THEMES = 8;
function buildEvidenceIndex(signals) {
    return signals.map((signal) => ({
        id: signal.id,
        pillar: signal.pillar,
        sourceLabel: signal.sourceLabel,
        sourcePath: signal.sourcePath,
        rawValue: String(signal.normalizedValue ?? signal.rawValue),
        evidenceType: signal.evidenceType,
        confidence: signal.confidence,
        confidenceReason: signal.confidenceReason,
        methodologySensitive: signal.methodologySensitive,
        methodologyNotes: signal.methodologyNotes ?? [],
        notEquivalentToOtherSystems: signal.notEquivalentToOtherSystems,
    }));
}
function buildStrengthsAndGrowth(themes) {
    const promoted = themes.filter((theme) => STRENGTH_TIER_PROMOTED.has(theme.strength));
    const strengths = [...new Set(promoted.flatMap((theme) => theme.strengths))].slice(0, MAX_STRENGTHS);
    const growthThemes = [...new Set(promoted.flatMap((theme) => theme.growthQuestions))].slice(0, MAX_GROWTH_THEMES);
    return { strengths, growthThemes };
}
function buildIntegrity(pillars) {
    const calculatedPillarCount = pillars.filter((pillar) => pillar.status === 'calculated' || pillar.status === 'benchmark').length;
    return {
        valid: true,
        insufficientEvidence: calculatedPillarCount < 2,
        reason: calculatedPillarCount < 2
            ? 'Fewer than two pillars are calculated or benchmark-available; cross-pillar synthesis requires at least two independent pillars to say anything cross-pillar.'
            : null,
        calculatedPillarCount,
    };
}
function assembleProfile(experience) {
    const pillarSections = buildPillarSections(experience);
    const signals = buildCrossPillarSignals(pillarSections);
    const { candidates, tensions: calculatedTensions } = buildCrossPillarCandidates(signals);
    const domainThemeMap = buildAllDomainThemes(signals, candidates);
    const themes = buildSynthesisThemes(signals, candidates);
    const tensions = buildSynthesisTensions(calculatedTensions, signals, domainThemeMap);
    const lifeAreas = buildSynthesisLifeAreas(domainThemeMap);
    const sourceStatus = buildSourceStatus(experience.pillars);
    const currentPeriod = buildCurrentPeriod(pillarSections.numerology, pillarSections.baziTcm);
    const mainNarrative = buildMainNarrative(themes, lifeAreas);
    const overview = buildOverview(themes, tensions, sourceStatus);
    const { strengths, growthThemes } = buildStrengthsAndGrowth(themes);
    return {
        schemaVersion: SYNTHESIS_SCHEMA_VERSION,
        generatedAt: new Date().toISOString(),
        sourceStatus,
        overview,
        mainNarrative,
        themes,
        tensions,
        lifeAreas,
        strengths,
        growthThemes,
        currentPeriod,
        evidenceIndex: buildEvidenceIndex(signals),
        semanticGuardrailCount: SEMANTIC_GUARDRAILS.length,
        methodologyWarnings: collectMethodologyWarnings().map((warning) => warning.message),
        unavailableAreas: sourceStatus.filter((status) => status.status === 'unavailable').map((status) => pillarLabel(status.pillar)),
        integrity: buildIntegrity(experience.pillars),
    };
}
export function buildCrossPillarSynthesisProfile(experience) {
    const cached = memo.get(experience);
    if (cached)
        return cached;
    const profile = assembleProfile(experience);
    memo.set(experience, profile);
    return profile;
}
