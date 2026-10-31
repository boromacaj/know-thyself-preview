import { annualPillarFor } from '../bazi/baziEngine.js?v=53c0693';
import { MAJOR_ASPECTS, angularDistance } from '../astrology/aspectEngine.js?v=53c0693';
import { calculateEphemeris } from '../astrology/ephemerisEngine.js?v=53c0693';
import { personalCyclesFor } from '../numerology-forecast/personalCycles.js?v=53c0693';
import { resolveLuckDirection } from './luckPillarDirection.js?v=53c0693';
/*
 * WHAT IS ACTUALLY TRUE OF THIS PERIOD.
 *
 * Every fact here comes out of an engine this app already ships, called with the
 * forecast moment instead of the birth moment. Nothing new is calculated and no
 * doctrine is invented: the ephemeris that places the natal Sun places the
 * transiting Sun, the sexagenary formula that gives the birth year pillar gives
 * the current one, and the Personal Year arithmetic is untouched.
 *
 * WHY THIS IS A SEPARATE FILE FROM THE ENGINES
 * Because a forecast is a QUESTION put to those engines, not a new one. Keeping
 * the question here means the engines stay locale-free, clock-free and unaware
 * that a forecast exists - which is the property that makes them checkable.
 *
 * NO CLOCK IS READ IN THIS FILE. The period arrives from the caller, the same way
 * `buildForecast` has always taken its selected date, so the same profile and the
 * same date produce the same facts on any machine on any day.
 *
 * WHAT IS DELIBERATELY ABSENT
 * Human Design has no timing layer here. The system does have one - transits
 * activating gates - but reading it requires doctrine about what a transiting
 * activation MEANS against a defined channel, and that is not in the knowledge
 * base. Inventing it to fill a fourth column would be exactly the thing the
 * project forbids, so HD is reported as a missing system with the reason stated.
 */
/** Bodies slow enough that an aspect from them describes a season, not a day. */
const SLOW = new Set(['Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto']);
/** The natal points worth aspecting. Angles are excluded when the time is estimated. */
const PERSONAL = new Set(['Sun', 'Moon', 'Mercury', 'Venus', 'Mars']);
const iso = (date) => date.toISOString().slice(0, 10);
const round = (value) => Math.round(value * 100) / 100;
/** Midday UTC on the selected day: a transit position needs a moment, not a date. */
const momentOf = (date) => new Date(Date.UTC(date.year, date.month - 1, date.day, 12, 0, 0));
/* ------------------------------------------------------------- numerology */
function numerologyFacts(input) {
    const cycles = personalCyclesFor(input.birth, input.selected);
    const { year, month, day } = input.selected;
    const monthEnd = new Date(Date.UTC(year, month, 0));
    return [
        {
            id: `numerology:personal-year:${cycles.personalYear}`,
            system: 'numerology',
            fact: `Personal Year ${cycles.personalYear}`,
            sourceEntity: 'personalYear',
            band: 'long',
            strength: 'strong',
            window: { from: `${year}-01-01`, to: `${year}-12-31` },
            provenance: { number: cycles.personalYear, convention: 'calendar-year-turnover' },
        },
        {
            id: `numerology:personal-month:${cycles.personalMonth}`,
            system: 'numerology',
            fact: `Personal Month ${cycles.personalMonth}`,
            sourceEntity: 'personalMonth',
            band: 'mid',
            strength: 'moderate',
            window: { from: `${year}-${String(month).padStart(2, '0')}-01`, to: iso(monthEnd) },
            provenance: { number: cycles.personalMonth },
        },
        {
            id: `numerology:personal-day:${cycles.personalDay}`,
            system: 'numerology',
            fact: `Personal Day ${cycles.personalDay}`,
            sourceEntity: 'personalDay',
            band: 'short',
            strength: 'slight',
            window: {
                from: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
                to: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
            },
            provenance: { number: cycles.personalDay },
        },
    ];
}
/* ------------------------------------------------------------------- BaZi */
/*
 * THE DATES A BAZI SOLAR YEAR COVERS, FROM ITS OWN LI CHUN.
 *
 * The window used to be written as 4 February to 3 February for every year.
 * Li Chun falls on the 3rd, 4th or 5th, and a date belongs to the new solar
 * year when the instant this layer classifies it by - its 12:00 UTC, as
 * momentOf() builds it - is at or after Li Chun. So the first date of the year
 * is the one whose noon comes first after Li Chun, and the last is the day
 * before the next year's first. annualPillarFor() is asked for 1 March of each
 * year - always after that year's Li Chun - so the Li Chun it reports is the
 * one that opens it. Display only: nothing in the scoring reads a window.
 */
