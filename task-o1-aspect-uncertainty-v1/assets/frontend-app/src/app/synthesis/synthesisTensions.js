const DOMAIN_OPPOSITIONS = [
    {
        id: 'tension-structure-vs-growth',
        title: 'Structure versus growth',
        domainA: 'structure',
        domainB: 'growth',
        interpretation: 'One recurring pattern favors building durable, well-bounded structure; another favors ongoing expansion and development. Both are independently supported here — this is a coexistence to manage, not a contradiction to resolve.',
        healthyExpression: 'Structure gives the expansion somewhere to land; growth keeps the structure from calcifying into something already outgrown.',
        unbalancedExpression: 'Structure can tip into rigidity that blocks needed growth, or the pull toward growth can tip into abandoning structure that was still useful.',
        practicalIntegration: 'Revisit existing structures on a fixed schedule and ask whether they still serve the current stage of growth, rather than defaulting to either extreme.',
    },
    {
        id: 'tension-energy-vs-stress',
        title: 'Drive versus pressure sensitivity',
        domainA: 'energy',
        domainB: 'stress',
        interpretation: 'A strong, generative energy style coexists with a specific, real sensitivity to pressure. Neither cancels the other out.',
        healthyExpression: 'The energy style is used at a sustainable pace that respects the pressure-response pattern instead of overriding it.',
        unbalancedExpression: 'Output can be sustained past the point the pressure-response pattern can absorb, producing a crash rather than a plateau.',
        practicalIntegration: 'Build recovery into the schedule before output drops, using the earliest pressure signal identified in the Stress and recovery section as the cue.',
    },
    {
        id: 'tension-purpose-vs-decision-making',
        title: 'Depth versus speed',
        domainA: 'purpose',
        domainB: 'decision-making',
        interpretation: 'A long-range, reflective sense of direction coexists with a decision process built for a faster, more immediate response. Both are genuine parts of the same picture.',
        healthyExpression: 'A defined reflection period is honored, then a decision is made using the faster process and acted on without re-opening it indefinitely.',
        unbalancedExpression: 'Reflection can extend past the point of adding value and delay action, or the faster decision process can be used to skip reflection the situation actually needed.',
        practicalIntegration: 'Set an explicit point at which "enough understanding" has been reached, then commit to the faster decision process rather than continuing to gather input.',
    },
    {
        id: 'tension-leadership-vs-cooperation',
        title: 'Independence versus cooperation',
        domainA: 'leadership',
        domainB: 'cooperation',
        interpretation: 'A capacity to carry things through independently coexists with a connection structure built around linking with other people. Both are real and can pull in different directions within the same week.',
        healthyExpression: 'Independent follow-through and collaborative connection are both used deliberately, matched to what a given task actually needs.',
        unbalancedExpression: 'Independent drive can be used even where collaboration would serve better, or connection can be leaned on to avoid a follow-through only you can do.',
        practicalIntegration: 'Before starting a task, decide deliberately whether it calls for independent follow-through or collaborative connection, rather than defaulting to habit.',
    },
];
function domainSide(theme) {
    return { domain: theme.domain, label: theme.label, description: theme.summary };
}
function unknownSide(domain) {
    return { domain, label: domain, description: 'Source signal unavailable.' };
}
function convertCalculatedTension(tension, signalsById) {
    const [signalA, signalB] = tension.signalIds.map((id) => signalsById.get(id));
    const sideA = signalA
        ? { domain: signalA.signalDomain, label: signalA.sourceLabel, description: `${signalA.sourceLabel}: ${String(signalA.normalizedValue ?? signalA.rawValue)}` }
        : unknownSide('identity');
    const sideB = signalB
        ? { domain: signalB.signalDomain, label: signalB.sourceLabel, description: `${signalB.sourceLabel}: ${String(signalB.normalizedValue ?? signalB.rawValue)}` }
        : unknownSide('identity');
    return {
        id: tension.id,
        title: 'A calculated disagreement between two independent central markers',
        sideA,
        sideB,
        interpretation: tension.summary,
        healthyExpression: tension.complementaryPossible
            ? 'These can be read as complementary facets of the same picture, calculated by unrelated methods, rather than a genuine contradiction.'
            : 'Both markers are independently calculated; hold both readings rather than resolving them into a single answer.',
        unbalancedExpression: 'Treating one marker as overriding the other, instead of holding both as independently valid, can create unnecessary internal conflict.',
        practicalIntegration: tension.methodologyExplanation ?? 'Let lived experience, not either symbolic system alone, decide which reading fits better in a given situation.',
        confidence: tension.confidence,
        confidenceReason: 'Confidence carried over from the underlying calculated cross-pillar tension record.',
        evidenceRefs: tension.signalIds,
        source: 'calculated-tension',
    };
}
function buildOppositionTensions(domainThemes) {
    const tensions = [];
    for (const rule of DOMAIN_OPPOSITIONS) {
        const themeA = domainThemes.get(rule.domainA);
        const themeB = domainThemes.get(rule.domainB);
        if (!themeA || !themeB)
            continue;
        tensions.push({
            id: rule.id,
            title: rule.title,
            sideA: domainSide(themeA),
            sideB: domainSide(themeB),
            interpretation: rule.interpretation,
            healthyExpression: rule.healthyExpression,
            unbalancedExpression: rule.unbalancedExpression,
            practicalIntegration: rule.practicalIntegration,
            confidence: Math.round(Math.min(themeA.confidence, themeB.confidence) * 100) / 100,
            confidenceReason: `Both "${themeA.label}" and "${themeB.label}" are independently supported themes in this profile; this pairing is a documented, reviewed opposition, not an automatically inferred one.`,
            evidenceRefs: [...themeA.evidenceRefs, ...themeB.evidenceRefs],
            source: 'theme-opposition',
        });
    }
    return tensions;
}
/** Pure function combining both tension sources. Never fabricates a side: the
 *  opposition registry only fires when both domains already exist as real themes. */
export function buildSynthesisTensions(calculatedTensions, signals, domainThemes) {
    const signalsById = new Map(signals.map((signal) => [signal.id, signal]));
    return [
        ...calculatedTensions.map((tension) => convertCalculatedTension(tension, signalsById)),
        ...buildOppositionTensions(domainThemes),
    ];
}
