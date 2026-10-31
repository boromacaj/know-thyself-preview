import { entry } from './types.js?v=b5ef5ed';
/*
 * THE TWELVE ZODIAC ANIMALS (the Earthly Branches as creatures).
 *
 * Each entry is written from the animal's own tradition (its legend, its season, its hour of the day, the temperament people have read into it
 * for centuries), not from its element alone: the Horse and the Snake are both Fire branches and have almost nothing in common. Every entry says
 * what the tradition associates, what it can look like when it goes well and when it does not, and where its own limits are. None of it is
 * offered as a measured trait: a Year Animal is one of the eight characters of a chart, and the entries say so.
 */
export const ANIMAL_ENTRIES = [
    entry({
        id: 'animal:rat', kind: 'animal', title: 'Rat', subtitle: 'The first of the twelve animals',
        lead: 'The Rat opens the zodiac. In the old story the twelve animals raced across a river, and the Rat won by riding on the Ox\'s back and leaping ahead at the last moment. Chinese tradition does not treat that as a trick to be ashamed of: it is the picture of intelligence, timing and resourcefulness doing what strength alone cannot.',
        sections: [
            ['What it stands for', 'The Rat belongs to the Zi branch: midnight, the turning point of the day, and the deep of winter, when something small and alert is already stirring under the cold. It stands for beginnings, quick perception, and the ability to find a way in. In the older farming world a Rat in the granary meant there would be grain, so the animal also carries an association with provision and with accumulating more than is strictly needed.'],
            ['Qualities traditionally associated', 'Adaptable, observant, quick to size up a situation, curious, and good at noticing what others overlook. The tradition also credits the Rat with charm: a talent for being welcome in many different company.'],
            ['Strengths', 'Resourcefulness under pressure, a feel for opportunity, comfort with change, and a habit of preparing early. The Rat tends to be described as someone who has a plan B before most people have finished plan A.'],
            ['Challenges', 'The same alertness can become restlessness or anxiety about scarcity, and quickness can slide into cutting corners. Tradition also warns of the Rat that hoards, whether goods, information or worries, and of cleverness that is used to avoid a conversation rather than have it.'],
            ['People and relationships', 'Sociable and talkative at the surface, often more private underneath. Close relationships are described as the place where the Rat has to practise being plainly honest rather than diplomatic.'],
            ['Work and motivation', 'Roles that reward speed, networking, analysis or invention. The motivation is usually security first, then freedom to move: the Rat likes to have a way out.'],
        ],
        related: ['concept:year-animal', 'library:animals', 'branch:zi', 'element:water'],
        boundary: 'These are traditional associations for the Rat archetype. They describe a symbol, not a measured personality, and one animal is only one of the eight characters in a chart.',
    }),
    entry({
        id: 'animal:ox', kind: 'animal', title: 'Ox', subtitle: 'The second animal, the patient worker',
        lead: 'The Ox is the animal that carried the Rat across the river and asked for nothing in return. It is the zodiac\'s picture of steady effort: slow to start, very hard to stop, and trusted because it does what it says.',
        sections: [
            ['What it stands for', 'The Ox belongs to the Chou branch, the cold, still hour before dawn and the last month of winter, when the earth is frozen but the year is about to turn. Its Earth nature is the field being ploughed: patience, labour and the long investment that only pays off later. For an agricultural civilisation the Ox was the single most important working animal, and that dependence is the root of its character.'],
            ['Qualities traditionally associated', 'Reliable, methodical, practical, sturdy, with a strong sense of duty. The Ox is credited with a calm exterior and with strong views that it expresses rarely and firmly.'],
            ['Strengths', 'Endurance, consistency, thoroughness and the ability to carry a heavy load for a long time without complaint. The Ox is the one others rely on to finish.'],
            ['Challenges', 'Stubbornness, resistance to change, and a tendency to keep carrying a load long after it should have been shared or set down. Slowness to forgive is the other classical complaint: the Ox remembers.'],
            ['People and relationships', 'Loyal and protective once trust exists, with a preference for a few durable bonds over a wide circle. Affection tends to be shown in practical acts rather than speeches.'],
            ['Work and motivation', 'Does well where craft, structure and accountability matter. The motivation is usually to build something solid that outlasts the effort, and to be respected for the quality of the work.'],
        ],
        related: ['concept:year-animal', 'library:animals', 'branch:chou', 'element:earth'],
        boundary: 'These are traditional associations for the Ox archetype, not measured traits, and the Year Animal is only one character of a chart.',
    }),
    entry({
        id: 'animal:tiger', kind: 'animal', title: 'Tiger', subtitle: 'The third animal, courage and command',
        lead: 'The Tiger is the zodiac\'s great cat: powerful, solitary and hard to ignore. Its mark is on the forehead of the traditional painting, the character for "king", and across East Asia it is the emblem of courage and of the authority that does not need to raise its voice.',
        sections: [
            ['What it stands for', 'The Tiger is the Yin branch, the first month of spring and the dark early-morning hours when hunting begins. In the calendar it is where the new year\'s energy first leaves the ground, so the Tiger carries an impatience to move and a readiness to take the first step that others hesitate over. In folk belief it also guards against misfortune, which is why children\'s clothing was once decorated with tigers.'],
            ['Qualities traditionally associated', 'Brave, confident, independent, magnetic and protective. The Tiger is credited with a strong sense of justice and with a taste for large goals.'],
            ['Strengths', 'Courage when things are uncertain, a natural capacity to lead and to take responsibility, and a generosity towards those who are under its protection.'],
            ['Challenges', 'Restlessness, a short fuse, difficulty accepting direction from others, and a tendency to charge at things that needed patience. The traditional warning is about the Tiger\'s pride: it would rather act boldly and be wrong than wait and be safe.'],
            ['People and relationships', 'Warm and generous with those it respects, and uncomfortable in situations where it is expected to submit. Friendships are loyal and intense; conflicts are open.'],
            ['Work and motivation', 'Suited to roles with initiative, risk and visible responsibility. The motivation is a sense of purpose and a worthy challenge: routine without meaning wears the Tiger down.'],
        ],
        related: ['concept:year-animal', 'library:animals', 'branch:yin', 'element:wood'],
        boundary: 'These are traditional associations for the Tiger archetype, not measured traits, and the Year Animal is only one character of a chart.',
    }),
    entry({
        id: 'animal:rabbit', kind: 'animal', title: 'Rabbit', subtitle: 'The fourth animal, grace and caution',
        lead: 'The Rabbit is the quiet animal of the zodiac. In China the creature associated with the Mao branch is also the Moon\'s hare, which sits at the foot of the lunar tree grinding the elixir of long life, so its character is gentle, refined and a little otherworldly.',
        sections: [
            ['What it stands for', 'Mao is the full spring: the second month of the year, dawn, and growth that is no longer tentative. The Rabbit stands for the soft side of Wood: flexible, sensitive to its surroundings, quick to retreat from danger and just as quick to return. It is a creature of the burrow, so it also stands for home, safety and the instinct to arrange a comfortable place.'],
            ['Qualities traditionally associated', 'Gentle, tactful, aesthetic, perceptive and cautious. The tradition credits the Rabbit with a good eye for beauty and for the mood in a room.'],
            ['Strengths', 'Diplomacy, graceful handling of tense situations, creativity, and a talent for creating calm. The Rabbit often sees the fine detail that changes the outcome.'],
            ['Challenges', 'Avoidance. The Rabbit\'s answer to conflict is to step aside, and a pattern of stepping aside can turn into indecision or into resentment that is never spoken. Sensitivity can also slide into worry.'],
            ['People and relationships', 'Considerate, thoughtful, and happiest in a settled circle of people it trusts. It tends to be a peacemaker, and its difficulty is saying a plain no.'],
            ['Work and motivation', 'Roles involving care, design, mediation, teaching or any craft where refinement counts. The motivation is harmony, and the sense that things are done properly and kindly.'],
        ],
        related: ['concept:year-animal', 'library:animals', 'branch:mao', 'element:wood'],
        boundary: 'These are traditional associations for the Rabbit archetype, not measured traits, and the Year Animal is only one character of a chart.',
    }),
    entry({
        id: 'animal:dragon', kind: 'animal', title: 'Dragon', subtitle: 'The fifth animal, the only mythical one',
        lead: 'The Dragon is the one zodiac animal nobody has ever seen. In China it is not a monster but a benevolent power: it brings rain, governs rivers and clouds, and was for two thousand years the emblem of the emperor himself.',
        sections: [
            ['What it stands for', 'The Chen branch is the end of spring, when the season is saturated with rain and everything is expanding. Chen is Earth, a place where Water and Wood are stored, which is why the Dragon is a creature of the swelling river and the full field. It stands for vitality that is larger than the individual, for ambition on a grand scale and for luck that favours the bold.'],
            ['Qualities traditionally associated', 'Energetic, charismatic, ambitious, proud and generous. The Dragon is credited with presence: people notice when one enters a room.'],
            ['Strengths', 'Vision, drive, courage, an ability to inspire others, and a readiness to take on projects that would frighten most people.'],
            ['Challenges', 'Pride and impatience. The Dragon can find it hard to accept that others work at a smaller scale or a slower rhythm, and a high self-expectation can turn into perfectionism or into arrogance. The tradition notes that a Dragon with nobody to answer to is a danger to itself.'],
            ['People and relationships', 'Loyal and protective of those it admires, with high standards for others and itself. It tends to dominate a room without intending to, so it often has to learn to listen deliberately.'],
            ['Work and motivation', 'Leadership, enterprise, invention and any role where there is room for ambition. The motivation is to make something remarkable, and to be recognised for it.'],
        ],
        related: ['concept:year-animal', 'library:animals', 'branch:chen', 'element:earth'],
        boundary: 'These are traditional associations for the Dragon archetype, not measured traits, and the Year Animal is only one character of a chart.',
    }),
    entry({
        id: 'animal:snake', kind: 'animal', title: 'Snake', subtitle: 'The sixth animal, quiet wisdom',
        lead: 'The Snake is the zodiac\'s thinker. Sometimes called the little dragon, it moves without noise, sheds its skin to grow and waits before it acts. In China it is not a villain: it is a symbol of wisdom, of renewal and of the unseen.',
        sections: [
            ['What it stands for', 'The Si branch begins the summer. The Snake is Yin Fire: not the blaze of noon but the concentrated heat of a banked fire or of a stone warmed through. It stands for intelligence that works inwardly, for the capacity to change shape when the old one is outgrown, and for intuition.'],
            ['Qualities traditionally associated', 'Analytical, private, perceptive, composed and determined. The tradition credits the Snake with a magnetic calm and with a talent for reading people.'],
            ['Strengths', 'Concentration, strategy, discernment, and the patience to wait for the right moment. The Snake is often the best planner in the room.'],
            ['Challenges', 'Secrecy and suspicion. The Snake\'s privacy can be mistaken for coldness, and a habit of keeping its own counsel can leave others guessing. Jealousy and a reluctance to admit doubt are the traditional faults.'],
            ['People and relationships', 'Selective and deep: a small number of people are let in, and they are held with great loyalty. Trust is earned slowly and, once lost, rarely restored.'],
            ['Work and motivation', 'Research, strategy, craft, healing, finance and anywhere that careful judgement beats speed. The motivation is mastery and understanding, with the sense of control that goes with them.'],
        ],
        related: ['concept:year-animal', 'library:animals', 'branch:si', 'element:fire'],
        boundary: 'These are traditional associations for the Snake archetype, not measured traits, and the Year Animal is only one character of a chart.',
    }),
    entry({
        id: 'animal:horse', kind: 'animal', title: 'Horse', subtitle: 'The seventh animal, freedom and movement',
        lead: 'The Horse is the animal of motion. In Chinese culture it stands for speed, endurance and independence, and for a spirit that does badly in a stall. Its branch, Wu, sits exactly at the top of the day and of the year.',
        sections: [
            ['What it stands for', 'Wu is noon, the one moment when the sun is at its highest and Yang is at its fullest, and in the calendar it is midsummer. Everything about the Horse follows from that peak: it is open, bright, warm and visible, and it has the restless energy of something that has reached its height and has to keep moving. The Horse was also the engine of the old empire: its image stands for travel, for messages that cross a continent, and for the energy to get somewhere.'],
            ['Qualities traditionally associated', 'Energetic, independent, sociable, quick-witted, and direct. The Horse is credited with an easy warmth and a love of open space, whether physical or personal.'],
            ['Strengths', 'Enthusiasm that others catch, stamina, optimism, a talent for communicating, and the courage to set off. The Horse is often the person who gets a group moving.'],
            ['Challenges', 'Impatience and restlessness. The Horse can start more than it finishes, and its need for freedom can look like unreliability. A strong dislike of being restricted may make it resist good advice simply because it is advice. The tradition also notes that the Horse\'s openness is not the same as sensitivity to others\' limits.'],
            ['People and relationships', 'Friendly, expressive and quick to warm, but protective of its independence. It tends to do better with partners and friends who give it room and who will say plainly what they need.'],
            ['Work and motivation', 'Variety, travel, sales, performance, teaching, sport and anywhere that rewards energy and communication. The motivation is freedom and forward movement, with the satisfaction of seeing results quickly.'],
        ],
        related: ['concept:year-animal', 'library:animals', 'branch:wu', 'element:fire'],
        boundary: 'These are traditional associations for the Horse archetype, not measured traits, and the Year Animal is only one character of a chart.',
    }),
    entry({
        id: 'animal:goat', kind: 'animal', title: 'Goat', subtitle: 'The eighth animal, gentleness and imagination',
        lead: 'The Goat, which the tradition also calls the Sheep or the Ram, is the zodiac\'s gentle creative spirit. The Chinese character for it is the same one found in words for beauty and goodness, which is a clue to how warmly the tradition regards it.',
        sections: [
            ['What it stands for', 'The Wei branch is the last month of summer, when the heat is heavy and the harvest is ripening. It is an Earth branch, so the Goat stands for the soft, nourishing side of the earth: pasture, shelter, the flock that lives in harmony. It carries a longing for peace and for a pleasant environment, and its calm can hide a great deal of imagination.'],
            ['Qualities traditionally associated', 'Gentle, empathetic, artistic, thoughtful and kind. The Goat is credited with a rich inner life and with a feel for atmosphere.'],
            ['Strengths', 'Compassion, creativity, tact, and the ability to make a place feel safe. The Goat often notices what others are feeling before they say it.'],
            ['Challenges', 'Over-sensitivity, indecision and a tendency to worry. The Goat can avoid confrontation until a problem is large, and can depend on others to take the lead. Tradition also warns of moodiness when it feels unappreciated.'],
            ['People and relationships', 'Devoted and affectionate, and happiest in a stable, warm circle. It gives a great deal to those it trusts and needs gentleness in return.'],
            ['Work and motivation', 'Creative and caring roles, arts, design, hospitality, counselling and teamwork. The motivation is to live and work in harmony, with enough security to feel at ease.'],
        ],
        related: ['concept:year-animal', 'library:animals', 'branch:wei', 'element:earth'],
        boundary: 'These are traditional associations for the Goat archetype, not measured traits, and the Year Animal is only one character of a chart.',
    }),
    entry({
        id: 'animal:monkey', kind: 'animal', title: 'Monkey', subtitle: 'The ninth animal, wit and invention',
        lead: 'The Monkey is the zodiac\'s trickster and inventor. Chinese literature\'s most famous Monkey, the hero of Journey to the West, is clever, disrespectful of rank, endlessly resourceful and in the end a loyal companion, which sums up how the tradition feels about the animal.',
        sections: [
            ['What it stands for', 'The Shen branch opens the autumn. It is Yang Metal, a tool rather than a finished blade: sharp, practical, ready to be used on whatever problem arrives. The Monkey stands for the intelligence that experiments, the flexibility to switch method and the humour that comes with seeing how things can be rearranged.'],
            ['Qualities traditionally associated', 'Clever, curious, playful, versatile and quick. The Monkey is credited with a gift for solving problems nobody expected to be solved.'],
            ['Strengths', 'Inventiveness, adaptability, a quick mind, a sense of humour and the confidence to improvise. The Monkey tends to learn by doing.'],
            ['Challenges', 'Restlessness, boredom, and a streak of mischief that can turn into carelessness. Cleverness may be used to avoid effort, and the tradition sometimes calls the Monkey unreliable when it should be calling it under-stimulated.'],
            ['People and relationships', 'Entertaining, sociable and generous with ideas. It tends to like people who can keep up with it, and to need partners who are not threatened by its independence.'],
            ['Work and motivation', 'Technology, trade, design, research, the media, anything that rewards ingenuity and variety. The motivation is stimulation and the pleasure of cracking a problem.'],
        ],
        related: ['concept:year-animal', 'library:animals', 'branch:shen', 'element:metal'],
        boundary: 'These are traditional associations for the Monkey archetype, not measured traits, and the Year Animal is only one character of a chart.',
    }),
    entry({
        id: 'animal:rooster', kind: 'animal', title: 'Rooster', subtitle: 'The tenth animal, precision and presence',
        lead: 'The Rooster greets the day. It crows at dawn, it keeps time for the farm, and the zodiac gives it the evening hour: the animal of punctuality, of pride in appearance and of saying exactly what it sees.',
        sections: [
            ['What it stands for', 'You is the middle of autumn and the hour of sunset, the moment when the day\'s work is gathered in. It is Yin Metal, a finished and polished thing: jewellery rather than an axe. The Rooster stands for discernment, for standards, for appearance that has been prepared with care and for the courage to announce what it believes.'],
            ['Qualities traditionally associated', 'Observant, meticulous, hard-working, candid and proud. The Rooster is credited with a flair for display and with a precise, organised mind.'],
            ['Strengths', 'Attention to detail, honesty, dedication, organisational talent and the confidence to speak. The Rooster notices what is out of place.'],
            ['Challenges', 'Criticism and perfectionism. The same eye that sees what is wrong can be sharply turned on others, and the Rooster\'s pride can make it defensive when corrected. The tradition also notes a tendency to boast and a difficulty relaxing.'],
            ['People and relationships', 'Loyal, frank and protective, with a strong sense of what is proper. It is at its best with people who appreciate directness and at its worst when it has to hold its tongue.'],
            ['Work and motivation', 'Roles that call for accuracy, presentation, planning, finance, medicine or performance. The motivation is to do things properly and to be acknowledged for the care taken.'],
        ],
        related: ['concept:year-animal', 'library:animals', 'branch:you', 'element:metal'],
        boundary: 'These are traditional associations for the Rooster archetype, not measured traits, and the Year Animal is only one character of a chart.',
    }),
    entry({
        id: 'animal:dog', kind: 'animal', title: 'Dog', subtitle: 'The eleventh animal, loyalty and conscience',
        lead: 'The Dog is the guardian of the zodiac. In Chinese tradition it is not merely a pet but the watcher at the gate: honest, protective, and uncomfortable around injustice.',
        sections: [
            ['What it stands for', 'The Xu branch is the late autumn and the hour when the day is closing and the household is secured. Xu is Earth, the storehouse of Fire, so it holds the last warmth before winter. The Dog stands for fidelity, for the impulse to protect, for a clear moral compass and for the simple loyalty of showing up.'],
            ['Qualities traditionally associated', 'Loyal, honest, responsible, fair-minded and watchful. The Dog is credited with a strong sense of duty and a sensitivity to wrong.'],
            ['Strengths', 'Dependability, courage in defence of others, a straightforward manner and a gift for friendship. The Dog is one of the animals people trust first.'],
            ['Challenges', 'Anxiety, cynicism and a tendency to expect the worst. Because it watches for danger, the Dog can see danger where there is none, and its strong principles can harden into judgement. It is also described as a poor delegator: it would rather do it itself.'],
            ['People and relationships', 'Faithful and generous in friendship, and slow to trust at first. It stands up for the people it loves and is hurt by betrayal more than most.'],
            ['Work and motivation', 'Public service, law, education, care, security, advocacy: roles with a moral centre. The motivation is to make things fair and to be of real use.'],
        ],
        related: ['concept:year-animal', 'library:animals', 'branch:xu', 'element:earth'],
        boundary: 'These are traditional associations for the Dog archetype, not measured traits, and the Year Animal is only one character of a chart.',
    }),
    entry({
        id: 'animal:pig', kind: 'animal', title: 'Pig', subtitle: 'The twelfth animal, generosity and appetite',
        lead: 'The Pig closes the zodiac. In the old story it was late because it stopped to eat and sleep, and in the tradition that is not a failing but a character: the Pig knows how to enjoy things. It is the emblem of abundance, of a full table and of sincerity that has nothing to hide.',
        sections: [
            ['What it stands for', 'The Hai branch is the start of winter and the hour of rest at the end of the day. It is Yin Water, the still, deep water that stores what has been gathered. The Pig stands for generosity, for contentment, for the body\'s pleasures and for the trust that makes it easy to be around.'],
            ['Qualities traditionally associated', 'Warm, sincere, tolerant, easy-going and hospitable. The Pig is credited with a big heart and an uncomplicated honesty.'],
            ['Strengths', 'Generosity, loyalty, patience, a talent for hospitality and an ability to enjoy life without guilt. The Pig tends to give people the benefit of the doubt.'],
            ['Challenges', 'Naivety and overindulgence. Trusting easily can leave the Pig open to being taken advantage of, and its taste for comfort may become a reluctance to face hard choices. It can also avoid conflict by giving in.'],
            ['People and relationships', 'Affectionate and forgiving, and happiest around a table with people it loves. It needs partners who value its kindness and do not exploit it.'],
            ['Work and motivation', 'Hospitality, care, the arts, trade, anything that serves people directly. The motivation is to enjoy a good life and to share it, with enough security to relax in.'],
        ],
        related: ['concept:year-animal', 'library:animals', 'branch:hai', 'element:water'],
        boundary: 'These are traditional associations for the Pig archetype, not measured traits, and the Year Animal is only one character of a chart.',
    }),
];
