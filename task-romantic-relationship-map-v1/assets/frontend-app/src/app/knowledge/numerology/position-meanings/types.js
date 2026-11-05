/**
 * THE CORE-POSITION MEANING RECORDS - the shape of one entry.
 *
 * Forty-eight of these exist: twelve numbers (1-9 and the master numbers 11, 22, 33) in each of the four core positions (Life Path,
 * Expression, Soul Urge, Personality). They are what a tap on one of the four Numerology circles opens.
 *
 * WHERE THIS SITS IN THE KNOWLEDGE LAYER. The readings in the registry (numerologyRoles.ts and the files beside it) are the reading's
 * own prose: a headline, a core reading, a portrait. A record here does not replace or restate one of them. It is the SHORT, STRUCTURED
 * companion of the same unit - what the number stands for, what it means in this position, its strengths, its tensions, how it tends to
 * show up and one question - and it names the unit it accompanies (`unitId`), so the two can be read together and a test can prove they
 * describe the same thing. The unit's headline is the dialog's title; nothing here is allowed to say something the unit contradicts.
 *
 * Nothing here calculates. The number comes from the engine; a record is looked up by (position, number) and never computed.
 */
export const CORE_POSITIONS = ['life-path', 'expression', 'soul-urge', 'personality'];
/** The twelve values a core position can hold: the nine single digits and the three master numbers the methodology keeps. */
export const CORE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];
