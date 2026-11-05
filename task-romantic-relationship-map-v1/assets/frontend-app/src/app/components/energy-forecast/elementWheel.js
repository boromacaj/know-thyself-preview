/**
 * Five Phase (Wu Xing) wheel.
 *
 * Node size and fill come from the element values the forecast engine already
 * stored. The generating cycle is drawn as the primary ring; the controlling
 * cycle is present but recessive, so the diagram reads as a field with one
 * obvious centre of gravity rather than as a schematic.
 *
 * The organ line is a traditional energetic correspondence, never a medical
 * statement — the disclaimer stays attached to it on screen.
 */
import { escapeHtml } from '../../format.js';
const SIZE = 340;
const CENTRE = SIZE / 2;
const RADIUS = 104;
/** Generating cycle, clockwise from the top. */
export const GENERATING_ORDER = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
function nodePosition(index) {
    const degrees = -90 + index * 72;
    const radians = (degrees * Math.PI) / 180;
    return [CENTRE + RADIUS * Math.cos(radians), CENTRE + RADIUS * Math.sin(radians)];
}
export function renderElementWheel({ scores, dominantElement, unitLabel, bodyCorrespondence, emotionalMirror }) {
    const maxScore = Math.max(1e-6, ...GENERATING_ORDER.map((element) => scores[element] ?? 0));
    const positions = GENERATING_ORDER.map((_, index) => nodePosition(index));
    const controlling = GENERATING_ORDER.map((_, index) => {
        const [x1, y1] = positions[index];
        const [x2, y2] = positions[(index + 2) % GENERATING_ORDER.length];
        return `<line class="ef-wuxing-control" x1="${round(x1)}" y1="${round(y1)}" x2="${round(x2)}" y2="${round(y2)}" />`;
    }).join('');
    // Generating arcs follow the circle rather than cutting across it, so the
    // cycle reads as flow instead of as a wireframe pentagon.
    const generating = GENERATING_ORDER.map((_, index) => {
        const [x1, y1] = positions[index];
        const [x2, y2] = positions[(index + 1) % GENERATING_ORDER.length];
        return `<path class="ef-wuxing-generate" d="M ${round(x1)} ${round(y1)} A ${RADIUS} ${RADIUS} 0 0 1 ${round(x2)} ${round(y2)}" />`;
    }).join('');
    const nodes = GENERATING_ORDER.map((element, index) => {
        const [x, y] = positions[index];
        const value = scores[element] ?? 0;
        const strength = value / maxScore;
        const radius = 13 + strength * 20;
        const isDominant = element === dominantElement;
        return `<g class="ef-wuxing-node is-${element.toLowerCase()}${isDominant ? ' is-dominant' : ''}" style="--ef-strength:${round(strength)}">
      ${isDominant ? `<circle class="ef-wuxing-crown" cx="${round(x)}" cy="${round(y)}" r="${round(radius + 8)}" />` : ''}
      <circle class="ef-wuxing-ring" cx="${round(x)}" cy="${round(y)}" r="${round(radius)}" />
      <circle class="ef-wuxing-core" cx="${round(x)}" cy="${round(y)}" r="${round(radius * 0.52)}" />
      <text class="ef-wuxing-label" x="${round(x)}" y="${round(y + radius + 17)}" text-anchor="middle">${element.toUpperCase()}</text>
      <text class="ef-wuxing-value" x="${round(x)}" y="${round(y + radius + 30)}" text-anchor="middle">${formatValue(value)}</text>
      <title>${escapeHtml(`${element}: ${formatValue(value)} ${unitLabel}`)}</title>
    </g>`;
    }).join('');
    return `<figure class="ef-wuxing">
    <svg viewBox="0 0 ${SIZE} ${SIZE}" role="img" aria-label="Five Phase distribution, dominant ${escapeHtml(dominantElement ?? 'none')}" preserveAspectRatio="xMidYMid meet">
      <circle class="ef-wuxing-orbit" cx="${CENTRE}" cy="${CENTRE}" r="${RADIUS}" />
      ${controlling}
      ${generating}
      ${nodes}
    </svg>
    <figcaption class="ef-wuxing-caption">
      ${dominantElement ? `<span class="ef-wuxing-dominant is-${dominantElement.toLowerCase()}"><em>Dominant phase</em><strong>${escapeHtml(dominantElement)}</strong></span>` : ''}
      ${bodyCorrespondence ? `<span class="ef-wuxing-organ">${escapeHtml(bodyCorrespondence)}</span>` : ''}
      ${emotionalMirror ? `<span class="ef-wuxing-mirror">${escapeHtml(emotionalMirror)}</span>` : ''}
      <span class="ef-wuxing-foot">
        <span class="ef-wuxing-cycles"><i class="ef-wuxing-key is-generate"></i>generating<i class="ef-wuxing-key is-control"></i>controlling</span>
        <span class="ef-wuxing-unit">${escapeHtml(unitLabel)}</span>
      </span>
      <span class="ef-wuxing-disclaimer">Traditional energetic correspondence — not a medical statement.</span>
    </figcaption>
  </figure>`;
}
function formatValue(value) {
    return Number.isInteger(value) ? String(value) : value.toFixed(1);
}
function round(value) {
    return Math.round(value * 100) / 100;
}
