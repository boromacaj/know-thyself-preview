import { escapeAttribute, escapeHtml } from '../../format.js';
/**
 * THE ARTWORK OF CONNECTIONS: FOUR DOMAIN MARKS AND THE CONSTELLATION OF A RELATIONSHIP.
 *
 * Drawn in the application's one stroke language - fine round-capped lines in the colour of the text around them, a faint glow where something is lit - and in nothing else:
 * no fills, no gradients, no new typeface, no second palette. The Connections heart on the Main Menu is its own approved illustration and is not redrawn, echoed or animated
 * here; the marks below are about the four KINDS of relationship, and the constellation is about THIS one.
 *
 *   romantic   two rings that overlap: what is shared sits in the lens between them
 *   family     one larger and two smaller nodes joined: a line of descent
 *   work       two squares turned on their corners, offset: each covers part of what the other does not
 *   parenting  a large circle and a small one with a short arc between: an adult and a child, and a spark of attention
 */
const STROKE = 'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"';
export function domainMark(domain) {
    const body = {
        romantic: '<circle cx="16" cy="21" r="9.5"/><circle cx="27" cy="21" r="9.5"/><path d="M21.5 13.2a9.5 9.5 0 0 1 0 15.6" opacity=".55"/>',
        family: '<circle cx="21.5" cy="9" r="4.4"/><circle cx="9.5" cy="30.5" r="3.6"/><circle cx="33.5" cy="30.5" r="3.6"/><path d="M19.2 12.7 11.6 27.2M23.8 12.7l7.6 14.5M13.4 30.5h16.4" opacity=".7"/>',
        work: '<rect x="5" y="9.5" width="16" height="16" rx="2.6" transform="rotate(45 13 17.5)"/><rect x="18" y="14.5" width="16" height="16" rx="2.6" transform="rotate(45 26 22.5)"/>',
        parenting: '<circle cx="14" cy="23" r="9.5"/><circle cx="31.5" cy="27.5" r="4.6"/><path d="M23.6 21.2c2.4-3.2 6.2-4 9-2.2" opacity=".6"/><path d="M31.5 11.5v4.2M29.4 13.6h4.2" opacity=".85"/>',
    }[domain];
    return `<svg class="cx-mark" viewBox="0 0 43 43" ${STROKE} aria-hidden="true" focusable="false">${body}</svg>`;
}
/**
 * The constellation: people as small discs with their initial, relationships as lines between them. Adults on the top row, children on the bottom, a pair on one level.
 * It is illustration only (aria-hidden): the pair chooser beside it is the control. The selected pair's line is lit.
 */
