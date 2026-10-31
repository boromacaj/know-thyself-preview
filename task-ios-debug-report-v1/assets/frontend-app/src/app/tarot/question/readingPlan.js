import { getTarotCard } from '../data/tarotDeck.js?v=b5ef5ed';
import { orientedSemantics } from '../content/tarotOrientation.js?v=b5ef5ed';
import { ARC_RULES, ENERGY_ROLE, GUIDANCE_ROLE, } from '../content/tarotNarrativePlan.js?v=b5ef5ed';
import { classifyTarotPair, movementFamily, } from '../content/tarotRelations.js?v=b5ef5ed';
import { INTENSITY_RANK } from '../content/tarotSemanticTypes.js?v=b5ef5ed';
import { TAROT_CONTENT_VERSION, getTarotSemantics } from '../content/tarotSemantics.js?v=b5ef5ed';
import { anchorOf } from './questionAnchor.js?v=b5ef5ed';
import { excerptOf } from './questionText.js?v=b5ef5ed';
import { numberSignalOf, readPatterns } from './readingPatterns.js?v=b5ef5ed';
/* ------------------------------------------------------------------ edges -- */
const SALIENCE_RANK = { defining: 2, notable: 1, quiet: 0 };
/**
 * WHICH CARDS ARE READ AGAINST WHICH - the spread's own reading graph.
 *
 * Not a constant. A sequence reads neighbours and the first against the last;
 * self, other and meeting read all three pairs; two options and their criterion
 * read the options against each other and each against the criterion; layers read
 * neighbours and the outer pair. A single card has nothing to read it against.
 */
