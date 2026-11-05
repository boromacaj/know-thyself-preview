import { LOCALE_CHANGED_EVENT } from './app/i18n/locale.js?v=53c0693';
import { PREMIUM_MENU_STAGE } from './app/premium-earth/premiumPillarScreens.js?v=53c0693';
import { ASTROLOGY_MENU_CSS } from './app/premium-earth/astrologyMenuStyle.js?v=53c0693';
import { NUMEROLOGY_MENU_CSS } from './app/premium-earth/numerologyMenuStyle.js?v=53c0693';
import { HUMAN_DESIGN_MENU_CSS } from './app/premium-earth/humanDesignMenuStyle.js?v=53c0693';
import { BAZI_MENU_CSS } from './app/premium-earth/baziMenuStyle.js?v=53c0693';
import { CONNECTIONS_HEART_CSS } from './app/premium-earth/connectionsHeartStyle.js?v=53c0693';
import { FORECAST_MENU_CSS } from './app/premium-earth/forecastMenuStyle.js?v=53c0693';
import { MENU_EDGE_LIGHT_CSS } from './app/premium-earth/menuEdgeLightStyle.js?v=53c0693';
import { SYNTHESIS_MENU_CSS } from './app/premium-earth/synthesisMenuStyle.js?v=53c0693';
import { SYNTHESIS_TRACE_CSS } from './app/premium-earth/synthesisTraceStyle.js?v=53c0693';
import { connectSynthesisTraces } from './app/premium-earth/synthesisTracePlacement.js?v=53c0693';
import { TAROT_MENU_CSS } from './app/premium-earth/tarotMenuStyle.js?v=53c0693';
import { connectForecastMenuCard } from './app/premium-earth/forecastMenuLifecycle.js?v=53c0693';
import { renderPremiumMenuView } from './app/premium-earth/premiumMenuScreen.js?v=53c0693';
import { retireProfileSurfaces, visibleProfileSurfaces } from './app/premium-earth/profileSurfaces.js?v=53c0693';
import { cardTargets, cardTransitionActive, clearCardOpacity, destinationFadeInMillis, destinationFadeOutMillis, runCardTransition, } from './onboardingCardTransition.js?v=53c0693';
/*
 * THE MAIN MENU - A DESTINATION OF THE APPLICATION, ON ITS OWN SURFACE.
 *
 * The same arrangement as the forecast and Tarot, and for the same reason: a
 * module of its own that adds a surface and a click handler and touches none of
 * the other controllers' internals. It is the first stop of the strip every
 * finished profile carries, so home is one tap from anywhere; the strip is
 * rendered by the same function as everywhere else.
 *
 * WHAT IS REUSED: the surface class (.kt-pillar-surface - the scroller, the
 * safe areas, the inert/hidden lifecycle), the card transition at the
 * destination pace, the unified glass material and the Lighting roles, and the
 * glyph system the readings draw their symbols from.
 *
 * WHAT IS NOT NEW: no navigation of its own. Every control on the menu carries
 * the attribute of the destination it opens (data-pillar-open,
 * data-synthesis-open, data-forecast-open, data-tarot-open) and the controller
 * that owns that destination answers it, fading this surface out because it is
 * whatever is visible. The menu's own stop carries data-menu-open, which this
 * module answers.
 *
 * THE MENU HAS NO STRIP. It is the navigation: showing the strip under it would
 * be two ways to choose the same thing on one screen.
 *
 * THE LANGUAGE IS THE APPLICATION'S. There is no language control here; the
 * screen is redrawn on the application's own locale event.
 *
 * THE DESIGN TARGET IS THE WHOLE PHONE SCREEN. The product is a standalone mobile
 * application and the browser is a wrapper it is previewed in. Nothing here is
 * sized to the height that is left between a browser's toolbars: the objects keep
 * the size they have on the full screen, and where a reduced viewport leaves less
 * room the surface - already a scroller - scrolls a little. On the full screen the
 * same composition simply has more air.
 *
 * ONE FINAL STATE (settle, below). Entering the menu is a card transition, and a
 * card transition is a chain of timers and frames that a backgrounded page, a
 * resize, a superseding transition or a restored session can leave half done. The
 * menu therefore never trusts its own entry to have finished: it settles into one
 * canonical state - visible, interactive, no inline opacity, no stale transform,
 * no sideways scroll offset, no other surface on screen - when the transition
 * ends, when it fails to end, and whenever the page comes back or is resized.
 */
