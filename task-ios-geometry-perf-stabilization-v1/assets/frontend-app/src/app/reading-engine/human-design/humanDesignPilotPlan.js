import { bodyOf, sealIntent } from '../contract/readingIntent.js?v=d9f39e7';
const WOVEN_TENSIONS = new Set(['signal-noise', 'profile']);
export function planPilotDiscourse(base) {
    const body = bodyOf(base);
    const has = new Set(base.propositions.map((proposition) => proposition.id));
    const kindOf = (id) => String(base.propositions.find((proposition) => proposition.id === id)?.slots.kind ?? '');
    const tensionIds = base.propositions.filter((proposition) => proposition.id.startsWith('tension-')).map((proposition) => proposition.id);
    const relationOf = (tensionId) => base.relations.find((relation) => relation.from === tensionId)?.id ?? null;
    const central = base.discourse.centralRelation;
    const woven = (kind) => tensionIds.filter((id) => kindOf(id) === kind);
    const pulling = tensionIds.filter((id) => !WOVEN_TENSIONS.has(kindOf(id)));
    const present = (ids) => ids.filter((id) => has.has(id));
    const relationsFor = (ids) => ids.map(relationOf).filter((id) => id !== null && id !== central);
    const draft = [
        { id: 'hd2-lead', purpose: 'synthesis', propositions: present(['time']), relations: central ? [central] : [], merge: [], budget: [2, 6], told: [] },
        { id: 'hd2-energy', purpose: 'ground', propositions: present(['operating']), relations: [], merge: [], budget: [3, 6], told: [] },
        { id: 'hd2-decide', purpose: 'develop', propositions: present(['decision', ...woven('signal-noise')]), relations: relationsFor(woven('signal-noise')), merge: [], budget: [4, 9], told: ['operating'] },
        { id: 'hd2-people', purpose: 'develop', propositions: present(['social', ...woven('profile')]), relations: relationsFor(woven('profile')), merge: [], budget: [3, 8], told: ['operating', 'decision'] },
        { id: 'hd2-steady', purpose: 'develop', propositions: present(['consistency']), relations: [], merge: [], budget: [3, 7], told: ['operating', 'decision'] },
        { id: 'hd2-open', purpose: 'develop', propositions: present(['context']), relations: [], merge: [], budget: [3, 6], told: ['operating', 'decision'] },
        { id: 'hd2-pull', purpose: 'tension', propositions: pulling, relations: relationsFor(pulling), merge: [], budget: [2, 4 + 3 * pulling.length], told: ['operating', 'decision'] },
        { id: 'hd2-off', purpose: 'tension', propositions: present(['cost']), relations: [], merge: [], budget: [2, 5], told: ['operating', 'decision'] },
        { id: 'hd2-help', purpose: 'practice', propositions: present(['practice']), relations: [], merge: [], budget: [4, 14], told: ['decision'] },
    ];
    /* A section with nothing to say is absent, never padded; the lead is kept even when it carries no proposition of its own,
       because it says the relation (or, with none, the subject). Its `told` can only name propositions an EARLIER section
       said, so the later sections' ledgers are trimmed to what is actually placed before them. */
    const placedBefore = new Set();
    const sections = [];
    for (const section of draft) {
        if (section.propositions.length === 0 && section.id !== 'hd2-lead')
            continue;
        sections.push({ ...section, told: section.told.filter((id) => placedBefore.has(id)) });
        section.propositions.forEach((id) => placedBefore.add(id));
    }
    const next = {
        ...body,
        intelligence: { ...body.intelligence, engine: 'human-design-narrative+pilot-discourse', contentVersion: 2 },
        discourse: { ...body.discourse, sections },
        extension: { ...body.extension, discoursePlan: 'pilot-v2', narrativeSections: sections.map((section) => section.id) },
    };
    return sealIntent(next);
}
