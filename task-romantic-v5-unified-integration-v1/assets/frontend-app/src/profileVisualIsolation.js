const experience = document.getElementById('place-experience');
const earthMap = document.getElementById('earth-map');
const vesselStage = document.getElementById('vessel-stage');
if (experience instanceof HTMLElement
    && earthMap instanceof HTMLElement
    && vesselStage instanceof HTMLElement) {
    let visualLock = null;
    let captureFrame = 0;
    let secondCaptureFrame = 0;
    const profileVisualsActive = () => (experience.classList.contains('profile-flow-active')
        && vesselStage.classList.contains('is-profile-flow'));
    const clearScheduledCapture = () => {
        if (captureFrame)
            window.cancelAnimationFrame(captureFrame);
        if (secondCaptureFrame)
            window.cancelAnimationFrame(secondCaptureFrame);
        captureFrame = 0;
        secondCaptureFrame = 0;
    };
    const releaseVisualLock = () => {
        clearScheduledCapture();
        visualLock = null;
        experience.classList.remove('profile-visuals-locked');
        experience.style.removeProperty('--profile-locked-map-top');
        experience.style.removeProperty('--profile-locked-map-left');
        experience.style.removeProperty('--profile-locked-map-width');
        experience.style.removeProperty('--profile-locked-map-height');
        vesselStage.style.removeProperty('--profile-locked-earth-center-x');
        vesselStage.style.removeProperty('--profile-locked-earth-center-y');
        vesselStage.style.removeProperty('--profile-locked-earth-diameter');
    };
    const captureVisualLock = () => {
        if (!profileVisualsActive())
            return;
        clearScheduledCapture();
        // Capture only rendered geometry. Do not write center/range/heading/tilt/fov
        // back into Map3DElement during keyboard or picker viewport changes. Repeated
        // camera writes can make the Android Google 3D renderer fight the visual
        // viewport and stall the onboarding transition.
        captureFrame = window.requestAnimationFrame(() => {
            secondCaptureFrame = window.requestAnimationFrame(() => {
                captureFrame = 0;
                secondCaptureFrame = 0;
                if (!profileVisualsActive())
                    return;
                const experienceRect = experience.getBoundingClientRect();
                const mapRect = earthMap.getBoundingClientRect();
                const stageRect = vesselStage.getBoundingClientRect();
                const focusedEarth = vesselStage.querySelector('.vessel-orbit.is-focused .vessel-choice.is-focused .vessel-symbol');
                if (!(focusedEarth instanceof HTMLElement))
                    return;
                const focusedEarthRect = focusedEarth.getBoundingClientRect();
                if (experienceRect.width <= 0
                    || experienceRect.height <= 0
                    || mapRect.width <= 0
                    || mapRect.height <= 0
                    || focusedEarthRect.width <= 0
                    || focusedEarthRect.height <= 0)
                    return;
                const mapTop = mapRect.top - experienceRect.top;
                const mapLeft = mapRect.left - experienceRect.left;
                const earthCenterX = focusedEarthRect.left - stageRect.left + (focusedEarthRect.width / 2);
                const earthCenterY = focusedEarthRect.top - stageRect.top + (focusedEarthRect.height / 2);
                const earthDiameter = Math.min(focusedEarthRect.width, focusedEarthRect.height);
                experience.style.setProperty('--profile-locked-map-top', `${mapTop.toFixed(2)}px`);
                experience.style.setProperty('--profile-locked-map-left', `${mapLeft.toFixed(2)}px`);
                experience.style.setProperty('--profile-locked-map-width', `${mapRect.width.toFixed(2)}px`);
                experience.style.setProperty('--profile-locked-map-height', `${mapRect.height.toFixed(2)}px`);
                vesselStage.style.setProperty('--profile-locked-earth-center-x', `${earthCenterX.toFixed(2)}px`);
                vesselStage.style.setProperty('--profile-locked-earth-center-y', `${earthCenterY.toFixed(2)}px`);
                vesselStage.style.setProperty('--profile-locked-earth-diameter', `${earthDiameter.toFixed(2)}px`);
                visualLock = { viewportWidth: window.innerWidth };
                experience.classList.add('profile-visuals-locked');
            });
        });
    };
    const handleViewportResize = () => {
        if (!profileVisualsActive())
            return;
        if (!visualLock) {
            captureVisualLock();
            return;
        }
        // Keyboard, date picker and browser chrome mostly change viewport height.
        // Keep the already captured pixel geometry untouched. Only a real width
        // change (orientation/responsive layout) earns a fresh measurement.
        if (Math.abs(window.innerWidth - visualLock.viewportWidth) > 24) {
            captureVisualLock();
        }
    };
    const stateObserver = new MutationObserver(() => {
        if (profileVisualsActive()) {
            if (!visualLock)
                captureVisualLock();
            return;
        }
        if (visualLock || experience.classList.contains('profile-visuals-locked'))
            releaseVisualLock();
    });
    stateObserver.observe(experience, { attributes: true, attributeFilter: ['class'] });
    stateObserver.observe(vesselStage, { attributes: true, attributeFilter: ['class'] });
    const style = document.createElement('style');
    style.dataset.profileVisualIsolation = 'true';
    style.textContent = `
    .place-experience.profile-visuals-locked .earth-map {
      top: var(--profile-locked-map-top, 0px) !important;
      right: auto !important;
      bottom: auto !important;
      left: var(--profile-locked-map-left, 0px) !important;
      width: var(--profile-locked-map-width) !important;
      height: var(--profile-locked-map-height) !important;
      contain: layout paint;
    }

    .place-experience.profile-visuals-locked
      .vessel-stage.is-profile-flow
      .vessel-orbit[data-motion="3d-x-orbit-auto-rotate-drag"] {
      top: var(--profile-locked-earth-center-y) !important;
      left: var(--profile-locked-earth-center-x) !important;
    }

    /* Width and height must come from the same captured diameter. Locking only
       width allowed the post-confirm viewport rules to stretch the vessel into
       an ellipse on some Android aspect ratios. */
    .place-experience.profile-visuals-locked
      .vessel-stage.is-profile-flow
      .vessel-orbit.is-focused
      .vessel-choice.is-focused {
      width: var(--profile-locked-earth-diameter) !important;
      height: var(--profile-locked-earth-diameter) !important;
      aspect-ratio: 1 / 1 !important;
    }

    .place-experience.profile-visuals-locked
      .vessel-stage.is-profile-flow
      .vessel-orbit.is-focused
      .vessel-choice.is-focused
      .vessel-symbol {
      width: 100% !important;
      height: 100% !important;
      aspect-ratio: 1 / 1 !important;
      border-radius: 50% !important;
    }
  `;
    document.head.append(style);
    window.addEventListener('resize', handleViewportResize);
    window.visualViewport?.addEventListener('resize', handleViewportResize);
    if (profileVisualsActive())
        captureVisualLock();
    window.addEventListener('pagehide', () => {
        stateObserver.disconnect();
        releaseVisualLock();
        style.remove();
        window.removeEventListener('resize', handleViewportResize);
        window.visualViewport?.removeEventListener('resize', handleViewportResize);
    }, { once: true });
}
export {};
