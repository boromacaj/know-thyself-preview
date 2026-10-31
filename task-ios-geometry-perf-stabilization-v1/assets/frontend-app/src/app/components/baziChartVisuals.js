import { escapeAttribute, escapeHtml } from '../format.js?v=d9f39e7';
import { buildPersonalContext, encodePersonalContext } from '../knowledge/bazi/interactive/personal.js?v=d9f39e7';
import { branchTopicId, dayMasterTopicId, elementTopicId, relationTopicId } from '../knowledge/bazi/interactive/registry.js?v=d9f39e7';
import { t, tf } from '../i18n/uiStrings.js?v=d9f39e7';
import { BAZI_PENTAGON_SEQUENCE, BAZI_SEQUENCE_SLOT } from '../premium-earth/baziSonarTargets.js?v=d9f39e7';
/* The phase, the animal and the seasonal state are engine values, but they are
   also ordinary words inside the sentence each tooltip builds around them, so
   each is handed over in the reader's language and in the form its slot needs.
   Every helper is a no-op outside Slovak, so the English tooltips are byte for
   byte what they were. */
import { engineProse, phaseWord, seasonalStateWord, zodiacAnimalWord } from '../i18n/engineProse.js?v=d9f39e7';
import { EARTHLY_BRANCHES } from '../bazi/data/baziConstants.js?v=d9f39e7';
import { calculateSeasonalContext } from '../bazi/fivePhaseBalance.js?v=d9f39e7';
/*
 * THE TWO BAZI CHART VISUALS (V2.1): THE FIVE-PHASE PENTAGON AND THE SEASONAL WHEEL
 * ---------------------------------------------------------------------------------
 * Every number drawn here is the engine's own (the raw phase counts, the Day Master, the month branch and the seasonal-governance state of
 * each of the twelve branches). Only how it LOOKS is here.
 *
 * V2.1 (owner correction: the first V2 read as a flat SVG infographic). The two charts are now built from the SAME MATERIAL as the glass circles
 * that orbit the Earth on the first screen (numerologyOrbit.ts, baziHero.ts):
 *
 *   - the five elements and the Day Master medallion are HTML circles, not drawn shapes, so they take the hero circle's recipe: a luminous
 *     1 px rim in the element's own light, an inner atmosphere, a lit-from-the-upper-left highlight, a tight halo with a faint wide fringe, and
 *     type in the hero's own faces (Georgia numerals, small letter-spaced caps) with the same glow and dark under-shadow. The only difference
 *     from the hero's blue-white glass is that the body of an element orb is the element's colour, lit like a polished planet
 *   - the lines are thin and luminous (a hair of light over a soft under-glow), the backing is a quiet radial separation, not a panel
 *   - the seasonal ring is smooth gradients with a lit outer edge and luminous boundaries, no decoration: no marks, sparks or motifs
 *
 * INTERACTIVE (knowledge system V1): every orb, every month petal, the medallion, the two cycles (their lines and a legend) and the numbers carry a topic
 * (data-bazi-topic) that baziKnowledgeSheet.ts opens as a sheet; the chart's own calculated values ride on the section (data-bazi-personal) so the
 * sheet can say what a symbol means for THIS chart. Hit areas are the shapes themselves (orbs and petals are 44 px or more on a phone) plus
 * transparent wide strokes on the cycle lines, which sit below the orbs; the cycle legend is the explicit entry point.
 *
 * V2.4 (final polish): the twelve months are rounded petals (an annular sector with softened corners and a hair of space between neighbours), and the
 * auras - round the five orbs, along their orbit ring, round the wheel and its medallion - are a touch richer. Soft and bounded: no flares.
 *
 * V2.3 (material): what reads as premium in the hero is its MATERIAL, not light effects, so the orbs are now two layers of milky glass (a neutral
 * frosted glass with the element's colour laid over it as a translucent wash), the five orbs sit on the hero's own orbit ring round the Earth, and the
 * ring of months is a translucent colour wash over a milky base and a frosted backing. Crisp specular shells and glow streaks were taken out.
 *
 * V2.2 (polish, superseded in part by V2.3): the orbs gain a glass shell (a crisp specular, a fresnel edge, a reflected lower light), the seasonal ring becomes translucent
 * glass over a frosted backing, and the medallion is pushed toward a polished disc. Colours, geometry and data are untouched.
 *
 * The SVG carries only what is a line or a ring (backing, cycles, wedges); circles of text are HTML positioned in the same 400 x 400 space
 * by percentages, sized in container units, so the whole composition scales as one piece. No SVG filters; no custom property that the premium
 * page does not define (the old drawing used var(--gold) and printed the birth month black).
 */
const CX = 200;
const CY = 200;
const PHASE_ORDER = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
const PHASE_GLYPH = { Wood: '木', Fire: '火', Earth: '土', Metal: '金', Water: '水' };
/** The five orbs: highlight, body, shade (the colour of the lit sphere), rim and halo. Saturated, with a bright rim and a darker core for depth. */
export const PHASE_PALETTE = Object.freeze({
    Wood: { light: '#9CF5A6', body: '#2FC24D', shade: '#0B5A25', rim: '#7BFF8F', glow: '#55E66A' },
    Fire: { light: '#FF9A8A', body: '#E22E3A', shade: '#6E0C18', rim: '#FF7466', glow: '#F34B4B' },
    Earth: { light: '#FFE79A', body: '#D9A62A', shade: '#6A4708', rim: '#FFD76A', glow: '#F4C65B' },
    Metal: { light: '#FFFFFF', body: '#9FB2C6', shade: '#44566B', rim: '#EAF3FB', glow: '#DCE9F4' },
    Water: { light: '#8FCBFF', body: '#1F78F2', shade: '#0A2F7A', rim: '#6FB4FF', glow: '#398FFF' },
});
const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(', ');
/** Two colours mixed (the share of the second), as an `r, g, b` triple: the body of an orb's colour wash between its light and its edge. */
const mixRgb = (a, b, share) => [1, 3, 5].map((i) => Math.round(parseInt(a.slice(i, i + 2), 16) * (1 - share) + parseInt(b.slice(i, i + 2), 16) * share)).join(', ');
const GOLD = '#F4C65B';
const GOLD_BRIGHT = '#FFE19A';
const CORAL = '#FF7A70';
const NODE_MIN = 30;
const NODE_SPAN = 10;
const PENTAGON_RADIUS = 138;
/**
 * Five Phase generating/controlling cycle wheel. Node size encodes the chart's raw visible
 * count for that phase (real data, not decoration); the Day Master's phase is highlighted.
 */
