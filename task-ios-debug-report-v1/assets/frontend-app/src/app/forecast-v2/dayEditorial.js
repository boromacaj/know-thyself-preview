import { claimStrengthFindings } from './dayClaimStrength.js?v=b5ef5ed';
import { BECAUSE, LIMIT_POLE, MIRROR_CONNECTIVE, opposedLean, sameLean } from './dayStoryVoice.js?v=b5ef5ed';
import { OPPOSITE_POLE } from './dayTypes.js?v=b5ef5ed';
/* ---------------------------------------------------------------- the words -- */
/** Words that carry no content of their own: a sentence made mostly of these says nothing. */
const FUNCTION_WORDS = new Set(('a an and are as at be been but by can could do does for from had has have how if in into is it its may might more most no not of on or '
    + 'other others our out over own so some such than that the their them then there these they this those though to too up us was were what when '
    + 'where which while who why will with within would you your yours yourself day days today things thing way ways bit little much many').split(' '));
/** The few phrasings of the authored vocabulary that say the same practical thing, folded to one concept before two sentences are compared. */
const CONCEPTS = [
    [/(one (?:piece of work|task|thing|conversation|kind of effort)|a single)/g, ' oneconcept '],
    [/(spread(?:ing)? yourself across several|several at once|splitting your attention|juggling several|half-finish(?:ing)? several|chas(?:ing|e) several|start(?:ing)? several)/g, ' manyconcept '],
    [/(settl(?:ing|e)[^.]{0,28}too early|lock(?:ing)? it in too early|clos(?:ing|e) too early)/g, ' earlyconcept '],
    [/(keep(?:ing)? (?:the|your) ideas open|look(?:ing)? around|leav(?:ing|e) the plan loose|leav(?:ing|e) the final form open|try(?:ing)? a few things|an open, curious mind|keep(?:ing)? your options open)/g, ' openconcept '],
    [/(open(?:ing)? several new (?:fronts|ones)|start(?:ing)? several new ones)/g, ' newfrontsconcept '],
    [/(clos(?:ing|e) what is open|finish(?:ing)? what is already (?:open|on the desk)|finish(?:ing)? the conversations already open)/g, ' closeopenconcept '],
    [/(press(?:ing)? (?:your own case|a point|it)|hear(?:ing)? (?:the other side|people) out|hear(?:ing)? the other side)/g, ' hearconcept '],
];
const foldConcepts = (text) => CONCEPTS.reduce((out, [pattern, to]) => out.replace(pattern, to), text.toLowerCase().replace(/[’']/g, ''));
const tokens = (text) => foldConcepts(text).replace(/[^a-z\s-]/g, ' ').split(/\s+/).filter(Boolean);
const contentWords = (text) => tokens(text).filter((word) => word.length > 2 && !FUNCTION_WORDS.has(word));
/** A crude stem, enough to see that "suits" and "suit" are one word. */
const stem = (word) => word.replace(/(ing|ed|es|s|ly)$/, '');
const jaccard = (a, b) => {
    const left = new Set(a.map(stem));
    const right = new Set(b.map(stem));
    if (left.size === 0 || right.size === 0)
        return 0;
    let shared = 0;
    for (const word of left)
        if (right.has(word))
            shared += 1;
    return shared / (left.size + right.size - shared);
};
const sentencesOf = (text) => text.split(/(?<=[.!?])\s+/).map((sentence) => sentence.trim()).filter(Boolean);
/** Every sentence of the reading, with the section it sits in, in the order the screen draws it. */
export function unitsOf(card) {
    const units = [{ section: 'title', text: card.title }];
    if (card.line)
        for (const sentence of sentencesOf(card.line))
            units.push({ section: 'opening', text: sentence });
    for (const part of card.reading) {
        const section = part.kind.replace('reading:', '');
        for (const sentence of sentencesOf(part.text))
            units.push({ section, text: sentence });
    }
    for (const line of card.easier)
        units.push({ section: 'easier', text: line.text });
    for (const line of card.care)
        units.push({ section: 'care', text: line.text });
    if (card.emotionalClimate)
        for (const sentence of sentencesOf(card.emotionalClimate.text))
            units.push({ section: 'climate', text: sentence });
    if (card.goodUseNote)
        units.push({ section: 'goodUse', text: card.goodUseNote.text });
    if (card.move)
        for (const sentence of sentencesOf(card.move.text))
            units.push({ section: 'move', text: sentence });
    return units;
}
/* ------------------------------------------------------------------ the rules -- */
/** An event, a person in a role, or a circumstance nobody supplied: the reading may not introduce one as fact. */
const INVENTED = /\b(meeting|meetings|argument|arguments|quarrel|interview|appointment|wedding|exam|deadline|invoice|salary|boss|husband|wife|boyfriend|girlfriend|landlord|colleague|colleagues|client|customer|neighbou?r|mother|father|parents?|children|kids?|ex-partner|lawyer|manager|teacher|date night|first date|breakup|break-up|divorce|promotion|bonus|purchase|bought|sale)\b/i;
/** A planet doing something physical to a part of the person: the old literal reading of an aspect. */
const LITERAL_ASPECT = /\b(rubs against|cuts across|meets what|crosses your|presses on your|eases your|warms your|warms what|supports what you like)\b/i;
/** A statement about the person or the day in the indicative with no calibration: "your mind is open", "conversation comes easily". */
const CATEGORICAL = /\b(your mind is|come easily|comes easily|come readily|comes readily|come naturally|comes naturally|come easier than|run clearly|sit close together|is easier to|are easier to|gets a clear run|get a clear run|is more noticeable|are more noticeable|feel familiar and manageable|keeps? feeling close|keeps? talk and ideas moving|steadies things)\b/i;
const CALIBRATED = /\b(may|might|can|could|tends? to|often|likely|suggests?|worth|room for|better suited|helps?)\b/i;
/** The grammatical form of a headline part: a gerund ("exploring ideas") against a noun ("connection"). */
const GERUND = /^[a-z]+ing\b/;
/** A body the sky paragraph names: a sentence that claims a contact must name its source. */
const BODY_NAME = /\b(?:Moon|Sun|Mercury|Venus|Mars)\b/;
/** A sentence that states a contact: the body, the verb of contact, the point. */
const CONTACT_STATEMENT = /^(?:(?:adding to this|at the same time|on top of that|meanwhile|separately), )?(?:the )?(?:moon|sun|mercury|venus|mars) .*(?:contact with|link with|lines up with|moving away from|returns to its own|coming back to its own|lining up with)/i;
/** The engine's evidence state said aloud as if it were interpretation. These are phrases the owner named; the structural rule is story.false-separation. */
const META_LANGUAGE = /(?:rests? on the number|nothing strong to add|contacts today are about|only its general setting|little else in the sky|the sky has nothing)/i;
/** A relation named and not explained. */
const GENERIC_BRIDGE = /(?:the (?:stars|sky) and (?:the )?numbers (?:agree|align|point)|both (?:systems|pillars) (?:point|agree|lean)|numbers and the sky (?:lean|agree|point)|number also favours)/i;
/** Which poles an avoid-line argues against, so an approach is not set against its own advice. */
const AVOID_AGAINST = {
    rushing: ['urgent'], 'closing-options-early': ['commit'], 'splitting-attention': ['wide'], 'forced-sociability': ['outward'],
    'pushing-feelings-aside': ['contained'], 'pressing-for-openness': ['open'], 'opening-new-fronts': ['begin'],
    'forcing-a-conclusion': ['commit'], 'pressing-a-point': ['speak'], 'pressing-your-case': ['speak'],
};
/** Families of day that an action may not run against. */
const CONFLICTING = [['quiet', 'move'], ['closing', 'start']];
const FAMILY_OF_MOVE = {
    'activity:rest': 'quiet', 'activity:physical-activity': 'move', 'activity:starting-work': 'start',
    'activity:finishing-work': 'closing', 'activity:cleanup-organisation': 'closing',
};
export function reviewReading(card) {
    const findings = [];
    const add = (rule, severity, section, detail) => { findings.push({ rule, severity, section, detail }); };
    const units = unitsOf(card);
    /* A. REPETITION ---------------------------------------------------------------------------------- */
    const seen = new Map();
    for (const unit of units) {
        const key = unit.text.toLowerCase();
        if (seen.has(key))
            add('repetition.exact', 'error', unit.section, `the sentence "${unit.text}" is said twice (also in ${seen.get(key)})`);
        else
            seen.set(key, unit.section);
    }
    /* A claim is repeated when two sentences in DIFFERENT sections say nearly the same thing in their own words. */
    const prose = units.filter((unit) => unit.section !== 'numbers' && unit.section !== 'title');
    for (let i = 0; i < prose.length; i += 1) {
        for (let j = i + 1; j < prose.length; j += 1) {
            if (prose[i].section === prose[j].section)
                continue;
            const score = jaccard(contentWords(prose[i].text), contentWords(prose[j].text));
            if (score >= 0.8)
                add('repetition.paraphrase', 'error', `${prose[i].section}+${prose[j].section}`, `"${prose[i].text}" ~ "${prose[j].text}" (${score.toFixed(2)})`);
            else if (score >= 0.6)
                add('repetition.paraphrase', 'warning', `${prose[i].section}+${prose[j].section}`, `"${prose[i].text}" ~ "${prose[j].text}" (${score.toFixed(2)})`);
        }
    }
    const openers = new Map();
    for (const unit of prose) {
        const opener = tokens(unit.text).slice(0, 3).join(' ');
        openers.set(opener, (openers.get(opener) ?? 0) + 1);
    }
    for (const [opener, count] of openers)
        if (count >= 3 && opener !== 'the moon is')
            add('repetition.opener', 'warning', 'reading', `${count} sentences open with "${opener}"`);
    /* B. REDUNDANCY WITH THE HEADLINE ------------------------------------------------------------------ */
    for (const line of card.easier) {
        if (card.story.theme.topics.length === 0 && card.story.theme.stances.some((pole) => line.kind === `pole:${pole}`)) {
            add('redundancy.headline', 'error', 'easier', `"${line.text}" repeats what the headline already says`);
        }
    }
    /* C. CONTRADICTION ----------------------------------------------------------------------------------- */
    for (const line of card.care) {
        const avoid = line.kind.startsWith('avoid:') ? line.kind.slice('avoid:'.length) : null;
        if (!avoid)
            continue;
        const against = AVOID_AGAINST[avoid] ?? [];
        for (const easier of card.easier) {
            if (against.some((pole) => easier.kind === `pole:${pole}`))
                add('contradiction.advice', 'warning', 'easier+care', `"${easier.text}" sits beside "${line.text}"`);
        }
    }
    const moveFamily = card.move ? FAMILY_OF_MOVE[card.move.kind] : undefined;
    if (moveFamily) {
        /* A move belongs to the day when the day names its family: a day for movement AND rest may end in either. */
        for (const family of card.story.theme.families.includes(moveFamily) ? [] : card.story.theme.families) {
            if (CONFLICTING.some(([a, b]) => (a === family && b === moveFamily) || (b === family && a === moveFamily))) {
                add('contradiction.move', 'error', 'move', `the move ("${card.move.text}") runs against a day for ${family}`);
            }
        }
    }
    /* D. UNGROUNDED SPECIFICITY ------------------------------------------------------------------------- */
    for (const unit of units) {
        const hit = INVENTED.exec(unit.text);
        if (hit)
            add('specificity.invented', 'error', unit.section, `"${hit[0]}" in "${unit.text}" is a circumstance the evidence does not supply`);
    }
    /* E. VAGUENESS ----------------------------------------------------------------------------------------- */
    for (const unit of units) {
        if (unit.section === 'numbers')
            continue;
        const words = tokens(unit.text);
        const content = contentWords(unit.text);
        if (unit.section !== 'title' && words.length >= 5 && content.length < 2)
            add('vagueness.content', 'warning', unit.section, `"${unit.text}" has almost nothing but function words`);
    }
    for (const sentence of card.sentences) {
        if (sentence.claims.length === 0)
            add('vagueness.unclaimed', 'error', sentence.section, `"${sentence.text}" makes no claim the ledger can trace`);
    }
    /* F. AWKWARD ENGLISH, BY STRUCTURE ------------------------------------------------------------------ */
    for (const unit of units) {
        if (unit.section === 'numbers')
            continue;
        if (LITERAL_ASPECT.test(unit.text))
            add('english.literal-aspect', 'error', unit.section, `"${unit.text}" says an aspect as a physical act`);
        if ((unit.text.match(/, so /g) ?? []).length >= 2)
            add('english.stacked-so', 'warning', unit.section, `"${unit.text}" stacks two "so" clauses`);
        const parts = /^(.*?),? so (.*)$/.exec(unit.text);
        if (parts && unit.section === 'opening' && jaccard(contentWords(parts[1]), contentWords(parts[2])) >= 0.5) {
            add('english.tautology', 'warning', unit.section, `"${unit.text}" gives as its reason what it then concludes`);
        }
    }
    const body = units.filter((unit) => unit.section !== 'numbers').map((unit) => unit.text).join(' ');
    const words = tokens(body).length;
    const hedges = (body.match(/\b(may|might|could)\b/gi) ?? []).length;
    if (words > 0 && hedges / words > 0.04)
        add('english.hedging', 'warning', 'reading', `${hedges} hedges in ${words} words`);
    if ((body.match(/\ba little\b/gi) ?? []).length >= 2)
        add('english.a-little', 'warning', 'reading', '"a little" is said more than once');
    /* G. EVIDENCE COVERAGE ----------------------------------------------------------------------------- */
    const claimed = new Set(card.sentences.flatMap((sentence) => sentence.claims));
    for (const contact of card.story.sky.contacts) {
        if (contact.level === 'lead' && !claimed.has(`contact:${contact.body}>${contact.natal}:${contact.quality}`)) {
            add('coverage.contact', 'error', 'sky', `the exact ${contact.body} contact to ${contact.natal} is not in the sky paragraph`);
        }
    }
    const heldKinds = new Set(card.held.map((hold) => hold.kind));
    const careKinds = new Set(card.care.map((line) => line.kind));
    for (const item of card.model.care) {
        const kind = item.type === 'tension' ? `pull:${item.tension}` : item.type === 'watch' ? `watch:${item.pitfall}`
            : item.type === 'avoid' ? `avoid:${item.avoid}` : `rely:${item.reliance}`;
        const shown = [...careKinds].some((candidate) => candidate === kind || candidate.startsWith(`${kind}+`));
        if (!shown && !heldKinds.has(kind) && !card.dropped.some((drop) => drop.kind === kind || drop.kind.startsWith(kind))) {
            add('coverage.care', 'error', 'care', `the plan's caution "${kind}" neither appears nor is recorded as held back`);
        }
    }
    /* H. NARRATIVE COHERENCE ------------------------------------------------------------------------- */
    const theme = card.story.theme;
    if (theme.kind === 'tension' && card.line && !card.sentences.some((sentence) => sentence.claims.some((claim) => claim.startsWith('pull:')))) {
        add('coherence.tension', 'error', 'opening', 'a tension headline has no line saying what pulls');
    }
    /* I. THE HEADLINE AND THE OPENING (P1.6.1) ------------------------------------------------------- */
    /* Two themes in one headline are the same grammatical form ("spending time with people and exploring ideas"), not a noun glued to a gerund. */
    const titleBody = /^An? (?:(?:gentler|steady|active) )?day,? (?:for|suited to) (.+)$/.exec(card.title)?.[1] ?? null;
    if (titleBody && !titleBody.includes(', with room for')) {
        const parts = titleBody.split(' and ');
        if (parts.length === 2 && GERUND.test(parts[0]) !== GERUND.test(parts[1])) {
            add('headline.mixed-form', 'error', 'title', `"${card.title}" joins a gerund to a noun`);
        }
    }
    /* An opening says something the headline does not: a sentence whose content is the headline's own is a repeat. */
    const titleWords = contentWords(card.title);
    for (const unit of units.filter((entry) => entry.section === 'opening')) {
        if (jaccard(contentWords(unit.text), titleWords) >= 0.7)
            add('opening.restates-title', 'error', 'opening', `"${unit.text}" says what the headline "${card.title}" has already said`);
    }
    /* A bridge between the number and the sky is a claim about two sources: it needs them, from two pillars, and an easy contact for "the sky helps". */
    const bridges = card.sentences.flatMap((sentence) => sentence.claims.filter((claim) => claim.startsWith('bridge:')).map((claim) => ({ sentence, claim })));
    for (const { sentence, claim } of bridges) {
        const kind = claim.split(':')[1];
        const pillars = card.story.pillars;
        const pillarSet = new Set(sentence.basis.triggers.map((ref) => ref.pillar));
        const contact = pillars?.contactId ? card.story.sky.contacts.find((candidate) => candidate.factId === pillars.contactId) : undefined;
        if (!pillars || pillars.relation !== kind)
            add('bridge.unsupported', 'error', 'opening', `"${sentence.text}" claims "${kind}" but the story has no such relation`);
        else if (kind === 'numbers-only' ? card.story.sky.contacts.length > 0 : pillarSet.size < 2 || !contact)
            add('bridge.unsupported', 'error', 'opening', `"${sentence.text}" relates two pillars without a source in each`);
        else if (kind === 'tempered' ? contact.quality !== 'hard' : kind !== 'numbers-only' && kind !== 'number-led' && kind !== 'differ' && contact.quality === 'hard')
            add('bridge.unsupported', 'error', 'opening', `"${sentence.text}" describes the contact it stands on as the opposite of what it is`);
    }
    /* The sky's friction, said alone on a day whose number does not lean with the headline: it stands on a tense contact the paragraph narrates. */
    for (const sentence of card.sentences.filter((entry) => entry.claims.some((claim) => claim.startsWith('friction:')))) {
        const pillars = card.story.pillars;
        const contact = pillars?.contactId ? card.story.sky.contacts.find((candidate) => candidate.factId === pillars.contactId) : undefined;
        if (pillars?.relation !== 'friction' || !contact || contact.quality !== 'hard')
            add('bridge.unsupported', 'error', 'opening', `"${sentence.text}" names a friction no narrated contact has`);
    }
    for (const unit of units) {
        if (GENERIC_BRIDGE.test(unit.text))
            add('bridge.generic', 'error', unit.section, `"${unit.text}" names a relation between the pillars without saying what it means`);
    }
    /* J. THE SKY, IN HUMAN TERMS ----------------------------------------------------------------------- */
    for (const unit of units.filter((entry) => entry.section === 'sky' && CONTACT_STATEMENT.test(entry.text))) {
        if (!/, which (?:tends to|can) /.test(unit.text))
            add('astrology.mechanics-only', 'error', 'sky', `"${unit.text}" names a contact and stops: it says no consequence`);
    }
    for (const sentence of card.sentences.filter((entry) => entry.claims.some((claim) => claim.startsWith('contact:')))) {
        /* P1.6.3: one sentence may name two contacts (a mirrored pair said once): a claim is allowed if either contact presses on it. */
        const named = card.story.sky.contacts.filter((candidate) => sentence.claims.includes(`contact:${candidate.body}>${candidate.natal}:${candidate.quality}`));
        if (named.length === 0)
            continue;
        const allowed = new Set(named.flatMap((contact) => [...contact.poles, ...contact.feelings]));
        for (const claim of sentence.claims.filter((entry) => entry.startsWith('say:'))) {
            if (!allowed.has(claim.slice(4)))
                add('source.distorted', 'error', 'sky', `"${sentence.text}" claims "${claim.slice(4)}", which the contact does not press on`);
        }
    }
    /* J2. THE STORY AS A WHOLE (P1.6.2) ---------------------------------------------------------------- */
    for (const sentence of card.sentences.filter((entry) => entry.section === 'sky' && entry.claims.some((claim) => claim.startsWith('contact:')))) {
        if (!BODY_NAME.test(sentence.text))
            add('astrology.anonymous', 'error', 'sky', `"${sentence.text}" says what a contact does and not where it comes from`);
    }
    for (const claim of card.sentences.flatMap((sentence) => sentence.claims.filter((entry) => /^bridge:(?:number-led|numbers-only):/.test(entry)))) {
        const pole = claim.split(':')[2];
        const meets = card.story.sky.contacts.find((contact) => (contact.touches ?? []).includes(pole) || (contact.touches ?? []).includes(OPPOSITE_POLE[pole]));
        if (meets)
            add('story.false-separation', 'error', 'opening', `the opening treats the number's lean ("${pole}") as standing alone while the ${meets.body} contact to ${meets.natal} presses on it`);
    }
    for (const unit of units.filter((entry) => entry.section === 'opening' || entry.section === 'move' || entry.section === 'care' || entry.section === 'easier')) {
        if (META_LANGUAGE.test(unit.text))
            add('opening.meta-language', 'error', unit.section, `"${unit.text}" talks about the evidence instead of interpreting it`);
    }
    const openingLeans = card.sentences.filter((entry) => entry.section === 'opening').map((entry) => {
        const leans = [];
        for (const claim of entry.claims) {
            const bridge = /^bridge:(?:agree|overlap|number-led|numbers-only|differ|tempered):(.+)$/.exec(claim);
            if (bridge)
                leans.push(bridge[1]);
            const limit = /^limit:(.+)$/.exec(claim);
            if (limit && LIMIT_POLE[limit[1]])
                leans.push(LIMIT_POLE[limit[1]]);
            /* P1.6.3: the sentence that says why the headline is the headline names the pole the day leans on. */
            const why = /^lead:(.+)$/.exec(claim);
            if (why)
                leans.push(why[1]);
        }
        return leans;
    });
    for (let i = 0; i < openingLeans.length; i += 1) {
        for (let j = i + 1; j < openingLeans.length; j += 1) {
            if (openingLeans[i].some((a) => openingLeans[j].some((b) => sameLean(a, b))))
                add('repetition.same-lean', 'error', 'opening', 'two sentences of the opening advise the same lean');
        }
    }
    /* Two sentences of one opening that lean OPPOSITE ways need a word between them: said bare, the second contradicts the first. */
    const openingSentences = card.sentences.filter((entry) => entry.section === 'opening');
    for (let i = 0; i < openingLeans.length; i += 1) {
        for (let j = i + 1; j < openingLeans.length; j += 1) {
            if (!openingLeans[i].some((a) => openingLeans[j].some((b) => opposedLean(a, b))))
                continue;
            const later = openingSentences[j].text;
            const reconciled = /^(?:even so|still|but|though)\b/i.test(later) || /\b(?:while|though|but|even so)\b/i.test(openingSentences[i].text);
            if (!reconciled)
                add('opening.unreconciled', 'error', 'opening', `"${openingSentences[i].text}" and "${later}" lean opposite ways and nothing says how both hold`);
        }
    }
    const careUnits = units.filter((entry) => entry.section === 'care');
    for (let i = 0; i < careUnits.length; i += 1) {
        for (let j = i + 1; j < careUnits.length; j += 1) {
            const score = jaccard(contentWords(careUnits[i].text), contentWords(careUnits[j].text));
            if (score >= 0.6)
                add('repetition.care', 'warning', 'care', `"${careUnits[i].text}" ~ "${careUnits[j].text}" (${score.toFixed(2)})`);
        }
    }
    const limit = card.story.theme.limit;
    if (card.story.theme.kind === 'lead' && limit && !card.sentences.some((entry) => entry.claims.includes(`limit:${limit}`))) {
        add('coverage.limit', 'error', 'opening', `the plan sets the lead against "${limit}" and nothing says it`);
    }
    const relation = card.story.sky.relation;
    if (relation && (relation.type === 'contrast' || relation.type === 'compound') && card.story.sky.contacts.length === 2
        && !card.sentences.some((entry) => entry.claims.includes(`relation:${relation.type}`)) && !card.held.some((hold) => hold.kind.includes('relation') || hold.kind === 'contact:1')) {
        add('qualification.missing', 'warning', 'sky', `two contacts stand as a ${relation.type} and nothing says so`);
    }
    /* N. THE READING AS ONE COMPOSITION (P1.6.3) -------------------------------------------------------- */
    const support = card.story.support ?? [];
    const openingSentences2 = card.sentences.filter((entry) => entry.section === 'opening');
    const skySentences = card.sentences.filter((entry) => entry.section === 'sky');
    for (const entry of support) {
        /* A theme the title leaves out, or names only as "inclined toward", promises nothing. */
        const shown = !card.story.headline.narrowed.includes(entry.topic) && card.story.headline.pull !== entry.topic;
        if (entry.status === 'thin' && shown && !card.story.headline.hedged)
            add('headline.unsupported-theme', 'error', 'title', `"${card.title}" names ${entry.topic}, which nothing presses at its primary weight and nothing in the reading states`);
        if (entry.status === 'absent')
            add('coverage.driver-omitted', 'error', 'sky', `the contact ${entry.lead?.id ?? ''} is what ${entry.topic} stands on and the sky paragraph does not narrate it`);
        if ((entry.status === 'sky' || entry.status === 'unsaid' || entry.status === 'absent' || entry.status === 'convergent') && entry.from && shown && !openingSentences2.some((sentence) => sentence.claims.includes(`because:${entry.topic}`))) {
            const known = entry.status === 'convergent' || Boolean(BECAUSE[entry.topic]?.[entry.from]);
            add(known ? 'headline.reason-missing' : 'headline.reason-vocabulary', known ? 'error' : 'warning', 'opening', `nothing says why ${entry.topic} is the headline (${entry.from})`);
        }
    }
    for (const sentence of card.sentences.filter((entry) => entry.claims.some((claim) => claim.startsWith('because:')))) {
        if (sentence.basis.triggers.length === 0)
            add('because.untraceable', 'error', sentence.section, `"${sentence.text}" says why the headline is the headline and stands on no fact of the day`);
    }
    for (const sentence of card.sentences.filter((entry) => entry.section === 'care')) {
        if (sentence.basis.triggers.length === 0 && sentence.basis.background.length === 0)
            add('caution.untraceable', 'error', 'care', `"${sentence.text}" has no fact under it`);
    }
    if (card.note && card.sentences.some((entry) => entry.claims.some((claim) => claim.startsWith('setting:house:'))))
        add('birthtime.house-without-exact', 'error', 'sky', 'a house is said on a day whose birth time is not exact');
    {
        const contacts = card.story.sky.contacts;
        if (contacts.length === 2 && contacts[0].body === contacts[1].natal && contacts[0].natal === contacts[1].body && contacts[0].body !== contacts[0].natal && contacts[0].quality === contacts[1].quality) {
            const keyOf = (contact) => `contact:${contact.body}>${contact.natal}:${contact.quality}`;
            const sayingFirst = skySentences.filter((entry) => entry.claims.includes(keyOf(contacts[0])));
            const sayingSecond = skySentences.filter((entry) => entry.claims.includes(keyOf(contacts[1])));
            if (contacts[0].timing === contacts[1].timing && sayingFirst.some((entry) => !sayingSecond.includes(entry)) && sayingSecond.some((entry) => !sayingFirst.includes(entry))) {
                add('astrology.mirrored-duplicate', 'error', 'sky', 'two contacts that are mirror images of one pair of points, of one quality and one course, are said as two reasons');
            }
            if (contacts[0].timing !== contacts[1].timing && sayingSecond.length > 0 && !sayingFirst.some((entry) => sayingSecond.includes(entry))
                && !sayingSecond.some((entry) => entry.text.startsWith(MIRROR_CONNECTIVE))) {
                add('astrology.mirrored-duplicate', 'error', 'sky', 'the reverse of a contact is said as a further reason, not as the same thing seen the other way round');
            }
        }
    }
    const stretchText = card.reading.find((part) => part.kind === 'reading:stretch')?.text;
    if (stretchText) {
        for (const sentence of openingSentences2) {
            if (jaccard(contentWords(stretchText), contentWords(sentence.text)) >= 0.6)
                add('stretch.restates', 'warning', 'stretch', `"${stretchText}" ~ "${sentence.text}"`);
        }
    }
    /* K. CALIBRATION ------------------------------------------------------------------------------------- */
    for (const unit of units) {
        if (unit.section === 'numbers' || unit.section === 'title')
            continue;
        if (unit.section !== 'easier' && CATEGORICAL.test(unit.text) && !CALIBRATED.test(unit.text))
            add('calibration.categorical', 'error', unit.section, `"${unit.text}" states a symbolic tendency as a fact`);
    }
    /* L. CAUTIONS HAVE A VISIBLE REASON ------------------------------------------------------------------- */
    const narratedIds = new Set(card.story.sky.contacts.map((contact) => contact.factId));
    for (const sentence of card.sentences.filter((entry) => (entry.section === 'care' && !entry.claims.some((claim) => claim.startsWith('avoid:'))) || (entry.section === 'opening' && entry.claims.some((claim) => claim.startsWith('pull:'))))) {
        const hard = sentence.basis.triggers.map((ref) => card.story.contactIndex.get(ref.id)).filter((contact) => contact !== undefined && contact.quality === 'hard');
        const named = (contact) => card.sentences.some((entry) => entry.claims.includes(`source:${contact.body}>${contact.natal}`));
        if (hard.length > 0 && !hard.some((contact) => narratedIds.has(contact.factId)) && !hard.some((contact) => named(contact))) {
            add('caution.unexplained', 'error', 'care', `"${sentence.text}" stands on a tense contact the reading never mentions`);
        }
    }
    /* M. ADVICE THAT FOLLOWS FROM THE DAY, AND A READING THAT IS NOT THIN -------------------------------- */
    const hardNarrated = card.story.sky.contacts.some((contact) => contact.quality === 'hard');
    if (card.move && hardNarrated && sentencesOf(card.move.text).length === 1
        && ['activity:social-connection', 'activity:difficult-conversation', 'activity:negotiation'].includes(card.move.kind)) {
        add('advice.unreasoned', 'warning', 'move', `the day has a tense contact and the move to reach out ("${card.move.text}") carries no consideration of it`);
    }
    if (card.move) {
        const [action, ...rest] = sentencesOf(card.move.text);
        for (const reason of rest) {
            if (jaccard(contentWords(action), contentWords(reason)) >= 0.5)
                add('advice.restated', 'warning', 'move', `"${reason}" says what "${action}" already said`);
        }
    }
    const lines = card.reading.filter((part) => part.kind !== 'reading:numbers').length + card.easier.length + card.care.length + (card.emotionalClimate ? 1 : 0) + (card.move ? 1 : 0);
    if (card.story.theme.kind === 'lead' && !card.line && lines <= 3)
        add('compression.thin', 'warning', 'reading', `a day with a lead and no opening has only ${lines} lines beyond the numbers`);
    /* N. THE STRENGTH OF A CLAIM (P1.6.4) ---------------------------------------------------------------- */
    for (const found of claimStrengthFindings(units))
        add(found.rule, found.severity, found.section, found.detail);
    return { findings, errors: findings.filter((finding) => finding.severity === 'error').length, warnings: findings.filter((finding) => finding.severity === 'warning').length };
}
