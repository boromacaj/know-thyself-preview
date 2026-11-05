import { buildDayFacts, describeDayFacts } from './dayFacts.js';
import { buildDayPlan } from './dayPlan.js';
import { renderDayPlanEnglish } from './dayPlanEnglish.js';
import { synthesiseDay } from './daySynthesis.js';
export function buildDayForecast(input, options = {}) {
    const facts = buildDayFacts(input);
    const plan = buildDayPlan(facts);
    return { facts, plan, text: renderDayPlanEnglish(plan, options) };
}
/**
 * Everything a reviewer needs to answer "why did the app say that": the facts by
 * role, the groups they collapse into, where two pillars independently agree, the
 * tensions, every claim with its basis, and what was left out and why. QA only -
 * never drawn in the product's own screens.
 */
export function dayDiagnostics(forecast) {
    const { facts, plan, text } = forecast;
    const synthesis = synthesiseDay(facts.facts);
    const claim = (slot, item) => ({
        slot, kind: item.kind, confidence: item.confidence, convergence: item.basis.convergence, tension: item.basis.tension,
        triggers: item.basis.triggers.map((ref) => ref.label),
        background: item.basis.background.map((ref) => ref.label),
        groups: item.basis.groups,
    });
    const many = (slot, items) => items.map((item) => claim(slot, item));
    return {
        ...describeDayFacts(facts),
        convergences: [...synthesis.poles.values()]
            .filter((reading) => reading.trigger.witnesses >= 2)
            .map((reading) => ({ pole: reading.pole, pillars: reading.trigger.pillars, weight: reading.trigger.total })),
        tensions: plan.tensions.map((tension) => ({
            id: tension.id, kind: tension.kind,
            sides: tension.sides.map((side) => `${side.role} ${side.pole} ${side.support}`).join(' vs '),
        })),
        claims: [
            claim('glance', {
                kind: plan.glance.headline === 'tension' ? (plan.glance.tension ?? 'tension') : plan.glance.lead.join('+') || 'quiet',
                confidence: plan.glance.confidence, basis: plan.glance.basis,
            }),
            ...many('leanInto', plan.leanInto),
            ...many('avoidForcing', plan.avoidForcing),
            ...many('emotionsRising', plan.emotionsRising),
            ...many('emotionsQuieter', plan.emotionsQuieter),
            ...(plan.dontRelyOn ? [claim('dontRelyOn', plan.dontRelyOn)] : []),
            ...many('goodUse', plan.goodUse),
            ...many('watchFor', plan.watchFor),
            ...(plan.practicalMove ? [claim('practicalMove', plan.practicalMove)] : []),
        ],
        omitted: plan.omitted,
        dropped: text.dropped,
    };
}
