import { escapeAttribute, escapeHtml } from '../format.js?v=b5ef5ed';
import { trendPosition } from '../temporal-synthesis/forecastPeriods.js?v=b5ef5ed';
import { LIFE_LABEL } from '../temporal-synthesis/lifeDynamicsEnglish.js?v=b5ef5ed';
import { LIFE_ICONS } from '../temporal-synthesis/lifeDynamicsIcons.js?v=b5ef5ed';
import { clampIndex, isoOf, pointOf, referenceLevel, sampleCount, } from './forecastChartData.js?v=b5ef5ed';
import { AXIS_WORD, GRAPH_COPY, NOT_ASSESSED, levelWord, samplesNote, seriesSummary, stateWord, valueText, } from './forecastGraphCopy.js?v=b5ef5ed';
import { monotonePath } from './monotonePath.js?v=b5ef5ed';
export const CHART_BOX = { width: 330, height: 188, left: 54, right: 14, top: 12, bottom: 28 };
/** The end icons of Compare all need a column to sit in; one theme does not. */
export const END_COLUMN = 26;
/**
 * THE BOX AT THE WIDTH IT IS ACTUALLY SHOWN.
 *
 * The shipped trend draws a fixed 320-unit box and lets CSS scale it, so its 8-unit labels become 7 pixels on a small phone. Here the caller measures
 * the plot's width and asks for a box of exactly that size: one SVG unit is one CSS pixel, a 12-unit label is 12 pixels at 320 and at 1440, and only
 * the plot (not its text) grows with the screen. The vertical mapping is unchanged.
 */
export function chartBoxFor(width, compare = false) {
    const w = Math.max(240, Math.round(width));
    const tall = compare ? 1.12 : 1;
    return { ...CHART_BOX, width: w, height: Math.round(Math.min(280, Math.max(172, w * 0.56)) * tall), right: compare ? CHART_BOX.right + END_COLUMN : CHART_BOX.right };
}
export function chartGeometry(count, box = CHART_BOX) {
    const plotWidth = box.width - box.left - box.right;
    const plotHeight = box.height - box.top - box.bottom;
    return {
        plotLeft: box.left,
        plotRight: box.width - box.right,
        plotTop: box.top,
        plotBottom: box.top + plotHeight,
        plotWidth,
        plotHeight,
        xAt: (index) => box.left + (count <= 1 ? plotWidth / 2 : (index * plotWidth) / (count - 1)),
        yAt: (position) => box.top + plotHeight * (1 - (position - 0.5) / 5),
    };
}
/** The sample nearest an x in SVG units: a tap picks the nearest point, never a hit box. */
export function indexAtX(x, count, box = CHART_BOX) {
    if (count <= 1)
        return 0;
    const geo = chartGeometry(count, box);
    const raw = ((x - geo.plotLeft) / geo.plotWidth) * (count - 1);
    return Math.min(count - 1, Math.max(0, Math.round(raw)));
}
/** The same, from a pointer's client x and the plot element's box. */
export function indexAtClient(clientX, rectLeft, rectWidth, count, box = CHART_BOX) {
    if (rectWidth <= 0)
        return 0;
    return indexAtX(((clientX - rectLeft) / rectWidth) * box.width, count, box);
}
const f1 = (value) => value.toFixed(1);
/** The inside of a shared Life Dynamics icon, so it can sit in the chart as a <g>. The geometry is the shared string, untouched. */
const iconInner = (id) => LIFE_ICONS[id].replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
/** Consecutive assessed samples. A gap ends a run: the line never crosses a sample that has no value. */
function runsOf(set, id, geo) {
    const runs = [];
    let current = [];
    for (const point of set.series[id].points) {
        if (point.weight === null) {
            if (current.length > 0)
                runs.push(current);
            current = [];
        }
        else {
            current.push({ x: geo.xAt(point.index), y: geo.yAt(trendPosition(id, point.weight)), index: point.index });
        }
    }
    if (current.length > 0)
        runs.push(current);
    return runs;
}
const pathOf = (runs) => runs.filter((run) => run.length > 1).map((run) => monotonePath(run)).join(' ');
const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** What an axis label says: a month name for a month axis; a day number, carrying its month at the ends and at the 1st, for a day axis. */
function axisText(set, index) {
    const point = set.series[set.order[0]].points[index];
    if (set.scale === 'year')
        return point.label;
    const n = sampleCount(set);
    return index === 0 || index === n - 1 || point.date.day === 1 ? `${point.date.day} ${SHORT_MONTHS[point.date.month - 1]}` : point.label;
}
/**
 * Which labels fit. Candidates are taken in order of importance - the picked sample, the ends, the 1st of a month, then the round numbers (every fifth day, every second
 * month) - and one is kept only if it clears every label already kept by the width of its text. Twelve-pixel labels never overlap.
 */
