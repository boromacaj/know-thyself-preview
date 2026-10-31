import { escapeAttribute, escapeHtml } from '../format.js?v=b5ef5ed';
import { bodyWord, inSign } from '../i18n/engineProse.js?v=b5ef5ed';
import { t, tf } from '../i18n/uiStrings.js?v=b5ef5ed';
import { angleGlyph, signGlyph } from '../pillar-reading/glyphs/pillarGlyphs.js?v=b5ef5ed';
import { interpretAstrology } from '../pillar-reading/astrology-narrative/astrologyInterpretation.js?v=b5ef5ed';
export const HERO_PLACEMENTS = ['sun', 'moon', 'ascendant'];
/** The Big Three of a pillar, from the engine's own interpretation of it; null when the pillar carries no calculated chart. */
export function heroMarksFor(pillar) {
    const interpretation = interpretAstrology(pillar.westernAstrologyChart);
    if (!interpretation)
        return null;
    const { sun, moon, ascendant } = interpretation.bigThree;
    const body = (placement, reading) => ({
        placement,
        sign: reading.sign.toLowerCase(),
        state: reading.state === 'boundary' ? 'boundary' : reading.state === 'approximate' ? 'approximate' : 'known',
        alternatives: reading.signs.length > 1 ? reading.signs.map((sign) => sign.toLowerCase()) : [],
        wholeDay: interpretation.precision === 'unknown' && reading.state === 'known',
    });
    const rising = ascendant.sign === null || ascendant.state === 'withheld'
        ? { placement: 'ascendant', sign: null, state: 'withheld', alternatives: [], wholeDay: false }
        : {
            placement: 'ascendant',
            sign: ascendant.sign.toLowerCase(),
            state: ascendant.state === 'boundary' ? 'boundary' : ascendant.state === 'approximate' ? 'approximate' : 'known',
            alternatives: ascendant.spans.length > 1 ? ascendant.spans.map((span) => span.value.toLowerCase()) : [],
            wholeDay: false,
        };
    return [body('sun', sun), body('moon', moon), rising];
}
const capitalise = (word) => word.charAt(0).toUpperCase() + word.slice(1);
/** The two lines of a capsule: `Sun in` over `Virgo` (and the Slovak forms of the same); an Ascendant with no time says what it needs. */
export function calloutLines(mark) {
    if (mark.sign === null) {
        return { top: t('astro.hero.ascendant'), bottom: t('astro.hero.needsTime'), name: `${t('astro.hero.ascendant')}: ${t('astro.hero.needsTime')}` };
    }
    const sign = capitalise(mark.sign);
    const full = mark.placement === 'ascendant'
        ? tf('reading.astrology.ascendantTitle', { sign: inSign(sign) })
        : tf('reading.astrology.placementTitle', { body: bodyWord(mark.placement === 'sun' ? 'Sun' : 'Moon'), sign: inSign(sign) });
    const cut = full.lastIndexOf(' ');
    return cut > 0 ? { top: full.slice(0, cut), bottom: full.slice(cut + 1), name: full } : { top: full, bottom: '', name: full };
}
/** The scroll cue: three stroked chevrons, as the Numerology hero's, scoped to this one (decorative; takes no input). */
function renderScrollCue() {
    const step = '<span class="kt-astro-cue-step"><svg viewBox="0 0 31 15" width="31" height="15" focusable="false"><path class="kt-astro-cue-glow" d="M3.3 2.6 L11 8.1 Q15.5 11.3 20 8.1 L27.7 2.6"/><path class="kt-astro-cue-line" d="M3.3 2.6 L11 8.1 Q15.5 11.3 20 8.1 L27.7 2.6"/></svg></span>';
    return `<div class="kt-astro-cue" aria-hidden="true">${step}${step}${step}</div>`;
}
/**
 * The hero. `interactive` (English, where the meanings exist) makes each capsule a button that opens its sheet; otherwise it is a plain capsule. A reading with no
 * calculated chart has no hero (the caller keeps its own header).
 */
