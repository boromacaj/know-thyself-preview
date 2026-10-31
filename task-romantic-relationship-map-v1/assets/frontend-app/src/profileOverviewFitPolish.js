const vesselStage = document.getElementById('vessel-stage');
if (vesselStage instanceof HTMLElement) {
    const profileFlow = vesselStage.querySelector('.profile-flow');
    const overviewPanel = vesselStage.querySelector('#profile-complete');
    if (profileFlow instanceof HTMLElement && overviewPanel instanceof HTMLElement) {
        const overviewTitle = overviewPanel.querySelector('.profile-overview-title');
        const promptLayer = profileFlow.querySelector('.kt-prompt-layer');
        /* OVERVIEW's heading is a prompt, not part of the bottom controls stack.
           Put it in the same dedicated prompt layer as IDENTITY / ARRIVAL so its
           Earth-relative coordinate is measured against the full stage rather than
           against the lower profile panel. */
        if (overviewTitle instanceof HTMLElement && promptLayer instanceof HTMLElement) {
            promptLayer.append(overviewTitle);
        }
        const style = document.createElement('style');
        style.dataset.profileOverviewFitPolish = 'true';
        style.textContent = `
      /*
       * OVERVIEW PHONE FIT
       * ------------------
       * Keep all five reviewed values visible at once. The TIME row already
       * exists; the old internal max-height merely clipped it behind the final
       * action on shorter mobile visual viewports.
       */
      .profile-flow[data-step="complete"] .profile-overview-list {
        max-height: none !important;
        overflow: visible !important;
        overscroll-behavior: auto !important;
      }

      /* onboardingLayerArchitecture centers every profile panel with
         left:50% + translateX(-50%). Never remove that transform: doing so puts
         the left edge of OVERVIEW at the middle of the phone and pushes half of
         every capsule off-screen. Release only clipping, not centering. */
      .profile-flow[data-step="complete"] .profile-overview-panel {
        transform: translateX(-50%) !important;
        overflow: visible !important;
      }

      /* OVERVIEW title now lives in the dedicated full-screen prompt layer and
         uses exactly the same locked Earth-top anchor as the approved Identity /
         Arrival prompts. It therefore stays in clean black cosmos above Earth,
         completely independent from capsule-stack height or row ordering. */
      .profile-flow .kt-prompt-layer .profile-overview-title {
        position: absolute !important;
        top: calc(var(--kt-earth-rim-top-y, 34%) - 24px) !important;
        left: 50% !important;
        z-index: 14 !important;
        width: min(86vw, 480px) !important;
        margin: 0 !important;
        visibility: hidden !important;
        opacity: 0 !important;
        transform: translate(-50%, -100%) !important;
        text-align: center !important;
        pointer-events: none !important;
        transition: opacity 260ms ease !important;
      }

      .profile-flow[data-step="complete"] .kt-prompt-layer .profile-overview-title {
        visibility: visible !important;
        opacity: 1 !important;
      }

      /* The explanatory line remains part of the bottom controls stack. */
      .profile-flow[data-step="complete"] .profile-overview-copy {
        position: static !important;
      }

      @media (max-width: 680px) {
        .profile-flow[data-step="complete"] .profile-overview-list {
          gap: var(--kt-control-gap, 10px) !important;
        }
      }

      @media (max-height: 760px) {
        /* Preserve the approved capsule family while tightening only enough to
           guarantee five rows + final action in short portrait viewports. */
        .profile-flow[data-step="complete"] .profile-overview-copy {
          display: none !important;
        }

        .profile-flow[data-step="complete"] .profile-overview-row {
          min-height: var(--kt-control-height, 52px) !important;
          padding-block: 6px !important;
        }

        .profile-flow[data-step="complete"] .profile-overview-row-place {
          min-height: calc(var(--kt-control-height, 52px) + 8px) !important;
        }

        .profile-flow[data-step="complete"] .profile-overview-actions {
          margin-top: var(--kt-control-gap, 8px) !important;
        }
      }
    `;
        document.head.append(style);
        window.addEventListener('pagehide', () => {
            style.remove();
        }, { once: true });
    }
}
export {};
