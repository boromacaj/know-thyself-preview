/*
 * HUNGARY - THE CIVIL NAME-DAY CALENDAR, PARTIAL.
 * ===============================================
 *
 * Hungarian "nevnap", which is observed at least as warmly as a birthday and is
 * printed in every Hungarian calendar. Hungary is the most useful contrast in
 * this set precisely because its names are not Slavic cognates that happen to
 * shift by a day or two - they are the same saints under different names on
 * genuinely different dates. Istvan is 20 August, the national day, where the
 * Czech Stepan, Slovak Stefan and Polish Szczepan are all 26 December.
 * Zsuzsanna is 19 February where Zuzana and Zuzanna are 11 August. Monika is
 * 4 May, a fourth answer to a question the other three calendars already
 * answered three different ways.
 *
 * WHY THIS FILE IS PARTIAL, AND WHY THAT IS A CHOICE.
 * Coverage is declared `partial`. What is here is the common Hungarian given
 * names plus the names that also appear in the Slovak, Czech or Polish
 * calendars, which is what the cross-country reading needs. The rest of the
 * year is absent rather than guessed. That is deliberate: a dataset that covers
 * every day by inventing the uncertain ones cannot be distinguished from one
 * that knows them, so it poisons the entries that were right. Being told the
 * wrong day for your own name is a small error that reads as carelessness about
 * the person, and it is not worth a fuller-looking file.
 *
 * A handful of names carry both a primary and a secondary date - Maria on
 * 12 September and 15 August, Zsuzsanna on 19 February and 11 August, Istvan on
 * 20 August and 26 December - because Hungarian calendars really do print them
 * twice, and collapsing that would be a data loss, not a simplification.
 *
 * PROVENANCE - READ THIS BEFORE SHIPPING.
 * Curated from general knowledge. NOT transcribed from an official published
 * Hungarian calendar, and no line here has been checked against one. Hungarian
 * calendars also differ among themselves on the secondary names given to a
 * date. Verify against a published edition before this is put in front of users.
 */
