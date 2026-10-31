import { tenGodStrengthOverlays } from './tenGodStrength.js?v=b5ef5ed';
import { unitId, } from '../knowledgeTypes.js?v=b5ef5ed';
import { sig } from '../semanticDimensions.js?v=b5ef5ed';
/**
 * AUTHORING SUPPORT FOR THE BAZI LIBRARY.
 *
 * Ten Day Masters across five seasonal states, sixty sexagenary pairs, twelve
 * branches, ten Ten Gods, five phases in several conditions, nine relationship
 * categories. The scaffolding lives here so the content files hold prose.
 *
 * TWO STANDING RULES, ENFORCED BY TESTS
 *
 * 1. THIS IS NOT THE CHINESE ZODIAC. A branch is a container of hidden stems
 *    with a season, a direction and a set of relations. The animal is one layer
 *    of twelve and never the whole reading.
 *
 * 2. NOTHING HERE IS A HEALTH CLAIM. The five phases carry organ
 *    correspondences in Chinese medical theory, and where they appear they are
 *    symbolic and educational. No entry diagnoses, prescribes, or infers a
 *    condition from an element count.
 *
 * PROVENANCE, LAYERED
 *
 * BaZi's structure is undisputed - the sixty-term cycle, the hidden stems, the
 * generating and controlling relations. Its INTERPRETATION varies by school
 * considerably more than astrology's does, and the difference matters enough to
 * be encoded rather than mentioned. Four levels below, from the structural
 * facts down to the punishments, which several respected practitioners discard
 * entirely.
 */
/* ------------------------------------------------------------------ *
 * PROVENANCE
 * ------------------------------------------------------------------ */
/** The shared foundation: phases, stems, branches, the sixty-term cycle. */
export const BAZI_CORE = {
    kind: 'established',
    settledness: 'established-within-system',
    basis: 'The five phases, the sixty-term stem and branch cycle, and the generating and controlling relations are the shared foundation of every BaZi school.',
    sources: ['RESEARCH_BAZI#foundations'],
};
/** Ziping doctrine: the dominant tradition, but a named one. */
export const BAZI_ZIPING = {
    kind: 'tradition-specific',
    settledness: 'conventional',
    basis: 'The Ziping reading of Day Master strength, the Ten Gods and seasonal command is dominant in modern practice but belongs to a named tradition rather than to the system as a whole.',
    traditions: ['Ziping (子平) / Four Pillars'],
    sources: ['RESEARCH_BAZI#strength', 'RESEARCH_BAZI#ten-gods'],
};
/** Composed by this project from established parts under a stated rule. */
export const BAZI_COMPOSED = {
    kind: 'contextual-derivation',
    settledness: 'conventional',
    basis: 'Composed by combining the stem archetype with the seasonal state under the Ziping rule that the commanding month carries the greatest weight; not quoted from a source discussing this exact combination.',
    sources: ['RESEARCH_BAZI#strength', 'RESEARCH_BAZI#commanding-month'],
};
/** Where practitioners genuinely disagree, and the reading must say so. */
export const BAZI_CONTESTED = (dissent) => ({
    kind: 'contested',
    settledness: 'contested',
    basis: 'Practitioners disagree about how much weight this carries, and some discard it entirely.',
    dissent,
    sources: ['RESEARCH_BAZI#relations'],
});
/** TCM correspondence: a separate symbolic layer, never a health claim. */
export const BAZI_TCM = {
    kind: 'tradition-specific',
    settledness: 'provisional',
    basis: 'The five-phase organ correspondences belong to Chinese medical theory and are carried here as symbolic and educational material only; nothing in them is a health statement.',
    traditions: ['Traditional Chinese medicine (five-phase correspondence)'],
    sources: ['RESEARCH_BAZI#tcm'],
};
/* ------------------------------------------------------------------ *
 * DERIVATION
 * ------------------------------------------------------------------ */
