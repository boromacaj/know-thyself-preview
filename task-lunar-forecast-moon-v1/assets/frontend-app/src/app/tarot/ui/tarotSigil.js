/*
 * THE TAROT CENTRAL SIGIL: FIVE TAROT CARDS, ONE EYE, ONE CIRCLE
 * ----------------------------------------------------------------
 * The Tarot's own mark at the centre of the Earth, the way the other pillars have theirs. Pure: geometry, markup and stylesheet are computed here and nowhere else;
 * where it stands is the hero's (tarotHero.ts writes --th-sigil-d, tarotHeroPlacement.ts writes --ko-cx / --ko-cy from the Earth's own disc), so it is centred on the
 * planet by construction and follows it.
 *
 *   OUTER CIRCLE            one luminous ring round everything, with FIVE identical four-point markers on it, 72 degrees apart, over a faint dark veil of the disc;
 *                           it turns COUNTER-clockwise, slowly (the markers with it)
 *   ORBIT                   one fine dotted orbit at the radius of the cards' stars (the cards' track); it turns with the cards, and is hidden beneath every card
 *                           (a mask with one soft hole per card), so it shows in the gaps only
 *     FIVE CARDS            five identical Tarot cards - the real 5:8 card, drawn as a rounded outline with one fine inset line, four corner marks each in a small crescent, and a
 *                           four-point star at its middle -
 *                           laid out like the petals of a flower, one pointing straight up, 72 degrees apart, every one the same distance from the centre
 *                           (they ROTATE, slowly, as one layer)
 *     FIVE GLINTS           a small four-point glint between every two cards, just outside the orbit, each at the end of a line of fine dots running out from the eye (they turn with the cards)
 *       THE EYE             a double ring on a dark well, a few fine dots, and inside it a vertical lens with a narrow slit (fixed; it BLINKS now and then and never moves)
 *
 * THE LOOK (V3, matched to the owner's reference by pixel sampling): warm pink-ivory strokes (not gold), a pearl-lavender glow, richer luminous card borders. NO arrows, no
 * chevrons, no pentagram lines, no text: the turning says which way.
 *
 * It is a design reference rebuilt as vector: nothing here is a picture of the reference. The cards are the application's card (aspect 5:8, from the hero's plan),
 * never an invented proportion, so the mark says "five Tarot cards" and not "five petals".
 *
 * FOUR LAYERS, each its own element, so that what moves is moved by the compositor (a transform on an element, not on a part of a drawing):
 *   ring    turns COUNTER-clockwise (one revolution in TAROT_SIGIL_RING_TURN_S seconds); the circle and the veil are round, so only its five markers show it
 *   cards   turns CLOCKWISE (one revolution in TAROT_SIGIL_TURN_S seconds, linear, forever)
 *   eye     fixed (the double ring and its four ticks)
 *   lens    fixed in place, closes and opens (scaleY) in TAROT_SIGIL_BLINK_MS, a few times in a long cycle at uneven gaps
 * It takes no tap, is not focusable and says nothing to a screen reader.
 */
