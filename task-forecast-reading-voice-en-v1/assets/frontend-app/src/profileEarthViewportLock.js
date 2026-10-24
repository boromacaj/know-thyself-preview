const experience = document.getElementById('place-experience');
const earthMap = document.getElementById('earth-map');
const vesselStage = document.getElementById('vessel-stage');
const placeQuery = document.getElementById('place-query');
if (experience instanceof HTMLElement
    && earthMap instanceof HTMLElement
    && vesselStage instanceof HTMLElement
    && placeQuery instanceof HTMLInputElement) {
    let locked = false;
    let lockedWidth = 0;
    let lockedHeight = 0;
    let lockFrame = 0;
    let releaseTimer = 0;
    let placeInputFocused = false;
    const isProfileFlow = () => vesselStage.classList.contains('is-profile-flow');
    const shouldLockEarthViewport = () => isProfileFlow() || placeInputFocused;
    const clearLock = () => {
        window.cancelAnimationFrame(lockFrame);
        window.clearTimeout(releaseTimer);
        lockFrame = 0;
        releaseTimer = 0;
        locked = false;
        lockedWidth = 0;
        lockedHeight = 0;
        experience.classList.remove('kt-earth-viewport-locked');
        experience.style.removeProperty('--kt-earth-viewport-height');
    };
    const lockEarthViewport = () => {
        if (!shouldLockEarthViewport() || locked)
            return;
        window.cancelAnimationFrame(lockFrame);
        lockFrame = window.requestAnimationFrame(() => {
            lockFrame = 0;
            const mapRect = earthMap.getBoundingClientRect();
            if (mapRect.height <= 0 || mapRect.width <= 0)
                return;
            // Freeze only the visual Earth segment before the soft keyboard changes
            // viewport height. PLACE controls and later picker layers remain free to
            // move upward; Google keeps rendering against the original full-height map.
            experience.style.setProperty('--kt-earth-viewport-height', `${mapRect.height.toFixed(2)}px`);
            experience.classList.add('kt-earth-viewport-locked');
            locked = true;
            lockedWidth = window.innerWidth;
            lockedHeight = mapRect.height;
        });
    };
    const maybeReleasePlaceLock = () => {
        if (!locked || placeInputFocused || isProfileFlow())
            return;
        const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
        const layoutHeight = window.innerHeight;
        const restoredHeight = Math.max(viewportHeight, layoutHeight);
        // Do not unlock while Android is still animating the keyboard closed. Wait
        // until the usable viewport has returned to essentially its pre-keyboard
        // height so the live Earth never gets one last resize/reframe glitch.
        if (restoredHeight >= lockedHeight - 24)
            clearLock();
    };
    const syncLockState = () => {
        if (shouldLockEarthViewport()) {
            lockEarthViewport();
            return;
        }
        maybeReleasePlaceLock();
    };
    const handlePlaceFocusIn = () => {
        if (experience.classList.contains('vessel-active'))
            return;
        placeInputFocused = true;
        window.clearTimeout(releaseTimer);
        releaseTimer = 0;
        lockEarthViewport();
    };
    const handlePlaceFocusOut = () => {
        placeInputFocused = false;
        window.clearTimeout(releaseTimer);
        releaseTimer = window.setTimeout(maybeReleasePlaceLock, 420);
    };
    const handleResize = () => {
        if (!locked) {
            lockEarthViewport();
            return;
        }
        // Android keyboard changes height, not width. Ignore those resizes entirely.
        // Only a real orientation/width change may establish a new Earth lock.
        if (Math.abs(window.innerWidth - lockedWidth) > 24) {
            clearLock();
            lockEarthViewport();
            return;
        }
        maybeReleasePlaceLock();
    };
    const observer = new MutationObserver(syncLockState);
    observer.observe(vesselStage, { attributes: true, attributeFilter: ['class'] });
    const style = document.createElement('style');
    style.dataset.profileEarthViewportLock = 'true';
    style.textContent = `
    /* EARTH SEGMENT — immutable while the PLACE keyboard is open and throughout
       IDENTITY / ARRIVAL. Form controls may react to the keyboard, but the map
       and dedicated Earth-effects layer may never resize with the short visual
       viewport. This prevents Google from reframing the background upward. */
    .place-experience.kt-earth-viewport-locked .earth-map {
      height: var(--kt-earth-viewport-height) !important;
      min-height: var(--kt-earth-viewport-height) !important;
      max-height: var(--kt-earth-viewport-height) !important;
      bottom: auto !important;
    }

    .place-experience.kt-earth-viewport-locked .earth-map > gmp-map-3d {
      height: 100% !important;
      min-height: 100% !important;
      max-height: 100% !important;
    }

    .place-experience.kt-earth-viewport-locked .kt-earth-effects-layer {
      height: var(--kt-earth-viewport-height) !important;
      min-height: var(--kt-earth-viewport-height) !important;
      max-height: var(--kt-earth-viewport-height) !important;
      bottom: auto !important;
    }
  `;
    document.head.append(style);
    syncLockState();
    placeQuery.addEventListener('focus', handlePlaceFocusIn);
    placeQuery.addEventListener('blur', handlePlaceFocusOut);
    window.addEventListener('resize', handleResize);
    window.visualViewport?.addEventListener('resize', handleResize);
    window.addEventListener('pagehide', () => {
        observer.disconnect();
        placeQuery.removeEventListener('focus', handlePlaceFocusIn);
        placeQuery.removeEventListener('blur', handlePlaceFocusOut);
        window.removeEventListener('resize', handleResize);
        window.visualViewport?.removeEventListener('resize', handleResize);
        clearLock();
        style.remove();
    }, { once: true });
}
export {};
