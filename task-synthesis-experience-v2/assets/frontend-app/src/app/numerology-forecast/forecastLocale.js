import { activeLocale } from '../i18n/locale.js?v=53c0693';
import { CYCLE_KEYWORD, DAY_CONTENT, MONTH_CONTENT, YEAR_CONTENT, } from './forecastContent.js?v=53c0693';
import { CYCLE_KEYWORD_SK, DAY_CONTENT_SK, LUNAR_ACTIVITIES_SK, LUNAR_DISCLAIMER_SK, LUNAR_PHASE_NAMES_SK, LUNAR_SOURCE_SK, LUNAR_TREND_SK, METHODOLOGY_NOTE_SK, MONTH_CONTENT_SK, YEAR_CONTENT_SK, markerReasonKind, markerReasonSk, resonanceSk, } from './forecastContent.sk.js?v=53c0693';
import { METHODOLOGY_NOTE } from './buildForecast.js?v=53c0693';
import { TEMPORAL_VOICE_EN, composeReading } from './temporalComposition.js?v=53c0693';
import { TEMPORAL_VOICE_SK } from './temporalComposition.sk.js?v=53c0693';
/*
 * THE FORECAST'S TEXT, IN THE READER'S LANGUAGE.
 *
 * buildForecast.ts is arithmetic plus English, and it stays that way: it is
 * the one deterministic part of this feature and it does not read the locale.
 * The screen asks THIS module for every piece of prose instead, passing the
 * structural fact the builder used - the cycle number, the marker's numbers,
 * the resonance kind - so the Slovak is chosen from the same facts as the
 * English rather than from the English text.
 *
 * English falls out unchanged: every accessor returns the builder's own value
 * for the fallback locale, so a screenshot in English is byte-identical to the
 * one this module did not exist for.
 */
const slovak = () => activeLocale() === 'sk';
export function forecastKeyword(cycle) {
    return slovak() ? CYCLE_KEYWORD_SK[cycle] : CYCLE_KEYWORD[cycle];
}
export function yearContent(cycle) {
    return slovak() ? YEAR_CONTENT_SK[cycle] : YEAR_CONTENT[cycle];
}
export function monthContent(cycle) {
    return slovak() ? MONTH_CONTENT_SK[cycle] : MONTH_CONTENT[cycle];
}
export function dayContent(cycle) {
    return slovak() ? DAY_CONTENT_SK[cycle] : DAY_CONTENT[cycle];
}
export function methodologyNote() {
    return slovak() ? METHODOLOGY_NOTE_SK : METHODOLOGY_NOTE;
}
/**
 * The three cycles of a day, read as one. The plan is the builder's structural
 * fact; each language only says it, so the Slovak reading can never be about a
 * different combination than the English one.
 */
export function temporalReading(plan) {
    return composeReading(plan, slovak() ? TEMPORAL_VOICE_SK : TEMPORAL_VOICE_EN);
}
/**
 * Why a month is marked. The builder marks a month for one of three reasons
 * and derives them from the numbers; the same derivation runs here, so the
 * Slovak reason can never disagree with the English one about WHICH reason.
 * An unrecognised combination keeps the builder's own text.
 */
export function markerReason(marker, personalYear) {
    if (!slovak())
        return marker.reason;
    const kind = markerReasonKind(marker.personalMonth, personalYear);
    return kind ? markerReasonSk(kind, marker.personalMonth) : marker.reason;
}
/**
 * The resonance note. A note exists only when the cycle number equals the Life
 * Path, so the two numbers the Slovak sentence prints are the same number; it
 * is taken from the view rather than re-derived.
 */
export function resonanceText(note, cycle) {
    if (!slovak())
        return note.text;
    return resonanceSk(note.kind, cycle, cycle);
}
/* ------------------------------------------------------------ the lunar layer */
export function lunarPhaseName(guidance) {
    return slovak() ? (LUNAR_PHASE_NAMES_SK[guidance.phaseName] ?? guidance.phaseName) : guidance.phaseName;
}
/** An English phase name (New Moon, First Quarter, Full Moon, Last Quarter) in the reader's language. */
export function phaseNameWord(englishName) {
    return slovak() ? (LUNAR_PHASE_NAMES_SK[englishName] ?? englishName) : englishName;
}
export function lunarTrendWord(guidance) {
    return slovak() ? LUNAR_TREND_SK[guidance.trend] : guidance.trend;
}
export function lunarDisclaimer(guidance) {
    return slovak() ? LUNAR_DISCLAIMER_SK : guidance.disclaimer;
}
export function lunarSource(item) {
    return slovak() ? (LUNAR_SOURCE_SK[item.source] ?? item.source) : item.source;
}
/**
 * One row, in the reader's language. The row is identified by its English
 * activity and the advice by the Moon's trend - the same two facts the
 * builder used - so a Slovak row can only ever carry the advice its English
 * twin carries. A row the table does not know keeps its English.
 */
export function lunarRow(item, guidance) {
    if (!slovak())
        return { activity: item.activity, advice: item.advice };
    const row = LUNAR_ACTIVITIES_SK[item.activity];
    if (!row)
        return { activity: item.activity, advice: item.advice };
    return { activity: row.activity, advice: guidance.trend === 'waxing' ? row.waxing : row.waning };
}
