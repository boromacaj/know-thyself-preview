/*
 * HOW MUCH OF A TYPICAL CHART EACH THEME TAKES UP.
 *
 * Salience measures how much evidence stands behind a theme in THIS chart. It
 * cannot say whether that is unusual, and for a handful of themes it almost
 * never is: a great deal of the authored symbolism across all four traditions
 * speaks to method, persistence and independence, so nearly every chart has a
 * lot of evidence for them. On the reference population below, `structured
 * method` is a top-three theme for 31 charts out of 40.
 *
 * A portrait that leads with those is describing what charts in general look
 * like. This table is what lets the portrait ask a second question - is this
 * theme a larger part of THIS picture than it is of most pictures? - without
 * touching salience, which stays the evidence measure everywhere it is used.
 *
 * WHERE THE NUMBERS COME FROM
 * The mean share of supporting evidence each theme received across forty
 * reference birth moments, defined in
 * `tests/fixtures/themeReferencePopulation.fixture.mjs`. They are derived, not
 * chosen, and `tests/crossPillarReadingComposition.test.mjs` re-derives them on
 * every run: when the knowledge base changes enough to move them, that test
 * fails and prints the replacement table rather than letting the portrait
 * drift quietly onto stale proportions.
 */
export const THEME_BASE_RATES = {
    'deep-internal-processing': 0.0864,
    'independent-direction': 0.0921,
    'relational-orientation': 0.0642,
    'structured-method': 0.1473,
    'flexible-improvisation': 0.0725,
    'emotional-permeability': 0.1017,
    'emotional-containment': 0.0032,
    'outward-expression': 0.0425,
    'risk-appetite': 0.0247,
    'careful-consolidation': 0.0546,
    'conceptual-abstraction': 0.0291,
    'steady-endurance': 0.0661,
    'social-visibility': 0.0164,
    'creative-generation': 0.0383,
    'mastery-and-depth': 0.0258,
    'results-and-ambition': 0.0199,
    'being-recognised': 0.0142,
    'meaning-and-purpose': 0.0263,
    'closeness-and-belonging': 0.012,
    'room-to-move': 0.0219,
    'looking-after': 0.0183,
    'wanting-to-understand': 0.0145,
    'form-and-craft': 0.0081,
};
