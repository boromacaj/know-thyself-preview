import { anyCue, compileCues } from './questionLexicon.js?v=b5ef5ed';
import { foldText, padded } from './questionText.js?v=b5ef5ed';
/**
 * WHAT THE READING CAN SAFELY CALL THE THING THE QUESTION IS ABOUT.
 *
 * A reading that says "this situation" and "this dynamic" throughout answers a question it seems not to
 * have heard. One that says "your career" has heard it. The step between the two must never be "put the
 * person's words in the template": a question is typed by a person, can hold a name, an employer, a
 * diagnosis, and is data, never text a template may be built from.
 *
 * So the anchor is a CLOSED VOCABULARY. The question is matched against a fixed list of subjects, and what
 * survives is one of twelve identifiers - never a substring of what was typed. Everything the reading then
 * says about the subject comes from the catalog below, authored in both languages and declined by hand. A
 * question about "my boss Martin at Acme" yields `work-situation`, and nothing of Martin or Acme can reach
 * the output through this door.
 *
 *   ephemeral   computed from the question while a reading is composed, held by the plan, never stored
 *   closed      twelve subjects, each with its noun phrases written out in both languages
 *   inert       removing it changes sentences and nothing else: not a card, not a relation, not a conclusion form
 *   modest      no anchor where the question touches a subject the policy treats with care
 */
export const ANCHOR_SUBJECTS = [
    'career', 'job', 'work-situation', 'project', 'creative-work', 'relationship', 'relationships',
    'friendship', 'family', 'studies', 'home', 'decision',
];
/**
 * Each subject as a noun phrase, in each language and in the cases the voices use.
 *
 *   en.np       "your career" - after "for", "in", "about"
 *   sk.acc      after "ide o"      sk.gen  after "sa týka", "ohľadom"      sk.loc  after "o", "v"
 *
 * Written out rather than inflected by rule, because Slovak does not decline by rule and a wrong ending is
 * worse than a plainer sentence.
 */
export const ANCHOR_NOUNS = {
    career: { en: 'your career', sk: { acc: 'tvoju kariéru', gen: 'tvojej kariéry', loc: 'tvojej kariére' } },
    job: { en: 'your job', sk: { acc: 'tvoju prácu', gen: 'tvojej práce', loc: 'tvojej práci' } },
    'work-situation': { en: 'your work situation', sk: { acc: 'tvoju pracovnú situáciu', gen: 'tvojej pracovnej situácie', loc: 'tvojej pracovnej situácii' } },
    project: { en: 'this project', sk: { acc: 'tento projekt', gen: 'tohto projektu', loc: 'tomto projekte' } },
    'creative-work': { en: 'your creative work', sk: { acc: 'tvoju tvorivú prácu', gen: 'tvojej tvorivej práce', loc: 'tvojej tvorivej práci' } },
    relationship: { en: 'the relationship', sk: { acc: 'ten vzťah', gen: 'toho vzťahu', loc: 'tom vzťahu' } },
    relationships: { en: 'your relationships', sk: { acc: 'tvoje vzťahy', gen: 'tvojich vzťahov', loc: 'tvojich vzťahoch' } },
    friendship: { en: 'the friendship', sk: { acc: 'to priateľstvo', gen: 'toho priateľstva', loc: 'tom priateľstve' } },
    family: { en: 'your family situation', sk: { acc: 'tvoju rodinnú situáciu', gen: 'tvojej rodinnej situácie', loc: 'tvojej rodinnej situácii' } },
    studies: { en: 'your studies', sk: { acc: 'tvoje štúdium', gen: 'tvojho štúdia', loc: 'tvojom štúdiu' } },
    home: { en: 'your living situation', sk: { acc: 'tvoju situáciu s bývaním', gen: 'tvojej situácie s bývaním', loc: 'tvojej situácii s bývaním' } },
    decision: { en: 'this decision', sk: { acc: 'toto rozhodnutie', gen: 'tohto rozhodnutia', loc: 'tomto rozhodnutí' } },
};
const subject = (id, cues) => ({ subject: id, cues: compileCues(cues) });
/**
 * Most specific first: the first subject whose cue is in the question wins. "A creative project" is creative
 * work, not a project; "my boss" is a work situation unless the question says career or job.
 */
