import { clampIndex, sampleCount } from './forecastChartData.js';
import { valueText } from './forecastGraphCopy.js';
import { indexAtClient, renderPointRow, renderSelectionLayer, } from './forecastGraphRender.js';
export function attachForecastGraph(surface, host) {
    let scrubbing = null;
    const indexFor = (event, plot, view) => {
        const svg = plot.querySelector('svg');
        if (!svg)
            return null;
        const rect = svg.getBoundingClientRect();
        if (rect.width <= 0)
            return null;
        return indexAtClient(event.clientX, rect.left, rect.width, sampleCount(view.set), view.box);
    };
    /** Repaint only what depends on the picked sample. */
    const patch = (plot, view, index) => {
        const selection = { ...view.selection, index };
        const layer = plot.querySelector('[data-fg-selection]');
        if (layer)
            layer.innerHTML = renderSelectionLayer(view.set, selection, view.box);
        plot.setAttribute('aria-valuenow', String(index + 1));
        plot.setAttribute('aria-valuetext', valueText(view.set, selection.focus, index, selection.mode === 'combined'));
        const row = surface.querySelector('[data-fg-point]');
        if (row)
            row.outerHTML = renderPointRow(view.set, selection);
    };
    surface.addEventListener('pointerdown', (event) => {
        const target = event.target;
        if (!(target instanceof Element))
            return;
        const plot = target.closest('[data-fg-plot]');
        const view = plot ? host.current() : null;
        if (!plot || !view)
            return;
        const index = indexFor(event, plot, view);
        if (index === null)
            return;
        scrubbing = { pointerId: event.pointerId, last: index };
        try {
            plot.setPointerCapture(event.pointerId);
        }
        catch { /* a synthetic pointer cannot be captured */ }
        host.select(index);
        patch(plot, view, index);
    });
    surface.addEventListener('pointermove', (event) => {
        if (!scrubbing || event.pointerId !== scrubbing.pointerId)
            return;
        const plot = surface.querySelector('[data-fg-plot]');
        const view = host.current();
        if (!plot || !view)
            return;
        const index = indexFor(event, plot, view);
        if (index === null || index === scrubbing.last)
            return;
        scrubbing.last = index;
        host.select(index);
        patch(plot, view, index);
    });
    const release = (event) => {
        if (!scrubbing || event.pointerId !== scrubbing.pointerId)
            return;
        scrubbing = null;
        host.commit();
    };
    surface.addEventListener('pointerup', release);
    surface.addEventListener('pointercancel', release);
    surface.addEventListener('keydown', (event) => {
        const target = event.target;
        if (!(target instanceof Element))
            return;
        const plot = target.closest('[data-fg-plot]');
        if (!plot || !['ArrowLeft', 'ArrowRight', 'Home', 'End', 'ArrowUp', 'ArrowDown'].includes(event.key))
            return;
        const view = host.current();
        if (!view)
            return;
        event.preventDefault();
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            host.stepTheme(event.key === 'ArrowUp' ? -1 : 1);
        }
        else {
            const last = sampleCount(view.set) - 1;
            const next = event.key === 'Home' ? 0 : event.key === 'End' ? last
                : clampIndex(view.set, view.selection.index + (event.key === 'ArrowLeft' ? -1 : 1));
            host.select(Math.min(last, Math.max(0, next)));
            host.commit();
        }
        /* The surface is re-rendered, so the element the key arrived at is gone: put focus back on the new plot. */
        surface.querySelector('[data-fg-plot]')?.focus({ preventScroll: true });
    });
}
