import { t } from './app/i18n/uiStrings.js?v=d9f39e7';
const experience = document.getElementById('place-experience');
const vesselStage = document.getElementById('vessel-stage');
const vesselOrbit = document.getElementById('vessel-orbit');
const confirmVessel = document.getElementById('confirm-vessel');
if (experience instanceof HTMLElement
    && vesselStage instanceof HTMLElement
    && vesselOrbit instanceof HTMLElement
    && confirmVessel instanceof HTMLButtonElement) {
    const allChoices = [...vesselOrbit.querySelectorAll('.vessel-choice')];
    const male = allChoices.find((choice) => choice.dataset.vessel === 'male');
    const undefinedChoice = allChoices.find((choice) => choice.dataset.vessel === 'undefined');
    const female = allChoices.find((choice) => choice.dataset.vessel === 'female');
    if (male && undefinedChoice && female) {
        // Keep one live Earth in one fixed position. Vessel changes only swap the
        // attached colour/symbol treatment; the globe itself never moves or resizes.
        const choices = [male, undefinedChoice, female];
        const transitionDurationMillis = 440;
        let activeIndex = 1;
        let transitionLocked = false;
        let settleTimer = 0;
        vesselOrbit.classList.add('is-arrow-carousel');
        vesselOrbit.setAttribute('aria-label', t('onb.vessel.selectionAria'));
        for (const choice of choices) {
            choice.tabIndex = -1;
            choice.style.pointerEvents = 'none';
            choice.classList.remove('is-focused');
        }
        const nav = document.createElement('div');
        nav.className = 'vessel-carousel-nav';
        nav.setAttribute('aria-label', t('onb.vessel.changeSelectionAria'));
        const previous = document.createElement('button');
        previous.type = 'button';
        previous.className = 'vessel-carousel-arrow vessel-carousel-arrow-left';
        previous.setAttribute('aria-label', t('onb.vessel.previousAria'));
        const swipeLabel = document.createElement('span');
        swipeLabel.className = 'vessel-carousel-swipe-label';
        swipeLabel.textContent = 'Swipe';
        swipeLabel.setAttribute('aria-hidden', 'true');
        const next = document.createElement('button');
        next.type = 'button';
        next.className = 'vessel-carousel-arrow vessel-carousel-arrow-right';
        next.setAttribute('aria-label', t('onb.vessel.nextAria'));
        nav.append(previous, swipeLabel, next);
        vesselStage.append(nav);
        const style = document.createElement('style');
        style.dataset.vesselArrowCarousel = 'true';
        style.textContent = `
      /* Keep the live Earth considerably brighter than the old vessel veil. */
      .place-experience.vessel-active .earth-map {
        opacity: 0.62 !important;
        transition: opacity 650ms cubic-bezier(0.16, 0.72, 0.22, 1) !important;
      }

      /* One fixed circular vessel treatment is locked to the Earth's measured
         diameter. No side bubbles and no geometry change between genders. */
      .vessel-orbit.is-arrow-carousel {
        width: var(--vessel-earth-diameter, 30.4dvh) !important;
        height: var(--vessel-earth-diameter, 30.4dvh) !important;
        aspect-ratio: 1 / 1 !important;
        margin: 0 !important;
        cursor: grab !important;
        touch-action: pan-y !important;
        pointer-events: auto !important;
        perspective: none !important;
      }

      .vessel-orbit.is-arrow-carousel:active {
        cursor: grabbing !important;
      }

      .vessel-orbit.is-arrow-carousel::before,
      .vessel-orbit.is-arrow-carousel::after {
        display: none !important;
        opacity: 0 !important;
      }

      .vessel-orbit.is-arrow-carousel .vessel-choice {
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        aspect-ratio: 1 / 1 !important;
        min-width: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        pointer-events: none !important;
        transform: translate(-50%, -50%) !important;
        transform-style: flat !important;
        backface-visibility: visible !important;
        transition:
          opacity ${transitionDurationMillis}ms cubic-bezier(0.16, 0.72, 0.22, 1),
          filter ${transitionDurationMillis}ms ease !important;
      }

      .vessel-orbit.is-arrow-carousel .vessel-choice[data-carousel-slot="hidden"] {
        z-index: 1 !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }

      .vessel-orbit.is-arrow-carousel .vessel-choice[data-carousel-slot="incoming"] {
        z-index: 118 !important;
        visibility: visible !important;
        opacity: 0 !important;
        filter: brightness(0.94) !important;
      }

      .vessel-orbit.is-arrow-carousel .vessel-choice[data-carousel-slot="outgoing"] {
        z-index: 119 !important;
        visibility: visible !important;
        opacity: 0 !important;
        filter: brightness(1.02) !important;
      }

      .vessel-orbit.is-arrow-carousel .vessel-choice[data-carousel-slot="active"] {
        z-index: 120 !important;
        visibility: visible !important;
        opacity: 1 !important;
        filter: none !important;
      }

      .vessel-orbit.is-arrow-carousel .vessel-choice .vessel-symbol {
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        aspect-ratio: 1 / 1 !important;
        max-width: none !important;
        margin: 0 !important;
        overflow: visible !important;
        border: 1.5px solid rgba(var(--vessel-energy-soft-rgb), 0.96) !important;
        border-radius: 50% !important;
        color: rgba(var(--vessel-energy-soft-rgb), 0.98) !important;
        background: transparent !important;
        background-color: transparent !important;
        background-image: none !important;
        animation: none !important;
        box-shadow:
          0 0 2px rgba(255, 255, 255, 0.98),
          0 0 8px rgba(255, 255, 255, 0.66),
          0 0 20px rgba(var(--vessel-energy-rgb), 0.68),
          0 0 42px rgba(var(--vessel-energy-rgb), 0.40),
          0 0 74px rgba(var(--vessel-energy-rgb), 0.20) !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        transition:
          border-color ${transitionDurationMillis}ms ease,
          color ${transitionDurationMillis}ms ease,
          box-shadow ${transitionDurationMillis}ms cubic-bezier(0.16, 0.72, 0.22, 1) !important;
      }

      .vessel-orbit.is-arrow-carousel .vessel-choice .vessel-symbol::before,
      .vessel-orbit.is-arrow-carousel .vessel-choice .vessel-symbol::after {
        display: none !important;
      }

      .vessel-orbit.is-arrow-carousel .vessel-choice .vessel-glyph {
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        width: 23% !important;
        height: 23% !important;
        overflow: visible !important;
        transform: translate(-50%, -50%) !important;
        filter:
          drop-shadow(0 0 4px rgba(255, 255, 255, 0.24))
          drop-shadow(0 0 9px rgba(var(--vessel-energy-rgb), 0.28)) !important;
        transition: opacity 300ms ease, filter ${transitionDurationMillis}ms ease !important;
      }

      /* Give the gender label noticeably more breathing room below the rim. */
      .vessel-orbit.is-arrow-carousel .vessel-choice .vessel-label {
        position: absolute !important;
        top: calc(100% + 25px) !important;
        left: 50% !important;
        width: max-content !important;
        max-width: 72vw !important;
        margin: 0 !important;
        opacity: 1 !important;
        transform: translateX(-50%) !important;
        color: rgba(var(--vessel-energy-soft-rgb), 0.98) !important;
        font-size: 12px !important;
        font-weight: 700 !important;
        line-height: 1 !important;
        letter-spacing: 0.22em !important;
        text-align: center !important;
        text-transform: uppercase !important;
        text-shadow:
          0 0 8px rgba(var(--vessel-energy-rgb), 0.36),
          0 0 18px rgba(var(--vessel-energy-rgb), 0.18) !important;
        transition:
          color ${transitionDurationMillis}ms ease,
          text-shadow ${transitionDurationMillis}ms ease !important;
      }

      /* The entire strip between the arrows is a swipe surface, not merely the
         globe itself. This matches the visible SWIPE cue. */
      .vessel-carousel-nav {
        position: absolute;
        top: calc(
          var(--vessel-earth-center-y, 50%)
          + (var(--vessel-earth-diameter, 30.4dvh) / 2)
          + 91px
        );
        left: var(--vessel-earth-center-x, 50%);
        z-index: 460;
        display: grid;
        grid-template-columns: 56px 1fr 56px;
        width: min(76vw, 430px);
        min-height: 52px;
        align-items: center;
        pointer-events: auto;
        touch-action: pan-y;
        cursor: grab;
        transform: translate(-50%, -50%);
        -webkit-tap-highlight-color: transparent;
      }

      .vessel-carousel-nav:active {
        cursor: grabbing;
      }

      .vessel-carousel-swipe-label {
        justify-self: center;
        pointer-events: none;
        color: rgba(244, 241, 233, 0.42);
        font-size: 9px;
        font-weight: 650;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        text-shadow: 0 0 12px rgba(255, 255, 255, 0.06);
      }

      .vessel-carousel-arrow {
        position: relative;
        width: 56px;
        height: 44px;
        padding: 0;
        border: 0;
        outline: 0;
        opacity: 0.72;
        pointer-events: auto;
        cursor: pointer;
        background: transparent;
        -webkit-tap-highlight-color: transparent;
        transition: opacity 180ms ease, transform 180ms ease;
      }

      .vessel-carousel-arrow-left { justify-self: start; }
      .vessel-carousel-arrow-right { justify-self: end; }

      .vessel-carousel-arrow::before {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 12px;
        height: 12px;
        content: "";
        border-top: 1.5px solid rgba(244, 241, 233, 0.86);
        border-left: 1.5px solid rgba(244, 241, 233, 0.86);
        filter: drop-shadow(0 0 6px rgba(244, 241, 233, 0.16));
      }

      .vessel-carousel-arrow-left::before {
        transform: translate(-35%, -50%) rotate(-45deg);
      }

      .vessel-carousel-arrow-right::before {
        transform: translate(-65%, -50%) rotate(135deg);
      }

      .vessel-carousel-arrow:hover,
      .vessel-carousel-arrow:focus-visible {
        opacity: 1;
        transform: scale(1.08);
      }

      .vessel-carousel-arrow:focus-visible {
        outline: 1px solid rgba(244, 241, 233, 0.28);
        outline-offset: -8px;
        border-radius: 999px;
      }

      .vessel-stage.is-profile-flow .vessel-carousel-nav {
        display: none !important;
      }

      .vessel-stage.is-profile-flow
        .vessel-orbit.is-arrow-carousel
        .vessel-choice:not(.is-focused) {
        visibility: hidden !important;
        opacity: 0 !important;
      }

      /* Confirmation must preserve exactly the same circle and glow as the
         selection state. Do not let the older focused-state CSS turn it into a
         different-sized ellipse or a stronger white halo. */
      .vessel-stage.is-profile-flow
        .vessel-orbit.is-arrow-carousel.is-focused
        .vessel-choice.is-focused {
        width: var(--vessel-earth-diameter, 30.4dvh) !important;
        height: var(--vessel-earth-diameter, 30.4dvh) !important;
        aspect-ratio: 1 / 1 !important;
        /* The profile's separate Earth atmosphere replaces this choice.
           Leaving it visible paints a second dark WebKit-composited disc over
           the real planet and over the identity/date controls. */
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        filter: none !important;
        transform: translate(-50%, -50%) !important;
      }

      .vessel-stage.is-profile-flow
        .vessel-orbit.is-arrow-carousel.is-focused
        .vessel-choice.is-focused
        .vessel-symbol {
        width: 100% !important;
        height: 100% !important;
        aspect-ratio: 1 / 1 !important;
        border: 1.5px solid rgba(var(--vessel-energy-soft-rgb), 0.96) !important;
        border-radius: 50% !important;
        color: transparent !important;
        font-size: 0 !important;
        background: transparent !important;
        background-color: transparent !important;
        background-image: none !important;
        box-shadow:
          0 0 2px rgba(255, 255, 255, 0.98),
          0 0 8px rgba(255, 255, 255, 0.66),
          0 0 20px rgba(var(--vessel-energy-rgb), 0.68),
          0 0 42px rgba(var(--vessel-energy-rgb), 0.40),
          0 0 74px rgba(var(--vessel-energy-rgb), 0.20) !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
      }

      .vessel-stage.is-profile-flow
        .vessel-orbit.is-arrow-carousel.is-focused
        .vessel-choice.is-focused
        .vessel-label {
        opacity: 0 !important;
      }

      .vessel-stage.is-profile-flow
        .vessel-orbit.is-arrow-carousel.is-focused
        .vessel-choice.is-focused
        .vessel-glyph,
      .vessel-stage.is-profile-flow
        .vessel-orbit.is-arrow-carousel.is-focused
        .vessel-choice.is-focused
        .vessel-symbol > * {
        visibility: hidden !important;
        opacity: 0 !important;
      }

      @media (max-height: 760px) {
        .vessel-orbit.is-arrow-carousel .vessel-choice .vessel-label {
          top: calc(100% + 21px) !important;
        }

        .vessel-carousel-nav {
          top: calc(
            var(--vessel-earth-center-y, 50%)
            + (var(--vessel-earth-diameter, 30.4dvh) / 2)
            + 81px
          );
        }
      }
    `;
        document.head.append(style);
        const syncSelectionMetadata = () => {
            choices.forEach((choice, index) => {
                const isActive = index === activeIndex;
                choice.classList.toggle('is-carousel-active', isActive);
                choice.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            });
            const activeChoice = choices[activeIndex];
            const vessel = activeChoice.dataset.vessel ?? 'undefined';
            experience.dataset.vesselSelection = vessel;
            if (!vesselStage.classList.contains('is-profile-flow')) {
                confirmVessel.disabled = false;
                confirmVessel.textContent = t('onb.vessel.confirm');
            }
        };
        const renderInitial = () => {
            choices.forEach((choice, index) => {
                choice.dataset.carouselSlot = index === activeIndex ? 'active' : 'hidden';
            });
            syncSelectionMetadata();
        };
        const move = (delta) => {
            if (vesselStage.classList.contains('is-profile-flow') || transitionLocked)
                return;
            const previousIndex = activeIndex;
            const nextIndex = (activeIndex + delta + choices.length) % choices.length;
            if (nextIndex === previousIndex)
                return;
            transitionLocked = true;
            window.clearTimeout(settleTimer);
            const previousChoice = choices[previousIndex];
            const nextChoice = choices[nextIndex];
            for (const choice of choices) {
                if (choice !== previousChoice && choice !== nextChoice)
                    choice.dataset.carouselSlot = 'hidden';
            }
            // Make the new colour/glow visible at zero opacity first, then cross-fade
            // both fully overlapping circles on the next frame. This removes the hard
            // colour pop that occurred when visibility changed instantly.
            nextChoice.dataset.carouselSlot = 'incoming';
            void nextChoice.offsetWidth;
            activeIndex = nextIndex;
            syncSelectionMetadata();
            window.requestAnimationFrame(() => {
                previousChoice.dataset.carouselSlot = 'outgoing';
                nextChoice.dataset.carouselSlot = 'active';
            });
            settleTimer = window.setTimeout(() => {
                if (choices[activeIndex] !== nextChoice)
                    return;
                previousChoice.dataset.carouselSlot = 'hidden';
                transitionLocked = false;
            }, transitionDurationMillis + 40);
            window.dispatchEvent(new CustomEvent('knowthyself:vessel-carousel-change', {
                detail: { vessel: choices[activeIndex].dataset.vessel ?? 'undefined' },
            }));
        };
        previous.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            move(-1);
        });
        next.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            move(1);
        });
        const attachSwipeSurface = (surface) => {
            let swipePointerId = null;
            let swipeStartX = 0;
            let swipeStartY = 0;
            let startedOnButton = false;
            surface.addEventListener('pointerdown', (event) => {
                if (vesselStage.classList.contains('is-profile-flow'))
                    return;
                swipePointerId = event.pointerId;
                swipeStartX = event.clientX;
                swipeStartY = event.clientY;
                startedOnButton = event.target instanceof Element && Boolean(event.target.closest('button'));
                if (!startedOnButton)
                    surface.setPointerCapture?.(event.pointerId);
            });
            surface.addEventListener('pointerup', (event) => {
                if (event.pointerId !== swipePointerId)
                    return;
                const deltaX = event.clientX - swipeStartX;
                const deltaY = event.clientY - swipeStartY;
                const ignoreGesture = startedOnButton;
                swipePointerId = null;
                startedOnButton = false;
                try {
                    surface.releasePointerCapture?.(event.pointerId);
                }
                catch {
                    // Some Android WebViews release pointer capture before pointerup.
                }
                if (ignoreGesture)
                    return;
                if (Math.abs(deltaX) < 38 || Math.abs(deltaX) < Math.abs(deltaY) * 1.1)
                    return;
                move(deltaX < 0 ? 1 : -1);
            });
            /* A cancelled pointer must give the capture back, exactly as pointerup
               does. WebKit cancels far more eagerly than a desktop engine - a system
               gesture, a second finger, the keyboard arriving - and a capture left
               behind keeps routing later touches to this surface, so the next taps
               land nowhere. The orbit drag already releases on cancel; this is the
               same contract. */
            const endSwipe = (event) => {
                if (event.pointerId !== swipePointerId)
                    return;
                swipePointerId = null;
                startedOnButton = false;
                try {
                    if (surface.hasPointerCapture?.(event.pointerId)) {
                        surface.releasePointerCapture?.(event.pointerId);
                    }
                }
                catch {
                    // Some engines have already released it by the time cancel arrives.
                }
            };
            surface.addEventListener('pointercancel', endSwipe);
            /* The capture can also be taken away without a cancel ever arriving, and
               the local state has to follow it or the next pointerdown is ignored. */
            surface.addEventListener('lostpointercapture', (event) => {
                if (event.pointerId !== swipePointerId)
                    return;
                swipePointerId = null;
                startedOnButton = false;
            });
        };
        attachSwipeSurface(vesselOrbit);
        attachSwipeSurface(nav);
        renderInitial();
        window.addEventListener('pagehide', () => {
            window.clearTimeout(settleTimer);
            style.remove();
            nav.remove();
        }, { once: true });
    }
}
