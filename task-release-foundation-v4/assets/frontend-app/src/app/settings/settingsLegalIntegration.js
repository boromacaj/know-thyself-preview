/*
 * LEGAL, PRIVACY, GDPR AND DATA MANAGEMENT IN SETTINGS.
 *
 * Adds to the existing Settings sheet (profileShell.ts → kt-profile-future):
 *   - Legal documents section (Privacy Policy, ToS, AI Disclaimer, Data Deletion Policy) with the device's
 *     acceptance status
 *   - GDPR data export (JSON download of everything this device holds about the person)
 *   - Data deletion (with two-tap confirmation, matching startOver), through the one shared lifecycle
 *
 * CONSENT MODEL:
 *   - Viewing a document is NEVER recorded as acceptance, acknowledgment or consent.
 *   - The ToS modal includes an explicit "I Accept" button (required terms); the first-launch gate (legalGate.ts)
 *     asks for the same acceptance before any personal data is entered.
 *   - The Privacy Policy modal includes an "I Acknowledge" button: an information notice taken note of, not a consent.
 *   - Other documents (AI Disclaimer, Data Deletion Policy) are informational only.
 *   - The durable record is legal/legalRecord.ts (localStorage, verified on write); IndexedDB keeps the event log with
 *     eventType: 'view' | 'accept' | 'acknowledge' | 'consent_grant' | 'consent_withdraw', owned by the guest id.
 *   - Records are version-aware: a new document version requires re-acceptance.
 *   - Closing a modal by Escape, backdrop click, or X button records nothing.
 *   - A write that did not reach the device is never shown as "Accepted".
 *
 * localStorage is the authoritative profile source and is handled by profilePersistence.ts; this module never
 * replaces it.
 */
