import { interpretReading, planDelivery, variantOf, } from './readerInterpretation.js';
const ref = (edge) => ({ from: edge.from, to: edge.to, relation: edge.reading.relation, salience: edge.reading.salience });
const DOMAIN_OF = {
    relationship: 'relating', career: 'working', creativity: 'creating',
    emotional: 'inner', spiritual: 'inner', 'self-development': 'inner',
};
const WORK_ROLES = new Set(['boss', 'colleague']);
export function domainGroupOf(plan) {
    const { category, secondary, entities } = plan.question;
    /* A question about a boss or a colleague is a question about work, whatever else it also is. */
    if (entities.some((entity) => WORK_ROLES.has(entity)))
        return 'working';
    const direct = DOMAIN_OF[category];
    if (direct)
        return direct;
    for (const entry of secondary) {
        const found = DOMAIN_OF[entry];
        if (found)
            return found;
    }
    if (entities.some((entity) => WORK_ROLES.has(entity)))
        return 'working';
    if (entities.length > 0)
        return 'relating';
    return 'general';
}
/* ---------------------------------------------------------------- framing -- */
function framingClauses(plan, interpretation, delivery) {
    const clauses = [
        { k: 'ask', excerpt: plan.question.excerpt },
        { k: 'why', spreadId: plan.spread.id, mode: plan.spread.mode, category: plan.question.category },
    ];
    /* A question asked to be answered yes or no is answered by what supports it, what works against it and what it turns on. */
    if (plan.question.form === 'yes-no' && plan.spread.strategy !== 'options-criterion' && plan.spread.id !== 'steadying-reflection') {
        clauses.push({ k: 'yes-no-note' });
    }
    /* A question that takes something for granted that no card can confirm is read without taking it for granted. */
    if (interpretation.uncertainties.includes('assumption'))
        clauses.push({ k: 'assumption-note' });
    if (plan.question.anchor)
        clauses.push({ k: 'anchor-note', subject: plan.question.anchor.subject });
    if (plan.patterns.reversedCount > 0) {
        clauses.push({ k: 'reversal-note', reversed: plan.patterns.reversedCount, total: plan.patterns.total });
    }
    const { opening } = delivery;
    if (opening.focus !== 'plain') {
        clauses.push({
            k: 'opening', focus: opening.focus, a: opening.a, b: opening.b, tone: delivery.tone,
            plain: delivery.directness === 'plain', v: variantOf(delivery.seed, 1, 3),
        });
    }
    return clauses;
}
/* -------------------------------------------------------------- positions -- */
/**
 * The relations a short lead-in can honestly claim. `reinforcement`, `softening` and `continuation` are left out: they
 * are found by comparing dimensions, and "this says the same thing again" is a claim about meaning that a comparison
 * of dimensions cannot always carry. They are said, where they are strong enough, by the spread-wide findings instead.
 */
const LINKABLE = new Set([
    'interruption', 'stabilisation', 'escalation', 'redirection', 'release', 'integration', 'exposure', 'answer', 'contrast',
]);
function positionClauses(plan, index, delivery) {
    const entry = plan.cards[index];
    const contrast = plan.synthesis.contrast?.kind ?? null;
    const clauses = [];
    /*
     * HOW THIS CARD ARRIVES. A card that changes the reading is introduced by one short sentence that says
     * so before it speaks - "The next card complicates this" - and only for a relation worth a sentence.
     * The defining relation of the whole spread is said in full after the card instead, so it is never both.
     */
    const incoming = entry.incoming;
    if (incoming && incoming.reading.salience === 'notable' && LINKABLE.has(incoming.reading.relation)) {
        clauses.push({ k: 'link', i: index, relation: incoming.reading.relation, final: index === plan.cards.length - 1, v: variantOf(delivery.seed, 50 + index, 3) });
    }
    clauses.push({ k: 'lead', i: index, p: entry.positionId, fn: entry.fn, contrast: entry.fn === 'criterion' ? contrast : null });
    if (entry.card.reversalMode)
        clauses.push({ k: 'mode', i: index });
    if (entry.courtFraming && entry.rank)
        clauses.push({ k: 'court', i: index, framing: entry.courtFraming, rank: entry.rank, v: variantOf(delivery.seed, 70 + index, 3) });
    /* A card's own section says how it relates to the one before it in full only when that relation is the defining one. */
    if (incoming && incoming.reading.salience === 'defining') {
        clauses.push({ k: 'relation', i: index, edge: ref(incoming), v: variantOf(delivery.seed, 10 + index, 3) });
    }
    return clauses;
}
/* -------------------------------------------------------------- synthesis -- */
/* 'stance' and 'agency' are left out: "they differ in how they treat the people around them" is a statement about the model, not about the reading. */
const DIMENSION_NAMES = ['direction', 'movement', 'focus', 'stability'];
/** The dimensions both lists name, in the model's own order, so the voice can say them in a fixed one. */
const ordered = (dimensions) => DIMENSION_NAMES.filter((name) => dimensions.includes(name));
/**
 * THE SECONDARY FINDINGS, MOST INFORMATIVE FIRST.
 *
 * A reading can say a few of these and no more, so the order is the decision: a frame made wider by
 * Major Arcana, a number that repeats or runs, a pair of elements that pull against or feed each
 * other, a spread of court cards. The ABSENCE of Major Arcana is real but says least, so it goes last.
 * When the reading has already opened on the weight of its Major Arcana, it does not say it twice.
 */
