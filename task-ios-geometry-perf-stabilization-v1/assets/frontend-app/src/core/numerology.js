import { VERSIONS } from './versions.js?v=d9f39e7';
import { KARMIC_DEBT_NUMBERS, attitudeOf, balanceOf, birthDayOf, calendarDateFromIso, challengesOf, karmicDebtIn, letterValues, lifePathOf, maturityOf, nameNumberOf, nameUnits, normalizeNameLetters, personalCyclesFor, personalYearOf, pinnacleAgeWindows, pinnaclesOf, reduceNumber, } from './numerologyMethodology.js?v=d9f39e7';
/*
 * THE NUMEROLOGY TAB'S ENGINE.
 *
 * Every number here is calculated by core/numerologyMethodology.ts, the same
 * kernel the Forecast uses; this file only wraps the results in the traceable
 * NumberCalculation shape the rest of the app reads. The conventions - Life
 * Path route, per-name reduction, the Y rule, master numbers by position,
 * karmic-debt detection, Pinnacle timing, Challenge parts, personal cycles - are
 * specified in docs/numerology/NUMEROLOGY_METHODOLOGY_CONTRACT.md and named in
 * the kernel, not re-decided here.
 */
const LIFE_PATH_TRAITS = {
    1: [
        { traitId: 'autonomy-drive', traitLabel: 'Autonomy drive', domain: 'agency', sourceSystem: 'numerology', weight: 0.86, polarity: 'supporting', context: 'Life Path 1 may indicate a stronger symbolic signal for self-direction.' },
        { traitId: 'initiative-tendency', traitLabel: 'Initiative tendency', domain: 'agency', sourceSystem: 'numerology', weight: 0.78, polarity: 'supporting', context: 'Life Path 1 may support starting motion before consensus is complete.' },
    ],
    2: [
        { traitId: 'relational-sensitivity', traitLabel: 'Relational sensitivity', domain: 'relational', sourceSystem: 'numerology', weight: 0.84, polarity: 'supporting', context: 'Life Path 2 may indicate a symbolic tendency toward attunement and cooperation.' },
        { traitId: 'harmony-seeking', traitLabel: 'Harmony seeking', domain: 'relational', sourceSystem: 'numerology', weight: 0.76, polarity: 'supporting', context: 'Life Path 2 may support awareness of group tone and relational pacing.' },
    ],
    3: [
        { traitId: 'expressive-communication', traitLabel: 'Expressive communication', domain: 'expression', sourceSystem: 'numerology', weight: 0.84, polarity: 'supporting', context: 'Life Path 3 may indicate a symbolic signal for creative expression.' },
        { traitId: 'social-openness', traitLabel: 'Social openness', domain: 'expression', sourceSystem: 'numerology', weight: 0.72, polarity: 'supporting', context: 'Life Path 3 may support learning through social and expressive feedback.' },
    ],
    4: [
        { traitId: 'structure-orientation', traitLabel: 'Structure orientation', domain: 'structure', sourceSystem: 'numerology', weight: 0.86, polarity: 'supporting', context: 'Life Path 4 may indicate a symbolic signal for practical structure and consistency.' },
        { traitId: 'stability-seeking', traitLabel: 'Stability seeking', domain: 'structure', sourceSystem: 'numerology', weight: 0.78, polarity: 'supporting', context: 'Life Path 4 may support grounded pacing and repeatable systems.' },
    ],
    5: [
        { traitId: 'novelty-seeking', traitLabel: 'Novelty seeking', domain: 'adaptability', sourceSystem: 'numerology', weight: 0.84, polarity: 'supporting', context: 'Life Path 5 may indicate a symbolic signal for variety and movement.' },
        { traitId: 'adaptability', traitLabel: 'Adaptability', domain: 'adaptability', sourceSystem: 'numerology', weight: 0.78, polarity: 'supporting', context: 'Life Path 5 may support learning through changing contexts.' },
    ],
    6: [
        { traitId: 'care-orientation', traitLabel: 'Care orientation', domain: 'care', sourceSystem: 'numerology', weight: 0.84, polarity: 'supporting', context: 'Life Path 6 may indicate a symbolic signal for care, protection, and responsibility.' },
        { traitId: 'relational-commitment', traitLabel: 'Relational commitment', domain: 'care', sourceSystem: 'numerology', weight: 0.74, polarity: 'supporting', context: 'Life Path 6 may support steadiness in close relational systems.' },
    ],
    7: [
        { traitId: 'analytical-depth', traitLabel: 'Analytical depth', domain: 'reflection', sourceSystem: 'numerology', weight: 0.86, polarity: 'supporting', context: 'Life Path 7 may indicate a symbolic signal for inquiry and introspection.' },
        { traitId: 'meaning-seeking', traitLabel: 'Meaning seeking', domain: 'reflection', sourceSystem: 'numerology', weight: 0.8, polarity: 'supporting', context: 'Life Path 7 may support depth-oriented reflection before action.' },
    ],
    8: [
        { traitId: 'execution-drive', traitLabel: 'Execution drive', domain: 'execution', sourceSystem: 'numerology', weight: 0.86, polarity: 'supporting', context: 'Life Path 8 may indicate a symbolic signal for material organization and execution.' },
        { traitId: 'strategic-thinking', traitLabel: 'Strategic thinking', domain: 'execution', sourceSystem: 'numerology', weight: 0.78, polarity: 'supporting', context: 'Life Path 8 may support attention to leverage, resources, and outcomes.' },
    ],
    9: [
        { traitId: 'collective-sensitivity', traitLabel: 'Collective sensitivity', domain: 'collective', sourceSystem: 'numerology', weight: 0.84, polarity: 'supporting', context: 'Life Path 9 may indicate a symbolic signal for collective perspective and emotional depth.' },
        { traitId: 'symbolic-imagination', traitLabel: 'Symbolic imagination', domain: 'collective', sourceSystem: 'numerology', weight: 0.76, polarity: 'supporting', context: 'Life Path 9 may support broad pattern recognition and integrative reflection.' },
    ],
    11: [
        { traitId: 'intuitive-sensitivity', traitLabel: 'Intuitive sensitivity', domain: 'reflection', sourceSystem: 'numerology', weight: 0.8, polarity: 'supporting', context: 'Master number 11 is preserved by policy and may indicate heightened symbolic sensitivity.' },
    ],
    22: [
        { traitId: 'large-scale-structure', traitLabel: 'Large-scale structure', domain: 'structure', sourceSystem: 'numerology', weight: 0.8, polarity: 'supporting', context: 'Master number 22 is preserved by policy and may indicate structure-building as a symbolic theme.' },
    ],
    33: [
        { traitId: 'service-through-care', traitLabel: 'Service through care', domain: 'care', sourceSystem: 'numerology', weight: 0.8, polarity: 'supporting', context: 'Master number 33 is preserved by policy and may indicate care-oriented contribution as a symbolic theme.' },
    ],
};
/** The calculation letters of a name: NFD fold, transliteration, A-Z only. */
export function normalizeName(name) {
    return normalizeNameLetters(name);
}
const steps = (reduction) => reduction.chain.map(String);
/** "28/10/1", "1987/25/7", "11" - a part and its own reduction. */
const chainText = (reduction) => reduction.chain.join('/');
function lifePathCalculation(birthDate, lifePath) {
    const { month, day, year } = lifePath.units;
    return {
        label: 'Life Path Number',
        rawInput: birthDate,
        normalizedInput: `birthMonth:${chainText(month)}+birthDay:${chainText(day)}+birthYear:${chainText(year)}`,
        componentValues: [month.result, day.result, year.result],
        reductionSteps: steps(lifePath.total),
        finalNumber: lifePath.total.result,
        preservedMasterNumber: lifePath.total.isMaster,
    };
}
function birthDayCalculation(birthDate, birth, reduction) {
    return {
        label: 'Birth Day Number',
        rawInput: birthDate,
        normalizedInput: String(birth.day).padStart(2, '0'),
        componentValues: [birth.day],
        reductionSteps: steps(reduction),
        finalNumber: reduction.result,
        preservedMasterNumber: reduction.isMaster,
    };
}
/**
 * A name number, traced unit by unit: "BORIS=27/9 + MACAJ=10/1". The component
 * values are the unit results that are added; the reduction steps run from
 * their sum (the compound) to the number.
 */
