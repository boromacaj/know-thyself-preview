import { SEMANTIC_AXES } from '../../semantics/semanticTaxonomy.js?v=2ea79e9';
import { AXIS_DYNAMICS } from '../domains/dynamics.js?v=2ea79e9';
import { settle } from '../narrative/consistency.js?v=2ea79e9';
import { PARENTING_SITUATIONS } from './contentTypes.js?v=2ea79e9';
import { forAge } from './ageWords.js?v=2ea79e9';
import { fill, paragraph, say, sentence } from './languages.js?v=2ea79e9';
/**
 * WHAT ONLY A CHILD'S READING HAS: THE CHILD'S OWN PORTRAIT, AND THE GUIDE FOR THEIR AGE.
 *
 * Both sit beside the pair reading, not inside it. The portrait says what the child's own profile points to, in the vocabulary of the parenting content (`AxisContent.child`):
 * tendencies, never a type, never a diagnosis, never a prediction. The age guide is the developmental half: what is typical at this age in eight everyday situations, and what to
 * try. It is ordered by what the user said they see, then by where the child's profile is clearest, and each situation carries one line that adjusts the age-appropriate advice for
 * the way this child leans (`fit`). A newborn, a four-year-old, a nine-year-old and a fifteen-year-old do not receive the same text: the band decides the entry.
 */
