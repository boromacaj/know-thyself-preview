/*
 * FORECAST V2: WHAT A DAY IS MADE OF.
 *
 * The legacy Forecast sums every fact in force into one weighted pile, and a
 * long-running fact outweighs a day-long one by roughly nine to one. Measured on
 * the four QA profiles across 2026-10-07..12, four of its five Day sections are
 * byte-identical on all six days. A day reading cannot be built by turning a
 * weight up: it needs to know what each fact IS to a day.
 *
 *   BACKGROUND  what is already in place - a slow transit, the Personal Year and
 *               Month, the annual and luck pillars. It says why a day matters.
 *               It does not, alone, say what today is for.
 *   TRIGGER     what makes THIS calendar day distinct - the Moon, a fast planet's
 *               contact with the natal chart, the Personal Day.
 *
 * The day is BACKGROUND x TRIGGER. A background condition shapes, qualifies and
 * is allowed to oppose a trigger; it never produces a "today" claim on its own.
 *
 * NOTHING HERE IS PROSE. A DayFact carries what the engines calculated and what
 * the tradition the app already uses says it presses on, as closed vocabularies.
 * The words are written later, from the plan, in one place.
 */
/** Bumped whenever a rule, table or threshold changes what a day says. Stored with every plan. */
export const DAY_ENGINE_VERSION = 'know-thyself-forecast-v2.1';
/**
 * The eight things a day can lean on, each a pair of poles. A closed set on
 * purpose: the plan reasons over these, and the only free text anywhere is the
 * English realisation at the very end.
 */
export const DAY_AXES = [
    { id: 'pace', poles: ['urgent', 'unhurried'] },
    { id: 'focus', poles: ['wide', 'narrow'] },
    { id: 'contact', poles: ['outward', 'inward'] },
    { id: 'feeling', poles: ['open', 'contained'] },
    { id: 'motion', poles: ['begin', 'finish'] },
    { id: 'commitment', poles: ['commit', 'keep-open'] },
    { id: 'friction', poles: ['charged', 'smooth'] },
    { id: 'expression', poles: ['speak', 'listen'] },
];
export const OPPOSITE_POLE = {
    urgent: 'unhurried', unhurried: 'urgent',
    wide: 'narrow', narrow: 'wide',
    outward: 'inward', inward: 'outward',
    open: 'contained', contained: 'open',
    begin: 'finish', finish: 'begin',
    commit: 'keep-open', 'keep-open': 'commit',
    charged: 'smooth', smooth: 'charged',
    speak: 'listen', listen: 'speak',
};
export const AXIS_OF_POLE = Object.fromEntries(DAY_AXES.flatMap((axis) => axis.poles.map((pole) => [pole, axis.id])));
