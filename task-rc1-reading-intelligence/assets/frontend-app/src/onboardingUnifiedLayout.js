const experience = document.getElementById('place-experience');
if (experience instanceof HTMLElement) {
    const style = document.createElement('style');
    style.dataset.onboardingUnifiedLayout = 'true';
    style.textContent = `
    /* One geometry system for the whole onboarding. The closed ARRIVAL state is
       the reference: same capsule width, height, radius, vertical rhythm and
       Back/forward proportions from PLACE through VESSEL and IDENTITY. */
    .place-experience {
      --kt-control-width: min(88vw, 510px);
      --kt-control-height: 56px;
      --kt-action-height: 50px;
      --kt-control-gap: 10px;
      --kt-action-gap: 12px;
    }

    /* Every lower control stack occupies the same visual width. */
    .interaction-dock,
    .profile-flow .profile-panel,
    .vessel-stage:not(.is-profile-flow) .vessel-actions {
      width: var(--kt-control-width) !important;
      max-width: var(--kt-control-width) !important;
    }

    .interaction-dock .place-search,
    .interaction-dock .birthplace-card,
    .interaction-dock .birthplace-actions-detached,
    .profile-flow .profile-fields,
    .profile-flow .profile-actions,
    .profile-flow .profile-actions-single {
      width: 100% !important;
      max-width: none !important;
    }

    /* Search, identity fields and arrival selectors are one capsule family. */
    .interaction-dock .place-search,
    .profile-flow .profile-field,
    .profile-flow .profile-field-picker {
      height: var(--kt-control-height) !important;
      min-height: var(--kt-control-height) !important;
      border-radius: 999px !important;
    }

    .interaction-dock .place-search input,
    .profile-flow .profile-field input {
      height: calc(var(--kt-control-height) - 2px) !important;
      min-height: calc(var(--kt-control-height) - 2px) !important;
    }

    .profile-flow .profile-fields,
    .profile-flow .profile-fields-arrival,
    .profile-flow .profile-fields-name {
      gap: var(--kt-control-gap) !important;
    }

    /* PLACE information stays a card, but it shares the same width/material and
       rhythm as the controls above and below it. */
    .interaction-dock .birthplace-card {
      margin-top: var(--kt-control-gap) !important;
      border-radius: 22px !important;
    }

    /* One action-row template everywhere: narrower Back on the left, wider
       forward action on the right, exactly like the approved ARRIVAL screen. */
    .interaction-dock .birthplace-actions-detached,
    .vessel-stage:not(.is-profile-flow) .vessel-actions,
    .profile-flow .profile-actions,
    .profile-flow .profile-actions-single {
      display: grid !important;
      grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr) !important;
      gap: var(--kt-action-gap) !important;
      align-items: center !important;
      justify-content: stretch !important;
    }

    .interaction-dock .birthplace-actions-detached {
      margin-top: var(--kt-control-gap) !important;
    }

    .vessel-stage:not(.is-profile-flow) .vessel-actions {
      margin-inline: 0 !important;
    }

    /* Every navigation capsule has identical physical geometry. Visual state is
       still owned by onboardingGlassSystem: Back glows white, forward lights only
       when valid/selected. */
    .interaction-dock .birthplace-actions-detached .change-place,
    .interaction-dock .birthplace-actions-detached .confirm-place,
    .vessel-stage:not(.is-profile-flow) .vessel-back,
    .vessel-stage:not(.is-profile-flow) .confirm-vessel,
    .profile-flow .profile-primary,
    .profile-flow .profile-secondary {
      box-sizing: border-box !important;
      width: 100% !important;
      min-width: 0 !important;
      height: var(--kt-action-height) !important;
      min-height: var(--kt-action-height) !important;
      max-height: var(--kt-action-height) !important;
      margin: 0 !important;
      padding: 0 14px !important;
      border-radius: 999px !important;
      font-size: 10px !important;
      font-weight: 700 !important;
      line-height: 1 !important;
      letter-spacing: .085em !important;
      text-transform: uppercase !important;
      white-space: nowrap !important;
    }

    /* Keep the field/action rhythm identical on IDENTITY and ARRIVAL. */
    .profile-flow .profile-actions,
    .profile-flow .profile-actions-single {
      margin-top: var(--kt-control-gap) !important;
    }

    /* The completion Back control uses the same capsule geometry as every other
       Back button, even though the final card has no forward action beside it. */
    .profile-flow .profile-complete-actions {
      width: var(--kt-control-width) !important;
      max-width: var(--kt-control-width) !important;
      margin-top: var(--kt-control-gap) !important;
    }

    .profile-flow .profile-complete-actions .profile-secondary {
      width: 40% !important;
      min-width: 0 !important;
      height: var(--kt-action-height) !important;
      min-height: var(--kt-action-height) !important;
      margin: 0 auto 0 0 !important;
    }

    @media (max-width: 680px) {
      .place-experience {
        --kt-control-width: min(88vw, 430px);
        --kt-control-height: 56px;
        --kt-action-height: 50px;
        --kt-control-gap: 10px;
        --kt-action-gap: 12px;
      }
    }

    @media (max-height: 690px) {
      .place-experience {
        --kt-control-height: 52px;
        --kt-action-height: 46px;
        --kt-control-gap: 8px;
        --kt-action-gap: 10px;
      }
    }
  `;
    document.head.append(style);
    window.addEventListener('pagehide', () => {
        style.remove();
    }, { once: true });
}
export {};
