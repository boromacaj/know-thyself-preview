import { t, tf } from '../i18n/uiStrings.js?v=2ea79e9';
import { axisForDimension } from '../semantics/semanticTaxonomy.js?v=2ea79e9';
import { CONTESTED_COUNTER_RATIO, STRONG_PILLAR_REQUIREMENT } from '../synthesis/foundation/themeClustering.js?v=2ea79e9';
import { selectForPortrait } from './portraitSelection.js?v=2ea79e9';
import { FUSION_HEADS, FUSION_QUALIFIERS, areaClause, areaClauseOrder, balanceGist, contextualCost, contextualGloss, contextualPart, contextualTension, fusionOf, hypotheticalFor, say, themeGist, themeParts, } from './themeVoice.js?v=2ea79e9';
/*
 * THE READING A PERSON MEETS.
 *
 * This is the only layer that talks, and it works under one rule: it may phrase
 * conclusions the model reached and it may not reach any of its own. Every word
 * it emits is an authored part - a phrase from `themeVoice`, a frame from the
 * string table - looked up by what the model selected. There is no branch in
 * here that writes a claim.
 *
 * THREE JOBS, KEPT APART
 *   SELECTION   `portraitSelection` decides which themes matter: evidence,
 *               directness, distinctiveness against a typical chart, and
 *               novelty against what is already chosen.
 *   COMPOSITION this file decides which chosen themes share a sentence, which
 *               section each idea belongs to, how firmly each is said, and what
 *               gets said only once.
 *   RENDERING   the parts and frames decide the words.
 * A selection problem is never fixed here with wording, and a wording problem is
 * never fixed by changing what the model found.
 *
 * SAID ONCE
 * Every theme is explained in exactly one place: the opening, or one of the two
 * sections under it. A theme's cost can follow later, because a cost is new
 * information about something already said. The close and the area notes come
 * back to patterns the reader has met, in new words and never as a list of
 * handles, and neither repeats a pattern the other already carries.
 *
 * AS SURE AS THE EVIDENCE, AND NO SURER
 * How firmly a sentence speaks follows how many independent traditions agree,
 * not the family a theme belongs to. A pattern three or more traditions carry
 * is said plainly - `You need`, `You tend to`. One that two traditions carry,
 * or that has an opposite the reading does not voice, or that rests noticeably
 * on time-sensitive results, is said one step less certainly - `You seem to`,
 * `are likely to`. One that rests on a single tradition, or on very little,
 * never joins a list: it is said on its own, as a weaker pull. No number
 * reaches the reader; the grammar carries it.
 */
const tfs = (suffix, params) => tf(`synthesis.compose.${suffix}`, params);
/** Themes the whole reading draws on. */
const PORTRAIT_THEMES = 8;
/** Items in the opening's list of needs, after any fusion. */
const OPENING_NEEDS = 3;
/** Habits in the opening's second sentence. */
const OPENING_ACTS = 2;
/** Items in each follow-on list. */
const MORE_NEEDS = 3;
const MORE_ACTS = 2;
/** Costs said in the reading - enough to be honest, not so many it reads as a warning label. */
const COSTS = 2;
/** Splits worth a reader's attention, the first of them in the opening. */
const VISIBLE_TENSIONS = 3;
/** Area notes, and the conditions one of them can hold. */
const AREA_LINES = 2;
const AREA_CLAUSES = 3;
/** Weaker pulls said together in one sentence. */
const TENTATIVE_ITEMS = 2;
/**
 * Illustrations in a whole reading. The brief allows two; one keeps them the
 * exception they have to be, and a reading is complete without any.
 */
const HYPOTHETICALS = 1;
/**
 * The share of a pattern's evidence that may rest on time-sensitive results -
 * a Moon near a sign boundary, a missing hour pillar - before it is said one
 * step less firmly. A third: enough that the uncertain part could change what
 * the pattern amounts to.
 */
const TIME_SENSITIVE_SHARE = 0.35;
const PILLAR_ORDER = ['numerology', 'astrology', 'bazi', 'human-design'];
function pillarsOf(themes) {
    const seen = new Set();
    for (const theme of themes)
        for (const pillar of theme.contributingPillars)
            seen.add(pillar);
    return PILLAR_ORDER.filter((pillar) => seen.has(pillar));
}
/* The reading's own list joiner, which carries its spacing inside the string
   because Slovak sets it differently. Clauses - the habit phrases, which are
   whole verb phrases and often carry an `and` of their own - get a comma before
   the last join, so `settle a question privately and explain it afterwards and
   take something apart` cannot happen. */
