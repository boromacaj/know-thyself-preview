import { NUMERAL_FONT } from './marcellusFont.js';
import { numeralLayout } from './numeralLayout.js';
/**
 * THE COMPATIBILITY MANDALA: ONE PARAMETRIC PETAL, TURNED ABOUT A SMALL CENTRAL CIRCLE.
 *
 * The owner-approved geometry (design source: mandala-design/mandala.js, Artifact "Compatibility Mandala"), unchanged in shape and in numbers: Variant A, the pure lotus. A small central circle
 * (radius R0 = 78, small against the petals so the numeral can be large) with thin outlined, transparent petals around it; four stages of 4, 6, 8 and 10 petals (V4: it opens as a compact four-petal lotus,
 * never as two lone leaves); at the last stage a second, larger ring of petals behind the first. Fine gold outlines with a faint iridescent edge light that goes round with the angle (teal at the top, violet at the sides, rose at the foot, mirrored left
 * and right). No polygon inside the circle, no fills, no filigree, no raster: everything is paths.
 *
 * UNITS. The drawing is a square viewBox of +-VIEW around the centre; angles are degrees, 0 at twelve o'clock, clockwise.
 *
 * THE STAGES ARE VISUAL, NOT SCORING THRESHOLDS. A value 0-100 is put on the four stages (4, 6, 8 and 10 petals) so that the ten primary petals stand by PRIMARY_COMPLETE (76: `stagePosition` = value / 76 x 3), and the outer
 * ring then grows over the rest, fast at first and complete at 100 (`ringGrowth`). A high value is therefore already a nearly full mandala (the owner's reading of the first version was that 82 looked sparse beside
 * the full Pattern picture), a lower value a smaller one, and every value has a well-formed, mirror-symmetric picture. No stage boundary means anything about a relationship, and there is no approved scoring model (docs/connections/COMPATIBILITY_GAUGE_AUDIT.md).
 *
 * HOW IT TURNS. In the reveal the whole petal drawing (never the numeral) turns clockwise like a slowly opening sunflower: `applyMandala(root, value, showNumber, turn)` takes the turn in degrees, from -REVEAL_TURN_DEG
 * at the first frame to exactly 0 at the last, so the resting picture is always the upright, mirror-symmetric one and there is no loop. The turn is one more function of the reveal's single clock (hero.ts `revealTurn`).
 *
 * HOW IT GROWS. Between two stages each new petal takes a source petal of the old stage: a petal that shares its nearest old petal with a closer sibling SPLITS from it (both start on the old petal
 * and glide apart, mirror-symmetric), a petal with nothing near GROWS out of the circle, and the petals at 90 and 270 degrees never move. Every intermediate picture mirrors about both axes
 * (tests/connectionsMandala.test.mjs checks it for each transition). The outer ring grows over the last transition.
 *
 * DEPTH, WITHOUT LEAVING THE PLANE. The ten primary petals and the central circle are the foreground: a heavier line (about 31% thicker), a more saturated, brighter gold, a stronger glow. The outer ring is the
 * background layer behind them: a thinner line, a softer, paler gold, a fainter glow, and it is hidden where the primary petals cover it. Still flat, outlined and transparent: no gradient inside a petal, no shadow, no extrusion.
 *
 * THE DOM IS BUILT ONCE (`mandalaMarkup`) and only written to while the value changes (`applyMandala`): the petals are twenty `<path>`s in <defs>, each drawn three times with <use> (a wide
 * faint gold stroke, the iridescent edge, the gold line), so one `d` per petal per frame moves all three. No filter anywhere: the glow is a wider, fainter stroke, so nothing is blurred and
 * nothing is repainted expensively while the reveal runs. The outer ring is hidden behind the inner petals by a mask built from their outlines, so petal interiors stay transparent and the Earth
 * shows through.
 */
