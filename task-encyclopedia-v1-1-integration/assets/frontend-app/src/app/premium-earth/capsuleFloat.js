/*
 * THE CAPSULE FLOAT: A SLOW, SMALL DRIFT THAT TAKES THE STIFFNESS OUT OF A CONTROL.
 *
 * Pure CSS text; premiumAffordances.ts injects it once. No DOM, no clock, no script at runtime.
 *
 * WHAT IT IS. A clickable capsule rises about two and a half pixels and eases back, with a hair of sideways drift, over five seconds, forever: a delicate
 * suspension, not a bob. Each capsule is started at a different point of its cycle (a negative delay), so they never rise and fall together.
 *
 * HOW IT STAYS PRECISE. It uses the individual CSS property `translate`, which composes with (and never replaces) the `transform` a script has set on the same
 * element to place it, so the capsule's anchor, its leader line and its position on the scene are untouched; only a two-pixel offset on top of them moves. The ring
 * of the sonar affordance is the capsule's own ::after, so it floats with it. It moves a composited property only (no layout, no paint of the page), takes
 * nothing away from the click target (a two-pixel shift of a 44 px target), and rests: a sheet over the page pauses it where it is (no snap), a hero that is no
 * longer live (covered, faded) is not matched, and a person who asks for reduced motion gets none of it.
 *
 * REUSE. `capsuleFloatCss([{ selector, declarations? }])`. Custom properties on the target: --kt-float-rise (2.4px), --kt-float-drift (0.6px),
 * --kt-float-period (5.2s), --kt-float-delay (0s; negative starts it part-way through its cycle).
 */
export function capsuleFloatCss(targets) {
    const P = '#place-experience';
    const all = targets.map((target) => `${P} ${target.selector}`).join(',\n    ');
    const own = targets.map((target) => (target.declarations ? `\n    ${P} ${target.selector} { ${target.declarations} }` : '')).join('');
    const sheet = 'html:has(.kt-concept-backdrop)';
    /* The rules for the listed targets are written exactly as approved on the Western Astrology capsules; the generic adopters (class kt-float, attribute
       data-kt-float) have rules of their own beside them, so that neither can change the other. */
    const forTargets = (text) => (targets.length ? text : '');
    return `
    /* THE CAPSULE FLOAT (capsuleFloat.ts) */
    ${P} {
      --kt-float-rise: 2.4px;
      --kt-float-drift: 0.6px;
      --kt-float-period: 5.2s;
      --kt-float-delay: 0s;
    }
    ${forTargets(`${all} {
      animation: kt-capsule-float var(--kt-float-period) ease-in-out var(--kt-float-delay) infinite;
    }${own}
    /* A sheet over the page: the capsules stop where they are (no snap back behind the dimmed page). */
    ${sheet} ${all.split(',\n    ').join(`,\n    ${sheet} `)} { animation-play-state: paused; }`)}
    /* Any positioned control that asks for it by class or attribute (the float is optional, never automatic). */
    ${P} .kt-float, ${P} [data-kt-float] {
      animation: kt-capsule-float var(--kt-float-period) ease-in-out var(--kt-float-delay) infinite;
    }
    ${sheet} ${P} .kt-float, ${sheet} ${P} [data-kt-float] { animation-play-state: paused; }

    @keyframes kt-capsule-float {
      0%, 100% { translate: 0 0; }
      50% { translate: var(--kt-float-drift) calc(var(--kt-float-rise) * -1); }
    }

    @media (prefers-reduced-motion: reduce) {
      ${forTargets(`${all} { animation: none; }`)}
      ${P} .kt-float, ${P} [data-kt-float] { animation: none; }
    }
  `;
}
