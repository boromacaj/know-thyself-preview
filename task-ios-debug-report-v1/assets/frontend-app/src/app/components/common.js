import { escapeDisplayText, escapeHtml } from '../format.js?v=b5ef5ed';
export function stageIntro(eyebrow, title, description, meta) {
    return `<header class="stage-intro">
    <div>
      <p class="eyebrow">${escapeHtml(eyebrow)}</p>
      <h1>${escapeHtml(title)}</h1>
      <p class="stage-description">${escapeHtml(description)}</p>
    </div>
    ${meta ? `<p class="stage-meta">${escapeHtml(meta)}</p>` : ''}
  </header>`;
}
export function commandButton(label, action, variant = 'primary', disabled = false) {
    return `<button class="command-button command-button-${variant}" type="button" data-action="${escapeHtml(action)}"${disabled ? ' disabled' : ''}>
    <span>${escapeHtml(label)}</span>
    <span aria-hidden="true">${variant === 'primary' ? '->' : '<-'}</span>
  </button>`;
}
export function statusMark(label, tone) {
    return `<span class="status-mark status-${tone}"><span aria-hidden="true"></span>${escapeHtml(label)}</span>`;
}
export function definitionList(rows, className = '') {
    return `<dl class="definition-list ${escapeHtml(className)}">
    ${rows.map((row) => `<div><dt>${escapeHtml(row.label)}</dt><dd>${escapeDisplayText(row.value)}</dd></div>`).join('')}
  </dl>`;
}
export function textList(items, className = '') {
    return `<ul class="text-list ${escapeHtml(className)}">
    ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
  </ul>`;
}
