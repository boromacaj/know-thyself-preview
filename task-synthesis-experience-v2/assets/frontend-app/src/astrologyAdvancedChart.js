/*
 * THE ADVANCED CHART CONTROLLER
 * -----------------------------
 * What the Advanced chart panel under the Western Astrology natal wheel does when it is used: open and close, and redraw the wheel for the reader's choices.
 *
 * WHAT IT DOES NOT DO
 *   - It calculates nothing and asks for nothing. The wheel section embeds its normalized chart model (components/astrologyChartWheel.ts: `data-astro-wheel-data`); a
 *     toggle re-runs the SAME `drawWheelSvg` on that embedded model with the new options. No engine is called, no request is made, no second chart is built.
 *   - It stores nothing but display preferences (components/astrologyChartPreferences.ts), and never the house system.
 *   - It has no animation, no timer and no polling. It does work only in response to a tap or a change.
 *
 * THE LISTENERS ARE DELEGATED on #pillar-view, which survives the reading being re-rendered: after a re-render the new wheel already carries the stored choices
 * (the renderer reads them), and its panel works without being wired again.
 */
import { drawWheelSvg, wheelFooterHtml } from './app/components/astrologyChartWheel.js?v=53c0693';
import { writeStoredChartOptions } from './app/components/astrologyChartPreferences.js?v=53c0693';
import { DEFAULT_CHART_OPTIONS, isStandardChart, resolveChartOptions } from './app/astrology/chartModel.js?v=53c0693';
import { DEFAULT_HOUSE_SYSTEM, HOUSE_SYSTEM_IDS } from './app/astrology/houseSystems.js?v=53c0693';
import { t, tf } from './app/i18n/uiStrings.js?v=53c0693';
const pillarView = document.getElementById('pillar-view');
const PAYLOADS = new WeakMap();
function payloadOf(section) {
    const cached = PAYLOADS.get(section);
    if (cached)
        return cached;
    const script = section.querySelector('script[data-astro-wheel-data]');
    if (!script?.textContent)
        return null;
    try {
        const payload = JSON.parse(script.textContent);
        PAYLOADS.set(section, payload);
        return payload;
    }
    catch {
        return null;
    }
}
/** The options the panel's controls currently say. */
function readOptions(panel) {
    const flag = (name) => panel.querySelector(`input[data-astro-opt="${name}"]`)?.checked ?? false;
    const present = (name) => panel.querySelector(`input[data-astro-opt="${name}"]`) !== null;
    const options = {
        lunarNodes: flag('lunarNodes'),
        majorAspects: flag('majorAspects'),
        minorAspects: present('minorAspects') ? flag('minorAspects') : false,
        degreeLabels: flag('degreeLabels'),
        retrogradeMarkers: flag('retrogradeMarkers'),
        houseNumbers: present('houseNumbers') ? flag('houseNumbers') : DEFAULT_CHART_OPTIONS.houseNumbers,
        extendedObjects: [...panel.querySelectorAll('input[data-astro-extended]:checked')].map((input) => input.value),
    };
    const system = panel.querySelector('input[data-astro-house-system]:checked')?.value;
    options.houseSystem = isHouseSystem(system) ? system : DEFAULT_HOUSE_SYSTEM;
    return options;
}
function isHouseSystem(value) {
    return value !== undefined && HOUSE_SYSTEM_IDS.includes(value);
}
/** Put the controls back to a set of options (used by "back to the standard chart"). */
function writeControls(panel, options) {
    for (const input of panel.querySelectorAll('input[data-astro-opt]')) {
        const name = input.dataset.astroOpt;
        const value = options[name];
        if (typeof value === 'boolean')
            input.checked = value;
    }
    for (const input of panel.querySelectorAll('input[data-astro-extended]'))
        input.checked = options.extendedObjects.includes(input.value);
    for (const input of panel.querySelectorAll('input[data-astro-house-system]'))
        input.checked = input.value === options.houseSystem;
}
/** Redraw the wheel (and its caption and the panel's notes) for the panel's current state. */
function redraw(section) {
    const panel = section.querySelector('[data-astro-adv]');
    const payload = payloadOf(section);
    if (!panel || !payload)
        return;
    const resolved = resolveChartOptions(payload.model, readOptions(panel));
    const svg = section.querySelector('svg.astro-wheel-svg');
    if (svg) {
        const holder = document.createElement('div');
        holder.innerHTML = drawWheelSvg(payload, resolved);
        const next = holder.firstElementChild;
        if (next)
            svg.replaceWith(next);
    }
    /* the caption is the section's own paragraph: the panel's notes are nested in the panel, so this is the only one */
    const footer = section.querySelector(':scope > p');
    if (footer) {
        const holder = document.createElement('div');
        holder.innerHTML = wheelFooterHtml(payload, resolved);
        const next = holder.firstElementChild;
        if (next)
            footer.replaceWith(next);
    }
    const note = section.querySelector('[data-astro-house-note]');
    if (note) {
        note.hidden = resolved.houseSystem === DEFAULT_HOUSE_SYSTEM;
        if (!note.hidden) {
            const label = t(`chart.astro.adv.system.${resolved.houseSystem}`);
            note.textContent = tf('chart.astro.adv.houseNote', { system: label });
        }
    }
    const reset = section.querySelector('[data-astro-adv-reset]');
    if (reset)
        reset.hidden = isStandardChart(resolved);
    writeStoredChartOptions(resolved);
}
if (pillarView instanceof HTMLElement) {
    const style = document.createElement('style');
    style.dataset.astrologyAdvancedChart = 'true';
    style.textContent = `
    /* THE ADVANCED CHART: one disclosure under the wheel. Collapsed it is a single quiet line; opened it is a compact glass panel in the same flow, so closing it gives the
       wheel its whole space back. The wheel's own width (min(440px, 92%)) is the panel's. */
    .astro-adv { width: min(440px, 92%); display: grid; gap: 8px; justify-items: stretch; }
    .astro-adv-toggle {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      min-height: 44px; padding: 0 16px; margin: 0 auto; width: auto;
      border: 1px solid rgba(255, 255, 255, 0.22); border-radius: 999px;
      background: rgba(18, 24, 44, 0.5); color: rgba(244, 242, 250, 0.92);
      font: inherit; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .astro-adv-toggle:focus-visible, .astro-adv-reset:focus-visible { outline: 2px solid rgba(238, 214, 150, 0.85); outline-offset: 3px; }
    .astro-adv-chevron { width: 7px; height: 7px; border-right: 1.5px solid currentColor; border-bottom: 1.5px solid currentColor; transform: translateY(-2px) rotate(45deg); transition: transform 0.2s ease; }
    .astro-adv-toggle[aria-expanded="true"] .astro-adv-chevron { transform: translateY(1px) rotate(-135deg); }
    .astro-adv-panel {
      display: grid; gap: 6px; padding: 10px 12px 8px; text-align: left;
      border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 16px;
      background: rgba(18, 24, 44, 0.62);
      -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px);
    }
    .astro-adv-panel[hidden], .astro-adv [hidden] { display: none !important; }
    /* Compact: each group lays its switches out two to a row (a phone is ~330 px inside the panel), the legend across both. */
    .astro-adv-group { margin: 0; padding: 0; border: 0; min-width: 0; }
    .astro-adv-group legend { padding: 0 0 2px; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(238, 214, 150, 0.85); }
    .astro-adv-items { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 12px; row-gap: 0; align-items: center; }
    .astro-adv-systems, .astro-adv-items > .astro-adv-note { grid-column: 1 / -1; }
    .astro-adv-row, .astro-adv-system { position: relative; display: flex; align-items: center; gap: 10px; min-height: 40px; min-width: 0; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    .astro-adv-input { position: absolute; opacity: 0; width: 1px; height: 1px; margin: 0; pointer-events: none; }
    .astro-adv-switch { flex: 0 0 auto; position: relative; width: 36px; height: 20px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, 0.34); background: rgba(255, 255, 255, 0.08); transition: background 0.15s ease, border-color 0.15s ease; }
    .astro-adv-switch::after { content: ''; position: absolute; top: 2px; left: 2px; width: 14px; height: 14px; border-radius: 50%; background: rgba(244, 242, 250, 0.86); transition: transform 0.15s ease; }
    .astro-adv-input:checked + .astro-adv-switch { background: rgba(105, 183, 173, 0.5); border-color: rgba(105, 183, 173, 0.95); }
    .astro-adv-input:checked + .astro-adv-switch::after { transform: translateX(16px); }
    .astro-adv-input:focus-visible + .astro-adv-switch, .astro-adv-input:focus-visible + span { outline: 2px solid rgba(238, 214, 150, 0.85); outline-offset: 2px; }
    .astro-adv-label { display: grid; gap: 1px; min-width: 0; font-size: 12.5px; line-height: 1.25; color: rgba(244, 242, 250, 0.94); }
    .astro-adv-label small { font-size: 10.5px; line-height: 1.35; color: rgba(216, 214, 228, 0.7); }
    .astro-adv-systems { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; padding-top: 2px; }
    .astro-adv-system { gap: 0; min-height: 40px; }
    .astro-adv-system > span {
      flex: 1 1 auto; display: grid; place-items: center; min-height: 40px; padding: 0 8px; text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.24); border-radius: 12px; background: rgba(255, 255, 255, 0.05);
      font-size: 12px; line-height: 1.25; color: rgba(244, 242, 250, 0.9);
    }
    .astro-adv-input:checked + span { background: rgba(105, 183, 173, 0.3); border-color: rgba(105, 183, 173, 0.95); color: #fff; }
    .astro-adv-note { margin: 4px 0 0; font-size: 10.5px; line-height: 1.45; color: rgba(216, 214, 228, 0.78); }
    .astro-adv-reset { justify-self: center; min-height: 40px; padding: 0 14px; border: 0; background: transparent; color: rgba(238, 214, 150, 0.95); font: inherit; font-size: 12px; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
    /* The degree labels and the minor lines need to read on the frosted disc of the premium reading. */
    #place-experience .astro-chart-wheel .astro-degree-label { fill: rgba(255, 255, 255, 0.92); font-size: 8.5px; font-weight: 600; }
    @media (prefers-reduced-motion: reduce) { .astro-adv-chevron, .astro-adv-switch, .astro-adv-switch::after { transition: none; } }
  `;
    document.head.appendChild(style);
    pillarView.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Element))
            return;
        const toggle = target.closest('[data-astro-adv-toggle]');
        if (toggle) {
            const panel = toggle.closest('[data-astro-adv]')?.querySelector('.astro-adv-panel');
            if (!panel)
                return;
            const open = toggle.getAttribute('aria-expanded') !== 'true';
            toggle.setAttribute('aria-expanded', String(open));
            panel.hidden = !open;
            return;
        }
        const reset = target.closest('[data-astro-adv-reset]');
        if (reset) {
            const section = reset.closest('[data-astro-wheel]');
            const panel = section?.querySelector('[data-astro-adv]');
            if (!section || !panel)
                return;
            writeControls(panel, { ...DEFAULT_CHART_OPTIONS, extendedObjects: [] });
            redraw(section);
        }
    });
    pillarView.addEventListener('change', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement) || !target.classList.contains('astro-adv-input'))
            return;
        const section = target.closest('[data-astro-wheel]');
        if (section)
            redraw(section);
    });
}
