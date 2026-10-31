import { TAROT_VOICE_EN } from '../content/tarotVoiceEn.js';
import { listPhrase, upperFirst } from '../content/tarotVoice.js';
import { choose, HOLDS_ITS_OWN_CONNECTIVE, inline, LONG_PAIR, lowerMidArticle, relationSentence, relationWeight, stagesSentence } from '../content/tarotDiscourseEn.js';
import { claimOf, reversalClarification } from '../content/tarotCoherenceEn.js';
import { TAROT_REVERSED_ASKS_EN, TAROT_RISKS_EN } from '../content/reader/readerReversedStakesEn.js';
import { variantOf } from './readerInterpretation.js';
import { anchorLead } from './questionAnchor.js';
/** A quoted question that already ends on its own mark is not closed with a second full stop. */
const stop = (quoted) => (/[?!…]$/.test(quoted.trim()) ? "" : ".");
/**
 * A QUESTION READING IN ENGLISH.
 *
 * Every table below is keyed on something the plan decided, and every sentence renders one clause.
 * What each card says in its place is not here: it is the card's own authored line
 * (content/reader), and this file only puts those lines among the sentences that relate the cards.
 *
 * Nothing here predicts: a position that looks ahead says where something tends if the present
 * dynamic continues, another person is only ever offered as how their part can look from here, and
 * a reading never closes by talking about itself. Where a sentence could be said in more than one
 * way without changing what it means, the wording is chosen by a number derived from the cards
 * (never a clock), so a reading is stable and two readings do not all sound the same.
 */
/** Where a card sits, said so that it can follow the card's name ("The Hanged Man, as the response, ..."). */
const WHERE_FN = {
    origin: 'from earlier', state: '', direction: 'at the end', response: 'as the response', driver: '',
    other: 'on the other side', meeting: 'between you', criterion: 'in what it turns on', supporting: 'in what supports it',
    resisting: 'in what works against it', embodied: 'in practical life', mental: 'in mind and feeling', meaning: '',
};
/** A card as the discourse layer wants it: its name, what it puts forward (a bare noun phrase) and where it sits. */
function discourseCard(c, index, withPlace = true) {
    const card = c.plan.cards[index];
    return {
        name: c.title(index),
        thing: c.stake(index),
        where: withPlace ? WHERE_FN[card.fn] ?? '' : '',
        semantics: card.card,
        reversed: card.orientation === 'reversed',
    };
}
const ledgers = new WeakMap();
const ledgerOf = (c) => {
    let ledger = ledgers.get(c);
    if (ledger === undefined) {
        ledger = { texts: [], edges: new Set(), lastKind: '', lastText: '', synthesisFrom: 0 };
        ledgers.set(c, ledger);
    }
    return ledger;
};
/**
 * WHETHER A BUILD MAY BE SAID.
 *
 * "Gaining force" is not said where a pair between two of the cards breaks into the spread or clashes with it: the sentences that say the break are in
 * the same reading, and the layers must not disagree (tarotCoherenceEn.ts). The movement itself is said with the cards' own phrases and claims no shape.
 */
function mayClaimContinuity(c) {
    return !c.plan.edges.some((edge) => claimOf({ relation: edge.reading.relation, opposing: edge.reading.opposing, basis: edge.reading.basis, salience: edge.reading.salience }, discourseCard(c, edge.from), discourseCard(c, edge.to)) !== null);
}
/** Clauses that sit in the synthesis, where two sentences in a row about the same card are one thought and the second says "It". */
const SYNTHESIS_KINDS = new Set(['hinge', 'turn', 'tension', 'agree', 'meeting-acts', 'tradeoff', 'alike', 'flow', 'arc', 'arc-ask', 'theme-suit', 'theme-movement', 'major-density', 'absent-suits', 'rank-repeat', 'number-run', 'court-level', 'element', 'layers', 'neutrality']);
/**
 * A SENTENCE ABOUT TWO CARDS, SAID ONCE PER READING.
 *
 * The finding that matters most, the place where the spread turns and a disagreement can be the same pair of cards, and a pair is not said again in
 * another wording. A sentence about the card that the previous clause was about continues it ("It ...").
 */
function saidOnce(edge, c, salt) {
    const ledger = ledgerOf(c);
    const key = `${edge.from}>${edge.to}`;
    if (ledger.edges.has(key))
        return '';
    /* A card's own phrase is said once in a synthesis: a second pair that would quote it again says nothing. */
    const recent = ledger.texts.slice(ledger.synthesisFrom).join(' ');
    if ([c.stake(edge.from), c.stake(edge.to)].some((stake) => recent.includes(stake)))
        return '';
    const continues = SYNTHESIS_KINDS.has(ledger.lastKind) && ledger.lastText.startsWith(c.title(edge.to));
    const text = pairSentence(edge, c, salt, continues, false);
    if (text !== '')
        ledger.edges.add(key);
    return text;
}
/** What two cards mean together, said for these two cards in their places. Never names the relation. */
function pairText(edge, c, salt = '', continuesCard = false) {
    return pairSentence(edge, c, salt, continuesCard, false);
}
/** The same, with `inFull` saying both cards' phrases even where an earlier edge has already said the second card's. For a summary. */
function pairSentence(edge, c, salt, continuesCard, inFull, summary = false) {
    /* A reversed card that merely follows the one before it has nothing to add: its own paragraph has said what it is. */
    if (edge.relation === 'stabilisation' && c.plan.cards[edge.to].orientation === 'reversed')
        return '';
    const reading = c.plan.edges.find((candidate) => candidate.from === edge.from && candidate.to === edge.to)?.reading;
    /* Two edges that end at the same card: the second does not quote that card's phrase again. */
    const repeatsSecond = !inFull && c.plan.edges.some((candidate) => candidate.to === edge.to && candidate.from < edge.from);
    return relationSentence({ relation: edge.relation, opposing: reading?.opposing ?? [], basis: reading?.basis, salience: reading?.salience }, discourseCard(c, edge.from, !summary), discourseCard(c, edge.to, !summary), { use: 'plain', salt, repeatsSecond, forceStakes: inFull, subject: continuesCard ? 'it' : 'name' });
}
/** A sentence without its cards' names and without a leading "It": two sentences with the same signature say the same thing about different words for the same cards. */
const TITLE_PATTERN = new RegExp(`(?:the )?(?:${Object.values(TAROT_VOICE_EN.cardTitles).map((title) => title.replace(/^The /, '')).sort((x, y) => y.length - x.length).join('|')})(?: reversed)?`, 'gi');
/* Where a card sits ("as the response", "at the end") is not what is said about it. */
const WHERE_PATTERN = new RegExp(`, (?:${Object.values(WHERE_FN).filter((place) => place.length > 0).join('|')}),`, 'g');
const signature = (text) => text.toLowerCase().replace(TITLE_PATTERN, ' ').replace(WHERE_PATTERN, ' ').replace(/^\s*it\s+/, ' ').replace(/\s+/g, ' ').trim();
/**
 * Whether this sentence has been said earlier in the reading: the same sentence, the same one with a card's name for "It", or the same one with
 * only its end changed after a colon. A summary does not say again what an earlier section has already said.
 */
