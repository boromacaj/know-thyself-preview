const interactionDock = document.getElementById('interaction-dock');
const vesselStage = document.getElementById('vessel-stage');
if (interactionDock instanceof HTMLElement || vesselStage instanceof HTMLElement) {
    if (vesselStage instanceof HTMLElement) {
        const switchLabel = vesselStage.querySelector('.vessel-carousel-swipe-label');
        if (switchLabel instanceof HTMLElement) {
            /* The caption is gone from VESSEL: the two side marks and the arrows say
               what it said. Emptied as well as hidden so no stylesheet ordering can
               bring the words back, and left in the DOM because it is the middle
               column of the carousel nav grid. It was already aria-hidden. */
            switchLabel.textContent = '';
            switchLabel.setAttribute('aria-hidden', 'true');
        }
    }
    const style = document.createElement('style');
    style.dataset.placeVesselReviewPolish = 'true';
    style.textContent = `
    /* PLACE — the information card must genuinely disappear while no birthplace
       has been selected. placeSelectedLayout deliberately forces the selected
       card to display:block, so restore the hidden attribute with higher
       specificity. With the card out of flow, the search capsule becomes the
       first surface above the mobile keyboard and the full three-row suggestion
       panel drops into the freed space. */
    .interaction-dock .birthplace-card[hidden] {
      display: none !important;
    }

    .interaction-dock .birthplace-card[hidden] + .birthplace-actions-detached {
      display: none !important;
    }

    /* VESSEL — spread the navigation slightly wider and bring back a restrained
       centre hint. Arrow switching remains the only interaction. */
    .vessel-stage:not(.is-profile-flow) .vessel-carousel-nav {
      width: min(86vw, 500px) !important;
      grid-template-columns: 60px minmax(0, 1fr) 60px !important;
    }

    /* Kept out of sight AND out of the accessibility tree; the element remains
       only to hold the middle column of the carousel nav grid open. */
    .vessel-stage:not(.is-profile-flow) .vessel-carousel-swipe-label {
      visibility: hidden !important;
      opacity: 0 !important;
      font-size: 0 !important;
      pointer-events: none !important;
    }

    .vessel-stage:not(.is-profile-flow) .vessel-carousel-arrow {
      width: 60px !important;
    }

    /* Make the chevron beak visibly softer while preserving the thin minimal arrow. */
    .vessel-stage:not(.is-profile-flow) .vessel-carousel-arrow::before {
      width: 14px !important;
      height: 14px !important;
      border-top-width: 1.4px !important;
      border-left-width: 1.4px !important;
      border-radius: 5px 0 0 0 !important;
    }

    /* Review pass: make the PLACE -> VESSEL reveal unmistakably slow. The live
       Earth settles first (owned by vesselEntryReveal); only then do the veil,
       glow, typography, arrows and action capsules fade in together. */
    .place-experience.vessel-active.vessel-ui-revealed .earth-map {
      transition: opacity 3200ms cubic-bezier(.16, .72, .22, 1) !important;
    }

    .place-experience.vessel-active.vessel-ui-revealed .vessel-stage {
      transition:
        opacity 3200ms cubic-bezier(.16, .72, .22, 1),
        visibility 0s linear 0s !important;
    }

    .place-experience.vessel-active.vessel-ui-revealed .vessel-cosmos {
      transition: opacity 3500ms ease-out 120ms !important;
    }

    .place-experience.vessel-active.vessel-ui-revealed .vessel-content {
      transition: opacity 3200ms ease-out 120ms !important;
    }

    @media (prefers-reduced-motion: reduce) {
      .place-experience.vessel-active.vessel-ui-revealed .earth-map,
      .place-experience.vessel-active.vessel-ui-revealed .vessel-stage,
      .place-experience.vessel-active.vessel-ui-revealed .vessel-cosmos,
      .place-experience.vessel-active.vessel-ui-revealed .vessel-content {
        transition-duration: 1ms !important;
        transition-delay: 0ms !important;
      }
    }
  `;
    document.head.append(style);
    window.addEventListener('pagehide', () => {
        style.remove();
    }, { once: true });
}
export {};
