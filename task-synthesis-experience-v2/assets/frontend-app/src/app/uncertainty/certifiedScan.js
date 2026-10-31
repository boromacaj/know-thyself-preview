/*
 * CERTIFIED SCAN - which values stay the same across a window of time, proven
 * rather than sampled.
 *
 * A birth time that is estimated, or not known at all, leaves a window of
 * instants the birth could have been. Every discrete value a reading shows - a
 * sign, a Human Design gate and line, whether two planets are in aspect - is a
 * function of the sky at the birth instant, and the question for each is the
 * same: does it hold the same value across the whole window, and if not, at
 * which instants does it change?
 *
 * Sampling the window answers "what did the samples show", not the question.
 * A value can change and change back between two samples. So every value is
 * read together with its MARGIN - how far, in degrees, the continuous quantity
 * behind it (a longitude, a separation, an elongation) is from the nearest
 * boundary that would change it - and each track carries a RATE: an upper bound
 * on how fast that quantity can move, in degrees per minute of birth time.
 *
 * THE CERTIFICATE. On an interval [a, b], a quantity that starts `m(a)` from
 * the nearest boundary and ends `m(b)` from it cannot have crossed one and come
 * back unless it travelled at least m(a) + m(b); it can travel at most
 * rate * (b - a). So when the value is the same at both ends and
 *
 *     m(a) + m(b) > rate * (b - a)
 *
 * no boundary was crossed anywhere inside, and the value is constant on the
 * whole interval. When the certificate fails the interval is halved and each
 * half is tried again, down to a resolution of one second, where a value that
 * differs at the two ends is recorded as a transition at that second.
 *
 * WHAT THIS PROVES, AND WHAT IT RESTS ON. Given correct rate bounds, every
 * transition in the window is found (to the resolution) and every interval
 * reported constant is constant. The bounds are physical maxima of each body's
 * apparent motion with a safety factor (uncertainty/motionBounds.ts), checked
 * against the engine by a test. Nothing here computes a position: the caller's
 * `sampleAt` does, with the engine's own functions, so the scan can only ever
 * describe the chart the engine would have drawn at each instant.
 *
 * A value that differs only for less than the resolution is below anything a
 * reading could say and is not reported.
 */
const MINUTE = 60_000;
export function certifiedScan(sampleAt, tracks, startMs, endMs, options = {}) {
    if (!(endMs >= startMs))
        throw new Error('certifiedScan: the window ends before it starts');
    const stepMs = Math.max(options.stepMs ?? 30 * MINUTE, 1_000);
    const resolutionMs = Math.max(options.resolutionMs ?? 1_000, 1);
    const cache = new Map();
    const at = (ms) => {
        let sample = cache.get(ms);
        if (sample === undefined) {
            sample = sampleAt(ms);
            cache.set(ms, sample);
        }
        return sample;
    };
    const transitions = new Map(tracks.map((track) => [track.id, []]));
    const refine = (a, b, pending) => {
        const sa = at(a);
        const sb = at(b);
        const uncertain = [];
        const differing = [];
        for (const track of pending) {
            const ra = track.read(sa);
            const rb = track.read(sb);
            if (ra.value === rb.value && ra.margin + rb.margin > track.rate * ((b - a) / MINUTE))
                continue;
            uncertain.push(track);
            if (ra.value !== rb.value)
                differing.push({ track, from: ra.value, to: rb.value });
        }
        if (uncertain.length === 0)
            return;
        if (b - a <= resolutionMs) {
            for (const { track, from, to } of differing)
                transitions.get(track.id).push({ atMs: b, from, to });
            return;
        }
        const middle = a + Math.floor((b - a) / 2);
        refine(a, middle, uncertain);
        refine(middle, b, uncertain);
    };
    let edge = startMs;
    while (edge < endMs) {
        const next = Math.min(edge + stepMs, endMs);
        refine(edge, next, tracks);
        edge = next;
    }
    if (startMs === endMs)
        at(startMs);
    const first = at(startMs);
    const results = new Map();
    for (const track of tracks) {
        const list = transitions.get(track.id);
        const spans = [];
        let value = track.read(first).value;
        let from = startMs;
        for (const change of list) {
            spans.push({ value, fromMs: from, toMs: change.atMs - 1 });
            value = change.to;
            from = change.atMs;
        }
        spans.push({ value, fromMs: from, toMs: endMs });
        const values = [];
        for (const span of spans)
            if (!values.includes(span.value))
                values.push(span.value);
        results.set(track.id, { id: track.id, spans, transitions: list, values });
    }
    return { results, sampleCount: cache.size, sampleAt: at };
}
/** Degrees from `longitude` to the nearest multiple of `cell` above `offset` - the margin of a value binned by `cell`. */
export function cellMargin(longitude, cell, offset = 0) {
    const position = (((longitude - offset) % cell) + cell) % cell;
    return Math.min(position, cell - position);
}
/** The bin index of `longitude` in cells of `cell` degrees starting at `offset`. */
export function cellIndex(longitude, cell, offset = 0) {
    const turn = (((longitude - offset) % 360) + 360) % 360;
    return Math.floor(turn / cell);
}
/**
 * The instants at which ANY of the given results changes, as the edges of the
 * segments on which all of them are constant: [start, t1), [t1, t2), ... [tn, end].
 * Each segment's midpoint is where a caller can evaluate a function of several
 * tracks at once - a Human Design type, an element count - knowing it holds on
 * the whole segment.
 */
export function constantSegments(results, startMs, endMs) {
    const cuts = new Set();
    for (const result of results)
        for (const change of result.transitions)
            cuts.add(change.atMs);
    const edges = [startMs, ...[...cuts].filter((ms) => ms > startMs && ms <= endMs).sort((a, b) => a - b)];
    return edges.map((fromMs, index) => {
        const toMs = index + 1 < edges.length ? edges[index + 1] - 1 : endMs;
        return { fromMs, toMs, midMs: fromMs + Math.floor((toMs - fromMs) / 2) };
    });
}
