import { getTarotCard } from '../../tarot/data/tarotDeck.js?v=d9f39e7';
import { TAROT_DECK_ID, TAROT_DECK_SCHEMA_VERSION } from '../../tarot/tarotTypes.js?v=d9f39e7';
import { digestOf } from '../contract/canonical.js?v=d9f39e7';
import { sealIntent, summarizeConvergence } from '../contract/readingIntent.js?v=d9f39e7';
import { READING_INTENT_CONTRACT_VERSION, modalityRank, } from '../contract/readingIntentTypes.js?v=d9f39e7';
/**
 * THE TAROT READING INTENT: WHAT THE CARDS MEAN IN THIS READING, READ FROM THE CANONICAL ENGINE AND DECIDED BEFORE ANY LANGUAGE.
 *
 * This adapter is READ-ONLY. It takes what the canonical Tarot engine already produced (the cards drawn and the way up of each, the spread and its places, the language-free reading plan,
 * the Reader's own interpretation and the document of clause kinds it wrote, the question analysis, the safety decision) and writes it down in the one shape every pillar uses. It computes
 * no relation, ranks no card, runs no second question classifier and edits nothing under `src/app/tarot`: a proposition's slots are fields the engine already holds, a relation is one the
 * plan's classifier already named, a restriction is one the safety policy already made. Where the engine does not hold a fact (see UNAVAILABLE) the intent says so and does not guess.
 *
 * WHAT BECOMES OF EACH PART:
 *   per card, per place   a `tarot.card-in-place` proposition: the draw (determined), the way up and the reversal mode, the place, the card's dimensions in that way up, the plan's roles
 *                         for the place and its own evidence level, which sets how firmly the reading may be worded (a symbolic reading is never above a tendency)
 *   between two cards     one relation per edge of the plan's reading graph, in the plan's own twelve-relation vocabulary, kept as the native name beside a coarse class
 *   the argument          the plan's hinge (else its first tension, else none) and the response place
 *   the takeaway          an INTENT: what the response place invites, only where that place may carry advice
 *   what may be said      the Reader's own prohibitions and uncertainties, and the safety decision (standard, bounded or support-first) with the notices the policy shows
 *
 * SAFETY IS NEVER SOFTENED INTO A READING. A support-first question draws no cards: its intent carries the policy's notice and a withheld "no reading" notice, no card, no advice, and
 * `tarotReadingStatus` says `none`. A bounded question keeps the policy's notices, does not carry a digest of the question and withholds the subject. A renderer that asks
 * `tarotReadingStatus(intent) !== 'none'` cannot present a support-first case as a reading, and the validator refuses a support-first intent that draws cards or says anything but a caveat.
 *
 * LANGUAGE AND PRIVACY. Nothing here reads a voice, a section's text, a title or the quoted excerpt of the question, so English and Slovak give the same intent byte for byte, and the
 * person's own words cannot enter it. The question appears only as a digest (standard readings), as a count of nothing, or not at all (bounded, support-first).
 */
