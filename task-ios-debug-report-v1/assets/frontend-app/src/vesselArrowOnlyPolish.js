import { t } from './app/i18n/uiStrings.js?v=b5ef5ed';
import { AMBIENT_DISC_EVENT, discOnScreen } from './app/premium-earth/ambient/ambientDisc.js?v=b5ef5ed';
import { mountVesselTrack } from './vesselTrackCarousel.js?v=b5ef5ed';
import { AMBIENT_MOON_EVENT, moonCutAboutEarth } from './app/premium-earth/ambient/ambientMoonMask.js?v=b5ef5ed';
const experience = document.getElementById('place-experience');
const vesselStage = document.getElementById('vessel-stage');
const vesselOrbit = document.getElementById('vessel-orbit');
const confirmVessel = document.getElementById('confirm-vessel');
if (experience instanceof HTMLElement
    && vesselStage instanceof HTMLElement
    && vesselOrbit instanceof HTMLElement
    && confirmVessel instanceof HTMLButtonElement) {
    const nav = vesselStage.querySelector('.vessel-carousel-nav');
    const previous = nav?.querySelector('.vessel-carousel-arrow-left');
    const next = nav?.querySelector('.vessel-carousel-arrow-right');
    const allChoices = [...vesselOrbit.querySelectorAll('.vessel-choice')];
    const male = allChoices.find((choice) => choice.dataset.vessel === 'male');
    const undefinedChoice = allChoices.find((choice) => choice.dataset.vessel === 'undefined');
    const female = allChoices.find((choice) => choice.dataset.vessel === 'female');
    const choices = male && undefinedChoice && female ? [male, undefinedChoice, female] : allChoices;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const glowFadeOutMillis = 2000;
    const glowFadeInMillis = 2000;
    const arrowFlashMillis = 360;
    const neighborBaseOpacity = 0.38;
    /*
     * ONE CONDUCTOR, ONE CLOCK.
     * -------------------------
     * changeByArrow below is the only thing in the app that moves the vessel
     * carousel: it binds the arrows in the CAPTURE phase and calls
     * stopImmediatePropagation, so the older vesselArrowCarousel.move never runs,
     * and vesselClickableNeighborGlyphs delegates its taps back to these same
     * arrows. It already owns the out -> swap -> in shape, already has a token
     * guard, and already writes one authoritative opacity per frame for the
     * atmosphere, the symbol, the caption, the Confirm rim and the neighbour rail.
     * Anything else that has to move with the vessel therefore has to move on THIS
     * clock rather than start a second one.
     *
     * The phase duration is declared once, here, and published two ways:
     *   - as --kt-vessel-swap-ms on the vessel stage, so CSS cannot disagree
     *   - in the detail of the three phase events below, so JS cannot either
     *
     * The events are:
     *   knowthyself:vessel-swap-out     t=0, everything begins fading out
     *   knowthyself:vessel-swap-hidden  the out phase has reached zero; swap now
     *   knowthyself:vessel-swap-in      the swap is done, fade back in
     *
     * `sequence` increments once per swap and is carried by all three, so a
     * listener can reject a phase that does not belong to the sequence it is in -
     * the same discipline glowSequenceToken enforces inside this module.
     */
    const vesselSwapMillis = glowFadeOutMillis;
    vesselStage.style.setProperty('--kt-vessel-swap-ms', `${vesselSwapMillis}ms`);
    let swapSequence = 0;
    const announceSwapPhase = (phase, vessel) => {
        window.dispatchEvent(new CustomEvent(`knowthyself:vessel-swap-${phase}`, {
            detail: { vessel, durationMillis: vesselSwapMillis, sequence: swapSequence },
        }));
    };
    /*
     * THE PRESENTATION-ONLY MIRROR OF THE SELECTION.
     *
     * data-vessel-selection has six writers and profileOverviewFlow commits the
     * chosen vessel from it, so WHEN it is written is load-bearing and must not
     * move. data-vessel-glow is a second attribute that carries the same value for
     * paint only: during a swap the conductor sets it at the hidden moment, so a
     * custom property - which cannot transition - changes colour while the thing
     * it colours is invisible. Everywhere else it simply follows the selection, so
     * the five other writers (the profile overview's vessel edit above all) keep
     * their colours.
     */
    const mirrorGlowSelection = () => {
        experience.dataset.vesselGlow = experience.dataset.vesselSelection ?? 'undefined';
    };
    let transitionLocked = false;
    let glowFrame = 0;
    let glowSequenceToken = 0;
    const arrowFlashTimers = new Set();
    /*
     * EFFECT-ONLY LAYER
     * -----------------
     * This ring owns only the coloured atmosphere around the existing globe.
     * It does not participate in layout and it never changes Earth position,
     * orbit position, prompt position, arrow position, or control geometry.
     */
    const glowRing = document.createElement('div');
    glowRing.className = 'kt-vessel-glow-ring';
    glowRing.setAttribute('aria-hidden', 'true');
    /*
     * The atmosphere belongs to the Earth, not to the onboarding chrome, so it is
     * mounted on the stage rather than inside #vessel-orbit.
     *
     * The orbit is the vessel carousel. Once the profile flow starts, that chrome
     * is faded out - #vessel-orbit and .vessel-content both get an inline
     * opacity: 0 !important, and the pillar stages fade #vessel-orbit again - and
     * an ancestor's opacity cannot be undone by a descendant, so anything parented
     * to the carousel goes dark with it. That, not just the display rule below, is
     * why the glow used to die at IDENTITY and stay dead through the Self-Map and
     * the pillars. #earth-map is already exempted from those fades for the same
     * reason: the globe is the persistent scene. The glow is part of that scene.
     *
     * Mounting on the stage costs nothing in geometry: the ring is anchored to
     * --vessel-earth-center-x/y and --vessel-earth-diameter, the same measurement
     * from syncEarthAnchor that sizes the orbit box, so it draws the identical
     * circle it drew as the carousel's child and still tracks the planet on resize.
     */
    /*
     * RIPPLE RINGS ON THE ATMOSPHERE
     * ------------------------------
     * Concentric wavy rings radiating out from the limb, so the halo reads as a
     * disturbed field rather than a smooth wash. They are polar curves, not
     * circles: each ring's radius is r0 + a1*sin(7T + p) + a2*sin(13T + q), which is
     * what gives the reference its rounded-polygon lobes and the small secondary
     * ripple riding on them. The phase advances ring by ring, so the lobes line up
     * into slow spiral arms instead of stacking into a rigid target.
     *
     * NOTHING IS DRAWN INSIDE THE LIMB. The innermost ring starts exactly at the
     * Earth's edge, so the planet's own image is untouched and the rings can only
     * ever radiate outward.
     *
     * ONE FIELD, NOT TWO.
     * This started as two counter-rotating fields with different lobe counts, for
     * interference. On the device that read as exactly what it was - two ring
     * families laid over each other - and the crossings became the thing you
     * noticed instead of the waves. There is now a single family of rings: one
     * wavelength, one direction, one row of waves.
     *
     * MOTION IS ROTATION, AND ROTATION ONLY.
     * Rotation is the one transform that cannot disturb the calibration: it
     * preserves the centre and every radius exactly, so the rim stays welded to the
     * limb no matter where the animation is. Because the phase advances ring by
     * ring, the lobes form spiral arms, and rotating those reads as the field
     * undulating rather than as a wheel turning.
     *
     * WHY IT IS SIZED IN PX AND NOT SCALED.
     * The field is laid out at its true final size from --kt-vessel-glow-diameter
     * and then only rotated. Putting a scale() in the transform instead would make
     * the compositor rasterise the layer at the scaled resolution; at true size the
     * texture is allocated once and the animation is pure compositing, which is what
     * keeps this affordable on a phone.
     */
    const rippleFieldSpecs = [
        { className: 'kt-vessel-ripple-a', extent: 2.0, lobes: 7, ripple: 13, rings: 20 },
    ];
    const buildRippleField = (spec) => {
        /* The SVG is 200 units across and represents extent x the Earth diameter, so
           the limb sits at 100 / extent units from the centre. Everything is drawn
           from there outwards. */
        const limbRadius = 100 / spec.extent;
        const outerRadius = 99;
        const paths = [];
        for (let i = 0; i < spec.rings; i += 1) {
            const t = i / (spec.rings - 1);
            /* Slight ease so the rings crowd near the limb and open up further out,
               the way a ripple loses definition as it travels. */
            const radius = limbRadius + ((outerRadius - limbRadius) * (t ** 1.18));
            /* Undulation swells just off the limb and settles again at the outer edge. */
            const swell = Math.sin(t * Math.PI);
            const lobeAmplitude = (0.6 + (swell * 2.3)) * (0.5 + (radius / 100));
            const rippleAmplitude = (0.2 + (swell * 0.75));
            const phase = t * 2.6;
            const points = [];
            for (let degrees = 0; degrees <= 360; degrees += 5) {
                const angle = (degrees * Math.PI) / 180;
                const r = radius
                    + (Math.sin((spec.lobes * angle) + phase) * lobeAmplitude)
                    + (Math.sin((spec.ripple * angle) - (phase * 1.6)) * rippleAmplitude);
                const x = 100 + (r * Math.cos(angle));
                const y = 100 + (r * Math.sin(angle));
                points.push(`${degrees === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`);
            }
            /* Brightest just outside the limb, gone by the outer edge - the field has to
               dissolve into the existing halo, not end on a visible last ring. */
            const alpha = (0.11 * (1 - t) ** 1.5) + 0.01;
            paths.push(`<path d="${points.join('')}Z" fill="none" stroke="rgba(255,255,255,${alpha.toFixed(3)})" stroke-width="0.55"/>`);
        }
        const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"'
            + ' viewBox="0 0 200 200">'
            + paths.join('')
            + '</svg>';
        return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    };
    /*
     * THE FRAME THE MOON IS CUT OUT OF. The ripple field turns and travels, so a hole in it would turn and travel too; the hole must be in a
     * box that holds still. This one does nothing but hold the field (centred on the Earth, a little larger than the field's reach) and carry
     * the Moon's mask while the Moon is drawn (see the Moon's room below). It is not a second emitter: it holds no image, and the field's
     * own stacking and blending are unchanged by it (the travel anchor was already a stacking context).
     */
    const rippleFrame = document.createElement('div');
    rippleFrame.className = 'kt-vessel-ripple-frame';
    for (const spec of rippleFieldSpecs) {
        const field = document.createElement('div');
        field.className = `kt-vessel-ripple ${spec.className}`;
        field.style.setProperty('--kt-ripple-extent', String(spec.extent));
        field.style.backgroundImage = buildRippleField(spec);
        /*
         * A zero-size anchor at the Earth's centre whose only job is to carry the
         * outward travel. The field itself already owns a transform - its centring
         * translate, and the 263s spin on top of it - and one element cannot run two
         * animations on the same property, so the travel needs its own box.
         *
         * It is NOT a second emitter. There is still exactly one texture, one copy
         * of the rings, and one decode; this node holds no image of its own.
         */
        const travel = document.createElement('div');
        travel.className = 'kt-vessel-ripple-travel';
        travel.append(field);
        rippleFrame.append(travel);
    }
    glowRing.append(rippleFrame);
    vesselStage.append(glowRing);
    /*
     * CALIBRATING THE GLOW TO THE VISIBLE LIMB
     * ----------------------------------------
     * --vessel-earth-diameter is NOT the planet. syncEarthAnchor derives it from
     * the map box - min(height * 0.304, width * 0.92) - which is a layout estimate
     * that predates the current camera. Measured against the render at the default
     * VESSEL view it came out 246.83px against a true limb of 264.7px, so the rim
     * was drawn about 8.9px inside the planet on every side.
     *
     * The globe is a <gmp-map-3d>, and it publishes the camera, so the limb can be
     * derived instead of guessed. With tilt 0 the camera looks down the disc's axis
     * and the limb is the tangent cone from the camera to the sphere:
     *
     *   D     = earthRadius + range          camera distance from the Earth's centre
     *   theta = asin(earthRadius / D)        angular radius of the limb
     *   focal = (viewportHeight / 2) / tan(fov / 2)      perspective scale, in px
     *   limb  = focal * tan(theta)                       limb radius, in px
     *
     * Verified against the render before it was written: probe circles drawn at
     * 130.5 / 132.36 / 134.5px and magnified 9x put 130.5 on the blue surface and
     * 134.5 out in black, with 132.36 - this formula's answer - lying on the bright
     * edge. Centre needed no correction: the map centre and
     * --vessel-earth-center-x/y agree to 0.1px, which is expected at tilt 0.
     *
     * Because it reads the live camera and the live box, it re-solves on resize and
     * on any camera move rather than baking in a magic number. If the element, the
     * attributes or a flat tilt are missing the property is cleared and the ring
     * falls straight back to --vessel-earth-diameter: a tilted camera turns the
     * limb into an off-centre ellipse, which a single diameter cannot describe, so
     * the old estimate is the honest answer there.
     *
     * Nothing here touches the Earth, the camera, the orbit box or that variable -
     * it only sizes the glow.
     */
    const earthRadiusMetres = 6378137;
    const earthMapElement = document.getElementById('earth-map');
    /*
     * THE AMBIENT GLOBE IS THE AUTHORITY ONCE IT IS THE EARTH.
     * ---------------------------------------------------------
     * Everything above solves the limb from the Google camera. Once a destination is open the Earth is the ambient globe, Google's
     * map is gone, and that solution is both stale (the last range Google had) and about a different planet (the ambient disc is
     * 0.331 of the scene, not Google's 0.326 or the layout estimate's 0.304). The ambient globe says where its disc is on every
     * frame it changes (ambientDisc.ts), so while it exists the glow is laid on that circle and calibrateGlowToLimb stands down.
     * It cannot be left to run beside it: a resize after Google was destroyed re-ran it, found no map, and dropped the ring to the
     * layout estimate - 22px under the real diameter.
     */
    let ambientDisc = null;
    /*
     * THE MOON CUTS THE RIPPLES, EVERYWHERE.
     * ---------------------------------------
     * The ring is stacked ABOVE the globe's canvas (z-index 1: it has to sit above the planet to be seen), so the ripple field is painted across
     * everything the canvas draws - the Moon too, which is a solid body in the canvas. Wherever the Moon was in the field's reach, wave lines ran
     * straight through its disc. (The ambient backdrop, the other wave layer, has had its own cut-out since the Moon became solid; this layer
     * never had one.) The globe publishes the Moon's silhouette every frame it moves (ambientMoonMask.ts); the ripple frame cuts that circle out of
     * itself, with the same feather the backdrop uses (clear to 89% of the Moon's radius, closed by 93% - the radius the Moon is opaque to).
     *
     * No threshold and no band: whenever a Moon is drawn the cut is on, because the field covers every place the Moon can be that matters and a
     * rule of where it may be is exactly what let it bleed. `null` (no Moon: fallback, context lost, globe gone) takes the cut away.
     * The atmosphere's own limb glow is NOT cut: it is the planet's, in front of a Moon that is behind it, and a hole in it where the Moon
     * passes behind the limb would be a dent in the planet's glow.
     *
     * Written from numbers only: the Moon's fractions of the globe's box (the event), the box's size and the disc's framing (cached when the
     * ring was last laid on the disc). Nothing here reads the DOM, so it costs a few style writes on a frame that moved the Moon.
     */
    let moonSilhouette = null;
    let discGeometry = null;
    const applyMoonCut = () => {
        const moon = moonSilhouette;
        const geometry = discGeometry;
        if (!moon || !geometry) {
            if (glowRing.hasAttribute('data-moon-cut'))
                glowRing.removeAttribute('data-moon-cut');
            return;
        }
        /* In CSS px from the Earth's centre - which is the ring's centre, and so the ripple frame's. */
        const cut = moonCutAboutEarth(moon, geometry.framing, geometry.width, geometry.height);
        const style = glowRing.style;
        style.setProperty('--kt-moon-cx', `${cut.cx.toFixed(2)}px`);
        style.setProperty('--kt-moon-cy', `${cut.cy.toFixed(2)}px`);
        style.setProperty('--kt-moon-r', `${cut.r.toFixed(2)}px`);
        if (!glowRing.hasAttribute('data-moon-cut'))
            glowRing.setAttribute('data-moon-cut', '');
    };
    window.addEventListener(AMBIENT_MOON_EVENT, (event) => {
        moonSilhouette = event.detail;
        applyMoonCut();
    });
    const placeGlowOnAmbientDisc = () => {
        const disc = ambientDisc;
        if (!disc || !disc.element.isConnected)
            return;
        /* The keyboard rule above holds here too: the planet is still where it was, so the resting geometry is kept. */
        if (experience?.dataset.keyboardOpen === 'true')
            return;
        const box = disc.element.getBoundingClientRect();
        if (box.width <= 0 || box.height <= 0)
            return;
        const onScreen = discOnScreen(box, disc.framing);
        /* The ring is positioned inside its offset parent, which may be laid out at another scale than the screen. */
        const frame = glowRing.offsetParent ?? vesselStage;
        const frameBox = frame.getBoundingClientRect();
        const scale = frame.offsetWidth > 0 ? frameBox.width / frame.offsetWidth : 1;
        const unit = Number.isFinite(scale) && scale > 0 ? scale : 1;
        const x = (onScreen.x - frameBox.left - frame.clientLeft * unit) / unit;
        const y = (onScreen.y - frameBox.top - frame.clientTop * unit) / unit;
        vesselStage.style.setProperty('--kt-vessel-glow-x', `${x.toFixed(2)}px`);
        vesselStage.style.setProperty('--kt-vessel-glow-y', `${y.toFixed(2)}px`);
        vesselStage.style.setProperty('--kt-vessel-glow-diameter', `${(onScreen.diameter / unit).toFixed(2)}px`);
        discGeometry = { width: box.width / unit, height: box.height / unit, framing: disc.framing };
        applyMoonCut();
    };
    /*
     * THE DISC THE EARTH IS DRAWN ON WHEN THERE IS NO CAMERA TO READ.
     *
     * Only while a reading or the menu is on screen (data-pillar-stage), because the onboarding's own fallback is the
     * layout estimate and is left exactly as it was. In order of preference:
     *
     *   1. --kt-earth-disc-diameter, on #earth-map, if the renderer that draws the planet publishes the diameter of its
     *      disc in pixels. The ring then follows what is drawn, whoever draws it.
     *   2. the canonical Earth of the product: the diameter the offline globe is framed to when it takes over from the
     *      Google one - 0.331 of the scene's height, held inside 0.82 of its width, centred (the same figures as
     *      framingForScene in the ambient renderer, which says it frames the globe to "the circle the glow ring and the
     *      vessel symbol hug"). The centre is the map's centre, which --vessel-earth-center-x/y already is.
     *
     * The estimate this replaces is min(height x 0.304, width x 0.92): 246.8px on a 375x812 phone against a planet of
     * 269px, so the rim sat about 11px inside the limb all the way round.
     */
    const canonicalEarthHeightRatio = 0.331;
    const canonicalEarthWidthRatio = 0.82;
    const earthDiscOf = (viewportHeight) => {
        if (experience?.dataset.pillarStage !== 'pillar')
            return null;
        const published = Number.parseFloat(earthMapElement ? getComputedStyle(earthMapElement).getPropertyValue('--kt-earth-disc-diameter') : '');
        if (Number.isFinite(published) && published > 0)
            return published;
        const width = earthMapElement?.clientWidth ?? 0;
        if (width <= 0)
            return null;
        return Math.min(viewportHeight * canonicalEarthHeightRatio, width * canonicalEarthWidthRatio);
    };
    const calibrateGlowToLimb = () => {
        if (ambientDisc)
            return;
        /* THE KEYBOARD MUST NOT BE ABLE TO RESIZE THE GLOW.
           While the soft keyboard is open, whatever the browser does to the viewport
           or to the map's own surface, the last resting value is kept. The rim is
           drawn on a planet the user can still see behind the keyboard; recomputing it
           against a keyboard-shaped viewport is how the rim ends up a different size
           from the globe it is supposed to sit on. Nothing is recalculated until the
           keyboard is gone. */
        if (experience?.dataset.keyboardOpen === 'true')
            return;
        const globe = earthMapElement?.querySelector('gmp-map-3d');
        /* The RESTING scene height, in this order of preference:
             1. --kt-scene-height, which the keyboard module pins .earth-map itself to,
             2. clientHeight as a fallback before that variable is published.
           Deliberately NOT getBoundingClientRect().height, which is the RENDERED
           height and folds in any ancestor transform - caught at 8x magnification,
           where the ring re-solved to 2117px. Reading the same variable the scene root
           is sized from guarantees the rim is solved for the same geometry the globe
           is drawn at. */
        const sceneHeight = parseFloat(getComputedStyle(vesselStage).getPropertyValue('--kt-scene-height'));
        const viewportHeight = Number.isFinite(sceneHeight) && sceneHeight > 0
            ? sceneHeight
            : (earthMapElement?.clientHeight ?? 0);
        if (!globe || viewportHeight <= 0) {
            /* NO GOOGLE GLOBE TO READ A CAMERA FROM. Once a reading or the menu is on screen the Earth behind it may be a
               different renderer (the offline globe), which publishes no camera. The ring is then drawn on the disc that
               renderer is framed to - published, or the product's canonical Earth - instead of falling back to the layout
               estimate below, which predates the current framing and sits inside the planet (see earthDiscOf). */
            const disc = viewportHeight > 0 ? earthDiscOf(viewportHeight) : null;
            if (disc === null)
                vesselStage.style.removeProperty('--kt-vessel-glow-diameter');
            else
                vesselStage.style.setProperty('--kt-vessel-glow-diameter', `${disc.toFixed(2)}px`);
            return;
        }
        const range = Number(globe.getAttribute('range'));
        const fov = Number(globe.getAttribute('fov'));
        const tilt = Number(globe.getAttribute('tilt') ?? 0);
        if (!Number.isFinite(range) || range <= 0
            || !Number.isFinite(fov) || fov <= 0 || fov >= 180
            || !Number.isFinite(tilt) || Math.abs(tilt) > 1) {
            vesselStage.style.removeProperty('--kt-vessel-glow-diameter');
            return;
        }
        const cameraDistance = earthRadiusMetres + range;
        if (cameraDistance <= earthRadiusMetres) {
            vesselStage.style.removeProperty('--kt-vessel-glow-diameter');
            return;
        }
        const limbAngle = Math.asin(earthRadiusMetres / cameraDistance);
        const focalPixels = (viewportHeight / 2) / Math.tan((fov * Math.PI) / 360);
        const limbDiameter = 2 * focalPixels * Math.tan(limbAngle);
        if (!Number.isFinite(limbDiameter) || limbDiameter <= 0) {
            vesselStage.style.removeProperty('--kt-vessel-glow-diameter');
            return;
        }
        vesselStage.style.setProperty('--kt-vessel-glow-diameter', `${limbDiameter.toFixed(2)}px`);
    };
    calibrateGlowToLimb();
    window.addEventListener('resize', calibrateGlowToLimb, { passive: true });
    window.addEventListener('orientationchange', calibrateGlowToLimb, { passive: true });
    window.addEventListener(AMBIENT_DISC_EVENT, (event) => {
        ambientDisc = event.detail;
        if (ambientDisc) {
            placeGlowOnAmbientDisc();
            return;
        }
        /* The ambient globe is gone: Google's camera is the authority again, and the ring's own centre is the layout's. */
        discGeometry = null;
        applyMoonCut();
        vesselStage.style.removeProperty('--kt-vessel-glow-x');
        vesselStage.style.removeProperty('--kt-vessel-glow-y');
        vesselStage.style.removeProperty('--kt-vessel-glow-diameter');
        calibrateGlowToLimb();
    });
    /* The disc's own box can move or change scale without the globe saying anything: re-lay the ring on any such change. */
    window.addEventListener('resize', placeGlowOnAmbientDisc, { passive: true });
    window.addEventListener('orientationchange', placeGlowOnAmbientDisc, { passive: true });
    window.visualViewport?.addEventListener('resize', placeGlowOnAmbientDisc, { passive: true });
    if (typeof ResizeObserver !== 'undefined')
        new ResizeObserver(placeGlowOnAmbientDisc).observe(vesselStage);
    /* The camera events the 3D map publishes. Listened to on the element rather
       than polled, so an idle screen costs nothing. */
    /* The disc to hug changes with the screen the Earth is behind, and with the renderer that draws it. */
    if (experience instanceof HTMLElement) {
        new MutationObserver(calibrateGlowToLimb).observe(experience, { attributes: true, attributeFilter: ['data-pillar-stage'] });
    }
    if (earthMapElement) {
        new MutationObserver(calibrateGlowToLimb).observe(earthMapElement, { attributes: true, attributeFilter: ['data-earth-map-state', 'style'] });
        for (const cameraEvent of ['gmp-rangechange', 'gmp-tiltchange', 'gmp-centerchange']) {
            earthMapElement.addEventListener(cameraEvent, calibrateGlowToLimb);
        }
        /* The element is upgraded and sized asynchronously, so re-solve when its box
           changes instead of assuming the first read was the final one. */
        if (typeof ResizeObserver !== 'undefined') {
            new ResizeObserver(calibrateGlowToLimb).observe(earthMapElement);
        }
    }
    /*
     * INACTIVE NEIGHBOUR PREVIEWS
     * ---------------------------
     * These are visual-only previews of the two choices reached by the left/right
     * arrows. They sit on the same horizontal span as the arrow controls, but on
     * the exact Y horizon of the active gender mark in the globe. Keeping them in
     * this authoritative controller guarantees their state changes at the same
     * midpoint as the real vessel selection.
     */
    const neighborRail = document.createElement('div');
    neighborRail.className = 'kt-vessel-neighbor-preview-rail';
    neighborRail.setAttribute('aria-hidden', 'true');
    const previousPreview = document.createElement('div');
    previousPreview.className = 'kt-vessel-neighbor-preview kt-vessel-neighbor-preview-left';
    const nextPreview = document.createElement('div');
    nextPreview.className = 'kt-vessel-neighbor-preview kt-vessel-neighbor-preview-right';
    neighborRail.append(previousPreview, nextPreview);
    vesselStage.append(neighborRail);
    const glowPalette = {
        male: { rgb: '104, 184, 255', soft: '182, 224, 255' },
        female: { rgb: '255, 118, 154', soft: '255, 164, 184' },
        undefined: { rgb: '250, 252, 255', soft: '255, 255, 255' },
    };
    const previewGlyphs = {
        male: `
      <svg class="kt-vessel-neighbor-glyph" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <circle cx="24" cy="24" r="10"></circle>
        <path d="M31.1 16.9 L39 9"></path>
        <path d="M33 9 H39 V15"></path>
      </svg>
    `,
        female: `
      <svg class="kt-vessel-neighbor-glyph" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <circle cx="24" cy="24" r="10"></circle>
        <path d="M24 34 V43"></path>
        <path d="M19 39 H29"></path>
      </svg>
    `,
        undefined: `
      <svg class="kt-vessel-neighbor-glyph" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <circle cx="24" cy="24" r="10"></circle>
      </svg>
    `,
    };
    const setGlowColour = (vessel) => {
        const palette = glowPalette[vessel] ?? glowPalette.undefined;
        glowRing.style.setProperty('--kt-vessel-glow-rgb', palette.rgb);
        glowRing.style.setProperty('--kt-vessel-glow-soft-rgb', palette.soft);
    };
    const setConfirmColour = (vessel) => {
        const palette = glowPalette[vessel] ?? glowPalette.undefined;
        confirmVessel.style.setProperty('--kt-confirm-vessel-rgb', palette.rgb);
        confirmVessel.style.setProperty('--kt-confirm-vessel-soft-rgb', palette.soft);
    };
    const setGlowOpacity = (opacity) => {
        glowRing.style.setProperty('opacity', opacity.toFixed(4), 'important');
    };
    const setConfirmEffectOpacity = (opacity) => {
        confirmVessel.style.setProperty('--kt-confirm-vessel-effect-opacity', opacity.toFixed(4));
    };
    const setNeighborOpacity = (opacity) => {
        neighborRail.style.setProperty('opacity', (neighborBaseOpacity * opacity).toFixed(4), 'important');
    };
    /*
     * Fade the whole visual symbol container, not only the nested SVG glyph.
     * This guarantees the visible male/female/undefined mark follows the same
     * opacity as the atmosphere even if another module replaces the inner SVG.
     * Opacity only: no position, size, transform or layout property is touched.
     *
     * The gender caption (Male / Female / Do not define) is part of the same
     * visual unit. It used to stay fully opaque while only the mark faded, so at
     * the midpoint - where applySelection swaps the active choice - the text
     * snapped instantly against a still-fading vessel. Fading it on the very same
     * curve means the swap happens while both are at zero and the new pair
     * appears together.
     */
    const setSymbolOpacity = (choice, opacity) => {
        const value = opacity.toFixed(4);
        const symbol = choice.querySelector('.vessel-symbol');
        if (symbol instanceof HTMLElement)
            symbol.style.setProperty('opacity', value, 'important');
        const label = choice.querySelector('.vessel-label');
        if (label instanceof HTMLElement)
            label.style.setProperty('opacity', value, 'important');
    };
    const activeChoice = () => (choices.find((choice) => choice.classList.contains('is-carousel-active'))
        ?? choices.find((choice) => choice.dataset.carouselSlot === 'active')
        ?? choices[0]);
    const renderPreview = (target, choice) => {
        const vessel = choice.dataset.vessel ?? 'undefined';
        const palette = glowPalette[vessel] ?? glowPalette.undefined;
        target.dataset.vessel = vessel;
        target.style.setProperty('--kt-neighbor-rgb', palette.rgb);
        target.style.setProperty('--kt-neighbor-soft-rgb', palette.soft);
        target.innerHTML = previewGlyphs[vessel] ?? previewGlyphs.undefined;
    };
    const renderNeighborPreviews = () => {
        const current = activeChoice();
        const index = Math.max(0, choices.indexOf(current));
        const previousIndex = (index - 1 + choices.length) % choices.length;
        const nextIndex = (index + 1) % choices.length;
        renderPreview(previousPreview, choices[previousIndex]);
        renderPreview(nextPreview, choices[nextIndex]);
    };
    const applySelection = (incomingChoice) => {
        for (const choice of choices) {
            const isActive = choice === incomingChoice;
            choice.dataset.carouselSlot = isActive ? 'active' : 'hidden';
            choice.classList.toggle('is-carousel-active', isActive);
            choice.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        }
        const vessel = incomingChoice.dataset.vessel ?? 'undefined';
        experience.dataset.vesselSelection = vessel;
    };
    const stopGlowTween = () => {
        glowSequenceToken += 1;
        if (glowFrame)
            window.cancelAnimationFrame(glowFrame);
        glowFrame = 0;
    };
    const setEffectOpacity = (choice, opacity) => {
        setGlowOpacity(opacity);
        setSymbolOpacity(choice, opacity);
        setConfirmEffectOpacity(opacity);
        setNeighborOpacity(opacity);
    };
    const tweenVesselEffect = (choice, from, to, duration, token, done) => {
        const startedAt = performance.now();
        setEffectOpacity(choice, from);
        const tick = (now) => {
            if (token !== glowSequenceToken)
                return;
            const progress = Math.min(1, Math.max(0, (now - startedAt) / duration));
            const eased = progress * progress * (3 - (2 * progress));
            const opacity = from + ((to - from) * eased);
            // One authoritative value per frame for the atmosphere, visible vessel
            // symbol, Confirm Vessel rim/bloom AND the faded neighbour previews.
            setEffectOpacity(choice, opacity);
            if (progress < 1) {
                glowFrame = window.requestAnimationFrame(tick);
                return;
            }
            glowFrame = 0;
            done();
        };
        glowFrame = window.requestAnimationFrame(tick);
    };
    const finishTransition = (incomingChoice) => {
        setEffectOpacity(incomingChoice, 1);
        confirmVessel.disabled = false;
        confirmVessel.textContent = t('onb.vessel.confirm');
        transitionLocked = false;
        nav?.classList.remove('is-soft-switching');
        /* The sequence is over: the stage stops advertising a swap, and every rule
           written against it hands back to its own resting transition. */
        vesselStage.classList.remove('is-vessel-swapping');
        delete vesselStage.dataset.vesselSwapPhase;
        const vessel = incomingChoice.dataset.vessel ?? 'undefined';
        window.dispatchEvent(new CustomEvent('knowthyself:vessel-carousel-change', {
            detail: { vessel },
        }));
    };
    const flashArrow = (button) => {
        if (!(button instanceof HTMLButtonElement))
            return;
        button.classList.remove('is-arrow-flash');
        void button.offsetWidth;
        button.classList.add('is-arrow-flash');
        const timer = window.setTimeout(() => {
            button.classList.remove('is-arrow-flash');
            arrowFlashTimers.delete(timer);
        }, reducedMotion.matches ? 80 : arrowFlashMillis);
        arrowFlashTimers.add(timer);
    };
    const changeByArrow = (event, direction) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        const pressedArrow = direction === 'next' ? next : previous;
        flashArrow(pressedArrow);
        if (transitionLocked || vesselStage.classList.contains('is-profile-flow') || choices.length < 2)
            return;
        const outgoingChoice = activeChoice();
        const currentIndex = choices.indexOf(outgoingChoice);
        const delta = direction === 'next' ? 1 : -1;
        const nextIndex = (currentIndex + delta + choices.length) % choices.length;
        const incomingChoice = choices[nextIndex];
        if (!incomingChoice || incomingChoice === outgoingChoice)
            return;
        transitionLocked = true;
        nav?.classList.add('is-soft-switching');
        confirmVessel.disabled = true;
        stopGlowTween();
        const token = glowSequenceToken;
        /* t=0. One class and one phase for the whole sequence, announced before a
           single pixel moves, so every follower starts on the same frame. */
        swapSequence += 1;
        vesselStage.classList.add('is-vessel-swapping');
        vesselStage.dataset.vesselSwapPhase = 'out';
        announceSwapPhase('out', outgoingChoice.dataset.vessel ?? 'undefined');
        if (reducedMotion.matches) {
            setEffectOpacity(outgoingChoice, 0);
            setSymbolOpacity(incomingChoice, 0);
            applySelection(incomingChoice);
            const vessel = incomingChoice.dataset.vessel ?? 'undefined';
            setGlowColour(vessel);
            setConfirmColour(vessel);
            renderNeighborPreviews();
            /* Reduced motion collapses the sequence to a single instant, but it is
               still the same three phases in the same order, so no follower is left
               mid-fade with nothing coming to finish it. */
            mirrorGlowSelection();
            vesselStage.dataset.vesselSwapPhase = 'in';
            announceSwapPhase('hidden', vessel);
            announceSwapPhase('in', vessel);
            finishTransition(incomingChoice);
            return;
        }
        /*
         * ONE AUTHORITATIVE ARROW SEQUENCE
         * --------------------------------
         * 1) Current atmospheric glow + symbol + Confirm Vessel colour + neighbour
         *    previews fade OUT together for exactly two seconds.
         * 2) Only at complete transparency do we swap vessel selection, colours and
         *    the two inactive neighbour previews.
         * 3) New atmosphere + symbol + Confirm Vessel colour + neighbour previews
         *    fade IN together for exactly two seconds.
         *
         * Only visual opacity/colour changes. No geometry or positioning is touched.
         */
        tweenVesselEffect(outgoingChoice, 1, 0, glowFadeOutMillis, token, () => {
            if (token !== glowSequenceToken)
                return;
            // Arm the complete incoming symbol at zero before making its parent active.
            setSymbolOpacity(incomingChoice, 0);
            applySelection(incomingChoice);
            const vessel = incomingChoice.dataset.vessel ?? 'undefined';
            setGlowColour(vessel);
            setConfirmColour(vessel);
            renderNeighborPreviews();
            /* EVERYTHING THAT CANNOT BE TWEENED CHANGES HERE, AT ZERO.
               Custom properties do not transition, so the one instant at which a
               colour may be swapped without it being seen is this one. */
            mirrorGlowSelection();
            announceSwapPhase('hidden', vessel);
            /* ...and the whole cast starts back up together, on the same frame. */
            vesselStage.dataset.vesselSwapPhase = 'in';
            announceSwapPhase('in', vessel);
            tweenVesselEffect(incomingChoice, 0, 1, glowFadeInMillis, token, () => {
                if (token !== glowSequenceToken)
                    return;
                finishTransition(incomingChoice);
            });
        });
    };
    const handlePrevious = (event) => changeByArrow(event, 'previous');
    const handleNext = (event) => changeByArrow(event, 'next');
    previous?.addEventListener('click', handlePrevious, true);
    next?.addEventListener('click', handleNext, true);
    /*
     * THE SWIPE IS THE TRACK'S (vesselTrackCarousel.ts): the three marks follow the finger across the whole screen and settle into the centre.
     * The legacy swipe in vesselArrowCarousel moves the carousel itself, without the out -> swap -> in sequence, the lock and the colour hand-over, so it
     * is still cut off here (stopImmediatePropagation in the capture phase, before it can hear anything). The arrow buttons are no longer shown or tapped:
     * the keyboard and the profile editor still press them, and that is still the conductor's sequence.
     */
    const blockLegacySwipe = (event) => {
        const target = event.target;
        if (target instanceof Element && target.closest('.vessel-carousel-arrow'))
            return;
        event.stopImmediatePropagation();
    };
    for (const type of ['pointerdown', 'pointerup', 'pointercancel']) {
        vesselOrbit.addEventListener(type, blockLegacySwipe, true);
        nav?.addEventListener(type, blockLegacySwipe, true);
    }
    const effectsLayer = vesselStage.querySelector('.kt-earth-effects-layer');
    const unmountTrack = mountVesselTrack({
        experience,
        vesselStage,
        nav,
        confirmVessel,
        choices,
        palette: glowPalette,
        glyphs: previewGlyphs,
        leftPreview: previousPreview,
        rightPreview: nextPreview,
        reducedMotion,
        isBusy: () => transitionLocked,
        setBusy: (busy) => { transitionLocked = busy; },
        select: (choice) => {
            applySelection(choice);
            mirrorGlowSelection();
            renderNeighborPreviews();
            window.dispatchEvent(new CustomEvent('knowthyself:vessel-carousel-change', {
                detail: { vessel: choice.dataset.vessel ?? 'undefined' },
            }));
        },
        setEffect: (opacity) => {
            stopGlowTween();
            setGlowOpacity(opacity);
            setConfirmEffectOpacity(opacity);
            for (const choice of choices)
                setSymbolOpacity(choice, opacity);
            if (effectsLayer) {
                effectsLayer.style.setProperty('transition', 'none', 'important');
                effectsLayer.style.setProperty('opacity', opacity.toFixed(4), 'important');
            }
        },
        setBlend: (rgb, soft) => {
            glowRing.style.setProperty('--kt-vessel-glow-rgb', rgb);
            glowRing.style.setProperty('--kt-vessel-glow-soft-rgb', soft);
            confirmVessel.style.setProperty('--kt-confirm-vessel-rgb', rgb);
            confirmVessel.style.setProperty('--kt-confirm-vessel-soft-rgb', soft);
        },
        finish: (choice) => {
            const vessel = choice.dataset.vessel ?? 'undefined';
            setGlowColour(vessel);
            setConfirmColour(vessel);
            for (const other of choices)
                setSymbolOpacity(other, 1);
            if (effectsLayer) {
                effectsLayer.style.removeProperty('opacity');
                effectsLayer.style.removeProperty('transition');
            }
            finishTransition(choice);
        },
    });
    const style = document.createElement('style');
    style.dataset.vesselArrowOnlyPolish = 'true';
    style.textContent = `
    .vessel-carousel-arrow-left { grid-column: 1 !important; }
    .vessel-carousel-arrow-right { grid-column: 3 !important; }

    /* Vertical movement stays the page's; a horizontal one is the swipe. */
    .vessel-orbit.is-arrow-carousel,
    .vessel-carousel-nav,
    .vessel-orbit.is-arrow-carousel:active,
    .vessel-carousel-nav:active {
      cursor: default !important;
      touch-action: pan-y !important;
    }

    .vessel-carousel-nav.is-soft-switching .vessel-carousel-arrow {
      pointer-events: none !important;
    }

    /* The original VESSEL stylesheet globally dimmed the real map to 34% and
       painted a dark veil over the whole stage as soon as VESSEL became active.
       The modern ring must be an additive light effect only, so neutralize those
       two legacy effects for every VESSEL state, not only legacy focused state. */
    .place-experience.vessel-active .earth-map {
      opacity: 1 !important;
      filter: none !important;
    }

    .place-experience.vessel-active .vessel-stage {
      background: none !important;
    }

    /* The active vessel symbol is now only a transparent carrier for the gender
       mark. Remove the inherited soap/glass fill and backdrop blur completely so
       the live Earth keeps its original luminance when the atmospheric ring
       appears. This changes visual effects only; no geometry is touched. */
    .vessel-stage:not(.is-profile-flow)
      .vessel-orbit.is-arrow-carousel
      .vessel-choice .vessel-symbol {
      border-color: transparent !important;
      box-shadow: none !important;
      background: transparent !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }

    /* Also neutralize the legacy focused-state veil if that class is present
       during the handoff. Keep only the luminous ring; never dim the live map or
       paint a dark stage over it. */
    .place-experience.vessel-focused .earth-map {
      opacity: 1 !important;
      filter: none !important;
    }

    .place-experience.vessel-focused .vessel-stage {
      background: none !important;
    }

    /* ATMOSPHERE, IN TWO LAYERS
       -------------------------
       A single border plus box-shadow cannot be an atmosphere: a box-shadow
       blurs symmetrically off a stroke, so the more of it you ask for the more
       it reads as its own glowing circle. The two jobs are therefore split.

       Layer 1, the RIM, is this element: a thin bright vessel-coloured stroke
       that follows the visible circumference. The element's border box is the
       Earth circle - width/height are 100% of the orbit box, and that box is
       driven by --vessel-earth-diameter from syncEarthAnchor in
       vesselOrbit.core.ts, so the stroke sits on the limb and tracks the planet
       on resize. Its box-shadow is now only a tight halation that makes the rim
       read as lit; an outer box-shadow is clipped to outside the border box, so
       none of it washes over the Earth.

       Layer 2, the ATMOSPHERE, is the ::after below.

       The limb, not the ring, is the light source: the bloom starts at the limb
       and only ever travels outward. */
    .kt-vessel-glow-ring {
      --kt-vessel-rim-width: 1.5px;
      position: absolute;
      /* --kt-vessel-glow-x/y are the centre the ambient globe published (placeGlowOnAmbientDisc); until it has, the layout's. */
      top: var(--kt-vessel-glow-y, var(--vessel-earth-center-y, 50%));
      left: var(--kt-vessel-glow-x, var(--vessel-earth-center-x, 50%));
      /* 1, deliberately, and it must stay below 7.
         The ring used to be a child of .vessel-content, whose own z-index is 1,
         so at stage level the glow always resolved to 1 - underneath every UI
         layer. Moving it onto the stage promoted its 130 from an inner value to
         a stage-level one, and .kt-pillar-surface (the Self-Map and the pillar
         detail) sits at 7, so the glow started painting OVER the cards: the limb
         cut a hard circle across the glass instead of being diffused by it,
         because backdrop-filter can only blur what is painted behind the card.
         pointer-events: none means elementFromPoint still reports the card on
         top, so hit-testing cannot be used to check this - paint order is what
         matters. At 1 the ring is back under .kt-pillar-surface (7), the effects
         layer (455), the carousel nav (460), the neighbour rail (470) and the
         profile flow (520), and above .vessel-cosmos and #earth-map, which is
         exactly where it painted before it was moved. */
      z-index: 1;
      box-sizing: border-box;
      /* --kt-vessel-glow-diameter is the measured limb (see calibrateGlowToLimb).
         --vessel-earth-diameter is the fallback: it is a layout estimate, not the
         planet, so it is only used if the camera cannot be read. */
      width: var(--kt-vessel-glow-diameter, var(--vessel-earth-diameter, 100%));
      height: var(--kt-vessel-glow-diameter, var(--vessel-earth-diameter, 100%));
      border: var(--kt-vessel-rim-width) solid rgba(var(--kt-vessel-glow-soft-rgb, 255,255,255), calc(.96 * var(--kt-earth-glow-gain, 1)));
      border-radius: 50%;
      opacity: 1;
      pointer-events: none;
      background: transparent;
      transform: translate(-50%, -50%);
      transform-origin: 50% 50%;
      box-shadow:
        0 0 2px rgba(255,255,255,calc(.95 * var(--kt-earth-glow-gain, 1))),
        0 0 6px rgba(var(--kt-vessel-glow-soft-rgb, 255,255,255),calc(.55 * var(--kt-earth-glow-gain, 1)));
      will-change: opacity;
    }

    /* Layer 2: the outward atmosphere.
       A radial-gradient, not a shadow, so the falloff curve is authored rather
       than inherited from a blur. It is fully transparent from the centre out to
       the limb, peaks in the first fraction of a percent past it, then decays
       over roughly 1.9 Earth radii. Transparent inside means the Earth image
       stays clean; a monotonic decay outside means there is no second edge for
       the eye to catch, so it never becomes a visible circle of its own.

       The geometry has to be exact, and percentages on an absolutely positioned
       child resolve against the parent's PADDING box, which is the border box
       less the rim. So the pseudo-element is inset by exactly the rim width to
       recover the border box - the Earth circle - and is then magnified with a
       transform, which scales about the shared centre and leaves the gradient's
       own coordinate space untouched. closest-side therefore puts the gradient's
       100% at 3x the Earth radius, and the limb lands on exactly 33.333%. Using
       the same custom property for the inset and the border keeps the two in
       step under any page zoom. */
    .kt-vessel-glow-ring::after {
      content: '';
      position: absolute;
      inset: calc(-1 * var(--kt-vessel-rim-width));
      z-index: -1;
      border-radius: 50%;
      pointer-events: none;
      transform: scale(3);
      transform-origin: 50% 50%;
      background: radial-gradient(circle closest-side,
        rgba(var(--kt-vessel-glow-rgb, 255,255,255),0) 0%,
        rgba(var(--kt-vessel-glow-rgb, 255,255,255),0) 33.0%,
        rgba(var(--kt-vessel-glow-rgb, 255,255,255),calc(.58 * var(--kt-earth-glow-gain, 1))) 33.45%,
        rgba(var(--kt-vessel-glow-rgb, 255,255,255),calc(.40 * var(--kt-earth-glow-gain, 1))) 35.5%,
        rgba(var(--kt-vessel-glow-rgb, 255,255,255),calc(.26 * var(--kt-earth-glow-gain, 1))) 38.5%,
        rgba(var(--kt-vessel-glow-rgb, 255,255,255),calc(.155 * var(--kt-earth-glow-gain, 1))) 43%,
        rgba(var(--kt-vessel-glow-rgb, 255,255,255),calc(.09 * var(--kt-earth-glow-gain, 1))) 49%,
        rgba(var(--kt-vessel-glow-rgb, 255,255,255),calc(.05 * var(--kt-earth-glow-gain, 1))) 57%,
        rgba(var(--kt-vessel-glow-rgb, 255,255,255),calc(.025 * var(--kt-earth-glow-gain, 1))) 67%,
        rgba(var(--kt-vessel-glow-rgb, 255,255,255),calc(.008 * var(--kt-earth-glow-gain, 1))) 80%,
        rgba(var(--kt-vessel-glow-rgb, 255,255,255),0) 95%);
    }

    /* RIPPLE FIELDS. Laid out at their true final size from the measured Earth
       diameter and then ONLY rotated - no scale in the transform, so the layer is
       rasterised once at 1:1 and the animation is pure compositing. The fallback
       to 100% keeps them sane before the diameter is published; it resolves
       against the padding box, which is a rim-width narrower, and for a soft
       radiating field that difference is not visible.
       They are children of the ring, so they inherit its colour tokens, its place
       in the paint order - under every card - and any keyboard pan compensation
       applied to it. Nothing is painted inside the limb: the innermost ring of
       each field starts exactly on the Earth's edge. */
    .kt-vessel-ripple {
      position: absolute;
      /* Zero of the travel anchor's zero height, i.e. the anchor's own origin -
         which is the Earth's centre. The centring translate below still does
         the work; only the box it resolves against has changed. */
      top: 0;
      left: 0;
      z-index: -1;
      width: calc(var(--kt-vessel-glow-diameter, 100%) * var(--kt-ripple-extent, 2));
      height: calc(var(--kt-vessel-glow-diameter, 100%) * var(--kt-ripple-extent, 2));
      margin: 0;
      pointer-events: none;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: 100% 100%;
      opacity: calc(.85 * var(--kt-earth-glow-gain, 1));
      transform: translate(-50%, -50%);
      transform-origin: 50% 50%;
      mix-blend-mode: screen;
    }

    /* A single field, turning slowly. Rotation preserves the centre and every
       radius exactly, which is why it cannot disturb the rim calibration. */
    /*
     * OUTWARD TRAVEL.
     * ---------------
     * The rings move out by scaling the whole field about the Earth's centre.
     * Scale is the only transform that moves every ring outward at once while
     * leaving the geometry alone: it cannot warp the contour, shift a phase or
     * change a ring's shape, because it is applied to the finished texture. The
     * rosette is the same rosette at every frame, just further out.
     *
     * THE LOOP, AND WHAT IT COSTS.
     * The cycle scales by 1.0364, which is the geometric mean of the ratios
     * between neighbouring ring radii (they run 1.0304 to 1.0406, a spread of
     * only 1%). So after one cycle every ring has travelled almost exactly to
     * where its neighbour was, and the field very nearly maps onto itself - the
     * radii realign to within that 1%.
     *
     * "Very nearly" is honest rather than modest. A perfect self-map would need
     * ring i, scaled, to BE ring i+1, and it is not: this texture bakes a
     * different lobe phase into every ring (a 7.8 degree step on a 51 degree
     * period) and a different amplitude. Rotating to compensate is impossible
     * because the 7-lobe and 13-lobe terms want opposite corrections. The wrap
     * therefore carries a small shape mismatch. On a field whose lines sit at
     * 0.01-0.12 alpha it does not read as a jump, but it is there, and the only
     * way to remove it entirely is self-similar ring spacing - which would mean
     * changing the geometry this pass is explicitly not allowed to touch.
     *
     * 2.4s puts the innermost rings at about 1.7px/s and the outer ones at
     * 3.3px/s, which is the same order as the bottom band's rise.
     */
    .kt-vessel-ripple-travel {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      transform-origin: 50% 50%;
      will-change: transform;
      animation: kt-vessel-ripple-travel 2.4s linear infinite;
    }

    @keyframes kt-vessel-ripple-travel {
      from { transform: scale(1); }
      to { transform: scale(1.0364); }
    }

    /* THE MOON'S ROOM IN THE RIPPLES. The frame is still, centred on the Earth, and larger than the field's reach (the field is twice the Earth's
       diameter across and travels out by under 4%): it holds the field and nothing else, so with no Moon it is a plain box. While a Moon is drawn
       (data-moon-cut, written with the three variables by applyMoonCut) its circle is cut out of the frame, a hole a little INSIDE the Moon's own edge -
       clear to 89% of its radius, closed by 93%, the radius the Moon is opaque to - so no wave line crosses the Moon and no ring of bare sky shows round it. */
    .kt-vessel-ripple-frame {
      position: absolute;
      top: 50%;
      left: 50%;
      width: calc(var(--kt-vessel-glow-diameter, 100%) * 2.2);
      height: calc(var(--kt-vessel-glow-diameter, 100%) * 2.2);
      transform: translate(-50%, -50%);
      pointer-events: none;
    }
    .kt-vessel-glow-ring[data-moon-cut] .kt-vessel-ripple-frame {
      -webkit-mask-image: radial-gradient(circle var(--kt-moon-r) at calc(50% + var(--kt-moon-cx)) calc(50% + var(--kt-moon-cy)), transparent 89%, #000 93%);
      mask-image: radial-gradient(circle var(--kt-moon-r) at calc(50% + var(--kt-moon-cx)) calc(50% + var(--kt-moon-cy)), transparent 89%, #000 93%);
    }

    .kt-vessel-ripple-a { animation: kt-vessel-ripple-spin-a 263s linear infinite; }

    @keyframes kt-vessel-ripple-spin-a {
      from { transform: translate(-50%, -50%) rotate(0deg); }
      to { transform: translate(-50%, -50%) rotate(360deg); }
    }

    @media (prefers-reduced-motion: reduce) {
      .kt-vessel-ripple-a { animation: none; }
      /* Parked at 1, which is exactly the static field this was added to. */
      .kt-vessel-ripple-travel { animation: none; transform: scale(1); }
    }

    /* The glow deliberately has NO profile-flow kill switch any more. It used to
       be hidden from IDENTITY onwards because it was sized to the carousel and
       would have sat at the wrong radius once the carousel was replaced; now it
       is sized to the Earth itself, so it is correct on every screen and simply
       stays. It sits at z-index 130, under the effects layer (455), the carousel
       nav (460), the neighbour rail (470) and the profile/pillar surfaces (520),
       so it can never come out in front of the cards or their text. */

    /* Inactive left/right gender previews. The rail uses exactly the same width
       and 56px edge columns as the arrow navigation, but its vertical center is
       the live Earth's center/gender-glyph horizon. A stage-level z-index keeps
       these tiny visual marks above the live map compositor without intercepting
       any touch input. */
    .kt-vessel-neighbor-preview-rail {
      position: absolute;
      top: var(--vessel-earth-center-y, 50%);
      left: var(--vessel-earth-center-x, 50%);
      z-index: 470;
      display: grid;
      grid-template-columns: 56px 1fr 56px;
      width: min(76vw, 430px);
      height: 56px;
      align-items: center;
      pointer-events: none;
      transform: translate(-50%, -50%);
      will-change: opacity;
    }

    .kt-vessel-neighbor-preview {
      width: 42px;
      height: 42px;
      color: rgba(var(--kt-neighbor-soft-rgb, 255,255,255), 1);
      pointer-events: none;
      filter:
        drop-shadow(0 0 3px rgba(255,255,255,.22))
        drop-shadow(0 0 11px rgba(var(--kt-neighbor-rgb,255,255,255),.24));
    }

    .kt-vessel-neighbor-preview-left {
      grid-column: 1;
      justify-self: center;
    }

    .kt-vessel-neighbor-preview-right {
      grid-column: 3;
      justify-self: center;
    }

    .kt-vessel-neighbor-glyph {
      display: block;
      width: 100%;
      height: 100%;
      overflow: visible;
      fill: none;
      stroke: currentColor;
      stroke-width: 2.2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .vessel-stage.is-profile-flow .kt-vessel-neighbor-preview-rail {
      display: none !important;
    }

    /* Symbol opacity is the only symbol property that changes during switching. */
    .vessel-orbit.is-arrow-carousel .vessel-symbol {
      will-change: opacity;
    }

    /* Confirm Vessel gets its vessel-coloured light from one dedicated overlay.
       The body/text stay stable while only this rim+bloom follows the same exact
       2 s OUT / 2 s IN scalar as the globe atmosphere and gender mark. */
    #place-experience .vessel-stage:not(.is-profile-flow) .confirm-vessel,
    #place-experience .vessel-stage:not(.is-profile-flow) .confirm-vessel:disabled,
    #place-experience .vessel-stage:not(.is-profile-flow) .confirm-vessel:not(:disabled) {
      position: relative !important;
      overflow: visible !important;
      border-color: transparent !important;
      color: rgba(250, 249, 245, .97) !important;
      box-shadow: none !important;
    }

    #place-experience .vessel-stage:not(.is-profile-flow) .confirm-vessel::after {
      position: absolute;
      inset: 0;
      border: 1px solid rgba(var(--kt-confirm-vessel-soft-rgb, 255,255,255), .96);
      border-radius: inherit;
      content: "";
      opacity: var(--kt-confirm-vessel-effect-opacity, 1);
      pointer-events: none;
      box-shadow:
        0 0 2px rgba(255,255,255,.78),
        0 0 13px rgba(var(--kt-confirm-vessel-soft-rgb, 255,255,255),.46),
        0 0 32px rgba(var(--kt-confirm-vessel-rgb, 255,255,255),.25);
      will-change: opacity;
    }

    /* Arrow feedback only: no arrow fade. The pressed chevron briefly blooms white. */
    .vessel-carousel-arrow::before {
      transition:
        border-color 140ms ease,
        filter 180ms ease !important;
    }

    .vessel-carousel-arrow.is-arrow-flash::before {
      border-top-color: rgba(255,255,255,1) !important;
      border-left-color: rgba(255,255,255,1) !important;
      filter:
        drop-shadow(0 0 2px rgba(255,255,255,.95))
        drop-shadow(0 0 7px rgba(255,255,255,.82))
        drop-shadow(0 0 14px rgba(255,255,255,.48)) !important;
    }

    .vessel-orbit.is-arrow-carousel .vessel-choice {
      transition: none !important;
    }

    @media (max-width: 420px) {
      .kt-vessel-neighbor-preview {
        width: 38px;
        height: 38px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .vessel-carousel-arrow::before {
        transition: none !important;
      }
    }
  `;
    document.head.append(style);
    const initialVessel = activeChoice().dataset.vessel ?? 'undefined';
    setGlowColour(initialVessel);
    setConfirmColour(initialVessel);
    renderNeighborPreviews();
    setEffectOpacity(activeChoice(), 1);
    /* Set once at startup, so the very first paint already has a glow colour and
       does not have to wait for a swap that may never happen. */
    mirrorGlowSelection();
    /*
     * OUTSIDE A SWAP, THE MIRROR SIMPLY FOLLOWS.
     *
     * The carousel is not the only writer of data-vessel-selection: the profile
     * overview lets the vessel be edited again, and the Earth effects layer is
     * only ever VISIBLE during that profile flow. If the mirror were written only
     * by the swap it would go stale exactly where it is seen. During a swap the
     * conductor owns it, so this defers - the hidden moment writes it instead.
     */
    const glowMirrorObserver = new MutationObserver(() => {
        if (vesselStage.classList.contains('is-vessel-swapping'))
            return;
        mirrorGlowSelection();
    });
    glowMirrorObserver.observe(experience, {
        attributes: true,
        attributeFilter: ['data-vessel-selection'],
    });
    window.addEventListener('pagehide', () => {
        stopGlowTween();
        glowMirrorObserver.disconnect();
        previous?.removeEventListener('click', handlePrevious, true);
        next?.removeEventListener('click', handleNext, true);
        for (const timer of arrowFlashTimers)
            window.clearTimeout(timer);
        arrowFlashTimers.clear();
        for (const type of ['pointerdown', 'pointerup', 'pointercancel']) {
            vesselOrbit.removeEventListener(type, blockLegacySwipe, true);
            nav?.removeEventListener(type, blockLegacySwipe, true);
        }
        unmountTrack();
        neighborRail.remove();
        glowRing.remove();
        style.remove();
    }, { once: true });
}
