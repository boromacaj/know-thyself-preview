import { uiFadeMillis } from './onboardingTransitions.js?v=b5ef5ed';
import { AMBIENT_MOON_EVENT } from './app/premium-earth/ambient/ambientMoonMask.js?v=b5ef5ed';
import { AMBIENT_SUN_EVENT } from './app/premium-earth/ambient/ambientSunMask.js?v=b5ef5ed';
/*
 * AMBIENT BACKDROP
 * ----------------
 * One global background layer with two source-less atmospheric lifts:
 * purple rising from below the bottom edge and warm amber-peach entering from
 * above the top edge. Neither has an on-screen point light.
 *
 * WHERE IT SITS
 * #earth-map is position: fixed, z-index 0, and its own background is opaque
 * (rgb(5,7,6)) - it covers the viewport. So a layer painted behind it would
 * simply never be seen. This one goes directly above the map at z-index 1, which
 * is still below the interaction dock (5), the vessel stage (6) and everything
 * they carry, so it stays behind the whole interface. Being fixed and owned by
 * .place-experience, it is present for every screen of the flow rather than one.
 *
 * WHY GRADIENTS AND NOT BLUR
 * Two mirrored pairs of radial gradients, no blur, no filter, no will-change. A blur stack would
 * cost a compositing layer and repaint work on every scroll for an effect a
 * gradient renders for free, which matters because the phone is the target
 * device. The element is inert: pointer-events: none, aria-hidden.
 *
 * WHY THE LIGHT HAS NO SOURCE
 * The bottom pair is centred at 108% / 100% and the top pair at -8% / 0%.
 * Both sides show a broad elliptical falloff rather than an on-screen lamp.
 * Their geometry and alpha steps match exactly; only the upper palette differs.
 *
 * WHY IT STOPS WHERE IT DOES
 * The main ellipse is 42% of viewport height tall about a centre at 108%, so it
 * reaches zero around 36% of the way up the screen. The globe's lowest point sits
 * just above that, so the Earth keeps its own contrast and only its very bottom
 * edge catches the last, near-zero haze. The top pair mirrors the falloff from
 * above the scene, while its wave band remains shorter and masked early.
 */
const experience = document.getElementById('place-experience');
const earthMap = document.getElementById('earth-map');
/*
 * THE WAVE FIELD: EVENLY SPACED PARALLEL WAVY LINES
 * -------------------------------------------------
 * One wavelength, one amplitude, one spacing: forty lines running across the
 * screen at a constant 4.92-unit step, about 6px on an 812px-tall phone.
 *
 * IT USED TO BE UNEVEN, ON PURPOSE
 * The lines were once packed towards the light below the bottom edge by a power
 * curve - roughly a 3px gap at the bottom opening to 20px at the top - so the
 * field would read as perspective. In practice it did not: the eye saw a tight
 * crust along the very bottom and a sparse scatter above it, with no consistent
 * rhythm anywhere, and the top half read as gaps rather than as pattern. The
 * spacing is now uniform and the depth comes entirely from brightness and the
 * band mask, both of which fade continuously and so cannot draw a boundary.
 *
 * DENSER WITHOUT BEING BRIGHTER
 * Nearly twice the lines of the old field, at an alpha cut to match: total ink
 * over the band is 1.77 alpha-lines against the old 1.76. The extra density is
 * paid for out of the per-line alpha rather than added on top of it, which is
 * what keeps the band atmospheric instead of turning it into noise.
 *
 * ONE CURVE, FORTY TIMES
 * Because every line now shares a spacing AND an amplitude, they are exact
 * vertical translates of a single curve. The tile is therefore one <path> plus
 * forty <use> references rather than forty polylines, and the inlined SVG came
 * out about four times SMALLER than the sparser field it replaces (7KB against
 * 29KB). Collision also becomes impossible by construction: parallel curves at a
 * constant offset cannot converge, whatever the amplitude.
 *
 * SEAMLESS BY CONSTRUCTION
 * One period divides the tile width exactly (60 into 480, eight times), so the
 * curve leaves the right edge on the same value AND the same slope it entered the
 * left with, and the tile repeats on x with no seam. The drift translates by
 * exactly one tile width, so the loop point is a no-op frame.
 *
 * COST
 * Two composited elements, transform-only: the sway wrapper and one drifting
 * layer. No blur, no filter, no opacity animation. The SVG is built once at module
 * load and inlined. prefers-reduced-motion stops both.
 */
