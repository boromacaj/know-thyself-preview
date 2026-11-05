/**
 * ONE ADULT, ONE VOICE: THE SLOVAK PLURAL "VY" OF A STEP BECOMES "TY" WHERE THE HOUSEHOLD HAS ONE ADULT.
 *
 * The household patterns are written once and told in households of one adult and of two. A Slovak step that says "Dohodnite sa" or "Nechajte každé z nich" is addressed to two people;
 * on a page that says "Spomínaš" and "Všímaš si" to a single parent it is a change of person. The patterns that only make sense between two adults are never told to one, so what is left
 * are imperatives addressed to "the adult" of the page: they are put in the singular here, from a closed list. A test sweeps every Slovak string of the household and fails on any
 * plural-imperative form that is neither in this list nor on the short list of words that only look like one, so a new string cannot slip a plural "vy" in.
 */
export const PLURAL_IMPERATIVES = [
    'nechajte', 'dohodnite', 'povedzte', 'dajte', 'vyberte', 'ponúknite', 'pomenujte', 'spýtajte', 'plánujte', 'zachovajte', 'pridajte', 'venujte', 'naplánujte', 'všímajte', 'ujasnite',
    'ponechajte', 'začnite', 'ustupujte', 'riaďte', 'počítajte', 'hovorte', 'berte', 'hľadajte', 'zistite', 'ohlasujte', 'prinášajte', 'počkajte', 'rozhodnite', 'prineste', 'majte',
    'nepredkladajte', 'zaraďte', 'votkajte', 'nenaprávajte', 'rozdeľte', 'určte', 'spíšte', 'zvoľte', 'pripravte', 'zapíšte', 'skúste', 'vezmite', 'držte', 'zostaňte', 'pomôžte',
    'vysvetlite', 'opýtajte', 'dohodnite', 'oddeľte', 'umožnite', 'predstavte', 'ukážte', 'chváľte', 'volajte', 'zastavte', 'upravte', 'pomenujte', 'pozrite', 'otvorte', 'rešpektujte', 'dodržte', 'spomaľte', 'položte',
];
/** The few plural-adult phrases of the pair readings and cards, in the singular for a household of one adult. */
const PHRASES = [
    ['ktorý mu dospelí nechajú', 'ktorý mu dospelý človek necháva'],
    ['nech platí aj pre dospelých', 'nech platí aj pre dospelého človeka'],
];
/** Words that end like a plural imperative and are not one (the sweep test skips them). */
export const NOT_IMPERATIVES = ['mieste', 'ste', 'geste', 'vernoste', 'zvyste', 'cesty'];
const IMPERATIVE = new RegExp(`(?<![\\p{L}])(${[...new Set(PLURAL_IMPERATIVES)].join('|')})(?![\\p{L}])`, 'giu');
/** The singular imperative of a plural one: the final "-te" is dropped, with "-ite" becoming "-i" and "-zte" "-z" ("povedzte" is "povedz"), and "prineste" "prines". */
export function singularImperative(word) {
    const lower = word.toLowerCase();
    let out;
    if (lower.endsWith('ite'))
        out = lower.slice(0, -3) + 'i';
    else if (lower.endsWith('jte') || lower.endsWith('rte') || lower.endsWith('zte') || lower.endsWith('ľte') || lower.endsWith('ďte') || lower.endsWith('ťte') || lower.endsWith('lte'))
        out = lower.slice(0, -2);
    else if (lower.endsWith('ste'))
        out = lower.slice(0, -2);
    else if (lower.endsWith('te'))
        out = lower.slice(0, -2);
    else
        out = lower;
    return word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase() ? out[0].toUpperCase() + out.slice(1) : out;
}
/** A Slovak text for a single adult: the imperatives of the list in the singular, "každý z vás" never occurs here. English has no plural "you" to change. */
export function forOneAdult(text, lang) {
    if (lang !== 'sk')
        return text;
    let out = text;
    for (const [from, to] of PHRASES)
        out = out.split(from).join(to);
    return out.replace(IMPERATIVE, (word) => singularImperative(word));
}
/** Whether a Slovak text still holds a plural-imperative word (for the sweep test): any word of the list, in any case. */
export function pluralImperativesIn(text) {
    return [...text.matchAll(IMPERATIVE)].map((match) => match[1]);
}
