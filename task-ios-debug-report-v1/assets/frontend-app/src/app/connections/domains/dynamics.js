import { DOMAIN_POLICY, KIND_EMPHASIS } from './domainPolicy.js?v=b5ef5ed';
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
const bySalience = (x, y) => y.salience - x.salience || (x.id < y.id ? -1 : x.id > y.id ? 1 : 0);
export function interpretPair(input) {
    const { domain, kind, evidence } = input;
    const named = new Set(input.context.flatMap((code) => CONTEXT_FOCUS[code] ?? []));
    const emphasis = KIND_EMPHASIS[kind] ?? {};
    const all = [];
    for (const [axisId, relation] of Object.entries(evidence.axes)) {
        const id = AXIS_DYNAMICS[axisId];
        const weight = Math.min(3, DOMAIN_POLICY[domain][id].weight + (emphasis[id] ?? 0));
        const base = {
            id, axis: axisId, relation: relation.kind, role: roleOf(domain, id, relation.kind), strength: relation.strength, corroboration: relation.corroboration,
            hedged: relation.hedged, timeSensitive: relation.timeSensitive, a: relation.poleA, b: relation.poleB, weight, named: named.has(id),
        };
        all.push({ ...base, salience: STRENGTH_VALUE[base.strength] * CORROBORATION_VALUE[base.corroboration] * (0.5 + weight) + (base.named ? 2.5 : 0) });
    }
    for (const drive of evidence.drives) {
        const id = DRIVE_DYNAMICS[drive.kind];
        const weight = Math.min(3, DOMAIN_POLICY[domain][id].weight + (emphasis[id] ?? 0));
        const corroboration = drive.pillarsA.length > 1 && drive.pillarsB.length > 1 ? 'supported' : 'single-source';
        const base = {
            id, axis: null, relation: drive.kind, role: roleOf(domain, id, drive.kind), strength: drive.strength, corroboration, hedged: false, timeSensitive: false,
            a: drive.a, b: drive.b, weight, named: named.has(id),
        };
        all.push({ ...base, salience: STRENGTH_VALUE[base.strength] * CORROBORATION_VALUE[base.corroboration] * (0.5 + weight) + (base.named ? 2.5 : 0) });
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
