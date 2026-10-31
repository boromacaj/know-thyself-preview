import { dayForecastInputFrom } from '../forecast-v2/dayInputs.js?v=d9f39e7';
import { buildDayForecast } from '../forecast-v2/dayForecast.js?v=d9f39e7';
import { dayLifeCardOf } from '../forecast-v2/dayLifeDynamicsEnglish.js?v=d9f39e7';
import { createProfileExperience } from '../model.js?v=d9f39e7';
import { parseCalendarDate } from '../numerology-forecast/personalCycles.js?v=d9f39e7';
import { adaptPremiumProfile } from '../premium-earth/premiumProfileAdapter.js?v=d9f39e7';
import { buildTemporalSynthesis } from '../temporal-synthesis/buildTemporalSynthesis.js?v=d9f39e7';
import { daysOfYear } from '../temporal-synthesis/forecastPeriods.js?v=d9f39e7';
import { lifeWeights } from '../temporal-synthesis/lifeDynamics.js?v=d9f39e7';
import { isoOf } from './forecastChartData.js?v=d9f39e7';
/* A fictional place: the prime meridian, in a zone that observes daylight saving. Not a real person's birthplace. */
const SAMPLE_ZONE = 'Europe/London';
const SAMPLE_LABEL = 'Sample City, Sampleland';
const SAMPLE_SELECTION = {
    candidate: {
        label: SAMPLE_LABEL,
        latitude: 51.4769,
        longitude: 0,
        country: 'Sampleland',
        region: 'Sample Region',
        provider: 'forecast-graph-lab',
        precision: 'searched',
        source: 'provider-search',
        timeZoneHint: SAMPLE_ZONE,
        timeZoneHintSource: 'forecast-graph-lab',
    },
    timeZone: SAMPLE_ZONE,
    timeZoneSource: 'forecast-graph-lab',
    timeZoneConfidence: 'resolved',
    timeZoneLimitations: [],
    moveCameraOnPresent: false,
};
export const LAB_PROFILES = [
    {
        id: 'sample-a', label: 'Sample A · birth time known', note: 'Invented profile. Exact birth time.',
        vessel: 'female', birthName: 'Sample', birthSurname: 'Alpha', birthDate: '1988-03-14', birthTime: '09:30', birthTimePrecision: 'exact',
    },
    {
        id: 'sample-b', label: 'Sample B · birth time unknown', note: 'Invented profile. No birth time: the Forecast marks its transit details approximate.',
        vessel: 'male', birthName: 'Sample', birthSurname: 'Beta', birthDate: '1994-11-02', birthTime: '', birthTimePrecision: 'unknown',
    },
];
export const findLabProfile = (id) => LAB_PROFILES.find((profile) => profile.id === id) ?? LAB_PROFILES[0];
/** The Forecast's own clock zone for the Day view in the lab: pinned so a screenshot is the same everywhere. */
export const LAB_DEVICE_ZONE = SAMPLE_ZONE;
export function createLabSource(profile) {
    const adapted = adaptPremiumProfile({
        vessel: profile.vessel,
        birthName: profile.birthName,
        birthSurname: profile.birthSurname,
        birthDate: profile.birthDate,
        birthTime: profile.birthTime,
        birthTimePrecision: profile.birthTimePrecision,
        placeQuery: SAMPLE_LABEL,
        placeSelection: SAMPLE_SELECTION,
    });
    if (!adapted.ready || !adapted.input)
        throw new Error(`lab profile ${profile.id} did not adapt: ${adapted.missing.join(', ')}`);
    const experience = createProfileExperience(adapted.input);
    const birth = parseCalendarDate(profile.birthDate);
    if (!birth)
        throw new Error(`lab profile ${profile.id} has no birth date`);
    const astrology = experience.pillars.find((pillar) => pillar.id === 'western-astrology')?.westernAstrologyChart?.astrology;
    const bazi = experience.pillars.find((pillar) => pillar.id === 'bazi-tcm')?.baziChart?.bazi;
    const birthTimeEstimated = Boolean(experience.crossPillarReading?.source?.coverage?.birthTimeEstimated);
    /* The controller's call, argument for argument (numerologyForecastExperience.ts synthesisOn). */
    const synthesisOn = (selected) => buildTemporalSynthesis({
        birth,
        selected,
        natal: experience.crossPillarReading?.source ?? null,
        natalPositions: astrology?.ephemeris?.positions ?? [],
        dayMaster: bazi?.dayMaster ?? null,
        vessel: profile.vessel,
        yearStemPolarity: (bazi?.yearPillar?.stem?.polarity ?? null),
        luckPillars: bazi?.luckPillars ? { forward: bazi.luckPillars.forward, reverse: bazi.luckPillars.reverse } : null,
        birthTimeEstimated,
    });
    const days = new Map();
    const weightsOn = (date) => {
        const key = isoOf(date);
        const known = days.get(key);
        if (known)
            return known;
        const weights = lifeWeights(synthesisOn(date));
        days.set(key, weights);
        return weights;
    };
    const dayCards = new Map();
    return {
        profile,
        birthTimeEstimated,
        weightsOn,
        yearReady: (year) => daysOfYear(year).every((date) => days.has(isoOf(date))),
        warmYear: (year, budgetMs) => {
            const pending = daysOfYear(year).filter((date) => !days.has(isoOf(date)));
            const started = performance.now();
            let index = 0;
            while (index < pending.length && performance.now() - started < budgetMs) {
                weightsOn(pending[index]);
                index += 1;
            }
            return pending.length - index;
        },
        dayCard: (date) => {
            const key = isoOf(date);
            if (dayCards.has(key))
                return dayCards.get(key) ?? null;
            let card = null;
            try {
                const input = dayForecastInputFrom(experience, { selected: date, deviceTimeZone: LAB_DEVICE_ZONE, vessel: profile.vessel });
                card = input ? dayLifeCardOf(buildDayForecast(input, { isToday: false }), { isToday: false }) : null;
            }
            catch {
                card = null;
            }
            dayCards.set(key, card);
            return card;
        },
    };
}
