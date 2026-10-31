/**
 * NUMEROLOGY METHODOLOGY - the one implementation of every convention.
 *
 * docs/numerology/NUMEROLOGY_METHODOLOGY_CONTRACT.md is the contract; this file
 * implements it. The Numerology tab (core/numerology.ts) and the Forecast
 * (app/numerology-forecast/personalCycles.ts) both calculate through it, so the
 * same birth data and the same civil date mean the same numbers everywhere in
 * the app. If this file and the contract disagree, one of them is a bug.
 *
 * Pure integer and string arithmetic. No clock is read, no locale is consulted,
 * no timezone is applied: a caller that wants "today" passes a calendar date.
 *
 * EVERY CONVENTION IS NAMED HERE, NOT IMPLIED BY A SHARED REDUCER.
 * Master numbers are kept in some positions and reduced in others, and that is
 * a decision per position - see MASTER_POLICY. Each position below reads its
 * policy from that table by name, so a Challenge cannot inherit the Life Path's
 * master handling by accident, and a Personal Month cannot inherit it either.
 */
export const NUMEROLOGY_METHODOLOGY_VERSION = 'numerology-methodology-v1';
/* ------------------------------------------------------------ alphabet -- */
/** Pythagorean letter values, A=1 ... I=9, J=1 ... R=9, S=1 ... Z=8. */
export const PYTHAGOREAN_VALUES = {
    A: 1, J: 1, S: 1,
    B: 2, K: 2, T: 2,
    C: 3, L: 3, U: 3,
    D: 4, M: 4, V: 4,
    E: 5, N: 5, W: 5,
    F: 6, O: 6, X: 6,
    G: 7, P: 7, Y: 7,
    H: 8, Q: 8, Z: 8,
    I: 9, R: 9,
};
/** The five letters that are always vowels. Y is decided by position; W never is a vowel. */
export const STRICT_VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);
/* ------------------------------------------------------- normalization -- */
/*
 * Latin letters that Unicode does not decompose into base letter + mark, so the
 * NFD fold below cannot reach them. Treating Ł differently from Č would be an
 * accident of the Unicode tables, not a methodology: both are a Latin letter
 * with a diacritic. Small and explicit on purpose. Non-Latin scripts are NOT
 * transliterated - that is language-specific and ambiguous - and contribute no
 * value.
 */
const TRANSLITERATION = {
    'Æ': 'AE',
    'Œ': 'OE',
    'Ø': 'O',
    'Ł': 'L',
    'Đ': 'D',
    'Ð': 'D',
    'Þ': 'TH',
    'ẞ': 'SS',
    'Ħ': 'H',
    'Ŧ': 'T',
    'Ŀ': 'L',
};
/**
 * The calculation letters of a piece of name text, A-Z only.
 *
 * NFD, then every combining mark is dropped (Á -> A, Č -> C, Ý -> Y), then a
 * locale-independent uppercase (`toUpperCase`, never `toLocaleUpperCase`, so a
 * Turkish or Azeri device cannot change a result; ß becomes SS here), then the
 * transliteration table, then everything outside A-Z is dropped: spaces,
 * hyphens, apostrophes, digits and non-Latin letters contribute nothing.
 */
export function normalizeNameLetters(text) {
    const folded = text.normalize('NFD').replace(/\p{M}/gu, '').toUpperCase();
    let letters = '';
    for (const character of folded)
        letters += TRANSLITERATION[character] ?? character;
    return letters.replace(/[^A-Z]/g, '');
}
export function letterValues(letters) {
    return [...letters].map((letter) => PYTHAGOREAN_VALUES[letter]).filter((value) => Number.isFinite(value));
}
/* ---------------------------------------------------------- name units -- */
/*
 * A name unit is one name: a given name, a middle name, one surname. The name
 * numbers are reduced unit by unit, so how the text splits into units decides
 * which masters and which karmic debts can appear.
 *
 * Whitespace and hyphens (any dash) separate units, so "Anna-Mária" and
 * "Anna Mária" are the same two names and give the same numbers. Apostrophes do
 * not separate (O'Brien is one name, OBRIEN). Middle names are further given
 * units; a double surname is two surname units.
 */
