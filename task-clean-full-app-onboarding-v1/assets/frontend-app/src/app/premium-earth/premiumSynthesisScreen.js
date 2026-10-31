import { escapeHtml } from '../format.js?v=f9ab0a6';
import { localityOf } from './avatarStore.js?v=f9ab0a6';
import { engineProse } from '../i18n/engineProse.js?v=f9ab0a6';
import { t, tf } from '../i18n/uiStrings.js?v=f9ab0a6';
import { themeLabel } from '../knowledge/translations/themeLabels.js?v=f9ab0a6';
/*
 * THE CROSS-PILLAR SYNTHESIS SCREEN
 * ---------------------------------
 * The last screen in the pillar flow, and deliberately not a fifth pillar.
 *
 * WHAT THIS FILE IS ALLOWED TO DO
 *
 * Render `ProfileExperience.crossPillarReading` and the `unifiedPattern`
 * derived from it. That is the whole remit. There is no synthesis logic here:
 * no theme is selected, no support level is decided, no sentence about the
 * reader is composed. Everything displayed was produced by the synthesis
 * composer, which was produced by the synthesis foundation, which read the four
 * pillar engines. A test asserts this file contains no filtering or ranking of
 * themes.
 *
 * WHY IT REUSES THE PILLAR CLASSES EXACTLY
 *
 * `kt-pillar-view`, `kt-reading-section`, `kt-reading-entry`, `kt-technical` -
 * all of it is the pillar screens' markup vocabulary, unchanged. The synthesis
 * is the culmination of the four readings, so it should look like the same
 * document continuing rather than like a different product. No new visual
 * language is introduced; the only additions are two modifier classes that
 * change nothing structural.
 *
 * WHERE THE EVIDENCE GOES
 *
 * The evidence chain runs to well over a hundred rows on a complete chart. It
 * is the audit trail behind every theme and it is not reading material, so it
 * lives inside the one technical disclosure, closed by default, grouped by
 * theme, exactly like a pillar's technical appendix. A test asserts no evidence
 * row appears in the narrative sections.
 */
/* ------------------------------------------------------------------ shared */
/*
 * Display names, taken from the DICTIONARY rather than kept here.
 *
 * The synthesis used to hold its own copy of the four names while the hub read
 * them from uiStrings. Two lists of the same four strings is one list too many:
 * the moment either is edited, a reader meets the same pillar under two names on
 * adjacent screens. The map below is only the id translation - the synthesis
 * coverage arrays use 'astrology' and 'bazi' where the rest of the app uses
 * 'western-astrology' and 'bazi-tcm'.
 */
const PILLAR_KEY = {
    numerology: 'numerology',
    astrology: 'western-astrology',
    bazi: 'bazi-tcm',
    'human-design': 'human-design',
};
const pillarLabel = (pillar) => {
    const key = PILLAR_KEY[pillar];
    return key ? t(`pillar.${key}.title`) : pillar;
};
const PILLAR_ORDER = ['numerology', 'astrology', 'bazi', 'human-design'];
const namePillars = (pillars) => PILLAR_ORDER
    .filter((pillar) => pillars.includes(pillar))
    .map((pillar) => pillarLabel(pillar))
    .join(', ');