export function readingGraph(strategy, count) {
    if (strategy === 'single' || count < 2)
        return [];
    if (strategy === 'sequence') {
        const edges = [];
        for (let index = 0; index + 1 < count; index += 1)
            edges.push([index, index + 1]);
        if (count >= 3)
            edges.push([0, count - 1]);
        return edges;
    }
    if (strategy === 'self-other-meeting' || strategy === 'options-criterion')
        return [[0, 1], [0, 2], [1, 2]];
    return [[0, 1], [1, 2], [0, 2]];
}
/* ------------------------------------------------------------ one position -- */
const COURT_FRAMING = {
    other: 'person-or-role',
    embodied: 'part-of-self',
    mental: 'part-of-self',
    meaning: 'part-of-self',
};
function courtFramingOf(fn, strategy, positionId) {
    const fixed = COURT_FRAMING[fn];
    if (fixed)
        return fixed;
    /* In a spread about two sides, the first place is the reader's own. */
    if (strategy === 'self-other-meeting' && positionId === 'self')
        return 'part-of-self';
    return 'way-of-acting';
}
function evidenceOf(fn, framing) {
    if (fn === 'other' || framing === 'person-or-role')
        return 'speculative';
    if (fn === 'origin' || fn === 'direction' || fn === 'resisting' || fn === 'supporting' || fn === 'meaning')
        return 'secondary';
    return 'direct';
}
const isStrained = (card) => card.stability === 'volatile' || card.movement === 'disrupting' || card.movement === 'contracting' || card.agency === 'endure';
/* ------------------------------------------------------------- synthesis -- */
const edgeKey = (edge) => `${edge.from}>${edge.to}`;
function arcOf(cards, edges) {
    const count = cards.length;
    if (count < 3)
        return null;
    const adjacent = (index) => edges.find((edge) => edge.from === index - 1 && edge.to === index);
    /* The turning card is the middle one that acts hardest on its predecessor; for three cards, simply the middle. */
    let turn = 1;
    if (count > 3) {
        let best = -1;
        for (let index = 1; index < count - 1; index += 1) {
            const rank = SALIENCE_RANK[adjacent(index)?.reading.salience ?? 'quiet'];
            if (rank > best) {
                best = rank;
                turn = index;
            }
        }
    }
    const first = cards[0].card;
    const middle = cards[turn].card;
    const last = cards[count - 1].card;
    const ef = classifyTarotPair(cards[0].positionId, cards[turn].positionId, first, middle, { semantic: true });
    const fg = classifyTarotPair(cards[turn].positionId, cards[count - 1].positionId, middle, last, { semantic: true });
    const rule = ARC_RULES.find((candidate) => candidate.test(first, middle, last, ef, fg));
    const arc = rule?.arc ?? 'continuation';
    /*
     * A "one line carried forward" arc over a first step that its own next card pulls against is a
     * contradiction in the reading, not a neutral default. When the two open in opposite directions the
     * shape is a push meeting a pause, or a course turning, and the plan says so.
     */
    if (arc === 'continuation' && ef.relation === 'contrast') {
        return movementFamily(first.movement) === 'outward'
            ? { arc: 'expansion-to-limit', basis: 'the opening pushes out and the next card draws in' }
            : { arc: 'redirection', basis: 'the opening draws in and the next card pushes out' };
    }
    return { arc, basis: rule?.basis ?? 'no rule matched' };
}
const PASSIVE = new Set(['wait', 'observe', 'endure', 'respond']);
const ACTIVE = new Set(['act', 'initiate', 'choose', 'integrate']);
function flowOf(cards) {
    if (cards.length < 3)
        return null;
    const first = cards[0].card;
    const last = cards[cards.length - 1].card;
    const agency = PASSIVE.has(first.agency) && ACTIVE.has(last.agency) ? 'passive-to-active'
        : ACTIVE.has(first.agency) && PASSIVE.has(last.agency) ? 'active-to-passive' : null;
    const focus = first.focus === 'internal' && last.focus === 'external' ? 'inner-to-outer'
        : first.focus === 'external' && last.focus === 'internal' ? 'outer-to-inner' : null;
    const intensity = INTENSITY_RANK[last.intensity] > INTENSITY_RANK[first.intensity] ? 'rising'
        : INTENSITY_RANK[last.intensity] < INTENSITY_RANK[first.intensity] ? 'easing' : null;
    return { agency, focus, intensity };
}
const TURNING = new Set([
    'interruption', 'redirection', 'release', 'answer', 'stabilisation', 'integration', 'exposure',
]);
function themeOf(patterns, cards) {
    if (patterns.total >= 3 && (patterns.majorDensity === 'most' || patterns.majorDensity === 'all'))
        return { kind: 'major-frame' };
    if (patterns.dominantSuit)
        return { kind: 'suit', suit: patterns.dominantSuit };
    const counts = new Map();
    for (const entry of cards)
        counts.set(movementFamily(entry.card.movement), (counts.get(movementFamily(entry.card.movement)) ?? 0) + 1);
    const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]);
    if (ranked.length > 0 && cards.length >= 3 && ranked[0][1] > (ranked[1]?.[1] ?? 0) && ranked[0][1] * 2 > cards.length) {
        return { kind: 'movement', family: ranked[0][0] };
    }
    return { kind: 'mixed' };
}
const dimensionsOf = (a, b, ai, bi) => {
    const out = [];
    const steady = (card) => card.stability === 'stable';
    if (steady(a.card) !== steady(b.card))
        out.push({ dimension: 'steadiness', first: steady(a.card) ? ai : bi, second: steady(a.card) ? bi : ai });
    const forceGap = INTENSITY_RANK[a.card.intensity] - INTENSITY_RANK[b.card.intensity];
    if (Math.abs(forceGap) >= 1)
        out.push({ dimension: 'force', first: forceGap > 0 ? ai : bi, second: forceGap > 0 ? bi : ai });
    const fa = movementFamily(a.card.movement);
    const fb = movementFamily(b.card.movement);
    if ((fa === 'outward' && fb === 'inward') || (fa === 'inward' && fb === 'outward')) {
        out.push({ dimension: 'energy', first: fa === 'outward' ? ai : bi, second: fa === 'outward' ? bi : ai });
    }
    if (a.card.focus !== 'mixed' && b.card.focus !== 'mixed' && a.card.focus !== b.card.focus) {
        out.push({ dimension: 'focus', first: a.card.focus === 'internal' ? ai : bi, second: a.card.focus === 'internal' ? bi : ai });
    }
    return out;
};
function alignmentOf(reading) {
    if (reading.opposing.length > 0)
        return 'opposed';
    if (reading.shared.length >= 2)
        return 'aligned';
    if (['stabilisation', 'answer', 'integration', 'release', 'exposure', 'softening'].includes(reading.relation))
        return 'complementary';
    return 'apart';
}
function synthesize(strategy, cards, edges, patterns) {
    const find = (from, to) => edges.find((edge) => edge.from === from && edge.to === to);
    const arcResult = strategy === 'sequence' ? arcOf(cards, edges) : null;
    const ordered = [...edges].sort((left, right) => SALIENCE_RANK[right.reading.salience] - SALIENCE_RANK[left.reading.salience]
        || (left.to - left.from) - (right.to - right.from) || left.from - right.from);
    /*
     * Between two options (or two forces) the relationship the reading turns on is THEIR contrast. The
     * criterion card's relation to either one is never the hinge: a criterion that "settles" the first
     * option would read as a verdict in its favour, which this spread does not give.
     */
    const hinge = strategy === 'options-criterion'
        ? find(0, 1) ?? null
        : strategy === 'self-other-meeting'
            ? find(0, 1) ?? null
            : (ordered[0] ?? null);
    /* Tensions and agreements are read between the cards the strategy compares: for two options, those two. */
    const compared = strategy === 'options-criterion' ? edges.filter((edge) => edge.from === 0 && edge.to === 1) : edges;
    const tensions = ordered
        .filter((edge) => compared.includes(edge))
        .filter((edge) => (edge.reading.opposing.length > 0 || edge.reading.relation === 'contrast')
        && edge.reading.salience !== 'quiet')
        .slice(0, 2);
    const reinforcement = [...compared]
        .filter((edge) => edge.reading.shared.length >= 2 && edge.reading.opposing.length === 0)
        .sort((a, b) => b.reading.shared.length - a.reading.shared.length)[0] ?? null;
    const turningPoint = strategy === 'sequence' || strategy === 'layers'
        ? ordered.filter((edge) => TURNING.has(edge.reading.relation) && edge.reading.salience !== 'quiet')[0] ?? null
        : null;
    const strained = cards.filter((entry) => entry.strained)
        .sort((a, b) => INTENSITY_RANK[b.card.intensity] - INTENSITY_RANK[a.card.intensity] || a.index - b.index);
    const cost = strained[0]?.index ?? null;
    /* The place the practical thread comes from: a response if there is one, else the factor the matter turns on. */
    const pick = (fn) => cards.find((entry) => entry.fn === fn);
    const responseCard = pick('response') ?? pick('criterion') ?? pick('meeting') ?? pick('meaning') ?? pick('focus')
        ?? cards[cards.length - 1];
    /* Once a course has turned partway, an active last card changes the line rather than pressing on along it. */
    let responseRole = responseCard ? responseCard.responseRole : null;
    if (responseRole === 'continue' && arcResult?.arc === 'redirection')
        responseRole = 'redirect';
    let meeting = null;
    if (strategy === 'self-other-meeting' && cards.length === 3) {
        const selfOther = find(0, 1);
        meeting = { alignment: alignmentOf(selfOther.reading), selfOther, toSelf: find(0, 2), toOther: find(1, 2) };
    }
    let contrast = null;
    if (strategy === 'options-criterion' && cards.length === 3) {
        const edge = find(0, 1);
        contrast = {
            kind: cards[0].fn === 'option' ? 'options' : 'forces',
            edge,
            tradeoffs: dimensionsOf(cards[0], cards[1], 0, 1),
            alike: edge.reading.shared,
            criterionIndex: 2,
        };
    }
    let layers = null;
    if (strategy === 'layers' && cards.length === 3) {
        const rank = (entry) => (entry.card.stability === 'stable' ? 2 : entry.card.stability === 'transforming' ? 1 : 0);
        const bySteadiness = [...cards].sort((a, b) => rank(b) - rank(a) || a.index - b.index);
        const steadyKinds = new Set(cards.map((entry) => (entry.card.stability === 'stable' ? 'stable' : 'other')));
        const forces = cards.map((entry) => INTENSITY_RANK[entry.card.intensity]);
        layers = {
            steadiest: bySteadiness[0].index,
            strained: strained[0]?.index ?? null,
            even: steadyKinds.size === 1 && Math.max(...forces) - Math.min(...forces) <= 1,
        };
    }
    return {
        strategy,
        primaryTheme: themeOf(patterns, cards),
        arc: arcResult?.arc ?? null,
        arcBasis: arcResult?.basis ?? null,
        flow: strategy === 'sequence' ? flowOf(cards) : null,
        hinge,
        tensions,
        reinforcement,
        turningPoint,
        cost,
        responseIndex: responseCard ? responseCard.index : null,
        responseRole,
        meeting,
        contrast,
        layers,
    };
}
/* ----------------------------------------------------------------- build -- */
/**
 * The plan for one drawn spread, or null when it cannot be built: the draw does
 * not match the spread, a card repeats, or a card has no model at this content
 * version. Never throws - a reading stored under an older deck must degrade.
 */
