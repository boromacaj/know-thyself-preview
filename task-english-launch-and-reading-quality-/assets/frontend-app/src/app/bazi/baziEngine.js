import { SearchSunLongitude, SunPosition } from 'astronomy-engine';
import { BAZI_ELEMENTS, EARTHLY_BRANCHES, HEAVENLY_STEMS, SOLAR_MONTH_BOUNDARIES, } from './data/baziConstants.js';
import { HIDDEN_STEM_WEIGHTING_MODEL, resolveHiddenStems } from './data/hiddenStems.js';
import { calculateTenGod } from './tenGodsEngine.js';
import { calculateDayMasterStrength, calculateHiddenStemPhaseBalance, calculateRawPhaseBalance, calculateSeasonalContext, DAY_MASTER_STRENGTH_MODEL_VERSION, } from './fivePhaseBalance.js';
import { detectBaziRelationships } from './relationshipEngine.js';
import { calculateLuckPillars } from './luckPillars.js';
import { buildTcmConstitution } from './tcmConstitution.js';
import { calculateTrueSolarTime } from './trueSolarTime.js';
const ENGINE = 'KNOW THYSELF BaZi v2 / astronomy-engine 2.1.19';
const FRAME = 'Li Chun solar year / 12 Jie solar months / Gregorian JDN sexagenary day / true-solar-time shichen (civil-time comparison retained)';
const MILLISECONDS_PER_DAY = 86_400_000;
const LI_CHUN_LONGITUDE = 315;
const JIA_ZI_YEAR = 1984;
const SEXAGENARY_CYCLE_LENGTH = 60;
const DAY_CYCLE_JDN_OFFSET = 49;
const METHODOLOGY_VERSION = 'know-thyself-bazi-methodology-v2';
const TEN_GODS_MODEL = 'five-phase-cycle-distance-plus-polarity-v1';
export function calculateBaziLive(moment, birthTimeWasSupplied, longitude) {
    const birthTimePrecision = birthTimeWasSupplied ? 'user-supplied' : 'estimated-local-noon';
    if (moment.status !== 'ready' || !moment.utcDateTime) {
        return blocked(moment.limitations.length > 0 ? moment.limitations : ['A normalized UTC birth moment is required for BaZi.'], birthTimePrecision, moment.trace);
    }
    const localDate = parseLocalDate(moment.localDate);
    const localTime = parseLocalTime(moment.localTime);
    if (!localDate || !localTime) {
        return blocked(['A valid local birth date and effective local time are required for BaZi.'], birthTimePrecision, moment.trace);
    }
    if (longitude === null) {
        return blocked(['Resolved birth longitude is required for BaZi true solar time.'], birthTimePrecision, moment.trace);
    }
    try {
        const birthDate = new Date(moment.utcDateTime);
        const sunLongitude = normalizeDegrees(SunPosition(birthDate).elon);
        const liChun = searchLiChun(localDate.year);
        const solarYear = birthDate.getTime() >= liChun.getTime() ? localDate.year : localDate.year - 1;
        const yearPillar = pillarFromCycleIndex('Year', mod(solarYear - JIA_ZI_YEAR, SEXAGENARY_CYCLE_LENGTH));
        const angleFromLiChun = normalizeDegrees(sunLongitude - LI_CHUN_LONGITUDE);
        const monthIndex = Math.min(Math.floor(angleFromLiChun / 30), 11);
        const activeBoundary = SOLAR_MONTH_BOUNDARIES[monthIndex];
        if (!activeBoundary)
            throw new Error(`Missing BaZi solar-month boundary index ${monthIndex}.`);
        const activeBoundaryDate = searchActiveMonthBoundary(birthDate, sunLongitude, activeBoundary.longitude);
        const monthStemIndex = mod(((yearPillar.stem.index % 5) * 2) + 2 + monthIndex, 10);
        const monthPillar = pillarFromStemBranch('Month', monthStemIndex, activeBoundary.branchIndex);
        const julianDayNumber = gregorianJulianDayNumber(localDate.year, localDate.month, localDate.day);
        const dayCycleIndex = mod(julianDayNumber + DAY_CYCLE_JDN_OFFSET, SEXAGENARY_CYCLE_LENGTH);
        const dayPillar = pillarFromCycleIndex('Day', dayCycleIndex);
        const dayMaster = dayPillar.stem;
        attachTenGods(yearPillar, dayMaster);
        attachTenGods(monthPillar, dayMaster);
        attachTenGods(dayPillar, dayMaster);
        const trueSolarTime = calculateTrueSolarTime({
            utcDateTime: moment.utcDateTime,
            localDate: moment.localDate,
            localTime: moment.localTime,
            longitude,
        });
        const warnings = [];
        let hourPillar = null;
        let civilHourPillar = null;
        if (birthTimeWasSupplied) {
            civilHourPillar = resolveHourPillar(dayMaster.index, localTime);
            attachTenGods(civilHourPillar, dayMaster);
            const trueSolarTimeOfDay = parseNaiveTime(trueSolarTime.trueSolarLocalDateTime);
            hourPillar = resolveHourPillar(dayMaster.index, trueSolarTimeOfDay);
            attachTenGods(hourPillar, dayMaster);
            if (localTime.hour === 23) {
                warnings.push({
                    code: 'late-zi-hour-window',
                    message: 'Birth time falls within the 23:00-23:59 "late Zi hour" window. Some traditions advance the Day Pillar to the next day for this window ("early/late Zi"); this engine uses the single Zi-hour convention where the Day Pillar does not advance until civil local midnight. This is a documented methodology choice, not universal consensus.',
                });
            }
            if (hourPillar.branch.index !== civilHourPillar.branch.index) {
                warnings.push({
                    code: 'hour-pillar-method-sensitive',
                    message: `Hour Pillar is method-sensitive: civil clock time gives ${civilHourPillar.label}, true solar time gives ${hourPillar.label}. The true-solar-time result is used as primary; the civil-time result is retained for comparison.`,
                });
            }
        }
        const pillars = [yearPillar, monthPillar, dayPillar, ...(hourPillar ? [hourPillar] : [])];
        const elementCounts = countElements(pillars);
        const polarityCounts = countPolarities(pillars);
        const rawPhaseBalance = calculateRawPhaseBalance(pillars);
        const hiddenStemBalance = calculateHiddenStemPhaseBalance(pillars);
        const seasonalContext = calculateSeasonalContext(monthPillar.branch.index, monthPillar.branch.name, dayMaster.element);
        const dayMasterStrength = calculateDayMasterStrength(pillars, dayMaster.element, seasonalContext);
        const relationships = detectBaziRelationships(pillars);
        const luckPillars = calculateLuckPillars(birthDate, monthPillar.sexagenaryIndex, activeBoundary.longitude, activeBoundaryDate, dayMaster);
        const tcmConstitution = buildTcmConstitution(rawPhaseBalance, dayMaster.element, seasonalContext);
        const methodology = {
            calendarBasis: 'Solar-term (Jie) based Ganzhi calendar; Chinese Lunar New Year is not used as a boundary.',
            yearBoundary: 'Exact Li Chun transition, calculated via numerical solar-longitude search (not a fixed Gregorian date).',
            monthBoundary: 'The 12 Jie (odd) solar terms, 30 degrees apart, calculated via numerical solar-longitude search.',
            solarTermSource: 'astronomy-engine 2.1.19 SearchSunLongitude (real ecliptic-longitude root finding).',
            birthTimeBasis: birthTimePrecision,
            dayRolloverRule: 'Civil local midnight (Gregorian calendar date at the birth location). True solar time never shifts which calendar day anchors the Day Pillar.',
            ziHourRule: 'Single Zi-hour convention: 23:00-00:59 is one continuous Zi branch window; the Day Pillar does not advance until civil local midnight ("early/late Zi" splitting is not applied).',
            timezoneSource: moment.timeZone ?? 'Unavailable',
            trueSolarTimeEnabled: true,
            longitudeCorrectionEnabled: true,
            equationOfTimeEnabled: true,
            hiddenStemModel: HIDDEN_STEM_WEIGHTING_MODEL,
            elementWeightingModel: DAY_MASTER_STRENGTH_MODEL_VERSION,
            tenGodsModel: TEN_GODS_MODEL,
            luckCycleDirectionRule: 'Both forward and reverse decade sequences are calculated and the natal chart does not choose between them; the Forecast applies Year Stem polarity with the body selected at onboarding, and chooses no direction when that body was left undefined.',
            luckCycleStartRule: 'Start age/date from elapsed time to the nearest Jie solar-term boundary, converted at 3 days = 1 year (does not require gender).',
            version: METHODOLOGY_VERSION,
        };
        const limitations = [
            'Hidden-stem weighting uses one commonly cited conventional percentage model; it is not a universal standard across BaZi schools.',
            'Day Master strength is a model-derived balancing hypothesis (see Five Phase balance section), not a definitive Useful God (Yong Shen) determination.',
            'Stem and branch combinations/punishments show structural presence only; elemental transformation is never asserted since the seasonal/structural conditions that would confirm it are not modeled.',
            'Luck Pillar direction (forward/reverse) follows Year Stem polarity and the body selected at onboarding. Both sequences are calculated and the natal chart does not choose between them; the Forecast applies the rule, and chooses no direction when the body was left undefined.',
            'TCM content is traditional correspondence and non-diagnostic reflection only. It does not diagnose, does not prescribe treatment, and is not medical advice.',
        ];
        if (!birthTimeWasSupplied) {
            limitations.unshift('Birth time was not supplied. The Hour Pillar is unavailable rather than inferred from the 12:00 local-noon fallback.', 'Year and Month solar-term boundaries were evaluated at the shared 12:00 local-noon estimate and may be approximate on a boundary day.');
        }
        return {
            status: 'calculated',
            engine: ENGINE,
            frame: FRAME,
            birthMomentUtc: moment.utcDateTime,
            birthTimePrecision,
            solarYear,
            solarYearBoundaryUtc: liChun.toISOString(),
            activeSolarTerm: {
                name: activeBoundary.name,
                character: activeBoundary.character,
                longitude: activeBoundary.longitude,
                monthIndex,
                boundaryUtc: activeBoundaryDate.toISOString(),
            },
            yearPillar,
            monthPillar,
            dayPillar,
            hourPillar,
            civilHourPillar,
            dayMaster,
            elementCounts,
            polarityCounts,
            trueSolarTime,
            rawPhaseBalance,
            hiddenStemBalance,
            seasonalContext,
            dayMasterStrength,
            relationships,
            luckPillars,
            tcmConstitution,
            methodology,
            warnings,
            limitations,
            trace: [
                { label: 'Engine', value: ENGINE },
                { label: 'Frame', value: FRAME },
                { label: 'Local birth date', value: moment.localDate },
                { label: 'Effective local time', value: moment.localTime },
                { label: 'Birth time precision', value: birthTimePrecision },
                { label: 'IANA timezone', value: moment.timeZone ?? 'Unavailable' },
                { label: 'UTC birth moment', value: moment.utcDateTime },
                { label: 'Longitude', value: String(longitude) },
                { label: 'Sun apparent longitude', value: `${sunLongitude.toFixed(6)} degrees` },
                { label: 'Li Chun boundary UTC', value: liChun.toISOString() },
                { label: 'BaZi solar year', value: String(solarYear) },
                { label: 'Active month Jie', value: `${activeBoundary.name} (${activeBoundary.character}) / ${activeBoundary.longitude} degrees` },
                { label: 'Active Jie boundary UTC', value: activeBoundaryDate.toISOString() },
                { label: 'Month index from Li Chun', value: String(monthIndex + 1) },
                { label: 'Gregorian Julian Day Number', value: String(julianDayNumber) },
                { label: 'Day-cycle formula', value: `(JDN + ${DAY_CYCLE_JDN_OFFSET}) mod 60 = ${dayCycleIndex}` },
                { label: 'Day boundary convention', value: 'Local civil midnight' },
                { label: 'Zi-hour convention', value: 'Single Zi-hour (no early/late split)' },
                { label: 'Civil clock time', value: trueSolarTime.civilLocalDateTime },
                { label: 'True solar time', value: trueSolarTime.trueSolarLocalDateTime },
                { label: 'Longitude/meridian correction', value: `${trueSolarTime.longitudeMeridianCorrectionMinutes} minutes` },
                { label: 'Equation of Time', value: `${trueSolarTime.equationOfTimeMinutes} minutes` },
                { label: 'Total time correction', value: `${trueSolarTime.totalCorrectionMinutes} minutes` },
                { label: 'Hour basis', value: birthTimeWasSupplied ? 'True solar time (primary); civil clock time retained for comparison' : 'Unavailable: birth time not supplied' },
                { label: 'Element count rule', value: 'Visible stems + primary branch elements; hidden stems counted separately' },
                ...pillars.map((pillar) => ({
                    label: `${pillar.key} pillar`,
                    value: `${pillar.label} / cycle ${pillar.sexagenaryIndex + 1} / ${pillar.symbolicLabel}`,
                })),
                { label: 'Day Master', value: `${dayPillar.stem.name} ${dayPillar.stem.element} / ${dayPillar.stem.polarity}` },
                { label: 'Five Elements (raw)', value: formatElementCounts(elementCounts) },
                { label: 'Yin / Yang', value: `Yin ${polarityCounts.Yin} / Yang ${polarityCounts.Yang}` },
                { label: 'Seasonal governance', value: `Month ruled by ${seasonalContext.rulingPhase}; Day Master ${dayMaster.element} is seasonally ${seasonalContext.dayMasterState}` },
                { label: 'Day Master strength tendency', value: `${dayMasterStrength.tendency} (support ${dayMasterStrength.supportScore} / drain ${dayMasterStrength.drainScore})` },
                { label: 'Relationships detected', value: String(relationships.length) },
                { label: 'Luck Pillars', value: luckPillars.status },
            ],
        };
    }
    catch (error) {
        return blocked([error instanceof Error ? error.message : 'BaZi calculation failed before producing an auditable result.'], birthTimePrecision, moment.trace);
    }
}
function blocked(limitations, birthTimePrecision, trace) {
    return {
        status: 'blocked',
        engine: ENGINE,
        frame: FRAME,
        birthMomentUtc: null,
        birthTimePrecision,
        solarYear: null,
        solarYearBoundaryUtc: null,
        activeSolarTerm: null,
        yearPillar: null,
        monthPillar: null,
        dayPillar: null,
        hourPillar: null,
        civilHourPillar: null,
        dayMaster: null,
        elementCounts: emptyElementCounts(),
        polarityCounts: { Yang: 0, Yin: 0 },
        trueSolarTime: null,
        rawPhaseBalance: null,
        hiddenStemBalance: null,
        seasonalContext: null,
        dayMasterStrength: null,
        relationships: [],
        luckPillars: null,
        tcmConstitution: null,
        methodology: blockedMethodology(birthTimePrecision),
        warnings: [],
        limitations,
        trace: [
            { label: 'Engine', value: ENGINE },
            { label: 'Frame', value: FRAME },
            ...trace,
            ...limitations.map((value, index) => ({ label: `Limitation ${index + 1}`, value })),
        ],
    };
}
function blockedMethodology(birthTimePrecision) {
    return {
        calendarBasis: 'Solar-term (Jie) based Ganzhi calendar; Chinese Lunar New Year is not used as a boundary.',
        yearBoundary: 'Exact Li Chun transition (unavailable: calculation blocked).',
        monthBoundary: 'The 12 Jie solar terms (unavailable: calculation blocked).',
        solarTermSource: 'astronomy-engine 2.1.19 SearchSunLongitude',
        birthTimeBasis: birthTimePrecision,
        dayRolloverRule: 'Civil local midnight',
        ziHourRule: 'Single Zi-hour convention',
        timezoneSource: 'Unavailable',
        trueSolarTimeEnabled: false,
        longitudeCorrectionEnabled: false,
        equationOfTimeEnabled: false,
        hiddenStemModel: HIDDEN_STEM_WEIGHTING_MODEL,
        elementWeightingModel: DAY_MASTER_STRENGTH_MODEL_VERSION,
        tenGodsModel: TEN_GODS_MODEL,
        luckCycleDirectionRule: 'Unavailable: calculation blocked.',
        luckCycleStartRule: 'Unavailable: calculation blocked.',
        version: METHODOLOGY_VERSION,
    };
}
function searchLiChun(gregorianYear) {
    const event = SearchSunLongitude(LI_CHUN_LONGITUDE, new Date(Date.UTC(gregorianYear, 0, 30)), 10);
    if (!event)
        throw new Error(`Li Chun could not be resolved for ${gregorianYear}.`);
    return event.date;
}
function searchActiveMonthBoundary(birthDate, sunLongitude, targetLongitude) {
    const degreesSinceBoundary = normalizeDegrees(sunLongitude - targetLongitude);
    const searchStart = new Date(birthDate.getTime() - (degreesSinceBoundary + 2) * MILLISECONDS_PER_DAY);
    const event = SearchSunLongitude(targetLongitude, searchStart, 5);
    if (!event || event.date.getTime() > birthDate.getTime()) {
        throw new Error('The active BaZi solar-month boundary could not be resolved before the birth moment.');
    }
    return event.date;
}
function pillarFromCycleIndex(key, cycleIndex) {
    return pillarFromStemBranch(key, mod(cycleIndex, 10), mod(cycleIndex, 12), mod(cycleIndex, 60));
}
function pillarFromStemBranch(key, stemIndex, branchIndex, knownCycleIndex) {
    const stem = HEAVENLY_STEMS[stemIndex];
    const branch = EARTHLY_BRANCHES[branchIndex];
    if (!stem || !branch)
        throw new Error(`BaZi pillar indexes are invalid: stem ${stemIndex}, branch ${branchIndex}.`);
    const sexagenaryIndex = knownCycleIndex ?? findSexagenaryIndex(stemIndex, branchIndex);
    return {
        key,
        stem,
        branch,
        sexagenaryIndex,
        label: `${stem.name} ${branch.name}`,
        symbolicLabel: `${stem.polarity} ${stem.element} ${branch.animal}`,
        hiddenStems: resolveHiddenStems(branchIndex),
        tenGod: null,
        hiddenStemTenGods: [],
    };
}
function attachTenGods(pillar, dayMaster) {
    pillar.tenGod = pillar.key === 'Day' ? null : calculateTenGod(dayMaster, pillar.stem);
    pillar.hiddenStemTenGods = pillar.hiddenStems.map((contribution) => ({
        contribution,
        tenGod: calculateTenGod(dayMaster, contribution.stem),
    }));
}
function findSexagenaryIndex(stemIndex, branchIndex) {
    for (let index = 0; index < SEXAGENARY_CYCLE_LENGTH; index += 1) {
        if (index % 10 === stemIndex && index % 12 === branchIndex)
            return index;
    }
    throw new Error(`Stem ${stemIndex} and branch ${branchIndex} do not form a valid sexagenary pair.`);
}
function resolveHourPillar(dayStemIndex, time) {
    const branchIndex = Math.floor(((time.hour + 1) % 24) / 2);
    const ziHourStemIndex = (dayStemIndex % 5) * 2;
    const stemIndex = mod(ziHourStemIndex + branchIndex, 10);
    return pillarFromStemBranch('Hour', stemIndex, branchIndex);
}
/**
 * The annual pillar for a calendar date, on the same Li Chun year boundary the
 * natal engine uses.
 *
 * WHY IT LIVES HERE AND IS EXPORTED RATHER THAN REIMPLEMENTED.
 * The forecast needs the year the reader is currently IN, and that is the same
 * calculation the natal year pillar already performs - the Li Chun search, the
 * `solarYear - JIA_ZI_YEAR` offset, the sexagenary index. Reimplementing it in
 * the forecast would put two copies of a solar-term boundary rule in the tree,
 * and the first time one was corrected they would disagree about which year a
 * late-January date belongs to. So the formula stays in one place and the
 * forecast calls it.
 *
 * Deterministic and side-effect free, exactly like the natal path: no clock is
 * read here, the date arrives from the caller.
 */
