export const ARTICLES = [
    {
        id: 'human-design.foundations.what-human-design-is',
        library: 'human-design',
        category: 'foundations',
        title: 'What Human Design is',
        summary: 'A modern synthesis system, first set out in 1987, that combines Western astrology, the I Ching, the Kabbalistic Tree of Life and the chakra system into a single chart called the BodyGraph.',
        keywords: ['Ra Uru Hu', 'Alan Robert Krakower', '1987', 'Rave chart', 'synthesis system'],
        sections: [
            {
                id: 'origins',
                heading: 'Origins',
                paragraphs: [
                    'Human Design is young by the standards of the traditions it draws on. Its founder, the Canadian-born Alan Robert Krakower, who later took the name Ra Uru Hu, said that the system was dictated to him over eight days on Ibiza in January 1987. He spent the following decades teaching it, naming its parts and building the training organisations through which most of its vocabulary still circulates.',
                    'The account of its origin is part of the system’s own story rather than something that can be checked. An encyclopedia can report it, and report that the system has no standing in science, without having to settle what happened on Ibiza.',
                ],
            },
            {
                id: 'ingredients',
                heading: 'What it combines',
                list: [
                    'Astrology supplies the calculation: the positions of the Sun, Moon, lunar nodes and planets at two moments, read on the tropical zodiac.',
                    'The I Ching supplies the alphabet: its sixty-four hexagrams become the sixty-four gates, and their six lines become the six lines of every activation.',
                    'The Kabbalistic Tree of Life supplies much of the geometry: a figure of linked nodes and paths that the BodyGraph’s centres and channels echo.',
                    'The chakra system supplies the idea of centres stacked along the body, though Human Design counts nine of them where the chakra model has seven.',
                ],
            },
            {
                id: 'in-the-app',
                heading: 'How the app calculates it',
                paragraphs: [
                    'A chart needs a birth date, time and place and nothing else. The app computes the planetary positions on the device, finds the second, earlier moment the system calls the Design, maps both sets of positions onto the gate wheel and derives everything else - Type, Strategy, Authority, Profile, definition - from which channels are complete. No outside service is consulted, and when the birth time is only estimated the app says which results would change within the uncertainty (see [[synthesis.guide.birth-time-precision]]).',
                ],
            },
            {
                id: 'status',
                heading: 'How to read it',
                paragraphs: [
                    'The founder framed parts of the system in the language of physics and genetics, including claims about neutrinos and about the sixty-four codons of DNA. Those claims are not supported by the sciences they borrow from. This library treats Human Design as what it demonstrably is: a structured interpretive framework with internal rules, a precise vocabulary and a coherent logic of its own, read for reflection rather than as a measurement of a person ([[synthesis.guide.symbolic-frameworks]]).',
                ],
            },
        ],
        related: ['human-design.foundations.the-bodygraph', 'human-design.foundations.personality-and-design', 'synthesis.pillar.human-design', 'synthesis.guide.symbolic-frameworks', 'synthesis.guide.how-the-systems-differ'],
    },
    {
        id: 'human-design.foundations.the-bodygraph',
        library: 'human-design',
        category: 'foundations',
        title: 'The BodyGraph',
        summary: 'The chart at the heart of Human Design: nine centres joined by thirty-six channels, with sixty-four gates at the channel ends, coloured in or left white according to two sets of planetary positions.',
        keywords: ['Body Graph', 'Rave chart', 'gate wheel', 'mandala'],
        sections: [
            {
                id: 'anatomy',
                heading: 'Anatomy of the chart',
                paragraphs: [
                    'The BodyGraph is drawn as a human outline holding nine geometric shapes - the centres - connected by thirty-six channels. Every channel has a gate at each end, and the gates sit on the edge of a centre, so the sixty-four gates are distributed unevenly: the Throat carries eleven, the Ego only four.',
                    'A gate is activated when a planet in either of the chart’s two calculations falls in its slice of the zodiac. When both gates of a channel are activated, the channel is complete, and both centres it joins become defined and are coloured in. Everything else in the chart is read from that single rule.',
                ],
            },
            {
                id: 'the-wheel',
                heading: 'The gate wheel',
                paragraphs: [
                    'Around the BodyGraph runs a wheel that divides the 360 degrees of the zodiac into sixty-four equal slices of 5.625 degrees, one per gate. The order is the system’s own, not the traditional numbering of the I Ching: in the app’s frame the wheel begins at 302 degrees, early in Aquarius, with gate 41.',
                    'Each gate slice is divided again into six lines, each line into six colours, each colour into six tones and each tone into five bases. The line matters for Profiles; the finer layers matter mainly for the [[human-design.foundations.variables|Variables]].',
                ],
            },
            {
                id: 'reading-order',
                heading: 'Order of reading',
                paragraphs: [
                    'Practitioners usually read a BodyGraph from the general to the particular. Type comes first, because it rests on the chart’s two broadest questions: is the Sacral coloured in, and does any motor have an unbroken route to the Throat? Strategy and Authority come next, then Profile and definition, then the individual centres, channels and gates. The [[human-design.foundations.defined-and-open|defined and open]] centres sit across all of these layers, since every other result is built from them.',
                ],
            },
        ],
        related: ['human-design.foundations.what-human-design-is', 'human-design.foundations.defined-and-open', 'human-design.center.throat', 'human-design.channel.20-34', 'human-design.gate.41'],
    },
    {
        id: 'human-design.foundations.personality-and-design',
        library: 'human-design',
        category: 'foundations',
        title: 'Personality and Design',
        summary: 'Every chart is calculated twice: once for the moment of birth (the conscious Personality) and once for the moment the Sun stood 88 degrees of arc earlier, roughly three months before (the unconscious Design).',
        keywords: ['conscious', 'unconscious', 'black and red', '88 degrees', 'Design calculation', 'activations'],
        sections: [
            {
                id: 'two-moments',
                heading: 'Two moments, two columns',
                paragraphs: [
                    'The Personality is the sky at birth. The Design is found by stepping back along the Sun’s path by exactly 88 degrees of solar arc. Because the Sun’s daily motion varies slightly through the year, the Design moment lands somewhere between about 86 and 92 days before birth; the app solves for it precisely rather than counting a fixed number of days.',
                    'Each moment produces thirteen activations: the Sun, the Earth (always the point opposite the Sun), the Moon, the North and South Nodes, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune and Pluto. Charts list them in two columns, traditionally printed in black for the Personality and in red for the Design.',
                ],
            },
            {
                id: 'meaning',
                heading: 'What each side stands for',
                paragraphs: [
                    'The system reads the Personality as the part of the design a person can recognise in themselves - the traits they would name if asked. The Design is read as the part that operates out of view: often obvious to others, rarely to the person, and in the system’s telling closely tied to the body. A gate activated in black is something identified with; one activated in red is something lived without being claimed.',
                    'A gate activated on both sides is drawn striped and counts once for definition. A channel can be completed by one gate from each side, which the system reads as a conscious and an unconscious theme meeting in a single circuit.',
                ],
            },
            {
                id: 'where-it-shows',
                heading: 'Where the split shows up',
                paragraphs: [
                    'Several results depend directly on the two columns. The [[human-design.foundations.incarnation-cross|Incarnation Cross]] takes the Sun and Earth gates from both sides. The Profile pairs the line of the Personality Sun with the line of the Design Sun, which is why a [[human-design.profile.5-1|5/1]] and a 1/5 are not the same thing - the second does not exist at all. The four Variable arrows read the Sun and North Node of each side.',
                ],
            },
        ],
        related: ['human-design.foundations.the-bodygraph', 'human-design.foundations.incarnation-cross', 'human-design.profile.1-3', 'human-design.foundations.variables', 'synthesis.guide.birth-time-precision'],
    },
    {
        id: 'human-design.foundations.defined-and-open',
        library: 'human-design',
        category: 'foundations',
        title: 'Defined and open centres',
        summary: 'A centre joined to another by at least one complete channel is defined and coloured in; a centre with no complete channel is undefined, or open, and left white. The system reads the first as consistent and the second as receptive.',
        keywords: ['defined centre', 'undefined centre', 'open centre', 'conditioning', 'white centre'],
        sections: [
            {
                id: 'the-rule',
                heading: 'The rule',
                paragraphs: [
                    'Definition is binary at the level of the centre. A single complete channel is enough to define both of its centres, and no number of loose gates can define one. A centre with three hanging gates and no completed channel is just as white on the chart as a centre with none.',
                    'Some teachers draw a finer line between an undefined centre, which has at least one activated gate, and a completely open centre, which has none. The app reports defined or not, and treats the further distinction as a matter of interpretation.',
                ],
            },
            {
                id: 'two-readings',
                heading: 'Fixed and receptive',
                paragraphs: [
                    'The system reads a defined centre as a reliable, self-generated way of operating in that centre’s theme: it works the same way regardless of company. An open centre is read as a place where the person takes in the definition of whoever is nearby and experiences it, often more intensely than its source. Someone with an open Solar Plexus in a room of anxious people is, in this picture, feeling the room.',
                    'Neither state is better. An open centre is described as a source of perspective and discernment as well as of pressure - the place where a person can learn to recognise a theme in all its variety precisely because they do not own a fixed version of it.',
                ],
            },
            {
                id: 'conditioning',
                heading: 'Conditioning',
                paragraphs: [
                    '“Conditioning” is the system’s word for the influence that arrives through open centres: the pressure of other people’s timing, emotions, will or ideas, taken on as if they were one’s own. Much of the practice of Human Design is framed as noticing that conditioning, which links this topic directly to the idea of the [[human-design.foundations.not-self-and-signature|not-self]].',
                ],
            },
        ],
        related: ['human-design.foundations.the-bodygraph', 'human-design.foundations.not-self-and-signature', 'human-design.center.solar-plexus', 'human-design.definition.single', 'human-design.type.reflector'],
    },
    {
        id: 'human-design.foundations.not-self-and-signature',
        library: 'human-design',
        category: 'foundations',
        title: 'Not-self and Signature',
        summary: 'Each Type is paired with a Signature, a feeling the system treats as a sign of alignment, and a not-self theme, a feeling it treats as a signal that a person is living out of step with their design.',
        keywords: ['Signature', 'not-self theme', 'satisfaction', 'peace', 'success', 'surprise', 'frustration', 'anger', 'bitterness', 'disappointment', 'deconditioning'],
        sections: [
            {
                id: 'the-pairs',
                heading: 'The five pairs',
                list: [
                    '[[human-design.type.manifestor|Manifestor]]: Signature peace; not-self theme anger.',
                    '[[human-design.type.generator|Generator]]: Signature satisfaction; not-self theme frustration.',
                    '[[human-design.type.manifesting-generator|Manifesting Generator]]: the same pair as the Generator, satisfaction and frustration; some teachers add anger as a secondary note.',
                    '[[human-design.type.projector|Projector]]: Signature success; not-self theme bitterness.',
                    '[[human-design.type.reflector|Reflector]]: Signature surprise; not-self theme disappointment.',
                ],
            },
            {
                id: 'how-they-work',
                heading: 'How the pairs are used',
                paragraphs: [
                    'Signature and not-self theme work as a feedback pair rather than as a description of character. A Generator is not expected to feel satisfied all the time; frustration that keeps recurring is read as information, a hint that the person has been initiating where the system says they would do better to respond. Each Type’s strategy is presented as the way to move from one end of its pair towards the other.',
                    'The wider idea of the not-self covers more than the five feelings. The system pictures the mind, conditioned through open centres, steering decisions it is not built to make - and the not-self as the life that results.',
                ],
            },
            {
                id: 'deconditioning',
                heading: 'Deconditioning',
                paragraphs: [
                    'Practitioners call the gradual process of noticing that conditioning “deconditioning”, and the tradition gives it a span of about seven years of living by Strategy and Authority. As with the rest of the system, this is a teaching about practice, not a measured outcome; its value is as a way of attending to recurring feelings, which is how a reader can use it without accepting every claim behind it.',
                ],
            },
        ],
        related: ['human-design.foundations.defined-and-open', 'human-design.strategy.respond', 'human-design.type.generator', 'human-design.type.projector', 'synthesis.guide.counter-evidence'],
    },
    {
        id: 'human-design.foundations.incarnation-cross',
        library: 'human-design',
        category: 'foundations',
        title: 'Incarnation Cross',
        summary: 'The four gates of the conscious and unconscious Sun and Earth, read together as a life theme. The app reports the cross’s angle - Right Angle, Juxtaposition or Left Angle - and its four gates, but does not name the cross.',
        keywords: ['cross', 'life purpose', 'Right Angle', 'Juxtaposition', 'Left Angle', 'Sun and Earth'],
        sections: [
            {
                id: 'four-gates',
                heading: 'Four gates',
                paragraphs: [
                    'The Sun is the most heavily weighted activation in Human Design, and the Earth, always 180 degrees away, is read as its grounding counterpart. Take the Sun and Earth from the Personality and the Sun and Earth from the Design and the result is four gates that sit in a cross on the wheel. The app writes them in that order, Personality pair first: a cross noted 1/2 | 7/13 has the conscious Sun in gate 1 and the unconscious Earth in gate 13.',
                    'Because two of the four gates are fixed by the Sun’s position at birth and the other two by its position 88 degrees earlier, the cross changes only as the Sun moves from one gate to the next - about every five or six days - and from one line to the next within that.',
                ],
            },
            {
                id: 'angles',
                heading: 'The three angles',
                paragraphs: [
                    'The angle of a cross follows from the Profile, not from the gates. The seven Profiles from 1/3 to 4/6 belong to the Right Angle, which the system calls personal destiny: a life whose theme is worked out largely through the person’s own process. The single Profile 4/1 is the Juxtaposition, described as a fixed and narrow course. The four Profiles from 5/1 to 6/3 belong to the Left Angle, described as transpersonal, a life whose theme unfolds through encounters with other people.',
                ],
            },
            {
                id: 'what-the-app-omits',
                heading: 'What the app leaves out',
                paragraphs: [
                    'In the wider literature each of the sixty-four Sun gates gives rise to a named cross at each angle, 192 names in all. Those names belong to a curated table the app does not hold, so it reports the angle and the gate numbers only. A reader can still work with that: the four gate articles, such as [[human-design.gate.1|gate 1]], say what each of the cross’s themes is about.',
                ],
            },
        ],
        related: ['human-design.foundations.personality-and-design', 'human-design.profile.4-1', 'human-design.profile.1-3', 'human-design.profile.6-2', 'human-design.line.4'],
    },
    {
        id: 'human-design.foundations.variables',
        library: 'human-design',
        category: 'foundations',
        title: 'Variables',
        summary: 'Four arrows beside the head of the BodyGraph - Determination, Environment, Motivation and Perspective - read from the colour and tone of the Sun and North Node on each side. An advanced and less established layer of the system.',
        keywords: ['arrows', 'Determination', 'Digestion', 'Environment', 'Motivation', 'Perspective', 'View', 'colour', 'tone', 'left and right orientation', 'PHS'],
        sections: [
            {
                id: 'the-arrows',
                heading: 'The four arrows',
                list: [
                    'Determination, also called Digestion: top left, from the Design Sun. Traditionally linked to how and when a person takes things in.',
                    'Environment: bottom left, from the Design North Node. The kind of surroundings the system says suit the person.',
                    'Motivation: top right, from the Personality Sun. The conscious reason that drives engagement.',
                    'Perspective, also called View: bottom right, from the Personality North Node. What the person tends to notice and how.',
                ],
            },
            {
                id: 'orientation',
                heading: 'Left and right',
                paragraphs: [
                    'Each arrow points one of two ways, and the direction comes from the tone of the activation. Tones 1 to 3 point the arrow left, which the system calls active, focused or strategic; tones 4 to 6 point it right, called receptive or peripheral. The colour, one to six, chooses which variant applies within the arrow. The app reports the colour and tone numbers and the direction, and does not name variants it has no table for.',
                ],
            },
            {
                id: 'cautions',
                heading: 'A layer to treat with care',
                paragraphs: [
                    'Variables sit at the far end of the system’s precision. A tone spans about a fortieth of a degree, which the Sun crosses in under an hour, so an error of minutes in a birth time can turn an arrow. The Node arrows are steadier, since the Node moves slowly. The teachings attached to them - diets, environments and the practices grouped under names such as Primary Health System - are a later and more contested addition, less consistently taught than Type or Authority, and best read after the basics ([[synthesis.guide.birth-time-precision]]).',
                ],
            },
        ],
        related: ['human-design.foundations.personality-and-design', 'human-design.foundations.the-bodygraph', 'human-design.foundations.incarnation-cross', 'synthesis.guide.birth-time-precision', 'synthesis.guide.counter-evidence'],
    },
];