export const R0 = 78;
/** The clockwise turn the petal drawing makes during a reveal, in degrees (V4: a slow sunflower turn of 30, ending upright). */
export const REVEAL_TURN_DEG = 30;
export const VIEW = 185;
/** Petal counts of the four stages: the reveal opens on a compact lotus of four petals. */
export const MANDALA_STAGES = [4, 6, 8, 10];
const num = (n) => (Math.round(n * 100) / 100).toString();
/**
 * ONE PETAL, pointing straight up from the circle: base half-width w, belly half-width s, length L beyond the circle, and a form k from 0 (a lancet with a short ogee tip, from four petals up)
 * to 1 (a smooth almond, for the two wide petals); k is blended continuously so the form can change while the mandala grows. The base ends exactly on the circle (the circle closes the petal).
 * Each side is three cubic segments; the other side is the mirror image.
 */
export function petalPath(w, s, L, k = 0) {
    if (L < 0.5 || w < 0.5)
        return '';
    const drop = R0 - Math.sqrt(R0 * R0 - Math.min(w, R0 * 0.99) ** 2);
    const baseY = -R0 + drop;
    const mix = (a, b) => a + (b - a) * k;
    /* control points of the left side as [x, y share of L beyond the circle]; the right side is mirrored */
    const lancet = [
        [[-w - 0.22 * (s - w), 0.1], [-s, 0.12], [-s, 0.34]],
        [[-s, 0.6], [-0.42 * s, 0.7], [-0.16 * s, 0.86]],
        [[-0.07 * s, 0.93], [0, 0.95], [0, 1]],
    ];
    const almond = [
        [[-0.98 * s, 0.1], [-1.08 * s, 0.3], [-1.0 * s, 0.42]],
        [[-0.92 * s, 0.56], [-0.66 * s, 0.7], [-0.4 * s, 0.8]],
        [[-0.22 * s, 0.89], [-0.03 * s, 0.93], [0, 1]],
    ];
    const segs = lancet.map((seg, i) => seg.map((p, j) => [mix(p[0], almond[i][j][0]), mix(p[1], almond[i][j][1])]));
    const xy = (sign, [x, y]) => `${num(sign * x)} ${num(-R0 - y * L)}`;
    const left = [`M${num(-w)} ${num(baseY)}`, ...segs.map((seg) => `C${seg.map((p) => xy(1, p)).join(' ')}`)];
    const right = [];
    for (let i = segs.length - 1; i >= 0; i -= 1) {
        right.push(`C${xy(-1, segs[i][1])} ${xy(-1, segs[i][0])} ${i === 0 ? `${num(w)} ${num(baseY)}` : xy(-1, segs[i - 1][2])}`);
    }
    return [...left, ...right].join(' ');
}
/** The same outline closed through the centre: used only as a mask hole, so strokes of the layer behind are hidden while the interior stays transparent. */
export function petalHole(w, s, L, k = 0) {
    const d = petalPath(w, s, L, k);
    return d ? `${d}L0 0Z` : '';
}
/** The shape of the petals of each stage: fewer petals are wider and rounder, more petals narrower and longer. */
export const FRONT = {
    4: { w: 34, s: 42, L: 46, k: 0.45 },
    6: { w: 37, s: 44, L: 66 },
    8: { w: 28, s: 34, L: 62 },
    10: { w: 22, s: 28, L: 58 },
};
/** The second, larger ring (between the front petals), at the last stage only. */
export const BACK_RING = { w: 26, s: 36, L: 90 };
/** The angles of a stage: always a petal at 90 and 270 (the two-petal stage is inside every later stage), every stage mirrors about both axes. */
export const frontAngles = (n) => Array.from({ length: n }, (_, k) => (90 + (k * 360) / n) % 360);
export const backAngles = (n) => Array.from({ length: n }, (_, k) => (90 + 180 / n + (k * 360) / n) % 360);
/** The hue of the iridescent edge light at an angle: a function of the distance from the vertical axis, so it is mirror-symmetric (teal at the top, violet at the sides, rose at the foot). */
export const edgeHue = (angle) => {
    const a = ((angle % 360) + 360) % 360;
    return Math.round(168 + (Math.min(a, 360 - a) / 180) * 150);
};
const wrap = (d) => ((d + 540) % 360) - 180;
/** How the front petals of one stage become those of the next (see the header). Pure. `i` is the stage index of the old stage (0 to 2). */
export function transitionPairs(i) {
    const oldN = MANDALA_STAGES[i];
    const newN = MANDALA_STAGES[i + 1];
    const olds = frontAngles(oldN);
    const news = frontAngles(newN);
    const claimed = new Set();
    const candidates = [];
    olds.forEach((o, oi) => news.forEach((nw, ni) => candidates.push({ oi, ni, d: Math.abs(wrap(nw - o)) })));
    candidates.sort((x, y) => x.d - y.d || x.ni - y.ni);
    const source = new Array(news.length).fill(null);
    for (const c of candidates) {
        if (source[c.ni] === null && !claimed.has(c.oi)) {
            source[c.ni] = { oi: c.oi, kind: 'move', d: c.d };
            claimed.add(c.oi);
        }
    }
    for (let ni = 0; ni < news.length; ni += 1) {
        if (source[ni] !== null)
            continue;
        let nearest = 0;
        let nearestD = Infinity;
        for (let oi = 0; oi < olds.length; oi += 1) {
            const d = Math.abs(wrap(news[ni] - olds[oi]));
            if (d < nearestD) {
                nearestD = d;
                nearest = oi;
            }
        }
        const sibling = source.find((s) => s !== null && s.oi === nearest);
        source[ni] = sibling && nearestD <= sibling.d + 0.001 ? { oi: nearest, kind: 'split', d: nearestD } : { oi: -1, kind: 'grow', d: 0 };
    }
    return news.map((nw, ni) => {
        const s = source[ni];
        return { kind: s.kind, a0: s.oi >= 0 ? olds[s.oi] : nw, a1: nw, s0: s.kind === 'grow' ? { w: 0, s: 0, L: 0 } : FRONT[oldN], s1: FRONT[newN] };
    });
}
const lerp = (x, y, t) => x + (y - x) * t;
/** Cubic ease in and out for the growth between two stages. */
export const stageEase = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/** The value at which the ten primary petals stand (visual, not a threshold of anything about a relationship). */
export const PRIMARY_COMPLETE = 76;
/** A value 0-100 as a position on the four stages, 0 to 3: the third step (the ten petals) is reached at PRIMARY_COMPLETE. Anything not finite is the last stage's rest. */
export const stagePosition = (value) => (Number.isFinite(value) ? Math.min(3, Math.max(0, (value / PRIMARY_COMPLETE) * 3)) : 3);
/** How much of the outer ring has grown at a value, 0 to 1: nothing until PRIMARY_COMPLETE, then a quartic ease-out (about half of it by 80, two thirds by 82, nearly all by 90) to the whole of it at 100. A non-finite value rests complete. */
export function ringGrowth(value) {
    if (!Number.isFinite(value))
        return 1;
    const t = Math.min(1, Math.max(0, (value - PRIMARY_COMPLETE) / (100 - PRIMARY_COMPLETE)));
    return 1 - Math.pow(1 - t, 4);
}
/** The ten primary petals' side of the picture for one stage position u in [0, 3] (the outer ring is not part of it: it follows the value, see `mandalaState`). Pure. */
export function mandalaStateAt(u) {
    const uu = Math.min(3, Math.max(0, u));
    const i = Math.min(2, Math.floor(uu));
    const f = uu >= 3 ? 1 : stageEase(uu - i);
    const pairs = transitionPairs(i);
    const front = pairs.map((p) => ({ a: p.a0 + wrap(p.a1 - p.a0) * f, w: lerp(p.s0.w, p.s1.w, f), s: lerp(p.s0.s, p.s1.s, f), L: lerp(p.s0.L, p.s1.L, f), k: lerp(p.s0.k ?? 0, p.s1.k ?? 0, f) }));
    return { front, back: [], glow: 0.55 + 0.45 * (uu / 3), petals: MANDALA_STAGES[Math.round(uu)] };
}
/** The mandala for a value 0-100: the primary petals by the stage position, the outer ring by its own growth after them, the light by the value. */
export function mandalaState(value) {
    const primary = mandalaStateAt(stagePosition(value));
    const grown = ringGrowth(value);
    const back = grown > 0 ? backAngles(10).map((a) => ({ a, w: BACK_RING.w * grown, s: BACK_RING.s * grown, L: BACK_RING.L * grown, k: 0 })) : [];
    const shown = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 100;
    return { front: primary.front, back, glow: 0.55 + 0.45 * (shown / 100), petals: primary.petals };
}
/* ------------------------------------------------------------------- the DOM */
const MAX = 10;
const GRAD = 'gold';
const GRAD_BACK = 'goldback';
/** The foreground line is this many times as thick as the background's. */
export const DEPTH_RATIO = 1.31;
/** The fixed skeleton: built once; `applyMandala` only writes attributes afterwards. `centre` is the numeral's initial text, or the word shown while there is no value. */
export function mandalaMarkup(prefix, centre) {
    const pool = (kind) => Array.from({ length: MAX }, (_, i) => `<path id="${prefix}-${kind}${i}" data-m="${kind}${i}"/>`).join('');
    const holes = Array.from({ length: MAX }, (_, i) => `<path data-m="h${i}" fill="#000"/>`).join('');
    const uses = (kind) => Array.from({ length: MAX }, (_, i) => `<use href="#${prefix}-${kind}${i}" data-use="${kind}${i}"/>`).join('');
    /* a layer of line work: the foreground (the primary petals and the circle) at `width` in `front`, the background (the outer ring, behind them) at 1/DEPTH_RATIO of it in `back`, fainter */
    const layer = (name, width, front, back, backOpacity) => `
      <g class="cx-m-layer cx-m-${name}" fill="none" stroke-linejoin="round" stroke-linecap="round">
        <g class="cx-m-back" mask="url(#${prefix}-mask)" stroke-width="${(width / DEPTH_RATIO).toFixed(2)}" stroke="${back}" opacity="${backOpacity}">${uses('b')}</g>
        <g class="cx-m-front" stroke-width="${width}" stroke="${front}">${uses('f')}</g>
      </g>`;
    /* the central circle, in the same four strokes as the petals, for the face (it is the number's container: it neither turns nor breathes) */
    const ring = (name, width, stroke) => `<circle class="cx-m-ring cx-m-ring-${name}" r="${R0}" fill="none" stroke-width="${width}" stroke="${stroke}"/>`;
    const face = `style="font-family:${NUMERAL_FONT}"`;
    /* the numeral: the word while there is no value (one line), else the number with the percent sign under it, both centred on the mandala by the glyphs' own ink (numeralLayout) */
    const shownText = String(Math.round(centre.value));
    const lay = numeralLayout(shownText);
    const numeral = centre.word !== null
        ? `<text class="cx-m-num cx-n" x="0" y="${(24 * 0.36).toFixed(1)}" text-anchor="middle" font-size="24" ${face}>${centre.word}</text>`
        : `<text class="cx-m-num cx-n" x="${lay.x}" y="${lay.y}" font-size="${lay.size}" ${face}>${shownText}</text><text class="cx-m-num cx-pct" x="${lay.pctX}" y="${lay.pctY}" font-size="${lay.pctSize}" ${face}>%</text>`;
    return `<div class="cx-m-spin"><div class="cx-m-breathe"><svg class="cx-mandala" viewBox="${-VIEW} ${-VIEW} ${VIEW * 2} ${VIEW * 2}" focusable="false" aria-hidden="true">
    <defs>
      <linearGradient id="${prefix}-${GRAD}" gradientUnits="userSpaceOnUse" x1="-150" y1="-150" x2="150" y2="150"><stop offset="0" stop-color="#f5dc94"/><stop offset=".5" stop-color="#e3b74f"/><stop offset="1" stop-color="#c08f33"/></linearGradient>
      <linearGradient id="${prefix}-${GRAD_BACK}" gradientUnits="userSpaceOnUse" x1="-150" y1="-150" x2="150" y2="150"><stop offset="0" stop-color="#e4d8b8"/><stop offset=".5" stop-color="#c7b583"/><stop offset="1" stop-color="#a08a5c"/></linearGradient>
      <linearGradient id="${prefix}-rim" gradientUnits="userSpaceOnUse" x1="0" y1="${-R0}" x2="0" y2="${R0}"><stop offset="0" stop-color="hsl(176 75% 70%)"/><stop offset=".5" stop-color="hsl(250 70% 74%)"/><stop offset="1" stop-color="hsl(322 70% 72%)"/></linearGradient>
      ${pool('f')}${pool('b')}
      <mask id="${prefix}-mask" maskUnits="userSpaceOnUse" x="${-VIEW}" y="${-VIEW}" width="${VIEW * 2}" height="${VIEW * 2}"><rect x="${-VIEW}" y="${-VIEW}" width="${VIEW * 2}" height="${VIEW * 2}" fill="#fff"/>${holes}<circle r="${R0}" fill="#000"/></mask>
    </defs>
    <g class="cx-m-turn">
    ${layer('shade', 3.9, 'rgba(4,7,13,0.42)', 'rgba(4,7,13,0.34)', 1)}
    ${layer('glow', 6.6, `url(#${prefix}-${GRAD})`, `url(#${prefix}-${GRAD_BACK})`, 0.7)}
    ${layer('edge', 2.8, `url(#${prefix}-rim)`, `url(#${prefix}-rim)`, 0.6)}
    ${layer('line', 1.95, `url(#${prefix}-${GRAD})`, `url(#${prefix}-${GRAD_BACK})`, 0.78)}
    </g>
  </svg></div></div><svg class="cx-m-face" viewBox="${-VIEW} ${-VIEW} ${VIEW * 2} ${VIEW * 2}" focusable="false" aria-hidden="true">
    <circle class="cx-m-scrim" r="${R0}"/>
    <g class="cx-m-layer cx-m-ringlayer">${ring('shade', 3.9, 'rgba(4,7,13,0.42)')}${ring('glow', 6.6, `url(#${prefix}-${GRAD})`)}${ring('edge', 2.8, `url(#${prefix}-rim)`)}${ring('line', 1.95, `url(#${prefix}-${GRAD})`)}</g>
    ${numeral}
  </svg>`;
}
const refsOf = new WeakMap();
const last = new WeakMap();
const writeOnce = (element, signature, write) => {
    if (last.get(element) === signature)
        return;
    last.set(element, signature);
    write();
};
function refsFor(root) {
    const svg = root.querySelector('svg.cx-mandala');
    if (!svg)
        return null;
    const cached = refsOf.get(svg);
    if (cached)
        return cached;
    const defs = new Map();
    for (const path of svg.querySelectorAll('defs path[data-m]'))
        defs.set(path.dataset.m ?? '', path);
    const holes = Array.from({ length: MAX }, (_, i) => defs.get(`h${i}`) ?? null).filter((p) => p !== null);
    const uses = new Map();
    const edgeUses = new Map();
    for (const use of svg.querySelectorAll('use[data-use]')) {
        const key = use.dataset.use ?? '';
        const list = uses.get(key) ?? [];
        list.push(use);
        uses.set(key, list);
        if (use.closest('.cx-m-edge'))
            edgeUses.set(key, use);
    }
    const scope = svg.closest('.cx-hero-mandala') ?? svg.parentElement?.parentElement?.parentElement ?? svg;
    const refs = { defs, holes, uses, edgeUses, turn: svg.querySelector('g.cx-m-turn'), number: scope.querySelector('text.cx-n'), percent: scope.querySelector('text.cx-pct'), svg, scope };
    refsOf.set(svg, refs);
    return refs;
}
const fixed = (n) => (Math.round(n * 20) / 20).toFixed(2);
/**
 * Draws the mandala for a value: the petals' outlines and angles, the soft light, the number. Writes only what changed since the last call (most of the picture is at rest at any moment of a
 * reveal). `spin` is the clockwise turn of the petal drawing in degrees (the numeral never turns): 0 at rest, REVEAL_TURN_DEG short of it at the first frame of a reveal. Returns false when there is no
 * mandala under `root`.
 */
export function applyMandala(root, value, showNumber = true, spin = 0) {
    const refs = refsFor(root);
    if (!refs)
        return false;
    const state = mandalaState(value);
    const place = (kind, petals) => {
        for (let i = 0; i < MAX; i += 1) {
            const petal = petals[i];
            const path = refs.defs.get(`${kind}${i}`);
            const uses = refs.uses.get(`${kind}${i}`) ?? [];
            if (!path)
                continue;
            if (!petal || petal.L < 0.5) {
                writeOnce(path, 'none', () => { path.removeAttribute('d'); });
                for (const use of uses)
                    writeOnce(use, 'none', () => { use.setAttribute('display', 'none'); });
                if (kind === 'f') {
                    const hole = refs.holes[i];
                    if (hole)
                        writeOnce(hole, 'none', () => { hole.removeAttribute('d'); });
                }
                continue;
            }
            const d = petalPath(petal.w, petal.s, petal.L, petal.k);
            writeOnce(path, d, () => { path.setAttribute('d', d); });
            const aim = `rotate(${fixed(petal.a)})`;
            for (const use of uses)
                writeOnce(use, aim, () => { use.setAttribute('transform', aim); use.removeAttribute('display'); });
            const edge = refs.edgeUses.get(`${kind}${i}`);
            if (edge) {
                const hue = `hsl(${edgeHue(petal.a)} 80% 66%)`;
                writeOnce(edge, `h${hue}`, () => { edge.setAttribute('stroke', hue); });
            }
            if (kind === 'f') {
                const hole = refs.holes[i];
                if (hole) {
                    const dh = petalHole(petal.w, petal.s, petal.L, petal.k);
                    writeOnce(hole, `${dh}|${aim}`, () => { hole.setAttribute('d', dh); hole.setAttribute('transform', aim); });
                }
            }
        }
    };
    place('f', state.front);
    place('b', state.back);
    const glow = String(Math.round(state.glow * 100) / 100);
    writeOnce(refs.svg, `g${glow}`, () => { refs.scope.style?.setProperty('--cx-m-glow', glow); });
    if (refs.turn) {
        const turned = Math.abs(spin) < 0.025 ? '' : `rotate(${fixed(spin)})`;
        writeOnce(refs.turn, `t${turned}`, () => { if (turned)
            refs.turn?.setAttribute('transform', turned);
        else
            refs.turn?.removeAttribute('transform'); });
    }
    if (showNumber && refs.number && refs.percent) {
        const shown = String(Math.round(value));
        const { x, y, size, pctX, pctY, pctSize } = numeralLayout(shown);
        const number = refs.number;
        const percent = refs.percent;
        writeOnce(number, `n${shown}`, () => { number.textContent = shown; number.setAttribute('x', String(x)); number.setAttribute('y', String(y)); number.setAttribute('font-size', String(size)); });
        writeOnce(percent, `p${shown.length >= 3}`, () => { percent.setAttribute('x', String(pctX)); percent.setAttribute('y', String(pctY)); percent.setAttribute('font-size', String(pctSize)); });
    }
    return true;
}
