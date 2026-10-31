import { entry } from './types.js?v=b5ef5ed';
/*
 * THE TWELVE EARTHLY BRANCHES AS MONTHS.
 *
 * A month branch is the branch of the Month Pillar: the season the person was born into, reckoned by the Sun's position (the twelve "Jie"
 * solar terms) and NOT by the Gregorian month. These entries describe the character of each month in the traditional year. What each petal of
 * the wheel shows for a particular Day Master is generated from the engine (registry.ts and personal.ts), not written here, and the solar term a
 * month begins at, its element and its hours are taken from the engine's own tables.
 */
export const BRANCH_ENTRIES = [
    entry({
        id: 'branch:zi', kind: 'branch', title: 'Zi', subtitle: 'The Rat month: the depth of winter',
        lead: 'Zi is the midwinter month, the one that contains the winter solstice, the longest night of the year. It is the deepest point of Water and the moment from which the light begins to return.',
        sections: [
            ['The season', 'Everything outside is at rest. In the traditional year this is stillness at its fullest: seed grain stored, rivers slowed, effort turned inward. It is also, quietly, the beginning of the next cycle, since the days start lengthening.'],
            ['Character of the month', 'Zi is pure Water: cold, deep, reflective and full of stored potential. Its animal is the Rat, the creature that is already moving in the dark, which is why this month is read as the one where new growth is first conceived.'],
            ['What the petal shows', 'In the wheel, the Zi petal asks how your Day Master would stand in a month governed by Water. Water is the element in command, so Water Day Masters are strongest there and the elements that Water puts out or draws on are read accordingly.'],
        ],
        related: ['concept:seasonal-support', 'concept:month-branch', 'animal:rat', 'element:water', 'library:branches'],
    }),
    entry({
        id: 'branch:chou', kind: 'branch', title: 'Chou', subtitle: 'The Ox month: the last of winter',
        lead: 'Chou is the closing month of winter, the cold stretch between the solstice and the first day of spring. It is when the ground is hardest and the preparation for the new year is done by hand.',
        sections: [
            ['The season', 'Winter has not let go, but its end is in sight. In the traditional year this is a period of consolidation: tools are mended, stores counted and the fields wait for the thaw.'],
            ['Character of the month', 'Chou is an Earth branch, the earth of the frozen field. It is the storehouse of Metal, which gives it a hard, dense and enduring character. It holds Water and Metal inside Earth, a reminder that winter\'s reserves are kept in the soil.'],
            ['What the petal shows', 'In the wheel, the Chou petal asks how your Day Master would stand in a month governed by Earth. Earth Day Masters are strongest there, and the others are read by where they stand in relation to Earth.'],
        ],
        related: ['concept:seasonal-support', 'concept:month-branch', 'animal:ox', 'element:earth', 'library:branches'],
    }),
    entry({
        id: 'branch:yin', kind: 'branch', title: 'Yin', subtitle: 'The Tiger month: the start of spring',
        lead: 'Yin (寅) is the first month of the traditional year, and a different word from the polarity Yin (陰), although English spells them the same. It begins at Li Chun, the Beginning of Spring, which is why the Chinese year in BaZi turns on that solar term and not on the lunar new year.',
        sections: [
            ['The season', 'The first stirrings of growth: buds, thaw, the first warmth after a long cold. It is a month of rising energy that is still tender, and the tradition watches it closely because a bad start affects the rest of the year.'],
            ['Character of the month', 'Yin is Wood at its beginning, the young tree. Its animal is the Tiger, the one who steps out first. The month is read as bold, forward-moving and ambitious, with enough strength to push through the last of winter.'],
            ['What the petal shows', 'In the wheel, the Yin petal asks how your Day Master would stand in a month governed by Wood. Wood Day Masters are strongest there, and the elements Wood feeds or is fed by are read accordingly.'],
        ],
        related: ['concept:seasonal-support', 'concept:month-branch', 'animal:tiger', 'element:wood', 'library:branches'],
    }),
    entry({
        id: 'branch:mao', kind: 'branch', title: 'Mao', subtitle: 'The Rabbit month: the heart of spring',
        lead: 'Mao is the middle of spring, the month of full growth. Day and night are about equal at the spring equinox, and the green is no longer a promise but a fact.',
        sections: [
            ['The season', 'Flowering, rain and vigorous growth. In the traditional year this is the most fully Wood month: the point at which the tree\'s energy is at its peak and still fresh.'],
            ['Character of the month', 'Mao is the purest Wood branch, soft where Yin was bold: the young leaf, the flower, the creeping plant. Its animal is the Rabbit, the animal of grace and caution. The month is read as gentle, creative and growing.'],
            ['What the petal shows', 'In the wheel, the Mao petal asks how your Day Master would stand in a month governed by Wood at its height. Wood Day Masters are strongest there, with Fire being fed by it.'],
        ],
        related: ['concept:seasonal-support', 'concept:month-branch', 'animal:rabbit', 'element:wood', 'library:branches'],
    }),
    entry({
        id: 'branch:chen', kind: 'branch', title: 'Chen', subtitle: 'The Dragon month: the end of spring',
        lead: 'Chen is the last month of spring, wet, heavy with rain and full of change. The season is turning towards summer, and the tradition treats it as a month of transitions.',
        sections: [
            ['The season', 'Rain, mud, the swelling of rivers and the hard work of planting. The year has opened and not yet settled, which is why the month is thought of as one of potential and of unstable weather.'],
            ['Character of the month', 'Chen is Earth, the storehouse of Water, and it still holds the Wood of spring in its soil. Its animal is the Dragon, the rain-bringer. The month is read as a blend of elements, powerful and a little unpredictable.'],
            ['What the petal shows', 'In the wheel, the Chen petal asks how your Day Master would stand in a month governed by Earth. The Earth of the turn between seasons is the commanding element, and the others are read against it.'],
        ],
        related: ['concept:seasonal-support', 'concept:month-branch', 'animal:dragon', 'element:earth', 'library:branches'],
    }),
    entry({
        id: 'branch:si', kind: 'branch', title: 'Si', subtitle: 'The Snake month: the start of summer',
        lead: 'Si is the opening of summer, when the heat is building and the days are long. The year\'s growth now turns from rising to blazing.',
        sections: [
            ['The season', 'Fields are green and strong, and the first real heat arrives. In the traditional year this is the month of confidence: the work of spring shows results and the summer\'s work begins.'],
            ['Character of the month', 'Si is Fire, but a concentrated, developing one rather than the open blaze of midsummer. Its animal is the Snake, quiet, wise and intense. The month is read as warm, purposeful and subtly strategic.'],
            ['What the petal shows', 'In the wheel, the Si petal asks how your Day Master would stand in a month governed by Fire. Fire Day Masters are strongest there, and the elements that feed or are fed by Fire are read accordingly.'],
        ],
        related: ['concept:seasonal-support', 'concept:month-branch', 'animal:snake', 'element:fire', 'library:branches'],
    }),
    entry({
        id: 'branch:wu', kind: 'branch', title: 'Wu', subtitle: 'The Horse month: the height of summer',
        lead: 'Wu is midsummer, the month of the year\'s greatest light and heat. The summer solstice falls within it, and Fire is at the very peak of its command.',
        sections: [
            ['The season', 'Long days, intense sun, the fullest growth. It is the high point of the traditional year, and the turn begins within it: after the solstice the days start to shorten, even while the heat keeps building.'],
            ['Character of the month', 'Wu is Fire in its open and Yang form, the sun at noon, and its animal is the Horse, the animal of speed and openness. The month is read as bright, outward and energetic.'],
            ['What the petal shows', 'In the wheel, the Wu petal asks how your Day Master would stand in a month governed by Fire at its height. Fire Day Masters are strongest there, with Earth being fed by it.'],
        ],
        related: ['concept:seasonal-support', 'concept:month-branch', 'animal:horse', 'element:fire', 'library:branches'],
    }),
    entry({
        id: 'branch:wei', kind: 'branch', title: 'Wei', subtitle: 'The Goat month: the end of summer',
        lead: 'Wei is the last month of summer, hot and heavy, when the crops are ripening and the year\'s work is close to its harvest. It is a month of fullness more than of energy.',
        sections: [
            ['The season', 'Humidity, ripeness, the slowing of the pace of a long season. In the traditional year it is the pause between the high summer heat and the first cool of autumn.'],
            ['Character of the month', 'Wei is Earth, the storehouse of Wood, dry and warm. Its animal is the Goat, the animal of gentleness and of pasture. The month is read as nurturing, comfortable and a little drowsy.'],
            ['What the petal shows', 'In the wheel, the Wei petal asks how your Day Master would stand in a month governed by Earth at the end of summer. The Earth that holds the heat is the commanding element, and the others are read against it.'],
        ],
        related: ['concept:seasonal-support', 'concept:month-branch', 'animal:goat', 'element:earth', 'library:branches'],
    }),
    entry({
        id: 'branch:shen', kind: 'branch', title: 'Shen', subtitle: 'The Monkey month: the start of autumn',
        lead: 'Shen is the first month of autumn. The heat is still there, but the year has turned: the harvest begins, the light changes and a cooler, sharper clarity enters the air.',
        sections: [
            ['The season', 'Gathering in. In the traditional year this is when the work of the summer is cut, counted and stored, and the mood shifts from growing to reaping.'],
            ['Character of the month', 'Shen is Metal in its raw and Yang form, the tool and the blade. Its animal is the Monkey, the inventor. The month is read as quick, practical and inventive.'],
            ['What the petal shows', 'In the wheel, the Shen petal asks how your Day Master would stand in a month governed by Metal. Metal Day Masters are strongest there, and the elements Metal feeds or is fed by are read accordingly.'],
        ],
        related: ['concept:seasonal-support', 'concept:month-branch', 'animal:monkey', 'element:metal', 'library:branches'],
    }),
    entry({
        id: 'branch:you', kind: 'branch', title: 'You', subtitle: 'The Rooster month: the heart of autumn',
        lead: 'You is mid-autumn: clear air, the harvest in, and the day and night equal at the autumn equinox. It is the most fully Metal month of the year.',
        sections: [
            ['The season', 'Gold fields, cool evenings and everything coming to its finished form. In the traditional year this is the month of completion and of refining what has been gathered.'],
            ['Character of the month', 'You is Metal in its refined, Yin form, the jewel rather than the tool. Its animal is the Rooster, the keeper of time. The month is read as precise, orderly and discerning.'],
            ['What the petal shows', 'In the wheel, the You petal asks how your Day Master would stand in a month governed by Metal at its height. Metal Day Masters are strongest there, with Water being fed by it.'],
        ],
        related: ['concept:seasonal-support', 'concept:month-branch', 'animal:rooster', 'element:metal', 'library:branches'],
    }),
    entry({
        id: 'branch:xu', kind: 'branch', title: 'Xu', subtitle: 'The Dog month: the end of autumn',
        lead: 'Xu is the last month of autumn, when the cold is arriving, leaves fall and the household closes up for the winter. It is a month of securing what has been gathered.',
        sections: [
            ['The season', 'Frost, dry wind and bare branches. In the traditional year it is the final preparation: stores are checked and the doors are shut against what is coming.'],
            ['Character of the month', 'Xu is Earth, dry and hard, and the storehouse of Fire, since it still holds the last warmth of the year. Its animal is the Dog, the guardian. The month is read as protective, dutiful and a little austere.'],
            ['What the petal shows', 'In the wheel, the Xu petal asks how your Day Master would stand in a month governed by Earth at the end of autumn. The Earth that closes the year is the commanding element, and the others are read against it.'],
        ],
        related: ['concept:seasonal-support', 'concept:month-branch', 'animal:dog', 'element:earth', 'library:branches'],
    }),
    entry({
        id: 'branch:hai', kind: 'branch', title: 'Hai', subtitle: 'The Pig month: the start of winter',
        lead: 'Hai is the opening of winter, when the cold has arrived and the year turns inward. Fields are bare and the work of the season is rest, stored food and warmth.',
        sections: [
            ['The season', 'Short days, first ice, the slow-down of everything. In the traditional year this is the month of settling into reserves, which is why it is also associated with abundance stored for the lean months.'],
            ['Character of the month', 'Hai is Water in its still, Yin form, the deep pool, with a trace of Wood within, the seed of next spring. Its animal is the Pig, the animal of contentment. The month is read as quiet, generous and reflective.'],
            ['What the petal shows', 'In the wheel, the Hai petal asks how your Day Master would stand in a month governed by Water at the start of winter. Water Day Masters are strongest there, and Wood is the element it feeds.'],
        ],
        related: ['concept:seasonal-support', 'concept:month-branch', 'animal:pig', 'element:water', 'library:branches'],
    }),
];