export function axisLabels(set, index, box) {
    const n = sampleCount(set);
    const geo = chartGeometry(n, box);
    const width = (i) => axisText(set, i).length * 6.8 + 14;
    const round = (i) => (set.scale === 'year' ? i % 2 === 0 : set.series[set.order[0]].points[i].date.day % 5 === 0);
    const firsts = set.scale === 'year' ? [] : Array.from({ length: n }, (_, i) => i).filter((i) => set.series[set.order[0]].points[i].date.day === 1);
    const order = [index, 0, n - 1, ...firsts, ...Array.from({ length: n }, (_, i) => i).filter(round)];
    const kept = [];
    for (const candidate of order) {
        if (kept.includes(candidate) || candidate < 0 || candidate >= n)
            continue;
        const clear = kept.every((other) => Math.abs(geo.xAt(candidate) - geo.xAt(other)) >= (width(candidate) + width(other)) / 2);
        if (clear)
            kept.push(candidate);
    }
    return kept.sort((a, b) => a - b);
}
/* --------------------------------------------------------------- the chart -- */
const END_GAP = 18;
function spread(items, top, bottom) {
    const placed = [...items].sort((a, b) => a.y - b.y).map((item) => ({ ...item }));
    for (let i = 1; i < placed.length; i += 1)
        placed[i].y = Math.max(placed[i].y, placed[i - 1].y + END_GAP);
    if (placed.length > 0)
        placed[placed.length - 1].y = Math.min(placed[placed.length - 1].y, bottom);
    for (let i = placed.length - 2; i >= 0; i -= 1)
        placed[i].y = Math.min(placed[i].y, placed[i + 1].y - END_GAP);
    for (const item of placed)
        item.y = Math.max(top, item.y);
    return new Map(placed.map((item) => [item.id, item.y]));
}
/** The graph's fixed part: guides, the period average, gaps, the lines and (Compare all) the end icons. */
export function renderChartSvg(set, selection, box = CHART_BOX) {
    const n = sampleCount(set);
    const geo = chartGeometry(n, box);
    const combined = selection.mode === 'combined';
    const focus = selection.focus;
    const guides = [1, 2, 3, 4, 5].map((level) => `
          <line class="kt-fg-guide${level === 3 ? ' is-ordinary' : ''}" x1="${geo.plotLeft}" y1="${f1(geo.yAt(level))}" x2="${geo.plotRight}" y2="${f1(geo.yAt(level))}" />${level === 1 || level === 3 || level === 5 ? `
          <text class="kt-fg-axis-y${level === 3 ? ' is-ordinary' : ''}" x="${geo.plotLeft - 8}" y="${f1(geo.yAt(level) + 4)}" text-anchor="end">${AXIS_WORD[level]}</text>` : ''}`).join('');
    const refWeight = set.reference?.weights[focus];
    const reference = (typeof refWeight === 'number' && referenceLevel(set, focus) !== null)
        ? (() => {
            const y = f1(geo.yAt(trendPosition(focus, refWeight)));
            return `
          <line class="kt-fg-ref" x1="${geo.plotLeft}" y1="${y}" x2="${geo.plotRight}" y2="${y}" />`;
        })() : '';
    const gaps = set.series[focus].points.filter((point) => point.weight === null).map((point) => `
          <line class="kt-fg-gap" x1="${f1(geo.xAt(point.index))}" y1="${geo.plotTop}" x2="${f1(geo.xAt(point.index))}" y2="${f1(geo.plotBottom)}" />`).join('');
    const order = combined ? [...set.order.filter((id) => id !== focus), focus] : [focus];
    const lines = order.map((id) => {
        const d = pathOf(runsOf(set, id, geo));
        if (!d)
            return '';
        const isFocus = id === focus;
        return `${isFocus ? `
          <path class="kt-fg-halo" d="${d}" />` : ''}
          <path class="kt-fg-line ${isFocus ? 'is-focus' : 'is-dim'}" data-series="${id}" d="${d}" />`;
    }).join('');
    const dotRadius = n > 20 ? 1.3 : n > 8 ? 1.7 : 2.1;
    const dots = runsOf(set, focus, geo).flat().map((p) => `
          <circle class="kt-fg-dot" cx="${f1(p.x)}" cy="${f1(p.y)}" r="${dotRadius}" />`).join('');
    let ends = '';
    if (combined) {
        const tails = set.order.map((id) => {
            const runs = runsOf(set, id, geo);
            const last = runs[runs.length - 1]?.[runs[runs.length - 1].length - 1];
            return last ? { id, y: last.y, x: last.x } : null;
        }).filter((tail) => tail !== null);
        const placed = spread(tails, geo.plotTop + 8, geo.plotBottom - 2);
        const iconX = geo.plotRight + 7;
        const size = 16;
        ends = tails.map((tail) => {
            const y = placed.get(tail.id) ?? tail.y;
            const leader = Math.abs(y - tail.y) > 1.5 || tail.x < geo.plotRight - 0.5
                ? `<line class="kt-fg-leader" x1="${f1(tail.x)}" y1="${f1(tail.y)}" x2="${f1(iconX - 1)}" y2="${f1(y)}" />` : '';
            return `
          ${leader}<g class="kt-fg-end${tail.id === focus ? ' is-focus' : ''}" data-series="${tail.id}" transform="translate(${f1(iconX)} ${f1(y - size / 2)}) scale(${(size / 24).toFixed(4)})">
            <g class="kt-fg-end-icon">${iconInner(tail.id)}</g>
          </g>`;
        }).join('');
    }
    return `
        <svg class="kt-fg-svg" viewBox="0 0 ${box.width} ${box.height}" aria-hidden="true" focusable="false" data-fg-svg data-domain="${focus}" data-box-width="${box.width}">
          <g class="kt-fg-layer-guides">${guides}</g>
          <g class="kt-fg-layer-ref">${reference}${gaps}</g>
          <g class="kt-fg-layer-lines">${lines}</g>
          <g class="kt-fg-layer-dots">${dots}</g>
          <g class="kt-fg-layer-ends">${ends}</g>
          <g class="kt-fg-selection" data-fg-selection>${renderSelectionLayer(set, selection, box)}</g>
        </svg>`;
}
/** The part that moves when a sample is picked: axis labels, the cursor, and a marker on each drawn line. */
export function renderSelectionLayer(set, selection, box = CHART_BOX) {
    const n = sampleCount(set);
    const geo = chartGeometry(n, box);
    const index = clampIndex(set, selection.index);
    const labelY = box.height - 7;
    const axis = axisLabels(set, index, box).map((i) => `
          <text class="kt-fg-axis-x${i === index ? ' is-selected' : ''}" x="${f1(geo.xAt(i))}" y="${labelY}" text-anchor="${i === 0 && geo.xAt(0) < 24 ? 'start' : i === n - 1 && box.width - geo.xAt(i) < 24 ? 'end' : 'middle'}">${escapeHtml(axisText(set, i))}</text>`).join('');
    const x = f1(geo.xAt(index));
    const focusPoint = pointOf(set, selection.focus, index);
    const cursor = `
          <line class="kt-fg-cursor${focusPoint?.weight === null ? ' is-gap' : ''}" x1="${x}" y1="${geo.plotTop}" x2="${x}" y2="${f1(geo.plotBottom)}" />`;
    const marker = (id, isFocus) => {
        const point = pointOf(set, id, index);
        if (!point || point.weight === null)
            return '';
        const y = f1(geo.yAt(trendPosition(id, point.weight)));
        return isFocus
            ? `
          <circle class="kt-fg-marker-glow" cx="${x}" cy="${y}" r="7" /><circle class="kt-fg-marker is-focus" cx="${x}" cy="${y}" r="3.8" />`
            : `
          <circle class="kt-fg-marker is-dim" data-series="${id}" cx="${x}" cy="${y}" r="2.4" />`;
    };
    const markers = selection.mode === 'combined'
        ? [...set.order.filter((id) => id !== selection.focus), selection.focus].map((id) => marker(id, id === selection.focus)).join('')
        : marker(selection.focus, true);
    const gapPill = focusPoint?.weight === null ? `
          <text class="kt-fg-gap-label" x="${x}" y="${f1((geo.plotTop + geo.plotBottom) / 2)}" text-anchor="${index > n / 2 ? 'end' : 'start'}" dx="${index > n / 2 ? -6 : 6}">${NOT_ASSESSED}</text>` : '';
    return `${axis}${cursor}${markers}${gapPill}`;
}
/** The interactive plot: one slider that picks a sample, with its spoken value. */
export function renderChart(set, selection, box = CHART_BOX) {
    const n = sampleCount(set);
    const index = clampIndex(set, selection.index);
    const combined = selection.mode === 'combined';
    const label = combined
        ? `All five themes through ${set.periodLabel}, ${LIFE_LABEL[selection.focus]} highlighted`
        : `${LIFE_LABEL[selection.focus]} through ${set.periodLabel}`;
    return `
      <figure class="kt-fg-plot" data-fg-plot data-points="${n}" data-mode="${selection.mode}" tabindex="0"
              role="slider" aria-orientation="horizontal" aria-valuemin="1" aria-valuemax="${n}" aria-valuenow="${index + 1}"
              aria-valuetext="${escapeAttribute(valueText(set, selection.focus, index, combined))}"
              aria-label="${escapeAttribute(label)}" aria-description="${escapeAttribute(GRAPH_COPY.slider)}">${renderChartSvg(set, selection, box)}
      </figure>`;
}
/* ------------------------------------------------------------ point and notes -- */
const iconSpan = (id, cls) => `<span class="${cls}" aria-hidden="true">${LIFE_ICONS[id]}</span>`;
/**
 * ONE COMPACT ROW about the ACTUAL picked sample: its date or month, the theme, the level of that sample. The period average is never put here; it
 * is named separately, as an average, under "About this graph".
 */
