import { escapeAttribute, escapeHtml } from '../../format.js';
import { AMBIENT_DISC_EVENT, discOnScreen } from '../../premium-earth/ambient/ambientDisc.js';
import { CONNECTIONS_HERO_MANDALA_REACH, CONNECTIONS_HERO_RING, framingForConnectionsHero, planConnectionsHero, } from '../../premium-earth/ambient/connectionsHeroFraming.js';
import { CATEGORY_TEXT, TONE_TEXT, UI_TEXT } from '../presentation/mapContent.js';
import { RING_AREAS, TONE_STROKE, prefersReducedMotion, ringArcPath, ringSegments } from './dimensionDashboard.js';
import { GAUGE_CIRCLE, gaugeGeometry, normaliseValue } from './orbitalGauge.js';
import { MARCELLUS_FACE_CSS } from './marcellusFont.js';
import { R0, REVEAL_TURN_DEG, VIEW, applyMandala, mandalaMarkup, mandalaState } from './mandalaArt.js';
import { applyWreath, wreathMarkup } from './wreathArt.js';
const e = escapeHtml;
const a = escapeAttribute;
const text = (value, lang) => value[lang];
/** The gold gauge's three strokes (units of its 400-unit drawing): about 35% heavier than the first version's (15, 7.5 and 2.8), the bright core most of all. V4 keeps the widths (the gauge stays substantial) and takes the light out of them: a fainter halo and body, a softer gold, a core that is not white-hot. */
export const GAUGE_STROKE = { halo: 20, body: 10, core: 3.8 };
/** The gold gauge's layer: the resting circle, then the pattern segments (no score) or the two arcs that fill from six o'clock (a value). */
function gaugeLayer(map, value, lang) {
    const { cx, cy, r } = GAUGE_CIRCLE;
    const base = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#d2b266" stroke-opacity="0.42" stroke-width="1.4"/><circle cx="${cx}" cy="${cy + r}" r="3.2" fill="#e8cb82" opacity="0.7"/>`;
    if (value === null) {
        const segments = ringSegments(map).map((piece) => {
            const stroke = TONE_STROKE[piece.tone];
            const d = ringArcPath(cx, cy, r, piece.from, piece.to);
            return `<path class="cx-dash-arc" data-area="${a(piece.id)}" d="${d}" fill="none" stroke="${stroke.color}" stroke-width="${stroke.width}" stroke-linecap="${stroke.cap}"${stroke.dash ? ` stroke-dasharray="${stroke.dash}"` : ''}><title>${e(text(CATEGORY_TEXT[piece.id].label, lang))}</title></path>`;
        }).join('');
        return `${base}<g class="cx-dash-segments">${segments}</g>`;
    }
    const g = gaugeGeometry(value);
    /* three strokes make each arc: a wide faint one for the glow, a middle one, a bright thin core (no filter: nothing here is blurred, so nothing is repainted expensively while it grows) */
    const arc = (side, d) => `
    <path class="cx-gauge-${side}" d="${d}" fill="none" stroke="#e6bd55" stroke-opacity="0.08" stroke-width="${GAUGE_STROKE.halo}" stroke-linecap="round"/>
    <path class="cx-gauge-${side}" d="${d}" fill="none" stroke="#e6bd55" stroke-opacity="0.32" stroke-width="${GAUGE_STROKE.body}" stroke-linecap="round"/>
    <path class="cx-gauge-${side}" d="${d}" fill="none" stroke="#f1dc9e" stroke-opacity="0.88" stroke-width="${GAUGE_STROKE.core}" stroke-linecap="round"/>`;
    const tip = (side, at) => `<g class="cx-gauge-tip cx-gauge-tip-${side}"><circle cx="${at.x.toFixed(2)}" cy="${at.y.toFixed(2)}" r="11" fill="#f1dc9e" opacity="0.13"/><circle cx="${at.x.toFixed(2)}" cy="${at.y.toFixed(2)}" r="4.8" fill="#f6e8bd" opacity="0.92"/></g>`;
    return `${base}${arc('r', g.right)}${arc('l', g.left)}${tip('r', g.tipRight)}${tip('l', g.tipLeft)}`;
}
/** The size of the gauge's drawing against the planet's diameter: its 165-unit circle stands CONNECTIONS_HERO_RING planet radii from the centre. */
export const GAUGE_BOX_OF_EARTH = (400 / GAUGE_CIRCLE.r) * (CONNECTIONS_HERO_RING / 2);
/** The size of the mandala's drawing against the planet's diameter: its outer ring (R0 + 90 units) reaches CONNECTIONS_HERO_MANDALA_REACH planet radii. */
export const MANDALA_BOX_OF_EARTH = (VIEW * 2 * CONNECTIONS_HERO_MANDALA_REACH) / (R0 + 90) / 2;
/**
 * The hero's markup: the pinned title, and, on the planet's disc, the gold gauge and the mandala. The reading's own heading and a screen-reader summary are in the reading (romanticIntroHtml); this
 * layer is for the eye.
 */
