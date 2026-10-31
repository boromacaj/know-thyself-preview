import { keyboardDockBottomOffset } from './viewportKeyboardGeometry.js?v=f9ab0a6';
/*
 * KEYBOARD-INDEPENDENT SCENE ROOT
 * -------------------------------
 * Reported from the physical Samsung, twice: focusing the PLACE search field
 * still pushes the whole composition - Earth included - upward.
 *
 * THE PRIMARY FAULT WAS A FALSE PREMISE ABOUT THE VIEWPORT MODE.
 * The page never declared `interactive-widget`, and its SPEC DEFAULT is
 * resizes-visual - not resizes-content, as this module previously assumed and
 * stated in a comment. Under resizes-visual the layout viewport does not change
 * at all; Chrome instead PANS the visual viewport to reveal the focused field,
 * sliding the entire page - Earth included - up behind the browser chrome. That
 * is exactly what the physical Samsung screenshot shows: a full-size globe
 * clipped by the top browser chrome, not a globe re-centred in a shorter box.
 *
 * It also explains why every previous fix passed in simulation and failed on
 * device: shrinking a desktop window emulates resizes-content, which is the
 * mode the page was never in. The page now declares
 * interactive-widget=resizes-content explicitly, so the visual viewport tracks
 * the layout viewport and cannot pan. Everything below then holds the scene
 * still against the layout shrink that mode does produce.
 *
 * TWO FURTHER FAULTS, ALSO INVISIBLE TO THE SIMULATION.
 *
 * 1. A FOCUS/RESIZE RACE POISONED THE RESTING HEIGHT.
 *    The previous version only treated a shrinking viewport as a keyboard when
 *    a dock field ALREADY held focus. On Android the visualViewport resize can
 *    arrive BEFORE focus lands, so that check failed, the else-branch ran, and
 *    it recorded the keyboard-open height as the new resting height. After that
 *    `covered` was always ~0, the keyboard layout never engaged again, and the
 *    stage simply shrank with 100dvh - the original bug, restored. A desktop
 *    test focuses first and resizes second, so it always took the correct
 *    branch and never saw this.
 *
 *    The resting height is now the LARGEST plausible viewport height seen for
 *    the current width. A keyboard can only ever make the viewport shorter, so
 *    a maximum cannot be poisoned by one. It resets on a width/orientation
 *    change, which is the only thing that legitimately changes the resting
 *    geometry. Keyboard detection is now purely geometric and does not depend
 *    on focus having been established yet.
 *
 * 2. THE EARTH STILL LIVED IN THE KEYBOARD-RESIZED COORDINATE SYSTEM.
 *    .earth-map was absolutely positioned inside .place-experience, so that
 *    stage was both its containing block AND its clip. Anything that resized
 *    the stage re-laid out or clipped the scene.
 *
 *    The scene is now given its own coordinate system: position:fixed against
 *    the viewport, with an explicit resting height. Being fixed, its containing
 *    block is the viewport rather than the stage, and - because no ancestor
 *    creates a containing block for fixed elements (the stage uses only
 *    `isolation` and `overflow`, never transform/filter/contain) - it is not
 *    clipped by the stage either. This splits the scene out of the control
 *    layout WITHOUT reparenting the DOM, which matters: moving the
 *    Map3DElement between parents would disconnect and remount the renderer.
 *
 * THE THREE THINGS ARE NOW HANDLED SEPARATELY, as they must be:
 *   A. layout viewport resize  -> cancelled for the scene (fixed + resting height)
 *   B. visual viewport pan     -> cancelled for the scene (inverse translate)
 *   C. control dock position   -> the ONLY consumer of keyboard geometry
 *
 * The Google camera is never touched. The Earth simply continues underneath the
 * search UI and the keyboard, which is where a full-bleed scene belongs.
 */
