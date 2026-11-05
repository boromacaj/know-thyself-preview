const vesselOrbit = document.getElementById('vessel-orbit');
if (vesselOrbit instanceof HTMLElement) {
    const choices = [...vesselOrbit.querySelectorAll('.vessel-choice')];
    const glyphs = {
        male: `
      <svg class="vessel-glyph vessel-glyph-male vessel-glyph-standardized" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <circle cx="24" cy="24" r="10"></circle>
        <path d="M31.1 16.9 L39 9"></path>
        <path d="M33 9 H39 V15"></path>
      </svg>
    `,
        female: `
      <svg class="vessel-glyph vessel-glyph-female vessel-glyph-standardized" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <circle cx="24" cy="24" r="10"></circle>
        <path d="M24 34 V43"></path>
        <path d="M19 39 H29"></path>
      </svg>
    `,
        undefined: `
      <svg class="vessel-glyph vessel-glyph-undefined vessel-glyph-standardized" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <circle cx="24" cy="24" r="10"></circle>
      </svg>
    `,
    };
    for (const choice of choices) {
        const vessel = choice.dataset.vessel ?? '';
        const markup = glyphs[vessel];
        if (!markup)
            continue;
        const symbol = choice.querySelector('.vessel-symbol');
        if (!(symbol instanceof HTMLElement))
            continue;
        symbol.innerHTML = markup;
    }
    const style = document.createElement('style');
    style.dataset.vesselGlyphAlignment = 'true';
    style.textContent = `
    /* All three vessel marks share one exact reference circle. The reference
       circle is centred at 24/24 with radius 10 in the same 48x48 viewBox.
       Only the male arrow and female cross extend away from that circle; they
       never participate in centring. No vessel/globe/layout geometry changes. */
    .vessel-orbit.is-arrow-carousel .vessel-glyph-standardized {
      overflow: visible !important;
      transform-origin: 50% 50% !important;
    }
  `;
    document.head.append(style);
    window.addEventListener('pagehide', () => {
        style.remove();
    }, { once: true });
}
export {};
