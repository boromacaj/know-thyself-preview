import { ACTIVITY_RULES, } from './dayPlan.js?v=2ea79e9';
import { synthesiseDay } from './daySynthesis.js?v=2ea79e9';
/**
 * PRESENTATION FLOORS - what the card will not say, though the plan holds it.
 *
 * These are not weights and they change no plan. The plan names a feeling on every
 * day of the year and a "don't force" on seven days in ten; a card that printed all
 * of it would warn and characterise almost every morning, which is the opposite of
 * advice. The card keeps what the plan is SURE of (its own 'high' confidence) and
 * records, here and not on the screen, what it held back and why.
 */
export const CAUTION_FLOOR = 'a caution is shown only when the plan is sure of it';
export const FEELING_FLOOR = 'a feeling is named only when the plan is sure of it';
/** How many things the card will ask a reader to take care over. */
export const CARE_CAP = 3;
export const WALLPAPER_FLOOR = 'a lean that holds on a third of all days is shown only when the plan is sure of it';
/** Poles true of so many days that, unqualified, they are wallpaper (see LEAN_MIN in dayPlan). */
export const WALLPAPER_POLES = new Set(['open']);
/** A feeling and the capacity that is its counterpart: naming both would be saying one thing twice. */
const COUNTERPART_PAIRS = {
    patience: 'impatience', 'emotional-distance': 'sensitivity', 'staying-power': 'restlessness', 'appetite-for-company': 'reflectiveness',
};
/* ------------------------------------------------------------------ helpers -- */
const NEEDS = Object.fromEntries(ACTIVITY_RULES.map((rule) => [rule.activity, rule.needs]));
/** Activities that rest on pressing ahead, for the one reliance they cannot sit beside as plain labels. */
const MOMENTUM_ACTIVITIES = new Set(['physical-activity', 'starting-work']);
const DECISION_ACTIVITIES = new Set(['negotiation', 'planning']);
const isTension = (kind) => kind.startsWith('tension:');
const tensionOf = (kind) => kind.slice('tension:'.length);
export function mergeBasis(bases) {
    const seen = new Set();
    const triggers = bases.flatMap((basis) => basis.triggers).filter((ref) => !seen.has(ref.id) && seen.add(ref.id));
    const background = bases.flatMap((basis) => basis.background).filter((ref) => !seen.has(ref.id) && seen.add(ref.id));
    const groups = [...new Set(bases.flatMap((basis) => basis.groups))].sort();
    const pillars = new Set([...triggers].map((ref) => ref.pillar));
    return {
        triggers, background, tension: bases.find((basis) => basis.tension)?.tension ?? null, groups,
        convergence: bases.some((basis) => basis.convergence === 'cross-pillar') && pillars.size >= 2
            ? 'cross-pillar' : groups.length >= 2 ? 'same-pillar' : 'single-source',
    };
}
/**
 * Lean lines that contradict another part of the card when each is only a label. The
 * pairs are cross-axis (the same axis cannot lead two ways), so each is a real
 * combination of evidence, not an error: momentum on a day that asks for rest is
 * "effort in bursts"; deciding on a day that warns against closing early is "decide
 * what is ready". Said once, with the qualification the pair needs.
 */