export function renderFivePhaseCycleWheel(bazi, flags = {}) {
    if (bazi.status === 'blocked' || !bazi.dayMaster || !bazi.rawPhaseBalance) {
        return `<section class="bazi-phase-wheel bazi-phase-wheel--blocked" aria-label="${t('chart.bazi.wheelUnavailableAria')}">
      <p class="empty-state">${t('chart.unavailableUntilMoment')}</p>
    </section>`;
    }
    const counts = bazi.rawPhaseBalance.counts;
    const maxCount = Math.max(1, ...PHASE_ORDER.map((phase) => counts[phase]));
    const nodeRadius = (phase) => NODE_MIN + (counts[phase] / maxCount) * NODE_SPAN;
    const positions = PHASE_ORDER.map((phase, index) => {
        const rad = ((-90 + index * 72) * Math.PI) / 180;
        return { phase, x: CX + PENTAGON_RADIUS * Math.cos(rad), y: CY + PENTAGON_RADIUS * Math.sin(rad), r: nodeRadius(phase) };
    });
    const pointFor = (phase) => positions.find((p) => p.phase === phase);
    /** A line from one node to another, trimmed so it begins and ends just outside the two orbs (the arrowhead lands on the rim). */
    const link = (from, to) => {
        const a = pointFor(from);
        const b = pointFor(to);
        const length = Math.hypot(b.x - a.x, b.y - a.y);
        const ux = (b.x - a.x) / length;
        const uy = (b.y - a.y) / length;
        const start = a.r + 7;
        const end = b.r + 7;
        return { x1: (a.x + ux * start).toFixed(1), y1: (a.y + uy * start).toFixed(1), x2: (b.x - ux * end).toFixed(1), y2: (b.y - uy * end).toFixed(1) };
    };
    /* WOOD -> FIRE -> EARTH -> METAL -> WATER -> WOOD: a hair of warm light over a soft under-glow */
    const generatingLines = PHASE_ORDER.map((phase, index) => {
        const next = PHASE_ORDER[(index + 1) % 5];
        const l = link(phase, next);
        return `<g data-cycle="generating" data-from="${phase}" data-to="${next}"><line x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}" stroke="${GOLD}" stroke-opacity="0.16" stroke-width="5" stroke-linecap="round" />
      <line x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}" stroke="${GOLD_BRIGHT}" stroke-opacity="0.95" stroke-width="1.3" stroke-linecap="round" marker-end="url(#bazi-generate-arrow)" />
      <line class="bazi-hit" x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}" stroke="transparent" stroke-width="14" fill="none" role="button" tabindex="0" aria-haspopup="dialog" data-bazi-topic="${relationTopicId('generating', phase, next)}" aria-label="${escapeAttribute(tf('bazi.aria.feeds', { from: phaseWord(phase, 'label'), to: phaseWord(next, 'label') }))}" /></g>`;
    }).join('');
    /* WOOD -> EARTH -> WATER -> FIRE -> METAL -> WOOD (every second phase): finer and quieter, so the pentagram never outweighs the orbs */
    const controllingLines = PHASE_ORDER.map((phase, index) => {
        const controlled = PHASE_ORDER[(index + 2) % 5];
        const l = link(phase, controlled);
        return `<g data-cycle="controlling" data-from="${phase}" data-to="${controlled}"><line x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}" stroke="${CORAL}" stroke-opacity="0.07" stroke-width="4" stroke-linecap="round" />
      <line x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}" stroke="${CORAL}" stroke-opacity="0.78" stroke-width="1" stroke-dasharray="2.5 5" stroke-linecap="round" marker-end="url(#bazi-control-arrow)" />
      <line class="bazi-hit" x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}" stroke="transparent" stroke-width="14" fill="none" role="button" tabindex="0" aria-haspopup="dialog" data-bazi-topic="${relationTopicId('controlling', phase, controlled)}" aria-label="${escapeAttribute(tf('bazi.aria.regulates', { from: phaseWord(phase, 'label'), to: phaseWord(controlled, 'label') }))}" /></g>`;
    }).join('');
    const orbs = positions.map((p) => {
        const c = PHASE_PALETTE[p.phase];
        const count = counts[p.phase];
        const isDayMaster = p.phase === bazi.dayMaster.element;
        const title = escapeHtml(tf(isDayMaster ? 'chart.bazi.nodeTitleDayMaster' : 'chart.bazi.nodeTitle', { phase: phaseWord(p.phase, 'label'), count }));
        const label = escapeAttribute(tf(isDayMaster ? 'bazi.aria.orbDayMaster' : 'bazi.aria.orb', { element: phaseWord(p.phase, 'label'), count }));
        return `<span class="bazi-orb${isDayMaster ? ' is-day-master' : ''}" data-phase="${p.phase}" role="button" tabindex="0" aria-haspopup="dialog" data-bazi-topic="${elementTopicId(p.phase)}" aria-label="${label}" title="${title}" style="--x:${p.x.toFixed(1)};--y:${p.y.toFixed(1)};--r:${p.r.toFixed(1)};--o-light:${rgb(c.light)};--o-body:${rgb(c.body)};--o-shade:${rgb(c.shade)};--o-rim:${rgb(c.rim)};--o-glow:${rgb(c.glow)};--o-mid:${mixRgb(c.body, c.shade, 0.4)}"><span class="bazi-orb-glyph" aria-hidden="true">${PHASE_GLYPH[p.phase]}</span><span class="bazi-orb-count">${count}</span><span class="bazi-orb-name">${escapeHtml(phaseWord(p.phase, 'label'))}</span><span class="bazi-sonar-ring" aria-hidden="true" style="--bz-seq-delay:${(BAZI_PENTAGON_SEQUENCE.indexOf(p.phase) * BAZI_SEQUENCE_SLOT).toFixed(2)}s"></span></span>`;
    }).join('');
    const svg = `<svg class="bazi-phase-wheel-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="group" aria-label="${tf('chart.bazi.wheelFullAria', { element: phaseWord(bazi.dayMaster.element) })}">
    <defs>
      <radialGradient id="bazi-pentagon-backing" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="#030712" stop-opacity="0" /><stop offset="0.5" stop-color="#030712" stop-opacity="0" /><stop offset="0.66" stop-color="#030712" stop-opacity="0.42" /><stop offset="0.9" stop-color="#030712" stop-opacity="0.46" /><stop offset="1" stop-color="#030712" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="bazi-orbit-aura" cx="50%" cy="50%" r="50%">
        <stop offset="0.6" stop-color="#8FB8FF" stop-opacity="0" /><stop offset="0.7" stop-color="#8FB8FF" stop-opacity="0.13" /><stop offset="0.8" stop-color="#8FB8FF" stop-opacity="0" />
      </radialGradient>
      <marker id="bazi-generate-arrow" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto"><path d="M1,1.4 L8.6,5 L1,8.6 Z" fill="${GOLD_BRIGHT}" /></marker>
      <marker id="bazi-control-arrow" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" refX="6.8" refY="4" orient="auto"><path d="M1,1.2 L7,4 L1,6.8 Z" fill="${CORAL}" fill-opacity="0.85" /></marker>
    </defs>
    <circle cx="${CX}" cy="${CY}" r="196" fill="url(#bazi-pentagon-backing)" />
    <circle cx="${CX}" cy="${CY}" r="196" fill="url(#bazi-orbit-aura)" />
    <circle cx="${CX}" cy="${CY}" r="${PENTAGON_RADIUS}" fill="none" stroke="rgba(164,204,255,0.15)" stroke-width="9" />
    <circle cx="${CX}" cy="${CY}" r="${PENTAGON_RADIUS}" fill="none" stroke="rgba(190,218,255,0.4)" stroke-width="0.9" />
    <g>${controllingLines}</g>
    <g>${generatingLines}</g>
  </svg>`;
    const personal = buildPersonalContext(bazi, flags);
    const legend = `<div class="bazi-legend" role="group" aria-label="${escapeAttribute(t('bazi.legend.cyclesAria'))}">
      <button type="button" class="bazi-chip" aria-haspopup="dialog" data-bazi-topic="cycle:generating"><i class="bazi-chip-line is-generating" aria-hidden="true"></i>${escapeHtml(t('bazi.legend.generating'))}</button>
      <button type="button" class="bazi-chip" aria-haspopup="dialog" data-bazi-topic="cycle:controlling"><i class="bazi-chip-line is-controlling" aria-hidden="true"></i>${escapeHtml(t('bazi.legend.controlling'))}</button>
      <button type="button" class="bazi-chip" aria-haspopup="dialog" data-bazi-topic="concept:element-counts">${escapeHtml(t('bazi.legend.numbers'))}</button>
    </div>`;
    return `<section class="pillar-visual bazi-phase-wheel has-source-data" aria-label="${t('chart.bazi.wheelAria')}" data-bazi-visual="pentagon"${personal ? ` data-bazi-personal="${escapeAttribute(encodePersonalContext(personal))}"` : ''}>
    <div class="bazi-stage">${svg}${orbs}</div>
    ${legend}
    <p>${escapeHtml(tf('chart.bazi.wheelNote', { element: phaseWord(bazi.dayMaster.element) }))}</p>
  </section>`;
}
/**
 * How much of a month's colour is held back. The tint of every segment is its month's own season colour; the seasonal-governance state the
 * engine computes for the Day Master in that month darkens the segment (a veil of the night sky over it): a prosperous month is shown at
 * full colour, a dead one is the dimmest. The data encoding is the same one as before (brightness = support), only now on a vivid colour.
 */
