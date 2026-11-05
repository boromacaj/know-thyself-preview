import { CONNECTIONS_HERO_PETAL_REACH } from '../../premium-earth/ambient/connectionsHeroFraming.js';
import { GAUGE_CIRCLE } from './orbitalGauge.js';
/**
 * THE GAUGE'S WREATH: SMALL POINTED LOTUS PETALS GROWING FROM THE GOLD CIRCLE ITSELF, BLOOMING AS IT FILLS.
 *
 * Hero V5. The gold gauge is a circle of radius 165 in a 400-unit drawing (orbitalGauge.ts). The wreath is WREATH_PETALS small petals whose bases lie ON that circle: the same circle, the same centre, so the
 * petals and the ring read as one structure and not as a second ring outside the first. Each petal is drawn once, in its own frame, pointing outward from its base (the origin, on the circle) with the circle's
 * tangent as its baseline, and is placed by a rotation about the gauge's centre; neighbouring petals share their base vertices (the half-width of the base is the half-chord of the spacing), as in the pointed
 * lotus wreath the owner supplied as reference. Thin outline, transparent interior, no fill, no filter, no glow.
 *
 * IT BLOOMS WITH THE GAUGE, ON THE GAUGE'S OWN PROGRESS. The two gold arcs rise from six o'clock on both sides, each covering `value / 100 x 180` degrees. A petal at an angular distance d from the bottom
 * is lit by `wreathLit`: nothing until the arc's front reaches it, then a smooth rise over WREATH_BAND degrees to fully open; the front is the gauge's own arc length (a little ahead of it by at most the
 * band, so that the last petal, at twelve o'clock, is fully open exactly at 100). There is no second clock: this is a pure function of the one value the reveal writes, so 20 is about a fifth of the wreath,
 * 50 about half, 82 about four fifths, 100 all of it, and a value that is not reached leaves its petals absent. The petals are placed symmetrically (one at six o'clock, one at twelve), so the two sides bloom as mirror images.
 *
 * Nothing here knows about a relationship: it draws a number between 0 and 100, a demonstration in review builds, and in production (no score) the wreath rests fully open like the mandala.
 */
export const WREATH_PETALS = 22;
/** The degrees over which a petal opens once the arc's front has reached it. */
export const WREATH_BAND = 32;
/** How the wreath's petals are shared between the independent breathing layers (V5 idle: each layer breathes at its own pace, so the petals never move in step). */
export const WREATH_PHASES = 3;
/** The petal's length, outward from the circle, and the half-width of its base: the half chord of the spacing, so that neighbours meet on the circle. */
export const PETAL_LENGTH = (CONNECTIONS_HERO_PETAL_REACH - 1) * GAUGE_CIRCLE.r;
export const PETAL_BASE_HALF = GAUGE_CIRCLE.r * Math.sin(Math.PI / WREATH_PETALS);
/** The widest half-width, just above the base: a little more than the base's, but never more than the neighbour's room at that radius. */
export const PETAL_BELLY_HALF = PETAL_BASE_HALF * 1.03;
/** The petal's outline (units of the 400-unit drawing) and its colour: thin, soft gold, quieter than the mandala's. */
export const PETAL_STROKE = 1.5;
export const PETAL_COLOUR = '#d8be7e';
export const PETAL_OPACITY = 0.82;
const num = (n) => (Math.round(n * 100) / 100).toString();
/**
 * One petal in its own frame: the origin is its base point ON the gauge circle, `outward` is -y, the base's ends lie on the circle (a little toward the centre, +y, as the circle curves away) and the outline
 * is the lotus lancet of the mandala's petals (a belly, a short ogee, a sharp tip on the axis) at wreath size.
 */
