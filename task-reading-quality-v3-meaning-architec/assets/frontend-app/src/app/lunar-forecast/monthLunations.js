import { lunarEventOn } from './lunarEvents.js';
import { lunarEventNatalReading } from './lunarEventNatal.js';
import { lunarHouseAreaEn } from './lunarEventVoice.js';
/*
 * THE MONTH'S OWN NEW AND FULL MOON, AS THE MONTH READING NEEDS THEM.
 *
 * Nothing is calculated here that the Lunar Forecast does not already calculate: the day each lunation falls on (lunarEventOn, in the reader's zone), its sign, and - only with an exact
 * birth time, by the one rule lunarEventNatal.ts applies - the Whole Sign houses of its Moon and Sun. English only: the Slovak Month does not carry them.
 */
export function monthLunations(year, daysInMonth, month, timeZone, natal) {
    const zone = timeZone ?? 'UTC';
    const found = [];
    for (let day = 1; day <= daysInMonth; day += 1) {
        const event = lunarEventOn({ year, month, day }, zone);
        if (!event)
            continue;
        const reading = natal ? lunarEventNatalReading(event, natal) : null;
        found.push({
            kind: event.kind,
            day,
            sign: event.moonSign,
            moonArea: reading?.moonHouse != null ? lunarHouseAreaEn(reading.moonHouse) : null,
            sunArea: reading?.sunHouse != null ? lunarHouseAreaEn(reading.sunHouse) : null,
        });
    }
    return found;
}