const SEASONAL_STATE_VEIL = {
    prosperous: 0,
    aided: 0.1,
    resting: 0.2,
    trapped: 0.3,
    dead: 0.4,
};
/** Twelve month colours, by the earthly branch's index (Zi 0 ... Hai 11): winter blue, spring green, summer gold and orange, autumn red and violet. */
export const MONTH_COLOURS = Object.freeze([
    { base: '#2C6FE0', light: '#7DB4FF', season: 'winter' },
    { base: '#D9A52B', light: '#FFE08A', season: 'winter' },
    { base: '#5FBF5C', light: '#B7F0A2', season: 'spring' },
    { base: '#22A559', light: '#7BEA9E', season: 'spring' },
    { base: '#86BA42', light: '#D2F08A', season: 'spring' },
    { base: '#E2B92E', light: '#FFEB8C', season: 'summer' },
    { base: '#EE7C26', light: '#FFC27A', season: 'summer' },
    { base: '#E9692A', light: '#FFB17A', season: 'summer' },
    { base: '#D8452C', light: '#FF9B82', season: 'autumn' },
    { base: '#B3342F', light: '#F58E86', season: 'autumn' },
    { base: '#8654C0', light: '#C9A2F2', season: 'autumn' },
    { base: '#3459BF', light: '#8DA8FF', season: 'winter' },
]);
/**
 * The colour a month's panel wears, as an "r, g, b" triplet: the middle of its petal's own gradient (halfway from its base to its light colour), so that
 * the sheet a petal opens is the same colour family as the petal that was tapped (Chen is the green petal, so it is the green sheet). One table, one
 * function: the wheel and the knowledge sheet cannot disagree. Null for a name that is not an Earthly Branch.
 */
