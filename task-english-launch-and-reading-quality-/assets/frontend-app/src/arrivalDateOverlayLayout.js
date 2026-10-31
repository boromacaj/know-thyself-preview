const profileFlow = document.querySelector('.profile-flow');
if (profileFlow instanceof HTMLElement) {
    const arrivalForm = profileFlow.querySelector('#profile-arrival-form');
    const pickerHost = profileFlow.querySelector('.arrival-picker-host');
    if (arrivalForm instanceof HTMLFormElement && pickerHost instanceof HTMLElement) {
        const syncPickerMode = () => {
            const isDatePicker = pickerHost.classList.contains('is-open')
                && pickerHost.querySelector('.arrival-date-picker') instanceof HTMLElement;
            pickerHost.classList.toggle('is-date-overlay', isDatePicker);
            arrivalForm.classList.toggle('has-date-overlay', isDatePicker);
        };
        const observer = new MutationObserver(syncPickerMode);
        observer.observe(pickerHost, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class'],
        });
        const style = document.createElement('style');
        style.dataset.arrivalDateOverlayLayout = 'true';
        style.textContent = `
      /* Opening the calendar must not reflow the closed ARRIVAL controls. The
         two Date/Time capsules keep their exact resting position underneath the
         glass card, while Back/Confirm remain in their normal bottom row. */
      .profile-flow .profile-panel-arrival {
        position: relative !important;
        isolation: isolate;
      }

      .profile-flow .profile-panel-arrival .profile-fields-arrival {
        position: relative;
        z-index: 2;
      }

      .profile-flow .profile-panel-arrival .profile-actions {
        position: relative;
        z-index: 70;
      }

      .profile-flow .arrival-picker-host.is-date-overlay {
        position: absolute !important;
        right: 0 !important;
        bottom: calc(var(--kt-action-height, 50px) + var(--kt-control-gap, 10px)) !important;
        left: 0 !important;
        z-index: 50 !important;
        width: 100% !important;
        max-height: none !important;
        margin: 0 !important;
        overflow: visible !important;
        opacity: 0;
        transform: none !important;
        pointer-events: none;
        transition: opacity 440ms cubic-bezier(0.16, 0.72, 0.22, 1) !important;
      }

      .profile-flow .arrival-picker-host.is-date-overlay.is-open {
        max-height: none !important;
        margin: 0 !important;
        overflow: visible !important;
        opacity: 1;
        transform: none !important;
        pointer-events: auto;
      }

      .profile-flow .arrival-picker-host.is-date-overlay .arrival-date-picker {
        width: 100% !important;
        max-height: min(72dvh, 720px);
        margin: 0 !important;
        overflow-y: auto !important;
        overscroll-behavior: contain;
      }

      /* The picker itself owns the visual foreground. The dormant selectors stay
         physically where they were and are simply covered by the glass surface. */
      .profile-flow .profile-panel-arrival.has-date-overlay .profile-fields-arrival {
        pointer-events: none;
      }

      @media (max-height: 760px) {
        .profile-flow .arrival-picker-host.is-date-overlay .arrival-date-picker {
          max-height: min(68dvh, 560px);
        }
      }
    `;
        document.head.append(style);
        syncPickerMode();
        window.addEventListener('pagehide', () => {
            observer.disconnect();
            style.remove();
        }, { once: true });
    }
}
export {};