const experience = document.getElementById('place-experience');
const interactionDock = document.getElementById('interaction-dock');
if (experience instanceof HTMLElement && interactionDock instanceof HTMLElement) {
    // Below this a height change is browser chrome collapsing, not a keyboard.
    const keyboardThresholdPixels = 120;
    // A measurement this small is a broken/one-off layout read, not a viewport.
    const minimumPlausibleSceneHeight = 240;
    // A real orientation/layout change moves the width; a keyboard never does.
    const widthChangeThresholdPixels = 24;
    // Deliberate gap between the dock and the keyboard's top edge.
    const keyboardGapPixels = 12;
    /* The resting viewport: the tallest plausible height seen at this width. A
       keyboard can only shrink the viewport, so a maximum is immune to the race
       that poisoned the previous "latest height with no keyboard" approach. */
    let restingHeight = 0;
    let restingWidth = 0;
    let keyboardOpen = false;
    const visibleHeight = () => {
        const viewport = window.visualViewport;
        return Math.round(viewport ? viewport.height : window.innerHeight);
    };
    /* Chrome may pan the VISUAL viewport to reveal a focused field. That is a
       different phenomenon from the layout viewport shrinking, and it is the one
       thing that can still move a fixed element on screen. */
    const viewportPan = () => {
        const viewport = window.visualViewport;
        if (!viewport)
            return 0;
        return Math.round(viewport.offsetTop ?? 0);
    };
    const publishSceneGeometry = () => {
        experience.style.setProperty('--kt-scene-height', `${Math.round(restingHeight)}px`);
    };
    /* The inverse of any visual-viewport pan, applied to the scene root alone so
       its PHYSICAL screen position is preserved. Deliberately excludes keyboard
       height: this compensates browser panning only. Stays at 0 under
       resizes-content, where the visual viewport does not pan. */
    const applyScenePan = (pan) => {
        if (pan === 0) {
            experience.style.removeProperty('--kt-scene-pan');
            return;
        }
        experience.style.setProperty('--kt-scene-pan', `${pan}px`);
    };
    const setKeyboard = (open, keyboardTop) => {
        keyboardOpen = open;
        if (open) {
            experience.style.setProperty('--kt-keyboard-top', `${Math.round(keyboardTop)}px`);
            experience.style.setProperty('--kt-keyboard-gap', `${keyboardGapPixels}px`);
            /* iOS WebKit can shrink only the visual viewport for the keyboard. Fixed
               controls must clear the hidden portion of the layout viewport; on
               Android resizes-content this measured occlusion is zero. */
            const dockBottom = keyboardDockBottomOffset(window.innerHeight, keyboardTop, window.visualViewport?.offsetTop ?? 0, keyboardGapPixels);
            experience.style.setProperty('--kt-keyboard-dock-bottom', `${dockBottom}px`);
            experience.dataset.keyboardOpen = 'true';
            experience.dataset.keyboardTop = String(Math.round(keyboardTop));
            return;
        }
        experience.style.removeProperty('--kt-keyboard-top');
        experience.style.removeProperty('--kt-keyboard-gap');
        experience.style.removeProperty('--kt-keyboard-dock-bottom');
        delete experience.dataset.keyboardOpen;
        delete experience.dataset.keyboardTop;
    };
    /*
     * The iOS/iPadOS rendering engine. Every browser there is WebKit, so this is
     * an engine test rather than a browser test; iPadOS reports itself as a Mac,
     * which is why a touch check is what separates a tablet from desktop Safari.
     */
    const isWebKitFamily = (() => {
        const ua = navigator.userAgent;
        if (/Chrome\/|Chromium\/|Edg\//.test(ua))
            return false;
        if (!/AppleWebKit/.test(ua))
            return false;
        if (/iPhone|iPad|iPod/.test(ua))
            return true;
        return /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
    })();
    const focusIsInsideExperience = () => {
        const active = document.activeElement;
        return active instanceof HTMLElement && experience.contains(active);
    };
    /* An overflow:hidden box can still be scrolled programmatically by the
       browser's own scroll-into-view on focus. Nothing here is meant to scroll,
       so any scrollTop is an artefact - otherwise the browser drags the page.
       
       EXCEPT on WebKit while a field is focused. Chrome resizes the layout
       viewport for the keyboard; WebKit instead SCROLLS the page and pans the
       visual viewport to reveal the field, and it keeps re-doing it. Resetting
       the scroll underneath that is not a correction, it is the other half of a
       loop: WebKit scrolls to the field, this scrolls back, WebKit scrolls
       again. Every iteration is a forced layout, which is where the stutter, the
       missed taps and the unreliable typing come from. While a field there holds
       focus, WebKit's scroll is left alone; the scene is anchored by
       --kt-scene-pan instead, which moves nothing in the layout. */
    const cancelStrayScroll = () => {
        if (experience.scrollTop !== 0)
            experience.scrollTop = 0;
        if (isWebKitFamily && focusIsInsideExperience())
            return;
        if (document.scrollingElement && document.scrollingElement.scrollTop !== 0) {
            document.scrollingElement.scrollTop = 0;
        }
        if (window.scrollY !== 0)
            window.scrollTo(0, 0);
    };
    // Keyboard handling cannot matter until the interface is usable, and keeping
    // it out of the intro means it can never take part in mounting or sizing the
    // Earth renderer.
    const introFinished = () => experience.dataset.introState === 'complete';
    const sync = () => {
        const width = window.innerWidth;
        const visible = visibleHeight();
        if (!Number.isFinite(visible) || visible < minimumPlausibleSceneHeight)
            return;
        // Orientation / real window change: the resting geometry genuinely changed.
        if (restingWidth === 0 || Math.abs(width - restingWidth) > widthChangeThresholdPixels) {
            restingWidth = width;
            restingHeight = visible;
        }
        else if (visible > restingHeight) {
            // A keyboard never makes the viewport taller, so growth is always real.
            restingHeight = visible;
        }
        publishSceneGeometry();
        if (!introFinished())
            return;
        /* Purely geometric: no dependence on focus having landed yet. This is what
           makes it survive the Android ordering where resize precedes focus. */
        const covered = restingHeight - visible;
        setKeyboard(covered > keyboardThresholdPixels, visible);
        applyScenePan(viewportPan());
        cancelStrayScroll();
    };
    /*
     * sync() reads geometry and then writes custom properties and scroll
     * positions. Running it straight from every listener means those reads and
     * writes interleave, and each interleaving forces a synchronous layout.
     * visualViewport fires a burst of scroll and resize events for the whole
     * keyboard animation, so that was a forced layout per event for the length
     * of the animation - on the frames where the device could least afford it.
     *
     * Coalescing to one run per frame keeps the behaviour identical (the last
     * event in a frame is the one whose geometry is current anyway) and collapses
     * the burst into a single measurement.
     */
    let syncFrame = 0;
    const scheduleSync = () => {
        if (syncFrame !== 0)
            return;
        syncFrame = window.requestAnimationFrame(() => {
            syncFrame = 0;
            sync();
        });
    };
    const style = document.createElement('style');
    style.dataset.onboardingKeyboardViewport = 'true';
    style.textContent = `
    /* SCENE PLANE - its own coordinate system.
       position:fixed makes the VIEWPORT the containing block instead of the
       stage, so resizing the stage cannot re-lay the scene out; and since no
       ancestor creates a containing block for fixed elements, the stage's
       overflow:hidden does not clip it either. The explicit resting height
       means the keyboard shrinking 100dvh has no effect on it at all.
       The scene simply continues underneath the controls and the keyboard. */
    #place-experience .earth-map {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: auto !important;
      bottom: auto !important;
      width: 100% !important;
      height: var(--kt-scene-height, 100dvh) !important;
    }

    /* Inverse of a visual-viewport pan, and nothing else. Absent entirely when
       the browser does not pan, so no transform exists in the normal case. */
    #place-experience[style*="--kt-scene-pan"] .earth-map {
      transform: translateY(var(--kt-scene-pan, 0px)) !important;
    }

    /* EVERYTHING ELSE THAT BELONGS TO THE SCENE GETS THE SAME COMPENSATION.
       When this rule only moved .earth-map, the globe was pinned and the effects
       drawn ON the globe were not, so a pan tore them apart: on the device the
       glow rim stayed where the planet had been while the planet itself slid down
       behind it, leaving a bright empty circle above a displaced Earth. The rim
       and the ambient backdrop are part of the scene, not the interface, so they
       have to be compensated by exactly the same amount and in the same rule -
       one owner, one value, no chance of the three drifting apart again.
       The ring keeps its own centring translate; the pan is composed onto it. */
    #place-experience[style*="--kt-scene-pan"] #kt-ambient-backdrop {
      transform: translateY(var(--kt-scene-pan, 0px)) !important;
    }

    #place-experience[style*="--kt-scene-pan"] .kt-vessel-glow-ring {
      transform: translate(-50%, -50%) translateY(var(--kt-scene-pan, 0px)) !important;
    }

    /* CONTROL PLANE - the only consumer of keyboard geometry.
       Anchored to the LAYOUT VIEWPORT rather than to the stage. Under
       resizes-content the layout viewport is exactly the space left above the
       keyboard, so a fixed dock at a small bottom offset is docked to the
       keyboard by definition - no height variable, no translate, nothing to
       unwind on close.

       It must not be anchored to the stage: the stage keeps min-height:520px,
       so on a short keyboard-open viewport it stays TALLER than the visible
       area and a stage-relative bottom offset puts the dock behind the
       keyboard. That was measured at -58 px. */
    #place-experience[data-keyboard-open="true"] .interaction-dock {
      position: fixed !important;
      bottom: var(--kt-keyboard-dock-bottom, var(--kt-keyboard-gap)) !important;
      transform: none !important;
      transition: bottom 180ms cubic-bezier(0.22, 0.61, 0.36, 1) !important;
    }

    /* Results belong to the bar and stack upward from it, bounded so a long
       list can never grow past the usable area. */
    #place-experience[data-keyboard-open="true"] .interaction-dock .place-results {
      max-height: calc(var(--kt-keyboard-top, 100dvh) - 150px) !important;
      overflow-y: auto !important;
    }

    /* THE SAME CONTROL-PLANE CONTRACT, FOR IDENTITY AND ARRIVAL.
       .interaction-dock got this treatment because it is the PLACE control. The
       profile forms are the other control surface and were never given it, so on
       IDENTITY and ARRIVAL the keyboard clipped them: measured at a 431px
       viewport, .profile-panel's bottom sat 47px BELOW the fold and Back/Next
       were simply unreachable.

       The reason it needs more than a position swap is the contain property. .profile-flow
       and .kt-layer both declare contain: layout style, and layout containment
       makes an element a containing block for FIXED descendants. So the panel's
       bottom was resolving against the 520px control layer - the stage's floor
       height - rather than against the viewport, and position:fixed on its own
       changed nothing. That is exactly the invariant the scene root depends on
       and documents above: the Earth survives the keyboard only because nothing
       between it and the viewport contains it. Inside the profile flow, something
       does.

       Containment is released on those two ancestors ONLY while the keyboard is
       open, and only along the path to the panel, so the panel's bottom offset reaches
       the layout viewport again. Under resizes-content the layout viewport IS the
       space above the keyboard, so a bottom offset is docked to the keyboard by
       definition - same reasoning, same gap variable, as the dock above. All of
       it is scoped to [data-keyboard-open="true"], so the resting layout is
       untouched: with no keyboard these rules do not exist. The Earth is not
       referenced here at all; the scene stays fixed and simply continues beneath. */
    #place-experience[data-keyboard-open="true"] .vessel-stage .profile-flow,
    #place-experience[data-keyboard-open="true"] .profile-flow .kt-controls-layer {
      contain: none !important;
    }

    #place-experience[data-keyboard-open="true"] .profile-flow .kt-controls-layer .profile-panel {
      position: fixed !important;
      top: auto !important;
      bottom: var(--kt-keyboard-dock-bottom, var(--kt-keyboard-gap)) !important;
      contain: none !important;
    }
  `;
    document.head.append(style);
    const viewport = window.visualViewport;
    viewport?.addEventListener('resize', scheduleSync);
    viewport?.addEventListener('scroll', scheduleSync);
    window.addEventListener('resize', scheduleSync);
    window.addEventListener('orientationchange', scheduleSync);
    window.addEventListener('scroll', cancelStrayScroll, { passive: true });
    /* Focus is the one case that must not wait for a frame: the geometry it
       captures is the resting one, and a frame later the keyboard is already
       moving. */
    document.addEventListener('focusin', sync);
    document.addEventListener('scroll', cancelStrayScroll, true);
    document.addEventListener('focusout', () => window.setTimeout(sync, 60));
    /* The resting geometry must be captured before the browser starts reacting to
       the tap, not after the keyboard is already up. */
    interactionDock.addEventListener('pointerdown', sync, { capture: true, passive: true });
    interactionDock.addEventListener('touchstart', sync, { capture: true, passive: true });
    const introObserver = new MutationObserver(scheduleSync);
    introObserver.observe(experience, { attributes: true, attributeFilter: ['data-intro-state'] });
    sync();
    experience.dataset.keyboardViewportOwner = 'fixed-scene-root';
    window.addEventListener('pagehide', (event) => {
        /* A back/forward-cache navigation freezes this same document. Its live
           styles and listeners must survive restoration, especially on Safari. */
        if (event.persisted)
            return;
        viewport?.removeEventListener('resize', scheduleSync);
        viewport?.removeEventListener('scroll', scheduleSync);
        window.removeEventListener('resize', scheduleSync);
        window.removeEventListener('orientationchange', scheduleSync);
        document.removeEventListener('focusin', sync);
        document.removeEventListener('scroll', cancelStrayScroll, true);
        introObserver.disconnect();
        setKeyboard(false, 0);
        applyScenePan(0);
        style.remove();
    }, { once: true });
    /*
     * PHYSICAL DEBUG MODE - ?ktKeyboardDebug=1
     * The device is the authoritative target and a screenshot of a debug panel is
     * the only way to get real numbers off it. Off unless explicitly requested.
     */
    if (new URLSearchParams(window.location.search).get('ktKeyboardDebug') === '1') {
        const panel = document.createElement('div');
        panel.id = 'kt-keyboard-debug';
        panel.setAttribute('aria-hidden', 'true');
        const panelStyle = document.createElement('style');
        panelStyle.textContent = `
      #kt-keyboard-debug {
        position: fixed; top: 0; left: 0; z-index: 2147483647;
        max-width: 100%; padding: 6px 8px; pointer-events: none;
        font: 11px/1.32 ui-monospace, Menlo, Consolas, monospace;
        color: #9df7c4; background: rgba(0, 0, 0, 0.82); white-space: pre;
      }
    `;
        document.head.append(panelStyle);
        document.body.append(panel);
        const events = [];
        const note = (name) => {
            events.unshift(`${name}@${Math.round(performance.now())}`);
            events.length = Math.min(events.length, 6);
        };
        for (const name of ['pointerdown', 'touchstart', 'focusin', 'focusout', 'blur']) {
            document.addEventListener(name, () => note(name), true);
        }
        window.visualViewport?.addEventListener('resize', () => note('vv:resize'));
        window.visualViewport?.addEventListener('scroll', () => note('vv:scroll'));
        window.addEventListener('scroll', () => note('win:scroll'));
        const earth = document.getElementById('earth-map');
        const round = (value) => Math.round(value * 100) / 100;
        const render = () => {
            const host = earth?.querySelector('gmp-map-3d');
            const sceneRect = earth?.getBoundingClientRect();
            const hostRect = host?.getBoundingClientRect();
            const dockRect = interactionDock.getBoundingClientRect();
            panel.textContent = [
                `build          ${document.querySelector('meta[name="kt-build"]')?.getAttribute('content') ?? 'unknown'}`,
                `keyboardOpen   ${experience.dataset.keyboardOpen ?? 'false'}`,
                `innerHeight    ${window.innerHeight}`,
                `vv.height      ${Math.round(window.visualViewport?.height ?? 0)}`,
                `vv.offsetTop   ${Math.round(window.visualViewport?.offsetTop ?? 0)}`,
                `vv.pageTop     ${Math.round(window.visualViewport?.pageTop ?? 0)}`,
                `scrollY        ${Math.round(window.scrollY)}`,
                `restingHeight  ${Math.round(restingHeight)}`,
                `scene top/h    ${round(sceneRect?.top ?? 0)} / ${round(sceneRect?.height ?? 0)}`,
                `mapHost top/h  ${round(hostRect?.top ?? 0)} / ${round(hostRect?.height ?? 0)}`,
                `range          ${Math.round(Number(host?.range ?? 0))}`,
                `dock top/bot   ${round(dockRect.top)} / ${round(dockRect.bottom)}`,
                `keyboardTop    ${experience.dataset.keyboardTop ?? '-'}`,
                `gap            ${experience.dataset.keyboardTop
                    ? round(Number(experience.dataset.keyboardTop) - dockRect.bottom) : '-'}`,
                `compensationY  ${experience.style.getPropertyValue('--kt-scene-pan') || '0px'}`,
                `events         ${events.join(' ')}`,
            ].join('\n');
            window.requestAnimationFrame(render);
        };
        window.requestAnimationFrame(render);
    }
}
