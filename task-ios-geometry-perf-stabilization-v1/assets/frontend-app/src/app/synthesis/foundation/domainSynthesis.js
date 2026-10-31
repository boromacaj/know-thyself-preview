import { axisForDimension } from '../../semantics/semanticTaxonomy.js?v=d9f39e7';
import { THEME_DEFINITIONS } from './themeClustering.js?v=d9f39e7';
/**
 * DOMAIN SYNTHESIS
 * ================
 *
 * The last structural stage: themes are filed under the areas of life a reader
 * would actually navigate by. A theme can appear in several domains - being
 * structured bears on work and on money and on how decisions get made - and that
 * is intended. Domains are a VIEW over the themes, not a partition of them.
 *
 * SPARSE OUTPUT IS THE POINT
 * --------------------------
 * A domain with nothing to say returns nothing and says so. There is no filler,
 * no "balanced approach" placeholder, no reaching down into weak evidence to
 * make a section look populated. That restraint is the whole anti-Barnum
 * position expressed structurally: a profile that genuinely has no strong signal
 * about money must produce an empty money domain, because the alternative is
 * inventing a claim, and an invented claim is indistinguishable to the reader
 * from a real one.
 *
 * Most profiles will leave several domains empty. That is a correct result.
 */
const DOMAIN_LABELS = {
    'core-identity': 'Core identity',
    'inner-world': 'Inner world',
    'decision-making': 'Decision-making',
    relationships: 'Relationships',
    communication: 'Communication',
    'work-career': 'Work and career',
    'money-material': 'Money and material approach',
    creativity: 'Creativity',
    'stress-shadow': 'Stress and shadow patterns',
    growth: 'Growth',
    'energy-pace': 'Energy and pace',
    'social-style': 'Social style',
};
const DOMAIN_ORDER = [
    'core-identity',
    'inner-world',
    'decision-making',
    'relationships',
    'communication',
    'work-career',
    'money-material',
    'creativity',
    'stress-shadow',
    'growth',
    'energy-pace',
    'social-style',
];
const DOMAINS_BY_THEME = new Map(THEME_DEFINITIONS.map((definition) => [definition.id, definition.domains]));
/**
 * @param reportableThemes themes that already cleared the reporting floor. This
 * function does not re-filter: the floor is decided once, in the clustering
 * stage, so a theme can never be visible in one place and hidden in another.
 */
export function synthesizeDomains(reportableThemes, tensions) {
    return DOMAIN_ORDER.map((id) => {
        const themes = reportableThemes.filter((theme) => (DOMAINS_BY_THEME.get(theme.id) ?? []).includes(id));
        /* A tension belongs to a domain when one of that domain's themes actually
           stands on the contested axis. Listing every tension under every domain
           would bury the relevant one. */
        const axesHere = new Set(themes.flatMap((theme) => theme.dimensions
            .map((dimension) => axisForDimension(dimension)?.id)
            .filter((axis) => axis !== undefined)));
        const relevantTensions = tensions.filter((tension) => axesHere.has(tension.axis) && tension.kind !== 'weak-conflict');
        return {
            id,
            label: DOMAIN_LABELS[id],
            themes,
            tensions: relevantTensions,
            noMeaningfulConclusion: themes.length === 0,
        };
    });
}
