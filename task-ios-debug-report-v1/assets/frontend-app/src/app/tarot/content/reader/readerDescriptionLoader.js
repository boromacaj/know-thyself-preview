let loaded = null;
let pending = null;
/** Starts loading, once. Resolves when the text is in memory; never rejects (a failed load leaves the dialog as it was). */
export function loadReaderDescriptions() {
    if (loaded !== null)
        return Promise.resolve();
    pending ??= import('./tarotCardReader.js?v=b5ef5ed').then((module) => { loaded = module; }).catch(() => { pending = null; });
    return pending;
}
export const readerDescriptionsLoaded = () => loaded !== null;
/** The card's description if the text is already in memory, otherwise null. Synchronous: the dialog renders without waiting. */
export function loadedReaderDescription(cardId, locale) {
    return loaded === null ? null : loaded.readerDescription(cardId, locale);
}
/**
 * A description is one thought of about a hundred words; on a phone it is easier to read as two short paragraphs than as
 * one block. Cut at the sentence boundary nearest the middle, never inside a sentence, and leave a short description whole.
 */
export function readerParagraphs(text) {
    const sentences = text.split(/(?<=[.!?])\s+/).filter((part) => part.length > 0);
    const words = (part) => part.split(/\s+/).filter(Boolean).length;
    const total = words(text);
    if (total <= 70 || sentences.length < 4)
        return [text];
    let running = 0;
    let cut = 1;
    let best = Infinity;
    for (let index = 0; index < sentences.length - 1; index += 1) {
        running += words(sentences[index]);
        const distance = Math.abs(running - total / 2);
        if (distance < best) {
            best = distance;
            cut = index + 1;
        }
    }
    return [sentences.slice(0, cut).join(' '), sentences.slice(cut).join(' ')];
}
