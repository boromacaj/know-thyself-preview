import { AMBIENT_HERO_EVENT } from './app/premium-earth/ambient/ambientHero.js?v=b5ef5ed';
import { AMBIENT_MOON_EVENT } from './app/premium-earth/ambient/ambientMoonMask.js?v=b5ef5ed';
import { AMBIENT_SUN_EVENT, SUN_MASK_REACH } from './app/premium-earth/ambient/ambientSunMask.js?v=b5ef5ed';
import { ASCENDANT_LIMB_ANGLE, LINE_GAP, RELEASE_SCREEN_SHARE, RING_PAD, astrologyHeroCss } from './app/premium-earth/astrologyBigThree.js?v=b5ef5ed';
import { FLOW_GAP, firstScreenLayout } from './app/premium-earth/numerologyOrbit.js?v=b5ef5ed';
/*
 * THE WESTERN ASTROLOGY HERO: WHERE THE SUN, THE MOON AND THE EARTH ARE, AND WHAT THE LABELS DO ABOUT IT
 * -------------------------------------------------------------------------------------------------------
 * The labels (astrologyBigThree.ts) are rings, hairlines and capsules laid on the scene. This is the only script they need, and it runs on EVENTS, never per frame:
 *
 *   - the globe says where the Sun and the Moon are (AMBIENT_SUN_EVENT, AMBIENT_MOON_EVENT: fractions of its box), where the Earth's disc is (the glow ring's custom
 *     properties on the stage) and how much of the HERO POSE is held (AMBIENT_HERO_EVENT, ambientHero.ts); this lays the labels on those numbers and fades them with the weight;
 *   - the page scrolls natively; one passive listener turns its scroll position into the weight the scene is asked to hold (1 at the top, 0 once the reading has risen half a
 *     screen) and hands it to the globe, once per frame at most. The globe eases to it, and at 1 it is exactly the authored pose, whatever the scene did in between;
 *   - the hero is STICKY in the page (the Numerology hero's architecture): the reading's sections are painted over it, and its in-flow height puts the first section just
 *     below the first screen. A sticky hero's own offset includes the scroll, so its natural top is read from the article's content box.
 *
 * WHAT IT NEVER DOES: place anything from a guess. A label whose body has not been published is not drawn; a Sun or Moon the globe does not report has no label; with the
 * Google Earth (no ambient globe) there is no pose to label, so the scene is simply the Earth under the chevrons.
 *
 * QA-ONLY ADDRESS PARAMETER, to be removed with the other review parameters: ?astroHero=off keeps the hero's markup but never asks the globe for the pose.
 */