function nameCalculation(label, birthFullName, name) {
    return {
        label,
        rawInput: birthFullName,
        normalizedInput: name.units.map((entry) => `${entry.letters}=${chainText(entry.reduction)}`).join(' + '),
        componentValues: name.units.map((entry) => entry.reduction.result),
        reductionSteps: steps(name.total),
        finalNumber: name.total.result,
        preservedMasterNumber: name.total.isMaster,
    };
}
function allSingleDigitValues() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9];
}
function nameValueCounts(values) {
    return allSingleDigitValues().reduce((counts, value) => {
        counts[String(value)] = values.filter((componentValue) => componentValue === value).length;
        return counts;
    }, {});
}
function calculateKarmicLessons(rawInput, normalizedInput, values) {
    const presentValues = allSingleDigitValues().filter((value) => values.includes(value));
    const missingValues = allSingleDigitValues().filter((value) => !values.includes(value));
    return {
        label: 'Karmic Lessons',
        rawInput,
        normalizedInput,
        componentValues: values,
        presentValues,
        missingValues,
        finalValues: missingValues,
        note: 'Missing values from 1 to 9 in the mapped birth name.',
    };
}
function calculateHiddenPassion(rawInput, normalizedInput, values) {
    const valueCounts = nameValueCounts(values);
    const highestCount = Math.max(...Object.values(valueCounts));
    const finalValues = highestCount > 0
        ? allSingleDigitValues().filter((value) => valueCounts[String(value)] === highestCount)
        : [];
    return {
        label: 'Hidden Passion',
        rawInput,
        normalizedInput,
        componentValues: values,
        valueCounts,
        finalValues,
        note: 'Most frequent mapped value or values in the submitted birth name.',
    };
}
function balanceCalculation(birthFullName, units) {
    const balance = balanceOf(units);
    return {
        label: 'Balance Number',
        rawInput: birthFullName,
        normalizedInput: balance.initials,
        componentValues: [...balance.values],
        reductionSteps: steps(balance.total),
        finalNumber: balance.total.result,
        preservedMasterNumber: balance.total.isMaster,
    };
}
function maturityCalculation(lifePathNumber, expressionNumber) {
    const reduction = maturityOf(lifePathNumber.finalNumber, expressionNumber.finalNumber);
    return {
        label: 'Maturity Number',
        rawInput: `Life Path ${lifePathNumber.finalNumber} + Expression ${expressionNumber.finalNumber}`,
        normalizedInput: `lifePath:${lifePathNumber.finalNumber}+expression:${expressionNumber.finalNumber}`,
        componentValues: [lifePathNumber.finalNumber, expressionNumber.finalNumber],
        reductionSteps: steps(reduction),
        finalNumber: reduction.result,
        preservedMasterNumber: reduction.isMaster,
    };
}
/** One of the three personal cycles in the NumberCalculation shape, from the shared trace. */
function cycleCalculation(label, rawInput, normalizedInput, trace) {
    return {
        label,
        rawInput,
        normalizedInput,
        componentValues: trace.parts.map((part) => part.value),
        reductionSteps: [trace.sum, ...trace.steps.map((step) => step.to)].map(String),
        finalNumber: trace.result,
        preservedMasterNumber: false,
    };
}
/** A personal-cycle part and its own full reduction: "28/10/1", "2026/10/1". */
const cyclePartText = (value) => chainText(reduceNumber(value, 'reduce-masters'));
function personalYearCalculation(birthDate, birth, year, trace) {
    return cycleCalculation('Personal Year Number', `${birthDate.slice(5)} + ${year}`, `birthMonth:${cyclePartText(birth.month)}+birthDay:${cyclePartText(birth.day)}+calendarYear:${cyclePartText(year)}`, trace);
}
/**
 * Personal Year for any calendar year, through the shared kernel: always 1-9.
 * Kept as an export for the legacy Numerology screen's year selector.
 */
