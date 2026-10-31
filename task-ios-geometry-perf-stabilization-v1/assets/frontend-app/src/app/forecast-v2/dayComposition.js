import { ACTIVITY_RULES, isPressure } from './dayPlan.js?v=d9f39e7';
import { CONTACT_CLAUSE } from './dayStoryVoice.js?v=d9f39e7';
/*
 * THE READING AS ONE COMPOSITION (P1.6.3): WHAT THE HEADLINE PROMISES, WHAT SUPPORTS IT, AND WHETHER THE READING SAYS SO.
 *
 * P1.6 to P1.6.2 wrote every section well from its own evidence and checked sentences against each other. None of them asked the question a reader asks
 * first: "why is this the headline?" The plan answers it in its own words (the glance basis: the facts the lead activity was built on), and the
 * reading was free to narrate anything else. On one day in the matrix the headline was "physical activity" and the only fact that earned it, the Moon
 * joined to the natal Mars, was never mentioned: the sky paragraph narrates the strongest contact of each independence group, and the Moon's strongest
 * contact that day was a different one.
 *
 * This module is the reading-level contract. It adds NO evidence, NO score and NO doctrine; it reads the plan, the facts and the interpretation and says,
 * for every activity the headline names:
 *
 *   SUPPORT      which of the day's own facts press the pole that makes the activity a lead (its `needs`), at their PRIMARY weight - the drivers -
 *   STATUS       whether the reading, as it will be written, explains that pole:
 *                  stated     the opening's number-and-sky sentence names the pole, or the number presses it as its primary meaning and the numbers
 *                             paragraph is shown
 *                  sky        a narrated contact's sentence says the pole
 *                  unsaid     a driver is narrated but nothing the reader will read says the pole: the opening must say it (a "because")
 *                  absent     a driver exists and is not narrated: it is PROMOTED into the sky paragraph
 *                  convergent nothing presses the pole at its primary weight, but two or more independent influences press it at their secondary weight
 *                             (the plan's own reading of a lead built on several smaller leanings): the reading says so, without naming one as the cause
 *                  thin       one influence presses the pole at its secondary weight and nothing in the reading states it: the headline is broader than
 *                             the evidence, so the visible title says "inclined toward" instead of "suited to", or, when another activity of the lead is
 *                             explained, leaves this one out (unless it is the day's move). The plan keeps its lead, and its provenance.
 *
 * It also audits every aspect trigger the sky paragraph does not narrate and puts it in one of the brief's classes, so "omitted" is always a recorded
 * decision with a reason and never an accident of ordering.
 *
 * DETERMINISTIC. No clock, no random choice. NO CHANGE TO THE PLAN: the lead, the basis and every fingerprint are exactly the plan's.
 */
const RULES = new Map(ACTIVITY_RULES.map((rule) => [rule.activity, rule]));
export const needsOfActivity = (activity) => RULES.get(activity).needs;
const isAspect = (fact) => fact.mechanism === 'moon-transit-aspect' || fact.mechanism === 'fast-transit-aspect';
const isCycle = (fact) => fact.mechanism === 'personal-day' || fact.mechanism === 'personal-month' || fact.mechanism === 'personal-year';
const STRENGTH = { strong: 3, moderate: 2, slight: 1 };
const EXACT = { exact: 3, close: 2, wide: 1 };
export const contactRankOf = (fact) => STRENGTH[fact.strength] * 10 + (EXACT[fact.exactness] ?? 0);
export const refOf = (fact) => ({
    id: fact.id, pillar: fact.pillar, mechanism: fact.mechanism, role: fact.role, independenceGroup: fact.independenceGroup, label: fact.label, confidence: fact.reliability,
});
/** A fact that may stand behind a claim about today: a trigger of real strength and reliability. A background never does, alone. */
const mayDrive = (fact) => fact.role === 'trigger' && fact.strength !== 'slight' && fact.reliability !== 'low';
/**
 * A TENSE CONTACT IS NOT A REASON FOR A HEADLINE. The plan lets a contact with friction press a pole at its primary weight (a Mercury square that "keeps things open"), and
 * leads on it. But "There is a pull toward an open, curious mind" over a paragraph about friction is a claim nobody can see the reason for (the blind review of the first
 * P1.6.3 text found exactly that), so a tense contact is never the driver the reading names; a theme that stands on tense contacts alone is thin. The plan keeps its lead.
 */