import { TAROT_HERO_CARD_ASPECT } from '../../premium-earth/ambient/tarotHeroFraming.js';
/** The drawing's box: 200 x 200 units, centre at (100, 100). Every layer is drawn in it and is the same size, so the layers register exactly. */
export const TAROT_SIGIL_VIEW = 200;
export const TAROT_SIGIL_CENTRE = 100;
/** Exactly five cards, a full turn apart in fifths: 72 degrees. */
export const TAROT_SIGIL_CARDS = 5;
export const TAROT_SIGIL_STEP_DEGREES = 360 / TAROT_SIGIL_CARDS;
/** The ONE outer circle. */
export const TAROT_SIGIL_OUTER_RADIUS = 96;
/** The eye's double ring (outer and inner radius) and the lens inside it. */
export const TAROT_SIGIL_EYE_RING_OUTER = 25;
export const TAROT_SIGIL_EYE_RING_INNER = 21;
export const TAROT_SIGIL_LENS_HEIGHT = 39;
export const TAROT_SIGIL_LENS_BULGE = 13;
export const TAROT_SIGIL_SLIT_HEIGHT = 26;
export const TAROT_SIGIL_SLIT_WIDTH = 2.3;
/** A card: its width; its height is the application's own card (aspect 5:8 -> 1.6); its corner; how far its CENTRE is from the sigil's centre. */
export const TAROT_SIGIL_CARD_WIDTH = 37;
export const TAROT_SIGIL_CARD_ASPECT = TAROT_HERO_CARD_ASPECT;
export const TAROT_SIGIL_CARD_HEIGHT = TAROT_SIGIL_CARD_WIDTH * TAROT_SIGIL_CARD_ASPECT;
export const TAROT_SIGIL_CARD_RADIUS = TAROT_SIGIL_CARD_WIDTH * 0.12;
export const TAROT_SIGIL_CARD_CENTRE_DISTANCE = 58;
/** The one fine inset line and the four corner marks, as shares of a card's width. */
export const TAROT_SIGIL_CARD_INSET = 0.1;
export const TAROT_SIGIL_CARD_DOT_RADIUS = 1.35;
/**
 * How large it is: the OUTER CIRCLE is this share of the Earth's visible diameter (the hero's plan gives the diameter) - 1: the circle IS the Earth's disc / orbit, it neither floats
 * inside it nor reaches past it. The drawing's box is a little wider than its circle (the circle's radius is 96 of 100), so the box is the circle's diameter over that. Within these bounds, CSS px.
 */
export const TAROT_SIGIL_CIRCLE_OF_EARTH = 1;
export const TAROT_SIGIL_MIN_DIAMETER = 64;
export const TAROT_SIGIL_MAX_DIAMETER = 560;
/** The soft blur under each card: how far it spreads (a Gaussian's deviation, in drawing units), and the strength of its halo and of its frosted fill. */
export const TAROT_SIGIL_GLOW_BLUR = 3;
export const TAROT_SIGIL_GLOW_HALO_WIDTH = 2.8;
export const TAROT_SIGIL_GLOW_OUTSET = 0.9;
export const TAROT_SIGIL_GLOW_HALO_OPACITY = 0.42;
export const TAROT_SIGIL_GLOW_FILL_OPACITY = 0.13;
/**
 * THE TONE (r, g, b), sampled from the owner's reference: the stroke is a warm pink-ivory (the reference's lines measure about 250, 241, 226 at their core and 232, 211, 225 at their
 * edge: a pearl white with a rose cast), the glow a pearl-lavender (its halo reads about 180, 172, 190 over the dark Earth). Never yellow, brass or orange. Its own tokens: the hero's
 * --th-gold is not used.
 */
export const TAROT_SIGIL_TONE = '250, 234, 236';
export const TAROT_SIGIL_TONE_HALO = '214, 190, 228';
/** The veil behind everything (a very faint dark navy over the disc, so the light lines read on the bright Earth) and the well behind the eye. */
export const TAROT_SIGIL_VEIL = '8, 12, 34';
export const TAROT_SIGIL_VEIL_OPACITY = 0.2;
export const TAROT_SIGIL_EYE_WELL_OPACITY = 0.42;
/**
 * The fine dotted orbit passes through the CENTRE of the four-point star in every card. The stars are at the centre of their cards, so the orbit's radius IS the cards' centre distance -
 * derived from it, never restated: the same circle crosses all five stars, to the pixel. (The stars do not move to meet the orbit; the orbit is put where the stars are.)
 */
