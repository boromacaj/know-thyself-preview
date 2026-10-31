import { validateReadingIntent } from '../contract/validateReadingIntent.js?v=f9ab0a6';
import { buildHumanDesignReadingIntent } from './humanDesignReadingIntent.js?v=f9ab0a6';
import { factsOf } from './humanDesignPilotFacts.js?v=f9ab0a6';
import { planPilotDiscourse } from './humanDesignPilotPlan.js?v=f9ab0a6';
import { PILOT_VOICE_EN } from './humanDesignPilotEn.js?v=f9ab0a6';
import { PILOT_VOICE_SK } from './humanDesignPilotSk.js?v=f9ab0a6';
/**
 * THE PILOT REALIZER: THE SEALED INTENT IN, THE READING OUT.
 *
 *   baseline narrative (model + plan)
 *     -> buildHumanDesignReadingIntent        the adapter, unchanged: same propositions, relations, evidence, wording licences
 *     -> planPilotDiscourse                   where each claim is said, once, and what the lead is built around (sealed)
 *     -> validateReadingIntent                the contract's own checks; an invalid intent is never realized
 *     -> factsOf + voice (EN | SK)            sentences, from the intent's slots and modalities alone
 *     -> guards                               nothing the reading may not say, nothing outside the plan's budget
 *
 * The realizer never reads the interpretation model or the narrative plan: they are what the ADAPTER read. Declining
 * (returning null) leaves the shipped reading in place - an unknown birth time, a withheld chart, an invalid intent, or a
 * sentence a guard refuses all end that way, so the pilot can fail only to the baseline, never to a half-written reading.
 */
