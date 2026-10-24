const vesselStage = document.getElementById('vessel-stage');
if (vesselStage instanceof HTMLElement) {
    const profileFlow = vesselStage.querySelector('.profile-flow');
    const vesselOrbit = vesselStage.querySelector('.vessel-orbit');
    if (profileFlow instanceof HTMLElement) {
        const identityPrompt = profileFlow.querySelector('.profile-panel-identity h2');
        const arrivalPrompt = profileFlow.querySelector('.profile-panel-arrival h2');
        const arrivalForm = profileFlow.querySelector('#profile-arrival-form');
        // The questions must not belong to the lower form layout. Move them to the
        // full-screen profile layer so their position can be anchored to the actual
        // Earth instead of to whichever input row happens to be below it.
        if (identityPrompt) {
            identityPrompt.classList.add('profile-prompt', 'profile-prompt-identity');
            profileFlow.append(identityPrompt);
        }
        if (arrivalPrompt) {
            arrivalPrompt.classList.add('profile-prompt', 'profile-prompt-arrival');
            profileFlow.append(arrivalPrompt);
        }
        const syncPromptAnchor = () => {
            const focusedEarth = vesselStage.querySelector('.vessel-orbit.is-focused .vessel-choice.is-focused .vessel-symbol');
            if (!(focusedEarth instanceof HTMLElement))
                return;
            const stageRect = vesselStage.getBoundingClientRect();
            const earthRect = focusedEarth.getBoundingClientRect();
            if (earthRect.width <= 0 || earthRect.height <= 0)
                return;
            // The CSS top coordinate represents the prompt's bottom edge. Keeping that
            // edge a small fixed gap above the real rendered globe makes the placement
            // correct on every phone size instead of guessing with vh values.
            const earthTop = earthRect.top - stageRect.top;
            profileFlow.style.setProperty('--profile-prompt-bottom-y', `${Math.max(22, earthTop - 26)}px`);
        };
        const schedulePromptAnchor = () => {
            window.requestAnimationFrame(syncPromptAnchor);
            window.setTimeout(syncPromptAnchor, 220);
            window.setTimeout(syncPromptAnchor, 820);
        };
        const promptObserver = new MutationObserver(schedulePromptAnchor);
        promptObserver.observe(profileFlow, {
            attributes: true,
            attributeFilter: ['data-step', 'hidden'],
        });
        if (vesselOrbit instanceof HTMLElement) {
            promptObserver.observe(vesselOrbit, {
                attributes: true,
                subtree: true,
                attributeFilter: ['class'],
            });
        }
        window.addEventListener('resize', schedulePromptAnchor);
        vesselStage.addEventListener('transitionend', schedulePromptAnchor);
        schedulePromptAnchor();
        // The arrival rows are still semantic wrapping <label> elements around the
        // hidden value inputs. On Android a label tap can otherwise produce a second
        // synthetic click on that hidden input, which immediately toggles the custom
        // picker closed again. Prevent the label's native activation while keeping the
        // normal bubbling click that opens our glass picker exactly once.
        const guardPickerLabelActivation = (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement))
                return;
            const pickerField = target.closest('.profile-field-picker');
            if (!pickerField || !profileFlow.contains(pickerField))
                return;
            if (target.classList.contains('arrival-native-value')) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            event.preventDefault();
        };
        document.addEventListener('click', guardPickerLabelActivation, true);
        // Keep the actual HH:MM editor visible when Android opens the soft keyboard.
        // Only the picker portal follows the visual viewport. The page itself must
        // never scroll the focused field into view because that would move the live
        // Earth and its locked atmospheric rim together with the document.
        const syncTimeKeyboardViewport = () => {
            const viewport = window.visualViewport;
            profileFlow.style.setProperty('--arrival-visible-top', `${(viewport?.offsetTop ?? 0).toFixed(2)}px`);
            profileFlow.style.setProperty('--arrival-visible-height', `${(viewport?.height ?? window.innerHeight).toFixed(2)}px`);
        };
        const handleProfileFocusIn = (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement) || !target.classList.contains('arrival-time-input'))
                return;
            arrivalForm?.classList.add('time-keyboard-active');
            syncTimeKeyboardViewport();
            window.requestAnimationFrame(syncTimeKeyboardViewport);
            window.setTimeout(syncTimeKeyboardViewport, 180);
        };
        const handleProfileFocusOut = (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement) || !target.classList.contains('arrival-time-input'))
                return;
            window.setTimeout(() => {
                const active = document.activeElement;
                if (active instanceof HTMLElement && active.classList.contains('arrival-time-input'))
                    return;
                arrivalForm?.classList.remove('time-keyboard-active');
            }, 140);
        };
        profileFlow.addEventListener('focusin', handleProfileFocusIn);
        profileFlow.addEventListener('focusout', handleProfileFocusOut);
        window.visualViewport?.addEventListener('resize', syncTimeKeyboardViewport);
        window.visualViewport?.addEventListener('scroll', syncTimeKeyboardViewport);
        syncTimeKeyboardViewport();
        const style = document.createElement('style');
        style.dataset.profileFlowPolish = 'true';
        style.textContent = `
      /* Identity / Arrival questions live on the full-screen layer and are
         anchored to the top edge of the rendered Earth, never to the form. */
      .profile-flow .profile-prompt {
        position: absolute;
        top: var(--profile-prompt-bottom-y, calc(50% - 15.2dvh - 28px));
        left: 50%;
        z-index: 8;
        width: min(84vw, 500px);
        margin: 0;
        visibility: hidden;
        opacity: 0;
        color: rgba(239, 237, 230, 0.52) !important;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(15px, 3.8vw, 18px) !important;
        font-style: italic;
        font-weight: 400 !important;
        line-height: 1.35 !important;
        letter-spacing: 0.015em !important;
        text-align: center;
        text-shadow: 0 2px 20px rgba(0, 0, 0, 0.42) !important;
        transform: translate(-50%, -100%);
        text-wrap: balance;
        pointer-events: none;
        transition: opacity 260ms ease;
      }

      .profile-flow[data-step="identity"] .profile-prompt-identity,
      .profile-flow[data-step="arrival"] .profile-prompt-arrival {
        visibility: visible;
        opacity: 1;
      }

      /* Match the closed search/value capsules to the same translucent glass
         material as the custom calendar card instead of the old opaque black. */
      .profile-flow .profile-field,
      .profile-flow .profile-field-picker {
        border-color: rgba(var(--profile-energy-soft-rgb), 0.2) !important;
        background:
          linear-gradient(145deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.018) 44%, rgba(0, 0, 0, 0.09)),
          rgba(8, 12, 13, 0.48) !important;
        box-shadow:
          0 0 0 1px rgba(255, 255, 255, 0.025) inset,
          0 14px 38px rgba(0, 0, 0, 0.28),
          0 0 24px rgba(var(--profile-energy-rgb), 0.045) !important;
        backdrop-filter: blur(24px) saturate(1.16) brightness(1.025) !important;
        -webkit-backdrop-filter: blur(24px) saturate(1.16) brightness(1.025) !important;
      }

      /* Give the currently active capsule a clearer vessel-coloured bloom while
         keeping the glass body translucent. */
      .profile-flow .profile-field:focus-within,
      .profile-flow .profile-field-picker.is-open {
        border-color: rgba(var(--profile-energy-soft-rgb), 0.84) !important;
        background:
          linear-gradient(145deg, rgba(255, 255, 255, 0.095), rgba(var(--profile-energy-rgb), 0.035) 46%, rgba(0, 0, 0, 0.08)),
          rgba(8, 12, 13, 0.54) !important;
        box-shadow:
          0 0 0 1px rgba(var(--profile-energy-soft-rgb), 0.1) inset,
          0 15px 42px rgba(0, 0, 0, 0.3),
          0 0 20px rgba(var(--profile-energy-rgb), 0.3),
          0 0 48px rgba(var(--profile-energy-rgb), 0.2),
          0 0 78px rgba(var(--profile-energy-rgb), 0.1) !important;
      }

      /* The year number plus arrows already communicates that the year can be
         changed. Remove the extra prototype helper copy. */
      .profile-flow .arrival-period-hint {
        display: none !important;
      }

      .profile-flow .arrival-period-main.year-main {
        justify-content: center !important;
      }

      /* Quick :00 / :15 / :30 / :45 buttons are unnecessary once HH:MM can be
         entered directly. Keep the time editor visually minimal. */
      .profile-flow .arrival-time-quick-row {
        display: none !important;
      }

      .profile-flow .arrival-time-picker {
        padding-bottom: 16px !important;
      }

      /* When the soft keyboard is open, prioritize the time being edited. The
         date is already chosen and can temporarily disappear; the time row and
         HH:MM card stay inside the usable visual viewport instead of sitting
         behind the keyboard. */
      .profile-panel-arrival.time-keyboard-active {
        position: fixed !important;
        top: calc(var(--arrival-visible-top, 0px) + 10px) !important;
        bottom: auto !important;
        left: 50% !important;
        z-index: 760 !important;
        width: min(92vw, 510px) !important;
        max-height: calc(var(--arrival-visible-height, 100dvh) - 20px) !important;
        padding: 0 2px 8px !important;
        overflow-y: auto !important;
        transform: translateX(-50%) !important;
        overscroll-behavior: contain;
        scrollbar-width: none;
      }

      .profile-panel-arrival.time-keyboard-active::-webkit-scrollbar {
        display: none;
      }

      .profile-panel-arrival.time-keyboard-active .profile-fields-arrival {
        gap: 8px !important;
        margin: 0 !important;
      }

      .profile-panel-arrival.time-keyboard-active .profile-fields-arrival .profile-field-picker:first-child {
        display: none !important;
      }

      .profile-panel-arrival.time-keyboard-active .arrival-picker-host.is-open {
        max-height: none !important;
        margin-top: 8px !important;
        overflow: visible !important;
      }

      .profile-panel-arrival.time-keyboard-active .arrival-time-picker {
        padding: 12px 14px 14px !important;
      }

      .profile-panel-arrival.time-keyboard-active .arrival-time-caption {
        margin-bottom: 9px !important;
      }

      .profile-panel-arrival.time-keyboard-active .profile-actions {
        display: none !important;
      }

      .profile-flow:has(.profile-panel-arrival.time-keyboard-active) .profile-prompt-arrival {
        visibility: hidden !important;
        opacity: 0 !important;
      }

      /* The lower section contains only the fields and actions. */
      .profile-flow .profile-panel-identity .profile-fields,
      .profile-flow .profile-panel-arrival .profile-fields {
        margin-top: 0;
      }

      /* Keep the chosen vessel mark in the centre of the Earth through Identity / Arrival.
         Only the MALE / FEMALE / DO NOT DEFINE text label stays hidden. */
      .vessel-stage.is-profile-flow
        .vessel-orbit.is-focused
        .vessel-choice.is-focused
        .vessel-symbol {
        color: rgba(var(--vessel-energy-soft-rgb), 0.9) !important;
      }

      .vessel-stage.is-profile-flow
        .vessel-orbit.is-focused
        .vessel-choice.is-focused
        .vessel-glyph {
        opacity: 0.9 !important;
      }

      @media (max-width: 680px) {
        .profile-flow .profile-prompt {
          width: min(86vw, 420px);
          font-size: clamp(14px, 3.9vw, 17px) !important;
        }

        .profile-panel-arrival.time-keyboard-active {
          width: min(94vw, 430px) !important;
        }
      }

      @media (max-height: 690px) {
        .profile-flow .profile-prompt {
          font-size: 14px !important;
        }
      }
    `;
        document.head.append(style);
        window.addEventListener('pagehide', () => {
            promptObserver.disconnect();
            document.removeEventListener('click', guardPickerLabelActivation, true);
            profileFlow.removeEventListener('focusin', handleProfileFocusIn);
            profileFlow.removeEventListener('focusout', handleProfileFocusOut);
            window.visualViewport?.removeEventListener('resize', syncTimeKeyboardViewport);
            window.visualViewport?.removeEventListener('scroll', syncTimeKeyboardViewport);
            window.removeEventListener('resize', schedulePromptAnchor);
            vesselStage.removeEventListener('transitionend', schedulePromptAnchor);
            style.remove();
        }, { once: true });
    }
}
export {};
