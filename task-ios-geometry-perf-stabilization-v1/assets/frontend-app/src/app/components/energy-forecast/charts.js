/**
 * Energy Forecast time-series visuals.
 *
 * Every plotted point is a stored value from the forecast dataset. Gaps in the
 * detailed range are drawn as gaps, never interpolated, and event markers appear
 * only on dates whose record actually carries an event string.
 */
import { escapeHtml } from '../../format.js?v=d9f39e7';
import { monthDatesOf, shortMonthLabel, yearFraction } from '../../energy-forecast/forecastDataset.js?v=d9f39e7';
const MONTH_KEYS_2026 = Array.from({ length: 12 }, (_, index) => `2026-${String(index + 1).padStart(2, '0')}`);
/** Marker class from the event text. Presentation only — it never changes a date. */
export function eventKindOf(eventText) {
    const text = eventText.toLowerCase();
    if (text.includes('eclipse'))
        return 'eclipse';
    if (text.includes('new moon') || text.includes('full moon') || text.includes('quarter'))
        return 'lunation';
    if (text.includes('turns retrograde') || text.includes('turns direct'))
        return 'station';
    if (text.includes('solar return'))
        return 'return';
    if (text.includes('solar term'))
        return 'term';
    return 'ingress';
}
const EVENT_PRIORITY = ['eclipse', 'return', 'station', 'lunation', 'term', 'ingress'];
function primaryEventKind(events) {
    const kinds = events.map(eventKindOf);
    return EVENT_PRIORITY.find((kind) => kinds.includes(kind)) ?? 'ingress';
}
export function renderDailyTimeline({ axisDates, dayByDate, selectedDate, height = 250, showEventMarkers = true, labelEvery = 1, }) {
    const width = 960;
    const padLeft = 44;
    const padRight = 18;
    const padTop = 18;
    const plotHeight = height - padTop - 58;
    const step = (width - padLeft - padRight) / Math.max(1, axisDates.length);
    const xFor = (index) => padLeft + step * (index + 0.5);
    const yFor = (value) => padTop + plotHeight * (1 - Math.min(100, Math.max(0, value)) / 100);
    const points = axisDates.map((date, index) => ({ date, index, day: dayByDate.get(date) ?? null }));
    const hasAnyDetail = points.some((point) => point.day);
    const gridLines = [0, 25, 50, 75, 100].map((value) => `
    <line class="ef-chart-grid" x1="${padLeft}" y1="${round(yFor(value))}" x2="${width - padRight}" y2="${round(yFor(value))}" />
    <text class="ef-chart-axis-label" x="${padLeft - 8}" y="${round(yFor(value) + 3.5)}" text-anchor="end">${value}</text>`).join('');
    const intensityPath = linePath(points, xFor, yFor, (day) => day.intensityScore);
    const convergencePath = linePath(points, xFor, yFor, (day) => day.convergence);
    const intensityArea = areaPath(points, xFor, yFor, (day) => day.intensityScore, padTop + plotHeight);
    const missingBands = contiguousRuns(points.map((point) => point.day === null))
        .map(({ start, length }) => `<rect class="ef-chart-missing" x="${round(padLeft + step * start)}" y="${padTop}" width="${round(step * length)}" height="${round(plotHeight)}" />`)
        .join('');
    const peaks = points.filter((point) => {
        if (!point.day)
            return false;
        const previous = points[point.index - 1]?.day;
        const next = points[point.index + 1]?.day;
        return point.day.intensityScore >= 80
            && (!previous || point.day.intensityScore >= previous.intensityScore)
            && (!next || point.day.intensityScore >= next.intensityScore);
    });
    const peakMarks = peaks.map((point) => `
    <circle class="ef-chart-peak" cx="${round(xFor(point.index))}" cy="${round(yFor(point.day.intensityScore))}" r="4" />
    <text class="ef-chart-peak-label" x="${round(xFor(point.index))}" y="${round(yFor(point.day.intensityScore) - 11)}" text-anchor="middle">${point.day.intensityScore}</text>`).join('');
    const eventMarks = showEventMarkers
        ? points.filter((point) => point.day && point.day.astroEvents.length > 0).map((point) => {
            const kind = primaryEventKind(point.day.astroEvents);
            const x = round(xFor(point.index));
            const y = padTop + plotHeight + 14;
            return `<g class="ef-chart-event is-${kind}"><line x1="${x}" y1="${padTop + plotHeight}" x2="${x}" y2="${y - 4}" /><circle cx="${x}" cy="${y}" r="3" /><title>${escapeHtml(point.day.astroEvents.join(' · '))}</title></g>`;
        }).join('')
        : '';
    // The selected date is a full-height band plus a labelled cap, so it is
    // unmistakable against the peak circles and event ticks.
    const selectedIndex = points.findIndex((point) => point.date === selectedDate);
    const selected = selectedIndex >= 0 ? points[selectedIndex] : null;
    const selectionMark = selected
        ? `<g class="ef-chart-selected">
        <rect class="ef-chart-selection-band" x="${round(padLeft + step * selectedIndex)}" y="${padTop}" width="${round(step)}" height="${round(plotHeight)}" />
        <line class="ef-chart-selection" x1="${round(xFor(selectedIndex))}" y1="${padTop}" x2="${round(xFor(selectedIndex))}" y2="${round(padTop + plotHeight)}" />
        ${selected.day ? `<circle class="ef-chart-selection-dot" cx="${round(xFor(selectedIndex))}" cy="${round(yFor(selected.day.intensityScore))}" r="5.5" />` : ''}
        ${selected.day ? `<g class="ef-chart-selection-cap" transform="translate(${round(xFor(selectedIndex))}, ${padTop - 4})">
          <rect x="-30" y="-15" width="60" height="17" rx="8.5" />
          <text x="0" y="-2.5" text-anchor="middle">${escapeHtml(selected.date.slice(5))}</text>
        </g>` : ''}
      </g>`
        : '';
    const axisLabels = points.map((point) => {
        const dayNumber = Number(point.date.slice(8, 10));
        const show = labelEvery === 1 ? dayNumber % 2 === 1 : point.index % labelEvery === 0;
        if (!show)
            return '';
        return `<text class="ef-chart-tick${point.date === selectedDate ? ' is-selected' : ''}" x="${round(xFor(point.index))}" y="${height - 24}" text-anchor="middle">${dayNumber}</text>`;
    }).join('');
    // Hover reveals the compact reading for that column; the native title keeps it
    // available to assistive tech and to non-hover input alike.
    const hitAreas = points.map((point) => `<g class="ef-chart-column${point.day ? '' : ' is-empty'}">
    <rect class="ef-chart-hover" x="${round(padLeft + step * point.index)}" y="${padTop}" width="${round(step)}" height="${round(plotHeight)}" />
    <rect class="ef-chart-hit${point.day ? '' : ' is-empty'}" data-action="${point.day ? 'ef-select-date' : ''}" data-date="${point.date}" x="${round(padLeft + step * point.index)}" y="${padTop}" width="${round(step)}" height="${round(plotHeight + 22)}"><title>${escapeHtml(pointTitle(point.date, point.day))}</title></rect>
  </g>`).join('');
    return `<div class="ef-chart">
    <div class="ef-chart-legend">
      <span class="ef-legend-item is-intensity">Intensity</span>
      <span class="ef-legend-item is-convergence">Convergence</span>
      <span class="ef-legend-item is-missing">No detailed data</span>
      <span class="ef-legend-item is-event">Event</span>
    </div>
    <svg class="ef-chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Daily intensity and convergence" preserveAspectRatio="xMidYMid meet">
      ${missingBands}
      ${gridLines}
      ${selectionMark}
      ${hasAnyDetail ? `<path class="ef-chart-area" d="${intensityArea}" />` : ''}
      ${hasAnyDetail ? `<path class="ef-chart-line is-convergence" d="${convergencePath}" />` : ''}
      ${hasAnyDetail ? `<path class="ef-chart-line is-intensity" d="${intensityPath}" />` : ''}
      ${peakMarks}
      ${eventMarks}
      ${axisLabels}
      ${hitAreas}
    </svg>
  </div>`;
}
function pointTitle(date, day) {
    if (!day)
        return `${date} — no detailed forecast data`;
    return `${date} — intensity ${day.intensityScore}, convergence ${day.convergence} — ${day.dominantTheme}`;
}
/** Broken into separate subpaths so a gap in the data reads as a gap. */
function linePath(points, xFor, yFor, valueOf) {
    const segments = [];
    let open = false;
    for (const point of points) {
        if (!point.day) {
            open = false;
            continue;
        }
        const command = open ? 'L' : 'M';
        segments.push(`${command} ${round(xFor(point.index))} ${round(yFor(valueOf(point.day)))}`);
        open = true;
    }
    return segments.join(' ');
}
function areaPath(points, xFor, yFor, valueOf, baseline) {
    const runs = [];
    let current = [];
    const flush = () => {
        if (current.length === 0)
            return;
        const head = current[0];
        const tail = current[current.length - 1];
        runs.push([
            `M ${round(xFor(head.index))} ${round(baseline)}`,
            ...current.map((point) => `L ${round(xFor(point.index))} ${round(yFor(valueOf(point.day)))}`),
            `L ${round(xFor(tail.index))} ${round(baseline)}`,
            'Z',
        ].join(' '));
        current = [];
    };
    for (const point of points) {
        if (point.day)
            current.push({ index: point.index, day: point.day });
        else
            flush();
    }
    flush();
    return runs.join(' ');
}
function contiguousRuns(flags) {
    const runs = [];
    let start = -1;
    flags.forEach((flag, index) => {
        if (flag && start === -1)
            start = index;
        if (!flag && start !== -1) {
            runs.push({ start, length: index - start });
            start = -1;
        }
    });
    if (start !== -1)
        runs.push({ start, length: flags.length - start });
    return runs;
}
/**
 * The 2026 energy landscape. Jan 1 - Aug 9 has no daily records in this dataset,
 * so that span is drawn as an explicitly marked "no daily detail" region rather
 * than being filled with anything.
 */
