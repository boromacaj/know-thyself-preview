import { getGuidedArea, getGuidedIntention, isGuidedChoice } from './guidedCatalog.js?v=b5ef5ed';
export const GUIDED_START = Object.freeze({ stage: 'area', areaId: null, intentionId: null });
/** The stages that are chosen before any card exists. */
export const GUIDED_PRE_DRAW = ['area', 'intention', 'focus'];
export const choiceOf = (flow) => {
    const candidate = { areaId: flow.areaId, intentionId: flow.intentionId };
    return isGuidedChoice(candidate) ? candidate : null;
};
/** Choosing (or changing) the area. The intention is cleared when the area changes: it belongs to the area it was chosen in. */
export function chooseArea(flow, areaId) {
    if (flow.stage !== 'area' && flow.stage !== 'intention')
        return flow;
    const area = getGuidedArea(areaId);
    if (!area)
        return flow;
    return { stage: 'intention', areaId: area.id, intentionId: area.id === flow.areaId ? flow.intentionId : null };
}
export function chooseIntention(flow, intentionId) {
    if (flow.stage !== 'intention' && flow.stage !== 'focus')
        return flow;
    const intention = getGuidedIntention(intentionId);
    if (!intention || flow.areaId === null || intention.areaId !== flow.areaId)
        return flow;
    return { stage: 'focus', areaId: flow.areaId, intentionId: intention.id };
}
/** "Choose my cards": from the focus, with a valid choice, to the shuffle. */
export function proceedToShuffle(flow) {
    if (flow.stage !== 'focus' || choiceOf(flow) === null)
        return flow;
    return { ...flow, stage: 'shuffle' };
}
/** The shuffle has been performed and the deck is committed: the cards are taken from it. */
export function beginDraw(flow) {
    if (flow.stage !== 'shuffle' || choiceOf(flow) === null)
        return flow;
    return { ...flow, stage: 'draw' };
}
export function finishDraw(flow) {
    if (flow.stage !== 'draw')
        return flow;
    return { ...flow, stage: 'reading' };
}
/**
 * One step back, or null when there is nowhere to go back to inside Guided Tarot (the areas: the caller then leaves for Daily Tarot).
 * A draw in progress and a finished reading have no step back: see the note at the top.
 */
export function stepBack(flow) {
    switch (flow.stage) {
        case 'intention': return { stage: 'area', areaId: null, intentionId: null };
        case 'focus': return { stage: 'intention', areaId: flow.areaId, intentionId: null };
        case 'shuffle': return choiceOf(flow) === null ? GUIDED_START : { ...flow, stage: 'focus' };
        default: return null;
    }
}
/** Back to the areas, with nothing chosen: the explicit "new reading" and "change topic". */
export const restart = () => GUIDED_START;
/** A flow restored from a stored choice: only the two stages a session can be in (a deck drawn from, or a finished reading). */
export function resumeAt(choice, stage) {
    if (!isGuidedChoice(choice))
        return GUIDED_START;
    return { stage, areaId: choice.areaId, intentionId: choice.intentionId };
}