export const TAROT_SIGIL_ORBIT_RADIUS = TAROT_SIGIL_CARD_CENTRE_DISTANCE;
/** The five markers on the outer circle (identical, evenly spaced, centred on the circle's path) and their size. */
export const TAROT_SIGIL_MARKERS = 5;
export const TAROT_SIGIL_MARKER_SIZE = 3.6;
/** The glints between the cards stand this far outside the orbit, and the dotted spokes end this far inside it (they keep the relation they had to the orbit). */
export const TAROT_SIGIL_GLINT_SIZE = 2.7;
export const TAROT_SIGIL_GLINT_RADIUS = TAROT_SIGIL_ORBIT_RADIUS + 3;
/** The dotted spokes: from where the cards' corners have parted enough to leave room, to just short of the orbit - one between every two cards. */
export const TAROT_SIGIL_SPOKE_FROM = 37;
export const TAROT_SIGIL_SPOKE_TO = TAROT_SIGIL_ORBIT_RADIUS - 3;
/** The orbit is hidden beneath each card: a mask with one soft hole per card (the card's shape, a little out, feathered). Drawing units. */
export const TAROT_SIGIL_ORBIT_MASK_ID = 'th-sigil-orbit-mask';
export const TAROT_SIGIL_ORBIT_FEATHER_ID = 'th-sigil-orbit-feather';
export const TAROT_SIGIL_ORBIT_HOLE_OUTSET = 1.4;
export const TAROT_SIGIL_ORBIT_FEATHER = 0.9;
/**
 * LINE WEIGHT HIERARCHY (CSS px, non-scaling). PRIMARY outlines - each card's outline and inset line, the eye's two rings and its lens contour - are strong (they read in the family of the
 * menu pictograms' glowing lines); every SECONDARY detail stays as fine as it was: stars, crescents, dots, ticks, glints, spokes, the dotted orbit and the outer circle.
 */
