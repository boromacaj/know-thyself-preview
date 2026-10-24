import { createCorePrototype } from '../core/prototypePipeline.js';
import { BORIS_BENCHMARK_INPUT, BORIS_BENCHMARK_REFERENCES, BORIS_BENCHMARK_REPORT_DATE, BORIS_BENCHMARK_THEMES, BORIS_BENCHMARK_UNIFIED_PATTERN, benchmarkThemesForPillar, buildBorisBenchmarkPillars, } from './benchmark/borisBenchmark.js';
import { birthTimeAnswer, birthTimePrecisionOf } from './birthTimePrecision.js';
import { calculateAstrologyMvp } from './astrology/astrologyMvp.js';
import { ASPECT_ORB_CONFIG } from './astrology/aspectEngine.js';
import { buildChartModel } from './astrology/chartModel.js';
import { scheduleExtendedObjectWarmup } from './astrology/extendedWarmup.js';
import { HOUSE_SYSTEMS } from './astrology/houseSystems.js';
import { scanAstrologyTimeWindow } from './astrology/astrologyTimeWindow.js';
import { luckAgeText, scanBaziTimeWindow } from './bazi/baziTimeWindow.js';
import { calculateBaziLive } from './bazi/baziEngine.js';
import { BAZI_ELEMENTS } from './bazi/data/baziConstants.js';
import { calculateHumanDesignLive } from './human-design/humanDesignEngine.js';
import { humanDesignWindowFromEnvelope } from './human-design/humanDesignTimeWindow.js';
import { HD_NEEDS_TIME, scanHumanDesignEnvelope } from './human-design/humanDesignEnvelope.js';
import { synthesizeCrossPillar } from './synthesis/foundation/crossPillarSynthesis.js';
import { composeSynthesisReading } from './synthesis-reading/composeSynthesisReading.js';
import { unifiedPatternFromSynthesis } from './synthesis-reading/unifiedPatternFromSynthesis.js';
import { formatList, pillarLabel, slugify } from './format.js';
import { challengeMeaning, nameSignalMeaning, numberMeaning, patternMeaning, signalMeaning } from './numerologyMeanings.js';
import { composePortrait, portraitNumberFor, readingMinutesFor, reductionNoteFor, } from './interpretation/composePortrait.js';
const EMPTY_INPUT = {
    fullName: '',
    givenNames: '',
    birthSurname: '',
    birthDate: '',
    birthTime: '',
    birthPlaceText: '',
    birthLatitude: null,
    birthLongitude: null,
    birthLocationPrecision: 'text-only',
    birthLocationSource: 'user-input',
    resolvedPlaceLabel: null,
    birthCountry: null,
    birthRegion: null,
    birthLocationProvider: null,
    birthTimeZoneHint: null,
    birthTimeZoneHintSource: null,
    birthTimeZone: null,
    birthTimeZoneSource: null,
    birthTimeZoneConfidence: 'unavailable',
    birthTimeZoneLimitations: ['No birth location has been resolved.'],
};
const DOMAIN_LABELS = {
    agency: 'Independence / agency',
    relational: 'People / connection',
    expression: 'Communication / expression',
    structure: 'Stability / grounding',
    adaptability: 'Change / movement',
    care: 'Care / responsibility',
    reflection: 'Depth / investigation',
    execution: 'Focus / execution',
    collective: 'Community / perspective',
};
const HD_CENTER_LABELS = {
    head: 'Head',
    ajna: 'Ajna',
    throat: 'Throat',
    g: 'G / Identity',
    ego: 'Ego / Heart',
    solarPlexus: 'Solar Plexus',
    sacral: 'Sacral',
    spleen: 'Spleen',
    root: 'Root',
};
/**
 * The Energy Forecast pillar is experimental and additive: it renders a
 * precomputed prototype dataset, so it does not depend on the intake profile and
 * is reachable from the start. Its defaults point at the first date that has a
 * detailed record.
 */
export const ENERGY_FORECAST_DEFAULT_DATE = '2026-08-10';
export function createInitialEnergyForecastState() {
    return {
        status: 'idle',
        error: null,
        index: null,
        view: 'year',
        selectedDate: ENERGY_FORECAST_DEFAULT_DATE,
        selectedMonth: ENERGY_FORECAST_DEFAULT_DATE.slice(0, 7),
        constellationFocus: null,
    };
}
export function createInitialAppState() {
    return {
        stage: 'intake',
        unlockedStages: ['intake', 'energy-forecast'],
        experience: null,
        intakeDraft: { ...EMPTY_INPUT },
        locationSearchQuery: '',
        locationSearchFeedback: '',
        locationSearchResults: [],
        exportFeedback: null,
        energyForecast: createInitialEnergyForecastState(),
    };
}
export function createProfileExperience(rawInput, now = new Date()) {
    /* The birth time and its certainty, resolved once by the shared rule and then
       carried on the input every pillar, the synthesis and every screen read. An
       unknown time is empty here whatever the caller passed, so the engines take
       their noon fallback; an approximate one is calculated exactly as given and
       simply stays marked approximate. */
    const input = {
        ...rawInput,
        ...birthTimeAnswer(rawInput.birthTime, rawInput.birthTimePrecision),
    };
    const coreResult = createCorePrototype(toCoreInput(input), now);
    const numerologyThemes = mergeThemeSignals(themesFromTraits(coreResult.numerologyOutput.traitContributions));
    const astrology = calculateAstrologyMvp(input);
    const bazi = calculateBaziLive(astrology.moment, Boolean(input.birthTime.trim()), input.birthLongitude);
    const humanDesign = calculateHumanDesignLive(astrology.moment);
    /*
     * THE HUMAN DESIGN ENVELOPE (human-design/humanDesignEnvelope.ts), for an
     * estimate and for no time at all: every mechanic classified across the
     * shared window. An unknown time reads the mechanics that hold all day
     * instead of withholding the whole design; an estimate keeps its reading and
     * learns which mechanics move within two hours of it - the same certified
     * scan now answers both, where the estimate used to be sampled every fifteen
     * minutes. About 50 ms for an estimate, 300 ms for a whole day.
     */
    const humanDesignEnvelope = humanDesign.status === 'calculated'
        ? scanHumanDesignEnvelope(astrology.moment, birthTimePrecisionOf(input))
        : null;
    const humanDesignWindow = birthTimePrecisionOf(input) === 'approximate' && humanDesignEnvelope
        ? humanDesignWindowFromEnvelope(humanDesignEnvelope)
        : null;
    /*
     * For an estimate AND for no time at all: astrology reads every planet, so it
     * has to know which planets the day of birth actually fixes. Nothing natal
     * changes; see astrology/astrologyTimeWindow.ts.
     */
    const astrologyWindow = scanAstrologyTimeWindow(astrology, birthTimePrecisionOf(input), input.birthLatitude, input.birthLongitude);
    /* BaZi reads the same window: which Year/Month/Hour pillars and Luck Pillar
       start ages the birth could have had (bazi/baziTimeWindow.ts). */
    const baziWindow = bazi.status === 'calculated'
        ? scanBaziTimeWindow(astrology.moment, birthTimePrecisionOf(input), input.birthLongitude)
        : null;
    const pillars = buildPillars(coreResult, input, numerologyThemes, astrology, bazi, humanDesign, humanDesignWindow, astrologyWindow, baziWindow, humanDesignEnvelope);
    const themes = mergeThemeSignals(pillars.flatMap((pillar) => pillar.themeSignals));
    const repeatedThemes = themes.filter((theme) => uniquePillars(theme).length >= 2);
    /* CROSS-PILLAR SYNTHESIS.
       The suppression flags are the engines' own, passed through rather than
       re-derived here: astrology and Human Design fall back to a local-noon
       estimate when no birth time was supplied, and the synthesis has to weight
       everything that came through them accordingly. Re-computing the flags in
       this function would be a second source of truth that could drift. */
    const birthTimeEstimated = !input.birthTime.trim();
    const crossPillarReading = composeSynthesisReading(synthesizeCrossPillar({
        numerology: coreResult.numerologyOutput.rawOutput,
        astrology: astrology.status === 'calculated' ? astrology : null,
        bazi: bazi.status === 'calculated' ? bazi : null,
        humanDesign: humanDesign.status === 'calculated' ? humanDesign : null,
        mechanicsSuppressed: birthTimeEstimated,
        anglesSuppressed: birthTimeEstimated,
        birthTimeEstimated,
        birthTimePrecision: input.birthTimePrecision,
        astrologyWindow,
        baziWindow,
        humanDesignEnvelope,
    }));
    return {
        mode: 'live',
        input,
        coreResult,
        synthesisSource: {
            kind: 'calculated-engine-output',
            label: 'Calculated from available engine output',
            reference: 'frontend-app/src/app/model.ts',
            detail: astrology.status === 'calculated'
                ? bazi.status === 'calculated' && humanDesign.status === 'calculated'
                    ? 'Provisional synthesis from locally calculated Numerology, Western Astrology, BaZi / TCM, and Human Design evidence.'
                    : 'Provisional synthesis from the available locally calculated pillars; blocked layers retain visible source limitations.'
                : 'Provisional synthesis from the locally calculated Numerology pillar; birth-moment pillars remain blocked by visible source limitations.',
        },
        pillars,
        themes,
        repeatedThemes,
        unifiedPattern: unifiedPatternFromSynthesis(crossPillarReading, pillars.map((pillar) => pillar.id)),
        crossPillarReading,
    };
}
export function createBorisBenchmarkExperience() {
    const input = { ...BORIS_BENCHMARK_INPUT };
    const coreResult = createCorePrototype(toCoreInput(input), BORIS_BENCHMARK_REPORT_DATE);
    const numerology = buildNumerologyPillar(coreResult, benchmarkThemesForPillar('numerology'));
    numerology.summary = 'The benchmark Numerology values are calculated locally from the documented Boris input with report year 2026.';
    numerology.source = {
        kind: 'calculated-engine-output',
        label: 'Calculated engine output',
        reference: 'frontend-app/src/core/numerology.ts',
        detail: `Calculated locally from the benchmark input. Product interpretation target: ${BORIS_BENCHMARK_REFERENCES.numerology}.`,
    };
    numerology.limitations = [
        'Numerology values are calculated locally; cross-pillar theme labels follow the documented benchmark synthesis.',
        'The benchmark report date is fixed to 2026 so the Personal Year remains auditable against the source document.',
        ...numerology.limitations,
    ];
    const pillars = [numerology, ...buildBorisBenchmarkPillars()];
    return {
        mode: 'benchmark-demo',
        input,
        coreResult,
        synthesisSource: {
            kind: 'benchmark-source-data',
            label: 'Benchmark synthesis source data',
            reference: BORIS_BENCHMARK_REFERENCES.unified,
            detail: 'The cross-pillar themes and archetype reproduce the documented product benchmark synthesis.',
        },
        pillars,
        themes: BORIS_BENCHMARK_THEMES,
        repeatedThemes: BORIS_BENCHMARK_THEMES,
        unifiedPattern: BORIS_BENCHMARK_UNIFIED_PATTERN,
        /* The benchmark demo reproduces a documented synthesis rather than
           calculating one, so there is no composed reading behind it and saying so
           is better than composing one that would not match the document. */
        crossPillarReading: null,
    };
}
function toCoreInput(input) {
    const [birthGivenNames, birthSurname] = resolveBirthNameParts(input);
    const [birthYear = '', birthMonth = '', birthDay = ''] = input.birthDate.split('-');
    return {
        birthGivenNames,
        birthSurname,
        birthDay,
        birthMonth,
        birthYear,
        birthTime: input.birthTime,
        birthCountry: input.birthCountry ?? '',
        birthRegion: input.birthRegion ?? '',
        birthCity: '',
        birthPostalCode: '',
        birthplace: input.birthPlaceText,
        birthplacePostalCode: '',
        birthLocationDetail: '',
    };
}
function resolveBirthNameParts(input) {
    const givenNames = (input.givenNames ?? '').trim();
    const birthSurname = (input.birthSurname ?? '').trim();
    if (givenNames || birthSurname)
        return [givenNames, birthSurname];
    // Legacy fallback for callers that only supply a combined fullName (no given/surname split).
    return splitFullName(input.fullName ?? '');
}
function splitFullName(fullName) {
    const parts = fullName.trim().replace(/\s+/g, ' ').split(' ').filter(Boolean);
    if (parts.length <= 1)
        return [parts[0] ?? '', ''];
    return [parts.slice(0, -1).join(' '), parts.at(-1) ?? ''];
}
function themesFromTraits(traits) {
    return traits.map((trait) => ({
        id: slugify(trait.domain),
        label: DOMAIN_LABELS[trait.domain],
        plainMeaning: trait.context,
        evidence: [{
                pillarId: 'numerology',
                pillarLabel: 'Numerology',
                sourceSignal: `${trait.sourceSymbol}: ${trait.traitLabel}`,
                sourceKind: 'calculated-engine-output',
            }],
        strength: 'emerging',
    }));
}
function mergeThemeSignals(signals) {
    const grouped = new Map();
    for (const signal of signals) {
        const existing = grouped.get(signal.id);
        if (!existing) {
            grouped.set(signal.id, { ...signal, evidence: [...signal.evidence] });
            continue;
        }
        existing.evidence.push(...signal.evidence);
        const pillarCount = uniquePillars(existing).length;
        existing.strength = pillarCount >= 3 ? 'strong' : pillarCount >= 2 ? 'moderate' : 'emerging';
    }
    return [...grouped.values()].sort((left, right) => right.evidence.length - left.evidence.length);
}
function uniquePillars(theme) {
    return [...new Set(theme.evidence.map((item) => item.pillarId))];
}
function buildPillars(result, input, numerologyThemes, astrology, bazi, humanDesign, humanDesignWindow, astrologyWindow, baziWindow = null, humanDesignEnvelope = null) {
    return [
        buildNumerologyPillar(result, numerologyThemes),
        buildWesternAstrologyPillar(input, astrology, astrologyWindow),
        buildBaziPillar(bazi, birthTimePrecisionOf(input), baziWindow),
        buildHumanDesignPillar(input, humanDesign, humanDesignWindow, humanDesignEnvelope),
    ];
}
/**
 * The written portraits for the four core identity values.
 *
 * Each is the same authored material read through a different role lens, so a 7
 * Life Path and a 7 Soul Urge are genuinely different pieces of writing rather
 * than the same paragraphs under different headings - see
 * docs/interpretation/WRITING_STANDARD.md section 3.
 *
 * Ordered by how much of the person they claim to describe, so the reader meets
 * the widest reading first.
 */
