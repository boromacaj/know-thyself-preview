import { getTarotSemantics } from './tarotSemantics.js';
const MOVE = {
    expanding: 'pushing outward',
    contracting: 'drawing in',
    stabilising: 'settling things',
    disrupting: 'breaking things up',
    redirecting: 'turning things',
    resolving: 'closing things',
    suspended: 'holding still',
};
/** A stable number from the two cards, where they sit and what the sentence is for. */
export function pairNumber(a, b, salt) {
    let hash = 2166136261;
    for (const char of `${a.name}|${b.name}|${a.where}|${b.where}|${salt}`) {
        hash ^= char.charCodeAt(0);
        hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
}
const pick = (options, number) => options[number % options.length];
/** A stable number from any text, for choosing among wordings that mean the same. Never a clock. */
export function numberOf(text) {
    let hash = 2166136261;
    for (const char of text) {
        hash ^= char.charCodeAt(0);
        hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
}
export const choose = (options, seed) => pick(options, numberOf(seed));
export const upperFirst = (value) => (value ? value.charAt(0).toUpperCase() + value.slice(1) : value);
export const lowerFirst = (value) => (value ? value.charAt(0).toLowerCase() + value.slice(1) : value);
/** A Major's title in the middle of a sentence: "The Hanged Man" reads as "the Hanged Man" there. Every other title is unchanged. */
export const inline = (name) => name.replace(/^The /, 'the ');
const MAJOR_WITH_ARTICLE = 'Fool|Magician|High Priestess|Empress|Emperor|Hierophant|Lovers|Chariot|Hermit|Hanged Man|Devil|Tower|Star|Moon|Sun|World';
const MID_ARTICLE = new RegExp(`([^.!?\\n“"]\\s)The (${MAJOR_WITH_ARTICLE})\\b`, 'g');
/**
 * A sentence that names a Major in its middle says "the Hanged Man", not "The Hanged Man".
 *
 * The voice builds sentences from titles that are right at the start of a sentence; a title that lands after a comma or a verb is lowered here,
 * once, for the whole text, so no template has to know where its card will end up.
 */
export const lowerMidArticle = (text) => text.split(/(“[^”]*”)/).map((part, index) => (index % 2 === 1 ? part : part.replace(MID_ARTICLE, '$1the $2'))).join('');
/**
 * WHAT THE TWO DIFFER IN, said for these two cards.
 *
 * With stakes it names what each one puts forward ("momentum earned by discipline against deliberate stillness"); without them it names
 * only the cards and what they are doing, for a place where the card's own words have been said already.
 */
function contrast(a, b, opposing, n, stakes) {
    const first = opposing[0];
    const [sa, sb] = [a.semantics, b.semantics];
    const [A, B, dA, dB] = [a.name, b.name, a.thing, b.thing];
    if (first === 'movement' || (first === undefined && sa.movement !== sb.movement)) {
        const ma = MOVE[sa.movement] ?? 'moving';
        const mb = MOVE[sb.movement] ?? 'moving';
        const lead = `${A} is ${ma} while ${inline(B)} is ${mb}`;
        return stakes
            ? pick([`${lead}: ${dA} against ${dB}.`, `${lead}, which sets ${dA} against ${dB}.`], n)
            : '';
    }
    if (first === 'focus') {
        return stakes ? `${A} and ${inline(B)} are about different things: ${dA} against ${dB}.` : '';
    }
    if (first === 'stability') {
        const [steady, shaky] = sa.stability === 'stable' ? [a, b] : [b, a];
        return stakes
            ? `${steady.name} is on firm ground and ${inline(shaky.name)} is not: ${steady.thing} against ${shaky.thing}.`
            : `${steady.name} is on firm ground and ${inline(shaky.name)} is not.`;
    }
    if (first === 'stance') {
        const [near, far] = sa.relational === 'joining' ? [a, b] : [b, a];
        return `${near.name} draws towards other people where ${inline(far.name)} pulls away from them.`;
    }
    return stakes
        ? `${A} and ${inline(B)} do not sit easily together: ${dA} against ${dB}.`
        : `${A} and ${inline(B)} do not sit easily together.`;
}
/** Two of the same connecting word in one sentence ("After quiet hope after strain, ...") is the sentence an editor would rewrite. */
const REPEATS_CONNECTIVE = /\b(after|from|into|against|while|where|before|as)\b[^.:;]*\b\1\b/i;
/** Two stakes longer than this together are not put into one frame. */
export const LONG_PAIR = 140;
/** A phrase with its own "to", "or" or comma cannot sit between "from" and "to": the reader cannot tell where it ends. */
export const HOLDS_ITS_OWN_CONNECTIVE = /,| to | or /;
/**
 * WHERE A CARD'S ATTENTION IS, for the purpose of saying that it changed.
 *
 * A reversal is a transform of the card's dimensions (tarotOrientation.ts), and two of its modes (internalised, exposed) turn the focus round
 * as a rule, whatever the card is about: the Knight of Wands reversed (scattered, stop-start action) is "internal" only because the rule says
 * a pushing card reversed is turned inward. The classifier may use that; a sentence that says "the emphasis moves" may not, because nothing in
 * the card's meaning moved. So a change of focus is read from the card's own (upright) focus.
 */
const focusOf = (card) => (card.reversed ? getTarotSemantics(card.semantics.id)?.focus ?? card.semantics.focus : card.semantics.focus);
/**
 * WHEN TWO CARDS DO NOT INTENSIFY ANYTHING TOGETHER.
 *
 * The classifier calls a pair an escalation, a softening or a reinforcement when both push and the second is not weaker, or when they sit at
 * the same stage; or the catch-all when neither. That is a statement about movement, and it says nothing about WHAT matters. When the two cards
 * are about opposite things - what is out in the open, what is private - the honest proposition is that what matters changes, and it is said
 * with the two things themselves: "The emphasis moves from recognition earned in public view to feeling offered and not yet received."
 * Without both cards' own phrases there is no concrete thing to say, so a place that has said them already says nothing.
 */
function focusShift(a, b, at, use, n) {
    if (use === 'names')
        return '';
    const { name: A, thing: dA } = a;
    const { name: B, thing: dB } = b;
    const options = dA.length + dB.length > LONG_PAIR
        ? [`After ${inline(A)}, what matters is ${dB}.`]
        : HOLDS_ITS_OWN_CONNECTIVE.test(`${dA} ${dB}`)
            ? [`After ${dA}, what matters is ${dB}.`]
            : [`The emphasis moves from ${dA} to ${dB}.`, `What matters shifts from ${dA} to ${dB}.`, `After ${dA}, what matters is ${dB}.`, `The focus becomes less about ${dA} and more about ${dB}.`];
    const sound = options.filter((text) => !REPEATS_CONNECTIVE.test(text));
    return pick(sound.length > 0 ? sound : options, n);
}
/** The card ends or breaks what is there, as the classifier reads it (the same test it uses for a pair that compounds). */
const breaksUp = (card) => card.semantics.movement === 'disrupting'
    || (card.semantics.movement === 'contracting' && card.semantics.agency === 'release' && (card.semantics.stability === 'transforming' || card.semantics.stability === 'volatile'));
/** What the second card does to the pace of things, in a plain verb phrase that follows its name. */
function pacing(card) {
    const movement = card.semantics.movement;
    if (movement === 'suspended' || movement === 'contracting')
        return 'slows things down';
    if (movement === 'stabilising' || movement === 'resolving')
        return 'steadies the ground';
    return 'brings steadier ground';
}
/**
 * WHETHER THE RELATION IS REALLY A CHANGE OF FOCUS.
 *
 * A push that carries on, a pair at the same stage, or the catch-all, when the two cards are about opposite things: what is out in the open, and
 * what is private. Then what matters changes, and that is the sentence worth saying about them.
 */
export function shiftsFocus(pair, a, b) {
    const [fa, fb] = [focusOf(a), focusOf(b)];
    return pair.salience !== 'quiet'
        && (pair.relation === 'escalation' || pair.relation === 'softening' || pair.relation === 'reinforcement' || pair.relation === 'continuation')
        && fa !== 'mixed' && fb !== 'mixed' && fa !== fb;
}
/**
 * A sentence saying what the relation between `a` (earlier in the reading's order) and `b` means for this pair.
 * Never names the relation, and says nothing where there is no concrete thing to say.
 */
export function relationSentence(pair, a, b, options = {}) {
    const text = relationText(pair, a, b, options);
    /* Two sentences in a row that open on the same card's full name are the pair an editor merges: the second says "It". */
    if (options.subject === 'it') {
        const at = b.where ? `, ${b.where},` : '';
        const prefix = `${b.name}${at}`;
        if (text.startsWith(prefix))
            return `It${text.slice(prefix.length)}`;
    }
    return text;
}
function relationText(pair, a, b, options) {
    /* A reversed card's own phrase is already said in its place; the plain relation sentence for it does not say it a second time. That holds for
       the card the sentence follows as much as for the one it is about: a reversed first card has just said its phrase as its paragraph's first
       claim, and quoting it again in the next paragraph is the same proposition said twice. */
    const requested = options.use ?? 'plain';
    const use = !options.forceStakes && (a.reversed || b.reversed || options.repeatsSecond) && requested === 'plain' ? 'names' : requested;
    const stakes = use === 'plain';
    const n = pairNumber(a, b, `${pair.relation}${options.salt ?? ''}`);
    const { name: A, thing: dA } = a;
    const { name: B, thing: dB } = b;
    const [mA, mB] = [inline(A), inline(B)];
    const brings = a.reversed ? 'describes' : 'brings';
    /* Where the second card sits, said only where the reading has places worth naming. */
    const w = b.where;
    const at = w ? `, ${w},` : '';
    /* A frame that needs both cards' own phrases has nothing to say in a place that has said them: `names` may be empty, and then nothing is said. */
    const choose = (plain, names) => {
        const candidates = stakes ? plain : names;
        if (candidates.length === 0)
            return '';
        let sound = candidates.filter((text) => !REPEATS_CONNECTIVE.test(text));
        if (sound.length === 0)
            sound = [...candidates];
        if (stakes && dA.length + dB.length > LONG_PAIR) {
            /* Two long phrases in one frame cannot be read in one breath: use a frame that carries only one, or none. */
            const lean = sound.filter((text) => !(text.includes(dA) && text.includes(dB)));
            if (lean.length === 0)
                return '';
            sound = lean;
        }
        return pick(sound, n);
    };
    if (shiftsFocus(pair, a, b))
        return focusShift(a, b, at, use, n);
    /* A reversed card does not settle, let go, join, answer or ease what came before it: those frames would credit it with the upright card's gift. */
    if (b.reversed && (pair.relation === 'answer' || pair.relation === 'release' || pair.relation === 'integration' || pair.relation === 'softening'))
        return '';
    switch (pair.relation) {
        case 'interruption':
            if (a.reversed) {
                /* "What the card had settled" is not a thing a reversed card did: only that the next one cuts across it. */
                return choose([`${B}${at} cuts across ${mA}: ${dB}.`, `${B}${at} breaks the pattern ${mA} describes: ${dB}.`], [`${B}${at} cuts across ${mA}.`, `${B}${at} breaks the pattern ${mA} describes.`]);
            }
            return choose([`${B}${at} cuts across what ${mA} had settled: ${dB}.`, `${B}${at} breaks into what ${mA} had settled: ${dB}.`], [`${B}${at} cuts across what ${mA} had settled, and the reading becomes about the break rather than the stretch before it.`, `${B}${at} breaks into what ${mA} had settled, and that can no longer be taken for granted.`]);
        case 'stabilisation': {
            /* A reversed card does not steady what came before it, and "it follows" is only the order of the spread: its own paragraph has said what it is. */
            if (b.reversed)
                return '';
            const pace = pacing(b);
            return choose([`After ${dA}, ${mB}${at} ${pace}: ${dB}.`, `${B}${at} ${pace} after ${mA}: ${dB}.`], [`${B}${at} ${pace} after ${mA}.`, `After ${mA}, ${mB}${at} ${pace}.`]);
        }
        case 'escalation':
            /* Two breaks that compound are one thing. Two pushes are another: "it goes further" would say that the second is the first grown up, and what
               was found is only that both push; that is said as the two things going together. */
            if (breaksUp(a) && breaksUp(b)) {
                return choose([`${B}${at} takes ${mA} further: from ${dA} to ${dB}.`, `With ${mB}${at || ','} ${dA} becomes ${dB}.`, `${B}${at} takes ${mA} further: ${dB}.`], [`${B}${at} takes ${mA} further.`, `${B}${at} adds to what ${mA} ${brings}.`]);
            }
            return together(A, mA, B, mB, at, dA, dB, choose, a.reversed || b.reversed);
        case 'softening':
            if (breaksUp(a) && breaksUp(b)) {
                return choose([`${B}${at} carries ${mA} on more gently: from ${dA} to ${dB}.`, `With ${mB}${at || ','} ${dA} eases into ${dB}.`, `${B}${at} carries ${mA} on more gently: ${dB}.`], [`${B}${at} carries ${mA} on more gently.`, `${B}${at} takes the pressure out of what ${mA} ${brings} without reversing it.`]);
            }
            return together(A, mA, B, mB, at, dA, dB, choose, a.reversed || b.reversed);
        case 'reinforcement':
            /* That two cards move the same way is not a thing about what they mean. What can be said is that the two things are there together. */
            return together(A, mA, B, mB, at, dA, dB, choose, a.reversed || b.reversed);
        case 'redirection':
            /* "Sends the course in a different direction" says that something turned, and not what to. The two things are the content. */
            return choose(HOLDS_ITS_OWN_CONNECTIVE.test(`${dA} ${dB}`)
                ? [`After ${dA}, ${B}${at} changes what matters: ${dB}.`, `After ${dA}, what matters is ${dB}.`]
                : [`${B}${at} changes what matters: from ${dA} to ${dB}.`, `What matters shifts from ${dA} to ${dB}.`, `The emphasis moves from ${dA} to ${dB}.`], []);
        case 'release':
            return choose([`Where ${A} holds on, ${mB}${at} lets go: ${dB}.`, `${A} holds things in place; ${mB}${at} lets go: ${dB}.`], [`Where ${A} holds on, ${mB}${at} lets go.`, `${B}${at} puts down what ${mA} was carrying.`]);
        case 'integration':
            return choose([`${B}${at} begins to bring together what ${mA} had kept apart: ${dB}.`, `What ${mA} divided, ${mB}${at} begins to join, through ${dB}.`], [`${B}${at} begins to bring together what ${mA} had kept apart.`, `What ${mA} divided, ${mB}${at} begins to join.`]);
        case 'exposure':
            /* "What the card kept inward" says nothing about which thing: the second card's own phrase is what comes into the open. */
            return choose([`After ${dA}, ${B}${at} brings what was private into the open: ${dB}.`, `${B}${at} brings what was private into the open: ${dB}.`, `${B}${at} brings ${dB} into view after ${dA}.`, `After ${dA}, ${B}${at} puts ${dB} in plain view.`], []);
        case 'answer':
            /* "Leaves something open; takes it up" says that there is an unresolved thing and not which. What the second card meets is the first card's own phrase. */
            /* A first phrase with its own "or", "while" or comma makes "answers X with Y" ambiguous about where X ends; a comma after it does not. */
            return choose(/,| or | and | while | that /.test(dA)
                ? [`Against ${dA}, ${B}${at} sets ${dB}.`]
                : [`${B}${at} meets ${dA} with ${dB}.`, `${B}${at} answers ${dA} with ${dB}.`, `Against ${dA}, ${B}${at} sets ${dB}.`], []);
        case 'continuation':
            /* The classifier's catch-all: two cards that follow one another without opposing. "B follows A" is the order of the spread, which the reader can
               already see, so nothing is said - except the one continuation its rule did establish: an ending, and a beginning on the ground it cleared. */
            if (!pair.basis?.includes('begins on the cleared ground'))
                return '';
            return choose([`${B}${at} begins on the ground ${mA} has cleared: ${dB}.`, `Where ${A} clears the ground, ${mB}${at} begins something on it: ${dB}.`], [`${B}${at} begins on the ground ${mA} has cleared.`, `Where ${A} clears the ground, ${mB}${at} begins something on it.`]);
        case 'contrast':
            return contrast(a, b, pair.opposing, n, stakes);
        default:
            return '';
    }
}
/** Two things that are there together: said with the things, and with no claim that one comes from the other. Silent where the things have been said. */
function together(A, mA, B, mB, at, dA, dB, choose, reversed = false) {
    /* A reversed card is described by its harder side: "adds" it to another card's phrase would be a claim about how the two combine that nothing here supports. */
    if (reversed)
        return '';
    return choose([`${A} and ${mB} go together: ${dA}, and ${dB}.`, `Alongside ${dA}, ${B}${at} adds ${dB}.`], []);
}
/**
 * THREE CARDS THAT MOVE THROUGH THEIR STAGES.
 *
 * When the three cards sit at a beginning, a stretch of work and a culmination (the semantic model's own `direction` for each), that movement is
 * what they say together: what starts as one thing is shaped by another and arrives at a third. Reversed cards are left out, because what a
 * reversed card arrives at is not a culmination. Null when the stages do not run that way.
 */
export function stagesSentence(cards) {
    if (cards.length < 3 || cards.slice(0, 3).some((card) => card.reversed))
        return null;
    const [first, middle, last] = cards.slice(0, 3).map((card) => card.semantics.direction);
    if (first !== 'beginning' || middle !== 'development' || (last !== 'culmination' && last !== 'integration'))
        return null;
    const [x, y, z] = cards.slice(0, 3).map((card) => card.thing);
    return [x, y, z].some((stake) => stake.includes(',') || / (?:and|or) /.test(stake))
        ? `What starts as ${x} is shaped by ${y}. It arrives at ${z}.`
        : `What starts as ${x} is shaped by ${y} and arrives at ${z}.`;
}
/**
 * HOW MUCH A RELATION HAS TO SAY, so a summary that has room for one pair says the most informative one.
 *
 * A change of what matters, a break, a release, an answer or a contrast each assert what changes between the two cards, with the cards' own
 * phrases. Two things that are only there together assert less; the classifier's catch-all ("one follows the other") asserts nothing and is 0,
 * so it is never chosen and never said.
 */
export function relationWeight(pair, a, b) {
    if (relationText(pair, a, b, { forceStakes: true }) === '')
        return 0;
    if (shiftsFocus(pair, a, b))
        return 5;
    switch (pair.relation) {
        case 'interruption':
        case 'release':
        case 'integration':
        case 'exposure':
        case 'answer':
        case 'redirection':
        case 'contrast':
        case 'stabilisation':
            return 4;
        case 'continuation': return 3;
        case 'escalation':
        case 'softening': return breaksUp(a) && breaksUp(b) ? 2 : 1;
        case 'reinforcement': return 1;
        default: return 0;
    }
}
