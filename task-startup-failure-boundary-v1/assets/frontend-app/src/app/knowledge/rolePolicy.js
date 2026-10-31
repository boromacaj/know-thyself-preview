/**
 * ROLE-LEVEL PROVENANCE.
 *
 * Some doubt attaches to the ROLE rather than to any entity in it. Whether the
 * Attitude number is a meaningful technique at all is disputed between schools,
 * and that dispute is true of the Attitude 3 exactly as much as of the Attitude
 * 7. Recording it on each number's unit would be twelve copies of one fact, and
 * recording it nowhere - which is where the model briefly stood after the
 * knowledge and synthesis layers were merged - silently upgrades a disputed
 * technique to whatever the underlying archetype's provenance happens to be.
 *
 * So a role may carry its own provenance, and the resolver folds it in on the
 * weakest-link rule alongside the unit's and any fired overlay's. A reading is
 * only ever as firm as the least firm thing it rests on, and "we are not sure
 * this position means anything" is exactly that kind of thing.
 *
 * This is deliberately sparse. A role absent from this table contributes
 * nothing, which is the right default: most positions are not in dispute.
 */
export const ROLE_PROVENANCE = {
    attitude: {
        kind: 'contested',
        settledness: 'contested',
        basis: 'Whether the Attitude number is a meaningful position at all is disputed; several modern schools omit it entirely.',
        dissent: 'The Decoz lineage and much popular practice treat the Attitude number (birth month plus birth day) as a real secondary position describing the manner someone leads with. Other practitioners regard it as a late addition with no basis in the Pythagorean scheme and do not calculate it.',
        sources: ['RESEARCH_NUMEROLOGY#core-positions'],
    },
    balance: {
        kind: 'tradition-specific',
        settledness: 'provisional',
        basis: 'The Balance number is drawn from the name initials and belongs to the modern Western lineage; it is read narrowly, as a response under stress rather than as a general position.',
        traditions: ['Modern Western (Juno Jordan / Hans Decoz lineage)'],
        sources: ['RESEARCH_NUMEROLOGY#core-positions'],
    },
    maturity: {
        kind: 'contextual-derivation',
        settledness: 'conventional',
        basis: 'Maturity combines the Life Path and the Expression, so it is a derivation over two positions rather than a reading of the birth data in its own right.',
        sources: ['RESEARCH_NUMEROLOGY#core-positions'],
    },
    'hidden-passion': {
        kind: 'contextual-derivation',
        settledness: 'conventional',
        basis: 'The Hidden Passion is the most repeated letter value in the name - a frequency observation over the Expression rather than a separate calculation.',
        sources: ['RESEARCH_NUMEROLOGY#core-positions'],
    },
    'personal-year': {
        kind: 'contested',
        settledness: 'contested',
        basis: 'The schools disagree about when the Personal Year turns over, and between January and the birthday the two conventions give different numbers.',
        dissent: 'One tradition rolls the Personal Year on 1 January; another rolls it on the birthday, with a transitional overlap either side. A reading must state which convention it used.',
        sources: ['RESEARCH_NUMEROLOGY#personal-cycles'],
    },
    'personal-month': {
        kind: 'contested',
        settledness: 'contested',
        basis: 'Inherits the Personal Year rollover dispute, since it is calculated from it.',
        dissent: 'See the Personal Year: the month number moves with whichever year convention was used.',
        sources: ['RESEARCH_NUMEROLOGY#personal-cycles'],
    },
    'personal-day': {
        kind: 'contested',
        settledness: 'contested',
        basis: 'Inherits the Personal Year rollover dispute, and carries the least weight of the three cycles.',
        dissent: 'See the Personal Year.',
        sources: ['RESEARCH_NUMEROLOGY#personal-cycles'],
    },
};
