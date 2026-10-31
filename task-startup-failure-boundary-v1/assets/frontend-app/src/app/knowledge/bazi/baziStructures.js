import { sig } from '../semanticDimensions.js?v=2ea79e9';
import { ALL_BRANCHES, BAZI_CONTESTED, BAZI_TCM, BAZI_ZIPING, BRANCH_INFO, STEM_PHASE, branchSignals, branchUnit, conceptUnit, phaseSignals, phaseUnit, pillarPairUnit, polarityUnit, relationUnit, sexagenaryPairs, tenGodUnit, } from './baziAuthoring.js?v=2ea79e9';
const branchEntries = [
    { key: 'zi', headline: 'Midnight water: resourceful, private, awake when nothing else is.',
        core: [
            'Zi is the branch of midnight and of the winter solstice - pure yin water, holding Gui as its only hidden stem. A single-stem branch expresses cleanly, which makes this one of the easier positions in a chart to read.',
            'What it contributes is intelligence that works quietly while everything else is dormant: resourceful, perceptive, and comfortable operating without an audience. The shadow is secrecy that outlives its usefulness, and a restlessness that surfaces at exactly the hours everyone else is asleep. The Rat is the animal, and it is one layer of several rather than the reading.',
        ] },
    { key: 'chou', headline: 'Frozen earth: patient, accumulating, holding what is not ready.',
        core: [
            'Chou is late-winter earth and one of the four storage branches, containing Ji, Gui and Xin. Three hidden stems make it internally complex - there is more going on in this branch than its stillness suggests.',
            'It contributes endurance and the capacity to hold something through a period when nothing can be done with it. Working, that is patience of a genuinely rare kind; unworked, it is a stubbornness that stores grievances as carefully as it stores everything else. The Ox names it, and the storage function matters more than the animal does.',
        ] },
    { key: 'yin', headline: 'Early spring wood: initiating, courageous, not yet formed.',
        core: [
            'Yin opens the spring and is one of the four growth branches, holding Jia, Bing and Wu. Wood with fire beginning inside it - the first hard push of the year, before anything has taken shape.',
            'It contributes initiative and a willingness to go first, along with a certain unfinished quality, since what it starts is not yet built. Working, that is genuine courage; unworked, it is a series of beginnings and a temper that arrives faster than the situation warranted. The Tiger is the animal, and the growth position is the mechanism.',
        ] },
    { key: 'mao', headline: 'Peak spring wood: refined, sociable, averse to direct conflict.',
        core: [
            'Mao is pure yin wood at the height of spring, with Yi as its only hidden stem. Like Zi, its single stem makes it one of the cleanest branches in a chart and correspondingly direct in what it contributes.',
            'It brings refinement, sociability and an artistic inclination, along with a real reluctance to meet conflict head-on. Working, that is diplomacy and taste; unworked, it is avoidance dressed as gentleness, and a tendency to grow around a problem rather than address it. The Rabbit is the animal.',
        ] },
    { key: 'chen', headline: 'Late spring earth: ambitious, internally busy, holding contradictions.',
        core: [
            'Chen is a storage branch and the most changeable of the earths, holding Wu, Yi and Gui. Wood and water stored inside earth makes it internally crowded, and the tradition associates it with scale and with sudden change.',
            'It contributes ambition and a capacity to carry contradictory drives for years without resolving them. Working, that is range and staying power; unworked, it is a restlessness with no single object and a difficulty knowing which of several impulses is actually yours. The Dragon names it; the hidden stems are where the substance is.',
        ] },
    { key: 'si', headline: 'Early summer fire: strategic, outwardly warm, inwardly calculating.',
        core: [
            'Si begins the summer and is one of the four growth branches, holding Bing, Geng and Wu. Fire sitting over hidden metal is the defining structure: warmth on the surface, calculation underneath.',
            'It contributes strategy and an unusual capacity for the long approach - this branch plans further ahead than it lets on. Working, that is genuine foresight; unworked, it is a manoeuvring that other people eventually notice. The Snake is the animal, and it is among the most misread branches, because both the warmth and the calculation are real.',
        ] },
    { key: 'wu', headline: 'Peak summer fire: energetic, outgoing, impatient with being held.',
        core: [
            'Wu is the branch of noon and of the summer solstice - fire at maximum, holding Ding and Ji. This is the most outwardly energetic position on the wheel. The earth hidden beneath the fire is the only thing in it that slows anything down.',
            'It contributes drive, visibility and a strong forward motion, with very little tolerance for being kept in place. Working, that is momentum other people organise around; unworked, it is a burning through of energy and relationships alike, and an impatience that reads as dismissiveness. The Horse is the animal.',
        ] },
    { key: 'wei', headline: 'Late summer earth: gentle, retentive, warmer than it appears.',
        core: [
            'Wei is a storage branch and the warm dry earth of late summer, holding Ji, Ding and Yi. Storing both wood and fire gives it more heat and more feeling than its outward mildness suggests.',
            'It contributes gentleness and a considerable capacity to hold on - to attachments, and equally to grievances. Working, that is loyalty and emotional depth; unworked, it is a sentimentality that will not release, and a resentment kept as carefully as everything else in a storage branch. The Goat names it.',
        ] },
    { key: 'shen', headline: 'Early autumn metal: quick, inventive, easily bored.',
        core: [
            'Shen opens the autumn and is one of the four growth branches, holding Geng, Ren and Wu. Metal producing water is the key structure: mechanism generating flow. That combination is why the branch reads as clever rather than merely sharp.',
            'It contributes fast, inventive intelligence - quick to see how something works, quick to find the workaround, and correspondingly quick to lose interest once the puzzle is solved. Working, that is genuine ingenuity; unworked, it is restlessness and a trail of half-solved problems. The Monkey is the animal, and the mobility is the point.',
        ] },
    { key: 'you', headline: 'Peak autumn metal: precise, discerning, pointed in speech.',
        core: [
            'You is pure yin metal at the height of autumn, with Xin as its only hidden stem - another single-stem branch, and correspondingly clear in how it expresses. Nothing is hidden in this branch, which is both its strength and the reason it can land hard.',
            'It contributes precision, discernment and a meticulousness about form, with a sharpness in speech that lands as exacting or as cutting depending entirely on the company. Working, that is real quality control; unworked, it is fault-finding delivered with more accuracy than kindness. The Rooster is the animal.',
        ] },
    { key: 'xu', headline: 'Late autumn earth: loyal, principled, guarded.',
        core: [
            'Xu is a storage branch and the dry earth of late autumn, holding Wu, Xin and Ding. Fire and metal stored together give it both conviction and a hard edge when that conviction is challenged.',
            'It contributes loyalty and a tendency to hold a position on grounds of duty rather than advantage. Working, that is genuine principle; unworked, it is a rigidity that mistakes obstinacy for integrity, and a guardedness that keeps out more than it needs to. The Dog names it.',
        ] },
    { key: 'hai', headline: 'Early winter water: generous, appetitive, over-committed.',
        core: [
            'Hai opens the winter and is the last of the four growth branches, holding Ren and Jia. Water carrying wood - flow with something growing in it. Of the three water positions this is the one with the most life in it rather than the most depth.',
            'It contributes generosity and a genuine appetite for life, along with a tendency to take on more than the season can support. Working, that is warmth and breadth; unworked, it is over-extension and a difficulty saying no to anything that sounds interesting. The Pig is the animal.',
        ] },
];
const branches = branchEntries.map((entry) => {
    const info = BRANCH_INFO[entry.key];
    return branchUnit({
        key: entry.key,
        label: `${info.label} (${info.polarity} ${info.phase})`,
        headline: entry.headline,
        core: entry.core,
        signals: branchSignals(info.phase, [sig(info.polarity === 'yang' ? 'assertive' : 'receptive', 0.4)]),
    });
});
/* ------------------------------------------------------------------ *
 * PHASE C - THE FOUR PILLAR POSITIONS
 * ------------------------------------------------------------------ */
