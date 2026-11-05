/*
 * THE FIRST-LAUNCH LEGAL GATE: ONE CARD, BEFORE ANY PERSONAL DATA IS TYPED.
 *
 * It stands over the front door when the opening sequence ends and this device holds no explicit acceptance of the
 * CURRENT Terms of Service (legal/legalRecord.ts). It is not a screen of its own and not a repeat: once the Terms are
 * accepted it never returns for that version, whatever is stored or typed afterwards; a new version brings it back
 * once. Closing the app on it records nothing, so an interrupted first launch starts again exactly here.
 *
 * WHAT COUNTS. Only the Accept control writes the record, and it writes two things: the durable fact in localStorage
 * (verified by reading it back) and an 'accept' event in the IndexedDB log, owned by the device's guest id. Reading a
 * document from here opens the ordinary legal modal in read-only form and records nothing. No optional consent is
 * shown, because the product has nothing to ask consent for: no analytics, no AI feature is active.
 *
 * WHAT IT GUARDS. The onboarding - the entry of a name, a birth date and a birthplace - AND the way back in. A saved
 * session is restored only while the current Terms are satisfied (profileSessionRestore.ts asks `isTermsSatisfied`
 * before it ends the intro), so a returning person, a `#/menu` link or a reload of a Terms version they have not
 * accepted lands at the front door with this gate standing over it; their profile and guest identity are untouched.
 * When they accept, the gate announces TERMS_SETTLED_EVENT and the waiting restore runs through its ordinary doors.
 * The legacy rollback page asks the same question and hands over to the front door (main.ts). A QA preset opens the
 * hub directly: it exists only in builds that carry the dev/QA tooling, never in a deployed production build.
 *
 * A SAVE THAT FAILS. If the device refuses to keep the acceptance the person is told so, and a second, separate tap
 * lets them go on for this launch only (`continueWithoutSaving`). Nothing was recorded, Settings still say "not yet
 * accepted", and the next launch asks again.
 */
import { showLegalModal } from './app/settings/settingsLegalIntegration.js?v=4cd804d';
import { destinationFromHash } from './app/premium-earth/profilePersistence.js?v=4cd804d';
import { t } from './app/i18n/uiStrings.js?v=4cd804d';
import { TERMS_SETTLED_EVENT, continueWithoutSaving, currentTermsVersion, hasAcceptedOlderTerms, isTermsSatisfied, recordTermsAccepted, } from './legal/legalRecord.js?v=4cd804d';
import { escapeHtml } from './utils/escapeHtml.js?v=4cd804d';
const experience = document.getElementById('place-experience');
const dock = document.getElementById('interaction-dock');
let gate = null;
let stylesInjected = false;
/* Several modules release the dock on their own clock (the Earth intro sequence, the early place reveal, the intro
   watchdog). While the gate stands, the dock stays inert whatever releases it: the overlay already takes every tap,
   this keeps the keyboard out too. */
const dockGuard = dock
    ? new MutationObserver(() => { if (gate && dock && !dock.inert)
        dock.inert = true; })
    : null;
