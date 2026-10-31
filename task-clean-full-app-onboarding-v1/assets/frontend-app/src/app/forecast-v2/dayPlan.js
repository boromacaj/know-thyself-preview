import { feelingSupport, poleSupport, rawPoleWeight } from './dayEvidence.js?v=f9ab0a6';
import { THRESHOLDS, confidenceOf, synthesiseDay } from './daySynthesis.js?v=f9ab0a6';
import { DAY_ENGINE_VERSION, OPPOSITE_POLE, } from './dayTypes.js?v=f9ab0a6';
/*
 * Fifteen activities, each a short weighted sum over the poles. The weights say
 * how much each pole bears on the activity; the cluster keeps the day from
 * recommending four kinds of desk work and nothing else. Order is the tie-break.
 */
export const ACTIVITY_RULES = [
    { activity: 'deep-work', needs: ['narrow'], weights: { narrow: 1, unhurried: 0.5, inward: 0.4, smooth: 0.3 }, cluster: 'work' },
    { activity: 'editing-and-review', needs: ['narrow', 'keep-open'], weights: { narrow: 0.8, 'keep-open': 0.6, unhurried: 0.3, smooth: 0.3 }, cluster: 'work' },
    { activity: 'administration', needs: ['narrow'], weights: { narrow: 0.8, unhurried: 0.4, commit: 0.4, contained: 0.3 }, cluster: 'work' },
    { activity: 'research', needs: ['narrow', 'inward'], weights: { narrow: 0.6, inward: 0.5, wide: 0.3 }, cluster: 'work' },
    { activity: 'planning', needs: ['commit', 'narrow'], weights: { commit: 0.6, narrow: 0.5, 'keep-open': 0.3, unhurried: 0.3 }, cluster: 'work' },
    { activity: 'finishing-work', needs: ['finish'], weights: { finish: 1, narrow: 0.5, unhurried: 0.2 }, cluster: 'closing' },
    { activity: 'cleanup-organisation', needs: ['finish', 'narrow'], weights: { finish: 0.6, narrow: 0.5, unhurried: 0.2, commit: 0.3 }, cluster: 'closing' },
    { activity: 'social-connection', needs: ['outward'], weights: { outward: 1, open: 0.4, smooth: 0.4, speak: 0.3 }, blockedBy: 'charged', cluster: 'people' },
    { activity: 'difficult-conversation', needs: ['speak', 'smooth'], needsAll: true, weights: { speak: 0.7, smooth: 0.7, commit: 0.3, open: 0.3 }, blockedBy: 'charged', cluster: 'people' },
    { activity: 'negotiation', needs: ['commit', 'smooth'], needsAll: true, weights: { commit: 0.6, smooth: 0.7, speak: 0.4 }, blockedBy: 'charged', cluster: 'people' },
    { activity: 'brainstorming', needs: ['wide'], weights: { wide: 1, begin: 0.4, outward: 0.3, speak: 0.2, smooth: 0.2 }, cluster: 'ideas' },
    { activity: 'creative-exploration', needs: ['wide'], weights: { wide: 0.6, open: 0.3, begin: 0.4, outward: 0.2, inward: 0.2 }, cluster: 'ideas' },
    { activity: 'starting-work', needs: ['begin'], weights: { begin: 1, commit: 0.5, urgent: 0.4 }, cluster: 'movement' },
    { activity: 'physical-activity', needs: ['urgent'], weights: { urgent: 1, begin: 0.3, outward: 0.2 }, cluster: 'movement' },
    { activity: 'rest', needs: ['inward', 'unhurried', 'listen'], weights: { inward: 0.6, unhurried: 0.6, open: 0.3, listen: 0.3 }, cluster: 'rest' },
];
/** What each led pole asks the day to be used for. `charged` leads to a pitfall, not a stance. */
const STANCE_POLES = [
    'urgent', 'unhurried', 'wide', 'narrow', 'outward', 'inward', 'open', 'contained',
    'begin', 'finish', 'commit', 'keep-open', 'smooth', 'speak', 'listen',
];
/** What forcing against a led pole looks like. `null`: nothing worth warning about. */
export const AVOID_OF_POLE = {
    /* `urgent` has no entry: momentum is something to use, and "do not take on too much" was the same caution on most days of the year. */
    urgent: null, unhurried: 'rushing', wide: 'closing-options-early', narrow: 'splitting-attention',
    /* `open` has no entry: "pay attention to what you feel" and "do not carry on regardless" are one idea, said once under Lean into. */
    outward: null, inward: 'forced-sociability', open: null, contained: 'pressing-for-openness',
    begin: null, finish: 'opening-new-fronts', commit: null, 'keep-open': 'forcing-a-conclusion',
    charged: 'pressing-a-point', smooth: null, speak: null, listen: 'pressing-your-case',
};
/**
 * What a LEAD is best set against: only where working against its own pole has a
 * cost worth naming in the opening line. Narrower than AVOID_OF_POLE on purpose -
 * "physical activity suits today better than taking on more than the day can hold"
 * is a caution, not a contrast, and belongs under Avoid forcing.
 */
