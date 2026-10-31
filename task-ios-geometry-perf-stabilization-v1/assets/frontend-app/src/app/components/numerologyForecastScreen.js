import { escapeAttribute, escapeHtml } from '../format.js?v=d9f39e7';
import { ADVICE_HEADINGS } from '../forecast-v2/dayAdviceEnglish.js?v=d9f39e7';
import { dayLifeCardOf } from '../forecast-v2/dayLifeDynamicsEnglish.js?v=d9f39e7';
import { renderDayLifeDynamics } from './dayLifeDynamicsBlock.js?v=d9f39e7';
import { renderDayPlanCard } from './dayPlanCard.js?v=d9f39e7';
import { engineProse } from '../i18n/engineProse.js?v=d9f39e7';
import { ktSonarAttrs } from '../premium-earth/sonarAffordance.js?v=d9f39e7';
import { FORECAST_DOMAIN_ORDER, } from '../temporal-synthesis/forecastDomains.js?v=d9f39e7';
import { TIME_SCALE_ORDER, influenceName, timeScaleOf, } from '../temporal-synthesis/forecastNarrative.js?v=d9f39e7';
import { trendPosition, } from '../temporal-synthesis/forecastPeriods.js?v=d9f39e7';
import { LIFE_COPY } from '../temporal-synthesis/lifeDynamicsEnglish.js?v=d9f39e7';
import { lifeTrendAreas, renderLifeDynamics } from './lifeDynamicsBlock.js?v=d9f39e7';
import { renderGraphBlock } from '../forecast-graph/forecastGraphModel.js?v=d9f39e7';
import { monotonePath } from '../forecast-graph/monotonePath.js?v=d9f39e7';
import { dateLocale, monthNames, weekdayInitials } from '../i18n/dateLocale.js?v=d9f39e7';
import { activeLocale } from '../i18n/locale.js?v=d9f39e7';
import { t, tf } from '../i18n/uiStrings.js?v=d9f39e7';
import { dayContent, forecastKeyword, lunarDisclaimer, lunarPhaseName, lunarRow, lunarSource, lunarTrendWord, markerReason, methodologyNote, monthContent, phaseNameWord, resonanceText, temporalReading, yearContent, } from '../numerology-forecast/forecastLocale.js?v=d9f39e7';
import { majorMoonPhaseOn, moonPhaseFor } from '../numerology-forecast/lunarGuidance.js?v=d9f39e7';
import { daysInMonth, personalMonthOf, personalYearOf, weekdayIndex, } from '../numerology-forecast/personalCycles.js?v=d9f39e7';
import { zodiacYearFor } from '../bazi/baziEngine.js?v=d9f39e7';
/**
 * FORECAST SCREEN — pure rendering. Model in, HTML out, no DOM access.
 *
 * Two systems appear on this screen and they are never mixed: the numerology
 * forecast, and beneath it a separately headed Traditional / Lunar block whose
 * every row names the tradition it comes from. See
 * docs/numerology/FORECAST_METHODOLOGY.md.
 */
/* Was ['M','T','W','T','F','S','S'], printed in every language. */
function facet(label, value) {
    return `
    <div class="kt-fc-facet">
      <dt>${escapeHtml(label)}</dt>
      <dd>${escapeHtml(value)}</dd>
    </div>`;
}
/** The working, so a reader can check the arithmetic rather than trust it. */
/* The working's labels are authored beside the arithmetic in personalCycles.ts
   and stay English there; the reader meets them in their own language. An
   unknown label prints as it came, so a new step is visible rather than lost. */
const TRACE_LABEL_KEYS = {
    'Birth month': 'fc.trace.birthMonth',
    'Birth day': 'fc.trace.birthDay',
    'Calendar year': 'fc.trace.calendarYear',
    'Personal Year': 'fc.trace.personalYear',
    'Calendar month': 'fc.trace.calendarMonth',
    'Personal Month': 'fc.trace.personalMonth',
    'Day of month': 'fc.trace.dayOfMonth',
};
const traceLabel = (label) => {
    const key = TRACE_LABEL_KEYS[label];
    return key ? t(key) : label;
};
function traceLine(trace) {
    const parts = trace.parts
        .map((part) => `${escapeHtml(traceLabel(part.label))} ${part.reducedFrom !== undefined ? `${part.reducedFrom}→${part.value}` : part.value}`)
        .join(' + ');
    const tail = trace.sum === trace.result ? '' : ` → ${trace.result}`;
    return `<p class="kt-fc-trace">${parts} = ${trace.sum}${tail}</p>`;
}
function numberBadge(value, caption) {
    return `
    <div class="kt-fc-badge" data-cycle="${value}">
      <span class="kt-fc-badge-value">${value}</span>
      <span class="kt-fc-badge-caption">${escapeHtml(caption)}</span>
    </div>`;
}
/*
 * WEEKDAY NAMES, MONDAY FIRST, FROM THE PLATFORM.
 *
 * `weekdayInitials` next door returns one narrow letter, which is right for a
 * seven-column calendar head and useless on a rail where "N" and "P" would be
 * the only thing telling two chips apart. Same technique, same Monday-first
 * order, same locale source - a wider style, built on demand because the locale
 * can change under a cached table.
 *
 * 2001-01-01 was a Monday, which is what makes the index line up with
 * `weekdayIndex()` without a second convention to keep in step.
 */
function weekdayNames(style) {
    const format = new Intl.DateTimeFormat(dateLocale(), { weekday: style, timeZone: 'UTC' });
    return Array.from({ length: 7 }, (_, index) => format.format(Date.UTC(2001, 0, 1 + index)));
}
/*
 * A DATE, THE WAY THE LANGUAGE WRITES ONE.
 *
 * The day card used to glue the month's name between two numbers - which is
 * English ("9 September 2026") and not Slovak: „5 máj 2025" is the nominative
 * where Slovak needs the genitive and an ordinal dot, „5. mája 2025". Intl
 * knows both. English is unchanged byte for byte, because dateLocale() pins it
 * to en-GB, whose day-month-year order is exactly what was printed by hand.
 */
function dateLabel(date, withYear = true) {
    const format = new Intl.DateTimeFormat(dateLocale(), {
        day: 'numeric', month: 'long', ...(withYear ? { year: 'numeric' } : {}), timeZone: 'UTC',
    });
    return format.format(Date.UTC(date.year, date.month - 1, date.day));
}
/* ------------------------------------------------------------ the rails -- */
/*
 * THREE RAILS, ONE SYSTEM.
 *
 * Year, month and day are the same gesture at three scales: a horizontal strip
 * you push with a thumb, one item lit. They used to be three different controls
 * - two arrow steppers and a scroller - which taught the reader two interaction
 * models for one idea, and left the scale they change most often as the only
 * one that could be swiped.
 *
 * WEIGHT CARRIES THE HIERARCHY, NOT DECORATION. Year is a line of numerals with
 * no panel behind it, month is a light glass chip, day is a tall glass card
 * carrying its weekday and its Personal Day. Read top to bottom, the eye is
 * pulled down the stack into the card below it, which is the order the reader
 * actually wants.
 *
 * ALL THREE ALIGN TO THE CARD. No full bleed: the rails stop where the forecast
 * card stops, so the stack reads as one structure with the card rather than as
 * controls floating above it. The chevrons then sit exactly on the card edges.
 *
 * The chevrons are the old steppers wearing different clothes - the same
 * `data-forecast-step` those arrow buttons carried - so stepping across a month
 * or year boundary keeps the behaviour that was already tested.
 */
/** The chevron pair and the scroll box every rail shares. */
function rail(options) {
    const { scale, label, prevLabel, nextLabel, step, body } = options;
    /*
     * THE ARROW IS A STROKE, NOT A GLYPH - AND ITS POINT IS A CURVE.
     *
     * The typographic chevrons had a needle-sharp outer tip that a font decides
     * and CSS cannot round. Two stroked segments fixed the font's say in it, but
     * a round line-join only rounds by HALF THE STROKE WIDTH - 0.85px here - so
     * the vertex still read as a point on a phone.
     *
     * So the vertex is gone. Each segment stops 2.5 units short of where the
     * corner was and a quadratic curve carries the line round, using the old
     * corner as its control point. The apex pulls in by three quarters of a unit:
     * visibly soft, still unmistakably an arrow, and the same size, stroke and
     * footprint as before. Round caps stay on the two open ends.
     *
     * Out of the tab order: every item in the rail is already a tab stop, and a
     * chevron between them would double the number of stops for no new reach.
     */
    const chevron = (side, aria, delta, d) => `
    <button type="button" class="kt-fc-chev kt-fc-chev-${side}"
            data-forecast-step="${step}:${delta}" aria-label="${escapeAttribute(aria)}"
            tabindex="-1">
      <svg viewBox="0 0 12 22" width="12" height="22" aria-hidden="true" focusable="false">
        <path d="${d}" />
      </svg>
    </button>`;
    /*
     * THE FRAME IS INSIDE THE ROW, AND THE ARROWS ARE OUTSIDE THE FRAME.
     *
     * They used to be flex children of the bordered box, which meant the glass
     * had to be wide enough to hold them and the strip lost forty-odd pixels of
     * card to two marks. Now the border belongs to .kt-fc-rail-frame and the
     * arrows sit in the gutter beyond it, in space the forecast column was
     * already spending on padding.
     */
    return `
    <div class="kt-fc-rail-wrap kt-fc-rail-${scale}">
      ${chevron('prev', prevLabel, '-1', 'M 9 3 L 4.5 9 Q 3 11 4.5 13 L 9 19')}
      <div class="kt-fc-rail-frame">
        <div class="kt-fc-rail" data-forecast-rail="${scale}" role="group"
             aria-label="${escapeAttribute(label)}">
          <span class="kt-fc-rail-pad" data-forecast-rail-pad aria-hidden="true"></span>
          ${body}
          <span class="kt-fc-rail-pad" data-forecast-rail-pad aria-hidden="true"></span>
        </div>
      </div>
      ${chevron('next', nextLabel, '1', 'M 3 3 L 7.5 9 Q 9 11 7.5 13 L 3 19')}
    </div>`;
}
/**
 * THE YEAR RAIL - the lightest layer.
 *
 * Every year that means something, in one strip you can scroll with a finger: from
 * the year of birth (a Personal Year before the person was born says nothing) to
 * a life ahead of it: eighty years after birth, or fifteen years past the
 * selection if that is further. It used to be a window of seventeen years round
 * the selection, which stopped eight years back and moved only when an edge chip
 * or an arrow was tapped, so a reader could not simply scroll into the past. The
 * end does not depend on the selection (until it is selected beyond it), so the
 * strip no longer changes length when a year is tapped.
 */