const WAVE_TILE_WIDTH = 480;
const WAVE_TILE_HEIGHT = 200;
/* Divides the tile width exactly, which is what makes the tile seamless. Eight
   periods per tile is about six waves across a phone. */
const WAVE_PERIOD = 60;
/* Up from 22. On the 192-unit usable band that is a 4.92-unit step - about 6px
   on an 812px-tall phone - against the old field's 3px at the bottom opening to
   20px at the top. Chosen against the rendered band rather than picked: 34 left
   the gaps still reading as gaps, and 44 started losing the individual line into
   a haze. 40 is the point where the field reads as continuous texture while each
   line is still its own line. */
const WAVE_LINES = 40;
/* The collision floor, in viewBox units: no gap may ever fall below this, or the
   band stops reading as lines and turns into a smear. At the current line count
   the even step is well clear of it, so it now serves as a guard on future
   density changes rather than as a shaper. */
const WAVE_MINIMUM_STEP = 2.5;
/* EVEN SPACING.
   This used to be a power curve (exponent 2.2) that packed the lines towards the
   light below the bottom edge - about a 3px gap at the bottom opening to 20px at
   the top. The idea was sound but the result read as uneven rather than as
   perspective: the eye saw a tight band at the very bottom and a sparse scatter
   above it, with no consistent rhythm anywhere. The field is now evenly spaced,
   and the sense of depth comes from brightness and the band mask instead, both of
   which fade continuously and so cannot produce a visible boundary.

   Kept as a named constant rather than deleted with the arithmetic inlined: the
   spacing rule is the thing most likely to be revisited, and 1 states plainly
   that even spacing is a choice rather than an absence of one. */
/*
 * ONE LINE GAP PER CYCLE, AND THE CYCLE IS THE ONLY LEVER.
 *
 * The rise distance is fixed by the seam: it must be exactly one line spacing
 * or the loop shows. So the speed is set entirely here.
 *
 * This was 13s, which on a ~244px band is 6.1px per cycle - 0.47px/s. That is
 * below the threshold at which a person sees motion at all in a low-contrast
 * field, and the band was reported as "completely static" on a physical phone
 * while every test asserting that it moved passed. The tests were measuring the
 * declaration, not the perception.
 *
 * 3.2s puts it at ~1.9px/s: inside three seconds every line has travelled the
 * whole way to where its neighbour was, which is the smallest movement that
 * reads as continuous flow rather than as a still image. It is still far slower
 * than the eye tracks as "scrolling" - that starts an order of magnitude up.
 */
const WAVE_RISE_SECONDS = 3.2;
/* One tile is half the rise element and holds WAVE_LINES lines, so one line
   spacing is this share of the element's own height. */
const WAVE_RISE_PERCENT = (50 / WAVE_LINES).toFixed(4);
/* Distance between two lines. TILE_HEIGHT divided by the line count exactly, so
   the pattern repeats at the tile edge AND a shift of one step maps every line
   onto its neighbour - which is what lets the rise loop with no reset frame. */
const WAVE_LINE_STEP = WAVE_TILE_HEIGHT / WAVE_LINES;
/* THE INK BUDGET, now spent evenly.
   The field used to bake a per-line fade into the tile: bright at the bottom,
   nearly gone at the top. That cannot survive an upward flow - the brightness
   would travel with the line, so the whole band would brighten and then snap
   back once a cycle, which is exactly the conveyor-belt artefact the motion is
   supposed to avoid. The depth fade now comes entirely from the band mask,
   which is stationary, so lines dim as they RISE INTO it instead of carrying
   their own dimness upward with them.
   The constant is the old field's total ink divided by the line count
   (1.773 alpha-lines over 40), so the band is no brighter than before overall -
   it is the same ink, distributed evenly instead of front-loaded.

   This was briefly raised to 0.072 while chasing the "completely static" report,
   on the theory that a 4% line is too faint for its motion to register. That was
   the wrong lever and the ink-budget test was right to reject it: the band was
   never reported as invisible, only as still. The fix belonged entirely in
   WAVE_RISE_SECONDS, and once the field actually moves at 2.1px/s the existing
   alpha carries it perfectly well - the eye picks up a coherent shift of the
   whole pattern far below the contrast it needs to resolve one static line. */
