/** "a, b and c" with the language's own conjunction. */
export function joinList(items, and) {
    if (items.length === 0)
        return '';
    if (items.length === 1)
        return items[0];
    return `${items.slice(0, -1).join(', ')}${and}${items[items.length - 1]}`;
}
export const capitalise = (text) => (text ? text.charAt(0).toUpperCase() + text.slice(1) : text);
/**
 * The engine's own trace, made readable: `BORIS=27/9 + DEMO=10/1` becomes
 * `BORIS 27 → 9 + DEMO 10 → 1`, and a labelled part (`birthMonth:8`) takes the
 * language's word for its label. Formatting only; every figure is the engine's.
 */
export function readableTrace(trace, labels) {
    return trace
        .split('+')
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => {
        const labelled = /^([A-Za-z]+):(.+)$/.exec(part);
        const body = labelled ? labelled[2] : part;
        const named = labelled ? `${labels[labelled[1]] ?? labelled[1]} ` : '';
        return `${named}${body.replace('=', ' ').split('/').join(' → ')}`;
    })
        .join(' + ');
}
/** A reduction chain as the evidence lines print it: 28 → 10 → 1. */
export const chainText = (chain) => chain.join(' → ');