export function calculatePersonalYear(birthDate, currentYear) {
    const birth = calendarDateFromIso(birthDate);
    return personalYearCalculation(birthDate, birth, currentYear, personalYearOf(birth, currentYear));
}
function personalMonthCalculation(trace, month) {
    const personalYear = trace.parts[0].value;
    const paddedMonth = String(month).padStart(2, '0');
    return cycleCalculation('Personal Month Number', `Personal Year ${personalYear} + calendar month ${paddedMonth}`, `personalYear:${personalYear}+calendarMonth:${paddedMonth}`, trace);
}
function personalDayCalculation(trace, day) {
    const personalMonth = trace.parts[0].value;
    const paddedDay = String(day).padStart(2, '0');
    return cycleCalculation('Personal Day Number', `Personal Month ${personalMonth} + day of month ${paddedDay}`, `personalMonth:${personalMonth}+dayOfMonth:${paddedDay}`, trace);
}
function pinnacleCalculation(label, leftLabel, leftValue, rightLabel, rightValue, reduction) {
    return {
        label,
        rawInput: `${leftLabel} + ${rightLabel} = ${leftValue} + ${rightValue}`,
        normalizedInput: `${leftLabel}:${leftValue}+${rightLabel}:${rightValue}`,
        componentValues: [leftValue, rightValue],
        reductionSteps: steps(reduction),
        finalNumber: reduction.result,
        preservedMasterNumber: reduction.isMaster,
    };
}
function challengeCalculation(label, leftLabel, rightLabel, result) {
    return {
        label,
        rawInput: `abs(${leftLabel} - ${rightLabel}) = abs(${result.left} - ${result.right})`,
        normalizedInput: `abs(${leftLabel}:${result.left}-${rightLabel}:${result.right})`,
        componentValues: [result.left, result.right],
        reductionSteps: [String(result.value)],
        finalNumber: result.value,
        preservedMasterNumber: false,
    };
}
/**
 * The Pinnacles add the birth month, day and year as the Life Path does - each
 * reduced to a single digit or a master - and a master total is kept.
 */
