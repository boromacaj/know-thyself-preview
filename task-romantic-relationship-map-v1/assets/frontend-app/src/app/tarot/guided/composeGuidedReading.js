import { activeLocale, isLocale } from '../../i18n/locale.js';
import { TAROT_CONTENT_VERSION } from '../content/tarotSemantics.js';
import { auditReadingText } from '../question/questionEpistemics.js';
import { QUESTION_VOICE_EN } from '../question/questionVoiceEn.js';
import { QUESTION_VOICE_SK } from '../question/questionVoiceSk.js';
import { TAROT_VOICE_EN, TAROT_VOICE_SK, contextFor } from '../question/questionVoice.js';
import { genericHits } from '../question/readerQuality.js';
import { buildReadingDocument } from '../question/readingDocument.js';
import { interpretReading, planDelivery } from '../question/readerInterpretation.js';
import { buildQuestionReadingPlan } from '../question/readingPlan.js';
import { guidedStartFor } from './guidedAdapter.js';
import { guidedReadsFor } from './guidedReads.js';
import { reversedLineEn } from '../content/reader/reversedLinesEn.js';
import { auditGuidedText } from './guidedAudit.js';
import { TAKEAWAY_GROUP_OF } from './guidedTypes.js';
const VOICES = { en: QUESTION_VOICE_EN, sk: QUESTION_VOICE_SK };
const CARD_VOICES = { en: TAROT_VOICE_EN, sk: TAROT_VOICE_SK };
/**
 * WHAT A REVERSAL MEANS, IN SLOVAK, for a guided reading. English needs nothing: its reversed lines are the reversed card from their first word. The Slovak voice's own sentences
 * for this (Daily Tarot's, frozen) read stiffly - "vec je prítomná a neprechádza: stojí, nechýba" - so a guided reading says the same six things in plain Slovak. Same meaning,
 * same six modes; only the wording of the note changes, and only here.
 */
const REVERSAL_NOTE_SK = {
    diminished: 'Obrátená poloha tu neznamená opak karty, ale jej tichšiu podobu: tá istá vec s menšou silou.',
    blocked: 'Obrátená poloha tu hovorí, že to, o čom karta je, existuje, no nepokračuje ďalej: je zadržané, nie chýbajúce.',
    excessive: 'Obrátená poloha tu ukazuje tú istú kvalitu dotiahnutú tam, kde už prestáva slúžiť.',
    internalised: 'Obrátená poloha tu znamená, že sa to odohráva dovnútra, v súkromí: tá istá sila, len bez východu navonok.',
    exposed: 'Obrátená poloha tu znamená, že to, čo karta zvyčajne drží pre seba, vychádza na povrch.',
    unchanged: 'Obrátená poloha tu mení málo: karta sa číta takmer tak ako v základnej polohe.',
};
/** Clauses that label the SHAPE of a spread without saying what is in it, or that the area's lens says better. */
const LEFT_TO_THE_LENS = new Set(['arc', 'arc-ask', 'flow', 'theme-movement', 'element', 'theme-suit', 'major-density', /* a statement about the model ("alike in how steady they are"), not about the reading */ 'alike']);
const REVERSED_LEAD_SK = 'V základnej polohe by karta na tomto mieste hovorila takto.';
const clean = (text) => text.replace(/\s+/g, ' ').trim();
/**
 * A sentence the reading has already said is not said again. The engine's voice says what a reversal means in the same words wherever it comes up, which is right in a place
 * of its own and repetition in one reading of three cards: the first time it is said stays, a later one is dropped. The comparison is of whole sentences, so nothing a card
 * says is ever shortened.
 */
function withoutRepeats(groups) {
    const seen = new Set();
    return groups.map((paragraphs) => paragraphs.map((paragraph) => paragraph.split(/(?<=[.!?])\s+/).filter((sentence) => {
        const key = sentence.trim().toLowerCase();
        if (key.length === 0 || seen.has(key))
            return false;
        seen.add(key);
        return true;
    }).join(' ')).filter((paragraph) => paragraph.length > 0));
}
const resolveLocale = (locale) => (locale !== undefined && isLocale(locale) ? locale : activeLocale());
/** One variant of a list, by a stable number: never a clock, never a random source. */
const variant = (list, salt) => list[Math.abs(salt) % list.length];
/**
 * The area's texture for ONE card in ONE place. Which table is read is decided by what the place asks:
 * a place that reads a STAGE (where it comes from, where it stands, what drives it) reads the card's stage; a place that asks
 * for a RESPONSE reads what the card asks of the person; a place that looks ahead reads its tendency; the other side reads how
 * the other side stands. The card's dimensions are already oriented, so a reversed card reads through its reversed state.
 */
