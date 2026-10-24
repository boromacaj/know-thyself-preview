import { normalizeName } from '../../core/numerology.js';
import { letterRole, nameUnits, normalizeNameLetters, PYTHAGOREAN_VALUES } from '../../core/numerologyMethodology.js';
import { VERSIONS } from '../../core/versions.js';
import { findNumerologyReference, numerologyReferenceTopic } from '../reference/numerologyReference.js';
const SOURCE_REFERENCE = 'frontend-app/src/core/numerology.ts';
function numberCalcExport(key, calc, methodologyRef, sourcePath) {
    return {
        key,
        label: calc.label,
        sourceInput: calc.rawInput,
        normalizedInput: calc.normalizedInput,
        rawComponents: calc.componentValues,
        intermediateSum: Number(calc.reductionSteps[0] ?? calc.finalNumber),
        reductionSequence: calc.reductionSteps,
        finalValue: calc.finalNumber,
        masterNumberPreserved: calc.preservedMasterNumber,
        evidenceType: 'calculated',
        methodologyRef,
        sourcePath,
    };
}
function patternCalcExport(key, calc, methodologyRef, sourcePath) {
    return {
        key,
        label: calc.label,
        sourceInput: calc.rawInput,
        normalizedInput: calc.normalizedInput,
        componentValues: calc.componentValues,
        presentValues: calc.presentValues ?? null,
        missingValues: calc.missingValues ?? null,
        valueCounts: calc.valueCounts ?? null,
        finalValues: calc.finalValues,
        note: calc.note ?? null,
        evidenceType: 'calculated',
        methodologyRef,
        sourcePath,
    };
}
/*
 * One row per calculation letter, classified exactly as the engine classifies it:
 * name unit by name unit (whitespace and hyphens separate units), with the
 * positional Y rule reading the letter's neighbours inside its own unit. A
 * character that folds to two letters (Æ -> AE) gives two rows; one that folds
 * to none (an apostrophe) is listed as excluded.
 */
