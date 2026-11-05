import { fillReaderLine, readerCard } from '../content/reader/tarotCardReader.js?v=53c0693';
import { TAROT_VOICE_EN } from '../content/tarotVoiceEn.js?v=53c0693';
import { TAROT_VOICE_SK } from '../content/tarotVoiceSk.js?v=53c0693';
import { reversedLineEn, reversedRiskLineEn } from '../content/reader/reversedLinesEn.js?v=53c0693';
import { TAROT_REVERSED_ASKS_EN, TAROT_REVERSED_STAKES_EN } from '../content/reader/readerReversedStakesEn.js?v=53c0693';
import { orientedCardVoice } from '../content/tarotVoice.js?v=53c0693';
import { interpretReading, planDelivery } from './readerInterpretation.js?v=53c0693';
export const cardPhrases = (voice, plan, index) => orientedCardVoice(voice.cards[plan.cards[index].cardId], plan.cards[index].card, voice.orientation);
export const cardTitle = (voice, plan, index) => voice.orientation.title(voice.cardTitles[plan.cards[index].cardId], plan.cards[index].orientation);
export const cardName = (voice, plan, index) => voice.cardTitles[plan.cards[index].cardId];
export const contextFor = (voice, plan, labels, locale = 'en', interpretation = interpretReading(plan), delivery = planDelivery(plan, interpretation)) => ({
    plan,
    labels,
    phrases: (index) => cardPhrases(voice, plan, index),
    title: (index) => cardTitle(voice, plan, index),
    name: (index) => cardName(voice, plan, index),
    locale,
    interpretation,
    delivery,
    line: (index, group) => {
        /* A reversed card is read as itself from its first word in English; Slovak keeps its own (frozen) lines. */
        if (locale === 'en' && plan.cards[index].orientation === 'reversed') {
            const id = plan.cards[index].cardId;
            return plan.cards[index].fn === 'criterion' ? reversedRiskLineEn(cardTitle(voice, plan, index), id) : reversedLineEn(group, cardTitle(voice, plan, index), id);
        }
        const raw = readerCard(plan.cards[index].cardId, locale)?.lines[group];
        /* The English lines were written for places in a spread; a reading says "underneath", not "in the underlying place". Slovak keeps its own. */
        const template = raw !== undefined && locale === 'en' ? raw.replace(/\{card\} in the underlying place /, '{card}, underneath, ') : raw;
        return template === undefined ? null : fillReaderLine(template, cardTitle(voice, plan, index), locale);
    },
    stake: (index) => (locale === 'en' && plan.cards[index].orientation === 'reversed'
        ? TAROT_REVERSED_STAKES_EN[plan.cards[index].cardId]
        : readerCard(plan.cards[index].cardId, locale)?.stake ?? cardPhrases(voice, plan, index).tag),
    ask: (index) => (locale !== 'en' ? ''
        : plan.cards[index].orientation === 'reversed' ? TAROT_REVERSED_ASKS_EN[plan.cards[index].cardId]
            : voice.cards[plan.cards[index].cardId].asks),
    question: (index) => readerCard(plan.cards[index].cardId, locale)?.question ?? '',
});
export { TAROT_VOICE_EN, TAROT_VOICE_SK };
