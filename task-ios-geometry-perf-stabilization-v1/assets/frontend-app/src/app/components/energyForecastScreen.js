/**
 * ENERGY FORECAST — experimental pillar screen.
 *
 * Renders the precomputed forecast dataset at four temporal zoom levels. This
 * component reads stored values only; the sole derived layers are the WEEK view
 * and the constellation, both produced by periodAggregation.ts and labelled as
 * UI aggregation on screen.
 *
 * Information hierarchy (pass 2):
 *   A  hero      — period, dominant theme, ambient background, three primary meters
 *   B  balances  — the three bipolar axes, compact
 *   C  time      — timeline and calendar (the core interaction)
 *   D  windows   — one combined KEY WINDOWS section, categorised
 *   E  field     — Five Phase and Energy Constellation
 *   F  detail    — provenance, collapsed
 */
import { escapeHtml } from '../format.js?v=d9f39e7';
import { longDateLabel, monthDatesOf, monthLabel, shortDateLabel, weekDatesOf, } from '../energy-forecast/forecastDataset.js?v=d9f39e7';
import { aggregateDays, buildConstellation } from '../energy-forecast/periodAggregation.js?v=d9f39e7';
import { renderAxisMeters, renderPrimaryGauges } from './energy-forecast/gauges.js?v=d9f39e7';
import { renderDailyTimeline, renderWeekStrip, renderYearRibbon } from './energy-forecast/charts.js?v=d9f39e7';
import { renderMonthCalendar, ELEMENT_ORDER } from './energy-forecast/calendar.js?v=d9f39e7';
import { renderConstellation, renderConstellationFocus } from './energy-forecast/constellation.js?v=d9f39e7';
import { renderElementWheel } from './energy-forecast/elementWheel.js?v=d9f39e7';
const VIEWS = [
    { id: 'year', label: 'Year' },
    { id: 'month', label: 'Month' },
    { id: 'week', label: 'Week' },
    { id: 'day', label: 'Day' },
];
export function renderEnergyForecastScreen(ef) {
    if (ef.status === 'error') {
        return shell(ef, `<div class="ef-notice is-error"><h2>Forecast dataset unavailable</h2><p>${escapeHtml(ef.error ?? 'Unknown error.')}</p><p class="ef-notice-hint">The prototype dataset is served from <code>/data/energy-forecast.json</code> and is copied into <code>dist</code> by the build. Run <code>npm run build</code> and reload.</p></div>`);
    }
    if (ef.status !== 'ready' || !ef.index) {
        return shell(ef, '<div class="ef-notice is-loading"><span class="ef-spinner" aria-hidden="true"></span><p>Loading forecast dataset…</p></div>');
    }
    const index = ef.index;
    const body = ef.view === 'year' ? renderYearView(ef, index)
        : ef.view === 'month' ? renderMonthView(ef, index)
            : ef.view === 'week' ? renderWeekView(ef, index)
                : renderDayView(ef, index);
    return shell(ef, `${body}${renderDisclosure(index)}`, index);
}
// ---------------------------------------------------------------------------
// Shell, header, navigation
// ---------------------------------------------------------------------------
function shell(ef, body, index) {
    return `<section class="energy-forecast" aria-label="Energy Forecast">
    <header class="ef-header">
      <div class="ef-header-title">
        <p class="ef-eyebrow">Energy Forecast <span class="ef-badge">Experimental</span></p>
        <h1>${escapeHtml(periodHeading(ef, index))}</h1>
        ${periodContext(ef, index)}
      </div>
      ${renderViewSwitcher(ef)}
    </header>
    <div class="ef-body">${body}</div>
  </section>`;
}
function renderViewSwitcher(ef) {
    return `<div class="ef-controls">
    <div class="ef-view-switch" role="group" aria-label="Forecast zoom level">
      ${VIEWS.map((view) => `<button type="button" class="ef-view-button${ef.view === view.id ? ' is-active' : ''}" data-action="ef-set-view" data-view="${view.id}" aria-pressed="${ef.view === view.id}">${view.label}</button>`).join('')}
    </div>
    ${ef.view === 'year' ? '' : `<div class="ef-stepper" role="group" aria-label="Move period">
      <button type="button" class="ef-step-button" data-action="ef-step" data-step="-1" aria-label="Previous ${ef.view}">&#8592;</button>
      <button type="button" class="ef-step-button" data-action="ef-step" data-step="1" aria-label="Next ${ef.view}">&#8594;</button>
    </div>`}
  </div>`;
}
function periodHeading(ef, index) {
    if (!index)
        return 'Energy Forecast';
    if (ef.view === 'year')
        return index.dataset.year.label;
    if (ef.view === 'month')
        return monthLabel(ef.selectedMonth);
    if (ef.view === 'week') {
        const dates = weekDatesOf(ef.selectedDate);
        return `${shortDateLabel(dates[0])} – ${shortDateLabel(dates[6])}`;
    }
    return longDateLabel(ef.selectedDate);
}
/** One short orienting line under the title. Technical detail lives in the footer disclosure. */
function periodContext(ef, index) {
    if (!index)
        return '';
    if (ef.view === 'year') {
        return `<p class="ef-subtitle">Daily detail from ${escapeHtml(index.firstDetailedDate)}. Earlier months carry year-level aggregates only.</p>`;
    }
    if (ef.view === 'week') {
        return '<p class="ef-subtitle">UI aggregation of this week’s daily records — the engine stores no weekly layer.</p>';
    }
    if (ef.view === 'day') {
        const day = index.byDate.get(ef.selectedDate);
        return day ? `<p class="ef-subtitle">${escapeHtml(day.shortSummary)}</p>` : '';
    }
    return '';
}
/**
 * Technical provenance, collapsed. It has to stay reachable — the whole point of
 * the model is auditability — but in pass 1 it sat above the forecast and made
 * the screen read as a debug view.
 */
