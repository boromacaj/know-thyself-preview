/** The system's own labels, for the evidence lines only. */
export const CENTER_TERM = {
    head: 'Head',
    ajna: 'Ajna',
    throat: 'Throat',
    g: 'G / Identity',
    ego: 'Ego / Heart',
    solarPlexus: 'Solar Plexus',
    sacral: 'Sacral',
    spleen: 'Spleen',
    root: 'Root',
};
/** Join a list the way prose does, with the language's own final conjunction. */
export function listWords(words, and) {
    if (words.length === 0)
        return '';
    if (words.length === 1)
        return words[0];
    return `${words.slice(0, -1).join(', ')} ${and} ${words[words.length - 1]}`;
}
/**
 * SMALL NUMBERS AS WORDS.
 *
 * "6 of the nine parts" is what a template writes and not what a sentence says.
 * Only the range a reading actually uses - a chart has nine centres and at most
 * a handful of anything else - with digits beyond it, which never occur here.
 */
export function numberWord(value, words) {
    return words[value] ?? String(value);
}
export const capitalise = (text) => (text ? text.charAt(0).toUpperCase() + text.slice(1) : text);
