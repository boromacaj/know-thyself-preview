import { SUPPORTED_LOCALES, isLocale, activeLocale } from '../../i18n/locale.js';
import { TAROT_CONTENT_VERSION } from '../content/tarotSemantics.js';
import { auditReadingText } from './questionEpistemics.js';
import { SAFETY_NOTICES } from './questionSafety.js';
import { excerptOf } from './questionText.js';
import { QUESTION_VOICE_EN } from './questionVoiceEn.js';
import { QUESTION_VOICE_SK } from './questionVoiceSk.js';
import { TAROT_VOICE_EN, TAROT_VOICE_SK, contextFor } from './questionVoice.js';
import { buildReadingDocument } from './readingDocument.js';
import { genericHits } from './readerQuality.js';
import { interpretReading, planDelivery } from './readerInterpretation.js';
import { buildQuestionReadingPlan } from './readingPlan.js';
import { newKindLedger } from '../content/tarotCardKindEn.js';
import { cardPositionOf } from '../content/tarotCardPositionsEn.js';
import { composeCardSection } from '../content/tarotCardSectionEn.js';
const VOICES = { en: QUESTION_VOICE_EN, sk: QUESTION_VOICE_SK };
/** The clauses that label the shape of a spread or the mix of its elements, left out of the English card-first synthesis (see where it is read). */
const SHAPE_LABELS = new Set(['arc', 'flow', 'theme-movement', 'element']);
const CARD_VOICES = { en: TAROT_VOICE_EN, sk: TAROT_VOICE_SK };
export const resolveLocale = (locale) => (locale !== undefined && isLocale(locale) ? locale : activeLocale());
export function noticeFor(selection, locale) {
    const parts = selection.safety.notices.map((flag) => SAFETY_NOTICES[flag][locale]);
    return parts.length > 0 ? parts.join(' ') : null;
}
export function composeQuestionReading(intent, selection, drawn, locale, options = {}) {
    const plan = buildQuestionReadingPlan(intent, selection, drawn);
    if (!plan || !selection.spread)
        return null;
    const language = resolveLocale(locale);
    const voice = VOICES[language];
    const labels = selection.spread.positions.map((position) => position.label[language]);
    const interpretation = interpretReading(plan);
    const delivery = planDelivery(plan, interpretation);
    const context = contextFor(CARD_VOICES[language], plan, labels, language, interpretation, delivery);
    const document = buildReadingDocument(plan, interpretation, delivery);
    const cardFirst = language === 'en' && options.layout !== 'legacy';
    const ledger = newKindLedger(plan.cards.map((entry) => entry.cardId));
    const cards = [];
    const sections = document.sections.map((section) => {
        const title = section.id === 'framing' ? voice.sectionTitles.framing
            : section.id === 'synthesis' ? voice.sectionTitles.synthesis
                : section.id === 'takeaway' ? voice.sectionTitles.takeaway
                    : labels[section.index];
        /* Card first: a position is the card explained, then read in its place - nothing relates it to another card yet. */
        if (cardFirst && 'index' in section) {
            const index = section.index;
            const entry = plan.cards[index];
            const position = selection.spread.positions[index];
            const card = composeCardSection({ position: cardPositionOf(position.id, position.fn, position.label.en), cardId: entry.cardId, orientation: entry.orientation }, ledger);
            cards.push(card);
            return { id: section.id, title: `${labels[index]}: ${card.title}`, text: card.paragraphs.join(' ').replace(/\s+/g, ' ').trim() };
        }
        /* ... and the orientation says nothing about the spread as a whole (what stands out in it) before the cards have been explained. */
        const clauses = !cardFirst ? section.clauses
            : section.id === 'framing' ? section.clauses.filter((clause) => clause.k !== 'opening' && clause.k !== 'reversal-note')
                /* What the cards fit together in is said by what they are and by how they relate. A label for the shape of the spread ("the weight of it builds towards the end", "the cards lean
                   towards settling") and a remark on the elements ("fire and water ... can steady each other or cancel each other out") name a pattern without saying what is in it. */
                : section.id === 'synthesis' ? section.clauses.filter((clause) => !SHAPE_LABELS.has(clause.k))
                    : section.clauses;
        const text = clauses.map((clause) => voice.render(clause, context)).filter((part) => part.length > 0).join(' ')
            .replace(/\s+/g, ' ').trim();
        return { id: section.id, title, text };
        /* A section whose every clause had nothing to say (an English synthesis that was only a relation sentence a reversed card made empty) is not shown as a heading with no words. */
    }).filter((section) => section.text.length > 0);
    const text = sections.map((section) => section.text).join('\n\n');
    const quotes = plan.question.excerpt === null ? [] : [`\u201C${plan.question.excerpt}\u201D`, `\u201E${plan.question.excerpt}\u201C`];
    /* What is checked is what the Reader wrote: the person's own quoted words are theirs. */
    let written = text;
    for (const quote of quotes)
        written = written.split(quote).join(' ');
    return {
        contentVersion: TAROT_CONTENT_VERSION,
        locale: language,
        spreadId: selection.spread.id,
        mode: selection.mode,
        notice: noticeFor(selection, language),
        sections,
        cards: cardFirst ? cards : null,
        text,
        plan,
        document,
        interpretation,
        delivery,
        checks: { epistemic: auditReadingText(text, language, quotes), generic: genericHits(written, language) },
    };
}
/** The place names and what each asks, in a language: what a screen shows before the cards are drawn. */
export function describeBeforeDraw(intent, selection, locale) {
    if (selection.status !== 'ready' || !selection.spread)
        return null;
    const language = resolveLocale(locale);
    const quote = selection.safety.quoteQuestion && intent.normalizedQuestion.length > 0 ? intent.normalizedQuestion : null;
    return VOICES[language].preDraw({
        excerpt: quote === null ? null : excerptOf(quote, 140),
        spreadId: selection.spread.id,
        mode: selection.mode ?? 'classic',
        category: intent.category,
        yesNo: intent.questionForm === 'yes-no',
        positions: selection.spread.positions.map((position) => ({
            label: position.label[language], description: position.description[language],
        })),
    });
}
export { SUPPORTED_LOCALES };
