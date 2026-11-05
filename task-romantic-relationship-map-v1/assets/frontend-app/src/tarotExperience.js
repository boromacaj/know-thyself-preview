import { LOCALE_CHANGED_EVENT } from './app/i18n/locale.js';
import { renderPremiumPillarNav, PREMIUM_TAROT_STAGE } from './app/premium-earth/premiumPillarScreens.js';
import { centreActiveStop, retireProfileSurfaces, visibleProfileSurfaces, } from './app/premium-earth/profileSurfaces.js';
import { readPremiumResult } from './app/premium-earth/premiumResultStore.js';
import { systemTarotClock } from './app/tarot/tarotClock.js';
import { mountTarotExperience } from './app/tarot/ui/tarotExperienceController.js';
import { cardTargets, runCardTransition } from './onboardingCardTransition.js';
import { tarotHeroCss } from './app/tarot/ui/tarotHero.js';
import { tarotGuidedCss } from './app/tarot/ui/tarotGuidedCss.js';
import { mountTarotHeroPlacement } from './tarotHeroPlacement.js';
/*
 * TAROT - A DESTINATION OF THE APPLICATION, ON ITS OWN SURFACE.
 *
 * It is the same arrangement as the forecast, and for the same reason: a module of
 * its own that adds a surface and a click handler and touches none of the other
 * controllers' internals. The Earth, the keyboard architecture and the readings are
 * untouched. Tarot is the seventh capsule of the strip every finished profile
 * carries; the strip is rendered by the same function as everywhere else, so it is
 * one strip that never moves and only the highlight changes.
 *
 * WHAT IS REUSED: the surface class (.kt-pillar-surface - the scroller, the safe
 * areas, the inert/hidden lifecycle), the strip container (.kt-pillar-nav), the card
 * transition at the destination pace, the glass material and the Lighting roles.
 * WHAT IS NOT NEW: no navigation of its own - a capsule carries data-tarot-open, the
 * reading controller records the destination and this module opens the surface.
 *
 * THE DRAW IS THE ENGINE'S AND IS NOT TOUCHED HERE. This module mounts the Tarot
 * controller on the surface and tells it which element scrolls. It does not read the
 * profile: a Tarot draw is the reader's, not a chart's. Opening the destination is
 * what mounts the controller, so today's deck is committed when somebody opens Tarot
 * and not when the application loads.
 *
 * THE HERO FLOW. Tarot opens on the planet, a deck and one line; a shake (or a tap on the deck) mixes the deck and the three cards dealt
 * from it ride the Earth's limb (app/tarot/ui/tarotHero.ts, tarotHeroPlacement.ts). The numbered-strip picker it replaces is not deleted:
 * ?tarotFlow=pick brings it back, for comparison and as the way back.
 *
 * THE LANGUAGE IS THE APPLICATION'S. There is no language control on this screen.
 * The controller redraws on the application's own locale event, and the strip's
 * labels are re-rendered here.
 */
