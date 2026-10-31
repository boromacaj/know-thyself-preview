import { numerologyInterpretationMap, } from '../../../data/numerology/numerologyInterpretationMap.js?v=b5ef5ed';
import { nameNumerologyInterpretationMap, } from '../../../data/numerology/nameNumerologyInterpretationMap.js?v=b5ef5ed';
function supportedNumber(value) {
    let reduced = Math.abs(value);
    while (reduced > 9) {
        reduced = String(reduced).split('').reduce((sum, digit) => sum + Number(digit), 0);
    }
    return reduced;
}
/**
 * A Challenge of 0 is its own result, not a reduced 9.
 *
 * It arises when the two single digits a Challenge is the difference of are
 * equal (docs/numerology/NUMEROLOGY_METHODOLOGY_CONTRACT.md, Challenges), and
 * the number maps only cover 1-9. This used to fall through `reduced || 9` and
 * describe a 0 with the 9's themes - technically false, and printed in the
 * appendix for every chart with a 0 Challenge.
 */
export const CHALLENGE_ZERO_MEANING = 'Challenge 0 is its own result, not a reduced 9: no single developmental pressure dominates that chapter, so its focus has to be chosen rather than imposed.';
export function numberMeaning(value) {
    if (value === 0)
        return CHALLENGE_ZERO_MEANING;
    const number = supportedNumber(value);
    const theme = nameNumerologyInterpretationMap.numberThemes[number];
    const prefix = value === number ? `Number ${number}` : `Value ${value} uses the available reduced-number ${number} map and`;
    return `${prefix} emphasizes ${theme.symbolicFocus}.`;
}
/** The meaning a Challenge value carries in the appendix: 0 is read as itself. */
export function challengeMeaning(value) {
    return value === 0 ? CHALLENGE_ZERO_MEANING : numberMeaning(value);
}
export function signalMeaning(signal, value) {
    const number = supportedNumber(value);
    const meaning = numerologyInterpretationMap.signalOverlays[signal][number]?.shortMeaning
        ?? numberMeaning(number);
    return value === number ? meaning : `Value ${value} uses the available reduced-number ${number} interpretation: ${meaning}`;
}
export function nameSignalMeaning(signal, value) {
    const number = supportedNumber(value);
    const meaning = nameNumerologyInterpretationMap.signalOverlays[signal][number].shortMeaning;
    return value === number ? meaning : `Value ${value} uses the available reduced-number ${number} interpretation: ${meaning}`;
}
export function patternMeaning(values) {
    if (values.length === 0)
        return 'No values were identified by this calculation.';
    const themes = values.map((value) => {
        const number = supportedNumber(value);
        return `${number}: ${nameNumerologyInterpretationMap.numberThemes[number].symbolicFocus}`;
    });
    return themes.join(' | ');
}
