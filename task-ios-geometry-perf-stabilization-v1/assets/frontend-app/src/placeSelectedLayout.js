import { t } from './app/i18n/uiStrings.js?v=d9f39e7';
const interactionDock = document.getElementById('interaction-dock');
const birthplaceCard = document.getElementById('birthplace-card');
const changePlace = document.getElementById('change-place');
const confirmPlace = document.getElementById('confirm-place');
if (interactionDock instanceof HTMLElement
    && birthplaceCard instanceof HTMLElement
    && changePlace instanceof HTMLButtonElement
    && confirmPlace instanceof HTMLButtonElement) {
    const birthplaceActions = birthplaceCard.querySelector('.birthplace-actions');
    if (birthplaceActions instanceof HTMLElement) {
        /* PLACE now follows the same composition as VESSEL / IDENTITY:
           1. search capsule
           2. independent information glass card
           3. independent Back + Confirm capsules
           Reuse the existing buttons so all search/reset/confirm behaviour remains
           owned by premium-earth-phase-a.ts. */
        birthplaceCard.insertAdjacentElement('afterend', birthplaceActions);
        birthplaceActions.classList.add('birthplace-actions-detached');
        /* The linear PLACE step keeps its approved "Back" capsule. A targeted
           OVERVIEW -> Change place edit is not the linear step: there the same
           button is the edit's Cancel, so profileOverviewFlow owns the label and
           this guard must stand down. Without this the edit showed "Back" next to
           "Save change". */
        const experience = document.getElementById('place-experience');
        const isOverviewPlaceEdit = () => (experience instanceof HTMLElement && experience.dataset.overviewEdit === 'place');
        const keepBackLabel = () => {
            if (isOverviewPlaceEdit())
                return;
            const back = t('onb.action.back');
            if (changePlace.textContent !== back)
                changePlace.textContent = back;
        };
        keepBackLabel();
        const labelObserver = new MutationObserver(keepBackLabel);
        labelObserver.observe(changePlace, { childList: true, characterData: true, subtree: true });
        const style = document.createElement('style');
        style.dataset.placeSelectedLayout = 'true';
        style.textContent = `
      /* The base map vignette used to stop 56px above the viewport bottom. On a
         high-DPR phone that creates a very visible horizontal seam straight
         through the Back / Confirm row. Let the same vignette continue all the
         way to the real bottom edge; no control or map geometry is changed. */
      .place-experience:not(.vessel-active) .earth-map::after {
        inset: 0 !important;
      }

      /* The selected PLACE state is three deliberately separate surfaces. */
      .interaction-dock .birthplace-card {
        display: block !important;
        grid-template-columns: none !important;
        gap: 0 !important;
        margin-top: 10px !important;
        padding: 17px 20px 18px !important;
      }

      .interaction-dock .birthplace-card .birthplace-copy {
        width: 100% !important;
        min-width: 0 !important;
      }

      /* Detached actions sit below the information card exactly like the
         navigation row on the following onboarding cards. */
      .interaction-dock .birthplace-actions-detached {
        display: grid !important;
        grid-template-columns: minmax(104px, .82fr) minmax(150px, 1.18fr) !important;
        width: 100% !important;
        margin-top: 10px !important;
        gap: 12px !important;
        align-items: center !important;
      }

      .interaction-dock #birthplace-card[hidden] + .birthplace-actions-detached {
        display: none !important;
      }

      .interaction-dock .birthplace-actions-detached .change-place,
      .interaction-dock .birthplace-actions-detached .confirm-place {
        width: 100% !important;
        min-width: 0 !important;
        height: 52px !important;
        min-height: 52px !important;
        margin: 0 !important;
        padding: 0 16px !important;
        border-radius: 999px !important;
        text-align: center !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        appearance: none !important;
        -webkit-appearance: none !important;
        background: transparent !important;
        background-color: transparent !important;
        background-image: none !important;
        backdrop-filter: blur(18px) saturate(1.08) !important;
        -webkit-backdrop-filter: blur(18px) saturate(1.08) !important;
      }

      /* Back is always the neutral white outline used throughout the flow. */
      .interaction-dock .birthplace-actions-detached .change-place {
        border: 1px solid rgba(248, 252, 255, .86) !important;
        color: rgba(250, 250, 247, .94) !important;
        font-size: 11px !important;
        font-weight: 650 !important;
        letter-spacing: .04em !important;
        box-shadow:
          0 0 2px rgba(255,255,255,.76),
          0 0 14px rgba(235,244,246,.16) !important;
      }

      /* PLACE is still neutral, so a valid Confirm uses the same white light.
         Keep only the rim/glow; the map remains visible through the centre. */
      .interaction-dock .birthplace-actions-detached .confirm-place:not(:disabled) {
        border: 1px solid rgba(248, 252, 255, .92) !important;
        color: rgba(250, 250, 247, .97) !important;
        font-size: 11px !important;
        font-weight: 650 !important;
        box-shadow:
          0 0 2px rgba(255,255,255,.82),
          0 0 14px rgba(235,244,246,.24),
          0 0 30px rgba(226,240,248,.12) !important;
      }

      .interaction-dock .birthplace-actions-detached .confirm-place:disabled {
        cursor: default !important;
        opacity: 1 !important;
        border: 1px solid rgba(248,252,255,.17) !important;
        color: rgba(244,243,238,.32) !important;
        box-shadow: none !important;
      }

      .interaction-dock .birthplace-actions-detached .change-place:focus-visible,
      .interaction-dock .birthplace-actions-detached .confirm-place:focus-visible {
        outline: none !important;
      }

      @media (max-width: 680px) {
        .interaction-dock .birthplace-card {
          padding: 16px 18px 17px !important;
        }

        .interaction-dock .birthplace-actions-detached {
          grid-template-columns: minmax(102px, .8fr) minmax(148px, 1.2fr) !important;
          gap: 11px !important;
        }

        .interaction-dock .birthplace-actions-detached .change-place,
        .interaction-dock .birthplace-actions-detached .confirm-place {
          height: 50px !important;
          min-height: 50px !important;
          padding-inline: 13px !important;
        }
      }
    `;
        document.head.append(style);
        window.addEventListener('pagehide', () => {
            labelObserver.disconnect();
            style.remove();
        }, { once: true });
    }
}
