import { INTAKE_PROFILE_PRESETS } from './intakeProfilePresetData.js?v=53c0693';
/* The data lives in its own module so a production deploy can replace exactly that
   file with an empty stub (frontend-app/scripts/strip-dev-fixtures.mjs) while the
   logic below - which production uses - stays untouched. Re-exported so every
   existing import of this module keeps working. */
export { INTAKE_PROFILE_PRESETS } from './intakeProfilePresetData.js?v=53c0693';
export function findIntakeProfilePreset(id) {
    return INTAKE_PROFILE_PRESETS.find((preset) => preset.id === id);
}
/**
 * Pure form-state transform: loading a preset behaves like editing the source data
 * from scratch, not patching an already-resolved profile. Every location/timezone
 * field is explicitly reset to the same "nothing resolved yet" baseline the app
 * already uses (see controller.ts's clear-location handler and model.ts's
 * EMPTY_INPUT), regardless of what currentDraft previously held, so a preset switch
 * can never leak a prior profile's coordinates, timezone, or resolved place label.
 * Birth time is only ever set from the preset's own explicit value — never
 * fabricated, never carried over from currentDraft.
 */
export function buildIntakeDraftFromPreset(currentDraft, preset) {
    return {
        ...currentDraft,
        givenNames: preset.givenNames,
        birthSurname: preset.birthSurname,
        fullName: `${preset.givenNames} ${preset.birthSurname}`.trim(),
        birthDate: preset.birthDate,
        birthTime: preset.birthTimeAvailable ? preset.birthTime ?? '' : '',
        birthPlaceText: '',
        birthLatitude: null,
        birthLongitude: null,
        birthLocationPrecision: 'text-only',
        birthLocationSource: 'user-input',
        resolvedPlaceLabel: null,
        birthCountry: null,
        birthRegion: null,
        birthLocationProvider: null,
        birthTimeZoneHint: null,
        birthTimeZoneHintSource: null,
        birthTimeZone: null,
        birthTimeZoneSource: null,
        birthTimeZoneConfidence: 'unavailable',
        birthTimeZoneLimitations: ['No birth location has been resolved.'],
    };
}
/** Used by the optional "Reset fields" dev action: clears name/date/time too, not just location. */
export function buildBlankIntakeDraft(currentDraft) {
    return {
        ...buildIntakeDraftFromPreset(currentDraft, {
            id: 'blank',
            label: 'Blank',
            givenNames: '',
            birthSurname: '',
            birthDate: '',
            birthTimeAvailable: false,
            birthLocationQuery: '',
        }),
        fullName: '',
    };
}
export function intakeProfilePresetStatusMessage(preset) {
    const timeNote = preset.birthTimeAvailable ? '' : ' Birth time remains unavailable.';
    return `Test profile loaded: ${preset.label}.${timeNote} Select the correct "${preset.birthLocationQuery}" result below to resolve coordinates and timezone.`;
}