export function romanticHeroHtml(map, options, extras, lang) {
    const target = normaliseValue(options.value);
    const shown = target === null ? null : options.animate ? 0 : target;
    const pending = target === null;
    const word = pending ? text(UI_TEXT.gaugeCentre, lang) : null;
    return `
    <div class="cx-hero-layer" data-cx-dash data-score="${pending ? 'pending' : 'demo'}" data-value="${pending ? '' : String(target)}">
      <div class="cx-hero-title" aria-hidden="true"><p class="cx-between">${e(extras.kicker)}</p><p class="cx-headline">${e(extras.title)}</p></div>
      <div class="cx-hero-disc" aria-hidden="true">
        ${wreathMarkup(shown ?? 100, GAUGE_BOX_OF_EARTH * 100)}
        <svg class="cx-hero-gauge" viewBox="0 0 400 400" focusable="false" style="width:${(GAUGE_BOX_OF_EARTH * 100).toFixed(2)}%"><g class="cx-dash-gauge-layer">${gaugeLayer(map, shown, lang)}</g></svg>
        <div class="cx-hero-mandala" style="width:${(MANDALA_BOX_OF_EARTH * 100).toFixed(2)}%">${mandalaMarkup('cxm', { word, value: shown ?? 0 })}</div>
      </div>
    </div>`;
}
/** The screen-reader summary of the hero, and its heading, for the top of the reading (the pinned title is for the eye). */
export function romanticIntroHtml(map, title, value, lang) {
    const sr = RING_AREAS.map((id) => `${text(CATEGORY_TEXT[id].label, lang)}: ${text(TONE_TEXT[map.categories.find((category) => category.id === id)?.tone ?? 'limited'].label, lang)}`).join('; ');
    const normal = normaliseValue(value);
    return `<h1 class="cx-sr">${e(title)}</h1><p class="cx-sr" data-cx-sr>${e(text(UI_TEXT.ringTitle, lang))}. ${e(sr)}.${normal === null ? ` ${e(text(UI_TEXT.gaugePending, lang))}` : ''}</p>`;
}
/** The legend of the pending ring: each kind of relationship the six areas found, by its pattern and its word. Part of the reading, so it has a surface of its own. */
export function legendHtml(map, lang) {
    const tones = [...new Set(RING_AREAS.map((id) => map.categories.find((category) => category.id === id)?.tone ?? 'limited'))];
    return `<ul class="cx-dash-legend" aria-hidden="true">${tones.map((tone) => {
        const stroke = TONE_STROKE[tone];
        return `<li><svg viewBox="0 0 30 8" class="cx-dash-key" focusable="false"><path d="M2 4H28" stroke="${stroke.color}" stroke-width="${Math.min(stroke.width, 4.5)}" stroke-linecap="${stroke.cap}"${stroke.dash ? ` stroke-dasharray="${stroke.dash.split(' ').map((part) => Number(part) * 0.55).join(' ')}"` : ''}/></svg><span>${e(text(TONE_TEXT[tone].label, lang))}</span></li>`;
    }).join('')}</ul>`;
}
/**
 * THE QA PANEL: the controls of the demonstration, in a place of their own. It exists only when a review build was asked for a demonstration by the address (?qaGaugeDemo=N); the ordinary page
 * has none of it - no buttons, no ribbon, no number. Fixed at the foot, clear of the MENU capsule's row, small, and outside the reading.
 */
