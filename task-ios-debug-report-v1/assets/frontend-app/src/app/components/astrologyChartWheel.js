import { planetGlyph as planetGlyphMark, signGlyph } from '../pillar-reading/glyphs/astrologyGlyphs.js?v=b5ef5ed';
import { escapeHtml } from '../format.js?v=b5ef5ed';
import { signWord } from '../i18n/engineProse.js?v=b5ef5ed';
import { t, tf } from '../i18n/uiStrings.js?v=b5ef5ed';
import { buildChartModel, isStandardChart, resolveChartOptions, } from '../astrology/chartModel.js?v=b5ef5ed';
import { DEFAULT_HOUSE_SYSTEM } from '../astrology/houseSystems.js?v=b5ef5ed';
import { readStoredChartOptions } from './astrologyChartPreferences.js?v=b5ef5ed';
const CX = 250;
const CY = 250;
const ZODIAC_OUTER_RADIUS = 236;
const ZODIAC_INNER_RADIUS = 200;
const HOUSE_NUMBER_RADIUS = 182;
const PLANET_RING_RADIUS = 158;
const ASPECT_RING_RADIUS = 122;
const TICK_INNER_RADIUS = 196;
/** Where the Advanced Chart's degree labels stand: just inside each body's glyph, outside the aspect ring. */
const DEGREE_LABEL_RADIUS = 137;
const ZODIAC_NAMES = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];
/* The Unicode zodiac and planet characters that used to live here (♈, ☉, and
   the rest) have been replaced by the shared SVG glyph system. They were
   platform-decided artwork: colour emoji on several Android builds, thin text
   glyphs on iOS, and a stroke weight that never matched anything else on the
   page. See app/pillar-reading/glyphs/astrologyGlyphs.ts. */
/** Faint per-element sector tint. Purely decorative grouping, not a calculated value. */
const ELEMENT_TINT = {
    Fire: 'rgba(213,182,109,0.10)',
    Earth: 'rgba(105,183,173,0.10)',
    Air: 'rgba(180,200,220,0.08)',
    Water: 'rgba(120,140,220,0.10)',
};
const ZODIAC_ELEMENT = {
    Aries: 'Fire', Leo: 'Fire', Sagittarius: 'Fire',
    Taurus: 'Earth', Virgo: 'Earth', Capricorn: 'Earth',
    Gemini: 'Air', Libra: 'Air', Aquarius: 'Air',
    Cancer: 'Water', Scorpio: 'Water', Pisces: 'Water',
};
/**
 * The line each aspect is drawn with. The MAJOR aspects are the chart's primary lines and keep the styles they have always had. The MINOR aspects are deliberately
 * secondary - thinner, fainter, and each with its own dash pattern so that no minor line is told from a major one, or from another minor one, by colour alone.
 */
const ASPECT_LINE_STYLE = {
    Trine: { stroke: 'rgba(105,183,173,0.85)', width: 2 },
    Sextile: { stroke: 'rgba(105,183,173,0.5)', width: 1.1 },
    Square: { stroke: 'rgba(224,122,95,0.8)', width: 1.6, dash: '4 3' },
    Opposition: { stroke: 'rgba(196,90,90,0.85)', width: 2 },
    Conjunction: { stroke: 'rgba(213,182,109,0.6)', width: 1 },
    Semisextile: { stroke: 'rgba(105,183,173,0.4)', width: 0.7, dash: '1 3' },
    Semisquare: { stroke: 'rgba(224,122,95,0.44)', width: 0.7, dash: '2 3' },
    Sesquiquadrate: { stroke: 'rgba(224,122,95,0.44)', width: 0.7, dash: '6 3 1 3' },
    Quincunx: { stroke: 'rgba(213,182,109,0.5)', width: 0.7, dash: '1 2 4 2' },
};
/**
 * Resolves label-collision by nudging closely grouped planets apart along the ring while
 * keeping their true longitude available for a tick/spoke back to the zodiac ring. Simple
 * circular relaxation (few iterations, symmetric push) — adequate for up to a dozen bodies.
 * More than a dozen (the Advanced Chart's extra objects) are given more iterations to settle;
 * a chart with twelve or fewer runs the iteration count it always has, so it is drawn as before.
 * Deterministic: the order is by true longitude, and nothing here is random.
 */