export const HUNGARY_NAME_DAYS = [
    /* January */
    { region: 'HU', tradition: 'civil', month: 1, day: 1, displayName: 'Fruzsina', canonicalKey: 'fruzsina', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 1, day: 6, displayName: 'Boldizsár', canonicalKey: 'boldizsar', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 1, day: 18, displayName: 'Piroska', canonicalKey: 'piroska', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 1, day: 19, displayName: 'Sára', canonicalKey: 'sara', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 1, day: 21, displayName: 'Ágnes', canonicalKey: 'agnes', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 1, day: 22, displayName: 'Vince', canonicalKey: 'vince', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 1, day: 25, displayName: 'Pál', canonicalKey: 'pal', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 1, day: 28, displayName: 'Károly', canonicalKey: 'karoly', rank: 'secondary' },
    /* February */
    { region: 'HU', tradition: 'civil', month: 2, day: 1, displayName: 'Ignác', canonicalKey: 'ignac', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 2, day: 3, displayName: 'Balázs', canonicalKey: 'balazs', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 2, day: 5, displayName: 'Ágota', canonicalKey: 'agota', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 2, day: 6, displayName: 'Dorottya', canonicalKey: 'dorottya', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 2, day: 14, displayName: 'Bálint', canonicalKey: 'balint', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 2, day: 16, displayName: 'Julianna', canonicalKey: 'julianna', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 2, day: 19, displayName: 'Zsuzsanna', canonicalKey: 'zsuzsanna', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 2, day: 24, displayName: 'Mátyás', canonicalKey: 'matyas', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 2, day: 25, displayName: 'Géza', canonicalKey: 'geza', rank: 'primary' },
    /* March */
    { region: 'HU', tradition: 'civil', month: 3, day: 1, displayName: 'Albin', canonicalKey: 'albin', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 3, day: 3, displayName: 'Kornélia', canonicalKey: 'kornelia', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 3, day: 8, displayName: 'Zoltán', canonicalKey: 'zoltan', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 3, day: 12, displayName: 'Gergely', canonicalKey: 'gergely', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 3, day: 18, displayName: 'Sándor', canonicalKey: 'sandor', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 3, day: 19, displayName: 'József', canonicalKey: 'jozsef', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 3, day: 21, displayName: 'Benedek', canonicalKey: 'benedek', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 3, day: 24, displayName: 'Gábor', canonicalKey: 'gabor', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 3, day: 25, displayName: 'Irén', canonicalKey: 'iren', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 3, day: 31, displayName: 'Árpád', canonicalKey: 'arpad', rank: 'primary' },
    /* April */
    { region: 'HU', tradition: 'civil', month: 4, day: 1, displayName: 'Hugó', canonicalKey: 'hugo', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 4, day: 4, displayName: 'Izidor', canonicalKey: 'izidor', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 4, day: 12, displayName: 'Gyula', canonicalKey: 'gyula', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 4, day: 23, displayName: 'Béla', canonicalKey: 'bela', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 4, day: 24, displayName: 'György', canonicalKey: 'gyorgy', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 4, day: 25, displayName: 'Márk', canonicalKey: 'mark', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 4, day: 30, displayName: 'Katalin', canonicalKey: 'katalin', rank: 'secondary' },
    /* May */
    { region: 'HU', tradition: 'civil', month: 5, day: 1, displayName: 'Fülöp', canonicalKey: 'fulop', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 5, day: 4, displayName: 'Mónika', canonicalKey: 'monika', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 5, day: 12, displayName: 'Pongrác', canonicalKey: 'pongrac', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 5, day: 13, displayName: 'Szervác', canonicalKey: 'szervac', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 5, day: 15, displayName: 'Zsófia', canonicalKey: 'zsofia', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 5, day: 25, displayName: 'Orbán', canonicalKey: 'orban', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 5, day: 31, displayName: 'Eszter', canonicalKey: 'eszter', rank: 'primary' },
    /* June */
    { region: 'HU', tradition: 'civil', month: 6, day: 1, displayName: 'Tünde', canonicalKey: 'tunde', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 6, day: 8, displayName: 'Medárd', canonicalKey: 'medard', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 6, day: 10, displayName: 'Margit', canonicalKey: 'margit', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 6, day: 13, displayName: 'Antal', canonicalKey: 'antal', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 6, day: 15, displayName: 'Jolán', canonicalKey: 'jolan', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 6, day: 24, displayName: 'Iván', canonicalKey: 'ivan', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 6, day: 27, displayName: 'László', canonicalKey: 'laszlo', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 6, day: 29, displayName: 'Péter', canonicalKey: 'peter', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 6, day: 29, displayName: 'Pál', canonicalKey: 'pal', rank: 'secondary' },
    /* July */
    { region: 'HU', tradition: 'civil', month: 7, day: 2, displayName: 'Ottó', canonicalKey: 'otto', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 7, day: 9, displayName: 'Veronika', canonicalKey: 'veronika', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 7, day: 13, displayName: 'Jenő', canonicalKey: 'jeno', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 7, day: 15, displayName: 'Henrik', canonicalKey: 'henrik', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 7, day: 17, displayName: 'Endre', canonicalKey: 'endre', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 7, day: 19, displayName: 'Emília', canonicalKey: 'emilia', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 7, day: 20, displayName: 'Illés', canonicalKey: 'illes', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 7, day: 22, displayName: 'Magdolna', canonicalKey: 'magdolna', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 7, day: 24, displayName: 'Krisztina', canonicalKey: 'krisztina', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 7, day: 25, displayName: 'Jakab', canonicalKey: 'jakab', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 7, day: 25, displayName: 'Kristóf', canonicalKey: 'kristof', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 7, day: 26, displayName: 'Anna', canonicalKey: 'anna', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 7, day: 29, displayName: 'Márta', canonicalKey: 'marta', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 7, day: 31, displayName: 'Oszkár', canonicalKey: 'oszkar', rank: 'primary' },
    /* August */
    { region: 'HU', tradition: 'civil', month: 8, day: 1, displayName: 'Boglárka', canonicalKey: 'boglarka', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 8, day: 4, displayName: 'Domonkos', canonicalKey: 'domonkos', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 8, day: 10, displayName: 'Lőrinc', canonicalKey: 'lorinc', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 8, day: 11, displayName: 'Zsuzsanna', canonicalKey: 'zsuzsanna', rank: 'secondary' },
    { region: 'HU', tradition: 'civil', month: 8, day: 15, displayName: 'Mária', canonicalKey: 'maria', rank: 'secondary' },
    { region: 'HU', tradition: 'civil', month: 8, day: 18, displayName: 'Ilona', canonicalKey: 'ilona', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 8, day: 20, displayName: 'István', canonicalKey: 'istvan', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 8, day: 24, displayName: 'Bertalan', canonicalKey: 'bertalan', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 8, day: 25, displayName: 'Lajos', canonicalKey: 'lajos', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 8, day: 28, displayName: 'Ágoston', canonicalKey: 'agoston', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 8, day: 30, displayName: 'Rózsa', canonicalKey: 'rozsa', rank: 'primary' },
    /* September */
    { region: 'HU', tradition: 'civil', month: 9, day: 1, displayName: 'Egyed', canonicalKey: 'egyed', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 9, day: 12, displayName: 'Mária', canonicalKey: 'maria', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 9, day: 13, displayName: 'Kornél', canonicalKey: 'kornel', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 9, day: 16, displayName: 'Edit', canonicalKey: 'edit', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 9, day: 21, displayName: 'Máté', canonicalKey: 'mate', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 9, day: 29, displayName: 'Mihály', canonicalKey: 'mihaly', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 9, day: 30, displayName: 'Jeromos', canonicalKey: 'jeromos', rank: 'primary' },
    /* October */
    { region: 'HU', tradition: 'civil', month: 10, day: 4, displayName: 'Ferenc', canonicalKey: 'ferenc', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 10, day: 6, displayName: 'Renáta', canonicalKey: 'renata', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 10, day: 15, displayName: 'Teréz', canonicalKey: 'terez', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 10, day: 16, displayName: 'Gál', canonicalKey: 'gal', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 10, day: 18, displayName: 'Lukács', canonicalKey: 'lukacs', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 10, day: 21, displayName: 'Orsolya', canonicalKey: 'orsolya', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 10, day: 28, displayName: 'Simon', canonicalKey: 'simon', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 10, day: 31, displayName: 'Farkas', canonicalKey: 'farkas', rank: 'primary' },
    /* November */
    { region: 'HU', tradition: 'civil', month: 11, day: 4, displayName: 'Károly', canonicalKey: 'karoly', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 11, day: 5, displayName: 'Imre', canonicalKey: 'imre', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 11, day: 11, displayName: 'Márton', canonicalKey: 'marton', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 11, day: 13, displayName: 'Szilvia', canonicalKey: 'szilvia', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 11, day: 19, displayName: 'Erzsébet', canonicalKey: 'erzsebet', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 11, day: 22, displayName: 'Cecília', canonicalKey: 'cecilia', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 11, day: 25, displayName: 'Katalin', canonicalKey: 'katalin', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 11, day: 30, displayName: 'András', canonicalKey: 'andras', rank: 'primary' },
    /* December */
    { region: 'HU', tradition: 'civil', month: 12, day: 4, displayName: 'Borbála', canonicalKey: 'borbala', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 12, day: 6, displayName: 'Miklós', canonicalKey: 'miklos', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 12, day: 10, displayName: 'Judit', canonicalKey: 'judit', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 12, day: 13, displayName: 'Luca', canonicalKey: 'luca', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 12, day: 21, displayName: 'Tamás', canonicalKey: 'tamas', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 12, day: 24, displayName: 'Ádám', canonicalKey: 'adam', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 12, day: 24, displayName: 'Éva', canonicalKey: 'eva', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 12, day: 26, displayName: 'István', canonicalKey: 'istvan', rank: 'secondary' },
    { region: 'HU', tradition: 'civil', month: 12, day: 27, displayName: 'János', canonicalKey: 'janos', rank: 'primary' },
    { region: 'HU', tradition: 'civil', month: 12, day: 31, displayName: 'Szilveszter', canonicalKey: 'szilveszter', rank: 'primary' },
];