function sentenceList(items, clauses = false) {
    const clean = items.filter((item) => item.length > 0);
    if (clean.length === 0)
        return '';
    if (clean.length === 1)
        return clean[0];
    /* An item that carries its own comma - a Slovak relative clause, `výsledok,
       ktorý môžu vidieť aj druhí` - has to be closed by one before the next item
       begins, in the same way a clause is. Only the item right before the last
       join matters: every earlier one is already closed by the list's own commas. */
    const closed = clean[clean.length - 2].includes(',');
    const last = clauses || closed ? t('reading.list.andClause') : t('reading.list.and');
    return `${clean.slice(0, -1).join(', ')}${last}${clean[clean.length - 1]}`;
}
const byDistinctiveness = (left, right) => right.distinctiveness - left.distinctiveness
    || right.relevance - left.relevance || left.theme.id.localeCompare(right.theme.id);
/* --------------------------------------------------------------- strength */
function timeSensitiveShare(evidence) {
    let all = 0;
    let sensitive = 0;
    for (const item of evidence) {
        all += item.countedWeight;
        if (item.evidence.methodology === 'time-sensitive')
            sensitive += item.countedWeight;
    }
    return all > 0 ? sensitive / all : 0;
}
/*
 * HOW FIRMLY A PATTERN MAY BE SAID.
 *
 *   firm       three or more independent traditions agree.
 *   moderate   two agree - or three do, but the pattern has an opposite the
 *              reading does not voice, or leans on time-sensitive results.
 *   tentative  the model's `weak` or `single-system` support. Never in a list.
 *
 * BREADTH, NOT WEIGHT, SETS THE CERTAINTY. The model's `strong` also asks for
 * heavy evidence, and drives are carried by lighter readings than operating
 * styles are - so read as `strong or not`, nearly half of all portraits opened
 * on `You seem to`, including patterns four traditions agree on. How heavily a
 * tradition speaks already decides whether a pattern is chosen and where it
 * stands; how many traditions independently say it decides how sure the
 * sentence is allowed to sound.
 *
 * AN OPPOSITE THE READING SAYS IS NOT A WEAKNESS. `You need your own direction`
 * followed by `and so does real exchange with other people` is not an
 * overstatement; the same claim with the opposition left unsaid would be.
 *
 * AN ESTIMATED TIME IS NEVER AS CERTAIN AS A KNOWN ONE. A pattern that leans
 * noticeably on time-sensitive results is said one step less firmly.
 */
export function claimStrength(theme, voicedAxes) {
    if (theme.support !== 'strong' && theme.support !== 'moderate')
        return 'tentative';
    const contested = theme.supportWeight > 0
        && theme.counterWeight / theme.supportWeight > CONTESTED_COUNTER_RATIO;
    const oppositionSaid = theme.unresolvedTensions.some((axis) => voicedAxes.has(axis));
    if (theme.distinctPillars < STRONG_PILLAR_REQUIREMENT || (contested && !oppositionSaid)) {
        return 'moderate';
    }
    return timeSensitiveShare(theme.supportingEvidence) >= TIME_SENSITIVE_SHARE ? 'moderate' : 'firm';
}
const STRENGTH_RANK = { firm: 2, moderate: 1, tentative: 0 };
const weaker = (left, right) => STRENGTH_RANK[left] <= STRENGTH_RANK[right] ? left : right;
const soft = (strength) => (strength === 'firm' ? '' : '.soft');
/*
 * A LIST OF NEEDS OR HABITS, WITH ONE FUSION AT MOST.
 *
 * Members are taken in portrait order, which already weighs evidence,
 * distinctiveness and novelty. If the members include a head (understanding,
 * making, results) and a qualifier (a standard, a purpose, being seen, craft),
 * the strongest head and the MOST DISTINCTIVE qualifier become one phrase and
 * the freed place goes to the next theme waiting. Most distinctive, because the
 * fusion is the sentence that says what is particular about this want, and the
 * qualifier that is unusually strong here says more than the one every chart
 * has.
 *
 * The pool holds no tentative theme: a pattern resting on one tradition cannot
 * fuse into a firmer want and borrow its certainty.
 *
 * One fusion per list: two in a sentence stops reading as a person and starts
 * reading as a grammar.
 */
