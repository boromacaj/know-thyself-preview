import { entry } from './types.js';
/*
 * THE FIVE ELEMENTS (Wu Xing, the Five Phases) AND THE TWO POLARITIES.
 *
 * "Element" is the usual English word and a slightly misleading one: Wu Xing means five ways of moving, five phases that a process passes through,
 * and the names are images for them. Each entry therefore describes a MOVEMENT first (what the phase does), then the image, then what it looks
 * like in a person or a situation when it is balanced and when it is not, and then its place among the other four. The entries never present
 * an element as a type of person.
 */
export const ELEMENT_ENTRIES = [
    entry({
        id: 'element:wood', kind: 'element', title: 'Wood', subtitle: 'Wu Xing phase one: spring, growth and direction',
        lead: 'Wood is the phase of beginning and of growth. It is the green shoot pushing through hard ground: movement that goes outward and upward, with a clear sense of which way is up.',
        sections: [
            ['The movement', 'Wood expands. It takes a stored potential (a seed) and gives it a direction, so it is associated with spring, with the east where the sun rises, with the colour green and with the first stirring of any project. What distinguishes Wood from Fire, the next phase, is that Wood is still growing: it is structure being built, not energy being spent.'],
            ['The image', 'A tree. The tradition looks at how a tree grows: roots that find water, a trunk that will not bend easily, branches that spread towards light. So Wood is associated with planning, with vision, with a sense of purpose and with the vitality that makes an idea turn into something real.'],
            ['When it is in balance', 'Wood in balance looks like steady growth, clear direction and a flexibility that holds a goal without becoming rigid. People often describe it as the capacity to start, to decide and to keep developing.'],
            ['When it is out of balance', 'Too little Wood is read as a lack of direction, a difficulty starting or a feeling of being stuck. Too much is read as rigidity, impatience or frustration at obstacles: growth that does not know when to stop.'],
            ['Its place among the five', 'Wood feeds Fire, the way timber feeds a flame. Wood is fed by Water, since a plant needs it. Wood controls Earth, as roots grip soil, and it is held in check by Metal, the axe that prunes. In a BaZi chart two stems are Wood: Jia, the standing tree, and Yi, the vine.'],
        ],
        related: ['concept:five-phases', 'cycle:generating', 'cycle:controlling', 'daymaster:jia', 'daymaster:yi', 'concept:element-counts', 'library:elements'],
        boundary: 'An element is a phase of movement, not a type of person. How much of it appears in a chart is one piece of evidence among several.',
    }),
    entry({
        id: 'element:fire', kind: 'element', title: 'Fire', subtitle: 'Wu Xing phase two: summer, expression and warmth',
        lead: 'Fire is the phase of expression. Where Wood builds, Fire gives out: it rises, spreads, lights up and makes visible.',
        sections: [
            ['The movement', 'Fire ascends and radiates. It is associated with summer, the south, the colour red and the high point of the day. It is the phase of energy at its most active: warmth, enthusiasm, speech, and the instinct to connect.'],
            ['The image', 'A flame, the sun, a lamp. Fire has two faces that the tradition keeps carefully apart: the sun (Bing, large and generous) and a candle or lamp (Ding, small, focused and precise). Both give light, in very different ways.'],
            ['When it is in balance', 'Warmth, clarity, joy, a natural openness and the willingness to be seen. People often connect Fire with charisma, with generosity of attention and with the ability to make others feel welcome.'],
            ['When it is out of balance', 'Too little can be read as coldness, a lack of enthusiasm or a difficulty expressing feeling. Too much is read as restlessness, haste, scattered effort or burning out: warmth that overheats.'],
            ['Its place among the five', 'Fire is fed by Wood and itself feeds Earth, as ash becomes soil. It controls Metal by melting it, and it is itself controlled by Water. In the stems, Bing is Yang Fire and Ding is Yin Fire.'],
        ],
        related: ['concept:five-phases', 'cycle:generating', 'cycle:controlling', 'daymaster:bing', 'daymaster:ding', 'concept:element-counts', 'library:elements'],
        boundary: 'An element is a phase of movement, not a type of person. How much of it appears in a chart is one piece of evidence among several.',
    }),
    entry({
        id: 'element:earth', kind: 'element', title: 'Earth', subtitle: 'Wu Xing phase three: the centre, stability and nourishment',
        lead: 'Earth is the phase of the centre. It holds, nourishes and consolidates: the ground on which the other four phases happen.',
        sections: [
            ['The movement', 'Earth settles. If Wood goes up and out and Water goes down and in, Earth is the pivot between them, the movement that gathers things together and gives them somewhere to stand. It is associated with the centre, with the transitions at the end of each season and with the colour yellow.'],
            ['The image', 'Soil and mountain. The tradition distinguishes the great mass of the mountain (Wu: stable, high, a wall and a landmark) from cultivated ground (Ji: fertile, yielding, the soil that feeds a garden). Both are Earth, with opposite temperaments.'],
            ['When it is in balance', 'Stability, reliability, a nurturing nature, a feeling of being grounded and a capacity to take responsibility for others. Earth is the phase of caring practically, of holding the household together.'],
            ['When it is out of balance', 'Too little can be read as a lack of grounding or a difficulty settling. Too much is read as heaviness, worry, stubbornness or over-responsibility: caring that becomes carrying.'],
            ['Its place among the five', 'Earth is fed by Fire and feeds Metal, since ore comes from the ground. It controls Water, like a bank that guides a river, and it is controlled by Wood. In the stems, Wu is Yang Earth and Ji is Yin Earth. Four of the twelve branches (Chou, Chen, Wei and Xu) are Earth, one for the turn of each season.'],
        ],
        related: ['concept:five-phases', 'cycle:generating', 'cycle:controlling', 'daymaster:wu', 'daymaster:ji', 'concept:element-counts', 'library:elements'],
        boundary: 'An element is a phase of movement, not a type of person. How much of it appears in a chart is one piece of evidence among several.',
    }),
    entry({
        id: 'element:metal', kind: 'element', title: 'Metal', subtitle: 'Wu Xing phase four: autumn, structure and refinement',
        lead: 'Metal is the phase of refinement. It condenses, defines, cuts away what is not needed and gives things an edge.',
        sections: [
            ['The movement', 'Metal contracts. It is associated with autumn, with the west, with white and with the gathering-in of the harvest: the movement of drawing back to what is essential. It is also the phase of boundaries, of the line that separates one thing from another.'],
            ['The image', 'Ore, a blade, a coin or a bell. Two images are kept apart in the tradition: unrefined metal like an axe or a sword (Geng, strong and direct) and finished metal like jewellery or a fine blade (Xin, delicate, valued and polished).'],
            ['When it is in balance', 'Clarity, discernment, integrity, an eye for quality and the ability to set limits cleanly. People often connect Metal with organisation, with high standards and with the ability to let go of what is finished.'],
            ['When it is out of balance', 'Too little can be read as difficulty with boundaries or with deciding what to keep and what to drop. Too much is read as rigidity, severity, criticism or a sense of loss that is held on to.'],
            ['Its place among the five', 'Metal is fed by Earth and feeds Water, as mineral-bearing rock feeds a spring. It controls Wood, like the axe that cuts timber, and it is controlled by Fire, which melts it. In the stems, Geng is Yang Metal and Xin is Yin Metal.'],
        ],
        related: ['concept:five-phases', 'cycle:generating', 'cycle:controlling', 'daymaster:geng', 'daymaster:xin', 'concept:element-counts', 'library:elements'],
        boundary: 'An element is a phase of movement, not a type of person. How much of it appears in a chart is one piece of evidence among several.',
    }),
    entry({
        id: 'element:water', kind: 'element', title: 'Water', subtitle: 'Wu Xing phase five: winter, depth and adaptation',
        lead: 'Water is the phase of depth and flow. It sinks, gathers, finds the lowest route and takes the shape of whatever holds it, which is why the tradition trusts it as the symbol of adaptability.',
        sections: [
            ['The movement', 'Water descends and stores. It is associated with winter, the north, the colour dark blue or black and the cold, quiet part of any cycle where resources are held in reserve. It is also the phase of everything hidden: thought, memory and the unconscious.'],
            ['The image', 'The ocean and the rain. The tradition separates the great river or sea (Ren, vast, moving and powerful) from rain, dew and mist (Gui, gentle, quiet and permeating). One carries; the other soaks in.'],
            ['When it is in balance', 'Reflection, intuition, flexibility, resilience and a capacity to take in a lot without being fixed. People connect Water with wisdom, with the ability to find a way round an obstacle and with a deep reserve.'],
            ['When it is out of balance', 'Too little can be read as a lack of reflection or a difficulty resting. Too much is read as fear, withdrawal, drifting or a mind that floods: depth without a shore.'],
            ['Its place among the five', 'Water is fed by Metal and feeds Wood, since a plant needs it. It controls Fire by putting it out, and it is controlled by Earth, the bank that gives a river its course. In the stems, Ren is Yang Water and Gui is Yin Water.'],
        ],
        related: ['concept:five-phases', 'cycle:generating', 'cycle:controlling', 'daymaster:ren', 'daymaster:gui', 'concept:element-counts', 'library:elements'],
        boundary: 'An element is a phase of movement, not a type of person. How much of it appears in a chart is one piece of evidence among several.',
    }),
    entry({
        id: 'polarity:yang', kind: 'polarity', title: 'Yang', subtitle: 'The active, outward, bright pole',
        lead: 'Yang is one half of the oldest idea in Chinese thought: that every process has an active side and a receptive side, and that the two are not opposites but partners.',
        sections: [
            ['What Yang stands for', 'Yang is the side of movement, brightness, expansion and initiative: the day, the sun, the heat of summer, the rising of energy. It outlines what reaches out, begins and gives.'],
            ['Yang is not "better"', 'Neither pole is superior. Yang without Yin is a fire with nothing to burn: all expenditure and no source. The tradition values Yang for its force and Yin for its depth, and wisdom for knowing which the moment needs.'],
            ['Yang in a stem', 'Every one of the ten Heavenly Stems is either Yang or Yin, alternating: Jia, Bing, Wu, Geng and Ren are Yang; Yi, Ding, Ji, Xin and Gui are Yin. A Yang stem is the more outward, direct form of its element: the tree, the sun, the mountain, the axe, the ocean. The polarity changes how the element behaves; it never changes which element it is.'],
            ['Two different polarities in one chart', 'The Year Stem has its own polarity, and so does the Day Master (the Day Stem). They are independent: a Yang year can sit beside a Yin Day Master, and neither cancels the other. The Yin/Yang circle on the first screen shows the Year Stem\'s polarity; the Day Master circle shows the Day Master\'s.'],
        ],
        related: ['polarity:yin', 'concept:year-animal', 'concept:day-master', 'library:daymasters'],
        boundary: 'Yin and Yang are not male and female, good and bad, or strong and weak, and a polarity does not determine a personality.',
    }),
    entry({
        id: 'polarity:yin', kind: 'polarity', title: 'Yin', subtitle: 'The receptive, inward, quiet pole',
        lead: 'Yin is the receptive half of the pair. Where Yang acts, Yin holds, absorbs and makes room: the other half of every cycle, and the half that is easiest to underrate.',
        sections: [
            ['What Yin stands for', 'Yin is the side of stillness, depth, contraction and nourishment: the night, the moon, the cool of winter, the gathering of energy. It outlines what receives, responds and sustains.'],
            ['Yin is not "weaker"', 'Yin is not passive in the sense of being absent. A seed under the soil, a lake, a quiet room are all Yin and all full of potential. The tradition counts Yin as the source from which Yang draws and into which it returns.'],
            ['Yin in a stem', 'Yi, Ding, Ji, Xin and Gui are the Yin stems: the vine, the candle flame, the cultivated soil, the fine blade and the rain. A Yin stem is the more subtle, adaptive and inward form of its element. It tends to work by influence and refinement rather than by force.'],
            ['Two different polarities in one chart', 'The polarity shown on the first screen belongs to the Year Stem, and the Day Master has its own. They are calculated separately from separate stems, so a chart can show a Yin year and a Yang Day Master, or the other way round. Both are true at once and neither is the chart\'s "real" polarity.'],
        ],
        related: ['polarity:yang', 'concept:year-animal', 'concept:day-master', 'library:daymasters'],
        boundary: 'Yin and Yang are not male and female, good and bad, or strong and weak, and a polarity does not determine a personality.',
    }),
];
