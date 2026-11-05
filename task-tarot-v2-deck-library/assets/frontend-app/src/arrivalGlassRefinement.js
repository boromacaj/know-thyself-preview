const profileFlow = document.querySelector('.profile-flow');
const arrivalForm = document.querySelector('#profile-arrival-form');
if (profileFlow instanceof HTMLElement && arrivalForm instanceof HTMLFormElement) {
    const style = document.createElement('style');
    style.dataset.arrivalGlassRefinement = 'true';
    style.textContent = `
    /* The date/time rows should read as milky glass controls, not as transparent
       windows onto the prompt and Earth behind them. Keep the vessel-coloured
       edge/glow, but make the centre substantially more diffused. */
    .profile-panel-arrival .profile-field-picker {
      border-color: rgba(var(--profile-energy-soft-rgb), 0.34) !important;
      background:
        linear-gradient(145deg,
          rgba(255, 255, 255, 0.14),
          rgba(255, 255, 255, 0.055) 38%,
          rgba(var(--profile-energy-rgb), 0.035) 62%,
          rgba(0, 0, 0, 0.08)
        ),
        rgba(15, 21, 23, 0.76) !important;
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.045) inset,
        0 14px 38px rgba(0, 0, 0, 0.3),
        0 0 28px rgba(var(--profile-energy-rgb), 0.07) !important;
      backdrop-filter: blur(34px) saturate(1.08) brightness(1.055) !important;
      -webkit-backdrop-filter: blur(34px) saturate(1.08) brightness(1.055) !important;
    }

    .profile-panel-arrival .profile-field-picker.is-open {
      border-color: rgba(var(--profile-energy-soft-rgb), 0.9) !important;
      background:
        linear-gradient(145deg,
          rgba(255, 255, 255, 0.17),
          rgba(255, 255, 255, 0.07) 36%,
          rgba(var(--profile-energy-rgb), 0.055) 64%,
          rgba(0, 0, 0, 0.075)
        ),
        rgba(15, 21, 23, 0.8) !important;
      box-shadow:
        0 0 0 1px rgba(var(--profile-energy-soft-rgb), 0.13) inset,
        0 15px 42px rgba(0, 0, 0, 0.32),
        0 0 22px rgba(var(--profile-energy-rgb), 0.34),
        0 0 54px rgba(var(--profile-energy-rgb), 0.2),
        0 0 84px rgba(var(--profile-energy-rgb), 0.1) !important;
    }

    .profile-panel-arrival .profile-field-caption {
      color: rgba(244, 241, 233, 0.64) !important;
    }

    .profile-panel-arrival .arrival-field-value:not(.is-placeholder) {
      color: rgba(250, 249, 245, 0.98) !important;
    }

    /* Once a date/time picker is open, the prompt has already done its job.
       Remove it completely so it never ghosts through the glass rows. */
    .profile-flow:has(.profile-panel-arrival.has-custom-picker) .profile-prompt-arrival {
      visibility: hidden !important;
      opacity: 0 !important;
    }

    /* When Android shows the numeric keyboard, let the time editor sit directly
       against the keyboard edge. The previous top-anchored layout left a large
       unused strip of Earth between the editor and keyboard. */
    .profile-panel-arrival.time-keyboard-active {
      top: auto !important;
      bottom: max(
        0px,
        calc(100vh - var(--arrival-visible-top, 0px) - var(--arrival-visible-height, 100vh))
      ) !important;
      max-height: var(--arrival-visible-height, 100dvh) !important;
      padding-bottom: 0 !important;
    }

    .profile-panel-arrival.time-keyboard-active .arrival-picker-host.is-open {
      margin-bottom: 0 !important;
    }

    .profile-panel-arrival.time-keyboard-active .arrival-time-picker {
      margin-bottom: 0 !important;
      border-bottom-left-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }

    @media (max-width: 680px) {
      .profile-panel-arrival .profile-field-picker {
        backdrop-filter: blur(30px) saturate(1.08) brightness(1.05) !important;
        -webkit-backdrop-filter: blur(30px) saturate(1.08) brightness(1.05) !important;
      }
    }
  `;
    document.head.append(style);
    window.addEventListener('pagehide', () => {
        style.remove();
    }, { once: true });
}
export {};
