"use strict";
/*
 * QA DIAGNOSTICS - EARLY BOOT (classic script, injected FIRST into the <head> of a QA build's pages; absent from every other build).
 *
 * Three jobs that must happen before any application code runs, in code simple enough to parse on an old iOS:
 *   1. catch errors and CSP violations from the very first script, which the module-based collector would otherwise miss;
 *   2. install the "shield": a window-level capture listener, registered before any application listener, that keeps touches, clicks,
 *      focus and keys that land on the diagnostic control away from the application. Without it a document-level "tap outside to close"
 *      or an Earth gesture handler would act on a tap meant for the debug button and change the very state being observed;
 *   3. LAST RESORT: if the full diagnostics module has not started within a few seconds (a syntax the phone cannot parse, a blocked
 *      script, a failed download), show a plain BASIC REPORT button with the user agent, viewport and the errors seen so far. A
 *      device that cannot run the app is exactly the one whose report matters.
 *
 * No imports: this file must stay a plain script, and it avoids newer syntax (no optional chaining) on purpose.
 */
(() => {
    const w = window;
    if (w.__ktDiagBoot)
        return;
    w.__ktDiagBoot = true;
    /* Same rule as environment.isQaHost (a test pins that they agree): local machine, private network, review hosting. Anything else - a
       production domain - gets no listener, no shield and no button, even if these files were ever copied there. ?ktdiag=off disables it. */
    const qaHost = (hostname) => {
        const h = String(hostname || '').toLowerCase();
        if (h === 'localhost' || h === '127.0.0.1' || h === '[::1]' || h === '::1' || /\.localhost$/.test(h))
            return true;
        if (/^10\.\d+\.\d+\.\d+$/.test(h) || /^192\.168\.\d+\.\d+$/.test(h) || /^172\.(1[6-9]|2\d|3[01])\.\d+\.\d+$/.test(h))
            return true;
        return /\.local$/.test(h) || /\.github\.io$/.test(h) || /\.pages\.dev$/.test(h);
    };
    const switchedOff = /[?&]ktdiag=off(?:&|$)/.test(String(location.search || ''));
    if (!qaHost(location.hostname) || switchedOff) {
        w.__KT_QA_DIAGNOSTICS__ = false;
        return;
    }
    w.__KT_QA_DIAGNOSTICS__ = true;
    const early = { t0: performance.now(), errors: [], cspCount: 0 };
    w.__ktDiagEarly = early;
    const shield = { handler: null };
    w.__ktDiagShield = shield;
    window.addEventListener('error', (event) => {
        if (early.errors.length >= 20)
            return;
        const target = event.target;
        if (target && target !== window && target instanceof Element) {
            const src = target.src || target.href || '';
            early.errors.push({ t: Math.round(performance.now()), k: 'resource.error', msg: '', src, line: 0, col: 0, stack: '' });
            return;
        }
        const e = event;
        const err = e.error;
        early.errors.push({
            t: Math.round(performance.now()), k: 'error', msg: String(e.message || 'Script error.').slice(0, 300), src: e.filename || '',
            line: e.lineno || 0, col: e.colno || 0, stack: err && err.stack ? String(err.stack).slice(0, 600) : '',
        });
    }, true);
    document.addEventListener('securitypolicyviolation', () => { early.cspCount += 1; });
    const SHIELDED = [
        'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'touchstart', 'touchmove', 'touchend', 'touchcancel',
        'mousedown', 'mouseup', 'mousemove', 'click', 'dblclick', 'contextmenu', 'wheel', 'focusin', 'focusout', 'keydown', 'keyup',
        'input', 'change', 'gesturestart', 'gesturechange', 'gestureend',
    ];
    for (const type of SHIELDED) {
        window.addEventListener(type, (event) => {
            // At window level an event from inside a control's shadow tree is retargeted to its host.
            const target = event.target;
            if (!target || (target.nodeName !== 'KT-QA-DIAG' && target.nodeName !== 'KT-QA-BASIC'))
                return;
            try {
                if (shield.handler)
                    shield.handler(event);
            }
            catch (error) { /* the control must never throw into the page */ }
            event.stopImmediatePropagation();
        }, { capture: true, passive: true });
    }
    // ---- last resort: the basic report ------------------------------------------------------------------------------------------
    const clip = (text, max) => text.replace(/[?#][^\s"')]*/g, '').replace(/\d{6,}/g, '[n]').replace(/[A-Za-z0-9_-]*\d[A-Za-z0-9_-]{15,}/g, '[token]').slice(0, max);
    const base = (url) => clip(String(url || '').split('/').pop() || '', 80);
    const basicReport = () => {
        const vv = window.visualViewport;
        const experience = document.getElementById('place-experience');
        const lines = [];
        lines.push('KNOW THYSELF - BASIC QA REPORT (the full diagnostics did NOT start on this device)');
        lines.push(`up ${Math.round(performance.now() / 1000)}s | readyState ${document.readyState} | build ${(document.querySelector('meta[name="kt-build"]') || { getAttribute: () => '?' }).getAttribute('content')} | path ${clip(location.pathname, 80)}`);
        lines.push(`UA: ${navigator.userAgent}`);
        lines.push(`layout ${window.innerWidth}x${window.innerHeight} | visual ${vv ? `${vv.width}x${vv.height} @${vv.offsetLeft},${vv.offsetTop} scale ${vv.scale}` : 'API missing'} | screen ${screen.width}x${screen.height} | dpr ${window.devicePixelRatio}`);
        lines.push(`app state: intro=${experience ? experience.getAttribute('data-intro-state') : 'no #place-experience'} state=${experience ? experience.getAttribute('data-state') : '-'}`);
        lines.push(`scripts: ${[].slice.call(document.scripts).map((s) => base(s.src)).filter(Boolean).slice(0, 10).join(', ')}`);
        lines.push(`errors (${early.errors.length}, csp ${early.cspCount}):`);
        for (let i = 0; i < early.errors.length && i < 12; i += 1) {
            const e = early.errors[i];
            lines.push(`  +${e.t}ms ${e.k} ${clip(e.msg, 200)} ${base(e.src)}:${e.line}:${e.col} ${clip(e.stack.split('\n').slice(0, 2).join(' < '), 200)}`);
        }
        lines.push('No names, dates, places or typed text are included.');
        return lines.join('\n');
    };
    const showBasicButton = () => {
        if (w.__ktDiag || document.querySelector('kt-qa-diag') || document.querySelector('kt-qa-basic'))
            return;
        const host = document.createElement('kt-qa-basic');
        host.style.cssText = 'all:initial;position:fixed;left:6px;top:6px;z-index:2147483647;display:block;';
        const root = host.attachShadow({ mode: 'open' });
        const box = document.createElement('div');
        box.innerHTML = '<button type="button" style="font:700 12px -apple-system,system-ui,sans-serif;letter-spacing:.05em;color:#fff;background:#8a2a20;border:1px solid #ffb3a8;border-radius:20px;height:40px;padding:0 14px;touch-action:manipulation">COPY BASIC REPORT</button>'
            + '<textarea readonly style="display:none;width:80vw;height:140px;margin-top:6px;font-size:16px;background:#080a0b;color:#eee;border:1px solid #888"></textarea>';
        root.appendChild(box);
        const button = box.querySelector('button');
        const area = box.querySelector('textarea');
        shield.handler = (event) => {
            if (event.type !== 'click')
                return;
            const text = basicReport();
            area.value = text;
            area.style.display = 'block';
            area.focus();
            area.select();
            area.setSelectionRange(0, text.length);
            let ok = false;
            try {
                ok = document.execCommand('copy');
            }
            catch (error) {
                ok = false;
            }
            if (!ok && navigator.clipboard && navigator.clipboard.writeText)
                navigator.clipboard.writeText(text).then(() => { button.textContent = 'COPIED - PASTE IT'; }, () => { button.textContent = 'PRESS+HOLD THE BOX, COPY'; });
            button.textContent = ok ? 'COPIED - PASTE IT' : 'PRESS+HOLD THE BOX, COPY';
        };
        document.documentElement.appendChild(host);
        const watch = window.setInterval(() => {
            if (w.__ktDiag || document.querySelector('kt-qa-diag')) {
                window.clearInterval(watch);
                host.remove();
            }
        }, 1000);
    };
    window.setTimeout(showBasicButton, 6000);
})();
