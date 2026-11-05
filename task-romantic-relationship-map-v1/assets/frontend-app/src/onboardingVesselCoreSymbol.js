/*
 * THE ACTIVE BODY, AT THE CENTRE OF THE EARTH.
 * --------------------------------------------
 * The vessel carousel puts three small glyphs around the globe and marks one of
 * them active. Which one is active is legible if you are looking for it and
 * easy to miss if you are not, because the active glyph is the same size as the
 * two it sits between.
 *
 * This mirrors the active glyph once more, large, in the middle of the planet.
 * It is emphasis and nothing else: no new state, no new control, no change to
 * how a vessel is chosen. The mirror is read-only and cannot be clicked.
 *
 * WHY IT READS THE GLYPH INSTEAD OF OWNING A COPY
 * The character and its colour are both taken from the live button rather than
 * duplicated here. The three glyphs are authored in the page markup and their
 * colours come from the vessel-energy tokens, which the theme system and the
 * carousel both write to; a second copy of either would be a second thing to
 * keep in step, and the first time it drifted the centre would contradict the
 * rim. Copying the computed colour also means this inherits any future theme
 * work for free.
 *
 * WHY A SEPARATE MODULE
 * The glow ring, the ripple field and the neighbour rail all live in
 * vesselArrowOnlyPolish, which is where the Earth's calibration maths sits.
 * This needs none of that beyond two CSS variables, and keeping it out means a
 * change here can never disturb the rim or the wave field.
 */