const positions = [
    pillarPairUnit({
        key: 'position-year',
        label: 'The Year pillar',
        headline: 'Ancestry, early environment, and the self other people meet first.',
        core: [
            'The Year pillar is traditionally read for what you came from: family line, the conditions of childhood, and the social face that forms in response to them. It describes the outermost layer of a person - the one that is visible before anybody knows you.',
            'Its stem is read for how that outward self operates and its branch for the environment it formed in. In a chart read for an adult it carries less weight than the Month or Day, and what it describes may be something outgrown rather than something current.',
        ],
        signals: [sig('social', 0.4), sig('collaborative', 0.3)],
    }),
    pillarPairUnit({
        key: 'position-month',
        label: 'The Month pillar',
        headline: 'The heaviest of the four: career, upbringing, and the season itself.',
        core: [
            'The Month pillar carries more weight than any other position except the Day. The tradition calls it the career palace and reads it for the middle of the upbringing, and - decisively - its branch sets the season that determines whether the Day Master is supported or drained.',
            'That last point is why practitioners read this pillar first after the Day Master. Everything else in the chart is modified by which season the month branch belongs to, and a reading that skips it is working without the largest single piece of information available.',
        ],
        signals: [sig('structured', 0.4), sig('practical', 0.4)],
    }),
    pillarPairUnit({
        key: 'position-day',
        label: 'The Day pillar',
        headline: 'You: the Day Master above, and close partnership below.',
        core: [
            'The Day pillar is the subject of the chart. Its stem is the Day Master, the reference point everything else is measured against, and its branch is traditionally read for the self in close relationship - the marriage palace, in the older language.',
            'The relationship between the stem and the branch directly beneath it is one of the first things a practitioner checks, because it says whether the Day Master has ground under it. A stem sitting on a branch that supports its own phase is described as rooted, and rooting is one of the three factors that decide strength.',
        ],
        signals: [sig('independent', 0.4), sig('collaborative', 0.3)],
    }),
    pillarPairUnit({
        key: 'position-hour',
        label: 'The Hour pillar',
        headline: 'Later life, private ambition, and what gets passed on.',
        core: [
            'The Hour pillar is traditionally read for the second half of life, for children, and for the private ambitions a person does not necessarily state. It is the innermost of the four positions and the one least visible to anybody else.',
            'It is also the pillar that most often cannot be calculated. Without an accurate birth time the hour is unknowable, and this project leaves it unavailable rather than guessing - which means a chart without a birth time is genuinely reading three pillars rather than four, and the element counts are drawn from six characters rather than eight.',
        ],
        signals: [sig('private', 0.5), sig('introspective', 0.4)],
    }),
];
/* ------------------------------------------------------------------ *
 * PHASE D - THE SIXTY SEXAGENARY PILLARS
 * ------------------------------------------------------------------ */
/**
 * A stem over a branch, read as a pair.
 *
 * These are deliberately compact: the stem and the branch each have a full
 * entry elsewhere, and what this layer adds is the RELATIONSHIP between them -
 * whether the branch supports the stem, drains it, controls it, or sits neutral.
 * That relationship is the thing a reader cannot work out from the two separate
 * readings, and it is what makes Jia-Zi different from Jia-Wu.
 *
 * Generated from the two cycles rather than hand-typed, because sixty
 * hand-written entries would eventually contain a mismatched pair and the
 * cycle itself is the authority. The RELATIONSHIP prose is authored per
 * combination of phases; the naming is derived.
 */
const GENERATES = {
    wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood',
};
const CONTROLS = {
    wood: 'earth', earth: 'water', water: 'fire', fire: 'metal', metal: 'wood',
};
/*
 * THE FIVE WAYS A BRANCH CAN STAND UNDER A STEM.
 *
 * Two paragraphs each, and the split is the point. `specific` names THIS stem
 * over THIS branch; `concept` explains what that relation is, in words that
 * interpolate nothing and are therefore identical wherever the relation occurs.
 *
 * A chart has four pillars and there are five relations, so two or three
 * pillars commonly share one. Welded into a single paragraph behind a
 * pillar-specific opener - which is how this was written - the explanation of
 * what rooting means survived once per pillar that had it, and SectionBuilder's
 * opening-sentence dedup had nothing to grip. Split, it keeps the first and
 * drops the rest, which is the same treatment the astrology dignities get.
 */
