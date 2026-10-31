import { DAY_LIFE_COPY } from '../forecast-v2/dayLifeDynamicsEnglish.js?v=d9f39e7';
import { escapeAttribute, escapeHtml } from '../format.js?v=d9f39e7';
import { LIFE_HELPER } from '../temporal-synthesis/lifeDynamicsEnglish.js?v=d9f39e7';
import { lifeGauge, lifePanel, lifeTop } from './lifeDynamicsBlock.js?v=d9f39e7';
/**
 * TODAY'S LIFE DYNAMICS - THE DAY'S PANEL, FIRST ON THE SCREEN.
 *
 * The same compact panel as the Month and the Year (lifeDynamicsBlock.ts), placed before the written
 * reading: a quick look, then the reading that carries the practical advice. Each row is a closed
 * disclosure; opening it answers "why this?" from that row's own evidence.
 *
 * A NATIVE DISCLOSURE, NOT A SCRIPT. Each row is a <details> whose <summary> is the row. That is
 * keyboard-operable (Enter / Space), has a visible focus ring, announces its expanded state, needs no
 * handler in the controller and survives a re-render of the screen with nothing to remember. `name`
 * makes the browsers that support it keep one row open at a time; the others allow several. The summary
 * carries a visually hidden "Why this?" so a screen reader is told what the row does.
 *
 * NOT ASSESSED LOOKS DIFFERENT FROM LOW. An assessed theme lights 1 to 5 of its segments and says its
 * level in words; a theme with no assessment draws five empty dashed segments and says "Not assessed".
 * So the state is never carried by colour alone, and a missing assessment cannot be read as the faintest one.
 *
 * Pure rendering, English only.
 */
const ids = (refs) => refs.map((ref) => ref.id).join(' ');
function row(entry) {
    const level = entry.level ?? 0;
    const why = entry.explanation.map((line) => `
            <p class="kt-fc-life-why-line" data-life-kind="${line.kind}" data-basis-trigger="${escapeAttribute(ids(line.basis.triggers))}" data-basis-background="${escapeAttribute(ids(line.basis.background))}"><span class="kt-fc-dp-lead-in">${escapeHtml(line.label)}</span> ${escapeHtml(line.text)}</p>`).join('');
    return `
        <li class="kt-fc-life-item" data-life-area="${entry.id}" data-assessed="${entry.assessed}" data-level="${level}" data-tone="${entry.row.tone}">
          <details class="kt-fc-life-day" name="kt-fc-life-day">
            <summary class="kt-fc-life-card" data-life-row="${entry.id}">
              ${lifeTop(entry.id, entry.label, entry.state, { assessed: entry.assessed, tag: entry.tag, chevron: true })}
              ${lifeGauge(level, entry.assessed, entry.gaugeAria)}
              <span class="kt-fc-life-helper">${escapeHtml(LIFE_HELPER[entry.id])}</span>
              <span class="kt-fc-life-sr">${escapeHtml(DAY_LIFE_COPY.hint)}</span>
            </summary>
            <div class="kt-fc-life-why" data-life-why="${entry.id}">${why}
            </div>
          </details>
        </li>`;
}
export function renderDayLifeDynamics(card) {
    if (!card)
        return '';
    return lifePanel('day', card.title, card.subtitle, card.rows.map(row).join(''), card.note, 'kt-fc-life-today');
}
