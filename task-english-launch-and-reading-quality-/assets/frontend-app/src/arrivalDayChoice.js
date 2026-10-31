/*
 * THE ONE WAY A CALENDAR DAY IS CHOSEN.
 *
 * The date picker renders every day as a button that carries its own date
 * (`data-date="YYYY-MM-DD"`). Its click dispatches this event from that button
 * with that date, and nothing else - no header text, no printed number, no
 * position in the grid. A module that wants a different commit behaviour (the
 * draft-and-OK confirmation step) listens for it and cancels it to claim the
 * choice; an unclaimed choice is committed by the picker itself.
 */
export const ARRIVAL_DAY_CHOSEN = 'arrival:daychosen';
