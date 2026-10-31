import { modalityRank } from '../contract/readingIntentTypes.js?v=d9f39e7';
/* ------------------------------------------------------------- slot readers -- */
const str = (slots, key) => String(slots[key] ?? '');
const strOrNull = (slots, key) => { const v = slots[key]; return v === null || v === undefined || v === '' ? null : String(v); };
const num = (slots, key) => Number(slots[key] ?? 0);
const bool = (slots, key) => slots[key] === true;
const list = (slots, key) => { const v = slots[key]; return Array.isArray(v) ? v.map(String) : []; };
const centers = (slots, key) => list(slots, key);
const centerOrNull = (slots, key) => strOrNull(slots, key);
/** The facts of a `state: 'read'` Human Design intent. Returns null for an envelope or a withheld intent: they have no whole-chart claims to realize. */
export function factsOf(intent) {
    if (intent.extension.state !== 'read')
        return null;
    const byId = new Map(intent.propositions.map((proposition) => [proposition.id, proposition]));
    const get = (id) => byId.get(id) ?? null;
    const operating = get('operating');
    const decision = get('decision');
    const cost = get('cost');
    const practice = get('practice');
    if (!operating || !decision || !cost || !practice)
        return null;
    const time = get('time');
    const social = get('social');
    const consistency = get('consistency');
    const context = get('context');
    const tensions = intent.propositions
        .filter((proposition) => proposition.id.startsWith('tension-'))
        .map((proposition) => {
        const s = proposition.slots;
        const evidence = str(s, 'evidence');
        switch (str(s, 'kind')) {
            case 'pace': return { id: proposition.id, kind: 'pace', initiation: str(s, 'initiation'), authorityKind: str(s, 'authorityKind'), evidence };
            case 'split': return { id: proposition.id, kind: 'split', groupCenters: list(s, 'groupCenters').map((group) => group.split('+')), bridgeGates: list(s, 'bridgeGates').map(Number), evidence };
            case 'signal-noise': return { id: proposition.id, kind: 'signal-noise', noise: str(s, 'noise'), authorityKind: str(s, 'authorityKind'), evidence };
            case 'profile': return { id: proposition.id, kind: 'profile', conscious: num(s, 'conscious'), unconscious: num(s, 'unconscious'), evidence };
            default: return { id: proposition.id, kind: 'reach', awareness: centers(s, 'awareness'), openDrive: centers(s, 'openDrive'), evidence };
        }
    });
    const centralRelation = intent.discourse.centralRelation ? intent.relations.find((relation) => relation.id === intent.discourse.centralRelation) ?? null : null;
    const centralTension = centralRelation ? tensions.find((tension) => tension.id === centralRelation.from) ?? null : null;
    return {
        time: time ? { windowHours: time.slots.windowHours === null ? null : num(time.slots, 'windowHours'), changes: list(time.slots, 'windowChanges') } : null,
        operating: {
            type: str(operating.slots, 'type'),
            initiation: str(operating.slots, 'initiation'),
            sacralPowered: bool(operating.slots, 'sacralPowered'),
            motorToThroat: bool(operating.slots, 'motorToThroat'),
            motorPath: centers(operating.slots, 'motorPath'),
            pathChannels: list(operating.slots, 'pathChannels'),
        },
        decision: {
            authority: str(decision.slots, 'authority'),
            kind: str(decision.slots, 'authorityKind'),
            center: centerOrNull(decision.slots, 'center'),
            needsTime: bool(decision.slots, 'needsTime'),
            evidenceChannels: list(decision.slots, 'evidenceChannels'),
            confusableWith: centerOrNull(decision.slots, 'confusableWith'),
        },
        social: social ? { conscious: num(social.slots, 'conscious'), unconscious: num(social.slots, 'unconscious'), shape: str(social.slots, 'shape'), label: str(social.slots, 'label') } : null,
        consistency: consistency ? {
            definedCount: num(consistency.slots, 'definedCount'), groupCount: num(consistency.slots, 'groupCount'),
            definedCenters: centers(consistency.slots, 'definedCenters'), functionsDefined: list(consistency.slots, 'functionsDefined'), channels: list(consistency.slots, 'channels'),
        } : null,
        context: context ? { openCount: num(context.slots, 'openCount'), openCenters: centers(context.slots, 'openCenters'), functionsOpen: list(context.slots, 'functionsOpen'), whollyOpen: bool(context.slots, 'whollyOpen') } : null,
        tensions,
        cost: { type: str(cost.slots, 'type'), notSelf: strOrNull(cost.slots, 'notSelf'), pressure: centerOrNull(cost.slots, 'pressure') },
        practice: {
            type: str(practice.slots, 'type'), authority: str(practice.slots, 'authority'), kind: str(practice.slots, 'authorityKind'),
            needsTime: bool(practice.slots, 'needsTime'), signature: strOrNull(practice.slots, 'signature'), watch: centerOrNull(practice.slots, 'watch'),
        },
        modality: Object.fromEntries(intent.propositions.map((proposition) => [proposition.id, proposition.interpretation.modality])),
        conditions: Object.fromEntries(intent.propositions.map((proposition) => [proposition.id, proposition.interpretation.conditions])),
        central: centralRelation && centralTension ? { relation: centralRelation, kind: centralTension.kind, id: centralTension.id } : null,
    };
}
export function wordingOf(modality) {
    const rank = modalityRank(modality ?? 'tentative');
    if (rank >= modalityRank('assert'))
        return 'assert';
    if (rank >= modalityRank('tendency'))
        return 'tendency';
    if (rank >= modalityRank('tentative'))
        return 'tentative';
    return 'possibility';
}
