/*
 * CROSS-PLATFORM COMPARISON (pure, no DOM). Takes two pasted debug reports - a REFERENCE that works (for example Samsung / Android Chrome)
 * and a PROBLEM device (for example iPhone / iOS WebKit) - and says what differs, what that most likely means, how sure it is, and
 * where in the code to look.
 *
 * It is deliberately NOT a diff. A different screen, pixel density, safe area, browser engine or keyboard model is the normal state of
 * affairs; those differences are listed once, as context, and never counted as defects. A difference becomes an observation only when it
 * is measured at the same onboarding checkpoint on both devices and is not explained by the platform, or when one device shows a failure
 * (an error, an unreachable step, a covered control) that the other does not.
 *
 * Confidence is about the EVIDENCE, not the severity: "high" = a direct measured contradiction at the same checkpoint (or a binary fact such
 * as an error or an unreached step); "medium" = clear signal from one side or a threshold crossing; "low" = a pattern worth checking.
 * Nothing here proves a cause: every "likely cause" names what to verify next.
 */
import { CHECKPOINTS, CHECKPOINT_LABEL } from './checkpoints.js?v=b5ef5ed';
import { fnv1a } from './report.js?v=b5ef5ed';
// ------------------------------------------------------------------------------------------------------------------------------
// parsing
// ------------------------------------------------------------------------------------------------------------------------------
export function parseReport(text) {
    const problems = [];
    const begin = text.indexOf('=== JSON BEGIN');
    const end = text.lastIndexOf('=== JSON END');
    if (begin < 0 || end < begin)
        return { ok: false, problems: ['the JSON markers are missing: the message was cut short or only part of it was pasted'], json: null, tier: '' };
    const header = text.slice(begin, text.indexOf('\n', begin));
    const tier = /\(ktdiag\/\d+, ([^)]*)\)/.exec(header)?.[1] ?? '';
    const body = text.slice(text.indexOf('\n', begin) + 1, end).replace(/\n$/, '');
    const trailer = /chars=(\d+) fnv1a=([0-9a-f]{8})/.exec(text.slice(end));
    if (!trailer)
        problems.push('the trailer is missing, so completeness cannot be proven');
    else if (body.length !== Number(trailer[1]) || fnv1a(body) !== trailer[2])
        problems.push('the checksum does not match: the text was altered, truncated or re-wrapped by the chat app');
    let json = null;
    try {
        json = JSON.parse(body);
    }
    catch {
        problems.push('the JSON does not parse');
    }
    if (json && !/^ktdiag\/\d+$/.test(String(json.schema)))
        problems.push('this is not a ktdiag report');
    else if (json && Number(String(json.schema).slice(7)) < 2)
        problems.push(`schema ${String(json.schema)} has no onboarding checkpoints: ask for a new report from the current QA build`);
    return { ok: !!json && problems.every((p) => !/does not parse|not a ktdiag|no onboarding checkpoints/.test(p)), problems, json, tier };
}
// ------------------------------------------------------------------------------------------------------------------------------
// small readers
// ------------------------------------------------------------------------------------------------------------------------------
const num = (x) => (typeof x === 'number' && Number.isFinite(x) ? x : null);
const r1 = (n) => Math.round(n * 10) / 10;
const pct = (n) => `${Math.round(n * 100)}%`;
const arr = (x) => (Array.isArray(x) ? x : []);
const str = (x) => (typeof x === 'string' ? x : x === undefined || x === null ? '' : String(x));
function vpFromRow(row) {
    if (!Array.isArray(row) || row.length < 8)
        return null;
    return { iw: num(row[0]) ?? 0, ih: num(row[1]) ?? 0, vw: num(row[2]) ?? num(row[0]) ?? 0, vh: num(row[3]) ?? num(row[1]) ?? 0, ot: num(row[4]) ?? 0, ol: num(row[5]) ?? 0, scale: num(row[6]) ?? 1, scrollY: num(row[7]) ?? 0, kbMode: str(row[8] ?? 'none'), kbInset: num(row[9]) ?? 0 };
}
function nowVp(j) {
    const v = j?.now?.vp;
    if (v?.inner) {
        return { iw: v.inner[0], ih: v.inner[1], vw: v.vv?.w ?? v.inner[0], vh: v.vv?.h ?? v.inner[1], ot: v.vv?.ot ?? 0, ol: v.vv?.ol ?? 0, scale: v.vv?.scale ?? 1, scrollY: v.scroll?.[1] ?? 0, kbMode: str(j.now?.kb?.mode ?? 'none'), kbInset: num(j.now?.kb?.inset) ?? 0 };
    }
    return vpFromRow(j?.now?.vpRow);
}
function checkpointsOf(j) {
    const map = new Map();
    let lastVp = null;
    for (const cp of arr(j?.checkpoints)) {
        if (!CHECKPOINTS.includes(cp?.name))
            continue;
        // a checkpoint whose viewport did not change from the one before it omits it
        if (!cp.vp && lastVp)
            cp.vp = lastVp;
        if (cp.vp)
            lastVp = cp.vp;
        map.set(cp.name, cp);
    }
    return map;
}
const elOf = (cp, key) => arr(cp?.el).find((e) => e?.k === key);
/** An element's position/size in every frame of reference that survives a change of screen: fractions, edge distances in px, globe diameters. */
function metricsOf(e, cp) {
    const vp = vpFromRow(cp?.vp);
    const n = e?.n;
    if (!vp || !Array.isArray(n) || n.length < 4)
        return null;
    const W = vp.vw;
    const H = vp.vh;
    const [nx, ny, nw, nh] = n.map(Number);
    return {
        n: [nx, ny, nw, nh], cx: nx + nw / 2, cy: ny + nh / 2, w: nw, h: nh, wPx: nw * W, hPx: nh * H,
        left: nx * W, right: (1 - nx - nw) * W, top: ny * H, bottom: (1 - ny - nh) * H,
        g: Array.isArray(e.g) && e.g.length >= 4 ? e.g.map(Number) : null,
        full: nx <= 0.01 && ny <= 0.01 && nw >= 0.98 && nh >= 0.98,
    };
}
// ------------------------------------------------------------------------------------------------------------------------------
// where to look in the code
// ------------------------------------------------------------------------------------------------------------------------------
export const SOURCE_FILES = Object.freeze({
    experience: ['frontend-app/src/premium-earth-phase-a.ts', 'frontend-app/src/onboardingKeyboardViewport.ts'],
    earthMap: ['frontend-app/src/onboardingKeyboardViewport.ts', 'frontend-app/src/profileEarthViewportLock.ts'],
    warp: ['frontend-app/src/onboardingIntroWatchdog.ts', 'frontend-app/src/onboardingEarthIntroSequence.ts'],
    veil: ['frontend-app/src/onboardingIntroWatchdog.ts', 'frontend-app/src/onboardingEarthIntroSequence.ts'],
    loadingCover: ['frontend-app/src/onboardingIntroWatchdog.ts', 'frontend-app/src/onboardingEarthIntroSequence.ts'],
    dock: ['frontend-app/src/onboardingKeyboardViewport.ts', 'frontend-app/src/placeSelectedLayout.ts', 'frontend-app/src/premium-earth-phase-a.css'],
    placeQuery: ['frontend-app/src/onboardingKeyboardViewport.ts', 'frontend-app/src/placeResultsPolish.ts'],
    resultsShell: ['frontend-app/src/placeResultsPolish.ts', 'frontend-app/src/placeSelectedLayout.ts'],
    birthplaceCard: ['frontend-app/src/placeSelectedLayout.ts', 'frontend-app/src/placeGlassRefinement.ts'],
    changePlace: ['frontend-app/src/placeSelectedLayout.ts'],
    confirmPlace: ['frontend-app/src/placeSelectedLayout.ts', 'frontend-app/src/premium-earth-phase-a.ts'],
    vesselStage: ['frontend-app/src/vesselOrbit.ts', 'frontend-app/src/vesselTransitionStability.ts'],
    vesselOrbit: ['frontend-app/src/vesselArrowCarousel.ts', 'frontend-app/src/vesselTrackCarousel.ts', 'frontend-app/src/vesselOrbit.ts'],
    focusedChoice: ['frontend-app/src/vesselArrowCarousel.ts', 'frontend-app/src/vesselGlyphAlignment.ts'],
    focusedSymbol: ['frontend-app/src/vesselGlyphAlignment.ts', 'frontend-app/src/onboardingVesselCoreSymbol.ts'],
    arrowLeft: ['frontend-app/src/vesselArrowCarousel.ts', 'frontend-app/src/vesselArrowOnlyPolish.ts'],
    arrowRight: ['frontend-app/src/vesselArrowCarousel.ts', 'frontend-app/src/vesselArrowOnlyPolish.ts'],
    vesselUndefined: ['frontend-app/src/vesselArrowCarousel.ts'],
    confirmVessel: ['frontend-app/src/vesselConfirmHandoff.ts', 'frontend-app/src/vesselOrbit.ts'],
    effectsLayer: ['frontend-app/src/onboardingLayerArchitecture.ts', 'frontend-app/src/profileEarthViewportLock.ts'],
    earthRim: ['frontend-app/src/onboardingLayerArchitecture.ts (captureEarthGeometry)', 'frontend-app/src/profileEarthViewportLock.ts'],
    profileFlow: ['frontend-app/src/profileShell.ts', 'frontend-app/src/profileFlowPolish.ts'],
    promptLayer: ['frontend-app/src/onboardingLayerArchitecture.ts', 'frontend-app/src/onboardingPromptAlignment.ts'],
    controlsLayer: ['frontend-app/src/onboardingLayerArchitecture.ts', 'frontend-app/src/profileFlowPolish.ts'],
    pickerLayer: ['frontend-app/src/onboardingLayerArchitecture.ts', 'frontend-app/src/arrivalPickerOverlayAnchor.ts'],
    pickerHost: ['frontend-app/src/arrivalPickerOverlayAnchor.ts', 'frontend-app/src/arrivalDateOverlayLayout.ts', 'frontend-app/src/arrivalPicker.ts'],
    calendar: ['frontend-app/src/arrivalPicker.ts', 'frontend-app/src/arrivalCalendarStability.ts', 'frontend-app/src/arrivalDateOverlayLayout.ts'],
    timePicker: ['frontend-app/src/arrivalTimeEditorPolish.ts', 'frontend-app/src/arrivalPicker.ts'],
    panel: ['frontend-app/src/profileShell.ts', 'frontend-app/src/profileFlowPolish.ts', 'frontend-app/src/profileVisualIsolation.ts'],
    panelInput: ['frontend-app/src/identityFieldPolish.ts', 'frontend-app/src/profileControlsPolish.ts'],
    panelButton: ['frontend-app/src/profileControlsPolish.ts', 'frontend-app/src/profileFlowPolish.ts'],
});
const where = (key) => [...(SOURCE_FILES[key] ?? ['frontend-app/src/premium-earth-phase-a.css'])];
export const STEP_HINT = Object.freeze({
    'intro-complete': { cause: 'The opening sequence never reached "complete": the warp video did not play, or the Earth provider never reported ready.', fix: 'Check data-warp-intro and the video state in the report; make the intro watchdog release on a blocked or stalled video, and never leave the dock inert.', files: ['frontend-app/src/onboardingIntroWatchdog.ts', 'frontend-app/src/onboardingEarthIntroSequence.ts'] },
    'place-found': { cause: 'Choosing a search result did not complete: the result row tap did not register, or the place lookup did not return.', fix: 'Look at tap.noclick / hit chain on the result list at this step and at what covers #place-results while the keyboard is open.', files: ['frontend-app/src/placeResultsPolish.ts', 'frontend-app/src/onboardingKeyboardViewport.ts'] },
    'globe-selection': { cause: 'The step after confirming the birthplace (the globe / body selection) did not appear or could not be operated.', fix: 'Compare the vessel stage geometry and the confirm button hit test at the previous checkpoint; check the vessel transition hand-off.', files: ['frontend-app/src/vesselTransitionStability.ts', 'frontend-app/src/vesselConfirmHandoff.ts'] },
    'identity-inputs': { cause: 'The name form never became active after the body was accepted: the form stayed inert, covered, or off screen.', fix: 'Check inert/hit results for panelInput at globe-selection and identity-inputs and the keyboard behaviour when the first field is focused.', files: ['frontend-app/src/profileFlowPolish.ts', 'frontend-app/src/identityFieldPolish.ts', 'frontend-app/src/onboardingKeyboardViewport.ts'] },
    'arrival-step': { cause: 'The Next button of the name step did not advance, or the date/time panel did not slide in.', fix: 'Check the Next button hit result and whether a field was still focused (keyboard open) when it was tapped.', files: ['frontend-app/src/profileFlowPolish.ts', 'frontend-app/src/onboardingKeyboardViewport.ts'] },
    'birth-date': { cause: 'The birth-date calendar did not open from the field tap, or opened somewhere the person cannot see.', fix: 'Compare the calendar rect, the picker layer and what is on top at the field centre; check the overlay anchor against the visual viewport.', files: ['frontend-app/src/arrivalPickerOverlayAnchor.ts', 'frontend-app/src/arrivalDateOverlayLayout.ts', 'frontend-app/src/arrivalPicker.ts'] },
    'birth-time': { cause: 'The birth-time entry did not open, or its numeric fields could not be used.', fix: 'Check the time picker rect, the hour/minute field focus and font size, and the keyboard mode after focus.', files: ['frontend-app/src/arrivalTimeEditorPolish.ts', 'frontend-app/src/arrivalPicker.ts'] },
    'profile-review': { cause: 'Confirming the date/time did not lead to the review step.', fix: 'Check the confirm buttons of the date and time pickers (hit result, disabled state) and the review button.', files: ['frontend-app/src/arrivalPicker.ts', 'frontend-app/src/profileShell.ts'] },
    'main-app': { cause: 'The final "Materialize" action did not enter the main application.', fix: 'Check the create button hit result and any error recorded after the review step.', files: ['frontend-app/src/profileOverviewFlow.ts', 'frontend-app/src/premiumPillarExperience.ts'] },
});
// ------------------------------------------------------------------------------------------------------------------------------
// the comparison
// ------------------------------------------------------------------------------------------------------------------------------
function summaryOf(p, role) {
    const j = p.json ?? {};
    const e = j.env ?? {};
    const vp = nowVp(j);
    const os = e.os === 'ios' ? `iOS ${str(e.osVersion)}${e.device ? ` (${str(e.device)})` : ''}` : e.os === 'android' ? `Android ${str(e.osVersion)}${e.deviceModel ? ` ${str(e.deviceModel)}` : ''}` : str(e.os);
    return {
        label: role, os, browser: `${str(e.browser)} ${str(e.browserVersion)}`.trim() + (e.inAppBrowser ? ' (in-app)' : ''), engine: str(e.engine),
        build: str(j.build?.stamp), viewport: vp ? `layout ${vp.iw}x${vp.ih}, visual ${r1(vp.vw)}x${r1(vp.vh)}` : 'unknown', dpr: num(j.env?.vp?.dpr ?? j.now?.vp?.dpr), tier: p.tier,
    };
}
const LEVELS = ['low', 'medium', 'high'];
const bump = (l, by) => LEVELS[Math.max(0, Math.min(2, LEVELS.indexOf(l) + by))];
export function compareReports(reference, problem) {
    const R = reference.json ?? {};
    const P = problem.json ?? {};
    const drafts = [];
    const notComparable = [];
    const missingEvidence = [];
    const roleWarnings = [];
    const context = [];
    const add = (d) => { drafts.push({ platformExplained: false, signals: 1, ...d }); };
    for (const [name, p] of [['reference', reference], ['problem', problem]])
        for (const issue of p.problems)
            roleWarnings.push(`${name} report: ${issue}`);
    const refEnv = R.env ?? {};
    const probEnv = P.env ?? {};
    if (refEnv.os && probEnv.os && refEnv.os === probEnv.os)
        roleWarnings.push(`both reports come from ${str(refEnv.os)}: this is not a cross-platform comparison (reference ${str(refEnv.browser)} vs problem ${str(probEnv.browser)})`);
    if (refEnv.os === 'ios' && probEnv.os === 'android')
        roleWarnings.push('the reference looks like the iPhone and the problem like the Android: check the order of the two reports');
    const refBuild = str(R.build?.stamp);
    const probBuild = str(P.build?.stamp);
    if (refBuild && probBuild && refBuild !== probBuild) {
        roleWarnings.push(`the two reports come from DIFFERENT builds (${refBuild} vs ${probBuild}): differences may be code differences, not platform differences. Re-test both on the same link.`);
        add({ id: 'builds-differ', area: 'comparability', severity: 'high', confidence: 'high', title: 'The two reports were produced by different builds', evidence: [`reference build ${refBuild}`, `problem build ${probBuild}`], likelyCauses: ['One device kept an older page open or a cached copy.'], suggestedFix: 'Reload both devices on the same preview link, confirm the same build stamp in the report header, then repeat the test.', whereToLook: [], platformExplained: false });
    }
    for (const [name, j] of [['reference', R], ['problem', P]]) {
        const versions = arr(j.build?.moduleVersions);
        if (versions.length > 1)
            add({ id: `stale-mix-${name}`, area: 'comparability', severity: 'high', confidence: 'high', title: `The ${name} device ran code from more than one deployment`, evidence: [`module ?v= values: ${versions.join(', ')}`], likelyCauses: ['A cached page or module from an older deploy next to newer files.'], suggestedFix: 'Reload without cache on that device and repeat; layout findings from this run are unreliable.', whereToLook: [], platformExplained: false });
    }
    // ---- context: expected differences ------------------------------------------------------------------------------------------
    const rvp = nowVp(R);
    const pvp = nowVp(P);
    context.push(`platform: ${summaryOf(reference, 'reference').os} / ${summaryOf(reference, 'reference').browser} (${str(refEnv.engine)})  vs  ${summaryOf(problem, 'problem').os} / ${summaryOf(problem, 'problem').browser} (${str(probEnv.engine)})`);
    if (rvp && pvp) {
        context.push(`screen: layout ${rvp.iw}x${rvp.ih} vs ${pvp.iw}x${pvp.ih} (aspect ${r1(rvp.iw / rvp.ih)} vs ${r1(pvp.iw / pvp.ih)}): positions are compared as fractions, edge distances and globe diameters, never raw pixels`);
        context.push(`device pixel ratio: ${num(R.env?.vp?.dpr ?? R.now?.vp?.dpr) ?? '?'} vs ${num(P.env?.vp?.dpr ?? P.now?.vp?.dpr) ?? '?'} (changes canvas backing sizes and rasterisation cost, not layout)`);
    }
    const rsafe = R.env?.vp?.safeArea ?? R.now?.vp?.safeArea;
    const psafe = P.env?.vp?.safeArea ?? P.now?.vp?.safeArea;
    if (rsafe && psafe && JSON.stringify(rsafe) !== JSON.stringify(psafe))
        context.push(`safe-area insets: ${JSON.stringify(rsafe)} vs ${JSON.stringify(psafe)} (notch / home indicator: a platform property)`);
    const ru = R.env?.vp?.units ?? R.now?.vp?.units;
    const pu = P.env?.vp?.units ?? P.now?.vp?.units;
    if (ru && pu)
        context.push(`viewport units svh/dvh/lvh: ${ru.svh}/${ru.dvh}/${ru.lvh} vs ${pu.svh}/${pu.dvh}/${pu.lvh} (browser toolbars differ per OS)`);
    const missingOn = (a, b) => arr(b).filter((x) => !arr(a).includes(x));
    const apiOnlyProblem = missingOn(refEnv.apisMissing, probEnv.apisMissing);
    const cssOnlyProblem = missingOn(refEnv.cssMissing, probEnv.cssMissing);
    if (apiOnlyProblem.length || cssOnlyProblem.length)
        context.push(`unsupported only on the problem device: ${[...apiOnlyProblem, ...cssOnlyProblem].join(', ')}`);
    const apiOnlyRef = missingOn(probEnv.apisMissing, refEnv.apisMissing);
    if (apiOnlyRef.length)
        context.push(`unsupported only on the reference: ${apiOnlyRef.join(', ')}`);
    if (reference.tier !== problem.tier)
        context.push(`report detail differs (reference: ${reference.tier || '?'}; problem: ${problem.tier || '?'}): only fields present in both are compared`);
    // ---- checkpoints / flow --------------------------------------------------------------------------------------------------------
    const rcp = checkpointsOf(R);
    const pcp = checkpointsOf(P);
    const rows = [];
    let firstMissing = null;
    for (const name of CHECKPOINTS) {
        const a = rcp.get(name);
        const b = pcp.get(name);
        const note = [];
        if (a && !b) {
            note.push('NOT REACHED on the problem device');
            if (!firstMissing)
                firstMissing = name;
        }
        if (!a && b)
            note.push('not reached on the reference (the reference run stopped earlier)');
        if (a && b) {
            const ta = num(a.since?.tap) ?? 0;
            const tb = num(b.since?.tap) ?? 0;
            const na = num(a.since?.['tap.noclick']) ?? 0;
            const nb = num(b.since?.['tap.noclick']) ?? 0;
            if (tb + nb >= ta + na + 2)
                note.push(`${tb + nb} taps needed vs ${ta + na}`);
            if (nb > na)
                note.push(`${nb} tap(s) without a click`);
            if (num(b.since?.['pointer.cancel']))
                note.push(`${b.since['pointer.cancel']} pointer cancel(s)`);
        }
        rows.push({ name, label: CHECKPOINT_LABEL[name], reference: a ? `+${r1(a.t / 1000)}s` : 'not reached', problem: b ? `+${r1(b.t / 1000)}s` : 'NOT REACHED', note: note.join('; ') });
    }
    if (rcp.size === 0 || pcp.size === 0)
        missingEvidence.push(`${rcp.size === 0 ? 'reference' : 'problem'} report has no checkpoints (the onboarding was not started, or an old report): no step-by-step comparison is possible`);
    if (firstMissing) {
        const hint = STEP_HINT[firstMissing];
        const lastReached = [...CHECKPOINTS].reverse().find((n) => pcp.has(n));
        const tail = arr(P.events?.list).slice(-6).map((e) => `+${e.t}ms ${e.k}${e.tgt ? ` ${String(e.tgt).slice(0, 60)}` : ''}${e.attr ? ` ${e.attr}:${e.from}>${e.to}` : ''}`);
        const taps = arr(P.events?.list).filter((e) => e.k === 'tap' || e.k === 'tap.noclick').slice(-4).map((e) => `${e.k === 'tap' ? 'tap' : 'tap WITHOUT click'} on ${str(e.tgt).slice(0, 48)}${e.hit && e.hit !== e.tgt ? ` (element under the finger: ${str(e.hit).slice(0, 48)})` : ''}`);
        add({
            id: `flow-stopped-${firstMissing}`, area: 'flow', severity: 'high', confidence: 'high', checkpoint: firstMissing,
            title: `The problem device never reached "${CHECKPOINT_LABEL[firstMissing]}" (the reference did)`,
            evidence: [`last checkpoint reached on the problem device: ${lastReached ?? 'none'}`, `where its last taps landed: ${taps.join(' | ') || 'none recorded'}`, `its last recorded events: ${tail.join(' | ') || 'none'}`, `the problem device recorded ${num(P.counters?.['tap.noclick']) ?? 0} tap(s) without a click, ${arr(P.errors).length} error(s)`],
            likelyCauses: [hint.cause, 'A tap landing on a layer other than the intended control (see the hit-target observations).', 'A transition still running when the tap arrived (taps are ignored mid-slide).'],
            suggestedFix: hint.fix, whereToLook: hint.files, confirmBy: 'Look at the previous checkpoint of the problem device: its hit results and inert flags show what the person could and could not tap.', platformExplained: false,
        });
    }
    // ---- per-checkpoint element comparison ---------------------------------------------------------------------------------------
    for (const name of CHECKPOINTS) {
        const a = rcp.get(name);
        const b = pcp.get(name);
        if (!a || !b)
            continue;
        const ra = vpFromRow(a.vp);
        const rb = vpFromRow(b.vp);
        // a step measured while the interface was still changing (a slow device) is a mid-transition reading: say so, do not compare its geometry
        const loose = a.loose === true || b.loose === true;
        if (loose)
            missingEvidence.push(`"${CHECKPOINT_LABEL[name]}" was measured mid-transition on ${a.loose && b.loose ? 'both devices' : a.loose ? 'the reference' : 'the problem device'}: its geometry and hit results are not compared (the flow and counters are)`);
        for (const eb of loose ? [] : arr(b.el)) {
            // a part that fills the screen is left out of a report unless something is wrong with it, so "absent on the reference" means "unremarkable"
            const flagged = !!eb.breaker || eb.hit === false || /inert/.test(str(eb.f));
            const ea = elOf(a, eb.k) ?? (flagged ? {} : null);
            if (!ea)
                continue;
            const ma = metricsOf(ea, a);
            const mb = metricsOf(eb, b);
            const flagsA = str(ea.f);
            const flagsB = str(eb.f);
            // hit targets. A control that is blocked at one step but fine at a LATER step on the same device was caught mid-transition: that is a
            // slower release of the previous step's locks, not a dead control, so it is reported with low confidence and as medium severity.
            const laterOk = CHECKPOINTS.slice(CHECKPOINTS.indexOf(name) + 1).some((later) => { const x = elOf(pcp.get(later), eb.k); return !!x && x.hit !== false && !/inert/.test(str(x.f)); });
            if (eb.hit === false && ea.hit !== false) {
                add({ id: `hit-${name}-${eb.k}`, area: 'hit-targets', severity: laterOk ? 'medium' : 'high', confidence: laterOk ? 'low' : 'high', checkpoint: name,
                    title: `"${eb.k}" cannot be tapped at "${CHECKPOINT_LABEL[name]}" on the problem device, but can on the reference`,
                    evidence: [`problem: a tap at the centre of ${eb.k} lands on ${str(eb.top) || 'another element'}${flagsB ? ` (flags: ${flagsB})` : ''}`, `reference: the same control receives the tap${flagsA ? ` (flags: ${flagsA})` : ''}`].concat(laterOk ? ['the same control IS tappable at a later checkpoint on the problem device: this was probably a slower transition, not a dead control'] : []),
                    likelyCauses: ['A transparent or full-screen layer above the control that takes touches (pointer-events not none).', 'The control sits inside a layer that is still inert on this device (state not released).', 'The control is positioned somewhere other than where it is drawn.'],
                    suggestedFix: `Find the element named above and either set pointer-events:none on it while it is only decorative, or remove the [inert]/aria lock it holds. Then re-run: "${eb.k}" must report hit:true.`,
                    whereToLook: where(eb.k), confirmBy: 'The "top" element is the one to inspect in Safari Web Inspector (or the hit chain in a full report).', platformExplained: false });
            }
            if (/inert/.test(flagsB) && !/inert/.test(flagsA) && eb.hit !== undefined) {
                add({ id: `inert-${name}-${eb.k}`, area: 'hit-targets', severity: laterOk ? 'medium' : 'high', confidence: laterOk ? 'low' : 'high', checkpoint: name,
                    title: `"${eb.k}" is still inert at "${CHECKPOINT_LABEL[name]}" on the problem device only`,
                    evidence: [`problem flags: ${flagsB}`, `reference flags: ${flagsA || 'none'}`].concat(laterOk ? ['released again at a later checkpoint on the problem device: a slower transition'] : []),
                    likelyCauses: ['A step was shown without releasing the inert lock of the previous step (a state transition that did not fire or ran in a different order).'],
                    suggestedFix: 'Trace which handler removes [inert] from this panel when the step starts, and why it did not run (or ran before the panel existed) on this device.', whereToLook: where(eb.k), platformExplained: false });
            }
            // visibility inside the visible area
            const va = num(ea.vv) ?? 1;
            const vb = num(eb.vv) ?? 1;
            if (vb < 0.8 && va >= 0.95 && !/not-rendered/.test(flagsB)) {
                add({ id: `visible-${name}-${eb.k}`, area: 'geometry', severity: vb === 0 ? 'high' : 'medium', confidence: 'high', checkpoint: name,
                    title: `"${eb.k}" is only ${pct(vb)} inside the visible area on the problem device (reference ${pct(va)})`,
                    evidence: [`problem viewport row ${JSON.stringify(b.vp)}`, `reference viewport row ${JSON.stringify(a.vp)}`, mb ? `problem position (fractions) ${JSON.stringify(mb.n)}, reference ${JSON.stringify(ma?.n)}` : ''].filter(Boolean),
                    likelyCauses: ['A position calculated against the layout viewport while the visible area (visual viewport) is offset or scaled.', 'The control is positioned relative to a box taller than the screen (100vh/lvh used where dvh/svh was meant).'],
                    suggestedFix: 'Anchor this control to the visual viewport (visualViewport.offsetTop/height) or to dvh/svh instead of vh/lvh, and re-measure.', whereToLook: where(eb.k), platformExplained: false });
            }
            // geometry
            if (ma && mb && !ma.full && !mb.full && !/not-rendered|hidden/.test(flagsB + flagsA)) {
                const xOk = Math.abs(ma.cx - mb.cx) < 0.045 || Math.abs(ma.left - mb.left) < 10 || Math.abs(ma.right - mb.right) < 10 || (ma.g && mb.g ? Math.abs(ma.g[0] - mb.g[0]) < 0.08 : false);
                const yOk = Math.abs(ma.cy - mb.cy) < 0.05 || Math.abs(ma.top - mb.top) < 12 || Math.abs(ma.bottom - mb.bottom) < 12 || (ma.g && mb.g ? Math.abs(ma.g[1] - mb.g[1]) < 0.08 : false);
                const wRatio = ma.wPx > 0 ? mb.wPx / ma.wPx : 1;
                const nwRatio = ma.w > 0 ? mb.w / ma.w : 1;
                const gwRatio = ma.g && mb.g && ma.g[2] > 0 ? mb.g[2] / ma.g[2] : null;
                const scaleOff = (nwRatio < 0.8 || nwRatio > 1.25) && Math.abs(mb.wPx - ma.wPx) > 14 && (gwRatio === null || gwRatio < 0.85 || gwRatio > 1.18) && (wRatio < 0.8 || wRatio > 1.25);
                if (!xOk || !yOk) {
                    const dist = Math.max(Math.abs(ma.cx - mb.cx), Math.abs(ma.cy - mb.cy));
                    add({ id: `pos-${name}-${eb.k}`, area: 'geometry', severity: dist > 0.15 ? 'high' : 'medium', confidence: 'medium', checkpoint: name,
                        title: `"${eb.k}" sits in a different place relative to the screen and the globe at "${CHECKPOINT_LABEL[name]}"`,
                        evidence: [`reference: x ${pct(ma.cx)} y ${pct(ma.cy)} of the visible area, top ${r1(ma.top)}px bottom ${r1(ma.bottom)}px${ma.g ? `, globe offset (${ma.g[0]}, ${ma.g[1]}) diameters` : ''}`, `problem:   x ${pct(mb.cx)} y ${pct(mb.cy)}, top ${r1(mb.top)}px bottom ${r1(mb.bottom)}px${mb.g ? `, globe offset (${mb.g[0]}, ${mb.g[1]}) diameters` : ''}`, 'no frame of reference (fraction, either edge, globe) agrees, so a plain difference of screen size does not explain it'],
                        likelyCauses: ['The application positions it from a measurement taken at a different moment or against a different viewport (captured before the toolbar/keyboard settled).', 'A CSS unit resolves differently (vh vs dvh/svh, env() safe-area) so the same rule yields a different box.'],
                        suggestedFix: 'Find where this element\'s position is computed (not just CSS): re-measure it after the visual viewport settles, or derive it from the globe\'s own rectangle instead of the window.', whereToLook: where(eb.k), platformExplained: false });
                }
                if (scaleOff) {
                    add({ id: `scale-${name}-${eb.k}`, area: 'geometry', severity: 'medium', confidence: 'medium', checkpoint: name,
                        title: `"${eb.k}" is drawn at a different scale at "${CHECKPOINT_LABEL[name]}"`,
                        evidence: [`width: ${r1(ma.wPx)}px (${pct(ma.w)} of the screen) on the reference vs ${r1(mb.wPx)}px (${pct(mb.w)}) on the problem device`, gwRatio !== null ? `relative to the globe: ${r1(gwRatio * 100) / 100}x` : 'no globe reference at this step'],
                        likelyCauses: ['A size derived from min(innerWidth, innerHeight) or from a viewport unit that differs between the two browsers.', 'Page zoom (visualViewport.scale) on the problem device.'],
                        suggestedFix: 'Check the sizing expression for this element against dvh/svh and visualViewport.scale; the other elements of the step should keep their ratio to the globe.', whereToLook: where(eb.k), platformExplained: false });
                }
            }
            // CSS positioning / stacking
            const stA = str(ea.st);
            const stB = str(eb.st);
            if (stA && stB) {
                const tok = (s, p) => (s.split(' ').find((t) => p.test(t)) ?? '');
                const diffs = [];
                for (const [label, pattern] of [['position', /^(fixed|absolute|relative|sticky)$/], ['transform', /^tf:/], ['backdrop-filter', /^bf:/], ['filter', /^filter:/], ['will-change', /^will:/], ['contain', /^contain:/], ['overflow', /^ovf:/], ['pointer-events', /^pe:/]]) {
                    const x = tok(stA, pattern);
                    const y = tok(stB, pattern);
                    if ((x === '') !== (y === '') || (label === 'position' && x !== y) || (label === 'pointer-events' && x !== y))
                        diffs.push(`${label}: reference "${x || 'default'}" vs problem "${y || 'default'}"`);
                }
                if (diffs.length) {
                    add({ id: `css-${name}-${eb.k}`, area: 'css-stacking', severity: 'medium', confidence: 'medium', checkpoint: name,
                        title: `"${eb.k}" has a different CSS positioning/compositing kind at "${CHECKPOINT_LABEL[name]}"`,
                        evidence: diffs, likelyCauses: ['A rule that applies only in one engine (an @supports (-webkit-touch-callout) block, a vendor-prefixed property) or a state class applied by script on one device only.', 'The application recovery layer for iOS (data-ios-webkit-recovery) overrides it by design: confirm that is intended.'],
                        suggestedFix: 'Decide which of the two computed values is the intended one; if the problem device is wrong, find the rule that sets it (search the property in premium-earth-phase-a.css and the module that owns the element).', whereToLook: where(eb.k), platformExplained: false });
                }
            }
            if (eb.breaker && !ea.breaker) {
                add({ id: `breaker-${name}-${eb.k}`, area: 'css-stacking', severity: 'high', confidence: 'high', checkpoint: name,
                    title: `"${eb.k}" is position:fixed but not fixed to the screen on the problem device`,
                    evidence: [`problem: an ancestor makes it positioned against itself: ${String(eb.breaker)}`, 'reference: no such ancestor'],
                    likelyCauses: ['transform / filter / backdrop-filter / will-change / contain on an ancestor creates a containing block for fixed descendants; a state or animation applies it on this device only.'],
                    suggestedFix: 'Remove the property from that ancestor (or move the fixed element out of it) while the step is interactive; if an animation needs it, clear it when the animation ends.', whereToLook: where(eb.k), platformExplained: false });
            }
            // viewport at the checkpoint
            void ra;
            void rb;
        }
        // viewport behaviour at the checkpoint
        if (ra && rb && !loose) {
            if (rb.kbMode === 'none' && (Math.abs(rb.ot) > 1 || Math.abs(rb.ol) > 1) && !(Math.abs(ra.ot) > 1 || Math.abs(ra.ol) > 1)) {
                add({ id: `pan-${name}`, area: 'viewport', severity: 'high', confidence: 'high', checkpoint: name,
                    title: `The visible area is panned at "${CHECKPOINT_LABEL[name]}" on the problem device without a keyboard`,
                    evidence: [`problem: visual viewport offset top ${rb.ot}, left ${rb.ol}, scale ${rb.scale}`, `reference: offset ${ra.ot}, ${ra.ol}, scale ${ra.scale}`],
                    likelyCauses: ['iOS moved the page to reveal a focused field and did not move it back (the visual viewport stays panned while position:fixed layers stay put).', 'A scroll or focus() call by the application shifted the layout viewport.'],
                    suggestedFix: 'After a field loses focus (and after the keyboard closes) reset window scroll and re-measure from visualViewport; verify onboardingKeyboardViewport handles the "keyboard closed but offset remains" case.', whereToLook: where('experience'), platformExplained: false });
            }
            if (Math.abs(rb.scale - 1) > 0.02 && Math.abs(ra.scale - 1) <= 0.02) {
                add({ id: `zoom-${name}`, area: 'viewport', severity: 'high', confidence: 'high', checkpoint: name,
                    title: `The page is zoomed (scale ${rb.scale}) at "${CHECKPOINT_LABEL[name]}" on the problem device only`,
                    evidence: [`problem visual viewport ${rb.vw}x${rb.vh}, layout ${rb.iw}x${rb.ih}`], likelyCauses: ['iOS auto-zoom after focusing a text field smaller than 16px; it does not zoom back out by itself.'],
                    suggestedFix: 'Make every focusable text field at least 16px (computed), or set maximum-scale only if accessibility allows; then re-test the name and time fields.', whereToLook: where('panelInput'), platformExplained: false });
            }
            if (rb.scrollY > 1 && ra.scrollY <= 1) {
                add({ id: `scroll-${name}`, area: 'viewport', severity: 'medium', confidence: 'medium', checkpoint: name,
                    title: `The page itself is scrolled (${rb.scrollY}px) at "${CHECKPOINT_LABEL[name]}" on the problem device only`,
                    evidence: [`reference scrollY ${ra.scrollY}`], likelyCauses: ['The document is scrollable on this engine (an element taller than the screen) and iOS scrolled it for a focused field.'],
                    suggestedFix: 'Keep the stage non-scrollable (overflow hidden on html/body, fixed scene root) and re-measure after focus; check which element makes scrollHeight exceed innerHeight.', whereToLook: where('experience'), platformExplained: false });
            }
            const gapB = Math.abs(rb.ih - (rb.vh + rb.ot));
            const gapA = Math.abs(ra.ih - (ra.vh + ra.ot));
            if (rb.kbMode === 'none' && gapB > 3 && gapA <= 3) {
                add({ id: `vvgap-${name}`, area: 'viewport', severity: 'low', confidence: 'medium', checkpoint: name,
                    title: `Layout and visual viewport heights disagree at "${CHECKPOINT_LABEL[name]}" on the problem device`,
                    evidence: [`problem: innerHeight ${rb.ih} vs visual ${rb.vh}+${rb.ot}`, `reference: ${ra.ih} vs ${ra.vh}+${ra.ot}`], likelyCauses: ['Browser toolbar mid-transition, or a bottom bar covering part of the page.'], suggestedFix: 'Measure again after the toolbar settles (visualViewport resize) before positioning anything against the bottom edge.', whereToLook: where('experience'), platformExplained: false });
            }
        }
        // taps needed
        const ta = (num(a.since?.tap) ?? 0) + (num(a.since?.['tap.noclick']) ?? 0);
        const tb = (num(b.since?.tap) ?? 0) + (num(b.since?.['tap.noclick']) ?? 0);
        if (tb >= ta + 2) {
            const isPicker = name === 'birth-date' || name === 'birth-time';
            add({ id: `taps-${name}`, area: isPicker ? 'calendar-picker' : 'hit-targets', severity: 'medium', confidence: 'medium', checkpoint: name,
                title: `"${CHECKPOINT_LABEL[name]}" needed ${tb} taps on the problem device but ${ta} on the reference`,
                evidence: [`problem since the previous step: ${JSON.stringify(b.since)}`, `reference: ${JSON.stringify(a.since)}`],
                likelyCauses: ['The first tap landed during a transition or on a layer that took it (the second one worked).', 'A tap reached the element but the handler waits for an event WebKit delivers differently (click vs pointer/touch ordering).'],
                suggestedFix: 'Check tap.noclick events and the hit chain for the control at the previous checkpoint; if a transition is the cause, make the control active as soon as it is visible.', whereToLook: where(isPicker ? 'pickerHost' : 'panelButton'), platformExplained: false });
        }
    }
    // ---- rim vs globe alignment (positioning calculation), per device ----------------------------------------------------------
    const misalign = (cps) => {
        const cp = cps.get('globe-selection');
        if (typeof cp?.rimOffset === 'number')
            return { name: 'globe-selection', dist: cp.rimOffset };
        const rim = elOf(cp, 'earthRim');
        const sym = elOf(cp, 'focusedSymbol');
        if (!rim?.n || !sym?.n || !cp?.globe)
            return null;
        const dx = (rim.n[0] + rim.n[2] / 2) - (sym.n[0] + sym.n[2] / 2);
        const dy = (rim.n[1] + rim.n[3] / 2) - (sym.n[1] + sym.n[3] / 2);
        const vp = vpFromRow(cp.vp);
        if (!vp)
            return null;
        const dpx = Math.hypot(dx * vp.vw, dy * vp.vh);
        const diameter = Math.max(cp.globe[2], cp.globe[3]) || 1;
        return { name: 'globe-selection', dist: dpx / diameter };
    };
    const ma = misalign(rcp);
    const mb = misalign(pcp);
    if (mb && mb.dist > 0.04 && (!ma || mb.dist > ma.dist * 2 + 0.01)) {
        add({ id: 'rim-misaligned', area: 'geometry', severity: 'high', confidence: ma ? 'high' : 'medium', checkpoint: 'globe-selection',
            title: 'The Earth rim and the selected globe are not concentric on the problem device',
            evidence: [`problem: centres ${r1(mb.dist * 100)}% of a globe diameter apart`, ma ? `reference: ${r1(ma.dist * 100)}%` : 'reference: not measured'],
            likelyCauses: ['The rim position was captured (captureEarthGeometry) at a moment when the globe or the visual viewport was elsewhere, and never refreshed.'],
            suggestedFix: 'Recompute the rim position from the focused globe\'s getBoundingClientRect after layout settles and on every visual-viewport resize/scroll; do not cache it per width.', whereToLook: where('earthRim'), platformExplained: false });
    }
    // ---- hit-target counters ----------------------------------------------------------------------------------------------------
    /** The pinned evidence if the report has it, otherwise whatever the timeline still holds. */
    const pinned = (j, bucket, kind) => (Array.isArray(j.key?.[bucket]) ? arr(j.key[bucket]) : arr(j.events?.list).filter((e) => e.k === kind));
    const rc = R.counters ?? {};
    const pc = P.counters ?? {};
    const cnt = (c, k) => num(c[k]) ?? 0;
    if (cnt(pc, 'tap.noclick') > cnt(rc, 'tap.noclick') && cnt(pc, 'tap.noclick') >= 1) {
        const targets = pinned(P, 'noclick', 'tap.noclick').slice(-4).map((e) => `${str(e.tgt).slice(0, 50)} (under finger: ${str(e.hit).slice(0, 50)}${e.inert ? ', inert' : ''}${e.pe === 'none' ? ', pointer-events:none' : ''})`);
        add({ id: 'tap-noclick', area: 'hit-targets', severity: 'high', confidence: 'high', title: `${cnt(pc, 'tap.noclick')} tap(s) never became a click on the problem device (reference ${cnt(rc, 'tap.noclick')})`,
            evidence: targets.length ? targets : ['see the tap.noclick events'], likelyCauses: ['A touch handler cancelled the gesture (preventDefault) or replaced the target between touch-down and touch-up.', 'An invisible layer took the touch (target and element under the finger differ).'],
            suggestedFix: 'For each target listed, check touchstart/touchend listeners on it and its ancestors (passive:false + preventDefault) and the element under the finger.', whereToLook: where('panelButton'), platformExplained: false });
    }
    if (cnt(pc, 'pointer.cancel') >= Math.max(2, cnt(rc, 'pointer.cancel') * 2)) {
        add({ id: 'pointer-cancel', area: 'hit-targets', severity: 'medium', confidence: 'medium', title: `Many cancelled pointers on the problem device (${cnt(pc, 'pointer.cancel')} vs ${cnt(rc, 'pointer.cancel')})`,
            evidence: ['iOS cancels a pointer when the browser takes over the gesture (scroll, zoom, system swipe).'], likelyCauses: ['touch-action does not cover the control, so the browser claims the gesture.'], suggestedFix: 'Set touch-action: manipulation (or none for the drag surfaces) on the controls that lose taps.', whereToLook: where('panelButton'), platformExplained: false });
    }
    if (cnt(pc, 'touch.defaultPrevented') > cnt(rc, 'touch.defaultPrevented') + 1) {
        add({ id: 'touch-prevented', area: 'hit-targets', severity: 'low', confidence: 'medium', title: `Touch events arrive already cancelled more often on the problem device (${cnt(pc, 'touch.defaultPrevented')} vs ${cnt(rc, 'touch.defaultPrevented')})`, evidence: [], likelyCauses: ['A document-level touch listener cancels gestures (the Earth drag handler) outside its own area.'], suggestedFix: 'Restrict the Earth gesture listener to the Earth surface, or make it passive.', whereToLook: ['frontend-app/src/onboardingEarthGestureAccess.ts'], platformExplained: false });
    }
    const bigOnlyProblem = arr(P.gpu?.overlays).filter((o) => o.pe !== 'none' && !arr(R.gpu?.overlays).some((r) => str(r.d) === str(o.d)) && !/spacetime-intro|earth-loading-cover|incarnation-veil|kt-qa/.test(str(o.d)));
    if (bigOnlyProblem.length) {
        add({ id: 'overlay-problem-only', area: 'hit-targets', severity: 'high', confidence: 'medium', title: `A large layer that takes touches exists only on the problem device`,
            evidence: bigOnlyProblem.slice(0, 3).map((o) => `${str(o.d)} z=${str(o.z)} covers ${pct(num(o.cover) ?? 0)} pointer-events:${str(o.pe)}`), likelyCauses: ['A decorative layer (glow, mask, canvas) that is not pointer-events:none on this engine.'], suggestedFix: 'Give the layer pointer-events:none, or find why it exists only here.', whereToLook: ['frontend-app/src/premium-earth-phase-a.css'], platformExplained: false });
    }
    // ---- keyboard / input -------------------------------------------------------------------------------------------------------
    const settle = (j) => pinned(j, 'kb', 'kb.settle');
    const rs = settle(R);
    const ps = settle(P);
    if (rs.length && ps.length) {
        const modeR = str(rs[rs.length - 1].mode);
        const modeP = str(ps[ps.length - 1].mode);
        if (modeR !== modeP) {
            add({ id: 'keyboard-model', area: 'keyboard-input', severity: 'info', confidence: 'high', title: `The keyboard changes the viewport differently (${modeR} vs ${modeP})`,
                evidence: [`reference: keyboard ${modeR} (layout height ${rs[rs.length - 1].ih}, visual ${rs[rs.length - 1].vh})`, `problem: keyboard ${modeP} (layout height ${ps[ps.length - 1].ih}, visual ${ps[ps.length - 1].vh})`],
                likelyCauses: ['Expected: Android Chrome (interactive-widget=resizes-content) shrinks the LAYOUT viewport; iOS leaves it and shrinks only the VISUAL viewport.'], suggestedFix: 'Not a bug by itself. The application must keep fields visible in BOTH models: judge it by the "field visible after keyboard" result below.', whereToLook: where('experience'), platformExplained: true });
        }
        const visR = Math.min(...rs.map((e) => num(e.vis) ?? 1));
        const visP = Math.min(...ps.map((e) => num(e.vis) ?? 1));
        if (visP < 0.7 && visR >= 0.9) {
            const worst = ps.filter((e) => (num(e.vis) ?? 1) === visP)[0];
            add({ id: 'field-hidden', area: 'keyboard-input', severity: 'high', confidence: 'high', title: 'A focused field is hidden by the keyboard on the problem device only',
                evidence: [`problem: ${str(worst.tgt)} ${pct(visP)} visible after the keyboard settled (keyboard ${str(worst.mode)}, inset ${str(worst.inset)}px, scrollY ${str(worst.sy)}, visual offsetTop ${str(worst.ot)})`, `reference: worst field ${pct(visR)} visible`],
                likelyCauses: ['The app compensates for a layout-resize keyboard (Android) but not for an overlay keyboard (iOS): nothing scrolls or moves the field above the keyboard.'], suggestedFix: 'Use visualViewport.height/offsetTop to place the active form above the keyboard (the existing --kt-keyboard-dock-bottom path) and verify it on the time fields inside the picker as well.', whereToLook: where('dock').concat(where('panelInput')), platformExplained: false });
        }
        const zoomP = ps.filter((e) => (num(e.s) ?? 1) > 1.02);
        if (zoomP.length && !rs.some((e) => (num(e.s) ?? 1) > 1.02)) {
            add({ id: 'focus-zoom', area: 'keyboard-input', severity: 'high', confidence: 'high', title: 'Focusing a field zooms the page on the problem device only',
                evidence: zoomP.slice(0, 3).map((e) => `${str(e.tgt)}: scale ${str(e.s)}, field font-size ${str(e.fs)}`), likelyCauses: ['The field text is smaller than 16px: iOS zooms in on focus.'], suggestedFix: 'Set font-size: 16px (or larger) on every text input, including the hour/minute fields of the time picker.', whereToLook: where('panelInput').concat(where('timePicker')), platformExplained: false });
        }
    }
    else if (ps.length === 0 && pinned(P, 'focus', 'focus.in').some((e) => e.text !== false)) {
        missingEvidence.push('the problem device focused a text field but recorded no keyboard-settle measurement: the keyboard comparison is incomplete');
    }
    const smallOf = (j) => pinned(j, 'focus', 'focus.in').filter((e) => e.text !== false && parseFloat(str(e.fs)) < 16);
    const small = smallOf(P);
    if (small.length) {
        add({ id: 'small-field-font', area: 'keyboard-input', severity: 'medium', confidence: 'medium', title: 'A text field smaller than 16px was focused on the problem device',
            evidence: small.slice(0, 3).map((e) => `${str(e.tgt)} font-size ${str(e.fs)}`).concat(smallOf(R).length ? ['the reference also has fields under 16px: Android does not zoom on focus, so this is an iOS-only RISK in a property both devices share, not a measured difference between them'] : []), likelyCauses: ['iOS auto-zooms fields under 16px (the page scales up and does not scale back), which displaces every fixed element.'], suggestedFix: 'Raise the computed font-size of that field to 16px.', whereToLook: where('panelInput'), platformExplained: false });
    }
    if (cnt(pc, 'focus.bounce') > cnt(rc, 'focus.bounce')) {
        add({ id: 'focus-bounce', area: 'keyboard-input', severity: 'medium', confidence: 'medium', title: `A field lost focus right after gaining it on the problem device (${cnt(pc, 'focus.bounce')} vs ${cnt(rc, 'focus.bounce')})`, evidence: [], likelyCauses: ['A re-render replaces the field under the finger, or a handler blurs it when the viewport changes.'], suggestedFix: 'Do not re-create inputs, or call blur/focus, in response to visualViewport resize while a field is focused.', whereToLook: where('panelInput'), platformExplained: false });
    }
    // ---- calendar / date picker ---------------------------------------------------------------------------------------------------
    const picks = (j) => pinned(j, 'picker', 'picker.check');
    const rpk = picks(R);
    const ppk = picks(P);
    for (const p of ppk) {
        const inView = num(p.inView);
        if (inView !== null && inView < 0.85 && (rpk.length === 0 || rpk.every((r) => (num(r.inView) ?? 1) >= 0.95))) {
            add({ id: `picker-offscreen-${str(p.mode)}`, area: 'calendar-picker', severity: 'high', confidence: 'high', title: `The ${str(p.mode)} picker opened mostly outside the visible area on the problem device`,
                evidence: [`problem: ${pct(inView)} inside the visual viewport at +${str(p.t)}ms`, `reference: ${rpk.map((r) => pct(num(r.inView) ?? 1)).join(', ') || 'no picker check'}`], likelyCauses: ['The overlay is anchored to the layout viewport or to a field position measured before the page moved.'], suggestedFix: 'Anchor the picker to the visual viewport (offsetTop/height) when it opens and again on visualViewport resize.', whereToLook: where('pickerHost'), platformExplained: false });
        }
        const top = arr(p.topAtCentre);
        if (top.length && !/arrival|picker|calendar/.test(str(top[0])) && rpk.every((r) => /arrival|picker|calendar/.test(str(arr(r.topAtCentre)[0])) || !arr(r.topAtCentre).length)) {
            add({ id: `picker-covered-${str(p.mode)}`, area: 'calendar-picker', severity: 'high', confidence: 'medium', title: `Something else is on top of the ${str(p.mode)} picker on the problem device`,
                evidence: [`problem: at the picker centre the topmost element is ${str(top[0])}`], likelyCauses: ['A layer above the picker layer (z-index / stacking context) or an overlay that was not hidden.'], suggestedFix: 'Raise the picker layer above that element or remove the cover; check the stacking chain of the picker host.', whereToLook: where('pickerHost'), platformExplained: false });
        }
    }
    for (const name of ['birth-date', 'birth-time']) {
        const a = rcp.get(name);
        const b = pcp.get(name);
        if (a && !b && !firstMissing)
            missingEvidence.push(`${name} was not reached on the problem device`);
        if (a && b) {
            const cal = name === 'birth-date' ? 'calendar' : 'timePicker';
            const ea = elOf(a, cal);
            const eb = elOf(b, cal);
            if (ea && !eb)
                add({ id: `picker-missing-${name}`, area: 'calendar-picker', severity: 'high', confidence: 'medium', checkpoint: name, title: `The ${cal} element was not measurable at "${CHECKPOINT_LABEL[name]}" on the problem device`, evidence: ['present on the reference, absent or not rendered on the problem device'], likelyCauses: ['The picker was not built or was removed before the measurement.'], suggestedFix: 'Check the picker lifecycle events (state / data-picker-mode) around this step in the problem timeline.', whereToLook: where(cal), platformExplained: false });
        }
    }
    // ---- unexpected viewport changes ------------------------------------------------------------------------------------------------
    const vpR = cnt(rc, 'viewport.event');
    const vpP = cnt(pc, 'viewport.event');
    if (cnt(pc, 'viewport.storm') > cnt(rc, 'viewport.storm') || (vpP > 80 && vpP > vpR * 3)) {
        add({ id: 'viewport-storm', area: 'viewport', severity: 'high', confidence: 'medium', title: `Far more viewport events on the problem device (${vpP} vs ${vpR}; ${cnt(pc, 'viewport.storm')} storm(s))`,
            evidence: ['Repeated resize/scroll events make position code re-run and re-measure continuously.'], likelyCauses: ['A handler changes something that itself resizes the viewport (toolbar show/hide, a layout write) and feeds back.'], suggestedFix: 'Debounce/coalesce visualViewport handlers and avoid writes that change the viewport inside them.', whereToLook: where('experience'), platformExplained: false });
    }
    // ---- rendering and performance --------------------------------------------------------------------------------------------------
    const share = (j) => { const p = j.perf; const t = num(p?.totalFrames); return t && t > 60 ? ((num(p.slowFrames) ?? 0) + (num(p.verySlowFrames) ?? 0)) / t : null; };
    const sr = share(R);
    const sp = share(P);
    if (sr !== null && sp !== null && sp > 0.12 && sp > sr * 2 + 0.04) {
        add({ id: 'frame-pace', area: 'rendering-performance', severity: sp > 0.3 ? 'high' : 'medium', confidence: 'medium', title: `Much slower frames on the problem device (${pct(sp)} of frames over 34 ms vs ${pct(sr)})`,
            evidence: [`worst gap ${str(P.perf?.worstGapMs)}ms vs ${str(R.perf?.worstGapMs)}ms; timer drift ${str(P.perf?.timerDriftWorstMs)}ms vs ${str(R.perf?.timerDriftWorstMs)}ms`, `GPU layers (backdrop-filter+filter): ${(num(P.gpu?.backdropFilter) ?? 0) + (num(P.gpu?.filter) ?? 0)} vs ${(num(R.gpu?.backdropFilter) ?? 0) + (num(R.gpu?.filter) ?? 0)}`],
            likelyCauses: ['Overlapping backdrop-filter surfaces are rasterised separately by WebKit.', 'Low Power Mode caps iOS at 30 fps (check before blaming the page).', 'An animation or canvas too large for the device.'], suggestedFix: 'Reduce simultaneous backdrop-filter layers on the onboarding stage (the deviceCapabilityMode path), then re-measure; confirm Low Power Mode was off.', whereToLook: ['frontend-app/src/deviceCapabilityMode.ts', 'frontend-app/src/glassSurfaceUnification.ts'], platformExplained: false });
    }
    const topR = arr(R.mutations?.top);
    const topP = arr(P.mutations?.top);
    const floorR = topR.length ? Math.min(...topR.map((m) => num(m.n) ?? 0)) : 0;
    const solo = topP.filter((m) => (num(m.n) ?? 0) >= Math.max(400, floorR * 2) && !topR.some((r) => str(r.d) === str(m.d)));
    const peakR = num(R.mutations?.peakPerSecond) ?? 0;
    const peakP = num(P.mutations?.peakPerSecond) ?? 0;
    if (solo.length || (peakP > 250 && peakP > peakR * 3)) {
        add({ id: 'dom-churn', area: 'rendering-performance', severity: 'medium', confidence: 'medium', title: solo.length ? `A node is rewritten ${str(solo[0].n)} times on the problem device only (${str(solo[0].d).slice(0, 60)})` : `DOM attribute churn peaks at ${peakP}/s on the problem device (reference ${peakR}/s)`,
            evidence: (solo.length ? solo : topP).slice(0, 4).map((m) => `${str(m.d)} x${str(m.n)}`).concat([`peak rewrites per second: ${peakP} vs ${peakR} (a faster-running animation also raises this: compare the nodes, not only the rate)`]), likelyCauses: ['A script rewrites style/class on the same node every frame; on WebKit this forces style recalculation and shows as flicker.'], suggestedFix: 'Write animated values through CSS variables on one element, or transform/opacity only; stop writes while hidden.', whereToLook: ['frontend-app/src/onboardingAmbientBackdrop.ts', 'frontend-app/src/onboardingEarthIdleRotation.ts'], platformExplained: false });
    }
    if (cnt(pc, 'webgl.contextlost') > cnt(rc, 'webgl.contextlost'))
        add({ id: 'webgl-lost', area: 'rendering-performance', severity: 'high', confidence: 'high', title: 'A WebGL context was lost on the problem device only', evidence: [`${cnt(pc, 'webgl.contextlost')} loss(es), ${cnt(pc, 'webgl.contextrestored')} restore(s)`], likelyCauses: ['iOS dropped the GPU context under memory pressure.'], suggestedFix: 'Rebuild the Earth on webglcontextrestored and reduce canvas memory.', whereToLook: ['frontend-app/src/app/premium-earth/ambient/earthMap.ts'], platformExplained: false });
    for (const c of arr(P.gpu?.canvases))
        if (num(c?.megapixels) && c.megapixels > 16.7)
            add({ id: 'canvas-limit', area: 'rendering-performance', severity: 'high', confidence: 'high', title: `A canvas exceeds the iOS size limit (${c.megapixels} MP)`, evidence: [str(c.d)], likelyCauses: ['devicePixelRatio times CSS size exceeds 16.7 megapixels.'], suggestedFix: 'Cap the canvas backing size (devicePixelRatio clamp).', whereToLook: ['frontend-app/src/app/premium-earth/ambient/earthMap.ts'], platformExplained: false });
    if (num(R.perf?.longTasks) !== null || num(P.perf?.longTasks) !== null)
        notComparable.push('long main-thread tasks (Long Tasks API exists in Chromium only; Safari reports none)');
    notComparable.push('JS heap size (Chromium only)', 'device memory (Chromium only)');
    // ---- errors ----------------------------------------------------------------------------------------------------------------------
    const errP = arr(P.errors);
    const errR = arr(R.errors);
    const newErr = errP.filter((e) => !errR.some((r) => str(r.msg) === str(e.msg) && str(r.src) === str(e.src)));
    if (newErr.length) {
        add({ id: 'errors-problem-only', area: 'errors', severity: 'high', confidence: 'high', title: `${newErr.length} error(s) occur only on the problem device`,
            evidence: newErr.slice(0, 4).map((e) => `+${str(e.t)}ms ${str(e.k)}: ${str(e.msg)} ${str(e.src)}${e.line ? `:${str(e.line)}` : ''} ${str(e.stack)}`.trim()), likelyCauses: ['A feature the browser lacks or implements differently (see unsupported APIs), or a syntax/runtime error specific to that engine.'], suggestedFix: 'Fix the first error listed; later ones are often consequences of it.', whereToLook: [], platformExplained: false });
    }
    const failedP = arr(P.resources?.failed);
    const failedR = arr(R.resources?.failed);
    if (failedP.some((f) => !failedR.includes(f)))
        add({ id: 'resource-failed', area: 'errors', severity: 'high', confidence: 'high', title: 'A resource failed to load on the problem device only', evidence: failedP.filter((f) => !failedR.includes(f)).slice(0, 5), likelyCauses: ['A blocked or unsupported asset type (video codec, font, script) in that browser.'], suggestedFix: 'Provide a fallback for that asset or fix its URL/type.', whereToLook: [], platformExplained: false });
    // ---- environment-linked causes ----------------------------------------------------------------------------------------------------
    if (apiOnlyProblem.includes('inert'))
        add({ id: 'no-inert', area: 'hit-targets', severity: 'medium', confidence: 'medium', title: 'The problem device does not support the inert attribute', evidence: ['The onboarding locks inactive panels with [inert]; without support those panels stay tappable and focusable.'], likelyCauses: ['Old iOS WebKit (inert needs iOS 15.5+/16).'], suggestedFix: 'Add a fallback lock (pointer-events:none + aria-hidden + tabindex=-1) for panels that are hidden by [inert].', whereToLook: where('panel'), platformExplained: false });
    if (apiOnlyProblem.includes('visualViewport'))
        add({ id: 'no-visual-viewport', area: 'viewport', severity: 'high', confidence: 'high', title: 'window.visualViewport is missing on the problem device', evidence: [], likelyCauses: ['A web view that does not expose it.'], suggestedFix: 'Fall back to window.innerHeight and resize events for the keyboard layout.', whereToLook: where('experience'), platformExplained: false });
    if (cssOnlyProblem.includes('dvh') || cssOnlyProblem.includes('svh'))
        add({ id: 'no-dvh', area: 'viewport', severity: 'medium', confidence: 'medium', title: 'Dynamic viewport units are not supported on the problem device', evidence: [`unsupported: ${cssOnlyProblem.join(', ')}`], likelyCauses: ['iOS < 15.4.'], suggestedFix: 'Provide a vh fallback computed from visualViewport.height for layouts that use dvh/svh.', whereToLook: ['frontend-app/src/premium-earth-phase-a.css'], platformExplained: false });
    if (str(probEnv.browser).includes('messenger') || str(probEnv.browser).includes('webview') || probEnv.inAppBrowser) {
        drafts.push({ id: 'in-app', area: 'environment', severity: 'info', confidence: 'high', title: `The problem device runs in an in-app browser (${str(probEnv.browser)})`, evidence: arr(probEnv.notes).map(str), likelyCauses: ['In-app browsers add their own toolbars, keyboard handling and script policies.'], suggestedFix: 'Repeat the same test in Safari and in Chrome on the same iPhone: a difference between those three is the strongest lead.', whereToLook: [], confirmBy: 'Send one report from each browser on the problem device.', platformExplained: true, signals: 1 });
    }
    // ---- corroboration, ranking -------------------------------------------------------------------------------------------------------
    const perCheckpoint = new Map();
    for (const d of drafts)
        if (d.checkpoint && !d.platformExplained)
            perCheckpoint.set(d.checkpoint, (perCheckpoint.get(d.checkpoint) ?? 0) + 1);
    const degraded = /reduced|minimum/.test(reference.tier) || /reduced|minimum/.test(problem.tier);
    const finalized = drafts.map((d) => {
        let confidence = d.confidence;
        if (d.checkpoint && (perCheckpoint.get(d.checkpoint) ?? 0) >= 3 && d.area !== 'flow')
            confidence = bump(confidence, 1);
        if (degraded && (d.area === 'geometry' || d.area === 'css-stacking') && confidence !== 'high')
            confidence = bump(confidence, -1);
        const { signals: _signals, ...rest } = d;
        void _signals;
        return { ...rest, confidence };
    });
    const sevOrder = { high: 0, medium: 1, low: 2, info: 3 };
    const confOrder = { high: 0, medium: 1, low: 2 };
    finalized.sort((a, b) => sevOrder[a.severity] - sevOrder[b.severity] || confOrder[a.confidence] - confOrder[b.confidence]);
    const significant = finalized.filter((o) => !o.platformExplained && o.severity !== 'info');
    const explained = finalized.filter((o) => o.platformExplained || o.severity === 'info');
    const high = significant.filter((o) => o.severity === 'high').length;
    const verdict = significant.length === 0
        ? 'No significant difference was found in what both reports contain. If the problem device still misbehaves, the cause is not in the measured geometry, hit targets, keyboard behaviour or errors: ask for a screen recording of the failing moment and a report taken exactly then.'
        : `${significant.length} difference(s) not explained by the platform (${high} high severity). ${firstMissing ? `The problem device stops before "${CHECKPOINT_LABEL[firstMissing]}": start there. ` : ''}Read them in order; each says how sure the evidence is and what to verify.`;
    return {
        reference: summaryOf(reference, 'reference'), problem: summaryOf(problem, 'problem'), roleWarnings, context, checkpoints: rows,
        observations: significant, platformExplained: explained, notComparable, missingEvidence, verdict,
    };
}
// ------------------------------------------------------------------------------------------------------------------------------
// the readable comparison
// ------------------------------------------------------------------------------------------------------------------------------
export function renderComparison(c) {
    const L = [];
    L.push('CROSS-PLATFORM COMPARISON');
    L.push(`  reference: ${c.reference.os} | ${c.reference.browser} | ${c.reference.engine} | build ${c.reference.build} | ${c.reference.viewport}`);
    L.push(`  problem:   ${c.problem.os} | ${c.problem.browser} | ${c.problem.engine} | build ${c.problem.build} | ${c.problem.viewport}`);
    for (const w of c.roleWarnings)
        L.push(`  ! ${w}`);
    L.push('');
    L.push(`VERDICT: ${c.verdict}`);
    L.push('');
    L.push('ONBOARDING, STEP BY STEP');
    for (const r of c.checkpoints)
        L.push(`  ${r.name.padEnd(16)} reference ${r.reference.padEnd(12)} problem ${r.problem.padEnd(12)} ${r.note}`);
    L.push('');
    L.push(`OBSERVATIONS NOT EXPLAINED BY THE PLATFORM (${c.observations.length})`);
    c.observations.forEach((o, i) => {
        L.push(`${i + 1}. [${o.severity.toUpperCase()}] [confidence ${o.confidence}] [${o.area}] ${o.title}`);
        for (const e of o.evidence)
            L.push(`     evidence: ${e}`);
        for (const cause of o.likelyCauses)
            L.push(`     likely cause: ${cause}`);
        L.push(`     suggested fix: ${o.suggestedFix}`);
        if (o.whereToLook.length)
            L.push(`     look in: ${o.whereToLook.join(', ')}`);
        if (o.confirmBy)
            L.push(`     confirm by: ${o.confirmBy}`);
    });
    L.push('');
    L.push('DIFFERENCES EXPLAINED BY THE PLATFORM / CONTEXT (not bugs)');
    for (const x of c.context)
        L.push(`  - ${x}`);
    for (const o of c.platformExplained) {
        L.push(`  - ${o.title}`);
        for (const e of o.evidence.slice(0, 2))
            L.push(`      ${e}`);
        if (o.likelyCauses[0])
            L.push(`      ${o.likelyCauses[0]}`);
    }
    if (c.notComparable.length) {
        L.push('');
        L.push('NOT COMPARABLE (one engine does not report it)');
        for (const x of c.notComparable)
            L.push(`  - ${x}`);
    }
    if (c.missingEvidence.length) {
        L.push('');
        L.push('MISSING EVIDENCE');
        for (const x of c.missingEvidence)
            L.push(`  - ${x}`);
    }
    L.push('');
    L.push('A comparison shows where the two devices differ; it does not prove why. Confirm a cause with the "confirm by" step or a physical-device inspection before changing code.');
    return L.join('\n');
}
