/*
 * THE READING SITS ON THE GLOBE, NEVER ON A STREET.
 *
 * WHAT THIS FIXES. The birthplace step is the one place in the product where
 * the Earth is a selection surface, and selecting flies the camera down to the
 * locality - eighteen kilometres up, with roads, fields and shop labels. That
 * camera is correct there and nowhere else. Onboarding knows it: beginVesselStage()
 * flies home on the way out, so a profile typed straight through reaches the
 * Portrait over a globe.
 *
 * Every other way into a reading skips that step.
 *   - "Change place" from Review details: the map flies down, the edit is
 *     saved, and the reading reopens from the overview - which is not the
 *     vessel stage and never flew home. The Portrait then renders over the town
 *     the reader was just born in.
 *   - a restored session: place.restore() presents the stored candidate, which
 *     moves the camera whenever that candidate came from a search.
 *   - a QA preset: the same restore, by the same door.
 *
 * WHY IT LIVES HERE AND NOT IN THE CONTROLLER. There is no single navigation
 * call to patch - there are four routes in and more will be added - and putting
 * a camera correction inside each of them is how they drift apart. What every
 * route does share is the flag it raises when a reading takes the screen. So
 * this watches the flag and asserts one rule against it, the same way
 * onboardingEarthIntroSequence, onboardingOverlayRoutes and
 * pillarScrollEarthRotation already read that flag for their own rules.
 *
 * THE THREE STATES STAY INDEPENDENT. This module never reads the profile, the
 * committed place or the selection bridge - a birthplace is an input to the
 * engines, not an instruction to the camera. It reads one flag: is a reading on
 * screen. Nothing here can be changed by having committed a place, and nothing
 * about the place selection is changed by this.
 */
const experience = document.getElementById('place-experience');
if (experience instanceof HTMLElement) {
    /*
     * The animated flight, not a pose assignment.
     *
     * The globe stays visible through the whole card transition, so a snapped
     * pose would be a visible jolt. showWorld() is already the right shape for
     * this: it declines when the camera is out at the world view, and when it is
     * not, it pulls back along the distance axes only - keeping the live centre
     * and heading, so the planet does not jump back to where it started. It also
     * drops the birthplace marker, which has no business on a reading either.
     */
    const showWorld = () => {
        const fly = window
            .knowThyselfShowEarthWorld;
        if (!fly)
            return false;
        fly();
        return true;
    };
    const atWorld = () => (document.getElementById('earth-map')?.dataset.earthView === 'world');
    /*
     * A reading can open before the map session has published its capability -
     * the restore path is fast and the mount is not. Until it has, there is no
     * camera to correct and nothing to do; once it has, the correction is still
     * owed. Bounded, because a map that never arrives must not leave a frame
     * callback running for the rest of the session.
     */
    let pending = 0;
    const ensureWorld = (attemptsLeft = 12) => {
        window.cancelAnimationFrame(pending);
        pending = 0;
        if (atWorld())
            return;
        if (showWorld())
            return;
        if (attemptsLeft <= 0)
            return;
        pending = window.requestAnimationFrame(() => ensureWorld(attemptsLeft - 1));
    };
    new MutationObserver(() => {
        /* Only the arrival. Leaving a reading hands the screen back to onboarding,
           which owns the camera from there and may well want it somewhere else. */
        if (experience.dataset.pillarStage !== 'pillar') {
            window.cancelAnimationFrame(pending);
            pending = 0;
            return;
        }
        ensureWorld();
    }).observe(experience, { attributes: true, attributeFilter: ['data-pillar-stage'] });
    /* The flag is raised inside a card transition's swap, so this module is
       normally imported long before any reading exists. Checking once anyway
       costs one comparison and makes the rule true of the current screen too,
       not only of the next change to it. */
    if (experience.dataset.pillarStage === 'pillar')
        ensureWorld();
}
export {};
