import { t } from '../i18n/uiStrings.js?v=f9ab0a6';
import { dayClimate, lowerFirst } from './forecastNarrative.js?v=f9ab0a6';
const HEADING = {
    climate: 'fc.x.mainClimate',
    support: 'fc.x.supports',
    friction: 'fc.x.pulls',
    practical: 'fc.x.todo',
    watch: 'fc.x.bridgeLabel',
};
const toParagraph = (paragraph) => ({
    text: paragraph.text, factIds: paragraph.factIds,
});
const lineParagraph = (line) => ({
    text: `${line.name}: ${lowerFirst(line.meaning)}`, factIds: [line.factId],
});
export function composeForecastReading(synthesis, options = {}) {
    const climate = dayClimate(synthesis.facts, {
        date: synthesis.period.from,
        natal: options.natal ?? null,
        isToday: options.isToday ?? false,
        birthTimeEstimated: synthesis.coverage.birthTimeEstimated,
    });
    const sections = [];
    const push = (id, paragraphs, lines) => {
        if (paragraphs.length === 0)
            return;
        sections.push({ id, heading: t(HEADING[id]), paragraphs, ...(lines ? { lines } : {}) });
    };
    push('climate', climate.summary.map(toParagraph));
    push('support', climate.supports.map(lineParagraph), climate.supports);
    push('friction', climate.tension ? [toParagraph(climate.tension)] : [], climate.pulls);
    push('practical', climate.guidance ? [toParagraph(climate.guidance)] : []);
    push('watch', climate.bridge ? [toParagraph(climate.bridge)] : []);
    return {
        modelVersion: synthesis.modelVersion,
        periodLabel: synthesis.period.label,
        sections,
        evidence: synthesis.facts,
        coverage: synthesis.coverage,
        plan: climate.plan,
    };
}
/** Everything the reading is allowed to say, in the order it says it. */
export const FORECAST_SECTION_ORDER = [
    'climate', 'support', 'friction', 'practical', 'watch',
];