export const YEAR_RAIL_YEARS_AHEAD = 15;
export const YEAR_RAIL_LIFESPAN = 80;
/** The first and last year the rail shows. The first is never later than the selection and never before 1900. */
export function yearRailRange(selectedYear, birthYear) {
    const known = Number.isFinite(birthYear);
    const first = Math.max(1900, Math.min(selectedYear, known ? birthYear : selectedYear));
    const last = Math.max(selectedYear + YEAR_RAIL_YEARS_AHEAD, known ? birthYear + YEAR_RAIL_LIFESPAN : 0);
    return { first, last };
}
export function renderYearRail(selected, birth) {
    const { first, last } = yearRailRange(selected.year, birth.year);
    const items = Array.from({ length: (last - first) + 1 }, (_, index) => {
        const year = first + index;
        const active = year === selected.year;
        /*
         * THE ANIMAL IS A LABEL FOR THE YEAR, NOT A VERDICT ON A DATE.
         *
         * A BaZi year turns at Li Chun, in the first days of February, so the last
         * weeks of a Gregorian January still belong to the previous animal. What
         * this chip names is the year in the sense everybody means it - "2026 is
         * the Fire Horse year" - and nothing here is used in a calculation.
         *
         * The value that IS about the selected date is the annual pillar in the
         * background climate below, and that one goes through the engine's real Li
         * Chun search. The two can legitimately differ for about five weeks a year,
         * and the one that would be wrong to trust is this one.
         */
        const zodiac = zodiacYearFor(year);
        const personalYear = personalYearOf(birth, year).result;
        return `
      <button type="button" class="kt-fc-year-chip${active ? ' is-active' : ''}"
              data-forecast-pick="year:${year}"${active ? ' data-forecast-rail-active' : ''}
              aria-pressed="${active}"
              aria-label="${escapeAttribute(tf('fc.yearAria', { year, value: personalYear }))}">
        <span class="kt-fc-chip-lead">${year}</span>
        <span class="kt-fc-chip-note">${escapeHtml(engineProse(`${zodiac.element} ${zodiac.animal}`))}</span>
        <span class="kt-fc-chip-cycle">${personalYear}</span>
      </button>`;
    }).join('');
    return rail({
        scale: 'year',
        label: t('fc.rail.years'),
        prevLabel: t('onb.picker.prevYear'),
        nextLabel: t('onb.picker.nextYear'),
        step: 'year',
        body: items,
    });
}
/**
 * THE MONTH RAIL - the middle layer.
 *
 * Twelve, fixed, never shifting under the thumb. There is nothing beyond the
 * ends of this list, so the chevrons roll into the neighbouring year exactly as
 * the old month stepper did.
 */
export function renderMonthRail(selected, birth) {
    const short = monthNames('short');
    const long = monthNames();
    /* One Personal Year for the whole strip: every month of a year is derived
       from the same one, so computing it twelve times would be twelve identical
       reductions. */
    const personalYear = personalYearOf(birth, selected.year).result;
    const items = Array.from({ length: 12 }, (_, index) => {
        const month = index + 1;
        const active = month === selected.month;
        const personalMonth = personalMonthOf(personalYear, month).result;
        return `
      <button type="button" class="kt-fc-month-chip${active ? ' is-active' : ''}"
              data-forecast-pick="month:${month}"${active ? ' data-forecast-rail-active' : ''}
              aria-pressed="${active}"
              aria-label="${escapeAttribute(tf('fc.monthAria', { month: long[index], value: personalMonth }))}">
        <span class="kt-fc-chip-lead">${escapeHtml(short[index])}</span>
        <span class="kt-fc-chip-cycle">${personalMonth}</span>
      </button>`;
    }).join('');
    return rail({
        scale: 'month',
        label: t('fc.rail.months'),
        prevLabel: t('onb.picker.prevMonth'),
        nextLabel: t('onb.picker.nextMonth'),
        step: 'month',
        body: items,
    });
}
/* -------------------------------------------------- the constellation -- */
/*
 * THE LINE UNDER THE DAYS, AND WHAT IT IS HONEST TO MAKE IT MEAN.
 *
 * It is a shape, not a measurement, and the code says so here because the next
 * person to read it will want to wire a number into it.
 *
 * TWO NUMBERS WERE AVAILABLE AND BOTH WERE REFUSED:
 *
 *   - The Personal Day. It is ORDINAL, not a magnitude. renderForecastGraph
 *     below plots it only against an explicit 1-9 axis, precisely so it cannot
 *     be misread as a score. Feeding it into an unlabelled height would put a
 *     9-day permanently above a 1-day and say, silently, that nine is more than
 *     one. The model does not claim that.
 *
 *   - The Moon's illuminated percentage. A real continuous quantity, already on
 *     this screen, and genuinely celestial - but the lunar layer is quarantined
 *     by design: its own heading, its own disclaimer, the tradition named on
 *     every row, and lunarGuidance.ts states outright that it is never merged
 *     into the numerology forecast. Running it as the spine of the day rail,
 *     unlabelled, directly above the numerology card, is exactly that merge.
 *
 * So the height is PRESENTATIONAL and asserts nothing. It is deterministic from
 * the year and the month, so a given month always draws the same line and
 * nothing flickers between renders, and it is two slow sines rather than noise
 * so the result reads as a constellation somebody joined up rather than as a
 * chart. The amplitude is deliberately small: enough that the line is alive,
 * not enough that any point looks like a peak worth interpreting.
 *
 * The one thing it does carry is the selection - the active day's node is
 * larger and brighter, so the eye can find the day's place on the line.
 */
const CHIP_PITCH = 64;
const CHIP_WIDTH = 56;
const GRAPH_HEIGHT = 38;
/** Same month, same line. A phase, not a value. */
function constellationPhase(year, month) {
    const mixed = ((year * 73856093) ^ (month * 19349663)) >>> 0;
    return (mixed % 628) / 100;
}
function constellationPoints(count, phase) {
    const middle = GRAPH_HEIGHT / 2;
    const amplitude = 9;
    return Array.from({ length: count }, (_, index) => {
        const shape = (Math.sin((index * 0.62) + phase) * 0.52)
            + (Math.sin((index * 0.27) + (phase * 1.7)) * 0.34);
        return {
            x: (CHIP_WIDTH / 2) + (index * CHIP_PITCH),
            y: Number((middle - (shape * amplitude)).toFixed(2)),
        };
    });
}
/**
 * The constellation, drawn to the rail's own geometry.
 *
 * INSIDE the day rail's scroller rather than beside it. The nodes have to stay
 * under their chips while the thumb moves, and the only way to guarantee that
 * without listening to scroll events is to make them the same scrolling
 * content. The width is computed from the chip pitch, so a node cannot drift
 * away from the chip it belongs to.
 */
function renderConstellation(count, activeIndex, phase) {
    if (count === 0)
        return '';
    const width = (count * CHIP_PITCH) - (CHIP_PITCH - CHIP_WIDTH);
    const points = constellationPoints(count, phase);
    const line = points.map((point) => `${point.x},${point.y}`).join(' ');
    const nodes = points.map((point, index) => {
        if (index === activeIndex) {
            /* A short stem to the floor. The halo alone reads as "a brighter star";
               the stem reads as "you are HERE on this line", which is the one thing
               the graph has to answer at a glance. */
            return `
        <line class="kt-fc-node-stem" x1="${point.x}" y1="${point.y}"
              x2="${point.x}" y2="${GRAPH_HEIGHT - 3}" />
        <circle class="kt-fc-node-halo" cx="${point.x}" cy="${point.y}" r="7.5" />
        <circle class="kt-fc-node is-active" cx="${point.x}" cy="${point.y}" r="3.1" />`;
        }
        return `<circle class="kt-fc-node" cx="${point.x}" cy="${point.y}" r="1.7" />`;
    }).join('');
    return `
    <svg class="kt-fc-constellation" width="${width}" height="${GRAPH_HEIGHT}"
         viewBox="0 0 ${width} ${GRAPH_HEIGHT}" aria-hidden="true" focusable="false">
      <polyline class="kt-fc-constellation-line" points="${line}" />
      ${nodes}
    </svg>`;
}
/* ---------------------------------------------------------- the moon -- */
/*
 * THE PHASE DISC.
 *
 * A dark disc that fills with light, not a glyph from a font. The shape is the
 * real terminator: the outer half is a circular limb and the inner half is an
 * ellipse whose horizontal radius collapses to nothing at the quarters, which
 * is exactly how the Moon presents from Earth. A crescent is thin because the
 * ellipse bulges back over the limb, a gibbous is fat because it bulges away.
 *
 * WHICH SIDE IS LIT IS THE WHOLE POINT. Waxing lights the right, waning lights
 * the left - the northern-hemisphere convention, and the only thing that lets a
 * reader tell a growing Moon from a shrinking one at fourteen pixels. Without
 * it the first quarter and the last quarter are the same picture.
 *
 * Drawn as one path over one circle. No image, no font, nothing to load, and it
 * stays crisp at any density because it is geometry.
 */
