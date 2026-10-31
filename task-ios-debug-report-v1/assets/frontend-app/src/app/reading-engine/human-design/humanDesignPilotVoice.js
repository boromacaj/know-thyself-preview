export const para = (text, ...claims) => ({ text, claims });
/** Join a list the way prose does, with the language's own final conjunction. */
export function joinWords(words, and) {
    if (words.length === 0)
        return '';
    if (words.length === 1)
        return words[0];
    return `${words.slice(0, -1).join(', ')} ${and} ${words[words.length - 1]}`;
}
export const capitalised = (text) => (text ? text.charAt(0).toUpperCase() + text.slice(1) : text);