function calculatePinnacleNumbers(birth) {
    const pinnacles = pinnaclesOf(birth);
    const month = pinnacles.units.month.result;
    const day = pinnacles.units.day.result;
    const year = pinnacles.units.year.result;
    return {
        first: pinnacleCalculation('First Pinnacle', 'birthMonthReduced', month, 'birthDayReduced', day, pinnacles.first),
        second: pinnacleCalculation('Second Pinnacle', 'birthDayReduced', day, 'birthYearReduced', year, pinnacles.second),
        third: pinnacleCalculation('Third Pinnacle', 'firstPinnacle', pinnacles.first.result, 'secondPinnacle', pinnacles.second.result, pinnacles.third),
        fourth: pinnacleCalculation('Fourth Pinnacle', 'birthMonthReduced', month, 'birthYearReduced', year, pinnacles.fourth),
    };
}
/**
 * The Challenges subtract the same three parts as SINGLE DIGITS - masters
 * reduced first (11 -> 2, 22 -> 4) - so every Challenge is 0-8. The trace calls
 * them "Digit" rather than "Reduced" so the difference from the Pinnacles'
 * parts is visible where the working is shown.
 */
function calculateChallengeNumbers(birth) {
    const challenges = challengesOf(birth);
    return {
        first: challengeCalculation('First Challenge', 'birthDayDigit', 'birthMonthDigit', challenges.first),
        second: challengeCalculation('Second Challenge', 'birthDayDigit', 'birthYearDigit', challenges.second),
        third: challengeCalculation('Third Challenge', 'firstChallenge', 'secondChallenge', challenges.third),
        fourth: challengeCalculation('Fourth Challenge', 'birthMonthDigit', 'birthYearDigit', challenges.fourth),
    };
}
/**
 * The Attitude number pairs the birth month with the birth day. It reads as the
 * first impression a person gives, distinct from the Expression drawn from the
 * name. Master numbers are reduced here.
 */
