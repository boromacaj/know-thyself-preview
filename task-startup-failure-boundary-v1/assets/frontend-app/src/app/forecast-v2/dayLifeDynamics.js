import { combine, EFFECT_WEIGHT, FACT_WEIGHT, RELIABILITY_FACTOR, } from './dayEvidence.js?v=2ea79e9';
import { isPressure, LEAN_MIN } from './dayPlan.js?v=2ea79e9';
import { synthesiseDay, THRESHOLDS } from './daySynthesis.js?v=2ea79e9';
import { OPPOSITE_POLE } from './dayTypes.js?v=2ea79e9';
import { LIFE_DYNAMICS_ORDER } from '../temporal-synthesis/lifeDynamics.js?v=2ea79e9';
/*
 * TODAY'S LIFE DYNAMICS - THE DAY'S EVIDENCE, READ ON FIVE AREAS OF LIFE.
 *
 * The Year and Month read their five areas from every day in force (lifeDynamics.ts),
 * and that is right for a period. A day cannot be read that way: the longitudinal audit
 * of the legacy Day profile found one area on top for 97% of a year and an area stuck at
 * its lowest level for 365 days, because long-lasting facts outweighed a day-long one
 * nine to one. So the Day does not reuse that engine, its weights or its scale.
 *
 * WHAT THE DAY'S AREAS ARE MADE OF
 *   TRIGGERS ONLY. Only what makes this calendar day distinct counts: the Personal
 *   Day, the Moon, a fast body's contact with the natal chart. Background (the
 *   Personal Year and Month, the annual and luck pillars, slow transits) adds no
 *   weight. It can only say, in words, whether the longer stretch leans the same way
 *   or the other, so a background alone can never make a day's gauge.
 *
 *   THE DAY PLAN'S OWN EVIDENCE. Every area is a different reading of the poles the
 *   Day plan already reasons over (what the day presses on: focus, commitment, motion,
 *   contact, feeling, pace). Nothing is calculated again and no new doctrine is added:
 *   the same facts, the same weights, the same independence rules (dayEvidence.combine:
 *   three aspects of one transit are one influence; Personal Year, Month and Day are one
 *   cycle). What this file adds is only which area each pole bears on.
 *
 *     Mind & Focus       narrow, wide, keep-open, half of commit  (attention, review, deciding)
 *     Career & Purpose   begin, finish, half of commit, half of momentum  (starting, completing, following through)
 *     Love & Connection  outward, speak, listen, open, contained  (reaching out, saying, listening, feeling)
 *     Health & Recovery  unhurried, inward, half of momentum, pressure on the pace  (rhythm, rest, energy, strain)
 *     Money & Resources  nothing
 *
 *   A pole belongs to one area (commit and momentum are shared half and half). A fact's
 *   strength is SHARED among the areas its effects reach, in proportion to those
 *   effects, never counted in full in each: a Personal Day with six effects is still one
 *   fact of one weight.
 *
 *   PRESSURE IS NOT MOMENTUM (P1.2A). Urgency from a hard contact is strain to manage and
 *   belongs to Health & Recovery alone. Urgency from an easy or merging contact is
 *   momentum, and it counts at all only where the day has a primary, non-slight source for
 *   it (Mars awake) - exactly the plan's own rule - so the area map cannot bring back the
 *   physical-activity days P1.2A removed.
 *
 *   FRICTION IS TONE, NOT A TOPIC. `charged` and `smooth` say how a contact comes, not
 *   what it is about, so they feed no area. They colour it: where the contacts behind an
 *   area are mostly easy, mostly hard or both, the area says so; and where the plan holds
 *   a tension that runs through an area, the area carries that tension instead of
 *   averaging it into a level.
 *
 * MONEY & RESOURCES IS NOT ASSESSED, ON EVERY DAY. The approved Forecast has a money
 * reading for a Personal Year and a Personal Month (forecastContent) and none for a
 * Personal Day, and no daily mechanism in the engine is about resources. A level would
 * have to be invented, so none is: the row says why it has none. Revisit only when a
 * daily resource doctrine is approved.
 *
 * AN AREA IS ASSESSED OR NOT, AND NOT ASSESSED IS NOT LOW
 *   assessed       a non-slight trigger whose PRIMARY meaning is one of its poles presses on it and
 *                  the counted weight reaches MIN_WEIGHT; or the plan itself names an activity that
 *                  belongs to it (then it stands on the plan item's own basis).
 *   not assessed   nothing day-specific bears on it ('no-evidence'); or only faint or secondary
 *                  hints do - the Moon's colour, a cycle number's fourth effect - none of which makes
 *                  it a theme of the day ('faint-evidence-only'); or it is Money.
 *
 * THE LEVEL says how far above or below an ordinary day for THAT area the day's own
 * evidence sits (the ratio of its weight to ORDINARY_WEIGHT, the median of the reference
 * set), cut at fixed ratios. It is not a quintile: there is no quota, so a day can have no
 * area above "Subtle" and a year can have no "Central theme" at all. An area the plan names
 * without evidence of its own is "Subtle", unless the plan's own LEAD belongs to it: the
 * headline's area is then read on its weight like any other, and is never the faintest thing on
 * the card (at least "Moderate"). The level is the amount of emphasis, never how well the area goes, and it is not
 * confidence: how sure the evidence is lives in the plan.
 */
