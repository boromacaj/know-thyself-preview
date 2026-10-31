import { activeLocale, isLocale } from '../../i18n/locale.js?v=b5ef5ed';
import { TAROT_CONTENT_VERSION } from '../content/tarotSemantics.js?v=b5ef5ed';
import { auditReadingText } from '../question/questionEpistemics.js?v=b5ef5ed';
import { QUESTION_VOICE_EN } from '../question/questionVoiceEn.js?v=b5ef5ed';
import { QUESTION_VOICE_SK } from '../question/questionVoiceSk.js?v=b5ef5ed';
import { TAROT_VOICE_EN, TAROT_VOICE_SK, contextFor } from '../question/questionVoice.js?v=b5ef5ed';
import { genericHits } from '../question/readerQuality.js?v=b5ef5ed';
import { buildReadingDocument } from '../question/readingDocument.js?v=b5ef5ed';
import { interpretReading, planDelivery } from '../question/readerInterpretation.js?v=b5ef5ed';
import { buildQuestionReadingPlan } from '../question/readingPlan.js?v=b5ef5ed';
import { guidedStartFor } from './guidedAdapter.js?v=b5ef5ed';
import { guidedReadsFor } from './guidedReads.js?v=b5ef5ed';
import { reversedLineEn } from '../content/reader/reversedLinesEn.js?v=b5ef5ed';
import { reversedLineSk } from '../content/reader/reversedLinesSk.js?v=b5ef5ed';
import { auditGuidedText } from './guidedAudit.js?v=b5ef5ed';
import { TAKEAWAY_GROUP_OF } from './guidedTypes.js?v=b5ef5ed';
const VOICES = { en: QUESTION_VOICE_EN, sk: QUESTION_VOICE_SK };
const CARD_VOICES = { en: TAROT_VOICE_EN, sk: TAROT_VOICE_SK };
/** The reversed English frames put a Major's title after a comma ("Right now, The Fool reversed amounts to ..."): there the article is not a capital. */
const midSentenceThe = (text) => text.replace(/([,;:] )The (?=[A-Z])/g, '$1the ');
const clean = (text) => text.replace(/\s+/g, ' ').trim();
/**
 * A sentence the reading has already said is not said again. The first time it is said stays, a later one is dropped. The comparison is of whole sentences, so nothing a card says is ever shortened.
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
/**
 * THE UPRIGHT CARDS WHOSE OWN MEANING IS A DIFFICULTY.
 *
 * A frame "under strain" beside a card is only right if the card is hard. The engine's movement and strain flags are too wide for that (the Ace of Swords "disrupts" by cutting through to a clear
 * thing; the Fool and the Ace of Wands are "volatile"), so the register is read from the card itself: a reversed card is one whose expression has gone awry, and these thirteen upright cards are the ones
 * whose upright picture is itself a hard one. Nothing else is read as strained.
 */
const HARD_UPRIGHT = new Set([
    'major-tower', 'major-devil', 'wands-ten', 'cups-four', 'cups-five', 'swords-three', 'swords-five', 'swords-eight', 'swords-nine', 'swords-ten', 'swords-knight', 'pentacles-four', 'pentacles-five',
]);
export const readsAsStrained = (entry) => entry.orientation === 'reversed' || HARD_UPRIGHT.has(entry.cardId);
/**
 * Two of a card's approved sentences that say nearly the same thing (a card's origin line and driver line both quote its one stake) are one sentence, not two: the second is dropped when most of
 * its words are already in the first.
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
/**
 * ONE CARD'S PARAGRAPHS: what the card says in this place, then what a card like it is about in this place for this intention.
 *
 * What the card says is the sentences of its own that THIS intention asks of this place (guidedReads.ts), or the engine's own lead where none is named, with a note on who the court card is and what it does to the
 * card before it. The engine's "here the reading settles" links are not carried (they say only the order of the spread) and neither is its note on what a reversal is (a reversed card is read as itself).
 */
