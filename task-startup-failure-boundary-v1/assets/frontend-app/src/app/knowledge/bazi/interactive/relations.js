import { entry } from './types.js?v=2ea79e9';
/*
 * THE FIVE-PHASE CYCLES, THEIR TEN RELATIONSHIPS, AND THE CONCEPTS A READER MEETS ON THE CHARTS.
 *
 * The cycles are functional relationships between phases, not verdicts. "Controlling" (ke) is a regulating relationship that every healthy system
 * needs: it keeps a phase from overgrowing, and it is as necessary as "generating" (sheng). Nothing here calls either cycle good or bad.
 */
const boundaryCycle = 'A relationship between two phases is a description of how they tend to act on each other, never a prediction. What matters in a chart is the whole configuration.';
const generating = (from, to, fromLc, toLc, lead, image, tradition, balance, related) => entry({
    id: `relation:generating:${fromLc}-${toLc}`, kind: 'relation', title: `${from} feeds ${to}`, subtitle: `Generating cycle (sheng): ${from} → ${to}`,
    lead,
    sections: [['The image', image], ['In the tradition', tradition], ['Keeping it in balance', balance]],
    related: ['cycle:generating', `element:${fromLc}`, `element:${toLc}`, ...related],
    boundary: boundaryCycle,
});
const controlling = (from, to, fromLc, toLc, lead, image, tradition, balance, related) => entry({
    id: `relation:controlling:${fromLc}-${toLc}`, kind: 'relation', title: `${from} regulates ${to}`, subtitle: `Controlling cycle (ke): ${from} → ${to}`,
    lead,
    sections: [['The image', image], ['In the tradition', tradition], ['Keeping it in balance', balance]],
    related: ['cycle:controlling', `element:${fromLc}`, `element:${toLc}`, ...related],
    boundary: boundaryCycle,
});
export const RELATION_ENTRIES = [
    entry({
        id: 'cycle:generating', kind: 'cycle', title: 'The generating cycle', subtitle: 'Sheng: the cycle of nourishment',
        lead: 'The generating cycle is the sequence in which each of the five phases gives rise to the next: Wood feeds Fire, Fire makes Earth, Earth bears Metal, Metal gathers Water and Water nourishes Wood. On the chart it is the gold line with arrowheads around the pentagon.',
        sections: [
            ['How to read it', 'The tradition calls each phase the "mother" of the one it generates and the "child" of the one that generates it. It is a family image: a mother feeds a child, and a child draws on, and can exhaust, its mother. So the cycle describes support and also a cost.'],
            ['The five steps', 'Wood burns to make Fire; the ash of Fire becomes Earth; Earth, over long time, holds Metal in its ores; Metal condenses moisture or, in the old image, is the source in the rock from which Water seeps; Water makes Wood grow. Each step is a natural process rather than an abstraction.'],
            ['Why it is not "all good"', 'Generating is not automatically beneficial. Too much feeding overwhelms, as too much wood smothers a small flame, and a phase that keeps giving can be depleted. The cycle describes direction of support, not goodness.'],
            ['On your chart', 'The five gold arrows connect the five orbs in the cycle\'s order. Tap any of them, or one of the two cycle buttons under the chart, to see what a specific step means.'],
        ],
        related: ['cycle:controlling', 'library:cycles', 'concept:five-phases', 'relation:generating:wood-fire', 'relation:generating:fire-earth', 'relation:generating:earth-metal', 'relation:generating:metal-water', 'relation:generating:water-wood'],
        boundary: boundaryCycle,
    }),
    entry({
        id: 'cycle:controlling', kind: 'cycle', title: 'The controlling cycle', subtitle: 'Ke: the cycle of regulation',
        lead: 'The controlling cycle runs across the pentagon: Wood regulates Earth, Earth regulates Water, Water regulates Fire, Fire regulates Metal and Metal regulates Wood. On the chart it is the dashed coral line inside the pentagon.',
        sections: [
            ['Control means regulation', 'The older word for the relationship is often translated as "overcoming" or "controlling", and that sounds hostile. In practice it describes the way each phase keeps another in proportion: roots hold soil together, a bank guides a river, water tempers fire, fire forges metal, an axe prunes a tree. A system without them has nothing to check its growth.'],
            ['The five steps', 'Wood parts and anchors Earth; Earth contains Water; Water quenches Fire; Fire shapes Metal; Metal cuts Wood. Each is a working relationship with its own useful and its own destructive side.'],
            ['Why it is not "bad"', 'The cycle is not a list of enemies. Whether a controlling relationship helps or damages depends on proportion: fire that tempers metal makes a blade, fire that overwhelms it makes slag. The tradition looks for the right measure, not the removal of the relationship.'],
            ['Together with the generating cycle', 'The two cycles work as a pair. Generating supplies, controlling shapes. A phase that is only fed grows without form; one that is only controlled is starved. Balance is the interplay of both.'],
            ['On your chart', 'Tap the dashed lines, or the controlling-cycle button under the chart, to see a single relationship.'],
        ],
        related: ['cycle:generating', 'library:cycles', 'concept:five-phases', 'relation:controlling:wood-earth', 'relation:controlling:earth-water', 'relation:controlling:water-fire', 'relation:controlling:fire-metal', 'relation:controlling:metal-wood'],
        boundary: boundaryCycle,
    }),
    generating('Wood', 'Fire', 'wood', 'fire', 'Wood feeds Fire: fuel makes a flame. Of the five generating relationships this is the most literal, and the one the tradition uses to illustrate the idea.', 'A log on a hearth. The growth of Wood is stored energy, and Fire is that energy being released.', 'Wood is the mother of Fire. Planning and growth (Wood) supply the material that expression and warmth (Fire) then spend. A Fire that has no Wood to draw on burns out quickly.', 'Too little Wood leaves a fire short of fuel; too much damp Wood smothers a small one. The tradition watches the proportion between the two.', ['daymaster:jia', 'daymaster:bing']),
    generating('Fire', 'Earth', 'fire', 'earth', 'Fire makes Earth: what burns leaves ash and in the end soil. The relationship is about how warmth becomes stability.', 'Embers settling into ash, a volcano building ground, the warmth that turns a harvest into a settled household.', 'Fire is the mother of Earth. Expression and warmth (Fire) consolidate into something that holds (Earth). Earth that never receives warmth stays cold and inert.', 'Fire without limit scorches the ground and leaves it dry; Earth with no Fire becomes damp and heavy. The two need to be in proportion.', ['daymaster:bing', 'daymaster:wu']),
    generating('Earth', 'Metal', 'earth', 'metal', 'Earth bears Metal: ores and minerals form in the ground. The relationship is about how stability yields structure and value.', 'A mine, a seam of ore, the slow pressure of the ground that produces something hard and bright.', 'Earth is the mother of Metal. Patience and consolidation (Earth) produce refined form (Metal). Metal needs Earth\'s depth, and burying it too deep hides it.', 'Too much Earth buries Metal and the ore never comes out; too little and there is nothing to form it. The tradition notes that heavy soil can bury a thin vein.', ['daymaster:wu', 'daymaster:geng']),
    generating('Metal', 'Water', 'metal', 'water', 'Metal gathers Water: cold metal condenses moisture, and the old image has springs rising from rock. The relationship is about how structure gives rise to flow.', 'Dew on a cool blade, a spring from stone, a mountain that is cold and so makes rivers.', 'Metal is the mother of Water. Clear boundaries and refinement (Metal) give depth and movement (Water) a source and a direction. Metal at autumn precedes the Water of winter.', 'Too much Metal can leave Water thin and cold; too little Metal and Water has no source. The proportion decides whether it flows or freezes.', ['daymaster:xin', 'daymaster:ren']),
    generating('Water', 'Wood', 'water', 'wood', 'Water nourishes Wood: rain and rivers make plants grow. It closes the cycle and starts it again.', 'A garden after rain, roots drawing from a stream, winter moisture that becomes spring growth.', 'Water is the mother of Wood. Depth and reserve (Water) produce growth (Wood): what is stored in the quiet season is spent in the growing one.', 'Too much Water floods a plant and rots the roots; too little leaves it to wither. The tradition sees a drowned or a dry Wood as two forms of one problem.', ['daymaster:gui', 'daymaster:jia']),
    controlling('Wood', 'Earth', 'wood', 'earth', 'Wood regulates Earth: roots hold soil together and draw from it. It is the relationship between growth and the ground it grows in.', 'Roots binding a river bank, a forest that anchors a hillside, a plant taking its food from the soil.', 'Wood controls Earth. Direction and growth (Wood) shape and draw on stability (Earth). Earth with no Wood to organise it can be sluggish, and Earth that is only drawn on is depleted.', 'Moderate Wood stabilises the ground; too much exhausts it, and Earth that is very strong can be left untouched by a weak Wood.', ['daymaster:jia', 'daymaster:wu']),
    controlling('Earth', 'Water', 'earth', 'water', 'Earth regulates Water: banks, dams and soil give water a course. It is the relationship between structure and flow.', 'A river bed, a canal, a dike, soil that absorbs rain.', 'Earth controls Water. Stability (Earth) gives depth and movement (Water) a shape. Water without banks floods; Earth without water becomes a desert.', 'A modest bank guides a river, too heavy a dam blocks it. The question is always how much containment suits how much flow.', ['daymaster:ji', 'daymaster:ren']),
    controlling('Water', 'Fire', 'water', 'fire', 'Water regulates Fire: water cools and puts fire out. It is the relationship between reflection and expression.', 'Rain on a flame, a river cooling summer air, the way a cold bath settles a heated mind.', 'Water controls Fire. Depth and reflection (Water) temper heat and impulse (Fire). Fire that has no Water to balance it burns without pause.', 'A little Water steadies a fire; a flood puts it out. The tradition values the temperate meeting of the two, steam rather than extinction.', ['daymaster:gui', 'daymaster:ding']),
    controlling('Fire', 'Metal', 'fire', 'metal', 'Fire regulates Metal: flame melts and forges metal. It is the relationship between energy and form.', 'A forge, a furnace, the heat that turns ore into a blade.', 'Fire controls Metal. Warmth and energy (Fire) work on structure (Metal) and give it its shape. Metal that has never met Fire stays raw; Metal exposed to too much Fire loses its form.', 'Measured heat makes a tool; too much melts it. The tradition thinks of this relationship as the way discipline is applied to raw talent.', ['daymaster:bing', 'daymaster:geng']),
    controlling('Metal', 'Wood', 'metal', 'wood', 'Metal regulates Wood: the axe fells and the shears prune. It is the relationship between refinement and growth.', 'A pruning knife in an orchard, a saw in a forest, the carpenter\'s blade that gives timber its use.', 'Metal controls Wood. Boundaries and standards (Metal) shape and limit growth (Wood). Unpruned Wood grows wild; overpruned Wood does not grow at all.', 'Judicious cutting improves a tree; too much destroys it. The tradition treats it as the relationship between editing and creating.', ['daymaster:xin', 'daymaster:yi']),
    entry({
        id: 'concept:year-animal', kind: 'concept', title: 'Year Animal', subtitle: 'The animal of the Year Pillar',
        lead: 'The Year Animal is the zodiac animal of the year you were born in, and the one most people already know. In BaZi it is only one small piece: the Earthly Branch of the Year Pillar.',
        sections: [
            ['Where it comes from', 'The Year Pillar has two characters. The upper one is a Heavenly Stem, which gives the year its element and its polarity (for example Yang Fire). The lower is an Earthly Branch, which gives the animal (for example the Horse). Together they name the year in the sixty-year cycle: Yang Fire Horse is Bing Wu.'],
            ['The year turns at Li Chun, not at New Year', 'In BaZi the year changes at Li Chun, the Beginning of Spring (about 4 February), a point fixed by the Sun, and not at the Lunar New Year, which moves between late January and late February. A person born between the two may have a popular zodiac animal that differs from the one in their BaZi chart. The chart uses the BaZi rule.'],
            ['The animal, the element and the polarity', 'The animal brings the symbolism of its branch (its season, its temperament, its legend). The stem brings the element and polarity of the year. They are separate pieces of information: two people with the same animal can have different year elements, and so a different kind of year.'],
            ['Year Animal and Day Master', 'They are two different characters of the chart. The Year Animal belongs to the Year Pillar, which is traditionally linked with ancestry, early life and the social setting. The Day Master is the Day Stem, the centre of the chart, which stands for the person. Reading one as if it were the other is the most common mistake in popular astrology.'],
        ],
        related: ['concept:day-master', 'library:animals', 'concept:five-phases', 'polarity:yang', 'polarity:yin'],
        boundary: 'A zodiac animal is a symbol. It is not a personality diagnosis, and a chart is read as a whole.',
    }),
    entry({
        id: 'concept:day-master', kind: 'concept', title: 'Day Master', subtitle: 'The Heavenly Stem of the Day Pillar',
        lead: 'The Day Master is the main reference point of a BaZi chart: the stem of the day you were born, standing for you. Every other character is read in relation to it.',
        sections: [
            ['Why the Day Stem', 'A chart has four pillars (year, month, day and hour), each with a stem and a branch. The Day Pillar is the one that is calculated from the exact calendar day, and its upper character, the Day Stem, is taken as the self. The Year, Month and Hour pillars are then described by how they relate to it.'],
            ['Ten possibilities', 'There are ten stems, so ten Day Masters: Jia and Yi (Wood), Bing and Ding (Fire), Wu and Ji (Earth), Geng and Xin (Metal), Ren and Gui (Water). Each element has a Yang and a Yin form with different manners. You can open all ten from the Day Master library.'],
            ['What it is not', 'The Day Master is not the whole reading. It is a starting point: whether it is supported or drained, what controls it and what it can express through depends on the other seven characters and on the season of birth. Two people with the same Day Master can have very different charts.'],
            ['Year Animal versus Day Master', 'The Year Animal and the Day Master are different characters of the chart and have different roles. The Year Animal (a branch) describes the year; the Day Master (a stem) is the centre of the chart.'],
        ],
        related: ['library:daymasters', 'concept:year-animal', 'concept:five-phases', 'concept:seasonal-support'],
        boundary: 'The Day Master is a reference point, not a verdict on character.',
    }),
    entry({
        id: 'concept:five-phases', kind: 'concept', title: 'The five phases', subtitle: 'Wu Xing: five movements, not five substances',
        lead: 'Wu Xing, usually translated as the Five Elements, is a way of describing change. The five names (Wood, Fire, Earth, Metal, Water) are images for five phases that any process passes through.',
        sections: [
            ['Phases, not substances', 'The Chinese word means "five movements" or "five walking". Wood is the phase of growth, Fire of expression, Earth of consolidation, Metal of refinement and Water of storing. The same sequence is seen in a year (spring, summer, late summer, autumn, winter) and in a project, a day and a life.'],
            ['Two cycles hold them together', 'The generating cycle describes how each phase gives rise to the next, and the controlling cycle describes how each phase keeps another in proportion. Between them they explain why a phase can be too strong or too weak, and why neither is simply good.'],
            ['In a BaZi chart', 'Every stem and every branch has an element, so the chart can be described by how its eight characters are distributed among the phases. The number shown on each orb counts those characters.'],
        ],
        related: ['element:wood', 'element:fire', 'element:earth', 'element:metal', 'element:water', 'cycle:generating', 'cycle:controlling', 'concept:element-counts'],
        boundary: 'The five phases are a descriptive framework from Chinese philosophy and medicine, not a physical or psychological measurement.',
    }),
    entry({
        id: 'concept:element-counts', kind: 'concept', title: 'What the number on an orb counts', subtitle: 'The visible count of each phase',
        lead: 'The number inside each element orb is the plain count of how many of the chart\'s visible characters belong to that element. It is a first look at the distribution, and it is deliberately simple.',
        sections: [
            ['Exactly what is counted', 'A chart has four pillars, each with a Heavenly Stem and an Earthly Branch: eight visible characters in all, or six if the birth time is not known and the Hour Pillar is left out. Each character is counted once under its own element. The branch is counted by its main element.'],
            ['What it does not count', 'It does not include the hidden stems inside each branch, it does not weight characters by their position, and it does not weight by the season of birth. So it is not a percentage and not a measure of how strong an element is. The orb\'s size shows the count and nothing more.'],
            ['A zero is not an absence', 'An element with a count of zero has no visible stem or branch of its own, but it can still be present in the hidden stems of the branches, and it still takes part through the generating and controlling relationships with the elements that are present. Zero means none of the visible characters, not none of its influence.'],
            ['How to use it', 'Treat the number as the plain facts of the chart\'s composition, and read it beside the season of birth and the Day Master. A low count and a strong season, for instance, are different from a low count in an unsupportive one.'],
        ],
        related: ['concept:five-phases', 'cycle:generating', 'cycle:controlling', 'concept:seasonal-support'],
        boundary: 'The count is an unweighted visible tally. It is not a percentage, a strength score or a measure of personal balance.',
    }),
    entry({
        id: 'concept:seasonal-support', kind: 'concept', title: 'Seasonal support', subtitle: 'How a Day Master stands in each season',
        lead: 'The ring of twelve petals compares one thing across the year: how well supported your Day Master\'s element would be if you had been born in each of the twelve months. It is a comparison, and only one petal is the month you were actually born in.',
        sections: [
            ['The idea', 'In BaZi the month of birth is the most influential position of the chart because it sets the season, and every element is stronger or weaker in a season. A Wood Day Master in spring has the whole season behind it; the same Wood in autumn is under the axe.'],
            ['The five standings', 'The classical vocabulary has five states: prosperous (the element that rules the season), aided (the element that the ruling element feeds), resting (the element that fed the ruling element and has stepped back), trapped (the element that controls the ruling one but cannot prevail in its season) and dead (the element that the ruling one controls). These are technical terms from the old texts: "trapped" and "dead" are descriptions of a position, not predictions of misfortune.'],
            ['What the petals show', 'Each petal takes the element of the month it names, finds your Day Master\'s standing in it and shows it as brightness: the brightest petals are the months in which that Day Master is most supported, and the dimmest those in which it is least. The wheel therefore changes with the Day Master, not with the date of birth.'],
            ['What it is not', 'It is not a score or a percentage, and it is not a forecast. No numbers are shown on purpose: the five states are categories, and the wheel only draws them.'],
        ],
        related: ['concept:birth-month', 'concept:month-branch', 'library:branches', 'concept:day-master', 'cycle:generating'],
        boundary: 'Seasonal standing is one structural layer of a chart. It does not by itself say how strong or weak a person is.',
    }),
    entry({
        id: 'concept:month-branch', kind: 'concept', title: 'The month branch', subtitle: 'Months follow the Sun, not the calendar page',
        lead: 'The twelve petals are the twelve Earthly Branches as months. They are not the Gregorian months: each begins at one of twelve solar terms, the moments the Sun reaches particular points on its path.',
        sections: [
            ['Solar-term months', 'The BaZi month starts at a "Jie" solar term, such as Li Chun (the Beginning of Spring), at an exact moment that changes by a few hours from year to year. The Yin month (Tiger) begins at Li Chun, the Mao month (Rabbit) at Jing Zhe, and so on round the year, each about a month long.'],
            ['Why it matters', 'If you were born in the first days of a Gregorian month, your BaZi month may still be the previous one. A birth close to a boundary can also change month with the time of day, which is why the birth time and the place matter.'],
            ['The twelve and the year', 'The branches run Zi, Chou, Yin, Mao, Chen, Si, Wu, Wei, Shen, You, Xu, Hai. The Zi month contains the winter solstice, and the calendar, as BaZi counts it, starts the year from the Yin month, at Li Chun.'],
        ],
        related: ['concept:birth-month', 'concept:seasonal-support', 'library:branches', 'concept:year-animal'],
        boundary: 'The exact moment a month begins depends on the year and the place; the chart\'s own calculation is the authority for a person.',
    }),
    entry({
        id: 'concept:birth-month', kind: 'concept', title: 'The golden petal', subtitle: 'Your actual month of birth',
        lead: 'The petal with the gold outline marks the one month in the wheel that is not hypothetical: the month branch of your own chart, calculated from your date and time of birth.',
        sections: [
            ['How it is chosen', 'The highlighted petal is the Earthly Branch of your Month Pillar, found from the solar-term calendar for your birth moment. It is not chosen by the colour or the brightness of the petal, and it is not the month a calendar would give.'],
            ['Why it stands out', 'The twelve petals are a comparison across the year, so most of them describe a month you were not born in. The gold petal is the real one, which is why it is the one to read first: its brightness is how well your Day Master is supported in the season that actually applies to you.'],
            ['When the month is uncertain', 'If you were born within a day of a solar-term boundary and the exact time is not known, the month can be uncertain. In that case the chart states that the month is approximate; the highlighted petal is the one the calculation uses.'],
        ],
        related: ['concept:seasonal-support', 'concept:month-branch', 'library:branches', 'concept:day-master'],
        boundary: 'The golden petal marks a calculated month branch. It does not mark a month that is "better" than the others.',
    }),
];
