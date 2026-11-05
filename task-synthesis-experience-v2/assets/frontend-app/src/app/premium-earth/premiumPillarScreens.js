import { renderAstrologyChartWheel } from '../components/astrologyChartWheel.js?v=53c0693';
import { renderFivePhaseCycleWheel, renderSeasonalArc } from '../components/baziChartVisuals.js?v=53c0693';
import { renderHumanDesignBodygraph } from '../components/humanDesignBodygraph.js?v=53c0693';
import { escapeAttribute, escapeHtml } from '../format.js?v=53c0693';
import { engineProse } from '../i18n/engineProse.js?v=53c0693';
import { labelText } from '../i18n/labelText.js?v=53c0693';
import { UI_STRING_KEYS, t } from '../i18n/uiStrings.js?v=53c0693';
import { outputValue } from '../pillar-reading/composeReading.js?v=53c0693';
import { composePillarReading } from '../pillar-reading/pillarReading.js?v=53c0693';
import { activeLocale } from '../i18n/locale.js?v=53c0693';
import { renderAstrologyHero } from './astrologyBigThree.js?v=53c0693';
import { baziHeroData, renderBaziHero } from './baziHero.js?v=53c0693';
import { ORBIT_LABELS, renderNumerologyOrbit, renderScrollCue } from './numerologyOrbit.js?v=53c0693';
/*
 * PREMIUM PILLAR PRESENTATION
 * ---------------------------
 * A pillar screen is a chapter about the reader. It reads top to bottom as
 * prose, with symbolic markers where a symbol says it better than a sentence,
 * and it ends with ONE closed area holding the entire technical layer.
 *
 * WHAT CHANGED, AND WHY
 *
 * The previous version built its HTML straight from `PillarResult`, so the
 * information architecture was the engine's struct: key outputs first because
 * keyOutputs came first, then themes, then a chart, then the reading, then six
 * sibling disclosures. Nobody designed that order. It fell out of the data
 * shape, and it answered "how was this calculated?" three times before it
 * answered "what does this mean for me?" once.
 *
 * Now a composer (app/pillar-reading) turns the engine result into a reading
 * model, and this file renders that model. It knows nothing about numerology or
 * BaZi - no pillar-specific branch survives here except the chart, which is
 * genuinely per-pillar artwork.
 *
 * THE FLOW NOW STARTS IN THE SYNTHESIS. It used to end there: a hub of six
 * cards opened onto one reading at a time, and the four traditions were the
 * first thing a finished profile showed. That had the product backwards. The
 * integrated portrait is what the reader came for; the four systems are where
 * it came from, and the forecast is what is active now. So the portrait is the
 * landing view, the destinations sit in one strip at the bottom of every
 * screen, and the hub - which existed only to choose between them - is gone.
 *
 * A pillar screen is unchanged by that. It is the same reading, reached in one
 * tap from anywhere instead of two from the hub.
 *
 * TECHNICAL DATA IS MOVED, NEVER DELETED. Every technical group, every
 * calculated value including the ones the hero showed, the provenance and the
 * limitations are all inside the one disclosure, which is closed by default.
 */
const PILLAR_ORDER = ['numerology', 'western-astrology', 'bazi-tcm', 'human-design'];
/* ------------------------------------------------ identity, for the portrait */
/**
 * A short, stable identity line per pillar, taken from its own key outputs.
 *
 * The LABEL is localised from the pillar id rather than taken from the model,
 * because model.ts writes it in English; the VALUE is not, because it is engine
 * output - a sign, a stem, a Type - and translating it would stop the card
 * agreeing with the technical appendix beside it.
 */
export const identityOutput = (pillar) => {
    const first = pillar.keyOutputs[0];
    if (!first)
        return null;
    return {
        label: t(`pillar.${pillar.id}.output`),
        value: pillar.id === 'western-astrology' ? signPhrase(first.value) : first.value,
    };
};
/**
 * "Virgo 4°35'" -> "v Panne 4°35'", for the identity line only.
 *
 * The engine's value is left exactly as it is; this rewrites the leading sign
 * name where it is printed, so the Slovak line reads "Slnko v Panne 4°35'"
 * instead of "Slnko Virgo 4°35'". English maps each name to itself, so the
 * line is byte-identical to before in that locale.
 *
 * Anchored to the START of the string and matched case-sensitively against the
 * known twelve: an unrecognised value is returned untouched rather than
 * half-rewritten, which is the failure mode that would put a mangled sign in
 * front of a reader.
 */
