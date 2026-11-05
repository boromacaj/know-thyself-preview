/*
 * WHERE THE MAIN MENU'S FOUR TOP CARDS ARE, FOR THE SUN'S LANE.
 *
 * The Sun is a point of the sky the camera orbits (ambientSun.ts), so its height on the screen is whatever the sky and the framing make of it: over the Main Menu it came in high, in the
 * header band above the cards (the first seconds after the scene arrives: about 40 px against cards that begin at 80), settled lower, and on a short screen ran along the cards' top edge.
 * The owner asked for the Sun to cross the UPPER FIFTH of the four top cards - about 15 to 25 % down from their top edge - so it is seen going across the row, not over it.
 *
 * The menu is the one that knows where its cards are (menuFit.ts measures them: they depend on the screen's width, its height and the fit), and the ambient layer cannot see the menu, so
 * the menu says it here, and the globe reads it. No imports: the interface layer writes this file and must not pull the renderer in with it. Pure data plus two functions.
 */
/** Where in the cards' height the Sun's lane lies (the owner's brief: about 15-25 % down from their top edges), and the limits it is checked against. */
export const SUN_LANE = Object.freeze({ share: 0.2, from: 0.15, to: 0.25 });
let row = null;
const listeners = new Set();
/** The globe asks to be told when the row changes, so it reads the page's geometry then and never in a frame. Returns the way out. */
export function onMenuCardRow(listener) {
    listeners.add(listener);
    return () => { listeners.delete(listener); };
}
/** The menu says where its cards are, or null when it is not on screen. */
export function setMenuCardRow(next) {
    row = next && Number.isFinite(next.top) && Number.isFinite(next.height) && next.height > 8 ? { top: next.top, height: next.height } : null;
    for (const listener of listeners) {
        try {
            listener();
        }
        catch { /* a listener's failure is not the menu's */ }
    }
}
export function getMenuCardRow() {
    return row;
}
/** The lane's height on the screen, CSS px from the top of the viewport. */
export function sunLaneY(card, share = SUN_LANE.share) {
    return card.top + share * card.height;
}
