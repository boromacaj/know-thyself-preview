import { FAMILIES, familyOf, } from './baziInterpretation.js';
export const STEM_KEYS = ['jia', 'yi', 'bing', 'ding', 'wu', 'ji', 'geng', 'xin', 'ren', 'gui'];
/* --------------------------------------------------------------- helpers */
/** Generating order of the families as seen from the Day Master: each feeds the next. */
const CYCLE = ['companion', 'output', 'wealth', 'authority', 'resource'];
const at = (family, step) => CYCLE[(CYCLE.indexOf(family) + step + 5) % 5];
/** The family `family` checks in the controlling cycle. */
const controls = (family) => at(family, 2);
/** The family that sits between a controller and what it controls. */
const between = (controller) => at(controller, 1);
const DRAINS = ['output', 'wealth', 'authority'];
/*
 * THE EDITORIAL CUTS. None of these is a figure from the tradition; each is
 * this project's convention for turning a weight into a word, chosen so that a
 * single visible character (weight 1) is the natural unit.
 */
/** Weight at which a family counts as carried by the chart: one visible character. */
const PRESENT = 1;
/** Below this a family barely registers: under half a character. */
const SCARCE = 0.5;
/** A runner-up this close to the lead shares it (three quarters of the lead's weight). */
const CLOSE = 0.75;
/** A runner-up this close is "almost equal" rather than merely close behind. */
const NEAR = 0.9;
/** Closer than this the two weigh the same (a twentieth of a character). */
const TIE = 0.05;
/** The two kinds inside a family: even from nine tenths, near from seven tenths. */
const KINDS_EVEN = 0.9;
const KINDS_NEAR = 0.7;
/** A pull whose weaker side clears the heavy cut by less than this is worded as a tendency. */
const PULL_SLIGHT = 0.2;
function factsOf(reading, weight = reading.weight) {
    const ranked = Object.entries(reading.godWeights)
        .filter(([, value]) => value > 0)
        .sort((a, b) => b[1] - a[1]);
    const [main, other] = ranked;
    const named = other && other[1] >= SCARCE ? other : null;
    const ratio = main && named ? named[1] / main[1] : 0;
    return {
        family: reading.family,
        phase: reading.phase,
        weight,
        mainGod: main?.[0] ?? null,
        otherGod: named ? named[0] : null,
        mix: named ? (ratio >= KINDS_EVEN ? 'even' : ratio >= KINDS_NEAR ? 'near' : 'some') : null,
    };
}
const sideOf = (side) => ({
    position: side.position, family: side.family, god: side.god, phase: side.phase,
});
const pair = (relation) => (relation.sides.length >= 2 ? [sideOf(relation.sides[0]), sideOf(relation.sides[1])] : null);
const familyPairKey = (a, b) => [a, b].sort().join('|');
const has = (sides, family, god) => sides.some((side) => side.family === family && (!god || side.god === god));
/** What an opposition between these two sides means - the voice's categories, decided once here. */
function clashMeaningOf(sides) {
    if (has(sides, 'self'))
        return 'against-self';
    if (has(sides, 'output') && has(sides, 'authority')) {
        if (has(sides, 'output', 'Eating God') && has(sides, 'authority', 'Seven Killings'))
            return 'skill-vs-pressure';
        if (has(sides, 'output', 'Hurting Officer') && has(sides, 'authority', 'Direct Officer'))
            return 'speech-vs-order';
        return 'expression-vs-rules';
    }
    if (has(sides, 'output') && has(sides, 'resource'))
        return 'intake-vs-expression';
    if (has(sides, 'wealth') && has(sides, 'resource'))
        return 'work-vs-nourishment';
    if (has(sides, 'companion') && has(sides, 'wealth'))
        return 'will-vs-holding';
    if (has(sides, 'companion') && has(sides, 'authority'))
        return 'independence-vs-structure';
    if (sides[0].family === sides[1].family)
        return 'same-kind';
    return 'unsettled';
}
const bindingMeaningOf = (sides) => (has(sides, 'companion', 'Rob Wealth') && has(sides, 'authority', 'Seven Killings') ? 'contest' : 'held');
/**
 * Which claims say the same thing. Two clashes with one meaning make one point
 * however many places the chart makes it - the reading says it once and notes
 * that it recurs. Where the words would name a specific side (the thing that
 * pushes against you; two versions of one family), the side is part of the key,
 * because then the two are not the same sentence.
 */
