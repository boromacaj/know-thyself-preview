import { cardTransitionActive } from './onboardingCardTransition.js?v=2ea79e9';
import { stopForDestinationSlug } from './app/premium-earth/premiumPillarScreens.js?v=2ea79e9';
import { readPremiumProfileBridge } from './app/premium-earth/premiumProfileBridge.js?v=2ea79e9';
import { destinationFromHash, readStoredProfile, } from './app/premium-earth/profilePersistence.js?v=2ea79e9';
/*
 * COMING BACK.
 *
 * WHAT THIS FIXES. The profile lived in module memory, so a refresh - or a
 * phone discarding the tab, or a link to `#/bazi` - dropped the reader back at
 * the incarnation veil with everything gone. Six destinations had URLs that
 * could not be opened.
 *
 * WHAT IT DOES, AND WHAT IT REFUSES TO DO.
 * It replays the ordinary path, in the ordinary order, through the ordinary
 * doors:
 *
 *   1. end the intro          - the same call a QA preset makes
 *   2. restoreProfile(stored) - the overview's own restore, the same one a
 *                               preset uses, which fills the real inputs and
 *                               the real place bridge and then reads the
 *                               committed profile back out of them
 *   3. openHubFromCommitted() - the same compute-and-open the final onboarding
 *                               action performs
 *   4. tap the destination    - a real click on the real nav control
 *
 * Not one of those steps is a copy of anything. There is no second restore
 * pipeline, no second compute, and no second way to open a destination: a
 * restored session and a freshly typed one converge on the same committed
 * profile, by the same route, and are indistinguishable afterwards.
 *
 * WHY THE LAST STEP IS A CLICK. The forecast is owned by a different module and
 * opens on its own event; the portrait and the four pillars open through the
 * pillar controller. Reaching into either would mean this module knowing how
 * each destination is built, which is exactly the kind of parallel knowledge
 * that goes stale. The nav strip already routes all six correctly, so the
 * cheapest correct thing is to press the button the reader would have pressed.
 *
 * IT NEVER SHOWS A BROKEN READING. Every step can decline - no bridge yet, no
 * place bridge, a profile the engine reports as blocked - and every decline
 * ends the same way: nothing is opened and the onboarding runs untouched, which
 * is precisely the behaviour before any of this existed.
 */
/** The intro is a chain of timers; left running it paints over the restore. */
const finishIntro = () => {
    window
        .knowThyselfFinishIntroNow?.();
};
const openPortrait = () => (window
    .knowThyselfOpenHubFromCommitted?.() ?? false);
/**
 * Waits for the portrait's own card transition to finish before the next tap.
 *
 * Two overlapping transitions supersede each other, and the second one would be
 * the destination the reader actually asked for. Bounded rather than open-ended
 * so a transition that never reports done cannot leave the reader waiting: the
 * cap is generous next to the 2s card fade, and reaching it simply means the
 * tap happens anyway.
 */
async function afterTransition() {
    const deadline = Date.now() + 6000;
    /* One frame first: the transition has not set its flag yet at the moment the
       call that starts it returns. */
    await new Promise((resolve) => { window.requestAnimationFrame(() => resolve()); });
    while (cardTransitionActive() && Date.now() < deadline) {
        await new Promise((resolve) => { window.setTimeout(resolve, 60); });
    }
}
/*
 * The strip labels each control with the STOP id, not the URL slug, so the two
 * are translated through the destination table rather than through a second
 * mapping written here - which would be the drift this whole file avoids.
 */
function tapDestination(slug) {
    const stop = stopForDestinationSlug(slug);
    if (!stop)
        return false;
    if (stop === 'menu')
        return true;
    const menuItem = stop === 'cross-pillar-synthesis' ? 'synthesis' : stop;
    const control = document.querySelector(`#menu-view [data-menu-item="${CSS.escape(menuItem)}"]`);
    if (!control || control.hasAttribute('disabled'))
        return false;
    control.click();
    return true;
}
async function restoreSession() {
    /*
     * THE URL ASKS FIRST, AND IT ASKS BEFORE ANYTHING ELSE IS TOUCHED.
     *
     * This used to begin at `readStoredProfile()`, which made the mere EXISTENCE
     * of a saved profile enough to restore - and the destination then fell back
     * to the stored one, and then to the portrait. So opening the root on a
     * device that had ever completed onboarding ended the intro and opened the
     * Portrait: no tunnel, no Earth, no onboarding, for anyone who had used the
     * product before. The front door was unreachable.
     *
     * A hash is a request; a stored profile is not. `/` is someone arriving, and
     * arriving means the intro. `#/bazi` is someone returning to a reading -
     * refreshing it, or following a link - and that is the only thing that
     * restores. The stored destination is still written and still kept; it is
     * what a deliberate "Continue profile" control would read, and until that
     * control exists nothing consults it at startup.
     *
     * The order matters as much as the condition. `finishIntro()` is destructive:
     * it cancels the opening sequence and cannot be undone, so every reason to
     * decline has to be found BEFORE it is called.
     */
    /* The root is the front door: a plain `/` never restores, whatever is stored,
       so the tunnel always plays. (Defaulting the target to 'menu' here - "a
       completed profile owns a home screen" - made a stored profile enough to end
       the intro on every root open, which is the regression this guard prevents.)
       A hash is still a request: `#/menu` restores to the Main Menu, and a deeper
       destination is reached THROUGH the menu's own controls. */
    const target = destinationFromHash(window.location.hash);
    if (!target)
        return;
    const stored = readStoredProfile();
    if (!stored)
        return;
    const bridge = readPremiumProfileBridge();
    const restore = bridge?.restoreProfile;
    if (!restore)
        return;
    finishIntro();
    if (!restore(stored.profile))
        return;
    if (!openPortrait())
        return;
    if (target === 'menu')
        return;
    await afterTransition();
    /* Deep links are applied through the Main Menu's own controls, so the same
       user-facing navigation path owns fresh sessions and restored ones. */
    tapDestination(target);
}
/*
 * DEFERRED TO THE NEXT TASK, NOT RUN AT IMPORT.
 *
 * This module sits last in the load order, but "last import" is not "after the
 * other modules have wired themselves up": the overview publishes its bridge
 * while its own module body runs, and the pillar controller publishes its
 * openers at the end of its. Waiting one turn of the event loop is what makes
 * this a consumer of a finished app rather than a race against it.
 */
window.setTimeout(() => { void restoreSession(); }, 0);