function resolveDisplayAngles(items, minSeparation = 8) {
    const sorted = [...items].sort((a, b) => a.longitude - b.longitude).map((item) => ({ ...item, display: item.longitude }));
    const n = sorted.length;
    if (n < 2)
        return sorted;
    const iterations = n > 12 ? 60 : 10;
    for (let iteration = 0; iteration < iterations; iteration += 1) {
        for (let i = 1; i < n; i += 1) {
            const gap = sorted[i].display - sorted[i - 1].display;
            if (gap < minSeparation) {
                const deficit = minSeparation - gap;
                sorted[i - 1].display -= deficit / 2;
                sorted[i].display += deficit / 2;
            }
        }
        const wrapGap = (sorted[0].display + 360) - sorted[n - 1].display;
        if (wrapGap < minSeparation) {
            const deficit = minSeparation - wrapGap;
            sorted[n - 1].display += deficit / 2;
            sorted[0].display -= deficit / 2;
        }
    }
    return sorted;
}
function pointOnRing(displayLongitude, rotationLongitude, radius) {
    const screenAngleDeg = normalizeDegrees(180 + (displayLongitude - rotationLongitude));
    const rad = (screenAngleDeg * Math.PI) / 180;
    return { x: CX + radius * Math.cos(rad), y: CY - radius * Math.sin(rad) };
}
export function buildWheelPayload(data) {
    const model = buildChartModel(data);
    const { anglesSuppressed } = data;
    const window = anglesSuppressed ? data.timeWindow ?? null : null;
    const arcs = {};
    const tooltipSigns = {};
    if (window) {
        for (const entry of window.bodies) {
            const sweep = ((((entry.endLongitude - entry.startLongitude) % 360) + 540) % 360) - 180;
            arcs[entry.body] = { start: entry.startLongitude, end: entry.endLongitude, middle: normalizeDegrees(entry.startLongitude + sweep / 2) };
            tooltipSigns[entry.body] = entry.spans.length > 1 ? entry.spans.map((span) => span.value).join(' / ') : '';
        }
    }
    return {
        model,
        anglesSuppressed,
        ...(data.timePrecision ? { timePrecision: data.timePrecision } : {}),
        arcs,
        tooltipSigns,
        provenAllDay: window ? [...window.aspectsThroughout] : [],
        ascendantSign: data.astrology.houses?.angles.ascendant.sign ?? null,
    };
}
/** The options the wheel is drawn with: the reader's stored display preferences (the standard chart when there are none), limited to what this chart can do. */
function initialOptions(model, options) {
    return resolveChartOptions(model, options ?? readStoredChartOptions());
}
export function renderAstrologyChartWheel(data, options) {
    const { astrology, anglesSuppressed } = data;
    if (astrology.status === 'blocked' || !astrology.ephemeris) {
        return `<section class="pillar-visual astro-chart-wheel astro-chart-wheel--blocked" aria-label="${t('chart.astro.unavailableAria')}">
      <p class="empty-state">${t('chart.unavailableUntilMoment')}</p>
    </section>`;
    }
    const payload = buildWheelPayload(data);
    const resolved = initialOptions(payload.model, options);
    const svg = drawWheelSvg(payload, resolved);
    const footer = wheelFooterHtml(payload, resolved);
    return `<section class="pillar-visual astro-chart-wheel${anglesSuppressed ? ' is-suppressed' : ' has-source-data'}" aria-label="${t(anglesSuppressed ? 'chart.astro.ariaSuppressed' : 'chart.astro.aria')}" data-astro-wheel>
    <span class="astro-wheel-frost" aria-hidden="true"></span>
    ${svg}
    ${footer}
    ${renderAdvancedPanel(payload, resolved)}
    <script type="application/json" data-astro-wheel-data>${serializePayload(payload)}</script>
  </section>`;
}
/** The embedded payload as JSON that cannot end the script element early or be read as markup. */
function serializePayload(payload) {
    return JSON.stringify(payload).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}
