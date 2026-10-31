/*
 * iOS WebKit onboarding recovery.
 *
 * Messenger, Instagram, Safari and Chrome on iPhone all render with WebKit.
 * Their moving visual viewport and nested compositing/containment do not obey
 * the layout-viewport assumption used by the Android onboarding. This narrow
 * touch fallback keeps the real Earth and every step, but lets the form and
 * date/time picker paint and receive taps without a chain of glass layers.
 *
 * No fixture, route, engine, gender selection, date value or profile data is
 * changed by this module.
 */
const experience = document.getElementById('place-experience');
const userAgent = navigator.userAgent;
const isIosWebKit = /iPhone|iPad|iPod/.test(userAgent)
    || (/Macintosh/.test(userAgent) && navigator.maxTouchPoints > 1);
if (isIosWebKit && experience instanceof HTMLElement) {
    experience.dataset.iosWebkitRecovery = 'true';
    const style = document.createElement('style');
    style.dataset.onboardingIosWebkitRecovery = 'true';
    style.textContent = `
    /* A scene may keep its full resting height; the interactive overlay must
       never inherit that virtual height as a clipping or hit-test boundary. */
    #place-experience[data-ios-webkit-recovery="true"] .profile-flow,
    #place-experience[data-ios-webkit-recovery="true"] .profile-flow .kt-layer,
    #place-experience[data-ios-webkit-recovery="true"] .profile-panel {
      contain: none !important;
    }

    /* The real globe's atmosphere is a separate scene layer. Never paint the
       focused carousel's full-screen glass disc a second time over the form.
       The more specific original carousel rule used to undo the hide rule. */
    #place-experience[data-ios-webkit-recovery="true"]
      .vessel-stage.is-profile-flow .vessel-orbit.is-arrow-carousel.is-focused
      .vessel-choice.is-focused {
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }

    /* While choosing a body, the full-globe button is state storage only.
       Remove all its dark glass/filter/paint layers; the actual atmosphere
       ring and the separately rendered centred glyph remain visible. */
    #place-experience[data-ios-webkit-recovery="true"]
      .vessel-stage:not(.is-profile-flow) .vessel-orbit.is-arrow-carousel .vessel-choice,
    #place-experience[data-ios-webkit-recovery="true"]
      .vessel-stage:not(.is-profile-flow) .vessel-orbit.is-arrow-carousel .vessel-symbol {
      background: transparent !important;
      background-color: transparent !important;
      background-image: none !important;
      border-color: transparent !important;
      box-shadow: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      filter: none !important;
    }

    /* Use the measured visible globe when the ambient renderer has published
       it. The legacy carousel centred itself on the entire map rectangle;
       during a WebKit viewport reframe that is not the visible disc centre. */
    #place-experience[data-ios-webkit-recovery="true"] .vessel-orbit.is-arrow-carousel {
      top: var(--kt-vessel-glow-y, var(--vessel-earth-center-y, 50%)) !important;
      left: var(--kt-vessel-glow-x, var(--vessel-earth-center-x, 50%)) !important;
    }
    #place-experience[data-ios-webkit-recovery="true"] .kt-vessel-core-symbol,
    #place-experience[data-ios-webkit-recovery="true"] .kt-vessel-neighbor-preview-rail {
      top: var(--kt-vessel-glow-y, var(--vessel-earth-center-y, 50%)) !important;
      left: var(--kt-vessel-glow-x, var(--vessel-earth-center-x, 50%)) !important;
    }

    /* Keep the actual Back/Accept buttons within the in-app browser's visible
       floor and prevent WebKit from suppressing their text during a blur. */
    #place-experience[data-ios-webkit-recovery="true"]
      .vessel-stage:not(.is-profile-flow) .vessel-actions {
      bottom: max(16px, env(safe-area-inset-bottom, 0px)) !important;
      width: min(88vw, 430px) !important;
      max-width: min(88vw, 430px) !important;
      box-sizing: border-box !important;
    }
    #place-experience[data-ios-webkit-recovery="true"]
      .vessel-stage:not(.is-profile-flow) .confirm-vessel:not(:disabled) {
      color: #faf9f5 !important;
      -webkit-text-fill-color: #faf9f5 !important;
      opacity: 1 !important;
    }

    /* Native text editing must not be inside a transformed, paint-contained
       frosted surface. It creates stale iOS touch targets, clipping and flicker.
       Keep the capsule geometry but paint a stable translucent solid instead. */
    #place-experience[data-ios-webkit-recovery="true"] .profile-flow .profile-field,
    #place-experience[data-ios-webkit-recovery="true"] .profile-flow .profile-field-picker {
      contain: none !important;
      transform: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      background: rgba(8, 11, 25, .86) !important;
      overflow: hidden !important;
      -webkit-transform: none !important;
      will-change: auto !important;
    }
    #place-experience[data-ios-webkit-recovery="true"]
      .profile-flow .kt-controls-layer .profile-panel {
      overflow: visible !important;
      box-sizing: border-box !important;
      max-width: calc(100% - 24px) !important;
    }
    #place-experience[data-ios-webkit-recovery="true"] .profile-panel-identity .profile-field input {
      position: relative !important;
      z-index: 1 !important;
      pointer-events: auto !important;
      font-size: 16px !important;
      line-height: normal !important;
      -webkit-text-fill-color: rgba(248, 247, 242, .98) !important;
      -webkit-user-select: text !important;
      user-select: text !important;
      touch-action: manipulation !important;
      appearance: none;
      -webkit-appearance: none;
    }
    #place-experience[data-ios-webkit-recovery="true"]
      .profile-flow[data-step="identity"] .profile-panel-identity,
    #place-experience[data-ios-webkit-recovery="true"]
      .profile-flow[data-step="arrival"] .profile-panel-arrival {
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;
    }

    /* Release the compositor's paint clipping around month/day/year widgets.
       These grids have their own hit targets; the parent must not mask them. */
    #place-experience[data-ios-webkit-recovery="true"] .arrival-glass-picker,
    #place-experience[data-ios-webkit-recovery="true"] .arrival-year-grid {
      contain: none !important;
      transform: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      background: rgba(8, 11, 25, .96) !important;
      will-change: auto !important;
      touch-action: pan-y !important;
    }
    #place-experience[data-ios-webkit-recovery="true"] .arrival-calendar-day,
    #place-experience[data-ios-webkit-recovery="true"] .arrival-year-option,
    #place-experience[data-ios-webkit-recovery="true"] .arrival-month-option {
      pointer-events: auto !important;
      touch-action: manipulation !important;
      -webkit-tap-highlight-color: transparent;
    }

    /* On iOS position:fixed under a transformed/contained ancestor changes
       coordinate systems. Keep date/time overlays in the same stage frame as
       the field used to measure --kt-picker-bottom-offset. */
    #place-experience[data-ios-webkit-recovery="true"]
      .kt-picker-layer[data-picker-mode="date"] .arrival-picker-host.is-open,
    #place-experience[data-ios-webkit-recovery="true"]
      .kt-picker-layer[data-picker-mode="time"]:not(.is-keyboard-open)
      .arrival-picker-host.is-open {
      position: absolute !important;
      inset: auto auto var(--kt-picker-bottom-offset, 172px) 50% !important;
      width: min(88vw, 430px) !important;
      max-width: calc(100% - 24px) !important;
      transform: translateX(-50%) !important;
      pointer-events: auto !important;
    }

    /* WebKit leaves the layout viewport tall when its software keyboard
       shrinks only the visual viewport. Stage-relative bottom positioning plus
       the measured covered area keeps the real fields above the keyboard. */
    #place-experience[data-ios-webkit-recovery="true"][data-keyboard-open="true"]
      .profile-flow .kt-controls-layer .profile-panel {
      position: absolute !important;
      bottom: var(--kt-keyboard-dock-bottom, 12px) !important;
      transform: translateX(-50%) !important;
    }
    #place-experience[data-ios-webkit-recovery="true"][data-keyboard-open="true"]
      .kt-picker-layer[data-picker-mode="time"].is-keyboard-open
      .arrival-picker-host.is-open {
      position: absolute !important;
      top: auto !important;
      bottom: var(--kt-keyboard-dock-bottom, 12px) !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
    }
  `;
    document.head.append(style);
    window.addEventListener('pagehide', (event) => {
        if (event.persisted)
            return;
        style.remove();
        delete experience.dataset.iosWebkitRecovery;
    });
}
export {};
