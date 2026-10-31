import { escapeAttribute, escapeHtml } from '../../format.js';
import { CATEGORY_TEXT, TONE_TEXT, UI_TEXT } from '../presentation/mapContent.js';
import { MAP_CATEGORIES } from '../presentation/relationshipMap.js';
import { categoryDetailHtml, defaultCategory, memberTone } from './relationshipMapView.js';
const e = escapeHtml;
const a = escapeAttribute;
const text = (value, lang) => value[lang];
/* -------------------------------------------------------------- dimensions -- */
/** The look of each dimension: its accent and its icon (24 x 24, drawn with a fine line). */
export const DIMENSION_STYLE = {
    communication: { accent: '#e3b865', icon: '<path d="M4 6.5C4 5.1 5.1 4 6.5 4H14c1.4 0 2.5 1.1 2.5 2.5v4c0 1.4-1.1 2.5-2.5 2.5H9l-3 2.5V13c-1.1-.3-2-1.3-2-2.5z"/><path d="M18 9.5c1.7.3 3 1.4 3 2.800v3.200c0 1.200-.8 2.200-2 2.500V20l-2.800-2H12"/>' },
    emotions: { accent: '#74a9ff', icon: '<path d="M12 20s-7-4.400-7-10a4 4 0 0 1 7-2.600A4 4 0 0 1 19 10c0 5.600-7 10-7 10z"/>' },
    closeness: { accent: '#bb92f4', icon: '<path d="M12 5c-2.500 3-2.500 7 0 10 2.500-3 2.500-7 0-10z"/><path d="M12 15c-3-.5-5.500-2.500-7-5 3.500-.5 6 1.500 7 5zM12 15c3-.5 5.500-2.500 7-5-3.500-.5-6 1.500-7 5z"/><path d="M8 18.500h8"/>' },
    conflict: { accent: '#ff8d6e', icon: '<path d="M13 3 5 13.500h6L10 21l8-10.500h-6z"/>' },
    decisions: { accent: '#72d395', icon: '<circle cx="12" cy="12" r="8"/><path d="m15.500 8.500-2 5-5 2 2-5z"/>' },
    everyday: { accent: '#59cbc3', icon: '<path d="M5 19C5 10 10 5 19 5c0 9-5 14-14 14z"/><path d="M5 19 13 11"/>' },
    direction: { accent: '#9d8ff5', icon: '<path d="m3 19 6.500-12L13 13l3-4 5 10z"/>' },
};
/** How a kind of relationship is drawn on an arc: colour AND pattern, so that no kind rests on colour alone. */
export const TONE_STROKE = {
    resonance: { color: '#ecc67a', dash: '', width: 6, cap: 'butt' },
    complement: { color: '#7ab3ff', dash: '20 7', width: 6, cap: 'butt' },
    friction: { color: '#ff9376', dash: '8 6', width: 6, cap: 'butt' },
    asymmetry: { color: '#b99cff', dash: '22 5 3 5', width: 6, cap: 'butt' },
    mixed: { color: '#66d6c9', dash: '12 4 3 4', width: 6, cap: 'butt' },
    limited: { color: '#8da2c4', dash: '1.5 7', width: 3.5, cap: 'round' },
};
/** The six areas that make up the ring, clockwise from the top; the seventh (Conflict & Reconnection) is derived and uncounted, so it is not an arc of the ring. */
export const RING_AREAS = MAP_CATEGORIES.filter((id) => id !== 'conflict');
const point = (cx, cy, r, degreesFromTop) => {
    const angle = (degreesFromTop * Math.PI) / 180;
    return { x: cx + r * Math.sin(angle), y: cy - r * Math.cos(angle) };
};
/** An arc of a circle, from one angle to another (degrees, clockwise from twelve o'clock). */
export function ringArcPath(cx, cy, r, from, to) {
    const start = point(cx, cy, r, from);
    const end = point(cx, cy, r, to);
    return `M${start.x.toFixed(2)} ${start.y.toFixed(2)}A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}
/** The six arcs of the pending ring as data: area, tone, start and end angle (60 degrees each with a gap). Pure, so the ring can be tested without a page. */
export function ringSegments(map) {
    return RING_AREAS.map((id, index) => ({ id, tone: map.categories.find((category) => category.id === id)?.tone ?? 'limited', from: index * 60 + 3, to: index * 60 + 57 }));
}
/* -------------------------------------------------------------------- rail -- */
const ARC_R = 29;
/** The little gauge of one dimension: one arc for each finding it stands on (a single finding is a whole circle), each drawn in the pattern of its kind of relationship, in the dimension's own accent. */
export function gaugeSvg(category, accent) {
    const tones = category.members.length ? category.members.map((member) => memberTone(member)) : ['limited'];
    const n = tones.length;
    const gap = n === 1 ? 0 : 14;
    const span = 360 / n;
    const arcs = tones.map((tone, index) => {
        const stroke = TONE_STROKE[tone];
        const from = index * span + gap / 2;
        const to = (index + 1) * span - gap / 2;
        const scaled = stroke.dash ? stroke.dash.split(' ').map((part) => (Number(part) * 0.6).toFixed(2)).join(' ') : '';
        const dash = scaled ? ` stroke-dasharray="${scaled}"` : '';
        const opacity = tone === 'limited' ? 0.7 : 1;
        return n === 1
            ? `<circle cx="36" cy="36" r="${ARC_R}" fill="none" stroke="${accent}" stroke-width="${stroke.width - 1}" stroke-linecap="${stroke.cap}"${dash} opacity="${opacity}"/>`
            : `<path d="${ringArcPath(36, 36, ARC_R, from, to)}" fill="none" stroke="${accent}" stroke-width="${stroke.width - 1}" stroke-linecap="${stroke.cap}"${dash} opacity="${opacity}"/>`;
    }).join('');
    return `<svg viewBox="0 0 72 72" focusable="false" aria-hidden="true"><circle cx="36" cy="36" r="${ARC_R}" fill="${accent}" fill-opacity="0.1" stroke="#ffffff" stroke-opacity="0.14" stroke-width="1"${category.derived ? ' stroke-dasharray="2 3"' : ''}/>${arcs}<g transform="translate(24 24)" fill="none" stroke="${accent}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${DIMENSION_STYLE[category.id].icon}</g></svg>`;
}
/** The seven dimensions as a rail of round gauges: one tab each, the selected one lit. On a narrow screen the rail scrolls and snaps; on a wide one all seven are in view. */
export function dimensionRailHtml(map, active, lang) {
    const tabs = map.categories.map((category) => {
        const selected = category.id === active;
        return `<button type="button" role="tab" id="cx-tab-${a(category.id)}" class="cx-dash-tab${selected ? ' is-active' : ''}" data-cx-focus="${a(category.id)}" aria-selected="${selected}" aria-controls="cx-dash-panel" tabindex="${selected ? 0 : -1}" data-tone="${a(category.tone)}" style="--cx-accent:${DIMENSION_STYLE[category.id].accent}">
        <span class="cx-dash-gauge">${gaugeSvg(category, DIMENSION_STYLE[category.id].accent)}</span>
        <span class="cx-dash-label">${e(text(CATEGORY_TEXT[category.id].label, lang))}</span>
        <span class="cx-dash-state">${e(text(TONE_TEXT[category.tone].label, lang))}</span>
        ${category.derived ? `<span class="cx-dash-derived">${e(text(UI_TEXT.derivedTag, lang))}</span>` : ''}
      </button>`;
    }).join('');
    return `
    <section class="cx-dash-rail-wrap" aria-label="${a(text(UI_TEXT.railLabel, lang))}">
      <div class="cx-dash-rail" role="tablist" aria-label="${a(text(UI_TEXT.railLabel, lang))}" data-cx-rail>${tabs}</div>
      <p class="cx-note cx-dash-hint">${e(text(UI_TEXT.ringHint, lang))}</p>
    </section>`;
}
/** The inside of the panel for one dimension: its name and what it covers, its kind of relationship, and its detail. */
export function dimensionPanelInnerHtml(map, names, dimensions, id, lang) {
    const category = map.categories.find((entry) => entry.id === id) ?? map.categories[0];
    const accent = DIMENSION_STYLE[category.id];
    return `
    <header class="cx-dash-panel-head">
      <span class="cx-dash-panel-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="${accent.accent}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" focusable="false">${accent.icon}</svg></span>
      <div><h2 class="cx-dash-panel-title">${e(text(CATEGORY_TEXT[category.id].label, lang))}</h2><p class="cx-dash-panel-covers">${e(text(CATEGORY_TEXT[category.id].covers, lang))}</p></div>
    </header>
    ${categoryDetailHtml(category, names, dimensions, lang)}`;
}
/** The panel's shell, around its inner content. */
export function dimensionPanelHtml(map, names, dimensions, id, lang) {
    return `<section id="cx-dash-panel" class="cx-panel cx-dash-panel" role="tabpanel" aria-labelledby="cx-tab-${a(id)}" tabindex="-1" data-cx-panel data-area="${a(id)}" style="--cx-accent:${DIMENSION_STYLE[id].accent}">${dimensionPanelInnerHtml(map, names, dimensions, id, lang)}</section>`;
}
/** The dimension a person lands on: the one that most needs a word. */
export const initialDimension = (map) => defaultCategory(map);
/* ---------------------------------------------------------------- behaviour -- */
export const prefersReducedMotion = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
/** Scrolls the rail (never the page) so the selected tab is in the middle of it. */
export function centreTab(root, smooth) {
    const rail = root.querySelector('[data-cx-rail]');
    const tab = rail?.querySelector('[role="tab"][aria-selected="true"]');
    if (!rail || !tab)
        return;
    const left = tab.offsetLeft - (rail.clientWidth - tab.offsetWidth) / 2;
    if (typeof rail.scrollTo === 'function')
        rail.scrollTo({ left: Math.max(0, left), behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'auto' });
    else
        rail.scrollLeft = Math.max(0, left);
}
/**
 * Selects a dimension in place: the tab and the arc light up, the panel's content is replaced, and nothing else is redrawn. Returns false when this page has no dashboard (the caller then redraws as before).
 * `bringIntoView` is for a choice made far from the rail (a card): the rail and the panel are scrolled into view; a choice made on the rail itself never moves the page.
 */