/**
 * WHETHER A CARD READS AS ONE UNDER STRAIN, FOR THE PURPOSE OF CHOOSING A REGISTER. The engine's own `strained` flag is deliberately wide (it also marks a volatile or an
 * enduring card: the Fool, the Ace of Wands and the Seven of Wands are among the 31 upright cards it marks) and a sentence about a card "under strain" beside the Ace of
 * Wands is wrong. A reversed card is a card whose expression has shifted, and a card that disrupts or contracts is one that is hard: those are the strained ones here.
 */
export const readsAsStrained = (entry) => entry.orientation === 'reversed' || entry.trend === 'disrupting' || entry.trend === 'contracting';
export function areaTexture(lens, entry, locale, salt) {
    const pick = (options) => (options.length === 0 ? null : variant(options, salt)[locale]);
    /* A card under strain reads through the table written for strain; one that is not reads through the plain table. */
    const hard = readsAsStrained(entry);
    const strained = hard ? lens.strained : null;
    switch (entry.fn) {
        case 'response':
        case 'criterion':
        case 'meaning':
        case 'supporting':
            return strained ? strained.stance[entry.responseRole][locale] : pick(lens.stance[entry.responseRole]);
        case 'direction':
        case 'option':
            return (strained ? strained.trend[entry.trend] : lens.trend[entry.trend])[locale];
        /* The other side is read through the same stage table as any place: what a stage tends to look like between people. The card's own sentence says it is a stance; nothing here attributes a feeling or a need to a person who is not in the room. */
        default:
            return strained ? strained.stage[entry.stateRole][locale] : pick(lens.stage[entry.stateRole]);
    }
}
/** The area's sentence for the shape of the whole, by what the spread's strategy reads. */
function shapeSentences(start, plan, locale) {
    const { lens } = start.area;
    const { synthesis } = plan;
    const out = [];
    /* "The order continues along one line" is not a finding about a shape: it is said only of an order that has one. */
    if (synthesis.strategy === 'sequence' && synthesis.arc && synthesis.arc !== 'continuation')
        out.push(lens.arc[synthesis.arc][locale]);
    if (synthesis.strategy === 'self-other-meeting' && synthesis.meeting)
        out.push(lens.alignment[synthesis.meeting.alignment][locale]);
    if (synthesis.strategy === 'options-criterion')
        out.push(lens.weighing[locale]);
    if (synthesis.strategy === 'layers')
        out.push(lens.layers[locale]);
    return out;
}
/** What the weight of the deck says in this area: the Major cards when they dominate, otherwise the suit that leads. */
function patternSentence(start, plan, locale) {
    const { lens } = start.area;
    if (plan.patterns.total >= 3 && (plan.patterns.majorDensity === 'all' || plan.patterns.majorDensity === 'most'))
        return lens.majorWeight[locale];
    const theme = plan.synthesis.primaryTheme;
    if (theme.kind === 'suit')
        return lens.suit[theme.suit][locale];
    return null;
}
/**
 * Two of a card's approved sentences that say nearly the same thing (a reversed card's origin line and driver line both quote its one stake) are one sentence, not two: the second is
 * dropped when most of its words are already in the first.
 */
