/*
 * THE FORECAST GRAPH - ITS STYLE, IN THE FORECAST'S OWN TERMS (Forecast Graph System V1.2, owner-approved).
 *
 * One string, appended to the Forecast's stylesheet (numerologyForecastExperience.ts, the one place the Forecast's styles are assembled). Every rule is scoped to `#place-experience` and to classes that
 * exist only on the English life-dynamics Forecast (.kt-fg, .kt-fg-on), so the legacy Slovak Forecast, which has a different model, is not changed by a pixel. The glass, the hairlines, the
 * serif titles, the pill buttons and the focus ring are the Forecast's (--kt-accent-rgb, --kt-surface-*, --kt-icon-rgb, with the Forecast's fallbacks);
 * navigation and neutral controls stay in the accent. Nothing here animates: there is no motion to reduce, and none to leave running.
 *
 * A COLOUR PER THEME, QUIETLY. Each Life Dynamics theme has one soft, slightly creamy hue (below). It is the theme's IDENTITY and nothing else: the same
 * hue at Subtle and at Central theme (the level is the height, the word and the gauge fill), and no theme means good or bad by its colour. It colours
 * the theme's icon, its line and markers and its gauge fill; no glow beyond a faint halo. Dash patterns and end icons still tell the lines apart in
 * Compare all, so identity never rests on colour alone.
 *
 * --fg-c is an rgb triple, set wherever a theme is named (data-domain on a Month / Year panel row, the block or the svg; data-life-area on a DAY row;
 * data-series on a line or an end icon) and read by every rule below, so a descendant takes its theme's colour without being told.
 *
 * ONE MAPPING FOR DAY, MONTH AND YEAR. The three panels name the same five themes with two attributes (the Day's rows carry data-life-area); the
 * single table below, FORECAST_GRAPH_THEME_RGB, is the only place a colour is written, and `theme()` is the only place it is attached. The Day's colour is
 * presentation only: its scores, its "Not assessed" (five empty dashed segments, never coloured as assessed) and its qualifiers are untouched.
 */
