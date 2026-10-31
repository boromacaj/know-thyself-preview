import { currentFactsFor } from './currentFacts.js?v=53c0693';
import { natalDimensionWeights, temporalConvergences, temporalTensions } from './temporalInteractions.js?v=53c0693';
import { temporalSignalsFor } from './temporalSemantics.js?v=53c0693';
/*
 * THE PERIOD, READ THROUGH THIS CHART.
 *
 * Assembly only. The facts come from the engines, the dimensions from the shared
 * taxonomy, the natal side from the foundation the Portrait already uses, and
 * the interactions from one file that knows about all three. Nothing here
 * decides anything a reader sees; that is the composer's job, and keeping the
 * two apart is what lets the model be tested without rendering it.
 */
export const TEMPORAL_MODEL_VERSION = 'know-thyself-temporal-synthesis-v1';
const label = (date) => `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
export function buildTemporalSynthesis(input) {
    const { facts, present, missing, withheld } = currentFactsFor({
        birth: input.birth,
        selected: input.selected,
        natalPositions: input.natalPositions,
        dayMaster: input.dayMaster,
        vessel: input.vessel,
        yearStemPolarity: input.yearStemPolarity,
        luckPillars: input.luckPillars,
        birthTimeEstimated: input.birthTimeEstimated,
    });
    const signals = temporalSignalsFor(facts);
    const natal = natalDimensionWeights(input.natal);
    /*
     * Human Design is absent by decision rather than by failure, and the reason is
     * recorded where a reader can meet it. The system does have a timing layer;
     * reading it would need doctrine about what a transiting activation means
     * against a defined channel, and that doctrine is not in the knowledge base.
     */
    const missingSystems = [...missing];
    return {
        modelVersion: TEMPORAL_MODEL_VERSION,
        period: {
            from: label(input.selected),
            to: label(input.selected),
            label: label(input.selected),
        },
        facts,
        signals,
        convergences: temporalConvergences(signals),
        tensions: temporalTensions(signals, natal),
        coverage: {
            present,
            missing: missingSystems,
            withheld,
            birthTimeEstimated: input.birthTimeEstimated,
        },
    };
}