function renderDisclosure(index) {
    const meta = index.dataset.meta;
    const capabilities = index.dataset.capabilities;
    return `<details class="ef-disclosure">
    <summary><span class="ef-disclosure-mark" aria-hidden="true"></span>Data &amp; methodology</summary>
    <div class="ef-disclosure-body">
      <dl class="ef-disclosure-grid">
        <div><dt>Source</dt><dd>scratch-energy-forecast/boris-2026-forecast.json</dd></div>
        <div><dt>Model</dt><dd>${escapeHtml(meta.prototypeVersion)}</dd></div>
        <div><dt>Subject</dt><dd>${escapeHtml(meta.generatedFor)} · report date ${escapeHtml(meta.reportDate)}</dd></div>
        <div><dt>Transit sampling</dt><dd>${escapeHtml(meta.transitSampling.localTime)} ${escapeHtml(meta.transitSampling.timeZone)}</dd></div>
        <div><dt>Daily records</dt><dd>${index.detailedDates.length} (${escapeHtml(meta.outputRange.start)} → ${escapeHtml(meta.outputRange.end)})</dd></div>
        <div><dt>Determinism</dt><dd>${meta.deterministic ? 'Deterministic — same inputs give the same output' : 'Unknown'}</dd></div>
      </dl>
      <p class="ef-disclosure-note">Visualisation only — no value on this screen is recalculated. ${escapeHtml(meta.transitSampling.note)}</p>
      <div class="ef-disclosure-columns">
        <div>
          <h4>Computed by the live engines</h4>
          <ul>${capabilities.usable.map((entry) => `<li><strong>${escapeHtml(entry.system)}</strong><em>${escapeHtml(entry.engine)}</em></li>`).join('')}</ul>
        </div>
        <div>
          <h4>Not computable — recorded, never faked</h4>
          <ul>${capabilities.notComputable.map((entry) => `<li><strong>${escapeHtml(entry.system)}</strong><em>${escapeHtml(entry.reason)}</em></li>`).join('')}</ul>
        </div>
      </div>
      <p class="ef-disclaimer">${escapeHtml(meta.disclaimer)}</p>
    </div>
  </details>`;
}
function renderHero(signature, values, gaugeCaption) {
    return `<section class="ef-hero">
    <div class="ef-hero-signature">
      <p class="ef-hero-eyebrow">${escapeHtml(signature.eyebrow)}</p>
      <h2 class="ef-hero-theme">${escapeHtml(signature.dominantTheme)}</h2>
      ${signature.coDominantTheme ? `<p class="ef-hero-codominant">Co-dominant with <strong>${escapeHtml(signature.coDominantTheme)}</strong> — the model does not separate them here</p>` : ''}
      ${signature.ambientTheme ? `<p class="ef-hero-ambient"><em>Ambient background</em>${escapeHtml(signature.ambientTheme)}</p>` : ''}
      ${signature.secondaryThemes.length > 0 ? `<ul class="ef-chip-row">${signature.secondaryThemes.map((theme) => `<li class="ef-chip">${escapeHtml(theme)}</li>`).join('')}</ul>` : ''}

      <div class="ef-hero-facts">
        <span class="ef-hero-fact"><em>Element</em><i class="ef-element-dot is-${(signature.dominantElement ?? 'earth').toLowerCase()}"></i>${escapeHtml(signature.dominantElement ?? 'Unavailable')}</span>
        <span class="ef-hero-fact"><em>Traditional correspondence</em>${escapeHtml(signature.bodyCorrespondence ?? 'Unavailable')}</span>
        <span class="ef-hero-fact is-wide"><em>Emotional mirror</em>${escapeHtml(signature.emotionalMirror ?? 'Unavailable')}</span>
      </div>

      <div class="ef-expression-pair">
        <div class="ef-expression is-constructive"><span>Constructive</span><p>${escapeHtml(signature.constructive ?? '—')}</p></div>
        <div class="ef-expression is-shadow"><span>Shadow</span><p>${escapeHtml(signature.shadow ?? '—')}</p></div>
      </div>
      ${signature.footnote ? `<p class="ef-footnote">${escapeHtml(signature.footnote)}</p>` : ''}
    </div>
    <div class="ef-hero-meters">
      ${renderPrimaryGauges(values, gaugeCaption)}
    </div>
  </section>
  <section class="ef-balances">${renderAxisMeters(values)}</section>`;
}
function panel(title, body, note, extraClass = '') {
    return `<section class="ef-panel ${extraClass}">
    <header class="ef-panel-head"><h3>${escapeHtml(title)}</h3>${note ? `<p>${escapeHtml(note)}</p>` : ''}</header>
    ${body}
  </section>`;
}
function renderNoDataBanner(message) {
    return `<div class="ef-notice is-nodata"><h2>No detailed forecast data</h2><p>${escapeHtml(message)}</p></div>`;
}
// ---------------------------------------------------------------------------
// Field: Five Phase + Constellation
// ---------------------------------------------------------------------------
function renderFieldSection(days, periodLabel, focusedSystem, elementScores, dominantElement, unitLabel, bodyCorrespondence, emotionalMirror, aggregationNote) {
    const wheel = panel('Five Phase', renderElementWheel({
        scores: elementScores,
        dominantElement,
        unitLabel,
        bodyCorrespondence,
        emotionalMirror,
    }), undefined, 'ef-panel--wuxing');
    if (days.length === 0) {
        return `<div class="ef-field">${wheel}${panel('Energy Constellation', '<p class="ef-empty">No detailed daily records in this period, so no system contributions can be shown.</p>', undefined, 'ef-panel--constellation')}</div>`;
    }
    const model = buildConstellation(days);
    const constellation = `<section class="ef-panel ef-panel--constellation">
    <header class="ef-panel-head">
      <h3>Energy Constellation</h3>
      ${aggregationNote ? `<p>${escapeHtml(aggregationNote)}</p>` : ''}
    </header>
    <div class="ef-constellation-layout">
      ${renderConstellation({ model, periodLabel, focusedSystem })}
      ${renderConstellationFocus(model, focusedSystem, periodLabel)}
    </div>
  </section>`;
    return `<div class="ef-field">${wheel}${constellation}</div>`;
}
/**
 * Pass 1 gave strongest dates, convergence windows, quiet runs and transition
 * dates four equal cards, several of them nearly empty. They are all "when
 * something happens", so they now share one chronological, categorised list.
 */
