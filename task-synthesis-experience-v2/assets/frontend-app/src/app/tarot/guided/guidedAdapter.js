import { getGuidedArea, getGuidedIntention } from './guidedCatalog.js?v=53c0693';
import { safetyPolicyFor } from '../question/questionSafety.js?v=53c0693';
import { getSpread } from '../question/spreadLibrary.js?v=53c0693';
import { validateSpread } from '../question/spreadValidation.js?v=53c0693';
/** The library spread the intention names, with its three places renamed and re-asked in the intention's words. */
export function guidedSpreadFor(intention) {
    const base = getSpread(intention.spreadId);
    if (!base || base.positions.length !== intention.places.length)
        return null;
    const positions = base.positions.map((position, index) => ({
        ...position,
        label: intention.places[index].label,
        description: intention.places[index].ask,
    }));
    return { ...base, positions, origin: 'adapted', basedOn: base.id };
}
export function guidedIntentFor(intention) {
    return {
        normalizedQuestion: '',
        language: 'unknown',
        category: intention.category,
        secondaryCategories: [],
        temporalOrientation: intention.temporal,
        entities: [],
        options: null,
        relationshipType: intention.relationshipType,
        desiredGuidance: intention.guidance,
        questionForm: 'open',
        sensitivityFlags: [],
        spreadRecommendation: { spreadId: intention.spreadId, because: `guided:${intention.id}` },
        confidence: 1,
        signals: ['guided-selection'],
    };
}
export function guidedSelectionFor(intention) {
    const spread = guidedSpreadFor(intention);
    if (!spread)
        return null;
    return {
        status: 'ready',
        spread,
        mode: 'adapted',
        basedOn: spread.basedOn ?? null,
        because: `guided:${intention.id}`,
        adaptations: [],
        safety: safetyPolicyFor([]),
        validation: validateSpread(spread),
    };
}
/** Everything the rest of the pipeline needs for a choice, or null when the ids name nothing in the catalog. */
export function guidedStartFor(choice) {
    const area = getGuidedArea(choice.areaId);
    const intention = getGuidedIntention(choice.intentionId);
    if (!area || !intention || intention.areaId !== area.id)
        return null;
    const spread = guidedSpreadFor(intention);
    const selection = guidedSelectionFor(intention);
    if (!spread || !selection)
        return null;
    return { area, intention, spread, intent: guidedIntentFor(intention), selection };
}
