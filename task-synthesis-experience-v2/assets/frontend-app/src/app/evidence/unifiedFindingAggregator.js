/**
 * SAFE_THEME_GROUPS is the conservative signalId -> themeId registry for
 * STATIC label remapping (a signal's themeId depends only on its own
 * signalId, never on its value or any other pillar's data). It intentionally
 * ships EMPTY.
 *
 * TODO / review note: every static, value-independent grouping candidate
 * considered while building this aggregator required fabricating a semantic
 * equivalence between two structurally different symbolic systems (e.g.
 * treating Western astrology's 4-element Fire/Earth/Air/Water balance as
 * "the same theme" as BaZi's 5-element Wood/Fire/Earth/Metal/Water balance,
 * or linking a Pythagorean numerology number to a BaZi or astrology
 * category, or personality/process labels like "focus" or "structure-
 * building" that no adapter signal actually names). Those were rejected as
 * inventing interpretation beyond what Phase 2 adapters actually assert.
 * Phase 4A's one real cross-pillar grouping (see THEME_CONVERGENCE_RULES
 * below) turned out to require comparing two signals' actual VALUES, not
 * just their labels — a value-aware match is the only kind of cross-pillar
 * theme this codebase's current signal vocabulary can support honestly, so
 * it lives in its own mechanism rather than here. Real STATIC entries should
 * only be added to this map after explicit domain/product review confirms a
 * genuine, non-fabricated, value-independent correspondence. Per the Phase 2
 * placeholder decision, any signalId not resolved by either mechanism keeps
 * its own signalId as its themeId and surfaces as a 'supporting-single-
 * pillar' finding rather than being folded into a broader, unreviewed
 * category.
 */
const SAFE_THEME_GROUPS = {};
function resolveThemeId(signal) {
    return SAFE_THEME_GROUPS[signal.signalId] ?? signal.themeId;
}
function isEvidenceAvailable(bundle) {
    return bundle.status === 'calculated' || bundle.status === 'benchmark';
}
/**
 * Signals are the atomic unit of provenance; ThemeContribution.ruleId is a
 * required field even though SignalProvenance.ruleId is optional. When no
 * explicit rule fired for a signal, its own signalId is used as the
 * traceable fallback identifier rather than inventing a rule name.
 */
function toContribution(signal, stance = 'supports') {
    return {
        ruleId: signal.provenance.ruleId ?? signal.signalId,
        signalId: signal.signalId,
        pillarId: signal.pillarId,
        stance,
        confidence: signal.confidence,
    };
}
function strengthForPillarCount(independentPillarCount) {
    if (independentPillarCount >= 3)
        return 'strong';
    if (independentPillarCount === 2)
        return 'moderate';
    return 'supporting';
}
function groupSignalsByTheme(bundles) {
    const groups = new Map();
    const convergenceOverrides = resolveThemeConvergenceOverrides(bundles);
    for (const bundle of bundles) {
        if (!isEvidenceAvailable(bundle))
            continue;
        for (const signal of bundle.signals) {
            // Defense in depth: a 'suppressed' confidence signal should never exist
            // on an available bundle (Phase 2 adapters never emit signals at all
            // for suppressed-mechanics/blocked bundles), but this guard means the
            // aggregator itself never counts one as evidence even if that
            // invariant were ever violated upstream.
            if (signal.confidence === 'suppressed')
                continue;
            const override = convergenceOverrides.get(convergenceKey(signal.pillarId, signal.signalId));
            const themeId = override?.themeId ?? resolveThemeId(signal);
            const label = override?.label ?? signal.label;
            const existing = groups.get(themeId);
            if (existing) {
                existing.signals.push(signal);
                existing.pillars.add(signal.pillarId);
            }
            else {
                groups.set(themeId, { themeId, label, signals: [signal], pillars: new Set([signal.pillarId]) });
            }
        }
    }
    return groups;
}
function findingsFromThemeGroups(groups) {
    const findings = [];
    for (const group of groups.values()) {
        const independentPillarCount = group.pillars.size;
        const contributions = group.signals.map((signal) => toContribution(signal));
        const pillarList = [...group.pillars].sort().join(', ');
        if (independentPillarCount >= 2) {
            const strength = strengthForPillarCount(independentPillarCount);
            findings.push({
                kind: 'repeated-pattern',
                themeId: group.themeId,
                label: group.label,
                // independentPillarCount >= 2 guarantees strengthForPillarCount never
                // returns 'supporting' here, matching RepeatedPatternFinding's type.
                strength: strength,
                contributions,
                summary: `${independentPillarCount} independent pillars (${pillarList}) each produced evidence for "${group.label}".`,
            });
        }
        else {
            findings.push({
                kind: 'supporting-single-pillar',
                themeId: group.themeId,
                label: group.label,
                strength: 'supporting',
                contributions,
                summary: `Only ${pillarList} produced evidence for "${group.label}"; no independent corroboration from another pillar yet.`,
            });
        }
    }
    return findings;
}
function findingsFromMissingOrSuppressedPillars(bundles) {
    const findings = [];
    for (const bundle of bundles) {
        if (bundle.status !== 'blocked' && bundle.status !== 'suppressed-mechanics')
            continue;
        findings.push({
            kind: 'missing-or-suppressed-pillar',
            pillarId: bundle.pillarId,
            status: bundle.status,
            reason: bundle.limitations[0] ?? `${bundle.pillarId} is ${bundle.status} and contributes no evidence.`,
        });
    }
    return findings;
}
/**
 * ZODIAC_ELEMENTS mirrors the standard, public zodiac-to-element mapping
 * already embedded in ephemerisEngine.ts's internal ZODIAC table — it is
 * restated here (not imported) because the aggregator only receives the
 * astrology adapter's already-formatted signal value, not the source
 * PlanetPosition object. Restricted to the 3 element names BaZi and Western
 * astrology's vocabularies literally share (Fire, Earth, Water); Air (Western
 * only) and Wood/Metal (BaZi only) never match and never fire this rule.
 */
