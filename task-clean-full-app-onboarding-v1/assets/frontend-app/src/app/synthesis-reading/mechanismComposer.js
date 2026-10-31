import { t, tf } from '../i18n/uiStrings.js?v=f9ab0a6';
import { contributionFor, contributionText } from './contributions.js?v=f9ab0a6';
import { factPhrase } from './factPhrasing.js?v=f9ab0a6';
import { axisMechanism } from './mechanismText.js?v=f9ab0a6';
import { bestRule } from './mechanismRules.js?v=f9ab0a6';
import { axisForDimension, dimensionFamily } from '../semantics/semanticTaxonomy.js?v=f9ab0a6';
const ts = (suffix) => t(`synthesis.compose.${suffix}`);
const tfs = (suffix, params) => tf(`synthesis.compose.${suffix}`, params);
const capitalise = (text) => text.charAt(0).toUpperCase() + text.slice(1);
/*
 * Mechanisms already spent in the reading being composed.
 *
 * Reset by the composer at the top of each pass, for the same reason the
 * interaction index is: this is one synchronous pass over one profile, and
 * threading a set through six call sites buys nothing. `emergentClause` does
 * NOT consume from it - the takeaways and the practical section deliberately
 * restate a mechanism the sections above established.
 */
let spentMechanisms = new Set();
/*
 * Contribution paragraphs already emitted in this reading.
 *
 * Two themes can legitimately rest on the same three results - `deep internal
 * processing` and `structured method` both lead on a Virgo Sun in the same
 * chart - and would then compose the identical paragraph. The second one
 * returns null instead, and the caller falls back to naming the results in a
 * list, which keeps them visible without printing the same sentences twice.
 */
let spentParagraphs = new Set();
/** Called once per composition. */
export function resetMechanismState() {
    spentMechanisms = new Set();
    spentParagraphs = new Set();
}
/**
 * Two to three results per side.
 *
 * The brief's own bound, and the right one: a paragraph naming eight results is
 * an evidence dump, and the rest of them are already in Technical details.
 * Ordered as `interactions.ts` ordered them, which is one per system first.
 */
function explain(side, limit = 3, skip = new Set()) {
    const out = [];
    /* Two positions can carry the same value - a Life Path 8 and an Expression 8
       - and would then contribute the identical sentence twice in one paragraph.
       The first one is kept and the block moves on to the next result. */
    const said = new Set();
    for (const evidence of side.facts) {
        /* Keyed on the SOURCE, not the evidence id: one placement produces a
           separate evidence row per dimension it speaks to, so `Life Path 7` has a
           different id under `analytical` than under `independent` and skipping by
           id would let the same result be explained twice in one portrait. */
        if (skip.has(sourceKey(evidence)))
            continue;
        const contribution = contributionFor(evidence);
        if (!contribution)
            continue;
        const text = contributionText(contribution);
        if (said.has(text))
            continue;
        said.add(text);
        out.push({
            evidence, phrase: factPhrase(evidence), contribution: text, tags: contribution.tags,
        });
        if (out.length >= limit)
            break;
    }
    return out;
}
/** One placement, however many dimensions it speaks to. */
export const sourceKey = (evidence) => `${evidence.pillar}:${evidence.sourceEntity}`;
/** `Sun in Virgo pushes toward refining the work.` - one result, one sentence. */
const sentenceFor = (item) => `${capitalise(item.phrase)} ${item.contribution}.`;
const tagsOf = (items) => items.flatMap((item) => [...item.tags]);
/*
 * THE AXIS A CONVERGENCE BELONGS TO.
 *
 * A tension carries its axis because it IS an axis - two poles of one. A
 * convergence carries a dimension instead, and the axis is one lookup away in
 * the taxonomy that already owns that relation. Deriving it rather than storing
 * a second copy keeps one answer to which axis a theme sits on.
 *
 * It is what keeps the closing sentence on the subject: the rule chosen has to
 * touch the theme's own axis, so a convergence about structure cannot be
 * explained by a clause about initiative. See bestRule's `strict`.
 */
const convergenceAxis = (interaction) => (interaction.axis ?? axisForDimension(interaction.sides[0].dimension)?.id);
/*
 * WHETHER AN EMERGENT SENTENCE MAY BE COMPOSED AT ALL.
 *
 * Every rule in mechanismRules is authored about two WAYS OF WORKING meeting:
 * what order they arrive in, which wins under pressure, what the pair produces.
 * The tags they match on come from the contribution lexicon, which is likewise
 * a lexicon of ways of working.
 *
 * A drive theme rests on results carrying those tags too - a seventh Life Path
 * is inward and solitary whatever theme it happens to support - so a rule
 * matched happily and the framing sentence then asserted the result as the
 * shared core of the WANT: `What they share is narrower than meaning and
 * purpose: working it out alone and presenting the conclusion rather than the
 * working.` Working alone is not what meaning and purpose narrows to, and the
 * takeaways printed the same mismatch directly under the theme's name.
 *
 * The contributions still print - they name real results and say what each
 * brings. A drive simply stops before a conclusion no authored rule stands
 * behind.
 */
