import { HD_CENTRE, HD_RADIUS, HD_WINDOWS, HD_CHANNEL_GLOW_WIDTH, HD_CHANNEL_WIDTH, HD_SHAPE_GLOW_WIDTH, HD_SHAPE_WIDTH, HD_VIEW_BOX, } from './humanDesignMenuGeometry.js?v=b5ef5ed';
/*
 * THE HUMAN DESIGN CARD'S ART - THE MARKUP. Geometry: humanDesignMenuGeometry.ts. The clock: humanDesignMenuTimeline.ts. Light and motion: humanDesignMenuStyle.ts.
 *
 * One SVG, drawn back to front:
 *
 *   the ring     kt-hd-ring       a faint disc, a light under its outline, a flare (while a centre's channels grow) and the outline - the window
 *   nine windows kt-hd-win-<i>    for each centre (0 Head ... 8 Root), in the order the card shows them: its channels (kt-hd-ch-<i>, each a light and a line), the matte fill of its silhouette
 *                                 (kt-hd-tint-<i>) and the silhouette's outline (kt-hd-sh-<i>, a light and a line). Every drawn line is a path of pathLength 1, which the stylesheet draws and takes
 *                                 back by its dash offset. The paths are already in window units: the silhouette's centroid is the middle of the window, the channels end at its edge.
 *
 * With no animation at all (less motion) the base values are the finished picture: the G centre and its channels.
 *
 * Decoration: hidden from assistive technology; the pillar's own name is the control's.
 */
const [CX, CY] = HD_CENTRE;
const STROKE = 'fill="none" stroke-linecap="round" stroke-linejoin="round" pathLength="1"';
const ring = () => `<g class="kt-hd-ring"><circle class="kt-hd-tint-disc" cx="${CX}" cy="${CY}" r="${HD_RADIUS}"/>`
    + `<circle class="kt-hd-ring-glow" cx="${CX}" cy="${CY}" r="${HD_RADIUS}"/><circle class="kt-hd-flare" cx="${CX}" cy="${CY}" r="${HD_RADIUS}"/>`
    + `<circle class="kt-hd-ring-line" cx="${CX}" cy="${CY}" r="${HD_RADIUS}"/></g>`;
function windowOf(index) {
    const centre = HD_WINDOWS[index];
    const channels = centre.channels.map((channel) => `<path class="kt-hd-glow kt-hd-ch-${index}" ${STROKE} stroke-width="${HD_CHANNEL_GLOW_WIDTH}" d="${channel.path}"/>`
        + `<path class="kt-hd-line kt-hd-ch-${index}" ${STROKE} stroke-width="${HD_CHANNEL_WIDTH}" d="${channel.path}"/>`).join('');
    const shape = `<path class="kt-hd-tint kt-hd-tint-${index}" d="${centre.shape}"/>`
        + `<path class="kt-hd-shape-glow kt-hd-sh-${index}" ${STROKE} stroke-width="${HD_SHAPE_GLOW_WIDTH}" d="${centre.shape}"/>`
        + `<path class="kt-hd-shape-line kt-hd-sh-${index}" ${STROKE} stroke-width="${HD_SHAPE_WIDTH}" d="${centre.shape}"/>`;
    return `<g class="kt-hd-win kt-hd-win-${index}">${channels}${shape}</g>`;
}
export function humanDesignMenuArt() {
    const windows = HD_WINDOWS.map((_, index) => windowOf(index)).join('');
    return `<svg class="kt-hd-svg" viewBox="${HD_VIEW_BOX}" fill="none" aria-hidden="true" focusable="false">${ring()}${windows}</svg>`;
}
