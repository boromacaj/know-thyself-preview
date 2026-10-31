/**
 * WHO A SENTENCE IS ABOUT: THE PARTICIPANT SCOPE OF HOUSEHOLD WORDS.
 *
 * A household reading says things about particular children: the pair readings behind a pattern show something for THESE children, and nothing for a child who was not read (a child
 * under three is never read for a style, and a child with no finding behind the pattern is not part of it). A collective phrase ("each child", "every child", "all the children", the bare
 * plural "the children", Slovak "každé z detí", "všetky deti", "deťom") silently widens such a sentence to every child in the house, the infant included. English can hide it in a
 * determiner, Slovak in a case ending, so the safeguard is not a list of phrases to avoid but a rule on REFERENTS:
 *
 *   - a pattern refers to the children it rests on by their names (`{children}`, `{easy}`, `{hard}`, `{child}`, `{both}`, `{p0}`, `{p1}`), to the pair it rests on by a numeral ("two
 *     children", "dve deti", "both", "oboje"), or back to either by a pronoun ("each of them", "každé z nich", "these relationships");
 *   - it never quantifies over, or pluralises, "the children" of the house.
 *
 * `unboundChildReferences` finds the words that break that rule. It is the one definition used by the content validator (`scripts/connections/patternRules.mjs`), by the household
 * reading itself (a passage that still carries one is not told: it fails closed), and by the tests that read every assembled household reading.
 */
/* A placeholder such as {children} is not a collective: it is replaced by names. The look-behinds keep the English word out of `{children}`, and let a numeral or a demonstrative (with at
   most one adjective between) hold "children" to a pair or to the named set: "two quiet children", "these children". */
const EN_COLLECTIVE = new RegExp([
    /\b(?:each|every|any|all|no)\s+(?:of\s+the\s+)?(?:child|children|kid|kids|sibling|siblings)\b/.source,
    /(?<![\w{])the\s+(?:other\s+|older\s+|younger\s+)?(?:children|kids|siblings)\b/.source,
    /(?<![\w{])(?<!(?:two|three|four|both|these|those)\s(?:\p{L}+\s)?)(?:children|kids|siblings)\b(?!\})/u.source,
].join('|'), 'giu');
/* Slovak: the quantifier before a child noun in any case, and the bare plural noun in any case, unless a numeral or a demonstrative holds it to a named set. "podľa všetkého" is the
   idiom "all things considered", not a quantifier. */
const SK_QUANTIFIED = /(?<![\p{L}])(?<!podľa\s)(?:každ\p{L}*|všetk\p{L}*|žiad\p{L}*|ktorýkoľvek|ktorékoľvek|ktoréhokoľvek|ktorémukoľvek)\s+(?:z\s+)?(?:dieť\p{L}*|det\p{L}*|súrodenc\p{L}*)(?![\p{L}])/giu;
const SK_BARE_PLURAL = /(?<![\p{L}{])(?<!(?:dve|oboch|obom|oboma|dvoch|dvom|dvoma|tri|troch|štyri|tieto|týchto|týmto|tých|týmito)\s(?:\p{L}+\s)?)(?:deti|detí|deťom|deťoch|deťmi|súrodenci|súrodencov|súrodencom|súrodencoch|súrodencami)(?![\p{L}}])/giu;
const patternsFor = (lang) => (lang === 'en' ? [EN_COLLECTIVE] : [SK_QUANTIFIED, SK_BARE_PLURAL]);
/** The collective references to children in a text that no names or numeral hold to the children a sentence rests on. Empty when the text is bound. */
export function unboundChildReferences(text, lang) {
    const found = [];
    for (const pattern of patternsFor(lang)) {
        const re = new RegExp(pattern.source, pattern.flags);
        for (let match = re.exec(text); match; match = re.exec(text))
            found.push({ match: match[0], index: match.index });
    }
    return found.sort((x, y) => x.index - y.index);
}
/** Whether every text is free of unbound child references (the household reading tells a passage only if this holds for all its words). */
export const isChildScoped = (texts, lang) => texts.every((text) => unboundChildReferences(text, lang).length === 0);