function positionParagraphs(start, plan, ctx, voice, clauses, index, locale) {
    const entry = plan.cards[index];
    const groups = guidedReadsFor(start.intention.id)?.[index] ?? null;
    const beside = clauses
        .filter((clause) => clause.k === 'court' || clause.k === 'relation' || clause.k === 'cost' || (groups === null && clause.k === 'lead'))
        .map((clause) => voice.render(clause, ctx))
        .filter((text) => text.length > 0);
    /* A reversed card is read from its own reversed sentences for the group asked; the engine's helper answers a criterion place with a one-line caution instead, which says nothing in a place that reads for another group. */
    const lineOf = (group) => (entry.orientation === 'reversed'
        ? midSentenceThe((locale === 'en' ? reversedLineEn : reversedLineSk)(group, ctx.title(index), entry.cardId))
        : ctx.line(index, group));
    /* A reversed card has ONE stake whatever the place: a second group would say it again in other words, so after the first group only the one that adds something of its own (what the card asks) is read. */
    const readGroups = groups === null ? [] : entry.orientation === 'reversed' ? groups.filter((group, position) => position === 0 || group === 'response') : groups;
    const lines = readGroups.map(lineOf).filter((line) => typeof line === 'string' && line.length > 0);
    const own = clean([...distinctLines(lines), ...beside].filter((part) => part.length > 0).join(' '));
    const frame = clean(start.intention.places[index].frame[readsAsStrained(entry) ? 'strained' : 'steady'][locale]);
    return [own, frame].filter((paragraph) => paragraph.length > 0);
}
/**
 * WHICH OF THE ENGINE'S SENTENCES ABOUT THE WHOLE EARN A PLACE.
 *
 * The engine finds many things about a spread; most are true of nearly every spread ("there is no Major Arcana here") or only name a shape ("the sequence turns where two cards meet") and say nothing about this one. A sentence
 * is said only if it carries something the cards actually do: two cards that disagree, the pair the reading turns on, a pair that agrees, what one side does to the other. After those, at most one sentence about the weight of the
 * whole: the suit that leads (the engine words it for the kind of life area). A movement the cards share and a clash of elements are not said: both can be put in one non-committal sentence that fits every draw. Everything else is left unsaid.
 */
const RELATIONAL = ['tension', 'hinge', 'agree', 'meeting-acts', 'tradeoff'];
const WEIGHT = ['theme-suit'];
function chosenSynthesisClauses(clauses, intention, plan) {
    const usable = clauses
        /* Two pulls held side by side are not ranked: the sentence that says which carries more force would contradict a reading whose point is that it names no winner. */
        .filter((clause) => !(intention.semantics.reflection === 'weigh' && clause.k === 'tradeoff' && clause.dimension === 'force'))
        /* The card said to be the steadier of two is not one that reads as strained. */
        .filter((clause) => !(clause.k === 'tradeoff' && clause.dimension === 'steadiness' && readsAsStrained(plan.cards[clause.first])));
    const relational = RELATIONAL.flatMap((kind) => usable.filter((clause) => clause.k === kind)).slice(0, 2);
    /* "Two of the three cards are Cups" is a count, and a count is not a finding: the suit is said only when it is every card's, which is something the draw does to the reading. */
    const weight = WEIGHT.flatMap((kind) => usable.filter((clause) => clause.k === kind && (clause.k !== 'theme-suit' || clause.count >= clause.total))).slice(0, 1);
    return [...relational, ...weight];
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
            paragraphs: positionParagraphs(start, plan, ctx, voice, clauses, entry.index, locale),
        };
    });
    /* The whole: the few relations between these cards that the engine found worth saying, then what the weight of the deck says in this area. */
    const synthesisSection = document.sections.find((candidate) => candidate.id === 'synthesis');
    const engineSynthesis = chosenSynthesisClauses(synthesisSection && 'clauses' in synthesisSection ? synthesisSection.clauses : [], intention, plan)
        .map(render).filter((part) => part.length > 0);
    const heavy = plan.patterns.total >= 3 && (plan.patterns.majorDensity === 'all' || plan.patterns.majorDensity === 'most') ? [area.lens.majorWeight[locale]] : [];
    const synthesisParagraphs = [clean(engineSynthesis.join(' ')), clean(heavy.join(' '))].filter((paragraph) => paragraph.length > 0);
    /* The close: the engine's conclusion for this spread (made of these cards' own words and the structure they make), then what the card that answers asks of this intention, then the intention's closing question for that kind of card. */
    const takeawaySection = document.sections.find((candidate) => candidate.id === 'takeaway');
    const takeawayClauses = takeawaySection && 'clauses' in takeawaySection ? takeawaySection.clauses : [];
    const conclusion = clean(takeawayClauses.filter((clause) => clause.k === 'insight').map(render).join(' '));
    const answering = plan.synthesis.responseIndex ?? plan.cards.length - 1;
    const group = TAKEAWAY_GROUP_OF[plan.synthesis.responseRole ?? plan.cards[answering].responseRole];
    const rawTakeaway = clean([conclusion, intention.takeaway[group][locale]].filter((part) => part.length > 0).join(' '));
    const question = intention.closings[group][locale];
    /* Said once: a sentence the reading has already said stays where it was first said. */
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