export function qaDemoHtml(value, lang) {
    if (normaliseValue(value) === null)
        return '';
    return `<div class="cx-qa-demo" role="group" aria-label="${a(text(UI_TEXT.demoRibbon, lang))}"><span class="cx-qa-demo-note">${e(text(UI_TEXT.demoRibbon, lang))}</span>${[0, 20, 50, 80, 100].map((step) => `<button type="button" class="cx-qa-demo-step" data-cx-demo="${step}">${step}</button>`).join('')}</div>`;
}
/** The numeral face, as a stylesheet to be added once. */
export const heroFaceCss = () => MARCELLUS_FACE_CSS;
/* --------------------------------------------------------------- one clock -- */
/** Everything the hero draws for one value, derived from that value alone: the single source of the three views. */
export function frameState(value) {
    const geometry = gaugeGeometry(value);
    const petals = mandalaState(value);
    return { number: Math.round(value), degrees: geometry.degrees, glow: petals.glow, petals };
}
const written = new WeakMap();
const writeOnce = (element, signature, write) => {
    if (written.get(element) === signature)
        return;
    written.set(element, signature);
    write();
};
/** Sets the gold arcs, their tips, the number and the mandala to a value. The one place any of them is written while animating; an element whose value has not changed is not touched. `spin` is the mandala's clockwise turn in degrees (0 at rest). */
export function applyValue(root, value, spin = 0) {
    const g = gaugeGeometry(value);
    for (const path of root.querySelectorAll('.cx-gauge-r'))
        writeOnce(path, g.right, () => path.setAttribute('d', g.right));
    for (const path of root.querySelectorAll('.cx-gauge-l'))
        writeOnce(path, g.left, () => path.setAttribute('d', g.left));
    for (const [side, at] of [['r', g.tipRight], ['l', g.tipLeft]]) {
        for (const circle of root.querySelectorAll(`.cx-gauge-tip-${side} circle`))
            writeOnce(circle, `${at.x.toFixed(2)},${at.y.toFixed(2)}`, () => { circle.setAttribute('cx', at.x.toFixed(2)); circle.setAttribute('cy', at.y.toFixed(2)); });
    }
    applyMandala(root, value, true, spin);
    applyWreath(root, value);
}
/**
 * THE REVEAL HAS SETTLED. The result is at rest on its value; from now on (and from now on only, never again turned off by a later demonstration step) the composition is alive: the mandala turns very slowly and
 * breathes, and each layer of the wreath breathes at its own pace. All of it is CSS animation on elements that are layers of their own (transform only, nothing drawn again, no script per frame), switched on
 * by `data-live` on the hero and paused by the host's `data-scrolled`; with reduced motion it is never switched on.
 */
const markSettled = (hero) => {
    hero.setAttribute('data-settled', 'true');
    if (!prefersReducedMotion() && hero.getAttribute('data-live') !== 'true')
        hero.setAttribute('data-live', 'true');
};
/** How long the reveal takes: three seconds, inside the 2.5 to 3.5 the owner asked for. */
export const REVEAL_MS = 3000;
/** The reveal is drawn about thirty times a second at most: the value is always computed from the time, so the pace is exact whatever the rate. */
export const REVEAL_STEP_MS = 32;
/** A smooth cubic ease in and out: a gentle start, a fluid middle and a deceleration into the final value; it never leaves 0..1, so there is no overshoot and no bounce. */
export const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
/**
 * THE ONE CLOCK. The value the number, the gold arcs and the mandala all show at a moment of the reveal: `final * ease(progress)`. There is no other timeline in the hero (no CSS animation moves any
 * of the three), so they can neither start apart, drift, nor finish apart: at progress 0 it is 0 (empty circle, a compact lotus of four petals, 0%) and at progress 1 it is exactly the final value.
 */
export const blendValue = (from, to, progress) => (progress >= 1 ? to : from + (to - from) * easeInOut(Math.max(0, progress)));
export const revealValue = (final, progress) => blendValue(0, final, progress);
/**
 * The mandala's turn at a moment of the reveal, in degrees, from the SAME eased progress as the value: the petal drawing starts REVEAL_TURN_DEG short of upright and arrives at exactly 0 (upright, mirror-symmetric) as the
 * value arrives, so it turns clockwise like a slowly opening sunflower, once, and rests. It is not an endless rotation, and the numeral never takes part in it.
 */