function buildList(pool, size, used, form, strengthOf, 
/* Whether a fusion's freed place is given to the next theme. Not in the
   opening: a fused phrase already carries two themes, and an opening that
   then takes a third and fourth is where every portrait started sharing
   `something tangible to leave behind`. */
refill = true, 
/*
 * The family the list's FIRST item is coloured by. Null for a list of wants,
 * whose first item is the subject and keeps its own phrase. For a list of
 * habits it is the family of the portrait's central want, so the leading
 * habit is described in the light of what the reading is mainly about -
 * method in a portrait led by making reads `build something up step by step
 * until it holds`, in one led by freedom `work out a method of your own before
 * you take on anyone else's`. The rest of the list takes its colour from that
 * first item, as a want list does.
 */
leadContext = null) {
    const waiting = pool.filter((pick) => !used.has(pick.theme.id));
    const members = waiting.slice(0, size);
    let fusedHead = null;
    let fusedQualifier = null;
    if (form === 'need') {
        const head = members.find((pick) => FUSION_HEADS.includes(pick.theme.id));
        const qualifiers = members
            .filter((pick) => FUSION_QUALIFIERS.includes(pick.theme.id))
            .sort(byDistinctiveness);
        if (head && qualifiers[0] && fusionOf(head.theme.id, qualifiers[0].theme.id)) {
            fusedHead = head;
            fusedQualifier = qualifiers[0];
            const next = refill
                ? waiting.slice(size).find((pick) => pick !== head && pick !== qualifiers[0])
                : undefined;
            if (next)
                members.push(next);
        }
    }
    const items = [];
    /* The first item decides what the sentence is mainly about; the themes that
       recur in almost every portrait take their phrase from it. */
    const lead = members.find((pick) => pick !== fusedQualifier);
    const leadFamily = lead ? themeParts(lead.theme.id)?.family ?? null : null;
    for (const pick of members) {
        if (pick === fusedQualifier)
            continue;
        const parts = themeParts(pick.theme.id);
        if (!parts)
            continue;
        if (pick === fusedHead && fusedQualifier) {
            items.push({
                text: say(fusionOf(pick.theme.id, fusedQualifier.theme.id)),
                themes: [pick.theme, fusedQualifier.theme],
                family: parts.family,
                strength: weaker(strengthOf(pick.theme), strengthOf(fusedQualifier.theme)),
            });
        }
        else {
            items.push({
                text: contextualPart(pick.theme.id, form, pick === lead ? leadContext : leadFamily),
                themes: [pick.theme],
                family: parts.family,
                strength: strengthOf(pick.theme),
            });
        }
    }
    for (const item of items)
        for (const theme of item.themes)
            used.add(theme.id);
    return items;
}
const idsOf = (items) => items.flatMap((item) => item.themes.map((theme) => theme.id));
const themesOf = (items) => items.flatMap((item) => [...item.themes]);
/*
 * THE FRAME FOLLOWS THE CONTENT, AND THE CERTAINTY FOLLOWS THE EVIDENCE.
 *
 * The family of the first item picks the frame's shape: a reading led by a
 * freedom theme opens `You need ...`, one led by a making theme `You want ...`.
 * The first item's strength picks how sure the frame sounds. A list takes its
 * strength from the pattern it leads with - its other members all rest on two
 * or more traditions, because a thinner one is never in a list at all.
 */
function listSentence(kind, items) {
    if (items.length === 0)
        return '';
    const clauses = kind === 'act' || kind === 'actAlso';
    /* One want on its own is said differently from several: `More than anything,
       you need ...` rather than a list of one. The opening lists vary in length
       with the evidence, so this also splits the frames every portrait with the
       same leading family would otherwise share. */
    const fused = items.some((item) => item.themes.length > 1);
    const variant = kind !== 'need' ? '' : items.length === 1 ? '.one' : fused ? '.fused' : '';
    return tfs(`human.${kind}${variant}.${items[0].family}${soft(items[0].strength)}`, {
        list: sentenceList(items.map((item) => item.text), clauses),
    });
}
/*
 * TWO HABITS SHARE A FRAME ONLY WHEN THE FRAME FITS BOTH.
 *
 * `Your way of working is to build something up step by step, and notice how
 * the people around you are doing before you get to work` is what happened
 * when a sensitivity rode in a frame written for a method: the frame bent the
 * second habit into a behaviour nobody's evidence described. `You tend to`
 * fits any habit; the others fit their own family and its neighbours. A habit
 * the lead's frame does not fit is said in a sentence of its own.
 */