function renderKeyWindows(window) {
    const entries = [
        ...window.strongestDates.slice(0, 5).map((entry) => ({
            category: 'peak',
            categoryLabel: 'Peak',
            start: entry.date,
            rangeLabel: shortDateLabel(entry.date),
            headline: entry.theme,
            detail: `Intensity ${entry.intensity} · convergence ${entry.convergence}`,
            targetDate: entry.date,
        })),
        ...window.strongestConvergenceWindows.map((entry) => ({
            category: 'convergence',
            categoryLabel: 'Convergence',
            start: entry.start,
            rangeLabel: `${shortDateLabel(entry.start)} → ${shortDateLabel(entry.end)}`,
            headline: entry.dominantTheme,
            detail: `${entry.days} days · mean convergence ${entry.meanConvergence} · mean intensity ${entry.meanIntensity}`,
            targetDate: entry.start,
        })),
        ...window.quieterIntegrationPeriods.map((entry) => ({
            category: 'integration',
            categoryLabel: 'Integration',
            start: entry.start,
            rangeLabel: `${shortDateLabel(entry.start)} → ${shortDateLabel(entry.end)}`,
            headline: 'Quieter run',
            detail: `${entry.days} days in the month’s lowest intensity quartile`,
            targetDate: entry.start,
        })),
        ...window.transitionDates.map((entry) => ({
            category: 'transition',
            categoryLabel: 'Transition',
            start: entry.date,
            rangeLabel: shortDateLabel(entry.date),
            headline: entry.events[0] ?? 'Event',
            detail: entry.events.slice(1).join(' · '),
            targetDate: entry.date,
        })),
    ].sort((left, right) => left.start.localeCompare(right.start) || left.category.localeCompare(right.category));
    if (entries.length === 0)
        return panel('Key windows', '<p class="ef-empty">No peaks, convergence windows, quiet runs or events recorded in this period.</p>');
    const counts = entries.reduce((totals, entry) => {
        totals[entry.category] = (totals[entry.category] ?? 0) + 1;
        return totals;
    }, {});
    return panel('Key windows', `
    <div class="ef-window-key">
      ${['peak', 'convergence', 'integration', 'transition']
        .filter((category) => counts[category])
        .map((category) => `<span class="ef-window-tag is-${category}">${category}<i>${counts[category]}</i></span>`).join('')}
    </div>
    <ul class="ef-key-windows">
      ${entries.map((entry) => `<li class="is-${entry.category}">
        <button type="button" data-action="ef-select-date" data-date="${entry.targetDate}">
          <span class="ef-window-tag is-${entry.category}">${escapeHtml(entry.categoryLabel)}</span>
          <span class="ef-window-range">${escapeHtml(entry.rangeLabel)}</span>
          <span class="ef-window-headline">${escapeHtml(entry.headline)}</span>
          <span class="ef-window-detail">${escapeHtml(entry.detail)}</span>
        </button>
      </li>`).join('')}
    </ul>`, 'Peaks, convergence runs, integration lulls and event dates in one chronology.');
}
// ---------------------------------------------------------------------------
// YEAR
// ---------------------------------------------------------------------------
function renderYearView(ef, index) {
    const { dataset } = index;
    const year = dataset.year;
    const whole = year.wholeYear;
    const forward = year.forecastPeriodAug10ToDec31;
    const elapsed = year.elapsedJanToAug9;
    const slowTransits = year.slowTransits.filter((transit) => transit.phase !== 'completed before 2026-08-10').slice(0, 10);
    return `
    ${panel('2026 energy landscape', renderYearRibbon({
        dayByDate: index.byDate,
        year,
        selectedMonthKey: ef.selectedMonth,
        detailStart: index.firstDetailedDate,
        detailEnd: index.lastDetailedDate,
    }), 'Select a month to zoom in.', 'ef-panel--hero-chart')}

    ${renderHero({
        eyebrow: `${year.label} · ranked by absolute strength across the full year`,
        dominantTheme: whole.dominantTheme,
        coDominantTheme: whole.coDominantTheme,
        secondaryThemes: whole.secondaryThemes,
        dominantElement: whole.dominantElement,
        emotionalMirror: whole.emotionalMirror,
        bodyCorrespondence: whole.traditionalBodyCorrespondence,
        shadow: whole.shadowExpression,
        constructive: whole.constructiveExpression,
    }, {
        intensity: whole.scoreSummary.intensityMean,
        convergence: whole.scoreSummary.convergenceMean,
        emotionalCharge: whole.scoreSummary.emotionalChargeMean,
        actionReflection: whole.scoreSummary.actionReflectionMean,
        expansionContraction: whole.scoreSummary.expansionContractionMean,
        stabilityChange: whole.scoreSummary.stabilityChangeMean,
    }, 'year mean')}

    <div class="ef-year-facts">
      <div class="ef-fact"><span>Personal Year</span><strong>${year.numerology.personalYear}</strong><em>${escapeHtml(year.numerology.personalYearFormula)}</em></div>
      <div class="ef-fact"><span>Universal Year</span><strong>${year.numerology.universalYear}</strong><em>digit sum of 2026</em></div>
      <div class="ef-fact"><span>BaZi solar year</span><strong>${escapeHtml(year.bazi.yearPillar)}</strong><em>${escapeHtml(year.bazi.yearTenGod)} — ${escapeHtml(year.bazi.relationToDayMaster)}</em></div>
      <div class="ef-fact"><span>Daily records</span><strong>${index.detailedDates.length}</strong><em>${escapeHtml(index.firstDetailedDate)} → ${escapeHtml(index.lastDetailedDate)}</em></div>
    </div>

    ${panel('Months', `<div class="ef-month-blocks">${dataset.months.map((window) => renderMonthBlock(window, ef.selectedMonth)).join('')}</div>
      <div class="ef-split">
        <div class="ef-split-half">
          <h4>${escapeHtml(elapsed.label)}</h4>
          <p class="ef-split-theme">${escapeHtml(elapsed.dominantTheme)}</p>
          <dl class="ef-mini-stats">
            <div><dt>Intensity</dt><dd>${elapsed.scoreSummary.intensityMean}</dd></div>
            <div><dt>Convergence</dt><dd>${elapsed.scoreSummary.convergenceMean}</dd></div>
            <div><dt>Element</dt><dd>${escapeHtml(elapsed.dominantElement)}</dd></div>
          </dl>
          <p class="ef-split-note">Aggregate only — no daily records published before 10 August.</p>
        </div>
        <div class="ef-split-half is-active">
          <h4>${escapeHtml(forward.label)}</h4>
          <p class="ef-split-theme">${escapeHtml(forward.dominantTheme)}</p>
          <dl class="ef-mini-stats">
            <div><dt>Intensity</dt><dd>${forward.scoreSummary.intensityMean}</dd></div>
            <div><dt>Convergence</dt><dd>${forward.scoreSummary.convergenceMean}</dd></div>
            <div><dt>Element</dt><dd>${escapeHtml(forward.dominantElement)}</dd></div>
          </dl>
          <p class="ef-split-note">${index.detailedDates.length} daily records available.</p>
        </div>
      </div>`, 'Ranked by deviation from the year baseline — what is distinctive about each month.')}

    ${panel('Long-term transits shaping the period', `<div class="ef-transit-table" role="table">
      <div class="ef-transit-row is-head" role="row"><span>Transit</span><span>Natal target</span><span>Window</span><span>Exact</span><span>Tightest orb</span></div>
      ${slowTransits.map((transit) => `<div class="ef-transit-row" role="row">
        <span><strong>${escapeHtml(transit.transitBody)}</strong> ${escapeHtml(transit.aspect.toLowerCase())}</span>
        <span>natal ${escapeHtml(transit.natalBody)} <em>${escapeHtml(transit.natalPlacement)}${transit.natalHouse ? ` · H${transit.natalHouse}` : ''}</em></span>
        <span class="ef-mono">${escapeHtml(transit.window)}</span>
        <span class="ef-mono">${transit.exactDates.length > 0 ? escapeHtml(transit.exactDates.join(', ')) : '—'}</span>
        <span class="ef-mono">${transit.tightestOrb}° · ${escapeHtml(transit.tightestOrbDate)}</span>
      </div>`).join('')}
    </div>`, 'Slow-planet contacts active on or after 10 August, longest first.')}

    ${panel('Turning points', `<div class="ef-split">
      <div class="ef-split-half">
        <h4>Eclipses</h4>
        <ul class="ef-event-list">${[...year.eclipses].sort((left, right) => left.date.localeCompare(right.date)).map((eclipse) => `<li class="is-eclipse"><span class="ef-mono">${escapeHtml(eclipse.date)}</span><strong>${escapeHtml(eclipse.label)}</strong>${eclipse.natalContact ? `<em>${escapeHtml(eclipse.natalContact)}</em>` : '<em>no natal contact within 3°</em>'}</li>`).join('')}</ul>
      </div>
      <div class="ef-split-half">
        <h4>Stations</h4>
        <ul class="ef-event-list">${year.stations.filter((station) => station.date >= index.firstDetailedDate).map((station) => `<li class="is-station"><span class="ef-mono">${escapeHtml(station.date)}</span><strong>${escapeHtml(station.label)}</strong>${station.natalContact ? `<em>${escapeHtml(station.natalContact)}</em>` : ''}</li>`).join('')}</ul>
      </div>
    </div>`)}

    ${renderFieldSection(dataset.daily, 'the detailed forecast period', ef.constellationFocus, whole.elementDayCounts, whole.dominantElement, 'days led', whole.traditionalBodyCorrespondence, whole.emotionalMirror, `UI aggregation across ${dataset.daily.length} daily records`)}
  `;
}
function renderMonthBlock(window, selectedMonth) {
    const monthKey = window.start.slice(0, 7);
    const isElapsedAugust = window.label.includes('elapsed');
    const isSelected = monthKey === selectedMonth && !isElapsedAugust;
    return `<button type="button" class="ef-month-block${isSelected ? ' is-selected' : ''}${isElapsedAugust ? ' is-elapsed' : ''}" data-action="ef-select-month" data-month="${monthKey}">
    <span class="ef-month-block-label">${escapeHtml(window.label)}</span>
    <strong class="ef-month-block-theme">${escapeHtml(window.dominantTheme)}</strong>
    ${window.coDominantTheme ? `<span class="ef-month-block-co">/ ${escapeHtml(window.coDominantTheme)}</span>` : ''}
    <span class="ef-month-block-bars">
      <span class="ef-meter"><i style="width:${window.scoreSummary.intensityMean}%"></i></span>
      <em>INT ${window.scoreSummary.intensityMean}</em>
      <span class="ef-meter is-convergence"><i style="width:${window.scoreSummary.convergenceMean}%"></i></span>
      <em>CNV ${window.scoreSummary.convergenceMean}</em>
    </span>
    <span class="ef-month-block-foot">
      <i class="ef-element-dot is-${window.dominantElement.toLowerCase()}"></i>${escapeHtml(window.dominantElement)}
      <span class="ef-month-block-strong">Peak ${window.strongestDates[0] ? escapeHtml(window.strongestDates[0].date.slice(5)) : '—'}</span>
    </span>
  </button>`;
}
// ---------------------------------------------------------------------------
// MONTH
// ---------------------------------------------------------------------------
function renderMonthView(ef, index) {
    const window = index.monthByKey.get(ef.selectedMonth) ?? null;
    const axisDates = monthDatesOf(ef.selectedMonth);
    const detailedDays = axisDates.map((date) => index.byDate.get(date)).filter((day) => Boolean(day));
    if (!window) {
        return `${renderNoDataBanner(`${monthLabel(ef.selectedMonth)} is outside the detailed forecast range (${index.firstDetailedDate} → ${index.lastDetailedDate}). The dataset carries year-level aggregates for this part of 2026 only.`)}
      ${panel('Calendar', renderMonthCalendar({ monthKey: ef.selectedMonth, dayByDate: index.byDate, selectedDate: ef.selectedDate, detailStart: index.firstDetailedDate, detailEnd: index.lastDetailedDate }))}`;
    }
    const augustElapsed = ef.selectedMonth === '2026-08'
        ? index.dataset.months.find((candidate) => candidate.label.includes('elapsed')) ?? null
        : null;
    return `
    ${renderHero({
        eyebrow: `${escapeHtml(window.label)} · ranked by deviation from the year baseline`,
        dominantTheme: window.dominantTheme,
        coDominantTheme: window.coDominantTheme,
        ambientTheme: window.ambientTheme,
        secondaryThemes: window.secondaryThemes,
        dominantElement: window.dominantElement,
        emotionalMirror: window.emotionalMirror,
        bodyCorrespondence: window.traditionalBodyCorrespondence,
        shadow: window.shadowExpression,
        constructive: window.constructiveExpression,
        footnote: augustElapsed ? `August is split by the engine: ${augustElapsed.label} is reported separately as ${augustElapsed.dominantTheme}.` : undefined,
    }, {
        intensity: window.scoreSummary.intensityMean,
        convergence: window.scoreSummary.convergenceMean,
        emotionalCharge: window.scoreSummary.emotionalChargeMean,
        actionReflection: window.scoreSummary.actionReflectionMean,
        expansionContraction: window.scoreSummary.expansionContractionMean,
        stabilityChange: window.scoreSummary.stabilityChangeMean,
    }, 'month mean')}

    ${panel('Energy timeline', renderDailyTimeline({
        axisDates,
        dayByDate: index.byDate,
        selectedDate: ef.selectedDate,
    }), 'Select any day to open its detail.', 'ef-panel--hero-chart')}

    ${panel('Calendar', renderMonthCalendar({
        monthKey: ef.selectedMonth,
        dayByDate: index.byDate,
        selectedDate: ef.selectedDate,
        detailStart: index.firstDetailedDate,
        detailEnd: index.lastDetailedDate,
    }))}

    ${renderKeyWindows(window)}

    ${renderFieldSection(detailedDays, monthLabel(ef.selectedMonth), ef.constellationFocus, window.elementDayCounts, window.dominantElement, 'days led', window.traditionalBodyCorrespondence, window.emotionalMirror, `UI aggregation across ${detailedDays.length} daily records`)}
  `;
}
// ---------------------------------------------------------------------------
// WEEK  (UI aggregation — the engine has no weekly layer)
// ---------------------------------------------------------------------------
function renderWeekView(ef, index) {
    const dates = weekDatesOf(ef.selectedDate);
    const days = dates.map((date) => index.byDate.get(date)).filter((day) => Boolean(day));
    const aggregate = aggregateDays(days);
    if (!aggregate) {
        return renderNoDataBanner(`No day in ${shortDateLabel(dates[0])} – ${shortDateLabel(dates[6])} has a detailed record. Detailed data runs ${index.firstDetailedDate} → ${index.lastDetailedDate}.`);
    }
    const missing = dates.filter((date) => !index.byDate.has(date));
    return `
    ${panel('Seven days', renderWeekStrip(dates, index.byDate, ef.selectedDate), 'Select a day to open its detail.', 'ef-panel--hero-chart')}

    ${renderHero({
        eyebrow: `Week of ${shortDateLabel(dates[0])} · most repeated daily theme`,
        dominantTheme: aggregate.dominantTheme,
        secondaryThemes: aggregate.secondaryThemes,
        dominantElement: aggregate.dominantElement,
        emotionalMirror: aggregate.emotionalMirror,
        bodyCorrespondence: aggregate.traditionalBodyCorrespondence,
        shadow: aggregate.shadow,
        constructive: aggregate.opportunity,
        footnote: `UI aggregation over ${days.length} stored daily record${days.length === 1 ? '' : 's'}; the dominant theme led ${aggregate.dominantThemeDays} of them.${missing.length > 0 ? ` ${missing.length} day${missing.length === 1 ? '' : 's'} in this week have no detailed record.` : ''}`,
    }, {
        intensity: aggregate.intensityMean,
        convergence: aggregate.convergenceMean,
        emotionalCharge: aggregate.emotionalChargeMean,
        actionReflection: aggregate.actionReflectionMean,
        expansionContraction: aggregate.expansionContractionMean,
        stabilityChange: aggregate.stabilityChangeMean,
    }, 'week mean')}

    ${panel('Intensity and convergence', renderDailyTimeline({
        axisDates: dates,
        dayByDate: index.byDate,
        selectedDate: ef.selectedDate,
        height: 220,
        labelEvery: 1,
    }))}

    <div class="ef-two-column">
      ${panel('Strongest day', renderDayMini(aggregate.strongestDay, 'Highest intensity in the week'))}
      ${panel('Quietest day', renderDayMini(aggregate.quietestDay, 'Lowest intensity in the week'))}
    </div>

    ${aggregate.eventDates.length > 0 ? panel('Events this week', `<ul class="ef-transition-list">${aggregate.eventDates.map((entry) => `<li><button type="button" data-action="ef-select-date" data-date="${entry.date}"><span class="ef-mono">${escapeHtml(entry.date.slice(5))}</span><span>${escapeHtml(entry.events.join(' · '))}</span></button></li>`).join('')}</ul>`) : ''}

    ${renderFieldSection(days, `week of ${shortDateLabel(dates[0])}`, ef.constellationFocus, aggregate.elementDayCounts, aggregate.dominantElement, 'days led', aggregate.traditionalBodyCorrespondence, aggregate.emotionalMirror, `UI aggregation across ${days.length} daily records`)}
  `;
}
function renderDayMini(day, note) {
    if (!day)
        return '<p class="ef-empty">Unavailable.</p>';
    return `<button type="button" class="ef-day-mini" data-action="ef-select-date" data-date="${day.date}">
    <span class="ef-day-mini-date">${escapeHtml(longDateLabel(day.date))}</span>
    <strong>${escapeHtml(day.dominantTheme)}</strong>
    <span class="ef-day-mini-scores">INT ${day.intensityScore} · CNV ${day.convergence} · ${escapeHtml(day.dominantElement)}</span>
    <em>${escapeHtml(note)}</em>
  </button>`;
}
// ---------------------------------------------------------------------------
// DAY
// ---------------------------------------------------------------------------
function renderDayView(ef, index) {
    const day = index.byDate.get(ef.selectedDate) ?? null;
    if (!day) {
        return renderNoDataBanner(`${longDateLabel(ef.selectedDate)} has no detailed forecast record. Detailed data runs ${index.firstDetailedDate} → ${index.lastDetailedDate}.`);
    }
    const element = day.why.elementLayer;
    return `
    ${renderHero({
        eyebrow: `${escapeHtml(day.weekday)} ${escapeHtml(day.date)} · ranked by deviation from the year baseline`,
        dominantTheme: day.dominantTheme,
        coDominantTheme: day.coDominantTheme,
        ambientTheme: day.ambientYearTheme,
        secondaryThemes: day.secondaryThemes,
        dominantElement: day.dominantElement,
        emotionalMirror: day.emotionalMirror,
        bodyCorrespondence: day.traditionalBodyFocus,
        shadow: day.shadow,
        constructive: day.opportunity,
    }, {
        intensity: day.intensityScore,
        convergence: day.convergence,
        emotionalCharge: day.emotionalChargeScore,
        actionReflection: day.actionReflectionScore,
        expansionContraction: day.expansionContractionScore,
        stabilityChange: day.stabilityChangeScore,
    }, '')}

    ${day.tensions.length > 0 ? `<div class="ef-tension-flag">Unresolved tension preserved: ${day.tensions.map((tension) => `<strong>${escapeHtml(tension.poles[0])}</strong> vs <strong>${escapeHtml(tension.poles[1])}</strong> (balance ${tension.balance})`).join(' · ')}</div>` : ''}

    ${day.astroEvents.length > 0 ? `<div class="ef-day-events">${day.astroEvents.map((event) => `<span class="ef-day-event-chip">${escapeHtml(event)}</span>`).join('')}</div>` : ''}

    ${renderFieldSection([day], day.date, ef.constellationFocus, element.scores, element.dominantElement, 'weighted score', element.traditionalBodyCorrespondence, element.emotionalMirror)}

    <div class="ef-system-grid">
      ${systemCard('Astrological weather', 'astrology', day.keyAstrologicalSignals.map((signal) => escapeHtml(signal)), day.dominantPlanetaryInfluences.join(' · '))}
      ${systemCard('Numerology', 'numerology', day.numerologySignals.map((signal) => escapeHtml(signal)), escapeHtml(day.why.numerology.personalDaySteps))}
      ${systemCard('Human Design transits', 'human-design', day.humanDesignSignals.length > 0 ? day.humanDesignSignals.map((signal) => escapeHtml(signal)) : ['No temporary definition today'], `${day.why.humanDesignTransit.temporaryChannels.filter((channel) => channel.kind === 'natal-transit').length} personal · ${day.why.humanDesignTransit.temporaryChannels.filter((channel) => channel.kind === 'transit-transit').length} collective`)}
      ${systemCard('BaZi / elemental', 'bazi', day.baziSignals.map((signal) => escapeHtml(signal)), day.why.baziTransit ? `Day Master ${escapeHtml(day.why.baziTransit.dayTenGod.dayMasterElement)} · ${escapeHtml(day.why.baziTransit.activeSolarTerm ?? '')}` : '')}
      ${systemCard('Convergence', 'convergence', day.convergentSignals.length > 0
        ? day.convergentSignals.map((signal) => `<strong>${escapeHtml(signal.theme)}</strong> — ${signal.convergence}/100 · ${signal.systemCount} systems: ${escapeHtml(signal.systems.join(', '))}`)
        : ['No multi-system agreement above threshold'], 'Only these four systems may vote')}
    </div>

    ${panel('Why this forecast?', renderProvenance(day), 'Every theme below traces to the calculated signals that produced it.', 'ef-panel--why')}
  `;
}
function systemCard(title, kind, lines, footer) {
    return `<article class="ef-system-card is-${kind}">
    <h4>${escapeHtml(title)}</h4>
    <ul>${lines.map((line) => `<li>${line}</li>`).join('')}</ul>
    ${footer ? `<p class="ef-system-foot">${footer}</p>` : ''}
  </article>`;
}
function renderProvenance(day) {
    const themes = day.why.themes.slice(0, 6);
    const maxStrength = Math.max(...themes.map((theme) => theme.strength), 1);
    return `<div class="ef-why">
    <p class="ef-why-basis">${escapeHtml(day.why.themeRankingBasis)}</p>

    <div class="ef-why-themes">
      ${themes.map((theme) => `<details class="ef-why-theme"${theme.theme === day.dominantThemeId ? ' open' : ''}>
        <summary>
          <span class="ef-why-theme-name">${escapeHtml(theme.label)}</span>
          <span class="ef-why-bar"><i style="width:${Math.round((theme.strength / maxStrength) * 100)}%"></i></span>
          <span class="ef-why-numbers">str ${theme.strength.toFixed(2)} · dev ${theme.deviation > 0 ? '+' : ''}${theme.deviation.toFixed(2)} · conv ${theme.convergence}</span>
          <span class="ef-why-systems">${theme.systems.length > 0 ? escapeHtml(theme.systems.join(' + ')) : 'no system above threshold'}</span>
        </summary>
        <ul class="ef-why-contributors">
          ${theme.contributors.map((contributor) => `<li><span class="ef-why-system-tag is-${contributor.system}">${escapeHtml(contributor.system)}</span><span>${escapeHtml(contributor.label)}</span><span class="ef-mono">${contributor.contribution.toFixed(3)}</span></li>`).join('')}
        </ul>
      </details>`).join('')}
    </div>

    <details class="ef-why-raw">
      <summary>Transit positions at ${escapeHtml(day.why.transitSample.localTime)} ${escapeHtml(day.why.transitSample.timeZone)} (${escapeHtml(day.why.transitSample.utc)})</summary>
      <div class="ef-position-grid">
        ${day.why.transitPositions.map((position) => `<span><em>${escapeHtml(position.body)}</em>${escapeHtml(position.sign)} ${position.degreeInSign.toFixed(2)}°${position.motion === 'retrograde' ? ' ℞' : ''} · natal H${position.natalHouse}</span>`).join('')}
      </div>
    </details>

    <details class="ef-why-raw">
      <summary>All ${day.why.signals.length} weighted signals</summary>
      <ul class="ef-signal-list">
        ${day.why.signals.slice().sort((left, right) => right.strength - left.strength).map((signal) => `<li>
          <span class="ef-why-system-tag is-${signal.system}">${escapeHtml(signal.system)}</span>
          <span class="ef-signal-label">${escapeHtml(signal.label)}${signal.detail ? `<em>${escapeHtml(signal.detail)}</em>` : ''}</span>
          <span class="ef-mono">${signal.strength.toFixed(3)}</span>
        </li>`).join('')}
      </ul>
    </details>

    <details class="ef-why-raw">
      <summary>Element layer contributions</summary>
      <ul class="ef-signal-list">
        ${day.why.elementLayer.contributions.map((contribution) => `<li><span class="ef-element-dot is-${contribution.element.toLowerCase()}"></span><span class="ef-signal-label">${escapeHtml(contribution.source)}</span><span class="ef-mono">${contribution.weight.toFixed(2)}</span></li>`).join('')}
      </ul>
      <p class="ef-disclaimer">${escapeHtml(day.why.elementLayer.tcmReference.disclaimer)}</p>
    </details>
  </div>`;
}
export { ELEMENT_ORDER };