function signPhrase(value) {
    const match = /^([A-Z][a-z]+)/.exec(value);
    if (!match)
        return value;
    const key = `zodiac.in.${match[1].toLowerCase()}`;
    if (!UI_STRING_KEYS.includes(key))
        return value;
    return `${t(key)}${value.slice(match[1].length)}`;
}
/* Same reasoning: the model names what it computed, the screen says it. */
/* ------------------------------------------------------------- one pillar */
/**
 * THE HUMAN DESIGN HERO'S SCROLL CUE: the same three chevrons the other heroes carry (renderScrollCue, numerologyOrbit.ts - the markup and the drawing are that function's, its class names are renamed so that this
 * page does not carry the Numerology hero's), as the one button that takes the reader to the reading. Decorative to assistive technology as a drawing; named as a control.
 */
const humanDesignScrollCue = () => `<button type="button" class="hd-scroll-cue" data-hd-scroll-cue aria-label="${escapeAttribute(t('chart.hd.scrollCue'))}">${renderScrollCue().replace(/kt-orbit-cue/g, 'hd-scroll-cue-art')}</button>`;
/** Charts come from the existing renderers, using the data PillarResult carries. */
function renderPillarChart(pillar) {
    if (pillar.westernAstrologyChart)
        return renderAstrologyChartWheel(pillar.westernAstrologyChart);
    /* The approved BodyGraph, not the V2 one - glass centres, gold circuitry, the
       three glow/light/core channel layers. It takes the SAME
       HumanDesignBodygraphData, so the engine binding is unchanged. */
    if (pillar.humanDesignBodygraph)
        return renderHumanDesignBodygraph(pillar.humanDesignBodygraph, { hero: { cue: humanDesignScrollCue() } });
    if (pillar.baziChart) {
        const window = pillar.baziChart.timeWindow;
        const flags = { yearIsEstimate: window !== undefined && window.year.values.length > 1, monthIsEstimate: window !== undefined && window.month.values.length > 1 };
        return `${renderFivePhaseCycleWheel(pillar.baziChart.bazi, flags)}${renderSeasonalArc(pillar.baziChart.bazi, flags)}`;
    }
    return '';
}
/**
 * THE ENCYCLOPEDIA CONTROL.
 *
 * One button, used identically beside a section heading, a mark or an entry. It
 * carries only the concept key; the panel's content lives in the encyclopedia
 * and is looked up at open time, so no conceptual prose is ever duplicated into
 * a pillar's markup.
 *
 * It is a real <button> with an accessible name rather than an icon glyph with a
 * title attribute, because on the target device a title never appears at all.
 */
function renderInfoControl(infoKey, subject) {
    if (!infoKey)
        return '';
    return `<button class="kt-info-control" type="button" data-concept="${escapeHtml(infoKey)}"`
        + ` aria-label="${escapeHtml(t('ui.infoAria'))} ${escapeHtml(subject)}?">`
        + '<span aria-hidden="true">i</span></button>';
}
/**
 * A symbolic marker: glyph, what it is, what it says.
 *
 * The glyph is inserted unescaped because it is our own SVG from the glyph
 * system, never user or engine text. Everything around it is escaped.
 */
function renderMark(mark) {
    return `
    <li class="kt-mark">
      ${mark.glyph ? `<span class="kt-mark-glyph">${mark.glyph}</span>` : ''}
      <span class="kt-mark-text">
        <span class="kt-mark-label">${escapeHtml(labelText(mark.label))}${renderInfoControl(mark.infoKey, labelText(mark.label))}</span>
        ${mark.value ? `<span class="kt-mark-value">${escapeHtml(engineProse(mark.value))}</span>` : ''}
        ${mark.note ? `<span class="kt-mark-note">${escapeHtml(engineProse(mark.note))}</span>` : ''}
      </span>
    </li>`;
}
const renderMarks = (marks) => (!marks || marks.length === 0 ? ''
    : `<ul class="kt-mark-strip">${marks.map(renderMark).join('')}</ul>`);
/**
 * THE NUMEROLOGY HERO. A live Numerology reading opens on Life Path as one large circle at the centre of the Earth and Expression, Soul
 * Urge and Personality as three smaller circles orbiting it (numerologyOrbit.ts) instead of a strip of capsules. Life Path, Expression
 * and Soul Urge are the numbers the capsules showed, still named by the reading's hero marks; Personality is the fourth natal number the
 * at-a-glance cards already carry, read from the pillar's own outputs. The values are the engine's. All four or none: a reading that
 * lacks one keeps the strip.
 */
