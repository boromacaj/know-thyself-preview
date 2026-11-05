import { LEGAL_DOCUMENT_TITLES } from './types.js?v=4cd804d';
import { getDocument, getAllVersions } from './documents.js?v=4cd804d';
import { escapeHtml } from '../utils/escapeHtml.js?v=4cd804d';
import { t, tf } from '../app/i18n/uiStrings.js?v=4cd804d';
function formatContentToHtml(content) {
    const lines = content.split('\n');
    const htmlParts = [];
    let inParagraph = false;
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed === '') {
            if (inParagraph) {
                htmlParts.push('</p>');
                inParagraph = false;
            }
            continue;
        }
        if (trimmed.startsWith('[DRAFT')) {
            htmlParts.push(`<div class="legal-draft-banner" role="alert">${escapeHtml(trimmed)}</div>`);
            continue;
        }
        if (/^\d+\.\s+[A-Z]/.test(trimmed)) {
            if (inParagraph) {
                htmlParts.push('</p>');
                inParagraph = false;
            }
            const headingText = trimmed.replace(/^\d+\.\s+/, '');
            htmlParts.push(`<h3 class="legal-section-heading">${escapeHtml(trimmed.split('.')[0])}. ${escapeHtml(headingText)}</h3>`);
            continue;
        }
        const titleMatch = trimmed.match(/^(.+)\s+—\s+(?:KNOW THYSELF PRO|My Codex)$/);
        if (titleMatch) {
            if (inParagraph) {
                htmlParts.push('</p>');
                inParagraph = false;
            }
            htmlParts.push(`<h2 class="legal-document-title">${escapeHtml(trimmed)}</h2>`);
            continue;
        }
        if (trimmed.startsWith('Version:') || trimmed.startsWith('Effective date:')) {
            if (inParagraph) {
                htmlParts.push('</p>');
                inParagraph = false;
            }
            htmlParts.push(`<p class="legal-meta">${escapeHtml(trimmed)}</p>`);
            continue;
        }
        if (trimmed.startsWith('- ')) {
            if (inParagraph) {
                htmlParts.push('</p>');
                inParagraph = false;
            }
            htmlParts.push(`<ul class="legal-list"><li>${escapeHtml(trimmed.substring(2))}</li></ul>`);
            continue;
        }
        if (trimmed.startsWith('[Placeholder:')) {
            if (inParagraph) {
                htmlParts.push('</p>');
                inParagraph = false;
            }
            htmlParts.push(`<p class="legal-placeholder">${escapeHtml(trimmed)}</p>`);
            continue;
        }
        if (!inParagraph) {
            htmlParts.push('<p>');
            inParagraph = true;
        }
        htmlParts.push(escapeHtml(trimmed) + ' ');
    }
    if (inParagraph) {
        htmlParts.push('</p>');
    }
    let html = htmlParts.join('\n');
    html = html.replace(/<\/ul>\n<ul class="legal-list">/g, '');
    return html;
}
export function renderLegalDocument(type) {
    const doc = getDocument(type);
    const bodyHtml = formatContentToHtml(doc.content);
    return `<article class="legal-document" aria-labelledby="legal-doc-title-${escapeHtml(type)}" data-legal-type="${escapeHtml(type)}" data-legal-version="${escapeHtml(doc.version)}">
    <header class="legal-document-header">
      <div class="legal-draft-watermark" aria-hidden="true">${escapeHtml(t('legal.draft.watermark'))}</div>
      <p class="legal-version-info">${escapeHtml(tf('legal.version-info', { version: doc.version, date: doc.effectiveDate }))}</p>
    </header>
    <div class="legal-document-body">
      ${bodyHtml}
    </div>
    <footer class="legal-document-footer">
      <p class="legal-draft-reminder">${escapeHtml(t('legal.draft.reminder'))}</p>
    </footer>
  </article>`;
}
export function renderLegalDocumentModal(type) {
    const doc = getDocument(type);
    const documentHtml = renderLegalDocument(type);
    return `<div class="legal-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title-${escapeHtml(type)}" data-legal-modal="${escapeHtml(type)}">
    <div class="legal-modal">
      <header class="legal-modal-header">
        <h2 id="legal-modal-title-${escapeHtml(type)}">${escapeHtml(doc.title)}</h2>
        <button type="button" class="legal-modal-close" aria-label="${escapeHtml(tf('legal.modal.close-doc', { title: doc.title }))}" data-legal-modal-close="true">&times;</button>
      </header>
      <div class="legal-modal-body" tabindex="0">
        ${documentHtml}
      </div>
      <footer class="legal-modal-footer">
        <button type="button" class="legal-modal-dismiss" data-legal-modal-close="true">${escapeHtml(t('legal.modal.close'))}</button>
      </footer>
    </div>
  </div>`;
}
export function renderLegalFooter() {
    const allTypes = [
        'privacy_policy',
        'terms_of_service',
        'ai_disclaimer',
        'data_deletion_policy',
    ];
    const links = allTypes.map((type) => {
        const title = LEGAL_DOCUMENT_TITLES[type];
        return `<button type="button" class="legal-footer-link" data-legal-open="${escapeHtml(type)}">${escapeHtml(title)}</button>`;
    });
    return `<footer class="legal-footer" aria-label="${escapeHtml(t('legal.footer.aria'))}">
    <nav class="legal-footer-links">
      ${links.join('\n      ')}
    </nav>
    <p class="legal-footer-note">${escapeHtml(t('legal.footer.note'))}</p>
  </footer>`;
}
export function renderLegalDocumentList() {
    const versions = getAllVersions();
    const items = versions.map((v) => {
        const title = LEGAL_DOCUMENT_TITLES[v.type];
        return `<li class="legal-list-item">
      <button type="button" class="legal-list-link" data-legal-open="${escapeHtml(v.type)}">
        <strong>${escapeHtml(title)}</strong>
        <small>${escapeHtml(tf('legal.list.version-line', { version: v.version, date: v.effectiveDate }))}</small>
      </button>
    </li>`;
    });
    return `<section class="legal-document-list" aria-labelledby="legal-documents-heading">
    <h2 id="legal-documents-heading">${escapeHtml(t('legal.list.heading'))}</h2>
    <p class="legal-draft-reminder">${escapeHtml(t('legal.list.note'))}</p>
    <ul>${items.join('\n')}</ul>
  </section>`;
}
export function getLegalStyles() {
    return `
    .legal-document {
      position: relative;
      max-width: 720px;
      margin: 0 auto;
      padding: 24px;
      color: var(--ink, #f7f0e4);
      line-height: 1.65;
    }
    .legal-document-header {
      position: relative;
      margin-bottom: 20px;
    }
    .legal-draft-watermark {
      position: absolute;
      top: -10px;
      right: 0;
      font-size: 4rem;
      font-weight: 900;
      color: rgba(224, 166, 82, 0.08);
      pointer-events: none;
      user-select: none;
      text-transform: uppercase;
      letter-spacing: 0.15em;
    }
    .legal-version-info {
      font-size: 0.82rem;
      color: var(--muted, #c9bca9);
    }
    .legal-document-title {
      font-size: 1.35rem;
      margin: 16px 0 8px;
    }
    .legal-section-heading {
      font-size: 1rem;
      margin: 22px 0 8px;
      color: var(--gold, #e0a652);
    }
    .legal-meta {
      font-size: 0.82rem;
      color: var(--muted, #c9bca9);
      margin: 2px 0;
    }
    .legal-document-body p {
      margin: 8px 0;
      font-size: 0.92rem;
    }
    .legal-list {
      margin: 6px 0;
      padding-left: 20px;
    }
    .legal-list li {
      font-size: 0.92rem;
      margin: 4px 0;
      line-height: 1.55;
    }
    .legal-placeholder {
      font-style: italic;
      color: var(--soft, #8f8374);
      border-left: 3px solid rgba(224, 166, 82, 0.3);
      padding-left: 12px;
      margin: 8px 0;
      font-size: 0.88rem;
    }
    .legal-draft-banner {
      background: rgba(224, 166, 82, 0.1);
      border: 1px solid rgba(224, 166, 82, 0.3);
      border-radius: 8px;
      padding: 12px 16px;
      margin: 0 0 16px;
      font-size: 0.84rem;
      line-height: 1.55;
      color: var(--gold, #e0a652);
    }
    .legal-document-footer {
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid rgba(224, 166, 82, 0.14);
    }
    .legal-draft-reminder {
      font-size: 0.82rem;
      color: var(--soft, #8f8374);
      font-style: italic;
    }
    .legal-modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 9000;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(6px);
      padding: 16px;
    }
    .legal-modal {
      display: flex;
      flex-direction: column;
      max-width: 780px;
      max-height: 90vh;
      width: 100%;
      background: var(--panel-strong, rgba(24, 25, 24, 0.94));
      border: 1px solid rgba(224, 166, 82, 0.2);
      border-radius: 16px;
      overflow: hidden;
    }
    .legal-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      border-bottom: 1px solid rgba(224, 166, 82, 0.14);
    }
    .legal-modal-header h2 {
      font-size: 1.1rem;
      margin: 0;
    }
    .legal-modal-close {
      background: none;
      border: none;
      color: var(--ink, #f7f0e4);
      font-size: 1.6rem;
      cursor: pointer;
      padding: 4px 8px;
      line-height: 1;
      border-radius: 4px;
      min-width: 44px;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .legal-modal-close:hover {
      background: rgba(255, 255, 255, 0.08);
    }
    .legal-modal-body {
      flex: 1;
      overflow-y: auto;
      padding: 0 8px;
      -webkit-overflow-scrolling: touch;
    }
    .legal-modal-footer {
      padding: 12px 24px;
      border-top: 1px solid rgba(224, 166, 82, 0.14);
      display: flex;
      justify-content: flex-end;
    }
    .legal-modal-dismiss {
      background: rgba(224, 166, 82, 0.14);
      border: 1px solid rgba(224, 166, 82, 0.3);
      color: var(--ink, #f7f0e4);
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 0.9rem;
      cursor: pointer;
      min-height: 44px;
    }
    .legal-modal-dismiss:hover {
      background: rgba(224, 166, 82, 0.22);
    }
    .legal-footer {
      margin-top: 40px;
      padding: 20px 0;
      border-top: 1px solid rgba(224, 166, 82, 0.1);
      text-align: center;
    }
    .legal-footer-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px 16px;
      margin-bottom: 8px;
    }
    .legal-footer-link {
      background: none;
      border: none;
      color: var(--muted, #c9bca9);
      font-size: 0.82rem;
      cursor: pointer;
      padding: 6px 4px;
      text-decoration: underline;
      text-underline-offset: 3px;
      min-height: 44px;
      display: inline-flex;
      align-items: center;
    }
    .legal-footer-link:hover {
      color: var(--gold, #e0a652);
    }
    .legal-footer-note {
      font-size: 0.75rem;
      color: var(--soft, #8f8374);
      font-style: italic;
    }
    .legal-document-list ul {
      list-style: none;
      padding: 0;
      margin: 12px 0 0;
      display: grid;
      gap: 8px;
    }
    .legal-list-item {
      border: 1px solid rgba(224, 166, 82, 0.14);
      border-radius: 10px;
      overflow: hidden;
    }
    .legal-list-link {
      display: grid;
      gap: 4px;
      width: 100%;
      padding: 14px 16px;
      background: rgba(18, 21, 23, 0.6);
      border: none;
      color: var(--ink, #f7f0e4);
      text-align: left;
      cursor: pointer;
      min-height: 44px;
    }
    .legal-list-link:hover {
      background: rgba(224, 166, 82, 0.06);
    }
    .legal-list-link strong {
      font-size: 0.94rem;
    }
    .legal-list-link small {
      font-size: 0.78rem;
      color: var(--muted, #c9bca9);
    }
  `;
}