const experienceHost = document.getElementById('place-experience');
const vesselStage = document.getElementById('vessel-stage');
if (experienceHost instanceof HTMLElement && vesselStage instanceof HTMLElement) {
    const surface = document.createElement('section');
    surface.id = 'tarot-view';
    surface.className = 'kt-pillar-surface kt-tarot-surface';
    surface.hidden = true;
    surface.inert = true;
    const mount = document.createElement('div');
    mount.id = 'tarot-root';
    surface.append(mount);
    /* The card dialog lives in a host of its own at the root of the application: the screen is a stacking order of its own,
       under the strip and the profile controls, and a dialog inside it would have them on top of it. */
    const detailHost = document.createElement('div');
    detailHost.id = 'tarot-detail';
    experienceHost.append(detailHost);
    /* The strip hangs outside the scroller, as the forecast's does: it is a sibling of the surface so that it holds
       still while the screen scrolls, in the same container the readings use. */
    const tarotNav = document.createElement('nav');
    tarotNav.id = 'tarot-nav';
    tarotNav.className = 'kt-pillar-nav';
    tarotNav.hidden = true;
    tarotNav.inert = true;
    vesselStage.append(surface, tarotNav);
    /* The numbered-strip picker is the way back (?tarotFlow=pick): the hero flow is what Tarot is. */
    const heroFlow = new URLSearchParams(window.location.search).get('tarotFlow') !== 'pick';
    if (heroFlow)
        mountTarotHeroPlacement({ experience: experienceHost, stage: vesselStage, surface, mount });
    let controller = null;
    /* The local day the mounted draw belongs to. A screen left open past midnight is a new day's draw. */
    let mountedDay = null;
    const todayLocal = () => systemTarotClock.localDate(systemTarotClock.now());
    const ensureMounted = () => {
        const day = todayLocal();
        if (controller !== null && mountedDay === day)
            return;
        controller?.destroy();
        controller = mountTarotExperience({ mount, scrollHost: surface, overlayMount: detailHost, hero: heroFlow });
        controller.setActive(experienceHost.dataset.pillarActive === PREMIUM_TAROT_STAGE);
        mountedDay = day;
    };
    const renderNav = () => {
        const { experience } = readPremiumResult();
        tarotNav.innerHTML = experience ? renderPremiumPillarNav(experience, PREMIUM_TAROT_STAGE) : '';
        centreActiveStop(tarotNav);
    };
    /*
     * OPENING RUNS THE SHARED TRANSITION, AT THE DESTINATION PACE, and fades out whatever is on screen. It does not
     * retire the onboarding: every route in is from a reading surface, which has already done so (see the note on
     * the forecast's open()).
     */
    const open = (fromGesture = false) => {
        if (experienceHost.dataset.pillarActive === PREMIUM_TAROT_STAGE)
            return;
        ensureMounted();
        /* The tap that opened Tarot is the one moment a phone that asks before it reports its motion (iOS) will take the question. */
        if (fromGesture)
            controller?.armFromGesture();
        renderNav();
        const leaving = visibleProfileSurfaces(vesselStage);
        void runCardTransition({
            pace: 'destination',
            lock: () => { surface.inert = true; tarotNav.inert = true; },
            outgoing: () => cardTargets(leaving),
            swap: () => {
                retireProfileSurfaces(vesselStage, [surface, tarotNav]);
                surface.hidden = false;
                surface.inert = false;
                tarotNav.hidden = false;
                tarotNav.inert = false;
                surface.scrollTop = 0;
                experienceHost.dataset.pillarStage = 'pillar';
                experienceHost.dataset.pillarActive = PREMIUM_TAROT_STAGE;
                /* The strip was rendered while hidden, which has no geometry to centre against. */
                centreActiveStop(tarotNav);
            },
            incoming: () => cardTargets([surface, tarotNav]),
            unlock: () => { surface.inert = false; tarotNav.inert = false; },
        });
    };
    /* Leaving is not this module's job: the other destinations are in the strip and the controllers that own them
       retire this surface inside their own swap. */
    window.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Element))
            return;
        if (target.closest('button[data-tarot-open]')) {
            event.preventDefault();
            open(true);
        }
    });
    /* The browser's back and forward buttons are handled by the reading controller, which owns the history entries.
       It cannot open this surface itself, so it announces the destination and this answers. */
    document.addEventListener('kt-open-tarot', () => { open(); });
    /* Shake-to-shuffle listens to the phone only while Tarot is the destination on show: the screen is told when another one
       takes over, and lets go of the sensor. */
    new MutationObserver(() => {
        controller?.setActive(experienceHost.dataset.pillarActive === PREMIUM_TAROT_STAGE);
    }).observe(experienceHost, { attributes: true, attributeFilter: ['data-pillar-active'] });
    /* THE HERO'S EARTH. While the hero flow is the destination on show the planet is composed for it - higher, a little larger - by one
       attribute that ambientEarthSession.ts reads when it frames the globe. The glow ring, the ripples and the Moon follow the disc the globe
       publishes, so they move with it. Nothing else of the application reads it. */
    const composeEarth = () => {
        const on = heroFlow && experienceHost.dataset.pillarStage === 'pillar' && experienceHost.dataset.pillarActive === PREMIUM_TAROT_STAGE;
        if (on) {
            if (experienceHost.dataset.earthComposition !== 'tarot-hero')
                experienceHost.dataset.earthComposition = 'tarot-hero';
        }
        else if (experienceHost.dataset.earthComposition === 'tarot-hero')
            delete experienceHost.dataset.earthComposition;
    };
    new MutationObserver(composeEarth).observe(experienceHost, { attributes: true, attributeFilter: ['data-pillar-active', 'data-pillar-stage'] });
    composeEarth();
    /* A language change redraws the strip's labels; the screen redraws itself. */
    document.addEventListener(LOCALE_CHANGED_EVENT, () => {
        if (experienceHost.dataset.pillarActive !== PREMIUM_TAROT_STAGE)
            return;
        renderNav();
    });
    const style = document.createElement('style');
    style.dataset.tarotExperience = 'true';
    style.textContent = `
    /* The last of the screen would otherwise sit under the strip. The readings reserve exactly this much. */
    #place-experience #tarot-view {
      padding-bottom: calc(var(--kt-pillar-nav-height, 46px) + 34px + var(--safe-bottom, 0px));
    }

    #place-experience .kt-tarot-surface .tx {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 640px;
      margin: 0 auto;
      /* Clear of the profile control that floats over the top-right corner of every destination. */
      padding: 40px 0 0;
      color: rgba(244, 241, 233, 0.92);
    }
    #place-experience .kt-tarot-surface .tx * { box-sizing: border-box; }

    /* Focus is shown in the accent the interface already uses. */
    #place-experience .kt-tarot-surface .tx button:focus-visible,
    #place-experience .kt-tarot-surface .tx summary:focus-visible {
      outline: 2px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.9);
      outline-offset: 2px;
    }

    /* ---------------------------------------------------------------- panels
       One panel, copied from the forecast's block: the radius, the hairline and
       the padding. Its fill and its blur come from the unified glass material
       (glassSurfaceUnification), and its edge from the Surface Border role, because
       it is on both lists. */
    #place-experience .tx-panel {
      border-radius: 18px;
      border: 1px solid var(--kt-surface-line, rgba(255, 255, 255, 0.1));
      background: rgba(var(--kt-surface-fill-rgb, 10, 12, 16), 0.42);
      backdrop-filter: blur(18px) saturate(1.08);
      -webkit-backdrop-filter: blur(18px) saturate(1.08);
      padding: 16px 15px;
    }
    #place-experience .tx-visually-hidden {
      position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
      overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0;
    }

    /* -------------------------------------------------------------- headings */
    #place-experience .tx h1 {
      margin: 0;
      font-family: Georgia, 'Times New Roman', serif;
      font-weight: 400;
      font-size: clamp(26px, 7.4vw, 34px);
    }
    #place-experience .tx h2 {
      margin: 0 0 8px;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(var(--kt-secondary-accent-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.86);
    }
    #place-experience .tx h3 {
      margin: 0 0 6px;
      font-family: Georgia, 'Times New Roman', serif;
      font-weight: 400;
      font-size: 19px;
    }

    /* ---------------------------------------------------------------- buttons
       The capsule the strip and the portrait use: 999px, 11px, uppercase, the
       surface hairline. The primary one is the strip's active capsule - more of
       the accent, no new colour and no new shape. */
    #place-experience .tx-button {
      display: inline-flex; align-items: center; justify-content: center;
      min-height: 46px;
      padding: 0 20px;
      font: inherit;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(250, 249, 245, 0.86);
      border: 1px solid rgba(var(--kt-surface-border-rgb, var(--kt-accent-soft-rgb, 255, 255, 255)), 0.42);
      border-radius: 999px;
      cursor: pointer;
      transition: border-color 180ms ease-in-out, transform 120ms ease-out;
    }
    #place-experience .tx-button:active { transform: translateY(1px); }
    /* Shake to shuffle: the same capsule as every control here, lit when on. */
    #place-experience .tx-shake { margin-top: 12px; display: flex; flex-direction: column; align-items: center; gap: 6px; }
    #place-experience .tx-shake-toggle { min-height: 44px; }
    #place-experience .tx-shake-toggle.is-on {
      border-color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.8);
      box-shadow: 0 0 14px rgba(var(--kt-accent-rgb, 216, 195, 142), 0.22);
    }
    /* The hint and the notice say what the capsule and the shuffle already show; they stay in the page for a screen reader and are not drawn. */
    #place-experience .tx-shake-hint, #place-experience .tx-shake-notice {
      position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
      overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0;
    }
    #place-experience .tx-button.tx-primary {
      color: rgba(255, 253, 248, 1);
      border-color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.72);
      background-image: linear-gradient(rgba(var(--kt-accent-rgb, 216, 195, 142), 0.16), rgba(var(--kt-accent-rgb, 216, 195, 142), 0.16));
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.05) inset,
        0 0 12px rgba(var(--kt-accent-soft-rgb, 255, 255, 255), 0.2),
        0 0 30px rgba(var(--kt-accent-rgb, 255, 255, 255), 0.16);
    }
    #place-experience .tx-actions { display: flex; flex-wrap: wrap; gap: 10px; }

    /* ----------------------------------------------------------------- intro */
    #place-experience .tx-intro {
      display: flex; flex-direction: column; align-items: center; text-align: center;
      padding: 26px 18px 24px;
    }
    #place-experience .tx-intro .tx-stack { margin-bottom: 22px; }
    #place-experience .tx-intro .tx-shake { margin-top: 0; }
    #place-experience .tx-intro .tx-primary { margin-top: 16px; min-width: 200px; }
    #place-experience .tx-note {
      margin: 14px 0 0; max-width: 36ch; font-size: 12.5px; line-height: 1.5; color: rgba(244, 241, 233, 0.58);
    }
    #place-experience .tx-stack { position: relative; width: 150px; height: 214px; margin-top: 6px; }
    #place-experience .tx-stack .tx-card { position: absolute; width: 130px; top: 0; left: 10px; }
    #place-experience .tx-stack-1 { transform: rotate(-9deg) translateX(-14px); }
    #place-experience .tx-stack-2 { transform: rotate(0deg); }
    #place-experience .tx-stack-3 { transform: rotate(9deg) translateX(14px); }

    /* ----------------------------------------------------------------- cards
       A placeholder treatment on the interface's own colours: no deck art exists
       yet. The back is concentric, so it is the same after a half turn and can
       never show which cards are reversed. */
    #place-experience .tx-card { display: block; aspect-ratio: 5 / 8; border-radius: 12px; }
    #place-experience .tx-back {
      position: relative;
      background-color: rgba(10, 12, 16, 0.78);
      background-image:
        radial-gradient(circle at 50% 50%, rgba(var(--kt-accent-rgb, 216, 195, 142), 0.2) 0 13%, transparent 14%),
        repeating-radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.025) 0 7px, rgba(255, 255, 255, 0.07) 7px 14px);
      border: 1px solid rgba(var(--kt-surface-border-rgb, var(--kt-accent-soft-rgb, 255, 255, 255)), 0.4);
      box-shadow:
        0 0 0 4px rgba(6, 8, 10, 0.7) inset,
        0 0 0 5px rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.14) inset,
        0 0 18px rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.1);
    }
    #place-experience .tx-back-ring {
      position: absolute; inset: 50% auto auto 50%; width: 38%; aspect-ratio: 1; transform: translate(-50%, -50%);
      border-radius: 50%; border: 1px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.5);
    }
    #place-experience .tx-face {
      margin: 0; padding: 8px 6px; display: flex; flex-direction: column; align-items: center; text-align: center;
      background-color: rgba(10, 12, 16, 0.82);
      border: 1px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.5);
      box-shadow:
        0 0 0 3px rgba(6, 8, 10, 0.7) inset,
        0 0 16px rgba(var(--kt-accent-rgb, 216, 195, 142), 0.14);
      color: rgba(250, 249, 245, 0.94);
    }
    #place-experience .tx-face-role { font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(244, 241, 233, 0.62); }
    #place-experience .tx-emblem {
      width: 56%; max-width: 70px; margin: 8px 0 2px;
      stroke: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.95); stroke-width: 2; fill: none; stroke-linecap: round; stroke-linejoin: round;
    }
    #place-experience .tx-face[data-orientation='reversed'] .tx-emblem { transform: rotate(180deg); }
    #place-experience .tx-face-mark { font-size: 13px; color: rgba(244, 241, 233, 0.7); min-height: 1.2em; letter-spacing: 0.06em; }
    #place-experience .tx-face-title {
      font-family: Georgia, 'Times New Roman', serif; font-size: 12.5px; line-height: 1.25; margin-top: auto; padding: 4px 0 2px; overflow-wrap: anywhere;
    }
    #place-experience .tx-face-state { font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(244, 241, 233, 0.62); }
    #place-experience .tx-face-state.is-reversed { color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.98); }

    @keyframes tx-turn {
      0% { transform: perspective(600px) rotateY(88deg); opacity: 0.2; }
      100% { transform: perspective(600px) rotateY(0); opacity: 1; }
    }
    #place-experience .tx-face.is-fresh { animation: tx-turn 0.55s ease-out both; }

    /* ------------------------------------------------------------------ draw */
    #place-experience .tx-main { display: flex; flex-direction: column; gap: 16px; }
    /* The place the chosen card turns over in must stay clear of the profile controls at the top of the screen. */
    #place-experience .tx-spread {
      scroll-margin-top: calc(var(--kt-top-space, 46px) + 6px);
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
    }
    #place-experience .tx-place { aspect-ratio: 5 / 8; }
    #place-experience .tx-place:not(.is-filled) {
      display: flex; align-items: center; justify-content: center; text-align: center; padding: 6px;
      border: 1px dashed rgba(var(--kt-surface-border-rgb, var(--kt-accent-soft-rgb, 255, 255, 255)), 0.34);
      border-radius: 12px;
      background: rgba(var(--kt-surface-fill-rgb, 10, 12, 16), 0.3);
      color: rgba(244, 241, 233, 0.6);
    }
    #place-experience .tx-place.is-current {
      border-style: solid;
      border-color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.72);
      color: rgba(255, 253, 248, 1);
    }
    #place-experience .tx-place-label { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; }
    #place-experience .tx-place .tx-card { width: 100%; height: 100%; }

    #place-experience .tx-prompt {
      margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 19px; line-height: 1.35;
    }
    #place-experience .tx-hint { margin: 0 0 12px; font-size: 13px; line-height: 1.5; color: rgba(244, 241, 233, 0.66); }
    #place-experience .tx-diagnostic, #place-experience .tx-error {
      margin: 0; font-size: 13.5px; line-height: 1.5; color: rgba(244, 241, 233, 0.8);
    }

    /* ---------------------------------------------------------------- picker
       ONE DECK SPREAD OUT FROM ONE SIDE. The 78 backs are one ordered run: each begins --tx-advance after the one before it
       and lies over it, every one the same size, so what shows of a card is a narrow strip of its left edge and its number.
       There is no centre and no mirror: nothing is sized or shaded around the card in focus. The strip is padded so the
       place at --tx-focus (a fixed place: the middle of the strip, neutral for either thumb) is the one in focus; the card there is only pulled up and left out of
       the spread, still under the cards that lie over it. The strip scrolls freely with the browser's own touch momentum
       (no snap points: one flick crosses many places); a script settles the nearest place onto the focus point once it
       stops. The number is the place in the shuffled deck. */
    #place-experience .tx-picker {
      --tx-card-w: 160px; --tx-card-h: 256px; --tx-advance: 22px; --tx-focus: 50%;
      display: flex; flex-direction: column; align-items: stretch; gap: 10px;
    }
    #place-experience .tx-deck {
      list-style: none; margin: 0;
      padding: 72px max(calc(100% - var(--tx-focus) - var(--tx-advance) / 2), calc(var(--tx-card-w) - var(--tx-advance))) 14px calc(var(--tx-focus) - var(--tx-advance) / 2);
      display: flex; gap: 0; overflow-x: auto; overflow-y: hidden;
      overscroll-behavior-x: contain; scrollbar-width: none; -webkit-overflow-scrolling: touch;
    }
    #place-experience .tx-deck::-webkit-scrollbar { display: none; }
    /* A place takes the advance, not the card: the card is laid over the places after it. Later places are painted over earlier ones. */
    #place-experience .tx-deck li { flex: 0 0 var(--tx-advance); width: var(--tx-advance); height: var(--tx-card-h); min-width: 0; position: relative; }
    #place-experience .tx-slot {
      position: absolute; left: 0; top: 0; display: block; width: var(--tx-card-w); height: 100%; padding: 0; border-radius: 12px; cursor: pointer;
      font: inherit; color: rgba(244, 241, 233, 0.8); -webkit-tap-highlight-color: transparent;
      background-color: #0a0c10;
      transform: translate(0, 0);
      transition: transform 0.12s ease-out, box-shadow 0.12s ease-out, border-color 0.12s ease-out;
      box-shadow:
        0 0 0 3px rgba(6, 8, 10, 0.7) inset,
        0 0 0 4px rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.14) inset,
        -7px 0 10px rgba(0, 0, 0, 0.55);
    }
    /* The card in focus: pulled out of the spread up and to the left (the same distance each way), brighter. The cards after it still lie over
       its right part; the deck itself does not move, so what stands clear - the top 50px and the left 50px - is the card, and the target to tap. */
    #place-experience .tx-deck li.is-focus .tx-slot:not(:disabled) {
      transform: translate(-50px, -50px) scale(1.03);
      border-color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.95);
      outline: 2px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.95); outline-offset: -1px;
      box-shadow:
        0 0 0 3px rgba(6, 8, 10, 0.7) inset,
        0 0 0 4px rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.14) inset,
        -7px 0 10px rgba(0, 0, 0, 0.55),
        0 0 26px rgba(var(--kt-accent-rgb, 216, 195, 142), 0.5);
    }
    #place-experience .tx-deck li.is-focus .tx-slot:disabled { transform: translate(-4px, -20px); }
    /* Choosing: the card is pulled a little further out again (up and left), then the draw goes on. */
    #place-experience .tx-deck li.is-picking .tx-slot:not(:disabled) { transition: transform 0.16s ease-out; transform: translate(-62px, -64px) scale(1.03); }
    #place-experience .tx-slot-ring {
      position: absolute; left: 50%; top: 42%; width: 50%; aspect-ratio: 1; transform: translate(-50%, -50%); border-radius: 50%;
      border: 1px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.55);
      box-shadow: 0 0 0 5px rgba(6, 8, 10, 0.5) inset, 0 0 0 6px rgba(var(--kt-accent-rgb, 216, 195, 142), 0.1);
    }
    /* What shows of a card in the spread is its left edge: the number is printed at the top of it, so the numbers run along the upper
       edge of the spread. The card in focus is pulled out above the pack, and its number stands in that raised top, larger and white. */
    #place-experience .tx-slot-number {
      position: absolute; left: 0; top: 12px; width: calc(var(--tx-advance) - 5px); text-align: center;
      font-size: 14px; font-weight: 700; line-height: 1; font-variant-numeric: tabular-nums; letter-spacing: 0;
      color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.95);
    }
    #place-experience .tx-deck li.is-focus .tx-slot-number {
      left: 9px; top: 13px; width: auto; text-align: left; font-size: 22px; color: rgba(255, 253, 248, 1);
      text-shadow: 0 0 8px rgba(var(--kt-accent-rgb, 216, 195, 142), 0.9), 0 1px 2px rgba(0, 0, 0, 0.8);
    }
    #place-experience .tx-slot:not(:disabled):active { filter: brightness(1.25); }
    #place-experience .tx-slot.is-chosen { filter: brightness(0.55) saturate(0.5); cursor: default; }
    #place-experience .tx-slot.is-chosen .tx-slot-ring { filter: brightness(0.7); }
    #place-experience .tx-slot-role { display: none; }
    #place-experience .tx-slot.is-unavailable { filter: brightness(0.4); cursor: not-allowed; }
    #place-experience .tx-pick { align-self: center; min-width: 220px; }
    #place-experience .tx-pick:disabled { opacity: 0.55; cursor: default; }
    @media (min-width: 560px) {
      #place-experience .tx-picker { --tx-card-w: 190px; --tx-card-h: 304px; --tx-advance: 26px; --tx-focus: 50%; }
      #place-experience .tx-spread { max-width: 520px; width: 100%; margin-inline: auto; }
    }
    @media (prefers-reduced-motion: reduce) {
      #place-experience .tx-slot, #place-experience .tx-deck li.is-picking .tx-slot:not(:disabled) { transition: none; }
    }

    /* ---------------------------------------------------------------- jumper */
    #place-experience .tx-jumper { text-align: center; }
    #place-experience .tx-jumper .tx-actions { justify-content: center; }
    #place-experience .tx-jumper-card { width: 76px; margin: 0 auto 12px; }
    #place-experience .tx-jumper p { margin: 0 0 12px; font-size: 14px; line-height: 1.5; color: rgba(244, 241, 233, 0.82); }
    #place-experience .tx-jumper.is-resolved .tx-face { width: 110px; height: 176px; margin: 10px auto 0; }
    #place-experience .tx-jumper-state { margin: 0; font-size: 13.5px; color: rgba(244, 241, 233, 0.72); }
    #place-experience .tx-main > .tx-jumper-state { padding: 0 4px; }

    /* ---------------------------------------------------------------- reading */
    #place-experience .tx-reading { display: flex; flex-direction: column; gap: 14px; }
    #place-experience .tx-reading > h2 { margin: 6px 0 0; }
    #place-experience .tx-short p { margin: 0; font-size: 15.5px; line-height: 1.6; }
    #place-experience .tx-full { padding: 0; }
    #place-experience .tx-full summary {
      min-height: 48px; padding: 14px 16px; cursor: pointer; list-style-position: inside;
      font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(250, 249, 245, 0.86);
    }
    #place-experience .tx-meaning { padding: 4px 16px 14px; }
    #place-experience .tx-meaning-card {
      margin: 0 0 2px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
      color: rgba(var(--kt-secondary-accent-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.82);
    }
    #place-experience .tx-meaning p:not(.tx-meaning-card) { margin: 0; font-size: 14.5px; line-height: 1.6; color: rgba(244, 241, 233, 0.86); }
    #place-experience .tx-after { margin-top: 2px; }

    /* ------------------------------------------------ the card-first reading
       Each card is a block of its own, set off by a hairline: its place in small accent capitals, its name large, the way up it was drawn beside it, the kind of
       card underneath as one muted line, then three short paragraphs of which the last (what the card means in its place) carries an accent rule. The synthesis and the
       takeaway are the two glass panels, so what comes after the cards is plainly a different part of the reading. */
    #place-experience .tx-cardfirst { gap: 0; }
    #place-experience .tx-cardsec { padding: 20px 0 6px; border-top: 1px solid rgba(var(--kt-surface-border-rgb, var(--kt-accent-soft-rgb, 255, 255, 255)), 0.16); }
    #place-experience .tx-cardfirst > .tx-cardsec:first-of-type { border-top: 0; padding-top: 4px; }
    #place-experience .tx-cardsec-pos {
      margin: 0 0 4px; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
      color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.96);
    }
    #place-experience .tx-cardsec-name { margin: 0; font-size: 23px; line-height: 1.2; }
    #place-experience .tx-cardsec-orient { margin-left: 8px; font-family: inherit; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(244, 241, 233, 0.62); white-space: nowrap; }
    #place-experience .tx-cardsec-orient.is-reversed { color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.98); }
    #place-experience .tx-cardsec-meta { margin: 6px 0 12px; font-size: 12.5px; letter-spacing: 0.04em; color: rgba(244, 241, 233, 0.58); }
    #place-experience .tx-cardsec-text { margin: 0 0 12px; font-size: 15px; line-height: 1.66; color: rgba(244, 241, 233, 0.88); }
    #place-experience .tx-cardsec-text.is-place {
      padding-left: 12px; border-left: 2px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.6); color: rgba(250, 249, 245, 0.96);
    }
    #place-experience .tx-jumper-note .tx-cardsec-text { margin-top: 4px; }
    #place-experience .tx-synthesis, #place-experience .tx-takeaway { margin-top: 18px; }
    #place-experience .tx-synthesis h3, #place-experience .tx-takeaway h3 { margin: 0 0 8px; }
    #place-experience .tx-synthesis p, #place-experience .tx-takeaway p { margin: 0 0 10px; font-size: 15px; line-height: 1.66; color: rgba(244, 241, 233, 0.9); }
    #place-experience .tx-synthesis p:last-child, #place-experience .tx-takeaway p:last-child { margin-bottom: 0; }
    #place-experience .tx-takeaway { border-color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.45); }
    #place-experience .tx-takeaway p { font-size: 15.5px; color: rgba(255, 253, 248, 0.96); }


    /* ------------------------------------------------------------- tappable cards
       A card in the spread, and the one that jumped, opens its detail on a tap. */
    #place-experience .tx-face[data-tx-card-open] {
      cursor: pointer; -webkit-tap-highlight-color: transparent;
      transition: transform 0.16s ease, box-shadow 0.16s ease;
    }
    #place-experience .tx-face[data-tx-card-open]:active { transform: scale(0.97); }
    #place-experience .tx-face[data-tx-card-open]:focus-visible {
      outline: 2px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.9); outline-offset: 3px;
    }
    @media (hover: hover) {
      #place-experience .tx-face[data-tx-card-open]:hover { box-shadow: 0 0 0 3px rgba(6, 8, 10, 0.7) inset, 0 0 22px rgba(var(--kt-accent-rgb, 216, 195, 142), 0.32); }
    }

    /* ---------------------------------------------------------------- shake cue
       A phone that shakes, in the interface's accent, above the capsule. Lit while shake is on. */
    #place-experience .tx-phone {
      width: 60px; height: 60px; fill: none; overflow: visible;
      stroke: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.85); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;
    }
    #place-experience .tx-phone-body { transform-box: fill-box; transform-origin: 50% 50%; animation: tx-phone-shake 2.6s ease-in-out infinite; }
    #place-experience .tx-phone-waves { opacity: 0; animation: tx-phone-waves 2.6s ease-in-out infinite; }
    #place-experience .tx-shake[data-tx-shake='on'] .tx-phone {
      stroke: rgba(var(--kt-accent-rgb, 216, 195, 142), 1); filter: drop-shadow(0 0 8px rgba(var(--kt-accent-rgb, 216, 195, 142), 0.45));
    }
    @keyframes tx-phone-shake {
      0%, 52%, 100% { transform: translateX(0) rotate(0deg); }
      8% { transform: translateX(-3px) rotate(-15deg); }
      16% { transform: translateX(3px) rotate(13deg); }
      24% { transform: translateX(-3px) rotate(-11deg); }
      32% { transform: translateX(2px) rotate(8deg); }
      40% { transform: translateX(-1px) rotate(-4deg); }
    }
    @keyframes tx-phone-waves {
      0%, 4%, 50%, 100% { opacity: 0; }
      12%, 40% { opacity: 0.9; }
    }

    /* ------------------------------------------------------------------ shuffle
       A riffle. Ten card backs start as two halves, one either side of the middle; they lift one after another, alternating left and right, and
       drop onto one pile in the middle (the cascade is the 30 ms between cards), then the pile is cut again and the same thing happens - two
       passes of 0.6 s over the 1.2 s the shuffle is shown. The line the mixing ends on fades in over the last of it. */
    #place-experience .tx-shuffle { min-height: 340px; justify-content: center; gap: 26px; padding: 26px 18px 24px; }
    #place-experience .tx-shuffle-stage { position: relative; width: 220px; height: 190px; }
    #place-experience .tx-shuffle-glow {
      position: absolute; inset: 8% 6%; border-radius: 50%;
      background: radial-gradient(circle, rgba(var(--kt-accent-rgb, 216, 195, 142), 0.2), transparent 66%);
      animation: tx-shuffle-glow 1.2s ease-in-out both;
    }
    #place-experience .tx-shuffle-deck { position: absolute; inset: 0; animation: tx-shuffle-jog 0.6s ease-in-out infinite; }
    #place-experience .tx-shuffle .tx-shuffle-card {
      position: absolute; top: 24px; left: 50%; width: 94px; margin-left: -47px;
      animation: tx-riffle 0.6s cubic-bezier(0.4, 0, 0.3, 1) infinite both; will-change: transform;
    }
    #place-experience .tx-shuffle-card-1 { --n: 1; --side: 1; animation-delay: 0ms; z-index: 1; }
    #place-experience .tx-shuffle-card-2 { --n: 2; --side: -1; animation-delay: 30ms; z-index: 2; }
    #place-experience .tx-shuffle-card-3 { --n: 3; --side: 1; animation-delay: 60ms; z-index: 3; }
    #place-experience .tx-shuffle-card-4 { --n: 4; --side: -1; animation-delay: 90ms; z-index: 4; }
    #place-experience .tx-shuffle-card-5 { --n: 5; --side: 1; animation-delay: 120ms; z-index: 5; }
    #place-experience .tx-shuffle-card-6 { --n: 6; --side: -1; animation-delay: 150ms; z-index: 6; }
    #place-experience .tx-shuffle-card-7 { --n: 7; --side: 1; animation-delay: 180ms; z-index: 7; }
    #place-experience .tx-shuffle-card-8 { --n: 8; --side: -1; animation-delay: 210ms; z-index: 8; }
    #place-experience .tx-shuffle-card-9 { --n: 9; --side: 1; animation-delay: 240ms; z-index: 9; }
    #place-experience .tx-shuffle-card-10 { --n: 10; --side: -1; animation-delay: 270ms; z-index: 10; }
    #place-experience .tx-shuffle-text {
      margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 18px; letter-spacing: 0.04em; color: rgba(244, 241, 233, 0.86);
      animation: tx-shuffle-choose 1.2s ease-out both;
    }
    @keyframes tx-riffle {
      0% { transform: translate(calc(var(--side) * 56px), calc(var(--n) * -0.9px)) rotate(calc(var(--side) * -4deg)); }
      14% { transform: translate(calc(var(--side) * 62px), calc(-24px - var(--n) * 1.5px)) rotate(calc(var(--side) * (-8deg - var(--n) * 0.8deg))); }
      34% { transform: translate(calc(var(--side) * (24px - var(--n) * 1.2px)), calc(-44px - var(--n) * 2px)) rotate(calc(var(--side) * (4deg + var(--n) * 0.7deg))); }
      52%, 66% { transform: translate(0, calc(var(--n) * -1.3px)) rotate(0deg); }
      100% { transform: translate(calc(var(--side) * 56px), calc(var(--n) * -0.9px)) rotate(calc(var(--side) * -4deg)); }
    }
    @keyframes tx-shuffle-jog { 0%, 46%, 100% { transform: translateY(0); } 56% { transform: translateY(5px); } 66% { transform: translateY(-2px); } }
    @keyframes tx-shuffle-glow { 0% { opacity: 0; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.04); } 100% { opacity: 0.7; transform: scale(1); } }
    @keyframes tx-shuffle-choose { 0%, 58% { opacity: 0; transform: translateY(5px); } 100% { opacity: 1; transform: translateY(0); } }

    /* ------------------------------------------------------------- card detail
       One card, large, in the application's glass, over a dimmed and blurred screen. */
    #place-experience .tx-detail {
      position: fixed; inset: 0; z-index: 9100; display: flex; align-items: center; justify-content: center;
      padding: max(14px, env(safe-area-inset-top)) 14px max(14px, env(safe-area-inset-bottom));
      animation: tx-detail-in 0.22s ease-out both;
    }
    #place-experience .tx-detail-backdrop {
      position: absolute; inset: 0; background: rgba(3, 5, 8, 0.78); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
    }
    #place-experience .tx-detail-panel {
      position: relative; width: min(100%, 430px); max-height: 100%; overflow-y: auto; overscroll-behavior: contain;
      padding: 24px 18px 22px; display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center;
    }
    #place-experience .tx-detail-card { width: clamp(132px, 44vw, 208px); flex: none; }
    #place-experience .tx-detail-card .tx-face { width: 100%; }
    #place-experience .tx-detail-close {
      position: absolute; top: 8px; right: 8px; width: 44px; height: 44px; padding: 0; border-radius: 999px; cursor: pointer;
      font-size: 26px; line-height: 1; color: rgba(250, 249, 245, 0.92);
      background: rgba(var(--kt-surface-fill-rgb, 10, 12, 16), 0.6);
      border: 1px solid rgba(var(--kt-surface-border-rgb, var(--kt-accent-soft-rgb, 255, 255, 255)), 0.4);
    }
    #place-experience .tx-detail-close:focus-visible { outline: 2px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.9); outline-offset: 2px; }
    #place-experience .tx-detail-title { margin: 6px 0 0; font-family: Georgia, 'Times New Roman', serif; font-size: 22px; line-height: 1.2; font-weight: 400; }
    #place-experience .tx-detail-state {
      margin: 0; padding: 3px 12px; border-radius: 999px; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
      border: 1px solid rgba(244, 241, 233, 0.3); color: rgba(244, 241, 233, 0.78);
    }
    #place-experience .tx-detail-state.is-reversed { color: rgba(var(--kt-accent-rgb, 216, 195, 142), 1); border-color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.55); }
    #place-experience .tx-detail-text { margin: 6px 0 0; font-size: 15px; line-height: 1.65; text-align: left; color: rgba(244, 241, 233, 0.9); }
    /* The longer description: the same glass, a hairline above it, text set for reading on a phone and scrolled with the panel. */
    #place-experience .tx-detail-more { width: 100%; margin: 8px 0 0; padding-top: 14px; border-top: 1px solid rgba(244, 241, 233, 0.14); text-align: left; }
    #place-experience .tx-detail-more p { margin: 0 0 12px; font-size: 15px; line-height: 1.7; color: rgba(244, 241, 233, 0.84); max-width: 62ch; hyphens: auto; -webkit-hyphens: auto; overflow-wrap: anywhere; }
    #place-experience .tx-detail-more p:last-child { margin-bottom: 0; }
    @keyframes tx-detail-in { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }

    @media (prefers-reduced-motion: reduce) {
      #place-experience .tx-phone-body, #place-experience .tx-phone-waves, #place-experience .tx-shuffle-glow,
      #place-experience .tx-shuffle-text, #place-experience .tx-shuffle-deck, #place-experience .tx-detail { animation: none; }
      #place-experience .tx-phone-waves { opacity: 0.7; }
      #place-experience .tx-shuffle .tx-shuffle-card { animation: none; transform: translateX(calc(var(--side) * 6px)) rotate(calc(var(--side) * -3deg)); }
      #place-experience .tx-face[data-tx-card-open]:active { transform: none; }
    }

    @media (prefers-reduced-motion: reduce) {
      #place-experience .tx-face.is-fresh { animation: none; }
      #place-experience .tx-button:active { transform: none; }
    }
  ` + tarotHeroCss() + tarotGuidedCss();
    document.head.append(style);
}
