/*
 * WHERE THE CONTROL SITS (pure, so the iOS-specific arithmetic is unit-tested without a phone).
 *
 * position:fixed is relative to the LAYOUT viewport. On iOS the visual viewport (what the person actually sees) moves inside it: it is
 * panned down when the keyboard pushes a field into view, and it shrinks when the page is pinch-zoomed. A control pinned to the layout
 * viewport can therefore end up above the screen or tiny. The host box below is the visual viewport expressed in layout coordinates,
 * with a counter-scale so the control keeps its on-screen size.
 */
/** The box (layout coordinates) that the visible screen currently covers, and the scale that undoes pinch zoom for content inside it. */
export function hostBox(vv, inner) {
    const scale = vv && vv.scale > 0 ? vv.scale : 1;
    return {
        left: vv ? vv.ol : 0,
        top: vv ? vv.ot : 0,
        width: (vv ? vv.w : inner[0]) * scale,
        height: (vv ? vv.h : inner[1]) * scale,
        counterScale: 1 / scale,
    };
}
export const DOCK_SLOTS = 6;
/**
 * Slot 0 top centre (the gap between the application's own top-left and top-right controls), 1 top left, 2 top right, 3 bottom right,
 * 4 bottom left, 5 bottom centre; corner -1 means dragged to x,y (y measured below the safe-area top). Always clamped onto the screen.
 */
export function dockPosition(box, dockWidth, safeTop, state) {
    const gap = 6;
    const bottom = Math.max(gap, box.height - 112);
    const centre = (box.width - dockWidth) / 2;
    const right = box.width - dockWidth - gap;
    const slotX = [centre, gap, right, right, gap, centre];
    const slotY = [gap + safeTop, gap + safeTop, gap + safeTop, bottom, bottom, bottom];
    const free = state.corner < 0 || state.corner >= DOCK_SLOTS;
    const maxX = Math.max(0, box.width - dockWidth - 4);
    const maxY = Math.max(0, box.height - 44);
    return {
        x: Math.min(Math.max(free ? state.x : slotX[state.corner], 2), maxX),
        y: Math.min(Math.max(free ? state.y + safeTop : slotY[state.corner], 2), maxY),
    };
}