function solarYearWindow(solarYear, dayMaster) {
    const firstDate = (year) => {
        const liChun = new Date(annualPillarFor(new Date(Date.UTC(year, 2, 1, 12)), dayMaster).liChunUtc);
        const noon = Date.UTC(liChun.getUTCFullYear(), liChun.getUTCMonth(), liChun.getUTCDate(), 12);
        return new Date(noon >= liChun.getTime() ? noon : noon + 86_400_000);
    };
    const next = firstDate(solarYear + 1);
    return { from: iso(firstDate(solarYear)), to: iso(new Date(next.getTime() - 86_400_000)) };
}
function baziFacts(input) {
    if (!input.dayMaster) {
        return {
            facts: [], ok: false, withheld: [],
            reason: 'The BaZi chart could not be calculated for this profile.',
        };
    }
    const withheld = [];
    const moment = momentOf(input.selected);
    const facts = [];
    const annual = annualPillarFor(moment, input.dayMaster);
    const tenGod = annual.pillar.tenGod;
    facts.push({
        id: `bazi:annual-pillar:${annual.pillar.stem.name}-${annual.pillar.branch.name}`,
        system: 'bazi',
        fact: `Annual pillar ${annual.pillar.stem.name} ${annual.pillar.branch.name}`,
        /* The Ten God is what makes the year mean something to THIS chart rather
           than to the calendar, so it is the entity the contribution keys off. */
        sourceEntity: tenGod ? `annualTenGod-${tenGod.category}` : 'annualPillar',
        band: 'mid',
        strength: 'moderate',
        window: solarYearWindow(annual.solarYear, input.dayMaster),
        provenance: {
            stem: annual.pillar.stem.name,
            branch: annual.pillar.branch.name,
            solarYear: annual.solarYear,
            liChunUtc: annual.liChunUtc,
            tenGod: tenGod?.tenGod ?? 'none',
            tenGodCategory: tenGod?.category ?? 'none',
        },
    });
    /*
     * THE ACTIVE LUCK PILLAR: a ten-year chapter, and the longest thing in the
     * forecast. Already computed by the natal engine; the only work here is
     * picking which of the eight the reader is currently standing in.
     *
     * The engine returns both directions and refuses to choose, because direction
     * depends on the body and the natal engine is never told it. The forecast IS
     * told - onboarding collects it - so the choice is made in
     * luckPillarDirection.ts and recorded in the provenance below with the rule
     * and the reason, and when the rule has no answer the chapter is withheld
     * instead of guessed.
     */
    const resolution = resolveLuckDirection(input.yearStemPolarity, input.vessel);
    const sequence = resolution.direction === 'forward'
        ? input.luckPillars?.forward
        : resolution.direction === 'reverse' ? input.luckPillars?.reverse : null;
    if (!resolution.direction) {
        withheld.push({
            code: `luckPillar.${resolution.code}`,
            what: 'BaZi luck pillar (Da Yun)',
            reason: resolution.reason,
        });
    }
    const entries = sequence?.entries ?? [];
    if (entries.length > 0) {
        const ageYears = (moment.getTime() - Date.UTC(input.birth.year, input.birth.month - 1, input.birth.day))
            / (365.2425 * 24 * 60 * 60 * 1000);
        const active = [...entries].reverse().find((entry) => ageYears >= entry.startAgeYears) ?? null;
        if (active) {
            const next = entries.find((entry) => entry.sequenceNumber === active.sequenceNumber + 1);
            facts.push({
                id: `bazi:luck-pillar:${active.stem.name}-${active.branch.name}`,
                system: 'bazi',
                fact: `Luck pillar ${active.stem.name} ${active.branch.name}`,
                sourceEntity: active.tenGod ? `luckTenGod-${active.tenGod.category}` : 'luckPillar',
                band: 'long',
                strength: 'strong',
                window: {
                    from: active.startDateUtc.slice(0, 10),
                    to: next ? next.startDateUtc.slice(0, 10) : `${input.birth.year + 90}-01-01`,
                },
                provenance: {
                    stem: active.stem.name,
                    branch: active.branch.name,
                    sequenceNumber: active.sequenceNumber,
                    startAgeYears: round(active.startAgeYears),
                    ageAtPeriod: round(ageYears),
                    tenGod: active.tenGod?.tenGod ?? 'none',
                    tenGodCategory: active.tenGod?.category ?? 'none',
                    direction: resolution.direction ?? 'unresolved',
                    directionRule: resolution.rule,
                    directionReason: resolution.reason,
                },
            });
        }
    }
    return { facts, ok: true, reason: '', withheld };
}
/* -------------------------------------------------------------- astrology */
function astrologyFacts(input) {
    if (input.natalPositions.length === 0) {
        return { facts: [], ok: false, reason: 'The natal chart could not be calculated, so nothing can transit it.' };
    }
    const moment = momentOf(input.selected);
    const transiting = calculateEphemeris({
        status: 'ready',
        localDate: iso(moment),
        localTime: '12:00',
        timeZone: 'UTC',
        utcDateTime: moment.toISOString(),
        julianDate: null,
        limitations: [],
        trace: [],
    });
    const facts = [];
    /*
     * TRANSIT TO NATAL, and only the contacts worth a reader's attention.
     *
     * A slow transiting body making a close aspect to a personal natal point is a
     * period a person can actually feel; Mercury squaring natal Neptune for six
     * hours is not, and printing it would be the "two-day influence with dramatic
     * prose" the brief warns about. So the filter is deliberate and narrow:
     *   - the transiting body must be slow (Jupiter outward),
     *   - the natal point must be personal (Sun through Mars),
     *   - the orb must be tight, tighter than the natal chart's own limits.
     */
    for (const transit of transiting.positions) {
        if (!SLOW.has(transit.body))
            continue;
        for (const natal of input.natalPositions) {
            if (!PERSONAL.has(natal.body))
                continue;
            const separation = angularDistance(transit.longitude, natal.longitude);
            const match = MAJOR_ASPECTS
                .map((aspect) => ({ aspect, orb: Math.abs(separation - aspect.angle) }))
                .sort((left, right) => left.orb - right.orb)[0];
            if (!match || match.orb > 2)
                continue;
            facts.push({
                id: `astrology:transit:${transit.body}-${match.aspect.name}-natal-${natal.body}`.toLowerCase(),
                system: 'astrology',
                fact: `Transiting ${transit.body} ${match.aspect.name} natal ${natal.body}`,
                sourceEntity: `transit-${match.aspect.harmonic}`,
                band: 'mid',
                strength: match.orb <= 1 ? 'moderate' : 'slight',
                window: { from: iso(moment), to: iso(moment) },
                provenance: {
                    transitingBody: transit.body,
                    natalBody: natal.body,
                    aspect: match.aspect.name,
                    harmonic: match.aspect.harmonic,
                    orbDegrees: round(match.orb),
                    transitLongitude: round(transit.longitude),
                    natalLongitude: round(natal.longitude),
                    motion: transit.motionState,
                },
            });
        }
    }
    /* The transiting Sun's sign: the month's own colour, and the one astrological
       fact that is true for everybody but lands differently on each chart. */
    const sun = transiting.positions.find((position) => position.body === 'Sun');
    if (sun) {
        facts.push({
            id: `astrology:transiting-sun:${sun.sign}`.toLowerCase(),
            system: 'astrology',
            fact: `Transiting Sun in ${sun.sign}`,
            sourceEntity: 'transitingSun',
            band: 'mid',
            strength: 'slight',
            window: { from: iso(moment), to: iso(moment) },
            provenance: { sign: sun.sign, longitude: round(sun.longitude), element: sun.element },
        });
    }
    /* The Moon phase, which is the shortest thing here and is banded as such. */
    facts.push({
        id: `astrology:moon-phase:${transiting.moonPhase.name}`.toLowerCase().replace(/[^a-z0-9:-]+/g, '-'),
        system: 'astrology',
        fact: `Moon phase: ${transiting.moonPhase.name}`,
        sourceEntity: 'moonPhase',
        band: 'short',
        strength: 'slight',
        window: { from: iso(moment), to: iso(moment) },
        provenance: {
            phase: transiting.moonPhase.name,
            illumination: round(transiting.moonPhase.illuminationPercent ?? 0),
        },
    });
    return { facts, ok: true, reason: '' };
}
/* ------------------------------------------------------------------ entry */
export function currentFactsFor(input) {
    const facts = [...numerologyFacts(input)];
    const present = ['numerology'];
    const missing = [];
    const bazi = baziFacts(input);
    /*
     * HUMAN DESIGN IS WITHHELD ON PURPOSE, AND ALWAYS.
     *
     * The engine can compute a transit chart perfectly well. What it cannot do is
     * say what a transiting activation MEANS against a defined channel - that is
     * doctrine, and this project's knowledge base does not contain it. Rather than
     * let the fourth pillar quietly vanish from every forecast, the absence is
     * stated with its reason, in the same place the reader meets the rest.
     */
    const withheld = [
        {
            code: 'humanDesign.no-transit-doctrine',
            what: 'Human Design transits',
            reason: 'The Human Design engine can place current activations, but this knowledge base '
                + 'holds no rule for what a transiting gate means against a defined channel, so the '
                + 'system is left out of the period reading rather than improvised.',
        },
        ...bazi.withheld,
    ];
    if (bazi.ok) {
        facts.push(...bazi.facts);
        present.push('bazi');
    }
    else
        missing.push({ system: 'bazi', reason: bazi.reason });
    const astrology = astrologyFacts(input);
    if (astrology.ok) {
        facts.push(...astrology.facts);
        present.push('astrology');
    }
    else
        missing.push({ system: 'astrology', reason: astrology.reason });
    return { facts, present, missing, withheld };
}
