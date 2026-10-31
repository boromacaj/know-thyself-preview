import { MoonPhase, SearchMoonPhase } from 'astronomy-engine';
const PHASE_NAMES = [
    'New Moon',
    'Waxing Crescent',
    'First Quarter',
    'Waxing Gibbous',
    'Full Moon',
    'Waning Gibbous',
    'Last Quarter',
    'Waning Crescent',
];
function phaseNameFor(angle) {
    /* Eight equal 45-degree sectors centred on the four principal phases, which is
       the same convention the astrology pillar's moonPhaseName uses. */
    const index = Math.floor(((angle + 22.5) % 360) / 45) % 8;
    return PHASE_NAMES[index];
}
/**
 * Illuminated fraction of the disc, from the phase angle. Same expression the
 * ephemeris engine uses for the natal chart, so the two never disagree.
 */
function illuminatedPercentFor(angle) {
    return ((1 - Math.cos((angle * Math.PI) / 180)) / 2) * 100;
}
/**
 * The rule table from the methodology, applied to the trend.
 *
 * Every entry carries its source system so the UI can print it. Nothing is
 * presented as universal or as established fact.
 */
function recommendationsFor(trend) {
    const waxing = trend === 'waxing';
    return [
        {
            activity: 'Sowing and planting above-ground crops',
            advice: waxing
                ? 'Traditionally favoured now, while the Moon is filling.'
                : 'Traditionally left until the Moon begins filling again.',
            favoured: waxing,
            source: "Old Farmer's Almanac (moon-phase farming)",
        },
        {
            activity: 'Planting root and below-ground crops',
            advice: waxing
                ? 'Traditionally held back until after the full Moon.'
                : 'Traditionally favoured now, while the Moon is emptying.',
            favoured: !waxing,
            source: "Old Farmer's Almanac (moon-phase farming)",
        },
        {
            activity: 'Pruning, thinning, weeding and mowing',
            advice: waxing
                ? 'Traditionally deferred; growth is said to be running toward the shoot.'
                : 'Traditionally favoured now, to slow regrowth.',
            favoured: !waxing,
            source: "Old Farmer's Almanac (moon-phase farming)",
        },
        {
            activity: 'Transplanting and grafting',
            advice: waxing
                ? 'Traditionally favoured now.'
                : 'Traditionally deferred until the Moon is filling.',
            favoured: waxing,
            source: "Old Farmer's Almanac (moon-phase farming)",
        },
        {
            activity: 'Haircut',
            advice: waxing
                ? 'Custom associates the filling Moon with faster regrowth and length.'
                : 'Custom associates the emptying Moon with slower regrowth and a cut that holds its shape.',
            favoured: true,
            source: 'Lunar hair and nail custom',
        },
        {
            activity: 'Nail cutting',
            advice: waxing
                ? 'Custom associates the filling Moon with faster regrowth.'
                : 'Custom associates the emptying Moon with slower regrowth.',
            favoured: true,
            source: 'Lunar hair and nail custom',
        },
        {
            activity: 'Clearing out and decluttering the home',
            advice: waxing
                ? 'Traditionally kept for the emptying Moon.'
                : 'Traditionally favoured now.',
            favoured: !waxing,
            source: 'European folk household custom',
        },
        {
            activity: 'Preserving, drying and storing',
            advice: waxing
                ? 'Traditionally kept for the emptying Moon, when produce is said to hold less water.'
                : 'Traditionally favoured now.',
            favoured: !waxing,
            source: "Old Farmer's Almanac (moon-phase farming)",
        },
    ];
}
/**
 * Deterministic for a calendar date: the phase is sampled at a fixed 12:00 UTC,
 * so the same date always yields the same guidance. Near a phase boundary a user
 * in a distant timezone may see the neighbouring phase named - stated as a
 * limitation in the methodology rather than papered over.
 */
/**
 * THE PHASE ALONE, FOR ANYTHING THAT ONLY NEEDS TO DRAW IT.
 *
 * `lunarGuidanceFor` builds a nine-row recommendation table on every call. The
 * day rail needs one number per day for thirty-one days and none of those rows,
 * so it would have paid for two hundred and seventy strings it throws away.
 *
 * NO NEW ARITHMETIC. Same call, same 12:00 UTC sampling, same normalisation,
 * and `lunarGuidanceFor` now goes through this too - so there is exactly one
 * definition of what phase a date is on, and the disc on a chip can never
 * disagree with the phase named in the lunar block below it.
 *
 * NOTE ON WHAT THIS IS AND IS NOT. The phase is an astronomical fact, from the
 * same astronomy-engine call the Western Astrology pillar uses. The FOLK
 * ALMANAC RULES built on top of it are the quarantined part - those stay in
 * `recommendations`, under their own heading, with their source named on every
 * row. Drawing the Moon's actual shape carries none of that and claims none of
 * it.
 */
export function moonPhaseFor(date) {
    const instant = new Date(Date.UTC(date.year, date.month - 1, date.day, 12, 0, 0));
    const angle = ((MoonPhase(instant) % 360) + 360) % 360;
    return {
        angle,
        illuminatedFraction: illuminatedPercentFor(angle) / 100,
        waxing: angle < 180,
    };
}
const MAJOR_TARGETS = [
    ['new', 'New Moon', 0], ['first-quarter', 'First Quarter', 90], ['full', 'Full Moon', 180], ['last-quarter', 'Last Quarter', 270],
];
/** The calendar date (YYYY-MM-DD) an instant falls on in a time zone; an unknown zone is read as UTC. */
export function localDateKey(instant, timeZone) {
    try {
        return new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(instant);
    }
    catch {
        return new Intl.DateTimeFormat('en-CA', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' }).format(instant);
    }
}
export function majorMoonPhaseOn(date, timeZone) {
    const key = `${String(date.year).padStart(4, '0')}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
    /* Every zone is within a day of UTC, so searching from the day before to the day after finds any instant that can fall on this local date. */
    const from = new Date(Date.UTC(date.year, date.month - 1, date.day - 1, 0, 0, 0));
    for (const [kind, phaseName, longitude] of MAJOR_TARGETS) {
        const found = SearchMoonPhase(longitude, from, 3);
        if (found && localDateKey(found.date, timeZone) === key)
            return { kind, phaseName, instant: found.date };
    }
    return null;
}
export function lunarGuidanceFor(date) {
    const { angle: phaseAngle, waxing } = moonPhaseFor(date);
    const trend = waxing ? 'waxing' : 'waning';
    return {
        phaseAngle,
        phaseName: phaseNameFor(phaseAngle),
        illuminatedPercent: illuminatedPercentFor(phaseAngle),
        trend,
        disclaimer: 'Folk almanac custom, not numerology and not science. Listed separately, with the tradition named for each item.',
        recommendations: recommendationsFor(trend),
    };
}
