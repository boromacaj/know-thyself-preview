import { ARTICLES as foundations } from './foundations.js?v=99fda38';
import { ARTICLES as numbers } from './numbers.js?v=99fda38';
import { ARTICLES as positions } from './positions.js?v=99fda38';
import { ARTICLES as lifePath } from './lifePath.js?v=99fda38';
import { ARTICLES as expression } from './expression.js?v=99fda38';
import { ARTICLES as soulUrge } from './soulUrge.js?v=99fda38';
import { ARTICLES as personality } from './personality.js?v=99fda38';
import { ARTICLES as birthday } from './birthday.js?v=99fda38';
import { ARTICLES as personalYear } from './personalYear.js?v=99fda38';
import { ARTICLES as karmicDebt } from './karmicDebt.js?v=99fda38';
export const LIBRARY = {
    id: 'numerology',
    categories: [
        { id: 'foundations', title: 'Foundations', description: 'The Pythagorean method: letter values, reduction, master numbers and what a numerology chart contains.' },
        { id: 'number', title: 'The Numbers', description: 'Each number from 1 to 9 and the master numbers 11, 22 and 33 as archetypes.' },
        { id: 'position', title: 'The Positions', description: 'What each calculated position measures - from the Life Path to the Pinnacles - and how it is derived.' },
        { id: 'life-path', title: 'Life Path Numbers', description: 'Each Life Path: the direction a life is read as taking.' },
        { id: 'expression', title: 'Expression / Destiny Numbers', description: 'Each Expression number: the capacities a full birth name is read as describing.' },
        { id: 'soul-urge', title: 'Soul Urge Numbers', description: 'Each Soul Urge: the inner motive read from the vowels of the name.' },
        { id: 'personality', title: 'Personality Numbers', description: 'Each Personality number: the outward impression read from the consonants of the name.' },
        { id: 'birthday', title: 'Birthday Numbers', description: 'Each Birthday number: the particular talent read from the day of birth.' },
        { id: 'personal-year', title: 'Personal Years', description: 'The nine-year cycle, one year at a time.' },
        { id: 'karmic-debt', title: 'Karmic Debt Numbers', description: 'The four compound numbers 13, 14, 16 and 19 and what the tradition reads in them.' },
    ],
    articles: [...foundations, ...numbers, ...positions, ...lifePath, ...expression, ...soulUrge, ...personality, ...birthday, ...personalYear, ...karmicDebt],
};
