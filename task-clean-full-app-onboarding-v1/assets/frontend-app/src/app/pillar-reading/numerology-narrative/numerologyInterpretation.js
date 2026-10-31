import { karmicDebtIn, rootNumber } from '../../../core/numerologyMethodology.js?v=f9ab0a6';
import { TEMPERAMENT, relationBetween, } from '../../knowledge/numerology/numberTemperament.js?v=f9ab0a6';
/**
 * THE NUMEROLOGY INTERPRETATION MODEL.
 *
 * CALCULATION -> INTERPRETATION MODEL -> PLAN -> VOICE -> SECTIONS. This is the
 * second step: it reads the engine's typed result and says, in no language at
 * all, what each number is doing in this chart - which role it plays, how much
 * it weighs, where it repeats, what it pulls against - so that the plan can
 * choose what to say and the voices only decide how it sounds.
 *
 * NOTHING HERE CALCULATES A NUMBER. Every value is the engine's; the only
 * arithmetic is bookkeeping (which positions share a root, how heavy a group
 * is). Karmic debt is found with the kernel's own karmicDebtIn() on each
 * position's own chain - the same call the engine makes - so the reading and
 * the technical appendix cannot disagree about where a debt sits.
 *
 * WEIGHTS ARE SALIENCE, NOT SCORES. They decide what the reading leads with and
 * which tension it names; they are never shown. The Life Path is the axis every
 * school reads first; Expression and Soul Urge are the other two core numbers;
 * Personality is the most convention-sensitive core number and is read as the
 * interface rather than as a lead; Birth Day and Maturity qualify the core; the
 * remaining positions support it.
 */
/** The positions the narrative reads, in the order a reader meets them. */
export const POSITION_IDS = [
    'life-path', 'birthday', 'soul-urge', 'expression', 'personality',
    'maturity', 'attitude', 'balance', 'hidden-passion',
];
export const ROLE_OF = {
    'life-path': 'direction',
    birthday: 'colour',
    'soul-urge': 'motive',
    expression: 'equipment',
    personality: 'interface',
    maturity: 'integration',
    attitude: 'support',
    balance: 'support',
    'hidden-passion': 'support',
};
/** Internal salience. Hidden Passion's weight is shared between the values of a tie. */
export const POSITION_WEIGHT = {
    'life-path': 3,
    expression: 2,
    'soul-urge': 2,
    personality: 1.5,
    maturity: 1,
    birthday: 1,
    attitude: 0.5,
    balance: 0.5,
    'hidden-passion': 0.5,
};
/** The core four plus the two that qualify them; support positions are evidence only. */
export const NARRATIVE_POSITIONS = new Set([
    'life-path', 'birthday', 'soul-urge', 'expression', 'personality', 'maturity',
]);
/** The five positions whose own chain can carry a karmic debt (contract, section 11). */
export const DEBT_POSITIONS = [
    'life-path', 'birthday', 'expression', 'soul-urge', 'personality',
];
/* ------------------------------------------------------------------ helpers */
function signalFor(position, calculation, weight = POSITION_WEIGHT[position]) {
    const value = calculation.finalNumber;
    const temperament = TEMPERAMENT[String(value)];
    if (!temperament)
        return null;
    const chain = calculation.reductionSteps.map(Number).filter((step) => Number.isFinite(step));
    const master = calculation.preservedMasterNumber;
    return {
        position,
        role: ROLE_OF[position],
        value,
        root: rootNumber(value),
        compound: chain.length > 1 ? chain[0] : null,
        chain,
        master,
        karmicDebt: DEBT_POSITIONS.includes(position)
            ? karmicDebtIn({ chain, result: value, isMaster: master })
            : null,
        weight,
        drive: temperament.drive,
        tempo: temperament.tempo,
        facing: temperament.facing,
        parts: [...calculation.componentValues],
        trace: calculation.normalizedInput,
    };
}
/** A bare number (Hidden Passion) as a signal with no chain of its own. */
function valueSignal(position, value, weight) {
    return signalFor(position, {
        label: position, rawInput: '', normalizedInput: '', componentValues: [],
        reductionSteps: [String(value)], finalNumber: value, preservedMasterNumber: false,
    }, weight);
}
const TEMPO_RANK = { slow: 0, steady: 1, fast: 2 };
/** Which difference makes two crosswise numbers crosswise. Null when they are not. */
export function crosswiseAxis(left, right) {
    const tempo = Math.abs(TEMPO_RANK[left.tempo] - TEMPO_RANK[right.tempo]) >= 2;
    const facing = (left.facing === 'outward' && right.facing === 'inward')
        || (left.facing === 'inward' && right.facing === 'outward');
    if (tempo && facing)
        return 'both';
    if (tempo)
        return 'tempo';
    if (facing)
        return 'facing';
    return null;
}
/** The relation between two numbers, from the shared temperament vocabulary. */
export function relationOf(left, right) {
    return relationBetween(String(left), String(right));
}
/**
 * Exact-value groups, narrative weight first: a Birth Day outranks a Balance and
 * Attitude pair of the same total, because only one of them is part of the story.
 */
