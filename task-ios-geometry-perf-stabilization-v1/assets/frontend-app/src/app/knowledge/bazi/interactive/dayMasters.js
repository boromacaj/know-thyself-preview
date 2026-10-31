import { entry } from './types.js?v=d9f39e7';
/*
 * THE TEN DAY MASTERS.
 *
 * The Day Master is the Heavenly Stem of the Day Pillar, the one character of the chart that stands for the person. These entries do not paint
 * the element and prefix "Yin" or "Yang": each of the ten is built on the classical image of its stem (a standing tree, a vine, the sun, a candle,
 * a mountain, cultivated soil, an axe, a fine blade, the ocean, the rain), because that image is what encodes how the yang and the yin form of
 * one element behave differently. Each has a "compared with" section that sets it against its partner of the same element.
 *
 * The stems, their characters, elements and polarities are NOT written here: they come from the engine's own table (registry.ts).
 */
const closing = (partner) => ['In relation to the other elements', partner];
export const DAY_MASTER_ENTRIES = [
    entry({
        id: 'daymaster:jia', kind: 'daymaster', title: 'Jia', subtitle: 'Yang Wood: the standing tree',
        lead: 'Jia is the great tree: a straight trunk, deep roots and one direction of growth. It is the most upright of the stems, and the tradition calls it the pillar that holds a house up.',
        sections: [
            ['The image', 'A tall tree in open ground does not move much and does not need to. It grows towards the light, it provides shade, and other things find shelter in it. Jia is Wood at its most self-contained and most principled.'],
            ['Traditionally associated with', 'Integrity, leadership, a clear sense of right and a drive to grow. People described as Jia are often the ones who set the standard others measure against and who carry responsibility without being asked.'],
            ['Strengths', 'Reliability, directness, ambition that is pointed at something worth building, and the patience of a long growth. Jia tends to hold the line when it matters.'],
            ['Challenges', 'The trunk that cannot bend can snap. Stubbornness, difficulty accepting help or changing course and an assumption that the right path is obvious are the classical complaints.'],
            ['Compared with Yi', 'Jia stands alone and grows straight; Yi, the vine, bends round obstacles and climbs by attaching itself. Jia moves by principle, Yi by adaptation. Both are Wood, and both want to grow, in very different ways.'],
            closing('Jia is fed by Water, expresses itself through Fire, grips Earth with its roots and is shaped by Metal, the axe.'),
        ],
        related: ['concept:day-master', 'element:wood', 'daymaster:yi', 'library:daymasters', 'polarity:yang'],
        boundary: 'A Day Master is a classical symbol, not a diagnosis of character. It does not decide the reading on its own.',
    }),
    entry({
        id: 'daymaster:yi', kind: 'daymaster', title: 'Yi', subtitle: 'Yin Wood: the vine and the flower',
        lead: 'Yi is Wood in its soft form: grass, flower, vine. Where Jia is a trunk, Yi is a strand: it survives by bending, and it reaches the light by climbing whatever is nearby.',
        sections: [
            ['The image', 'A creeper on a wall, a flower in a crack of stone, a field of grass that lies flat in the wind and stands again. The tradition admires Yi because it is the one that outlasts storms that break the larger trees.'],
            ['Traditionally associated with', 'Flexibility, tact, persistence, creativity and a talent for finding a way. Yi is often described as socially skilled, gentle on the surface and surprisingly tenacious underneath.'],
            ['Strengths', 'Adaptability, patience, a feel for people and for atmosphere, and the ability to make a place for itself in conditions that would stop a stronger plant.'],
            ['Challenges', 'Dependence on what it climbs: Yi can lean on a person or an organisation too long. Indirectness may turn into evasion, and the readiness to bend can leave its own position unclear, even to itself.'],
            ['Compared with Jia', 'Jia chooses a direction and holds it; Yi takes the direction the situation allows and succeeds within it. Jia wins by standing; Yi wins by lasting.'],
            closing('Yi is nourished by Water and by warm light from Fire, is cut back by Metal, the shears, and tends to take root where Earth is soft.'),
        ],
        related: ['concept:day-master', 'element:wood', 'daymaster:jia', 'library:daymasters', 'polarity:yin'],
        boundary: 'A Day Master is a classical symbol, not a diagnosis of character. It does not decide the reading on its own.',
    }),
    entry({
        id: 'daymaster:bing', kind: 'daymaster', title: 'Bing', subtitle: 'Yang Fire: the sun',
        lead: 'Bing is the sun: bright, warm and lighting everything at once without picking favourites. It is the largest fire of the system and the most generous.',
        sections: [
            ['The image', 'The sun does not choose whom to shine on, it simply rises. In BaZi, Bing is the fire that is visible to everyone and that gives energy to everything beneath it.'],
            ['Traditionally associated with', 'Warmth, openness, optimism, charisma and a taste for the grand gesture. People described as Bing are often the centre of a gathering without trying to be.'],
            ['Strengths', 'Generosity, enthusiasm, courage, a natural capacity to inspire and to speak plainly. Bing tends to bring energy to a place and to forgive quickly.'],
            ['Challenges', 'The sun can scorch. Bing may burn out, overextend, speak before it has listened, or find it hard to be in the background when someone else needs the stage. A need for acknowledgement is the common complaint.'],
            ['Compared with Ding', 'Bing lights the whole sky; Ding lights one room. Bing is general and generous; Ding is focused and personal. Bing shines whether or not anyone looks; Ding is aware of who is in its light.'],
            closing('Bing is fed by Wood, warms Earth, melts Metal and is dimmed by Water.'),
        ],
        related: ['concept:day-master', 'element:fire', 'daymaster:ding', 'library:daymasters', 'polarity:yang'],
        boundary: 'A Day Master is a classical symbol, not a diagnosis of character. It does not decide the reading on its own.',
    }),
    entry({
        id: 'daymaster:ding', kind: 'daymaster', title: 'Ding', subtitle: 'Yin Fire: the candle and the lamp',
        lead: 'Ding is the controlled flame: a candle, a lamp, a hearth, a star. It is a small fire, which means it can be precise, warm and sustained, and which also means it can go out.',
        sections: [
            ['The image', 'A single flame in a dark room is more noticeable than the sun at noon. Ding lights what is close, it makes a space intimate, and it needs fuel and shelter.'],
            ['Traditionally associated with', 'Focus, warmth, sensitivity, insight and cultured taste. People described as Ding are often seen as perceptive, with the kind of attention that makes one feel individually seen.'],
            ['Strengths', 'Concentration, intuition, craft, tenderness and the ability to illuminate a hard subject for another person. Ding tends to work best one to one.'],
            ['Challenges', 'Sensitivity can become anxiety, and a flame that depends on fuel can burn itself down. Ding may take criticism personally and may withdraw when it feels its light is unwelcome.'],
            ['Compared with Bing', 'Bing is open and public, Ding is private and particular. Bing is the day and Ding is the evening: both are Fire, and the difference is between radiating to everyone and attending to someone.'],
            closing('Ding is fed by Wood (dry fuel is best), warms Earth, tempers Metal as a forge fire does and is threatened by Water in large amounts.'),
        ],
        related: ['concept:day-master', 'element:fire', 'daymaster:bing', 'library:daymasters', 'polarity:yin'],
        boundary: 'A Day Master is a classical symbol, not a diagnosis of character. It does not decide the reading on its own.',
    }),
    entry({
        id: 'daymaster:wu', kind: 'daymaster', title: 'Wu', subtitle: 'Yang Earth: the mountain',
        lead: 'Wu is the mountain: massive, stable and high. It does not move for people and it makes a landscape: valleys, rivers and weather are organised around it.',
        sections: [
            ['The image', 'A mountain is a boundary and a shelter. It blocks wind, divides regions and, over a long time, supplies the rivers. Wu is Earth at its largest and most unshakeable.'],
            ['Traditionally associated with', 'Steadiness, reliability, a strong sense of position, loyalty and a protective, sometimes imposing presence. People described as Wu often become the fixed point other people orient themselves by.'],
            ['Strengths', 'Dependability, patience, practicality, the ability to hold a line and carry a lot. Wu tends to remain calm when everything else is in motion.'],
            ['Challenges', 'The mountain does not easily move. Wu can be slow to adapt, stubborn or hard to read, and it may carry a worry silently for a long time. A reluctance to ask for help is a classical weakness.'],
            ['Compared with Ji', 'Wu is the mountain and Ji is the garden. Wu holds and protects at scale; Ji cultivates and nourishes at close range. Wu is firm and large; Ji is yielding and productive. Same element, very different manner.'],
            closing('Wu is warmed and fed by Fire, drained by Metal, hemmed in by Wood and shapes the course of Water.'),
        ],
        related: ['concept:day-master', 'element:earth', 'daymaster:ji', 'library:daymasters', 'polarity:yang'],
        boundary: 'A Day Master is a classical symbol, not a diagnosis of character. It does not decide the reading on its own.',
    }),
    entry({
        id: 'daymaster:ji', kind: 'daymaster', title: 'Ji', subtitle: 'Yin Earth: the cultivated field',
        lead: 'Ji is worked soil: a garden, a field, a paddy. It is the Earth that takes in seed, water and sun and returns a harvest, and its strength is in nurturing rather than standing.',
        sections: [
            ['The image', 'Soil is changed by what it feeds. Ji is the fertile ground of a farm, soft enough to hold roots and rich enough to grow almost anything, which is why the tradition calls it the most adaptable of the Earths.'],
            ['Traditionally associated with', 'Care, practicality, modesty, resourcefulness and a gift for developing what is placed in it. People described as Ji are often attentive to others\' needs and quietly effective.'],
            ['Strengths', 'Nurturing, patience, adaptability, a feel for detail and an ability to make things grow. Ji tends to be good at turning raw material into something usable.'],
            ['Challenges', 'Taking in too much. Ji can absorb other people\'s problems, worry a great deal and struggle to say no. A habit of underrating itself or of overthinking is the usual cost.'],
            ['Compared with Wu', 'Wu is large, still and high; Ji is low, close and productive. Wu protects by being there, Ji serves by growing things. Where Wu resists, Ji accommodates.'],
            closing('Ji is warmed by Fire, nourished by Water, works with Wood roots and refines Metal ore out of itself.'),
        ],
        related: ['concept:day-master', 'element:earth', 'daymaster:wu', 'library:daymasters', 'polarity:yin'],
        boundary: 'A Day Master is a classical symbol, not a diagnosis of character. It does not decide the reading on its own.',
    }),
    entry({
        id: 'daymaster:geng', kind: 'daymaster', title: 'Geng', subtitle: 'Yang Metal: the axe and the raw ore',
        lead: 'Geng is metal before it has been refined: ore, an axe, a sword, an iron girder. It is hard, direct and made to cut, and the tradition says it must be forged by Fire to become its best self.',
        sections: [
            ['The image', 'A raw blade will cut through obstacles but it is also heavy and blunt until it is worked. Geng stands for strength in need of discipline: it is firm and decisive and it often finds its form through hardship.'],
            ['Traditionally associated with', 'Decisiveness, courage, justice, loyalty and a plain-spoken style. People described as Geng often state what others are afraid to and make hard decisions without long hesitation.'],
            ['Strengths', 'Determination, fairness, resilience, and a readiness to act. Geng tends to be strongest where there is something real to cut through.'],
            ['Challenges', 'Bluntness. Geng can be harsh, rigid or confrontational without noticing, and a belief that firmness is always right may make it slow to hear gentler options. The tradition adds that Geng can be wounded by a lack of respect.'],
            ['Compared with Xin', 'Geng is the axe, Xin is the jewel. Geng works by force and by clear decision; Xin by finish and precision. Geng wants to cut the problem; Xin wants to refine it.'],
            closing('Geng is supported by Earth, shaped by Fire, directs its edge at Wood and releases Water.'),
        ],
        related: ['concept:day-master', 'element:metal', 'daymaster:xin', 'library:daymasters', 'polarity:yang'],
        boundary: 'A Day Master is a classical symbol, not a diagnosis of character. It does not decide the reading on its own.',
    }),
    entry({
        id: 'daymaster:xin', kind: 'daymaster', title: 'Xin', subtitle: 'Yin Metal: the jewel and the fine blade',
        lead: 'Xin is refined metal: a jewel, a needle, a scalpel, a bell. It has been through the fire and come out clean, and its worth is in finish rather than force.',
        sections: [
            ['The image', 'A gem is valuable because it was formed under pressure and then polished, and it is easily marked. Xin is Metal at its most delicate: sharp, bright and demanding of a good setting.'],
            ['Traditionally associated with', 'Refinement, discernment, sensitivity, high standards and a strong sense of worth. People described as Xin are often noted for taste and for a precise, observant mind.'],
            ['Strengths', 'Precision, aesthetic judgement, eloquence, integrity and the ability to see what is flawed or fine. Xin tends to do well in work that calls for quality.'],
            ['Challenges', 'Hurt feelings and perfectionism. Xin can be self-critical and critical, proud, easily stung by a slight and reluctant to show vulnerability. The tradition warns that it can hold on to what it has lost.'],
            ['Compared with Geng', 'Geng is the tool and Xin is the treasure. Geng is strong because it is hard; Xin is valuable because it is fine. Geng forces; Xin shines.'],
            closing('Xin is nourished by Earth, brought into form by Fire (but not too much), cleansed by Water and set against Wood as a delicate blade rather than an axe.'),
        ],
        related: ['concept:day-master', 'element:metal', 'daymaster:geng', 'library:daymasters', 'polarity:yin'],
        boundary: 'A Day Master is a classical symbol, not a diagnosis of character. It does not decide the reading on its own.',
    }),
    entry({
        id: 'daymaster:ren', kind: 'daymaster', title: 'Ren', subtitle: 'Yang Water: the ocean and the great river',
        lead: 'Ren is large water: a river in flood, an ocean, a current that carries things with it. It is the most powerful and the most travelled of the Waters, and it does not stay in one place.',
        sections: [
            ['The image', 'Great water follows gravity and finds every way round. It is not a still pond but a force: it carves valleys, connects distant places and cannot be held back for long.'],
            ['Traditionally associated with', 'Intelligence, mobility, ambition, a love of freedom and a broad outlook. People described as Ren are often resourceful, curious, and drawn to large ideas and to travel.'],
            ['Strengths', 'Vision, flexibility, strategic thinking, energy for change and an ability to move between worlds. Ren tends to see the whole landscape rather than the single field.'],
            ['Challenges', 'Lack of containment. Ren can scatter itself, overflow, change course too quickly or have difficulty finishing. Without banks, water spreads thin; the tradition says Ren needs some Earth to give it form.'],
            ['Compared with Gui', 'Ren is the river, Gui is the rain. Ren travels and carries; Gui seeps and sustains. Ren moves by momentum, Gui by patience.'],
            closing('Ren is supplied by Metal, feeds Wood, is shaped by Earth and puts out Fire.'),
        ],
        related: ['concept:day-master', 'element:water', 'daymaster:gui', 'library:daymasters', 'polarity:yang'],
        boundary: 'A Day Master is a classical symbol, not a diagnosis of character. It does not decide the reading on its own.',
    }),
    entry({
        id: 'daymaster:gui', kind: 'daymaster', title: 'Gui', subtitle: 'Yin Water: rain, dew and mist',
        lead: 'Gui is small water: rain on a field, dew, a spring, a mist over a lake. It does not push; it permeates, and over time it reaches everywhere.',
        sections: [
            ['The image', 'Rain does not break the soil, it soaks into it. Gui is Water at its quietest: unobtrusive, inward and persistent, working through the cracks.'],
            ['Traditionally associated with', 'Intuition, receptivity, imagination, subtlety and a reflective mind. People described as Gui are often perceptive, secretive and creative, with a rich inner world.'],
            ['Strengths', 'Sensitivity, patience, depth of thought, the capacity to absorb information and to sense what is unsaid. Gui tends to find the quiet way to a result.'],
            ['Challenges', 'Withdrawal and doubt. Gui can be indecisive, moody or drift into worry, and a reluctance to show what it thinks may leave it misunderstood. A mist can obscure as well as soften.'],
            ['Compared with Ren', 'Ren is the great river and Gui is the small rain. Ren moves and acts at scale; Gui nurtures and influences at close range. Ren is bold; Gui is subtle.'],
            closing('Gui is fed by Metal, nourishes Wood, is contained by Earth and is easily overwhelmed by too much Fire or dried by it.'),
        ],
        related: ['concept:day-master', 'element:water', 'daymaster:ren', 'library:daymasters', 'polarity:yin'],
        boundary: 'A Day Master is a classical symbol, not a diagnosis of character. It does not decide the reading on its own.',
    }),
];
