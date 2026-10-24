import { nextPaint, environmentFadeMillis, uiFadeMillis } from './onboardingTransitions.js';
import { deactivateCard, runCardTransition } from './onboardingCardTransition.js';
/*
 * EARTH INTRO REVEAL ORDERING
 * ---------------------------
 * The opening used to CROSSFADE: releaseWarp() faded the tunnel overlay out over
 * 2200 ms while the Earth was already zooming underneath it. Two environments
 * were visible at once, there was no black boundary, and the entire approach
 * from 900,000 km happened behind the fading tunnel - so the user never saw the
 * journey, only a sudden full Earth once the fade finished.
 *
 * The corrected order is:
 *
 *   tunnel -> tunnel becomes pure black (video hidden, overlay still opaque)
 *          -> committed black frame
 *          -> Earth confirmed at the tiny far pose behind the black
 *          -> black fades away revealing the TINY Earth
 *          -> the approach runs in full view
 *          -> canonical Earth
 *          -> search
 *
 * Note on technique: the approach is driven by the real camera, not by a CSS
 * scale on the map container. Scaling that container down would expose its
 * rectangular edge against the page, and a visible map boundary is exactly one
 * of the artefacts this work has to eliminate.
 */
const experience = document.getElementById('place-experience');
const earthMap = document.getElementById('earth-map');
if (experience instanceof HTMLElement && earthMap instanceof HTMLElement) {
    const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let revealed = false;
    let observer = null;
    const warpOverlay = () => document.getElementById('spacetime-intro');
    /* The Earth is only worth revealing once the renderer has something real to
       show; revealing a blank renderer is the "black -> loading artefacts -> Earth"
       failure. A far camera pose plus a mounted map is the readable signal here. */
    /* The Earth is a canvas of this product's own: it is ready when it says so. */
    const earthLooksReady = () => earthMap.dataset.earthMapState === 'ambient';
    const revealFromBlack = async () => {
        if (revealed)
            return;
        revealed = true;
        experience.dataset.ktIntroReveal = 'black';
        const overlay = warpOverlay();
        if (overlay) {
            // The tunnel stops being a picture and becomes the black separator itself:
            // no crossfade against the Earth underneath it.
            overlay.classList.add('kt-intro-blackout');
            await nextPaint();
        }
        // Committed black frame before anything of the Earth is exposed.
        experience.dataset.ktIntroReveal = 'confirming-earth';
        await nextPaint();
        if (!earthLooksReady()) {
            // Stay black rather than reveal a preparing renderer, but bounded so the
            // opening can never strand on black.
            const startedAt = performance.now();
            while (!earthLooksReady() && performance.now() - startedAt < 6_000) {
                await new Promise((resolve) => window.setTimeout(resolve, 60));
            }
        }
        experience.dataset.ktIntroReveal = 'revealing-tiny-earth';
        await nextPaint();
        if (overlay) {
            overlay.classList.add('kt-intro-dissolve');
            await new Promise((resolve) => window.setTimeout(resolve, reducedMotion() ? 0 : environmentFadeMillis));
            overlay.remove();
        }
        experience.dataset.ktIntroReveal = 'approach-visible';
    };
    /* SEARCH REVEAL
       The search interface used to inherit the generic 2000 ms card fade, which
       both dragged and was not sequenced against the Earth. It is now owned here:
       it may only start once the canonical Earth is stable, and interaction
       unlocks only after it has reached full opacity. */
    /* The Earth has no range to measure. It is at its resting size once the arrival has ended (the session writes 'world' then). */
    const earthIsCanonical = () => (earthMap.dataset.earthMapState === 'ambient'
        && earthMap.dataset.earthView !== 'preloading'
        && earthMap.dataset.earthView !== 'intro-zoom');
    let searchRevealed = false;
    /* Ownership is claimed immediately, not at reveal time. The legacy dock fade
       is driven by .intro-ui-visible, which is applied long before the canonical
       Earth exists; claiming late meant that 2 s fade had already run and the
       search was simply inheriting it. */
    const claimSearchDock = () => {
        const dock = document.getElementById('interaction-dock');
        if (!(dock instanceof HTMLElement))
            return;
        dock.classList.add('kt-search-managed');
        dock.inert = true;
        experience.dataset.ktSearchReveal = 'hidden';
    };
    claimSearchDock();
    /* The pillar experience is a card stack of its own over the same globe. Once
       it has a stage, it owns what is on screen, and the onboarding's opening
       sequence must not paint over it. */
    const pillarOwnsScreen = () => Boolean(experience.dataset.pillarStage);
    /*
     * ...AND SO DOES EVERY OTHER CARD, FOR EXACTLY THE SAME REASON.
     *
     * The pillar stage alone was too narrow a question. An onboarding that has
     * been COMMITTED BY OTHER MEANS - a QA preset, a restored session - lands in
     * enterOverview(), and from there the reader walks on to Review and opens an
     * editor. Opening one DELETES data-pillar-stage. This reveal, still waiting
     * out its eight seconds for the canonical Earth, then asked the old question,
     * was told no pillar owned the screen, and dealt the birthplace step over the
     * open editor: the arrival form faded to inline opacity 0 with the PLACE dock
     * - search field, birthplace card, Back/Confirm - behind the time picker.
     *
     * So the question is not "is a pillar on screen" but "is ANY other card", and
     * each of them is already legible in the DOM:
     *
     *   data-pillar-stage          the portrait, the hub, a pillar reading
     *   data-overview-edit         an OVERVIEW editor (place, vessel, identity, time)
     *   .profile-flow not hidden   IDENTITY, ARRIVAL, or the OVERVIEW review card
     *   .vessel-active             the VESSEL step and everything staged inside it
     *
     * A first run has none of them while this runs - the profile flow does not
     * exist on screen until a birthplace has been confirmed, which cannot happen
     * before the dock this reveal is about has been revealed - so the opening
     * sequence is untouched.
     */
    /* By CLASS, and looked up on each call. The section is BUILT by vesselOrbit
       rather than written in the page, it carries no id, and it does not exist at
       all when this module is evaluated - so a cached element or an id lookup
       would silently answer "no card on screen" for ever. */
    const profileFlowOnScreen = () => {
        const flow = experience.querySelector('.profile-flow');
        return flow instanceof HTMLElement && !flow.hidden;
    };
    const anotherCardOwnsScreen = () => (pillarOwnsScreen()
        || Boolean(experience.dataset.overviewEdit)
        || experience.classList.contains('vessel-active')
        || profileFlowOnScreen());
    /*
     * STANDING DOWN IS A HANDOVER, NOT A DISAPPEARANCE.
     *
     * The dock is held invisible by .kt-search-managed, and only
     * .kt-search-visible releases that hold. A reveal that merely returned would
     * leave the hold on for the rest of the session, and two things downstream
     * depend on it coming off:
     *
     *   - OVERVIEW -> "Change birthplace" fades the dock in through the shared
     *     card transition, which CLEARS its inline opacity when it finishes. With
     *     the hold still on, the dock would be handed straight back to a rule
     *     that forces 0 and the birthplace editor would open blank.
     *   - onboardingAmbientBackdrop latches its field on that same class, so a
     *     restored session would lose the ambient background entirely.
     *
     * So standing down leaves the dock in precisely the resting state a completed
     * reveal leaves it in - released to the card system - and then retires it the
     * way the card system retires any card that is not the live one: an inline
     * `opacity: 0 !important`, which outranks the class and which the next real
     * transition overwrites on its way in.
     */
    const standDown = (dock) => {
        dock.classList.add('kt-search-visible');
        deactivateCard(dock);
        dock.inert = true;
        experience.dataset.ktSearchReveal = 'stood-down';
    };
    const revealSearch = async () => {
        if (searchRevealed)
            return;
        searchRevealed = true;
        const dock = document.getElementById('interaction-dock');
        if (!(dock instanceof HTMLElement))
            return;
        if (anotherCardOwnsScreen()) {
            standDown(dock);
            return;
        }
        // Wait for the canonical Earth rather than a timer, so the interface never
        // appears over a still-moving approach.
        const startedAt = performance.now();
        while (!earthIsCanonical() && performance.now() - startedAt < 8_000) {
            /* The wait is abandoned the moment another card takes the screen, rather
               than run to its end and questioned afterwards. Eight seconds is a long
               time to keep holding a decision that has already been made elsewhere. */
            if (anotherCardOwnsScreen()) {
                standDown(dock);
                return;
            }
            await new Promise((resolve) => window.setTimeout(resolve, 80));
        }
        /*
         * ...and asked again on the far side of that wait, which is the half that
         * actually mattered. This reveal is a card transition with the PLACE dock
         * as its incoming card, so finishing it retires every other card - the
         * pillar hub included.
         *
         * A QA preset opens the hub from wherever the tester was standing, and if
         * it did that while this was still waiting for the Earth, the reveal
         * landed up to eight seconds later and put the birthplace step back over
         * the hub. That is the "tapping a preset sometimes lands on the birthplace
         * step" bug, and the eight seconds are why it was only sometimes.
         *
         * Nothing changes for a normal load: no pillar surface exists until the
         * profile is created, long after this has run.
         */
        if (anotherCardOwnsScreen()) {
            standDown(dock);
            return;
        }
        experience.dataset.ktSearchReveal = 'preparing';
        dock.inert = true;
        dock.classList.add('kt-search-visible');
        await nextPaint();
        /* The first PLACE card enters through the SAME shared card transition as
           every later step, so its entrance is the 2 s whole-card fade rather than a
           short CSS opacity change that read as appearing instantly. There is no
           outgoing card - the Earth alone is on screen - so only the fade-in runs.
    
           completeIntro() clears inert on its own schedule and can land mid-fade;
           the lock is held for the whole reveal and released once, last. */
        experience.dataset.ktSearchReveal = 'revealing';
        let holding = true;
        const holdLock = () => {
            if (!holding)
                return;
            if (dock.inert === false)
                dock.inert = true;
            window.requestAnimationFrame(holdLock);
        };
        holdLock();
        await runCardTransition({
            outgoing: () => [],
            incoming: () => [dock],
            unlock: () => {
                holding = false;
                experience.dataset.ktSearchReveal = 'visible';
                dock.inert = false;
            },
        });
        /* A SUPERSEDED transition never calls unlock - and the hold is a rAF loop
           that would then run for the rest of the session, forcing the dock inert
           on every frame. Tapping a preset while this fade was already running was
           enough to do it, which is the same race as the one above, one step later.
           The lock is released whichever way the transition ended; the rest of the
           resting state still belongs to whichever transition won. */
        holding = false;
    };
    /* Exit: interaction off, search fully to opacity 0, a committed paint frame,
       and only then may an environment fade begin. Nothing may sit over black. */
    const hideSearch = async () => {
        const dock = document.getElementById('interaction-dock');
        if (!(dock instanceof HTMLElement))
            return;
        dock.inert = true;
        experience.dataset.ktSearchReveal = 'hiding';
        dock.classList.remove('kt-search-visible');
        await new Promise((resolve) => window.setTimeout(resolve, reducedMotion() ? 0 : uiFadeMillis));
        experience.dataset.ktSearchReveal = 'hidden';
        await nextPaint();
    };
    /* Return: the mirror of hideSearch. An environment route brings the Earth
       back first and only then calls this, so the search never fades in over a
       scene that is still arriving. Deliberately does NOT focus the input -
       focusing it here would summon the Android keyboard the instant PLACE
       became visible and resize the scene under it. */
    const showSearch = async () => {
        const dock = document.getElementById('interaction-dock');
        if (!(dock instanceof HTMLElement))
            return;
        dock.classList.add('kt-search-managed');
        experience.dataset.ktSearchReveal = 'revealing';
        dock.classList.add('kt-search-visible');
        await new Promise((resolve) => window.setTimeout(resolve, reducedMotion() ? 0 : uiFadeMillis));
        experience.dataset.ktSearchReveal = 'visible';
        dock.inert = false;
    };
    /* earth-zooming is the frame the approach begins on. Revealing here - rather
       than when it ends - is what makes the journey visible: tiny Earth first,
       then the continuous approach, then the canonical Earth. */
    const syncIntroState = () => {
        const intro = experience.dataset.introState;
        if (intro === 'earth-zooming' || intro === 'search-revealing' || intro === 'complete') {
            void revealFromBlack();
        }
        /* revealFromBlack above is about the Earth and is always wanted - the globe
           is the backdrop of every screen. Revealing the SEARCH is a card, and a
           card must not be dealt over another one.
           That judgement is made INSIDE revealSearch and nowhere else. Declining
           here instead left the dock pinned invisible by .kt-search-managed with
           nothing ever to release it, because no further data-intro-state change
           follows 'complete' - so a restored session could reach OVERVIEW with a
           birthplace editor that opens blank. Standing down is a handover, and a
           handover has to actually run. */
        if (intro === 'search-revealing' || intro === 'complete') {
            void revealSearch();
        }
    };
    const style = document.createElement('style');
    style.dataset.onboardingEarthIntroSequence = 'true';
    style.textContent = `
    /* Neutralise the legacy 2200 ms crossfade: the overlay must not fade while
       the Earth is visible underneath it. */
    #spacetime-intro.is-releasing {
      opacity: 1 !important;
      transition: none !important;
    }

    /* Step 1 - the tunnel becomes a pure black separator. */
    #spacetime-intro.kt-intro-blackout {
      opacity: 1 !important;
      background: #000 !important;
      transition: none !important;
    }

    #spacetime-intro.kt-intro-blackout video {
      opacity: 0 !important;
      visibility: hidden !important;
    }

    /* Step 2 - black dissolves, exposing the tiny Earth at the start of its
       approach. This is the only moment the Earth becomes visible. */
    #spacetime-intro.kt-intro-dissolve {
      opacity: 0 !important;
      pointer-events: none !important;
      transition: opacity ${environmentFadeMillis}ms cubic-bezier(0.4, 0, 0.2, 1) !important;
    }

    /* The Earth itself must not run its own long opacity fade during the
       handoff; the cover owns the reveal, so the map is simply already there. */
    #place-experience[data-kt-intro-reveal="approach-visible"] .earth-map,
    #place-experience[data-kt-intro-reveal="revealing-tiny-earth"] .earth-map {
      opacity: 1 !important;
      transition: none !important;
    }

    /* SEARCH: owned here, not by the legacy 2 s card fade. The legacy rule keyed
       on .intro-ui-visible is explicitly overridden so there is one owner. */
    #place-experience .interaction-dock.kt-search-managed,
    #place-experience:not(.intro-ui-visible) .interaction-dock.kt-search-managed {
      opacity: 0 !important;
      visibility: visible !important;
      transition: opacity ${uiFadeMillis}ms cubic-bezier(0.4, 0, 0.2, 1) !important;
    }

    #place-experience .interaction-dock.kt-search-managed.kt-search-visible {
      opacity: 1 !important;
    }

    /* onboardingCardFade zeroes the dock's transition-duration while a card
       transition is running, which snapped this fade to a single frame. The
       managed search owns its own timing. */
    #place-experience.is-card-fade-transition .interaction-dock.kt-search-managed {
      transition: opacity ${uiFadeMillis}ms cubic-bezier(0.4, 0, 0.2, 1) !important;
    }

    /* The legacy per-element content fade must not also drive these controls. */
    #place-experience .interaction-dock.kt-search-managed .place-search > *,
    #place-experience .interaction-dock.kt-search-managed .birthplace-copy,
    #place-experience .interaction-dock.kt-search-managed .birthplace-actions > * {
      transition: none !important;
    }

    @media (prefers-reduced-motion: reduce) {
      #spacetime-intro.kt-intro-dissolve { transition-duration: 1ms !important; }
      #place-experience .interaction-dock.kt-search-managed { transition-duration: 1ms !important; }
    }
  `;
    document.head.append(style);
    observer = new MutationObserver(syncIntroState);
    observer.observe(experience, { attributes: true, attributeFilter: ['data-intro-state'] });
    syncIntroState();
    window.addEventListener('pagehide', () => {
        observer?.disconnect();
        style.remove();
    }, { once: true });
}
