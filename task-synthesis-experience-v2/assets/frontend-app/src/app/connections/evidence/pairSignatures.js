import { EARTHLY_BRANCHES, HEAVENLY_STEMS } from '../../bazi/data/baziConstants.js?v=53c0693';
import { BRANCH_SIX_CLASHES, BRANCH_SIX_HARMONIES, BRANCH_THREE_HARMONIES } from '../../bazi/data/branchRelationships.js?v=53c0693';
import { STEM_CLASHES, STEM_COMBINATIONS } from '../../bazi/data/stemRelationships.js?v=53c0693';
import { calculateTenGod } from '../../bazi/tenGodsEngine.js?v=53c0693';
import { HD_CHANNEL_TABLE } from './pillarFacts.js?v=53c0693';
import { MAJOR_ASPECTS } from '../../astrology/aspectEngine.js?v=53c0693';
/* ------------------------------------------------------------- astrology -- */
const LUMINARIES = new Set(['Sun', 'Moon']);
const SOCIAL = new Set(['Jupiter', 'Saturn']);
const angularSeparation = (a, b) => {
    const raw = Math.abs(a - b) % 360;
    return raw > 180 ? 360 - raw : raw;
};
const topicOfPair = (x, y) => {
    const pair = [x, y].sort().join('~');
    if (x === 'Saturn' || y === 'Saturn')
        return 'structure';
    if (x === 'Jupiter' || y === 'Jupiter')
        return 'growth';
    switch (pair) {
        case 'Moon~Moon':
        case 'Moon~Sun':
        case 'Moon~Venus': return 'emotion';
        case 'Mars~Venus': return 'attraction';
        case 'Mercury~Mercury':
        case 'Mercury~Moon':
        case 'Mercury~Sun':
        case 'Mars~Mercury':
        case 'Mercury~Venus': return 'communication';
        case 'Mars~Mars':
        case 'Mars~Moon': return 'conflict';
        case 'Mars~Sun': return 'drive';
        default: return 'values';
    }
};
const harmonicFlavour = (harmonic) => (harmonic === 'fusion' ? 'joining' : harmonic === 'flow' ? 'joining' : harmonic === 'tension' ? 'friction' : 'complementing');
function astrologySignatures(a, b) {
    if (!a.astrology || !b.astrology)
        return [];
    const out = [];
    for (const x of a.astrology.bodies) {
        for (const y of b.astrology.bodies) {
            /* Social-to-social contacts are not read (they are generational), and a contact of a body with its own slow twin adds nothing a person does not already know. */
            if (SOCIAL.has(x.body) && SOCIAL.has(y.body))
                continue;
            const separation = angularSeparation(x.longitude, y.longitude);
            const drift = x.drift + y.drift;
            for (const aspect of MAJOR_ASPECTS) {
                const maxOrb = LUMINARIES.has(x.body) || LUMINARIES.has(y.body) ? 8 : 6;
                const orb = Math.abs(separation - aspect.angle);
                /* Read only what holds everywhere the birth could have been: the orb at its worst must still be inside the limit. */
                if (orb + drift > maxOrb)
                    continue;
                const exact = orb <= 2;
                const luminaryOrFaster = LUMINARIES.has(x.body) || LUMINARIES.has(y.body) || x.body === 'Venus' || y.body === 'Venus' || x.body === 'Mars' || y.body === 'Mars';
                out.push({
                    id: `astrology:${aspect.name}:a.${x.body}~b.${y.body}`,
                    system: 'astrology',
                    kind: 'inter-aspect',
                    topic: topicOfPair(x.body, y.body),
                    flavour: harmonicFlavour(aspect.harmonic),
                    weight: exact && luminaryOrFaster ? 'defining' : orb <= 4 ? 'notable' : 'quiet',
                    direction: 'mutual',
                    a: x.body,
                    b: y.body,
                    form: { aspect: aspect.name.toLowerCase(), harmonic: aspect.harmonic, orb: Math.round(orb * 10) / 10 },
                    root: 'sky-at-birth',
                });
                break;
            }
        }
    }
    return out;
}
/* ------------------------------------------------------------------ bazi -- */
const unordered = (x, y, a, b) => (x === a && y === b) || (x === b && y === a);
const inPairs = (list, a, b) => list.some(([x, y]) => unordered(x, y, a, b));
const PILLAR_WEIGHT = {
    'Day~Day': 'defining', 'Day~Month': 'notable', 'Month~Day': 'notable', 'Month~Month': 'notable', 'Year~Year': 'notable',
};
const PILLAR_TOPIC = { Day: 'ease', Month: 'roles', Year: 'values', Hour: 'growth' };
function baziSignatures(a, b) {
    if (!a.bazi || !b.bazi)
        return [];
    const out = [];
    /* The Day Masters read each other: one fact with a direction (the Ten God of B from A's seat, and the other way round). */
    const dmA = HEAVENLY_STEMS[a.bazi.dayMaster.stem];
    const dmB = HEAVENLY_STEMS[b.bazi.dayMaster.stem];
    const aReadsB = calculateTenGod(dmA, dmB);
    const bReadsA = calculateTenGod(dmB, dmA);
    out.push({
        id: `bazi:day-master:a.${dmA.name}~b.${dmB.name}`,
        system: 'bazi',
        kind: 'day-master',
        topic: 'roles',
        flavour: aReadsB.relation === 'same-phase' ? 'mirroring' : aReadsB.relation === 'generates' || aReadsB.relation === 'generated-by' ? 'nourishing' : 'steering',
        weight: 'defining',
        direction: aReadsB.relation === 'same-phase' ? 'mutual' : aReadsB.relation === 'generates' || aReadsB.relation === 'controls' ? 'a-to-b' : 'b-to-a',
        a: `${dmA.element.toLowerCase()}-${dmA.polarity.toLowerCase()}`,
        b: `${dmB.element.toLowerCase()}-${dmB.polarity.toLowerCase()}`,
        form: {
            relation: aReadsB.relation, samePolarity: aReadsB.samePolarity, aReadsB: aReadsB.tenGod.toLowerCase().replace(/\s+/g, '-'),
            bReadsA: bReadsA.tenGod.toLowerCase().replace(/\s+/g, '-'), aElement: dmA.element.toLowerCase(), bElement: dmB.element.toLowerCase(),
        },
        root: 'civil-birth-date',
    });
    const seen = new Set();
    for (const pa of a.bazi.pillars) {
        for (const pb of b.bazi.pillars) {
            const pillarKey = `${pa.key}~${pb.key}`;
            const weight = PILLAR_WEIGHT[pillarKey] ?? 'quiet';
            const topic = PILLAR_TOPIC[pa.key === pb.key ? pa.key : 'Day'] ?? 'ease';
            const add = (kind, flavour, form) => {
                const id = `bazi:${kind}:a.${pa.key}.${EARTHLY_BRANCHES[pa.branch].name}~b.${pb.key}.${EARTHLY_BRANCHES[pb.branch].name}`;
                if (seen.has(id))
                    return;
                seen.add(id);
                out.push({
                    id, system: 'bazi', kind, topic, flavour, weight, direction: 'mutual',
                    a: `${pa.key.toLowerCase()}-${EARTHLY_BRANCHES[pa.branch].name.toLowerCase()}`, b: `${pb.key.toLowerCase()}-${EARTHLY_BRANCHES[pb.branch].name.toLowerCase()}`,
                    form: { aPillar: pa.key.toLowerCase(), bPillar: pb.key.toLowerCase(), ...form }, root: 'civil-birth-date',
                });
            };
            const harmony = BRANCH_SIX_HARMONIES.find((entry) => unordered(entry.pair[0], entry.pair[1], pa.branch, pb.branch));
            if (harmony)
                add('branch-harmony', 'joining', { element: harmony.resultingElement ? harmony.resultingElement.toLowerCase() : 'unsettled' });
            if (inPairs(BRANCH_SIX_CLASHES, pa.branch, pb.branch))
                add('branch-clash', 'friction', {});
            const half = BRANCH_THREE_HARMONIES.find((entry) => entry.trio.includes(pa.branch) && entry.trio.includes(pb.branch) && pa.branch !== pb.branch);
            if (half && (pa.branch === half.trio[1] || pb.branch === half.trio[1]))
                add('branch-three-harmony-half', 'joining', { element: half.resultingElement.toLowerCase() });
            if (pa.branch === pb.branch && pa.key === pb.key)
                add('branch-same', 'mirroring', {});
            /* Stems: the five combinations and the commonly cited clashes, from the natal tables. */
            const stemCombination = stemCombinationOf(pa.stem, pb.stem);
            if (stemCombination)
                add('stem-combination', 'joining', { element: stemCombination.toLowerCase() });
            if (isStemClash(pa.stem, pb.stem))
                add('stem-clash', 'friction', {});
        }
    }
    return out;
}
/* ---- the two small stem tables, from the natal data ---- */
function stemCombinationOf(a, b) {
    return STEM_COMBINATIONS.find((entry) => unordered(entry.stemIndexA, entry.stemIndexB, a, b))?.resultingElement ?? null;
}
function isStemClash(a, b) {
    return STEM_CLASHES.some((entry) => unordered(entry.stemIndexA, entry.stemIndexB, a, b));
}
function humanDesignSignatures(a, b) {
    if (!a.humanDesign || !b.humanDesign)
        return [];
    const out = [];
    const stateOf = (facts, gate) => {
        if (facts.gates.includes(gate))
            return 'has';
        /* A person whose time is not exact may still have the gate in some stretch of the day: absence is only proven for the exact case or a gate the scan says never occurs. */
        if (facts.stableOnly && facts.uncertainGates.includes(gate))
            return 'unknown';
        return 'lacks';
    };
    for (const channel of HD_CHANNEL_TABLE) {
        const [g1, g2] = channel.gates;
        const A1 = stateOf(a.humanDesign, g1);
        const A2 = stateOf(a.humanDesign, g2);
        const B1 = stateOf(b.humanDesign, g1);
        const B2 = stateOf(b.humanDesign, g2);
        if ([A1, A2, B1, B2].includes('unknown'))
            continue;
        const aCount = Number(A1 === 'has') + Number(A2 === 'has');
        const bCount = Number(B1 === 'has') + Number(B2 === 'has');
        let klass = null;
        let direction = 'mutual';
        if (aCount === 2 && bCount === 2)
            klass = 'companionship';
        else if (aCount === 2 && bCount === 1) {
            klass = 'compromise';
            direction = 'a-to-b';
        }
        else if (aCount === 1 && bCount === 2) {
            klass = 'compromise';
            direction = 'b-to-a';
        }
        else if (aCount === 2 && bCount === 0) {
            klass = 'dominance';
            direction = 'a-to-b';
        }
        else if (aCount === 0 && bCount === 2) {
            klass = 'dominance';
            direction = 'b-to-a';
        }
        else if (aCount === 1 && bCount === 1 && ((A1 === 'has') !== (B1 === 'has')))
            klass = 'electromagnetic';
        if (!klass)
            continue;
        out.push({
            id: `human-design:channel:${channel.id}`,
            system: 'human-design',
            kind: 'channel',
            topic: klass === 'electromagnetic' ? 'attraction' : klass === 'companionship' ? 'ease' : 'roles',
            flavour: klass === 'electromagnetic' ? 'stimulating' : klass === 'companionship' ? 'mirroring' : klass === 'compromise' ? 'steering' : 'complementing',
            weight: klass === 'electromagnetic' || klass === 'companionship' ? 'notable' : 'quiet',
            direction,
            a: channel.id, b: channel.id,
            form: { class: klass, channel: channel.id, centreA: channel.centers[0], centreB: channel.centers[1] },
            root: 'sky-at-birth',
        });
    }
    /* The two Types side by side, when both are vouched for. */
    if (a.humanDesign.type && b.humanDesign.type) {
        out.push({
            id: `human-design:type:${a.humanDesign.type}~${b.humanDesign.type}`,
            system: 'human-design',
            kind: 'type-pair',
            topic: 'roles',
            flavour: a.humanDesign.type === b.humanDesign.type ? 'mirroring' : 'complementing',
            weight: 'notable',
            direction: 'mutual',
            a: slug(a.humanDesign.type),
            b: slug(b.humanDesign.type),
            form: { authorityA: a.humanDesign.authority ? slug(a.humanDesign.authority) : 'unknown', authorityB: b.humanDesign.authority ? slug(b.humanDesign.authority) : 'unknown' },
            root: 'sky-at-birth',
        });
    }
    return out;
}
const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
/* ------------------------------------------------------------ numerology -- */
const NUMBER_POSITIONS = ['life-path', 'soul-urge', 'expression', 'personality', 'birthday'];
const POSITION_TOPIC = {
    'life-path': 'values', 'soul-urge': 'emotion', expression: 'drive', personality: 'ease', birthday: 'ease',
};
function numerologySignatures(a, b) {
    if (!a.numerology || !b.numerology)
        return [];
    const out = [];
    for (const position of NUMBER_POSITIONS) {
        const x = a.numerology[position];
        const y = b.numerology[position];
        if (!x || !y)
            continue;
        const relation = x.value === y.value ? 'same-number' : x.root === y.root ? 'shared-root' : 'different-number';
        if (relation === 'different-number' && position !== 'life-path')
            continue;
        const primary = position === 'life-path' || position === 'soul-urge' || position === 'expression';
        out.push({
            id: `numerology:${position}:${x.value}~${y.value}`,
            system: 'numerology',
            kind: position,
            topic: POSITION_TOPIC[position],
            flavour: relation,
            weight: relation === 'different-number' ? 'quiet' : primary ? 'notable' : 'quiet',
            direction: 'mutual',
            a: String(x.value), b: String(y.value),
            form: { position, masterA: x.master, masterB: y.master },
            root: position === 'life-path' || position === 'birthday' ? 'civil-birth-date' : 'birth-name',
        });
    }
    return out;
}
/* ------------------------------------------------------------------ pair -- */
const WEIGHT_RANK = { defining: 0, notable: 1, quiet: 2 };
/** Every signature between two people, strongest first, ties broken by id so the order never depends on how the engines happened to list things. */
export function pairSignaturesOf(a, b) {
    return [
        ...astrologySignatures(a, b), ...baziSignatures(a, b), ...humanDesignSignatures(a, b), ...numerologySignatures(a, b),
    ].sort((x, y) => WEIGHT_RANK[x.weight] - WEIGHT_RANK[y.weight] || (x.id < y.id ? -1 : x.id > y.id ? 1 : 0));
}
/** The same signature seen from the other person's seat: sides swapped, direction reversed. A is always the first person in the pair's canonical order. */
export function mirrorSignature(signature) {
    const direction = signature.direction === 'a-to-b' ? 'b-to-a' : signature.direction === 'b-to-a' ? 'a-to-b' : 'mutual';
    return { ...signature, a: signature.b, b: signature.a, direction };
}
