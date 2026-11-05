import { ARTICLES as guide } from './guide.js?v=99fda38';
export const LIBRARY = {
    id: 'synthesis',
    categories: [
        { id: 'pillar', title: 'What Each Pillar Examines', description: 'The question each system asks, and the data it asks it with.' },
        { id: 'guide', title: 'Reading Across Systems', description: 'How the systems differ, and what convergence, tension and context mean when they are read together.' },
    ],
    articles: [...guide],
};