export function renderPointRow(set, selection) {
    const index = clampIndex(set, selection.index);
    const point = pointOf(set, selection.focus, index);
    if (!point)
        return '';
    const monthly = set.scale === 'year';
    const open = monthly
        ? `<button type="button" class="kt-fg-open" data-forecast-open-level="month">${escapeHtml(GRAPH_COPY.openMonth(point.name.replace(/ \d{4}$/, '')))} &#8250;</button>` : '';
    return `
      <p class="kt-fg-point" data-fg-point data-domain="${selection.focus}">
        <span class="kt-fg-point-text"><strong class="kt-fg-point-date">${escapeHtml(point.name)}</strong><span class="kt-fg-point-sep"> · </span><span class="kt-fg-point-theme">${escapeHtml(LIFE_LABEL[selection.focus])}</span><span class="kt-fg-point-sep"> · </span><span class="kt-fg-point-level${point.level === null ? ' is-not-assessed' : ''}">${escapeHtml(stateWord(point))}</span></span>${open}
      </p>`;
}
const sentence = (text) => `<p>${escapeHtml(text)}</p>`;
/** Everything that is explanation rather than the picture: closed by default. */
export function renderAbout(set, selection) {
    const index = clampIndex(set, selection.index);
    const point = pointOf(set, selection.focus, index);
    const refLevel = referenceLevel(set, selection.focus);
    const combined = selection.mode === 'combined';
    const sampleLine = point && point.level !== null
        ? `This sample: ${levelWord(point.level)} (${point.level} of 5).` : `This sample: ${NOT_ASSESSED}.`;
    const averageLine = set.reference && refLevel !== null
        ? ` ${set.reference.label}${set.reference.isPanelGauge ? ', the gauge above' : ''}: ${levelWord(refLevel)} (${refLevel} of 5).` : '';
    const dayScale = set.scale !== 'year' && point ? `
        ${sentence(GRAPH_COPY.dayScale)}
        <button type="button" class="kt-fg-open is-day" data-forecast-open-level="day">${escapeHtml(GRAPH_COPY.openDay(point.name))} &#8250;</button>` : '';
    const gap = point?.status === 'not-assessed' ? `
        ${sentence(GRAPH_COPY.notAssessedLine)}` : '';
    const birth = set.provenance.birthTimeEstimated ? `
        ${sentence(GRAPH_COPY.birthTimeEstimated)}` : '';
    return `
      <details class="kt-fg-more" data-fg-more>
        <summary>${GRAPH_COPY.aboutSummary}</summary>
        <div class="kt-fg-more-body">
        ${sentence(seriesSummary(set, selection.focus))}
        ${sentence(`${sampleLine}${averageLine}`)}${gap}
        ${sentence(GRAPH_COPY.readHeight)}
        ${sentence(samplesNote(set))}
        ${sentence(set.reference?.isPanelGauge ? GRAPH_COPY.readAverageLine : GRAPH_COPY.readAverageWindow)}${combined ? `
        ${sentence(GRAPH_COPY.readCompare)}` : ''}${dayScale}${birth}
        </div>
      </details>`;
}
/** The values as a table: a native disclosure, keyboard-operable, readable by a screen reader without the picture. */
export function renderDataTable(set, selection) {
    const ids = selection.mode === 'combined' ? set.order : [selection.focus];
    const n = sampleCount(set);
    const cell = (id, index) => {
        const point = pointOf(set, id, index);
        return point && point.level !== null ? `${levelWord(point.level)} (${point.level} of 5)` : NOT_ASSESSED;
    };
    const head = `<tr><th scope="col">${GRAPH_COPY.tableSample}</th>${ids.map((id) => `<th scope="col">${escapeHtml(LIFE_LABEL[id])}</th>`).join('')}</tr>`;
    const rows = Array.from({ length: n }, (_, index) => `
          <tr${index === clampIndex(set, selection.index) ? ' class="is-selected"' : ''}><th scope="row">${escapeHtml(pointOf(set, ids[0], index)?.name ?? '')}</th>${ids.map((id) => `<td>${escapeHtml(cell(id, index))}</td>`).join('')}</tr>`).join('');
    return `
      <details class="kt-fg-more kt-fg-table" data-fg-table>
        <summary>${GRAPH_COPY.tableSummary}</summary>
        <div class="kt-fg-table-scroll"><table>
          <caption>${escapeHtml(GRAPH_COPY.tableCaption(ids.length === 1 ? LIFE_LABEL[ids[0]] : 'The five themes', set.periodLabel))}</caption>
          <thead>${head}</thead>
          <tbody>${rows}
          </tbody>
        </table></div>
      </details>`;
}
/**
 * THE WHOLE BLOCK, in the Forecast's own glass (kt-fc-block). The theme is picked in the Life Dynamics panel above it (each row is a tab,
 * data-forecast-area), so nothing here repeats the five icons, the five gauges or a time-range control: the Month / Year navigation is the Forecast's.
 */