/** The wheel itself, for these options. A pure function of its arguments: the section calls it once, and a toggle calls it again with the same payload. */
export function drawWheelSvg(payload, resolved) {
    const { model, anglesSuppressed } = payload;
    const system = model.houseSystems.find((item) => item.id === resolved.houseSystem) ?? model.houseSystems[0] ?? null;
    const housesAvailable = Boolean(model.angles) && system !== null && !anglesSuppressed;
    const rotationLongitude = housesAvailable ? system.cusps[0] : 0;
    /*
     * WITHOUT A BIRTH TIME THE WHEEL DRAWS THE DAY, NOT NOON.
     *
     * The engine's positions are the 12:00 reference. For an unknown time each
     * body is drawn at the middle of the arc it covers across the birth day, with
     * that arc marked on the ring where it is wide enough to see (the Moon's is
     * about thirteen degrees), and an aspect line is drawn only when the scan
     * proved the aspect in orb at every instant of the day - a line that holds at
     * noon but not all day would be noon geometry passed off as the chart.
     */
    const shown = model.bodies.filter((body) => body.kind === 'planet'
        || (body.kind === 'node' && resolved.lunarNodes)
        || (body.kind === 'extended' && resolved.extendedObjects.includes(body.id)));
    const allBodies = shown.map((body) => {
        const arc = anglesSuppressed ? payload.arcs[body.id] : undefined;
        return arc ? { ...body, longitude: arc.middle } : body;
    });
    const slots = resolveDisplayAngles(allBodies.map((body) => ({ body: body.id, longitude: body.longitude })));
    const slotByBody = new Map(slots.map((slot) => [slot.body, slot]));
    const zodiacSectors = ZODIAC_NAMES.map((sign, index) => zodiacSector(sign, index * 30, rotationLongitude)).join('');
    const houseSpokes = housesAvailable ? system.cusps.map((cusp) => houseSpoke(cusp, rotationLongitude)).join('') : '';
    const houseNumbers = housesAvailable && resolved.houseNumbers
        ? system.cusps.map((cusp, index) => houseNumberLabel(index + 1, cusp, normalizeDegrees(system.cusps[(index + 1) % 12] - cusp), rotationLongitude)).join('')
        : '';
    /*
     * Without a birth time the wheel is drawn for the 12:00 reference, so its
     * tooltips name signs only: a degree or an orb changes with the hour, and a
     * body that changes sign that day is named with both signs, never the noon one.
     */
    const tooltipSign = (body) => {
        if (!anglesSuppressed)
            return null;
        return payload.tooltipSigns[body.id] || body.sign;
    };
    const provenAllDay = new Set(payload.provenAllDay);
    const visibleIds = new Set(allBodies.map((body) => body.id));
    const lineable = (aspect) => visibleIds.has(aspect.bodyA) && visibleIds.has(aspect.bodyB);
    const majorAspects = resolved.majorAspects
        ? model.aspects.filter((aspect) => aspect.category === 'major' && !aspect.involvesExtended && (!anglesSuppressed || provenAllDay.has(aspect.id)))
        : [];
    const majorLines = majorAspects.map((aspect) => aspectLine(aspect, allBodies, rotationLongitude, anglesSuppressed)).join('');
    /* The Advanced Chart's aspect layers are drawn BEFORE the major lines, so the major aspects always lie on top. Off, they are the empty string and the wheel is the standard one. */
    const minorLines = resolved.minorAspects && !anglesSuppressed
        ? model.aspects.filter((aspect) => aspect.category === 'minor' && !aspect.involvesExtended && lineable(aspect)).map((aspect) => aspectLine(aspect, allBodies, rotationLongitude, false)).join('')
        : '';
    const extendedLines = resolved.extendedObjects.length > 0 && !anglesSuppressed
        ? model.aspects.filter((aspect) => aspect.involvesExtended && lineable(aspect) && (aspect.category === 'major' ? resolved.majorAspects : resolved.minorAspects))
            .map((aspect) => aspectLine(aspect, allBodies, rotationLongitude, false)).join('')
        : '';
    const dayArcs = anglesSuppressed ? allBodies.map((body) => {
        const arc = payload.arcs[body.id];
        return arc ? dayArcPath(arc.start, arc.end, rotationLongitude) : '';
    }).join('') : '';
    const planetGlyphs = allBodies.map((body) => planetGlyph(body, slotByBody.get(body.id), rotationLongitude, tooltipSign(body), resolved.retrogradeMarkers)).join('');
    const degreeLabels = resolved.degreeLabels && !anglesSuppressed
        ? `<g data-astro-layer="degree-labels">${allBodies.map((body) => degreeLabel(body, slotByBody.get(body.id), rotationLongitude)).join('')}</g>`
        : '';
    /* With an Ascendant-based system (Equal House, Porphyry, Placidus) the Ascendant and the Descendant stand exactly on the horizontal axis, on the very edge of the wheel's box: their
       labels are turned to read along the edge so that they are not cut. The standard wheel is drawn exactly as it always was. */
    const edgeSafe = resolved.houseSystem !== DEFAULT_HOUSE_SYSTEM;
    const angleMarkers = housesAvailable && model.angles ? [
        angleMarker('ASC', model.angles.ASC, rotationLongitude, edgeSafe),
        angleMarker('MC', model.angles.MC, rotationLongitude, edgeSafe),
        angleMarker('DSC', model.angles.DSC, rotationLongitude, edgeSafe),
        angleMarker('IC', model.angles.IC, rotationLongitude, edgeSafe),
    ].join('') : '';
    return `<svg class="astro-wheel-svg" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${t(anglesSuppressed ? 'chart.astro.ariaSuppressed' : 'chart.astro.aria')}">
    <defs>
      <filter id="astro-glow" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2.4" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <circle cx="${CX}" cy="${CY}" r="${ASPECT_RING_RADIUS}" fill="rgba(6,11,20,0.4)" stroke="rgba(240,238,232,0.14)" stroke-width="1" />
    <g>${minorLines ? `<g data-astro-layer="aspects-minor">${minorLines}</g>` : ''}${extendedLines ? `<g data-astro-layer="aspects-extended">${extendedLines}</g>` : ''}${majorLines}</g>
    <circle cx="${CX}" cy="${CY}" r="${ZODIAC_INNER_RADIUS}" fill="none" stroke="rgba(240,238,232,0.16)" stroke-width="1" />
    <circle cx="${CX}" cy="${CY}" r="${ZODIAC_OUTER_RADIUS}" fill="none" stroke="var(--gold-soft)" stroke-width="1.4" />
    <g>${zodiacSectors}</g>
    <g>${houseSpokes}</g>
    <g>${houseNumbers}</g>
    <g>${angleMarkers}</g>
    <g>${dayArcs}</g>
    <g>${planetGlyphs}</g>${degreeLabels}
  </svg>`;
}
/**
 * The caption under the wheel (or the notice that stands in for it without a birth time). Its markup is what it always was: the notice in the suppressed branch, a
 * plain paragraph otherwise - so a chart with a real time can never carry the notice about an unknown one.
 */