export function annualPillarFor(date, dayMaster) {
    const gregorianYear = date.getUTCFullYear();
    const liChun = searchLiChun(gregorianYear);
    const solarYear = date.getTime() >= liChun.getTime() ? gregorianYear : gregorianYear - 1;
    const pillar = pillarFromCycleIndex('Year', mod(solarYear - JIA_ZI_YEAR, SEXAGENARY_CYCLE_LENGTH));
    attachTenGods(pillar, dayMaster);
    return { pillar, solarYear, liChunUtc: liChun.toISOString() };
}
/**
 * THE ANIMAL AND PHASE A GIVEN BAZI SOLAR YEAR IS KNOWN BY - "Fire Horse".
 *
 * Same sexagenary offset the year pillar uses, same two tables, no third copy
 * of the rule. It deliberately does NOT search Li Chun: the caller states which
 * SOLAR year it means, and that is the whole point of the signature.
 *
 * THE BOUNDARY IS THE CALLER'S PROBLEM, AND IT IS A REAL ONE. A BaZi year does
 * not start on 1 January - it starts at Li Chun, in the first days of February.
 * A date in January belongs to the PREVIOUS solar year and therefore to the
 * previous animal. Anything that needs the animal governing a particular DATE
 * must go through `annualPillarFor`, which does the Li Chun search; this
 * function is for labelling a year, not for classifying a moment.
 */
