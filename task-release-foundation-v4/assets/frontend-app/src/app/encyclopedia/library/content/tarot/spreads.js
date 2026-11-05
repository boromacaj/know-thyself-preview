export const ARTICLES = [
    {
        id: 'tarot.spread.daily-three-card',
        library: 'tarot',
        category: 'spread',
        title: 'Daily three-card spread',
        summary: 'The app’s daily draw: three cards in the positions Energy, Factor and Guidance, drawn once for each calendar day and kept.',
        glyph: '3',
        keywords: ['daily draw', 'card of the day', 'Energy', 'Factor', 'Guidance', 'Jumper', 'three-card spread'],
        sections: [
            {
                id: 'purpose',
                heading: 'What it is for',
                paragraphs: [
                    'The daily spread is a reading without a question. It offers a symbolic frame for one day: a tone, something that bears on it, and a stance worth taking. The draw belongs to the local calendar date, is made once and then stays fixed, so returning to it later in the day shows the same three cards rather than a fresh shuffle.',
                ],
            },
            {
                id: 'positions',
                heading: 'The positions',
                list: [
                    'Energy: the dominant tone the day opens with. This position names the theme the other two cards will be read against.',
                    'Factor: what shapes, complicates or feeds that tone. It may support the first card or pull against it.',
                    'Guidance: the direction or attitude the spread offers in response, a stance rather than an instruction.',
                ],
            },
            {
                id: 'reading-together',
                heading: 'Reading the three together',
                paragraphs: [
                    'The spread is read as a short argument. The relationship between Energy and Factor matters most: two cards of the same suit concentrate the day in one area, while contrary suits, such as Wands against Cups, describe friction. Guidance is then read as an answer to that pair, not as a standalone card. A Major among the three tends to set the frame for the others, and a reversed card alters its place in the argument without removing its subject.',
                    'The app also allows for a card that jumps from the deck while it is being shuffled. Whether that card counts is left to the person drawing, and if kept it is read beside the three, never in place of one. This is a product feature rather than part of the Rider–Waite–Smith tradition.',
                ],
            },
            {
                id: 'when-another-fits',
                heading: 'When another spread fits better',
                paragraphs: [
                    'A day has no question, so the spread cannot address one. A specific concern is better served by a question spread chosen for its shape, such as [[tarot.spread.problem-cause-solution]] for a recurring difficulty.',
                ],
            },
        ],
        related: ['tarot.foundations.positions-and-spreads', 'tarot.foundations.reading-cards-together', 'tarot.spread.one-card-reflection', 'tarot.spread.situation-action-outcome', 'synthesis.pillar.tarot'],
    },
    {
        id: 'tarot.spread.one-card-reflection',
        library: 'tarot',
        category: 'spread',
        title: 'One card',
        summary: 'A single card drawn for a single question, read as the one thing the question most needs looked at.',
        glyph: '1',
        keywords: ['one-card reflection', 'single card', 'focus card', 'card for the question'],
        sections: [
            {
                id: 'purpose',
                heading: 'What it is for',
                paragraphs: [
                    'The simplest layout in the app has one position, Focus, and it suits open, reflective questions: what to pay attention to in a period of change, what a feeling is about, what matters in a creative block. The app chooses it for general, emotional, spiritual and self-development questions that do not have a sequence or a choice built into them.',
                ],
            },
            {
                id: 'the-position',
                heading: 'The position',
                paragraphs: [
                    'Focus asks: in relation to this question, what is the one thing to look at? The card is not a verdict on the question but a pointer. A Pentacle points to practical arrangements, a Sword to how the matter is being thought about, a Major to a larger movement the question is part of.',
                ],
            },
            {
                id: 'reading-it',
                heading: 'Reading a single card',
                paragraphs: [
                    'With nothing to modify it, a lone card carries its full weight, and that is both the strength and the limit of the spread. It is easy to read too much into one image. A useful discipline is to begin with what the picture actually shows, then ask which part of it touches the question. Orientation matters more here than in larger spreads: a reversed card is the only qualification the reading gets.',
                ],
            },
            {
                id: 'when-another-fits',
                heading: 'When another spread fits better',
                paragraphs: [
                    'A question with a before and after belongs in [[tarot.spread.past-present-future]]. A question about a choice needs two places for two options. When one card raises more than it answers, [[tarot.spread.blind-spot-view]] gives the same openness more structure.',
                ],
            },
        ],
        related: ['tarot.spread.daily-three-card', 'tarot.spread.blind-spot-view', 'tarot.foundations.positions-and-spreads', 'tarot.major.high-priestess', 'tarot.major.fool'],
    },
    {
        id: 'tarot.spread.past-present-future',
        library: 'tarot',
        category: 'spread',
        title: 'Past, present, future',
        summary: 'The classic three-card sequence: what has shaped a matter, where it stands, and where it tends if nothing changes.',
        glyph: '3',
        keywords: ['past present future', 'timeline spread', 'three-card spread', 'temporal outlook'],
        sections: [
            {
                id: 'purpose',
                heading: 'What it is for',
                paragraphs: [
                    'This is probably the best-known three-card layout, and it suits questions about how something is developing: a career, a relationship, a personal change. The app uses it when a question asks about the course of things over time.',
                ],
            },
            {
                id: 'positions',
                heading: 'The positions',
                list: [
                    'Past: an influence that formed the situation and is still carried into it. It is read as a force, not as a particular event to be identified.',
                    'Present: where things actually stand now, regardless of how they were meant to be.',
                    'Future: the direction the matter tends towards if the present dynamic continues. It is a trajectory, never a fixed outcome.',
                ],
            },
            {
                id: 'reading-together',
                heading: 'Reading the positions together',
                paragraphs: [
                    'The spread reads left to right as a line of development, and the interesting part is usually the change between cards. A Cup in the past and a Sword in the present suggest a matter that began in feeling and has moved into argument or decision. If the third card looks unwelcome, the spread itself contains the remedy: the future position depends on the present one, so altering the present changes the tendency. That conditional quality is what keeps the spread from becoming a forecast.',
                ],
            },
            {
                id: 'when-another-fits',
                heading: 'When another spread fits better',
                paragraphs: [
                    'A question about whether something will happen is better served by [[tarot.spread.support-resistance-key]], which looks at the forces involved without pretending to answer yes or no. A question about what to do now fits [[tarot.spread.situation-action-outcome]].',
                ],
            },
        ],
        related: ['tarot.spread.situation-action-outcome', 'tarot.spread.support-resistance-key', 'tarot.foundations.positions-and-spreads', 'tarot.major.wheel-of-fortune', 'tarot.major.death'],
    },
    {
        id: 'tarot.spread.situation-action-outcome',
        library: 'tarot',
        category: 'spread',
        title: 'Situation, action, outcome',
        summary: 'A practical sequence: the situation as it is, a response that suits it, and where that response tends to lead.',
        glyph: '3',
        keywords: ['situation action outcome', 'action spread', 'advice spread', 'decision support'],
        sections: [
            {
                id: 'purpose',
                heading: 'What it is for',
                paragraphs: [
                    'Where [[tarot.spread.past-present-future]] traces a course, this spread intervenes in one. It is designed for questions that ask what to do: at work, in a creative project, in personal growth or in a relationship. The middle card is the heart of it.',
                ],
            },
            {
                id: 'positions',
                heading: 'The positions',
                list: [
                    'Situation: the circumstances as they really stand, with hopes and fears set aside.',
                    'Action: a response that fits those circumstances, offered as a stance to take rather than an order to follow.',
                    'Outcome: where that response tends to lead, read as a direction and not a guarantee.',
                ],
            },
            {
                id: 'reading-together',
                heading: 'Reading the positions together',
                paragraphs: [
                    'The Action card is read as a reply to the Situation card. A busy, crowded Situation card such as the Five of Wands answered by [[tarot.major.hermit|The Hermit]] suggests withdrawing from the contest rather than winning it. The Outcome is then read as the consequence of that particular response, which is why it cannot be lifted out and read alone. If the Outcome card looks weaker than the Situation card, the response may need adjusting, not abandoning.',
                ],
            },
            {
                id: 'when-another-fits',
                heading: 'When another spread fits better',
                paragraphs: [
                    'If the difficulty keeps returning however it is handled, the issue may lie deeper than action, and [[tarot.spread.problem-cause-solution]] is more useful. If the question is a choice between two specific actions, use [[tarot.spread.option-a-b-guidance]].',
                ],
            },
        ],
        related: ['tarot.spread.past-present-future', 'tarot.spread.problem-cause-solution', 'tarot.spread.option-a-b-guidance', 'tarot.major.magician', 'tarot.major.chariot'],
    },
    {
        id: 'tarot.spread.problem-cause-solution',
        library: 'tarot',
        category: 'spread',
        title: 'Problem, cause, solution',
        summary: 'A diagnostic layout: a difficulty as it appears, the dynamic underneath that sustains it, and a constructive response to that dynamic.',
        glyph: '3',
        keywords: ['problem cause solution', 'blockage spread', 'obstacle spread', 'root cause'],
        sections: [
            {
                id: 'purpose',
                heading: 'What it is for',
                paragraphs: [
                    'Some problems persist because the visible difficulty is not the real one. This spread separates the two. The app chooses it for questions about being stuck, about a creative block, about an emotional pattern or a recurring difficulty at work.',
                ],
            },
            {
                id: 'positions',
                heading: 'The positions',
                list: [
                    'Problem: the difficulty as it shows on the surface, the part that prompted the question.',
                    'Cause: the underlying dynamic that keeps the pattern going.',
                    'Solution: a response aimed at that underlying dynamic. It is a stance, and no promise is attached to it.',
                ],
            },
            {
                id: 'reading-together',
                heading: 'Reading the positions together',
                paragraphs: [
                    'The middle card carries the reading. The Solution is a response to the Cause, not to the Problem, so a reader should resist answering the surface card directly. Suppose a stalled project draws the Eight of Pentacles as Problem and [[tarot.major.devil|The Devil]] as Cause: the trouble is not lack of effort but a compulsion keeping the effort in a rut, and the Solution card is read for what loosens that hold. Contrast between the first two cards is itself informative; a practical-looking Problem with an emotional Cause shows where attention has been misplaced.',
                ],
            },
            {
                id: 'when-another-fits',
                heading: 'When another spread fits better',
                paragraphs: [
                    'Where the cause is already clear and the question is simply what to do, [[tarot.spread.situation-action-outcome]] is more direct. Where the difficulty involves a hidden factor rather than a known pattern, [[tarot.spread.blind-spot-view]] fits better.',
                ],
            },
        ],
        related: ['tarot.spread.situation-action-outcome', 'tarot.spread.blind-spot-view', 'tarot.spread.steadying-reflection', 'tarot.major.devil', 'tarot.foundations.reading-cards-together'],
    },
    {
        id: 'tarot.spread.self-other-relationship',
        library: 'tarot',
        category: 'spread',
        title: 'Self, other, relationship',
        summary: 'A relationship layout: the asker’s own part, how the other side appears from that vantage point, and the dynamic that belongs to neither alone.',
        glyph: '3',
        keywords: ['relationship spread', 'self other relationship', 'love spread', 'partnership spread'],
        sections: [
            {
                id: 'purpose',
                heading: 'What it is for',
                paragraphs: [
                    'The app reserves this spread for questions about relationships of any kind: romantic, family, friendship, working. Its structure is triangular rather than sequential, two sides and the space between them.',
                ],
            },
            {
                id: 'positions',
                heading: 'The positions',
                list: [
                    'Self: the asker’s own part, how they stand in the relationship.',
                    'Other: how the other side can look from where the asker stands. This position describes a stance or a role, never what the other person privately thinks or feels.',
                    'Relationship: the dynamic between the two, which neither side owns on its own.',
                ],
            },
            {
                id: 'reading-together',
                heading: 'Reading the positions together',
                paragraphs: [
                    'The first two cards are compared before the third is read. Similar suits suggest the two sides are operating in the same register; contrary ones, such as Swords opposite Cups, suggest one side is thinking while the other is feeling. The Relationship card then shows what that combination produces. Court cards are common here and are read as manners of behaving, so a [[tarot.foundations.court-cards|Knight]] in the Other position describes someone acting in pursuit mode, not a particular kind of person.',
                    'The limit of the Other position is deliberate. A card can show how someone appears and what role they are playing in the dynamic; it cannot read a mind.',
                ],
            },
            {
                id: 'when-another-fits',
                heading: 'When another spread fits better',
                paragraphs: [
                    'A question about whether to stay or go is a choice and fits [[tarot.spread.option-a-b-guidance]]. A question about what is being missed in a relationship can use [[tarot.spread.blind-spot-view]].',
                ],
            },
        ],
        related: ['tarot.spread.option-a-b-guidance', 'tarot.spread.blind-spot-view', 'tarot.major.lovers', 'tarot.foundations.court-cards', 'tarot.cups.two'],
    },
    {
        id: 'tarot.spread.option-a-b-guidance',
        library: 'tarot',
        category: 'spread',
        title: 'Option A, option B, guidance',
        summary: 'A decision layout that sets two paths side by side and then names the consideration the decision depends on. It never declares a winner.',
        glyph: '3',
        keywords: ['decision spread', 'two options', 'choice spread', 'either or', 'binary decision'],
        sections: [
            {
                id: 'purpose',
                heading: 'What it is for',
                paragraphs: [
                    'When a question is framed as a choice between two paths, this is the spread the app uses. It is built to clarify the decision rather than make it, and its third position is the reason.',
                ],
            },
            {
                id: 'positions',
                heading: 'The positions',
                list: [
                    'Option A: what the first path holds, both what it opens up and what it costs.',
                    'Option B: the same question asked of the second path.',
                    'Guidance: the factor the choice turns on. Not which option is better, but what would make one of them right.',
                ],
            },
            {
                id: 'reading-together',
                heading: 'Reading the positions together',
                paragraphs: [
                    'The two option cards are read in parallel and compared, never ranked by how pleasant they look. A comfortable card can describe a comfortable rut; a demanding one can describe a path worth its cost. The Guidance card then names the criterion. If [[tarot.major.lovers|The Lovers]] falls there, the choice turns on values; if the Seven of Pentacles, on patience and how long a person is willing to wait for results.',
                    'Because the spread is about criteria, a reading that ends with “choose A” has misread it. The cards describe what each path asks; the decision stays with the person making it.',
                ],
            },
            {
                id: 'when-another-fits',
                heading: 'When another spread fits better',
                paragraphs: [
                    'If one option is really a question of whether something will happen, [[tarot.spread.support-resistance-key]] is the better tool. If there are more than two genuine options, a single card for each, read against [[tarot.spread.resources-view|an account of available resources]], can be more honest than forcing a pair.',
                ],
            },
        ],
        related: ['tarot.spread.support-resistance-key', 'tarot.spread.situation-action-outcome', 'tarot.major.lovers', 'tarot.swords.two', 'tarot.foundations.positions-and-spreads'],
    },
    {
        id: 'tarot.spread.body-mind-spirit',
        library: 'tarot',
        category: 'spread',
        title: 'Body, mind, spirit',
        summary: 'A layered spread read for balance: the practical side of a matter, its mental and emotional side, and what it means underneath.',
        glyph: '3',
        keywords: ['body mind spirit', 'balance spread', 'holistic spread', 'layers'],
        sections: [
            {
                id: 'purpose',
                heading: 'What it is for',
                paragraphs: [
                    'Unlike most three-card layouts, this one has no sequence. Its three positions are parallel layers of one situation, and the reading looks for balance among them. The app uses it for general, emotional and spiritual questions and for open questions that concern how a person is living rather than what will happen.',
                ],
            },
            {
                id: 'positions',
                heading: 'The positions',
                list: [
                    'Body (Practical life): the lived, material side: routine, resources, stamina and how things are actually carried day to day.',
                    'Mind (Mind and feeling): how the matter is thought about and felt.',
                    'Spirit (Meaning and values): the significance of the matter below its surface, and the values at stake in it.',
                ],
            },
            {
                id: 'reading-together',
                heading: 'Reading the positions together',
                paragraphs: [
                    'The question to ask is which layer is strong, which is strained, and whether one is carrying the others. A bright Spirit card above a depleted Body card, such as the [[tarot.wands.ten|Ten of Wands]], describes a commitment that means a great deal and is being carried at too high a cost. Suits that match their layer, Pentacles in Body or Cups in Mind, tend to read as that layer working on its own terms; a suit in an unexpected layer shows one area of life spilling into another.',
                    'The Body layer is about practical life and stamina; it is not read as a statement about health.',
                ],
            },
            {
                id: 'when-another-fits',
                heading: 'When another spread fits better',
                paragraphs: [
                    'A question that is really about a specific problem needs [[tarot.spread.problem-cause-solution]]. A question about strengths to draw on fits [[tarot.spread.resources-view]].',
                ],
            },
        ],
        related: ['tarot.spread.resources-view', 'tarot.spread.problem-cause-solution', 'tarot.major.temperance', 'tarot.suit.pentacles', 'tarot.suit.cups'],
    },
    {
        id: 'tarot.spread.steadying-reflection',
        library: 'tarot',
        category: 'spread',
        title: 'Steadying reflection',
        summary: 'The spread the app uses for subjects a card cannot settle: it reads how a person stands towards the matter, what makes it heavy, and what can help hold it.',
        glyph: '3',
        keywords: ['steadying reflection', 'sensitive questions', 'bounded reading', 'support spread'],
        sections: [
            {
                id: 'purpose',
                heading: 'What it is for',
                paragraphs: [
                    'Some questions concern matters on which a card reading has no standing: health and medical treatment, pregnancy, legal disputes, death, financial matters and similar subjects. When a question touches one of these, the app usually still draws, but it changes what is read. This spread looks only at the person’s relation to the subject, never at the subject itself, and it has no position that looks ahead.',
                ],
            },
            {
                id: 'positions',
                heading: 'The positions',
                list: [
                    'Standing: how the person stands towards the matter right now, without a judgement attached.',
                    'Weight: what makes it heavy to hold.',
                    'Support: what can steady the person in holding it, offered as a stance rather than a solution.',
                ],
            },
            {
                id: 'reading-together',
                heading: 'Reading the positions together',
                paragraphs: [
                    'The spread is read in order, from where a person is to what helps. A Support card is not a remedy for the Weight card; it describes a way of carrying it. [[tarot.major.star|The Star]] in that position speaks of hope and recovery of composure, the [[tarot.cups.three|Three of Cups]] of the company of others, the Four of Swords of rest. Even a difficult card in the Support position is read for what it can lend, such as the clarity of a Sword.',
                    'The reading is accompanied by a short notice of what cards cannot do, and the question is not repeated back in the text.',
                ],
            },
            {
                id: 'when-another-fits',
                heading: 'When another spread fits better',
                paragraphs: [
                    'This spread is assigned by policy rather than chosen, and the app does not swap it for another when it applies. For ordinary reflective questions, [[tarot.spread.body-mind-spirit]] or [[tarot.spread.one-card-reflection]] offer similar inwardness without the restriction.',
                ],
            },
        ],
        related: ['tarot.spread.body-mind-spirit', 'tarot.spread.one-card-reflection', 'tarot.major.star', 'tarot.foundations.what-tarot-is', 'synthesis.guide.symbolic-frameworks'],
    },
    {
        id: 'tarot.spread.support-resistance-key',
        library: 'tarot',
        category: 'spread',
        title: 'Support, resistance, key',
        summary: 'The app’s answer to a will-it-happen question: one card for the conditions in favour, one for the obstacles, and one for the deciding factor. It gives no yes or no.',
        glyph: '3',
        keywords: ['will it happen', 'yes or no question', 'support resistance key', 'outlook spread'],
        sections: [
            {
                id: 'purpose',
                heading: 'What it is for',
                paragraphs: [
                    'Many people bring tarot a yes-or-no question about the future. The app does not answer such questions, but it does not ignore them either. This custom spread translates the question into something cards can address: the forces for and against an outcome, and the point on which it depends.',
                ],
            },
            {
                id: 'positions',
                heading: 'The positions',
                list: [
                    'Support: the conditions already helping the matter along.',
                    'Resistance: whatever stands in the way, from outside pressure to inner reluctance.',
                    'Key: the factor that matters most to how it develops from here.',
                ],
            },
            {
                id: 'reading-together',
                heading: 'Reading the positions together',
                paragraphs: [
                    'Support and Resistance are weighed against each other. The temptation is to count a strong Support and a weak Resistance as a yes; the spread is built to prevent that. The Key card shifts attention from the outcome to what influences it. If the [[tarot.wands.seven|Seven of Wands]] is the Key, things turn on whether a position is held under pressure; if [[tarot.major.wheel-of-fortune|the Wheel of Fortune]], on circumstances outside anyone’s control, which is itself a useful thing to know.',
                ],
            },
            {
                id: 'when-another-fits',
                heading: 'When another spread fits better',
                paragraphs: [
                    'If the question is really about how a situation is unfolding rather than whether an event occurs, [[tarot.spread.past-present-future]] traces it more naturally. A choice between two paths belongs in [[tarot.spread.option-a-b-guidance]].',
                ],
            },
        ],
        related: ['tarot.spread.past-present-future', 'tarot.spread.option-a-b-guidance', 'tarot.major.wheel-of-fortune', 'tarot.foundations.positions-and-spreads', 'synthesis.guide.counter-evidence'],
    },
    {
        id: 'tarot.spread.blind-spot-view',
        library: 'tarot',
        category: 'spread',
        title: 'Seen and unseen',
        summary: 'A spread about perspective: the part of a situation already visible, a possible missing piece, and the difference recognising it would make.',
        glyph: '3',
        keywords: ['blind spot', 'seen and unseen', 'hidden factor', 'perspective spread'],
        sections: [
            {
                id: 'purpose',
                heading: 'What it is for',
                paragraphs: [
                    'This custom spread is meant for situations in which something feels missing: a relationship that is not working for reasons no one can name, a decision that should be easy and is not, a pattern in oneself. The app uses it for reflective, relationship, self-development and emotional questions.',
                ],
            },
            {
                id: 'positions',
                heading: 'The positions',
                list: [
                    'Seen: what the asker can already see, stated as clearly as possible.',
                    'Unseen: a possibility the cards raise about what may be outside view. It is a prompt to look, not a fact the reading establishes.',
                    'Shift: what would change in how the person acts if the unseen part came into view.',
                ],
            },
            {
                id: 'reading-together',
                heading: 'Reading the positions together',
                paragraphs: [
                    'The Unseen position is the delicate one. Cards there are read as hypotheses, and inward cards such as [[tarot.major.moon|The Moon]] or [[tarot.major.high-priestess|The High Priestess]] fall naturally into it. The contrast between Seen and Unseen is often the heart of the reading: if the Seen card is about practical matters and the Unseen card is a Cup, the overlooked factor may be a feeling. The Shift card is read as consequence, the behaviour that would follow from that recognition.',
                ],
            },
            {
                id: 'when-another-fits',
                heading: 'When another spread fits better',
                paragraphs: [
                    'When the hidden factor is suspected to be a recurring dynamic, [[tarot.spread.problem-cause-solution]] names it more directly. When the question is simply open, [[tarot.spread.one-card-reflection]] may be enough.',
                ],
            },
        ],
        related: ['tarot.spread.problem-cause-solution', 'tarot.spread.one-card-reflection', 'tarot.major.moon', 'tarot.major.hanged-man', 'tarot.spread.self-other-relationship'],
    },
    {
        id: 'tarot.spread.resources-view',
        library: 'tarot',
        category: 'spread',
        title: 'What is carried',
        summary: 'A spread about resources: the strengths a person already brings, what else is within reach, and where those resources could be put to use.',
        glyph: '3',
        keywords: ['resources spread', 'strengths spread', 'carried available use', 'what is carried'],
        sections: [
            {
                id: 'purpose',
                heading: 'What it is for',
                paragraphs: [
                    'Most spreads begin with a difficulty. This one begins with assets. The app offers it for questions about development, career, creative work and general direction, especially when a person feels under-equipped for what is ahead. In the app its title addresses the reader directly; this library uses an impersonal form of the same name.',
                ],
            },
            {
                id: 'positions',
                heading: 'The positions',
                list: [
                    'Carried: the strengths, skills and habits the person already brings.',
                    'Available: what else is within reach beyond those, such as help, opportunities or untried capacities.',
                    'Use: where these resources could be applied, read as an experiment worth making rather than a fixed programme.',
                ],
            },
            {
                id: 'reading-together',
                heading: 'Reading the positions together',
                paragraphs: [
                    'The spread reads as an inventory followed by an application. Even a hard card in the Carried position is read as a resource: the [[tarot.wands.nine|Nine of Wands]] there names endurance earned through earlier struggle. The Available card is often the most surprising, since it points beyond the familiar. The Use card is then read in light of both, so that [[tarot.major.magician|The Magician]] in that position suggests combining what is held with what is offered.',
                ],
            },
            {
                id: 'when-another-fits',
                heading: 'When another spread fits better',
                paragraphs: [
                    'If the question is about a specific obstacle, [[tarot.spread.problem-cause-solution]] engages it directly. If the question is about a particular action, [[tarot.spread.situation-action-outcome]] is more focused.',
                ],
            },
        ],
        related: ['tarot.spread.body-mind-spirit', 'tarot.spread.situation-action-outcome', 'tarot.major.magician', 'tarot.suit.pentacles', 'tarot.foundations.positions-and-spreads'],
    },
];
