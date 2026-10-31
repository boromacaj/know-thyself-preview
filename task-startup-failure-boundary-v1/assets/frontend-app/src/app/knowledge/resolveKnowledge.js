import { ROLE_PROVENANCE } from './rolePolicy.js?v=2ea79e9';
import { assertLegalProvenance, } from '../semantics/provenance.js?v=2ea79e9';
import { unitId, } from './knowledgeTypes.js?v=2ea79e9';
/**
 * THE RESOLVER.
 *
 * Turns (entity, role, context) into one resolved reading. Two guarantees:
 *
 *  DETERMINISM. Same inputs, same output, always. Overlays are sorted by an
 *  explicit priority and then by id, so two overlays with equal priority cannot
 *  swap order between runs. No clock, no randomness, no iteration-order
 *  dependence.
 *
 *  NO CONCATENATION. Overlays replace a section or are woven in at a named seam
 *  by prose written to sit there. There is no code path that joins independent
 *  fragments with a separator - see knowledgeTypes.OverlayEffect.
 */
/**
 * Weakest-wins ordering on both provenance axes.
 *
 * A single contested overlay makes the whole composed reading contested. The two
 * axes are tracked separately rather than reduced to one score, because they
 * answer different questions and synthesis derives different factors from each.
 */
const KIND_ORDER = [
    'calculated-fact',
    'established',
    'contextual-derivation',
    'tradition-specific',
    'contested',
];
const SETTLEDNESS_ORDER = [
    'established-within-system',
    'conventional',
    'provisional',
    'contested',
];
function weakestKind(a, b) {
    return KIND_ORDER.indexOf(a) >= KIND_ORDER.indexOf(b) ? a : b;
}
function weakestSettledness(a, b) {
    return SETTLEDNESS_ORDER.indexOf(a) >= SETTLEDNESS_ORDER.indexOf(b) ? a : b;
}
export class KnowledgeRegistry {
    units = new Map();
    register(unit) {
        if (this.units.has(unit.id)) {
            throw new Error(`duplicate interpretation unit: ${unit.id}`);
        }
        /* Fail at module load, not at read time. An illegal kind/settledness pair
           would otherwise reach the weighting model and quietly produce a number
           nobody could justify. */
        assertLegalProvenance(unit.provenance, unit.id);
        for (const overlay of unit.overlays ?? []) {
            assertLegalProvenance(overlay.provenance, `${unit.id} overlay ${overlay.id}`);
        }
        this.units.set(unit.id, unit);
    }
    registerAll(units) {
        for (const unit of units)
            this.register(unit);
    }
    get(system, kind, key, role) {
        return this.units.get(unitId(system, kind, key, role)) ?? null;
    }
    /**
     * The role-first lookup the brief requires: a 7 Life Path must never silently
     * fall back to the 7 Personal Year text. If the requested ROLE is not written,
     * this returns the base archetype instead - which the caller can detect,
     * because the resolved role comes back as 'base-archetype' rather than the one
     * that was asked for.
     */
    resolveUnit(system, kind, key, role) {
        return this.get(system, kind, key, role) ?? this.get(system, kind, key, 'base-archetype');
    }
    has(system, kind, key, role) {
        return this.units.has(unitId(system, kind, key, role));
    }
    size() {
        return this.units.size;
    }
    ids() {
        return [...this.units.keys()].sort();
    }
}
/**
 * Merge signals per dimension, capped at 1.
 *
 * Weights are magnitudes on a named pole, so merging is reinforcement only. An
 * overlay that disagrees with the base does not subtract from it - it asserts
 * the OPPOSING pole, and both then reach synthesis, where the tension model is
 * the thing equipped to notice the disagreement. Cancelling them here would
 * destroy exactly the signal the synthesis layer exists to detect.
 */
