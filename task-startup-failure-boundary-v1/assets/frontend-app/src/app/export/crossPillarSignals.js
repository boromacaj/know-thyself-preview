/**
 * Signal adapters convert each pillar's typed export section into the normalized
 * cross-pillar comparison layer. This is intentionally a curated subset (the full
 * raw data already lives in `pillars.*` above) — enough representative signals per
 * pillar to support meaningful candidate generation without re-flattening every field.
 */
function numerologySignals(section) {
    const byKey = Object.fromEntries(section.coreNumbers.map((entry) => [entry.key, entry]));
    const signals = [];
    const map = [
        { key: 'lifePath', domain: 'purpose', theme: 'life-path-number' },
        { key: 'expression', domain: 'self-expression', theme: 'expression-number' },
        { key: 'soulUrge', domain: 'motivation', theme: 'soul-urge-number' },
        { key: 'personality', domain: 'self-expression', theme: 'personality-number-first-impression' },
        { key: 'balance', domain: 'stress', theme: 'balance-number' },
        { key: 'maturity', domain: 'growth', theme: 'maturity-number' },
    ];
    for (const { key, domain, theme } of map) {
        const entry = byKey[key];
        if (!entry)
            continue;
        signals.push({
            id: `numerology-${key}`,
            pillar: 'numerology',
            sourcePath: `pillars.numerology.coreNumbers[key="${key}"]`,
            sourceLabel: entry.label,
            rawValue: entry.finalValue,
            normalizedValue: String(entry.finalValue),
            signalDomain: domain,
            signalTheme: theme,
            evidenceType: 'calculated',
            confidence: 0.9,
            confidenceReason: 'Deterministic digit-sum reduction from birth name/date; not methodology-sensitive.',
            methodologySensitive: false,
            symbolicOnly: true,
            notEquivalentToOtherSystems: true,
            traceability: { sourcePath: `rawOutput.${key}Number`, evidenceType: 'calculated' },
        });
    }
    const personalYear = section.cycles.personalYear;
    signals.push({
        id: 'numerology-personal-year',
        pillar: 'numerology',
        sourcePath: 'pillars.numerology.cycles.personalYear',
        sourceLabel: personalYear.label,
        rawValue: personalYear.finalValue,
        normalizedValue: String(personalYear.finalValue),
        signalDomain: 'timing',
        signalTheme: 'personal-year-cycle',
        evidenceType: 'calculated',
        confidence: 0.85,
        confidenceReason: 'Deterministic from birth date and current UTC year; changes yearly.',
        methodologySensitive: false,
        symbolicOnly: true,
        notEquivalentToOtherSystems: true,
        traceability: { sourcePath: 'rawOutput.personalYearNumber', evidenceType: 'calculated' },
    });
    return signals;
}
function westernAstrologySignals(section) {
    if (section.status !== 'calculated')
        return [];
    const signals = [];
    const byBody = Object.fromEntries(section.planets.map((planet) => [planet.body, planet]));
    const map = [
        { body: 'Sun', domain: 'identity', theme: 'sun-sign' },
        { body: 'Moon', domain: 'emotion', theme: 'moon-sign' },
        { body: 'Mars', domain: 'motivation', theme: 'mars-drive' },
        { body: 'Saturn', domain: 'structure', theme: 'saturn-structure' },
        { body: 'Jupiter', domain: 'growth', theme: 'jupiter-expansion' },
        { body: 'Mercury', domain: 'communication', theme: 'mercury-communication' },
        { body: 'Venus', domain: 'relationships', theme: 'venus-relating' },
    ];
    for (const { body, domain, theme } of map) {
        const planet = byBody[body];
        if (!planet)
            continue;
        signals.push({
            id: `western-astrology-${body.toLowerCase()}`,
            pillar: 'western-astrology',
            sourcePath: planet.sourcePath,
            sourceLabel: `${body} sign`,
            rawValue: `${planet.sign} ${planet.degreeInSign.toFixed(2)}°`,
            normalizedValue: planet.sign,
            signalDomain: domain,
            signalTheme: theme,
            evidenceType: planet.evidenceType,
            confidence: planet.confidence,
            confidenceReason: planet.confidenceReason,
            methodologySensitive: body === 'Moon',
            symbolicOnly: true,
            notEquivalentToOtherSystems: true,
            traceability: { sourcePath: planet.sourcePath, rawValue: `${planet.sign} ${planet.degreeInSign.toFixed(2)}°`, evidenceType: planet.evidenceType },
        });
    }
    if (section.angles && !section.angles.ascendant.suppressed && section.angles.ascendant.sign) {
        signals.push({
            id: 'western-astrology-ascendant',
            pillar: 'western-astrology',
            sourcePath: 'pillars.westernAstrology.angles.ascendant',
            sourceLabel: 'Ascendant sign',
            rawValue: `${section.angles.ascendant.sign} ${(section.angles.ascendant.degreeInSign ?? 0).toFixed(2)}°`,
            normalizedValue: section.angles.ascendant.sign,
            signalDomain: 'visibility',
            signalTheme: 'ascendant-presentation',
            evidenceType: 'calculated',
            confidence: 0.9,
            confidenceReason: 'Requires an exact, user-supplied birth time; not suppressed here.',
            methodologySensitive: true,
            symbolicOnly: true,
            notEquivalentToOtherSystems: true,
            traceability: { sourcePath: 'houses.angles.ascendant', evidenceType: 'calculated' },
        });
    }
    if (section.angles && !section.angles.midheaven.suppressed && section.angles.midheaven.sign) {
        signals.push({
            id: 'western-astrology-midheaven',
            pillar: 'western-astrology',
            sourcePath: 'pillars.westernAstrology.angles.midheaven',
            sourceLabel: 'Midheaven sign',
            rawValue: `${section.angles.midheaven.sign} ${(section.angles.midheaven.degreeInSign ?? 0).toFixed(2)}°`,
            normalizedValue: section.angles.midheaven.sign,
            signalDomain: 'visibility',
            signalTheme: 'midheaven-visibility',
            evidenceType: 'calculated',
            confidence: 0.9,
            confidenceReason: 'Requires an exact, user-supplied birth time; not suppressed here.',
            methodologySensitive: true,
            symbolicOnly: true,
            notEquivalentToOtherSystems: true,
            traceability: { sourcePath: 'houses.angles.midheaven', evidenceType: 'calculated' },
        });
    }
    if (section.derivedSummary) {
        for (const element of section.derivedSummary.dominantElements) {
            signals.push({
                id: `western-astrology-element-${element.toLowerCase()}`,
                pillar: 'western-astrology',
                sourcePath: 'pillars.westernAstrology.derivedSummary.elementBalance',
                sourceLabel: `Dominant element: ${element}`,
                rawValue: section.derivedSummary.elementBalance[element],
                normalizedValue: element,
                signalDomain: 'energy',
                signalTheme: 'dominant-element',
                phaseOrElement: element,
                evidenceType: 'derived',
                confidence: 0.8,
                confidenceReason: 'Count across ten classical bodies; ties are listed rather than arbitrarily broken.',
                methodologySensitive: section.missingTimeBehavior.moonApproximate,
                symbolicOnly: true,
                notEquivalentToOtherSystems: true,
                traceability: { sourcePath: 'elementBalance', evidenceType: 'derived' },
            });
        }
    }
    return signals;
}
function baziSignals(section) {
    if (section.status !== 'calculated' || !section.dayMaster)
        return [];
    const signals = [];
    signals.push({
        id: 'bazi-day-master',
        pillar: 'bazi-tcm',
        sourcePath: 'pillars.baziTcm.dayMaster',
        sourceLabel: 'Day Master',
        rawValue: `${section.dayMaster.stem} ${section.dayMaster.phase}`,
        normalizedValue: section.dayMaster.phase,
        signalDomain: 'identity',
        signalTheme: 'day-master-phase',
        phaseOrElement: section.dayMaster.phase,
        polarity: section.dayMaster.polarity,
        evidenceType: 'calculated',
        confidence: 0.95,
        confidenceReason: 'Day Pillar depends only on the calendar date, never on time of day.',
        methodologySensitive: false,
        symbolicOnly: true,
        notEquivalentToOtherSystems: true,
        traceability: { sourcePath: 'dayMaster', evidenceType: 'calculated' },
    });
    if (section.dayMasterStrength) {
        signals.push({
            id: 'bazi-day-master-strength',
            pillar: 'bazi-tcm',
            sourcePath: 'pillars.baziTcm.dayMasterStrength',
            sourceLabel: 'Day Master strength tendency',
            rawValue: section.dayMasterStrength.tendency,
            normalizedValue: section.dayMasterStrength.tendency,
            signalDomain: 'energy',
            signalTheme: 'day-master-strength',
            evidenceType: 'methodology-sensitive',
            confidence: section.dayMasterStrength.confidence === 'high' ? 0.75 : section.dayMasterStrength.confidence === 'medium' ? 0.6 : 0.45,
            confidenceReason: section.dayMasterStrength.disclaimer,
            methodologySensitive: true,
            symbolicOnly: true,
            notEquivalentToOtherSystems: true,
            traceability: { sourcePath: 'dayMasterStrength', evidenceType: 'methodology-sensitive' },
        });
    }
    if (section.fivePhase.raw) {
        const counts = section.fivePhase.raw.counts;
        const highest = Math.max(...Object.values(counts));
        const dominant = Object.entries(counts).filter(([, count]) => count === highest).map(([phase]) => phase);
        for (const phase of dominant) {
            signals.push({
                id: `bazi-element-${phase.toLowerCase()}`,
                pillar: 'bazi-tcm',
                sourcePath: 'pillars.baziTcm.fivePhase.raw.counts',
                sourceLabel: `Dominant visible phase: ${phase}`,
                rawValue: counts[phase],
                normalizedValue: phase,
                signalDomain: 'energy',
                signalTheme: 'dominant-phase',
                phaseOrElement: phase,
                evidenceType: 'derived',
                confidence: 0.75,
                confidenceReason: 'Raw visible-character count only; hidden stems and seasonal weighting are excluded.',
                methodologySensitive: section.timePipeline.birthTimePrecision === 'estimated-local-noon',
                symbolicOnly: true,
                notEquivalentToOtherSystems: true,
                traceability: { sourcePath: 'rawPhaseBalance.counts', evidenceType: 'derived' },
            });
        }
    }
    if (section.tcmConstitution) {
        const correspondence = section.tcmCorrespondence.find((entry) => entry.phase === section.tcmConstitution.dayMasterPhase);
        if (correspondence) {
            signals.push({
                id: 'bazi-tcm-day-master-emotion',
                pillar: 'bazi-tcm',
                sourcePath: 'pillars.baziTcm.tcmConstitution.dayMasterCorrespondence',
                sourceLabel: `TCM correspondence emotion: ${correspondence.phase}`,
                rawValue: correspondence.emotion,
                normalizedValue: correspondence.emotion,
                signalDomain: 'emotion',
                signalTheme: 'tcm-phase-emotion-correspondence',
                phaseOrElement: correspondence.phase,
                evidenceType: 'traditional-correspondence',
                confidence: 0.5,
                confidenceReason: 'Traditional symbolic correspondence, not a clinical or diagnostic claim.',
                methodologySensitive: true,
                symbolicOnly: true,
                notEquivalentToOtherSystems: true,
                traceability: { sourcePath: 'tcmConstitution.dayMasterCorrespondence.emotion', evidenceType: 'traditional-correspondence', notEquivalentToMedicalState: true },
            });
        }
    }
    return signals;
}
function humanDesignSignals(section) {
    if (section.status !== 'calculated' || section.mechanicsSuppressed || !section.mechanics)
        return [];
    const mechanics = section.mechanics;
    const signals = [];
    signals.push({
        id: 'human-design-type',
        pillar: 'human-design',
        sourcePath: 'pillars.humanDesign.mechanics.type',
        sourceLabel: 'Type',
        rawValue: mechanics.type,
        normalizedValue: mechanics.type,
        signalDomain: 'energy',
        signalTheme: 'energy-type',
        evidenceType: 'calculated',
        confidence: 0.9,
        confidenceReason: 'Derived deterministically from the completed-channel center graph; requires user-supplied birth time.',
        methodologySensitive: false,
        symbolicOnly: true,
        notEquivalentToOtherSystems: true,
        traceability: { sourcePath: 'type', evidenceType: 'calculated' },
    });
    signals.push({
        id: 'human-design-authority',
        pillar: 'human-design',
        sourcePath: 'pillars.humanDesign.mechanics.authority',
        sourceLabel: 'Authority',
        rawValue: mechanics.authority,
        normalizedValue: mechanics.authority,
        signalDomain: 'decision-making',
        signalTheme: 'decision-authority',
        evidenceType: 'calculated',
        confidence: 0.9,
        confidenceReason: 'Resolved via the fixed Authority hierarchy over the defined-center graph.',
        methodologySensitive: false,
        symbolicOnly: true,
        notEquivalentToOtherSystems: true,
        traceability: { sourcePath: 'authority', evidenceType: 'calculated' },
    });
    signals.push({
        id: 'human-design-definition',
        pillar: 'human-design',
        sourcePath: 'pillars.humanDesign.mechanics.definition',
        sourceLabel: 'Definition',
        rawValue: mechanics.definition,
        normalizedValue: mechanics.definition,
        signalDomain: 'cooperation',
        signalTheme: 'definition-structure',
        evidenceType: 'calculated',
        confidence: 0.9,
        confidenceReason: 'Connected-component count over the defined-center graph.',
        methodologySensitive: false,
        symbolicOnly: true,
        notEquivalentToOtherSystems: true,
        traceability: { sourcePath: 'definition', evidenceType: 'calculated' },
    });
    if (mechanics.motorToThroat) {
        signals.push({
            id: 'human-design-motor-to-throat',
            pillar: 'human-design',
            sourcePath: 'pillars.humanDesign.mechanics.motorToThroat',
            sourceLabel: 'Motor-to-Throat connection',
            rawValue: true,
            normalizedValue: 'connected',
            signalDomain: 'leadership',
            signalTheme: 'motor-to-throat-connection',
            evidenceType: 'calculated',
            confidence: 0.9,
            confidenceReason: 'Graph path from a motor center to the Throat center, not simple center presence.',
            methodologySensitive: false,
            symbolicOnly: true,
            notEquivalentToOtherSystems: true,
            traceability: { sourcePath: 'motorToThroat', evidenceType: 'calculated' },
        });
    }
    return signals;
}
export function buildCrossPillarSignals(pillars) {
    return [
        ...numerologySignals(pillars.numerology),
        ...westernAstrologySignals(pillars.westernAstrology),
        ...baziSignals(pillars.baziTcm),
        ...humanDesignSignals(pillars.humanDesign),
    ];
}
