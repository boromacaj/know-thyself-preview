import { canonicalize, digestOf } from './canonical.js?v=53c0693';
import { bodyOf, summarizeConvergence } from './readingIntent.js?v=53c0693';
import { ADEQUACY, ARGUMENT_SOURCES, CLAIM_SCOPES, DETERMINACY, DISCLOSURES, DISCOURSE_PURPOSES, FORBIDDEN_INFERENCES, INTERPRETIVE_STATUS, MODALITIES, PILLAR_IDS, PROPOSITION_ROLES, READING_INTENT_CONTRACT_VERSION, READING_INTENT_CONTRACT_VERSION_1_1, READING_INTENT_CONTRACT_VERSIONS, SCHEMA_READING_KINDS_BY_PILLAR, IMPLEMENTED_READING_KINDS_BY_PILLAR, RELATION_BACKINGS, RELATION_CLASSES, RELATION_SALIENCES, RELATION_STATUSES, ROOT_PATTERN, SAFETY_LEVELS, SLOT_TOKEN_PATTERN, TAKEAWAY_ACTS, TAKEAWAY_GROUNDINGS, VALENCES, modalityRank, } from './readingIntentTypes.js?v=53c0693';
const ID_PATTERN = /^[a-z][a-z0-9._:-]*$/;
const rank = (modality) => modalityRank(modality);
const isOneOf = (list, value) => typeof value === 'string' && list.includes(value);
export function validateReadingIntent(input) {
    const issues = [];
    const issue = (code, path, message) => { issues.push({ code, path, message }); };
    try {
        check(input, issue);
    }
    catch (error) {
        issue('MALFORMED', '$', `the intent could not be read: ${error instanceof Error ? error.message : String(error)}`);
    }
    return { valid: issues.length === 0, issues };
}
function check(intent, issue) {
    if (intent === null || typeof intent !== 'object') {
        issue('MALFORMED', '$', 'not an object');
        return;
    }
    if (!READING_INTENT_CONTRACT_VERSIONS.includes(intent.contract))
        issue('CONTRACT_VERSION', 'contract', `expected one of ${READING_INTENT_CONTRACT_VERSIONS.join(', ')}`);
    else {
        /* `focus` belongs to 1.1.0 and only to 1.1.0: a 1.0.0 intent that carries it, or a 1.1.0 intent with a question that lacks it, is not what its version says */
        const question = intent.context?.question;
        if (question) {
            const has = Object.prototype.hasOwnProperty.call(question, 'focus');
            if (intent.contract === READING_INTENT_CONTRACT_VERSION && has)
                issue('FOCUS_NOT_IN_OLD_CONTRACT', 'context.question.focus', 'focus is a 1.1.0 field');
            if (intent.contract === READING_INTENT_CONTRACT_VERSION_1_1 && !has)
                issue('FOCUS_MISSING', 'context.question.focus', 'a 1.1.0 question context carries focus (a closed id, or null)');
            if (has && question.focus !== null && !(typeof question.focus === 'string' && ID_PATTERN.test(question.focus)))
                issue('FOCUS_FORMAT', 'context.question.focus', 'focus is a closed lower-case id or null, never text');
        }
    }
    if (!isOneOf(PILLAR_IDS, intent.pillar))
        issue('PILLAR', 'pillar', 'unsupported pillar');
    else if (!SCHEMA_READING_KINDS_BY_PILLAR[intent.pillar].includes(intent.kind))
        issue('KIND', 'kind', `kind "${String(intent.kind)}" is not a reading kind of ${intent.pillar}`);
    else if (!IMPLEMENTED_READING_KINDS_BY_PILLAR[intent.pillar].includes(intent.kind))
        issue('KIND_NOT_IMPLEMENTED', 'kind', `kind "${intent.kind}" is named by the schema but no ${intent.pillar} adapter builds it`);
    /* canonical form and digest */
    let canonicalOk = true;
    try {
        canonicalize(bodyOf(intent));
    }
    catch (error) {
        canonicalOk = false;
        issue('CANONICAL', '$', error instanceof Error ? error.message : 'not canonical');
    }
    if (canonicalOk) {
        const digest = digestOf(bodyOf(intent));
        if (intent.digest !== digest)
            issue('DIGEST_MISMATCH', 'digest', 'the digest does not describe the fields beside it');
        if (intent.id !== `ri-${digest.slice(0, 16)}`)
            issue('ID_MISMATCH', 'id', 'the id is not derived from the digest');
    }
    const propositions = Array.isArray(intent.propositions) ? intent.propositions : [];
    if (!Array.isArray(intent.propositions))
        issue('MALFORMED', 'propositions', 'not a list');
    const byId = new Map();
    propositions.forEach((proposition, index) => {
        const at = `propositions[${index}]`;
        if (typeof proposition.id !== 'string' || !ID_PATTERN.test(proposition.id))
            issue('PROP_ID_FORMAT', `${at}.id`, 'ids are lower-case identifiers');
        if (byId.has(proposition.id))
            issue('PROP_ID_DUP', `${at}.id`, `duplicate proposition id ${proposition.id}`);
        byId.set(proposition.id, proposition);
        checkProposition(intent, proposition, at, issue);
    });
    checkRelations(intent, byId, issue);
    checkDiscourse(intent, byId, issue);
    checkRules(intent, propositions, issue);
    checkConvergence(intent, propositions, issue);
}
function checkProposition(intent, p, at, issue) {
    if (p.pillar !== intent.pillar && intent.pillar !== 'cross-pillar')
        issue('PROP_PILLAR', `${at}.pillar`, 'a proposition belongs to the intent\'s pillar (only a cross-pillar intent combines several)');
    if (typeof p.frame !== 'string' || !ID_PATTERN.test(p.frame))
        issue('FRAME_FORMAT', `${at}.frame`, 'a frame is a closed lower-case id');
    else if (intent.pillar !== 'cross-pillar' && !p.frame.startsWith(`${intent.pillar}.`))
        issue('FRAME_PILLAR', `${at}.frame`, `a ${intent.pillar} frame starts with "${intent.pillar}."`);
    if (!isOneOf(PROPOSITION_ROLES, p.role))
        issue('ROLE', `${at}.role`, 'unknown role');
    if (!isOneOf(DISCLOSURES, p.disclosure))
        issue('DISCLOSURE', `${at}.disclosure`, 'unknown disclosure');
    if (![1, 2, 3].includes(p.rank))
        issue('RANK', `${at}.rank`, 'rank is 1, 2 or 3');
    if (!isOneOf(VALENCES, p.valence))
        issue('VALENCE', `${at}.valence`, 'unknown valence');
    /* slots are identifiers and numbers, never prose */
    for (const [key, value] of Object.entries(p.slots ?? {})) {
        const values = Array.isArray(value) ? value : [value];
        for (const item of values) {
            if (typeof item === 'string' && !SLOT_TOKEN_PATTERN.test(item))
                issue('SLOT_PROSE', `${at}.slots.${key}`, 'a slot holds a token, not text: spaces and punctuation are not allowed');
            else if (item !== null && !['string', 'number', 'boolean'].includes(typeof item))
                issue('SLOT_TYPE', `${at}.slots.${key}`, 'a slot holds a token, a number, a boolean, or a list of them');
        }
    }
    const calc = p.calculation;
    const interp = p.interpretation;
    if (!calc || !isOneOf(DETERMINACY, calc.determinacy) || !isOneOf(ADEQUACY, calc.adequacy)) {
        issue('CALCULATION', `${at}.calculation`, 'determinacy and adequacy are required');
        return;
    }
    if (!interp || !isOneOf(INTERPRETIVE_STATUS, interp.status) || !isOneOf(CLAIM_SCOPES, interp.scope) || !isOneOf(MODALITIES, interp.modality) || !isOneOf(MODALITIES, interp.ceiling)) {
        issue('INTERPRETATION', `${at}.interpretation`, 'status, scope, modality and ceiling are required');
        return;
    }
    /* calculation consistency */
    if ((calc.determinacy === 'withheld') !== (calc.adequacy === 'insufficient'))
        issue('CALC_CONSISTENCY', `${at}.calculation`, 'a withheld calculation is exactly one whose inputs are insufficient');
    if (calc.determinacy === 'withheld') {
        if (interp.modality !== 'withheld')
            issue('WITHHELD_MODALITY', `${at}.interpretation.modality`, 'a withheld claim has the modality "withheld"');
        if (p.practical !== null)
            issue('WITHHELD_PRACTICAL', `${at}.practical`, 'no advice may rest on a withheld claim');
        const extra = Object.keys(p.slots ?? {}).filter((key) => key !== 'reason');
        if (extra.length > 0)
            issue('WITHHELD_CONTENT', `${at}.slots`, `a withheld claim carries no content (found ${extra.join(', ')}): it would reconstruct what was withheld`);
        if (p.disclosure === 'must' && p.role !== 'caveat')
            issue('WITHHELD_DISCLOSURE', `${at}.disclosure`, 'the only withheld proposition that is said is the notice that something is not read (role caveat)');
    }
    if (calc.determinacy === 'conditional' && interp.conditions.length === 0)
        issue('CONDITIONAL_NO_CONDITION', `${at}.interpretation.conditions`, 'a conditional calculation names its condition');
    /* the wording ladder */
    if (rank(interp.modality) > rank(interp.ceiling))
        issue('MODALITY_ABOVE_CEILING', `${at}.interpretation.modality`, 'the licensed wording is above the ceiling');
    /* the scope of a claim decides what may be asserted: calculation determinacy never raises it */
    const structural = interp.status === 'structural-observation';
    const tradition = interp.status === 'tradition-convention';
    const symbolic = interp.status === 'symbolic-reading';
    if (structural && interp.scope !== 'structure')
        issue('STATUS_SCOPE', `${at}.interpretation`, 'a structural observation is about the structure');
    if (tradition && interp.scope !== 'tradition')
        issue('STATUS_SCOPE', `${at}.interpretation`, 'a tradition-convention is about what the tradition holds');
    if (symbolic && !['situation', 'person', 'other-person', 'future'].includes(interp.scope))
        issue('STATUS_SCOPE', `${at}.interpretation`, 'a symbolic reading is about a situation, a person, another person or the future');
    if (interp.modality === 'assert' || interp.ceiling === 'assert') {
        if (!(structural || tradition))
            issue('SYMBOLIC_ASSERT', `${at}.interpretation`, 'a symbolic reading is never asserted, however certain the calculation behind it');
        else if (interp.scope !== 'structure' && interp.scope !== 'tradition')
            issue('ASSERT_SCOPE', `${at}.interpretation`, 'only the structure or the tradition may be asserted');
    }
    if (symbolic) {
        if (rank(interp.ceiling) > rank('tendency'))
            issue('SYMBOLIC_CEILING', `${at}.interpretation.ceiling`, 'a symbolic reading is at most a tendency');
        if (interp.scope === 'other-person' && rank(interp.ceiling) > rank('tentative'))
            issue('OTHER_PERSON_CEILING', `${at}.interpretation.ceiling`, 'what is said of another person is at most tentative');
        if (interp.scope === 'other-person' && !p.forbid.includes('private-thoughts'))
            issue('OTHER_PERSON_FORBID', `${at}.forbid`, 'a claim about another person forbids private-thoughts');
        if (interp.scope === 'future' && !p.forbid.includes('event-prediction'))
            issue('FUTURE_FORBID', `${at}.forbid`, 'a claim about the future forbids event-prediction');
    }
    if (interp.conditions.length > 0 && interp.modality === 'assert')
        issue('CONDITION_ASSERTED', `${at}.interpretation`, 'a conditional claim cannot be asserted');
    /* advice */
    if (p.practical !== null) {
        const licensed = rank(interp.modality) >= rank('tentative') && !structural && interp.scope !== 'other-person';
        if (!licensed || !p.practical.licensedBy || p.practical.licensedBy.length === 0)
            issue('PRACTICAL_UNLICENSED', `${at}.practical`, 'advice needs a symbolic or traditional claim of at least tentative strength, about the person\'s own situation, and a named licence');
    }
    /* evidence and roots */
    if (p.disclosure !== 'never' && (!p.evidence || p.evidence.length === 0))
        issue('EVIDENCE_MISSING', `${at}.evidence`, 'a proposition that may be said cites where the engine holds the fact');
    (p.evidence ?? []).forEach((evidence, index) => {
        if (!evidence.source || !evidence.path)
            issue('EVIDENCE_REF', `${at}.evidence[${index}]`, 'an evidence reference names a source and a path');
        if (!ROOT_PATTERN.test(evidence.root ?? ''))
            issue('ROOT_FORMAT', `${at}.evidence[${index}].root`, 'a root is system:<key>, shared:<key> or tarot:<key>');
    });
    for (const forbidden of p.forbid ?? [])
        if (!isOneOf(FORBIDDEN_INFERENCES, forbidden))
            issue('FORBID_UNKNOWN', `${at}.forbid`, `unknown forbidden inference ${String(forbidden)}`);
    /* domain applicability: a restricted facet that does not apply forbids domain transfer */
    for (const facet of p.facets ?? []) {
        if (!facet.applicable && !p.forbid.includes('domain-transfer'))
            issue('FACET_FORBID', `${at}.facets`, `facet ${facet.facet} is not applicable here, so the proposition must forbid domain-transfer`);
        if (!['existing-scope-table', 'core-scan'].includes(facet.basis))
            issue('FACET_BASIS', `${at}.facets`, 'a facet restriction names where it comes from');
    }
    if (typeof p.meaningKey !== 'string' || p.meaningKey.length === 0)
        issue('MEANING_KEY', `${at}.meaningKey`, 'a proposition points at the authored meaning it stands for');
}
function checkRelations(intent, byId, issue) {
    const seen = new Set();
    (intent.relations ?? []).forEach((relation, index) => {
        const at = `relations[${index}]`;
        if (seen.has(relation.id))
            issue('RELATION_ID_DUP', `${at}.id`, `duplicate relation id ${relation.id}`);
        seen.add(relation.id);
        if (!byId.has(relation.from) || !byId.has(relation.to))
            issue('RELATION_DANGLING', at, 'a relation joins two propositions that exist');
        if (relation.from === relation.to)
            issue('RELATION_SELF', at, 'a relation joins two different propositions');
        if (relation.agent !== null && relation.agent !== relation.from && relation.agent !== relation.to)
            issue('RELATION_AGENT', at, 'the agent is one of the two ends');
        if (!isOneOf(RELATION_CLASSES, relation.class))
            issue('RELATION_CLASS', at, 'unknown relation class');
        if (!isOneOf(RELATION_BACKINGS, relation.backing))
            issue('RELATION_BACKING', at, 'unknown backing');
        if (!isOneOf(RELATION_SALIENCES, relation.salience))
            issue('RELATION_SALIENCE', at, 'unknown salience');
        if (!isOneOf(RELATION_STATUSES, relation.status))
            issue('RELATION_STATUS', at, 'unknown status');
        if ((relation.status === 'differs') !== (relation.class === 'unresolved'))
            issue('RELATION_UNRESOLVED', at, 'a relation on which the sources contradict each other is exactly the one whose class is unresolved');
        if ((relation.status === 'compatible') !== (relation.class === 'mixed'))
            issue('RELATION_MIXED', at, 'a relation whose sources name different but compatible kinds is exactly the one whose class is mixed');
        if (!Array.isArray(relation.native) || relation.native.length === 0)
            issue('RELATION_NATIVE', at, 'a relation keeps the vocabulary it came from');
        else {
            const systems = new Set(relation.native.map((native) => native.system));
            if (relation.status === 'single-source' && systems.size !== 1)
                issue('RELATION_STATUS_SOURCES', at, 'single-source means one system named it');
            if ((relation.status === 'agreed' || relation.status === 'differs' || relation.status === 'compatible') && systems.size < 2)
                issue('RELATION_STATUS_SOURCES', at, `${relation.status} needs at least two systems`);
        }
        /* what is withheld cannot be rebuilt through a relation that points into it */
        for (const end of [relation.from, relation.to]) {
            if (byId.get(end)?.calculation?.determinacy === 'withheld')
                issue('RELATION_WITHHELD', at, `relation touches withheld proposition ${end}`);
        }
    });
}
function checkDiscourse(intent, byId, issue) {
    const plan = intent.discourse;
    if (!plan) {
        issue('MALFORMED', 'discourse', 'missing');
        return;
    }
    const sectionIds = new Set();
    const placed = new Map();
    const earlier = new Set();
    plan.sections.forEach((section, index) => {
        const at = `discourse.sections[${index}]`;
        if (sectionIds.has(section.id))
            issue('SECTION_ID_DUP', at, `duplicate section id ${section.id}`);
        sectionIds.add(section.id);
        if (!isOneOf(DISCOURSE_PURPOSES, section.purpose))
            issue('SECTION_PURPOSE', at, 'unknown purpose');
        if (!Array.isArray(section.budget) || section.budget.length !== 2 || section.budget[0] < 0 || section.budget[0] > section.budget[1])
            issue('BUDGET_INVALID', `${at}.budget`, 'a budget is [min, max] with min <= max');
        const inSection = new Set(section.propositions);
        section.propositions.forEach((id) => {
            const proposition = byId.get(id);
            if (!proposition) {
                issue('SECTION_UNKNOWN_PROP', at, `section names unknown proposition ${id}`);
                return;
            }
            if (placed.has(id))
                issue('SECTION_DUP_PROP', at, `proposition ${id} is placed twice (already in section ${placed.get(id)})`);
            placed.set(id, index);
            if (proposition.disclosure === 'never' || proposition.disclosure === 'internal')
                issue('FORBIDDEN_DISCLOSED', at, `${id} is ${proposition.disclosure} and is placed in a section a reader sees`);
        });
        const relationIds = new Set((intent.relations ?? []).map((relation) => relation.id));
        for (const id of section.relations ?? [])
            if (!relationIds.has(id))
                issue('SECTION_UNKNOWN_RELATION', at, `section names unknown relation ${id}`);
        for (const group of section.merge)
            if (!group.every((id) => inSection.has(id)))
                issue('MERGE_NOT_SUBSET', at, 'a merge group is made of propositions in the same section');
        for (const id of section.told)
            if (!earlier.has(id))
                issue('TOLD_NOT_EARLIER', at, `told names ${id}, which no earlier section has said`);
        section.propositions.forEach((id) => earlier.add(id));
    });
    for (const proposition of byId.values()) {
        if (proposition.disclosure === 'must' && !placed.has(proposition.id))
            issue('MUST_UNCOVERED', 'discourse', `must proposition ${proposition.id} is not placed in any section`);
    }
    const omitted = new Set();
    plan.omitted.forEach((entry, index) => {
        const at = `discourse.omitted[${index}]`;
        if (!byId.has(entry.id))
            issue('OMITTED_UNKNOWN', at, `omits unknown proposition ${entry.id}`);
        if (placed.has(entry.id))
            issue('OMITTED_PLACED', at, `${entry.id} is both placed and omitted`);
        if (!entry.reason)
            issue('OMITTED_REASON', at, 'an omission states its reason');
        omitted.add(entry.id);
    });
    for (const id of byId.keys())
        if (!placed.has(id) && !omitted.has(id))
            issue('UNACCOUNTED', 'discourse', `proposition ${id} is neither placed nor omitted`);
    for (const [index, id] of plan.primary.entries()) {
        const proposition = byId.get(id);
        if (!proposition)
            issue('PRIMARY_UNKNOWN', `discourse.primary[${index}]`, `unknown proposition ${id}`);
        else if (proposition.disclosure !== 'must')
            issue('PRIMARY_NOT_MUST', `discourse.primary[${index}]`, 'a primary proposition is a must');
    }
    if (plan.centralRelation !== null) {
        const relation = (intent.relations ?? []).find((candidate) => candidate.id === plan.centralRelation);
        if (!relation)
            issue('CENTRAL_UNKNOWN', 'discourse.centralRelation', `unknown relation ${plan.centralRelation}`);
        else
            for (const end of [relation.from, relation.to]) {
                if (byId.get(end)?.disclosure !== 'must')
                    issue('CENTRAL_ENDPOINT_NOT_COVERED', 'discourse.centralRelation', `the central relation's end ${end} is not a must proposition`);
            }
    }
    /* the argument relation: chosen, never disputed, and null exactly when nothing is claimed */
    if (!plan.argument || !isOneOf(ARGUMENT_SOURCES, plan.argument.source))
        issue('ARGUMENT_SOURCE', 'discourse.argument', 'the argument names where it comes from');
    else if ((plan.centralRelation === null) !== (plan.argument.source === 'none'))
        issue('ARGUMENT_SOURCE', 'discourse.argument', 'an argument source of none is exactly the case of no central relation');
    if (plan.centralRelation !== null) {
        const chosen = (intent.relations ?? []).find((candidate) => candidate.id === plan.centralRelation);
        if (chosen && chosen.status === 'differs')
            issue('ARGUMENT_DISPUTED', 'discourse.centralRelation', 'the relation a reading is built around is never one on which its sources contradict each other');
    }
    const takeaway = plan.takeaway;
    if (takeaway) {
        const grounding = takeaway.grounding;
        const ends = takeaway.relationTargets ?? [];
        if (!isOneOf(TAKEAWAY_GROUNDINGS, grounding))
            issue('TAKEAWAY_GROUNDING', 'discourse.takeaway.grounding', 'unknown grounding');
        else {
            for (const id of ends)
                if (!byId.has(id))
                    issue('TAKEAWAY_GROUNDING', 'discourse.takeaway.relationTargets', `unknown proposition ${id}`);
            const target = takeaway.target;
            const consistent = grounding === 'none' ? target === null && ends.length === 0
                : grounding === 'place-and-relation' ? target !== null && ends.length === 2 && ends.includes(target)
                    : grounding === 'place' ? target !== null && (ends.length === 0 || !ends.includes(target))
                        : target === null && ends.length === 2;
            if (!consistent)
                issue('TAKEAWAY_GROUNDING', 'discourse.takeaway', `the grounding "${grounding}" does not match the target and the ends of the relation`);
        }
    }
    if (!takeaway || !isOneOf(TAKEAWAY_ACTS, takeaway.act))
        issue('TAKEAWAY_ACT', 'discourse.takeaway.act', 'unknown takeaway act');
    else if (takeaway.act !== 'none') {
        const target = takeaway.target === null ? undefined : byId.get(takeaway.target);
        if (!target)
            issue('TAKEAWAY_TARGET', 'discourse.takeaway.target', 'a takeaway names the proposition it asks the person to take up');
        else if (target.practical === null)
            issue('TAKEAWAY_UNLICENSED', 'discourse.takeaway.target', 'a takeaway act rests on a proposition that licenses advice');
        for (const id of takeaway.groundedIn)
            if (!byId.has(id) && !(intent.relations ?? []).some((relation) => relation.id === id))
                issue('TAKEAWAY_GROUND', 'discourse.takeaway.groundedIn', `grounded in unknown ${id}`);
    }
}
function checkRules(intent, propositions, issue) {
    const rules = intent.rules;
    if (!rules) {
        issue('MALFORMED', 'rules', 'missing');
        return;
    }
    for (const forbidden of rules.forbiddenInferences)
        if (!isOneOf(FORBIDDEN_INFERENCES, forbidden))
            issue('FORBID_UNKNOWN', 'rules.forbiddenInferences', `unknown ${String(forbidden)}`);
    if (!isOneOf(SAFETY_LEVELS, rules.safety?.level))
        issue('SAFETY_LEVEL', 'rules.safety.level', 'unknown safety level');
    if (rules.safety && !rules.safety.drawsCards && propositions.some((proposition) => 'cardId' in (proposition.slots ?? {})))
        issue('SAFETY_CARDS', 'rules.safety', 'a reading that draws no cards carries no card proposition');
    /* a support-first case is never a reading: no cards, nothing said but caveats and the notice, no advice */
    if (rules.safety?.level === 'support-first') {
        if (rules.safety.drawsCards)
            issue('SUPPORT_FIRST_DRAWS', 'rules.safety', 'a support-first case draws no cards');
        for (const proposition of propositions) {
            if (proposition.disclosure !== 'never' && proposition.disclosure !== 'internal' && (proposition.role !== 'caveat' || proposition.practical !== null)) {
                issue('SUPPORT_FIRST_CONTENT', `propositions.${proposition.id}`, 'a support-first case says only caveats: it carries no reading content and no advice');
            }
        }
        if (intent.discourse?.takeaway && intent.discourse.takeaway.act !== 'none')
            issue('SUPPORT_FIRST_TAKEAWAY', 'discourse.takeaway', 'a support-first case asks nothing of the person');
    }
    /* a reading-level prohibition is carried by every proposition that could break it */
    for (const forbidden of rules.forbiddenInferences) {
        if (forbidden === 'domain-transfer')
            continue;
        for (const proposition of propositions) {
            if (proposition.disclosure !== 'never' && proposition.disclosure !== 'internal' && proposition.interpretation?.status === 'symbolic-reading' && !proposition.forbid.includes(forbidden)) {
                issue('FORBID_NOT_CARRIED', `propositions.${proposition.id}.forbid`, `the reading forbids ${forbidden}, and a symbolic proposition that may be said carries it`);
                break;
            }
        }
    }
    for (const entry of rules.withheld)
        if (!entry.key || !entry.reason)
            issue('WITHHELD_REASON', 'rules.withheld', 'a withholding names what and why');
}
function checkConvergence(intent, propositions, issue) {
    const convergence = intent.convergence;
    if (!convergence || convergence.empiricallyConfirmed !== false) {
        issue('EMPIRICAL_CONFIRMATION', 'convergence.empiricallyConfirmed', 'agreement between roots or systems is never empirical confirmation');
        return;
    }
    const expected = summarizeConvergence(propositions, convergence.symbolicAgreement);
    if (convergence.independentRoots !== expected.independentRoots)
        issue('CONVERGENCE_ROOTS', 'convergence.independentRoots', 'the count of independent roots does not match the evidence');
    if (canonicalize(convergence.propositionsPerRoot) !== canonicalize(expected.propositionsPerRoot))
        issue('CONVERGENCE_COUNTS', 'convergence.propositionsPerRoot', 'propositions per root do not match the evidence');
    /* where propositions agree in meaning, the agreement is a fact about two traditions, and no proposition may be worded as if it confirmed the trait */
    if (convergence.symbolicAgreement) {
        for (const proposition of propositions) {
            if (proposition.disclosure === 'never' || proposition.disclosure === 'internal' || proposition.interpretation?.status !== 'symbolic-reading')
                continue;
            for (const needed of ['empirical-confirmation', 'certainty-from-agreement']) {
                if (!proposition.forbid.includes(needed))
                    issue('AGREEMENT_FORBID', `propositions.${proposition.id}.forbid`, `symbolic agreement is recorded, so ${proposition.id} forbids ${needed}`);
            }
        }
    }
}
