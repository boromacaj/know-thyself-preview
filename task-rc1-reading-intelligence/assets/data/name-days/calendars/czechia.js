/*
 * CZECHIA - THE CIVIL NAME-DAY CALENDAR, PARTIAL.
 * ===============================================
 *
 * The Czech "svátek" calendar: the one printed in diaries and wall calendars
 * and carried by phone OSes. It exists here for one specific reason, which the
 * Slovak file alone cannot serve - a name day is a property of a (name,
 * country, calendar) triple, and a single-country dataset can assert that but
 * cannot demonstrate it. Two calendars can. Boris is 14 October in Slovakia and
 * 5 September here; Monika is 7 May there and 21 May here; Petr is 22 February
 * here where Slovak Peter is 29 June. That divergence is the point of the
 * feature, and it only becomes visible once a second calendar is present.
 *
 * WHY THIS FILE IS PARTIAL, AND WHY THAT IS A CHOICE.
 * Coverage is declared `partial` and is around a third of the year. This is not
 * an unfinished file that someone abandoned midway; it is the honest shape of
 * what can be curated at this level of confidence. The alternative - padding
 * out all 366 days by guessing at the days nobody can recall - would produce a
 * dataset that LOOKS complete and is quietly wrong, and a reader has no way to
 * tell a guessed date from a known one. A short correct calendar degrades
 * gracefully: a name that is missing simply has no entry, which the registry
 * reports as "not in this dataset". A padded one cannot degrade at all, because
 * every wrong date is delivered with the same confidence as a right one.
 *
 * The names chosen are the ones that carry the feature: the common Czech given
 * names, and above all the names that also appear in the Slovak, Polish or
 * Hungarian calendars, so the cross-country comparison has something to compare.
 *
 * PROVENANCE - READ THIS BEFORE SHIPPING.
 * Curated from general knowledge. NOT transcribed from an official published
 * edition of the Czech calendar, and no line here has been checked against one.
 * The Czech calendar has also been amended over the decades, so a date that was
 * right in one edition can be wrong in the current one. Verify against a
 * published edition before this is put in front of users.
 */
