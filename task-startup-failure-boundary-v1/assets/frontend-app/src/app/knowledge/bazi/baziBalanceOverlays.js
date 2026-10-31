import { sig } from '../semanticDimensions.js?v=2ea79e9';
/**
 * WHAT THE REST OF THE CHART DOES TO THE DAY MASTER.
 *
 * The Ziping tradition weighs three things: the commanding month, rooting, and
 * MOMENTUM - the overall distribution of phases across all eight characters.
 * The season is handled elsewhere, as fifty separate readings. This file is the
 * third factor: whether the chart as a whole is saturated with the Day Master's
 * own phase or short of it.
 *
 * WHY THESE ARE WRITTEN PER PHASE RATHER THAN PER STEM
 *
 * The question here is about the phase distribution, not about the stem. A Jia
 * and a Yi in an equally wood-heavy chart are facing the same surplus, and the
 * difference in how they carry it is already written into their own entries.
 * Ten hand-written variants would restate the stem readings with a balance
 * label attached, which is padding rather than content.
 *
 * PRIORITY 20 throughout, so momentum is always weighed AFTER the commanding
 * month rather than instead of it. That ordering is the doctrine and it matters:
 * a surplus reading laid over an unsupported season says something different
 * from the same surplus in a supported one.
 */
const MOMENTUM = {
    kind: 'tradition-specific',
    settledness: 'conventional',
    basis: 'Momentum - the overall phase distribution across the chart - is the third of the Ziping hinges, weighed after the commanding month and after rooting.',
    traditions: ['Ziping (子平) / Four Pillars'],
    sources: ['RESEARCH_BAZI#strength', 'RESEARCH_BAZI#balance'],
};
/** The controlling phase, which is what the tradition reaches for in a surplus. */
const OPENS = {
    wood: 'metal', fire: 'water', earth: 'wood', metal: 'fire', water: 'earth',
};
const TEXT = {
    wood: {
        excess: [
            'The wider distribution pushes this further in its own direction. There is a great deal of wood in this chart, and a phase in surplus does not become more of a virtue - it becomes the thing that has to be worked against. Wood in surplus is growth with no editor: more directions started than any one life can carry, and a genuine belief that all of them are still live.',
            'Day to day that looks like a person with too many plans and a real reluctance to abandon any of them, because abandoning one feels like a failure of nerve rather than a decision. It also tends to show as principle held past the point where it is serving anything. The counterweight the tradition names is metal, which prunes - meaning, in practice, an external deadline, an editor, or somebody entitled to say that one of these is finished and the rest are not happening.',
        ],
        deficient: [
            'The wider distribution runs the other way. There is little wood in this chart beyond the Day Master itself, which means the stem is doing its growing without much behind it. In practice this reads as direction that has to be chosen deliberately rather than felt: the forward push is not simply running in the background the way it is for a chart with wood to spare.',
            'That is a statement about what the effort costs rather than about capacity, and the two get confused regularly, generally by the person paying. Charts in this condition do well with external structure that supplies momentum - a commitment already made, a person expecting something on a date - and badly with open-ended situations where the only source of forward motion is the appetite for it.',
        ],
    },
    fire: {
        excess: [
            'The wider distribution amplifies this. There is a great deal of fire in this chart, and fire in surplus burns its own fuel faster than anything replaces it. What that produces is real brilliance with a short duration: intensity that convinces everybody in the room and cannot be sustained past the season it was generated in.',
            'It also tends to show as a life organised around being seen, where the visibility has quietly become the point rather than the by-product. The counterweight the tradition names is water, which cools and deepens - meaning, in practice, privacy, reflection, and periods where nothing is being performed for anybody.',
        ],
        deficient: [
            'The wider distribution runs the other way. There is little fire in this chart, which means the outward projection is not automatic. This Day Master knows what it thinks and has to decide, each time, to make anyone else care - and the deciding is effortful in a way that people with fire to spare find difficult to credit.',
            'The practical consequence is that recognition matters here more than the person usually admits, precisely because the chart does not generate its own. Arranging for work to be seen by someone whose opinion counts is not vanity in this configuration; it is the supply line.',
        ],
    },
    earth: {
        excess: [
            'The wider distribution pushes this in the direction of weight. There is a great deal of earth in this chart, and earth in surplus is mass without movement: positions held past their usefulness, worry that circles the same ground without resolving, commitments retained long after they stopped being alive.',
            'What that looks like day to day is a strong preference for the arrangement that already exists, a slowness to act that presents itself as prudence, and a habit of taking on other people\'s problems as a way of not addressing your own. The counterweight the tradition names is wood, which breaks compacted ground open - meaning something that applies pressure from outside and will not be absorbed.',
        ],
        deficient: [
            'The wider distribution runs the other way. There is not much earth here beyond the Day Master itself, which means the stem is doing its holding without much behind it. In practice this reads as capability that runs close to its limit: you can carry what is asked of you, and there is not a great deal spare when something unexpected arrives.',
            'The consequence is about pacing rather than about capacity. A chart in this condition does its best work in conditions it can rely on - steady arrangements, familiar ground, people who return something - and does badly in environments that demand continuous adaptation. That is worth knowing, because a temperament this accommodating will usually agree to the demanding environment first and notice the cost afterwards.',
        ],
    },
    metal: {
        excess: [
            'The wider distribution sharpens this considerably. There is a great deal of metal in this chart, and metal in surplus cuts into living tissue: standards applied where they were not asked for, separations made cleanly that did not need making at all, and a severity that the person carrying it experiences simply as accuracy.',
            'It tends to show most in relationships, where the judgement arrives faster than the tolerance and is usually correct, which is what makes it hard to argue with. The counterweight the tradition names is fire, which softens metal enough to work it - meaning warmth, and situations where being generous matters more than being right.',
        ],
        deficient: [
            'The wider distribution runs the other way. There is little metal in this chart, which means finishing, discarding and saying the necessary hard sentence are deliberate acts rather than reflexes. Things get started and stay open; the difficult conversation gets postponed on grounds that are sincere each time.',
            'The practical intervention here is unusually effective and unusually unglamorous: external deadlines, an editor, somebody entitled to call a thing done. Charts short of metal tend to underestimate how much of the strain they are carrying comes from a list of unfinished items rather than from the work itself.',
        ],
    },
    water: {
        excess: [
            'The wider distribution disperses this. There is a great deal of water in this chart, and water in surplus goes in too many directions at once with nothing held: depth without banks, movement without a channel, and considerable intelligence spent on options rather than on any one of them.',
            'It also shows as a natural secrecy grown past its usefulness - information withheld out of habit rather than for any reason the person could state. The counterweight the tradition names is earth, which gives water somewhere to sit - meaning routine, commitment, and structures that will not move when the mood does.',
        ],
        deficient: [
            'The wider distribution runs the other way. There is little water in this chart, which means reflection does not happen on its own. This configuration moves faster than it learns, and the gap does not announce itself: everything feels productive, and the same category of mistake keeps arriving in new clothes.',
            'Deliberately built pauses are worth more in this chart than almost any other intervention - a review that is scheduled rather than felt to be needed, a habit of writing down what happened before deciding what it meant. It is a small discipline with a disproportionate return here.',
        ],
    },
};
/**
 * Momentum overlays for one phase, attached to both of its Day Masters.
 */