function buildNumerologyPortraits(output) {
    const roles = [
        { role: 'lifePath', value: output.lifePathNumber.finalNumber },
        { role: 'expression', value: output.expressionNumber.finalNumber },
        { role: 'soulUrge', value: output.soulUrgeNumber.finalNumber },
        { role: 'personality', value: output.personalityNumber.finalNumber },
    ];
    return roles.map(({ role, value }) => {
        const reduced = portraitNumberFor(value);
        const portrait = composePortrait(role, value);
        const note = reductionNoteFor(value, reduced);
        return {
            roleLabel: portrait.roleLabel,
            value: reduced,
            displayValue: String(value),
            standfirst: portrait.standfirst,
            readingMinutes: readingMinutesFor(portrait),
            sections: portrait.sections,
            provenance: portrait.provenance,
            ...(note ? { reductionNote: note } : {}),
        };
    });
}
function buildNumerologyPillar(result, themes) {
    const output = result.numerologyOutput.rawOutput;
    const calculations = [
        output.lifePathNumber,
        output.birthDayNumber,
        output.expressionNumber,
        output.soulUrgeNumber,
        output.personalityNumber,
        output.balanceNumber,
        output.personalYearNumber,
        output.personalMonthNumber,
        output.personalDayNumber,
        output.maturityNumber,
        output.attitudeNumber,
        output.pinnacleNumbers.first,
        output.pinnacleNumbers.second,
        output.pinnacleNumbers.third,
        output.pinnacleNumbers.fourth,
        output.challengeNumbers.first,
        output.challengeNumbers.second,
        output.challengeNumbers.third,
        output.challengeNumbers.fourth,
    ];
    const karmicLessons = output.karmicLessons.finalValues;
    const hiddenPassions = output.hiddenPassionNumbers.finalValues;
    const karmicDebt = output.karmicDebtNumbers.finalValues;
    const pinnacles = [output.pinnacleNumbers.first, output.pinnacleNumbers.second, output.pinnacleNumbers.third, output.pinnacleNumbers.fourth];
    const challenges = [output.challengeNumbers.first, output.challengeNumbers.second, output.challengeNumbers.third, output.challengeNumbers.fourth];
    const spans = output.pinnacleAgeSpans;
    /* WHICH CHAPTER IS RUNNING NOW.
       The four Pinnacle spans are calendar-age windows, so identifying the current
       one needs an age. It is computed from the birth date against the engine's own
       generatedAt rather than against a fresh clock, so the same profile rendered
       twice produces the same chapter. The formulas are untouched - this only reads
       the spans the engine already produced. */
    const ageNow = ageInYears(result.profile.input.birthDate, result.numerologyOutput.traceabilityMetadata.generatedAt);
    const currentPinnacleIndex = ageNow === null
        ? -1
        : spans.findIndex((span) => ageNow >= span.startAge && (span.endAge === null || ageNow <= span.endAge));
    return {
        id: 'numerology',
        title: 'Numerology',
        eyebrow: 'Deterministic name and date structure',
        status: 'calculated',
        statusLabel: 'Calculated locally',
        source: {
            kind: 'calculated-engine-output',
            label: 'Calculated engine output',
            reference: 'frontend-app/src/core/numerology.ts',
            detail: 'Calculated locally from the entered birth name and date with traceable deterministic steps.',
        },
        portraits: buildNumerologyPortraits(output),
        numerologyChart: { raw: output, currentChapter: currentPinnacleIndex, age: ageNow },
        visual: 'number-orbit',
        summary: 'The active MVP pillar. Birth date and birth name are reduced through the repository ruleset with traceable steps.',
        keyOutputs: [
            keyOutput('Life Path', output.lifePathNumber.finalNumber, 'Birth-date structure', signalMeaning('lifePath', output.lifePathNumber.finalNumber)),
            keyOutput('Birth Day', birthDayPath(output.birthDayNumber), 'Day-of-month reduction', numberMeaning(output.birthDayNumber.finalNumber)),
            keyOutput('Expression', output.expressionNumber.finalNumber, 'Full-name expression', nameSignalMeaning('expression', output.expressionNumber.finalNumber)),
            keyOutput('Soul Urge', output.soulUrgeNumber.finalNumber, 'Vowel-based inner signal', nameSignalMeaning('soulUrge', output.soulUrgeNumber.finalNumber)),
            keyOutput('Personality', output.personalityNumber.finalNumber, 'Consonant-based outer signal', nameSignalMeaning('personality', output.personalityNumber.finalNumber)),
            keyOutput('Personal Year', output.personalYearNumber.finalNumber, 'Current calendar-year cycle', signalMeaning('personalYear', output.personalYearNumber.finalNumber)),
            keyOutput('Karmic Lessons', formatPattern(karmicLessons), 'Values absent from the normalized birth name', patternMeaning(karmicLessons)),
            keyOutput('Hidden Passion', formatPattern(hiddenPassions), 'Most frequent value or values in the birth name', patternMeaning(hiddenPassions)),
            keyOutput('Balance', output.balanceNumber.finalNumber, 'Initial-based response marker', numberMeaning(output.balanceNumber.finalNumber)),
            keyOutput('Maturity', output.maturityNumber.finalNumber, 'Life Path + Expression, mid-life synthesis', numberMeaning(output.maturityNumber.finalNumber)),
            keyOutput('Attitude', output.attitudeNumber.finalNumber, 'Birth month + birth day', numberMeaning(output.attitudeNumber.finalNumber)),
            keyOutput('Pinnacles', pinnacles.map((pinnacle) => pinnacle.finalNumber).join(' / '), spans.map(formatPinnacleSpan).join(', '), `Four life chapters built from the separately reduced month, day and year. ${pinnacles.map((pinnacle, index) => `${ordinalLabel(index)}: ${numberMeaning(pinnacle.finalNumber)}`).join(' ')}`),
            keyOutput('Challenges', challenges.map((challenge) => challenge.finalNumber).join(' / '), 'Absolute differences of the same date pairs', `Each challenge runs alongside the pinnacle of the same position. A challenge of 0 is a real result and means no single pressure dominates that chapter. ${challenges.map((challenge, index) => `${ordinalLabel(index)}: ${challengeMeaning(challenge.finalNumber)}`).join(' ')}`),
            keyOutput('Karmic Debt', formatPattern(karmicDebt), karmicDebt.length > 0 ? 'Found in a core position\'s own reduction' : 'No debt total in any core position\'s own reduction', output.karmicDebtNumbers.note ?? 'Totals of 13, 14, 16 or 19 appearing before a core number reduces.'),
            keyOutput('Current chapter', currentPinnacleIndex >= 0
                ? `${ordinalLabel(currentPinnacleIndex)} — Pinnacle ${pinnacles[currentPinnacleIndex].finalNumber} / Challenge ${challenges[currentPinnacleIndex].finalNumber}`
                : 'Unavailable', currentPinnacleIndex >= 0
                ? `${formatPinnacleSpan(spans[currentPinnacleIndex])}${ageNow === null ? '' : `, currently ${ageNow}`}`
                : 'Age could not be determined from the birth date', 'Which of the four Pinnacle age windows the current date falls inside. Read against the engine generation date, not a live clock, so the same profile always resolves to the same chapter.'),
            keyOutput('Personal Month', output.personalMonthNumber.finalNumber, 'Personal Year + current calendar month', numberMeaning(output.personalMonthNumber.finalNumber)),
            keyOutput('Personal Day', output.personalDayNumber.finalNumber, 'Personal Month + current day of the month', numberMeaning(output.personalDayNumber.finalNumber)),
        ],
        interpretation: result.synthesis.corePattern.presentation,
        relevance: {
            life: result.synthesis.developmentalDirection.presentation,
            work: result.synthesis.decisionMap.presentation,
            relationships: result.synthesis.relationalMap.presentation,
        },
        themeSignals: themes,
        technicalGroups: [
            ...calculations.map(calculationGroup),
            patternCalculationGroup(output.karmicLessons),
            patternCalculationGroup(output.hiddenPassionNumbers),
            patternCalculationGroup(output.karmicDebtNumbers),
            {
                title: 'Pinnacle age spans',
                facts: spans.map((span) => ({ label: span.label, value: formatPinnacleSpan(span) })),
            },
        ],
        limitations: [
            'Numerology is presented as symbolic reflection, not identity certainty.',
            'Current synthesis evidence comes from one calculated pillar only.',
            'The Pythagorean letter mapping is used. A Chaldean mapping assigns different letter values and would produce different name-based numbers.',
            /* These two sentences state the Challenge rule as the engine now applies
               it (docs/numerology/NUMEROLOGY_METHODOLOGY_CONTRACT.md). They replaced a
               pair that described the earlier engine, which kept master numbers in the
               Challenge parts and could return Challenges up to 21 - checkable, and no
               longer true. */
            'Master numbers 11, 22 and 33 are kept in the reduced birth month, day and year that build the Life Path and the Pinnacles. For the Challenges the same parts are reduced to single digits first.',
            'A Challenge is therefore a difference of two single digits and runs from 0 to 8; a Challenge of 0 is a real result.',
            'Pinnacle age spans are calendar-age windows, not predictions about what happens inside them.',
        ],
    };
}
function buildWesternAstrologyPillar(input, astrology, timeWindow = null) {
    const anglesSuppressed = !input.birthTime.trim();
    const precision = birthTimePrecisionOf(input);
    const westernAstrologyChart = {
        astrology,
        anglesSuppressed,
        timePrecision: precision,
        ...(timeWindow ? { timeWindow } : {}),
    };
    if (astrology.status === 'blocked' || !astrology.ephemeris) {
        return {
            ...unavailablePillar({
                id: 'western-astrology',
                title: 'Western Astrology',
                eyebrow: 'Astronomical chart structure',
                visual: 'chart-grid',
                summary: 'Live planet positions become available when date, selected location, timezone, and either supplied or estimated birth time produce a traceable birth moment.',
                requiredOutputs: ['Planets in signs', 'Degrees', 'Moon phase', 'Element balance', 'Modality balance', 'Major aspects', 'Ascendant', 'Midheaven', 'Whole-sign houses'],
                limitations: [
                    ...astrology.moment.limitations,
                    'Ascendant, Midheaven, and houses require resolved coordinates, timezone, and a normalized birth moment.',
                ],
                statusLabel: 'Calculation blocked',
                sourceLabel: 'Blocked before ephemeris calculation',
                sourceReference: 'frontend-app/src/app/astrology/timeNormalization.ts',
                sourceDetail: 'No Astrology output is generated until the birth moment can be normalized to UTC.',
                outputNote: 'Required birth moment source data is incomplete',
                technicalGroups: [{
                        title: 'Time normalization trace',
                        facts: astrology.moment.trace,
                    }],
            }),
            westernAstrologyChart,
        };
    }
    const { ephemeris } = astrology;
    /*
     * WITHOUT A BIRTH TIME, NOTHING THAT DEPENDS ON THE HOUR IS PUBLISHED.
     *
     * The engine still calculates the angles and houses from the 12:00 fallback,
     * because the architecture needs a deterministic moment. They used to be
     * published anyway: At a glance showed a noon Ascendant marked approximate,
     * and this appendix listed the Ascendant, the Midheaven, twelve house
     * placements, the chart ruler, the angular planets and the hemispheres - all
     * one disclosure below a limitation that said they were suppressed. Across a
     * whole day every sign rises, so the noon value is not approximate; it is
     * undetermined. Human Design already withholds its mechanics this way.
     *
     * What stays is what the date fixes: the planets, their signs, the dignities,
     * the aspects and the counts, each checked across the day by the reading's
     * time window. The houses therefore vanish here too - including a house
     * stellium - and the Ascendant, Midheaven, chart ruler, angular planets and
     * hemisphere rows say plainly that they are withheld and why.
     */
    const timeUnknown = anglesSuppressed;
    /* the model without Chiron and the asteroids: the minor aspects and the house systems are cheap, the extended objects are built only when they are looked at (lazyGroup below) */
    const advancedChart = buildChartModel(westernAstrologyChart, { extended: false });
    scheduleExtendedObjectWarmup(westernAstrologyChart.astrology.moment, !timeUnknown);
    /*
     * AN ESTIMATE SHOWS WHAT HOLDS ACROSS ITS WINDOW, AND NOTHING THE READING LEFT OUT.
     *
     * The reading reads an estimate through the time window: a rising sign that
     * changes within two hours of it is provisional - shown with the others it
     * could be - and the houses and chart ruler, which are counted from the
     * rising sign, are left out. This appendix used to list them anyway: twelve
     * house placements, a chart ruler and the hemispheres one disclosure below a
     * limitation that said they were left out. It now follows the same states:
     * the angles are shown as provisional values with their window, and what is
     * counted from a moving rising sign is withheld with the reason. When the
     * rising sign holds across the whole window, the houses hold with it and are
     * shown.
     */
    const estimate = precision === 'approximate';
    const risingSpans = estimate ? timeWindow?.ascendant ?? [] : [];
    const midheavenSpans = estimate ? timeWindow?.midheaven ?? [] : [];
    const risingMoves = risingSpans.length > 1;
    const angularMoves = estimate && Boolean(timeWindow?.angularChanges);
    const houses = timeUnknown || risingMoves ? null : astrology.houses;
    const angles = timeUnknown ? null : astrology.houses?.angles ?? null;
    const windowPhrase = (spans) => spans.map((span, index) => (index === 0 ? `${span.value} until about ${span.toLocal}`
        : index === spans.length - 1 ? `${span.value} from about ${span.fromLocal}`
            : `${span.value} from about ${span.fromLocal} to ${span.toLocal}`)).join(', ');
    const angleNote = (longitude, spans) => (!estimate ? `Ecliptic longitude ${formatDecimalDegrees(longitude)}`
        : spans.length > 1 ? `Provisional: at your estimated time. Within two hours of it: ${windowPhrase(spans)}`
            : `At your estimated time; the same sign across two hours either side. Ecliptic longitude ${formatDecimalDegrees(longitude)}`);
    const elementBalance = formatBalance(astrology.elementBalance);
    const modalityBalance = formatBalance(astrology.modalityBalance);
    /* THE ORB OF AN ASPECT IS A NATAL FACT ONLY FOR AN EXACT BIRTH TIME. For an unknown or an approximate one it is the orb at a reference instant, and the card, the technical row
       and the counts below say so; describeAspectUnderUncertainty holds the one rule. The exact-time text is the text it always was. */
    /* Minor and extended aspects are not scanned across the window, so no stability is claimed for them; for an estimate their orb is named as the orb at that estimate. */
    const atEstimatedTime = precision === 'approximate' ? ' (at your estimated time)' : '';
    const aspectCount = describeAspectCountUnderUncertainty(astrology.aspects, precision, timeWindow);
    const aspectOutputs = astrology.aspects.slice(0, 12).map((aspect) => {
        const text = describeAspectUnderUncertainty(aspect, precision, timeWindow);
        return {
            label: `Aspect: ${aspect.bodyA} ${aspect.aspect} ${aspect.bodyB}`,
            value: `${aspect.bodyA} ${aspect.aspect.toLowerCase()} ${aspect.bodyB}`,
            note: text.note,
            description: text.description,
        };
    });
    const angleRows = angles ? [
        {
            label: 'Ascendant',
            value: `${angles.ascendant.sign} ${formatZodiacDegree(angles.ascendant.degreeInSign)}`,
            note: angleNote(angles.ascendant.longitude, risingSpans),
            description: 'Calculated rising degree from UTC birth moment, latitude, longitude, and obliquity. Time-sensitive.',
        },
        {
            label: 'Midheaven',
            value: `${angles.midheaven.sign} ${formatZodiacDegree(angles.midheaven.degreeInSign)}`,
            note: angleNote(angles.midheaven.longitude, midheavenSpans),
            description: 'Calculated meridian angle from local sidereal time. Time-sensitive.',
        },
    ] : [];
    const angleOutputs = houses ? [
        ...angleRows,
        {
            label: 'House system',
            value: houses.system,
            note: 'Whole-sign house system v1',
            description: 'The Ascendant sign becomes the 1st house; subsequent signs become houses 2–12.',
        },
        ...houses.planetHouses.map((placement) => ({
            label: `House placement: ${placement.body}`,
            value: `House ${placement.house}`,
            note: `${placement.sign} ${formatZodiacDegree(placement.degreeInSign)}`,
            description: `${placement.body} is placed in House ${placement.house} using Whole Sign Houses.`,
        })),
    ] : risingMoves ? [
        ...angleRows,
        keyOutput('House system', 'Whole Sign Houses', 'Not applied: the rising sign changes near your estimated time', ASTRO_ESTIMATE_HOUSES_NOTE),
    ] : timeUnknown ? [
        keyOutput('Ascendant', ASTRO_WITHHELD, 'Requires a birth time', ASTRO_WITHHELD_NOTE),
        keyOutput('Midheaven', ASTRO_WITHHELD, 'Requires a birth time', ASTRO_WITHHELD_NOTE),
        keyOutput('House system', 'Whole Sign Houses', 'Not applied without a birth time', 'Whole Sign houses are counted from the rising sign, which needs a birth time, so no house is assigned here.'),
    ] : [{
            label: 'House system',
            value: 'Unavailable',
            note: 'Missing angle/house result',
            description: 'Angles and houses require coordinates and normalized birth moment.',
        }];
    const nodeOutputs = ephemeris.points.map((point) => ({
        label: point.body,
        value: `${point.sign} ${formatZodiacDegree(point.degreeInSign)}`,
        note: `Raw longitude ${formatDecimalDegrees(point.longitude)} / ${point.motionState}`,
        description: point.method,
    }));
    const retrogradeOutput = {
        label: 'Retrograde planets',
        value: astrology.retrogradeBodies.length > 0 ? astrology.retrogradeBodies.join(', ') : 'None',
        note: `${astrology.retrogradeBodies.length} of ${ephemeris.positions.length} calculated bodies`,
        description: 'Retrograde/direct/stationary is derived from real apparent-longitude motion (central-difference sample), not a static table.',
    };
    const chartRulerOutput = timeUnknown
        ? keyOutput('Chart ruler', ASTRO_WITHHELD, 'Requires the Ascendant', ASTRO_WITHHELD_NOTE)
        : risingMoves ? keyOutput('Chart ruler', ASTRO_WITHHELD_ESTIMATE, 'Requires a rising sign that holds near your estimated time', ASTRO_ESTIMATE_HOUSES_NOTE)
            : astrology.chartRuler ? {
                label: 'Chart ruler',
                value: astrology.chartRuler.body,
                note: `${astrology.chartRuler.sign} ${formatZodiacDegree(astrology.chartRuler.degreeInSign)}${astrology.chartRuler.house ? ` / House ${astrology.chartRuler.house}` : ''}`,
                description: 'Modern rulership convention: the ruling body of the calculated Ascendant sign.',
            } : {
                label: 'Chart ruler',
                value: 'Unavailable',
                note: 'Requires calculated Ascendant',
                description: 'The chart ruler is derived from the Ascendant sign and is unavailable without houses.',
            };
    const emphasis = astrology.emphasis;
    /* A house stellium is a statement about houses, so it goes with them. */
    const stelliums = (emphasis?.stelliums ?? []).filter((stellium) => houses !== null || stellium.kind === 'sign');
    /* Every planet that is not peregrine is listed, with its condition; but only domicile and exaltation are dignities. Detriment and fall are the opposite, and the count says which it counts. */
    const dignifiedPlanets = emphasis ? emphasis.dignities.filter((entry) => entry.dignity !== 'Peregrine') : [];
    const inDignity = dignifiedPlanets.filter((entry) => entry.dignity === 'Domicile' || entry.dignity === 'Exaltation').length;
    const inDebility = dignifiedPlanets.filter((entry) => entry.dignity === 'Detriment' || entry.dignity === 'Fall').length;
    const dignityOutput = emphasis ? {
        label: 'Essential dignity',
        value: dignifiedPlanets.length > 0
            ? dignifiedPlanets.map((entry) => `${entry.body} ${entry.dignity}`).join(', ')
            : 'All classical planets peregrine',
        note: `${inDignity} of ${emphasis.dignities.length} classical planet(s) in domicile or exaltation${inDebility > 0 ? `, ${inDebility} in detriment or fall` : ''}`,
        description: `Traditional rulership only: domicile +5, exaltation +4, fall -4, detriment -5. ${emphasis.bodiesOutsideDignityScheme.length > 0 ? `${emphasis.bodiesOutsideDignityScheme.join(', ')} sit outside the traditional scheme and are not scored.` : ''}`.trim(),
    } : {
        label: 'Essential dignity',
        value: 'Unavailable',
        note: 'Requires calculated planetary positions',
        description: 'Essential dignity is derived from the sign each classical planet occupies.',
    };
    const stelliumOutput = emphasis ? {
        label: 'Stelliums',
        value: stelliums.length > 0
            ? stelliums.map((stellium) => `${stellium.label} (${stellium.bodies.length})`).join(', ')
            : 'None',
        note: stelliums.length > 0
            ? stelliums.map((stellium) => `${stellium.label}: ${stellium.bodies.join(', ')}`).join(' | ')
            : 'No sign or house holds three or more bodies',
        description: 'Three or more bodies in one sign or house. Some authors require four, so the member count is shown rather than only the label.',
    } : {
        label: 'Stelliums',
        value: 'Unavailable',
        note: 'Requires calculated planetary positions',
        description: 'A stellium is a concentration of bodies in a single sign or house.',
    };
    const angularOutput = angularMoves
        ? keyOutput('Angular planets', ASTRO_WITHHELD_ESTIMATE, 'Changes within two hours of your estimated time', ASTRO_ESTIMATE_ANGULAR_NOTE)
        : emphasis && angles && !timeUnknown ? {
            label: 'Angular planets',
            value: emphasis.angularPlanets.length > 0
                ? emphasis.angularPlanets.map((entry) => `${entry.body} on ${entry.angle}`).join(', ')
                : 'None within orb',
            note: emphasis.angularPlanets.length > 0
                ? emphasis.angularPlanets.map((entry) => `${entry.body} ${formatDecimalDegrees(entry.orbDegrees, 2)} from ${entry.angle}`).join(' | ')
                : 'No body within 5 degrees of an angle',
            description: 'Bodies conjunct the Ascendant, Descendant, Midheaven or Imum Coeli within a 5 degree orb. Wider orbs are used by some authors.',
        } : timeUnknown ? keyOutput('Angular planets', ASTRO_WITHHELD, 'Requires the Ascendant and Midheaven', ASTRO_WITHHELD_NOTE) : {
            label: 'Angular planets',
            value: 'Unavailable',
            note: 'Requires calculated Ascendant and Midheaven',
            description: 'Angular emphasis is measured against the chart angles and is unavailable without a birth time and houses.',
        };
    const hemisphereOutput = timeUnknown
        ? keyOutput('Hemisphere balance', ASTRO_WITHHELD, 'Requires the houses', ASTRO_WITHHELD_NOTE)
        : risingMoves ? keyOutput('Hemisphere balance', ASTRO_WITHHELD_ESTIMATE, 'Requires the houses', ASTRO_ESTIMATE_HOUSES_NOTE)
            : astrology.hemisphereBalance ? {
                label: 'Hemisphere balance',
                value: `East ${astrology.hemisphereBalance.eastern} / West ${astrology.hemisphereBalance.western} / North ${astrology.hemisphereBalance.northern} / South ${astrology.hemisphereBalance.southern}`,
                note: 'Ten calculated body positions by Whole Sign house',
                description: 'Eastern = houses 1,2,3,10,11,12 (near Ascendant). Western = houses 4-9 (near Descendant). Southern = houses 7-12 (above horizon, MC side). Northern = houses 1-6 (below horizon, IC side).',
            } : {
                label: 'Hemisphere balance',
                value: 'Unavailable',
                note: 'Requires calculated houses',
                description: 'Hemisphere balance is derived from Whole Sign house placement and is unavailable without houses.',
            };
    return {
        id: 'western-astrology',
        title: 'Western Astrology',
        eyebrow: 'Calculated from resolved birth moment',
        status: 'calculated',
        statusLabel: 'Calculated locally',
        source: {
            kind: 'calculated-engine-output',
            label: 'Calculated engine output',
            reference: 'frontend-app/src/app/astrology/ephemerisEngine.ts + aspectEngine.ts + angleHouseEngine.ts',
            detail: `${ephemeris.engine}; ${ephemeris.frame}. Planets, major aspects, Ascendant, Midheaven, and Whole Sign Houses are derived locally. No external ephemeris API is used.`,
        },
        visual: 'chart-grid',
        summary: 'Tropical geocentric longitudes are calculated locally for ten bodies, then expanded into signs, elements, modalities, major aspects, Ascendant, Midheaven, and Whole Sign Houses.',
        keyOutputs: [
            ...ephemeris.positions.map((planet) => ({
                label: planet.body,
                value: `${planet.sign} ${formatZodiacDegree(planet.degreeInSign)}`,
                note: `Raw longitude ${formatDecimalDegrees(planet.longitude)}`,
                description: `${planet.element} element / ${planet.modality} modality / ${planet.motionState}`,
            })),
            ...nodeOutputs,
            ...angleOutputs,
            chartRulerOutput,
            {
                label: 'Moon phase',
                value: ephemeris.moonPhase.name,
                note: `${formatDecimalDegrees(ephemeris.moonPhase.angle, 2)} elongation`,
                description: `${ephemeris.moonPhase.illuminationPercent.toFixed(2)}% illuminated`,
            },
            {
                label: 'Major aspects',
                value: String(astrology.aspects.length),
                note: aspectCount.note,
                description: 'Conjunction, sextile, square, trine, and opposition are calculated from angular distance between planet longitudes (including North Node).',
            },
            ...aspectOutputs,
            retrogradeOutput,
            { label: 'Element balance', value: elementBalance, note: 'Ten calculated body positions' },
            { label: 'Modality balance', value: modalityBalance, note: 'Ten calculated body positions' },
            hemisphereOutput,
            dignityOutput,
            stelliumOutput,
            angularOutput,
        ],
        interpretation: 'This layer reports astronomical positions, major angular relationships, and a first house framework. Zodiac, aspect, and house categories provide symbolic comparison without claiming identity certainty.',
        relevance: {
            life: 'Sun, Moon, planetary signs, Ascendant, Midheaven, houses, and major aspects provide distinct symbolic categories for reflection.',
            work: houses ? `The calculated Midheaven is ${houses.angles.midheaven.sign}; this is a meridian angle, not a career prediction.` : `The strongest counted element is ${dominantKey(astrology.elementBalance)}; this is a chart distribution, not a capability score.`,
            relationships: `The Moon phase at birth is ${ephemeris.moonPhase.name}. Major aspects describe angular relationships between planets, not relationship prediction.`,
        },
        themeSignals: themesFromAstrology(astrology, timeUnknown, aspectCount.signal),
        technicalGroups: [
            /* The engine records only whether a time was supplied: an estimate prints
               `user-supplied`, which reads as exact, and no time prints
               `estimated-local-noon`, which calls an unknown time an estimate. The
               profile knows which it was, as the BaZi trace already says; the
               calculation is untouched. */
            {
                title: 'Normalized birth moment',
                facts: astrology.moment.trace.map((fact) => {
                    if (fact.label === 'Birth time precision' && precision !== 'exact') {
                        return { ...fact, value: ASTRO_PRECISION_TRACE[precision] };
                    }
                    if (fact.label === 'Effective birth time' && precision === 'unknown') {
                        return { ...fact, value: ASTRO_UNKNOWN_EFFECTIVE_TIME };
                    }
                    return fact;
                }),
            },
            {
                title: 'Planetary positions',
                facts: ephemeris.positions.map((planet) => ({
                    label: planet.body,
                    value: `${formatDecimalDegrees(planet.longitude, 6)} / ${planet.sign} ${formatZodiacDegree(planet.degreeInSign)}`,
                })),
            },
            {
                title: 'Essential dignity',
                facts: emphasis
                    ? [
                        ...emphasis.dignities.map((entry) => ({
                            label: entry.body,
                            value: `${entry.dignity} in ${entry.sign} (score ${entry.score}) - ${entry.note}`,
                        })),
                        ...emphasis.trace,
                    ]
                    : [{ label: 'Essential dignity', value: 'Unavailable.' }],
            },
            {
                title: 'Chart emphasis',
                facts: emphasis
                    ? [
                        ...(stelliums.length > 0
                            ? stelliums.map((stellium) => ({ label: `Stellium: ${stellium.label}`, value: stellium.bodies.join(', ') }))
                            : [{ label: 'Stelliums', value: 'None' }]),
                        ...(timeUnknown
                            ? [{ label: 'Angular planets', value: ASTRO_WITHHELD }]
                            : angularMoves ? [{ label: 'Angular planets', value: ASTRO_WITHHELD_ESTIMATE }]
                                : emphasis.angularPlanets.length > 0
                                    ? emphasis.angularPlanets.map((entry) => ({ label: `Angular: ${entry.body}`, value: `${entry.angle}, orb ${entry.orbDegrees} degrees` }))
                                    : [{ label: 'Angular planets', value: 'None within orb' }]),
                    ]
                    : [{ label: 'Chart emphasis', value: 'Unavailable.' }],
            },
            {
                title: 'Angles and Whole Sign Houses',
                facts: houses ? houses.trace
                    : timeUnknown ? [{ label: 'Angles and houses', value: ASTRO_WITHHELD }]
                        : risingMoves && angles ? [
                            { label: 'Ascendant', value: `${angles.ascendant.sign} ${formatZodiacDegree(angles.ascendant.degreeInSign)} (provisional: ${windowPhrase(risingSpans)})` },
                            { label: 'Midheaven', value: `${angles.midheaven.sign} ${formatZodiacDegree(angles.midheaven.degreeInSign)}${midheavenSpans.length > 1 ? ` (provisional: ${windowPhrase(midheavenSpans)})` : ' (the same sign across the window)'}` },
                            { label: 'Houses', value: ASTRO_WITHHELD_ESTIMATE },
                        ]
                            : [{ label: 'Angles and houses', value: 'Unavailable.' }],
            },
            {
                title: 'Major aspects',
                facts: astrology.aspects.length > 0
                    ? astrology.aspects.map((aspect) => ({
                        label: `${aspect.bodyA} ${aspect.aspect} ${aspect.bodyB}`,
                        value: describeAspectUnderUncertainty(aspect, precision, timeWindow).technical,
                    }))
                    : [{ label: 'Major aspects', value: 'None found within configured orb limits.' }],
            },
            {
                /* The ADVANCED CHART's aspects: calculated by the aspect engine from the same body longitudes as the major ones, with their own tighter orb limits, and drawn only when
                   the reader asks for them. The reading and the major-aspect counts above do not use them. */
                title: 'Minor aspects (Advanced chart)',
                facts: timeUnknown
                    ? [{ label: 'Minor aspects', value: ASTRO_WITHHELD }]
                    : [
                        {
                            label: 'Orb limits',
                            value: `Semisextile ${ASPECT_ORB_CONFIG.minor.Semisextile}° / Semisquare ${ASPECT_ORB_CONFIG.minor.Semisquare}° / Sesquiquadrate ${ASPECT_ORB_CONFIG.minor.Sesquiquadrate}° / Quincunx ${ASPECT_ORB_CONFIG.minor.Quincunx}° (the major aspects use ${ASPECT_ORB_CONFIG.major.luminary}° / ${ASPECT_ORB_CONFIG.major.personalOrSocial}° / ${ASPECT_ORB_CONFIG.major.outer}° by the bodies involved)`,
                        },
                        ...(advancedChart.aspects.some((aspect) => aspect.category === 'minor' && !aspect.involvesExtended)
                            ? advancedChart.aspects.filter((aspect) => aspect.category === 'minor' && !aspect.involvesExtended).map((aspect) => ({
                                label: `${aspect.bodyA} ${aspect.type} ${aspect.bodyB}`,
                                value: `Orb ${formatZodiacDegree(aspect.orb)} / angle ${formatDecimalDegrees(aspect.actualAngle, 6)} / exact ${aspect.exactAngle}° / max orb ${formatDecimalDegrees(aspect.maxOrb, 0)}${atEstimatedTime}`,
                            }))
                            : [{ label: 'Minor aspects', value: 'None found within the minor orb limits.' }]),
                    ],
            },
            {
                /* The house systems the Advanced chart can show. Whole Sign is the system of the reading and of every group above; the rest are listed so that no cusp the wheel
                   can draw is missing from the record, and each says how it was calculated. They never change the reading. */
                title: 'House systems (Advanced chart)',
                facts: timeUnknown ? [{ label: 'House systems', value: ASTRO_WITHHELD }]
                    : advancedChart.houseSystems.length === 0 ? [{ label: 'House systems', value: 'Unavailable.' }]
                        : [
                            { label: 'System of the reading', value: 'Whole Sign Houses. The reading and the groups above use it; the systems below are for exploring the chart wheel only.' },
                            ...advancedChart.houseSystems.flatMap((system) => [
                                { label: `${system.label} cusps`, value: system.cusps.map((cusp, index) => `${index + 1}: ${ZODIAC_ABBREVIATIONS[Math.floor(cusp / 30) % 12]} ${formatDecimalDegrees(cusp - Math.floor(cusp / 30) * 30, 2)}`).join(' / ') },
                                { label: `${system.label} method`, value: HOUSE_SYSTEMS[system.id].method },
                            ]),
                            ...advancedChart.capabilities.houseSystems.unavailable.map((entry) => ({ label: `${HOUSE_SYSTEMS[entry.id].label}`, value: `Unavailable: ${entry.reason}` })),
                        ],
            },
            /* Chiron and the asteroids of the Advanced chart: where each is, how it moves, which house it is in under every system, and where the numbers came from and how accurate they are.
               They are calculated by an optional provider, never by the canonical engine, and they never enter the reading. Calculated the first time the group is read (when the Astrology page
               is drawn), not when the profile is created. */
            lazyGroup('Chiron and asteroids (Advanced chart)', () => {
                const full = buildChartModel(westernAstrologyChart);
                if (timeUnknown)
                    return [{ label: 'Chiron and asteroids', value: ASTRO_WITHHELD }];
                if (!full.capabilities.extendedObjects.available)
                    return [{ label: 'Chiron and asteroids', value: full.capabilities.extendedObjects.reason ?? 'Unavailable.' }];
                const extendedAspects = full.aspects.filter((aspect) => aspect.involvesExtended);
                return [
                    ...full.bodies.filter((body) => body.kind === 'extended').flatMap((body) => {
                        const provenance = full.extendedProvenance.find((entry) => entry.id === body.id);
                        return [
                            { label: body.id, value: `${formatDecimalDegrees(body.longitude, 6)} / ${body.sign} ${formatZodiacDegree(body.degreeInSign)}` },
                            { label: `${body.id} motion`, value: `${body.motionState} (${body.speedDegreesPerDay.toFixed(6)} degrees/day)` },
                            { label: `${body.id} house`, value: full.houseSystems.map((system) => `${system.label} ${body.houses[system.id]}`).join(', ') },
                            { label: `${body.id} method`, value: 'JPL Horizons state vectors integrated locally (Gragg-Bulirsch-Stoer, the Sun and planets from astronomy-engine); nothing is fetched while the chart is drawn.' },
                            ...(provenance ? [{ label: `${body.id} accuracy`, value: provenance.accuracy }] : []),
                        ];
                    }),
                    { label: 'Aspects of Chiron and the asteroids', value: extendedAspects.length > 0 ? `${extendedAspects.length} within orb${atEstimatedTime}` : 'None of Chiron and the asteroids is in orb of another body.' },
                    ...extendedAspects.map((aspect) => ({
                        label: `${aspect.bodyA} ${aspect.type} ${aspect.bodyB}`,
                        value: `Orb ${formatZodiacDegree(aspect.orb)} / angle ${formatDecimalDegrees(aspect.actualAngle, 6)} / exact ${aspect.exactAngle}° / max orb ${formatDecimalDegrees(aspect.maxOrb, 0)}${atEstimatedTime}`,
                    })),
                ];
            }),
            {
                title: 'Distribution counts',
                facts: [
                    { label: 'Elements', value: elementBalance },
                    { label: 'Modalities', value: modalityBalance },
                    { label: 'Moon phase', value: `${ephemeris.moonPhase.name} / ${formatDecimalDegrees(ephemeris.moonPhase.angle, 6)}` },
                    { label: 'Major aspects', value: aspectCount.value },
                    { label: 'House system', value: timeUnknown ? ASTRO_WITHHELD : risingMoves ? ASTRO_WITHHELD_ESTIMATE : houses?.system ?? 'Unavailable' },
                    { label: 'Retrograde bodies', value: astrology.retrogradeBodies.join(', ') || 'None' },
                    { label: 'Chart ruler', value: timeUnknown ? ASTRO_WITHHELD : risingMoves ? ASTRO_WITHHELD_ESTIMATE : astrology.chartRuler ? `${astrology.chartRuler.body} / ${astrology.chartRuler.sign}` : 'Unavailable' },
                    { label: 'Hemisphere balance', value: timeUnknown ? ASTRO_WITHHELD : risingMoves ? ASTRO_WITHHELD_ESTIMATE : astrology.hemisphereBalance ? `E${astrology.hemisphereBalance.eastern}/W${astrology.hemisphereBalance.western}/N${astrology.hemisphereBalance.northern}/S${astrology.hemisphereBalance.southern}` : 'Unavailable' },
                ],
            },
            { title: 'Raw ephemeris trace', facts: ephemeris.trace },
        ],
        /*
         * THE BIRTH-TIME LIMITATION SAYS WHAT THIS CHART'S TIME ACTUALLY LEAVES OPEN.
         *
         * The node line used to append "the calculated Moon sign is close to a
         * boundary; treat it as approximate" whenever the Moon changed sign within
         * twelve hours - for every chart, an exact one included. An exact time
         * leaves the Moon nothing to be approximate about, so that caveat is gone;
         * an estimate and a missing time each get the one line that describes what
         * the reading's time window does with them.
         */
        limitations: [
            'Whole Sign Houses are the house system of the reading and of Technical details. Equal House, Porphyry and Placidus can be explored on the chart wheel (Advanced chart) and never change the reading; Placidus is not available beyond the polar circles. Other systems (Koch, Regiomontanus, Campanus and the like) are not implemented.',
            ASTRO_TIME_DEPENDENT_LIMITATION,
            ...(timeUnknown ? [ASTRO_UNKNOWN_TIME_LIMITATION]
                : birthTimePrecisionOf(input) === 'approximate' ? [ASTRO_APPROXIMATE_TIME_LIMITATION] : []),
            'North Node uses the true (osculating) node model; it can differ from the mean node by up to ~1.5 degrees, which can shift the node sign/house near a boundary. South Node is the exact +180 degree opposition.',
            'Chart ruler uses modern rulership (Pluto/Uranus/Neptune rule Scorpio/Aquarius/Pisces); traditional rulership is not mixed in.',
            'Minor aspects (semisextile, semisquare, sesquiquadrate, quincunx) are calculated for the Advanced chart with their own tighter orbs and are not used by the reading; other minor aspects (quintile, septile and the like) are not implemented. Chiron, Ceres, Pallas, Juno and Vesta are calculated for the Advanced chart for births from 1890 to 2110 and are not used by the reading; other asteroids are not implemented.',
            'Essential dignity uses the traditional seven-planet rulership scheme and scores only domicile, exaltation, detriment and fall. Triplicity, term and face need a chosen authority whose tables differ, so they are not scored. Uranus, Neptune and Pluto have no agreed traditional dignity and are left unscored rather than given a modern rulership the sources disagree on.',
            'The chart ruler above uses the modern rulership convention while essential dignity uses the traditional one. The two schemes disagree about Scorpio, Aquarius and Pisces, so the two outputs are deliberately labelled with the scheme each follows.',
            'Aspect patterns (T-square, Grand Trine, Yod), chart shape, and a dominant-planet score are not implemented; dominance in particular has no single agreed weighting across authors.',
            'Planet longitudes are geocentric; coordinates are used for local angles and houses.',
            'Astrology is presented as symbolic reflection, not predictive or identity certainty.',
        ],
        westernAstrologyChart,
    };
}
/** One sentence for every withheld astrology row, so the reason is the same wherever it is met. */
/*
 * The value an hour-dependent astrology fact carries when there is no birth
 * time. Its own string, not Human Design's bare 'Withheld': the Slovak engine
 * prose translates by exact match across every pillar, and this layer changes
 * only the astrology surface.
 */
