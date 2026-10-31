import { LOCALE_CHANGED_EVENT } from './app/i18n/locale.js?v=2ea79e9';
import { renderPremiumPillarNav, PREMIUM_CONNECTIONS_STAGE } from './app/premium-earth/premiumPillarScreens.js?v=2ea79e9';
import { centreActiveStop, retireProfileSurfaces, visibleProfileSurfaces } from './app/premium-earth/profileSurfaces.js?v=2ea79e9';
import { readPremiumResult } from './app/premium-earth/premiumResultStore.js?v=2ea79e9';
import { connectionsCss } from './app/connections/ui/connectionsStyle.js?v=2ea79e9';
import { cardTargets, runCardTransition } from './onboardingCardTransition.js?v=2ea79e9';
/*
 * CONNECTIONS - A DESTINATION OF THE APPLICATION, ON ITS OWN SURFACE.
 *
 * The same arrangement as Tarot and the forecast, for the same reason: a module of its own that adds a surface and a click handler and touches none of the other controllers'
 * internals. The Main Menu's Connections tile carries `data-connections-open`; the reading controller records the destination (#/connections) and this module opens the surface.
 *
 * WHAT IS REUSED: the surface class (.kt-pillar-surface - the scroller, the safe areas, the inert/hidden lifecycle), the strip container (.kt-pillar-nav, which is one MENU capsule:
 * the way out), the card transition at the destination pace, the glass material and the colour roles. WHAT IS NOT NEW: no navigation of its own beyond the levels inside the
 * destination, which are history entries (connectionsController.ts), so Back is the phone's Back.
 *
 * THE ENGINE IS LOADED WHEN CONNECTIONS IS FIRST OPENED, NOT WHEN THE APPLICATION STARTS. The comparison engine, the authored content in two languages and the research index are
 * several hundred kilobytes that nobody who never opens Connections should pay for; this file is only the door. Opening the destination is what loads them.
 *
 * THE OWNER'S PROFILE IS PERSON A AND IS NOT COPIED. The controller reads the application's own computed result (premiumResultStore) and never stores it.
 */
const experienceHost = document.getElementById('place-experience');
const vesselStage = document.getElementById('vessel-stage');
if (experienceHost instanceof HTMLElement && vesselStage instanceof HTMLElement) {
    const surface = document.createElement('section');
    surface.id = 'connections-view';
    surface.className = 'kt-pillar-surface kt-connections-surface';
    surface.hidden = true;
    surface.inert = true;
    const mount = document.createElement('div');
    mount.id = 'connections-root';
    surface.append(mount);
    /* The intake sheet lives in a host of its own at the root of the application: the screen is a stacking order of its own, under the strip and the profile controls, and a
       dialog inside it would have them on top of it. */
    const sheetHost = document.createElement('div');
    sheetHost.id = 'connections-sheet';
    experienceHost.append(sheetHost);
    const nav = document.createElement('nav');
    nav.id = 'connections-nav';
    nav.className = 'kt-pillar-nav';
    nav.hidden = true;
    nav.inert = true;
    vesselStage.append(surface, nav);
    let loading = null;
    const load = () => {
        loading ??= import('./app/connections/ui/connectionsController.js?v=2ea79e9').then((module) => module.mountConnections({ mount, scrollHost: surface, sheetHost }));
        return loading;
    };
    const renderNav = () => {
        const { experience } = readPremiumResult();
        nav.innerHTML = experience ? renderPremiumPillarNav(experience, PREMIUM_CONNECTIONS_STAGE) : '';
        centreActiveStop(nav);
    };
    const isActive = () => experienceHost.dataset.pillarActive === PREMIUM_CONNECTIONS_STAGE;
    /* Opening runs the shared transition at the destination pace and fades out whatever is on screen. `restore` is a history or session restore: the screen reopens at the level the
       history entry stands on instead of at the first one. */
    const open = (restore) => {
        if (isActive())
            return;
        void load().then((controller) => {
            if (isActive())
                return;
            controller.open(restore);
            renderNav();
            const leaving = visibleProfileSurfaces(vesselStage);
            void runCardTransition({
                pace: 'destination',
                lock: () => { surface.inert = true; nav.inert = true; },
                outgoing: () => cardTargets(leaving),
                swap: () => {
                    retireProfileSurfaces(vesselStage, [surface, nav]);
                    surface.hidden = false;
                    surface.inert = false;
                    nav.hidden = false;
                    nav.inert = false;
                    surface.scrollTop = 0;
                    experienceHost.dataset.pillarStage = 'pillar';
                    experienceHost.dataset.pillarActive = PREMIUM_CONNECTIONS_STAGE;
                    centreActiveStop(nav);
                },
                incoming: () => cardTargets([surface, nav]),
                unlock: () => { surface.inert = false; nav.inert = false; },
            });
        });
    };
    /* Leaving is not this module's job: the other destinations retire this surface inside their own swap. What it owns is telling the controller whether it is on show. */
    new MutationObserver(() => {
        const on = isActive();
        if (loading)
            void loading.then((controller) => { controller.setActive(on); });
        if (!on)
            sheetHost.innerHTML = '';
    }).observe(experienceHost, { attributes: true, attributeFilter: ['data-pillar-active'] });
    window.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Element))
            return;
        if (target.closest('button[data-connections-open]')) {
            event.preventDefault();
            open(false);
        }
    });
    /* The browser's back and forward buttons are handled by the reading controller, which owns the history entries; it announces the destination and this answers. */
    document.addEventListener('kt-open-connections', () => { open(true); });
    /* A language change redraws the strip's labels; the controller redraws the screen. */
    document.addEventListener(LOCALE_CHANGED_EVENT, () => { if (isActive())
        renderNav(); });
    const style = document.createElement('style');
    style.dataset.connectionsExperience = 'true';
    style.textContent = connectionsCss();
    document.head.append(style);
}