function numerologyOrbitMarkup(pillar, marks) {
    if (pillar.id !== 'numerology' || !marks)
        return '';
    const entries = [];
    for (const label of ORBIT_LABELS) {
        /* The hero marks are the capsules' three; Personality was never one of them. */
        if (label !== 'Personality' && !marks.some((candidate) => candidate.label === label))
            return '';
        const raw = outputValue(pillar, label);
        if (raw === null || !Number.isFinite(Number(raw)))
            return '';
        entries.push({ label, text: labelText(label), value: String(Number(raw)) });
    }
    /* Every circle opens the meaning of its own number in its own position, in the reader's language (English and Slovak). */
    return renderNumerologyOrbit(entries, true);
}
/**
 * THE BAZI HERO. A live BaZi reading opens on the YEAR ANIMAL as one large circle at the centre of the Earth, with the year's element, its
 * Yin / Yang and the Day Master as three smaller ones round it (baziHero.ts). The values are the engine's typed result; a chart that cannot give
 * all of them keeps the strip of marks.
 */
function baziHeroMarkup(pillar) {
    const data = baziHeroData(pillar);
    return data ? renderBaziHero(data) : '';
}
/* The BaZi hero says the animal, the element, the polarity and the Day Master, and the charts below carry the five-element counts and the seasonal wheel, so the at-a-glance cards (strength tendency, five-element counts, Yin / Yang balance) are not drawn above the reading, as on the Numerology orbit. Presentation only: the reading model and the technical appendix keep every value. */
const renderParagraphs = (paragraphs) => paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('');
function renderEntry(entry) {
    return `
    <article class="kt-reading-entry" id="${escapeHtml(entry.id)}">
      <header class="kt-reading-entry-head">
        ${entry.mark?.glyph ? `<span class="kt-mark-glyph">${entry.mark.glyph}</span>` : ''}
        <h4>${escapeHtml(labelText(entry.title))}${renderInfoControl(entry.infoKey, labelText(entry.title))}</h4>
      </header>
      ${renderParagraphs(entry.paragraphs)}
    </article>`;
}
/*
 * THE DEEP LAYER WAS DECLARED AND NEVER HONOURED.
 *
 * `ReadingLayer` has had three values since the pillar composer was written,
 * and the composers assign `deep` conscientiously: hidden stems, the Ten Gods,
 * Luck Pillars, defined and open centres, channels, gates, the numbers in full.
 * The renderer then printed every layer identically, as an open <section>, and
 * the attribute went into the DOM as decoration. Measured on Boris, that put
 * 5,984 words of reference material into the main scroll of three pillars -
 * Human Design alone opened with 2,778 words of centre-by-centre and
 * gate-by-gate detail after the reading had already finished making its point.
 *
 * So the layer now does what it says. Core sections read straight through;
 * every deep section moves, IN ORDER, into one disclosure at the end of the
 * reading. Nothing is deleted, nothing is rewritten, and a reader who wants the
 * gate list is one tap from it - which is the difference between a reference
 * and an obstacle.
 *
 * ONE disclosure, not one per section: five collapsed headings in a row is a
 * worse experience than five open ones, because the reader has to decide five
 * times instead of once.
 */
