/**
 * Chart ruler convention: modern rulership (contemporary Western astrology default —
 * outer planets rule Scorpio/Aquarius/Pisces instead of the traditional Mars/Saturn/
 * Jupiter). This is a fixed, documented lookup from the calculated Ascendant sign to a
 * ruling body name; it is never mixed with traditional rulership within one chart.
 */
export const MODERN_CHART_RULERS = {
    Aries: 'Mars',
    Taurus: 'Venus',
    Gemini: 'Mercury',
    Cancer: 'Moon',
    Leo: 'Sun',
    Virgo: 'Mercury',
    Libra: 'Venus',
    Scorpio: 'Pluto',
    Sagittarius: 'Jupiter',
    Capricorn: 'Saturn',
    Aquarius: 'Uranus',
    Pisces: 'Neptune',
};
export function chartRulerBodyForSign(sign) {
    return MODERN_CHART_RULERS[sign] ?? null;
}
