import { installTapFeedback } from './app/haptics/tapFeedback.js?v=d9a1a90';
import { installSonarHaptics } from './app/haptics/sonarHaptics.js?v=d9a1a90';
import { installSonarSequence } from './app/premium-earth/sonarSequence.js?v=d9a1a90';
/*
 * EVERY TAP IS FELT. One line of wiring: the listener, its rules and its reasons are in app/haptics/tapFeedback.ts. It is a quiet no-op where the browser has no vibration, and it obeys the
 * On / Off choice of Settings -> Haptics (hapticsControl.ts). A sonar ring is felt too, the moment it leaves its control (app/haptics/sonarHaptics.ts).
 */
if (typeof document !== 'undefined') {
    installTapFeedback(document);
    installSonarHaptics(document);
    installSonarSequence(document);
}
