import { opposingDimension } from '../semantics/semanticTaxonomy.js?v=53c0693';
import { THEME_BASE_RATES } from './themeBaseRates.js?v=53c0693';
/*
 * WHICH THEMES THE PORTRAIT IS BUILT FROM.
 *
 * Salience answers `how much evidence is behind this`. That is the question
 * Technical details asks, and it is the right one there. It is not the question
 * a portrait asks, and using it as though it were produced a specific and
 * repeatable failure: the top of the reading filled with three themes that were
 * the same observation counted three ways.
 *
 * On the QA profile the top four by salience were structured method, deep
 * internal processing, mastery and depth, and wanting to understand - a person
 * who refines, thinks, goes deep and wants to know why. All four are supported.
 * Together they describe one facet of somebody four times and say nothing about
 * how they are with other people, what they make, or what they are after. Nine
 * further supported themes waited below, each adding a side the reader never
 * saw.
 *
 * So two numbers, not one.
 *
 *   SALIENCE           evidence strength. Unchanged, still the ranking in the
 *                      support table, still what the model means by confidence.
 *   PORTRAIT RELEVANCE what this theme is worth to a description of a person,
 *                      given what has already been said.
 *
 * Relevance is built from salience and then modified by three things salience
 * deliberately does not know about:
 *
 *   DIRECTNESS      how squarely the sources speak to the theme. A reading that
 *                   carries a dimension at 0.7 is making a claim about it; one
 *                   carrying it at 0.05 is brushing past it. Salience sums both
 *                   and a pile of glancing mentions can outweigh a direct
 *                   statement.
 *   SOURCE SPREAD   a small, separate credit for being visible in more than one
 *                   tradition. Salience already gives breadth a sub-linear
 *                   step; this is the portrait's own smaller interest in a
 *                   theme that is not one tradition's private opinion.
 *   NOVELTY         how much this theme adds to what has already been selected.
 *                   This is the part that does the real work, and it is applied
 *                   greedily: each pick discounts everything that resembles it.
 *
 * WHY THE SQUARE ROOT
 * Salience spans roughly 0.1 to 12 on a real chart. Untransformed, the leader
 * is a hundred times the tail and no diversity rule can survive contact with
 * that - the top three would always be the top three by weight. The square root
 * keeps the ORDER completely intact while compressing the gaps, so a theme half
 * as well evidenced starts at seven tenths of the relevance rather than a
 * quarter. Nothing is promoted; the distances are made small enough for the
 * other three terms to matter.
 *
 * WHY RESEMBLANCE IS MEASURED ON SOURCES
 * Two themes that rest on the same placements are one finding wearing two
 * labels, whatever the taxonomy calls them. On the QA profile `structured
 * method` and `deep internal processing` share three of their four sources -
 * a Virgo Sun, a seventh Life Path and a metal-heavy chart - and that overlap
 * is visible in the data without anybody having to write down that the two
 * concepts are neighbours. Dimension overlap is checked as well, for the
 * themes that reach the same conclusion from different results.
 *
 * NOTHING HERE IS A CATEGORY. There is no list of human dimensions the portrait
 * must fill and no theme is ever promoted for belonging to one. Diversity is
 * produced by penalising repetition, which is a property of the evidence rather
 * than a taxonomy somebody would have to maintain.
 */
