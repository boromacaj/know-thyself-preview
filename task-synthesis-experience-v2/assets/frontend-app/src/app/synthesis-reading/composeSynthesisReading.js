import { themeLabel } from '../knowledge/translations/themeLabels.js?v=53c0693';
import { resolve } from '../knowledge/knowledgeBase.js?v=53c0693';
import { explainTheme } from '../synthesis/foundation/crossPillarSynthesis.js?v=53c0693';
import { t, tf } from '../i18n/uiStrings.js?v=53c0693';
import { TRUE_TENSION_BALANCE, TRUE_TENSION_PILLAR_REQUIREMENT, } from '../synthesis/foundation/tensionDetection.js?v=53c0693';
import { factPhrase } from './factPhrasing.js?v=53c0693';
import { convergenceInteractions, leadInteraction, tensionInteractions, } from './interactions.js?v=53c0693';
import { buildHumanPortrait } from './humanPortrait.js?v=53c0693';
import { emergentClause, reinforcementMechanism, resetMechanismState, tensionMechanismBlock, } from './mechanismComposer.js?v=53c0693';
import { COLLAPSED_SECTIONS, SYNTHESIS_SECTION_ORDER, VISIBLE_DRIVE_SALIENCE, VISIBLE_DRIVES, } from './synthesisReadingTypes.js?v=53c0693';
/**
 * THE CROSS-PILLAR NARRATIVE COMPOSER.
 *
 * Reads the synthesis foundation's model and turns it into something a person
 * can read. It never bypasses the model, never recalculates anything, and never
 * writes a sentence about the reader that was not either authored in advance in
 * the knowledge layer or derived from a number the foundation produced.
 *
 * THE ONE RULE THAT SHAPES EVERYTHING HERE
 *
 * A cross-pillar layer is the easiest place in a system like this to start
 * making things up, because it sits above four sources of real content and can
 * borrow their authority for a sentence none of them said. So every paragraph
 * carries a `kind`: AUTHORED paragraphs come from a knowledge unit and are
 * identical for everyone who lands on that theme; STRUCTURAL paragraphs report
 * counts, pillar names and weights that already exist in the model. A test
 * asserts there is nothing else.
 *
 * WHY CONTESTED THEMES ARE MOVED
 *
 * The foundation reports themes and tensions separately, and the same axis
 * appears in both: a chart with a contested autonomy axis produces an
 * "Independent direction" theme AND a "Relational orientation" theme, each
 * carrying the other as counter-evidence. Printing both in a convergence
 * section would tell a reader that four systems agree they are independent and,
 * two paragraphs later, that four systems agree they are relational.
 *
 * So a theme whose counter-evidence outweighs its support is not reported as a
 * convergence at all. It belongs to the tension that produced it, and the
 * tension section is where the honest version of that finding lives.
 *
 * DETERMINISM. No clock, no randomness, no iteration-order dependence. The
 * foundation guarantees a stable model; this layer must not undo that.
 *
 * WHERE THE SENTENCES LIVE
 *
 * Every structural sentence is a `synthesis.compose.*` entry in the UI
 * dictionary, English and Slovak side by side. Nothing is assembled by gluing a
 * fragment onto a value: Slovak inflects the noun after a numeral and orders a
 * clause differently, so each sentence is ONE template with named parameters and
 * the parameters that carry a count come from their own count-specific key. The
 * price is a lot of keys; the alternative is a Slovak reading that says
 * "zhodli 2 systémov".
 */
/* Headings come from the UI dictionary, keyed `synthesis.<id>`. The English
   strings that used to sit here are its English half. */
const headingFor = (id) => t(`synthesis.${id}`);
/** The composer's own prose, keyed `synthesis.compose.<suffix>`. */
const ts = (suffix) => t(`synthesis.compose.${suffix}`);
const tfs = (suffix, params) => tf(`synthesis.compose.${suffix}`, params);
const pillarLabel = (pillar) => ts(`pillar.${pillar}`);
const countWord = (value, gender = 'm') => (value >= 0 && value <= 8 ? ts(`count.${gender}.${value}`) : String(value));
const band = (value) => (value === 0 ? 'zero' : value === 1 ? 'one' : value <= 4 ? 'few' : 'many');
/** Labels a reader will actually read in one sentence. */
const MAX_LISTED_THEMES = 4;
/**
 * A list of theme labels, cut to length, with the remainder counted.
 *
 * The sentence still states the true total, so nothing is hidden by the cut -
 * it is the difference between `nine themes bear on work and career` followed
 * by nine labels and followed by four labels and `five others`.
 */
function cappedLabels(labels) {
    if (labels.length <= MAX_LISTED_THEMES)
        return [...labels];
    const shown = labels.slice(0, MAX_LISTED_THEMES);
    const rest = labels.length - MAX_LISTED_THEMES;
    return [...shown, tfs('domains.moreThemes', { count: countWord(rest, 'f') })];
}
/** The order the product shows the pillars in, not alphabetical by internal id. */
const PILLAR_ORDER = ['numerology', 'astrology', 'bazi', 'human-design'];
const inProductOrder = (pillars) => PILLAR_ORDER.filter((pillar) => pillars.includes(pillar));
const capitalise = (text) => text.charAt(0).toUpperCase() + text.slice(1);
/** The inverse, for a clause that now follows a colon rather than a full stop. */
const lowerFirst = (text) => text.charAt(0).toLowerCase() + text.slice(1);
/**
 * A bare dimension id reads as jargon in a sentence.
 *
 * The pole nouns are dictionary entries rather than a mechanical de-hyphenation
 * of the id, because Slovak cannot take an English adjective and put a noun
 * ending on it. Each Slovak pole is chosen so that its accusative and its
 * nominative are the same word, which is what lets one noun serve both the
 * "points toward X" sentence here and the "X against Y" summary line.
 */