function renderSectionLayers(sections) {
    const main = [];
    const deep = [];
    for (const section of sections) {
        if (section.layer === 'deep') {
            deep.push(section);
            continue;
        }
        /*
         * A CORE SECTION CAN STILL CARRY DEEP ENTRIES.
         *
         * Astrology's planet detail sits inside thematic sections, so "Growth" is
         * forty words of reading followed by Jupiter and then the three outer
         * planets. Jupiter is about this reader; Uranus, Neptune and Pluto are
         * about everyone born in the same few years. Splitting at the section would
         * either keep all four in the scroll or hide Jupiter with them, so the
         * split happens at the entry and the deep half travels to the disclosure
         * under its own section's heading - which is what keeps it readable there.
         */
        const deepEntries = (section.entries ?? []).filter((entry) => entry.layer === 'deep');
        if (deepEntries.length === 0) {
            main.push(section);
            continue;
        }
        const keptEntries = (section.entries ?? []).filter((entry) => entry.layer !== 'deep');
        main.push({ ...section, entries: keptEntries });
        deep.push({
            ...section,
            /* No standfirst or marks on the travelling copy: they belong to the
               section the reader already passed, and repeating them would read as a
               second, contradictory opening to the same material. */
            standfirst: undefined,
            marks: undefined,
            paragraphs: [],
            entries: deepEntries,
        });
    }
    const rendered = main.map(renderSection).join('');
    if (deep.length === 0)
        return rendered;
    return `${rendered}
    <details class="kt-technical kt-deep-dive">
      <summary>
        <span class="kt-technical-title">${escapeHtml(t('ui.deepDive'))}</span>
        <span class="kt-technical-sub">${escapeHtml(t('ui.deepDive.sub'))}</span>
      </summary>
      <div class="kt-technical-body">${deep.map(renderSection).join('')}</div>
    </details>`;
}
/**
 * THE AT-A-GLANCE BLOCK HAS NO VISIBLE HEADER. Its cards are the content: "At a glance" and the sentence under it ("The
 * chart's key facts. What they mean is below.") only announced them. The heading stays in the document, clipped out of
 * sight (not removed), so the section is still named for assistive technology and the heading order is unbroken; the
 * standfirst is not drawn at all. The model still carries both - this is presentation only.
 */
const isGlanceBlock = (section) => section.id === 'at-a-glance' && section.layer === 'glance';
/**
 * THE BIG THREE ARE LABELLED ON THE SCENE, so the at-a-glance block does not print them again: its Sun, Moon and Ascendant cards are left out and the rest of its
 * facts (the dominant element and modality, the chart ruler, a stellium, the tightest aspect) stay. A block with nothing left is not drawn. Presentation only: the
 * section still carries every card in the reading model.
 */
const BIG_THREE_LABELS = new Set(['Sun', 'Moon', 'Ascendant']);
function withoutBigThreeCards(sections) {
    return sections.flatMap((section) => {
        if (!isGlanceBlock(section))
            return [section];
        const marks = (section.marks ?? []).filter((mark) => !BIG_THREE_LABELS.has(mark.label));
        return marks.length === 0 ? [] : [{ ...section, marks }];
    });
}
/**
 * THE HUMAN DESIGN HERO SAYS THE KEY OUTPUTS ONCE. The capsules under the card (Type with its strategy, Authority, Profile) are the summary; the "At a glance" block further down used
 * to print the same four again (Type, Strategy, Authority, Profile) as a grid. Its marks that the capsules already carry - the same label and value, or a value the capsules print as a
 * note (the strategy under the Type) - are left out, and the rest of its facts (the definition, the signature, the not-self theme, whatever else the block holds) stay. A block with
 * nothing left is not drawn. Presentation only: the section still carries every mark in the reading model, and the technical appendix still has every value.
 */
function withoutHeroMarks(sections, heroMarks) {
    const carried = (mark) => heroMarks.some((hero) => (hero.label === mark.label && hero.value === mark.value)
        || (hero.note !== undefined && hero.note.includes(mark.value)));
    return sections.flatMap((section) => {
        if (!isGlanceBlock(section))
            return [section];
        const marks = (section.marks ?? []).filter((mark) => !carried(mark));
        return marks.length === 0 && section.paragraphs.length === 0 && (section.entries ?? []).length === 0 ? [] : [{ ...section, marks }];
    });
}
function renderSection(section) {
    /* A section whose entries all travelled to the deep dive would otherwise
       render as a lone heading over nothing. */
    if (section.paragraphs.length === 0 && (section.entries ?? []).length === 0
        && (section.marks ?? []).length === 0 && !section.standfirst)
        return '';
    const bare = isGlanceBlock(section);
    /* data-layer lets the three reading depths be styled or filtered without the
       renderer deciding anything about them. Absent means core. */
    return `
    <section class="kt-reading-section" id="section-${escapeHtml(section.id)}"
      data-layer="${escapeHtml(section.layer ?? 'core')}"${bare ? ' data-glance="bare"' : ''}>
      <h2${bare ? ' class="kt-quiet-title"' : ''}>${escapeHtml(section.heading)}${renderInfoControl(section.infoKey, section.heading)}</h2>
      ${section.standfirst && !bare ? `<p class="kt-reading-standfirst">${escapeHtml(section.standfirst)}</p>` : ''}
      ${renderMarks(section.marks)}
      ${renderParagraphs(section.paragraphs)}
      ${(section.entries ?? []).map(renderEntry).join('')}
    </section>`;
}
/**
 * THE ONE TECHNICAL DISCLOSURE. Closed by default.
 *
 * Everything the engine produced, in the field's own vocabulary, with at most
 * one plain sentence per field saying what that field is. Long interpretation
 * belongs in the reading above; this is a reference, not a second chapter.
 */
