import { activeLocale } from '../../../i18n/locale.js?v=f9ab0a6';
import { READER_CARDS } from './readerCards.js?v=f9ab0a6';
/**
 * THE READER LAYER'S PUBLIC DOOR.
 *
 * What a screen needs, without knowing how the cards are stored:
 *
 *   readerDescription(card)   the 80-160 word archetype description, for a card page
 *   readerEssence(card)       the one-sentence version, for a tight space
 *   readerQuestion(card)      the one question the card poses
 *
 * Nothing here reads a position or a question; those belong to the reading. A card's
 * description is what the card is in general, and a reading never pastes it (a card in a
 * place is read through its `lines`, which is the point of the layer).
 */
/** The card's reader text in a language, or null for an unknown card. */
export function readerCard(cardId, locale = activeLocale()) {
    return READER_CARDS[cardId]?.[locale] ?? null;
}
export const readerDescription = (cardId, locale = activeLocale()) => readerCard(cardId, locale)?.description ?? null;
export const readerEssence = (cardId, locale = activeLocale()) => readerCard(cardId, locale)?.essence ?? null;
export const readerQuestion = (cardId, locale = activeLocale()) => readerCard(cardId, locale)?.question ?? null;
export const readerStake = (cardId, locale = activeLocale()) => readerCard(cardId, locale)?.stake ?? null;
/** A line template for a card in a kind of place, placeholders still in it. */
export const readerLineTemplate = (cardId, group, locale = activeLocale()) => readerCard(cardId, locale)?.lines[group] ?? null;
/**
 * Fills a line's one placeholder. `title` is the card's name for a sentence that is about the
 * card in its place, with its reversal mark when it has one.
 */
export function fillReaderLine(template, title, locale) {
    /*
     * Slovak lines put a verb in the third person singular after the card, and a title can be plural ("Zaľúbenci") or
     * can read as a name: the subject is always the word "karta" with the title beside it, so nothing has to agree.
     */
    const named = locale === 'sk' ? `karta ${title}` : title;
    const subject = named.charAt(0).toUpperCase() + named.slice(1);
    /* English names a Major with "The", which reads as "the" inside a sentence; every other title is unchanged. */
    const inline = locale === 'en' ? named.replace(/^The /, 'the ') : named;
    return template.replace('{card}', subject).replace('{mid}', inline);
}