export function renderMoonDisc(illuminatedFraction, waxing) {
    const r = 6;
    const f = Math.min(1, Math.max(0, illuminatedFraction));
    /* Collapses to zero at the quarters, reaches r at new and full - the width of
       the terminator ellipse, which is what makes the shape read as a phase. */
    const rx = Number((r * Math.abs(1 - (2 * f))).toFixed(3));
    /* Under half lit the ellipse curves back across the limb (counter-clockwise, through the lit side) and cuts the shape down to a crescent; over half it
       curves away (clockwise, through the dark side) and fills it out. The two flags were once the other way round, which drew a full Moon as an empty disc, a new
       Moon as a full one, and every crescent as a gibbous. */
    const sweep = f < 0.5 ? 0 : 1;
    const lit = `M 0 ${-r} A ${r} ${r} 0 0 1 0 ${r} A ${rx} ${r} 0 0 ${sweep} 0 ${-r} Z`;
    return `
    <svg class="kt-fc-moon" viewBox="-6.6 -6.6 13.2 13.2" width="23" height="23"
         aria-hidden="true" focusable="false">
      <circle class="kt-fc-moon-dark" cx="0" cy="0" r="${r}" />
      <path class="kt-fc-moon-lit" d="${lit}"
            transform="scale(${waxing ? 1 : -1} 1)" />
    </svg>`;
}
const CHEVRON = '<svg class="kt-fc-moon-chevron" viewBox="0 0 24 24" width="14" height="14" focusable="false" aria-hidden="true"><path d="M9.5 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
export function renderMoonStage(date, lunar, observer = 'north', options = {}) {
    const moon = moonPhaseFor(date);
    const variant = options.variant ?? 'day';
    /* The eight-phase name covers a sector of 45 degrees (about three and a half days), so a day that is only NEAR full or new carries the name of the sector; the figure says "nearly" unless this day holds the exact event (the instant itself is stated by the compact line and the detail). */
    const exact = majorMoonPhaseOn(date, deviceTimeZone());
    const nearly = (lunar.phaseName === 'Full Moon' || lunar.phaseName === 'New Moon') && exact?.phaseName !== lunar.phaseName;
    const phase = nearly ? t(lunar.phaseName === 'Full Moon' ? 'fc.nearlyFull' : 'fc.nearlyNew') : lunarPhaseName(lunar);
    const percent = lunar.illuminatedPercent.toFixed(0);
    const label = tf('fc.moonAria', { phase, percent });
    const disc = renderMoonDisc(moon.illuminatedFraction, moon.waxing).replace('class="kt-fc-moon"', 'class="kt-fc-moon kt-fc-moon-fallback"').replace(/width="23" height="23"/, 'width="100%" height="100%"');
    const headline = escapeHtml(tf('fc.lunarHead', { phase, percent, trend: lunarTrendWord(lunar) }));
    const data = `data-forecast-moon data-moon-variant="${variant}" data-moon-angle="${moon.angle.toFixed(3)}" data-moon-fraction="${moon.illuminatedFraction.toFixed(4)}" data-moon-waxing="${moon.waxing}" data-moon-observer="${observer}"`;
    if (variant === 'detail') {
        return `
    <figure class="kt-fc-moon-stage kt-fc-moon-stage-detail" ${data}>
      <span class="kt-fc-moon-frame" role="img" aria-label="${escapeHtml(label)}">${disc}</span>
      <figcaption>
        <span class="kt-fc-moon-phase">${headline}</span>
        <span class="kt-fc-moon-credit">${t('fc.moonCredit')}</span>
      </figcaption>
    </figure>`;
    }
    /* THE MOON IS THE CONTROL. One real button, round, holding the picture; the KT sonar (sonarAffordance.ts, the one the Astrology capsules wear) rings its edge. The text under it opens the same detail
       (a second button beside the first, never inside it). THE FACTS COME FIRST, above the picture: the floating MENU sits over the lower part of the first screen of a phone, and the two lines a
       reader needs (the phase, the exact next event) must never be the ones it covers; what it may cover is the lower edge of the Moon and the secondary "Explore" text. */
    const open = escapeHtml(tf('fc.moonOpenAria', { phase, percent }));
    return `
    <figure class="kt-fc-moon-stage" ${data}>
      <figcaption>
        <span class="kt-fc-moon-phase">${headline}</span>
        ${options.compact ?? ''}
      </figcaption>
      <button type="button" class="kt-fc-moon-open" data-forecast-lunar-open ${ktSonarAttrs({ shape: 'round' })} aria-label="${open}">
        <span class="kt-fc-moon-frame">${disc}</span>
      </button>
      <div class="kt-fc-moon-more"><button type="button" class="kt-fc-moon-explore" data-forecast-lunar-open>${escapeHtml(t('fc.moonExplore'))}${CHEVRON}</button></div>
    </figure>`;
}
/**
 * THE LUNAR FORECAST DETAIL: the whole reading, in place of the Day, behind one Back control.
 *
 * It is drawn into the same scrolling surface as every level of the Forecast (no second navigation, no overlay, no new address): the controller swaps the surface's content for this and back,
 * remembering the Day's scroll position. Everything in it is what the Forecast already calculated for the selected date: the Moon (the same renderer, smaller), the exact event, and the reading
 * against the natal chart (lunarEventView.renderLunarEventPanel).
 */
export function renderLunarDetail(date, lunar, panel, observer = 'north') {
    return `
    <div class="kt-forecast kt-fc-lunar-detail" data-forecast-lunar-detail>
      <header class="kt-fc-lunar-bar">
        <button type="button" class="kt-fc-lunar-back" data-forecast-lunar-close aria-label="${escapeHtml(t('fc.lunarBack'))}">
          <span class="kt-fc-lunar-back-glass" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" focusable="false"><path d="M14.5 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </button>
        <div class="kt-fc-lunar-heading">
          <h1 class="kt-fc-lunar-title">${escapeHtml(t('fc.lunarDetailTitle'))}</h1>
          <p class="kt-fc-lunar-date">${escapeHtml(tf('fc.lunarDetailDate', { date: dateLabel(date) }))}</p>
        </div>
      </header>
      ${renderMoonStage(date, lunar, observer, { variant: 'detail' })}
      ${panel}
    </div>`;
}
/* -------------------------------------------------------- the day rail -- */
/**
 * THE DAY RAIL - the strongest layer, and the screen's primary control.
 *
 * Every day of the selected month side by side, with the constellation beneath
 * them in the same scrolling track. Tapping one selects it; the card below is
 * replaced in place. It carries the same `data-forecast-day` attribute the
 * month calendar has always carried, so the controller's existing selection
 * path answers it with no new wiring.
 *
 * NOTHING IS CALCULATED HERE. `month.dayNumbers` is the Personal Day for every
 * day of the month, already built by buildMonthView for the calendar grid; the
 * rail reads the same array. No clock is read either: which chip is active
 * comes from the selection the caller passes, exactly as the calendar's does.
 */
export function renderDayRail(month, selected, quietKinds = []) {
    const abbreviations = weekdayNames('short');
    const total = daysInMonth(month.year, month.month);
    const inMonth = selected.year === month.year && selected.month === month.month;
    const activeIndex = inMonth ? selected.day - 1 : -1;
    const zone = deviceTimeZone();
    const chips = Array.from({ length: total }, (_, index) => {
        const day = index + 1;
        const personalDay = month.dayNumbers[index];
        const active = index === activeIndex;
        const date = { year: month.year, month: month.month, day };
        const weekday = abbreviations[weekdayIndex(date)];
        const moon = moonPhaseFor(date);
        const major = majorMoonPhaseOn(date, zone);
        return `
      <button type="button" class="kt-fc-day-chip${active ? ' is-active' : ''}"${major ? ` data-major-phase="${major.kind}"` : ''}
              data-forecast-day="${day}"${active ? ' data-forecast-day-active data-forecast-rail-active' : ''}
              aria-pressed="${active}"
              aria-label="${escapeHtml(tf('fc.dayAria', { day: dateLabel(date, false), value: personalDay }))}">
        ${renderMoonDisc(moon.illuminatedFraction, moon.waxing)}
        <span class="kt-fc-chip-weekday">${escapeHtml(weekday)}</span>
        <span class="kt-fc-chip-date">${day}</span>
        <span class="kt-fc-chip-cycle">${personalDay}</span>
      </button>`;
    }).join('');
    /* the exact-phase caption is left out for the kinds the Moon block below already states in full (the exact Full Moon and New Moon, with their sign and chart), so one screen never says the same instant twice */
    const exactPhase = inMonth ? majorMoonPhaseOn(selected, zone) : null;
    const exact = exactPhase && !quietKinds.includes(exactPhase.kind) ? majorPhaseLine(selected, zone) : '';
    const caption = exact ? `
    <p class="kt-fc-rail-moon" data-forecast-major-phase>${escapeHtml(exact)}</p>
    <p class="kt-fc-cal-key kt-fc-rail-moon-note">${t('fc.majorPhaseNote')}</p>` : '';
    return rail({
        scale: 'day',
        label: t('fc.rail.label'),
        prevLabel: t('fc.prevDay'),
        nextLabel: t('fc.nextDay'),
        step: 'day',
        body: `
      <div class="kt-fc-rail-track">
        <div class="kt-fc-day-chips">${chips}</div>
        ${renderConstellation(total, activeIndex, constellationPhase(month.year, month.month))}
      </div>`,
    }) + caption;
}
/* -------------------------------------------------------- year view -- */
/* --------------------------------------------- the per-number reference -- */
/*
 * TWO FORECASTS USED TO OPEN THIS SCREEN, AND ONLY ONE OF THEM KNEW THE READER.
 *
 * The per-number dictionary - a fixed theme paragraph and nine or ten facets
 * keyed to the Personal Year, Month or Day - was the whole forecast before the
 * temporal reading existed. It is honest text and it stays, but it is the same
 * text for every person alive who shares that number, and it was running at the
 * top of the view in lede type, roughly word for word as long as the reading
 * that actually reads this chart. A reader met two openings and had no way to
 * tell which one was about them.
 *
 * So it is demoted rather than deleted: one disclosure per view, closed, headed
 * by a line saying plainly that it is the number's general meaning and not a
 * statement about the reader. The badge, the keyword, the trace, the markers,
 * the calendar and the graph stay in the open, because those are the numbers
 * themselves rather than a second reading of them.
 */
