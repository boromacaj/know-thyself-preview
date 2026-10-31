import { t } from './app/i18n/uiStrings.js?v=b5ef5ed';
const experience = document.getElementById('place-experience');
const vesselStage = document.getElementById('vessel-stage');
const confirmVessel = document.getElementById('confirm-vessel');
if (experience instanceof HTMLElement
    && vesselStage instanceof HTMLElement
    && confirmVessel instanceof HTMLButtonElement) {
    const profileFlow = vesselStage.querySelector('.profile-flow');
    const identityForm = vesselStage.querySelector('#profile-identity-form');
    const identityNext = vesselStage.querySelector('#profile-identity-next');
    const identityActions = identityForm?.querySelector('.profile-actions-single');
    const identityName = vesselStage.querySelector('#profile-birth-name');
    const vesselChoices = [...vesselStage.querySelectorAll('.vessel-choice')];
    if (profileFlow && identityForm && identityNext && identityActions) {
        let identityBack = identityActions.querySelector('.profile-identity-back');
        if (!identityBack) {
            identityBack = document.createElement('button');
            identityBack.type = 'button';
            identityBack.className = 'profile-secondary profile-identity-back';
            /* Stamped as well as set: this button is created here rather than being in
               the HTML, so the static table cannot reach it, and its label is never
               rewritten by the flow - which makes it safe to re-apply on a language
               change. See the `data-i18n` note in i18n/onboardingStaticTargets.ts. */
            identityBack.dataset.i18n = 'onb.action.back';
            identityBack.dataset.i18nAria = 'onb.vessel.backAria';
            identityBack.textContent = t('onb.action.back');
            identityBack.setAttribute('aria-label', t('onb.vessel.backAria'));
            identityActions.insertBefore(identityBack, identityNext);
        }
        const returnToVessel = () => {
            profileFlow.hidden = true;
            profileFlow.inert = true;
            vesselStage.classList.remove('is-profile-flow', 'is-confirmed');
            experience.classList.remove('profile-flow-active');
            experience.dataset.state = 'vessel';
            vesselStage.inert = false;
            vesselStage.setAttribute('aria-hidden', 'false');
            confirmVessel.disabled = false;
            confirmVessel.textContent = t('onb.vessel.confirm');
            for (const choice of vesselChoices)
                choice.disabled = false;
        };
        const resumeIdentityAfterVesselConfirm = () => {
            if (!profileFlow.hidden)
                return;
            window.setTimeout(() => {
                profileFlow.hidden = false;
                profileFlow.inert = false;
                profileFlow.dataset.step = 'identity';
                vesselStage.classList.add('is-profile-flow');
                experience.classList.add('profile-flow-active');
                experience.dataset.state = 'identity';
                window.setTimeout(() => identityName?.focus({ preventScroll: true }), 220);
            }, 140);
        };
        identityBack.addEventListener('click', returnToVessel);
        confirmVessel.addEventListener('click', resumeIdentityAfterVesselConfirm, { capture: true });
        const style = document.createElement('style');
        style.dataset.profileControlsPolish = 'true';
        style.textContent = `
      /* Identity gets the same explicit Back / Next navigation pattern as the
         later steps instead of leaving the user trapped in a one-way form. */
      .profile-panel-identity .profile-actions-single {
        grid-template-columns: minmax(104px, .82fr) minmax(142px, 1.18fr) !important;
        width: 100% !important;
      }

      /* All navigation controls use the same translucent glass material as the
         rest of onboarding. The vessel colour only appears when a forward action
         is actually available. */
      .profile-flow .profile-primary,
      .profile-flow .profile-secondary {
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        color: rgba(244, 243, 238, 0.72) !important;
        background:
          linear-gradient(145deg, rgba(255,255,255,.09), rgba(255,255,255,.025) 45%, rgba(0,0,0,.08)),
          rgba(8, 12, 13, 0.54) !important;
        box-shadow:
          0 0 0 1px rgba(255,255,255,.035) inset,
          0 14px 38px rgba(0,0,0,.3) !important;
        backdrop-filter: blur(24px) saturate(1.14) brightness(1.04) !important;
        -webkit-backdrop-filter: blur(24px) saturate(1.14) brightness(1.04) !important;
      }

      /* Back is always a neutral white-glass control because it does not depend
         on the chosen vessel or on form validity. */
      .profile-flow .profile-secondary {
        border-color: rgba(245, 248, 248, 0.78) !important;
        color: rgba(248, 248, 244, 0.9) !important;
        box-shadow:
          0 0 0 1px rgba(255,255,255,.08) inset,
          0 0 3px rgba(255,255,255,.72),
          0 0 18px rgba(235,244,246,.18),
          0 14px 38px rgba(0,0,0,.3) !important;
      }

      /* Disabled Next/Confirm stays neutral and glossy. Once the required fields
         are complete, its rim lights up in the selected vessel colour. */
      .profile-flow .profile-primary:disabled {
        opacity: 1 !important;
        border-color: rgba(255,255,255,.16) !important;
        color: rgba(244,243,238,.34) !important;
        background:
          linear-gradient(145deg, rgba(255,255,255,.065), rgba(255,255,255,.016) 48%, rgba(0,0,0,.1)),
          rgba(7, 11, 12, .44) !important;
        box-shadow:
          0 0 0 1px rgba(255,255,255,.025) inset,
          0 13px 34px rgba(0,0,0,.26) !important;
      }

      .profile-flow .profile-primary:not(:disabled) {
        border-color: rgba(var(--profile-energy-soft-rgb), .94) !important;
        color: rgba(250,249,245,.96) !important;
        background:
          radial-gradient(circle at 20% 18%, rgba(255,255,255,.1), transparent 31%),
          linear-gradient(145deg, rgba(255,255,255,.08), rgba(var(--profile-energy-rgb),.03) 48%, rgba(0,0,0,.08)),
          rgba(7, 11, 12, .5) !important;
        box-shadow:
          0 0 0 1px rgba(var(--profile-energy-soft-rgb), .12) inset,
          0 0 3px rgba(248,252,255,.82),
          0 0 13px rgba(var(--profile-energy-soft-rgb), .5),
          0 0 32px rgba(var(--profile-energy-rgb), .34),
          0 0 64px rgba(var(--profile-energy-rgb), .16),
          0 14px 38px rgba(0,0,0,.28) !important;
      }

      /* The keyboard may meet the time card, but the card itself must remain a
         complete rounded glass capsule rather than becoming square at the bottom. */
      .profile-panel-arrival.time-keyboard-active .arrival-time-picker {
        border-bottom-left-radius: 22px !important;
        border-bottom-right-radius: 22px !important;
      }

      @media (max-width: 680px) {
        .profile-panel-identity .profile-actions-single {
          grid-template-columns: minmax(104px, .8fr) minmax(142px, 1.2fr) !important;
        }
      }
    `;
        document.head.append(style);
        window.addEventListener('pagehide', () => {
            identityBack?.removeEventListener('click', returnToVessel);
            confirmVessel.removeEventListener('click', resumeIdentityAfterVesselConfirm, true);
            style.remove();
        }, { once: true });
    }
}
