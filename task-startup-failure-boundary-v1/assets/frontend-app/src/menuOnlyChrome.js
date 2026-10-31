/**
 * MENU-ONLY CHROME. The QA control and the profile control belong to the Main Menu and nowhere else after it: once a
 * destination is open - a pillar, the Portrait, the Forecast, Tarot - they are gone, and the screen is the module's
 * content plus the MENU return control.
 *
 * One question, asked by both controls: does an opened module own the screen? The state it reads is the one every
 * destination already writes onto the experience root (`data-pillar-stage="pillar"` while any reading is open,
 * `data-pillar-active` naming which). Before a reading is open (onboarding) nothing is an opened module, so the
 * onboarding chrome is exactly what it was.
 */
export function openedModuleOwnsScreen(host) {
    const active = host.dataset.pillarActive;
    return host.dataset.pillarStage === 'pillar' && Boolean(active) && active !== 'menu';
}
/** The attributes the answer depends on, for an observer that has to re-ask when either changes. */
export const MENU_ONLY_CHROME_ATTRIBUTES = ['data-pillar-stage', 'data-pillar-active'];
