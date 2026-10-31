import { KNOWLEDGE } from '../../knowledge/knowledgeBase.js?v=53c0693';
import { contributionFor, contributionText } from '../contributions.js?v=53c0693';
import { factPhrase } from '../factPhrasing.js?v=53c0693';
import { POLE_TAGS } from '../mechanismRules.js?v=53c0693';
import { poleShort } from '../themeVoice.js?v=53c0693';
/*
 * FROM CALCULATED RESULTS TO THE ELEMENTS A READER CAN OPEN.
 *
 * The only place evidence is selected for display. It is a VIEW of the synthesis
 * model and invents nothing. An element is displayed only when ALL of these hold:
 *
 *   COUNTED    the model counted it (not suppressed for a missing birth time, weight > 0);
 *   RELEVANT   the weight the knowledge layer itself authored for that result on the
 *              dimension the claim rests on clears a floor (below). A result that
 *              brushes a dimension at 0.4 is not evidence FOR it, however much a tag
 *              overlaps - this replaces the V2 rule that a shared tag was enough;
 *   PERSONAL   it is not an outer-planet placement (Uranus, Neptune, Pluto), whose own
 *              authored text says it describes a generation and that the personal part
 *              is the house and the aspects;
 *   SPOKEN     there is an authored statement to show for it (see `describeElement`).
 *
 * WHAT A READER SEES FOR AN ELEMENT is the knowledge layer's own headline for that
 * exact placement - `Identity through work that is actually useful` for a Sun in
 * Virgo, `Structured thinking with a long time horizon` for a Mercury in Capricorn -
 * so a Sun, a Mercury and a Venus in one sign are no longer one sentence. Where the
 * layer holds no text for the placement itself (the Ascendant, a planet it has no
 * composed unit for), the line is the layer's text for the ROLE followed by its text
 * for the SIGN, both authored, joined and attributed as what they are.
 */
export const PILLAR_ORDER = ['numerology', 'astrology', 'bazi', 'human-design'];
/** Reader-facing names, short on purpose: they sit in a quiet footnote. */
export const PILLAR_NAME = {
    numerology: 'Numerology',
    astrology: 'Astrology',
    bazi: 'BaZi',
    'human-design': 'Human Design',
};
/**
 * The floors. A want rests on the table of what each symbol is FOR
 * (`knowledge/driveSignals.ts`), where a primary want is 0.8-0.9 and a secondary
 * 0.4-0.5, so a want needs the primary; a way of working rests on authored
 * behavioural weights that are lower across the board, so its floor is lower.
 */
export const DRIVE_FLOOR = 0.6;
export const STYLE_FLOOR = 0.5;
const DRIVE_DIMENSIONS = new Set([
    'mastery', 'achievement', 'recognition', 'meaning', 'belonging', 'freedom', 'care',
    'understanding', 'self-expression', 'beauty',
]);
export const weightFloor = (dimension) => (DRIVE_DIMENSIONS.has(dimension) ? DRIVE_FLOOR : STYLE_FLOOR);
const GENERATIONAL = /^placement-(Uranus|Neptune|Pluto)$/;
const capitalise = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const sentence = (text) => {
    const trimmed = text.trim();
    return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
};
export const sourceKeyOf = (evidence) => `${evidence.pillar}:${evidence.sourceEntity}`;
/** The rows the model actually counted - the same rule `interactions.ts` applies to citation. */
export const counted = (items) => items.filter((item) => item.evidence.methodology !== 'suppressed' && item.countedWeight > 0);
function unitOf(id, fallbackRole = 'base-archetype') {
    if (!id)
        return null;
    const [system, kind, key, role] = id.split(':');
    if (!system || !kind || !key)
        return null;
    return KNOWLEDGE.get(system, kind, key, (role ?? fallbackRole))
        ?? KNOWLEDGE.resolveUnit(system, kind, key, (role ?? fallbackRole));
}
/**
 * The knowledge layer's own words for what this element is, in its own tradition.
 * Null when the layer has none to give - and then the element is not displayed.
 */
export function describeElement(evidence) {
    const unit = unitOf(evidence.knowledgeUnitId);
    /* A one-word headline (`Adapts.`) is a label, not a statement a reader can learn from. */
    if (!unit?.headline || unit.headline.trim().split(/\s+/).length < 2)
        return null;
    const isBody = /^placement-/.test(evidence.sourceEntity) || evidence.sourceEntity === 'ascendant';
    /* A planet in a sign with its own composed unit: that unit's headline is the
       placement's own statement. Only when the row had to fall back to the plain
       sign is the role named separately. */
    if (isBody && evidence.knowledgeUnitId?.startsWith('western-astrology:sign:')) {
        const roleKey = evidence.sourceEntity === 'ascendant'
            ? { kind: 'angle', key: 'ascendant' }
            : { kind: 'planet', key: evidence.sourceEntity.replace(/^placement-/, '').toLowerCase() };
        const role = KNOWLEDGE.get('western-astrology', roleKey.kind, roleKey.key, (roleKey.kind === 'angle' ? 'ascendant' : 'base-archetype'));
        const sign = /^western-astrology:sign:([a-z]+):/.exec(evidence.knowledgeUnitId)?.[1] ?? '';
        if (!role?.headline || !sign)
            return null;
        return `${sentence(role.headline)} As ${capitalise(sign)}: ${sentence(unit.headline)}`;
    }
    return sentence(unit.headline);
}
/* ------------------------------------------------------------- selection */
/**
 * WHETHER WHAT A RESULT MEANS IS WHAT THE ROW CLAIMS IT SPEAKS TO.
 *
 * Kept from V2 as a second, independent check for ways of working: the lexicon's
 * behavioural tags must share a tag with the dimension. The authored weight is the
 * primary test; this only catches the rare row that clears the weight and whose
 * compressed meaning still points elsewhere.
 */