function cycleReference(number, lede, facets) {
    return `
    <details class="kt-fc-method kt-fc-cycle-ref">
      <summary>${escapeHtml(tf('fc.cycleReference', { number }))}</summary>
      <p class="kt-fc-cal-key">${t('fc.cycleReferenceNote')}</p>
      <p>${escapeHtml(lede)}</p>
      <dl class="kt-fc-facets">${facets}</dl>
    </details>`;
}
/** The Personal Year's general meaning, folded, with the months it marks. */
function yearReference(year) {
    const content = yearContent(year.personalYear);
    return cycleReference(year.personalYear, content.theme, `
        ${year.resonance ? facet(t('fc.facet.resonance'), resonanceText(year.resonance, year.personalYear)) : ''}
        ${facet(t('fc.facet.year.opportunities'), content.opportunities)}
        ${facet(t('fc.facet.year.cautions'), content.cautions)}
        ${facet(t('fc.facet.year.work'), content.work)}
        ${facet(t('fc.facet.year.money'), content.money)}
        ${facet(t('fc.facet.year.relationships'), content.relationships)}
        ${facet(t('fc.facet.year.family'), content.family)}
        ${facet(t('fc.facet.year.development'), content.development)}
        ${facet(t('fc.facet.year.goodToStart'), content.goodToStart)}
        ${facet(t('fc.facet.year.betterToFinish'), content.betterToFinish)}
        ${facet(t('fc.facet.year.doNotForce'), content.doNotForce)}`);
}
function yearMarkers(year) {
    return year.markers.length === 0
        ? `<p class="kt-fc-empty">${escapeHtml(t('fc.noMarkers'))}</p>`
        : `<ul class="kt-fc-markers">${year.markers.map((marker) => `
        <li><button type="button" data-forecast-month="${marker.month}">
          <strong>${escapeHtml(monthNames()[marker.month - 1])}</strong>
          <span class="kt-fc-marker-num">${marker.personalMonth}</span>
          <span>${escapeHtml(markerReason(marker, year.personalYear))}</span>
        </button></li>`).join('')}</ul>`;
}
export function renderYearView(year) {
    return `
    <section class="kt-fc-block" data-forecast-view="year">
      <header class="kt-fc-block-head">
        ${numberBadge(year.personalYear, tf('fc.badge.year', { year: year.year }))}
        <div>
          <h3>${escapeHtml(forecastKeyword(year.personalYear))}</h3>
          ${traceLine(year.trace)}
        </div>
      </header>
      ${yearReference(year)}
      <h4 class="kt-fc-subhead">${t('fc.relevantMonths')}</h4>
      ${yearMarkers(year)}
    </section>`;
}
/* ------------------------------------------------------- month view -- */
export function renderMonthCalendar(month, selected) {
    const leading = weekdayIndex({ year: month.year, month: month.month, day: 1 });
    const total = daysInMonth(month.year, month.month);
    const heads = weekdayInitials().map((initial, index) => `<div class="kt-fc-cal-head" aria-hidden="true" data-weekday="${index}">${initial}</div>`).join('');
    const blanks = Array.from({ length: leading }, () => '<div class="kt-fc-cal-blank"></div>').join('');
    const cells = Array.from({ length: total }, (_, index) => {
        const day = index + 1;
        const personalDay = month.dayNumbers[index];
        const isSelected = selected.year === month.year && selected.month === month.month && selected.day === day;
        const label = dateLabel({ year: month.year, month: month.month, day }, false);
        return `
      <button type="button" class="kt-fc-cal-cell${isSelected ? ' is-selected' : ''}"
              data-forecast-day="${day}" data-cycle="${personalDay}"
              aria-label="${escapeHtml(tf('fc.dayAria', { day: label, value: personalDay }))}"
              ${isSelected ? 'aria-current="date"' : ''}>
        <span class="kt-fc-cal-date">${day}</span>
        <span class="kt-fc-cal-cycle">${personalDay}</span>
      </button>`;
    }).join('');
    return `
    <div class="kt-fc-calendar" role="group" aria-label="${escapeHtml(monthNames()[month.month - 1])} ${month.year}">
      <div class="kt-fc-cal-grid">${heads}${blanks}${cells}</div>
      <p class="kt-fc-cal-key">${t('fc.calendarKey')}</p>
    </div>`;
}
/** The Personal Month's general meaning, folded. */
function monthReference(month) {
    const content = monthContent(month.personalMonth);
    return cycleReference(month.personalMonth, content.theme, `
        ${facet(t('fc.facet.month.tone'), content.tone)}
        ${facet(t('fc.facet.month.focus'), content.focus)}
        ${facet(t('fc.facet.month.work'), content.work)}
        ${facet(t('fc.facet.month.money'), content.money)}
        ${facet(t('fc.facet.month.relationships'), content.relationships)}
        ${facet(t('fc.facet.month.family'), content.family)}
        ${facet(t('fc.facet.month.creativity'), content.creativity)}
        ${facet(t('fc.facet.month.rest'), content.rest)}
        ${facet(t('fc.facet.month.decisions'), content.decisions)}
        ${facet(t('fc.facet.month.social'), content.social)}
        ${facet(t('fc.facet.month.favorable'), content.favorable)}
        ${facet(t('fc.facet.month.caution'), content.caution)}`);
}
export function renderMonthView(month, selected) {
    const monthName = monthNames()[month.month - 1];
    return `
    <section class="kt-fc-block" data-forecast-view="month">
      <header class="kt-fc-block-head">
        ${numberBadge(month.personalMonth, tf('fc.badge.month', { month: monthName, year: month.year }))}
        <div>
          <h3>${escapeHtml(forecastKeyword(month.personalMonth))}</h3>
          ${traceLine(month.trace)}
        </div>
      </header>
      ${renderMonthCalendar(month, selected)}
      ${monthReference(month)}
    </section>`;
}
/* --------------------------------------------------------- day view -- */
/**
 * The lunar block. Rendered with its own heading, its own disclaimer, and the
 * source named on every row - it is folk custom, not numerology, and the screen
 * must never let the two be confused for one another.
 */
/** Phase, illumination and trend on one line - the block's head, and its summary. */
const lunarHeadline = (lunar) => tf('fc.lunarHead', {
    phase: lunarPhaseName(lunar),
    percent: lunar.illuminatedPercent.toFixed(0),
    trend: lunarTrendWord(lunar),
});
/** The time zone of this device (an IANA name), or UTC where the platform will not say. */
function deviceTimeZone() {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    }
    catch {
        return 'UTC';
    }
}
/**
 * THE EXACT MOMENT OF A QUARTER PHASE, ON THE DAY IT HAPPENS.
 *
 * "Full Moon · exactly at 05:12 CET" - only for the four exact phases (new, first quarter, full, last quarter), only on the calendar day they fall on IN THE READER'S ZONE, and
 * nothing on any other day. The moment is one instant for the whole Earth; only the clock and the date it lands on depend on the zone, so the time zone of this device is used
 * and named. Returns an empty string when the date has no such moment.
 */
export function majorPhaseLine(date, timeZone = deviceTimeZone()) {
    const phase = majorMoonPhaseOn(date, timeZone);
    if (!phase)
        return '';
    let time;
    try {
        time = new Intl.DateTimeFormat(activeLocale() === 'sk' ? 'sk-SK' : 'en-GB', {
            hour: '2-digit', minute: '2-digit', hour12: false, timeZone, timeZoneName: 'short',
        }).format(phase.instant);
    }
    catch {
        time = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC', timeZoneName: 'short' }).format(phase.instant);
    }
    return tf('fc.majorPhase', { phase: phaseNameWord(phase.phaseName), time });
}
export function renderLunarLayer(lunar, folded = false) {
    const rows = lunar.recommendations.map((item) => {
        const row = lunarRow(item, lunar);
        return `
    <li class="kt-fc-lunar-row${item.favoured ? ' is-favoured' : ''}">
      <div class="kt-fc-lunar-activity">${escapeHtml(row.activity)}</div>
      <div class="kt-fc-lunar-advice">${escapeHtml(row.advice)}</div>
      <div class="kt-fc-lunar-source">${escapeHtml(tf('fc.source', { source: lunarSource(item) }))}</div>
    </li>`;
    }).join('');
    /* Folded, the disclosure's own summary carries the kicker and the phase, so
       the block must not print them a second line below its own summary. */
    const head = folded ? '' : `
      <header class="kt-fc-block-head kt-fc-lunar-head">
        <div>
          <p class="kt-fc-kicker">${t('fc.lunarKicker')}</p>
          <h3>${escapeHtml(lunarHeadline(lunar))}</h3>
        </div>
      </header>`;
    return `
    <section class="kt-fc-block kt-fc-lunar" data-forecast-view="lunar">
      ${head}
      <p class="kt-fc-disclaimer">${escapeHtml(lunarDisclaimer(lunar))}</p>
      <ul class="kt-fc-lunar-list">${rows}</ul>
      <p class="kt-fc-cal-key">${t('fc.lunarNote')}</p>
    </section>`;
}
/** One priority row of the active day: a label, and the one thing it says. */
function dayRow(label, value, extra = '') {
    return `
    <div class="kt-fc-day-row">
      <dt>${escapeHtml(label)}</dt>
      <dd>${escapeHtml(value)}</dd>
      ${extra}
    </div>`;
}
/**
 * The day's three cycles, read together: the numbers, the name of a repeated
 * number when there is one, and one composed reading. The plan comes from the
 * builder and the words from forecastLocale, so the reading always belongs to
 * exactly the three numbers printed above it.
 */