/*
 * DISTINCTIVENESS - THE FOURTH TERM, AND THE ONE THAT STOPS EVERY PORTRAIT
 * OPENING THE SAME WAY.
 *
 * The three terms above were enough to stop a portrait repeating itself, and
 * not enough to stop three portraits resembling each other. On a reference
 * population of forty charts, `structured method` is a top-three theme for 31
 * of them, `steady endurance` for 27 and `independent direction` for 24: a
 * large share of the authored symbolism in all four traditions speaks to
 * method, persistence and self-direction, so almost every chart carries a lot
 * of evidence for them. Ranked on evidence alone, every reader is told first
 * what most charts look like.
 *
 * So the portrait also asks whether a theme is a larger part of THIS picture
 * than of a typical one: the theme's share of this chart's supporting evidence,
 * over its mean share across the reference population (`themeBaseRates`).
 * The ratio is clamped and square-rooted, so the factor runs from about 0.71
 * to 1.58 - enough to let a theme that is unusually prominent here compete
 * with one that is prominent everywhere, never enough to lift a thin one.
 *
 * `PORTRAIT_FLOOR` is the other half of that promise. The model reports a theme
 * from salience 0.6; the portrait only considers themes with real weight behind
 * them, so distinctiveness chooses among well-evidenced themes and cannot turn
 * a glancing mention into a headline.
 *
 * Salience itself is not touched. It is still the ranking in the support table
 * and still what the model means by confidence.
 */
const DISTINCT_MIN = 0.5;
const DISTINCT_MAX = 2.5;
const DISTINCT_POWER = 0.5;
export const PORTRAIT_FLOOR = 1;
/** How hard each additional near-duplicate is pushed down. */
const NOVELTY_STRENGTH = 0.85;
/** A theme is never discounted to nothing: even a restatement can be worth a line. */
const MIN_NOVELTY = 0.12;
/** The portrait's own interest in breadth, on top of salience's. */
const SPREAD_STEP = 0.08;
/** Source entities behind a theme, as `pillar:entity` - the placement, not the dimension. */
function sourcesOf(theme) {
    const out = new Set();
    for (const item of theme.supportingEvidence) {
        out.add(`${item.evidence.pillar}:${item.evidence.sourceEntity}`);
    }
    return out;
}
const dimensionsOf = (theme) => new Set(theme.dimensions);
/*
 * TWO HALVES OF A SPLIT ARE NOT TWO SIDES OF A PERSON.
 *
 * A chart can carry both poles of an axis, and one of the QA profiles does:
 * `Outward expression` and `Deep internal processing` both cleared the floor,
 * so the paragraph said `Saying a thing out loud is part of how you decide what
 * you think` and then `You work things out inwardly, well before you say
 * anything`, flat, in that order, as though they agreed.
 *
 * They do not, and something in the model already knows: an axis with weight on
 * both poles is what the tension layer is for, and it says so in a sentence
 * built to hold both at once. Stating them side by side in a list is the one
 * shape that makes a genuine finding read as a mistake.
 *
 * So an opposing pick counts as a full repetition. It is not excluded - a chart
 * really carrying both is entitled to have both reported - but it can no longer
 * land in the same breath as the pole it contradicts.
 */
function contradicts(left, right) {
    for (const dimension of left.dimensions) {
        const opposite = opposingDimension(dimension);
        if (opposite && right.dimensions.includes(opposite))
            return true;
    }
    return false;
}
function jaccard(left, right) {
    if (left.size === 0 || right.size === 0)
        return 0;
    let shared = 0;
    for (const item of left)
        if (right.has(item))
            shared += 1;
    return shared / (left.size + right.size - shared);
}
/**
 * How squarely the evidence speaks to the theme, 0 to 1.
 *
 * The weighted mean of the semantic magnitudes the knowledge layer authored,
 * weighted by what each item actually counted for. A theme built from one
 * `sig(mastery, 0.7)` scores far above one built from six readings that each
 * mention it at 0.05, even where the sums are equal.
 */
