const experience = document.getElementById('place-experience');
const vesselStage = document.getElementById('vessel-stage');
if (experience instanceof HTMLElement && vesselStage instanceof HTMLElement) {
    const profileFlow = vesselStage.querySelector('.profile-flow');
    const focusedEarth = () => vesselStage.querySelector('.vessel-orbit.is-focused .vessel-choice.is-focused .vessel-symbol');
    if (profileFlow instanceof HTMLElement) {
        /*
         * LAYER CONTRACT
         * --------------
         * 1. Earth rim/effect layer: visual only, locked to the captured globe geometry.
         * 2. Prompt layer: questions only.
         * 3. Controls layer: forms, capsules and navigation only.
         * 4. Picker layer: date/time overlays only.
         *
         * Nothing in a controls/picker layout is allowed to participate in the Earth
         * rim layout. Keyboard, picker and form changes therefore cannot resize or
         * move the globe treatment anymore.
         */
        const earthEffectsLayer = document.createElement('div');
        earthEffectsLayer.className = 'kt-layer kt-earth-effects-layer';
        earthEffectsLayer.setAttribute('aria-hidden', 'true');
        earthEffectsLayer.innerHTML = '<div class="kt-earth-rim"></div>';
        const promptLayer = document.createElement('div');
        promptLayer.className = 'kt-layer kt-prompt-layer';
        const controlsLayer = document.createElement('div');
        controlsLayer.className = 'kt-layer kt-controls-layer';
        const pickerLayer = document.createElement('div');
        pickerLayer.className = 'kt-layer kt-picker-layer';
        pickerLayer.dataset.pickerMode = 'none';
        vesselStage.append(earthEffectsLayer);
        profileFlow.append(promptLayer, controlsLayer, pickerLayer);
        for (const prompt of [...profileFlow.querySelectorAll('.profile-prompt')]) {
            promptLayer.append(prompt);
        }
        const identityPanel = profileFlow.querySelector('.profile-panel-identity');
        const arrivalPanel = profileFlow.querySelector('.profile-panel-arrival');
        const completePanel = profileFlow.querySelector('.profile-panel-complete');
        for (const panel of [identityPanel, arrivalPanel, completePanel]) {
            if (panel instanceof HTMLElement)
                controlsLayer.append(panel);
        }
        const pickerHost = profileFlow.querySelector('.arrival-picker-host');
        if (pickerHost instanceof HTMLElement)
            pickerLayer.append(pickerHost);
        let geometryLocked = false;
        let lockedViewportWidth = 0;
        let captureFrame = 0;
        const clearCapture = () => {
            if (captureFrame)
                window.cancelAnimationFrame(captureFrame);
            captureFrame = 0;
        };
        const clearGeometry = () => {
            clearCapture();
            geometryLocked = false;
            lockedViewportWidth = 0;
            vesselStage.style.removeProperty('--kt-earth-rim-x');
            vesselStage.style.removeProperty('--kt-earth-rim-y');
            vesselStage.style.removeProperty('--kt-earth-rim-size');
            vesselStage.style.removeProperty('--kt-earth-rim-top-y');
        };
        const captureEarthGeometry = (force = false) => {
            if (!vesselStage.classList.contains('is-profile-flow'))
                return;
            if (geometryLocked && !force)
                return;
            clearCapture();
            captureFrame = window.requestAnimationFrame(() => {
                captureFrame = 0;
                const earth = focusedEarth();
                if (!(earth instanceof HTMLElement))
                    return;
                const stageRect = vesselStage.getBoundingClientRect();
                const earthRect = earth.getBoundingClientRect();
                if (stageRect.width <= 0 || stageRect.height <= 0 || earthRect.width <= 0 || earthRect.height <= 0)
                    return;
                const diameter = Math.min(earthRect.width, earthRect.height);
                const centerX = earthRect.left - stageRect.left + (earthRect.width / 2);
                const centerY = earthRect.top - stageRect.top + (earthRect.height / 2);
                const topY = centerY - (diameter / 2);
                vesselStage.style.setProperty('--kt-earth-rim-x', `${centerX.toFixed(2)}px`);
                vesselStage.style.setProperty('--kt-earth-rim-y', `${centerY.toFixed(2)}px`);
                vesselStage.style.setProperty('--kt-earth-rim-size', `${diameter.toFixed(2)}px`);
                vesselStage.style.setProperty('--kt-earth-rim-top-y', `${topY.toFixed(2)}px`);
                geometryLocked = true;
                lockedViewportWidth = window.innerWidth;
            });
        };
        const syncProfileState = () => {
            const active = vesselStage.classList.contains('is-profile-flow');
            earthEffectsLayer.classList.toggle('is-active', active);
            if (active) {
                if (!geometryLocked) {
                    captureEarthGeometry();
                    window.setTimeout(() => captureEarthGeometry(true), 260);
                }
            }
            else if (geometryLocked) {
                clearGeometry();
            }
        };
        const syncPickerMode = () => {
            if (!(pickerHost instanceof HTMLElement) || !pickerHost.classList.contains('is-open')) {
                pickerLayer.dataset.pickerMode = 'none';
                return;
            }
            if (pickerHost.querySelector('.arrival-date-picker') instanceof HTMLElement) {
                pickerLayer.dataset.pickerMode = 'date';
                return;
            }
            if (pickerHost.querySelector('.arrival-time-picker') instanceof HTMLElement) {
                pickerLayer.dataset.pickerMode = 'time';
                return;
            }
            pickerLayer.dataset.pickerMode = 'none';
        };
        /*
         * THE KEYBOARD FLAG IS READ, NOT RE-DERIVED.
         *
         * This used to compute its own: `window.innerHeight - visualViewport.height
         * > 140`. That is the exact test onboardingKeyboardViewport had already
         * abandoned, and it is wrong here for the same reason - this page declares
         * `interactive-widget=resizes-content`, under which the LAYOUT viewport
         * shrinks with the keyboard too, so window.innerHeight tracks the visual
         * viewport down and the difference converges to about zero.
         *
         * It appeared to work only because of a race: on the first resize event the
         * visual viewport has already shrunk while window.innerHeight has not caught
         * up, so the difference is briefly large and the flag goes true. Any LATER
         * resize or scroll - a second keyboard open, a focus move between the hour
         * and minute fields, the browser settling - recomputes it after
         * window.innerHeight has caught up, gets ~0, and silently REMOVES the class.
         * The picker then drops back behind the keyboard. That is the "sometimes,
         * after editing again" bug exactly.
         *
         * onboardingKeyboardViewport already solves this properly, by comparing
         * against the tallest height ever seen at this width - a maximum, which a
         * keyboard can only shrink and which therefore cannot race. It publishes the
         * answer as data-keyboard-open and --kt-keyboard-top. Consuming that is both
         * correct and removes a second source of truth.
         */
        const syncVisualViewport = () => {
            const viewport = window.visualViewport;
            const top = viewport?.offsetTop ?? 0;
            const height = viewport?.height ?? window.innerHeight;
            const keyboardOpen = experience?.dataset.keyboardOpen === 'true';
            profileFlow.style.setProperty('--kt-vv-top', `${top.toFixed(2)}px`);
            profileFlow.style.setProperty('--kt-vv-height', `${height.toFixed(2)}px`);
            pickerLayer.classList.toggle('is-keyboard-open', keyboardOpen);
            if (geometryLocked
                && Math.abs(window.innerWidth - lockedViewportWidth) > 24) {
                captureEarthGeometry(true);
            }
        };
        const stateObserver = new MutationObserver(syncProfileState);
        stateObserver.observe(vesselStage, { attributes: true, attributeFilter: ['class'] });
        const pickerObserver = pickerHost instanceof HTMLElement
            ? new MutationObserver(syncPickerMode)
            : null;
        pickerObserver?.observe(pickerHost, {
            attributes: true,
            attributeFilter: ['class'],
            childList: true,
            subtree: true,
        });
        const style = document.createElement('style');
        style.dataset.onboardingLayerArchitecture = 'true';
        style.textContent = `
      /* Root profile container is no longer a layout engine. Each child layer owns
         its own coordinate system so editing one surface cannot reflow another. */
      .vessel-stage .profile-flow {
        position: absolute !important;
        inset: 0 !important;
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        overflow: hidden !important;
        pointer-events: none !important;
        contain: layout style !important;
      }

      .kt-layer {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        contain: layout style;
      }

      /* EARTH EFFECT LAYER — locked visual asset. No form/picker selectors below
         are allowed to target this element. It has no fill, therefore it can never
         darken or mask the live Google Earth underneath. */
      .kt-earth-effects-layer {
        z-index: 455;
        visibility: hidden;
        opacity: 0;
        pointer-events: none;
        transition: opacity 900ms cubic-bezier(.22,.61,.36,1), visibility 0s linear 900ms;
      }

      .kt-earth-effects-layer.is-active {
        visibility: visible;
        opacity: 1;
        transition-delay: 0s;
      }

      .kt-earth-rim {
        position: absolute;
        top: var(--kt-earth-rim-y, 50%);
        left: var(--kt-earth-rim-x, 50%);
        width: var(--kt-earth-rim-size, 30.4dvh);
        height: var(--kt-earth-rim-size, 30.4dvh);
        box-sizing: border-box;
        border: 1px solid rgba(248, 252, 255, .96);
        border-radius: 50%;
        background: transparent;
        transform: translate(-50%, -50%);
        box-shadow:
          0 0 2px rgba(255,255,255,.92),
          0 0 10px rgba(var(--kt-layer-energy-soft-rgb, 255,255,255),.58),
          0 0 30px rgba(var(--kt-layer-energy-rgb, 255,255,255),.36),
          0 0 68px rgba(var(--kt-layer-energy-rgb, 255,255,255),.18);
        transition: border-color 900ms ease, box-shadow 1100ms ease;
      }

      /*
       * THE RIM IS NOW MEASUREMENT-ONLY.
       *
       * This rim existed to stand in for .kt-vessel-glow-ring, which used to be
       * hidden from IDENTITY onwards because it was sized to the carousel and
       * would have sat at the wrong radius once the carousel was replaced. The
       * ring is now sized to the Earth itself and mounted on the stage, outside
       * the chrome that the profile and pillar stages fade, so it survives every
       * screen and is the single atmosphere for the whole app.
       *
       * That makes this rim a duplicate, and a misaligned one: it is sized from
       * --kt-earth-rim-size, which is the focused vessel bubble at 109% of the
       * Earth, so it drew about 11px outside the limb. Painting it as well as the
       * ring is exactly the second floating circle the atmosphere work removed.
       * So it stops painting and keeps its other job - the geometry it captures
       * still feeds --kt-earth-rim-top-y, which anchors the prompt text.
       */
      .kt-earth-rim {
        border-color: transparent;
        box-shadow: none;
      }

      /*
       * THE LAYER'S COLOUR FOLLOWS data-vessel-glow, NOT data-vessel-selection.
       *
       * These are custom properties, and custom properties do not transition.
       * Pointed at the selection they changed the instant the selection did -
       * at the START of a swap, while the vessel being left was still on screen
       * - so the colour could only ever snap. data-vessel-glow is written by
       * vesselArrowOnlyPolish (the swap conductor) at the one moment the layer
       * is at zero, so the same change happens where nobody can see it. The
       * selection itself is untouched: it has six writers and the profile flow
       * commits the chosen vessel from it.
       */
      .place-experience[data-vessel-glow="male"] .kt-earth-effects-layer {
        --kt-layer-energy-rgb: 104, 184, 255;
        --kt-layer-energy-soft-rgb: 182, 224, 255;
      }

      .place-experience[data-vessel-glow="female"] .kt-earth-effects-layer {
        --kt-layer-energy-rgb: 255, 118, 154;
        --kt-layer-energy-soft-rgb: 255, 164, 184;
      }

      .place-experience[data-vessel-glow="undefined"] .kt-earth-effects-layer {
        --kt-layer-energy-rgb: 250, 252, 255;
        --kt-layer-energy-soft-rgb: 255, 255, 255;
      }

      /*
       * ...AND ITS OPACITY MOVES ON THE CONDUCTOR'S CLOCK.
       *
       * --kt-vessel-swap-ms is published onto the vessel stage by the conductor,
       * so this duration and the JS tweens are the same number by construction.
       * "out" drives it to zero; the hidden moment recolours it and flips the
       * phase to "in", and with no opacity rule for that phase it returns to the
       * .is-active value of 1 over the identical duration. The class is removed
       * when the sequence ends, handing the layer back to its own 900ms reveal
       * transition with opacity already at 1, so nothing jumps.
       */
      .vessel-stage.is-vessel-swapping .kt-earth-effects-layer.is-active {
        /* cubic-bezier(.5,0,.5,1) IS the conductor's smoothstep, p*p*(3-2p), so
           this layer does not merely start and finish with the rest - it sits on
           the same curve the whole way. */
        transition: opacity var(--kt-vessel-swap-ms, 2000ms) cubic-bezier(.5, 0, .5, 1);
      }

      .vessel-stage.is-vessel-swapping[data-vessel-swap-phase="out"]
        .kt-earth-effects-layer.is-active {
        opacity: 0;
      }

      /* The old focused vessel bubble was doing two jobs at once: selector +
         profile rim. In profile mode it is now measurement-only and invisible;
         the dedicated rim above is the sole visible atmosphere layer. */
      .vessel-stage.is-profile-flow
        .vessel-orbit.is-focused
        .vessel-choice.is-focused {
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }

      /* PROMPT LAYER — text only, anchored to the locked Earth geometry. */
      .kt-prompt-layer {
        z-index: 560;
        pointer-events: none;
      }

      .profile-flow .kt-prompt-layer .profile-prompt {
        position: absolute !important;
        top: calc(var(--kt-earth-rim-top-y, 34%) - 24px) !important;
        left: 50% !important;
        width: min(86vw, 500px) !important;
        margin: 0 !important;
        transform: translate(-50%, -100%) !important;
      }

      /* CONTROLS LAYER — form capsules and navigation only. Its geometry is
         independent from the rim and from the picker overlay. */
      .kt-controls-layer {
        z-index: 610;
        pointer-events: none;
      }

      .profile-flow .kt-controls-layer .profile-panel {
        position: absolute !important;
        right: auto !important;
        bottom: max(calc(var(--safe-bottom) + 24px), 4vh) !important;
        left: 50% !important;
        width: var(--kt-control-width, min(88vw, 510px)) !important;
        max-width: var(--kt-control-width, min(88vw, 510px)) !important;
        margin: 0 !important;
        padding: 0 !important;
        transform: translateX(-50%) !important;
        contain: layout style;
      }

      .profile-flow[data-step="identity"] .kt-controls-layer .profile-panel-identity,
      .profile-flow[data-step="arrival"] .kt-controls-layer .profile-panel-arrival,
      .profile-flow[data-step="complete"] .kt-controls-layer .profile-panel-complete {
        pointer-events: auto !important;
      }

      /* PICKER LAYER — a portal for date/time editors. It overlaps the control
         layer but never takes part in its layout, and never touches the Earth rim. */
      .kt-picker-layer {
        z-index: 730;
        pointer-events: none;
      }

      .profile-flow .kt-picker-layer .arrival-picker-host {
        position: absolute !important;
        top: auto !important;
        right: auto !important;
        left: 50% !important;
        z-index: 1 !important;
        width: var(--kt-control-width, min(88vw, 510px)) !important;
        max-width: var(--kt-control-width, min(88vw, 510px)) !important;
        max-height: none !important;
        margin: 0 !important;
        overflow: visible !important;
        opacity: 0 !important;
        transform: translateX(-50%) !important;
        pointer-events: none !important;
      }

      .profile-flow .kt-picker-layer .arrival-picker-host.is-open {
        opacity: 1 !important;
        pointer-events: auto !important;
      }

      /*
       * ONE PANEL, IN ONE PLACE, FOR BOTH PICKERS.
       *
       * The date picker opens as a card of glass the width of the controls,
       * resting on the field list. The time picker used to open as its own
       * narrower overlay - min(72vw, 320px) of loose capsules with no card
       * behind them at all - 86px higher up, so the two did not read as the
       * same component and the fields underneath competed with the clock.
       *
       * They now share the host's width and the same bottom edge, which is the
       * top of the field row below the one being edited. Only the CONTENTS
       * differ, so only the height does: the date's calendar is tall, the
       * clock is short, and each panel is as tall as what it holds.
       */
      .kt-picker-layer[data-picker-mode="date"] .arrival-picker-host,
      .kt-picker-layer[data-picker-mode="time"] .arrival-picker-host {
        bottom: calc(max(var(--safe-bottom), 0px) + var(--kt-action-height, 50px) + var(--kt-control-gap, 10px)) !important;
      }

      .kt-picker-layer[data-picker-mode="date"] .arrival-date-picker,
      .kt-picker-layer[data-picker-mode="time"] .arrival-time-picker {
        width: 100% !important;
        max-height: min(72dvh, 720px) !important;
        margin: 0 !important;
        overflow-y: auto !important;
      }

      .kt-picker-layer[data-picker-mode="time"] .arrival-time-entry {
        display: grid !important;
        grid-template-columns: minmax(0, 1fr) 18px minmax(0, 1fr) !important;
        gap: 8px !important;
        width: 100% !important;
        margin: 0 !important;
        align-items: center !important;
      }

      .kt-picker-layer[data-picker-mode="time"] .arrival-time-input {
        width: 100% !important;
        height: 50px !important;
        min-height: 50px !important;
        padding: 0 12px !important;
        border-radius: 999px !important;
        font-size: 24px !important;
      }

      /* Keyboard positioning is applied only to the picker portal. The controls,
         Earth, rim and prompt keep their original coordinates. */
      /* Anchored to the KEYBOARD'S OWN TOP EDGE, published by
         onboardingKeyboardViewport, rather than reconstructed from the visual
         viewport's top plus its height minus a hand-tuned 62px. That 62 was a
         guess at the editor's height; --kt-keyboard-gap is an explicit gap, and
         translateY(-100%) lifts the editor fully clear of the keyboard whatever
         its own height turns out to be. */
      .kt-picker-layer[data-picker-mode="time"].is-keyboard-open .arrival-picker-host {
        position: fixed !important;
        top: calc(var(--kt-keyboard-top, var(--kt-vv-height, 100dvh))
          - var(--kt-keyboard-gap, 12px)) !important;
        bottom: auto !important;
        left: 50% !important;
        transform: translate(-50%, -100%) !important;
      }

      .kt-picker-layer[data-picker-mode="time"].is-keyboard-open ~ * {
        /* intentionally empty: the picker never reflows sibling layers */
      }

      /* Retire the old whole-form keyboard transform. Only the picker portal may
         react to the Android visual viewport now. */
      .profile-flow .profile-panel-arrival.time-keyboard-active {
        position: absolute !important;
        top: auto !important;
        right: auto !important;
        bottom: max(calc(var(--safe-bottom) + 24px), 4vh) !important;
        left: 50% !important;
        width: var(--kt-control-width, min(88vw, 510px)) !important;
        max-width: var(--kt-control-width, min(88vw, 510px)) !important;
        max-height: none !important;
        padding: 0 !important;
        overflow: visible !important;
        transform: translateX(-50%) !important;
      }

      .profile-flow .profile-panel-arrival.time-keyboard-active .profile-fields-arrival,
      .profile-flow .profile-panel-arrival.time-keyboard-active .profile-actions {
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }

      @media (max-width: 680px) {
        .profile-flow .kt-controls-layer .profile-panel {
          width: min(88vw, 430px) !important;
          max-width: min(88vw, 430px) !important;
        }

        .profile-flow .kt-picker-layer .arrival-picker-host {
          width: min(88vw, 430px) !important;
          max-width: min(88vw, 430px) !important;
        }
      }
    `;
        document.head.append(style);
        syncPickerMode();
        syncProfileState();
        syncVisualViewport();
        /* The authoritative flag can change without any viewport event this module
           hears - it is set from the keyboard module's own resting-height logic - so
           the attribute is watched directly. This is also what makes a REOPEN
           reposition: the flag goes false on close and true again on the next open,
           and each transition re-runs the sync. */
        const keyboardFlagObserver = experience instanceof HTMLElement
            ? new MutationObserver(syncVisualViewport)
            : null;
        keyboardFlagObserver?.observe(experience, {
            attributes: true,
            attributeFilter: ['data-keyboard-open', 'data-keyboard-top'],
        });
        /* Moving between the hour and minute fields can change the keyboard's height
           on some Android keyboards (a suggestion strip appearing or going). */
        document.addEventListener('focusin', (event) => {
            const target = event.target;
            if (target instanceof Element && target.closest('.arrival-time-input')) {
                syncVisualViewport();
            }
        });
        window.visualViewport?.addEventListener('resize', syncVisualViewport);
        window.visualViewport?.addEventListener('scroll', syncVisualViewport);
        window.addEventListener('resize', syncVisualViewport);
        window.addEventListener('pagehide', (event) => {
            if (event.persisted)
                return;
            clearGeometry();
            stateObserver.disconnect();
            pickerObserver?.disconnect();
            keyboardFlagObserver?.disconnect();
            window.visualViewport?.removeEventListener('resize', syncVisualViewport);
            window.visualViewport?.removeEventListener('scroll', syncVisualViewport);
            window.removeEventListener('resize', syncVisualViewport);
            earthEffectsLayer.remove();
            style.remove();
        }, { once: true });
    }
}
export {};
