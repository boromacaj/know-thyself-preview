import { SYN_STRIP_LAYERS } from './synthesisTraceStyle.js';
import { SYN_TRACE_PAD_RADIUS } from './synthesisTraceGeometry.js';
/*
 * THE CHIP TRACES' MARKUP. Geometry: synthesisTraceGeometry.ts. Light and motion: synthesisTraceStyle.ts. Where they stand: synthesisTracePlacement.ts, which measures the page, writes the
 * paths and the pads' places into this markup and the pulses' keyframes into its <style>, and only then shows it (data-placed).
 *
 * One SVG over the core of the menu, with the numbers still empty:
 *
 *   traces   kt-trace-0..3        a glow stroke and a line (the path, little pillar -> pad)
 *   pads     kt-trace-padgroup-0..3  a tint, a glow and a line (the small round pad under a name)
 *   bands    kt-trace-run-0..3    the light that runs along a trace: the trace's own path drawn again in four layers (glow, tail, body, head: kt-trace-run-glow ...) that share one
 *                                 head - a continuous strip, as a loading bar is - each a dash moved along the path
 *   style    kt-trace-pulse-css   the keyframes of the bands for the measured layout
 *
 * Decoration: hidden from assistive technology, no input.
 */
const range = (count) => Array.from({ length: count }, (_, index) => index);
const trace = (index) => `<g class="kt-trace kt-trace-${index}"><path class="kt-trace-glow" d=""/><path class="kt-trace-line" d=""/></g>`;
const pad = (index) => `<g class="kt-trace-padgroup kt-trace-padgroup-${index}">`
    + `<circle class="kt-trace-pad-tint" r="${SYN_TRACE_PAD_RADIUS}"/><circle class="kt-trace-pad-glow" r="${SYN_TRACE_PAD_RADIUS}"/><circle class="kt-trace-pad-line" r="${SYN_TRACE_PAD_RADIUS}"/></g>`;
const run = (index) => `<g class="kt-trace-run kt-trace-run-${index}">${SYN_STRIP_LAYERS.map((layer) => `<path class="kt-trace-run-${layer.id}" d=""/>`).join('')}</g>`;
export function synthesisTraceArt() {
    return '<svg class="kt-menu-traces" fill="none" aria-hidden="true" focusable="false">'
        + range(4).map(trace).join('')
        + range(4).map(pad).join('')
        + range(4).map(run).join('')
        + '<style class="kt-trace-pulse-css"></style></svg>';
}
