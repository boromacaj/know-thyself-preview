import { installMenuTapSonar } from './app/premium-earth/menuTapSonar.js?v=f9ab0a6';
/*
 * THE MAIN MENU'S CARDS ANSWER A TAP WITH A SONAR IMPULSE. One line of wiring: the listener and its reasons are in app/premium-earth/menuTapSonar.ts.
 *
 * This is the FIRST import of vesselOrbit.ts, and that is the point: the listener holds a real tap on a card back for a beat so the impulse is seen, and it can only do that if it comes before the
 * window click listeners that open the destinations (premiumPillarExperience, the forecast, Tarot). It stops nothing else: a click that is not on a card of the menu is never touched.
 */
if (typeof window !== 'undefined')
    installMenuTapSonar(window);
