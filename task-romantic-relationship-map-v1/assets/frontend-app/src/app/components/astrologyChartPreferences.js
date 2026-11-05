import { DEFAULT_CHART_OPTIONS } from '../astrology/chartModel.js';
/**
 * THE ADVANCED CHART'S DISPLAY PREFERENCES - what the reader switched on, remembered on this device.
 *
 * Only what to DRAW is stored: a handful of booleans and the ids of optional objects. Nothing calculated is ever stored here, and nothing stored is ever read back as
 * astrology: the chart is always recalculated from the birth data, and every stored choice is validated and then limited to what that chart can do
 * (resolveChartOptions). The house system is deliberately NOT remembered: the canonical Whole Sign is where every visit starts, so the wheel, the reading and Technical
 * details never begin a visit disagreeing.
 *
 * Storage can be unavailable (a private window, blocked site data): every access is guarded, and without it the standard chart is simply what the reader sees.
 */
export const CHART_PREFERENCES_KEY = 'kt:astro-advanced-chart:v1';
const BOOLEAN_KEYS = ['lunarNodes', 'majorAspects', 'houseNumbers', 'retrogradeMarkers', 'minorAspects', 'degreeLabels'];
/** The stored choices (validated), or an empty object: the standard chart. */
export function readStoredChartOptions() {
    try {
        if (typeof localStorage === 'undefined')
            return {};
        const raw = localStorage.getItem(CHART_PREFERENCES_KEY);
        if (!raw)
            return {};
        const parsed = JSON.parse(raw);
        if (typeof parsed !== 'object' || parsed === null)
            return {};
        const record = parsed;
        const options = {};
        for (const key of BOOLEAN_KEYS) {
            if (typeof record[key] === 'boolean')
                options[key] = record[key];
        }
        if (Array.isArray(record.extendedObjects)) {
            options.extendedObjects = record.extendedObjects.filter((item) => typeof item === 'string').slice(0, 12);
        }
        return options;
    }
    catch {
        return {};
    }
}
/** Remember the reader's choices; the house system is not one of them. A reader who is back on the standard chart has nothing stored at all. */
export function writeStoredChartOptions(options) {
    try {
        if (typeof localStorage === 'undefined')
            return;
        const stored = {
            lunarNodes: options.lunarNodes,
            majorAspects: options.majorAspects,
            houseNumbers: options.houseNumbers,
            retrogradeMarkers: options.retrogradeMarkers,
            minorAspects: options.minorAspects,
            degreeLabels: options.degreeLabels,
            extendedObjects: [...options.extendedObjects],
        };
        const standard = BOOLEAN_KEYS.every((key) => stored[key] === DEFAULT_CHART_OPTIONS[key]) && stored.extendedObjects.length === 0;
        if (standard)
            localStorage.removeItem(CHART_PREFERENCES_KEY);
        else
            localStorage.setItem(CHART_PREFERENCES_KEY, JSON.stringify(stored));
    }
    catch {
        /* storage is a convenience: the chart works without it */
    }
}