function injectStyles() {
    if (stylesInjected)
        return;
    stylesInjected = true;
    const style = document.createElement('style');
    style.textContent = `
    .kt-legal-gate {
      position: fixed; inset: 0; z-index: 8900;
      display: flex; align-items: flex-end; justify-content: center;
      padding: max(16px, env(safe-area-inset-top, 0px)) max(16px, env(safe-area-inset-right, 0px))
               max(20px, env(safe-area-inset-bottom, 0px)) max(16px, env(safe-area-inset-left, 0px));
      background: rgba(4, 6, 8, 0.58);
      backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
    }
    @media (min-width: 640px) { .kt-legal-gate { align-items: center; } }
    .kt-legal-gate-card {
      width: min(100%, 440px); max-height: calc(100dvh - 40px); overflow-y: auto;
      background: var(--panel-strong, rgba(24, 25, 24, 0.94));
      border: 1px solid rgba(224, 166, 82, 0.24); border-radius: 18px;
      padding: 22px 20px 18px; color: var(--ink, #f7f0e4);
      box-shadow: 0 18px 48px rgba(0, 0, 0, 0.5);
    }
    .kt-legal-gate-title {
      margin: 0 0 10px; font-family: Georgia, "Times New Roman", serif; font-weight: 400;
      font-size: 1.45rem; line-height: 1.2; text-wrap: balance; color: var(--ink, #f7f0e4);
    }
    .kt-legal-gate-body { margin: 0 0 12px; font-size: 0.92rem; line-height: 1.55; color: var(--muted, #d9cfbf); }
    .kt-legal-gate-updated {
      margin: 0 0 12px; font-size: 0.88rem; line-height: 1.5; color: var(--gold, #e0a652);
      border-left: 3px solid rgba(224, 166, 82, 0.5); padding-left: 10px;
    }
    .kt-legal-gate-required { margin: 0 0 14px; font-size: 0.86rem; line-height: 1.5; color: var(--muted, #c9bca9); }
    .kt-legal-gate-links { list-style: none; margin: 0 0 16px; padding: 0; display: grid; gap: 4px; }
    .kt-legal-gate-link {
      display: block; width: 100%; min-height: 44px; padding: 10px 12px; text-align: left; cursor: pointer;
      background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 10px;
      color: var(--ink, #f7f0e4); font-size: 0.88rem;
    }
    .kt-legal-gate-link:hover, .kt-legal-gate-link:focus-visible { background: rgba(255, 255, 255, 0.08); }
    .kt-legal-gate-accept {
      display: block; width: 100%; min-height: 48px; padding: 12px 18px; cursor: pointer;
      background: rgba(224, 166, 82, 0.22); border: 1px solid rgba(224, 166, 82, 0.55); border-radius: 12px;
      color: var(--gold, #e0a652); font-size: 0.98rem; font-weight: 600; transition: background 0.15s;
    }
    .kt-legal-gate-accept:hover, .kt-legal-gate-accept:focus-visible { background: rgba(224, 166, 82, 0.36); }
    .kt-legal-gate-warning {
      margin: 10px 0 0; font-size: 0.84rem; line-height: 1.5; color: #e8a070;
      border-left: 3px solid rgba(232, 160, 112, 0.6); padding-left: 10px;
    }
    .kt-legal-gate-draft { margin: 12px 0 0; font-size: 0.76rem; font-style: italic; color: var(--soft, #8f8374); }
  `;
    document.head.append(style);
}
const READ_LINKS = [
    ['terms_of_service', 'legal.gate.readTerms'],
    ['privacy_policy', 'legal.gate.readPrivacy'],
    ['ai_disclaimer', 'legal.gate.readDisclaimer'],
];
function removeGate() {
    if (!gate)
        return;
    gate.remove();
    gate = null;
    dockGuard?.disconnect();
    delete document.documentElement.dataset.ktLegalGate;
    if (dock)
        dock.inert = false;
}
function settle() {
    removeGate();
    /* A person arriving by a link is about to be taken to their session, not to the search field: no keyboard under them. */
    if (!destinationFromHash(window.location.hash))
        document.getElementById('place-query')?.focus({ preventScroll: true });
    window.dispatchEvent(new CustomEvent(TERMS_SETTLED_EVENT));
}
function accept(button, warning) {
    /* A second tap after a failed save continues for this launch only; the record is asked for again next launch. */
    if (button.dataset.legalGateContinue === 'true') {
        continueWithoutSaving();
        settle();
        return;
    }
    const version = currentTermsVersion();
    const saved = recordTermsAccepted(version);
    void import('./persistence/persistenceBridge.js?v=4cd804d')
        .then(({ recordLegalEvent }) => recordLegalEvent('terms_of_service', version, 'accept'))
        .catch(() => { });
    if (saved) {
        settle();
        return;
    }
    warning.textContent = t('legal.gate.saveFailed');
    warning.hidden = false;
    button.dataset.legalGateContinue = 'true';
    button.textContent = t('legal.gate.continue');
}
function mountGate() {
    if (gate)
        return;
    injectStyles();
    gate = document.createElement('div');
    gate.className = 'kt-legal-gate';
    gate.dataset.legalGate = 'true';
    gate.setAttribute('role', 'dialog');
    gate.setAttribute('aria-modal', 'true');
    gate.setAttribute('aria-labelledby', 'kt-legal-gate-title');
    gate.innerHTML = `
    <div class="kt-legal-gate-card">
      <h2 class="kt-legal-gate-title" id="kt-legal-gate-title">${escapeHtml(t('legal.gate.title'))}</h2>
      <p class="kt-legal-gate-body">${escapeHtml(t('legal.gate.body'))}</p>${hasAcceptedOlderTerms() ? `
      <p class="kt-legal-gate-updated" data-legal-gate-updated>${escapeHtml(t('legal.gate.updated'))}</p>` : ''}
      <p class="kt-legal-gate-required">${escapeHtml(t('legal.gate.required'))}</p>
      <ul class="kt-legal-gate-links">
        ${READ_LINKS.map(([type, key]) => `<li><button type="button" class="kt-legal-gate-link" data-legal-gate-open="${type}">${escapeHtml(t(key))}</button></li>`).join('')}
      </ul>
      <button type="button" class="kt-legal-gate-accept" data-legal-gate-accept="${escapeHtml(currentTermsVersion())}">${escapeHtml(t('legal.gate.accept'))}</button>
      <p class="kt-legal-gate-warning" data-legal-gate-warning role="alert" hidden></p>
      <p class="kt-legal-gate-draft">${escapeHtml(t('legal.footer.note'))}</p>
    </div>`;
    const acceptButton = gate.querySelector('[data-legal-gate-accept]');
    const warning = gate.querySelector('[data-legal-gate-warning]');
    gate.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement))
            return;
        const read = target.closest('[data-legal-gate-open]');
        if (read) {
            showLegalModal(read.dataset.legalGateOpen, { offerAcceptance: false });
            return;
        }
        if (target.closest('[data-legal-gate-accept]'))
            accept(acceptButton, warning);
    });
    document.body.append(gate);
    document.documentElement.dataset.ktLegalGate = 'open';
    if (dock) {
        dock.inert = true;
        dockGuard?.observe(dock, { attributes: true, attributeFilter: ['inert'] });
    }
    acceptButton.focus({ preventScroll: true });
}
function reconcile() {
    if (!experience)
        return;
    const atFrontDoor = experience.dataset.introState === 'complete' && !experience.dataset.pillarStage;
    if (!atFrontDoor || isTermsSatisfied()) {
        removeGate();
        return;
    }
    mountGate();
}
if (experience) {
    new MutationObserver(reconcile).observe(experience, {
        attributes: true,
        attributeFilter: ['data-intro-state', 'data-pillar-stage'],
    });
    reconcile();
}