export function wheelFooterHtml(payload, resolved) {
    const { anglesSuppressed } = payload;
    const footer = anglesSuppressed
        ? `<div class="astro-wheel-notice">
        <span class="astro-wheel-notice-icon" aria-hidden="true">i</span>
        <div>
          <p class="astro-wheel-notice-label">${t('chart.astro.suppressedLabel')}</p>
          <p class="kt-time-fallback-note">${t('time.unknownFallbackNotice')}</p>
          <p class="astro-wheel-notice-cta">${t('chart.astro.suppressedCta')}</p>
        </div>
      </div>`
        : `<p>${escapeHtml(footerText(payload, resolved))}</p>`;
    return footer;
}
/** The caption's sentence: the standard one, or - for a house system the reader is only exploring - the one that says so; with minor aspects shown, how many. */
function footerText(payload, resolved) {
    const { model } = payload;
    const majorCount = model.aspects.filter((aspect) => aspect.category === 'major' && !aspect.involvesExtended).length;
    /* The engine's sign name, in the reader's language. A no-op in English,
       where this caption already reads `Ascendant Scorpio`. */
    const ascendant = payload.ascendantSign ? signWord(payload.ascendantSign) : t('chart.unavailableValue');
    const exploring = resolved.houseSystem !== DEFAULT_HOUSE_SYSTEM;
    const base = exploring
        ? tf('chart.astro.footerExplore', { system: systemLabel(resolved.houseSystem), ascendant, count: majorCount })
        : tf(payload.timePrecision === 'approximate' ? 'chart.astro.footerEstimated' : 'chart.astro.footer', { ascendant, count: majorCount });
    const minorCount = resolved.minorAspects ? model.aspects.filter((aspect) => aspect.category === 'minor' && !aspect.involvesExtended).length : null;
    return minorCount === null ? base : `${base} · ${tf('chart.astro.footerMinor', { count: minorCount })}`;
}
function systemLabel(system) {
    return t(`chart.astro.adv.system.${system}`);
}
/* ------------------------------------------------------- the Advanced Chart panel */
/**
 * THE ADVANCED CHART PANEL: one compact disclosure under the wheel. Collapsed it is a single line and the wheel has all of its space; opened it lists the groups of
 * controls the chart genuinely supports (the capabilities of the model decide, so a control for something not calculated is never drawn). Every control is a real
 * input with its own label. The panel only carries the reader's choices; it calculates nothing.
 */