function semanticKey(claim) {
    switch (claim.kind) {
        case 'bound': return `bound:${claim.partner.family}`;
        case 'clash': {
            const detail = ['against-self', 'same-kind', 'unsettled'].includes(claim.meaning)
                ? `:${claim.sides.map((side) => `${side.family}/${side.god ?? '-'}`).sort().join('|')}` : '';
            return `clash:${claim.meaning}${detail}`;
        }
        case 'binding': return `binding:${claim.meaning}${claim.meaning === 'held'
            ? `:${claim.sides.map((side) => `${side.family}/${side.god ?? '-'}`).sort().join('|')}` : ''}`;
        case 'pull': return `pull:${claim.controller.family}>${claim.controlled.family}`;
        case 'doubled': return `doubled:${claim.sides[0]?.phase ?? ''}`;
        case 'latent': return `latent:${claim.phase}`;
        case 'friction': return `friction:${claim.category}`;
        default: return 'unknown';
    }
}
/* ------------------------------------------------------------------ plan */
export function planBaziNarrative(model) {
    const stem = model.dayMaster.stem.trim().toLowerCase();
    const approximate = model.time.precision === 'approximate';
    const partial = !model.time.hour;
    const families = model.families;
    const without = (family) => families[family].weight - families[family].hourWeight;
    /* --------------------------------------------------------- the nature */
    const nature = [];
    if (model.time.precision !== 'exact') {
        nature.push({
            kind: 'time',
            precision: model.time.precision === 'unknown' || !model.time.hour ? 'unknown' : 'approximate',
            characters: model.counts.visibleTotal,
            dateBoundary: model.time.dateBoundary,
        });
    }
    nature.push({
        kind: 'nature',
        stem,
        phase: model.dayMaster.phase,
        polarity: model.dayMaster.polarity,
        season: model.season
            ? { ruling: model.season.ruling, monthBranch: model.season.monthBranch, state: model.season.state }
            : null,
    });
    const heaviestDrain = [...DRAINS].sort((a, b) => families[b].weight - families[a].weight
        || DRAINS.indexOf(a) - DRAINS.indexOf(b))[0];
    nature.push({
        kind: 'support',
        band: model.strength.band,
        tendency: model.strength.tendency,
        confidence: model.strength.confidence,
        nearLine: model.strength.nearLine,
        phase: model.dayMaster.phase,
        own: model.own.share,
        companions: families.companion.weight,
        heaviestDrain,
        precision: model.time.precision,
        characters: model.counts.visibleTotal,
    });
    /* ------------------------------------------------------------- helpers */
    const [first, second] = model.ranking;
    const band = model.strength.band;
    let primaryHelper;
    let secondaryHelper = null;
    let bridge = null;
    if (band === 'thin') {
        primaryHelper = first === 'wealth' ? 'companion' : 'resource';
        secondaryHelper = primaryHelper === 'resource' ? 'companion' : 'resource';
    }
    else if (band === 'ample') {
        primaryHelper = first === 'output' || first === 'resource' ? 'wealth' : 'output';
        secondaryHelper = 'authority';
    }
    else {
        /* Even: what keeps the two heaviest pulls from grinding against each other. */
        const heavy = [first, second].filter((family) => families[family].weight >= PRESENT);
        const [a, b] = heavy;
        if (a && b && (controls(a) === b || controls(b) === a)) {
            const controller = controls(a) === b ? a : b;
            primaryHelper = between(controller);
            bridge = { between: [controller, controls(controller)] };
        }
        else {
            const outlets = ['output', 'wealth']
                .filter((family) => families[family].weight < PRESENT)
                .sort((x, y) => families[x].weight - families[y].weight);
            primaryHelper = outlets[0] ?? 'resource';
        }
    }
    const helps = {
        kind: 'helps',
        band,
        primary: factsOf(families[primaryHelper]),
        secondary: secondaryHelper ? factsOf(families[secondaryHelper]) : null,
        bridge,
        dayMasterPhase: model.dayMaster.phase,
        partial,
    };
    /* ------------------------------------------------------------ the energy */
    const energy = [];
    const lead = factsOf(families[first]);
    const runnerUp = families[second];
    const ratio = families[first].weight > 0 ? runnerUp.weight / families[first].weight : 0;
    const shares = runnerUp.weight >= PRESENT && ratio >= CLOSE;
    const closeness = !shares ? null
        : Math.abs(runnerUp.weight - families[first].weight) < TIE ? 'tie'
            : ratio >= NEAR ? 'near' : 'close';
    const secondRestsOnHour = shares && approximate
        && (without(second) < PRESENT || without(second) < without(first) * CLOSE);
    energy.push({
        kind: 'lead',
        band,
        lead,
        second: shares ? factsOf(runnerUp) : null,
        closeness,
        secondRestsOnHour,
    });
    /* What the chart barely carries - leaving out what the support line already
       said (no company of your own kind) and what the helps line will say. */
    const coveredBySupport = model.own.share === 'alone' ? ['companion'] : [];
    const coveredByHelps = [helps.primary.family, helps.secondary?.family].filter(Boolean);
    const scarce = model.scarce
        .filter((family) => !coveredBySupport.includes(family) && !coveredByHelps.includes(family))
        .slice(0, 2)
        .map((family) => factsOf(families[family]));
    if (scarce.length > 0) {
        energy.push({
            kind: 'scarce',
            band,
            lead: first,
            families: scarce,
            present: FAMILIES.filter((family) => families[family].weight >= PRESENT),
            partial,
        });
    }
    energy.push({
        kind: 'polarity',
        lean: model.polarity.lean,
        dayMaster: model.polarity.dayMaster,
        restsOnHour: approximate && model.polarity.lean !== model.polarity.leanWithoutHour,
    });
    /* ----------------------------------------------------------- the tension */
    const candidates = [];
    const claimedPairs = new Set();
    for (const relation of model.relations) {
        const sides = pair(relation);
        const restsOnHour = approximate && relation.involvesHour;
        const disputed = (evidence) => (restsOnHour ? 'tentative' : evidence);
        switch (relation.category) {
            case 'stem-combination': {
                if (!sides)
                    break;
                if (relation.involvesDayMaster) {
                    const partner = sides.find((side) => side.family !== 'self');
                    if (!partner)
                        break;
                    candidates.push({
                        claim: { kind: 'bound', partner, evidence: disputed('moderate'), restsOnHour, also: [] },
                        priority: 1,
                    });
                }
                else {
                    candidates.push({
                        claim: {
                            kind: 'binding', relation: 'stem', sides, meaning: bindingMeaningOf(sides),
                            evidence: disputed('moderate'), restsOnHour, also: [],
                        },
                        priority: 3,
                    });
                }
                claimedPairs.add(familyPairKey(sides[0].family, sides[1].family));
                break;
            }
            case 'stem-clash':
            case 'branch-six-clash': {
                if (!sides)
                    break;
                candidates.push({
                    claim: {
                        kind: 'clash', relation: relation.category === 'stem-clash' ? 'stem' : 'branch',
                        sides, meaning: clashMeaningOf(sides), evidence: disputed('moderate'), restsOnHour, also: [],
                    },
                    priority: 2,
                });
                claimedPairs.add(familyPairKey(sides[0].family, sides[1].family));
                break;
            }
            case 'branch-six-harmony': {
                if (!sides)
                    break;
                candidates.push({
                    claim: {
                        kind: 'binding', relation: 'branch', sides, meaning: bindingMeaningOf(sides),
                        evidence: disputed('moderate'), restsOnHour, also: [],
                    },
                    priority: 3,
                });
                break;
            }
            case 'branch-self-punishment': {
                candidates.push({
                    claim: { kind: 'doubled', sides: relation.sides.map(sideOf), evidence: 'tentative', restsOnHour, also: [] },
                    priority: 5,
                });
                break;
            }
            case 'branch-three-harmony': {
                const phase = relation.resultingPhase;
                if (!phase)
                    break;
                const family = familyOf(model.dayMaster.phase, phase);
                candidates.push({
                    claim: {
                        kind: 'latent', phase, family, sides: relation.sides.map(sideOf),
                        evidence: relation.complete ? disputed('moderate') : 'tentative', restsOnHour, also: [],
                    },
                    priority: relation.complete ? 3 : 6,
                });
                break;
            }
            case 'branch-six-harm':
            case 'branch-three-punishment':
            case 'branch-mutual-punishment': {
                candidates.push({
                    claim: {
                        kind: 'friction', category: relation.category === 'branch-six-harm' ? 'harm' : 'punishment',
                        sides: relation.sides.map(sideOf), evidence: 'tentative', restsOnHour, also: [],
                    },
                    priority: 7,
                });
                break;
            }
            default:
                break;
        }
    }
    /* The pulls between heavy families that no relation has already named. Heavy
       means above an even share of the chart - a fifth of everything the stems and
       the branches carry - so a lone hidden stem does not make a family a force.
       A pull that only just clears that line is kept, and worded as a tendency. */
    const total = FAMILIES.reduce((sum, family) => sum + families[family].weight, 0);
    const totalHour = FAMILIES.reduce((sum, family) => sum + families[family].hourWeight, 0);
    const heavy = total / 5;
    const heavyWithoutHour = (total - totalHour) / 5;
    for (const controller of FAMILIES) {
        const controlled = controls(controller);
        if (families[controller].weight < heavy || families[controlled].weight < heavy)
            continue;
        if (claimedPairs.has(familyPairKey(controller, controlled)))
            continue;
        const restsOnHour = approximate
            && (without(controller) < heavyWithoutHour || without(controlled) < heavyWithoutHour);
        const clearance = Math.min(families[controller].weight, families[controlled].weight) - heavy;
        candidates.push({
            claim: {
                kind: 'pull', controller: factsOf(families[controller]), controlled: factsOf(families[controlled]),
                margin: clearance < PULL_SLIGHT ? 'slight' : 'clear', band,
                evidence: restsOnHour ? 'tentative' : 'moderate', restsOnHour, also: [],
            },
            priority: 4,
        });
    }
    /*
     * ORDER, THEN FOLD, THEN CAP. What stands without the estimated hour comes
     * first; within that, by this project's ranking of how much weight each
     * relation carries (a bond to the Day Master, then clashes, bindings, pulls,
     * disputed frames) - an editorial order, not a classical one. Claims that
     * make the same point fold into the first of them, so the cap of three counts
     * distinct points rather than repeats. Nothing weaker than a disputed frame
     * reaches the main reading unless there is nothing else to say.
     */
    const ordered = candidates
        .map((candidate, index) => ({ ...candidate, index }))
        .sort((a, b) => (Number(a.claim.restsOnHour) - Number(b.claim.restsOnHour))
        || (a.priority - b.priority)
        || (a.index - b.index));
    const groups = new Map();
    for (const entry of ordered) {
        const key = semanticKey(entry.claim);
        const group = groups.get(key);
        if (group)
            group.also.push(entry.claim);
        else
            groups.set(key, { claim: entry.claim, priority: entry.priority, also: [] });
    }
    /* A Map keeps insertion order, so the groups stay in the order above. */
    const folded = [...groups.values()].map((group) => ({
        claim: { ...group.claim, also: group.also },
        priority: group.priority,
    }));
    const main = folded.filter((entry) => entry.priority <= 5).slice(0, 3);
    const tension = (main.length > 0 ? main : folded.slice(0, 1)).map((entry) => entry.claim);
    const deferred = folded.map((entry) => entry.claim).filter((claim) => !tension.includes(claim));
    /* ------------------------------------------------------ cost and practice */
    const cost = {
        kind: 'cost', stem, band, lead, partner: shares ? second : null, state: model.season?.state ?? null,
    };
    const scarceAll = model.scarce;
    let focus;
    if (first === 'output' && scarceAll.includes('wealth'))
        focus = 'collect';
    else if (first === 'authority' && scarceAll.includes('output'))
        focus = 'answer';
    else if ((first === 'companion' || first === 'authority') && scarceAll.includes('wealth'))
        focus = 'aim';
    else if (first === 'resource' && families.companion.weight < SCARCE)
        focus = 'act-with-others';
    else {
        focus = {
            output: 'channel', wealth: 'pace', authority: 'own-standard', resource: 'act', companion: 'share',
        }[first];
    }
    const practice = {
        kind: 'practice', stem, band, helper: helps.primary, dayMasterPhase: model.dayMaster.phase, focus,
    };
    return { stem, nature, energy, tension, deferred, helps, cost, practice };
}
