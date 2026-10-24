const experience = document.getElementById('place-experience');
if (experience instanceof HTMLElement) {
    const style = document.createElement('style');
    style.dataset.onboardingGlassSystem = 'true';
    style.textContent = `
    /*
     * ONE REAL GLASS MATERIAL
     * -----------------------
     * The detached PLACE Back / Confirm capsules are the approved visual
     * reference. Their shared material is NOT a painted grey fill: it is a
     * transparent surface using blur(18px) saturate(1.08) over the live map.
     *
     * Apply those exact shared material parameters to every onboarding glass
     * surface. Borders/glows may still express control state, but the glass body
     * itself is identical everywhere.
     */
    /*
     * THEME-LIT RIM.
     *
     * These two tokens are already the single source for every onboarding glass
     * surface below, so the active theme is applied HERE once rather than card
     * by card. --kt-accent-soft-rgb / --kt-accent-rgb are the theme playground's
     * own tokens ("New pillars should consume THESE, not raw colours"); the
     * fallbacks are the previous literal values, so an unthemed page looks
     * exactly as it did.
     *
     * The rim is a border-colour plus two soft outer glows. Both are box-shadow,
     * which paints outside the border box and takes part in no layout, so no
     * card changes size, shape, radius or position. Kept deliberately low-alpha:
     * present and clearly theme-coloured, not neon.
     */
    #place-experience {
      --kt-glass-backdrop: blur(7px) saturate(1.08);
      --kt-glass-border: rgba(var(--kt-accent-soft-rgb, 248, 252, 255), 0.52);
      --kt-glass-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.035) inset,
        0 0 10px rgba(var(--kt-accent-soft-rgb, 248, 252, 255), 0.20),
        0 0 26px rgba(var(--kt-accent-rgb, 248, 252, 255), 0.14),
        0 14px 38px rgba(0, 0, 0, 0.24);
    }

    /* PLACE: search, result list and selected-place information card. */
    #place-experience .interaction-dock .place-search,
    #place-experience .interaction-dock .place-results-shell,
    #place-experience .interaction-dock .birthplace-card {
      border-color: var(--kt-glass-border) !important;
      background: transparent !important;
      background-color: transparent !important;
      background-image: none !important;
      box-shadow: var(--kt-glass-shadow) !important;
      backdrop-filter: var(--kt-glass-backdrop) !important;
      -webkit-backdrop-filter: var(--kt-glass-backdrop) !important;
      transform: translateZ(0);
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      contain: paint;
      will-change: backdrop-filter;
    }

    #place-experience .interaction-dock .place-search:focus-within {
      border-color: rgba(248, 252, 255, 0.72) !important;
      background: transparent !important;
      background-color: transparent !important;
      background-image: none !important;
      box-shadow:
        0 0 0 1px rgba(255,255,255,.05) inset,
        0 0 16px rgba(235,246,252,.10),
        0 14px 38px rgba(0,0,0,.24) !important;
    }

    /* IDENTITY + ARRIVAL closed capsules: exact same transparent + 18px blur
       body as the two approved action capsules. */
    #place-experience .profile-flow .profile-field,
    #place-experience .profile-flow .profile-field-picker {
      border-color: rgba(var(--profile-energy-soft-rgb), 0.26) !important;
      background: transparent !important;
      background-color: transparent !important;
      background-image: none !important;
      box-shadow: var(--kt-glass-shadow) !important;
      backdrop-filter: var(--kt-glass-backdrop) !important;
      -webkit-backdrop-filter: var(--kt-glass-backdrop) !important;
      transform: translateZ(0);
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      contain: paint;
      will-change: backdrop-filter;
    }

    #place-experience .profile-flow .profile-field:focus-within,
    #place-experience .profile-flow .profile-field.is-filled,
    #place-experience .profile-flow .profile-field:has(input:not(:placeholder-shown)),
    #place-experience .profile-flow .profile-field-picker.is-open {
      border-color: rgba(var(--profile-energy-soft-rgb), 0.84) !important;
      background: transparent !important;
      background-color: transparent !important;
      background-image: none !important;
      box-shadow:
        0 0 0 1px rgba(var(--profile-energy-soft-rgb),.08) inset,
        0 0 3px rgba(248,252,255,.62),
        0 0 14px rgba(var(--profile-energy-soft-rgb),.30),
        0 0 34px rgba(var(--profile-energy-rgb),.15),
        0 14px 38px rgba(0,0,0,.24) !important;
    }

    /* Calendar, time editor and year grid use the same glass body too. */
    #place-experience .profile-flow .arrival-glass-picker,
    #place-experience .profile-flow .arrival-year-grid {
      border-color: rgba(var(--profile-energy-soft-rgb), 0.26) !important;
      background: transparent !important;
      background-color: transparent !important;
      background-image: none !important;
      box-shadow:
        0 0 0 1px rgba(255,255,255,.035) inset,
        0 18px 46px rgba(0,0,0,.26) !important;
      backdrop-filter: var(--kt-glass-backdrop) !important;
      -webkit-backdrop-filter: var(--kt-glass-backdrop) !important;
      transform: translateZ(0);
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      contain: paint;
      will-change: backdrop-filter;
    }

    #place-experience .profile-flow .arrival-period-button,
    #place-experience .profile-flow .arrival-period-main,
    #place-experience .profile-flow .arrival-calendar-day-disc,
    #place-experience .profile-flow .arrival-year-option,
    #place-experience .profile-flow .arrival-time-input {
      background: transparent !important;
      background-color: transparent !important;
      background-image: none !important;
      border-color: rgba(255,255,255,.12) !important;
      box-shadow: 0 0 0 1px rgba(255,255,255,.018) inset !important;
      backdrop-filter: var(--kt-glass-backdrop) !important;
      -webkit-backdrop-filter: var(--kt-glass-backdrop) !important;
    }

    #place-experience .profile-flow .arrival-time-input:focus,
    #place-experience .profile-flow .arrival-year-option.is-active,
    #place-experience .profile-flow .arrival-calendar-day.is-selected .arrival-calendar-day-disc {
      border-color: rgba(var(--profile-energy-soft-rgb),.72) !important;
      box-shadow:
        0 0 2px rgba(255,255,255,.54),
        0 0 18px rgba(var(--profile-energy-rgb),.18) !important;
    }

    /* Navigation capsules: keep the exact same transparent + 18px material.
       The later PLACE layout rules still own their approved white action rims. */
    #place-experience .profile-flow .profile-primary,
    #place-experience .profile-flow .profile-secondary,
    #place-experience .vessel-stage:not(.is-profile-flow) .vessel-back,
    #place-experience .vessel-stage:not(.is-profile-flow) .confirm-vessel,
    #place-experience .interaction-dock .change-place,
    #place-experience .interaction-dock .confirm-place {
      appearance: none !important;
      -webkit-appearance: none !important;
      background: transparent !important;
      background-color: transparent !important;
      background-image: none !important;
      backdrop-filter: var(--kt-glass-backdrop) !important;
      -webkit-backdrop-filter: var(--kt-glass-backdrop) !important;
    }

    #place-experience .profile-flow .profile-secondary,
    #place-experience .vessel-stage:not(.is-profile-flow) .vessel-back,
    #place-experience .interaction-dock .change-place,
    #place-experience .interaction-dock .confirm-place {
      border-color: rgba(248, 252, 255, 0.86) !important;
      color: rgba(250, 250, 247, 0.94) !important;
      box-shadow:
        0 0 2px rgba(255,255,255,.76),
        0 0 14px rgba(235,244,246,.16) !important;
    }

    #place-experience .profile-flow .profile-primary:disabled {
      opacity: 1 !important;
      border-color: rgba(248,252,255,.17) !important;
      color: rgba(244,243,238,.32) !important;
      box-shadow: none !important;
    }

    #place-experience .profile-flow .profile-primary:not(:disabled) {
      border-color: rgba(var(--profile-energy-soft-rgb), .96) !important;
      color: rgba(250,249,245,.97) !important;
      box-shadow:
        0 0 2px rgba(255,255,255,.78),
        0 0 13px rgba(var(--profile-energy-soft-rgb),.46),
        0 0 32px rgba(var(--profile-energy-rgb),.25) !important;
    }

    #place-experience[data-vessel-selection="male"] {
      --kt-active-vessel-rgb: 104, 184, 255;
      --kt-active-vessel-soft-rgb: 182, 224, 255;
    }

    #place-experience[data-vessel-selection="female"] {
      --kt-active-vessel-rgb: 255, 118, 154;
      --kt-active-vessel-soft-rgb: 255, 164, 184;
    }

    #place-experience[data-vessel-selection="undefined"] {
      --kt-active-vessel-rgb: 250, 252, 255;
      --kt-active-vessel-soft-rgb: 255, 255, 255;
    }

    #place-experience .vessel-stage:not(.is-profile-flow) .confirm-vessel:disabled {
      opacity: 1 !important;
      border-color: rgba(248,252,255,.17) !important;
      color: rgba(244,243,238,.32) !important;
      box-shadow: none !important;
    }

    #place-experience .vessel-stage:not(.is-profile-flow) .confirm-vessel:not(:disabled) {
      border-color: rgba(var(--kt-active-vessel-soft-rgb, 248, 252, 255), .96) !important;
      color: rgba(250,249,245,.97) !important;
      box-shadow:
        0 0 2px rgba(255,255,255,.78),
        0 0 13px rgba(var(--kt-active-vessel-soft-rgb, 248, 252, 255),.46),
        0 0 32px rgba(var(--kt-active-vessel-rgb, 248, 252, 255),.25) !important;
    }

    #place-experience .interaction-dock .search-submit {
      background: transparent !important;
      background-color: transparent !important;
      background-image: none !important;
      border-color: rgba(248,252,255,.38) !important;
      box-shadow: none !important;
      backdrop-filter: var(--kt-glass-backdrop) !important;
      -webkit-backdrop-filter: var(--kt-glass-backdrop) !important;
    }
  `;
    document.head.append(style);
    window.addEventListener('pagehide', () => {
        style.remove();
    }, { once: true });
}
export {};
