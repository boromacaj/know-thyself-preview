import { t, tf } from './app/i18n/uiStrings.js?v=f9ab0a6';
const vesselStage = document.getElementById('vessel-stage');
if (vesselStage instanceof HTMLElement) {
    const nav = vesselStage.querySelector('.vessel-carousel-nav');
    const previousArrow = nav?.querySelector('.vessel-carousel-arrow-left');
    const nextArrow = nav?.querySelector('.vessel-carousel-arrow-right');
    const neighborRail = vesselStage.querySelector('.kt-vessel-neighbor-preview-rail');
    const previousGlyph = neighborRail?.querySelector('.kt-vessel-neighbor-preview-left');
    const nextGlyph = neighborRail?.querySelector('.kt-vessel-neighbor-preview-right');
    if (nav instanceof HTMLElement
        && previousArrow instanceof HTMLButtonElement
        && nextArrow instanceof HTMLButtonElement
        && neighborRail instanceof HTMLElement
        && previousGlyph instanceof HTMLElement
        && nextGlyph instanceof HTMLElement) {
        /*
         * The inactive vessel glyphs become the only visible previous/next controls.
         * They deliberately delegate to the existing arrow buttons programmatically,
         * so vessel ordering, 2 s effect fades, colour changes and transition locking
         * continue to have exactly one authoritative controller.
         */
        neighborRail.removeAttribute('aria-hidden');
        const vesselLabel = (value) => {
            if (value === 'male')
                return t('onb.vessel.male');
            if (value === 'female')
                return t('onb.vessel.female');
            return t('onb.vessel.undefined');
        };
        /*
         * THE ONE STRING ON THIS SCREEN THAT WAS NEVER TRANSLATED.
         *
         * It was built here as `Select ${label} vessel`, so a Slovak screen reader
         * announced "Select Muz vessel" - the label localised, the sentence around
         * it not. The whole phrase is a UI string like every other, so it comes
         * from the dictionary and takes the vessel name as a parameter.
         */
        const syncAccessibility = () => {
            previousGlyph.setAttribute('role', 'button');
            previousGlyph.setAttribute('tabindex', '0');
            previousGlyph.setAttribute('aria-label', tf('onb.vessel.chooseAria', { vessel: vesselLabel(previousGlyph.dataset.vessel) }));
            nextGlyph.setAttribute('role', 'button');
            nextGlyph.setAttribute('tabindex', '0');
            nextGlyph.setAttribute('aria-label', tf('onb.vessel.chooseAria', { vessel: vesselLabel(nextGlyph.dataset.vessel) }));
        };
        const activatePrevious = (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (vesselStage.classList.contains('is-profile-flow'))
                return;
            previousArrow.click();
        };
        const activateNext = (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (vesselStage.classList.contains('is-profile-flow'))
                return;
            nextArrow.click();
        };
        const handleKey = (event, activate) => {
            if (event.key !== 'Enter' && event.key !== ' ')
                return;
            activate(event);
        };
        const handlePreviousKey = (event) => handleKey(event, activatePrevious);
        const handleNextKey = (event) => handleKey(event, activateNext);
        previousGlyph.addEventListener('click', activatePrevious);
        nextGlyph.addEventListener('click', activateNext);
        previousGlyph.addEventListener('keydown', handlePreviousKey);
        nextGlyph.addEventListener('keydown', handleNextKey);
        const glyphObserver = new MutationObserver(syncAccessibility);
        glyphObserver.observe(previousGlyph, { attributes: true, attributeFilter: ['data-vessel'] });
        glyphObserver.observe(nextGlyph, { attributes: true, attributeFilter: ['data-vessel'] });
        syncAccessibility();
        const style = document.createElement('style');
        style.dataset.vesselClickableNeighborGlyphs = 'true';
        style.textContent = `
      /* The arrow buttons are not shown or tapped (the keyboard and the profile editor still press them): the body is chosen by dragging
         (vesselTrackCarousel.ts), and the cues beside the word "swipe" say so. */
      .vessel-stage:not(.is-profile-flow) .vessel-carousel-nav {
        pointer-events: none !important;
      }

      .vessel-stage:not(.is-profile-flow) .vessel-carousel-arrow {
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }

      /* Keep the approved glyph size and position, but give each symbol a larger
         transparent 56 px touch target for phones. */
      .vessel-stage:not(.is-profile-flow) .kt-vessel-neighbor-preview {
        box-sizing: border-box !important;
        width: 56px !important;
        height: 56px !important;
        padding: 7px !important;
        border: 0 !important;
        outline: 0;
        cursor: pointer !important;
        background: transparent !important;
        pointer-events: auto !important;
        touch-action: manipulation !important;
        -webkit-tap-highlight-color: transparent;
      }

      .vessel-stage:not(.is-profile-flow) .kt-vessel-neighbor-preview .kt-vessel-neighbor-glyph {
        width: 42px !important;
        height: 42px !important;
      }

      .vessel-stage:not(.is-profile-flow) .kt-vessel-neighbor-preview:focus-visible {
        filter:
          drop-shadow(0 0 3px rgba(255,255,255,.42))
          drop-shadow(0 0 13px rgba(var(--kt-neighbor-rgb,255,255,255),.42)) !important;
      }

      .vessel-stage:not(.is-profile-flow) .kt-vessel-neighbor-preview:active {
        filter:
          drop-shadow(0 0 4px rgba(255,255,255,.62))
          drop-shadow(0 0 16px rgba(var(--kt-neighbor-rgb,255,255,255),.50)) !important;
      }

      @media (max-width: 420px) {
        .vessel-stage:not(.is-profile-flow) .kt-vessel-neighbor-preview {
          padding: 9px !important;
        }

        .vessel-stage:not(.is-profile-flow) .kt-vessel-neighbor-preview .kt-vessel-neighbor-glyph {
          width: 38px !important;
          height: 38px !important;
        }
      }
    `;
        document.head.append(style);
        window.addEventListener('pagehide', () => {
            glyphObserver.disconnect();
            previousGlyph.removeEventListener('click', activatePrevious);
            nextGlyph.removeEventListener('click', activateNext);
            previousGlyph.removeEventListener('keydown', handlePreviousKey);
            nextGlyph.removeEventListener('keydown', handleNextKey);
            style.remove();
        }, { once: true });
    }
}
