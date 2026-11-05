import { t } from './app/i18n/uiStrings.js?v=53c0693';
const experience = document.getElementById('place-experience');
const vesselStage = document.getElementById('vessel-stage');
const vesselOrbit = document.getElementById('vessel-orbit');
const confirmVessel = document.getElementById('confirm-vessel');
const vesselUndefined = document.getElementById('vessel-undefined');
const experienceStatus = document.getElementById('experience-status');
if (experience instanceof HTMLElement
    && vesselStage instanceof HTMLElement
    && vesselOrbit instanceof HTMLElement
    && confirmVessel instanceof HTMLButtonElement) {
    const profileFlow = vesselStage.querySelector('.profile-flow');
    const handleConfirmCapture = (event) => {
        const target = event.target;
        if (!(target instanceof Element) || !target.closest('#confirm-vessel'))
            return;
        if (!(profileFlow instanceof HTMLElement) || profileFlow.dataset.step !== 'identity')
            return;
        if (confirmVessel.disabled || vesselStage.classList.contains('is-profile-flow'))
            return;
        // The arrow carousel keeps the front item selected without physically
        // clicking the old orbit button. Before Identity begins, click that exact
        // front item once programmatically. This synchronizes both the canonical
        // selectedVessel state and vesselOrbit.core's private focusedChoice with the
        // selection the user actually sees.
        const carouselChoice = vesselOrbit.querySelector('.vessel-choice.is-carousel-active');
        let focusedChoice = vesselOrbit.querySelector('.vessel-choice.is-focused');
        if (carouselChoice instanceof HTMLButtonElement && focusedChoice !== carouselChoice) {
            carouselChoice.click();
            focusedChoice = vesselOrbit.querySelector('.vessel-choice.is-focused');
        }
        const selectedChoice = focusedChoice instanceof HTMLButtonElement
            ? focusedChoice
            : carouselChoice;
        if (!(selectedChoice instanceof HTMLButtonElement))
            return;
        // Own this transition before the old delayed/autofocus confirm listeners run.
        event.preventDefault();
        event.stopImmediatePropagation();
        const vessel = selectedChoice.dataset.vessel ?? 'undefined';
        const focusedStyle = window.getComputedStyle(selectedChoice);
        const energy = focusedStyle.getPropertyValue('--vessel-energy-rgb').trim();
        const energySoft = focusedStyle.getPropertyValue('--vessel-energy-soft-rgb').trim();
        if (energy)
            profileFlow.style.setProperty('--profile-energy-rgb', energy);
        if (energySoft)
            profileFlow.style.setProperty('--profile-energy-soft-rgb', energySoft);
        for (const choice of vesselOrbit.querySelectorAll('.vessel-choice')) {
            const isSelected = choice === selectedChoice;
            choice.classList.toggle('is-focused', isSelected);
            choice.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
            choice.disabled = true;
        }
        vesselOrbit.classList.add('is-focused');
        vesselOrbit.dataset.focusedVessel = vessel;
        experience.classList.add('vessel-focused');
        experience.dataset.vessel = vessel;
        experience.dataset.vesselSelection = vessel;
        experience.dataset.state = 'identity';
        confirmVessel.textContent = t('onb.vessel.confirmed');
        confirmVessel.disabled = true;
        if (vesselUndefined instanceof HTMLButtonElement)
            vesselUndefined.disabled = true;
        // Apply centred focused geometry before the profile visual lock observes the
        // state change, so it can never measure one of the side carousel circles.
        vesselStage.classList.add('is-confirmed', 'is-profile-flow');
        profileFlow.hidden = false;
        profileFlow.inert = false;
        profileFlow.dataset.step = 'identity';
        experience.classList.add('profile-flow-active');
        if (experienceStatus instanceof HTMLElement) {
            experienceStatus.textContent = t('onb.identity.needName');
        }
        window.dispatchEvent(new CustomEvent('knowthyself:vessel-confirmed', {
            detail: { vessel },
        }));
    };
    document.addEventListener('click', handleConfirmCapture, true);
    window.addEventListener('pagehide', () => {
        document.removeEventListener('click', handleConfirmCapture, true);
    }, { once: true });
}