const PAIR_RELATION = {
    same: {
        headline: 'Stem and branch of one phase: rooted, concentrated, single-minded.',
        specific: (s, b) => `${s} sitting on ${b} puts the stem directly on its own phase, which is the strongest footing a pillar can have.`,
        concept: 'The tradition calls this rooting, and it means the qualities of the stem are not merely present but anchored - they hold under pressure rather than depending on the rest of the chart to sustain them. The corresponding narrowness is real: a pillar this concentrated has considerable force in one register and very little range outside it.',
    },
    supported: {
        headline: 'A branch that feeds the stem: resourced, and inclined to lean on it.',
        specific: (s, b) => `${b} generates the phase of ${s}, so the branch is feeding the stem from underneath.`,
        concept: 'This is a comfortable pillar - the stem has something behind it and does not have to manufacture its own support. The risk is dependence: a stem this well supplied can be slow to develop the resilience that a harder footing would have forced.',
    },
    draining: {
        headline: 'A branch the stem feeds: productive, and quietly costly.',
        specific: (s, b) => `${s} generates the phase of ${b}, which means the pillar is continuously producing rather than accumulating.`,
        concept: 'This reads as output - visible and useful - and as a slow expenditure that is easy not to notice, because producing does not feel like giving something away. A pillar like this is where a chart produces, and it is also the part that needs replenishing.',
    },
    controlling: {
        headline: 'A stem working on its branch: effortful, and it makes something.',
        specific: (s, b) => `${s} controls the phase of ${b}, so the pillar carries a working relationship rather than an easy one.`,
        concept: 'There is friction here and the friction is productive: this is the configuration of effort applied to material that resists, which is how anything gets shaped. The cost is that the effort is constant and largely invisible in the result, so it is easy to underestimate, including by the one making it.',
    },
    controlled: {
        headline: 'A branch that presses on its stem: constrained, and selective for it.',
        specific: (s, b) => `${b} controls the phase of ${s}, which puts the stem under pressure from directly beneath it.`,
        concept: 'This is the most constrained footing a pillar can have, and it does not mean anything is wrong - it means the qualities of the stem are expressed narrowly and against resistance rather than freely. What tends to emerge is a more selective and more deliberate version of the stem, developed rather than issued.',
    },
};
/**
 * The five relation explanations, exported so the library guards can allow
 * exactly these as shared prose and keep banning every other reuse.
 *
 * They are deliberately identical across every pillar that shares a relation:
 * rooting means one thing, and the reading explains it once. Sharing them is
 * the point rather than an oversight, which is why it is declared here instead
 * of being discovered by a test.
 */
export const PILLAR_RELATION_CONCEPTS = Object.values(PAIR_RELATION)
    .map((shape) => shape.concept);
function pairRelation(stemPhase, branchPhase) {
    if (stemPhase === branchPhase)
        return 'same';
    if (GENERATES[branchPhase] === stemPhase)
        return 'supported';
    if (GENERATES[stemPhase] === branchPhase)
        return 'draining';
    if (CONTROLS[stemPhase] === branchPhase)
        return 'controlling';
    return 'controlled';
}
const sixtyPillars = sexagenaryPairs().map(({ stem, branch, key }) => {
    const stemInfo = STEM_PHASE[stem];
    const branchInfo = BRANCH_INFO[branch];
    const relation = pairRelation(stemInfo.phase, branchInfo.phase);
    const shape = PAIR_RELATION[relation];
    const stemName = stemInfo.label.split(' —')[0];
    const branchName = branchInfo.label.split(' —')[0];
    /* Stem 戊 and branch 午 are both romanised "Wu", and "Wu generates the phase
       of Wu" says nothing. Where the two names collide, each says which it is. */
    const collide = stemName === branchName;
    const specific = shape.specific(collide ? `the ${stemName} stem` : stemName, collide ? `the ${branchName} branch` : branchName);
    return pillarPairUnit({
        key: `pillar-${key}`,
        label: `${stemName} ${branchName} — ${stemInfo.polarity} ${stemInfo.phase} over ${branchInfo.animal}`,
        headline: shape.headline,
        core: [
            specific.charAt(0).toUpperCase() + specific.slice(1),
            shape.concept,
            `The ${branchInfo.animal} is one layer of this branch rather than the whole of it: ${branchName} is a ${branchInfo.polarity} ${branchInfo.phase} position holding its own hidden stems, and the animal is a label on that container. Read alongside the fuller entries for ${stemName} and ${branchName}, and remember that where this pillar sits - year, month, day or hour - changes what part of a life it is describing.`,
        ],
        signals: [
            ...phaseSignals(stemInfo.phase),
            sig(stemInfo.polarity === 'yang' ? 'assertive' : 'receptive', 0.3),
        ],
    });
});
/* ------------------------------------------------------------------ *
 * PHASE F - HIDDEN STEMS
 * ------------------------------------------------------------------ */
