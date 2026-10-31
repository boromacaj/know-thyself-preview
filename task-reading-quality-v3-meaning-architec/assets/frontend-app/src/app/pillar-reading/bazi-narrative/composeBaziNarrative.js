import { pickLocalized } from '../../i18n/locale.js';
import { headingFor } from '../composeReading.js';
import { interpretBazi } from './baziInterpretation.js';
import { planBaziNarrative } from './baziNarrativePlan.js';
import { EN_VOICE } from './baziVoiceEn.js';
import { SK_VOICE } from './baziVoiceSk.js';
/**
 * THE BAZI NARRATIVE, COMPOSED.
 *
 * CALCULATION -> INTERPRETATION MODEL -> PLAN -> VOICE -> SECTIONS. This is the
 * last step: it asks the plan for its claims, asks the reader's language for
 * the sentences, and hands the reading six sections and one set of evidence.
 *
 * THE SIX SECTIONS ARE BAZI'S OWN ORDER OF ARGUMENT. Who you are and what the
 * season does to it; where the chart's weight goes; where it pulls two ways;
 * what steadies it; what it costs; what to practise. Each depends on the one
 * before, which is why they are not the life-area headings the other pillars
 * use - a Ziping reading does not start from "relationships", it starts from
 * the Day Master in its month.
 */
export const NARRATIVE_SECTION_IDS = [
    'bazi-nature', 'bazi-energy', 'bazi-tension', 'bazi-steadies', 'bazi-costs', 'bazi-practice',
];
const voice = () => pickLocalized({ en: EN_VOICE, sk: SK_VOICE });
/** The narrative, or null when the engine produced no chart to interpret. */
export function composeBaziNarrative(chart) {
    const model = interpretBazi(chart);
    if (!model)
        return null;
    const plan = planBaziNarrative(model);
    const v = voice();
    const dayMaster = model.dayMaster.phase;
    const nature = plan.nature.map((claim) => {
        switch (claim.kind) {
            case 'time': return v.time(claim);
            case 'nature': return v.nature(claim);
            case 'support': return v.support(claim);
            default: return '';
        }
    });
    const energy = plan.energy.map((claim) => {
        switch (claim.kind) {
            case 'lead': return v.lead(claim);
            case 'scarce': return v.scarce(claim);
            case 'polarity': return v.polarity(claim);
            default: return '';
        }
    });
    const sections = [
        { id: 'bazi-nature', paragraphs: nature.filter(Boolean) },
        { id: 'bazi-energy', paragraphs: energy.filter(Boolean) },
        {
            id: 'bazi-tension',
            standfirst: v.tensionStandfirst,
            /* In sequence, so a paragraph knows what the one before it introduced. */
            paragraphs: plan.tension
                .map((claim, index) => v.tension(claim, dayMaster, index > 0 ? plan.tension[index - 1] : null))
                .filter(Boolean),
        },
        { id: 'bazi-steadies', paragraphs: [v.helps(plan.helps)] },
        { id: 'bazi-costs', paragraphs: [v.cost(plan.cost)] },
        { id: 'bazi-practice', paragraphs: [v.practice(plan.practice, plan.cost)] },
    ].filter((section) => section.paragraphs.length > 0);
    const entry = (id, section, paragraphs) => ({
        id, title: headingFor(section), paragraphs,
    });
    const evidence = [
        entry('why-nature', 'bazi-nature', v.evidence.nature(model, plan)),
        entry('why-energy', 'bazi-energy', v.evidence.energy(model, plan)),
        ...(sections.some((section) => section.id === 'bazi-tension')
            ? [entry('why-tension', 'bazi-tension', v.evidence.tension(model, plan))] : []),
        entry('why-steadies', 'bazi-steadies', v.evidence.steadies(model, plan)),
        entry('why-rest', 'bazi-costs', v.evidence.rest(model, plan)),
    ].filter((item) => item.paragraphs.length > 0);
    return { model, plan, sections, evidence, evidenceStandfirst: v.evidence.standfirst };
}
