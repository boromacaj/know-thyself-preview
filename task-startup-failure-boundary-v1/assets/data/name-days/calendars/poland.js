/*
 * POLAND - THE CIVIL NAME-DAY CALENDAR, PARTIAL.
 * ==============================================
 *
 * Polish "imieniny", as printed in ordinary Polish calendars. Poland is the
 * country that most strongly disproves the assumption a name-day feature is
 * tempted to make - that a name maps to one date. Polish calendars routinely
 * give a name several days in the year, because several saints carry it, and a
 * Polish Pawel who celebrates on 29 June is not more correct than one who
 * celebrates on 25 January. So this file is where `rank` earns its keep:
 * `primary` is the day the calendar treats as the name's own, `secondary` is a
 * further genuinely recognised day, and neither is discarded to make the data
 * tidier than the custom actually is.
 *
 * It also exists to differ from its neighbours. Jerzy is 23 April where Czech
 * Jiri is 24 April; Stanislaw is 8 May where Czech Stanislav is 7 May and
 * Slovak Stanislav is 13 November; Monika is 27 August against 21 May, 7 May
 * and 4 May in the other three. Those one-day and five-month gaps are the
 * feature.
 *
 * WHY THIS FILE IS PARTIAL, AND WHY THAT IS A CHOICE.
 * Coverage is declared `partial`. It holds the common Polish given names and
 * the names shared with the other three calendars, and stops there. Filling the
 * remaining days by guesswork would make the dataset look finished while making
 * it untrustworthy, and a wrong date is worse than an absent one: an absent
 * date reads as "we do not have this yet", a wrong one reads as a fact. Every
 * date below is one there was reasonable confidence in; the ones there were not
 * are simply missing.
 *
 * PROVENANCE - READ THIS BEFORE SHIPPING.
 * Curated from general knowledge. NOT transcribed from an official published
 * Polish calendar, and no line here has been checked against one. Poland's
 * multiple-date custom makes the primary/secondary split a judgement call in
 * places even where both dates are real. Verify against a published edition
 * before this is put in front of users.
 */
