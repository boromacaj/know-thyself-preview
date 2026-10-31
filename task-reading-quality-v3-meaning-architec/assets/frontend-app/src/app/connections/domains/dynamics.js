import { FAMILY_OF } from '../evidence/pairEvidence.js';
import { DOMAIN_POLICY, KIND_EMPHASIS } from './domainPolicy.js';
export const AXIS_DYNAMICS = {
    'inner-focus': 'processing-pace',
    'emotional-expression': 'emotional-expression',
    initiative: 'taking-the-lead',
    structure: 'structure-and-flexibility',
    reasoning: 'reasoning-style',
    autonomy: 'closeness-and-room',
    risk: 'risk-and-caution',
    change: 'change-and-steadiness',
    visibility: 'social-energy',
    abstraction: 'practical-and-conceptual',
};
export const AXIS_OF_DYNAMIC = Object.fromEntries(Object.entries(AXIS_DYNAMICS).map(([axis, dynamic]) => [dynamic, axis]));
export const DRIVE_DYNAMICS = {
    'shared-drive': 'shared-pull', 'drives-pull-apart': 'pulls-apart', 'different-drives': 'different-pulls',
};
export const ALL_DYNAMICS = [...Object.values(AXIS_DYNAMICS), 'shared-pull', 'pulls-apart', 'different-pulls'];
const STRENGTH_VALUE = { strong: 3, moderate: 2, faint: 1 };
const CORROBORATION_VALUE = { firm: 1.15, supported: 1, 'single-source': 0.8 };
/** What a user's own words about the relationship turn the reading's attention towards. They move the ORDER of findings, never their content. */
export const CONTEXT_FOCUS = {
    'communication-struggles': ['reasoning-style', 'emotional-expression', 'processing-pace'],
    'frequent-conflict': ['processing-pace', 'emotional-expression', 'taking-the-lead'],
    'conflict-goes-unrepaired': ['processing-pace', 'emotional-expression', 'closeness-and-room'],
    'pace-differences': ['processing-pace', 'change-and-steadiness', 'structure-and-flexibility'],
    'different-working-styles': ['structure-and-flexibility', 'practical-and-conceptual', 'reasoning-style'],
    'unclear-roles': ['taking-the-lead', 'structure-and-flexibility', 'closeness-and-room'],
    'decision-stalemates': ['risk-and-caution', 'taking-the-lead', 'reasoning-style'],
    'feeling-unseen': ['emotional-expression', 'processing-pace', 'shared-pull'],
    'need-more-closeness': ['closeness-and-room', 'emotional-expression', 'pulls-apart'],
    'need-more-space': ['closeness-and-room', 'social-energy', 'pulls-apart'],
    'strong-reactions-to-change': ['change-and-steadiness', 'structure-and-flexibility', 'processing-pace'],
    'resists-rules': ['taking-the-lead', 'closeness-and-room', 'structure-and-flexibility'],
    'withdraws-when-upset': ['processing-pace', 'emotional-expression', 'closeness-and-room'],
    'sibling-friction': ['taking-the-lead', 'closeness-and-room', 'pulls-apart'],
    'unfair-comparison': ['pulls-apart', 'different-pulls', 'taking-the-lead'],
    'parents-disagree-on-approach': ['structure-and-flexibility', 'risk-and-caution', 'taking-the-lead'],
    'wants-to-collaborate': ['practical-and-conceptual', 'reasoning-style', 'closeness-and-room'],
    'old-roles-persist': ['taking-the-lead', 'change-and-steadiness', 'closeness-and-room'],
    'recurring-argument': ['processing-pace', 'emotional-expression', 'pulls-apart'],
};
const roleOf = (domain, id, relation) => {
    const policy = DOMAIN_POLICY[domain][id];
    switch (relation) {
        case 'shared':
        case 'shared-drive': return 'resonance';
        case 'opposed': return policy.opposed;
        case 'drives-pull-apart': return 'friction';
        case 'different-drives': return 'complement';
        case 'one-sided': return 'asymmetry';
        default: return 'open';
    }
};
/** A finding is surfaced when it matters in this domain and is not faint, or when the user named it. */
const surfaced = (finding) => {
    if (finding.relation === 'quiet' || finding.relation === 'unreadable')
        return false;
    if (finding.named)
        return finding.strength !== 'faint' || finding.weight >= 2;
    return finding.weight >= 2 ? finding.strength !== 'faint' : finding.strength === 'strong';
};
/* ---------------------------------------------------------------- pair signatures --
 * ROMANTIC, ENGLISH ONLY (`useSignatures`). The pair signatures are the only evidence about the two charts side by side (a Venus-Moon contact, two Day Masters in the nourishing relation), and until now they
 * were shown in the evidence panel and never consulted. They enter the order in two bounded ways, both only for a romantic pair:
 *   - a TIE-BREAK: a signature whose topic belongs to a dynamic, and whose flavour agrees with the role the dynamic has here (joining beside common ground, friction beside a snag),
 *     moves that dynamic up by at most SIGNATURE_TIE_BREAK; one that contradicts it moves it down by as much. The step is smaller than the gap between a strong and a moderate finding.
 *   - a SECOND-FAMILY AGREEMENT: a finding whose pillars all read the same input (the sky, or the calendar) and that an agreeing signature of the OTHER family backs is said as firm,
 *     as two independent kinds of evidence are.
 * Which signature topic bears on which dynamic is an editorial mapping, written down here so a reviewer can disagree with it line by line. */
