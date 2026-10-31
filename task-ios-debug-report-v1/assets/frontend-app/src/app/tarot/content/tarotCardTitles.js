import { TAROT_DECK } from '../data/tarotDeck.js?v=b5ef5ed';
export function buildTarotCardTitles(lexicon) {
    if (lexicon.majors.length !== 22) {
        throw new Error(`tarot titles: expected 22 major names, got ${lexicon.majors.length}`);
    }
    const titles = {};
    for (const card of TAROT_DECK) {
        if (card.arcana === 'major') {
            const name = lexicon.majors[card.majorNumber ?? -1];
            if (!name)
                throw new Error(`tarot titles: no major name for ${card.id}`);
            titles[card.id] = name;
            continue;
        }
        if (!card.suit || !card.rank)
            throw new Error(`tarot titles: ${card.id} has no suit/rank`);
        titles[card.id] = lexicon.minor(lexicon.ranks[card.rank], lexicon.suits[card.suit]);
    }
    const distinct = new Set(Object.values(titles));
    if (distinct.size !== TAROT_DECK.length) {
        throw new Error(`tarot titles: ${TAROT_DECK.length} cards produced only ${distinct.size} distinct titles`);
    }
    return titles;
}
export const TAROT_TITLE_LEXICON_EN = {
    majors: [
        'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
        'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
        'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
        'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement',
        'The World',
    ],
    ranks: {
        ace: 'Ace', two: 'Two', three: 'Three', four: 'Four', five: 'Five', six: 'Six',
        seven: 'Seven', eight: 'Eight', nine: 'Nine', ten: 'Ten',
        page: 'Page', knight: 'Knight', queen: 'Queen', king: 'King',
    },
    suits: { wands: 'Wands', cups: 'Cups', swords: 'Swords', pentacles: 'Pentacles' },
    minor: (rank, suit) => `${rank} of ${suit}`,
};
/**
 * SLOVAK NAMES, AND THE ONE CHOICE THAT HAD TO BE MADE.
 *
 * Slovak tarot usage offers Mince / Denáre / Pentakle for the fourth suit and
 * Poháre / Čaše for the second. The product picks ONE of each and never
 * alternates, because a reading that called the same suit two things inside one
 * paragraph would read as two different decks. Chosen: palice, poháre, meče,
 * mince - the plainest Slovak set, and the one a reader is most likely to have
 * met. Documented in docs/tarot/TAROT_SK_STYLE.md.
 *
 * The suit words are stored in the GENITIVE PLURAL, because that is the only
 * form a Slovak card title uses: "Eso palíc", never "Eso palice".
 */
export const TAROT_TITLE_LEXICON_SK = {
    majors: [
        'Blázon', 'Mág', 'Veľkňažka', 'Cisárovná', 'Cisár',
        'Veľkňaz', 'Zaľúbenci', 'Voz', 'Sila', 'Pustovník',
        'Koleso šťastia', 'Spravodlivosť', 'Obesenec', 'Smrť', 'Miernosť',
        'Diabol', 'Veža', 'Hviezda', 'Mesiac', 'Slnko', 'Súd',
        'Svet',
    ],
    ranks: {
        ace: 'Eso', two: 'Dvojka', three: 'Trojka', four: 'Štvorka', five: 'Päťka',
        six: 'Šestka', seven: 'Sedmička', eight: 'Osmička', nine: 'Deviatka', ten: 'Desiatka',
        page: 'Páža', knight: 'Rytier', queen: 'Kráľovná', king: 'Kráľ',
    },
    suits: { wands: 'palíc', cups: 'pohárov', swords: 'mečov', pentacles: 'mincí' },
    minor: (rank, suit) => `${rank} ${suit}`,
};
