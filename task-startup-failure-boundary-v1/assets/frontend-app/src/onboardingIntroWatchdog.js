import { t } from './app/i18n/uiStrings.js?v=2ea79e9';
/*
 * INTRO HANDOFF WATCHDOG
 * ----------------------
 * Reported from the physical Samsung: the tunnel played, and then the Earth
 * never appeared - a permanent dead screen with no way out except a reload.
 *
 * The opening is a chain of asynchronous steps (Google Maps library load ->
 * Map3DElement mount -> steady/readiness -> warp handoff -> camera journey ->
 * interface reveal). Every one of those has its own internal timeout, but the
 * chain as a whole has none: if any link never settles, the black loading cover
 * and the warp overlay simply stay on screen forever and the interface never
 * unlocks.
 *
 * This is the missing outer bound. It does not try to diagnose which link
 * failed - it guarantees that the user always ends up in a usable state:
 * covers removed, Earth revealed if it exists, search interface unlocked. It
 * cancels itself the moment the normal sequence completes on its own, so a
 * healthy startup never sees it.
 *
 * Deliberately generous, so it can never pre-empt a slow but working start on a
 * poor mobile connection: the real sequence needs roughly 12-14 s.
 *
 * IT IS AN ENTRY OF ITS OWN. It used to be reachable only through vesselOrbit.js,
 * whose graph is ~600 modules: one failed request there meant this file never ran
 * and the very thing that exists to rescue a dead start was dead with it. The page
 * now loads it as a separate script (a two-file graph), and the inline startup
 * boundary covers the case where even that cannot load.
 */
const experience = document.getElementById('place-experience');
if (experience instanceof HTMLElement) {
    const watchdogMillis = 20_000;
    /* The watchdog now arms when the page starts, not after the ~600-module controller graph has been fetched (4-8 s in on a phone). Without
       this grace its effective deadline would move 4-8 s EARLIER than it has always been, and could pre-empt a slow but working start. */
    const armingGraceMillis = 6_000;
    let timer = 0;
    let observer = null;
    const introComplete = () => experience.dataset.introState === 'complete';
    const stop = () => {
        if (experience.dataset.introWatchdog === 'armed')
            experience.dataset.introWatchdog = 'cancelled';
        window.clearTimeout(timer);
        timer = 0;
        observer?.disconnect();
        observer = null;
    };
    /* When the startup boundary has put the recovery screen up, the start FAILED. Completing the intro underneath it would pretend it did
       not, and hand the person a screen whose controllers never loaded. */
    const startupBlocked = () => window.__ktStartup?.blocking === true;
    const forceHandoff = () => {
        if (introComplete())
            return;
        if (startupBlocked()) {
            experience.dataset.introWatchdog = 'stood-down';
            return;
        }
        // Whatever stalled, these are the things standing between the user and a
        // usable screen.
        for (const id of ['earth-loading-cover', 'spacetime-intro']) {
            document.getElementById(id)?.remove();
        }
        experience.dataset.introState = 'complete';
        experience.dataset.introRecovered = 'watchdog';
        experience.dataset.introWatchdog = 'recovered';
        experience.classList.add('intro-ui-visible');
        experience.classList.remove('earth-materializing');
        const dock = document.getElementById('interaction-dock');
        if (dock instanceof HTMLElement)
            dock.inert = false;
        const status = document.getElementById('experience-status');
        if (status instanceof HTMLElement && status.textContent?.trim().length === 0) {
            /* A map that could not be had is not "ready": say what the person is looking at. */
            const unavailable = document.getElementById('earth-map')?.dataset.earthMapState === 'unavailable';
            /* The Earth failed but the place search does not need it: say that, not that the search is gone. */
            const key = experience.dataset.earthFailure ? 'onb.status.earthUnavailable' : unavailable ? 'onb.status.mapUnavailable' : 'onb.status.earthReady';
            status.textContent = t(key);
        }
    };
    if (!introComplete()) {
        /* Visible to the QA tests and the debug report: this module ran, independently of the big graph, and what it did. */
        experience.dataset.introWatchdog = 'armed';
        observer = new MutationObserver(() => {
            if (introComplete())
                stop();
        });
        observer.observe(experience, { attributes: true, attributeFilter: ['data-intro-state'] });
        timer = window.setTimeout(() => {
            timer = 0;
            forceHandoff();
            stop();
        }, watchdogMillis + armingGraceMillis);
    }
    window.addEventListener('pagehide', stop, { once: true });
}
