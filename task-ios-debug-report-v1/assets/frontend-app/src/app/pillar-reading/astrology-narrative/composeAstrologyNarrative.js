import { pickLocalized } from '../../i18n/locale.js?v=b5ef5ed';
import { headingFor } from '../composeReading.js?v=b5ef5ed';
import { interpretAstrology } from './astrologyInterpretation.js?v=b5ef5ed';
import { planAstrologyNarrative } from './astrologyNarrativePlan.js?v=b5ef5ed';
import { EN_VOICE } from './astrologyVoiceEn.js?v=b5ef5ed';
import { SK_VOICE } from './astrologyVoiceSk.js?v=b5ef5ed';
/**
 * THE ASTROLOGY NARRATIVE, COMPOSED.
 *
 * CALCULATION -> INTERPRETATION MODEL -> PLAN -> VOICE -> SECTIONS. This is the
 * last step: it asks the plan for its claims, asks the reader's language for
 * the sentences, and hands the reading its sections and one set of evidence.
 *
 * THE SECTIONS ARE ASTROLOGY'S OWN ORDER OF ARGUMENT: the chart's main
 * pattern, then the Sun and the Moon together, what shows first, how you think
 * and act, how you relate, where the chart pulls two ways, and what helps. Not
 * six planets in six paragraphs, and not the life-area headings every pillar
 * used to share.
 *
 * A SECTION THAT HAS NOTHING TO SAY IS ABSENT. Without a birth time there is no
 * rising sign, so there is no "what shows first"; a Mercury and a Mars that add
 * nothing the pattern has not said leave "how you think and act" to Go deeper;
 * a chart with no real tension gets no tension section rather than an invented
 * one.
 */
export const NARRATIVE_SECTION_IDS = [
    'astro-pattern', 'astro-drive', 'astro-meet', 'astro-mind', 'astro-relate', 'astro-pull', 'astro-helps',
];
export const astrologyVoice = () => pickLocalized({ en: EN_VOICE, sk: SK_VOICE });
export function composeAstrologyNarrative(data) {
    const model = interpretAstrology(data);
    if (!model)
        return null;
    const plan = planAstrologyNarrative(model);
    const v = astrologyVoice();
    /* The birth-time sentence opens the reading rather than standing as a section
       of its own: said once, before the first claim that could depend on it, and
       never again as a banner over every section. */
    const opening = plan.time ? [v.time(plan.time)] : [];
    const sections = [
        { id: 'astro-pattern', paragraphs: [...opening, ...v.pattern(plan.pattern)] },
        { id: 'astro-drive', paragraphs: [...v.drive(plan.drive)] },
        { id: 'astro-meet', paragraphs: plan.meet ? [...v.meet(plan.meet)] : [] },
        { id: 'astro-mind', paragraphs: plan.mind ? [...v.mind(plan.mind)] : [] },
        { id: 'astro-relate', paragraphs: [...v.relate(plan.relate)] },
        { id: 'astro-pull', paragraphs: plan.tension ? [...v.tension(plan.tension)] : [] },
        { id: 'astro-helps', paragraphs: [...v.helps(plan.helps)] },
    ].filter((section) => section.paragraphs.length > 0);
    const entry = (id, heading, paragraphs) => ({ id, title: heading, paragraphs });
    const evidence = [
        entry('why-time', headingFor('astro-time'), v.evidence.time(model, plan)),
        entry('why-pattern', headingFor('astro-pattern'), v.evidence.pattern(model, plan)),
        entry('why-drive', headingFor('astro-drive'), v.evidence.drive(model, plan)),
        entry('why-meet', headingFor('astro-meet'), v.evidence.meet(model, plan)),
        entry('why-mind', headingFor('astro-mind'), v.evidence.mind(model, plan)),
        entry('why-relate', headingFor('astro-relate'), v.evidence.relate(model, plan)),
        entry('why-pull', headingFor('astro-pull'), v.evidence.pull(model, plan)),
        entry('why-helps', headingFor('astro-helps'), v.evidence.helps(model, plan)),
    ].filter((item) => item.paragraphs.length > 0);
    return { model, plan, sections, evidence, evidenceStandfirst: v.evidence.standfirst, voice: v };
}