export const TAROT_SIGIL_STROKE = Object.freeze({
    primary: Object.freeze({ cardFrame: 2.4, cardInset: 1.3, eyeRing: 2, eyeRingInner: 1.3, lens: 1.4 }),
    secondary: Object.freeze({ circle: 1.2, orbit: 1.5, spoke: 1.1, marker: 0.5, glint: 0.5, cardCrescent: 0.8, cardDot: 0.7, cardStar: 0.5, tick: 0.8 }),
});
/** A card's own star (its half-size as a share of the card's width) and the crescent that cradles each corner mark (its radius, in drawing units). */
export const TAROT_SIGIL_CARD_STAR = 0.125;
export const TAROT_SIGIL_CARD_CRESCENT = 3.1;
/** The dots between the eye's inner ring and its lens: how far from the centre, at which angles (degrees clockwise from straight up). */
export const TAROT_SIGIL_EYE_DOT_RADIUS = 17.5;
export const TAROT_SIGIL_EYE_DOT_ANGLES = Object.freeze([45, 90, 135, 225, 270, 315]);
export const TAROT_SIGIL_GLOW_FILTER_ID = 'th-sigil-card-blur';
/** MOTION. The cards turn once in this many seconds (slow, contemplative); the eye blinks for this long, at the marks of a cycle of this length. */
export const TAROT_SIGIL_TURN_S = 24;
/** The outer ring turns the other way, slower: one counter-clockwise revolution in this many seconds (not a multiple of the cards' 24, so the two never lock together). */
export const TAROT_SIGIL_RING_TURN_S = 42;
export const TAROT_SIGIL_BLINK_MS = 240;
export const TAROT_SIGIL_BLINK_CYCLE_S = 18.3;
/** Where in the cycle (share of it) a blink begins: three in 18.3 s, at gaps of 6.6, 4.2 and 7.5 s - not a metronome. */
export const TAROT_SIGIL_BLINK_AT = Object.freeze([0.24, 0.6, 0.83]);
/** The lens, closed: its height as a share of its open height. */
export const TAROT_SIGIL_BLINK_CLOSED = 0.08;
/** The sigil's geometry, in drawing units. Pure. */
export function tarotSigilGeometry() {
    const half = TAROT_SIGIL_CARD_HEIGHT / 2;
    return {
        view: TAROT_SIGIL_VIEW,
        centre: TAROT_SIGIL_CENTRE,
        outerRadius: TAROT_SIGIL_OUTER_RADIUS,
        eyeRingOuter: TAROT_SIGIL_EYE_RING_OUTER,
        eyeRingInner: TAROT_SIGIL_EYE_RING_INNER,
        cardWidth: TAROT_SIGIL_CARD_WIDTH,
        cardHeight: TAROT_SIGIL_CARD_HEIGHT,
        cardAspect: TAROT_SIGIL_CARD_ASPECT,
        cardRadius: TAROT_SIGIL_CARD_RADIUS,
        cardCentreDistance: TAROT_SIGIL_CARD_CENTRE_DISTANCE,
        rotations: Array.from({ length: TAROT_SIGIL_CARDS }, (_, index) => index * TAROT_SIGIL_STEP_DEGREES),
        cardInnerEdge: TAROT_SIGIL_CARD_CENTRE_DISTANCE - half,
        cardOuterEdge: TAROT_SIGIL_CARD_CENTRE_DISTANCE + half,
        cardFarthestCorner: Math.hypot(TAROT_SIGIL_CARD_CENTRE_DISTANCE + half, TAROT_SIGIL_CARD_WIDTH / 2),
    };
}
/** The sigil's diameter (its drawing's box) on a screen where the Earth is this wide (CSS px): its outer circle is TAROT_SIGIL_CIRCLE_OF_EARTH of the Earth's. */
export function tarotSigilDiameter(earthDiameter) {
    const wanted = (Math.max(0, earthDiameter) * TAROT_SIGIL_CIRCLE_OF_EARTH) / ((2 * TAROT_SIGIL_OUTER_RADIUS) / TAROT_SIGIL_VIEW);
    return Math.min(TAROT_SIGIL_MAX_DIAMETER, Math.max(TAROT_SIGIL_MIN_DIAMETER, wanted));
}
const n = (value) => String(Math.round(value * 1000) / 1000);
/** A four-point glint: a small star with gently concave sides, centred on (x, y), reaching `size` in each of the four directions. */
function glintPath(x, y, size) {
    const k = size * 0.2;
    return `M${n(x)} ${n(y - size)} Q${n(x + k)} ${n(y - k)} ${n(x + size)} ${n(y)} Q${n(x + k)} ${n(y + k)} ${n(x)} ${n(y + size)} Q${n(x - k)} ${n(y + k)} ${n(x - size)} ${n(y)} Q${n(x - k)} ${n(y - k)} ${n(x)} ${n(y - size)}Z`;
}
/** The corner mark's crescent: a quarter circle round the mark, on the side of the card's corner (sx, sy are -1 or 1). */
function crescentPath(cx, cy, r, sx, sy) {
    const sweep = sx * sy > 0 ? 1 : 0;
    return `M${n(cx + sx * r)} ${n(cy)} A${n(r)} ${n(r)} 0 0 ${sweep} ${n(cx)} ${n(cy + sy * r)}`;
}
/** One card, drawn upright with its centre straight above the sigil's centre: an outline, one fine inset line, four corner marks in their crescents, a star at its middle. */
function cardMarkup(rotation, g) {
    const x = g.centre - g.cardWidth / 2;
    const y = g.centre - g.cardCentreDistance - g.cardHeight / 2;
    const inset = g.cardWidth * TAROT_SIGIL_CARD_INSET;
    const dotInset = inset + TAROT_SIGIL_CARD_DOT_RADIUS * 2.2;
    const dots = [[x + dotInset, y + dotInset], [x + g.cardWidth - dotInset, y + dotInset], [x + dotInset, y + g.cardHeight - dotInset], [x + g.cardWidth - dotInset, y + g.cardHeight - dotInset]]
        .map(([cx, cy]) => `<circle class="th-sigil-card-dot" cx="${n(cx)}" cy="${n(cy)}" r="${TAROT_SIGIL_CARD_DOT_RADIUS}"/>`).join('');
    const crescents = [[x + dotInset, y + dotInset, -1, -1], [x + g.cardWidth - dotInset, y + dotInset, 1, -1], [x + dotInset, y + g.cardHeight - dotInset, -1, 1], [x + g.cardWidth - dotInset, y + g.cardHeight - dotInset, 1, 1]]
        .map(([cx, cy, sx, sy]) => `<path class="th-sigil-card-crescent" d="${crescentPath(cx, cy, TAROT_SIGIL_CARD_CRESCENT, sx, sy)}"/>`).join('');
    const star = `<path class="th-sigil-card-star" d="${glintPath(g.centre, y + g.cardHeight / 2, g.cardWidth * TAROT_SIGIL_CARD_STAR)}"/>`;
    /* UNDER the crisp outline: this card's own soft blur - a frosted tint the card's size and a halo round its edge, both blurred - so the card separates from the Earth's texture and
       glows a little, without touching the line itself (the outline is drawn after it, sharp) and without joining its neighbours (a small blur, a tight halo). */
    const out = TAROT_SIGIL_GLOW_OUTSET;
    const glow = `<g class="th-sigil-card-glow" filter="url(#${TAROT_SIGIL_GLOW_FILTER_ID})">`
        + `<rect class="th-sigil-glow-fill" x="${n(x)}" y="${n(y)}" width="${n(g.cardWidth)}" height="${n(g.cardHeight)}" rx="${n(g.cardRadius)}"/>`
        + `<rect class="th-sigil-glow-halo" x="${n(x - out)}" y="${n(y - out)}" width="${n(g.cardWidth + 2 * out)}" height="${n(g.cardHeight + 2 * out)}" rx="${n(g.cardRadius + out)}"/></g>`;
    return `<g class="th-sigil-card" data-rotation="${n(rotation)}" transform="rotate(${n(rotation)} ${g.centre} ${g.centre})">`
        + glow
        + `<rect class="th-sigil-card-frame" x="${n(x)}" y="${n(y)}" width="${n(g.cardWidth)}" height="${n(g.cardHeight)}" rx="${n(g.cardRadius)}"/>`
        + `<rect class="th-sigil-card-inset" x="${n(x + inset)}" y="${n(y + inset)}" width="${n(g.cardWidth - 2 * inset)}" height="${n(g.cardHeight - 2 * inset)}" rx="${n(g.cardRadius * 0.55)}"/>`
        + `${crescents}${dots}${star}</g>`;
}
const layer = (name, inner) => `<svg class="th-sigil-layer th-sigil-${name}" viewBox="0 0 ${TAROT_SIGIL_VIEW} ${TAROT_SIGIL_VIEW}" aria-hidden="true" focusable="false">${inner}</svg>`;
/** The whole sigil as markup: a wrapper of four registered layers. No text, no title, no control. */
export function tarotSigilMarkup() {
    const g = tarotSigilGeometry();
    const c = g.centre;
    /* five identical markers on the circle's path, 72 degrees apart (the first straight up) */
    const markers = Array.from({ length: TAROT_SIGIL_MARKERS }, (_, index) => index * TAROT_SIGIL_STEP_DEGREES).map((degrees) => `<path class="th-sigil-marker" d="${glintPath(c, c - g.outerRadius, TAROT_SIGIL_MARKER_SIZE)}" transform="rotate(${n(degrees)} ${c} ${c})"/>`).join('');
    const ring = `<circle class="th-sigil-veil" cx="${c}" cy="${c}" r="${g.outerRadius}"/><circle class="th-sigil-circle" cx="${c}" cy="${c}" r="${g.outerRadius}"/>${markers}`;
    const blur = `<defs><filter id="${TAROT_SIGIL_GLOW_FILTER_ID}" x="-35%" y="-25%" width="170%" height="150%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="${TAROT_SIGIL_GLOW_BLUR}"/></filter></defs>`;
    /* five glints between the cards, on the orbit, turning with them */
    const glints = g.rotations.map((rotation) => `<path class="th-sigil-glint" d="${glintPath(c, c - TAROT_SIGIL_GLINT_RADIUS, TAROT_SIGIL_GLINT_SIZE)}" transform="rotate(${n(rotation + TAROT_SIGIL_STEP_DEGREES / 2)} ${c} ${c})"/>`).join('');
    const spokes = g.rotations.map((rotation) => `<path class="th-sigil-spoke" d="M${c} ${n(c - TAROT_SIGIL_SPOKE_FROM)} V${n(c - TAROT_SIGIL_SPOKE_TO)}" transform="rotate(${n(rotation + TAROT_SIGIL_STEP_DEGREES / 2)} ${c} ${c})"/>`).join('');
    /* the dotted orbit sits in the turning layer, UNDER the cards, and a mask hides it beneath each card: white everywhere, one soft black hole per card (the card's own shape, a little out, feathered) */
    const holes = g.rotations.map((rotation) => {
        const out = TAROT_SIGIL_ORBIT_HOLE_OUTSET;
        return `<rect class="th-sigil-orbit-hole" x="${n(c - g.cardWidth / 2 - out)}" y="${n(c - g.cardCentreDistance - g.cardHeight / 2 - out)}" width="${n(g.cardWidth + 2 * out)}" height="${n(g.cardHeight + 2 * out)}" rx="${n(g.cardRadius + out)}" transform="rotate(${n(rotation)} ${c} ${c})" filter="url(#${TAROT_SIGIL_ORBIT_FEATHER_ID})"/>`;
    }).join('');
    const mask = `<defs><filter id="${TAROT_SIGIL_ORBIT_FEATHER_ID}" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="${TAROT_SIGIL_ORBIT_FEATHER}"/></filter>`
        + `<mask id="${TAROT_SIGIL_ORBIT_MASK_ID}" maskUnits="userSpaceOnUse" x="-20" y="-20" width="${TAROT_SIGIL_VIEW + 40}" height="${TAROT_SIGIL_VIEW + 40}"><rect class="th-sigil-orbit-base" x="-20" y="-20" width="${TAROT_SIGIL_VIEW + 40}" height="${TAROT_SIGIL_VIEW + 40}"/>${holes}</mask></defs>`;
    const orbit = `<circle class="th-sigil-orbit" cx="${c}" cy="${c}" r="${TAROT_SIGIL_ORBIT_RADIUS}" mask="url(#${TAROT_SIGIL_ORBIT_MASK_ID})"/>`;
    const cards = blur + mask + orbit + g.rotations.map((rotation) => cardMarkup(rotation, g)).join('') + spokes + glints;
    /* the eye's double ring and four ticks joining them at the four quarters */
    const ticks = [0, 90, 180, 270].map((degrees) => `<path class="th-sigil-tick" d="M${c} ${n(c - g.eyeRingInner)} V${n(c - g.eyeRingOuter)}" transform="rotate(${degrees} ${c} ${c})"/>`).join('');
    const eyeDots = TAROT_SIGIL_EYE_DOT_ANGLES.map((degrees) => { const a = (degrees * Math.PI) / 180; return `<circle class="th-sigil-eye-dot" cx="${n(c + TAROT_SIGIL_EYE_DOT_RADIUS * Math.sin(a))}" cy="${n(c - TAROT_SIGIL_EYE_DOT_RADIUS * Math.cos(a))}" r="0.75"/>`; }).join('');
    const eye = `<circle class="th-sigil-eye-well" cx="${c}" cy="${c}" r="${g.eyeRingInner}"/><circle class="th-sigil-eye-ring" cx="${c}" cy="${c}" r="${g.eyeRingOuter}"/><circle class="th-sigil-eye-ring is-inner" cx="${c}" cy="${c}" r="${g.eyeRingInner}"/>${ticks}${eyeDots}`;
    /* the lens: a vertical almond with a narrow dark slit in it */
    const top = c - TAROT_SIGIL_LENS_HEIGHT / 2;
    const bottom = c + TAROT_SIGIL_LENS_HEIGHT / 2;
    const q = TAROT_SIGIL_LENS_HEIGHT * 0.17;
    const bulge = TAROT_SIGIL_LENS_BULGE;
    const lens = `<path class="th-sigil-lens-shape" d="M${c} ${n(top)} C${n(c + bulge)} ${n(top + q)} ${n(c + bulge)} ${n(bottom - q)} ${c} ${n(bottom)} C${n(c - bulge)} ${n(bottom - q)} ${n(c - bulge)} ${n(top + q)} ${c} ${n(top)}Z"/>`
        + `<path class="th-sigil-slit" d="M${c} ${n(c - TAROT_SIGIL_SLIT_HEIGHT / 2)} L${n(c + TAROT_SIGIL_SLIT_WIDTH)} ${c} L${c} ${n(c + TAROT_SIGIL_SLIT_HEIGHT / 2)} L${n(c - TAROT_SIGIL_SLIT_WIDTH)} ${c}Z"/>`;
    return `<div class="th-sigil" data-th-sigil aria-hidden="true">${layer('ring', ring)}${layer('cards', cards)}${layer('eye', eye)}${layer('lens', lens)}</div>`;
}
/**
 * The sigil's stylesheet. `H` is the hero's own selector (the hero's stylesheet passes it, so the rules are doubled on the id like the rest of the hero's).
 * Transform-only motion on whole elements: the compositor turns the cards and closes the lens; nothing is measured or laid out while it runs.
 */