export function renderYearRibbon({ dayByDate, year, selectedMonthKey, detailStart, detailEnd }) {
    const width = 960;
    const height = 190;
    const padLeft = 12;
    const padRight = 12;
    const plotTop = 30;
    const plotHeight = 96;
    const plotWidth = width - padLeft - padRight;
    const xFor = (iso) => padLeft + plotWidth * yearFraction(iso);
    const yFor = (value) => plotTop + plotHeight * (1 - Math.min(100, Math.max(0, value)) / 100);
    const detailed = [...dayByDate.values()].sort((left, right) => left.date.localeCompare(right.date));
    const linePoints = detailed.map((day) => `${round(xFor(day.date))} ${round(yFor(day.intensityScore))}`);
    const intensityLine = linePoints.length > 0 ? `M ${linePoints.join(' L ')}` : '';
    const intensityArea = linePoints.length > 0
        ? `M ${round(xFor(detailStart))} ${round(plotTop + plotHeight)} L ${linePoints.join(' L ')} L ${round(xFor(detailEnd))} ${round(plotTop + plotHeight)} Z`
        : '';
    const noDetailWidth = xFor(detailStart) - padLeft;
    const monthTicks = MONTH_KEYS_2026.map((key) => {
        const dates = monthDatesOf(key);
        const start = xFor(dates[0]);
        const end = xFor(dates[dates.length - 1]);
        const hasDetail = dates.some((date) => dayByDate.has(date));
        const isSelected = key === selectedMonthKey;
        return `<g class="ef-ribbon-month${isSelected ? ' is-selected' : ''}${hasDetail ? '' : ' is-empty'}">
      <rect class="ef-ribbon-month-hit" data-action="${hasDetail ? 'ef-select-month' : ''}" data-month="${key}" x="${round(start)}" y="${plotTop}" width="${round(end - start)}" height="${plotHeight + 34}" />
      <line class="ef-ribbon-divider" x1="${round(start)}" y1="${plotTop}" x2="${round(start)}" y2="${plotTop + plotHeight}" />
      <text class="ef-ribbon-month-label" x="${round((start + end) / 2)}" y="${plotTop + plotHeight + 22}" text-anchor="middle">${shortMonthLabel(key)}</text>
    </g>`;
    }).join('');
    const eclipseMarks = year.eclipses.map((eclipse) => marker(xFor(eclipse.date), 'eclipse', `${eclipse.date} · ${eclipse.label}${eclipse.natalContact ? ` — ${eclipse.natalContact}` : ''}`, plotTop + plotHeight + 40)).join('');
    const stationMarks = year.stations.map((station) => marker(xFor(station.date), 'station', `${station.date} · ${station.label}${station.natalContact ? ` — ${station.natalContact}` : ''}`, plotTop + plotHeight + 54)).join('');
    return `<div class="ef-ribbon">
    <div class="ef-chart-legend">
      <span class="ef-legend-item is-intensity">Daily intensity</span>
      <span class="ef-legend-item is-missing">No daily detail (Jan 1 – Aug 9)</span>
      <span class="ef-legend-item is-eclipse">Eclipse</span>
      <span class="ef-legend-item is-station">Station</span>
    </div>
    <svg class="ef-ribbon-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="2026 energy landscape" preserveAspectRatio="xMidYMid meet">
      <rect class="ef-chart-missing" x="${padLeft}" y="${plotTop}" width="${round(noDetailWidth)}" height="${plotHeight}" />
      <text class="ef-ribbon-empty-label" x="${round(padLeft + noDetailWidth / 2)}" y="${plotTop + plotHeight / 2}" text-anchor="middle">YEAR-LEVEL DATA ONLY</text>
      ${[0, 50, 100].map((value) => `<line class="ef-chart-grid" x1="${padLeft}" y1="${round(yFor(value))}" x2="${width - padRight}" y2="${round(yFor(value))}" />`).join('')}
      ${intensityArea ? `<path class="ef-chart-area" d="${intensityArea}" />` : ''}
      ${intensityLine ? `<path class="ef-chart-line is-intensity" d="${intensityLine}" />` : ''}
      ${monthTicks}
      ${eclipseMarks}
      ${stationMarks}
    </svg>
  </div>`;
}
function marker(x, kind, title, y) {
    return `<g class="ef-ribbon-marker is-${kind}"><line x1="${round(x)}" y1="${round(y - 7)}" x2="${round(x)}" y2="${round(y)}" /><circle cx="${round(x)}" cy="${round(y)}" r="3" /><title>${escapeHtml(title)}</title></g>`;
}
// ---------------------------------------------------------------------------
// Week strip
// ---------------------------------------------------------------------------
/** Seven-column intensity/convergence bars for the WEEK view. */
export function renderWeekStrip(dates, dayByDate, selectedDate) {
    return `<div class="ef-week-strip">
    ${dates.map((date) => {
        const day = dayByDate.get(date) ?? null;
        const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(`${date}T00:00:00Z`).getUTCDay()];
        if (!day) {
            return `<div class="ef-week-column is-empty"><span class="ef-week-day">${weekday}</span><span class="ef-week-date">${Number(date.slice(8, 10))}</span><div class="ef-week-bars"><span class="ef-week-empty-note">no data</span></div></div>`;
        }
        return `<button type="button" class="ef-week-column${date === selectedDate ? ' is-selected' : ''}" data-action="ef-select-date" data-date="${date}">
        <span class="ef-week-day">${weekday}</span>
        <span class="ef-week-date">${Number(date.slice(8, 10))}</span>
        <div class="ef-week-bars">
          <span class="ef-week-bar is-intensity" style="height:${Math.max(2, day.intensityScore)}%" title="Intensity ${day.intensityScore}"></span>
          <span class="ef-week-bar is-convergence" style="height:${Math.max(2, day.convergence)}%" title="Convergence ${day.convergence}"></span>
        </div>
        <span class="ef-week-score">${day.intensityScore}</span>
        <span class="ef-week-theme">${escapeHtml(day.dominantTheme.split(' (')[0])}</span>
      </button>`;
    }).join('')}
  </div>`;
}
function round(value) {
    return Math.round(value * 100) / 100;
}
