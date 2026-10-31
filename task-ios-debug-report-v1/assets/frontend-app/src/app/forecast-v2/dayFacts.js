import { INDEPENDENCE_GROUPS } from '../synthesis/foundation/evidenceIndependence.js?v=b5ef5ed';
import { currentFactsFor } from '../temporal-synthesis/currentFacts.js?v=b5ef5ed';
import { computeDayAstrology } from './dayAstrology.js?v=b5ef5ed';
import { CYCLE_ROWS, TEN_GOD_ROWS, cycleTheme, tenGodTheme } from './dayKnowledge.js?v=b5ef5ed';
import { DAY_ENGINE_VERSION } from './dayTypes.js?v=b5ef5ed';
import { localClock, localDayOf, resolveForecastTimeZone } from './localDay.js?v=b5ef5ed';
const CYCLE_MECHANISM = {
    personalYear: 'personal-year', personalMonth: 'personal-month', personalDay: 'personal-day',
};
const describeFact = (fact, timeZone) => {
    const a = fact.aspect;
    const detail = a
        ? ` [orb ${a.peakOrbDegrees}°, ${a.phase}${a.exactAtUtc ? `, exact ${localClock(a.exactAtUtc, timeZone)}` : ''}]`
        : '';
    return `${fact.label} (${fact.scale}, ${fact.strength}${fact.exactness === 'not-applicable' ? '' : `, ${fact.exactness}`})${detail}`;
};
/**
 * The fact layer, readable: background and trigger facts with scale, strength,
 * exactness, orb, phase and local exact time; the independence groups they
 * collapse into; and every layer left out, with the reason. QA only - it names
 * the machinery, and the product's own screens never draw it.
 */
export function describeDayFacts(day) {
    const zone = day.localDay.timeZone;
    const groups = new Map();
    for (const fact of day.facts) {
        const entry = groups.get(fact.independenceGroup) ?? { pillar: fact.pillar, facts: [] };
        entry.facts.push(fact.id);
        groups.set(fact.independenceGroup, entry);
    }
    return {
        engineVersion: day.engineVersion,
        localDay: day.localDay,
        birthTime: day.birthTime,
        backgroundFacts: day.facts.filter((fact) => fact.role === 'background').map((fact) => describeFact(fact, zone)),
        triggerFacts: day.facts.filter((fact) => fact.role === 'trigger').map((fact) => describeFact(fact, zone)),
        independenceGroups: [...groups.entries()]
            .map(([group, entry]) => ({ group, pillar: entry.pillar, facts: entry.facts }))
            .sort((left, right) => left.group.localeCompare(right.group)),
        withheld: day.withheld.map((entry) => `${entry.code}: ${entry.reason}`),
    };
}
export function buildDayFacts(input) {
    const localDay = localDayOf(input.selected, resolveForecastTimeZone(input.timeZones));
    const whole = { fromUtc: localDay.startUtc, toUtc: localDay.endUtc };
    const facts = [];
    const withheld = [];
    /* Numerology and BaZi, from the legacy producer, with no natal chart so no astrology is read from it. */
    const legacy = currentFactsFor({
        birth: input.birth,
        selected: input.selected,
        natalPositions: [],
        dayMaster: input.dayMaster,
        vessel: input.vessel,
        yearStemPolarity: input.yearStemPolarity,
        luckPillars: input.luckPillars,
        birthTimeEstimated: input.birthTime !== 'exact',
    });
    for (const fact of legacy.facts) {
        if (fact.system === 'numerology') {
            const number = Number(fact.provenance.number);
            const row = CYCLE_ROWS[number];
            const mechanism = CYCLE_MECHANISM[fact.sourceEntity];
            if (!row || !mechanism)
                continue;
            const day = mechanism === 'personal-day';
            facts.push({
                id: fact.id,
                pillar: 'numerology',
                mechanism,
                role: day ? 'trigger' : 'background',
                scale: day ? 'daily' : mechanism === 'personal-month' ? 'monthly' : 'annual',
                label: fact.fact,
                theme: cycleTheme(number),
                effects: row.effects,
                emotions: { rising: day ? row.rising ?? [] : [], quieter: day ? row.quieter ?? [] : [] },
                strength: 'moderate',
                exactness: 'not-applicable',
                independenceGroup: INDEPENDENCE_GROUPS.numerology.currentCycle,
                requiresBirthTime: false,
                reliability: 'high',
                inForce: whole,
                provenance: { ...fact.provenance, number },
            });
        }
        else if (fact.system === 'bazi') {
            const category = String(fact.provenance.tenGodCategory ?? 'none');
            const row = TEN_GOD_ROWS[category];
            if (!row)
                continue;
            const luck = fact.id.startsWith('bazi:luck-pillar');
            facts.push({
                id: fact.id,
                pillar: 'bazi',
                mechanism: luck ? 'luck-pillar' : 'annual-pillar',
                role: 'background',
                scale: luck ? 'long-cycle' : 'annual',
                label: fact.fact,
                theme: tenGodTheme(category),
                effects: row.effects,
                emotions: { rising: [], quieter: [] },
                strength: 'moderate',
                exactness: 'not-applicable',
                independenceGroup: 'bazi:current-cycle',
                requiresBirthTime: false,
                reliability: 'high',
                inForce: whole,
                provenance: { ...fact.provenance },
            });
        }
    }
    if (!input.dayMaster) {
        withheld.push({ code: 'bazi.chart-unavailable', what: 'BaZi context', reason: 'The BaZi chart could not be calculated for this profile.' });
    }
    for (const entry of legacy.withheld) {
        if (entry.code.startsWith('luckPillar.')) {
            withheld.push({ code: 'bazi.luck-direction-unresolved', what: entry.what, reason: entry.reason });
        }
    }
    withheld.push({
        code: 'human-design.no-forecast-doctrine',
        what: 'Human Design',
        reason: 'There is no approved rule for reading transits against a Human Design chart, so the system is left out of the day rather than improvised.',
    }, {
        code: 'bazi.no-daily-pillar-doctrine',
        what: 'BaZi daily pillar',
        reason: 'The annual and luck pillars are used as background only; a daily pillar needs its own doctrine first.',
    });
    /* Astrology over the local day. */
    if (input.natalPositions.length === 0) {
        withheld.push({
            code: 'astrology.chart-unavailable', what: 'Astrology for the day',
            reason: 'The natal chart could not be calculated, so nothing can transit it.',
        });
    }
    else {
        const astrology = computeDayAstrology({
            localDay,
            natalPositions: input.natalPositions,
            birthTime: input.birthTime,
            ascendantSignIndex: input.ascendantSignIndex,
        });
        facts.push(...astrology.facts);
        withheld.push(...astrology.withheld);
    }
    return {
        engineVersion: DAY_ENGINE_VERSION,
        localDay,
        birthTime: input.birthTime,
        facts: facts.sort((left, right) => left.id.localeCompare(right.id)),
        withheld,
    };
}
