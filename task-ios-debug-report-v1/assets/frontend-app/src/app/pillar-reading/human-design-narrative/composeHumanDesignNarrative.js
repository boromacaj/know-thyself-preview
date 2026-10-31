import { activeLocale, pickLocalized } from '../../i18n/locale.js?v=b5ef5ed';
import { headingFor } from '../composeReading.js?v=b5ef5ed';
import { interpretHumanDesign } from './humanDesignInterpretation.js?v=b5ef5ed';
import { planHumanDesignNarrative } from './humanDesignNarrativePlan.js?v=b5ef5ed';
import { currentHumanDesignRealizer, humanDesignMeanings, } from './humanDesignRealizerPort.js?v=b5ef5ed';
import { EN_VOICE } from './humanDesignVoiceEn.js?v=b5ef5ed';
import { SK_VOICE } from './humanDesignVoiceSk.js?v=b5ef5ed';
/**
 * THE HUMAN DESIGN NARRATIVE, COMPOSED.
 *
 * CALCULATION -> INTERPRETATION MODEL -> PLAN -> VOICE -> SECTIONS. This is the
 * last step: it asks the plan for its claims, asks the reader's language for
 * the sentences, and hands the reading its sections and one set of evidence.
 *
 * THE SECTIONS ARE HUMAN DESIGN'S OWN ORDER OF ARGUMENT, not the life-area
 * headings the other pillars share. The system describes a mechanism, so the
 * reading follows the mechanism: what this design runs on, how it decides, how
 * it meets people, what is fixed in it, what is not, where it contradicts
 * itself, what that costs, what to do about it. "Relationships" and "Work" are
 * not headings here, because Human Design does not have an opinion about a job;
 * it has an opinion about how a decision gets made, which shows up in both.
 *
 * A SECTION THAT HAS NOTHING TO SAY IS ABSENT. A chart with no mechanical
 * contradiction gets no tension section; a Reflector gets no consistency
 * section, because nothing in that chart is consistent and a heading promising
 * otherwise would have to be filled with something invented.
 */
