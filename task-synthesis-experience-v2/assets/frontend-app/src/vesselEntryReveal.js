const experience = document.getElementById('place-experience');
const mapContainer = document.getElementById('earth-map');
const vesselStage = document.getElementById('vessel-stage');
if (experience instanceof HTMLElement
    && mapContainer instanceof HTMLElement
    && vesselStage instanceof HTMLElement) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let revealTimeout = 0;
    let revealFrame = 0;
    let waitingForEarth = false;
    let activeMap = null;
    const cancelPendingReveal = () => {
        window.clearTimeout(revealTimeout);
        revealTimeout = 0;
        if (revealFrame) {
            window.cancelAnimationFrame(revealFrame);
            revealFrame = 0;
        }
        activeMap?.removeEventListener('gmp-animationend', handleEarthSettled);
        activeMap = null;
        waitingForEarth = false;
    };
    const revealVesselUi = () => {
        if (!waitingForEarth || experience.dataset.state !== 'vessel')
            return;
        cancelPendingReveal();
        // Hold for two painted frames after the camera reports completion. This keeps
        // the canonical world pose visually established before any VESSEL chrome,
        // white rim, glow, labels, arrows, or actions begin to appear.
        revealFrame = window.requestAnimationFrame(() => {
            revealFrame = window.requestAnimationFrame(() => {
                revealFrame = 0;
                experience.classList.remove('vessel-transition-pending');
                experience.classList.add('vessel-ui-revealed');
                vesselStage.inert = false;
            });
        });
    };
    function handleEarthSettled() {
        revealVesselUi();
    }
    const beginDelayedReveal = () => {
        if (waitingForEarth)
            return;
        waitingForEarth = true;
        experience.classList.remove('vessel-ui-revealed');
        experience.classList.add('vessel-transition-pending');
        vesselStage.inert = true;
        activeMap = mapContainer.querySelector('gmp-map-3d');
        if (activeMap) {
            activeMap.addEventListener('gmp-animationend', handleEarthSettled, { once: true });
            // showWorld() currently flies for 1250 ms. The timeout is only a safety net
            // for browsers/providers that fail to emit gmp-animationend.
            revealTimeout = window.setTimeout(revealVesselUi, reducedMotion.matches ? 80 : 1_650);
            return;
        }
        // 2D/unavailable fallbacks have no Google 3D animation event. They are already
        // at (or immediately reset to) the world view, so reveal on the next paint.
        revealTimeout = window.setTimeout(revealVesselUi, reducedMotion.matches ? 0 : 120);
    };
    const observer = new MutationObserver((mutations) => {
        const enteredVesselFromConfirmedPlace = mutations.some((mutation) => (mutation.type === 'attributes'
            && mutation.attributeName === 'data-state'
            && mutation.oldValue === 'confirmed'
            && experience.dataset.state === 'vessel'));
        if (enteredVesselFromConfirmedPlace) {
            beginDelayedReveal();
            return;
        }
        if (experience.dataset.state !== 'vessel' && waitingForEarth) {
            cancelPendingReveal();
            experience.classList.remove('vessel-transition-pending', 'vessel-ui-revealed');
        }
    });
    observer.observe(experience, {
        attributes: true,
        attributeFilter: ['data-state'],
        attributeOldValue: true,
    });
    const style = document.createElement('style');
    style.dataset.vesselEntryReveal = 'true';
    style.textContent = `
    /* PLACE -> VESSEL handoff:
       1) hide every VESSEL overlay while the live Earth returns to its canonical
          world pose,
       2) only after that camera settles, slowly fade in the complete VESSEL layer. */
    .place-experience.vessel-active.vessel-transition-pending .earth-map {
      opacity: 1 !important;
      transition: none !important;
    }

    .place-experience.vessel-active.vessel-transition-pending .vessel-stage {
      visibility: visible !important;
      opacity: 0 !important;
      pointer-events: none !important;
      transition: none !important;
    }

    .place-experience.vessel-active.vessel-transition-pending .vessel-stage * {
      pointer-events: none !important;
    }

    .place-experience.vessel-active.vessel-ui-revealed .earth-map {
      opacity: 0.34 !important;
      transition: opacity 2200ms cubic-bezier(0.16, 0.72, 0.22, 1) !important;
    }

    .place-experience.vessel-active.vessel-ui-revealed .vessel-stage {
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
      transition:
        opacity 2200ms cubic-bezier(0.16, 0.72, 0.22, 1),
        visibility 0s linear 0s !important;
    }

    .place-experience.vessel-active.vessel-transition-pending .vessel-content,
    .place-experience.vessel-active.vessel-transition-pending .vessel-cosmos {
      opacity: 0 !important;
    }

    .place-experience.vessel-active.vessel-ui-revealed .vessel-cosmos {
      opacity: 0.72;
      transition: opacity 2400ms ease-out 120ms !important;
    }

    .place-experience.vessel-active.vessel-ui-revealed .vessel-content {
      opacity: 1;
      transition: opacity 2000ms ease-out 180ms !important;
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
        cancelPendingReveal();
        observer.disconnect();
        style.remove();
    }, { once: true });
}
export {};
