/**
 * Visible gate-label coordinates, hidden routing docks, and gate-to-center
 * ownership - all in one place, on purpose: unlike V1 (which grew a
 * separate GATE_LABEL_OVERRIDES table after CENTER_GATE_LAYOUT), V2 starts
 * with the label and the dock as the exact same point for every gate. There
 * is no visual-crowding legacy to correct here, so introducing a second
 * override table now would only be speculative complexity; if/when
 * KNOW THYSELF restyling needs an independent label nudge later, add a
 * dedicated override table then, the same way V1's grew organically.
 *
 * Calibration pass 1: every X here carried the same 0.80 horizontal
 * scale-toward-centerline (x=350) correction described in geometry.ts's
 * module comment, measured against the real reference crop. Y values were
 * untouched in that pass. Pass-1 snapshot preserved at
 * scratch-v2-verification/pass-01-gates.ts.
 *
 * Calibration pass 2: every gate below was remapped mechanically from its
 * pass-1 position - each gate's fractional position within its OLD center
 * bounds (boundsOf() in geometry.ts) was computed, then that same fraction
 * was applied to the NEW pass-2 center bounds. This preserves each center's
 * internal gate-layout pattern (rows/columns/edge distribution) while
 * adapting it to the newly measured silhouette, rather than re-measuring 64
 * individual gate circles that are only ~6-10px wide in the 260x440
 * reference source - not reliably measurable at that scale. Pass-2 snapshot
 * preserved at scratch-v2-verification/pass-02-gates.ts.
 *
 * Calibration pass 3: same fractional remap onto pass-3's individually
 * measured center bounds, but with two additions that pass 2 did not need:
 *
 * 1. Shape-aware containment. Ajna changed shape family in pass 3 (5-vertex
 *    kite -> 3-vertex triangle, apex down), and every center changed size, so
 *    a pure bounding-box remap can land a dock outside its own silhouette -
 *    trivially true for a triangle, whose box corners are empty space. Each
 *    remapped dock is therefore tested against the real polygon (or rect) and,
 *    if it falls outside or within a small inset of the edge, pulled straight
 *    back toward that center's centroid until it clears. 19 of 64 gates needed
 *    this. The inset is tighter for Ego and the two lateral wedges, which are
 *    small and pointed enough that a full inset would shove their edge-docked
 *    gates inward far enough to collide with each other - the reference itself
 *    docks those particular gates close to the boundary.
 *
 * 2. Ego's four gates are measured directly, not remapped. Remapping collapsed
 *    gates 26 and 51 to 3.7 units apart (a visual collision), so their real
 *    positions were read off the reference crop and mapped through the same
 *    pass-3 transform instead - measurement beats remapping wherever
 *    measurement is reliable.
 *
 * Verified afterwards: no two gates within a center sit closer than ~14.5
 * units. The tightest remaining clusters (Throat's 35/12/45 right-edge stack,
 * Ego's 26/51) are genuinely that tight in the reference itself.
 *
 * Gate-to-center ownership and every Human Design meaning/activation rule are
 * untouched by all three passes - only screen coordinates move here. See
 * scratch-v2-verification/pass-03-derive-gates.mjs and
 * reference-measurements-pass-03.json.
 */
