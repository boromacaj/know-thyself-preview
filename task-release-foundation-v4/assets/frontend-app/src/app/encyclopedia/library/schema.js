/*
 * THE ENCYCLOPEDIA LIBRARY - ARTICLE SCHEMA
 * -----------------------------------------
 * The library is general, pre-authored reference material: the same article for every reader, no birth data, no calculation.
 * It is the long-form sibling of the short concept entries in ../concepts.ts (which answer "what does this term mean?" in a
 * bottom sheet). A personal reading says what a factor means FOR A PERSON; an article says what the factor means IN THE SYSTEM.
 *
 * WHAT IS DELIBERATELY NOT HERE
 *   - Access tiers. Whether an article is free or premium is decided in ONE place (accessPolicy.ts), keyed by library and
 *     category, so the content files never carry commercial decisions and the policy can change without touching prose.
 *   - Markup. Paragraphs are plain text. The only inline structure is a cross-reference, written [[article.id]] or
 *     [[article.id|label]], which the reader turns into a link with textContent (never innerHTML) and the tests resolve against
 *     the registry, so a reference to an article that does not exist fails the build's test gate rather than the reader.
 *
 * STABLE IDENTIFIERS
 * An article id is `<library>.<category>.<slug>` (e.g. `astrology.sign.virgo`, `numerology.life-path.7`, `tarot.card.major-00`).
 * A section id is unique within its article. Bookmarks and reading progress store these ids, so they are a persistence
 * contract: renaming one orphans what readers saved. Retitle freely; re-id only with a migration.
 */
export const LIBRARY_IDS = ['astrology', 'numerology', 'human-design', 'bazi', 'tarot', 'synthesis'];
export const isLibraryId = (value) => typeof value === 'string' && LIBRARY_IDS.includes(value);
const LINK = /\[\[([a-z0-9.-]+)(?:\|([^\]]+))?\]\]/g;
/** Split a paragraph into text and cross-references. A label of null means "use the target's title". Pure. */
export function parseInline(text) {
    const parts = [];
    let last = 0;
    for (const match of text.matchAll(LINK)) {
        const index = match.index ?? 0;
        if (index > last)
            parts.push({ kind: 'text', text: text.slice(last, index) });
        parts.push({ kind: 'link', target: match[1], label: match[2]?.trim() || null });
        last = index + match[0].length;
    }
    if (last < text.length)
        parts.push({ kind: 'text', text: text.slice(last) });
    return parts;
}
/** The paragraph as a reader sees it, references replaced by their labels (titles resolved through `titleOf`). For search and tests. */
export function plainText(text, titleOf = () => undefined) {
    return parseInline(text).map((part) => (part.kind === 'text' ? part.text : part.label ?? titleOf(part.target) ?? '')).join('');
}
/** Every cross-reference target in an article: inline links and the related list. */
export function referencesOf(article) {
    const targets = new Set(article.related ?? []);
    const scan = (text) => { for (const part of parseInline(text))
        if (part.kind === 'link')
            targets.add(part.target); };
    for (const section of article.sections) {
        for (const paragraph of section.paragraphs ?? [])
            scan(paragraph);
        for (const item of section.list ?? [])
            scan(item);
    }
    scan(article.summary);
    return [...targets];
}
/** Section anchor id used in the DOM. */
export const sectionAnchor = (articleId, sectionId) => `kt-lib-${articleId.replace(/\./g, '-')}--${sectionId}`;
/** Approximate reading time in minutes (220 words a minute), never below one. */
export function readingMinutes(article) {
    let words = article.summary.split(/\s+/).length;
    for (const section of article.sections) {
        for (const paragraph of section.paragraphs ?? [])
            words += paragraph.split(/\s+/).length;
        for (const item of section.list ?? [])
            words += item.split(/\s+/).length;
    }
    return Math.max(1, Math.round(words / 220));
}
