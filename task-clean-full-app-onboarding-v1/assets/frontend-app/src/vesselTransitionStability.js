import { t } from './app/i18n/uiStrings.js?v=f9ab0a6';
const experience = document.getElementById('place-experience');
const vesselStage = document.getElementById('vessel-stage');
const vesselOrbit = document.getElementById('vessel-orbit');
const confirmVessel = document.getElementById('confirm-vessel');
if (experience instanceof HTMLElement
    && vesselStage instanceof HTMLElement
    && vesselOrbit instanceof HTMLElement
    && confirmVessel instanceof HTMLButtonElement) {
    const profileFlow = vesselStage.querySelector('.profile-flow');
    const vesselActions = vesselStage.querySelector('.vessel-actions');
    const vesselBack = vesselStage.querySelector('.vessel-back');
    const choices = [...vesselOrbit.querySelectorAll('.vessel-choice')];
    let normalizeFrame = 0;
    /*
     * WRITING THE CARD MEANS CHANGING IT.
     *
     * This module owns the card's geometry after a confirm, and it re-solves it
     * whenever a class changes on the experience, the stage or the orbit. What it
     * wrote, though, it wrote unconditionally - and a write that changes nothing
     * still reports: classList runs its update steps whether or not the token set
     * moved, and setAttribute always queues a record. Since this module watches
     * the orbit's own class, its idempotent pass was waking itself, about eighty
     * times a second, for as long as a card was on screen - and with it the two
     * modules that watch the orbit's subtree, one of which reads layout twice a
     * round.
     *
     * These two helpers are the whole fix: the card is still written here, but
     * only where the DOM does not already say what this module is about to say.
     */
    const setClass = (element, token, present) => {
        if (element.classList.contains(token) === present)
            return;
        element.classList.toggle(token, present);
    };
    const setAttr = (element, name, value) => {
        if (element.getAttribute(name) !== value)
            element.setAttribute(name, value);
    };
    const setText = (element, text) => {
        if (element.textContent !== text)
            element.textContent = text;
    };
    const clearLegacyGeometry = (choice) => {
        for (const property of ['transform', 'opacity', 'filter', 'z-index', 'width', 'height', 'visibility']) {
            choice.style.removeProperty(property);
        }
    };
    const getCarouselChoice = () => (vesselOrbit.querySelector('.vessel-choice.is-carousel-active')
        ?? vesselOrbit.querySelector('.vessel-choice.is-focused'));
    const normalizeVesselCard = () => {
        if (experience.dataset.state !== 'vessel'
            || vesselStage.classList.contains('is-profile-flow'))
            return;
        const activeChoice = getCarouselChoice();
        if (!(activeChoice instanceof HTMLButtonElement))
            return;
        // The legacy orbit controller keeps private focus/3D geometry. Back uses its
        // own handler to clear that private state; after that, always restore the
        // modern single-Earth carousel geometry in one deterministic frame.
        setClass(vesselStage, 'is-confirmed', false);
        for (const token of ['vessel-focused', 'profile-flow-active', 'profile-visuals-locked']) {
            setClass(experience, token, false);
        }
        for (const token of ['is-focused', 'is-dragging'])
            setClass(vesselOrbit, token, false);
        if (vesselActions)
            setClass(vesselActions, 'is-vessel-focused', false);
        if (profileFlow instanceof HTMLElement) {
            profileFlow.hidden = true;
            profileFlow.inert = true;
            profileFlow.dataset.step = 'identity';
        }
        for (const choice of choices) {
            const isActive = choice === activeChoice;
            clearLegacyGeometry(choice);
            choice.disabled = false;
            setClass(choice, 'is-focused', false);
            setClass(choice, 'is-carousel-active', isActive);
            setAttr(choice, 'data-carousel-slot', isActive ? 'active' : 'hidden');
            setAttr(choice, 'aria-pressed', isActive ? 'true' : 'false');
        }
        const vessel = activeChoice.dataset.vessel ?? 'undefined';
        setAttr(experience, 'data-vessel-selection', vessel);
        confirmVessel.disabled = false;
        setText(confirmVessel, t('onb.vessel.confirm'));
        if (vesselBack instanceof HTMLButtonElement)
            vesselBack.hidden = false;
    };
    const normalizeProfileCard = () => {
        if (!vesselStage.classList.contains('is-profile-flow'))
            return;
        const activeChoice = getCarouselChoice();
        if (!(activeChoice instanceof HTMLButtonElement))
            return;
        // Confirm must not create a second geometry state. Keep exactly the same
        // circular box/rim that was visible one frame before the tap, while hiding
        // the gender glyph/label for Identity and later cards.
        setClass(vesselOrbit, 'is-focused', true);
        if (vesselActions)
            setClass(vesselActions, 'is-vessel-focused', false);
        for (const choice of choices) {
            const isActive = choice === activeChoice;
            clearLegacyGeometry(choice);
            setClass(choice, 'is-focused', isActive);
            setClass(choice, 'is-carousel-active', isActive);
            setAttr(choice, 'data-carousel-slot', isActive ? 'active' : 'hidden');
            setAttr(choice, 'aria-pressed', isActive ? 'true' : 'false');
        }
    };
    const normalize = () => {
        normalizeFrame = 0;
        /*
         * A READING OWNS THE SCREEN: THE CARD IS BEHIND IT AND NOBODY IS LOOKING.
         *
         * Normalising writes aria-pressed and data-carousel-slot on all three
         * choices every time it runs, and setAttribute reports a mutation even when
         * the value is unchanged - which is what kept this pass, the prompt anchor's
         * two layout reads and a second frame loop alive at about eighty rounds a
         * second while a pillar reading was open. data-pillar-stage is the app's own
         * flag for "a reading has the screen"; it is watched below, so the card is
         * normalised again on the frame the reader is handed back to the cards.
         */
        if (experience.dataset.pillarStage)
            return;
        if (vesselStage.classList.contains('is-profile-flow'))
            normalizeProfileCard();
        else
            normalizeVesselCard();
    };
    const scheduleNormalize = () => {
        if (normalizeFrame)
            window.cancelAnimationFrame(normalizeFrame);
        normalizeFrame = window.requestAnimationFrame(() => {
            // One extra frame lets the existing confirm/back handlers finish mutating
            // classes before we enforce the stable geometry.
            normalizeFrame = window.requestAnimationFrame(normalize);
        });
    };
    const observer = new MutationObserver(scheduleNormalize);
    observer.observe(experience, { attributes: true, attributeFilter: ['class', 'data-state', 'data-pillar-stage'] });
    observer.observe(vesselStage, { attributes: true, attributeFilter: ['class'] });
    observer.observe(vesselOrbit, { attributes: true, attributeFilter: ['class'] });
    window.addEventListener('knowthyself:vessel-confirmed', scheduleNormalize);
    window.addEventListener('knowthyself:vessel-carousel-change', scheduleNormalize);
    const style = document.createElement('style');
    style.dataset.vesselTransitionStability = 'true';
    style.textContent = `
    /* Confirm/back are state changes, never geometry changes. The single-Earth
       carousel keeps one measured square through VESSEL -> IDENTITY -> VESSEL. */
    .place-experience.vessel-active
      .vessel-stage
      .vessel-orbit.is-arrow-carousel {
      width: var(--vessel-earth-diameter, 30.4dvh) !important;
      height: var(--vessel-earth-diameter, 30.4dvh) !important;
      min-width: var(--vessel-earth-diameter, 30.4dvh) !important;
      min-height: var(--vessel-earth-diameter, 30.4dvh) !important;
      max-width: var(--vessel-earth-diameter, 30.4dvh) !important;
      max-height: var(--vessel-earth-diameter, 30.4dvh) !important;
      aspect-ratio: 1 / 1 !important;
    }

    .place-experience.vessel-active
      .vessel-stage
      .vessel-orbit.is-arrow-carousel
      .vessel-choice[data-carousel-slot='active'],
    .place-experience.profile-flow-active
      .vessel-stage.is-profile-flow
      .vessel-orbit.is-arrow-carousel.is-focused
      .vessel-choice.is-focused {
      top: 50% !important;
      left: 50% !important;
      width: 100% !important;
      height: 100% !important;
      min-width: 100% !important;
      min-height: 100% !important;
      max-width: 100% !important;
      max-height: 100% !important;
      aspect-ratio: 1 / 1 !important;
      transform: translate(-50%, -50%) !important;
      filter: none !important;
      opacity: 1 !important;
      visibility: visible !important;
    }

    .place-experience.vessel-active
      .vessel-stage
      .vessel-orbit.is-arrow-carousel
      .vessel-choice[data-carousel-slot='hidden'] {
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }

    .place-experience.profile-flow-active
      .vessel-stage.is-profile-flow
      .vessel-orbit.is-arrow-carousel.is-focused
      .vessel-choice.is-focused
      .vessel-symbol {
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      min-width: 100% !important;
      min-height: 100% !important;
      aspect-ratio: 1 / 1 !important;
      border-radius: 50% !important;
      border: 1.5px solid rgba(var(--vessel-energy-soft-rgb), .96) !important;
      box-shadow:
        0 0 2px rgba(255,255,255,.98),
        0 0 8px rgba(255,255,255,.66),
        0 0 20px rgba(var(--vessel-energy-rgb),.68),
        0 0 42px rgba(var(--vessel-energy-rgb),.40),
        0 0 74px rgba(var(--vessel-energy-rgb),.20) !important;
      background: transparent !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      color: transparent !important;
      font-size: 0 !important;
    }

    .place-experience.profile-flow-active
      .vessel-stage.is-profile-flow
      .vessel-orbit.is-arrow-carousel.is-focused
      .vessel-choice.is-focused
      .vessel-label,
    .place-experience.profile-flow-active
      .vessel-stage.is-profile-flow
      .vessel-orbit.is-arrow-carousel.is-focused
      .vessel-choice.is-focused
      .vessel-glyph,
    .place-experience.profile-flow-active
      .vessel-stage.is-profile-flow
      .vessel-orbit.is-arrow-carousel.is-focused
      .vessel-choice.is-focused
      .vessel-symbol > * {
      visibility: hidden !important;
      opacity: 0 !important;
    }

    /* When the user comes back to VESSEL, force the modern controls back on and
       never expose the old side-orbit remnants. */
    .place-experience[data-state='vessel']
      .vessel-stage:not(.is-profile-flow)
      .vessel-carousel-nav {
      display: grid !important;
    }
  `;
    document.head.append(style);
    scheduleNormalize();
    window.addEventListener('pagehide', () => {
        if (normalizeFrame)
            window.cancelAnimationFrame(normalizeFrame);
        observer.disconnect();
        window.removeEventListener('knowthyself:vessel-confirmed', scheduleNormalize);
        window.removeEventListener('knowthyself:vessel-carousel-change', scheduleNormalize);
        style.remove();
    }, { once: true });
}
