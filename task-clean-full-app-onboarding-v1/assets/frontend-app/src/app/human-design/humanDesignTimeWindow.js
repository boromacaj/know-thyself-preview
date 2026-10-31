import { APPROXIMATE_WINDOW_MINUTES, birthTimeWindow } from '../uncertainty/birthTimeWindow.js?v=f9ab0a6';
import { envelopeOver } from './humanDesignEnvelope.js?v=f9ab0a6';
/**
 * HOW MUCH AN ESTIMATED BIRTH TIME ACTUALLY COSTS THIS CHART.
 *
 * A reading built on an estimate has to say so. The question is what to say,
 * and the honest answer is not the same for every chart: an hour either way
 * changes nothing in some charts and changes the Type in others. Saying "this
 * might all be wrong" to the first reader is as useless as saying nothing to
 * the second.
 *
 * So this measures it, now with the product's shared machinery: the estimate's
 * window (uncertainty/birthTimeWindow.ts: two hours either side, inside the
 * birth date) scanned by the Human Design envelope (humanDesignEnvelope.ts),
 * which certifies every activation's gate and line across the window instead
 * of sampling it every fifteen minutes. What comes back is not a warning; it is
 * the list of reading mechanics that move somewhere in the window, and an empty
 * list is a real and useful answer.
 *
 * THIS IS NOT A NEW CALCULATION. Every chart in the scan is the ordinary engine
 * at a different moment, and none of them is shown as the chart. The chart
 * stays the one built from the time the reader supplied.
 *
 * THE ONLY OFFICIAL PRECEDENT for handling uncertain time is a scan of this
 * shape - Maia Mechanics' Birth Time Reliability Score, which reports over
 * Type, Authority, Definition, Profile, Channels and Centres
 * (docs/research/HUMAN_DESIGN_OUTPUT_BENCHMARK.md §2.2).
 */
const ORDER = ['type', 'authority', 'profile', 'definition', 'channels'];
/** The estimate's window summary, from an envelope already scanned over it. */
export function humanDesignWindowFromEnvelope(envelope) {
    const moved = new Set();
    if (!envelope.type.stable)
        moved.add('type');
    if (!envelope.authority.stable)
        moved.add('authority');
    if (!envelope.profile.stable)
        moved.add('profile');
    if (!envelope.definition.stable)
        moved.add('definition');
    if (envelope.channels.sometimes.length > 0)
        moved.add('channels');
    return { hours: APPROXIMATE_WINDOW_MINUTES / 60, changes: ORDER.filter((key) => moved.has(key)) };
}
/**
 * The window around an estimated time, or null when there is nothing to scan -
 * a blocked chart, or a moment without a UTC instant. A moment the timezone
 * layer placed on its local day gets the shared window (clamped to the birth
 * date); a bare UTC instant gets two hours either side of it.
 */
export function scanHumanDesignTimeWindow(moment, base) {
    if (moment.status !== 'ready' || !moment.utcDateTime || base.status !== 'calculated')
        return null;
    const centre = Date.parse(moment.utcDateTime);
    if (!Number.isFinite(centre))
        return null;
    const shared = moment.timeZone && moment.localDate ? birthTimeWindow(moment, 'approximate') : null;
    const half = APPROXIMATE_WINDOW_MINUTES * 60_000;
    const window = shared ?? {
        precision: 'approximate', timeZone: 'UTC', localDate: '', referenceMs: centre,
        startMs: centre - half, endMs: centre + half, source: 'estimate-window',
    };
    const envelope = envelopeOver(moment, window);
    return envelope ? humanDesignWindowFromEnvelope(envelope) : null;
}
