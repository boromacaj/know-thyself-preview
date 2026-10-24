const experience = document.getElementById('place-experience');
const earthMap = document.getElementById('earth-map');
if (experience instanceof HTMLElement && earthMap instanceof HTMLElement) {
    /* Visual tuning. Roughly one revolution every ~7 minutes: clearly alive when
       watched, easy to miss when not. The latitude term is what stops it reading
       as a flat turntable - the sub-camera point traces a shallow diagonal, which
       gives the impression of a slightly tilted planetary axis without pretending
       to be an exact 23.44 degree simulation. */
    const degreesPerSecond = 0.85;
    const axialTiltDegrees = 2.6;
    const axialPeriodDegrees = 360;
    // Write at ~20 Hz. At this speed that is ~0.04 degrees per write: visually
    // continuous, but a fraction of the work a per-frame camera write would cost.
    const writeIntervalMillis = 50;
    // How long after the provider reports the camera steady before drift resumes.
    const resumeDelayMillis = 1100;
    // Safety net if a provider build never reports steady after a gesture.
    const settleFallbackMillis = 4000;
    let frame = 0;
    let lastWriteAt = 0;
    let travelled = 0;
    let settleTimer = 0;
    let resumeTimer = 0;
    let observedMap = null;
    let state = 'PLACE_IDLE';
    const liveMap = () => {
        const map = earthMap.querySelector('gmp-map-3d');
        return map && typeof map.tilt !== 'undefined' ? map : null;
    };
    // "After PLACE" is the same signal the camera constraints use. The overview's
    // Change place edit deliberately counts as PLACE again.
    const isPostPlace = () => (experience.classList.contains('vessel-active')
        && !experience.classList.contains('vessel-transition-pending')
        && experience.dataset.overviewEdit !== 'place');
    /* The opening sequence animates the camera itself, frame by frame. Drifting
       at the same time means two writers on one camera during the most fragile
       part of startup, so no drift happens until the intro has fully handed off. */
    const introFinished = () => experience.dataset.introState === 'complete';
    /* The opening zoom already leaves the Earth moving, so the drift is allowed to
       take over as soon as the camera journey has handed off - waiting for the
       full "complete" flag left a visible dead stop and then a late kick. */
    const introHandedOff = () => {
        const intro = experience.dataset.introState;
        return intro === 'search-revealing' || intro === 'complete';
    };
    /* Camera altitude below which this is a local/city view rather than the global
       presentation. The same angular speed that reads as gentle from 56,000 km is
       chaotic over a town, so autoplay simply does not exist down there - it is
       not slowed down, it is off. This also keeps post-PLACE drift from starting
       while the camera is still at the selected city before it flies back out. */
    const globalPresentationAltitude = 8_000_000;
    const atGlobalPresentation = () => {
        const map = liveMap();
        if (!map)
            return false;
        const range = Number(map.range);
        const tilt = Number(map.tilt);
        const centreAltitude = Number(map.center?.altitude);
        const altitude = (Number.isFinite(centreAltitude) ? centreAltitude : 0)
            + ((Number.isFinite(range) ? range : 0) * Math.cos(((Number.isFinite(tilt) ? tilt : 0) * Math.PI) / 180));
        return Number.isFinite(altitude) && altitude >= globalPresentationAltitude;
    };
    const writesAllowed = () => (introHandedOff()
        && atGlobalPresentation()
        && (state === 'PLACE_IDLE' || state === 'POST_IDLE'));
    const stopLoop = () => {
        if (frame)
            window.cancelAnimationFrame(frame);
        frame = 0;
    };
    const clearTimers = () => {
        window.clearTimeout(settleTimer);
        window.clearTimeout(resumeTimer);
        settleTimer = 0;
        resumeTimer = 0;
    };
    const setState = (next) => {
        if (state === next)
            return;
        state = next;
        earthMap.dataset.earthIdleRotation = next;
        if (writesAllowed())
            startLoop();
        else
            stopLoop();
    };
    const step = (now) => {
        if (!writesAllowed()) {
            stopLoop();
            return;
        }
        const map = liveMap();
        if (!map) {
            stopLoop();
            return;
        }
        if (now - lastWriteAt >= writeIntervalMillis) {
            const elapsed = lastWriteAt === 0 ? writeIntervalMillis : now - lastWriteAt;
            lastWriteAt = now;
            const centre = map.center;
            const lng = Number(centre?.lng);
            const lat = Number(centre?.lat);
            if (Number.isFinite(lng) && Number.isFinite(lat)) {
                const advance = degreesPerSecond * (elapsed / 1000);
                travelled += advance;
                // The CURRENT orientation is read every write, so a manual rotation that
                // happened in between is continued from - never corrected back.
                const previousTilt = Math.sin((travelled - advance) * Math.PI / (axialPeriodDegrees / 2));
                const nextTilt = Math.sin(travelled * Math.PI / (axialPeriodDegrees / 2));
                const latDelta = (nextTilt - previousTilt) * axialTiltDegrees;
                try {
                    map.center = {
                        lat: Math.max(-85, Math.min(85, lat + latDelta)),
                        lng: lng + advance,
                        ...(Number.isFinite(Number(centre?.altitude)) ? { altitude: Number(centre?.altitude) } : {}),
                    };
                }
                catch {
                    // A provider build that rejects the assignment simply stays still.
                    stopLoop();
                    return;
                }
            }
        }
        frame = window.requestAnimationFrame(step);
    };
    function startLoop() {
        if (frame || !writesAllowed() || !liveMap())
            return;
        lastWriteAt = 0;
        frame = window.requestAnimationFrame(step);
    }
    /* A DIRECT interaction with the globe surface. Typing in the search field and
       the soft keyboard are deliberately NOT this: they never touch the map. */
    const handleInteractionStart = () => {
        clearTimers();
        // PLACE: the first direct touch hands the map over for the rest of PLACE.
        // Post-PLACE: only a suspension, because drift is allowed to come back.
        setState(isPostPlace() ? 'POST_USER' : 'PLACE_MANUAL');
    };
    const handleInteractionEnd = () => {
        if (state !== 'POST_USER')
            return;
        setState('POST_INERTIA');
        // Let the provider's inertia play out. gmp-steadychange marks its real end;
        // the fallback only covers builds that never emit it.
        window.clearTimeout(settleTimer);
        settleTimer = window.setTimeout(() => {
            settleTimer = 0;
            scheduleResume();
        }, settleFallbackMillis);
    };
    const scheduleResume = () => {
        window.clearTimeout(resumeTimer);
        resumeTimer = window.setTimeout(() => {
            resumeTimer = 0;
            if (state === 'POST_INERTIA')
                setState('POST_IDLE');
        }, resumeDelayMillis);
    };
    const handleSteadyChange = (event) => {
        // A settled camera is also how the flight back to the global VESSEL
        // composition finishes; re-evaluate so drift can arm once it is out there
        // again, and only then.
        if (state !== 'POST_INERTIA') {
            if (writesAllowed())
                startLoop();
            return;
        }
        if (event.isSteady === false)
            return;
        if (settleTimer) {
            window.clearTimeout(settleTimer);
            settleTimer = 0;
        }
        scheduleResume();
    };
    for (const type of ['pointerdown', 'touchstart', 'wheel']) {
        earthMap.addEventListener(type, handleInteractionStart, { capture: true, passive: true });
    }
    /* Searching is active birthplace finding just as much as grabbing the globe
       is, so real typing ends PLACE autoplay for the rest of PLACE. Focus alone
       deliberately does not: tapping the field without typing is not yet a search. */
    const placeQuery = document.getElementById('place-query');
    const handleSearchActivity = () => {
        if (isPostPlace() || state === 'PLACE_MANUAL')
            return;
        clearTimers();
        setState('PLACE_MANUAL');
    };
    placeQuery?.addEventListener('input', handleSearchActivity, { passive: true });
    for (const type of ['pointerup', 'pointercancel', 'touchend', 'touchcancel']) {
        earthMap.addEventListener(type, handleInteractionEnd, { capture: true, passive: true });
    }
    const attachMapEvents = () => {
        const map = liveMap();
        if (!map || map === observedMap)
            return;
        observedMap?.removeEventListener('gmp-steadychange', handleSteadyChange);
        observedMap = map;
        map.addEventListener('gmp-steadychange', handleSteadyChange);
    };
    function sync() {
        attachMapEvents();
        if (isPostPlace()) {
            // Entering the post-PLACE phase clears any PLACE hand-over: drift is
            // allowed again from here, which is the documented difference.
            if (state === 'PLACE_IDLE' || state === 'PLACE_MANUAL')
                setState('POST_IDLE');
            else if (writesAllowed())
                startLoop();
            return;
        }
        // Back in PLACE (including the overview's Change place edit). A manual
        // hand-over inside this PLACE session is preserved; it is not re-armed.
        if (state === 'POST_USER' || state === 'POST_INERTIA' || state === 'POST_IDLE') {
            clearTimers();
            setState('PLACE_IDLE');
            return;
        }
        if (writesAllowed())
            startLoop();
        else
            stopLoop();
    }
    const stateObserver = new MutationObserver(sync);
    stateObserver.observe(experience, {
        attributes: true,
        attributeFilter: ['class', 'data-state', 'data-overview-edit', 'data-intro-state'],
    });
    const mapObserver = new MutationObserver(sync);
    mapObserver.observe(earthMap, { childList: true, attributes: true, attributeFilter: ['data-earth-view'] });
    earthMap.dataset.earthIdleRotation = state;
    sync();
    window.addEventListener('pagehide', () => {
        stateObserver.disconnect();
        mapObserver.disconnect();
        observedMap?.removeEventListener('gmp-steadychange', handleSteadyChange);
        placeQuery?.removeEventListener('input', handleSearchActivity);
        clearTimers();
        stopLoop();
    }, { once: true });
}
export {};
