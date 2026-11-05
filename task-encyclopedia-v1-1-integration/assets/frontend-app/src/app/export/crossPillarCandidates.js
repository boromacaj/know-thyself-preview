const SHARED_ELEMENT_NAMES = new Set(['Fire', 'Earth', 'Water']);
function findSignal(signals, id) {
    return signals.find((signal) => signal.id === id);
}
function findSignalsByTheme(signals, theme) {
    return signals.filter((signal) => signal.signalTheme === theme);
}
function directElementMatch(signals) {
    const westernElements = findSignalsByTheme(signals, 'dominant-element');
    const baziDayMaster = findSignal(signals, 'bazi-day-master');
    const candidates = [];
    const tensions = [];
    const matched = [];
    if (!baziDayMaster || typeof baziDayMaster.phaseOrElement !== 'string')
        return { candidates, tensions, matched };
    const sharedWestern = westernElements.find((signal) => typeof signal.phaseOrElement === 'string' && SHARED_ELEMENT_NAMES.has(signal.phaseOrElement));
    if (sharedWestern && sharedWestern.phaseOrElement === baziDayMaster.phaseOrElement) {
        candidates.push({
            id: 'direct-match-dominant-element-day-master',
            relationshipType: 'direct-match',
            signalIds: [sharedWestern.id, baziDayMaster.id],
            pillars: ['western-astrology', 'bazi-tcm'],
            proposedTheme: `${sharedWestern.phaseOrElement} emphasis in both central markers`,
            rationale: `Western Astrology's dominant element balance and BaZi's Day Master independently resolve to the same one of the three element names both frameworks share (Fire, Earth, Water).`,
            confidence: 0.85,
            confidenceReason: 'Two independent, deterministic calculation systems converged on the same shared-vocabulary element name for a central chart marker.',
            equivalenceStatus: 'analogous',
            requiresHumanReview: true,
            warnings: ['Fire/Earth/Water/Wood/Metal in Western Astrology (4-element) and BaZi (5-phase) are structurally different systems; a shared element name is not proof of a shared underlying mechanism. See semantic guardrails.'],
            traceability: { westernSourcePath: sharedWestern.sourcePath, baziSourcePath: baziDayMaster.sourcePath },
        });
        matched.push(sharedWestern.id, baziDayMaster.id);
    }
    else if (sharedWestern) {
        tensions.push({
            id: 'tension-dominant-element-vs-day-master',
            signalIds: [sharedWestern.id, baziDayMaster.id],
            pillars: ['western-astrology', 'bazi-tcm'],
            summary: `Western Astrology's dominant element (${String(sharedWestern.phaseOrElement)}) and BaZi's Day Master element (${String(baziDayMaster.phaseOrElement)}) disagree.`,
            differingSignals: `${sharedWestern.sourceLabel}: ${String(sharedWestern.normalizedValue)} vs ${baziDayMaster.sourceLabel}: ${String(baziDayMaster.normalizedValue)}`,
            differentLevelsNote: 'Western dominant element is a distribution across ten planetary sign placements; BaZi Day Master is a single stem. They operate at different structural levels even before considering they are different ontologies.',
            complementaryPossible: true,
            methodologyExplanation: 'Both frameworks independently assign a central elemental category using unrelated calculation methods; disagreement is expected more often than agreement by chance alone.',
            requiresHumanReview: true,
            confidence: 0.5,
            traceability: { westernSourcePath: sharedWestern.sourcePath, baziSourcePath: baziDayMaster.sourcePath },
        });
        matched.push(sharedWestern.id, baziDayMaster.id);
    }
    return { candidates, tensions, matched };
}
function functionalParallels(signals) {
    const candidates = [];
    const matched = [];
    const jupiter = findSignal(signals, 'western-astrology-jupiter');
    const wood = findSignal(signals, 'bazi-element-wood');
    if (jupiter && wood) {
        candidates.push({
            id: 'functional-parallel-jupiter-wood',
            relationshipType: 'functional-parallel',
            signalIds: [jupiter.id, wood.id],
            pillars: ['western-astrology', 'bazi-tcm'],
            proposedTheme: 'growth / expansion',
            rationale: 'Western Astrology commonly associates Jupiter with growth and expansion; BaZi\'s Wood phase carries a traditional growth/expansion association. Both are present and emphasized in this chart.',
            confidence: 0.65,
            confidenceReason: 'A commonly cited cross-tradition functional analogy, not a calculated equivalence — both source signals are independently calculated, but the mapping between them is symbolic.',
            equivalenceStatus: 'functionally-related',
            requiresHumanReview: true,
            warnings: ['This mapping is a symbolic/cultural analogy, not a calculated equivalence.'],
            traceability: { westernSourcePath: jupiter.sourcePath, baziSourcePath: wood.sourcePath },
        });
        matched.push(jupiter.id, wood.id);
    }
    const saturn = findSignal(signals, 'western-astrology-saturn');
    const metal = findSignal(signals, 'bazi-element-metal');
    if (saturn && metal) {
        candidates.push({
            id: 'functional-parallel-saturn-metal',
            relationshipType: 'functional-parallel',
            signalIds: [saturn.id, metal.id],
            pillars: ['western-astrology', 'bazi-tcm'],
            proposedTheme: 'structure / boundaries',
            rationale: 'Western Astrology commonly associates Saturn with structure and boundaries; BaZi\'s Metal phase carries a traditional structure/boundary association. Both are present and emphasized in this chart.',
            confidence: 0.65,
            confidenceReason: 'A commonly cited cross-tradition functional analogy, not a calculated equivalence.',
            equivalenceStatus: 'functionally-related',
            requiresHumanReview: true,
            warnings: ['This mapping is a symbolic/cultural analogy, not a calculated equivalence.'],
            traceability: { westernSourcePath: saturn.sourcePath, baziSourcePath: metal.sourcePath },
        });
        matched.push(saturn.id, metal.id);
    }
    return { candidates, matched };
}
function archetypalResonances(signals) {
    const candidates = [];
    const matched = [];
    const lifePath = findSignal(signals, 'numerology-lifePath');
    const sun = findSignal(signals, 'western-astrology-sun');
    if (lifePath && sun) {
        candidates.push({
            id: 'archetypal-resonance-life-path-sun',
            relationshipType: 'archetypal-resonance',
            signalIds: [lifePath.id, sun.id],
            pillars: ['numerology', 'western-astrology'],
            proposedTheme: 'central identity marker',
            rationale: 'Life Path Number and Sun sign are each, within their own system, commonly treated as a single central identity marker. This is a broad structural resonance (both systems designate one primary marker), not a claim that the two values mean the same thing.',
            confidence: 0.4,
            confidenceReason: 'Low-confidence archetypal resonance: shared structural role (a single "headline" marker) across systems, no shared calculation basis.',
            equivalenceStatus: 'symbolically-resonant',
            requiresHumanReview: true,
            warnings: ['A number derived from birth-name letters and a planetary sign position share no calculation mechanism whatsoever.'],
            traceability: { numerologySourcePath: lifePath.sourcePath, westernSourcePath: sun.sourcePath },
        });
        matched.push(lifePath.id, sun.id);
    }
    const hdType = findSignal(signals, 'human-design-type');
    const dayMasterStrength = findSignal(signals, 'bazi-day-master-strength');
    if (hdType && dayMasterStrength) {
        candidates.push({
            id: 'archetypal-resonance-hd-type-day-master-strength',
            relationshipType: 'archetypal-resonance',
            signalIds: [hdType.id, dayMasterStrength.id],
            pillars: ['human-design', 'bazi-tcm'],
            proposedTheme: 'energetic approach',
            rationale: 'Human Design Type describes how energy is structurally generated and expressed; BaZi Day Master strength describes how supported or depleted the central stem is within its chart. Both broadly speak to "energetic approach" without describing the same mechanism.',
            confidence: 0.4,
            confidenceReason: 'Low-confidence archetypal resonance across unrelated calculation methods.',
            equivalenceStatus: 'symbolically-resonant',
            requiresHumanReview: true,
            warnings: ['Human Design Type is a graph-connectivity classification; BaZi Day Master strength is a heuristic support/drain score. They are not commensurable.'],
            traceability: { humanDesignSourcePath: hdType.sourcePath, baziSourcePath: dayMasterStrength.sourcePath },
        });
        matched.push(hdType.id, dayMasterStrength.id);
    }
    const motorToThroat = findSignal(signals, 'human-design-motor-to-throat');
    const expression = findSignal(signals, 'numerology-expression');
    if (motorToThroat && expression) {
        candidates.push({
            id: 'archetypal-resonance-motor-to-throat-expression',
            relationshipType: 'archetypal-resonance',
            signalIds: [motorToThroat.id, expression.id],
            pillars: ['human-design', 'numerology'],
            proposedTheme: 'outward expression channel',
            rationale: 'A connected motor-to-Throat path describes a structural capacity for energy to reach outward expression in Human Design; the Expression Number is numerology\'s outward-facing name-derived marker. Both loosely concern "outward expression," calculated by unrelated methods.',
            confidence: 0.35,
            confidenceReason: 'Low-confidence archetypal resonance; below this the export layer does not surface a candidate by default.',
            equivalenceStatus: 'symbolically-resonant',
            requiresHumanReview: true,
            warnings: ['These are unrelated calculation domains (graph connectivity vs. name-letter arithmetic).'],
            traceability: { humanDesignSourcePath: motorToThroat.sourcePath, numerologySourcePath: expression.sourcePath },
        });
        matched.push(motorToThroat.id, expression.id);
    }
    return { candidates, matched };
}
export function buildCrossPillarCandidates(signals) {
    const elementResult = directElementMatch(signals);
    const parallelResult = functionalParallels(signals);
    const resonanceResult = archetypalResonances(signals);
    const matchedSignalIds = new Set([
        ...elementResult.matched,
        ...parallelResult.matched,
        ...resonanceResult.matched,
    ]);
    return {
        candidates: [...elementResult.candidates, ...parallelResult.candidates, ...resonanceResult.candidates],
        tensions: elementResult.tensions,
        matchedSignalIds,
    };
}
