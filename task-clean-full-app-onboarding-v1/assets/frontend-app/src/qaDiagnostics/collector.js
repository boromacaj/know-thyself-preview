/*
 * QA DIAGNOSTICS - COLLECTOR (browser). Observes; never changes the application.
 *
 * What it keeps, all bounded and in memory: a rolling event timeline, a few geometry snapshots, error/stall/frame counters and
 * enough of the last page life (in sessionStorage, our own sanitized key only) to explain a silent iOS reload. What it never does:
 * read text, values, cookies or storage contents; send anything anywhere; add a listener that can cancel an event (all passive).
 *
 * COST CONTROL. Listeners are passive and cheap; viewport events are coalesced and counted; geometry snapshots are event-driven and
 * rate-limited (one per ~0.8 s at most) and "light" (rect + a few computed styles of ~30 named elements); the expensive deep scan
 * (ancestor walks, hit tests, whole-document compositing census) runs only when a report is requested.
 */
import { classifyUserAgent } from './environment.js?v=f9ab0a6';
import { RingBuffer } from './ringBuffer.js?v=f9ab0a6';
import { assetName, describeElement, modulePath, PrivacyGuard, sanitizeHash, sanitizeStateValue, sanitizeText, sanitizeUrl, STATE_ATTRIBUTE_ALLOWLIST, } from './redact.js?v=f9ab0a6';
export const DIAG_VERSION = 1;
const STORAGE_KEY = 'ktDiag.v1';
export const CRITICAL_ELEMENTS = Object.freeze([
    ['experience', '#place-experience'],
    ['earthMap', '#earth-map'],
    ['earthCanvas', '#earth-map canvas'],
    ['earthGmp', '#earth-map gmp-map-3d'],
    ['loadingCover', '#earth-loading-cover'],
    ['veil', '#incarnation-veil'],
    ['warp', '#spacetime-intro'],
    ['dock', '#interaction-dock'],
    ['placeQuery', '#place-query', true],
    ['resultsShell', '#place-results-shell'],
    ['birthplaceCard', '#birthplace-card'],
    ['changePlace', '#change-place', true],
    ['confirmPlace', '#confirm-place', true],
    ['vesselStage', '#vessel-stage'],
    ['vesselOrbit', '#vessel-orbit'],
    ['focusedChoice', '.vessel-choice.is-focused', true],
    ['focusedSymbol', '.vessel-choice.is-focused .vessel-symbol'],
    ['arrowLeft', '.vessel-carousel-arrow-left', true],
    ['arrowRight', '.vessel-carousel-arrow-right', true],
    ['vesselUndefined', '#vessel-undefined', true],
    ['confirmVessel', '#confirm-vessel', true],
    ['effectsLayer', '.kt-earth-effects-layer'],
    ['earthRim', '.kt-earth-rim'],
    ['profileFlow', '.profile-flow'],
    ['promptLayer', '.kt-prompt-layer'],
    ['controlsLayer', '.kt-controls-layer'],
    ['pickerLayer', '.kt-picker-layer'],
    ['pickerHost', '.arrival-picker-host'],
    ['calendar', '.arrival-calendar'],
    ['timePicker', '.arrival-time-picker'],
    ['panel', '.profile-panel:not([hidden])'],
    ['panelInput', '.profile-panel:not([hidden]) input:not([type="hidden"]):not([hidden])', true],
    ['panelButton', '.profile-panel:not([hidden]) button:not([hidden])', true],
]);
const TRACKED = [
    '#place-experience', '#vessel-stage', '#interaction-dock', '#place-results-shell', '#birthplace-card', '.profile-flow', '.kt-layer',
    '.arrival-picker-host', '.arrival-calendar', '.arrival-time-picker', '.profile-panel', '.vessel-orbit', '.vessel-choice', '#spacetime-intro',
    '#incarnation-veil', '#earth-loading-cover', '#earth-map', '.kt-earth-rim',
].join(',');
const STATE_ATTRS = new Set(STATE_ATTRIBUTE_ALLOWLIST);
const MUTATION_FILTER = [...STATE_ATTRIBUTE_ALLOWLIST, 'class', 'hidden', 'inert', 'aria-hidden', 'style', 'disabled'];
const rd = (n) => Math.round(n * 10) / 10;
const now = () => Math.round(performance.now());
const px = (value) => {
    const parsed = parseFloat(value ?? '');
    return Number.isFinite(parsed) ? rd(parsed) : 0;
};
export function startCollector() {
    const guard = new PrivacyGuard();
    const events = new RingBuffer(420);
    const errors = new RingBuffer(50);
    const markers = new RingBuffer(20);
    const snapshots = new RingBuffer(12);
    const perfWindows = new RingBuffer(60);
    const counters = Object.create(null);
    /** Time the diagnostics themselves spend in their hottest callbacks: the instrument must be able to show it is not the problem. */
    const cost = { mutationMs: 0, mutationRecords: 0, snapshotMs: 0, snapshots: 0 };
    const listeners = new Set();
    let host = null;
    let firstSnapshot = null;
    let dirty = false;
    const bump = (name, by = 1) => { counters[name] = (counters[name] ?? 0) + by; };
    const notify = () => { for (const listener of listeners) {
        try {
            listener();
        }
        catch { /* UI listener failure must not break collection */ }
    } };
    const clean = (value, max = 160) => guard.scrub(sanitizeText(value, max));
    const ev = (k, data = {}) => {
        const entry = { t: now(), k, ...data };
        events.push(entry);
        dirty = true;
        return entry;
    };
    const inDiag = (event) => {
        if (!host)
            return false;
        if (event.target === host)
            return true;
        try {
            return event.composedPath().includes(host);
        }
        catch {
            return false;
        }
    };
    const d = (element) => describeElement(element);
    // ---------------------------------------------------------------------------------------------------------------------------
    // page life: previous life from sessionStorage, early errors captured by boot.js
    // ---------------------------------------------------------------------------------------------------------------------------
    const early = (window.__ktDiagEarly) ?? {};
    const navEntry = (() => { try {
        return performance.getEntriesByType('navigation')[0];
    }
    catch {
        return undefined;
    } })();
    const navType = navEntry?.type ?? 'unknown';
    const startedEpoch = Date.now() - now();
    let pageshowPersisted = false;
    let previous = null;
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (raw) {
            const old = JSON.parse(raw);
            previous = {
                cleanExit: old.clean === true,
                navType,
                lastEventT: Number(old.lastT) || 0,
                lastState: old.state && typeof old.state === 'object' ? old.state : {},
                tailEvents: Array.isArray(old.tail) ? old.tail.slice(-60) : [],
                errors: Number(old.errors) || 0,
            };
        }
    }
    catch { /* storage unavailable: no previous life to report */ }
    const stackOf = (stack) => {
        if (typeof stack !== 'string')
            return '';
        const frames = [];
        for (const line of stack.split('\n')) {
            const m = /(?:at\s+)?([^\s@(]*)[@(]?\(?(https?:[^\s)]+?):(\d+):(\d+)\)?$/.exec(line.trim());
            if (m)
                frames.push(`${m[1] || 'anon'}@${assetName(m[2])}:${m[3]}:${m[4]}`);
            if (frames.length >= 3)
                break;
        }
        return frames.join(' < ');
    };
    for (const e of early.errors ?? []) {
        const entry = e.k === 'resource.error'
            ? { t: e.t, k: e.k, src: modulePath(e.src), early: true }
            : { t: e.t, k: e.k, msg: clean(e.msg), src: assetName(e.src), line: e.line, col: e.col, stack: clean(stackOf(e.stack), 240), early: true };
        errors.push(entry);
        events.push(entry);
        counters[e.k] = (counters[e.k] ?? 0) + 1;
    }
    if (early.cspCount)
        counters['csp.violation'] = early.cspCount;
    const persist = (cleanExit) => {
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ clean: cleanExit, lastT: now(), state: lastState, tail: events.last(40), errors: errors.length }));
        }
        catch { /* quota or blocked: the report simply has no previous-life section */ }
    };
    // ---------------------------------------------------------------------------------------------------------------------------
    // measurement helpers
    // ---------------------------------------------------------------------------------------------------------------------------
    const unitProbe = () => {
        const probe = document.createElement('div');
        probe.setAttribute('aria-hidden', 'true');
        probe.style.cssText = 'position:fixed;left:-9999px;top:0;width:1px;visibility:hidden;pointer-events:none;contain:strict;';
        const measure = (unit) => {
            try {
                if (!CSS.supports('height', `100${unit}`))
                    return null;
                probe.style.height = `100${unit}`;
                return rd(probe.getBoundingClientRect().height);
            }
            catch {
                return null;
            }
        };
        document.documentElement.appendChild(probe);
        try {
            return { vh: measure('vh'), dvh: measure('dvh'), svh: measure('svh'), lvh: measure('lvh') };
        }
        finally {
            probe.remove();
        }
    };
    const safeAreaProbe = () => {
        const probe = document.createElement('div');
        probe.setAttribute('aria-hidden', 'true');
        probe.style.cssText = 'position:fixed;left:-9999px;top:0;width:1px;height:1px;visibility:hidden;pointer-events:none;'
            + 'padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);';
        document.documentElement.appendChild(probe);
        try {
            const cs = getComputedStyle(probe);
            return [px(cs.paddingTop), px(cs.paddingRight), px(cs.paddingBottom), px(cs.paddingLeft)];
        }
        finally {
            probe.remove();
        }
    };
    const viewportSample = (withUnits) => {
        const de = document.documentElement;
        const vv = window.visualViewport;
        return {
            inner: [window.innerWidth, window.innerHeight],
            client: [de.clientWidth, de.clientHeight],
            outer: [window.outerWidth, window.outerHeight],
            screen: [screen.width, screen.height],
            screenAvail: [screen.availWidth, screen.availHeight],
            vv: vv ? { w: rd(vv.width), h: rd(vv.height), ot: rd(vv.offsetTop), ol: rd(vv.offsetLeft), pt: rd(vv.pageTop), pl: rd(vv.pageLeft), scale: rd(vv.scale * 100) / 100 } : null,
            dpr: window.devicePixelRatio,
            orientation: (screen.orientation && screen.orientation.type) || (typeof window.orientation === 'number' ? `angle${window.orientation}` : 'unknown'),
            scroll: [rd(window.scrollX), rd(window.scrollY)],
            docScroll: [de.scrollWidth, de.scrollHeight],
            bodyScroll: document.body ? [document.body.scrollWidth, document.body.scrollHeight] : [0, 0],
            units: withUnits ? unitProbe() : { vh: null, dvh: null, svh: null, lvh: null },
            safeArea: withUnits ? safeAreaProbe() : [0, 0, 0, 0],
        };
    };
    const styleFacts = (cs) => ({
        pos: cs.position, z: cs.zIndex, disp: cs.display, vis: cs.visibility, op: cs.opacity, pe: cs.pointerEvents,
        ovf: cs.overflowX === cs.overflowY ? cs.overflowX : `${cs.overflowX}/${cs.overflowY}`,
        tf: cs.transform, filter: cs.filter,
        bf: cs.backdropFilter || cs.webkitBackdropFilter || 'none',
        will: cs.willChange, contain: cs.contain || 'none', isolation: cs.isolation, fontSize: cs.fontSize, touchAction: cs.touchAction,
    });
    const makesContainingBlock = (cs) => {
        if (cs.transform && cs.transform !== 'none')
            return { property: 'transform', value: cs.transform.slice(0, 60) };
        if (cs.filter && cs.filter !== 'none')
            return { property: 'filter', value: cs.filter.slice(0, 60) };
        const bf = cs.backdropFilter || cs.webkitBackdropFilter;
        if (bf && bf !== 'none')
            return { property: 'backdrop-filter', value: bf.slice(0, 60) };
        if (cs.perspective && cs.perspective !== 'none')
            return { property: 'perspective', value: cs.perspective };
        if (cs.contain && /paint|layout|strict|content/.test(cs.contain))
            return { property: 'contain', value: cs.contain };
        if (cs.willChange && /transform|filter|perspective|contain/.test(cs.willChange))
            return { property: 'will-change', value: cs.willChange };
        return null;
    };
    const createsStackingContext = (cs) => {
        if (cs.position === 'fixed' || cs.position === 'sticky')
            return true;
        if ((cs.position === 'absolute' || cs.position === 'relative') && cs.zIndex !== 'auto')
            return true;
        if (Number(cs.opacity) < 1)
            return true;
        if (cs.transform !== 'none' || cs.filter !== 'none' || cs.isolation === 'isolate')
            return true;
        if (cs.mixBlendMode && cs.mixBlendMode !== 'normal')
            return true;
        const bf = cs.backdropFilter || cs.webkitBackdropFilter;
        if (bf && bf !== 'none')
            return true;
        return !!cs.willChange && /transform|opacity|filter/.test(cs.willChange);
    };
    const textFieldKind = (el) => {
        if (!el)
            return false;
        if (el instanceof HTMLTextAreaElement)
            return true;
        if (el instanceof HTMLInputElement)
            return !/^(checkbox|radio|button|submit|reset|range|file|image|color|hidden)$/.test(el.type);
        return el.isContentEditable === true;
    };
    const fieldHasValue = (el) => {
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)
            return el.value.length > 0;
        return false;
    };
    const rememberFields = () => {
        for (const field of document.querySelectorAll('input, textarea')) {
            if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
                if (field.type === 'checkbox' || field.type === 'radio' || field.type === 'range')
                    continue;
                guard.remember(field.value);
            }
        }
    };
    const visibleFraction = (rect) => {
        const vv = window.visualViewport;
        if (!vv || rect.width * rect.height <= 0)
            return null;
        const left = Math.max(rect.left, vv.offsetLeft);
        const top = Math.max(rect.top, vv.offsetTop);
        const right = Math.min(rect.right, vv.offsetLeft + vv.width);
        const bottom = Math.min(rect.bottom, vv.offsetTop + vv.height);
        const area = Math.max(0, right - left) * Math.max(0, bottom - top);
        return rd((area / (rect.width * rect.height)) * 100) / 100;
    };
    const hitChainAt = (x, y, depth) => {
        try {
            const list = document.elementsFromPoint(x, y).filter((node) => node !== host && !(host && host.contains(node)));
            return list.slice(0, depth).map(d);
        }
        catch {
            return [];
        }
    };
    const measureElement = (key, selector, interactive, deep) => {
        let all;
        try {
            all = document.querySelectorAll(selector);
        }
        catch {
            all = document.querySelectorAll('.kt-none');
        }
        const el = all[0];
        if (!el) {
            return { key, sel: selector, matches: 0, rect: null, style: null, inVisual: null, rendered: false, inert: false, ariaHidden: false, hiddenAttr: false, interactive, disabled: false };
        }
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        const rect = [rd(r.left), rd(r.top), rd(r.width), rd(r.height)];
        const style = styleFacts(cs);
        const base = {
            key, sel: selector, matches: all.length, rect, style, inVisual: visibleFraction(r), rendered: el.getClientRects().length > 0,
            inert: !!el.closest('[inert]'), ariaHidden: !!el.closest('[aria-hidden="true"]'), hiddenAttr: !!el.closest('[hidden]'),
            interactive, disabled: el.disabled === true,
        };
        if (!deep)
            return base;
        let fixedBreaker = null;
        let clippedBy = null;
        const stacking = [];
        if (cs.position === 'fixed') {
            for (let a = el.parentElement; a && a !== document.documentElement; a = a.parentElement) {
                const found = makesContainingBlock(getComputedStyle(a));
                if (found) {
                    fixedBreaker = { by: d(a), ...found };
                    break;
                }
            }
        }
        const area = r.width * r.height;
        for (let a = el; a; a = a.parentElement) {
            const acs = a === el ? cs : getComputedStyle(a);
            if (stacking.length < 6 && createsStackingContext(acs))
                stacking.push(`${d(a)}(z=${acs.zIndex})`);
            if (a !== el && !clippedBy && cs.position !== 'fixed' && area > 0 && /hidden|clip|scroll|auto/.test(`${acs.overflowX}${acs.overflowY}`) && (cs.position !== 'absolute' || acs.position !== 'static')) {
                const ar = a.getBoundingClientRect();
                const ix = Math.max(0, Math.min(r.right, ar.right) - Math.max(r.left, ar.left));
                const iy = Math.max(0, Math.min(r.bottom, ar.bottom) - Math.max(r.top, ar.top));
                if ((ix * iy) / area < 0.6)
                    clippedBy = `${d(a)}(overflow=${acs.overflowX}/${acs.overflowY})`;
            }
        }
        let hitChain;
        let hitOk = null;
        if (interactive && area > 0 && base.inVisual !== null && base.inVisual > 0) {
            const cx = Math.min(Math.max(r.left + r.width / 2, 0), window.innerWidth - 1);
            const cy = Math.min(Math.max(r.top + r.height / 2, 0), window.innerHeight - 1);
            let top;
            try {
                top = document.elementsFromPoint(cx, cy).find((node) => node !== host && !(host && host.contains(node)));
            }
            catch { /* ignore */ }
            hitChain = hitChainAt(cx, cy, 5);
            hitOk = top ? top === el || el.contains(top) : null;
        }
        return { ...base, fixedBreaker, stacking, clippedBy, hitChain, hitOk };
    };
    let lastState = {};
    const readState = () => {
        const state = {};
        const takeAttrs = (el, prefix) => {
            if (!el)
                return;
            for (const name of STATE_ATTRIBUTE_ALLOWLIST) {
                if (el.hasAttribute(name))
                    state[prefix ? `${prefix}:${name}` : name] = sanitizeStateValue(el.getAttribute(name));
            }
        };
        const experience = document.getElementById('place-experience');
        takeAttrs(experience, '');
        const stage = document.getElementById('vessel-stage');
        takeAttrs(stage, 'stage');
        takeAttrs(document.querySelector('.profile-flow'), 'flow');
        takeAttrs(document.querySelector('.kt-picker-layer'), 'picker');
        if (stage) {
            const tokens = [...stage.classList].filter((token) => /^is-[a-z-]{1,30}$/.test(token));
            if (tokens.length)
                state['stage:classes'] = tokens.join(' ');
            for (const name of ['--kt-earth-rim-x', '--kt-earth-rim-y', '--kt-earth-rim-size', '--kt-earth-rim-top-y']) {
                const value = stage.style.getPropertyValue(name).trim();
                if (value)
                    state[name] = value.slice(0, 20);
            }
        }
        if (experience) {
            const kb = experience.style.getPropertyValue('--kt-keyboard-dock-bottom').trim();
            if (kb)
                state['--kt-keyboard-dock-bottom'] = kb.slice(0, 20);
        }
        return state;
    };
    const focusFacts = () => {
        let active = document.activeElement;
        if (active && host && (active === host || host.contains(active)))
            active = null;
        const text = textFieldKind(active);
        return {
            active: active ? d(active) : '(none)', textField: text, hasValue: text && fieldHasValue(active),
            fontSize: text && active ? getComputedStyle(active).fontSize : null,
        };
    };
    const snapshotNow = (reason, deep) => {
        const viewport = viewportSample(deep);
        const elements = CRITICAL_ELEMENTS.map(([key, selector, interactive]) => measureElement(key, selector, interactive === true, deep));
        lastState = readState();
        const vv = viewport.vv;
        const keyboardInset = vv ? Math.max(0, Math.round(viewport.inner[1] - (vv.h + vv.ot))) : 0;
        let grid;
        if (deep) {
            const vx = vv ? vv.ol : 0;
            const vy = vv ? vv.ot : 0;
            const vw = vv ? vv.w : viewport.inner[0];
            const vh = vv ? vv.h : viewport.inner[1];
            const cells = [];
            for (const fy of [0.12, 0.5, 0.88]) {
                for (const fx of [0.16, 0.5, 0.84]) {
                    const x = Math.min(Math.max(vx + vw * fx, 0), viewport.inner[0] - 1);
                    const y = Math.min(Math.max(vy + vh * fy, 0), viewport.inner[1] - 1);
                    const chain = hitChainAt(x, y, 4);
                    cells.push({ p: [Math.round(x), Math.round(y)], top: chain[0] ?? '(none)', chain });
                }
            }
            grid = cells;
        }
        const snapshot = {
            t: now(), reason, depth: deep ? 'deep' : 'light', viewport, focus: focusFacts(), keyboardInset, state: lastState, elements, ...(grid ? { grid } : {}),
        };
        return snapshot;
    };
    // ---------------------------------------------------------------------------------------------------------------------------
    // rate-limited event-driven snapshots
    // ---------------------------------------------------------------------------------------------------------------------------
    let snapTimer = 0;
    let lastSnapAt = 0;
    let pendingReason = '';
    const requestSnapshot = (reason, delay = 120) => {
        pendingReason = pendingReason ? `${pendingReason}+${reason}`.slice(0, 60) : reason;
        if (snapTimer)
            return;
        const wait = Math.max(delay, 800 - (performance.now() - lastSnapAt));
        snapTimer = window.setTimeout(() => {
            snapTimer = 0;
            lastSnapAt = performance.now();
            const why = pendingReason;
            pendingReason = '';
            const started = performance.now();
            try {
                const snapshot = snapshotNow(why, false);
                snapshots.push(snapshot);
                if (!firstSnapshot)
                    firstSnapshot = snapshot;
                bump('snapshot');
            }
            catch (error) {
                ev('diag.error', { where: 'snapshot', msg: clean(error) });
            }
            cost.snapshotMs += performance.now() - started;
            cost.snapshots += 1;
        }, wait);
    };
    // ---------------------------------------------------------------------------------------------------------------------------
    // errors
    // ---------------------------------------------------------------------------------------------------------------------------
    const stackSummary = stackOf;
    const lastErrorText = { text: '' };
    const recordError = (k, data) => {
        const entry = ev(k, data);
        errors.push(entry);
        bump(k);
        lastErrorText.text = `${k}: ${String(data.msg ?? data.src ?? '')}`.slice(0, 120);
        requestSnapshot('error', 250);
        notify();
    };
    const resourceFailures = [];
    window.addEventListener('error', (event) => {
        const target = event.target;
        if (target && target !== window && target instanceof Element) {
            const src = target.src || target.href || target.currentSrc || '';
            const name = `${target.tagName.toLowerCase()}:${modulePath(src)}`;
            if (!resourceFailures.includes(name))
                resourceFailures.push(name);
            recordError('resource.error', { tag: target.tagName.toLowerCase(), src: modulePath(src), module: target.type === 'module' });
            return;
        }
        const e = event;
        recordError('error', { msg: clean(e.message || 'Script error.'), src: assetName(e.filename), line: e.lineno, col: e.colno, stack: clean(stackSummary(e.error && e.error.stack), 240) });
    }, true);
    window.addEventListener('unhandledrejection', (event) => {
        const reason = event.reason;
        const isError = reason instanceof Error;
        recordError('rejection', { msg: clean(isError ? `${reason.name}: ${reason.message}` : reason), stack: clean(isError ? stackSummary(reason.stack) : '', 240) });
    });
    document.addEventListener('securitypolicyviolation', (event) => {
        const e = event;
        bump('csp.violation');
        ev('csp', { directive: clean(e.violatedDirective, 60), blocked: assetName(e.blockedURI) });
    });
    for (const level of ['error', 'warn']) {
        try {
            const original = console[level].bind(console);
            let lastText = '';
            let repeat = 0;
            console[level] = (...args) => {
                try {
                    const text = clean(args.map((a) => (typeof a === 'string' ? a : a instanceof Error ? `${a.name}: ${a.message}` : '[obj]')).join(' '), 160);
                    bump(`console.${level}`);
                    if (text === lastText) {
                        repeat += 1;
                        if (repeat % 20 !== 0) {
                            original(...args);
                            return;
                        }
                    }
                    else {
                        lastText = text;
                        repeat = 0;
                    }
                    ev(`console.${level}`, { msg: text });
                }
                catch { /* never let diagnostics break logging */ }
                original(...args);
            };
        }
        catch { /* console not writable */ }
    }
    // ---------------------------------------------------------------------------------------------------------------------------
    // viewport: coalesced, counted, storm-detected
    // ---------------------------------------------------------------------------------------------------------------------------
    let vpKey = '';
    let stormWindowStart = 0;
    let stormCount = 0;
    let vpTimer = 0;
    const onViewport = (source) => {
        bump('viewport.event');
        const t = performance.now();
        if (t - stormWindowStart > 1000) {
            stormWindowStart = t;
            stormCount = 0;
        }
        stormCount += 1;
        if (stormCount === 20) {
            bump('viewport.storm');
            ev('vp.storm', { source, in1s: 20 });
        }
        if (vpTimer)
            return;
        vpTimer = window.setTimeout(() => {
            vpTimer = 0;
            const vv = window.visualViewport;
            const key = `${window.innerWidth}x${window.innerHeight}|${vv ? `${rd(vv.width)}x${rd(vv.height)}@${rd(vv.offsetLeft)},${rd(vv.offsetTop)}*${rd(vv.scale * 100) / 100}` : '-'}|${rd(window.scrollY)}`;
            if (key === vpKey)
                return;
            vpKey = key;
            ev('vp', {
                iw: window.innerWidth, ih: window.innerHeight, vw: vv ? rd(vv.width) : null, vh: vv ? rd(vv.height) : null,
                ox: vv ? rd(vv.offsetLeft) : null, oy: vv ? rd(vv.offsetTop) : null, s: vv ? rd(vv.scale * 100) / 100 : null, sy: rd(window.scrollY), src: source,
            });
            requestSnapshot('viewport', 300);
        }, 90);
    };
    window.visualViewport?.addEventListener('resize', () => onViewport('vv.resize'), { passive: true });
    window.visualViewport?.addEventListener('scroll', () => onViewport('vv.scroll'), { passive: true });
    window.addEventListener('resize', () => onViewport('resize'), { passive: true });
    window.addEventListener('scroll', () => onViewport('scroll'), { passive: true });
    window.addEventListener('orientationchange', () => { ev('orientationchange', { o: screen.orientation?.type ?? 'n/a' }); requestSnapshot('orientation', 500); }, { passive: true });
    document.addEventListener('gesturestart', () => { bump('gesture.pinch'); ev('gesturestart'); }, { passive: true });
    // ---------------------------------------------------------------------------------------------------------------------------
    // page lifecycle and navigation
    // ---------------------------------------------------------------------------------------------------------------------------
    window.addEventListener('pageshow', (event) => {
        pageshowPersisted = event.persisted;
        ev('pageshow', { persisted: event.persisted });
        requestSnapshot('pageshow', 200);
        persist(false);
    });
    window.addEventListener('pagehide', (event) => { ev('pagehide', { persisted: event.persisted }); persist(true); });
    document.addEventListener('visibilitychange', () => { ev('visibility', { v: document.visibilityState }); if (document.visibilityState === 'visible')
        requestSnapshot('visible', 300);
    else
        persist(false); });
    document.addEventListener('freeze', () => ev('freeze'));
    document.addEventListener('resume', () => ev('resume'));
    window.addEventListener('online', () => ev('online'));
    window.addEventListener('offline', () => ev('offline'));
    window.addEventListener('popstate', () => { bump('nav.pop'); ev('nav.pop', { path: sanitizeUrl(location.pathname).url, hash: sanitizeHash(location.hash) }); requestSnapshot('popstate', 250); });
    window.addEventListener('hashchange', () => ev('nav.hash', { hash: sanitizeHash(location.hash) }));
    for (const method of ['pushState', 'replaceState']) {
        try {
            const original = history[method].bind(history);
            history[method] = ((data, unused, url) => {
                original(data, unused, url);
                bump(`nav.${method}`);
                ev(`nav.${method}`, { path: sanitizeUrl(location.pathname).url, hash: sanitizeHash(location.hash), len: history.length });
            });
        }
        catch { /* history not patchable */ }
    }
    for (const name of ['webglcontextlost', 'webglcontextrestored']) {
        window.addEventListener(name, (event) => {
            bump(name === 'webglcontextlost' ? 'webgl.contextlost' : 'webgl.contextrestored');
            ev(name, { tgt: d(event.target) });
        }, true);
    }
    // ---------------------------------------------------------------------------------------------------------------------------
    // keyboard / focus / input lifecycle (never values)
    // ---------------------------------------------------------------------------------------------------------------------------
    let lastFocusIn = 0;
    let lastInputEv = 0;
    let inputBurst = 0;
    document.addEventListener('focusin', (event) => {
        if (inDiag(event))
            return;
        const target = event.target;
        lastFocusIn = performance.now();
        const text = textFieldKind(target);
        const vv = window.visualViewport;
        ev('focus.in', { tgt: d(target), text, fs: text && target ? getComputedStyle(target).fontSize : null, vh: vv ? rd(vv.height) : null, ih: window.innerHeight, s: vv ? rd(vv.scale * 100) / 100 : null });
        if (text) {
            requestSnapshot('focusin', 80);
            window.setTimeout(() => requestSnapshot('focusin+keyboard', 0), 650);
        }
    }, { capture: true, passive: true });
    document.addEventListener('focusout', (event) => {
        if (inDiag(event))
            return;
        const target = event.target;
        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)
            guard.remember(target.value);
        const sinceIn = performance.now() - lastFocusIn;
        if (sinceIn < 250 && textFieldKind(target))
            bump('focus.bounce');
        ev('focus.out', { tgt: d(target), afterMs: Math.round(sinceIn), hasValue: textFieldKind(target) && fieldHasValue(target) });
        window.setTimeout(() => requestSnapshot('focusout', 0), 450);
    }, { capture: true, passive: true });
    for (const name of ['input', 'change']) {
        document.addEventListener(name, (event) => {
            if (inDiag(event))
                return;
            const target = event.target;
            if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)
                guard.remember(target.value);
            bump(`field.${name}`);
            const t = performance.now();
            inputBurst += 1;
            if (name === 'change' || t - lastInputEv > 600) {
                lastInputEv = t;
                const kind = target instanceof HTMLInputElement ? target.type : target instanceof HTMLTextAreaElement ? 'textarea' : 'other';
                ev(`field.${name}`, { tgt: d(target), type: kind, n: inputBurst });
                inputBurst = 0;
            }
        }, { capture: true, passive: true });
    }
    const gestures = new Map();
    let lastTapDown = null;
    window.addEventListener('pointerdown', (event) => {
        if (inDiag(event))
            return;
        const hitChain = hitChainAt(event.clientX, event.clientY, 3);
        // the target can be the document or window for a synthetic event; only an Element has computed style
        const target = event.target instanceof Element ? event.target : null;
        const g = {
            id: event.pointerId, t0: now(), x0: Math.round(event.clientX), y0: Math.round(event.clientY), x: event.clientX, y: event.clientY,
            tgt: d(target), hit: hitChain[0] ?? '(none)', chain: hitChain, moves: 0, inert: !!target?.closest?.('[inert]'),
            pe: target ? getComputedStyle(target).pointerEvents : 'n/a', type: event.pointerType, pendingClick: false, clicked: false, dp: false, targetEl: target,
        };
        gestures.set(event.pointerId, g);
        lastTapDown = g;
        bump('pointer.down');
    }, { capture: true, passive: true });
    window.addEventListener('pointermove', (event) => {
        const g = gestures.get(event.pointerId);
        if (g) {
            g.x = event.clientX;
            g.y = event.clientY;
            g.moves += 1;
        }
    }, { capture: true, passive: true });
    const finishGesture = (event, cancelled) => {
        const g = gestures.get(event.pointerId);
        if (!g)
            return;
        gestures.delete(event.pointerId);
        const dur = now() - g.t0;
        const dist = Math.hypot(event.clientX - g.x0, event.clientY - g.y0);
        const common = { tgt: g.tgt, hit: g.hit, ...(g.hit !== g.tgt ? { chain: g.chain } : {}), x: g.x0, y: g.y0, pt: g.type, dur };
        if (cancelled) {
            bump('pointer.cancel');
            ev('ptr.cancel', { ...common, moved: Math.round(dist), moves: g.moves });
            requestSnapshot('pointercancel', 150);
            return;
        }
        if (dist >= 10 || dur > 700) {
            ev('swipe', { ...common, dx: Math.round(event.clientX - g.x0), dy: Math.round(event.clientY - g.y0), moves: g.moves });
            return;
        }
        g.pendingClick = true;
        const el = g.targetEl;
        window.setTimeout(() => {
            if (g.clicked)
                return;
            bump('tap.noclick');
            ev('tap.noclick', { ...common, inert: g.inert, pe: g.pe, dis: el?.disabled === true, connected: el ? el.isConnected : null, dp: g.dp });
            requestSnapshot('tap.noclick', 100);
            notify();
        }, 450);
    };
    window.addEventListener('pointerup', (event) => { if (!inDiag(event))
        finishGesture(event, false); }, { capture: true, passive: true });
    window.addEventListener('pointercancel', (event) => { if (!inDiag(event))
        finishGesture(event, true); }, { capture: true, passive: true });
    // bubble phase: sees whether application handlers cancelled the touch
    for (const name of ['touchstart', 'touchend']) {
        window.addEventListener(name, (event) => {
            if (inDiag(event))
                return;
            if (event.defaultPrevented) {
                bump('touch.defaultPrevented');
                if (lastTapDown)
                    lastTapDown.dp = true;
                if ((counters['touch.defaultPrevented'] ?? 0) <= 12)
                    ev('touch.dp', { type: name, tgt: d(event.target) });
            }
        }, { passive: true });
    }
    window.addEventListener('click', (event) => {
        if (inDiag(event))
            return;
        bump('click');
        // a programmatic .click() by the application is not the browser delivering the person's tap
        if (!event.isTrusted)
            return;
        for (const g of gestures.values())
            g.clicked = true;
        if (lastTapDown && lastTapDown.pendingClick) {
            lastTapDown.clicked = true;
            const clickTgt = d(event.target);
            ev('tap', { tgt: lastTapDown.tgt, hit: lastTapDown.hit, clickOn: clickTgt, x: lastTapDown.x0, y: lastTapDown.y0, pt: lastTapDown.type, ...(clickTgt !== lastTapDown.tgt ? { retargeted: true } : {}) });
        }
    }, { capture: true, passive: true });
    // ---------------------------------------------------------------------------------------------------------------------------
    // application state transitions and DOM churn (flicker / re-render evidence)
    // ---------------------------------------------------------------------------------------------------------------------------
    const mutationCounts = new Map();
    let mutBucketStart = 0;
    let mutBucket = 0;
    let mutPeak = 0;
    let lastLayerSnapAt = 0;
    const countMutation = (target) => {
        const t = performance.now();
        if (t - mutBucketStart > 1000) {
            mutBucketStart = t;
            mutBucket = 0;
        }
        mutBucket += 1;
        if (mutBucket > mutPeak) {
            mutPeak = mutBucket;
            counters['mutation.peak'] = 1;
        }
        if (mutationCounts.has(target) || mutationCounts.size < 64)
            mutationCounts.set(target, (mutationCounts.get(target) ?? 0) + 1);
    };
    const pickerCheck = () => {
        const calendar = measureElement('calendar', '.arrival-calendar', false, false);
        const time = measureElement('timePicker', '.arrival-time-picker', false, false);
        const shown = [calendar, time].find((x) => x.matches > 0 && x.rect && x.rect[2] > 0);
        const cx = shown?.rect ? Math.round(shown.rect[0] + shown.rect[2] / 2) : 0;
        const cy = shown?.rect ? Math.round(shown.rect[1] + shown.rect[3] / 2) : 0;
        ev('picker.check', {
            calendar: calendar.matches ? calendar.rect : null, time: time.matches ? time.rect : null,
            inView: shown?.inVisual ?? null, topAtCentre: shown ? hitChainAt(Math.min(Math.max(cx, 0), window.innerWidth - 1), Math.min(Math.max(cy, 0), window.innerHeight - 1), 2) : null,
            mode: sanitizeStateValue(document.querySelector('.kt-picker-layer')?.getAttribute('data-picker-mode')),
        });
    };
    const handleMutations = (records) => {
        let adds = 0;
        for (const r of records) {
            if (r.type === 'childList') {
                adds += r.addedNodes.length + r.removedNodes.length;
                continue;
            }
            const target = r.target;
            if (host && (target === host || host.contains(target)))
                continue;
            const name = r.attributeName ?? '';
            if (name === 'style') {
                countMutation(target);
                continue;
            }
            let tracked = false;
            try {
                tracked = target.matches(TRACKED);
            }
            catch {
                tracked = false;
            }
            if (!tracked) {
                if (name === 'class')
                    countMutation(target);
                continue;
            }
            countMutation(target);
            if (STATE_ATTRS.has(name)) {
                const from = sanitizeStateValue(r.oldValue);
                const to = sanitizeStateValue(target.getAttribute(name));
                if (from === to)
                    continue;
                bump('state.change');
                ev('state', { tgt: d(target), attr: name, from, to });
                requestSnapshot(`state:${name.replace('data-', '')}`, 160);
                if (name === 'data-picker-mode')
                    window.setTimeout(pickerCheck, 380);
            }
            else if (name === 'class') {
                const before = new Set((r.oldValue ?? '').split(/\s+/).filter(Boolean));
                const after = new Set([...target.classList]);
                const added = [...after].filter((c) => !before.has(c) && /^(is|kt)-[a-z0-9-]{1,32}$/.test(c));
                const removed = [...before].filter((c) => !after.has(c) && /^(is|kt)-[a-z0-9-]{1,32}$/.test(c));
                if (added.length || removed.length) {
                    bump('class.change');
                    ev('class', { tgt: d(target), add: added.join(' '), rem: removed.join(' ') });
                    if (performance.now() - lastLayerSnapAt > 1500) {
                        lastLayerSnapAt = performance.now();
                        requestSnapshot('class', 200);
                    }
                }
            }
            else if (name === 'hidden' || name === 'inert' || name === 'aria-hidden' || name === 'disabled') {
                bump('attr.change');
                ev('attr', { tgt: d(target), attr: name, to: target.hasAttribute(name) ? sanitizeStateValue(target.getAttribute(name)) || 'set' : 'removed' });
                requestSnapshot(`attr:${name}`, 200);
            }
        }
        if (adds >= 30) {
            bump('dom.burst');
            ev('dom.burst', { nodes: adds });
        }
    };
    const mutations = new MutationObserver((records) => {
        const started = performance.now();
        try {
            handleMutations(records);
        }
        finally {
            cost.mutationMs += performance.now() - started;
            cost.mutationRecords += records.length;
        }
    });
    const startMutations = () => {
        mutations.observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeOldValue: true, attributeFilter: MUTATION_FILTER });
    };
    // ---------------------------------------------------------------------------------------------------------------------------
    // frame pacing and main-thread stalls (Safari has no Long Tasks API)
    // ---------------------------------------------------------------------------------------------------------------------------
    const frameWin = { frames: 0, max: 0, slow: 0, vslow: 0, drift: 0 };
    const perfTotals = { frames: 0, slow: 0, vslow: 0, worst: 0, drift: 0 };
    let lastFrame = 0;
    let lastStallEvent = 0;
    const frame = (ts) => {
        if (lastFrame) {
            const gap = ts - lastFrame;
            frameWin.frames += 1;
            perfTotals.frames += 1;
            if (gap > frameWin.max)
                frameWin.max = gap;
            if (gap > perfTotals.worst)
                perfTotals.worst = gap;
            if (gap > 100) {
                frameWin.vslow += 1;
                perfTotals.vslow += 1;
                if (ts - lastStallEvent > 2000) {
                    lastStallEvent = ts;
                    ev('frame.stall', { gap: Math.round(gap) });
                }
            }
            else if (gap > 34) {
                frameWin.slow += 1;
                perfTotals.slow += 1;
            }
        }
        lastFrame = ts;
        window.requestAnimationFrame(frame);
    };
    document.addEventListener('visibilitychange', () => { lastFrame = 0; });
    let tickAt = performance.now();
    let tickCount = 0;
    window.setInterval(() => {
        const t = performance.now();
        const drift = Math.max(0, t - tickAt - 1000);
        tickAt = t;
        if (drift > frameWin.drift)
            frameWin.drift = drift;
        if (drift > perfTotals.drift)
            perfTotals.drift = drift;
        tickCount += 1;
        if (tickCount % 5 === 0) {
            perfWindows.push({ t: now(), frames: frameWin.frames, maxGapMs: Math.round(frameWin.max), slow: frameWin.slow, verySlow: frameWin.vslow, timerDriftMaxMs: Math.round(frameWin.drift) });
            frameWin.frames = 0;
            frameWin.max = 0;
            frameWin.slow = 0;
            frameWin.vslow = 0;
            frameWin.drift = 0;
        }
        if (dirty && tickCount % 3 === 0) {
            persist(false);
            dirty = false;
        }
    }, 1000);
    let longTasks = null;
    const paint = {};
    try {
        const supported = PerformanceObserver.supportedEntryTypes ?? [];
        if (supported.includes('longtask')) {
            longTasks = 0;
            new PerformanceObserver((list) => { longTasks = (longTasks ?? 0) + list.getEntries().length; }).observe({ type: 'longtask', buffered: true });
        }
        if (supported.includes('layout-shift')) {
            new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    const shift = entry;
                    if (shift.hadRecentInput || (shift.value ?? 0) < 0.05)
                        continue;
                    bump('perf.layoutshift');
                    if ((counters['perf.layoutshift'] ?? 0) <= 10)
                        ev('layout.shift', { v: rd((shift.value ?? 0) * 1000) / 1000 });
                }
            }).observe({ type: 'layout-shift', buffered: true });
        }
        if (supported.includes('paint')) {
            new PerformanceObserver((list) => { for (const e of list.getEntries())
                paint[e.name] = Math.round(e.startTime); }).observe({ type: 'paint', buffered: true });
        }
    }
    catch { /* observers are optional */ }
    // ---------------------------------------------------------------------------------------------------------------------------
    // report-time census
    // ---------------------------------------------------------------------------------------------------------------------------
    const compositingCensus = () => {
        const all = document.body ? document.body.querySelectorAll('*') : [];
        const limit = Math.min(all.length, 6000);
        let backdrop = 0;
        let filter = 0;
        let will = 0;
        let fixed = 0;
        let transformed = 0;
        const overlays = [];
        const overflow = [];
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        for (let index = 0; index < limit; index += 1) {
            const el = all[index];
            if (host && (el === host || host.contains(el)))
                continue;
            const cs = getComputedStyle(el);
            if (cs.display === 'none')
                continue;
            const bf = cs.backdropFilter || cs.webkitBackdropFilter;
            if (bf && bf !== 'none')
                backdrop += 1;
            if (cs.filter !== 'none')
                filter += 1;
            if (cs.willChange !== 'auto')
                will += 1;
            if (cs.position === 'fixed')
                fixed += 1;
            if (cs.transform !== 'none')
                transformed += 1;
            if (cs.visibility === 'hidden')
                continue;
            if (cs.position === 'fixed' || cs.position === 'absolute') {
                const r = el.getBoundingClientRect();
                const cover = (Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0)) * Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0))) / (vw * vh);
                if (cover >= 0.4)
                    overlays.push({ d: d(el), rect: [rd(r.left), rd(r.top), rd(r.width), rd(r.height)], z: cs.zIndex, pe: cs.pointerEvents, op: cs.opacity, cover: rd(cover * 100) / 100 });
            }
            if (overflow.length < 40 && Number(cs.opacity) > 0) {
                const r = el.getBoundingClientRect();
                if (r.width > 0 && (r.right > vw + 1 || r.left < -1))
                    overflow.push({ d: d(el), right: rd(r.right), left: rd(r.left) });
            }
        }
        overflow.sort((a, b) => Math.max(b.right - vw, -b.left) - Math.max(a.right - vw, -a.left));
        const canvases = [...document.querySelectorAll('canvas')].slice(0, 8).map((c) => {
            const r = c.getBoundingClientRect();
            let ctx = 'unknown';
            try {
                ctx = c.__ctx ?? 'n/a';
            }
            catch { /* ignore */ }
            return { d: d(c), px: [c.width, c.height], css: [rd(r.width), rd(r.height)], megapixels: rd((c.width * c.height) / 1e6), ctx };
        });
        const videos = [...document.querySelectorAll('video')].slice(0, 4).map((v) => ({
            d: d(v), paused: v.paused, ready: v.readyState, network: v.networkState, err: v.error ? v.error.code : null, muted: v.muted, inline: v.playsInline, t: rd(v.currentTime), src: assetName(v.currentSrc),
        }));
        let animationsRunning = null;
        let animationTargets = [];
        try {
            const running = document.getAnimations().filter((a) => a.playState === 'running');
            animationsRunning = running.length;
            const byTarget = new Map();
            for (const a of running) {
                const target = a.effect?.target ?? null;
                const name = target ? d(target) : '(none)';
                byTarget.set(name, (byTarget.get(name) ?? 0) + 1);
            }
            animationTargets = [...byTarget.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name, n]) => `${name} x${n}`);
        }
        catch { /* getAnimations missing */ }
        return {
            elementsScanned: limit, backdropFilter: backdrop, filter, willChange: will, fixed, transformed, animationsRunning, animationTargets, canvases, videos,
            largeOverlays: overlays.sort((a, b) => b.cover - a.cover).slice(0, 20), overflowOffenders: overflow.slice(0, 8),
        };
    };
    const environment = () => {
        const nav = navigator;
        const cls = classifyUserAgent(nav.userAgent, { platform: nav.platform, maxTouchPoints: nav.maxTouchPoints, standalone: nav.standalone });
        const mq = (q) => { try {
            return window.matchMedia(q).matches;
        }
        catch {
            return false;
        } };
        const sup = (a, b) => { try {
            return b ? CSS.supports(a, b) : CSS.supports(a);
        }
        catch {
            return false;
        } };
        const storage = {};
        for (const name of ['localStorage', 'sessionStorage']) {
            try {
                const s = window[name];
                s.setItem('__ktdiag_probe', '1');
                s.removeItem('__ktdiag_probe');
                storage[name] = 'ok';
            }
            catch (error) {
                storage[name] = `blocked:${error?.name ?? 'error'}`;
            }
        }
        storage.indexedDB = typeof indexedDB === 'undefined' ? 'missing' : 'ok';
        return {
            ua: nav.userAgent, ios: cls.ios, iosVersion: cls.iosVersion, device: cls.device, browser: cls.browser, browserVersion: cls.browserVersion,
            inAppBrowser: cls.inAppBrowser, engine: cls.engine, notes: cls.notes, platform: nav.platform, maxTouchPoints: nav.maxTouchPoints,
            cores: nav.hardwareConcurrency ?? null, deviceMemoryGB: nav.deviceMemory ?? null, lang: nav.language, languages: [...(nav.languages ?? [])].slice(0, 4),
            tzOffsetMin: new Date().getTimezoneOffset(), standalone: typeof nav.standalone === 'boolean' ? nav.standalone : null, cookieEnabled: nav.cookieEnabled,
            online: nav.onLine, connection: nav.connection ? `${nav.connection.effectiveType ?? '?'}${nav.connection.saveData ? ' save-data' : ''}` : null,
            media: {
                reducedMotion: mq('(prefers-reduced-motion: reduce)'), coarsePointer: mq('(pointer: coarse)'), hoverNone: mq('(hover: none)'),
                standaloneDisplay: mq('(display-mode: standalone)'), dark: mq('(prefers-color-scheme: dark)'), reducedTransparency: mq('(prefers-reduced-transparency: reduce)'),
            },
            css: {
                'backdrop-filter': sup('backdrop-filter', 'blur(1px)') || sup('-webkit-backdrop-filter', 'blur(1px)'), dvh: sup('height', '1dvh'), svh: sup('height', '1svh'),
                lvh: sup('height', '1lvh'), 'env()': sup('padding', 'env(safe-area-inset-top)'), contain: sup('contain', 'paint'), ':has()': sup('selector(:has(*))'),
                'overscroll-behavior': sup('overscroll-behavior', 'none'), 'aspect-ratio': sup('aspect-ratio', '1/1'),
            },
            apis: {
                visualViewport: !!window.visualViewport, 'clipboard.writeText': !!navigator.clipboard?.writeText, share: typeof navigator.share === 'function',
                execCommand: typeof document.execCommand === 'function', inert: 'inert' in HTMLElement.prototype, popover: 'popover' in HTMLElement.prototype,
                PointerEvent: typeof PointerEvent !== 'undefined', ResizeObserver: typeof ResizeObserver !== 'undefined', getAnimations: typeof document.getAnimations === 'function',
                'screen.orientation': !!screen.orientation, requestIdleCallback: typeof window.requestIdleCallback === 'function',
            },
            storage, secureContext: window.isSecureContext,
        };
    };
    const buildFacts = () => {
        const meta = document.querySelector('meta[name="kt-build"]');
        const stamp = (meta?.getAttribute('content') ?? 'unknown').replace(/[^0-9a-zA-Z._-]/g, '').slice(0, 40) || 'unknown';
        const { url } = sanitizeUrl(location.pathname);
        const slug = /\/know-thyself-preview\/([^/]+)\//.exec(url)?.[1] ?? '';
        const versions = new Set();
        try {
            for (const entry of performance.getEntriesByType('resource')) {
                const m = /\.js\?v=([0-9a-f]{7,40})/.exec(entry.name);
                if (m)
                    versions.add(m[1].slice(0, 12));
            }
        }
        catch { /* ignore */ }
        let referrerHost = '';
        try {
            referrerHost = document.referrer ? new URL(document.referrer).hostname : '';
        }
        catch {
            referrerHost = '';
        }
        return {
            stamp, host: location.hostname, path: url, slug, hadQuery: location.search.length > 0, hadHash: location.hash.length > 0,
            route: sanitizeHash(location.hash), referrerHost, navType, historyLength: history.length,
            scripts: [...document.scripts].map((s) => assetName(s.src)).filter(Boolean).slice(0, 12), moduleVersions: [...versions], paint, diagVersion: DIAG_VERSION,
        };
    };
    const resourceFacts = () => {
        const failed = [...resourceFailures];
        let total = 0;
        const slowest = [];
        try {
            const entries = performance.getEntriesByType('resource');
            total = entries.length;
            for (const entry of entries) {
                const status = entry.responseStatus;
                if (typeof status === 'number' && status >= 400) {
                    const name = `${modulePath(entry.name)}:${status}`;
                    if (!failed.includes(name))
                        failed.push(name);
                }
            }
            slowest.push(...entries.slice().sort((a, b) => b.duration - a.duration).slice(0, 5).map((e) => ({ name: assetName(e.name), ms: Math.round(e.duration) })));
        }
        catch { /* ignore */ }
        return { total, failed: failed.slice(0, 12), slowest };
    };
    /* The startup boundary's account of the page coming up. Sanitized again here: it already carries only paths, statuses and short messages. */
    const startupFacts = () => {
        try {
            const boundary = window.__ktStartup;
            const raw = boundary?.snapshot?.();
            if (!raw)
                return null;
            const list = (value) => (Array.isArray(value) ? value.slice(0, 12) : []);
            return {
                upMs: Number(raw.upMs) || 0,
                expected: (Array.isArray(raw.expected) ? raw.expected : []).map((name) => sanitizeText(name, 40)),
                alive: Object.fromEntries(Object.entries((raw.alive ?? {})).map(([name, at]) => [sanitizeText(name, 40), Number(at) || 0])),
                failures: list(raw.failures).map((f) => ({ t: Number(f.t) || 0, kind: sanitizeText(f.kind, 40), severity: sanitizeText(f.severity, 12), url: modulePath(f.url), message: sanitizeText(f.message, 160) })),
                probes: list(raw.probes).map((p) => ({
                    entry: modulePath(p.entry), checked: Number(p.checked) || 0, verdict: sanitizeText(p.verdict, 40), ms: Number(p.ms) || 0,
                    failed: list(p.failed).map((f) => ({ url: modulePath(f.url), status: Number(f.status) || 0, type: sanitizeText(f.type, 40) })),
                })),
                screen: sanitizeText(raw.screen, 20),
                reloadedOnce: raw.reloadedOnce === true,
                recoveredInPlace: (Array.isArray(raw.recoveredInPlace) ? raw.recoveredInPlace : []).map((u) => modulePath(u)).slice(0, 6),
                userRetries: Number(raw.userRetries) || 0,
                settled: raw.settled === true,
                introState: typeof raw.introState === 'string' ? sanitizeText(raw.introState, 30) : null,
            };
        }
        catch {
            return null;
        }
    };
    const randomId = () => {
        const letters = 'abcdefghjkmnpqrstuvwxyz23456789';
        let id = '';
        try {
            const bytes = new Uint8Array(5);
            crypto.getRandomValues(bytes);
            for (const b of bytes)
                id += letters[b % letters.length];
        }
        catch {
            id = Math.random().toString(36).slice(2, 7);
        }
        return id;
    };
    // ---------------------------------------------------------------------------------------------------------------------------
    // go
    // ---------------------------------------------------------------------------------------------------------------------------
    startMutations();
    window.requestAnimationFrame(frame);
    ev('diag.start', { build: document.querySelector('meta[name="kt-build"]')?.getAttribute('content') ?? 'unknown', nav: navType, prevLife: previous ? (previous.cleanExit ? 'clean' : 'UNCLEAN') : 'none', vis: document.visibilityState });
    requestSnapshot('start', 400);
    window.setTimeout(() => requestSnapshot('start+3s', 0), 3000);
    persist(false);
    return {
        guard,
        mark(what) {
            rememberFields();
            const entry = ev('mark', { what: clean(what, 60) });
            markers.push(entry);
            requestSnapshot('mark', 0);
            notify();
        },
        clear() {
            events.clear();
            errors.clear();
            markers.clear();
            snapshots.clear();
            mutationCounts.clear();
            for (const key of Object.keys(counters))
                delete counters[key];
            resourceFailures.length = 0;
            ev('diag.cleared');
            notify();
        },
        setHost(el) { host = el; },
        subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
        stats() { return { events: events.stats.pushed, errors: errors.length, markers: markers.length, lastError: lastErrorText.text }; },
        buildInput(reason) {
            rememberFields();
            const snapshot = snapshotNow(reason, true);
            const history = [];
            if (firstSnapshot && !snapshots.toArray().some((s) => s.t === firstSnapshot?.t))
                history.push(firstSnapshot);
            history.push(...snapshots.toArray());
            const uptime = now();
            const lifetime = { startedMs: startedEpoch, uptimeMs: uptime, visibility: document.visibilityState, pageshowPersisted, previous };
            const iso = new Date().toISOString();
            return {
                reportId: randomId(), generatedAtEpochMs: Date.now(), isoTime: iso, build: buildFacts(), env: environment(), lifetime, snapshot,
                compositing: compositingCensus(),
                perf: {
                    windows: perfWindows.toArray(), totalFrames: perfTotals.frames, slowFrames: perfTotals.slow, verySlowFrames: perfTotals.vslow,
                    worstGapMs: Math.round(perfTotals.worst), timerDriftWorstMs: Math.round(perfTotals.drift), longTasks,
                    diag: { mutationMs: Math.round(cost.mutationMs * 10) / 10, mutationRecords: cost.mutationRecords, snapshotMs: Math.round(cost.snapshotMs * 10) / 10, snapshots: cost.snapshots },
                    heapMB: (() => { const m = performance.memory; return m ? Math.round(m.usedJSHeapSize / 1048576) : null; })(),
                },
                snapshotsHistory: history, events: events.toArray(), eventStats: events.stats, errors: errors.toArray(), markers: markers.toArray(),
                counters: { ...counters }, mutationTop: [...mutationCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([element, n]) => ({ d: d(element), n })),
                mutationPeakPerSecond: mutPeak, startup: startupFacts(), resources: resourceFacts(),
            };
        },
    };
}
