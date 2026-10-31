import { safetyPolicyFor } from './questionSafety.js?v=2ea79e9';
import { excerptOf } from './questionText.js?v=2ea79e9';
import { BODY_MIND_SPIRIT, CLASSIC_SPREADS, CUSTOM_SPREADS, STEADYING_REFLECTION, getSpread, } from './spreadLibrary.js?v=2ea79e9';
import { validateSpread } from './spreadValidation.js?v=2ea79e9';
const text = (en, sk) => ({ en, sk });
/**
 * Wording for the places of a classic spread, by the domain the question lives
 * in. Labels only: the description of a place - what it asks the card - is the
 * classic's own, so the question each place asks never drifts.
 */
const DOMAIN_LABELS = {
    'past-present-future:career': {
        past: text('What shaped this path', 'Čo formovalo túto cestu'),
        present: text('Where your work stands now', 'Kde je teraz tvoja práca'),
        future: text('Where this path tends', 'Kam táto cesta smeruje'),
    },
    'past-present-future:relationship': {
        past: text('What shaped this between you', 'Čo to medzi vami formovalo'),
        present: text('Where it stands now', 'Kde to teraz stojí'),
        future: text('Where it tends from here', 'Kam to odtiaľto smeruje'),
    },
    'past-present-future:self-development': {
        past: text('What shaped who you are in this', 'Čo formovalo to, kým v tom si'),
        present: text('Who you are in it now', 'Kým v tom teraz si'),
        future: text('Where you are growing toward', 'Kam smeruje tvoj rast'),
    },
    'past-present-future:creativity': {
        past: text('What fed this work', 'Čo túto tvorbu živilo'),
        present: text('Where the work stands now', 'Kde je teraz tvorba'),
        future: text('Where the work tends', 'Kam tvorba smeruje'),
    },
    'situation-action-outcome:career': {
        situation: text('Where your work stands', 'Kde je tvoja práca'),
        action: text('The move that fits', 'Ťah, ktorý sedí'),
        outcome: text('Where it may lead', 'Kam to môže viesť'),
    },
    'situation-action-outcome:creativity': {
        situation: text('Where the work stands', 'Kde je tvorba'),
        action: text('The move that serves the work', 'Ťah, ktorý tvorbe slúži'),
        outcome: text('Where it may lead', 'Kam to môže viesť'),
    },
    'situation-action-outcome:self-development': {
        situation: text('Where you are now', 'Kde práve si'),
        action: text('What supports your growth', 'Čo podporuje tvoj rast'),
        outcome: text('Where it may lead', 'Kam to môže viesť'),
    },
    'situation-action-outcome:relationship': {
        situation: text('Where things stand between you', 'Ako to medzi vami stojí'),
        action: text('The move that fits', 'Ťah, ktorý sedí'),
        outcome: text('Where it may lead', 'Kam to môže viesť'),
    },
    'problem-cause-solution:relationship': {
        problem: text('What keeps showing up between you', 'Čo sa medzi vami stále ukazuje'),
        cause: text('The dynamic underneath', 'Dynamika pod tým'),
        solution: text('A constructive response', 'Konštruktívna odpoveď'),
    },
    'problem-cause-solution:career': {
        problem: text('What keeps showing up at work', 'Čo sa v práci stále ukazuje'),
        cause: text('The dynamic underneath', 'Dynamika pod tým'),
        solution: text('A constructive response', 'Konštruktívna odpoveď'),
    },
    'problem-cause-solution:creativity': {
        problem: text('What keeps getting in the way of the work', 'Čo tvorbe stále stojí v ceste'),
        cause: text('The dynamic underneath', 'Dynamika pod tým'),
        solution: text('A constructive response', 'Konštruktívna odpoveď'),
    },
    'problem-cause-solution:emotional': {
        problem: text('What keeps coming up', 'Čo sa stále vracia'),
        cause: text('The dynamic underneath', 'Dynamika pod tým'),
        solution: text('A constructive response', 'Konštruktívna odpoveď'),
    },
};
/** The relationship spread, worded for who is on the other side. A neutral noun: the other person's gender is never assumed. */
const RELATIONSHIP_LABELS = {
    romantic: {
        self: text('You in this relationship', 'Ty v tomto vzťahu'),
        other: text('The other person in it', 'Druhý človek v ňom'),
        relationship: text('The bond between you', 'Puto medzi vami'),
    },
    family: {
        self: text('You in this family dynamic', 'Ty v tejto rodinnej dynamike'),
        other: text('The other family member', 'Druhý člen rodiny'),
        relationship: text('The family dynamic between you', 'Rodinná dynamika medzi vami'),
    },
    friend: {
        self: text('You in this friendship', 'Ty v tomto priateľstve'),
        other: text('The other side of the friendship', 'Druhá strana priateľstva'),
        relationship: text('The friendship between you', 'Priateľstvo medzi vami'),
    },
    work: {
        self: text('You in this working relationship', 'Ty v tomto pracovnom vzťahu'),
        other: text('The other person at work', 'Druhý človek v práci'),
        relationship: text('The working dynamic between you', 'Pracovná dynamika medzi vami'),
    },
};
const DOMAIN_ORDER = ['relationship', 'career', 'creativity', 'self-development', 'emotional'];
function domainsOf(intent) {
    const found = new Set();
    const categories = [intent.category, ...intent.secondaryCategories];
    for (const category of categories) {
        if (category === 'relationship' || category === 'career' || category === 'creativity'
            || category === 'self-development' || category === 'emotional')
            found.add(category);
    }
    if (intent.relationshipType !== null)
        found.add('relationship');
    return DOMAIN_ORDER.filter((domain) => found.has(domain));
}
const withLabels = (position, labels) => (labels[position.id] ? { ...position, label: labels[position.id] } : position);
const quoted = {
    en: (value) => `“${value}”`,
    sk: (value) => `„${value}“`,
};
function adaptOptions(base, intent) {
    const options = intent.options;
    if (!options)
        return null;
    const a = excerptOf(options.a, 60);
    const b = excerptOf(options.b, 60);
    const labels = options.form === 'explicit-two'
        ? {
            'option-a': text(`Option A: ${quoted.en(a)}`, `Možnosť A: ${quoted.sk(a)}`),
            'option-b': text(`Option B: ${quoted.en(b)}`, `Možnosť B: ${quoted.sk(b)}`),
        }
        : {
            'option-a': text(`Going ahead: ${quoted.en(a)}`, `Ísť do toho: ${quoted.sk(a)}`),
            'option-b': text('Holding off, or leaving things as they are', 'Počkať, alebo nechať veci tak, ako sú'),
        };
    const positions = base.positions.map((position) => withLabels(position, labels));
    const adaptations = base.positions
        .filter((position) => labels[position.id])
        .map((position) => ({ positionId: position.id, from: position.label, to: labels[position.id] }));
    return {
        spread: { ...base, positions, origin: 'adapted', basedOn: base.id },
        template: { ...base, origin: 'adapted', basedOn: base.id },
        adaptations,
    };
}
function adaptSpread(base, intent) {
    if (base.id === 'option-a-b-guidance')
        return adaptOptions(base, intent);
    let labels;
    if (base.id === 'self-other-relationship') {
        labels = intent.relationshipType ? RELATIONSHIP_LABELS[intent.relationshipType] : undefined;
    }
    else {
        for (const domain of domainsOf(intent)) {
            labels = DOMAIN_LABELS[`${base.id}:${domain}`];
            if (labels)
                break;
        }
    }
    if (!labels)
        return null;
    const positions = base.positions.map((position) => withLabels(position, labels));
    const adaptations = base.positions
        .filter((position) => labels[position.id])
        .map((position) => ({ positionId: position.id, from: position.label, to: labels[position.id] }));
    if (adaptations.length === 0)
        return null;
    const spread = { ...base, positions, origin: 'adapted', basedOn: base.id };
    return { spread, template: spread, adaptations };
}
/**
 * A spread defined from outside the library - the entry point a later feature
 * (a user's own layout, a larger advanced spread) would use. It is validated
 * like any other; the validation result travels with it so the caller can see
 * WHY a layout was refused rather than only that it was.
 */
