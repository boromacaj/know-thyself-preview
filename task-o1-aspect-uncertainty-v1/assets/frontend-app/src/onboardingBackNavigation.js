import { t } from './app/i18n/uiStrings.js';
const experience = document.getElementById('place-experience');
const interactionDock = document.getElementById('interaction-dock');
const vesselStage = document.getElementById('vessel-stage');
const confirmPlace = document.getElementById('confirm-place');
const changePlace = document.getElementById('change-place');
const confirmVessel = document.getElementById('confirm-vessel');
const experienceStatus = document.getElementById('experience-status');
if (experience instanceof HTMLElement
    && interactionDock instanceof HTMLElement
    && vesselStage instanceof HTMLElement
    && confirmVessel instanceof HTMLButtonElement) {
    const vesselBack = vesselStage.querySelector('.vessel-back');
    const profileFlow = vesselStage.querySelector('.profile-flow');
    const identityBack = vesselStage.querySelector('.profile-identity-back');
    const completePanel = vesselStage.querySelector('#profile-complete');
    const birthName = vesselStage.querySelector('#profile-birth-name');
    const birthSurname = vesselStage.querySelector('#profile-birth-surname');
    const birthDate = vesselStage.querySelector('#profile-birth-date');
    const birthTime = vesselStage.querySelector('#profile-birth-time');
    const createProfile = vesselStage.querySelector('#profile-create');
    let internalVesselReset = false;
    const isVesselCard = () => (experience.classList.contains('vessel-active')
        && experience.dataset.state === 'vessel'
        && !vesselStage.classList.contains('is-profile-flow'));
    const syncVesselBackVisibility = () => {
        if (!(vesselBack instanceof HTMLButtonElement))
            return;
        vesselBack.hidden = !isVesselCard();
    };
    const resetCoreVesselFocusWithoutLeavingCard = () => {
        if (!(vesselBack instanceof HTMLButtonElement))
            return;
        internalVesselReset = true;
        try {
            // vesselOrbit.core owns private focusedChoice state. Trigger its existing
            // Back handler so returning from IDENTITY really restores a clean VESSEL
            // selector instead of leaving a stale focused choice behind.
            vesselBack.click();
        }
        finally {
            internalVesselReset = false;
        }
    };
    const returnToPlace = () => {
        if (internalVesselReset)
            return;
        if (profileFlow instanceof HTMLElement) {
            profileFlow.hidden = true;
            profileFlow.inert = true;
            profileFlow.dataset.step = 'identity';
        }
        vesselStage.classList.remove('is-profile-flow', 'is-confirmed');
        vesselStage.inert = true;
        vesselStage.setAttribute('aria-hidden', 'true');
        experience.classList.remove('vessel-active', 'vessel-focused', 'profile-flow-active', 'profile-visuals-locked');
        experience.dataset.state = 'ready';
        delete experience.dataset.vessel;
        delete experience.dataset.vesselSelection;
        delete experience.dataset.profileState;
        interactionDock.inert = false;
        if (confirmPlace instanceof HTMLButtonElement) {
            confirmPlace.disabled = false;
            confirmPlace.textContent = t('onb.birthplace.confirm');
        }
        if (changePlace instanceof HTMLButtonElement)
            changePlace.textContent = t('onb.birthplace.change');
        confirmVessel.disabled = true;
        confirmVessel.textContent = t('onb.vessel.confirm');
        if (experienceStatus instanceof HTMLElement) {
            experienceStatus.textContent = t('onb.birthplace.restored');
        }
        syncVesselBackVisibility();
    };
    // IDENTITY already has a Back button. Before its existing handler returns to
    // VESSEL, clear the private focused state created during the confirm handoff.
    // This makes the reverse transition genuinely editable instead of visual-only.
    identityBack?.addEventListener('click', resetCoreVesselFocusWithoutLeavingCard, true);
    // The second card (VESSEL) now always has a real Back action to PLACE.
    vesselBack?.addEventListener('click', returnToPlace);
    // The completion card is also reversible: every card after PLACE has Back.
    let completeBack = null;
    if (completePanel instanceof HTMLElement) {
        const actions = document.createElement('div');
        actions.className = 'profile-complete-actions';
        completeBack = document.createElement('button');
        completeBack.type = 'button';
        completeBack.className = 'profile-secondary profile-complete-back';
        completeBack.textContent = t('onb.action.back');
        completeBack.setAttribute('aria-label', t('onb.arrival.backAria'));
        actions.append(completeBack);
        completePanel.append(actions);
        completeBack.addEventListener('click', () => {
            if (!(profileFlow instanceof HTMLElement))
                return;
            for (const input of [birthName, birthSurname, birthDate, birthTime]) {
                if (input instanceof HTMLInputElement)
                    input.disabled = false;
            }
            if (createProfile instanceof HTMLButtonElement) {
                createProfile.disabled = !(birthDate?.value && birthTime?.value);
            }
            delete experience.dataset.profileState;
            profileFlow.dataset.step = 'arrival';
            experience.dataset.state = 'arrival';
            if (experienceStatus instanceof HTMLElement) {
                experienceStatus.textContent = t('onb.arrival.editHint');
            }
        });
    }
    const observer = new MutationObserver(syncVesselBackVisibility);
    observer.observe(experience, { attributes: true, attributeFilter: ['class', 'data-state'] });
    observer.observe(vesselStage, { attributes: true, attributeFilter: ['class'] });
    const style = document.createElement('style');
    style.dataset.onboardingBackNavigation = 'true';
    style.textContent = `
    /* Every onboarding card after PLACE has a stable Back action. */
    .vessel-stage:not(.is-profile-flow) .vessel-actions {
      display: grid !important;
      grid-template-columns: minmax(112px, .84fr) minmax(158px, 1.16fr) !important;
      gap: 12px !important;
      width: min(86vw, 360px) !important;
      align-items: center !important;
    }

    .vessel-stage:not(.is-profile-flow) .vessel-actions .vessel-back,
    .vessel-stage:not(.is-profile-flow) .vessel-actions .confirm-vessel {
      width: 100% !important;
      min-width: 0 !important;
    }

    .vessel-stage:not(.is-profile-flow) .vessel-back {
      min-height: 44px !important;
      border: 1px solid rgba(248, 251, 252, .86) !important;
      color: rgba(250, 250, 247, .94) !important;
      background:
        linear-gradient(145deg, rgba(255,255,255,.08), rgba(255,255,255,.02) 48%, rgba(0,0,0,.07)),
        rgba(8, 12, 13, .40) !important;
      box-shadow:
        0 0 0 1px rgba(255,255,255,.06) inset,
        0 0 3px rgba(255,255,255,.78),
        0 0 18px rgba(235,244,246,.20),
        0 14px 38px rgba(0,0,0,.28) !important;
      backdrop-filter: blur(22px) saturate(1.12) !important;
      -webkit-backdrop-filter: blur(22px) saturate(1.12) !important;
    }

    .profile-complete-actions {
      display: grid;
      grid-template-columns: minmax(116px, 176px);
      justify-content: center;
      width: 100%;
      margin-top: 20px;
    }

    .profile-complete-actions .profile-secondary {
      width: 100%;
    }

    @media (max-width: 680px) {
      .vessel-stage:not(.is-profile-flow) .vessel-actions {
        grid-template-columns: minmax(104px, .82fr) minmax(150px, 1.18fr) !important;
        width: min(88vw, 330px) !important;
      }
    }
  `;
    document.head.append(style);
    syncVesselBackVisibility();
    window.addEventListener('pagehide', () => {
        observer.disconnect();
        identityBack?.removeEventListener('click', resetCoreVesselFocusWithoutLeavingCard, true);
        vesselBack?.removeEventListener('click', returnToPlace);
        style.remove();
    }, { once: true });
}
