import { authorityByTypeOverlays } from './authorityByType.js?v=2ea79e9';
import { profileByAuthorityOverlays } from './profileByAuthority.js?v=2ea79e9';
import { unitId, } from '../knowledgeTypes.js?v=2ea79e9';
import { sig } from '../semanticDimensions.js?v=2ea79e9';
/**
 * AUTHORING SUPPORT FOR THE HUMAN DESIGN LIBRARY.
 *
 * Types, Authorities, Profiles, Definitions, eighteen centre states, thirty-six
 * channels and sixty-four gates. Written longhand each would carry more
 * scaffolding than content, so everything identical lives here and the content
 * files hold only the prose.
 *
 * PROVENANCE, HONESTLY
 *
 * Human Design has ONE originating canon - Ra Uru Hu, 1987 - and a large body of
 * later teaching that elaborates it. That is not the same epistemic situation as
 * astrology's competing Hellenistic lineages or BaZi's classical texts, and
 * pretending otherwise would be dishonest. Agreement inside a single origin is
 * not independent corroboration, so nothing here claims more than "this is what
 * the system uniformly says".
 *
 * The later layers - Variables especially - are taught with visibly less
 * consistency than Type and Authority, and they carry weaker settledness for
 * exactly that reason. Synthesis then discounts them automatically rather than
 * requiring a human to remember.
 *
 * SEMANTIC TAGS ARE DERIVED WHERE THE STRUCTURE SUPPLIES THEM
 *
 * A centre's tags follow from what the centre is; a gate's follow from the
 * centre it sits in plus its own theme. Hand-tagging 64 gates would guarantee
 * drift. The prose is authored one entry at a time and none of it is generated.
 */
/* ------------------------------------------------------------------ *
 * PROVENANCE
 * ------------------------------------------------------------------ */
/** Type, Strategy, Authority, Profile, Definition, Centres: the core canon. */
export const HD_CANON = {
    kind: 'established',
    settledness: 'established-within-system',
    basis: 'Uniform across the Human Design canon and every teaching lineage descending from it; this is the strongest claim the system supports, and it is a claim about the system rather than about the world.',
    traditions: ['Human Design (Jovian Archive lineage)'],
    sources: ['RESEARCH_HUMAN_DESIGN#canon'],
};
/** Channels and gates: canonical structure, more variable in interpretation. */
export const HD_STRUCTURE = {
    kind: 'established',
    settledness: 'conventional',
    basis: 'The channel and gate structure is fixed by the system; the interpretive keynotes attached to each vary between teachers more than the mechanics do.',
    traditions: ['Human Design (Jovian Archive lineage)'],
    sources: ['RESEARCH_HUMAN_DESIGN#channels', 'RESEARCH_HUMAN_DESIGN#gates'],
};
/** The later, more esoteric layer. Taught least consistently, weighted lowest. */
export const HD_LATE_LAYER = {
    kind: 'tradition-specific',
    settledness: 'provisional',
    basis: 'The Variables and the differentiation layers belong to the later Human Design material and are taught with noticeably less consistency than Type and Authority.',
    traditions: ['Human Design (Jovian Archive lineage)'],
    sources: ['RESEARCH_HUMAN_DESIGN#variables'],
};
/* ------------------------------------------------------------------ *
 * DERIVATION FOR STRUCTURAL ENTITIES
 * ------------------------------------------------------------------ */
/** What each centre is, semantically. Used by centres, channels and gates. */
const CENTER_SIGNALS = {
    head: [['conceptual', 0.7], ['analytical', 0.4]],
    ajna: [['analytical', 0.8], ['conceptual', 0.6]],
    throat: [['communicative', 0.9], ['outwardly-engaged', 0.5]],
    g: [['independent', 0.6], ['introspective', 0.4]],
    ego: [['assertive', 0.7], ['persistent', 0.5]],
    'solar-plexus': [['emotionally-expressive', 0.7], ['emotionally-sensitive', 0.6]],
    solarPlexus: [['emotionally-expressive', 0.7], ['emotionally-sensitive', 0.6]],
    sacral: [['persistent', 0.8], ['receptive', 0.5]],
    spleen: [['intuitive', 0.8], ['cautious', 0.4]],
    root: [['persistent', 0.6], ['assertive', 0.4]],
};
/**
 * A defined centre asserts its quality; an open one does not assert the
 * opposite, it becomes variable and eventually wise about that quality.
 *
 * So an open centre gets the SAME dimensions at reduced weight plus
 * `adaptable`, rather than the opposing pole. Tagging an open Throat as
 * `private` would say the person is reserved, which is not what openness means
 * and would put a false contradiction into the synthesis layer.
 */
