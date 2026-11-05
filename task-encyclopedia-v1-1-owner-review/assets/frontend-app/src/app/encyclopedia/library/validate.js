/*
 * LIBRARY VALIDATION - pure, used by the automated tests and by the authoring check script
 * (frontend-app/scripts/encyclopedia/check-library.mjs). Nothing here runs in the application.
 */
import { parseInline, plainText, referencesOf } from './schema.js?v=99fda38';
const ID = /^[a-z0-9-]+\.[a-z0-9-]+\.[a-z0-9-]+$/;
const SECTION_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
/**
 * The encyclopedic voice: an article describes the factor, never "you".
 * Case matters on purpose: "You" with a capital is also a romanised Chinese name - the Earthly Branch You 酉 (the Rooster) and
 * the hexagram Da You 大有 - so a capitalised "You" counts as the pronoun only when a verb follows it. Lower-case "you" and
 * every form of "your" always count.
 */
export const SECOND_PERSON = /\b(you|your|yours|yourself|yourselves|Your|Yours|Yourself|Yourselves|YOU|YOUR)\b|\bYou(?:['’](?:re|ll|ve|d)\b|\s+(?:are|were|can|could|will|would|may|might|must|should|have|had|need|want|feel|know|see|get|do|don['’]t|aren['’]t|won['’]t)\b)/;
/** Filler the editorial guide bans. Matched case-insensitively against plain text. */
export const BANNED_PHRASES = [
    'unique journey', 'embrace your', 'unlock your', 'unlock the', 'the universe wants', 'vibrational', 'vibrations',
    'delve', 'tapestry', 'it is important to note', 'it\'s important to note', 'lorem', 'placeholder', 'todo', 'tbd',
    'coming soon', 'as an ai',
];
function articleText(article, titleOf) {
    const texts = [article.title, article.summary];
    for (const section of article.sections) {
        texts.push(section.heading);
        for (const paragraph of section.paragraphs ?? [])
            texts.push(plainText(paragraph, titleOf));
        for (const item of section.list ?? [])
            texts.push(plainText(item, titleOf));
    }
    return texts;
}
/**
 * Validate one library. `knownIds` is every article id across all loaded libraries (cross-library references resolve
 * against it); pass the library's own ids when checking a single library in isolation.
 */
export function validateLibrary(library, knownIds) {
    const issues = [];
    const add = (articleId, problem) => { issues.push({ articleId, problem }); };
    const categories = new Set(library.categories.map((category) => category.id));
    if (categories.size !== library.categories.length)
        add(library.id, 'duplicate category id');
    const seen = new Set();
    const titleKeys = new Map();
    const paragraphs = new Map();
    const titles = new Map(library.articles.map((article) => [article.id, article.title]));
    const titleOf = (id) => titles.get(id);
    for (const article of library.articles) {
        const id = article.id;
        if (!ID.test(id))
            add(id, 'id is not <library>.<category>.<slug>');
        if (seen.has(id))
            add(id, 'duplicate id');
        seen.add(id);
        if (article.library !== library.id)
            add(id, `library is ${article.library}, expected ${library.id}`);
        if (!categories.has(article.category))
            add(id, `unknown category ${article.category}`);
        if (!id.startsWith(`${library.id}.${article.category}.`))
            add(id, 'id does not start with <library>.<category>.');
        if (!article.title.trim())
            add(id, 'empty title');
        const titleKey = `${article.category}:${article.title.trim().toLowerCase()}`;
        if (titleKeys.has(titleKey))
            add(id, `duplicate title in category (also ${titleKeys.get(titleKey)})`);
        titleKeys.set(titleKey, id);
        if (article.summary.trim().length < 30)
            add(id, 'summary too short');
        if (article.summary.length > 360)
            add(id, 'summary longer than 360 characters');
        if (article.sections.length === 0)
            add(id, 'no sections');
        const sectionIds = new Set();
        for (const section of article.sections) {
            if (!SECTION_ID.test(section.id))
                add(id, `section id "${section.id}" is not kebab-case`);
            if (sectionIds.has(section.id))
                add(id, `duplicate section id ${section.id}`);
            sectionIds.add(section.id);
            if (!section.heading.trim())
                add(id, `section ${section.id} has no heading`);
            const count = (section.paragraphs?.length ?? 0) + (section.list?.length ?? 0);
            if (count === 0)
                add(id, `section ${section.id} is empty`);
            const prose = new Set(section.paragraphs ?? []);
            for (const paragraph of [...(section.paragraphs ?? []), ...(section.list ?? [])]) {
                if (!paragraph.trim())
                    add(id, `section ${section.id} has an empty paragraph`);
                const key = plainText(paragraph).trim().toLowerCase();
                /* Prose may never repeat; a short fact in a list ("Centres: Head and Ajna") legitimately can. */
                if (prose.has(paragraph) && key.length >= 60) {
                    const other = paragraphs.get(key);
                    if (other && other !== id)
                        add(id, `paragraph duplicated from ${other}`);
                    paragraphs.set(key, id);
                }
                /* An inline reference must be well-formed: a bracket left over means a typo the parser skipped. */
                const leftover = parseInline(paragraph).some((part) => part.kind === 'text' && /\[\[|\]\]/.test(part.text));
                if (leftover)
                    add(id, `malformed cross-reference in ${section.id}`);
            }
        }
        for (const target of referencesOf(article)) {
            if (!knownIds.has(target))
                add(id, `broken reference -> ${target}`);
            if (target === id)
                add(id, 'references itself');
        }
        for (const text of articleText(article, (target) => titleOf(target) ?? target)) {
            if (SECOND_PERSON.test(text))
                add(id, `second person: "${text.slice(0, 90)}"`);
            const lower = text.toLowerCase();
            for (const phrase of BANNED_PHRASES)
                if (new RegExp(`\\b${phrase.replace(/[.*+?^${}()|[\]\\']/g, '\\$&')}\\b`).test(lower))
                    add(id, `banned phrase "${phrase}"`);
        }
    }
    for (const category of library.categories) {
        if (!library.articles.some((article) => article.category === category.id))
            add(library.id, `category ${category.id} has no articles`);
    }
    return issues;
}
/** Word count of an article's readable text. */
export function wordCount(article) {
    return articleText(article, () => '').slice(1).join(' ').split(/\s+/).filter(Boolean).length;
}