export function zodiacYearFor(solarYear) {
    const cycleIndex = mod(solarYear - JIA_ZI_YEAR, SEXAGENARY_CYCLE_LENGTH);
    const stem = HEAVENLY_STEMS[mod(cycleIndex, 10)];
    const branch = EARTHLY_BRANCHES[mod(cycleIndex, 12)];
    if (!stem || !branch)
        throw new Error(`BaZi year index is invalid for ${solarYear}.`);
    return { element: stem.element, animal: branch.animal };
}
export function gregorianJulianDayNumber(year, month, day) {
    const a = Math.floor((14 - month) / 12);
    const shiftedYear = year + 4800 - a;
    const shiftedMonth = month + (12 * a) - 3;
    return day
        + Math.floor(((153 * shiftedMonth) + 2) / 5)
        + (365 * shiftedYear)
        + Math.floor(shiftedYear / 4)
        - Math.floor(shiftedYear / 100)
        + Math.floor(shiftedYear / 400)
        - 32045;
}
function countElements(pillars) {
    const counts = emptyElementCounts();
    for (const pillar of pillars) {
        counts[pillar.stem.element] += 1;
        counts[pillar.branch.element] += 1;
    }
    return counts;
}
function countPolarities(pillars) {
    const counts = { Yang: 0, Yin: 0 };
    for (const pillar of pillars) {
        counts[pillar.stem.polarity] += 1;
        counts[pillar.branch.polarity] += 1;
    }
    return counts;
}
function emptyElementCounts() {
    return { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };
}
function formatElementCounts(counts) {
    return BAZI_ELEMENTS.map((element) => `${element} ${counts[element]}`).join(' / ');
}
function parseLocalDate(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!match)
        return null;
    return { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) };
}
function parseLocalTime(value) {
    const match = /^(\d{2}):(\d{2})$/.exec(value);
    if (!match)
        return null;
    const hour = Number(match[1]);
    const minute = Number(match[2]);
    if (hour > 23 || minute > 59)
        return null;
    return { hour, minute };
}
function parseNaiveTime(naiveDateTime) {
    const match = /T(\d{2}):(\d{2})/.exec(naiveDateTime);
    if (!match)
        throw new Error(`Could not parse time of day from "${naiveDateTime}".`);
    return { hour: Number(match[1]), minute: Number(match[2]) };
}
function normalizeDegrees(value) {
    return ((value % 360) + 360) % 360;
}
function mod(value, divisor) {
    return ((value % divisor) + divisor) % divisor;
}
