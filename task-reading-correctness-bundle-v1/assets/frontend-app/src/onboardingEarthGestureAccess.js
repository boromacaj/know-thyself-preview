const experience = document.getElementById('place-experience');
const earthMap = document.getElementById('earth-map');
const vesselStage = document.getElementById('vessel-stage');
if (experience instanceof HTMLElement
    && earthMap instanceof HTMLElement
    && vesselStage instanceof HTMLElement) {
    const style = document.createElement('style');
    style.dataset.onboardingEarthGestureAccess = 'true';
    style.textContent = `
    /*
     * Native Earth gesture routing
     * ----------------------------
     * The approved composition uses several viewport-sized structural layers.
     * They remain visually unchanged, but their transparent pixels no longer
     * form hit-test surfaces. The real Google Map3DElement therefore owns a
     * gesture whenever no genuine onboarding control is under the pointer.
     */
    #place-experience.vessel-active #earth-map {
      pointer-events: auto !important;
    }

    #place-experience.vessel-active #vessel-stage,
    #place-experience.vessel-active #vessel-stage .vessel-content,
    #place-experience.vessel-active #vessel-stage .vessel-orbit,
    #place-experience.vessel-active #vessel-stage .vessel-choice,
    #place-experience.vessel-active #vessel-stage .profile-flow,
    #place-experience.vessel-active #vessel-stage .kt-layer,
    #place-experience.vessel-active #vessel-stage .kt-controls-layer .profile-panel,
    #place-experience.vessel-active #vessel-stage .kt-picker-layer .arrival-picker-host.is-open {
      pointer-events: none !important;
    }

    /* Several legacy polish modules assign pointer-events directly to controls.
       Neutralize every descendant of the two inactive panels first, so an
       opacity-zero editor can never sit above the currently visible editor. */
    #place-experience.vessel-active #vessel-stage.is-profile-flow
      .profile-flow[data-step="identity"]
      :is(.profile-panel-arrival, .profile-panel-complete, .profile-panel-arrival *, .profile-panel-complete *),
    #place-experience.vessel-active #vessel-stage.is-profile-flow
      .profile-flow[data-step="arrival"]
      :is(.profile-panel-identity, .profile-panel-complete, .profile-panel-identity *, .profile-panel-complete *),
    #place-experience.vessel-active #vessel-stage.is-profile-flow
      .profile-flow[data-step="complete"]
      :is(.profile-panel-identity, .profile-panel-arrival, .profile-panel-identity *, .profile-panel-arrival *) {
      pointer-events: none !important;
    }

    /* VESSEL owns only the controls that are visibly actionable. The selected
       centre glyph and every transparent orbit/layout box remain touch-through. */
    #place-experience.vessel-active #vessel-stage:not(.is-profile-flow)
      :is(.kt-vessel-neighbor-preview, .confirm-vessel, .vessel-back, .vessel-undefined) {
      pointer-events: auto !important;
    }

    /* IDENTITY, ARRIVAL and OVERVIEW keep their existing controls interactive,
       while the blank area inside their full-screen layout portals reaches Earth. */
    #place-experience.vessel-active #vessel-stage.is-profile-flow
      .profile-flow[data-step="identity"]
      .kt-controls-layer
      .profile-panel-identity
      :is(button, input, select, textarea, label, a, [role="button"], [contenteditable="true"]),
    #place-experience.vessel-active #vessel-stage.is-profile-flow
      .profile-flow[data-step="arrival"]
      .kt-controls-layer
      .profile-panel-arrival
      :is(button, input, select, textarea, label, a, [role="button"], [contenteditable="true"]),
    #place-experience.vessel-active #vessel-stage.is-profile-flow
      .profile-flow[data-step="complete"]
      .kt-controls-layer
      .profile-panel-complete
      :is(button, input, select, textarea, label, a, [role="button"], [contenteditable="true"]),
    #place-experience.vessel-active #vessel-stage.is-profile-flow
      .kt-picker-layer
      .arrival-picker-host.is-open
      :is(.arrival-date-picker, .arrival-time-picker, button, input, select, textarea, label, [role="button"]) {
      pointer-events: auto !important;
    }
  `;
    document.head.append(style);
    experience.dataset.nativeEarthGestureRouting = 'enabled';
    window.addEventListener('pagehide', () => style.remove(), { once: true });
}
export {};
