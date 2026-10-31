import { SEMANTIC_AXES } from '../../semantics/semanticTaxonomy.js?v=b5ef5ed';
import { AXIS_DYNAMICS } from '../domains/dynamics.js?v=b5ef5ed';
/** The order the areas are told in: how two people talk, how they feel together, how close, what happens when it goes wrong, how they decide, how they live, where they are heading. */
export const MAP_CATEGORIES = ['communication', 'emotions', 'closeness', 'conflict', 'decisions', 'everyday', 'direction'];
/** The axes each area stands on. `conflict` has none of its own; the three it is derived from are listed in CONFLICT_RELATED. */
export const CATEGORY_AXES = {
    communication: ['inner-focus', 'reasoning'],
    emotions: ['emotional-expression'],
    closeness: ['autonomy', 'visibility'],
    decisions: ['initiative', 'risk'],
    everyday: ['structure', 'change', 'abstraction'],
};
export const CONFLICT_RELATED = ['inner-focus', 'emotional-expression', 'autonomy'];
const DRIVE_IDS = ['shared-pull', 'pulls-apart', 'different-pulls'];
const POLES = new Map(SEMANTIC_AXES.map((axis) => [axis.id, axis.poles]));
const markerOf = (stance) => (stance.strength === 'unknown' ? null : Math.max(-1, Math.min(1, stance.z / 2.5)));
const stanceOf = (stance) => ({ pole: stance.pole, strength: stance.strength, mixed: stance.mixed });
/** The shape of a told finding on an axis, from the two stances. */
function shapeOf(poles, a, b) {
    const at = (pole) => (pole === poles[0] ? 0 : pole === poles[1] ? 1 : null);
    const pa = at(a.pole);
    const pb = at(b.pole);
    if (pa !== null && pb !== null)
        return pa === pb ? { kind: 'shared', pole: pa } : { kind: 'opposed', pole0: pa === 0 ? 'first' : 'second' };
    if (pa !== null)
        return { kind: 'lean', lean: 'first', pole: pa };
    if (pb !== null)
        return { kind: 'lean', lean: 'second', pole: pb };
    return null;
}
/** A member for one axis. The relation, strength, hedge and role are the engine's own; nothing is re-derived. */
function axisMember(axis, relation, finding, poles) {
    const state = relation.kind === 'unreadable' ? 'unreadable' : relation.kind === 'quiet' ? 'quiet' : 'told';
    const strength = finding?.strength ?? relation.strength;
    const corroboration = finding?.corroboration ?? relation.corroboration;
    return {
        dynamic: AXIS_DYNAMICS[axis], axis, state, role: state === 'told' ? finding?.role ?? null : null, strength, corroboration,
        hedged: relation.hedged, timeSensitive: relation.timeSensitive,
        supported: state === 'told' && strength !== 'faint' && corroboration !== 'single-source',
        poles, first: stanceOf(relation.stanceA), second: stanceOf(relation.stanceB),
        markers: { first: markerOf(relation.stanceA), second: markerOf(relation.stanceB) }, drives: null, salience: finding?.salience ?? 0,
        weight: finding?.weight ?? 0, shape: state === 'told' ? shapeOf(poles, relation.stanceA, relation.stanceB) : null,
    };
}
function driveMember(finding) {
    return {
        dynamic: finding.id, axis: null, state: 'told', role: finding.role, strength: finding.strength, corroboration: finding.corroboration, hedged: false, timeSensitive: false,
        supported: finding.strength !== 'faint' && finding.corroboration !== 'single-source',
        poles: null, first: null, second: null, markers: null,
        drives: finding.a && finding.b ? { first: finding.a, second: finding.b } : null, salience: finding.salience,
        weight: finding.weight, shape: finding.relation === 'shared-drive' || finding.relation === 'drives-pull-apart' || finding.relation === 'different-drives' ? { kind: 'drive', relation: finding.relation } : null,
    };
}
/**
 * The tone of a set of members, from the findings that stand firmly. One role is that role. With more than one role the area is honestly mixed and its lines say which parts are which: an area
 * is never described by the role of its firmest part when another firm part reads differently, because the sentence for the whole would then claim more than the evidence under it.
 */
function toneOf(members) {
    const asTone = (role) => (role === 'resonance' || role === 'complement' || role === 'friction' || role === 'asymmetry' ? role : 'mixed');
    const firm = members.filter((member) => member.supported);
    if (firm.length > 0) {
        const roles = new Set(firm.map((member) => member.role));
        return { tone: roles.size === 1 ? asTone(firm[0].role) : 'mixed', reason: null, supported: true };
    }
    const told = members.filter((member) => member.state === 'told');
    if (told.length > 0)
        return { tone: 'limited', reason: told.some((member) => member.strength === 'faint') ? 'faint' : 'single-source', supported: false };
    return { tone: 'limited', reason: members.some((member) => member.state === 'quiet') ? 'quiet' : 'unreadable', supported: false };
}
const leadOf = (members) => [...members].sort((x, y) => Number(y.supported) - Number(x.supported) || y.salience - x.salience)[0] ?? null;
/**
 * The map of one pair, from the evidence and the domain's reading of it. Pure and deterministic: the same evidence and interpretation give the same map, and swapping the two people swaps
 * their positions and nothing else.
 */