import { renderLegalDocumentModal, getLegalStyles } from '../../legal/renderer.js?v=4cd804d';
import { getDocument } from '../../legal/documents.js?v=4cd804d';
import { LEGAL_DOCUMENT_TITLES } from '../../legal/types.js?v=4cd804d';
import { isPrivacyAcknowledged, isTermsAccepted, readLegalRecord, recordPrivacyAcknowledged, recordTermsAccepted, } from '../../legal/legalRecord.js?v=4cd804d';
import { readGuestUserId } from '../../auth/guestProvider.js?v=4cd804d';
import { readStoredProfile } from '../premium-earth/profilePersistence.js?v=4cd804d';
import { escapeHtml } from '../format.js?v=4cd804d';
import { activeLocale } from '../i18n/locale.js?v=4cd804d';
import { t, tf } from '../i18n/uiStrings.js?v=4cd804d';
/** Documents that require explicit acceptance (not just viewing). */
const ACCEPTANCE_REQUIRED = ['terms_of_service'];
/** Documents that offer an acknowledgment option (informational, not binding). */
const ACKNOWLEDGMENT_OFFERED = ['privacy_policy'];
const LEGAL_TYPES = [
    'privacy_policy',
    'terms_of_service',
    'ai_disclaimer',
    'data_deletion_policy',
];
let stylesInjected = false;
function injectStyles() {
    if (stylesInjected)
        return;
    stylesInjected = true;
    const style = document.createElement('style');
    style.textContent = getLegalStyles() + `
    .kt-settings-legal { margin-top: 12px; }
    .kt-settings-legal-title {
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--muted, #c9bca9);
      margin: 0 0 8px;
      padding: 0 4px;
    }
    .kt-settings-legal-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 4px; }
    .kt-settings-legal-link {
      display: block; width: 100%;
      background: rgba(255,255,255,0.04); border: none; border-radius: 8px;
      color: var(--ink, #f7f0e4); text-align: left; cursor: pointer;
      padding: 10px 12px; font-size: 0.88rem; min-height: 44px;
      transition: background 0.15s;
    }
    .kt-settings-legal-link:hover,
    .kt-settings-legal-link:focus-visible { background: rgba(255,255,255,0.08); }
    .kt-settings-legal-status {
      font-size: 0.8rem; line-height: 1.5; color: var(--muted, #c9bca9);
      margin: 8px 0 0; padding: 0 4px;
    }
    .kt-settings-legal-status[data-legal-terms-status="pending"] { color: #e8a070; }
    .kt-settings-data-section { margin-top: 16px; }
    .kt-settings-data-title {
      font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.08em;
      color: var(--muted, #c9bca9); margin: 0 0 8px; padding: 0 4px;
    }
    .kt-settings-data-actions { display: grid; gap: 6px; }
    .kt-settings-data-btn {
      display: block; width: 100%;
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
      border-radius: 8px; color: var(--ink, #f7f0e4); text-align: left;
      cursor: pointer; padding: 10px 12px; font-size: 0.88rem; min-height: 44px;
      transition: background 0.15s, border-color 0.15s;
    }
    .kt-settings-data-btn:hover,
    .kt-settings-data-btn:focus-visible { background: rgba(255,255,255,0.08); }
    .kt-settings-data-btn[data-danger] {
      border-color: rgba(200,60,60,0.3); color: #e87070;
    }
    .kt-settings-data-btn[data-danger]:hover {
      background: rgba(200,60,60,0.08); border-color: rgba(200,60,60,0.5);
    }
    .kt-settings-data-btn[data-armed] {
      background: rgba(200,60,60,0.15); border-color: rgba(200,60,60,0.6);
      color: #ff8888;
    }
    .kt-settings-data-status {
      font-size: 0.82rem; color: var(--muted, #c9bca9);
      margin: 4px 0 0; padding: 0 4px; min-height: 1.2em;
    }
    .kt-legal-modal-accept {
      background: rgba(224, 166, 82, 0.2); border: 1px solid rgba(224, 166, 82, 0.5);
      color: var(--gold, #e0a652); padding: 10px 20px; border-radius: 8px;
      font-size: 0.9rem; cursor: pointer; min-height: 44px; font-weight: 600;
      transition: background 0.15s;
    }
    .kt-legal-modal-accept:hover { background: rgba(224, 166, 82, 0.35); }
    .kt-legal-modal-accept:disabled {
      opacity: 0.4; cursor: not-allowed;
    }
  `;
    document.head.append(style);
}
function formatDate(iso) {
    const date = new Date(iso);
    return Number.isNaN(date.getTime()) ? iso : date.toLocaleDateString(activeLocale());
}
/** The device's acceptance status, from the durable record. */
function legalStatusText() {
    const record = readLegalRecord();
    const terms = getDocument('terms_of_service');
    const lines = [];
    const accepted = record.termsAccepted?.version === terms.version;
    lines.push(accepted && record.termsAccepted
        ? tf('legal.status.termsAccepted', { version: terms.version, date: formatDate(record.termsAccepted.at) })
        : tf('legal.status.termsPending', { version: terms.version }));
    const privacy = getDocument('privacy_policy');
    if (record.privacyAcknowledged?.version === privacy.version) {
        lines.push(tf('legal.status.privacyAcknowledged', { version: privacy.version, date: formatDate(record.privacyAcknowledged.at) }));
    }
    return { text: lines.join(' '), status: accepted ? 'accepted' : 'pending' };
}
function paintLegalStatus(line) {
    const { text, status } = legalStatusText();
    line.textContent = text;
    line.dataset.legalTermsStatus = status;
}
function refreshLegalStatus() {
    for (const line of document.querySelectorAll('[data-legal-terms-status]'))
        paintLegalStatus(line);
}
export function renderLegalSettingsBlock() {
    injectStyles();
    const block = document.createElement('div');
    block.className = 'kt-settings-legal';
    block.innerHTML = `
    <h4 class="kt-settings-legal-title">${escapeHtml(t('settings.legal.title'))}</h4>
    <ul class="kt-settings-legal-list">
      ${LEGAL_TYPES.map((type) => `
        <li><button type="button" class="kt-settings-legal-link" data-legal-open="${escapeHtml(type)}">${escapeHtml(LEGAL_DOCUMENT_TITLES[type])}</button></li>
      `).join('')}
    </ul>
    <p class="kt-settings-legal-status" data-legal-terms-status="pending"></p>`;
    /* Painted on the block itself: it is not in the document yet, so a document-wide refresh would miss it. */
    paintLegalStatus(block.querySelector('[data-legal-terms-status]'));
    block.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement))
            return;
        const button = target.closest('[data-legal-open]');
        if (!button)
            return;
        const type = button.dataset.legalOpen;
        showLegalModal(type);
    });
    return block;
}
export function renderDataManagementBlock() {
    injectStyles();
    const block = document.createElement('div');
    block.className = 'kt-settings-data-section';
    block.innerHTML = `
    <h4 class="kt-settings-data-title">${escapeHtml(t('settings.data.title'))}</h4>
    <div class="kt-settings-data-actions">
      <button type="button" class="kt-settings-data-btn" data-export-data>${escapeHtml(t('settings.data.export'))}</button>
      <button type="button" class="kt-settings-data-btn" data-danger data-delete-data>${escapeHtml(t('settings.data.delete'))}</button>
    </div>
    <p class="kt-settings-data-status" role="status"></p>`;
    const status = block.querySelector('.kt-settings-data-status');
    block.querySelector('[data-export-data]')?.addEventListener('click', async () => {
        status.textContent = t('settings.data.status.preparing');
        try {
            const data = await collectExportData();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `my-codex-data-export-${new Date().toISOString().slice(0, 10)}.json`;
            a.click();
            URL.revokeObjectURL(url);
            status.textContent = t('settings.data.status.exported');
            status.dataset.exportState = 'done';
        }
        catch {
            status.textContent = t('settings.data.status.export-failed');
            status.dataset.exportState = 'failed';
        }
    });
    const deleteBtn = block.querySelector('[data-delete-data]');
    deleteBtn.addEventListener('click', () => {
        if (deleteBtn.dataset.armed !== 'true') {
            deleteBtn.dataset.armed = 'true';
            deleteBtn.textContent = t('settings.data.delete.confirm');
            window.setTimeout(() => {
                if (!deleteBtn.isConnected)
                    return;
                delete deleteBtn.dataset.armed;
                deleteBtn.textContent = t('settings.data.delete');
            }, 5000);
            return;
        }
        void performDeletion(status);
    });
    return block;
}
export function showLegalModal(type, options = {}) {
    const existing = document.querySelector(`[data-legal-modal="${type}"]`);
    if (existing) {
        existing.remove();
        return;
    }
    const wrapper = document.createElement('div');
    wrapper.innerHTML = renderLegalDocumentModal(type);
    const modal = wrapper.firstElementChild;
    if (!modal)
        return;
    const needsAcceptance = ACCEPTANCE_REQUIRED.includes(type);
    const offersAcknowledgment = ACKNOWLEDGMENT_OFFERED.includes(type);
    if ((options.offerAcceptance ?? true) && (needsAcceptance || offersAcknowledgment)) {
        const footer = modal.querySelector('.legal-modal-footer');
        if (footer) {
            const doc = getDocument(type);
            const alreadyDone = needsAcceptance ? isTermsAccepted(doc.version) : isPrivacyAcknowledged(doc.version);
            const acceptBtn = document.createElement('button');
            acceptBtn.type = 'button';
            acceptBtn.className = 'kt-legal-modal-accept';
            acceptBtn.dataset.legalAccept = type;
            const doneLabel = needsAcceptance ? t('legal.modal.accepted') : t('legal.modal.acknowledged');
            acceptBtn.textContent = alreadyDone ? doneLabel : needsAcceptance ? t('legal.modal.accept') : t('legal.modal.acknowledge');
            acceptBtn.disabled = alreadyDone;
            footer.prepend(acceptBtn);
            acceptBtn.addEventListener('click', () => {
                const saved = needsAcceptance ? recordTermsAccepted(doc.version) : recordPrivacyAcknowledged(doc.version);
                void recordLegalEventSafe(type, doc.version, needsAcceptance ? 'accept' : 'acknowledge');
                if (saved) {
                    acceptBtn.disabled = true;
                    acceptBtn.textContent = doneLabel;
                    refreshLegalStatus();
                }
                else {
                    acceptBtn.textContent = t('legal.modal.saveFailed');
                }
            });
        }
    }
    document.body.append(modal);
    const close = () => {
        modal.remove();
    };
    modal.addEventListener('click', (event) => {
        const target = event.target;
        if (target.closest('[data-legal-modal-close]') || target === modal)
            close();
    });
    document.addEventListener('keydown', function escape(event) {
        if (event.key === 'Escape') {
            close();
            document.removeEventListener('keydown', escape);
        }
    });
}
async function collectExportData() {
    const { collectLocalStorageData } = await import('../../persistence/localDataLifecycle.js?v=4cd804d');
    const storages = collectLocalStorageData();
    const result = {
        exportedAt: new Date().toISOString(),
        application: 'My Codex',
        exportVersion: '3.0',
        guestUserId: readGuestUserId(),
        legalRecord: readLegalRecord(),
        localProfile: readLocalProfile(),
        localStorage: storages.localStorage,
        sessionStorage: storages.sessionStorage,
    };
    try {
        const { exportEverything } = await import('../../persistence/exportService.js?v=4cd804d');
        result.indexedDbData = await exportEverything();
    }
    catch {
        result.indexedDbData = null;
        result.indexedDbNote = 'IndexedDB export unavailable — the local profile and web storage above are complete.';
    }
    return result;
}
/** The authoritative profile, read through its own module: the key carries a build suffix in review builds. */
function readLocalProfile() {
    try {
        return readStoredProfile();
    }
    catch {
        return null;
    }
}
async function recordLegalEventSafe(type, version, eventType) {
    try {
        const { recordLegalEvent } = await import('../../persistence/persistenceBridge.js?v=4cd804d');
        await recordLegalEvent(type, version, eventType);
    }
    catch { /* the IndexedDB event log is secondary to the durable record */ }
}
async function performDeletion(status) {
    status.textContent = t('settings.data.status.deleting');
    status.dataset.deleteState = 'running';
    try {
        const { forgetAllLocalData } = await import('../../persistence/localDataLifecycle.js?v=4cd804d');
        const outcome = await forgetAllLocalData();
        if (outcome.ok) {
            status.textContent = t('settings.data.status.deleted');
            status.dataset.deleteState = 'done';
            window.setTimeout(() => location.reload(), 1500);
            return;
        }
        const detail = outcome.errors.join('; ')
            || [`IndexedDB: ${outcome.indexedDb}`, `localStorage: ${outcome.localStorage}`].join(', ');
        status.textContent = tf('settings.data.status.delete-partial', { detail });
        status.dataset.deleteState = 'partial';
    }
    catch {
        status.textContent = t('settings.data.status.delete-failed');
        status.dataset.deleteState = 'failed';
    }
}