export function tagsFit(item, tags) {
    const accepted = POLE_TAGS[item.evidence.dimension];
    return !accepted || tags.length === 0 || tags.some((tag) => accepted.includes(tag));
}
/**
 * THE ELEMENT IS SUBSTANTIALLY ABOUT THE DIMENSION, NOT MERELY TOUCHING IT.
 *
 * Two tests on what the knowledge layer authored for the element: its weight on
 * the claimed dimension clears the floor, AND that weight is at least
 * `PRIMARY_SHARE` of the heaviest dimension the same unit carries. A Virgo Sun
 * touches `introspective` lightly beside its practical and analytical weights;
 * it is not evidence for a claim about working things out inwardly, whatever tag
 * the lexicon gives it. A Life Path 7 is primarily `understanding` and only
 * secondarily `meaning`, so it stands behind the first claim and not the second.
 */
export const PRIMARY_SHARE = 0.7;
export function relevant(item) {
    const { evidence } = item;
    if (GENERATIONAL.test(evidence.sourceEntity))
        return false;
    if (evidence.semanticWeight < weightFloor(evidence.dimension))
        return false;
    const unit = unitOf(evidence.knowledgeUnitId);
    const heaviest = Math.max(0, ...(unit?.semantics ?? []).map((signal) => signal.weight));
    return heaviest === 0 || evidence.semanticWeight >= PRIMARY_SHARE * heaviest;
}
/**
 * Pick up to `limit` displayable elements: one per pillar first (so the reader
 * sees independent traditions), heaviest first inside that, then the heaviest of
 * the rest. Deterministic: ties fall through to the evidence id.
 */
export function chooseElements(items, limit, avoid = new Set()) {
    const bySource = new Map();
    for (const item of counted(items)) {
        if (!relevant(item))
            continue;
        const contribution = contributionFor(item.evidence);
        if (contribution && !tagsFit(item, contribution.tags))
            continue;
        const key = sourceKeyOf(item.evidence);
        const existing = bySource.get(key);
        if (!existing || item.countedWeight > existing.countedWeight)
            bySource.set(key, item);
    }
    const ranked = [...bySource.values()].sort((left, right) => (right.countedWeight - left.countedWeight || left.evidence.id.localeCompare(right.evidence.id)));
    const candidates = [];
    for (const item of ranked) {
        if (avoid.has(sourceKeyOf(item.evidence)))
            continue;
        const tradition = describeElement(item.evidence);
        if (!tradition)
            continue;
        const contribution = contributionFor(item.evidence);
        candidates.push({
            item,
            element: {
                evidenceId: item.evidence.id,
                sourceKey: sourceKeyOf(item.evidence),
                pillar: item.evidence.pillar,
                element: capitalise(factPhrase(item.evidence)),
                tradition,
                meaning: contribution ? contributionText(contribution) : '',
                tags: contribution?.tags ?? [],
                weight: item.evidence.semanticWeight,
                dimension: item.evidence.dimension,
            },
        });
    }
    const chosen = [];
    for (const pillar of PILLAR_ORDER) {
        const best = candidates.find((entry) => entry.element.pillar === pillar);
        if (best && chosen.length < limit)
            chosen.push(best);
    }
    for (const entry of candidates) {
        if (chosen.length >= limit)
            break;
        if (!chosen.includes(entry))
            chosen.push(entry);
    }
    chosen.sort((left, right) => (right.item.countedWeight - left.item.countedWeight
        || left.element.evidenceId.localeCompare(right.element.evidenceId)));
    return chosen.map((entry) => entry.element);
}
export const pillarsOfElements = (elements) => PILLAR_ORDER.filter((pillar) => elements.some((element) => element.pillar === pillar));
/**
 * Elements for one idea. A result already shown under an earlier idea in the same
 * footnote is passed over - unless that would leave this idea with fewer than two
 * traditions, in which case the full set is used: the footnote says what is
 * shown, and an idea shown from one tradition would say less than the model has.
 */
export function themeGroup(theme, limit = 3, avoid = new Set()) {
    let elements = chooseElements(theme.supportingEvidence, limit, avoid);
    if (avoid.size > 0 && pillarsOfElements(elements).length < pillarsOfElements(chooseElements(theme.supportingEvidence, limit)).length) {
        elements = chooseElements(theme.supportingEvidence, limit);
    }
    return { id: `theme:${theme.id}`, heading: capitalise(theme.label), elements };
}
/** Elements behind one pole of a split. */
export function poleGroup(tension, side, avoid, limit = 2) {
    return {
        id: `pole:${tension.axis}:${side.dimension}`,
        heading: capitalise(poleShort(side.dimension) || side.dimension),
        elements: chooseElements(side.evidence, limit, avoid),
    };
}
/**
 * A result can argue both ways at once (a Day Master that is weak in season
 * speaks to structure AND to adaptability) and the model counts it on both
 * poles. Showing it on both sides of one split reads as a bug, so the lighter
 * pole omits what the heavier pole already shows - unless that would leave it
 * with nothing, in which case it keeps them.
 */
export function splitGroups(tension, limit = 2) {
    const [heavier, lighter] = tension.poleA.weight >= tension.poleB.weight
        ? [tension.poleA, tension.poleB] : [tension.poleB, tension.poleA];
    const first = poleGroup(tension, heavier, new Set(), limit);
    const taken = new Set(first.elements.map((element) => element.sourceKey));
    let second = poleGroup(tension, lighter, taken, limit);
    if (second.elements.length === 0)
        second = poleGroup(tension, lighter, new Set(), limit);
    return [first, second];
}
