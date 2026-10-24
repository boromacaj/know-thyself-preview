/*
 * THE HUMAN DESIGN HERO - ITS SMALL AMOUNT OF SCRIPT.
 *
 * The sonar is CSS (humanDesignHeroStyle.ts) and the explanation is the shared concept sheet (conceptSheet.ts, opened by the data-concept key each centre carries). The BodyGraph is static: nothing
 * in it moves (V1.6). This module does what CSS cannot, with one delegated listener of each kind on the pillar surface and one timer, the tap's ring taken off again:
 *
 *   (The idle scan of the nine centres is NOT here: it is continuous CSS, like the BaZi view's sonar, and nothing in this module starts or stops it except the run state in 4 - the card is not
 *   seen. V1.2 to V1.4 also stilled it here whenever the app's intro frame probe had measured a slow share of 50% or more, which on the owner's phone removed it for good while the tap's
 *   ring, not gated, kept working. No measurement taken elsewhere may switch the sonar off.)
 *
 *   1. KEYBOARD. A centre is a button in the page's tab order; Enter and Space press it (an SVG element has no native button behaviour).
 *   2. THE ANSWER TO A TAP. A press on a centre puts `is-pinged` on that centre's own tap ring (a decorative <svg> over the graph, not part of it) for the length of one wave, so the stylesheet plays the sonar's ring once from that centre. A second press
 *      restarts it. (The explanation opens from the same click: conceptSheet.ts is delegated on the document.)
 *   3. THE SCROLL CUE. The cue is a button; it scrolls the reading's first block to the top of the surface, smoothly (instantly for a reader who asks for less motion). It fades out and stops taking
 *      taps once the reading has come up into the top of the screen (the reader has left the card), and comes back when they return to the card.
 *   4. A CARD THAT CANNOT BE SEEN IS NOT ANIMATED. `data-hd-run="off"` goes on the BodyGraph section when the document is hidden, the surface is hidden or inert, or the section is outside the visible part of
 *      its scroller; the stylesheet pauses every animation in the graph and in the sonar layer while it says "off", and they go on from where they stopped. One IntersectionObserver, one MutationObserver (the surface's
 *      content is replaced whenever a pillar is opened), one document listener; no timer and no frame loop.
 */
export const HD_RUN_ATTRIBUTE = 'data-hd-run';
export const HD_CUE_ATTRIBUTE = 'data-hd-cue';
/** The cue goes away once the reading has come up into the top part of the screen: its first block is within this share of the surface's height from the top. A card taller than the screen keeps the cue
 *  for as long as the reader is still on the card - the cue stays where it was placed, at the foot of the card, and is taken away only when it has done its job. */
