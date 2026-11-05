const profileFlow = document.querySelector('.profile-flow');
if (profileFlow instanceof HTMLElement) {
    const style = document.createElement('style');
    style.dataset.arrivalMenuTransparencyAndHitFix = 'true';
    style.textContent = `
    /*
     * ARRIVAL MENU TRANSPARENCY
     * -------------------------
     * Scope is intentionally limited to the ARRIVAL picker/menu surfaces.
     * Keep geometry, typography, borders, glow, layout and state logic intact.
     * Only reduce the frosted material strength by roughly half.
     *
     * (This module also owned the hit surface of the old month grid, so that the
     * Earth's gesture routing could not win over a finger on a month. The month
     * grid is gone: the date is three wheels now, and each wheel owns its own
     * touch - touch-action: pan-y on the wheel, app/wheel-picker - and sits
     * inside the picker host that onboardingEarthGestureAccess already makes the
     * hit target.)
     */

    /* Roughly halve the existing 18px onboarding glass blur for every ARRIVAL
       menu surface without changing element opacity, text, rims or geometry. */
    #place-experience .profile-flow[data-step="arrival"]
      :is(
        .profile-field-picker,
        .arrival-glass-picker,
        .profile-primary,
        .profile-secondary
      ) {
      backdrop-filter: blur(9px) saturate(1.04) !important;
      -webkit-backdrop-filter: blur(9px) saturate(1.04) !important;
    }
  `;
    document.head.append(style);
    window.addEventListener('pagehide', () => {
        style.remove();
    }, { once: true });
}
export {};
