/*
 * THE AMBIENT GLOBE'S OWN CSS, INJECTED ONCE.
 *
 * The component is meant to be dropped into any container, so it carries the
 * little styling it needs rather than asking a page stylesheet for it: a box
 * that fills its container, a canvas that fills the box, and the still globe
 * that stands in when WebGL is not there.
 *
 * NO BACKTICKS ANYWHERE IN THIS CSS, including inside comments: it is a
 * template literal and one would end the string.
 *
 * THE STILL GLOBE is the same planet in CSS: a lit disc - bright upper left,
 * falling to a cool shadow lower right, as the real one is - a halo, and a
 * tile of stars. It does not move, in any motion preference: it is what a
 * device that cannot draw WebGL is given, and nothing about it needs a frame.
 */
const STYLE_ID = 'kt-ambient-globe-style';
const CSS = `
.ambient-globe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #04050c;
  contain: strict;
}

.ambient-globe__canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.ambient-globe__fallback {
  position: absolute;
  inset: 0;
  background: #04050c;
}

.ambient-globe__fallback::before {
  position: absolute;
  top: 47%;
  left: 50%;
  width: min(80%, 76vh);
  aspect-ratio: 1;
  border-radius: 50%;
  content: "";
  transform: translate(-50%, -50%);
  background:
    radial-gradient(circle at 36% 30%, rgba(176, 214, 255, .70) 0, rgba(58, 118, 196, .62) 20%, rgba(14, 44, 104, .92) 48%, rgba(3, 9, 26, 1) 74%);
  box-shadow:
    0 0 0 1px rgba(120, 170, 255, .10),
    0 0 46px 10px rgba(96, 150, 255, .20),
    inset -18px -22px 46px rgba(0, 0, 0, .55);
}

.ambient-globe__fallback::after {
  position: absolute;
  inset: 0;
  content: "";
  opacity: .8;
  background-size: 190px 190px;
  background-image:
    radial-gradient(1px 1px at 24px 38px, rgba(255, 255, 255, .85), transparent),
    radial-gradient(1px 1px at 98px 12px, rgba(190, 210, 255, .7), transparent),
    radial-gradient(1.5px 1.5px at 150px 76px, rgba(255, 238, 205, .8), transparent),
    radial-gradient(1px 1px at 60px 120px, rgba(255, 255, 255, .6), transparent),
    radial-gradient(1px 1px at 128px 160px, rgba(190, 210, 255, .75), transparent),
    radial-gradient(1px 1px at 14px 168px, rgba(255, 255, 255, .5), transparent);
}
`;
/** Adds the stylesheet to the document, once. */
export function ensureAmbientGlobeStyles() {
    if (document.getElementById(STYLE_ID))
        return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = CSS;
    document.head.append(style);
}
