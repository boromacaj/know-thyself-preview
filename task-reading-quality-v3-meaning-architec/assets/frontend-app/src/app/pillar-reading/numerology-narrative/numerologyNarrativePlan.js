import { NARRATIVE_POSITIONS, relationOf, } from './numerologyInterpretation.js';
/**
 * THE NUMEROLOGY NARRATIVE PLAN.
 *
 * CALCULATION -> INTERPRETATION MODEL -> PLAN -> VOICE -> SECTIONS. The plan
 * decides WHAT the reading says and in which section, before a word is chosen:
 * what leads, which repeated number is told where, which relation belongs to
 * the tension and which to its own section, what the pattern costs, where it is
 * heading, and which chapter the reader is in. A voice may only say what the
 * plan hands it, so English and Slovak cannot drift into different readings.
 *
 * THREE RULES DO MOST OF THE WORK.
 *
 *   ONE NUMBER, ONE TELLING. A root the chart repeats is told once, in the
 *   section of its heaviest position, with the other positions named there. Every
 *   later mention points back ("the 8 already described") instead of explaining
 *   it again - three positions carrying a 1 are one finding, not three.
 *
 *   ONE RELATION, ONE HOME. A pair the tension names (one number in its anchor,
 *   the other against it) is said in the tension and nowhere else. The pairs it
 *   does not name are read in the section they belong to.
 *
 *   NO INVENTED TENSION. When nothing in the chart is crosswise the plan says so
 *   (gap or aligned) and the cost section carries what agreement costs.
 */
export const NARRATIVE_SECTION_IDS = [
    'numerology-direction', 'numerology-drive', 'numerology-presence',
    'numerology-pull', 'numerology-cost', 'numerology-growth', 'numerology-chapter',
];
/** Which main section reads each position. Balance supports the cost section. */
export const SECTION_OF = {
    'life-path': 'numerology-direction',
    birthday: 'numerology-direction',
    'soul-urge': 'numerology-drive',
    'hidden-passion': 'numerology-drive',
    expression: 'numerology-presence',
    personality: 'numerology-presence',
    attitude: 'numerology-presence',
    maturity: 'numerology-growth',
    balance: 'numerology-cost',
};
/** The compound totals the voice has a tradition note for. */
export const NOTED_COMPOUNDS = [15, 20, 24];
/* ------------------------------------------------------------------ helpers */
const ref = (signal) => ({
    position: signal.position, value: signal.value, root: signal.root, master: signal.master,
});
const groupRef = (group) => ({
    value: group.value,
    root: group.members[0].root,
    positions: group.members.map((member) => member.position),
});
const suppliesIf = (relation, value, beside) => (relation === 'complementary' ? { value, beside } : null);
/** Compounds are read in section order, so a total met a second time points back to the first telling. */
const compoundsOf = (signals, seen) => signals
    .filter((signal) => Boolean(signal && signal.compound !== null && NOTED_COMPOUNDS.includes(signal.compound)))
    .map((signal) => {
    const total = signal.compound;
    const toldBy = seen.get(total) ?? null;
    if (!seen.has(total))
        seen.set(total, signal.position);
    return { position: signal.position, total, root: signal.root, toldBy };
});
/** Section order, for "was this told earlier". */
const rank = (section) => NARRATIVE_SECTION_IDS.indexOf(section);
/**
 * Where each repeated root is told: the section of its heaviest narrative
 * member. Support positions never own a telling.
 */
