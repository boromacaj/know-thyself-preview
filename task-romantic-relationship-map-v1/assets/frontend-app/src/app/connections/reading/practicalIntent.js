/**
 * WHAT A PIECE OF GUIDANCE ASKS THE PERSON TO DO: A SMALL TYPED TAXONOMY, SO THE SAME INSTRUCTION IS NEVER GIVEN TWICE.
 *
 * A reading has a main insight (what the dynamic means), ONE step (the thing worth trying) and up to two supporting cards, each with its research. V3.1 checked that a card did not repeat
 * the step in the same words (a six-word run, a shared word stem). Two instructions can say the same thing in other words, and the checks could not see it: in the shared-attention
 * reading the step ("celebrate first, then ask the questions"), a card ("ask: cheer first, or tell me how it works?") and a second card ("say what you would like back") all asked for
 * the same thing, which kind of attention is wanted and in what order. The words differed; the action was one.
 *
 * So every card is tagged with what it asks the person to do, in this closed set (`reading/content/practiceIntents.ts`), the first intent being the one it is mainly about; and a step is
 * classified by the same set (`stepIntentsOf`, a deterministic lexicon on its English source text, written to be precise rather than complete: a step it does not recognise has no intent,
 * so it never causes a card to be dropped). A reading offers a card only if its main intent is not the step's and not another card's: one excellent card is better than two versions of
 * the same instruction, and a second card must add a genuinely different action, preparation, alternative or follow-up. No score, no model, no generic ranking: a closed set and a rule.
 */
export const PRACTICAL_INTENTS = [
    'name-the-wish', // ask for, or state, what response, help, contact or attention is wanted
    'order-the-response', // answer in a set order: welcome first and the practical question second; celebrate, then ask
    'say-back', // say back what was heard before answering or fixing
    'pause-and-return', // take a break or thinking time, say when the talk resumes, leave a door open
    'repair', // come back after a rupture and name your own part
    'agree-ahead', // agree a rule, plan, signal, fallback or fixed point in advance
    'give-notice', // say early: a change, a slip, an absence, news, a view
    'set-a-rhythm', // a regular time: a ritual, a check-in, a standing moment, a fixed point of contact
    'ask-to-understand', // a genuine question about the other's experience, meaning, reason or priority
    'show-appreciation', // thank, name what you noticed, give credit
    'explain-the-reason', // give the reason, show the working, say why
    'offer-a-choice', // a real choice, turns, a say, handing something over
    'divide-the-work', // split roles, tasks, decisions or ownership by fit
    'hold-a-limit', // a boundary, a limit, a safety line, a protected floor, limited contact
    'notice-and-record', // observe, keep a note, track a pattern
    'try-together', // do something together: an activity, a new thing, a shared project
    'name-the-feeling', // name a feeling (own or the other's), the softer feeling first
    'test-the-idea', // a trial, a weak point, a devil's advocate, check an assumption
    'seek-support', // professional help or other support
    'give-room', // space, quiet, stay near without asking, let someone manage
    'steady-yourself', // the adult's own volume, breath, pace
];
/**
 * Agreeing something in advance is the frame of a great many steps ("agree that a small trial may run outside the plan") and of a great many cards ("agree how much of the plan a move touches")
 * without those being the same instruction: what is agreed is the action. So it never blocks a card by itself; the specific action beside it does.
 */
export const GENERIC_INTENTS = new Set(['agree-ahead']);
/**
 * A card whose only action is to agree something in advance, beside a step whose only action is the same, is the step again: "agree which few rules hold whoever is in charge" after "settle the
 * main lines between the two of you". (A card with a specific action of its own is never judged by this.)
 */