const SHARES_FRAME = {
    depth: ['depth', 'freedom', 'making', 'people', 'method'],
    method: ['method', 'making', 'depth'],
    making: ['making', 'method', 'depth'],
    freedom: ['freedom', 'depth', 'method'],
    people: ['people', 'depth'],
};
function actSentences(kind, items) {
    if (items.length === 0)
        return [];
    const [lead, ...rest] = items;
    const together = [lead, ...rest.filter((item) => SHARES_FRAME[lead.family].includes(item.family))];
    const apart = rest.filter((item) => !together.includes(item));
    return [
        listSentence(kind, together),
        ...apart.map((item) => tfs(`human.actToo${soft(item.strength)}`, { list: item.text })),
    ];
}
/*
 * A WEAKER PULL, SAID AS ONE.
 *
 * A pattern resting on one tradition, or on very little, is still part of the
 * portrait - but as what it is. It gets its own sentence, in words that say it
 * is the weaker side of the reading, and it never borrows the certainty of a
 * list or a fusion. When every such want rests on a single tradition the
 * sentence says exactly that: one side of the reading points to it.
 */
function tentativeSentence(form, picks) {
    const chosen = picks.slice(0, TENTATIVE_ITEMS);
    if (chosen.length === 0)
        return '';
    const list = sentenceList(chosen.map((pick) => contextualPart(pick.theme.id, form, null)), true);
    if (form === 'act')
        return tfs('human.tentative.act', { list });
    const single = chosen.every((pick) => pick.theme.support === 'single-system');
    return tfs(single ? 'human.tentative.needSingle' : 'human.tentative.need', { list });
}
/* --------------------------------------------------------------- tensions */
/*
 * WHICH SPLIT MATTERS MOST.
 *
 * The model's order is not the portrait's. A split whose lighter side rests on
 * one tradition is real but thin, and leading a portrait with it spends the
 * reader's attention on the least certain thing the model found. Importance
 * here weighs the tension class, how evenly the two sides are matched, whether
 * both sides are carried by more than one tradition, and how much evidence is
 * at stake - all four the model's own numbers.
 */
function tensionImportance(tension) {
    const lighter = tension.poleA.weight <= tension.poleB.weight ? tension.poleA : tension.poleB;
    const kind = tension.kind === 'true-tension' ? 2 : 1;
    const corroborated = lighter.distinctPillars >= 2 ? 1 : 0.5;
    const stake = Math.sqrt(tension.poleA.weight + tension.poleB.weight);
    return kind * (0.5 + tension.balance) * corroborated * stake;
}
export function rankTensions(tensions) {
    return tensions
        .filter((tension) => tension.kind !== 'weak-conflict')
        .map((tension) => ({ tension, score: tensionImportance(tension) }))
        .sort((left, right) => right.score - left.score
        || left.tension.axis.localeCompare(right.tension.axis))
        .map((entry) => entry.tension);
}
/* Both sides strong with no winner, or one side usually ahead - in the axis's
   own pole order, which is the order the tension sentences are written in. */
function shapeOf(tension, axis) {
    const first = tension.dominantPole === axis.poles[0];
    return tension.dominantPole === null ? 'both'
        : tension.kind === 'true-tension' ? (first ? 'bothA' : 'bothB')
            : first ? 'a' : 'b';
}
const sitsOn = (theme, axisId) => theme.dimensions.some((dimension) => axisForDimension(dimension)?.id === axisId);
/*
 * WHEN A SPLIT MAY BE PICTURED.
 *
 * An illustration pictures two sides at work against each other, so it is
 * only honest where the split is close to even - the two within about a sixth
 * of each other, each resting on more than one tradition, neither leaning on
 * time-sensitive results. That is also where a split is hardest to recognise
 * from its sentence alone (`which one wins depends on ...`). On a lopsided
 * split the lighter side is a qualification, and a picture would make it look
 * as large as the side it qualifies. On the reference charts this puts one
 * illustration in about half the readings and none in the rest.
 */
