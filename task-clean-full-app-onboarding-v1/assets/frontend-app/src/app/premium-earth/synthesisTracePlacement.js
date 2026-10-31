import { SYN_BAR_HEIGHT, SYN_CENTRE, SYN_VIEW_TOP, SYN_VIEW_WIDTH, synSlotOffset } from './synthesisMenuGeometry.js?v=f9ab0a6';
import { buildTraces, traceLayoutFits } from './synthesisTraceGeometry.js?v=f9ab0a6';
import { SYN_STRIP_LAYERS, pulseKeyframesCss, stripGap, traceDash, traceGap } from './synthesisTraceStyle.js?v=f9ab0a6';
/*
 * WHERE THE CHIP TRACES STAND - THE PAGE MEASURED, THE TRACES PLACED.
 *
 * The four traces join the four little pillars of the Synthesis card to the four names above, and where those stand depends on the width of the phone: the names stand over the four
 * columns of the menu, the little pillars stand in the middle of the card at the card picture's own scale. So the traces are not drawn in a fixed box; this module measures the menu and
 * writes the numbers into the markup that synthesisTraceArt.ts drew with none:
 *
 *   - the four columns' middles (the pillars' cards), the four little pillars' middles and their top (from the card picture's own scale: its width over its 360 units), the foot of the
 *     pillars (the top of the bridge) and the top of the Synthesis card;
 *   - from them synthesisTraceGeometry.ts builds the four traces; their paths, the pads' places and the pulses' keyframes (synthesisTraceStyle.ts) are written; and only then is the
 *     overlay shown (data-placed). If the layout cannot hold them (the surface is hidden, nothing is laid out yet, the numbers do not make sense), they stay hidden.
 *
 * It runs again whenever the menu's size changes (one ResizeObserver on the core and on the card picture), whenever the menu is drawn again (a language change replaces the markup) or
 * shown (the surface's hidden and inert attributes). It holds two observers and no timer, no frame loop and no listener; the returned function removes them. When nothing it measures
 * has moved it writes nothing.
 */
