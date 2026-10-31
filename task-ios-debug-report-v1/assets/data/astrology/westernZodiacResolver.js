import { westernZodiacInterpretationMap, westernZodiacPrecisionNote, westernZodiacSigns, } from './westernZodiacInterpretationMap.js?v=b5ef5ed';
const maximumDayByMonth = {
    1: 31,
    2: 29,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
};
export function resolveConventionalWesternSunSign(month, day) {
    if (!isValidMonthDay(month, day)) {
        return {
            sign: null,
            interpretation: null,
            precision: 'conventional_date_range',
            requiresEphemerisForExactBoundary: false,
            note: 'No conventional Sun sign was resolved because the supplied month/day is not a valid calendar date.',
            error: 'Invalid month/day. Expected a numeric month from 1-12 and a possible day for that month.',
        };
    }
    const sign = westernZodiacSigns.find((candidate) => isDateWithinSignRange(month, day, candidate));
    if (!sign) {
        return {
            sign: null,
            interpretation: null,
            precision: 'conventional_date_range',
            requiresEphemerisForExactBoundary: false,
            note: 'No conventional Sun sign was resolved from the supplied month/day.',
            error: 'No matching conventional tropical zodiac date range was found.',
        };
    }
    const interpretation = westernZodiacInterpretationMap[sign];
    const requiresEphemerisForExactBoundary = isBoundaryDate(month, day, interpretation);
    return {
        sign,
        interpretation,
        precision: 'conventional_date_range',
        requiresEphemerisForExactBoundary,
        note: requiresEphemerisForExactBoundary
            ? westernZodiacPrecisionNote
            : 'Resolved by conventional tropical Sun sign date range only. No year, time, location, timezone, coordinates, or ephemeris were used.',
    };
}
function isValidMonthDay(month, day) {
    if (!Number.isInteger(month) || !Number.isInteger(day))
        return false;
    const maximumDay = maximumDayByMonth[month];
    return Boolean(maximumDay) && day >= 1 && day <= maximumDay;
}
function isDateWithinSignRange(month, day, sign) {
    const interpretation = westernZodiacInterpretationMap[sign];
    const dateValue = monthDayValue(month, day);
    const startValue = monthDayValue(interpretation.startMonth, interpretation.startDay);
    const endValue = monthDayValue(interpretation.endMonth, interpretation.endDay);
    if (startValue <= endValue) {
        return dateValue >= startValue && dateValue <= endValue;
    }
    return dateValue >= startValue || dateValue <= endValue;
}
function isBoundaryDate(month, day, interpretation) {
    return ((month === interpretation.startMonth && day === interpretation.startDay) ||
        (month === interpretation.endMonth && day === interpretation.endDay));
}
function monthDayValue(month, day) {
    return month * 100 + day;
}
