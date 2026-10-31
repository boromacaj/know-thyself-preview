import { pillarLabel } from '../format.js?v=d9f39e7';
import { DOMAIN_CONTENT } from './synthesisDomainContent.js?v=d9f39e7';
/** The 'timing' domain is deliberately excluded here — time-sensitive cycle signals
 *  (e.g. Numerology Personal Year) are handled separately by synthesisCurrentPeriod.ts
 *  so they never get folded into the stable, identity-level theme ranking. */
const EXCLUDED_DOMAINS = new Set(['timing']);
const MAX_PRIMARY = 5;
const MAX_STRONG_OR_MODERATE = 8;
const MAX_EMERGING = 6;
const STRENGTH_ORDER = { primary: 0, strong: 1, moderate: 2, emerging: 3 };
/**
 * Strength tiers follow the cross-pillar synthesis spec section 14: the
 * decisive factor is the count of *independent pillars* that produced evidence for a
 * domain, not signal count or confidence alone — one pillar emitting many signals for
 * the same domain must never outrank two pillars that independently converge.
 */
function strengthTier(pillarCount, avgConfidence) {
    if (pillarCount >= 3)
        return 'primary';
    if (pillarCount === 2)
        return avgConfidence >= 0.6 ? 'strong' : 'moderate';
    return 'emerging';
}
function groupSignalsByDomain(signals) {
    const groups = new Map();
    for (const signal of signals) {
        if (EXCLUDED_DOMAINS.has(signal.signalDomain))
            continue;
        const list = groups.get(signal.signalDomain) ?? [];
        list.push(signal);
        groups.set(signal.signalDomain, list);
    }
    return groups;
}
function findMatchingCandidate(domainSignals, candidates) {
    return candidates.find((candidate) => domainSignals.some((signal) => candidate.signalIds.includes(signal.id))) ?? null;
}
function buildTheme(domain, domainSignals, candidates) {
    const content = DOMAIN_CONTENT[domain];
    // No reviewed narrative template yet for this domain: do not invent one on the fly.
    if (!content)
        return null;
    const pillars = [...new Set(domainSignals.map((signal) => signal.pillar))];
    const avgConfidence = domainSignals.reduce((sum, signal) => sum + signal.confidence, 0) / domainSignals.length;
    const strength = strengthTier(pillars.length, avgConfidence);
    const ctx = { domain, signals: domainSignals, pillars };
    const matchedCandidate = findMatchingCandidate(domainSignals, candidates);
    return {
        id: `theme-${domain}`,
        domain,
        label: content.label,
        summary: content.summary(ctx),
        longDescription: content.longDescription(ctx),
        strength,
        confidence: Math.round(avgConfidence * 100) / 100,
        confidenceReason: `${pillars.length} independent pillar${pillars.length === 1 ? '' : 's'} (${pillars.map((id) => pillarLabel(id)).join(', ')}) produced evidence for this domain; average per-signal confidence ${avgConfidence.toFixed(2)}.`,
        supportingPillars: pillars,
        evidenceRefs: domainSignals.map((signal) => signal.id),
        relationshipTypes: matchedCandidate ? [matchedCandidate.relationshipType] : [],
        candidateRationale: matchedCandidate?.rationale ?? null,
        candidateWarnings: matchedCandidate?.warnings ?? [],
        lifeAreaImplications: content.lifeAreas.map((entry) => ({ lifeAreaId: entry.lifeAreaId, text: entry.text(ctx) })),
        strengths: content.strengths,
        risks: content.risks,
        growthQuestions: content.growthQuestions,
        methodologySensitive: domainSignals.some((signal) => signal.methodologySensitive),
        notEquivalent: domainSignals.some((signal) => signal.notEquivalentToOtherSystems),
    };
}
function rankAndCap(themes) {
    const sorted = [...themes].sort((left, right) => {
        if (STRENGTH_ORDER[left.strength] !== STRENGTH_ORDER[right.strength])
            return STRENGTH_ORDER[left.strength] - STRENGTH_ORDER[right.strength];
        if (right.supportingPillars.length !== left.supportingPillars.length)
            return right.supportingPillars.length - left.supportingPillars.length;
        if (right.confidence !== left.confidence)
            return right.confidence - left.confidence;
        return left.id.localeCompare(right.id);
    });
    const primary = sorted.filter((theme) => theme.strength === 'primary').slice(0, MAX_PRIMARY);
    const strongOrModerate = sorted.filter((theme) => theme.strength === 'strong' || theme.strength === 'moderate').slice(0, MAX_STRONG_OR_MODERATE);
    const emerging = sorted.filter((theme) => theme.strength === 'emerging').slice(0, MAX_EMERGING);
    return [...primary, ...strongOrModerate, ...emerging];
}
/** Every populated+reviewed domain gets exactly one theme, uncapped — used both as the
 *  input to the ranked/capped card list below and by synthesisTensions.ts, so tension
 *  detection never silently misses a domain that the display cap trimmed away. */
export function buildAllDomainThemes(signals, candidates) {
    const groups = groupSignalsByDomain(signals);
    const themes = new Map();
    for (const [domain, domainSignals] of groups) {
        const theme = buildTheme(domain, domainSignals, candidates);
        if (theme)
            themes.set(domain, theme);
    }
    return themes;
}
/** Pure function: groups normalized signals by their own declared domain (never an
 *  invented grouping), builds one theme per populated+reviewed domain, ranks by
 *  independent-pillar convergence, and caps how many themes surface at each tier. */
export function buildSynthesisThemes(signals, candidates) {
    return rankAndCap([...buildAllDomainThemes(signals, candidates).values()]);
}