export const FORECAST_GRAPH_THEME_RGB = {
    'mind-focus': '145, 185, 189',
    'career-purpose': '201, 167, 126',
    'love-connection': '201, 144, 156',
    'health-recovery': '159, 187, 164',
    'money-resources': '182, 165, 202',
};
const theme = (id) => `#place-experience .kt-fg-on [data-domain='${id}'], #place-experience .kt-fg-on [data-series='${id}'], #place-experience .kt-fg-on [data-life-area='${id}'] { --fg-c: ${FORECAST_GRAPH_THEME_RGB[id]}; }`;
export const FORECAST_GRAPH_CSS = `
    ${theme('mind-focus')}
    ${theme('career-purpose')}
    ${theme('love-connection')}
    ${theme('health-recovery')}
    ${theme('money-resources')}

    /* The five rows of the Forecast's own panel, in their theme's colour: icon, gauge fill, and the lit row. Only on the Year and Month panels. */
    #place-experience .kt-fg-on [data-forecast-life='month'] [data-domain] .kt-fc-life-icon,
    #place-experience .kt-fg-on [data-forecast-life='year'] [data-domain] .kt-fc-life-icon { color: rgba(var(--fg-c, var(--kt-accent-rgb, 216, 195, 142)), 0.95); }
    #place-experience .kt-fg-on [data-forecast-life='month'] [data-domain] .kt-fc-life-gauge i.is-on,
    #place-experience .kt-fg-on [data-forecast-life='year'] [data-domain] .kt-fc-life-gauge i.is-on { background: rgba(var(--fg-c, var(--kt-accent-rgb, 216, 195, 142)), 0.8); }
    #place-experience .kt-fg-on [data-forecast-life='month'] [data-domain] .kt-fc-life-card.is-active,
    #place-experience .kt-fg-on [data-forecast-life='year'] [data-domain] .kt-fc-life-card.is-active { background: rgba(var(--fg-c, var(--kt-accent-rgb, 216, 195, 142)), 0.075); }

    /* A little more fill than the other glass blocks, so a line stays legible over the bright Earth behind the Forecast. */
    /* THE DAY'S FIVE ROWS, in the same colours: icon, assessed gauge segments, the open row. A theme with no assessment keeps its five empty dashed segments
       (no segment is ever lit for it) and a quieter icon: the assessment stays visibly absent. */
    #place-experience .kt-fg-on [data-forecast-life='day'] [data-life-area] .kt-fc-life-icon { color: rgba(var(--fg-c, var(--kt-accent-rgb, 216, 195, 142)), 0.95); }
    #place-experience .kt-fg-on [data-forecast-life='day'] [data-life-area][data-assessed='false'] .kt-fc-life-icon { color: rgba(var(--fg-c, var(--kt-accent-rgb, 216, 195, 142)), 0.6); }
    #place-experience .kt-fg-on [data-forecast-life='day'] [data-life-area] .kt-fc-life-gauge i.is-on { background: rgba(var(--fg-c, var(--kt-accent-rgb, 216, 195, 142)), 0.8); }
    #place-experience .kt-fg-on [data-forecast-life='day'] [data-life-area] .kt-fc-life-day[open] > .kt-fc-life-card { background: rgba(var(--fg-c, var(--kt-accent-rgb, 216, 195, 142)), 0.075); }

    #place-experience .kt-fg { margin-top: 12px; padding: 14px 12px 6px; background: rgba(var(--kt-surface-fill-rgb, 10, 12, 16), 0.58); }
    #place-experience .kt-fg-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; padding: 0 2px; }
    #place-experience .kt-fg-titles { min-width: 0; }
    #place-experience .kt-fg-title {
      margin: 0; display: flex; align-items: center; gap: 9px;
      font-family: Georgia, 'Times New Roman', serif; font-weight: 400; font-size: 18px; line-height: 1.2; color: rgba(250, 249, 245, 0.96);
    }
    #place-experience .kt-fg-title-icon { flex: 0 0 auto; width: 22px; height: 22px; color: rgba(var(--fg-c, var(--kt-accent-rgb, 216, 195, 142)), 0.95); }
    #place-experience .kt-fg-title-icon svg, #place-experience .kt-fg-svg .kt-fg-end-icon { fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; }
    #place-experience .kt-fg-title-icon svg { display: block; width: 100%; height: 100%; stroke-width: 1.5; }
    #place-experience .kt-fg-sub { margin: 3px 0 0; font-size: 13px; line-height: 1.35; color: rgba(244, 241, 233, 0.62); }
    #place-experience .kt-fg-compare {
      flex: 0 0 auto; min-height: 44px; padding: 0 4px 0 8px; border: 0; background: transparent; font: inherit; font-size: 13.5px; cursor: pointer; white-space: nowrap;
      color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.95); -webkit-tap-highlight-color: transparent; border-radius: 10px;
    }
    #place-experience .kt-fg-compare[aria-pressed='true'] { color: rgba(244, 241, 233, 0.8); }

    /* A DARK, STABLE FOUNDATION UNDER THE PLOT AND ITS LABELS. The Earth moves behind the glass; one flat, inexpensive fill (no blur, no filter, no animation) keeps the
       line and the labels legible at the brightest moment of it without darkening the rest of the Forecast. Drawn from the Forecast's own surface token. */
    #place-experience .kt-fg-plot { margin: 6px 0 0; border-radius: 12px; background: rgba(var(--kt-surface-fill-rgb, 10, 12, 16), 0.74); box-shadow: inset 0 0 0 1px rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.05); touch-action: pan-y; cursor: crosshair; user-select: none; -webkit-user-select: none; -webkit-tap-highlight-color: transparent; }
    #place-experience .kt-fg-svg { display: block; width: 100%; height: auto; overflow: visible; }
    #place-experience .kt-fg-guide { stroke: rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.07); stroke-width: 1; }
    #place-experience .kt-fg-guide.is-ordinary { stroke: rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.14); }
    #place-experience .kt-fg-axis-y { fill: rgba(244, 241, 233, 0.74); font-size: 12px; }
    #place-experience .kt-fg-axis-y.is-ordinary { fill: rgba(250, 249, 245, 0.88); }
    #place-experience .kt-fg-axis-x { fill: rgba(244, 241, 233, 0.76); font-size: 12px; }
    #place-experience .kt-fg-axis-x.is-selected { fill: rgba(255, 255, 252, 1); font-weight: 700; }
    #place-experience .kt-fg-ref { stroke: rgba(var(--fg-c, var(--kt-accent-rgb, 216, 195, 142)), 0.7); stroke-width: 1; stroke-dasharray: 1 4; stroke-linecap: round; }
    #place-experience .kt-fg-gap { stroke: rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.22); stroke-width: 1; stroke-dasharray: 2 3; }
    #place-experience .kt-fg-gap-label { fill: rgba(250, 249, 245, 0.85); font-size: 12px; font-style: italic; paint-order: stroke; stroke: rgba(10, 12, 16, 0.85); stroke-width: 3px; }
    #place-experience .kt-fg-line { fill: none; stroke-linecap: round; stroke-linejoin: round; }
    #place-experience .kt-fg-line.is-focus { stroke: rgba(var(--fg-c, var(--kt-accent-rgb, 216, 195, 142)), 0.95); stroke-width: 1.7; }
    #place-experience .kt-fg-line.is-dim { stroke: rgba(var(--fg-c, 244, 241, 233), 0.5); stroke-width: 1.1; }
    #place-experience .kt-fg-halo { fill: none; stroke: rgba(var(--fg-c, var(--kt-accent-rgb, 216, 195, 142)), 0.1); stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    /* Told apart without colour in Compare all: a dash pattern each, and the theme's own icon at the end of its line. */
    #place-experience .kt-fg-line.is-dim[data-series='mind-focus'] { stroke-dasharray: none; }
    #place-experience .kt-fg-line.is-dim[data-series='career-purpose'] { stroke-dasharray: 7 3.5; }
    #place-experience .kt-fg-line.is-dim[data-series='love-connection'] { stroke-dasharray: 1.6 3.2; }
    #place-experience .kt-fg-line.is-dim[data-series='health-recovery'] { stroke-dasharray: 8 2.6 1.6 2.6; }
    #place-experience .kt-fg-line.is-dim[data-series='money-resources'] { stroke-dasharray: 3.2 3.2; }
    #place-experience .kt-fg-dot { fill: rgba(var(--fg-c, var(--kt-accent-rgb, 216, 195, 142)), 0.72); }
    #place-experience .kt-fg-leader { stroke: rgba(244, 241, 233, 0.2); stroke-width: 0.8; }
    /* The icons at the ends of the lines are DECORATIVE: 16 px, 18 px apart, they cannot be 44-px targets without overlapping. The theme is picked in the panel's rows. */
    #place-experience .kt-fg-end { pointer-events: none; color: rgba(var(--fg-c, var(--kt-accent-rgb, 216, 195, 142)), 0.7); }
    #place-experience .kt-fg-end.is-focus { color: rgba(var(--fg-c, var(--kt-accent-rgb, 216, 195, 142)), 1); }
    #place-experience .kt-fg-end-icon { stroke-width: 1.9; }
    #place-experience .kt-fg-cursor { stroke: rgba(var(--fg-c, var(--kt-accent-rgb, 216, 195, 142)), 0.45); stroke-width: 1; stroke-dasharray: 2 3; }
    #place-experience .kt-fg-cursor.is-gap { stroke: rgba(250, 249, 245, 0.4); }
    #place-experience .kt-fg-marker.is-focus { fill: rgba(250, 249, 245, 0.98); stroke: rgba(var(--fg-c, var(--kt-accent-rgb, 216, 195, 142)), 0.95); stroke-width: 1.8; }
    #place-experience .kt-fg-marker-glow { fill: rgba(var(--fg-c, var(--kt-accent-rgb, 216, 195, 142)), 0.14); }
    #place-experience .kt-fg-marker.is-dim { fill: rgba(11, 13, 15, 0.9); stroke: rgba(var(--fg-c, 244, 241, 233), 0.8); stroke-width: 1.1; }
    #place-experience .kt-fg-plot:focus-visible, #place-experience .kt-fg-compare:focus-visible, #place-experience .kt-fg-open:focus-visible,
    #place-experience .kt-fg-more summary:focus-visible { outline: 1px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.7); outline-offset: 3px; }

    /* ONE compact row about the picked sample. */
    #place-experience .kt-fg-point { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin: 8px 2px 0; font-size: 14px; line-height: 1.4; color: rgba(244, 241, 233, 0.9); }
    #place-experience .kt-fg-point-text { min-width: 0; }
    #place-experience .kt-fg-point-date { font-weight: 600; color: rgba(250, 249, 245, 0.97); }
    #place-experience .kt-fg-point-sep { color: rgba(244, 241, 233, 0.4); }
    #place-experience .kt-fg-point-theme { color: rgba(244, 241, 233, 0.72); }
    #place-experience .kt-fg-point-level { font-weight: 600; color: rgba(var(--fg-c, 250, 249, 245), 0.98); }
    #place-experience .kt-fg-point-level.is-not-assessed { font-weight: 500; font-style: italic; color: rgba(244, 241, 233, 0.6); }
    #place-experience .kt-fg-open {
      flex: 0 0 auto; min-height: 40px; padding: 0 12px; border-radius: 999px; font: inherit; font-size: 12.5px; cursor: pointer; text-align: left; white-space: nowrap;
      border: 1px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.5); background: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.1); color: rgba(250, 249, 245, 0.96);
    }
    #place-experience .kt-fg-open.is-day { white-space: normal; margin-top: 4px; }

    /* Explanation, closed. */
    #place-experience .kt-fg-more { margin: 0 2px; border-top: 1px solid rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.07); }
    #place-experience .kt-fg-more:first-of-type { margin-top: 8px; }
    #place-experience .kt-fg-more summary { cursor: pointer; min-height: 44px; display: flex; align-items: center; font-size: 13px; color: rgba(244, 241, 233, 0.72); }
    #place-experience .kt-fg-more summary { list-style: none; justify-content: space-between; }
    #place-experience .kt-fg-more summary::-webkit-details-marker { display: none; }
    #place-experience .kt-fg-more summary::after { content: '\\203A'; font-size: 18px; line-height: 1; color: rgba(244, 241, 233, 0.5); }
    #place-experience .kt-fg-more[open] > summary::after { transform: rotate(90deg); }
    #place-experience .kt-fg-more-body { padding: 0 0 12px; }
    #place-experience .kt-fg-more-body p { margin: 0 0 8px; font-size: 12.5px; line-height: 1.5; color: rgba(244, 241, 233, 0.66); }
    #place-experience .kt-fg-table-scroll { overflow-x: auto; max-height: 320px; margin-bottom: 12px; -webkit-overflow-scrolling: touch; border-radius: 10px; border: 1px solid rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.1); }
    #place-experience .kt-fg-table table { border-collapse: collapse; width: 100%; min-width: 280px; font-size: 12.5px; }
    #place-experience .kt-fg-table caption { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
    #place-experience .kt-fg-table th, #place-experience .kt-fg-table td { padding: 6px 9px; text-align: left; white-space: nowrap; font-weight: 400; color: rgba(244, 241, 233, 0.78); border-bottom: 1px solid rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.06); }
    #place-experience .kt-fg-table thead th { position: sticky; top: 0; background: rgba(14, 16, 20, 0.96); color: rgba(250, 249, 245, 0.9); font-weight: 600; }
    #place-experience .kt-fg-table tr.is-selected th, #place-experience .kt-fg-table tr.is-selected td { background: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.1); color: rgba(250, 249, 245, 0.97); }
    @media (min-width: 700px) {
      #place-experience .kt-fg { padding: 18px 18px 8px; }
      #place-experience .kt-fg-title { font-size: 20px; }
    }
`;