export function centerSignals(center, defined) {
    const base = CENTER_SIGNALS[center] ?? [];
    if (defined)
        return base.map(([dimension, weight]) => sig(dimension, weight));
    return [
        ...base.map(([dimension, weight]) => sig(dimension, Math.round(weight * 0.4 * 100) / 100)),
        sig('adaptable', 0.6),
        sig('emotionally-sensitive', 0.4),
    ].filter((signal, index, all) => all.findIndex((other) => other.dimension === signal.dimension) === index);
}
/** A channel joins two centres; it carries both, plus its own authored tags. */
export function channelSignals(centers, extra = []) {
    const totals = new Map();
    for (const center of centers) {
        for (const [dimension, weight] of CENTER_SIGNALS[center] ?? []) {
            totals.set(dimension, Math.min(1, (totals.get(dimension) ?? 0) + weight * 0.6));
        }
    }
    for (const signal of extra) {
        totals.set(signal.dimension, Math.min(1, (totals.get(signal.dimension) ?? 0) + signal.weight));
    }
    return [...totals.entries()]
        .map(([dimension, weight]) => sig(dimension, Math.round(weight * 100) / 100))
        .sort((a, b) => a.dimension.localeCompare(b.dimension));
}
/** A gate sits in a centre and carries its own theme at a lighter weight. */
export function gateSignals(center, extra = []) {
    const totals = new Map();
    for (const [dimension, weight] of CENTER_SIGNALS[center] ?? []) {
        totals.set(dimension, Math.round(weight * 0.5 * 100) / 100);
    }
    for (const signal of extra) {
        totals.set(signal.dimension, Math.min(1, (totals.get(signal.dimension) ?? 0) + signal.weight));
    }
    const merged = [...totals.entries()]
        .map(([dimension, weight]) => sig(dimension, Math.round(weight * 100) / 100))
        .sort((a, b) => a.dimension.localeCompare(b.dimension));
    /* A gate with no centre mapping would otherwise register nothing, and evidence
       with no dimension is evidence that vanishes. */
    return merged.length > 0 ? merged : [sig('conceptual', 0.3)];
}
function build(kind, role, entry) {
    return {
        id: unitId('human-design', kind, entry.key, role),
        entity: { system: 'human-design', kind, key: entry.key, label: entry.label },
        role,
        headline: entry.headline,
        core: entry.core,
        ...(entry.portrait ? { portrait: entry.portrait } : {}),
        semantics: entry.signals,
        provenance: entry.provenance ?? HD_CANON,
    };
}
export const typeUnit = (entry) => build('hd-type', 'type-role', entry);
/*
 * An authority is always read against the Type it sits in.
 *
 * Attached here rather than at eight call sites because the rule belongs to the
 * ROLE: every authority is qualified by the design around it, and one written
 * later gets that without anybody remembering.
 */
export const authorityUnit = (entry) => {
    const unit = build('hd-authority', 'authority-role', entry);
    return {
        ...unit,
        overlays: [...(unit.overlays ?? []), ...authorityByTypeOverlays(entry.key)],
    };
};
/*
 * A profile is always read against the Authority it runs through.
 *
 * Added after a twenty-four profile sweep put two Manifesting Generators side
 * by side who shared Type, Authority and Definition and differed only in
 * Profile - and shared 86% of their reading. The profile section was doing its
 * job; nothing anywhere said what it means to run THIS profile through THAT
 * authority, which is where most people mis-run their own design.
 */
export const profileUnit = (entry) => {
    const unit = build('hd-profile', 'profile-role', entry);
    return {
        ...unit,
        overlays: [...(unit.overlays ?? []), ...profileByAuthorityOverlays(entry.key)],
    };
};
export const definitionUnit = (entry) => build('hd-definition', 'base-archetype', entry);
export const channelUnit = (entry) => build('hd-channel', 'base-archetype', { provenance: HD_STRUCTURE, ...entry });
export const gateUnit = (entry) => build('hd-gate', 'base-archetype', { provenance: HD_STRUCTURE, ...entry });
/**
 * A centre in one state.
 *
 * Defined and open are separate UNITS rather than one unit with an overlay,
 * because they are genuinely different readings rather than a modification of a
 * shared one - and because the composer needs to resolve one without the other
 * being present at all.
 */
export function centerStateUnit(center, defined, entry) {
    return build('hd-center', 'center-role', {
        ...entry,
        key: `${center}-${defined ? 'defined' : 'open'}`,
        signals: centerSignals(center, defined),
    });
}
export const signatureUnit = (entry) => build('hd-variable', 'base-archetype', entry);
export const variableUnit = (entry) => build('hd-variable', 'variable-role', { provenance: HD_LATE_LAYER, ...entry });
export const crossUnit = (entry) => build('hd-cross', 'base-archetype', entry);
/* The canonical sets, kept here so tests and composers agree on what "all" means. */
export const ALL_HD_CENTERS = [
    'head', 'ajna', 'throat', 'g', 'ego', 'solar-plexus', 'sacral', 'spleen', 'root',
];
export const ALL_HD_PROFILES = [
    '1/3', '1/4', '2/4', '2/5', '3/5', '3/6', '4/6', '4/1', '5/1', '5/2', '6/2', '6/3',
];
export const ALL_HD_TYPES = [
    'manifestor', 'generator', 'manifesting-generator', 'projector', 'reflector',
];
export const ALL_HD_AUTHORITIES = [
    'emotional-solar-plexus', 'sacral', 'splenic', 'ego-manifested', 'ego-projected',
    'self-projected', 'mental-environmental', 'lunar',
];
export const ALL_HD_DEFINITIONS = [
    'no-definition', 'single-definition', 'split-definition',
    'triple-split-definition', 'quadruple-split-definition', 'multiple-split-definition',
];