export const SYNTHESIS_TRACE_PLACED_ATTRIBUTE = 'data-placed';
/** The inputs of the geometry, from the page's boxes. `null` where something is not laid out. Exported for the tests. */
export function measureTraceInput(surface) {
    const core = surface.querySelector('.kt-menu-core');
    const bridge = surface.querySelector('.kt-menu-bridge');
    const button = surface.querySelector('.kt-menu-synthesis');
    const art = surface.querySelector('.kt-syn-svg');
    const pillars = [...surface.querySelectorAll('.kt-menu-pillar')];
    if (!core || !bridge || !button || !art || pillars.length !== 4)
        return null;
    const coreBox = core.getBoundingClientRect();
    const bridgeBox = bridge.getBoundingClientRect();
    const buttonBox = button.getBoundingClientRect();
    const artBox = art.getBoundingClientRect();
    if (coreBox.width < 100 || bridgeBox.height < 20 || buttonBox.height < 20 || artBox.width < 100)
        return null;
    /* A transform on the surface (a card transition in progress) scales every box on screen but not the layout the traces live in: all of it is brought back to layout px by the
       core's own scale (its box over its layout width), so a measurement taken in the middle of a transition is the same as one taken at rest. */
    const layoutWidth = core.offsetWidth;
    if (!(layoutWidth > 0))
        return null;
    const k = coreBox.width / layoutWidth;
    if (!(k > 0.2))
        return null;
    const px = (value) => value / k;
    const scale = px(artBox.width) / SYN_VIEW_WIDTH;
    const boxes = pillars.map((pillar) => pillar.getBoundingClientRect());
    const input = {
        columns: boxes.map((box) => px(box.left + box.width / 2 - coreBox.left)),
        slots: [0, 1, 2, 3].map((index) => px(artBox.left - coreBox.left) + (SYN_CENTRE[0] + synSlotOffset(index)) * scale),
        pillarTop: px(artBox.top - bridgeBox.top) + (SYN_CENTRE[1] - SYN_BAR_HEIGHT / 2 - SYN_VIEW_TOP) * scale,
        cardTop: px(buttonBox.top - bridgeBox.top),
    };
    return { input, width: layoutWidth, top: px(bridgeBox.top - coreBox.top), height: input.pillarTop + 6 };
}
export function connectSynthesisTraces(surface) {
    let observer = null;
    let watched = [];
    let signature = '';
    const unplace = () => {
        const svg = surface.querySelector('.kt-menu-traces');
        if (svg?.hasAttribute(SYNTHESIS_TRACE_PLACED_ATTRIBUTE))
            svg.removeAttribute(SYNTHESIS_TRACE_PLACED_ATTRIBUTE);
        signature = '';
    };
    const place = () => {
        const svg = surface.querySelector('.kt-menu-traces');
        if (!(svg instanceof SVGElement))
            return;
        const measured = surface.hidden || surface.inert ? null : measureTraceInput(surface);
        if (measured === null || !traceLayoutFits(measured.input)) {
            unplace();
            return;
        }
        const round = (value) => +value.toFixed(1);
        const next = [...measured.input.columns, ...measured.input.slots, measured.input.pillarTop, measured.input.cardTop, measured.width, measured.top, measured.height].map(round).join(',');
        const current = svg.hasAttribute(SYNTHESIS_TRACE_PLACED_ATTRIBUTE);
        if (current && next === signature)
            return;
        signature = next;
        const traces = buildTraces(measured.input);
        svg.setAttribute('viewBox', `0 0 ${round(measured.width)} ${round(measured.height)}`);
        svg.setAttribute('width', String(round(measured.width)));
        svg.setAttribute('height', String(round(measured.height)));
        svg.style.top = `${round(measured.top)}px`;
        traces.forEach((trace, index) => {
            /* the trace's own line is DRAWN by the band: a dash longer than the path that starts where the band's head is (the keyframes move it) */
            for (const path of svg.querySelectorAll(`.kt-trace-${index} path`)) {
                path.setAttribute('d', trace.d);
                path.setAttribute('stroke-dasharray', `${traceDash(trace.length)} ${traceGap(trace.length)}`);
            }
            /* the band: the same path, drawn again in layers, each a dash of its own length with a gap longer than the path (the keyframes move it) */
            for (const layer of SYN_STRIP_LAYERS) {
                const band = svg.querySelector(`.kt-trace-run-${index} .kt-trace-run-${layer.id}`);
                band?.setAttribute('d', trace.d);
                band?.setAttribute('stroke-dasharray', `${layer.length} ${stripGap(trace.length)}`);
            }
            for (const circle of svg.querySelectorAll(`.kt-trace-padgroup-${index} circle`)) {
                circle.setAttribute('cx', String(round(trace.pad[0])));
                circle.setAttribute('cy', String(round(trace.pad[1])));
            }
        });
        const style = svg.querySelector('.kt-trace-pulse-css');
        if (style)
            style.textContent = pulseKeyframesCss(traces);
        svg.setAttribute(SYNTHESIS_TRACE_PLACED_ATTRIBUTE, 'true');
    };
    /** The boxes whose size decides where the traces stand: the core and the card's picture (new elements after every redraw). */
    const watch = () => {
        const next = ['.kt-menu-core', '.kt-syn-svg'].map((selector) => surface.querySelector(selector)).filter((element) => element !== null);
        if (next.length === watched.length && next.every((element, index) => element === watched[index]))
            return;
        if (observer !== null)
            for (const element of watched)
                observer.unobserve(element);
        watched = next;
        if (observer !== null)
            for (const element of next)
                observer.observe(element);
    };
    if (typeof ResizeObserver !== 'undefined')
        observer = new ResizeObserver(() => { place(); });
    const mutations = typeof MutationObserver !== 'undefined'
        ? new MutationObserver((records) => {
            if (records.some((record) => record.type === 'childList'))
                watch();
            place();
        })
        : null;
    mutations?.observe(surface, { childList: true, attributes: true, attributeFilter: ['hidden', 'inert'] });
    watch();
    place();
    return () => {
        observer?.disconnect();
        mutations?.disconnect();
        unplace();
    };
}