/**
 * A technical group whose facts are worked out the first time they are read, then kept. Technical details are only drawn when the reader is on the page, so what is costly and optional
 * (Chiron and the asteroids) is not paid for when a profile is created.
 */
function lazyGroup(title, facts) {
    let cache = null;
    return { title, get facts() { cache ??= facts(); return cache; } };
}
const ASTRO_WITHHELD = 'Withheld (no birth time)';
const ZODIAC_ABBREVIATIONS = ['Ari', 'Tau', 'Gem', 'Can', 'Leo', 'Vir', 'Lib', 'Sco', 'Sag', 'Cap', 'Aqu', 'Pis'];
/* The same for an estimate whose rising sign changes within its window: the houses, the chart ruler and the hemispheres are counted from it. */
const ASTRO_WITHHELD_ESTIMATE = 'Withheld (estimated time)';
const ASTRO_ESTIMATE_HOUSES_NOTE = 'Your birth time is an estimate, and the rising sign changes within two hours of it. Whole Sign houses, the chart '
    + 'ruler and the hemispheres are all counted from the rising sign, so they are left out rather than read from one '
    + 'of its possible signs. A confirmed birth time resolves them.';
const ASTRO_ESTIMATE_ANGULAR_NOTE = 'Your birth time is an estimate, and which planets sit on an angle changes within two hours of it, so none is '
    + 'named. A confirmed birth time resolves it.';