export function applyDimension(root, id, panelInner, bringIntoView) {
    const rail = root.querySelector('[data-cx-rail]');
    const panel = root.querySelector('[data-cx-panel]');
    if (!rail || !panel)
        return false;
    for (const tab of rail.querySelectorAll('[role="tab"]')) {
        const on = tab.dataset.cxFocus === id;
        tab.setAttribute('aria-selected', String(on));
        tab.setAttribute('tabindex', on ? '0' : '-1');
        tab.classList.toggle('is-active', on);
    }
    /* the pinned gauge (another layer, outside this root) lights the area too when it is the pattern ring */
    for (const arc of document.querySelectorAll('.cx-dash-arc'))
        arc.classList.toggle('is-active', arc.dataset.area === id);
    panel.innerHTML = panelInner;
    panel.setAttribute('aria-labelledby', `cx-tab-${id}`);
    panel.dataset.area = id;
    panel.style.setProperty('--cx-accent', DIMENSION_STYLE[id].accent);
    panel.classList.remove('is-entering');
    void panel.offsetWidth;
    if (!prefersReducedMotion())
        panel.classList.add('is-entering');
    centreTab(root, true);
    if (bringIntoView)
        rail.closest('.cx-dash-rail-wrap')?.scrollIntoView({ block: 'start', behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    return true;
}
/** The dimension an arrow key moves to from a focused tab (Left, Right, Home, End), or null when the key is not one. */
export function railKeyTarget(key, current) {
    const index = MAP_CATEGORIES.indexOf(current);
    if (index < 0)
        return null;
    if (key === 'ArrowRight' || key === 'ArrowDown')
        return MAP_CATEGORIES[(index + 1) % MAP_CATEGORIES.length];
    if (key === 'ArrowLeft' || key === 'ArrowUp')
        return MAP_CATEGORIES[(index + MAP_CATEGORIES.length - 1) % MAP_CATEGORIES.length];
    if (key === 'Home')
        return MAP_CATEGORIES[0];
    if (key === 'End')
        return MAP_CATEGORIES[MAP_CATEGORIES.length - 1];
    return null;
}