function renderTechnical(technical) {
    const field = (entry) => `
    <div class="kt-tech-field">
      <dt>${escapeHtml(entry.label)}</dt>
      <dd>${escapeHtml(entry.value)}</dd>
      ${entry.note ? `<dd class="kt-tech-note">${escapeHtml(entry.note)}</dd>` : ''}
    </div>`;
    const allValues = technical.allValues.length === 0 ? '' : `
    <div class="kt-tech-group">
      <h4>${escapeHtml(t('ui.technical.allValues'))} (${technical.allValues.length})</h4>
      <dl>${technical.allValues.map(field).join('')}</dl>
    </div>`;
    const groups = technical.groups.map((group) => `
    <div class="kt-tech-group">
      <h4>${escapeHtml(group.title)}</h4>
      <dl>${group.fields.map(field).join('')}</dl>
    </div>`).join('');
    const methodology = `
    <div class="kt-tech-group">
      <h4>${escapeHtml(t('ui.technical.method'))}</h4>
      <dl>${technical.methodology.map(field).join('')}</dl>
      <p class="kt-source-ref">${escapeHtml(technical.provenance.reference)}</p>
    </div>`;
    const limitations = technical.limitations.length === 0 ? '' : `
    <div class="kt-tech-group">
      <h4>${escapeHtml(t('ui.technical.limitations'))}</h4>
      <ul class="kt-limitations">${technical.limitations
        .map((limitation) => `<li>${escapeHtml(limitation)}</li>`).join('')}</ul>
    </div>`;
    return `
    <details class="kt-technical">
      <summary>
        <span class="kt-technical-title">${escapeHtml(t('ui.technical'))}</span>
        <span class="kt-technical-sub">${escapeHtml(t('ui.technical.sub'))}</span>
      </summary>
      <div class="kt-technical-body">
        ${allValues}${groups}${methodology}${limitations}
      </div>
    </details>`;
}
export function renderPremiumPillarView(pillar, givenName) {
    const reading = composePillarReading(pillar, givenName ? { givenName } : {});
    const chart = renderPillarChart(pillar);
    const orbit = reading.hero.isLive ? numerologyOrbitMarkup(pillar, reading.hero.marks) : '';
    /* THE WESTERN ASTROLOGY HERO: a live reading opens on the scene with the Sun, the Moon and the Ascendant labelled on it (astrologyBigThree.ts). English opens their
       meanings; any other language keeps the labels as plain annotations. The three cards the at-a-glance block would print for them are not printed twice. */
    const astrologyHero = pillar.id === 'western-astrology' && reading.hero.isLive ? renderAstrologyHero(pillar, activeLocale() === 'en') : '';
    const baziHero = reading.hero.isLive && !orbit ? baziHeroMarkup(pillar) : '';
    const marks = orbit || astrologyHero || baziHero ? '' : renderMarks(reading.hero.marks);
    /* THE HUMAN DESIGN HERO IS THE BODYGRAPH. A live reading opens on the card, large, with the scroll cue under it; the three key outputs (Type, Authority, Profile) that used to stand above it follow the card, at the
       top of the reading. Nothing is removed: the marks are the same markup in the same header, one block later, and the cue takes the reader to them. */
    const hdHero = pillar.id === 'human-design' && reading.hero.isLive && Boolean(pillar.humanDesignBodygraph) && reading.chartSlot === 'after-hero' && Boolean(chart);
    /*
     * THE ORBIT IS THE AT-A-GLANCE. When the Numerology hero is drawn, the four natal numbers it shows are exactly the cards the
     * at-a-glance block would print again under it (and the chapter card is the only other thing in it), so the block is left out and the
     * reading starts on its first written section. Presentation only: the section stays in the reading model, the technical appendix and
     * the chapter sections still carry every value, and a reading with no orbit (a number missing) keeps the block.
     */
    /*
     * NO PREAMBLE ON A LIVE READING. The screen opens on what was calculated - the marks, the chart, "At a glance" - not
     * on a kicker, a title, "Calculated locally" and two paragraphs about what the system is. The title stays as the
     * screen's heading for assistive technology (clipped out of sight, not removed). A reading that could NOT be
     * calculated is the exception on purpose: its title, its status ("Calculation blocked") and its explanation ARE the
     * content, so they stay.
     *
     * (There is no back control here either: it was removed on request - on the first reading it duplicated the floating
     * capsule, and from the others it was the one-tap route to the hub, so the reachability test in
     * frontendPremiumEarthPillarNavigation.test.mjs is what keeps the remaining route from decaying.)
     */
    const head = reading.hero.isLive
        ? `<h1 class="kt-quiet-title">${escapeHtml(reading.hero.title)}</h1>${orbit || astrologyHero || baziHero || (marks && !hdHero ? `<header class="kt-pillar-head">${marks}</header>` : '')}`
        : `<header class="kt-pillar-head">
        <h1>${escapeHtml(reading.hero.title)}</h1>
        <p class="kt-pillar-status">${escapeHtml(reading.hero.statusLabel)}</p>
        ${marks}
      </header>`;
    return `
    <article class="kt-pillar-view kt-reading${reading.hero.isLive ? ' is-bare' : ''}" data-pillar="${pillar.id}">
      ${head}

      ${reading.chartSlot === 'after-hero' && chart
        ? `<section class="kt-pillar-chart is-primary">${chart}</section>` : ''}

      ${hdHero ? (marks ? `<header class="kt-pillar-head" data-hd-reading-start>${marks}</header>` : '<span class="kt-reading-start" data-hd-reading-start aria-hidden="true"></span>') : ''}

      ${!reading.hero.isLive && reading.introduction.length > 0
        ? `<div class="kt-reading-intro">${renderParagraphs(reading.introduction)}</div>` : ''}

      ${renderSectionLayers(orbit || baziHero ? reading.sections.filter((section) => !isGlanceBlock(section)) : astrologyHero ? withoutBigThreeCards(reading.sections) : hdHero ? withoutHeroMarks(reading.sections, reading.hero.marks) : reading.sections)}

      ${reading.chartSlot === 'after-sections' && chart
        ? `<section class="kt-pillar-chart">${chart}</section>` : ''}

      ${renderTechnical(reading.technical)}
    </article>`;
}
/* ---------------------------------------------- the profile destination strip */
/**
 * The portrait. Exported because the experience layer needs the same identifier
 * to mark the active destination, and because it is the DEFAULT one: a finished
 * profile opens here.
 */