export function wreathPetalPath() {
    const w = PETAL_BASE_HALF;
    const s = PETAL_BELLY_HALF;
    const L = PETAL_LENGTH;
    const r = GAUGE_CIRCLE.r;
    const drop = r - Math.sqrt(r * r - w * w);
    const left = [
        [[-w - 0.22 * (s - w), 0.1], [-s, 0.12], [-s, 0.34]],
        [[-s, 0.6], [-0.42 * s, 0.7], [-0.16 * s, 0.86]],
        [[-0.07 * s, 0.93], [0, 0.95], [0, 1]],
    ];
    const xy = (sign, [x, y]) => `${num(sign * x)} ${num(-y * L)}`;
    const out = [`M${num(-w)} ${num(drop)}`, ...left.map((seg) => `C${seg.map((p) => xy(1, p)).join(' ')}`)];
    for (let i = left.length - 1; i >= 0; i -= 1) {
        out.push(`C${xy(-1, left[i][1])} ${xy(-1, left[i][0])} ${i === 0 ? `${num(w)} ${num(drop)}` : xy(-1, left[i - 1][2])}`);
    }
    return out.join(' ');
}
/** The petals: evenly spaced, one at twelve o'clock and one at six, mirror-symmetric about the vertical axis. */
export const WREATH = Array.from({ length: WREATH_PETALS }, (_, index) => {
    const angle = (index * 360) / WREATH_PETALS;
    const a = (angle * Math.PI) / 180;
    const { cx, cy, r } = GAUGE_CIRCLE;
    const base = { x: cx + r * Math.sin(a), y: cy - r * Math.cos(a) };
    return { index, angle, fromOrigin: Math.abs(angle - 180), base, place: `rotate(${num(angle)} ${cx} ${cy}) translate(${cx} ${num(cy - r)})`, phase: index % WREATH_PHASES };
});
const smooth = (t) => t * t * (3 - 2 * t);
/** How open petal `index` is at a value, 0 (absent) to 1 (fully open): a pure function of the gauge's value, none while the arc has not reached it. A non-finite value is the resting state, all open. */
export function wreathLit(index, value) {
    if (!Number.isFinite(value))
        return 1;
    const reach = (Math.max(0, Math.min(100, value)) / 100) * (180 + WREATH_BAND);
    return smooth(Math.max(0, Math.min(1, (reach - WREATH[index].fromOrigin) / WREATH_BAND)));
}
/** The petals' state at a value. */
export const wreathState = (value) => WREATH.map((petal) => wreathLit(petal.index, value));
/** A petal opens from its base: scale from this at the moment it appears to 1 when whole (it also fades in), so it grows out of the circle and never pops. */
export const PETAL_GROW_FROM = 0.45;
export const petalScale = (lit) => PETAL_GROW_FROM + (1 - PETAL_GROW_FROM) * lit;
/** The wreath's markup: WREATH_PHASES stacked drawings of the same 400-unit box as the gauge, the petals shared between them, each petal one group (its fixed place) holding one path (its opening). Built once. */
export function wreathMarkup(value, widthPercent) {
    const d = wreathPetalPath();
    const layers = Array.from({ length: WREATH_PHASES }, (_, phase) => {
        const petals = WREATH.filter((petal) => petal.phase === phase).map((petal) => {
            const lit = wreathLit(petal.index, value);
            return `<g transform="${petal.place}"><path class="cx-wp" data-wp="${petal.index}" d="${d}" transform="scale(${num(petalScale(lit))})" opacity="${lit < 0.005 ? 0 : num(lit * PETAL_OPACITY)}"/></g>`;
        }).join('');
        return `<div class="cx-w-phase cx-w-phase-${phase}"><svg class="cx-wreath" viewBox="0 0 400 400" focusable="false" fill="none" stroke="${PETAL_COLOUR}" stroke-width="${PETAL_STROKE}" stroke-linejoin="round">${petals}</svg></div>`;
    }).join('');
    return `<div class="cx-hero-wreath" style="width:${widthPercent.toFixed(2)}%">${layers}</div>`;
}
const last = new WeakMap();
/**
 * Sets the wreath to a value: only the petals whose opening changed are written (at any moment of a reveal that is the two or three the arc's front is passing, and after it settles, none). Returns false when
 * there is no wreath under `root`.
 */
export function applyWreath(root, value) {
    const paths = root.querySelectorAll('path.cx-wp');
    if (paths.length === 0)
        return false;
    for (const path of paths) {
        const lit = wreathLit(Number(path.dataset.wp), value);
        const signature = String(Math.round(lit * 200));
        if (last.get(path) === signature)
            continue;
        last.set(path, signature);
        path.setAttribute('transform', `scale(${num(petalScale(lit))})`);
        path.setAttribute('opacity', lit < 0.005 ? '0' : num(lit * PETAL_OPACITY));
    }
    return true;
}