export function monthRimRgb(branchName) {
    const index = EARTHLY_BRANCHES.findIndex((branch) => branch.name.toLowerCase() === branchName.toLowerCase());
    const colour = MONTH_COLOURS[index];
    return colour ? mixRgb(colour.base, colour.light, 0.5) : null;
}
/** How much of each month's colour is solid: the ring is glass over a frosted backing, rich but never opaque (inner edge, body, lit outer edge). */
const GLASS_INNER = 0.68;
const GLASS_MID = 0.78;
const GLASS_OUTER = 0.86;
const RING_OUTER = 176;
/** The lit rims stop this far (degrees) inside a petal's ends, so they sit on its straight stretch and not in its rounded corners. */
const RIM_TRIM_DEG = 3.6;
const RING_INNER = 112;
/** The Day Master medallion's diameter as a share of the wheel (208 of 400). */
const DISC_SHARE = 0.52;
/** A colour pulled toward the night sky: the deep end of a month's gradient. */
function deepen(hex, toward, amount) {
    const mix = (i) => Math.round(parseInt(hex.slice(i, i + 2), 16) * (1 - amount) + parseInt(toward.slice(i, i + 2), 16) * amount);
    return `#${[1, 3, 5].map((i) => mix(i).toString(16).padStart(2, '0')).join('')}`;
}
/**
 * Seasonal ring: for each of the 12 Earthly Branches, computes (via the same seasonal-
 * governance engine used in the chart) how the Day Master would be seasonally supported if
 * that branch were the month branch. This is genuine calculated data, not decoration — it
 * shows which months seasonally favor or weaken this specific Day Master.
 */
