import { cardTargets, cardTransitionActive, enforceSingleVisibleCard, registerCardRoots, runCardTransition, } from './onboardingCardTransition.js?v=d9f39e7';
/*
 * ONBOARDING OVERLAY ROUTES
 * -------------------------
 * ONE GLOBE, MANY OVERLAYS.
 *
 * After the intro the Earth is the product. PLACE, VESSEL, IDENTITY and ARRIVAL
 * are not separate scenes - they are cards above one continuous globe. An
 * earlier revision routed them through the black-boundary controller, which was
 * correct for a scene replacement and wrong here: it blacked the screen out
 * between every card and hid the globe the whole experience is built around.
 *
 * Card navigation therefore runs through runOverlayTransition: same owner, same
 * cancellation guarantees, no cover. The outgoing card leaves, state changes,
 * the incoming card arrives - and the globe is never faded, moved, re-posed or
 * re-mounted at any point.
 *
 * The black boundary is still the right tool for the intro, where the tunnel
 * genuinely is replaced by the Earth. It is simply no longer used here.
 *
 * WHY IT INTERCEPTS CLICKS
 * onboardingCardFade already owns every navigation control through a capture
 * listener on `document`, and it re-dispatches the control to reach the
 * underlying navigation logic. Rewriting the navigation in the entry module and
 * in onboardingBackNavigation would mean two systems racing for the same
 * controls. Instead this claims the routes it has converted, and leaves every
 * other control to the existing card fade untouched.
 *
 * Capture on `window` runs before capture on `document`, so precedence over the
 * card fade is guaranteed by the event model rather than by import order.
 *
 * Behind the outgoing card the original control is re-dispatched, so the
 * existing navigation logic runs exactly once and unchanged. A re-entrancy
 * guard keeps that re-dispatch from being read as a second navigation intent.
 */
