import { READER_CARDS_CORE } from './parts/readerCardsCore.js';
import { READER_CARDS_PART_1 } from './parts/readerCardsPart1.js';
import { READER_CARDS_PART_2 } from './parts/readerCardsPart2.js';
import { READER_CARDS_PART_3 } from './parts/readerCardsPart3.js';
import { READER_CARDS_PART_4 } from './parts/readerCardsPart4.js';
import { READER_CARDS_PART_5 } from './parts/readerCardsPart5.js';
import { READER_CARDS_PART_6 } from './parts/readerCardsPart6.js';
import { READER_CARDS_PART_7 } from './parts/readerCardsPart7.js';
import { READER_CARDS_PART_8 } from './parts/readerCardsPart8.js';
import { READER_CARDS_PART_9 } from './parts/readerCardsPart9.js';
import { READER_CARDS_PART_10 } from './parts/readerCardsPart10.js';
/**
 * ALL SEVENTY-EIGHT CARDS, READER LAYER.
 *
 * Authored in eleven parts so that no one file is the whole deck; assembled here into one
 * `Record<TarotCardId, ...>`. The type is the completeness check: a card id missing from every
 * part, or present twice with a different type, fails the compile. tests/tarotReaderCards.test.mjs
 * walks the deck for what a type cannot see: length, placeholders, forbidden phrasing, and that
 * the six places of one card read differently.
 */
export const READER_CARDS = {
    ...READER_CARDS_CORE,
    ...READER_CARDS_PART_1,
    ...READER_CARDS_PART_2,
    ...READER_CARDS_PART_3,
    ...READER_CARDS_PART_4,
    ...READER_CARDS_PART_5,
    ...READER_CARDS_PART_6,
    ...READER_CARDS_PART_7,
    ...READER_CARDS_PART_8,
    ...READER_CARDS_PART_9,
    ...READER_CARDS_PART_10,
};
