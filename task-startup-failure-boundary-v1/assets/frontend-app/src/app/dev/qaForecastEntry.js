import { QA_PROFILE_PRESETS } from './qaProfilePresets.js?v=2ea79e9';
export function qaForecastEntry(search, devPresetsEnabled, presets = QA_PROFILE_PRESETS) {
    if (!devPresetsEnabled)
        return null;
    const params = new URLSearchParams(search);
    if (params.get('qa') !== 'forecast')
        return null;
    const requested = (params.get('qaProfile') ?? '').trim();
    const asked = requested === '' ? null : presets.find((preset) => preset.id === requested) ?? null;
    const preset = asked ?? presets[presets.length - 1] ?? null;
    const level = params.get('qaLevel');
    const language = params.get('qaLang');
    return {
        preset,
        level: level === 'year' || level === 'day' ? level : 'month',
        requestedProfile: requested === '' ? null : requested,
        profileFellBack: requested !== '' && asked === null,
        language: language === 'en' || language === 'sk' ? language : null,
    };
}