function calculateAttitudeNumber(birth) {
    const reduction = attitudeOf(birth);
    return {
        label: 'Attitude Number',
        rawInput: `birth month ${birth.month} + birth day ${birth.day}`,
        normalizedInput: `birthMonth:${birth.month}+birthDay:${birth.day}`,
        componentValues: [birth.month, birth.day],
        reductionSteps: steps(reduction),
        finalNumber: reduction.result,
        preservedMasterNumber: reduction.isMaster,
    };
}
const PINNACLE_LABELS = ['First Pinnacle', 'Second Pinnacle', 'Third Pinnacle', 'Fourth Pinnacle'];
/**
 * The four Pinnacle age windows. The first closes at 36 minus the Life Path - a
 * master Life Path reduced to its digit first - the middle two run nine years
 * each, and the fourth stays open.
 */
export function pinnacleAgeSpans(lifePathNumber) {
    return pinnacleAgeWindows(lifePathNumber).map((window, index) => ({
        label: PINNACLE_LABELS[index],
        startAge: window.startAge,
        endAge: window.endAge,
    }));
}
/**
 * A karmic debt is recorded when 13, 14, 16 or 19 is a position's own total or a
 * total met on its way down. Each core calculation's reductionSteps are exactly
 * that chain - from the position's compound to its number - so every hit stays
 * traceable to the position that produced it, and the parts' own chains (a
 * birth year through 19, a single name through 16) are never counted.
 */
function calculateKarmicDebt(calculations) {
    const hits = [];
    for (const calculation of calculations) {
        const value = karmicDebtIn({
            chain: calculation.reductionSteps.map(Number),
            result: calculation.finalNumber,
            isMaster: calculation.preservedMasterNumber,
        });
        if (value !== null)
            hits.push({ value, label: calculation.label });
    }
    const finalValues = [...new Set(hits.map((hit) => hit.value))].sort((left, right) => left - right);
    return {
        label: 'Karmic Debt',
        rawInput: calculations.map((calculation) => `${calculation.label}: ${calculation.reductionSteps.join(' -> ')}`).join(' | '),
        normalizedInput: hits.map((hit) => `${hit.label}:${hit.value}`).join(', ') || 'none',
        componentValues: [...KARMIC_DEBT_NUMBERS],
        presentValues: finalValues,
        missingValues: KARMIC_DEBT_NUMBERS.filter((value) => !finalValues.includes(value)),
        finalValues,
        note: hits.length > 0
            ? `Karmic debt totals found in: ${hits.map((hit) => `${hit.value} (${hit.label})`).join(', ')}.`
            : 'No karmic debt total (13, 14, 16 or 19) appears in the reduction path of any core number.',
    };
}
/**
 * The civil date the tab reads its personal cycles on: the device's local
 * calendar date at the moment the profile is calculated - the same "today" the
 * Forecast opens on, so the two show the same Personal Year, Month and Day for
 * it. A bare year reads 1 January of that year.
 */
