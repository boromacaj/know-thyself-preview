/**
 * THE WORD FOR THE CHILD, BY AGE.
 *
 * The authored parenting words say "the child" because most of them serve every age. For a thirteen-year-old and for a seventeen-year-old that is the wrong word; a parent reading about
 * a teenager as "the child" is being told the text was not written for them. This puts the right noun in, in English, after the text is assembled: "the child" becomes "the teenager"
 * from thirteen and "the young person" from sixteen. It changes the noun and nothing else, and it does nothing for the ages the plain word fits.
 *
 * Slovak says "dieťa" and has the cases to carry; its own age words are the Slovak pass's, so Slovak text is left as it is.
 */
const NOUN = {
    'early-adolescence-13-15': 'teenager',
    'late-adolescence-16-18': 'young person',
};
export function childNounFor(band) {
    return band ? NOUN[band] ?? null : null;
}
export function forAge(text, band, lang) {
    const noun = childNounFor(band);
    if (!noun || lang !== 'en')
        return text;
    const article = /^[aeiou]/i.test(noun) ? 'an' : 'a';
    const upper = noun.charAt(0).toUpperCase() + noun.slice(1);
    return text
        .replace(/\bThe child’s\b/g, `The ${noun}’s`)
        .replace(/\bthe child’s\b/g, `the ${noun}’s`)
        .replace(/\bA child’s\b/g, `${article === 'an' ? 'An' : 'A'} ${noun}’s`)
        .replace(/\ba child’s\b/g, `${article} ${noun}’s`)
        .replace(/\bThe child\b/g, `The ${noun}`)
        .replace(/\bthe child\b/g, `the ${noun}`)
        .replace(/\bA child\b/g, `${article === 'an' ? 'An' : 'A'} ${noun}`)
        .replace(/\ba growing child\b/g, `a growing ${noun}`)
        .replace(/\ba child\b/g, `${article} ${noun}`)
        .replace(/\bChild\b/g, upper);
}
