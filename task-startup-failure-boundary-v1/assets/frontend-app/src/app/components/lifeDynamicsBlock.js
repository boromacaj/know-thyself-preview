import { escapeAttribute, escapeHtml } from '../format.js?v=2ea79e9';
import { LIFE_DYNAMICS_ORDER } from '../temporal-synthesis/lifeDynamics.js?v=2ea79e9';
import { LIFE_ICONS } from '../temporal-synthesis/lifeDynamicsIcons.js?v=2ea79e9';
import { LIFE_AXIS_WORD, LIFE_COPY, LIFE_HELPER, LIFE_LABEL, LIFE_LEVEL_WORD, } from '../temporal-synthesis/lifeDynamicsEnglish.js?v=2ea79e9';
/* The five icons of the approved design (a brain, a briefcase, a heart held in a hand, a heart with a pulse, a wallet): their geometry is lifeDynamicsIcons.ts, shared with the main menu's Forecast card. */
export { LIFE_ICONS };
const isLife = (id) => LIFE_DYNAMICS_ORDER.includes(id);
/** The emphasis word for a level (1-5, rounded): the same five words on every level. */
export const levelWord = (level) => LIFE_LEVEL_WORD[Math.min(5, Math.max(1, Math.round(level)))];
export function lifeTrendAreas() {
    return {
        order: LIFE_DYNAMICS_ORDER,
        label: (id) => (isLife(id) ? LIFE_LABEL[id] : id),
        helper: (id) => (isLife(id) ? LIFE_HELPER[id] : ''),
        state: levelWord,
        axisWord: (level) => LIFE_AXIS_WORD[level === 5 ? 5 : 1],
        icon: (id) => (isLife(id) ? LIFE_ICONS[id] : ''),
        copy: {
            areas: LIFE_COPY.trendAreas,
            showArea: LIFE_COPY.showArea,
            prevArea: LIFE_COPY.prevArea,
            nextArea: LIFE_COPY.nextArea,
            openMonth: LIFE_COPY.openMonth,
            openDay: LIFE_COPY.openDay,
            valueText: LIFE_COPY.valueText,
            yearAria: LIFE_COPY.yearAria,
            monthAria: LIFE_COPY.monthAria,
            hintYear: LIFE_COPY.hintYear,
            hintMonth: LIFE_COPY.hintMonth,
        },
    };
}
/* --------------------------------------------------- the parts every level shares -- */
/** Five rounded segments, lit up to the level. Not assessed is five empty dashed ones: a different gauge, not a shorter one. */
export function lifeGauge(level, assessed, aria) {
    const segments = [1, 2, 3, 4, 5].map((step) => `<i${assessed && step <= level ? ' class="is-on"' : ''}></i>`).join('');
    return `<span class="kt-fc-life-gauge${assessed ? '' : ' is-not-assessed'}" role="img" aria-label="${escapeAttribute(aria)}">${segments}</span>`;
}
/** The row's top line: icon, name, and the emphasis word (with a short tag when the influences do not all come one way) on the right. */
export function lifeTop(id, label, state, options = {}) {
    const assessed = options.assessed ?? true;
    const tag = options.tag ? `<span class="kt-fc-life-tag">${escapeHtml(options.tag)}</span>` : '';
    return `<span class="kt-fc-life-top${options.chevron ? ' has-chevron' : ''}">
              <span class="kt-fc-life-icon" aria-hidden="true">${LIFE_ICONS[id]}</span>
              <span class="kt-fc-life-name">${escapeHtml(label)}</span>
              <span class="kt-fc-life-state${assessed ? '' : ' is-not-assessed'}">${escapeHtml(state)}${tag}</span>${options.chevron ? '\n              <span class="kt-fc-life-chevron" aria-hidden="true">&#8250;</span>' : ''}
            </span>`;
}
export function lifePanel(scale, title, subtitle, rows, note, extraClass = '') {
    return `
    <section class="kt-fc-block kt-fc-life${extraClass ? ` ${extraClass}` : ''}" data-forecast-life="${scale}" aria-labelledby="kt-fc-life-${scale}-title">
      <header class="kt-fc-life-head">
        <h2 class="kt-fc-life-title" id="kt-fc-life-${scale}-title">${escapeHtml(title)}</h2>
        <p class="kt-fc-life-sub">${escapeHtml(subtitle)}</p>
      </header>
      <ul class="kt-fc-life-grid">${rows}
      </ul>
      <p class="kt-fc-life-note">${escapeHtml(note)}</p>
    </section>`;
}
/**
 * The Year's or Month's panel: five rows, each a tab for the graph under it. Absent when there is no profile,
 * never drawn empty.
 */
export function renderLifeDynamics(profile, scale, activeArea) {
    if (!profile)
        return '';
    const rows = profile.domains.filter((domain) => isLife(domain.id)).map((domain) => {
        const id = domain.id;
        const label = LIFE_LABEL[id];
        const state = levelWord(domain.level);
        const active = id === activeArea;
        return `
        <li class="kt-fc-life-item" data-domain="${id}" data-level="${domain.level}">
          <button type="button" class="kt-fc-life-card${active ? ' is-active' : ''}" data-forecast-area="${id}" aria-pressed="${active}"
                  aria-label="${escapeAttribute(LIFE_COPY.cardAria(label, state, domain.level))}">
            ${lifeTop(id, label, state)}
            ${lifeGauge(domain.level, true, LIFE_COPY.gaugeAria(label, state, domain.level))}
            <span class="kt-fc-life-helper">${escapeHtml(LIFE_HELPER[id])}</span>
          </button>
        </li>`;
    }).join('');
    return lifePanel(scale, scale === 'year' ? LIFE_COPY.titleYear : LIFE_COPY.titleMonth, scale === 'year' ? LIFE_COPY.subtitleYear : LIFE_COPY.subtitleMonth, rows, scale === 'year' ? LIFE_COPY.noteYear : LIFE_COPY.noteMonth);
}
