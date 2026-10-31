export const CHECKPOINTS = [
    'intro-complete', 'place-found', 'globe-selection', 'identity-inputs', 'arrival-step', 'birth-date', 'birth-time', 'profile-review', 'main-app',
];
export const CHECKPOINT_LABEL = Object.freeze({
    'intro-complete': 'Intro finished, birthplace search ready',
    'place-found': 'Birthplace found and shown',
    'globe-selection': 'Globe selection (choose the body)',
    'identity-inputs': 'Identity inputs (name fields)',
    'arrival-step': 'Birth date and time step',
    'birth-date': 'Birth-date calendar open',
    'birth-time': 'Birth-time entry open',
    'profile-review': 'Profile review',
    'main-app': 'Main application (menu)',
});
/** Which parts of the interface matter at each checkpoint; these are measured and compared, the rest of the page is context. */
export const CHECKPOINT_FOCUS = Object.freeze({
    'intro-complete': ['experience', 'earthMap', 'dock', 'placeQuery', 'warp', 'loadingCover'],
    'place-found': ['dock', 'placeQuery', 'resultsShell', 'birthplaceCard', 'changePlace', 'confirmPlace', 'earthMap'],
    'globe-selection': ['vesselStage', 'vesselOrbit', 'focusedChoice', 'focusedSymbol', 'arrowLeft', 'arrowRight', 'vesselUndefined', 'confirmVessel', 'earthRim'],
    'identity-inputs': ['profileFlow', 'controlsLayer', 'panel', 'panelInput', 'panelButton', 'promptLayer', 'earthRim', 'effectsLayer'],
    'arrival-step': ['profileFlow', 'controlsLayer', 'panel', 'panelButton', 'pickerLayer', 'earthRim'],
    'birth-date': ['controlsLayer', 'pickerLayer', 'pickerHost', 'calendar', 'panel', 'earthRim'],
    'birth-time': ['controlsLayer', 'pickerLayer', 'pickerHost', 'timePicker', 'panel', 'earthRim'],
    'profile-review': ['profileFlow', 'controlsLayer', 'panel', 'panelButton', 'earthRim'],
    'main-app': ['experience', 'vesselStage', 'earthRim', 'earthMap'],
});
/**
 * The checkpoints a state describes RIGHT NOW. `state` is the collector's sanitized state record (keys such as "data-state",
 * "flow:data-step", "picker:data-picker-mode"). The caller remembers which names it has already seen.
 */
export function checkpointsNow(state) {
    const out = [];
    const phase = state['data-state'];
    if (state['data-intro-state'] === 'complete')
        out.push('intro-complete');
    if (phase === 'ready' || phase === 'location-only' || phase === 'confirmed')
        out.push('place-found');
    if (phase === 'vessel' || phase === 'vessel-confirmed')
        out.push('globe-selection');
    if (phase === 'identity')
        out.push('identity-inputs');
    if (phase === 'arrival' || state['flow:data-step'] === 'arrival')
        out.push('arrival-step');
    if (state['picker:data-picker-mode'] === 'date')
        out.push('birth-date');
    if (state['picker:data-picker-mode'] === 'time')
        out.push('birth-time');
    // the overview state stays set while the main application runs on top of it: the REVIEW step is over once the pillar stage exists
    if ((phase === 'overview' || phase === 'profile-created' || state['flow:data-step'] === 'complete') && !state['data-pillar-stage'])
        out.push('profile-review');
    if (state['data-pillar-stage'])
        out.push('main-app');
    return out;
}
const r3 = (n) => Math.round(n * 1000) / 1000;
/** Rectangle as [x, y, w, h] fractions of the visible area. */
export function normalizeRect(rect, area) {
    if (!(area.width > 0) || !(area.height > 0))
        return null;
    return [r3((rect[0] - (area.left ?? 0)) / area.width), r3((rect[1] - (area.top ?? 0)) / area.height), r3(rect[2] / area.width), r3(rect[3] / area.height)];
}
/** Rectangle's centre offset from the globe's centre, and its size, in globe diameters: [dx, dy, w, h]. */
export function relativeToGlobe(rect, globe) {
    if (!globe)
        return null;
    const diameter = Math.max(globe[2], globe[3]);
    if (!(diameter > 0))
        return null;
    const gx = globe[0] + globe[2] / 2;
    const gy = globe[1] + globe[3] / 2;
    return [r3((rect[0] + rect[2] / 2 - gx) / diameter), r3((rect[1] + rect[3] / 2 - gy) / diameter), r3(rect[2] / diameter), r3(rect[3] / diameter)];
}
/** Only what differs from the browser default, as one short string: a quiet element costs a few bytes. */
export function styleSummary(s) {
    const parts = [];
    if (s.pos !== 'static')
        parts.push(s.pos);
    if (s.z !== 'auto')
        parts.push(`z${s.z}`);
    if (s.disp !== 'block')
        parts.push(`d:${s.disp}`);
    if (s.vis !== 'visible')
        parts.push(`v:${s.vis}`);
    if (s.op !== '1')
        parts.push(`o:${s.op}`);
    if (s.pe !== 'auto')
        parts.push(`pe:${s.pe}`);
    if (s.tf !== 'none')
        parts.push(`tf:${s.tf.slice(0, 40)}`);
    if (s.bf !== 'none')
        parts.push(`bf:${s.bf.slice(0, 24)}`);
    if (s.filter !== 'none')
        parts.push(`filter:${s.filter.slice(0, 24)}`);
    if (s.will !== 'auto')
        parts.push(`will:${s.will}`);
    if (s.contain !== 'none')
        parts.push(`contain:${s.contain}`);
    if (s.ovf !== 'visible')
        parts.push(`ovf:${s.ovf}`);
    if (s.touchAction !== 'auto')
        parts.push(`ta:${s.touchAction}`);
    return parts.join(' ') || '-';
}
