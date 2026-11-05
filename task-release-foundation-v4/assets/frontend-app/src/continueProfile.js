/*
 * "CONTINUE AS …": THE DELIBERATE CONTROL THE FRONT DOOR RULE LEFT ROOM FOR.
 *
 * A bare `/` always plays the opening and never restores on its own (profileSessionRestore.ts): a stored profile is a
 * memory, not a request. This control turns the memory into a request the way a link does - it gives the address the
 * hash `#/menu` and reloads, so the restore that follows is the one every `#/menu` link gets, through the same doors.
 * Nothing here reads the profile into the app, computes, or opens a destination.
 *
 * It appears only at the front door (the opening finished, nothing restored, the birthplace search on screen), only
 * when a usable profile is stored, and not in the clean build, which already sends a remembered person to the menu.
 */
import { cleanOnboardingEnabled } from './cleanBuild.js?v=4cd804d';
import { destinationFromHash, readStoredProfile } from './app/premium-earth/profilePersistence.js?v=4cd804d';
import { tf } from './app/i18n/uiStrings.js?v=4cd804d';
const experience = document.getElementById('place-experience');
const dock = document.getElementById('interaction-dock');
let control = null;
let stylesInjected = false;
function injectStyles() {
    if (stylesInjected)
        return;
    stylesInjected = true;
    const style = document.createElement('style');
    style.textContent = `
    .interaction-dock .kt-continue-profile {
      position: absolute; left: 50%; transform: translateX(-50%); z-index: 2;
      bottom: calc(100% + 16px);
      max-width: min(86vw, 420px); min-height: 44px; padding: 10px 20px; cursor: pointer;
      background: rgba(18, 21, 23, 0.58); border: 1px solid rgba(224, 166, 82, 0.4); border-radius: 999px;
      backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
      color: var(--ink, #f7f0e4); font-size: 0.92rem; letter-spacing: 0.01em; white-space: nowrap;
      overflow: hidden; text-overflow: ellipsis; box-shadow: 0 8px 28px rgba(0, 0, 0, 0.4);
      transition: background 0.15s, border-color 0.15s;
    }
    .interaction-dock .kt-continue-profile:hover,
    .interaction-dock .kt-continue-profile:focus-visible { background: rgba(224, 166, 82, 0.18); border-color: rgba(224, 166, 82, 0.7); }
    .place-experience[data-keyboard-open="true"] .kt-continue-profile { visibility: hidden; }
  `;
    document.head.append(style);
}
function unmount() {
    control?.remove();
    control = null;
}
function mount(name) {
    if (control || !dock)
        return;
    injectStyles();
    control = document.createElement('button');
    control.type = 'button';
    control.className = 'kt-continue-profile';
    control.dataset.continueProfile = 'true';
    control.textContent = tf('onb.continue.as', { name });
    control.addEventListener('click', () => {
        window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#/menu`);
        window.location.reload();
    });
    dock.prepend(control);
}
function reconcile() {
    if (!experience)
        return;
    const atFrontDoor = experience.dataset.introState === 'complete'
        && !experience.dataset.pillarStage
        && experience.dataset.state === 'search';
    if (!atFrontDoor || cleanOnboardingEnabled() || destinationFromHash(window.location.hash)) {
        unmount();
        return;
    }
    const stored = readStoredProfile();
    if (!stored) {
        unmount();
        return;
    }
    mount(stored.profile.birthName.trim() || stored.profile.birthSurname.trim());
}
if (experience) {
    new MutationObserver(reconcile).observe(experience, {
        attributes: true,
        attributeFilter: ['data-intro-state', 'data-pillar-stage', 'data-state'],
    });
    reconcile();
}