/** The axis each situation draws on, for the `fit` line. Null: the situation is about the household, not one axis. */
export const SITUATION_AXIS = {
    communicating: 'reasoning',
    'rules-and-limits': 'structure',
    'strong-feelings': 'emotional-expression',
    withdrawing: 'inner-focus',
    'change-and-transitions': 'change',
    independence: 'autonomy',
    siblings: null,
    'two-adults': null,
};
export const SITUATION_TITLES = {
    communicating: { en: 'Talking with this child', sk: 'Rozhovor s týmto dieťaťom' },
    'rules-and-limits': { en: 'Rules and limits', sk: 'Pravidlá a hranice' },
    'strong-feelings': { en: 'Big feelings', sk: 'Silné emócie' },
    withdrawing: { en: 'When the child pulls away', sk: 'Keď sa dieťa stiahne' },
    'change-and-transitions': { en: 'Change and transitions', sk: 'Zmeny a prechody' },
    independence: { en: 'Independence', sk: 'Samostatnosť' },
    siblings: { en: 'Brothers and sisters', sk: 'Súrodenci' },
    'two-adults': { en: 'Two adults, one approach', sk: 'Dvaja dospelí, jeden prístup' },
};
/** Which situation an observed-context code points to first. */
const CONTEXT_SITUATIONS = {
    'communication-struggles': ['communicating'],
    'frequent-conflict': ['strong-feelings', 'rules-and-limits'],
    'strong-reactions-to-change': ['change-and-transitions'],
    'resists-rules': ['rules-and-limits', 'independence'],
    'withdraws-when-upset': ['withdrawing', 'strong-feelings'],
    'sibling-friction': ['siblings'],
    'unfair-comparison': ['siblings'],
    'parents-disagree-on-approach': ['two-adults'],
    'feeling-unseen': ['communicating', 'withdrawing'],
};
const PORTRAIT_AXES = 3;
export function childPortraitOf(args) {
    const { lang, name, stances, content, narrative } = args;
    /* The three axes on which this child's evidence is clearest. A "middle" axis says nothing and is not described; silence is not a trait. */
    const clearest = SEMANTIC_AXES
        .map((axis) => ({ axis: axis.id, stance: stances[axis.id] }))
        .filter(({ stance }) => stance.pole && stance.strength !== 'unknown' && stance.strength !== 'middle' && !stance.mixed)
        .sort((a, b) => Math.abs(b.stance.z) - Math.abs(a.stance.z) || (a.axis < b.axis ? -1 : 1))
        .slice(0, PORTRAIT_AXES)
        .filter(({ axis, stance }) => content.axes[axis].child?.[stance.pole]);
    /* Two things said of one child that can seem to pull apart (sociable, and happiest alone) are joined by a bridge, or a thin one is left out; never both stated flatly. */
    const claims = clearest.map(({ axis, stance }) => ({
        person: 'first', findingId: AXIS_DYNAMICS[axis], axis, pole: stance.pole, strength: stance.strength, mixed: stance.mixed,
    }));
    const order = claims.map((claim) => claim.findingId);
    const settled = settle(claims, order, {
        keep: order[0] ?? 'processing-pace',
        droppable: new Set(claims.slice(1).filter((claim) => claim.strength === 'slight').map((claim) => claim.findingId)),
    });
    const kept = clearest.filter(({ axis }) => !settled.dropped.includes(AXIS_DYNAMICS[axis]));
    const paragraphs = [];
    const poles = [];
    kept.forEach(({ axis, stance }, index) => {
        const voice = content.axes[axis].child[stance.pole];
        poles.push(stance.pole);
        const bridges = settled.resolutions
            .filter((entry) => entry.resolution === 'bridged' && entry.at === AXIS_DYNAMICS[axis])
            .map((entry) => narrative.tensions[entry.hit.tension])
            .filter((bridge) => Boolean(bridge))
            .map((bridge) => fill(say(bridge, lang), { name }));
        /* The portrait says who the child tends to be; what an adult can do about it is the age guide's and the cards' to say, once. The first thing said carries what it may mean the child needs. */
        paragraphs.push(paragraph(`${sentence(name)} ${say(voice.shows, lang)}.`, index === 0 ? say(voice.needs, lang) : null, ...bridges));
    });
    return { name, paragraphs, poles, axes: kept.map(({ axis }) => axis) };
}
export function ageGuideViewOf(args) {
    const { lang, band, guide, context } = args;
    /* Under three there is no profile-led reading of the child at all: not a "for this child" line, and not even the order in which the situations come. */
    const childStances = band === 'infant-0-1' || band === 'toddler-1-3' ? null : args.childStances;
    const entry = guide.find((candidate) => candidate.band === band);
    if (!entry)
        return null;
    /* What the user named, in the order they named it: every code's first situation, then every code's second, so two things asked about both come before a third one implied. */
    const pointed = context.map((code) => CONTEXT_SITUATIONS[code] ?? []);
    const depth = Math.max(0, ...pointed.map((list) => list.length));
    const namedOrder = [];
    for (let level = 0; level < depth; level += 1)
        for (const list of pointed)
            if (list[level] && !namedOrder.includes(list[level]))
                namedOrder.push(list[level]);
    const named = new Set(namedOrder);
    const namedRank = (situation) => (named.has(situation) ? namedOrder.indexOf(situation) : namedOrder.length);
    const clarity = (situation) => {
        const axis = SITUATION_AXIS[situation];
        if (!axis || !childStances)
            return 0;
        const stance = childStances[axis];
        return stance.pole && stance.strength !== 'unknown' ? Math.abs(stance.z) : 0;
    };
    const ordered = [...PARENTING_SITUATIONS]
        .filter((situation) => !(args.omit ?? []).includes(situation))
        .sort((a, b) => namedRank(a) - namedRank(b) || clarity(b) - clarity(a) || PARENTING_SITUATIONS.indexOf(a) - PARENTING_SITUATIONS.indexOf(b));
    const situations = ordered.map((id) => {
        const item = entry.situations[id];
        const axis = SITUATION_AXIS[id];
        const pole = axis && childStances ? childStances[axis].pole : null;
        /* Under three there is no "for this child" line: the profile says nothing about a baby or a toddler that the age does not. */
        const inPortrait = !args.portraitAxes || (axis !== null && args.portraitAxes.includes(axis));
        const fit = pole && inPortrait && item.fit?.[pole] && band !== 'infant-0-1' && band !== 'toddler-1-3' ? forAge(say(item.fit[pole], lang), band, lang) : null;
        /* A baby or a toddler is not read, and nothing the user reported is about them by name: no situation of their guide carries "From what you noticed". */
        const tooYoung = band === 'infant-0-1' || band === 'toddler-1-3';
        return { id, title: say(SITUATION_TITLES[id], lang), know: say(item.know, lang), try: say(item.try, lang), fit, sources: item.sources, priority: named.has(id) && !tooYoung };
    });
    return { band, label: say(entry.label, lang), portrait: say(entry.portrait, lang), notYet: say(entry.notYet, lang), situations };
}
/** The dynamics a situation draws on, for tying the guide to the pair findings. */
export const SITUATION_DYNAMIC = {
    communicating: 'reasoning-style', 'rules-and-limits': 'structure-and-flexibility', 'strong-feelings': 'emotional-expression', withdrawing: 'processing-pace',
    'change-and-transitions': 'change-and-steadiness', independence: 'closeness-and-room', siblings: null, 'two-adults': null,
};
