const experience = document.getElementById('place-experience');
const interactionDock = document.getElementById('interaction-dock');
const vesselStage = document.getElementById('vessel-stage');
if (experience instanceof HTMLElement
    && interactionDock instanceof HTMLElement
    && vesselStage instanceof HTMLElement) {
    const completePanel = vesselStage.querySelector('#profile-complete');
    const identityForm = vesselStage.querySelector('#profile-identity-form');
    const arrivalForm = vesselStage.querySelector('#profile-arrival-form');
    const vesselContent = vesselStage.querySelector('.vessel-content');
    const fadeSurfaces = [
        completePanel,
        identityForm,
        arrivalForm,
        interactionDock,
        vesselContent,
    ].filter((surface) => surface instanceof HTMLElement);
    const safeFadeAttribute = 'data-overview-safe-fade';
    /*
     * The guard is needed while a surface is genuinely PART WAY through a fade.
     * It is not needed once the surface has arrived, and releasing it a little
     * before the end is what removes the visible snap: the frost returns while
     * the card is still moving, so the eye reads it as part of the transition
     * rather than as a separate event on a settled card. At the 2000 ms timing
     * this is the last ~160 ms of travel.
     */
    const SAFE_FADE_RELEASE_OPACITY = 0.92;
    /*
     * Reading the INLINE opacity, not the computed one, is deliberate: the tween
     * writes inline, and the computed value is also 1 for a card that CSS has not
     * dimmed, so the computed value cannot tell a settled card from a mid-fade
     * one. But "an inline opacity exists" is not the same question as "this
     * surface is dimmed": the tween pins a split card's ROOT at inline 1 for the
     * whole fade, and deactivateCard leaves inline 0 on a retired card, so both
     * of those look identical to a string test. Only the VALUE answers it.
     */
    const dimmedFraction = (surface) => {
        const inline = surface.style.getPropertyValue('opacity');
        if (inline === '')
            return 1;
        const value = Number.parseFloat(inline);
        return Number.isFinite(value) ? value : 1;
    };
    const syncSafeFadeSurfaces = () => {
        let anySurfaceFading = false;
        for (const surface of fadeSurfaces) {
            /* Mark exactly the surfaces that are dimmed right now, before the next
               paint, so Android never has to animate a parent opacity layer while
               also recomputing multiple descendant backdrop-filter layers over the
               live Google 3D Earth.
      
               A surface that has ARRIVED is not marked, even though its inline
               opacity is still there. That was the latch: a settled inline "1" is a
               non-empty string, so the guard stayed armed after the animation ended
               and left the glass suppressed on a card that was no longer moving. */
            const fading = dimmedFraction(surface) < SAFE_FADE_RELEASE_OPACITY;
            surface.toggleAttribute(safeFadeAttribute, fading);
            anySurfaceFading ||= fading;
        }
        experience.classList.toggle('overview-safe-fade-active', anySurfaceFading);
    };
    const observer = new MutationObserver(syncSafeFadeSurfaces);
    for (const surface of fadeSurfaces) {
        observer.observe(surface, { attributes: true, attributeFilter: ['style'] });
    }
    const style = document.createElement('style');
    style.dataset.profileOverviewAndroidStability = 'true';
    style.textContent = `
    /*
     * ANDROID COMPOSITOR GUARD
     * ------------------------
     * The main onboarding fade system already follows this rule: never animate
     * an opacity parent that still owns live backdrop-filter descendants. The
     * OVERVIEW edit-return flow originally violated that rule by fading the whole
     * glass panel/form. On Samsung/Chromium this can exhaust the renderer while
     * the live 3D Earth is also composited, producing an "Aw, Snap!" tab crash.
     *
     * Keep the exact same capsules, borders, gradients, sizing and 2 s timing.
     * Only suspend the expensive live backdrop sampling for the duration of the
     * outgoing opacity tween; it is restored automatically as soon as the inline
     * fade opacity is removed.
     */
    .profile-overview-panel[${safeFadeAttribute}] .profile-overview-row,
    .profile-overview-panel[${safeFadeAttribute}] .profile-overview-change,
    .profile-overview-panel[${safeFadeAttribute}] .profile-primary,
    #profile-identity-form[${safeFadeAttribute}] .profile-field,
    #profile-identity-form[${safeFadeAttribute}] .profile-primary,
    #profile-identity-form[${safeFadeAttribute}] .profile-secondary,
    #profile-arrival-form[${safeFadeAttribute}] .profile-field,
    #profile-arrival-form[${safeFadeAttribute}] .profile-field-picker,
    #profile-arrival-form[${safeFadeAttribute}] .arrival-glass-picker,
    #profile-arrival-form[${safeFadeAttribute}] .profile-primary,
    #profile-arrival-form[${safeFadeAttribute}] .profile-secondary,
    .interaction-dock[${safeFadeAttribute}] .place-search,
    .interaction-dock[${safeFadeAttribute}] .place-results-shell,
    .interaction-dock[${safeFadeAttribute}] .birthplace-card,
    .vessel-content[${safeFadeAttribute}] .vessel-symbol,
    .vessel-content[${safeFadeAttribute}] .vessel-back,
    .vessel-content[${safeFadeAttribute}] .confirm-vessel {
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      will-change: auto !important;
    }
  `;
    document.head.append(style);
    syncSafeFadeSurfaces();
    window.addEventListener('pagehide', () => {
        observer.disconnect();
        for (const surface of fadeSurfaces)
            surface.removeAttribute(safeFadeAttribute);
        experience.classList.remove('overview-safe-fade-active');
        style.remove();
    }, { once: true });
}
export {};