function renderAdvancedPanel(payload, resolved) {
    const { model, anglesSuppressed } = payload;
    const caps = model.capabilities;
    const check = (name, checked, labelKey, hintKey) => `
          <label class="astro-adv-row">
            <input type="checkbox" class="astro-adv-input" data-astro-opt="${name}"${checked ? ' checked' : ''}>
            <span class="astro-adv-switch" aria-hidden="true"></span>
            <span class="astro-adv-label">${t(labelKey)}${hintKey ? `<small>${t(hintKey)}</small>` : ''}</span>
          </label>`;
    /* One switch for each extended object the model reports as calculated (none when there is no provider or the birth is outside its dates). Names are the same in every language. */
    const extendedRows = caps.extendedObjects.available ? caps.extendedObjects.objects.map((id) => `
          <label class="astro-adv-row">
            <input type="checkbox" class="astro-adv-input" data-astro-extended value="${escapeHtml(id)}"${resolved.extendedObjects.includes(id) ? ' checked' : ''}>
            <span class="astro-adv-switch" aria-hidden="true"></span>
            <span class="astro-adv-label">${escapeHtml(id)}</span>
          </label>`).join('') : '';
    const objects = `
        <fieldset class="astro-adv-group">
          <legend>${t('chart.astro.adv.groupObjects')}</legend>
          <div class="astro-adv-items">${check('lunarNodes', resolved.lunarNodes, 'chart.astro.adv.lunarNodes')}${extendedRows}</div>
        </fieldset>`;
    const aspects = `
        <fieldset class="astro-adv-group">
          <legend>${t('chart.astro.adv.groupAspects')}</legend>
          <div class="astro-adv-items">${check('majorAspects', resolved.majorAspects, 'chart.astro.adv.majorAspects')}${caps.minorAspects.available ? check('minorAspects', resolved.minorAspects, 'chart.astro.adv.minorAspects', 'chart.astro.adv.minorHint') : ''}</div>
        </fieldset>`;
    const systems = model.houseSystems;
    const houses = !anglesSuppressed && systems.length > 0 ? `
        <fieldset class="astro-adv-group">
          <legend>${t('chart.astro.adv.groupHouses')}</legend>
          <div class="astro-adv-items">${check('houseNumbers', resolved.houseNumbers, 'chart.astro.adv.houseNumbers')}${systems.length > 1 ? `
          <div class="astro-adv-systems" role="radiogroup" aria-label="${t('chart.astro.adv.houseSystem')}">${systems.map((system) => `
            <label class="astro-adv-system">
              <input type="radio" class="astro-adv-input" name="astro-house-system" value="${system.id}" data-astro-house-system${system.id === resolved.houseSystem ? ' checked' : ''}>
              <span>${escapeHtml(systemLabel(system.id))}</span>
            </label>`).join('')}
          </div>
          <p class="astro-adv-note" data-astro-house-note${resolved.houseSystem === DEFAULT_HOUSE_SYSTEM ? ' hidden' : ''}>${tf('chart.astro.adv.houseNote', { system: systemLabel(resolved.houseSystem) })}</p>` : ''}</div>
        </fieldset>` : '';
    const display = `
        <fieldset class="astro-adv-group">
          <legend>${t('chart.astro.adv.groupDisplay')}</legend>
          <div class="astro-adv-items">${check('degreeLabels', resolved.degreeLabels, 'chart.astro.adv.degreeLabels')}${check('retrogradeMarkers', resolved.retrogradeMarkers, 'chart.astro.adv.retrogradeMarkers')}</div>
        </fieldset>`;
    const needTime = !caps.minorAspects.available ? `<p class="astro-adv-note">${t('chart.astro.adv.needTime')}</p>` : '';
    return `<div class="astro-adv" data-astro-adv>
    <button type="button" class="astro-adv-toggle" aria-expanded="false" aria-controls="astro-adv-panel" data-astro-adv-toggle>
      <span>${t('chart.astro.adv.title')}</span><span class="astro-adv-chevron" aria-hidden="true"></span>
    </button>
    <div class="astro-adv-panel" id="astro-adv-panel" role="group" aria-label="${t('chart.astro.adv.aria')}" hidden>${objects}${aspects}${houses}${display}
      ${needTime}
      <button type="button" class="astro-adv-reset" data-astro-adv-reset${isStandardChart(resolved) ? ' hidden' : ''}>${t('chart.astro.adv.reset')}</button>
    </div>
  </div>`;
}
/* ------------------------------------------------------------------ geometry */
function zodiacSector(sign, signStartLongitude, rotationLongitude) {
    const startAngle = normalizeDegrees(180 + (signStartLongitude - rotationLongitude));
    const endAngle = normalizeDegrees(startAngle - 30);
    const path = wedgePath(startAngle, endAngle, ZODIAC_INNER_RADIUS, ZODIAC_OUTER_RADIUS);
    const midDisplay = signStartLongitude + 15;
    const glyphPoint = pointOnRing(midDisplay, rotationLongitude, (ZODIAC_INNER_RADIUS + ZODIAC_OUTER_RADIUS) / 2);
    const tint = ELEMENT_TINT[ZODIAC_ELEMENT[sign]] ?? 'rgba(240,238,232,0.04)';
    return `<path d="${path}" fill="${tint}" stroke="rgba(240,238,232,0.1)" stroke-width="0.6" />
    <g color="rgba(240,238,232,0.62)">${placeGlyph(signGlyph(sign), glyphPoint.x, glyphPoint.y, 17, 1)}<title>${escapeHtml(sign)}</title></g>`;
}
/**
 * Place a glyph-system symbol at a point on the wheel.
 *
 * The glyphs are authored in a 24x24 box, so they are translated to the target
 * point minus half the rendered size and scaled from there. Nesting an <svg>
 * with its own viewBox would be simpler but re-introduces a second coordinate
 * system inside the wheel; a <g transform> keeps everything in wheel units and
 * keeps the stroke width predictable.
 */
