/**
 * HOW A QUESTION BECOMES SAFE TO HANDLE.
 *
 * A question is typed by a person and read by code, and everything that follows
 * treats it as inert data. These functions are the one place that makes that
 * true: they remove what cannot be shown or compared (control and zero-width
 * characters, bidirectional overrides that make text read in a different order
 * than it is stored), bound its length, and produce the folded form the cue
 * matching works on.
 *
 * NOTHING HERE LOOKS FOR "ATTACKS". There is no list of forbidden phrases to
 * evade, because the question is never executed, interpreted as a command or
 * handed to a model: the worst a hostile sentence can do is match a cue, and the
 * cues only choose between fixed rules. Stripping invisible characters is about
 * display integrity, not about security theatre.
 */
export const MAX_QUESTION_CHARS = 600;
/** Controls, format characters (zero-width, bidi marks and overrides), and the line/paragraph separators. */
const INVISIBLE = /[\p{Cc}\p{Cf}\p{Zl}\p{Zp}]/gu;
/** Anything in a question that could confuse the quotation marks or markup it is shown inside. */
/* The grave accent is written as an escape (backslash, u, 0060), not typed: a raw one inside a regular expression is read as the start of a template literal by the shipped-surface source audits. Same character class, same behaviour. */
const QUOTE_BREAKERS = /["'\u0060“”„‚‘’«»<>{}]/g;
/**
 * The question as the pipeline sees it.
 *
 * Accepts anything - the caller may hand over a form value of any type - and
 * returns a string. Newlines and tabs become spaces first, so a multi-line
 * paste reads as one line rather than losing its word breaks.
 */
export function sanitizeQuestion(raw) {
    if (typeof raw !== 'string')
        return '';
    const spaced = raw.replace(/[\t\r\n\p{Zl}\p{Zp}]+/gu, ' ');
    const cleaned = spaced.normalize('NFC').replace(INVISIBLE, '').replace(/\s+/g, ' ').trim();
    if (cleaned.length <= MAX_QUESTION_CHARS)
        return cleaned;
    /* Cut at the last word boundary inside the bound, so a quoted question never ends mid-word. */
    const cut = cleaned.slice(0, MAX_QUESTION_CHARS);
    const space = cut.lastIndexOf(' ');
    return (space > MAX_QUESTION_CHARS * 0.6 ? cut.slice(0, space) : cut).trim();
}
/**
 * Lower case, diacritics removed, every non-letter and non-digit a single space.
 *
 * Slovak is matched through this form (`čo` and `co` are the same cue), which is
 * what lets one lexicon serve people who type with and without a háček. The
 * result is space-separated, so a cue can be tested as a whole word or as a word
 * prefix with plain string search.
 */
export function foldText(text) {
    return text
        .normalize('NFD')
        .replace(/\p{M}+/gu, '')
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, ' ')
        .trim();
}
/** Padded with one space each side so `' word '` finds whole words at the edges. */
export const padded = (folded) => ` ${folded} `;
/**
 * What a question can carry that a reading has no reason to repeat: an address, a link, a long run of digits
 * (a phone number, an account, an identifier). They are replaced by an ellipsis wherever the question is shown back.
 */
const IDENTIFIERS = /[\w.+-]+@[\w-]+\.[\w.-]+|(?:https?:\/\/|www\.)\S+|\+?\d[\d\s().-]{6,}\d/gu;
export const redactIdentifiers = (text) => text.replace(IDENTIFIERS, '\u2026');
/**
 * A fragment of the question fit to be shown back inside quotation marks.
 *
 * Quote-like characters and angle brackets are dropped rather than escaped: the
 * excerpt is placed between quotation marks the voice supplies, and a stray
 * quote inside it would end that quotation early. A cut is marked with an
 * ellipsis.
 */
export function excerptOf(text, max) {
    const clean = redactIdentifiers(text).replace(QUOTE_BREAKERS, '').replace(/\s+/g, ' ').trim();
    if (clean.length <= max)
        return clean;
    const cut = clean.slice(0, max);
    const space = cut.lastIndexOf(' ');
    return `${(space > max * 0.5 ? cut.slice(0, space) : cut).trim()}…`;
}
