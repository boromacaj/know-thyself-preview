import { registerNameDayCalendar } from './nameDayRegistry.js';
import { SLOVAKIA_NAME_DAYS } from './calendars/slovakia.js';
import { CZECHIA_NAME_DAYS } from './calendars/czechia.js';
import { POLAND_NAME_DAYS } from './calendars/poland.js';
import { HUNGARY_NAME_DAYS } from './calendars/hungary.js';
/*
 * THE REGISTERED CALENDARS.
 * =========================
 *
 * One import and one `registerNameDayCalendar` call per country. Adding a
 * region pack is exactly those two lines plus the data file - there is no
 * central switch, no locale table to extend, and no reading code to touch,
 * which is the property that makes "add Croatia later" a small job rather than
 * a refactor.
 *
 * `coverage` is a promise the integrity test enforces. Slovakia claims
 * `complete` and must therefore account for all 366 dates including 29
 * February; the others claim `partial` and are read as such by the composer,
 * which stays silent for a name a partial calendar has not reached rather than
 * asserting that the name has no name day.
 */
export const NAME_DAY_CALENDARS = [
    {
        region: 'SK',
        label: { en: 'Slovakia', sk: 'Slovensko' },
        tradition: 'civil',
        coverage: 'complete',
        provenance: 'sk-civil-calendar',
        verificationSources: ['enwiki-sk-namedays', 'sk-web-calendars'],
        records: SLOVAKIA_NAME_DAYS,
    },
    /* The three below are deliberately partial. A padded full-year file would
       look finished while being quietly wrong, and for a name day a wrong date is
       worse than an absent one - being told the wrong day for your own name reads
       as carelessness in a way that silence does not. The composer reads
       `coverage` and stays silent for a name a partial calendar has not reached,
       rather than asserting that the name has no name day. */
    {
        region: 'CZ',
        label: { en: 'Czechia', sk: 'Česko' },
        tradition: 'civil',
        coverage: 'partial',
        provenance: 'cz-civil-calendar',
        /* Not cross-checked in this pass: the verification effort went to Slovakia,
           which is the calendar the app actually defaults to. */
        verificationSources: [],
        records: CZECHIA_NAME_DAYS,
    },
    {
        region: 'PL',
        label: { en: 'Poland', sk: 'Poľsko' },
        tradition: 'civil',
        coverage: 'partial',
        provenance: 'pl-civil-calendar',
        /* Not cross-checked in this pass: the verification effort went to Slovakia,
           which is the calendar the app actually defaults to. */
        verificationSources: [],
        records: POLAND_NAME_DAYS,
    },
    {
        region: 'HU',
        label: { en: 'Hungary', sk: 'Maďarsko' },
        tradition: 'civil',
        coverage: 'partial',
        provenance: 'hu-civil-calendar',
        /* Not cross-checked in this pass: the verification effort went to Slovakia,
           which is the calendar the app actually defaults to. */
        verificationSources: [],
        records: HUNGARY_NAME_DAYS,
    },
];
for (const calendar of NAME_DAY_CALENDARS)
    registerNameDayCalendar(calendar);
export { nameDayCalendar, nameDaysAcrossRegions, nameDaysFor, namesOnDate, registeredRegions, } from './nameDayRegistry.js';
