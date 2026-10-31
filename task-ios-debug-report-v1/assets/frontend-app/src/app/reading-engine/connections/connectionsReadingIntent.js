import { buildProposition, relation, sealPillarIntent, section, slug, withheldNotice, MODALITY_OF_EVIDENCE } from '../contract/adapterKit.js?v=b5ef5ed';
/**
 * THE CONNECTIONS ADAPTER: WHAT A RELATIONSHIP READING MEANS, AS A READING INTENT.
 *
 * The pair reading is built in typed stages before any sentence: each person's evidence, the relation on each axis, the domain interpretation (what the relation MEANS in this
 * domain) and the signatures the traditions state about two charts. This adapter reads those and no sentence, and says in the contract's own vocabulary what a realization is
 * licensed to say: that a dimension is shared, opposed or one-sided, how firmly the evidence stands (never above `tendency`), what each tradition holds about the pair, and what
 * may NOT be said (a verdict on the relationship, a score, a diagnosis, a hiring or ranking judgement, a statement about anyone's sexual behaviour or a child's future).
 *
 * ROOTS. The four traditions are not four independent witnesses. Western Astrology and Human Design read the sky at the birth moment, BaZi and Numerology read the civil birth date;
 * every proposition cites the family it rests on (`shared:sky-at-birth`, `shared:civil-birth-date`, `shared:birth-name`), so the contract's convergence arithmetic counts shared
 * ground once and never mistakes agreement between correlated sources for confirmation.
 *
 * Like the other adapters, nothing in the shipped application imports this module: it is the contract between the intelligence and a renderer, tested beside the product.
 */