export const PREMIUM_SYNTHESIS_STAGE = 'cross-pillar-synthesis';
/** The forecast is a destination in the same strip, not a page under a pillar. */
export const PREMIUM_FORECAST_STAGE = 'forecast';
/**
 * Tarot is a destination in the same strip. Like the forecast it owns its surface in a module of its own
 * (tarotExperience), and it is not read from the profile: the draw is the reader's, not a chart's.
 */
export const PREMIUM_TAROT_STAGE = 'tarot';
/**
 * The main menu is a destination in the same strip - the first stop, so that home is always one tap away. Like the
 * forecast and Tarot it owns its surface in a module of its own (menuExperience), and it reads nothing from the
 * profile: it is a way in, not a chart.
 */
export const PREMIUM_MENU_STAGE = 'menu';
/**
 * Connections is a destination in the same strip: the relationship layer, with a surface of its own in a module of its own (connectionsExperience). Like Tarot it is not read from
 * the profile as a chart; the owner's profile is Person A and everyone else is added inside it.
 */
export const PREMIUM_CONNECTIONS_STAGE = 'connections';
/**
 * THE SIX DESTINATIONS, IN READER ORDER.
 *
 * Portrait first because it is the product: what all of this says about you.
 * Then the four systems, which are where that came from - astrology before
 * numerology here, unlike PILLAR_ORDER above, because that order is the model's
 * and this one is the reader's. Forecast last because it answers a different
 * question from the other five: not who you are, but what is active now.
 *
 * `attribute` is the whole reason this is a table rather than a list of ids.
 * Each destination emits the attribute that ALREADY has a listener - the same
 * one the retired hub cards used - so the strip introduces no navigation of its
 * own. A capsule is a hub card with different clothes.
 */