const UNIT_SEPARATOR = /[\s\-‐-―−]+/u;
export function nameUnits(givenNames, surname) {
    const units = [];
    const fields = [['given', givenNames], ['surname', surname]];
    for (const [source, field] of fields) {
        for (const raw of field.split(UNIT_SEPARATOR)) {
            const letters = normalizeNameLetters(raw);
            if (letters)
                units.push({ source, raw, letters });
        }
    }
    return units;
}
/**
 * Vowel or consonant, for the letter at `index` of ONE unit's letters.
 *
 * A, E, I, O, U are vowels. Y is a vowel when neither neighbour inside the same
 * unit is A, E, I, O or U, and a consonant when either one is. Everything else,
 * W included, is a consonant.
 *
 * This is Decoz's positional rule set stated as one condition: first and
 * followed by a consonant (Yvonne), last after a consonant (Mary, Bátovský),
 * between two consonants (Kyle, Lynn) -> vowel; beside a vowel (Yolanda,
 * Murray, Kuykendahl, Maloney) -> consonant. Decoz resolves two further names
 * by sound (Bryan, Wyatt: vowel); a spelling rule cannot hear, so they follow
 * the default and read as consonant. See the contract, section Y.
 */
export function letterRole(letters, index) {
    const letter = letters[index];
    if (STRICT_VOWELS.has(letter))
        return 'vowel';
    if (letter !== 'Y')
        return 'consonant';
    const before = index > 0 ? letters[index - 1] : undefined;
    const after = index + 1 < letters.length ? letters[index + 1] : undefined;
    const besideVowel = (before !== undefined && STRICT_VOWELS.has(before))
        || (after !== undefined && STRICT_VOWELS.has(after));
    return besideVowel ? 'consonant' : 'vowel';
}
/** The letters of one unit that a name number reads: all, the vowels, or the consonants. */
export function selectLetters(letters, selection) {
    if (selection === 'all')
        return letters;
    const wanted = selection === 'vowels' ? 'vowel' : 'consonant';
    let selected = '';
    for (let index = 0; index < letters.length; index += 1) {
        if (letterRole(letters, index) === wanted)
            selected += letters[index];
    }
    return selected;
}
/* ----------------------------------------------------------- reduction -- */
export const MASTER_NUMBERS = [11, 22, 33];
/*
 * THE MASTER-NUMBER POLICY, POSITION BY POSITION.
 *
 * "Parts" are what a position adds up; the position's own policy says how that
 * sum is reduced. Every calculation below reads its policy from here by name.
 */
export const MASTER_POLICY = {
    /** Birth month, day and year for the Life Path: single digit or master (Nov = 11, 29 -> 11, 1966 -> 22). */
    lifePathParts: 'keep-masters',
    lifePath: 'keep-masters',
    birthDay: 'keep-masters',
    /** Each name (unit) is reduced to a single digit or a master before the units are added. */
    nameUnit: 'keep-masters',
    /** Expression, Soul Urge, Personality. */
    nameNumber: 'keep-masters',
    /** Life Path + Expression, each as calculated (a master is added as 11, 22, 33). */
    maturity: 'keep-masters',
    /** Month, day and year for the Pinnacles: the same single-digit-or-master parts as the Life Path. */
    pinnacleParts: 'keep-masters',
    pinnacle: 'keep-masters',
    /** Month, day and year for the Challenges: single digits, masters reduced (11 -> 2, 22 -> 4). */
    challengeParts: 'reduce-masters',
    /** Initials; masters reduced. */
    balance: 'reduce-masters',
    /** Birth month + birth day; masters reduced. */
    attitude: 'reduce-masters',
    /** Birth month, birth day, calendar year, calendar month, day of month: all reduced. */
    personalCycleParts: 'reduce-masters',
    /** Personal Year, Month and Day are always 1-9. */
    personalCycle: 'reduce-masters',
};
export function digitSum(value) {
    let sum = 0;
    let rest = Math.abs(Math.trunc(value));
    while (rest > 0) {
        sum += rest % 10;
        rest = Math.trunc(rest / 10);
    }
    return sum;
}
export function isMasterNumber(value) {
    return MASTER_NUMBERS.includes(value);
}
/**
 * Repeated digit sum. With 'keep-masters' the reduction stops the moment it
 * reaches 11, 22 or 33, at whatever step (29 -> 11); with 'reduce-masters' it
 * always ends at 1-9. Zero stays zero - it only arises from an empty input.
 */
export function reduceNumber(value, policy) {
    let current = Math.abs(Math.trunc(value));
    const chain = [current];
    while (current > 9 && !(policy === 'keep-masters' && isMasterNumber(current))) {
        current = digitSum(current);
        chain.push(current);
    }
    return { chain, result: current, isMaster: isMasterNumber(current) };
}
/** A master's own digit: 11 -> 2, 22 -> 4, 33 -> 6; any other value reduced to 1-9. */
export function rootNumber(value) {
    return reduceNumber(value, 'reduce-masters').result;
}
/* ---------------------------------------------------------- karmic debt -- */
export const KARMIC_DEBT_NUMBERS = [13, 14, 16, 19];
/**
 * The karmic-debt number in ONE position's own reduction chain, or null.
 *
 * The chain runs from the position's unreduced total to its result, so a debt
 * counts when it is that total (16 -> 7) or a total met on the way down
 * (49 -> 13 -> 4, 199 -> 19 -> 10 -> 1). The chains of the parts are not the
 * position's: a birth year that passes through 19 does not put a debt on the
 * Life Path, and a first name that totals 16 does not put one on the
 * Expression. A chain holds at most one of 13, 14, 16, 19.
 */
