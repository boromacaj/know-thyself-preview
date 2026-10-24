/*
 * ONE GLASS MATERIAL.
 *
 * The interface had grown eleven different pieces of glass. An audit of the
 * shipped CSS found base fills anywhere between 0.36 and 0.95 and blur radii of
 * 12, 14, 16, 18, 20, 22, 24 and 26px, spread across a dozen files that each
 * arrived at their own answer honestly and separately. Side by side they do not
 * read as one system.
 *
 * This normalises exactly two things and nothing else:
 *
 *   background fill  ->  0.10
 *   backdrop blur    ->  0.5px
 *
 * WHAT IS DELIBERATELY NOT TOUCHED. Accent colours, borders, glows and shadow
 * language, radii, spacing, type, and every gradient. That is why the fill is
 * written as `background-color` rather than as the `background` shorthand: the
 * shorthand would reset background-image and take every raking gradient with
 * it. Setting only the colour replaces the base fill underneath and leaves the
 * gradient sitting on top of it exactly as authored.
 *
 * WHY THE DOUBLED ID. Several of the rules being normalised are themselves
 * `#place-experience .a .b .c { ... !important }`. A single id plus one class
 * loses that comparison on specificity, so the unification would silently apply
 * to some surfaces and not others - which is worse than not unifying at all,
 * because the inconsistency would then be invisible in the source. Repeating
 * the id raises this above any single-id rule regardless of how many classes it
 * carries, and it is the whole reason this file can be a short list instead of
 * a per-file edit.
 *
 * THE HUMAN DESIGN BODYGRAPH IS EXCLUDED. Its centres, veins and frost are
 * calibrated artwork, not chrome, and its internal styles are out of scope by
 * instruction. No selector below reaches inside it.
 */
