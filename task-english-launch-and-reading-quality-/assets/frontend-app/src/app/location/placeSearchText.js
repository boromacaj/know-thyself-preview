/*
 * THE TEXT OF A PLACE SEARCH, AS ARITHMETIC.
 *
 * One normalisation, used by the index build (scripts/places/buildPlaceIndex.mjs imports this module's compiled output) and by the search in
 * the browser, so that a name is filed under exactly the letters it is looked up by. Pure: no DOM, no network, no clock.
 *
 *   normalizeSearchText   "Banská Bystrica" -> "banska bystrica", "Łódź" -> "lodz", "Straße" -> "strasse": lower case, diacritics and
 *                         ligatures folded to their Latin base, every run of anything else one space. A name in a script with no Latin
 *                         form normalises to '' and is never filed (the index carries GeoNames' own romanised names and the romanised
 *                         aliases of larger places).
 *   shardKeyFor           the two characters a normalised name is filed under: "le" for "levice", "ba" for "banska bystrica"
 *   editDistanceUpTo      Damerau-Levenshtein (adjacent transposition counts as one), abandoned as soon as it must exceed `limit`
 *   splitBirthIntent      "porodnica zvolen" -> asks for a maternity ward, and for "zvolen"; "Zvolen" alone asks for nothing but the place
 *   prefixEditDistance    how far a typed prefix is from the start of a name, so that "levcie" finds "levice" and "nirta" finds "nitra"
 */
const FOLD = {
    'ß': 'ss', 'æ': 'ae', 'œ': 'oe', 'ø': 'o', 'đ': 'd', 'ð': 'd', 'þ': 'th', 'ł': 'l', 'ı': 'i', 'ħ': 'h', 'ŋ': 'n', 'ŧ': 't',
};
export function normalizeSearchText(value) {
    let text = value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    text = text.replace(/[ßæœøđðþłıħŋŧ]/g, (character) => FOLD[character] ?? character);
    return text.replace(/[^a-z0-9]+/g, ' ').trim();
}
export const SHARD_KEY_LENGTH = 2;
/** The shard a normalised term is filed under: its first two characters, a space written as `_`, padded with `_`. */
export function shardKeyFor(normalized) {
    return normalized.slice(0, SHARD_KEY_LENGTH).replace(/ /g, '_').padEnd(SHARD_KEY_LENGTH, '_');
}
/** Optimal-string-alignment distance between two strings, or `limit + 1` as soon as it cannot be within `limit`. */
export function editDistanceUpTo(a, b, limit) {
    if (Math.abs(a.length - b.length) > limit)
        return limit + 1;
    if (a === b)
        return 0;
    const rows = a.length + 1;
    const columns = b.length + 1;
    let twoBack = new Array(columns).fill(0);
    let previous = Array.from({ length: columns }, (_, column) => column);
    for (let row = 1; row < rows; row += 1) {
        const current = new Array(columns).fill(0);
        current[0] = row;
        let best = current[0];
        for (let column = 1; column < columns; column += 1) {
            const cost = a[row - 1] === b[column - 1] ? 0 : 1;
            let value = Math.min(previous[column] + 1, current[column - 1] + 1, previous[column - 1] + cost);
            if (row > 1 && column > 1 && a[row - 1] === b[column - 2] && a[row - 2] === b[column - 1])
                value = Math.min(value, twoBack[column - 2] + 1);
            current[column] = value;
            if (value < best)
                best = value;
        }
        if (best > limit)
            return limit + 1;
        twoBack = previous;
        previous = current;
    }
    return previous[columns - 1];
}
/**
 * The distance between what was typed and the beginning of a name: the query against the name's prefix of about the same length, the
 * closest of one character shorter, the same and one longer (a typed letter may be missing or doubled). `limit + 1` when further.
 */
export function prefixEditDistance(query, name, limit) {
    let best = limit + 1;
    for (const length of [query.length - 1, query.length, query.length + 1]) {
        if (length < 1)
            continue;
        const distance = editDistanceUpTo(query, name.slice(0, length), limit);
        if (distance < best)
            best = distance;
    }
    return best;
}
/**
 * THE WORDS OF A QUERY THAT ASK FOR A BUILDING, NOT NAME A PLACE.
 *
 * "maternity ward Zvolen", "nemocnica Zvolen", "maternity hospital Zvolen", "Entbindung Wien": the first words say what is looked for (a maternity
 * ward, a hospital), the rest is the town. They are taken out of the query the place is searched by, and the search then offers the hospitals
 * of that town before the town itself. A query made only of such words ("Hospital") is a place name like any other, so nothing is taken out.
 */
const BIRTH_INTENT_WORD = /^(porodni[a-z]*|rodni[a-z]*|nemocni[a-z]*|maternit[a-z]*|hospital[a-z]*|krankenhaus[a-z]*|entbindung[a-z]*|geburt[a-z]*|szuleszet[a-z]*|korhaz[a-z]*|szpital[a-z]*|porodowk[a-z]*|klinik[a-z]*|clinic|ward|birth|birthing|centre|center|unit)$/;
const BIRTH_INTENT_FILLER = new Set(['v', 'vo', 'u', 'pri', 'in', 'at', 'of', 'the', 'a', 'i', 'w', 'de', 'der', 'am']);
export function splitBirthIntent(normalized) {
    const words = normalized.split(' ').filter(Boolean);
    const kept = words.filter((word) => !BIRTH_INTENT_WORD.test(word));
    const intent = kept.length < words.length;
    if (!intent)
        return { intent: false, rest: normalized };
    const rest = kept.filter((word) => !BIRTH_INTENT_FILLER.has(word)).join(' ');
    return rest.length < 2 ? { intent: false, rest: normalized } : { intent: true, rest };
}
/** How many mistakes a query of this length is forgiven: none for a short one (it would match everything), one up to seven letters, two beyond. */
export function typoAllowance(query) {
    const letters = query.replace(/ /g, '').length;
    if (letters < 4)
        return 0;
    return letters < 8 ? 1 : 2;
}
