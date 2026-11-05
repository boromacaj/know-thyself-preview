const profileFlow = document.querySelector('.profile-flow');
if (profileFlow instanceof HTMLElement) {
    const style = document.createElement('style');
    style.dataset.arrivalMenuTransparencyAndHitFix = 'true';
    style.textContent = `
    /*
     * ARRIVAL MENU TRANSPARENCY + MONTH HIT FIX
     * -----------------------------------------
     * Scope is intentionally limited to the ARRIVAL picker/menu surfaces.
     * Keep geometry, typography, borders, glow, layout and state logic intact.
     * Only reduce the frosted material strength by roughly half and make the
     * dynamically-created month grid an explicit hit-test surface above Earth.
     */

    /* Explicit month hit ownership. This prevents native Earth gesture routing
       from winning when a finger lands on a month option inside the open picker. */
    #place-experience .profile-flow[data-step="arrival"] .arrival-month-grid {
      position: relative !important;
      z-index: 3 !important;
      pointer-events: auto !important;
      touch-action: manipulation !important;
      background: rgba(255, 255, 255, .011) !important;
    }

    #place-experience .profile-flow[data-step="arrival"] .arrival-month-option {
      position: relative !important;
      z-index: 4 !important;
      pointer-events: auto !important;
      touch-action: manipulation !important;
      cursor: pointer !important;
      background: rgba(255, 255, 255, .013) !important;
    }

    /* Roughly halve the existing 18px onboarding glass blur for every ARRIVAL
       menu surface without changing element opacity, text, rims or geometry. */
    #place-experience .profile-flow[data-step="arrival"]
      :is(
        .profile-field-picker,
        .arrival-glass-picker,
        .arrival-year-grid,
        .arrival-period-button,
        .arrival-period-main,
        .arrival-calendar-day-disc,
        .arrival-year-option,
        .arrival-time-input,
        .profile-primary,
        .profile-secondary
      ) {
      backdrop-filter: blur(9px) saturate(1.04) !important;
      -webkit-backdrop-filter: blur(9px) saturate(1.04) !important;
    }

    /* These two surfaces use their own translucent fills rather than the shared
       glass variable, so halve only those fill alpha values as well. */
    #place-experience .profile-flow[data-step="arrival"] .arrival-date-summary {
      background: rgba(255, 255, 255, .0125) !important;
    }

    #place-experience .profile-flow[data-step="arrival"] .arrival-year-grid {
      background-color: transparent !important;
    }
  `;
    document.head.append(style);
    window.addEventListener('pagehide', () => {
        style.remove();
    }, { once: true });
}
export {};