/** The weights are a convention rather than a standard, so say which one. */
const HIDDEN = {
    kind: 'established',
    settledness: 'conventional',
    basis: 'Which stems each branch conceals is agreed across schools; the conventional percentage weights differ between them, and the set used here is named in the technical details.',
    sources: ['RESEARCH_BAZI#hidden-stems'],
};
const hiddenStems = [
    conceptUnit({
        key: 'hidden-stems',
        label: 'Hidden stems',
        headline: 'What each branch is actually made of.',
        core: [
            'Every Earthly Branch contains between one and three Heavenly Stems that do not appear on the surface of the chart. These are the hidden stems, and reading them is where BaZi stops being a table of eight characters and starts being an analysis - the visible characters are the frame, and the hidden stems carry much of the content.',
            'Four branches are pure, holding a single stem: Zi, Mao, Wu and You. Those express cleanly and are easy to read. The four storage branches - Chou, Chen, Wei and Xu - hold three each, and are correspondingly complex: a great deal is going on in them that the surface does not show. The remaining four hold two or three, with a dominant stem and one or two supporting.',
            'What this means practically is that an element showing zero in the visible count may be present in quantity underneath, and an element that looks dominant on the surface may have very little rooting below it. Any reading that works only from the visible characters is working from part of the chart.',
        ],
        signals: [sig('introspective', 0.5), sig('analytical', 0.5)],
        provenance: HIDDEN,
    }),
    conceptUnit({
        key: 'hidden-stem-primary',
        label: 'Primary hidden stem',
        headline: 'The stem the branch mostly is.',
        core: [
            'The primary hidden stem carries the bulk of a branch\'s weight and usually matches its surface phase - the primary stem of Mao is Yi, which is why Mao reads as clean yin wood. Where a branch has a primary stem and nothing else, the branch and the stem are effectively the same thing.',
            'In practice this is the hidden stem that matters most for judging whether a Day Master is rooted. A stem sitting above a branch whose primary hidden stem shares its phase has genuine ground under it, and that is one of the three factors the Ziping tradition weighs before calling a chart strong or weak.',
        ],
        signals: [sig('persistent', 0.5), sig('practical', 0.4)],
        provenance: HIDDEN,
    }),
    conceptUnit({
        key: 'hidden-stem-secondary',
        label: 'Secondary hidden stem',
        headline: 'The second thing the branch carries, at real but lesser weight.',
        core: [
            'The secondary hidden stem is present and genuinely active, at roughly a third of the branch\'s weight or less. It is what makes a branch more than its surface phase - the reason Shen is not simply metal but metal with water moving inside it.',
            'Secondary stems are where the surprising material in a chart tends to live. They supply Ten God relationships that are not visible on the surface, and a chart that reads as straightforward from its visible characters can turn out to have a second theme running underneath, carried by secondary stems.',
        ],
        signals: [sig('adaptable', 0.4), sig('conceptual', 0.4)],
        provenance: HIDDEN,
    }),
    conceptUnit({
        key: 'hidden-stem-tertiary',
        label: 'Tertiary hidden stem',
        headline: 'A residue: present, faint, and only occasionally decisive.',
        core: [
            'The tertiary hidden stem carries the smallest weight - typically a tenth or less - and appears only in the storage branches. The tradition treats it as a residue of the season the branch is closing rather than as an active force.',
            'It is worth knowing about mainly because it occasionally decides a close case. Where a chart is finely balanced between two readings, a tertiary stem can be what tips it, and where a chart appears to have no instance of some element at all, a tertiary stem can be the only place it exists. The exact weights are a convention rather than a standard: schools cite somewhat different percentages, and the set used here is named in the technical details.',
        ],
        signals: [sig('analytical', 0.4), sig('cautious', 0.3)],
        provenance: HIDDEN,
    }),
];
const tenGodEntries = [
    { key: 'friend', label: 'Friend (Bi Jian 比肩)',
        headline: 'Your own phase, your own polarity: the peer.',
        core: [
            'The Friend is your phase in your own polarity - a mirror rather than a relation. It reads as self-reliance, as comparison with peers, and as the capacity to hold your own position without needing it ratified by anybody.',
            'Prominent, the tradition reads it as real independence that can make collaboration hard: competing where cooperation would serve better, and finding shared credit unsatisfying. In moderation, it is simply the ability to stand alone when required. Neither reading is a verdict: this is a description of how the chart is weighted, not of what the person is worth.',
        ],
        signals: [sig('independent', 0.8), sig('persistent', 0.5)] },
    { key: 'rob-wealth', label: 'Rob Wealth (Jie Cai 劫財)',
        headline: 'Your phase in the other polarity: the rival who is also an ally.',
        core: [
            'Rob Wealth is your own phase in the opposite polarity - close enough to be an ally, different enough to compete. It brings drive, social force and a real capacity to act alongside others, and it takes resources while doing it.',
            'The name is unfortunate and the reading should not follow it. This is not a malign influence; it describes sharing that turns out to be uneven, and a competitiveness that can be the reason something gets done at all. Prominent, the tradition reads it as energy and resources going out through what is shared with others; secondary, it is simply the social edge that keeps a chart from being purely self-contained.',
        ],
        signals: [sig('assertive', 0.6), sig('social', 0.5), sig('risk-oriented', 0.4)] },
    { key: 'eating-god', label: 'Eating God (Shi Shen 食神)',
        headline: 'What you produce, in matching polarity: easy output.',
        core: [
            'The Eating God is the phase your Day Master generates, in the same polarity. It is unforced expression - talent, appetite, enjoyment, the work that comes out without strain - and it is one of the more comfortable configurations in the system.',
            'Prominent, it produces genuine creative fluency and a considerable capacity for enjoyment, along with a tendency toward indulgence and a lack of urgency about anything. Secondary, it is the thing that keeps a driven chart from being joyless. The tradition reads it as generosity and ease with others, and as output that arrives without being forced.',
        ],
        signals: [sig('creative', 0.7), sig('communicative', 0.5), sig('emotionally-expressive', 0.4)] },
    { key: 'hurting-officer', label: 'Hurting Officer (Shang Guan 傷官)',
        headline: 'What you produce, in the other polarity: brilliant and disobedient.',
        core: [
            'The Hurting Officer is output that will not respect the rules. It supplies sharp expression and real originality, and it pushes against authority almost reflexively - the classical name records that it damages the Officer, meaning the structure the chart is supposed to operate inside.',
            'Prominent, the tradition reads it as obvious ability paired with a difficult relationship with hierarchy: it suits work that can speak for itself better than work that must be approved. Secondary, it is simply an edge on the output, and a refusal to produce something merely competent.',
            'The tradition also associates a strong Hurting Officer with friction against authority in close relationships, and that reading is genuinely school-dependent - some practitioners weight it heavily, others regard it as a relic. It is offered as a lens rather than a prediction.',
        ],
        signals: [sig('creative', 0.8), sig('communicative', 0.7), sig('independent', 0.6)] },
    { key: 'indirect-wealth', label: 'Indirect Wealth (Pian Cai 偏財)',
        headline: 'What you control, matching polarity: opportunity rather than salary.',
        core: [
            'Indirect Wealth is the phase your Day Master controls, in the same polarity - resources arriving through movement, timing and risk rather than through routine. Enterprising, opportunistic, and generous with whatever it has.',
            'Prominent, the tradition reads it as resources that come and go through movement and timing: a lively engine and an unreliable foundation. Secondary, it is simply an eye for opportunity and a readiness to move when one appears.',
        ],
        signals: [sig('risk-oriented', 0.7), sig('novelty-seeking', 0.6), sig('social', 0.4)] },
    { key: 'direct-wealth', label: 'Direct Wealth (Zheng Cai 正財)',
        headline: 'What you control, other polarity: earned, steady return.',
        core: [
            'Direct Wealth is the steady form: value from work actually done, obligations honoured, gains accumulated in increments. It reads as diligence, practicality and a well-founded suspicion of anything that pays too well too quickly.',
            'Prominent, the tradition reads it as reliability and caution with resources: building slowly and holding what is built. The classical texts also tie it to commitments entered seriously and kept. Secondary, it is the grounding that keeps a more speculative chart steady.',
        ],
        signals: [sig('practical', 0.7), sig('structured', 0.6), sig('stability-seeking', 0.6)] },
    { key: 'seven-killings', label: 'Seven Killings (Qi Sha 七殺)',
        headline: 'What controls you, matching polarity: pressure without negotiation.',
        core: [
            'Seven Killings is the phase that controls your Day Master in the same polarity, and it applies its pressure directly. It reads as decisiveness under threat, competitive nerve, and authority taken rather than granted.',
            'The name is the most alarming in the set and the reading should not be. Read well, it is nerve under pressure: the capacity to perform when conditions are hard, and a comfort with a fight. What it costs is a tendency to organise everything around pressure, and a difficulty relaxing when the pressure that shaped the temperament is no longer present.',
            'Prominent and unmoderated, the tradition reads it as genuinely hard to live with, from inside and outside. Prominent and moderated - the tradition looks for output or resource to do the moderating - it counts it among the strongest structures a chart can hold.',
        ],
        signals: [sig('assertive', 0.8), sig('risk-oriented', 0.6), sig('persistent', 0.6)] },
    { key: 'direct-officer', label: 'Direct Officer (Zheng Guan 正官)',
        headline: 'What controls you, other polarity: legitimate authority.',
        core: [
            'The Direct Officer is control arriving as structure rather than as force: rules, office, standing, and the expectations attached to a role. It reads as responsibility, self-discipline and a genuine respect for how things are supposed to be done.',
            'Prominent, the tradition reads it as conscientiousness that can come to live inside other people\'s permissions, and a difficulty acting without sanction. Secondary, it is the sense of proportion that keeps a chart from being purely self-serving. At the extreme, it is convention held more firmly than the situation requires.',
        ],
        signals: [sig('structured', 0.8), sig('cautious', 0.5), sig('collaborative', 0.4)] },
    { key: 'indirect-resource', label: 'Indirect Resource (Pian Yin 偏印)',
        headline: 'What supports you, matching polarity: unconventional nourishment.',
        core: [
            'Indirect Resource is the phase that generates your Day Master in the same polarity - support arriving by an indirect route rather than the obvious one: specialised knowledge, solitary study, intuition, an interest followed on its own terms.',
            'Prominent, the tradition reads it as depth in a specialised field and a characteristic detachment. It is associated with research and with the esoteric, and with support that works best when it arrives on its own terms. Secondary, it is simply an independent streak in how the person learns.',
        ],
        signals: [sig('introspective', 0.7), sig('analytical', 0.6), sig('conceptual', 0.5)] },
    { key: 'direct-resource', label: 'Direct Resource (Zheng Yin 正印)',
        headline: 'What supports you, other polarity: ordinary nourishment.',
        core: [
            'Direct Resource is straightforward support: teaching, care, and the kind of backing that lets a person take a risk. It reads as a capacity to learn, moral seriousness and respect for what has been taught.',
            'Prominent, the tradition reads it as a real capacity for study and a tendency to stay a student longer than necessary. Secondary, it is the backing that makes ambition sustainable. The classical texts associate it with the mother and with formal learning - traditional associations, not statements about anyone\'s family.',
        ],
        signals: [sig('analytical', 0.6), sig('stability-seeking', 0.6), sig('receptive', 0.5)] },
];
const tenGods = tenGodEntries.map((entry) => tenGodUnit({
    key: entry.key, label: entry.label, headline: entry.headline,
    core: entry.core, signals: entry.signals,
}));
/* ------------------------------------------------------------------ *
 * PHASE H - FIVE ELEMENT BALANCE
 * ------------------------------------------------------------------ */
