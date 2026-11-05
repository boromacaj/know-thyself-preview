/*
 * OVERVIEW targeted-edit LAYER OWNERSHIP.
 *
 * profileOverviewFlow.ts is the canonical owner of overview state, row order,
 * the final call to action and every targeted edit route. It performs the whole
 * PLACE/VESSEL handover itself, so this module no longer re-orders rows, no
 * longer repaints the final label from a requestAnimationFrame poll, and no
 * longer re-drives the edit state after the fact.
 *
 * What genuinely still belongs here is layer ownership that cannot be expressed
 * from the flow module: onboardingLayerArchitecture keeps .profile-flow at
 * display:block !important, so an explicit VESSEL edit needs a higher-priority
 * rule for `hidden` to win and stop the old OVERVIEW glass tree from sitting
 * over the gender controls. These rules stay dormant until the user explicitly
 * chooses Change on Place or Vessel.
 */
const experience = document.getElementById('place-experience');
if (experience instanceof HTMLElement) {
    const style = document.createElement('style');
    style.dataset.profileOverviewEditRecovery = 'true';
    style.textContent = `
    /* PLACE edit owns the real live map again. */
    .place-experience[data-overview-edit="place"]:not(.vessel-active) .earth-map,
    .place-experience[data-overview-edit="place"]:not(.vessel-active) .earth-map > gmp-map-3d {
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
      filter: none !important;
    }

    .place-experience[data-overview-edit="place"]:not(.vessel-active) .interaction-dock {
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
    }

    /* onboardingLayerArchitecture intentionally keeps profile-flow at
       display:block !important. During an explicit VESSEL edit only, hidden must
       win so the old OVERVIEW glass tree cannot sit over the gender controls. */
    .place-experience[data-overview-edit="vessel"][data-state="vessel"] .profile-flow[hidden] {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }

    .place-experience[data-overview-edit="vessel"][data-state="vessel"] .kt-earth-effects-layer {
      display: none !important;
    }

    .place-experience[data-overview-edit="vessel"][data-state="vessel"] .vessel-content,
    .place-experience[data-overview-edit="vessel"][data-state="vessel"] .vessel-carousel-nav,
    .place-experience[data-overview-edit="vessel"][data-state="vessel"] .vessel-actions {
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
    }
  `;
    document.head.append(style);
    window.addEventListener('pagehide', () => {
        style.remove();
    }, { once: true });
}
export {};