const ILLUSTRATION_BALANCE = 0.85;
function mayIllustrate(tension) {
    return tension.balance >= ILLUSTRATION_BALANCE
        && [tension.poleA, tension.poleB].every((side) => side.distinctPillars >= 2
            && timeSensitiveShare(side.evidence) < TIME_SENSITIVE_SHARE);
}
/* ------------------------------------------------------------------ areas */
/*
 * THE AREAS WORTH A SENTENCE.
 *
 * Concrete parts of a life, where applying a pattern the reader has already met
 * says something new: where it shows up, and what it needs there. The abstract
 * domains - identity, the inner world, growth - are left to the domain index,
 * because `your inner world is about working things out inwardly` restates
 * rather than locates. And a domain is never evidence on its own: a line
 * appears only when two or more patterns ALREADY explained file there, and it
 * says what those patterns need there together and nothing else.
 */
const AREAS = ['work-career', 'relationships', 'decision-making', 'communication', 'money-material'];
/* ------------------------------------------------------------------------ */
export function buildHumanPortrait(source) {
    /* A cross-pillar reading needs something to read across. The composer
       applies the same rule to its own sections; it has to hold here too, because
       this function is handed the raw model. */
    if (source.coverage.pillarsPresent.length < 2)
        return null;
    /* A theme its own counter-evidence outweighs is not a finding about anybody.
       It stays in the ranked table. */
    const reportable = source.themes.filter((theme) => theme.counterWeight <= theme.supportWeight);
    const totalSupport = [...source.themes, ...source.subThresholdThemes]
        .reduce((running, theme) => running + theme.supportWeight, 0);
    const picks = selectForPortrait(reportable, PORTRAIT_THEMES, totalSupport);
    if (picks.length === 0)
        return null;
    const tensions = rankTensions(source.tensions).slice(0, VISIBLE_TENSIONS);
    const voicedAxes = new Set(tensions.map((tension) => tension.axis));
    const strengths = new Map(picks.map((pick) => [pick.theme.id, claimStrength(pick.theme, voicedAxes)]));
    const strengthOf = (theme) => strengths.get(theme.id) ?? claimStrength(theme, voicedAxes);
    const prefers = (pick) => themeParts(pick.theme.id)?.prefers ?? (pick.theme.facet === 'drive' ? 'need' : 'act');
    const listed = picks.filter((pick) => strengthOf(pick.theme) !== 'tentative');
    const needPool = listed.filter((pick) => prefers(pick) === 'need');
    const actPool = listed.filter((pick) => prefers(pick) === 'act');
    const weakNeeds = picks.filter((pick) => strengthOf(pick.theme) === 'tentative' && prefers(pick) === 'need');
    const weakActs = picks.filter((pick) => strengthOf(pick.theme) === 'tentative' && prefers(pick) === 'act');
    const used = new Set();
    const sections = [];
    const hypotheticals = [];
    /* ------------------------------------------------------------ opening -- */
    /*
     * WHAT YOU NEED, HOW YOU GO ABOUT IT, AND WHERE IT PULLS.
     *
     * Three sentences, in the order a person would explain somebody: the central
     * want, how it tends to be acted on, and the complication. The split goes
     * here rather than being saved for later, because a portrait that opens on
     * agreement and holds the contradiction back until the fourth screen is
     * selling rather than describing.
     */
    const openNeeds = buildList(needPool, OPENING_NEEDS, used, 'need', strengthOf, false);
    const centralFamily = openNeeds[0]?.family ?? null;
    const openActs = buildList(actPool, OPENING_ACTS, used, 'act', strengthOf, true, centralFamily);
    const leadTension = tensions[0];
    const leadAxis = (leadTension && axisForDimension(leadTension.poleA.dimension)) || undefined;
    const leadShape = leadTension && leadAxis ? shapeOf(leadTension, leadAxis) : null;
    const shownIds = () => new Set(used);
    const tensionText = (tension) => {
        const axis = axisForDimension(tension.poleA.dimension);
        return axis ? contextualTension(axis.id, shapeOf(tension, axis), centralFamily, shownIds()) : '';
    };
    const openingSentences = [
        listSentence('need', openNeeds),
        ...glossFor(openNeeds, centralFamily),
        ...actSentences('act', openActs),
        leadTension ? tensionText(leadTension) : '',
    ].filter((sentence) => sentence.length > 0);
    const openingThemes = [...themesOf(openNeeds), ...themesOf(openActs)];
    sections.push({
        id: 'portrait',
        paragraphs: [{
                text: openingSentences.join(' '),
                voiceOf: [...idsOf(openNeeds), ...idsOf(openActs), ...(leadTension ? [leadTension.axis] : [])],
            }],
        sources: pillarsOf(openingThemes),
        themeIds: idsOf([...openNeeds, ...openActs]),
    });
    /* --------------------------------------------------- what else matters -- */
    const moreNeeds = buildList(needPool, MORE_NEEDS, used, 'need', strengthOf);
    const weakerWants = weakNeeds.slice(0, TENTATIVE_ITEMS);
    for (const pick of weakerWants)
        used.add(pick.theme.id);
    if (moreNeeds.length > 0 || weakerWants.length > 0) {
        const drivesIds = [...idsOf(moreNeeds), ...weakerWants.map((pick) => pick.theme.id)];
        sections.push({
            id: 'drives',
            paragraphs: [{
                    /* The second list of wants does not repeat the verb the first one used:
                       `You want ...` followed by `Alongside that, you want ...` is the echo a
                       reader hears as a template. */
                    text: [
                        listSentence(moreNeeds[0]?.family === openNeeds[0]?.family ? 'needAlso2' : 'needAlso', moreNeeds),
                        ...glossFor(moreNeeds, centralFamily),
                        tentativeSentence('need', weakerWants),
                    ].filter((sentence) => sentence.length > 0).join(' '),
                    voiceOf: drivesIds,
                }],
            sources: pillarsOf([...themesOf(moreNeeds), ...weakerWants.map((pick) => pick.theme)]),
            themeIds: drivesIds,
        });
    }
    /* ------------------------------------------------- how it plays out -- */
    /*
     * The habits not yet said, and then what the central pattern COSTS. The
     * costs are chosen from everything already explained - one operating habit,
     * one want - because a cost is new information about something the reader
     * has met, and the costs of the patterns that lead the portrait are the ones
     * worth their space. Proportionate, not dramatised: two sentences, and never
     * the cost of a pattern the reading could only call a weaker pull.
     */
    const moreActs = buildList(actPool, MORE_ACTS, used, 'act', strengthOf, true, centralFamily);
    const weakerHabits = weakActs.slice(0, TENTATIVE_ITEMS);
    for (const pick of weakerHabits)
        used.add(pick.theme.id);
    const shown = picks.filter((pick) => used.has(pick.theme.id));
    const costs = costsFor(shown, openActs[0]?.themes[0], centralFamily, strengthOf);
    const playsOut = [
        ...actSentences('actAlso', moreActs),
        tentativeSentence('act', weakerHabits),
        ...costs.map((cost) => cost.text),
    ].filter((sentence) => sentence.length > 0);
    if (playsOut.length > 0) {
        sections.push({
            id: 'convergence',
            paragraphs: [{
                    text: playsOut.join(' '),
                    voiceOf: [...idsOf(moreActs), ...weakerHabits.map((pick) => pick.theme.id),
                        ...costs.map((cost) => cost.themeId)],
                }],
            sources: pillarsOf([...themesOf(moreActs), ...weakerHabits.map((pick) => pick.theme)]),
            themeIds: [...idsOf(moreActs), ...weakerHabits.map((pick) => pick.theme.id)],
        });
    }
    /* ---------------------------------------------------------- tensions -- */
    /*
     * The splits after the first, each in its own shape. The first of them that
     * can be pictured honestly carries the reading's one illustration, directly
     * after the finding it illustrates.
     */
    const further = tensions.slice(1).map((tension) => {
        const text = tensionText(tension);
        const axis = axisForDimension(tension.poleA.dimension);
        let example = '';
        if (text && axis && hypotheticals.length < HYPOTHETICALS && mayIllustrate(tension)) {
            example = hypotheticalFor(axis.id, shapeOf(tension, axis));
            if (example)
                hypotheticals.push({ text: example, voiceOf: [tension.axis], sectionId: 'tensions' });
        }
        return { text: [text, example].filter((part) => part.length > 0).join(' '), voiceOf: [tension.axis] };
    }).filter((paragraph) => paragraph.text.length > 0);
    if (further.length > 0) {
        sections.push({
            id: 'tensions',
            paragraphs: further,
            sources: [],
            themeIds: tensions.slice(1).map((tension) => tension.axis),
        });
    }
    /* ---------------------------------------------------- the close, first -- */
    /*
     * CHOSEN BEFORE THE AREA NOTES, THOUGH IT RENDERS AFTER THEM.
     *
     * Both come back to patterns the reader has met, and neither should carry
     * what the other already does. The close is the line a reader keeps, so it
     * chooses first; the area notes work with what it leaves.
     */
    const readingOrder = [
        ...themesOf(openNeeds), ...themesOf(openActs), ...themesOf(moreNeeds), ...themesOf(moreActs),
    ].map((theme) => shown.find((pick) => pick.theme.id === theme.id))
        .filter((pick) => pick !== undefined);
    const close = closingSynthesis(readingOrder, leadTension, leadAxis, leadShape, strengthOf);
    const handled = new Set(close?.themeIds ?? []);
    /* ------------------------------------------------------------- areas -- */
    /*
     * WHAT THE PATTERNS NEED, TOGETHER, IN ONE PART OF A LIFE.
     *
     * Up to three patterns the reader has already met, said as the conditions
     * under which they work well in that area - `when you can set the method
     * yourself, take the time to get it right and see the finished thing in front
     * of you`. Never a pattern the close carries, never one on the split the
     * reading led with (the opening and the close both say that one already),
     * and never a weaker pull: `you do best when` is a claim.
     */
    const areaLines = [];
    const domainById = new Map(source.domains.map((domain) => [domain.id, domain]));
    for (const area of AREAS) {
        if (areaLines.length >= AREA_LINES)
            break;
        const domain = domainById.get(area);
        if (!domain)
            continue;
        const members = new Set(domain.themes.map((theme) => theme.id));
        const order = areaClauseOrder(area);
        const chosen = shown
            .filter((pick) => members.has(pick.theme.id) && order.includes(pick.theme.id)
            && !handled.has(pick.theme.id) && strengthOf(pick.theme) !== 'tentative'
            && !(leadAxis && sitsOn(pick.theme, leadAxis.id)))
            .slice(0, AREA_CLAUSES)
            .sort((left, right) => order.indexOf(left.theme.id) - order.indexOf(right.theme.id));
        if (chosen.length < 2)
            continue;
        const afterMethod = chosen.some((pick) => pick.theme.id === 'structured-method');
        const clauses = chosen.map((pick) => areaClause(area, pick.theme.id, { family: centralFamily, afterMethod }));
        const strength = chosen.map((pick) => strengthOf(pick.theme)).reduce(weaker);
        for (const pick of chosen)
            handled.add(pick.theme.id);
        areaLines.push({
            text: tfs(`human.life.${area}${soft(strength)}`, { list: sentenceList(clauses) }),
            voiceOf: chosen.map((pick) => pick.theme.id),
        });
    }
    if (areaLines.length > 0) {
        sections.push({
            id: 'practical',
            paragraphs: areaLines,
            sources: [],
            themeIds: areaLines.flatMap((line) => line.voiceOf),
        });
    }
    /* ---------------------------------------------------------- in short -- */
    if (close) {
        sections.push({
            id: 'takeaways',
            paragraphs: [{ text: close.text, voiceOf: close.voiceOf }],
            sources: [],
            themeIds: close.voiceOf,
        });
    }
    const hook = openingSentences[0] ?? '';
    return {
        hook,
        sections,
        usedThemeIds: shown.map((pick) => pick.theme.id),
        claims: shown.map((pick) => ({ themeId: pick.theme.id, strength: strengthOf(pick.theme) })),
        hypotheticals,
    };
}
/* ------------------------------------------------------------- helpers -- */
/*
 * WHAT A PATTERN IS NOT, SAID WHERE IT IS FIRST MET.
 *
 * Three themes carry a clarification rather than a cost - that making does not
 * have to mean art, that needing to be seen is not vanity,
 * that belonging is not sociability - and those are the most important thing
 * to say about them, because they are the three most easily over-read. One per
 * list, right after the sentence that introduced it, in the light of its
 * pairing or of the portrait's central want.
 */