/** What each phase contributes, semantically. */
const PHASE_SIGNALS = {
    wood: [['novelty-seeking', 0.6], ['assertive', 0.5], ['creative', 0.5]],
    fire: [['communicative', 0.7], ['outwardly-engaged', 0.6], ['emotionally-expressive', 0.5]],
    earth: [['stability-seeking', 0.7], ['practical', 0.6], ['collaborative', 0.4]],
    metal: [['analytical', 0.7], ['structured', 0.7], ['emotionally-contained', 0.4]],
    water: [['intuitive', 0.7], ['adaptable', 0.6], ['introspective', 0.6]],
};
/** Yang asserts outward; yin persists and adapts. */
const POLARITY_SIGNALS = {
    yang: [['assertive', 0.5], ['independent', 0.4], ['outwardly-engaged', 0.3]],
    yin: [['adaptable', 0.5], ['receptive', 0.4], ['introspective', 0.3]],
};
function merge(...groups) {
    const totals = new Map();
    for (const group of groups) {
        for (const [dimension, weight] of group) {
            totals.set(dimension, Math.min(1, (totals.get(dimension) ?? 0) + weight));
        }
    }
    return [...totals.entries()]
        .map(([dimension, weight]) => sig(dimension, Math.round(weight * 100) / 100))
        .sort((a, b) => a.dimension.localeCompare(b.dimension));
}
/** A stem is a phase in a polarity. That is exactly what its tags should say. */
export function stemSignals(phase, polarity, extra = []) {
    return merge(PHASE_SIGNALS[phase.toLowerCase()] ?? [], POLARITY_SIGNALS[polarity.toLowerCase()] ?? [], extra.map((signal) => [signal.dimension, signal.weight]));
}
export function phaseSignals(phase, extra = []) {
    return merge(PHASE_SIGNALS[phase.toLowerCase()] ?? [], extra.map((signal) => [signal.dimension, signal.weight]));
}
/**
 * A branch carries its own phase at reduced weight plus its authored character.
 *
 * Reduced because a branch is a container rather than a pure phase - it holds
 * hidden stems of other phases, and tagging it as though it were one would
 * overstate its contribution to synthesis.
 */
export function branchSignals(phase, extra = []) {
    const base = (PHASE_SIGNALS[phase.toLowerCase()] ?? [])
        .map(([dimension, weight]) => [dimension, weight * 0.6]);
    return merge(base, extra.map((s) => [s.dimension, s.weight]));
}
function build(kind, role, entry) {
    return {
        id: unitId('bazi', kind, entry.key, role),
        entity: { system: 'bazi', kind, key: entry.key, label: entry.label },
        role,
        headline: entry.headline,
        core: entry.core,
        ...(entry.portrait ? { portrait: entry.portrait } : {}),
        ...(entry.overlays && entry.overlays.length > 0 ? { overlays: entry.overlays } : {}),
        semantics: entry.signals,
        provenance: entry.provenance ?? BAZI_CORE,
    };
}
export const dayMasterUnit = (entry) => build('day-master', 'day-master-role', entry);
/**
 * A Day Master in one seasonal state.
 *
 * Fifty of these, keyed `<stem>-<state>`. They are separate UNITS rather than
 * overlays on the stem, because the seasonal reading REPLACES the plain one -
 * a Ji Earth in autumn is not a Ji Earth with a note appended - and because the
 * composer needs to resolve one without the other being loaded.
 */
export const seasonalUnit = (stem, state, entry) => build('day-master', 'seasonal-context', {
    ...entry, key: `${stem}-${state}`, provenance: BAZI_COMPOSED,
});
/** A branch is a container of hidden stems, so it cites the branch research. */
export const BAZI_BRANCH_PROVENANCE = {
    kind: 'established',
    settledness: 'established-within-system',
    basis: 'The phase, polarity, season, functional group and hidden-stem content of each branch are agreed across schools; the animal names are labels on those containers.',
    sources: ['RESEARCH_BAZI#branches', 'RESEARCH_BAZI#hidden-stems'],
};
export const branchUnit = (entry) => build('earthly-branch', 'base-archetype', { provenance: BAZI_BRANCH_PROVENANCE, ...entry });
export const pillarPairUnit = (entry) => build('heavenly-stem', 'base-archetype', { provenance: BAZI_CORE, ...entry });
/*
 * A Ten God is read against the Day Master's strength, always.
 *
 * Attached here rather than at ten call sites because the rule belongs to the
 * POSITION: every Ten God is favourable or burdensome according to the chart's
 * own condition, and a god written later gets that for free.
 */
export const tenGodUnit = (entry) => build('ten-god', 'base-archetype', {
    provenance: BAZI_ZIPING,
    ...entry,
    /* After the spread, so an entry cannot accidentally drop the conditional
       by declaring overlays of its own. */
    overlays: [...(entry.overlays ?? []), ...tenGodStrengthOverlays(entry.key)],
});
export const phaseUnit = (entry) => build('five-element', 'element-balance', entry);
export const polarityUnit = (entry) => build('polarity', 'element-balance', entry);
export const relationUnit = (entry) => build('branch-relation', 'base-archetype', entry);
export const conceptUnit = (entry) => build('luck-pillar', 'base-archetype', entry);
export const pillarPositionUnit = (entry) => build('earthly-branch', 'pillar-year', entry);
/* ------------------------------------------------------------------ *
 * CANONICAL SETS - so tests and composers agree on what "all" means
 * ------------------------------------------------------------------ */
