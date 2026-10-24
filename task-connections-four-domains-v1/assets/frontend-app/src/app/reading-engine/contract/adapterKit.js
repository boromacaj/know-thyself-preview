import { sealIntent, summarizeConvergence } from './readingIntent.js';
import { READING_INTENT_CONTRACT_VERSION, modalityRank, } from './readingIntentTypes.js';
/**
 * THE SMALL KIT EVERY PILLAR ADAPTER SHARES.
 *
 * A pillar adapter turns the pillar's OWN typed narrative plan into a ReadingIntent. What differs between pillars is the mapping (which claim becomes which proposition, what its facts
 * are, which authored knowledge it points at); what does not is how a proposition is licensed and sealed. That part is here, once, so that the wording discipline of the contract (a
 * symbolic reading is never asserted; a conditional claim is never asserted; a withheld claim carries no content) is applied the same way to every pillar and cannot drift between them.
 *
 * Nothing here knows a pillar. It adds no doctrine and no ontology: it builds the objects the contract already defines.
 */
/** A display value as an identifier: "Emotional / Solar Plexus" -> "emotional-solar-plexus". */
export const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
/** The wording a pillar's own evidence level licenses (firm -> tendency, moderate -> tentative, tentative -> possibility). */
export const MODALITY_OF_EVIDENCE = { firm: 'tendency', moderate: 'tentative', tentative: 'possibility' };
export function evidenceRefs(config, path, roots = [config.root]) {
    return [
        ...roots.map((root) => ({ source: config.planSource, path, root })),
        { source: config.modelSource, path: path.replace(/^plan\./, 'model.'), root: roots[0] },
    ];
}
/** One proposition, licensed by the contract's own rules. */
export function buildProposition(spec, config) {
    const structural = spec.status === 'structural-observation';
    const tradition = spec.status === 'tradition-convention';
    /* an uncertain input makes what the chart carries conditional on it; a conditional claim is never asserted */
    const conditions = [...(spec.conditions ?? []), ...(config.extraCondition && spec.roots === undefined ? [config.extraCondition] : [])];
    const ceiling = structural || tradition ? 'assert' : spec.modality === 'tentative' ? 'tentative' : 'tendency';
    let modality = spec.modality;
    if (conditions.length > 0 && modality === 'assert')
        modality = 'tendency';
    if (modalityRank(modality) > modalityRank(ceiling))
        modality = ceiling;
    return {
        id: spec.id,
        pillar: config.pillar,
        frame: spec.frame,
        slots: spec.slots,
        role: spec.role,
        disclosure: 'must',
        rank: spec.rank,
        calculation: conditions.length > 0 ? { determinacy: 'conditional', adequacy: 'partial' } : { determinacy: 'determined', adequacy: 'full' },
        interpretation: { status: spec.status, scope: structural ? 'structure' : tradition ? 'tradition' : 'person', modality, ceiling, conditions },
        valence: spec.valence ?? 'neutral',
        applicableDomains: 'any',
        facets: [],
        evidence: evidenceRefs(config, spec.path, spec.roots),
        independenceGroup: spec.independenceGroup ?? config.group ?? `${config.pillar}:chart`,
        forbid: [...config.forbidden],
        practical: spec.practical ?? null,
        meaningKey: spec.meaningKey,
    };
}
/** A proposition that says only that something is NOT read (role caveat, modality withheld, no content but the reason). */
export function withheldNotice(config, id, frame, reason, path = 'claim', roots = [config.root]) {
    return {
        id, pillar: config.pillar, frame, slots: { reason }, role: 'caveat', disclosure: 'must', rank: 1,
        calculation: { determinacy: 'withheld', adequacy: 'insufficient' },
        interpretation: { status: 'structural-observation', scope: 'structure', modality: 'withheld', ceiling: 'assert', conditions: [] },
        valence: 'neutral', applicableDomains: 'any', facets: [], evidence: evidenceRefs(config, path, roots), independenceGroup: `${config.pillar}:${reason}`, forbid: [...config.forbidden], practical: null,
        meaningKey: `${config.pillar}.notice:${reason}`,
    };
}
export const noTakeaway = () => ({ act: 'none', target: null, relationTargets: [], grounding: 'none', relationMode: null, relationTarget: null, groundedIn: [], constraints: [], legacy: null });
/** A friction (or other) relation joining a proposition of the pillar's plan to the claim it bears on. */
export function relation(id, from, to, cls, nativeKind, system, salience = 'notable') {
    return { id, from, to, class: cls, salience, backing: 'derived', agent: from, native: [{ system, kind: nativeKind, backed: true }], status: 'single-source' };
}
/** Seals an intent of a natal kind: no question context, no cards, the lowest contract version. */
export function sealPillarIntent(parts) {
    const body = {
        contract: READING_INTENT_CONTRACT_VERSION,
        pillar: parts.pillar,
        kind: parts.kind,
        intelligence: { engine: parts.engine, contentVersion: parts.contentVersion, deck: parts.deck },
        context: { subject: 'self', question: null },
        propositions: parts.propositions,
        relations: parts.relations,
        discourse: {
            primary: parts.primary,
            centralRelation: parts.central,
            argument: parts.central ? { source: parts.centralSource ?? 's1-tension', note: 'the plan\'s first (strongest) tension' } : { source: 'none', note: 'the plan has no tension: no relation is claimed' },
            sections: parts.sections,
            omitted: parts.omitted ?? [],
            takeaway: parts.takeaway,
        },
        rules: { forbiddenInferences: [...parts.forbidden], uncertainties: [...parts.uncertainties], safety: { level: 'standard', flags: [], drawsCards: false }, withheld: [...parts.withheld] },
        convergence: summarizeConvergence(parts.propositions, false),
        extension: parts.extension,
    };
    return sealIntent(body);
}
/** A section of the discourse plan; absent members are dropped and an empty section is not made. */
export function section(ids, id, purpose, members, told, budget, rels = []) {
    const present = members.filter((m) => ids.has(m));
    return present.length === 0 ? null : { id, purpose, propositions: present, relations: [...rels], merge: [], budget: [budget[0], budget[1]], told: told.filter((t) => ids.has(t)) };
}