function placeGlyph(markup, x, y, size, opacity) {
    if (!markup)
        return '';
    const scale = size / 24;
    const inner = markup
        .replace(/^<svg[^>]*>/, '')
        .replace(/<\/svg>$/, '')
        .replace(/<title>[\s\S]*?<\/title>/g, '');
    return `<g transform="translate(${(x - size / 2).toFixed(2)} ${(y - size / 2).toFixed(2)}) scale(${scale.toFixed(4)})" `
        + `fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" `
        + `opacity="${opacity}">${inner}</g>`;
}
function wedgePath(startAngleDeg, endAngleDeg, innerRadius, outerRadius) {
    const startRad = (startAngleDeg * Math.PI) / 180;
    const endRad = (endAngleDeg * Math.PI) / 180;
    const outerStart = { x: CX + outerRadius * Math.cos(startRad), y: CY - outerRadius * Math.sin(startRad) };
    const outerEnd = { x: CX + outerRadius * Math.cos(endRad), y: CY - outerRadius * Math.sin(endRad) };
    const innerStart = { x: CX + innerRadius * Math.cos(endRad), y: CY - innerRadius * Math.sin(endRad) };
    const innerEnd = { x: CX + innerRadius * Math.cos(startRad), y: CY - innerRadius * Math.sin(startRad) };
    return `M ${outerStart.x.toFixed(1)} ${outerStart.y.toFixed(1)} A ${outerRadius} ${outerRadius} 0 0 0 ${outerEnd.x.toFixed(1)} ${outerEnd.y.toFixed(1)} L ${innerStart.x.toFixed(1)} ${innerStart.y.toFixed(1)} A ${innerRadius} ${innerRadius} 0 0 1 ${innerEnd.x.toFixed(1)} ${innerEnd.y.toFixed(1)} Z`;
}
function houseSpoke(cuspLongitude, rotationLongitude) {
    const inner = pointOnRing(cuspLongitude, rotationLongitude, ASPECT_RING_RADIUS);
    const outer = pointOnRing(cuspLongitude, rotationLongitude, ZODIAC_INNER_RADIUS);
    return `<line x1="${inner.x.toFixed(1)}" y1="${inner.y.toFixed(1)}" x2="${outer.x.toFixed(1)}" y2="${outer.y.toFixed(1)}" stroke="rgba(240,238,232,0.16)" stroke-width="1" />`;
}
/** A house's number stands at the middle of the house: its cusp plus half the arc to the next cusp (15 degrees for a whole-sign house, as it always was). */
function houseNumberLabel(house, cuspLongitude, spanDegrees, rotationLongitude) {
    const midLongitude = cuspLongitude + spanDegrees / 2;
    const point = pointOnRing(midLongitude, rotationLongitude, HOUSE_NUMBER_RADIUS);
    return `<text x="${point.x.toFixed(1)}" y="${point.y.toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-size="10" fill="rgba(240,238,232,0.4)">${house}</text>`;
}
function angleMarker(label, longitude, rotationLongitude, edgeSafe = false) {
    const outer = pointOnRing(longitude, rotationLongitude, ZODIAC_OUTER_RADIUS + 8);
    const inner = pointOnRing(longitude, rotationLongitude, ASPECT_RING_RADIUS - 6);
    /* a label centred within 8 units of the left or right edge of the 500-unit box would be cut (it is about 20 wide): turn it a quarter turn so that it reads along the edge */
    const atEdge = edgeSafe && Math.abs(outer.x - CX) > 242;
    /* turned, the label also stands 3 units in from the dashed line's end so that its whole box (about 11 wide, turned) is inside the wheel's */
    const labelX = atEdge ? outer.x + (outer.x < CX ? 3 : -3) : outer.x;
    const turn = atEdge ? ` transform="rotate(${outer.x < CX ? -90 : 90} ${labelX.toFixed(1)} ${outer.y.toFixed(1)})"` : '';
    return `<line x1="${inner.x.toFixed(1)}" y1="${inner.y.toFixed(1)}" x2="${outer.x.toFixed(1)}" y2="${outer.y.toFixed(1)}" stroke="var(--gold)" stroke-width="1.2" stroke-dasharray="2 2" />
    <text x="${labelX.toFixed(1)}" y="${outer.y.toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-size="10" font-weight="700" fill="var(--gold)"${turn}>${escapeHtml(label)}</text>`;
}
/**
 * One body: its glyph on the ring (nudged along it where bodies crowd) and a fine leader back to its TRUE longitude on the zodiac ring. The nudge only moves the
 * label; the leader, the aspect lines and every number stay on the true longitude.
 */
