import { activeLocale, pickLocalized } from '../../i18n/locale.js';
import { planTarotNarrative, } from './tarotNarrativePlan.js';
import { TAROT_CONTENT_VERSION } from './tarotSemantics.js';
import { TAROT_READING_SECTION_IDS, } from './tarotVoice.js';
import { TAROT_VOICE_EN } from './tarotVoiceEn.js';
import { composeCardFirstDaily } from './tarotCardFirstDailyEn.js';
import { TAROT_VOICE_SK } from './tarotVoiceSk.js';
const voiceFor = () => pickLocalized({ en: TAROT_VOICE_EN, sk: TAROT_VOICE_SK });
/**
 * Which sections this plan actually has, and who renders each.
 *
 * The Jumper section is present only when one was accepted. It is skipped rather
 * than rendered empty, because a heading over nothing tells a reader that
 * something is missing when in fact nothing is.
 */
function sectionsFor(voice, plan) {
    const render = {
        opening: voice.opening,
        energy: voice.energy,
        factor: voice.factor,
        guidance: voice.guidance,
        jumper: voice.jumperSection,
        'in-short': voice.inShort,
    };
    return TAROT_READING_SECTION_IDS
        .filter((id) => id !== 'jumper' || plan.jumper !== null)
        .map((id) => ({
        id,
        title: voice.sectionTitles[id],
        text: render[id](plan).replace(/\s+/g, ' ').trim(),
    }));
}
/**
 * The reading, or null when a card in the spread has no model at this content
 * version. Never throws: a caller holding a spread drawn under a future deck
 * must degrade rather than crash.
 */
/**
 * The card-first reading as sections: one per card (title "Energy: Page of Cups reversed", the three paragraphs), the card that jumped when there is one,
 * then the synthesis and the takeaway. There is no section that speaks about the three before they have been explained.
 */
function cardFirstSections(reading) {
    const sections = reading.cards.map((card) => ({
        id: card.positionId,
        title: `${card.positionName}: ${card.title}`,
        text: card.paragraphs.join(' ').replace(/\s+/g, ' ').trim(),
    }));
    if (reading.jumper)
        sections.push({ id: 'jumper', title: reading.jumper.title, text: reading.jumper.text });
    sections.push({ id: 'synthesis', title: reading.synthesis.title, text: reading.synthesis.paragraphs.join(' ').replace(/\s+/g, ' ').trim() });
    sections.push({ id: 'takeaway', title: reading.takeaway.title, text: reading.takeaway.text.replace(/\s+/g, ' ').trim() });
    return sections;
}
/** The reading for a plan that has already been built. Used by the audit. */
export function composeTarotReadingFromPlan(plan, options = {}) {
    /* English reads card first; any other language keeps the legacy sections and no card-first structure. */
    const cardFirst = activeLocale() === 'en' && options.layout !== 'legacy' ? composeCardFirstDaily(plan) : null;
    const sections = cardFirst ? cardFirstSections(cardFirst) : sectionsFor(voiceFor(), plan);
    return {
        contentVersion: TAROT_CONTENT_VERSION,
        cardIds: plan.cardIds,
        plan,
        sections,
        text: sections.map((section) => section.text).join('\n\n'),
        cardFirst,
    };
}
export function composeTarotReading(spread, jumper, options = {}) {
    const plan = planTarotNarrative(spread, jumper);
    if (!plan)
        return null;
    return composeTarotReadingFromPlan(plan, options);
}
