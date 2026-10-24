import { NUMEROLOGY_SIGNAL_NAME } from '../engineProse.js';
import { activeLocale } from '../locale.js';
import { ORDINAL_F, ORDINAL_M } from './vocabulary.js';
/*
 * NUMEROLOGY LABELS.
 *
 * The position names (Life Path, Soul Urge, Personal Year...) were kept in
 * English through the prose pass, as canonical names a reader could check
 * against another source. They are labels, not canonical system names, and a
 * Slovak reader meets them in a Slovak column - so they read in Slovak here.
 * The prose already glosses each one, so the two agree rather than compete.
 */
export const NUMEROLOGY_LABELS = {
    'Life Path': 'Životná cesta',
    'Life Path Number': 'Číslo životnej cesty',
    Expression: 'Vyjadrenie',
    'Soul Urge': 'Túžba duše',
    Personality: 'Osobnosť',
    /*
     * The three name-numerology signal names are DEFINED ONCE, in engineProse.ts,
     * because the appendix meets each of them twice: as the name of a row, which
     * is this table's job, and inside a value, where the name map prints
     * "Soul Urge Number 8: agency through ...". A second copy here would drift
     * from that one the first time either was corrected, and the row would end up
     * disagreeing with the sentence directly under it.
     */
    ...NUMEROLOGY_SIGNAL_NAME,
    Attitude: 'Postoj',
    'Attitude Number': 'Číslo postoja',
    Balance: 'Rovnováha',
    'Balance Number': 'Číslo rovnováhy',
    'Birth Day': 'Deň narodenia',
    'Birth Day Number': 'Číslo dňa narodenia',
    'Hidden Passion': 'Skrytá vášeň',
    'Hidden Passion Number': 'Číslo skrytej vášne',
    Maturity: 'Zrelosť',
    'Maturity Number': 'Číslo zrelosti',
    Challenge: 'Výzva',
    Challenges: 'Výzvy',
    Pinnacle: 'Vrchol',
    Pinnacles: 'Vrcholy',
    'Pinnacle age spans': 'Vekové rozpätia vrcholov',
    'Personal Year': 'Osobný rok',
    'Personal Year Number': 'Číslo osobného roka',
    'Personal Month': 'Osobný mesiac',
    'Personal Month Number': 'Číslo osobného mesiaca',
    'Personal Day': 'Osobný deň',
    'Personal Day Number': 'Číslo osobného dňa',
    'Karmic Lesson': 'Karmická lekcia',
    'Karmic Lessons': 'Karmické lekcie',
    'Karmic Debt': 'Karmický dlh',
    'Current chapter': 'Aktuálna kapitola',
    'Master number preserved': 'Zachované majstrovské číslo',
    'Final number': 'Výsledné číslo',
    'Final values': 'Výsledné hodnoty',
    'Component values': 'Zložkové hodnoty',
    'Present values': 'Prítomné hodnoty',
    'Missing values': 'Chýbajúce hodnoty',
    'Reduction steps': 'Kroky redukcie',
    'Raw input': 'Vstup bez úprav',
    'Normalized input': 'Normalizovaný vstup',
};
/* -------------------------------------------------------------------------- *
 * THE HEADINGS THE READING COMPOSES
 * -------------------------------------------------------------------------- */
/*
 * A heading over a sub-reading is a NAME WITH AN ENGINE VALUE BESIDE IT.
 *
 * `Personal Year 5` is this table's own row name and the number the engine
 * calculated; `Ages 15-23 — Pinnacle 11 and Challenge 7` is two of them and a
 * span. None of those is a fixed string, so none can be an entry above - and
 * none may be word-substituted either, because `vrchol` is masculine and
 * `výzva` feminine and an English frame with Slovak words dropped into it gets
 * the agreement wrong. Each is rebuilt from the same table the appendix uses,
 * so a heading and the row it summarises can never call a position two names.
 */
/** The positions a heading names as "<position> <number>". */
const TITLE_POSITION = [
    'Life Path', 'Expression', 'Soul Urge', 'Personality', 'Attitude',
    'Birth Day', 'Maturity', 'Balance', 'Hidden Passion',
    'Personal Year', 'Personal Month', 'Personal Day',
    'Karmic Lesson', 'Karmic Debt', 'Pinnacle', 'Challenge',
];
/* Built from the list rather than written out, so a position can never be
   spelled one way in the table and another way in the pattern. */
const POSITION_AND_NUMBER = new RegExp(`^(${TITLE_POSITION.join('|')}) (\\d+)$`);
/** "2 and 5" -> "2 a 5"; "2 and 5 and 7" -> "2, 5 a 7". Slovak lists one `a`. */
function numberList(english) {
    const values = english.split(' and ');
    if (values.length < 2)
        return values.join('');
    return `${values.slice(0, -1).join(', ')} a ${values[values.length - 1]}`;
}
/*
 * The stretch of years a chapter covers.
 *
 * The engine writes the span itself - "ages 15-23", "age 48+" - and the
 * composer capitalises it. The FIGURES are engine output and travel through
 * exactly as written; only the word in front of them is a name for a reader.
 * The fallback is the chapter's own name, which the UI dictionary already
 * supplies in Slovak, so it is passed through rather than rebuilt.
 */