export function tarotSigilCss(H) {
    const blink = TAROT_SIGIL_BLINK_AT.map((at) => {
        const pct = (value) => `${(Math.round(value * 10000) / 100).toFixed(2)}%`;
        const half = (TAROT_SIGIL_BLINK_MS / 1000) / TAROT_SIGIL_BLINK_CYCLE_S / 2;
        return `${pct(at)} { transform: scaleY(1); } ${pct(at + half)} { transform: scaleY(${TAROT_SIGIL_BLINK_CLOSED}); } ${pct(at + 2 * half)} { transform: scaleY(1); }`;
    }).join(' ');
    return `
    /* ------------------------------------------------------------ the Tarot's central sigil
       Five Tarot cards round an eye, in one circle (tarotSigil.ts). Pink-ivory lines with a pearl-lavender glow (sampled from the owner's reference), fine strokes that stay fine at
       any size (non-scaling), a soft luminous halo under each card. It stands at the Earth's centre - the hero's own --ko-cx / --ko-cy, from the planet's disc - and is the first thing
       drawn in the hero, so the cards of the row pass over it. It takes no tap. */
    ${H} .th-sigil {
      position: absolute; display: block; pointer-events: none; z-index: 0;
      width: var(--th-sigil-d); height: var(--th-sigil-d);
      left: calc(var(--ko-cx, 50%) - var(--th-sigil-d) / 2);
      top: calc(var(--ko-cy, 50%) - var(--th-sigil-d) / 2);
      --th-sigil-tone: ${TAROT_SIGIL_TONE}; --th-sigil-halo: ${TAROT_SIGIL_TONE_HALO};
      color: rgb(var(--th-sigil-tone));
    }
    ${H} .th-sigil-layer { position: absolute; inset: 0; width: 100%; height: 100%; display: block; overflow: visible; pointer-events: none; }
    ${H} .th-sigil-layer * { fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
    ${H} .th-sigil-ring { opacity: 0.95; filter: drop-shadow(0 0 6px rgba(var(--th-sigil-halo), 0.55)); will-change: transform; animation: th-sigil-turn-back ${TAROT_SIGIL_RING_TURN_S}s linear infinite; }
    ${H} .th-sigil-veil { fill: rgba(${TAROT_SIGIL_VEIL}, ${TAROT_SIGIL_VEIL_OPACITY}); stroke: none; }
    ${H} .th-sigil-circle { stroke-width: ${TAROT_SIGIL_STROKE.secondary.circle}px; }
    ${H} .th-sigil-orbit { stroke-width: ${TAROT_SIGIL_STROKE.secondary.orbit}px; stroke-dasharray: 0.01 4.2; opacity: 0.7; }
    /* the orbit's mask: white everywhere, black (a soft hole) under each card - mask paint, not stroke */
    ${H} .th-sigil-orbit-base { fill: white; stroke: none; }
    ${H} .th-sigil-orbit-hole { fill: black; stroke: none; }
    ${H} .th-sigil-marker { fill: currentColor; stroke-width: ${TAROT_SIGIL_STROKE.secondary.marker}px; }
    ${H} .th-sigil-cards { opacity: 0.97; filter: drop-shadow(0 0 6px rgba(var(--th-sigil-halo), 0.5)); will-change: transform; animation: th-sigil-turn ${TAROT_SIGIL_TURN_S}s linear infinite; }
    ${H} .th-sigil-card-frame { stroke-width: ${TAROT_SIGIL_STROKE.primary.cardFrame}px; }
    ${H} .th-sigil-card-inset { stroke-width: ${TAROT_SIGIL_STROKE.primary.cardInset}px; opacity: 0.9; }
    ${H} .th-sigil-card-crescent { stroke-width: ${TAROT_SIGIL_STROKE.secondary.cardCrescent}px; opacity: 0.85; }
    ${H} .th-sigil-card-dot { stroke-width: ${TAROT_SIGIL_STROKE.secondary.cardDot}px; opacity: 0.9; }
    ${H} .th-sigil-card-star { fill: currentColor; stroke-width: ${TAROT_SIGIL_STROKE.secondary.cardStar}px; opacity: 0.92; }
    ${H} .th-sigil-spoke { stroke-width: ${TAROT_SIGIL_STROKE.secondary.spoke}px; stroke-dasharray: 0.01 4.2; opacity: 0.6; }
    ${H} .th-sigil-glint { fill: currentColor; stroke-width: ${TAROT_SIGIL_STROKE.secondary.glint}px; opacity: 0.9; }
    /* the blur under each card: drawn once into the layer (a filter on a shape inside the turning layer is rasterised with it, not per frame) */
    ${H} .th-sigil-glow-fill { fill: rgba(var(--th-sigil-halo), ${TAROT_SIGIL_GLOW_FILL_OPACITY}); stroke: none; }
    ${H} .th-sigil-glow-halo { fill: none; stroke: rgba(var(--th-sigil-halo), ${TAROT_SIGIL_GLOW_HALO_OPACITY}); stroke-width: ${TAROT_SIGIL_GLOW_HALO_WIDTH}px; vector-effect: none; }
    ${H} .th-sigil-eye { opacity: 0.97; filter: drop-shadow(0 0 6px rgba(var(--th-sigil-halo), 0.5)); }
    ${H} .th-sigil-eye-well { fill: rgba(${TAROT_SIGIL_VEIL}, ${TAROT_SIGIL_EYE_WELL_OPACITY}); stroke: none; }
    ${H} .th-sigil-eye-ring { stroke-width: ${TAROT_SIGIL_STROKE.primary.eyeRing}px; }
    ${H} .th-sigil-eye-ring.is-inner { stroke-width: ${TAROT_SIGIL_STROKE.primary.eyeRingInner}px; opacity: 0.88; }
    ${H} .th-sigil-tick { stroke-width: ${TAROT_SIGIL_STROKE.secondary.tick}px; opacity: 0.8; }
    ${H} .th-sigil-eye-dot { fill: currentColor; stroke: none; opacity: 0.85; }
    ${H} .th-sigil-lens { will-change: transform; animation: th-sigil-blink ${TAROT_SIGIL_BLINK_CYCLE_S}s linear infinite; filter: drop-shadow(0 0 5px rgba(var(--th-sigil-halo), 0.6)); }
    ${H} .th-sigil-lens-shape { fill: currentColor; fill-opacity: 0.96; stroke-width: ${TAROT_SIGIL_STROKE.primary.lens}px; }
    ${H} .th-sigil-slit { fill: rgb(7, 10, 20); stroke: none; }
    /* CLOCKWISE: a positive angle turns clockwise on the screen (y points down) - from 0 to +360 degrees */
    @keyframes th-sigil-turn { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    /* COUNTER-CLOCKWISE: the outer ring turns from 0 to -360 degrees */
    @keyframes th-sigil-turn-back { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
    @keyframes th-sigil-blink { 0% { transform: scaleY(1); } ${blink} 100% { transform: scaleY(1); } }
  `;
}
/** The sigil's reduced-motion rules: it turns not and blinks not; it is whole and still. */
export function tarotSigilReducedCss(H) {
    return `${H} .th-sigil-cards, ${H} .th-sigil-ring, ${H} .th-sigil-lens { animation: none; will-change: auto; }`;
}
