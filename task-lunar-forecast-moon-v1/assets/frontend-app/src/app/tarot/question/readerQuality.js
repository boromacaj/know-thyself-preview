/**
 * WHAT MAKES A READING GENERIC, MEASURED.
 *
 * None of these phrases is forbidden on its own. A reading that leans on them is the
 * failure: the sentence could be pasted under any card in any spread and nobody would
 * notice. So the engine measures how many a text carries and how often it opens its
 * sentences or phrases the same way, and a test holds the whole corpus to a ceiling.
 *
 * Pure text in, numbers out. It reads no card, no plan and no language model; it
 * can therefore run over authored content, over finished readings and over a
 * competitor's output with the same ruler.
 */
const EN = [
    { label: 'journey language', re: /\b(embrace (the|your) journey|healing journey|on (your|this) journey)\b/i },
    { label: 'trust the process', re: /\btrust (the|your) process\b/i },
    { label: 'the universe', re: /\b(the universe|the cosmos|cosmic (energy|energies|plan|timing))\b/i },
    { label: 'happens for a reason', re: /\b(everything|things) happens? for a reason\b/i },
    { label: 'a reminder to', re: /\b(this is|serves as|acts as) a (gentle )?reminder (to|that)\b/i },
    { label: 'powerful or beautiful card', re: /\b(this|a) (powerful|beautiful|potent|magical|sacred) card\b/i },
    { label: 'step into your power', re: /\b(step into your (power|truth)|claim your power|own your power)\b/i },
    { label: 'highest self', re: /\b(highest self|higher self|authentic self|true self)\b/i },
    { label: 'navigate energies', re: /\b(navigate|harness|channel|work with) (these |the |your )?energies\b/i },
    { label: 'new beginnings horizon', re: /\bnew beginnings (are |lie )?(on the horizon|ahead|await)\b/i },
    { label: 'challenge as opportunity', re: /\b(every|each) (challenge|setback|obstacle) is an? (opportunity|gift|lesson)\b/i },
    { label: 'growth cliche', re: /\b(opportunity for (growth|healing)|personal growth|spiritual growth|growth mindset)\b/i },
    { label: 'fake perception', re: /\b(I (can )?(feel|sense|see|know|am being shown|am seeing)|spirit (is|wants)|the cards? (want|wants) you to know)\b/i },
    { label: 'called to', re: /\byou are being (called|asked by the universe|guided)\b/i },
    { label: 'alignment talk', re: /\b(align(ed|ment)? with (your|the)|aligned energy|divine (timing|plan|feminine|masculine))\b/i },
    { label: 'manifest', re: /\b(manifest(ing|ation)? (your|the)|law of attraction)\b/i },
    { label: 'empty reassurance', re: /\b(everything will (be|work out)|all will be well|trust yourself and|you (already )?have everything you need)\b/i },
];
const SK = [
    { label: 'journey language', re: /\b(prijmi svoju cestu|uzdravovacia cesta|na (tvojej|tejto) ceste)\b/i },
    { label: 'trust the process', re: /\bdôveruj (procesu|priebehu)\b/i },
    { label: 'the universe', re: /\b(vesmír (ti|ťa|chce|vedie|posiela)|kozmick\w+ (energi\w+|plán\w*))\b/i },
    { label: 'happens for a reason', re: /\bvšetko sa deje z (nejakého|určitého) dôvodu\b/i },
    { label: 'a reminder to', re: /\b(toto|to) je (jemná )?pripomienka\b/i },
    { label: 'powerful or beautiful card', re: /\b(táto|ta) (silná|krásna|mocná|magická|posvätná) karta\b/i },
    { label: 'step into your power', re: /\b(vstúp do svojej sily|prevezmi svoju silu)\b/i },
    { label: 'highest self', re: /\b(vyššie ja|vyššieho ja|pravé ja|autentické ja)\b/i },
    { label: 'navigate energies', re: /\b(zvládať|usmerniť|nasmerovať|pracovať s) (tieto |tvoje )?energie\b/i },
    { label: 'new beginnings horizon', re: /\bnové začiatky (sú )?(na obzore|čakajú)\b/i },
    { label: 'growth cliche', re: /\b(príležitosť na (rast|uzdravenie)|osobný rast|duchovný rast)\b/i },
    { label: 'fake perception', re: /\b(cítim|vnímam|vidím), že\b|\bduch (ti|chce)\b/i },
    { label: 'alignment talk', re: /\b(zladiť sa s|v súlade s (tvojím|vesmírom)|božie načasovanie)\b/i },
    { label: 'empty reassurance', re: /\b(všetko (sa )?(dobre )?dopadne|všetko bude (dobré|v poriadku)|máš všetko, čo potrebuješ)\b/i },
];
export function genericHits(text, locale) {
    const out = [];
    for (const pattern of locale === 'en' ? EN : SK) {
        const match = pattern.re.exec(text);
        if (match)
            out.push({ label: pattern.label, match: match[0] });
    }
    return out;
}
export const GENERIC_PATTERN_COUNT = EN.length + SK.length;
const WORD = /[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu;
export const wordsOf = (text) => (text.match(WORD) ?? []).map((word) => word.toLowerCase());
export const wordCount = (text) => wordsOf(text).length;
/** Sentences, cut at . ! ? followed by a space and a capital or quote. Good enough to count openings. */
export function sentencesOf(text) {
    return text.split(/(?<=[.!?])\s+(?=[\p{Lu}“„"])/u).map((part) => part.trim()).filter((part) => part.length > 0);
}
/**
 * The first two words of each sentence, with how many sentences begin that way.
 * Card names are not counted as repetition: a reading that names three cards will
 * begin three sentences with a card's name, and that is not template cadence.
 */
export function openingRepeats(text, ignore = []) {
    const counts = new Map();
    const hidden = ignore.map((name) => name.toLowerCase());
    for (const sentence of sentencesOf(text)) {
        const lower = sentence.toLowerCase();
        if (hidden.some((name) => lower.startsWith(name) || lower.startsWith(`the ${name}`) || lower.startsWith(`karta ${name}`)))
            continue;
        const opening = wordsOf(sentence).slice(0, 2).join(' ');
        if (opening.length === 0)
            continue;
        counts.set(opening, (counts.get(opening) ?? 0) + 1);
    }
    return [...counts.entries()].filter(([, count]) => count >= 2).map(([opening, count]) => ({ opening, count })).sort((a, b) => b.count - a.count);
}
/** Runs of `size` words that occur at least `min` times: the machine-made cadence a reader hears. */
export function repeatedRuns(text, size = 4, min = 2) {
    const words = wordsOf(text);
    const counts = new Map();
    for (let index = 0; index + size <= words.length; index += 1) {
        const run = words.slice(index, index + size).join(' ');
        counts.set(run, (counts.get(run) ?? 0) + 1);
    }
    return [...counts.entries()].filter(([, count]) => count >= min).map(([run, count]) => ({ run, count })).sort((a, b) => b.count - a.count);
}
/** Share of the words two texts have in common, 0..1, by the smaller vocabulary. Used to compare one card in two places. */
export function overlap(left, right) {
    const a = new Set(wordsOf(left));
    const b = new Set(wordsOf(right));
    if (a.size === 0 || b.size === 0)
        return 0;
    let shared = 0;
    for (const word of a)
        if (b.has(word))
            shared += 1;
    return shared / Math.min(a.size, b.size);
}
/** The content words only (length > 3), for a comparison that is not decided by "the", "and", "of". */
export const contentWords = (text) => new Set(wordsOf(text).filter((word) => word.length > 3));
export function contentOverlap(left, right) {
    const a = contentWords(left);
    const b = contentWords(right);
    if (a.size === 0 || b.size === 0)
        return 0;
    let shared = 0;
    for (const word of a)
        if (b.has(word))
            shared += 1;
    return shared / Math.min(a.size, b.size);
}
