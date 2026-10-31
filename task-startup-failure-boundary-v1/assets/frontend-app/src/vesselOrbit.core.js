import { t } from './app/i18n/uiStrings.js?v=2ea79e9';
import { birthTimeIsAnswered, readBirthTimeAnswer } from './birthTimeInput.js?v=2ea79e9';
const experience = document.getElementById('place-experience');
const earthMap = document.getElementById('earth-map');
const vesselStage = document.getElementById('vessel-stage');
const vesselOrbit = document.getElementById('vessel-orbit');
if (experience instanceof HTMLElement && vesselStage instanceof HTMLElement && vesselOrbit instanceof HTMLElement) {
    const vesselChoices = [...vesselOrbit.querySelectorAll('.vessel-choice')];
    const vesselActions = vesselStage.querySelector('.vessel-actions');
    const vesselUndefined = document.getElementById('vessel-undefined');
    const confirmVessel = document.getElementById('confirm-vessel');
    const experienceStatus = document.getElementById('experience-status');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const autoSpeedDegreesPerSecond = 4.2;
    const dragThresholdDegrees = 3;
    const maxReleaseVelocityDegreesPerSecond = 90;
    const orbitTiltXDegrees = 62;
    const orbitPerspectivePixels = 760;
    // Keep the focused atmospheric rim just inside the previous fit so its bright
    // edge hugs the visible live globe rather than floating outside it.
    const canonicalEarthViewportHeightRatio = 0.304;
    let orbitAngleDegrees = -22;
    let orbitFrame = 0;
    let lastFrameTime = performance.now();
    let activePointerId = null;
    let dragging = false;
    let lastPointerAngleDegrees = 0;
    let lastPointerTime = 0;
    let dragTravelDegrees = 0;
    let releaseVelocityDegreesPerSecond = 0;
    let suppressClickUntil = 0;
    let focusedChoice = null;
    let profileFlowStarted = false;
    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'vessel-back';
    backButton.textContent = t('onb.action.back');
    backButton.hidden = true;
    if (vesselActions instanceof HTMLElement && confirmVessel instanceof HTMLButtonElement) {
        vesselActions.insertBefore(backButton, confirmVessel);
    }
    // Replace the font male glyph with a deliberately simple custom mark so the
    // arrow reads as one clean diagonal stroke with a minimal open arrow head.
    const maleChoice = vesselChoices.find((choice) => choice.dataset.vessel === 'male');
    if (maleChoice) {
        const symbol = maleChoice.querySelector('.vessel-symbol');
        if (symbol) {
            symbol.innerHTML = `
        <svg class="vessel-glyph vessel-glyph-male" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <circle cx="18" cy="27" r="10"></circle>
          <path d="M25 20 L36 9"></path>
          <path d="M29 9 H36 V16"></path>
        </svg>
      `;
        }
    }
    // The third orbit option is intentionally neutral rather than a gender glyph:
    // a clean circle means "do not define". Keep the legacy standalone undefined
    // action in the DOM for controller compatibility, but do not show it twice.
    const undefinedChoice = vesselChoices.find((choice) => choice.dataset.vessel === 'nonbinary');
    if (undefinedChoice) {
        undefinedChoice.dataset.vessel = 'undefined';
        undefinedChoice.setAttribute('aria-label', t('onb.vessel.undefined'));
        const symbol = undefinedChoice.querySelector('.vessel-symbol');
        const label = undefinedChoice.querySelector('.vessel-label');
        if (symbol)
            symbol.textContent = '○';
        if (label) {
            /* Stamped as well as set: this label is written here rather than in the
               HTML, so the static table cannot reach it and a language switch left it
               reading „Do not define" beside two siblings that had switched. */
            label.dataset.i18n = 'onb.vessel.undefined';
            label.textContent = t('onb.vessel.undefined');
        }
        undefinedChoice.dataset.i18nAria = 'onb.vessel.undefined';
    }
    if (vesselUndefined instanceof HTMLButtonElement)
        vesselUndefined.hidden = true;
    // Steps 03 and 04 deliberately live in this continuation layer so the exact
    // approved live-Earth + vessel rim stays mounted. We only replace the controls
    // beneath it; the user never sees a second Earth or a disconnected form page.
    const profileFlow = document.createElement('section');
    profileFlow.className = 'profile-flow';
    profileFlow.hidden = true;
    profileFlow.inert = true;
    profileFlow.dataset.step = 'identity';
    profileFlow.setAttribute('aria-label', t('onb.flow.aria'));
    profileFlow.innerHTML = `
    <form class="profile-panel profile-panel-identity" id="profile-identity-form" autocomplete="on">
      <p class="profile-kicker" data-i18n="onb.identity.kicker">${t('onb.identity.kicker')}</p>
      <h2 data-i18n="onb.identity.title">${t('onb.identity.title')}</h2>
      <div class="profile-fields profile-fields-name">
        <label class="profile-field">
          <span class="sr-only" data-i18n="onb.identity.birthName">${t('onb.identity.birthName')}</span>
          <input id="profile-birth-name" name="birth-name" type="text" autocomplete="given-name" data-i18n-placeholder="onb.identity.namePlaceholder" placeholder="${t('onb.identity.namePlaceholder')}" required />
        </label>
        <label class="profile-field">
          <span class="sr-only" data-i18n="onb.identity.birthSurname">${t('onb.identity.birthSurname')}</span>
          <input id="profile-birth-surname" name="birth-surname" type="text" autocomplete="family-name" data-i18n-placeholder="onb.identity.surnamePlaceholder" placeholder="${t('onb.identity.surnamePlaceholder')}" required />
        </label>
      </div>
      <div class="profile-actions profile-actions-single">
        <button class="profile-primary" id="profile-identity-next" type="submit" disabled data-i18n="onb.action.next">${t('onb.action.next')}</button>
      </div>
    </form>

    <form class="profile-panel profile-panel-arrival" id="profile-arrival-form">
      <p class="profile-kicker" data-i18n="onb.arrival.kicker">${t('onb.arrival.kicker')}</p>
      <h2 data-i18n="onb.arrival.title">${t('onb.arrival.title')}</h2>
      <div class="profile-fields profile-fields-arrival">
        <label class="profile-field profile-field-dated">
          <span class="profile-field-caption" data-i18n="onb.arrival.date">${t('onb.arrival.date')}</span>
          <input id="profile-birth-date" name="birth-date" type="date" autocomplete="bday" required />
        </label>
        <label class="profile-field profile-field-dated">
          <span class="profile-field-caption" data-i18n="onb.arrival.time">${t('onb.arrival.time')}</span>
          <input id="profile-birth-time" name="birth-time" type="time" required />
        </label>
      </div>
      <div class="profile-actions">
        <button class="profile-secondary" id="profile-arrival-back" type="button" data-i18n="onb.action.back">${t('onb.action.back')}</button>
        <button class="profile-primary" id="profile-create" type="submit" disabled>${t('onb.action.createProfile')}</button>
      </div>
    </form>

    <div class="profile-panel profile-panel-complete" id="profile-complete" aria-live="polite">
      <p class="profile-kicker" data-i18n="onb.complete.kicker">${t('onb.complete.kicker')}</p>
      <h2 data-i18n="onb.complete.title">${t('onb.complete.title')}</h2>
      <p class="profile-complete-copy" data-i18n="onb.complete.copy">${t('onb.complete.copy')}</p>
    </div>
  `;
    vesselStage.append(profileFlow);
    const identityForm = profileFlow.querySelector('#profile-identity-form');
    const birthNameInput = profileFlow.querySelector('#profile-birth-name');
    const birthSurnameInput = profileFlow.querySelector('#profile-birth-surname');
    const identityNextButton = profileFlow.querySelector('#profile-identity-next');
    const arrivalForm = profileFlow.querySelector('#profile-arrival-form');
    const birthDateInput = profileFlow.querySelector('#profile-birth-date');
    const birthTimeInput = profileFlow.querySelector('#profile-birth-time');
    const arrivalBackButton = profileFlow.querySelector('#profile-arrival-back');
    const createProfileButton = profileFlow.querySelector('#profile-create');
    const depthStyle = document.createElement('style');
    depthStyle.dataset.vesselOrbit3d = 'true';
    depthStyle.textContent = `
    /* The vessel stage is anchored to the actual live-map viewport, not to the
       document flow. The orbit and focused vessel therefore share the Earth's
       exact visual centre on every responsive size. */
    .vessel-stage .vessel-content {
      position: absolute;
      inset: 0;
      display: block;
      width: 100%;
      max-height: none;
    }

    .vessel-stage .vessel-copy {
      position: absolute;
      top: max(calc(var(--safe-top) + 22px), 5vh);
      left: 50%;
      width: min(88vw, 620px);
      transform: translateX(-50%);
    }

    /* Production-clean vessel copy: keep only the small guiding question.
       Step labels and the oversized prototype title stay out of the visual UI. */
    .vessel-stage .vessel-kicker,
    .vessel-stage .vessel-copy h1,
    .profile-flow .profile-kicker {
      display: none !important;
    }

    .vessel-stage .vessel-question {
      margin: 0;
    }

    .vessel-orbit[data-motion="3d-x-orbit-auto-rotate-drag"] {
      position: absolute;
      top: var(--vessel-earth-center-y, 50%);
      left: var(--vessel-earth-center-x, 50%);
      width: min(78vw, 460px);
      margin: 0 !important;
      perspective: ${orbitPerspectivePixels}px;
      perspective-origin: 50% 50%;
      transform: translate(-50%, -50%);
      transform-style: preserve-3d;
    }

    .vessel-stage .vessel-actions {
      position: absolute;
      bottom: max(calc(var(--safe-bottom) + 22px), 4vh);
      left: 50%;
      margin: 0 !important;
      transform: translateX(-50%);
    }

    .vessel-orbit[data-motion="3d-x-orbit-auto-rotate-drag"]::before {
      inset: 26% 10%;
      transform: rotateX(${orbitTiltXDegrees}deg);
      transform-style: preserve-3d;
      border-color: rgba(232, 241, 242, 0.07);
      box-shadow:
        0 0 70px rgba(206, 225, 227, 0.025),
        0 0 0 1px rgba(244, 241, 233, 0.01) inset;
      transition: opacity 650ms ease, transform 900ms cubic-bezier(0.16, 0.72, 0.22, 1);
    }

    .vessel-orbit[data-motion="3d-x-orbit-auto-rotate-drag"]::after {
      opacity: 0.34;
      transition: opacity 500ms ease;
    }

    .vessel-orbit[data-motion="3d-x-orbit-auto-rotate-drag"] .vessel-choice {
      --vessel-energy-rgb: 248, 250, 252;
      --vessel-energy-soft-rgb: 230, 238, 242;
      transform-style: preserve-3d;
      backface-visibility: hidden;
      transition:
        transform 760ms cubic-bezier(0.16, 0.72, 0.22, 1),
        opacity 520ms ease,
        filter 520ms ease;
    }

    .vessel-orbit[data-motion="3d-x-orbit-auto-rotate-drag"] .vessel-choice-male {
      --vessel-energy-rgb: 104, 184, 255;
      --vessel-energy-soft-rgb: 182, 224, 255;
    }

    .vessel-orbit[data-motion="3d-x-orbit-auto-rotate-drag"] .vessel-choice-female {
      --vessel-energy-rgb: 255, 118, 154;
      --vessel-energy-soft-rgb: 255, 164, 184;
    }

    .vessel-orbit[data-motion="3d-x-orbit-auto-rotate-drag"] .vessel-choice-nonbinary {
      --vessel-energy-rgb: 250, 252, 255;
      --vessel-energy-soft-rgb: 255, 255, 255;
    }

    .vessel-orbit[data-motion="3d-x-orbit-auto-rotate-drag"]:not(.is-focused).is-dragging .vessel-choice {
      transition: opacity 120ms linear, filter 120ms linear;
    }

    /* Softer soap/water material. The colour belongs mainly to the rim/bloom;
       the body remains almost colourless so the screen stays minimal. */
    .vessel-orbit[data-motion="3d-x-orbit-auto-rotate-drag"] .vessel-symbol {
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(var(--vessel-energy-rgb), 0.34);
      color: rgba(var(--vessel-energy-soft-rgb), 0.92);
      background:
        radial-gradient(circle at 29% 22%, rgba(255, 255, 255, 0.28), transparent 10%),
        radial-gradient(circle at 73% 72%, rgba(var(--vessel-energy-soft-rgb), 0.045), transparent 28%),
        radial-gradient(circle at 48% 44%, rgba(246, 250, 250, 0.045), rgba(204, 226, 229, 0.018) 42%, rgba(3, 6, 7, 0.105) 76%),
        rgba(5, 9, 10, 0.095);
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.038) inset,
        7px 11px 24px rgba(0, 0, 0, 0.14) inset,
        -7px -9px 22px rgba(238, 252, 253, 0.028) inset,
        0 16px 48px rgba(0, 0, 0, 0.24),
        0 0 24px rgba(var(--vessel-energy-rgb), 0.18),
        0 0 58px rgba(var(--vessel-energy-rgb), 0.105);
      backdrop-filter: blur(9px) saturate(1.04);
      -webkit-backdrop-filter: blur(9px) saturate(1.04);
    }

    .vessel-orbit[data-motion="3d-x-orbit-auto-rotate-drag"] .vessel-glyph {
      position: relative;
      z-index: 2;
      display: block;
      width: 34%;
      height: 34%;
      overflow: visible;
      fill: none;
      stroke: currentColor;
      stroke-width: 2.6;
      stroke-linecap: round;
      stroke-linejoin: round;
      filter: drop-shadow(0 0 6px rgba(var(--vessel-energy-rgb), 0.12));
    }

    .vessel-orbit[data-motion="3d-x-orbit-auto-rotate-drag"] .vessel-symbol::before {
      position: absolute;
      inset: 3.5%;
      border: 1px solid rgba(var(--vessel-energy-soft-rgb), 0.095);
      border-radius: 50%;
      content: "";
      pointer-events: none;
      background:
        conic-gradient(
          from 205deg,
          transparent 0 17%,
          rgba(var(--vessel-energy-rgb), 0.14) 21%,
          rgba(255, 255, 255, 0.21) 26%,
          transparent 33% 65%,
          rgba(var(--vessel-energy-soft-rgb), 0.11) 72%,
          transparent 83% 100%
        );
      -webkit-mask: radial-gradient(circle, transparent 0 84%, #000 86% 100%);
      mask: radial-gradient(circle, transparent 0 84%, #000 86% 100%);
      opacity: 0.68;
    }

    .vessel-orbit[data-motion="3d-x-orbit-auto-rotate-drag"] .vessel-symbol::after {
      position: absolute;
      inset: 7% 12% auto;
      height: 30%;
      border-radius: 50%;
      content: "";
      pointer-events: none;
      opacity: 0.46;
      transform: rotate(-13deg);
      background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.27), rgba(255, 255, 255, 0.038) 48%, transparent 72%);
      filter: blur(0.8px);
    }

    .vessel-orbit[data-motion="3d-x-orbit-auto-rotate-drag"] .vessel-choice:hover .vessel-symbol,
    .vessel-orbit[data-motion="3d-x-orbit-auto-rotate-drag"] .vessel-choice:focus-visible .vessel-symbol,
    .vessel-orbit[data-motion="3d-x-orbit-auto-rotate-drag"] .vessel-choice[aria-pressed="true"] .vessel-symbol {
      border-color: rgba(var(--vessel-energy-rgb), 0.58);
      color: rgba(var(--vessel-energy-soft-rgb), 0.98);
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.055) inset,
        8px 12px 25px rgba(0, 0, 0, 0.14) inset,
        -8px -10px 24px rgba(242, 253, 254, 0.03) inset,
        0 18px 54px rgba(0, 0, 0, 0.25),
        0 0 32px rgba(var(--vessel-energy-rgb), 0.27),
        0 0 76px rgba(var(--vessel-energy-rgb), 0.16);
    }

    .vessel-orbit[data-motion="3d-x-orbit-auto-rotate-drag"] .vessel-choice[aria-pressed="true"] .vessel-label {
      color: rgba(var(--vessel-energy-soft-rgb), 0.92);
    }

    .vessel-orbit.is-focused {
      cursor: default;
    }

    .vessel-orbit.is-focused::before,
    .vessel-orbit.is-focused::after {
      opacity: 0;
    }

    .vessel-orbit.is-focused .vessel-choice:not(.is-focused) {
      opacity: 0 !important;
      filter: blur(10px) brightness(0.55) !important;
      pointer-events: none;
      transform:
        translate(-50%, -50%)
        translate3d(var(--focus-away-x, 0px), var(--focus-away-y, 0px), -160px)
        scale(0.54) !important;
    }

    /* Focused state: the selector is no longer a separate bubble. Its diameter
       is calculated from the live map viewport and equals the projected globe. */
    .vessel-orbit.is-focused .vessel-choice.is-focused {
      z-index: 400 !important;
      width: var(--vessel-earth-diameter, 30.4dvh) !important;
      opacity: 1 !important;
      filter: brightness(1.03) blur(0) !important;
      pointer-events: auto;
      transform: translate(-50%, -50%) translate3d(0, 0, 0) scale(1) !important;
    }

    .vessel-orbit.is-focused .vessel-choice.is-focused .vessel-symbol {
      border-color: rgba(242, 250, 255, 0.94) !important;
      color: rgba(var(--vessel-energy-soft-rgb), 0.98) !important;
      background:
        radial-gradient(circle at 29% 22%, rgba(255, 255, 255, 0.17), transparent 15%),
        radial-gradient(circle at 72% 70%, rgba(var(--vessel-energy-soft-rgb), 0.045), transparent 34%),
        radial-gradient(circle at 50% 48%, rgba(255, 255, 255, 0.018), rgba(255, 255, 255, 0.008) 30%, rgba(4, 7, 8, 0.018) 72%, rgba(3, 6, 7, 0.034) 100%) !important;
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.3) inset,
        0 0 3px rgba(255, 255, 255, 0.98),
        0 0 8px rgba(228, 244, 255, 0.86),
        0 0 22px rgba(var(--vessel-energy-rgb), 0.62),
        0 0 52px rgba(var(--vessel-energy-rgb), 0.32),
        0 0 92px rgba(var(--vessel-energy-rgb), 0.15) !important;
      backdrop-filter: blur(1.3px) saturate(1.035) brightness(1.035) !important;
      -webkit-backdrop-filter: blur(1.3px) saturate(1.035) brightness(1.035) !important;
    }

    .vessel-orbit.is-focused .vessel-choice.is-focused .vessel-glyph {
      width: 36%;
      height: 36%;
      stroke-width: 2.4;
      filter: drop-shadow(0 0 8px rgba(var(--vessel-energy-rgb), 0.2));
    }

    .vessel-orbit.is-focused .vessel-choice.is-focused .vessel-symbol::before {
      inset: 0.45% !important;
      border-color: rgba(248, 252, 255, 0.52) !important;
      opacity: 0.94 !important;
      -webkit-mask: radial-gradient(circle, transparent 0 94.7%, #000 96.1% 100%) !important;
      mask: radial-gradient(circle, transparent 0 94.7%, #000 96.1% 100%) !important;
    }

    .vessel-orbit.is-focused .vessel-choice.is-focused .vessel-symbol::after {
      opacity: 0.08 !important;
    }

    /* Take the label out of the button flow while focused. That keeps the
       symbol circle itself — not symbol+label together — centered on the Earth. */
    .vessel-orbit.is-focused .vessel-choice.is-focused .vessel-label {
      position: absolute;
      top: calc(100% + 24px);
      left: 50%;
      width: max-content;
      margin: 0 !important;
      color: rgba(var(--vessel-energy-soft-rgb), 0.98);
      font-size: 13px;
      font-weight: 650;
      line-height: 1;
      letter-spacing: 0.27em;
      text-shadow: 0 0 20px rgba(var(--vessel-energy-rgb), 0.18);
      transform: translateX(-50%);
    }

    /* Only while a vessel is focused, lift the real Earth out of the dark
       orbit veil so the globe remains visible through the atmospheric rim. */
    .place-experience.vessel-focused .earth-map {
      opacity: 0.8 !important;
    }

    .place-experience.vessel-focused .vessel-stage {
      background:
        radial-gradient(circle at 50% 50%, rgba(4, 7, 8, 0.01) 0 16%, rgba(4, 7, 7, 0.24) 44%, rgba(2, 4, 4, 0.74) 100%),
        linear-gradient(to bottom, rgba(2, 5, 6, 0.1), rgba(2, 4, 4, 0.42));
    }

    .vessel-actions.is-vessel-focused {
      grid-template-columns: repeat(2, minmax(112px, auto));
      gap: 12px;
      align-items: center;
      justify-content: center;
    }

    .vessel-actions.is-vessel-focused .vessel-undefined {
      display: none;
    }

    .vessel-back {
      min-width: 128px;
      min-height: 43px;
      padding: 0 20px;
      border: 1px solid rgba(239, 246, 244, 0.22);
      border-radius: 999px;
      color: rgba(239, 243, 238, 0.72);
      font-size: 10px;
      font-weight: 640;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      cursor: pointer;
      background: rgba(6, 10, 10, 0.22);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      transition: border-color 240ms ease, color 240ms ease, background 240ms ease, transform 240ms ease;
    }

    .vessel-back:hover,
    .vessel-back:focus-visible {
      outline: 0;
      color: rgba(250, 248, 240, 0.96);
      border-color: rgba(216, 195, 142, 0.48);
      background: rgba(216, 195, 142, 0.07);
      transform: translateY(-1px);
    }

    /* IDENTITY + ARRIVAL — same Earth, same atmospheric rim, new controls. */
    .vessel-stage.is-profile-flow .vessel-copy,
    .vessel-stage.is-profile-flow .vessel-actions {
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
    }

    .vessel-stage.is-profile-flow .vessel-orbit {
      pointer-events: none;
    }

    .vessel-stage.is-profile-flow .vessel-orbit.is-focused .vessel-choice.is-focused .vessel-label {
      opacity: 0 !important;
      pointer-events: none;
    }

    .vessel-stage.is-profile-flow .vessel-orbit.is-focused .vessel-choice.is-focused .vessel-symbol {
      color: transparent !important;
    }

    .vessel-stage.is-profile-flow .vessel-orbit.is-focused .vessel-choice.is-focused .vessel-glyph {
      opacity: 0;
    }

    .profile-flow {
      --profile-energy-rgb: 244, 241, 233;
      --profile-energy-soft-rgb: 244, 241, 233;
      position: absolute;
      inset: 0;
      z-index: 520;
      display: grid;
      align-items: end;
      justify-items: center;
      overflow-y: auto;
      padding:
        calc(var(--safe-top) + 16px)
        max(18px, var(--safe-right))
        max(calc(var(--safe-bottom) + 24px), 4vh)
        max(18px, var(--safe-left));
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
      overscroll-behavior: contain;
      transition: opacity 620ms ease, visibility 0s linear 620ms;
    }

    .vessel-stage.is-profile-flow .profile-flow {
      visibility: visible;
      opacity: 1;
      pointer-events: none;
      transition-delay: 0s;
    }

    .profile-panel {
      grid-area: 1 / 1;
      width: min(88vw, 510px);
      padding: 0 0 2px;
      text-align: center;
      opacity: 0;
      pointer-events: none;
      transform: translateY(18px);
      transition:
        opacity 420ms ease,
        transform 560ms cubic-bezier(0.16, 0.72, 0.22, 1);
    }

    .profile-flow[data-step="identity"] .profile-panel-identity,
    .profile-flow[data-step="arrival"] .profile-panel-arrival,
    .profile-flow[data-step="complete"] .profile-panel-complete {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }

    .profile-kicker {
      margin: 0 0 9px;
      color: rgba(var(--profile-energy-soft-rgb), 0.78);
      font-size: 9px;
      font-weight: 680;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      text-shadow: 0 0 18px rgba(var(--profile-energy-rgb), 0.12);
    }

    .profile-panel h2 {
      margin: 0;
      color: rgba(248, 247, 242, 0.98);
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(30px, 7vw, 42px);
      font-weight: 400;
      line-height: 1.04;
      letter-spacing: -0.025em;
      text-wrap: balance;
      text-shadow: 0 4px 32px rgba(0, 0, 0, 0.62);
    }

    .profile-fields {
      display: grid;
      gap: 10px;
      width: 100%;
      margin-top: 20px;
    }

    .profile-field {
      position: relative;
      display: grid;
      width: 100%;
      min-height: 56px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 999px;
      background: rgba(7, 10, 10, 0.76);
      box-shadow: 0 16px 42px rgba(0, 0, 0, 0.24);
      backdrop-filter: blur(20px) saturate(1.08);
      -webkit-backdrop-filter: blur(20px) saturate(1.08);
      transition: border-color 220ms ease, box-shadow 260ms ease, background 220ms ease;
    }

    .profile-field:focus-within {
      border-color: rgba(var(--profile-energy-soft-rgb), 0.66);
      background: rgba(7, 10, 10, 0.9);
      box-shadow:
        0 16px 42px rgba(0, 0, 0, 0.28),
        0 0 0 1px rgba(var(--profile-energy-rgb), 0.08) inset,
        0 0 28px rgba(var(--profile-energy-rgb), 0.11);
    }

    .profile-field input {
      width: 100%;
      min-width: 0;
      min-height: 56px;
      padding: 0 20px;
      border: 0;
      outline: 0;
      color: rgba(248, 247, 242, 0.96);
      font-size: 14px;
      background: transparent;
      color-scheme: dark;
    }

    .profile-field input::placeholder {
      color: rgba(244, 241, 233, 0.42);
    }

    .profile-field-dated {
      grid-template-columns: auto minmax(0, 1fr);
      align-items: center;
      padding-left: 19px;
    }

    .profile-field-dated input {
      min-height: 54px;
      padding-left: 14px;
      text-align: right;
    }

    .profile-field-caption {
      color: rgba(244, 241, 233, 0.47);
      font-size: 10px;
      font-weight: 620;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .profile-actions {
      display: grid;
      grid-template-columns: minmax(112px, auto) minmax(150px, auto);
      gap: 11px;
      justify-content: center;
      margin-top: 16px;
    }

    .profile-actions-single {
      grid-template-columns: minmax(150px, auto);
    }

    .profile-primary,
    .profile-secondary {
      min-height: 44px;
      padding: 0 22px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 680;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      cursor: pointer;
      transition: opacity 220ms ease, transform 220ms ease, border-color 220ms ease, background 220ms ease;
    }

    .profile-primary {
      border: 1px solid rgba(244, 241, 233, 0.76);
      color: #11130f;
      background: #eee9dc;
      box-shadow: 0 12px 34px rgba(0, 0, 0, 0.22);
    }

    .profile-secondary {
      border: 1px solid rgba(239, 246, 244, 0.2);
      color: rgba(239, 243, 238, 0.72);
      background: rgba(6, 10, 10, 0.3);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }

    .profile-primary:hover:not(:disabled),
    .profile-primary:focus-visible:not(:disabled),
    .profile-secondary:hover,
    .profile-secondary:focus-visible {
      outline: 0;
      transform: translateY(-1px);
    }

    .profile-primary:focus-visible,
    .profile-secondary:focus-visible {
      box-shadow: 0 0 0 2px rgba(var(--profile-energy-soft-rgb), 0.36);
    }

    .profile-primary:disabled {
      opacity: 0.28;
      cursor: default;
    }

    .profile-complete-copy {
      max-width: 390px;
      margin: 13px auto 0;
      color: rgba(235, 231, 221, 0.56);
      font-family: Georgia, "Times New Roman", serif;
      font-size: 14px;
      font-style: italic;
      line-height: 1.45;
      text-wrap: balance;
    }

    @media (max-width: 680px) {
      .vessel-stage .vessel-copy {
        top: max(calc(var(--safe-top) + 18px), 3vh);
        width: min(90vw, 560px);
      }

      .vessel-orbit[data-motion="3d-x-orbit-auto-rotate-drag"] {
        width: min(82vw, 350px);
      }

      .vessel-stage .vessel-actions {
        bottom: max(calc(var(--safe-bottom) + 18px), 2.8vh);
      }

      .vessel-orbit.is-focused .vessel-choice.is-focused {
        transform: translate(-50%, -50%) translate3d(0, 0, 0) scale(1) !important;
      }

      .vessel-orbit.is-focused .vessel-choice.is-focused .vessel-label {
        top: calc(100% + 22px);
        font-size: 13px;
      }

      .vessel-actions.is-vessel-focused {
        grid-template-columns: repeat(2, minmax(105px, 1fr));
        width: min(86vw, 300px);
      }

      .vessel-back,
      .vessel-actions.is-vessel-focused .confirm-vessel {
        width: 100%;
        min-width: 0;
      }

      .profile-flow {
        padding-right: max(16px, var(--safe-right));
        padding-bottom: max(calc(var(--safe-bottom) + 18px), 2.4vh);
        padding-left: max(16px, var(--safe-left));
      }

      .profile-panel {
        width: min(92vw, 430px);
      }

      .profile-panel h2 {
        font-size: clamp(29px, 8.7vw, 38px);
      }

      .profile-fields {
        margin-top: 16px;
      }

      .profile-field,
      .profile-field input {
        min-height: 52px;
      }

      .profile-field-dated input {
        min-height: 50px;
      }

      .profile-actions {
        grid-template-columns: minmax(104px, 0.8fr) minmax(142px, 1.2fr);
        width: 100%;
        margin-top: 13px;
      }

      .profile-actions-single {
        grid-template-columns: minmax(150px, 190px);
      }
    }

    @media (max-height: 690px) {
      .vessel-stage .vessel-copy {
        top: max(calc(var(--safe-top) + 12px), 2vh);
      }

      .vessel-orbit[data-motion="3d-x-orbit-auto-rotate-drag"] {
        width: min(66vw, 276px);
      }

      .vessel-stage .vessel-actions {
        bottom: max(calc(var(--safe-bottom) + 12px), 2vh);
      }

      .profile-flow {
        padding-bottom: max(calc(var(--safe-bottom) + 10px), 1.5vh);
      }

      .profile-kicker {
        margin-bottom: 6px;
      }

      .profile-panel h2 {
        font-size: clamp(25px, 5.7vh, 34px);
      }

      .profile-fields {
        gap: 8px;
        margin-top: 12px;
      }

      .profile-field,
      .profile-field input {
        min-height: 46px;
      }

      .profile-field-dated input {
        min-height: 44px;
      }

      .profile-actions {
        margin-top: 10px;
      }

      .profile-primary,
      .profile-secondary {
        min-height: 39px;
      }
    }
  `;
    document.head.append(depthStyle);
    vesselOrbit.style.perspective = `${orbitPerspectivePixels}px`;
    vesselOrbit.style.perspectiveOrigin = '50% 50%';
    vesselOrbit.style.transformStyle = 'preserve-3d';
    const syncEarthAnchor = () => {
        /* THE KEYBOARD MUST NOT BE ABLE TO MOVE THE EARTH ANCHOR.
           This runs from a ResizeObserver on the stage, the orbit and the map, so it
           fires while the soft keyboard is opening - and it then rewrites the anchor
           from a map box that the keyboard has reshaped.
    
           That is what broke the clock step. The glow rim is positioned from
           --vessel-earth-center-x/y and sized from --kt-vessel-glow-diameter, and
           calibrateGlowToLimb in vesselArrowOnlyPolish DELIBERATELY refuses to
           recompute that diameter while the keyboard is open, so the rim keeps its
           resting size. With this function left unguarded the rim's POSITION kept
           following the keyboard while its SIZE stayed frozen: half the geometry
           live, half of it pinned. The centre moved up as the box got shorter and
           the rim sailed off the planet.
    
           Freezing both together is the whole fix. The planet is still visible
           behind the keyboard and has not moved, so the resting anchor remains the
           correct answer; the observer fires again when the keyboard closes and the
           box returns, which re-syncs it. This also keeps the arrows and the prompt,
           which read the same variables, from drifting mid-typing. */
        if (experience.dataset.keyboardOpen === 'true')
            return;
        const stageBounds = vesselStage.getBoundingClientRect();
        if (stageBounds.width <= 0 || stageBounds.height <= 0)
            return;
        const mapBounds = earthMap instanceof HTMLElement
            ? earthMap.getBoundingClientRect()
            : stageBounds;
        const centerX = mapBounds.left - stageBounds.left + (mapBounds.width / 2);
        const centerY = mapBounds.top - stageBounds.top + (mapBounds.height / 2);
        const earthDiameter = Math.min(mapBounds.height * canonicalEarthViewportHeightRatio, mapBounds.width * 0.92);
        vesselStage.style.setProperty('--vessel-earth-center-x', `${centerX.toFixed(2)}px`);
        vesselStage.style.setProperty('--vessel-earth-center-y', `${centerY.toFixed(2)}px`);
        vesselStage.style.setProperty('--vessel-earth-diameter', `${earthDiameter.toFixed(2)}px`);
    };
    const normalizeAngleDelta = (degrees) => {
        let normalized = degrees % 360;
        if (normalized > 180)
            normalized -= 360;
        if (normalized < -180)
            normalized += 360;
        return normalized;
    };
    const pointerAngleDegrees = (event) => {
        const bounds = vesselOrbit.getBoundingClientRect();
        const centerX = bounds.left + (bounds.width / 2);
        const centerY = bounds.top + (bounds.height / 2);
        return Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI);
    };
    const renderOrbit = () => {
        const bounds = vesselOrbit.getBoundingClientRect();
        if (bounds.width <= 0 || bounds.height <= 0 || vesselChoices.length === 0)
            return;
        const radius = Math.min(bounds.width, bounds.height) * 0.34;
        const spacingDegrees = 360 / vesselChoices.length;
        const tiltRadians = orbitTiltXDegrees * (Math.PI / 180);
        const tiltCos = Math.cos(tiltRadians);
        const tiltSin = Math.sin(tiltRadians);
        vesselChoices.forEach((choice, index) => {
            const angleDegrees = orbitAngleDegrees + (spacingDegrees * index);
            const radians = angleDegrees * (Math.PI / 180);
            const localX = Math.cos(radians) * radius;
            const localY = Math.sin(radians) * radius;
            const x = localX;
            const y = localY * tiltCos;
            const z = localY * tiltSin;
            const depth = Math.max(0, Math.min(1, (z / radius + 1) / 2));
            const scale = 0.91 + (depth * 0.16);
            const opacity = 0.48 + (depth * 0.52);
            const brightness = 0.72 + (depth * 0.38);
            const blur = (1 - depth) * 0.72;
            const layer = Math.round(20 + (depth * 180));
            choice.style.setProperty('--focus-away-x', `${(x * 1.18).toFixed(2)}px`);
            choice.style.setProperty('--focus-away-y', `${(y * 1.18).toFixed(2)}px`);
            if (focusedChoice !== choice) {
                choice.style.transform = [
                    'translate(-50%, -50%)',
                    `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px)`,
                    `scale(${scale.toFixed(4)})`,
                ].join(' ');
                choice.style.opacity = opacity.toFixed(3);
                choice.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blur.toFixed(2)}px)`;
                choice.style.zIndex = String(layer);
            }
            choice.dataset.depth = depth > 0.68 ? 'front' : depth < 0.32 ? 'back' : 'middle';
            choice.setAttribute('aria-posinset', String(index + 1));
            choice.setAttribute('aria-setsize', String(vesselChoices.length));
        });
    };
    const isOrbitActive = () => (experience.classList.contains('vessel-active')
        && !vesselStage.classList.contains('is-confirmed')
        && focusedChoice === null);
    const focusChoice = (choice) => {
        focusedChoice = choice;
        releaseVelocityDegreesPerSecond = 0;
        dragging = false;
        syncEarthAnchor();
        experience.classList.add('vessel-focused');
        vesselOrbit.classList.remove('is-dragging');
        vesselOrbit.classList.add('is-focused');
        choice.classList.add('is-focused');
        vesselActions?.classList.add('is-vessel-focused');
        backButton.hidden = false;
        if (vesselUndefined instanceof HTMLButtonElement)
            vesselUndefined.hidden = true;
        vesselOrbit.dataset.focusedVessel = choice.dataset.vessel ?? '';
    };
    const clearFocus = () => {
        focusedChoice?.classList.remove('is-focused');
        focusedChoice = null;
        releaseVelocityDegreesPerSecond = 0;
        experience.classList.remove('vessel-focused');
        vesselOrbit.classList.remove('is-focused', 'is-dragging');
        vesselActions?.classList.remove('is-vessel-focused');
        backButton.hidden = true;
        if (vesselUndefined instanceof HTMLButtonElement) {
            vesselUndefined.hidden = true;
            vesselUndefined.setAttribute('aria-pressed', 'false');
        }
        if (confirmVessel instanceof HTMLButtonElement) {
            confirmVessel.disabled = true;
            confirmVessel.textContent = t('onb.vessel.confirm');
        }
        for (const choice of vesselChoices) {
            choice.classList.remove('is-focused');
            choice.setAttribute('aria-pressed', 'false');
        }
        delete experience.dataset.vesselSelection;
        delete vesselOrbit.dataset.focusedVessel;
        lastFrameTime = performance.now();
        syncEarthAnchor();
        renderOrbit();
        startOrbitLoop();
    };
    const syncIdentityValidity = () => {
        if (!(birthNameInput instanceof HTMLInputElement)
            || !(birthSurnameInput instanceof HTMLInputElement)
            || !(identityNextButton instanceof HTMLButtonElement))
            return;
        identityNextButton.disabled = birthNameInput.value.trim().length === 0
            || birthSurnameInput.value.trim().length === 0;
    };
    const syncArrivalValidity = () => {
        if (!(birthDateInput instanceof HTMLInputElement)
            || !(birthTimeInput instanceof HTMLInputElement)
            || !(createProfileButton instanceof HTMLButtonElement))
            return;
        /* An unknown birth time IS an answer, so it releases the button the same way
           a typed time does. An empty field nobody has answered yet still does not. */
        createProfileButton.disabled = birthDateInput.value.length === 0
            || !birthTimeIsAnswered(birthTimeInput);
    };
    const showProfileStep = (step) => {
        profileFlow.dataset.step = step;
        experience.dataset.state = step === 'complete' ? 'profile-created' : step;
        /* iOS WebKit (including Messenger/Chrome webviews) may pan the page and
           open the keyboard in the middle of our stage transition even with
           preventScroll. Let the user initiate focus on these devices. */
        const iOS = /iPhone|iPad|iPod/.test(navigator.userAgent)
            || (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
        if (!iOS && step === 'identity') {
            window.setTimeout(() => birthNameInput?.focus({ preventScroll: true }), 260);
        }
        else if (!iOS && step === 'arrival') {
            window.setTimeout(() => birthDateInput?.focus({ preventScroll: true }), 260);
        }
    };
    const beginProfileFlow = () => {
        if (profileFlowStarted || !focusedChoice)
            return;
        profileFlowStarted = true;
        const focusedStyle = window.getComputedStyle(focusedChoice);
        const energy = focusedStyle.getPropertyValue('--vessel-energy-rgb').trim();
        const energySoft = focusedStyle.getPropertyValue('--vessel-energy-soft-rgb').trim();
        if (energy)
            profileFlow.style.setProperty('--profile-energy-rgb', energy);
        if (energySoft)
            profileFlow.style.setProperty('--profile-energy-soft-rgb', energySoft);
        profileFlow.hidden = false;
        profileFlow.inert = false;
        vesselStage.classList.add('is-profile-flow');
        experience.classList.add('profile-flow-active');
        syncIdentityValidity();
        syncArrivalValidity();
        showProfileStep('identity');
        if (experienceStatus instanceof HTMLElement) {
            experienceStatus.textContent = t('onb.identity.needName');
        }
    };
    /*
     * THE LOOP TURNS THE ORBIT, SO IT RUNS WHILE THERE IS AN ORBIT TO TURN.
     *
     * The body was already guarded - nothing moved unless the orbit was active -
     * but the reschedule was not, so the callback was queued every frame for the
     * whole session: through the profile flow, through every reading, for as long
     * as the tab was open. It now ends when the orbit is not on screen and is
     * started again by the handful of places that can make it wanted.
     */
    const animateOrbit = (now) => {
        const deltaSeconds = Math.min(0.05, Math.max(0, (now - lastFrameTime) / 1000));
        lastFrameTime = now;
        if (!isOrbitActive()) {
            orbitFrame = 0;
            return;
        }
        if (!dragging) {
            if (Math.abs(releaseVelocityDegreesPerSecond) > 0.35) {
                orbitAngleDegrees += releaseVelocityDegreesPerSecond * deltaSeconds;
                releaseVelocityDegreesPerSecond *= Math.pow(0.91, deltaSeconds * 60);
            }
            else if (!reducedMotion.matches) {
                releaseVelocityDegreesPerSecond = 0;
                orbitAngleDegrees += autoSpeedDegreesPerSecond * deltaSeconds;
            }
            renderOrbit();
        }
        orbitFrame = window.requestAnimationFrame(animateOrbit);
    };
    /** Idempotent: a loop that is already running is left alone. */
    const startOrbitLoop = () => {
        if (orbitFrame)
            return;
        /* The clock restarts with the loop, so the first frame after a pause is a
           normal frame rather than one holding however long the pause was. */
        lastFrameTime = performance.now();
        orbitFrame = window.requestAnimationFrame(animateOrbit);
    };
    const finishDrag = (event) => {
        if (activePointerId !== event.pointerId)
            return;
        if (vesselOrbit.hasPointerCapture(event.pointerId)) {
            vesselOrbit.releasePointerCapture(event.pointerId);
        }
        if (dragTravelDegrees >= dragThresholdDegrees) {
            suppressClickUntil = performance.now() + 320;
        }
        activePointerId = null;
        dragging = false;
        vesselOrbit.classList.remove('is-dragging');
        /* The flick keeps turning after the finger leaves, which takes frames. */
        startOrbitLoop();
    };
    vesselOrbit.addEventListener('pointerdown', (event) => {
        if (!isOrbitActive() || event.button !== 0)
            return;
        activePointerId = event.pointerId;
        dragging = true;
        startOrbitLoop();
        dragTravelDegrees = 0;
        releaseVelocityDegreesPerSecond = 0;
        lastPointerAngleDegrees = pointerAngleDegrees(event);
        lastPointerTime = performance.now();
        vesselOrbit.setPointerCapture(event.pointerId);
        vesselOrbit.classList.add('is-dragging');
    });
    vesselOrbit.addEventListener('pointermove', (event) => {
        if (!dragging || activePointerId !== event.pointerId)
            return;
        const now = performance.now();
        const nextPointerAngleDegrees = pointerAngleDegrees(event);
        const deltaDegrees = normalizeAngleDelta(nextPointerAngleDegrees - lastPointerAngleDegrees);
        const deltaSeconds = Math.max(0.001, (now - lastPointerTime) / 1000);
        orbitAngleDegrees += deltaDegrees;
        dragTravelDegrees += Math.abs(deltaDegrees);
        releaseVelocityDegreesPerSecond = Math.max(-maxReleaseVelocityDegreesPerSecond, Math.min(maxReleaseVelocityDegreesPerSecond, deltaDegrees / deltaSeconds));
        lastPointerAngleDegrees = nextPointerAngleDegrees;
        lastPointerTime = now;
        if (dragTravelDegrees >= dragThresholdDegrees)
            suppressClickUntil = now + 320;
        renderOrbit();
        event.preventDefault();
    });
    vesselOrbit.addEventListener('pointerup', finishDrag);
    vesselOrbit.addEventListener('pointercancel', finishDrag);
    vesselOrbit.addEventListener('lostpointercapture', (event) => {
        if (activePointerId !== event.pointerId)
            return;
        activePointerId = null;
        dragging = false;
        vesselOrbit.classList.remove('is-dragging');
    });
    vesselOrbit.addEventListener('click', (event) => {
        if (performance.now() < suppressClickUntil) {
            event.preventDefault();
            event.stopImmediatePropagation();
            return;
        }
        const choice = event.target.closest('.vessel-choice');
        if (!choice || !vesselOrbit.contains(choice) || focusedChoice)
            return;
        focusChoice(choice);
    }, true);
    backButton.addEventListener('click', clearFocus);
    if (confirmVessel instanceof HTMLButtonElement) {
        // This listener runs in capture phase because the base controller confirms
        // and disables the button in its own click handler. Schedule the profile
        // continuation after that handler so IDENTITY becomes the final state.
        confirmVessel.addEventListener('click', () => {
            if (!focusedChoice || profileFlowStarted)
                return;
            window.setTimeout(beginProfileFlow, 120);
        }, { capture: true });
    }
    birthNameInput?.addEventListener('input', syncIdentityValidity);
    birthSurnameInput?.addEventListener('input', syncIdentityValidity);
    birthDateInput?.addEventListener('input', syncArrivalValidity);
    birthTimeInput?.addEventListener('input', syncArrivalValidity);
    if (birthDateInput instanceof HTMLInputElement) {
        birthDateInput.max = new Date().toISOString().slice(0, 10);
    }
    identityForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!(birthNameInput instanceof HTMLInputElement)
            || !(birthSurnameInput instanceof HTMLInputElement)
            || birthNameInput.value.trim().length === 0
            || birthSurnameInput.value.trim().length === 0)
            return;
        showProfileStep('arrival');
        if (experienceStatus instanceof HTMLElement) {
            experienceStatus.textContent = t('onb.status.needArrival');
        }
    });
    arrivalBackButton?.addEventListener('click', () => {
        showProfileStep('identity');
        if (experienceStatus instanceof HTMLElement) {
            experienceStatus.textContent = t('onb.status.editIdentity');
        }
    });
    arrivalForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!(birthNameInput instanceof HTMLInputElement)
            || !(birthSurnameInput instanceof HTMLInputElement)
            || !(birthDateInput instanceof HTMLInputElement)
            || !(birthTimeInput instanceof HTMLInputElement)
            || !focusedChoice
            || birthDateInput.value.length === 0
            || !birthTimeIsAnswered(birthTimeInput))
            return;
        const profileDraft = Object.freeze({
            birthName: birthNameInput.value.trim(),
            birthSurname: birthSurnameInput.value.trim(),
            birthDate: birthDateInput.value,
            // The time and its certainty together. Empty when unknown: the engines
            // read that as the local-noon fallback. Writing '12:00' here would make
            // the fallback look like a typed answer.
            ...readBirthTimeAnswer(birthTimeInput),
            vessel: focusedChoice.dataset.vessel ?? 'undefined',
        });
        birthNameInput.disabled = true;
        birthSurnameInput.disabled = true;
        birthDateInput.disabled = true;
        birthTimeInput.disabled = true;
        if (createProfileButton instanceof HTMLButtonElement)
            createProfileButton.disabled = true;
        experience.dataset.profileState = 'ready';
        showProfileStep('complete');
        if (experienceStatus instanceof HTMLElement) {
            experienceStatus.textContent = t('onb.complete.connected');
        }
    });
    const resizeObserver = new ResizeObserver(() => {
        syncEarthAnchor();
        if (focusedChoice === null)
            renderOrbit();
        startOrbitLoop();
    });
    resizeObserver.observe(vesselOrbit);
    resizeObserver.observe(vesselStage);
    if (earthMap instanceof HTMLElement)
        resizeObserver.observe(earthMap);
    /* The anchor is frozen while the keyboard is open, so something has to release
       it. A resize normally follows the keyboard closing and the observer above
       would catch it - but only if the box actually changed. Under
       interactive-widget=resizes-visual it may not, and then the freeze would
       never lift. Watching the flag itself makes the release unconditional. */
    /*
     * WHAT TELLS THE LOOP IT IS WANTED AGAIN.
     *
     * Two of the three things isOrbitActive() reads - vessel-active on the
     * experience and is-confirmed on the stage - are written by other modules:
     * the stage opener, the overview editor, the back navigation. This module
     * cannot learn from the inside that the orbit is on screen again, so one
     * watcher, filtered to those two class lists, starts the loop. Its callback
     * reads three class lists and does nothing else - no layout, no work - and it
     * replaces a callback that used to be queued sixty times a second forever.
     */
    const orbitActivityObserver = new MutationObserver(() => {
        if (isOrbitActive())
            startOrbitLoop();
    });
    orbitActivityObserver.observe(experience, { attributes: true, attributeFilter: ['class'] });
    orbitActivityObserver.observe(vesselStage, { attributes: true, attributeFilter: ['class'] });
    const keyboardStateObserver = new MutationObserver(() => {
        if (experience.dataset.keyboardOpen === 'true')
            return;
        syncEarthAnchor();
        if (focusedChoice === null)
            renderOrbit();
    });
    keyboardStateObserver.observe(experience, {
        attributes: true,
        attributeFilter: ['data-keyboard-open'],
    });
    const onReducedMotionChange = () => {
        renderOrbit();
        startOrbitLoop();
    };
    reducedMotion.addEventListener('change', onReducedMotionChange);
    vesselOrbit.dataset.motion = '3d-x-orbit-auto-rotate-drag';
    vesselOrbit.dataset.tiltX = String(orbitTiltXDegrees);
    syncEarthAnchor();
    renderOrbit();
    startOrbitLoop();
    window.addEventListener('pagehide', () => {
        if (orbitFrame)
            window.cancelAnimationFrame(orbitFrame);
        resizeObserver.disconnect();
        keyboardStateObserver.disconnect();
        orbitActivityObserver.disconnect();
        reducedMotion.removeEventListener('change', onReducedMotionChange);
        depthStyle.remove();
    }, { once: true });
}