export function balanceOverlays(phase) {
    const text = TEXT[phase];
    if (!text)
        throw new Error(`No balance text for phase: ${phase}`);
    const opener = OPENS[phase];
    return [
        {
            id: `bazi.day-master.${phase}.excess`,
            condition: `The chart is saturated with ${phase}, the Day Master's own phase.`,
            applies: (context) => context.state === 'excess',
            priority: 20,
            effect: 'weave-after-core',
            prose: text.excess,
            semantics: [sig('persistent', 0.3), sig('structured', 0.3)],
            provenance: {
                ...MOMENTUM,
                basis: `${MOMENTUM.basis} A surplus of the Day Master's own phase is corrected by ${opener} in standard Ziping balance reasoning.`,
            },
        },
        {
            id: `bazi.day-master.${phase}.deficient`,
            condition: `The chart carries little ${phase} overall, leaving the Day Master unsupported.`,
            applies: (context) => context.state === 'deficient',
            priority: 20,
            effect: 'weave-after-core',
            prose: [
                ...text.deficient,
                'None of this is a limit on what you can do. It is a statement about what the doing costs, and the two are frequently confused, generally by the person paying. A chart read this way is not being told to attempt less; it is being told to be considerably more deliberate about where the reserves go, and to treat the question of who replenishes them as a real question rather than an indulgent one.',
            ],
            semantics: [sig('cautious', 0.3), sig('adaptable', 0.3)],
            provenance: MOMENTUM,
        },
    ];
}
