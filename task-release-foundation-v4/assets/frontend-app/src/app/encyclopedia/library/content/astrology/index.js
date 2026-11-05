import { ARTICLES as foundations } from './foundations.js?v=4cd804d';
import { ARTICLES as signs } from './signs.js?v=4cd804d';
import { ARTICLES as planets } from './planets.js?v=4cd804d';
import { ARTICLES as houses } from './houses.js?v=4cd804d';
import { ARTICLES as aspects } from './aspects.js?v=4cd804d';
import { ARTICLES as moonPhases } from './moonPhases.js?v=4cd804d';
import { ARTICLES as sunSigns } from './sunSigns.js?v=4cd804d';
import { ARTICLES as moonSigns } from './moonSigns.js?v=4cd804d';
import { ARTICLES as ascendants } from './ascendants.js?v=4cd804d';
import { ARTICLES as descendants } from './descendants.js?v=4cd804d';
export const LIBRARY = {
    id: 'astrology',
    categories: [
        { id: 'foundations', title: 'Foundations', description: 'How a natal chart is built: the zodiac, the angles, house systems, dignity and the vocabulary used everywhere else.' },
        { id: 'sign', title: 'The Twelve Signs', description: 'Each sign as an archetype: its element, modality, ruler and symbolism.' },
        { id: 'planet', title: 'The Planets', description: 'The ten bodies the chart is drawn from, and the kind of experience each one stands for.' },
        { id: 'point', title: 'Nodes, Chiron and Asteroids', description: 'The lunar nodes, Chiron and the four asteroids the app can add to a timed chart.' },
        { id: 'house', title: 'The Twelve Houses', description: 'The areas of life the chart is divided into, read with Whole Sign Houses.' },
        { id: 'aspect', title: 'Aspects', description: 'The angles between planets: the five major aspects and the four minor ones.' },
        { id: 'sun', title: 'The Sun Through the Signs', description: 'What the Sun - purpose and conscious identity - looks like in each sign.' },
        { id: 'moon', title: 'The Moon Through the Signs', description: 'What the Moon - needs, comfort and emotional habit - looks like in each sign.' },
        { id: 'ascendant', title: 'The Ascendant Through the Signs', description: 'The rising sign: approach, first impression and the angle the whole chart starts from.' },
        { id: 'descendant', title: 'The Descendant Through the Signs', description: 'The setting sign: what is sought, met or projected in partners and close others.' },
        { id: 'moon-phase', title: 'Moon Phases', description: 'The eight phases of the Sun–Moon cycle and how the tradition reads a birth phase.' },
    ],
    articles: [...foundations, ...signs, ...planets, ...houses, ...aspects, ...moonPhases, ...sunSigns, ...moonSigns, ...ascendants, ...descendants],
};
