import { SearchSunLongitude } from 'astronomy-engine';
import { EARTHLY_BRANCHES, HEAVENLY_STEMS } from './data/baziConstants.js?v=d9f39e7';
import { calculateTenGod } from './tenGodsEngine.js?v=d9f39e7';
const MILLISECONDS_PER_DAY = 86_400_000;
const DAYS_PER_LUCK_YEAR = 3;
const LUCK_PILLAR_SPAN_YEARS = 10;
const LUCK_PILLAR_COUNT = 8;
const SEXAGENARY_CYCLE_LENGTH = 60;
/**
 * Da Yun (Luck Pillars) start age/date only depends on distance to the nearest Jie boundary,
 * never on gender. Direction (forward vs. reverse) traditionally depends on Year Stem polarity
 * combined with the body selected at onboarding. This engine computes BOTH directional sequences
 * and does not choose between them; the reading layer applies the rule (Yang stem with a male
 * body, or Yin stem with a female body, runs forward) and leaves the direction unresolved only
 * when the body was deliberately left undefined. Both sequences are returned as labeled
 * methodology alternatives (see section 27 of the project brief), not a single asserted answer.
 */
export function calculateLuckPillars(birthDate, monthPillarSexagenaryIndex, previousJieLongitude, previousJieBoundaryUtc, dayMaster) {
    try {
        const nextJieLongitude = normalizeDegrees(previousJieLongitude + 30);
        const nextJieBoundaryUtc = SearchSunLongitude(nextJieLongitude, birthDate, 35)?.date ?? null;
        if (!nextJieBoundaryUtc) {
            return suppressed('The next solar-term (Jie) boundary after birth could not be resolved.');
        }
        const forward = buildSequence('forward', birthDate, nextJieBoundaryUtc, monthPillarSexagenaryIndex, dayMaster);
        const reverse = buildSequence('reverse', birthDate, previousJieBoundaryUtc, monthPillarSexagenaryIndex, dayMaster);
        return {
            status: 'calculated',
            reasonSuppressed: null,
            forward,
            reverse,
            directionNote: 'Direction (forward vs. reverse) follows Year Stem Yin/Yang polarity together with the body selected at onboarding: a Yang year stem with a male body, or a Yin year stem with a female body, runs forward, and the two remaining combinations run reverse. Both sequences are calculated here and the natal chart does not choose between them; the Forecast applies the rule. When the body was deliberately left undefined no direction is chosen anywhere, because the traditional rule takes a binary and no school extends it.',
        };
    }
    catch (error) {
        return suppressed(error instanceof Error ? error.message : 'Luck Pillars could not be resolved.');
    }
}
function buildSequence(direction, birthDate, boundaryUtc, monthPillarSexagenaryIndex, dayMaster) {
    const daysFromBirthToBoundary = round(Math.abs(boundaryUtc.getTime() - birthDate.getTime()) / MILLISECONDS_PER_DAY);
    const startAgeYears = round(daysFromBirthToBoundary / DAYS_PER_LUCK_YEAR);
    const startDateUtc = new Date(birthDate.getTime() + startAgeYears * 365.2425 * MILLISECONDS_PER_DAY);
    const step = direction === 'forward' ? 1 : -1;
    const entries = Array.from({ length: LUCK_PILLAR_COUNT }, (_, position) => {
        const sequenceNumber = position + 1;
        const sexagenaryIndex = mod(monthPillarSexagenaryIndex + (step * sequenceNumber), SEXAGENARY_CYCLE_LENGTH);
        const stem = HEAVENLY_STEMS[mod(sexagenaryIndex, 10)];
        const branch = EARTHLY_BRANCHES[mod(sexagenaryIndex, 12)];
        const pillarStartDate = new Date(startDateUtc.getTime() + (sequenceNumber - 1) * LUCK_PILLAR_SPAN_YEARS * 365.2425 * MILLISECONDS_PER_DAY);
        return {
            sequenceNumber,
            stem,
            branch,
            sexagenaryIndex,
            label: `${stem.name} ${branch.name}`,
            startAgeYears: round(startAgeYears + (sequenceNumber - 1) * LUCK_PILLAR_SPAN_YEARS),
            startDateUtc: pillarStartDate.toISOString(),
            tenGod: calculateTenGod(dayMaster, stem),
        };
    });
    return {
        direction,
        boundaryUtc: boundaryUtc.toISOString(),
        daysFromBirthToBoundary,
        startAgeYears,
        startDateUtc: startDateUtc.toISOString(),
        entries,
    };
}
function suppressed(reason) {
    return {
        status: 'suppressed',
        reasonSuppressed: reason,
        forward: null,
        reverse: null,
        directionNote: 'Luck Pillars are suppressed rather than fabricated.',
    };
}
function normalizeDegrees(value) {
    return ((value % 360) + 360) % 360;
}
function mod(value, divisor) {
    return ((value % divisor) + divisor) % divisor;
}
function round(value, digits = 6) {
    const scale = 10 ** digits;
    return Math.round(value * scale) / scale;
}
