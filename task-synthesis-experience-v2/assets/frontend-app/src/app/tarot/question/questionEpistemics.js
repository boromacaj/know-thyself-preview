const RULES = [
    { label: 'literal death or dying', re: /\b(will die|dying|died|your death|someone dies)\b/i },
    { label: 'illness or diagnosis', re: /\b(illness|disease|diagnos\w*|cancer|symptom|cure[sd]?|heal your|medical)\b/i },
    { label: 'pregnancy', re: /\b(pregnan\w*|conceive|miscarr\w*|tehotn\w*|otehotn\w*)\b/i },
    { label: 'infidelity', re: /\b(cheat\w*|affair|unfaithful|betray\w+ you|nevern\w*)\b/i },
    { label: 'crime or police', re: /\b(crime|criminal|arrest\w*|police|prison|jail|trestn\w*|polic\w*)\b/i },
    { label: 'money amounts or windfall', re: /\b(windfall|inherit\w*|lottery|rich|wealth\w*|salary|raise at work|bohatstv\w*|dedičstv\w*|zbohatn\w*|lotéri\w*)\b/i },
    { label: 'legal advice', re: /\b(lawsuit|lawyer|court case|contract you|sue\b|právnik\w*|žalob\w*)\b/i },
    { label: 'marriage or divorce as event', re: /\b(marry|marriage|wedding|divorce\w*|svadb\w*|rozvod\w*|manželstv\w*)\b/i },
    { label: 'breakup as event', re: /\b(break up|breakup|they will leave|rozíde\w*|rozchod\w*)\b/i },
    { label: 'reading another person mind', re: /\b(he (thinks|feels|wants)|she (thinks|feels|wants)|they (secretly|really) (think|feel|want))\b/i },
    { label: 'prediction verbs', re: /\b(will happen|is going to happen|you will (get|meet|find|receive)|predicts?|prophec\w*|stane sa ti|predpoved(?!ď\b)\w*)\b/i },
    { label: 'fate or destiny', re: /\b(your fate|destined|destiny|predetermined|osud je|predurčen\w*)\b/i },
    { label: 'diagnosis of the reader', re: /\b(you (are|have) (depressed|depression|anxiety|adhd|autistic|bipolar|trauma))\b/i },
    /* Added for the question engine: a reading that answers a question must still never promise. */
    /* "will" as a verb that predicts. The noun ("by will rather than by force") and the conditional inside a
       card's own phrase ("something that will take weight") are the daily reading's shared wording and are not
       predictions about the reader. */
    { label: 'predictive will', re: /\b(?:it|this|that|you|they|he|she|we|there|things?|everything|nothing)\s+will\s+(?:be|happen|come|get|become|lead|end|change|work|make|bring|have|go|find|meet|receive|turn|stay|follow|open|close)\b|\bwill\s+(?:happen|come true|be (?:fine|well|ok|okay))\b/i, locale: 'en' },
    { label: 'going to / certainty', re: /\b(going to|definitely|certainly|guaranteed|for sure|without a doubt)\b/i, locale: 'en' },
    { label: 'certainty (sk)', re: /\b(určite|nepochybne|zaručene|nevyhnutne|iste sa)\b/i, locale: 'sk' },
    { label: 'gendered participle after si', re: /\bsi\s+\w*(?:al|el|il|ol|ul|ll)\b/, locale: 'sk' },
    { label: 'gendered conditional with by si', re: /\bby\s+si\b/, locale: 'sk' },
    { label: 'masculine adjective in address', re: /\b(zostať|byť|ostať)\s+\w+(?:ný|tý|rý|ký|vý|lý)\b/, locale: 'sk' },
];
export function auditReadingText(text, locale, ignore = []) {
    let own = text;
    for (const quoted of ignore)
        if (quoted.length > 0)
            own = own.split(quoted).join(' ');
    const found = [];
    for (const rule of RULES) {
        if (rule.locale !== undefined && rule.locale !== locale)
            continue;
        const match = rule.re.exec(own);
        if (match)
            found.push({ rule: rule.label, match: match[0] });
    }
    return found;
}
export const EPISTEMIC_RULE_COUNT = RULES.length;