function chapterSpan(text) {
    const range = text.match(/^Ages (\d+-\d+)$/);
    if (range)
        return `Vek ${range[1]}`;
    const open = text.match(/^Age (\d+\+)$/);
    if (open)
        return `Vek ${open[1]}`;
    return /^(prvá|druhá|tretia|štvrtá) kapitola$/.test(text) ? text : null;
}
/*
 * THE POSITIONS IN THE GENITIVE.
 *
 * `v pozíciách <name>` needs the genitive, and Slovak has no way to get there
 * from the nominative by rule - `vyjadrenie` keeps its shape, `deň narodenia`
 * becomes `dňa narodenia`, `túžba duše` becomes `túžby duše`. The reading built
 * this list from the nominative labels and printed `v pozíciách vyjadrenie a
 * deň narodenia`, which a Slovak reader parses but no Slovak writer would write.
 *
 * Only this one frame needs it. The other list in the same paragraph follows a
 * colon (`objavuje sa aj tu: túžba duše`), where the nominative is correct.
 */
const POSITION_GENITIVE = {
    'Life Path': 'životnej cesty',
    Expression: 'vyjadrenia',
    'Soul Urge': 'túžby duše',
    Personality: 'osobnosti',
    Attitude: 'postoja',
    Balance: 'rovnováhy',
    'Birth Day': 'dňa narodenia',
    'Hidden Passion': 'skrytej vášne',
    Challenge: 'výzvy',
    Maturity: 'zrelosti',
    Pinnacle: 'vrcholu',
    'Personal Year': 'osobného roka',
    'Personal Month': 'osobného mesiaca',
    'Personal Day': 'osobného dňa',
    'Karmic Lesson': 'karmickej lekcie',
    'Karmic Debt': 'karmického dlhu',
};
/**
 * A position name in the genitive, lower case, for the `v pozíciách ...` frame.
 *
 * MUST check the locale. It replaced a bare `label.toLowerCase()` in the
 * composer, so returning Slovak unconditionally would have printed `1 v
 * pozíciách vyjadrenia a dňa narodenia` into the ENGLISH reading - a silent
 * corruption of the locale this whole overlay exists to leave alone.
 *
 * Falls back to the lower-cased English label, both outside Slovak and for any
 * position this table does not name, so the sentence reads either way.
 */
export function positionGenitive(englishLabel) {
    const label = englishLabel.trim();
    if (activeLocale() !== 'sk')
        return label.toLowerCase();
    return POSITION_GENITIVE[label] ?? label.toLowerCase();
}
export const NUMEROLOGY_PATTERNS = [
    /* `vrchol` is masculine and `výzva` feminine, so the ordinal differs. */
    [/^(First|Second|Third|Fourth) Pinnacle$/, (m) => `${ORDINAL_M[m[1].toLowerCase()]} vrchol`],
    [/^(First|Second|Third|Fourth) Challenge$/, (m) => `${ORDINAL_F[m[1].toLowerCase()]} výzva`],
    /* `kapitola` is feminine, like `výzva`. */
    [/^(First|Second|Third|Fourth) chapter$/, (m) => `${ORDINAL_F[m[1].toLowerCase()]} kapitola`],
    /* "Personal Year 5" -> "Osobný rok 5". Null for a position the table above
       does not name, so a half-Slovak heading can never be produced. */
    [POSITION_AND_NUMBER, (m) => {
            const position = NUMEROLOGY_LABELS[m[1]];
            return position ? `${position} ${m[2]}` : null;
        }],
    /* A name can put two values level. The engine joins them with "and". */
    [/^Hidden Passion (\d+(?: and \d+)+)$/,
        (m) => `${NUMEROLOGY_LABELS['Hidden Passion']} ${numberList(m[1])}`],
    /*
     * THE CHAPTER HEADING - only its age span is left to do.
     *
     * The UI dictionary now writes the whole frame in Slovak ("Vrchol 11 a Výzva
     * 7"), so the position names arrive already translated and this pattern must
     * not touch them. What the dictionary cannot reach is the span: the engine
     * writes "ages 15-23" as a note and the composer capitalises it, so it
     * arrives as English inside an otherwise Slovak heading.
     *
     * Matching the Slovak frame rather than the English one is deliberate. If the
     * dictionary is ever reworded, this fails to match and the heading keeps its
     * English span - visible, and a gap rather than a wrong sentence.
     */
    [/^(.+?) — (Vrchol \d+(?: a Výzva \d+)?)( \(aktuálna\))?$/, (m) => {
            const span = chapterSpan(m[1]);
            if (!span)
                return null;
            return `${span} — ${m[2]}${m[3] ?? ''}`;
        }],
];