const experience = document.getElementById('place-experience');
const interactionDock = document.getElementById('interaction-dock');
const vesselStage = document.getElementById('vessel-stage');
if (experience instanceof HTMLElement
    && interactionDock instanceof HTMLElement
    && vesselStage instanceof HTMLElement) {
    const profileFlow = vesselStage.querySelector('.profile-flow');
    /*
     * Converted routes. Every pair is bidirectional: no route is converted in one
     * direction only, because a polished forward with a legacy back is worse than
     * leaving both alone - the two directions stop matching.
     *
     *   PLACE   <-> VESSEL     confirm-place / vessel-back
     *   VESSEL  <-> IDENTITY   confirm-vessel / profile-identity-back
     *   IDENTITY<-> ARRIVAL    profile-identity-next / profile-arrival-back
     *
     *   ARRIVAL <-> OVERVIEW  profile-create / (OVERVIEW's reverse is per-row
     *                          "Change" editing, owned by profileOverviewFlow,
     *                          which now runs the SAME shared transition)
     */
    const routes = [
        { selector: '#confirm-place', destination: { state: 'vessel' } },
        { selector: '.vessel-back', destination: { state: 'ready' } },
        { selector: '#confirm-vessel', destination: { state: 'identity', step: 'identity' } },
        { selector: '.profile-identity-back', destination: { state: 'vessel' } },
        { selector: '#profile-identity-next', destination: { state: 'arrival', step: 'arrival' } },
        { selector: '#profile-arrival-back', destination: { state: 'identity', step: 'identity' } },
        { selector: '#profile-create', destination: { state: 'complete', step: 'complete' } },
    ];
    const routeSelectors = routes.map((route) => route.selector).join(',');
    const destinationFor = (control) => {
        for (const route of routes) {
            if (control.matches(route.selector))
                return route.destination;
        }
        return null;
    };
    /* Fade targets, opacity and timing all come from the shared card transition,
       so this module cannot drift away from the rest of the onboarding. */
    const query = (root, selector) => (root ? [...root.querySelectorAll(selector)] : []);
    /*
     * THE COMPLETE VISUAL SURFACE OF EACH STATE.
     *
     * One root per card, taken from the design hierarchy - not discovered by
     * walking descendants. Each root carries the card's entire chrome: glass,
     * borders, capsules, buttons, shadows and content, so the card fades as one
     * object and can never leave a shell behind for the next card to sit on.
     *
     *   PLACE     #interaction-dock   (search capsule + birthplace card)
     *   VESSEL    .vessel-content     (prompt, orbit selector, actions)
     *   IDENTITY  #profile-identity-form
     *   ARRIVAL   #profile-arrival-form
     *   OVERVIEW  #profile-complete
     *
     * The three profile panels are siblings inside .profile-flow, so each is
     * addressed individually; fading .profile-flow itself would fade the incoming
     * panel along with the outgoing one.
     */
    const targetsFor = (environment) => {
        if (environment.state === 'ready')
            return cardTargets([interactionDock]);
        if (environment.state === 'vessel') {
            return cardTargets([vesselStage.querySelector('.vessel-content')]);
        }
        const panel = environment.state === 'identity' ? '#profile-identity-form'
            : environment.state === 'arrival' ? '#profile-arrival-form'
                : '#profile-complete';
        return cardTargets([profileFlow?.querySelector(panel)]);
    };
    const currentEnvironment = () => {
        const state = experience.dataset.state ?? '';
        const step = profileFlow?.dataset.step ?? '';
        if (state === 'vessel' && !vesselStage.classList.contains('is-profile-flow'))
            return { state: 'vessel' };
        if (!profileFlow?.hidden && step === 'identity')
            return { state: 'identity', step: 'identity' };
        if (!profileFlow?.hidden && step === 'arrival')
            return { state: 'arrival', step: 'arrival' };
        if (!profileFlow?.hidden && step === 'complete')
            return { state: 'complete', step: 'complete' };
        return { state: 'ready' };
    };
    const environmentReached = (destination) => {
        const actual = currentEnvironment();
        return actual.state === destination.state
            && (destination.step === undefined || actual.step === destination.step);
    };
    /* ------------------------------------------------------------ focus safety */
    /*
     * A focused text field that is about to be hidden keeps the Android keyboard
     * up and, worse, can be scrolled back into view by the browser while the
     * screen is mid-transition. Blur before anything moves.
     */
    const blurActiveField = () => {
        const active = document.activeElement;
        if (active instanceof HTMLElement && (active instanceof HTMLInputElement
            || active instanceof HTMLTextAreaElement
            || active.isContentEditable)) {
            active.blur();
        }
    };
    /* --------------------------------------------------------------- the route */
    const earthContainer = () => document.getElementById('earth-map');
    /*
     * PLACE needs the globe at the world view. It almost always already is:
     * beginVesselStage() flies home on the way out, so by the time the user comes
     * back there is nothing to correct and the correct action is to do NOTHING -
     * touching the camera here would be a visible recentre for no reason.
     *
     * When the camera genuinely is elsewhere, the correction is the ANIMATED
     * showWorld() flight, watched by the user, not an instant pose assignment.
     * Snapping the pose is only safe behind an opaque cover; in full view it is
     * the "sudden recentre flash" this model exists to avoid.
     */
    const ensureEarthAtWorld = () => {
        const container = earthContainer();
        if (!container || container.dataset.earthView === 'world')
            return;
        const showWorld = window
            .knowThyselfShowEarthWorld;
        showWorld?.();
    };
    /*
     * PERSISTENT GLOBE, TWO MODES.
     * The globe is on screen for every step. What changes is whether it accepts
     * input: PLACE is the only stage where the map is a selection surface. In
     * every other stage it is a live backdrop - still painting, still drifting,
     * but with tilt, zoom and tap-to-select inert.
     */
    const applyEarthMode = (environment) => {
        experience.dataset.earthMode = environment.state === 'ready' ? 'place' : 'onboarding';
    };
    /*
     * RE-ENTRANCY, NOT TRUST
     * The click re-dispatched behind black must reach the original navigation
     * logic without starting a second route. `isTrusted` would express that only
     * indirectly - and would also reject legitimate programmatic navigation. The
     * precise condition is "this is the click I am currently re-dispatching", so
     * that is what is guarded.
     *
     * This also covers onboardingBackNavigation's synthetic `.vessel-back` click,
     * which it fires purely to reset the vessel selector's private focus state
     * while returning from IDENTITY. That click is dispatched synchronously from
     * the `.profile-identity-back` handler during our own re-dispatch, so it is
     * caught here and never mistaken for a navigation intent.
     */
    let redispatching = false;
    const runRoute = (control, destination) => {
        const origin = currentEnvironment();
        experience.dataset.ktRoute = `${origin.state}->${destination.state}`;
        void runCardTransition({
            /* Interaction dies before anything moves. A focused field is blurred so
               the Android keyboard cannot stay up across the change. */
            lock: () => {
                blurActiveField();
                interactionDock.inert = true;
                vesselStage.inert = true;
            },
            /* The globe is deliberately absent from this list: it is the persistent
               background, never a fade target. PLACE is treated exactly like every
               other card, so confirming a birthplace fades over the same 2 s as any
               other step instead of the 260 ms that made it feel abrupt. */
            outgoing: () => targetsFor(origin),
            /* Runs at opacity 0, after a committed paint - so nothing is hidden,
               rebuilt or swapped while any of it is still visible. */
            swap: async () => {
                // The real navigation logic - the entry module's beginVesselStage, or
                // onboardingBackNavigation's returnToPlace - runs here.
                redispatching = true;
                try {
                    control.click();
                }
                finally {
                    redispatching = false;
                }
                // Wait for the destination to actually exist. PLACE -> VESSEL passes
                // through an intermediate `confirmed` state on a 650 ms timer; treating
                // that as arrival would reveal a card that is not there yet.
                const startedAt = performance.now();
                while (!environmentReached(destination) && performance.now() - startedAt < 3_000) {
                    await new Promise((resolve) => { window.setTimeout(resolve, 40); });
                }
                applyEarthMode(destination);
                if (destination.state === 'ready')
                    ensureEarthAtWorld();
            },
            isReady: () => environmentReached(destination),
            readinessTimeoutMillis: 6_000,
            // Read AFTER the swap, so it describes the card that actually arrived.
            incoming: () => targetsFor(currentEnvironment()),
            unlock: () => {
                if (destination.state === 'ready') {
                    interactionDock.inert = false;
                    vesselStage.inert = true;
                    /* Deliberately no focus() here. Returning to PLACE must show the
                       search interface without summoning the Android keyboard, which
                       would resize the viewport the moment the scene became visible. */
                }
                else {
                    vesselStage.inert = false;
                    interactionDock.inert = true;
                }
                delete experience.dataset.ktRoute;
            },
        });
    };
    const handleRouteIntent = (event) => {
        // Our own re-dispatch must pass straight through to the navigation logic.
        if (redispatching)
            return;
        const target = event.target;
        if (!(target instanceof Element))
            return;
        const control = target.closest(routeSelectors);
        if (!(control instanceof HTMLElement))
            return;
        if (control instanceof HTMLButtonElement && control.disabled)
            return;
        const destination = destinationFor(control);
        if (!destination)
            return;
        event.preventDefault();
        event.stopImmediatePropagation();
        /* One transition owns the screen. A second tap - or a rapid Back/Next while
           the first is still running - is dropped rather than superseding it, so a
           half-finished route can never leave a control inert or the cover opaque.
           This is also the outer guard for any click raised while a route is mid
           flight, including the synthetic vessel-selector reset described above. */
        if (cardTransitionActive())
            return;
        runRoute(control, destination);
    };
    // Capture on window precedes capture on document, so this claims its routes
    // before onboardingCardFade sees them.
    window.addEventListener('click', handleRouteIntent, true);
    const style = document.createElement('style');
    style.dataset.onboardingOverlayRoutes = 'true';
    style.textContent = `
    /* While a route owns the screen the legacy shell transitions must not also
       animate the same elements: the controller drives them frame by frame. */
    #place-experience.kt-transition-active .interaction-dock,
    #place-experience.kt-transition-active .vessel-stage,
    #place-experience.kt-transition-active .profile-flow,
    #place-experience.kt-transition-active .profile-panel {
      transition-duration: 0ms !important;
      transition-delay: 0ms !important;
    }

    /* THE GLOBE IS NEVER PART OF A CARD TRANSITION.
       The stage-level rules that dim the Earth for a non-PLACE step - notably
       .vessel-active .earth-map { opacity: 0.34 } - are overridden so that
       moving between cards cannot fade, dim or hide it. Only overlays change.

       Scoped to a FINISHED intro on purpose: while the intro is running the
       Earth's opacity belongs to the intro, which deliberately holds it at 0
       during map-revealing. Forcing it to 1 there would expose the renderer
       before the approach and regress the opening. */
    #place-experience[data-intro-state="complete"][data-earth-mode] .earth-map,
    #place-experience[data-intro-state="complete"][data-earth-mode] .earth-map > gmp-map-3d {
      opacity: 1 !important;
    }

    /* NOTE ON INPUT IN THE NON-PLACE STAGES.
       The globe deliberately stays ROTATABLE outside PLACE - that is the
       approved, device-reviewed "living globe" interaction, and
       onboardingEarthGestureAccess exists solely to route those gestures to the
       real Map3DElement. Killing pointer-events here would silently delete it.

       What is actually restricted is restricted elsewhere, and already:
         - tilt and zoom  -> onboardingEarthCameraConstraints clamps tilt and
                             swallows wheel, dblclick and multi-touch in the
                             capture phase, so the camera is rotation-only;
         - tap-to-select  -> premiumEarthMap gates selection on effective range,
                             so at the world pose point-selection is 'disabled'.

       The mode attribute therefore describes the stage for styling and tests; it
       is not a second, conflicting owner of Earth input. */
  `;
    document.head.append(style);
    window.addEventListener('pagehide', () => {
        window.removeEventListener('click', handleRouteIntent, true);
        modeObserver.disconnect();
        style.remove();
    }, { once: true });
    /* Every card root in the onboarding, so the shared transition can hold the
       single-visible-card invariant across all of them - not only the two it
       happens to be moving between. */
    /* Readable from any screenshot via the debug panel, and from the console
       without it: which build is this device actually running. */
    experience.dataset.ktBuild = document.querySelector('meta[name="kt-build"]')
        ?.getAttribute('content') ?? 'unknown';
    registerCardRoots(() => [
        interactionDock,
        vesselStage.querySelector('.vessel-content'),
        profileFlow?.querySelector('#profile-identity-form'),
        profileFlow?.querySelector('#profile-arrival-form'),
        profileFlow?.querySelector('#profile-complete'),
        // The pillar surfaces are ordinary cards over the same persistent globe, so
        // the single-visible-card invariant must cover them too.
        vesselStage.querySelector('#pillar-hub'),
        vesselStage.querySelector('#pillar-view'),
    ].filter((root) => root instanceof HTMLElement));
    // The globe is present from the first frame of PLACE onwards, so the mode is
    // stamped immediately rather than only on the first navigation.
    applyEarthMode(currentEnvironment());
    const modeObserver = new MutationObserver(() => {
        if (cardTransitionActive())
            return;
        applyEarthMode(currentEnvironment());
        /* An OVERVIEW edit puts a card on screen that does not correspond to the
           onboarding state, so its own transition owns visibility there. */
        if (experience.dataset.overviewEdit)
            return;
        /*
         * And so does a pillar surface, for exactly the same reason. currentEnvironment()
         * only ever describes an ONBOARDING card - it has no notion of the hub or a
         * pillar - so once one of those is on screen this observer would answer
         * "the visible card should be #profile-complete" and retire the hub.
         *
         * It never fired on that path before because reaching the hub does not
         * change data-state. A QA preset does change it, on its way to forcing the
         * committed state, and the enforcement then landed AFTER the hub had
         * opened: dataset said `hub`, the screen showed the birthplace step. The
         * pillar experience owns visibility whenever it has a stage, the same way
         * an overview edit does.
         */
        if (experience.dataset.pillarStage)
            return;
        enforceSingleVisibleCard(targetsFor(currentEnvironment()));
    });
    modeObserver.observe(experience, { attributes: true, attributeFilter: ['data-state'] });
}
