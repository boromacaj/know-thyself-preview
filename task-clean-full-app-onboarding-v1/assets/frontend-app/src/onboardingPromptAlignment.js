const vesselStage = document.getElementById('vessel-stage');
if (vesselStage instanceof HTMLElement) {
    const style = document.createElement('style');
    style.dataset.onboardingPromptAlignment = 'true';
    style.textContent = `
    /* One prompt template across VESSEL, IDENTITY and ARRIVAL: the question's
       bottom edge sits the same fixed distance above the visible Earth rim. */
    .vessel-stage {
      --kt-onboarding-prompt-gap: 24px;
    }

    .vessel-stage:not(.is-profile-flow) .vessel-copy {
      top: calc(
        var(--vessel-earth-center-y, 50%)
        - (var(--vessel-earth-diameter, 30.4dvh) / 2)
        - var(--kt-onboarding-prompt-gap)
      ) !important;
      left: 50% !important;
      width: min(86vw, 500px) !important;
      margin: 0 !important;
      transform: translate(-50%, -100%) !important;
    }

    .vessel-stage:not(.is-profile-flow) .vessel-question {
      margin: 0 !important;
    }

    .profile-flow .kt-prompt-layer .profile-prompt {
      top: calc(
        var(--kt-earth-rim-top-y, 34%)
        - var(--kt-onboarding-prompt-gap)
      ) !important;
      width: min(86vw, 500px) !important;
      margin: 0 !important;
      transform: translate(-50%, -100%) !important;
    }
  `;
    document.head.append(style);
    window.addEventListener('pagehide', () => {
        style.remove();
    }, { once: true });
}
export {};
