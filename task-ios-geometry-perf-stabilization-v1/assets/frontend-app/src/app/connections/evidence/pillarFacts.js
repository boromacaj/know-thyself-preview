import { hdChannels } from '../../human-design/data/hdChannels.js?v=d9f39e7';
const MASTERS = new Set([11, 22, 33]);
const rootOf = (value) => (value === 11 ? 2 : value === 22 ? 4 : value === 33 ? 6 : value);
const numberOf = (value) => ({ value, root: rootOf(value), master: MASTERS.has(value) });
/** Half-width of the birth-time window, in days, for the drift of an astrology body. */
const WINDOW_DAYS = { exact: 0, approximate: 2 / 24, unknown: 0.5 };
/** The bodies a contact between two people is read for. The luminaries and personal planets, and the two social planets; nothing slower. */
const CONTACT_BODIES = new Set(['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn']);
export function pillarFactsOf(experience) {
    const precision = experience.input.birthTimePrecision ?? (experience.input.birthTime ? 'exact' : 'unknown');
    const pillar = (id) => experience.pillars.find((entry) => entry.id === id);
    /* ---- astrology ---- */
    const astroChart = pillar('western-astrology')?.westernAstrologyChart;
    const ephemeris = astroChart?.astrology.ephemeris ?? null;
    const astrology = astroChart && ephemeris && astroChart.astrology.status === 'calculated'
        ? {
            bodies: ephemeris.positions
                .filter((position) => CONTACT_BODIES.has(position.body))
                .map((position) => ({
                body: position.body,
                longitude: position.longitude,
                sign: position.sign,
                element: position.element,
                drift: Math.abs(position.speedDegreesPerDay) * WINDOW_DAYS[precision],
            })),
        }
        : null;
    /* ---- bazi ---- */
    const baziChart = pillar('bazi-tcm')?.baziChart;
    const bazi = baziChart && baziChart.bazi.status === 'calculated' && baziChart.bazi.dayMaster
        ? (() => {
            const live = baziChart.bazi;
            const dayMaster = live.dayMaster;
            const window = baziChart.timeWindow;
            const holds = (key) => {
                if (precision === 'exact' || !window)
                    return precision === 'exact';
                const entry = window[key];
                return entry !== null && entry.values.length === 1;
            };
            const candidates = [
                ['Year', live.yearPillar, holds('year')],
                ['Month', live.monthPillar, holds('month')],
                ['Day', live.dayPillar, true],
                ['Hour', live.hourPillar, precision !== 'unknown' && holds('hour')],
            ];
            const pillars = candidates
                .filter(([, item, usable]) => item !== null && usable)
                .map(([key, item]) => ({ key, stem: item.stem.index, branch: item.branch.index, cycle: item.sexagenaryIndex }));
            return {
                dayMaster: { stem: dayMaster.index, element: dayMaster.element, polarity: dayMaster.polarity },
                pillars,
                elementCounts: { ...live.elementCounts },
            };
        })()
        : null;
    /* ---- human design ---- */
    const hdData = pillar('human-design')?.humanDesignBodygraph;
    const humanDesign = hdData && hdData.humanDesign.status === 'calculated'
        ? (() => {
            const live = hdData.humanDesign;
            if (precision === 'exact') {
                return { type: live.type === 'Unavailable' ? null : live.type, authority: live.authority === 'Unavailable' ? null : live.authority, profile: live.profile, gates: [...live.activatedGates].sort((a, b) => a - b), uncertainGates: [], stableOnly: false };
            }
            const envelope = hdData.envelope;
            const stable = (value) => (value && value.stable ? value.values[0] ?? null : null);
            return {
                type: stable(envelope?.type),
                authority: stable(envelope?.authority),
                profile: stable(envelope?.profile),
                gates: envelope ? [...envelope.gates.always].sort((a, b) => a - b) : [],
                uncertainGates: envelope ? [...envelope.gates.sometimes].sort((a, b) => a - b) : [],
                stableOnly: true,
            };
        })()
        : null;
    /* ---- numerology ---- */
    const raw = pillar('numerology')?.numerologyChart?.raw;
    const numerology = raw
        ? {
            'life-path': numberOf(raw.lifePathNumber.finalNumber),
            birthday: numberOf(raw.birthDayNumber.finalNumber),
            expression: numberOf(raw.expressionNumber.finalNumber),
            'soul-urge': numberOf(raw.soulUrgeNumber.finalNumber),
            personality: numberOf(raw.personalityNumber.finalNumber),
        }
        : null;
    return { precision, astrology, bazi, humanDesign, numerology };
}
/** Every Human Design channel whose two gates are both in the set. */
export const channelsFormedBy = (gates) => hdChannels.filter((channel) => gates.has(channel.gates[0]) && gates.has(channel.gates[1])).map((channel) => channel.id);
export const HD_CHANNEL_TABLE = hdChannels;