export const NARRATIVE_SECTION_IDS = [
    'hd-envelope',
    'hd-operates', 'hd-decides', 'hd-with-others', 'hd-consistent',
    'hd-context', 'hd-tension', 'hd-costs', 'hd-practice',
];
const voice = () => pickLocalized({ en: EN_VOICE, sk: SK_VOICE });
const CENTRE_ORDER = ['head', 'ajna', 'throat', 'g', 'ego', 'solarPlexus', 'sacral', 'spleen', 'root'];
/** What the voices need from an envelope: each centre and mechanic sorted into holding and moving. */
export function planEnvelope(envelope) {
    const centres = CENTRE_ORDER.map((id) => ({ id, entry: envelope.centres[id] }));
    const mechanics = [
        ['type', envelope.type], ['strategy', envelope.strategy], ['authority', envelope.authority],
        ['profile', envelope.profile], ['definition', envelope.definition], ['cross', envelope.cross],
        ['variables', envelope.variables], ['motorToThroat', envelope.motorToThroat],
    ];
    return {
        definedAllDay: centres.filter(({ entry }) => entry.stable && entry.values[0] === 'defined').map(({ id }) => id),
        openAllDay: centres.filter(({ entry }) => entry.stable && entry.values[0] === 'open').map(({ id }) => id),
        movingCentres: centres.filter(({ entry }) => !entry.stable).map(({ id }) => id),
        channelsAllDay: envelope.channels.always,
        channelsSometimes: envelope.channels.sometimes,
        stable: mechanics.filter(([, entry]) => entry.stable).map(([key, entry]) => ({ key, value: entry.values[0] })),
        moving: mechanics.filter(([, entry]) => !entry.stable).map(([key, entry]) => ({ key, values: entry.values })),
        gatesAllDay: envelope.gates.always.length,
        segments: envelope.segments,
    };
}
export function composeHumanDesignNarrative(data) {
    const model = interpretHumanDesign(data);
    const v = voice();
    if (!model && data?.mechanicsSuppressed && data.envelope) {
        const claim = planEnvelope(data.envelope);
        const sections = [
            { id: 'hd-envelope', paragraphs: [...v.envelope.intro(claim)] },
            { id: 'hd-consistent', paragraphs: [...v.envelope.consistent(claim)] },
            { id: 'hd-context', paragraphs: [...v.envelope.context(claim)] },
        ].filter((section) => section.paragraphs.length > 0);
        return {
            state: 'envelope',
            claim,
            sections,
            evidence: [{ id: 'why-envelope', title: headingFor('hd-envelope'), paragraphs: v.envelope.evidence(claim) }],
            evidenceStandfirst: v.evidence.standfirst,
        };
    }
    if (!model)
        return { state: 'withheld', paragraphs: v.withheld };
    const plan = planHumanDesignNarrative(model);
    /* The uncertainty sentence opens the first section rather than standing as a
       section of its own: a reader meeting a banner before they have met the
       reading has been told to distrust something they have not yet seen. */
    const opening = plan.time ? [v.time(plan.time)] : [];
    const sections = [
        { id: 'hd-operates', paragraphs: [...opening, ...v.operating(plan.operating)] },
        { id: 'hd-decides', paragraphs: [...v.decision(plan.decision)] },
        ...(plan.social ? [{ id: 'hd-with-others', paragraphs: [...v.social(plan.social)] }] : []),
        ...(plan.consistency ? [{ id: 'hd-consistent', paragraphs: [...v.consistency(plan.consistency)] }] : []),
        ...(plan.context ? [{ id: 'hd-context', paragraphs: [...v.context(plan.context)] }] : []),
        ...(plan.tension.length > 0
            ? [{
                    id: 'hd-tension',
                    standfirst: v.tensionStandfirst,
                    /* In sequence, so a paragraph knows whether one came before it. */
                    paragraphs: plan.tension
                        .map((claim, index) => v.tension(claim, index > 0 ? plan.tension[index - 1] : null, index))
                        .filter(Boolean),
                }]
            : []),
        { id: 'hd-costs', paragraphs: [...v.cost(plan.cost)] },
        { id: 'hd-practice', paragraphs: [...v.practice(plan.practice)] },
    ].filter((section) => section.paragraphs.length > 0);
    const entry = (id, section, paragraphs) => ({
        id, title: headingFor(section), paragraphs,
    });
    const evidence = [
        entry('why-operates', 'hd-operates', v.evidence.operating(model, plan)),
        entry('why-decides', 'hd-decides', v.evidence.decision(model, plan)),
        entry('why-with-others', 'hd-with-others', v.evidence.social(model, plan)),
        entry('why-consistent', 'hd-consistent', v.evidence.structure(model, plan)),
        entry('why-rest', 'hd-practice', v.evidence.rest(model, plan)),
    ].filter((item) => item.paragraphs.length > 0);
    const baseline = { state: 'read', model, plan, sections, evidence, evidenceStandfirst: v.evidence.standfirst };
    /* The editorial pilot's door (humanDesignRealizerPort.ts). Nothing registers a realizer in the shipped application, so
       this returns the baseline narrative above unchanged; a realizer that declines (null) leaves it in place as well. */
    const realizer = currentHumanDesignRealizer();
    const realized = realizer ? realizer({ narrative: baseline, locale: activeLocale(), meanings: humanDesignMeanings() }) : null;
    if (!realized)
        return baseline;
    return {
        ...baseline,
        sections: realized.sections,
        /* The "Why this appears" entries keep the baseline wording of the working; only the heading each hangs under follows the pilot's sections. */
        evidence: evidence.map((item) => {
            const section = realized.evidenceSections[item.id];
            return section ? { ...item, title: headingFor(section) } : item;
        }),
        realization: realized.report,
    };
}