export function karmicDebtIn(reduction) {
    return reduction.chain.find((value) => KARMIC_DEBT_NUMBERS.includes(value)) ?? null;
}
/** Parses 'YYYY-MM-DD' (the profile's stored form) without any Date or timezone arithmetic. */
export function calendarDateFromIso(value) {
    const [year, month, day] = value.split('-').map(Number);
    return { year, month, day };
}
/** Birth month, day and year, each reduced under one policy. */
export function birthDateUnits(birth, policy) {
    return {
        month: reduceNumber(birth.month, policy),
        day: reduceNumber(birth.day, policy),
        year: reduceNumber(birth.year, policy),
    };
}
/**
 * Life Path = reduce( reduce(month) + reduce(day) + reduce(year) ), masters kept
 * at both levels. The component route: 28 Aug 1987 -> 8 + 1 + 7 = 16 -> 7.
 *
 * Adding all eight digits gives the same final digit (digit sums preserve the
 * value mod 9) but a different compound - 43 instead of 16 - and so it hides or
 * invents masters and karmic debts. See the contract, section Life Path.
 */
export function lifePathOf(birth) {
    const units = birthDateUnits(birth, MASTER_POLICY.lifePathParts);
    return {
        units,
        total: reduceNumber(units.month.result + units.day.result + units.year.result, MASTER_POLICY.lifePath),
    };
}
/** Birth Day = the day of the month reduced, masters kept: 28 -> 10 -> 1, 29 -> 11, 22 -> 22. */
export function birthDayOf(birth) {
    return reduceNumber(birth.day, MASTER_POLICY.birthDay);
}
/**
 * Expression ('all'), Soul Urge ('vowels') or Personality ('consonants').
 *
 * Per name: each unit's letters are summed and reduced to a single digit or a
 * master, then the unit results are added and reduced again, masters kept.
 * Thomas Cruise Mapother: 22 + 3 + 6 = 31 -> 4. A unit with no letters of the
 * selected kind contributes nothing.
 */
export function nameNumberOf(units, selection) {
    const unitNumbers = [];
    for (const unit of units) {
        const letters = selectLetters(unit.letters, selection);
        if (!letters)
            continue;
        const values = letterValues(letters);
        const sum = values.reduce((total, value) => total + value, 0);
        unitNumbers.push({ unit, letters, values, reduction: reduceNumber(sum, MASTER_POLICY.nameUnit) });
    }
    const compound = unitNumbers.reduce((total, entry) => total + entry.reduction.result, 0);
    return { units: unitNumbers, total: reduceNumber(compound, MASTER_POLICY.nameNumber) };
}
/* ------------------------------------------------------- derived numbers -- */
/** Maturity = Life Path + Expression, each as calculated; masters kept (11 + 11 = 22). */
export function maturityOf(lifePath, expression) {
    return reduceNumber(lifePath + expression, MASTER_POLICY.maturity);
}
/** Balance = the initials of every name unit, added and reduced to 1-9 (T + J + H = 11 -> 2). */
export function balanceOf(units) {
    const initials = units.map((unit) => unit.letters[0]).join('');
    const values = letterValues(initials);
    return {
        initials,
        values,
        total: reduceNumber(values.reduce((total, value) => total + value, 0), MASTER_POLICY.balance),
    };
}
/** Attitude = birth month + birth day, reduced to 1-9 (November 28: 11 + 28 = 39 -> 12 -> 3). */
export function attitudeOf(birth) {
    return reduceNumber(birth.month + birth.day, MASTER_POLICY.attitude);
}
/**
 * P1 = month + day, P2 = day + year, P3 = P1 + P2, P4 = month + year, every sum
 * reduced with masters kept. May 15, 1949: 11 / 11 / 22 / 1.
 */