function renderCycleReading(day) {
    const { composition } = day;
    const { year, month, day: today } = composition.tuple;
    const relation = composition.relation === 'distinct' ? '' : `
        <p class="kt-fc-cycle-relation">${escapeHtml(t(`fc.relation.${composition.relation}`))}</p>`;
    return `
      <div class="kt-fc-numerology" data-forecast-numerology data-cycles="${year}-${month}-${today}"
           data-relation="${composition.relation}">
        <p class="kt-fc-cycles">${escapeHtml(tf('fc.cycles.line', { year, month, day: today }))}</p>${relation}
        <p class="kt-fc-lede">${escapeHtml(temporalReading(composition))}</p>
      </div>`;
}
/**
 * THE ACTIVE DAY, AND ONLY THE ACTIVE DAY.
 *
 * One day is open at a time and it answers five questions in the order a reader
 * asks them: what kind of day is this, what is it pushing toward, what pulls the
 * other way, what does that look like in practice, and how fast does it run.
 *
 * THE FIRST ANSWER IS THE THREE CYCLES TOGETHER. "What kind of day is this" used
 * to be the Personal Day's summary alone, which printed the same paragraph for
 * every 4-day whatever year and month it sat in. It is now the composed reading
 * of Year, Month and Day (temporalComposition.ts), with the year as the frame
 * and the day as the lightest layer. The summary is not deleted: it is still the
 * lede of the folded "What the number N generally means" below.
 *
 * THE OTHER FOUR HAVE EXACTLY ONE SOURCE each, and all four are day-scale: the
 * Personal Day's own authored fields - favourable, cautions, practical, pace -
 * which is what stops this card drifting into a restatement of the period. The
 * period is a separate area below, and the only part of it that appears here is
 * `context`: the composer's short-band note, which exists precisely to say how
 * today weighs against the longer climate.
 *
 * The five remaining fields - work, communication, relationships, planning,
 * rest - are the same for everyone in this Personal Day, so they stay behind the
 * disclosure the screen already uses to say so. Nothing is deleted; the day's
 * answer simply stops being ten paragraphs long.
 */
export function renderDayView(day, context = '') {
    const content = dayContent(day.personalDay);
    const label = dateLabel(day.date);
    const weekday = weekdayNames('long')[weekdayIndex(day.date)];
    return `
    <section class="kt-fc-block kt-fc-day" data-forecast-view="day">
      <header class="kt-fc-block-head">
        ${numberBadge(day.personalDay, tf('fc.badge.day', { label }))}
        <div>
          <p class="kt-fc-day-date">${escapeHtml(`${weekday} ${label}`)}</p>
          <h3>${escapeHtml(forecastKeyword(day.personalDay))}</h3>
          ${traceLine(day.trace)}
        </div>
      </header>

      ${renderCycleReading(day)}
      ${day.resonance
        ? `<p class="kt-fc-resonance">${escapeHtml(resonanceText(day.resonance, day.personalDay))}</p>` : ''}

      <dl class="kt-fc-day-rows">
        ${dayRow(t('fc.facet.favorable'), content.favorable)}
        ${dayRow(t('fc.facet.cautions'), content.cautions)}
        ${dayRow(t('fc.facet.practical'), content.practical)}
        ${dayRow(t('fc.facet.pace'), content.pace, context)}
      </dl>

      ${cycleReference(day.personalDay, content.summary, `
        ${facet(t('fc.facet.work'), content.work)}
        ${facet(t('fc.facet.communication'), content.communication)}
        ${facet(t('fc.facet.relationships'), content.relationships)}
        ${facet(t('fc.facet.planning'), content.planning)}
        ${facet(t('fc.facet.rest'), content.rest)}`)}

      <details class="kt-fc-method kt-fc-lunar-fold">
        <summary>${escapeHtml(`${t('fc.lunarKicker')} · ${lunarHeadline(day.lunar)}`)}</summary>
        ${renderLunarLayer(day.lunar, true)}
      </details>
    </section>`;
}
/* ------------------------------------------------------ the day profile -- */
/*
 * Line icons in the forecast's own accent, drawn here rather than borrowed: an
 * emoji row would be the one thing on the screen rendered by the phone's font
 * instead of by us, and it would look different on every device.
 */
const DOMAIN_ICONS = {
    atmosphere: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/>'
        + '<path d="M12 2.8v2.1M12 19.1v2.1M2.8 12h2.1M19.1 12h2.1M5.5 5.5l1.5 1.5M17 17l1.5 1.5'
        + 'M5.5 18.5 7 17M17 7l1.5-1.5"/></svg>',
    communication: '<svg viewBox="0 0 24 24"><path d="M3.5 6.5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v5'
        + 'a2 2 0 0 1-2 2H9.5l-3.5 3v-3h-.5a2 2 0 0 1-2-2z"/>'
        + '<path d="M19 9h.5a2 2 0 0 1 2 2v4.5a2 2 0 0 1-2 2H19v2.5l-3-2.5h-3.5"/></svg>',
    relationships: '<svg viewBox="0 0 24 24"><circle cx="9" cy="12" r="5.5"/>'
        + '<circle cx="15" cy="12" r="5.5"/></svg>',
    'private-life': '<svg viewBox="0 0 24 24"><path d="M3.5 11 12 4l8.5 7"/>'
        + '<path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5.5h4V20"/></svg>',
    work: '<svg viewBox="0 0 24 24"><rect x="3" y="7.5" width="18" height="12" rx="2"/>'
        + '<path d="M9 7.5V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8v1.7"/>'
        + '<path d="M3 12.5h18"/></svg>',
};
/**
 * Five cards under the day: how much the selected date leans on each area of
 * life, from 1 to 5 against an ordinary day for that area. The values and the
 * reasons for the scale live in temporal-synthesis/forecastDomains.ts; this only
 * draws them. Absent when there is no temporal reading, rather than shown empty.
 */
export function renderDomainProfile(profile, scale = 'day', today = false) {
    if (!profile)
        return '';
    /* The same five rows at every level; only the heading says which average. */
    const title = scale === 'day' ? t('fc.domains.title') : t(`fc.period.${scale}Profile`);
    const note = scale === 'day'
        ? t(today ? 'fc.domains.noteToday' : 'fc.domains.note')
        : t(`fc.period.${scale}ProfileNote`);
    const cards = profile.domains.map((domain) => {
        const label = t(`fc.domain.${domain.id}`);
        const state = t(`fc.domainLevel.${domain.level}`);
        const pips = [1, 2, 3, 4, 5]
            .map((step) => `<i${step <= domain.level ? ' class="is-on"' : ''}></i>`).join('');
        const aria = tf('fc.domains.aria', { domain: label, state, level: domain.level });
        return `
        <li class="kt-fc-domain" data-domain="${domain.id}" data-level="${domain.level}">
          <span class="kt-fc-domain-icon" aria-hidden="true">${DOMAIN_ICONS[domain.id]}</span>
          <span class="kt-fc-domain-label">${escapeHtml(label)}</span>
          <span class="kt-fc-domain-pips" role="img" aria-label="${escapeAttribute(aria)}">${pips}</span>
          <span class="kt-fc-domain-state" aria-hidden="true">${escapeHtml(state)}</span>
        </li>`;
    }).join('');
    return `
    <section class="kt-fc-block kt-fc-domains" aria-labelledby="kt-fc-domains-title">
      <h2 class="kt-fc-domains-title" id="kt-fc-domains-title">${escapeHtml(title)}</h2>
      <ul class="kt-fc-domain-grid">${cards}
      </ul>
      <p class="kt-fc-domains-note">${escapeHtml(note)}</p>
    </section>`;
}
/** The order of the three buttons is Day, Month, Year: from the immediate context outward (the owner-approved Forecast Graph System V1.2; it was Year, Month, Day). */
export const LEVEL_ORDER = ['day', 'month', 'year'];
export function renderLevelSwitch(level, levels = LEVEL_ORDER) {
    return `
      <nav class="kt-fc-levels" aria-label="${escapeAttribute(t('fc.level.aria'))}">${levels.map((value) => `
        <button type="button" class="kt-fc-tab kt-fc-level${value === level ? ' is-active' : ''}"
                data-forecast-level="${value}" aria-pressed="${value === level}">${escapeHtml(t(`fc.level.${value}`))}</button>`).join('')}
      </nav>`;
}
/* The trend's drawing box, in SVG units. Exported so the controller can map a
   tap to the nearest point with the same numbers the path was drawn with. */
export const TREND_BOX = { width: 320, height: 150, left: 40, right: 10, top: 12, bottom: 24 };
/* The monotone curve the trend is drawn with lives in forecast-graph/monotonePath.ts, shared with the graph system. */
/** The Day profile's five areas as the trend's descriptor: exactly the names and sentences it always had. */
function legacyTrendAreas() {
    return {
        order: FORECAST_DOMAIN_ORDER,
        label: (id) => t(`fc.domain.${id}`),
        state: (level) => t(`fc.domainLevel.${level}`),
        icon: (id) => DOMAIN_ICONS[id],
        copy: {
            areas: t('fc.trend.areas'),
            showArea: (area) => tf('fc.trend.showArea', { area }),
            prevArea: t('fc.trend.prevArea'),
            nextArea: t('fc.trend.nextArea'),
            openMonth: (point) => tf('fc.trend.openMonth', { point }),
            openDay: (point) => tf('fc.trend.openDay', { point }),
            valueText: (point, state) => tf('fc.trend.valueText', { point, state }),
            yearAria: (area, period) => tf('fc.trend.yearAria', { area, period }),
            monthAria: (area, period) => tf('fc.trend.monthAria', { area, period }),
            hintYear: t('fc.trend.hintYear'),
            hintMonth: t('fc.trend.hintMonth'),
        },
    };
}
/**
 * ONE AREA AT A TIME, LEFT TO RIGHT IN TIME.
 *
 * The x axis is the period - January to December, or the first of the month to
 * the last - and the y axis is the area's level on the same 1-5 scale as the
 * cards, with only its two ends named. Five lines on one graph would be five
 * stories read at once; this draws one, and the arrows, the dots and a sideways
 * swipe change which.
 *
 * Tapping picks the nearest point rather than a hit box: thirty days across a
 * phone is ten pixels a day, too small to aim at. The picked point is shown in
 * the caption, and the caption's button is what opens it - so a tap that lands
 * one day off costs a second tap, not a wrong screen.
 */