const SUBJECT_CUES = [
    subject('creative-work', [
        'creative', 'creativity', 'novel', 'screenplay', 'album', 'painting', 'my art', 'artwork', 'my music', 'my writing', 'poem*', 'my book',
        'tvoriv*', 'tvorba', 'tvorbu', 'tvorbe', 'umeleck*', 'román*', 'moja hudba', 'moju hudbu', 'moje písanie', 'moju knihu', 'moja kniha', 'básn*',
    ]),
    subject('project', ['project*', 'projekt*', 'startup', 'launch*']),
    subject('career', ['career', 'careers', 'kariér*', 'profession*', 'promotion', 'povýšen*', 'path in life', 'life path', 'professional life']),
    subject('job', ['job', 'jobs', 'employment', 'employer', 'zamestnan*', 'zamestnávateľ*', 'práca', 'práci', 'prácu', 'práce', 'prácou', 'robota', 'roboty']),
    subject('work-situation', ['work', 'working', 'workplace', 'office', 'boss', 'manager', 'colleague*', 'coworker*', 'team', 'client*', 'business', 'company',
        'šéf', 'šéfa', 'šéfovi', 'šéfom', 'šéfka', 'kolega', 'kolegu', 'kolegovia', 'kolegyn*', 'tím', 'tým', 'klient*', 'firm*', 'podnik*', 'kancelári*']),
    subject('relationships', ['relationships', 'relations with people', 'vzťahy', 'vzťahoch', 'vzťahov', 'vzťahmi']),
    subject('relationship', ['relationship', 'partner*', 'boyfriend', 'girlfriend', 'husband', 'wife', 'spouse', 'dating', 'marriage', 'ex', 'vzťah', 'vzťahu', 'vzťahom',
        'frajer*', 'manžel*', 'manželk*', 'partnerk*', 'bývalý', 'bývalá', 'bývalého', 'bývalej']),
    subject('friendship', ['friend', 'friends', 'friendship', 'kamarát*', 'kamarátk*', 'kamoš*', 'priateľstv*']),
    subject('family', ['family', 'mother', 'father', 'parent*', 'mom', 'dad', 'sister', 'brother', 'son', 'daughter', 'child', 'children',
        'rodin*', 'matka', 'matky', 'matku', 'otec', 'otca', 'rodič*', 'sestra', 'sestru', 'brat', 'brata', 'syn', 'syna', 'dcéra', 'dcéru', 'dieťa', 'deti']),
    subject('studies', ['study', 'studies', 'studying', 'school', 'university', 'college', 'exam*', 'degree', 'štúdi*', 'študova*', 'škol*', 'univerzit*', 'skúšk*']),
    subject('home', ['move', 'moving', 'relocat*', 'my home', 'apartment', 'flat', 'house', 'presťahova*', 'sťahova*', 'bývanie', 'bývania', 'byt', 'bytu', 'dom', 'domu']),
    subject('decision', ['decision', 'decide', 'deciding', 'choice', 'choose', 'rozhodnutie', 'rozhodnutia', 'rozhodnúť', 'rozhodnem', 'voľba', 'voľbu', 'vybrať']),
];
/** Which category alone is enough to name a subject, when no cue did. */
const BY_CATEGORY = {
    career: 'career', creativity: 'creative-work', relationship: 'relationship', 'binary-decision': 'decision',
};
const BY_RELATIONSHIP = {
    romantic: 'relationship', family: 'family', friend: 'friendship', work: 'work-situation',
};
/**
 * The one subject a question is about, or null. Reads the sanitised question and the intent; returns an
 * identifier, never text. Null when the question touches a subject the safety policy treats with care.
 */
export function anchorOf(intent) {
    if (intent.sensitivityFlags.length > 0)
        return null;
    const pad = padded(foldText(intent.normalizedQuestion));
    for (const entry of SUBJECT_CUES)
        if (anyCue(pad, entry.cues))
            return { subject: entry.subject };
    if (intent.relationshipType !== null && intent.relationshipType !== 'other')
        return { subject: BY_RELATIONSHIP[intent.relationshipType] };
    const named = BY_CATEGORY[intent.category] ?? intent.secondaryCategories.map((category) => BY_CATEGORY[category]).find((found) => found !== undefined);
    return named ? { subject: named } : null;
}
/* ---------------------------------------------------------------- phrasing -- */
/** "As far as your career goes," / "Pokiaľ ide o tvoju kariéru,": the lead-in a conclusion can wear. Four wordings and a bare one. */
export function anchorLead(anchor, locale, variant) {
    if (anchor === null || variant % 4 === 3)
        return '';
    const noun = ANCHOR_NOUNS[anchor.subject];
    if (locale === 'en') {
        return ['As far as ', 'For ', 'If this is about '].map((start, index) => (index === 0 ? `${start}${noun.en} ${anchor.subject === 'studies' || anchor.subject === 'relationships' ? 'go' : 'goes'}, ` : index === 1 ? `${start}${noun.en}, ` : `${start}${anchor.subject === 'project' || anchor.subject === 'decision' ? noun.en.replace(/^this /, 'the ') : noun.en}, `))[variant % 4] ?? '';
    }
    return [`Pokiaľ ide o ${noun.sk.acc}, `, `Čo sa týka ${noun.sk.gen}, `, `Ak je otázka o ${noun.sk.loc}, `][variant % 4] ?? '';
}
/** The note that says what the reading is read for, and what it is not. */
export function anchorNote(anchor, locale) {
    const noun = ANCHOR_NOUNS[anchor.subject];
    return locale === 'en'
        ? `The cards are read with ${noun.en} in mind, as a way of looking and not as knowledge of how things stand.`
        : `Karty sa čítajú ohľadom ${noun.sk.gen}: ako spôsob pohľadu, nie ako vedomosť o tom, ako veci stoja.`;
}
