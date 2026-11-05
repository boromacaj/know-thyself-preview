import { createAstronomicalSnapshot, createGeoTemporalContext } from './astronomy.js?v=53c0693';
import { buildNumerologyEvidence, normalizeName, runNumerologyEngine } from './numerology.js?v=53c0693';
import { PROTOTYPE_LIMITATIONS, VERSIONS } from './versions.js?v=53c0693';
export function createCorePrototype(input, now = new Date()) {
    const generatedAt = now.toISOString();
    const profile = createProfileObject(input, generatedAt);
    const numerologyOutput = runNumerologyEngine(profile, generatedAt, now);
    const evidence = buildNumerologyEvidence(profile, numerologyOutput);
    const synthesis = buildSynthesis(profile.profileId, numerologyOutput.traitContributions, evidence, generatedAt);
    const forecastState = buildForecastState(profile.profileId, synthesis, numerologyOutput.traitContributions, evidence, now);
    const ephemerisPlaceholder = createEphemerisPlaceholder(profile.astronomicalSnapshot);
    const completedProfile = {
        ...profile,
        engineOutputs: [numerologyOutput],
        normalizedTraits: numerologyOutput.traitContributions,
        synthesis,
        forecastState,
        evidence,
        metadata: {
            ...profile.metadata,
            calculationStatus: 'prototype_complete',
        },
    };
    return {
        profile: completedProfile,
        numerologyOutput,
        synthesis,
        forecastState,
        ephemerisPlaceholder,
        astronomicalSnapshot: completedProfile.astronomicalSnapshot,
        natalMoonPhase: completedProfile.astronomicalSnapshot.natalMoonPhase,
    };
}
function createProfileObject(input, generatedAt) {
    const birthGivenNames = normalizeNamePart(input.birthGivenNames);
    const birthSurname = normalizeNamePart(input.birthSurname);
    const birthFullName = deriveBirthFullName(birthGivenNames, birthSurname);
    const normalizedBirthFullName = normalizeName(birthFullName);
    const birthDay = normalizeDatePart(input.birthDay, 2);
    const birthMonth = normalizeDatePart(input.birthMonth, 2);
    const birthYear = normalizeDatePart(input.birthYear, 4);
    const birthDate = deriveBirthDate(birthYear, birthMonth, birthDay);
    const birthTime = input.birthTime || null;
    const hasBirthTime = Boolean(birthTime);
    const birthplaceSource = normalizeBirthplaceSource(input);
    const profileId = stableId(`${normalizedBirthFullName}|${birthDate}|${birthTime ?? 'unknown'}|${birthplaceSource.birthplaceText}`);
    const geoTemporalContext = createGeoTemporalContext(birthDate, birthTime, birthplaceSource);
    const astronomicalSnapshot = createAstronomicalSnapshot(profileId, geoTemporalContext, generatedAt);
    return {
        profileId,
        identity: {
            displayName: birthFullName,
            birthGivenNames,
            birthSurname,
            birthFullName,
            normalizedBirthFullName,
        },
        input: {
            birthDay,
            birthMonth,
            birthYear,
            birthDate,
            birthTime,
            birthCountry: birthplaceSource.birthCountry,
            birthRegion: birthplaceSource.birthRegion,
            birthCity: birthplaceSource.birthCity,
            birthPostalCode: birthplaceSource.birthPostalCode,
            birthplace: birthplaceSource.birthplaceText,
            birthplacePostalCode: birthplaceSource.birthplacePostalCode,
            birthLocationDetail: birthplaceSource.birthLocationDetail,
            birthplaceSource,
            geoTemporalContext,
            uncertainty: {
                birthTimeKnown: hasBirthTime,
                inputConfidence: hasBirthTime ? 'medium' : 'low',
                notes: hasBirthTime
                    ? ['Birth time supplied and preserved. Timezone remains unresolved until geo-temporal resolver integration.']
                    : ['Birth time omitted. Numerology can run, but exact observer-based astronomy remains unavailable.'],
            },
        },
        astronomicalSnapshot,
        engineOutputs: [],
        normalizedTraits: [],
        synthesis: null,
        forecastState: null,
        evidence: [],
        metadata: {
            generatedAt,
            profileVersion: 'profile-object-v0.2.0',
            calculationStatus: 'profile_created',
            versions: VERSIONS,
        },
    };
}
function deriveBirthFullName(birthGivenNames, birthSurname) {
    return [birthGivenNames, birthSurname].filter(Boolean).join(' ');
}
function normalizeNamePart(value) {
    return value.trim().replace(/\s+/g, ' ');
}
function normalizeBirthplaceSource(input) {
    const birthPostalCode = normalizeOptionalSourceField(input.birthPostalCode ?? input.birthplacePostalCode);
    return {
        birthCountry: normalizeOptionalSourceField(input.birthCountry),
        birthRegion: normalizeOptionalSourceField(input.birthRegion),
        birthCity: normalizeOptionalSourceField(input.birthCity),
        birthPostalCode,
        birthplaceText: input.birthplace.trim(),
        birthplacePostalCode: birthPostalCode,
        birthLocationDetail: normalizeOptionalSourceField(input.birthLocationDetail),
    };
}
function normalizeOptionalSourceField(value) {
    const normalized = value?.trim().replace(/\s+/g, ' ') ?? '';
    return normalized || null;
}
function deriveBirthDate(birthYear, birthMonth, birthDay) {
    return `${birthYear}-${birthMonth}-${birthDay}`;
}
function normalizeDatePart(value, length) {
    return value.trim().padStart(length, '0');
}
function createEphemerisPlaceholder(astronomicalSnapshot) {
    return {
        status: 'requires_ephemeris_v0_2',
        supportedLayers: [],
        missingLayers: ['moon_phase', 'sun_longitude', 'moon_longitude', 'planetary_positions', 'houses', 'transits'],
        astronomicalSnapshot,
        note: 'Ephemeris-backed astronomy is intentionally not calculated in v0.2. The prototype exposes missing requirements instead of faking sky data.',
    };
}
function buildSynthesis(profileId, traits, evidence, generatedAt) {
    const sortedTraits = [...traits].sort((a, b) => b.weight - a.weight);
    const primary = sortedTraits.slice(0, 3);
    const evidenceIds = evidence.map((item) => item.evidenceId);
    const averageWeight = average(primary.map((trait) => trait.weight));
    return {
        profileId,
        synthesisVersion: VERSIONS.synthesisVersion,
        generatedAt,
        corePattern: section(primary, averageWeight, `Core symbolic pattern: ${joinTraitLabels(primary)} may be useful reflection points.`, evidenceIds),
        energyMap: section(primary.filter((trait) => ['agency', 'adaptability', 'execution'].includes(trait.domain)), clamp(averageWeight + 0.05), 'Energy map is based only on numerology trait weights in v0.2; pacing may help when activation is high.', evidenceIds),
        emotionalMap: section(primary.filter((trait) => ['relational', 'care', 'collective', 'reflection'].includes(trait.domain)), averageWeight, 'Emotional map is a symbolic tendency layer, not a diagnosis; use it as a reflection prompt.', evidenceIds),
        decisionMap: section(primary, averageWeight, 'Decision map highlights traits that may support choice-making and self-observation.', evidenceIds),
        stressMap: section(primary, clamp(1 - averageWeight / 2), 'Stress map remains conservative in v0.2 and avoids predictive claims.', evidenceIds),
        relationalMap: section(primary.filter((trait) => ['relational', 'care', 'expression', 'collective'].includes(trait.domain)), averageWeight, 'Relational map uses only normalized trait contributions and does not infer compatibility.', evidenceIds),
        developmentalDirection: section(primary, averageWeight, 'Developmental direction points toward observing when these symbolic tendencies support or overextend you.', evidenceIds),
        symbolicEvidence: evidence,
        confidenceSummary: {
            overallConfidence: evidence.some((item) => item.confidence === 'low') ? 'low' : 'medium',
            evidenceCount: evidence.length,
            contributingEngines: ['numerology-mvp'],
            missingEngineLayers: ['geo-temporal resolver', 'ephemeris', 'astrology', 'human-design', 'bazi', 'moon-phase'],
        },
        contradictions: [],
    };
}
function buildForecastState(profileId, synthesis, traits, evidence, now) {
    const start = startOfUtcDay(now);
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 1);
    const primary = traits[0];
    const evidenceIds = evidence.map((item) => item.evidenceId);
    const activationScore = clamp((primary?.weight ?? 0.5) * 0.8);
    const recoveryScore = clamp(1 - activationScore * 0.45);
    const emotionalIntensityScore = clamp(traits.some((trait) => ['relational', 'care', 'collective'].includes(trait.domain)) ? 0.62 : 0.42);
    const overloadRiskScore = clamp(activationScore * 0.35 + emotionalIntensityScore * 0.25);
    const growthWindow = {
        start: start.toISOString(),
        end: end.toISOString(),
        label: 'Reflection window from current synthesis traits',
        intensity: activationScore,
        confidence: synthesis.confidenceSummary.overallConfidence,
        evidenceIds,
    };
    return {
        forecastId: `forecast-${profileId}-${dateKey(start)}`,
        profileId,
        scale: 'day',
        period: {
            start: start.toISOString(),
            end: end.toISOString(),
            timezone: 'UTC',
        },
        status: 'fresh',
        summary: {
            headline: primary
                ? `${primary.traitLabel} is the highest weighted v0.2 symbolic signal for today.`
                : 'No weighted trait is available yet.',
            focusTraitIds: traits.slice(0, 3).map((trait) => trait.traitId),
            evidenceIds,
        },
        energyMetrics: {
            activationScore,
            recoveryScore,
            emotionalIntensityScore,
            clarityScore: clamp(synthesis.corePattern.score),
            pressureScore: overloadRiskScore,
            overloadRiskScore,
            scoringVersion: VERSIONS.forecastScoringVersion,
            evidenceIds,
        },
        emotionalClimate: {
            primaryTone: traits.some((trait) => trait.domain === 'reflection') ? 'reflective' : 'steady',
            sensitivityLevel: emotionalIntensityScore > 0.6 ? 'medium' : 'low',
            regulationNeed: overloadRiskScore > 0.55 ? 'medium' : 'low',
            confidenceLevel: synthesis.confidenceSummary.overallConfidence,
            evidenceIds,
        },
        growthWindows: [growthWindow],
        recoveryWindows: [{ ...growthWindow, label: 'Pacing check-in', intensity: recoveryScore }],
        overloadIndicators: overloadRiskScore > 0.55 ? [{ ...growthWindow, label: 'Overextension check', intensity: overloadRiskScore }] : [],
        heatmapData: [{
                date: dateKey(start),
                overallIntensity: activationScore,
                growthScore: activationScore,
                recoveryScore,
                emotionalIntensity: emotionalIntensityScore,
                overloadRisk: overloadRiskScore,
                evidenceIds,
            }],
        symbolicWeather: [{ label: 'Numerology-only prototype signal', intensity: activationScore, evidenceIds }],
        traitInteractions: traits.length > 1 ? [{ traitIds: traits.slice(0, 2).map((trait) => trait.traitId), interactionType: 'same-engine reinforcement', evidenceIds }] : [],
        evidenceChains: evidence,
        availableLayers: ['profile', 'geo-temporal-foundation', 'numerology-mvp', 'trait-normalization', 'synthesis-v0.1'],
        missingLayers: ['timezone resolver', 'coordinates resolver', 'ephemeris', 'astrology', 'Human Design', 'BaZi', 'forecast calendar'],
        metadata: {
            generatedAt: now.toISOString(),
            profileVersion: 'profile-object-v0.2.0',
            ephemerisVersion: 'not_available_v0_2',
            rulesetVersions: VERSIONS.rulesetVersions,
            synthesisVersion: VERSIONS.synthesisVersion,
            interpretationVersion: VERSIONS.interpretationVersion,
            calculationJobId: `local-${profileId}-${dateKey(start)}`,
            cacheKey: `v0.2:${profileId}:${dateKey(start)}`,
        },
    };
}
function section(traits, score, presentation, evidenceIds) {
    return {
        primaryTraitIds: traits.map((trait) => trait.traitId),
        score: clamp(score),
        presentation,
        evidenceIds,
    };
}
function stableId(input) {
    let hash = 2166136261;
    for (let index = 0; index < input.length; index += 1) {
        hash ^= input.charCodeAt(index);
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return `profile-${(hash >>> 0).toString(16)}`;
}
function average(values) {
    if (values.length === 0)
        return 0.5;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
}
function clamp(value) {
    return Number(Math.min(1, Math.max(0, value)).toFixed(2));
}
function joinTraitLabels(traits) {
    if (traits.length === 0)
        return 'no traits';
    return traits.map((trait) => trait.traitLabel.toLowerCase()).join(', ');
}
function startOfUtcDay(date) {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}
function dateKey(date) {
    return date.toISOString().slice(0, 10);
}
export { PROTOTYPE_LIMITATIONS };
