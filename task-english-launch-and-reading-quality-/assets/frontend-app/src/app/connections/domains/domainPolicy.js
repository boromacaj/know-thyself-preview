const p = (weight, opposed) => ({ weight, opposed });
export const DOMAIN_POLICY = {
    /* Partners: the tempo of processing, the way feeling is shown and the balance of closeness and room are where couples most often meet misunderstanding;
       structure and change are the daily-life and shared-direction layers. basis: ROM (demand-withdraw, perceived responsiveness, autonomy and closeness, dyadic coping). */
    romantic: {
        'processing-pace': p(3, 'friction'),
        'emotional-expression': p(3, 'friction'),
        'closeness-and-room': p(3, 'friction'),
        'taking-the-lead': p(2, 'complement'),
        'structure-and-flexibility': p(2, 'friction'),
        'reasoning-style': p(2, 'complement'),
        'risk-and-caution': p(2, 'friction'),
        'change-and-steadiness': p(2, 'friction'),
        'social-energy': p(1, 'friction'),
        'practical-and-conceptual': p(1, 'complement'),
        'shared-pull': p(3, 'resonance'),
        'pulls-apart': p(3, 'friction'),
        'different-pulls': p(2, 'complement'),
    },
    /* Family: roles and boundaries come first, then the way feeling is shown and who has always decided. Old roles are the family-specific layer.
       basis: FAM (differential treatment, intergenerational ambivalence, boundaries, estrangement, family communication patterns). */
    family: {
        'closeness-and-room': p(3, 'friction'),
        'emotional-expression': p(3, 'friction'),
        'taking-the-lead': p(3, 'friction'),
        'processing-pace': p(2, 'friction'),
        'change-and-steadiness': p(2, 'friction'),
        'social-energy': p(2, 'friction'),
        'reasoning-style': p(2, 'open'),
        'structure-and-flexibility': p(1, 'friction'),
        'risk-and-caution': p(1, 'open'),
        'practical-and-conceptual': p(1, 'open'),
        'shared-pull': p(2, 'resonance'),
        'pulls-apart': p(3, 'friction'),
        'different-pulls': p(2, 'open'),
    },
    /* Work: complementarity is the point. Initiative, structure and the practical-conceptual axis are the classic vision/execution pairing; autonomy decides delegation.
       basis: WRK (role clarity, shared leadership, team composition, task vs relationship conflict, psychological safety). */
    work: {
        'taking-the-lead': p(3, 'complement'),
        'structure-and-flexibility': p(3, 'complement'),
        'practical-and-conceptual': p(3, 'complement'),
        'closeness-and-room': p(3, 'complement'),
        'reasoning-style': p(2, 'complement'),
        'risk-and-caution': p(3, 'complement'),
        'processing-pace': p(2, 'friction'),
        'change-and-steadiness': p(2, 'friction'),
        'emotional-expression': p(1, 'friction'),
        'social-energy': p(1, 'complement'),
        'shared-pull': p(2, 'resonance'),
        'pulls-apart': p(2, 'friction'),
        'different-pulls': p(2, 'complement'),
    },
    /* Parenting: the child's need for predictability, the line between structure and autonomy, and how each of them handles strong feeling. Opposed is read as a place where
       the parent adapts, so it is friction with a way through; it is never a verdict on the child. basis: PAR (goodness of fit, emotion coaching, autonomy support, routines). */
    parenting: {
        'change-and-steadiness': p(3, 'friction'),
        'structure-and-flexibility': p(3, 'friction'),
        'closeness-and-room': p(3, 'friction'),
        'emotional-expression': p(3, 'friction'),
        'processing-pace': p(3, 'friction'),
        'taking-the-lead': p(3, 'friction'),
        'risk-and-caution': p(2, 'friction'),
        'social-energy': p(2, 'friction'),
        'reasoning-style': p(1, 'open'),
        'practical-and-conceptual': p(1, 'open'),
        'shared-pull': p(2, 'resonance'),
        'pulls-apart': p(2, 'friction'),
        'different-pulls': p(2, 'complement'),
    },
};
/**
 * WHAT A KIND OF RELATIONSHIP ADDS TO ITS DOMAIN'S WEIGHTS. A sibling pair and an adult parent with an adult child are both Family, and they are not the same situation:
 * the sibling reading cares about fairness and who leads, the generational one about autonomy and the roles each grew into. Added to the domain weight, capped at 3.
 */
export const KIND_EMPHASIS = {
    siblings: { 'taking-the-lead': 1, 'pulls-apart': 1 },
    'adult-parent-adult-child': { 'closeness-and-room': 1, 'change-and-steadiness': 1, 'taking-the-lead': 1 },
    'grandparent-grandchild': { 'change-and-steadiness': 1, 'social-energy': 1 },
    'extended-family': { 'social-energy': 1, 'emotional-expression': -1 },
    'manager-collaborator': { 'taking-the-lead': 1, 'closeness-and-room': 1 },
    'mentor-mentee': { 'reasoning-style': 1, 'processing-pace': 1 },
    founders: { 'risk-and-caution': 1, 'taking-the-lead': 1 },
    'business-partners': { 'risk-and-caution': 1, 'practical-and-conceptual': 1 },
    'siblings-in-household': { 'taking-the-lead': 1, 'pulls-apart': 1 },
    'co-parents': { 'structure-and-flexibility': 1, 'risk-and-caution': 1 },
};