export const revealTurn = (progress) => (progress >= 1 ? 0 : -REVEAL_TURN_DEG * (1 - easeInOut(Math.max(0, progress))));
/** The value the hero currently shows (read from its number). */
export const shownValue = (root) => Number(root.querySelector('.cx-hero-mandala .cx-n')?.textContent ?? 0) || 0;
/** Animates the hero from a value to a target: arcs, number and mandala move together, then settle exactly on the target. Reduced motion shows the target at once. */
export function animateTo(root, target, from, reduced, duration = REVEAL_MS) {
    const hero = root.closest('[data-cx-dash]') ?? root;
    hero.setAttribute('data-value', String(target));
    if (reduced || duration <= 0 || typeof window === 'undefined') {
        applyValue(hero, target);
        markSettled(hero);
        return;
    }
    hero.removeAttribute('data-settled');
    hero.setAttribute('data-animating', 'true');
    const started = performance.now();
    let applied = -Infinity;
    const step = (now) => {
        if (!hero.isConnected)
            return;
        const progress = Math.min(1, (now - started) / duration);
        if (progress < 1 && now - applied < REVEAL_STEP_MS) {
            window.requestAnimationFrame(step);
            return;
        }
        applied = now;
        applyValue(hero, blendValue(from, target, progress), revealTurn(progress));
        if (progress < 1)
            window.requestAnimationFrame(step);
        else {
            applyValue(hero, target);
            hero.removeAttribute('data-animating');
            markSettled(hero);
        }
    };
    window.requestAnimationFrame(step);
}
const played = new WeakSet();
/** Whether the result for this analysis has already played its opening (a re-render, a panel change, a scroll or a return from the menu does not replay it). */
export const hasPlayed = (token) => (token ? played.has(token) : false);
/** The hero waits this long, at most, for the planet to settle into its composition before the reveal starts. */
const SETTLE_WAIT_MS = 1600;
/** The share of the planet's stretch of the reading that must stay in view for the hero to keep its full light. */
export const SCROLLED_BELOW = 0.7;
/**
 * Puts the hero on the shared Earth. `host` is the layer under the scroller, `surface` the scroller, `mount` the reading inside it. Everything is registered once; `show` and `hide` only change
 * what is on screen.
 */