const experienceHost = document.getElementById('place-experience');
const vesselStage = document.getElementById('vessel-stage');
if (experienceHost instanceof HTMLElement && vesselStage instanceof HTMLElement) {
    const surface = document.createElement('section');
    surface.id = 'menu-view';
    surface.className = 'kt-pillar-surface kt-menu-surface';
    surface.setAttribute('aria-live', 'off');
    surface.hidden = true;
    surface.inert = true;
    vesselStage.append(surface);
    /* The Forecast card's animation stops while it cannot be seen (a hidden tab, another destination, scrolled away). */
    connectForecastMenuCard(surface);
    /* The chip traces from the pillars' names to the Synthesis card's little pillars are placed from what the page measures, and again whenever it changes. */
    connectSynthesisTraces(surface);
    const render = () => { surface.innerHTML = renderPremiumMenuView(); };
    const menuIsActive = () => experienceHost.dataset.pillarActive === PREMIUM_MENU_STAGE;
    /* ----------------------------------------------------- the final state -- */
    /**
     * Put the menu into its one canonical state, if it is the destination on screen and nothing is still animating it.
     * Idempotent, and cheap: it reads no layout. It never starts or cancels a transition - a live transition owns the
     * state and settles it itself; this is what runs when there is none, or when the one there was never reported done.
     * `force` is the watchdog's last word, for a transition that still claims to be running long after it could have
     * finished (its frames were never delivered): the state is then put right regardless, and if the transition does
     * wake up later it only re-asserts the same final opacity.
     */
    const settle = (force = false) => {
        if (!menuIsActive() || (cardTransitionActive() && !force))
            return false;
        surface.hidden = false;
        surface.inert = false;
        /* The fade writes inline opacity (and will-change and transition) on the surface and on the layers it tiled; a
           fade that did not finish leaves a fraction there. Cleared on every one of them, marked or not. */
        clearCardOpacity([surface]);
        surface.style.removeProperty('opacity');
        surface.style.removeProperty('pointer-events');
        for (const stale of surface.querySelectorAll('[style]')) {
            for (const property of ['opacity', 'transform', 'translate', 'scale', 'rotate', 'will-change', 'transition']) {
                stale.style.removeProperty(property);
            }
            if (stale.getAttribute('style') === '')
                stale.removeAttribute('style');
        }
        /* The menu is composed with no transform of its own, so any on the surface or its wrapper is a leftover. */
        surface.style.removeProperty('transform');
        /* A sideways offset is how an object that sits past the edge stays half visible: the boxes clip, but they can still
           be scrolled, by focus or by a gesture that ended mid-way. The menu has no horizontal axis. */
        surface.scrollLeft = 0;
        vesselStage.scrollLeft = 0;
        experienceHost.scrollLeft = 0;
        if (document.scrollingElement)
            document.scrollingElement.scrollLeft = 0;
        /* Only the menu is on screen: a surface another path left visible beside it is stood down. */
        retireProfileSurfaces(vesselStage, [surface]);
        surface.dataset.menuState = 'settled';
        return true;
    };
    /* After any pause, so a resize burst or a page that comes back is answered once, when it has stopped. */
    let settleTimer = 0;
    const settleSoon = (delayMillis = 120) => {
        window.clearTimeout(settleTimer);
        settleTimer = window.setTimeout(() => { settle(); }, delayMillis);
    };
    /* The watchdog of one entry. A destination transition takes about half a second; the bounds are its two fades plus the
       margin its own fallback timers add. If it has not finished by then the state is forced to the final one, and while
       one is still running (a slower pace, a busy device) the check is asked again - a bounded number of times, because
       a transition that never ends must not keep this alive for ever. */
    const ENTRY_WATCHDOG_MILLIS = destinationFadeOutMillis + destinationFadeInMillis + 1_500;
    let watchdog = 0;
    const armWatchdog = (attemptsLeft = 6) => {
        window.clearTimeout(watchdog);
        watchdog = window.setTimeout(() => {
            if (!menuIsActive())
                return;
            if (settle())
                return;
            if (attemptsLeft > 0)
                armWatchdog(attemptsLeft - 1);
            else
                settle(true);
        }, attemptsLeft === 6 ? ENTRY_WATCHDOG_MILLIS : 500);
    };
    /* The menu is no longer the destination: it carries no state. */
    new MutationObserver(() => {
        if (!menuIsActive())
            delete surface.dataset.menuState;
    }).observe(experienceHost, { attributes: true, attributeFilter: ['data-pillar-active'] });
    /* Things that can interrupt an entry, or move the screen under a settled menu. */
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible')
        settleSoon(); });
    window.addEventListener('pageshow', () => { settleSoon(); });
    window.addEventListener('resize', () => { settleSoon(); }, { passive: true });
    window.addEventListener('orientationchange', () => { settleSoon(); }, { passive: true });
    window.visualViewport?.addEventListener('resize', () => { settleSoon(); }, { passive: true });
    /*
     * THE MENU IS THE POST-ONBOARDING HOME.
     *
     * It can therefore be entered from two places: from a finished module, or
     * directly from the final onboarding action. In the second case the profile
     * overview and the onboarding chrome are the outgoing card. They are retired
     * here, at opacity zero, so the menu never appears underneath or beside the
     * data-entry interface.
     */
    const onboardingChrome = () => ([
        vesselStage.querySelector('#profile-complete'),
        vesselStage.querySelector('.kt-prompt-layer'),
        vesselStage.querySelector('#vessel-orbit'),
        vesselStage.querySelector('.kt-earth-rim'),
    ].filter((element) => element instanceof HTMLElement));
    const retireOnboardingControls = () => {
        const flow = vesselStage.querySelector('.profile-flow');
        const dock = experienceHost.querySelector('#interaction-dock');
        if (flow)
            flow.inert = true;
        if (dock)
            dock.inert = true;
    };
    const open = () => {
        if (menuIsActive()) {
            settleSoon(0);
            return;
        }
        render();
        const leavingProfile = experienceHost.dataset.pillarStage === 'pillar';
        const onboarding = leavingProfile ? [] : onboardingChrome();
        const leaving = leavingProfile ? visibleProfileSurfaces(vesselStage) : onboarding;
        surface.dataset.menuState = 'entering';
        armWatchdog();
        void runCardTransition({
            pace: 'destination',
            /* Coming home is the largest scene change in the application, so it is the strongest disturbance the dust is given. */
            impulse: 'major',
            lock: () => {
                for (const element of onboarding)
                    element.inert = true;
                retireOnboardingControls();
                surface.inert = true;
            },
            outgoing: () => cardTargets(leaving),
            swap: () => {
                const overview = vesselStage.querySelector('#profile-complete');
                if (!leavingProfile && overview) {
                    overview.hidden = true;
                    overview.inert = true;
                }
                retireProfileSurfaces(vesselStage, [surface]);
                surface.hidden = false;
                surface.inert = false;
                surface.scrollTop = 0;
                experienceHost.dataset.pillarStage = 'pillar';
                experienceHost.dataset.pillarActive = PREMIUM_MENU_STAGE;
            },
            incoming: () => cardTargets([surface]),
            unlock: () => { surface.inert = false; },
        }).then(
        /* Finished, or superseded: either way, if the menu is what is on screen it is put into its final state. A
           superseding transition that is still running settles it itself, and settle() stands aside for it. */
        () => { settle(); }, () => { settle(); });
    };
    /* Leaving is not this module's job: every other destination is one of the menu's own controls or in the strip, and
       the controller that owns it retires this surface inside its own swap. */
    window.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Element))
            return;
        if (target.closest('button[data-menu-open]')) {
            event.preventDefault();
            open();
        }
    });
    /* The browser's back and forward buttons are handled by the reading controller, which owns the history entries.
       It cannot open this surface itself, so it announces the destination and this answers. */
    document.addEventListener('kt-open-menu', () => { open(); });
    /* A language change redraws the screen. */
    document.addEventListener(LOCALE_CHANGED_EVENT, () => {
        if (!menuIsActive())
            return;
        render();
    });
    const style = document.createElement('style');
    style.dataset.menuExperience = 'true';
    style.textContent = `
    /* THE TOP OF THE APP SHELL. The development pill (left) and the profile control (right) stand in the app bar at the
       top of the screen, under the safe area (--kt-app-bar-top, set with the other root tokens and used by those two
       controls themselves) - not in a row of this content. This screen's content begins under the bar.

       THE SURFACE IS THE SCROLLER, AND THE SCREEN IS ITS MINIMUM. It is as tall as the app screen (the stage is 100dvh)
       and the menu inside it is at least that tall, so a full-height phone has the composition with room to breathe and a
       reduced browser viewport has the same composition and a little scrolling. Nothing below is sized from the viewport's
       height. The content begins under the top controls. */
    #place-experience #menu-view {
      padding-top: calc(var(--kt-app-bar-top, 20px) + var(--kt-app-bar-height, 38px) + 14px);
      padding-right: var(--kt-app-gutter, 12px);
      padding-left: var(--kt-app-gutter, 12px);
      padding-bottom: calc(var(--safe-bottom, 0px) + 8px);
    }

    #place-experience .kt-menu {
      display: flex;
      flex-direction: column;
      gap: 26px;
      min-height: 100%;
      max-width: 560px;
      margin: 0 auto;
      color: rgba(244, 241, 233, 0.92);
    }
    #place-experience .kt-menu * { box-sizing: border-box; }

    /* Focus is shown in the accent the interface already uses. */
    #place-experience .kt-menu button:focus-visible {
      outline: 2px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.9);
      outline-offset: 2px;
    }

    /* ----------------------------------------------------------------- head
       The Main Menu has no visible header: the brand, "No die self" and the tagline are gone from this screen. The brand
       stays as the screen's heading for assistive technology - clipped out of sight, not removed - so the screen is
       still named. */
    #place-experience .kt-menu-brand {
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

    /* ----------------------------------------------------------------- core
       NOTHING ENCLOSES THE FOUR PILLARS. This is a wrapper for the screen's structure (a region for assistive
       technology) with no surface: no fill, no hairline, no ring. The objects in it float on their own over the Earth. */
    #place-experience .kt-menu-core {
      display: flex;
      flex: none;
      flex-direction: column;
      min-height: 0;
      padding: 0;
      border: 0;
      background: none;
    }

    #place-experience .kt-menu-pillars,
    #place-experience .kt-menu-bridge {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 8px;
    }

    /* Floating glass objects: each its own card, with the space between them left open so the Earth shows through. Their
       height follows their WIDTH (a tall, slender card, about 1 : 3.9), never the screen's height, so a reduced browser
       viewport cannot squash them: it scrolls instead.

       THE PLAIN SHAPE: a tall rounded rectangle, the same 14px radius on all four corners. Nothing is added to the card (no
       cap, no shoulder, no pointed or tapered foot, no extra layer): the shape is its own border-radius. */
    #place-experience .kt-menu-pillar {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: stretch;
      justify-content: center;
      gap: 3px;
      min-width: 0;
      aspect-ratio: 1 / 3.9;
      margin: 0;
      padding: 12px 3px;
      font: inherit;
      color: rgba(244, 241, 233, 0.9);
      border: 1px solid rgba(var(--kt-surface-border-rgb, var(--kt-accent-soft-rgb, 255, 255, 255)), 0.26);
      border-radius: 14px;
      cursor: pointer;
      /* Lifted off the Earth: a soft shadow under it, a hairline of light inside it. */
      box-shadow:
        0 14px 30px -10px rgba(0, 0, 0, 0.62),
        0 0 0 1px rgba(255, 255, 255, 0.035) inset;
      -webkit-tap-highlight-color: transparent;
      transition: border-color 180ms ease-in-out, transform 120ms ease-out;
    }
    #place-experience .kt-menu-pillar:active { transform: translateY(1px); }

    /* The symbols spread down the taller card; the thread beside them is the line between the art and the name. */
    #place-experience .kt-menu-art {
      position: relative;
      z-index: 1;
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      gap: 2px;
      min-width: 0;
      min-height: 0;
      color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.92);
    }

    /* The short name stands UNDER the card, outside it, as the lower three cards' names do - the same type, size, spacing and halo (and, with a colour chosen, the
       same glow: menuEdgeLightStyle.ts). It is inside the button, so a tap on it opens the pillar. */
    #place-experience .kt-menu-label {
      position: absolute;
      top: calc(100% + 7px);
      right: 0;
      left: 0;
      z-index: 2;
      font-size: 10.5px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      text-align: center;
      white-space: nowrap;
      color: rgba(250, 249, 245, 0.9);
      text-shadow: 0 0 6px rgba(6, 8, 12, 0.9), 0 0 2px rgba(6, 8, 12, 0.9);
    }

    /* ---- the art: the glyph system's own marks, in its own stroke ---- */
    #place-experience .kt-menu-art .kt-glyph { display: block; width: 100%; height: 100%; }

    /* --------------------------------------------------------------- bridge
       Under each pillar its short name, and from the name a chip-style trace down to one of the four little pillars in the synthesis, with pulses of light running along it
       (synthesisTraceStyle.ts has the traces' light and the bridge's height). The structure says what the reading says. */
    #place-experience .kt-menu-bridge { flex: none; }
    /* ------------------------------------------------------------ synthesis
       ONE floating object, the width of the four above it - a rounded rectangle, not a pill: the panel radius, with the
       accent of the strip's active capsule (no new colour, no new radius). Frosted like the cards above it, and lifted
       off the Earth the same way. No arrow: the whole object is the button. */
    #place-experience .kt-menu-synthesis {
      position: relative;
      display: flex;
      flex: none;
      align-items: center;
      justify-content: center;
      gap: 14px;
      min-height: 84px;
      margin: 0;
      padding: 0 22px;
      font: inherit;
      font-size: 12px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(255, 253, 248, 1);
      border: 1px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.62);
      border-radius: 22px;
      background-image: linear-gradient(rgba(var(--kt-accent-rgb, 216, 195, 142), 0.14), rgba(var(--kt-accent-rgb, 216, 195, 142), 0.14));
      box-shadow:
        0 20px 38px -12px rgba(0, 0, 0, 0.7),
        0 0 0 1px rgba(255, 255, 255, 0.05) inset,
        0 0 12px rgba(var(--kt-accent-soft-rgb, 255, 255, 255), 0.18),
        0 0 30px rgba(var(--kt-accent-rgb, 255, 255, 255), 0.14);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: border-color 180ms ease-in-out, transform 120ms ease-out;
    }
    #place-experience .kt-menu-synthesis:active { transform: translateY(1px); }
    #place-experience .kt-menu-synthesis-label { text-align: center; }
    /* ---------------------------------------------------------------- tiles
       Three, one row, one width, one height - and a downward triangle: the outer two sit high and the middle one sits
       lower, so the row points at the middle. Only the vertical position differs; nothing else about the tiles does.
       Their fill and blur come from the unified glass material.
       TAROT-CARD PROPORTION. A real tarot card is about 70 x 120 mm - 7 : 12 - taller than a playing card (2 : 3), and
       that is what the three tiles are. The width is a third of the row, and the height follows the width: the tiles are
       NOT sized from the viewport's height. A phone whose browser chrome is showing has less room, and the surface scrolls.
       THE FOOT OF THE GROUP STAYS 38px ABOVE THE SCREEN'S EDGE, whatever the device's safe area: the names of the outer
       two cards stand under them, and the Google Maps attribution (which must stay visible, and is fixed to the foot of
       the screen, about 13px up and 20px tall) is where the left one would land. The surface already pads its foot by
       the safe area plus 8px; this margin tops that up to 38px (max(safe + 8, 38)). */
    #place-experience .kt-menu-tiles {
      display: grid;
      flex: none;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      align-items: start;
      gap: 8px;
      margin-top: auto;
      margin-bottom: max(0px, calc(30px - var(--safe-bottom, 0px)));
    }
    #place-experience .kt-menu-tile:nth-child(2) { margin-top: 22px; }
    #place-experience .kt-menu-tile {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      aspect-ratio: 7 / 12;
      container-type: inline-size;
      min-width: 0;
      margin: 0;
      padding: 12px 4px 10px;
      font: inherit;
      color: rgba(250, 249, 245, 0.9);
      border: 1px solid var(--kt-surface-line, rgba(255, 255, 255, 0.1));
      border-radius: 18px;
      cursor: pointer;
      box-shadow: 0 14px 30px -10px rgba(0, 0, 0, 0.55);
      -webkit-tap-highlight-color: transparent;
      transition: border-color 180ms ease-in-out, transform 120ms ease-out;
    }
    #place-experience .kt-menu-tile:not(:disabled):active { transform: translateY(1px); }
    #place-experience .kt-menu-tile[data-menu-item="tarot"] .kt-menu-tile-label {
      position: relative;
      z-index: 2;
    }
    /* WHERE THE NAMES STAND - the three tiles close into one frame: the left name is below its card, the middle name is
       ABOVE its (lowered) card, the right name is below its card. Every name stands just outside its card - still inside
       the button, so a name is part of the same tap target, and not clipped, because the tile no longer clips its own
       contents (the art layer rounds itself). The middle card is 22px lower than the outer two: that is exactly the
       name (about 14px) and its 7px gap, so the middle name's top stands level with the outer cards' tops, and the outer
       names' foot stands level with the middle card's foot - the row reads as one rectangle. */
    #place-experience .kt-menu-tile[data-menu-item="tarot"] .kt-menu-tile-label,
    #place-experience .kt-menu-tile[data-menu-item="forecast"] .kt-menu-tile-label {
      position: absolute;
      top: calc(100% + 7px);
      right: 0;
      left: 0;
      z-index: 2;
      /* A name outside its card can fall on something bright (the Earth, on a wide screen): a soft dark halo keeps it
         legible. The same halo on all three names. */
      text-shadow: 0 0 6px rgba(6, 8, 12, 0.9), 0 0 2px rgba(6, 8, 12, 0.9);
    }
    /* The middle card: its name stands just ABOVE it. */
    #place-experience .kt-menu-tile[data-menu-item="connections"] .kt-menu-tile-label {
      position: absolute;
      bottom: calc(100% + 7px);
      right: 0;
      left: 0;
      z-index: 2;
      text-shadow: 0 0 6px rgba(6, 8, 12, 0.9), 0 0 2px rgba(6, 8, 12, 0.9);
    }

    #place-experience .kt-menu-tile-art {
      position: relative;
      z-index: 1;
      display: flex;
      flex: 1 1 auto;
      align-items: center;
      justify-content: center;
      color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.92);
    }
    #place-experience .kt-menu-tile-glyph { display: block; width: 40px; height: 40px; }
    ${CONNECTIONS_HEART_CSS}
    ${FORECAST_MENU_CSS}
    ${TAROT_MENU_CSS}
    ${SYNTHESIS_MENU_CSS}
    ${ASTROLOGY_MENU_CSS}
    ${NUMEROLOGY_MENU_CSS}
    ${HUMAN_DESIGN_MENU_CSS}
    ${BAZI_MENU_CSS}
    ${SYNTHESIS_TRACE_CSS}
    ${MENU_EDGE_LIGHT_CSS}
    #place-experience .kt-menu-tile-label {
      font-size: 10.5px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      text-align: center;
      white-space: nowrap;
    }
    /* The longest name - CONNECTIONS - has to fit the card's width whole: a word is never broken across two lines. The
       label steps down with the card's own width. */
    @container (max-width: 94px) {
      #place-experience .kt-menu-tile-label { font-size: 9px; letter-spacing: 0.08em; }
    }
    @container (max-width: 79px) {
      #place-experience .kt-menu-tile-label { font-size: 8px; letter-spacing: 0.06em; }
    }
    /* A tile with nothing to open says so, at the same size as the others. */
    #place-experience .kt-menu-tile:disabled { cursor: default; }
    /* "Coming soon" is no longer on the screen. It stays in the button for assistive technology - the card is disabled,
       and a screen reader should say why - so it is clipped out of sight rather than removed. */
    #place-experience .kt-menu-soon {
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

    @media (prefers-reduced-motion: reduce) {
      #place-experience .kt-menu-pillar,
      #place-experience .kt-menu-synthesis,
      #place-experience .kt-menu-tile { transition: none; }
      #place-experience .kt-menu-pillar:active,
      #place-experience .kt-menu-synthesis:active,
      #place-experience .kt-menu-tile:not(:disabled):active { transform: none; }
    }
  `;
    document.head.append(style);
}