/*
 * THE SIX DESTINATIONS, WITH THE NAME EACH ONE HAS IN A URL.
 *
 * The stop id is the engine's (`bazi-tcm`, `cross-pillar-synthesis`); the slug
 * is what a reader sees and links to (`bazi`, `portrait`). Both belong to the
 * same row because the router writes one and the restore reads the other, and
 * keeping them in two lists is how they drift.
 */
const PROFILE_DESTINATIONS = [
    { id: PREMIUM_MENU_STAGE, slug: 'menu', attribute: 'data-menu-open', labelKey: 'nav.menu' },
    { id: PREMIUM_SYNTHESIS_STAGE, slug: 'portrait', attribute: 'data-synthesis-open', labelKey: 'nav.portrait' },
    { id: 'western-astrology', slug: 'astrology', attribute: 'data-pillar-open="western-astrology"', labelKey: 'nav.western-astrology' },
    { id: 'numerology', slug: 'numerology', attribute: 'data-pillar-open="numerology"', labelKey: 'nav.numerology' },
    { id: 'bazi-tcm', slug: 'bazi', attribute: 'data-pillar-open="bazi-tcm"', labelKey: 'nav.bazi-tcm' },
    { id: 'human-design', slug: 'human-design', attribute: 'data-pillar-open="human-design"', labelKey: 'nav.human-design' },
    { id: PREMIUM_FORECAST_STAGE, slug: 'forecast', attribute: 'data-forecast-open', labelKey: 'nav.forecast' },
    { id: PREMIUM_TAROT_STAGE, slug: 'tarot', attribute: 'data-tarot-open', labelKey: 'nav.tarot' },
    { id: PREMIUM_CONNECTIONS_STAGE, slug: 'connections', attribute: 'data-connections-open', labelKey: 'menu.connections' },
];
/** Stop id -> URL slug, for the router that writes the hash. */
export const destinationSlugs = () => Object.fromEntries(PROFILE_DESTINATIONS.map((stop) => [stop.id, stop.slug]));
/** URL slug -> stop id, for the restore that has to reopen one. */
export const stopForDestinationSlug = (slug) => (PROFILE_DESTINATIONS.find((stop) => stop.slug === slug)?.id ?? null);
/** Every destination id, for the controllers that need to recognise one. */
export const profileStops = () => PROFILE_DESTINATIONS.map((stop) => stop.id);
/*
 * ONE STRIP, SIX STOPS, NO HUB.
 *
 * What was here before: a single capsule saying Back, whose only destination was
 * the hub. Before that, a previous/next pair through the reading sequence. Both
 * were solutions to the same problem - the hub was the only way to choose a
 * reading, so every screen needed a route back to it - and the problem is gone
 * rather than solved. There is nothing to go back TO now: every destination is
 * one tap away from every other, from the strip that is always on screen.
 *
 * IT IS NOT A NEW COMPONENT. Each capsule is the existing
 * `.kt-pillar-nav-button` - the same glass, the same 999px radius, the same
 * uppercase 11px label, the same accent rim and glow. What is added is the
 * active state and the fact that there are six of them in a scroller.
 *
 * SCROLLED, NOT SHRUNK, ON A PHONE. Six labels do not fit across 375px, and the
 * two ways to make them fit - truncating them, or dropping to icons - both cost
 * the reader the ability to tell BaZi from Human Design at a glance. The strip
 * scrolls sideways inside itself instead, which keeps every label whole and
 * every target past the 44px floor. The active capsule is scrolled into view by
 * the controller, so the current destination is never off-screen.
 *
 * `aria-current="page"` rather than a tablist role: these are destinations, and
 * each renders a whole screen rather than a panel that exists in the DOM
 * alongside its siblings.
 */
export function renderPremiumPillarNav(experience, activeId) {
    if (!PROFILE_DESTINATIONS.some((stop) => stop.id === activeId))
        return '';
    void experience;
    /* The Main Menu replaced the destination strip as the product interface.
       Inside a module there is one way home, not a second competing tab system. */
    if (activeId === PREMIUM_MENU_STAGE)
        return '';
    return `<div class="kt-nav-strip kt-nav-home" aria-label="${escapeAttribute(t('nav.aria'))}">
      <button class="kt-pillar-nav-button kt-nav-stop" type="button" data-menu-open data-nav-stop="${escapeAttribute(PREMIUM_MENU_STAGE)}">
        <span class="kt-pillar-nav-label">${escapeHtml(t('nav.menu'))}</span>
      </button>
    </div>`;
}
export const premiumPillarOrder = () => [...PILLAR_ORDER];