const PHASE_CHARACTER = {
    wood: {
        misread: 'A surplus of wood is the one most often mistaken for drive. The two are not the same: drive finishes things and a wood surplus starts them, and a chart in this condition can be busy for a decade without much of it converging. Check the count against the season before concluding anything, because wood born into its own spring reads very differently from wood piled up in an autumn that is cutting it back.',
        name: 'Wood',
        more: 'growth, planning and the impulse to expand. A chart carrying a lot of it tends toward ambition, benevolence and a certain impatience with anything static - and, at the extreme, toward rigidity dressed as principle and more plans than any one life can carry.',
        less: 'A chart with little wood does not lack ambition. It means the forward push is not simply running in the background, and direction has to be chosen deliberately rather than felt. Structures that supply momentum work better here than waiting to feel like starting.',
    },
    fire: {
        misread: 'A surplus of fire is the one most often mistaken for confidence. What it describes is output that must be witnessed to feel real, which is a different thing and considerably more expensive to maintain. The season matters more here than for any other phase: fire heavy in a summer chart is genuinely at maximum, while fire heavy in a winter chart is working against the conditions and burning through itself to do it.',
        name: 'Fire',
        more: 'expression, warmth and visibility. A chart with a great deal of it is expressive, socially warm and able to make things matter to other people - and, unbalanced, burns its own fuel faster than it replaces it and produces brilliance that does not last the year.',
        less: 'Little fire does not mean coldness. It means the outward projection is not automatic: this chart knows what it thinks and has to decide to make anyone care. Recognition matters more here than the person usually admits, precisely because it does not generate its own.',
    },
    earth: {
        misread: 'A surplus of earth is the one most often mistaken for reliability. Reliability is a choice made repeatedly; an earth surplus is a chart that finds not-moving easier than moving, and the difference only becomes visible when something genuinely needs to change. Read it against the hidden stems in particular, because earth showing heavily on the surface with little rooting underneath behaves nothing like earth that goes all the way down.',
        name: 'Earth',
        more: 'stability, mediation and the patient absorption of everything the other phases produce. Heavily represented, it is dependable to the point of immovability, and prone to a worry that circles the same ground without resolving.',
        less: 'Little earth does not mean instability. It means the settling function has to be supplied from outside - routine, a reliable place, people who do not move - because it is not generated internally. Chart owners here often build structure deliberately and are surprised how much it helps.',
    },
    metal: {
        misread: 'A surplus of metal is the one most often mistaken for competence. The precision is real and the question is what it is being applied to: a chart in this condition will hold an exacting standard against something that never needed one, and experience the resulting friction as other people\'s carelessness. The seasonal layer is the useful check, since metal in its own autumn is at full strength while metal in a summer chart is being reshaped whether it wants to be or not.',
        name: 'Metal',
        more: 'refinement by removal: precision, righteousness and the willingness to make a clean separation. A great deal of it produces exacting standards and, at the extreme, a severity that cuts into living tissue.',
        less: 'Little metal does not mean imprecision. It means finishing, discarding and saying the necessary hard sentence are deliberate acts rather than reflexes. Deadlines and external editors are disproportionately useful in this configuration.',
    },
    water: {
        misread: 'A surplus of water is the one most often mistaken for depth. Depth is water that has somewhere to sit; a surplus without banks is dispersal, and it produces a chart that has thought about everything and settled on nothing. Look at whether there is any earth in the chart at all before reading this as wisdom, because the two configurations look identical from outside and behave completely differently.',
        name: 'Water',
        more: 'depth, flow and intelligence that finds the gap. Heavily represented, it produces wisdom, adaptability and natural secrecy - and, unbalanced, disperses into too many directions with nothing held.',
        less: 'Little water does not mean shallowness. It means reflection does not happen on its own: this chart moves fast and learns more slowly than it could, and deliberately built pauses are worth more here than anywhere else.',
    },
};
const elementStates = [];
for (const [phase, character] of Object.entries(PHASE_CHARACTER)) {
    elementStates.push(phaseUnit({
        key: `${phase}-abundant`,
        label: `${character.name} — strongly represented`,
        headline: `${character.name} carries a large share of this chart.`,
        core: [
            `${character.name} is the phase of ${character.more}`,
            character.misread,
        ],
        signals: phaseSignals(phase),
    }));
    elementStates.push(phaseUnit({
        key: `${phase}-scarce`,
        label: `${character.name} — little or none`,
        headline: `${character.name} barely appears in the visible count.`,
        core: [
            character.less,
            `A zero in the tally is the single most misread figure in a BaZi chart. It does not mean a deficiency in the person, and it frequently does not even mean the element is absent: ${character.name} may be sitting in a branch as a hidden stem and not appear in the surface count at all. The tradition treats an absent phase as a quality the chart does not generate on its own rather than as one the person lacks.`,
        ],
        signals: [sig('adaptable', 0.4)],
    }));
}
elementStates.push(phaseUnit({
    key: 'balance-layers',
    label: 'Why the element layers disagree',
    headline: 'Four different counts, measuring four different things.',
    core: [
        'A BaZi chart produces more than one element count, and they are not versions of the same number. The RAW COUNT tallies the visible characters - eight, or six when the hour is unknown. The HIDDEN STEM count adds what is inside each branch, weighted by convention. The SEASONAL WEIGHTING asks which phase the month branch belongs to, which the Ziping tradition treats as more important than any tally. And the MODEL-DERIVED SUPPORT figure asks a different question again: not how much of each phase is present, but whether the Day Master specifically is being helped or drained.',
        'They disagree routinely, and the disagreement is information rather than error. A chart can be Metal-heavy on the surface, poorly rooted underneath, born in a season that drains it, and still read as a supported Day Master. Any single number presented as the answer would be hiding three others.',
    ],
    signals: [sig('analytical', 0.6), sig('conceptual', 0.4)],
}));
/* ------------------------------------------------------------------ *
 * PHASE I - YIN / YANG BALANCE
 * ------------------------------------------------------------------ */
