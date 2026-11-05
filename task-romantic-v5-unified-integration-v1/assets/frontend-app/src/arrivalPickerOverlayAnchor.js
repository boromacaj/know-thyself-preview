const profileFlow = document.querySelector('.profile-flow');
const arrivalForm = document.querySelector('#profile-arrival-form');
if (profileFlow instanceof HTMLElement && arrivalForm instanceof HTMLFormElement) {
    const pickerHost = profileFlow.querySelector('.arrival-picker-host');
    const dateField = arrivalForm.querySelector('.profile-fields-arrival .profile-field-picker:first-child');
    const timeField = arrivalForm.querySelector('.profile-fields-arrival .profile-field-picker:nth-child(2)');
    if (pickerHost instanceof HTMLElement
        && dateField instanceof HTMLElement
        && timeField instanceof HTMLElement) {
        let measureFrame = 0;
        /*
         * BOTH PICKERS ARE THE SAME OVERLAY, RESTING ON THE SAME EDGE.
         *
         * The calendar's position was settled here first: an overlay whose bottom
         * edge is locked to the TOP of the TIME capsule, so it rests on the field
         * list instead of floating over the globe, and the capsule it covers is
         * hidden so no dormant border bleeds through the glass.
         *
         * The time picker used to be the exception - a narrower overlay of loose
         * capsules, higher up, with no card behind them - and it read as a handful
         * of controls scattered over the Earth rather than as the same component.
         * It is not an exception any more: one measurement, one anchor, one width
         * for both. Only the contents differ, so only the height does.
         */
        const openCard = () => (pickerHost.classList.contains('is-open')
            ? pickerHost.querySelector('.arrival-date-picker, .arrival-time-picker')
            : null);
        const syncPickerAnchor = () => {
            window.cancelAnimationFrame(measureFrame);
            measureFrame = window.requestAnimationFrame(() => {
                const open = openCard() !== null;
                arrivalForm.classList.toggle('kt-picker-overlay-open', open);
                if (!open)
                    return;
                // The panel belongs directly above the TIME capsule. Use the real
                // rendered top edge as the anchor so there is no partial overlap and no
                // dormant field border showing through the glass card.
                const timeRect = timeField.getBoundingClientRect();
                if (timeRect.width <= 0 || timeRect.height <= 0)
                    return;
                const viewportHeight = window.innerHeight;
                const bottomOffset = Math.max(0, viewportHeight - timeRect.top);
                const maxHeight = Math.max(280, timeRect.top - 18);
                profileFlow.style.setProperty('--kt-picker-bottom-offset', `${bottomOffset.toFixed(2)}px`);
                profileFlow.style.setProperty('--kt-picker-max-height', `${maxHeight.toFixed(2)}px`);
            });
        };
        const observer = new MutationObserver(syncPickerAnchor);
        observer.observe(pickerHost, {
            attributes: true,
            attributeFilter: ['class'],
            childList: true,
            subtree: true,
        });
        const style = document.createElement('style');
        style.dataset.arrivalPickerOverlayAnchor = 'both-pickers';
        style.textContent = `
      /* DATE and TIME are the same overlay layer. The bottom edge is locked
         exactly to the top edge of the TIME capsule underneath it.

         The time picker is excluded only while the soft keyboard is up: there
         the fields are hidden and the panel is anchored to the keyboard's own
         edge instead, by onboardingLayerArchitecture. */
      .place-experience .vessel-stage.is-profile-flow
        .profile-flow .kt-picker-layer[data-picker-mode="date"]
        .arrival-picker-host.is-open,
      .place-experience .vessel-stage.is-profile-flow
        .profile-flow .kt-picker-layer[data-picker-mode="time"]:not(.is-keyboard-open)
        .arrival-picker-host.is-open {
        position: fixed !important;
        inset: auto !important;
        top: auto !important;
        right: auto !important;
        bottom: var(--kt-picker-bottom-offset, 172px) !important;
        left: 50vw !important;
        width: min(88vw, 510px) !important;
        max-width: min(88vw, 510px) !important;
        max-height: min(76dvh, var(--kt-picker-max-height, 720px)) !important;
        margin: 0 !important;
        overflow: visible !important;
        transform: translateX(-50%) !important;
        box-sizing: border-box !important;
        pointer-events: auto !important;
      }

      /* The card fills that width and scrolls inside itself if the content is
         ever taller than the room above the capsule - the calendar can be, the
         clock never is. */
      .place-experience .vessel-stage.is-profile-flow
        .profile-flow .kt-picker-layer[data-picker-mode="date"]
        .arrival-picker-host.is-open .arrival-date-picker,
      .place-experience .vessel-stage.is-profile-flow
        .profile-flow .kt-picker-layer[data-picker-mode="time"]:not(.is-keyboard-open)
        .arrival-picker-host.is-open .arrival-time-picker {
        width: 100% !important;
        max-width: 100% !important;
        max-height: min(76dvh, var(--kt-picker-max-height, 720px)) !important;
        margin: 0 !important;
        box-sizing: border-box !important;
        overflow-x: hidden !important;
        overflow-y: auto !important;
      }

      /* The DATE capsule sits physically behind the panel in both modes. Keep
         its layout space, but remove its visual stroke while a picker is open so
         no duplicate line can bleed through the card. TIME stays visible and is
         the clean lower edge the overlay rests on - and, while the time picker
         itself is open, the labelled row the panel belongs to. */
      .profile-panel-arrival.kt-picker-overlay-open
        .profile-fields-arrival .profile-field-picker:first-child {
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }

      @media (max-width: 680px) {
        .place-experience .vessel-stage.is-profile-flow
          .profile-flow .kt-picker-layer[data-picker-mode="date"]
          .arrival-picker-host.is-open,
        .place-experience .vessel-stage.is-profile-flow
          .profile-flow .kt-picker-layer[data-picker-mode="time"]:not(.is-keyboard-open)
          .arrival-picker-host.is-open {
          width: min(88vw, 430px) !important;
          max-width: min(88vw, 430px) !important;
        }
      }
    `;
        document.head.append(style);
        syncPickerAnchor();
        window.addEventListener('resize', syncPickerAnchor);
        window.addEventListener('pagehide', () => {
            window.cancelAnimationFrame(measureFrame);
            observer.disconnect();
            window.removeEventListener('resize', syncPickerAnchor);
            arrivalForm.classList.remove('kt-picker-overlay-open');
            profileFlow.style.removeProperty('--kt-picker-bottom-offset');
            profileFlow.style.removeProperty('--kt-picker-max-height');
            style.remove();
        }, { once: true });
    }
}
export {};
