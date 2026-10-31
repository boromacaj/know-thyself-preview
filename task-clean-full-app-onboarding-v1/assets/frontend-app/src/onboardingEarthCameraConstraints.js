const experience = document.getElementById('place-experience');
const earthMap = document.getElementById('earth-map');
if (experience instanceof HTMLElement && earthMap instanceof HTMLElement) {
    // A provider that repositions the globe when the clamp is written is treated
    // as unsupported rather than accepted as a visual change.
    const altitudeTolerance = 0.005;
    const tiltToleranceDegrees = 0.5;
    const verifyDelayMillis = 260;
    let locked = false;
    let abandoned = false;
    let verifyTimer = 0;
    const liveMap = () => {
        const map = earthMap.querySelector('gmp-map-3d');
        return map && typeof map.tilt !== 'undefined' ? map : null;
    };
    const readPose = (map) => {
        const range = Number(map.range);
        const tilt = Number(map.tilt);
        if (!Number.isFinite(range) || range < 0)
            return null;
        const safeTilt = Number.isFinite(tilt) ? tilt : 0;
        const centerAltitude = Number(map.center?.altitude);
        // Camera altitude for the pose currently on screen. The provider expresses
        // the world pose as center.altitude with range 0 right after the return
        // flight, and as range with a negative center.altitude afterwards, so both
        // terms are needed to get a stable value to verify framing against.
        const altitude = (Number.isFinite(centerAltitude) ? centerAltitude : 0)
            + (range * Math.cos((safeTilt * Math.PI) / 180));
        if (!Number.isFinite(altitude) || altitude <= 0)
            return null;
        return { tilt: safeTilt, altitude };
    };
    const clearConstraints = (map) => {
        try {
            map.minTilt = null;
            map.maxTilt = null;
        }
        catch {
            // A provider build that rejects a null reset leaves the map usable.
        }
    };
    /*
     * INPUT GUARDS
     * ------------
     * The provider has no rotation-only mode, so everything that is not a
     * one-finger drag is refused at the event level, on the container, in the
     * capture phase - before the Map3DElement's own listeners run. This only
     * declines input; it never invents any. One-finger pointer/touch streams are
     * deliberately untouched so native rotation and its momentum stay exactly as
     * the provider implements them.
     */
    const blockEvent = (event) => {
        if (event.cancelable)
            event.preventDefault();
        event.stopPropagation();
    };
    // gmp-click bubbles, so a capture listener here runs before premiumEarthMap's
    // own handler and stops birthplace selection outside PLACE.
    const blockLocationClick = (event) => {
        event.stopPropagation();
    };
    // Pinch zoom and two-finger tilt both start as a second touch point.
    const blockMultiTouch = (event) => {
        const touches = event.touches;
        if (!touches || touches.length < 2)
            return;
        blockEvent(event);
    };
    /*
     * DOUBLE TAP AND DOUBLE CLICK
     * ---------------------------
     * The dblclick guard above is not enough on its own, and on touch it is not
     * enough at all. Map3DElement does not zoom from the DOM's dblclick event -
     * it recognises the gesture itself from the raw pointer/touch stream - and a
     * double TAP never produces a dblclick in the first place. A double tap is
     * one finger, twice, so the rule the guard list was built on - one finger is
     * rotation, leave it alone - passed it straight through to the provider.
     *
     * Rather than guess which stream the provider reads, the SECOND tap of a
     * rapid pair is refused whole: every input event belonging to it is stopped
     * at the container in the capture phase, so the gesture cannot be recognised
     * from any stream.
     *
     * What is deliberately NOT refused: the first tap, a long press, and every
     * drag. A gesture only becomes a candidate by ENDING as a tap - brief, and it
     * did not move - so a one-finger drag is never a first tap, and rotation and
     * its momentum stay entirely the provider's own.
     *
     * A refused tap still counts as a tap for the next decision. Without that,
     * continuous fast tapping would pass every other tap through and the provider
     * would see those at twice the interval - which is a double tap again.
     * Latching this way means a stream of taps reaches the provider exactly once,
     * however long the user keeps tapping.
     */
    const doubleTapWindowMillis = 320;
    const doubleTapRadiusPixels = 40;
    const tapMaxDurationMillis = 300;
    const tapMaxMovementPixels = 12;
    const pointOf = (event) => {
        const touch = event.changedTouches?.[0];
        if (touch)
            return { x: touch.clientX, y: touch.clientY };
        const pointer = event;
        if (typeof pointer.clientX === 'number')
            return { x: pointer.clientX, y: pointer.clientY };
        return null;
    };
    const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
    const timeOf = (event) => (Number.isFinite(event.timeStamp) && event.timeStamp > 0 ? event.timeStamp : performance.now());
    let gestureOpen = false;
    // Latched until the next gesture opens, so the trailing compatibility events
    // of a refused tap - mouseup, click - are refused with it.
    let gestureRefused = false;
    let gestureStart = null;
    let gestureStartedAt = 0;
    let gestureMoved = false;
    let lastTapAt = 0;
    let lastTapPoint = null;
    const resetGestureState = () => {
        gestureOpen = false;
        gestureRefused = false;
        gestureStart = null;
        gestureStartedAt = 0;
        gestureMoved = false;
        lastTapAt = 0;
        lastTapPoint = null;
    };
    /*
     * Only pointerdown and touchstart open a gesture and make the decision. A
     * touch fires pointerdown, then touchstart, then compatibility mouse events,
     * and all of them describe the SAME physical tap - so everything after the
     * first only inherits the decision, and one tap is never counted as several.
     */
    const onGestureDown = (event) => {
        if (!gestureOpen) {
            const point = pointOf(event);
            if (point) {
                const now = timeOf(event);
                gestureOpen = true;
                gestureStart = point;
                gestureStartedAt = now;
                gestureMoved = false;
                gestureRefused = Boolean(lastTapPoint
                    && now - lastTapAt <= doubleTapWindowMillis
                    && distance(point, lastTapPoint) <= doubleTapRadiusPixels);
            }
        }
        if (gestureRefused)
            blockEvent(event);
    };
    const onGestureMove = (event) => {
        if (gestureRefused) {
            blockEvent(event);
            return;
        }
        if (!gestureOpen || !gestureStart)
            return;
        const point = pointOf(event);
        if (point && distance(point, gestureStart) > tapMaxMovementPixels)
            gestureMoved = true;
    };
    const onGestureUp = (event) => {
        const now = timeOf(event);
        if (gestureRefused) {
            blockEvent(event);
            gestureOpen = false;
            // The anchor stays where the pair began, so the radius still measures
            // against the tap the user is repeating.
            lastTapAt = now;
            return;
        }
        if (!gestureOpen)
            return;
        gestureOpen = false;
        const wasTap = !gestureMoved && now - gestureStartedAt <= tapMaxDurationMillis;
        lastTapAt = wasTap ? now : 0;
        lastTapPoint = wasTap ? gestureStart : null;
    };
    // Compatibility mouse events carry no decision of their own; they are only
    // refused when the gesture they belong to was.
    const onInheritedInput = (event) => {
        if (gestureRefused)
            blockEvent(event);
    };
    const guards = [
        ['gmp-click', blockLocationClick, { capture: true }],
        ['wheel', blockEvent, { capture: true, passive: false }],
        ['dblclick', blockEvent, { capture: true }],
        ['touchstart', blockMultiTouch, { capture: true, passive: false }],
        ['touchmove', blockMultiTouch, { capture: true, passive: false }],
        ['pointerdown', onGestureDown, { capture: true, passive: false }],
        ['touchstart', onGestureDown, { capture: true, passive: false }],
        ['pointermove', onGestureMove, { capture: true, passive: false }],
        ['touchmove', onGestureMove, { capture: true, passive: false }],
        ['pointerup', onGestureUp, { capture: true, passive: false }],
        ['pointercancel', onGestureUp, { capture: true, passive: false }],
        ['touchend', onGestureUp, { capture: true, passive: false }],
        ['touchcancel', onGestureUp, { capture: true, passive: false }],
        ['mousedown', onInheritedInput, { capture: true, passive: false }],
        ['mouseup', onInheritedInput, { capture: true, passive: false }],
        ['click', onInheritedInput, { capture: true, passive: false }],
    ];
    let guardsAttached = false;
    const attachInputGuards = () => {
        if (guardsAttached)
            return;
        guardsAttached = true;
        for (const [type, handler, options] of guards) {
            earthMap.addEventListener(type, handler, options);
        }
        earthMap.dataset.earthInputGuards = 'rotation-only';
    };
    const detachInputGuards = () => {
        if (!guardsAttached)
            return;
        guardsAttached = false;
        for (const [type, handler, options] of guards) {
            earthMap.removeEventListener(type, handler, options);
        }
        // Nothing may survive into PLACE: a tap recorded here must not become half
        // of a double tap measured against the user's first tap on the next stage.
        resetGestureState();
        // PLACE needs real zoom and real map taps to choose a birthplace.
        earthMap.dataset.earthInputGuards = 'place-interactive';
    };
    const release = () => {
        window.clearTimeout(verifyTimer);
        verifyTimer = 0;
        detachInputGuards();
        if (!locked)
            return;
        locked = false;
        const map = liveMap();
        if (map)
            clearConstraints(map);
        earthMap.dataset.earthCameraConstraints = 'released';
    };
    const lock = () => {
        if (locked || abandoned)
            return;
        const map = liveMap();
        if (!map)
            return;
        const before = readPose(map);
        if (!before)
            return;
        try {
            // Heading and altitude are deliberately left unconstrained: heading is the
            // rotation itself, and any altitude clamp kills the drag gesture.
            map.minTilt = before.tilt;
            map.maxTilt = before.tilt;
        }
        catch {
            abandoned = true;
            earthMap.dataset.earthCameraConstraints = 'unsupported-provider-rejected';
            return;
        }
        locked = true;
        earthMap.dataset.earthCameraConstraints = 'tilt-locked';
        earthMap.dataset.earthCameraLockTilt = before.tilt.toFixed(3);
        // One deferred read-back. If writing the clamp moved the approved framing,
        // withdraw it and keep the untouched native interaction instead.
        window.clearTimeout(verifyTimer);
        verifyTimer = window.setTimeout(() => {
            verifyTimer = 0;
            const current = liveMap();
            if (!current || !locked)
                return;
            const after = readPose(current);
            if (!after)
                return;
            const altitudeDrift = Math.abs(after.altitude - before.altitude) / before.altitude;
            const tiltDrift = Math.abs(after.tilt - before.tilt);
            if (altitudeDrift <= altitudeTolerance && tiltDrift <= tiltToleranceDegrees)
                return;
            abandoned = true;
            locked = false;
            clearConstraints(current);
            earthMap.dataset.earthCameraConstraints = 'unsupported-provider-repositioned';
        }, verifyDelayMillis);
    };
    // PLACE (including OVERVIEW -> Change place) keeps completely unrestricted
    // camera input, because birthplace selection needs real zoom to street level.
    const shouldLock = () => (experience.classList.contains('vessel-active')
        && !experience.classList.contains('vessel-transition-pending')
        && experience.dataset.overviewEdit !== 'place');
    const sync = () => {
        if (shouldLock()) {
            // Input guards do not depend on the tilt clamp being accepted, so they
            // are attached even when the clamp was withdrawn as unsupported.
            attachInputGuards();
            lock();
            return;
        }
        release();
    };
    const observer = new MutationObserver(sync);
    observer.observe(experience, {
        attributes: true,
        attributeFilter: ['class', 'data-state', 'data-overview-edit'],
    });
    // The Map3DElement is mounted asynchronously, so pick it up when it appears
    // and re-evaluate whenever the provider reports the camera has settled. These
    // are provider events, not a polling or animation loop.
    let observedMap = null;
    const attachMapEvents = () => {
        const map = liveMap();
        if (!map || map === observedMap)
            return;
        observedMap?.removeEventListener('gmp-steadychange', sync);
        observedMap?.removeEventListener('gmp-animationend', sync);
        observedMap = map;
        map.addEventListener('gmp-steadychange', sync);
        map.addEventListener('gmp-animationend', sync);
    };
    const mapObserver = new MutationObserver(() => {
        attachMapEvents();
        sync();
    });
    mapObserver.observe(earthMap, { childList: true });
    attachMapEvents();
    sync();
    window.addEventListener('pagehide', () => {
        observer.disconnect();
        mapObserver.disconnect();
        observedMap?.removeEventListener('gmp-steadychange', sync);
        observedMap?.removeEventListener('gmp-animationend', sync);
        release();
        detachInputGuards();
    }, { once: true });
}
export {};
