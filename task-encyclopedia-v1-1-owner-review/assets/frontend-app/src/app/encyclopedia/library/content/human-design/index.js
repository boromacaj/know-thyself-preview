import { ARTICLES as foundations } from './foundations.js?v=99fda38';
import { ARTICLES as types } from './types.js?v=99fda38';
import { ARTICLES as strategies } from './strategies.js?v=99fda38';
import { ARTICLES as authorities } from './authorities.js?v=99fda38';
import { ARTICLES as profiles } from './profiles.js?v=99fda38';
import { ARTICLES as lines } from './lines.js?v=99fda38';
import { ARTICLES as centers } from './centers.js?v=99fda38';
import { ARTICLES as definitions } from './definitions.js?v=99fda38';
import { ARTICLES as channels } from './channels.js?v=99fda38';
import { ARTICLES as gates } from './gates.js?v=99fda38';
export const LIBRARY = {
    id: 'human-design',
    categories: [
        { id: 'foundations', title: 'Foundations', description: 'What a BodyGraph is, where its two calculations come from, and the vocabulary of the system.' },
        { id: 'type', title: 'Types', description: 'The five Types and the way each is said to engage with the world.' },
        { id: 'strategy', title: 'Strategies', description: 'The decision-making approach the system pairs with each Type.' },
        { id: 'authority', title: 'Authorities', description: 'The inner reference the system treats as reliable for making decisions.' },
        { id: 'profile', title: 'Profiles', description: 'The twelve Profiles: two lines combined into a role.' },
        { id: 'line', title: 'The Six Lines', description: 'The six lines of a hexagram, the building blocks of every Profile.' },
        { id: 'center', title: 'The Nine Centres', description: 'Each centre, defined or open, and the theme it governs.' },
        { id: 'definition', title: 'Definition', description: 'How the defined centres connect - or do not - into one or more groups.' },
        { id: 'channel', title: 'Channels', description: 'The thirty-six channels that link two centres and define them.' },
        { id: 'gate', title: 'Gates', description: 'The sixty-four gates, each keyed to a hexagram of the I Ching.' },
    ],
    articles: [...foundations, ...types, ...strategies, ...authorities, ...profiles, ...lines, ...centers, ...definitions, ...channels, ...gates],
};