export function buildRelationshipMap(evidence, interpretation) {
    const findings = new Map([...interpretation.background, ...interpretation.findings].map((finding) => [finding.id, finding]));
    const member = (axis) => axisMember(axis, evidence.axes[axis], findings.get(AXIS_DYNAMICS[axis]), POLES.get(axis));
    const drives = DRIVE_IDS.map((id) => findings.get(id)).filter((finding) => finding !== undefined && finding.relation !== 'quiet' && finding.relation !== 'unreadable').map(driveMember);
    const categories = MAP_CATEGORIES.map((id) => {
        if (id === 'conflict') {
            const members = CONFLICT_RELATED.map(member);
            const { tone, reason, supported } = toneOf(members);
            return { id, tone, members, derived: true, supported, reason, lead: leadOf(members) };
        }
        const members = id === 'direction' ? drives : CATEGORY_AXES[id].map(member);
        const { tone, reason, supported } = toneOf(members);
        return { id, tone, members, derived: false, supported, reason: members.length === 0 ? 'unreadable' : reason, lead: leadOf(members) };
    });
    const byTone = { resonance: [], complement: [], friction: [], asymmetry: [], mixed: [], limited: [] };
    /* within a tone the firmest area comes first, so "the main areas of resonance" is the strongest one, not the first in the list */
    const ranked = [...categories].sort((x, y) => (y.lead?.salience ?? 0) - (x.lead?.salience ?? 0) || MAP_CATEGORIES.indexOf(x.id) - MAP_CATEGORIES.indexOf(y.id));
    /* the derived area is shown in the map and its detail but is not listed beside the facts it is derived from */
    for (const category of ranked)
        if (!category.derived)
            byTone[category.tone].push(category.id);
    const evidenceBased = categories.filter((category) => !category.derived);
    const supportedCount = evidenceBased.filter((category) => category.supported).length;
    /* the shape of the whole is read from the firm findings themselves, not from the areas they were sorted into: an area that holds both a shared and a differing finding counts each once */
    const firmMembers = evidenceBased.flatMap((category) => category.members.filter((entry) => entry.supported));
    const shared = firmMembers.filter((entry) => entry.role === 'resonance' || entry.role === 'complement').length;
    const attention = firmMembers.filter((entry) => entry.role === 'friction' || entry.role === 'asymmetry').length;
    const pattern = supportedCount < 3 ? 'thin' : attention === 0 ? 'aligned' : shared >= attention ? 'aligned-with-care' : 'contrasting';
    const { birthTime } = evidence.coverage;
    return {
        categories,
        summary: {
            byTone, supported: supportedCount, total: evidenceBased.length, pattern, birthTime,
            timeUncertain: birthTime.a !== 'exact' || birthTime.b !== 'exact' || evidence.coverage.timeSensitiveAxes.length > 0,
        },
    };
}
const STRENGTH_RANK = { strong: 3, moderate: 2, faint: 1 };
const CORROBORATION_RANK = { firm: 2, supported: 1, 'single-source': 0 };
/** Which of two findings is shown first: the one that matters more in a romantic relationship, then the one the evidence stands behind more firmly, then the engine's own order, then the order of the areas. */
function byImportance(x, y) {
    return y.member.weight - x.member.weight
        || STRENGTH_RANK[y.member.strength] - STRENGTH_RANK[x.member.strength]
        || CORROBORATION_RANK[y.member.corroboration] - CORROBORATION_RANK[x.member.corroboration]
        || y.member.salience - x.member.salience
        || MAP_CATEGORIES.indexOf(x.category) - MAP_CATEGORIES.indexOf(y.category);
}
/**
 * THE THREE THINGS A PERSON SHOULD SEE FIRST: what connects the two, what each can bring to the other, and where to pay attention. Each is the most important firm finding of that kind (see
 * byImportance), taken from the evidence-based areas only. A slot with no firm finding of its kind stays empty and says so: nothing is promoted to fill a place, and the attention slot takes a
 * clearer-preference finding only when there is no friction at all. No new scoring: the same weights, strengths and corroboration the engine already holds.
 */
export function selectHighlights(map) {
    const firm = map.categories.filter((category) => !category.derived)
        .flatMap((category) => category.members.filter((member) => member.supported && member.role).map((member) => ({ member, category: category.id })));
    const best = (role) => firm.filter((entry) => entry.member.role === role).sort(byImportance)[0];
    const slot = (name, tone, entry) => (entry
        ? { slot: name, tone, category: entry.category, member: entry.member }
        : { slot: name, tone: null, category: null, member: null });
    const friction = best('friction');
    const clearer = friction ? undefined : best('asymmetry');
    return [
        slot('connects', 'resonance', best('resonance')),
        slot('complements', 'complement', best('complement')),
        slot('attention', friction ? 'friction' : 'asymmetry', friction ?? clearer),
    ];
}