const ZODIAC_ELEMENTS = {
    Aries: 'Fire',
    Taurus: 'Earth',
    Cancer: 'Water',
    Leo: 'Fire',
    Virgo: 'Earth',
    Scorpio: 'Water',
    Sagittarius: 'Fire',
    Capricorn: 'Earth',
    Pisces: 'Water',
};
/**
 * Shared lookup for both the tension rule and the Phase 4A convergence theme
 * group below: locates Western Astrology's Sun-position signal and BaZi's
 * Day Master signal, and extracts each side's element. Returns null unless
 * BOTH signals are present AND the Sun's sign maps to one of the 3 element
 * names BaZi and Western astrology's vocabularies literally share (Fire,
 * Earth, Water) — Air (Western-only) and Wood/Metal (BaZi-only) never
 * resolve, so neither rule fires for them. Depends on the exact
 * formatted-value conventions the astrology and BaZi adapters currently use
 * ("Sign 12.34°" and "Name Element"); if either adapter's value format
 * changes, both rules below should be revisited together.
 */
function compareDayMasterAndSunElement(bundles) {
    const sunSignal = findSignal(bundles, 'western-astrology', 'astrology-planet-sun');
    const dayMasterSignal = findSignal(bundles, 'bazi-tcm', 'bazi-day-master');
    if (!sunSignal || !dayMasterSignal)
        return null;
    const sunSign = String(sunSignal.value).split(' ')[0];
    const sunElement = ZODIAC_ELEMENTS[sunSign];
    const dayMasterElement = String(dayMasterSignal.value).split(' ')[1];
    if (!sunElement || !dayMasterElement)
        return null;
    return { sunSignal, dayMasterSignal, sunSign, sunElement, dayMasterElement };
}
/**
 * TENSION_RULES is a small, explicit registry of narrowly-scoped, value-level
 * comparisons — never a claim that two symbolic systems are equivalent, only
 * that two independently-calculated, same-named surface categories disagree
 * for this birth data. Each rule is opt-in and fires only on an exact,
 * already-typed value mismatch; it never infers conflict from vague
 * similarity. Extending this registry should go through the same review bar
 * as SAFE_THEME_GROUPS above.
 */
const TENSION_RULES = [
    detectDayMasterVsSunElementTension,
];
/**
 * Rule scope note: compares BaZi's Day Master element against Western
 * Astrology's Sun-sign element, restricted to the 3 element names both
 * frameworks share. This does not claim the Day Master and the Sun sign
 * "mean" the same thing — only that both independently assign an elemental
 * category to a central calculated marker, and here those categories
 * disagree. Presented as a flagged discrepancy for human review, not a
 * resolved contradiction between the two frameworks.
 */