export const CONTRAST_OF_POLE = {
    unhurried: 'rushing', wide: 'closing-options-early', narrow: 'splitting-attention', inward: 'forced-sociability',
    finish: 'opening-new-fronts', 'keep-open': 'forcing-a-conclusion', listen: 'pressing-your-case', charged: 'pressing-a-point',
};
/** The transiting body behind a hard contact decides which pitfall, and which unreliable habit, is worth naming. */
export const PITFALL_OF_BODY = {
    Mercury: 'crossed-wires', Mars: 'sharp-edges', Moon: 'taking-things-personally',
    Venus: 'wobbly-preferences', Sun: 'proving-a-point',
};
const RELIANCE_OF_BODY = {
    Mercury: 'first-readings', Moon: 'a-passing-mood', Mars: 'urgency', Venus: 'quick-appeal', Sun: 'certainty',
};
/** Order is the tie-break between bodies of equal standing. */
const BODY_ORDER = ['Mercury', 'Mars', 'Moon', 'Venus', 'Sun'];
/** A feeling and the capacity that is its counterpart: naming both from one source is saying one thing twice. */
const COUNTERPART = {
    patience: 'impatience',
    'emotional-distance': 'sensitivity',
    'staying-power': 'restlessness',
    'appetite-for-company': 'reflectiveness',
};
/**
 * Some poles are true of most days and say little when they lead. The Moon touches
 * the chart so often that feeling is open on a third of the year; "pay attention to
 * what you feel" under Lean into on every one of those days is wallpaper. It is said
 * when feeling truly leads - and the Emotional weather section already carries the
 * rest.
 */
export const LEAN_MIN = { open: 0.9, commit: 0.9, speak: 0.9 };
export const EMOTION_MIN = 0.5;
export const ACTIVITY_MIN = 0.7;
const RISING = [
    'sensitivity', 'impatience', 'irritability', 'restlessness', 'warmth', 'reflectiveness', 'wistfulness', 'self-assurance',
];
const QUIETER = [
    'patience', 'emotional-distance', 'access-to-feelings', 'appetite-for-company', 'spontaneity', 'staying-power',
];
const TENSION_ID = (tension) => tension.id;
/*
 * PRESSURE IS NOT MOMENTUM.
 *
 * The pole `urgent` is fed by two different things, and the knowledge rows already say so.
 * An easy or merging contact (and the cycle numbers, and a fire-sign Moon) presses
 * urgency as MOMENTUM: self-assurance, energy to use. A HARD contact presses it as PRESSURE:
 * the same rows give it `charged` beside `urgent`, name impatience and irritability as
 * the feelings it brings forward and patience as the capacity it takes away, and the
 * plan's own caution for it is "don't rely on the feeling that something cannot wait".
 *
 * Read as one pole, the two were indistinguishable at the moment the plan recommends
 * something: 43% of all `urgent` weight came from hard contacts, and on 62% of the days
 * physical activity led the glance, friction led the day's other axis - a card that said
 * "physical activity suits today well" and "don't rely on the feeling that something
 * cannot wait" from the same contact.
 *
 * So everything that RECOMMENDS ACTING ON the energy - the activities that need it, the
 * "use the momentum" lean, and the glance that is built from them - reads the urgency
 * that is not pressure. Everything that CAUTIONS - the pace tension, "don't rely on",
 * "watch for", the feelings - still reads all of it, so no caution is lost. Nothing is
 * removed from the facts or from any basis; the hard contact is still a trigger.
 */
