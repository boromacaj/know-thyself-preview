import { NUMEROLOGY_SONAR_TARGETS, numerologySonarRingCss } from './app/premium-earth/numerologySonarTargets.js?v=53c0693';
import { sonarAffordanceCss } from './app/premium-earth/sonarAffordance.js?v=53c0693';
/*
 * WHAT CAN BE TAPPED IN THE NUMEROLOGY HERO: THE KT SONAR EFFECT.
 *
 * CSS only, injected once, read by nothing else (no listener, no timer, no observer), exactly as baziAffordances.ts does for the BaZi hero. The four circles take turns
 * (numerologySonarTargets.ts); the effect itself is the project's standard one (sonarAffordance.ts) in the BaZi hero's sequenced grammar (heroSonarSequence.ts).
 */
const style = document.createElement('style');
style.dataset.numerologyAffordances = 'true';
style.textContent = `${sonarAffordanceCss(NUMEROLOGY_SONAR_TARGETS)}\n${numerologySonarRingCss()}`;
document.head.append(style);