export const PILOT_VARIANT = 'human-design-pilot-v1';
const VOICES = { en: PILOT_VOICE_EN, sk: PILOT_VOICE_SK };
const RENDER = {
    'hd2-lead': 'lead', 'hd2-energy': 'energy', 'hd2-decide': 'decide', 'hd2-people': 'people', 'hd2-steady': 'steady',
    'hd2-open': 'open', 'hd2-pull': 'pull', 'hd2-off': 'off', 'hd2-help': 'help',
};
/** Baseline evidence entries keep their working; each hangs under the pilot section whose claim it supports. */
const EVIDENCE_SECTIONS = {
    'why-operates': 'hd2-energy', 'why-decides': 'hd2-decide', 'why-with-others': 'hd2-people', 'why-consistent': 'hd2-steady', 'why-rest': 'hd2-help',
};
/** What no sentence of a reading may say, in either language. The same families the shipped narrative is tested against. */
const FORBIDDEN = [
    [/\bmost people\b|\bfew people\b|\brare(ly|st)?\b|\bunusual(ly)?\b|\bmore than others\b|\bleast like anyone\b|\bvčšina ľudí\b|\bväčšina ľudí\b|\bmálo ľudí\b|\bvzácn\p{L}*|\bnezvyčajn\p{L}*/iu, 'a share of people'],
    [/\byour childhood\b|\bas a child\b|\bgrowing up\b|\byou learned early\b|\btvoje detstvo\b|\bv detstve\b/i, 'a biography'],
    [/\bwill always\b|\bwill never\b|\bdestined\b|\byour destiny\b|\bfated\b|\bguaranteed\b|\bosud\p{L}*|\bvždy bude\b|\bnikdy nebude\b/iu, 'a destiny'],
    [/\bdiagnos(is|e|ed)\b|\bdisease\b|\bsymptom\b|\btreatment\b|\bcure\b|\bdiagnóz\p{L}*|\bchorob\p{L}*|\bliečb\p{L}*|\bsymptóm\p{L}*/iu, 'a health claim'],
    [/\bhigher vibration\b|\bevolved\b|\bawakened\b|\bspiritually\b|\bsuperior\b/i, 'a spiritual hierarchy'],
    [/\bcomplete[sd]? you\b|(?<!not a statement that )\byou need someone\b|\bsomeone with gate\b|\bdoplní ťa\b|(?<!nie je tvrdenie, že )(?<!nie tvrdenie, že )\bpotrebuješ niekoho\b/i, 'completion by another person'],
    [/\bSacral\b|\bSplenic\b|\bAjna\b|\bSolar Plexus\b|\bNot-Self\b|\bincarnation cross\b|\bchannel \d{1,2}-\d{1,2}\b|\bgate \d{1,2}\.\d\b/, 'system vocabulary in the main reading'],
];
export class PilotGuardError extends Error {
}
function guard(sections, intent) {
    for (const section of sections) {
        const text = section.paragraphs.map((paragraph) => paragraph.text).join(' ');
        for (const [pattern, what] of FORBIDDEN) {
            if (pattern.test(text))
                throw new PilotGuardError(`${section.id} says ${what}`);
        }
        const plan = intent.discourse.sections.find((candidate) => candidate.id === section.id);
        const sentences = text.split(/(?<=[.!?])\s+/).filter((sentence) => sentence.trim().length > 0).length;
        if (plan && sentences > plan.budget[1] + 2)
            throw new PilotGuardError(`${section.id} has ${sentences} sentences, the plan allows ${plan.budget[1]}`);
        if (section.paragraphs.some((paragraph) => paragraph.text.trim().length === 0))
            throw new PilotGuardError(`${section.id} has an empty paragraph`);
        if (section.paragraphs.some((paragraph) => paragraph.claims.length === 0))
            throw new PilotGuardError(`${section.id} has a paragraph with no claim behind it`);
    }
}
/** The sections of a reading, composed from a sealed pilot intent. Exported for the tests, which compose from synthetic intents too. */
export function realizeSections(input) {
    const voice = VOICES[input.locale] ?? PILOT_VOICE_EN;
    const base = buildHumanDesignReadingIntent(input.narrative);
    if (base.extension.state !== 'read')
        return null;
    const intent = planPilotDiscourse(base);
    if (!validateReadingIntent(intent).valid)
        return null;
    const facts = factsOf(intent);
    if (!facts)
        return null;
    const central = facts.central ? facts.tensions.find((tension) => tension.id === facts.central?.id) ?? null : null;
    const said = new Set();
    const sections = [];
    for (const planned of intent.discourse.sections) {
        const id = planned.id;
        const method = RENDER[id];
        if (!method)
            return null;
        const ctx = {
            facts, placed: new Set(planned.propositions), relations: new Set(planned.relations), meanings: input.meanings, said, central,
        };
        const paragraphs = voice[method](ctx);
        if (paragraphs.length === 0)
            continue;
        sections.push({ id, ...(id === 'hd2-pull' ? { standfirst: voice.pullStandfirst } : {}), paragraphs });
    }
    guard(sections, intent);
    const saidClaims = new Set(sections.flatMap((section) => section.paragraphs.flatMap((paragraph) => paragraph.claims)));
    const unsaid = intent.discourse.sections.flatMap((section) => section.propositions)
        .filter((id) => !saidClaims.has(id)).map((id) => ({ id, reason: 'placed by the discourse plan, not said by the voice' }));
    return { sections, facts, intentDigest: intent.digest, unsaid };
}
export const realizeHumanDesignPilot = (input) => {
    let realized;
    try {
        realized = realizeSections(input);
    }
    catch (error) {
        if (error instanceof PilotGuardError)
            return null;
        throw error;
    }
    if (!realized)
        return null;
    const sections = realized.sections.map((section) => ({
        id: section.id,
        ...(section.standfirst ? { standfirst: section.standfirst } : {}),
        paragraphs: section.paragraphs.map((paragraph) => paragraph.text),
    }));
    const traces = realized.sections.flatMap((section) => section.paragraphs.map((paragraph, index) => ({ section: section.id, paragraph: index, claims: paragraph.claims })));
    return { sections, evidenceSections: EVIDENCE_SECTIONS, report: { variant: PILOT_VARIANT, intentDigest: realized.intentDigest, traces, unsaid: realized.unsaid } };
};
