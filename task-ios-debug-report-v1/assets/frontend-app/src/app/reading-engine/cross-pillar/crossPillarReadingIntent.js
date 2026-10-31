import { buildProposition, relation, sealPillarIntent, section, slug, withheldNotice, MODALITY_OF_EVIDENCE } from '../contract/adapterKit.js?v=b5ef5ed';
import { buildHumanPortrait, rankTensions } from '../../synthesis-reading/humanPortrait.js?v=b5ef5ed';
import { VISIBLE_TENSIONS } from '../../synthesis-reading/synthesisReadingTypes.js?v=b5ef5ed';
/**
 * THE CROSS-PILLAR ADAPTER: WHAT THE PORTRAIT CHOSE TO SAY, AND ON WHAT EVIDENCE.
 *
 * The Cross-Pillar reading is built in two typed stages before any sentence: the synthesis foundation (`CrossPillarSynthesis`: themes with the evidence behind each, the tensions between
 * poles, the coverage of the four systems and of the birth time) and the portrait's selection (`HumanPortrait`: which themes are told, in which section, how firmly, and which splits are
 * voiced). This adapter reads those two and no sentence: not a voiced line, not a mechanism paragraph.
 *
 * What the realization is licensed to say is exactly what the typed model supports: that a theme is carried by these systems (the pillars and the placements behind it), how firmly the
 * portrait itself says it (its own firm / moderate / tentative), and that a split between two poles is present with this balance. What the deterministic reading ALSO says and this adapter
 * does not carry, because the only source of it is authored, already-voiced prose keyed by theme (not a typed fact): the cost of the central pattern, the life-area conditions ("you do best
 * when ...") and the closing line. They are named in `withheld` and are the coverage gap between this realization and the deterministic reading; they are not recovered by asking a model to
 * guess them.
 *
 * The meaning of a theme is the pillar's own authored commentary (the `cross-pillar` theme and axis units) plus the knowledge unit of each placement the theme rests on; both are found by
 * key. Nothing of the single-pillar readings is copied: a placement is named by what the foundation recorded, not by what a pillar's reading says about it.
 */