export const ALL_STEMS = [
    'jia', 'yi', 'bing', 'ding', 'wu', 'ji', 'geng', 'xin', 'ren', 'gui',
];
export const ALL_BRANCHES = [
    'zi', 'chou', 'yin', 'mao', 'chen', 'si', 'wu', 'wei', 'shen', 'you', 'xu', 'hai',
];
/** The engine's own SeasonalState union. */
export const ALL_SEASONAL_STATES = [
    'prosperous', 'aided', 'resting', 'trapped', 'dead',
];
/** The engine's own BaziRelationshipCategory union. */
export const ALL_RELATION_CATEGORIES = [
    'stem-combination', 'stem-clash', 'branch-six-clash', 'branch-six-harmony',
    'branch-three-harmony', 'branch-six-harm', 'branch-three-punishment',
    'branch-mutual-punishment', 'branch-self-punishment',
];
export const ALL_TEN_GODS = [
    'friend', 'rob-wealth', 'eating-god', 'hurting-officer', 'indirect-wealth',
    'direct-wealth', 'seven-killings', 'direct-officer', 'indirect-resource',
    'direct-resource',
];
export const STEM_PHASE = {
    jia: { phase: 'wood', polarity: 'yang', label: 'Jia — Yang Wood' },
    yi: { phase: 'wood', polarity: 'yin', label: 'Yi — Yin Wood' },
    bing: { phase: 'fire', polarity: 'yang', label: 'Bing — Yang Fire' },
    ding: { phase: 'fire', polarity: 'yin', label: 'Ding — Yin Fire' },
    wu: { phase: 'earth', polarity: 'yang', label: 'Wu — Yang Earth' },
    ji: { phase: 'earth', polarity: 'yin', label: 'Ji — Yin Earth' },
    geng: { phase: 'metal', polarity: 'yang', label: 'Geng — Yang Metal' },
    xin: { phase: 'metal', polarity: 'yin', label: 'Xin — Yin Metal' },
    ren: { phase: 'water', polarity: 'yang', label: 'Ren — Yang Water' },
    gui: { phase: 'water', polarity: 'yin', label: 'Gui — Yin Water' },
};
export const BRANCH_INFO = {
    zi: { animal: 'Rat', phase: 'water', polarity: 'yang', label: 'Zi — Rat' },
    chou: { animal: 'Ox', phase: 'earth', polarity: 'yin', label: 'Chou — Ox' },
    yin: { animal: 'Tiger', phase: 'wood', polarity: 'yang', label: 'Yin — Tiger' },
    mao: { animal: 'Rabbit', phase: 'wood', polarity: 'yin', label: 'Mao — Rabbit' },
    chen: { animal: 'Dragon', phase: 'earth', polarity: 'yang', label: 'Chen — Dragon' },
    si: { animal: 'Snake', phase: 'fire', polarity: 'yin', label: 'Si — Snake' },
    wu: { animal: 'Horse', phase: 'fire', polarity: 'yang', label: 'Wu — Horse' },
    wei: { animal: 'Goat', phase: 'earth', polarity: 'yin', label: 'Wei — Goat' },
    shen: { animal: 'Monkey', phase: 'metal', polarity: 'yang', label: 'Shen — Monkey' },
    you: { animal: 'Rooster', phase: 'metal', polarity: 'yin', label: 'You — Rooster' },
    xu: { animal: 'Dog', phase: 'earth', polarity: 'yang', label: 'Xu — Dog' },
    hai: { animal: 'Pig', phase: 'water', polarity: 'yin', label: 'Hai — Pig' },
};
/**
 * The sixty valid stem-branch pairs.
 *
 * Only same-polarity pairings occur, which is why there are sixty rather than
 * a hundred and twenty. Generated from the two cycles rather than typed out,
 * because a hand-written list of sixty would eventually contain a typo and the
 * engine's own cycle is the authority.
 */
export function sexagenaryPairs() {
    const pairs = [];
    for (let index = 0; index < 60; index += 1) {
        const stem = ALL_STEMS[index % 10];
        const branch = ALL_BRANCHES[index % 12];
        pairs.push({ stem, branch, key: `${stem}-${branch}` });
    }
    return pairs;
}
