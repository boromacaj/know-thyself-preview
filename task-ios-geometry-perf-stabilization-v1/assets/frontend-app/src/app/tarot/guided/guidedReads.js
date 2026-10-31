export const GUIDED_READS = {
    /* Relationships */
    'relationships.current-situation': [['state'], ['other'], ['driver']],
    'relationships.tension': [['state'], ['driver'], ['response']],
    'relationships.what-helps': [['state'], ['response'], ['direction']],
    'relationships.attention': [['state'], ['driver'], ['direction']],
    /* Work & Career */
    'work-career.direction': [['origin'], ['state'], ['direction']],
    'work-career.obstacle': [['state'], ['origin', 'driver'], ['response']],
    'work-career.strengths': [['state'], ['driver'], ['response']],
    'work-career.next-step': [['state'], ['response'], ['direction']],
    /* Finances & Stability */
    'finances-stability.security': [['state'], ['origin'], ['driver']],
    'finances-stability.priorities': [['state'], ['state'], ['driver']],
    'finances-stability.risk': [['state'], ['driver'], ['state']],
    'finances-stability.habits': [['state'], ['origin', 'driver'], ['direction']],
    /* Personal & Spiritual Growth */
    'personal-growth.pattern': [['state', 'origin'], ['driver'], ['response']],
    'personal-growth.values': [['state'], ['driver'], ['response']],
    'personal-growth.growth': [['origin'], ['state', 'driver'], ['direction']],
    'personal-growth.inner-direction': [['state'], ['driver', 'response'], ['direction']],
    /* Life Changes & Decisions */
    'life-changes.crossroads': [['direction'], ['direction'], ['state']],
    'life-changes.release': [['origin'], ['driver'], ['response']],
    'life-changes.resources': [['origin'], ['state'], ['response']],
    'life-changes.forward': [['origin', 'state'], ['response'], ['direction']],
    /* Home & Moving */
    'home-moving.meaning': [['state'], ['driver'], ['origin']],
    'home-moving.need-for-change': [['state'], ['origin'], ['state']],
    'home-moving.adapting': [['origin'], ['state', 'response'], ['direction']],
    'home-moving.grounded': [['state'], ['state', 'response'], ['response']],
    /* Travel & New Experiences */
    'travel-experiences.draw': [['state'], ['driver', 'direction'], ['response']],
    'travel-experiences.unknown': [['state'], ['origin'], ['response']],
    'travel-experiences.prepare': [['state'], ['response'], ['direction']],
    'travel-experiences.teaches': [['state'], ['driver'], ['direction']],
};
export const guidedReadsFor = (intentionId) => GUIDED_READS[intentionId] ?? null;