function cycleDateParts(currentDate) {
    if (typeof currentDate === 'number') {
        return { year: currentDate, month: 1, day: 1 };
    }
    return {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate(),
    };
}
function confidenceForProfile(profile) {
    return profile.input.uncertainty.inputConfidence;
}
export function runNumerologyEngine(profile, generatedAt, currentDate = new Date()) {
    const birthFullName = profile.identity.birthFullName;
    const normalizedBirthFullName = profile.identity.normalizedBirthFullName;
    const birthDate = profile.input.birthDate;
    const birth = calendarDateFromIso(birthDate);
    const units = nameUnits(profile.identity.birthGivenNames, profile.identity.birthSurname);
    const fullNameValues = letterValues(units.map((unit) => unit.letters).join(''));
    const lifePathNumber = lifePathCalculation(birthDate, lifePathOf(birth));
    const birthDayNumber = birthDayCalculation(birthDate, birth, birthDayOf(birth));
    const expressionNumber = nameCalculation('Expression / Destiny Number', birthFullName, nameNumberOf(units, 'all'));
    const soulUrgeNumber = nameCalculation('Soul Urge Number', birthFullName, nameNumberOf(units, 'vowels'));
    const personalityNumber = nameCalculation('Personality Number', birthFullName, nameNumberOf(units, 'consonants'));
    const karmicDebt = calculateKarmicDebt([lifePathNumber, birthDayNumber, expressionNumber, soulUrgeNumber, personalityNumber]);
    const cycleDate = cycleDateParts(currentDate);
    const cycles = personalCyclesFor(birth, cycleDate);
    const rawOutput = {
        lifePathNumber,
        birthDayNumber,
        expressionNumber,
        soulUrgeNumber,
        personalityNumber,
        personalYearNumber: personalYearCalculation(birthDate, birth, cycleDate.year, cycles.yearTrace),
        personalMonthNumber: personalMonthCalculation(cycles.monthTrace, cycleDate.month),
        personalDayNumber: personalDayCalculation(cycles.dayTrace, cycleDate.day),
        pinnacleNumbers: calculatePinnacleNumbers(birth),
        challengeNumbers: calculateChallengeNumbers(birth),
        pinnacleAgeSpans: pinnacleAgeSpans(lifePathNumber.finalNumber),
        attitudeNumber: calculateAttitudeNumber(birth),
        karmicDebtNumbers: karmicDebt,
        karmicLessons: calculateKarmicLessons(birthFullName, normalizedBirthFullName, fullNameValues),
        hiddenPassionNumbers: calculateHiddenPassion(birthFullName, normalizedBirthFullName, fullNameValues),
        balanceNumber: balanceCalculation(birthFullName, units),
        maturityNumber: maturityCalculation(lifePathNumber, expressionNumber),
    };
    const cluster = clusterForLifePath(rawOutput.lifePathNumber.finalNumber);
    const confidence = confidenceForProfile(profile);
    const traitContributions = traitsForLifePath(rawOutput.lifePathNumber.finalNumber, cluster, confidence);
    const evidence = evidenceForLifePath(profile, rawOutput.lifePathNumber, cluster, traitContributions, generatedAt);
    return {
        engineId: 'numerology-mvp',
        engineVersion: VERSIONS.engineVersions.numerology,
        rulesetVersion: VERSIONS.rulesetVersions.numerology,
        inputReference: {
            profileId: profile.profileId,
            inputConfidence: confidence,
            nameLayer: 'birth_name',
            sourceFields: ['birthGivenNames', 'birthSurname'],
            birthFullName,
        },
        rawOutput,
        symbolicMeaningClusters: [cluster],
        traitContributions,
        confidenceMetadata: {
            overallConfidence: confidence,
            factors: [
                'Birth date and derived birth full name are sufficient for the deterministic numerology MVP.',
                'Name-based calculations use birthFullName derived from birthGivenNames and birthSurname.',
                profile.input.birthTime ? 'Birth time is preserved but not used by numerology.' : 'Birth time is unknown; future astrology layers should reduce precision until resolved.',
            ],
        },
        traceabilityMetadata: {
            evidenceIds: [evidence.evidenceId],
            generatedAt,
        },
        safetyMetadata: {
            interpretationRestrictions: [
                'Do not describe numerology numbers as destiny or fixed identity.',
                'Use trait contributions as symbolic tendencies only.',
                'Do not infer medical or psychological diagnoses.',
            ],
            textIsPresentationOnly: true,
        },
    };
}
export function buildNumerologyEvidence(profile, output) {
    return output.symbolicMeaningClusters.map((cluster) => evidenceForLifePath(profile, output.rawOutput.lifePathNumber, cluster, output.traitContributions, output.traceabilityMetadata.generatedAt));
}
function clusterForLifePath(number) {
    const keywordsByNumber = {
        1: ['autonomy', 'initiative', 'self-direction'],
        2: ['cooperation', 'attunement', 'harmony'],
        3: ['expression', 'creativity', 'communication'],
        4: ['structure', 'stability', 'discipline'],
        5: ['adaptability', 'movement', 'experiential learning'],
        6: ['care', 'responsibility', 'relational steadiness'],
        7: ['inquiry', 'analysis', 'meaning'],
        8: ['execution', 'strategy', 'organization'],
        9: ['collective perspective', 'emotional depth', 'integration'],
        11: ['symbolic sensitivity', 'vision', 'attunement'],
        22: ['large-scale structure', 'stewardship', 'implementation'],
        33: ['compassionate service', 'care', 'teaching'],
    };
    return {
        clusterId: `life-path-${number}-cluster`,
        label: `Life Path ${number} symbolic cluster`,
        sourceSymbol: `Life Path ${number}`,
        keywords: keywordsByNumber[number] ?? ['symbolic tendency'],
        rulesetVersion: VERSIONS.rulesetVersions.traitMapping,
    };
}
function traitsForLifePath(number, cluster, confidence) {
    return (LIFE_PATH_TRAITS[number] ?? LIFE_PATH_TRAITS[reduceNumber(number, 'keep-masters').result] ?? []).map((trait, index) => ({
        ...trait,
        sourceSymbol: cluster.sourceSymbol,
        symbolicMeaningCluster: cluster.clusterId,
        confidence,
        evidence: {
            engineId: 'numerology-mvp',
            rulesetVersion: VERSIONS.rulesetVersions.traitMapping,
            mappingRuleId: `life-path-${number}-trait-${index + 1}`,
        },
    }));
}
function evidenceForLifePath(profile, lifePath, cluster, traits, generatedAt) {
    return {
        evidenceId: `ev-${profile.profileId}-life-path-${lifePath.finalNumber}`,
        sourceEngine: 'numerology-mvp',
        sourceSymbol: cluster.sourceSymbol,
        symbolicMeaning: cluster.label,
        traitContributions: traits.map((trait) => trait.traitId),
        weight: Number((traits.reduce((sum, trait) => sum + trait.weight, 0) / Math.max(traits.length, 1)).toFixed(2)),
        reinforcements: traits.map((trait) => trait.traitLabel),
        contradictions: [],
        timingContext: {
            generatedAt,
            personalYearSource: 'birth month + birth day + calendar year of the local civil date, parts and sum reduced to 1-9',
            personalMonthSource: 'personal year + calendar month of the local civil date, reduced to 1-9',
            personalDaySource: 'personal month + day of month of the local civil date, reduced to 1-9',
            pinnacleSource: 'birth month, birth day and birth year, each reduced to a single digit or a master number',
            challengeSource: 'absolute differences between the birth month, day and year reduced to single digits (masters reduced)',
            namePatternSource: 'mapped birth name values and initials',
        },
        confidence: profile.input.uncertainty.inputConfidence,
        calculationMetadata: {
            engineVersion: VERSIONS.engineVersions.numerology,
            rulesetVersion: VERSIONS.rulesetVersions.numerology,
            inputReference: profile.profileId,
            calculationSteps: lifePath.reductionSteps,
        },
        translationReferences: ['presentation-copy-v0.1.0:safe-symbolic-language'],
    };
}