function mergeSemantics(base, extra) {
    const totals = new Map();
    for (const signal of [...base, ...extra]) {
        totals.set(signal.dimension, (totals.get(signal.dimension) ?? 0) + signal.weight);
    }
    return [...totals.entries()]
        .map(([dimension, weight]) => ({
        dimension: dimension,
        weight: Math.min(1, Math.round(weight * 10000) / 10000),
    }))
        /* Sorted so the output is stable regardless of insertion order - a Map
           preserves insertion order, and insertion order depends on which overlays
           fired, which would otherwise make the result order-sensitive. */
        .sort((a, b) => a.dimension.localeCompare(b.dimension));
}
function clonePortrait(portrait) {
    if (!portrait)
        return {};
    const out = {};
    for (const [section, prose] of Object.entries(portrait)) {
        if (prose && prose.length > 0)
            out[section] = [...prose];
    }
    return out;
}
export function resolveInterpretation(registry, request) {
    const unit = registry.resolveUnit(request.system, request.kind, request.key, request.role);
    if (!unit)
        return null;
    const context = { role: request.role, ...(request.context ?? {}) };
    /* Deterministic ordering: priority, then id. Never registration order. */
    const candidates = [...(unit.overlays ?? [])]
        .sort((a, b) => (a.priority - b.priority) || a.id.localeCompare(b.id));
    let core = [...unit.core];
    const portrait = clonePortrait(unit.portrait);
    let semantics = [...unit.semantics];
    const applied = [];
    let kind = unit.provenance.kind;
    let settledness = unit.provenance.settledness;
    /* Doubt attached to the ROLE, folded in before any overlay. Reading a number
       as an Attitude number is contested whichever number it is, and the reading
       cannot be firmer than the position it is being read in. Applied against the
       REQUESTED role rather than the resolved one, so a fallback to the base
       archetype does not shed the dispute on the way. */
    const rolePolicy = ROLE_PROVENANCE[request.role];
    if (rolePolicy) {
        kind = weakestKind(kind, rolePolicy.kind);
        settledness = weakestSettledness(settledness, rolePolicy.settledness);
    }
    for (const overlay of candidates) {
        if (!overlay.applies(context))
            continue;
        /* Resolved ONCE, here, so a composing overlay cannot be evaluated twice in
           one resolution and cannot disagree with itself between effects. */
        const prose = typeof overlay.prose === 'function'
            ? overlay.prose(context) : overlay.prose;
        /* A composer with nothing to say says nothing, rather than contributing an
           empty paragraph to the reading. */
        if (prose.length === 0)
            continue;
        switch (overlay.effect) {
            case 'replace-core':
                core = [...prose];
                break;
            case 'weave-after-core':
                /* The overlay's first paragraph is authored to follow the base core's
                   last one. This is a seam, not a join: nothing is concatenated inside a
                   paragraph, and the prose was written knowing what precedes it. */
                core = [...core, ...prose];
                break;
            case 'replace-section':
                if (overlay.section)
                    portrait[overlay.section] = [...prose];
                break;
            case 'amend-shadow':
                portrait.shadow = [...(portrait.shadow ?? []), ...prose];
                break;
            case 'amend-growth':
                portrait.growth = [...(portrait.growth ?? []), ...prose];
                break;
        }
        if (overlay.semantics)
            semantics = mergeSemantics(semantics, overlay.semantics);
        kind = weakestKind(kind, overlay.provenance.kind);
        settledness = weakestSettledness(settledness, overlay.provenance.settledness);
        applied.push({
            id: overlay.id,
            condition: overlay.condition,
            effect: overlay.effect,
            provenance: overlay.provenance,
            prose,
        });
    }
    return {
        unitId: unit.id,
        entity: unit.entity,
        role: unit.role,
        headline: unit.headline,
        core,
        portrait,
        semantics: mergeSemantics(semantics, []),
        provenance: unit.provenance,
        appliedOverlays: applied,
        effectiveKind: kind,
        effectiveSettledness: settledness,
    };
}
/**
 * Total word count of a resolved reading. Used by tests to hold representative
 * content to a depth the writing standard can defend, and by callers that want
 * to promise the reader an honest reading time.
 */
export function resolvedWordCount(resolved) {
    const all = [...resolved.core];
    for (const prose of Object.values(resolved.portrait)) {
        if (prose)
            all.push(...prose);
    }
    return all.join(' ').split(/\s+/).filter(Boolean).length;
}