export const DAY_LIFE_VERSION = 'know-thyself-daily-life-dynamics-1';
export const DAY_LIFE_ORDER = LIFE_DYNAMICS_ORDER;
/** The one table this file adds: which area each pole bears on. A pole not listed feeds none. */
export const DAY_LIFE_POLE_SHARES = {
    narrow: { 'mind-focus': 1 },
    wide: { 'mind-focus': 1 },
    'keep-open': { 'mind-focus': 1 },
    commit: { 'mind-focus': 0.5, 'career-purpose': 0.5 },
    begin: { 'career-purpose': 1 },
    finish: { 'career-purpose': 1 },
    outward: { 'love-connection': 1 },
    speak: { 'love-connection': 1 },
    listen: { 'love-connection': 1 },
    open: { 'love-connection': 1 },
    contained: { 'love-connection': 1 },
    unhurried: { 'health-recovery': 1 },
    inward: { 'health-recovery': 1 },
};
export const DAY_LIFE_MOMENTUM_SHARES = { 'career-purpose': 0.5, 'health-recovery': 0.5 };
export const DAY_LIFE_PRESSURE_SHARES = { 'health-recovery': 1 };
/** The activities the plan can name, and the area each one belongs to. */
export const DAY_LIFE_ACTIVITY_AREA = {
    'deep-work': 'mind-focus', 'editing-and-review': 'mind-focus', research: 'mind-focus', planning: 'mind-focus',
    brainstorming: 'mind-focus', administration: 'mind-focus', 'creative-exploration': 'mind-focus',
    'starting-work': 'career-purpose', 'finishing-work': 'career-purpose', 'cleanup-organisation': 'career-purpose',
    'social-connection': 'love-connection', 'difficult-conversation': 'love-connection', negotiation: 'love-connection',
    rest: 'health-recovery', 'physical-activity': 'health-recovery',
};
/** Below this counted weight an area has too little to be assessed. */
export const MIN_WEIGHT = 0.3;
/** The median counted weight of an assessed day, per area, over the reference set (tests recompute it). */
export const ORDINARY_WEIGHT = {
    'mind-focus': 0.57,
    'career-purpose': 0.589,
    'love-connection': 0.935,
    'health-recovery': 0.49,
};
/** Level n+1 starts at these ratios to an ordinary day for the area: Subtle, Moderate, Active, Prominent, Central theme. */
export const LEVEL_RATIOS = [0.8, 1.2, 1.6, 2];
const round = (value) => Math.round(value * 1000) / 1000;
const emptyBasis = { triggers: [], background: [], convergence: 'single-source', tension: null, groups: [] };
export function levelOfRatio(ratio) {
    return (1 + LEVEL_RATIOS.filter((cut) => ratio >= cut).length);
}
const refOf = (fact) => ({
    id: fact.id, pillar: fact.pillar, mechanism: fact.mechanism, role: fact.role,
    independenceGroup: fact.independenceGroup, label: fact.label, confidence: fact.reliability,
});
export function buildDayLifeDynamics(forecast) {
    const { facts, plan } = forecast;
    const synthesis = synthesiseDay(facts.facts);
    const byId = new Map(facts.facts.map((fact) => [fact.id, fact]));
    const triggers = synthesis.triggers.filter((fact) => fact.reliability !== 'low');
    /* The plan's own gate for momentum: some non-slight, non-pressure trigger makes urgency its PRIMARY meaning. */
    const momentumAnchored = triggers.some((fact) => !isPressure(fact) && fact.strength !== 'slight'
        && fact.effects.some((effect) => effect.pole === 'urgent' && effect.weight === 'primary'));
    const openWallpaper = synthesis.poles.get('open').trigger.total < (LEAN_MIN.open ?? 0);
    const acc = new Map(DAY_LIFE_ORDER.map((id) => [id, { entries: [], primary: false, poleMass: new Map() }]));
    for (const fact of triggers) {
        const strength = FACT_WEIGHT[fact.strength] * RELIABILITY_FACTOR[fact.reliability];
        const denominator = fact.effects.reduce((sum, effect) => sum + EFFECT_WEIGHT[effect.weight], 0);
        if (denominator === 0)
            continue;
        const raw = new Map();
        for (const effect of fact.effects) {
            /* "Feeling is open" is true of most days (the Moon touches the chart so often): below the plan's own floor it is wallpaper. */
            if (effect.pole === 'open' && openWallpaper)
                continue;
            const shares = effect.pole === 'urgent'
                ? (isPressure(fact) ? DAY_LIFE_PRESSURE_SHARES : momentumAnchored ? DAY_LIFE_MOMENTUM_SHARES : {})
                : DAY_LIFE_POLE_SHARES[effect.pole] ?? {};
            const key = effect.pole === 'urgent' ? (isPressure(fact) ? 'urgent:pressure' : 'urgent:momentum') : effect.pole;
            for (const [id, share] of Object.entries(shares)) {
                const part = strength * (EFFECT_WEIGHT[effect.weight] * share) / denominator;
                raw.set(id, (raw.get(id) ?? 0) + part);
                const slot = acc.get(id);
                slot.poleMass.set(key, (slot.poleMass.get(key) ?? 0) + part);
                /* What anchors an area is a non-slight trigger whose PRIMARY meaning is one of its poles. A secondary note
                   (a cycle number's fourth effect, the flavour a natal planet adds to every contact it receives) is real weight
                   and cannot, alone, make an area a theme of the day. */
                if (fact.strength !== 'slight' && effect.weight === 'primary')
                    slot.primary = true;
            }
        }
        for (const [id, amount] of raw) {
            acc.get(id).entries.push({ id: fact.id, group: fact.independenceGroup, pillar: fact.pillar, raw: amount });
        }
    }
    /* What the plan itself names, by area: its leads and the activities it offers, at any confidence above low. */
    const planActivities = new Map(DAY_LIFE_ORDER.map((id) => [id, []]));
    const planBasis = new Map();
    for (const item of plan.goodUse)
        if (item.confidence !== 'low')
            planBasis.set(item.kind, item.basis);
    for (const activity of [...plan.glance.lead, ...plan.goodUse.filter((item) => item.confidence !== 'low').map((item) => item.kind)]) {
        const list = planActivities.get(DAY_LIFE_ACTIVITY_AREA[activity]);
        if (!list.includes(activity))
            list.push(activity);
    }
    const tensionOf = (id) => {
        /* A contest between two of the day's own triggers. A background pressing against a trigger is context, said as such. */
        for (const tension of plan.tensions.filter((entry) => entry.kind === 'trigger-vs-trigger')) {
            for (const side of tension.sides) {
                const reaches = side.pole === 'urgent'
                    ? id === 'health-recovery'
                    : (DAY_LIFE_POLE_SHARES[side.pole]?.[id] ?? 0) > 0;
                if (reaches)
                    return tension.id;
            }
        }
        return null;
    };
    const toneOf = (support) => {
        let easy = 0;
        let hard = 0;
        for (const group of support.groups) {
            const fact = byId.get(group.factIds[0]);
            const quality = fact?.provenance.quality;
            if (quality === 'hard')
                hard += group.counted;
            else if (quality === 'ease' || quality === 'merge')
                easy += group.counted;
        }
        const contact = easy + hard;
        /* Contacts that are a small part of the area's weight do not set its tone. */
        if (contact < 0.3 * Math.max(support.total, 0.0001) || contact < 0.15)
            return 'neutral';
        const hardShare = hard / contact;
        return hardShare >= 0.7 ? 'pressing' : hardShare <= 0.3 ? 'easing' : 'mixed';
    };
    const rows = DAY_LIFE_ORDER.map((id) => {
        const slot = acc.get(id);
        const support = combine(slot.entries);
        const weight = round(support.total);
        const activities = planActivities.get(id) ?? [];
        const planNamed = activities.length > 0;
        const evidence = id !== 'money-resources' && slot.primary && weight >= MIN_WEIGHT;
        const assessed = evidence || planNamed;
        const poles = [...slot.poleMass]
            .map(([key, mass]) => ({ key, weight: round(mass) }))
            .sort((left, right) => right.weight - left.weight || String(left.key).localeCompare(String(right.key)))
            .slice(0, 3);
        const tension = assessed ? tensionOf(id) : null;
        const counted = support.groups.filter((group) => group.counted > 0).slice(0, 4);
        const refs = counted.map((group) => refOf(byId.get(group.factIds[0])));
        /* The longer stretch: said, never counted. It leans the same way as the area's strongest pole, or the other way. */
        let background = null;
        let backgroundRef = null;
        if (assessed && poles.length > 0) {
            const lead = poles.find((entry) => entry.key !== 'urgent:momentum' && entry.key !== 'urgent:pressure');
            if (lead) {
                const same = synthesis.poles.get(lead.key).background;
                const against = synthesis.poles.get(OPPOSITE_POLE[lead.key]).background;
                const pick = (support) => {
                    const group = support.groups.find((entry) => entry.counted > 0);
                    return group ? byId.get(group.factIds[0]) : undefined;
                };
                if (against.total >= THRESHOLDS.backgroundOppose && against.total > same.total) {
                    const fact = pick(against);
                    if (fact) {
                        background = { relation: 'opposes', theme: fact.theme, factId: fact.id };
                        backgroundRef = refOf(fact);
                    }
                }
                else if (same.total >= THRESHOLDS.backgroundMin) {
                    const fact = pick(same);
                    if (fact) {
                        background = { relation: 'reinforces', theme: fact.theme, factId: fact.id };
                        backgroundRef = refOf(fact);
                    }
                }
            }
        }
        /* An area the plan named without weight of its own stands on the plan item's own basis. */
        const fallback = activities.map((activity) => planBasis.get(activity)).find((basis) => basis !== undefined);
        const triggerRefs = refs.length > 0 ? refs : (fallback?.triggers ?? []);
        const groups = [...new Set([...triggerRefs, ...(backgroundRef ? [backgroundRef] : [])].map((ref) => ref.independenceGroup))].sort();
        const basis = assessed
            ? {
                triggers: triggerRefs, background: backgroundRef ? [backgroundRef] : [], tension, groups,
                convergence: support.witnesses >= 2 ? 'cross-pillar' : triggerRefs.length >= 2 ? 'same-pillar' : 'single-source',
            }
            : emptyBasis;
        const ordinary = id === 'money-resources' ? 0 : ORDINARY_WEIGHT[id];
        const ratio = ordinary > 0 ? weight / ordinary : 0;
        /* The plan's own LEAD is the day's headline: an area it leads in is never the faintest on the card, and is not capped. */
        const leadNamed = plan.glance.lead.some((activity) => DAY_LIFE_ACTIVITY_AREA[activity] === id);
        const level = !assessed ? null
            : leadNamed ? Math.max(2, levelOfRatio(ratio))
                : evidence ? levelOfRatio(ratio) : 1;
        /*
         * A TONE CANNOT CONTRADICT THE DAY'S OWN CAUTION. The tone is read from the contacts behind an area; the plan
         * holds the whole day's cautions. Where the plan names a tension that runs through the area, or - for Health &
         * Recovery - the day's pace is under pressure or the plan says not to rely on urgency, "mostly easy" would sit
         * beside a warning the plan has already given. It is said as mixed instead.
         */
        const baseTone = assessed && evidence ? toneOf(support) : 'neutral';
        const pressured = id === 'health-recovery'
            && (plan.glance.pressure || plan.dontRelyOn?.kind === 'urgency' || poles.some((entry) => entry.key === 'urgent:pressure'));
        const tone = baseTone === 'easing' && (tension !== null || pressured) ? 'mixed' : baseTone;
        const reason = assessed ? null
            : id === 'money-resources' ? 'no-daily-signal'
                : weight > 0 ? 'faint-evidence-only' : 'no-evidence';
        return {
            id, assessed, level, reason, weight, primary: slot.primary, planNamed, leadNamed,
            tone,
            poles, tension, background, activities, basis,
        };
    });
    return { version: DAY_LIFE_VERSION, rows };
}
