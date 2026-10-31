import { bigThreeMeaningFor } from './index.js?v=b5ef5ed';
/**
 * WHAT THE BIG THREE SHEET SAYS, as data.
 *
 * The sheet (astrologyBigThreeSheet.ts) only draws this. Keeping the content as a pure function of a record and what the engine knows about the birth time
 * means the words a reader sees on a phone and the words in the editorial review corpus are the same words by construction, and a test can read exactly what the
 * sheet will say without a browser.
 */
export const PLACEMENT_LABEL = {
    sun: 'Sun sign',
    moon: 'Moon sign',
    ascendant: 'Ascendant',
};
/** What each placement answers, in one line, under the heading. */
export const PLACEMENT_QUESTION = {
    sun: 'Who you are becoming',
    moon: 'What you need to feel safe',
    ascendant: 'How you arrive',
};
export const SHEET_FOOTER = 'A symbolic reading to reflect on, not a measurement or a prediction.';
const ACCENT = { sun: 'gold', moon: 'blue', ascendant: 'mist' };
const NAMES = {
    aries: 'Aries', taurus: 'Taurus', gemini: 'Gemini', cancer: 'Cancer', leo: 'Leo', virgo: 'Virgo',
    libra: 'Libra', scorpio: 'Scorpio', sagittarius: 'Sagittarius', capricorn: 'Capricorn', aquarius: 'Aquarius', pisces: 'Pisces',
};
const list = (names) => (names.length <= 1 ? (names[0] ?? '')
    : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`);
/** The notes that go with a placement and a certainty. Never empty for an Ascendant: it always depends on the time and the place. */
function notesFor(record, context) {
    const notes = [];
    const word = record.placement === 'ascendant' ? 'Ascendant' : record.placement === 'moon' ? 'Moon' : 'Sun';
    if (record.placement === 'ascendant') {
        notes.push('The Ascendant is the sign rising on the eastern horizon at the moment and place of birth. It moves through all twelve signs in a day, so it is only as reliable as the birth time it was calculated from.');
    }
    const state = context.state ?? 'known';
    const others = (context.alternatives ?? []).map((sign) => NAMES[sign.toLowerCase()] ?? sign);
    if (context.wholeDay && record.placement !== 'ascendant') {
        notes.push(`No birth time is known. The ${word} stays in ${NAMES[record.sign]} for the whole day of birth, so its sign is certain; where in the sign it stands depends on the hour.`);
    }
    else if (state === 'boundary' && others.length > 1) {
        notes.push(`The birth time is approximate, and across that window the ${word} was in ${list(others)}. The sign shown is the one at the moment calculated; the others are as possible.`);
    }
    else if (state === 'approximate') {
        notes.push(`The birth time is approximate; across it the ${word} stays in ${NAMES[record.sign]}.`);
    }
    return notes;
}
export function dialogContentFor(record, context = {}) {
    const facts = [
        { label: 'Element', value: record.element },
        { label: 'Modality', value: record.modality },
        { label: 'Ruling planet', value: record.traditionalRuler ? `${record.ruler} (traditionally ${record.traditionalRuler})` : record.ruler },
    ];
    const blocks = [
        { kind: 'intro', text: record.intro },
        { kind: 'meaning', text: record.meaning },
        { kind: 'facts', items: facts },
        { kind: 'list', heading: 'Strengths', items: record.strengths },
        { kind: 'list', heading: 'Tensions', items: record.challenges },
        { kind: 'list', heading: 'How it can show up', items: record.manifestations },
        { kind: 'question', text: record.reflection },
    ];
    for (const note of notesFor(record, context))
        blocks.push({ kind: 'note', text: note });
    return {
        id: record.id,
        placement: record.placement,
        sign: record.sign,
        signName: NAMES[record.sign],
        accent: ACCENT[record.placement],
        eyebrow: `${PLACEMENT_LABEL[record.placement]} · ${PLACEMENT_QUESTION[record.placement]}`,
        title: record.title,
        blocks,
    };
}
/** The lookup the sheet performs: placement and sign in, content out (null when the pair has no record, e.g. a sign the engine did not give). */
export function dialogContentForPair(placement, sign, context = {}) {
    const record = bigThreeMeaningFor(placement, sign);
    return record ? dialogContentFor(record, context) : null;
}
/**
 * THE ASCENDANT THE ENGINE WITHHOLDS. With no birth time there is no rising sign, and none is shown: not a sign, not a stand-in, not a guess. What the sheet says
 * instead is what the Ascendant is and what it needs, which is true whatever the chart is.
 */
export function withheldAscendantContent() {
    return {
        id: 'ascendant:withheld',
        placement: 'ascendant',
        sign: null,
        signName: 'Not calculated',
        accent: 'mist',
        eyebrow: `${PLACEMENT_LABEL.ascendant} · ${PLACEMENT_QUESTION.ascendant}`,
        title: 'Needs a birth time.',
        blocks: [
            { kind: 'meaning', text: 'The Ascendant is the sign rising on the eastern horizon at the moment you were born. It changes about every two hours, so it cannot be worked out from a date alone, and a guess would be wrong for most people.' },
            { kind: 'meaning', text: 'Without a birth time this reading shows your Sun and your Moon, which do not depend on it as strongly, and leaves the Ascendant out rather than filling it in. If you can find your birth time, for example on a birth certificate, adding it will give the Ascendant and the houses that follow from it.' },
        ],
    };
}
/** The sheet's text as plain lines, the way the review corpus prints it. */
export function dialogPlainText(content) {
    const lines = [`${content.signName.toUpperCase()}  ${content.eyebrow.toUpperCase()}`, content.title, ''];
    for (const block of content.blocks) {
        if (block.kind === 'list') {
            lines.push(block.heading.toUpperCase(), ...block.items.map((item) => `  - ${item}`), '');
        }
        else if (block.kind === 'facts') {
            lines.push(block.items.map((item) => `${item.label}: ${item.value}`).join('   |   '), '');
        }
        else if (block.kind === 'question') {
            lines.push(`A question to carry: ${block.text}`, '');
        }
        else {
            lines.push(block.text, '');
        }
    }
    return lines.join('\n').trimEnd();
}
