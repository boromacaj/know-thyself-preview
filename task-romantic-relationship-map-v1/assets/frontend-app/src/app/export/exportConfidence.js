/**
 * Documented confidence model (export spec section 26):
 *   0.90-1.00 strong calculated convergence
 *   0.75-0.89 strong functional parallel
 *   0.55-0.74 plausible symbolic resonance
 *   0.35-0.54 weak exploratory candidate
 *   below 0.35 not surfaced by default
 * Per-signal confidence reuses the existing app-wide ConfidenceBand vocabulary
 * (frontend-app/src/app/evidence/pillarEvidenceTypes.ts) mapped onto this same 0..1
 * scale, so every number stays traceable to a documented band rather than being an
 * arbitrary per-adapter guess.
 */
export function confidenceBandToNumber(band) {
    switch (band) {
        case 'high': return 0.95;
        case 'medium': return 0.65;
        case 'low': return 0.4;
        case 'suppressed': return 0;
        default: return 0.5;
    }
}
export function confidenceReasonForBand(band, note) {
    return `${note} (confidence band: ${band}).`;
}
