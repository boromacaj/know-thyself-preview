/*
 * QA DIAGNOSTICS - ENTRY. Loaded as a module by the QA build's pages only (see frontend-app/scripts/qaDiagnosticsInjection.mjs).
 *
 * Runs only when ALL of these hold, so a stray copy of the files can never become a production debugging surface:
 *   1. boot.ts ran in this page (it sets __KT_QA_DIAGNOSTICS__, and it is injected only into a QA build's HTML);
 *   2. the page is served from a review/local host (environment.isQaHost);
 *   3. the address does not carry ?ktdiag=off (the way to compare behaviour with and without the instrumentation).
 */
import { isQaHost } from './environment.js?v=b5ef5ed';
import { startCollector, DIAG_VERSION } from './collector.js?v=b5ef5ed';
import { mountPanel } from './panel.js?v=b5ef5ed';
import { MESSENGER_BUDGET, buildReport, verifyReportText } from './report.js?v=b5ef5ed';
const qa = window;
const off = /[?&]ktdiag=off(?:&|$)/.test(window.location.search);
if (qa.__KT_QA_DIAGNOSTICS__ === true && isQaHost(window.location.hostname) && !off) {
    // (boot.ts applies the same host and switch rules first; both are checked so neither file alone can enable the control)
    try {
        const collector = startCollector();
        const mount = () => {
            const panel = mountPanel(collector);
            // A narrow handle for the automated WebKit run and for support: it returns data to the same page only.
            qa.__ktDiag = {
                version: DIAG_VERSION,
                collector,
                panel,
                report: (full = false, onlyLevel) => buildReport(collector.buildInput('api'), { budget: full ? null : MESSENGER_BUDGET, guard: collector.guard, onlyLevel }),
                verify: verifyReportText,
            };
        };
        if (document.documentElement)
            mount();
    }
    catch (error) {
        // Diagnostics must never break the page they observe.
        console.warn('[qa-diagnostics] failed to start', error instanceof Error ? error.name : 'error');
    }
}
