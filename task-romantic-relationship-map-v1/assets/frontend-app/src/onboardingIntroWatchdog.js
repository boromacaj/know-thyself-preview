import { t } from './app/i18n/uiStrings.js';
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
 */
const experience = document.getElementById('place-experience');
if (experience instanceof HTMLElement) {
    const watchdogMillis = 20_000;
    let timer = 0;
    let observer = null;
    const introComplete = () => experience.dataset.introState === 'complete';
    const stop = () => {
        window.clearTimeout(timer);
        timer = 0;
        observer?.disconnect();
        observer = null;
    };
    const forceHandoff = () => {
        if (introComplete())
            return;
        // Whatever stalled, these are the things standing between the user and a
        // usable screen.
        for (const id of ['earth-loading-cover', 'spacetime-intro']) {
            document.getElementById(id)?.remove();
        }
        experience.dataset.introState = 'complete';
        experience.dataset.introRecovered = 'watchdog';
        experience.classList.add('intro-ui-visible');
        experience.classList.remove('earth-materializing');
        const dock = document.getElementById('interaction-dock');
        if (dock instanceof HTMLElement)
            dock.inert = false;
        const status = document.getElementById('experience-status');
        if (status instanceof HTMLElement && status.textContent?.trim().length === 0) {
            /* A map that could not be had is not "ready": say what the person is looking at. */
            const unavailable = document.getElementById('earth-map')?.dataset.earthMapState === 'unavailable';
            status.textContent = t(unavailable ? 'onb.status.mapUnavailable' : 'onb.status.earthReady');
        }
    };
    if (!introComplete()) {
        observer = new MutationObserver(() => {
            if (introComplete())
                stop();
        });
        observer.observe(experience, { attributes: true, attributeFilter: ['data-intro-state'] });
        timer = window.setTimeout(() => {
            timer = 0;
            forceHandoff();
            stop();
        }, watchdogMillis);
    }
    window.addEventListener('pagehide', stop, { once: true });
}
