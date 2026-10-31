import { ACTIVITY_RULES } from './dayPlan.js?v=2ea79e9';
import { MOON_PHASE_ROWS, PHASE_KIND } from './dayKnowledge.js?v=2ea79e9';
import { synthesiseDay } from './daySynthesis.js?v=2ea79e9';
import { OPPOSITE_POLE } from './dayTypes.js?v=2ea79e9';
/* ------------------------------------------------------------------ helpers -- */
const refOf = (fact) => ({
    id: fact.id, pillar: fact.pillar, mechanism: fact.mechanism, role: fact.role,
    independenceGroup: fact.independenceGroup, label: fact.label, confidence: fact.reliability,
});
const basisOfFacts = (facts) => {
    const refs = facts.map(refOf);
    const triggers = refs.filter((ref) => ref.role === 'trigger');
    const background = refs.filter((ref) => ref.role === 'background');
    const groups = [...new Set(refs.map((ref) => ref.independenceGroup))].sort();
    const pillars = new Set(refs.map((ref) => ref.pillar));
    return {
        triggers, background, tension: null, groups,
        convergence: pillars.size >= 2 ? 'cross-pillar' : groups.length >= 2 ? 'same-pillar' : 'single-source',
    };
};
const STRENGTH = { strong: 3, moderate: 2, slight: 1 };
const EXACT = { exact: 3, close: 2, wide: 1 };
const isContact = (fact) => fact.mechanism === 'moon-transit-aspect' || fact.mechanism === 'fast-transit-aspect';
const contactRank = (fact) => STRENGTH[fact.strength] * 10 + (EXACT[fact.exactness] ?? 0);
const NEEDS = Object.fromEntries(ACTIVITY_RULES.map((rule) => [rule.activity, rule.needs]));
/** The longest the sky paragraph gets: two contacts and one piece of setting, or setting alone when nothing contacts. */
const MAX_CONTACTS = 2;
export function buildInterpretation(forecast, options = {}) {
    const { plan, facts } = forecast;
    const all = facts.facts;
    const triggers = all.filter((fact) => fact.role === 'trigger');
    /* ---- the numbers: the three cycle facts, as the engine computed them ---- */
    const cycle = (mechanism) => all.find((fact) => fact.mechanism === mechanism);
    const year = cycle('personal-year');
    const month = cycle('personal-month');
    const day = cycle('personal-day');
    const n = (fact) => {
        const value = fact ? Number(fact.provenance.number) : NaN;
        return Number.isInteger(value) && value >= 1 && value <= 9 ? value : null;
    };
    const [ny, nm, nd] = [n(year), n(month), n(day)];
    const numbers = year && month && day && ny && nm && nd
        ? { tuple: { year: ny, month: nm, day: nd }, basis: basisOfFacts([day, month, year]) }
        : null;
    /* What the day leads on, per axis: the sky's colour is never set against it. */
    const synthesis = synthesiseDay(all);
    const axes = synthesis.axes;
    const leading = new Map();
    for (const axis of axes)
        if (axis.leading)
            leading.set(axis.leading, axis.leading);
    /* ---- the sky: contacts first, strongest per influence; then the setting ---- */
    const byGroup = new Map();
    for (const fact of triggers.filter((candidate) => isContact(candidate) && candidate.strength !== 'slight' && candidate.reliability !== 'low')) {
        const held = byGroup.get(fact.independenceGroup);
        if (!held || contactRank(fact) > contactRank(held) || (contactRank(fact) === contactRank(held) && fact.id < held.id))
            byGroup.set(fact.independenceGroup, fact);
    }
    const ranked = [...byGroup.values()].sort((a, b) => contactRank(b) - contactRank(a) || a.id.localeCompare(b.id));
    /* A promoted contact comes first (it is what the headline stands on), then the strongest of each group; a second contact of one group is allowed only here. */
    const promoted = (options.promote ?? [])
        .map((id) => triggers.find((candidate) => candidate.id === id))
        .filter((fact) => fact !== undefined && isContact(fact) && fact.strength !== 'slight' && fact.reliability !== 'low');
    const picked = [...promoted, ...ranked.filter((fact) => !promoted.some((entry) => entry.id === fact.id))].slice(0, MAX_CONTACTS);
    /* A promotion must not make the sky kinder than the day: the strongest exact tense contact that promoting displaced is kept, as a third. (Only then: without a promotion the paragraph holds two.) */
    const displaced = promoted.length > 0 ? ranked.find((fact) => fact.provenance.quality === 'hard' && fact.strength === 'strong' && fact.exactness === 'exact' && !picked.some((entry) => entry.id === fact.id)) : undefined;
    const contacts = displaced ? [...picked, displaced] : picked;
    const sky = contacts.map((fact) => {
        const quality = String(fact.provenance.quality);
        return {
            level: fact.strength === 'strong' && fact.exactness === 'exact' ? 'lead' : 'support',
            key: { type: 'contact', body: String(fact.provenance.transitingBody), natal: String(fact.provenance.natalBody), quality },
            basis: basisOfFacts([fact]),
        };
    });
    const phase = triggers.find((fact) => fact.mechanism === 'moon-phase');
    const house = triggers.find((fact) => fact.mechanism === 'moon-house');
    const sign = triggers.find((fact) => fact.mechanism === 'moon-sign');
    const setting = [];
    const kind = phase ? PHASE_KIND[String(phase.provenance.phase)] : undefined;
    /* The Moon's phase is colour, never the reason for anything. When it points against what the day leads on ("clearing" under a day that
       leads on beginnings) it would be advice against the headline, so it is left out and the house or sign says the setting instead. */
    const phaseOpposes = kind !== undefined && MOON_PHASE_ROWS[kind].effects.some((effect) => leading.has(OPPOSITE_POLE[effect.pole]));
    if (phase && kind && !phaseOpposes)
        setting.push({ level: 'colour', key: { type: 'phase', kind }, basis: basisOfFacts([phase]) });
    /* With no contact to say, the setting gets one more line: the house when the time is exact, otherwise the sign's element. */
    const room = contacts.length === 0 ? 2 : 1;
    if (setting.length < room && house)
        setting.push({ level: 'colour', key: { type: 'house', house: Number(house.provenance.house) }, basis: basisOfFacts([house]) });
    if (setting.length < room && sign) {
        setting.push({ level: 'colour', key: { type: 'element', element: String(sign.provenance.element) }, basis: basisOfFacts([sign]) });
    }
    sky.push(...setting.slice(0, room));
    /* ---- the number and the sky: one pole the day's number presses primarily, and whether the day leads that way ---- */
    let agreement = null;
    if (day) {
        for (const effect of day.effects.filter((entry) => entry.weight === 'primary')) {
            const opposite = OPPOSITE_POLE[effect.pole];
            if (leading.has(effect.pole)) {
                agreement = { pole: effect.pole, state: 'agree', basis: basisOfFacts([day]) };
                break;
            }
            if (leading.has(opposite)) {
                agreement = { pole: effect.pole, state: 'differ', basis: basisOfFacts([day]) };
                break;
            }
        }
    }
    /* ---- why the lead leads: the poles it is built on that the day actually leads on, strongest first ---- */
    const poleTotal = (pole) => synthesis.poles.get(pole).trigger.total;
    const needs = new Set(plan.glance.lead.flatMap((activity) => NEEDS[activity]));
    const anchors = (plan.glance.lead.length > 0 ? [...needs].filter((pole) => leading.has(pole)) : [...plan.glance.stances])
        .sort((a, b) => poleTotal(b) - poleTotal(a))
        .slice(0, 2);
    return { numbers, sky, agreement, anchors };
}
