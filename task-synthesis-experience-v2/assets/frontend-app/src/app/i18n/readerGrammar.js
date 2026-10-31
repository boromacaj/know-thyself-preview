/*
 * THE READER'S GRAMMAR.
 *
 * English addresses the reader without ever committing to a gender: "you were",
 * "you are ready", "on your own". Slovak cannot. The past tense, the adjective
 * and the pronoun all carry gender, so "you were" is `bol si` for a man, `bola
 * si` for a woman, and there is no neutral form for one person - the closest
 * honest neutral is the plural, `boli ste`, which is what the app's English
 * they/them corresponds to.
 *
 * The onboarding collects a body - male, female, or left unspecified - and that
 * is exactly the information the sentence needs. It reaches the prose through
 * this module and nowhere else.
 *
 * WHY A TOKEN IN THE TEXT, NOT THREE COPIES OF EVERY PARAGRAPH
 *
 * A gendered form is rare: across ~17,000 lines of Slovak reading there are a
 * few dozen. Duplicating every paragraph three times to vary a handful of
 * suffixes would triple the corpus, and the copies would drift the first time
 * someone edited one of them. So a gendered word is written ONCE, with its
 * three forms inline, and the form is picked at render time:
 *
 *     bol{|a|i} si            ->  bol si  /  bola si  /  boli ste*
 *     {sám|sama|sami}         ->  sám     /  sama     /  sami
 *     pripraven{ý|á|í}        ->  pripravený / pripravená / pripravení
 *
 * The three slots are ALWAYS masculine | feminine | neutral-plural, in that
 * order, and all three must be present. A two-slot token has no honest third
 * form and is rejected by the test suite rather than guessed at here.
 *
 * *The plural also changes the VERB and the clitic - `boli ste`, `ste sa`, not
 * `boli si` - so a sentence that needs the neutral form usually needs a token
 * on the verb as well: `bol{|a|i} s{i|i|te}`. That is the author's job, and the
 * rendered-output test renders the neutral fixture to catch a token that was
 * only half done. Where a sentence can be rephrased to avoid the gender
 * entirely, that is always the better fix; the token is for the cases that
 * cannot - and after the editorial pass of 2026-09 there are none left: every
 * reader-facing site was rephrased into the present, into a noun, or with the
 * thing as the subject, so all three bodies read one sentence. The machinery
 * stays for the next author who meets a sentence that will not bend, and the
 * QA census keeps the second-person masculine count at zero.
 *
 * WHY NOT `narodený/á`
 *
 * Slash forms are what the product was doing before this existed, and they are
 * banned in reader-facing prose: they are not Slovak, they are a form asking
 * the reader to finish the sentence. A token resolves to one word.
 *
 * WHY MODULE STATE
 *
 * The same reasoning as the locale (see locale.ts): the composers are pure
 * functions with no presentation argument, and the reader's body is global by
 * nature - it does not change between one paragraph and the next. The state is
 * set once, when the committed profile is computed, and read at render time.
 * It is deliberately NOT part of ProfileInput: no engine reads it, and putting
 * it in the engine contract would suggest that one does.
 */
/**
 * Nothing chosen yet reads as the neutral form. This is the same choice the
 * English makes with they/them, and it is the safe one: a masculine default
 * would misgender every reader who did not pick a body, silently.
 */
const DEFAULT_GRAMMAR = 'n';
let active = DEFAULT_GRAMMAR;
/** The vessel words the onboarding uses, mapped onto grammar. Anything else is neutral. */
export function grammarForVessel(vessel) {
    if (vessel === 'male')
        return 'm';
    if (vessel === 'female')
        return 'f';
    return 'n';
}
export function readerGrammar() {
    return active;
}
/** Returns true when the value actually changed, so a caller can decide to re-render. */
export function setReaderGrammar(grammar) {
    if (grammar === active)
        return false;
    active = grammar;
    return true;
}
export function resetReaderGrammar() {
    active = DEFAULT_GRAMMAR;
}
/*
 * The token: exactly three slots, `|`-separated, inside braces. A slot may be
 * empty (a suffix that is absent in one form, as in `bol{|a|i}`).
 *
 * It cannot collide with the UI dictionary's `{name}` placeholders, which never
 * contain a pipe, and it cannot match the Slovak quotation marks „ “ or an
 * ordinary parenthesis. A brace pair with one pipe or three is left alone, so
 * a malformed token stays visible in the text and the test suite catches it.
 */
const TOKEN = /\{([^{}|]*)\|([^{}|]*)\|([^{}|]*)\}/g;
const SLOT = { m: 1, f: 2, n: 3 };
/**
 * Resolve every gender token in a piece of text to the reader's form.
 *
 * Cheap enough to run on every string: the regex is anchored on a brace, and
 * the overwhelming majority of strings contain none and return unchanged.
 */
export function resolveReaderGrammar(text, grammar = active) {
    if (text.indexOf('{') === -1)
        return text;
    const slot = SLOT[grammar];
    return text.replace(TOKEN, (_whole, m, f, n) => (slot === 1 ? m : slot === 2 ? f : n));
}
/** Whether a string still carries an unresolved token. For tests and audits. */
export function hasReaderGrammarToken(text) {
    TOKEN.lastIndex = 0;
    return TOKEN.test(text);
}
/**
 * A brace group that LOOKS like a token but is not three slots - `{a|b}`,
 * `{a|b|c|d}` - which is the one mistake this syntax invites. Reported so the
 * suite can refuse it; never resolved, so it cannot silently pick a wrong form.
 */
const MALFORMED = /\{[^{}]*\|[^{}]*\}/g;
export function malformedReaderGrammarTokens(text) {
    const found = [];
    for (const match of text.matchAll(MALFORMED)) {
        const slots = match[0].slice(1, -1).split('|');
        if (slots.length !== 3)
            found.push(match[0]);
    }
    return found;
}
