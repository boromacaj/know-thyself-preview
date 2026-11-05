/*
 * THE STRENGTH OF A CLAIM, JUDGED SENTENCE BY SENTENCE (P1.6.4).
 *
 * A sentence can be fluent and say more than the day's facts say, or say the same thing twice and call it a conclusion. Four things are different in kind and a
 * sentence must not slide from one to the next:
 *
 *   a THEME is prominent               "Connecting with others is one of the themes of the day"
 *   a TENDENCY toward ease is supported  "Conversation and company come more easily today"
 *   a PRACTICAL CHOICE fits            "which makes this a good moment to work out the next steps"
 *   an OUTCOME is predicted            "time with other people is likely to go well"   <- never supported
 *
 * The rules read STRUCTURE (a premise clause and a conclusion clause that carry the same ease; an outcome verb; another person's behaviour as a fact; a theme offered as the
 * cause of an ease). They are not a list of banned sentences, and a clean report is not evidence of good language: whether a sentence is natural, wise or useful is judged
 * by reading (the evaluation corpus), never by this module.
 *
 *   sentence.circular        a clause that says something is easier, and after "so" / "which makes" a clause that says the same ease again (or an outcome)
 *   claim.outcome-certainty  an ease or a lean is stated as what WILL happen ("is likely to go well", "will turn out")
 *   claim.third-party        another person's behaviour is stated as a fact ("people will be more receptive")
 *   claim.theme-as-ease      a theme being prominent is offered as the reason an activity becomes easier
 *   claim.predicted-effect   a piece of advice is worded as a probable effect ("is likely to serve better than"): a warning, since the plan's lean is a choice, not a forecast
 */
/** What a clause says when it says that something is easier. */
const PREMISE = [
    /\b(?:come|comes|came) (?:a little |much )?(?:more )?(?:easily|readily|naturally)\b/i,
    /\btends? to come more (?:easily|naturally|readily)\b/i,
    /\bfavou?rs [^,.]+ today\b/i,
    /\bthe sky (?:smooths the way|makes [a-z ]+ easier|gives it room|leaves room for it|eases contact)\b/i,
    /\b(?:is|are) (?:a little )?easier\b/i,
];
/** What a clause says when it only repeats that ease, or turns it into an outcome. */
const CONCLUSION = [
    /\b(?:is|are) likely to go well\b/i, /\bmay go well\b/i, /\bgo(?:es)? well\b/i,
    /\b(?:may )?come(?:s)? (?:a little )?more (?:easily|readily|naturally)\b/i,
    /\btakes? less effort\b/i, /\btends? to be easier than usual\b/i, /\beasier (?:to|than usual)\b/i,
    /\bthe natural thing to do\b/i, /\bmay meet less resistance\b/i, /\bmay feel natural rather than forced\b/i,
    /\broom to explore before settling\b/i, /\bno need to decide just yet\b/i, /\bmay be easy to find\b/i,
];
const JOINER = /,\s*(?:so|which makes|which means|and so|which is why)\s+/i;
const OUTCOME = /\b(?:is|are) likely to go well\b|\bwill go well\b|\bwill (?:turn out|work out|be (?:smooth|easy|easier|well received|welcomed))\b|\bis (?:bound|sure) to\b|\bguaranteed\b/i;
const THIRD_PARTY = /\b(?:people|others|everyone|colleagues|friends|family|partners?|they) (?:will|are going to|are likely to|are bound to|tend to be|are) (?:be )?(?:more |much )?(?:receptive|open|welcoming|helpful|responsive|generous|forgiving|willing|sympathetic)\b/i;
const THEME_AS_EASE = /\b(?:because|since)\b[^.]{0,90}\b(?:is|being) (?:today's|the day's) (?:theme|focus)\b[^.]{0,90}\b(?:will|easier|easily|go well)\b/i;
const PREDICTED_EFFECT = /\bis likely to serve better\b/i;
export function claimStrengthFindings(units) {
    const out = [];
    for (const unit of units) {
        if (unit.section === 'numbers' || unit.section === 'title')
            continue;
        const joined = unit.text.split(JOINER);
        if (joined.length >= 2) {
            const premise = joined[0];
            const conclusion = unit.text.slice(joined[0].length).replace(JOINER, '');
            if (PREMISE.some((pattern) => pattern.test(premise)) && CONCLUSION.some((pattern) => pattern.test(conclusion))) {
                out.push({ rule: 'sentence.circular', severity: 'error', section: unit.section, detail: `"${unit.text}" says that something is easier and then says the same ease again as its conclusion` });
            }
        }
        if (OUTCOME.test(unit.text))
            out.push({ rule: 'claim.outcome-certainty', severity: 'error', section: unit.section, detail: `"${unit.text}" states as what will happen what the facts only make easier or likelier` });
        if (THIRD_PARTY.test(unit.text))
            out.push({ rule: 'claim.third-party', severity: 'error', section: unit.section, detail: `"${unit.text}" states another person's behaviour as a fact` });
        if (THEME_AS_EASE.test(unit.text))
            out.push({ rule: 'claim.theme-as-ease', severity: 'error', section: unit.section, detail: `"${unit.text}" offers a theme being prominent as the reason something becomes easier` });
        if (PREDICTED_EFFECT.test(unit.text))
            out.push({ rule: 'claim.predicted-effect', severity: 'warning', section: unit.section, detail: `"${unit.text}" words advice as a probable effect` });
    }
    return out;
}
