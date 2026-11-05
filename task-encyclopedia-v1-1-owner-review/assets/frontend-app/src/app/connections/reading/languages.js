/**
 * LANGUAGE HELPERS FOR AUTHORED CONTENT.
 *
 * Connections has no translation system of its own: the application's active locale (app/i18n/locale.ts) says which language is on screen, and the two languages every Connections
 * string is written in are English and Slovak. Any other locale reads the English until its pack exists (the same fallback the rest of the application uses).
 */
export const langOf = (locale) => (locale.toLowerCase().startsWith('sk') ? 'sk' : 'en');
export const say = (text, lang) => text[lang];
/**
 * Fill `{name}` placeholders. A placeholder with no value is a defect in the content, so it throws rather than shipping a literal "{p0}".
 *
 * NUMBER AGREEMENT: where the participants a placeholder stands for may be one name or several, Slovak (which has no modal that stays the same for both) writes the form for one and the form
 * for several as `{easy?potrebuje|potrebujú}`: the first alternative when the placeholder stands for one name, the second for two or more. The count comes from the value `easy#`
 * given beside `easy`. Names themselves are never inflected: they stand only as the nominative subject of a clause.
 */
export function fill(template, values) {
    const agreed = template.replace(/\{([a-zA-Z0-9]+)\?([^{}|]*)\|([^{}|]*)\}/g, (_match, key, one, many) => {
        const count = values[`${key}#`];
        if (count === undefined)
            throw new Error(`Connections content uses {${key}?...|...} but no count (${key}#) was given: "${template.slice(0, 80)}"`);
        return Number(count) === 1 ? one : many;
    });
    return agreed.replace(/\{([a-zA-Z0-9]+)\}/g, (_match, key) => {
        const value = values[key];
        if (value === undefined)
            throw new Error(`Connections content uses {${key}} but no value was given for it: "${template.slice(0, 80)}"`);
        return value;
    });
}
/** Capitalise the first letter of a sentence that begins with a filled placeholder or a lower-case word. */
export const sentence = (text) => (text.length === 0 ? text : text.charAt(0).toLocaleUpperCase() + text.slice(1));
/** Join sentences into a paragraph with single spaces, dropping empties. */
export const paragraph = (...sentences) => (sentences.filter((value) => typeof value === 'string' && value.trim().length > 0).map((value) => value.trim()).join(' '));
/** A deterministic 32-bit hash of a string (FNV-1a), for choosing among variants without a random number. */
export function hashOf(text) {
    let hash = 0x811c9dc5;
    for (let i = 0; i < text.length; i += 1) {
        hash ^= text.charCodeAt(i);
        hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    return hash >>> 0;
}
/** One of the variants, chosen by the seed and the key alone: the same inputs always choose the same one, and different keys spread across the list. */
export function pick(variants, seed, key) {
    if (variants.length === 0)
        throw new Error(`Connections content has no variants for "${key}".`);
    return variants[hashOf(`${seed}|${key}`) % variants.length];
}
/** "A and B" in English, "A a B" in Slovak (the Slovak conjunction is "a"; "A a B" is how two names stand together). */
export const both = (first, second, lang) => (lang === 'sk' ? `${first} a ${second}` : `${first} and ${second}`);