function planetGlyph(body, slot, rotationLongitude, signOnly, retrogradeMarkers) {
    const truePoint = pointOnRing(body.longitude, rotationLongitude, TICK_INNER_RADIUS);
    const labelPoint = pointOnRing(slot.display, rotationLongitude, PLANET_RING_RADIUS);
    const glyphMarkup = planetGlyphMark(body.id);
    const retro = !retrogradeMarkers ? '' : body.motionState === 'retrograde' ? ' R' : body.motionState === 'stationary' ? ' S' : '';
    const title = signOnly !== null
        ? `${body.id}: ${signOnly} (${body.motionState})`
        : `${body.id}: ${body.sign} ${body.degreeInSign.toFixed(2)}° (${body.motionState})`;
    return `<line x1="${truePoint.x.toFixed(1)}" y1="${truePoint.y.toFixed(1)}" x2="${labelPoint.x.toFixed(1)}" y2="${labelPoint.y.toFixed(1)}" stroke="rgba(240,238,232,0.22)" stroke-width="0.8" />
    <circle cx="${labelPoint.x.toFixed(1)}" cy="${labelPoint.y.toFixed(1)}" r="11" fill="rgba(6,11,20,0.72)" stroke="${retro ? 'rgba(196,90,90,0.7)' : 'var(--gold-soft)'}" stroke-width="1.2" filter="url(#astro-glow)">
      <title>${escapeHtml(title)}</title>
    </circle>
    <g color="#f0eee8">${glyphMarkup
        ? placeGlyph(glyphMarkup, labelPoint.x, labelPoint.y, 14, 1)
        : `<circle cx="${labelPoint.x.toFixed(1)}" cy="${labelPoint.y.toFixed(1)}" r="2" fill="#f0eee8"/>`}</g>
    ${retro ? `<text x="${labelPoint.x.toFixed(1)}" y="${(labelPoint.y + 13).toFixed(1)}" text-anchor="middle" font-size="7" fill="rgba(196,90,90,0.85)">${retro.trim()}</text>` : ''}`;
}
/**
 * A body's degree within its sign (12 for 12 degrees 34 minutes: the whole degree, the way an ephemeris prints it), beside its glyph. Without a birth time the degree
 * changes with the hour, so there is no degree to print and no label is drawn.
 */
