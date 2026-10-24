export const FORECAST_SYSTEMS = ['astrology', 'numerology', 'human-design', 'bazi'];
export const SYSTEM_LABELS = {
    astrology: 'Astrology',
    numerology: 'Numerology',
    'human-design': 'Human Design',
    bazi: 'BaZi / Elemental',
};
export function aggregateDays(days) {
    if (days.length === 0)
        return null;
    const intensities = days.map((day) => day.intensityScore);
    const themeCounts = countBy(days.map((day) => day.dominantTheme));
    const rankedThemes = [...themeCounts.entries()].sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]));
    const elementDayCounts = Object.fromEntries(countBy(days.map((day) => day.dominantElement)));
    const rankedElements = Object.entries(elementDayCounts).sort((left, right) => (right[1] ?? 0) - (left[1] ?? 0));
    const dominantElement = rankedElements[0]?.[0] ?? null;
    const elementExample = dominantElement ? days.find((day) => day.dominantElement === dominantElement) ?? null : null;
    const strongestDay = days.reduce((best, day) => (day.intensityScore > best.intensityScore ? day : best), days[0]);
    const quietestDay = days.reduce((best, day) => (day.intensityScore < best.intensityScore ? day : best), days[0]);
    const dominantThemeExample = days.find((day) => day.dominantTheme === rankedThemes[0][0]) ?? days[0];
    return {
        dates: days.map((day) => day.date),
        days,
        intensityMean: mean(intensities),
        intensityMin: Math.min(...intensities),
        intensityMax: Math.max(...intensities),
        convergenceMean: mean(days.map((day) => day.convergence)),
        actionReflectionMean: mean(days.map((day) => day.actionReflectionScore)),
        expansionContractionMean: mean(days.map((day) => day.expansionContractionScore)),
        stabilityChangeMean: mean(days.map((day) => day.stabilityChangeScore)),
        emotionalChargeMean: mean(days.map((day) => day.emotionalChargeScore)),
        dominantTheme: rankedThemes[0][0],
        dominantThemeDays: rankedThemes[0][1],
        secondaryThemes: rankedThemes.slice(1, 4).filter(([, count]) => count > 0).map(([label]) => label),
        strongestDay,
        quietestDay,
        elementDayCounts,
        dominantElement,
        traditionalBodyCorrespondence: elementExample?.traditionalBodyFocus ?? null,
        emotionalMirror: elementExample?.emotionalMirror ?? null,
        shadow: dominantThemeExample.shadow,
        opportunity: dominantThemeExample.opportunity,
        eventDates: days.filter((day) => day.astroEvents.length > 0).map((day) => ({ date: day.date, events: day.astroEvents })),
    };
}
/**
 * Node size = the summed `bySystem` theme contributions the engine already wrote
 * for each day. Link weight between two systems = the overlap (minimum of the two
 * contributions) on themes both actually support — so a link only exists where the
 * engine itself recorded agreement.
 */
export function buildConstellation(days) {
    const contribution = new Map(FORECAST_SYSTEMS.map((system) => [system, 0]));
    const linkWeights = new Map();
    const signals = new Map();
    for (const day of days) {
        for (const theme of day.why.themes) {
            for (const system of FORECAST_SYSTEMS) {
                const value = theme.bySystem[system] ?? 0;
                if (value > 0)
                    contribution.set(system, (contribution.get(system) ?? 0) + value);
            }
            // Named contributors, summed across the period, for the node focus panel.
            for (const contributor of theme.contributors) {
                const key = `${contributor.system}|${contributor.label}`;
                const entry = signals.get(key)
                    ?? { system: contributor.system, label: contributor.label, contribution: 0, themes: new Set() };
                entry.contribution += contributor.contribution;
                entry.themes.add(theme.label);
                signals.set(key, entry);
            }
            // Only systems the engine counted as genuinely supporting the theme may link.
            const supporting = theme.systems.filter((system) => FORECAST_SYSTEMS.includes(system));
            for (let left = 0; left < supporting.length; left += 1) {
                for (let right = left + 1; right < supporting.length; right += 1) {
                    const key = `${supporting[left]}|${supporting[right]}`;
                    const overlap = Math.min(theme.bySystem[supporting[left]] ?? 0, theme.bySystem[supporting[right]] ?? 0);
                    const entry = linkWeights.get(key) ?? { weight: 0, themes: new Set() };
                    entry.weight += overlap;
                    entry.themes.add(theme.label);
                    linkWeights.set(key, entry);
                }
            }
        }
    }
    const total = [...contribution.values()].reduce((sum, value) => sum + value, 0);
    const nodes = FORECAST_SYSTEMS.map((system) => ({
        system,
        label: SYSTEM_LABELS[system],
        contribution: round(contribution.get(system) ?? 0, 2),
        share: total > 0 ? (contribution.get(system) ?? 0) / total : 0,
    }));
    const links = [...linkWeights.entries()]
        .map(([key, entry]) => {
        const [a, b] = key.split('|');
        return { systems: [a, b], weight: round(entry.weight, 2), themes: [...entry.themes].slice(0, 3) };
    })
        .sort((left, right) => right.weight - left.weight);
    const centre = strongestConvergentTheme(days);
    const signalsBySystem = Object.fromEntries(FORECAST_SYSTEMS.map((system) => [
        system,
        [...signals.values()]
            .filter((entry) => entry.system === system)
            .sort((left, right) => right.contribution - left.contribution)
            .slice(0, 6)
            .map((entry) => ({ label: entry.label, contribution: round(entry.contribution, 2), themes: [...entry.themes].slice(0, 2) })),
    ]));
    return {
        nodes,
        links,
        centreTheme: centre?.theme ?? null,
        centreConvergence: centre?.convergence ?? 0,
        centreSystems: centre?.systems ?? [],
        maxContribution: Math.max(1e-6, ...nodes.map((node) => node.contribution)),
        maxLinkWeight: Math.max(1e-6, ...links.map((link) => link.weight)),
        signalsBySystem,
    };
}
/** The highest-convergence multi-system theme the engine recorded in the period. */
function strongestConvergentTheme(days) {
    const totals = new Map();
    for (const day of days) {
        for (const signal of day.convergentSignals) {
            const entry = totals.get(signal.theme) ?? { convergence: 0, systems: new Set(), occurrences: 0 };
            entry.convergence = Math.max(entry.convergence, signal.convergence);
            entry.occurrences += 1;
            for (const system of signal.systems)
                entry.systems.add(system);
            totals.set(signal.theme, entry);
        }
    }
    if (totals.size === 0)
        return null;
    const [theme, entry] = [...totals.entries()].sort((left, right) => (right[1].occurrences - left[1].occurrences || right[1].convergence - left[1].convergence))[0];
    return { theme, convergence: entry.convergence, systems: [...entry.systems] };
}
// ---------------------------------------------------------------------------
function countBy(values) {
    const counts = new Map();
    for (const value of values)
        counts.set(value, (counts.get(value) ?? 0) + 1);
    return counts;
}
function mean(values) {
    return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}
function round(value, digits) {
    const scale = 10 ** digits;
    return Math.round(value * scale) / scale;
}