export function buildCustomSpread(input) {
    const spread = {
        id: input.id,
        name: input.name,
        description: input.description,
        minCards: input.positions.length,
        maxCards: input.positions.length,
        positions: input.positions,
        supportedIntents: input.supportedIntents ?? [],
        synthesisStrategy: input.synthesisStrategy,
        origin: 'custom',
    };
    return { spread, validation: validateSpread(spread) };
}
/* ------------------------------------------------------------- selection -- */
function ready(spread, mode, because, safety, adaptations, validation, basedOn) {
    return { status: 'ready', spread, mode, basedOn, because, adaptations, safety, validation };
}
export function selectSpread(intent) {
    const safety = safetyPolicyFor(intent.sensitivityFlags);
    if (!safety.drawsCards) {
        return {
            status: 'blocked', spread: null, mode: null, basedOn: null, because: 'safety:support-first', adaptations: [],
            safety, validation: { ok: true, issues: [] },
        };
    }
    if (safety.forceSpreadId !== null) {
        const forced = getSpread(safety.forceSpreadId) ?? STEADYING_REFLECTION;
        return ready(forced, 'policy', `safety:${safety.primary}`, safety, [], validateSpread(forced), null);
    }
    const wanted = intent.spreadRecommendation.spreadId;
    const classic = CLASSIC_SPREADS.find((spread) => spread.id === wanted);
    if (classic) {
        const adapted = adaptSpread(classic, intent);
        if (adapted) {
            const validation = validateSpread(adapted.template);
            if (validation.ok) {
                return ready(adapted.spread, 'adapted', intent.spreadRecommendation.because, safety, adapted.adaptations, validation, classic.id);
            }
        }
        const validation = validateSpread(classic);
        if (validation.ok)
            return ready(classic, 'classic', intent.spreadRecommendation.because, safety, [], validation, null);
    }
    const custom = CUSTOM_SPREADS.find((spread) => spread.id === wanted);
    if (custom) {
        const validation = validateSpread(custom);
        if (validation.ok)
            return ready(custom, 'custom', intent.spreadRecommendation.because, safety, [], validation, null);
    }
    /* A recommendation that cannot be honoured falls back to the most general classic, and says so. */
    return ready(BODY_MIND_SPIRIT, 'classic', 'fallback:general', safety, [], validateSpread(BODY_MIND_SPIRIT), null);
}
export const SPREAD_ORIGINS = ['classic', 'adapted', 'custom', 'policy'];
