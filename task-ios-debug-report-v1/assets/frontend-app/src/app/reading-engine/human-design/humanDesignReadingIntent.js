import { sealIntent, summarizeConvergence } from '../contract/readingIntent.js?v=b5ef5ed';
import { buildProposition, evidenceRefs as kitEvidenceRefs } from '../contract/adapterKit.js?v=b5ef5ed';
import { READING_INTENT_CONTRACT_VERSION, } from '../contract/readingIntentTypes.js?v=b5ef5ed';
/**
 * THE HUMAN DESIGN ADAPTER: THE PILLAR'S OWN NARRATIVE PLAN, AS A READING INTENT.
 *
 * Human Design is the first pillar after Tarot to have one, and the reason it was chosen is in the pillar, not in this file. Its narrative layer already separates the three
 * things a realization needs: the CALCULATED chart (humanDesignEngine), the typed PLAN of what the reading will say (humanDesignNarrativePlan: a short sequence of claims, each with the
 * facts it checked and, for the tensions and the social claim, how far it can be leaned on), and the VOICE that turns each claim into sentences (humanDesignVoiceEn / Sk). This adapter reads
 * the plan. It reads no voice and no finished sentence, and it adds no doctrine: the meaning of a Type, an Authority, a Profile or a Definition stays in the knowledge units the pillar
 * already authored (knowledge/human-design), which a proposition points at by key (`meaningKey`) exactly as a Tarot proposition points at a card face.
 *
 * WHAT THE PLAN DOES NOT CARRY, THE ADAPTER STATES AND DOES NOT INVENT.
 *   - Per-claim modality exists only where the plan has `Evidence` (firm / moderate / tentative): the social claim and every tension. The adapter maps it (firm -> tendency, moderate ->
 *     tentative, tentative -> possibility). For the other claims the modality follows the pillar's own convention, written in the plan's header: the Type, the Authority, the Definition
 *     and the centres are MECHANICS the tradition defines (status tradition-convention, which the contract allows to be asserted), and the cost and the practice are readings of the
 *     person (symbolic-reading, at most tentative).
 *   - "What never becomes a claim" is a comment in the plan and a regex in its tests; here it is data (`rules.withheld`, `rules.forbiddenInferences`), so a renderer cannot reconstruct it.
 *   - An approximate birth time makes every graph-derived claim conditional on the time (the plan already lowers its tension evidence; the adapter records the condition on every
 *     proposition the time can move). An UNKNOWN time never reaches the plan; the narrative then has only an envelope (what holds at every instant of the birth date), which becomes
 *     conditional propositions plus a withheld notice. A withheld narrative becomes an intent with no claim at all.
 *
 * NOTHING HERE CARRIES A SENTENCE: every slot is a token, a number or a boolean, and the intent is the same in every language (a test builds it under English and Slovak and compares).
 */
