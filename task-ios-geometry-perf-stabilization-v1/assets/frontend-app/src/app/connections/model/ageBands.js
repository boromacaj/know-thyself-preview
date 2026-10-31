import { ADULT_AGE_YEARS } from './connectionsTypes.js?v=d9f39e7';
/** Age on a given day, or null when the date is not a calendar date or is in the future. */
export function ageOn(birthDate, today) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(birthDate);
    if (!match)
        return null;
    const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])];
    const probe = new Date(Date.UTC(year, month - 1, day));
    if (probe.getUTCFullYear() !== year || probe.getUTCMonth() !== month - 1 || probe.getUTCDate() !== day)
        return null;
    const ty = today.getUTCFullYear();
    const tm = today.getUTCMonth() + 1;
    const td = today.getUTCDate();
    let months = (ty - year) * 12 + (tm - month);
    if (td < day)
        months -= 1;
    if (months < 0)
        return null;
    return { years: Math.floor(months / 12), months: months % 12, totalMonths: months };
}
export function ageBandOf(age) {
    if (age.years >= ADULT_AGE_YEARS)
        return 'adult';
    if (age.totalMonths < 12)
        return 'infant-0-1';
    if (age.totalMonths < 36)
        return 'toddler-1-3';
    if (age.years <= 5)
        return 'preschool-3-5';
    if (age.years <= 8)
        return 'early-school-6-8';
    if (age.years <= 12)
        return 'middle-school-9-12';
    if (age.years <= 15)
        return 'early-adolescence-13-15';
    return 'late-adolescence-16-18';
}
/** True for a person old enough that the relationship is an adult one, whatever role they have. */
export const isAdultAge = (age) => age.years >= ADULT_AGE_YEARS;
