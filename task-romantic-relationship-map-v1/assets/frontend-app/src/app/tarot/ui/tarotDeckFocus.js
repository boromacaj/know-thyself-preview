/**
 * THE DECK'S FOCUS MODEL: ONE RULE, PURE, AND THE ONLY ONE.
 *
 * The card in focus is THE SELECTABLE CARD WHOSE PLACE IS CLOSEST TO THE GEOMETRIC FOCUS POINT - and the focus point is where the deck's scroll position
 * says it is, so there is exactly one source of truth: `scrollLeft / spacing` (a fractional place). Nothing else decides it: not a lagging animation index,
 * not the previous focus (except to break an exact tie), not a timer. The picker (tarotCardPicker.ts) calls `closestSelectable` for every scroll position
 * it sees, and the stylesheet draws the protruding card from the same cells (`focusCells`), so what is drawn and what is chosen cannot disagree.
 *
 * A place that cannot be chosen (a card already taken, the card that jumped out) is skipped: while the focus point is over such a place, the nearest
 * selectable one is in focus, and the settle (when the movement stops) brings THAT card to the focus point.
 */
/**
 * The selectable place nearest to the fractional place `at`. An exact tie goes to the HIGHER place - always, the same rule as the cells (`focusCells`: a cell is
 * half-open, its start inclusive and its end exclusive, which is also how a scroll-linked animation's range behaves), so the model and the stylesheet agree even at the
 * one scroll position where two cards are equally near. (`prefer` lets a caller that wants hysteresis keep the card that was in focus on a tie; the picker does not.)
 * No selectable place: the nearest place.
 */
export function closestSelectable(selectable, at, prefer = -1) {
    const count = selectable.length;
    if (count === 0)
        return 0;
    const point = Math.min(count - 1, Math.max(0, at));
    const base = Math.floor(point);
    let below = -1;
    let above = -1;
    for (let index = base; index >= 0; index -= 1)
        if (selectable[index]) {
            below = index;
            break;
        }
    for (let index = Math.ceil(point); index < count; index += 1)
        if (selectable[index]) {
            above = index;
            break;
        }
    if (below < 0 && above < 0)
        return Math.min(count - 1, Math.max(0, Math.round(point)));
    if (below < 0)
        return above;
    if (above < 0)
        return below;
    const toBelow = point - below;
    const toAbove = above - point;
    if (Math.abs(toBelow - toAbove) < 1e-9)
        return prefer === below ? below : above;
    return toBelow < toAbove ? below : above;
}
/**
 * The cell of each place: the stretch of the focus point (in places) over which that place is the one in focus. For a selectable place it runs from the middle
 * between it and the previous selectable place to the middle between it and the next; the first begins one place before the start of the deck (so the very first
 * position of the scroll is inside it) and the last ends one place past the end. A place that cannot be chosen has no cell (null). The cells tile the whole deck without a gap or an overlap.
 */
export function focusCells(selectable) {
    const count = selectable.length;
    const chosen = selectable.map((ok, index) => (ok ? index : -1)).filter((index) => index >= 0);
    const cells = selectable.map(() => null);
    chosen.forEach((index, order) => {
        const previous = order > 0 ? chosen[order - 1] : null;
        const next = order < chosen.length - 1 ? chosen[order + 1] : null;
        cells[index] = {
            from: previous === null ? -1 : (previous + index) / 2,
            to: next === null ? count + 1 : (index + next) / 2,
        };
    });
    return cells;
}