/** What the astrology trace says about the birth time, by the profile's own precision. */
const ASTRO_PRECISION_TRACE = {
    approximate: 'approximate (your estimate, used as entered; checked two hours either side)',
    unknown: 'unknown (planets calculated for 12:00 local time as a neutral reference; signs checked across the whole day)',
};
const ASTRO_UNKNOWN_EFFECTIVE_TIME = 'Not supplied (12:00 local used as a neutral reference)';
const ASTRO_WITHHELD_NOTE = 'No birth time was supplied. The Ascendant, the Midheaven, the houses, the chart ruler and angular planets move '
    + 'within a single day, so this is withheld rather than read from the 12:00 local-noon reference the engine '
    + 'calculates with. Supplying a birth time resolves it.';
const ASTRO_UNKNOWN_TIME_LIMITATION = 'Birth time was not supplied. The planets are calculated for 12:00 local time only as a reference, and each '
    + 'planet\'s sign is checked across the whole day of birth: a planet that changes sign that day is read both ways, '
    + 'never as its noon value, and the Ascendant, Midheaven, houses, chart ruler, angular planets and hemisphere '
    + 'balance are withheld.';
/*
 * What depends on the hour, for every chart. It used to call the 12:00 local
 * reference an "estimate" - an unknown time is not an estimate, and an
 * estimate is the reader's own - and to say only what happens without a time.
 */
const ASTRO_TIME_DEPENDENT_LIMITATION = 'The Ascendant, Midheaven, houses, house placements and the Ascendant-derived chart ruler depend on the birth time. '
    + 'With an exact time they are read normally. With an estimate, an angle that changes within two hours of it is read '
    + 'as provisional, and the houses and chart ruler are left out unless the rising sign holds across that window. '
    + 'With no time they are withheld rather than read from the 12:00 local reference the engine calculates with.';
const ASTRO_APPROXIMATE_TIME_LIMITATION = 'Birth time is your own estimate. The chart is calculated for the time given and checked two hours either side of '
    + 'it: results that hold across that window are marked as resting on an estimate, and a rising sign that changes '
    + 'within it is read as provisional, with the chart ruler and houses left out.';
