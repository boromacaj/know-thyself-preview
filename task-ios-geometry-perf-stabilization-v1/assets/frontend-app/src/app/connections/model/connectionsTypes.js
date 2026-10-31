/**
 * CONNECTIONS: THE SHARED VOCABULARY.
 *
 * One product, four domains, one set of types. Nothing here is a sentence and nothing here is a calculation: it names the domains, the kinds of relationship each one
 * holds, the roles the people in a relationship play, and the people themselves. The engine (evidence/, domains/), the reading (reading/) and the screens (ui/) all speak
 * this vocabulary, so a relationship means the same thing in every one of them.
 *
 * A RELATIONSHIP IS A DIRECTED EDGE BETWEEN TWO PEOPLE, WITH A ROLE AT EACH END. "Parent of" is not "child of": the meaning of A's position towards B differs from B's towards A,
 * and the household reading says so. A relationship that is symmetric by nature (partners, siblings, co-founders) is still stored as one edge; `symmetric` tells the reading it may
 * speak of the two ends in either order.
 */
export const CONNECTIONS_DOMAINS = ['romantic', 'family', 'work', 'parenting'];
/** Every kind of relationship the product can read, grouped by the domain that owns it. */
export const RELATIONSHIP_KINDS_BY_DOMAIN = {
    romantic: ['partners'],
    family: ['siblings', 'adult-parent-adult-child', 'grandparent-grandchild', 'extended-family'],
    work: ['coworkers', 'business-partners', 'founders', 'manager-collaborator', 'mentor-mentee', 'project-partners'],
    parenting: ['parent-child', 'co-parents', 'siblings-in-household', 'caregiver-child'],
};
export const RELATIONSHIP_ROLES = [
    /* romantic, siblings, peers: nobody is above anybody */
    'partner', 'sibling', 'relative', 'peer',
    /* generations */
    'parent', 'adult-child', 'grandparent', 'grandchild',
    /* work */
    'manager', 'collaborator', 'mentor', 'mentee', 'co-founder',
    /* parenting */
    'child', 'caregiver', 'co-parent',
];
/** The roles the two ends of one relationship kind play, in the order [from, to]. Symmetric kinds list the same role twice. */
export const ROLES_OF_KIND = {
    partners: ['partner', 'partner'],
    siblings: ['sibling', 'sibling'],
    'adult-parent-adult-child': ['parent', 'adult-child'],
    'grandparent-grandchild': ['grandparent', 'grandchild'],
    'extended-family': ['relative', 'relative'],
    coworkers: ['peer', 'peer'],
    'business-partners': ['co-founder', 'co-founder'],
    founders: ['co-founder', 'co-founder'],
    'manager-collaborator': ['manager', 'collaborator'],
    'mentor-mentee': ['mentor', 'mentee'],
    'project-partners': ['peer', 'peer'],
    'parent-child': ['parent', 'child'],
    'co-parents': ['co-parent', 'co-parent'],
    'siblings-in-household': ['sibling', 'sibling'],
    'caregiver-child': ['caregiver', 'child'],
};
/** A kind whose two ends are not interchangeable: the reading keeps "from" and "to" apart. */
export const isDirectedKind = (kind) => ROLES_OF_KIND[kind][0] !== ROLES_OF_KIND[kind][1];
export const domainOfKind = (kind) => {
    for (const domain of CONNECTIONS_DOMAINS) {
        if (RELATIONSHIP_KINDS_BY_DOMAIN[domain].includes(kind))
            return domain;
    }
    throw new Error(`Unknown relationship kind: ${kind}`);
};
/* ------------------------------------------------------------- the child -- */
/**
 * AGE BANDS FOR PARENTING GUIDANCE. A newborn, a four-year-old, a nine-year-old and a fifteen-year-old do not receive the same advice, and the bands are the research corpus's
 * own (docs/research/connections/corpus-parenting.json `ageFramework`). A child's age is derived from the birth date and a clock the caller supplies; it is never stored.
 */
export const AGE_BANDS = [
    'infant-0-1', 'toddler-1-3', 'preschool-3-5', 'early-school-6-8',
    'middle-school-9-12', 'early-adolescence-13-15', 'late-adolescence-16-18',
];
/** Beyond the last band the relationship is read as an adult one (family: adult-parent-adult-child). */
export const ADULT_AGE_YEARS = 18;
/* ------------------------------------------------------ observed context -- */
/**
 * WHAT THE USER ACTUALLY SEES, AS A CLOSED CHOICE. Never free text: a private description of a conflict is not something this product stores, and a closed set is what lets the
 * guidance say something specific about it. Every code is a statement about the relationship as the USER experiences it, kept apart from anything the symbolic profiles say.
 */
export const OBSERVED_CONTEXT_CODES = [
    'communication-struggles', 'frequent-conflict', 'conflict-goes-unrepaired', 'pace-differences', 'different-working-styles',
    'unclear-roles', 'decision-stalemates', 'feeling-unseen', 'need-more-closeness', 'need-more-space',
    'strong-reactions-to-change', 'resists-rules', 'withdraws-when-upset', 'sibling-friction', 'unfair-comparison',
    'parents-disagree-on-approach', 'wants-to-collaborate', 'old-roles-persist', 'recurring-argument',
];
/** Which observed-context codes each domain offers. A code a domain does not offer is never accepted for it. */
export const OBSERVED_CONTEXT_BY_DOMAIN = {
    romantic: ['communication-struggles', 'frequent-conflict', 'conflict-goes-unrepaired', 'pace-differences', 'feeling-unseen', 'need-more-closeness', 'need-more-space', 'decision-stalemates', 'recurring-argument'],
    family: ['communication-struggles', 'frequent-conflict', 'conflict-goes-unrepaired', 'old-roles-persist', 'unfair-comparison', 'sibling-friction', 'need-more-space', 'feeling-unseen', 'recurring-argument'],
    work: ['communication-struggles', 'different-working-styles', 'unclear-roles', 'decision-stalemates', 'pace-differences', 'wants-to-collaborate', 'frequent-conflict', 'recurring-argument'],
    parenting: ['communication-struggles', 'frequent-conflict', 'strong-reactions-to-change', 'resists-rules', 'withdraws-when-upset', 'sibling-friction', 'unfair-comparison', 'parents-disagree-on-approach', 'feeling-unseen'],
};
export const isObservedContextCode = (value) => (typeof value === 'string' && OBSERVED_CONTEXT_CODES.includes(value));