function detectDayMasterVsSunElementTension(bundles) {
    const comparison = compareDayMasterAndSunElement(bundles);
    if (!comparison || comparison.sunElement === comparison.dayMasterElement)
        return null;
    const { sunSignal, dayMasterSignal, sunSign, sunElement } = comparison;
    return {
        kind: 'tension',
        themeIdA: sunSignal.themeId,
        themeIdB: dayMasterSignal.themeId,
        contributionsA: [toContribution(sunSignal, 'opposes')],
        contributionsB: [toContribution(dayMasterSignal, 'opposes')],
        summary: `Western Astrology's Sun sign (${sunSign}, ${sunElement}) and BaZi's Day Master (${dayMasterSignal.value}) assign different elements to their respective central calculated markers. This is a surface-level discrepancy between two independent, structurally different systems — not a resolved contradiction.`,
    };
}
/**
 * THEME_CONVERGENCE_RULES holds value-aware theme groupings: unlike
 * SAFE_THEME_GROUPS (a static signalId -> themeId map), a convergence rule
 * inspects the actual computed VALUES of two specific signals and only
 * groups them when those values genuinely agree. This is what makes it
 * honest to call the result a "repeated pattern" rather than "two pillars
 * both said something." Kept to a very small number, each strongly typed and
 * narrowly scoped, reviewed to the same bar as TENSION_RULES.
 */
const THEME_CONVERGENCE_RULES = [
    detectDayMasterAndSunElementConvergence,
];
/**
 * Rule scope note: the mirror image of detectDayMasterVsSunElementTension —
 * same comparison, opposite (agreement) branch. Fires only when BaZi's Day
 * Master element and Western Astrology's Sun-sign element are the exact same
 * one of the 3 shared element names. This is deliberately framed as a
 * process-level, structural observation ("both independent calculation
 * systems converged on the same element category for their respective
 * central markers"), not a personality, trait, or fate claim about what that
 * element means for the person — no interpretive text is added beyond
 * stating the convergence itself.
 */
function detectDayMasterAndSunElementConvergence(bundles) {
    const comparison = compareDayMasterAndSunElement(bundles);
    if (!comparison || comparison.sunElement !== comparison.dayMasterElement)
        return null;
    const { sunElement } = comparison;
    return {
        themeId: `shared-central-marker-element-${sunElement.toLowerCase()}`,
        label: `${sunElement} emphasis in both central markers`,
        matches: [
            { pillarId: 'western-astrology', signalId: 'astrology-planet-sun' },
            { pillarId: 'bazi-tcm', signalId: 'bazi-day-master' },
        ],
    };
}
function convergenceKey(pillarId, signalId) {
    return `${pillarId}:${signalId}`;
}
function resolveThemeConvergenceOverrides(bundles) {
    const overrides = new Map();
    for (const rule of THEME_CONVERGENCE_RULES) {
        const match = rule(bundles);
        if (!match)
            continue;
        for (const ref of match.matches) {
            overrides.set(convergenceKey(ref.pillarId, ref.signalId), { themeId: match.themeId, label: match.label });
        }
    }
    return overrides;
}
function findSignal(bundles, pillarId, signalId) {
    const bundle = bundles.find((candidate) => candidate.pillarId === pillarId);
    if (!bundle || !isEvidenceAvailable(bundle))
        return undefined;
    return bundle.signals.find((signal) => signal.signalId === signalId);
}
function findingsFromTensionRules(bundles) {
    const findings = [];
    for (const rule of TENSION_RULES) {
        const finding = rule(bundles);
        if (finding)
            findings.push(finding);
    }
    return findings;
}
/**
 * Pure function: consumes the evidence bundles produced by the Phase 2
 * adapters and produces the unified findings defined in Phase 1. Never
 * mutates its input, never reaches into pillar engines, and never fabricates
 * a signal that is not already present in some bundle.
 */
export function aggregateUnifiedFindings(bundles) {
    const themeGroups = groupSignalsByTheme(bundles);
    return [
        ...findingsFromThemeGroups(themeGroups),
        ...findingsFromTensionRules(bundles),
        ...findingsFromMissingOrSuppressedPillars(bundles),
    ];
}
