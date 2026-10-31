const experience = document.getElementById('place-experience');
if (experience instanceof HTMLElement) {
    const style = document.createElement('style');
    style.dataset.onboardingEarthSceneClarity = 'true';
    style.textContent = `
    /*
     * NATIVE EARTH SCENE CLARITY
     * --------------------------
     * PLACE still keeps its original cinematic vignette/atmosphere, but at
     * roughly half strength so substantially more of the native Google space is
     * visible. Once VESSEL begins, the real Google Map3DElement is the only
     * cosmic scene: remove the three legacy fullscreen decorations completely.
     * The approved vessel/profile halo remains a separate transparent border +
     * box-shadow effect and is intentionally untouched.
     */
    #place-experience[data-intro-state="complete"]:not(.vessel-active) .earth-map::after {
      opacity: 0.45 !important;
    }

    #place-experience[data-intro-state="complete"]:not(.vessel-active) > .atmosphere {
      opacity: 0.48 !important;
    }

    #place-experience.vessel-active .earth-map::after {
      display: none !important;
      opacity: 0 !important;
      background: none !important;
      background-image: none !important;
    }

    #place-experience.vessel-active > .atmosphere {
      display: none !important;
      opacity: 0 !important;
      background: none !important;
      background-image: none !important;
    }

    #place-experience.vessel-active #vessel-stage > .vessel-cosmos,
    #place-experience.vessel-active #vessel-stage > .vessel-cosmos::after {
      display: none !important;
      opacity: 0 !important;
      background: none !important;
      background-image: none !important;
      filter: none !important;
      animation: none !important;
    }

    /*
     * CANONICAL LIVE-RENDERER CLARITY (final owner)
     * --------------------------------------------
     * Several legacy modules still declare a post-PLACE veil on the map element
     * itself, each with class-only specificity and !important:
     *   premium-earth-phase-a.css   .vessel-active .earth-map                     0.34
     *   vesselArrowCarousel.ts      .vessel-active .earth-map                     0.62
     *   vesselOrbit.core.ts         .vessel-focused .earth-map                    0.80
     *   vesselEntryReveal.ts        .vessel-active.vessel-ui-revealed .earth-map  0.34  <- previously won
     *
     * The live Google Map3DElement IS the cosmic scene for VESSEL, IDENTITY,
     * ARRIVAL and OVERVIEW, so its native star field must stay fully readable.
     * This module loads last and uses ID specificity, so it resolves the cascade
     * deterministically without editing four historical stylesheets. Nothing but
     * opacity/filter is touched: geometry, framing, halo and chrome are untouched.
     */
    #place-experience.vessel-active #earth-map,
    #place-experience.vessel-active #earth-map > gmp-map-3d {
      opacity: 1 !important;
      filter: none !important;
    }
  `;
    document.head.append(style);
    window.addEventListener('pagehide', () => {
        style.remove();
    }, { once: true });
}
export {};