function themesFromAstrology(astrology, timeUnknown = false, aspectSignal = `${astrology.aspects.length} major aspects within configured orb limits`) {
    if (!astrology.ephemeris)
        return [];
    const dominantElement = dominantKey(astrology.elementBalance);
    const dominantModality = dominantKey(astrology.modalityBalance);
    const elementThemes = {
        Fire: { id: 'agency', label: DOMAIN_LABELS.agency, meaning: 'Fire has the largest count among the calculated planetary sign elements.' },
        Earth: { id: 'structure', label: DOMAIN_LABELS.structure, meaning: 'Earth has the largest count among the calculated planetary sign elements.' },
        Air: { id: 'relational', label: DOMAIN_LABELS.relational, meaning: 'Air has the largest count among the calculated planetary sign elements.' },
        Water: { id: 'reflection', label: DOMAIN_LABELS.reflection, meaning: 'Water has the largest count among the calculated planetary sign elements.' },
    };
    const modalityThemes = {
        Cardinal: { id: 'agency', label: DOMAIN_LABELS.agency, meaning: 'Cardinal has the largest count among the calculated planetary sign modalities.' },
        Fixed: { id: 'structure', label: DOMAIN_LABELS.structure, meaning: 'Fixed has the largest count among the calculated planetary sign modalities.' },
        Mutable: { id: 'adaptability', label: DOMAIN_LABELS.adaptability, meaning: 'Mutable has the largest count among the calculated planetary sign modalities.' },
    };
    const fromElement = elementThemes[dominantElement];
    const fromModality = modalityThemes[dominantModality];
    const signals = [
        {
            id: fromElement.id,
            label: fromElement.label,
            plainMeaning: fromElement.meaning,
            evidence: [{
                    pillarId: 'western-astrology',
                    pillarLabel: 'Western Astrology',
                    sourceSignal: `Dominant element count: ${dominantElement} ${astrology.elementBalance[dominantElement]}/10`,
                    sourceKind: 'calculated-engine-output',
                }],
            strength: 'emerging',
        },
        {
            id: fromModality.id,
            label: fromModality.label,
            plainMeaning: fromModality.meaning,
            evidence: [{
                    pillarId: 'western-astrology',
                    pillarLabel: 'Western Astrology',
                    sourceSignal: `Dominant modality count: ${dominantModality} ${astrology.modalityBalance[dominantModality]}/10`,
                    sourceKind: 'calculated-engine-output',
                }],
            strength: 'emerging',
        },
        {
            id: 'lunar-cycle',
            label: 'Lunar phase context',
            plainMeaning: 'The calculated Sun-Moon elongation places the birth moment within a named lunar phase.',
            evidence: [{
                    pillarId: 'western-astrology',
                    pillarLabel: 'Western Astrology',
                    sourceSignal: `${astrology.ephemeris.moonPhase.name}: ${formatDecimalDegrees(astrology.ephemeris.moonPhase.angle, 2)}`,
                    sourceKind: 'calculated-engine-output',
                }],
            strength: 'emerging',
        },
    ];
    if (astrology.aspects.length > 0) {
        signals.push({
            id: 'aspect-structure',
            label: 'Aspect structure',
            plainMeaning: 'Major angular relationships were detected between calculated planetary longitudes.',
            evidence: [{
                    pillarId: 'western-astrology',
                    pillarLabel: 'Western Astrology',
                    sourceSignal: aspectSignal,
                    sourceKind: 'calculated-engine-output',
                }],
            strength: 'emerging',
        });
    }
    /* A theme signal is a human-facing claim and obeys the same withholding as
       the key outputs: no birth time, no angles or houses to report. */
    if (astrology.houses && !timeUnknown) {
        signals.push({
            id: 'angle-house-structure',
            label: 'Angle and house structure',
            plainMeaning: 'Ascendant, Midheaven, and Whole Sign Houses were calculated from the resolved local birth context.',
            evidence: [{
                    pillarId: 'western-astrology',
                    pillarLabel: 'Western Astrology',
                    sourceSignal: `Ascendant ${astrology.houses.angles.ascendant.sign}; MC ${astrology.houses.angles.midheaven.sign}; ${astrology.houses.system}`,
                    sourceKind: 'calculated-engine-output',
                }],
            strength: 'emerging',
        });
    }
    return signals;
}
/** How the BaZi trace names each kind of birth time - approximate is never shown as exact. */
const BIRTH_TIME_PRECISION_TRACE = {
    exact: 'exact (as entered)',
    approximate: 'approximate (your estimate, used as entered)',
    unknown: 'unknown (12:00 local noon used only for the date boundaries)',
};
const APPROXIMATE_TIME_LIMITATION = 'Birth time is your own estimate: the Hour Pillar and everything read from it are approximate, and the reading marks them so.';
/** `Ding Si until about 11:45, Wu Wu from about 11:45 to 13:45, Ji Wei from about 13:45` for a pillar the window moves. */
function baziWindowPhrase(pillar) {
    return pillar.values.map((value, index) => (index === 0 ? `${value} until about ${pillar.changesAt[0]}`
        : index === pillar.values.length - 1 ? `${value} from about ${pillar.changesAt[index - 1]}`
            : `${value} from about ${pillar.changesAt[index - 1]} to ${pillar.changesAt[index]}`)).join(', ');
}
function buildBaziPillar(bazi, timePrecision, window = null) {
    if (bazi.status === 'blocked' || !bazi.yearPillar || !bazi.monthPillar || !bazi.dayPillar || !bazi.dayMaster) {
        return {
            ...unavailablePillar({
                id: 'bazi-tcm',
                title: 'BaZi / TCM',
                eyebrow: 'Four Pillars and Five Element structure',
                visual: 'four-pillars',
                summary: 'BaZi becomes available when the birth date, resolved timezone, and effective local birth moment can be mapped to solar terms and the sexagenary cycle.',
                requiredOutputs: ['Year pillar', 'Month pillar', 'Day pillar', 'Hour pillar', 'Five Elements', 'Day Master'],
                limitations: bazi.limitations,
                statusLabel: 'Calculation blocked',
                sourceLabel: 'Blocked before BaZi calculation',
                sourceReference: 'frontend-app/src/app/bazi/baziEngine.ts',
                sourceDetail: 'No BaZi output is generated until the local and UTC birth moment can be normalized.',
                outputNote: 'Required birth moment source data is incomplete',
                technicalGroups: [{ title: 'BaZi readiness trace', facts: bazi.trace }],
            }),
            baziChart: { bazi },
        };
    }
    const availablePillars = [bazi.yearPillar, bazi.monthPillar, bazi.dayPillar, ...(bazi.hourPillar ? [bazi.hourPillar] : [])];
    const stems = availablePillars.map((pillar) => `${pillar.stem.name} (${pillar.stem.character})`).join(' / ');
    const branches = availablePillars.map((pillar) => `${pillar.branch.name} (${pillar.branch.character})`).join(' / ');
    const elementCounts = BAZI_ELEMENTS.map((element) => `${element} ${bazi.elementCounts[element]}`).join(' / ');
    const polarityCounts = `Yin ${bazi.polarityCounts.Yin} / Yang ${bazi.polarityCounts.Yang}`;
    /*
     * WHAT THE WINDOW LEAVES OPEN (bazi/baziTimeWindow.ts). An estimate's hour
     * pillar is provisional when it changes within two hours of the estimate -
     * which, at two hours a branch, it nearly always does - and is shown with the
     * others it could be. Without a time the Year and Month pillars are checked
     * across the whole birth date, and the Luck Pillar start age is given to the
     * precision the day allows instead of the reference instant's six decimals.
     */
    const unknownTime = timePrecision === 'unknown';
    const hourMoves = timePrecision === 'approximate' && (window?.hour?.values.length ?? 0) > 1;
    const yearMoves = (window?.year.values.length ?? 0) > 1;
    const monthMoves = (window?.month.values.length ?? 0) > 1;
    const withWindow = (output, moves, pillar) => moves && pillar ? { ...output, note: `Changes during the birth date: ${baziWindowPhrase(pillar)}` } : output;
    const hourOutput = bazi.hourPillar
        ? hourMoves && window?.hour
            ? { ...baziPillarOutput('Hour pillar', bazi.hourPillar), note: `Provisional: at your estimated time. Within two hours of it: ${baziWindowPhrase(window.hour)}` }
            : baziPillarOutput('Hour pillar', bazi.hourPillar)
        : keyOutput('Hour pillar', 'Unavailable', 'Unknown birth time', 'No Hour Pillar is fabricated from the local-noon fallback.');
    const activeTerm = bazi.activeSolarTerm;
    const tenGodOutputs = [bazi.yearPillar, bazi.monthPillar, ...(bazi.hourPillar ? [bazi.hourPillar] : [])].map((pillar) => keyOutput(`${pillar.key} stem Ten God`, pillar.tenGod?.tenGod ?? 'Unavailable', pillar.tenGod?.category ?? '', `${pillar.stem.name} relative to Day Master ${bazi.dayMaster.name}: ${pillar.tenGod?.relation ?? 'n/a'}, ${pillar.tenGod?.samePolarity ? 'same' : 'different'} polarity.`));
    const hiddenStemOutputs = [bazi.yearPillar, bazi.monthPillar, bazi.dayPillar, ...(bazi.hourPillar ? [bazi.hourPillar] : [])].map((pillar) => keyOutput(`${pillar.key} branch hidden stems`, pillar.hiddenStems.map((h) => h.stem.name).join(' / '), `${pillar.hiddenStems.length} hidden stem(s)`, pillar.hiddenStemTenGods.map((entry) => `${entry.contribution.stem.name} (${entry.contribution.role}, ${entry.contribution.conventionalWeightPercent}%) -> ${entry.tenGod.tenGod}`).join('; ')));
    const dayMasterStrengthOutput = bazi.dayMasterStrength ? keyOutput('Day Master strength tendency', bazi.dayMasterStrength.tendency, `Support ${bazi.dayMasterStrength.supportScore} / Drain ${bazi.dayMasterStrength.drainScore} / confidence ${bazi.dayMasterStrength.confidence}`, bazi.dayMasterStrength.disclaimer) : null;
    const seasonalOutput = bazi.seasonalContext ? keyOutput('Seasonal context', `${bazi.dayMaster.element} is seasonally ${bazi.seasonalContext.dayMasterState}`, `Month ruled by ${bazi.seasonalContext.rulingPhase}`, 'Derived from the calculated Month Branch\'s Five Phase seasonal governance (旺相休囚死), a structural fact, not a strength verdict.') : null;
    const relationshipOutputs = bazi.relationships.map((relationship) => keyOutput(relationship.label, relationship.completeness, relationship.participants.map((p) => `${p.pillarKind}: ${p.value}`).join(' / '), relationship.description));
    /* A start age to the precision the window allows; an exact time keeps the engine's figure. */
    const startAge = (direction, offset = 0) => {
        const range = window?.luckStartAges[direction];
        if (range)
            return luckAgeText(range, offset);
        const age = bazi.luckPillars?.[direction]?.startAgeYears;
        return age === undefined ? '?' : `~${Number((age + offset).toFixed(6))}`;
    };
    const luckPillarOutput = bazi.luckPillars?.status === 'calculated' ? keyOutput('Luck Pillars (Da Yun)', `Start age ${startAge('forward')} (forward) / ${startAge('reverse')} (reverse)`, 'Both listed; the natal chart does not choose a direction', bazi.luckPillars.directionNote) : keyOutput('Luck Pillars (Da Yun)', 'Unavailable', bazi.luckPillars?.reasonSuppressed ?? 'Not calculated', 'Luck Pillars are suppressed rather than fabricated.');
    const tcmOutput = bazi.tcmConstitution ? keyOutput('TCM constitution (Day Master)', `${bazi.tcmConstitution.dayMasterPhase} / ${bazi.tcmConstitution.dayMasterCorrespondence.yinOrgan}-${bazi.tcmConstitution.dayMasterCorrespondence.yangOrgan}`, 'Traditional correspondence, non-diagnostic', bazi.tcmConstitution.disclaimer) : null;
    /* True solar time corrects a CLOCK time. Without one there is nothing to
       correct: the 12:00 reference's corrected time is not the reader's. */
    const trueSolarOutput = unknownTime && bazi.trueSolarTime
        ? keyOutput('True solar time', BAZI_NO_CLOCK_TIME, 'Needs a birth time', BAZI_NO_CLOCK_TIME_NOTE)
        : bazi.trueSolarTime ? keyOutput('True solar time', bazi.trueSolarTime.trueSolarLocalDateTime.replace('T', ' '), `${bazi.trueSolarTime.totalCorrectionMinutes} min total correction`, `Civil ${bazi.trueSolarTime.civilLocalDateTime.replace('T', ' ')} -> longitude/meridian ${bazi.trueSolarTime.longitudeMeridianCorrectionMinutes} min + Equation of Time ${bazi.trueSolarTime.equationOfTimeMinutes} min.`) : null;
    return {
        id: 'bazi-tcm',
        title: 'BaZi / TCM',
        eyebrow: 'Calculated Four Pillars and Five Element structure',
        status: 'calculated',
        statusLabel: 'Calculated locally',
        source: {
            kind: 'calculated-engine-output',
            label: 'Calculated engine output',
            reference: 'frontend-app/src/app/bazi/baziEngine.ts + data/baziConstants.ts',
            detail: `${bazi.engine}; ${bazi.frame}. Solar boundaries use the existing local astronomy engine and the sexagenary day uses an auditable Gregorian JDN formula. No external BaZi or calendar API is used.`,
        },
        visual: 'four-pillars',
        summary: 'The Year and Month Pillars are resolved from Li Chun and the 12 Jie solar boundaries. The Day Pillar follows the continuous sexagenary day cycle, and the Hour Pillar uses true solar time (civil time retained for comparison) when birth time is supplied.',
        keyOutputs: [
            withWindow(baziPillarOutput('Year pillar', bazi.yearPillar), yearMoves, window?.year),
            withWindow(baziPillarOutput('Month pillar', bazi.monthPillar), monthMoves, window?.month),
            baziPillarOutput('Day pillar', bazi.dayPillar),
            hourOutput,
            keyOutput('Day Master', `${bazi.dayMaster.name} ${bazi.dayMaster.element}`, `${bazi.dayMaster.polarity} ${bazi.dayMaster.element} / ${bazi.dayMaster.character}`, 'The Day Master is the Heavenly Stem of the calculated Day Pillar.'),
            keyOutput('Heavenly Stems', stems, `${availablePillars.length} visible stem(s)`, 'Year / Month / Day / Hour order; Hour is omitted when birth time is unknown.'),
            keyOutput('Earthly Branches', branches, `${availablePillars.length} visible branch(es)`, 'Year / Month / Day / Hour order; Hour is omitted when birth time is unknown.'),
            keyOutput('Five Elements (raw)', elementCounts, 'Visible stems + primary branch elements', 'Hidden-stem and seasonal layers are reported separately below, not merged into this count.'),
            keyOutput('Yin / Yang', polarityCounts, `${availablePillars.length * 2} visible character(s)`, 'Counts the polarity of each visible stem and branch.'),
            keyOutput('Active solar term', activeTerm ? `${activeTerm.name} (${activeTerm.character})` : 'Unavailable', activeTerm ? `${activeTerm.longitude}° / ${activeTerm.boundaryUtc}` : 'Boundary unavailable', 'The active Jie boundary selects the BaZi solar month.'),
            ...(trueSolarOutput ? [trueSolarOutput] : []),
            ...tenGodOutputs,
            ...hiddenStemOutputs,
            ...(seasonalOutput ? [seasonalOutput] : []),
            ...(dayMasterStrengthOutput ? [dayMasterStrengthOutput] : []),
            ...relationshipOutputs,
            luckPillarOutput,
            ...(tcmOutput ? [tcmOutput] : []),
        ],
        interpretation: 'This layer reports the mechanical BaZi structure first: solar-year boundary, seasonal month, continuous day cycle, local shichen, Day Master, Ten Gods, hidden stems, and a Five Phase distribution across raw, hidden, and seasonal layers. Symbolic interpretation remains separate from calculation.',
        relevance: {
            life: `${bazi.dayMaster.name} ${bazi.dayMaster.element} is the calculated Day Master category, not a fixed identity or prediction.`,
            work: `The visible-element count is ${elementCounts}; it is a structural snapshot, not a capability or health score.`,
            relationships: `${polarityCounts} describes the calculated visible-character balance without predicting compatibility.`,
        },
        themeSignals: themesFromBazi(bazi),
        technicalGroups: [
            {
                title: 'Four Pillars',
                facts: [
                    baziPillarFact(bazi.yearPillar),
                    baziPillarFact(bazi.monthPillar),
                    baziPillarFact(bazi.dayPillar),
                    bazi.hourPillar
                        ? hourMoves && window?.hour
                            ? { ...baziPillarFact(bazi.hourPillar), value: `${baziPillarFact(bazi.hourPillar).value} (provisional: ${baziWindowPhrase(window.hour)})` }
                            : baziPillarFact(bazi.hourPillar)
                        : { label: 'Hour pillar', value: 'Unavailable: birth time not supplied' },
                    { label: 'Day Master', value: `${bazi.dayMaster.name} ${bazi.dayMaster.element} / ${bazi.dayMaster.polarity}` },
                ],
            },
            {
                title: 'Five Element and polarity counts',
                facts: [
                    ...BAZI_ELEMENTS.map((element) => ({ label: element, value: String(bazi.elementCounts[element]) })),
                    { label: 'Yin', value: String(bazi.polarityCounts.Yin) },
                    { label: 'Yang', value: String(bazi.polarityCounts.Yang) },
                    { label: 'Counting rule', value: 'Visible stems and primary branch elements only; hidden stems excluded' },
                ],
            },
            {
                title: 'True solar time',
                facts: unknownTime && bazi.trueSolarTime ? [
                    /* The longitude correction belongs to the place, so it stands; the
                       rest corrects a clock time there is none of. */
                    { label: 'Civil clock time', value: BAZI_NO_CLOCK_TIME },
                    { label: 'True solar time', value: BAZI_NO_CLOCK_TIME },
                    { label: 'Longitude/meridian correction', value: `${bazi.trueSolarTime.longitudeMeridianCorrectionMinutes} minutes` },
                    { label: 'Civil-time Hour Pillar', value: 'Unavailable' },
                    { label: 'True-solar-time Hour Pillar', value: 'Unavailable' },
                ] : bazi.trueSolarTime ? [
                    { label: 'Civil clock time', value: bazi.trueSolarTime.civilLocalDateTime },
                    { label: 'True solar time', value: bazi.trueSolarTime.trueSolarLocalDateTime },
                    { label: 'Longitude/meridian correction', value: `${bazi.trueSolarTime.longitudeMeridianCorrectionMinutes} minutes` },
                    { label: 'Equation of Time', value: `${bazi.trueSolarTime.equationOfTimeMinutes} minutes` },
                    { label: 'Total correction', value: `${bazi.trueSolarTime.totalCorrectionMinutes} minutes` },
                    { label: 'Civil-time Hour Pillar', value: bazi.civilHourPillar?.label ?? 'Unavailable' },
                    { label: 'True-solar-time Hour Pillar', value: bazi.hourPillar?.label ?? 'Unavailable' },
                ] : [{ label: 'True solar time', value: 'Unavailable' }],
            },
            {
                title: 'Warnings',
                facts: bazi.warnings.length > 0
                    ? bazi.warnings.map((warning) => ({ label: warning.code, value: warning.message }))
                    : [{ label: 'Warnings', value: 'None' }],
            },
            {
                title: 'Day Master strength (model-derived)',
                facts: bazi.dayMasterStrength ? [
                    { label: 'Tendency', value: bazi.dayMasterStrength.tendency },
                    { label: 'Support score', value: String(bazi.dayMasterStrength.supportScore) },
                    { label: 'Drain score', value: String(bazi.dayMasterStrength.drainScore) },
                    { label: 'Model version', value: bazi.dayMasterStrength.modelVersion },
                    ...bazi.dayMasterStrength.factors,
                ] : [{ label: 'Day Master strength', value: 'Unavailable' }],
            },
            {
                title: 'Relationships',
                facts: bazi.relationships.length > 0
                    ? bazi.relationships.map((relationship) => ({ label: relationship.label, value: `${relationship.completeness} / ${relationship.description}` }))
                    : [{ label: 'Relationships', value: 'None detected' }],
            },
            {
                title: 'Luck Pillars (Da Yun)',
                facts: bazi.luckPillars?.status === 'calculated' ? [
                    { label: 'Direction', value: bazi.luckPillars.directionNote },
                    ...(window ? [{ label: 'Start age precision', value: BAZI_LUCK_WINDOW_NOTE[timePrecision === 'unknown' ? 'unknown' : 'approximate'] }] : []),
                    ...(bazi.luckPillars.forward?.entries ?? []).map((entry, index) => ({ label: `Forward #${entry.sequenceNumber}`, value: `${entry.label} / age ${window?.luckStartAges.forward ? luckAgeText(window.luckStartAges.forward, index * 10) : entry.startAgeYears} / ${entry.tenGod.tenGod}` })),
                    ...(bazi.luckPillars.reverse?.entries ?? []).map((entry, index) => ({ label: `Reverse #${entry.sequenceNumber}`, value: `${entry.label} / age ${window?.luckStartAges.reverse ? luckAgeText(window.luckStartAges.reverse, index * 10) : entry.startAgeYears} / ${entry.tenGod.tenGod}` })),
                ] : [{ label: 'Luck Pillars', value: bazi.luckPillars?.reasonSuppressed ?? 'Unavailable' }],
            },
            {
                title: 'TCM constitution',
                facts: bazi.tcmConstitution ? [
                    { label: 'Day Master correspondence', value: `${bazi.tcmConstitution.dayMasterPhase} / ${bazi.tcmConstitution.dayMasterCorrespondence.yinOrgan}-${bazi.tcmConstitution.dayMasterCorrespondence.yangOrgan}` },
                    ...bazi.tcmConstitution.emphasisNotes.map((note, index) => ({ label: `Emphasis ${index + 1}`, value: note })),
                    { label: 'Seasonal note', value: bazi.tcmConstitution.seasonalNote },
                    { label: 'Disclaimer', value: bazi.tcmConstitution.disclaimer },
                ] : [{ label: 'TCM constitution', value: 'Unavailable' }],
            },
            {
                title: 'BaZi calculation trace',
                /* The engine records only whether a time was supplied, so an estimate
                   printed as "user-supplied" - which reads as exact. The profile knows
                   which it was, and the trace says so; the calculation is untouched. */
                facts: timePrecision
                    ? bazi.trace.map((fact) => (fact.label === 'Birth time precision'
                        ? { ...fact, value: BIRTH_TIME_PRECISION_TRACE[timePrecision] }
                        : unknownTime && ['Civil clock time', 'True solar time', 'Total time correction'].includes(fact.label)
                            ? { ...fact, value: BAZI_NO_CLOCK_TIME }
                            : unknownTime && fact.label === 'Effective local time' ? { ...fact, value: BAZI_REFERENCE_TIME } : fact))
                    : bazi.trace,
            },
        ],
        /* The engine's own line said the date boundaries were read at a "12:00
           local-noon estimate" and "may be approximate on a boundary day" - for
           every chart without a time, whether a boundary fell on its day or not.
           The window now says which. */
        limitations: [
            ...(timePrecision === 'approximate' ? [APPROXIMATE_TIME_LIMITATION] : []),
            ...bazi.limitations.flatMap((line) => (line.startsWith('Year and Month solar-term boundaries were evaluated')
                ? window ? [yearMoves || monthMoves
                        ? `A solar-term boundary falls on the birth date, so the ${yearMoves ? 'Year and Month Pillars change' : 'Month Pillar changes'} during it (${baziWindowPhrase(yearMoves ? window.year : window.month)}). The chart is read at the 12:00 reference and should be treated as unsettled until a birth time is known.`
                        : BAZI_DATE_BOUNDARY_STABLE] : [line]
                : [line])),
        ],
        /* The certainty of the birth time travels with the chart: the engine only
           knows whether a time was supplied, and an estimate is supplied, so it
           cannot tell an estimated hour from a recorded one. The reading must. */
        baziChart: { bazi, ...(timePrecision ? { timePrecision } : {}), ...(window ? { timeWindow: window } : {}) },
    };
}
/* BaZi without a clock time: values that correct or read a clock time. */
const BAZI_NO_CLOCK_TIME = 'Not applicable (no birth time)';
const BAZI_NO_CLOCK_TIME_NOTE = 'True solar time corrects a birth clock time for the birth longitude and the equation of time. With no birth time there is '
    + 'no clock time to correct, and the 12:00 reference the engine calculates with is not the reader\'s time.';