const isTense = (fact) => isAspect(fact) && fact.provenance.quality === 'hard';
/** The pole a fact presses at its primary weight: for `urgent`, momentum is not pressure (a hard contact does not recommend acting on the energy). */
const pressesPrimary = (fact, poles) => isTense(fact) ? [] : fact.effects.filter((effect) => effect.weight === 'primary' && poles.includes(effect.pole) && !(effect.pole === 'urgent' && isPressure(fact))).map((effect) => effect.pole);
/** What the sky paragraph narrates, as the interpretation (before the English) decided it. */
function narratedOf(interpretation) {
    const out = new Map();
    for (const passage of interpretation.sky) {
        if (passage.key.type !== 'contact')
            continue;
        const id = passage.basis.triggers[0]?.id;
        if (id)
            out.set(id, { body: passage.key.body, natal: passage.key.natal, quality: passage.key.quality });
    }
    return out;
}
const saysOf = (contact) => CONTACT_CLAUSE[contact.body]?.[contact.natal]?.[contact.quality]?.says ?? [];
/**
 * THE SUPPORT OF EVERY ACTIVITY THE HEADLINE NAMES, against what the reading narrates.
 * `statedBy` is the set of activities the opening's number-and-sky sentence explains (dayStory.ts, pillarsOf): the caller knows the relation, this
 * module only needs to know which topics are already said.
 */
export function topicSupportOf(forecast, interpretation, topics, statedBy = new Set(), numbersExplain = false) {
    /* The poles the plan LEADS the lead activities on (interpretation.anchors): where a driver presses one of them, that is the pole the reading names, so the sentence that
       says why and the plan's own "better than" line never lean different ways on an activity that has two poles. */
    const anchored = interpretation.anchors;
    const bestOf = (totals, needs) => {
        const ranked = [...totals.entries()].sort((left, right) => right[1] - left[1] || needs.indexOf(left[0]) - needs.indexOf(right[0]));
        return (ranked.find(([pole]) => anchored.includes(pole)) ?? ranked[0])[0];
    };
    const triggers = forecast.facts.facts.filter(mayDrive);
    const narrated = narratedOf(interpretation);
    const numbersShown = Boolean(interpretation.numbers);
    return topics.map((topic) => {
        const needs = needsOfActivity(topic);
        const driverFacts = triggers
            .map((fact) => ({ fact, poles: pressesPrimary(fact, needs) }))
            .filter((entry) => entry.poles.length > 0)
            .sort((left, right) => (isAspect(right.fact) ? 1 : 0) - (isAspect(left.fact) ? 1 : 0) || contactRankOf(right.fact) - contactRankOf(left.fact) || left.fact.id.localeCompare(right.fact.id));
        if (driverFacts.length === 0) {
            if (statedBy.has(topic))
                return { topic, from: null, status: 'stated', drivers: [], lead: null, leadQuality: null, narrated: false };
            /* No primary effect: how many INDEPENDENT influences press the pole at all (the plan's own leaning)? Two or more is a convergence the reading may say. */
            const leaning = triggers
                .map((fact) => ({ fact, poles: isTense(fact) ? [] : fact.effects.filter((effect) => needs.includes(effect.pole) && !(effect.pole === 'urgent' && isPressure(fact))).map((effect) => effect.pole) }))
                .filter((entry) => entry.poles.length > 0)
                .sort((left, right) => (isAspect(right.fact) ? 1 : 0) - (isAspect(left.fact) ? 1 : 0) || contactRankOf(right.fact) - contactRankOf(left.fact) || left.fact.id.localeCompare(right.fact.id));
            const independent = new Set(leaning.map((entry) => entry.fact.independenceGroup));
            if (independent.size < 2)
                return { topic, from: null, status: 'thin', drivers: [], lead: null, leadQuality: null, narrated: false };
            const totals = new Map();
            for (const entry of leaning)
                for (const pole of entry.poles)
                    totals.set(pole, (totals.get(pole) ?? 0) + contactRankOf(entry.fact));
            const lean = bestOf(totals, needs);
            const about = leaning.filter((entry) => entry.poles.includes(lean));
            if (new Set(about.map((entry) => entry.fact.independenceGroup)).size < 2)
                return { topic, from: null, status: 'thin', drivers: [], lead: null, leadQuality: null, narrated: false };
            return { topic, from: lean, status: 'convergent', drivers: about.map((entry) => refOf(entry.fact)), lead: refOf(about[0].fact), leadQuality: null, narrated: about.some((entry) => isAspect(entry.fact) && narrated.has(entry.fact.id)) };
        }
        const drivers = driverFacts.map((entry) => refOf(entry.fact));
        /* The pole the day presses most strongly among the activity's needs: the one the reading should name. */
        const totals = new Map();
        for (const entry of driverFacts)
            for (const pole of entry.poles)
                totals.set(pole, (totals.get(pole) ?? 0) + contactRankOf(entry.fact));
        const from = bestOf(totals, needs);
        const aboutFrom = driverFacts.filter((entry) => entry.poles.includes(from));
        const narratedDriver = aboutFrom.find((entry) => isAspect(entry.fact) && narrated.has(entry.fact.id));
        const leadFact = (narratedDriver ?? aboutFrom[0]).fact;
        const lead = refOf(leadFact);
        const leadQuality = isAspect(leadFact) ? String(leadFact.provenance.quality) : null;
        if (statedBy.has(topic))
            return { topic, from, status: 'stated', drivers, lead, leadQuality, narrated: Boolean(narratedDriver) };
        /* A narrated contact whose sentence says the pole explains it. */
        const contact = narratedDriver ? narrated.get(narratedDriver.fact.id) : null;
        if (contact && saysOf(contact).includes(from))
            return { topic, from, status: 'sky', drivers, lead, leadQuality, narrated: true };
        /* The number presses the pole as its primary meaning and the numbers paragraph is shown: that paragraph is where the number is explained. */
        const cycle = aboutFrom.find((entry) => isCycle(entry.fact));
        /* A HEADLINE needs its reason in the opening (the numbers paragraph is two paragraphs below it); a Good Use label, secondary, may rest on the numbers paragraph. */
        if (cycle && numbersShown && numbersExplain)
            return { topic, from, status: 'stated', drivers, lead, leadQuality, narrated: Boolean(narratedDriver) };
        if (narratedDriver)
            return { topic, from, status: 'unsaid', drivers, lead, leadQuality, narrated: true };
        return { topic, from, status: aboutFrom.some((entry) => isAspect(entry.fact)) ? 'absent' : 'unsaid', drivers, lead, leadQuality, narrated: false };
    });
}
/**
 * THE CONTACTS THE HEADLINE STANDS ON, TO BE NARRATED WHATEVER THEIR RANK, decided before the story is built.
 * Every activity the headline names that the number does not already state stands on a contact: the one the sky paragraph narrates if it narrates one, else
 * the strongest that presses the pole at its primary weight. All of them are kept - those already narrated (so that promoting the contact one theme needs does
 * not push out the contact another theme already has) and those missing - up to the two the paragraph holds. Narrating a contact changes WHICH of the
 * day's facts the reading tells, never what any fact presses on or how much it counts: it stays in its own independence group, and narrating a second
 * contact of one group is not a second witness.
 */