const WAVE_LINE_ALPHA = 0.0443;
/* THE TOP BAND'S LINES. The same geometry and builder, a little stronger. The bottom lines rise out of purple;
   the top lines receive a warm peach tint to belong to the amber-to-rose upper glow. They sit over the lighter nebula sky,
   so alpha remains 0.078 (under the 0.08 line-work ceiling) rather than the bottom's 0.0443. */
const WAVE_TOP_LINE_ALPHA = 0.078;
const buildWaveTile = (alpha = WAVE_LINE_ALPHA, strokeRgb = '178,168,255') => {
    if (!Number.isInteger(WAVE_TILE_HEIGHT / WAVE_LINES)) {
        throw new Error(`wave step ${WAVE_LINE_STEP} does not divide the tile height exactly; `
            + 'the vertical repeat would seam');
    }
    if (WAVE_LINE_STEP < WAVE_MINIMUM_STEP) {
        throw new Error(`wave spacing ${WAVE_LINE_STEP.toFixed(2)} is below the ${WAVE_MINIMUM_STEP} collision floor`);
    }
    /* Half the gap, as before: the crest of one line reaches exactly halfway to
       the next, so parallel lines at a constant offset can never converge. */
    const amplitude = WAVE_LINE_STEP * 0.5;
    const points = [];
    for (let x = 0; x <= WAVE_TILE_WIDTH; x += 5) {
        /* Centred on y=0; each <use> lifts it to its own line. */
        const y = Math.sin((x / WAVE_PERIOD) * Math.PI * 2) * amplitude;
        points.push(`${x === 0 ? 'M' : 'L'}${x} ${y.toFixed(2)}`);
    }
    /* One line per step, plus one beyond each edge. A curve sitting on the tile
       boundary swings half a step past it, and a background tile clips rather
       than wrapping, so without the overhang the seam would show as a row of
       clipped crests every time the pattern repeats. Amplitude is half the step,
       so only the immediate neighbour can reach across - one extra line at each
       end is exactly enough. */
    const uses = [];
    for (let i = -1; i <= WAVE_LINES; i += 1) {
        uses.push(`<use href="#w" xlink:href="#w" y="${(i * WAVE_LINE_STEP).toFixed(2)}"`
            + ` stroke="rgba(${strokeRgb},${alpha.toFixed(4)})"/>`);
    }
    /* The path carries no stroke of its own, so each <use> supplies it by
       inheritance - a stroke attribute on the path would win over the inherited
       one and every line would come out identical. xlink:href is emitted beside
       href purely for older Safari, which ignores the SVG2 form. */
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"`
        + ` width="${WAVE_TILE_WIDTH}" height="${WAVE_TILE_HEIGHT}"`
        + ` viewBox="0 0 ${WAVE_TILE_WIDTH} ${WAVE_TILE_HEIGHT}" preserveAspectRatio="none">`
        + `<defs><path id="w" d="${points.join('')}" fill="none" stroke-width="0.9"/></defs>`
        + uses.join('')
        + '</svg>';
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};
const experienceDock = document.getElementById('interaction-dock');
if (experience instanceof HTMLElement && !document.getElementById('kt-ambient-backdrop')) {
    const waveTile = buildWaveTile();
    const waveTileTop = buildWaveTile(WAVE_TOP_LINE_ALPHA, '255,204,179');
    const style = document.createElement('style');
    style.textContent = `
    /* Sized to the SCENE, not to the live viewport.
       inset: 0 on a fixed element tracks the layout viewport, and under
       interactive-widget=resizes-content the keyboard shrinks that. The wave band
       hangs off this element's bottom edge, so with inset: 0 the keyboard dragged
       the whole band 267px up the screen - measured - straight into the Earth.
       --kt-scene-height is the resting height the keyboard module publishes and
       pins .earth-map to. Using it here puts the backdrop in the same coordinate
       system as the globe, so the keyboard cannot move either of them: the band
       stays at the bottom of the SCENE and simply continues behind the keyboard,
       exactly as the Earth does. */
    /* IT ARRIVES WITH THE SEARCH BAR, NOT BEFORE IT.
       The opening sequence is a black field, a star field and the Earth arriving;
       a purple wash sitting under all of that from the first frame pre-empts the
       reveal. So the backdrop starts at zero and fades in on exactly the signal
       the search bar uses - the kt-search-visible class the intro sequence puts on
       the dock - with the same duration and the same easing curve, both taken from
       the shared uiFadeMillis constant rather than copied. The two therefore rise
       together as one gesture instead of merely close to each other. */
    .kt-ambient-backdrop {
      opacity: 0;
      transition: opacity ${uiFadeMillis}ms cubic-bezier(0.4, 0, 0.2, 1);
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: var(--kt-scene-height, 100dvh);
      z-index: 1;
      pointer-events: none;
      background:
        radial-gradient(120% 42% at 50% 108%,
          rgba(124, 108, 255, .22) 0%,
          rgba(112, 98, 232, .15) 30%,
          rgba(92, 84, 196, .085) 52%,
          rgba(66, 62, 150, .038) 72%,
          rgba(44, 42, 104, .012) 88%,
          rgba(30, 28, 74, 0) 100%),
        radial-gradient(150% 26% at 50% 100%,
          rgba(88, 80, 190, .085) 0%,
          rgba(70, 66, 156, .035) 45%,
          rgba(40, 38, 96, 0) 100%),
        /* TOP LIGHT: the bottom glow's two elliptical layers reflected across the scene.
           Identical sizes, stops and alphas; only a peach-orange core with a quiet rose tail differs.
           No blur, new element or animation: the light stays soft and stationary under the top waves. */
        radial-gradient(120% 42% at 50% -8%,
          rgba(255, 149, 91, .22) 0%,
          rgba(246, 132, 102, .15) 30%,
          rgba(222, 106, 123, .085) 52%,
          rgba(160, 75, 108, .038) 72%,
          rgba(100, 43, 76, .012) 88%,
          rgba(60, 24, 46, 0) 100%),
        radial-gradient(150% 26% at 50% 0%,
          rgba(236, 121, 101, .085) 0%,
          rgba(182, 79, 112, .035) 45%,
          rgba(94, 40, 74, 0) 100%);
    }

    /* The masked window. 30vh tall and anchored to the bottom, so its top edge is
       around y=568 on an 812px viewport while the Earth's lowest point is at ~538 -
       the field starts BELOW the planet and never reaches the rim. The mask takes
       it to near zero by 88% of its own height (~y=598), leaving roughly 60px of
       empty space between the last visible line and the globe. It cannot read as a
       halo: no radial component, not centred on anything, clipped to a band the
       planet does not occupy. The mask lives HERE and not on the moving children,
       so the fade edge stays put while they drift and sway underneath it. */
    .kt-ambient-waves {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      /* 30% OF THE PINNED SCENE, not 30vh. vh is a viewport unit, so under
         resizes-content the keyboard shrank the band from 244px to 129px even
         once its parent was pinned - the effect still changed shape. A percentage
         resolves against the backdrop, which is the resting scene height, so the
         band is now identical with and without the keyboard: measured 243.6px at
         both, top edge within 0.1px. */
      height: 30%;
      overflow: hidden;
      -webkit-mask-image: linear-gradient(to top,
        rgba(0,0,0,1) 0%,
        rgba(0,0,0,.72) 22%,
        rgba(0,0,0,.3) 52%,
        rgba(0,0,0,0) 88%);
      mask-image: linear-gradient(to top,
        rgba(0,0,0,1) 0%,
        rgba(0,0,0,.72) 22%,
        rgba(0,0,0,.3) 52%,
        rgba(0,0,0,0) 88%);
    }

    /* THE TOP BAND: the same band, hung from the top edge. It is not a second system - it is the same element structure,
       the same tile builder (the lines are a little stronger, see WAVE_TOP_LINE_ALPHA), the same keyframes and the same
       reduced-motion rules, with a modifier class.
       What makes it a relative of the bottom band and not a mirror of it: it is shorter (26% against 30%), its mask has a
       different profile and is gone by 90% of its own height - which is above the planet, whose top edge sits near a third
       of the way down - and, below, it flows DOWNWARD with its own phase while the bottom one rises. Same mask on a
       stationary parent, so the fade never travels with the lines. */
    .kt-ambient-waves.kt-ambient-waves-top {
      top: 0;
      bottom: auto;
      height: 26%;
      -webkit-mask-image: linear-gradient(to bottom,
        rgba(0,0,0,1) 0%,
        rgba(0,0,0,.66) 24%,
        rgba(0,0,0,.28) 54%,
        rgba(0,0,0,0) 90%);
      mask-image: linear-gradient(to bottom,
        rgba(0,0,0,1) 0%,
        rgba(0,0,0,.66) 24%,
        rgba(0,0,0,.28) 54%,
        rgba(0,0,0,0) 90%);
    }

    /* Slow vertical breath for the whole field. alternate + ease-in-out means the
       velocity reaches zero exactly at each turn, so the reversal is invisible -
       there is no discontinuity to see. Inset top and bottom so the sway can never
       drag an edge into view. */
    .kt-ambient-waves-sway {
      position: absolute;
      left: 0;
      right: 0;
      top: -14px;
      bottom: -14px;
      animation: kt-ambient-wave-sway 41s ease-in-out infinite alternate;
    }

    /* THE RISE.
       Twice the band's height and hung half a band above it, so the field always
       has tiled material above and below whatever is on screen; travelling
       upward can never drag an empty edge into the band.
       One tile spans half this element, which is exactly the band height - the
       same line density the field has always had. */
    .kt-ambient-wave-rise {
      position: absolute;
      left: 0;
      right: 0;
      top: -50%;
      height: 200%;
      animation: kt-ambient-wave-rise ${WAVE_RISE_SECONDS}s linear infinite;
    }

    /* One tile wider than the band, so sliding by exactly one tile can never open
       a gap on the trailing edge. The tile now repeats on BOTH axes, because the
       rise needs material above the band as well as beside it. */
    .kt-ambient-wave-layer {
      position: absolute;
      inset: 0;
      left: 0;
      width: calc(100% + ${WAVE_TILE_WIDTH}px);
      background-image: ${waveTile};
      background-repeat: repeat;
      background-size: ${WAVE_TILE_WIDTH}px 50%;
      background-position: 0 100%;
      animation: kt-ambient-wave-drift 190s linear infinite;
    }

    /* THE TOP BAND'S MOTION - the same three animations, not new ones. The rise runs in reverse, so the lines come DOWN from the
       top edge; because it is the same keyframes reversed, the loop is still exactly one line gap and still has no reset frame.
       Each animation starts at its own negative offset and the drift runs the other way, so the two bands are never in step. */
    .kt-ambient-waves-top .kt-ambient-wave-layer { background-image: ${waveTileTop}; }
    .kt-ambient-waves-top .kt-ambient-wave-rise { animation-direction: reverse; animation-delay: -1.3s; }
    .kt-ambient-waves-top .kt-ambient-wave-layer { animation-direction: reverse; animation-delay: -83s; }
    .kt-ambient-waves-top .kt-ambient-waves-sway { animation-direction: alternate-reverse; animation-delay: -19s; }

    /* Exactly one tile per cycle, so the wrap is a no-op frame. 190s over 480px is
       about 2.5px/s - the same pace the field has always drifted at. */
    @keyframes kt-ambient-wave-drift {
      from { transform: translate3d(0, 0, 0); }
      to { transform: translate3d(-${WAVE_TILE_WIDTH}px, 0, 0); }
    }

    /* EXACTLY ONE LINE SPACING per cycle, which is why the loop cannot be seen.
       The lines are evenly spaced and all carry the same alpha, so after rising
       by one gap every line sits precisely where its neighbour was and the frame
       is identical to the one the cycle started on. There is no jump to hide,
       and no long period is needed to hide one: the field simply continues.

       One tile is 50% of this element, and a tile holds ${WAVE_LINES} lines, so
       one spacing is 50/${WAVE_LINES} = ${WAVE_RISE_PERCENT}% of the element's own height.
       Percentages in a transform resolve against that height, so this stays
       exact at any band size. */
    @keyframes kt-ambient-wave-rise {
      from { transform: translate3d(0, 0, 0); }
      to { transform: translate3d(0, -${WAVE_RISE_PERCENT}%, 0); }
    }

    @keyframes kt-ambient-wave-sway {
      from { transform: translate3d(0, 5px, 0); }
      to { transform: translate3d(0, -5px, 0); }
    }

    .kt-ambient-backdrop.is-revealed { opacity: 1; }

    /* ROOM FOR THE MOON. This layer is stacked above the globe's canvas, so wherever the Moon crosses its glow or its wave lines they
       would be painted across a body that is solid in the canvas. While the Moon's silhouette overlaps the glow or a band, its circle is
       cut out of the layer: one radial mask, a hole a little INSIDE the Moon's own edge (clear to 89% of its radius, closed by 93%, which is the
       radius the Moon is opaque to) - so the Moon's feathered rim still sits under the layer and no dark fringe of bare sky shows round it. The
       variables are written by the listener below, only while it is needed; the rule exists only then. */
    .kt-ambient-backdrop[data-moon-mask] {
      -webkit-mask-image: radial-gradient(ellipse var(--kt-moon-rx) var(--kt-moon-ry) at var(--kt-moon-x) var(--kt-moon-y), transparent 89%, #000 93%);
      mask-image: radial-gradient(ellipse var(--kt-moon-rx) var(--kt-moon-ry) at var(--kt-moon-x) var(--kt-moon-y), transparent 89%, #000 93%);
    }

    /* ROOM FOR THE SUN, the same way: a point of blinding light in the canvas must not have wave lines painted across its core and corona. Its clean region
       is a radial hole, fully clear to a third of its radius (the hot core and the inner corona) and feathered back to the backdrop by the full radius (the
       corona, nine core radii out) - no edge, no ring. Its own variables (--kt-sun-*), written only by the Sun's listener below, so neither object can overwrite
       the other. The glare, streak, ghosts and ring are a lens effect over the whole canvas and are not masked. */
    .kt-ambient-backdrop[data-sun-mask] {
      -webkit-mask-image: radial-gradient(ellipse var(--kt-sun-rx) var(--kt-sun-ry) at var(--kt-sun-x) var(--kt-sun-y), rgba(0,0,0,0) 0%, rgba(0,0,0,0) 34%, rgba(0,0,0,.4) 58%, rgba(0,0,0,.82) 82%, #000 100%);
      mask-image: radial-gradient(ellipse var(--kt-sun-rx) var(--kt-sun-ry) at var(--kt-sun-x) var(--kt-sun-y), rgba(0,0,0,0) 0%, rgba(0,0,0,0) 34%, rgba(0,0,0,.4) 58%, rgba(0,0,0,.82) 82%, #000 100%);
    }

    /* BOTH UP AT ONCE: one mask of two gradients, intersected (a point is kept only where BOTH keep it, so either hole shows), not two masked surfaces - the
       cheaper way, and the only one in which neither can undo the other. */
    .kt-ambient-backdrop[data-moon-mask][data-sun-mask] {
      -webkit-mask-image:
        radial-gradient(ellipse var(--kt-moon-rx) var(--kt-moon-ry) at var(--kt-moon-x) var(--kt-moon-y), transparent 89%, #000 93%),
        radial-gradient(ellipse var(--kt-sun-rx) var(--kt-sun-ry) at var(--kt-sun-x) var(--kt-sun-y), rgba(0,0,0,0) 0%, rgba(0,0,0,0) 34%, rgba(0,0,0,.4) 58%, rgba(0,0,0,.82) 82%, #000 100%);
      mask-image:
        radial-gradient(ellipse var(--kt-moon-rx) var(--kt-moon-ry) at var(--kt-moon-x) var(--kt-moon-y), transparent 89%, #000 93%),
        radial-gradient(ellipse var(--kt-sun-rx) var(--kt-sun-ry) at var(--kt-sun-x) var(--kt-sun-y), rgba(0,0,0,0) 0%, rgba(0,0,0,0) 34%, rgba(0,0,0,.4) 58%, rgba(0,0,0,.82) 82%, #000 100%);
      -webkit-mask-composite: source-in;
      mask-composite: intersect;
    }

    /*
     * REDUCED MOTION.
     *
     * All three animations stop - the preference is not negotiable and nothing
     * here is important enough to argue with it.
     *
     * What the still frame must NOT do is read as an empty gradient. The band's
     * structure is its forty lines, and those are drawn by the tile rather than
     * by the motion, so they survive the stop on their own. The one thing that
     * does not survive is the rise element's -50% offset, which is only ever
     * correct while it is being animated; parked, it hangs the tile half a band
     * high and the lower half of the band empties out. Pinning it to the band
     * puts the field back where a reader can see it.
     */
    @media (prefers-reduced-motion: reduce) {
      /* Matching the search bar's own reduced-motion rule, so the pair still
         arrive together when the fade is collapsed. */
      .kt-ambient-backdrop { transition-duration: 1ms; }
      .kt-ambient-waves-sway,
      .kt-ambient-wave-rise,
      .kt-ambient-wave-layer { animation: none; }
      .kt-ambient-wave-rise { top: 0; height: 100%; }
      .kt-ambient-wave-layer { background-size: ${WAVE_TILE_WIDTH}px 100%; }
    }
  `;
    document.head.append(style);
    const backdrop = document.createElement('div');
    backdrop.id = 'kt-ambient-backdrop';
    backdrop.className = 'kt-ambient-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    /* A child of the backdrop, not a sibling: it inherits the backdrop's place in
       the paint order, so the waves are guaranteed to stay in the same layer as the
       glow - above the map, below the whole interface - without a second z-index to
       keep in sync. */
    /* ONE BUILDER, TWO BANDS. The bottom band and its top counterpart are the same structure from the same function, so they
       cannot drift apart: whatever the band is made of, both are made of it. The top one only carries a modifier class. */
    const buildBand = (modifier) => {
        const waves = document.createElement('div');
        waves.className = 'kt-ambient-waves';
        if (modifier)
            waves.classList.add(modifier);
        const sway = document.createElement('div');
        sway.className = 'kt-ambient-waves-sway';
        const rise = document.createElement('div');
        rise.className = 'kt-ambient-wave-rise';
        const waveLayer = document.createElement('div');
        waveLayer.className = 'kt-ambient-wave-layer';
        rise.append(waveLayer);
        sway.append(rise);
        waves.append(sway);
        return waves;
    };
    backdrop.append(buildBand(), buildBand('kt-ambient-waves-top'));
    /*
     * REVEALED BY THE SEARCH BAR, AND THEN IT STAYS.
     *
     * The dock's kt-search-visible class is the intro sequence's own signal for
     * the search bar's fade, so mirroring it is what makes the two arrive together
     * rather than merely at similar times. Read through an observer rather than a
     * CSS :has() selector deliberately: :has() would leave the glow permanently
     * invisible on any engine that does not support it, and a background that can
     * silently never appear is a worse failure than one extra observer.
     * The initial state is applied straight away, because the watchdog can complete
     * the intro before this module is even reached.
     *
     * THE LATCH, and why it had to be added.
     *
     * This used to `toggle` on that class, which tied the backdrop's whole life to
     * the search bar rather than only its entrance. The search bar belongs to the
     * birthplace step; the moment the flow moved on to the vessel, the class came
     * off and the entire ambient field went to opacity 0 and stayed there for the
     * rest of the app - through identity, arrival, review, the pillars, all of it.
     * Measured: opacity 1 on PLACE, opacity 0 one frame after leaving it.
     *
     * So the field's upward motion was not broken, it was simply not on screen
     * anywhere it could be watched. It only ever ran on one screen.
     *
     * Latching keeps the original arrival timing exactly - the reveal still waits
     * for the search bar, still fades in alongside it - and only stops the field
     * being taken away again afterwards. It is a background; nothing later in the
     * flow asks for it to leave.
     */
    const searchIsVisible = () => Boolean(experienceDock?.classList.contains('kt-search-visible'));
    let hasRevealed = false;
    const syncReveal = () => {
        if (!hasRevealed && !searchIsVisible())
            return;
        hasRevealed = true;
        backdrop.classList.add('is-revealed');
    };
    syncReveal();
    if (experienceDock instanceof HTMLElement) {
        new MutationObserver(syncReveal)
            .observe(experienceDock, { attributes: true, attributeFilter: ['class'] });
    }
    /*
     * THE MOON'S ROOM. The ambient globe publishes the Moon's silhouette (ambientMoonMask.ts) as fractions of its box, which is this
     * element's box. It matters only where the glow or a band reaches: the top glow's falloff is gone by 36% of the scene height from the top and
     * 64% from the top (36% from the bottom) - the bands end inside those - so a Moon wholly between them gets no mask at all, which keeps
     * the masked render surface off the compositor for the part of the orbit that does not need it. One listener, written once, with no
     * DOM read: the event carries the numbers.
     */
    const MOON_ROOM_TOP = 0.36;
    const MOON_ROOM_BOTTOM = 0.64;
    window.addEventListener(AMBIENT_MOON_EVENT, (event) => {
        const moon = event.detail;
        if (!moon || (moon.y - moon.ry >= MOON_ROOM_TOP && moon.y + moon.ry <= MOON_ROOM_BOTTOM)) {
            if (backdrop.hasAttribute('data-moon-mask'))
                backdrop.removeAttribute('data-moon-mask');
            return;
        }
        const style = backdrop.style;
        style.setProperty('--kt-moon-x', `${(moon.x * 100).toFixed(3)}%`);
        style.setProperty('--kt-moon-y', `${(moon.y * 100).toFixed(3)}%`);
        style.setProperty('--kt-moon-rx', `${(moon.rx * 100).toFixed(3)}%`);
        style.setProperty('--kt-moon-ry', `${(moon.ry * 100).toFixed(3)}%`);
        if (!backdrop.hasAttribute('data-moon-mask'))
            backdrop.setAttribute('data-moon-mask', '');
    });
    /*
     * THE SUN'S ROOM: the same rule as the Moon's, for the clean region the globe publishes (ambientSunMask.ts) - no mask while it is clear of the glow and the
     * bands, none at all when it is hidden behind the planet or gone (`null`), and its own variables and attribute, so the Moon's listener above and this one never
     * touch each other's state. With both up, the stylesheet's two-gradient rule applies. No DOM read: the event carries the numbers.
     */
    window.addEventListener(AMBIENT_SUN_EVENT, (event) => {
        const sun = event.detail;
        if (!sun || (sun.y - sun.ry >= MOON_ROOM_TOP && sun.y + sun.ry <= MOON_ROOM_BOTTOM)) {
            if (backdrop.hasAttribute('data-sun-mask'))
                backdrop.removeAttribute('data-sun-mask');
            return;
        }
        const style = backdrop.style;
        style.setProperty('--kt-sun-x', `${(sun.x * 100).toFixed(3)}%`);
        style.setProperty('--kt-sun-y', `${(sun.y * 100).toFixed(3)}%`);
        style.setProperty('--kt-sun-rx', `${(sun.rx * 100).toFixed(3)}%`);
        style.setProperty('--kt-sun-ry', `${(sun.ry * 100).toFixed(3)}%`);
        if (!backdrop.hasAttribute('data-sun-mask'))
            backdrop.setAttribute('data-sun-mask', '');
    });
    /* Directly after the map keeps the DOM order honest about the paint order, and
       stops any later module that appends to .place-experience from landing under
       it by accident. */
    if (earthMap instanceof HTMLElement) {
        earthMap.insertAdjacentElement('afterend', backdrop);
    }
    else {
        experience.prepend(backdrop);
    }
}
