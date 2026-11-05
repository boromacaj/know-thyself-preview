import { BAZI_SONAR_TARGETS, baziSonarRingCss } from './app/premium-earth/baziSonarTargets.js';
import { sonarAffordanceCss } from './app/premium-earth/sonarAffordance.js';
/*
 * WHAT CAN BE TAPPED IN THE OPENED BAZI VIEW: THE KT SONAR EFFECT.
 *
 * CSS only, injected once, read by nothing else (no listener, no timer, no observer). The effect is the project's standard one (sonarAffordance.ts: 2.8 s
 * cycle, idle for 60% of it, a ring about 6 px beyond the control that grows and fades in the control's own colour, peak 0.42, a still faint outline under
 * reduced motion); this module only says which controls of the BaZi view wear it (baziSonarTargets.ts).
 */
const style = document.createElement('style');
style.dataset.baziAffordances = 'true';
style.textContent = `${sonarAffordanceCss(BAZI_SONAR_TARGETS)}\n${baziSonarRingCss()}`;
document.head.append(style);
