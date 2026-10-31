import { heartMark } from '../premium-earth/connectionsHeartGeometry.js?v=d9f39e7';
/*
 * THE FIVE LIFE DYNAMICS PICTOGRAMS - THE GEOMETRY, IN ONE PLACE.
 *
 * Pure data and one import of no weight (the Connections heart's own geometry, a module with no imports of its own): the Year / Month / Day panel
 * (components/lifeDynamicsBlock.ts) draws them as its row icons and the main menu's Forecast card (app/premium-earth/forecastMenuArt.ts) draws the
 * very same shapes large, so there is one definition of what a brain, a briefcase, the Connections heart, a heart with a pulse and a wallet look
 * like in this application. The menu must not pull the Forecast's
 * whole module graph to get five paths, which is why they live here and the panel re-exports them. The strings are exactly what the panel
 * has always drawn.
 */
/** The five areas in the order the panel and the menu card give them. Identical to LIFE_DYNAMICS_ORDER (a test holds the two together). */
export const LIFE_ICON_ORDER = [
    'mind-focus', 'career-purpose', 'love-connection', 'health-recovery', 'money-resources',
];
/*
 * The five icons of the approved design, drawn so no device font decides how a theme looks:
 * a brain, a briefcase, the Connections heart (two cards that make one heart), a heart with a pulse, a wallet. Line icons in the
 * panel's own accent. (The heart with a pulse is the design's icon for rhythm and recovery; it says
 * nothing medical, and neither does any word beside it.)
 */
/*
 * LINE HIERARCHY (V2.1): EVERY PICTOGRAM HAS AN OUTER LINE AND AN INNER ONE. The outer silhouette carries the icon at full strength; what is drawn inside it (a fold, a seam, a clasp, a pulse,
 * a trace) is the same line, one step fainter (stroke-opacity, so it takes the line's colour, weight and glow wherever the icon is drawn: the menu card's halo and line layers and the
 * panels' rows alike - which is why the hierarchy lives here, in the shared geometry, and not in either stylesheet). Three steps, by how much of the silhouette a detail is:
 *   INNER_LINE_OPACITY      what is plainly inside the shape: the brain's centre line and folds, the briefcase's seam and clasp, the wallet's clasp
 *   WALLET_FLAP_OPACITY     the wallet's flap, which stands above the body and so is part of its profile: only a little fainter than the body it sits behind
 *   LOVE_TRACE_OPACITY, HEALTH_PULSE_OPACITY   the Connections cards inside their heart (the family's benchmark) and the pulse inside the Health heart (the approved V2.1 value)
 */
const INNER_LINE_OPACITY = 0.45;
const WALLET_FLAP_OPACITY = 0.65;
/** The brain: each lobe's contour is OPEN along its straight side (it used to close with a Z), and that shared centre line is drawn once, as an inner line. The shape is the same. */
const BRAIN_LOBE = 'M12 5.2A3 3 0 0 0 7.4 6.3 2.8 2.8 0 0 0 4.7 10.4 2.8 2.8 0 0 0 6 14.9 3.1 3.1 0 0 0 9.2 18.5 2.7 2.7 0 0 0 12 18.1';
const BRAIN_SPLIT = 'M12 5.2V18.1';
const BRAIN_FOLD = 'M9.9 9.3c-1.4 0-2.4 1-2.6 2.2M8.7 14.5c1.3.2 2.4-.4 3-1.5';
/*
 * LOVE & CONNECTION: THE CONNECTIONS HEART, FINISHED. Not drawn here: the outline and the two cards come from connectionsHeartGeometry.ts
 * (heartMark), the very figures the Connections menu card's animation joins into a heart, drawn at LOVE_MARK_SCALE of that card's size in this
 * 24-unit box. The outline is the heart; the two cards are fainter traces inside it (stroke-opacity, so they take the line's colour and weight
 * wherever the icon is drawn), the quiet record that two cards made it. It is the one icon in the set of two parts, and the only one that is
 * not an object from the world: it is this application's own symbol for a connection.
 */
