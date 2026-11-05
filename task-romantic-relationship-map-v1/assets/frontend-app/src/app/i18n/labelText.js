import { activeLocale } from './locale.js';
import { BAZI_LABELS, BAZI_PATTERNS } from './labels/bazi.js';
import { HUMAN_DESIGN_LABELS, HUMAN_DESIGN_PATTERNS } from './labels/humanDesign.js';
import { NUMEROLOGY_LABELS, NUMEROLOGY_PATTERNS } from './labels/numerology.js';
import { SHARED_LABELS, SHARED_PATTERNS } from './labels/shared.js';
import { WESTERN_ASTROLOGY_LABELS, WESTERN_ASTROLOGY_PATTERNS } from './labels/westernAstrology.js';
/*
 * THE NAMES OF THINGS.
 *
 * A label is the short text in the left column of the technical appendix, the
 * heading over a group of fields, the caption on a mark. It is not prose and it
 * is not a value. It is what the reading calls a thing.
 *
 * WHY THIS IS SEPARATE FROM engineProse.ts
 * That module translates SENTENCES the engines composed. This one translates
 * NAMES, and the two need different rules: a sentence gets rewritten into
 * natural Slovak word order, whereas a label has to stay short enough to sit in
 * a column and has to read the same everywhere it appears.
 *
 * WHY IT IS AN OVERLAY AND NOT A RENAME AT SOURCE
 * The English label is a KEY. `technicalNotes.ts` looks its plain-language note
 * up by English label; `outputValue()` finds a key output by English label;
 * `engineProse.ts` matches English values. Renaming the label where the engine
 * emits it would silently break all three - the note would vanish, the lookup
 * would return null, and nothing would throw. So the label is translated at the
 * LAST possible moment: inside `annotate()`, after the note has been resolved,
 * and on group titles as they are copied into the appendix.
 *
 * WHAT STAYS ENGLISH
 * Canonical system names (Human Design, BaZi, Manifesting Generator, Day
 * Master), pinyin stems and branches, Chinese characters, Yong Shen, gate and
 * channel numbers, and anything that is an engine identifier rather than a name
 * for a reader - SE_TRUE_NODE, GeoVector, a formula, a timezone id.
 * Translating those would break agreement with the provenance this appendix
 * exists to show.
 *
 * SPLIT BY PILLAR
 * One table per system, because they are filled by different passes and a
 * single file would mean every pass editing the same lines.
 */
const SK = {
    ...SHARED_LABELS,
    ...NUMEROLOGY_LABELS,
    ...WESTERN_ASTROLOGY_LABELS,
    ...BAZI_LABELS,
    ...HUMAN_DESIGN_LABELS,
};
const PATTERNS = [
    ...SHARED_PATTERNS,
    ...NUMEROLOGY_PATTERNS,
    ...WESTERN_ASTROLOGY_PATTERNS,
    ...BAZI_PATTERNS,
    ...HUMAN_DESIGN_PATTERNS,
];
/** The first pattern that can translate the whole label, or null. */
function fromPattern(text) {
    for (const [pattern, render] of PATTERNS) {
        const match = text.match(pattern);
        if (!match)
            continue;
        const rendered = render(match);
        if (rendered)
            return rendered;
    }
    return null;
}
/**
 * The reader's name for a thing, or the English one.
 *
 * Falls back to English rather than to a key or a blank, so an untranslated
 * label reads as a gap in the vocabulary rather than as a broken screen.
 */
export function labelText(english) {
    if (activeLocale() !== 'sk')
        return english;
    const text = english.trim();
    return SK[text] ?? fromPattern(text) ?? english;
}
/** English labels with no Slovak. Used by the localisation coverage report. */
export function untranslatedLabels(labels) {
    return labels.filter((label) => {
        const text = label.trim();
        return SK[text] === undefined && fromPattern(text) === null;
    });
}
/** Every English label the tables name outright. Used by the coverage report. */
export const LABEL_KEYS = Object.keys(SK);