function groupsByValue(signals) {
    const map = new Map();
    for (const signal of signals)
        map.set(signal.value, [...(map.get(signal.value) ?? []), signal]);
    return [...map.entries()].map(([value, members]) => {
        const sorted = [...members].sort(byWeight);
        return {
            value,
            members: sorted,
            weight: sum(sorted.map((member) => member.weight)),
            narrativeWeight: sum(sorted.filter((member) => NARRATIVE_POSITIONS.has(member.position)).map((member) => member.weight)),
            drive: sorted[0].drive,
            tempo: sorted[0].tempo,
            facing: sorted[0].facing,
        };
    }).sort(byGroup);
}
const byGroup = (a, b) => b.narrativeWeight - a.narrativeWeight || b.weight - a.weight || a.value - b.value;
const sum = (values) => values.reduce((total, value) => total + value, 0);
const byWeight = (a, b) => b.weight - a.weight || POSITION_IDS.indexOf(a.position) - POSITION_IDS.indexOf(b.position);
/* ------------------------------------------------------------ repetition */
/**
 * Roots carried by two or more NARRATIVE positions. Support positions join a
 * group that already exists but never make one on their own - a Balance and an
 * Attitude that happen to agree are a coincidence of arithmetic, not a theme.
 */
function repeatsOf(signals) {
    const map = new Map();
    for (const signal of signals)
        map.set(signal.root, [...(map.get(signal.root) ?? []), signal]);
    return [...map.entries()]
        .filter(([, members]) => members.filter((member) => NARRATIVE_POSITIONS.has(member.position)).length >= 2)
        .map(([root, members]) => {
        const sorted = [...members].sort(byWeight);
        return {
            root,
            members: sorted,
            weight: sum(sorted.map((member) => member.weight)),
            includesMaster: sorted.some((member) => member.master),
        };
    })
        .sort((a, b) => b.weight - a.weight || a.root - b.root);
}
/**
 * The heaviest repeat, if it is also strictly the heaviest root of the whole
 * chart. A repeat's weight already sums every position carrying its root, so
 * it is compared with the same sum for every other root.
 */
function dominantRootOf(signals, repeats) {
    const [top] = repeats;
    if (!top)
        return null;
    const totals = new Map();
    for (const signal of signals)
        totals.set(signal.root, (totals.get(signal.root) ?? 0) + signal.weight);
    for (const [root, total] of totals)
        if (root !== top.root && total >= top.weight)
            return null;
    return top.root;
}
/* ------------------------------------------------------------------ pull */
/**
 * The strongest real tension, read on exact values.
 *
 * Every pair of value groups that is crosswise contributes the product of the
 * two weights; the anchor is the group with the largest total against it, and
 * everything crosswise to the anchor is what it pulls against. Deterministic:
 * ties break on weight, then on the lower number.
 */
