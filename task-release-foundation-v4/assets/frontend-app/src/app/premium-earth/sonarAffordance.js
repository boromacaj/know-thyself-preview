/*
 * KT SONAR EFFECT: THE PROJECT'S STANDARD "THIS CAN BE TAPPED" AFFORDANCE FOR SMALL SYMBOLIC CONTROLS.
 *
 * The rule (docs/design/KT_SONAR_EFFECT.md, and CLAUDE.md): KT SONAR EFFECT is the default premium interaction affordance for appropriate clickable capsules,
 * bubbles, badges, chips, information nodes and small symbolic controls throughout KNOW THYSELF PRO. It shows that an element can be tapped with a softly
 * expanding luminous contour that follows the element's shape, takes the element's accent colour, and fades into transparency. Future work reuses THIS
 * system; it does not make a sonar of its own. When the owner asks for "sonar" (or "sonar effect", "pridaj sonar efekt"), this is what is meant.
 *
 * It is the effect approved on the Western Astrology Big Three capsules (PR #261), and its defaults ARE that approved look: a 2.8 s cycle that is idle for the
 * first 60% of it, a ring about 6 px beyond a capsule that grows with an ease-out while it fades linearly (peak opacity 0.42), a faint glow, a 1.5 px contour.
 *
 * HOW A CONTROL ADOPTS IT (either way):
 *   1. Markup you own:     `<button data-kt-sonar="pill">` (or class "kt-sonar"); the helper `ktSonarAttrs({ shape: 'pill' })` writes it, with options.
 *   2. Markup you do not:  add a SonarTarget { selector, declarations?, needsPosition? } to your pillar's list and pass the list to `sonarAffordanceCss`.
 *   The control must be POSITIONED (relative, absolute or fixed: the ring is positioned against it; a target with needsPosition: true gets position: relative).
 *
 * SHAPE FOLLOWS THE CONTROL. The ring is the control's own ::after with `border-radius: inherit`, so a circle gets a circle, a capsule a capsule, a rounded
 * rectangle a rounded rectangle. How far it grows depends on the control's proportions, so there are three presets (data-kt-sonar="round" | "pill" | "tile",
 * KT_SONAR_SHAPES below); any other growth is `--kt-sonar-sx` / `--kt-sonar-sy`. A control whose shape is not a rounded box (a heart, a star, a clip-path) uses
 * data-kt-sonar="custom": no ring is drawn for it, and its own ::after or element uses the shared keyframes `kt-sonar-grow` and `kt-sonar-fade` and the tokens.
 *
 * ACCENT COLOUR. A ring wears the accent of the control it leaves. The control sets `--kt-sonar-accent` ("r, g, b") to its own accent token (or, for a
 * target, sets `--kt-sonar-rgb: var(--its-token)` as the Western Astrology capsules do with --ah-rim); failing that the ring takes the icon colour
 * (--kt-icon-rgb) and, failing that, a neutral blue-white. Never a colour of its own, never a second copy of a colour the control already has.
 *
 * KNOBS (all optional; the defaults are the approved look): --kt-sonar-accent, --kt-sonar-period (2.8s), --kt-sonar-delay (0s: stagger neighbours, a few
 * tenths of a second each), --kt-sonar-sx / --kt-sonar-sy, --kt-sonar-peak (0.42), data-kt-sonar-intensity="soft" | "strong", and the off switches:
 * data-kt-sonar-disabled, data-kt-sonar="off", [disabled], [aria-disabled="true"].
 *
 * WHAT IT IS NOT FOR. Not every clickable thing: navigation buttons, large menu cards, long disclosure rows, form fields and primary actions have other
 * affordances; the sonar is for small symbolic controls. Keep to a handful of rings in one view at once (stagger them). The Connections heart animation is
 * its own illustration and does not define this effect. The capsule float (capsuleFloat.ts) is a separate, optional effect.
 *
 * WHY IT IS CHEAP. The ring animates transform and opacity only (composited; no layout, no paint of the page), is idle for 60% of every cycle, adds no element
 * and no script, and stops for anything hidden, disabled, open, covered by a sheet or hero, or for a person who asks for reduced motion (who keeps a still,
 * faint outline: the affordance without the movement).
 */