export const CONNECTIONS_KINDS = ['connections-romantic', 'connections-family', 'connections-work', 'connections-parenting'];
export const CONNECTIONS_CONTENT_VERSION = 1;
const ROOT_SKY = 'shared:sky-at-birth';
const ROOT_CALENDAR = 'shared:civil-birth-date';
const ROOT_NAME = 'shared:birth-name';
const ROOT_TIME = 'system:connections/birth-time';
const ROOT_PAIR = 'system:connections/pair';
const ROOT_REPORTED = 'system:connections/user-reported';
const FORBIDDEN = ['assumption-as-fact', 'diagnosis', 'domain-transfer', 'event-prediction', 'verdict', 'certainty-from-agreement', 'empirical-confirmation'];
const kit = (domain) => ({
    pillar: 'connections', root: ROOT_PAIR, planSource: 'connections.interpretation', modelSource: 'connections.evidence', forbidden: FORBIDDEN, group: `connections:${domain}`,
});
/** Things no Connections reading says, whatever the domain: named in `withheld` so a renderer cannot reconstruct them. */
const WITHHELD_COMMON = [
    { key: 'compatibility-score', reason: 'no number, percentage or rank of how well two people suit one another' },
    { key: 'relationship-verdict', reason: 'no statement that the relationship is right, wrong, doomed or certain to last' },
    { key: 'diagnosis', reason: 'no clinical, personality-disorder or attachment-disorder label for anyone' },
    { key: 'population-share', reason: 'no share of people, rarity or norm' },
    { key: 'private-history', reason: 'no event, abuse, infidelity or history is stated about anyone' },
];
const WITHHELD_BY_DOMAIN = {
    romantic: [{ key: 'sexual-behaviour', reason: 'no statement about anyone\'s sexual behaviour, history or performance; closeness is spoken of only as warmth and physical closeness' }],
    family: [{ key: 'pressure-to-repair', reason: 'no suggestion that a strained relationship must be repaired, or that anyone must tolerate harmful behaviour' }],
    work: [{ key: 'employment-decision', reason: 'no hiring, dismissal, promotion, ranking or suitability-for-a-role judgement, and no claim about competence or performance' }],
    parenting: [{ key: 'child-prediction', reason: 'no label for a child, no destiny, occupation, intelligence or adult-personality claim, and no diagnosis' }],
};
const rootOfPillar = (pillar) => (pillar === 'astrology' || pillar === 'human-design' ? ROOT_SKY : ROOT_CALENDAR);
/** An evidence id as a slot token (the foundation's ids may carry spaces or brackets). */
const token = (id) => id.replace(/[^A-Za-z0-9:_./@+#-]+/g, '-').replace(/^[^A-Za-z0-9]+/, '').replace(/-+$/, '');
const MODALITY_OF_CORROBORATION = { firm: MODALITY_OF_EVIDENCE.firm, supported: MODALITY_OF_EVIDENCE.moderate, 'single-source': MODALITY_OF_EVIDENCE.tentative };
const frameOf = (finding) => `connections.dynamic.${finding.role}`;
function findingRoots(finding, evidence) {
    if (!finding.axis)
        return [ROOT_SKY, ROOT_CALENDAR];
    const relationOnAxis = evidence.axes[finding.axis];
    const pillars = new Set([...relationOnAxis.stanceA.pillars, ...relationOnAxis.stanceB.pillars]);
    const roots = new Set([...pillars].map(rootOfPillar));
    if (relationOnAxis.timeSensitive)
        roots.add(ROOT_TIME);
    return roots.size > 0 ? [...roots].sort() : [ROOT_PAIR];
}
function findingEvidenceTokens(finding, evidence) {
    if (!finding.axis)
        return { a: [], b: [] };
    const relationOnAxis = evidence.axes[finding.axis];
    return { a: relationOnAxis.stanceA.evidenceIds.map(token), b: relationOnAxis.stanceB.evidenceIds.map(token) };
}
function signatureSpec(signature, index) {
    const root = signature.root === 'sky-at-birth' ? ROOT_SKY : signature.root === 'birth-name' ? ROOT_NAME : ROOT_CALENDAR;
    return {
        id: `signature-${slug(signature.id)}`,
        frame: `connections.signature.${signature.system}.${signature.kind}`,
        role: 'support',
        rank: index === 0 ? 2 : 3,
        status: 'tradition-convention',
        modality: 'assert',
        path: `signatures.${slug(signature.id)}`,
        meaningKey: `connections.signature:${signature.system}:${signature.kind}:${signature.flavour}`,
        roots: [root],
        independenceGroup: `connections:signature:${signature.system}`,
        slots: {
            system: signature.system, kind: signature.kind, topic: signature.topic, flavour: signature.flavour, weight: signature.weight, direction: signature.direction,
            a: slug(signature.a), b: slug(signature.b),
        },
    };
}
/** The intent of one pair reading, from the typed stages that decided it. */
export function buildConnectionsReadingIntent(input) {
    const { domain, kind, interpretation, evidence } = input;
    const config = kit(domain);
    const propositions = [];
    const make = (spec) => { propositions.push(buildProposition(spec, config)); };
    const uncertain = evidence.coverage.birthTime.a !== 'exact' || evidence.coverage.birthTime.b !== 'exact';
    const condition = 'birth-time-estimated';
    const uncertainties = uncertain ? [condition] : [];
    if (uncertain) {
        make({
            id: 'time', frame: 'connections.birth-time', role: 'caveat', rank: 1, status: 'structural-observation', modality: 'tendency', path: 'coverage.birthTime', roots: [ROOT_TIME], conditions: [condition],
            meaningKey: `connections.birth-time:${evidence.coverage.birthTime.a}:${evidence.coverage.birthTime.b}`,
            slots: { precisionA: evidence.coverage.birthTime.a, precisionB: evidence.coverage.birthTime.b, timeSensitiveAxes: evidence.coverage.timeSensitiveAxes.length, unreadableAxes: evidence.coverage.unreadableAxes.length },
        });
    }
    for (const missing of evidence.coverage.missingPillars) {
        propositions.push(withheldNotice(config, `missing-${missing.side}-${slug(missing.pillar)}`, 'connections.missing-pillar', `${missing.pillar} could not be calculated for one person`, 'coverage.missingPillars'));
    }
    const findings = interpretation.findings;
    findings.forEach((finding, index) => {
        const tokens = findingEvidenceTokens(finding, evidence);
        const timeDependent = finding.timeSensitive;
        make({
            id: `dynamic-${finding.id}`,
            frame: frameOf(finding),
            role: index === 0 ? 'thesis' : finding.role === 'friction' ? 'tension' : 'support',
            rank: index === 0 ? 1 : index < 4 ? 2 : 3,
            status: 'symbolic-reading',
            modality: MODALITY_OF_CORROBORATION[finding.corroboration],
            path: `findings.${finding.id}`,
            meaningKey: `connections.${domain}.${finding.id}:${finding.relation}`,
            roots: findingRoots(finding, evidence),
            conditions: timeDependent ? [condition] : [],
            independenceGroup: `connections:dynamic:${finding.id}`,
            valence: finding.role === 'friction' ? 'cost' : finding.role === 'resonance' || finding.role === 'complement' ? 'capacity' : 'mixed',
            slots: {
                dynamic: finding.id, relation: finding.relation, role: finding.role, strength: finding.strength, corroboration: finding.corroboration,
                poleA: finding.a ?? null, poleB: finding.b ?? null, hedged: finding.hedged, named: finding.named, timeSensitive: timeDependent,
                evidenceA: tokens.a, evidenceB: tokens.b,
            },
        });
    });
    const signatures = evidence.signatures.filter((signature) => signature.weight !== 'quiet').slice(0, 4);
    signatures.forEach((signature, index) => make(signatureSpec(signature, index)));
    if (input.context.length > 0) {
        make({
            id: 'reported', frame: 'connections.user-observation', role: 'context', rank: 3, status: 'structural-observation', modality: 'assert', path: 'context.observed',
            meaningKey: 'connections.user-observation:closed-codes', roots: [ROOT_REPORTED], independenceGroup: 'connections:reported',
            slots: { codes: [...input.context] },
        });
    }
    make({ id: 'limits', frame: 'connections.limits', role: 'caveat', rank: 3, status: 'structural-observation', modality: 'assert', path: 'coverage', meaningKey: 'connections.limits:not-measurement', slots: { domain, systems: evidence.coverage.signatureSystems.length } });
    if (findings.length === 0)
        propositions.push(withheldNotice(config, 'no-pattern', 'connections.no-result', 'the profiles show no clear pattern between these two people', 'findings'));
    const ids = new Set(propositions.map((proposition) => proposition.id));
    const lead = findings[0] ? `dynamic-${findings[0].id}` : null;
    const relations = findings
        .filter((finding, index) => index > 0 && finding.role === 'friction' && lead !== null)
        .slice(0, 3)
        .map((finding) => relation(`rel-${finding.id}`, `dynamic-${finding.id}`, lead, 'friction', finding.relation, 'connections', finding.strength === 'strong' ? 'defining' : 'notable'));
    const rel = relations.map((entry) => entry.id);
    const byRole = (role) => findings.filter((finding) => finding.role === role).map((finding) => `dynamic-${finding.id}`);
    const sections = [
        section(ids, 'connections-caveats', 'limit', ['time', ...evidence.coverage.missingPillars.map((m) => `missing-${m.side}-${slug(m.pillar)}`), 'no-pattern'], [], [1, 3]),
        section(ids, 'connections-ground', 'ground', [...byRole('resonance'), ...byRole('complement')], [], [3, 13]),
        section(ids, 'connections-friction', 'tension', byRole('friction'), [], [2, 13], rel),
        section(ids, 'connections-asymmetry', 'develop', [...byRole('asymmetry'), ...byRole('open')], [], [1, 13]),
        section(ids, 'connections-traditions', 'develop', signatures.map((signature) => `signature-${slug(signature.id)}`), [], [1, 4]),
        section(ids, 'connections-reported', 'develop', ['reported'], [], [1, 3]),
        section(ids, 'connections-limits', 'limit', ['limits'], [], [1, 2]),
    ].filter((entry) => entry !== null);
    return sealPillarIntent({
        pillar: 'connections',
        kind: `connections-${domain}`,
        engine: 'connections-pair-reading',
        contentVersion: CONNECTIONS_CONTENT_VERSION,
        deck: 'knowledge:connections',
        propositions, relations, sections,
        takeaway: { act: 'none', target: null, relationTargets: [], grounding: 'none', relationMode: null, relationTarget: null, groundedIn: [], constraints: [], legacy: null },
        primary: findings.slice(0, 2).map((finding) => `dynamic-${finding.id}`),
        central: rel[0] ?? null,
        uncertainties,
        withheld: [...WITHHELD_COMMON, ...WITHHELD_BY_DOMAIN[domain]],
        forbidden: FORBIDDEN,
        extension: {
            domain, relationship: kind, ageBand: input.age, dynamics: findings.map((finding) => finding.id), observed: [...input.context],
            source: { evidence: 'connections/evidence/pairEvidence', interpretation: 'connections/domains/dynamics', meanings: 'connections/reading/content' },
        },
    });
}
