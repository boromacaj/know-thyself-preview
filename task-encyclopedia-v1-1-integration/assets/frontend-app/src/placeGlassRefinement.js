const interactionDock = document.getElementById('interaction-dock');
if (interactionDock instanceof HTMLElement) {
    const style = document.createElement('style');
    style.dataset.placeGlassRefinement = 'true';
    style.textContent = `
    /* PLACE stays visually neutral until VESSEL is chosen. Match the later
       onboarding glass language, but use white / silver light instead of a
       vessel colour. */
    .interaction-dock .place-search,
    .interaction-dock .place-results-shell,
    .interaction-dock .birthplace-card {
      border-color: rgba(244, 248, 250, 0.42) !important;
      background:
        linear-gradient(
          145deg,
          rgba(255, 255, 255, 0.13),
          rgba(255, 255, 255, 0.045) 44%,
          rgba(0, 0, 0, 0.11)
        ),
        rgba(11, 15, 17, 0.56) !important;
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.045) inset,
        0 18px 54px rgba(0, 0, 0, 0.34),
        0 0 34px rgba(224, 238, 246, 0.07) !important;
      backdrop-filter: blur(26px) saturate(1.18) brightness(1.045) !important;
      -webkit-backdrop-filter: blur(26px) saturate(1.18) brightness(1.045) !important;
    }

    .interaction-dock .place-search {
      border-color: rgba(244, 248, 250, 0.48) !important;
    }

    .interaction-dock .place-search:focus-within {
      border-color: rgba(248, 252, 255, 0.82) !important;
      background:
        linear-gradient(
          145deg,
          rgba(255, 255, 255, 0.16),
          rgba(255, 255, 255, 0.055) 44%,
          rgba(0, 0, 0, 0.09)
        ),
        rgba(11, 15, 17, 0.62) !important;
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.07) inset,
        0 18px 54px rgba(0, 0, 0, 0.35),
        0 0 22px rgba(230, 242, 250, 0.15),
        0 0 54px rgba(230, 242, 250, 0.08) !important;
    }

    .interaction-dock .place-results-shell {
      background:
        linear-gradient(
          145deg,
          rgba(255, 255, 255, 0.115),
          rgba(255, 255, 255, 0.04) 44%,
          rgba(0, 0, 0, 0.12)
        ),
        rgba(10, 14, 16, 0.61) !important;
    }

    .interaction-dock .place-results li + li {
      border-top-color: rgba(255, 255, 255, 0.095) !important;
    }

    .interaction-dock .place-results button:hover,
    .interaction-dock .place-results button:focus-visible,
    .interaction-dock .place-results [aria-selected="true"] button {
      background: rgba(244, 248, 250, 0.09) !important;
    }

    .interaction-dock .search-icon {
      border-color: rgba(244, 248, 250, 0.76) !important;
    }

    .interaction-dock .search-icon::after {
      background: rgba(244, 248, 250, 0.76) !important;
    }

    .interaction-dock .search-submit {
      border-color: rgba(244, 248, 250, 0.38) !important;
      color: rgba(248, 250, 252, 0.9) !important;
      background: rgba(255, 255, 255, 0.055) !important;
      box-shadow: 0 0 18px rgba(230, 242, 250, 0.045);
    }

    .interaction-dock .search-submit:hover,
    .interaction-dock .search-submit:focus-visible {
      border-color: rgba(248, 252, 255, 0.78) !important;
      background: rgba(255, 255, 255, 0.1) !important;
    }

    /* Keep the copy full-width, then place the two actions on one stable row.
       Change stays aligned with the coordinate text above it, while Confirm is
       pinned to the card's right edge. Reserving the Change width prevents the
       Confirm capsule from jumping when its neighbour becomes "Choose another". */
    .interaction-dock .birthplace-card {
      grid-template-columns: minmax(0, 1fr) !important;
      gap: 12px !important;
      border-color: rgba(244, 248, 250, 0.36) !important;
    }

    .interaction-dock .birthplace-actions {
      display: flex !important;
      width: 100% !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: clamp(18px, 5vw, 48px) !important;
    }

    .interaction-dock .birthplace-copy > p:first-child {
      color: rgba(244, 248, 250, 0.72) !important;
    }

    .interaction-dock .birthplace-meta,
    .interaction-dock .change-place {
      color: rgba(239, 243, 245, 0.58) !important;
    }

    .interaction-dock .change-place {
      flex: 0 0 86px !important;
      width: 86px !important;
      min-width: 86px !important;
      padding: 0 !important;
      text-align: left !important;
      white-space: nowrap !important;
    }

    /* Confirm birthplace is intentionally outline-only. There is zero button
       fill and zero button blur: the birthplace card beneath it must remain
       completely unchanged. Only the white rim/glow and label define the action. */
    .interaction-dock .confirm-place,
    .interaction-dock .confirm-place:hover,
    .interaction-dock .confirm-place:focus,
    .interaction-dock .confirm-place:focus-visible,
    .interaction-dock .confirm-place:active {
      flex: 0 0 auto !important;
      width: min(45vw, 220px) !important;
      min-width: min(45vw, 220px) !important;
      height: 44px !important;
      min-height: 44px !important;
      margin-left: auto !important;
      padding: 0 14px !important;
      appearance: none !important;
      -webkit-appearance: none !important;
      border-color: rgba(250, 253, 255, 0.96) !important;
      color: rgba(250, 252, 253, 0.98) !important;
      background: transparent !important;
      background-color: transparent !important;
      background-image: none !important;
      box-shadow:
        0 0 3px rgba(255, 255, 255, 0.98),
        0 0 13px rgba(239, 248, 252, 0.56),
        0 0 30px rgba(224, 239, 246, 0.3) !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
    }

    .interaction-dock .confirm-place:hover,
    .interaction-dock .confirm-place:focus-visible,
    .interaction-dock .confirm-place:active {
      border-color: rgba(255, 255, 255, 1) !important;
      background: transparent !important;
      background-color: transparent !important;
      background-image: none !important;
      box-shadow:
        0 0 4px rgba(255, 255, 255, 1),
        0 0 16px rgba(239, 248, 252, 0.68),
        0 0 38px rgba(224, 239, 246, 0.36) !important;
    }

    @media (max-width: 680px) {
      .interaction-dock .place-search,
      .interaction-dock .place-results-shell,
      .interaction-dock .birthplace-card {
        backdrop-filter: blur(24px) saturate(1.16) brightness(1.04) !important;
        -webkit-backdrop-filter: blur(24px) saturate(1.16) brightness(1.04) !important;
      }

      .interaction-dock .birthplace-actions {
        gap: clamp(16px, 4.5vw, 30px) !important;
      }

      .interaction-dock .change-place {
        flex-basis: 82px !important;
        width: 82px !important;
        min-width: 82px !important;
      }

      .interaction-dock .confirm-place {
        width: min(44vw, 205px) !important;
        min-width: min(44vw, 205px) !important;
        height: 42px !important;
        min-height: 42px !important;
        padding-inline: 12px !important;
      }
    }
  `;
    document.head.append(style);
    window.addEventListener('pagehide', () => {
        style.remove();
    }, { once: true });
}
export {};