const SIGNATURE_TIE_BREAK = 0.6;
const SIGNATURE_WEIGHT = { defining: 1, notable: 0.6, quiet: 0.3 };
const TOPIC_DYNAMICS = {
    emotion: ['emotional-expression', 'processing-pace'],
    communication: ['reasoning-style', 'processing-pace'],
    attraction: ['emotional-expression', 'closeness-and-room'],
    conflict: ['taking-the-lead', 'processing-pace'],
    drive: ['taking-the-lead', 'risk-and-caution'],
    structure: ['structure-and-flexibility', 'change-and-steadiness'],
    growth: ['change-and-steadiness', 'risk-and-caution'],
    values: ['shared-pull', 'pulls-apart', 'practical-and-conceptual'],
    ease: ['closeness-and-room', 'social-energy'],
    roles: ['taking-the-lead', 'structure-and-flexibility'],
};
const FLAVOUR_VALENCE = {
    joining: 'smooth', mirroring: 'smooth', nourishing: 'smooth', complementing: 'smooth', 'same-number': 'smooth', 'shared-root': 'smooth',
    friction: 'rough', steering: null, stimulating: null, 'different-number': null,
};
/** What a signature would have to say to agree with a role (an asymmetry or an open question expects nothing). */
const expectedValence = (role) => (role === 'resonance' || role === 'complement' ? 'smooth' : role === 'friction' ? 'rough' : null);
/** How the signatures bear on one dynamic: the net agreement (-1 to 1) and the families (sky, calendar) of the signatures that agree. */
export function signatureBearing(signatures, id, role) {
    const expected = expectedValence(role);
    const agreeing = new Set();
    if (!expected)
        return { net: 0, agreeing };
    let sum = 0;
    for (const signature of signatures) {
        if (!TOPIC_DYNAMICS[signature.topic].includes(id))
            continue;
        const valence = FLAVOUR_VALENCE[signature.flavour];
        if (!valence)
            continue;
        const weight = SIGNATURE_WEIGHT[signature.weight];
        if (valence === expected) {
            sum += weight;
            if (signature.root === 'sky-at-birth')
                agreeing.add('sky');
            else if (signature.root === 'civil-birth-date')
                agreeing.add('calendar');
        }
        else
            sum -= weight;
    }
    return { net: Math.max(-1, Math.min(1, sum / 2)), agreeing };
}
/** The families of the pillars behind a finding (the sky, the calendar). */
function familiesBehind(evidence, finding) {
    const out = new Set();
    if (finding.axis) {
        const relation = evidence.axes[finding.axis];
        for (const pillar of [...relation.stanceA.pillars, ...relation.stanceB.pillars])
            out.add(FAMILY_OF[pillar]);
    }
    else {
        for (const drive of evidence.drives)
            if (drive.a === finding.a && drive.b === finding.b)
                for (const pillar of [...drive.pillarsA, ...drive.pillarsB])
                    out.add(FAMILY_OF[pillar]);
    }
    return out;
}
const bySalience = (x, y) => y.salience - x.salience || (x.id < y.id ? -1 : x.id > y.id ? 1 : 0);
export function interpretPair(input) {
    const { domain, kind, evidence } = input;
    const named = new Set(input.context.flatMap((code) => CONTEXT_FOCUS[code] ?? []));
    const emphasis = KIND_EMPHASIS[kind] ?? {};
    const all = [];
    const salienceOf = (base) => STRENGTH_VALUE[base.strength] * CORROBORATION_VALUE[base.corroboration] * (0.5 + base.weight) + (base.named ? 2.5 : 0);
    /* (romantic only) the signatures' bearing on a finding: the tie-break, and the lift of a one-family finding that the other family's signature backs */
    const withSalience = (base) => {
        if (domain !== 'romantic' || input.useSignatures !== true || evidence.signatures.length === 0)
            return { ...base, salience: salienceOf(base) };
        const bearing = signatureBearing(evidence.signatures, base.id, base.role);
        const families = familiesBehind(evidence, base);
        const otherFamilyBacks = base.corroboration === 'supported' && families.size === 1 && [...bearing.agreeing].some((family) => !families.has(family));
        const lifted = otherFamilyBacks ? { ...base, corroboration: 'firm' } : base;
        return { ...lifted, salience: salienceOf(lifted) + SIGNATURE_TIE_BREAK * bearing.net };
    };
    for (const [axisId, relation] of Object.entries(evidence.axes)) {
        const id = AXIS_DYNAMICS[axisId];
        const weight = Math.min(3, DOMAIN_POLICY[domain][id].weight + (emphasis[id] ?? 0));
        const base = {
            id, axis: axisId, relation: relation.kind, role: roleOf(domain, id, relation.kind), strength: relation.strength, corroboration: relation.corroboration,
            hedged: relation.hedged, timeSensitive: relation.timeSensitive, a: relation.poleA, b: relation.poleB, weight, named: named.has(id),
        };
        all.push(withSalience(base));
    }
    for (const drive of evidence.drives) {
        const id = DRIVE_DYNAMICS[drive.kind];
        const weight = Math.min(3, DOMAIN_POLICY[domain][id].weight + (emphasis[id] ?? 0));
        const corroboration = drive.pillarsA.length > 1 && drive.pillarsB.length > 1 ? 'supported' : 'single-source';
        const base = {
            id, axis: null, relation: drive.kind, role: roleOf(domain, id, drive.kind), strength: drive.strength, corroboration, hedged: false, timeSensitive: false,
            a: drive.a, b: drive.b, weight, named: named.has(id),
        };
        all.push(withSalience(base));
    }
    /* Two pairs of drives can stand in the same relation (two that pull apart): one finding per dynamic, the strongest, so a dimension is told once. */
    const bestDrive = new Map();
    for (const finding of all)
        if (!finding.axis && (bestDrive.get(finding.id)?.salience ?? -1) < finding.salience)
            bestDrive.set(finding.id, finding);
    const unique = all.filter((finding) => finding.axis !== null || bestDrive.get(finding.id) === finding);
    const findings = unique.filter(surfaced).sort(bySalience);
    const background = unique.filter((finding) => !surfaced(finding) && finding.relation !== 'unreadable').sort(bySalience);
    const first = (role) => findings.find((finding) => finding.role === role) ?? null;
    return { domain, kind, findings, background, lead: { resonance: first('resonance'), complement: first('complement'), friction: first('friction') } };
}
