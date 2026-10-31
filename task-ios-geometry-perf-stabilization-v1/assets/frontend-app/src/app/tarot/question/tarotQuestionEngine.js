import { composeQuestionReading, describeBeforeDraw, noticeFor, resolveLocale, } from './composeQuestionReading.js?v=d9f39e7';
import { drawForSpread } from './questionDraw.js?v=d9f39e7';
import { analyzeQuestion } from './questionIntent.js?v=d9f39e7';
import { selectSpread } from './spreadSelection.js?v=d9f39e7';
export function startQuestionReading(question, options = {}) {
    const intent = analyzeQuestion(question);
    const selection = selectSpread(intent);
    const locale = resolveLocale(options.locale);
    return {
        intent,
        selection,
        locale,
        preDraw: describeBeforeDraw(intent, selection, locale),
        notice: noticeFor(selection, locale),
    };
}
/** Whether the policy lets cards be drawn at all. */
export const drawsCards = (start) => start.selection.status === 'ready';
export function drawQuestionCards(start, options = {}) {
    if (start.selection.status !== 'ready' || !start.selection.spread)
        return null;
    return drawForSpread(start.selection.spread, options);
}
export function completeQuestionReading(start, drawn) {
    return composeQuestionReading(start.intent, start.selection, drawn, start.locale);
}
export function readTarotQuestion(question, options = {}) {
    const start = startQuestionReading(question, { locale: options.locale });
    if (!drawsCards(start)) {
        return { status: 'support-first', start, response: { locale: start.locale, notice: start.notice ?? '' } };
    }
    const drawn = drawQuestionCards(start, options);
    const reading = completeQuestionReading(start, drawn);
    if (!reading)
        throw new Error('A drawn spread could not be read: the draw and the spread disagree.');
    return { status: 'reading', start, drawn, reading };
}
export function structuralFacts(outcome) {
    const start = 'start' in outcome ? outcome.start : outcome;
    const status = 'status' in outcome ? outcome.status : start.selection.status === 'ready' ? 'reading' : 'support-first';
    return {
        status,
        spreadId: start.selection.spread?.id ?? null,
        mode: start.selection.mode,
        cardCount: 'drawn' in outcome ? outcome.drawn.length : start.selection.spread?.positions.length ?? 0,
        locale: start.locale,
    };
}
export { analyzeQuestion, selectSpread };