export function renderTrend(kind, series, area, selectedIndex, axisLabels, pointNames, period, areas = legacyTrendAreas()) {
    const box = TREND_BOX;
    const n = series.length;
    const plotWidth = box.width - box.left - box.right;
    const plotHeight = box.height - box.top - box.bottom;
    const xAt = (index) => box.left + (n <= 1 ? plotWidth / 2 : (index * plotWidth) / (n - 1));
    const yAt = (position) => box.top + plotHeight * (1 - (position - 0.5) / 5);
    const points = series.map((weights, index) => ({ x: xAt(index), y: yAt(trendPosition(area, weights[area])) }));
    const selected = Math.min(Math.max(selectedIndex, 0), Math.max(n - 1, 0));
    const areaLabel = areas.label(area);
    const selectedLevel = Math.round(trendPosition(area, series[selected]?.[area] ?? 0));
    const selectedState = areas.state(selectedLevel);
    const line = monotonePath(points);
    const floor = (box.top + plotHeight).toFixed(1);
    const fill = n > 1 ? `${line} L${points[n - 1].x.toFixed(1)},${floor} L${points[0].x.toFixed(1)},${floor} Z` : '';
    const gradientId = `kt-fc-trend-fill-${kind}`;
    const guides = [1, 2, 3, 4, 5].map((level) => `
          <line class="kt-fc-trend-guide" x1="${box.left}" y1="${yAt(level).toFixed(1)}" x2="${box.width - box.right}" y2="${yAt(level).toFixed(1)}" />`).join('');
    const ends = `
          <text class="kt-fc-trend-y" x="${box.left - 6}" y="${(yAt(5) + 3).toFixed(1)}" text-anchor="end">${escapeHtml(areas.axisWord ? areas.axisWord(5) : areas.state(5))}</text>
          <text class="kt-fc-trend-y" x="${box.left - 6}" y="${(yAt(1) + 3).toFixed(1)}" text-anchor="end">${escapeHtml(areas.axisWord ? areas.axisWord(1) : areas.state(1))}</text>`;
    const dots = points.map((point, index) => `
          <circle class="kt-fc-trend-dot${index === selected ? ' is-selected' : ''}" cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}"
                  r="${index === selected ? 4.5 : kind === 'year' ? 2.4 : 1.6}" />`).join('');
    const labels = axisLabels.map((label, index) => (label ? `
          <text class="kt-fc-trend-x${index === selected ? ' is-selected' : ''}" x="${xAt(index).toFixed(1)}" y="${box.height - 7}" text-anchor="middle">${escapeHtml(label)}</text>` : '')).join('');
    const cursor = n > 0 ? `
          <line class="kt-fc-trend-cursor" x1="${xAt(selected).toFixed(1)}" y1="${box.top}" x2="${xAt(selected).toFixed(1)}" y2="${floor}" />` : '';
    const areaDots = areas.order.map((id) => `
          <button type="button" class="kt-fc-trend-pick${id === area ? ' is-active' : ''}" data-forecast-area="${id}"
                  aria-pressed="${id === area}" aria-label="${escapeAttribute(areas.copy.showArea(areas.label(id)))}"></button>`).join('');
    const openLevel = kind === 'year' ? 'month' : 'day';
    const openLabel = (kind === 'year' ? areas.copy.openMonth : areas.copy.openDay)(pointNames[selected] ?? '');
    const helperLine = areas.helper ? `\n        <span class="kt-fc-trend-area-helper">${escapeHtml(areas.helper(area))}</span>` : '';
    return `
    <section class="kt-fc-block kt-fc-trend" data-forecast-trend-kind="${kind}">
      <div class="kt-fc-trend-head">
        <button type="button" class="kt-fc-trend-step" data-forecast-area-step="-1"
                aria-label="${escapeAttribute(areas.copy.prevArea)}">&#8249;</button>
        <p class="kt-fc-trend-area${areas.helper ? ' has-helper' : ''}">
          <span class="kt-fc-domain-icon kt-fc-trend-area-icon" aria-hidden="true">${areas.icon(area)}</span>
          <span class="kt-fc-trend-area-name">${escapeHtml(areaLabel)}</span>${helperLine}
        </p>
        <button type="button" class="kt-fc-trend-step" data-forecast-area-step="1"
                aria-label="${escapeAttribute(areas.copy.nextArea)}">&#8250;</button>
      </div>
      <div class="kt-fc-trend-picks" role="group" aria-label="${escapeAttribute(areas.copy.areas)}">${areaDots}
      </div>
      <figure class="kt-fc-trend-figure" data-forecast-trend="${kind}" data-points="${n}" tabindex="0"
              role="slider" aria-valuemin="1" aria-valuemax="${n}" aria-valuenow="${selected + 1}"
              aria-valuetext="${escapeAttribute(areas.copy.valueText(pointNames[selected] ?? '', selectedState))}"
              aria-label="${escapeAttribute((kind === 'year' ? areas.copy.yearAria : areas.copy.monthAria)(areaLabel, period))}">
        <svg class="kt-fc-trend-svg" viewBox="0 0 ${box.width} ${box.height}" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="${gradientId}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" class="kt-fc-trend-stop-top" />
              <stop offset="1" class="kt-fc-trend-stop-bottom" />
            </linearGradient>
          </defs>${guides}${ends}${cursor}
          ${fill ? `<path class="kt-fc-trend-fill" d="${fill}" fill="url(#${gradientId})" />` : ''}
          <path class="kt-fc-trend-line" d="${line}" />${dots}${labels}
        </svg>
      </figure>
      <div class="kt-fc-trend-caption">
        <p><strong>${escapeHtml(pointNames[selected] ?? '')}</strong> <span>&middot; ${escapeHtml(selectedState)}</span></p>
        <button type="button" class="kt-fc-trend-open" data-forecast-open-level="${openLevel}">${escapeHtml(openLabel)} &#8250;</button>
      </div>
      <p class="kt-fc-trend-hint">${escapeHtml(kind === 'year' ? areas.copy.hintYear : areas.copy.hintMonth)}</p>
    </section>`;
}
/* ------------------------------------------------------ influences -- */
/** The label a time scale is shown under. The day's own scale says "Today" when it is. */
const scaleLabel = (scale, today = false) => t(scale === 'day' && today ? 'fc.timescale.today' : `fc.timescale.${scale}`);
/**
 * INFLUENCES, GROUPED BY HOW LONG THEY LAST.
 *
 * Longest first - long-term background, this year, current longer transits,
 * this month - so the list reads as the hierarchy it is. Each influence says
 * what it brings in plain words; its system and its figures are in the
 * technical list, not here.
 */
export function renderInfluences(lines, today = false) {
    if (lines.length === 0)
        return '';
    const groups = TIME_SCALE_ORDER
        .map((scale) => ({ scale, items: lines.filter((line) => line.scale === scale) }))
        .filter((group) => group.items.length > 0);
    return `
    <div class="kt-fc-influences">${groups.map((group) => `
      <section class="kt-fc-influence-group" data-scale="${group.scale}">
        <h4 class="kt-fc-influence-scale">${escapeHtml(scaleLabel(group.scale, today))}</h4>
        <ul>${group.items.map((line) => `
          <li class="kt-fc-influence" data-fact="${escapeAttribute(line.factId)}">
            <p class="kt-fc-influence-name">${escapeHtml(line.name)}${line.when
        ? ` <span class="kt-fc-influence-when">· ${escapeHtml(line.when)}</span>` : ''}</p>
            ${line.meaning ? `<p class="kt-fc-influence-meaning">${escapeHtml(line.meaning)}</p>` : ''}
          </li>`).join('')}
        </ul>
      </section>`).join('')}
    </div>`;
}
const paragraphs = (items, className = 'kt-fc-tr-body') => items.map((item) => `<p class="${className}">${escapeHtml(item.text)}</p>`).join('');
/*
 * THE TECHNICAL LIST: WHAT A FACT IS, WHICH SYSTEM, WHEN, AND ITS FIGURES.
 *
 * Only the figures that hold for the whole period are printed for a period: a
 * transit's orb changes every day, so a Year or Month list shows which body,
 * which point and which aspect, and leaves the daily figure to the Day view.
 */
const DAILY_FIGURES = new Set(['orbDegrees', 'transitLongitude', 'natalLongitude', 'motion', 'longitude',
    'illumination']);
