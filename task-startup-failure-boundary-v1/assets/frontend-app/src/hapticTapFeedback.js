import { installTapFeedback } from './app/haptics/tapFeedback.js?v=2ea79e9';
/*
 * EVERY TAP IS FELT. One line of wiring: the listener, its rules and its reasons are in app/haptics/tapFeedback.ts. It is a quiet no-op where the browser has no vibration, and it obeys the
 * On / Off choice of Settings -> Haptics (hapticsControl.ts).
 */
if (typeof document !== 'undefined')
    installTapFeedback(document);