/* ------------------------------------------------------------------ vocabulary -- */
export const TAROT_KIND_DAILY = 'tarot-daily';
export const TAROT_KIND_QUESTION = 'tarot-question';
export const TAROT_KIND_SINGLE_CARD = 'tarot-single-card';
export const TAROT_KIND_SUPPORT_FIRST = 'tarot-support-first';
export const TAROT_KINDS = [TAROT_KIND_DAILY, TAROT_KIND_QUESTION, TAROT_KIND_SINGLE_CARD, TAROT_KIND_SUPPORT_FIRST];
/** What the canonical question analysis does not expose, recorded in every question intent (`rules.withheld`) instead of being inferred. */
export const UNAVAILABLE_QUESTION_FIELDS = [
    { key: 'question-focus', reason: 'not-exposed-by-the-canonical-question-analysis' },
    { key: 'question-context', reason: 'not-exposed-by-the-canonical-question-analysis' },
    { key: 'question-sphere', reason: 'not-exposed-by-the-canonical-question-analysis' },
    { key: 'question-text', reason: 'the-persons-words-never-enter-an-intent' },
];
/** How the plan's twelve pair relations read at the coarse grain of the contract. A comparison grain, not a new doctrine. */
const RELATION_CLASS = {
    interruption: 'friction', stabilisation: 'resolution', escalation: 'causal', softening: 'accord', reinforcement: 'accord', redirection: 'sequence',
    release: 'resolution', integration: 'resolution', exposure: 'causal', answer: 'resolution', contrast: 'friction', continuation: 'sequence',
};
/** Relations in which neither card acts on the other. For the rest, `from -> to` reads "the second ... the first" (B breaks into what A had settled), so the agent is the second. */
const MUTUAL = new Set(['contrast', 'reinforcement']);
/** The wording strength the plan's own evidence level licenses (readingPlan `Evidence`: "decides how hedged the sentence is"). */
const MODALITY_OF_EVIDENCE = { direct: 'tendency', secondary: 'tentative', speculative: 'possibility' };
const TAKEAWAY_ROLES = new Set(['continue', 'redirect', 'let-go', 'moderate', 'meet-it', 'wait', 'choose', 'integrate', 'attend-to-it']);
/** The subjects a card reading has no standing to diagnose: the policy's notice for each says so. */
const HEALTH_FLAGS = new Set(['medical', 'medical-treatment', 'pregnancy', 'death', 'distress', 'self-harm']);
const READING_LEVEL_PROHIBITIONS = new Set(['private-thoughts', 'event-prediction', 'person-identified', 'assumption-as-fact', 'verdict']);
const ROOT_DRAW = 'tarot:draw';
const ROOT_QUESTION = 'tarot:question';
const ROOT_POLICY = 'tarot:safety-policy';
const rootSemantics = (contentVersion) => `tarot:semantics@${contentVersion}`;
const cardId = (index) => `card-${index}`;
const relationId = (from, to) => `rel-${from}-${to}`;
/** Fixed, locale-free bounds for a renderer's sentences per section: they must not depend on a language's text, or the two languages would not share a digest. */
const BUDGET = { notice: [1, 4], framing: [1, 3], card: [2, 5], jumper: [1, 3], synthesis: [2, 5], takeaway: [1, 3], limit: [1, 2] };
export class TarotIntentError extends Error {
}
const structural = (id, frame, role, rank, slots, meaningKey, evidence, forbid = []) => ({
    id, pillar: 'tarot', frame, slots, role, disclosure: 'must', rank,
    calculation: { determinacy: 'determined', adequacy: 'full' },
    interpretation: { status: 'structural-observation', scope: 'structure', modality: 'assert', ceiling: 'assert', conditions: [] },
    valence: 'neutral', applicableDomains: 'any', facets: [], evidence, independenceGroup: evidence[0].root, forbid: [...forbid], practical: null, meaningKey,
});
function cardProposition(spec, a, rank, role) {
    const deckCard = getTarotCard(spec.cardId);
    const otherPerson = spec.evidence === 'speculative' || spec.fn === 'other' || spec.courtFraming === 'person-or-role';
    const future = spec.fn === 'direction' || spec.fn === 'option';
    const scope = otherPerson ? 'other-person' : future ? 'future' : 'situation';
    const ceiling = otherPerson ? 'tentative' : 'tendency';
    const wanted = MODALITY_OF_EVIDENCE[spec.evidence];
    const modality = modalityRank(wanted) > modalityRank(ceiling) ? ceiling : wanted;
    const forbid = new Set(a.forbidden);
    if (otherPerson)
        forbid.add('private-thoughts');
    if (spec.courtFraming === 'person-or-role')
        forbid.add('person-identified');
    if (future)
        forbid.add('event-prediction');
    const o = spec.oriented;
    const isResponse = spec.index === a.responseIndex && a.responseRole !== null && TAKEAWAY_ROLES.has(a.responseRole);
    /* advice needs a claim of at least tentative strength about the person's own situation */
    const licensed = modalityRank(modality) >= modalityRank('tentative') && scope !== 'other-person';
    /* advice is carried only where the Reader itself is at its plainest: a bounded reading keeps the policy's limits and carries no advice intent at all */
    const mayAdvise = licensed && a.safety.level === 'standard';
    return {
        id: cardId(spec.index),
        pillar: 'tarot',
        frame: 'tarot.card-in-place',
        slots: {
            index: spec.index, positionId: spec.positionId, positionFn: spec.fn, cardId: spec.cardId, orientation: spec.orientation, reversalMode: o.reversalMode,
            arcana: deckCard?.arcana ?? null, suit: deckCard?.suit ?? null, rank: deckCard?.rank ?? null, courtFraming: spec.courtFraming,
            direction: o.direction, agency: o.agency, movement: o.movement, stability: o.stability, intensity: o.intensity, focus: o.focus, temporal: o.temporal, relational: o.relational,
            evidenceLevel: spec.evidence, strained: spec.strained, ...spec.extraSlots,
        },
        role,
        disclosure: 'must',
        rank,
        calculation: { determinacy: 'determined', adequacy: 'full' },
        interpretation: { status: 'symbolic-reading', scope, modality, ceiling, conditions: [] },
        valence: spec.strained ? 'cost' : 'neutral',
        applicableDomains: 'any',
        facets: [],
        evidence: [
            { source: 'tarot.draw', path: `drawn[${spec.index}]`, root: ROOT_DRAW },
            { source: 'tarot.reading-plan', path: `cards[${spec.index}]`, root: rootSemantics(a.contentVersion) },
        ],
        independenceGroup: `tarot:card:${spec.index}`,
        forbid: [...forbid].sort(),
        practical: isResponse && mayAdvise ? { intent: a.responseRole, licensedBy: [cardId(spec.index)] } : null,
        meaningKey: `tarot.face:${spec.cardId}:${spec.orientation}`,
    };
}
function assemble(a) {
    const propositions = [];
    const sections = [];
    const omitted = [];
    const told = [];
    const policyEvidence = (path) => [{ source: 'tarot.safety-policy', path, root: ROOT_POLICY }];
    const placed = (section) => {
        sections.push({ ...section, told: [...told] });
        told.push(...section.propositions);
    };
    /* the safety notices the policy shows beside a reading, or instead of one */
    if (a.notices.length > 0) {
        const ids = a.notices.map((flag, i) => {
            const id = `notice-${i}`;
            propositions.push(structural(id, 'tarot.safety.notice', 'caveat', 1, { flag, level: a.safety.level }, `tarot.safety.notice:${flag}`, policyEvidence(`notices[${i}]`), a.forbidden));
            return id;
        });
        placed({ id: 'notice', purpose: 'limit', propositions: ids, relations: [], merge: [], budget: [...BUDGET.notice] });
    }
    /* a policy that draws no cards: the reading is withheld, in so many words, and nothing else is said */
    if (!a.safety.drawsCards) {
        propositions.push({
            id: 'reading-withheld', pillar: 'tarot', frame: 'tarot.safety.no-reading', slots: { reason: 'support-first' }, role: 'caveat', disclosure: 'must', rank: 1,
            calculation: { determinacy: 'withheld', adequacy: 'insufficient' },
            interpretation: { status: 'structural-observation', scope: 'structure', modality: 'withheld', ceiling: 'assert', conditions: [] },
            valence: 'neutral', applicableDomains: 'any', facets: [], evidence: policyEvidence('drawsCards'), independenceGroup: ROOT_POLICY, forbid: [...a.forbidden], practical: null,
            meaningKey: 'tarot.safety.no-reading:support-first',
        });
        placed({ id: 'no-reading', purpose: 'limit', propositions: ['reading-withheld'], relations: [], merge: [], budget: [...BUDGET.limit] });
    }
    if (a.framing) {
        const ids = ['framing'];
        propositions.push(structural('framing', 'tarot.framing.spread', 'context', 3, a.framing.slots, `tarot.framing:${String(a.framing.slots.spreadId)}`, [{ source: 'tarot.question-analysis', path: 'intent', root: ROOT_QUESTION }, { source: 'tarot.reading-plan', path: 'spread', root: rootSemantics(a.contentVersion) }]));
        if (a.framing.yesNo) {
            ids.push('limit-yes-no');
            propositions.push(structural('limit-yes-no', 'tarot.limit.yes-no', 'caveat', 2, { form: 'yes-no' }, 'tarot.limit:yes-no', [{ source: 'tarot.reading-document', path: 'framing', root: ROOT_QUESTION }]));
        }
        if (a.framing.assumption) {
            ids.push('limit-assumption');
            propositions.push(structural('limit-assumption', 'tarot.limit.assumption', 'caveat', 2, { uncertainty: 'assumption' }, 'tarot.limit:assumption', [{ source: 'tarot.reading-document', path: 'framing', root: ROOT_QUESTION }]));
        }
        placed({ id: 'framing', purpose: 'ground', propositions: ids, relations: [], merge: [], budget: [...BUDGET.framing] });
    }
    /* relations: one per edge of the plan's reading graph */
    const relations = a.edges.map((edge) => ({
        id: edge.id,
        from: edge.from,
        to: edge.to,
        class: RELATION_CLASS[edge.reading.relation] ?? 'mixed',
        salience: edge.reading.salience,
        backing: 'derived',
        agent: MUTUAL.has(edge.reading.relation) ? null : edge.to,
        native: [{ system: 'tarot.plan', kind: edge.reading.relation, backed: true }],
        status: 'single-source',
    }));
    const idOfPair = (pair) => {
        if (!pair)
            return null;
        const found = a.edges.find((edge) => edge.ends !== null && edge.ends[0] === pair[0] && edge.ends[1] === pair[1]);
        return found ? found.id : null;
    };
    /* the argument: the plan's hinge, else its first tension, else none */
    const hingeId = idOfPair(a.hinge);
    const tensionId = a.tensions.length > 0 ? idOfPair(a.tensions[0]) : null;
    const argumentId = hingeId ?? tensionId;
    const argumentSource = hingeId ? 's1-hinge' : tensionId ? 's1-tension' : 'none';
    const argumentEnds = hingeId ? a.hinge : tensionId ? a.tensions[0] : null;
    /* importance: the ends of the argument are what the reading is about; the plan's other findings make a card secondary */
    const primary = new Set(argumentEnds ? [argumentEnds[0], argumentEnds[1]] : a.responseIndex !== null ? [a.responseIndex] : a.cards.length > 0 ? [0] : []);
    const secondary = new Set([...a.tensions.flat(), ...(a.reinforcement ?? []), ...(a.responseIndex !== null ? [a.responseIndex] : [])]);
    const rankOf = (index) => (primary.has(index) ? 1 : secondary.has(index) ? 2 : 3);
    const roleOf = (index) => (primary.has(index) ? 'thesis' : index === a.responseIndex ? 'practice' : a.cost === index ? 'tension' : 'support');
    const cardPropositions = a.cards.map((spec) => cardProposition(spec, a, rankOf(spec.index), roleOf(spec.index)));
    for (const proposition of cardPropositions) {
        propositions.push(proposition);
        placed({ id: proposition.id, purpose: 'develop', propositions: [proposition.id], relations: [], merge: [], budget: [...BUDGET.card] });
    }
    if (a.jumper) {
        const spec = a.jumper.spec;
        propositions.push({
            id: 'jumper', pillar: 'tarot', frame: 'tarot.jumper', role: 'exception', disclosure: 'must', rank: 2, valence: 'neutral', applicableDomains: 'any', facets: [],
            slots: { cardId: spec.cardId, orientation: spec.orientation, reversalMode: spec.oriented.reversalMode, relation: a.jumper.relation, direction: spec.oriented.direction, agency: spec.oriented.agency, movement: spec.oriented.movement, stability: spec.oriented.stability, intensity: spec.oriented.intensity },
            calculation: { determinacy: 'determined', adequacy: 'full' },
            interpretation: { status: 'symbolic-reading', scope: 'situation', modality: 'tentative', ceiling: 'tentative', conditions: [] },
            evidence: [{ source: 'tarot.draw', path: 'jumper', root: ROOT_DRAW }, { source: 'tarot.reading-plan', path: 'jumper', root: rootSemantics(a.contentVersion) }],
            independenceGroup: 'tarot:jumper', forbid: [...a.forbidden], practical: null, meaningKey: `tarot.face:${spec.cardId}:${spec.orientation}`,
        });
        placed({ id: 'jumper', purpose: 'develop', propositions: ['jumper'], relations: [], merge: [], budget: [...BUDGET.jumper] });
    }
    /* what the Reader decided about delivery: informs order, is never named, and is accounted for as an omission */
    for (const item of a.internal) {
        propositions.push({
            ...structural(item.id, item.frame, 'context', 3, item.slots, `${item.frame}:${item.id}`, [{ source: 'tarot.reading-plan', path: item.id, root: rootSemantics(a.contentVersion) }]),
            disclosure: 'internal',
        });
        omitted.push({ id: item.id, reason: item.why });
    }
    /* the synthesis says how the cards relate; it says no card again */
    if (a.cards.length > 1) {
        sections.push({ id: 'synthesis', purpose: 'synthesis', propositions: [], relations: argumentId ? [argumentId] : [], merge: [], budget: [...BUDGET.synthesis], told: [...told] });
    }
    /* the takeaway: what the response place invites, only where that card may carry advice */
    const response = a.responseIndex === null ? null : cardPropositions[a.responseIndex] ?? null;
    const responseTarget = response && response.practical !== null ? response.id : null;
    const act = responseTarget && a.responseRole !== null && TAKEAWAY_ROLES.has(a.responseRole) ? a.responseRole : 'none';
    const takeTarget = act === 'none' ? null : responseTarget;
    const relationTargets = argumentEnds ? argumentEnds.map(cardId) : [];
    const grounding = takeTarget === null ? (argumentEnds ? 'relation' : 'none') : argumentEnds && relationTargets.includes(takeTarget) ? 'place-and-relation' : 'place';
    const takeaway = {
        act,
        target: takeTarget,
        relationTargets,
        grounding,
        relationMode: null,
        relationTarget: null,
        groundedIn: [hingeId, tensionId].filter((id) => id !== null).filter((id, i, all) => all.indexOf(id) === i),
        constraints: [...a.forbidden, ...a.uncertainties.map((u) => `uncertain:${u}`)].sort(),
        legacy: null,
    };
    if (a.safety.drawsCards)
        sections.push({ id: 'takeaway', purpose: 'practice', propositions: [], relations: [], merge: [], budget: [...BUDGET.takeaway], told: takeTarget ? [takeTarget] : [] });
    const primaryIds = a.safety.drawsCards ? [...primary].sort((x, y) => x - y).map(cardId) : a.notices.length > 0 ? ['notice-0'] : ['reading-withheld'];
    const body = {
        /* the lowest contract version that can express it: 1.0.0, because the canonical analysis exposes no question focus (see UNAVAILABLE_QUESTION_FIELDS) */
        contract: READING_INTENT_CONTRACT_VERSION,
        pillar: 'tarot',
        kind: a.kind,
        intelligence: { engine: 'tarot-canonical-plan', contentVersion: a.contentVersion, deck: TAROT_DECK_ID },
        context: a.context,
        propositions,
        relations,
        discourse: {
            primary: primaryIds,
            centralRelation: argumentId,
            argument: argumentId
                ? { source: argumentSource, note: argumentSource === 's1-hinge' ? 'the plan\'s hinge: the relationship the reading is built around' : 'the plan\'s first tension' }
                : { source: 'none', note: 'the plan names no hinge and no tension: no relation is claimed' },
            sections,
            omitted,
            takeaway,
        },
        rules: { forbiddenInferences: [...a.forbidden], uncertainties: [...a.uncertainties], safety: { level: a.safety.level, flags: [...a.safety.flags], drawsCards: a.safety.drawsCards }, withheld: [...a.withheld] },
        convergence: summarizeConvergence(propositions, false),
        extension: {
            deck: { id: TAROT_DECK_ID, schema: TAROT_DECK_SCHEMA_VERSION },
            contentVersion: a.contentVersion,
            ...a.extension,
            cards: a.cards.map((spec) => ({ index: spec.index, proposition: cardId(spec.index), positionId: spec.positionId, cardId: spec.cardId, orientation: spec.orientation })),
            jumper: a.jumper ? { cardId: a.jumper.spec.cardId, orientation: a.jumper.spec.orientation, relation: a.jumper.relation } : null,
            findings: a.findings,
        },
    };
    return sealIntent(body);
}
/* ---------------------------------------------------------------- a question -- */
const pairOf = (edge) => (edge ? [edge.from, edge.to] : null);
function forbiddenOf(prohibited, flags) {
    const out = new Set();
    for (const item of prohibited)
        if (READING_LEVEL_PROHIBITIONS.has(item))
            out.add(item);
    for (const flag of [...prohibited, ...flags])
        if (HEALTH_FLAGS.has(flag))
            out.add('diagnosis');
    return [...out].sort();
}
const specOfQuestionCard = (card) => ({
    index: card.index, positionId: card.positionId, fn: card.fn, cardId: card.cardId, orientation: card.orientation, oriented: card.card, courtFraming: card.courtFraming,
    evidence: card.evidence, strained: card.strained,
    extraSlots: { stateRole: card.stateRole, responseRole: card.responseRole, trend: card.trend, stance: card.stance, steadiness: card.steadiness },
});
/**
 * The intent of a question reading: standard, bounded or support-first, as the canonical safety policy decided. `source.reading` is what `composeQuestionReading` returned, or null
 * exactly when the policy draws no cards. The question is read only to be digested (standard readings) and to say whether one was asked; it is not stored.
 */