const BAZI_REFERENCE_TIME = '12:00 (a reference for the date boundaries only, not a birth time)';
const BAZI_DATE_BOUNDARY_STABLE = 'No solar-term boundary falls on the birth date, so the Year and Month Pillars are the same whatever the hour of birth was.';
const BAZI_LUCK_WINDOW_NOTE = {
    unknown: 'The start age depends on the birth hour; with no birth time it is given as the range the birth date allows.',
    approximate: 'The start age depends on the birth hour; it is given as the range two hours either side of your estimate allows.',
};
function baziPillarOutput(label, pillar) {
    return keyOutput(label, pillar.label, pillar.symbolicLabel, `${pillar.stem.name} (${pillar.stem.character}) / ${pillar.branch.name} (${pillar.branch.character}) / sexagenary cycle ${pillar.sexagenaryIndex + 1}.`);
}
function baziPillarFact(pillar) {
    return {
        label: `${pillar.key} pillar`,
        value: `${pillar.label} / ${pillar.stem.character}${pillar.branch.character} / ${pillar.symbolicLabel} / cycle ${pillar.sexagenaryIndex + 1}`,
    };
}
function themesFromBazi(bazi) {
    if (!bazi.dayMaster)
        return [];
    const highestCount = Math.max(...BAZI_ELEMENTS.map((element) => bazi.elementCounts[element]));
    const strongestElements = BAZI_ELEMENTS.filter((element) => bazi.elementCounts[element] === highestCount);
    return [
        {
            id: 'bazi-day-master',
            label: 'Day Master structure',
            plainMeaning: `${bazi.dayMaster.name} ${bazi.dayMaster.element} (${bazi.dayMaster.polarity}) is the stem of the calculated Day Pillar.`,
            evidence: [{
                    pillarId: 'bazi-tcm',
                    pillarLabel: 'BaZi / TCM',
                    sourceSignal: `Day Master ${bazi.dayMaster.name} ${bazi.dayMaster.element}`,
                    sourceKind: 'calculated-engine-output',
                }],
            strength: 'emerging',
        },
        {
            id: 'bazi-element-distribution',
            label: 'Five Element distribution',
            plainMeaning: `The strongest visible count is ${strongestElements.join(' / ')} at ${highestCount}; hidden stems and seasonal weighting are excluded.`,
            evidence: [{
                    pillarId: 'bazi-tcm',
                    pillarLabel: 'BaZi / TCM',
                    sourceSignal: BAZI_ELEMENTS.map((element) => `${element} ${bazi.elementCounts[element]}`).join(', '),
                    sourceKind: 'calculated-engine-output',
                }],
            strength: 'emerging',
        },
    ];
}
/**
 * One sentence, used for every withheld Human Design mechanic, so the reason a
 * reader meets is the same wherever they meet it.
 */
const HD_SUPPRESSED_NOTE = 'No birth time was supplied. Human Design mechanics move within a single day, so this is '
    + 'withheld rather than derived from the 12:00 local-noon fallback the engine calculates '
    + 'with. Supplying an exact birth time resolves it.';
/**
 * THE TECHNICAL APPENDIX FOR A CHART WITH NO BIRTH TIME.
 *
 * The key outputs, the theme signals and the BodyGraph have always been
 * suppressed for an unknown birth time. The technical appendix was not: it went
 * on publishing the noon-derived Type, Authority, Definition, Profile, the nine
 * centre states, the defined channels, every activated gate, the Incarnation
 * Cross gates, the four Variables and all twenty-six planetary activations -
 * the entire chart, one disclosure below a screen that said it was withheld.
 * A reader who opened Technical Details got the mechanics anyway, with nothing
 * in them marking which moment they came from.
 *
 * So nothing computed FROM the guessed moment is published here. What remains
 * is what is true whatever the time: which engine would run, in which frame,
 * under which node convention - and a row saying plainly what is missing and
 * why. The engine still calculates all of it; this is the pillar declining to
 * report it.
 */
function suppressedHumanDesignTechnical(humanDesign) {
    /* Trace rows that are properties of the METHOD rather than of this chart.
       Everything else in the trace is a position, a gate or a mechanic, and every
       one of those was solved from the 12:00 fallback. */
    const METHOD_ONLY = new Set([
        'Engine', 'Frame', 'Lunar node model', 'Lunar node convention note',
    ]);
    return [
        {
            title: 'Human Design summary',
            facts: [
                { label: 'Engine', value: humanDesign.engine },
                { label: 'Frame', value: humanDesign.frame },
                {
                    label: 'Birth time',
                    value: 'Not supplied',
                    note: 'Every Human Design mechanic is read from one exact moment.',
                },
                {
                    label: 'Mechanics',
                    value: 'Withheld',
                    note: HD_SUPPRESSED_NOTE,
                },
            ],
        },
        {
            title: 'Human Design calculation trace',
            facts: humanDesign.trace.filter((row) => METHOD_ONLY.has(row.label)),
        },
    ];
}
/*
 * THE MECHANICS AN UNKNOWN TIME STILL SETTLES (human-design/humanDesignEnvelope.ts).
 *
 * Every mechanic is classified on its own across the whole birth date. One
 * that takes a single value everywhere in it is shown, marked as holding all
 * day; one that changes is withheld - named, with the values it takes, but
 * never read as the reader's. Nothing comes from the 12:00 reference alone.
 */
const HD_ENVELOPE_LIMITATION = 'Birth time was not supplied. Every Human Design mechanic was checked across the whole birth date: the ones that '
    + 'hold at every instant of it are shown, and the ones that change are withheld rather than read from the 12:00 '
    + 'local reference the engine calculates with.';
const HD_STABLE_NOTE = 'The same at every instant of the birth date: the whole day was scanned, so this holds whatever the hour of birth was.';
const HD_TIME_SENSITIVE_NOTE = 'This changes during the birth date, so it is not read without a birth time. The values it takes that day are listed; '
    + 'none of them is chosen.';
