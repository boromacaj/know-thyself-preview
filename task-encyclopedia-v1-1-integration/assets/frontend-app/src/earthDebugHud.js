/*
 * EARTH GESTURE DEBUG HUD - OPT-IN, LOCAL, TEMPORARY.
 *
 * `?earthdebug=1` puts a small fixed text panel on screen that shows, live, every link of the chain that turns a finger into a
 * spinning Earth: the raw touch events, the gesture recogniser's verdict and the filter that gave it, the scroll root, the
 * ambient session that owns the picture and the one the gesture module talks to, the impulse and whether the globe took it, and the
 * yaw the renderer actually advanced. It exists because the feature works in an emulated Android Chrome and has to be diagnosed
 * on a physical phone: one screenshot of this panel after a swipe is meant to be enough.
 *
 * Without the parameter nothing here runs: createEarthDebug() returns null and no element, timer or listener is made.
 * With it: no network (nothing is sent anywhere), no second animation-frame loop (the panel is redrawn by a 4 Hz interval and on
 * events, reading values the globe's own loop already keeps), and pointer-events: none, so it can never take a touch.
 */
const params = () => {
    try {
        return new URLSearchParams(window.location.search);
    }
    catch {
        return new URLSearchParams();
    }
};
/**
 * Which screen the app is on, in words, from the same state the gesture gate reads (data-pillar-stage on #place-experience).
 * Pure, so it is tested. The Place / Maps onboarding screen is NOT a destination: a swipe there is deliberately not the planet's.
 */