export function renderForecastGraph(view) {
    const { set, selection, box } = view;
    const combined = selection.mode === 'combined';
    const id = selection.focus;
    const period = set.periodLabel;
    const head = combined
        ? `<h3 class="kt-fg-title">${GRAPH_COPY.compareTitle}</h3>
          <p class="kt-fg-sub">${GRAPH_COPY.trend} · ${escapeHtml(period)}</p>`
        : `<h3 class="kt-fg-title">${iconSpan(id, 'kt-fg-title-icon')}${escapeHtml(LIFE_LABEL[id])}</h3>
          <p class="kt-fg-sub">${GRAPH_COPY.trend} · ${escapeHtml(period)}</p>`;
    return `
    <section class="kt-fc-block kt-fg" data-forecast-graph data-fg-kind="${set.scale === 'year' ? 'year' : 'month'}" data-domain="${id}" data-mode="${selection.mode}">
      <header class="kt-fg-head">
        <div class="kt-fg-titles">
          ${head}
        </div>
        <button type="button" class="kt-fg-compare" data-forecast-graph-compare aria-pressed="${combined}">${combined ? GRAPH_COPY.oneTheme : `${GRAPH_COPY.compareAll} &#8250;`}</button>
      </header>${renderChart(set, selection, box)}${renderPointRow(set, selection)}${renderAbout(set, selection)}${renderDataTable(set, selection)}
    </section>`;
}
/** Whether a sample's point is on the focused line, for the controller's tests; the date a point stands for. */
export const pointDateOf = (point) => isoOf(point.date);
