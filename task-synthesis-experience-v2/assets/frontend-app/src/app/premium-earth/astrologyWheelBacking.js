/*
 * THE FROSTED BACKING UNDER THE NATAL WHEEL.
 *
 * The wheel at the foot of a Western Astrology reading (components/astrologyChartWheel.ts) is thin line-art drawn straight over the live scene, so wherever the
 * Earth, the Sun's flare or the Moon sits behind it the zodiac ring, the house numbers and the aspect lines compete with them and the wheel recedes. This puts
 * one disc of milky glass behind it: a bounded blur of what is behind, a pale blue-white tint a little deeper toward the rim, and an edge that sits under the wheel's own white outer ring, so the wheel reads at a glance without becoming a panel. It is the same family as the BaZi wheel's frost and the app's capsule glass.
 *
 * ONE ELEMENT, ONE BLUR. The renderer adds `<span class="astro-wheel-frost" aria-hidden="true">` ahead of the svg. Outside the premium reading it is not
 * displayed (the legacy screen is unchanged). Inside it the span is absolutely placed over the svg's own box (the svg fills the section's width and sits at its top; it is lifted above the frost with position: relative), so the disc is exactly the svg's box; it is a circle
 * (border-radius 50%), it takes no touch, and it is hidden from assistive technology. The blur is 14px, the strength of the menu's own glass, on every device, and a performance-constrained phone only deepens the tint:
 * the owner reads this on a phone and asked for it to be as strong as the menu elements, and it is one bounded disc. No mask is used, as a precaution: a mask on an element that carries a
 * backdrop-filter is a combination some phone GPUs handle worse than a desktop, and the wheel's own ring already hides the disc's edge.
 */
export function astrologyWheelBackingCss() {
    const P = '#place-experience .kt-pillar-chart .astro-chart-wheel';
    const S = `${P} > .astro-wheel-svg`;
    return `
    .astro-chart-wheel > .astro-wheel-frost { display: none; }
    ${P} { position: relative; }
    ${P} > .astro-wheel-frost {
      display: block;
      position: absolute;
      /* the disc's edge is the wheel's own white outer ring (its radius is 236 of 250), so a hard edge is hidden under a line and no mask is needed */
      /* top and left would resolve against the section's height and width; a translate resolves against the disc itself, so it stays centred on the svg's square */
      top: 0;
      left: 50%;
      width: 94.8%;
      transform: translate(-50%, 2.74%);
      aspect-ratio: 1;
      border-radius: 50%;
      pointer-events: none;
      /* milky glass: a pale blue-white centre, deeper blue toward the rim */
      background: radial-gradient(circle closest-side at 50% 42%, rgba(224, 234, 255, 0.16), rgba(176, 196, 236, 0.13) 55%, rgba(52, 68, 118, 0.28) 100%);
      -webkit-backdrop-filter: blur(14px) saturate(1.08);
      backdrop-filter: blur(14px) saturate(1.08);
    }
    ${P} > .astro-wheel-svg { position: relative; }
    /* A performance-constrained phone keeps the SAME blur (the owner asked for it to be as strong as the menu's glass, 14px) and a deeper tint: one bounded disc, not a list of cards. */
    #place-experience[data-kt-perf="constrained"] .kt-pillar-chart .astro-chart-wheel > .astro-wheel-frost {
      -webkit-backdrop-filter: blur(14px) saturate(1.08);
      backdrop-filter: blur(14px) saturate(1.08);
      background: radial-gradient(circle closest-side at 50% 42%, rgba(224, 234, 255, 0.22), rgba(176, 196, 236, 0.18) 55%, rgba(52, 68, 118, 0.36) 100%);
    }

    /* THE LINES AND THE WRITING, WHITER. Over the milky disc the wheel's own ink is raised to near-white so the ring, the spokes, the house numbers, the
       signs and the four angles read at a glance. Only ink changes (stroke and fill colours, a thicker line for the signs); no geometry, and the aspect
       lines keep their colours, which carry meaning (trine and sextile teal, square and opposition red). Presentation attributes lose to CSS, so these
       attribute selectors win without touching the renderer; the legacy screen (no #place-experience) is unaffected. */
    ${S} circle[stroke="rgba(240,238,232,0.14)"], ${S} circle[stroke="rgba(240,238,232,0.16)"] { stroke: rgba(255, 255, 255, 0.5); stroke-width: 1.2; }
    ${S} circle[fill="none"][stroke="var(--gold-soft)"] { stroke: rgba(255, 255, 255, 0.82); stroke-width: 1.6; }
    ${S} path[stroke="rgba(240,238,232,0.1)"] { stroke: rgba(255, 255, 255, 0.42); stroke-width: 0.8; }
    ${S} line[stroke="rgba(240,238,232,0.16)"] { stroke: rgba(255, 255, 255, 0.55); stroke-width: 1.1; }
    ${S} line[stroke="rgba(240,238,232,0.22)"] { stroke: rgba(255, 255, 255, 0.62); stroke-width: 1; }
    ${S} text[fill="rgba(240,238,232,0.4)"] { fill: rgba(255, 255, 255, 0.95); font-size: 11px; font-weight: 600; }
    ${S} g[color="rgba(240,238,232,0.62)"] { color: #fff; }
    ${S} g[color="rgba(240,238,232,0.62)"] > g { stroke-width: 2; }
    ${S} g[color="#f0eee8"] { color: #fff; }
    ${S} circle[r="11"]:not([stroke*="196"]) { stroke: rgba(255, 255, 255, 0.9); }
    ${S} line[stroke="var(--gold)"] { stroke: rgba(255, 255, 255, 0.85); }
    ${S} text[font-weight="700"] { fill: #fff; font-size: 11.5px; paint-order: stroke; stroke: rgba(6, 10, 22, 0.9); stroke-width: 3px; stroke-linejoin: round; }
    ${S} path[stroke="var(--gold-soft)"][stroke-width="3"] { stroke: rgba(255, 255, 255, 0.8); opacity: 0.7; }
  `;
}