export const HD_CUE_HIDE_FRACTION = 0.45;
/** How long a tap's ring is kept on the centre before the class is taken off again, ms (the ring is visible for 1.12 s). */
export const HD_PING_HOLD_MS = 1500;
/** The lower hero keeps this far (CSS px) above the MENU capsule, and the capsule's top stands this far above the foot of the screen (46 px high, 34 px up). */
export const HD_MENU_CLEARANCE_PX = 12;
export const HD_MENU_FROM_FOOT_PX = 80;
const prefersLessMotion = () => typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export function connectHumanDesignHero(surface) {
    const timers = new Map();
    /* ------------------------------------------------------------- 1. the keyboard */
    const onKey = (event) => {
        if (event.key !== 'Enter' && event.key !== ' ')
            return;
        const target = event.target;
        if (!(target instanceof Element))
            return;
        const control = target.closest('.hd-center-hit');
        if (!control)
            return;
        event.preventDefault();
        control.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    };
    /* ---------------------------------------------------------- 2. the answer to a tap */
    const onClick = (event) => {
        const target = event.target;
        if (!(target instanceof Element))
            return;
        const hit = target.closest('.hd-center-hit');
        if (hit) {
            /* the answer to a tap is that centre's own tap ring (a decorative layer over the graph, not part of it) */
            const id = hit.closest('.hd-top')?.getAttribute('data-center-id');
            const wave = id ? surface.querySelector(`.hd-wave--tap[data-center-id="${id}"]`) : null;
            if (wave) {
                window.clearTimeout(timers.get(wave));
                wave.classList.remove('is-pinged');
                /* a reflow between removing and adding the class is what restarts the animation on a second press */
                void wave.getBoundingClientRect();
                wave.classList.add('is-pinged');
                timers.set(wave, window.setTimeout(() => { wave.classList.remove('is-pinged'); timers.delete(wave); }, HD_PING_HOLD_MS));
            }
            return;
        }
        /* ------------------------------------------------------------ 3. the scroll cue */
        const cue = target.closest('[data-hd-scroll-cue]');
        if (cue) {
            const next = surface.querySelector('[data-hd-reading-start]');
            if (next)
                next.scrollIntoView({ behavior: prefersLessMotion() ? 'auto' : 'smooth', block: 'start' });
        }
    };
    const onScroll = () => {
        const hero = surface.querySelector('.hd-hero');
        if (!hero)
            return;
        const start = surface.querySelector('[data-hd-reading-start]');
        const left = start !== null && start.getBoundingClientRect().top - surface.getBoundingClientRect().top < surface.clientHeight * HD_CUE_HIDE_FRACTION;
        const value = left ? 'off' : 'on';
        if (hero.getAttribute(HD_CUE_ATTRIBUTE) !== value)
            hero.setAttribute(HD_CUE_ATTRIBUTE, value);
    };
    /* ---------------------------------------------------------- the lower hero, kept off the MENU */
    /* The hint line and the scroll cue sit under the card. On a screen too short for the card, the hint, the cue AND the MENU capsule, they would lie in the capsule's band at rest; whichever
       would reach into it is moved below the fold instead (the reader scrolls to it, and the cue is then clear of the capsule). The band is the foot of the screen above the capsule's top:
       the capsule's own rectangle where it can be read, and never lower than where the page puts it (80 px above the foot: the capsule is 46 px high and stands 34 px up), so a
       measurement taken while the page is still settling cannot let the cue under it. Runs when the page is built and when the screen changes size. */
    let placing = 0;
    const placeLowerHero = () => {
        const hero = surface.querySelector('.hd-hero');
        if (!hero)
            return;
        hero.style.setProperty('--hd-hint-push', '0px');
        hero.style.setProperty('--hd-cue-push', '0px');
        const viewport = surface.clientHeight || window.innerHeight;
        const menu = typeof document.querySelector === 'function' ? document.querySelector('[data-menu-open]') : null;
        const menuTop = menu && menu.getBoundingClientRect().height > 0 ? menu.getBoundingClientRect().top : viewport;
        const bandTop = Math.min(menuTop, viewport - HD_MENU_FROM_FOOT_PX) - HD_MENU_CLEARANCE_PX;
        const rest = surface.scrollTop;
        let pushed = 0;
        for (const [selector, variable] of [['.hd-deck-hint', '--hd-hint-push'], ['.hd-scroll-cue', '--hd-cue-push']]) {
            const element = hero.querySelector(selector);
            if (!element)
                continue;
            const box = element.getBoundingClientRect();
            const top = box.top + rest + pushed;
            if (top + box.height > bandTop) {
                const extra = Math.max(0, Math.round(viewport + 4 - top));
                hero.style.setProperty(variable, `${extra}px`);
                pushed += extra;
            }
        }
    };
    const schedulePlacing = () => {
        if (placing !== 0 || typeof window.requestAnimationFrame !== 'function') {
            if (typeof window.requestAnimationFrame !== 'function')
                placeLowerHero();
            return;
        }
        placing = window.requestAnimationFrame(() => { placing = 0; placeLowerHero(); });
    };
    /* --------------------------------------------------------------- 4. the run state */
    let inView = true;
    let observer = null;
    let observed = null;
    const apply = () => {
        const section = surface.querySelector('.bodygraph-diagram');
        if (!section)
            return;
        const run = document.visibilityState !== 'hidden' && !surface.hidden && !surface.inert && inView;
        const value = run ? 'on' : 'off';
        if (section.getAttribute(HD_RUN_ATTRIBUTE) !== value)
            section.setAttribute(HD_RUN_ATTRIBUTE, value);
    };
    const watch = () => {
        const section = surface.querySelector('.bodygraph-diagram');
        if (section === observed) {
            apply();
            return;
        }
        if (observer !== null && observed !== null)
            observer.unobserve(observed);
        observed = section;
        inView = true;
        if (observer !== null && section !== null)
            observer.observe(section);
        onScroll();
        apply();
        schedulePlacing();
    };
    if (typeof IntersectionObserver !== 'undefined') {
        observer = new IntersectionObserver((entries) => {
            const last = entries[entries.length - 1];
            if (!last)
                return;
            inView = last.isIntersecting;
            apply();
            if (inView)
                schedulePlacing();
        }, { root: null, threshold: [0, 0.01] });
    }
    const mutations = typeof MutationObserver !== 'undefined'
        ? new MutationObserver((records) => {
            if (records.some((record) => record.type === 'childList'))
                watch();
            apply();
            /* the surface is shown (hidden/inert come off) after it is built: the lower hero is measured when it has a size */
            schedulePlacing();
        })
        : null;
    mutations?.observe(surface, { childList: true, attributes: true, attributeFilter: ['hidden', 'inert'] });
    const onVisibility = () => apply();
    surface.addEventListener('keydown', onKey);
    surface.addEventListener('click', onClick);
    surface.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener?.('resize', schedulePlacing);
    watch();
    return () => {
        surface.removeEventListener('keydown', onKey);
        surface.removeEventListener('click', onClick);
        surface.removeEventListener('scroll', onScroll);
        document.removeEventListener('visibilitychange', onVisibility);
        window.removeEventListener?.('resize', schedulePlacing);
        observer?.disconnect();
        mutations?.disconnect();
        for (const timer of timers.values())
            window.clearTimeout(timer);
        timers.clear();
    };
}