const polarity = [
    polarityUnit({
        key: 'polarity-balanced',
        label: 'Yin and Yang in balance',
        headline: 'Both registers available, neither dominant.',
        core: [
            'The chart carries roughly equal yin and yang. In practice that describes access to both modes: able to push and to wait, to act on a situation and to let it develop, without either being the automatic response.',
            'The advantage is range. The corresponding difficulty is that a chart with no dominant polarity has no default, so situations requiring an immediate instinct can produce a pause where a more one-sided chart would simply have moved. That pause is usually judgement rather than indecision, though it is regularly mistaken for the latter.',
        ],
        signals: [sig('adaptable', 0.5)],
    }),
    polarityUnit({
        key: 'polarity-yang',
        label: 'Yang-weighted',
        headline: 'A chart that acts on conditions rather than adapting to them.',
        core: [
            'The chart leans yang. That describes a forward orientation - initiating rather than responding, moving on a situation rather than letting it declare itself, and generally operating outward. It is not the same as extraversion, which is about where energy is recovered rather than where it is directed.',
            'The pace is faster than average and the pause is shorter. What this configuration does well is anything requiring someone to move first; what it does badly is the situation that needed waiting out. Overexpressed, it becomes force applied to things that would have resolved on their own, and a difficulty tolerating a process that cannot be accelerated.',
        ],
        signals: [sig('assertive', 0.7), sig('outwardly-engaged', 0.5), sig('risk-oriented', 0.4)],
    }),
    polarityUnit({
        key: 'polarity-yin',
        label: 'Yin-weighted',
        headline: 'A chart that works by receiving, absorbing and persisting.',
        core: [
            'The chart leans yin. That describes a receptive orientation - taking in before acting, yielding where yielding is cheaper than resisting, and working through persistence rather than force. It is not the same as introversion, and a yin-weighted chart can be entirely sociable.',
            'The pace is slower and the endurance is higher. This configuration outlasts things, notices what a faster chart missed, and gets where it is going indirectly. Overexpressed, it becomes passivity - a long wait for conditions that were never going to arrive - and a difficulty stating a position when stating one is what the situation required.',
        ],
        signals: [sig('receptive', 0.7), sig('introspective', 0.5), sig('adaptable', 0.5)],
    }),
];
/* ------------------------------------------------------------------ *
 * PHASE J - BRANCH AND STEM RELATIONSHIPS
 * ------------------------------------------------------------------ */