function directnessOf(theme) {
    let weighted = 0;
    let total = 0;
    for (const item of theme.supportingEvidence) {
        const counted = item.countedWeight;
        if (counted <= 0)
            continue;
        weighted += item.evidence.semanticWeight * counted;
        total += counted;
    }
    return total > 0 ? weighted / total : 0;
}
/** How much more of this picture the theme takes up than of a typical one. */
export function distinctivenessOf(theme, totalSupport) {
    const base = THEME_BASE_RATES[theme.id];
    if (!base || totalSupport <= 0)
        return 1;
    const share = theme.supportWeight / totalSupport;
    const ratio = Math.min(DISTINCT_MAX, Math.max(DISTINCT_MIN, share / base));
    return ratio ** DISTINCT_POWER;
}
/** Relevance before anything has been chosen. */
function baseRelevance(theme, distinctiveness) {
    if (theme.salience < PORTRAIT_FLOOR)
        return 0;
    const strength = Math.sqrt(theme.salience);
    const directness = 1 + directnessOf(theme);
    const spread = 1 + SPREAD_STEP * Math.max(0, theme.distinctPillars - 1);
    return strength * directness * spread * distinctiveness;
}
/**
 * Choose up to `limit` themes, greedily, preferring what has not been said.
 *
 * Deterministic: the base scores come from the model, the resemblance is a set
 * comparison, and every tie falls through to the theme id. Running it twice on
 * the same chart returns the same list in the same order, which a test asserts.
 */
export function selectForPortrait(themes, limit, 
/**
 * The chart's total supporting weight across EVERY theme it produced,
 * including the ones below the floor - the same denominator the base rates
 * were measured against. Defaults to the themes passed in.
 */
totalSupport) {
    const remaining = [...themes];
    const picked = [];
    const total = totalSupport
        ?? themes.reduce((running, theme) => running + theme.supportWeight, 0);
    while (picked.length < limit && remaining.length > 0) {
        let best = null;
        for (let index = 0; index < remaining.length; index += 1) {
            const theme = remaining[index];
            const distinctiveness = distinctivenessOf(theme, total);
            const base = baseRelevance(theme, distinctiveness);
            if (base <= 0)
                continue;
            const sources = sourcesOf(theme);
            const dimensions = dimensionsOf(theme);
            let resemblance = 0;
            for (const chosen of picked) {
                resemblance = Math.max(resemblance, contradicts(theme, chosen.theme) ? 1 : 0, jaccard(sources, sourcesOf(chosen.theme)), jaccard(dimensions, dimensionsOf(chosen.theme)));
            }
            const novelty = Math.max(MIN_NOVELTY, 1 - NOVELTY_STRENGTH * resemblance);
            const relevance = base * novelty;
            const better = best === null
                || relevance > best.pick.relevance + 1e-9
                || (Math.abs(relevance - best.pick.relevance) <= 1e-9
                    && theme.id.localeCompare(remaining[best.index].id) < 0);
            if (better) {
                best = {
                    index,
                    pick: { theme, salience: theme.salience, distinctiveness, relevance, resemblance },
                };
            }
        }
        if (!best)
            break;
        picked.push(best.pick);
        remaining.splice(best.index, 1);
    }
    return picked;
}
/**
 * Group the chosen themes into paragraphs.
 *
 * The brief for this layer is `let related themes interact in the same
 * paragraph` - depth beside mastery beside expression, autonomy beside
 * connection - and resemblance is already the measure of related. So the same
 * comparison that spreads the SELECTION across different sides of a person
 * gathers those sides back into paragraphs: a theme joins the open paragraph
 * when it resembles something in it, and starts a new one when it does not.
 *
 * Order within a paragraph is selection order, so each one opens on its
 * strongest member.
 */
const SAME_PARAGRAPH = 0.2;
export function groupIntoParagraphs(picks, maxPerParagraph = 3) {
    const groups = [];
    for (const pick of picks) {
        const home = groups.find((group) => group.length < maxPerParagraph
            && group.some((member) => Math.max(jaccard(sourcesOf(pick.theme), sourcesOf(member.theme)), jaccard(dimensionsOf(pick.theme), dimensionsOf(member.theme))) >= SAME_PARAGRAPH));
        if (home)
            home.push(pick);
        else
            groups.push([pick]);
    }
    return groups;
}
/** For the technical view: what the portrait thought of every theme it saw. */
export function explainSelection(synthesis, limit) {
    return selectForPortrait(synthesis.themes, limit).map((pick) => ({
        themeId: pick.theme.id,
        salience: Number(pick.salience.toFixed(4)),
        relevance: Number(pick.relevance.toFixed(4)),
        resemblance: Number(pick.resemblance.toFixed(4)),
    }));
}
