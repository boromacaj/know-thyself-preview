import { birthTimePrecisionOf } from '../birthTimePrecision.js?v=d9f39e7';
import { parseCalendarDate } from '../numerology-forecast/personalCycles.js?v=d9f39e7';
export function dayForecastInputFrom(experience, options) {
    const birth = parseCalendarDate(String(experience.input.birthDate ?? ''));
    if (!birth)
        return null;
    const chart = experience.pillars.find((pillar) => pillar.id === 'western-astrology')?.westernAstrologyChart;
    const bazi = experience.pillars.find((pillar) => pillar.id === 'bazi-tcm')?.baziChart?.bazi;
    const certainty = chart?.timePrecision ?? birthTimePrecisionOf(experience.input);
    const exact = certainty === 'exact' && !chart?.anglesSuppressed;
    const ascendant = chart?.astrology?.houses?.angles?.ascendant?.signIndex;
    return {
        birth,
        selected: options.selected,
        timeZones: {
            device: options.deviceTimeZone,
            birthPlace: experience.input.birthTimeZone ?? null,
        },
        natalPositions: chart?.astrology?.ephemeris?.positions ?? [],
        birthTime: exact ? 'exact' : certainty === 'approximate' ? 'approximate' : 'unknown',
        ascendantSignIndex: exact && typeof ascendant === 'number' ? ascendant : null,
        dayMaster: bazi?.dayMaster ?? null,
        vessel: options.vessel,
        yearStemPolarity: (bazi?.yearPillar?.stem?.polarity ?? null),
        luckPillars: bazi?.luckPillars ? { forward: bazi.luckPillars.forward, reverse: bazi.luckPillars.reverse } : null,
    };
}
