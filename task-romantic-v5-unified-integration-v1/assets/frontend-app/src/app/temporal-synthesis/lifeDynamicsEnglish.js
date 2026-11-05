/*
 * LIFE DYNAMICS, IN ENGLISH.
 *
 * The wording of the Year and Month's Life Dynamics block lives here and not in
 * the UI-string dictionary on purpose: the Slovak Forecast keeps drawing the
 * Day profile's five areas (it is frozen until the English work is approved), and
 * a dictionary key added for English would need a Slovak translation nobody has
 * reviewed. Closed vocabularies, like the English Day card's.
 *
 * WHAT THE WORDS MAY CLAIM. A level is how much of the period's thematic emphasis
 * falls on an area. Never that the area goes well or badly, never an outcome: no
 * word below is about luck, success, diagnosis, income or romance, and the lowest
 * level is called "Quiet", not "Weak" - a quiet area is not a failing one.
 */
export const LIFE_LABEL = {
    'mind-focus': 'Mind & Focus',
    'career-purpose': 'Career & Purpose',
    'love-connection': 'Love & Connection',
    'health-recovery': 'Health & Recovery',
    'money-resources': 'Money & Resources',
};
/** One compact line under each name: what the area is about. */
export const LIFE_HELPER = {
    'mind-focus': 'thinking, concentration, learning, planning, decisions',
    'career-purpose': 'work, direction, ambitions, meaningful effort, goals',
    'love-connection': 'relationships, emotional bonds, communication, cooperation, belonging',
    'health-recovery': 'daily rhythm, rest, balance, recovery, energy',
    'money-resources': 'financial planning, material priorities, commitments, resources, stewardship',
};
/**
 * Emphasis, not quality - and the same five words on the Day, the Month and the Year. The scales behind them
 * are different measures (a period average against a day's own triggers) and are not comparable; the words
 * describe an amount of emphasis, never how well a theme goes.
 */
export const LIFE_LEVEL_WORD = {
    1: 'Subtle', 2: 'Moderate', 3: 'Active', 4: 'Prominent', 5: 'Central theme',
};
/** The graph's two axis ends: short, because they sit in its narrow left margin. */
export const LIFE_AXIS_WORD = { 1: 'Subtle', 5: 'Central' };
export const LIFE_COPY = {
    titleYear: 'This Year’s Life Dynamics',
    titleMonth: 'This Month’s Life Dynamics',
    subtitleYear: 'Which themes stand out this year',
    subtitleMonth: 'Which themes stand out this month',
    noteYear: 'Each theme shows how much of this year’s emphasis falls on it. It describes emphasis, not how things will go.',
    noteMonth: 'Each theme shows how much of this month’s emphasis falls on it. It describes emphasis, not how things will go.',
    /** {domain}: {state} emphasis, {level} of 5 */
    gaugeAria: (domain, state, level) => `${domain}: ${state.toLowerCase()} emphasis, ${level} of 5`,
    cardAria: (domain, state, level) => `${domain}: ${state.toLowerCase()} emphasis, ${level} of 5. Show it on the graph`,
    trendAreas: 'Themes',
    showArea: (area) => `Show ${area}`,
    prevArea: 'Previous theme',
    nextArea: 'Next theme',
    openMonth: (point) => `Open ${point}`,
    openDay: (point) => `Open ${point}`,
    valueText: (point, state) => `${point}: ${state.toLowerCase()} emphasis`,
    yearAria: (area, period) => `${area}: emphasis through ${period}, month by month`,
    monthAria: (area, period) => `${area}: emphasis through ${period}, day by day`,
    hintYear: 'Tap the graph to pick a month. Swipe sideways for another theme.',
    hintMonth: 'Tap the graph to pick a day. Swipe sideways for another theme.',
    methodYear: (year) => `Life Dynamics: each point on the graph is one month of ${year}, the average of that month’s daily weights on the Life Dynamics period model. The five cards show the level of the average over every day of the year, each day counted once; that is not the average of the twelve points. The Day view measures only what is distinct about a single date, on its own scale, so its level for a date can differ from the graph’s without either being wrong. “Not assessed” there means there was not enough day-specific evidence, not a low level. The summary and the influences use everything active during the year, each weighted by how many of its days it covers, not one sample date.`,
    methodMonth: 'Life Dynamics and graph: each point is one date, read on the Life Dynamics period model, which weighs everything active that day for each theme against an ordinary period for that theme. The five cards show the level of the average of the month’s daily weights, not the average of the level numbers. The Day view measures only what is distinct about a single date, on its own scale, so its level for a date can differ from the graph’s without either being wrong. “Not assessed” there means there was not enough day-specific evidence, not a low level. The summary and the influences use everything active during the month, each weighted by how many of its days it covers.',
};