export function renderSeasonalArc(bazi, flags = {}) {
    if (bazi.status === 'blocked' || !bazi.dayMaster || !bazi.monthPillar) {
        return `<section class="bazi-seasonal-arc bazi-seasonal-arc--blocked" aria-label="${t('chart.bazi.arcUnavailableAria')}">
      <p class="empty-state">${t('chart.unavailableUntilMoment')}</p>
    </section>`;
    }
    const dayMasterElement = bazi.dayMaster.element;
    const activeBranchIndex = bazi.monthPillar.branch.index;
    const defs = [];
    const petals = [];
    const petalRings = [];
    let activeOutline = '';
    const sectors = EARTHLY_BRANCHES.map((branch, index) => {
        const context = calculateSeasonalContext(branch.index, branch.name, dayMasterElement);
        const colour = MONTH_COLOURS[index % 12];
        const startAngle = -90 + index * 30;
        const endAngle = startAngle + 30;
        const path = petalPath(startAngle, endAngle);
        petals.push(path);
        const isActive = index === activeBranchIndex;
        const midAngleRad = ((startAngle + 15) * Math.PI) / 180;
        const labelR = (RING_INNER + RING_OUTER) / 2;
        const labelX = CX + labelR * Math.cos(midAngleRad);
        const labelY = CY + labelR * Math.sin(midAngleRad);
        /* the sonar ring of this petal (baziSonarTargets.ts): its outline in its own month colour, grown about its own centre, one petal after another round the wheel */
        petalRings.push(`<svg class="bazi-petal-ring" viewBox="0 0 400 400" aria-hidden="true" focusable="false" style="--kt-sonar-rgb:${rgb(colour.light)};--kt-sonar-delay:${(index * 0.2).toFixed(2)}s;transform-origin:${(labelX / 4).toFixed(2)}% ${(labelY / 4).toFixed(2)}%"><path d="${path}" /></svg>`);
        const veil = SEASONAL_STATE_VEIL[context.dayMasterState];
        const title = escapeHtml(tf(isActive ? 'chart.bazi.sectorTitleActive' : 'chart.bazi.sectorTitle', {
            branch: branch.name, animal: zodiacAnimalWord(branch.animal),
            element: phaseWord(dayMasterElement), state: seasonalStateWord(context.dayMasterState),
        }));
        /* A smooth radial: deep at the inner edge (the medallion's shadow), the month's own colour through the middle, lit toward the outer edge. */
        defs.push(`<radialGradient id="bazi-month-${index}" gradientUnits="userSpaceOnUse" cx="${CX}" cy="${CY}" r="${RING_OUTER}">
        <stop offset="${(RING_INNER / RING_OUTER - 0.01).toFixed(2)}" stop-color="${deepen(colour.base, '#050A18', 0.5)}" stop-opacity="${GLASS_INNER}" /><stop offset="0.8" stop-color="${colour.base}" stop-opacity="${GLASS_MID}" /><stop offset="0.95" stop-color="${colour.light}" stop-opacity="${GLASS_OUTER}" /><stop offset="1" stop-color="${colour.light}" stop-opacity="${GLASS_OUTER}" />
      </radialGradient>`);
        if (isActive) {
            activeOutline = `<path d="${path}" fill="none" stroke="${GOLD}" stroke-opacity="0.5" stroke-width="10" stroke-linejoin="round" pointer-events="none" />
        <path d="${path}" fill="none" stroke="${GOLD_BRIGHT}" stroke-width="2.6" stroke-linejoin="round" pointer-events="none" />`;
        }
        return `<g class="bazi-month${isActive ? ' is-active' : ''}" data-branch="${escapeHtml(branch.name)}" data-state="${context.dayMasterState}" role="button" tabindex="0" aria-haspopup="dialog" data-bazi-topic="${branchTopicId(branch.name)}" aria-label="${escapeAttribute(tf(isActive ? 'bazi.aria.petalBirth' : 'bazi.aria.petal', { branch: branch.name, animal: zodiacAnimalWord(branch.animal) }))}">
      <path d="${path}" fill="url(#bazi-month-${index})" stroke="rgba(255,255,255,0.34)" stroke-width="0.8" stroke-linejoin="round"><title>${title}</title></path>
      ${veil > 0 ? `<path d="${path}" fill="#050A18" fill-opacity="${veil}" stroke="none" />` : ''}
      <path d="${arcPath(startAngle + RIM_TRIM_DEG, endAngle - RIM_TRIM_DEG, RING_OUTER - 3.2)}" fill="none" stroke="#FFFFFF" stroke-opacity="0.4" stroke-width="1.1" stroke-linecap="round" />
      <path d="${arcPath(startAngle + RIM_TRIM_DEG + 1.5, endAngle - RIM_TRIM_DEG - 1.5, RING_INNER + 3.2)}" fill="none" stroke="#FFFFFF" stroke-opacity="0.2" stroke-width="1" stroke-linecap="round" />
      <text x="${labelX.toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-size="${isActive ? 15 : 13.5}" font-weight="${isActive ? '700' : '600'}" letter-spacing="0.5" fill="#FFFFFF" stroke="rgba(2,6,16,0.78)" stroke-width="2.6" paint-order="stroke" stroke-linejoin="round">${escapeHtml(branch.name)}</text>
    </g>`;
    }).join('');
    const svg = `<svg class="bazi-seasonal-arc-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="group" aria-label="${tf('chart.bazi.arcFullAria', { element: phaseWord(dayMasterElement), branch: bazi.monthPillar.branch.name })}">
    <defs>
      ${defs.join('')}
      <linearGradient id="bazi-ring-sheen" x1="0" y1="0" x2="0.35" y2="1">
        <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.14" /><stop offset="0.38" stop-color="#FFFFFF" stop-opacity="0.04" /><stop offset="0.62" stop-color="#FFFFFF" stop-opacity="0" /><stop offset="1" stop-color="#050A18" stop-opacity="0.16" />
      </linearGradient>
      <radialGradient id="bazi-ring-aura" cx="50%" cy="50%" r="50%">
        <stop offset="0.8" stop-color="#6FA8FF" stop-opacity="0" /><stop offset="0.91" stop-color="#6FA8FF" stop-opacity="0.4" /><stop offset="1" stop-color="#6FA8FF" stop-opacity="0" />
      </radialGradient>
    </defs>
    <circle cx="${CX}" cy="${CY}" r="${RING_OUTER + 22}" fill="url(#bazi-ring-aura)" />
    <path d="${petals.join(' ')}" fill="rgba(226,236,255,0.13)" />
    <g>${sectors}</g>
    <path d="${petals.join(' ')}" fill="url(#bazi-ring-sheen)" />
    ${activeOutline}
  </svg>`;
    const disc = `<span class="bazi-disc" data-element="${dayMasterElement}" role="button" tabindex="0" aria-haspopup="dialog" data-bazi-topic="${dayMasterTopicId(bazi.dayMaster.name)}" aria-label="${escapeAttribute(tf('bazi.aria.disc', { polarity: engineProse(bazi.dayMaster.polarity), element: phaseWord(dayMasterElement, 'label') }))}" style="--d:${(DISC_SHARE * 100).toFixed(0)}%"><span class="bazi-disc-name">${escapeHtml(phaseWord(dayMasterElement, 'label'))}</span><span class="bazi-disc-label">${t('chart.bazi.dayMaster')}</span><span class="bazi-sonar-ring" aria-hidden="true"></span></span>`;
    const personal = buildPersonalContext(bazi, flags);
    const legend = `<div class="bazi-legend" role="group" aria-label="${escapeAttribute(t('bazi.legend.wheelAria'))}">
      <button type="button" class="bazi-chip" aria-haspopup="dialog" data-bazi-topic="concept:birth-month"><i class="bazi-chip-dot" aria-hidden="true"></i>${escapeHtml(t('bazi.legend.goldenPetal'))}</button>
      <button type="button" class="bazi-chip" aria-haspopup="dialog" data-bazi-topic="concept:seasonal-support">${escapeHtml(t('bazi.legend.seasonal'))}</button>
      <button type="button" class="bazi-chip" aria-haspopup="dialog" data-bazi-topic="library:branches">${escapeHtml(t('bazi.legend.months'))}</button>
    </div>`;
    return `<section class="pillar-visual bazi-seasonal-arc has-source-data" aria-label="${t('chart.bazi.arcAria')}" data-bazi-visual="wheel" data-birth-branch="${escapeHtml(bazi.monthPillar.branch.name)}"${personal ? ` data-bazi-personal="${escapeAttribute(encodePersonalContext(personal))}"` : ''}>
    <div class="bazi-stage"><span class="bazi-wheel-frost" aria-hidden="true"></span>${svg}${petalRings.join('')}${disc}</div>
    ${legend}
    <p>${escapeHtml(tf('chart.bazi.arcNote', { element: phaseWord(dayMasterElement), branch: bazi.monthPillar.branch.name }))}</p>
  </section>`;
}
function arcPath(startAngleDeg, endAngleDeg, radius) {
    const a = (startAngleDeg * Math.PI) / 180;
    const b = (endAngleDeg * Math.PI) / 180;
    return `M ${(CX + radius * Math.cos(a)).toFixed(1)} ${(CY + radius * Math.sin(a)).toFixed(1)} A ${radius} ${radius} 0 0 1 ${(CX + radius * Math.cos(b)).toFixed(1)} ${(CY + radius * Math.sin(b)).toFixed(1)}`;
}
/** The petals: corner radius at the outer edge, at the inner edge, and the angular space kept clear on each side of a month (degrees). */
export const PETAL_OUTER_CORNER = 9;
export const PETAL_INNER_CORNER = 6;
export const PETAL_GAP_DEG = 0.7;
/**
 * One month as a petal: the annular sector between two radii, its four corners rounded by fillets that are exactly tangent to the circle and to the
 * radial edge (so the shape is a true rounded sector, not a clipped one), and kept a little inside its 30 degrees so neighbours do not touch. Every
 * fillet turns the same way (toward the inside), so the outline has no concave kink. The span is the month's own; only its corners are softened.
 */
