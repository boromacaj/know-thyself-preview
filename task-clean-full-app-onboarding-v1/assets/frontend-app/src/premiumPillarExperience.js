import { givenNameKnowledgeReady, whenGivenNameKnowledgeReady } from './app/given-name/givenNameReading.js?v=f9ab0a6';
import { composeSynthesisReading } from './app/synthesis-reading/composeSynthesisReading.js?v=f9ab0a6';
import { unifiedPatternFromSynthesis } from './app/synthesis-reading/unifiedPatternFromSynthesis.js?v=f9ab0a6';
import { LOCALE_CHANGED_EVENT } from './localeControl.js?v=f9ab0a6';
import { cardTargets, runCardTransition } from './onboardingCardTransition.js?v=f9ab0a6';
import { readPremiumProfileBridge } from './app/premium-earth/premiumProfileBridge.js?v=f9ab0a6';
import { HUMAN_DESIGN_HERO_CSS } from './app/premium-earth/humanDesignHeroStyle.js?v=f9ab0a6';
import { connectHumanDesignHero } from './app/premium-earth/humanDesignHeroController.js?v=f9ab0a6';
import { writeStoredDestination, } from './app/premium-earth/profilePersistence.js?v=f9ab0a6';
import { centreActiveStop, retireProfileSurfaces, visibleProfileSurfaces, } from './app/premium-earth/profileSurfaces.js?v=f9ab0a6';
import { PREMIUM_CONNECTIONS_STAGE, PREMIUM_FORECAST_STAGE, PREMIUM_MENU_STAGE, PREMIUM_SYNTHESIS_STAGE, PREMIUM_TAROT_STAGE, destinationSlugs, profileStops, renderPremiumPillarNav, renderPremiumPillarView, } from './app/premium-earth/premiumPillarScreens.js?v=f9ab0a6';
import { renderPremiumSynthesisView } from './app/premium-earth/premiumSynthesisScreen.js?v=f9ab0a6';
import { computePremiumResult, readPremiumResult, subscribeToPremiumResult, } from './app/premium-earth/premiumResultStore.js?v=f9ab0a6';
/*
 * THE PROFILE EXPERIENCE
 * ----------------------
 * Crystallize the vessel -> run the existing engine -> the portrait.
 *
 * IT USED TO STOP AT A HUB. The engine ran, six cards appeared, and the reader
 * chose one. That put the four traditions in front of the thing they were for:
 * the integrated portrait was the sixth card, reached last, and the forecast was
 * a button underneath. The hub is gone. A finished profile opens on the
 * portrait, and the six destinations live in one strip at the bottom of every
 * screen, so any of them is one tap from any other.
 *
 * Three deliberate choices, unchanged by that:
 *
 *  - The Earth stays. The pillar surfaces are ordinary cards inside
 *    #place-experience, so the persistent globe remains mounted and visible
 *    behind them exactly as it is during onboarding. No new scene system is
 *    introduced, and no environment is replaced.
 *
 *  - Navigation reuses the APPROVED card transition. Entering the profile and
 *    moving between destinations both run through runCardTransition, so they
 *    inherit the same ordering, the same easing and the single-visible-card
 *    invariant. Destination switching asks it for the SHORT pace, which is
 *    defined beside the card pace in that module: a tab that costs four seconds
 *    is not a tab. There is still no second animation system.
 *
 *  - Nothing here calculates or interprets. It reads the stored
 *    ProfileExperience and hands it to pure renderers.
 */
