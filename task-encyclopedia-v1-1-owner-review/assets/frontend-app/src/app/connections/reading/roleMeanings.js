const hd = (facts) => (facts.precision === 'exact' ? facts.humanDesign : null);
const authority = (value) => (facts) => hd(facts)?.authority === value;
const type = (...values) => (facts) => values.includes(hd(facts)?.type ?? '');
/** A body's sign, only when it is the same sign across the birth-time window. */
function signOf(facts, body) {
    const found = facts.astrology?.bodies.find((entry) => entry.body.toLowerCase() === body.toLowerCase());
    if (!found)
        return null;
    const low = Math.floor((((found.longitude - found.drift) % 360) + 360) % 360 / 30);
    const high = Math.floor((((found.longitude + found.drift) % 360) + 360) % 360 / 30);
    return low === high ? found.sign.toLowerCase() : null;
}
/** A Life Path number, never a master number read as its root. */
const lifePath = (value) => (facts) => { const lp = facts.numerology?.['life-path']; return !!lp && !lp.master && lp.value === value; };
const cap = (word) => word.charAt(0).toUpperCase() + word.slice(1);
const sign = (body, ...signs) => (facts) => signs.includes(signOf(facts, body) ?? '');
export const ROLE_MEANINGS = [
    /*
     * WHAT SHIPS: only entries a blind review judged correct IN CONTEXT (rounds r1/r2, the whole-reading review w and the coverage review k; records in
     * docs/reading-intelligence/blind-review/). Removed after review: emotional authority on caution and daring (it fought the panel's role for that
     * partner), Life Path 4, an earth Mercury, Venus in Libra/Leo and the "freedom inside closeness" lines (they restated the panel), the sacral "quick
     * yes" and the fire Moon (wrong role, contradiction). Not shipped because no review saw them in a reading: the Human Design responding type and
     * Projector, splenic and self-projected authority, Mercury in Gemini or in Sagittarius/Aquarius, a Moon in Capricorn, Venus or Moon in Cancer.
     * Where the reviewer kept only the reframe, the sentence that named the method ("Life Path is 5, the number of ...") is left out of the main text;
     * the factor stays in the panel's evidence disclosure.
     */
    /* Decision: who moves first */
    {
        id: 'lead/assertive/hd-manifestor', factor: 'hd-type', dynamic: 'taking-the-lead', pole: 'assertive', holds: type('Manifestor'),
        say: (n, o) => `A plan from ${n} tends to go better when ${o} hears it early, as news, than when it arrives already decided.`,
    },
    /* Communication: how each makes sense of things */
    {
        id: 'reasoning/intuitive/hd-sacral', factor: 'hd-authority', dynamic: 'reasoning-style', pole: 'intuitive', holds: authority('Sacral'),
        say: (n) => `${n} has sacral authority in Human Design, an answer that comes in the body before the mind has finished the question. So ${n}'s sense of a thing can arrive without its reasons and still be worth hearing first.`,
    },
    {
        id: 'reasoning/analytical/mercury-virgo', factor: 'mercury', dynamic: 'reasoning-style', pole: 'analytical', holds: sign('Mercury', 'virgo'),
        say: (n) => `${n}'s Mercury in Virgo points to thought that checks the detail and the order of things. ${n} tends to want to see how the parts fit before agreeing, which is care, not mistrust.`,
    },
    /* Communication and conflict: how each digests a feeling (emotional authority: timing, never expressiveness) */
    {
        id: 'pace/introspective/hd-emotional', factor: 'hd-authority', dynamic: 'processing-pace', pole: 'introspective', holds: authority('Emotional / Solar Plexus'),
        say: (n) => `Settling a feeling before speaking is how ${n} finds out what it is, not a way of holding it back.`,
    },
    /* Conflict: how feeling is shown */
    {
        id: 'feeling/contained/moon-scorpio', factor: 'moon', dynamic: 'emotional-expression', pole: 'emotionally-contained', holds: sign('Moon', 'scorpio'),
        say: (n) => `${n}'s Moon in Scorpio points to feeling that runs deep and is shown most readily where trust is sure. What ${n} keeps back after a hurt is often the part that matters most, and steadiness draws it out where pressure would not.`,
    },
    {
        id: 'feeling/contained/moon-aquarius', factor: 'moon', dynamic: 'emotional-expression', pole: 'emotionally-contained', holds: sign('Moon', 'aquarius'),
        say: (n) => `${n}'s Moon in Aquarius points to feeling looked at from a little distance before it is shown. ${n} may need to understand a reaction before owning it, so a calm reply can still be a felt one.`,
    },
    /* Everyday life */
    {
        id: 'change/novelty-seeking/life-path-5', factor: 'life-path', dynamic: 'change-and-steadiness', pole: 'novelty-seeking', holds: lifePath(5),
        say: (n) => `A new idea from ${n} is usually a way of keeping the shared life moving, not a judgement on how it is now.`,
    },
    {
        id: 'change/stability-seeking/venus-taurus', factor: 'venus', dynamic: 'change-and-steadiness', pole: 'stability-seeking', holds: sign('Venus', 'taurus'),
        say: (n) => `${n}'s Venus in Taurus points to affection that grows through what is familiar and repeated. For ${n}, a change is easier to welcome when something steady is kept alongside it.`,
    },
    /* Closeness: social energy */
    {
        id: 'visibility/private/life-path-7', factor: 'life-path', dynamic: 'social-energy', pole: 'private', holds: lifePath(7),
        say: (n) => `A quiet evening restores ${n}, and declining an invitation is seldom a comment on the company.`,
    },
];
/**
 * The licensed role meanings for one dimension view (at most one per partner), in the order first, second. `said` holds `${who}|${factor}` already used
 * in this reading and is updated.
 */