function provenanceLine(fact, whole) {
    const entries = Object.entries(fact.provenance).filter(([key]) => whole || !DAILY_FIGURES.has(key));
    return entries.map(([key, value]) => `${key}: ${value}`).join(' · ');
}
function evidenceRow(name, meta, provenance) {
    return `
    <div class="kt-tech-field">
      <dt>${escapeHtml(name)}</dt>
      <dd>${escapeHtml(meta.filter(Boolean).join(' · '))}</dd>
      ${provenance ? `<dd class="kt-tech-note">${escapeHtml(provenance)}</dd>` : ''}
    </div>`;
}
const bySystemAndScale = (items, scaleOf) => [...items].sort((left, right) => TIME_SCALE_ORDER.indexOf(scaleOf(left)) - TIME_SCALE_ORDER.indexOf(scaleOf(right)));
/** The Year's or the Month's evidence: every influence, and how much of the period it held. */
function periodEvidence(evidence, method) {
    const rows = bySystemAndScale(evidence, (entry) => entry.scale).map((entry) => evidenceRow(influenceName(entry.fact), [
        scaleLabel(entry.scale),
        t(`forecast.system.${entry.fact.system}`),
        entry.from === entry.to ? entry.from : `${entry.from} → ${entry.to}`,
        tf('fc.x.activeDays', { days: entry.days, total: entry.total }),
    ], provenanceLine(entry.fact, false))).join('');
    return `
      <div class="kt-fc-tr-evidence">
        <p class="kt-fc-cal-key">${escapeHtml(method)}</p>
        <dl>${rows}</dl>
      </div>`;
}
/** Strongest influences, the pull, and what to do - the part of a level after its graph. */
function renderNarrativeSections(narrative, level) {
    const tension = narrative.tensions.length > 0 ? `
      <h3 class="kt-fc-subhead">${escapeHtml(t('fc.x.mainTension'))}</h3>
      ${paragraphs(narrative.tensions)}` : '';
    const guidance = narrative.guidance ? `
      <h3 class="kt-fc-subhead">${escapeHtml(t(level === 'year' ? 'fc.x.todoYear' : 'fc.x.todoMonth'))}</h3>
      ${paragraphs([narrative.guidance])}` : '';
    if (narrative.influences.length === 0 && !tension && !guidance)
        return '';
    return `
    <section class="kt-fc-block kt-fc-narrative" data-forecast-narrative="${level}">
      ${narrative.influences.length > 0 ? `
      <h3 class="kt-fc-subhead">${escapeHtml(t('fc.x.strongest'))}</h3>
      ${renderInfluences(narrative.influences)}` : ''}
      ${tension}
      ${guidance}
    </section>`;
}
/*
 * THE YEAR: what direction the larger period is moving in.
 *
 * In this order and each said once: the year and what it is mainly about, its
 * five areas, how one area moves through it, the strongest influences, the main
 * pull, one thing to do. The Personal Year's general dictionary meaning - the
 * same for everyone in that number - stays folded, as it is on every level.
 */
/** The English Year and Month draw Life Dynamics; everything else draws the Day profile's five, as it always did. */
const isLifeModel = (period) => period.model === 'life-dynamics';
const trendAreasOf = (period) => (isLifeModel(period) ? lifeTrendAreas() : undefined);
const profileBlock = (period, scale, area) => (isLifeModel(period)
    ? renderLifeDynamics(period.profile, scale, area)
    : renderDomainProfile(period.profile, scale));
/**
 * THE GRAPH SYSTEM'S BLOCK IN PLACE OF THE OLD TREND, WHEN ASKED FOR. It is built from the rows the period already carries and the Forecast's own
 * selected date; for anything it cannot draw (the legacy Slovak areas, no graph requested) the caller's own trend is what is drawn.
 */
const graphOrTrend = (graph, kind, period, area, forecast, trend) => {
    if (!graph || !isLifeModel(period))
        return trend();
    const block = renderGraphBlock(kind, {
        series: period.series, profile: period.profile, birthTimeEstimated: Boolean(period.narrative.plan.estimatedTime),
    }, area, forecast.selected, graph);
    return block ?? trend();
};
export function renderYearLevel(forecast, period, area, graph) {
    const { year } = forecast;
    const long = monthNames();
    const initials = monthNames('short').map((name) => name.charAt(0).toUpperCase());
    /* THE PANEL FIRST. On the English Year the overview comes before the written reading: the panel, the graph
       of the theme it selects, then the headline and everything the reading says. The Slovak Year keeps its order. */
    if (isLifeModel(period)) {
        return `
    ${profileBlock(period, 'year', area)}

    ${graphOrTrend(graph, 'year', period, area, forecast, () => renderTrend('year', period.series, area, forecast.selected.month - 1, initials, long, String(year.year), trendAreasOf(period)))}

    <section class="kt-fc-block kt-fc-period" data-forecast-view="year-level">
      <header class="kt-fc-block-head">
        ${numberBadge(year.personalYear, tf('fc.badge.year', { year: year.year }))}
        <div>
          <p class="kt-fc-day-date">${year.year}</p>
          <h3>${escapeHtml(forecastKeyword(year.personalYear))}</h3>
          ${traceLine(year.trace)}
        </div>
      </header>
      ${paragraphs(period.narrative.summary, 'kt-fc-lede kt-fc-period-lede')}
    </section>

    ${renderNarrativeSections(period.narrative, 'year')}

    <div class="kt-fc-block kt-fc-period-refs">
      ${yearReference(year)}
      <details class="kt-fc-method kt-fc-year-markers">
        <summary>${escapeHtml(t('fc.relevantMonths'))}</summary>
        ${yearMarkers(year)}
      </details>
    </div>`;
    }
    return `
    <section class="kt-fc-block kt-fc-period" data-forecast-view="year-level">
      <header class="kt-fc-block-head">
        ${numberBadge(year.personalYear, tf('fc.badge.year', { year: year.year }))}
        <div>
          <p class="kt-fc-day-date">${year.year}</p>
          <h3>${escapeHtml(forecastKeyword(year.personalYear))}</h3>
          ${traceLine(year.trace)}
        </div>
      </header>
      ${paragraphs(period.narrative.summary, 'kt-fc-lede kt-fc-period-lede')}
    </section>

    ${profileBlock(period, 'year', area)}

    ${renderTrend('year', period.series, area, forecast.selected.month - 1, initials, long, String(year.year), trendAreasOf(period))}

    ${renderNarrativeSections(period.narrative, 'year')}

    <div class="kt-fc-block kt-fc-period-refs">
      ${yearReference(year)}
      <details class="kt-fc-method kt-fc-year-markers">
        <summary>${escapeHtml(t('fc.relevantMonths'))}</summary>
        ${yearMarkers(year)}
      </details>
    </div>`;
}
/* THE MONTH: how the year is behaving right now. Same shape, the month's own layer. */
export function renderMonthLevel(forecast, period, area, graph) {
    const { month } = forecast;
    const monthName = monthNames()[month.month - 1];
    const total = period.series.length;
    const axis = period.series.map((_, index) => {
        const day = index + 1;
        return day === 1 || day === total || day % 5 === 0 ? String(day) : '';
    });
    const names = period.series.map((_, index) => `${index + 1} ${monthName}`);
    if (isLifeModel(period)) {
        return `
    ${profileBlock(period, 'month', area)}

    ${graphOrTrend(graph, 'month', period, area, forecast, () => renderTrend('month', period.series, area, forecast.selected.day - 1, axis, names, `${monthName} ${month.year}`, trendAreasOf(period)))}

    <section class="kt-fc-block kt-fc-period" data-forecast-view="month-level">
      <header class="kt-fc-block-head">
        ${numberBadge(month.personalMonth, tf('fc.badge.month', { month: monthName, year: month.year }))}
        <div>
          <p class="kt-fc-day-date">${escapeHtml(`${monthName} ${month.year}`)}</p>
          <h3>${escapeHtml(forecastKeyword(month.personalMonth))}</h3>
          ${traceLine(month.trace)}
        </div>
      </header>
      ${paragraphs(period.narrative.summary, 'kt-fc-lede kt-fc-period-lede')}
    </section>

    ${renderNarrativeSections(period.narrative, 'month')}

    <div class="kt-fc-block kt-fc-period-refs">
      ${monthReference(month)}
    </div>`;
    }
    return `
    <section class="kt-fc-block kt-fc-period" data-forecast-view="month-level">
      <header class="kt-fc-block-head">
        ${numberBadge(month.personalMonth, tf('fc.badge.month', { month: monthName, year: month.year }))}
        <div>
          <p class="kt-fc-day-date">${escapeHtml(`${monthName} ${month.year}`)}</p>
          <h3>${escapeHtml(forecastKeyword(month.personalMonth))}</h3>
          ${traceLine(month.trace)}
        </div>
      </header>
      ${paragraphs(period.narrative.summary, 'kt-fc-lede kt-fc-period-lede')}
    </section>

    ${profileBlock(period, 'month', area)}

    ${renderTrend('month', period.series, area, forecast.selected.day - 1, axis, names, `${monthName} ${month.year}`, trendAreasOf(period))}

    ${renderNarrativeSections(period.narrative, 'month')}

    <div class="kt-fc-block kt-fc-period-refs">
      ${monthReference(month)}
    </div>`;
}
/* --------------------------------------------------- the day's frame -- */
/*
 * THE DAY, AND THE LARGER PERIOD IT SITS IN.
 *
 * The day card borrows exactly one line from the period: `watch`, which says how
 * this day stands against it - slower, in step, or its own note - in plain words
 * instead of the old „Personal Day 2 and Moon phase: First Quarter sit on top of
 * all this". Everything else about the period is the background climate below
 * the day profile: what it is mainly about, what supports it, and - one tap
 * away - where it pulls against itself, what to do with it and how it was
 * calculated. Each of those is said once.
 */