export function createHeroController(host, surface, mount) {
    let visible = false;
    let disc = null;
    let lastSceneWidth = 0;
    let lastPlaced = '';
    let revealTimer = 0;
    let spacerWatch = null;
    let watched = null;
    if (!document.head.querySelector('style[data-connections-face]')) {
        const face = document.createElement('style');
        face.dataset.connectionsFace = 'true';
        face.textContent = heroFaceCss();
        document.head.append(face);
    }
    const sceneSize = () => {
        const box = (disc?.element ?? host).getBoundingClientRect();
        return { width: box.width || window.innerWidth, height: box.height || window.innerHeight };
    };
    /** The planet's disc in the hero layer's own coordinates: the published one, or (no WebGL globe) the plan's. */
    const discInHost = () => {
        const hostBox = host.getBoundingClientRect();
        if (disc) {
            const found = discOnScreen(disc.element.getBoundingClientRect(), disc.framing);
            return { x: found.x - hostBox.left, y: found.y - hostBox.top, diameter: found.diameter };
        }
        const found = discOnScreen({ left: 0, top: 0, width: hostBox.width, height: hostBox.height }, framingForConnectionsHero(hostBox.width, hostBox.height));
        return found;
    };
    const place = () => {
        if (!visible)
            return;
        const sceneNow = sceneSize();
        const titleTop = `${planConnectionsHero(sceneNow.width, sceneNow.height).titleTop.toFixed(1)}px`;
        if (host.style.getPropertyValue('--cx-hero-title-top') !== titleTop)
            host.style.setProperty('--cx-hero-title-top', titleTop);
        const found = discInHost();
        if (!(found.diameter > 0))
            return;
        /* the layer is on the planet's disc: written only when the disc changes (the arrival, a resize), never because of a scroll */
        const signature = `${found.x.toFixed(1)}|${found.y.toFixed(1)}|${found.diameter.toFixed(1)}`;
        if (signature === lastPlaced)
            return;
        lastPlaced = signature;
        host.style.setProperty('--cx-hero-x', `${found.x.toFixed(2)}px`);
        host.style.setProperty('--cx-hero-y', `${found.y.toFixed(2)}px`);
        host.style.setProperty('--cx-hero-d', `${found.diameter.toFixed(2)}px`);
    };
    /** The reading begins just below the planet's resting disc: the first spacer of the reading is as tall as that takes, measured from where it stands. */
    const layout = () => {
        const spacer = mount.querySelector('[data-cx-spacer]');
        if (!visible || !spacer)
            return;
        const scene = sceneSize();
        /* while the page is scrolled the scene may have changed height (the browser's toolbar): the reading must not move under the finger, so only a change of width, or a page at rest, lays it out again */
        if (surface.scrollTop > 2 && Math.abs(scene.width - lastSceneWidth) < 1)
            return;
        lastSceneWidth = scene.width;
        const plan = planConnectionsHero(scene.width, scene.height);
        const surfaceBox = surface.getBoundingClientRect();
        const spacerTop = spacer.getBoundingClientRect().top - surfaceBox.top + surface.scrollTop;
        /* the reading is a column with a gap: the first item after the spacer starts one gap below it */
        const gap = Number.parseFloat(window.getComputedStyle(spacer.parentElement ?? spacer).rowGap) || 0;
        const height = Math.max(0, Math.round(plan.contentTop - spacerTop - gap));
        if (spacer.style.height !== `${height}px`)
            spacer.style.height = `${height}px`;
    };
    /** Whether the reading has mostly left the planet's stretch: a state, not a position. Reduced motion keeps the full light. */
    const setScrolled = (scrolled) => {
        const value = scrolled && !prefersReducedMotion() ? 'true' : 'false';
        if (host.dataset.scrolled !== value)
            host.dataset.scrolled = value;
    };
    /** Watches the reading's empty first stretch (the planet's) with the browser's own observer: no scroll handler, a callback only where the stretch crosses 70% in view. Re-pointed after a redraw. */
    const watchSpacer = () => {
        const spacer = mount.querySelector('[data-cx-spacer]');
        if (spacer === watched)
            return;
        spacerWatch?.disconnect();
        watched = spacer;
        if (!spacer || typeof IntersectionObserver !== 'function')
            return;
        spacerWatch = new IntersectionObserver((entries) => {
            const entry = entries[entries.length - 1];
            if (entry)
                setScrolled(!entry.isIntersecting || entry.intersectionRatio < SCROLLED_BELOW);
        }, { root: surface, threshold: [SCROLLED_BELOW] });
        spacerWatch.observe(spacer);
    };
    const onDisc = (event) => {
        disc = event.detail;
        place();
    };
    const onResize = () => { place(); layout(); };
    window.addEventListener(AMBIENT_DISC_EVENT, onDisc);
    window.addEventListener('resize', onResize);
    const visual = window.visualViewport;
    visual?.addEventListener('resize', onResize);
    /** Waits for the planet to settle in its composition (the first published disc that has stopped moving), or the bound, then runs `go`. */
    const whenSettled = (go) => {
        let done = false;
        const run = () => { if (done)
            return; done = true; window.removeEventListener(AMBIENT_DISC_EVENT, check); window.clearTimeout(revealTimer); go(); };
        const check = (event) => { if (event.detail?.settled)
            run(); };
        window.addEventListener(AMBIENT_DISC_EVENT, check);
        revealTimer = window.setTimeout(run, SETTLE_WAIT_MS);
    };
    return {
        get visible() { return visible; },
        show(html, token) {
            host.innerHTML = html;
            host.hidden = false;
            visible = true;
            lastPlaced = '';
            lastSceneWidth = 0;
            host.dataset.scrolled = 'false';
            const hero = host.querySelector('[data-cx-dash]');
            if (!hero)
                return;
            place();
            layout();
            const target = Number(hero.dataset.value);
            if (hero.dataset.score === 'pending') {
                /* no score: the mandala rests fully formed, its heart says "Pattern" */
                applyMandala(hero, 100, false);
                markSettled(hero);
            }
            else if (Number.isFinite(target)) {
                const already = hasPlayed(token);
                if (token)
                    played.add(token);
                const reduced = prefersReducedMotion();
                if (already || reduced || shownValue(hero) === target) {
                    applyValue(hero, target);
                    markSettled(hero);
                }
                else {
                    applyValue(hero, 0, revealTurn(0));
                    /* the reveal starts once the planet has settled into its place, so the three elements come up on a planet that is already there */
                    whenSettled(() => { if (hero.isConnected)
                        animateTo(hero, target, 0, false); });
                }
            }
            window.requestAnimationFrame(() => {
                place();
                layout();
                watchSpacer();
            });
        },
        hide() {
            window.clearTimeout(revealTimer);
            spacerWatch?.disconnect();
            spacerWatch = null;
            watched = null;
            visible = false;
            host.hidden = true;
            host.innerHTML = '';
            host.dataset.scrolled = 'false';
        },
        layout() { layout(); watchSpacer(); },
        demo(value) {
            const hero = host.querySelector('[data-cx-dash]');
            const to = normaliseValue(value);
            if (hero && to !== null && hero.dataset.score === 'demo')
                animateTo(hero, to, shownValue(hero), prefersReducedMotion());
        },
        destroy() {
            this.hide();
            window.removeEventListener(AMBIENT_DISC_EVENT, onDisc);
            window.removeEventListener('resize', onResize);
            visual?.removeEventListener('resize', onResize);
        },
    };
}