function glossFor(items, centralFamily) {
    for (const item of items) {
        for (const theme of item.themes) {
            if (themeParts(theme.id)?.turnKind !== 'gloss')
                continue;
            const partner = item.themes.find((other) => other.id !== theme.id);
            const gloss = contextualGloss(theme.id, partner?.id ?? null, centralFamily);
            if (gloss)
                return [gloss];
        }
    }
    return [];
}
/*
 * WHAT IT COSTS: THE CENTRAL HABIT, AND THE MOST TELLING WANT.
 *
 * The habit that leads the opening, because it is the one the reader has just
 * been told is how they work. Then the want that is most unusual in this chart
 * rather than the strongest one, because the strongest wants are the ones many
 * charts share and their costs would be the same sentence in every reading.
 * Every cost is worded as what CAN or TENDS TO happen, which is as far as a
 * symbolic reading can see; a pattern the reading could only call a weaker
 * pull has no cost said about it at all.
 */
function costsFor(shown, centralHabit, centralFamily, strengthOf) {
    const costly = shown.filter((pick) => themeParts(pick.theme.id)?.turnKind === 'cost'
        && strengthOf(pick.theme) !== 'tentative');
    const habit = costly.find((pick) => pick.theme.id === centralHabit?.id)
        ?? costly.find((pick) => pick.theme.facet === 'style');
    const want = [...costly.filter((pick) => pick.theme.facet === 'drive' && pick !== habit)]
        .sort(byDistinctiveness)[0];
    const chosen = [habit, want, ...costly]
        .filter((pick) => pick !== undefined)
        .filter((pick, index, all) => all.indexOf(pick) === index)
        .slice(0, COSTS);
    return chosen
        .map((pick) => ({ text: contextualCost(pick.theme.id, centralFamily), themeId: pick.theme.id }))
        .filter((cost) => cost.text.length > 0);
}
/*
 * IN SHORT: THE WHOLE READING AS ONE NEED.
 *
 * Not a third list of handles. Three things a person needs, said in words the
 * reading has not used yet: the want the reading is centred on, the leading
 * split as something that needs both of its sides, and one pattern of the
 * other kind - a habit beside a want, a want beside a habit - chosen for being
 * unusual in this chart rather than common to all of them. A pattern on the
 * leading split is left to the split, which already says it. The frame takes
 * the central want's family and strength, as every list does.
 */
