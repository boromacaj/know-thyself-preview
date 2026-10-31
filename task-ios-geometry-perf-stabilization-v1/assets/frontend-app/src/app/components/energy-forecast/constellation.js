/**
 * ENERGY CONSTELLATION — signature system-agreement visualisation.
 *
 * Centre = the self, carrying the period's strongest convergent theme. Four
 * satellites = the systems allowed to vote. Satellite size is that system's
 * summed theme contribution; a chord between two satellites exists only where
 * the engine itself recorded both supporting the same theme, and its weight is
 * the overlap of their contributions.
 *
 * Nothing here is a decorative weight — every radius and stroke width is a
 * calculated value scaled to the period's own maximum.
 */
import { escapeHtml } from '../../format.js?v=d9f39e7';
const WIDTH = 620;
const HEIGHT = 470;
const CENTRE_X = WIDTH / 2;
const CENTRE_Y = 232;
const ORBIT = 152;
const HUB_RADIUS = 74;
/** Fixed positions so the diagram stays comparable by eye between periods. */
const NODE_ANGLES = {
    astrology: -90,
    numerology: 0,
    'human-design': 90,
    bazi: 180,
};
export function renderConstellation({ model, periodLabel, focusedSystem }) {
    const positions = new Map();
    for (const node of model.nodes) {
        const radians = (NODE_ANGLES[node.system] * Math.PI) / 180;
        positions.set(node.system, [CENTRE_X + ORBIT * Math.cos(radians), CENTRE_Y + ORBIT * Math.sin(radians)]);
    }
    const chords = model.links.map((link) => {
        const [ax, ay] = positions.get(link.systems[0]);
        const [bx, by] = positions.get(link.systems[1]);
        const strength = link.weight / model.maxLinkWeight;
        const midX = (ax + bx) / 2;
        const midY = (ay + by) / 2;
        const controlX = midX + (CENTRE_X - midX) * 0.46;
        const controlY = midY + (CENTRE_Y - midY) * 0.46;
        const dimmed = focusedSystem !== null && !link.systems.includes(focusedSystem);
        return `<path class="ef-constellation-chord${dimmed ? ' is-dimmed' : ''}" d="M ${round(ax)} ${round(ay)} Q ${round(controlX)} ${round(controlY)} ${round(bx)} ${round(by)}" style="--ef-strength:${round(strength)}; stroke-width:${round(1 + strength * 4.2)}">
      <title>${escapeHtml(`${link.systems.join(' + ')} agree on: ${link.themes.join(', ')} (overlap ${link.weight})`)}</title>
    </path>`;
    }).join('');
    const spokes = model.nodes.map((node) => {
        const [x, y] = positions.get(node.system);
        const strength = node.contribution / model.maxContribution;
        const dimmed = focusedSystem !== null && focusedSystem !== node.system;
        return `<line class="ef-constellation-spoke${dimmed ? ' is-dimmed' : ''}" x1="${CENTRE_X}" y1="${CENTRE_Y}" x2="${round(x)}" y2="${round(y)}" style="--ef-strength:${round(strength)}" />`;
    }).join('');
    const nodes = model.nodes.map((node) => {
        const [x, y] = positions.get(node.system);
        const strength = node.contribution / model.maxContribution;
        const radius = 20 + strength * 24;
        const angle = NODE_ANGLES[node.system];
        const labelRight = angle === 0;
        const labelLeft = angle === 180;
        const labelBelow = angle === 90;
        const labelX = labelRight ? x + radius + 14 : labelLeft ? x - radius - 14 : x;
        const labelY = labelBelow ? y + radius + 26 : angle === -90 ? y - radius - 28 : y - 2;
        const anchor = labelRight ? 'start' : labelLeft ? 'end' : 'middle';
        const isFocused = focusedSystem === node.system;
        const dimmed = focusedSystem !== null && !isFocused;
        return `<g class="ef-constellation-node is-${node.system}${isFocused ? ' is-focused' : ''}${dimmed ? ' is-dimmed' : ''}" style="--ef-strength:${round(strength)}">
      <circle class="ef-constellation-halo" cx="${round(x)}" cy="${round(y)}" r="${round(radius)}" />
      <circle class="ef-constellation-core" cx="${round(x)}" cy="${round(y)}" r="${round(radius * 0.4)}" />
      <text class="ef-constellation-label" x="${round(labelX)}" y="${round(labelY)}" text-anchor="${anchor}">${escapeHtml(node.label.toUpperCase())}</text>
      <text class="ef-constellation-value" x="${round(labelX)}" y="${round(labelY + 19)}" text-anchor="${anchor}">${node.contribution.toFixed(1)}<tspan class="ef-constellation-share"> · ${Math.round(node.share * 100)}%</tspan></text>
      <circle class="ef-constellation-hit" data-action="ef-focus-system" data-system="${node.system}" cx="${round(x)}" cy="${round(y)}" r="${round(radius + 12)}" />
      <title>${escapeHtml(`${node.label}: summed theme contribution ${node.contribution} (${Math.round(node.share * 100)}% of the period). Select to see its strongest signals.`)}</title>
    </g>`;
    }).join('');
    const centreLines = wrap(model.centreTheme ?? 'No multi-system agreement', 15);
    const centreOffset = (centreLines.length - 1) * 10;
    return `<figure class="ef-constellation${focusedSystem ? ' is-focusing' : ''}">
    <svg viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="Energy constellation for ${escapeHtml(periodLabel)}" preserveAspectRatio="xMidYMid meet">
      <circle class="ef-constellation-orbit" cx="${CENTRE_X}" cy="${CENTRE_Y}" r="${ORBIT}" />
      ${chords}
      ${spokes}
      <circle class="ef-constellation-hub" cx="${CENTRE_X}" cy="${CENTRE_Y}" r="${HUB_RADIUS}" />
      <circle class="ef-constellation-hub-inner" cx="${CENTRE_X}" cy="${CENTRE_Y}" r="${HUB_RADIUS - 9}" />
      <text class="ef-constellation-hub-name" x="${CENTRE_X}" y="${CENTRE_Y - 34 - centreOffset}" text-anchor="middle">SELF</text>
      ${centreLines.map((line, index) => `<text class="ef-constellation-hub-theme" x="${CENTRE_X}" y="${CENTRE_Y - 8 - centreOffset + index * 20}" text-anchor="middle">${escapeHtml(line)}</text>`).join('')}
      <text class="ef-constellation-hub-value" x="${CENTRE_X}" y="${CENTRE_Y + 30}" text-anchor="middle">${model.centreConvergence ? `CONVERGENCE ${model.centreConvergence}` : 'SINGLE SYSTEM ONLY'}</text>
      ${nodes}
    </svg>
  </figure>`;
}
/** Side panel: the focused system's strongest supporting signals for the period. */
export function renderConstellationFocus(model, focusedSystem, periodLabel) {
    if (!focusedSystem) {
        return `<div class="ef-constellation-aside">
      <p class="ef-constellation-hint">Select a system to see the signals behind its weight in ${escapeHtml(periodLabel)}.</p>
      <ul class="ef-constellation-legend">
        <li><i class="ef-swatch is-node"></i>Node size = summed theme contribution</li>
        <li><i class="ef-swatch is-chord"></i>Chord = both systems supporting one theme</li>
        <li><i class="ef-swatch is-hub"></i>Centre = strongest convergent theme</li>
      </ul>
    </div>`;
    }
    const node = model.nodes.find((candidate) => candidate.system === focusedSystem);
    const signals = model.signalsBySystem[focusedSystem] ?? [];
    return `<div class="ef-constellation-aside is-focused">
    <header class="ef-constellation-aside-head">
      <span class="ef-why-system-tag is-${focusedSystem}">${escapeHtml(focusedSystem)}</span>
      <strong>${node ? node.contribution.toFixed(1) : '0'}</strong>
      <em>summed contribution · ${node ? Math.round(node.share * 100) : 0}% of ${escapeHtml(periodLabel)}</em>
      <button type="button" class="ef-constellation-clear" data-action="ef-focus-system" data-system="">Clear</button>
    </header>
    ${signals.length > 0
        ? `<ol class="ef-constellation-signals">${signals.map((signal) => `<li>
          <span class="ef-constellation-signal-label">${escapeHtml(signal.label)}</span>
          <span class="ef-constellation-signal-themes">${escapeHtml(signal.themes.join(' · '))}</span>
          <span class="ef-mono">${signal.contribution.toFixed(2)}</span>
        </li>`).join('')}</ol>`
        : '<p class="ef-empty">This system contributed no theme weight in this period.</p>'}
  </div>`;
}
function wrap(text, maxChars) {
    const words = text.split(/\s+/);
    const lines = [];
    let current = '';
    for (const word of words) {
        if (current && `${current} ${word}`.length > maxChars) {
            lines.push(current);
            current = word;
        }
        else {
            current = current ? `${current} ${word}` : word;
        }
    }
    if (current)
        lines.push(current);
    return lines.slice(0, 3);
}
function round(value) {
    return Math.round(value * 100) / 100;
}
