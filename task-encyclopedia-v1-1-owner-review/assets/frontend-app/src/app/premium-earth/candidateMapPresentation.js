/**
 * Show a place on the Earth. PRESENTATION ONLY, and so it can never be allowed to take anything else down with it.
 *
 * The map is an external service. When it is unhealthy - a key whose billing was switched off, a quota that ran out, a 3D
 * library that failed to arrive - the element is still there but its internals are not, and a call into it throws. This is
 * called from inside the profile's own restore (a QA preset, a profile coming back from storage), after the place has been
 * written and before the name, the date and the committed snapshot are: a throw here left a half-restored profile, "blocked" on
 * every field, and a tester stuck on the birthplace step with no way to the Main Menu. The profile does not need the picture
 * to exist, so the picture failing is contained here.
 */
export function presentCandidateOnMap(session, coordinates, label, options) {
    try {
        if (options.moveCamera) {
            session.focusLocation(coordinates, label);
            return;
        }
        session.markLocation(coordinates, label);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.warn('[earth] the map could not show the place; the profile carries on without it', error);
    }
}