const relations = [
    relationUnit({
        key: 'stem-combination',
        label: 'Stem combination (合)',
        headline: 'Two stems that bind, and stop acting separately.',
        core: [
            'Two Heavenly Stems five positions apart form a combination. The tradition reads this as a binding: the two stems attach to each other and, under the right conditions, the pair transforms into a new phase entirely.',
            'The practical reading is that a combined stem is preoccupied. It is engaged with its partner rather than doing its own work in the chart, which is a benefit where that stem was causing trouble and a loss where it was doing something useful. Whether transformation actually occurs is heavily condition-dependent and this project does not assert it - structural presence is detected, activation is not claimed.',
        ],
        signals: [sig('collaborative', 0.5)],
    }),
    relationUnit({
        key: 'stem-clash',
        label: 'Stem clash (沖)',
        headline: 'Two stems in direct opposition at the surface of the chart.',
        core: [
            'Stems seven positions apart clash - opposing phases in the same polarity, meeting where the chart is most visible. Because stems sit on the surface, a clash between them tends to show in behaviour and in stated position rather than in circumstance.',
            'Read as tension rather than as damage. Two functions pulling against each other produce visible inconsistency and, worked with, a genuine capacity to hold opposing considerations. Whether it reads as conflict or as range depends largely on whether the rest of the chart gives the two stems anywhere to go.',
        ],
        signals: [sig('persistent', 0.4), sig('assertive', 0.4)],
    }),
    relationUnit({
        key: 'branch-six-clash',
        label: 'Six Clash (六沖)',
        headline: 'Two branches directly opposite: movement, forced.',
        core: [
            'A Six Clash pairs branches six positions apart, opposing season against season and direction against direction. It is the strongest of the branch interactions and the one most likely to show as actual events - relocation, separation, a decision taken because the situation would not hold.',
            'Whether a clash is destructive or releasing depends entirely on whether the branches involved were helping the chart or harming it, which means a clash on its own tells you very little. It is also positional: a clash between the Year and Month branches describes something different from one between the Day and Hour, because those positions govern different parts of a life. The reading has to name which pillars are involved before it means anything.',
        ],
        signals: [sig('novelty-seeking', 0.5), sig('adaptable', 0.4)],
    }),
    relationUnit({
        key: 'branch-six-harmony',
        label: 'Six Harmony (六合)',
        headline: 'Two branches that bind into a settled pair.',
        core: [
            'A Six Harmony binds two branches together and, in the right conditions, the pair transforms into a new phase. It reads as consolidation, cooperation and attachment - the two positions involved stop operating independently and start operating as one.',
            'The cost is inertia. Combined branches are engaged with each other, which is a benefit when they were causing damage and a loss when they were doing useful work. As with the stem combination, this project detects the structure and does not assert that transformation occurred, because whether it does is school- and context-dependent.',
        ],
        signals: [sig('collaborative', 0.6), sig('stability-seeking', 0.4)],
    }),
    relationUnit({
        key: 'branch-three-harmony',
        label: 'Three Harmony (三合)',
        headline: 'Three branches forming a complete elemental frame.',
        core: [
            'A San He or Three Harmony is formed by three branches spaced four positions apart, which together produce a strong current of a single phase. It is the most powerful constructive combination in the branch system, and a complete one substantially reshapes the chart\'s element balance.',
            'A PARTIAL Three Harmony - two of the three present - is read considerably more cautiously. The tradition treats it as a latent structure rather than an active one: the frame exists and is waiting for the missing branch, which may arrive through a Luck Pillar or an annual cycle. The missing branch is named rather than the partial being treated as complete.',
        ],
        signals: [sig('collaborative', 0.5), sig('persistent', 0.5)],
    }),
    relationUnit({
        key: 'branch-six-harm',
        label: 'Six Harm (六害)',
        headline: 'Quiet damage inside an apparent alliance.',
        core: [
            'A Harm relation describes injury arriving through closeness rather than through opposition - the classical reading is of betrayal by an associate, or of a cooperation that quietly costs more than it returns. It is subtler than a clash and correspondingly harder to notice.',
            'The weight this carries is genuinely disputed. Some practitioners treat Harm as significant in its own right; others regard it as a weak derivative of the clash and read it only when a clash or punishment already points the same way. Harms are recorded here and not weighted heavily, and any reading built on one should say so.',
        ],
        signals: [sig('cautious', 0.4)],
        provenance: BAZI_CONTESTED('Some practitioners treat the Six Harms as a significant independent factor; others regard them as a weak derivative of the Six Clashes and read them only in support of something else. There is no settled position.'),
    }),
    relationUnit({
        key: 'branch-three-punishment',
        label: 'Three Punishment (三刑)',
        headline: 'Three branches producing attrition rather than open conflict.',
        core: [
            'A Three Punishment groups branches whose interaction produces friction of a grinding kind rather than a clean collision - the tradition names them for ingratitude and for bullying, and reads them as recurring difficulty generated from inside the chart rather than imposed on it. Unlike a clash, nothing here collides; the pattern simply keeps reproducing.',
            'This is among the most disputed structures in BaZi. The groupings do not derive cleanly from the generating and controlling cycles the way clashes and harmonies do, and several respected modern practitioners downweight them heavily or discard them entirely. Presented here because the engine detects them, and flagged because presenting them at the same confidence as a clash would misrepresent the state of the field.',
        ],
        signals: [sig('persistent', 0.4)],
        provenance: BAZI_CONTESTED('The punishment groupings do not derive from the generating and controlling cycles, and several respected modern practitioners either downweight them heavily or discard them. Any reading that uses them should state that it has.'),
    }),
    relationUnit({
        key: 'branch-mutual-punishment',
        label: 'Mutual Punishment (相刑)',
        headline: 'Two branches in a grinding relationship.',
        core: [
            'A Mutual Punishment is the two-branch form: a pair whose interaction produces persistent low-grade friction rather than a decisive break. The classical reading is of a relationship or situation that keeps producing the same difficulty without ever resolving into anything.',
            'It carries the same methodological caution as the three-branch form. The structure is detected reliably; how much it should count is a matter on which practitioners genuinely differ, and this project does not pretend otherwise.',
        ],
        signals: [sig('cautious', 0.4)],
        provenance: BAZI_CONTESTED('As with the Three Punishments, the mutual form is disputed in weight rather than in structure. Some schools read it seriously; others do not use it at all.'),
    }),
    relationUnit({
        key: 'branch-self-punishment',
        label: 'Self Punishment (自刑)',
        headline: 'A branch repeated: the difficulty is internally generated.',
        core: [
            'A Self Punishment occurs where the same branch appears twice in a chart, in one of the four positions the tradition identifies. The reading is that the difficulty is self-generated: a pattern the person keeps reproducing rather than one arriving from outside.',
            'Of all the punishment structures this is the one with the most intuitive logic - a doubled quality intensifying until it works against itself - and it carries the same disputed status as the others. Read as a question worth asking rather than as a finding.',
        ],
        signals: [sig('introspective', 0.4)],
        provenance: BAZI_CONTESTED('Part of the punishment system, which is the most contested structure in BaZi. Some practitioners find the self-punishment reading the most defensible of the group; others discard the whole category.'),
    }),
];
/* ------------------------------------------------------------------ *
 * PHASE K, L, M - STRENGTH, LUCK PILLARS, TCM
 * ------------------------------------------------------------------ */