export function pinnaclesOf(birth) {
    const units = birthDateUnits(birth, MASTER_POLICY.pinnacleParts);
    const month = units.month.result;
    const day = units.day.result;
    const year = units.year.result;
    const first = reduceNumber(month + day, MASTER_POLICY.pinnacle);
    const second = reduceNumber(day + year, MASTER_POLICY.pinnacle);
    const third = reduceNumber(first.result + second.result, MASTER_POLICY.pinnacle);
    const fourth = reduceNumber(month + year, MASTER_POLICY.pinnacle);
    return { units, first, second, third, fourth };
}
export const PINNACLE_BASE_AGE = 36;
export const PINNACLE_SPAN_YEARS = 9;
/**
 * The four Pinnacle age windows, in whole years.
 *
 * The first runs from birth to age 36 minus the Life Path, a master Life Path
 * reduced to its digit first (11 -> 2: ages 0-34). The second and third last
 * nine years each; the fourth runs for life. Ages are inclusive whole years:
 * Life Path 5 -> 0-31, 32-40, 41-49, 50+.
 */
export function pinnacleAgeWindows(lifePath) {
    const firstEnd = PINNACLE_BASE_AGE - rootNumber(lifePath);
    const secondEnd = firstEnd + PINNACLE_SPAN_YEARS;
    const thirdEnd = secondEnd + PINNACLE_SPAN_YEARS;
    return [
        { startAge: 0, endAge: firstEnd },
        { startAge: firstEnd + 1, endAge: secondEnd },
        { startAge: secondEnd + 1, endAge: thirdEnd },
        { startAge: thirdEnd + 1, endAge: null },
    ];
}
function challenge(left, right) {
    return { left, right, value: Math.abs(left - right) };
}
/**
 * C1 = |day - month|, C2 = |day - year|, C3 = |C1 - C2|, C4 = |month - year|.
 * A difference of two single digits, so 0-8; 0 is a real, common result.
 */
export function challengesOf(birth) {
    const units = birthDateUnits(birth, MASTER_POLICY.challengeParts);
    const month = units.month.result;
    const day = units.day.result;
    const year = units.year.result;
    const first = challenge(day, month);
    const second = challenge(day, year);
    const third = challenge(first.value, second.value);
    const fourth = challenge(month, year);
    return { units, first, second, third, fourth };
}
/** Digit-sum reduction to 1-9, masters included. Zero stays zero. */
export function reduceToDigit(value) {
    return reduceNumber(value, MASTER_POLICY.personalCycle).result;
}
function cycleTrace(parts) {
    const sum = parts.reduce((total, part) => total + part.value, 0);
    const { chain, result } = reduceNumber(sum, MASTER_POLICY.personalCycle);
    const steps = chain.slice(1).map((to, index) => ({ from: chain[index], to }));
    return { parts, sum, steps, result };
}
function cyclePart(value) {
    return reduceNumber(value, MASTER_POLICY.personalCycleParts).result;
}
/**
 * Personal Year = reduce( reduce(birth month) + reduce(birth day) + reduce(calendar year) ).
 *
 * Masters are reduced in the parts and in the sum, so the result is always 1-9;
 * reducing the parts first or adding every digit gives the same answer. It
 * pivots on 1 January of the calendar year, not on the birthday.
 */
export function personalYearOf(birth, targetYear) {
    const month = cyclePart(birth.month);
    const day = cyclePart(birth.day);
    const year = cyclePart(targetYear);
    return cycleTrace([
        { label: 'Birth month', value: month, reducedFrom: birth.month === month ? undefined : birth.month },
        { label: 'Birth day', value: day, reducedFrom: birth.day === day ? undefined : birth.day },
        { label: 'Calendar year', value: year, reducedFrom: targetYear },
    ]);
}
/** Personal Month = reduce( Personal Year + calendar month ). Pivots on the 1st. */
export function personalMonthOf(personalYear, targetMonth) {
    return cycleTrace([
        { label: 'Personal Year', value: personalYear },
        { label: 'Calendar month', value: targetMonth },
    ]);
}
/** Personal Day = reduce( Personal Month + day of month ). Pivots at civil midnight. */
export function personalDayOf(personalMonth, targetDay) {
    return cycleTrace([
        { label: 'Personal Month', value: personalMonth },
        { label: 'Day of month', value: targetDay },
    ]);
}
/** All three cycles for one civil date. */
export function personalCyclesFor(birth, target) {
    const yearTrace = personalYearOf(birth, target.year);
    const monthTrace = personalMonthOf(yearTrace.result, target.month);
    const dayTrace = personalDayOf(monthTrace.result, target.day);
    return {
        personalYear: yearTrace.result,
        personalMonth: monthTrace.result,
        personalDay: dayTrace.result,
        yearTrace,
        monthTrace,
        dayTrace,
    };
}
/** The twelve Personal Month numbers of one year - exactly what the Forecast graph plots. */
export function personalMonthsOfYear(birth, targetYear) {
    const personalYear = personalYearOf(birth, targetYear).result;
    return Array.from({ length: 12 }, (_, index) => personalMonthOf(personalYear, index + 1).result);
}
