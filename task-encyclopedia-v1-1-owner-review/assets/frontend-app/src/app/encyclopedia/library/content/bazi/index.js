import { ARTICLES as foundations } from './foundations.js?v=99fda38';
import { ARTICLES as elements } from './elements.js?v=99fda38';
import { ARTICLES as stems } from './stems.js?v=99fda38';
import { ARTICLES as branches } from './branches.js?v=99fda38';
import { ARTICLES as pillars } from './pillars.js?v=99fda38';
import { ARTICLES as tenGods } from './tenGods.js?v=99fda38';
import { ARTICLES as relationships } from './relationships.js?v=99fda38';
export const LIBRARY = {
    id: 'bazi',
    categories: [
        { id: 'foundations', title: 'Foundations', description: 'The Four Pillars, the calendar they come from, the Day Master and how a chart is weighed.' },
        { id: 'element', title: 'The Five Phases', description: 'Wood, Fire, Earth, Metal and Water, and the cycles that connect them.' },
        { id: 'stem', title: 'The Ten Heavenly Stems', description: 'The ten stems: each phase in its yang and yin form.' },
        { id: 'branch', title: 'The Twelve Earthly Branches', description: 'The twelve branches, their animals, seasons and hidden stems.' },
        { id: 'pillar', title: 'The Four Pillars', description: 'The Year, Month, Day and Hour pillars and the part of life each one is read as describing.' },
        { id: 'ten-god', title: 'The Ten Gods', description: 'The ten relationships every other stem forms with the Day Master.' },
        { id: 'relationship', title: 'Combinations and Clashes', description: 'How stems and branches combine, clash, harm and punish one another.' },
    ],
    articles: [...foundations, ...elements, ...stems, ...branches, ...pillars, ...tenGods, ...relationships],
};
