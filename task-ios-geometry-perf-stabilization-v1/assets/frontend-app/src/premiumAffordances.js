import { astrologyWheelBackingCss } from './app/premium-earth/astrologyWheelBacking.js?v=d9f39e7';
import { capsuleFloatCss } from './app/premium-earth/capsuleFloat.js?v=d9f39e7';
import { WESTERN_ASTROLOGY_FLOAT_TARGETS, WESTERN_ASTROLOGY_SONAR_TARGETS } from './app/premium-earth/astrologySonarTargets.js?v=d9f39e7';
import { sonarAffordanceCss } from './app/premium-earth/sonarAffordance.js?v=d9f39e7';
/*
 * THE OPENED WESTERN ASTROLOGY VIEW: WHAT CAN BE TAPPED, AND THE GLASS UNDER THE WHEEL.
 *
 * Three refinements, all CSS, injected once and read by nothing else (no listener, no timer, no observer):
 *
 *   1. The sonar affordance (app/premium-earth/sonarAffordance.ts) on the controls of the opened Western Astrology view that really are controls:
 *        - the three Big Three capsules of the hero (Sun, Moon, Ascendant), only while the hero holds its pose and the labels take touch
 *          (`[data-ah-live]`), one after another a few tenths of a second apart; they are inert, hidden and silent once the reading covers them;
 *        - the small "i" controls that open an explanation: those on the facts cards ring together, those beside the section headings ring half a
 *          period later, so the screen never rings all at once.
 *      The planets on the natal wheel are NOT controls and are not given the affordance: a ring on something that does nothing would be a lie.
 *      The two disclosure rows (Go deeper, Technical details) are full-width rows with their own plus sign and are left as they are.
 *   2. The capsule float (app/premium-earth/capsuleFloat.ts): the three capsules drift about 2.4 px over 5.2 s, each at its own phase.
 *   3. The frosted backing under the natal wheel (app/premium-earth/astrologyWheelBacking.ts).
 *
 * Adopting the sonar on another pillar's opened view is one entry in a targets list (see astrologySonarTargets.ts) added to the call below (or the class `kt-sonar` on a positioned control).
 */
const style = document.createElement('style');
style.dataset.premiumAffordances = 'true';
style.textContent = `${sonarAffordanceCss(WESTERN_ASTROLOGY_SONAR_TARGETS)}\n${capsuleFloatCss(WESTERN_ASTROLOGY_FLOAT_TARGETS)}\n${astrologyWheelBackingCss()}`;
document.head.append(style);