/** The `watch` section, for the active day. Empty when the composer wrote none. */
export function renderDayContext(reading) {
    const watch = reading?.sections.find((section) => section.id === 'watch');
    if (!watch || watch.paragraphs.length === 0)
        return '';
    return `
    <dd class="kt-fc-day-context">
      <span class="kt-fc-day-context-label">${escapeHtml(watch.heading)}</span>
      ${watch.paragraphs.map((paragraph) => escapeHtml(paragraph.text)).join(' ')}
    </dd>`;
}
/** The day's evidence: everything in force on the date, grouped by how long it lasts. */
function dayEvidence(reading, today) {
    /*
     * Every current fact with its time scale, its system, its window and its
     * provenance, so a reader who wants to check which transit or which pillar
     * produced a sentence can. Engine identifiers and figures pass through
     * untranslated, exactly as they do in the Portrait's technical appendix.
     */
    const evidence = bySystemAndScale(reading.evidence, timeScaleOf).map((fact) => evidenceRow(influenceName(fact), [
        scaleLabel(timeScaleOf(fact), today),
        t(`forecast.system.${fact.system}`),
        fact.window.from === fact.window.to ? fact.window.from : `${fact.window.from} → ${fact.window.to}`,
    ], provenanceLine(fact, true))).join('');
    /*
     * AND WHAT WAS NOT READ, IN THE SAME DISCLOSURE.
     *
     * `missing` is a system that could not calculate; `withheld` is a fact that
     * exists and is deliberately not being claimed - the ten-year luck pillar for
     * a reader whose body was left undefined, where the traditional direction rule
     * simply has no answer. Both belong here, and the second belongs here most:
     * without it the absence looks like a bug, and the honest reason for it -
     * which is the reason the rest of the reading can be trusted - stays hidden.
     *
     * The code is what gets translated, not the sentence. The English reason lives
     * in the model for the trace; a Slovak reader needs Slovak, and a lookup keyed
     * on an English sentence would break the moment either one is reworded.
     */
    const gaps = [
        ...reading.coverage.withheld.map((entry) => {
            const [subject] = entry.code.split('.');
            return {
                what: t(`forecast.gap.${subject}`),
                why: t(`forecast.gap.${entry.code}`),
            };
        }),
        ...reading.coverage.missing.map((entry) => ({
            what: t(`forecast.system.${entry.system}`), why: engineProse(entry.reason),
        })),
    ];
    const gapList = gaps.length === 0 ? '' : `
    <div class="kt-fc-tr-gaps">
      <p class="kt-tech-note">${t('forecast.technical.notRead')}</p>
      <dl>${gaps.map((gap) => `
        <div class="kt-tech-field">
          <dt>${escapeHtml(gap.what)}</dt>
          <dd class="kt-tech-note">${escapeHtml(gap.why)}</dd>
        </div>`).join('')}</dl>
    </div>`;
    return `
      <div class="kt-fc-tr-evidence">
        <p class="kt-fc-cal-key">${escapeHtml(t('fc.x.methodDay'))}</p>
        <dl>${evidence}</dl>
        ${gapList}
      </div>`;
}
/* ------------------------------------------------------- the climate -- */
/**
 * BACKGROUND CLIMATE — the larger period, once, for the whole rail.
 *
 * Open: what the period is mainly about, and what supports it, by time scale.
 * Folded: where it pulls against itself (with the influences doing the
 * pulling) and what to do with it. The evidence is in the screen's one
 * technical disclosure, "How this is calculated", with everything else.
 *
 * WITHOUT A READING THE AREA STILL EXISTS. A profile whose pillars could not
 * calculate still has a Personal Year and a Personal Month, and those are the
 * two slowest things this screen knows. The old forecast is the floor here as
 * everywhere else.
 */
export function renderClimate(forecast, reading, today = false) {
    if (!reading) {
        const { year, month } = forecast;
        const lines = [
            {
                factId: 'numerology:personal-year', scale: 'year', when: '', meaning: '',
                name: tf('fc.climate.personalYear', { number: year.personalYear, keyword: forecastKeyword(year.personalYear) }),
            },
            {
                factId: 'numerology:personal-month', scale: 'month', when: '', meaning: '',
                name: tf('fc.climate.personalMonth', { number: month.personalMonth, keyword: forecastKeyword(month.personalMonth) }),
            },
        ];
        return `
    <section class="kt-fc-climate" data-forecast-climate>
      <h2 class="kt-fc-subhead">${t('fc.climate.title')}</h2>
      ${renderInfluences(lines)}
    </section>`;
    }
    const section = (id) => reading.sections.find((entry) => entry.id === id) ?? null;
    const climate = section('climate');
    const support = section('support');
    const friction = section('friction');
    const practical = section('practical');
    const folded = [
        friction ? `
        <section class="kt-fc-tr-section" data-forecast-section="friction">
          <h3 class="kt-fc-subhead">${escapeHtml(friction.heading)}</h3>
          ${paragraphs(friction.paragraphs)}
          ${renderInfluences(friction.lines ?? [], today)}
        </section>` : '',
        practical ? `
        <section class="kt-fc-tr-section" data-forecast-section="practical">
          <h3 class="kt-fc-subhead">${escapeHtml(practical.heading)}</h3>
          ${paragraphs(practical.paragraphs)}
        </section>` : '',
    ].join('');
    return `
    <section class="kt-fc-climate" data-forecast-climate>
      <h2 class="kt-fc-subhead">${t('fc.climate.title')}</h2>
      ${climate ? paragraphs(climate.paragraphs, 'kt-fc-climate-lede') : ''}
      ${support ? `
      <h3 class="kt-fc-climate-kicker" data-forecast-section="support">${escapeHtml(support.heading)}</h3>
      ${renderInfluences(support.lines ?? [], today)}` : ''}
      <details class="kt-fc-method kt-fc-climate-full">
        <summary>${escapeHtml(t('fc.x.more'))}</summary>
        <div class="kt-fc-temporal">
          ${folded}
        </div>
      </details>
    </section>`;
}
export function renderNumerologyForecast(forecast, state, reading = null, domains = null, period = null, 
/**
 * The day as a briefing (Forecast v2). English only: the caller passes null in
 * Slovak, and then the Day level is laid out exactly as it always was.
 */
dayPlan = null, 
/** The exact Full Moon / New Moon block (lunar-forecast/lunarEventView), drawn under the Moon on the Day level; empty draws nothing. */
moonEvent = '') {
    const { year, month, day } = forecast;
    /*
     * ONE WAY TO CHANGE THE SCALE.
     *
     * The Day used to carry its own Month and Year tabs - disclosures opening a
     * calendar and a year overview underneath the day - which the Year / Month /
     * Day switch now does properly. Two controls for one job is one too many, so
     * the tabs are gone; `activeView` survives only as the answer for a caller
     * that does not name a level.
     */
    const level = state.level ?? state.activeView ?? 'day';
    const area = state.area ?? (period?.model === 'life-dynamics' ? lifeTrendAreas().order[0] : FORECAST_DOMAIN_ORDER[0]);
    const today = state.today ?? false;
    /* Today's Life Dynamics: a second view of the Day plan's own evidence, English only (there is no plan in Slovak). */
    const lifeCard = dayPlan ? dayLifeCardOf(dayPlan, { isToday: today }) : null;
    /*
     * THE RAILS GO DOWN TO THE LEVEL ON SCREEN, AND NO FURTHER.
     *
     * The Year shows the years to pick from; the Month adds the months; the Day
     * adds the days. A day strip under the Year view was thirty chips the view
     * could not use - picking one jumped out of the year entirely - and the month
     * view's own graph already picks its days.
     */
    /*
     * ONE TECHNICAL DISCLOSURE, AT THE END OF EVERY LEVEL.
     *
     * The meaning is on the screen; the evidence is here - every influence with
     * its time scale, its system, its dates and its figures, what was not read
     * and why, and the numerology arithmetic. It used to be two disclosures with
     * nearly the same title, and a reader could not tell which one to open.
     */
    const technical = level === 'day'
        ? (reading ? dayEvidence(reading, today) : '')
        : period
            ? periodEvidence(period.evidence, period.model === 'life-dynamics'
                ? (level === 'year' ? LIFE_COPY.methodYear(year.year) : LIFE_COPY.methodMonth)
                : (level === 'year' ? tf('fc.x.methodYear', { year: year.year }) : t('fc.x.methodMonth')))
            : '';
    const rails = [
        renderYearRail(forecast.selected, forecast.birth),
        level !== 'year' ? renderMonthRail(forecast.selected, forecast.birth) : '',
        level === 'day' ? renderDayRail(month, forecast.selected, moonEvent ? ['new', 'full'] : []) : '',
    ].join('');
    return `
    <div class="kt-forecast${state.graph ? ' kt-fg-on' : ''}">
      <h1 class="kt-fc-title">${t('fc.title')}</h1>
      ${renderLevelSwitch(level)}

      <div class="kt-fc-rails" role="group" aria-label="${t('fc.chooseDate')}" data-forecast-rails="${level}">
        ${rails}
        <!--
          TODAY sits under all three rather than beside the year. On the year row
          it took width away from the strip and pulled that one carousel out of
          line with the other two; underneath, it belongs to the whole picker and
          none of the three has to make room for it.
        -->
        <div class="kt-fc-today-row">
          <button type="button" class="kt-fc-today" data-forecast-today>${t('fc.today')}</button>
        </div>
      </div>
${level === 'day' ? renderMoonStage(forecast.selected, day.lunar, 'north', { compact: moonEvent }) : ''}
      ${level === 'year'
        /* Without the temporal model there is no profile, trend or reading - the
           year's own numerology view is the floor, exactly as the day's is. */
        ? (period ? renderYearLevel(forecast, period, area, state.graph) : renderYearView(year))
        : level === 'month'
            ? (period ? renderMonthLevel(forecast, period, area, state.graph) : renderMonthView(month, forecast.selected))
            : (dayPlan
                /* The advice and its reading first. The five scored areas and the day number's fixed facets were each a
                   second, parallel assessment of the day - the first was measured to take only 1-13% of its movement from
                   the day itself - and stay off the English Day. The PERIOD's own reading (its climate, what it is made of,
                   where it pulls against itself, what to do with it) is the legacy reading, restored whole, labelled as the
                   period and closed, below the advice. The Month and Year screens and the Slovak Day are untouched. */
                ? `
      ${renderDayLifeDynamics(lifeCard)}

      ${renderDayPlanCard(dayPlan, today, lifeCard)}

      <details class="kt-fc-method kt-fc-larger-period" data-forecast-larger-period>
        <summary>${escapeHtml(ADVICE_HEADINGS.longerStretch)}</summary>
        <p class="kt-fc-dp-note">${escapeHtml(ADVICE_HEADINGS.longerStretchNote)}</p>
        ${renderClimate(forecast, reading, today)}
      </details>`
                : `
      ${renderDayView(day, renderDayContext(reading))}

      ${renderDomainProfile(domains, 'day', today)}

      ${renderClimate(forecast, reading, today)}`)}

      <details class="kt-fc-method kt-fc-technical">
        <summary>${t('fc.method')}</summary>
        ${technical}
        <p>${escapeHtml(methodologyNote())}</p>
        <p>${escapeHtml(t('fc.methodBody'))}</p>
      </details>
    </div>`;
}