function envelopeHumanDesignOutputs(humanDesign, envelope) {
    /* Commas between centres: two centre names themselves contain a slash (G / Identity, Ego / Heart). */
    const centreLabels = (ids) => ids.map((id) => HD_CENTER_LABELS[id]).join(', ');
    /* Every value a moving mechanic takes is listed, so none is singled out - but
       the Variables change tone dozens of times a day, and a list of them says
       nothing. Values are separated by semicolons: a Strategy has a comma in it. */
    const stableOr = (label, entry, stableNote = 'The same across the whole birth date') => (entry.stable
        ? keyOutput(label, entry.values[0] || 'Unavailable', stableNote, HD_STABLE_NOTE)
        : keyOutput(label, HD_NEEDS_TIME, label === 'Variables' ? 'Changes during the birth date' : `Changes during the birth date: ${entry.values.join('; ')}`, HD_TIME_SENSITIVE_NOTE));
    const centres = Object.entries(envelope.centres);
    const definedAllDay = centres.filter(([, entry]) => entry.stable && entry.values[0] === 'defined').map(([id]) => id);
    const openAllDay = centres.filter(([, entry]) => entry.stable && entry.values[0] === 'open').map(([id]) => id);
    const moving = centres.filter(([, entry]) => !entry.stable).map(([id]) => id);
    const sunOf = (side) => {
        const entry = envelope.activations.find((activation) => activation.side === side && activation.body === 'Sun');
        if (!entry)
            return keyOutput(`${side} Sun`, 'Unavailable', '', HD_TIME_SENSITIVE_NOTE);
        return entry.lines.length === 1
            ? keyOutput(`${side} Sun`, `Gate ${entry.lines[0]}`, 'Gate and line the same across the whole birth date', HD_STABLE_NOTE)
            : entry.gates.length === 1
                ? keyOutput(`${side} Sun`, `Gate ${entry.gates[0]}`, `The gate holds all day; the line changes: ${entry.lines.join(' / ')}`, HD_STABLE_NOTE)
                : keyOutput(`${side} Sun`, HD_NEEDS_TIME, `Changes during the birth date: ${entry.lines.join(' / ')}`, HD_TIME_SENSITIVE_NOTE);
    };
    return [
        stableOr('Type', envelope.type),
        stableOr('Strategy', envelope.strategy),
        stableOr('Authority', envelope.authority),
        stableOr('Definition', envelope.definition),
        stableOr('Profile', envelope.profile),
        keyOutput('Defined Centers', centreLabels(definedAllDay) || 'None defined all day', moving.length > 0 ? `Defined all day; ${centreLabels(moving)} depend on the hour` : 'Defined all day', HD_STABLE_NOTE),
        keyOutput('Defined Channels', envelope.channels.always.join(' / ') || 'None defined all day', envelope.channels.sometimes.length > 0 ? `Defined all day; ${envelope.channels.sometimes.join(' / ')} only at some hours` : 'Defined all day', HD_STABLE_NOTE),
        keyOutput('Activated Gates', envelope.gates.always.join(', ') || 'None all day', envelope.gates.sometimes.length > 0 ? `Activated all day; ${envelope.gates.sometimes.join(', ')} only at some hours` : 'Activated all day', HD_STABLE_NOTE),
        stableOr('Signature', envelope.signature, 'Follows from a Type that holds all day'),
        stableOr('Not-Self Theme', envelope.notSelf, 'Follows from a Type that holds all day'),
        keyOutput('Open Centers', centreLabels(openAllDay) || 'None open all day', moving.length > 0 ? `Open all day; ${centreLabels(moving)} depend on the hour` : 'Open all day', HD_STABLE_NOTE),
        stableOr('Incarnation Cross', envelope.cross),
        stableOr('Variables', envelope.variables),
        envelope.motorToThroat.stable
            ? keyOutput('Motor to Throat', envelope.motorToThroat.values[0] === 'yes' ? 'Connected' : 'Not connected', 'The same across the whole birth date', HD_STABLE_NOTE)
            : keyOutput('Motor to Throat', HD_NEEDS_TIME, 'Changes during the birth date', HD_TIME_SENSITIVE_NOTE),
        keyOutput('Design Date', HD_NEEDS_TIME, `About ${Math.round(humanDesign.designOffsetDays ?? 88)} days before birth`, 'The Design moment is solved until the Sun is 88° before the Personality Sun, so it moves with the birth hour; its exact instant is not given without a birth time.'),
        sunOf('Personality'),
        sunOf('Design'),
    ];
}
function envelopeHumanDesignTechnical(humanDesign, envelope) {
    const METHOD_ONLY = new Set(['Engine', 'Frame', 'Lunar node model', 'Lunar node convention note']);
    const state = (entry) => (entry.stable ? `${entry.values[0] || 'Unavailable'} (all day)` : `${HD_NEEDS_TIME}: ${entry.values.join('; ')}`);
    return [
        {
            title: 'Human Design summary',
            facts: [
                { label: 'Engine', value: humanDesign.engine },
                { label: 'Frame', value: humanDesign.frame },
                { label: 'Birth time', value: 'Not supplied', note: 'The whole local birth date was scanned.' },
                { label: 'Type', value: state(envelope.type) },
                { label: 'Strategy', value: state(envelope.strategy) },
                { label: 'Authority', value: state(envelope.authority) },
                { label: 'Definition', value: state(envelope.definition) },
                { label: 'Profile', value: state(envelope.profile) },
                { label: 'Incarnation Cross', value: state(envelope.cross) },
                { label: 'Defined channels all day', value: envelope.channels.always.join(', ') || 'None' },
                { label: 'Channels at some hours only', value: envelope.channels.sometimes.join(', ') || 'None' },
                { label: 'Gates activated all day', value: envelope.gates.always.join(', ') || 'None' },
                { label: 'Gates at some hours only', value: envelope.gates.sometimes.join(', ') || 'None' },
            ],
        },
        {
            title: 'Center states',
            facts: Object.entries(envelope.centres).map(([id, entry]) => ({
                label: HD_CENTER_LABELS[id],
                value: entry.stable ? `${entry.values[0] === 'defined' ? 'Defined' : 'Undefined'} (all day)` : 'Depends on the hour',
            })),
        },
        {
            title: 'Activations across the birth date',
            facts: envelope.activations.map((activation) => ({
                label: `${activation.side} ${activation.body}`,
                value: activation.lines.length === 1 ? `Gate ${activation.lines[0]} (all day)`
                    : activation.gates.length === 1 ? `Gate ${activation.gates[0]} (all day); line ${activation.lines.map((line) => line.split('.')[1]).join(' / ')}`
                        : `${HD_NEEDS_TIME}: gates ${activation.gates.join(' / ')}`,
            })),
        },
        {
            title: 'How the birth date was scanned',
            facts: [
                { label: 'Window', value: 'The local civil birth date, 00:00 to 23:59, at the birth place' },
                { label: 'Method', value: 'Certified scan of every activation\'s gate and line, then one chart per stretch on which all of them hold' },
                { label: 'Stretches', value: String(envelope.segments) },
                { label: 'Instants evaluated', value: String(envelope.samples) },
            ],
        },
        {
            title: 'Human Design calculation trace',
            facts: humanDesign.trace.filter((row) => METHOD_ONLY.has(row.label)),
        },
    ];
}
function buildHumanDesignPillar(input, humanDesign, humanDesignWindow = null, envelope = null) {
    const mechanicsSuppressed = !input.birthTime.trim();
    /* The certainty of the birth time travels with the chart: the engine only
       learns whether a time was supplied, and an ESTIMATE is supplied, so it
       cannot tell an estimated birth moment from a recorded one. The reading
       must, because every mechanic below is read from that one moment. */
    const timePrecision = birthTimePrecisionOf(input);
    const humanDesignBodygraph = {
        humanDesign, mechanicsSuppressed, timePrecision,
        ...(humanDesignWindow ? { timeWindow: humanDesignWindow } : {}),
        ...(mechanicsSuppressed && envelope ? { envelope } : {}),
    };
    if (humanDesign.status === 'blocked') {
        return unavailablePillar({
            id: 'human-design',
            title: 'Human Design',
            eyebrow: 'Energy mechanics structure',
            visual: 'bodygraph-grid',
            summary: 'Human Design becomes available when the birth moment can be normalized and mapped onto the Human Design gate wheel.',
            requiredOutputs: ['BodyGraph', 'Centers', 'Channels', 'Gates', 'Type / strategy', 'Authority / profile'],
            limitations: humanDesign.limitations,
            statusLabel: 'Calculation blocked',
            sourceLabel: 'Blocked before Human Design calculation',
            sourceReference: 'frontend-app/src/app/human-design/humanDesignEngine.ts',
            sourceDetail: 'No Human Design output is generated until the birth moment can be normalized to UTC.',
            outputNote: 'Required birth moment source data is incomplete',
            technicalGroups: [{ title: 'Human Design readiness trace', facts: humanDesign.trace }],
        });
    }
    const personalitySun = humanDesign.personalityActivations.find((activation) => activation.body === 'Sun');
    const designSun = humanDesign.designActivations.find((activation) => activation.body === 'Sun');
    /* Commas between centres: "Throat / G / Identity" read as three centres where there are two. */
    const definedCenters = humanDesign.definedCenters.map((center) => HD_CENTER_LABELS[center]).join(', ') || 'None defined';
    const definedChannels = humanDesign.definedChannels.map((channel) => channel.id).join(' / ') || 'None defined';
    const activatedGates = humanDesign.activatedGates.join(', ') || 'None';
    const definitionGroups = humanDesign.definitionGroups
        .map((group, index) => `Group ${index + 1}: ${group.centers.map((center) => HD_CENTER_LABELS[center]).join(', ')} [${group.channelIds.join(', ')}]`)
        .join(' | ') || 'None';
    const motorPath = humanDesign.motorToThroatPath.map((center) => HD_CENTER_LABELS[center]).join(' -> ') || 'None';
    const openCenters = humanDesign.centerStates.filter((center) => !center.defined);
    const openCenterLabels = openCenters.map((center) => center.label).join(', ') || 'None open';
    const cross = humanDesign.incarnationCross;
    const variables = humanDesign.variables;
    const variableSummary = variables.length > 0
        ? variables.map((variable) => `${variable.label}: ${variable.orientation}`).join(' / ')
        : 'Unavailable';
    return {
        id: 'human-design',
        title: 'Human Design',
        eyebrow: 'Calculated gate, channel, and center mechanics',
        status: 'calculated',
        statusLabel: 'Calculated locally',
        source: {
            kind: 'calculated-engine-output',
            label: 'Calculated engine output',
            reference: 'frontend-app/src/app/human-design/humanDesignEngine.ts + humanDesignMechanics.ts',
            detail: `${humanDesign.engine}; ${humanDesign.frame}. Type, strategy, authority, and definition are derived from the completed-channel center graph. No external Human Design API is used.`,
        },
        visual: 'bodygraph-grid',
        summary: 'Personality and Design longitudes are mapped to gates and lines. Completed channels define centers; graph connectivity then determines Type, Strategy, Authority, and Definition.',
        /*
         * THE MECHANICS ARE WITHHELD WHEN THE BIRTH TIME WAS NOT SUPPLIED.
         *
         * `mechanicsSuppressed` is computed at the top of this function and was
         * already honoured by two of the three surfaces that show Human Design: the
         * bodygraph blanks its centres, channels and gates and prints the reason,
         * and renderBlueprintPanel prints "Suppressed" for Type, Strategy,
         * Authority, Profile and Definition. Only this list ignored it.
         *
         * So the screen said "Precise Human Design mechanics are suppressed because
         * birth time is estimated" and "Provide exact birth time to calculate Type,
         * Authority, Profile, Centers, Channels, and Gates" - and, immediately
         * beside it, Projector / Wait for recognition and invitation /
         * Self-Projected / Profile 3/5 / Single Definition / channel 7-31, each one
         * stated as a resolved fact about the reader. One screen, two answers.
         *
         * The withheld set is exactly the one the notice names, plus the values
         * derived from it. Nothing is invented and nothing is recalculated: the
         * engine still computes from the 12:00 fallback because the architecture
         * needs a deterministic moment, and this decides only what may be PRESENTED
         * as the reader's own mechanics. That is the same rule BaZi already follows
         * for an unavailable Hour Pillar.
         *
         * What survives is what does not depend on the hour: the Design Date's own
         * offset is kept as a stated calculation rather than a personal mechanic,
         * and the two Sun activations stay withheld because their line - and so the
         * profile - moves within a day.
         */
        keyOutputs: mechanicsSuppressed && envelope ? envelopeHumanDesignOutputs(humanDesign, envelope) : mechanicsSuppressed ? [
            keyOutput('Type', 'Suppressed', 'Requires an exact birth time', HD_SUPPRESSED_NOTE),
            keyOutput('Strategy', 'Suppressed', 'Derived from Type', HD_SUPPRESSED_NOTE),
            keyOutput('Authority', 'Suppressed', 'Requires an exact birth time', HD_SUPPRESSED_NOTE),
            keyOutput('Definition', 'Suppressed', 'Requires the completed-channel graph', HD_SUPPRESSED_NOTE),
            keyOutput('Profile', 'Suppressed', 'Requires the two Sun lines', HD_SUPPRESSED_NOTE),
            keyOutput('Defined Centers', 'Suppressed', 'Requires an exact birth time', HD_SUPPRESSED_NOTE),
            keyOutput('Defined Channels', 'Suppressed', 'Requires an exact birth time', HD_SUPPRESSED_NOTE),
            keyOutput('Activated Gates', 'Suppressed', 'Requires an exact birth time', HD_SUPPRESSED_NOTE),
            keyOutput('Signature', 'Unavailable', 'Follows from Type', HD_SUPPRESSED_NOTE),
            keyOutput('Not-Self Theme', 'Unavailable', 'Follows from Type', HD_SUPPRESSED_NOTE),
            keyOutput('Open Centers', 'Suppressed', 'Follows from the defined centres', HD_SUPPRESSED_NOTE),
            keyOutput('Incarnation Cross', 'Unavailable', 'Follows from the profile', HD_SUPPRESSED_NOTE),
            keyOutput('Variables', 'Unavailable', 'Reads the tone of an activation', HD_SUPPRESSED_NOTE),
            keyOutput('Motor to Throat', 'Suppressed', 'A path through the centre graph', HD_SUPPRESSED_NOTE),
            keyOutput('Design Date', humanDesign.designDateTime ?? 'Unavailable', `${humanDesign.designOffsetDays ?? 'Unknown'} days before a 12:00 estimate`, 'The Design moment is solved until the Sun is 88 degrees before the Personality Sun. It is reported as the calculation it is, from an estimated birth moment, and no mechanic is derived from it here.'),
            keyOutput('Personality Sun', 'Suppressed', 'Conscious Sun activation', HD_SUPPRESSED_NOTE),
            keyOutput('Design Sun', 'Suppressed', 'Unconscious Sun activation', HD_SUPPRESSED_NOTE),
        ] : [
            keyOutput('Type', humanDesign.type, 'Graph-derived classification', `Derived from Sacral definition and a real connected motor-to-Throat path. Motor path: ${motorPath}.`),
            keyOutput('Strategy', humanDesign.strategy, 'Derived from resolved Type', 'Mapped deterministically from the calculated Human Design Type.'),
            keyOutput('Authority', humanDesign.authority, 'Authority hierarchy', 'Resolved in order: Solar Plexus, Sacral, Spleen, Ego, G/Self-Projected, Mental/Environmental, or Lunar.'),
            keyOutput('Definition', humanDesign.definition, `${humanDesign.definitionGroups.length} connected component(s)`, definitionGroups),
            keyOutput('Profile', humanDesign.profile ?? 'Unavailable', 'Personality Sun line / Design Sun line', 'Calculated from the two Sun activations.'),
            keyOutput('Defined Centers', definedCenters, `${humanDesign.definedCenters.length} center(s)`, 'Centers are defined only through completed channels.'),
            keyOutput('Defined Channels', definedChannels, `${humanDesign.definedChannels.length} channel(s)`, 'A channel is defined when both gates are activated.'),
            keyOutput('Activated Gates', activatedGates, `${humanDesign.activatedGates.length} unique gate(s)`, 'Unique gates from Personality and Design activations.'),
            keyOutput('Signature', humanDesign.signature ?? 'Unavailable', 'The felt marker of living the Strategy', `The state reported when a ${humanDesign.type} follows its Strategy and Authority. It is a self-check, not a promise.`),
            keyOutput('Not-Self Theme', humanDesign.notSelfTheme ?? 'Unavailable', 'The felt marker of overriding the Strategy', `The recurring signal a ${humanDesign.type} tends to notice when decisions bypass Strategy and Authority.`),
            keyOutput('Open Centers', openCenterLabels, `${openCenters.length} of 9 center(s) undefined`, 'Undefined centers are where conditioning is taken in and amplified from others. They are a real result, not a gap in the calculation.'),
            keyOutput('Incarnation Cross', cross?.label ?? 'Unavailable', cross?.angle ? `${cross.angle}, set by profile ${cross.profile}` : 'Angle unavailable', 'Built from the conscious Sun and Earth plus the unconscious Sun and Earth. The angle follows from the profile. The named cross title is not asserted because this engine holds no curated table of cross names.'),
            keyOutput('Variables', variableSummary, `${variables.length} of 4 arrow(s) resolved`, 'Each arrow reads the tone of one activation: tones 1-3 point Left (active, focused), tones 4-6 point Right (receptive, peripheral).'),
            keyOutput('Motor to Throat', humanDesign.motorToThroat ? 'Connected' : 'Not connected', motorPath, 'A graph path, not simple center presence, is used to distinguish Manifesting Generator or Manifestor mechanics.'),
            keyOutput('Design Date', humanDesign.designDateTime ?? 'Unavailable', `${humanDesign.designOffsetDays ?? 'Unknown'} days before birth`, 'The Design moment is solved until the Sun is 88° before the Personality Sun.'),
            keyOutput('Personality Sun', personalitySun ? activationLabel(personalitySun) : 'Unavailable', 'Conscious Sun activation', 'Gate / line / color / tone / base from the birth moment.'),
            keyOutput('Design Sun', designSun ? activationLabel(designSun) : 'Unavailable', 'Unconscious Sun activation', 'Gate / line / color / tone / base from the design moment.'),
        ],
        interpretation: 'This layer reports the Human Design mechanical skeleton first: activations, completed channels, defined centers, connected definition groups, profile, type, strategy, and authority. Interpretive meaning remains intentionally separate from calculation.',
        relevance: {
            life: mechanicsSuppressed
                ? 'Profile, Type and Authority are withheld because no birth time was supplied, so this layer offers no mechanical categories for this chart.'
                : `Profile ${humanDesign.profile ?? 'unavailable'}, ${humanDesign.type}, and ${humanDesign.authority} provide mechanical categories for symbolic reflection, not fixed identity.`,
            work: mechanicsSuppressed
                ? 'The centre graph depends on the birth time and is not resolved for this chart.'
                : `${humanDesign.definedCenters.length} centers form ${humanDesign.definitionGroups.length} connected definition group(s): ${humanDesign.definition}.`,
            relationships: mechanicsSuppressed
                ? 'Strategy and Authority follow from the Type, which is withheld without a birth time.'
                : `${humanDesign.strategy} and ${humanDesign.authority} are shown as symbolic decision-style markers, not relationship prediction.`,
        },
        themeSignals: themesFromHumanDesign(humanDesign, mechanicsSuppressed),
        technicalGroups: mechanicsSuppressed && envelope ? envelopeHumanDesignTechnical(humanDesign, envelope)
            : mechanicsSuppressed ? suppressedHumanDesignTechnical(humanDesign) : [
                {
                    title: 'Human Design summary',
                    facts: [
                        { label: 'Engine', value: humanDesign.engine },
                        { label: 'Frame', value: humanDesign.frame },
                        { label: 'Personality UTC', value: humanDesign.personalityDateTime ?? 'Unavailable' },
                        { label: 'Design UTC', value: humanDesign.designDateTime ?? 'Unavailable' },
                        { label: 'Design offset days', value: humanDesign.designOffsetDays === null ? 'Unavailable' : String(humanDesign.designOffsetDays) },
                        { label: 'Type', value: humanDesign.type },
                        { label: 'Strategy', value: humanDesign.strategy },
                        { label: 'Authority', value: humanDesign.authority },
                        { label: 'Definition', value: humanDesign.definition },
                        { label: 'Definition groups', value: definitionGroups },
                        { label: 'Motor-to-Throat path', value: motorPath },
                        { label: 'Profile', value: humanDesign.profile ?? 'Unavailable' },
                        { label: 'Defined centers', value: definedCenters },
                        { label: 'Defined channels', value: definedChannels },
                        { label: 'Activated gates', value: activatedGates },
                    ],
                },
                {
                    title: 'Center states',
                    facts: humanDesign.centerStates.map((center) => ({
                        label: center.label,
                        value: `${center.defined ? 'Defined' : 'Undefined'} (${center.category})`,
                    })),
                },
                {
                    title: 'Incarnation Cross',
                    facts: cross
                        ? [
                            { label: 'Angle', value: cross.angle ?? 'Unavailable' },
                            { label: 'Angle source', value: cross.profile ? `Profile ${cross.profile}` : 'Profile unavailable' },
                            { label: 'Personality Sun gate', value: String(cross.personalitySunGate) },
                            { label: 'Personality Earth gate', value: String(cross.personalityEarthGate) },
                            { label: 'Design Sun gate', value: String(cross.designSunGate) },
                            { label: 'Design Earth gate', value: String(cross.designEarthGate) },
                            { label: 'Gate notation', value: cross.gateNotation },
                            { label: 'Named cross title', value: 'Not asserted; requires a curated table of named crosses' },
                        ]
                        : [{ label: 'Status', value: 'Unavailable' }],
                },
                {
                    title: 'Variables (four arrows)',
                    facts: variables.length > 0
                        ? variables.map((variable) => ({
                            label: `${variable.label} (${variable.arrow})`,
                            value: `${variable.orientation} / color ${variable.color} / tone ${variable.tone} / from ${variable.side} ${variable.sourceBody} gate ${variable.gate}.${variable.line}`,
                        }))
                        : [{ label: 'Status', value: 'Unavailable' }],
                },
                {
                    title: 'Personality activations',
                    facts: humanDesign.personalityActivations.map(activationFact),
                },
                {
                    title: 'Design activations',
                    facts: humanDesign.designActivations.map(activationFact),
                },
                {
                    title: 'Human Design calculation trace',
                    facts: humanDesign.trace,
                },
            ],
        limitations: input.birthTime
            ? humanDesign.limitations
            : [
                /* NOT "treated as approximate", which is what this line used to say.
                   Approximate is the state of a supplied estimate; this chart has no
                   time at all, and the mechanics are withheld rather than softened.
                   Saying otherwise contradicted the suppression on the same screen. */
                envelope
                    ? HD_ENVELOPE_LIMITATION
                    : 'Birth time was not supplied. Every Human Design mechanic is read from one exact moment and can change '
                        + 'within a single day, so Type, Strategy, Authority, Profile, Definition, the centres, the channels and '
                        + 'the gates are withheld for this chart rather than derived from the 12:00 local-noon fallback the engine '
                        + 'calculates with.',
                ...humanDesign.limitations,
            ],
        humanDesignBodygraph,
    };
}
function themesFromHumanDesign(humanDesign, mechanicsSuppressed = false) {
    /*
     * A theme signal is a human-facing claim, so it obeys the same suppression as
     * the key outputs. Without this the panel said "Type: Suppressed" and the
     * signal beside it still read "Projector, Wait for recognition and
     * invitation, Self-Projected, Single Definition, and Profile 3/5 were
     * calculated as mechanical Human Design categories".
     */
    if (mechanicsSuppressed) {
        return [{
                id: 'bodygraph-mechanics-suppressed',
                label: 'BodyGraph mechanics',
                plainMeaning: 'Type, Strategy, Authority, Definition and Profile depend on the birth time and '
                    + 'are withheld for this chart rather than derived from the 12:00 local-noon fallback.',
                evidence: [{
                        pillarId: 'human-design',
                        pillarLabel: 'Human Design',
                        sourceSignal: 'Withheld: no birth time was supplied',
                        sourceKind: 'calculated-engine-output',
                    }],
                strength: 'emerging',
            }];
    }
    const signals = [
        {
            id: 'bodygraph-mechanics',
            label: 'BodyGraph mechanics',
            plainMeaning: `${humanDesign.type}, ${humanDesign.strategy}, ${humanDesign.authority}, ${humanDesign.definition}, and Profile ${humanDesign.profile ?? 'unavailable'} were calculated as mechanical Human Design categories.`,
            evidence: [{
                    pillarId: 'human-design',
                    pillarLabel: 'Human Design',
                    sourceSignal: `${humanDesign.type}; ${humanDesign.strategy}; ${humanDesign.authority}; ${humanDesign.definition}; Profile ${humanDesign.profile ?? 'unavailable'}`,
                    sourceKind: 'calculated-engine-output',
                }],
            strength: 'emerging',
        },
    ];
    if (humanDesign.definedCenters.length > 0) {
        signals.push({
            id: 'defined-center-pattern',
            label: 'Defined center pattern',
            plainMeaning: 'Defined centers and their connected definition groups were derived from completed channels in the calculated Human Design layer.',
            evidence: [{
                    pillarId: 'human-design',
                    pillarLabel: 'Human Design',
                    sourceSignal: `${humanDesign.definedCenters.map((center) => HD_CENTER_LABELS[center]).join(', ')}; ${humanDesign.definition}`,
                    sourceKind: 'calculated-engine-output',
                }],
            strength: 'emerging',
        });
    }
    return signals;
}
function activationFact(activation) {
    return {
        label: activation.body,
        value: `${activation.longitude.toFixed(6)}° / ${activationLabel(activation)}`,
    };
}
function activationLabel(activation) {
    const { gate, line, color, tone, base } = activation.activation;
    return `Gate ${gate}.${line}.${color}.${tone}.${base}`;
}
function dominantKey(counts) {
    return Object.entries(counts).reduce((best, current) => (current[1] > best[1] ? current : best))[0];
}
function formatBalance(counts) {
    return Object.entries(counts).map(([label, count]) => `${label} ${count}`).join(' / ');
}
function formatDecimalDegrees(value, precision = 4) {
    return `${value.toFixed(precision)}°`;
}
function formatZodiacDegree(value) {
    const totalMinutes = Math.min(Math.max(0, Math.round(value * 60)), (29 * 60) + 59);
    const degrees = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${degrees}°${String(minutes).padStart(2, '0')}′`;
}
/*
 * AN ASPECT'S ORB IS A NATAL FACT ONLY WHEN THE BIRTH TIME IS EXACT.
 *
 * `timeWindow.aspectsThroughout` proves that the same aspect is in orb at every
 * instant the birth could have been. It says nothing about the orb, which moves
 * with the birth time - several degrees in a day for a Moon aspect. The engine
 * calculates the chart at one reference instant, so the orb it reports is that
 * instant's, and for an unknown or an approximate time it must not be printed as
 * the person's.
 *
 *   exact         the text it always was
 *   unknown       the card gives no orb: "in orb all day" when the scan proved it,
 *                 otherwise that the 12:00 calculation includes the aspect but without
 *                 an exact time it cannot be said whether it holds all day. The technical
 *                 row keeps the engine's numbers, labelled as a readout of the
 *                 reference instant
 *   approximate   the orb stays - it is the orb at the reader's own estimate - and
 *                 is named as such; an aspect that leaves orb within two hours of
 *                 the estimate says so
 *
 * If a time is not exact and there is no window to prove anything, nothing is
 * asserted: the aspect is treated as not proven across the window. The rule has
 * no numeric threshold; every aspect of a class is treated alike. Nothing here
 * changes a calculation; `aspect` and `timeWindow` are read only.
 */
export function describeAspectUnderUncertainty(aspect, precision, timeWindow) {
    const orb = formatZodiacDegree(aspect.orb);
    const exact = `${aspect.exactAngle}°`;
    const maxOrb = formatDecimalDegrees(aspect.maxOrb, 0);
    const angle6 = formatDecimalDegrees(aspect.actualAngle, 6);
    const marker = aspectHarmonicMeaning(aspect.harmonic);
    const readout = `Orb ${orb} / angle ${angle6} / exact ${exact} / max orb ${maxOrb}`;
    if (precision === 'exact') {
        return {
            kind: 'exact',
            note: `Orb ${orb}`,
            description: `${marker} Angular distance ${formatDecimalDegrees(aspect.actualAngle, 2)} against exact ${exact}; max orb ${maxOrb}.`,
            technical: readout,
        };
    }
    const throughout = timeWindow?.aspectsThroughout.includes(aspect.id) ?? false;
    if (precision === 'unknown') {
        const referenceReadout = `reference-time readout (12:00), not the birth moment: orb ${orb}, angle ${angle6}`;
        const description = `${marker} Exact angle ${exact}; max orb ${maxOrb}.`;
        return throughout
            ? {
                kind: 'all-day',
                note: 'In orb all day; the exact orb depends on the birth time.',
                description,
                technical: `In orb all day / exact ${exact} / max orb ${maxOrb} / ${referenceReadout}`,
            }
            : {
                kind: 'reference',
                note: 'The 12:00 calculation includes this aspect, but without an exact birth time we cannot tell whether it holds all day.',
                description,
                technical: `Not in orb throughout the day / exact ${exact} / max orb ${maxOrb} / ${referenceReadout}`,
            };
    }
    const atEstimate = throughout ? 'at your estimated time' : 'at your estimated time; not in orb throughout the two hours either side';
    return {
        kind: throughout ? 'estimate' : 'estimate-unstable',
        note: `Orb ${orb} ${atEstimate}`,
        /* the note above already says the orb is the one at the estimate; the sentence is the exact-time sentence */
        description: `${marker} Angular distance ${formatDecimalDegrees(aspect.actualAngle, 2)} against exact ${exact}; max orb ${maxOrb}.`,
        technical: `${readout} (${atEstimate})`,
    };
}
/**
 * The count of major aspects belongs to the reference instant. For an unknown or
 * an approximate time it says so, and how many of them were proven across the
 * window, so that it is not read as a count of guaranteed aspects. The number
 * itself is unchanged.
 */
export function describeAspectCountUnderUncertainty(aspects, precision, timeWindow) {
    const total = aspects.length;
    const base = 'Major aspects within configured orb limits';
    if (precision === 'exact') {
        return { note: base, value: String(total), signal: `${total} major aspects within configured orb limits` };
    }
    const held = aspects.filter((aspect) => timeWindow?.aspectsThroughout.includes(aspect.id) ?? false).length;
    if (precision === 'unknown') {
        return {
            note: total > 0 ? `${base} at the 12:00 reference; ${held} of ${total} are in orb all day` : `${base} at the 12:00 reference`,
            value: total > 0 ? `${total} at the 12:00 reference (${held} in orb all day)` : '0 at the 12:00 reference',
            signal: total > 0
                ? `${total} major aspects within configured orb limits at the 12:00 reference (${held} in orb all day)`
                : '0 major aspects within configured orb limits at the 12:00 reference',
        };
    }
    return {
        note: total > 0 ? `${base} at your estimated time; ${held} of ${total} are in orb throughout the two hours either side` : `${base} at your estimated time`,
        value: total > 0 ? `${total} at your estimated time (${held} in orb throughout the two hours either side)` : '0 at your estimated time',
        signal: total > 0
            ? `${total} major aspects within configured orb limits at your estimated time (${held} in orb throughout the two hours either side)`
            : '0 major aspects within configured orb limits at your estimated time',
    };
}
function aspectHarmonicMeaning(harmonic) {
    const meanings = {
        fusion: 'Fusion marker.',
        flow: 'Flow marker.',
        tension: 'Tension marker.',
        polarity: 'Polarity marker.',
    };
    return meanings[harmonic] ?? 'Aspect marker.';
}
function unavailablePillar(input) {
    return {
        ...input,
        status: 'not-calculated',
        statusLabel: input.statusLabel ?? 'Engine not connected',
        source: {
            kind: 'unavailable',
            label: input.sourceLabel ?? 'Unavailable in live mode',
            reference: input.sourceReference ?? 'No deterministic engine connected',
            detail: input.sourceDetail ?? 'No output or interpretation is generated for this pillar.',
        },
        keyOutputs: input.requiredOutputs.map((label) => ({
            label,
            value: 'Not calculated',
            note: input.outputNote ?? 'Awaiting deterministic engine output',
        })),
        interpretation: 'No interpretation is shown because this pillar has no calculated output.',
        relevance: {
            life: 'Awaiting calculated source signals.',
            work: 'Awaiting calculated source signals.',
            relationships: 'Awaiting calculated source signals.',
        },
        themeSignals: [],
        technicalGroups: input.technicalGroups ?? [{
                title: 'Source readiness',
                facts: input.limitations.map((value, index) => ({ label: `Requirement ${index + 1}`, value })),
            }],
    };
}
function keyOutput(label, value, note, description) {
    return { label, value: String(value), note, description };
}
function birthDayPath(calculation) {
    const dateParts = calculation.rawInput.includes('-') ? calculation.rawInput.split('-') : calculation.rawInput.split('/');
    const sourceDay = dateParts.at(-1) ?? calculation.rawInput;
    const normalizedDay = String(Number(sourceDay));
    const values = [normalizedDay, ...calculation.reductionSteps]
        .map((value) => value.trim())
        .filter((value, index, items) => value && items.indexOf(value) === index);
    return values.join('/');
}
/** Whole years between a YYYY-MM-DD birth date and an ISO instant. */
function ageInYears(birthDate, atIso) {
    const birth = new Date(`${birthDate}T00:00:00Z`);
    const at = new Date(atIso);
    if (Number.isNaN(birth.getTime()) || Number.isNaN(at.getTime()))
        return null;
    let age = at.getUTCFullYear() - birth.getUTCFullYear();
    const monthDelta = at.getUTCMonth() - birth.getUTCMonth();
    if (monthDelta < 0 || (monthDelta === 0 && at.getUTCDate() < birth.getUTCDate()))
        age -= 1;
    return age >= 0 ? age : null;
}
function ordinalLabel(index) {
    return ['First', 'Second', 'Third', 'Fourth'][index] ?? `Position ${index + 1}`;
}
function formatPinnacleSpan(span) {
    return span.endAge === null ? `age ${span.startAge}+` : `ages ${span.startAge}-${span.endAge}`;
}
function formatPattern(values) {
    return values.length > 0 ? values.join(', ') : 'None identified';
}
function calculationGroup(calculation) {
    return {
        title: calculation.label,
        facts: [
            { label: 'Raw input', value: calculation.rawInput },
            { label: 'Normalized input', value: calculation.normalizedInput },
            { label: 'Component values', value: formatList(calculation.componentValues) },
            { label: 'Reduction steps', value: calculation.reductionSteps.join(' -> ') },
            { label: 'Final number', value: String(calculation.finalNumber) },
            { label: 'Master number preserved', value: calculation.preservedMasterNumber ? 'Yes' : 'No' },
        ],
    };
}
function patternCalculationGroup(calculation) {
    return {
        title: calculation.label,
        facts: [
            { label: 'Raw input', value: calculation.rawInput },
            { label: 'Normalized input', value: calculation.normalizedInput },
            { label: 'Component values', value: formatList(calculation.componentValues) },
            { label: 'Present values', value: formatList(calculation.presentValues ?? []) },
            { label: 'Missing values', value: formatList(calculation.missingValues ?? []) },
            { label: 'Final values', value: formatPattern(calculation.finalValues) },
        ],
    };
}
/* buildUnifiedPattern used to live here. It set mainArchetype to
   "Cross-pillar archetype pending" on every profile ever generated, because
   there was no cross-pillar engine behind it to be pending on. There is one
   now; see unifiedPatternFromSynthesis. */
export function getPillar(experience, pillarId) {
    const pillar = experience.pillars.find((item) => item.id === pillarId);
    if (!pillar)
        throw new Error(`Missing pillar: ${pillarLabel(pillarId)}`);
    return pillar;
}
