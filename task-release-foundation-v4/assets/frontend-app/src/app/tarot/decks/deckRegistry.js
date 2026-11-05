import { TAROT_DECK } from '../data/tarotDeck.js?v=4cd804d';
/**
 * THE DECK REGISTRY.
 *
 * Every collection of artwork the application knows about, with where it came from, under what licence and how it relates to
 * the 78 canonical cards. The numbers in `assetManifest.bytes` and the card lists are written down here and ALSO produced by
 * the offline pipeline (tools/tarot-decks) into public/assets/tarot-decks/<deck>/deck.json; tests/tarotDeckLibrary.test.mjs
 * fails if the two disagree, so neither can drift.
 *
 * A COLLECTION IS ADDED ONLY WHEN ITS LICENCE CHAIN IS SETTLED. Five collections that were downloaded and checked are listed
 * here as 'withheld': their pictures are not shipped and the library does not show them. Why, per collection, is in
 * docs/tarot/decks/DECK_MANIFEST.md. Moving one to 'downloadable' is an owner decision that also needs the pipeline's `ship`
 * switch (tools/tarot-decks/sources.mjs), so it cannot happen by editing one file.
 */
export const DEFAULT_TAROT_DECK_ID = 'rws-1909';
const CANONICAL_IDS = TAROT_DECK.map((card) => card.id);
const ROMAN = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'];
function expandMappings(rules) {
    const present = {};
    const absent = [];
    for (const card of TAROT_DECK) {
        const lacks = rules.absent?.includes(card.id) === true || (rules.only !== undefined && !rules.only.includes(card.id));
        if (lacks) {
            absent.push(card.id);
            continue;
        }
        const major = card.arcana === 'major';
        const nativeNumber = rules.printed?.[card.id] ?? (rules.positionalMajors === true && major ? ROMAN[card.majorNumber ?? 0] : undefined);
        present[card.id] = {
            relation: rules.positionalMajors === true && major ? 'positional' : 'identity',
            ...(nativeNumber !== undefined ? { nativeNumber } : {}),
        };
    }
    return { present, absent };
}
const PUBLIC_DOMAIN = {
    id: 'public-domain', name: 'Public domain', url: 'https://creativecommons.org/publicdomain/mark/1.0/', commercialUse: true, attributionRequired: false,
};
const CC_BY_4 = {
    id: 'cc-by-4.0', name: 'CC BY 4.0', url: 'https://creativecommons.org/licenses/by/4.0/', commercialUse: true, attributionRequired: true,
};
const manifest = (root, l, bytes) => ({ root, version: 1, tiers: { t: true, m: true, l }, bytes });
const RWS_RULES = expandMappings({});
const SOLA_RULES = expandMappings({ positionalMajors: true });
const VISCONTI_RULES = expandMappings({
    absent: ['major-devil', 'major-tower', 'cups-king', 'swords-three', 'pentacles-knight'],
    printed: { 'major-justice': 'VIII', 'major-strength': 'XI' },
});
const MARSEILLE_RULES = expandMappings({ printed: { 'major-justice': 'VIII', 'major-strength': 'XI' } });
const VIEVILLE_RULES = expandMappings({ printed: { 'major-justice': 'VII', 'major-chariot': 'VIII', 'major-strength': 'IX', 'major-hermit': 'XI' } });
const WIRTH_RULES = expandMappings({
    only: CANONICAL_IDS.filter((id) => id.startsWith('major-')),
    printed: { 'major-justice': 'VIII', 'major-strength': 'XI' },
});
const BOTH = ['upright', 'reversed'];
export const TAROT_DECKS = Object.freeze([
    {
        deckId: 'rws-1909',
        name: 'Rider–Waite–Smith',
        author: 'Pamela Colman Smith, after Arthur Edward Waite',
        period: '1909',
        description: {
            en: 'The tarot most readers know: the 1909 Rider & Company deck drawn by Pamela Colman Smith, every card a small scene. These are scans of the first printing.',
            sk: 'Tarot, ktorý pozná väčšina čitateľov: balíček vydaný v roku 1909 u Rider & Company, ktorý nakreslila Pamela Colman Smith. Každá karta je malá scénka. Ide o skeny prvého vydania.',
        },
        license: PUBLIC_DOMAIN,
        attribution: {
            credit: 'Pamela Colman Smith, Rider–Waite tarot, Rider & Company, London, 1909 (“Pam-A” printing).',
            sourceName: 'Wikimedia Commons, Category “Rider-Waite-Smith tarot deck (TaionWC)”',
            sourceUrl: 'https://commons.wikimedia.org/wiki/Category:Rider-Waite-Smith_tarot_deck_(TaionWC)',
            note: 'Public domain: the 1909 publication and the artist (died 1951) are out of copyright. Resized and converted to WebP.',
        },
        cardCount: 78, absentCards: RWS_RULES.absent, cardMappings: RWS_RULES.present,
        cardAspect: 0.5792, cover: { file: 'cover.webp', aspect: 0.5961 },
        supportedOrientations: BOTH, deckClass: 'A', compatibilityMode: 'canonical',
        assetManifest: manifest('rws-1909', true, { t: 665272, m: 2530036, l: 8396292, cover: 27504 }),
        availabilityStatus: 'bundled', entitlement: { kind: 'free' }, interpretationExtension: null,
        previewCards: ['major-fool', 'major-magician', 'major-high-priestess', 'major-star', 'cups-ace', 'swords-three', 'pentacles-ten', 'wands-queen'],
    },
    {
        deckId: 'soimoi',
        name: 'Soimoi Tarot',
        author: 'Mike Koz',
        period: '2025',
        description: {
            en: 'A modern re-imagining of the Rider–Waite–Smith structure in an autumn Japanese setting. Same 78 cards, same order, new pictures.',
            sk: 'Moderné prerozprávanie štruktúry Rider–Waite–Smith v jesennom japonskom prostredí. Rovnakých 78 kariet v rovnakom poradí, nové obrazy.',
        },
        license: CC_BY_4,
        attribution: {
            credit: '“Soimoi Tarot” by Mike Koz (https://koz.tv/), licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Resized and converted to WebP.',
            sourceName: 'github.com/mixvlad/TarotCards, tarot/soimoi',
            sourceUrl: 'https://github.com/mixvlad/TarotCards/tree/main/tarot/soimoi',
            note: 'The author describes the deck as made with a generative image model; whether such images carry copyright differs between countries, and the licence covers whatever rights exist.',
        },
        cardCount: 78, absentCards: RWS_RULES.absent, cardMappings: RWS_RULES.present,
        cardAspect: 0.6667, cover: { file: 'cover.webp', aspect: 0.6667 },
        supportedOrientations: BOTH, deckClass: 'A', compatibilityMode: 'canonical',
        assetManifest: manifest('soimoi', true, { t: 340654, m: 1866608, l: 5677168, cover: 16576 }),
        availabilityStatus: 'downloadable', entitlement: { kind: 'free' }, interpretationExtension: null,
        previewCards: ['major-fool', 'major-magician', 'major-moon', 'major-sun', 'cups-ace', 'swords-three', 'pentacles-ten', 'wands-queen'],
        note: {
            en: 'New pictures for the same cards: every card is the canonical card, so a reading is the same whichever deck you look at.',
            sk: 'Nové obrazy pre rovnaké karty: každá karta je kanonická karta, takže výklad je rovnaký bez ohľadu na to, ktorý balíček pozeráte.',
        },
    },
    {
        deckId: 'sola-busca-1491',
        name: 'Sola Busca',
        author: 'Unknown artist (workshop attributed to Nicola di maestro Antonio)',
        period: 'c. 1491',
        description: {
            en: 'The earliest known fully illustrated 78-card tarot, made in Italy. Its small scenes inspired the Rider–Waite–Smith pip cards, but its trumps are different figures.',
            sk: 'Najstarší známy plne ilustrovaný tarot so 78 kartami z Talianska. Jeho malé scénky inšpirovali číselné karty Rider–Waite–Smith, no jeho tromfy sú iné postavy.',
        },
        license: PUBLIC_DOMAIN,
        attribution: {
            credit: 'Sola Busca tarot, Italy, c. 1491; artist unknown. The original is held by the Pinacoteca di Brera, Milan. Images: photographs of a modern facsimile (waitesmith.org), via Wikimedia Commons. Not supplied or endorsed by Brera.',
            sourceName: 'Wikimedia Commons, Category “Sola-Busca tarot deck”',
            sourceUrl: 'https://commons.wikimedia.org/wiki/Category:Sola-Busca_tarot_deck',
            note: 'Public domain (PD-Art on Wikimedia Commons). Resized and converted to WebP.',
        },
        cardCount: 78, absentCards: SOLA_RULES.absent, cardMappings: SOLA_RULES.present,
        cardAspect: 0.5405, cover: { file: 'cover.webp', aspect: 0.5405 },
        supportedOrientations: BOTH, deckClass: 'B', compatibilityMode: 'historical',
        assetManifest: manifest('sola-busca-1491', false, { t: 836050, m: 4811720, l: 0, cover: 36124 }),
        availabilityStatus: 'downloadable', entitlement: { kind: 'free' }, interpretationExtension: null,
        previewCards: ['major-fool', 'major-magician', 'major-lovers', 'major-world', 'cups-ace', 'swords-three', 'pentacles-ten', 'wands-queen'],
        note: {
            en: 'A historical deck. Its 22 trumps are different figures that hold the usual places of the sequence; its other 56 cards match by suit and rank. Pictures only: readings keep using a compatible deck.',
            sk: 'Historický balíček. Jeho 22 tromfov sú iné postavy na obvyklých miestach rady; ostatných 56 kariet sedí podľa farby a hodnoty. Len obrazy: výklady ďalej používajú kompatibilný balíček.',
        },
    },
    {
        deckId: 'visconti-sforza',
        name: 'Visconti–Sforza',
        author: 'Attributed to Bonifacio Bembo (workshop)',
        period: 'c. 1450–70',
        description: {
            en: 'Hand-painted for the dukes of Milan, one of the oldest surviving tarots. Five cards are lost, so 73 of the 78 are shown.',
            sk: 'Ručne maľovaný pre milánskych vojvodov, jeden z najstarších zachovaných tarotov. Päť kariet sa stratilo, takže je zobrazených 73 zo 78.',
        },
        license: PUBLIC_DOMAIN,
        attribution: {
            credit: 'Visconti–Sforza (Pierpont Morgan–Bergamo) tarot, Milan, c. 1450–70, attributed to Bonifacio Bembo. Originals: Morgan Library & Museum, Accademia Carrara and a private collection. Scans by David Madore (2003) of a modern facsimile, via Wikimedia Commons. Not supplied or endorsed by those institutions.',
            sourceName: 'Wikimedia Commons, Category “Pierpont Morgan-Bergamo Visconti-Sforza Tarot”',
            sourceUrl: 'https://commons.wikimedia.org/wiki/Category:Pierpont_Morgan-Bergamo_Visconti-Sforza_Tarot',
            note: 'Public domain (PD-Art on Wikimedia Commons). The four cards the facsimile’s publisher had to reconstruct are not included. Resized and converted to WebP.',
        },
        cardCount: 73, absentCards: VISCONTI_RULES.absent, cardMappings: VISCONTI_RULES.present,
        cardAspect: 0.5, cover: { file: 'cover.webp', aspect: 0.5 },
        supportedOrientations: BOTH, deckClass: 'C', compatibilityMode: 'partial',
        assetManifest: manifest('visconti-sforza', false, { t: 841430, m: 5611290, l: 0, cover: 41096 }),
        availabilityStatus: 'downloadable', entitlement: { kind: 'free' }, interpretationExtension: null,
        previewCards: ['major-fool', 'major-magician', 'major-empress', 'major-strength', 'major-star', 'cups-ace', 'pentacles-ten', 'wands-king'],
        note: {
            en: 'A partial historical deck: the Devil, the Tower, the Three of Swords, the Knight of Pentacles and the King of Cups are lost, and are shown as missing rather than replaced. Pictures only.',
            sk: 'Čiastočný historický balíček: Diabol, Veža, Trojka mečov, Rytier mincí a Kráľ pohárov sa stratili a zobrazujú sa ako chýbajúce, nie ako náhrada. Len obrazy.',
        },
    },
    /* ------------------------------------------------------------ withheld --
       Downloaded, checked and NOT shipped: every one comes from a Bibliotheque nationale de France (Gallica) scan, and Gallica's
       published conditions make commercial reuse paid and licensed (tools/tarot-decks/evidence/gallica-conditions-excerpt.txt).
       No image of these is in the application; the entries exist so the record, the mappings and the tests are complete. */
    {
        deckId: 'marseille-lequart', name: 'Tarot de Marseille (Lequart)', author: 'Lequart, Paris', period: '19th century',
        description: { en: 'Classic Marseille pattern. Withheld pending a licence decision.' },
        license: PUBLIC_DOMAIN,
        attribution: { credit: 'Lequart (Paris), Tarot de Marseille, via Gallica / Wikimedia Commons.', sourceName: 'Wikimedia Commons', sourceUrl: 'https://commons.wikimedia.org/wiki/Category:Tarot_de_Marseille_(Single_Cards)' },
        cardCount: 78, absentCards: MARSEILLE_RULES.absent, cardMappings: MARSEILLE_RULES.present,
        cardAspect: 0.53, cover: { file: 'cover.webp', aspect: 0.53 },
        supportedOrientations: BOTH, deckClass: 'B', compatibilityMode: 'historical',
        assetManifest: manifest('marseille-lequart', false, { t: 0, m: 0, l: 0, cover: 0 }),
        availabilityStatus: 'withheld', entitlement: { kind: 'free' }, interpretationExtension: null, previewCards: [],
    },
    {
        deckId: 'vieville', name: 'Tarot de Viéville', author: 'Jacques Viéville, Paris', period: 'c. 1650',
        description: { en: 'Early Parisian tarot with its own trump order. Withheld pending a licence decision.' },
        license: PUBLIC_DOMAIN,
        attribution: { credit: 'Jacques Viéville, Paris, c. 1650, via Gallica / Wikimedia Commons.', sourceName: 'Wikimedia Commons', sourceUrl: 'https://commons.wikimedia.org/wiki/Category:Vi%C3%A9ville_tarot' },
        cardCount: 78, absentCards: VIEVILLE_RULES.absent, cardMappings: VIEVILLE_RULES.present,
        cardAspect: 0.56, cover: { file: 'cover.webp', aspect: 0.56 },
        supportedOrientations: BOTH, deckClass: 'B', compatibilityMode: 'historical',
        assetManifest: manifest('vieville', false, { t: 0, m: 0, l: 0, cover: 0 }),
        availabilityStatus: 'withheld', entitlement: { kind: 'free' }, interpretationExtension: null, previewCards: [],
    },
    {
        deckId: 'oswald-wirth', name: 'Oswald Wirth', author: 'Oswald Wirth', period: '1889',
        description: { en: 'The 22 Major Arcana of the esoteric tarot of 1889. Withheld pending a licence decision.' },
        license: PUBLIC_DOMAIN,
        attribution: { credit: 'Oswald Wirth, Les 22 Arcanes du Tarot Kabbalistique, Paris, 1889, via Gallica / Wikimedia Commons.', sourceName: 'Wikimedia Commons', sourceUrl: 'https://commons.wikimedia.org/wiki/Category:Oswald_Wirth_tarot_deck' },
        cardCount: 22, absentCards: WIRTH_RULES.absent, cardMappings: WIRTH_RULES.present,
        cardAspect: 0.59, cover: { file: 'cover.webp', aspect: 0.59 },
        supportedOrientations: BOTH, deckClass: 'C', compatibilityMode: 'partial',
        assetManifest: manifest('oswald-wirth', false, { t: 0, m: 0, l: 0, cover: 0 }),
        availabilityStatus: 'withheld', entitlement: { kind: 'free' }, interpretationExtension: null, previewCards: [],
    },
    {
        deckId: 'tarot-nouveau', name: 'Tarot Nouveau (Grimaud)', author: 'B.-P. Grimaud, France', period: '1898',
        description: { en: 'A French-suited game tarot, not a divinatory deck. It needs its own card system. Withheld.' },
        license: PUBLIC_DOMAIN,
        attribution: { credit: 'B.-P. Grimaud, Tarot nouveau, 1898, via Gallica / Wikimedia Commons.', sourceName: 'Wikimedia Commons', sourceUrl: 'https://commons.wikimedia.org/wiki/Category:Tarot_nouveau_-_Grimaud_-_1898' },
        cardCount: 0, absentCards: CANONICAL_IDS, cardMappings: {},
        cardAspect: 0.57, cover: { file: 'cover.webp', aspect: 0.57 },
        supportedOrientations: BOTH, deckClass: 'B', compatibilityMode: 'historical',
        assetManifest: manifest('tarot-nouveau', false, { t: 0, m: 0, l: 0, cover: 0 }),
        availabilityStatus: 'withheld', entitlement: { kind: 'free' }, interpretationExtension: null, previewCards: [],
    },
    {
        deckId: 'etteilla', name: 'Grand Etteilla', author: 'Etteilla (J.-B. Alliette)', period: 'c. 1880–90',
        description: { en: 'Etteilla’s divinatory tarot with its own 78-card system. It needs its own interpretation system. Withheld.' },
        license: PUBLIC_DOMAIN,
        attribution: { credit: 'Grand Etteilla, H. Pussey, Paris, c. 1880–90, via Gallica / Wikimedia Commons.', sourceName: 'Wikimedia Commons', sourceUrl: 'https://commons.wikimedia.org/wiki/Category:Etteilla_I_tarot_deck' },
        cardCount: 0, absentCards: CANONICAL_IDS, cardMappings: {},
        cardAspect: 0.57, cover: { file: 'cover.webp', aspect: 0.57 },
        supportedOrientations: BOTH, deckClass: 'B', compatibilityMode: 'historical',
        assetManifest: manifest('etteilla', false, { t: 0, m: 0, l: 0, cover: 0 }),
        availabilityStatus: 'withheld', entitlement: { kind: 'free' }, interpretationExtension: null, previewCards: [],
    },
]);
const BY_ID = new Map(TAROT_DECKS.map((deck) => [deck.deckId, deck]));
export const getTarotDeckDefinition = (deckId) => BY_ID.get(deckId) ?? null;
/** The decks a person can see and choose: everything that is not withheld. */
export const listShownTarotDecks = () => TAROT_DECKS.filter((deck) => deck.availabilityStatus !== 'withheld');
/** True for the decks a reading may use: the full compatible ones. */
export const isReadingCompatibleDeck = (deck) => deck.deckClass === 'A' && deck.compatibilityMode === 'canonical' && deck.cardCount === CANONICAL_IDS.length && deck.availabilityStatus !== 'withheld';
/** The deck's mapping for a canonical card, or null when the deck has no card for it. */
export const deckCardMapping = (deck, cardId) => deck.cardMappings[cardId] ?? null;
export const deckClassLabel = (deckClass) => deckClass === 'A' ? 'full' : deckClass === 'B' ? 'historical' : 'partial';