export function classifyScreen(input) {
    if (input.pillarStage) {
        if (input.pillarActive === 'menu')
            return { label: 'MAIN MENU - GESTURE EXPECTED', expected: true };
        return { label: `MODULE ${input.pillarActive ?? '?'} - GESTURE EXPECTED`, expected: true };
    }
    return { label: `PLACE / ONBOARDING (state ${input.state ?? '?'}) - GESTURE NOT EXPECTED`, expected: false };
}
export const earthDebugRequested = () => {
    const value = params().get('earthdebug');
    return value !== null && value !== '0' && value !== 'false';
};
const yesNo = (value) => (value === null ? '-' : value ? 'YES' : 'NO');
const fixed = (value, digits = 1) => (value === null || value === undefined || !Number.isFinite(value) ? '-' : value.toFixed(digits));
export function createEarthDebug() {
    if (!earthDebugRequested())
        return null;
    const state = {
        touchstart: 0, touchmove: 0, touchend: 0, touchcancel: 0, wheel: 0, activeTouchId: null, x: null, y: null, dx: 0, dy: 0,
        accumulatedVertical: 0, velocityPxPerSecond: 0, gesture: 'idle', slopPassed: null, verticalPassed: null, oneFinger: null,
        targetOptOut: null, targetLabel: '-', pathSummary: '-', destinationMatch: '-', gateReason: '-', scrollTopAtStart: null, nativeScrollMoved: false, scrollEvents: 0,
        lastScrollDelta: 0, fingerDownSuppressingScroll: false, gestureSessionId: null, impulseRequested: null, impulseCount: 0,
        lastMoveAt: 0, lastMoveDt: 0,
    };
    const lines = [];
    let dirty = true;
    let previousYaw = null;
    let webgl = null;
    const panel = document.createElement('pre');
    panel.setAttribute('aria-hidden', 'true');
    panel.dataset.earthDebug = 'true';
    panel.style.cssText = [
        'position:fixed', 'left:0', 'bottom:0', 'right:0', 'max-height:58vh', 'overflow:hidden', 'z-index:2147483000', 'margin:0', 'padding:4px 6px',
        'font:9px/1.22 ui-monospace,Menlo,Consolas,monospace', 'color:#c9ffd6', 'background:rgba(0,12,4,0.78)', 'white-space:pre-wrap',
        'word-break:break-all', 'pointer-events:none', 'user-select:none', '-webkit-user-select:none', 'touch-action:none',
    ].join(';');
    const mount = () => { (document.body ?? document.documentElement).append(panel); };
    if (document.body)
        mount();
    else
        document.addEventListener('DOMContentLoaded', mount, { once: true });
    const experience = document.getElementById('place-experience');
    const ambient = () => window.knowThyselfAmbientEarth ?? null;
    const scrollRoot = () => {
        const surfaces = [...document.querySelectorAll('.kt-pillar-surface')];
        return surfaces.find((surface) => !surface.hidden && getComputedStyle(surface).display !== 'none') ?? null;
    };
    const render = () => {
        dirty = false;
        const root = scrollRoot();
        const top = root?.scrollTop ?? 0;
        const room = root ? root.scrollHeight - root.clientHeight : 0;
        const snap = ambient()?.snapshot?.() ?? null;
        const d = snap?.debug;
        const hostId = document.querySelector('.ambient-globe')?.dataset.ambientSession ?? '-';
        const yaw = snap ? snap.yawDegrees : null;
        const yawPrevious = previousYaw;
        if (yaw !== null)
            previousYaw = yaw;
        if (webgl === null) {
            try {
                const probe = document.createElement('canvas');
                const gl = probe.getContext('webgl');
                webgl = !!gl;
                gl?.getExtension('WEBGL_lose_context')?.loseContext();
            }
            catch {
                webgl = false;
            }
        }
        const reduced = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
        const matchSession = snap && d ? String(d.id) === hostId && state.gestureSessionId === d.id : null;
        const screen = classifyScreen({
            pillarStage: experience?.dataset.pillarStage, pillarActive: experience?.dataset.pillarActive, state: experience?.dataset.state, hash: location.hash,
        });
        const out = [
            `EARTH DEBUG  build ${experience?.dataset.ktBuild ?? '?'}  t=${Math.round(performance.now())}`,
            `SCREEN ${screen.label}`,
            ...(screen.expected ? [] : ['  >> TO TEST THE EARTH: open the link with  &qa=menu  added, or tap QA (top left) then Boris. <<']),
            `TARGET ${state.targetLabel}   PATH ${state.pathSummary}`,
            `DEST   match ${state.destinationMatch}   gate: ${state.gateReason}   route ${location.hash || '(none)'}  stage ${experience?.dataset.pillarStage ?? '-'}`,
            `INPUT  ts ${state.touchstart}  tm ${state.touchmove}  te ${state.touchend}  tc ${state.touchcancel}  wheel ${state.wheel}  id ${state.activeTouchId ?? '-'}`,
            `       xy ${fixed(state.x, 0)},${fixed(state.y, 0)}  d ${fixed(state.dx, 0)},${fixed(state.dy, 0)}  vert ${fixed(state.accumulatedVertical, 0)}px  v ${fixed(state.velocityPxPerSecond, 0)}px/s  dt ${fixed(state.lastMoveDt, 0)}ms`,
            `GESTURE ${state.gesture.toUpperCase()}  slop ${yesNo(state.slopPassed)}  vertical ${yesNo(state.verticalPassed)}  1finger ${yesNo(state.oneFinger)}  optout ${yesNo(state.targetOptOut)}`,
            `SCROLL root ${root ? (root.className.replace('kt-pillar-surface', '').trim() || 'reading') : 'NONE'}  top ${Math.round(top)}  sh ${root?.scrollHeight ?? '-'}  ch ${root?.clientHeight ?? '-'}  atTop ${yesNo(root ? top <= 1 : null)}  atBottom ${yesNo(root ? top >= room - 1 : null)}`,
            `       nativeMoved ${yesNo(state.nativeScrollMoved)}  scrollEv ${state.scrollEvents}  lastDelta ${fixed(state.lastScrollDelta, 0)}  scrollSuppressed ${yesNo(state.fingerDownSuppressingScroll)}`,
            `SESSION ambient ${yesNo(!!snap)}  state ${snap?.state ?? '-'}  liveId ${d?.id ?? '-'}  renderHostId ${hostId}  gestureId ${state.gestureSessionId ?? '-'}  MATCH ${yesNo(matchSession)}${!snap && !screen.expected ? '  (no globe is expected on Place: Google owns the Earth there)' : ''}`,
            `IMPULSE last req ${fixed(state.impulseRequested, 1)}  n ${state.impulseCount}  ` + (d?.lastImpulse
                ? `accepted ${yesNo(d.lastImpulse.accepted)}${d.lastImpulse.accepted ? '' : ' (' + d.lastImpulse.reason + ')'}  spin ${fixed(d.lastImpulse.before)} -> ${fixed(d.lastImpulse.after)}  now ${fixed(snap?.spinDegreesPerSecond)}`
                : 'none yet'),
            `RENDER yaw ${fixed(yaw, 2)}  prevPanel ${fixed(yawPrevious, 2)}  dYaw(frame) ${fixed(d?.lastYawDeltaDegrees, 3)}  raf ${yesNo(d ? d.rafPending || performance.now() - d.lastFrameAt < 250 : null)}  frame# ${snap?.framesDrawn ?? '-'}  lastFrame ${d ? Math.round(d.lastFrameAt) : '-'}`,
            `FLAGS  reducedMotion ${reduced}  policy.flight ${snap?.policy.flightScale ?? '-'}  idle ${snap ? (snap.policy.idleRate * 57.2958).toFixed(2) : '-'}deg/s  webgl ${webgl}  perf ${experience?.dataset.ktPerf ?? '-'}  vis ${document.visibilityState}  visible ${yesNo(d?.visible ?? null)}  onScreen ${yesNo(d?.onScreen ?? null)}  lost ${yesNo(d?.lost ?? null)}`,
            `       cores ${navigator.hardwareConcurrency}  dpr ${devicePixelRatio}  vp ${innerWidth}x${innerHeight}  ua ${/Android/.test(navigator.userAgent) ? 'Android' : 'other'}`,
            '--- events ---',
            ...lines.slice(-9),
        ];
        panel.textContent = out.join('\n');
    };
    window.setInterval(() => { if (dirty || document.visibilityState === 'visible')
        render(); }, 250);
    return {
        state,
        log(line) {
            lines.push(`${(performance.now() / 1000).toFixed(2)} ${line}`);
            if (lines.length > 40)
                lines.shift();
            dirty = true;
        },
        touched() { dirty = true; },
    };
}
