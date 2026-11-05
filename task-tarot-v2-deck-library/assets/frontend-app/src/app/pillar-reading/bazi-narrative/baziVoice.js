/** The classical name of each seasonal state, for the evidence lines. */
export const STATE_CHARACTER = {
    prosperous: '旺', aided: '相', resting: '休', trapped: '囚', dead: '死',
};
/** The engine's family keys, as the tradition names the five groups. */
export const FAMILY_TERM = {
    companion: 'Companion', output: 'Output', wealth: 'Wealth', authority: 'Authority', resource: 'Resource',
};
/** One decimal, the way the evidence lines print a weight. */
export const weightText = (value, decimal = '.') => {
    const rounded = Math.round(value * 10) / 10;
    const text = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
    return decimal === '.' ? text : text.replace('.', decimal);
};
/** Two decimals, for the engine's own strength scores. */
export const scoreText = (value, decimal = '.') => {
    const text = (Math.round(value * 100) / 100).toString();
    return decimal === '.' ? text : text.replace('.', decimal);
};
export const capitalise = (text) => (text ? text.charAt(0).toUpperCase() + text.slice(1) : text);