const experience = document.getElementById('place-experience');
const stage = document.getElementById('vessel-stage');
const pillarView = document.getElementById('pillar-view');
if (experience instanceof HTMLElement && stage instanceof HTMLElement && pillarView instanceof HTMLElement) {
    const style = document.createElement('style');
    style.dataset.astrologyBigThreeHero = 'true';
    style.textContent = astrologyHeroCss();
    document.head.append(style);
    const poseOff = new URLSearchParams(window.location.search).get('astroHero') === 'off';
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hero = () => pillarView.querySelector('.kt-astro-hero');
    const globe = () => window.knowThyselfAmbientEarth ?? null;
    const number = (value) => {
        const parsed = Number.parseFloat(value);
        return Number.isFinite(parsed) ? parsed : Number.NaN;
    };
    const smooth = (from, to, x) => {
        const t = Math.min(1, Math.max(0, (x - from) / (to - from)));
        return t * t * (3 - 2 * t);
    };
    /* What the scene last said. */
    let sunSilhouette = null;
    let moonSilhouette = null;
    let shown = 0;
    let target = 1;
    let queued = 0;
    let scrollQueued = 0;
    let coverAt = Number.POSITIVE_INFINITY;
    let covered = false;
    let active = false;
    let wanted = false;
    let lastAsked = Number.NaN;
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
    /** Where the hero opens, in the stage's coordinates with the page at its top; the sticky shift is not part of it. */
    const naturalPlace = (element) => {
        const place = layoutPlace(element, pillarView);
        const article = element.parentElement;
        if (!place || !(article instanceof HTMLElement) || element.offsetWidth <= 0)
            return null;
        const articlePlace = layoutPlace(article, pillarView);
        if (!articlePlace)
            return null;
        const top = articlePlace.top + article.clientTop + (number(getComputedStyle(article).paddingTop) || 0) + (number(getComputedStyle(element).marginTop) || 0);
        const paddingTop = number(getComputedStyle(pillarView).paddingTop) || 0;
        return {
            left: pillarView.offsetLeft + pillarView.clientLeft + place.left,
            top: pillarView.offsetTop + pillarView.clientTop + top,
            stick: Math.max(0, top - paddingTop),
        };
    };
    const setLine = (line, x1, y1, x2, y2) => {
        if (!line)
            return;
        const length = Math.hypot(x2 - x1, y2 - y1);
        line.style.width = `${length.toFixed(1)}px`;
        line.style.transform = `translate(${x1.toFixed(1)}px, ${y1.toFixed(1)}px) rotate(${(Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI).toFixed(2)}deg)`;
    };
    const setRing = (ring, cx, cy, r) => {
        if (!ring)
            return;
        ring.style.width = `${(2 * r).toFixed(1)}px`;
        ring.style.height = `${(2 * r).toFixed(1)}px`;
        ring.style.transform = `translate(${(cx - r).toFixed(1)}px, ${(cy - r).toFixed(1)}px)`;
    };
    const setCapsule = (capsule, left, top) => {
        if (capsule)
            capsule.style.transform = `translate(${left.toFixed(1)}px, ${top.toFixed(1)}px)`;
    };
    /** The point on the segment from (ax, ay) to the centre (bx, by) at distance `gap` short of the circle of radius `r` round (bx, by). */
    const towards = (ax, ay, bx, by, r) => {
        const d = Math.hypot(bx - ax, by - ay) || 1;
        const k = (d - r) / d;
        return [ax + (bx - ax) * k, ay + (by - ay) * k];
    };
    /** Everything the labels need from the page: one layout reading, then writes. On events only. */
    const place = () => {
        queued = 0;
        const element = hero();
        if (!element)
            return;
        /* Covered by the reading: nothing is measured and nothing is written (the scene's events go on, the labels are out of sight and take no touch). Placed again the moment it is uncovered. */
        if (covered && element.dataset.ahPlaced === 'on')
            return;
        const spot = naturalPlace(element);
        if (!spot)
            return;
        const width = stage.clientWidth;
        const stageHeight = stage.clientHeight;
        if (width <= 0 || pillarView.hidden)
            return;
        const computed = getComputedStyle(stage);
        const earthX = number(computed.getPropertyValue('--kt-vessel-glow-x'));
        const earthY = number(computed.getPropertyValue('--kt-vessel-glow-y'));
        const earthDiameter = number(computed.getPropertyValue('--kt-vessel-glow-diameter'));
        const haveEarth = Number.isFinite(earthX) && Number.isFinite(earthY) && Number.isFinite(earthDiameter) && earthDiameter > 0;
        const ex = (haveEarth ? earthX : width / 2) - spot.left;
        const ey = (haveEarth ? earthY : stageHeight * 0.4) - spot.top;
        const radius = (haveEarth ? earthDiameter : Math.min(width, stageHeight) * 0.72) / 2;
        const part = (name) => element.querySelector(`[data-callout="${name}"]`);
        const ringOf = (name) => element.querySelector(`.kt-astro-ring[data-mark="${name}"]`);
        const lineOf = (name) => element.querySelector(`.kt-astro-line[data-mark="${name}"]`);
        const size = (capsule) => (capsule ? [capsule.offsetWidth, capsule.offsetHeight] : [0, 0]);
        const margin = 10;
        /* the Sun: its capsule sits to its left, on its own height, joined by a short hairline */
        const sunCapsule = part('sun');
        const [sw, sh] = size(sunCapsule);
        let sunBox = null;
        if (sunSilhouette && sunCapsule) {
            const sx = sunSilhouette.x * width - spot.left;
            const sy = sunSilhouette.y * stageHeight - spot.top;
            const core = (sunSilhouette.rx * width) / SUN_MASK_REACH;
            const ringR = Math.max(13, core * 2.4 + RING_PAD);
            const right = sx - ringR - 28;
            const left = Math.min(width - sw - margin, Math.max(margin, right - sw));
            const top = Math.max(margin, sy - sh / 2);
            setCapsule(sunCapsule, left, top);
            setRing(ringOf('sun'), sx, sy, ringR);
            setLine(lineOf('sun'), left + sw, top + sh / 2, ...towards(left + sw, top + sh / 2, sx, sy, ringR + LINE_GAP));
            sunBox = [left, top, left + sw, top + sh];
        }
        /* the Moon: above and to the left of its ring, clear of the Sun's capsule */
        const moonCapsule = part('moon');
        const [mw, mh] = size(moonCapsule);
        let moonBox = null;
        if (moonSilhouette && moonCapsule) {
            const mx = moonSilhouette.x * width - spot.left;
            const my = moonSilhouette.y * stageHeight - spot.top;
            const ringR = moonSilhouette.rx * width + RING_PAD;
            const left = Math.min(width - mw - margin, Math.max(margin, mx - ringR - 30 - mw));
            let top = Math.max(margin, my - ringR - mh * 0.55);
            if (sunBox && top < sunBox[3] + 8 && top + mh > sunBox[1] - 8 && left < sunBox[2] + 8 && left + mw > sunBox[0] - 8)
                top = sunBox[3] + 8;
            setCapsule(moonCapsule, left, top);
            setRing(ringOf('moon'), mx, my, ringR);
            setLine(lineOf('moon'), left + mw, top + mh / 2, ...towards(left + mw, top + mh / 2, mx, my, ringR + LINE_GAP));
            moonBox = [left, top, left + mw, top + mh];
        }
        /* the Ascendant: a ring on the Earth's lower left limb (the eastern horizon), its capsule just below the planet */
        const risingCapsule = part('ascendant');
        const [aw, ah] = size(risingCapsule);
        let risingBox = null;
        if (risingCapsule) {
            const angle = (ASCENDANT_LIMB_ANGLE * Math.PI) / 180;
            const px = ex + radius * Math.cos(angle);
            const py = ey - radius * Math.sin(angle);
            const left = Math.min(width - aw - margin, Math.max(margin, px - aw * 0.42));
            /* clear of the limb at every x the capsule covers */
            const nearest = Math.min(Math.max(ex, left), left + aw);
            const limb = ey + Math.sqrt(Math.max(0, radius * radius - (nearest - ex) ** 2));
            const top = Math.max(py + 32, limb + 14);
            setCapsule(risingCapsule, left, top);
            setRing(ringOf('ascendant'), px, py, 9);
            setLine(lineOf('ascendant'), px, py + 9, px + (left + aw * 0.42 - px) * 0.5, top);
            risingBox = [left, top, left + aw, top + ah];
        }
        /* the hero's height, and where the cue sits in the free band between the lowest of it and the MENU capsule */
        const lowest = Math.max(ey + radius, risingBox ? risingBox[3] : 0);
        const menu = experience.querySelector('.kt-pillar-nav-button')?.getBoundingClientRect();
        const surface = pillarView.getBoundingClientRect();
        const followingMargin = element.nextElementSibling ? number(getComputedStyle(element.nextElementSibling).marginTop) || 0 : 0;
        const layout = firstScreenLayout({
            formationBottom: lowest + FLOW_GAP,
            heroTop: spot.top,
            viewportHeight: pillarView.clientHeight,
            menuTop: menu && menu.height > 0 ? menu.top - surface.top : null,
            followingMargin,
        });
        element.style.setProperty('--ah-height', `${layout.height.toFixed(2)}px`);
        element.style.setProperty('--ah-cue-top', `${layout.cueTop.toFixed(2)}px`);
        element.style.setProperty('--ah-cx', `${ex.toFixed(2)}px`);
        element.style.setProperty('--ah-stick', `${spot.stick.toFixed(2)}px`);
        element.dataset.ahPlaced = 'on';
        /* once the page has risen past the top of the labelled scene, the labels take no touch and no focus */
        const tops = [ey - radius, sunBox?.[1], moonBox?.[1]].filter((value) => typeof value === 'number');
        coverAt = layout.height + followingMargin - Math.min(...tops);
        covered = pillarView.scrollTop > coverAt;
        sync();
    };
    /** The weight of the pose the scene is asked to hold, from the page's scroll: 1 at the top, 0 once half a screen has gone. A device that asks for less motion holds it. */
    const weightFor = (scrollTop) => (reducedQuery.matches ? 1 : 1 - smooth(0, 1, scrollTop / Math.max(1, pillarView.clientHeight * RELEASE_SCREEN_SHARE)));
    /** Fade, touch and focus follow the pose as it is held and the page as it is scrolled. Writes only when something changed. */
    const sync = () => {
        const element = hero();
        if (!element)
            return;
        const opacity = reducedQuery.matches ? 1 : smooth(0.72, 1, shown);
        element.style.setProperty('--ah-o', opacity.toFixed(3));
        const done = element.dataset.ahDone === 'on';
        const live = opacity > 0.6 && !covered && !done;
        if (live)
            element.dataset.ahLive = 'on';
        else
            delete element.dataset.ahLive;
        for (const capsule of element.querySelectorAll('button.kt-astro-callout')) {
            if (live)
                capsule.removeAttribute('inert');
            else if (!capsule.hasAttribute('inert'))
                capsule.setAttribute('inert', '');
        }
    };
    const schedule = () => {
        if (queued !== 0)
            return;
        queued = window.requestAnimationFrame(place);
    };
    /** Ask the scene for the pose (or let it go) as the hero comes and goes, and for the weight the scroll position gives. */
    const ask = () => {
        if (poseOff)
            return;
        wanted = hero() !== null && !pillarView.hidden && Boolean(experience.dataset.pillarStage);
        const handle = globe();
        if (!handle)
            return;
        /* The scene may not be able to hold a pose yet (it is still starting): it is asked again from its own events until it says it holds one. */
        if (wanted !== active || (wanted && !handle.hero().active)) {
            active = wanted;
            handle.setHero(active);
            lastAsked = Number.NaN;
        }
        if (!active)
            return;
        target = weightFor(pillarView.scrollTop);
        if (target !== lastAsked) {
            lastAsked = target;
            handle.setHeroProgress(target);
        }
    };
    /** From the scene's own events: ask again while the pose is wanted and the scene does not hold it yet (cheap: no DOM read once it does). */
    const askUntilHeld = () => {
        if (wanted && globe()?.hero().active !== true)
            ask();
    };
    /* ---- what the scene says */
    window.addEventListener(AMBIENT_SUN_EVENT, (event) => {
        sunSilhouette = event.detail ?? null;
        askUntilHeld();
        schedule();
    });
    window.addEventListener(AMBIENT_MOON_EVENT, (event) => {
        moonSilhouette = event.detail ?? null;
        schedule();
    });
    window.addEventListener(AMBIENT_HERO_EVENT, (event) => {
        const detail = event.detail;
        shown = detail.active ? detail.progress : 0;
        sync();
    });
    /* ---- what the page does */
    pillarView.addEventListener('scroll', () => {
        if (scrollQueued !== 0)
            return;
        scrollQueued = window.requestAnimationFrame(() => {
            scrollQueued = 0;
            ask();
            const next = pillarView.scrollTop > coverAt;
            if (next !== covered) {
                covered = next;
                sync();
                if (!covered)
                    schedule();
            }
        });
    }, { passive: true });
    new MutationObserver(() => { ask(); schedule(); }).observe(pillarView, { childList: true });
    new MutationObserver(() => { ask(); schedule(); }).observe(pillarView, { attributes: true, attributeFilter: ['hidden'] });
    new MutationObserver(() => { ask(); schedule(); }).observe(experience, { attributes: true });
    const onResize = () => { schedule(); };
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', onResize, { passive: true });
    window.visualViewport?.addEventListener('resize', onResize, { passive: true });
    if (typeof ResizeObserver !== 'undefined') {
        const resizes = new ResizeObserver(onResize);
        resizes.observe(pillarView);
        new MutationObserver(() => { resizes.disconnect(); resizes.observe(pillarView); const article = pillarView.firstElementChild; if (article)
            resizes.observe(article); }).observe(pillarView, { childList: true });
    }
    document.fonts?.ready.then(onResize).catch(() => { });
    /* a device that changes its motion setting while the page is open */
    reducedQuery.addEventListener?.('change', () => { lastAsked = Number.NaN; ask(); sync(); });
    /* ---- the end of the reading: the pinned scene fades out instead of being carried off the foot of the page by the sticky release */
    if (typeof IntersectionObserver !== 'undefined') {
        let lastBelow = true;
        let heroWhole = true;
        const apply = () => {
            const element = hero();
            if (!element)
                return;
            if (lastBelow && heroWhole)
                delete element.dataset.ahDone;
            else
                element.dataset.ahDone = 'on';
            sync();
        };
        const ends = new IntersectionObserver((entries) => {
            const last = entries[entries.length - 1];
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
            const element = hero();
            if (element && article?.lastElementChild) {
                ends.observe(article.lastElementChild);
                whole.observe(element);
            }
        }).observe(pillarView, { childList: true });
    }
    window.addEventListener('pagehide', () => { style.remove(); globe()?.setHero(false); }, { once: true });
}