function buildNameTraceability(profile) {
    const fullBirthName = profile.identity.birthFullName;
    const normalizedFullName = profile.identity.normalizedBirthFullName;
    const letters = [];
    let vowelSubtotal = 0;
    let consonantSubtotal = 0;
    for (const unit of nameUnits(profile.identity.birthGivenNames, profile.identity.birthSurname)) {
        let index = 0;
        for (const character of unit.raw) {
            const folded = normalizeNameLetters(character);
            if (!folded) {
                letters.push({ namePart: unit.raw, rawWord: unit.raw, character, normalizedCharacter: null, assignedValue: null, classification: 'excluded' });
                continue;
            }
            for (const normalizedCharacter of folded) {
                const assignedValue = PYTHAGOREAN_VALUES[normalizedCharacter] ?? null;
                const classification = letterRole(unit.letters, index);
                index += 1;
                if (assignedValue === null)
                    continue;
                if (classification === 'vowel')
                    vowelSubtotal += assignedValue;
                else
                    consonantSubtotal += assignedValue;
                letters.push({ namePart: unit.raw, rawWord: unit.raw, character, normalizedCharacter, assignedValue, classification });
            }
        }
    }
    return {
        fullBirthName,
        normalizedFullName,
        letters,
        vowelSubtotal,
        consonantSubtotal,
        fullNameSubtotal: vowelSubtotal + consonantSubtotal,
    };
}
function referenceEntry(metric, calc) {
    const entry = findNumerologyReference(numerologyReferenceTopic(metric, calc.finalNumber));
    if (!entry)
        return null;
    return {
        number: calc.finalNumber,
        metric,
        title: entry.title,
        overview: entry.overview,
        strengths: entry.strengths,
        shadow: entry.shadow,
        integration: entry.integration,
        evidenceType: 'reference-lookup',
        source: 'frontend-app/src/app/reference/numerologyReference.ts',
    };
}
export function buildNumerologyExport(experience) {
    const profile = experience.coreResult.profile;
    const raw = experience.coreResult.numerologyOutput.rawOutput;
    const methodology = {
        system: 'Pythagorean numerology (letter-to-digit mapping with digit-sum reduction)',
        letterMapping: { ...PYTHAGOREAN_VALUES },
        normalizationRule: 'Unicode NFD decomposition, every combining mark removed, a locale-independent uppercase, then a fixed transliteration for Latin letters without a decomposition (Æ AE, Œ OE, Ø O, Ł L, Đ and Ð D, Þ TH, ß SS, Ħ H, Ŧ T, Ŀ L). Whitespace and hyphens separate name units; apostrophes do not. Y is a vowel when neither neighbour in its name unit is A, E, I, O or U, otherwise a consonant; W is always a consonant.',
        diacriticRule: 'Combining marks are removed after NFD decomposition, so an accented Latin letter counts as its base letter (e.g. "č" -> "C", "ý" -> "Y").',
        unsupportedCharacterHandling: 'Any character still outside A-Z after normalization (digits, punctuation, non-Latin scripts) contributes no value; non-Latin scripts are not transliterated.',
        reductionRule: 'Digit-sum reduction. Name numbers are reduced name by name: each name unit to a single digit or master, then the unit results added and reduced again. The Life Path adds the birth month, day and year, each reduced to a single digit or master. Karmic debt (13, 14, 16, 19) is read from each core position\'s own reduction chain.',
        masterNumberHandling: 'Master numbers 11, 22 and 33 are kept in the Life Path, Birth Day, Expression, Soul Urge, Personality, Maturity and Pinnacles, and in the parts they add. They are reduced in the parts of the Challenges (so a Challenge is 0-8), the Balance, the Attitude and every personal cycle.',
        personalCycleRule: 'Personal Year = birth month + birth day + calendar year; Personal Month = Personal Year + calendar month; Personal Day = Personal Month + day of month; every part and sum reduced to 1-9, masters included. Read on the local civil date; the Personal Year turns on 1 January. The Forecast uses the same calculation.',
        engineVersion: VERSIONS.engineVersions.numerology,
        rulesetVersion: VERSIONS.rulesetVersions.numerology,
        schemaVersion: VERSIONS.schemaVersion,
    };
    const coreNumbers = [
        numberCalcExport('lifePath', raw.lifePathNumber, methodology.reductionRule, 'rawOutput.lifePathNumber'),
        numberCalcExport('birthDay', raw.birthDayNumber, methodology.reductionRule, 'rawOutput.birthDayNumber'),
        numberCalcExport('expression', raw.expressionNumber, methodology.reductionRule, 'rawOutput.expressionNumber'),
        numberCalcExport('soulUrge', raw.soulUrgeNumber, methodology.reductionRule, 'rawOutput.soulUrgeNumber'),
        numberCalcExport('personality', raw.personalityNumber, methodology.reductionRule, 'rawOutput.personalityNumber'),
        numberCalcExport('balance', raw.balanceNumber, methodology.reductionRule, 'rawOutput.balanceNumber'),
        numberCalcExport('maturity', raw.maturityNumber, methodology.reductionRule, 'rawOutput.maturityNumber'),
    ];
    const pinnacles = [
        numberCalcExport('pinnacle1', raw.pinnacleNumbers.first, methodology.reductionRule, 'rawOutput.pinnacleNumbers.first'),
        numberCalcExport('pinnacle2', raw.pinnacleNumbers.second, methodology.reductionRule, 'rawOutput.pinnacleNumbers.second'),
        numberCalcExport('pinnacle3', raw.pinnacleNumbers.third, methodology.reductionRule, 'rawOutput.pinnacleNumbers.third'),
        numberCalcExport('pinnacle4', raw.pinnacleNumbers.fourth, methodology.reductionRule, 'rawOutput.pinnacleNumbers.fourth'),
    ];
    const challenges = [
        numberCalcExport('challenge1', raw.challengeNumbers.first, 'Absolute difference between reduced date parts (never master-number preserved).', 'rawOutput.challengeNumbers.first'),
        numberCalcExport('challenge2', raw.challengeNumbers.second, 'Absolute difference between reduced date parts (never master-number preserved).', 'rawOutput.challengeNumbers.second'),
        numberCalcExport('challenge3', raw.challengeNumbers.third, 'Absolute difference between reduced date parts (never master-number preserved).', 'rawOutput.challengeNumbers.third'),
        numberCalcExport('challenge4', raw.challengeNumbers.fourth, 'Absolute difference between reduced date parts (never master-number preserved).', 'rawOutput.challengeNumbers.fourth'),
    ];
    const cycles = {
        personalYear: numberCalcExport('personalYear', raw.personalYearNumber, methodology.personalCycleRule, 'rawOutput.personalYearNumber'),
        personalMonth: numberCalcExport('personalMonth', raw.personalMonthNumber, methodology.personalCycleRule, 'rawOutput.personalMonthNumber'),
        personalDay: numberCalcExport('personalDay', raw.personalDayNumber, methodology.personalCycleRule, 'rawOutput.personalDayNumber'),
        cycleReferenceDate: profile.metadata.generatedAt,
        masterNumberHandlingNote: methodology.masterNumberHandling,
    };
    const referenceMeanings = [
        referenceEntry('life-path', raw.lifePathNumber),
        referenceEntry('expression', raw.expressionNumber),
        referenceEntry('soul-urge', raw.soulUrgeNumber),
        referenceEntry('personality', raw.personalityNumber),
        referenceEntry('birthday-number', raw.birthDayNumber),
        referenceEntry('balance-number', raw.balanceNumber),
        referenceEntry('maturity-number', raw.maturityNumber),
    ].filter((entry) => entry !== null);
    return {
        status: 'calculated',
        methodology,
        inputs: {
            givenNames: experience.input.givenNames,
            birthSurname: experience.input.birthSurname,
            normalizedGivenNames: normalizeName(experience.input.givenNames),
            normalizedBirthSurname: normalizeName(experience.input.birthSurname),
            fullNormalizedCalculationName: profile.identity.normalizedBirthFullName,
            birthDate: experience.input.birthDate,
            cycleReferenceDate: profile.metadata.generatedAt,
        },
        coreNumbers,
        quartets: { pinnacles, challenges },
        patterns: {
            karmicLessons: patternCalcExport('karmicLessons', raw.karmicLessons, 'Digits 1-9 absent from the mapped birth-name letter values.', 'rawOutput.karmicLessons'),
            hiddenPassion: patternCalcExport('hiddenPassion', raw.hiddenPassionNumbers, 'Most frequently occurring mapped value(s) in the birth-name letters.', 'rawOutput.hiddenPassionNumbers'),
        },
        nameTraceability: buildNameTraceability(profile),
        cycles,
        referenceMeanings,
        staticIllustrativeContent: [
            {
                label: 'Psychomatrix',
                note: 'A birth-date digit grid is not yet calculated by the local engine. The UI shows a representative 3x3 layout, not a live reading — never export this as calculated data.',
            },
            {
                label: 'Strengths / Growth Areas insight bullets',
                note: 'The pillar screen shows representative example bullets for Strengths and Growth Areas, not text derived from this profile\'s calculated numbers.',
            },
        ],
        warnings: [
            'Only Life Path currently drives symbolic trait contributions and evidence chains in the core synthesis pipeline; other core numbers are calculated but not yet trait-mapped.',
        ],
        unsupportedFields: [],
    };
}