const poleNoun = (dimension) => ts(`pole.${dimension}`);
/*
 * THE POLE AS SOMETHING A PERSON DOES, NOT AS A CLASSIFIER LABEL.
 *
 * `poleSide` wraps the taxonomy key in „the ... side", which is right for the
 * technical readouts below and wrong in the reading: „Life Path 7, Jupiter in
 * Aries and Expression 1 point toward the independent side" is a sentence about
 * the model's axis names. The forecast's compact phrases are the same twenty-
 * four dimensions written as noun phrases, and they drop into both frames this
 * file uses - after „point toward", and capitalised as a subject.
 *
 * `poleNoun` is untouched: the appendix and the axis labels still print the
 * taxonomy, because that is what those readouts are for.
 */
const poleName = (dimension) => t(`forecast.short.${dimension}`);
function sentenceList(items) {
    if (items.length === 0)
        return '';
    if (items.length === 1)
        return items[0];
    return `${items.slice(0, -1).join(', ')}${t('reading.list.and')}${items[items.length - 1]}`;
}
const pillarNames = (pillars) => sentenceList(inProductOrder(pillars).map((pillar) => pillarLabel(pillar)));
const structural = (text) => ({ kind: 'structural', text });
/*
 * The interaction index for the profile being composed.
 *
 * Module state rather than a parameter threaded through nine call sites, for
 * the same reason the locale is: the composer is a single synchronous pass over
 * one profile, and it is reset at the top of that pass. A test asserts two
 * consecutive compositions of different profiles do not bleed.
 */
let convergenceViewsRef = new Map();
/* ------------------------------------------------- naming the actual results */
/**
 * The calculated results a side rests on, as a list a sentence can carry.
 *
 * This is the whole point of the interaction layer: the reader meets `Life Path
 * 7, Sun in Virgo and a defined Sacral centre` rather than `three systems`. Every
 * phrase is a re-rendering of a fact an adapter took from an engine, so a
 * sentence built from this cannot assert anything the model does not hold.
 */
const factList = (side) => sentenceList(side.facts.map((fact) => factPhrase(fact)));
/** Which kind of input a side is built from - name and date, sky, calendar. */
const inputList = (side) => sentenceList(side.pillars.map((pillar) => ts(`interaction.input.${pillar}`)));
/**
 * Whether the two sides of a tension are built from different kinds of input.
 *
 * When they are, that is worth saying: it is the difference between one system
 * being ambivalent and two independent readings of two different things
 * disagreeing. Computed, not authored.
 */
const differentInputs = (interaction) => {
    const [heavier, lighter] = interaction.sides;
    if (!heavier || !lighter)
        return false;
    const overlap = heavier.pillars.filter((pillar) => lighter.pillars.includes(pillar));
    return overlap.length === 0 && heavier.pillars.length > 0 && lighter.pillars.length > 0;
};
/**
 * The results behind a theme, as a trailing clause.
 *
 * Empty when the theme has no convergence view - a contested theme is reported
 * through the tension it belongs to, and naming its results here would put the
 * losing half of a split back into the agreement sections.
 */
const themeFacts = (themeId, key = 'interaction.restsOn') => {
    const view = convergenceViewsRef.get(`theme-${themeId}`);
    return view ? tfs(key, { facts: factList(view.sides[0]) }) : '';
};
const takeawayFacts = (themeId) => {
    const facts = themeFacts(themeId);
    return facts ? `${facts} ` : '';
};
/** The two-sided line that names what is on each side of a split. */
const tensionFactLine = (interaction, key) => tfs(key, {
    heavierFacts: capitalise(factList(interaction.sides[0])),
    lighterFacts: capitalise(factList(interaction.sides[1])),
    /* `poleName`, not `poleNoun`: the English pole entries are adjectives meant to
       sit inside "the {pole} side", and "point toward independent" is not a
       sentence. In Slovak the two are the same word, which is why this went
       unnoticed until the English was read aloud. */
    heavierPole: poleName(interaction.sides[0].dimension),
    lighterPole: poleName(interaction.sides[1].dimension),
});
/**
 * Pull one authored unit out of the knowledge layer.
 *
 * Returns nothing rather than a placeholder when a unit is missing: a section
 * short one paragraph is better than a section containing an apology, and the
 * completeness guard in the commentary file means this should not happen.
 */
function authored(kind, key, role) {
    const unit = resolve({ system: 'cross-pillar', kind, key, role });
    if (!unit)
        return [];
    return unit.core.map((text) => ({
        kind: 'authored', text, knowledgeUnitId: unit.unitId,
    }));
}
const themeCommentary = (theme) => authored('synthesis-theme', theme.id, 'cross-pillar-theme');
const axisCommentary = (tension) => authored('synthesis-axis', tension.axis, 'cross-pillar-tension');
const methodCommentary = (key) => authored('synthesis-concept', key, 'base-archetype');
/**
 * WHY a duality is contextual rather than a true tension.
 *
 * The foundation classifies with three tests - balance, corroboration of the
 * lighter side, and whether the pair is ordinary to hold - and a duality is
 * what fails at least one of them. The sentence used to say "one side leads,
 * or holding both is ordinary", which named two of the three and committed to
 * neither; on a 2-against-2 split it read as a contradiction. The same tests
 * run here, in the foundation's own order, so the sentence says which one.
 */
const contextualReason = (tension) => {
    if (tension.dominantPole !== null && tension.balance < TRUE_TENSION_BALANCE)
        return 'leads';
    const lighter = tension.poleA.weight <= tension.poleB.weight ? tension.poleA : tension.poleB;
    if (lighter.distinctPillars < TRUE_TENSION_PILLAR_REQUIREMENT)
        return 'single';
    /* Balanced and corroborated, yet not a true tension: the axis is one the
       foundation marks as ordinary to hold at once. */
    return 'ordinary';
};
/**
 * The note under a duality. When one side leads, the note names it: "the
 * systems split evenly, three and three" followed by "one side clearly leads"
 * is a contradiction unless the reader is told that the lead is by weight and
 * which side holds it.
 */