export function renderAstrologyHero(pillar, interactive) {
    const marks = heroMarksFor(pillar);
    if (!marks)
        return '';
    const callouts = marks.map((mark) => {
        const lines = calloutLines(mark);
        const approximate = mark.state === 'boundary' || mark.state === 'approximate';
        const glyph = mark.sign === null ? angleGlyph('ascendant', { title: '' }) : signGlyph(mark.sign);
        const inner = `<span class="kt-astro-glyph" aria-hidden="true">${glyph}</span>
        <span class="kt-astro-text"><span class="kt-astro-body">${escapeHtml(lines.top)}</span><span class="kt-astro-sign">${escapeHtml(lines.bottom)}${approximate ? '<span class="kt-astro-approx" aria-hidden="true"> ≈</span>' : ''}</span></span>`;
        const attributes = `class="kt-astro-callout" data-callout="${mark.placement}" data-sign="${escapeAttribute(mark.sign ?? '')}" data-state="${mark.state}"`;
        const ring = `<span class="kt-astro-ring" data-mark="${mark.placement}" aria-hidden="true"></span><span class="kt-astro-line" data-mark="${mark.placement}" aria-hidden="true"></span>`;
        if (!interactive)
            return `${ring}<span ${attributes}>${inner}</span>`;
        const label = approximate ? `${lines.name} (approximate): open its meaning` : `${lines.name}: open its meaning`;
        return `${ring}<button type="button" ${attributes} data-astro-open="${mark.placement}" data-astro-sign="${escapeAttribute(mark.sign ?? '')}"${mark.alternatives.length > 1 ? ` data-astro-alt="${escapeAttribute(mark.alternatives.join(','))}"` : ''}${mark.wholeDay ? ' data-astro-day="on"' : ''} aria-haspopup="dialog" aria-label="${escapeAttribute(label)}">${inner}</button>`;
    }).join('\n      ');
    return `<header class="kt-pillar-head kt-astro-hero" data-astro-hero="western-astrology">
      <div class="kt-astro-layer">
      ${callouts}
      </div>
      ${renderScrollCue()}
    </header>`;
}
/** Where the Ascendant's marker sits on the Earth's limb: degrees counter-clockwise from the right, the lower left (the eastern horizon, drawn as the left limb). */
export const ASCENDANT_LIMB_ANGLE = 235;
/** The ring round the Sun and the Moon, in CSS px beyond the body's own radius, and the gap a leader leaves at either end. */
export const RING_PAD = 7;
export const LINE_GAP = 4;
/** The hero scrolls over this many CSS px (as a share of the screen's height) while the scene is let go. */
export const RELEASE_SCREEN_SHARE = 0.5;
const PALETTE = {
    sun: { rim: '238, 214, 150', glow: '210, 172, 92', label: '246, 232, 188' },
    moon: { rim: '196, 222, 255', glow: '118, 170, 255', label: '238, 246, 255' },
    ascendant: { rim: '186, 232, 228', glow: '96, 196, 190', label: '232, 248, 246' },
};
export function astrologyHeroCss() {
    const H = '#place-experience#place-experience .kt-astro-hero';
    const marks = HERO_PLACEMENTS.map((placement) => `
    ${H} [data-callout="${placement}"], ${H} [data-mark="${placement}"] { --ah-rim: ${PALETTE[placement].rim}; --ah-glow: ${PALETTE[placement].glow}; --ah-label: ${PALETTE[placement].label}; }`).join('');
    return `
    ${H} {
      /* PINNED, as the Numerology hero is: sticky in the page that scrolls, held where it opens (--ah-stick), painted before the reading's sections, which rise over it. */
      position: sticky;
      top: var(--ah-stick, 0px);
      display: flow-root;
      height: var(--ah-height, 0px);
      margin: 0;
      padding: 0;
      border: 0;
      background: none;
      pointer-events: none;
      transition: opacity 420ms ease, visibility 0s linear 0s;
    }
    ${H}[data-ah-done] { opacity: 0; visibility: hidden; transition: opacity 420ms ease, visibility 0s linear 420ms; }
    ${marks}
    /* The labels: opacity follows how much of the pose is held (--ah-o), so they are there only while the Sun and the Moon are where they belong. */
    ${H} .kt-astro-layer { position: absolute; inset: 0; opacity: var(--ah-o, 0); pointer-events: none; }
    ${H}:not([data-ah-placed]) .kt-astro-layer { visibility: hidden; }
    ${H} .kt-astro-ring, ${H} .kt-astro-line, ${H} .kt-astro-callout { position: absolute; left: 0; top: 0; will-change: transform; }
    /* The ring on the body (or on the Earth's limb): a thin luminous circle, soft inside and out. Box shadows only: painted once into its own small layer. */
    ${H} .kt-astro-ring {
      box-sizing: border-box;
      border-radius: 50%;
      border: 1px solid rgba(var(--ah-rim), 0.72);
      box-shadow: inset 0 0 8px rgba(var(--ah-glow), 0.3), 0 0 9px rgba(var(--ah-glow), 0.5), 0 0 22px rgba(var(--ah-glow), 0.2);
    }
    /* The leader: one hairline from the capsule to the ring, fading toward the body so it does not cross the Sun's own light. */
    ${H} .kt-astro-line {
      height: 1px;
      transform-origin: 0 50%;
      background: linear-gradient(90deg, rgba(var(--ah-rim), 0.7), rgba(var(--ah-rim), 0.2));
    }
    /* The capsule: a glass pill with the sign's glyph in a ring and the placement in two lines. No backdrop blur (the scene behind it is a moving canvas); a dark tint instead. */
    ${H} .kt-astro-callout {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      gap: 9px;
      margin: 0;
      padding: 6px 15px 6px 7px;
      border: 1px solid rgba(var(--ah-rim), 0.6);
      border-radius: 999px;
      background: linear-gradient(180deg, rgba(var(--ah-glow), 0.14), rgba(8, 12, 22, 0.56) 55%), rgba(8, 12, 22, 0.5);
      box-shadow: inset 0 0 12px rgba(var(--ah-glow), 0.22), 0 0 12px rgba(var(--ah-glow), 0.3);
      color: rgb(var(--ah-label));
      font: inherit;
      text-align: left;
      white-space: nowrap;
      -webkit-appearance: none;
      appearance: none;
      -webkit-tap-highlight-color: transparent;
    }
    ${H} .kt-astro-glyph {
      display: inline-grid;
      place-items: center;
      flex: none;
      width: 30px;
      height: 30px;
      border: 1px solid rgba(var(--ah-rim), 0.55);
      border-radius: 50%;
      box-shadow: inset 0 0 8px rgba(var(--ah-glow), 0.28);
      color: rgb(var(--ah-label));
    }
    ${H} .kt-astro-glyph svg { width: 19px; height: 19px; display: block; }
    ${H} .kt-astro-text { display: grid; gap: 1px; line-height: 1.15; }
    ${H} .kt-astro-body { font-size: 9.5px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(var(--ah-label), 0.86); text-shadow: 0 1px 6px rgba(4, 7, 13, 0.85); }
    ${H} .kt-astro-sign { font-family: Georgia, 'Times New Roman', serif; font-size: 16px; letter-spacing: 0.06em; text-transform: uppercase; color: rgb(var(--ah-label)); text-shadow: 0 0 10px rgba(var(--ah-glow), 0.6), 0 1px 5px rgba(4, 7, 13, 0.85); }
    ${H} .kt-astro-approx { font-size: 12px; opacity: 0.8; letter-spacing: 0; }
    ${H} [data-state="withheld"] .kt-astro-sign { font-size: 11px; letter-spacing: 0.1em; text-transform: none; font-family: inherit; opacity: 0.9; }
    /* Only the capsules take a touch, and only while the pose is held and the reading has not risen over them; a vertical drag that starts on one still scrolls the page. */
    ${H}, ${H} .kt-astro-layer, ${H} .kt-astro-ring, ${H} .kt-astro-line, ${H} span.kt-astro-callout, ${H} .kt-astro-callout *, ${H} .kt-astro-cue, ${H} .kt-astro-cue * { pointer-events: none !important; }
    ${H}[data-ah-live] button.kt-astro-callout { pointer-events: auto !important; touch-action: pan-y; cursor: pointer; }
    ${H} button.kt-astro-callout:focus { outline: none; }
    ${H} button.kt-astro-callout:focus-visible { outline: 2px solid rgba(var(--ah-rim), 0.9); outline-offset: 3px; }
    /* THE SCROLL CUE: three thin chevrons, the Numerology hero's, in the Earth's rim colour; centred on the Earth in the band above MENU. */
    ${H} .kt-astro-cue { display: none; }
    ${H}[data-ah-placed] .kt-astro-cue {
      display: block;
      position: absolute;
      left: calc(var(--ah-cx, 50%) - 15.5px);
      top: var(--ah-cue-top, 0px);
      width: 31px;
      height: 31px;
      opacity: var(--ah-o, 0);
    }
    ${H} .kt-astro-cue-step { display: block; height: 15px; margin-bottom: -6px; opacity: 0.5; will-change: opacity, transform; animation: kt-astro-cue 2.8s ease-in-out infinite; animation-delay: calc(var(--ah-cue-i, 0) * 0.32s); }
    ${H} .kt-astro-cue-step:nth-child(1) { --ah-cue-i: 0; }
    ${H} .kt-astro-cue-step:nth-child(2) { --ah-cue-i: 1; }
    ${H} .kt-astro-cue-step:nth-child(3) { --ah-cue-i: 2; }
    ${H} .kt-astro-cue svg { display: block; overflow: visible; }
    ${H} .kt-astro-cue path { fill: none; stroke-linecap: round; stroke-linejoin: round; }
    ${H} .kt-astro-cue-glow { stroke: rgba(118, 170, 255, 0.34); stroke-width: 5.4; }
    ${H} .kt-astro-cue-line { stroke: rgba(238, 246, 255, 0.92); stroke-width: 1.38; }
    @keyframes kt-astro-cue {
      0%, 100% { opacity: 0.14; transform: translateY(-2px); }
      34% { opacity: 0.95; transform: translateY(0); }
      68% { opacity: 0.14; transform: translateY(3px); }
    }
    @media (prefers-reduced-motion: reduce) {
      ${H} .kt-astro-cue-step { animation: none; will-change: auto; }
      ${H} .kt-astro-cue-step:nth-child(1) { opacity: 0.3; }
      ${H} .kt-astro-cue-step:nth-child(2) { opacity: 0.6; }
      ${H} .kt-astro-cue-step:nth-child(3) { opacity: 0.95; }
      ${H}, ${H}[data-ah-done] { transition: none; }
    }
  `;
}