function distinctLines(lines) {
    const words = (text) => new Set(text.toLowerCase().split(/[^\p{L}]+/u).filter((word) => word.length > 3));
    const kept = [];
    for (const line of lines) {
        const mine = words(line);
        const echo = kept.some((earlier) => { const theirs = words(earlier); const shared = [...mine].filter((word) => theirs.has(word)).length; return mine.size > 0 && shared / mine.size >= 0.55; });
        if (!echo)
            kept.push(line);
    }
    return kept;
}
function positionParagraphs(start, plan, ctx, voice, clauses, index, locale, usedTexture, seed) {
    const entry = plan.cards[index];
    const groups = guidedReadsFor(start.intention.id)?.[index] ?? null;
    /* What the card says in this place - the sentences of its own that THIS intention asks of this place (guidedReads.ts), or the engine's own lead where none is named - and how the card that came before it bears on it. */
    const beside = clauses
        .filter((clause) => clause.k === 'mode' || clause.k === 'court' || clause.k === 'relation' || clause.k === 'link' || clause.k === 'cost' || (groups === null && clause.k === 'lead'))
        /* "Here the reading settles" beside a card that reads as strained is a contradiction the engine's pair relation cannot see: that one link is not said of such a card. */
        .filter((clause) => !(clause.k === 'link' && clause.relation === 'stabilisation' && readsAsStrained(entry)))
        .map((clause) => (clause.k === 'mode' && locale === 'sk' ? REVERSAL_NOTE_SK[entry.card.reversalMode ?? 'unchanged'] : voice.render(clause, ctx)));
    /* English reads a reversed card from its own reversed sentences for the group asked; the engine's helper answers a criterion place with a one-line caution instead, which says nothing in a place that reads for another group. */
    const lineOf = (group) => (locale === 'en' && entry.orientation === 'reversed' ? reversedLineEn(group, ctx.title(index), entry.cardId) : ctx.line(index, group));
    const lines = groups === null ? [] : groups.map(lineOf).filter((line) => typeof line === 'string' && line.length > 0);
    /* The Slovak card lines are written for the card upright (there is no Slovak reversed layer): beside a reversed card they are introduced as what the card says in its base position, and the note on what the reversal does follows. */
    const baseOnly = locale === 'sk' && entry.orientation === 'reversed' && lines.length > 0 ? [REVERSED_LEAD_SK] : [];
    const own = clean([...baseOnly, ...distinctLines(lines), ...beside].filter((part) => part.length > 0).join(' '));
    const paragraphs = own.length > 0 ? [own] : [];
    /* What this place is about for this intention when a card like this one stands in it (the frame), and what this area makes of that kind of card (the lens). Never the same lens sentence twice in one reading: the next variant stands in. */
    const frame = start.intention.places[index].frame[readsAsStrained(entry) ? 'strained' : 'steady'][locale];
    let texture = areaTexture(start.area.lens, entry, locale, seed + index);
    if (texture !== null && usedTexture.has(texture))
        texture = areaTexture(start.area.lens, entry, locale, seed + index + 1);
    if (texture !== null) {
        if (usedTexture.has(texture))
            texture = null;
        else
            usedTexture.add(texture);
    }
    const place = clean([frame, texture ?? ''].filter((part) => part.length > 0).join(' '));
    if (place.length > 0)
        paragraphs.push(place);
    return paragraphs;
}
export function composeGuidedReading(choice, drawn, localeArg) {
    const start = guidedStartFor(choice);
    if (!start)
        return null;
    const locale = resolveLocale(localeArg);
    const plan = buildQuestionReadingPlan(start.intent, start.selection, drawn, { ground: false });
    if (!plan)
        return null;
    const voice = VOICES[locale];
    const interpretation = interpretReading(plan);
    const delivery = planDelivery(plan, interpretation);
    const labels = start.spread.positions.map((position) => position.label[locale]);
    const ctx = contextFor(CARD_VOICES[locale], plan, labels, locale, interpretation, delivery);
    const document = buildReadingDocument(plan, interpretation, delivery);
    const { intention, area } = start;
    const render = (clause) => voice.render(clause, ctx);
    const usedTexture = new Set();
    const rawCards = plan.cards.map((entry) => {
        const section = document.sections.find((candidate) => candidate.id === `position:${entry.positionId}`);
        const clauses = section && 'clauses' in section ? section.clauses : [];
        return {
            positionId: entry.positionId,
            index: entry.index,
            positionLabel: labels[entry.index],
            ask: intention.places[entry.index].ask[locale],
            cardId: entry.cardId,
            cardName: ctx.name(entry.index),
            orientation: entry.orientation,
            paragraphs: positionParagraphs(start, plan, ctx, voice, clauses, entry.index, locale, usedTexture, delivery.seed),
        };
    });
    /* The synthesis: the area's reading of the SHAPE first, then the relations the engine found between these cards, then what the
       weight of the deck says in this area. */
    const synthesisSection = document.sections.find((candidate) => candidate.id === 'synthesis');
    const engineSynthesis = (synthesisSection && 'clauses' in synthesisSection ? synthesisSection.clauses : [])
        .filter((clause) => !LEFT_TO_THE_LENS.has(clause.k))
        /* Two pulls held side by side are not ranked: the sentence that says which carries more force would contradict a reading whose point is that it names no winner. */
        .filter((clause) => !(intention.semantics.reflection === 'weigh' && clause.k === 'tradeoff' && clause.dimension === 'force'))
        /* The card said to be the steadier of two is not one that reads as strained. */
        .filter((clause) => !(clause.k === 'tradeoff' && clause.dimension === 'steadiness' && readsAsStrained(plan.cards[clause.first])))
        .map(render).filter((part) => part.length > 0);
    const synthesisParagraphs = [];
    const shape = shapeSentences(start, plan, locale);
    const pattern = patternSentence(start, plan, locale);
    const lead = clean([...shape, ...engineSynthesis.slice(0, 1)].join(' '));
    if (lead.length > 0)
        synthesisParagraphs.push(lead);
    const rest = clean([...engineSynthesis.slice(1), ...(pattern ? [pattern] : [])].join(' '));
    if (rest.length > 0)
        synthesisParagraphs.push(rest);
    /* The takeaway: what the spread says most plainly (the engine's own insight), what that asks in practice for THIS intention, and its closing question. */
    const takeawaySection = document.sections.find((candidate) => candidate.id === 'takeaway');
    const takeawayClauses = takeawaySection && 'clauses' in takeawaySection ? takeawaySection.clauses : [];
    /* The three layers have already been said in the synthesis (which is steadiest and which asks for care); the engine's "Practically it is X. In mind and feeling it is Y. Underneath, the thread is Z" would say them a second time in a frame that does not read as a sentence about anything. */
    void takeawayClauses;
    /* What the three cards put forward, in order, each in the words of its own card (a bare noun phrase): the one summary of the cards that is made of nothing but their own approved phrases, so that it cannot fail to be a sentence. */
    const stakes = plan.cards.map((entry) => `${ctx.stake(entry.index)}${locale === 'sk' && entry.orientation === 'reversed' ? ' (obrátená, teda v zmenenej podobe)' : ''}`);
    const insight = clean(`${locale === 'en' ? 'In order, the three cards put forward' : 'Karty v poradí otvárajú tieto témy'}: ${stakes.join('; ')}.`);
    const answering = plan.synthesis.responseRole ?? plan.cards[plan.cards.length - 1].responseRole;
    const practical = intention.takeaway[TAKEAWAY_GROUP_OF[answering]][locale];
    /* One closing question, and it is the intention's own: a card's generic question would leave the area it is being asked in. */
    const question = intention.closings[delivery.seed % intention.closings.length][locale];
    const rawTakeaway = clean([insight, practical].filter((part) => part.length > 0).join(' '));
    /* Said once: a sentence the reading has already said (the voice's note on what a reversal means is the one that comes up twice) stays where it was first said. */
    const kept = withoutRepeats([...rawCards.map((card) => card.paragraphs), synthesisParagraphs, rawTakeaway.length > 0 ? [rawTakeaway] : []]);
    const cards = rawCards.map((card, index) => ({ ...card, paragraphs: kept[index] }));
    const synthesisKept = kept[rawCards.length];
    const takeawayParagraphs = [...kept[rawCards.length + 1], question].filter((part) => part.length > 0);
    const opening = intention.opening[locale];
    const text = [
        opening,
        ...cards.flatMap((card) => [card.positionLabel, card.ask, ...card.paragraphs]),
        ...synthesisKept,
        ...takeawayParagraphs,
    ].join('\n\n');
    const written = [...cards.flatMap((card) => card.paragraphs), ...synthesisKept, ...takeawayParagraphs].join('\n\n');
    return {
        contentVersion: TAROT_CONTENT_VERSION,
        locale,
        areaId: area.id,
        intentionId: intention.id,
        spreadId: start.spread.id,
        areaLabel: area.label[locale],
        intentionLabel: intention.label[locale],
        opening,
        cards,
        synthesis: { title: voice.sectionTitles.synthesis, paragraphs: synthesisKept },
        takeaway: { title: voice.sectionTitles.takeaway, paragraphs: takeawayParagraphs },
        text,
        plan,
        checks: {
            epistemic: auditReadingText(written, locale, []),
            generic: genericHits(written, locale),
            guided: auditGuidedText(written, locale),
        },
    };
}
