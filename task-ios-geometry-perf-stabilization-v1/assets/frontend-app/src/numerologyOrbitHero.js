import { baziChartCss } from './app/components/baziChartVisuals.js?v=d9f39e7';
import { baziHeroCss } from './app/premium-earth/baziHero.js?v=d9f39e7';
import { firstScreenLayout, numerologyOrbitCss, orbitGeometry, orbitVariables } from './app/premium-earth/numerologyOrbit.js?v=d9f39e7';
/*
 * THE NUMEROLOGY ORBIT: WHERE THE EARTH IS, AND WHERE THE FORMATION GOES
 * ----------------------------------------------------------------------
 * The three glass circles (numerologyOrbit.ts) turn about the Earth's centre. This module is the only script they need, and it
 * runs on events, never per frame: it finds the Earth the way the vessel glow ring does - from the same three custom properties
 * (--kt-vessel-glow-x / -y / -diameter, published by vesselArrowOnlyPolish from the ambient globe's disc) - measures where the
 * hero sits in the page, and writes five custom properties on it (centre, ring, circle size, height). The turning itself is a CSS
 * animation on the compositor.
 *
 * WHEN IT RUNS (all coalesced into one animation frame):
 *   - a Numerology reading has just been rendered into #pillar-view (a childList mutation)
 *   - the Earth's disc moved: the ring's custom properties changed on the stage (a style mutation), which is every frame of a
 *     framing move and nothing otherwise
 *   - the screen was resized or rotated, or the pillar view's box changed
 * Nothing runs while the Earth is still and nothing has changed, and nothing at all when no Numerology hero is on the page.
 *
 * QA-ONLY ADDRESS PARAMETER. Not a product setting; remove with the other QA parameters before a public release:
 *   ?orbitMotion=on   turn the orbit even where the device asks for reduced motion (Android "remove animations" turns it on in
 *                     Chrome), to review the motion on such a phone. Without it a reduced-motion device sees the formation at rest.
 */