export const V2_CENTER_GATE_LAYOUT = {
    head: [
        { gate: 64, center: 'head', x: 313.1, y: 144.8 },
        { gate: 61, center: 'head', x: 350, y: 148.7 },
        { gate: 63, center: 'head', x: 386.9, y: 144.8 },
    ],
    ajna: [
        { gate: 47, center: 'ajna', x: 316.3, y: 206.1 },
        { gate: 24, center: 'ajna', x: 350, y: 201.7 },
        { gate: 4, center: 'ajna', x: 383.7, y: 206.1 },
        { gate: 17, center: 'ajna', x: 324.2, y: 221.1 },
        { gate: 11, center: 'ajna', x: 375.8, y: 221.1 },
        { gate: 43, center: 'ajna', x: 350, y: 270.7 },
    ],
    throat: [
        { gate: 62, center: 'throat', x: 320.8, y: 358.5 },
        { gate: 23, center: 'throat', x: 350.1, y: 358.5 },
        { gate: 56, center: 'throat', x: 379.2, y: 358.5 },
        { gate: 16, center: 'throat', x: 304.5, y: 391.1 },
        { gate: 35, center: 'throat', x: 395.5, y: 387 },
        { gate: 20, center: 'throat', x: 304.5, y: 413.1 },
        { gate: 12, center: 'throat', x: 395.5, y: 402.1 },
        { gate: 45, center: 'throat', x: 395.5, y: 417.2 },
        { gate: 31, center: 'throat', x: 320.8, y: 445.7 },
        { gate: 8, center: 'throat', x: 350.1, y: 445.7 },
        { gate: 33, center: 'throat', x: 379.2, y: 445.7 },
    ],
    g: [
        { gate: 1, center: 'g', x: 350, y: 495.9 },
        { gate: 7, center: 'g', x: 320.3, y: 524.1 },
        { gate: 13, center: 'g', x: 379.7, y: 524.1 },
        { gate: 10, center: 'g', x: 298.4, y: 555.2 },
        { gate: 25, center: 'g', x: 401.6, y: 555.2 },
        { gate: 15, center: 'g', x: 320.3, y: 586.2 },
        { gate: 46, center: 'g', x: 379.7, y: 586.2 },
        { gate: 2, center: 'g', x: 350, y: 614.4 },
    ],
    ego: [
        { gate: 26, center: 'ego', x: 457.3, y: 630.6 },
        { gate: 21, center: 'ego', x: 483.1, y: 601 },
        { gate: 51, center: 'ego', x: 465.5, y: 618.6 },
        { gate: 40, center: 'ego', x: 498.1, y: 645.9 },
    ],
    spleen: [
        { gate: 48, center: 'spleen', x: 102.1, y: 703.7 },
        { gate: 57, center: 'spleen', x: 123.8, y: 719.3 },
        { gate: 44, center: 'spleen', x: 145.4, y: 734.8 },
        { gate: 50, center: 'spleen', x: 185.1, y: 745.6 },
        { gate: 32, center: 'spleen', x: 145.4, y: 756.5 },
        { gate: 28, center: 'spleen', x: 123.8, y: 772 },
        { gate: 18, center: 'spleen', x: 102.1, y: 787.6 },
    ],
    solarPlexus: [
        { gate: 36, center: 'solarPlexus', x: 597.9, y: 703.7 },
        { gate: 22, center: 'solarPlexus', x: 576.2, y: 719.3 },
        { gate: 37, center: 'solarPlexus', x: 554.6, y: 734.8 },
        { gate: 6, center: 'solarPlexus', x: 514.9, y: 745.6 },
        { gate: 49, center: 'solarPlexus', x: 554.6, y: 756.5 },
        { gate: 55, center: 'solarPlexus', x: 576.2, y: 772 },
        { gate: 30, center: 'solarPlexus', x: 597.9, y: 787.6 },
    ],
    sacral: [
        { gate: 5, center: 'sacral', x: 314.4, y: 709.6 },
        { gate: 14, center: 'sacral', x: 350, y: 709.6 },
        { gate: 29, center: 'sacral', x: 385.7, y: 709.6 },
        { gate: 34, center: 'sacral', x: 302.8, y: 735.7 },
        { gate: 27, center: 'sacral', x: 302.8, y: 756.4 },
        { gate: 59, center: 'sacral', x: 397.3, y: 756.4 },
        { gate: 42, center: 'sacral', x: 314.4, y: 790 },
        { gate: 3, center: 'sacral', x: 350, y: 790 },
        { gate: 9, center: 'sacral', x: 385.7, y: 790 },
    ],
    root: [
        { gate: 53, center: 'root', x: 316.3, y: 853.5 },
        { gate: 60, center: 'root', x: 350.1, y: 853.5 },
        { gate: 52, center: 'root', x: 383.7, y: 853.5 },
        { gate: 54, center: 'root', x: 308, y: 880.4 },
        { gate: 38, center: 'root', x: 308, y: 902.3 },
        { gate: 58, center: 'root', x: 308, y: 924.2 },
        { gate: 39, center: 'root', x: 392, y: 880.4 },
        { gate: 19, center: 'root', x: 392, y: 902.3 },
        { gate: 41, center: 'root', x: 392, y: 924.2 },
    ],
};
export const V2_GATE_DOCKS = new Map(Object.values(V2_CENTER_GATE_LAYOUT).flat().map((dock) => [dock.gate, dock]));
export function v2GateDock(gate) {
    const dock = V2_GATE_DOCKS.get(gate);
    if (!dock)
        throw new Error(`Missing V2 BodyGraph dock for gate ${gate}.`);
    return dock;
}