export const CZECHIA_NAME_DAYS = [
    /* January */
    { region: 'CZ', tradition: 'civil', month: 1, day: 2, displayName: 'Karina', canonicalKey: 'karina', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 1, day: 3, displayName: 'Radmila', canonicalKey: 'radmila', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 1, day: 13, displayName: 'Edita', canonicalKey: 'edita', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 1, day: 15, displayName: 'Alice', canonicalKey: 'alice', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 1, day: 18, displayName: 'Vladislav', canonicalKey: 'vladislav', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 1, day: 20, displayName: 'Ilona', canonicalKey: 'ilona', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 1, day: 23, displayName: 'Zdeněk', canonicalKey: 'zdenek', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 1, day: 25, displayName: 'Miloš', canonicalKey: 'milos', rank: 'primary' },
    /* February */
    { region: 'CZ', tradition: 'civil', month: 2, day: 3, displayName: 'Blažej', canonicalKey: 'blazej', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 2, day: 4, displayName: 'Jarmila', canonicalKey: 'jarmila', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 2, day: 6, displayName: 'Vanda', canonicalKey: 'vanda', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 2, day: 7, displayName: 'Veronika', canonicalKey: 'veronika', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 2, day: 9, displayName: 'Apolena', canonicalKey: 'apolena', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 2, day: 11, displayName: 'Božena', canonicalKey: 'bozena', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 2, day: 14, displayName: 'Valentýn', canonicalKey: 'valentyn', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 2, day: 22, displayName: 'Petr', canonicalKey: 'petr', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 2, day: 24, displayName: 'Matěj', canonicalKey: 'matej', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 2, day: 26, displayName: 'Dorota', canonicalKey: 'dorota', rank: 'primary' },
    /* March */
    { region: 'CZ', tradition: 'civil', month: 3, day: 1, displayName: 'Bedřich', canonicalKey: 'bedrich', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 3, day: 2, displayName: 'Anežka', canonicalKey: 'anezka', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 3, day: 5, displayName: 'Kazimír', canonicalKey: 'kazimir', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 3, day: 6, displayName: 'Miroslav', canonicalKey: 'miroslav', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 3, day: 7, displayName: 'Tomáš', canonicalKey: 'tomas', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 3, day: 8, displayName: 'Gabriela', canonicalKey: 'gabriela', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 3, day: 12, displayName: 'Řehoř', canonicalKey: 'rehor', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 3, day: 19, displayName: 'Josef', canonicalKey: 'josef', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 3, day: 23, displayName: 'Ivona', canonicalKey: 'ivona', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 3, day: 24, displayName: 'Gabriel', canonicalKey: 'gabriel', rank: 'primary' },
    /* April */
    { region: 'CZ', tradition: 'civil', month: 4, day: 1, displayName: 'Hugo', canonicalKey: 'hugo', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 4, day: 3, displayName: 'Richard', canonicalKey: 'richard', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 4, day: 4, displayName: 'Ivana', canonicalKey: 'ivana', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 4, day: 13, displayName: 'Aleš', canonicalKey: 'ales', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 4, day: 16, displayName: 'Irena', canonicalKey: 'irena', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 4, day: 17, displayName: 'Rudolf', canonicalKey: 'rudolf', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 4, day: 20, displayName: 'Marcela', canonicalKey: 'marcela', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 4, day: 21, displayName: 'Alexandra', canonicalKey: 'alexandra', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 4, day: 23, displayName: 'Vojtěch', canonicalKey: 'vojtech', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 4, day: 24, displayName: 'Jiří', canonicalKey: 'jiri', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 4, day: 25, displayName: 'Marek', canonicalKey: 'marek', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 4, day: 27, displayName: 'Jaroslav', canonicalKey: 'jaroslav', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 4, day: 30, displayName: 'Blahoslav', canonicalKey: 'blahoslav', rank: 'primary' },
    /* May */
    { region: 'CZ', tradition: 'civil', month: 5, day: 3, displayName: 'Alexej', canonicalKey: 'alexej', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 5, day: 7, displayName: 'Stanislav', canonicalKey: 'stanislav', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 5, day: 12, displayName: 'Pankrác', canonicalKey: 'pankrac', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 5, day: 15, displayName: 'Žofie', canonicalKey: 'zofie', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 5, day: 18, displayName: 'Nataša', canonicalKey: 'natasa', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 5, day: 19, displayName: 'Ivo', canonicalKey: 'ivo', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 5, day: 21, displayName: 'Monika', canonicalKey: 'monika', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 5, day: 22, displayName: 'Emil', canonicalKey: 'emil', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 5, day: 23, displayName: 'Vladimír', canonicalKey: 'vladimir', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 5, day: 24, displayName: 'Jana', canonicalKey: 'jana', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 5, day: 26, displayName: 'Filip', canonicalKey: 'filip', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 5, day: 30, displayName: 'Ferdinand', canonicalKey: 'ferdinand', rank: 'primary' },
    /* June */
    { region: 'CZ', tradition: 'civil', month: 6, day: 1, displayName: 'Laura', canonicalKey: 'laura', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 6, day: 6, displayName: 'Norbert', canonicalKey: 'norbert', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 6, day: 8, displayName: 'Medard', canonicalKey: 'medard', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 6, day: 13, displayName: 'Antonín', canonicalKey: 'antonin', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 6, day: 15, displayName: 'Vít', canonicalKey: 'vit', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 6, day: 18, displayName: 'Milan', canonicalKey: 'milan', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 6, day: 21, displayName: 'Alois', canonicalKey: 'alois', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 6, day: 23, displayName: 'Zdeňka', canonicalKey: 'zdenka', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 6, day: 24, displayName: 'Jan', canonicalKey: 'jan', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 6, day: 25, displayName: 'Ivan', canonicalKey: 'ivan', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 6, day: 27, displayName: 'Ladislav', canonicalKey: 'ladislav', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 6, day: 29, displayName: 'Petr', canonicalKey: 'petr', rank: 'secondary' },
    { region: 'CZ', tradition: 'civil', month: 6, day: 29, displayName: 'Pavel', canonicalKey: 'pavel', rank: 'primary' },
    /* July */
    { region: 'CZ', tradition: 'civil', month: 7, day: 4, displayName: 'Prokop', canonicalKey: 'prokop', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 7, day: 5, displayName: 'Cyril', canonicalKey: 'cyril', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 7, day: 5, displayName: 'Metoděj', canonicalKey: 'metodej', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 7, day: 11, displayName: 'Olga', canonicalKey: 'olga', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 7, day: 13, displayName: 'Markéta', canonicalKey: 'marketa', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 7, day: 14, displayName: 'Karolína', canonicalKey: 'karolina', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 7, day: 15, displayName: 'Jindřich', canonicalKey: 'jindrich', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 7, day: 22, displayName: 'Magdaléna', canonicalKey: 'magdalena', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 7, day: 24, displayName: 'Kristýna', canonicalKey: 'kristyna', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 7, day: 25, displayName: 'Jakub', canonicalKey: 'jakub', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 7, day: 26, displayName: 'Anna', canonicalKey: 'anna', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 7, day: 29, displayName: 'Marta', canonicalKey: 'marta', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 7, day: 31, displayName: 'Ignác', canonicalKey: 'ignac', rank: 'primary' },
    /* August */
    { region: 'CZ', tradition: 'civil', month: 8, day: 2, displayName: 'Gustav', canonicalKey: 'gustav', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 8, day: 4, displayName: 'Dominik', canonicalKey: 'dominik', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 8, day: 10, displayName: 'Vavřinec', canonicalKey: 'vavrinec', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 8, day: 11, displayName: 'Zuzana', canonicalKey: 'zuzana', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 8, day: 12, displayName: 'Klára', canonicalKey: 'klara', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 8, day: 15, displayName: 'Hana', canonicalKey: 'hana', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 8, day: 17, displayName: 'Petra', canonicalKey: 'petra', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 8, day: 18, displayName: 'Helena', canonicalKey: 'helena', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 8, day: 20, displayName: 'Bernard', canonicalKey: 'bernard', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 8, day: 24, displayName: 'Bartoloměj', canonicalKey: 'bartolomej', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 8, day: 28, displayName: 'Augustýn', canonicalKey: 'augustyn', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 8, day: 31, displayName: 'Pavlína', canonicalKey: 'pavlina', rank: 'primary' },
    /* September */
    { region: 'CZ', tradition: 'civil', month: 9, day: 1, displayName: 'Samuel', canonicalKey: 'samuel', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 9, day: 2, displayName: 'Adéla', canonicalKey: 'adela', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 9, day: 5, displayName: 'Boris', canonicalKey: 'boris', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 9, day: 9, displayName: 'Daniela', canonicalKey: 'daniela', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 9, day: 12, displayName: 'Marie', canonicalKey: 'marie', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 9, day: 15, displayName: 'Jolana', canonicalKey: 'jolana', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 9, day: 16, displayName: 'Ludmila', canonicalKey: 'ludmila', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 9, day: 18, displayName: 'Kryštof', canonicalKey: 'krystof', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 9, day: 21, displayName: 'Matouš', canonicalKey: 'matous', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 9, day: 26, displayName: 'Andrea', canonicalKey: 'andrea', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 9, day: 28, displayName: 'Václav', canonicalKey: 'vaclav', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 9, day: 29, displayName: 'Michal', canonicalKey: 'michal', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 9, day: 30, displayName: 'Jeroným', canonicalKey: 'jeronym', rank: 'primary' },
    /* October */
    { region: 'CZ', tradition: 'civil', month: 10, day: 1, displayName: 'Igor', canonicalKey: 'igor', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 10, day: 4, displayName: 'František', canonicalKey: 'frantisek', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 10, day: 5, displayName: 'Eliška', canonicalKey: 'eliska', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 10, day: 8, displayName: 'Věra', canonicalKey: 'vera', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 10, day: 13, displayName: 'Renáta', canonicalKey: 'renata', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 10, day: 15, displayName: 'Tereza', canonicalKey: 'tereza', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 10, day: 17, displayName: 'Hedvika', canonicalKey: 'hedvika', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 10, day: 18, displayName: 'Lukáš', canonicalKey: 'lukas', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 10, day: 21, displayName: 'Brigita', canonicalKey: 'brigita', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 10, day: 25, displayName: 'Beáta', canonicalKey: 'beata', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 10, day: 30, displayName: 'Tadeáš', canonicalKey: 'tadeas', rank: 'primary' },
    /* November */
    { region: 'CZ', tradition: 'civil', month: 11, day: 4, displayName: 'Karel', canonicalKey: 'karel', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 11, day: 11, displayName: 'Martin', canonicalKey: 'martin', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 11, day: 12, displayName: 'Benedikt', canonicalKey: 'benedikt', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 11, day: 15, displayName: 'Leopold', canonicalKey: 'leopold', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 11, day: 19, displayName: 'Alžběta', canonicalKey: 'alzbeta', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 11, day: 20, displayName: 'Nikola', canonicalKey: 'nikola', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 11, day: 22, displayName: 'Cecílie', canonicalKey: 'cecilie', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 11, day: 25, displayName: 'Kateřina', canonicalKey: 'katerina', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 11, day: 30, displayName: 'Ondřej', canonicalKey: 'ondrej', rank: 'primary' },
    /* December */
    { region: 'CZ', tradition: 'civil', month: 12, day: 4, displayName: 'Barbora', canonicalKey: 'barbora', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 12, day: 5, displayName: 'Jitka', canonicalKey: 'jitka', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 12, day: 6, displayName: 'Mikuláš', canonicalKey: 'mikulas', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 12, day: 10, displayName: 'Julie', canonicalKey: 'julie', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 12, day: 13, displayName: 'Lucie', canonicalKey: 'lucie', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 12, day: 17, displayName: 'Daniel', canonicalKey: 'daniel', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 12, day: 20, displayName: 'Dagmar', canonicalKey: 'dagmar', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 12, day: 22, displayName: 'Šimon', canonicalKey: 'simon', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 12, day: 24, displayName: 'Adam', canonicalKey: 'adam', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 12, day: 24, displayName: 'Eva', canonicalKey: 'eva', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 12, day: 26, displayName: 'Štěpán', canonicalKey: 'stepan', rank: 'primary' },
    { region: 'CZ', tradition: 'civil', month: 12, day: 31, displayName: 'Silvestr', canonicalKey: 'silvestr', rank: 'primary' },
];