const concepts = [
    conceptUnit({
        key: 'day-master-strength',
        label: 'Day Master strength',
        headline: 'A heuristic about support and drain, not a verdict.',
        core: [
            'Two counts, read against each other. Support is what feeds the Day Master - its own phase appearing elsewhere, and the phase that generates it. Drain is what draws on it: what it produces, what it controls, and what controls it. The difference between the two is the tendency, and how firmly it can be stated is reported alongside it.',
            'Three things decide it in the Ziping tradition, in this order. The COMMANDING MONTH carries the greatest weight, because a Day Master born in the season of its own phase is supported in a way nothing else can substitute for. ROOTING comes second: whether the Day Master\'s phase appears among the hidden stems of the branches, which is why the hidden layer matters so much. MOMENTUM is third - the overall distribution across all eight characters.',
            'What this is not is a Useful God determination. Identifying the Yong Shen - the single phase that best corrects a chart\'s particular imbalance - is a skill-dependent judgement on which competent practitioners often disagree. A support-versus-drain score is a useful heuristic and a considerably smaller claim, and this project deliberately stops at the smaller one.',
        ],
        signals: [sig('analytical', 0.6), sig('cautious', 0.4)],
        provenance: BAZI_ZIPING,
    }),
    conceptUnit({
        key: 'luck-pillars',
        label: 'Luck Pillars (Da Yun 大運)',
        headline: 'Ten-year changes of climate around a chart that does not change.',
        core: [
            'The natal chart is fixed. What changes is the environment it operates in, and the Luck Pillars describe that: a sequence of ten-year periods, each a stem over a branch, adding phases to the picture and altering which parts of the chart are supported and which are under pressure.',
            'This is how the tradition explains a chart that seems to work differently from one decade to the next with nothing about the person having altered - the surrounding phases did. Read this way a Luck Pillar describes conditions and says what a period favours. It does not forecast events, and a reading that treats it as prediction has overstepped what the method supports.',
            'The starting age is not arbitrary: it is calculated from the distance between the birth moment and the adjacent solar term, which is why two people born days apart can enter their sequences years apart. Each pillar is read against the natal chart - whether it supplies what the Day Master lacks, or more of what it already has too much of.',
        ],
        signals: [sig('conceptual', 0.5), sig('adaptable', 0.4)],
    }),
    conceptUnit({
        key: 'luck-pillar-direction',
        label: 'Luck Pillar direction',
        headline: 'Why both sequences are shown rather than one.',
        core: [
            'The direction a Luck Pillar sequence runs - forward or reverse through the sixty-term cycle - is set by the polarity of the Year Stem together with the body. A Yang year stem with a male body and a Yin year stem with a female body run forward; the two mixed cases run reverse.',
            /* One statement, the same in Go deeper, in the technical details and in
               Slovak: the natal chart never chooses; the Forecast applies the rule. */
            'This chart lists both sequences and does not choose between them. The Forecast applies the rule, using the body selected at onboarding. Where the body was deliberately left undefined, the rule has no answer - it takes a binary and no school extends it - so no direction is chosen anywhere, and the ten-year cycle is left out of the Forecast rather than guessed at. A framework built on an assumption is worse than one that says where it stops.',
        ],
        signals: [sig('cautious', 0.5), sig('analytical', 0.4)],
    }),
    conceptUnit({
        key: 'tcm-correspondence',
        label: 'TCM symbolic correspondence',
        headline: 'A separate symbolic layer, and explicitly not a health reading.',
        core: [
            'Chinese medical theory maps the five phases onto organ systems, seasons, flavours, emotions and directions - wood to liver and spring, fire to heart and summer, earth to spleen and late summer, metal to lung and autumn, water to kidney and winter. It is an old and internally coherent correspondence system, and a BaZi chart can be read through it.',
            'What that produces is a symbolic constitutional theme: a description of where a chart concentrates and where it is thin, expressed in the vocabulary of a traditional medical model. It is offered here as cultural and symbolic material because it is part of how this system has been read for centuries, and because leaving it out would misrepresent the tradition.',
            'It is not a health assessment. Nothing here diagnoses a condition, nothing predicts one, and an element count says nothing whatsoever about anybody\'s body. Anyone with a health concern should consult a clinician; this layer has no bearing on that and should not be allowed to influence it.',
        ],
        signals: [sig('conceptual', 0.4)],
        provenance: BAZI_TCM,
    }),
];
export const BAZI_STRUCTURE_LIBRARY = [
    ...branches, ...positions, ...sixtyPillars, ...hiddenStems,
    ...tenGods, ...elementStates, ...polarity, ...relations, ...concepts,
];
/* Every branch must be written. */
const writtenBranches = new Set(branchEntries.map((entry) => entry.key));
const missingBranches = ALL_BRANCHES.filter((branch) => !writtenBranches.has(branch));
if (missingBranches.length > 0) {
    throw new Error(`Earthly branches with no reading: ${missingBranches.join(', ')}`);
}
