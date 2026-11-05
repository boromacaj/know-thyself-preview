import { GESTURE, beginGesture, gateReason, killGesture, moveGesture, wheelImpulse } from './app/premium-earth/ambient/earthGesture.js?v=53c0693';
import { earthMotionTuningFor } from './app/premium-earth/ambient/earthMotionTuning.js?v=53c0693';
import { createEarthDebug } from './earthDebugHud.js?v=53c0693';
const experience = document.getElementById('place-experience');
const earthMap = document.getElementById('earth-map');
/* null unless the address says ?earthdebug=1: a local, opt-in panel for diagnosing the gesture on a real phone (earthDebugHud.ts). */
const dbg = createEarthDebug();
if (!(experience instanceof HTMLElement && earthMap instanceof HTMLElement)) {
    dbg?.log('MODULE NOT INSTALLED: #place-experience or #earth-map missing');
}
if (experience instanceof HTMLElement && earthMap instanceof HTMLElement) {
    dbg?.log('MODULE INSTALLED');
    /* Still far from 1:1, but the world should answer unmistakably rather than
       politely. A screenful of scroll (~800px) now turns the planet about 52
       degrees; reading a long pillar page carries it well round. Raised from
       0.035, which read as a clear response but not yet as the page and the
       planet moving together. */
    const degreesPerScrolledPixel = 0.065;
    /* The same idea for the offline ambient globe, which has no camera to write: the scroll delta becomes extra rotation
       that the globe spends smoothly itself (AmbientGlobeSession.nudge). Gentler than the Google value: this globe is a
       small, distant backdrop, and 800px of scroll turns it about 40 degrees. */
    const ambientDegreesPerScrolledPixel = 0.05;
    /* HOW HARD THE EARTH ANSWERS (earthMotionTuning.ts): the finger's impulse and the scroll's rotation are scaled here, at the one place each leaves this file,
       so the same scale holds mid-page and at a boundary, for a finger and for a wheel. `?earthMotion=baseline` is 1 everywhere. */
    const motionTuning = earthMotionTuningFor(window.location.search);
    /* A fling can deliver a very large delta in one frame. This caps what any
       single write may spend, so the planet eases through a fast scroll instead of
       jumping with it. It has to rise with the rate above: left where it was, the
       cap and not the rate would decide the speed of every fast scroll, and the
       increase would be swallowed into a longer tail instead of showing up as
       more rotation. At 20 Hz this ceiling is 40 degrees per second. */
    const maxDegreesPerWrite = 2;
    /* What fraction of the outstanding rotation each write spends. Below 1 it
       produces a settle after the finger stops rather than a dead halt, and it is
       what keeps a fast scroll from arriving all at once. Lowered from 0.3: the
       smaller the share, the longer the planet keeps carrying once the scroll
       ends, which is the continuum itself. Roughly doubles the tail. */
    const spendPerWrite = 0.16;
    /* CEILING ON THE CARRY.
       pendingDegrees was previously unbounded, which was safe only because the
       old spend rate drained it almost as fast as scrolling could fill it. With
       nearly twice the rate and a tail twice as long, a sustained fling would
       otherwise wind up a backlog the planet keeps spending long after the reader
       has stopped and moved on - continuum turning into a runaway spin that no
       longer answers anything. Clamped, the carry stays expressive and bounded:
       from a full backlog it runs about three seconds and covers this many
       degrees, then rests. */
    const maxCarryDegrees = 45;
    /* Below this there is nothing left worth writing; the loop ends here. */
    const restEpsilonDegrees = 0.004;
    const writeIntervalMillis = 50;
    /* One scroll event carrying more than this is a jump - a programmatic
       scrollTo, an anchor, a layout change swapping the content out - not someone
       dragging. Rotating for it would read as a lurch. */
    const jumpThresholdPixels = 240;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let pendingDegrees = 0;
    let frame = 0;
    let lastWriteAt = 0;
    const lastScrollTop = new WeakMap();
    const ambientEarth = () => (window.knowThyselfAmbientEarth ?? null);
    const liveMap = () => (earthMap.querySelector('gmp-map-3d'));
    /* Only where content actually scrolls over the globe. Outside the pillar
       stages this module contributes nothing and registers no work. */
    const onPillarScreen = () => Boolean(experience.dataset.pillarStage);
    const stop = () => {
        if (frame)
            window.cancelAnimationFrame(frame);
        frame = 0;
        pendingDegrees = 0;
    };
    const step = (now) => {
        frame = 0;
        if (Math.abs(pendingDegrees) < restEpsilonDegrees || !onPillarScreen()) {
            pendingDegrees = 0;
            return;
        }
        if (now - lastWriteAt >= writeIntervalMillis) {
            lastWriteAt = now;
            const map = liveMap();
            if (!map) {
                pendingDegrees = 0;
                return;
            }
            const share = pendingDegrees * spendPerWrite;
            const advance = Math.max(-maxDegreesPerWrite, Math.min(maxDegreesPerWrite, share));
            const centre = map.center;
            const lng = Number(centre?.lng);
            const lat = Number(centre?.lat);
            if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
                pendingDegrees = 0;
                return;
            }
            try {
                /* lat is written back exactly as read: this only ever turns the world in
                   longitude. altitude is preserved so the assignment cannot imply a zoom. */
                map.center = {
                    lat,
                    lng: lng + advance,
                    ...(Number.isFinite(Number(centre?.altitude)) ? { altitude: Number(centre?.altitude) } : {}),
                };
            }
            catch {
                pendingDegrees = 0;
                return;
            }
            pendingDegrees -= advance;
        }
        frame = window.requestAnimationFrame(step);
    };
    const startLoop = () => {
        if (frame || reducedMotion.matches)
            return;
        frame = window.requestAnimationFrame(step);
    };
    /* True from a swipe's first touch to its last: the gesture feeds the planet then, and scroll deltas must not (see above). */
    let fingerDown = false;
    let gesture = null;
    const handleScroll = (event) => {
        if (reducedMotion.matches || !onPillarScreen())
            return;
        const target = event.target;
        if (!target)
            return;
        const node = target === document || target === document.documentElement
            ? document.scrollingElement
            : target;
        if (!(node instanceof Element))
            return;
        const top = node.scrollTop;
        const previous = lastScrollTop.get(target);
        lastScrollTop.set(target, top);
        if (previous === undefined)
            return;
        const delta = top - previous;
        if (dbg && delta !== 0) {
            dbg.state.scrollEvents += 1;
            dbg.state.lastScrollDelta = delta;
            dbg.state.fingerDownSuppressingScroll = fingerDown;
            if (gesture)
                dbg.state.nativeScrollMoved = true;
            dbg.touched();
        }
        if (delta === 0 || Math.abs(delta) > jumpThresholdPixels)
            return;
        /* The finger is feeding the planet already: counting the scroll it caused would turn it twice as far. */
        if (fingerDown)
            return;
        /* The Earth behind a destination is the ambient globe whenever one is mounted: it takes the scroll directly, and
           there is no Google map to write to. */
        const ambient = ambientEarth();
        if (ambient) {
            ambient.nudge(delta * ambientDegreesPerScrolledPixel * motionTuning.scrollScale);
            return;
        }
        pendingDegrees = Math.max(-maxCarryDegrees, Math.min(maxCarryDegrees, pendingDegrees + delta * degreesPerScrolledPixel));
        startLoop();
    };
    /* Capture, because scroll does not bubble: this sees every scroller in the
       page through one registration. Passive, so it can never delay the scroll. */
    document.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    /* ---------------------------------------------------------- the finger */
    /* Where a swipe is not the planet's: a text field, a slider, an open dialog or editor, anything that opts out. */
    const OPT_OUT = 'input, textarea, select, [contenteditable="true"], [data-earth-gesture="off"], [role="dialog"], [aria-modal="true"]';
    /* The touch's whole composed path, not only its leaf: an opt-out ancestor is found wherever the finger landed under it. */
    const pathOf = (event) => {
        const path = typeof event.composedPath === 'function' ? event.composedPath() : [];
        const nodes = path.length > 0 ? path : [event.target];
        return nodes.filter((node) => node instanceof Element);
    };
    /* Which screen the touch is on is read from the app's state (onPillarScreen), never from what the finger hit. */
    const gateOf = (event) => gateReason({
        reducedMotion: reducedMotion.matches,
        onDestination: onPillarScreen(),
        /* No screen of the app is an editor any more (the Settings editor pages were retired); the gate keeps the input, and its order, for the day one is. */
        editorOpen: false,
        hasGlobe: ambientEarth() !== null,
        optedOut: pathOf(event).some((node) => node.matches(OPT_OUT)),
    });
    const gestureAllowed = (event) => gateOf(event) === '';
    let trackedTouch = -1;
    const endGesture = () => {
        gesture = null;
        trackedTouch = -1;
        fingerDown = false;
    };
    const labelOf = (target) => (target instanceof Element ? `${target.tagName.toLowerCase()}.${String(target.className).split(' ')[0].slice(0, 28)}` : '-');
    /* Diagnostics only: what the touch landed on, its path up the tree, and which destination surface (if any) it is inside. */
    const describeTouch = (event) => {
        if (!dbg)
            return;
        const path = pathOf(event);
        dbg.state.targetLabel = labelOf(event.target);
        dbg.state.pathSummary = path.slice(0, 5).map((node) => labelOf(node)).join(' < ');
        const surface = path.find((node) => node.matches('.kt-pillar-surface'));
        dbg.state.destinationMatch = surface ? labelOf(surface) : 'NONE';
    };
    const debugScrollTop = () => {
        const surface = [...document.querySelectorAll('.kt-pillar-surface')].find((node) => !node.hidden && getComputedStyle(node).display !== 'none');
        return surface ? surface.scrollTop : 0;
    };
    const debugSessionId = () => {
        const snapshot = ambientEarth()?.snapshot?.();
        return snapshot?.debug?.id ?? null;
    };
    let impulseRefusalLogged = false;
    /** Sends the impulse and, in debug, reports exactly what the globe did with it. */
    const sendImpulse = (model) => {
        const globe = ambientEarth();
        if (!globe) {
            dbg?.log('IMPULSE_REJECTED no-ambient-session');
            return;
        }
        const value = model * motionTuning.gestureScale;
        globe.impulse(value);
        if (!dbg)
            return;
        dbg.state.impulseRequested = value;
        dbg.state.impulseCount += 1;
        dbg.state.gestureSessionId = debugSessionId();
        const result = globe.snapshot().debug.lastImpulse;
        if (result && !result.accepted) {
            if (!impulseRefusalLogged) {
                impulseRefusalLogged = true;
                dbg.log(`IMPULSE_REJECTED ${result.reason}`);
            }
        }
        else if (dbg.state.impulseCount % 6 === 1)
            dbg.log(`IMPULSE ${value >= 0 ? '+' : ''}${value.toFixed(1)} spin ${result?.before.toFixed(1)}->${result?.after.toFixed(1)}`);
        dbg.touched();
    };
    const handleTouchStart = (event) => {
        if (dbg) {
            dbg.state.touchstart += 1;
            dbg.state.oneFinger = event.touches.length === 1;
            dbg.state.nativeScrollMoved = false;
            dbg.state.scrollTopAtStart = debugScrollTop();
            dbg.state.dx = 0;
            dbg.state.dy = 0;
            dbg.state.accumulatedVertical = 0;
            dbg.state.velocityPxPerSecond = 0;
            dbg.state.lastMoveAt = 0;
            dbg.state.slopPassed = false;
            dbg.state.verticalPassed = null;
            impulseRefusalLogged = false;
            describeTouch(event);
        }
        if (event.touches.length > 1) {
            /* A second finger: a pinch is not a swipe. The scroll feeds again for whatever the page does with it. */
            if (gesture)
                gesture = killGesture(gesture);
            fingerDown = false;
            if (dbg) {
                dbg.state.gesture = 'rejected';
                dbg.state.gateReason = 'second-finger';
                dbg.log(`GESTURE_REJECTED second finger (touches=${event.touches.length})`);
            }
            return;
        }
        const touch = event.changedTouches[0];
        const blocked = dbg ? gateOf(event) : '';
        if (!touch || !gestureAllowed(event)) {
            endGesture();
            if (dbg) {
                dbg.state.gesture = 'rejected';
                dbg.state.targetOptOut = blocked === 'target-opt-out';
                dbg.state.gateReason = blocked || 'no-touch';
                dbg.log(`TOUCH_START blocked: ${blocked || 'no-touch'}`);
            }
            return;
        }
        gesture = beginGesture(touch.clientX, touch.clientY);
        trackedTouch = touch.identifier;
        if (dbg) {
            dbg.state.gesture = 'candidate';
            dbg.state.targetOptOut = false;
            dbg.state.gateReason = 'allowed';
            dbg.state.activeTouchId = touch.identifier;
            dbg.state.x = touch.clientX;
            dbg.state.y = touch.clientY;
            dbg.state.gestureSessionId = debugSessionId();
            dbg.log(`TOUCH_START id=${touch.identifier} on ${labelOf(event.target)}`);
        }
    };
    const handleTouchMove = (event) => {
        if (dbg)
            dbg.state.touchmove += 1;
        if (!gesture || event.touches.length > 1)
            return;
        for (const touch of Array.from(event.changedTouches)) {
            if (touch.identifier !== trackedTouch)
                continue;
            const before = gesture;
            const step = moveGesture(gesture, touch.clientX, touch.clientY);
            gesture = step.state;
            /* The finger is the planet's input from the moment it is a swipe, whether or not the page is scrolling under it. */
            if (gesture.phase === 'swipe')
                fingerDown = true;
            if (dbg) {
                const now = performance.now();
                const dt = dbg.state.lastMoveAt ? now - dbg.state.lastMoveAt : 0;
                const dyStep = touch.clientY - (dbg.state.y ?? touch.clientY);
                dbg.state.lastMoveDt = dt;
                dbg.state.lastMoveAt = now;
                dbg.state.velocityPxPerSecond = dt > 0 ? (dyStep / dt) * 1000 : 0;
                dbg.state.x = touch.clientX;
                dbg.state.y = touch.clientY;
                dbg.state.dx = touch.clientX - before.startX;
                dbg.state.dy = touch.clientY - before.startY;
                dbg.state.accumulatedVertical = dbg.state.dy;
                dbg.state.slopPassed = Math.hypot(dbg.state.dx, dbg.state.dy) >= GESTURE.slopPixels;
                if (before.phase === 'pending' && gesture.phase === 'swipe') {
                    dbg.state.verticalPassed = true;
                    dbg.state.gesture = 'accepted';
                    dbg.log(`GESTURE_ACCEPTED dx=${dbg.state.dx.toFixed(0)} dy=${dbg.state.dy.toFixed(0)}`);
                }
                else if (before.phase === 'pending' && gesture.phase === 'dead') {
                    dbg.state.verticalPassed = false;
                    dbg.state.gesture = 'rejected';
                    dbg.state.gateReason = 'not-mostly-vertical';
                    dbg.log(`GESTURE_REJECTED sideways dx=${dbg.state.dx.toFixed(0)} dy=${dbg.state.dy.toFixed(0)}`);
                }
                const moved = debugScrollTop() - (dbg.state.scrollTopAtStart ?? 0);
                if (Math.abs(moved) > 1)
                    dbg.state.nativeScrollMoved = true;
                dbg.touched();
            }
            if (step.impulse !== 0)
                sendImpulse(step.impulse);
            return;
        }
    };
    const handleTouchEnd = () => {
        if (dbg) {
            dbg.state.touchend += 1;
            dbg.state.gesture = 'idle';
            dbg.state.activeTouchId = null;
            dbg.state.fingerDownSuppressingScroll = false;
            dbg.log('TOUCH_END');
        }
        endGesture();
    };
    const handleTouchCancel = () => {
        if (dbg) {
            dbg.state.touchcancel += 1;
            dbg.state.gesture = 'cancelled';
            dbg.state.activeTouchId = null;
            dbg.log('TOUCH_CANCEL');
        }
        endGesture();
    };
    /* The wheel feeds where the page cannot scroll: otherwise the scroll events already carry it. */
    const scrollerFor = (target) => {
        let node = target instanceof Element ? target : null;
        while (node && node !== document.body && node !== document.documentElement) {
            const overflowY = getComputedStyle(node).overflowY;
            if ((overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight + 1)
                return node;
            node = node.parentElement;
        }
        return document.scrollingElement;
    };
    const handleWheel = (event) => {
        if (dbg)
            dbg.state.wheel += 1;
        if (event.ctrlKey || !gestureAllowed(event))
            return;
        const scroller = scrollerFor(event.target);
        if (scroller) {
            const room = scroller.scrollHeight - scroller.clientHeight;
            const movable = event.deltaY > 0 ? scroller.scrollTop < room - 1 : scroller.scrollTop > 1;
            if (movable)
                return;
        }
        const impulse = wheelImpulse(event.deltaY, event.deltaMode);
        if (impulse !== 0)
            sendImpulse(impulse);
    };
    document.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true, capture: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true, capture: true });
    document.addEventListener('touchcancel', handleTouchCancel, { passive: true, capture: true });
    document.addEventListener('wheel', handleWheel, { passive: true, capture: true });
    /* A gesture never outlives the screen it began on or a page that went away. */
    window.addEventListener('hashchange', endGesture);
    window.addEventListener('pagehide', endGesture);
    document.addEventListener('visibilitychange', () => { if (document.hidden)
        endGesture(); });
    const handleMotionPreference = () => {
        if (reducedMotion.matches)
            stop();
    };
    if (typeof reducedMotion.addEventListener === 'function') {
        reducedMotion.addEventListener('change', handleMotionPreference);
    }
}
