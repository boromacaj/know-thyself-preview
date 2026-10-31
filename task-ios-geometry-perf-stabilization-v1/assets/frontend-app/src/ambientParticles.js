import { installInteractionEmitter } from './app/ambient-particles/impulseEvents.js?v=d9f39e7';
import { mountParticleLayer } from './app/ambient-particles/particleLayer.js?v=d9f39e7';
import { INTENSITIES } from './app/ambient-particles/particleModel.js?v=d9f39e7';
/*
 * THE GLOBAL FOREGROUND PARTICLE LAYER - MOUNT POINT
 * ---------------------------------------------------
 * The one place the layer is created. Every module in the application shares this one surface; none mounts its own. The layer is on
 * by default (it is decorative, sparse, and has its own constrained and reduced-motion profiles). See
 * docs/architecture/AMBIENT_PARTICLES.md for the contract.
 *
 * QA-ONLY ADDRESS PARAMETERS. Not product settings; remove before a public release together with this block:
 *   ?particles=on | off | full | constrained   on = the default behaviour (the device decides full or constrained); off = the layer
 *                                          is never created: no canvas, no loop, no listeners, no sprites; full / constrained force a profile
 *   ?particleImpulse=micro | nav | major   fire that impulse a moment after load and every four seconds, so a review needs no tapping
 *   ?particleSeed=123                      a different, reproducible field
 *   ?particleMotion=on                     ignore the prefers-reduced-motion setting, to review the full effect on a phone that has
 *                                          it on (Android's "remove animations"), where the layer is otherwise nearly still
 *   ?particleDiag=loop | sim | static      PERFORMANCE DIAGNOSTIC: run only the loop / the loop and the simulation / draw then freeze (see
 *                                          ParticleLayerOptions.diagnostic). Not for review of the effect.
 *   ?particleMeasure=1                     time each frame's update and draw (adds two clock reads a frame; off otherwise, so an
 *                                          on/off performance comparison measures the layer exactly as it ships)
 * With any of them present, the layer's handle is published as window.ktAmbientParticles for inspection.
 */
const params = new URLSearchParams(window.location.search);
const requestedMode = params.get('particles');
const mode = requestedMode === 'off' || requestedMode === 'full' || requestedMode === 'constrained' ? requestedMode : 'auto';
const requestedImpulse = params.get('particleImpulse');
const forcedImpulse = INTENSITIES.includes(requestedImpulse) ? requestedImpulse : null;
const seedParameter = params.get('particleSeed');
const seed = seedParameter !== null && Number.isFinite(Number(seedParameter)) ? Number(seedParameter) : undefined;
const ignoreReducedMotion = params.get('particleMotion') === 'on';
const measure = params.get('particleMeasure') === '1';
const requestedDiagnostic = params.get('particleDiag');
const diagnostic = requestedDiagnostic === 'loop' || requestedDiagnostic === 'sim' || requestedDiagnostic === 'static' ? requestedDiagnostic : undefined;
const qa = requestedMode !== null || requestedImpulse !== null || seedParameter !== null || ignoreReducedMotion || measure || diagnostic !== undefined;
const layer = mountParticleLayer({ window, document }, { mode, seed, forcedImpulse, measure, ignoreReducedMotion, diagnostic });
if (layer) {
    const removeEmitter = installInteractionEmitter(document);
    if (qa)
        window.ktAmbientParticles = layer;
    window.addEventListener('pagehide', () => {
        removeEmitter();
        layer.destroy();
    }, { once: true });
}