export const isPressure = (fact) => fact.provenance.quality === 'hard';
/* --------------------------------------------------------------- the builder -- */
export function buildDayPlan(day) {
    const synthesis = synthesiseDay(day.facts);
    const byId = new Map(day.facts.map((fact) => [fact.id, fact]));
    const refOf = (fact) => ({
        id: fact.id, pillar: fact.pillar, mechanism: fact.mechanism, role: fact.role,
        independenceGroup: fact.independenceGroup, label: fact.label, confidence: fact.reliability,
    });
    /**
     * One representative fact per counted group, strongest first, so a basis lists
     * influences and not every aspect. The strongest group of EACH pillar comes
     * first: a claim two pillars agree on must be able to show both, however many
     * astrology groups outweigh the numerology one.
     */
    const representatives = (support, limit) => {
        const counted = support.groups.filter((group) => group.counted > 0);
        const firstPerPillar = support.pillars
            .map((pillar) => counted.find((group) => group.pillar === pillar))
            .filter((group) => group !== undefined);
        const ordered = [...firstPerPillar, ...counted.filter((group) => !firstPerPillar.includes(group))];
        return ordered.slice(0, Math.max(limit, firstPerPillar.length)).map((group) => refOf(byId.get(group.factIds[0])));
    };
    /** `acting`: the basis of a recommendation to ACT, which reads momentum, not pressure, for the pole `urgent`. */
    const basisOf = (poles, tension = null, acting = false) => {
        const triggers = [];
        const background = [];
        let witnesses = 0;
        for (const pole of poles) {
            const reading = synthesis.poles.get(pole);
            const support = acting && pole === 'urgent' ? momentum : reading.trigger;
            triggers.push(...representatives(support, 3));
            background.push(...representatives(reading.background, 2).filter((ref) => reading.background.total >= THRESHOLDS.backgroundMin));
            witnesses = Math.max(witnesses, support.witnesses);
        }
        /* One fact per INFLUENCE, strongest first: a claim spanning several poles would otherwise list the same
           transit once per pole, and "which influences" is the question a basis answers. */
        const unique = (refs) => {
            const seen = new Set();
            return refs.filter((ref) => {
                if (seen.has(ref.independenceGroup))
                    return false;
                seen.add(ref.independenceGroup);
                return true;
            });
        };
        const t = unique(triggers);
        const b = unique(background);
        const groups = [...new Set([...t, ...b].map((ref) => ref.independenceGroup))].sort();
        const triggerGroups = new Set(t.map((ref) => ref.independenceGroup));
        return {
            triggers: t, background: b, tension, groups,
            convergence: witnesses >= 2 ? 'cross-pillar' : triggerGroups.size >= 2 ? 'same-pillar' : 'single-source',
        };
    };
    /* Poles inside a trigger-vs-trigger contest are interpreted as that contest, so they stop speaking alone. */
    const contested = new Set();
    for (const tension of synthesis.tensions) {
        if (tension.kind === 'trigger-vs-trigger')
            for (const side of tension.sides)
                contested.add(side.pole);
    }
    const trig = (pole) => (contested.has(pole) ? 0 : synthesis.poles.get(pole).trigger.total);
    /* The urgency that is momentum: the same support, without the hard contacts (see isPressure). */
    const momentum = poleSupport(synthesis.triggers.filter((fact) => !isPressure(fact)), 'urgent');
    /*
     * AND IT NEEDS A PRIMARY SOURCE. A day may lean on momentum - and so recommend acting on it - only if some
     * contact makes urgency its PRIMARY meaning (Mars awake, by its own transit or through the Moon). The cycle
     * numbers 1, 5 and 8, a fire-sign Moon and the flavour a natal planet adds to every contact it receives all
     * press urgency as a secondary note: they count toward the total, and on their own they were 22% of the days
     * physical activity led - "the same sentence attached to most days", which is exactly why a longer stretch may
     * only be claimed by a cycle's primary meaning (see NAMEABLE below). Same principle, same reason.
     */
    const momentumAnchored = synthesis.triggers.some((fact) => !isPressure(fact) && fact.strength !== 'slight'
        && fact.reliability !== 'low' && fact.effects.some((effect) => effect.pole === 'urgent' && effect.weight === 'primary'));
    const paceAxis = synthesis.axes.find((axis) => axis.axis === 'pace');
    /* Momentum leads the pace axis only where the day already leads on urgency AND the momentum alone is enough to lead it. */
    const momentumLeads = paceAxis?.leading === 'urgent' && !contested.has('urgent')
        && momentum.total >= THRESHOLDS.leadMin && momentum.total > synthesis.poles.get('unhurried').trigger.total && momentumAnchored;
    const usable = (pole) => (pole === 'urgent' ? (contested.has(pole) ? 0 : momentum.total) : trig(pole));
    /* What opposes a pole is read in full: pressure still counts against taking time. */
    const net = (pole) => Math.max(0, usable(pole) - 0.5 * trig(OPPOSITE_POLE[pole]));
    const leadOf = (pole) => (pole === 'urgent' && !momentumLeads
        ? null
        : synthesis.axes.find((axis) => axis.leading === pole && !contested.has(pole)) ?? null);
    /* A lead on momentum is as sure as the momentum is, not as sure as momentum plus pressure. */
    const confidenceOfLead = (pole, axisConfidence) => {
        if (pole !== 'urgent')
            return axisConfidence;
        const reading = synthesis.poles.get('urgent');
        return confidenceOf({ ...reading, trigger: { ...momentum, pole: 'urgent' } }, trig('unhurried'), false);
    };
    const scored = [];
    for (const rule of ACTIVITY_RULES) {
        const leading = rule.needs.map((pole) => ({ pole, axis: leadOf(pole) })).filter((entry) => entry.axis !== null);
        if (leading.length === 0 || (rule.needsAll && leading.length < rule.needs.length))
            continue;
        if (rule.blockedBy && trig(rule.blockedBy) > 0.3)
            continue;
        const score = Object.entries(rule.weights).reduce((sum, [pole, weight]) => sum + net(pole) * weight, 0);
        if (score < ACTIVITY_MIN)
            continue;
        const best = leading.sort((left, right) => net(right.pole) - net(left.pole))[0];
        scored.push({ rule, score, confidence: confidenceOfLead(best.pole, best.axis.confidence) ?? 'medium', from: best.pole });
    }
    scored.sort((left, right) => right.score - left.score || ACTIVITY_RULES.indexOf(left.rule) - ACTIVITY_RULES.indexOf(right.rule));
    /* Different kinds of work first, then the best of what is left. */
    const picked = [];
    for (const entry of scored) {
        if (picked.length < 3 && !picked.some((chosen) => chosen.rule.cluster === entry.rule.cluster))
            picked.push(entry);
    }
    for (const entry of scored) {
        if (picked.length < 3 && !picked.includes(entry))
            picked.push(entry);
    }
    const goodUse = picked
        .filter((entry) => entry.confidence !== 'low')
        .map((entry) => ({
        kind: entry.rule.activity, confidence: entry.confidence,
        basis: basisOf(Object.keys(entry.rule.weights).filter((pole) => net(pole) > 0.2), null, true),
    }));
    /* ---- tensions, interpreted ---- */
    const triggerTensions = synthesis.tensions
        .filter((tension) => tension.kind === 'trigger-vs-trigger')
        .sort((left, right) => (right.sides[0].support + right.sides[1].support) - (left.sides[0].support + left.sides[1].support))
        .slice(0, 2);
    const tensionItems = () => triggerTensions.map((tension) => ({
        kind: `tension:${TENSION_ID(tension)}`,
        confidence: tension.sides.every((side) => side.support >= 0.7) ? 'high' : 'medium',
        basis: basisOf(tension.sides.map((side) => side.pole), TENSION_ID(tension)),
    }));
    /* ---- lean into: the poles the day clearly leads on ---- */
    const ledPoles = synthesis.axes
        .filter((axis) => axis.state === 'clear' && axis.leading && !contested.has(axis.leading) && axis.confidence !== 'low')
        .filter((axis) => STANCE_POLES.includes(axis.leading))
        .sort((left, right) => synthesis.poles.get(right.leading).trigger.total - synthesis.poles.get(left.leading).trigger.total);
    /* "Use the momentum" is advice to act: it reads momentum, and a day led on pressure alone does not get it. */
    const leanPoles = ledPoles.filter((axis) => axis.leading !== 'urgent' || momentumLeads);
    const leanInto = [
        ...tensionItems().map((item) => ({ ...item, kind: item.kind })),
        ...leanPoles
            .filter((axis) => synthesis.poles.get(axis.leading).trigger.total >= (LEAN_MIN[axis.leading] ?? 0))
            .slice(0, Math.max(0, 3 - triggerTensions.length)).map((axis) => ({
            kind: `pole:${axis.leading}`, confidence: confidenceOfLead(axis.leading, axis.confidence), basis: basisOf([axis.leading], null, true),
        })),
    ].slice(0, 3);
    /* ---- avoid forcing: what working against a led pole costs ---- */
    const avoidFromPoles = synthesis.axes
        .filter((axis) => axis.state === 'clear' && axis.leading && !contested.has(axis.leading) && axis.confidence !== 'low')
        .filter((axis) => AVOID_OF_POLE[axis.leading] !== null)
        .sort((left, right) => synthesis.poles.get(right.leading).trigger.total - synthesis.poles.get(left.leading).trigger.total)
        .map((axis) => ({
        kind: AVOID_OF_POLE[axis.leading], confidence: axis.confidence, basis: basisOf([axis.leading]),
    }));
    const avoidForcing = [
        ...tensionItems().map((item) => ({ ...item, kind: item.kind })),
        ...avoidFromPoles,
    ].slice(0, 2);
    /* ---- feelings: tendencies, from the day's triggers only ---- */
    const triggerFacts = synthesis.triggers;
    const supportFor = (kind, feeling) => feelingSupport(triggerFacts, kind, feeling);
    const feelingBasis = (support) => {
        const refs = support.groups.filter((group) => group.counted > 0).map((group) => refOf(byId.get(group.factIds[0])));
        return {
            triggers: refs, background: [], tension: null,
            groups: [...new Set(refs.map((ref) => ref.independenceGroup))].sort(),
            convergence: support.witnesses >= 2 ? 'cross-pillar' : refs.length >= 2 ? 'same-pillar' : 'single-source',
        };
    };
    const feelingConfidence = (support) => support.total >= 0.9 || support.witnesses >= 2 ? 'high' : 'medium';
    const rising = RISING
        .map((feeling) => ({ feeling, support: supportFor('rising', feeling) }))
        .filter((entry) => entry.support.total >= EMOTION_MIN)
        .sort((left, right) => right.support.total - left.support.total || RISING.indexOf(left.feeling) - RISING.indexOf(right.feeling))
        .slice(0, 2);
    const emotionsRising = rising.map((entry) => ({
        kind: entry.feeling, confidence: feelingConfidence(entry.support), basis: feelingBasis(entry.support),
    }));
    const quieter = QUIETER
        .map((feeling) => ({ feeling, support: supportFor('quieter', feeling) }))
        .filter((entry) => entry.support.total >= EMOTION_MIN)
        /* The counterpart of a feeling already named, from the same influences, adds nothing. */
        .filter((entry) => {
        const partner = COUNTERPART[entry.feeling];
        const named = partner ? rising.find((risen) => risen.feeling === partner) : undefined;
        if (!named)
            return true;
        const own = new Set(entry.support.groups.map((group) => group.group));
        return [...own].some((group) => !named.support.groups.some((other) => other.group === group));
    })
        .sort((left, right) => right.support.total - left.support.total || QUIETER.indexOf(left.feeling) - QUIETER.indexOf(right.feeling))
        .slice(0, 2);
    const emotionsQuieter = quieter.map((entry) => ({
        kind: entry.feeling, confidence: feelingConfidence(entry.support), basis: feelingBasis(entry.support),
    }));
    /* ---- warnings: only where a close hard contact gives a concrete reason ---- */
    /*
     * The Moon makes a hard contact to SOME personal planet on roughly four days in
     * ten, so on its own that is the weather, not a warning. Her hard contacts count
     * only where they wake a luminary (strong), which is about one day in nine.
     */
    const hardContacts = triggerFacts
        .filter((fact) => fact.aspect && fact.aspect.transiting !== 'Jupiter'
        && (fact.aspect.harmonic === 'tension' || fact.aspect.harmonic === 'polarity')
        && (fact.exactness === 'exact' || fact.exactness === 'close') && fact.reliability !== 'low'
        /* An aspect already separating has passed its peak: it is fading, not what today is about. */
        && fact.aspect.phase !== 'separating'
        && (fact.aspect.transiting !== 'Moon' || fact.strength === 'strong'))
        .sort((left, right) => (right.exactness === 'exact' ? 1 : 0) - (left.exactness === 'exact' ? 1 : 0)
        || BODY_ORDER.indexOf(left.aspect.transiting) - BODY_ORDER.indexOf(right.aspect.transiting)
        || left.id.localeCompare(right.id));
    /*
     * "DON'T RELY ON" IS RARE BY CONSTRUCTION.
     *
     * It needs an EXACT hard contact, and the day itself must agree the concern is
     * live: one of the contact's primary poles has to be a pole the day actually
     * leads on (a contest, or a pole an easy aspect outweighs, is not a reason).
     * The Moon's version needs her on the natal Moon. A first version that took any
     * exact hard Moon contact said "don't rely on a passing mood" on one day in five
     * - a caution said that often is background noise, not a caution.
     */
    const leadingPoles = new Set(ledPoles.map((axis) => axis.leading));
    const live = (fact) => fact.effects.some((effect) => effect.weight === 'primary' && leadingPoles.has(effect.pole));
    /* And the contact must land where the habit lives: on a luminary, or on the planet's own natal place. */
    const closeToHome = (fact) => ['Sun', 'Moon'].includes(fact.aspect.natal) || fact.aspect.natal === fact.aspect.transiting;
    /* The Moon on her own natal place comes round every month; as a caution it needs a second pillar to agree feeling is running high. */
    const feelingCorroborated = synthesis.poles.get('open').trigger.witnesses >= 2;
    const exactHard = hardContacts.filter((fact) => fact.exactness === 'exact' && live(fact) && closeToHome(fact)
        && (fact.aspect.transiting !== 'Moon' || (fact.aspect.natal === 'Moon' && feelingCorroborated)));
    const relianceFact = exactHard[0];
    const dontRelyOn = relianceFact
        ? {
            kind: RELIANCE_OF_BODY[relianceFact.aspect.transiting],
            confidence: 'high',
            basis: {
                triggers: [refOf(relianceFact)], background: [], tension: null,
                groups: [relianceFact.independenceGroup], convergence: 'single-source',
            },
        }
        : null;
    /* A pitfall already said as an unreliable habit is not said again for the same body. */
    const seenBodies = new Set(relianceFact ? [relianceFact.aspect.transiting] : []);
    const watchFor = [];
    for (const fact of hardContacts) {
        const body = fact.aspect.transiting;
        if (seenBodies.has(body) || !PITFALL_OF_BODY[body] || !live(fact))
            continue;
        seenBodies.add(body);
        watchFor.push({
            kind: PITFALL_OF_BODY[body],
            confidence: fact.exactness === 'exact' ? 'high' : 'medium',
            basis: { triggers: [refOf(fact)], background: [], tension: null, groups: [fact.independenceGroup], convergence: 'single-source' },
        });
        if (watchFor.length === 2)
            break;
    }
    /* ---- the glance ---- */
    const leadActivities = [];
    if (goodUse[0]) {
        leadActivities.push(goodUse[0].kind);
        const second = scored.find((entry) => entry.rule.activity === goodUse[1]?.kind);
        const first = scored.find((entry) => entry.rule.activity === goodUse[0].kind);
        /* A second lead must be a different KIND of use: "a direct conversation and reaching agreement" is one idea twice. */
        if (second && first && second.score >= 0.6 * first.score && second.rule.cluster !== first.rule.cluster) {
            leadActivities.push(goodUse[1].kind);
        }
    }
    /*
     * WHEN NO ACTIVITY LEADS, A STANCE STILL DOES.
     *
     * A day can lean somewhere without any activity being supported - feeling runs
     * close to the surface, or the pace is unhurried - and the card then carries Lean
     * into items. The glance must not call such a day "fairly even": it said so once
     * above a card that listed three things to lean into and a warning. So the day's
     * top one or two stances open the glance in that case, and "quiet" is kept for a
     * day on which nothing at all leads.
     */
    const leadStances = leadActivities.length > 0 ? [] : leanInto
        .filter((item) => item.kind.startsWith('pole:'))
        .slice(0, 2)
        .map((item) => item.kind.slice('pole:'.length));
    /*
     * THE CONTRAST COMES FROM THE LEAD, NOT FROM THE DAY AT LARGE.
     * "Time with other people suits today better than juggling several things" is a
     * non sequitur: the second half was borrowed from an unrelated pole. What a lead
     * is best set against is what working against ITS OWN pole costs, and where that
     * has nothing worth saying, the glance simply has no "rather than".
     */
    const contrastPoles = leadActivities.length > 0
        ? leadActivities.map((activity) => scored.find((entry) => entry.rule.activity === activity).from)
        : leadStances;
    const contrast = contrastPoles
        .map((pole) => CONTRAST_OF_POLE[pole])
        .find((kind) => kind !== undefined) ?? null;
    /*
     * WHAT THE GLANCE IS ABOUT, AND ONLY THEN WHAT IT SITS IN.
     *
     * The headline is the activity the day most favours. A tension takes the
     * headline only when no activity leads, because a contest on one axis must not
     * erase what the rest of the day plainly favours (which is how three different
     * days once read identically). Otherwise the tension is said second, as what to
     * hold in mind inside the lead. A bare stance comes after a tension: "a pull
     * toward company and toward quiet" says more than "stay close to what you feel".
     *
     * The longer stretch is then named, but only against the poles the glance is
     * actually about - "that fits the longer stretch of X" is a claim, and it has
     * to be about the thing just said - and only in the plain words of a cycle or a
     * pillar. An outer-planet theme ("sudden change", "deep, lasting change") stays
     * in the provenance: it is true, and it is the wrong thing to open a morning with.
     */
    const headline = leadActivities.length > 0
        ? 'lead'
        : triggerTensions[0] ? 'tension' : leadStances.length > 0 ? 'lead' : 'quiet';
    const tensionPoles = triggerTensions[0]?.sides.map((side) => side.pole) ?? [];
    const leadPoles = leadActivities.length > 0
        ? [...new Set(leadActivities.flatMap((activity) => {
                const rule = ACTIVITY_RULES.find((entry) => entry.activity === activity);
                return Object.keys(rule.weights).filter((pole) => net(pole) > 0.3);
            }))]
        : leadStances;
    const drivingPoles = headline === 'tension' ? tensionPoles : leadPoles;
    /* A "fits" or "runs against" is a claim about what the longer stretch is MAINLY about, so only a cycle's primary
       meaning is allowed to make it: its secondary notes would attach the same sentence to most days of a month. */
    /* Only the numerology cycle is named in the glance: its themes are plain words a reader can check against the
       Numerology screen. The BaZi pillars stay in the basis; "structure, rules and responsibility" set beside an
       activity it has no visible connection to reads as a stretch, however the table maps it. */
    const NAMEABLE = new Set(['personal-month', 'personal-year']);
    const NEARER = { 'personal-month': 0, 'personal-year': 1 };
    const strongestBackground = (poles) => {
        let best = null;
        for (const pole of poles) {
            const support = synthesis.poles.get(pole).background;
            for (const group of support.groups) {
                if (group.counted < THRESHOLDS.backgroundMin)
                    continue;
                const candidates = group.factIds.map((id) => byId.get(id))
                    .filter((fact) => NAMEABLE.has(fact.mechanism) && fact.theme
                    && fact.effects.some((effect) => effect.pole === pole && effect.weight === 'primary'))
                    .sort((left, right) => rawPoleWeight(right, pole) - rawPoleWeight(left, pole) || NEARER[left.mechanism] - NEARER[right.mechanism]);
                if (candidates[0] && (!best || group.counted > best.weight))
                    best = { fact: candidates[0], weight: group.counted };
            }
        }
        return best;
    };
    let background = null;
    const opposed = synthesis.tensions.find((tension) => tension.kind === 'trigger-vs-background' && drivingPoles.includes(tension.sides[0].pole));
    if (opposed) {
        const found = strongestBackground([opposed.sides[1].pole]);
        if (found)
            background = { relation: 'opposes', theme: found.fact.theme, factId: found.fact.id };
    }
    if (!background && drivingPoles.length > 0) {
        const found = strongestBackground(drivingPoles);
        if (found)
            background = { relation: 'reinforces', theme: found.fact.theme, factId: found.fact.id };
    }
    const quiet = headline === 'quiet';
    if (!background && quiet) {
        const framing = [...synthesis.background]
            .filter((fact) => NAMEABLE.has(fact.mechanism) && fact.theme)
            .sort((left, right) => NEARER[left.mechanism] - NEARER[right.mechanism] || left.id.localeCompare(right.id))[0];
        if (framing)
            background = { relation: 'frames', theme: framing.theme, factId: framing.id };
    }
    const glanceConfidence = headline === 'lead'
        ? (leadActivities.length > 0
            ? goodUse[0].confidence
            : leanInto.find((item) => item.kind === `pole:${leadStances[0]}`)?.confidence ?? 'medium')
        : headline === 'tension' ? (leanInto[0]?.confidence ?? 'medium') : 'medium';
    const glance = {
        confidence: glanceConfidence,
        headline,
        lead: leadActivities,
        stances: leadStances,
        contrast,
        tension: triggerTensions[0] ? TENSION_ID(triggerTensions[0]) : null,
        background,
        quiet,
        pressure: paceAxis?.leading === 'urgent' && !contested.has('urgent') && !momentumLeads
            && synthesis.triggers.some((fact) => isPressure(fact) && fact.strength !== 'slight' && fact.reliability !== 'low'
                && fact.effects.some((effect) => effect.pole === 'urgent')),
        basis: headline === 'tension'
            ? basisOf(tensionPoles, TENSION_ID(triggerTensions[0]))
            : basisOf(drivingPoles.length > 0 ? drivingPoles : leanPoles.map((axis) => axis.leading), null, true),
    };
    /*
     * ONE PRACTICAL MOVE.
     *
     * It follows what the glance is about. When a tension is the headline - nothing
     * else leads - the move is the way through it. Otherwise a concrete caution
     * outranks an opportunity (reread before you reply beats finish a task), then the
     * day's best use, and only if neither exists the tension's way through. A tension
     * that sits second in the glance must not overwrite the move for what leads it.
     */
    const tensionMove = () => (triggerTensions[0]
        ? {
            kind: `tension:${TENSION_ID(triggerTensions[0])}`,
            confidence: leanInto[0]?.confidence ?? 'medium',
            basis: basisOf(triggerTensions[0].sides.map((side) => side.pole), TENSION_ID(triggerTensions[0])),
        }
        : null);
    let practicalMove = null;
    if (glance.headline === 'tension') {
        practicalMove = tensionMove();
    }
    else if (dontRelyOn) {
        practicalMove = { kind: `reliance:${dontRelyOn.kind}`, confidence: dontRelyOn.confidence, basis: dontRelyOn.basis };
    }
    else if (watchFor[0]) {
        practicalMove = { kind: `pitfall:${watchFor[0].kind}`, confidence: watchFor[0].confidence, basis: watchFor[0].basis };
    }
    else if (goodUse[0]) {
        practicalMove = { kind: `activity:${goodUse[0].kind}`, confidence: goodUse[0].confidence, basis: goodUse[0].basis };
    }
    else {
        practicalMove = tensionMove();
    }
    const omitted = [];
    const note = (slot, empty, reason) => { if (empty)
        omitted.push({ slot, reason }); };
    note('leanInto', leanInto.length === 0, 'no axis leads clearly enough');
    note('avoidForcing', avoidForcing.length === 0, 'nothing the day leads on has a cost worth naming');
    note('emotionsRising', emotionsRising.length === 0, 'no feeling is brought forward with enough weight');
    note('emotionsQuieter', emotionsQuieter.length === 0, 'no capacity is made harder to reach with enough weight');
    note('dontRelyOn', dontRelyOn === null, 'no exact hard contact gives a concrete reason');
    note('goodUse', goodUse.length === 0, 'no activity is supported by a leading pole');
    note('watchFor', watchFor.length === 0, 'no close hard contact gives a concrete reason');
    note('practicalMove', practicalMove === null, 'nothing supports a specific move');
    return {
        engineVersion: DAY_ENGINE_VERSION,
        localDay: day.localDay,
        birthTime: day.birthTime,
        glance,
        leanInto,
        avoidForcing,
        emotionsRising,
        emotionsQuieter,
        dontRelyOn,
        goodUse,
        watchFor,
        practicalMove,
        tensions: synthesis.tensions,
        omitted,
        withheld: day.withheld,
    };
}
export { synthesiseDay };
