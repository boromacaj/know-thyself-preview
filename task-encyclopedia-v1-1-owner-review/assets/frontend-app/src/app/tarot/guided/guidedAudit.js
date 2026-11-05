/* A negation or a quotation of what a reading refuses ("not what they think") is not a claim. The look-behinds below handle the common forms. */
const RULES = [
    {
        claim: 'predict-outcome',
        en: /\b(?:guarantee[sd]?|is certain to|are certain to|is bound to|are bound to|is sure to|definitely (?:happen|work|change)|without (?:a )?doubt)\b/i,
        sk: /\b(?:zaručen\w*|určite sa (?:stane|podarí|zmení)|nepochybne)\b/i,
    },
    {
        claim: 'other-person-mind',
        en: /(?<!what )(?<!whether )(?<!how )(?<!that )\b(?:he|she|they|your (?:partner|friend|mother|father|boss|ex)|the other (?:person|side))\s+(?:secretly\s+|really\s+|truly\s+)?(?:thinks?|feels?|wants?|loves?|hates?|resents?|is hiding|is lying|intends?|plans?|is cheating|has been cheating)\b(?! you)/i,
        sk: /(?<!čo )(?<!ako )(?<!či )\b(?:on|ona|oni|tvoj partner|tvoja partnerka|druhá strana|druhý človek)\s+(?:tajne\s+|naozaj\s+|skutočne\s+)?(?:si myslí|cíti|chce|miluje|nenávidí|skrýva|klame|zamýšľa|plánuje|podvádza)\b/i,
    },
    {
        claim: 'financial-advice',
        /* "investment" as a word of feeling (an investment of care, time or hope) is the engine's own and not advice; investing in a financial thing is. */
        en: /\b(?:invest(?:ment|ments)\s+(?:advice|portfolio|opportunit\w+|funds?|accounts?|strateg\w+|tips?|decisions?)|investors?|invest(?:ing)?\s+(?:in|into)\s+(?:stocks?|shares?|funds?|crypto\w*|bonds?|property|real estate|gold|the market)|invest\s+(?:your|the|my)\s+(?:money|savings|capital)|stock (?:market|exchange|prices?|tips?)|(?:buy|sell|trade|trading|picking)\s+(?:stocks?|shares)|shares in (?:a |the )?(?:company|firm|market)|crypto\w*|bitcoin|forex|etfs?|lottery|gambl\w+|mortgage|portfolio|day[- ]trad\w+|interest rates?)\b|(?:\byou should\s+(?:\w+\s+){0,3}(?:buy|sell|save|spend|borrow|lend|trade|bet|invest)\b)|[€$£]\s?\d|\b\d[\d,.]*\s?(?:€|eur\b|euros?\b|dollars?\b|usd\b|%)/i,
        sk: /\b(?:investíci\w*|investičn\w+|investor\w*|investovať do|investuj do|investuješ do|akci(?:e|í|ách|ami)\b|kryptomen\w*|bitcoin\w*|forex|lotéri\w*|hazard\w*|hypotéka|hypotéku|hypotéky|portfólio|úrokov\w+ sadz\w+)\b|[€$£]\s?\d|\b\d[\d\s.,]*\s?(?:€|eur\b|eúr\b|dolárov\b|%)/i,
    },
    {
        claim: 'health-claim',
        en: /\b(?:diagnos\w+|disorder|clinical|depress(?:ion|ed|ive)|anxiety disorder|medication|prescri\w+|illness|disease|symptoms?|therapy for|psychiatr\w+|you (?:have|suffer from) (?:an? )?(?:anxiety|depression|trauma))\b/i,
        sk: /\b(?:diagnóz\w+|porucha|poruchy|poruchou|klinick\w+|depresi\w+|depresívn\w+|liek(?:y|ov)\b|choroba|choroby|symptóm\w*|psychiatr\w+)\b/i,
    },
    {
        claim: 'legal-claim',
        en: /\b(?:lawsuit|sue\b|sued\b|court case|legal(?:ly)? (?:right|rights|obligation|action)|custody|alimony|contract (?:is|are) (?:void|valid|binding)|breach of)\b/i,
        sk: /\b(?:žaloba|žalobu|žalovať|súdny spor|súdneho sporu|právny nárok|právne nároky|opatrovníctv\w+|výživné|porušenie zmluvy)\b/i,
    },
    {
        claim: 'life-directive',
        en: /\b(?:you (?:should|must|need to|have to|ought to) (?:now )?(?:leave|quit|resign|move out|move away|break up|end (?:it|the relationship|things)|divorce|walk away|sell|go back)|(?:leave|quit|end) (?:him|her|them|the relationship|your job|your marriage)\b)/i,
        sk: /\b(?:(?:mal|mala|mali) by (?:si|ste) (?:\w+\s+){0,2}(?:odísť|skončiť|odísť|presťahovať|rozísť|vzdať sa)|musíš (?:\w+\s+){0,2}(?:odísť|skončiť|rozísť|presťahovať)|(?:odíď|skonči|rozíď sa) (?:od|s) )\b/i,
    },
    {
        claim: 'fate-claim',
        en: /\b(?:meant to be|destiny|destined|fated|fate (?:has|wants|decides)|the universe (?:wants|is telling|is sending|sent|says|has plans|will)|written in the stars|soul ?mates?|divine plan)\b/i,
        sk: /\b(?:osud(?:om|u|y)?\b|predurčen\w+|súden\w+|vesmír (?:chce|ti posiela|ti hovorí|má plán)|v hviezdach|spriaznen\w+ duš\w+|božský plán)\b/i,
    },
];
export function auditGuidedText(text, locale) {
    const out = [];
    for (const rule of RULES) {
        const match = (locale === 'en' ? rule.en : rule.sk).exec(text);
        if (match)
            out.push({ claim: rule.claim, match: match[0] });
    }
    return out;
}
export const GUIDED_AUDIT_RULE_COUNT = RULES.length;