export function constellation(nodes, edges, selected) {
    const rows = { top: [], middle: [], bottom: [] };
    for (const node of nodes)
        rows[node.row].push(node);
    const width = 300;
    const y = { top: 24, middle: 44, bottom: 72 };
    const position = new Map();
    for (const row of ['top', 'middle', 'bottom']) {
        const list = rows[row];
        list.forEach((node, index) => position.set(node.id, { x: ((index + 1) * width) / (list.length + 1), y: y[row] }));
    }
    const height = rows.middle.length > 0 ? 88 : 96;
    const lines = edges.map((edge) => {
        const a = position.get(edge.from);
        const b = position.get(edge.to);
        if (!a || !b)
            return '';
        const lit = edge.id === selected;
        const klass = `cx-link${lit ? ' is-lit' : ''}`;
        const dash = edge.style === 'dashed' ? ' stroke-dasharray="3 4"' : '';
        const bend = edge.style === 'double' ? 3 : 0;
        const base = `<line class="${klass}" x1="${a.x}" y1="${a.y - bend}" x2="${b.x}" y2="${b.y - bend}"${dash}/>`;
        return edge.style === 'double' ? `${base}<line class="${klass}" x1="${a.x}" y1="${a.y + bend}" x2="${b.x}" y2="${b.y + bend}"/>` : base;
    }).join('');
    const discs = nodes.map((node) => {
        const at = position.get(node.id);
        return `<g class="cx-disc" transform="translate(${at.x} ${at.y})"><circle r="13"/><text y="4.5" text-anchor="middle">${escapeHtml(node.initial)}</text></g>`;
    }).join('');
    return `<svg class="cx-constellation" viewBox="0 0 ${width} ${height}" aria-hidden="true" focusable="false" data-cx-selected="${escapeAttribute(selected ?? '')}">${lines}${discs}</svg>`;
}
/** The scale of one dimension: a line with the two people's markers on it, -1 (first end) to 1 (second end). A person who cannot be placed has no marker. */
export function dimensionScale(markers, initials) {
    const at = (value) => Math.round(((value + 1) / 2) * 200 + 10);
    const marker = (value, side, letter) => (value === null ? '' : `<g class="cx-marker cx-marker-${side}" transform="translate(${at(value)} 14)"><circle r="9"/><text y="3.8" text-anchor="middle">${escapeHtml(letter)}</text></g>`);
    /* Two people at nearly the same place are drawn a little apart so both letters stay legible. */
    const near = markers.first !== null && markers.second !== null && Math.abs(markers.first - markers.second) < 0.12;
    const nudge = (value, direction) => (value === null || !near ? value : Math.max(-1, Math.min(1, value + direction * 0.07)));
    return `<svg class="cx-scale" viewBox="0 0 220 28" aria-hidden="true" focusable="false"><line class="cx-scale-line" x1="10" y1="14" x2="210" y2="14"/><circle class="cx-scale-mid" cx="110" cy="14" r="2"/>${marker(nudge(markers.first, -1), 'first', initials.first)}${marker(nudge(markers.second, 1), 'second', initials.second)}</svg>`;
}
/**
 * THE RELATIONSHIP SPECTRUM: where the two people stand between the two ends of one axis, as a quiet track with two markers, replacing the technical scale of the other domains for the Romantic result.
 *
 * Presentation only: the positions are the engine's own (-1 to 1) and are put at (position + 1) / 2 of the track, exactly; no value is rounded to a step, shifted, or labelled with a number. The two people
 * are told apart by SHAPE as well as colour (the first a filled disc in the warm accent, the second a hollow ring in a cool one), by their initial inside, and by a key with their names beneath.
 * What the evidence does not support is not drawn with more certainty than it has: a slight lean or a pull both ways is a soft stretch (a wide, faint band) around the marker, a finding that stands
 * on too little is drawn dashed and faint (`limited`), and a person who cannot be placed has no marker at all and the key says so. Two markers at nearly the same place are put one above the other
 * (never moved sideways), so both stay legible and both stay where the data puts them. The track and the key are decorative (the words beneath the figure say the same, person by person), so they are hidden from
 * screen readers; the words at the two ends of the axis are real text and are read.
 */
export function relationshipSpectrum(first, second, ends, limited, unplaced) {
    const percent = (value) => (((Math.max(-1, Math.min(1, value)) + 1) / 2) * 100).toFixed(2);
    const initial = (name) => Array.from(name.trim())[0]?.toLocaleUpperCase() ?? '?';
    const near = first.position !== null && second.position !== null && Math.abs(first.position - second.position) < 0.14;
    const marker = (person, side, lane) => {
        if (person.position === null)
            return '';
        const band = person.soft ? `<span class="cx-spec-band cx-spec-${side}" style="left:${percent(person.position)}%"></span>` : '';
        return `${band}<span class="cx-spec-dot cx-spec-${side} cx-spec-${lane}" style="left:${percent(person.position)}%"><b>${escapeHtml(initial(person.name))}</b></span>`;
    };
    const link = first.position !== null && second.position !== null && !near
        ? `<span class="cx-spec-link" style="left:${percent(Math.min(first.position, second.position))}%;width:${(Math.abs(first.position - second.position) * 50).toFixed(2)}%"></span>`
        : '';
    const key = (person, side) => `<span class="cx-spec-who"><i class="cx-spec-key-${side}"></i>${escapeHtml(person.name)}${person.position === null ? ` <em>${escapeHtml(unplaced)}</em>` : ''}</span>`;
    return `<figure class="cx-spec${limited ? ' is-limited' : ''}">
    ${ends ? `<div class="cx-spec-ends"><span>${escapeHtml(ends[0])}</span><span>${escapeHtml(ends[1])}</span></div>` : ''}
    <div class="cx-spec-track" aria-hidden="true"><span class="cx-spec-rail"></span><span class="cx-spec-mid"></span>${link}${marker(first, 'a', near ? 'up' : 'mid')}${marker(second, 'b', near ? 'down' : 'mid')}</div>
    <figcaption class="cx-spec-keys" aria-hidden="true">${key(first, 'a')}${key(second, 'b')}</figcaption>
  </figure>`;
}
