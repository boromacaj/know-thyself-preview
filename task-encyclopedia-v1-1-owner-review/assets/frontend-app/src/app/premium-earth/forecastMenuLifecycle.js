/*
 * THE FORECAST CARD'S LIFECYCLE - A CARD THAT CANNOT BE SEEN IS NOT ANIMATED.
 *
 * The card's motion is CSS (forecastMenuStyle.ts) and has no clock of its own to stop, so stopping it means pausing the page's animations. This
 * module sets one attribute on the menu surface - data-fc-run="on" or "off" - and the stylesheet pauses every animation of the card while it is
 * "off" (animation-play-state), so the loop stops where it is and goes on from there, predictably, when the card is seen again.
 *
 * IT IS "OFF" when any of these holds (the cards are the Forecast card and the Synthesis card, and the loops stop together):
 *   - the document is hidden (a background tab, a locked screen);
 *   - the menu is not the destination on screen (the surface is hidden or inert: another destination, a card transition's other side);
 *   - none of the animated cards is inside the visible part of its scroller (an IntersectionObserver on the cards).
 *
 * It holds one IntersectionObserver, one MutationObserver (the menu is drawn again on a language change, which replaces the card, and the surface's
 * own hidden and inert attributes are what say the menu is not on screen) and one document listener, and no timer and no frame loop. A browser
 * without IntersectionObserver leaves the card running while the document is visible and the surface shown. The returned function removes it all.
 */
export const FORECAST_MENU_RUN_ATTRIBUTE = 'data-fc-run';
/** The animated cards on the menu surface: the Forecast, Synthesis, Astrology, Numerology, Human Design and BaZi cards each carry a loop that must stop when it cannot be seen. */
const ANIMATED_CARDS = '.kt-menu-fc, .kt-menu-syn, .kt-astro-svg, .kt-num-svg, .kt-hd-svg, .kt-bz-svg';
export function connectForecastMenuCard(surface) {
    /** The animated cards now on the surface, and which of them are in the visible part of the scroller. */
    let observed = [];
    const inView = new Set();
    let observer = null;
    const apply = () => {
        /* With no card to watch, or no observer, the loop runs while the document is visible and the surface is shown. */
        const cardInView = observed.length === 0 || observer === null || inView.size > 0;
        const run = document.visibilityState !== 'hidden' && !surface.hidden && !surface.inert && cardInView;
        const value = run ? 'on' : 'off';
        if (surface.getAttribute(FORECAST_MENU_RUN_ATTRIBUTE) !== value)
            surface.setAttribute(FORECAST_MENU_RUN_ATTRIBUTE, value);
    };
    /** The cards on the surface (they are new elements after every redraw). */
    const watchCards = () => {
        const cards = [...surface.querySelectorAll(ANIMATED_CARDS)];
        if (cards.length === observed.length && cards.every((card, index) => card === observed[index]))
            return;
        if (observer !== null)
            for (const card of observed)
                observer.unobserve(card);
        observed = cards;
        inView.clear();
        for (const card of cards) {
            inView.add(card);
            observer?.observe(card);
        }
        apply();
    };
    if (typeof IntersectionObserver !== 'undefined') {
        observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting)
                    inView.add(entry.target);
                else
                    inView.delete(entry.target);
            }
            apply();
        }, { root: null, threshold: [0, 0.01] });
    }
    const mutations = typeof MutationObserver !== 'undefined'
        ? new MutationObserver((records) => {
            if (records.some((record) => record.type === 'childList'))
                watchCards();
            apply();
        })
        : null;
    mutations?.observe(surface, { childList: true, attributes: true, attributeFilter: ['hidden', 'inert'] });
    const onVisibility = () => { apply(); };
    document.addEventListener('visibilitychange', onVisibility);
    watchCards();
    apply();
    return () => {
        observer?.disconnect();
        mutations?.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
        surface.removeAttribute(FORECAST_MENU_RUN_ATTRIBUTE);
    };
}
