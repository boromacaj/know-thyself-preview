import { LIBRARY_IDS } from './schema.js?v=99fda38';
export const LIBRARIES = {
    astrology: {
        id: 'astrology',
        title: 'Astrology Encyclopedia',
        shortTitle: 'Astrology',
        mark: '☉',
        tagline: 'Signs, planets, houses and aspects - the vocabulary of the natal chart.',
        intro: [
            'Western astrology reads a chart of the sky drawn for one moment and one place. Each factor in that chart - a planet, the sign it occupies, the house it falls in, the angles it makes - carries a traditional meaning.',
            'These articles explain those meanings in general terms. The personal Astrology reading is where they are combined for one particular chart.',
        ],
    },
    numerology: {
        id: 'numerology',
        title: 'Numerology Encyclopedia',
        shortTitle: 'Numerology',
        mark: '7',
        tagline: 'The numbers, the positions they occupy, and the cycles they move through.',
        intro: [
            'Pythagorean numerology turns a birth date and a birth name into a small set of numbers. The same number means different things in different positions: a Life Path 7 and a Personality 7 describe different layers of a life.',
            'This library explains each number, each position and each number-in-position on its own terms.',
        ],
    },
    'human-design': {
        id: 'human-design',
        title: 'Human Design Encyclopedia',
        shortTitle: 'Human Design',
        mark: '◇',
        tagline: 'Types, authorities, profiles, centres, channels and gates.',
        intro: [
            'Human Design maps two moments - birth, and a point roughly three months earlier - onto a BodyGraph of nine centres, thirty-six channels and sixty-four gates.',
            'These articles describe each element of that map as the system defines it, so the terms in a personal reading can be looked up one at a time.',
        ],
    },
    bazi: {
        id: 'bazi',
        title: 'BaZi Encyclopedia',
        shortTitle: 'BaZi',
        mark: '木',
        tagline: 'The Five Phases, the stems and branches, the Day Master and the Ten Gods.',
        intro: [
            'BaZi - the Four Pillars - writes a birth moment as eight characters from the Chinese solar calendar: a Heavenly Stem and an Earthly Branch for the year, month, day and hour.',
            'This library explains the phases, characters and relationships those eight characters are read through. It is far more than the year animal.',
        ],
    },
    tarot: {
        id: 'tarot',
        title: 'Tarot Encyclopedia',
        shortTitle: 'Tarot',
        mark: '✶',
        tagline: 'All seventy-eight cards, the four suits, and the spreads the app uses.',
        intro: [
            'The app reads with the Rider–Waite–Smith deck: twenty-two Major Arcana and fifty-six Minor Arcana in four suits, each card read upright or reversed.',
            'Each card has its own article - its imagery, its upright and reversed sense, and how its meaning shifts with position and company.',
        ],
    },
    synthesis: {
        id: 'synthesis',
        title: 'Synthesis Knowledge Guide',
        shortTitle: 'Synthesis',
        mark: '∴',
        tagline: 'What each system examines, and how to read them together.',
        intro: [
            'The five systems in this app ask different questions with different data. Read side by side, they sometimes agree, sometimes pull apart, and sometimes describe the same trait in different settings.',
            'This guide explains how to understand those relationships. It does not replace the personal Synthesis reading, which is built from one person’s calculated factors.',
        ],
    },
};
const LOADERS = {
    astrology: () => import('./content/astrology/index.js?v=99fda38'),
    numerology: () => import('./content/numerology/index.js?v=99fda38'),
    'human-design': () => import('./content/human-design/index.js?v=99fda38'),
    bazi: () => import('./content/bazi/index.js?v=99fda38'),
    tarot: () => import('./content/tarot/index.js?v=99fda38'),
    synthesis: () => import('./content/synthesis/index.js?v=99fda38'),
};
const cache = new Map();
/** Fetch one library's content (once per session). A failed fetch is not cached, so a retry can succeed. */
export function loadLibrary(id) {
    let pending = cache.get(id);
    if (!pending) {
        pending = LOADERS[id]().then((module) => module.LIBRARY);
        pending.catch(() => cache.delete(id));
        cache.set(id, pending);
    }
    return pending;
}
/** Whether a library has already been fetched (no network needed to show it). */
export const isLibraryLoaded = (id) => cache.has(id);
/** The library an article id belongs to, from the id alone. */
export function libraryOfArticle(articleId) {
    const head = articleId.split('.')[0];
    return LIBRARY_IDS.includes(head) ? head : null;
}
/** Find an article by id, loading its library if necessary. */
export async function findArticle(articleId) {
    const library = libraryOfArticle(articleId);
    if (!library)
        return null;
    const content = await loadLibrary(library);
    return content.articles.find((article) => article.id === articleId) ?? null;
}