function alreadySaid(c, candidate) {
    const earlier = ledgerOf(c).texts.flatMap((text) => text.split(/(?<=[.!?])\s+/)).map(signature);
    const mine = signature(candidate);
    return earlier.some((text) => text === mine || (text.includes(':') && mine.includes(':') && text.split(':')[0] === mine.split(':')[0]));
}
/**
 * THE MOST INFORMATIVE THING THE CARDS SAY TO ONE ANOTHER, for a summary that has room for one.
 *
 * Among the pairs inside `indexes`, the one whose relation asserts the most about what changes (a change of focus, a break, a turn, a release, an
 * answer) and says it in full. A pair that only follows another says nothing and is never chosen, so a summary built on this has no sentence that
 * is only the order of the spread. Returns null when no pair has anything to say.
 */
function movementOf(c, indexes, salt) {
    let best = null;
    for (const edge of c.plan.edges) {
        if (!indexes.includes(edge.from) || !indexes.includes(edge.to))
            continue;
        const pair = { relation: edge.reading.relation, opposing: edge.reading.opposing, basis: edge.reading.basis, salience: edge.reading.salience };
        const span = edge.to - edge.from;
        /* A pair that skips the middle card says a little less about the whole than two that are next to each other. */
        const weight = relationWeight(pair, discourseCard(c, edge.from), discourseCard(c, edge.to)) - (span > 1 ? 1 : 0);
        if (weight < 2)
            continue;
        if (best !== null && (weight < best.weight || (weight === best.weight && (edge.to < best.to || (edge.to === best.to && span >= best.span)))))
            continue;
        const text = [salt, `${salt}-b`, `${salt}-c`, `${salt}-d`, `${salt}-e`, `${salt}-f`]
            /* A summary does not say where each card sat: its own paragraph did, and a repeated "as the response" is a repeated run of words. */
            .map((variant) => pairSentence({ from: edge.from, to: edge.to, relation: edge.reading.relation }, c, variant, false, true, true))
            /* ...nor says it again in the same frame: a sentence that starts the same way as one already said (up to its colon) is the same sentence with the end changed. */
            .find((candidate) => candidate !== '' && !alreadySaid(c, candidate));
        if (text === undefined)
            continue;
        best = { text, to: edge.to, weight, span };
    }
    return best === null ? null : { text: best.text, to: best.to, weight: best.weight };
}
/** Three cards that move through a beginning, a stretch of work and a culmination (see stagesSentence). */
function stagesOf(c, indexes) {
    return indexes.length < 3 ? null : stagesSentence(indexes.slice(0, 3).map((index) => discourseCard(c, index)));
}
/** A sentence that follows a lead-in starts in lower case, unless it starts on a card's name. */
const LOWERS = /^(?:The|A|An|It|What|Where|If|Read|From|After|With|Both|Each|Two (?!of )|There|On|Of|In|This|Neither|One|Support|Before|Notice|Whichever|Nothing|Here|Once|Taken|Between|Across|Not|That|Where)\b/;
const lowerLead = (text) => (LOWERS.test(text) ? lowerFirst(text) : text);
const RANK_NAME = {
    ace: 'ace', two: 'two', three: 'three', four: 'four', five: 'five', six: 'six', seven: 'seven', eight: 'eight', nine: 'nine', ten: 'ten',
    page: 'page', knight: 'knight', queen: 'queen', king: 'king',
};
const RANK_PLURAL = {
    ace: 'aces', two: 'twos', three: 'threes', four: 'fours', five: 'fives', six: 'sixes', seven: 'sevens', eight: 'eights', nine: 'nines', ten: 'tens',
    page: 'pages', knight: 'knights', queen: 'queens', king: 'kings',
};
const RANK_THEME = {
    ace: 'beginnings', two: 'choices and pairings', three: 'growth and expression', four: 'structure and holding',
    five: 'friction', six: 'adjustment and moving on', seven: 'testing and assessment', eight: 'movement and refinement',
    nine: 'intensity near the end of a cycle', ten: 'completion and what comes after it',
    page: 'learning', knight: 'pursuit', queen: 'inner mastery', king: 'outward responsibility',
};
const SUIT_NAME = { wands: 'Wands', cups: 'Cups', swords: 'Swords', pentacles: 'Pentacles' };
const SUIT_AREA = { wands: 'drive', cups: 'feeling', swords: 'thought', pentacles: 'material things' };
const SUIT_DOMAIN = {
    wands: {
        relating: 'desire and initiative in how you meet each other',
        working: 'drive and initiative at work',
        creating: 'the spark and the will to begin',
        inner: 'energy and ambition',
        general: 'drive and initiative',
    },
    cups: {
        relating: 'feeling and closeness',
        working: 'the human side of the work',
        creating: 'what the work is feeling its way towards',
        inner: 'feeling and receptivity',
        general: 'feeling and connection',
    },
    swords: {
        relating: 'what is said and not said between you',
        working: 'decisions and communication',
        creating: 'ideas and judgement',
        inner: 'thinking and judgement',
        general: 'thought, truth and decision',
    },
    pentacles: {
        relating: 'what is built and shared in practice',
        working: 'concrete work and resources',
        creating: 'craft, form and what can actually be made',
        inner: 'the body, habits and what is solid',
        general: 'material reality and what can be built',
    },
};
const DIMENSION_LINE = {
    direction: 'the stage they are at',
    movement: 'the way they lean',
    focus: 'whether they look inward or outward',
    stance: 'how they treat the people around them',
    stability: 'how steady they are',
    agency: 'what they ask of you',
};
const WHY = {
    'one-card-reflection': 'One card is enough for a question like this: it asks you to look at one thing.',
    'past-present-future': 'It asks where something is going, so the cards are read as an influence from earlier, the present condition, and the direction it tends in.',
    'situation-action-outcome': 'It asks what to do, so the cards are read as the situation, the response that fits it, and where that response tends to lead.',
    'problem-cause-solution': 'It asks why something keeps happening, so the cards are read as the visible difficulty, the dynamic underneath it, and a constructive response.',
    'self-other-relationship': 'It is about a relationship, so the cards are read as your part, how the other side can look from here, and what is between you.',
    'option-a-b-guidance': 'It is a choice between two things, so the cards read what each one holds and what the choice actually turns on, without picking a winner.',
    'body-mind-spirit': 'It is a question about the whole picture, so the cards are read as the practical side, the mind and feeling, and what it is about underneath.',
    'steadying-reflection': 'This is a question a card reading cannot settle, so the cards are read for how you stand toward it, what makes it heavy, and what can steady you.',
    'support-resistance-key': 'It asks about an outcome that no card can promise, so the cards are read for what supports it, what works against it, and what it turns on.',
    'blind-spot-view': 'It asks what may be out of view, so the cards are read as what is already seen, what may be outside it, and what would change once it is seen.',
    'resources-view': 'It asks what you can draw on, so the cards are read as what you already carry, what else is available, and where it could be used.',
};
const FLOW = {
    'agency:passive-to-active': 'The spread moves from waiting towards doing.',
    'agency:active-to-passive': 'The spread moves from doing towards receiving and waiting.',
    'focus:inner-to-outer': 'What starts inwardly ends up in the open.',
    'focus:outer-to-inner': 'What starts in the open ends up turned inward.',
    'intensity:rising': 'The weight of it builds towards the end.',
    'intensity:easing': 'The weight of it eases towards the end.',
};
const THEME_MOVEMENT = {
    outward: 'Overall the cards lean outward, towards action.',
    steadying: 'Overall the cards lean towards settling.',
    inward: 'Overall the cards lean inward, towards holding back.',
    turning: 'Overall the cards lean towards a change of course.',
};
const ELEMENT_WORD = { fire: 'fire', water: 'water', air: 'air', earth: 'earth' };
function elementLine(kind, elements) {
    const [left, right] = elements;
    if (kind === 'reinforcing') {
        return left === right
            ? `Two of the cards share the element of ${ELEMENT_WORD[left]}, which gives that quality extra weight.`
            : `${upperFirst(ELEMENT_WORD[left])} and ${ELEMENT_WORD[right]} feed each other here, which stirs that quality up.`;
    }
    if (kind === 'nourishing')
        return `${upperFirst(ELEMENT_WORD[left])} and ${ELEMENT_WORD[right]} nourish each other here: feeling and practical ground support one another.`;
    const mixed = [left, right].sort().join('|');
    return mixed === 'air|earth'
        ? 'Air and earth work in different modes here: the conceptual and the practical do not quite meet.'
        : `${upperFirst(ELEMENT_WORD[left])} and ${ELEMENT_WORD[right]} are both in play, and they can steady each other or cancel each other out.`;
}
const plain = (items) => listPhrase(items, 'and');
const NUMBER_WORD = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const countWord = (value) => NUMBER_WORD[value] ?? String(value);
const dims = (keys) => plain(keys.map((key) => DIMENSION_LINE[key] ?? key));
const REFLECT = {
    continue: 'What would keeping going look like if it were chosen rather than carried on by habit?',
    redirect: 'Which part of the current line is worth keeping, and which is only momentum?',
    'let-go': 'What is the holding protecting, and what would putting it down cost?',
    moderate: 'Where would a lighter touch change what actually happens?',
    'meet-it': 'What would meeting this directly look like, and what does working around it gain?',
    wait: 'What is there to notice while nothing is being done?',
    choose: 'What is the choice still being left open, and what is it waiting for?',
    integrate: 'Which parts of this pull against each other, and what would let them sit together?',
    'attend-to-it': 'What has not yet been looked at closely enough?',
};
/* ------------------------------------------------------------ a position -- */
/** What a place that decides something is called, before the card that fills it is introduced. */
function criterionPreface(contrast, stake) {
    return contrast === 'forces' ? `What this turns on is ${stake}.` : `What the choice turns on is ${stake}.`;
}
function lead(clause, c) {
    const groups = c.interpretation.groups[clause.i];
    const lines = groups.map((group) => c.line(clause.i, group));
    if (lines.some((line) => line === null))
        return `${upperFirst(c.title(clause.i))}: ${c.stake(clause.i)}.`;
    const preface = clause.fn === 'criterion' ? [criterionPreface(clause.contrast, c.stake(clause.i))] : [];
    /* Two lines of one card in a row do not both open on its full name: the second is "It" (a risk that only repeated the stake used to stand between them). */
    const name = c.title(clause.i);
    const said = lines.map((line, index, all) => (index > 0 && all[index - 1].startsWith(name) && line.startsWith(`${name} `) ? `It${line.slice(name.length)}` : line));
    return [...preface, ...said].join(' ');
}
const ALIGNMENT_SIDES = {
    aligned: [
        'The two sides move in much the same direction: one shows {a}, the other {b}.',
        'Both sides lean the same way here: {a}, and {b}.',
    ],
    complementary: [
        'The two sides are not the same, but they fit: one shows {a}, the other {b}.',
        'Each side supplies something the other lacks: {a}, and {b}.',
    ],
    opposed: [
        'The two sides are in different places: one shows {a}, the other {b}.',
        'The difference between the two sides is real: {a} against {b}.',
    ],
    apart: [
        'The two sides share little: {a}; {b}.',
        'There is little common ground between {a} and {b}.',
    ],
};
const ALIGNMENT_GROUND = {
    aligned: {
        strained: 'What lies between them, {m}, is under strain all the same: agreement between the sides does not by itself make the shared ground steady.',
        steady: 'What lies between them, {m}, is steady, which gives that agreement something firm to stand on.',
        unsettled: 'What lies between them, {m}, is still unsettled; that agreement has not yet been tested.',
    },
    complementary: {
        strained: 'What lies between them, {m}, is itself under strain; what each side supplies may not get across.',
        steady: 'What lies between them, {m}, is steady; what each side supplies has firm ground to land on.',
        unsettled: 'What lies between them, {m}, is still unsettled; how far the two fit is not yet clear.',
    },
    opposed: {
        strained: 'What lies between them, {m}, is itself under strain, so the question is less what each side brings than whether the shared ground can carry the difference.',
        steady: 'What lies between them, {m}, is steady, which gives the difference somewhere firm to be held.',
        unsettled: 'What lies between them, {m}, is still unsettled; how the difference is held is not yet decided.',
    },
    apart: {
        strained: 'That puts the weight on what lies between them, {m}, and that is itself under strain.',
        steady: 'That puts the weight on what lies between them, {m}, and that is steady.',
        unsettled: 'That puts the weight on what lies between them, {m}, and that is still unsettled.',
    },
};
/** How firm the card between the two sides is: from the card's own semantics, never from its name. */
function groundOf(c, index) {
    const entry = c.plan.cards[index];
    if (entry.strained)
        return 'strained';
    return entry.card.stability === 'stable' ? 'steady' : 'unsettled';
}
const lowerFirst = (value) => value.charAt(0).toLowerCase() + value.slice(1);
/** The shape of one kind of conclusion, in the order the reading's structure asks for. Missing shapes fall back to the plain one. */
function conclusion(clause, c) {
    const s = (index) => c.stake(clause.focus[index] ?? clause.focus[0]);
    /* What the card asks of the person, for a slot that says what to do; the other slots say what the card puts forward. */
    const a = (index) => c.ask(clause.focus[index] ?? clause.focus[0]);
    const n = (index) => c.name(clause.focus[index] ?? clause.focus[0]);
    /* The card's title as it names itself in a sentence of its own: "Queen of Swords reversed asks you to ...". */
    const nt = (index) => c.title(clause.focus[index] ?? clause.focus[0]);
    /**
     * WHAT A CARD ASKS, SAID WITHOUT SAYING AGAIN WHAT THE READING HAS SAID.
     * After a sentence that is about this card it is "It"; after one about other cards it is named. A card's position paragraph may already have said
     * "X asks you ...": the summary then says it another way, never the same sentence twice.
     */
    const asking = (index, after) => {
        const title = nt(index);
        const candidates = [after.startsWith(title) ? `It asks you ${a(index)}.` : `${title} asks you ${a(index)}.`, `What ${title} asks is ${a(index)}.`, `The move ${title} points to is ${a(index)}.`];
        return candidates.find((text) => !alreadySaid(c, text)) ?? candidates[1];
    };
    const v = clause.v;
    /* Two wordings are chosen by a number that is independent of the one that chooses among three. */
    const w = (clause.v + clause.lead) % 2;
    const shape = clause.shape;
    switch (clause.kind) {
        case 'ladder-problem':
            if (shape === 'tension-first')
                return `There is a tension in this reading before there is an answer: ${s(0)} on the surface, ${s(1)} underneath. What can change it is ${a(2)}.`;
            /* Still a condition, said in two sentences: as one, with the cards' phrases in it, it ran to fifty words. */
            if (shape === 'conditional')
                return `If on the surface this is ${s(0)}, then what keeps it going is ${s(1)}. What could change it is ${a(2)}.`;
            return w === 0
                ? `On the surface this is ${s(0)}. Underneath it sits ${s(1)}. What can change it is ${a(2)}.`
                : `What shows on the surface is ${s(0)}; what keeps it in place is ${s(1)}; and what could shift it is ${a(2)}.`;
        case 'ladder-situation': {
            /* What the cards say to one another is the proposition about the whole; where there is none, the advice and where it tends are said and nothing else.
               The situation itself is not said again: its own paragraph has said it, and the lead-in names what it is about. */
            const stages = stagesOf(c, clause.focus);
            const found = movementOf(c, clause.focus, 'takeaway');
            /* The stages the situation passes through say the most about all three cards; failing those, the strongest thing two of them say to one another. */
            const m = stages !== null ? { text: stages, to: clause.focus[2] ?? 2, weight: 3 } : found;
            const ends = clause.focus[2] ?? 2;
            const tends = m !== null && m.to === ends ? '' : `The situation tends toward ${s(2)}.`;
            /* After a sentence about other cards, "it" would be the wrong card: the one that asks is named. */
            const asks = m !== null ? asking(1, m.text) : `What the situation calls for is ${a(1)}.`;
            if (shape === 'conditional')
                return `If the situation is ${s(0)}, what it calls for is ${a(1)}. It tends toward ${s(2)}.`;
            if (m !== null)
                return [m.text, asks, tends].filter((part) => part !== '').join(' ');
            if (shape === 'tension-first')
                return `Before any advice there is a pull in the situation: ${s(0)}, and what it calls for is ${a(1)}. It tends toward ${s(2)}.`;
            return w === 0
                ? `What the situation calls for is ${a(1)}. It tends toward ${s(2)}.`
                : `The situation tends toward ${s(2)}. What it calls for is ${a(1)}.`;
        }
        case 'ladder-sequence': {
            /* The strongest thing the cards say to one another; else the shape the spread makes as a whole; else only what the last place adds. */
            const stages = stagesOf(c, clause.focus);
            const found = movementOf(c, clause.focus, 'takeaway');
            const m = stages !== null ? { text: stages, to: clause.focus[2] ?? 2, weight: 3 } : found;
            const arc = c.plan.synthesis.arc;
            const ends = clause.focus[2] ?? 2;
            const last = c.plan.cards[ends];
            /* The shape the spread makes is said only where no card came out reversed: a reversed card is described by its harder side, and "settles" or "builds" would not be true of it. */
            const anyReversed = clause.focus.some((index) => c.plan.cards[index].orientation === 'reversed');
            const base = m !== null ? m.text : '';
            const tail = last.fn === 'direction' ? (m !== null && m.to === ends ? '' : `Where this is heading is ${s(2)}.`)
                : last.fn === 'response' ? asking(2, base) : '';
            const caution = last.fn === 'direction' && shape === 'conditional' ? 'Read it as a tendency, not a certainty.' : '';
            /* A reading with nothing to say about its movement and no last place that asks or points still says where the last card leaves it. */
            return [base, tail, caution].filter((part) => part !== '').join(' ') || `Where the reading ends up is ${s(2)}.`;
        }
        case 'late-turn': {
            /* A reversed last card does not give the earlier ones a new footing: what it puts forward is its harder side, so it adds a caution. */
            const last = c.plan.cards[clause.focus[2] ?? clause.focus[0]];
            const caution = last.orientation === 'reversed' ? TAROT_RISKS_EN[last.cardId] : null;
            const t2 = c.title(clause.focus[2] ?? clause.focus[0]);
            /* Stakes that hold their own "and" or "or" cannot be strung together ("does not cancel X or Y"): the final card is then said without listing them. */
            const crowdedLate = /\b(?:or|and)\b|,/.test(s(0)) || /\b(?:or|and)\b|,/.test(s(1));
            if (shape === 'conditional' && !crowdedLate)
                return caution === null
                    ? `The ground is ${s(0)} and then ${s(1)}, and the final card, ${n(2)}, may change it: ${s(2)}.`
                    : `The ground is ${s(0)} and then ${s(1)}, and the final card, ${t2}, adds a caution: ${caution}.`;
            if (shape === 'progression' && !crowdedLate)
                return caution === null
                    ? `The ground is ${s(0)}, then ${s(1)}; the final card, ${n(2)}, changes what that means: ${s(2)}.`
                    : `The ground is ${s(0)}, then ${s(1)}; the final card, ${t2}, adds a caution: ${caution}.`;
            /* Compound stakes are listed with a semicolon, so an "and" or "or" inside one cannot be taken for the one between them. */
            const earlier = crowdedLate ? `${s(0)}; then ${s(1)}` : `${s(0)}, then ${s(1)}`;
            if (caution !== null) {
                if (crowdedLate)
                    return `The final card, ${t2}, does not erase what came before: ${earlier}. It adds a caution: ${caution}.`;
                return w === 0
                    ? `The final card, ${t2}, does not erase what came before: ${s(0)}, then ${s(1)}. It adds a caution: ${caution}.`
                    : `What changes the reading is ${t2}. It does not cancel ${s(0)} or ${s(1)}; it adds a caution: ${caution}.`;
            }
            if (crowdedLate)
                return `The final card, ${n(2)}, does not erase what came before: ${earlier}. It changes how that can be approached: ${s(2)}.`;
            return w === 0
                ? `The final card, ${n(2)}, does not erase what came before: ${s(0)}, then ${s(1)}. It changes how that can be approached: ${s(2)}.`
                : `What changes the reading is ${n(2)}. It does not cancel ${s(0)} or ${s(1)}; it gives them a different footing: ${s(2)}.`;
        }
        case 'gap': {
            const other = clause.focus[2];
            const outcome = other === undefined ? ''
                : other === c.plan.cards.length - 1 ? ` ${upperFirst(n(2))} then adds a direction rather than a resolution: ${s(2)}.`
                    : ` It grows out of ${s(2)}.`;
            if (shape === 'conditional')
                return `If the contradiction is real, it is this: ${s(0)} against ${s(1)}. The cards do not settle it; they ask what each is protecting.${outcome}`;
            if (shape === 'progression')
                return `The spread builds to a contradiction: ${s(0)} on one side, ${s(1)} on the other. Neither is simply a mistake.${outcome}`;
            return w === 0
                ? `What the spread puts side by side is ${s(0)} and ${s(1)}. The useful question is less which one wins than what each is protecting.${outcome}`
                : `There is a real contradiction here: ${s(0)} against ${s(1)}. Neither is simply a mistake, and the cards do not choose between them.${outcome}`;
        }
        case 'consistent': {
            /* "Consistent" means nothing pulls against anything else, and that is all it says: how the cards move is not a thing about what they mean. */
            const parts = clause.focus.length > 2 ? [s(0), s(1), s(clause.focus.length - 1)] : [s(0), s(clause.focus.length - 1)];
            const list = parts.join('; ');
            return w === 0 ? `Nothing in the ${parts.length === 3 ? 'three' : 'two'} pulls against the ${parts.length === 3 ? 'others' : 'other'}: ${list}.` : `The cards do not pull against one another: ${list}.`;
        }
        case 'self-other': {
            const alignment = clause.alignment ?? 'apart';
            const sides = ALIGNMENT_SIDES[alignment];
            return `${sides[v % sides.length]} ${ALIGNMENT_GROUND[alignment][groundOf(c, clause.focus[2] ?? 2)]}`
                .replace('{a}', s(0)).replace('{b}', s(1)).replace('{m}', s(2));
        }
        case 'options': {
            /* A stake that holds its own "or" ("X, or Y") makes "between X, or Y and Z" unreadable: those wordings are not used for it. */
            const crowded = /\bor\b|,/.test(s(0)) || /\bor\b|,/.test(s(1));
            if (shape === 'tension-first')
                return `The two paths pull against each other: ${s(0)} on one side, ${s(1)} on the other. The cards do not choose; the choice turns on ${s(2)}.`;
            if (shape === 'conditional' && !crowded)
                return `If the choice is between ${s(0)} and ${s(1)}, the cards do not pick one: it turns on ${s(2)}.`;
            if (v === 2 && !crowded)
                return `There are two paths here, ${s(0)} and ${s(1)}, and the cards leave the choice open. What it turns on is ${s(2)}.`;
            return w === 0
                ? `The cards do not choose between the two paths. On one side there is ${s(0)}; on the other, ${s(1)}. The choice turns on ${s(2)}.`
                : `Neither path is favoured here. One carries ${s(0)}; the other, ${s(1)}. What decides it is ${s(2)}.`;
        }
        case 'forces': {
            const crowdedForces = /\b(?:or|and)\b|,/.test(s(0)) || /\b(?:or|and)\b|,/.test(s(1));
            if (shape === 'tension-first')
                return `Support and resistance pull hard against each other here: ${s(0)} against ${s(1)}. What it turns on is ${s(2)}. This is a balance as things stand, not a forecast.`;
            if (shape === 'conditional' && !crowdedForces)
                return `If the supporting side is ${s(0)} and the resisting side is ${s(1)}, then it depends on ${s(2)}: a condition, not a verdict.`;
            if (v === 2)
                return `Two forces are at work: ${s(0)} on the supporting side; ${s(1)} on the resisting side. What decides between them is ${s(2)}: a condition, not a verdict.`;
            return w === 0
                ? `Support and resistance are both real. What supports this is ${s(0)}. What works against it is ${s(1)}. What it turns on is ${s(2)}. This is a balance as things stand, not a forecast.`
                : `What supports this is ${s(0)}; what works against it is ${s(1)}; and what it depends on is ${s(2)}, which is a condition, not a verdict.`;
        }
        case 'layers': {
            /* Stakes that hold their own "and", "or" or comma cannot be strung into "if X and Y are": the plain form lists them with semicolons. */
            const crowdedLayers = [s(0), s(1)].some((stake) => stake.includes(',') || /\b(?:and|or)\b/.test(stake));
            if (shape === 'conditional' && !crowdedLayers)
                return `If the practical side is ${s(0)} and mind and feeling are ${s(1)}, then what runs under both is ${s(2)}.`;
            if (shape === 'progression' || v === 2)
                return `The practical side is ${s(0)}; mind and feeling, ${s(1)}; and what lies underneath is ${s(2)}.`;
            return w === 0
                ? `Practically, it is ${s(0)}. In mind and feeling, it is ${s(1)}. Underneath all of it, the thread is ${s(2)}.`
                : `The thread that runs under both is ${s(2)}; the practical side carries ${s(0)}, and mind and feeling carry ${s(1)}.`;
        }
        default:
            return '';
    }
}
/** Kinds whose first sentence can open with the question's subject; the two about a person and a bond already have one. */
const GROUNDS = new Set(['ladder-problem', 'ladder-situation', 'ladder-sequence', 'late-turn', 'gap', 'consistent', 'options', 'forces', 'self-other', 'layers']);
function insight(clause, c) {
    let text = conclusion(clause, c);
    if (text.length === 0)
        return text;
    /* With no standing note, the lead-in is how a grounded reading says what it is about; a conclusion that already opens on an "if" takes one that is not itself an "if". */
    const conditional = /^if /i.test(text);
    const lead = clause.subject !== null && GROUNDS.has(clause.kind) ? anchorLead({ subject: clause.subject }, 'en', conditional ? clause.lead % 2 : clause.lead % 3) : '';
    if (lead.length > 0)
        text = `${lead}${lowerLead(text)}`;
    if (clause.tone === 'heavy') {
        /* A conclusion that has just said "not a verdict" does not say it again in the caveat. */
        text += clause.v === 0 || text.includes('not a verdict')
            ? ' This is a heavy spread, but it describes a pattern under strain, not a fixed outcome.'
            : ' None of this is a verdict: it is a heavy spread, but it describes a pattern under strain, not a fixed outcome.';
    }
    return text;
}
/* ------------------------------------------------------------- the opening -- */
function opening(clause) {
    const { v } = clause;
    switch (clause.focus) {
        case 'late-turn':
            return ['The final card changes the reading considerably.', 'What changes the reading is the last card.', 'The last card is the one that moves this reading.'][v % 3];
        case 'contradiction': {
            const adjective = clause.tone === 'heavy' || clause.tone === 'tense' ? 'uncomfortable' : 'real';
            return [
                `There is an ${adjective} contradiction at the centre of this spread.`,
                'What stands out first is that two of the cards disagree, and the disagreement matters.',
                'Two of these cards pull against each other, and the reading stays with that.',
            ][v % 3];
        }
        case 'weight':
            return [
                'Most of this spread is Major Arcana, which gives the question more weight than its details alone would.',
                'This is a spread of large cards; the question sits inside something wider than its details.',
                'The cards here are large ones, and the question is read against that weight.',
            ][v % 3];
        case 'consistent': {
            const tail = clause.tone === 'heavy' ? ', and what it says is not easy' : '';
            return [
                `The spread is unusually consistent on this point${tail}.`,
                `The cards lean the same way here more than they usually do${tail}.`,
                `The cards keep leaning one way here${tail}.`,
            ][v % 3];
        }
        case 'even':
            return ['The picture is more even than it first looks.', 'No single layer carries this reading; it is more even than lopsided.', 'Nothing in the picture dominates; the layers sit level.'][v % 3];
        default:
            return '';
    }
}
/* ---------------------------------------------------------------- the clauses -- */
function render(clause, c) {
    const { plan } = c;
    const seed = c.delivery.seed;
    switch (clause.k) {
        case 'ask':
            return clause.excerpt ? `You asked: “${clause.excerpt}”${stop(clause.excerpt)}` : 'Everything below starts from the question you asked.';
        case 'why':
            return WHY[clause.spreadId] ?? WHY['body-mind-spirit'];
        case 'yes-no-note':
            return 'Cards do not answer yes or no. This reading looks at what is going on around the question instead.';
        case 'assumption-note':
            return 'The question takes something for granted that the cards cannot confirm, so the spread is read for what it shows about the dynamic, not for whether that assumption is true.';
        case 'anchor-note':
            /* A standing sentence that the cards are "a way of looking and not knowledge" was in three readings out of four and said nothing the
               situation-specific clauses do not already say where it matters (yes or no, an assumption, another person's mind, a direction, a
               sensitive subject). The subject is carried by the conclusion's lead-in instead, which is always spoken when this is silent. */
            return '';
        case 'opening':
            return opening(clause);
        case 'reversal-note':
            /* A reversed card's own sentences say what the reversal is. A reversal is explained only where it would otherwise be misread (tarotCoherenceEn.ts). */
            return reversalClarification(plan.cards.map((card) => ({
                id: card.cardId, name: TAROT_VOICE_EN.cardTitles[card.cardId], reversed: card.orientation === 'reversed',
            })));
        /* "The line breaks here" and "this card answers the one before it" name a relation and not what changes: the card's own paragraph and the
           sentences that say what the cards do to one another carry that, and a lead-in that only announces it is the order of the spread read back. */
        case 'link':
            return '';
        case 'lead':
            return lead(clause, c);
        case 'mode':
            /* A reversed card's position line is already the reversed card from its first word (content/reader/reversedLinesEn.ts); there is nothing to add. */
            return '';
        case 'court': {
            const rank = RANK_NAME[clause.rank];
            const framing = {
                'part-of-self': [
                    `As a ${rank}, it reads here as a part of you.`,
                    `The ${rank} is better read here as a quality in you than as anyone else.`,
                    `Here the ${rank} stands for something in you, not for another person.`,
                ],
                'way-of-acting': [
                    `As a ${rank}, it reads here as a way of acting rather than as a person.`,
                    `Here the ${rank} is a manner of acting more than someone to be identified.`,
                    `The ${rank} describes how something is done here, not who does it.`,
                ],
                'person-or-role': [
                    `As a ${rank}, it may stand for a person, a role or a way someone acts - the cards cannot say which.`,
                    `The ${rank} could be a person, a role or a manner of acting; the cards do not say which.`,
                    `Whether the ${rank} is someone, a role or only a way of behaving, the cards leave open.`,
                ],
            };
            /* Two courts of the same rank and framing are not given the same sentence: each one that came before shifts the wording. */
            const before = c.plan.cards.slice(0, clause.i).filter((entry) => entry.courtFraming === clause.framing && entry.rank === clause.rank).length;
            return framing[clause.framing][(c.delivery.seed + before) % 3];
        }
        case 'relation': {
            /* The sentence after a card's own paragraph says what changes with the cards' own phrases, whether or not an earlier pair has said the second card. */
            const text = pairSentence(clause.edge, c, `r${clause.i}`, true, c.plan.cards[clause.edge.to].orientation !== 'reversed');
            if (text !== '')
                ledgerOf(c).edges.add(`${clause.edge.from}>${clause.edge.to}`);
            return text;
        }
        case 'arc': {
            /* The movement is said with the cards' own phrases and no label for its shape ("a still start that ends in movement" names a shape and not what is still or
               what moves). Where the two phrases cannot sit between "from" and "to", the movement is not said at all. */
            const [from, to] = [c.stake(clause.first), c.stake(clause.last)];
            if (from.length + to.length > LONG_PAIR || HOLDS_ITS_OWN_CONNECTIVE.test(`${from} ${to}`))
                return '';
            /* A build adds that force gathers, and never of a spread with a reversed card or a break in it. */
            if (clause.arc === 'escalation' && mayClaimContinuity(c) && !c.plan.cards.some((card) => card.orientation === 'reversed'))
                return `Read in order, the spread runs from ${from} to ${to}, gaining force on the way.`;
            return variantOf(seed, 20, 2) === 0 ? `Notice the movement from ${from} to ${to}.` : `Read in order, the spread runs from ${from} to ${to}.`;
        }
        case 'arc-ask':
            /* The question an arc used to ask ("what the stillness was for") had no object. */
            return '';
        case 'flow':
            return FLOW[`${clause.kind}:${clause.value}`] ?? '';
        /* The connection that matters most is said as what it does to the two cards. "Look first at this:" only says that it matters. */
        case 'hinge':
            return saidOnce(clause.edge, c, 'hinge');
        /* Where the spread turns is said by what changes there, with the cards' own phrases: "it turns between X and Y" would only say where. */
        case 'turn':
            return saidOnce(clause.edge, c, 'turn');
        /* A disagreement is said as what the two disagree about, not as the fact that they disagree. */
        case 'tension':
            return saidOnce(clause.edge, c, 'tension');
        case 'agree':
            return saidOnce(clause.edge, c, 'agree');
        case 'theme-suit': {
            const domain = SUIT_DOMAIN[clause.suit][clause.group];
            return clause.count >= clause.total
                ? `Every card here is ${SUIT_NAME[clause.suit]}; this is about ${domain} throughout.`
                : `${upperFirst(countWord(clause.count))} of the ${countWord(clause.total)} cards are ${SUIT_NAME[clause.suit]}; a good part of this is about ${domain}.`;
        }
        case 'theme-movement':
            return THEME_MOVEMENT[clause.family];
        case 'major-density':
            if (clause.density === 'all')
                return `All ${countWord(clause.total)} cards are Major Arcana, which the tradition reads as a frame wider than a single situation - less about the details and more about what they belong to.`;
            if (clause.density === 'most')
                return `${upperFirst(countWord(clause.majors))} of the ${countWord(clause.total)} cards are Major Arcana, which the tradition reads as larger themes rather than day-to-day details.`;
            return 'There are no Major Arcana here, which keeps the reading at the level of everyday circumstance rather than of larger themes.';
        case 'absent-suits':
            return `Nothing here comes from ${plain(clause.suits.map((suit) => SUIT_NAME[suit]))}, which leaves ${plain(clause.suits.map((suit) => SUIT_AREA[suit]))} out of the picture.`;
        case 'rank-repeat':
            return `${upperFirst(countWord(clause.indexes.length))} ${RANK_PLURAL[clause.rank]} appear: ${plain(clause.indexes.map((index) => c.name(index)))}. That stresses ${RANK_THEME[clause.rank]}.`;
        case 'number-run':
            return clause.direction === 'ascending'
                ? `The numbers climb across ${plain(clause.indexes.map((index) => c.name(index)))}, which reads as something still building.`
                : `The numbers fall across ${plain(clause.indexes.map((index) => c.name(index)))}, which reads as something winding down or being reduced to its core.`;
        case 'court-level':
            return clause.level === 'all'
                ? 'Every card is a court card; this is a reading about stances and ways of acting rather than about events.'
                : 'Several court cards appear; the reading is more about stances and ways of acting than about events.';
        case 'element':
            return elementLine(clause.kind, clause.elements);
        /* "One motif runs through more than one card" without saying which motif, and "these two are read against each other first", are the structure
           of the reading and carry nothing about the cards: nothing is said. */
        case 'echo':
        case 'alignment':
            return '';
        case 'meeting-acts':
            /* The second sentence about the same card opens on "It"; a first one never does, since nothing before it in the section is about that card. */
            return clause.edges.map((edge, index) => {
                const text = pairText(edge, c, 'meeting', index > 0 && clause.edges[index - 1].to === edge.to);
                if (text !== '')
                    ledgerOf(c).edges.add(`${edge.from}>${edge.to}`);
                return text;
            }).filter((text) => text.length > 0).join(' ');
        case 'tradeoff': {
            const [a, b] = [c.name(clause.first), c.name(clause.second)];
            if (clause.dimension === 'steadiness')
                return `${a} is the steadier of the two, ${b} the less settled.`;
            /* Each dimension opens differently, so three of them in a row do not all begin on the same card's name. */
            if (clause.dimension === 'force')
                return `Of the two, ${a} carries more force.`;
            /* "Pushes outward" and "looks inward" name no human thing, and the two cards' own phrases are said where they sit: nothing is said. */
            return '';
        }
        case 'alike':
            {
                /* Which way two cards lean or face is not something a person can use; the stage they are at, how steady they are and what they ask is. */
                const usable = clause.dimensions.filter((dimension) => dimension !== 'movement' && dimension !== 'focus');
                return usable.length === 0 ? '' : `Between ${c.name(0)} and ${inline(c.name(1))} there is a likeness in ${dims(usable)}.`;
            }
        case 'neutrality':
            return clause.kind === 'options'
                ? 'The cards do not choose between the two.'
                : `This is a balance as things stand, not a forecast: ${c.name(clause.criterion)} names what it turns on.`;
        case 'layers': {
            if (clause.even)
                return 'The three layers sit at a similar level; the picture is more even than lopsided.';
            const steady = `The steadiest ground is ${c.labels[clause.steadiest].toLowerCase()}`;
            return clause.strained !== null && clause.strained !== clause.steadiest
                ? `${steady}; the layer asking for the most care is ${c.labels[clause.strained].toLowerCase()}.`
                : `${steady}.`;
        }
        case 'cost': {
            const id = c.plan.cards[clause.i].cardId;
            return choose([
                `With ${inline(c.title(clause.i))}, the risk is ${TAROT_RISKS_EN[id]}.`,
                `The risk with ${inline(c.title(clause.i))} is ${TAROT_RISKS_EN[id]}.`,
            ], `${id}|cost|${clause.i}`);
        }
        case 'insight':
            return insight(clause, c);
        case 'card-question':
            return c.question(clause.i);
        case 'practical': {
            const card = c.plan.cards[clause.i];
            const asks = card.orientation === 'reversed' ? TAROT_REVERSED_ASKS_EN[card.cardId] : c.phrases(clause.i).asks;
            return `${c.title(clause.i)} asks you ${asks}.`;
        }
        case 'direction-caveat':
            return 'Read the direction as a tendency: it can change as the present dynamic changes.';
        case 'reflect':
            return REFLECT[clause.role];
        default:
            return '';
    }
}
export const QUESTION_VOICE_EN = {
    locale: 'en',
    sectionTitles: { framing: 'Your question', synthesis: 'How the cards fit together', takeaway: 'What to take from it' },
    render: (clause, context) => {
        const text = lowerMidArticle(render(clause, context));
        const ledger = ledgerOf(context);
        if (text !== '')
            ledger.texts.push(text);
        ledger.lastKind = clause.k;
        ledger.lastText = text;
        if (!SYNTHESIS_KINDS.has(clause.k))
            ledger.synthesisFrom = ledger.texts.length;
        return text;
    },
    preDraw: (input) => {
        const places = input.positions.map((position, index) => `${index + 1}. ${position.label} - ${position.description}`).join('\n');
        const count = input.positions.length;
        const opening = input.excerpt ? `You asked: “${input.excerpt}”${stop(input.excerpt)}` : 'Everything here starts from the question you asked.';
        const why = WHY[input.spreadId] ?? WHY['body-mind-spirit'];
        const noun = count === 1 ? 'The place' : `${count} places`;
        return `${opening} ${why}${input.yesNo && input.spreadId !== 'support-resistance-key' && input.spreadId !== 'option-a-b-guidance' && input.spreadId !== 'steadying-reflection'
            ? ' Cards do not answer yes or no, so this reading looks at what is going on around the question instead.' : ''}\n\n${noun}:\n${places}\n\nDraw when you are ready.`;
    },
};