export function buildTarotQuestionReadingIntent(source) {
    const { intent, selection, reading } = source;
    const policy = selection.safety;
    const questionContext = (digest, anchor) => ({
        subject: 'self',
        question: {
            anchor, context: 'unavailable', sphere: 'unavailable', category: intent.category, secondary: [...intent.secondaryCategories], form: intent.questionForm, guidance: intent.desiredGuidance, textDigest: digest,
        },
    });
    if (!policy.drawsCards || selection.status === 'blocked') {
        if (policy.level !== 'support-first')
            throw new TarotIntentError(`a selection that draws no cards must be support-first, not ${policy.level}`);
        if (reading !== null)
            throw new TarotIntentError('a support-first selection has no reading: nothing was drawn to read');
        return assemble({
            kind: TAROT_KIND_SUPPORT_FIRST, context: questionContext(null, null), cards: [], jumper: null, edges: [], hinge: null, tensions: [], reinforcement: null, turningPoint: null,
            responseIndex: null, responseRole: null, cost: null, forbidden: forbiddenOf([], policy.flags), uncertainties: [],
            safety: { level: policy.level, flags: policy.flags, drawsCards: false }, notices: [...policy.notices], framing: null, internal: [],
            withheld: [...UNAVAILABLE_QUESTION_FIELDS, { key: 'reading', reason: 'support-first-policy-draws-no-cards' }],
            contentVersion: 0,
            extension: { readingStatus: 'none', spread: { id: 'none', mode: null, basedOn: null, because: selection.because, strategy: null, origin: null, positions: [] } },
            findings: { arc: null, hinge: null, tensions: [], reinforcement: null, turningPoint: null, responseIndex: null, responseRole: null, cost: null, closingQuestion: null, tone: null, insight: null, shape: null, reversedCount: 0, majorCount: 0 },
        });
    }
    if (reading === null || selection.spread === null)
        throw new TarotIntentError('a selection that draws cards needs the composed reading');
    const plan = reading.plan;
    if (plan.spread.id !== selection.spread.id || plan.safety.level !== policy.level)
        throw new TarotIntentError('the reading is not the one the selection describes');
    const spread = selection.spread;
    const cards = plan.cards.map(specOfQuestionCard);
    const edges = plan.edges.map((edge) => ({ id: relationId(edge.from, edge.to), from: cardId(edge.from), to: cardId(edge.to), reading: edge.reading, ends: [edge.from, edge.to] }));
    const framingClauses = reading.document.sections.find((section) => section.id === 'framing')?.clauses ?? [];
    const synthesis = plan.synthesis;
    const standard = policy.level === 'standard';
    const hasQuestion = intent.normalizedQuestion.length > 0;
    return assemble({
        kind: spread.positions.length === 1 ? TAROT_KIND_SINGLE_CARD : TAROT_KIND_QUESTION,
        context: questionContext(standard && hasQuestion ? digestOf(intent.normalizedQuestion) : null, plan.question.anchor ? plan.question.anchor.subject : null),
        cards, jumper: null, edges,
        hinge: pairOf(synthesis.hinge), tensions: synthesis.tensions.map((edge) => [edge.from, edge.to]), reinforcement: pairOf(synthesis.reinforcement), turningPoint: pairOf(synthesis.turningPoint),
        responseIndex: synthesis.responseIndex, responseRole: synthesis.responseRole, cost: synthesis.cost,
        forbidden: forbiddenOf(reading.interpretation.prohibited, policy.flags),
        uncertainties: [...reading.interpretation.uncertainties].sort(),
        safety: { level: policy.level, flags: policy.flags, drawsCards: true },
        notices: [...policy.notices],
        framing: {
            slots: { spreadId: spread.id, strategy: plan.spread.strategy, mode: plan.spread.mode, category: plan.question.category, form: plan.question.form, guidance: plan.question.guidance, hasQuestion },
            yesNo: framingClauses.some((clause) => clause.k === 'yes-no-note'), assumption: framingClauses.some((clause) => clause.k === 'assumption-note'),
        },
        internal: [
            { id: 'reading-tone', frame: 'tarot.reading.tone', slots: { tone: reading.interpretation.tone, shape: reading.delivery.shape, directness: reading.delivery.directness, emotionalWeight: reading.delivery.emotionalWeight }, why: 'internal: the Reader\'s decision about how the spread is delivered; informs wording and is not a claim about the person' },
            { id: 'reading-insight', frame: 'tarot.reading.insight', slots: { kind: reading.interpretation.insight.kind, focus: [...reading.interpretation.insight.focus], relation: reading.interpretation.insight.relation }, why: 'internal: the form of the most important thing the spread says; the cards\' own stakes fill it' },
            ...(synthesis.arc ? [{ id: 'reading-arc', frame: 'tarot.reading.arc', slots: { arc: synthesis.arc }, why: 'internal: the shape of a sequence; informs order and is never named' }] : []),
        ],
        withheld: [...UNAVAILABLE_QUESTION_FIELDS],
        contentVersion: plan.contentVersion,
        extension: {
            readingStatus: standard ? 'normal' : 'bounded',
            spread: { id: spread.id, mode: plan.spread.mode, basedOn: plan.spread.basedOn, because: plan.spread.because, strategy: spread.synthesisStrategy, origin: spread.origin, positions: spread.positions.map((position) => ({ id: position.id, fn: position.fn })) },
        },
        findings: {
            arc: synthesis.arc, hinge: pairOf(synthesis.hinge), tensions: synthesis.tensions.map((edge) => [edge.from, edge.to]), reinforcement: pairOf(synthesis.reinforcement),
            turningPoint: pairOf(synthesis.turningPoint), responseIndex: synthesis.responseIndex, responseRole: synthesis.responseRole, cost: synthesis.cost,
            closingQuestion: reading.document.sections.find((section) => section.id === 'takeaway')?.clauses.find((clause) => clause.k === 'card-question')?.i ?? null,
            tone: reading.interpretation.tone, insight: reading.interpretation.insight.kind, shape: reading.delivery.shape, reversedCount: plan.patterns.reversedCount, majorCount: plan.patterns.majorCount,
        },
    });
}
/* ------------------------------------------------------------------- the daily -- */
const DAILY_PLACES = ['energy', 'factor', 'guidance'];
/** The daily reading: three cards in the places the day's spread has, read by the narrative plan the daily composer builds. */
export function buildTarotDailyReadingIntent(reading) {
    const plan = reading.plan;
    const oriented = [plan.energy.card, plan.factor.card, plan.guidance.card];
    const roles = [plan.energy.role, plan.factor.role, plan.guidance.role];
    const indexOfPlace = (name) => {
        const index = DAILY_PLACES.indexOf(name);
        if (index < 0)
            throw new TarotIntentError(`unknown daily place ${name}`);
        return index;
    };
    const cards = oriented.map((card, index) => ({
        index, positionId: DAILY_PLACES[index], fn: null, cardId: plan.cardIds[index], orientation: card.orientation, oriented: card, courtFraming: null, evidence: 'direct', strained: false,
        extraSlots: { placeRole: roles[index] },
    }));
    const endsOf = (pair) => [indexOfPlace(pair.from), indexOfPlace(pair.to)];
    const edges = plan.pairs.map((pair) => { const ends = endsOf(pair); return { id: relationId(ends[0], ends[1]), from: cardId(ends[0]), to: cardId(ends[1]), reading: pair, ends }; });
    const jumperPlan = plan.jumper;
    const jumperSpec = jumperPlan ? {
        index: 3, positionId: 'jumper', fn: null, cardId: jumperPlan.cardId, orientation: jumperPlan.card.orientation, oriented: jumperPlan.card, courtFraming: null, evidence: 'direct', strained: false, extraSlots: {},
    } : null;
    if (jumperPlan) {
        edges.push({ id: 'rel-jumper-0', from: 'jumper', to: cardId(0), reading: jumperPlan.toEnergy, ends: null });
        edges.push({ id: 'rel-jumper-2', from: 'jumper', to: cardId(2), reading: jumperPlan.toGuidance, ends: null });
    }
    const costIndex = plan.cost === null ? null : oriented.findIndex((card) => card.id === plan.cost.id);
    const tension = plan.tension ? endsOf(plan.tension) : null;
    const findings = {
        arc: plan.arc, hinge: endsOf(plan.primaryPair), tensions: tension ? [tension] : [], reinforcement: plan.reinforcement ? endsOf(plan.reinforcement) : null, turningPoint: null,
        responseIndex: 2, responseRole: plan.guidance.role, cost: costIndex === null || costIndex < 0 ? null : costIndex, closingQuestion: null, tone: null, insight: null, shape: null,
        reversedCount: oriented.filter((card) => card.orientation === 'reversed').length, majorCount: plan.cardIds.filter((id) => getTarotCard(id)?.arcana === 'major').length,
    };
    return assemble({
        kind: TAROT_KIND_DAILY, context: { subject: 'self', question: null }, cards, jumper: jumperSpec && jumperPlan ? { spec: jumperSpec, relation: jumperPlan.relation } : null, edges,
        hinge: findings.hinge, tensions: findings.tensions, reinforcement: findings.reinforcement, turningPoint: null, responseIndex: 2, responseRole: plan.guidance.role, cost: findings.cost,
        forbidden: ['event-prediction', 'verdict'], uncertainties: [], safety: { level: 'standard', flags: [], drawsCards: true }, notices: [], framing: null,
        internal: [{ id: 'reading-arc', frame: 'tarot.reading.arc', slots: { arc: plan.arc }, why: 'internal: the shape of the three cards; informs order and is never named' }],
        withheld: [], contentVersion: plan.contentVersion,
        extension: { readingStatus: 'normal', spread: { id: 'daily', mode: null, basedOn: null, because: 'daily-three-card', strategy: 'sequence', origin: null, positions: DAILY_PLACES.map((id) => ({ id, fn: null })) } },
        findings,
    });
}
/* ------------------------------------------------------------------- readiness -- */
/**
 * Whether a renderer may write a reading from this intent. `none` is a case the policy answers with a notice instead of a reading (support-first): the intent carries no card, no advice and a
 * withheld "no reading" notice, and it must never be handed to a generator or a renderer as a normal reading. It is derived from the intent's own safety rules, not from a field a caller sets.
 */
export function tarotReadingStatus(intent) {
    if (intent.pillar !== 'tarot')
        throw new TarotIntentError(`not a Tarot intent: ${intent.pillar}`);
    const safety = intent.rules.safety;
    if (safety.level === 'support-first' || !safety.drawsCards)
        return 'none';
    return safety.level === 'bounded' ? 'bounded' : 'normal';
}
/** The relation vocabulary of the plan, for tests and for the evidence tooling. */
export const TAROT_RELATION_CLASS = RELATION_CLASS;
