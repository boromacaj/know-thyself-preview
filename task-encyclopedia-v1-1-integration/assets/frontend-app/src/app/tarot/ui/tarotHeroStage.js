/*
 * THE HERO'S STAGES: ONE EXPLICIT STATE, NOT A CLASS COMBINATION
 * ---------------------------------------------------------------
 * Pure: no DOM, no clock. The ritual is a line, and every moment of it is ONE of these names:
 *
 *   idle               the Earth, the deck, one line: shake the phone
 *   shuffling          the deck is riffled and squared up
 *   spreading          the deck opens, a dealer's spread, into the strip (a stagger, about 0.85 s); nothing can be taken yet
 *   pickEnergy         the strip is live: take the first card
 *   revealingEnergy    that card is shown large in front, then goes to the LEFT of the row; the strip waits
 *   pickFactor         the strip is live again; one card is on the Earth
 *   revealingFactor    ...goes to the CENTRE
 *   pickGuidance       the strip is live; two cards are on the Earth
 *   revealingGuidance  ...goes to the RIGHT; the strip stays, nothing standing out of it, until the card has landed
 *   complete           the third card has landed: the deck gathers back into a stack and goes, the reading rises under the row
 *   reading            the deck is gone, the reading is the screen
 *
 *   jumper             the engine's own question (a card jumped out of the deck): outside the line, answered where it is asked
 *
 * The stage is DERIVED from the few facts the controller keeps (a shuffle in progress, the cards in the session, a card being shown, the
 * deck going), by `heroStageOf`, and written on the hero as `data-th-stage`. The stylesheet and the markup read THE STAGE and nothing else;
 * nothing is inferred from which classes happen to be on which element. The session stays the only record of what was taken.
 */
const PICKING = ['pickEnergy', 'pickFactor', 'pickGuidance'];
const REVEALING = ['revealingEnergy', 'revealingFactor', 'revealingGuidance'];
export function heroStageOf(facts) {
    if (facts.shuffling)
        return 'shuffling';
    if (!facts.opened)
        return 'idle';
    if (facts.jumperPending)
        return 'jumper';
    const taken = Math.max(0, Math.min(3, Math.floor(facts.taken)));
    if (taken >= 3) {
        if (facts.revealing)
            return 'revealingGuidance';
        return facts.leaving ? 'complete' : 'reading';
    }
    if (facts.spreading && taken === 0)
        return 'spreading';
    /* A card in its place and being shown: the stage of the card that was taken. Otherwise: the next card to take. */
    if (facts.revealing && taken > 0)
        return REVEALING[taken - 1];
    return PICKING[taken];
}
export function heroScreenOf(stage) {
    switch (stage) {
        case 'idle': return 'idle';
        case 'shuffling': return 'shuffling';
        case 'jumper': return 'pending';
        case 'complete':
        case 'reading': return 'complete';
        default: return 'picking';
    }
}
/** The stages in which the strip stands on the screen, and those in which a person may move it and take a card from it. */
export function stageShowsStrip(stage) {
    return stage === 'spreading' || PICKING.includes(stage) || REVEALING.includes(stage) || stage === 'complete';
}
export function stageTakesCards(stage) {
    return PICKING.includes(stage);
}
/** The role a stage is about: the card to take, or the card being shown. */
export function stageRole(stage) {
    switch (stage) {
        case 'pickEnergy':
        case 'revealingEnergy': return 'energy';
        case 'pickFactor':
        case 'revealingFactor': return 'factor';
        case 'pickGuidance':
        case 'revealingGuidance': return 'guidance';
        default: return null;
    }
}
/** How many places of the row are drawn in a stage - the card being shown included, which is drawn in the row and flies there: 0, 1, 2 or 3, never an empty one. */
export function stageCardsInRow(stage) {
    switch (stage) {
        case 'revealingEnergy':
        case 'pickFactor': return 1;
        case 'revealingFactor':
        case 'pickGuidance': return 2;
        case 'revealingGuidance':
        case 'complete':
        case 'reading': return 3;
        default: return 0;
    }
}
/**
 * The stage that may follow another. A stage may also fall back to `idle` (coming back to the screen) or to `shuffling` (a shake or a tap asks for a new
 * deck), from any stage the person can reach; those two are listed once for every stage below.
 */
const FORWARD = Object.freeze({
    idle: ['shuffling'],
    shuffling: ['spreading', 'pickEnergy'],
    spreading: ['pickEnergy'],
    pickEnergy: ['revealingEnergy', 'jumper'],
    revealingEnergy: ['pickFactor', 'jumper'],
    pickFactor: ['revealingFactor', 'jumper'],
    revealingFactor: ['pickGuidance', 'jumper'],
    pickGuidance: ['revealingGuidance', 'jumper'],
    revealingGuidance: ['complete', 'reading', 'jumper'],
    jumper: ['pickEnergy', 'pickFactor', 'pickGuidance', 'complete', 'reading'],
    complete: ['reading'],
    reading: [],
});
export function canEnterStage(from, to) {
    if (from === to)
        return true;
    if (to === 'idle')
        return true;
    if (to === 'shuffling')
        return from !== 'shuffling' && from !== 'spreading';
    return FORWARD[from].includes(to);
}
export const TAROT_HERO_STAGES = Object.freeze([
    'idle', 'shuffling', 'spreading', 'pickEnergy', 'revealingEnergy', 'pickFactor', 'revealingFactor', 'pickGuidance', 'revealingGuidance', 'jumper', 'complete', 'reading',
]);