function emergentAllowed(interaction) {
    const dimension = interaction.sides[0]?.dimension;
    return dimension !== undefined && dimensionFamily(dimension) === 'style';
}
/**
 * A convergence, explained.
 *
 * The results and what each brings, then - where a rule covers the meeting -
 * what the combination is that the theme label was too wide to say.
 */
export function reinforcementMechanism(interaction, themeLabel, skip = new Set()) {
    const items = explain(interaction.sides[0], 3, skip);
    if (items.length < 2)
        return null;
    const opening = items.map(sentenceFor).join(' ');
    if (spentParagraphs.has(opening))
        return null;
    spentParagraphs.add(opening);
    const paragraphs = [opening];
    const tags = tagsOf(items);
    /* The rule is looked for between DIFFERENT results, so a single result
       carrying two tags cannot produce a meeting on its own. */
    const first = items[0].tags;
    const rest = items.slice(1).flatMap((item) => [...item.tags]);
    const axis = convergenceAxis(interaction);
    const pole = interaction.sides[0].dimension;
    const match = emergentAllowed(interaction)
        ? bestRule(first, rest, 'reinforce', axis, spentMechanisms, true, pole)
            ?? bestRule(tags, tags, 'reinforce', axis, spentMechanisms, true, pole)
        : null;
    if (match) {
        spentMechanisms.add(match.text);
        paragraphs.push(tfs('mechanism.shared', {
            theme: themeLabel.toLowerCase(),
            emergent: match.text,
        }));
    }
    return {
        paragraphs,
        sources: items.map((item) => sourceKey(item.evidence)),
        rule: match ? `reinforce:${match.tags.join('+')}` : null,
    };
}
/**
 * A tension, explained.
 *
 * Both sides get their results and contributions, then the collision - what
 * order the two arrive in and what the second does to the first. Falls back to
 * the axis-level mechanism when no tag pair covers the meeting, so a reader
 * never meets a split with no account of what it produces.
 */
export function tensionMechanismBlock(interaction, skip = new Set()) {
    const heavier = explain(interaction.sides[0], 3, skip);
    const lighter = explain(interaction.sides[1], 3, skip);
    if (heavier.length === 0 || lighter.length === 0)
        return null;
    const opening = heavier.map(sentenceFor).join(' ');
    const answer = `${ts('mechanism.against')} ${lighter.map(sentenceFor).join(' ')}`;
    if (spentParagraphs.has(opening) || spentParagraphs.has(answer))
        return null;
    spentParagraphs.add(opening);
    spentParagraphs.add(answer);
    const paragraphs = [opening, answer];
    const match = bestRule(tagsOf(heavier), tagsOf(lighter), 'collide', interaction.axis, spentMechanisms);
    let rule = null;
    if (match) {
        spentMechanisms.add(match.text);
        paragraphs.push(match.text);
        rule = `collide:${match.tags.join('+')}`;
    }
    else if (interaction.axis) {
        const balanced = interaction.tensionKind === 'true-tension'
            && interaction.bothCorroborated === true;
        /* The axis fallback is shared by every axis in the same shape, so two
           lopsided splits in one chart would otherwise print it twice. */
        const fallback = axisMechanism(interaction.axis, balanced ? 'balanced' : 'lopsided');
        if (fallback && !spentMechanisms.has(fallback)) {
            spentMechanisms.add(fallback);
            paragraphs.push(fallback);
            rule = `axis:${interaction.axis}`;
        }
    }
    return {
        paragraphs,
        sources: [...heavier, ...lighter].map((item) => sourceKey(item.evidence)),
        rule,
    };
}
/** The emergent clause as a standalone sentence: capitalised, stop restored. */
export const asSentence = (clause) => {
    const text = capitalise(clause.trim());
    return /[.!?]$/.test(text) ? text : `${text}.`;
};
/** The first sentence only - for places that must not restate a whole block. */
export const firstSentence = (clause) => {
    const match = /^[^.!?]+[.!?]/.exec(clause.trim());
    return asSentence(match ? match[0] : clause);
};
/**
 * The one-sentence form, for the takeaways and the practical section.
 *
 * Returns the emergent clause alone - what the combination IS - without
 * re-listing the results, because both of those sections sit after the section
 * that already named them.
 */
export function emergentClause(interaction) {
    if (interaction.kind === 'tension') {
        const heavier = explain(interaction.sides[0]);
        const lighter = explain(interaction.sides[1]);
        if (heavier.length === 0 || lighter.length === 0)
            return null;
        return bestRule(tagsOf(heavier), tagsOf(lighter), 'collide', interaction.axis)?.text ?? null;
    }
    const items = explain(interaction.sides[0]);
    if (items.length < 2 || !emergentAllowed(interaction))
        return null;
    const first = items[0].tags;
    const rest = items.slice(1).flatMap((item) => [...item.tags]);
    /* The same axis requirement as the section above, for the same reason: the
       takeaways print this clause directly under the theme's name, which is the
       one place a mismatch is impossible to miss. */
    const axis = convergenceAxis(interaction);
    const pole = interaction.sides[0].dimension;
    const all = tagsOf(items);
    return (bestRule(first, rest, 'reinforce', axis, new Set(), true, pole)
        ?? bestRule(all, all, 'reinforce', axis, new Set(), true, pole))?.text ?? null;
}