export function buildQuestionReadingPlan(intent, selection, drawn, options = {}) {
    const spread = selection.spread;
    if (selection.status !== 'ready' || !spread || selection.mode === null)
        return null;
    if (drawn.length !== spread.positions.length)
        return null;
    if (drawn.some((card, index) => card.positionId !== spread.positions[index].id))
        return null;
    if (new Set(drawn.map((card) => card.cardId)).size !== drawn.length)
        return null;
    const strategy = spread.synthesisStrategy;
    const interpretations = [];
    for (let index = 0; index < drawn.length; index += 1) {
        const position = spread.positions[index];
        const entry = drawn[index];
        const card = getTarotCard(entry.cardId);
        const semantics = getTarotSemantics(entry.cardId);
        if (!card || !semantics)
            return null;
        const oriented = orientedSemantics(semantics, entry.orientation);
        const isCourt = card.arcana === 'minor' && (card.rank === 'page' || card.rank === 'knight' || card.rank === 'queen' || card.rank === 'king');
        const courtFraming = isCourt ? courtFramingOf(position.fn, strategy, position.id) : null;
        interpretations.push({
            index,
            positionId: position.id,
            fn: position.fn,
            cardId: entry.cardId,
            orientation: entry.orientation,
            card: oriented,
            arcana: card.arcana,
            suit: card.suit ?? null,
            rank: card.rank ?? null,
            courtFraming,
            numberSignal: numberSignalOf(card),
            stateRole: ENERGY_ROLE[oriented.direction],
            responseRole: GUIDANCE_ROLE[oriented.agency],
            trend: oriented.movement,
            stance: oriented.relational,
            steadiness: oriented.stability,
            evidence: evidenceOf(position.fn, courtFraming),
            strained: isStrained(oriented),
            incoming: null,
        });
    }
    const edges = readingGraph(strategy, interpretations.length).map(([from, to]) => ({
        from,
        to,
        reading: classifyTarotPair(interpretations[from].positionId, interpretations[to].positionId, interpretations[from].card, interpretations[to].card, { semantic: true }),
    }));
    /* The relation that arrives at a place: the strongest edge ending there that earns a sentence. */
    const withIncoming = interpretations.map((entry) => {
        const arriving = edges
            .filter((edge) => edge.to === entry.index && !(strategy === 'sequence' && edge.from === 0 && edge.to === interpretations.length - 1 && interpretations.length > 2))
            .sort((a, b) => SALIENCE_RANK[b.reading.salience] - SALIENCE_RANK[a.reading.salience] || b.from - a.from)[0];
        /* The factor a choice turns on is read against both options at once, and a relation to one of them would lean the reading. */
        const neutral = strategy === 'options-criterion' && entry.index === 2;
        return { ...entry, incoming: !neutral && arriving && arriving.reading.salience !== 'quiet' ? arriving : null };
    });
    const patterns = readPatterns(drawn.map((card) => card.cardId), withIncoming.map((entry) => entry.card));
    if (!patterns)
        return null;
    const excerpt = selection.safety.quoteQuestion && intent.normalizedQuestion.length > 0
        ? excerptOf(intent.normalizedQuestion, 140) : null;
    return {
        contentVersion: TAROT_CONTENT_VERSION,
        question: {
            excerpt,
            category: intent.category,
            secondary: intent.secondaryCategories,
            form: intent.questionForm,
            guidance: intent.desiredGuidance,
            entities: intent.entities,
            anchor: options.ground === false || selection.safety.level !== 'standard' ? null : anchorOf(intent),
        },
        spread: { id: spread.id, mode: selection.mode, basedOn: selection.basedOn, because: selection.because, strategy, origin: spread.origin },
        safety: selection.safety,
        cards: withIncoming,
        edges,
        patterns,
        synthesis: synthesize(strategy, withIncoming, edges, patterns),
    };
}
export { edgeKey };
