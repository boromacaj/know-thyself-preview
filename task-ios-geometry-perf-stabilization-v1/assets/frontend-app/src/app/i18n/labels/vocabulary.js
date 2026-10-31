import { BODY_NOMINATIVE, PHASE, SIGN_NOMINATIVE } from '../engineProse.js?v=d9f39e7';
/** Aspect names. Slovak astrology uses these forms, not the English ones. */
export const ASPECT = {
    conjunction: 'konjunkcia',
    opposition: 'opozícia',
    square: 'kvadratúra',
    trine: 'trigon',
    sextile: 'sextil',
    /* the minor aspects the Advanced chart draws, in the forms the Slovak limitation text already uses */
    semisextile: 'semisextil',
    semisquare: 'semikvadrát',
    sesquiquadrate: 'sesquikvadrát',
    quincunx: 'kvinkunx',
};
/** Ordinals as the numerology chapters use them, feminine and masculine. */
export const ORDINAL_M = {
    first: 'Prvý', second: 'Druhý', third: 'Tretí', fourth: 'Štvrtý',
};
export const ORDINAL_F = {
    first: 'Prvá', second: 'Druhá', third: 'Tretia', fourth: 'Štvrtá',
};
/** Which pillar a Year/Month/Day/Hour label is talking about, in the genitive. */
export const PILLAR_GENITIVE = {
    Year: 'roka', Month: 'mesiaca', Day: 'dňa', Hour: 'hodiny',
};
/** The lunar nodes, which are bodies for labelling purposes but not planets. */
export const NODE = {
    'north node': 'Severný uzol',
    'south node': 'Južný uzol',
};
export const node = (english) => NODE[english.trim().toLowerCase()] ?? null;
/** A body name in Slovak, or null when it is not one we know. */
export const body = (english) => BODY_NOMINATIVE[english.trim().toLowerCase()] ?? null;
export const sign = (english) => SIGN_NOMINATIVE[english.trim().toLowerCase()] ?? null;
/* The five phases appear as bare field labels in the BaZi element counts. PHASE
   holds them lower case, because in a sentence that is how they read; as a
   label they start a line and take a capital. */
export const phaseLabel = (english) => {
    /* PHASE is keyed by the capitalised English name, unlike the sign and body
       tables beside it, which are keyed lower case. Lower-casing the lookup here
       silently returned nothing for all five phases. */
    const value = PHASE[english.trim()];
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : null;
};
