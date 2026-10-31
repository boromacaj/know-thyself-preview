import { t } from '../../../i18n/uiStrings.js?v=b5ef5ed';
import { positionMeaningFor } from './index.js?v=b5ef5ed';
/**
 * WHAT THE MEANING SHEET SAYS, as data.
 *
 * The sheet (numerologyMeaningSheet.ts) only draws this. Keeping the content as a pure function of a record and the registry's headline
 * means the words a reader sees on a phone and the words in the editorial review corpus are the same words by construction, and a test
 * can read exactly what the sheet will say without a browser.
 */
export const POSITION_LABEL = {
    'life-path': 'Life Path',
    expression: 'Expression',
    'soul-urge': 'Soul Urge',
    personality: 'Personality',
};
/** What each position answers, in one line, under the heading. */
export const POSITION_QUESTION = {
    'life-path': 'The long shape of a life',
    expression: 'What you were equipped with',
    'soul-urge': 'What feels worth doing, privately',
    personality: 'What people meet first',
};
export const SHEET_FOOTER = 'A symbolic reading to reflect on, not a measurement or a prediction.';
const POSITIONS = ['life-path', 'expression', 'soul-urge', 'personality'];
export function dialogChrome(locale = 'en') {
    if (locale === 'en') {
        return { position: POSITION_LABEL, question: POSITION_QUESTION, strengths: 'Strengths', tensions: 'Tensions', shows: 'How it can show up', ask: 'A question to carry', footer: SHEET_FOOTER };
    }
    const table = (prefix) => Object.fromEntries(POSITIONS.map((position) => [position, t(`numerology.sheet.${prefix}.${position}`, locale)]));
    return {
        position: table('pos'),
        question: table('ask'),
        strengths: t('numerology.sheet.strengths', locale),
        tensions: t('numerology.sheet.tensions', locale),
        shows: t('numerology.sheet.shows', locale),
        ask: t('numerology.sheet.question', locale),
        footer: t('numerology.sheet.footer', locale),
    };
}
/**
 * `translated` is the same record's text in the reader's language (the Slovak drafts, loaded on demand by the sheet); the record
 * supplies the identity (id, position, number) and, for English, the text. A language with no draft for the pair reads the English one:
 * the words are never mixed inside a block.
 */
export function dialogContentFor(record, headline, locale = 'en', translated = null) {
    const chrome = dialogChrome(locale);
    const label = chrome.position[record.position];
    const text = locale !== 'en' && translated
        ? { intro: translated.intro, meaning: translated.meaning, strengths: translated.strengths, challenges: translated.challenges, shows: translated.shows, ask: translated.ask, master: translated.master }
        : { intro: record.intro, meaning: record.meaning, strengths: record.strengths, challenges: record.challenges, shows: record.manifestations, ask: record.reflection, master: record.masterNote };
    const blocks = [
        { kind: 'intro', text: text.intro },
        { kind: 'meaning', text: text.meaning },
        { kind: 'list', heading: chrome.strengths, items: text.strengths },
        { kind: 'list', heading: chrome.tensions, items: text.challenges },
        { kind: 'list', heading: chrome.shows, items: text.shows },
        { kind: 'question', text: text.ask },
    ];
    if (text.master)
        blocks.push({ kind: 'note', text: text.master });
    return {
        id: record.id,
        position: record.position,
        number: record.number,
        accent: record.position === 'life-path' ? 'gold' : 'blue',
        eyebrow: `${label} · ${chrome.question[record.position]}`,
        title: headline ?? `${label} ${record.number}`,
        askLabel: chrome.ask,
        blocks,
    };
}
/** The lookup the sheet performs: position and number in, content out (or null when the pair has no record). */
export function dialogContentForPair(position, number, headline, locale = 'en', translated = null) {
    const record = positionMeaningFor(position, number);
    return record ? dialogContentFor(record, headline, locale, translated) : null;
}
/** The sheet's text as plain lines, the way the review corpus prints it. */
export function dialogPlainText(content) {
    const lines = [`${content.number}  ${content.eyebrow.toUpperCase()}`, content.title, ''];
    for (const block of content.blocks) {
        if (block.kind === 'list') {
            lines.push(block.heading.toUpperCase(), ...block.items.map((item) => `  - ${item}`), '');
        }
        else if (block.kind === 'question') {
            lines.push(`${content.askLabel}: ${block.text}`, '');
        }
        else {
            lines.push(block.text, '');
        }
    }
    return lines.join('\n').trimEnd();
}
