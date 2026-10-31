import { iosMajorMinor } from './environment.js?v=b5ef5ed';
const find = (snapshot, key) => snapshot.elements.find((e) => e.key === key && e.matches > 0);
const visible = (e) => !!e && !!e.rect && e.rect[2] > 0 && e.rect[3] > 0 && !!e.style && e.style.disp !== 'none' && e.style.vis !== 'hidden' && Number(e.style.op) > 0.02 && !e.hiddenAttr && e.rendered;
const centre = (r) => [r[0] + r[2] / 2, r[1] + r[3] / 2];
const fmt = (n) => (Math.round(n * 10) / 10).toString();
const rectText = (r) => `${fmt(r[0])},${fmt(r[1])} ${fmt(r[2])}x${fmt(r[3])}`;
export function analyze(input) {
    const out = [];
    const s = input.snapshot;
    const v = s.viewport;
    const add = (finding) => { out.push(finding); };
    const counters = input.counters;
    // ---- 6. JavaScript runtime ------------------------------------------------------------------------------------------------
    if (input.errors.length) {
        const first = input.errors[0];
        add({ id: 'js-errors', cat: 6, sev: 'high', title: `${input.errors.length} JavaScript error(s) / rejected promise(s) recorded`,
            evidence: `first at +${first.t}ms: ${String(first.msg ?? first.k)}${first.src ? ` (${String(first.src)})` : ''}; see "errors" in the JSON`,
            hint: 'A thrown error in startup or in a handler can leave the onboarding half-built (controls present but unwired).' });
    }
    if (input.resources.failed.length) {
        add({ id: 'resource-failed', cat: 6, sev: 'high', title: `${input.resources.failed.length} resource(s) failed to load`,
            evidence: input.resources.failed.slice(0, 6).join(', '),
            hint: 'A script, stylesheet or video that did not load changes behaviour without any visible error.' });
    }
    if ((counters['csp.violation'] ?? 0) > 0) {
        add({ id: 'csp', cat: 6, sev: 'med', title: 'Content-Security-Policy violation(s)', evidence: `${counters['csp.violation']} securitypolicyviolation event(s)`, hint: 'An in-app browser can inject its own policy.' });
    }
    // ---- 5. Viewport / toolbar / keyboard -------------------------------------------------------------------------------------
    if (!v.vv) {
        add({ id: 'no-visual-viewport', cat: 5, sev: 'med', title: 'window.visualViewport is missing', evidence: 'The keyboard/pan compensation in onboardingKeyboardViewport depends on it.', hint: 'Old iOS or a restricted web view.' });
    }
    else {
        const keyboardLikely = (s.keyboard?.mode ?? 'none') !== 'none' || (s.focus.textField && v.vv.h < v.inner[1] - 80);
        if (!keyboardLikely && (Math.abs(v.vv.ot) > 1 || Math.abs(v.vv.ol) > 1)) {
            add({ id: 'visual-viewport-panned', cat: 5, sev: 'high', title: 'The visual viewport is panned while no keyboard is up',
                evidence: `offsetTop=${fmt(v.vv.ot)} offsetLeft=${fmt(v.vv.ol)} pageTop=${fmt(v.vv.pt)} focus=${s.focus.active}`,
                hint: 'Position:fixed layers stay in the layout viewport, so the user sees the page shifted against them (Earth, dock and picker no longer line up).' });
        }
        if (Math.abs(v.vv.scale - 1) > 0.02) {
            add({ id: 'page-zoomed', cat: 5, sev: 'high', title: `The page is zoomed (visualViewport.scale=${fmt(v.vv.scale)})`,
                evidence: `focused field font-size=${s.focus.fontSize ?? 'n/a'}; layout ${v.inner.join('x')}, visual ${fmt(v.vv.w)}x${fmt(v.vv.h)}`,
                hint: 'iOS zooms in on focus when a text field is under 16px and often does not zoom back out; every fixed position is then off.' });
        }
        if (s.focus.textField && s.focus.fontSize && parseFloat(s.focus.fontSize) < 16) {
            add({ id: 'focus-font-small', cat: 5, sev: 'med', title: `Focused text field uses ${s.focus.fontSize} (<16px triggers iOS focus zoom)`, evidence: `field: ${s.focus.active}` });
        }
        const hDiff = Math.abs(v.inner[1] - (v.vv.h + v.vv.ot));
        if (!keyboardLikely && hDiff > 2) {
            add({ id: 'viewport-height-mismatch', cat: 5, sev: 'low', title: 'Layout and visual viewport heights disagree without a keyboard',
                evidence: `innerHeight=${v.inner[1]} visual=${fmt(v.vv.h)}+${fmt(v.vv.ot)} (diff ${fmt(hDiff)})`, hint: 'Browser toolbar mid-transition, or a bottom bar overlapping the viewport.' });
        }
    }
    const { dvh, svh, lvh } = v.units;
    if (dvh !== null && lvh !== null && svh !== null && Math.abs(lvh - svh) > 20) {
        add({ id: 'toolbar-range', cat: 5, sev: 'info', title: `Browser toolbar changes the viewport by ${fmt(lvh - svh)}px`,
            evidence: `100svh=${fmt(svh)} 100dvh=${fmt(dvh)} 100lvh=${fmt(lvh)} innerHeight=${v.inner[1]}`,
            hint: 'Any layout using 100vh/100lvh is taller than the visible area when the toolbar is shown.' });
    }
    if ((counters['viewport.storm'] ?? 0) > 0) {
        add({ id: 'viewport-storm', cat: 5, sev: 'high', title: 'Viewport events fired in a storm',
            evidence: `${counters['viewport.storm']} burst(s) of >=20 resize/scroll events in one second; ${counters['viewport.event'] ?? 0} viewport events in total`,
            hint: 'Repeated recalculation of positions against a moving viewport is a classic cause of flicker and drift.' });
    }
    if ((counters['focus.bounce'] ?? 0) > 0) {
        add({ id: 'focus-bounce', cat: 5, sev: 'med', title: 'A text field lost focus right after gaining it', evidence: `${counters['focus.bounce']} time(s) focusin->focusout within 250ms`, hint: 'Keyboard flashes open/closed, or a re-render replaces the field under the finger.' });
    }
    if (v.scroll[1] !== 0 || v.docScroll[1] > v.inner[1] + 2) {
        add({ id: 'page-scrolls', cat: 5, sev: v.scroll[1] !== 0 ? 'med' : 'low', title: 'The page itself can scroll',
            evidence: `scrollY=${fmt(v.scroll[1])} document height=${fmt(v.docScroll[1])} vs innerHeight=${v.inner[1]}`,
            hint: 'The onboarding is meant to be a fixed stage; a scrollable document lets iOS move it under the user\'s finger.' });
    }
    // Soft keyboard, measured after it settled (kb.settle events): is the field being typed in still visible, and which viewport moved?
    const settles = input.events.filter((e) => e.k === 'kb.settle');
    const hidden = settles.filter((e) => typeof e.vis === 'number' && e.vis < 0.6);
    if (hidden.length) {
        const worst = hidden[hidden.length - 1];
        add({ id: 'field-hidden-by-keyboard', cat: 5, sev: 'high', title: `${hidden.length} focused text field(s) ended up mostly hidden once the keyboard settled`,
            evidence: `last: ${String(worst.tgt)} ${Math.round(Number(worst.vis) * 100)}% visible; keyboard mode ${String(worst.mode)}, inset ${String(worst.inset)}px, visual height ${String(worst.vh)}, layout height ${String(worst.ih)}, visual offsetTop ${String(worst.ot)}, scrollY ${String(worst.sy)}`,
            hint: 'The field the person is typing into is under the keyboard or off screen: the page did not scroll or resize to keep it visible.' });
    }
    const zoomed = settles.filter((e) => typeof e.s === 'number' && e.s > 1.02);
    if (zoomed.length) {
        add({ id: 'keyboard-zoom', cat: 5, sev: 'high', title: `Focusing a field zoomed the page (${zoomed.length}x)`, evidence: `scale ${String(zoomed[zoomed.length - 1].s)} with font-size ${String(zoomed[zoomed.length - 1].fs)} on ${String(zoomed[zoomed.length - 1].tgt)}`,
            hint: 'iOS zooms on focus when the field text is under 16px.' });
    }
    // ---- 2. CSS layout / stacking ---------------------------------------------------------------------------------------------
    if (v.docScroll[0] > v.inner[0] + 1) {
        add({ id: 'horizontal-overflow', cat: 2, sev: 'med', title: 'The document is wider than the viewport',
            evidence: `scrollWidth=${v.docScroll[0]} innerWidth=${v.inner[0]}; offenders: ${input.compositing.overflowOffenders.slice(0, 4).map((o) => `${o.d} (${fmt(o.left)}..${fmt(o.right)})`).join('; ') || 'none found'}` });
    }
    for (const e of s.elements) {
        if (e.matches > 0 && e.fixedBreaker) {
            add({ id: `fixed-broken-${e.key}`, cat: 2, sev: 'high', title: `position:fixed "${e.key}" is not fixed to the viewport`,
                evidence: `ancestor ${e.fixedBreaker.by} sets ${e.fixedBreaker.property}: ${e.fixedBreaker.value}`,
                hint: 'transform/filter/perspective/contain/backdrop-filter/will-change on an ancestor makes the fixed child position against that ancestor (WebKit and Blink agree; the visual result differs when the ancestor is animated).' });
        }
    }
    for (const key of ['dock', 'placeForm', 'controlsLayer', 'vesselOrbit', 'confirmVessel', 'confirmPlace']) {
        const e = find(s, key);
        if (e && e.rect && e.rendered && (e.rect[2] === 0 || e.rect[3] === 0) && e.style && e.style.disp !== 'none' && !e.hiddenAttr) {
            add({ id: `zero-size-${key}`, cat: 2, sev: 'med', title: `"${key}" is displayed but has zero size`, evidence: `rect ${rectText(e.rect)} display=${e.style.disp}` });
        }
    }
    for (const e of s.elements) {
        if (visible(e) && e.clippedBy && e.interactive) {
            add({ id: `clipped-${e.key}`, cat: 2, sev: 'med', title: `"${e.key}" is clipped by an ancestor`, evidence: `clipped by ${e.clippedBy}; rect ${rectText(e.rect)}` });
        }
    }
    // ---- 1. Positioning calculations (the app's own numbers vs the real geometry) -------------------------------------------
    const rim = find(s, 'earthRim');
    const symbol = find(s, 'focusedSymbol');
    const rimVars = s.state['--kt-earth-rim-x'] !== undefined ? s.state : null;
    if (visible(rim) && visible(symbol)) {
        const [rx, ry] = centre(rim.rect);
        const [sx, sy] = centre(symbol.rect);
        const dist = Math.hypot(rx - sx, ry - sy);
        if (dist > 8) {
            add({ id: 'rim-misaligned', cat: 1, sev: 'high', title: `Earth rim and the focused globe are ${fmt(dist)}px apart`,
                evidence: `rim centre ${fmt(rx)},${fmt(ry)} size ${fmt(rim.rect[2])}; focused symbol centre ${fmt(sx)},${fmt(sy)} size ${fmt(symbol.rect[2])}${rimVars ? `; app vars x=${rimVars['--kt-earth-rim-x']} y=${rimVars['--kt-earth-rim-y']} size=${rimVars['--kt-earth-rim-size']}` : ''}`,
                hint: 'If the app variables match the rim but not the symbol, the position was captured against a different viewport state than the one now showing (captured too early or against a moving visual viewport).' });
        }
    }
    const earth = find(s, 'earthMap');
    const panel = find(s, 'controlsLayer');
    if (visible(earth) && visible(panel)) {
        const ox = Math.max(0, Math.min(earth.rect[0] + earth.rect[2], panel.rect[0] + panel.rect[2]) - Math.max(earth.rect[0], panel.rect[0]));
        const oy = Math.max(0, Math.min(earth.rect[1] + earth.rect[3], panel.rect[1] + panel.rect[3]) - Math.max(earth.rect[1], panel.rect[1]));
        const share = (ox * oy) / Math.max(1, panel.rect[2] * panel.rect[3]);
        add({ id: 'earth-vs-controls', cat: 1, sev: 'info', title: 'Earth stage vs controls layer geometry',
            evidence: `earth ${rectText(earth.rect)}; controls ${rectText(panel.rect)}; controls inside earth: ${Math.round(share * 100)}%` });
    }
    for (const e of s.elements) {
        if (e.matches > 0 && e.interactive && visible(e) && e.inVisual !== null && e.inVisual < 0.6) {
            add({ id: `offscreen-${e.key}`, cat: e.inVisual === 0 ? 1 : 5, sev: e.inVisual === 0 ? 'high' : 'med', title: `Control "${e.key}" is ${e.inVisual === 0 ? 'entirely' : 'mostly'} outside the visible area`,
                evidence: `rect ${rectText(e.rect)}; ${Math.round(e.inVisual * 100)}% inside visual viewport ${v.vv ? `${fmt(v.vv.w)}x${fmt(v.vv.h)} @${fmt(v.vv.ot)}` : v.inner.join('x')}`,
                hint: 'Rendered but unreachable. With the keyboard closed this is a positioning error, with it open a viewport-resize error.' });
        }
    }
    const intro = s.state['data-intro-state'];
    if (intro && intro !== 'complete' && input.lifetime.uptimeMs > 25000 && (counters['state.change'] ?? 0) < 60) {
        add({ id: 'intro-stuck', cat: 1, sev: 'high', title: `Intro still "${intro}" after ${Math.round(input.lifetime.uptimeMs / 1000)}s`,
            evidence: `warp=${s.state['data-warp-intro'] ?? 'n/a'}; ${input.compositing.videos.map((x) => `${x.d} paused=${x.paused} ready=${x.ready} err=${x.err}`).join('; ') || 'no video element'}`,
            hint: 'The state machine did not reach "complete": the form dock stays inert and the user cannot start. On iOS this is usually a video that never plays or an Earth provider that never reports ready.' });
    }
    // ---- 4. Hit targets / overlays --------------------------------------------------------------------------------------------
    // While the intro runs the form dock is inert ON PURPOSE and a full-screen cover sits above it: that is the designed state, not a fault.
    const introRunning = !!intro && intro !== 'complete';
    const introOwned = new Set(['dock', 'placeQuery', 'resultsShell', 'birthplaceCard', 'changePlace', 'confirmPlace']);
    for (const e of s.elements) {
        if (e.matches > 0 && e.interactive && visible(e) && !e.disabled && e.hitOk === false && (e.inVisual ?? 1) > 0.2) {
            const [cx, cy] = centre(e.rect);
            const expected = introRunning && introOwned.has(e.key);
            add({ id: `covered-${e.key}`, cat: 4, sev: expected ? 'info' : 'high', title: `${expected ? '(expected during the intro) ' : ''}Control "${e.key}" is covered: a tap at its centre lands elsewhere`,
                evidence: `hit chain at ${fmt(cx)},${fmt(cy)}: ${(e.hitChain ?? []).slice(0, 4).join(' > ')}`,
                hint: 'An invisible or transparent layer is intercepting touches; look at its z-index/pointer-events and who owns it.' });
        }
        if (e.matches > 0 && e.interactive && visible(e) && !e.disabled && (e.inert || (e.style && e.style.pe === 'none'))) {
            const expected = introRunning && introOwned.has(e.key);
            add({ id: `dead-${e.key}`, cat: 4, sev: expected ? 'info' : 'high', title: `${expected ? '(expected during the intro) ' : ''}Control "${e.key}" is visible but cannot receive touches`,
                evidence: `${e.inert ? 'inside an inert subtree' : 'pointer-events:none'}; ariaHidden=${e.ariaHidden}`,
                hint: 'A step was shown without releasing the inert/pointer-events lock of the previous one.' });
        }
    }
    const introLayers = introRunning ? /spacetime-intro|earth-loading-cover|incarnation-veil/ : /^$/;
    const bigBlockers = input.compositing.largeOverlays.filter((o) => o.pe !== 'none' && Number(o.op) > 0 && o.cover > 0.5 && !/kt-qa|vessel-stage|place-experience|earth-map|interaction-dock|profile-flow|kt-layer/.test(o.d) && !introLayers.test(o.d));
    if (bigBlockers.length) {
        add({ id: 'large-overlay', cat: 4, sev: 'med', title: `${bigBlockers.length} large layer(s) cover >50% of the screen and take touches`,
            evidence: bigBlockers.slice(0, 4).map((o) => `${o.d} z=${o.z} op=${o.op} ${rectText(o.rect)}`).join(' | ') });
    }
    if ((counters['tap.noclick'] ?? 0) > 0) {
        const n = counters['tap.noclick'] ?? 0;
        add({ id: 'tap-no-click', cat: 4, sev: 'high', title: `${n} tap(s) produced no click`,
            evidence: 'a touch/pointer went down and up in place (<10px) but the browser never delivered a click; targets are in events as k="tap.noclick"',
            hint: 'Typical of a touch handler calling preventDefault, a target replaced between down and up, or a non-interactive layer on top.' });
    }
    if ((counters['touch.defaultPrevented'] ?? 0) > 0) {
        add({ id: 'touch-prevented', cat: 4, sev: 'info', title: `${counters['touch.defaultPrevented']} touch event(s) arrived already default-prevented`, evidence: 'See "touch.start" events with dp=true: an earlier listener cancelled them, so taps/scrolls there do nothing.' });
    }
    // ---- 3. WebKit rendering / compositing ------------------------------------------------------------------------------------
    const c = input.compositing;
    const heavy = c.backdropFilter + c.filter;
    if (heavy >= 12 || c.willChange >= 12) {
        add({ id: 'compositing-pressure', cat: 3, sev: v.dpr >= 3 ? 'med' : 'low', title: 'Many live GPU layers (backdrop-filter / filter / will-change)',
            evidence: `backdrop-filter=${c.backdropFilter} filter=${c.filter} will-change=${c.willChange} fixed=${c.fixed} transformed=${c.transformed} of ${c.elementsScanned} elements at dpr ${v.dpr}`,
            hint: 'iOS WebKit rasterises each backdrop-filter surface separately; overlapping ones are a known cause of flicker and missing layers.' });
    }
    if (c.animationsRunning !== null && c.animationsRunning >= 16) {
        add({ id: 'many-animations', cat: 3, sev: 'low', title: `${c.animationsRunning} animations running at once`, evidence: c.animationTargets.slice(0, 6).join(', ') });
    }
    for (const canvas of c.canvases) {
        if (canvas.megapixels > 16.7)
            add({ id: 'canvas-too-big', cat: 3, sev: 'high', title: `Canvas ${canvas.d} has ${canvas.megapixels}MP (iOS limit ~16.7MP)`, evidence: `backing ${canvas.px.join('x')} css ${canvas.css.join('x')} dpr ${v.dpr}`, hint: 'Above the limit iOS Safari draws nothing or loses the canvas.' });
    }
    if ((counters['webgl.contextlost'] ?? 0) > 0) {
        add({ id: 'webgl-lost', cat: 3, sev: 'high', title: 'A WebGL context was lost', evidence: `${counters['webgl.contextlost']} loss(es), ${counters['webgl.contextrestored'] ?? 0} restore(s)`, hint: 'iOS drops GPU contexts under memory pressure; the Earth stops drawing until it is rebuilt.' });
    }
    const p = input.perf;
    if (p.totalFrames > 120) {
        const slowShare = (p.slowFrames + p.verySlowFrames) / p.totalFrames;
        if (slowShare > 0.12 || p.verySlowFrames > 10) {
            add({ id: 'frame-pace', cat: 3, sev: slowShare > 0.3 ? 'high' : 'med', title: `${Math.round(slowShare * 100)}% of frames took >34ms`,
                evidence: `${p.slowFrames} slow (34-100ms), ${p.verySlowFrames} very slow (>100ms) of ${p.totalFrames}; worst gap ${p.worstGapMs}ms; worst timer drift ${p.timerDriftWorstMs}ms`,
                hint: 'Low Power Mode caps iOS at 30fps; a repeating >100ms gap is a stall (decode, layout thrash or GPU stall).' });
        }
    }
    const spent = input.perf.diag.mutationMs + input.perf.diag.snapshotMs;
    const share = input.lifetime.uptimeMs > 0 ? spent / input.lifetime.uptimeMs : 0;
    if (share > 0.02) {
        add({ id: 'diag-overhead', cat: 3, sev: share > 0.05 ? 'med' : 'info', title: `The diagnostics themselves used ${fmt(share * 100)}% of the page's time`,
            evidence: `${fmt(input.perf.diag.mutationMs)}ms in ${input.perf.diag.mutationRecords} DOM-mutation records, ${fmt(input.perf.diag.snapshotMs)}ms in ${input.perf.diag.snapshots} geometry snapshots over ${Math.round(input.lifetime.uptimeMs / 1000)}s`,
            hint: 'Repeat the test with ?ktdiag=off in the address: if the problem is unchanged the instrument is not the cause.' });
    }
    if ((counters['mutation.peak'] ?? 0) > 0 && input.mutationPeakPerSecond > 400) {
        add({ id: 'mutation-thrash', cat: 3, sev: 'med', title: `DOM attribute churn peaked at ${input.mutationPeakPerSecond}/s`,
            evidence: input.mutationTop.slice(0, 5).map((m) => `${m.d} x${m.n}`).join(' | '), hint: 'Repeated style/class writes to the same node each frame forces style recalculation; compare with visible flicker.' });
    }
    if ((counters['perf.layoutshift'] ?? 0) > 0) {
        add({ id: 'layout-shift', cat: 3, sev: 'low', title: `${counters['perf.layoutshift']} layout shift(s) reported`, evidence: 'See events k="layout.shift".' });
    }
    // ---- 7. Browser differences / environment ---------------------------------------------------------------------------------
    const e = input.env;
    if (e.ios) {
        add({ id: 'env', cat: 7, sev: 'info', title: `${e.device ?? 'iOS'} ${e.iosVersion ?? '?'} in ${e.browser}${e.browserVersion ? ` ${e.browserVersion}` : ''}`, evidence: e.notes.join('; ') || 'plain Safari' });
        const ver = iosMajorMinor(e.iosVersion);
        if (ver !== null && ver < 16.4)
            add({ id: 'old-ios', cat: 7, sev: 'med', title: `iOS ${e.iosVersion} is older than 16.4`, evidence: 'Missing: some CSS (dvh/svh unit support before 15.4), regex lookbehind before 16.4, popover/inert before 17.' });
    }
    if (e.inAppBrowser) {
        const missing = Object.entries({ ...e.css, ...e.apis }).filter(([, ok]) => !ok).map(([name]) => name);
        add({ id: 'in-app-browser', cat: 7, sev: 'med', title: `In-app browser (${e.browser})`, evidence: `unsupported here: ${missing.join(', ') || 'none detected'}`, hint: 'Compare this report with one from Safari: a difference in these lists or in the viewport numbers is the lead.' });
    }
    for (const [name, state] of Object.entries(e.storage)) {
        if (state !== 'ok')
            add({ id: `storage-${name}`, cat: 7, sev: 'med', title: `${name} is not usable (${state})`, evidence: 'Private mode or a restricted web view: state that the app expects to persist silently does not.' });
    }
    for (const video of c.videos) {
        if (video.paused && video.ready < 3 && input.lifetime.uptimeMs > 9000 && s.state['data-intro-state'] !== 'complete') {
            add({ id: 'video-blocked', cat: 7, sev: 'med', title: `Intro video ${video.d} is not playing`, evidence: `paused=${video.paused} readyState=${video.ready} networkState=${video.network} error=${video.err} muted=${video.muted} playsInline=${video.inline}`, hint: 'In-app browsers may refuse autoplay or inline video; the intro then relies on its timeout.' });
        }
    }
    const versions = input.build.moduleVersions;
    const stamp = input.build.stamp;
    if (versions.length > 1 || (versions.length === 1 && stamp !== 'unknown' && !versions[0].startsWith(stamp.slice(0, 7)) && !stamp.startsWith(versions[0].slice(0, 7)))) {
        add({ id: 'stale-module-mix', cat: 7, sev: 'high', title: 'This page is running code from more than one deployment',
            evidence: `page build stamp ${stamp}; module ?v= values: ${versions.join(', ') || 'none'}`,
            hint: 'A cached page or module from an older deploy next to newer files produces exactly this kind of "half-fixed" layout. Reload without cache and re-test before analysing layout.' });
    }
    if (input.lifetime.previous && !input.lifetime.previous.cleanExit) {
        add({ id: 'unclean-previous', cat: 3, sev: 'high', title: 'The previous page life in this tab did not end cleanly',
            evidence: `navigation type "${input.build.navType}", last event at +${input.lifetime.previous.lastEventT}ms, previous errors ${input.lifetime.previous.errors}`,
            hint: 'iOS silently reloads a page whose web content process was killed (memory pressure). The report includes the tail of the previous life under lifetime.previous.' });
    }
    const order = { high: 0, med: 1, low: 2, info: 3 };
    return out.sort((a, b) => order[a.sev] - order[b.sev] || a.cat - b.cat);
}
