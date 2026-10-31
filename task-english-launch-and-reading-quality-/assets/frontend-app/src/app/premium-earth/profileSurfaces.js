/*
 * THE PROFILE SURFACES, AS A FAMILY.
 *
 * A finished profile has six destinations and two controllers. Five of the
 * destinations live on premiumPillarExperience's surface; the forecast owns its
 * own, in numerologyForecastExperience, and the two modules deliberately do not
 * import each other - the forecast was built to add a surface and touch none of
 * the other controller's internals, and that is still worth keeping.
 *
 * While a hub sat between them that cost nothing: each only ever had to retire
 * the hub, which belonged to neither. The hub is gone and the six are now
 * siblings in one strip, so either controller can be asked to open while the
 * other is on screen. Each therefore needs to know two things about surfaces it
 * does not own: which are visible, so they can be faded out, and how to stand
 * them down.
 *
 * That is what this is. Not a navigation layer and not a router - two DOM
 * queries over the classes the surfaces ALREADY share, so a module that adds a
 * surface later is covered by having joined the family. There is nothing to
 * register and nothing to import in the other direction.
 */
/** The class every profile destination's scroll surface already carries. */
const SURFACE = '.kt-pillar-surface';
/** The class every destination strip already carries. */
const NAV = '.kt-pillar-nav';
/**
 * The surfaces and strips currently on screen, so a caller can fade out
 * whatever is actually there rather than whatever it assumes is there.
 *
 * `hidden` is the single source of truth for this, because it is what both
 * controllers already set and what CSS already honours. Reading computed styles
 * instead would answer differently in the middle of a fade, which is precisely
 * when this is called.
 */
export function visibleProfileSurfaces(stage) {
    return [...stage.querySelectorAll(`${SURFACE}, ${NAV}`)]
        .filter((element) => !element.hidden);
}
/**
 * Stand down every profile surface except the ones named.
 *
 * Called inside a transition's swap, at opacity 0, so it is a visibility change
 * and never a visible one. `inert` travels with `hidden` because a retired
 * surface that still takes focus is how a screen reader ends up reading the
 * screen the reader just left.
 */
export function retireProfileSurfaces(stage, keep) {
    const kept = new Set(keep);
    for (const element of stage.querySelectorAll(`${SURFACE}, ${NAV}`)) {
        if (kept.has(element))
            continue;
        element.hidden = true;
        element.inert = true;
    }
}
/*
 * BRING THE ACTIVE DESTINATION INTO VIEW.
 *
 * On a phone the six capsules do not fit across the strip, so it scrolls, and
 * the reader must be able to see which one they are on. Human Design and
 * Forecast start off the right-hand edge; without this, opening one showed the
 * reader everywhere they had been and not where they were.
 *
 * NOT scrollIntoView. That was the first version and it is wrong here for two
 * reasons: it walks up and scrolls every scrollable ANCESTOR as well, which on
 * this stage means it can move the reading and the page; and it left the first
 * capsule clipped at the left edge - measured, 33px of the portrait capsule cut
 * off when the portrait was the active one, which is the default landing state.
 *
 * Setting scrollLeft on the strip itself cannot touch anything else, and the
 * browser clamps it, so centring an end capsule simply pins that end. The
 * measurement is a rect delta rather than offsetLeft because the capsule's
 * offsetParent is the positioned nav, not the scroller.
 *
 * Instant, not smooth: the strip arrives with the screen it belongs to, so an
 * animation here would be a scroll the reader never started.
 */
export function centreActiveStop(nav) {
    const strip = nav.querySelector('.kt-nav-strip');
    const active = strip?.querySelector('.kt-nav-stop.is-active');
    if (!strip || !active)
        return;
    const stripBox = strip.getBoundingClientRect();
    const activeBox = active.getBoundingClientRect();
    const delta = (activeBox.left + (activeBox.width / 2))
        - (stripBox.left + (stripBox.width / 2));
    strip.scrollLeft += delta;
}
