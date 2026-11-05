/*
 * THE SIXTY-FOUR GATES.
 * Centre placement follows the engine's channel table (human-design/data/hdChannels.ts); gate n is hexagram n of the
 * King Wen sequence; wheel positions follow human-design/data/hdGateWheel.ts with the wheel starting at 302° (2° Aquarius).
 * Names are the project-written gate names (knowledge/human-design/hdGates.ts), adjusted only where the original contained
 * a second-person pronoun (gates 10, 38 and 40).
 */
export const ARTICLES = [
    {
        id: 'human-design.gate.1',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 1 · Self-expression',
        summary: 'A G-centre gate numbered from Qian, the first hexagram, concerned with creative output whose reference point is internal rather than set by demand.',
        glyph: '1',
        keywords: ['Qian', 'The Creative', 'hexagram 1', 'creative individuality', 'G centre', 'direction gates'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.g|G (Identity)]]',
                    'Channel: [[human-design.channel.1-8]], completed by [[human-design.gate.8|Gate 8]] in the Throat',
                    'Hexagram: 1, Qian (The Creative), six unbroken lines',
                    'Wheel position: mid-Scorpio',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Qian is the only hexagram built entirely of solid lines, and the gate carrying its number inherits the image of a force that needs nothing outside itself to begin. In the BodyGraph this becomes self-sourced creativity: a body of work, a style or a way of seeing whose standard is set from within. Its mark is less novelty than consistency — the output keeps bearing the same signature over years, watched or not.',
                    'The G centre’s eight gates fall into two sets of four. Gates 1, 2, 7 and 13 make up the Right Angle Cross of the Sphinx and are read as the direction half of the centre; Gates 10, 15, 25 and 46 form the Vessel of Love. Gate 1’s share of the direction theme is the sense that a life has a creative heading of its own.',
                ],
            },
            {
                id: 'activation',
                heading: 'When activated',
                paragraphs: [
                    'As a Personality activation the gate tends to be something its owner can name and defend. On the Design side it is often less articulate, and other people notice the distinctive mark first. Without Gate 8 the gate hangs open: the impulse is fixed, but its route to the Throat and to an audience is not, so a collaborator or transit carrying 8 can make the work suddenly feel public.',
                ],
            },
        ],
        related: ['human-design.center.g', 'human-design.channel.1-8', 'human-design.gate.8', 'human-design.gate.2', 'human-design.foundations.personality-and-design'],
    },
    {
        id: 'human-design.gate.2',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 2 · Direction',
        summary: 'The receptive pole of the G centre, numbered from Kun, the hexagram of the yielding earth: a heading that is sensed rather than plotted.',
        glyph: '2',
        keywords: ['Kun', 'The Receptive', 'hexagram 2', 'orientation', 'steering', 'G centre'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.g|G (Identity)]]',
                    'Channel: [[human-design.channel.2-14]], completed by [[human-design.gate.14|Gate 14]] in the Sacral',
                    'Hexagram: 2, Kun (The Receptive), six broken lines',
                    'Wheel position: mid-Taurus',
                ],
            },
            {
                id: 'in-the-bodygraph',
                heading: 'In the BodyGraph',
                paragraphs: [
                    'Where [[human-design.gate.1|Gate 1]] starts things, Gate 2 concerns where they are headed. Kun is the classical figure of receptivity — the field that brings to completion what the sky initiates — and the gate reads accordingly. Its orientation tends to arrive already settled, without a chain of reasons attached. Practitioners often compare it to a rudder: it steers well and supplies none of the propulsion.',
                    'The propulsion belongs to the partner. Gate 14 in the Sacral contributes working power and resources, and the pair forms a channel linking identity to the body’s main generating motor.',
                ],
            },
            {
                id: 'open-end',
                heading: 'Activation and the open end',
                paragraphs: [
                    'Held alone, Gate 2 is a hanging gate. The person may carry a firm sense of the right heading while relying on outside means — funding, partners, other people’s Sacral capacity — to travel it. The system does not treat that reliance as a weakness; it simply shows where the gate looks for its complement. A Design activation here is often described as arriving in the right places without remembering having chosen them.',
                ],
            },
        ],
        related: ['human-design.center.g', 'human-design.channel.2-14', 'human-design.gate.14', 'human-design.gate.1', 'human-design.foundations.defined-and-open'],
    },
    {
        id: 'human-design.gate.3',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 3 · Beginning in difficulty',
        summary: 'A Sacral gate keyed to Zhun, the hexagram of a sprout forcing its way through hard ground, which supplies staying power to things that are new and still disordered.',
        glyph: '3',
        keywords: ['Zhun', 'Difficulty at the Beginning', 'hexagram 3', 'innovation', 'ordering', 'mutation'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.sacral|Sacral]]',
                    'Channel: [[human-design.channel.3-60]], completed by [[human-design.gate.60|Gate 60]] in the Root',
                    'Hexagram: 3, Zhun (Difficulty at the Beginning)',
                    'Wheel position: straddling the Aries–Taurus cusp',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'The Chinese character for Zhun shows a blade of grass bent where it breaks the soil. That image suits a Sacral gate whose work is the untidy first stage of anything new: the period when nothing yet has a settled form and most attempts fail. Gate 3 brings sustained physical capacity to that phase, together with a tolerance for living inside confusion while order slowly emerges.',
                    'Because the Sacral is a motor, the gate does not merely notice disorder; it can keep working on it. Its rhythm is often described as pulsed — periods when the new thing will not move at all, then sudden progress.',
                ],
            },
            {
                id: 'activation',
                heading: 'Reading the activation',
                paragraphs: [
                    'Paired with [[human-design.gate.60|Gate 60]], the gate is fed by the Root’s pressure and shaped by its acceptance of limits. Without that partner the drive to innovate is present but less anchored, and a person with a hanging 3 often finds that the structure for their new ideas comes through other people or particular periods rather than from within.',
                ],
            },
        ],
        related: ['human-design.center.sacral', 'human-design.channel.3-60', 'human-design.gate.60', 'human-design.type.generator'],
    },
    {
        id: 'human-design.gate.4',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 4 · The answer offered',
        summary: 'An Ajna gate numbered from Meng, the hexagram of inexperience, which produces candidate explanations in response to the Head’s doubt.',
        glyph: '4',
        keywords: ['Meng', 'Youthful Folly', 'hexagram 4', 'formulation', 'hypothesis', 'logical mind'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.ajna|Ajna]]',
                    'Channel: [[human-design.channel.4-63]], completed by [[human-design.gate.63|Gate 63]] in the Head',
                    'Hexagram: 4, Meng (Youthful Folly)',
                    'Wheel position: Leo',
                ],
            },
            {
                id: 'the-answer',
                heading: 'Answers as drafts',
                paragraphs: [
                    'Head gate 63 supplies the nagging question; Gate 4 is where the Ajna turns that pressure into a formula — a provisional account of how something works. The gate is quick to produce such accounts and, in the system’s logic, is not responsible for whether they are true. Testing belongs to time and to other people.',
                    'There is a pointed irony in the hexagram. Meng is about the untaught student who must come asking, and the gate that bears its number is the one most ready with explanations. Read together, they suggest treating each answer from Gate 4 as a first draft by an apprentice: useful, often clever, and unfinished.',
                ],
            },
            {
                id: 'activation',
                heading: 'Personality, Design and the open end',
                paragraphs: [
                    'Activated in Personality, the gate is heard in the person’s own deliberate reasoning. In Design it tends to surface as explanations offered mid-conversation, almost before thought. With no Gate 63 present, it hangs: answers are ready but the questions arrive from outside, from others’ puzzles or from transits.',
                ],
            },
        ],
        related: ['human-design.center.ajna', 'human-design.channel.4-63', 'human-design.gate.63', 'human-design.authority.mental-environmental', 'human-design.foundations.personality-and-design'],
    },
    {
        id: 'human-design.gate.5',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 5 · Rhythm',
        summary: 'A Sacral gate keyed to Xu, the hexagram of waiting for the right moment, associated with fixed personal timing and the habits that carry it.',
        glyph: '5',
        keywords: ['Xu', 'Waiting', 'hexagram 5', 'fixed patterns', 'timing', 'habit'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.sacral|Sacral]]',
                    'Channel: [[human-design.channel.5-15]], completed by [[human-design.gate.15|Gate 15]] in the G centre',
                    'Hexagram: 5, Xu (Waiting)',
                    'Wheel position: Sagittarius',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Xu shows clouds rising into the sky before rain: there is nothing to do but eat, drink and wait until the weather turns. The gate reads that image as timing built into the body. Sleep, meals, work hours and the order in which things are done settle into a pattern that the Sacral then supplies with steady power.',
                    'Its counterpart in the G centre, Gate 15, tolerates every kind of rhythm. Gate 5 keeps one, and the channel they form brings an individual pattern into contact with the wider flow of other people’s lives.',
                ],
            },
            {
                id: 'activation',
                heading: 'In a chart',
                paragraphs: [
                    'Practitioners usually read disruption of the pattern as the gate’s main stress point rather than any lack of energy. When Gate 15 is missing, the gate hangs, and the person may hold a strong private routine while finding that it only connects with a larger rhythm — a household, a team, a season — through others who carry 15.',
                ],
            },
        ],
        related: ['human-design.center.sacral', 'human-design.channel.5-15', 'human-design.gate.15', 'human-design.strategy.respond'],
    },
    {
        id: 'human-design.gate.6',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 6 · Friction at the boundary',
        summary: 'A Solar Plexus gate numbered from Song, the hexagram of conflict, that governs emotionally whether contact and intimacy go ahead.',
        glyph: '6',
        keywords: ['Song', 'Conflict', 'hexagram 6', 'intimacy', 'emotional boundary', 'Solar Plexus'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.solar-plexus|Solar Plexus]]',
                    'Channel: [[human-design.channel.6-59]], completed by [[human-design.gate.59|Gate 59]] in the Sacral',
                    'Hexagram: 6, Song (Conflict)',
                    'Wheel position: late Virgo',
                ],
            },
            {
                id: 'membrane',
                heading: 'A membrane, not a wall',
                paragraphs: [
                    'Gate 6 is often described as the Solar Plexus’s membrane: it opens or closes depending on where the emotional wave stands. Friction is how it tests contact. A disagreement, a cooling, a demand for clearer terms — these are the gate checking whether closeness is wanted before it lets anything through.',
                    'Song, the classical hexagram, advises stopping a dispute halfway rather than pressing it to a verdict. The parallel is close. The gate works best when its friction is allowed to clarify a situation and then subside, not when every tension is driven to an outcome.',
                ],
            },
            {
                id: 'activation',
                heading: 'Activation',
                paragraphs: [
                    'A defined Gate 6 adds weight to the Solar Plexus, and since that centre outranks every other inner authority, decisions about closeness are usually read as needing time across the wave. Without Gate 59 the gate hangs; the readiness to let someone in is there, but the Sacral drive to initiate contact tends to come from the other person.',
                ],
            },
        ],
        related: ['human-design.center.solar-plexus', 'human-design.channel.6-59', 'human-design.gate.59', 'human-design.authority.emotional'],
    },
    {
        id: 'human-design.gate.7',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 7 · The role in front',
        summary: 'A G-centre gate keyed to Shi, the hexagram of the army, describing leadership as a role a group grants rather than one taken.',
        glyph: '7',
        keywords: ['Shi', 'The Army', 'hexagram 7', 'leadership role', 'guidance', 'direction gates'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.g|G (Identity)]]',
                    'Channel: [[human-design.channel.7-31]], completed by [[human-design.gate.31|Gate 31]] in the Throat',
                    'Hexagram: 7, Shi (The Army)',
                    'Wheel position: mid-Leo',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'The hexagram pictures water hidden beneath the earth — a body of people who become a force only when organised. Shi is less about fighting than about discipline and the choice of a seasoned commander. Gate 7 takes up that question of who should lead and in which direction.',
                    'As one of the G centre’s direction gates, it carries a sense of where a collective ought to go. The role is not the loudest voice; it is the person whose orientation others are willing to follow. The authority of Gate 7 rests on being recognised, which is why practitioners treat it as quietly influential even when it sits outside formal positions.',
                ],
            },
            {
                id: 'activation',
                heading: 'Activated and hanging',
                paragraphs: [
                    'Paired with Gate 31, the gate gains a voice: direction becomes something said aloud. Alone, Gate 7 can hold a clear idea of the right course without the Throat connection to declare it, and it may find itself shaping events through a spokesperson rather than speaking directly.',
                ],
            },
        ],
        related: ['human-design.center.g', 'human-design.channel.7-31', 'human-design.gate.31', 'human-design.gate.13', 'human-design.type.projector'],
    },
    {
        id: 'human-design.gate.8',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 8 · Contribution',
        summary: 'A Throat gate numbered from Bi, the hexagram of holding together, through which individual identity becomes a visible example to others.',
        glyph: '8',
        keywords: ['Bi', 'Holding Together', 'hexagram 8', 'example', 'contribution', 'Throat gate'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.throat|Throat]]',
                    'Channel: [[human-design.channel.1-8]], completed by [[human-design.gate.1|Gate 1]] in the G centre',
                    'Hexagram: 8, Bi (Holding Together)',
                    'Wheel position: late Taurus, touching Gemini',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Bi places water over earth: the water finds its level by settling into the ground it covers. The gate turns this into a question about belonging that does not require blending in. What Gate 8 makes available is a personal way of doing things presented openly, so that others can see it and take from it what they want.',
                    'That is a manifesting function of the Throat. The gate does not argue for its contribution; it shows it. In Human Design terms its influence comes from example — a finished piece, a lived choice, a way of working — rather than from persuasion.',
                ],
            },
            {
                id: 'activation',
                heading: 'In practice',
                paragraphs: [
                    'Without [[human-design.gate.1|Gate 1]] the gate is open-ended. There is an instinct to present something distinctive and a channel ready to carry it, yet the creative content may be supplied by collaborators. People with a hanging 8 are frequently drawn to promote, edit or publish the work of others.',
                ],
            },
        ],
        related: ['human-design.center.throat', 'human-design.channel.1-8', 'human-design.gate.1', 'human-design.foundations.defined-and-open'],
    },
    {
        id: 'human-design.gate.9',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 9 · The detail held',
        summary: 'A Sacral gate keyed to Xiao Chu, the hexagram of small accumulation, which lends sustained power to attention on one thing at a time.',
        glyph: '9',
        keywords: ['Xiao Chu', 'The Taming Power of the Small', 'Small Accumulating', 'hexagram 9', 'focus', 'concentration'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.sacral|Sacral]]',
                    'Channel: [[human-design.channel.9-52]], completed by [[human-design.gate.52|Gate 52]] in the Root',
                    'Hexagram: 9, Xiao Chu (The Taming Power of the Small)',
                    'Wheel position: early Sagittarius',
                ],
            },
            {
                id: 'hexagram',
                heading: 'The hexagram behind it',
                paragraphs: [
                    'Xiao Chu shows wind moving across the sky: clouds gather densely and the rain has not yet fallen. Five firm lines are held in check by a single yielding one. The figure is about small restraint that adds up, and the gate draws on that sense of progress made in increments.',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Gate 9 sits in the Sacral, so its focus is physical stamina directed at detail rather than an intellectual skill. The gate decides nothing about what deserves attention; it supplies the endurance to stay with whatever the person has responded to. Many of the qualities associated with craft — checking, refining, repeating — draw on this kind of power.',
                    'Its partner, Gate 52 in the Root, adds the pressure to keep still. Without it the gate is hanging: a capacity for concentration that comes and goes with circumstance, often steadied by working alongside someone who carries 52.',
                ],
            },
        ],
        related: ['human-design.center.sacral', 'human-design.channel.9-52', 'human-design.gate.52', 'human-design.gate.5'],
    },
    {
        id: 'human-design.gate.10',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 10 · Behaving as oneself',
        summary: 'The most connected gate in the G centre, keyed to Lü (Treading): conduct as the outward form of identity, linked to three different centres.',
        glyph: '10',
        keywords: ['Lü', 'Treading', 'Conduct', 'hexagram 10', 'self-love', 'integration channels'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.g|G (Identity)]]',
                    'Channels: [[human-design.channel.10-20]], [[human-design.channel.10-34]] and [[human-design.channel.10-57]]',
                    'Partner gates: [[human-design.gate.20|20]] (Throat), [[human-design.gate.34|34]] (Sacral), [[human-design.gate.57|57]] (Spleen)',
                    'Hexagram: 10, Lü (Treading)',
                    'Wheel position: Sagittarius–Capricorn cusp',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Lü pictures someone stepping on a tiger’s tail without being bitten. The safety lies in the manner of stepping, and that is the gate’s subject: behaviour. Gate 10 is where identity becomes visible in conduct — how a person acts when no rule decides the matter for them.',
                    'Of the G centre’s eight gates, four are traditionally gathered around love; Gate 10 is the one associated with love of oneself, meaning acceptance of one’s own way of being rather than vanity.',
                ],
            },
            {
                id: 'connections',
                heading: 'Three connections',
                paragraphs: [
                    'No other G gate reaches so far. Joined to 20 it gives conduct a voice in the present; joined to 34 it puts Sacral power behind conviction; joined to 57 it links behaviour to splenic instinct. Any one of the three partners defines the G centre through this gate, and charts holding several of them form part of the tightly linked group of channels around Gates 10, 20, 34 and 57. Where none of the three partners is present, the gate meets those connections through other people instead.',
                ],
            },
        ],
        related: ['human-design.center.g', 'human-design.channel.10-20', 'human-design.channel.10-34', 'human-design.channel.10-57', 'human-design.gate.15'],
    },
    {
        id: 'human-design.gate.11',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 11 · Ideas',
        summary: 'An Ajna gate numbered from Tai, the hexagram of peace and exchange, where the abstract mind stores images and possibilities for sharing.',
        glyph: '11',
        keywords: ['Tai', 'Peace', 'hexagram 11', 'ideas', 'images', 'abstract mind'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.ajna|Ajna]]',
                    'Channel: [[human-design.channel.11-56]], completed by [[human-design.gate.56|Gate 56]] in the Throat',
                    'Hexagram: 11, Tai (Peace)',
                    'Wheel position: late Sagittarius',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Tai turns the usual order upside down: heaven sits beneath earth, so the two move towards each other and meet. The tradition reads it as a season of easy exchange. Gate 11 brings that sense of circulation to the mind. Its ideas are pictures, scenarios and possibilities that gain value by being passed on rather than carried out.',
                    'This is an abstract, experiential part of the Ajna, interested in what an event might mean rather than whether a formula holds. The gate collects more material than any one life could use, and practitioners commonly advise treating the collection as a library for others rather than a to-do list.',
                ],
            },
            {
                id: 'activation',
                heading: 'Activation',
                paragraphs: [
                    'Gate 56 gives the ideas a storyteller’s outlet in the Throat. If 56 is missing the gate hangs, and its images may stay private until a conversation or a partner provides the right setting to voice them.',
                ],
            },
        ],
        related: ['human-design.center.ajna', 'human-design.channel.11-56', 'human-design.gate.56', 'human-design.gate.64'],
    },
    {
        id: 'human-design.gate.12',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 12 · Caution before speaking',
        summary: 'A Throat gate keyed to Pi, the hexagram of standstill, whose speech is shaped by mood and which knows when to hold back.',
        glyph: '12',
        keywords: ['Pi', 'Standstill', 'Stagnation', 'hexagram 12', 'restraint', 'articulation'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.throat|Throat]]',
                    'Channel: [[human-design.channel.12-22]], completed by [[human-design.gate.22|Gate 22]] in the Solar Plexus',
                    'Hexagram: 12, Pi (Standstill)',
                    'Wheel position: late Gemini',
                ],
            },
            {
                id: 'standstill',
                heading: 'Standstill as discipline',
                paragraphs: [
                    'Pi is the mirror of hexagram 11: heaven and earth draw apart and nothing passes between them. In classical commentary the wise response is withdrawal and restraint until the time changes. The gate translates this into the Throat as a capacity for not speaking — a reticence that guards the words for the moment they can land.',
                    'When the timing is right, Gate 12 can be unusually exact about feeling: the phrase that captures a mood, the line in a song, the sentence that changes how a room feels. When it is not, the attempt to force expression tends to misfire.',
                ],
            },
            {
                id: 'activation',
                heading: 'Partner and activation',
                paragraphs: [
                    'Its partner, Gate 22, brings the Solar Plexus wave to the Throat, completing a channel that makes emotional expression a fixed feature of the design. Held alone, Gate 12 is still cautious and articulate, but the emotional colouring of what it says is borrowed from whoever and whatever is nearby.',
                ],
            },
        ],
        related: ['human-design.center.throat', 'human-design.channel.12-22', 'human-design.gate.22', 'human-design.gate.11'],
    },
    {
        id: 'human-design.gate.13',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 13 · The listener',
        summary: 'A G-centre gate numbered from Tong Ren, the hexagram of fellowship, associated with receiving and keeping the experiences other people share.',
        glyph: '13',
        keywords: ['Tong Ren', 'Fellowship with Men', 'hexagram 13', 'confidant', 'witness', 'direction gates'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.g|G (Identity)]]',
                    'Channel: [[human-design.channel.13-33]], completed by [[human-design.gate.33|Gate 33]] in the Throat',
                    'Hexagram: 13, Tong Ren (Fellowship)',
                    'Wheel position: mid-Aquarius',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Tong Ren describes fellowship formed in the open country, among people who share a purpose rather than a household. Gate 13 gives that fellowship a particular figure: the one others talk to. Strangers on trains, colleagues after hours and old friends all seem to find it easy to tell this gate what happened to them.',
                    'The G centre places the theme in identity. The listening is not a technique; it is part of the person’s direction, and what they hear accumulates into a store of human experience. Of the four direction gates, 13 is the one built around listening, and its material is what other people have already lived through — which is why it is so often linked with the past and with kept secrets.',
                ],
            },
            {
                id: 'activation',
                heading: 'With and without Gate 33',
                paragraphs: [
                    'Gate 33 lets the store be released as reflection or memoir. Without it, Gate 13 hangs and may hold confidences for long periods, sometimes finding that the right moment to share them comes only with a partner, a transit or a setting that supplies the missing voice. Personality activation often shows as a chosen role; Design activation as people confiding unprompted.',
                ],
            },
        ],
        related: ['human-design.center.g', 'human-design.channel.13-33', 'human-design.gate.33', 'human-design.gate.7', 'human-design.foundations.personality-and-design'],
    },
    {
        id: 'human-design.gate.14',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 14 · Fuel for direction',
        summary: 'A Sacral gate keyed to Da You, the hexagram of great possession, which supplies the working power and resources a direction needs.',
        glyph: '14',
        keywords: ['Da You', 'Ta Yu', 'Possession in Great Measure', 'Great Possessing', 'hexagram 14', 'resources', 'work power'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.sacral|Sacral]]',
                    'Channel: [[human-design.channel.2-14]], completed by [[human-design.gate.2|Gate 2]] in the G centre',
                    'Hexagram: 14, Da You (Possession in Great Measure)',
                    'Wheel position: late Scorpio',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'In Da You, fire burns high above heaven, lighting everything beneath it. The image is of abundance held in plain view, and the judgement attached to it is concerned with how such wealth is managed. Gate 14 brings the theme into the Sacral as capacity: the stamina, skills and material resources that accumulate through work the body actually wants to do.',
                    'The gate is often called a power source rather than a compass. It fuels; it does not choose. That is why the tradition pairs it with Gate 2, whose role is orientation.',
                ],
            },
            {
                id: 'activation',
                heading: 'Hanging and complete',
                paragraphs: [
                    'With Gate 2 present, resources and direction become one fixed circuit. A hanging 14 is common and practical: the energy to work and earn is reliable, while the sense of what all that effort serves may be supplied by an employer, a partner or a response to circumstances. In the Generator strategy, responding to what appears is how the gate finds its use.',
                ],
            },
        ],
        related: ['human-design.center.sacral', 'human-design.channel.2-14', 'human-design.gate.2', 'human-design.strategy.respond'],
    },
    {
        id: 'human-design.gate.15',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 15 · Range',
        summary: 'A G-centre gate numbered from Qian, the hexagram of modesty, associated with accepting the whole spread of human rhythms.',
        glyph: '15',
        keywords: ['Qian', 'Modesty', 'hexagram 15', 'extremes', 'love of humanity', 'acceptance'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.g|G (Identity)]]',
                    'Channel: [[human-design.channel.5-15]], completed by [[human-design.gate.5|Gate 5]] in the Sacral',
                    'Hexagram: 15, Qian (Modesty)',
                    'Wheel position: Gemini–Cancer cusp',
                ],
            },
            {
                id: 'hexagram',
                heading: 'Two hexagrams called Qian',
                paragraphs: [
                    'Romanisation hides a difference here. Hexagram 1, the Creative, is written 乾; hexagram 15 is 謙, modesty. Its image is a mountain lying beneath the earth — height that has made itself low. Unusually for the book, none of its six line texts warns of misfortune; each ends in good fortune or advantage.',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'In the G centre the modest mountain becomes breadth. Gate 15 is one of the four gates traditionally associated with love, and its version is love of humanity in all its variety: the night worker and the early riser, the steady and the erratic. The gate’s own habits may swing between extremes, which is part of how it understands everyone else’s.',
                    'Gate 5 brings a fixed Sacral rhythm to this openness. Without it, Gate 15 hangs, comfortable with many patterns and often drawn to people whose routines are firm.',
                ],
            },
        ],
        related: ['human-design.center.g', 'human-design.channel.5-15', 'human-design.gate.5', 'human-design.gate.10', 'human-design.gate.1'],
    },
    {
        id: 'human-design.gate.16',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 16 · Enthusiasm',
        summary: 'A Throat gate keyed to Yu, the hexagram of enthusiasm, which turns eager identification with a skill into practised demonstration.',
        glyph: '16',
        keywords: ['Yu', 'Enthusiasm', 'hexagram 16', 'skill', 'practice', 'talent'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.throat|Throat]]',
                    'Channel: [[human-design.channel.16-48]], completed by [[human-design.gate.48|Gate 48]] in the Spleen',
                    'Hexagram: 16, Yu (Enthusiasm)',
                    'Wheel position: early Gemini',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Yu shows thunder bursting out of the earth, and the classical commentary links it with music and the setting in motion of whole armies. The enthusiasm in question is contagious readiness. As a Throat gate, 16 expresses it through doing: playing, demonstrating, rehearsing in front of others until a skill becomes recognisable.',
                    'The gate is logical in the Human Design sense. It improves by repetition and feedback, and its delight in a craft is what keeps the practice going long enough for patterns to be learned.',
                ],
            },
            {
                id: 'activation',
                heading: 'Activation',
                paragraphs: [
                    'Gate 48 in the Spleen provides depth — the sense of what is still missing — and the two make talent a defined trait. On its own, Gate 16 often shows as wide enthusiasm across many crafts, with depth arriving through teachers or partners. Personality activation tends to show as a conscious identity as a performer of some kind; Design activation as a talent others point out.',
                ],
            },
        ],
        related: ['human-design.center.throat', 'human-design.channel.16-48', 'human-design.gate.48', 'human-design.foundations.personality-and-design'],
    },
    {
        id: 'human-design.gate.17',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 17 · The opinion',
        summary: 'An Ajna gate numbered from Sui, the hexagram of following, where the logical mind organises a view of how things should go.',
        glyph: '17',
        keywords: ['Sui', 'Following', 'hexagram 17', 'opinion', 'logical pattern', 'viewpoint'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.ajna|Ajna]]',
                    'Channel: [[human-design.channel.17-62]], completed by [[human-design.gate.62|Gate 62]] in the Throat',
                    'Hexagram: 17, Sui (Following)',
                    'Wheel position: early Aries',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Thunder rests inside the lake in Sui, and the commentary links it with adapting to the time — resting when evening comes. The hexagram asks what deserves to be followed. Gate 17 answers from the other side: it produces the views that others may or may not choose to follow.',
                    'These views are structured. The gate arranges experience into a pattern, projects it forward and arrives at a position on what should happen next. Within the logical side of the Ajna it is the gate most concerned with the future.',
                ],
            },
            {
                id: 'in-practice',
                heading: 'In practice',
                paragraphs: [
                    'Practitioners often note that an opinion from Gate 17 is received best when someone has asked for it. Partnered with Gate 62, it gains the facts and names that make a position explainable. Without 62 it hangs: the outline of a view is clear, while the supporting detail is borrowed from reading, research or a colleague with a better grip on specifics.',
                ],
            },
        ],
        related: ['human-design.center.ajna', 'human-design.channel.17-62', 'human-design.gate.62', 'human-design.gate.4'],
    },
    {
        id: 'human-design.gate.18',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 18 · Correction',
        summary: 'A Spleen gate keyed to Gu, the hexagram of work on what has been spoiled, with an instinctive eye for patterns that no longer serve.',
        glyph: '18',
        keywords: ['Gu', 'Work on What Has Been Spoiled', 'Decay', 'hexagram 18', 'improvement', 'judgement'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.spleen|Spleen]]',
                    'Channel: [[human-design.channel.18-58]], completed by [[human-design.gate.58|Gate 58]] in the Root',
                    'Hexagram: 18, Gu (Work on What Has Been Spoiled)',
                    'Wheel position: early Libra',
                ],
            },
            {
                id: 'hexagram',
                heading: 'Gu',
                paragraphs: [
                    'The character for Gu shows a bowl in which worms have bred — food left too long. The judgement speaks of repairing what fathers and mothers allowed to decay, and it frames the work as worth undertaking even though it is difficult. Inheritance, in other words, is part of the picture.',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'In the Spleen, that becomes an instant, bodily recognition that something is off: a procedure, a habit, a family pattern handed down unexamined. Gate 18 does not reason its way to the flaw; it registers it, often before it can say why. The logic circuit it belongs to then turns that recognition into the work of correction.',
                    'Root gate 58 provides the vitality and drive to act on it. Unpaired, the gate sees faults clearly but may need someone else’s appetite for improvement, or a particular project, to turn criticism into repair. Practitioners read its sharpness as most welcome when invited.',
                    'Like the Spleen’s other gates, 18 is usually given a fear of its own, but references word it differently: some name a fear of authority, others a fear of being wrong or of being criticised. Both readings stay close to the hexagram, whose subject is the failings handed down by those in charge.',
                ],
            },
        ],
        related: ['human-design.center.spleen', 'human-design.channel.18-58', 'human-design.gate.58', 'human-design.authority.splenic'],
    },
    {
        id: 'human-design.gate.19',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 19 · What is needed',
        summary: 'A Root gate numbered from Lin, the hexagram of approach, which presses towards the Solar Plexus with sensitivity to basic needs and belonging.',
        glyph: '19',
        keywords: ['Lin', 'Approach', 'hexagram 19', 'needs', 'sensitivity', 'belonging'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.root|Root]]',
                    'Channel: [[human-design.channel.19-49]], completed by [[human-design.gate.49|Gate 49]] in the Solar Plexus',
                    'Hexagram: 19, Lin (Approach)',
                    'Wheel position: Aquarius, about 7½° to 13°, directly after Gate 41',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Lin depicts the earth leaning over a lake — a superior approaching those below with care. The gate’s concern is similar but starts from the ground up: the pressure to have needs recognised and met. Food, shelter, touch and a place in the group all fall within its range.',
                    'The Root is a pressure centre, so Gate 19 does not simply notice needs; it pushes for them, and that push travels towards the Solar Plexus where it becomes feeling. The result is a pronounced sensitivity — to one’s own requirements, to animals and to people at the edge of a group.',
                ],
            },
            {
                id: 'activation',
                heading: 'Activation',
                paragraphs: [
                    'Paired with Gate 49 it forms a channel about the terms on which a community supports its members. Without 49 the gate hangs, and its sensitivity may reach for agreements that someone else has to define. On the Design side, the gate is often visible to others before its owner names it, for instance in how readily they are asked to feed or settle people.',
                ],
            },
        ],
        related: ['human-design.center.root', 'human-design.channel.19-49', 'human-design.gate.49', 'human-design.center.solar-plexus'],
    },
    {
        id: 'human-design.gate.20',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 20 · The present moment',
        summary: 'A Throat gate keyed to Guan, the hexagram of contemplation, that speaks and acts in the present tense and connects to three other centres.',
        glyph: '20',
        keywords: ['Guan', 'Contemplation', 'View', 'hexagram 20', 'now', 'integration channels'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.throat|Throat]]',
                    'Channels: [[human-design.channel.10-20]], [[human-design.channel.20-34]] and [[human-design.channel.20-57]]',
                    'Partner gates: [[human-design.gate.10|10]] (G), [[human-design.gate.34|34]] (Sacral), [[human-design.gate.57|57]] (Spleen)',
                    'Hexagram: 20, Guan (Contemplation)',
                    'Wheel position: early Gemini',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Guan is wind moving over the earth, a figure of looking and of being looked at — the old text pictures a ceremony in which the worshipper has washed but not yet made the offering. Gate 20 takes the observing posture and compresses it into the moment: awareness that is expressed as it arises, with very little delay between noticing and saying or doing.',
                ],
            },
            {
                id: 'connections',
                heading: 'Three possible channels',
                paragraphs: [
                    'The gate’s mechanics are unusually varied. With Gate 10 it voices identity in the present; with Gate 57 it voices intuition; with Gate 34 it connects the Sacral directly to the Throat, which on its own is enough to make a chart a Manifesting Generator. Readers of a chart therefore look carefully at which partner, if any, completes it.',
                    'A hanging 20 is still quick and present, but what it expresses in the moment tends to depend on whom it is with.',
                ],
            },
        ],
        related: ['human-design.center.throat', 'human-design.channel.20-34', 'human-design.channel.10-20', 'human-design.channel.20-57', 'human-design.type.manifesting-generator'],
    },
    {
        id: 'human-design.gate.21',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 21 · Control of resources',
        summary: 'An Ego gate numbered from Shi He, the hexagram of biting through, associated with willpower directed at managing one’s own material domain.',
        glyph: '21',
        keywords: ['Shi He', 'Biting Through', 'hexagram 21', 'control', 'stewardship', 'Ego'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.ego|Ego (Heart/Will)]]',
                    'Channel: [[human-design.channel.21-45]], completed by [[human-design.gate.45|Gate 45]] in the Throat',
                    'Hexagram: 21, Shi He (Biting Through)',
                    'Wheel position: Aries',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Shi He shows an open mouth with something lodged between the teeth; the obstruction has to be bitten through. Classical commentary connects it with law and with firm, fair penalties. In the Ego centre the image becomes will applied to a territory — money, diet, work arrangements, the running of a household or a business.',
                    'Gate 21 tends to function best when its sphere of control is clearly its own. The tradition reads the frictions around it less as a character flaw than as a question of boundaries: whose decisions are these?',
                ],
            },
            {
                id: 'activation',
                heading: 'Mechanics',
                paragraphs: [
                    'With Gate 45, the Ego motor reaches the Throat. That single channel can make a Manifestor when the Sacral is undefined, and in such a chart the authority is Ego Manifested when the Solar Plexus and Spleen are both undefined as well. Without 45 the gate lacks that direct route to expression, so its wish to manage things may be channelled through someone holding 45.',
                ],
            },
        ],
        related: ['human-design.center.ego', 'human-design.channel.21-45', 'human-design.gate.45', 'human-design.authority.ego-manifested', 'human-design.type.manifestor'],
    },
    {
        id: 'human-design.gate.22',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 22 · Grace',
        summary: 'A Solar Plexus gate keyed to Bi, the hexagram of adornment, describing social openness and charm that rise and fall with mood.',
        glyph: '22',
        keywords: ['Bi', 'Grace', 'Adornment', 'hexagram 22', 'openness', 'charm'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.solar-plexus|Solar Plexus]]',
                    'Channel: [[human-design.channel.12-22]], completed by [[human-design.gate.12|Gate 12]] in the Throat',
                    'Hexagram: 22, Bi (Grace)',
                    'Wheel position: Pisces',
                ],
            },
            {
                id: 'hexagram',
                heading: 'The hexagram',
                paragraphs: [
                    'Hexagram 22 shares its romanisation with hexagram 8 but is a different character, 賁, meaning decoration. Its image is fire at the foot of a mountain, lighting the slopes with colour. The classical reading allows adornment its place while cautioning that it cannot decide the large questions.',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Gate 22 brings that ambivalent beauty into the emotional centre. At the right point on the wave, it listens well, puts people at ease and lends grace to ordinary exchanges. At the wrong point, the same person may be unable to bear company. Practitioners tend to treat this not as inconsistency but as the gate working accurately: openness that is real only when the mood supports it.',
                    'Gate 12 gives that openness a voice. Left open-ended, Gate 22 has the grace without a fixed outlet, and is often at its most expressive in the company of someone who carries the Throat side.',
                ],
            },
        ],
        related: ['human-design.center.solar-plexus', 'human-design.channel.12-22', 'human-design.gate.12', 'human-design.authority.emotional'],
    },
    {
        id: 'human-design.gate.23',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 23 · Saying the unsayable',
        summary: 'A Throat gate numbered from Bo, the hexagram of splitting apart, which strips individual insight down to words others can follow.',
        glyph: '23',
        keywords: ['Bo', 'Splitting Apart', 'hexagram 23', 'assimilation', 'simplicity', 'explanation'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.throat|Throat]]',
                    'Channel: [[human-design.channel.23-43]], completed by [[human-design.gate.43|Gate 43]] in the Ajna',
                    'Hexagram: 23, Bo (Splitting Apart)',
                    'Wheel position: Taurus',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Bo has five broken lines under a single solid one at the top, like a house whose supports are being worn away from below. The classical advice is not to act. Gate 23 transposes the image to speech: what is removed is the unnecessary, until a complex insight stands in its simplest form.',
                    'The material often comes from Gate 43 — an individual realisation that has no precedent to lean on. The difficulty is translation. Said too early, or to listeners who did not ask, the insight sounds odd; said when invited and pared down, it can reorganise how a group understands something.',
                ],
            },
            {
                id: 'activation',
                heading: 'Activation',
                paragraphs: [
                    'As a Personality activation, the gate tends to know its own habit of saying surprising things. A Design activation may be more abrupt, with the person hearing the remark only as it lands. Without 43 the gate hangs: it is a translator waiting for material, often skilled at explaining other people’s breakthroughs.',
                ],
            },
        ],
        related: ['human-design.center.throat', 'human-design.channel.23-43', 'human-design.gate.43', 'human-design.foundations.personality-and-design'],
    },
    {
        id: 'human-design.gate.24',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 24 · Returning to the question',
        summary: 'An Ajna gate keyed to Fu, the hexagram of return, whose thinking circles back to the same material until a pattern finally clicks.',
        glyph: '24',
        keywords: ['Fu', 'Return', 'The Turning Point', 'hexagram 24', 'rationalisation', 'mental cycles'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.ajna|Ajna]]',
                    'Channel: [[human-design.channel.24-61]], completed by [[human-design.gate.61|Gate 61]] in the Head',
                    'Hexagram: 24, Fu (Return)',
                    'Wheel position: mid-Taurus',
                ],
            },
            {
                id: 'hexagram',
                heading: 'Fu',
                paragraphs: [
                    'Fu is a single solid line beneath five broken ones: the light returning at the winter solstice, when the darkest point has passed and the cycle turns. The traditional text treats return as natural and regular, a movement that repeats on its own schedule.',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Gate 24 brings that cycle into the mind. Thought keeps going back to the same unresolved matter, approaching it from slightly different angles each time. Much of the time this looks like idle repetition. Occasionally the circling lands, and the person can suddenly put into words an insight that came from somewhere beneath reasoning.',
                    'Head gate 61 supplies the pressure — the sense that something remains to be understood. With both gates the loop is a fixed part of the mind. A hanging 24 still processes in cycles, but what it circles is often a question other people have raised. As an Ajna gate, it is never an inner authority for decisions.',
                ],
            },
        ],
        related: ['human-design.center.ajna', 'human-design.channel.24-61', 'human-design.gate.61', 'human-design.authority.mental-environmental'],
    },
    {
        id: 'human-design.gate.25',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 25 · Impersonal love',
        summary: 'A G-centre gate numbered from Wu Wang, the hexagram of innocence, associated with a broad and undiscriminating regard for living things.',
        glyph: '25',
        keywords: ['Wu Wang', 'Innocence', 'The Unexpected', 'hexagram 25', 'universal love', 'spirit'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.g|G (Identity)]]',
                    'Channel: [[human-design.channel.25-51]], completed by [[human-design.gate.51|Gate 51]] in the Ego',
                    'Hexagram: 25, Wu Wang (Innocence)',
                    'Wheel position: Pisces–Aries cusp',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Wu Wang means without falseness or design: thunder rolling beneath heaven, acting from nature rather than calculation. Its oracle adds that hidden motives turn good fortune into its opposite. Gate 25 takes up the theme of innocence as a quality of love — regard that extends to plants, animals, strangers and enemies with roughly equal warmth.',
                    'Among the four love-related gates of the G centre, this is the least personal. People with a defined 25 are sometimes experienced as kind and slightly unreachable at once, because the regard is general rather than reserved for anyone.',
                ],
            },
            {
                id: 'activation',
                heading: 'With Gate 51',
                paragraphs: [
                    'The partner in the Ego adds shock and competitive nerve, and the channel they form links identity to willpower; it is the classic signature of Ego Projected authority when nothing else defines. Unpaired, 25 keeps its openness intact but tends to be tested by events that arrive from outside, rather than by a drive of its own.',
                ],
            },
        ],
        related: ['human-design.center.g', 'human-design.channel.25-51', 'human-design.gate.51', 'human-design.authority.ego-projected', 'human-design.gate.10'],
    },
    {
        id: 'human-design.gate.26',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 26 · Persuasion from memory',
        summary: 'An Ego gate keyed to Da Chu, the hexagram of great accumulation, that draws on stored experience to present and sell convincingly.',
        glyph: '26',
        keywords: ['Da Chu', 'The Taming Power of the Great', 'Great Accumulating', 'hexagram 26', 'salesmanship', 'presentation'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.ego|Ego (Heart/Will)]]',
                    'Channel: [[human-design.channel.26-44]], completed by [[human-design.gate.44|Gate 44]] in the Spleen',
                    'Hexagram: 26, Da Chu (The Taming Power of the Great)',
                    'Wheel position: Sagittarius',
                ],
            },
            {
                id: 'hexagram',
                heading: 'Da Chu',
                paragraphs: [
                    'Here heaven is held inside a mountain: an enormous force contained and stored. The classical commentary connects it with studying the words and deeds of the past to build character, and with taking that store out into public service rather than consuming it at home.',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Gate 26 is where that stored capacity meets the Ego’s willpower. The gate remembers what worked — a story, a method, an angle — and it has the will to put it across. Marketing, advocacy, negotiation and teaching by example all draw on this mix of memory and nerve.',
                    'Because the Ego is a motor, the gate can push. Practitioners often describe a tendency to make things look a little better than they are, and read its health in whether the presentation stays tied to something real.',
                    'Gate 44 brings splenic recognition of people and patterns from the past. Without it, Gate 26 still persuades, but the instinct for who to approach often comes through partners.',
                ],
            },
        ],
        related: ['human-design.center.ego', 'human-design.channel.26-44', 'human-design.gate.44', 'human-design.gate.21'],
    },
    {
        id: 'human-design.gate.27',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 27 · Caring',
        summary: 'A Sacral gate numbered from Yi, the hexagram of nourishment, which supplies the physical capacity to feed, shelter and protect others.',
        glyph: '27',
        keywords: ['Yi', 'The Corners of the Mouth', 'Providing Nourishment', 'hexagram 27', 'caretaking', 'altruism'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.sacral|Sacral]]',
                    'Channel: [[human-design.channel.27-50]], completed by [[human-design.gate.50|Gate 50]] in the Spleen',
                    'Hexagram: 27, Yi (The Corners of the Mouth)',
                    'Wheel position: early Taurus',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Yi looks like an open mouth: solid lines above and below, a hollow between them. The classical reading asks what one puts into one’s own mouth and what one feeds to others, treating nourishment as a matter of choice and quality. In the Sacral that becomes working power for care — cooking, nursing, protecting, looking after the vulnerable.',
                    'Because the source is a motor, the giving can be sustained for a long time, and the gate is one of the clearest examples of Sacral energy put to use on behalf of someone else. The question it tends to raise is the hexagram’s own: whether what is being nourished deserves it.',
                ],
            },
            {
                id: 'activation',
                heading: 'Activation',
                paragraphs: [
                    'Gate 50 in the Spleen adds an instinct for values and responsibility, and together they form a protective channel within the tribal circuitry. If 50 is absent, there is still plenty of care to give, though the standards governing it — what is fair to give, and to whom — tend to be set by the household or community around it.',
                ],
            },
        ],
        related: ['human-design.center.sacral', 'human-design.channel.27-50', 'human-design.gate.50', 'human-design.type.generator'],
    },
    {
        id: 'human-design.gate.28',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 28 · Struggle for meaning',
        summary: 'A Spleen gate keyed to Da Guo, the hexagram of the overloaded ridgepole, that weighs which risks and struggles are worth taking on.',
        glyph: '28',
        keywords: ['Da Guo', 'Preponderance of the Great', 'hexagram 28', 'risk', 'purpose', 'struggle'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.spleen|Spleen]]',
                    'Channel: [[human-design.channel.28-38]], completed by [[human-design.gate.38|Gate 38]] in the Root',
                    'Hexagram: 28, Da Guo (Preponderance of the Great)',
                    'Wheel position: early Scorpio',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Da Guo shows four strong lines crowded between two weak ends — a ridgepole sagging because it carries more than its supports can bear. Something must be done; standing still is not an option. Gate 28 brings that crisis to the Spleen, the centre of survival instinct, where it becomes a gauge of risk: is this difficulty worth the life spent on it?',
                    'Splenic gates are traditionally linked with particular fears, and the one attached to 28 is the fear of death bound up with the fear that a life might lack purpose. The gate answers it by engaging, often taking on causes others consider too hard.',
                ],
            },
            {
                id: 'activation',
                heading: 'With and without 38',
                paragraphs: [
                    'Root gate 38 supplies stubborn fuel, completing a channel of individual struggle. Without it, Gate 28 hangs: the instinct for what is worth fighting for is present, but the staying power may come in bursts or through allies.',
                ],
            },
        ],
        related: ['human-design.center.spleen', 'human-design.channel.28-38', 'human-design.gate.38', 'human-design.authority.splenic'],
    },
    {
        id: 'human-design.gate.29',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 29 · The wholehearted yes',
        summary: 'A Sacral gate numbered from Kan, the hexagram of water flowing through a ravine, associated with committing fully to an experience and staying in it.',
        glyph: '29',
        keywords: ['Kan', 'The Abysmal', 'Water', 'hexagram 29', 'commitment', 'perseverance'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.sacral|Sacral]]',
                    'Channel: [[human-design.channel.29-46]], completed by [[human-design.gate.46|Gate 46]] in the G centre',
                    'Hexagram: 29, Kan (The Abysmal)',
                    'Wheel position: late Leo, ending just past 0° Virgo',
                ],
            },
            {
                id: 'hexagram',
                heading: 'Kan',
                paragraphs: [
                    'Kan is the trigram of water doubled: one ravine after another. Water does not avoid the gorge; it fills it and moves on, keeping its nature throughout. What the judgement praises is sincerity that holds steady while the danger continues.',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'In the Sacral the image becomes the gate of agreement. Once Gate 29 commits, the whole body goes with the commitment, and it tends to stay in long after more cautious centres would have left. That perseverance is the gate’s value, and why the system pays so much attention to what it agrees to in the first place. For a Generator, the strategy of response is meant to keep the yes honest.',
                    'Gate 46 in the G centre completes a channel about discovery through embodied experience. A hanging 29 still commits deeply, though the sense that the experience is going somewhere may arrive only afterwards.',
                ],
            },
        ],
        related: ['human-design.center.sacral', 'human-design.channel.29-46', 'human-design.gate.46', 'human-design.strategy.respond', 'human-design.authority.sacral'],
    },
    {
        id: 'human-design.gate.30',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 30 · Desire',
        summary: 'A Solar Plexus gate keyed to Li, the hexagram of fire that clings to what it burns, carrying a strong emotional longing for experience.',
        glyph: '30',
        keywords: ['Li', 'The Clinging', 'Fire', 'hexagram 30', 'longing', 'feelings'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.solar-plexus|Solar Plexus]]',
                    'Channel: [[human-design.channel.30-41]], completed by [[human-design.gate.41|Gate 41]] in the Root',
                    'Hexagram: 30, Li (The Clinging, Fire)',
                    'Wheel position: late Aquarius, ending just past 0° Pisces',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Li is fire, and fire exists only by attaching itself to fuel. The trigram is doubled, so the brightness is intense but dependent. Gate 30 carries that dependency into feeling: a burning wish for something to happen, often before it is clear what the something is.',
                    'Root gate 41 starts the pressure; Gate 30 turns it into emotional intensity in the Solar Plexus. The resulting desire can drive a person into experiences they would never have chosen on reflection, and the tradition reads that as the point. Experience, not the attainment of the goal, is what this gate is after.',
                ],
            },
            {
                id: 'activation',
                heading: 'Activation',
                paragraphs: [
                    'Because the Solar Plexus takes priority as an authority, a defined 30 is usually read alongside the emotional wave: desire felt intensely today may look different after the wave has moved. Without 41 the gate hangs, burning brightly when something else lights it.',
                ],
            },
        ],
        related: ['human-design.center.solar-plexus', 'human-design.channel.30-41', 'human-design.gate.41', 'human-design.authority.emotional'],
    },
    {
        id: 'human-design.gate.31',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 31 · Speaking for others',
        summary: 'A Throat gate numbered from Xian, the hexagram of mutual influence, which gives voice to leadership that a group has chosen.',
        glyph: '31',
        keywords: ['Xian', 'Influence', 'Wooing', 'hexagram 31', 'spokesperson', 'democratic leadership'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.throat|Throat]]',
                    'Channel: [[human-design.channel.7-31]], completed by [[human-design.gate.7|Gate 7]] in the G centre',
                    'Hexagram: 31, Xian (Influence)',
                    'Wheel position: early Leo',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Xian places a lake on top of a mountain, and commentators read it as courtship: influence that works because both sides are moved. For Gate 31 that reciprocity is the basis of a public voice. The gate speaks as a representative, and its words carry weight in proportion to how far the people behind it agree.',
                    'The Throat is the centre of manifestation, so this is the point where a group’s chosen direction becomes stated policy. The gate is often described as influential rather than commanding.',
                ],
            },
            {
                id: 'activation',
                heading: 'Partner and open end',
                paragraphs: [
                    'Gate 7 in the G centre provides the sense of which direction to lead in. When 7 is missing, the voice lacks that fixed orientation, and it often ends up articulating plans developed by others — a role that suits it when it has been invited. Personality activation is typically aware of its pull to speak up; Design activation is usually spotted by colleagues first.',
                ],
            },
        ],
        related: ['human-design.center.throat', 'human-design.channel.7-31', 'human-design.gate.7', 'human-design.gate.13'],
    },
    {
        id: 'human-design.gate.32',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 32 · What will last',
        summary: 'A Spleen gate keyed to Heng, the hexagram of duration, with an instinct for which efforts and people have staying power.',
        glyph: '32',
        keywords: ['Heng', 'Duration', 'hexagram 32', 'continuity', 'potential', 'conservatism'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.spleen|Spleen]]',
                    'Channel: [[human-design.channel.32-54]], completed by [[human-design.gate.54|Gate 54]] in the Root',
                    'Hexagram: 32, Heng (Duration)',
                    'Wheel position: late Libra',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Thunder and wind, the two trigrams of Heng, are always on the move, yet the hexagram is named for endurance. The point of the figure is continuity that adapts: a marriage, an institution or a craft that lasts because it keeps changing in small ways. Gate 32 brings that judgement into the Spleen as an instinct for durability.',
                    'The gate assesses potential: whether a venture will hold up, whether someone will still be there in ten years. It is conservative in the literal sense, protecting what has proven itself. The fear the tradition attaches to it is failure, and its caution is read through that lens.',
                ],
            },
            {
                id: 'activation',
                heading: 'With Gate 54',
                paragraphs: [
                    'Root gate 54 supplies ambition, and the completed channel joins drive to discernment within the tribal circuitry. Held alone, 32 can recognise lasting value clearly while relying on someone else’s ambition to push for it.',
                ],
            },
        ],
        related: ['human-design.center.spleen', 'human-design.channel.32-54', 'human-design.gate.54', 'human-design.authority.splenic'],
    },
    {
        id: 'human-design.gate.33',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 33 · Retreat and retelling',
        summary: 'A Throat gate keyed to Dun, the hexagram of strategic withdrawal, which turns lived experience into reflection after a period of privacy.',
        glyph: '33',
        keywords: ['Dun', 'Retreat', 'hexagram 33', 'privacy', 'memory', 'reflection'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.throat|Throat]]',
                    'Channel: [[human-design.channel.13-33]], completed by [[human-design.gate.13|Gate 13]] in the G centre',
                    'Hexagram: 33, Dun (Retreat)',
                    'Wheel position: Leo',
                ],
            },
            {
                id: 'hexagram',
                heading: 'Dun',
                paragraphs: [
                    'Two broken lines creep up from the base of the figure while heaven stands above a mountain. Retreat in this situation is treated as the correct move — not flight, but a timely step back that keeps one’s strength intact while the dark advances.',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Gate 33 applies that wisdom to experience. Something is lived through, then the person withdraws — physically, socially or simply into silence — and what eventually emerges through the Throat is a considered account: the memoir, the lesson, the story with its meaning attached. The retreat is part of the mechanism rather than a break from it.',
                    'Paired with Gate 13, which gathers what others confide, the gate becomes a fixed voice for collective memory. Without 13 it hangs, and the material it reflects on is more often its own than other people’s. Practitioners tend to note that a Design activation here can make privacy feel necessary long before the person can explain why.',
                ],
            },
        ],
        related: ['human-design.center.throat', 'human-design.channel.13-33', 'human-design.gate.13', 'human-design.foundations.personality-and-design'],
    },
    {
        id: 'human-design.gate.34',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 34 · Power',
        summary: 'A Sacral gate numbered from Da Zhuang, the hexagram of great strength, that supplies raw force and can link the Sacral to three other centres.',
        glyph: '34',
        keywords: ['Da Zhuang', 'The Power of the Great', 'hexagram 34', 'strength', 'force', 'integration channels'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.sacral|Sacral]]',
                    'Channels: [[human-design.channel.10-34]], [[human-design.channel.20-34]] and [[human-design.channel.34-57]]',
                    'Partner gates: [[human-design.gate.10|10]] (G), [[human-design.gate.20|20]] (Throat), [[human-design.gate.57|57]] (Spleen)',
                    'Hexagram: 34, Da Zhuang (The Power of the Great)',
                    'Wheel position: early Sagittarius',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Four solid lines push up beneath two broken ones in Da Zhuang, and the upper trigram is thunder: strength that has grown large and is about to break through. The line texts answer with a reminder that strength must stay correct, and picture a ram that butts a hedge and gets its horns caught.',
                    'Gate 34 is the Sacral’s most independent output. Its force serves the individual’s own activity rather than family or community obligations, and practitioners describe it as busy, physical and hard to stop once engaged.',
                ],
            },
            {
                id: 'mechanics',
                heading: 'Mechanics',
                paragraphs: [
                    'Each partner changes the picture. With 20 the Sacral reaches the Throat directly, which by itself produces a Manifesting Generator. With 10 the force goes into conviction and behaviour; with 57 it is steered by splenic instinct. Even with no partner, Gate 34 is a large reserve of Sacral power, and like every Sacral gate it is meant to be released through response.',
                ],
            },
        ],
        related: ['human-design.center.sacral', 'human-design.channel.20-34', 'human-design.channel.10-34', 'human-design.channel.34-57', 'human-design.type.manifesting-generator'],
    },
    {
        id: 'human-design.gate.35',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 35 · Having done it',
        summary: 'A Throat gate keyed to Jin, the hexagram of progress, associated with a hunger for new experience and the voice of someone who has been there.',
        glyph: '35',
        keywords: ['Jin', 'Progress', 'hexagram 35', 'experience', 'change', 'variety'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.throat|Throat]]',
                    'Channel: [[human-design.channel.35-36]], completed by [[human-design.gate.36|Gate 36]] in the Solar Plexus',
                    'Hexagram: 35, Jin (Progress)',
                    'Wheel position: mid-Gemini',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Jin shows the sun rising over the earth — steady, visible advance. In the judgement a lord is rewarded with horses and received three times in a single day. Gate 35 is less interested in reward than in the advancing itself: the next country, the next job, the next unfamiliar thing to try.',
                    'Because it sits in the Throat, the gate expresses its experience; the person tends to become a source of first-hand accounts. What it gathers is breadth. Once something has been done, the gate’s attention usually moves on, which can look like boredom but is better described as completion of its interest.',
                ],
            },
            {
                id: 'activation',
                heading: 'Partner and activation',
                paragraphs: [
                    'Gate 36 adds emotional charge from the Solar Plexus, forming a motor-to-Throat channel. Without 36 the gate hangs: still curious and fond of novelty, though the emotional push to plunge in is supplied by circumstances or companions.',
                ],
            },
        ],
        related: ['human-design.center.throat', 'human-design.channel.35-36', 'human-design.gate.36', 'human-design.gate.11'],
    },
    {
        id: 'human-design.gate.36',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 36 · The crisis before the new',
        summary: 'A Solar Plexus gate numbered from Ming Yi, the hexagram of light hidden underground, that carries emotional turbulence into unfamiliar experience.',
        glyph: '36',
        keywords: ['Ming Yi', 'Darkening of the Light', 'hexagram 36', 'crisis', 'inexperience', 'emotional intensity'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.solar-plexus|Solar Plexus]]',
                    'Channel: [[human-design.channel.35-36]], completed by [[human-design.gate.35|Gate 35]] in the Throat',
                    'Hexagram: 36, Ming Yi (Darkening of the Light)',
                    'Wheel position: late Pisces',
                ],
            },
            {
                id: 'hexagram',
                heading: 'Ming Yi',
                paragraphs: [
                    'Fire lies beneath the earth in this figure: the sun has set, and the bright must hide its brightness to survive a harsh period. Persistence through hardship, with one’s light kept concealed, is the advice.',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Gate 36 belongs to the experiential side of the Solar Plexus, where feeling runs at its most turbulent. It is drawn to experiences it has never had, and it meets them with intensity: nerves, excitement and, quite often, a crisis that turns out to be the doorway into something new. The darkness of the hexagram fits that pattern — a period of not seeing clearly that comes before the light returns.',
                    'Practitioners describe the gate as becoming wiser with each passage through difficulty. Paired with Gate 35, it supplies the push for experience that the Throat then reports. Alone, it hangs, and the emotional charge may be stirred mainly when someone else proposes the adventure.',
                ],
            },
        ],
        related: ['human-design.center.solar-plexus', 'human-design.channel.35-36', 'human-design.gate.35', 'human-design.authority.emotional'],
    },
    {
        id: 'human-design.gate.37',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 37 · The bargain',
        summary: 'A Solar Plexus gate keyed to Jia Ren, the hexagram of the family, concerned with the warmth and the terms that hold a group together.',
        glyph: '37',
        keywords: ['Jia Ren', 'The Family', 'hexagram 37', 'friendship', 'loyalty', 'agreements'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.solar-plexus|Solar Plexus]]',
                    'Channel: [[human-design.channel.37-40]], completed by [[human-design.gate.40|Gate 40]] in the Ego',
                    'Hexagram: 37, Jia Ren (The Family)',
                    'Wheel position: early Pisces',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Jia Ren shows wind rising from fire, the smoke of a hearth. The text sets out a household in which each member knows their place, and it is plain that warmth and order depend on one another. Gate 37 carries that domestic ideal into the Solar Plexus as an emotional sensitivity to how a group treats its own.',
                    'The gate notices whether affection and effort are reciprocated. It offers friendliness, hospitality and support, and it expects, often without saying so, that the arrangement will be honoured in return. Much of what the tradition calls tribal life — the unspoken deals of families, firms and friendships — runs through this gate.',
                ],
            },
            {
                id: 'activation',
                heading: 'Activation',
                paragraphs: [
                    'With Gate 40 the arrangement gains the Ego’s will to deliver on it. Where 40 is missing, the person may give warmth freely and find that the concrete side of the bargain, the work and the provision, is supplied by others. Read emotionally, its agreements are usually considered sounder after a full turn of the wave.',
                ],
            },
        ],
        related: ['human-design.center.solar-plexus', 'human-design.channel.37-40', 'human-design.gate.40', 'human-design.authority.emotional'],
    },
    {
        id: 'human-design.gate.38',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 38 · Standing one’s ground',
        summary: 'A Root gate numbered from Kui, the hexagram of opposition, that supplies stubborn pressure to struggle for something that matters.',
        glyph: '38',
        keywords: ['Kui', 'Opposition', 'hexagram 38', 'stubbornness', 'fighter', 'resistance'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.root|Root]]',
                    'Channel: [[human-design.channel.28-38]], completed by [[human-design.gate.28|Gate 28]] in the Spleen',
                    'Hexagram: 38, Kui (Opposition)',
                    'Wheel position: Capricorn',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Kui places fire above a lake: fire rises, water sinks, and the two move apart. The oracle still finds good fortune in small matters, recognising that difference can be productive. Gate 38 is the Root’s version of that tension. Its pressure is a readiness to oppose, to resist and to keep going after others have conceded.',
                    'Of the three Root gates that press towards the Spleen, this is the one that pushes the survival instinct into conflict. The struggle can be noble or merely contrary. Which it is depends on whether the cause is worth the effort, and the gate itself is not well placed to judge that.',
                ],
            },
            {
                id: 'partner',
                heading: 'The partner gate',
                paragraphs: [
                    'That judgement belongs to Gate 28, which weighs purpose and risk. When both are defined, stubbornness and meaning are fused. A hanging 38 keeps its fighting spirit but tends to find its cause through other people, sometimes taking up a struggle that began as theirs.',
                ],
            },
        ],
        related: ['human-design.center.root', 'human-design.channel.28-38', 'human-design.gate.28', 'human-design.center.spleen'],
    },
    {
        id: 'human-design.gate.39',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 39 · Provocation',
        summary: 'A Root gate keyed to Jian, the hexagram of obstruction, whose pressure stirs emotional responses in others and sometimes in its owner.',
        glyph: '39',
        keywords: ['Jian', 'Obstruction', 'hexagram 39', 'provocation', 'spirit', 'challenge'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.root|Root]]',
                    'Channel: [[human-design.channel.39-55]], completed by [[human-design.gate.55|Gate 55]] in the Solar Plexus',
                    'Hexagram: 39, Jian (Obstruction)',
                    'Wheel position: Cancer',
                ],
            },
            {
                id: 'hexagram',
                heading: 'Jian',
                paragraphs: [
                    'Water lies on top of a mountain in Jian, an image of a steep and difficult path. The classical advice is to turn inwards and look for help, and the figure is about how an obstacle changes the one who meets it. Hexagram 53 shares the same romanisation but is a different character.',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'As a Root gate pressing towards the Solar Plexus, Gate 39 behaves like an obstruction placed deliberately in someone’s path. It teases, challenges or pokes until a feeling surfaces — and the tradition treats that as its function. A provocation that lands well wakes a person or a room up; one that lands badly simply hurts.',
                    'Gate 55 in the Solar Plexus is the feeling that the pressure provokes, and the pair forms a channel of strong moods. Without 55 the gate hangs, and those near it may discover that the person is provoking them in search of an emotional response they do not have themselves.',
                ],
            },
        ],
        related: ['human-design.center.root', 'human-design.channel.39-55', 'human-design.gate.55', 'human-design.center.solar-plexus'],
    },
    {
        id: 'human-design.gate.40',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 40 · Delivering one’s part',
        summary: 'An Ego gate numbered from Xie, the hexagram of deliverance, associated with providing for others and with the need to be alone afterwards.',
        glyph: '40',
        keywords: ['Xie', 'Deliverance', 'hexagram 40', 'work', 'provision', 'aloneness'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.ego|Ego (Heart/Will)]]',
                    'Channel: [[human-design.channel.37-40]], completed by [[human-design.gate.37|Gate 37]] in the Solar Plexus',
                    'Hexagram: 40, Xie (Deliverance)',
                    'Wheel position: Virgo',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Thunder and rain release a tension in Xie: the storm breaks, and knots come loose. Once the difficulty is past, the advice is to return promptly to ordinary life. Gate 40 has a similar rhythm. The Ego’s will is applied to delivering on an arrangement — the wages earned, the house kept, the task done — and then there is a need to withdraw.',
                    'The aloneness is part of the deal rather than a rejection of it. Practitioners read the gate’s difficulties mostly in terms of what it is paid: if effort is not recognised, the will to keep providing drains away.',
                ],
            },
            {
                id: 'activation',
                heading: 'With Gate 37',
                paragraphs: [
                    'Gate 37 in the Solar Plexus supplies the emotional terms of the bargain, and together they define the Ego and Solar Plexus, two motors. Unpaired, the gate can work hard and reliably, while the warmth that makes the arrangement worth it tends to come from a partner, family or team.',
                ],
            },
        ],
        related: ['human-design.center.ego', 'human-design.channel.37-40', 'human-design.gate.37', 'human-design.gate.21'],
    },
    {
        id: 'human-design.gate.41',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 41 · The start of feeling',
        summary: 'A Root gate keyed to Sun, the hexagram of decrease, that opens the wheel and presses towards the Solar Plexus as longing for new experience.',
        glyph: '41',
        keywords: ['Sun', 'Decrease', 'hexagram 41', 'fantasy', 'contraction', 'first gate of the wheel'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.root|Root]]',
                    'Channel: [[human-design.channel.30-41]], completed by [[human-design.gate.30|Gate 30]] in the Solar Plexus',
                    'Hexagram: 41, Sun (Decrease) — unrelated to the planet',
                    'Wheel position: early Aquarius; the first gate of the sequence',
                ],
            },
            {
                id: 'place-on-the-wheel',
                heading: 'Where the wheel begins',
                paragraphs: [
                    'The gate wheel used by the engine starts at 2° Aquarius, which is where Gate 41 begins. Practitioners mark the Sun’s entry into this gate each year, in late January, as the start of a new cycle in the Human Design calendar. It is a fitting position for a gate about initiating experience.',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Hexagram 41 describes decrease below for the sake of what is above, and the text says that two small bowls are enough for an offering. Gate 41 holds something similar: a pressure that contracts into a single seed of possibility. That seed is often experienced as fantasy — an imagined experience that has not yet found a form.',
                    'Gate 30 in the Solar Plexus feeds the seed into desire. Without 30, Gate 41 hangs; the imaginative pressure is constant while the emotional fire to pursue it may depend on company.',
                ],
            },
        ],
        related: ['human-design.center.root', 'human-design.channel.30-41', 'human-design.gate.30', 'human-design.gate.60'],
    },
    {
        id: 'human-design.gate.42',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 42 · Seeing it through',
        summary: 'A Sacral gate numbered from Yi, the hexagram of increase, which supplies the power to bring a started cycle to its proper end.',
        glyph: '42',
        keywords: ['Yi', 'Increase', 'hexagram 42', 'completion', 'cycles', 'maturation'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.sacral|Sacral]]',
                    'Channel: [[human-design.channel.42-53]], completed by [[human-design.gate.53|Gate 53]] in the Root',
                    'Hexagram: 42, Yi (Increase)',
                    'Wheel position: late Aries',
                ],
            },
            {
                id: 'hexagram',
                heading: 'Yi, again',
                paragraphs: [
                    'Two hexagrams romanise as Yi. Hexagram 27, 頤, is the mouth; hexagram 42, 益, is increase — wind and thunder strengthening each other. Its classical text speaks of the ruler taking from above to benefit those below, and of the moment being right for crossing great waters.',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Gate 42 understands increase as growth through a full cycle. Projects, relationships and phases of life have a shape — a beginning, a middle and a conclusion — and this Sacral gate provides the stamina to reach the conclusion. It is not especially interested in starting. The completion is what it is for.',
                    'Root gate 53 supplies the push to begin, so together the two hold a cycle from start to finish. Alone, Gate 42 hangs: it often inherits projects others initiated, and finishes them well. The Sacral strategy of response applies here too; what it finishes should be something it actually responded to.',
                ],
            },
        ],
        related: ['human-design.center.sacral', 'human-design.channel.42-53', 'human-design.gate.53', 'human-design.strategy.respond'],
    },
    {
        id: 'human-design.gate.43',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 43 · The inner knowing',
        summary: 'An Ajna gate keyed to Guai, the hexagram of breakthrough, where individual insight arrives complete and resists explanation.',
        glyph: '43',
        keywords: ['Guai', 'Breakthrough', 'Resoluteness', 'hexagram 43', 'insight', 'inner ear'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.ajna|Ajna]]',
                    'Channel: [[human-design.channel.23-43]], completed by [[human-design.gate.23|Gate 23]] in the Throat',
                    'Hexagram: 43, Guai (Breakthrough)',
                    'Wheel position: late Scorpio',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Five solid lines rise under a single broken one in Guai, ready to push it off — a dam about to burst. The judgement asks for resolution announced openly, without resort to arms. Gate 43 is that moment of breaking through in the mind: an insight that arrives whole, sometimes after long silent processing, and is simply known.',
                    'The gate is sometimes described as an inner ear. It listens inward rather than outward, and its conclusions do not follow from steps that others can retrace. That is both its value and its difficulty, since a breakthrough nobody understands changes nothing.',
                ],
            },
            {
                id: 'activation',
                heading: 'The route out',
                paragraphs: [
                    'Gate 23 in the Throat provides that translation. Without it, Gate 43 hangs, and the person may carry striking insights that stay private or come out in fragments until a conversational partner helps articulate them. On the Personality side the insight tends to feel owned; on the Design side, it can startle its owner as much as anyone.',
                ],
            },
        ],
        related: ['human-design.center.ajna', 'human-design.channel.23-43', 'human-design.gate.23', 'human-design.foundations.personality-and-design'],
    },
    {
        id: 'human-design.gate.44',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 44 · Instinctive recognition',
        summary: 'A Spleen gate numbered from Gou, the hexagram of coming to meet, that recognises people and patterns by smell, as it were, from past experience.',
        glyph: '44',
        keywords: ['Gou', 'Coming to Meet', 'hexagram 44', 'pattern recognition', 'alertness', 'memory'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.spleen|Spleen]]',
                    'Channel: [[human-design.channel.26-44]], completed by [[human-design.gate.26|Gate 26]] in the Ego',
                    'Hexagram: 44, Gou (Coming to Meet)',
                    'Wheel position: Scorpio',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Gou is the reverse of Guai: a single broken line appears at the bottom of five solid ones, an influence slipping in unannounced. The old text is wary of the encounter it describes and warns against taking the newcomer too lightly. Gate 44 is built for exactly that situation. It meets people and circumstances with a rapid, splenic read based on what similar encounters have led to before.',
                    'The tradition links this gate with memory of the past and with the fear that old mistakes might repeat. In practice it is often good at placing the right person in the right role, and at noticing early when something familiar is about to go wrong.',
                ],
            },
            {
                id: 'activation',
                heading: 'Partner and activation',
                paragraphs: [
                    'Ego gate 26 gives this recognition the will to act and sell. Without 26 the patterns are still seen; the persuading may be left to others. As a Spleen gate, it speaks once, in the moment, and does not repeat itself.',
                ],
            },
        ],
        related: ['human-design.center.spleen', 'human-design.channel.26-44', 'human-design.gate.26', 'human-design.authority.splenic', 'human-design.gate.43'],
    },
    {
        id: 'human-design.gate.45',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 45 · The one who directs',
        summary: 'A Throat gate keyed to Cui, the hexagram of gathering together, which voices authority over a group’s shared resources.',
        glyph: '45',
        keywords: ['Cui', 'Gathering Together', 'hexagram 45', 'leadership', 'stewardship', 'the king or queen'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.throat|Throat]]',
                    'Channel: [[human-design.channel.21-45]], completed by [[human-design.gate.21|Gate 21]] in the Ego',
                    'Hexagram: 45, Cui (Gathering Together)',
                    'Wheel position: Gemini',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'A lake rises over the earth in Cui, gathering water into one place. Its judgement pictures a king going to his ancestral temple, a great sacrifice, and people assembling around a leader. Gate 45 takes the central position in such a gathering and speaks for what the group holds in common: its wealth, its education, its rules of access.',
                    'Throat gates each give the centre a distinct way of speaking. This one speaks with a sense of ownership — not personal greed but responsibility for a collective store. Historically minded practitioners sometimes call it a monarch’s gate.',
                ],
            },
            {
                id: 'activation',
                heading: 'Mechanics',
                paragraphs: [
                    'The partner, Gate 21, sits in the Ego, so completing the channel brings a motor to the Throat. In charts without a defined Sacral that is a route to the Manifestor type. A hanging 45 has the voice of the leader but not the fixed drive behind it, and often looks to others with Ego definition to manage the practical side.',
                ],
            },
        ],
        related: ['human-design.center.throat', 'human-design.channel.21-45', 'human-design.gate.21', 'human-design.type.manifestor'],
    },
    {
        id: 'human-design.gate.46',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 46 · Being in the right place',
        summary: 'A G-centre gate numbered from Sheng, the hexagram of pushing upward, associated with love of the body and with fortunate timing.',
        glyph: '46',
        keywords: ['Sheng', 'Pushing Upward', 'hexagram 46', 'embodiment', 'serendipity', 'love of the body'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.g|G (Identity)]]',
                    'Channel: [[human-design.channel.29-46]], completed by [[human-design.gate.29|Gate 29]] in the Sacral',
                    'Hexagram: 46, Sheng (Pushing Upward)',
                    'Wheel position: Virgo–Libra cusp',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'In Sheng, wood grows up from within the earth: a tree pushing its way towards light, not by leaps but by steady growth. The oracle calls this a time for setting out southward — moving towards warmth and advancement. Gate 46 carries the same image of growth rooted in the ground, and in the G centre that ground is the body.',
                    'It is one of the four love-related gates of the identity centre, and its subject is love of being physically present. People with this gate defined are often described as at ease in their bodies and as having an uncanny tendency to be in the right place when something happens. The luck is less mysterious in the system’s terms: it follows from commitment to the experience at hand.',
                ],
            },
            {
                id: 'activation',
                heading: 'With Gate 29',
                paragraphs: [
                    'Gate 29 supplies the Sacral commitment that makes the channel. On its own the gate retains its bodily ease; the decisive yes that carries it into the right situations often comes through others.',
                ],
            },
        ],
        related: ['human-design.center.g', 'human-design.channel.29-46', 'human-design.gate.29', 'human-design.gate.25'],
    },
    {
        id: 'human-design.gate.47',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 47 · Making sense of it',
        summary: 'An Ajna gate keyed to Kun, the hexagram of oppression and exhaustion, where the mind works through confusing experience towards realisation.',
        glyph: '47',
        keywords: ['Kun', 'Oppression', 'Exhaustion', 'hexagram 47', 'realisation', 'abstract mind'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.ajna|Ajna]]',
                    'Channel: [[human-design.channel.47-64]], completed by [[human-design.gate.64|Gate 64]] in the Head',
                    'Hexagram: 47, Kun (Oppression)',
                    'Wheel position: Virgo',
                ],
            },
            {
                id: 'hexagram',
                heading: 'Kun',
                paragraphs: [
                    'The romanisation matches hexagram 2, but the character, 困, shows a tree boxed in. The image is a lake with no water — the water has drained beneath it. The judgement does not counsel despair. It says a strong person can still find a way, though words alone will not be believed.',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'For the abstract mind, Gate 47 is the place where unsorted memories and images are processed. It is commonly described as feeling oppressed by them: a sense that sense ought to be made, without the means to make it yet. When the realisation comes, it comes suddenly and arranges the whole sequence at once.',
                    'Head gate 64 supplies the pressure and the raw imagery. A hanging 47 carries the processing capacity without its own source of material, and so it often works on the confusion other people bring to it. As an Ajna gate, it is never an authority for decisions — a point practitioners stress with this gate in particular.',
                ],
            },
        ],
        related: ['human-design.center.ajna', 'human-design.channel.47-64', 'human-design.gate.64', 'human-design.authority.mental-environmental'],
    },
    {
        id: 'human-design.gate.48',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 48 · Depth',
        summary: 'A Spleen gate numbered from Jing, the hexagram of the well, concerned with the depth of knowledge and the worry that it is not yet enough.',
        glyph: '48',
        keywords: ['Jing', 'The Well', 'hexagram 48', 'depth', 'resourcefulness', 'inadequacy'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.spleen|Spleen]]',
                    'Channel: [[human-design.channel.16-48]], completed by [[human-design.gate.16|Gate 16]] in the Throat',
                    'Hexagram: 48, Jing (The Well)',
                    'Wheel position: Libra',
                ],
            },
            {
                id: 'the-well',
                heading: 'The well',
                paragraphs: [
                    'Few hexagrams have a plainer image. A town may be moved, says the text, but the well stays where it is; people come and go and draw from it, and it neither empties nor overflows. Its failures are practical — a rope too short, a bucket that breaks before it reaches the water.',
                    'Gate 48 is a well of understanding in the Spleen. Its depth is real and instinctive, and so is its awareness that the rope might not reach. The tradition associates the gate with a fear of inadequacy, which pushes it to study, prepare and know more before speaking.',
                ],
            },
            {
                id: 'partner',
                heading: 'With and without 16',
                paragraphs: [
                    'Throat gate 16 provides the enthusiasm and practice that bring the water to the surface, completing a channel of skill. Left hanging, 48 often has more depth than it shows. It tends to surface in response to questions from others, or when a partner’s confidence gives it a reason to speak.',
                ],
            },
        ],
        related: ['human-design.center.spleen', 'human-design.channel.16-48', 'human-design.gate.16', 'human-design.authority.splenic'],
    },
    {
        id: 'human-design.gate.49',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 49 · The terms revised',
        summary: 'A Solar Plexus gate keyed to Ge, the hexagram of revolution, that accepts or rejects relationships according to principle.',
        glyph: '49',
        keywords: ['Ge', 'Revolution', 'Molting', 'hexagram 49', 'principles', 'rejection'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.solar-plexus|Solar Plexus]]',
                    'Channel: [[human-design.channel.19-49]], completed by [[human-design.gate.19|Gate 19]] in the Root',
                    'Hexagram: 49, Ge (Revolution)',
                    'Wheel position: late Aquarius',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Ge originally meant an animal’s hide, and by extension the moulting by which a creature sheds an old coat. The hexagram places fire within a lake, two elements that cannot coexist for long. Its classical text says that a revolution is believed only once its day has come. Gate 49 applies that to the arrangements between people.',
                    'In the Solar Plexus, the gate holds the principles on which someone is accepted or turned away — in a household, a congregation, a partnership. It tends to keep agreements until they stop meeting its standards, and then to end them decisively. Because the wave governs it, those decisions are best not made at an emotional peak or trough.',
                ],
            },
            {
                id: 'activation',
                heading: 'Partner and open end',
                paragraphs: [
                    'Gate 19 brings the Root’s pressure of need, and the completed channel ties principle to what people actually require from each other. When 19 is absent, the gate can be quite firm about principles while looking to others to define what is needed.',
                ],
            },
        ],
        related: ['human-design.center.solar-plexus', 'human-design.channel.19-49', 'human-design.gate.19', 'human-design.authority.emotional'],
    },
    {
        id: 'human-design.gate.50',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 50 · Values',
        summary: 'A Spleen gate numbered from Ding, the hexagram of the cauldron, which holds the standards that keep a community safe and nourished.',
        glyph: '50',
        keywords: ['Ding', 'The Cauldron', 'hexagram 50', 'values', 'responsibility', 'custodian'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.spleen|Spleen]]',
                    'Channel: [[human-design.channel.27-50]], completed by [[human-design.gate.27|Gate 27]] in the Sacral',
                    'Hexagram: 50, Ding (The Cauldron)',
                    'Wheel position: Libra–Scorpio cusp',
                ],
            },
            {
                id: 'the-cauldron',
                heading: 'The cauldron',
                paragraphs: [
                    'The lines of hexagram 50 form the picture of a bronze ritual vessel: legs at the bottom, a belly, ears and a carrying ring at the top. Such vessels cooked offerings and also symbolised legitimate rule. The figure joins food, ceremony and authority in a single object.',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Gate 50 is the Spleen’s custodian of values: the instinctive sense of what a community must uphold for everyone in it to be safe and fed. It recognises when standards are slipping — in hygiene, in fairness, in the treatment of the young or old — and tends to take responsibility for restoring them. The fear traditionally associated with this gate is the fear of responsibility itself, felt precisely because responsibility comes so naturally.',
                    'Gate 27 in the Sacral provides the caring energy that puts those values to work. Unpaired, 50 knows what should be done; the hands that do it may belong to others.',
                ],
            },
        ],
        related: ['human-design.center.spleen', 'human-design.channel.27-50', 'human-design.gate.27', 'human-design.authority.splenic'],
    },
    {
        id: 'human-design.gate.51',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 51 · Shock',
        summary: 'An Ego gate keyed to Zhen, the hexagram of thunder, associated with competitive nerve and with being jolted into larger experience.',
        glyph: '51',
        keywords: ['Zhen', 'The Arousing', 'Shock', 'Thunder', 'hexagram 51', 'initiation', 'competition'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.ego|Ego (Heart/Will)]]',
                    'Channel: [[human-design.channel.25-51]], completed by [[human-design.gate.25|Gate 25]] in the G centre',
                    'Hexagram: 51, Zhen (The Arousing)',
                    'Wheel position: mid-Aries',
                ],
            },
            {
                id: 'hexagram',
                heading: 'Zhen',
                paragraphs: [
                    'Thunder doubled. The judgement describes a shock that terrifies for a hundred miles, while the one leading the ceremony does not spill the sacrificial wine. Fear comes first, then laughter, then composure — the figure is about recovering one’s centre after a jolt.',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Gate 51 brings that sequence into the Ego. It is the gate of the one who goes first, takes the dare, reaches the summit before the rival does, and also the gate through which a life is jolted into something larger by events that shake it. Shock here is not only something suffered; the gate can deliver it, often to wake others.',
                    'Paired with Gate 25 the jolt connects to the identity centre, so that upheaval becomes the route to a deeper sense of self. A hanging 51 shows competitive nerve without that anchor; its shocks may seem to come and go without a clear purpose until someone with 25 is close by.',
                ],
            },
        ],
        related: ['human-design.center.ego', 'human-design.channel.25-51', 'human-design.gate.25', 'human-design.authority.ego-projected'],
    },
    {
        id: 'human-design.gate.52',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 52 · Stillness',
        summary: 'A Root gate numbered from Gen, the hexagram of the mountain, that presses towards the Sacral as a capacity to stay still and concentrated.',
        glyph: '52',
        keywords: ['Gen', 'Keeping Still', 'Mountain', 'hexagram 52', 'concentration', 'stillness'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.root|Root]]',
                    'Channel: [[human-design.channel.9-52]], completed by [[human-design.gate.9|Gate 9]] in the Sacral',
                    'Hexagram: 52, Gen (Keeping Still)',
                    'Wheel position: early Cancer',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Gen doubles the mountain, the most motionless image the I Ching has. Its classical text speaks of keeping the back still, so that the self is no longer felt, and of walking in a courtyard without seeing the people there. It describes a stillness that is active and alert.',
                    'For a Root gate this is unusual. The Root generally pushes for movement; Gate 52 pushes for not moving, for staying put long enough to take something in. Its pressure travels towards the Sacral, where it can become the stamina to concentrate. Without that outlet, it may build as restlessness held in check.',
                ],
            },
            {
                id: 'activation',
                heading: 'Paired and unpaired',
                paragraphs: [
                    'Gate 9 completes a channel that makes concentration a fixed resource. A hanging 52 has the poise and pressure for focus while needing a task or a companion that engages the Sacral. On the Design side, stillness may simply be how the body behaves; on the Personality side, a deliberate practice the person returns to.',
                ],
            },
        ],
        related: ['human-design.center.root', 'human-design.channel.9-52', 'human-design.gate.9', 'human-design.foundations.personality-and-design'],
    },
    {
        id: 'human-design.gate.53',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 53 · Starting',
        summary: 'A Root gate keyed to Jian, the hexagram of gradual development, whose pressure is to begin a new cycle of growth.',
        glyph: '53',
        keywords: ['Jian', 'Development', 'Gradual Progress', 'hexagram 53', 'beginnings', 'initiation'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.root|Root]]',
                    'Channel: [[human-design.channel.42-53]], completed by [[human-design.gate.42|Gate 42]] in the Sacral',
                    'Hexagram: 53, Jian (Development)',
                    'Wheel position: Cancer',
                ],
            },
            {
                id: 'hexagram',
                heading: 'Jian',
                paragraphs: [
                    'A tree grows on a mountain, slowly. The lines of hexagram 53 trace a wild goose moving step by step from the water’s edge to the cliffs and the heights, and the judgement links the image to a marriage carried out in the proper order. It is the second Jian in the sequence; hexagram 39 is a different character.',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Gate 53 is the Root’s pressure to begin. It is the impulse that gets a new phase underway: the first meeting, the first draft, the decision to move. Unlike the hexagram, the gate is impatient, and part of its learning is that a beginning only develops when each stage has its time.',
                    'Sacral gate 42 provides the stamina to finish what 53 starts, and the completed channel holds a whole cycle. Without 42, the gate often sparks projects that others complete, and its pressure to start may feel stronger than its ability to carry through without help.',
                ],
            },
        ],
        related: ['human-design.center.root', 'human-design.channel.42-53', 'human-design.gate.42', 'human-design.center.sacral'],
    },
    {
        id: 'human-design.gate.54',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 54 · Ambition',
        summary: 'A Root gate numbered from Gui Mei, the hexagram of the marrying maiden, carrying the drive to rise in material and spiritual standing.',
        glyph: '54',
        keywords: ['Gui Mei', 'The Marrying Maiden', 'hexagram 54', 'ambition', 'drive', 'transformation'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.root|Root]]',
                    'Channel: [[human-design.channel.32-54]], completed by [[human-design.gate.32|Gate 32]] in the Spleen',
                    'Hexagram: 54, Gui Mei (The Marrying Maiden)',
                    'Wheel position: mid-Capricorn',
                ],
            },
            {
                id: 'hexagram',
                heading: 'The marrying maiden',
                paragraphs: [
                    'Hexagram 54 depicts a young woman entering a household as a secondary wife — a position without rank, where influence has to be earned through tact. The oracle is cautious: forcing advancement brings misfortune. The figure concerns rising from a subordinate position by fitting in well before stepping up.',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Gate 54 takes the hexagram’s situation as fuel. Its pressure, pushing from the Root towards the Spleen, is the drive to improve one’s standing: to be noticed by those above, to advance, to transform circumstances. The ambition can be worldly or spiritual, and practitioners usually say the gate does not care much which.',
                    'Gate 32 in the Spleen tests the ambition against what is likely to last. With both gates defined the drive has discernment behind it. Alone, 54 has plenty of push; its sense of which ladder is worth climbing is often borrowed from mentors or partners.',
                ],
            },
        ],
        related: ['human-design.center.root', 'human-design.channel.32-54', 'human-design.gate.32', 'human-design.center.spleen'],
    },
    {
        id: 'human-design.gate.55',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 55 · Mood',
        summary: 'A Solar Plexus gate keyed to Feng, the hexagram of abundance, associated with wide swings of mood and a sense of fullness or emptiness.',
        glyph: '55',
        keywords: ['Feng', 'Abundance', 'Fullness', 'hexagram 55', 'mood', 'spirit'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.solar-plexus|Solar Plexus]]',
                    'Channel: [[human-design.channel.39-55]], completed by [[human-design.gate.39|Gate 39]] in the Root',
                    'Hexagram: 55, Feng (Abundance)',
                    'Wheel position: early Pisces',
                ],
            },
            {
                id: 'hexagram',
                heading: 'Feng',
                paragraphs: [
                    'Thunder and lightning arrive together in Feng: a peak of fullness. The advice given is not to grieve but to be like the sun at midday — while knowing that the sun at its zenith is about to decline. Abundance carries its own ending.',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Gate 55 sits on the individual side of the Solar Plexus, alongside Gate 22. Its mood moves between a feeling that the cup is full and a feeling that it is empty, often without any outer event to explain the shift. Practitioners read these swings as creative material rather than as a problem to fix.',
                    'Its partner, Root gate 39, provokes; together they form a channel in which moods are easily stirred. Where 39 is absent, the depth of feeling remains but the swings are less fixed. Like every Solar Plexus gate, it gives decisions an emotional timeline.',
                    'The gate also carries much of the system’s forecast about emotional life. Teaching from the Jovian Archive places 55 in the Cross of the Sleeping Phoenix, the global cycle it dates from 2027, and associates that change with a Solar Plexus expected to become an awareness centre rather than only a motor. This is a prediction internal to Human Design, not an observed fact.',
                ],
            },
        ],
        related: ['human-design.center.solar-plexus', 'human-design.channel.39-55', 'human-design.gate.39', 'human-design.authority.emotional'],
    },
    {
        id: 'human-design.gate.56',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 56 · The story',
        summary: 'A Throat gate numbered from Lü, the hexagram of the wanderer, that turns ideas and experiences into stories worth retelling.',
        glyph: '56',
        keywords: ['Lü', 'The Wanderer', 'hexagram 56', 'storytelling', 'stimulation', 'travel'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.throat|Throat]]',
                    'Channel: [[human-design.channel.11-56]], completed by [[human-design.gate.11|Gate 11]] in the Ajna',
                    'Hexagram: 56, Lü (The Wanderer)',
                    'Wheel position: Cancer–Leo cusp',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Fire moves across a mountain in Lü, never settling: the stranger passing through. Tradition recommends that a traveller be modest and correct, staying long enough to be welcome and no longer. Hexagram 10, Treading, shares the romanisation but not the character.',
                    'Gate 56 is the wanderer’s voice. It collects impressions from travel, reading and conversation and repackages them as stories, examples and parables. Accuracy matters less to it than effect, and its stories are designed to stimulate rather than to document. The Throat makes this an expressive function: the gate speaks in order to be heard.',
                ],
            },
            {
                id: 'activation',
                heading: 'Activation',
                paragraphs: [
                    'Ajna gate 11 provides an endless supply of ideas for the story. Without 11, the gift of telling lacks a fixed stock of material, so it often retells — and improves — what others have imagined. In Personality, the storyteller tends to be a conscious role; in Design, it can show as a habit of explaining through anecdote.',
                ],
            },
        ],
        related: ['human-design.center.throat', 'human-design.channel.11-56', 'human-design.gate.11', 'human-design.gate.10'],
    },
    {
        id: 'human-design.gate.57',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 57 · The quiet signal',
        summary: 'A Spleen gate keyed to Xun, the hexagram of the penetrating wind, associated with intuitive clarity and linked to three other centres.',
        glyph: '57',
        keywords: ['Xun', 'The Gentle', 'Wind', 'Penetrating', 'hexagram 57', 'intuition', 'integration channels'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.spleen|Spleen]]',
                    'Channels: [[human-design.channel.10-57]], [[human-design.channel.20-57]] and [[human-design.channel.34-57]]',
                    'Partner gates: [[human-design.gate.10|10]] (G), [[human-design.gate.20|20]] (Throat), [[human-design.gate.34|34]] (Sacral)',
                    'Hexagram: 57, Xun (The Gentle)',
                    'Wheel position: mid-Libra',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Wind doubled is Xun: gentle, persistent and able to enter anywhere. The commentary values small, repeated influence and the giving of instructions so that they penetrate. Gate 57 is the intuitive sharpness of the Spleen — an ability to hear what is really going on in the present, in tone, atmosphere and the unsaid.',
                    'The fear traditionally linked to this gate concerns the future, which makes sense for a sense organ tuned so finely to the present. Its signal is soft, and it does not insist.',
                ],
            },
            {
                id: 'connections',
                heading: 'Three channels',
                paragraphs: [
                    'Partnered with 20 it speaks its intuition in the moment; with 34 it guides Sacral power; with 10 it steers behaviour towards survival. Any of them defines the Spleen, which can give Splenic authority when no Solar Plexus or Sacral definition outranks it. A hanging 57 remains acutely perceptive and meets its partners through others or through transits.',
                ],
            },
        ],
        related: ['human-design.center.spleen', 'human-design.channel.34-57', 'human-design.channel.20-57', 'human-design.channel.10-57', 'human-design.authority.splenic'],
    },
    {
        id: 'human-design.gate.58',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 58 · Vitality',
        summary: 'A Root gate numbered from Dui, the hexagram of the joyous lake, which channels zest for life into the urge to improve things.',
        glyph: '58',
        keywords: ['Dui', 'The Joyous', 'Lake', 'hexagram 58', 'joy', 'aliveness'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.root|Root]]',
                    'Channel: [[human-design.channel.18-58]], completed by [[human-design.gate.18|Gate 18]] in the Spleen',
                    'Hexagram: 58, Dui (The Joyous)',
                    'Wheel position: early Capricorn',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Two lakes lie side by side in Dui and refresh each other. The classical commentary associates the figure with friends gathering to discuss and practise what they have learned — joy that is shared and productive. Gate 58 brings the image down into the Root as a pressure of sheer aliveness.',
                    'That pressure travels towards the Spleen, where it meets the critical eye of Gate 18. The combination is distinctive: an enjoyment of life that expresses itself as a wish to make life better. It is the gate of the enthusiast who wants the system improved, the recipe refined or the team tuned, out of pleasure rather than grievance.',
                ],
            },
            {
                id: 'activation',
                heading: 'Activation',
                paragraphs: [
                    'When Gate 18 is absent, the gate hangs; the zest remains, but the target for improvement is less fixed. Practitioners tend to read the Root’s pressure here as best used on chosen projects, since vitality aimed indiscriminately at everything nearby can wear thin with others.',
                ],
            },
        ],
        related: ['human-design.center.root', 'human-design.channel.18-58', 'human-design.gate.18', 'human-design.center.spleen'],
    },
    {
        id: 'human-design.gate.59',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 59 · The barrier',
        summary: 'A Sacral gate keyed to Huan, the hexagram of dispersion, whose power dissolves the barriers between people for intimacy and reproduction.',
        glyph: '59',
        keywords: ['Huan', 'Dispersion', 'Dissolution', 'hexagram 59', 'intimacy', 'sexuality'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.sacral|Sacral]]',
                    'Channel: [[human-design.channel.6-59]], completed by [[human-design.gate.6|Gate 6]] in the Solar Plexus',
                    'Hexagram: 59, Huan (Dispersion)',
                    'Wheel position: early Virgo',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Huan shows wind moving over water, breaking up the ice and scattering what was frozen in place. The judgement connects it with the king approaching his temple to reunite what has drifted apart. Dispersion here is in the service of a new union.',
                    'Gate 59 is the Sacral’s power to make contact: to dissolve the distance between bodies and let intimacy, sexual or otherwise, occur. It is strategic in a bodily sense — it knows how to approach — and the system ties it to bonding and reproduction, the tribal business of keeping a lineage going.',
                ],
            },
            {
                id: 'partner',
                heading: 'Partner gate',
                paragraphs: [
                    'The membrane on the other side is Gate 6, in the Solar Plexus, which decides emotionally whether to open. When both are defined, contact and its emotional terms are fixed parts of the design. Unpaired, 59 brings the drive towards closeness and meets the question of permission in each partner it encounters. Because it is a Sacral gate, response remains the operative strategy.',
                ],
            },
        ],
        related: ['human-design.center.sacral', 'human-design.channel.6-59', 'human-design.gate.6', 'human-design.type.generator'],
    },
    {
        id: 'human-design.gate.60',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 60 · Limitation',
        summary: 'A Root gate numbered from Jie, the hexagram of measured limits, that supplies the pressure of constraint from which mutation emerges.',
        glyph: '60',
        keywords: ['Jie', 'Limitation', 'Articulating', 'hexagram 60', 'acceptance', 'mutation'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.root|Root]]',
                    'Channel: [[human-design.channel.3-60]], completed by [[human-design.gate.3|Gate 3]] in the Sacral',
                    'Hexagram: 60, Jie (Limitation)',
                    'Wheel position: Capricorn–Aquarius cusp, the last gate before the wheel restarts',
                ],
            },
            {
                id: 'hexagram',
                heading: 'Jie',
                paragraphs: [
                    'The character for Jie means the joint in a stem of bamboo — the knot that divides and strengthens it. The hexagram shows water held within a lake’s banks. Its classical text praises limits that give form, and warns that limits imposed too harshly cannot be sustained.',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Gate 60 is a Root pressure to accept what currently constrains. That sounds passive, yet the tradition treats this gate as a source of mutation: by working within a limit, something genuinely new can emerge. The bamboo grows because it is jointed.',
                    'The pressure moves towards the Sacral, where Gate 3 orders the new. The completed channel is often described as working in pulses — long stretches with nothing changing, then sudden movement. A hanging 60 feels the restriction keenly and may depend on someone else’s Sacral to turn it into something.',
                ],
            },
        ],
        related: ['human-design.center.root', 'human-design.channel.3-60', 'human-design.gate.3', 'human-design.gate.41'],
    },
    {
        id: 'human-design.gate.61',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 61 · The unanswerable question',
        summary: 'A Head gate keyed to Zhong Fu, the hexagram of inner truth, that presses on the mind with questions about why things are as they are.',
        glyph: '61',
        keywords: ['Zhong Fu', 'Inner Truth', 'hexagram 61', 'mystery', 'inspiration', 'inner knowing'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.head|Head]]',
                    'Channel: [[human-design.channel.24-61]], completed by [[human-design.gate.24|Gate 24]] in the Ajna',
                    'Hexagram: 61, Zhong Fu (Inner Truth)',
                    'Wheel position: late Capricorn',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Zhong Fu has two broken lines at its centre, surrounded by solid ones: an empty heart, open and therefore able to be filled with sincerity. According to the judgement, such sincerity reaches even pigs and fishes. It is a hexagram about truth that is felt inside rather than demonstrated.',
                    'Of the three Head gates, 61 carries the pressure of mystery. It wants to know why — about life, death, origins, meaning — and the questions do not go away when they are not answered. The Head is a pressure centre, not an awareness one, so the gate inspires inquiry without guaranteeing the answer.',
                ],
            },
            {
                id: 'activation',
                heading: 'Activation',
                paragraphs: [
                    'Gate 24 in the Ajna gives the pressure a place to circle until something clicks. Without 24, the gate is susceptible to inspiration from outside — books, teachers, places — and may feel driven by questions that others raised. With a defined Head, the questions are a constant, regardless of company.',
                ],
            },
        ],
        related: ['human-design.center.head', 'human-design.channel.24-61', 'human-design.gate.24', 'human-design.center.ajna'],
    },
    {
        id: 'human-design.gate.62',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 62 · The detail that supports it',
        summary: 'A Throat gate numbered from Xiao Guo, the hexagram of small excess, which names the facts and specifics that make a view concrete.',
        glyph: '62',
        keywords: ['Xiao Guo', 'Preponderance of the Small', 'hexagram 62', 'details', 'facts', 'naming'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.throat|Throat]]',
                    'Channel: [[human-design.channel.17-62]], completed by [[human-design.gate.17|Gate 17]] in the Ajna',
                    'Hexagram: 62, Xiao Guo (Preponderance of the Small)',
                    'Wheel position: late Cancer',
                ],
            },
            {
                id: 'hexagram',
                heading: 'Xiao Guo',
                paragraphs: [
                    'Two solid lines sit inside four broken ones — the outline of a bird with wings outstretched. A bird, the oracle says, should not fly too high, and that small matters may be attended to while great ones should not be attempted. The figure prizes care over ambition.',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Gate 62 follows that advice in speech. Its contribution to the Throat is detail: names, figures, procedures, the precise term for a thing. Where Gate 17 forms a view of how something should go, Gate 62 supplies the facts that let others check it. Much of what passes for clarity in technical writing, legal drafting and teaching draws on this gate.',
                    'Without 17 the gate hangs, accurate and specific but less certain what larger case the details serve. It is often valued as the person who can be relied upon to get the facts right for someone else’s argument.',
                ],
            },
        ],
        related: ['human-design.center.throat', 'human-design.channel.17-62', 'human-design.gate.17', 'human-design.gate.16'],
    },
    {
        id: 'human-design.gate.63',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 63 · Doubt',
        summary: 'A Head gate keyed to Ji Ji, the hexagram of completion, which presses the logical mind to question whether a pattern really holds.',
        glyph: '63',
        keywords: ['Ji Ji', 'After Completion', 'hexagram 63', 'doubt', 'logic', 'questioning'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.head|Head]]',
                    'Channel: [[human-design.channel.4-63]], completed by [[human-design.gate.4|Gate 4]] in the Ajna',
                    'Hexagram: 63, Ji Ji (After Completion)',
                    'Wheel position: mid-Pisces',
                ],
            },
            {
                id: 'hexagram',
                heading: 'After completion',
                paragraphs: [
                    'Ji Ji is the only hexagram in which every line stands in its proper place: solid lines in odd positions, broken lines in even ones. Everything is in order. The judgement immediately adds a caution — good fortune at the beginning, disorder at the end. Order achieved is order that will start to slip.',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Gate 63 is the Head’s logical pressure, and the hexagram explains its stance. The moment something seems settled, the gate wants to test it: Does the pattern really hold? What would break it? Doubt here is a working tool, the start of every logical inquiry, and it is directed outward at patterns rather than inward at the self — at least when it is functioning as intended.',
                    'Ajna gate 4 offers answers to the doubt. Unpaired, 63 is highly receptive to doubts and questions that come from outside, and can feel pressure to resolve them even when they belong to someone else.',
                ],
            },
        ],
        related: ['human-design.center.head', 'human-design.channel.4-63', 'human-design.gate.4', 'human-design.gate.64'],
    },
    {
        id: 'human-design.gate.64',
        library: 'human-design',
        category: 'gate',
        title: 'Gate 64 · The unresolved picture',
        summary: 'A Head gate numbered from Wei Ji, the final hexagram, which presses the abstract mind with images and memories still waiting to resolve.',
        glyph: '64',
        keywords: ['Wei Ji', 'Before Completion', 'hexagram 64', 'confusion', 'images', 'abstract mind'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Centre: [[human-design.center.head|Head]]',
                    'Channel: [[human-design.channel.47-64]], completed by [[human-design.gate.47|Gate 47]] in the Ajna',
                    'Hexagram: 64, Wei Ji (Before Completion)',
                    'Wheel position: Virgo',
                ],
            },
            {
                id: 'hexagram',
                heading: 'The last hexagram',
                paragraphs: [
                    'The King Wen sequence does not end on completion. Hexagram 63 has every line in place; hexagram 64 has every line out of place, and the text pictures a young fox that has almost crossed the river and gets its tail wet. The book closes on a transition still under way.',
                ],
            },
            {
                id: 'theme',
                heading: 'Theme',
                paragraphs: [
                    'Gate 64 carries that unfinished state into the Head. It presses the mind with images from the past — scenes, sequences, fragments of memory — that have not yet formed a coherent whole. The experience is often of mental fullness and confusion, sometimes at night. The tradition does not read this as malfunction. Resolution, when it comes, comes in its own time and usually not by force.',
                    'Ajna gate 47 is where the images get processed into realisation. A hanging 64 is open to other people’s pictures and confusions; it may notice its mind filling with material that turns out to have come from the room rather than from itself.',
                ],
            },
        ],
        related: ['human-design.center.head', 'human-design.channel.47-64', 'human-design.gate.47', 'human-design.gate.63'],
    },
];