export const KT_SONAR_DEFAULTS = Object.freeze({
    rgb: '190, 214, 255',
    period: '2.8s',
    delay: '0s',
    peak: '0.42',
    sx: '1.3',
    sy: '1.3',
});
/** How far the ring grows, as scale factors, for the three common proportions: about 3.6 px (round, 24 px), 6 px (pill, 119 x 44 px) and 5-6 px (tile) beyond the edge. */
export const KT_SONAR_SHAPES = Object.freeze({
    round: Object.freeze({ sx: '1.3', sy: '1.3' }),
    pill: Object.freeze({ sx: '1.1', sy: '1.28' }),
    tile: Object.freeze({ sx: '1.07', sy: '1.12' }),
});
export const KT_SONAR_INTENSITIES = Object.freeze({
    soft: Object.freeze({ peak: '0.3', hover: '0.4' }),
    normal: Object.freeze({ peak: KT_SONAR_DEFAULTS.peak, hover: '0.52' }),
    strong: Object.freeze({ peak: '0.55', hover: '0.65' }),
});
const SAFE_VALUE = /^[-a-zA-Z0-9_,.()%\s]+$/;
const safe = (value, what) => {
    if (!SAFE_VALUE.test(value))
        throw new Error(`KT sonar: ${what} contains characters that cannot be written into a style attribute`);
    return value.trim();
};
const seconds = (value, what) => {
    if (!Number.isFinite(value) || value < 0 || value > 60)
        throw new Error(`KT sonar: ${what} must be between 0 and 60 seconds`);
    return `${Number(value.toFixed(3))}s`;
};
/** The custom-property declarations for a control's options (no braces; empty when every option is the default). */
export function ktSonarStyle(options = {}) {
    const declarations = [];
    if (options.accent !== undefined)
        declarations.push(`--kt-sonar-accent: ${safe(options.accent, 'accent')};`);
    if (options.delay !== undefined)
        declarations.push(`--kt-sonar-delay: ${seconds(options.delay, 'delay')};`);
    if (options.period !== undefined)
        declarations.push(`--kt-sonar-period: ${seconds(options.period, 'period')};`);
    return declarations.join(' ');
}
/** The attributes that adopt the effect, ready to be written into an opening tag: `data-kt-sonar="pill" style="--kt-sonar-delay: 0.22s;"`. */
export function ktSonarAttrs(options = {}) {
    const shape = options.shape ?? 'round';
    const attributes = [`data-kt-sonar="${options.enabled === false ? 'off' : shape}"`];
    if (options.intensity && options.intensity !== 'normal')
        attributes.push(`data-kt-sonar-intensity="${options.intensity}"`);
    const style = ktSonarStyle(options);
    if (style)
        attributes.push(`style="${style}"`);
    return attributes.join(' ');
}
const DEFAULT_REST = '[aria-expanded="true"], [aria-pressed="true"], [data-state="open"], [open]';
/** The CSS for a list of targets, plus the shared tokens and keyframes. */
export function sonarAffordanceCss(targets) {
    const P = '#place-experience';
    const all = (suffix, only = targets) => only.map((target) => `${P} ${target.selector}${suffix}`).join(',\n    ');
    const positioned = targets.filter((target) => target.needsPosition);
    const own = targets.map((target) => (target.declarations ? `
    ${P} ${target.selector} { ${target.declarations} }` : '')).join('');
    /** The selectors of the targets as the tail of a list (with its comma), or nothing when a caller adopts the effect by class and attribute only. */
    const more = (text) => (targets.length ? `,\n    ${text}` : '');
    const rest = targets.map((target) => `${P} ${target.selector}:is(${target.restWhen ?? DEFAULT_REST})::after`).join(',\n    ');
    return `
    /* THE SONAR AFFORDANCE (sonarAffordance.ts) */
    ${P} {
      --kt-sonar-rgb: ${KT_SONAR_DEFAULTS.rgb};
      --kt-sonar-period: ${KT_SONAR_DEFAULTS.period};
      --kt-sonar-delay: ${KT_SONAR_DEFAULTS.delay};
      --kt-sonar-peak: ${KT_SONAR_DEFAULTS.peak};
      --kt-sonar-sx: ${KT_SONAR_DEFAULTS.sx};
      --kt-sonar-sy: ${KT_SONAR_DEFAULTS.sy};
    }
        ${positioned.length ? `${all('', positioned)} { position: relative; }` : ''}${own}
    ${P} .kt-sonar::after, ${P} [data-kt-sonar]::after${more(all('::after'))} {
      content: '';
      position: absolute;
      inset: -1px;
      border: 1.5px solid rgba(var(--kt-sonar-rgb), 0.72);
      border-radius: inherit;
      box-shadow: 0 0 7px rgba(var(--kt-sonar-rgb), 0.5);
      opacity: 0;
      transform: scale(1);
      transform-origin: 50% 50%;
      pointer-events: none;
      animation:
        kt-sonar-grow var(--kt-sonar-period) cubic-bezier(0.2, 0.62, 0.3, 1) var(--kt-sonar-delay) infinite,
        kt-sonar-fade var(--kt-sonar-period) linear var(--kt-sonar-delay) infinite;
    }
    /* Looked at or about to be pressed: a little more present, still not an alert. */
    ${P} .kt-sonar:is(:hover, :focus-visible), ${P} [data-kt-sonar]:is(:hover, :focus-visible)${more(all(':is(:hover, :focus-visible)'))} { --kt-sonar-peak: 0.52; }
    /* Open, selected or expanded: the question has been answered, the ring rests. */
    ${P} .kt-sonar:is(${DEFAULT_REST})::after, ${P} [data-kt-sonar]:is(${DEFAULT_REST})::after${more(rest)} { animation: none; opacity: 0; }
    /* A sheet over the page: the page behind is not asking to be tapped. */
    html:has(.kt-concept-backdrop) ${P} .kt-sonar::after, html:has(.kt-concept-backdrop) ${P} [data-kt-sonar]::after${more(targets.map((target) => `html:has(.kt-concept-backdrop) ${P} ${target.selector}::after`).join(',\n    '))} { animation: none; opacity: 0; }

    /* KT SONAR EFFECT: the generic adopters (class kt-sonar or attribute data-kt-sonar) - accent, shape presets, intensity, the off switches. */
    ${P} .kt-sonar, ${P} [data-kt-sonar] { --kt-sonar-rgb: var(--kt-sonar-accent, var(--kt-icon-rgb, ${KT_SONAR_DEFAULTS.rgb})); }
    ${Object.entries(KT_SONAR_SHAPES).map(([name, growth]) => `${P} [data-kt-sonar="${name}"] { --kt-sonar-sx: ${growth.sx}; --kt-sonar-sy: ${growth.sy}; }`).join('\n    ')}
    ${Object.entries(KT_SONAR_INTENSITIES).filter(([name]) => name !== 'normal').map(([name, level]) => `${P} [data-kt-sonar-intensity="${name}"] { --kt-sonar-peak: ${level.peak}; }
    ${P} [data-kt-sonar-intensity="${name}"]:is(:hover, :focus-visible) { --kt-sonar-peak: ${level.hover}; }`).join('\n    ')}
    ${P} [data-kt-sonar="custom"]::after { content: none; }
    ${P} :is(.kt-sonar, [data-kt-sonar]):is([disabled], [aria-disabled="true"], [data-kt-sonar="off"], [data-kt-sonar-disabled])::after${more(all(':is([disabled], [aria-disabled="true"], [data-kt-sonar-disabled])::after'))} { animation: none; opacity: 0; }

    /* Two animations, one period: the ring GROWS with an ease-out (fast away from the control, then settling) and FADES linearly, so it is clearly seen for
       the first moments and gone before it can read as a second border. Both are idle (no opacity, no scale) for the first 60% of the period. */
    @keyframes kt-sonar-grow {
      0%, 60% { transform: scale(1); }
      100% { transform: scale(var(--kt-sonar-sx), var(--kt-sonar-sy)); }
    }
    @keyframes kt-sonar-fade {
      0%, 60% { opacity: 0; }
      68% { opacity: var(--kt-sonar-peak); }
      100% { opacity: 0; }
    }

    /* Reduced motion: nothing moves; the control keeps a still, fainter outline just outside its edge. */
    @media (prefers-reduced-motion: reduce) {
      ${P} .kt-sonar::after, ${P} [data-kt-sonar]::after${more(all('::after'))} {
        animation: none;
        opacity: 0.2;
        transform: scale(1.08, 1.12);
      }
      ${P} .kt-sonar:is(${DEFAULT_REST})::after, ${P} [data-kt-sonar]:is(${DEFAULT_REST})::after${more(rest)} { opacity: 0; }
      ${P} :is(.kt-sonar, [data-kt-sonar]):is([disabled], [aria-disabled="true"], [data-kt-sonar="off"], [data-kt-sonar-disabled])::after${more(all(':is([disabled], [aria-disabled="true"], [data-kt-sonar-disabled])::after'))} { opacity: 0; }
    }
  `;
}