function pullOf(signals) {
    const groups = groupsByValue(signals);
    const crosswise = (a, b) => a.value !== b.value && relationOf(a.value, b.value) === 'crosswise';
    let best = null;
    for (const group of groups) {
        if (group.narrativeWeight === 0)
            continue;
        const others = groups.filter((other) => crosswise(group, other));
        if (!others.some((other) => other.narrativeWeight > 0))
            continue;
        const total = sum(others.map((other) => other.weight * group.weight));
        if (!best || total > best.total || (total === best.total && byGroup(group, best.anchor) < 0)) {
            best = { anchor: group, total };
        }
    }
    if (best) {
        const anchor = best.anchor;
        const against = groups
            .filter((other) => crosswise(anchor, other))
            .map((group) => ({ group, axis: crosswiseAxis(anchor, group) }));
        const total = sum(against.map((side) => side.group.weight));
        const tempoWeight = sum(against.filter((side) => side.axis !== 'facing').map((side) => side.group.weight));
        const facingWeight = sum(against.filter((side) => side.axis !== 'tempo').map((side) => side.group.weight));
        /* The axis the reading names is the one most of the opposing weight shares;
           both, when each of the two covers the whole of it. */
        const axis = tempoWeight >= total && facingWeight >= total
            ? 'both'
            : tempoWeight >= facingWeight ? 'tempo' : 'facing';
        return { kind: 'split', anchor, against, axis };
    }
    /* No crosswise pair. The strongest complementary difference between two core
       numbers is still a difference worth one honest sentence. */
    const core = groups.filter((group) => group.members.some((member) => NARRATIVE_POSITIONS.has(member.position)));
    let gap = null;
    for (let i = 0; i < core.length; i += 1) {
        for (let j = i + 1; j < core.length; j += 1) {
            if (relationOf(core[i].value, core[j].value) !== 'complementary')
                continue;
            const score = core[i].weight * core[j].weight;
            if (!gap || score > gap.score)
                gap = { left: core[i], right: core[j], score };
        }
    }
    return gap ? { kind: 'gap', left: gap.left, right: gap.right } : { kind: 'aligned' };
}
/* -------------------------------------------------------------- chapters */
function chaptersOf(raw, current) {
    const pinnacles = [raw.pinnacleNumbers.first, raw.pinnacleNumbers.second, raw.pinnacleNumbers.third, raw.pinnacleNumbers.fourth];
    const challenges = [raw.challengeNumbers.first, raw.challengeNumbers.second, raw.challengeNumbers.third, raw.challengeNumbers.fourth];
    return raw.pinnacleAgeSpans.slice(0, 4).map((span, index) => ({
        index: index,
        startAge: span.startAge,
        endAge: span.endAge,
        pinnacle: pinnacles[index].finalNumber,
        pinnacleMaster: pinnacles[index].preservedMasterNumber,
        pinnacleRoot: rootNumber(pinnacles[index].finalNumber),
        challenge: challenges[index].finalNumber,
        current: index === current,
        pinnacleParts: [...pinnacles[index].componentValues],
        challengeParts: [...challenges[index].componentValues],
    }));
}
/* ------------------------------------------------------------ the model */
export function interpretNumerology(chart) {
    if (!chart)
        return null;
    const { raw } = chart;
    const single = [
        ['life-path', raw.lifePathNumber],
        ['birthday', raw.birthDayNumber],
        ['soul-urge', raw.soulUrgeNumber],
        ['expression', raw.expressionNumber],
        ['personality', raw.personalityNumber],
        ['maturity', raw.maturityNumber],
        ['attitude', raw.attitudeNumber],
        ['balance', raw.balanceNumber],
    ];
    const positions = {};
    const signals = [];
    for (const [position, calculation] of single) {
        const signal = signalFor(position, calculation);
        if (!signal)
            continue;
        positions[position] = signal;
        signals.push(signal);
    }
    if (!positions['life-path'])
        return null;
    const hiddenPassion = [...raw.hiddenPassionNumbers.finalValues];
    hiddenPassion.forEach((value, index) => {
        const signal = valueSignal('hidden-passion', value, POSITION_WEIGHT['hidden-passion'] / hiddenPassion.length);
        if (!signal)
            return;
        if (index === 0)
            positions['hidden-passion'] = signal;
        signals.push(signal);
    });
    const karmicLessons = [...raw.karmicLessons.finalValues];
    const carried = new Set(signals.map((signal) => signal.root));
    const absentEverywhere = karmicLessons.filter((value) => !carried.has(value));
    const debts = DEBT_POSITIONS
        .map((position) => positions[position])
        .filter((signal) => Boolean(signal && signal.karmicDebt !== null))
        .map((signal) => ({ position: signal.position, value: signal.karmicDebt }));
    const chapters = chaptersOf(raw, chart.currentChapter);
    const repeats = repeatsOf(signals);
    return {
        positions,
        signals,
        hiddenPassion,
        karmicLessons,
        absentEverywhere,
        debts,
        masters: signals.filter((signal) => signal.master),
        repeats,
        dominantRoot: dominantRootOf(signals, repeats),
        /* The tension is read between narrative positions only: a Balance or an
           Attitude joins a repeated number as evidence, but a support number is
           never one side of the person's central tension. */
        pull: pullOf(signals.filter((signal) => NARRATIVE_POSITIONS.has(signal.position))),
        chapters,
        currentChapter: chapters.find((chapter) => chapter.current) ?? null,
        age: chart.age,
        cycles: {
            year: raw.personalYearNumber.finalNumber,
            month: raw.personalMonthNumber.finalNumber,
            day: raw.personalDayNumber.finalNumber,
        },
    };
}