const LOVE_MARK_SCALE = 0.5;
const LOVE_TRACE_OPACITY = 0.3;
function loveConnectionIcon() {
    const mark = heartMark(24, LOVE_MARK_SCALE);
    const trace = mark.cards.map((card) => `<rect x="${+(-card.width / 2).toFixed(2)}" y="${+(-card.height / 2).toFixed(2)}" width="${card.width}" `
        + `height="${card.height}" rx="${card.radius}" transform="translate(${card.cx} ${card.cy}) rotate(${card.angle})" stroke-opacity="${LOVE_TRACE_OPACITY}"/>`).join('');
    return `<svg viewBox="0 0 24 24"><path d="${mark.outline}"/>${trace}</svg>`;
}
/*
 * HEALTH & RECOVERY: THE HEART WITH A PULSE (V2.1 micro-revision: a softer tip, a quieter pulse). The heart is what it was - the same lobes, the same two sides, the same
 * 4.4 / 19.6 width - except at the bottom: the old needle point (the two sides meeting at (12, 20.3)) is trimmed where each side is 1.4 units from it (the sides are split at
 * t = 0.25, so they are the old curves, not redrawn) and the two cut ends are joined by one small quadratic whose control point is the old tip, so the heart still tapers to a
 * single lowest point but that point is rounded. The pulse line keeps its path; its stroke-opacity (which, like the Love heart's traces, takes the line's colour, weight and
 * glow wherever the icon is drawn) is lowered so that the silhouette reads first and the pulse second.
 */
const HEALTH_HEART = 'M10.81 19.54C8.68 18.05 4.4 14.53 4.4 10.1a4.3 4.3 0 0 1 7.6-2.7 4.3 4.3 0 0 1 7.6 2.7C19.6 14.53 15.33 18.05 13.19 19.54Q12 20.3 10.81 19.54z';
const HEALTH_PULSE = 'M3.2 12.2h4.2l1.6-2.9 2.3 5.6 1.7-2.7h6.6';
const HEALTH_PULSE_OPACITY = 0.55;
export const LIFE_ICONS = {
    'mind-focus': `<svg viewBox="0 0 24 24"><path d="${BRAIN_LOBE}"/><path d="${BRAIN_LOBE}" transform="matrix(-1 0 0 1 24 0)"/>`
        + `<path d="${BRAIN_SPLIT}" stroke-opacity="${INNER_LINE_OPACITY}"/>`
        + `<path d="${BRAIN_FOLD}" stroke-opacity="${INNER_LINE_OPACITY}"/><path d="${BRAIN_FOLD}" stroke-opacity="${INNER_LINE_OPACITY}" transform="matrix(-1 0 0 1 24 0)"/></svg>`,
    'career-purpose': '<svg viewBox="0 0 24 24"><rect x="3" y="7.6" width="18" height="12" rx="2.3"/>'
        + '<path d="M9 7.6V6A1.8 1.8 0 0 1 10.8 4.2h2.4A1.8 1.8 0 0 1 15 6v1.6"/>'
        + `<path d="M3 12.6h18" stroke-opacity="${INNER_LINE_OPACITY}"/><path d="M10.4 12.6v1.7h3.2v-1.7" stroke-opacity="${INNER_LINE_OPACITY}"/></svg>`,
    'love-connection': loveConnectionIcon(),
    'health-recovery': `<svg viewBox="0 0 24 24"><path d="${HEALTH_HEART}"/>`
        + `<path d="${HEALTH_PULSE}" stroke-opacity="${HEALTH_PULSE_OPACITY}"/></svg>`,
    'money-resources': `<svg viewBox="0 0 24 24"><path d="M5.2 8.1V7.4A2.4 2.4 0 0 1 7.6 5H16.4A2.4 2.4 0 0 1 18.8 7.4V8.1" stroke-opacity="${WALLET_FLAP_OPACITY}"/><rect x="3.3" y="8" width="17.4" height="11.6" rx="2.5"/>`
        + `<path d="M16.1 13.9h4.6v-3.1h-4.6a1.55 1.55 0 0 0 0 3.1z" stroke-opacity="${INNER_LINE_OPACITY}"/></svg>`,
};