const experience = document.getElementById('place-experience');
if (experience instanceof HTMLElement) {
    /* Every glass panel, capsule and sheet in the interface. Grouped by where
       they appear so a future surface can be added to the right list rather than
       to the end. */
    const SURFACES = [
        /* pillar hub, reading, technical */
        '.kt-pillar-card', '.kt-pillar-section', '.kt-key-outputs li', '.kt-mark',
        /* the three orbiting glass circles that open a Numerology reading (numerologyOrbit.ts) */
        '.kt-orbit-bubble',
        '.kt-portrait', '.kt-technical',
        /* synthesis */
        '.kt-synthesis-summary', '.kt-synthesis-card',
        /* forecast - kt-fc-method is the forecast's disclosure <details>, the exact
           counterpart of .kt-technical in the pillar views. It sits directly in
           .kt-forecast rather than inside a block, so it was the one prose panel
           on that screen with nothing behind it. */
        '.kt-fc-block', '.kt-fc-graph', '.kt-fc-method',
        /* tarot - the one panel of the Tarot destination, and its capsules */
        '.tx-panel', '.tx-button',
        /* main menu - the four pillar cards, the synthesis and the three tiles. The capsule that frames the cards is not
           here: a frosted panel inside a frosted panel only blurs its parent, so the frame stays clear and the cards
           carry the glass. */
        '.kt-menu-pillar', '.kt-menu-synthesis', '.kt-menu-tile',
        /* navigation and CTAs */
        '.kt-pillar-back', '.kt-pillar-nav-button', '.kt-portrait-review',
        '.profile-primary', '.profile-secondary',
        '.confirm-place', '.change-place', '.confirm-vessel', '.vessel-back', '.search-submit',
        /* overview / review */
        '.profile-overview-row', '.profile-overview-change',
        /* onboarding input glass */
        '.profile-field', '.profile-field-picker',
        /* date / time picker */
        '.arrival-glass-picker', '.arrival-year-grid', '.arrival-period-button',
        '.arrival-period-main', '.arrival-calendar-day-disc', '.arrival-year-option',
        '.arrival-time-input',
        /* place search */
        '.place-search', '.place-results-shell', '.birthplace-card',
        /* options and encyclopedia */
        '.kt-theme-button', '.kt-theme-sheet', '.kt-concept-sheet',
        /* the legend capsules under the BaZi pentagon and the seasonal wheel (six): Generating cycle, Controlling cycle, What the numbers count, The golden
           petal, Seasonal support, All twelve months. They were the one row of capsules with no glass under them. */
        '.bazi-chip',
    ];
    /* Doubled deliberately - see the header. */
    const scope = '#place-experience#place-experience';
    const all = SURFACES.map((surface) => `${scope} ${surface}`).join(',\n    ');
    /* The performance mode owns the blur on a constrained device and must keep
       owning it, so the blur half of this is stood down there rather than
       fighting it. The fill is cheap and applies everywhere. */
    const unconstrained = SURFACES
        .map((surface) => `${scope}:not([data-kt-perf="constrained"]) ${surface}`)
        .join(',\n    ');
    /* THE MAIN MENU KEEPS ITS BLUR ON A CONSTRAINED DEVICE. The mode above was written for a reading, which can put thirty-four
       frosted surfaces on screen at once. The menu has eight (four pillars, the synthesis, three tiles), and they are the whole
       of its material: with the blur stood down they are a dark tint over a sharp Earth, not glass, and the screen stops
       looking like the rest of the interface. So these eight keep the same blur as everywhere else - at 8 surfaces the cost is
       a fraction of one reading's. Only these selectors: nothing else is taken back from the performance mode. */
    const MENU_SURFACES = ['.kt-menu-pillar', '.kt-menu-synthesis', '.kt-menu-tile'];
    const menuConstrained = MENU_SURFACES
        .map((surface) => `${scope}[data-kt-perf="constrained"] ${surface}`)
        .join(',\n    ');
    /* The BaZi legend capsules (six, small) keep their blur on a constrained device for the same reason: a capsule over the Earth with no blur is a flat tint,
       not glass. They are not a menu surface, so they are named on their own and the menu's list above stays exactly the menu's. */
    const baziCapsulesConstrained = `${scope}[data-kt-perf="constrained"] .bazi-chip`;
    const style = document.createElement('style');
    style.dataset.glassSurfaceUnification = 'true';
    style.textContent = `
    #place-experience {
      /* The one fill and the one blur. Both are read from here by the rules
         below, so changing the material is changing these two numbers.
         The tone is the midpoint of the greys the surfaces were already using
         (10,13,14 / 10,12,16 / 18,21,24 / 8,12,13 / 11,15,17), so no surface
         shifts hue - only alpha. */
      --kt-glass-fill: rgba(10, 13, 16, 0.15);
      --kt-glass-blur-radius: 7px;
    }

    /* THE FILL. background-color only: a "background" shorthand here would
       clear background-image and strip every gradient in the interface. */
    ${all} {
      background-color: var(--kt-glass-fill) !important;
    }

    /* THE BLUR. One saturate for all of them, because eight different values of
       it is the same inconsistency in another property; 1.08 is the one the
       majority of these surfaces already carried. */
    ${unconstrained} {
      backdrop-filter: blur(var(--kt-glass-blur-radius)) saturate(1.08) !important;
      -webkit-backdrop-filter: blur(var(--kt-glass-blur-radius)) saturate(1.08) !important;
    }

    /* The menu's eight surfaces, on a constrained device too - see MENU_SURFACES. */
    ${menuConstrained} {
      backdrop-filter: blur(var(--kt-glass-blur-radius)) saturate(1.08) !important;
      -webkit-backdrop-filter: blur(var(--kt-glass-blur-radius)) saturate(1.08) !important;
    }

    /* The BaZi legend capsules, on a constrained device too - see baziCapsulesConstrained. */
    ${baziCapsulesConstrained} {
      backdrop-filter: blur(var(--kt-glass-blur-radius)) saturate(1.08) !important;
      -webkit-backdrop-filter: blur(var(--kt-glass-blur-radius)) saturate(1.08) !important;
    }
  `;
    document.head.append(style);
    window.addEventListener('pagehide', () => {
        style.remove();
    }, { once: true });
}
export {};