function echoOwners(model) {
    const owners = new Map();
    for (const group of model.repeats) {
        const owner = group.members.find((member) => NARRATIVE_POSITIONS.has(member.position));
        if (owner)
            owners.set(group.root, { owner, group });
    }
    return owners;
}
/* ------------------------------------------------------------------- plan */
export function planNumerologyNarrative(model) {
    const p = model.positions;
    const lifePath = p['life-path'];
    const owners = echoOwners(model);
    /* Only a repeat that outweighs everything else is told as the heaviest; the
       cost of an aligned chart still falls on its heaviest repeat. */
    const dominantRoot = model.dominantRoot;
    const heaviestRepeat = model.repeats[0]?.root ?? null;
    /** The echo a position tells, if it owns its root's repetition. */
    const echoFor = (signal) => {
        if (!signal)
            return null;
        const entry = owners.get(signal.root);
        if (!entry || entry.owner !== signal)
            return null;
        const others = entry.group.members.filter((member) => member !== signal);
        return {
            root: signal.root,
            positions: others.map((member) => member.position),
            values: others.map((member) => member.value),
            masterAt: others.filter((member) => member.master).map((member) => member.position),
            dominant: signal.root === dominantRoot,
        };
    };
    /** The position that told a position's root in an earlier section. */
    const toldBefore = (signal) => {
        if (!signal)
            return null;
        const entry = owners.get(signal.root);
        if (!entry || entry.owner === signal)
            return null;
        const ownerSection = SECTION_OF[entry.owner.position];
        return rank(ownerSection) < rank(SECTION_OF[signal.position]) ? entry.owner.position : null;
    };
    const debtsIn = (section) => model.debts
        .filter((debt) => SECTION_OF[debt.position] === section)
        .map((debt) => ({ position: debt.position, value: debt.value }));
    /* ------------------------------------------------------------ the pull */
    const pullModel = model.pull;
    let pull;
    /** Pairs the tension names: one position in the anchor, the other against it. */
    const named = new Set();
    if (pullModel.kind === 'split') {
        const namedSides = pullModel.against.filter((side) => side.group.narrativeWeight > 0).slice(0, 2);
        pull = {
            kind: 'split',
            anchor: groupRef(pullModel.anchor),
            against: namedSides.map((side) => ({ group: groupRef(side.group), axis: side.axis })),
            more: pullModel.against.filter((side) => !namedSides.includes(side)).map((side) => groupRef(side.group)),
            axis: pullModel.axis,
        };
        for (const side of pullModel.against) {
            for (const a of pullModel.anchor.members) {
                for (const b of side.group.members)
                    named.add(pairKey(a.position, b.position));
            }
        }
    }
    else if (pullModel.kind === 'gap') {
        pull = { kind: 'gap', left: groupRef(pullModel.left), right: groupRef(pullModel.right) };
        for (const a of pullModel.left.members) {
            for (const b of pullModel.right.members)
                named.add(pairKey(a.position, b.position));
        }
    }
    else {
        pull = {
            kind: 'aligned',
            roots: model.repeats.slice(0, 2).map((group) => group.root).concat(model.repeats.length === 0 ? [lifePath.root] : []),
        };
    }
    const unnamed = (a, b) => {
        if (!a || !b)
            return null;
        if (named.has(pairKey(a.position, b.position)))
            return null;
        return relationOf(a.value, b.value);
    };
    /* ------------------------------------------------------------ sections */
    const compoundsSeen = new Map();
    const birthdayRelation = p.birthday ? relationOf(lifePath.value, p.birthday.value) ?? 'complementary' : null;
    const direction = {
        lifePath: ref(lifePath),
        birthday: p.birthday && birthdayRelation
            ? {
                ref: ref(p.birthday), relation: birthdayRelation,
                supplies: suppliesIf(birthdayRelation, p.birthday.value, lifePath.value),
            }
            : null,
        echo: echoFor(lifePath) ?? echoFor(p.birthday),
        debts: debtsIn('numerology-direction'),
        compounds: compoundsOf([lifePath, p.birthday], compoundsSeen),
    };
    const soulUrge = p['soul-urge'];
    const passion = model.signals.filter((signal) => signal.position === 'hidden-passion');
    const carriedByNarrative = (root) => model.signals
        .some((signal) => NARRATIVE_POSITIONS.has(signal.position) && signal.root === root);
    const driveRelation = unnamed(lifePath, soulUrge);
    const drive = soulUrge ? {
        soulUrge: ref(soulUrge),
        lifePath: ref(lifePath),
        withDirection: driveRelation,
        /* A Soul Urge that repeats a number told earlier has already been described. */
        supplies: toldBefore(soulUrge) ? null : suppliesIf(driveRelation, soulUrge.value, lifePath.value),
        echo: echoFor(soulUrge),
        toldBy: toldBefore(soulUrge),
        passionAgrees: passion.some((signal) => signal.root === soulUrge.root),
        passion: passion.length > 0 && !passion.some((signal) => carriedByNarrative(signal.root))
            ? passion.map((signal) => signal.value) : null,
        debts: debtsIn('numerology-drive'),
        compounds: compoundsOf([soulUrge], compoundsSeen),
    } : null;
    const expression = p.expression;
    const personality = p.personality;
    const presence = expression && personality ? {
        expression: ref(expression),
        expressionEcho: echoFor(expression),
        expressionToldBy: toldBefore(expression),
        personality: ref(personality),
        personalityEcho: echoFor(personality),
        personalityToldBy: toldBefore(personality),
        withEachOther: unnamed(expression, personality),
        innerOuter: unnamed(soulUrge, personality),
        soulUrge: soulUrge ? ref(soulUrge) : null,
        attitudeAgrees: Boolean(p.attitude && p.attitude.root === personality.root),
        attitude: p.attitude && !carriedByNarrative(p.attitude.root) ? p.attitude.value : null,
        debts: debtsIn('numerology-presence'),
        compounds: compoundsOf([expression, personality], compoundsSeen),
    } : null;
    /* What overuse the cost section describes: the two sides of the tension, or
       the direction and what it agrees with. */
    const overuse = pull.kind === 'split'
        ? [pull.anchor.value, ...(pull.against[0] ? [pull.against[0].group.value] : [])]
        : pull.kind === 'gap'
            ? [lifePath.value, ...(pull.left.value !== lifePath.value ? [pull.left.value] : pull.right.value !== lifePath.value ? [pull.right.value] : [])]
            : [heaviestRepeat ?? lifePath.root];
    const cost = {
        overuse: [...new Set(overuse)].slice(0, 2),
        pull: pull.kind,
        pair: pull.kind === 'split' && pull.against[0]
            ? { anchor: pull.anchor.value, other: pull.against[0].group.value, axis: pull.against[0].axis }
            : null,
        absent: model.absentEverywhere.slice(0, 2),
        balance: p.balance?.value ?? null,
    };
    const maturity = p.maturity;
    const inPull = Boolean(maturity && model.pull.kind === 'split' && (model.pull.anchor.members.some((member) => member.position === 'maturity')
        || model.pull.against.some((side) => side.group.members.some((member) => member.position === 'maturity'))));
    const growth = maturity ? {
        maturity: ref(maturity),
        lifePath: ref(lifePath),
        sharedWith: model.signals
            .filter((signal) => signal !== maturity && signal.root === maturity.root && NARRATIVE_POSITIONS.has(signal.position))
            .map((signal) => signal.position),
        toldBy: toldBefore(maturity),
        withDirection: inPull ? null : relationOf(lifePath.value, maturity.value),
        supplies: inPull || toldBefore(maturity) ? null : suppliesIf(relationOf(lifePath.value, maturity.value), maturity.value, lifePath.value),
        inPull,
    } : null;
    const current = model.currentChapter;
    const chapter = current ? {
        chapter: current,
        lifePath: ref(lifePath),
        pinnacleShares: model.signals
            .filter((signal) => NARRATIVE_POSITIONS.has(signal.position) && signal.root === current.pinnacleRoot)
            .map((signal) => signal.position),
        challengeShares: current.challenge === 0 ? [] : model.signals
            .filter((signal) => NARRATIVE_POSITIONS.has(signal.position) && signal.root === current.challenge)
            .map((signal) => signal.position),
        pinnacleWithDirection: current.pinnacleRoot === lifePath.root ? null : relationOf(lifePath.value, current.pinnacle),
        pinnacleSupplies: current.pinnacleRoot === lifePath.root ? null
            : suppliesIf(relationOf(lifePath.value, current.pinnacle), current.pinnacle, lifePath.value),
        challengeWithDirection: current.challenge === 0 || current.challenge === lifePath.root
            ? null : relationOf(lifePath.value, current.challenge),
        lifePathDigit: lifePath.root,
    } : null;
    return { direction, drive, presence, pull, cost, growth, chapter };
}
function pairKey(a, b) {
    return [a, b].sort().join('|');
}
