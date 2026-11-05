import { ARTICLES as foundations } from './foundations.js?v=99fda38';
import { ARTICLES as suits } from './suits.js?v=99fda38';
import { ARTICLES as major } from './major.js?v=99fda38';
import { ARTICLES as wands } from './wands.js?v=99fda38';
import { ARTICLES as cups } from './cups.js?v=99fda38';
import { ARTICLES as swords } from './swords.js?v=99fda38';
import { ARTICLES as pentacles } from './pentacles.js?v=99fda38';
import { ARTICLES as spreads } from './spreads.js?v=99fda38';
export const LIBRARY = {
    id: 'tarot',
    categories: [
        { id: 'foundations', title: 'Foundations', description: 'How the deck is structured, how reversals and positions work, and how cards are read together.' },
        { id: 'suit', title: 'The Four Suits', description: 'Wands, Cups, Swords and Pentacles: the element and area of life each suit belongs to.' },
        { id: 'major', title: 'The Major Arcana', description: 'The twenty-two trump cards, from The Fool to The World.' },
        { id: 'wands', title: 'The Suit of Wands', description: 'Ace to King: will, drive, initiative and growth.' },
        { id: 'cups', title: 'The Suit of Cups', description: 'Ace to King: feeling, relationship and the inner life.' },
        { id: 'swords', title: 'The Suit of Swords', description: 'Ace to King: thought, conflict, truth and decision.' },
        { id: 'pentacles', title: 'The Suit of Pentacles', description: 'Ace to King: work, money, the body and material life.' },
        { id: 'spread', title: 'Spreads and Positions', description: 'The layouts the app uses and what each position asks of the card placed in it.' },
    ],
    articles: [...foundations, ...suits, ...major, ...wands, ...cups, ...swords, ...pentacles, ...spreads],
};