function patternClauses(plan, limit, delivery) {
    const p = plan.patterns;
    const found = [];
    if (p.total >= 3 && (p.majorDensity === 'all' || p.majorDensity === 'most') && delivery.opening.focus !== 'weight') {
        found.push({ k: 'major-density', density: p.majorDensity, majors: p.majorCount, total: p.total });
    }
    if (p.repeatedRanks[0])
        found.push({ k: 'rank-repeat', rank: p.repeatedRanks[0].rank, indexes: p.repeatedRanks[0].indexes });
    /* Two numbers that happen to be neighbours are not a run: it takes three cards to build or to wind down. */
    if (p.numberRun && p.numberRun.indexes.length >= 3) {
        found.push({
            k: 'number-run', direction: p.numberRun.direction, indexes: p.numberRun.indexes,
            signals: p.numberRun.indexes.map((index) => plan.cards[index].numberSignal).filter((signal) => signal !== null),
        });
    }
    /* Two cards of the suit that already leads are of course of one element; saying so a second time adds nothing. */
    /* Only the pairs of elements that say something: two that pull against each other, or two that nourish each other. "Fire and air feed each other" is not a finding. */
    const element = p.elements.find((finding) => finding.kind !== 'reinforcing');
    if (element)
        found.push({ k: 'element', kind: element.kind, elements: element.elements, indexes: element.indexes });
    if (p.courtLevel === 'several' || p.courtLevel === 'all')
        found.push({ k: 'court-level', level: p.courtLevel, indexes: p.courtIndexes });
    if (p.total >= 3 && p.majorDensity === 'none')
        found.push({ k: 'major-density', density: 'none', majors: 0, total: p.total });
    if (p.absentSuits.length > 0)
        found.push({ k: 'absent-suits', suits: p.absentSuits });
    if (p.themeEchoes.length > 0)
        found.push({ k: 'echo' });
    return found.slice(0, limit);
}
function themeClause(plan) {
    const theme = plan.synthesis.primaryTheme;
    if (theme.kind === 'suit') {
        return { k: 'theme-suit', suit: theme.suit, group: domainGroupOf(plan), count: plan.patterns.suitCounts[theme.suit], total: plan.patterns.total };
    }
    if (theme.kind === 'movement')
        return { k: 'theme-movement', family: theme.family };
    return null;
}
/** Kinds of insight that already say where the cards disagree, so the synthesis does not say it a second time. */
const SAYS_THE_CONTRADICTION = new Set(['gap', 'late-turn', 'self-other', 'options', 'forces']);
const edgeKey = (edge) => `${edge.from}>${edge.to}`;
function synthesisClauses(plan, interpretation, delivery) {
    const s = plan.synthesis;
    if (s.strategy === 'single')
        return [];
    const clauses = [];
    /* One sentence about how the movement runs is worth saying beside other findings, and no section is worth opening for it alone. */
    let flow = null;
    const insight = interpretation.insight.kind;
    const shown = new Set(plan.cards.flatMap((entry) => (entry.incoming && entry.incoming.reading.salience === 'defining' ? [edgeKey(entry.incoming)] : [])));
    const last = plan.cards.length - 1;
    if (s.strategy === 'sequence') {
        /* The arc says where the cards start and end. When the takeaway already says it, with the cards' own words, saying it here too is the same sentence twice. */
        if (s.arc && insight === 'plain') {
            clauses.push({ k: 'arc', arc: s.arc, first: 0, last });
            clauses.push({ k: 'arc-ask', arc: s.arc });
        }
        if (s.flow) {
            const flows = [];
            if (s.flow.agency)
                flows.push({ k: 'flow', kind: 'agency', value: s.flow.agency });
            if (s.flow.focus)
                flows.push({ k: 'flow', kind: 'focus', value: s.flow.focus });
            if (s.flow.intensity && flows.length === 0)
                flows.push({ k: 'flow', kind: 'intensity', value: s.flow.intensity });
            flow = flows[0] ?? null;
        }
        const saysLittle = s.hinge !== null && (s.hinge.reading.relation === 'continuation' || s.hinge.reading.relation === 'reinforcement') && s.hinge.reading.salience !== 'defining';
        if (s.hinge && !shown.has(edgeKey(s.hinge)) && s.hinge.reading.salience !== 'quiet' && !saysLittle && !SAYS_THE_CONTRADICTION.has(insight)) {
            clauses.push({ k: 'hinge', edge: ref(s.hinge), v: variantOf(delivery.seed, 30, 3) });
        }
        /* When the hinge IS the turning point, saying where the turn comes says nothing the hinge has not said. */
        const hingeSaid = clauses.some((clause) => clause.k === 'hinge');
        const turnAlreadySaid = s.turningPoint !== null && (shown.has(edgeKey(s.turningPoint)) || (hingeSaid && s.hinge !== null && s.hinge.from === s.turningPoint.from && s.hinge.to === s.turningPoint.to));
        if (s.turningPoint && !turnAlreadySaid && !SAYS_THE_CONTRADICTION.has(insight)) {
            clauses.push({ k: 'turn', edge: ref(s.turningPoint) });
        }
    }
    if (s.strategy === 'self-other-meeting' && s.meeting) {
        /* The finding about the two sides is said once, as the insight; what the bond does to each side is said here. */
        const sayings = plan.cards[2].incoming && plan.cards[2].incoming.reading.salience === 'defining' ? edgeKey(plan.cards[2].incoming) : null;
        const fresh = [s.meeting.toSelf, s.meeting.toOther].filter((edge) => edge.reading.salience !== 'quiet' && edgeKey(edge) !== sayings
            && edge.reading.relation !== 'continuation' && edge.reading.relation !== 'reinforcement');
        if (fresh.length > 0)
            clauses.push({ k: 'meeting-acts', meeting: 2, edges: fresh.map(ref) });
    }
    if (s.strategy === 'options-criterion' && s.contrast) {
        for (const tradeoff of s.contrast.tradeoffs.slice(0, 2)) {
            clauses.push({ k: 'tradeoff', dimension: tradeoff.dimension, first: tradeoff.first, second: tradeoff.second });
        }
        /* "They are alike in" needs something to be alike in: the dimensions the Reader does not name leave nothing to say. */
        const alike = ordered(s.contrast.alike);
        if (alike.length > 0)
            clauses.push({ k: 'alike', dimensions: alike });
    }
    if (s.strategy === 'layers' && s.layers) {
        clauses.push({ k: 'layers', steadiest: s.layers.steadiest, strained: s.layers.strained, even: s.layers.even });
        if (s.turningPoint)
            clauses.push({ k: 'turn', edge: ref(s.turningPoint) });
    }
    /* Disagreement is kept, not smoothed: it is often the most informative thing the cards say. */
    const said = new Set();
    const tradeoffsSaid = s.strategy === 'options-criterion' && (s.contrast?.tradeoffs.length ?? 0) > 0;
    if (!tradeoffsSaid && !SAYS_THE_CONTRADICTION.has(insight)) {
        for (const tension of interpretation.contradictions) {
            const dimensions = ordered(tension.reading.opposing);
            const key = dimensions.join('+') || tension.reading.relation;
            if (said.has(key))
                continue;
            said.add(key);
            clauses.push({ k: 'tension', edge: ref(tension), dimensions, v: variantOf(delivery.seed, 40, 2) });
        }
    }
    const theme = themeClause(plan);
    /* A lean towards one movement would contradict a reading whose point is that the cards pull apart. */
    const leansWouldContradict = theme?.k === 'theme-movement' && (SAYS_THE_CONTRADICTION.has(insight) || flow !== null);
    if (theme && s.strategy !== 'options-criterion' && !leansWouldContradict)
        clauses.push(theme);
    clauses.push(...patternClauses(plan, 2, delivery));
    if (flow && clauses.length > 0)
        clauses.unshift(flow);
    return clauses;
}
/* --------------------------------------------------------------- takeaway -- */
function takeawayClauses(plan, interpretation, delivery) {
    const clauses = [];
    const { insight } = interpretation;
    /* The most important thing the spread says. A single card has said it in its own section; the question it poses is the takeaway. */
    if (insight.kind !== 'single' && insight.kind !== 'plain') {
        clauses.push({
            k: 'insight', kind: insight.kind, focus: insight.focus, tone: delivery.tone, v: variantOf(delivery.seed, 99, 3),
            alignment: plan.synthesis.meeting?.alignment ?? null,
            shape: delivery.shape, subject: plan.question.anchor?.subject ?? null, lead: delivery.lead,
        });
    }
    if (delivery.reflection !== null)
        clauses.push({ k: 'card-question', i: delivery.reflection });
    /* A takeaway is never empty: a reading with nothing left to conclude still ends on the question its answering card poses. */
    if (clauses.length === 0)
        clauses.push({ k: 'card-question', i: plan.synthesis.responseIndex ?? plan.cards.length - 1 });
    return clauses;
}
export function buildReadingDocument(plan, interpretation = interpretReading(plan), delivery = planDelivery(plan, interpretation)) {
    const sections = [{ id: 'framing', clauses: framingClauses(plan, interpretation, delivery) }];
    for (const entry of plan.cards) {
        sections.push({ id: `position:${entry.positionId}`, index: entry.index, clauses: positionClauses(plan, entry.index, delivery) });
    }
    const synthesis = synthesisClauses(plan, interpretation, delivery);
    if (synthesis.length > 0)
        sections.push({ id: 'synthesis', clauses: synthesis });
    sections.push({ id: 'takeaway', clauses: takeawayClauses(plan, interpretation, delivery) });
    return { sections };
}
