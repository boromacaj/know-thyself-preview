import { heroGeometry, heroVariables, HERO_FLOW_VARIABLES } from './app/tarot/ui/tarotHero.js';
/** The clear space kept between the foot of the reading's scroll region and the MENU capsule, CSS px. */
const MENU_CLEAR = 10;
const number = (value) => {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : Number.NaN;
};
export function mountTarotHeroPlacement(options) {
    const { experience, stage, surface, mount } = options;
    const forceMotion = new URLSearchParams(window.location.search).get('orbitMotion') === 'on';
    let queued = 0;
    const hero = () => mount.querySelector('.tx-hero');
    /** The hero's left edge in the stage's coordinates, from the layout offsets (a transform on the page - the card transition - does not move them). */
    const heroLeft = (element) => {
        let left = 0;
        let node = element;
        while (node && node !== surface) {
            left += node.offsetLeft;
            const parent = node.offsetParent;
            if (parent && parent !== surface && surface.contains(parent))
                left += parent.clientLeft;
            node = parent;
        }
        return surface.offsetLeft + surface.clientLeft + left;
    };
    const measure = (element) => {
        const stageWidth = stage.clientWidth;
        if (stageWidth <= 0 || surface.hidden || element.offsetWidth <= 0)
            return null;
        /* THE HERO OPENS THE PAGE and is sticky, so its own offsetTop moves with a scrolled page; its natural place is the top of the mount. */
        const top = mount.offsetTop + mount.clientTop;
        const left = heroLeft(element);
        const computed = getComputedStyle(stage);
        let earthX = number(computed.getPropertyValue('--kt-vessel-glow-x'));
        let earthY = number(computed.getPropertyValue('--kt-vessel-glow-y'));
        let earthDiameter = number(computed.getPropertyValue('--kt-vessel-glow-diameter'));
        /* Until the globe has published its disc, the Earth is where the scene's layout puts it: centred, at about the height the ambient framing uses. */
        if (!Number.isFinite(earthX) || !Number.isFinite(earthY) || !Number.isFinite(earthDiameter) || earthDiameter <= 0) {
            earthX = stageWidth / 2;
            earthY = stage.clientHeight * 0.4;
            earthDiameter = Math.min(stageWidth, stage.clientHeight) * 0.72;
        }
        const surfaceRect = surface.getBoundingClientRect();
        const menu = experience.querySelector('#tarot-nav .kt-pillar-nav-button')?.getBoundingClientRect();
        /* While a reading is on screen the surface's foot is lifted above the MENU capsule (the stylesheet, by --th-menu-room); the plan is made for the WHOLE screen all the same, so
           nothing of the Earth, the row or the reading's place moves when it is. */
        const inset = Number.parseFloat(getComputedStyle(surface).bottom) || 0;
        const geometry = heroGeometry({
            earthX, earthY, earthDiameter, stageWidth,
            heroLeft: left, heroTop: top,
            viewportHeight: surface.clientHeight + inset,
            /* the reading panel is the mount's own width (the surface's content column): the three cards' outer edges are made to match it */
            panelWidth: mount.clientWidth > 0 ? mount.clientWidth : undefined,
            menuTop: menu && menu.height > 0 ? menu.top - surfaceRect.top : null,
        });
        const variables = heroVariables(geometry);
        /* THE ROOM FOR MENU: from the capsule's top (less a small clear space) to the foot of the whole screen. */
        if (menu && menu.height > 0)
            variables['--th-menu-room'] = `${Math.max(0, surfaceRect.bottom + inset - (menu.top - MENU_CLEAR)).toFixed(2)}px`;
        return variables;
    };
    const place = () => {
        const element = hero();
        if (!element)
            return;
        if (forceMotion)
            element.dataset.orbitMotion = 'on';
        /* While the planet changes size or place the cards follow it, but what moves the whole page (the hero's height) waits for it to settle. */
        const moving = document.querySelector('[data-ambient-disc="moving"]') !== null;
        const variables = measure(element);
        if (!variables)
            return;
        for (const [name, value] of Object.entries(variables)) {
            if (moving && HERO_FLOW_VARIABLES.includes(name) && element.style.getPropertyValue(name) !== '')
                continue;
            if (element.style.getPropertyValue(name) !== value)
                element.style.setProperty(name, value);
        }
        /* The reading's sheet is not inside the hero: on the completed screen it is pulled up under the row by a margin the hero's geometry computes, so it is written there too. */
        /* The room for MENU belongs to the surface (it ends above the capsule while a reading is on screen) and to the capsule's container (the dissolve at that edge). */
        const room = variables['--th-menu-room'];
        if (room !== undefined) {
            if (surface.style.getPropertyValue('--th-menu-room') !== room)
                surface.style.setProperty('--th-menu-room', room);
            const nav = experience.querySelector('#tarot-nav');
            if (nav && nav.style.getPropertyValue('--th-menu-room') !== room)
                nav.style.setProperty('--th-menu-room', room);
        }
        const sheetMargin = variables['--th-sheet-margin'];
        const sheet = mount.querySelector('.tx-sheet');
        if (sheet && sheetMargin !== undefined && sheet.style.getPropertyValue('--th-sheet-margin') !== sheetMargin)
            sheet.style.setProperty('--th-sheet-margin', sheetMargin);
    };
    const schedule = () => {
        /* A hero that has never been placed is placed at once, on the event (a frame may be a while coming on a busy phone, and the deck must not
           sit at the wrong edge meanwhile); the frame that follows confirms it. */
        const fresh = hero();
        if (fresh && fresh.style.getPropertyValue('--ko-cx') === '')
            place();
        if (queued !== 0)
            return;
        queued = window.requestAnimationFrame(() => { queued = 0; place(); });
    };
    const observers = [];
    const observe = (target, init) => {
        const observer = new MutationObserver(schedule);
        observer.observe(target, init);
        observers.push(observer);
    };
    /* The screen was drawn again. */
    observe(mount, { childList: true });
    /* The Earth's disc moved: the glow ring's properties are written on the stage's own style attribute. */
    observe(stage, { attributes: true, attributeFilter: ['style'] });
    /* The surface is shown (it is drawn hidden and revealed by the card transition), and which screen is showing. */
    observe(surface, { attributes: true, attributeFilter: ['hidden'] });
    observe(experience, { attributes: true });
    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('orientationchange', schedule, { passive: true });
    window.visualViewport?.addEventListener('resize', schedule, { passive: true });
    let resizes = null;
    if (typeof ResizeObserver !== 'undefined') {
        resizes = new ResizeObserver(schedule);
        resizes.observe(surface);
    }
    let stopAtTop = null;
    let ends = null;
    let whole = null;
    if (typeof IntersectionObserver !== 'undefined') {
        let lastBelow = true;
        let heroWhole = true;
        const apply = () => {
            const target = hero();
            if (!target)
                return;
            /* The reading now begins under the row, in the first screen: a short reading's last block is on screen from the start, and that is not its END. The hero fades only
               once the page has been scrolled. */
            if ((lastBelow && heroWhole) || surface.scrollTop <= 2)
                delete target.dataset.orbitDone;
            else
                target.dataset.orbitDone = 'on';
        };
        ends = new IntersectionObserver((entries) => {
            const last = entries[entries.length - 1];
            lastBelow = last.boundingClientRect.top >= (last.rootBounds?.bottom ?? window.innerHeight);
            apply();
        }, { root: surface });
        whole = new IntersectionObserver((entries) => {
            /* WHOLE means: as much of the hero as the scroll region can show from where it stands. While a reading is on screen the region ends above the MENU capsule and is
               shorter than the hero's box, so a share of the box could never reach 0.97; what is asked is that nothing the region could show is missing. */
            const entry = entries[entries.length - 1];
            const root = entry.rootBounds;
            const possible = Math.min(entry.boundingClientRect.height, (root ? root.height : window.innerHeight) - Math.max(0, entry.boundingClientRect.top - (root ? root.top : 0)));
            heroWhole = entry.intersectionRect.height >= possible - 3;
            apply();
        }, { root: surface, threshold: Array.from({ length: 41 }, (_, step) => step / 40) });
        const rewire = () => {
            ends?.disconnect();
            whole?.disconnect();
            lastBelow = true;
            heroWhole = true;
            const target = hero();
            const sheet = mount.querySelector('.tx-sheet');
            /* The LAST BLOCK of the reading: the deepest last element, not the reading's own box (which is on screen from the moment it starts). */
            let last = sheet;
            while (last?.lastElementChild)
                last = last.lastElementChild;
            if (target && sheet && last && last !== sheet) {
                ends?.observe(last);
                whole?.observe(target);
            }
        };
        /* Observers only report a CHANGE of what is on screen. A jump from the end of the reading straight to the top (the menu and back, which
           puts the page at its top) crosses nothing, so the top is checked on its own: the page is at its top, the hero is shown. */
        const atTop = () => {
            if (surface.scrollTop > 2)
                return;
            lastBelow = true;
            heroWhole = true;
            apply();
        };
        surface.addEventListener('scroll', atTop, { passive: true });
        stopAtTop = () => surface.removeEventListener('scroll', atTop);
        const wiring = new MutationObserver(rewire);
        wiring.observe(mount, { childList: true });
        observers.push(wiring);
        rewire();
    }
    document.fonts?.ready.then(schedule).catch(() => { });
    schedule();
    return () => {
        for (const observer of observers)
            observer.disconnect();
        resizes?.disconnect();
        ends?.disconnect();
        whole?.disconnect();
        stopAtTop?.();
        window.removeEventListener('resize', schedule);
        window.removeEventListener('orientationchange', schedule);
        window.visualViewport?.removeEventListener('resize', schedule);
        if (queued !== 0)
            window.cancelAnimationFrame(queued);
    };
}
