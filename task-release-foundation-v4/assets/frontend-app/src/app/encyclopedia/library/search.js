/*
 * LIBRARY SEARCH - a small in-memory index, built once per loaded library.
 *
 * A few hundred articles do not need a search engine. Each article is reduced once to normalised field strings (title,
 * keywords, summary, headings, body); a query is split into terms and every term must match the start of a word somewhere in
 * the article. Matches are scored by field so a title hit outranks a body hit. Diacritics and case are ignored, so "Ji",
 * "jí" and "JI" are the same query, and Chinese characters in keywords match as typed.
 */
import { plainText } from './schema.js?v=4cd804d';
export const normalize = (text) => text
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[’'`]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
export function buildSearchIndex(articles, titleOf = () => undefined) {
    return articles.map((article) => ({
        article,
        title: ` ${normalize(article.title)}`,
        keywords: ` ${normalize([...(article.keywords ?? []), article.glyph ?? ''].join(' '))}`,
        summary: ` ${normalize(article.summary)}`,
        headings: ` ${normalize(article.sections.map((section) => section.heading).join(' '))}`,
        body: ` ${normalize(article.sections.flatMap((section) => [...(section.paragraphs ?? []), ...(section.list ?? [])]).map((text) => plainText(text, titleOf)).join(' '))}`,
    }));
}
const WEIGHTS = { title: 12, keywords: 8, summary: 4, headings: 2, body: 1 };
const hasWordPrefix = (field, term) => field.includes(` ${term}`)
    /* CJK text has no spaces between characters: a term in those scripts matches anywhere. */
    || (/[㐀-鿿]/.test(term) && field.includes(term));
export function searchIndex(index, query, limit = 40) {
    const terms = normalize(query).split(' ').filter(Boolean);
    if (terms.length === 0)
        return [];
    const hits = [];
    for (const document of index) {
        let score = 0;
        let all = true;
        for (const term of terms) {
            let termScore = 0;
            for (const field of Object.keys(WEIGHTS)) {
                if (hasWordPrefix(document[field], term))
                    termScore = Math.max(termScore, WEIGHTS[field]);
            }
            if (termScore === 0) {
                all = false;
                break;
            }
            score += termScore;
        }
        if (!all)
            continue;
        /* A whole-title match ("virgo" -> "Virgo") goes first. */
        if (document.title.trim() === terms.join(' '))
            score += 50;
        hits.push({ article: document.article, score });
    }
    return hits.sort((a, b) => b.score - a.score || a.article.title.localeCompare(b.article.title)).slice(0, limit);
}
