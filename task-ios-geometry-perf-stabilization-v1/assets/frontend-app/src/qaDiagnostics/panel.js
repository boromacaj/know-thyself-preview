/*
 * QA DIAGNOSTICS - THE ON-SCREEN CONTROL.
 *
 * Requirements that shaped it:
 *  - ALWAYS REACHABLE. It lives in its own Shadow DOM under <html>, outside the application's layers, with the highest z-index, and is
 *    re-attached if anything removes it. It is re-aligned to the VISUAL viewport (offset and pinch scale), so it stays on screen when
 *    iOS pans or zooms the page for the keyboard.
 *  - INVISIBLE TO THE APP. boot.ts routes every touch/click/focus/key on it to the handler below and stops it there, so the application's
 *    own listeners never see a tap meant for the debug button.
 *  - ONE TAP. The pill on screen IS "COPY DEBUG REPORT". The "..." opens the sheet with Share, the selectable text box and the
 *    "what went wrong" marks.
 *  - NO TECHNICAL KNOWLEDGE. Plain words; when copying is blocked the sheet opens itself with the text already selected and a Share button.
 */
import { buildReport, MESSENGER_BUDGET } from './report.js?v=d9f39e7';
import { copyReport, describeCopy, shareReport } from './delivery.js?v=d9f39e7';
import { DOCK_SLOTS, dockPosition, hostBox } from './placement.js?v=d9f39e7';
const POSITION_KEY = 'ktDiag.pos.v1';
const TAG = 'kt-qa-diag';
const CSS = `
:host { all: initial; display: block; position: fixed; left: 0; top: 0; width: 100vw; height: 100vh; z-index: 2147483647; pointer-events: none;
  transform-origin: 0 0; font: 14px/1.35 -apple-system, system-ui, 'Segoe UI', sans-serif; color: #f4f1ea; -webkit-text-size-adjust: 100%; }
* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
button { font: inherit; color: inherit; border: 0; margin: 0; cursor: pointer; touch-action: manipulation; -webkit-appearance: none; appearance: none; }
.dock { position: absolute; display: flex; align-items: stretch; height: 40px; border-radius: 20px; pointer-events: auto; overflow: hidden;
  background: rgba(14, 18, 20, .86); border: 1px solid rgba(255, 214, 140, .55); box-shadow: 0 2px 10px rgba(0,0,0,.5); opacity: .92; }
.grip { width: 18px; background: rgba(255,214,140,.14); color: #ffd68c; font-size: 13px; letter-spacing: -2px; display: grid; place-items: center; touch-action: none; user-select: none; -webkit-user-select: none; }
.copy { padding: 0 8px; font-weight: 700; font-size: 11px; letter-spacing: .04em; white-space: nowrap; background: transparent; color: #ffe0a3; }
.more { width: 36px; background: rgba(255,255,255,.07); font-size: 20px; position: relative; }
.badge { position: absolute; top: 6px; right: 7px; min-width: 9px; height: 9px; border-radius: 5px; background: #ff5a4d; display: none; }
.badge.on { display: block; }
.toast { position: absolute; left: 8px; right: 8px; padding: 10px 12px; border-radius: 12px; background: rgba(14,18,20,.96); border: 1px solid rgba(255,214,140,.6); pointer-events: none; font-size: 14px; display: none; }
.toast.on { display: block; }
.toast.bad { border-color: #ff7a6d; }
.sheet { position: absolute; left: 8px; right: 8px; top: 8px; bottom: 8px; display: none; flex-direction: column; border-radius: 16px; background: rgba(12,15,17,.97);
  border: 1px solid rgba(255,214,140,.5); pointer-events: auto; overflow: hidden; }
.sheet.on { display: flex; }
.sheet header { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,.1); font-weight: 700; }
.sheet .body { padding: 12px 14px 16px; overflow-y: auto; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; touch-action: pan-y; }
.x { width: 36px; height: 36px; border-radius: 18px; background: rgba(255,255,255,.1); font-size: 18px; }
.steps { margin: 0 0 12px; padding-left: 18px; color: #d8d3c6; }
.big { display: block; width: 100%; min-height: 52px; margin: 0 0 10px; border-radius: 14px; font-weight: 800; letter-spacing: .05em; font-size: 15px; }
.primary { background: #ffd68c; color: #1b1406; }
.secondary { background: rgba(255,255,255,.12); color: #f4f1ea; }
.row { display: flex; flex-wrap: wrap; gap: 8px; margin: 6px 0 12px; }
.chip { min-height: 40px; padding: 0 12px; border-radius: 20px; background: rgba(255,255,255,.1); font-size: 13px; }
.chip.on { background: #6fcf97; color: #07210f; }
.small { min-height: 40px; padding: 0 12px; border-radius: 10px; background: rgba(255,255,255,.08); font-size: 13px; }
.status { min-height: 20px; margin: 0 0 10px; color: #ffe0a3; font-weight: 600; }
.status.bad { color: #ff9c90; }
.meta { color: #9a978d; font-size: 12px; margin-top: 10px; word-break: break-word; }
h3 { margin: 12px 0 4px; font-size: 13px; text-transform: uppercase; letter-spacing: .08em; color: #b9b4a6; }
textarea { width: 100%; height: 150px; margin-top: 8px; border-radius: 10px; border: 1px solid rgba(255,255,255,.2); background: #07090a; color: #e8e4d8;
  font: 16px/1.25 ui-monospace, Menlo, monospace; padding: 8px; display: none; -webkit-user-select: text; user-select: text; }
textarea.on { display: block; }
.sink { position: fixed; left: 0; top: 0; width: 1px; height: 1px; opacity: 0; pointer-events: none; display: block; }
`;
const SHEET_HTML = `
<div class="dock" data-el="dock">
  <div class="grip" data-drag="1" aria-hidden="true">⋮⋮</div>
  <button type="button" class="copy" data-act="copy" aria-label="Copy debug report">COPY DEBUG REPORT</button>
  <button type="button" class="more" data-act="open" aria-label="Open debug menu">⋯<span class="badge" data-el="badge"></span></button>
</div>
<div class="toast" data-el="toast" role="status" aria-live="polite"></div>
<section class="sheet" data-el="sheet" role="dialog" aria-label="Debug report">
  <header><span>Debug report</span><button type="button" class="x" data-act="close" aria-label="Close">✕</button></header>
  <div class="body">
    <ol class="steps"><li>Make the problem happen on screen.</li><li>Tap the gold button below.</li><li>Paste into a message to us and send.</li></ol>
    <p class="status" data-el="status" role="status" aria-live="polite"></p>
    <button type="button" class="big primary" data-act="copy">COPY DEBUG REPORT</button>
    <button type="button" class="big secondary" data-act="share">SHARE REPORT…</button>
    <h3>What went wrong? (optional, tap any)</h3>
    <div class="row" data-el="chips">
      <button type="button" class="chip" data-act="mark" data-what="layout looks broken">Layout looks broken</button>
      <button type="button" class="chip" data-act="mark" data-what="cannot tap a button">Can't tap a button</button>
      <button type="button" class="chip" data-act="mark" data-what="cannot type">Can't type</button>
      <button type="button" class="chip" data-act="mark" data-what="calendar problem">Calendar problem</button>
      <button type="button" class="chip" data-act="mark" data-what="flickering">Flickering</button>
      <button type="button" class="chip" data-act="mark" data-what="stuck or frozen">Stuck / frozen</button>
    </div>
    <h3>More</h3>
    <div class="row">
      <button type="button" class="small" data-act="show">Show report text</button>
      <button type="button" class="small" data-act="copyfull">Copy bigger report</button>
      <button type="button" class="small" data-act="move">Move button</button>
      <button type="button" class="small" data-act="clear">Clear history</button>
    </div>
    <textarea data-el="text" readonly aria-label="Report text" spellcheck="false"></textarea>
    <p class="meta" data-el="meta"></p>
    <p class="meta">Nothing is sent anywhere. The report holds layout measurements, app state names and error messages only: no names, dates, places or anything you typed.</p>
  </div>
</section>
<textarea class="sink" data-el="sink" tabindex="-1" aria-hidden="true"></textarea>
`;
export function mountPanel(collector, env = {}) {
    const host = document.createElement(TAG);
    host.setAttribute('data-kt-qa', 'diagnostics');
    const root = host.attachShadow({ mode: 'open' });
    root.innerHTML = `<style>${CSS}</style>${SHEET_HTML}`;
    const q = (name) => root.querySelector(`[data-el="${name}"]`);
    const dock = q('dock');
    const toast = q('toast');
    const sheet = q('sheet');
    const status = q('status');
    const text = q('text');
    const sink = q('sink');
    const meta = q('meta');
    const badge = q('badge');
    collector.setHost(host);
    let report = null;
    let toastTimer = 0;
    // corner 0 = top centre (the gap between the application's own top-left and top-right controls); -1 = dragged to a free spot
    const SLOTS = DOCK_SLOTS;
    let pos = { x: 0, y: 6, corner: 0 };
    try {
        const stored = JSON.parse(sessionStorage.getItem(POSITION_KEY) ?? 'null');
        if (stored && Number.isFinite(stored.x) && Number.isFinite(stored.y) && Number.isInteger(stored.corner) && stored.corner >= -1 && stored.corner < SLOTS)
            pos = stored;
    }
    catch { /* defaults */ }
    // Resolved at the moment of the tap, not at mount: an in-app browser may attach or withdraw these after the page starts.
    const deliveryEnv = {
        get clipboardWrite() {
            return env.clipboardWrite ?? (navigator.clipboard && typeof navigator.clipboard.writeText === 'function' ? (value) => navigator.clipboard.writeText(value) : undefined);
        },
        get share() {
            return env.share ?? (typeof navigator.share === 'function' ? (data) => navigator.share(data) : undefined);
        },
        execCopy: env.execCopy ?? ((value) => {
            // The text field lives inside this shadow tree, so focusing it does not reach the application's focus listeners (boot.ts shield).
            sink.value = value;
            sink.focus({ preventScroll: true });
            sink.select();
            sink.setSelectionRange(0, value.length);
            let ok = false;
            try {
                ok = document.execCommand('copy');
            }
            catch {
                ok = false;
            }
            sink.blur();
            return ok;
        }),
    };
    // ---- placement: stay inside the VISUAL viewport -------------------------------------------------------------------------------
    const safeTop = () => {
        const probe = document.createElement('div');
        probe.style.cssText = 'position:fixed;left:-9999px;top:0;width:1px;height:1px;visibility:hidden;padding-top:env(safe-area-inset-top);';
        document.documentElement.appendChild(probe);
        const value = parseFloat(getComputedStyle(probe).paddingTop) || 0;
        probe.remove();
        return value;
    };
    let cachedSafeTop = -1;
    let alignFrame = 0;
    const align = () => {
        alignFrame = 0;
        const vv = window.visualViewport;
        const box = hostBox(vv ? { w: vv.width, h: vv.height, ot: vv.offsetTop, ol: vv.offsetLeft, scale: vv.scale } : null, [window.innerWidth, window.innerHeight]);
        host.style.cssText = `left:${box.left}px;top:${box.top}px;width:${box.width}px;height:${box.height}px;transform:scale(${box.counterScale});`;
        if (cachedSafeTop < 0)
            cachedSafeTop = safeTop();
        const { x, y } = dockPosition(box, dock.offsetWidth || 200, cachedSafeTop, pos);
        dock.style.left = `${x}px`;
        dock.style.top = `${y}px`;
        toast.style.top = `${Math.min(y + 48, Math.max(0, box.height - 70))}px`;
    };
    const scheduleAlign = () => { if (!alignFrame)
        alignFrame = window.requestAnimationFrame(align); };
    window.visualViewport?.addEventListener('resize', scheduleAlign, { passive: true });
    window.visualViewport?.addEventListener('scroll', scheduleAlign, { passive: true });
    window.addEventListener('resize', scheduleAlign, { passive: true });
    window.addEventListener('orientationchange', scheduleAlign, { passive: true });
    const savePos = () => { try {
        sessionStorage.setItem(POSITION_KEY, JSON.stringify(pos));
    }
    catch { /* ignore */ } };
    // ---- mounting that survives hostile pages -------------------------------------------------------------------------------------
    const mount = () => {
        if (host.parentNode !== document.documentElement)
            document.documentElement.appendChild(host);
        if (host.hasAttribute('inert'))
            host.removeAttribute('inert');
        if (host.hidden)
            host.hidden = false;
    };
    mount();
    align();
    new MutationObserver(() => { if (host.parentNode !== document.documentElement || host.hasAttribute('inert') || host.hidden)
        mount(); }).observe(document.documentElement, { childList: true });
    new MutationObserver(() => mount()).observe(host, { attributes: true, attributeFilter: ['inert', 'hidden', 'style'] });
    window.addEventListener('pageshow', () => { mount(); scheduleAlign(); });
    // ---- behaviour -----------------------------------------------------------------------------------------------------------------
    const say = (message, bad = false, sticky = false) => {
        status.textContent = message;
        status.classList.toggle('bad', bad);
        toast.textContent = message;
        toast.classList.toggle('bad', bad);
        // the sheet shows the same line in its own status area; a second copy on top of it only gets in the way
        toast.classList.toggle('on', !sheet.classList.contains('on'));
        window.clearTimeout(toastTimer);
        if (!sticky)
            toastTimer = window.setTimeout(() => toast.classList.remove('on'), 4500);
    };
    const refreshMeta = () => {
        const s = collector.stats();
        badge.classList.toggle('on', s.errors > 0);
        meta.textContent = `events ${s.events} · errors ${s.errors}${s.lastError ? ` · last: ${s.lastError}` : ''}${report ? ` · last report ${report.chars} chars (check ${report.checksum})` : ''}`;
    };
    collector.subscribe(refreshMeta);
    refreshMeta();
    const showText = (on) => { text.classList.toggle('on', on); if (on && report) {
        text.value = report.text;
    } };
    const selectText = () => { text.classList.add('on'); text.focus({ preventScroll: true }); text.select(); text.setSelectionRange(0, text.value.length); };
    const build = (full) => {
        const input = collector.buildInput('report-button');
        report = buildReport(input, { budget: full ? null : MESSENGER_BUDGET, guard: collector.guard });
        text.value = report.text;
        refreshMeta();
        return report;
    };
    const copyNow = async (full = false) => {
        say('Building report…', false, true);
        const built = build(full);
        // copyReport starts the clipboard write synchronously, inside this tap.
        const outcome = await copyReport(built.text, deliveryEnv);
        if (outcome.ok) {
            say(describeCopy(outcome, built.chars));
        }
        else {
            sheet.classList.add('on');
            say(describeCopy(outcome, built.chars), true, true);
            selectText();
        }
        return { built, ok: outcome.ok };
    };
    const share = async () => {
        const built = build(false);
        const outcome = await shareReport(built.text, deliveryEnv);
        if (outcome.ok)
            say(outcome.reason === 'sheet dismissed' ? 'Share closed. Nothing was sent.' : 'Shared.');
        else {
            say(`${outcome.reason ?? 'Share failed'}. Use the text box below: press and hold, Select All, Copy.`, true, true);
            selectText();
        }
    };
    const cycleCorner = () => {
        pos = { ...pos, corner: (pos.corner + 1) % SLOTS };
        savePos();
        align();
    };
    // drag by the grip only; everything else on the dock is a plain button
    let drag = null;
    const handle = (event) => {
        const path = event.composedPath();
        const inner = path[0];
        if (!(inner instanceof Element))
            return;
        // A click is itself a PointerEvent in current WebKit and Blink, so the event TYPE decides, not the class.
        if (event instanceof PointerEvent && event.type.startsWith('pointer')) {
            const grip = path.find((n) => n instanceof Element && n.hasAttribute('data-drag'));
            if (event.type === 'pointerdown' && grip) {
                drag = { id: event.pointerId, dx: event.clientX - dock.offsetLeft, dy: event.clientY - dock.offsetTop };
                try {
                    grip.setPointerCapture(event.pointerId);
                }
                catch { /* not capturable */ }
            }
            else if (event.type === 'pointermove' && drag && drag.id === event.pointerId) {
                pos = { x: event.clientX - drag.dx, y: event.clientY - drag.dy - Math.max(cachedSafeTop, 0), corner: -1 };
                align();
            }
            else if ((event.type === 'pointerup' || event.type === 'pointercancel') && drag && drag.id === event.pointerId) {
                drag = null;
                savePos();
            }
            return;
        }
        if (event.type !== 'click')
            return;
        const control = path.find((n) => n instanceof HTMLElement && n.dataset.act);
        if (!control)
            return;
        switch (control.dataset.act) {
            case 'copy':
                void copyNow(false);
                break;
            case 'copyfull':
                void copyNow(true);
                break;
            case 'share':
                void share();
                break;
            case 'open':
                sheet.classList.add('on');
                toast.classList.remove('on');
                refreshMeta();
                break;
            case 'close':
                sheet.classList.remove('on');
                break;
            case 'show':
                build(false);
                showText(true);
                say(`Report ready (${report?.chars ?? 0} characters). Press and hold in the box to select.`);
                break;
            case 'move':
                cycleCorner();
                break;
            case 'clear':
                collector.clear();
                report = null;
                text.value = '';
                text.classList.remove('on');
                say('History cleared.');
                break;
            case 'mark': {
                const what = control.dataset.what ?? 'mark';
                control.classList.add('on');
                collector.mark(what);
                say(`Noted: ${what}. Now tap COPY DEBUG REPORT.`);
                break;
            }
            default: break;
        }
    };
    const shield = window.__ktDiagShield;
    if (shield)
        shield.handler = handle;
    else {
        // boot.ts missing (should not happen in a QA build): fall back to direct listeners so the control still works.
        for (const type of ['click', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel'])
            root.addEventListener(type, handle);
    }
    return { host, copyNow, lastReport: () => report };
}