const experienceHost = document.getElementById('place-experience');
const vesselStage = document.getElementById('vessel-stage');
if (experienceHost instanceof HTMLElement && vesselStage instanceof HTMLElement) {
    const pillarView = document.createElement('section');
    pillarView.id = 'pillar-view';
    pillarView.className = 'kt-pillar-surface';
    pillarView.hidden = true;
    pillarView.inert = true;
    /*
     * THE FLOATING DESTINATION STRIP.
     *
     * A sibling of the reading rather than a child of it, for one structural
     * reason: a bar floating over the article OVERLAPS it, and the card fade
     * refuses to split a surface whose children overlap - it would fall back to
     * fading the whole surface, which makes it a backdrop root and blinds every
     * frosted capsule inside for the entire transition. Kept separate, both
     * surfaces split cleanly and the glass survives the fade.
     *
     * It is a separate FADE TARGET for the same reason it is a separate element:
     * it must arrive and leave on the same tween as the reading it belongs to.
     */
    const pillarNav = document.createElement('nav');
    pillarNav.id = 'pillar-nav';
    pillarNav.className = 'kt-pillar-nav';
    pillarNav.hidden = true;
    pillarNav.inert = true;
    vesselStage.append(pillarView, pillarNav);
    const activate = (surface) => {
        surface.hidden = false;
        surface.inert = false;
        /*
         * A surface that comes back must come back square. Chrome restores scroll
         * offsets across a reload and on a bfcache restore, and it restores BOTH
         * axes - so a pillar that had been dragged sideways before a refresh came
         * back still dragged sideways. The overflow that made that possible is
         * fixed above; this makes sure an offset that was already stored cannot
         * outlive it, on this load or on any old tab that gets restored later.
         */
        surface.scrollLeft = 0;
    };
    const deactivate = (surface) => {
        surface.hidden = true;
        surface.inert = true;
    };
    /*
     * ONBOARDING CHROME.
     *
     * The OVERVIEW card is #profile-complete, but three pieces of its stage live
     * OUTSIDE that root and therefore outside the single-visible-card invariant:
     * the prompt layer carrying the overview title, the vessel orbit selector, and
     * the Earth rim glow. Retiring only the card left all three painted over the
     * portrait. They are faded out with the card and held retired by CSS while a
     * profile destination is on screen, then released on the way back.
     *
     * #earth-map is deliberately NOT in this list: the globe is the persistent
     * scene and stays at opacity 1 throughout.
     */
    const onboardingChrome = () => ([
        vesselStage.querySelector('#profile-complete'),
        vesselStage.querySelector('.kt-prompt-layer'),
        vesselStage.querySelector('#vessel-orbit'),
        vesselStage.querySelector('.kt-earth-rim'),
    ].filter((element) => element instanceof HTMLElement));
    /*
     * THE ONBOARDING'S CONTROLS, WHILE A READING OWNS THE SCREEN.
     *
     * WHAT THIS FIXES. Opacity 0 removes an element from the PAINT and from
     * nothing else. It keeps its place in the tab order and in the accessibility
     * tree, so a reader on the portrait was still being offered every control of
     * the onboarding they had already finished. Measured on the portrait, at
     * 375x812: twelve invisible tab stops before the first visible one - both name
     * fields, Next, the date and time rows, Back, "Review details", and the
     * birthplace search behind them - and the same controls read out by name to a
     * screen reader, "Birth name", "TIME OF ARRIVAL 12:05", "REVIEW DETAILS".
     *
     * Pressing Enter on one of them ran it. The invisible "Review details"
     * submitted the arrival form, which returns to the overview WITHOUT clearing
     * data-pillar-stage - leaving the app on a reading stage showing an overview
     * card at opacity 0, and a birth-date picker that opened, took input and
     * committed a date entirely unseen.
     *
     * Touch was never affected: the CSS that fades this chrome sets
     * pointer-events: none with it, and a 5x5 sweep over every one of those
     * controls found no live point. That is exactly why it survived on a phone -
     * the defect is only reachable by the two input methods nobody tests on one.
     *
     * `inert` is the attribute that takes an element out of BOTH, so it is what
     * the reading stages set.
     *
     * ROOTS, NOT THE CONTROLS THEMSELVES. inert covers a subtree, but clearing an
     * ancestor's does NOT clear one written on a descendant. The identity form,
     * the arrival form and the picker layer are reopened by profileOverviewFlow,
     * which clears the flag on `.profile-flow` and on nothing below it - so
     * inerting them individually here would leave the editors permanently
     * unreachable. Holding it at the two roots the onboarding's own code already
     * owns keeps every one of those releases working exactly as written.
     */
    const onboardingControlRoots = () => ({
        flow: vesselStage.querySelector('.profile-flow'),
        dock: experienceHost.querySelector('#interaction-dock'),
    });
    const retireOnboardingControls = () => {
        const { flow, dock } = onboardingControlRoots();
        if (flow)
            flow.inert = true;
        if (dock)
            dock.inert = true;
    };
    /*
     * AND BACK, FOR THE OVERVIEW.
     *
     * The flow returns live: the overview card is inside it, and so are the two
     * editors that card opens.
     *
     * The dock does not, and that asymmetry is the correct value rather than an
     * omission. The birthplace search belongs to the PLACE step and to the
     * overview's own "Change birthplace", which turns it back on itself in
     * preparePlaceEditor(); the overview this returns to wants it inert, which is
     * the same write enterOverview() makes for the same reason.
     */
    const releaseOnboardingControls = () => {
        const { flow, dock } = onboardingControlRoots();
        if (flow)
            flow.inert = false;
        if (dock)
            dock.inert = true;
    };
    /*
     * THE SYNTHESIS READING, RE-COMPOSED FOR THE CURRENT LANGUAGE.
     *
     * `crossPillarReading` is composed once when the profile is created, so on its
     * own it would be frozen in whatever language was active then - every pillar
     * would translate and the synthesis would stay English.
     *
     * It is done HERE rather than in the synthesis screen because that screen is
     * required by test to read only from `crossPillarReading` and `unifiedPattern`
     * and never to reach into the synthesis layer itself. That rule is worth
     * keeping: it is what stops a second, untested synthesis growing inside the
     * presentation code. So the orchestrator hands the screen an experience whose
     * reading is already current, and the screen stays exactly as pure as it was.
     *
     * Safe because the foundation MODEL on `reading.source` is language-independent
     * - evidence, weights, themes, tensions, all arithmetic - and the composer over
     * it is deterministic. In English it reproduces the cached reading exactly.
     */
    const localizedResult = () => {
        const result = readPremiumResult();
        const reading = result.experience?.crossPillarReading;
        if (!result.experience || !reading)
            return result;
        /*
         * THE SUMMARY CARD IS DERIVED FROM THE READING, SO IT IS DERIVED AGAIN HERE.
         *
         * WHAT THIS FIXES. Only the reading was recomposed. `unifiedPattern` - the
         * card at the top of the portrait, its headline theme, the convergence
         * strip and the tension list - stayed exactly as it was computed, in the
         * language the profile happened to be computed in. So a reader who created
         * their profile in Slovak and then switched to English met an English
         * reading under a Slovak summary: „Štruktúrovaný postup", „Vlastný smer",
         * „Chuť riskovať", on the same screen as the English prose explaining them.
         * The reverse leaked the other way, which is how it was found.
         *
         * It is built from the reading, not from the model, so composing it from
         * the reading that was just composed is the whole fix - one derivation, one
         * language, and nothing cached across a language change.
         */
        const localized = composeSynthesisReading(reading.source);
        return {
            ...result,
            experience: {
                ...result.experience,
                crossPillarReading: localized,
                unifiedPattern: unifiedPatternFromSynthesis(localized, result.experience.pillars.map((pillar) => pillar.id)),
            },
        };
    };
    const renderPillar = (pillarId) => {
        const { experience } = localizedResult();
        const pillar = experience?.pillars.find((candidate) => candidate.id === pillarId);
        if (!pillar)
            return false;
        pillarView.innerHTML = renderPremiumPillarView(pillar, experience?.input.givenNames);
        /* THE NAME CORPUS ARRIVES A MOMENT LATE, ON PURPOSE.
           It is several hundred kilobytes serving one section, so it is not on the
           onboarding load graph. The first render of a pillar therefore composes
           without it; this starts the fetch and re-renders once, in place, when it
           lands. `givenNameKnowledgeReady()` guards the recursion, so this can run
           at most once per session and never loops. */
        if (!givenNameKnowledgeReady()) {
            whenGivenNameKnowledgeReady(() => {
                if (experienceHost.dataset.pillarActive !== pillarId)
                    return;
                renderPillar(pillarId);
            });
        }
        return true;
    };
    /* The portrait opens onto the SAME surface as a pillar, through the SAME
       transition. A second stage would have meant a second scroll container, a
       second inert lifecycle and a second way to leave, none of which it needs. */
    const SYNTHESIS_STAGE = PREMIUM_SYNTHESIS_STAGE;
    const renderNav = (activeId) => {
        const { experience } = localizedResult();
        pillarNav.innerHTML = experience ? renderPremiumPillarNav(experience, activeId) : '';
        centreActiveStop(pillarNav);
    };
    const renderSynthesis = () => {
        const { experience } = localizedResult();
        if (!experience)
            return false;
        pillarView.innerHTML = renderPremiumSynthesisView(experience);
        return true;
    };
    /* ------------------------------------------------------------ navigation */
    /*
     * THE DESTINATION IS IN THE URL.
     *
     * Not a routing framework, and not a rewrite of one: six ids, a hash, and
     * popstate. What it buys is what a reader already expects a browser to do -
     * the phone's back gesture returns to the previous destination instead of
     * leaving the profile, and a destination can be linked to.
     *
     * It is deliberately one-way-safe. The hash is written when a destination
     * opens and read when the history moves, and nothing else consults it, so a
     * hash naming nothing - or naming something before a profile exists - is
     * ignored and onboarding runs exactly as it always did.
     */
    /* Taken from the destination table rather than declared again here: the strip
       and the router then cannot disagree about what a destination is called. */
    const DESTINATION_HASHES = destinationSlugs();
    const stopForHash = (hash) => {
        const slug = hash.replace(/^#\/?/, '');
        const found = Object.entries(DESTINATION_HASHES).find(([, value]) => value === slug);
        return found ? found[0] : null;
    };
    /** True while a popstate is being applied, so restoring does not push again. */
    let restoringHistory = false;
    const rememberDestination = (activeId) => {
        const slug = DESTINATION_HASHES[activeId];
        if (!slug)
            return;
        /*
         * THE DEVICE REMEMBERS TOO, AND IT REMEMBERS DURING A BACK GESTURE AS WELL.
         *
         * The history guard below exists to stop a popstate restore from pushing
         * the entry it is already standing on. It should not stop the stored
         * destination being updated: someone who goes back to the portrait and then
         * closes the tab was last on the portrait, and that is what should reopen.
         * The write is a no-op when nothing is stored, so this cannot leave a
         * destination pointing at a profile that does not exist.
         */
        writeStoredDestination(slug);
        if (restoringHistory)
            return;
        const url = `#/${slug}`;
        if (window.location.hash === url)
            return;
        /* replaceState for the FIRST destination and push for the rest: the
           portrait is where a finished profile lands rather than somewhere the
           reader navigated to, so a back gesture from it should leave the profile
           instead of re-entering onboarding and coming straight back. */
        const method = experienceHost.dataset.pillarStage === 'pillar' ? 'pushState' : 'replaceState';
        window.history[method]({ ktDestination: activeId }, '', url);
    };
    /** Shared by the four pillars and the portrait: only the active id differs. */
    const openOnPillarSurface = (activeId, render) => {
        if (!render())
            return;
        renderNav(activeId);
        /* Moving BETWEEN destinations: the one being left is already on this
           surface, so it is what fades out. Arriving from onboarding, the
           onboarding chrome is. */
        /*
         * WHATEVER IS ON SCREEN IS WHAT FADES OUT.
         *
         * This used to name the surface it expected to be leaving, which was safe
         * while the only two possibilities were the hub and this surface. It is not
         * any more: the forecast is a sibling destination with a surface of its own,
         * so arriving here from the forecast has to fade the forecast. Asking the
         * DOM which surfaces are actually visible answers for every case, including
         * the ones added later.
         */
        const leavingReading = experienceHost.dataset.pillarStage === 'pillar';
        const chrome = leavingReading ? [] : onboardingChrome();
        const leaving = leavingReading ? visibleProfileSurfaces(vesselStage) : chrome;
        rememberDestination(activeId);
        void runCardTransition({
            /* The short pace. Switching destination is a lookup, not a journey. */
            pace: 'destination',
            lock: () => {
                for (const element of chrome)
                    element.inert = true;
                /* Unconditional, unlike the chrome above: `chrome` is empty when one
                   reading is replacing another because it is already retired, but a
                   lock that cannot be wrong on the way in is cheaper to trust than one
                   that depends on where the reader came from. */
                retireOnboardingControls();
                pillarView.inert = true;
                pillarNav.inert = true;
            },
            outgoing: () => cardTargets(leaving),
            swap: () => {
                if (!leavingReading) {
                    const panel = vesselStage.querySelector('#profile-complete');
                    if (panel)
                        deactivate(panel);
                }
                retireProfileSurfaces(vesselStage, [pillarView, pillarNav]);
                activate(pillarView);
                activate(pillarNav);
                experienceHost.dataset.pillarStage = 'pillar';
                experienceHost.dataset.pillarActive = activeId;
                // A newly opened screen always starts at the top of its own content.
                pillarView.scrollTop = 0;
            },
            incoming: () => cardTargets([pillarView, pillarNav]),
            unlock: () => { pillarView.inert = false; pillarNav.inert = false; },
        });
    };
    /*
     * THE PORTRAIT, FORCED, FROM WHEREVER THE APP HAPPENS TO BE.
     *
     * WHY THIS IS NOT A HAND-ROLLED SHORTCUT. It was once: it ran the lock, swap
     * and unlock straight through and skipped runCardTransition, to avoid
     * animating the review screen out on the way past. That skipped the two
     * things the transition alone does - it fades the INCOMING card up from zero,
     * and it retires every other card - so the destination was left at opacity 0
     * with the birthplace layer showing straight through it. runCardTransition
     * documents itself as the single visibility owner, and this is what going
     * around it costs.
     *
     * So the transition runs, and the review screen is skipped by giving it
     * NOTHING to fade out instead. A preset is not leaving a card the reader was
     * looking at; it is materialising one.
     *
     * The swap retires the onboarding card AND every other surface, so it does
     * not matter which of them the tester was on - the point of a preset is that
     * it does not depend on the current stage.
     */
    const forcePortraitFromCommitted = () => {
        if (!computeFromCommittedProfile())
            return false;
        /* Compatibility name, new product home: QA presets and session restore
           still call this handle, but a completed profile now lands in the Main
           Menu rather than in the old destination strip. */
        leaveForMenu();
        document.dispatchEvent(new CustomEvent('kt-open-menu'));
        return true;
    };
    /* Back to OVERVIEW, so the profile can still be edited after it has been
       crystallised - which is what makes edit-driven recalculation reachable. The
       control lives on the portrait now that the hub is gone; the route it runs
       is the one it always ran. */
    const returnToOverview = () => {
        const panel = vesselStage.querySelector('#profile-complete');
        const chrome = onboardingChrome();
        void runCardTransition({
            lock: () => { pillarView.inert = true; pillarNav.inert = true; },
            outgoing: () => cardTargets([pillarView, pillarNav]),
            swap: () => {
                deactivate(pillarView);
                deactivate(pillarNav);
                /* The flow first, then the card inside it: an ancestor left inert would
                   hold the overview out of reach however open the card itself says it
                   is. */
                releaseOnboardingControls();
                if (panel) {
                    panel.hidden = false;
                    panel.inert = false;
                }
                delete experienceHost.dataset.pillarStage;
                delete experienceHost.dataset.pillarActive;
                for (const element of chrome)
                    element.inert = false;
            },
            incoming: () => cardTargets(chrome),
            unlock: () => { },
        });
    };
    const openPillar = (pillarId) => {
        openOnPillarSurface(pillarId, () => renderPillar(pillarId));
    };
    const openSynthesis = () => {
        openOnPillarSurface(SYNTHESIS_STAGE, renderSynthesis);
    };
    /*
     * THE FORECAST IS THE OTHER MODULE'S SURFACE, AND THE STRIP IS STILL ONE STRIP.
     *
     * numerologyForecastExperience owns the forecast surface, its state and its
     * own copy of the strip, and claims the same click on its own listener. All
     * this controller does is stand its own surface down, so the two are never
     * both visible. The retiring is symmetrical and neither module imports the
     * other.
     */
    const leaveForForecast = () => {
        rememberDestination(PREMIUM_FORECAST_STAGE);
        /* Nothing is hidden here. The forecast controller runs the transition for
           this navigation and retires these two inside its swap, at opacity 0 -
           hiding them now would make them disappear before the fade, and two
           controllers running runCardTransition for one tap would have them
           supersede each other. */
    };
    /* Tarot is the same arrangement as the forecast: a surface of its own in another module, which runs the transition
       for this navigation and retires these two inside its swap. Only the destination is recorded here. */
    const leaveForTarot = () => {
        rememberDestination(PREMIUM_TAROT_STAGE);
    };
    /* Connections is the same arrangement a fourth time: a surface of its own in another module, which runs the transition and retires these two inside its swap. */
    const leaveForConnections = () => {
        rememberDestination(PREMIUM_CONNECTIONS_STAGE);
    };
    /* The main menu is the same arrangement a third time: a surface of its own in another module, which runs the
       transition and retires these two inside its swap. Only the destination is recorded here. */
    const leaveForMenu = () => {
        rememberDestination(PREMIUM_MENU_STAGE);
    };
    /*
     * BACK AND FORWARD.
     *
     * A destination is restored by opening it exactly as a tap would, so there is
     * one code path per destination rather than two. The flag stops the restore
     * from pushing the entry it is already standing on.
     */
    window.addEventListener('popstate', () => {
        if (experienceHost.dataset.pillarResult !== 'ready')
            return;
        const stop = stopForHash(window.location.hash);
        if (!stop || !profileStops().includes(stop))
            return;
        if (stop === experienceHost.dataset.pillarActive)
            return;
        restoringHistory = true;
        try {
            if (stop === PREMIUM_FORECAST_STAGE) {
                /* Announced rather than called: the forecast lives in the other module
                   and its own listener is the only thing that knows how to open it. */
                leaveForForecast();
                document.dispatchEvent(new CustomEvent('kt-open-forecast'));
            }
            else if (stop === PREMIUM_TAROT_STAGE) {
                leaveForTarot();
                document.dispatchEvent(new CustomEvent('kt-open-tarot'));
            }
            else if (stop === PREMIUM_CONNECTIONS_STAGE) {
                leaveForConnections();
                document.dispatchEvent(new CustomEvent('kt-open-connections'));
            }
            else if (stop === PREMIUM_MENU_STAGE) {
                leaveForMenu();
                document.dispatchEvent(new CustomEvent('kt-open-menu'));
            }
            else if (stop === SYNTHESIS_STAGE) {
                openSynthesis();
            }
            else {
                openPillar(stop);
            }
        }
        finally {
            restoringHistory = false;
        }
    });
    /* ------------------------------------------------- compute and enter */
    /**
     * Runs the engine from the committed onboarding profile. Called on
     * "Crystallize the vessel", and again whenever the profile is edited, so a
     * pillar can never keep showing a value the profile no longer supports.
     */
    const computeFromCommittedProfile = () => {
        const bridge = readPremiumProfileBridge();
        if (!bridge)
            return false;
        const result = computePremiumResult(bridge.readCommittedProfile());
        experienceHost.dataset.pillarResult = result.status;
        if (result.status === 'blocked') {
            experienceHost.dataset.pillarBlocked = result.missing.join(',');
        }
        else {
            delete experienceHost.dataset.pillarBlocked;
        }
        return result.status === 'ready';
    };
    /* A finished profile lands on the portrait. It used to land on a hub of six
       cards, which asked the reader to choose a system before they had been told
       anything - so the integrated reading, the one thing the profile is for, was
       the last card and one tap further away than any single tradition. */
    const enterProfileExperience = () => {
        if (!computeFromCommittedProfile())
            return;
        /* The profile becomes persistent only after the engines accept it. The
           first post-onboarding screen is now the Main Menu: it replaces the old
           destination strip as the product's primary interface. */
        readPremiumProfileBridge()?.commitProfile?.();
        leaveForMenu();
        document.dispatchEvent(new CustomEvent('kt-open-menu'));
    };
    /*
     * THE BODYGRAPH DECK.
     *
     * Delegated, because the chart is re-rendered every time a pillar is opened
     * and a listener bound to the element would be lost with it. State lives on
     * the deck as a data attribute and nowhere else - the stylesheet does the
     * whole animation from there, so nothing here has to know about timing,
     * z-order or geometry, and an interrupted transition cannot leave the deck
     * disagreeing with its own markup.
     */
    experienceHost?.addEventListener('click', (event) => {
        if (!(event.target instanceof Element))
            return;
        const toggle = event.target.closest('[data-hd-deck-toggle]');
        if (!toggle)
            return;
        const deck = toggle.closest('.hd-deck');
        if (!deck)
            return;
        const showingPanels = deck.dataset.hdDeck === 'panels';
        deck.dataset.hdDeck = showingPanels ? 'graph' : 'panels';
        toggle.setAttribute('aria-expanded', showingPanels ? 'false' : 'true');
    });
    /* THE HUMAN DESIGN HERO's few pieces of script: the keyboard on the nine centres, the ring that answers a tap, the scroll cue, and the pause of a graph nobody can see. */
    connectHumanDesignHero(pillarView);
    /* The final onboarding action is the commit point: the engine runs here and
       nowhere earlier, so typing never triggers a calculation. Captured on window
       so it is claimed before onboardingOverlayRoutes sees the same control. */
    window.addEventListener('click', (event) => {
        if (!(event.target instanceof Element))
            return;
        /* button[...] and not [...]: the host carries data-pillar-active as STATE, and
           a bare attribute selector made closest() match the host for every click in
           the app - see the rename below. Scoping to real controls is the second
           guard, so neither mistake alone can resurrect the bug. */
        const control = event.target.closest('#profile-overview-create, button[data-pillar-open], button[data-synthesis-open],'
            + ' button[data-forecast-open], button[data-tarot-open], button[data-connections-open], button[data-menu-open], [data-pillar-back], [data-pillar-review]');
        if (control === experienceHost)
            return;
        if (!(control instanceof HTMLElement))
            return;
        if (control.id === 'profile-overview-create') {
            event.preventDefault();
            event.stopImmediatePropagation();
            enterProfileExperience();
            return;
        }
        const openId = control.dataset.pillarOpen;
        if (openId) {
            event.preventDefault();
            openPillar(openId);
            return;
        }
        if (control.hasAttribute('data-synthesis-open')) {
            event.preventDefault();
            openSynthesis();
            return;
        }
        /* NOT preventDefault, and NOT stopped: the forecast's own listener is
           downstream of this one and is what actually opens it. This only stands the
           reading surface down so the two are never both on screen. */
        if (control.hasAttribute('data-forecast-open')) {
            leaveForForecast();
            return;
        }
        /* The same arrangement for Tarot: its own listener opens it. */
        if (control.hasAttribute('data-tarot-open')) {
            leaveForTarot();
            return;
        }
        /* And for Connections. */
        if (control.hasAttribute('data-connections-open')) {
            leaveForConnections();
            return;
        }
        /* And for the menu. */
        if (control.hasAttribute('data-menu-open')) {
            leaveForMenu();
            return;
        }
        if (control.hasAttribute('data-pillar-back')) {
            /* The last of the hub's routes. Nothing renders this control any more -
               the strip replaced it - but an old cached page can still carry one, and
               the portrait is where it meant to go. */
            event.preventDefault();
            openSynthesis();
            return;
        }
        if (control.hasAttribute('data-pillar-review')) {
            event.preventDefault();
            returnToOverview();
        }
    }, true);
    /* An OVERVIEW edit recomputes the whole experience. Re-rendering from the new
       result set is what guarantees no stale pillar value survives. */
    subscribeToPremiumResult((next) => {
        if (next.status !== 'ready')
            return;
        const open = experienceHost.dataset.pillarActive;
        if (experienceHost.dataset.pillarStage !== 'pillar' || !open)
            return;
        /* The synthesis is downstream of all four pillars, so an edit changes it
           more than it changes any single pillar. Re-rendering it here is what keeps
           a stale convergence from surviving a profile change. */
        if (open === SYNTHESIS_STAGE)
            renderSynthesis();
        else
            renderPillar(open);
        /* The labels are pillar titles, so they follow the same re-render. */
        renderNav(open);
    });
    /* A LANGUAGE CHANGE RE-RENDERS THE SAME WAY A PROFILE EDIT DOES.
       The readings are composed inside the render functions, so re-running them
       is all that is needed - there is no separate translated copy of anything to
       swap in, and no state to migrate. Deliberately identical in shape to the
       result subscription above, because it is the same problem: what is on
       screen was built from something that has just changed. */
    document.addEventListener(LOCALE_CHANGED_EVENT, () => {
        const open = experienceHost.dataset.pillarActive;
        if (experienceHost.dataset.pillarStage !== 'pillar' || !open)
            return;
        if (open === SYNTHESIS_STAGE)
            renderSynthesis();
        else
            renderPillar(open);
        /* Its labels are chrome, so they change with the language like the rest. */
        renderNav(open);
    });
    /* Premium design language, carried forward from the onboarding: dark cosmic
       ground, soft glass, generous spacing, one accent, mobile-first column. The
       globe stays visible: surfaces use a scrim rather than an opaque fill, so the
       scene continues behind the content instead of being replaced by it. */
    const style = document.createElement('style');
    style.dataset.premiumPillarExperience = 'true';
    style.textContent = `
    /*
     * THE PILLAR SCROLL SURFACE.
     *
     * onboardingEarthGestureAccess sets
     *   #place-experience.vessel-active #vessel-stage { pointer-events: none }
     * so that onboarding gestures fall through to the real Map3DElement. These
     * surfaces are children of that stage, so without an explicit override every
     * touch went THROUGH the hub and into the globe: no scrolling, and no card
     * ever opened. Verified with elementFromPoint over a hub card - it returned
     * gmp-map-3d, not the card.
     *
     * pointer-events is therefore restored here, and touch-action: pan-y tells
     * Android this layer owns vertical dragging, so a finger swipe scrolls the
     * content instead of rotating the Earth. The onboarding stage keeps its own
     * behaviour untouched; this override is scoped to the pillar surfaces.
     */
    /*
     * FLOATING READING NAVIGATION.
     *
     * Two illuminated capsules rather than a toolbar: no bar background, no
     * fill, nothing spanning the width. The strip itself is pointer-transparent
     * so the gap between the buttons never intercepts a scroll, a BodyGraph
     * drag, or a tap meant for the reading behind it - only the two buttons take
     * input.
     *
     * Positioned against the STAGE, not the scrolling surface, so it holds still
     * while the reading moves under it. position: absolute inside the stage does
     * that on its own; position: fixed would put it in the keyboard/viewport
     * negotiation that the onboarding already owns, which is not this feature's
     * business to touch.
     */
    /* Declared on the host so the reading's bottom padding and the capsules
       themselves are sized from ONE number; the nav is not an ancestor of the
       reading, so a token declared on it could never reach the padding rule. */
    #place-experience { --kt-pillar-nav-height: 46px; }

    #place-experience .kt-pillar-nav {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 8;
      display: flex;
      align-items: flex-end;
      /* One child now - the strip - and it is centred rather than spread. */
      justify-content: center;
      gap: 12px;
      padding:
        0
        max(16px, var(--safe-right, 16px))
        calc(max(var(--safe-bottom, 0px), env(safe-area-inset-bottom, 0px)) + 14px)
        max(16px, var(--safe-left, 16px));
      pointer-events: none;
    }

    #place-experience .kt-pillar-nav-button {
      pointer-events: auto;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      /* Comfortably past the 44px touch-target floor even before the padding. */
      min-height: var(--kt-pillar-nav-height);
      /* Measured, not guessed: a hard percentage cap truncated four of the five
         pairs at 375px. Letting the two shrink against each other instead means
         the cap is never the binding constraint, and the tighter tracking buys
         the ~30px that made the longest pair - Western Astrology beside Human
         Design - fit whole on a 375px screen. */
      flex: 0 1 auto;
      min-width: 0;
      padding: 0 16px;
      font: inherit;
      font-size: 11px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: rgba(250, 249, 245, 0.94);
      border: 1px solid rgba(var(--kt-surface-border-rgb, var(--kt-accent-soft-rgb, 255, 255, 255)), 0.42);
      border-radius: 999px;
      background: rgba(10, 13, 14, 0.5);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.03) inset,
        0 0 10px rgba(var(--kt-surface-border-rgb, var(--kt-accent-soft-rgb, 255, 255, 255)), 0.18),
        0 0 26px rgba(var(--kt-surface-border-rgb, var(--kt-accent-rgb, 255, 255, 255)), 0.12),
        0 0 34px -6px rgba(var(--kt-surface-border-rgb, var(--kt-accent-soft-rgb, 255, 255, 255)), 0.16) inset;
    }

    /*
     * THE DESTINATION STRIP.
     *
     * Six capsules in a scroller, and nothing about the capsule itself changed:
     * .kt-nav-stop sits on top of .kt-pillar-nav-button and adjusts only what
     * being one of six requires. The glass, the radius, the rim, the glow and
     * the type are the ones already above.
     *
     * WHY THE STRIP SCROLLS RATHER THAN THE CAPSULES SHRINKING. Six labels do
     * not fit across 375px. The two ways to make them fit are truncation and
     * icons, and both cost the reader the one thing a signpost is for - telling
     * BaZi from Human Design without tapping either. So the labels stay whole
     * and the strip scrolls inside itself. On a tablet or a desktop all six fit
     * and there is nothing to scroll; the same rules produce a centred row.
     *
     * overscroll-behavior-x: contain is what stops a swipe that runs off the
     * end of the strip from becoming a swipe on the page - which on a phone is
     * how a fixed layout starts drifting sideways.
     */
    #place-experience .kt-nav-strip {
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 8px;
      max-width: 100%;
      overflow-x: auto;
      overscroll-behavior-x: contain;
      -webkit-overflow-scrolling: touch;
      scroll-padding-inline: 40px;
      /* The scroller's own edges, so the first and last capsule are not flush
         against the screen when the strip is scrolled to either end.

         A scroller clips everything that overflows it, including a capsule's own
         glow (box-shadow, up to 26px). With 2px of padding the glow was cut off
         in a straight line along the strip's edge: round capsule, rectangular
         halo with square corners. The padding is now wider than the glow and the
         negative margin gives it back, so the strip occupies the same place and
         the glow fades out inside it, in the capsule's own shape. */
      padding: 30px;
      margin: -28px;
      /* A scrollbar over glass reads as a defect. The strip is scrolled by
         touch, by the active capsule being brought into view, and by a
         trackpad; none of the three needs the track drawn. */
      scrollbar-width: none;
    }
    #place-experience .kt-nav-strip::-webkit-scrollbar { display: none; }

    /* A capsule may not shrink: the whole point of the scroller is that the
       label survives. flex: 0 1 auto on the base button is right for a pair
       sharing one row and wrong for six that scroll. */
    #place-experience .kt-nav-stop {
      flex: 0 0 auto;
      white-space: nowrap;
      transition: border-color 180ms ease-in-out, background-color 180ms ease-in-out;
    }

    /*
     * WHERE THE READER IS.
     *
     * The same capsule with the accent turned up: a brighter rim, a warmer
     * ground and the label at full strength. No new colour and no new shape -
     * the difference is entirely in how much of the existing accent is showing,
     * which is how the rest of this interface marks state.
     */
    #place-experience .kt-nav-stop.is-active {
      color: rgba(255, 253, 248, 1);
      border-color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.72);
      background: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.16);
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.05) inset,
        0 0 12px rgba(var(--kt-accent-soft-rgb, 255, 255, 255), 0.24),
        0 0 30px rgba(var(--kt-accent-rgb, 255, 255, 255), 0.2),
        0 0 34px -6px rgba(var(--kt-accent-soft-rgb, 255, 255, 255), 0.2) inset;
    }

    /* An inactive capsule sits back so the active one reads first. */
    #place-experience .kt-nav-stop:not(.is-active) {
      color: rgba(250, 249, 245, 0.72);
    }

    /*
     * THE PORTRAIT'S OWN HEADER.
     *
     * Name, birthplace and the way into the details came off the retired hub.
     * They are set quieter than the title, because they identify the reading
     * rather than open it.
     */
    #place-experience .kt-portrait-identity {
      margin: 2px 0 0;
      font-size: 13px;
      line-height: 1.5;
      color: rgba(244, 241, 233, 0.7);
    }

    #place-experience .kt-portrait-review {
      align-self: flex-start;
      margin-top: 12px;
      min-height: 38px;
      padding: 0 16px;
      font: inherit;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(250, 249, 245, 0.8);
      border: 1px solid rgba(var(--kt-surface-border-rgb, var(--kt-accent-soft-rgb, 255, 255, 255)), 0.34);
      border-radius: 999px;
      background: rgba(10, 13, 14, 0.42);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
    }

    /* One line, always. A wrapped label would change the capsule's height and
       break the pair's alignment, so a long title is trimmed instead. */
    #place-experience .kt-pillar-nav-label {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    #place-experience .kt-pillar-nav-arrow {
      flex: none;
      font-size: 13px;
      letter-spacing: 0;
      opacity: 0.82;
    }

    /* The reading must be able to scroll clear of the capsules, or its last
       paragraph, its controls and the technical disclosure would sit under
       them. */
    #place-experience[data-pillar-stage="pillar"] .kt-pillar-surface .kt-reading {
      padding-bottom: calc(var(--kt-pillar-nav-height, 46px) + 34px);
    }

    #place-experience .kt-pillar-surface {
      position: absolute;
      inset: 0;
      z-index: 7;
      pointer-events: auto !important;
      touch-action: pan-y;
      overflow-y: auto;
      /*
       * Explicit, because "overflow-y: auto" alone does not mean vertical
       * only: with the other axis left at "visible" the used value of
       * overflow-x becomes "auto" as well, and the surface silently became a
       * horizontal scroller. touch-action above already said pan-y; this makes
       * the box agree with it.
       *
       * Not a mask for the deck overflow above - that is contained at its own
       * source. This is the axis that was never meant to scroll, so that no
       * future overflow can drift the pillar sideways again. Charts that DO
       * need to scroll sideways keep their own .kt-pillar-chart scroller.
       */
      overflow-x: hidden;
      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;
      padding:
        var(--kt-top-space, 46px)
        max(18px, var(--safe-right, 18px))
        calc(var(--safe-bottom, 18px) + 28px)
        max(18px, var(--safe-left, 18px));
      color: var(--ink, #f4f1e9);
      /* No scrim. This used to lay a top-to-bottom wash over the whole surface
         (rgba(3,5,6,.18) -> .72 -> .88), which darkened the live Earth behind
         the pillar rather than the pillar itself. The cards carry their own
         glass, so the background is left as it is. */
    }

    /*
     * ONE CONTENT COLUMN, THE MAIN MENU'S.
     *
     * The Main Menu is a centred column (.kt-menu: max-width 560px, margin 0 auto, in menuExperience.ts). An opened screen - the four readings, the synthesis,
     * the Forecast, Tarot - was the whole width of the window, so on a desktop a paragraph ran edge to edge. The planet, the sky and the wave field stay
     * full-bleed behind: it is only the CONTENT that is a column. The surface itself is unchanged - still the full-viewport scroller, so the scrollbar
     * sits at the window's edge and a wheel turn anywhere scrolls it - and the one block it holds is capped at the menu's own width and centred with
     * auto margins, in the surface's content box, which is exactly how the menu centres itself, so the two columns share a centre line.
     *
     * One token, so a screen cannot pick its own width: --kt-content-column is the menu's 560px. Below 560px plus the surface's 18px gutters the cap does
     * nothing and a phone is as it was. The Main Menu surface sets its own column and is not touched; no other surface is affected.
     */
    #place-experience { --kt-content-column: 560px; }
    #place-experience .kt-pillar-surface:not(.kt-menu-surface) > * {
      max-width: var(--kt-content-column);
      margin-left: auto;
      margin-right: auto;
    }

    /*
     * THE EARTH REVEAL: EVERY OPENED SCREEN ENDS ON THE PLANET.
     *
     * Every opened screen - the four readings, the synthesis, the Forecast, Tarot - is one of these surfaces, and the planet is
     * the backdrop behind it. After the last content block this adds one empty dynamic viewport (100dvh, with 100vh for a browser
     * that has no dynamic unit), so the reading can be scrolled completely off the top and the screen is, at the very end, the
     * Earth and its sky and nothing else. It is the viewport as it is NOW, not --kt-scene-height: that variable is the tallest
     * height seen at a width (the keyboard module's resting value), which would leave a short window with more than a screen. No text, no footer, no card: the space is an
     * empty pseudo-element at the foot of the scroller, so the content itself is untouched and the page genuinely has the scroll
     * travel (it is not a visual trick). It follows the viewport rather than any pixel count, so it is the right height on every
     * phone, in either orientation and with the browser chrome showing or hidden.
     *
     * The Main Menu is a surface too and is excluded: it is a one-screen composition that already shows the planet.
     * The bottom padding that clears the navigation capsules is still there beneath it, so the reveal is a little over one
     * screen of empty space, and the content has left the viewport entirely by the time the scroll ends.
     */
    #place-experience .kt-pillar-surface:not(.kt-menu-surface)::after {
      content: '';
      display: block;
      flex: none;
      height: 100vh;
      height: 100dvh;
      pointer-events: none;
    }

    #place-experience .kt-pillar-surface[hidden] { display: none; }

    /* Everything inside the surface is interactive again, since the stage above
       it is deliberately inert for the onboarding's Earth gestures. */
    #place-experience .kt-pillar-surface * { pointer-events: auto; }

    /* While a pillar surface owns the screen the globe is a BACKDROP: it stays
       fully visible, but it must not capture the touches meant for the content
       above it. */
    /* Two IDs, so this outranks onboardingEarthGestureAccess's
       '#place-experience.vessel-active #earth-map { pointer-events: auto }'.
       The surfaces already cover the screen, but relying on stacking alone would
       leave a gesture leak the moment a surface is hidden mid-transition. */
    #place-experience[data-pillar-stage][data-pillar-stage] #earth-map {
      pointer-events: none !important;
      touch-action: none !important;
    }

    /* Steady-state guarantee. The chrome above is faded out as part of the
       transition; this makes sure it cannot be repainted by any stage rule
       while a pillar surface owns the screen. The globe is untouched. */
    #place-experience[data-pillar-stage] .kt-prompt-layer,
    #place-experience[data-pillar-stage] #vessel-orbit,
    #place-experience[data-pillar-stage] .kt-earth-rim,
    #place-experience[data-pillar-stage] .kt-controls-layer,
    #place-experience[data-pillar-stage] .kt-picker-layer {
      opacity: 0 !important;
      pointer-events: none !important;
    }

    /* OPENED SCREENS HAVE NO PREAMBLE. A reading opens on its content, so the title is a heading for assistive
       technology only (clipped out of sight, not removed). The QA and profile controls exist on the Main Menu only, so an
       opened screen has nothing floating over its top: the content starts at the surface's own padding. */
    .kt-quiet-title {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      white-space: nowrap;
      border: 0;
    }
    #place-experience .kt-pillar-view.is-bare { padding-top: 0; }
    /* A section that opens the screen has no heading above it to be spaced from: its card (which bleeds 14px above it)
       starts at the top of the surface, instead of under the full gap that separates it from a heading. */
    #place-experience .kt-pillar-view.is-bare > .kt-quiet-title + .kt-reading-section { margin-top: 14px; }
    /* The at-a-glance block draws no heading or helper line, so its cards are the first thing in the card: the strip's own
       16px top margin (which sits under a heading elsewhere) would only be an empty band at the top of the pane. */
    #place-experience .kt-reading-section[data-glance="bare"] > .kt-mark-strip:first-of-type { margin-top: 0; }

    .kt-pillar-kicker {
      margin: 0 0 6px;
      font-size: 11px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: rgba(var(--kt-secondary-accent-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.82);
    }

    /*
     * FROM HERE TO .kt-pillar-back: THE HUB'S STYLING, KEPT ON PURPOSE.
     *
     * The hub is gone - a finished profile lands on the portrait and the six
     * destinations live in the strip - so of this family only
     * .kt-pillar-card-eyebrow still has a consumer, in the synthesis entries.
     *
     * The rest is card styling: a titled, glass, tappable block with an eyebrow,
     * an identity line and a status line. That is exactly the shape the pillar
     * sections are about to need as the knowledge base grows and the deeper
     * material arrives as detail cards behind disclosures. Deleting it now and
     * writing it again in a fortnight is churn, and it costs nothing where it
     * is: no markup references it, so it renders nothing.
     *
     * It is NOT here by accident. If the detail-card work lands somewhere else
     * or never happens, delete this block - and delete the selectors that name
     * it in glassSurfaceUnification.ts and deviceCapabilityMode.ts with it.
     */
    .kt-pillar-hub-head h1,
    .kt-pillar-head h1 {
      margin: 0;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(26px, 7.4vw, 34px);
      font-weight: 400;
      line-height: 1.16;
    }

    .kt-pillar-hub-meta {
      margin: 8px 0 0;
      font-size: 13px;
      color: var(--quiet, rgba(235, 231, 221, 0.44));
    }

    .kt-pillar-grid {
      display: grid;
      gap: 12px;
      margin-top: clamp(22px, 5vh, 34px);
    }

    .kt-pillar-card {
      display: grid;
      gap: 5px;
      padding: 16px 18px;
      text-align: left;
      border: 1px solid var(--kt-surface-line, var(--line, rgba(255, 255, 255, 0.13)));
      border-radius: 20px;
      background: rgba(10, 13, 14, 0.52);
      backdrop-filter: blur(18px) saturate(120%);
      -webkit-backdrop-filter: blur(18px) saturate(120%);
      cursor: pointer;
    }

    .kt-pillar-card-eyebrow {
      font-size: 10px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--quiet, rgba(235, 231, 221, 0.44));
    }

    .kt-pillar-card-title {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 19px;
    }

    .kt-pillar-card-identity {
      font-size: 14px;
      color: var(--muted, rgba(235, 231, 221, 0.62));
    }

    .kt-pillar-card-identity em {
      display: block;
      margin-bottom: 2px;
      font-size: 10px;
      font-style: normal;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--quiet, rgba(235, 231, 221, 0.44));
    }

    .kt-pillar-card-status {
      font-size: 11px;
      color: rgba(var(--kt-secondary-accent-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.72);
    }

    .kt-pillar-card.is-limited .kt-pillar-card-status { color: rgba(235, 231, 221, 0.42); }

    .kt-pillar-review {
      display: block;
      width: 100%;
      margin-top: 18px;
      padding: 13px 16px;
      font-size: 11px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      border: 1px solid var(--kt-surface-line, var(--line, rgba(255, 255, 255, 0.13)));
      border-radius: 999px;
      background: transparent;
      color: var(--muted, rgba(235, 231, 221, 0.62));
    }

    .kt-pillar-back {
      margin-bottom: 14px;
      padding: 9px 16px;
      font-size: 11px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      border: 1px solid var(--kt-surface-line, var(--line, rgba(255, 255, 255, 0.13)));
      border-radius: 999px;
      background: rgba(10, 13, 14, 0.5);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
    }

    .kt-pillar-summary {
      margin: 16px 0 0;
      font-size: 15px;
      line-height: 1.58;
      color: var(--muted, rgba(235, 231, 221, 0.62));
    }

    .kt-key-outputs,
    .kt-pillar-themes ul,
    .kt-limitations { margin: 18px 0 0; padding: 0; list-style: none; }

    .kt-key-outputs li {
      display: grid;
      gap: 3px;
      padding: 13px 16px;
      margin-bottom: 9px;
      border: 1px solid var(--kt-surface-line, var(--line, rgba(255, 255, 255, 0.13)));
      border-radius: 16px;
      background: rgba(10, 13, 14, 0.46);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }

    .kt-key-label {
      font-size: 10px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--quiet, rgba(235, 231, 221, 0.44));
    }

    .kt-key-value { font-size: 17px; }
    .kt-key-note { font-size: 12.5px; line-height: 1.5; color: var(--muted, rgba(235, 231, 221, 0.62)); }

    .kt-pillar-status {
      margin: 6px 0 0;
      font-size: 11.5px;
      color: rgba(var(--kt-secondary-accent-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.72);
    }

    .kt-pillar-identity { margin-top: clamp(20px, 4vh, 28px); }
    .kt-pillar-identity h2,
    .kt-pillar-themes h2,
    .kt-pillar-section summary span {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 17px;
      font-weight: 400;
    }

    .kt-pillar-themes { margin-top: clamp(22px, 4.6vh, 30px); }
    .kt-pillar-themes h2 { margin: 0; }

    .kt-theme {
      display: grid;
      gap: 3px;
      padding: 11px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .kt-theme-label { font-size: 14.5px; }
    .kt-theme-meaning { font-size: 12.5px; line-height: 1.52; color: var(--muted, rgba(235, 231, 221, 0.62)); }
    .kt-theme.is-strong .kt-theme-label { color: rgba(var(--kt-secondary-accent-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.92); }

    /* Charts must never force the page sideways on a phone. */
    /*
     * THEME-LIT RIM FOR THE PILLAR GLASS.
     *
     * One rule for every frosted surface in the pillar experience, so the
     * treatment cannot drift card by card: the hub cards, the disclosure
     * sections, the key-output rows (the table-like surfaces), and the two
     * capsules. Colour comes from the theme playground's own accent tokens -
     * the same source the rest of the themed UI consumes - with the previous
     * literal --line value as the fallback, so an unthemed page is unchanged.
     *
     * border-WIDTH is untouched at 1px and the glow is box-shadow, which paints
     * outside the border box and takes part in no layout. No card changes size,
     * padding, radius, shape or position; only the rim is different.
     */
    #place-experience .kt-pillar-card,
    #place-experience .kt-pillar-section,
    #place-experience .kt-key-outputs li,
    #place-experience .kt-pillar-back,
    #place-experience .kt-pillar-review {
      border-color: rgba(var(--kt-surface-border-rgb, var(--kt-accent-soft-rgb, 255, 255, 255)), 0.42);
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.03) inset,
        0 0 10px rgba(var(--kt-surface-border-rgb, var(--kt-accent-soft-rgb, 255, 255, 255)), 0.18),
        0 0 26px rgba(var(--kt-surface-border-rgb, var(--kt-accent-rgb, 255, 255, 255)), 0.12),
        /* Inner illumination: a wide, very low-alpha bloom pushed in from the
           top-left, so the light reads as sitting INSIDE the glass rather than
           as a second rim outside it. */
        0 0 34px -6px rgba(var(--kt-surface-border-rgb, var(--kt-accent-soft-rgb, 255, 255, 255)), 0.16) inset;
    }

    /*
     * THE GLASS ITSELF: LIGHTER, AND LIT BY THE ACTIVE VESSEL.
     *
     * The panels were a near-opaque rgba(10,13,14,.52) over an already dark
     * sky, which is what made them read as heavy. The ground is lifted and
     * thinned so more of the scene comes through, and a themed wash is laid
     * over it.
     *
     * The wash is a raking left-to-right gradient rather than a flat fill: it
     * is brightest at the leading edge and fades across the panel, which is how
     * light actually crosses a pane of glass and is what keeps this from
     * looking like a coloured box. Alphas are deliberately in the 0.02-0.10
     * band - enough to tint, far too little to compete with the text.
     *
     * The wash sits ON TOP of the ground, so the two compose: about 0.42 total
     * coverage at the lit edge falling to 0.37 across the panel, against the
     * flat 0.52 it replaced. Clearly lighter everywhere, while still leaving
     * real backing behind the type where the card crosses a bright part of the
     * globe.
     *
     * Colour is --kt-accent-*, which the theme playground resolves THROUGH THE
     * VESSEL while the theme is Default: female gives rose, male gives blue,
     * and Do-not-define gives the restrained neutral. It re-resolves live on a
     * vessel change, so the cards follow the choice without anything here
     * knowing which vessel is selected.
     *
     * Backgrounds and shadows only. No size, radius, padding, spacing,
     * typography or content change.
     */
    #place-experience .kt-pillar-card,
    #place-experience .kt-pillar-section,
    #place-experience .kt-key-outputs li {
      background:
        linear-gradient(
          100deg,
          rgba(var(--kt-surface-wash-rgb, var(--kt-accent-rgb, 255, 255, 255)), 0.10) 0%,
          rgba(var(--kt-surface-wash-soft-rgb, var(--kt-accent-soft-rgb, 255, 255, 255)), 0.05) 42%,
          rgba(var(--kt-surface-wash-rgb, var(--kt-accent-rgb, 255, 255, 255)), 0.02) 100%
        ),
        rgba(18, 21, 24, 0.36);
    }

    /* The open disclosure carries a touch more of the same light, never a
       different treatment. */
    #place-experience .kt-pillar-section[open] {
      background:
        linear-gradient(
          100deg,
          rgba(var(--kt-surface-wash-rgb, var(--kt-accent-rgb, 255, 255, 255)), 0.13) 0%,
          rgba(var(--kt-surface-wash-soft-rgb, var(--kt-accent-soft-rgb, 255, 255, 255)), 0.06) 42%,
          rgba(var(--kt-surface-wash-rgb, var(--kt-accent-rgb, 255, 255, 255)), 0.025) 100%
        ),
        rgba(18, 21, 24, 0.38);
    }

    /* The open disclosure is the reader's current focus, so its rim is a touch
       brighter - the same treatment, not a different one. */
    #place-experience .kt-pillar-section[open] {
      border-color: rgba(var(--kt-surface-border-rgb, var(--kt-accent-soft-rgb, 255, 255, 255)), 0.58);
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.03) inset,
        0 0 12px rgba(var(--kt-surface-border-rgb, var(--kt-accent-soft-rgb, 255, 255, 255)), 0.24),
        0 0 32px rgba(var(--kt-surface-border-rgb, var(--kt-accent-rgb, 255, 255, 255)), 0.16);
    }

    .kt-pillar-chart {
      margin-top: clamp(22px, 4.6vh, 30px);
      overflow-x: auto;
    }

    /*
     * ...except around the BodyGraph, where overflow-x: auto was the OTHER half
     * of the missing border. overflow-x on its own is not a thing: setting it to
     * auto computes overflow-y to auto too, so this box clipped the backplate -
     * which is deliberately grown past the graph - at its own top edge. The
     * bodygraph is the one chart here that never needs to scroll sideways,
     * because it is a fixed-ratio drawing that scales to the column.
     *
     * :has is the whole rule, so a browser without it simply keeps the old
     * behaviour rather than breaking the layout.
     */
    .kt-pillar-chart:has(.bodygraph-diagram) { overflow: visible; }

    .kt-pillar-chart svg { max-width: 100%; height: auto; }

    /*
     * THE APPROVED HUMAN DESIGN BODYGRAPH.
     *
     * The premium page loads only premium-earth-phase-a.css, which carried no
     * bodygraph rules at all - which is why the pillar had been pointed at the
     * V2 renderer, whose styling is baked into its own SVG attributes. V2's
     * theme module still describes itself as "Temporary neutral debug styling
     * only - validation colors, not final KNOW THYSELF visual design", and that
     * flat white/grey is the pale bodygraph.
     *
     * These are the approved rules from styles.css, scoped to the premium
     * experience. They are what turns the older renderer's markup into the
     * glass-and-gold BodyGraph: the three-layer glow/light/core channel tubes,
     * the lit centres, and the round caps and joins that make every channel
     * read as a smooth rounded vein rather than a hard polyline. Nothing here
     * changes geometry, spacing or type placement.
     */
    /* ---------------------------------------------------------------- theme ---
       THEME BRIDGE. The BodyGraph takes its entire palette from the accent theme
       chosen in the vessel menu. onboardingThemePlayground writes --kt-accent-rgb
       and --kt-accent-soft-rgb onto #place-experience; everything below derives
       from those two, so switching theme repaints the graph live with no
       re-render. The fallback is the previous gold, so the graph is still correct
       if it is ever rendered outside the themed shell.

       This block is colour, opacity and blur only. No geometry, no stroke widths,
       no positions. */
    #place-experience .human-design-bodygraph {
      --hd-accent-rgb: var(--kt-accent-rgb, 218, 171, 84);
      --hd-accent-soft-rgb: var(--kt-accent-soft-rgb, 247, 224, 173);
      /* The casing the veins are cut from - near-black, faintly carrying the
         accent so the tubes never read as neutral grey against a themed ground. */
      --hd-casing: rgba(6, 8, 10, 0.72);
    }

    /* Centre bodies: one gradient per STATE, not per centre. Defined centres are
       lit and saturated; undefined are the same accent drained toward neutral;
       suppressed is graphite. State is the data-bearing difference, and it
       survives every theme. */
    #place-experience .human-design-bodygraph .hd-fill--defined .hd-stop--near { stop-color: rgba(var(--hd-accent-rgb), 0.10); }
    #place-experience .human-design-bodygraph .hd-fill--defined .hd-stop--mid { stop-color: rgba(var(--hd-accent-soft-rgb), 0.05); }
    #place-experience .human-design-bodygraph .hd-fill--defined .hd-stop--far { stop-color: rgba(var(--hd-accent-rgb), 0.02); }

    #place-experience .human-design-bodygraph .hd-fill--undefined .hd-stop--near { stop-color: rgba(var(--hd-accent-rgb), 0.06); }
    #place-experience .human-design-bodygraph .hd-fill--undefined .hd-stop--mid { stop-color: rgba(var(--hd-accent-soft-rgb), 0.03); }
    #place-experience .human-design-bodygraph .hd-fill--undefined .hd-stop--far { stop-color: rgba(var(--hd-accent-rgb), 0.01); }

    #place-experience .human-design-bodygraph .hd-fill--suppressed .hd-stop--near { stop-color: rgba(120, 124, 128, 0.08); }
    #place-experience .human-design-bodygraph .hd-fill--suppressed .hd-stop--mid { stop-color: rgba(120, 124, 128, 0.04); }
    #place-experience .human-design-bodygraph .hd-fill--suppressed .hd-stop--far { stop-color: rgba(120, 124, 128, 0.02); }

    #place-experience .human-design-bodygraph .hd-fill--circuit .hd-stop--near { stop-color: rgba(var(--hd-accent-rgb), 0.12); }
    #place-experience .human-design-bodygraph .hd-fill--circuit .hd-stop--mid { stop-color: rgba(var(--hd-accent-rgb), 0.42); }
    #place-experience .human-design-bodygraph .hd-fill--circuit .hd-stop--far { stop-color: rgba(var(--hd-accent-soft-rgb), 0.20); }

    /* The centre glow carries that centre's own creamy tone, falling back to the
       accent if none is set; how strong it is still says defined / undefined /
       suppressed, so state is never encoded in the colour. */
    #place-experience .human-design-bodygraph__center-glow {
      /* Outline glow, not an interior fill. This used to be a blurred copy of
         the whole shape, which lit the inside; as a stroke it haloes the edge
         and leaves the body clear. Two radii, like the capsule rim. */
      fill: none;
      stroke: rgba(var(--hd-centre-rgb, var(--hd-accent-rgb)), 0.44);
      stroke-width: 2.5;
      filter: url(#hd-center-glow);
      opacity: 0.30;
    }

    /* PER-CENTRE TONE.
       Every centre carries its own creamy colour, and it is carried ONLY on the
       soft layers: the blurred outline halo and the bloom inside the glass. The
       body fill, the rim, the numbers and the veins are all left alone, so the
       vessel theme still owns the graph's overall colour and STATE still reads
       through opacity rather than through hue.

       The tones follow the traditional BodyGraph families - Head and G yellow,
       Ajna green, Heart and Sacral red, and Throat / Spleen / Solar Plexus / Root
       the browns - but drained to a tender cream, so nine of them can sit together
       without the graph turning into a colour chart. The four browns are separated
       by temperature rather than by strength, which is what keeps them readable as
       four centres instead of one smear.

       The variable is set on the centre group AND on the matching bloom gradient,
       because a gradient living in <defs> resolves var() against itself, not
       against the element that references it. */
    #place-experience .human-design-bodygraph__center-group[data-center-id="head"],
    #place-experience .human-design-bodygraph .hd-top[data-center-id="head"],
    #place-experience .hd-bodygraph-stage .hd-wave[data-center-id="head"],
    #place-experience .human-design-bodygraph .hd-bloom--head { --hd-centre-rgb: 247, 236, 205; }  /* pale vanilla - Head is traditionally yellow */
    #place-experience .human-design-bodygraph__center-group[data-center-id="ajna"],
    #place-experience .human-design-bodygraph .hd-top[data-center-id="ajna"],
    #place-experience .hd-bodygraph-stage .hd-wave[data-center-id="ajna"],
    #place-experience .human-design-bodygraph .hd-bloom--ajna { --hd-centre-rgb: 210, 228, 208; }  /* soft sage - Ajna is traditionally green */
    #place-experience .human-design-bodygraph__center-group[data-center-id="throat"],
    #place-experience .human-design-bodygraph .hd-top[data-center-id="throat"],
    #place-experience .hd-bodygraph-stage .hd-wave[data-center-id="throat"],
    #place-experience .human-design-bodygraph .hd-bloom--throat { --hd-centre-rgb: 231, 217, 196; }  /* warm oat - the coolest of the four browns */
    #place-experience .human-design-bodygraph__center-group[data-center-id="g"],
    #place-experience .human-design-bodygraph .hd-top[data-center-id="g"],
    #place-experience .hd-bodygraph-stage .hd-wave[data-center-id="g"],
    #place-experience .human-design-bodygraph .hd-bloom--g { --hd-centre-rgb: 245, 226, 186; }  /* champagne - G is traditionally yellow */
    #place-experience .human-design-bodygraph__center-group[data-center-id="ego"],
    #place-experience .human-design-bodygraph .hd-top[data-center-id="ego"],
    #place-experience .hd-bodygraph-stage .hd-wave[data-center-id="ego"],
    #place-experience .human-design-bodygraph .hd-bloom--ego { --hd-centre-rgb: 238, 200, 194; }  /* dusty rose - the Heart is traditionally red */
    #place-experience .human-design-bodygraph__center-group[data-center-id="spleen"],
    #place-experience .human-design-bodygraph .hd-top[data-center-id="spleen"],
    #place-experience .hd-bodygraph-stage .hd-wave[data-center-id="spleen"],
    #place-experience .human-design-bodygraph .hd-bloom--spleen { --hd-centre-rgb: 214, 224, 222; }  /* pale celadon - the cool, quiet end of the browns */
    #place-experience .human-design-bodygraph__center-group[data-center-id="solarPlexus"],
    #place-experience .human-design-bodygraph .hd-top[data-center-id="solarPlexus"],
    #place-experience .hd-bodygraph-stage .hd-wave[data-center-id="solarPlexus"],
    #place-experience .human-design-bodygraph .hd-bloom--solarPlexus { --hd-centre-rgb: 246, 214, 190; }  /* soft apricot - warmer, for the emotional wave */
    #place-experience .human-design-bodygraph__center-group[data-center-id="sacral"],
    #place-experience .human-design-bodygraph .hd-top[data-center-id="sacral"],
    #place-experience .hd-bodygraph-stage .hd-wave[data-center-id="sacral"],
    #place-experience .human-design-bodygraph .hd-bloom--sacral { --hd-centre-rgb: 238, 196, 180; }  /* terracotta cream - the Sacral is traditionally red */
    #place-experience .human-design-bodygraph__center-group[data-center-id="root"],
    #place-experience .human-design-bodygraph .hd-top[data-center-id="root"],
    #place-experience .hd-bodygraph-stage .hd-wave[data-center-id="root"],
    #place-experience .human-design-bodygraph .hd-bloom--root { --hd-centre-rgb: 218, 202, 188; }  /* mushroom clay - the deepest and most grounded */


    /* The capsule recipe, layer for layer (see .kt-key-outputs li and the themed
       override that follows it): substrate + 100deg sheen + inset bloom + rim +
       two outer glows. State is carried by the substrate, the rim and the halo,
       the way it is on a capsule - never by a different treatment. */
    /* THE FROSTED PANE.
       backdrop-filter used to be declared on .human-design-bodygraph__center-base
       and never did anything: an SVG shape does not establish a backdrop root, so
       the property parses and is ignored. Verified in the browser - the identical
       declaration on a plain div blurs the Earth, on an SVG path it does not, and
       nor does it inside a foreignObject. The centres therefore only ever had a
       translucent fill, which is why the Earth read through them sharply.
       The blur is now done by a real element behind the graph, clipped to the
       centre silhouettes AND to the veins that join them, so the whole graph
       frosts as one piece of glass. The veins take the blur only - no tone of
       their own - which is what keeps the nine centre colours legible. */
    #place-experience .hd-bodygraph-stage {
      position: relative;
    }

    #place-experience .hd-bodygraph-stage .human-design-bodygraph {
      position: relative;
      z-index: 1;
    }

    /*
     * THE GLASS BACKPLATE.
     *
     * One pane behind the whole BodyGraph, clipped to the graph's own outer
     * silhouette so the body reads as a single framed object floating over the
     * Earth rather than as nine centres scattered on it.
     *
     * It is grown past the SVG's box on purpose. After the scene transform the
     * graph already reaches within about 21 units of the canvas top, so a
     * margin drawn inside the viewBox would be clipped off at the head. The
     * clip is normalised against this grown box by renderBackplateClip, which
     * is why the two line up with no runtime measurement - the same trick the
     * centre frost already uses, and the reason neither needs to know the
     * rendered size.
     *
     * The material is the SHARED one: it reads --kt-glass-fill and
     * --kt-glass-blur-radius rather than declaring its own numbers, so it
     * follows the rest of the interface whenever that material is retuned.
     */
    /*
     * THE TWO ACTIVATION TONES.
     *
     * Conscious keeps EXACTLY the stroke the graph has always used, so a chart
     * whose channels are all conscious looks identical to before this existed -
     * the new colour is only ever the second one. Unconscious is a dusty rose
     * held at the same alpha and the same glow, so the pair reads as one
     * material in two temperatures rather than as two different treatments.
     * Both is where the two moments land in the same gate: a warm sage between
     * them, so it is legible as its own state without becoming a third accent.
     */
    #place-experience .human-design-bodygraph__channel-group--unconscious .human-design-bodygraph__channel-light {
      stroke: rgba(226, 186, 190, 0.58);
    }
    #place-experience .human-design-bodygraph__channel-group--unconscious .human-design-bodygraph__channel-glow {
      stroke: rgba(226, 186, 190, 0.26);
    }
    #place-experience .human-design-bodygraph__channel-group--unconscious .human-design-bodygraph__channel-core {
      stroke: rgba(247, 226, 226, 0.85);
    }

    #place-experience .human-design-bodygraph__channel-group--both .human-design-bodygraph__channel-light {
      stroke: rgba(206, 208, 188, 0.58);
    }
    #place-experience .human-design-bodygraph__channel-group--both .human-design-bodygraph__channel-glow {
      stroke: rgba(206, 208, 188, 0.26);
    }
    #place-experience .human-design-bodygraph__channel-group--both .human-design-bodygraph__channel-core {
      stroke: rgba(238, 240, 224, 0.85);
    }

    /* A windowed segment ends mid-vein, so the cap has to be flat: a round cap
       would bulge past the split and the two colours would overlap in a lens. */
    #place-experience .human-design-bodygraph__channel-group--active path[stroke-dasharray] {
      stroke-linecap: butt;
    }

    /*
     * THE ACTIVATION PANELS.
     *
     * Design left, Personality right, the graph between them. Three columns on
     * a wide screen; on a narrow one the panels fall BELOW the graph rather
     * than squeezing it, because the graph is the thing being read and the
     * panels are a reference table beside it.
     */
    /*
     * THE DECK: three cards, one box, depth instead of columns.
     *
     * GEOMETRY, AND WHY EVERY NUMBER HERE IS DERIVED.
     *
     * The visible card is the backplate, and the backplate is NOT the svg's
     * box: inside a 800x1000 viewBox the plate spans x 82.6..717.4 and
     * y -20.9..1020.9, so it is 79.35% of the stage's width and 104.18% of its
     * height. Sizing the stage to the column therefore drew a card noticeably
     * narrower than every other card on the screen, with the graph floating in
     * the middle of it.
     *
     * So the stage is oversized until the PLATE fills the column:
     *   stage width  = 1 / 0.79345      = 126% of the deck
     *   stage height = 126% * 1000/800  = 157.5% of the deck's width
     *   plate height = 157.5% * 1.04178 = 164.1% of the deck's width
     * which is where aspect-ratio 1 / 1.641 comes from, and why the stage is
     * inset by -13% horizontally and 2% vertically. The plate's edges then land
     * on the deck's edges to within a tenth of a percent, so the card lines up
     * with the content cards below it by construction.
     */
    #place-experience .hd-deck {
      position: relative;
      aspect-ratio: 1 / 1.641;
      margin-inline: auto;
      /*
       * THE HORIZONTAL DRIFT, AT ITS SOURCE.
       *
       * The stage inside this box is 126% wide at left:-13%, because the plate
       * is only 79.35% of the svg and the PLATE is what has to fill the column.
       * The excess is empty svg margin - invisible, and for a while harmless.
       *
       * It was not harmless. .kt-pillar-surface scrolls vertically, and an
       * element that overflows a scroll container horizontally makes it scroll
       * HORIZONTALLY too: the surface measured 376px wide with 440px of
       * content. A phone could drag the whole pillar sideways, and Chrome
       * restores scroll offsets across a reload - so after a crash or a
       * refresh the pillar came back shifted, prose and all.
       *
       * "clip" rather than "hidden" because clip does not create a scroll
       * container of its own, so this can never become the same problem one
       * level down. The margin lets the rim's bloom past the edge - the reason
       * the deck stopped clipping in the first place - while the empty margins
       * that caused the drift stay inside.
       *
       * 16px, and the number is not free: a clip margin is itself scrollable
       * overflow, so it has to stay inside the surface's 18px padding or it
       * simply moves the drift rather than removing it. Measured: 28px left
       * 10px of overflow, 20px left 2px, 18px and below leave none. 16px keeps
       * the bloom with two pixels to spare against sub-pixel rounding.
       */
      overflow: clip;
      overflow-clip-margin: 16px;
    }

    @media (min-width: 720px) {
      /* Phone-first: on a phone the card is the column's width, which is what
         "the same width as the cards below" means there. On a desktop the same
         rule would produce a card taller than the window, so it is capped. */
      #place-experience .hd-deck { max-width: 560px; }
    }

    /* Placed, not flowed, so no state change can reflow the deck. */
    #place-experience .hd-deck .hd-bodygraph-stage {
      position: absolute;
      left: -13%;
      width: 126%;
      top: 2%;
      z-index: 2;
      /* Opacity only. The graph was briefly shrunk a few percent here as the
         "recedes behind" cue, and it was wrong: the drawing must never change
         apparent size, transform or not. The depth comes from the doors moving
         and the layers reordering, which is where it belongs. */
      transition: opacity 520ms cubic-bezier(0.22, 0.61, 0.36, 1);
    }

    /* The graph's own cap would otherwise clamp the oversized stage back to the
       column and undo the sizing above. */
    #place-experience .hd-deck .hd-bodygraph-stage .human-design-bodygraph {
      max-width: none;
    }

    /* Dimmed while the doors are in front - the one cue the graph itself gives.
       It does not move and it does not resize.
       Taken down to a fifth rather than a half: the doors are translucent
       glass, so at 0.5 the whole graph read straight through them and the
       table sat in a thicket of channels. This far down it is depth. */
    #place-experience .hd-deck[data-hd-deck="panels"] .hd-bodygraph-stage {
      opacity: 0.18;
    }

    /*
     * THE DOOR FRAME. Exactly the card's box, and the only thing that clips: a
     * parked door is entirely outside it, so the default state is one clean
     * rounded card with nothing peeking out at the sides. That peeking was read
     * as an outer rim around the graph, which is exactly what it looked like.
     *
     * The radius is the plate's own corner - 54 units of an 800-unit viewBox
     * across a stage 126% of this box - written as a percentage pair so the
     * corner stays circular on a box far taller than it is wide.
     */
    #place-experience .hd-deck-doors {
      position: absolute;
      inset: 0;
      /* Genuinely behind the graph when parked. The doors are clipped out of
         sight there so it makes no visible difference, but a frame that claims
         to be behind the card should be behind it. */
      z-index: 1;
      overflow: hidden;
      /*
       * SQUARE, deliberately. This carried the plate's own ~32px corner so the
       * doors would follow the card's silhouette - and that is precisely what
       * chewed their corners off: a door's outer corner is 16px, the frame's
       * curve cut a crescent out of it, and both cards showed a bitten top and
       * bottom edge instead of four clean ones.
       *
       * A square frame cannot cut anything: the doors sit entirely inside it,
       * so all four of each card's own corners render, and the frame still
       * does the one job it exists for - hiding a door parked outside it.
       */
      border-radius: 0;
      pointer-events: none;
    }

    /*
     * THE TWO DOORS. Half the frame each, less half of the seam between them,
     * so they read as two separate cards closing together rather than one
     * surface with a join down it. Only ever moved with a transform: width,
     * position and content are identical in both states, which is what keeps
     * the transition free of reflow, resize and layout jump.
     */
    #place-experience .hd-deck .hd-activation-panel {
      position: absolute;
      top: 0;
      bottom: 0;
      /* Border-box, or the padding and the border are added to the half and the
         two doors overlap instead of meeting. */
      box-sizing: border-box;
      width: calc(50% - 5px);
      overflow: hidden;
      transition: transform 520ms cubic-bezier(0.22, 0.61, 0.36, 1);
    }

    /* Parked a full width outside the frame, so nothing shows through the clip
       and there is no z-order flash on the way in - by the time a door is
       visible at all, its frame is already the front layer. */
    #place-experience .hd-deck .hd-activation-panel--design {
      left: 0;
      transform: translateX(-100%);
    }
    #place-experience .hd-deck .hd-activation-panel--personality {
      right: 0;
      transform: translateX(100%);
    }

    #place-experience .hd-deck[data-hd-deck="panels"] .hd-activation-panel {
      transform: translateX(0);
    }

    /* Forward, the pair is the front layer; parked, the frame sits behind the
       graph. One property on one element, so the two doors can never disagree
       about which layer they are on. */
    #place-experience .hd-deck[data-hd-deck="panels"] .hd-deck-doors {
      z-index: 3;
    }

    /*
     * The whole deck is the tap target, because the gesture is "tap the card".
     * It is a real button so it is focusable and announces its state; its label
     * is read, never seen.
     */
    #place-experience .hd-deck-toggle {
      position: absolute;
      inset: 0;
      z-index: 4;
      padding: 0;
      border: 0;
      background: none;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    #place-experience .hd-deck-toggle:focus-visible {
      outline: 2px solid rgba(var(--kt-accent-soft-rgb, 247, 224, 173), 0.7);
      outline-offset: -3px;
      border-radius: 8.5% / 5.18%;
    }

    #place-experience .hd-deck-toggle-label {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }

    /* display: none, so the label that does not apply leaves the a11y tree
       instead of being read out alongside the one that does. */
    #place-experience .hd-deck[data-hd-deck="graph"] .hd-deck-toggle-label--close,
    #place-experience .hd-deck[data-hd-deck="panels"] .hd-deck-toggle-label--open {
      display: none;
    }

    /* The deck answers a tap without looking like a control, so it says so. */
    #place-experience .hd-deck-hint {
      margin: 10px 0 0;
      text-align: center;
      font-size: 10.5px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(235, 231, 221, 0.42);
    }

    ${HUMAN_DESIGN_HERO_CSS}

    /* The movement is the affordance, so without it the state change should be
       instant rather than a slow fade of something that never moves. */
    @media (prefers-reduced-motion: reduce) {
      #place-experience .hd-deck .hd-activation-panel,
      #place-experience .hd-deck .hd-bodygraph-stage {
        transition-duration: 1ms;
        transition-delay: 0ms;
      }
    }

    #place-experience .hd-activation-panel {
      display: flex;
      flex-direction: column;
      padding: 14px 13px 15px;
      border: 1px solid rgba(var(--kt-accent-soft-rgb, 247, 224, 173), 0.28);
      border-radius: 16px;
      background-color: var(--kt-glass-fill, rgba(10, 13, 16, 0.15));
      backdrop-filter: blur(var(--kt-glass-blur-radius, 7px)) saturate(1.08);
      -webkit-backdrop-filter: blur(var(--kt-glass-blur-radius, 7px)) saturate(1.08);
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.03) inset,
        0 0 12px rgba(var(--kt-accent-soft-rgb, 247, 224, 173), 0.14);
    }

    #place-experience .hd-activation-title {
      margin: 0;
      font-size: 10px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(var(--kt-accent-soft-rgb, 247, 224, 173), 0.88);
      /* The word must not spill out of the column it names. Tracked-out small
         caps are wider than they look, and PERSONALITY is eleven characters. */
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    #place-experience .hd-activation-sub {
      margin: 3px 0 9px;
      font-size: 9.5px;
      line-height: 1.35;
      color: rgba(235, 231, 221, 0.46);
    }

    /*
     * THIRTEEN ROWS, EVENLY, DOWN THE WHOLE CARD.
     *
     * This was a grid of content-height rows with a 3px gap, so the table sat
     * in the top half and left the lower half of a 600px card empty - which
     * read as an unfinished panel rather than a considered one.
     *
     * The list now takes the height the title and subtitle leave it, and each
     * row takes an equal share of that. The rhythm is therefore uniform by
     * construction rather than by a tuned gap, it is identical on both cards
     * because both run this rule, and it cannot leave a pool of space at the
     * bottom whatever the card's height turns out to be.
     */
    #place-experience .hd-activation-list {
      margin: 0;
      padding: 0;
      list-style: none;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    #place-experience .hd-activation-row {
      /* An equal share of the list, with the glyph, the name and the value
         centred in it - so the three stay on one baseline and every row is the
         same height as every other. */
      flex: 1 1 0;
      min-height: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 11.5px;
      line-height: 1.35;
    }

    #place-experience .hd-activation-body {
      display: flex;
      align-items: center;
      gap: 5px;
      min-width: 0;
      color: rgba(235, 231, 221, 0.62);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* The symbol, in the same stroke language as every other glyph in the app -
       it only has to be sized and toned here. */
    #place-experience .hd-activation-glyph {
      flex: none;
      width: 12px;
      height: 12px;
      color: rgba(var(--kt-accent-soft-rgb, 247, 224, 173), 0.72);
    }

    #place-experience .hd-activation-panel--design .hd-activation-glyph {
      color: rgba(233, 200, 203, 0.72);
    }

    /*
     * On a phone the graph needs the width more than the words do, so the
     * written name gives way and the glyph speaks for the row. Hidden the
     * accessible way, not with display: none - the glyph already carries an
     * aria-label, and a screen reader losing the name would be a real
     * regression rather than a layout one.
     */
    #place-experience .hd-activation-name {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* The names and the subtitles used to be dropped on a phone, because the
       panel was a 64px column. A door is half the deck wide, so everything the
       panel has to say now fits at every width. */

    /* The number is the value; the line is its subdivision, so it sits quieter
       without becoming unreadable. */
    #place-experience .hd-activation-value {
      flex: none;
      font-variant-numeric: tabular-nums;
      color: rgba(247, 240, 224, 0.92);
    }

    #place-experience .hd-activation-line { color: rgba(235, 231, 221, 0.5); }

    /* Each panel leans towards the tone it represents, at a whisper - enough to
       tell them apart at a glance, far short of colouring the table. */
    #place-experience .hd-activation-panel--personality .hd-activation-title {
      color: rgba(var(--kt-accent-soft-rgb, 247, 224, 173), 0.92);
    }
    #place-experience .hd-activation-panel--design .hd-activation-title {
      color: rgba(233, 200, 203, 0.9);
    }
    #place-experience .hd-activation-panel--design {
      border-color: rgba(226, 186, 190, 0.26);
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.03) inset,
        0 0 12px rgba(226, 186, 190, 0.13);
    }

    #place-experience .hd-backplate {
      position: absolute;
      top: -4.5%;
      left: -5%;
      width: 110%;
      height: 109%;
      pointer-events: none;
      clip-path: url(#hd-backplate-clip);
      background-color: var(--kt-glass-fill, rgba(10, 13, 16, 0.20));
      backdrop-filter: blur(var(--kt-glass-blur-radius, 10px)) saturate(1.08);
      -webkit-backdrop-filter: blur(var(--kt-glass-blur-radius, 10px)) saturate(1.08);
    }

    /*
     * The rim and its glow, on a layer of its own.
     *
     * It used to be the first child of the graph's scene group, which kept it
     * locked to the graph's transform but also handed it the graph's viewport -
     * and the plate is deliberately larger than that, so the top and bottom
     * edges of the border were being clipped away and the frame read as broken.
     * The layer it now sits on is grown past the plate on all four sides and
     * carries the same transform, so it keeps the lock and loses the cut.
     *
     * Its box comes from the renderer as an inline style; only the material is
     * described here - the same accent-soft rim and low-alpha bloom the pillar
     * cards use, unchanged.
     */
    #place-experience .hd-backplate-rim-layer {
      position: absolute;
      pointer-events: none;
      overflow: visible;
      /* The chart's blanket rule capping every svg at 100% is meant for the
         graph, and it was clamping this layer to the stage's width - 201px
         instead of 237 on a phone - so the rim was drawn to a squashed box and
         no longer sat on the plate it frames. This layer's box is the
         renderer's to decide, so the cap is lifted here. */
      max-width: none;
    }

    #place-experience .hd-backplate-rim {
      fill: none;
      stroke: rgba(var(--kt-accent-soft-rgb, 247, 224, 173), 0.34);
      stroke-width: 1.6;
      filter:
        drop-shadow(0 0 6px rgba(var(--kt-accent-soft-rgb, 247, 224, 173), 0.16))
        drop-shadow(0 0 22px rgba(var(--kt-accent-rgb, 218, 171, 84), 0.10));
    }

    #place-experience .hd-centre-frost {
      position: absolute;
      inset: 0;
      pointer-events: none;
      clip-path: url(#hd-centre-frost-clip);
      backdrop-filter: blur(22px) saturate(1.25);
      -webkit-backdrop-filter: blur(22px) saturate(1.25);
    }

    /* The pane behind it carries the frost, so this fill only has to seat the
       glass - it does not have to hide the Earth on its own. It was 0.46, set
       when the glass had no tone of its own; at that density the creamy centre
       tone was swallowed and all nine centres read alike against the globe.
       0.38 lets the tone through and still keeps the body seated. */
    #place-experience .human-design-bodygraph__center-base {
      fill: rgba(18, 21, 24, 0.38);
    }

    #place-experience .human-design-bodygraph__center-group--undefined .human-design-bodygraph__center-base {
      fill: rgba(14, 17, 19, 0.24);
    }

    #place-experience .human-design-bodygraph__center-group--suppressed .human-design-bodygraph__center-base {
      fill: rgba(22, 24, 26, 0.34);
    }

    #place-experience .human-design-bodygraph__center-bloom {
      pointer-events: none;
    }

    #place-experience .human-design-bodygraph__center-group--suppressed .human-design-bodygraph__center-bloom {
      opacity: 0.2;
    }

    #place-experience .human-design-bodygraph .hd-fill--bloom .hd-stop--near { stop-color: rgba(var(--hd-centre-rgb, var(--hd-accent-soft-rgb)), 0.50); }
    #place-experience .human-design-bodygraph .hd-fill--bloom .hd-stop--far { stop-color: rgba(var(--hd-centre-rgb, var(--hd-accent-soft-rgb)), 0.20); }

    #place-experience .human-design-bodygraph__center-group--suppressed .human-design-bodygraph__center-glow {
      fill: rgba(120, 124, 128, 0.24);
    }

    /* Lit veins. These used to be painted inline from a per-centre palette, which
       is exactly what stopped the graph following the theme. */
    #place-experience .human-design-bodygraph__channel-glow { stroke: rgba(var(--hd-accent-rgb), 0.30); }
    #place-experience .human-design-bodygraph__channel-light { stroke: rgba(var(--hd-accent-soft-rgb), 0.58); }
    #place-experience .human-design-bodygraph__channel-core { stroke: rgba(var(--hd-accent-soft-rgb), 0.80); }

    #place-experience .human-design-bodygraph {
      width: 100%;
      height: auto;
      max-width: 800px;
      display: block;
      overflow: visible;
    }

    #place-experience .human-design-bodygraph__reference-circuits path {
      fill: none;
      stroke: url(#hd-circuit-gold);
      stroke-linecap: round;
      stroke-width: 2.2;
    }

    #place-experience .human-design-bodygraph__center-group,
    #place-experience .human-design-bodygraph__channel-group {
      isolation: isolate;
    }

    #place-experience .human-design-bodygraph__center-glow {
      filter: url(#hd-center-glow);
      opacity: 0.24;
    }

    #place-experience .human-design-bodygraph__center-group--defined .human-design-bodygraph__center-glow {
      opacity: 0.92;
    }

    #place-experience .human-design-bodygraph__center-group--suppressed .human-design-bodygraph__center-glow {
      opacity: 0.05;
    }

    #place-experience .human-design-bodygraph__center {
      stroke: rgba(var(--hd-accent-soft-rgb), 0.42);
      stroke-width: 3.2;
      transition: filter 0.35s ease, opacity 0.35s ease, stroke 0.35s ease;
    }

    #place-experience .human-design-bodygraph__center {
      /* FROSTING. This is what the onboarding capsules actually use to look like
         glass - blur(18px) saturate(1.08) over a transparent background - and it
         is why they hold their shape over the live Earth without being opaque.
         The BodyGraph was missing it, so the centres were carrying their presence
         on fill alpha alone: fine over dark space, invisible over the bright half
         of the globe. Blurring the backdrop instead lets the fill stay low and the
         background stay legible through the pane.

         Verified rendering on an SVG path in the deployed build. If an engine
         ignores it, the raised fill above still gives the pane a readable body,
         so this degrades rather than breaks. */
            }

    #place-experience .human-design-bodygraph__center--defined {
      filter: drop-shadow(0 0 10px rgba(var(--hd-accent-soft-rgb), 0.20)) drop-shadow(0 0 26px rgba(var(--hd-accent-rgb), 0.14));
      stroke: rgba(var(--hd-accent-soft-rgb), 0.56);
    }

    #place-experience .human-design-bodygraph__center--undefined {
      stroke: rgba(var(--hd-accent-soft-rgb), 0.30);
    }

    #place-experience .human-design-bodygraph__center-rim {
      fill: none;
      pointer-events: none;
      stroke: rgba(255, 255, 255, 0.07);
      stroke-width: 1.15;
    }

    #place-experience .human-design-bodygraph__gate {
      fill: rgba(var(--hd-accent-soft-rgb), 0.78);
      font-family: Inter, ui-sans-serif, system-ui, sans-serif;
      font-size: 15px;
      font-weight: 500;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0;
      paint-order: stroke;
      stroke: rgba(0, 0, 0, 0.38);
      stroke-width: 1.5px;
      transition: opacity 0.35s ease, fill 0.35s ease;
    }

    /* Gate numbers are light on every ground.

       They were briefly dark-on-defined, which was right while the centres were
       lit solids - a light number washed out on them. Once the centres became
       tender translucent glass the ground went mid-tone, and dark ink stopped
       reading. So all numbers are the light accent, and legibility comes from a
       dark halo behind them (paint-order: stroke) rather than from flipping ink.
       The halo is a touch stronger on a defined centre, which is the busiest
       ground in the graph. */
    #place-experience .human-design-bodygraph__gate--defined-center {
      stroke: rgba(0, 0, 0, 0.42);
      stroke-width: 1.7px;
    }

    #place-experience .human-design-bodygraph__gate--active {
      fill: rgb(var(--hd-accent-soft-rgb));
      filter: url(#hd-spark-glow);
      font-weight: 650;
    }

    /* Round caps and joins on every tube layer: this is what makes a channel
       read as a smooth rounded vein instead of a cut polyline. The renderer
       draws each channel as a single cubic Bezier, so the curve itself is
       already continuous; these keep its ends and joins continuous too. */
    #place-experience .human-design-bodygraph__channel {
      fill: none;
      stroke: var(--hd-casing);
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 18;
      transition: stroke 0.35s ease, opacity 0.35s ease;
    }

    #place-experience .human-design-bodygraph__channel-glass {
      fill: none;
      stroke: rgba(var(--hd-accent-soft-rgb), 0.32);
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 11;
    }

    #place-experience .human-design-bodygraph__channel-glow,
    #place-experience .human-design-bodygraph__channel-light,
    #place-experience .human-design-bodygraph__channel-core {
      fill: none;
      pointer-events: none;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    #place-experience .human-design-bodygraph__channel-glow {
      filter: url(#hd-tube-glow);
      stroke-width: 18;
    }

    #place-experience .human-design-bodygraph__channel-light { stroke-width: 8; }
    #place-experience .human-design-bodygraph__channel-core { stroke-width: 2.1; }
    #place-experience .human-design-bodygraph__channel-group--inactive { opacity: 0.76; }

    .kt-pillar-section {
      margin-top: 12px;
      border: 1px solid var(--kt-surface-line, var(--line, rgba(255, 255, 255, 0.13)));
      border-radius: 18px;
      background: rgba(10, 13, 14, 0.44);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }

    .kt-pillar-section summary {
      padding: 15px 18px;
      cursor: pointer;
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .kt-pillar-section summary::-webkit-details-marker { display: none; }
    .kt-pillar-section summary::after {
      content: "+";
      font-size: 17px;
      color: var(--quiet, rgba(235, 231, 221, 0.44));
    }
    .kt-pillar-section[open] summary::after { content: "\\2013"; }

    /* THE PORTRAIT — set for reading, not for scanning.
       Wider measure, generous leading, real paragraph spacing. This is the one
       place in the app where the reader is expected to settle in. */
    #place-experience .kt-pillar-portraits > h2 {
      margin: 0 0 14px;
      font-family: Georgia, 'Times New Roman', serif;
      font-weight: 400;
      font-size: 22px;
    }
    #place-experience .kt-portrait {
      margin: 0 0 18px;
      padding: 18px 16px 16px;
      border-radius: 18px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(10, 12, 16, 0.44);
      backdrop-filter: blur(18px) saturate(1.08);
      -webkit-backdrop-filter: blur(18px) saturate(1.08);
    }
    #place-experience .kt-portrait-role {
      margin: 0;
      font-size: 11px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: rgba(var(--kt-secondary-accent-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.85);
    }
    #place-experience .kt-portrait-standfirst {
      margin: 8px 0 0;
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 18px;
      line-height: 1.4;
      color: rgba(244, 241, 233, 0.95);
    }
    #place-experience .kt-portrait-meta {
      margin: 8px 0 0;
      font-size: 11.5px;
      color: rgba(244, 241, 233, 0.45);
    }
    #place-experience .kt-portrait-note {
      margin: 14px 0 0;
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid rgba(var(--kt-surface-border-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.28);
      font-size: 12.5px;
      line-height: 1.5;
      color: rgba(244, 241, 233, 0.72);
    }
    #place-experience .kt-portrait-section { margin-top: 20px; }
    #place-experience .kt-portrait-section h3 {
      margin: 0 0 8px;
      font-size: 11px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(244, 241, 233, 0.5);
    }
    #place-experience .kt-portrait-section p {
      margin: 0 0 12px;
      font-size: 14.5px;
      line-height: 1.68;
      color: rgba(244, 241, 233, 0.88);
    }
    #place-experience .kt-portrait-section p:last-child { margin-bottom: 0; }
    #place-experience .kt-portrait-provenance {
      margin: 20px 0 0;
      padding-top: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 11.5px;
      line-height: 1.5;
      color: rgba(244, 241, 233, 0.45);
    }

    /* ============================================================== *
       THE READING
       ==============================================================
       A pillar is a chapter now, so it is set like one: a comfortable
       measure, generous leading, and headings that separate rather than
       shout. Everything technical has moved into one closed disclosure at
       the very bottom, which is why nothing above it needs to compete.
     * ============================================================== */

    /*
     * THE READING'S RHYTHM - one set of numbers for all five readings.
     *
     * A reading card is the pane drawn BEHIND a section (below), reaching
     * --kt-reading-pane-bleed-y past its text above and below. The space the
     * reader sees between two cards is therefore the section margin LESS both
     * overhangs, so the margin is now derived from the gap the reader should see
     * rather than the other way round. It used to be clamp(28px, 5vh, 40px)
     * less 28px of overhang: 12px on a 375x812 phone, 4px at 360x640 and nothing
     * at all below 560px of height.
     *
     * --kt-reading-gap is that visible gap: 24px on a short phone, growing with
     * the screen's height to 32px.
     */
    #place-experience {
      --kt-reading-gap: clamp(24px, 3.5vh, 32px);
      --kt-reading-pane-bleed-y: 14px;
      --kt-reading-pane-bleed-x: 12px;
    }

    #place-experience .kt-reading-intro {
      margin: 18px 0 0;
    }
    #place-experience .kt-reading-intro p {
      margin: 0 0 12px;
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 16.5px;
      line-height: 1.66;
      color: rgba(244, 241, 233, 0.78);
    }

    #place-experience .kt-reading-section {
      margin-top: calc(var(--kt-reading-gap) + 2 * var(--kt-reading-pane-bleed-y));
    }
    /* The summary card is its own box, with no pane reaching past it, so only
       the next section's overhang is spent. */
    #place-experience .kt-synthesis-summary + .kt-reading-section {
      margin-top: calc(var(--kt-reading-gap) + var(--kt-reading-pane-bleed-y));
    }

    /*
     * THE READING SHELL.
     *
     * The Earth behind the reading is bright and it turns, so a long paragraph
     * loses contrast for a while every time the terminator passes under it.
     * This is the least the page can do about that: a milky pane behind the
     * text, barely there, with only enough blur to soften what shows through.
     * It is deliberately not the card used by the synthesis summary - that one
     * is dark and opaque and would put the Earth out.
     *
     * DRAWN BY A PSEUDO-ELEMENT WITH A NEGATIVE INSET, not by padding on the
     * section. Padding would push every line of the reading inward and change
     * the measure; an absolutely positioned pane reaches past the text on all
     * four sides and moves nothing. The -12px horizontal inset sits inside the
     * scroller's own 18px, so the shell stops short of the screen edge.
     *
     * z-index 0 on the section opens a stacking context, which is what keeps
     * the pane behind its own text and still in front of the Earth. Without it
     * the -1 would drop the pane behind the page background entirely.
     */
    #place-experience .kt-reading-intro,
    #place-experience .kt-reading-section {
      position: relative;
      z-index: 0;
    }
    #place-experience .kt-reading-intro::before,
    #place-experience .kt-reading-section:not(.kt-synthesis-summary)::before {
      content: '';
      position: absolute;
      z-index: -1;
      inset: calc(-1 * var(--kt-reading-pane-bleed-y)) calc(-1 * var(--kt-reading-pane-bleed-x));
      /*
       * THE SAME PANEL THE REST OF THE SCREEN IS MADE OF.
       *
       * Every declaration below is copied from .kt-pillar-card, which
       * .kt-synthesis-summary already shares verbatim - the hub cards, the
       * summary card and now the reading pane are one material. Nothing here is
       * a new recipe; .kt-technical is the same family one step quieter
       * (0.44 / blur 16 / radius 18).
       *
       * WHAT IT REPLACES, AND WHY THAT WAS THE READABILITY BUG.
       * The pane was rgba(255,255,255,0.5) with blur(3px) - a WHITE sheet, and
       * the only surface on the screen made of anything like it. The prose is
       * rgba(244,241,233,0.88), which is very nearly white too, so the pane was
       * pushing the page toward exactly the contrast the text needed to keep.
       * The Earth showing through was the visible symptom; near-white ink on a
       * near-white ground was the cause, and 3px of blur left every coastline
       * and the terminator sharp underneath it.
       *
       * Dark glass fixes both at once: the ground is dark again, so the type
       * recovers its contrast, and the Earth arrives as colour and movement
       * rather than as detail competing with the letterforms.
       *
       * THE MATERIAL IS READ, NOT RETYPED - AND THAT IS THE BUG FIX.
       * These are ::before pseudo-elements, and glassSurfaceUnification
       * normalises a list of SELECTORS, which cannot reach a pseudo-element it
       * never named. The numbers were therefore copied here by hand, with a
       * comment saying they would have to be moved by hand whenever the
       * material changed. They were not: the material was retuned to 0.15 over
       * a 7px blur and these were left behind at 0.10 over 0.5px - which is
       * near enough to no blur that the reading prose sat straight on the
       * Earth while every card and capsule around it was properly plated.
       *
       * Reading the tokens instead closes that gap permanently. The literals
       * are fallbacks for the case where the unification module has not run,
       * and they are the current material rather than a second opinion on it.
       *
       * .kt-synthesis-summary is excluded because it is IN the unification's
       * selector list and already carries the material itself. Left in, it
       * would wear the plate twice - two stacked backdrop filters and two
       * stacked fills - and read as a heavier variant than everything around
       * it, which is precisely the inconsistency this rule exists to remove.
       */
      border: 1px solid var(--kt-surface-line, var(--line, rgba(255, 255, 255, 0.13)));
      border-radius: 20px;
      background: var(--kt-glass-fill, rgba(10, 13, 16, 0.15));
      backdrop-filter: blur(var(--kt-glass-blur-radius, 7px)) saturate(1.08);
      -webkit-backdrop-filter: blur(var(--kt-glass-blur-radius, 7px)) saturate(1.08);
      pointer-events: none;
    }

    /*
     * THE SYNTHESIS SCREEN.
     *
     * No new visual language: the screen is built from the pillar classes and
     * these four rules only adjust spacing and emphasis on the summary card at
     * the top. Every colour comes from an existing token.
     */
    #place-experience .kt-synthesis-summary {
      margin-top: clamp(20px, 4vh, 28px);
      padding: 18px;
      border: 1px solid var(--kt-surface-line, var(--line, rgba(255, 255, 255, 0.13)));
      border-radius: 20px;
      background: rgba(10, 13, 14, 0.52);
      backdrop-filter: blur(18px) saturate(120%);
      -webkit-backdrop-filter: blur(18px) saturate(120%);
    }
    #place-experience .kt-synthesis-summary > h2 { margin-top: 6px; }
    #place-experience .kt-synthesis-list-head {
      margin: 18px 0 8px;
      font-size: 10px;
      font-weight: 400;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--quiet, rgba(235, 231, 221, 0.44));
    }
    /* The closing card in the hub. Same card, one accent line to mark that the
       flow ends here rather than continuing sideways into a fifth tradition. */
    #place-experience .kt-synthesis-card {
      border-color: rgba(var(--kt-surface-border-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.28);
    }
    /*
     * SECTION HEADINGS SPEAK IN THE SECONDARY ACCENT.
     *
     * A section heading is reading hierarchy, so it takes the Secondary Accent
     * role: one rule re-colours every section heading of the five readings at
     * once. Nothing sets the role today, so it is the reading gold, the same for
     * every profile. Highlight stays free for the active and
     * emphasised states it already marks. (Owner decision D1, 2026-09-28.)
     */
    #place-experience .kt-reading-section > h2 {
      margin: 0 0 10px;
      font-family: Georgia, 'Times New Roman', serif;
      font-weight: 400;
      font-size: 21px;
      letter-spacing: 0.005em;
      color: rgba(var(--kt-secondary-accent-rgb, 216, 195, 142), 0.96);
    }
    #place-experience .kt-reading-standfirst {
      margin: 0 0 16px;
      font-size: 13.5px;
      line-height: 1.6;
      color: rgba(var(--kt-secondary-accent-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.78);
    }
    /* The second selector is the workings, which render inside .kt-technical
       rather than inside a reading section. The same declarations, deliberately:
       moving a paragraph behind a disclosure must not change how it is set. */
    #place-experience .kt-reading-section > p,
    #place-experience .kt-technical-body > p {
      margin: 0 0 14px;
      font-size: 15px;
      line-height: 1.72;
      color: rgba(244, 241, 233, 0.88);
    }
    #place-experience .kt-reading-section > p:last-child,
    #place-experience .kt-technical-body > p:last-child { margin-bottom: 0; }

    /* A sub-reading: one centre, one pillar, one placement. Indented by a
       hairline rule rather than by a box, so a run of eight of them does not
       turn the page into a stack of cards. */
    #place-experience .kt-reading-entry {
      margin: 18px 0 0;
      padding-left: 14px;
      border-left: 1px solid rgba(var(--kt-surface-border-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.26);
    }
    #place-experience .kt-reading-entry-head {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    #place-experience .kt-reading-entry-head h4 {
      margin: 0;
      font-size: 12px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(244, 241, 233, 0.6);
    }
    #place-experience .kt-reading-entry p {
      margin: 0 0 11px;
      font-size: 14.5px;
      line-height: 1.68;
      color: rgba(244, 241, 233, 0.85);
    }
    #place-experience .kt-reading-entry p:last-child { margin-bottom: 0; }

    /* ---------------------------------------------- symbolic markers -- */

    #place-experience .kt-mark-strip {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 16px 0 18px;
      padding: 0;
      list-style: none;
    }
    #place-experience .kt-mark {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 9px 13px 9px 11px;
      border: 1px solid var(--kt-surface-line, rgba(255, 255, 255, 0.11));
      border-radius: 14px;
      background: rgba(10, 13, 16, 0.42);
      backdrop-filter: blur(14px) saturate(1.06);
      -webkit-backdrop-filter: blur(14px) saturate(1.06);
    }
    #place-experience .kt-mark-glyph {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      color: rgba(var(--kt-icon-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.9);
    }
    #place-experience .kt-mark-text {
      display: grid;
      gap: 1px;
      min-width: 0;
    }
    #place-experience .kt-mark-label {
      font-size: 9.5px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(244, 241, 233, 0.44);
    }
    #place-experience .kt-mark-value {
      font-size: 14px;
      line-height: 1.3;
      color: rgba(244, 241, 233, 0.94);
    }
    #place-experience .kt-mark-note {
      font-size: 11.5px;
      line-height: 1.42;
      color: rgba(244, 241, 233, 0.5);
    }

    /* The glyph itself. One size, one stroke, currentColor throughout, so a
       Venus symbol and a Chinese branch sit on the same optical line. */
    #place-experience .kt-glyph {
      display: block;
      width: 20px;
      height: 20px;
      flex: 0 0 auto;
    }
    #place-experience .kt-glyph-char {
      /* Chinese characters carry their own weight; the stroke rules do not
         apply and a system CJK face is the correct typeface. */
      font-family: 'Noto Serif SC', 'Songti SC', 'SimSun', Georgia, serif;
    }
    #place-experience .kt-glyph-animal { width: 22px; height: 22px; opacity: 0.95; }
    #place-experience .kt-glyph-moon-phase { width: 19px; height: 19px; }
    #place-experience .kt-glyph-hd-center.is-open { opacity: 0.55; }

    /* The numerology badge: the numeral IS the symbol, so it gets the
       display treatment rather than an icon drawn around it. Rounded,
       generous, and deliberately the only place in the app using this
       weight - the brief asks for a symbolic identity, not a new app font. */
    #place-experience .kt-number-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 11px;
      border: 1px solid rgba(var(--kt-icon-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.34);
      background: radial-gradient(
        120% 120% at 30% 20%,
        rgba(var(--kt-icon-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.16),
        rgba(10, 13, 16, 0.5) 70%);
      flex: 0 0 auto;
    }
    #place-experience .kt-number-badge-value {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 15px;
      line-height: 1;
      letter-spacing: 0.01em;
      color: rgba(var(--kt-icon-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.96);
    }
    /* Master and karmic numbers mean something different, so they look
       different before a word is read. */
    #place-experience .kt-number-badge.is-master {
      border-color: rgba(var(--kt-icon-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.62);
      box-shadow: 0 0 14px rgba(var(--kt-icon-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.14);
    }
    #place-experience .kt-number-badge.is-master .kt-number-badge-value { font-size: 13.5px; }
    #place-experience .kt-number-badge.is-karmic {
      border-style: dashed;
      border-color: rgba(244, 241, 233, 0.36);
    }
    #place-experience .kt-number-badge.is-karmic .kt-number-badge-value {
      font-size: 13.5px;
      color: rgba(244, 241, 233, 0.8);
    }
    #place-experience .kt-number-badge.is-cycle {
      border-color: rgba(255, 255, 255, 0.16);
      background: rgba(10, 13, 16, 0.42);
    }
    #place-experience .kt-number-badge.is-cycle .kt-number-badge-value {
      color: rgba(244, 241, 233, 0.7);
    }

    /* ------------------------------------------ the technical appendix -- */

    #place-experience .kt-technical {
      margin-top: clamp(34px, 6vh, 48px);
      border: 1px solid var(--kt-surface-line, var(--line, rgba(255, 255, 255, 0.13)));
      border-radius: 18px;
      background: rgba(10, 13, 14, 0.44);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }
    #place-experience .kt-technical summary {
      display: flex;
      flex-direction: column;
      gap: 3px;
      padding: 16px 44px 16px 18px;
      position: relative;
      cursor: pointer;
      list-style: none;
    }
    #place-experience .kt-technical summary::-webkit-details-marker { display: none; }
    #place-experience .kt-technical summary::after {
      content: "+";
      position: absolute;
      right: 18px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 17px;
      color: var(--quiet, rgba(235, 231, 221, 0.44));
    }
    #place-experience .kt-technical[open] summary::after { content: "\\2013"; }
    #place-experience .kt-technical-title {
      font-size: 11px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: rgba(244, 241, 233, 0.82);
    }
    #place-experience .kt-technical-sub {
      font-size: 12.5px;
      line-height: 1.5;
      color: rgba(244, 241, 233, 0.48);
    }
    #place-experience .kt-technical-body {
      padding: 4px 18px 18px;
    }
    #place-experience .kt-tech-group { margin-top: 18px; }
    #place-experience .kt-tech-group h4 {
      margin: 0 0 10px;
      font-size: 10.5px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(var(--kt-secondary-accent-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.72);
    }
    #place-experience .kt-tech-group dl { margin: 0; }
    #place-experience .kt-tech-field {
      padding: 9px 0;
      border-top: 1px solid rgba(255, 255, 255, 0.07);
    }
    #place-experience .kt-tech-field dt {
      font-size: 11px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(244, 241, 233, 0.46);
    }
    #place-experience .kt-tech-field dd {
      margin: 3px 0 0;
      font-size: 13.5px;
      line-height: 1.55;
      color: rgba(244, 241, 233, 0.88);
      overflow-wrap: anywhere;
    }
    /* The one plain sentence saying what the field IS. Never interpretation. */
    #place-experience .kt-tech-field dd.kt-tech-note {
      margin-top: 4px;
      font-size: 12px;
      line-height: 1.5;
      color: rgba(244, 241, 233, 0.5);
    }

    .kt-section-hint {
      margin: 0 0 12px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 12.5px;
      line-height: 1.55;
      color: rgba(244, 241, 233, 0.62);
    }

    .kt-pillar-section-body {
      padding: 0 18px 18px;
      font-size: 13.5px;
      line-height: 1.62;
      color: var(--muted, rgba(235, 231, 221, 0.62));
    }

    .kt-pillar-section-body em {
      font-style: normal;
      color: rgba(var(--kt-secondary-accent-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.8);
    }

    .kt-tech-group h4 {
      margin: 16px 0 6px;
      font-size: 11px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--quiet, rgba(235, 231, 221, 0.44));
    }

    .kt-tech-group dl { margin: 0; }
    .kt-tech-group dl > div {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
      gap: 10px;
      padding: 5px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .kt-tech-group dt { margin: 0; color: var(--quiet, rgba(235, 231, 221, 0.44)); }
    .kt-tech-group dd { margin: 0; overflow-wrap: anywhere; }

    .kt-limitations li {
      padding: 7px 0 7px 14px;
      position: relative;
    }
    .kt-limitations li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 15px;
      width: 5px;
      height: 1px;
      background: rgba(235, 231, 221, 0.4);
    }

    .kt-source-ref { font-size: 11.5px; color: var(--quiet, rgba(235, 231, 221, 0.44)); overflow-wrap: anywhere; }

    /*
     * THE UNKNOWN-TIME FALLBACK NOTICE.
     *
     * Subtle but not hidden: the same amber the app uses for a caveat, a rule
     * down the left so the eye catches it as a note rather than as body copy,
     * and full contrast on the text itself. It appears only where the 12:00
     * substitute actually changed the result - the review screen, Western
     * Astrology and Human Design - and deliberately NOT on Numerology, which
     * does not read a time at all, nor on BaZi, whose Hour Pillar is withheld
     * rather than computed from the fallback. Saying "we used 12:00" beside a
     * pillar that did not use it would be its own small lie.
     */
    /* On the review row the note takes a line of its own: the row is a flex of
       value + Change button, so without this it becomes a third column and
       fights the button for width. */
    #place-experience .profile-overview-row { flex-wrap: wrap; }
    #place-experience #overview-time-fallback { flex-basis: 100%; }
    /*
     * THE ROW IS A GRID, NOT A FLEX, so the two rules above never took: the note
     * sat in the value column beside an empty Change column. And the row is a
     * 999px pill with overflow: hidden - three lines of note made it ~160px tall,
     * the radius resolved to half of that, and the curved ends cropped the note
     * into an oval (measured at 390px: bottom-left corner clipped).
     *
     * Scoped to THIS note only. .kt-time-fallback-note is shared with the chart
     * wheel and the bodygraph, whose notes are untouched. The row keeps its pill
     * in every other state; it becomes a rounded rectangle only while it holds
     * the note, because no pill that tall can contain a rectangle.
     */
    #place-experience #overview-time-fallback {
      grid-column: 1 / -1;
      border-radius: 10px;
      /* The shared note's accent is a one-sided 2px border-left, drawn for
         square left corners. With all four corners rounded it has to follow the
         curves and tapers into a crescent - reported on the phone as a blue
         "rift" beside the text. This note is marked by its tint alone. */
      border-left: 0;
    }
    #place-experience .profile-overview-row:has(> #overview-time-fallback:not([hidden])) {
      border-radius: 20px;
    }

    #place-experience .kt-time-fallback-note {
      display: block;
      /* A paragraph, and the review row centres its contents. */
      text-align: left;
      margin: 7px 0 0;
      padding: 7px 10px;
      border-left: 2px solid rgba(var(--kt-accent-rgb, 218, 171, 84), 0.55);
      border-radius: 0 8px 8px 0;
      background: rgba(var(--kt-accent-rgb, 218, 171, 84), 0.07);
      font-size: 11px;
      line-height: 1.45;
      color: rgba(235, 231, 221, 0.74);
    }
  `;
    document.head.append(style);
    /* Exposed for the overview editor: after a saved edit the committed profile
       has changed, so the engine must run again before anything is shown. */
    window
        .knowThyselfRecomputePillars = computeFromCommittedProfile;
    /*
     * Exposed for the QA presets. Still the SAME two steps the final onboarding
     * action takes - computeFromCommittedProfile() then the portrait - so a preset
     * cannot drift into a calculation path of its own.
     *
     * The name is kept. It is called from onboardingDevPresets and from the QA
     * navigation test, and renaming a cross-module handle to match an internal
     * rename buys nothing and breaks both.
     */
    window
        .knowThyselfOpenHubFromCommitted = forcePortraitFromCommitted;
}