export function repeatsGenericStep(cardIntents, stepIntents) {
    if (cardIntents.length === 0 || stepIntents.length === 0)
        return false;
    return cardIntents.every((intent) => GENERIC_INTENTS.has(intent)) && stepIntents.every((intent) => GENERIC_INTENTS.has(intent));
}
/** Lexicon for the step, English source text. Each entry is a pattern that must be specific to its action; the first match in a text is its main intent. */
const STEP_LEXICON = [
    /* the order in which to respond: welcome or celebrate first and the question afterwards */
    ['order-the-response', /\b(celebrate|welcome|cheer|thank|praise|warmth|applause)\b[^.;]{0,40}\b(first)\b[^.;]{0,60}\b(then|and|afterwards?|second)\b|\bfirst\b[^.;]{0,30}\b(celebrate|welcome|cheer|applause)\b|\bthe yes before\b|\byes before\b|\bask (the )?questions? (afterwards?|second|later)\b|\bcelebrate[^.;]{0,30}\bask\b/i],
    /* which kind of response or help is wanted */
    ['name-the-wish', /\b(ask|say|state|tell|name)\b[^.;]{0,40}\b(what|which|whether)\b[^.;]{0,40}\b(you|they|the other|each|one)\b[^.;]{0,25}\b(want|wants|wanted|wish|hope|hoping|need|needs|would like|prefer|prefers)\b|\b(ask|say|state)\b[^.;]{0,40}\b(which|what) (kind of )?(attention|response|help|contact|reply)\b|\bas a (plain )?wish\b|\bsay what you (want|need|hope|would like)\b/i],
    ['say-back', /\b(say|says|said) back\b|\breflect(s|ing)? (it )?back\b|\brepeat(s|ing)? back\b/i],
    ['repair', /\brepair\b|\bapologi[sz]e\b|\bname (your|their|its) own part\b/i],
    ['pause-and-return', /\b(take|agree|keep|build in) a (short )?(break|pause)\b|\bpause\b[^.;]{0,40}\b(return|come back|resume)\b|\bcome back to (it|the (talk|topic|subject))\b|\bstep(ping)? away\b/i],
    ['notice-and-record', /\bjust notice\b|\bwrite (it|them) down\b|\bkeep a (short )?(note|list|log)\b|\bnotice when\b|\bnote when\b|\bwatch for\b/i],
    ['show-appreciation', /\bthank\b|\bappreciat(e|ion)\b|\bsay that you noticed\b|\bname one thing (the other|they) did\b|\bgive credit\b/i],
    ['give-notice', /\b(say|tell|announce|send|give) [^.;]{0,30}\b(early|ahead|in advance|as soon as|the same day|beforehand|a day ahead|before it happens)\b|\bgive (the other |them |each )?(early |advance |short )?(notice|warning)\b|\bannounce\b/i],
    ['agree-ahead', /\bagree\b|\bsettle\b[^.;]{0,40}\b(in advance|ahead|beforehand|now|main lines|first)\b|\bdecide\b[^.;]{0,30}\b(in advance|ahead|beforehand|calmly)\b/i],
    ['set-a-rhythm', /\b(each|every) (day|week|month)\b|\bonce a (day|week|month|year)\b|\bweekly\b|\bregular (moment|check-in|time|turn|slot)\b|\bstanding (moment|arrangement|invitation)\b|\bset time\b/i],
    ['offer-a-choice', /\b(let|give|offer) (each|them|the child|the other)\b[^.;]{0,40}\b(choose|choice|decide|turn|say)\b|\btake turns\b|\breal choice\b|\bchoose first\b/i],
    ['explain-the-reason', /\b(say|give|state|add) (one )?(plain |warm |short |honest )?(sentence of )?(reason|why)\b|\bthe reason behind\b|\bsay why\b|\bexplain (why|the reason)\b/i],
    ['ask-to-understand', /\bask (one |a |each other |the other )?(real |genuine |plain |single )?question(s)? (about|on)\b|\bask what (it|the|that|each)\b[^.;]{0,30}\b(means?|meant|is for|felt|noticed|weighed)\b/i],
    ['give-room', /\bstay near\b|\bkeep (your|the) hands still\b|\bleave (the|a) (decision|quiet|room)\b|\bgive (the )?(quiet|room|space)\b/i],
];
/** What a step asks the person to do, in the order it is recognised (the first is its main intent); empty when it is not recognised, which never costs a card. */
export function stepIntentsOf(stepEnglish) {
    const found = [];
    for (const [intent, pattern] of STEP_LEXICON) {
        const match = pattern.exec(stepEnglish);
        if (match)
            found.push({ intent, at: match.index });
    }
    return found.sort((x, y) => x.at - y.at).map((entry) => entry.intent);
}
/**
 * Whether a card adds an action the step and the cards already chosen do not ask. Strictly: none of its intents is among theirs (a card that is mainly about something else but also says "give
 * the preferred kind first, then the other" repeats a step that says so). Leniently, used only when the strict rule would leave the reading with no card at all: its MAIN intent is not
 * among theirs. A card with no declared intent is always allowed.
 */
export function addsAnAction(cardIntents, asked, strict = true) {
    const specific = cardIntents.filter((intent) => !GENERIC_INTENTS.has(intent));
    if (specific.length === 0)
        return true;
    return strict ? specific.every((intent) => !asked.has(intent)) : !asked.has(specific[0]);
}