export function petalPath(startAngleDeg, endAngleDeg, innerRadius = RING_INNER, outerRadius = RING_OUTER, outerCorner = PETAL_OUTER_CORNER, innerCorner = PETAL_INNER_CORNER, gapDeg = PETAL_GAP_DEG) {
    const a0 = ((startAngleDeg + gapDeg) * Math.PI) / 180;
    const a1 = ((endAngleDeg - gapDeg) * Math.PI) / 180;
    const turnOut = Math.asin(outerCorner / (outerRadius - outerCorner));
    const turnIn = Math.asin(innerCorner / (innerRadius + innerCorner));
    const reachOut = Math.sqrt((outerRadius - outerCorner) ** 2 - outerCorner ** 2);
    const reachIn = Math.sqrt((innerRadius + innerCorner) ** 2 - innerCorner ** 2);
    const at = (radius, angle) => `${(CX + radius * Math.cos(angle)).toFixed(1)} ${(CY + radius * Math.sin(angle)).toFixed(1)}`;
    return [
        `M ${at(outerRadius, a0 + turnOut)}`,
        `A ${outerRadius} ${outerRadius} 0 0 1 ${at(outerRadius, a1 - turnOut)}`,
        `A ${outerCorner} ${outerCorner} 0 0 1 ${at(reachOut, a1)}`,
        `L ${at(reachIn, a1)}`,
        `A ${innerCorner} ${innerCorner} 0 0 1 ${at(innerRadius, a1 - turnIn)}`,
        `A ${innerRadius} ${innerRadius} 0 0 0 ${at(innerRadius, a0 + turnIn)}`,
        `A ${innerCorner} ${innerCorner} 0 0 1 ${at(reachIn, a0)}`,
        `L ${at(reachOut, a0)}`,
        `A ${outerCorner} ${outerCorner} 0 0 1 ${at(outerRadius, a0 + turnOut)}`,
        'Z',
    ].join(' ');
}
/**
 * The layout and the material of the two charts on the premium page (the old rules in styles.css are not loaded there). They are positioned and
 * given their own stacking context ABOVE the pinned hero (a sticky element is a positioned box and paints over unpositioned blocks, which is what
 * hid the pentagon behind the satellites). The stage is a square container: its drawing is a 400-unit space, its HTML circles are placed by
 * percentage and sized in container units (--u = one unit), so every circle and every letter scales with the whole.
 * Injected by numerologyOrbitHero.ts beside the hero's own sheet.
 */
