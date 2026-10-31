/*
 * The iOS visual viewport can be shorter than the layout viewport when a
 * keyboard opens. Android's resizes-content mode usually shrinks both instead.
 * A fixed control needs only the portion of the layout viewport hidden below
 * the visual viewport, plus its ordinary breathing room.
 *
 * This helper stays DOM-free so both viewport modes can be tested without
 * approximating Safari's keyboard in a desktop browser.
 */
export function keyboardDockBottomOffset(layoutHeight, visualHeight, visualTop, gap) {
    if (![layoutHeight, visualHeight, visualTop, gap].every(Number.isFinite)) {
        return Math.max(0, Number.isFinite(gap) ? gap : 0);
    }
    return Math.max(0, Math.round(layoutHeight - (visualTop + visualHeight)))
        + Math.max(0, gap);
}