export function roleSentences(dynamic, relation, facts, names, said) {
    const out = [];
    for (const who of ['first', 'second']) {
        const stance = who === 'first' ? relation.stanceA : relation.stanceB;
        const mine = facts[who];
        const theirs = facts[who === 'first' ? 'second' : 'first'];
        if (!mine || !stance.pole || stance.mixed || stance.strength === 'unknown')
            continue;
        const meaning = ROLE_MEANINGS.find((entry) => entry.dynamic === dynamic && entry.pole === stance.pole && entry.holds(mine)
            && !(theirs && entry.holds(theirs)) && !said.has(`${who}|${entry.factor}`));
        if (!meaning)
            continue;
        said.add(`${who}|${meaning.factor}`);
        const [name, other] = who === 'first' ? [names.first, names.second] : [names.second, names.first];
        out.push({ meaning, who, text: meaning.say(name, other, mine) });
    }
    /* (second blind review) a panel about a likeness both share is not explained for one partner alone; and two partners licensed by the same family of
       meaning for the same role in the same words would read as one template twice: both stay silent */
    const shared = relation.stanceA.pole !== null && relation.stanceA.pole === relation.stanceB.pole;
    if (shared && out.length === 1) {
        said.delete(`${out[0].who}|${out[0].meaning.factor}`);
        return [];
    }
    /* the same template for both (names and the placement aside): "freedom inside closeness" twice. Two different authored meanings of one family, such
       as a Moon in Aquarius beside a Moon in Scorpio, are two different things to say and are kept (both blind reviews preferred them). */
    const template = (entry) => entry.text.replaceAll(names.first, 'A').replaceAll(names.second, 'A').replace(/\b(?:Moon|Venus|Mercury) in [A-Z][a-z]+/g, 'P');
    if (out.length === 2 && template(out[0]) === template(out[1])) {
        for (const entry of out)
            said.delete(`${entry.who}|${entry.meaning.factor}`);
        return [];
    }
    return out;
}
/** The paragraph for a view: the licensed sentences, first partner first. */
export function roleParagraph(sentences) {
    return sentences.map((entry) => entry.text).join(' ');
}