export function promotionsOf(forecast, interpretation, topics) {
    const support = topicSupportOf(forecast, interpretation, topics);
    const out = [];
    const seen = new Set();
    for (const entry of support) {
        if ((entry.status !== 'absent' && entry.status !== 'unsaid' && entry.status !== 'sky') || !entry.lead || seen.has(entry.lead.id))
            continue;
        if (entry.lead.mechanism !== 'moon-transit-aspect' && entry.lead.mechanism !== 'fast-transit-aspect')
            continue;
        seen.add(entry.lead.id);
        out.push({ id: entry.lead.id, topic: entry.topic, why: `the headline's ${entry.topic} rests on ${entry.from}, which this contact presses at its primary weight` });
        if (out.length === 2)
            break;
    }
    return out;
}
export function evidenceAudit(forecast, narratedIds, namedIds, headlinePoles, narratedPoles, bases, narratedGroups) {
    const used = new Map();
    for (const { where, basis } of bases)
        for (const ref of basis?.triggers ?? []) {
            const set = used.get(ref.id) ?? new Set();
            set.add(where);
            used.set(ref.id, set);
        }
    const out = [];
    for (const fact of forecast.facts.facts) {
        if (fact.role !== 'trigger' || !isAspect(fact) || narratedIds.has(fact.id) || namedIds.has(fact.id))
            continue;
        const usedBy = [...(used.get(fact.id) ?? [])].filter((where) => ['headline', 'goodUse', 'care', 'move'].includes(where)).sort();
        const poles = fact.effects.map((effect) => effect.pole);
        const sameGroup = narratedGroups.get(fact.independenceGroup);
        let cls;
        let reason;
        if (usedBy.length > 0) {
            cls = 'H';
            reason = `the plan stands ${usedBy.join(' and ')} on it and the reading has not explained it`;
        }
        else if (fact.strength === 'slight' || fact.exactness === 'wide') {
            cls = 'A';
            reason = 'a slight or wide contact';
        }
        else if (sameGroup && poles.every((pole) => sameGroup.includes(pole))) {
            cls = 'B';
            reason = 'it presses nothing the narrated contact of its own group does not';
        }
        else if (sameGroup) {
            cls = 'C';
            reason = 'one influence with a narrated contact of its group, counted once';
        }
        else if (poles.some((pole) => headlinePoles.has(pole) || narratedPoles.has(pole))) {
            cls = 'F';
            reason = 'the sky paragraph holds two contacts and this one ranked below them';
        }
        else {
            cls = 'G';
            reason = 'it presses nothing the headline or the narrated contacts are about';
        }
        out.push({ factId: fact.id, cls, usedBy, reason });
    }
    return out;
}
