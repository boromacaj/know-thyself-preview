import { CYCLE_KEYWORD, DAY_CONTENT, MONTH_CONTENT, YEAR_CONTENT, } from './forecastContent.js?v=b5ef5ed';
import { lunarGuidanceFor } from './lunarGuidance.js?v=b5ef5ed';
import { planComposition } from './temporalComposition.js?v=b5ef5ed';
import { MONTH_NAMES, daysInMonth, personalCyclesFor, personalDayOf, personalMonthOf, personalYearOf, } from './personalCycles.js?v=b5ef5ed';
const asCycle = (value) => value;
/**
 * The methodology decisions the reader is entitled to know, stated in the UI
 * rather than buried. Both are genuine disagreements in the field.
 */
export const METHODOLOGY_NOTE = 'Personal Year turns on 1 January, not on your birthday - both conventions exist and this one is implemented. '
    + 'Master numbers 11 and 22 are reduced in these cycles, because they are a natal-chart property rather than a transient one. '
    + 'Symbolic reflection only: nothing here predicts events.';
/**
 * "Most relevant months" is DERIVED, not written per year, so it cannot drift
 * from the arithmetic:
 *   - every month whose Personal Month equals the Personal Year (the year's own
 *     theme concentrated),
 *   - the month whose Personal Month is 1 (the year's practical opening),
 *   - the month whose Personal Month is 9 (its clearing).
 * Over twelve months some numbers recur, so a marker may appear more than once.
 */
function markersFor(personalYear, monthNumbers) {
    const markers = [];
    monthNumbers.forEach((personalMonth, index) => {
        const month = index + 1;
        const monthName = MONTH_NAMES[index];
        if (personalMonth === personalYear) {
            markers.push({
                month,
                monthName,
                personalMonth,
                reason: `Personal Month ${personalMonth} matches the Personal Year - the year's own theme, concentrated.`,
            });
            return;
        }
        if (personalMonth === 1) {
            markers.push({
                month, monthName, personalMonth,
                reason: 'Personal Month 1 - the year\'s opening emphasis, suited to starting.',
            });
            return;
        }
        if (personalMonth === 9) {
            markers.push({
                month, monthName, personalMonth,
                reason: 'Personal Month 9 - the year\'s clearing emphasis, suited to finishing and handing over.',
            });
        }
    });
    return markers;
}
function resonanceForYear(personalYear, lifePath) {
    if (!lifePath || personalYear !== lifePath)
        return null;
    return {
        kind: 'personal-year-matches-life-path',
        text: `Your Personal Year (${personalYear}) matches your Life Path (${lifePath}). `
            + 'The year\'s theme and your standing theme are the same one, so this year tends to feel characteristic rather than unfamiliar. '
            + 'This is a statement that two calculated numbers match - no extra arithmetic is applied.',
    };
}
/*
 * The day's note says the match once. It sits directly under the composed
 * reading - which may already have said that today repeats the year or the
 * month - so it names only what is new: that the number is also the reader's
 * own Life Path.
 */
function resonanceForDay(personalDay, lifePath) {
    if (!lifePath || personalDay !== lifePath)
        return null;
    return {
        kind: 'personal-day-matches-life-path',
        text: `Your Life Path is ${lifePath} too, so the day's theme is also your standing theme.`,
    };
}
export function buildYearView(input, year) {
    const trace = personalYearOf(input.birth, year);
    const personalYear = asCycle(trace.result);
    const monthNumbers = Array.from({ length: 12 }, (_, index) => asCycle(personalMonthOf(personalYear, index + 1).result));
    return {
        year,
        personalYear,
        keyword: CYCLE_KEYWORD[personalYear],
        trace,
        content: YEAR_CONTENT[personalYear],
        monthNumbers,
        markers: markersFor(personalYear, monthNumbers),
        resonance: resonanceForYear(personalYear, input.lifePath),
    };
}
export function buildMonthView(input, year, month) {
    const personalYear = personalYearOf(input.birth, year).result;
    const trace = personalMonthOf(personalYear, month);
    const personalMonth = asCycle(trace.result);
    const total = daysInMonth(year, month);
    const dayNumbers = Array.from({ length: total }, (_, index) => asCycle(personalDayOf(personalMonth, index + 1).result));
    return {
        year,
        month,
        monthName: MONTH_NAMES[month - 1],
        personalMonth,
        keyword: CYCLE_KEYWORD[personalMonth],
        trace,
        content: MONTH_CONTENT[personalMonth],
        dayNumbers,
    };
}
export function buildDayView(input, date) {
    const cycles = personalCyclesFor(input.birth, date);
    const personalDay = asCycle(cycles.personalDay);
    const personalYear = asCycle(cycles.personalYear);
    const personalMonth = asCycle(cycles.personalMonth);
    return {
        date,
        personalDay,
        personalYear,
        personalMonth,
        composition: planComposition({ year: personalYear, month: personalMonth, day: personalDay }),
        keyword: CYCLE_KEYWORD[personalDay],
        trace: cycles.dayTrace,
        content: DAY_CONTENT[personalDay],
        resonance: resonanceForDay(personalDay, input.lifePath),
        lunar: lunarGuidanceFor(date),
    };
}
export function buildForecast(input) {
    return {
        birth: input.birth,
        selected: input.selected,
        year: buildYearView(input, input.selected.year),
        month: buildMonthView(input, input.selected.year, input.selected.month),
        day: buildDayView(input, input.selected),
        methodologyNote: METHODOLOGY_NOTE,
    };
}
