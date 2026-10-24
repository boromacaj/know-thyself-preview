/** Join a list the way prose does, with the language's own final conjunction. */
export function listWords(words, and) {
    if (words.length === 0)
        return '';
    if (words.length === 1)
        return words[0];
    return `${words.slice(0, -1).join(', ')} ${and} ${words[words.length - 1]}`;
}
export const capitalise = (text) => (text ? text.charAt(0).toUpperCase() + text.slice(1) : text);
/** The spans of a window value other than the one holding at the calculated moment. */
export const otherSpans = (spans, value) => spans.filter((span) => span.value !== value);
/** The span holding at the calculated moment (offset zero), or the first. */
export const spanAtMoment = (spans) => spans.find((span) => span.fromMinutes <= 0 && span.toMinutes >= 0) ?? spans[0];