const experience = document.getElementById('place-experience');
const stage = document.getElementById('vessel-stage');
const pillarView = document.getElementById('pillar-view');
if (experience instanceof HTMLElement && stage instanceof HTMLElement && pillarView instanceof HTMLElement) {
    const style = document.createElement('style');
    style.dataset.numerologyOrbit = 'true';
    /* The BaZi hero is laid on the same stage by this same script; its own look is the second sheet (baziHero.ts), more specific than the first. */
    style.textContent = numerologyOrbitCss() + baziHeroCss() + baziChartCss();
    document.head.append(style);
    const forceMotion = new URLSearchParams(window.location.search).get('orbitMotion') === 'on';
    let queued = 0;
    /* The scroll position past which the reading covers the formation (see measure), and whether it does now. */
    let coverAt = Number.POSITIVE_INFINITY;
    let covered = false;
    const hero = () => pillarView.querySelector('.kt-orbit-hero');
    const number = (value) => {
        const parsed = Number.parseFloat(value);
        return Number.isFinite(parsed) ? parsed : Number.NaN;
    };
    /** An element's layout position inside a positioned ancestor, from the offset chain: no transform and no scroll in it. */
    const layoutPlace = (element, root) => {
        let left = 0;
        let top = 0;
        let node = element;
        while (node && node !== root) {
            left += node.offsetLeft;
            top += node.offsetTop;
            const parent = node.offsetParent;
            if (parent && parent !== root && root.contains(parent)) {
                left += parent.clientLeft;
                top += parent.clientTop;
            }
            node = parent;
        }
        return node === root ? { left, top } : null;
    };
    /** One reading of the page: where the hero sits, where the Earth is, and the variables that follow. Null when there is nothing to place. */
    const measure = (element) => {
        const stageWidth = stage.clientWidth;
        const stageHeight = stage.clientHeight;
        if (stageWidth <= 0 || pillarView.hidden)
            return null;
        /* LAYOUT OFFSETS, not getBoundingClientRect: the card transition lifts and fades the page with transforms while it arrives, and
           a rect measured then is the place the hero passes through, not the place it settles in (it read 57 px off). The offset chain
           is the layout position, with the page scrolled to its top, whatever is being animated. */
        const place = layoutPlace(element, pillarView);
        if (!place || element.offsetWidth <= 0)
            return null;
        /* THE HERO IS STICKY, so its own offsetTop includes the shift of a page that has been scrolled. Its natural top is the top of the
           content box of the article it opens (the first thing in it that takes room; the title is clipped out of the flow). */
        const article = element.parentElement;
        const articlePlace = article instanceof HTMLElement ? layoutPlace(article, pillarView) : null;
        if (articlePlace && article instanceof HTMLElement) {
            const articleStyle = getComputedStyle(article);
            place.top = articlePlace.top + article.clientTop + (number(articleStyle.paddingTop) || 0) + (number(getComputedStyle(element).marginTop) || 0);
        }
        /* The page itself is positioned inside the stage (the glow ring's frame): its own offsets, for the same reason. */
        const left = pillarView.offsetLeft + pillarView.clientLeft + place.left;
        const top = pillarView.offsetTop + pillarView.clientTop + place.top;
        const computed = getComputedStyle(stage);
        let earthX = number(computed.getPropertyValue('--kt-vessel-glow-x'));
        let earthY = number(computed.getPropertyValue('--kt-vessel-glow-y'));
        let earthDiameter = number(computed.getPropertyValue('--kt-vessel-glow-diameter'));
        /* Until the globe has published its disc (or when Google's globe is the authority and the ring has no measured size), the
           Earth is where the scene's layout puts it: centred, at about the height the ambient framing uses. */
        if (!Number.isFinite(earthX) || !Number.isFinite(earthY) || !Number.isFinite(earthDiameter) || earthDiameter <= 0) {
            earthX = stageWidth / 2;
            earthY = stageHeight * 0.4;
            earthDiameter = Math.min(stageWidth, stageHeight) * 0.72;
        }
        const geometry = orbitGeometry({ earthX, earthY, earthDiameter, stageWidth, heroLeft: left, heroTop: top });
        const variables = orbitVariables(geometry);
        /* THE FIRST SCREEN: the hero reaches the bottom of what the reader first sees, so the reading's first section starts below the fold, and
           the scroll cue sits in the band between the formation and the MENU capsule. The formation's own numbers above are untouched. */
        const surface = pillarView.getBoundingClientRect();
        const menu = experience.querySelector('.kt-pillar-nav-button')?.getBoundingClientRect();
        const layout = firstScreenLayout({
            formationBottom: geometry.height,
            heroTop: top,
            viewportHeight: pillarView.clientHeight,
            menuTop: menu && menu.height > 0 ? menu.top - surface.top : null,
            followingMargin: element.nextElementSibling ? number(getComputedStyle(element.nextElementSibling).marginTop) || 0 : 0,
        });
        variables['--ko-height'] = `${layout.height.toFixed(2)}px`;
        /* WHERE THE PAGE HOLDS THE PINNED HERO: its natural place. A sticky offset is counted from the scroller's CONTENT edge (inside its own
           padding), so it is the natural top less that padding - 0 when the hero opens the page, as it does. */
        variables['--ko-stick'] = `${Math.max(0, place.top - (number(getComputedStyle(pillarView).paddingTop) || 0)).toFixed(2)}px`;
        variables['--ko-cue-top'] = `${layout.cueTop.toFixed(2)}px`;
        /* The scroll position past which the reading has risen over the whole formation: its first section's top (the hero's height and the
           section's margin below the hero's top) has passed the formation's top edge. From there the circles take no touch and no focus. */
        const coverAt = layout.height + (number(getComputedStyle(element.nextElementSibling ?? element).marginTop) || 0) - (geometry.centreY - geometry.reach);
        return { heroLeft: left, heroTop: top, variables, scale: geometry.scale, coverAt };
    };
    /* THE CIRCLES TAKE A TOUCH AND A FOCUS ONLY WHILE THEY ARE ON STAGE. They are buttons that open their meaning; where the reading's glass is
       over them the glass is what is hit (it is painted after the hero), and once the reading has risen past the whole formation, or has been
       read to its end, they are made inert, so that no hidden circle can be tabbed to or tapped through the text. */
    const syncCover = () => {
        const scene = hero();
        if (!scene)
            return;
        const off = covered || scene.dataset.orbitDone === 'on';
        if (covered)
            scene.dataset.orbitCovered = 'on';
        else
            delete scene.dataset.orbitCovered;
        for (const circle of scene.querySelectorAll('button.kt-orbit-bubble')) {
            if (off) {
                if (!circle.hasAttribute('inert'))
                    circle.setAttribute('inert', '');
            }
            else
                circle.removeAttribute('inert');
        }
    };
    const place = () => {
        queued = 0;
        const element = hero();
        if (!element)
            return;
        if (forceMotion)
            element.dataset.orbitMotion = 'on';
        /* While the Earth is changing size or place the formation follows it every frame, but the hero's HEIGHT (which moves the whole
           reading below it) is only changed once the planet has settled: a reflow of the page per frame of a framing move is not worth
           a circle's last pixels. */
        const moving = document.querySelector('[data-ambient-disc="moving"]') !== null;
        /* MEASURE, WRITE, MEASURE AGAIN. What is written (the hero's height) can itself move the hero - it did, by a margin that stopped
           collapsing the moment the hero stopped being empty - so a reading taken before the write is only good if a reading taken after
           it agrees. Up to three passes; in practice the second one confirms the first. Each pass is a layout read, on an event. */
        let used = null;
        for (let pass = 0; pass < 3; pass += 1) {
            const reading = measure(element);
            if (!reading)
                return;
            if (used && Math.abs(reading.heroTop - used.heroTop) < 0.5 && Math.abs(reading.heroLeft - used.heroLeft) < 0.5)
                break;
            used = reading;
            for (const [name, value] of Object.entries(reading.variables)) {
                if ((name === '--ko-height' || name === '--ko-cue-top' || name === '--ko-stick') && moving && element.style.getPropertyValue(name) !== '')
                    continue;
                if (element.style.getPropertyValue(name) !== value)
                    element.style.setProperty(name, value);
            }
            element.dataset.orbitScale = reading.scale.toFixed(3);
            /* THE BAZI CHARTS ARE SIZED FROM THE SAME RING. The pentagon's five orbs lie on the circle the three hero circles ride (its radius is 138 of
               the pentagon's 400 units) and the seasonal wheel's outer edge is the Earth's rim: both are given as widths on the page, which holds both
               the hero and the charts. A custom property that does not change is not rewritten. */
            if (element.classList.contains('kt-bazi-hero')) {
                const ring = Number.parseFloat(reading.variables['--ko-ring']);
                if (Number.isFinite(ring) && ring > 0) {
                    const sizes = { '--bz-pentagon': `${((ring * 400) / 138).toFixed(2)}px`, '--bz-wheel': `${(ring * 2.35).toFixed(2)}px` };
                    for (const [name, value] of Object.entries(sizes))
                        if (pillarView.style.getPropertyValue(name) !== value)
                            pillarView.style.setProperty(name, value);
                }
            }
            element.dataset.orbitCue = 'on';
            coverAt = reading.coverAt;
        }
        covered = pillarView.scrollTop > coverAt;
        syncCover();
    };
    /* The scroll listener makes invisible circles inert without layout work. */
    pillarView.addEventListener('scroll', () => {
        const next = pillarView.scrollTop > coverAt;
        if (next === covered)
            return;
        covered = next;
        syncCover();
    }, { passive: true });
    const schedule = () => {
        if (queued !== 0)
            return;
        queued = window.requestAnimationFrame(place);
    };
    /* A reading was rendered (the view's children were replaced). */
    new MutationObserver(schedule).observe(pillarView, { childList: true });
    /* The Earth's disc moved: the glow ring's properties are written on the stage's own style attribute. */
    new MutationObserver(schedule).observe(stage, { attributes: true, attributeFilter: ['style'] });
    /* The page is shown (it is rendered hidden and revealed by the card transition) - it has no box until then. */
    new MutationObserver(schedule).observe(pillarView, { attributes: true, attributeFilter: ['hidden'] });
    /* Which screen is showing, and whether the page is laid out yet. */
    new MutationObserver(schedule).observe(experience, { attributes: true });
    const onResize = () => { schedule(); };
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', onResize, { passive: true });
    window.visualViewport?.addEventListener('resize', onResize, { passive: true });
    if (typeof ResizeObserver !== 'undefined') {
        const resizes = new ResizeObserver(onResize);
        resizes.observe(pillarView);
        /* The reading itself: its size changes when fonts arrive or a language is chosen, and with it where the hero sits. A reading is
           rendered into the view after this observer exists, so it is (re)attached whenever the view's children are replaced. */
        new MutationObserver(() => { resizes.disconnect(); resizes.observe(pillarView); const article = pillarView.firstElementChild; if (article)
            resizes.observe(article); }).observe(pillarView, { childList: true });
    }
    /* THE READING'S END. The hero is pinned for as long as the reading is on screen. At the foot of the page the sticky release would carry
       it up the screen over the empty end, so it fades out (data-orbit-done) once the last block of the reading is on screen or past, or the
       moment the release starts to move it (the second observer: a fast flick can skip the last block between two frames), and fades back
       when the reader scrolls up into the reading again. Two observers, on events. */
    if (typeof IntersectionObserver !== 'undefined') {
        let lastBelow = true;
        let heroWhole = true;
        const apply = () => {
            const target = hero();
            if (!target)
                return;
            if (lastBelow && heroWhole)
                delete target.dataset.orbitDone;
            else
                target.dataset.orbitDone = 'on';
            syncCover();
        };
        const ends = new IntersectionObserver((entries) => {
            const last = entries[entries.length - 1];
            /* below = the last block is still under the screen's foot; otherwise it is on screen or already above it */
            lastBelow = last.boundingClientRect.top >= (last.rootBounds?.bottom ?? window.innerHeight);
            apply();
        }, { root: pillarView });
        const whole = new IntersectionObserver((entries) => {
            heroWhole = entries[entries.length - 1].intersectionRatio >= 0.97;
            apply();
        }, { root: pillarView, threshold: [0, 0.97, 1] });
        new MutationObserver(() => {
            ends.disconnect();
            whole.disconnect();
            lastBelow = true;
            heroWhole = true;
            const article = pillarView.firstElementChild;
            const target = hero();
            if (target && article?.lastElementChild) {
                ends.observe(article.lastElementChild);
                whole.observe(target);
            }
        }).observe(pillarView, { childList: true });
    }
    /* THE BAZI CHART VIEWS. The pentagon and the seasonal wheel scroll over the pinned hero; while one of them is across the middle of the screen the
       hero is told which (data-chart-view), and its circles step back so the diagram is read on the Earth alone (baziHero.ts). One observer on the
       two charts, a band across the middle of the page as its root margin; events only. */
    if (typeof IntersectionObserver !== 'undefined') {
        const views = new Map();
        const showing = new Set();
        const apply = () => {
            const target = hero();
            if (!target || !target.classList.contains('kt-bazi-hero'))
                return;
            const first = [...showing][0];
            const view = first ? views.get(first) : undefined;
            if (view)
                target.dataset.chartView = view;
            else
                delete target.dataset.chartView;
        };
        const charts = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting)
                    showing.add(entry.target);
                else
                    showing.delete(entry.target);
            }
            apply();
        }, { root: pillarView, rootMargin: '-34% 0px -34% 0px', threshold: 0 });
        new MutationObserver(() => {
            charts.disconnect();
            views.clear();
            showing.clear();
            for (const chart of pillarView.querySelectorAll('[data-bazi-visual]')) {
                views.set(chart, chart.dataset.baziVisual ?? '');
                charts.observe(chart);
            }
            apply();
        }).observe(pillarView, { childList: true });
    }
    document.fonts?.ready.then(onResize).catch(() => { });
    window.addEventListener('pagehide', () => { style.remove(); }, { once: true });
}