export const HUMAN_DESIGN_KIND = 'human-design-natal';
export const HUMAN_DESIGN_CONTENT_VERSION = 1;
const ROOT_CHART = 'system:human-design/bodygraph';
const ROOT_TIME = 'system:human-design/birth-time';
/** A display value as an identifier: "Emotional / Solar Plexus" -> "emotional-solar-plexus". */
export const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const FORBIDDEN = ['assumption-as-fact', 'diagnosis', 'domain-transfer', 'event-prediction'];
/** What the plan's header says never becomes a claim, as data. */
const WITHHELD_ALWAYS = [
    { key: 'population-share', reason: 'a share of people ("rare", "most people") is not a fact about this chart and no claim shape carries it' },
    { key: 'incarnation-cross', reason: 'the named Incarnation Cross is not read in the main reading' },
    { key: 'biography', reason: 'no event, job, family, childhood or relationship is stated about the reader' },
    { key: 'body-and-health', reason: 'no body, diagnosis or health claim; the system describes a mechanic, not a condition' },
    { key: 'completing-person', reason: 'no other person who would complete a split or fill an open centre' },
];
const MODALITY_OF_EVIDENCE = { firm: 'tendency', moderate: 'tentative', tentative: 'possibility' };
const hdConfig = (approximate) => ({
    pillar: 'human-design', root: ROOT_CHART, planSource: 'human-design.narrative-plan', modelSource: 'human-design.interpretation', forbidden: FORBIDDEN,
    extraCondition: approximate ? 'birth-time-approximate' : null, group: 'human-design:bodygraph',
});
const proposition = (spec, approximate) => buildProposition(spec, hdConfig(approximate));
const centers = (list) => [...list];
/** One proposition per claim of the plan, in the pillar's own order of argument. */
function specsOfPlan(plan) {
    const specs = [];
    const t = plan.time;
    if (t) {
        specs.push({
            id: 'time', frame: 'human-design.birth-time', role: 'caveat', rank: 1, status: 'structural-observation', modality: 'tendency', path: 'plan.time', roots: [ROOT_TIME],
            conditions: ['birth-time-approximate'], meaningKey: 'human-design.birth-time:approximate',
            slots: {
                precision: t.precision, windowHours: t.window?.hours ?? null, windowChanges: t.window?.changes ? [...t.window.changes] : [],
                stabilityType: t.stability.type, stabilityAuthority: t.stability.authority, stabilityProfile: t.stability.profile, stabilityDefinition: t.stability.definition,
            },
        });
    }
    const o = plan.operating;
    specs.push({
        id: 'operating', frame: 'human-design.operating', role: 'thesis', rank: 1, status: 'tradition-convention', modality: 'assert', path: 'plan.operating',
        meaningKey: `knowledge:human-design:hd-type:${slug(o.type)}:type-role`,
        slots: { type: slug(o.type), strategy: slug(o.strategy), initiation: o.initiation, sacralPowered: o.sacralPowered, motorToThroat: o.motorToThroat, motorPath: centers(o.motorPath), pathChannels: [...o.pathChannels] },
    });
    const d = plan.decision;
    specs.push({
        id: 'decision', frame: 'human-design.decision', role: 'thesis', rank: 1, status: 'tradition-convention', modality: 'assert', path: 'plan.decision',
        meaningKey: `knowledge:human-design:hd-authority:${slug(d.authority)}:authority-role`,
        slots: { authority: slug(d.authority), authorityKind: d.authorityKind, center: d.center, needsTime: d.needsTime, evidenceChannels: [...d.evidence], confusableWith: d.confusableWith, type: slug(d.type), initiation: d.initiation },
    });
    if (plan.social) {
        const s = plan.social;
        specs.push({
            id: 'social', frame: 'human-design.profile', role: 'support', rank: 2, status: 'tradition-convention', modality: MODALITY_OF_EVIDENCE[s.evidence] === 'tendency' ? 'assert' : MODALITY_OF_EVIDENCE[s.evidence], path: 'plan.social',
            meaningKey: `knowledge:human-design:hd-profile:${s.label}:profile-role`,
            slots: { conscious: s.conscious, unconscious: s.unconscious, shape: s.shape, label: s.label, initiation: s.initiation, evidence: s.evidence },
        });
    }
    if (plan.consistency) {
        const c = plan.consistency;
        specs.push({
            id: 'consistency', frame: 'human-design.consistency', role: 'support', rank: 2, status: 'tradition-convention', modality: 'assert', path: 'plan.consistency',
            meaningKey: `knowledge:human-design:hd-definition:${slug(c.definition)}:base-archetype`,
            slots: {
                definition: slug(c.definition), groupCount: c.groupCount, definedCount: c.definedCount,
                functionsDefined: c.functions.map((f) => f.fn), definedCenters: c.functions.flatMap((f) => [...f.defined]), channels: c.channels.map((ch) => ch.id),
            },
        });
    }
    if (plan.context) {
        const c = plan.context;
        specs.push({
            id: 'context', frame: 'human-design.context', role: 'support', rank: 2, status: 'tradition-convention', modality: 'assert', path: 'plan.context',
            meaningKey: 'human-design.centers:open',
            slots: { openCount: c.openCount, openCenters: centers(c.centers), functionsOpen: c.functions.map((f) => f.fn), whollyOpen: c.whollyOpen },
        });
    }
    plan.tension.forEach((claim, i) => specs.push(tensionSpec(claim, i)));
    const co = plan.cost;
    specs.push({
        id: 'cost', frame: 'human-design.cost', role: 'tension', rank: 2, status: 'symbolic-reading', modality: 'tentative', path: 'plan.cost', meaningKey: `human-design.cost:${slug(co.type)}`,
        slots: { notSelf: co.notSelf ? slug(co.notSelf) : null, type: slug(co.type), initiation: co.initiation, pressure: co.pressure, sacralPowered: co.sacralPowered },
    });
    const pr = plan.practice;
    specs.push({
        id: 'practice', frame: 'human-design.practice', role: 'practice', rank: 2, status: 'symbolic-reading', modality: 'tentative', path: 'plan.practice', meaningKey: `human-design.practice:${slug(pr.type)}`,
        practical: { intent: 'attend-to-it', licensedBy: ['operating', 'decision'] },
        slots: { type: slug(pr.type), strategy: slug(pr.strategy), authority: slug(pr.authority), authorityKind: pr.authorityKind, needsTime: pr.needsTime, signature: pr.signature ? slug(pr.signature) : null, initiation: pr.initiation, watch: pr.watch },
    });
    return specs;
}
function tensionSpec(claim, index) {
    const base = { id: `tension-${index}`, frame: `human-design.tension.${claim.kind}`, role: 'tension', rank: 2, status: 'symbolic-reading', modality: MODALITY_OF_EVIDENCE[claim.evidence], path: `plan.tension[${index}]`, meaningKey: `human-design.tension:${claim.kind}` };
    switch (claim.kind) {
        case 'pace': return { ...base, slots: { kind: claim.kind, type: slug(claim.type), authority: slug(claim.authority), authorityKind: claim.authorityKind, initiation: claim.initiation, evidence: claim.evidence } };
        case 'split': return { ...base, slots: { kind: claim.kind, definition: slug(claim.definition), groupCount: claim.groups.length, groupCenters: claim.groups.map((g) => g.centers.join('+')), bridgeGates: [...claim.bridgeGates], evidence: claim.evidence } };
        case 'signal-noise': return { ...base, slots: { kind: claim.kind, authority: slug(claim.authority), authorityKind: claim.authorityKind, noise: claim.noise, evidence: claim.evidence } };
        case 'profile': return { ...base, slots: { kind: claim.kind, conscious: claim.conscious, unconscious: claim.unconscious, evidence: claim.evidence } };
        case 'reach': return { ...base, slots: { kind: claim.kind, awareness: centers(claim.awareness), openDrive: centers(claim.openDrive), evidence: claim.evidence } };
    }
}
/** The claim a tension contradicts: what its relation joins it to. */
const TENSION_TARGET = { pace: 'operating', split: 'consistency', 'signal-noise': 'decision', profile: 'social', reach: 'context' };
const BUDGETS = {
    'hd-operates': [3, 7], 'hd-decides': [3, 6], 'hd-with-others': [2, 5], 'hd-consistent': [2, 5], 'hd-context': [2, 5], 'hd-tension': [2, 4], 'hd-costs': [2, 4], 'hd-practice': [2, 4],
};
/** The intent of a composed Human Design narrative. The three narrative states are three different intents; none of them carries a sentence. */
export function buildHumanDesignReadingIntent(narrative) {
    if (narrative.state === 'read')
        return fromPlan(narrative.plan);
    if (narrative.state === 'envelope')
        return fromEnvelope(narrative.claim);
    return seal({ state: 'withheld', precision: 'unknown', propositions: [], relations: [], sections: [], omitted: [], takeaway: noTakeaway(), primary: [], central: null, uncertainties: ['birth-time-unknown'], withheld: [{ key: 'chart', reason: 'the birth time is unknown and the envelope of the day is not available; nothing is read' }], safetyLevel: 'standard' });
}
const noTakeaway = () => ({ act: 'none', target: null, relationTargets: [], grounding: 'none', relationMode: null, relationTarget: null, groundedIn: [], constraints: [], legacy: null });
function seal(parts) {
    const body = {
        contract: READING_INTENT_CONTRACT_VERSION,
        pillar: 'human-design',
        kind: HUMAN_DESIGN_KIND,
        intelligence: { engine: 'human-design-narrative', contentVersion: HUMAN_DESIGN_CONTENT_VERSION, deck: 'knowledge:human-design' },
        context: { subject: 'self', question: null },
        propositions: parts.propositions,
        relations: parts.relations,
        discourse: {
            primary: parts.primary,
            centralRelation: parts.central,
            argument: parts.central ? { source: 's1-tension', note: 'the plan\'s first (strongest) tension' } : { source: 'none', note: 'the plan has no tension: no relation is claimed' },
            sections: parts.sections,
            omitted: parts.omitted,
            takeaway: parts.takeaway,
        },
        rules: {
            forbiddenInferences: [...FORBIDDEN],
            uncertainties: [...parts.uncertainties],
            safety: { level: parts.safetyLevel, flags: [], drawsCards: false },
            withheld: [...WITHHELD_ALWAYS, ...parts.withheld],
        },
        convergence: summarizeConvergence(parts.propositions, false),
        extension: {
            state: parts.state,
            precision: parts.precision,
            narrativeSections: parts.sections.map((s) => s.id),
            claims: parts.propositions.map((p) => p.id),
            source: { plan: 'pillar-reading/human-design-narrative/humanDesignNarrativePlan', meanings: 'knowledge/human-design' },
        },
    };
    return sealIntent(body);
}
function fromPlan(plan) {
    const approximate = plan.time !== null;
    const specs = specsOfPlan(plan);
    const propositions = specs.map((spec) => proposition(spec, approximate));
    const ids = new Set(propositions.map((p) => p.id));
    const relations = plan.tension.map((claim, i) => ({
        id: `rel-tension-${i}`,
        from: `tension-${i}`,
        to: TENSION_TARGET[claim.kind],
        class: 'friction',
        salience: i === 0 ? 'defining' : 'notable',
        backing: 'derived',
        agent: `tension-${i}`,
        native: [{ system: 'human-design', kind: claim.kind, backed: true }],
        status: 'single-source',
    })).filter((relation) => ids.has(relation.to));
    const section = (id, purpose, members, told, rels = []) => {
        const present = members.filter((m) => ids.has(m));
        /* a section that says several tensions has room for each of them */
        const [low, high] = BUDGETS[id] ?? [1, 4];
        return present.length === 0 ? null : { id, purpose, propositions: present, relations: [...rels], merge: [], budget: [low, id === 'hd-tension' ? high * present.length : high], told: [...told] };
    };
    const tensionIds = plan.tension.map((_, i) => `tension-${i}`);
    const sections = [
        section('hd-operates', 'ground', ['time', 'operating'], []),
        section('hd-decides', 'develop', ['decision'], ['operating']),
        section('hd-with-others', 'develop', ['social'], ['operating', 'decision']),
        section('hd-consistent', 'develop', ['consistency'], ['operating', 'decision']),
        section('hd-context', 'develop', ['context'], ['operating', 'decision']),
        section('hd-tension', 'tension', tensionIds, ['operating', 'decision'], relations.map((r) => r.id)),
        section('hd-costs', 'tension', ['cost'], ['operating', 'decision']),
        section('hd-practice', 'practice', ['practice'], ['decision']),
    ].filter((s) => s !== null);
    const central = relations.length > 0 ? relations[0].id : null;
    const takeaway = {
        act: 'attend-to-it', target: 'practice', relationTargets: [], grounding: 'place', relationMode: null, relationTarget: null,
        groundedIn: central ? [central] : [], constraints: [...FORBIDDEN, ...(approximate ? ['uncertain:birth-time-approximate'] : [])].sort(), legacy: null,
    };
    return seal({
        state: 'read', precision: approximate ? 'approximate' : 'exact', propositions, relations, sections, omitted: [], takeaway, primary: ['operating', 'decision'], central,
        uncertainties: approximate ? ['birth-time-approximate'] : [], withheld: [], safetyLevel: 'standard',
    });
}
/** An unknown time: what holds at every instant of the birth date, as conditional propositions, and a withheld notice for what does not. */
function fromEnvelope(claim) {
    const notice = {
        id: 'notice-unknown-time', pillar: 'human-design', frame: 'human-design.notice.unknown-time', slots: { reason: 'birth-time-unknown' }, role: 'caveat', disclosure: 'must', rank: 1,
        calculation: { determinacy: 'withheld', adequacy: 'insufficient' },
        interpretation: { status: 'structural-observation', scope: 'structure', modality: 'withheld', ceiling: 'assert', conditions: [] },
        valence: 'neutral', applicableDomains: 'any', facets: [], evidence: kitEvidenceRefs(hdConfig(false), 'claim', [ROOT_TIME]), independenceGroup: 'human-design:birth-time', forbid: [...FORBIDDEN], practical: null,
        meaningKey: 'human-design.notice:unknown-time',
    };
    const env = (id, frame, role, rank, slots, meaningKey) => proposition({
        id, frame, role, rank, status: 'structural-observation', modality: 'tendency', path: 'claim', conditions: ['birth-time-unknown'], roots: [ROOT_CHART], meaningKey, slots,
    }, false);
    const holds = env('holds-all-day', 'human-design.envelope.holds', 'thesis', 1, { gatesAllDay: claim.gatesAllDay, stableMechanics: claim.stable.map((s) => `${s.key}:${slug(s.value)}`) }, 'human-design.envelope:holds');
    const consistent = claim.definedAllDay.length > 0 || claim.channelsAllDay.length > 0
        ? env('consistent-all-day', 'human-design.envelope.consistent', 'support', 2, { definedAllDay: centers(claim.definedAllDay), channelsAllDay: [...claim.channelsAllDay] }, 'human-design.envelope:consistent') : null;
    const context = claim.openAllDay.length > 0
        ? env('context-all-day', 'human-design.envelope.context', 'support', 2, { openAllDay: centers(claim.openAllDay) }, 'human-design.envelope:context') : null;
    const moves = claim.movingCentres.length > 0 || claim.moving.length > 0 || claim.channelsSometimes.length > 0
        ? env('moves-through-day', 'human-design.envelope.moves', 'caveat', 2, { movingCenters: centers(claim.movingCentres), channelsSometimes: [...claim.channelsSometimes], movingMechanics: claim.moving.map((m) => `${m.key}:${m.values.map(slug).join('+')}`), segments: claim.segments }, 'human-design.envelope:moves') : null;
    const propositions = [notice, holds, ...(moves ? [moves] : []), ...(consistent ? [consistent] : []), ...(context ? [context] : [])];
    const sections = [
        { id: 'hd-envelope', purpose: 'limit', propositions: ['notice-unknown-time', 'holds-all-day', ...(moves ? ['moves-through-day'] : [])], relations: [], merge: [], budget: [2, 6], told: [] },
        ...(consistent ? [{ id: 'hd-consistent', purpose: 'develop', propositions: ['consistent-all-day'], relations: [], merge: [], budget: [1, 4], told: ['holds-all-day'] }] : []),
        ...(context ? [{ id: 'hd-context', purpose: 'develop', propositions: ['context-all-day'], relations: [], merge: [], budget: [1, 4], told: ['holds-all-day'] }] : []),
    ];
    return seal({
        state: 'envelope', precision: 'unknown', propositions, relations: [], sections, omitted: [], takeaway: noTakeaway(), primary: ['holds-all-day'], central: null,
        uncertainties: ['birth-time-unknown'], withheld: [{ key: 'mechanics-that-move', reason: 'a mechanic that changes across the birth date is reported as a range, never as a single value' }], safetyLevel: 'standard',
    });
}
export const humanDesignTensionKinds = ['pace', 'split', 'signal-noise', 'profile', 'reach'];
