/*
 * NORMALIZING A TYPED-IN FIRST NAME.
 * ==================================
 *
 * The brief for this layer contains two instructions that pull against each
 * other, and the whole design of this file is the reconciliation:
 *
 *   "handle capitalization, Unicode, Slovak/Czech diacritics"
 *   "do NOT strip diacritics blindly; do NOT merge visually similar names"
 *
 * Blind folding is what a naive resolver does, and it is wrong in a way that is
 * invisible until it bites. Fold everything to ASCII and Ján and Jana stay
 * distinct (good) but Ľubomír/Lubomir merge (good) and - the failure - any pair
 * that differs ONLY by a diacritic silently becomes one name. In Slovak and
 * Czech that is not hypothetical: a mark is frequently the only thing telling
 * two names apart.
 *
 * SO FOLDING IS A FALLBACK, NOT THE LOOKUP.
 *
 *   1. EXACT: compare case-folded but diacritic-PRESERVING. 'ĽUBOMÍR',
 *      'ľubomír' and 'Ľubomír' are one form; 'Lubomir' is not yet.
 *   2. FOLDED: only if exact found nothing, compare with diacritics folded -
 *      and only accept the answer if it is UNIQUE. If folding collapses two
 *      different records onto one key, the resolver reports ambiguity and
 *      refuses to choose. That is the "do not merge without evidence" rule,
 *      enforced by construction rather than by remembering to be careful.
 *
 * WHY NOT `.replace(/[^a-z]/g, '')`, WHICH THE OLDER LAYERS USE
 * Because NFD decomposition does not reach every letter. Polish ł, Nordic ø and
 * æ, Icelandic þ and ð, Turkish ı, Croatian đ have no combining-mark form, so
 * stripping non-ASCII DELETES them: Łukasz becomes 'ukasz' and Øystein becomes
 * 'ystein'. Those are not normalizations, they are corruptions that then match
 * the wrong record or nothing at all. The table below transliterates them
 * instead, which is the only correct handling.
 *
 * NON-LATIN SCRIPTS ARE NOT TRANSLITERATED HERE.
 * Cyrillic and Greek forms reach their records as explicit authored variants
 * ('Борис' is recorded on the Boris entry), matched exactly. Writing a
 * romanisation engine would mean guessing - Serbian and Russian romanise the
 * same letters differently - and guessing is what this layer exists not to do.
 */
/**
 * Letters NFD cannot decompose, and what they fold to.
 *
 * Each is a real orthographic equivalence, not a visual resemblance.
 */
const NON_DECOMPOSABLE = new Map([
    ['ł', 'l'], ['ø', 'o'], ['æ', 'ae'], ['œ', 'oe'], ['þ', 'th'], ['ð', 'd'],
    ['đ', 'd'], ['ħ', 'h'], ['ı', 'i'], ['ĸ', 'k'], ['ŋ', 'n'], ['ß', 'ss'],
    ['ſ', 's'], ['ƀ', 'b'], ['ɖ', 'd'],
]);
/**
 * Case-fold and tidy, WITHOUT touching diacritics.
 *
 * This is the primary lookup key. NFC first so that a name typed with combining
 * marks and the same name typed with precomposed characters - visually
 * identical, different bytes, which is exactly what happens across an iOS
 * keyboard and a paste from a web page - become the same string.
 *
 * Apostrophes and hyphens are kept: they are part of names (D'Angelo,
 * Anne-Marie) and dropping them would merge distinct forms.
 */
export function exactKey(input) {
    return input
        .normalize('NFC')
        .trim()
        .toLowerCase()
        .replace(/[\s ]+/g, ' ');
}
/**
 * Fold to ASCII letters, for the fallback pass only.
 *
 * Returns '' for input with no Latin letters at all (Cyrillic, Greek, Han),
 * which the resolver reads as "no folded match is possible" rather than as a
 * key that would match every other empty result.
 */
export function foldedKey(input) {
    const lowered = input.normalize('NFC').trim().toLowerCase();
    let mapped = '';
    for (const character of lowered) {
        mapped += NON_DECOMPOSABLE.get(character) ?? character;
    }
    const folded = mapped
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z]/g, '');
    return folded;
}
/**
 * The key a corpus record is filed under.
 *
 * Deliberately the same function as the folded fallback, so a record's
 * `canonicalKey` and a typed name normalize identically and the two can never
 * drift apart by using different rules.
 */
export function canonicalKeyFor(name) {
    return foldedKey(name);
}
/**
 * Take the first name out of whatever was typed.
 *
 * This layer is about the GIVEN name. Someone typing their full name into a
 * name field is ordinary, and a resolver that then fails to find "Boris Macaj"
 * is technically correct and practically useless. Splitting on whitespace and
 * taking the first token is a deliberately dumb rule, but a smart one would
 * have to guess at compound given names and particles, and guessing wrong is
 * worse than the occasional miss here.
 *
 * A hyphenated given name is kept whole: 'Anne-Marie' is one given name.
 */
export function firstNameOf(input) {
    const trimmed = input.normalize('NFC').trim();
    if (!trimmed)
        return '';
    return trimmed.split(/[\s ]+/)[0];
}