export function baziChartCss() {
    const P = '#place-experience#place-experience';
    const serif = "Georgia, 'Times New Roman', serif";
    return `
    ${P} .kt-pillar-chart:has(.bazi-phase-wheel, .bazi-seasonal-arc) { position: relative; z-index: 3; isolation: isolate; overflow: visible; }
    ${P} .kt-pillar-chart .bazi-phase-wheel, ${P} .kt-pillar-chart .bazi-seasonal-arc {
      position: relative; display: grid; justify-items: center; gap: 12px; margin: 0 auto; padding: 0; border: 0; background: none; min-height: 0; box-shadow: none; overflow: visible;
    }
    ${P} .kt-pillar-chart .bazi-phase-wheel > p, ${P} .kt-pillar-chart .bazi-seasonal-arc > p {
      position: static; margin: 0; max-width: 34ch; text-align: center; font-size: 12.5px; line-height: 1.5; letter-spacing: 0.02em; color: rgba(226, 236, 255, 0.82);
      text-shadow: 0 1px 8px rgba(3, 7, 18, 0.9);
    }
    /* THE STAGE: one square, one coordinate space (400 units = 100 container widths). The pentagon's stage is sized from the hero's own orbit ring
       (--bz-ring, written on the page by numerologyOrbitHero.ts from the same geometry that places the three circles), so the five orbs' centres lie
       on that very circle round the Earth: 138 of the stage's 400 units are the ring's radius. The wheel's is sized so that its outer edge is the
       Earth's rim. Without the measurement (an older page) they fall back to a column-wide square, and a column narrower than the ring clamps it. */
    ${P} .bazi-stage { position: relative; width: min(100%, 440px); aspect-ratio: 1; container-type: inline-size; --u: 0.25cqw; }
    ${P} .bazi-phase-wheel .bazi-stage { width: min(var(--bz-pentagon, 440px), 100%); }
    ${P} .bazi-seasonal-arc .bazi-stage { width: min(var(--bz-wheel, 440px), 100%); }
    ${P} .bazi-stage > svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; overflow: visible; max-width: none; }

    /* TAPS. The charts take no touch of their own except on what is meant to be tapped, so a swipe (and a tap on the planet or the Year Animal circle
       beneath the pentagon) passes through the empty parts. The orbs, the medallion, the petals, the cycle lines and the legend chips are buttons. */
    ${P} .kt-pillar-chart:has(.bazi-stage), ${P} .bazi-phase-wheel, ${P} .bazi-seasonal-arc, ${P} .bazi-stage, ${P} .bazi-stage > svg, ${P} .bazi-phase-wheel > p, ${P} .bazi-seasonal-arc > p { pointer-events: none; }
    /* The premium page sets pointer-events: auto on EVERY descendant of the reading surface, so what must stay inert is said explicitly (and with more weight). */
    ${P} .bazi-stage > svg *, ${P} .bazi-wheel-frost { pointer-events: none; }
    ${P} .bazi-orb, ${P} .bazi-disc, ${P} .bazi-legend { pointer-events: auto; cursor: pointer; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
    ${P} .bazi-legend { cursor: default; }
    ${P} .bazi-stage > svg .bazi-hit { pointer-events: stroke; cursor: pointer; }
    ${P} .bazi-stage > svg .bazi-month, ${P} .bazi-stage > svg .bazi-month * { pointer-events: auto; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    ${P} .bazi-orb:focus-visible, ${P} .bazi-disc:focus-visible { outline: 2px solid rgba(255, 225, 154, 0.9); outline-offset: 3px; }
    /* After a tap the sheet gives focus back to the symbol that was tapped. The browser draws its own focus ring on a focused element that is not :focus-visible
       (on a petal a white rectangle round its bounding box), so a touch leaves it behind: the ring is shown only for the keyboard, in the gold of this chart. */
    ${P} .bazi-month:focus, ${P} .bazi-month:focus-visible { outline: none; }
    ${P} .bazi-orb:focus:not(:focus-visible), ${P} .bazi-disc:focus:not(:focus-visible), ${P} .bazi-chip:focus:not(:focus-visible) { outline: none; }
    ${P} .bazi-month:focus-visible path:first-child { stroke: #FFE19A; stroke-width: 2.4; }
    ${P} .bazi-hit:focus { outline: none; }
    ${P} .bazi-hit:focus-visible { outline: none; stroke: rgba(255, 225, 154, 0.5); }
    body[data-bazi-sheet] ${P} .bazi-orb, body[data-bazi-sheet] ${P} .bazi-disc, body[data-bazi-sheet] ${P} .bazi-legend, body[data-bazi-sheet] ${P} .bazi-stage > svg .bazi-month, body[data-bazi-sheet] ${P} .bazi-stage > svg .bazi-month *, body[data-bazi-sheet] ${P} .bazi-stage > svg .bazi-hit { pointer-events: none; }

    /* The legend: a row of milky-glass capsules under the chart. Each is at least 44 px tall. */
    ${P} .bazi-legend { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 8px; margin: 0; padding: 0 4px; }
    ${P} .bazi-chip {
      display: inline-flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 16px; box-sizing: border-box;
      border: 1px solid rgba(190, 214, 255, 0.4); border-radius: 999px; background: rgba(214, 226, 248, 0.1);
      color: rgba(236, 242, 252, 0.94); font-size: 12.5px; font-weight: 500; line-height: 1; font-family: inherit; letter-spacing: 0.03em; cursor: pointer;
      -webkit-tap-highlight-color: transparent; touch-action: manipulation;
      box-shadow: inset 0 0 0 1px rgba(190, 214, 255, 0.08), 0 0 14px rgba(120, 170, 255, 0.12);
    }
    ${P} .bazi-chip:focus-visible { outline: 2px solid rgba(255, 225, 154, 0.9); outline-offset: 2px; }
    ${P} .bazi-chip-line { display: inline-block; width: 22px; height: 0; border-top: 1.5px solid #FFE19A; }
    ${P} .bazi-chip-line.is-controlling { border-top: 1.5px dashed #FF7A70; }
    ${P} .bazi-chip-dot { display: inline-block; width: 11px; height: 11px; border-radius: 3px; border: 1.5px solid #FFE19A; box-shadow: 0 0 8px rgba(244, 198, 91, 0.5); }

    /* THE ELEMENT ORBS: MILKY GLASS IN TWO LAYERS, the material of the circles that orbit the Earth on the first screen (numerologyOrbit.ts
       .kt-orbit-bubble). Layer one is the orb itself: a neutral frosted glass, semi-transparent, a thin luminous rim, a faint inner atmosphere and
       a soft diffuse light from the upper left, over a small bounded blur. Layer two (::before) is the element's colour laid over it as a translucent
       milky wash, deeper toward the edge. Nothing here is a flare: depth comes from the two layers and the rim, not from highlights. */
    ${P} .bazi-orb {
      position: absolute; left: calc(var(--x) * 0.25%); top: calc(var(--y) * 0.25%);
      width: calc(var(--r) * 0.5%); aspect-ratio: 1; transform: translate(-50%, -50%);
      box-sizing: border-box; border-radius: 50%; display: grid; align-content: center; justify-items: center; gap: calc(var(--r) * 0.02 * var(--u));
      padding-top: calc(var(--r) * 0.03 * var(--u)); text-align: center;
      border: 1px solid rgba(var(--o-rim), 0.72);
      background:
        radial-gradient(120% 120% at 30% 16%, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0) 52%),
        radial-gradient(circle at 50% 50%, rgba(222, 232, 250, 0.2), rgba(196, 210, 236, 0.1) 100%);
      -webkit-backdrop-filter: blur(6px) saturate(1.15); backdrop-filter: blur(6px) saturate(1.15);
      box-shadow:
        inset 0 0 0 1px rgba(var(--o-rim), 0.14),
        inset 0 0 calc(var(--r) * 0.45 * var(--u)) rgba(var(--o-glow), 0.24),
        inset calc(var(--r) * 0.06 * var(--u)) calc(var(--r) * 0.08 * var(--u)) calc(var(--r) * 0.3 * var(--u)) calc(var(--r) * -0.1 * var(--u)) rgba(255, 255, 255, 0.34),
        0 0 calc(var(--r) * 0.34 * var(--u)) rgba(var(--o-glow), 0.5),
        0 0 calc(var(--r) * 1.1 * var(--u)) rgba(var(--o-glow), 0.24);
    }
    /* layer two: the colour, a translucent milky wash over the glass */
    ${P} .bazi-orb::before {
      content: ''; position: absolute; inset: 0; border-radius: 50%; z-index: 0; pointer-events: none;
      background:
        radial-gradient(circle at 38% 30%, rgba(var(--o-light), 0.3), rgba(var(--o-light), 0) 58%),
        radial-gradient(circle at 50% 38%, rgba(var(--o-body), 0.8) 0%, rgba(var(--o-mid), 0.82) 68%, rgba(var(--o-shade), 0.74) 100%);
    }
    /* a soft diffuse light across the upper part of the glass (no streak, no flare) */
    ${P} .bazi-orb::after {
      content: ''; position: absolute; border-radius: 50%; z-index: 1;
      /* The layer is also the orb's invisible hit area: on a narrow phone a small orb (a zero count) would be a little under 44 px, so the layer reaches out by the
         difference and no further (nothing is drawn there: its light fades to nothing well inside). */
      inset: min(0px, calc((100% - 44px) / 2));
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0) 46%) center / 100% 100% no-repeat;
    }
    /* The Day Master: the same orb with a fine gold ring set off from it by a dark gap. Quiet, not a badge. */
    ${P} .bazi-orb.is-day-master {
      box-shadow:
        0 0 0 calc(var(--r) * 0.07 * var(--u)) rgba(5, 10, 24, 0.5),
        0 0 0 calc(var(--r) * 0.1 * var(--u)) rgba(255, 225, 154, 0.78),
        0 0 calc(var(--r) * 0.46 * var(--u)) rgba(244, 198, 91, 0.6),
        inset 0 0 calc(var(--r) * 0.45 * var(--u)) rgba(var(--o-glow), 0.24),
        inset calc(var(--r) * 0.06 * var(--u)) calc(var(--r) * 0.08 * var(--u)) calc(var(--r) * 0.3 * var(--u)) calc(var(--r) * -0.1 * var(--u)) rgba(255, 255, 255, 0.34);
    }
    ${P}[data-kt-perf="constrained"] .bazi-orb { -webkit-backdrop-filter: none; backdrop-filter: none; background: radial-gradient(circle at 50% 50%, rgba(214, 226, 246, 0.3), rgba(190, 206, 234, 0.2) 100%); }
    ${P} .bazi-orb > * { position: relative; z-index: 3; display: block; line-height: 1; }
    /* The type is the hero's: Georgia numerals with a soft glow and a dark under-shadow, small letter-spaced capitals for the name. */
    ${P} .bazi-orb-glyph { font-family: 'Noto Serif CJK TC', 'Noto Serif TC', 'Songti TC', 'PMingLiU', 'Noto Serif CJK SC', 'Noto Sans CJK TC', 'Microsoft JhengHei', serif; font-size: calc(var(--r) * 0.58 * var(--u)); color: rgba(255, 255, 255, 0.96); text-shadow: 0 0 6px rgba(var(--o-shade), 0.6), 0 1px 3px rgba(4, 7, 13, 0.7); }
    ${P} .bazi-orb-count { font-family: ${serif}; font-size: calc(var(--r) * 0.5 * var(--u)); color: #fff; text-shadow: 0 0 10px rgba(var(--o-shade), 0.7), 0 1px 3px rgba(4, 7, 13, 0.7); }
    ${P} .bazi-orb-name { font-size: calc(var(--r) * 0.22 * var(--u)); font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255, 255, 255, 0.95); text-shadow: 0 1px 4px rgba(4, 7, 13, 0.85), 0 0 8px rgba(var(--o-shade), 0.5); }

    /* THE FROSTED BACKING UNDER THE WHEEL: a bounded disc a little wider than the ring, blurred behind itself, tinted milky-blue toward the night sky,
       its edge fading out under a mask, so the ring floats over the planet on glass instead of being drawn on it. One element; the same family as
       the capsule panels' frost. A performance-constrained phone keeps the tint and loses the blur. */
    ${P} .bazi-wheel-frost {
      position: absolute; inset: 3.5%; border-radius: 50%; pointer-events: none;
      background: radial-gradient(circle closest-side, rgba(150, 176, 226, 0.12), rgba(22, 34, 66, 0.3) 72%, rgba(22, 34, 66, 0.2));
      -webkit-backdrop-filter: blur(10px) saturate(1.1); backdrop-filter: blur(10px) saturate(1.1);
      -webkit-mask-image: radial-gradient(circle closest-side, #000 88%, transparent 100%); mask-image: radial-gradient(circle closest-side, #000 88%, transparent 100%);
    }
    ${P}[data-kt-perf="constrained"] .bazi-wheel-frost { -webkit-backdrop-filter: none; backdrop-filter: none; background: radial-gradient(circle closest-side, rgba(150, 176, 226, 0.16), rgba(22, 34, 66, 0.42) 72%, rgba(22, 34, 66, 0.3)); }

    /* THE DAY MASTER MEDALLION: the hero's Year Animal circle in its gold - dark frosted glass, a clean warm rim, a calm inner light, a restrained
       halo. One bounded blur, exactly this circle. Nothing behind the type: no character, no mark, no gloss. */
    ${P} .bazi-disc {
      position: absolute; left: 50%; top: 50%; width: var(--d); aspect-ratio: 1; transform: translate(-50%, -50%);
      box-sizing: border-box; border-radius: 50%; display: grid; place-content: center; justify-items: center; gap: calc(7 * var(--u)); text-align: center;
      border: 1px solid rgba(238, 214, 150, 0.85);
      background:
        radial-gradient(120% 120% at 30% 14%, rgba(255, 244, 214, 0.1), rgba(255, 244, 214, 0) 50%),
        radial-gradient(circle at 50% 40%, rgba(28, 40, 72, 0.68), rgba(5, 9, 20, 0.9) 100%);
      -webkit-backdrop-filter: blur(9px) saturate(0.85); backdrop-filter: blur(9px) saturate(0.85);
      box-shadow:
        inset 0 0 0 1px rgba(238, 214, 150, 0.14),
        inset 0 0 0 calc(5 * var(--u)) rgba(5, 9, 20, 0.3),
        inset 0 0 0 calc(5.8 * var(--u)) rgba(238, 214, 150, 0.16),
        inset 0 0 calc(30 * var(--u)) rgba(210, 172, 92, 0.2),
        0 0 calc(18 * var(--u)) rgba(210, 172, 92, 0.46),
        0 0 calc(58 * var(--u)) rgba(210, 172, 92, 0.2);
    }
    ${P}[data-kt-perf="constrained"] .bazi-disc { -webkit-backdrop-filter: none; backdrop-filter: none; background: radial-gradient(circle at 50% 44%, rgba(22, 32, 58, 0.86), rgba(5, 9, 20, 0.94) 100%); }
    ${P} .bazi-disc > * { position: relative; z-index: 1; display: block; line-height: 1; }
    ${P} .bazi-disc-name { font-family: ${serif}; font-size: calc(34 * var(--u)); color: rgb(255, 238, 196); text-shadow: 0 0 5px rgba(255, 242, 204, 0.6), 0 0 13px rgba(210, 172, 92, 0.7), 0 0 26px rgba(210, 172, 92, 0.34), 0 1px 3px rgba(4, 7, 13, 0.55); }
    ${P} .bazi-disc-label { font-size: calc(11.5 * var(--u)); font-weight: 500; letter-spacing: 0.17em; text-transform: uppercase; color: rgba(244, 226, 176, 0.94); text-shadow: 0 0 8px rgba(210, 172, 92, 0.3), 0 1px 6px rgba(4, 7, 13, 0.85); }
  `;
}
