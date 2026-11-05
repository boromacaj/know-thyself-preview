import { subjectsIn, WORK_IN_ANOTHER_SENSE } from './questionAnchor.js?v=2bfd44e';
import { foldText } from './questionText.js?v=2bfd44e';
/**
 * WHICH AREA OF LIFE A QUESTION READING READS ITS CARDS FOR.
 *
 * A card means one thing and shows it differently in work, between people and inside oneself: the Devil in a question about work is a tie to a role
 * kept by obligation or security, in a question about a relationship a closeness kept by need or habit. The card's section reads the card's reading
 * for the question's area where the card has one (readerAreaStakesEn.ts), and its general reading where it has none or the question has no clear area.
 *
 * Decided from the intent alone, as an identifier: the same closed subject vocabulary the anchor uses (questionAnchor.ts), the roles the question
 * names, then its categories. Never text from the question. Two paraphrases of one question land on one area because they land on one subject or
 * one category; nothing about the wording beyond that reaches the cards.
 *
 * AMBIGUITY READS GENERAL. A question that names two areas ("my relationship or my career") gets no area: choosing one would read the cards for
 * half the question. A question the safety policy treats with care gets none either, as it gets no anchor.
 */
const BY_SUBJECT = {
    career: 'work', job: 'work', 'work-situation': 'work', project: 'work', 'creative-work': 'work',
    relationship: 'relationships', relationships: 'relationships', friendship: 'relationships', family: 'relationships',
    /* Studying, a home and a decision as such are not one of the areas a card has a reading for: they read the card in general. */
    studies: null, home: null, decision: null,
};
const BY_RELATIONSHIP = {
    romantic: 'relationships', family: 'relationships', friend: 'relationships', work: 'work', other: null,
};
const BY_CATEGORY = {
    career: 'work', creativity: 'work', relationship: 'relationships',
    'self-development': 'self', spiritual: 'self', emotional: 'self',
};
/** "Work on myself" is growth, not work; "make it work" and "work out" name no workplace. Tested on the folded question (questionText.foldText). */
const ON_ONESELF = /\bwork(?:ing)? on (?:myself|me|yourself|ourselves|who i am)\b/g;
const NOT_WORK = WORK_IN_ANOTHER_SENSE;
const one = (areas) => {
    const found = [...new Set(areas.filter((area) => area !== null && area !== undefined))];
    return found.length === 0 ? null : found.length === 1 ? found[0] : 'mixed';
};
export function readingAreaOf(intent, selection) {
    if (selection.safety.level !== 'standard' || intent.sensitivityFlags.length > 0)
        return null;
    const folded = foldText(intent.normalizedQuestion);
    /* The career category can come from the word "work" alone; where that word was not about work, it is not read as the area either. */
    const workWordElsewhere = folded.replace(NOT_WORK, ' ') !== folded;
    const byCategory = (category) => (workWordElsewhere && category === 'career' ? undefined : BY_CATEGORY[category]);
    /* What the question names, by subject and by the people in it. */
    const named = one([
        ...subjectsIn(intent, NOT_WORK).map((subject) => BY_SUBJECT[subject]),
        intent.relationshipType === null ? null : BY_RELATIONSHIP[intent.relationshipType],
        folded.replace(ON_ONESELF, ' ') !== folded ? 'self' : null,
    ]);
    if (named === 'mixed')
        return null;
    if (named !== null)
        return named;
    /* Nothing named: what kind of question it is. The primary category decides; the secondary ones only when they agree. */
    const primary = byCategory(intent.category);
    if (primary)
        return primary;
    const secondary = one(intent.secondaryCategories.map(byCategory));
    return secondary === 'mixed' ? null : secondary;
}
/**
 * (Closure) A QUESTION THAT CONNECTS TWO AREAS ("Should I focus on my relationship or my career?"): the two areas it names, in the order the subject list
 * finds them, or null. Conservative: exactly two distinct areas named by the question's own subjects or people, a standard-safety question, and no
 * third. readingAreaOf still returns null for such a question (no single area); a caller that can read a card for both uses this.
 */
export function readingAreasOf(intent, selection) {
    if (selection.safety.level !== 'standard' || intent.sensitivityFlags.length > 0)
        return null;
    const folded = foldText(intent.normalizedQuestion);
    const found = [...new Set([
            ...subjectsIn(intent, NOT_WORK).map((subject) => BY_SUBJECT[subject]),
            intent.relationshipType === null ? null : BY_RELATIONSHIP[intent.relationshipType],
            folded.replace(ON_ONESELF, ' ') !== folded ? 'self' : null,
        ].filter((area) => area !== null && area !== undefined))];
    return found.length === 2 ? [found[0], found[1]] : null;
}