function reconcileLean(pole, lead, avoid) {
    if (pole === 'urgent' && lead.includes('rest'))
        return { how: 'in-bursts', rule: 'rest-with-momentum', against: 'glance:rest' };
    if (pole === 'urgent' && avoid.has('opening-new-fronts'))
        return { how: 'on-what-is-open', rule: 'momentum-with-open-fronts', against: 'avoid:opening-new-fronts' };
    if (pole === 'commit' && avoid.has('closing-options-early'))
        return { how: 'what-is-ready', rule: 'decision-with-open-options', against: 'avoid:closing-options-early' };
    if (pole === 'outward' && lead.includes('rest'))
        return { how: 'brief-contact', rule: 'rest-with-contact', against: 'glance:rest' };
    return null;
}
/* --------------------------------------------------------------- the model -- */
export function buildAdviceModel(forecast) {
    const { plan, facts } = forecast;
    const lead = plan.glance.lead;
    const leadNeeds = new Set(lead.flatMap((activity) => NEEDS[activity]));
    const move = plan.practicalMove;
    const moveTension = move && isTension(move.kind) ? tensionOf(move.kind) : null;
    const reconciliations = [];
    const heldBack = [];
    /* ---- the glance: the contrast named once, the longer stretch claimed only as far as it is shared ---- */
    const contrast = plan.glance.contrast && !isTension(plan.glance.contrast) ? plan.glance.contrast : null;
    const axes = synthesiseDay(facts.facts).axes;
    const leadingPoles = new Set(axes.filter((axis) => axis.leading).map((axis) => axis.leading));
    const drivers = new Set(lead.length > 0 ? lead.flatMap((activity) => Object.keys(ACTIVITY_RULES.find((rule) => rule.activity === activity).weights))
        : plan.glance.stances);
    let background = null;
    const found = plan.glance.background;
    if (found) {
        const fact = facts.facts.find((candidate) => candidate.id === found.factId);
        const primary = (fact?.effects ?? []).filter((effect) => effect.weight === 'primary').map((effect) => effect.pole);
        if (found.relation === 'reinforces') {
            /* "That fits the longer stretch" is a claim about ONE quality. Say which; if none is shared, say only what the stretch is. */
            const shared = primary.filter((pole) => leadingPoles.has(pole) && drivers.has(pole));
            const pole = shared.find((candidate) => leadNeeds.has(candidate)) ?? shared[0] ?? null;
            /* No shared quality: the plan's "fits" was a match on a pole, not on the theme, and the card does not repeat it. */
            background = pole ? { relation: 'reinforces', theme: found.theme, factId: found.factId, pole } : null;
        }
        else if (found.relation === 'opposes') {
            const clash = plan.tensions.find((tension) => tension.kind === 'trigger-vs-background'
                && tension.sides[1].role === 'background' && primary.includes(tension.sides[1].pole));
            background = { relation: 'opposes', theme: found.theme, factId: found.factId, pole: clash ? clash.sides[1].pole : null };
        }
        else {
            background = { relation: 'frames', theme: found.theme, factId: found.factId, pole: null };
        }
    }
    const glance = {
        headline: plan.glance.headline,
        pressure: plan.glance.pressure,
        confidence: plan.glance.confidence,
        lead,
        stances: plan.glance.stances,
        contrast,
        tension: plan.glance.headline === 'tension' ? plan.glance.tension : null,
        background,
        basis: plan.glance.basis,
    };
    /* ---- a reliance beside a lean it would contradict as plain labels ---- */
    const leanPoles = new Set(plan.leanInto.filter((item) => !isTension(item.kind)).map((item) => item.kind.slice('pole:'.length)));
    const reliance = plan.dontRelyOn;
    let reconciledWith = null;
    let droppedLean = null;
    if (reliance) {
        if (reliance.kind === 'urgency' && (leanPoles.has('urgent') || lead.some((activity) => MOMENTUM_ACTIVITIES.has(activity)))) {
            reconciledWith = 'momentum';
            droppedLean = 'urgent';
            reconciliations.push({ rule: 'urgency-with-momentum', merged: ['dontRelyOn:urgency', leanPoles.has('urgent') ? 'leanInto:pole:urgent' : `glance:${lead.find((a) => MOMENTUM_ACTIVITIES.has(a))}`] });
        }
        else if (reliance.kind === 'certainty' && (leanPoles.has('commit') || lead.some((activity) => DECISION_ACTIVITIES.has(activity)))) {
            reconciledWith = 'decision';
            droppedLean = 'commit';
            reconciliations.push({ rule: 'certainty-with-decision', merged: ['dontRelyOn:certainty', leanPoles.has('commit') ? 'leanInto:pole:commit' : `glance:${lead.find((a) => DECISION_ACTIVITIES.has(a))}`] });
        }
        else if (reliance.kind === 'a-passing-mood' && leanPoles.has('open')) {
            reconciledWith = 'feeling';
            droppedLean = 'open';
            reconciliations.push({ rule: 'mood-with-feeling', merged: ['dontRelyOn:a-passing-mood', 'leanInto:pole:open'] });
        }
    }
    /* ---- what may come easier ---- */
    const avoidKinds = new Set([
        ...(contrast ? [contrast] : []),
        ...plan.avoidForcing.filter((item) => !isTension(item.kind)).map((item) => item.kind),
    ]);
    const easier = [];
    for (const item of plan.leanInto) {
        if (isTension(item.kind)) {
            const tension = tensionOf(item.kind);
            /* The way through a tension is said once: as the move when the plan made it the move, otherwise here. */
            if (tension !== moveTension)
                easier.push({ type: 'way-through', tension, basis: item.basis, confidence: item.confidence });
            continue;
        }
        const pole = item.kind.slice('pole:'.length);
        if (leadNeeds.has(pole))
            continue; // the headline already says it
        if (WALLPAPER_POLES.has(pole) && item.confidence !== 'high') {
            heldBack.push({ slot: 'leanInto', kind: item.kind, reason: WALLPAPER_FLOOR });
            continue;
        }
        if (pole === droppedLean)
            continue; // said once, with its qualification, under "more care"
        const reconciled = reconcileLean(pole, lead, avoidKinds);
        if (reconciled) {
            reconciliations.push({ rule: reconciled.rule, merged: [`leanInto:pole:${pole}`, reconciled.against] });
        }
        easier.push({ type: 'pole', pole, reconciled: reconciled?.how ?? null, basis: item.basis, confidence: item.confidence });
    }
    /* ---- what needs more care ---- */
    const care = [];
    if (reliance) {
        care.push({ type: 'rely', reliance: reliance.kind, reconciledWith, basis: reliance.basis, confidence: reliance.confidence });
    }
    /* A concrete caution outranks a pull, and a pull outranks a soft "don't force": the card holds three. */
    for (const item of plan.watchFor) {
        care.push({ type: 'watch', pitfall: item.kind, basis: item.basis, confidence: item.confidence });
    }
    /* What pulls: the glance says it when a tension is the headline, otherwise it is the first thing to take care over. */
    const pulls = new Map();
    for (const item of [...plan.leanInto, ...plan.avoidForcing]) {
        if (isTension(item.kind) && !pulls.has(tensionOf(item.kind)))
            pulls.set(tensionOf(item.kind), item.basis);
    }
    for (const [tension, basis] of pulls) {
        if (tension === glance.tension)
            continue;
        care.push({ type: 'tension', tension, basis, confidence: 'medium' });
    }
    for (const item of plan.avoidForcing) {
        if (isTension(item.kind))
            continue;
        const avoid = item.kind;
        if (avoid === contrast)
            continue; // the glance already sets the lead against exactly this
        /* A "don't force this" is a caution, and a caution is shown only where the plan is sure of it. */
        if (item.confidence !== 'high') {
            heldBack.push({ slot: 'avoidForcing', kind: item.kind, reason: CAUTION_FLOOR });
            continue;
        }
        care.push({ type: 'avoid', avoid, basis: item.basis, confidence: item.confidence });
    }
    const careShown = care.slice(0, CARE_CAP);
    for (const overflow of care.slice(CARE_CAP))
        heldBack.push({ slot: 'care', kind: overflow.type, reason: 'the card holds three cautions at most' });
    /* ---- how it may feel: one thought, not a list of feelings ---- */
    /* The plan names a feeling on almost every day. The card names only the ones it is sure of. */
    const sure = (items, slot, kindOf) => items.filter((item) => {
        if (item.confidence === 'high')
            return true;
        heldBack.push({ slot, kind: kindOf(item), reason: FEELING_FLOOR });
        return false;
    });
    const risingItems = sure(plan.emotionsRising, 'emotionsRising', (item) => item.kind);
    const quieterItems = sure(plan.emotionsQuieter, 'emotionsQuieter', (item) => item.kind);
    const rising = risingItems.map((item) => item.kind);
    const quieter = quieterItems.map((item) => item.kind);
    /*
     * WHAT THE FLOOR WAS HIDING. A feeling the plan is only moderately sure of is not a claim worth a sentence of its own, but
     * it is still part of the day's setting - and with nothing else named, a card that says nothing about how a day may feel
     * has lost more than it has protected. The strongest such feeling (one per kind) is said softly, as "a little", never
     * beside its own counterpart, and the plan's low-confidence items never reach the card at all.
     */
    const named = new Set([...rising, ...quieter]);
    const partnerNamed = (feeling) => Object.entries(COUNTERPART_PAIRS)
        .some(([a, b]) => (feeling === a && named.has(b)) || (feeling === b && named.has(a)));
    const softRising = plan.emotionsRising.find((item) => item.confidence === 'medium' && !named.has(item.kind) && !partnerNamed(item.kind));
    const softQuieter = plan.emotionsQuieter.find((item) => item.confidence === 'medium' && !named.has(item.kind) && !partnerNamed(item.kind));
    const softItems = [softRising, softQuieter].filter((item) => item !== undefined);
    const emotionalClimate = rising.length + quieter.length + softItems.length === 0 ? null : {
        rising, quieter,
        softRising: softRising ? softRising.kind : null,
        softQuieter: softQuieter ? softQuieter.kind : null,
        basis: mergeBasis([...risingItems, ...quieterItems, ...softItems].map((item) => item.basis)),
    };
    /* ---- what else the day fits ---- */
    const goodUse = plan.goodUse
        .filter((item) => !lead.includes(item.kind))
        .map((item) => ({ activity: item.kind, basis: item.basis, confidence: item.confidence }));
    const moveShown = move ? { kind: move.kind, basis: move.basis, confidence: move.confidence } : null;
    const fingerprint = [
        glance.headline, [...glance.lead].sort().join('+'), [...glance.stances].sort().join('+'), glance.tension ?? '-', glance.contrast ?? '-',
        glance.background ? `${glance.background.relation}:${glance.background.pole ?? '-'}` : '-',
        easier.map((item) => (item.type === 'pole' ? `${item.pole}${item.reconciled ? '*' : ''}` : `~${item.tension}`)).join(','),
        careShown.map((item) => (item.type === 'tension' ? `t:${item.tension}` : item.type === 'avoid' ? item.avoid : item.type === 'rely' ? `r:${item.reliance}${item.reconciledWith ? '*' : ''}` : item.pitfall)).join(','),
        rising.join(','), quieter.join(','), goodUse.map((item) => item.activity).join(','), moveShown?.kind ?? '-',
    ].join('|');
    return { glance, easier, care: careShown, emotionalClimate, goodUse, move: moveShown, reconciliations, heldBack, fingerprint };
}
