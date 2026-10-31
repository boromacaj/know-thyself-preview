import { pickLocalized } from '../../i18n/locale.js?v=f9ab0a6';
import { headingFor } from '../composeReading.js?v=f9ab0a6';
import { interpretNumerology } from './numerologyInterpretation.js?v=f9ab0a6';
import { planNumerologyNarrative, } from './numerologyNarrativePlan.js?v=f9ab0a6';
import { EN_VOICE } from './numerologyVoiceEn.js?v=f9ab0a6';
import { SK_VOICE } from './numerologyVoiceSk.js?v=f9ab0a6';
/** The reader's language. */
export const numerologyVoice = () => pickLocalized({ en: EN_VOICE, sk: SK_VOICE });
/** The narrative, or null when the pillar carries no typed numerology result. */
export function composeNumerologyNarrative(chart) {
    const model = interpretNumerology(chart);
    if (!model)
        return null;
    const plan = planNumerologyNarrative(model);
    const v = numerologyVoice();
    const candidates = [
        { id: 'numerology-direction', paragraphs: v.direction(plan.direction) },
        plan.drive ? { id: 'numerology-drive', paragraphs: v.drive(plan.drive) } : null,
        plan.presence ? { id: 'numerology-presence', paragraphs: v.presence(plan.presence) } : null,
        { id: 'numerology-pull', standfirst: v.pullStandfirst, paragraphs: v.pull(plan.pull) },
        { id: 'numerology-cost', paragraphs: v.cost(plan.cost) },
        plan.growth ? { id: 'numerology-growth', paragraphs: v.growth(plan.growth, plan.pull) } : null,
        plan.chapter ? { id: 'numerology-chapter', standfirst: v.chapterStandfirst, paragraphs: v.chapter(plan.chapter) } : null,
    ];
    const sections = candidates
        .filter((section) => section !== null)
        .map((section) => ({ ...section, paragraphs: section.paragraphs.filter((paragraph) => paragraph.trim().length > 0) }))
        .filter((section) => section.paragraphs.length > 0);
    const evidence = sections
        .map((section) => ({
        id: `why-${section.id.replace('numerology-', '')}`,
        title: headingFor(section.id),
        paragraphs: v.evidence.section(section.id, model, plan).filter((line) => line.trim().length > 0),
    }))
        .filter((entry) => entry.paragraphs.length > 0);
    return { model, plan, voice: v, sections, evidence, evidenceStandfirst: v.evidence.standfirst };
}