function closingSynthesis(readingOrder, leadTension, leadAxis, leadShape, strengthOf) {
    const balance = leadAxis && leadShape ? balanceGist(leadAxis.id, leadShape) : '';
    const eligible = readingOrder.filter((pick) => strengthOf(pick.theme) !== 'tentative'
        && themeGist(pick.theme.id).length > 0 && !(leadAxis && sitsOn(pick.theme, leadAxis.id)));
    const want = eligible.find((pick) => themeParts(pick.theme.id)?.prefers === 'need') ?? eligible[0];
    if (!want)
        return null;
    const otherFacet = want.theme.facet === 'drive' ? 'style' : 'drive';
    const rest = eligible.filter((pick) => pick !== want);
    const other = [...rest.filter((pick) => pick.theme.facet === otherFacet)].sort(byDistinctiveness)[0]
        ?? [...rest].sort(byDistinctiveness)[0];
    const items = [themeGist(want.theme.id), balance, other ? themeGist(other.theme.id) : '']
        .filter((item) => item.length > 0);
    const themeIds = [want.theme.id, ...(other ? [other.theme.id] : [])];
    const voiceOf = [want.theme.id, ...(balance && leadTension ? [leadTension.axis] : []),
        ...(other ? [other.theme.id] : [])];
    const family = themeParts(want.theme.id)?.family ?? 'freedom';
    return {
        text: tfs(`human.close.${family}${soft(strengthOf(want.theme))}`, {
            list: sentenceList(items, true),
        }),
        voiceOf,
        themeIds,
    };
}