export const CROSS_PILLAR_KIND = 'cross-pillar-natal';
export const CROSS_PILLAR_CONTENT_VERSION = 1;
const ROOT = 'system:cross-pillar/synthesis';
const ROOT_TIME = 'system:cross-pillar/birth-time';
const FORBIDDEN = ['assumption-as-fact', 'diagnosis', 'domain-transfer', 'event-prediction'];
const EVIDENCE_PER_THEME = 6;
const WITHHELD = [
    { key: 'pattern-cost', reason: 'what the central pattern costs is authored only as voiced prose keyed by theme, not as a typed fact, and is not carried' },
    { key: 'life-area-conditions', reason: 'the conditions under which patterns work well in an area of life are authored only as voiced prose and are not carried' },
    { key: 'closing-line', reason: 'the closing line restates the reading and is not a claim of its own' },
    { key: 'illustrative-scenarios', reason: 'an illustration of a split is an authored picture, never a fact about the reader' },
    { key: 'population-share', reason: 'no share of people, rarity or norm' },
    { key: 'biography', reason: 'no event, job, body, age or relationship is stated about the reader' },
];
const kit = () => ({ pillar: 'cross-pillar', root: ROOT, planSource: 'cross-pillar.portrait', modelSource: 'cross-pillar.synthesis', forbidden: FORBIDDEN, group: 'cross-pillar:synthesis' });
/** An evidence id as a slot token (the foundation's ids may carry spaces or brackets). */
export const evidenceToken = (id) => id.replace(/[^A-Za-z0-9:_./@+#-]+/g, '-').replace(/^[^A-Za-z0-9]+/, '').replace(/-+$/, '');
/** The strongest, counted, non-suppressed evidence of a theme, heaviest first. */
export function themeEvidence(theme) {
    return theme.supportingEvidence.filter((w) => w.evidence.methodology !== 'suppressed')
        .sort((a, b) => b.countedWeight - a.countedWeight || a.evidence.id.localeCompare(b.evidence.id)).slice(0, EVIDENCE_PER_THEME);
}
const timeSensitive = (theme) => theme.supportingEvidence.some((w) => w.evidence.methodology === 'time-sensitive' && w.countedWeight > 0);
const SECTION_ID = {
    portrait: 'cross-pillar-portrait', drives: 'cross-pillar-drives', convergence: 'cross-pillar-habits', tensions: 'cross-pillar-tensions', practical: null, takeaways: null,
};
/** The intent of a cross-pillar portrait, from the synthesis and the portrait's own selection. */
export function buildCrossPillarReadingIntent(source, portrait, visibleTensions) {
    const config = kit();
    const propositions = [];
    const make = (spec) => { propositions.push(buildProposition(spec, config)); };
    const coverage = source.coverage;
    const precision = coverage.birthTimePrecision;
    const uncertain = coverage.birthTimeEstimated || precision !== 'exact';
    const condition = 'birth-time-estimated';
    const uncertainties = uncertain ? [condition] : [];
    if (uncertain) {
        make({
            id: 'time', frame: 'cross-pillar.birth-time', role: 'caveat', rank: 1, status: 'structural-observation', modality: 'tendency', path: 'coverage.birthTime', roots: [ROOT_TIME], conditions: [condition],
            meaningKey: `cross-pillar.birth-time:${coverage.birthTimeEstimated ? 'unknown' : precision}`,
            slots: { precision: coverage.birthTimeEstimated ? 'unknown' : precision, timeSensitiveEvidence: coverage.timeSensitiveEvidenceCount, suppressedEvidence: coverage.suppressedEvidenceCount, evidence: coverage.evidenceCount },
        });
    }
    coverage.pillarsMissing.forEach((pillar) => propositions.push(withheldNotice(config, `missing-${pillar}`, 'cross-pillar.missing-pillar', `${pillar} could not be calculated`, 'coverage.pillarsMissing')));
    const themeById = new Map([...source.themes, ...source.subThresholdThemes].map((t) => [t.id, t]));
    const claimOf = new Map((portrait?.claims ?? []).map((c) => [c.themeId, c.strength]));
    const sectionOfTheme = new Map();
    for (const s of portrait?.sections ?? [])
        if (s.id === 'portrait' || s.id === 'drives' || s.id === 'convergence')
            for (const id of s.themeIds)
                if (themeById.has(id) && !sectionOfTheme.has(id))
                    sectionOfTheme.set(id, s.id);
    const told = (portrait?.usedThemeIds ?? []).filter((id) => themeById.has(id));
    told.forEach((id, index) => {
        const theme = themeById.get(id);
        const strength = claimOf.get(id) ?? 'tentative';
        const dependent = timeSensitive(theme);
        make({
            id: `theme-${id}`, frame: `cross-pillar.theme.${theme.facet}`, role: index < 2 ? 'thesis' : 'support', rank: index === 0 ? 1 : index < 4 ? 2 : 3, status: 'symbolic-reading', modality: MODALITY_OF_EVIDENCE[strength],
            path: `themes.${id}`, meaningKey: `knowledge:cross-pillar:synthesis-theme:${id}:cross-pillar-theme`, conditions: dependent ? [condition] : [], ...(dependent ? { roots: [ROOT, ROOT_TIME] } : {}),
            independenceGroup: `cross-pillar:theme:${id}`,
            slots: {
                themeId: id, facet: theme.facet, kind: theme.kind, support: theme.support, claim: strength, section: sectionOfTheme.get(id) ?? 'portrait', distinctPillars: theme.distinctPillars, pillars: [...theme.contributingPillars],
                counterEvidence: theme.counterWeight > 0, cautious: theme.treatCautiously, timeSensitive: dependent, stances: theme.stances.map((s) => `${s.pillar}:${s.stance}`),
                evidence: themeEvidence(theme).map((w) => evidenceToken(w.evidence.id)),
            },
        });
    });
    const shown = visibleTensions.slice(0, VISIBLE_TENSIONS);
    shown.forEach((tension, index) => {
        make({
            id: `tension-${tension.axis}`, frame: `cross-pillar.tension.${tension.kind}`, role: 'tension', rank: index === 0 ? 1 : 2, status: 'symbolic-reading', modality: 'tentative', path: `tensions.${tension.axis}`,
            meaningKey: `knowledge:cross-pillar:synthesis-axis:${tension.axis}:cross-pillar-tension`, independenceGroup: `cross-pillar:tension:${tension.axis}`,
            slots: {
                axis: tension.axis, kind: tension.kind, balance: Math.round(tension.balance * 100) / 100, dominant: tension.dominantPole ?? null, lead: index === 0,
                poleA: tension.poleA.dimension, poleAPillars: tension.poleA.distinctPillars, poleB: tension.poleB.dimension, poleBPillars: tension.poleB.distinctPillars,
                evidenceA: tension.poleA.evidence.filter((w) => w.evidence.methodology !== 'suppressed').slice(0, 3).map((w) => evidenceToken(w.evidence.id)),
                evidenceB: tension.poleB.evidence.filter((w) => w.evidence.methodology !== 'suppressed').slice(0, 3).map((w) => evidenceToken(w.evidence.id)),
            },
        });
    });
    make({ id: 'limits', frame: 'cross-pillar.limits', role: 'caveat', rank: 3, status: 'structural-observation', modality: 'assert', path: 'coverage', meaningKey: 'cross-pillar.limits:not-measurement', slots: { systems: coverage.pillarsPresent.length } });
    if (told.length === 0)
        propositions.push(withheldNotice(config, 'no-cross-pillar-result', 'cross-pillar.no-result', 'the systems calculated give no pattern to read across', 'themes'));
    const ids = new Set(propositions.map((p) => p.id));
    const anchor = told.map((id) => themeById.get(id));
    const relations = shown.flatMap((tension, index) => {
        const target = anchor.find((t) => t.dimensions.includes(tension.poleA.dimension) || t.dimensions.includes(tension.poleB.dimension)) ?? anchor[0];
        return target && ids.has(`tension-${tension.axis}`) ? [relation(`rel-tension-${tension.axis}`, `tension-${tension.axis}`, `theme-${target.id}`, 'friction', tension.kind, 'cross-pillar', index === 0 ? 'defining' : 'notable')] : [];
    });
    const rel = relations.map((r) => r.id);
    const members = (kind) => told.filter((id) => (sectionOfTheme.get(id) ?? 'portrait') === kind).map((id) => `theme-${id}`);
    const tensionIds = shown.map((t) => `tension-${t.axis}`);
    const lead = tensionIds[0] ? [tensionIds[0]] : [];
    const sections = [
        section(ids, 'caveats', 'limit', ['time', ...coverage.pillarsMissing.map((p) => `missing-${p}`), 'no-cross-pillar-result'], [], [1, 3]),
        section(ids, SECTION_ID.portrait, 'ground', [...members('portrait'), ...lead], [], [3, 8], rel.slice(0, lead.length)),
        section(ids, SECTION_ID.drives, 'develop', members('drives'), members('portrait'), [1, 5]),
        section(ids, SECTION_ID.convergence, 'develop', members('convergence'), members('portrait'), [1, 5]),
        section(ids, SECTION_ID.tensions, 'tension', tensionIds.slice(1), members('portrait'), [1, 6], rel.slice(lead.length)),
        section(ids, 'cross-pillar-limits', 'limit', ['limits'], [], [1, 2]),
    ].filter((s) => s !== null);
    return sealPillarIntent({
        pillar: 'cross-pillar', kind: CROSS_PILLAR_KIND, engine: 'cross-pillar-synthesis', contentVersion: CROSS_PILLAR_CONTENT_VERSION, deck: 'knowledge:cross-pillar',
        propositions, relations, sections,
        takeaway: { act: 'none', target: null, relationTargets: [], grounding: 'none', relationMode: null, relationTarget: null, groundedIn: [], constraints: [], legacy: null },
        primary: told.slice(0, 2).map((id) => `theme-${id}`), central: rel[0] ?? null, uncertainties,
        withheld: [...WITHHELD, ...(coverage.suppressedEvidenceCount > 0 ? [{ key: 'suppressed-evidence', reason: `${coverage.suppressedEvidenceCount} results that only an invented birth time could produce are not carried` }] : [])],
        forbidden: FORBIDDEN,
        extension: { narrativeSections: sections.map((s) => s.id), claims: propositions.map((p) => p.id), themes: told.map((id) => slug(id)), source: { foundation: 'synthesis/foundation/crossPillarSynthesis', selection: 'synthesis-reading/humanPortrait', meanings: 'knowledge/cross-pillar + each placement\'s knowledge unit' } },
    });
}
/** The intent of the cross-pillar portrait of a synthesis, selecting exactly what the shipped portrait selects. */
export function crossPillarIntentOf(source) {
    return buildCrossPillarReadingIntent(source, buildHumanPortrait(source), rankTensions(source.tensions).slice(0, VISIBLE_TENSIONS));
}
