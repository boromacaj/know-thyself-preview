/**
 * Energy Forecast meters.
 *
 * One geometry for every metric: a thin 180-degree arc, left to right across the
 * top. Unsigned metrics (0-100) fill from the left; bipolar metrics (-100..+100)
 * sit at top-centre as zero and fill left or right. Values are printed, never
 * approximated by the drawing.
 */
import { escapeHtml } from '../../format.js?v=2ea79e9';
const ARC_START_DEGREES = 180;
const ARC_END_DEGREES = 0;
function geometry(size) {
    const radius = size / 2 - 12;
    return { width: size, height: size / 2 + 26, centreX: size / 2, centreY: size / 2, radius };
}
function polar(centreX, centreY, radius, degrees) {
    const radians = (degrees * Math.PI) / 180;
    return [centreX + radius * Math.cos(radians), centreY - radius * Math.sin(radians)];
}
function arcPath(g, fromDegrees, toDegrees, radius = g.radius) {
    const [startX, startY] = polar(g.centreX, g.centreY, radius, fromDegrees);
    const [endX, endY] = polar(g.centreX, g.centreY, radius, toDegrees);
    const largeArc = Math.abs(fromDegrees - toDegrees) > 180 ? 1 : 0;
    const sweep = fromDegrees > toDegrees ? 1 : 0;
    return `M ${round(startX)} ${round(startY)} A ${round(radius)} ${round(radius)} 0 ${largeArc} ${sweep} ${round(endX)} ${round(endY)}`;
}
/** 0..100 -> 180..0 degrees. */
function angleForFraction(fraction) {
    return ARC_START_DEGREES - (ARC_START_DEGREES - ARC_END_DEGREES) * clamp01(fraction);
}
function ticks(g, count) {
    return Array.from({ length: count + 1 }, (_, index) => {
        const degrees = angleForFraction(index / count);
        const isMajor = index === 0 || index === count || index === count / 2;
        const inner = g.radius - (isMajor ? 9 : 5);
        const [x1, y1] = polar(g.centreX, g.centreY, inner, degrees);
        const [x2, y2] = polar(g.centreX, g.centreY, g.radius - 1, degrees);
        return `<line class="ef-gauge-tick${isMajor ? ' is-major' : ''}" x1="${round(x1)}" y1="${round(y1)}" x2="${round(x2)}" y2="${round(y2)}" />`;
    }).join('');
}
/** Unsigned 0-100 meter: INTENSITY, CONVERGENCE, EMOTIONAL CHARGE. */
export function renderUnsignedGauge({ label, value, tone, caption, size = 156 }) {
    const g = geometry(size);
    const fraction = clamp01(value / 100);
    const endDegrees = angleForFraction(fraction);
    const [headX, headY] = polar(g.centreX, g.centreY, g.radius, endDegrees);
    return `<figure class="ef-gauge ef-gauge--${tone}">
    <svg viewBox="0 0 ${g.width} ${g.height}" role="img" aria-label="${escapeHtml(label)} ${value} out of 100" focusable="false">
      ${ticks(g, 10)}
      <path class="ef-gauge-track" d="${arcPath(g, ARC_START_DEGREES, ARC_END_DEGREES)}" />
      ${fraction > 0.001 ? `<path class="ef-gauge-value" d="${arcPath(g, ARC_START_DEGREES, endDegrees)}" />` : ''}
      <circle class="ef-gauge-head" cx="${round(headX)}" cy="${round(headY)}" r="3.2" />
      <text class="ef-gauge-number" x="${g.centreX}" y="${g.centreY - 6}" text-anchor="middle">${Math.round(value)}</text>
      <text class="ef-gauge-scale" x="${g.centreX}" y="${g.centreY + 12}" text-anchor="middle">/100</text>
    </svg>
    <figcaption>
      <span class="ef-gauge-label">${escapeHtml(label)}</span>
      ${caption ? `<span class="ef-gauge-caption">${escapeHtml(caption)}</span>` : ''}
    </figcaption>
  </figure>`;
}
export function renderAxisMeter({ label, value, negativePole, positivePole }) {
    const clamped = Math.max(-100, Math.min(100, Math.round(value)));
    const position = (clamped + 100) / 2; // -100..100 -> 0..100
    const pole = clamped === 0 ? 'neutral' : clamped > 0 ? 'positive' : 'negative';
    const leaning = clamped === 0
        ? 'balanced'
        : `${Math.abs(clamped)} toward ${clamped > 0 ? positivePole.toLowerCase() : negativePole.toLowerCase()}`;
    return `<div class="ef-axis is-${pole}" role="img" aria-label="${escapeHtml(label)}: ${leaning}">
    <div class="ef-axis-head">
      <span class="ef-axis-label">${escapeHtml(label)}</span>
      <span class="ef-axis-value">${clamped > 0 ? '+' : ''}${clamped}</span>
    </div>
    <div class="ef-axis-track">
      <span class="ef-axis-pole is-negative">${escapeHtml(negativePole)}</span>
      <span class="ef-axis-rail">
        <i class="ef-axis-centre" aria-hidden="true"></i>
        <i class="ef-axis-fill" style="--ef-from:${Math.min(50, position)}%; --ef-to:${Math.max(50, position)}%" aria-hidden="true"></i>
        <i class="ef-axis-marker" style="left:${position}%" aria-hidden="true"></i>
      </span>
      <span class="ef-axis-pole is-positive">${escapeHtml(positivePole)}</span>
    </div>
    <p class="ef-axis-reading">${escapeHtml(leaning)}</p>
  </div>`;
}
/** Tier 1: the three magnitude metrics, as large arcs. Sits beside the signature. */
export function renderPrimaryGauges(values, captionSuffix = '') {
    const caption = captionSuffix || undefined;
    return `<div class="ef-primary-gauges">
    ${renderUnsignedGauge({ label: 'Intensity', value: values.intensity, tone: 'intensity', caption, size: 188 })}
    ${renderUnsignedGauge({ label: 'Convergence', value: values.convergence, tone: 'convergence', caption, size: 188 })}
    ${renderUnsignedGauge({ label: 'Emotional charge', value: values.emotionalCharge, tone: 'charge', caption, size: 188 })}
  </div>`;
}
/** Tier 2: the three bipolar balances, as compact named-pole meters. */
export function renderAxisMeters(values) {
    return `<div class="ef-axis-row">
    ${renderAxisMeter({ label: 'Action / Reflection', value: values.actionReflection, negativePole: 'Reflection', positivePole: 'Action' })}
    ${renderAxisMeter({ label: 'Expansion / Contraction', value: values.expansionContraction, negativePole: 'Contraction', positivePole: 'Expansion' })}
    ${renderAxisMeter({ label: 'Stability / Change', value: values.stabilityChange, negativePole: 'Stability', positivePole: 'Change' })}
  </div>`;
}
function clamp01(value) {
    return Math.min(1, Math.max(0, value));
}
function round(value) {
    return Math.round(value * 100) / 100;
}