export const POLAND_NAME_DAYS = [
    /* January */
    { region: 'PL', tradition: 'civil', month: 1, day: 1, displayName: 'Mieczysław', canonicalKey: 'mieczyslaw', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 1, day: 6, displayName: 'Kacper', canonicalKey: 'kacper', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 1, day: 20, displayName: 'Sebastian', canonicalKey: 'sebastian', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 1, day: 21, displayName: 'Agnieszka', canonicalKey: 'agnieszka', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 1, day: 25, displayName: 'Paweł', canonicalKey: 'pawel', rank: 'secondary' },
    { region: 'PL', tradition: 'civil', month: 1, day: 28, displayName: 'Tomasz', canonicalKey: 'tomasz', rank: 'secondary' },
    /* February */
    { region: 'PL', tradition: 'civil', month: 2, day: 5, displayName: 'Agata', canonicalKey: 'agata', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 2, day: 6, displayName: 'Dorota', canonicalKey: 'dorota', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 2, day: 14, displayName: 'Walenty', canonicalKey: 'walenty', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 2, day: 24, displayName: 'Maciej', canonicalKey: 'maciej', rank: 'primary' },
    /* March */
    { region: 'PL', tradition: 'civil', month: 3, day: 4, displayName: 'Kazimierz', canonicalKey: 'kazimierz', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 3, day: 12, displayName: 'Grzegorz', canonicalKey: 'grzegorz', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 3, day: 17, displayName: 'Zbigniew', canonicalKey: 'zbigniew', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 3, day: 19, displayName: 'Józef', canonicalKey: 'jozef', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 3, day: 21, displayName: 'Benedykt', canonicalKey: 'benedykt', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 3, day: 24, displayName: 'Gabriel', canonicalKey: 'gabriel', rank: 'primary' },
    /* April */
    { region: 'PL', tradition: 'civil', month: 4, day: 23, displayName: 'Wojciech', canonicalKey: 'wojciech', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 4, day: 23, displayName: 'Jerzy', canonicalKey: 'jerzy', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 4, day: 25, displayName: 'Marek', canonicalKey: 'marek', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 4, day: 29, displayName: 'Katarzyna', canonicalKey: 'katarzyna', rank: 'secondary' },
    /* May */
    { region: 'PL', tradition: 'civil', month: 5, day: 3, displayName: 'Maria', canonicalKey: 'maria', rank: 'secondary' },
    { region: 'PL', tradition: 'civil', month: 5, day: 8, displayName: 'Stanisław', canonicalKey: 'stanislaw', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 5, day: 15, displayName: 'Zofia', canonicalKey: 'zofia', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 5, day: 16, displayName: 'Andrzej', canonicalKey: 'andrzej', rank: 'secondary' },
    { region: 'PL', tradition: 'civil', month: 5, day: 19, displayName: 'Iwona', canonicalKey: 'iwona', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 5, day: 24, displayName: 'Joanna', canonicalKey: 'joanna', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 5, day: 26, displayName: 'Filip', canonicalKey: 'filip', rank: 'primary' },
    /* June */
    { region: 'PL', tradition: 'civil', month: 6, day: 8, displayName: 'Medard', canonicalKey: 'medard', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 6, day: 13, displayName: 'Antoni', canonicalKey: 'antoni', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 6, day: 15, displayName: 'Jolanta', canonicalKey: 'jolanta', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 6, day: 21, displayName: 'Alojzy', canonicalKey: 'alojzy', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 6, day: 23, displayName: 'Wanda', canonicalKey: 'wanda', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 6, day: 24, displayName: 'Jan', canonicalKey: 'jan', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 6, day: 27, displayName: 'Władysław', canonicalKey: 'wladyslaw', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 6, day: 29, displayName: 'Piotr', canonicalKey: 'piotr', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 6, day: 29, displayName: 'Paweł', canonicalKey: 'pawel', rank: 'primary' },
    /* July */
    { region: 'PL', tradition: 'civil', month: 7, day: 3, displayName: 'Tomasz', canonicalKey: 'tomasz', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 7, day: 13, displayName: 'Henryk', canonicalKey: 'henryk', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 7, day: 20, displayName: 'Małgorzata', canonicalKey: 'malgorzata', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 7, day: 22, displayName: 'Magdalena', canonicalKey: 'magdalena', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 7, day: 24, displayName: 'Krystyna', canonicalKey: 'krystyna', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 7, day: 24, displayName: 'Kinga', canonicalKey: 'kinga', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 7, day: 25, displayName: 'Jakub', canonicalKey: 'jakub', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 7, day: 25, displayName: 'Krzysztof', canonicalKey: 'krzysztof', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 7, day: 26, displayName: 'Anna', canonicalKey: 'anna', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 7, day: 29, displayName: 'Marta', canonicalKey: 'marta', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 7, day: 31, displayName: 'Ignacy', canonicalKey: 'ignacy', rank: 'primary' },
    /* August */
    { region: 'PL', tradition: 'civil', month: 8, day: 4, displayName: 'Dominik', canonicalKey: 'dominik', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 8, day: 10, displayName: 'Wawrzyniec', canonicalKey: 'wawrzyniec', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 8, day: 11, displayName: 'Zuzanna', canonicalKey: 'zuzanna', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 8, day: 14, displayName: 'Maksymilian', canonicalKey: 'maksymilian', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 8, day: 15, displayName: 'Maria', canonicalKey: 'maria', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 8, day: 17, displayName: 'Jacek', canonicalKey: 'jacek', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 8, day: 20, displayName: 'Bernard', canonicalKey: 'bernard', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 8, day: 24, displayName: 'Bartłomiej', canonicalKey: 'bartlomiej', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 8, day: 27, displayName: 'Monika', canonicalKey: 'monika', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 8, day: 28, displayName: 'Augustyn', canonicalKey: 'augustyn', rank: 'primary' },
    /* September */
    { region: 'PL', tradition: 'civil', month: 9, day: 21, displayName: 'Mateusz', canonicalKey: 'mateusz', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 9, day: 23, displayName: 'Tekla', canonicalKey: 'tekla', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 9, day: 28, displayName: 'Wacław', canonicalKey: 'waclaw', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 9, day: 29, displayName: 'Michał', canonicalKey: 'michal', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 9, day: 29, displayName: 'Rafał', canonicalKey: 'rafal', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 9, day: 30, displayName: 'Hieronim', canonicalKey: 'hieronim', rank: 'primary' },
    /* October */
    { region: 'PL', tradition: 'civil', month: 10, day: 1, displayName: 'Teresa', canonicalKey: 'teresa', rank: 'secondary' },
    { region: 'PL', tradition: 'civil', month: 10, day: 4, displayName: 'Franciszek', canonicalKey: 'franciszek', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 10, day: 15, displayName: 'Teresa', canonicalKey: 'teresa', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 10, day: 16, displayName: 'Jadwiga', canonicalKey: 'jadwiga', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 10, day: 18, displayName: 'Łukasz', canonicalKey: 'lukasz', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 10, day: 21, displayName: 'Urszula', canonicalKey: 'urszula', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 10, day: 28, displayName: 'Szymon', canonicalKey: 'szymon', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 10, day: 28, displayName: 'Tadeusz', canonicalKey: 'tadeusz', rank: 'primary' },
    /* November */
    { region: 'PL', tradition: 'civil', month: 11, day: 4, displayName: 'Karol', canonicalKey: 'karol', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 11, day: 11, displayName: 'Marcin', canonicalKey: 'marcin', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 11, day: 12, displayName: 'Renata', canonicalKey: 'renata', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 11, day: 19, displayName: 'Elżbieta', canonicalKey: 'elzbieta', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 11, day: 22, displayName: 'Cecylia', canonicalKey: 'cecylia', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 11, day: 23, displayName: 'Klemens', canonicalKey: 'klemens', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 11, day: 25, displayName: 'Katarzyna', canonicalKey: 'katarzyna', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 11, day: 30, displayName: 'Andrzej', canonicalKey: 'andrzej', rank: 'primary' },
    /* December */
    { region: 'PL', tradition: 'civil', month: 12, day: 1, displayName: 'Natalia', canonicalKey: 'natalia', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 12, day: 4, displayName: 'Barbara', canonicalKey: 'barbara', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 12, day: 6, displayName: 'Mikołaj', canonicalKey: 'mikolaj', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 12, day: 13, displayName: 'Łucja', canonicalKey: 'lucja', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 12, day: 24, displayName: 'Adam', canonicalKey: 'adam', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 12, day: 24, displayName: 'Ewa', canonicalKey: 'ewa', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 12, day: 26, displayName: 'Szczepan', canonicalKey: 'szczepan', rank: 'primary' },
    { region: 'PL', tradition: 'civil', month: 12, day: 27, displayName: 'Jan', canonicalKey: 'jan', rank: 'secondary' },
    { region: 'PL', tradition: 'civil', month: 12, day: 31, displayName: 'Sylwester', canonicalKey: 'sylwester', rank: 'primary' },
];