const experience = document.getElementById('place-experience');
const vesselStage = document.getElementById('vessel-stage');
const vesselOrbit = document.getElementById('vessel-orbit');
if (experience instanceof HTMLElement
    && vesselStage instanceof HTMLElement
    && vesselOrbit instanceof HTMLElement) {
    /* What the mark reads at, when the carousel is at rest and fully faded in. */
    const BASE_OPACITY = 0.92;
    /*
     * THE MARK NO LONGER KEEPS TIME. IT IS CONDUCTED.
     *
     * This used to reproduce the carousel's fade from its own constant and start
     * it from a MutationObserver. Both halves of that were wrong. A mutation lands
     * at a different instant from the swap that caused it - in practice a full
     * phase later, because vesselArrowOnlyPolish only swaps the active choice at
     * the MIDPOINT of its sequence - so the centre held the vessel being left at
     * full strength for the entire fade-out and only began leaving as everything
     * else came back. And a second constant is a second clock: two numbers that
     * agree today and drift the first time one of them is edited.
     *
     * So the duration comes from the conductor now, twice over: as
     * --kt-vessel-swap-ms for the CSS transition below, and as detail.durationMillis
     * on the phase events. This constant survives only as the fallback for the
     * instant before the conductor has published anything, and for the case where
     * this module is mounted without it.
     */
    const FADE_MILLIS = 1000;
    const style = document.createElement('style');
    style.dataset.onboardingVesselCoreSymbol = 'true';
    style.textContent = `
    /*
     * Anchored to the measured Earth centre, the same two variables the glow
     * ring and the neighbour rail use, so it tracks the planet on resize
     * without measuring anything itself.
     *
     * Sized from the Earth's own diameter rather than in absolute pixels: at
     * 30% it is roughly twice the peripheral glyphs on every viewport, which is
     * the point - "noticeably larger" has to hold on a small phone too.
     */
    .kt-vessel-core-symbol {
      position: absolute;
      top: var(--vessel-earth-center-y, 50%);
      left: var(--vessel-earth-center-x, 50%);
      z-index: 465;
      display: grid;
      place-items: center;
      /* The glyph is an inline SVG, so this is a BOX size, not a font size. */
      /* 0.42 -> 0.48: the reference circle is r=10 in a 48 viewBox, so the ring
         itself is about 42% of this box. Slightly larger, as asked, while the
         mark stays well inside the planet. */
      width: calc(var(--vessel-earth-diameter, 240px) * 0.48);
      height: calc(var(--vessel-earth-diameter, 240px) * 0.48);
      pointer-events: none;
      transform: translate(-50%, -50%);
      /* Enough lift to stay legible over ocean and cloud alike, at the same
         weight the peripheral glyphs already carry. */
      filter:
        drop-shadow(0 0 5px rgba(0, 0, 0, .5))
        drop-shadow(0 0 16px rgba(0, 0, 0, .38));
      opacity: 0;
      /* The conductor publishes --kt-vessel-swap-ms onto the vessel stage, so
         this transition and its JS tweens are the same number by construction.

         And the same CURVE: the conductor tweens on smoothstep,
         p * p * (3 - 2p), so a linear transition here started and finished with
         everything else but sagged up to 0.09 behind it in the middle of each
         phase. cubic-bezier(.5,0,.5,1) is that smoothstep. */
      transition: opacity var(--kt-vessel-swap-ms, ${FADE_MILLIS}ms) cubic-bezier(.5, 0, .5, 1);
    }

    /*
     * THE CLONE HAS TO PAINT ITSELF.
     *
     * The glyph's fill and stroke come from
     *   .vessel-orbit[data-motion="..."] .vessel-glyph
     * and the clone matches neither half of that: it hangs off the vessel STAGE
     * rather than the orbit, and its class is stripped so it cannot inherit a
     * rule written for the carousel. With no rule reaching it the SVG fell back
     * to its defaults - fill black, no stroke - so the r=10 reference circle
     * painted as a solid black disc and the male arrow and female cross, which
     * are stroke-only paths, disappeared entirely. That is the black blob.
     *
     * Declared here rather than by keeping the class, so the centre symbol owns
     * its own appearance and cannot be changed by a carousel rule again.
     */
    .kt-vessel-core-symbol > svg {
      width: 100%;
      height: 100%;
      display: block;
      /* The male arrow and the female cross reach outside the 48x48 viewBox on
         purpose; without this they are clipped back to the circle. */
      overflow: visible;
      fill: none;
      stroke: currentColor;
      /* Matches the carousel's 2.6 against the same 48-unit viewBox, so the
         centre mark is the same drawing at a larger size rather than a
         differently weighted one. */
      stroke-width: 2.6;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* The carousel is gone once the profile flow starts, and so is this. */
    .vessel-stage.is-profile-flow .kt-vessel-core-symbol {
      display: none !important;
    }

    /*
     * THE CAROUSEL'S OWN CENTRE GLYPH IS GONE.
     *
     * The active .vessel-choice is laid out AT the Earth's centre and draws its
     * own 68px mark there. With this module mounted that made two centre
     * symbols - the small animated one underneath, the large one on top. This
     * hides the small one so the large one REPLACES it rather than covering it.
     *
     * visibility rather than display, so the button keeps its box and stays
     * exactly as clickable as it was: selection logic is untouched, and the
     * label beneath the globe is a sibling and unaffected. The side marks are
     * .kt-vessel-neighbor-glyph, a different rail, so they are not touched
     * either.
     *
     * Gated on the attribute this module sets, so if it ever fails to mount the
     * carousel's own symbol is still there and the screen is never blank.
     */
    #vessel-stage[data-kt-core-symbol="on"] .vessel-choice .vessel-symbol {
      visibility: hidden !important;
    }

    @media (prefers-reduced-motion: reduce) {
      .kt-vessel-core-symbol { transition: none; }
    }
  `;
    document.head.append(style);
    const core = document.createElement('span');
    core.className = 'kt-vessel-core-symbol';
    /* Decorative: the real choice is announced by the buttons' aria-pressed. */
    core.setAttribute('aria-hidden', 'true');
    vesselStage.append(core);
    /* Only now is it safe to hide the one it replaces. */
    vesselStage.dataset.ktCoreSymbol = 'on';
    /**
     * THE SELECTED vessel - not whichever button the rim happens to be painting.
     *
     * This used to ask for the choice that was on SCREEN, through a single
     * querySelector with a comma list:
     *
     *   '.vessel-choice.is-carousel-active, .vessel-choice[data-carousel-slot="active"]'
     *
     * A comma list does not mean "try these in order". It returns the first match
     * in DOCUMENT ORDER, and while the carousel is mid-move BOTH match at once:
     * the incoming button already carries .is-carousel-active, and the outgoing
     * one still carries data-carousel-slot="active" until the next frame. Which
     * of the two came back therefore depended on where they happen to sit in the
     * markup - and the markup order is male, female, undefined, which is not the
     * carousel's own order. So for part of every move this resolved to the button
     * that was on its way OUT.
     *
     * The centre does not need to mirror the rim's intermediate states. It runs
     * its own fade, and the only thing it needs is the answer to "which vessel is
     * selected", which the carousel commits before the move begins. Asked one
     * selector at a time, in priority order, that question has exactly one answer
     * at every instant of the transition.
     */
    const selectedChoice = () => {
        const selected = experience.dataset.vesselSelection;
        return (selected
            ? vesselOrbit.querySelector(`.vessel-choice[data-vessel="${selected}"]`)
            : null)
            ?? vesselOrbit.querySelector('.vessel-choice[aria-pressed="true"]')
            ?? vesselOrbit.querySelector('.vessel-choice.is-carousel-active');
    };
    /*
     * WHAT IS SHOWN, AND NOTHING ELSE. One value, not two.
     *
     * The mark used to carry `shownVessel` AND `targetVessel`, because it started
     * and timed its own swap and therefore had to describe the state "displaying
     * A, on the way to B". It no longer has that state: the conductor owns the
     * clock, and this only ever installs artwork at the instant it is told the
     * stage is empty. So there is exactly one question left - what is in the mark
     * right now - and one value to answer it.
     *
     * `swapSequence` is the conductor's own counter, carried on all three phase
     * events. A -hidden or -in that does not belong to the sequence this module
     * last saw -out for is rejected, which is the same token discipline the
     * conductor enforces internally with glowSequenceToken.
     */
    let shownVessel = null;
    let swapSequence = null;
    let swapping = false;
    let recoveryTimer = 0;
    const phaseDetail = (event) => {
        const detail = event.detail;
        return (detail !== null && typeof detail === 'object') ? detail : {};
    };
    /**
     * Put the SELECTED glyph in the mark. Content and colour only - this never
     * touches opacity, because it is only ever called while the mark is at zero
     * and it is the conductor that decides when that stops being true.
     */
    const installSelected = () => {
        const choice = selectedChoice();
        const glyph = choice?.querySelector('.vessel-symbol');
        const artwork = glyph?.querySelector('svg') ?? null;
        if (!choice || !glyph || !artwork) {
            core.replaceChildren();
            shownVessel = null;
            return;
        }
        const fresh = artwork.cloneNode(true);
        fresh.removeAttribute('class');
        fresh.setAttribute('aria-hidden', 'true');
        /* replaceChildren, so there is exactly one centre symbol at every instant -
           the old node is gone in the same operation that installs the new. */
        core.replaceChildren(fresh);
        /* Read at installation rather than captured earlier, so a theme change
           during the fade-out lands on the glyph that is about to appear. */
        core.style.color = window.getComputedStyle(glyph).color;
        shownVessel = choice.dataset.vessel ?? '';
    };
    const reveal = () => {
        if (core.childElementCount === 0)
            return;
        /* A forced reflow commits the new content AT OPACITY 0 before the fade-in is
           asked for, which is what makes the browser animate rather than jump.
           Deliberately not requestAnimationFrame: a tab backgrounded mid-swap never
           gets that frame, and the mark would still be invisible on return. */
        void core.offsetWidth;
        core.style.opacity = BASE_OPACITY.toFixed(4);
    };
    /*
     * THE THREE PHASES. The mark decides none of this; it is told.
     */
    const onSwapOut = (event) => {
        const { durationMillis, sequence } = phaseDetail(event);
        swapSequence = typeof sequence === 'number' ? sequence : null;
        swapping = true;
        window.clearTimeout(recoveryTimer);
        core.style.opacity = '0';
        /*
         * A SWAP MUST NEVER BE ABLE TO END WITH THE MARK INVISIBLE.
         * The conductor emits -hidden and -in from inside a tween callback it is
         * allowed to abandon (a superseded sequence, a stage torn down mid-move). If
         * they never arrive, this puts the selected glyph back rather than leaving a
         * hole in the middle of the Earth. Generous, because it must never fire
         * during a healthy sequence.
         */
        const phase = typeof durationMillis === 'number' && durationMillis > 0
            ? durationMillis
            : FADE_MILLIS;
        recoveryTimer = window.setTimeout(() => {
            if (!swapping)
                return;
            swapping = false;
            installSelected();
            reveal();
        }, Math.round(phase * 3));
    };
    const onSwapHidden = (event) => {
        const { sequence } = phaseDetail(event);
        if (swapSequence !== null && sequence !== swapSequence)
            return;
        /* At zero. The replacement cannot be seen, which is the whole point of being
           told about this instant instead of guessing at it. */
        installSelected();
    };
    const onSwapIn = (event) => {
        const { sequence } = phaseDetail(event);
        if (swapSequence !== null && sequence !== swapSequence)
            return;
        window.clearTimeout(recoveryTimer);
        recoveryTimer = 0;
        swapping = false;
        reveal();
    };
    window.addEventListener('knowthyself:vessel-swap-out', onSwapOut);
    window.addEventListener('knowthyself:vessel-swap-hidden', onSwapHidden);
    window.addEventListener('knowthyself:vessel-swap-in', onSwapIn);
    /*
     * THE OBSERVER IS A REFRESH, NOT A TRIGGER.
     *
     * It exists for the first paint and for colour: the theme system recolours the
     * buttons, and the mark takes its colour from whichever button it mirrors. It
     * no longer starts anything. While a swap is in flight it does nothing at all,
     * because the conductor owns those instants, and a second opinion arriving
     * between them is exactly what put the centre on a clock of its own.
     *
     * The one case where it still installs artwork is a selection that moved
     * WITHOUT a swap - the profile overview's vessel edit, or the very first
     * paint. That is not a transition; there is nothing on screen to cross-fade
     * from, so it is set directly.
     */
    const sync = () => {
        if (swapping)
            return;
        const choice = selectedChoice();
        const glyph = choice?.querySelector('.vessel-symbol');
        if (!choice || !glyph || !glyph.querySelector('svg')) {
            core.replaceChildren();
            core.style.opacity = '0';
            shownVessel = null;
            return;
        }
        if ((choice.dataset.vessel ?? '') === shownVessel) {
            /* Colour only. The glyph on screen is already the right one. */
            core.style.color = window.getComputedStyle(glyph).color;
            return;
        }
        installSelected();
        reveal();
    };
    sync();
    /*
     * The carousel changes the active choice by rewriting attributes and classes
     * on the buttons, and the theme system recolours them, so one observer over
     * the orbit covers both without this module needing to know about either.
     */
    const orbitObserver = new MutationObserver(sync);
    orbitObserver.observe(vesselOrbit, {
        attributes: true,
        subtree: true,
        attributeFilter: ['aria-pressed', 'class', 'style', 'data-carousel-slot'],
    });
    /* The selection also lands on the host as a dataset value, and on the very
       first paint that can arrive before the buttons are marked. */
    const experienceObserver = new MutationObserver(sync);
    experienceObserver.observe(experience, {
        attributes: true,
        attributeFilter: ['data-vessel-selection', 'data-kt-theme', 'data-kt-theme-effective'],
    });
    window.addEventListener('pagehide', () => {
        window.removeEventListener('knowthyself:vessel-swap-out', onSwapOut);
        window.removeEventListener('knowthyself:vessel-swap-hidden', onSwapHidden);
        window.removeEventListener('knowthyself:vessel-swap-in', onSwapIn);
        orbitObserver.disconnect();
        experienceObserver.disconnect();
        window.clearTimeout(recoveryTimer);
        style.remove();
        core.remove();
    }, { once: true });
}
export {};
