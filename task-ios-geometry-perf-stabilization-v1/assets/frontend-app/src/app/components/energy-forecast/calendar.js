/**
 * Month calendar grid.
 *
 * Each cell encodes four stored values visually rather than in prose: intensity
 * (background wash), convergence (baseline bar), dominant element (dot), and an
 * event mark. Dates with no detailed record are rendered in a visibly different
 * "no data" state instead of being blanked or filled with a guess.
 */
import { escapeHtml } from '../../format.js?v=d9f39e7';
import { calendarCellsOf, monthLabel } from '../../energy-forecast/forecastDataset.js?v=d9f39e7';
import { eventKindOf } from './charts.js?v=d9f39e7';
const WEEKDAY_HEADS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const ELEMENT_ORDER = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
export function renderMonthCalendar({ monthKey, dayByDate, selectedDate, detailStart, detailEnd }) {
    const cells = calendarCellsOf(monthKey);
    return `<div class="ef-calendar" role="group" aria-label="${escapeHtml(monthLabel(monthKey))} calendar">
    <div class="ef-calendar-head">${WEEKDAY_HEADS.map((day) => `<span>${day}</span>`).join('')}</div>
    <div class="ef-calendar-grid">
      ${cells.map((cell) => renderCell(cell, dayByDate, selectedDate, detailStart, detailEnd)).join('')}
    </div>
    <div class="ef-calendar-legend">
      <span class="ef-calendar-legend-item"><i class="ef-swatch is-wash"></i>Intensity</span>
      <span class="ef-calendar-legend-item"><i class="ef-swatch is-convergence"></i>Convergence</span>
      ${ELEMENT_ORDER.map((element) => `<span class="ef-calendar-legend-item"><i class="ef-swatch ef-element-dot is-${element.toLowerCase()}"></i>${element}</span>`).join('')}
      <span class="ef-calendar-legend-item"><i class="ef-swatch is-nodata"></i>No detailed data</span>
    </div>
  </div>`;
}
function renderCell(cell, dayByDate, selectedDate, detailStart, detailEnd) {
    const day = dayByDate.get(cell.date) ?? null;
    const dayNumber = Number(cell.date.slice(8, 10));
    const classes = ['ef-day'];
    if (!cell.inMonth)
        classes.push('is-outside');
    if (cell.date === selectedDate)
        classes.push('is-selected');
    if (!day) {
        const reason = cell.date < detailStart
            ? 'Before the detailed forecast range'
            : cell.date > detailEnd
                ? 'After the detailed forecast range'
                : 'No detailed record';
        classes.push('is-nodata');
        return `<div class="${classes.join(' ')}" title="${escapeHtml(`${cell.date} — ${reason}`)}">
      <span class="ef-day-number">${dayNumber}</span>
      <span class="ef-day-nodata" aria-hidden="true"></span>
    </div>`;
    }
    if (day.intensityScore >= 90)
        classes.push('is-peak');
    // The wash carries intensity as a field; the numeral carries it as a value.
    // Anything below the mid-range stays visually quiet so peaks read instantly.
    const wash = Math.round(Math.max(0, (day.intensityScore - 30) / 70) ** 1.35 * 100) / 100;
    const eventKind = day.astroEvents.length > 0 ? eventKindOf(day.astroEvents[0]) : null;
    const themeShort = shortenTheme(day.dominantTheme);
    return `<button type="button" class="${classes.join(' ')}" data-action="ef-select-date" data-date="${cell.date}"
    style="--ef-wash:${wash}"
    title="${escapeHtml(`${cell.date} — ${day.shortSummary}`)}"
    aria-label="${escapeHtml(`${cell.date}, intensity ${day.intensityScore}, convergence ${day.convergence}, ${themeShort}`)}">
    <span class="ef-day-head">
      <span class="ef-day-number">${dayNumber}</span>
      ${eventKind ? `<span class="ef-day-event is-${eventKind}" aria-hidden="true"></span>` : ''}
    </span>
    <span class="ef-day-intensity">${day.intensityScore}</span>
    <span class="ef-day-theme">${escapeHtml(themeShort)}</span>
    <span class="ef-day-foot">
      <i class="ef-element-dot is-${day.dominantElement.toLowerCase()}" title="${escapeHtml(day.dominantElement)}"></i>
      <span class="ef-day-convergence" aria-hidden="true"><i style="width:${Math.max(2, day.convergence)}%"></i></span>
    </span>
  </button>`;
}
/**
 * Theme shorthand for a calendar cell. Themes are "A / B" pairs; the first half
 * is the distinguishing word, so the cell keeps the signal and drops the rest
 * rather than wrapping a full label into three cramped lines.
 */
function shortenTheme(theme) {
    const base = theme.split(' (')[0];
    const [first] = base.split(' / ');
    return first ?? base;
}
