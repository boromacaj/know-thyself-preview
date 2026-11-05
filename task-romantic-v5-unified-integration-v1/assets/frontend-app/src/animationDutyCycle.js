import { startAnimationDutyCycle } from './app/performance/animationDutyCycle.js?v=d9a1a90';
/*
 * LOOPING ARTWORK RESTS BETWEEN ITS STROKES. One line of wiring: the reasoning is in app/performance/animationDutyCycle.ts. The storage key `kt-anim-duty` set to `off` turns it off for a
 * comparison on a device (the page is reloaded to apply it); `kt-anim-flatten` set to `off` turns off the move of single-paint opacity animations (paintOpacity.ts) the same way. Nothing else reads or writes them.
 */
let off = false;
let flatten = true;
try {
    off = window.localStorage.getItem('kt-anim-duty') === 'off';
    flatten = window.localStorage.getItem('kt-anim-flatten') !== 'off';
}
catch {
    off = false;
}
if (typeof document !== 'undefined' && !off)
    window.__ktDutyCycle = startAnimationDutyCycle(document, { flatten });