const contextualNote = (prefix, tension) => {
    const reason = contextualReason(tension);
    if (reason !== 'leads')
        return ts(`${prefix}.${reason}`);
    const heavier = tension.poleA.weight >= tension.poleB.weight ? tension.poleA : tension.poleB;
    return tfs(`${prefix}.leads`, { side: capitalise(poleName(heavier.dimension)) });
};
/**
 * The same judgement as `contextualNote`, sized for the entry's badge.
 *
 * It used to be a paragraph, and it was very nearly the same paragraph every
 * time: "The novelty seeking side clearly leads by weight, so it reads as
 * something that varies with the situation rather than as a contradiction."
 * appeared under five of Boris's six tensions with one noun changed. What the
 * reader needs from it is one fact - which side leads, or why the split is
 * ordinary - and a badge holds one fact better than a sentence does.
 *
 * Nothing is dropped: `leads`, `single` and `ordinary` are the same three cases
 * the paragraph distinguished, and each keeps its own wording.
 */
const contextualBadge = (tension) => {
    const reason = contextualReason(tension);
    if (reason !== 'leads')
        return ts(`tensions.entryContextual.${reason}`);
    const heavier = tension.poleA.weight >= tension.poleB.weight ? tension.poleA : tension.poleB;
    return tfs('tensions.entryContextual.leads', { side: poleName(heavier.dimension) });
};
/** A theme the counter-evidence has beaten. Belongs to a tension, not here. */
const isContested = (theme) => theme.counterWeight > theme.supportWeight;
/** "strong support" - the badge form, noun included. */
const supportBadge = (level) => ts(`support.${level}`);
/** "strong" - the bare adjective, for sentences that supply their own noun. */
const supportLevel = (level) => ts(`level.${level}`);
export function composeSynthesisReading(source) {
    const { coverage, themes, tensions, domains } = source;
    /** The domain's name, translated. Falls back to the label the model carries. */
    const domainName = (domain) => ts(`domain.${domain.id}`) || domain.label;
    /* THE INTERACTION VIEW of the same model - the concrete results behind every
       theme and every tension, ranked by how distinctive they are. Nothing is
       recalculated; interactions.ts reads back what the foundation already
       carried and the composer had been discarding. */
    const convergenceViews = new Map(convergenceInteractions(source).map((item) => [item.id, item]));
    convergenceViewsRef = convergenceViews;
    resetMechanismState();
    const tensionViews = new Map(tensionInteractions(source).map((item) => [item.id, item]));
    const lead = leadInteraction(source);
    /*
     * THE OPENING IS BUILT FIRST, though it renders below the orientation.
     *
     * The sections underneath skip whatever it carried, and they are assembled
     * before it in this function, so the paragraphs have to exist by now for the
     * skip to work. Composing them here also means a finding that produces no
     * mechanism never gets reserved: `openWith` returns false and the section
     * below reports it as it always did.
     */
    const portraitOpened = new Set();
    const portraitParagraphs = [];
    /*
     * WHAT HAS ALREADY BEEN EXPLAINED, FOR THE WHOLE READING.
     *
     * This used to be scoped to the portrait opening, so the convergence entries
     * below started from nothing and re-explained every result the opening had
     * just explained - and then re-explained it again under each further theme
     * it supported. One result commonly supports four or five themes, so the
     * reader was told what a Manifesting Generator type does seven times in one
     * Portrait, each time as though for the first time.
     *
     * Hoisting it is the whole fix. `explain()` already takes a skip set and
     * already falls through to naming the results instead of explaining them
     * when too few are left - which IS the reference-back the editorial brief
     * asks for. It was simply never given the reading's full history.
     */
    const explainedSources = new Set();
    /* The takeaway caution, like the convergence one: explained on first use. */
    let takeawayCautionSaid = false;
    {
        /*
         * A CONVERGENCE WITH NO CONCLUSION DOES NOT BELONG IN THE OPENING.
         *
         * A tension is informative on its contributions alone - it names both
         * sides and the reader can see the collision. A convergence without an
         * emergent sentence is three results and no point, and the section built
         * for convergences says it better a screen later.
         *
         * Tested BEFORE composing, not after: `reinforcementMechanism` marks its
         * paragraphs spent as it builds them, so rejecting a composed block would
         * silently downgrade that theme's own entry below to a bare list of
         * results. `emergentClause` asks the same question of the same rules
         * without touching the spent sets.
         *
         * It began to matter when the drives arrived. They compose no emergent
         * sentence by design - see `emergentAllowed` - so the portrait was closing
         * on a naked list of the results behind a want.
         */
        const canOpen = (interaction) => (interaction.kind === 'tension' || emergentClause(interaction) !== null);
        const openWith = (interaction) => {
            const block = interaction.kind === 'tension'
                ? tensionMechanismBlock(interaction, explainedSources)
                : reinforcementMechanism(interaction, themeLabel(interaction.label), explainedSources);
            if (!block)
                return false;
            for (const text of block.paragraphs)
                portraitParagraphs.push(structural(text));
            for (const id of block.sources)
                explainedSources.add(id);
            if (interaction.kind === 'tension' && differentInputs(interaction)) {
                portraitParagraphs.push(structural(tfs('interaction.sources', {
                    heavierSources: inputList(interaction.sides[0]),
                    lighterSources: inputList(interaction.sides[1]),
                })));
            }
            portraitOpened.add(interaction.id);
            return true;
        };
        if (lead && canOpen(lead))
            openWith(lead);
        /* One more, and only one, of the other kind: a portrait that opens on an
           agreement and then names the sharpest disagreement says more than two
           agreements do. Everything else is reported in the section built for it. */
        const second = [...tensionInteractions(source), ...convergenceInteractions(source)]
            .filter((item) => !portraitOpened.has(item.id) && item.kind !== lead?.kind
            && canOpen(item))
            .sort((a, b) => b.distinctiveness - a.distinctiveness || a.id.localeCompare(b.id))[0];
        if (second)
            openWith(second);
    }
    /*
     * WHAT THE READING SHOWS, AND ON WHAT GROUNDS.
     *
     * This used to be one list, entered by passing the support ladder and having
     * at least two systems behind you. Both halves of that were wrong. The ladder
     * is a measure of AGREEMENT, so making it the entry condition meant a theme
     * central to one tradition and unremarked by the others could not appear at
     * all - the lowest-common-denominator portrait. And one list of themes drawn
     * from a behavioural vocabulary can only ever describe a method.
     *
     * So: two lists, split by facet, each ordered by salience, each with a floor
     * that a theme has to be carried by something real to clear. A single
     * tradition can put a theme in either list if it is carrying it heavily -
     * which is what `pillar-signature` means, and the entry says so.
     */
    /*
     * See the note above `singlePillar` in the portrait block: with fewer than
     * two traditions calculated there is nothing to read across, and the authored
     * theme commentary - which speaks throughout of what the systems agree on -
     * would be asserting agreement with an absence.
     */
    const crossPillarPossible = coverage.pillarsPresent.length >= 2;
    const reportable = crossPillarPossible
        ? themes.filter((theme) => !isContested(theme))
        : [];
    const driveThemes = reportable
        .filter((theme) => theme.facet === 'drive' && theme.salience >= VISIBLE_DRIVE_SALIENCE)
        .slice(0, VISIBLE_DRIVES);
    const converging = reportable.filter((theme) => theme.facet === 'style');
    /* The headline still asks the agreement question, because that is what it
       claims: this is where the traditions converge. */
    const headlineThemes = converging.filter((theme) => theme.support === 'strong' || theme.support === 'moderate');
    const hasCrossPillarResult = headlineThemes.length > 0;
    /* Chosen here rather than where the portrait is built, because the convergence
       section below has to know which themes the portrait will carry so it can
       avoid repeating their commentary. */
    const portraitThemes = headlineThemes.slice(0, 3);
    const driveThemeIds = new Set(driveThemes.map((theme) => theme.id));
    const portraitThemeIds = new Set(portraitThemes.map((theme) => theme.id));
    /* Weak conflicts are not shown, so the orientation must not count them. */
    const reportableTensions = tensions.filter((tension) => tension.kind !== 'weak-conflict');
    const reportableTensionCount = reportableTensions.length;
    const sections = new Map();
    const bucket = (id) => {
        const existing = sections.get(id);
        if (existing)
            return existing;
        const created = { paragraphs: [], entries: [] };
        sections.set(id, created);
        return created;
    };
    /* ------------------------------------------------------ orientation */
    const orientation = bucket('orientation');
    /* A sub-line, because this section is now a closed disclosure and its title
       alone does not say what opening it would get you - which is the same job
       `kt-technical-sub` does for the appendix beside it. */
    orientation.standfirst = ts('orientation.standfirst');
    orientation.paragraphs.push(...methodCommentary('what-agreement-means'));
    const presentCount = coverage.pillarsPresent.length;
    const drawsKey = presentCount >= 1 && presentCount <= 4 ? String(presentCount) : 'n';
    const draws = tfs(`orientation.draws.${drawsKey}`, {
        count: countWord(presentCount),
        pillars: pillarNames(coverage.pillarsPresent),
        evidence: tfs(`evidencePieces.${band(coverage.evidenceCount)}`, {
            count: coverage.evidenceCount,
        }),
    });
    const threshold = tfs('orientation.threshold', {
        themes: tfs(`orientation.themesReach.${band(themes.length)}`, {
            count: capitalise(countWord(themes.length, 'f')),
        }),
        axes: tfs(`orientation.axesContested.${band(reportableTensionCount)}`, {
            count: countWord(reportableTensionCount, 'm'),
        }),
    });
    orientation.paragraphs.push(structural(`${draws} ${threshold}`));
    orientation.paragraphs.push(...methodCommentary('how-support-is-weighed'));
    /* -------------------------------------------- what this reading is missing */
    /*
     * NOT METHODOLOGY, AND SO NOT FILED WITH IT.
     *
     * Everything else in `orientation` describes the method and moves behind a
     * disclosure. These two describe THIS reading's inputs - a system that could
     * not be calculated, a birth time that had to be estimated - and a reader who
     * never opens the workings still has to be told, before meeting a Human
     * Design type derived from a guessed hour.
     *
     * So they lead the portrait: still stated once, still concise, still ahead of
     * every finding, and now unconditionally visible.
     */
    const dataCaveats = bucket('caveats');
    if (coverage.pillarsMissing.length > 0) {
        dataCaveats.paragraphs.push(...methodCommentary('pillar-unavailable'));
        dataCaveats.paragraphs.push(structural(tfs(`orientation.missing.${drawsKey}`, {
            pillars: pillarNames(coverage.pillarsMissing),
            count: countWord(presentCount),
        })));
        /*
         * A SINGLE TRADITION GETS NO COMBINED READING AT ALL.
         *
         * Not a threshold judgement - a definitional one. Every theme section below
         * reports what the traditions make of a quality between them, and with one
         * tradition calculated there is no `between`. Reporting its themes here
         * anyway would print authored commentary about four systems agreeing over a
         * profile where three never ran.
         */
        if (presentCount < 2) {
            dataCaveats.paragraphs.push(structural(tfs('orientation.onlyOne', {
                pillars: pillarNames(coverage.pillarsPresent),
            })));
        }
    }
    if (coverage.birthTimePrecision === 'approximate' && !coverage.birthTimeEstimated) {
        /* An estimate is marked where the reading starts, in one line: the scale of
           what it changes is in each pillar, which shows its own provisional values. */
        dataCaveats.paragraphs.push(structural(t('synthesis.notice.approximateTime')));
    }
    if (coverage.birthTimeEstimated) {
        dataCaveats.paragraphs.push(...methodCommentary('estimated-birth-time'));
        /* The short form leads; the three paragraphs above are what it opens. Only
           when every system calculated: a missing system is a different and larger
           statement, and it stays in full. */
        if (coverage.pillarsMissing.length === 0) {
            dataCaveats.notice = t('synthesis.notice.estimatedTime');
        }
        if (coverage.timeSensitiveEvidenceCount > 0) {
            bucket('orientation').paragraphs.push(structural(tfs(`orientation.timeSensitive.${band(coverage.timeSensitiveEvidenceCount)}`, {
                count: coverage.timeSensitiveEvidenceCount,
                total: coverage.evidenceCount,
            })));
        }
    }
    /* ------------------------------------------------------------ drives */
    /*
     * WHAT THE SYMBOLS POINT AT WANTING.
     *
     * Same machinery as the convergence entries - the mechanism if one composes,
     * the results it rests on otherwise, one authored paragraph - and none of the
     * badge line. A drive is the part of the reading a person is most likely to
     * recognise or reject outright, and "three systems - moderate support" above
     * it invites them to argue with the arithmetic instead.
     */
    if (driveThemes.length > 0) {
        const drives = bucket('why');
        for (const theme of driveThemes) {
            const view = convergenceViews.get(`theme-${theme.id}`);
            const block = view && !portraitOpened.has(view.id)
                ? reinforcementMechanism(view, themeLabel(theme.label), explainedSources) : null;
            if (block)
                for (const id of block.sources)
                    explainedSources.add(id);
            const rests = !block && view
                ? [structural(tfs('interaction.restsOn', { facts: factList(view.sides[0]) }))] : [];
            drives.entries.push({
                id: `drive-${theme.id}`,
                title: themeLabel(theme.label),
                paragraphs: [
                    ...(block ? block.paragraphs.map((text) => structural(text)) : []),
                    ...rests,
                    ...themeCommentary(theme).slice(0, 1),
                ],
                pillars: theme.contributingPillars,
            });
        }
    }
    /* ------------------------------------------------------- convergence */
    if (converging.length > 0) {
        const convergence = bucket('why');
        /* See the caution block below: the reason is spelled out on the first theme
           that carries the flag, and every later one is badged. */
        let cautionExplained = false;
        for (const theme of converging) {
            /* The theme is NAMED in the line. Without it, two themes that happen to
               be carried by the same systems at the same support level produced
               character-identical paragraphs once the weights came out - which is
               both a duplication and a genuine loss of information. */
            /*
             * THE COUNT SENTENCE IS GONE. THE COUNT IS NOT.
             *
             * Every entry used to open "All four available systems point to
             * structured method - Numerology, Western Astrology, BaZi and Human
             * Design. Support is strong, with nothing in the chart arguing the other
             * way." - printed directly beneath a standfirst reading
             * `four systems - strong support`. That is one fact stated twice on a
             * single card, six times per reading, and it pushed the mechanism - the
             * only part of the entry that is about this person - below the fold.
             *
             * Nothing about the epistemics is lost. The standfirst keeps the count
             * and the support level and now also marks when the support is countered.
             * The systems are named where naming them carries information: through
             * their actual results, in the mechanism directly below. The per-system
             * rows are in the evidence chain.
             */
            /* THE REINFORCEMENT ITSELF: what each result contributes, and what the
               combination is that the theme label was too wide to say. */
            const view = convergenceViews.get(`theme-${theme.id}`);
            /* The opening already explained this one. The entry still runs, because
               the count and the support level are the epistemic backbone and belong
               in the section built for them - it just does not repeat the mechanism. */
            const block = view && !portraitOpened.has(view.id)
                ? reinforcementMechanism(view, themeLabel(theme.label), explainedSources) : null;
            /* A result explained here is explained for the rest of the reading. The
               next theme it supports names it instead, through `rests` below. */
            if (block)
                for (const id of block.sources)
                    explainedSources.add(id);
            /* Where no mechanism was composed, the results the theme rests on are
               named instead - the concrete half of the deleted sentence, and the half
               that was worth keeping. */
            const rests = !block && view
                ? [structural(tfs('interaction.restsOn', { facts: factList(view.sides[0]) }))] : [];
            const paragraphs = [
                ...(block ? block.paragraphs.map((text) => structural(text)) : []),
                ...rests,
                /* Omitted for themes the portrait above already carries - saying the
                   same authored paragraphs twice on one screen is the redundancy the
                   editorial pass exists to remove. ONE paragraph, not the run: past the
                   first, theme commentary generalises about the theme rather than
                   saying anything further about this chart. */
                ...(portraitThemeIds.has(theme.id) ? [] : themeCommentary(theme).slice(0, 1)),
            ];
            /*
             * EXPLAINED ONCE, FLAGGED EVERY TIME.
             *
             * The caution paragraph is fifty-five words and, apart from the theme
             * name, identical wherever it fires - so a chart with three flagged
             * themes printed it three times. A reader needs the explanation once and
             * the flag on each theme it applies to, which is what the badge suffix
             * added below carries.
             */
            if (theme.treatCautiously) {
                if (!cautionExplained) {
                    cautionExplained = true;
                    paragraphs.push(structural(tfs('convergence.caution', {
                        theme: themeLabel(theme.label),
                    })));
                }
            }
            /*
             * NO BADGE LINE IN THE READING.
             *
             * It read `four systems - strong support - contested`, under a heading,
             * above a paragraph about the person. Three pieces of model vocabulary
             * before the first word about them, on every entry. The same numbers, with
             * more in them, are in the support table in Technical details, and the
             * caution - which changes how a reader should HOLD the finding rather than
             * describing the model - is still said in the paragraphs above.
             */
            convergence.entries.push({
                id: `theme-${theme.id}`,
                title: themeLabel(theme.label),
                paragraphs,
                pillars: theme.contributingPillars,
            });
        }
    }
    else if (crossPillarPossible) {
        bucket('why').paragraphs.push(...methodCommentary('nothing-strong-found'));
    }
    /* ---------------------------------------------------------- tensions */
    if (reportableTensions.length > 0) {
        const section = bucket('why');
        /* The three-way taxonomy - true tension, contextual duality, weak conflict -
           used to be defined in full right here, three paragraphs before the reader
           reached a single tension. Every entry already carries a one-line badge
           saying which kind it is, which is what is needed at this point; the
           definitions moved to the workings, for whoever wants them. */
        bucket('orientation').paragraphs.push(...methodCommentary('what-tension-means'));
        for (const tension of reportableTensions) {
            /*
             * WHAT IS ACTUALLY ON EACH SIDE, then what the pair tends to produce.
             *
             * The tally that used to sit between them - "Three systems point toward
             * the independent side, while four point toward the collaborative side."
             * - arrived immediately after two paragraphs that had just named the
             * results on each side, so the reader met the same split twice, once
             * concretely and once as arithmetic, on every tension in the reading.
             *
             * Its closing clause survives below on its own, because that clause says
             * the one thing those paragraphs do not: whether the two sides carry
             * comparable weight or one of them leads. The per-pole counts are in the
             * evidence chain.
             */
            const view = tensionViews.get(`tension-${tension.axis}`);
            const paragraphs = [];
            /* The collision, explained: both sides with what each result contributes,
               then the order of operations the meeting produces. Falls back to naming
               the two sides when the lexicon has no contribution for either - which
               is honest, and better than explaining a meeting nobody authored. */
            const block = view && !portraitOpened.has(view.id)
                ? tensionMechanismBlock(view, explainedSources) : null;
            if (block) {
                for (const text of block.paragraphs)
                    paragraphs.push(structural(text));
                /* Same reading-wide ledger as the convergences. A result already
                   explained under an agreement is not re-explained under a tension; it
                   is named on its side, which is what the tension is about anyway. */
                for (const id of block.sources)
                    explainedSources.add(id);
            }
            else if (view) {
                paragraphs.push(structural(tensionFactLine(view, 'interaction.tensionLine')));
            }
            /* The note that used to stand here - which side leads, or why an even
               split is ordinary - is now the second half of the entry's badge. It was
               one fact wearing a paragraph, and it wore the same paragraph on every
               tension in the reading. */
            if (view) {
                /* No axis-level mechanism here any more. `tensionMechanismBlock` is the
                   single place that decides whether a tension gets a composed rule, an
                   axis fallback or neither, and it will not repeat one already used in
                   this reading. An entry it declined still carries the two sides, the
                   count and the authored axis commentary below, which is enough. */
                if (differentInputs(view) && view.id !== lead?.id) {
                    paragraphs.push(structural(tfs('interaction.sources', {
                        heavierSources: inputList(view.sides[0]),
                        lighterSources: inputList(view.sides[1]),
                    })));
                }
            }
            /* ONE paragraph. Past the first, the axis commentary drifts from this
               chart toward the model - how often the axis splits, what the pairing
               means in general - which is a fact about the software. */
            paragraphs.push(...axisCommentary(tension).slice(0, 1));
            section.entries.push({
                id: `tension-${tension.axis}`,
                title: themeLabel(tension.label),
                /* Plain language. The taxonomy word - true tension, contextual duality -
                   is the model's own name for the shape and belongs in the table with
                   the rest of the model's names. */
                standfirst: tension.kind === 'true-tension'
                    ? ts('tensions.entryTrue')
                    : contextualBadge(tension),
                paragraphs,
            });
        }
        /* The themes moved out of the convergence section, named so they are not
           simply missing - but named in the workings. This is an explanation of why
           the agreement section is shorter than the theme list, which is a fact
           about the bookkeeping; it opened the tension section with seventy-six
           words before the reader reached a single tension. */
        const moved = themes.filter(isContested);
        if (moved.length > 0) {
            bucket('orientation').paragraphs.push(structural(tfs(`tensions.moved.${moved.length === 1 ? 'one' : 'many'}`, { list: sentenceList(moved.map((theme) => themeLabel(theme.label))) })));
        }
    }
    /*
     * THE "CARRIED BY ONE SYSTEM ONLY" SECTION IS GONE, AND NOTHING WITH IT.
     *
     * It existed because the ranking could not place a single-tradition theme
     * anywhere else: the ladder filed it below every four-system triviality, so
     * it was swept into an appendix with a caution paragraph over it. Salience
     * ranks it on what is actually behind it, so it now appears among the drives
     * or the operating patterns if it earns a place there - still marked
     * `pillar-signature` in the support table, still flagged for caution in the
     * text, and no longer quarantined.
     */
    /* ------------------------------------------------------------ domains */
    const populated = crossPillarPossible
        ? domains.filter((domain) => !domain.noMeaningfulConclusion)
        : [];
    if (populated.length > 0) {
        const section = bucket('domains');
        section.standfirst = ts('domains.standfirst');
        for (const domain of populated) {
            /* The foundation files every reportable theme into its domains, including
               the ones the convergence section withheld because their counter-evidence
               won. Listing those here as though they were findings would quietly put
               back what that section deliberately took out, so they are named as the
               contested material they are. */
            const agreeing = domain.themes.filter((theme) => !isContested(theme));
            const contested = domain.themes.filter(isContested);
            const tensionNames = domain.tensions.length > 0
                ? sentenceList(domain.tensions.map((tension) => themeLabel(tension.label).toLowerCase()))
                : '';
            const area = domainName(domain).toLowerCase();
            const parts = [];
            if (agreeing.length > 0) {
                /* The domain is named in the sentence rather than left as "this area",
                   so two domains carrying the same themes and no tensions do not
                   produce the same paragraph twice. */
                parts.push(tfs(`domains.agreed.${band(agreeing.length)}`, {
                    count: capitalise(countWord(agreeing.length, 'f')),
                    domain: area,
                    list: sentenceList(cappedLabels(agreeing.map((theme) => themeLabel(theme.label).toLowerCase()))),
                }));
            }
            else {
                parts.push(tfs('domains.noneAgreed', { domain: area }));
            }
            if (contested.length > 0) {
                parts.push(tfs(`domains.contested.${contested.length === 1 ? 'one' : 'many'}`, {
                    list: capitalise(sentenceList(cappedLabels(contested.map((theme) => themeLabel(theme.label).toLowerCase())))),
                }));
            }
            parts.push(tensionNames
                ? tfs(`domains.axes.${domain.tensions.length === 1 ? 'one' : 'many'}`, {
                    list: tensionNames,
                })
                : tfs('domains.noAxes', { domain: area }));
            section.entries.push({
                id: `domain-${domain.id}`,
                title: domainName(domain),
                paragraphs: [structural(parts.join(' '))],
            });
        }
    }
    /* ------------------------------------------------- the support table */
    /*
     * EVERY THEME, EVERY NUMBER, ONE PLACE.
     *
     * The reading above names a few themes and says nothing about arithmetic. This
     * is the other half of that bargain: all of them, ranked, with the facet, the
     * kind of finding, the salience that decided the order, the pillar count and
     * where each tradition stood - including `silent`, which is the distinction
     * the model now makes and the old output could not express.
     */
    {
        const table = bucket('support-table');
        table.standfirst = ts('supportTable.standfirst');
        for (const theme of [...themes, ...source.subThresholdThemes]) {
            table.paragraphs.push(structural(tfs('supportTable.row', {
                theme: themeLabel(theme.label),
                facet: ts(`facet.${theme.facet}`),
                kind: ts(`themeKind.${theme.kind}`),
                salience: theme.salience.toFixed(2),
                support: supportLevel(theme.support),
                pillars: theme.distinctPillars,
                stances: theme.stances
                    .map((stance) => `${pillarLabel(stance.pillar)}: ${ts(`stance.${stance.stance}`)}`)
                    .join(', '),
            })));
        }
    }
    /* ------------------------------------------------------------- limits */
    const limits = bucket('limits');
    limits.paragraphs.push(structural(ts('limits.notMeasurement')));
    /*
     * THE COUNTS MOVE, THE HONESTY STAYS.
     *
     * What this section is FOR is the sentence above it and the one below: these
     * are four symbol systems rather than a measurement of you, and each pillar
     * says more on its own terms. Those belong in the reading.
     *
     * "The model weighed 145 pieces of evidence, two further themes were withheld
     * below the threshold, eleven were time-weighted" is a different kind of
     * sentence - it is the model describing its own working, which is what
     * `orientation` is, and it was sitting in the middle of the reader-facing
     * caveat diluting it. Same text, filed where its neighbours are.
     */
    orientation.paragraphs.push(structural([
        tfs('limits.weighed', {
            evidence: tfs(`piecesOfEvidence.${band(coverage.evidenceCount)}`, {
                count: coverage.evidenceCount,
            }),
            suppressed: coverage.suppressedEvidenceCount > 0
                ? tfs(`limits.suppressed.${band(coverage.suppressedEvidenceCount)}`, {
                    count: coverage.suppressedEvidenceCount,
                })
                : '',
            time: coverage.timeSensitiveEvidenceCount > 0
                ? tfs(`limits.timeWeighted.${band(coverage.timeSensitiveEvidenceCount)}`, {
                    count: coverage.timeSensitiveEvidenceCount,
                })
                : '',
        }),
        tfs(`limits.subThreshold.${band(source.subThresholdThemes.length)}`, {
            count: capitalise(countWord(source.subThresholdThemes.length, 'f')),
        }),
        ts('limits.evidenceChain'),
    ].join(' ')));
    limits.paragraphs.push(structural(ts('limits.pillarsSayMore')));
    /* ------------------------------------------------------ evidence chain */
    const evidenceChain = [];
    for (const theme of themes) {
        const explained = explainTheme(theme);
        /*
         * A SUPPRESSED ROW IS NOT SHOWN. It weighs nothing, and its fact is the one
         * thing a reader must not be told: a value only the 12:00 reference or a
         * withheld rising sign produced ("Ascendant in Libra", an orb at noon). The
         * model keeps it for provenance and the coverage counts it ("left out");
         * the evidence chain lists what the reading actually rests on.
         */
        for (const row of explained.supporting.filter((entry) => entry.methodology !== 'suppressed')) {
            evidenceChain.push({
                themeId: explained.themeId,
                themeLabel: themeLabel(explained.label),
                pillar: row.pillar,
                fact: row.fact,
                dimension: row.dimension,
                countedWeight: row.countedWeight,
                discounted: row.discounted,
                methodology: row.methodology,
                knowledgeUnitId: row.knowledgeUnitId,
            });
        }
    }
    /* --------------------------------------------- THE READING, IN A VOICE --
     *
     * Three blocks stood here: the combined portrait, `If you remember only
     * three things`, and the practical synthesis. Between them they restated the
     * reading's leading themes three more times - the portrait opened on the
     * mechanism, the takeaways compressed it, and the practical section filed it
     * by area and named its sources again. Four screens, one finding.
     *
     * `humanPortrait` replaces all three with one pass that says each theme once,
     * to the reader, without naming a placement. Everything those blocks used to
     * print is still composed above and is now in the workings, one disclosure
     * away, where the evidence it is made of already lived.
     */
    const human = buildHumanPortrait(source);
    if (human) {
        for (const section of human.sections) {
            const target = bucket(section.id);
            target.paragraphs.push(...section.paragraphs
                .filter((paragraph) => paragraph.text.length > 0)
                .map((paragraph) => ({
                kind: 'voice', text: paragraph.text, voiceOf: paragraph.voiceOf,
            })));
            if (section.sources.length > 0)
                target.sources = section.sources;
        }
    }
    /* ------------------------------------------------------------ assemble */
    /*
     * THE RANKED SECTIONS SHOW THEIR TOP, AND KEEP THE REST.
     *
     * `convergence` and `tensions` arrive sorted by weight, so the cut is simply
     * where the list stops being a finding and starts being an inventory. What is
     * cut is not dropped: it travels to the same section with `deep` set, which
     * the screen renders inside the one disclosure the pillars already use.
     */
    /*
     * NOTHING IS CAPPED AT ASSEMBLY ANY MORE.
     *
     * The reader-facing sections are capped where they are chosen, by the layer
     * that knows how many patterns a paragraph can carry. `why` is deliberately
     * complete: it is the workings, and a workings section that silently stopped
     * at three would be the one place in the app where hiding something was not
     * an editorial decision but an accident of a constant.
     */
    const CAPS = {};
    const built = [];
    for (const id of SYNTHESIS_SECTION_ORDER) {
        const content = sections.get(id);
        if (!content)
            continue;
        if (content.paragraphs.length === 0 && content.entries.length === 0)
            continue;
        const cap = CAPS[id];
        const shown = cap === undefined ? content.entries : content.entries.slice(0, cap);
        const rest = cap === undefined ? [] : content.entries.slice(cap);
        built.push({
            id,
            heading: headingFor(id),
            ...(COLLAPSED_SECTIONS.has(id) ? { collapsed: true } : {}),
            ...(content.standfirst ? { standfirst: content.standfirst } : {}),
            paragraphs: content.paragraphs,
            ...(shown.length > 0 ? { entries: shown } : {}),
            ...(content.sources && content.sources.length > 0 ? { sources: content.sources } : {}),
            ...(content.notice ? { notice: content.notice } : {}),
        });
        /*
         * WHAT IS CUT IS CUT.
         *
         * The overflow used to travel to a `-more` section carrying the same
         * heading, which the screen then rendered inside a disclosure - so a reader
         * opening the workings met "Where the systems agree" a second time, with
         * three more of the same cards under it. The ranked remainder is in the
         * support table with its salience, which is the honest place for it: a
         * ranking's tail is a fact about the model, not a second reading.
         */
    }
    /*
     * THE HEADLINE IS STILL A LABEL, AND THAT IS THE RIGHT CALL.
     *
     * It is the one place in the reading where a short handle beats a sentence:
     * it sits in a card above the reading, it is what the unified pattern uses,
     * and a five-word second-person clause in that slot reads as a fortune. The
     * sentence underneath it is the reading's own opening, in the reader's
     * direction, which is where the voice starts.
     */
    const headline = themes[0] ? themeLabel(themes[0].label)
        : hasCrossPillarResult ? themeLabel(headlineThemes[0].label)
            : ts('headline.none');
    /*
     * THE FIRST PROSE ON THE SCREEN IS THE FINDING, NOT THE METHOD.
     *
     * It used to be "Across four distinct symbolic traditions, the reading
     * converges most strongly on structured method" - which is a sentence about
     * how the app works, sits above everything else, and is the same sentence for
     * everyone whose chart converges on the same label. That sentence still
     * exists and has moved into the orientation section, where the rest of the
     * method is. What opens the screen now names the results.
     */
    const methodology = [
        hasCrossPillarResult
            ? `${tfs(`intro.converges.${drawsKey}`, {
                count: countWord(presentCount),
                theme: themeLabel(headlineThemes[0].label).toLowerCase(),
                then: headlineThemes.length > 1
                    ? tfs('intro.then', {
                        list: sentenceList(headlineThemes.slice(1, 3)
                            .map((theme) => themeLabel(theme.label).toLowerCase())),
                    })
                    : '',
            })} ${tfs(`intro.axes.${band(reportableTensionCount)}`, {
                count: capitalise(countWord(reportableTensionCount, 'm')),
            })}`
            : tfs(`intro.none.${drawsKey}`, { count: countWord(presentCount) }),
    ];
    bucket('orientation').paragraphs.push(...methodology.map((text) => structural(text)));
    /*
     * WHAT THE READER MEETS FIRST.
     *
     * It used to be `Channel 25-51 defined, Expression 1, Jupiter in Aries and an
     * output-group emphasis among the Ten Gods point toward deciding alone` -
     * four results and a pole name, before one word addressed to anybody. The
     * opening is now the portrait's own first paragraph, and the results that
     * produced it are in the workings.
     */
    /* Empty when the portrait rendered: its first sentence is the card's
       standfirst and the rest is the section below, so an intro block here would
       be the same paragraph a third time. */
    const introduction = human ? [] : [methodology[0]];
    return {
        modelVersion: source.modelVersion,
        hasCrossPillarResult,
        headline,
        ...(human ? { hook: human.hook } : {}),
        introduction,
        sections: built,
        evidenceChain,
        source,
    };
}
