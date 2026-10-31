import { findQaProfilePreset } from './qaProfilePresets.js?v=d9f39e7';
/*
 * ?qa=tarot: ONE URL FROM A FRESH DEVICE TO THE REAL TAROT SCREEN.
 *
 * It is not a second QA framework. The QA preset menu already knows how to load a finished profile and open the app
 * shell without typing, and it is already switched on only where the dev-presets flag is on. This answers one question
 * on top of that: given the address, should the page do what a tester would otherwise do by hand - tap a preset, then
 * tap Tarot in the strip - and with which preset?
 *
 * Both conditions are needed. Without the flag (every production build) the address means nothing, and without the
 * explicit `qa=tarot` the page behaves exactly as it always did. The profile is one of the existing presets and is held
 * in memory like any other preset; this module touches no storage, and nothing is written for it.
 */
/** Not Boris's own profile: the QA route should never open on a real person's chart by default. */
export const QA_TAROT_DEFAULT_PRESET_ID = 'tomas-batovsky';
/** The preset to open Tarot with, or null when this address is not the QA Tarot route (or the dev shortcuts are off). */
export function qaTarotEntry(search, devPresetsEnabled) {
    if (!devPresetsEnabled)
        return null;
    const params = new URLSearchParams(search);
    if (params.get('qa') !== 'tarot')
        return null;
    return findQaProfilePreset(params.get('qaProfile') ?? '') ?? findQaProfilePreset(QA_TAROT_DEFAULT_PRESET_ID);
}
