/*
 * THE SOURCE MANIFEST.
 *
 * Every knowledge unit already carries a `Provenance` saying what KIND of claim
 * it is and how settled. What it could not say was WHERE the doctrine came
 * from in a way anybody could check: `sources: ['RESEARCH_BAZI#strength']` is an
 * internal note, not a citation, and it carries nothing about whether the
 * material behind it may lawfully be used in a commercial product.
 *
 * This file is that missing half. One entry per source actually consulted, with
 * the licence position stated explicitly, so that:
 *
 *   - a unit can cite a real work and a real locator;
 *   - the licence status of everything the knowledge base rests on is visible
 *     in one place rather than remembered;
 *   - a source whose terms forbid commercial or derivative use cannot be cited
 *     by accident, because the type system makes the status a required field.
 *
 * WHAT THIS IS NOT
 * It is not a reading list. A source belongs here only once it has been READ
 * and used. An aspirational bibliography would defeat the point: the reason to
 * keep it is so that "where does this claim come from?" has an answer.
 */
/**
 * The sources this knowledge base has actually read and used.
 *
 * Kept short on purpose. Everything researched but not yet ingested lives in
 * the research dossier, not here.
 */
export const SOURCES = {
    'legge-yi-king-1882': {
        id: 'legge-yi-king-1882',
        title: 'The Yî King (Sacred Books of the East, Vol. XVI)',
        author: 'James Legge (translator)',
        year: 1882,
        url: 'https://en.wikisource.org/wiki/Sacred_Books_of_the_East/Volume_16',
        licence: 'public-domain',
        licenceBasis: 'Published 1882; the translator died in 1897. Copyright has expired worldwide. '
            + 'The Wikisource transcription is additionally CC BY-SA.',
        tradition: 'Classical Chinese I Ching, King Wen sequence',
        language: 'English translation from Chinese',
        caveat: 'Wikisource has proofread hexagrams 1-32 only; 33-64 exist on the 1882 scan '
            + 'at archive.org but the OCR interleaves Legge\'s footnotes with the primary '
            + 'text and has not been verified line by line. Only 1-32 have been used.',
    },
    'balliett-philosophy-of-numbers-1908': {
        id: 'balliett-philosophy-of-numbers-1908',
        title: 'The Philosophy of Numbers: Their Tone and Colors',
        author: 'Mrs. L. Dow Balliett',
        year: 1908,
        url: 'https://archive.org/details/philosophyofnum00ball',
        licence: 'public-domain',
        licenceBasis: 'Published 1908 and the author died in 1929, so copyright has expired in the United '
            + 'States and in life-plus-70 jurisdictions alike. Scanned and served by the Internet '
            + 'Archive without additional claim.',
        tradition: 'Pythagorean numerology, American school',
        language: 'English',
        caveat: 'Read for the 1-9 number characters, which it founds and which the modern schools '
            + 'inherit. It is NOT a source for the four-position core-number system this app reads '
            + 'them in - Life Path, Expression, Soul Urge, Personality are a later convention and '
            + 'appear nowhere in the book, which works from name vibration, tone and colour. The OCR '
            + 'is rough in places; nothing was taken from a passage that could not be read cleanly.',
    },
    'cheiro-book-of-numbers-1926': {
        id: 'cheiro-book-of-numbers-1926',
        title: "Cheiro's Book of Numbers",
        author: 'Cheiro (William John Warner)',
        year: 1926,
        url: 'https://archive.org/search?query=cheiro+book+of+numbers',
        licence: 'public-domain',
        licenceBasis: 'Published in 1926 and the author died in 1936, so it is in the public domain in the United States (published before 1930) and in life-plus-70 jurisdictions. '
            + 'Only paraphrased meanings are used; nothing is quoted.',
        tradition: 'Compound-number numerology (the totals 10 to 52 read before they reduce), English school',
        language: 'English',
        caveat: 'Added for the Numerology reading (Reading Quality V3), which reads only the compound totals 15, 20 and 24 as the older tradition’s, in one clause each. The book was NOT re-read in that task: '
            + 'the three meanings are paraphrases of the commonly reported attributions and must be checked against the text before they are relied on or extended. '
            + 'It is not a source for the four-position core-number system, and the totals 13, 14, 16 and 19 are handled as karmic debts from the modern schools instead.',
    },
    'ptolemy-tetrabiblos-ashmand': {
        id: 'ptolemy-tetrabiblos-ashmand',
        title: 'Tetrabiblos, or Quadripartite (Ashmand translation)',
        author: 'Claudius Ptolemy; J. M. Ashmand (translator)',
        year: 1822,
        url: 'https://www.gutenberg.org/ebooks/70850',
        licence: 'public-domain',
        licenceBasis: 'Second-century original; the Ashmand translation is from 1822 and the edition '
            + 'transcribed by Project Gutenberg is the 1900 reprint. Project Gutenberg states public '
            + 'domain in the USA and the translator died in the nineteenth century.',
        tradition: 'Hellenistic and traditional Western astrology',
        language: 'English translation from Greek',
        caveat: 'The authority for the dignity scheme, the aspect set, the quadruplicities and the '
            + 'planetary natures - all of which it states with reasons. It is NOT a source for the '
            + 'psychological reading of a placement, which is a twentieth-century development, nor '
            + 'for the outer planets, which it could not have known. Its mundane and medical '
            + 'chapters are deliberately not used.',
    },
    'cafeastrology-natal-chart-interpretations-2026': {
        id: 'cafeastrology-natal-chart-interpretations-2026',
        title: 'Natal Chart Interpretations: Ascendant, Sun and Moon in the twelve signs (three pages)',
        author: 'Annie Heese, CafeAstrology.com',
        year: 2026,
        url: 'https://cafeastrology.com/natal-chart-interpretations.html',
        licence: 'restricted',
        licenceBasis: 'A commercial astrologer’s site (copyright 2002 onward), read 2026-10-11 for how one practitioner describes each sign as an Ascendant, a Sun and a Moon; '
            + 'nothing is quoted or adapted, and every record is original prose.',
        tradition: 'Modern Western (psychological) astrology, tropical zodiac',
        language: 'English',
        caveat: 'The only reference here that covers all 36 placements on one site, and it is commercial. Reads the placements as personality; the records keep that framing '
            + 'as symbolic and say what each placement can cost as well as what it gives.',
    },
    'astrology-com-placements-2026': {
        id: 'astrology-com-placements-2026',
        title: 'Sun in a sign, Moon in a sign and Rising sign pages (one page per placement and sign)',
        author: 'Astrology.com',
        year: 2026,
        url: 'https://www.astrology.com/planets/moon-in-cancer',
        licence: 'restricted',
        licenceBasis: 'A commercial publisher’s undated pages (no author shown), read 2026-10-11 for the same 36 placements as a second, independent reading; nothing is quoted or adapted.',
        tradition: 'Popular modern Western astrology, tropical zodiac',
        language: 'English',
        caveat: 'Shorter and more list-like than CafeAstrology. States a ruling planet, element and modality on most pages, which is where Scorpio, Aquarius and Pisces show '
            + 'their two rulers. Not independent of the modern psychological tradition CafeAstrology also stands in.',
    },
    'wikipedia-astrological-sign-2026': {
        id: 'wikipedia-astrological-sign-2026',
        title: 'Astrological sign (table of the twelve signs: element, modality, modern and classical ruler)',
        author: 'Wikipedia contributors',
        year: 2026,
        url: 'https://en.wikipedia.org/wiki/Astrological_sign',
        licence: 'official-free',
        licenceBasis: 'Published free under CC BY-SA; read 2026-10-11 only for the structural table and the note that the tropical signs have drifted from the constellations they are named after, never for a reading.',
        tradition: 'Reference',
        language: 'English',
        caveat: 'A general reference. Agrees with Astrology.com on every element, modality and ruler; lists Pluto for Scorpio with Mars also given.',
    },
    'wikipedia-astrology-and-science-2026': {
        id: 'wikipedia-astrology-and-science-2026',
        title: 'Astrology and science',
        author: 'Wikipedia contributors',
        year: 2026,
        url: 'https://en.wikipedia.org/wiki/Astrology_and_science',
        licence: 'official-free',
        licenceBasis: 'Published free under CC BY-SA; read 2026-10-11 only for the framing that astrology has not been supported by testing (Carlson 1985 in Nature, Dean and Kelly), never for a reading.',
        tradition: 'Scientific assessment',
        language: 'English',
        caveat: 'A summary of the research, not the research; the product therefore frames every sheet as symbolic reflection.',
    },
    'decoz-worldnumerology-2026': {
        id: 'decoz-worldnumerology-2026',
        title: 'World Numerology: Life Path, Expression, Soul Urge, Personality and Master Numbers (one page per number and position)',
        author: 'Hans Decoz (World Numerology)',
        year: 2026,
        url: 'https://www.worldnumerology.com/numerology-life-path/',
        licence: 'restricted',
        licenceBasis: 'A commercial publisher’s web pages, undated (the year is the year they were read, 2026-10-11). Read to see how '
            + 'one established practitioner describes each number in each position; nothing is quoted or adapted, and every record '
            + 'is original prose.',
        tradition: 'Modern Western / Pythagorean numerology, American lineage (Juno Jordan to Decoz)',
        language: 'English',
        caveat: 'The only source here that has a page for every one of the 48 number-and-position pairs, and it is also a '
            + 'commercial site. Its Personality and Soul Urge pages are short; its Life Path pages describe challenges less '
            + 'than strengths. Not independent of the American lineage the other modern sources also stand in.',
    },
    'numerologist-andrews-2026': {
        id: 'numerologist-andrews-2026',
        title: 'Numerologist.com: Life Path, Expression, Soul Urge and Personality number pages',
        author: 'Blair Andrews (Numerologist.com)',
        year: 2026,
        url: 'https://numerologist.com/numerology/expression-number-7',
        licence: 'restricted',
        licenceBasis: 'A commercial publisher’s web pages, published 2025 and updated 2026. Read for how a second practitioner reads each number '
            + 'in each position, and for where the two disagree; nothing is quoted or adapted.',
        tradition: 'Modern Western / Pythagorean numerology with a Tarot-correspondence frame',
        language: 'English',
        caveat: 'Reads 33 as an intensified 6 and says only 11 and 22 are classical master numbers. Writes in a different register '
            + 'from the lineage sources (Tarot correspondences, planets), which is the reason it is a useful cross-check and the '
            + 'reason its framing is not taken over.',
    },
    'numerology-com-staff-2026': {
        id: 'numerology-com-staff-2026',
        title: 'Numerology.com: Expression Numbers in Numerology; Master Number 11, 22 and 33 articles',
        author: 'Numerology.com Staff',
        year: 2026,
        url: 'https://www.numerology.com/articles/about-numerology/master-number-11/',
        licence: 'restricted',
        licenceBasis: 'A commercial publisher’s undated articles, read 2026-10-11 for the shared reading of the master numbers and of the Expression '
            + 'number as a whole; nothing is quoted or adapted.',
        tradition: 'Modern Western / Pythagorean numerology',
        language: 'English',
        caveat: 'Treats 33 as a master number without discussing whether it is one. States that a master number is strongest as a core '
            + 'chart number and means little from a clock or a birthday, which the records follow.',
    },
    'cafeastrology-numbers-2026': {
        id: 'cafeastrology-numbers-2026',
        title: 'You By Your Numbers (number descriptions for 7, 11, 22 and 33)',
        author: 'CafeAstrology.com',
        year: 2026,
        url: 'https://cafeastrology.com/numerology2/numberdescrip.php?number=7',
        licence: 'restricted',
        licenceBasis: 'A commercial site’s pages (copyright 2002 onward), read 2026-10-11 for number-level symbolism only; nothing is quoted or adapted.',
        tradition: 'Modern Western numerology, with astrological and Tarot correspondences',
        language: 'English',
        caveat: 'Describes the number, not the position, so it supports the shared meaning of a number and says nothing about where it sits. '
            + 'Does not call 33 a master number, which is one of the recorded disagreements. Lists no negative traits for 11, 22 or 33.',
    },
    'skeptoid-numerology-626-2018': {
        id: 'skeptoid-numerology-626-2018',
        title: 'Numerology (Skeptoid Podcast #626)',
        author: 'Brian Dunning',
        year: 2018,
        url: 'https://skeptoid.com/episodes/626',
        licence: 'official-free',
        licenceBasis: 'Published free by its author (5 June 2018) with a transcript; cited only for the framing that numerology is a symbolic practice '
            + 'without validated predictive power, never for any reading.',
        tradition: 'Scientific skepticism',
        language: 'English',
        caveat: 'Argues that numerology cannot be tested as a whole because there are many versions; the records are therefore framed as reflection, not measurement.',
    },
};
/** Format a citation for the technical appendix. */
export function citationText(citation) {
    const source = SOURCES[citation.sourceId];
    if (!source)
        return `${citation.sourceId} ${citation.locator}`;
    return `${source.author}, ${source.title} (${source.year}), ${citation.locator}`;
}
/** Sources whose terms do not support use as a basis for this product. */
export const unusableSources = () => Object.values(SOURCES).filter((source) => source.licence === 'restricted');