function degreeLabel(body, slot, rotationLongitude) {
    const point = pointOnRing(slot.display, rotationLongitude, DEGREE_LABEL_RADIUS);
    return `<text class="astro-degree-label" x="${point.x.toFixed(1)}" y="${point.y.toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-size="8" fill="rgba(240,238,232,0.82)">${Math.floor(body.degreeInSign)}°</text>`;
}
function aspectLine(aspect, bodies, rotationLongitude, withoutOrb) {
    if (aspect.type === 'Conjunction')
        return '';
    const bodyA = bodies.find((item) => item.id === aspect.bodyA);
    const bodyB = bodies.find((item) => item.id === aspect.bodyB);
    if (!bodyA || !bodyB)
        return '';
    const pointA = pointOnRing(bodyA.longitude, rotationLongitude, ASPECT_RING_RADIUS);
    const pointB = pointOnRing(bodyB.longitude, rotationLongitude, ASPECT_RING_RADIUS);
    const style = ASPECT_LINE_STYLE[aspect.type];
    return `<line x1="${pointA.x.toFixed(1)}" y1="${pointA.y.toFixed(1)}" x2="${pointB.x.toFixed(1)}" y2="${pointB.y.toFixed(1)}" stroke="${style.stroke}" stroke-width="${style.width}"${style.dash ? ` stroke-dasharray="${style.dash}"` : ''}>
    <title>${escapeHtml(withoutOrb
        ? `${aspect.bodyA} ${aspect.type} ${aspect.bodyB}`
        : `${aspect.bodyA} ${aspect.type} ${aspect.bodyB} (orb ${aspect.orb.toFixed(2)}°)`)}</title>
  </line>`;
}
/**
 * The arc a body covers across the birth day, drawn just inside the zodiac
 * ring. Only where it is at least a degree wide: the slow bodies' arcs would
 * be a dot, and the tick already marks them.
 */
function dayArcPath(startLongitude, endLongitude, rotationLongitude) {
    const sweep = ((((endLongitude - startLongitude) % 360) + 540) % 360) - 180;
    if (Math.abs(sweep) < 1)
        return '';
    const radius = TICK_INNER_RADIUS - 3;
    const from = pointOnRing(startLongitude, rotationLongitude, radius);
    const to = pointOnRing(endLongitude, rotationLongitude, radius);
    /* Longitude grows counter-clockwise on screen, which in SVG's y-down space is sweep-flag 0. */
    return `<path d="M ${from.x.toFixed(1)} ${from.y.toFixed(1)} A ${radius} ${radius} 0 0 ${sweep > 0 ? 0 : 1} ${to.x.toFixed(1)} ${to.y.toFixed(1)}" `
        + 'fill="none" stroke="var(--gold-soft)" stroke-width="3" stroke-linecap="round" opacity="0.55" />';
}
function normalizeDegrees(value) {
    return ((value % 360) + 360) % 360;
}