const renderParagraphs = (paragraphs) => paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph.text)}</p>`).join('');
/*
 * WHERE A SECTION CAME FROM, FOR THE READER WHO ASKS.
 *
 * The reading names no placements any more, which is the point of it - and
 * `where is this coming from` is a fair question to have while reading a
 * sentence about yourself. Four tradition names answer it. What the answer is
 * NOT is a weighting model: the results, their weights and their discounts are
 * two disclosures further down, for somebody who wants that instead.
 *
 * Deliberately the same quiet `.kt-technical` disclosure the workings use, at
 * the foot of a section rather than in front of it, so a reader who does not
 * care never has to decline it - and with no class of its own, because the
 * synthesis screen and the four pillar screens share one visual vocabulary and
 * a test holds them to it.
 */
function renderWhy(section) {
    const sources = section.sources ?? [];
    if (sources.length === 0)
        return '';
    return `
      <details class="kt-technical" id="why-${escapeHtml(section.id)}">
        <summary><span class="kt-technical-title">${escapeHtml(t('synthesis.why'))}</span></summary>
        <div class="kt-technical-body"><p>${escapeHtml(tf('synthesis.whyNote', { pillars: namePillars(sources) }))}</p></div>
      </details>`;
}
function renderEntry(entry) {
    return `
    <article class="kt-reading-entry" id="${escapeHtml(entry.id)}">
      <header class="kt-reading-entry-head">
        <h4>${escapeHtml(entry.title)}</h4>
      </header>
      ${entry.standfirst
        ? `<p class="kt-reading-standfirst">${escapeHtml(entry.standfirst)}</p>` : ''}
      ${renderParagraphs(entry.paragraphs)}
    </article>`;
}
/**
 * One section, in the order the reading declared.
 *
 * The reading model already omits empty sections, so there is no emptiness
 * check here - adding one would silently hide a section the composer meant to
 * show, and the composer is the layer entitled to that decision.
 */
/*
 * THE READING, THEN ONE PLACE FOR EVERYTHING BELOW THE CUT.
 *
 * The same shape the four pillars use, for the same reason: a reader should
 * meet one disclosure hierarchy in this product, not a different one per tab.
 * Sections the composer marked `deep` are the ranked remainder - the fourth
 * convergence, the fifth and sixth tensions - and they go into a single "Go
 * deeper" card rather than trailing as five more headings.
 *
 * `collapsed` sections are left exactly where they are. They are statements
 * about the model rather than about the reader, they already have their own
 * quiet card, and folding them in with the reading's own overflow would file
 * the weighting explanation next to a tension.
 */
function renderSectionLayers(sections) {
    /*
     * ONE HIERARCHY, AND THE PORTRAIT HAD FOUR CARDS.
     *
     * Orientation, domains, the deep dive and the technical appendix: four
     * separate things to open, each looking like the others, in the product's
     * most important reading. The four pillars have two, in a fixed order, and a
     * reader who has learned that shape on the Astrology tab should not have to
     * learn a different one on the Portrait.
     *
     * So the ranked remainder and the domain index - which are the same material
     * as the reading, filed lower - go into one "Go deeper". Orientation is a
     * statement about the model, so it belongs with the technical appendix below
     * and is left to render there. Two cards, same order, same vocabulary.
     */
    const inDeepDive = (section) => (Boolean(section.deep) || section.id === 'domains');
    /* `orientation` is how the reading was built - the weighting, the discounting,
       the thresholds, the tension taxonomy. That is the third depth, not the
       second, so it renders inside the technical appendix below rather than as a
       card of its own between the reading and it. */
    /* `caveats` and `portrait` are rendered in the card at the top, where the
       reading opens; printing them here as well would be the opening twice. */
    const inCard = (section) => (section.id === 'caveats' || section.id === 'portrait');
    const main = sections.filter((section) => !inDeepDive(section)
        && section.id !== 'orientation' && section.id !== 'limits' && !inCard(section));
    const deep = sections.filter(inDeepDive);
    const rendered = main.map(renderSection).join('');
    if (deep.length === 0)
        return rendered;
    return `${rendered}
    <details class="kt-technical kt-deep-dive" id="portrait-deep-dive">
      <summary>
        <span class="kt-technical-title">${escapeHtml(t('ui.deepDive'))}</span>
        <span class="kt-technical-sub">${escapeHtml(t('synthesis.deepDive.sub'))}</span>
      </summary>
      <div class="kt-technical-body">${deep.map((section) => `
        <section class="kt-reading-section" id="section-${escapeHtml(section.id)}">
          <h2>${escapeHtml(section.heading)}</h2>
          ${section.standfirst
        ? `<p class="kt-reading-standfirst">${escapeHtml(section.standfirst)}</p>` : ''}
          ${renderParagraphs(section.paragraphs)}
          ${(section.entries ?? []).map(renderEntry).join('')}
        </section>`).join('')}</div>
    </details>`;
}
function renderSection(section) {
    const body = `
      ${renderParagraphs(section.paragraphs)}
      ${(section.entries ?? []).map(renderEntry).join('')}`;
    /*
     * THE WORKINGS GET THE DISCLOSURE THE APPENDIX ALREADY USES.
     *
     * No new visual vocabulary here: `.kt-technical` is the same quiet card, the
     * same +/- affordance and the same uppercase title over a muted sub-line that
     * the technical appendix below has always been rendered in. A section the
     * composer marked `collapsed` is a statement about the model rather than
     * about the reader, so it belongs to that family - which is also why it is
     * not additionally wrapped in `.kt-reading-section`, whose milky pane is the
     * material the reading itself is set on.
     *
     * The heading moves into the <summary> and stops being an <h2>. That is the
     * point: the outline a reader skims should be the reading.
     */
    if (section.collapsed) {
        return `
    <details class="kt-technical" id="section-${escapeHtml(section.id)}">
      <summary>
        <span class="kt-technical-title">${escapeHtml(section.heading)}</span>
        ${section.standfirst
            ? `<span class="kt-technical-sub">${escapeHtml(section.standfirst)}</span>` : ''}
      </summary>
      <div class="kt-technical-body">${body}</div>
    </details>`;
    }
    return `
    <section class="kt-reading-section" id="section-${escapeHtml(section.id)}">
      <h2>${escapeHtml(section.heading)}</h2>
      ${section.standfirst ? `<p class="kt-reading-standfirst">${escapeHtml(section.standfirst)}</p>` : ''}
      ${body}
    </section>`;
}
/* ------------------------------------------------------- the summary card */
/*
 * THE CARD IS THE OPENING OF THE READING, AND NOTHING ELSE.
 *
 * It used to be the model's own summary of itself, in the most prominent place
 * on the screen: the highest-salience theme's label as a headline - over a
 * paragraph that was usually about a different axis entirely - then six handle
 * chips, then every tension as a raw classification, `Autonomy: independent
 * against collaborative (true tension)`, seven or nine of them. A reader met
 * the feature vector before a word had been said to them, and then met the
 * same themes again below.
 *
 * Now: if the birth time had to be estimated, one line saying so with the full
 * explanation a tap away - the uncertainty first, but not as a preamble. Then
 * the portrait's opening. Then one `Why this appears` for the whole reading,
 * where there used to be one after every section saying the same thing.
 * The classifications, counts and labels are all still in Technical details.
 */
function renderSummary(reading) {
    const caveats = reading.sections.find((section) => section.id === 'caveats');
    const portrait = reading.sections.find((section) => section.id === 'portrait');
    if (!caveats && !portrait)
        return '';
    /* No portrait: say so in the card's own voice, above the caveats that explain
       why, rather than leaving a card with nothing to open on. */
    const noReading = portrait ? ''
        : `<p class="kt-pillar-card-eyebrow">${escapeHtml(t('synthesis.noConvergence'))}</p>`;
    const caveatBlock = !caveats ? '' : caveats.notice
        ? `
      <p class="kt-reading-standfirst">${escapeHtml(caveats.notice)}</p>
      <details class="kt-technical" id="why-caveats">
        <summary><span class="kt-technical-title">${escapeHtml(t('synthesis.notice.why'))}</span></summary>
        <div class="kt-technical-body">${renderParagraphs(caveats.paragraphs)}</div>
      </details>`
        : renderParagraphs(caveats.paragraphs);
    return `
    <section class="kt-reading-section kt-synthesis-summary" id="section-summary">
      ${noReading}
      ${caveatBlock}
      ${portrait ? `
      <p class="kt-pillar-card-eyebrow">${escapeHtml(portrait.heading)}</p>
      ${renderParagraphs(portrait.paragraphs)}
      ${renderWhy(portrait)}` : ''}
    </section>`;
}
/* ------------------------------------------------------ technical disclosure */
/** Evidence rows, grouped by the theme they support. Never in the narrative. */
function renderEvidence(rows) {
    if (rows.length === 0)
        return '';
    const byTheme = new Map();
    for (const row of rows) {
        const existing = byTheme.get(row.themeLabel);
        if (existing)
            existing.push(row);
        else
            byTheme.set(row.themeLabel, [row]);
    }
    /*
     * THE THREE ENGLISH FRAGMENTS THAT LIVED HERE.
     *
     * `weight`, `discounted as corroborating evidence` and the raw dimension slug
     * were written into the markup rather than looked up, so a Slovak reader who
     * opened the evidence chain met „Numerológia · assertive" and „weight 0.025 ·
     * discounted as corroborating evidence" ninety-odd times. The dimension slug
     * is the same axis the reading already names in Slovak two sections above -
     * the translation existed, this line simply never asked for it.
     *
     * The knowledge unit id keeps the slug, unchanged, so the row is still
     * greppable against the knowledge base.
     */
    const groups = [...byTheme.entries()].map(([label, themeRows]) => `
    <div class="kt-tech-group">
      <h4>${escapeHtml(label)} (${themeRows.length})</h4>
      <dl>${themeRows.map((row) => `
        <div class="kt-tech-field">
          <dt>${escapeHtml(pillarLabel(row.pillar))} · ${escapeHtml(t(`synthesis.compose.pole.${row.dimension}`) || row.dimension)}</dt>
          <dd>${escapeHtml(engineProse(row.fact))}</dd>
          <dd class="kt-tech-note">${escapeHtml(t('synthesis.tech.weight'))} ${row.countedWeight.toFixed(3)}${row.discounted ? ` · ${escapeHtml(t('synthesis.tech.discounted'))}` : ''}${row.methodology === 'calculated' ? '' : ` · ${escapeHtml(row.methodology)}`}${row.knowledgeUnitId ? ` · ${escapeHtml(row.knowledgeUnitId)}` : ''}</dd>
        </div>`).join('')}</dl>
    </div>`).join('');
    return groups;
}
function renderTechnical(reading) {
    const { coverage } = reading.source;
    const field = (label, value, note) => `
    <div class="kt-tech-field">
      <dt>${escapeHtml(label)}</dt>
      <dd>${escapeHtml(value)}</dd>
      ${note ? `<dd class="kt-tech-note">${escapeHtml(note)}</dd>` : ''}
    </div>`;
    const coverageGroup = `
    <div class="kt-tech-group">
      <h4>${t('synthesis.tech.coverage')}</h4>
      <dl>
        ${field(t('synthesis.tech.systemsIncluded'), namePillars(coverage.pillarsPresent) || t('synthesis.tech.none'))}
        ${field(t('synthesis.tech.systemsMissing'), namePillars(coverage.pillarsMissing) || t('synthesis.tech.none'))}
        ${field(t('synthesis.tech.evidenceWeighed'), String(coverage.evidenceCount))}
        ${field(t('synthesis.tech.suppressed'), String(coverage.suppressedEvidenceCount), t('synthesis.tech.suppressedNote'))}
        ${field(t('synthesis.tech.timeSensitive'), String(coverage.timeSensitiveEvidenceCount), t('synthesis.tech.timeSensitiveNote'))}
        ${field(t('synthesis.tech.birthTime'), coverage.birthTimeEstimated
        ? t('synthesis.tech.birthTimeEstimated')
        : coverage.birthTimePrecision === 'approximate'
            ? t('synthesis.tech.birthTimeApproximate') : t('synthesis.tech.birthTimeSupplied'))}
        ${field(t('synthesis.tech.themesReported'), String(reading.source.themes.length))}
        ${field(t('synthesis.tech.themesBelow'), String(reading.source.subThresholdThemes.length), reading.source.subThresholdThemes.length > 0
        /* Through the same translator the reading uses. The sentence around them
           is localized, so raw model labels printed inside it produced one
           Slovak sentence with English theme names in the middle of it. */
        ? tf('synthesis.tech.themesBelowNote', {
            themes: reading.source.subThresholdThemes
                .map((theme) => themeLabel(theme.label)).join(', '),
        })
        : t('synthesis.tech.none'))}
        ${field(t('synthesis.tech.axesContested'), String(reading.source.tensions.length))}
      </dl>
    </div>`;
    const methodGroup = `
    <div class="kt-tech-group">
      <h4>${t('synthesis.tech.method')}</h4>
      <dl>
        ${field(t('synthesis.tech.model'), reading.modelVersion)}
        ${field(t('synthesis.tech.pipeline'), t('synthesis.tech.pipelineNote'))}
        ${field(t('synthesis.tech.determinism'), t('synthesis.tech.determinismNote'))}
      </dl>
      <p class="kt-source-ref">${escapeHtml(t('synthesis.tech.reference'))}</p>
    </div>`;
    const evidence = renderEvidence(reading.evidenceChain);
    const evidenceHead = evidence === '' ? '' : `
    <div class="kt-tech-group">
      <h4>${tf('synthesis.tech.evidenceChain', { count: reading.evidenceChain.length })}</h4>
      <p class="kt-tech-note">${t('synthesis.tech.evidenceChainNote')}</p>
    </div>`;
    /* Method and scope belong with the evidence, not as the final word of the personal reading. */
    const orientation = reading.sections.find((section) => section.id === 'orientation');
    const orientationGroup = !orientation ? '' : `
    <div class="kt-tech-group" id="section-${escapeHtml(orientation.id)}">
      <h4>${escapeHtml(orientation.heading)}</h4>
      ${orientation.standfirst
        ? `<p class="kt-tech-note">${escapeHtml(orientation.standfirst)}</p>` : ''}
      ${renderParagraphs(orientation.paragraphs)}
      ${(orientation.entries ?? []).map(renderEntry).join('')}
    </div>`;
    const limits = reading.sections.find((section) => section.id === 'limits');
    const limitsGroup = !limits ? '' : `
    <div class="kt-tech-group" id="section-${escapeHtml(limits.id)}">
      <h4>${escapeHtml(limits.heading)}</h4>
      ${limits.standfirst ? `<p class="kt-tech-note">${escapeHtml(limits.standfirst)}</p>` : ''}
      ${renderParagraphs(limits.paragraphs)}
      ${(limits.entries ?? []).map(renderEntry).join('')}
    </div>`;
    return `
    <details class="kt-technical">
      <summary>
        <span class="kt-technical-title">${t('synthesis.tech.summary')}</span>
        <span class="kt-technical-sub">${t('synthesis.tech.summarySub')}</span>
      </summary>
      <div class="kt-technical-body">
        ${orientationGroup}${limitsGroup}${coverageGroup}${methodGroup}${evidenceHead}${evidence}
      </div>
    </details>`;
}
/* ------------------------------------------------------------- the screen */
/**
 * Rendered when the profile has no composed reading at all.
 *
 * Only reachable on the benchmark demo, which reproduces a documented synthesis
 * rather than calculating one. It says that, rather than showing a spinner or
 * inventing a summary - and it never says the archetype is pending.
 */
function renderUnavailable() {
    return `
    <article class="kt-pillar-view kt-reading" data-pillar="cross-pillar-synthesis">
      <header class="kt-pillar-head">
        <h1>${t('synthesis.title')}</h1>
        <p class="kt-pillar-status">${t('synthesis.notCalculated')}</p>
      </header>
      <section class="kt-reading-section">
        <p>${escapeHtml(t('synthesis.benchmarkNote'))}</p>
        <p>${escapeHtml(t('synthesis.pillarsStillComplete'))}</p>
      </section>
    </article>`;
}
export function renderPremiumSynthesisView(experience) {
    const reading = experience.crossPillarReading;
    if (!reading)
        return renderUnavailable();
    const pattern = experience.unifiedPattern;
    /* Word form, to match the reading's own prose. "4 of four systems" is the
       kind of mixed numeral that makes a designed page look generated. */
    const n = pattern.includedPillars.length;
    const count = n >= 0 && n <= 4
        ? t(`synthesis.count.${n}`)
        : String(n);
    /* `Synthesised from four of four systems` read as complete coverage on a
       profile whose Western Astrology and Human Design were calculated from a
       guessed hour. The count is still true; it is no longer the whole truth. */
    const coverageLine = n === 4 ? t('synthesis.synthesisedAll') : tf('synthesis.synthesisedFrom', { count });
    /* Keyed on how many traditions actually ran, not on a support threshold: a
       chart with four traditions and only modest themes still gets a full
       portrait, and a header announcing `limited` above it would contradict the
       page. */
    /* No time is never called an estimate, and an estimate is never left unmarked. */
    const timeStatus = reading.source.coverage.birthTimeEstimated ? t('synthesis.statusEstimated')
        : reading.source.coverage.birthTimePrecision === 'approximate' ? t('synthesis.statusApproximate') : '';
    const status = reading.source.coverage.pillarsPresent.length >= 2
        ? `${coverageLine}${timeStatus}`
        : t('synthesis.limitedNoConvergence');
    /*
     * THE PORTRAIT CARRIES THE PROFILE'S OWN IDENTITY.
     *
     * Name, birthplace and the route into the details used to live on the hub,
     * which was the screen a finished profile opened on. The hub is gone and the
     * portrait is that screen now, so the three moved here rather than being
     * dropped: this is where a reader looks to confirm the reading is about them,
     * and where they go when a birth time turns out to be wrong.
     *
     * `data-pillar-review` is the same attribute the hub used, claimed by the same
     * listener. Only its position changed.
     */
    const name = escapeHtml(experience.input.fullName || '');
    /*
     * THE SAME ADDRESS RULE THE PROFILE FOLLOWS.
     *
     * `resolvedPlaceLabel` is whatever the geocoder returned for the point that
     * was picked, and a map tap returns a doorstep: "SNP 2103/19, 934 01 Levice,
     * Slovensko". That is the right value to CALCULATE from and the wrong one to
     * print at the top of the reading - it was the most prominent place in the
     * product a street address could appear.
     *
     * The coordinates are untouched; only the line changes. Reported rather than
     * silently altered: the profile task asked for locality-only in the profile,
     * and hiding the address there while the hero screen printed it would have
     * been a privacy rule that was only half applied.
     */
    const place = escapeHtml(localityOf(experience.input.resolvedPlaceLabel ?? experience.input.birthPlaceText ?? '', experience.input.birthCountry));
    return `
    <article class="kt-pillar-view kt-reading is-bare" data-pillar="cross-pillar-synthesis">
      <header class="kt-pillar-head kt-portrait-head">
        <h1 class="kt-quiet-title">${t('synthesis.title')}</h1>
        ${name ? `<p class="kt-portrait-identity">${name}${place ? ` &middot; ${place}` : ''}</p>` : ''}
        ${ /* "Read from all four traditions" is a presentation line; the status is shown only when it says something the
         portrait would otherwise hide - fewer than four traditions, or a birth time that is missing or approximate. */''}
        ${n === 4 && !timeStatus ? '' : `<p class="kt-pillar-status">${escapeHtml(status)}</p>`}
        <button class="kt-portrait-review" type="button" data-pillar-review>
          ${escapeHtml(t('onb.action.reviewDetails'))}
        </button>
      </header>

      ${reading.introduction.length > 0
        ? `<div class="kt-reading-intro">${reading.introduction
            .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}</div>`
        : ''}

      ${renderSummary(reading)}

      ${renderSectionLayers(reading.sections)}

      ${renderTechnical(reading)}
    </article>`;
}
